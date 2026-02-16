# Plan: Add Audit Log v1

**Feature**: Audit Log
**Status**: Approved
**Date**: 2026-02-10
**Last Updated**: 2026-02-12

---

## 1. Problem Statement

Our application has no visibility into user actions — when something goes wrong (data deleted, permissions changed, configuration broken), we can't determine who did what and when. Support tickets about "who changed this?" take hours to investigate through raw database logs and are often unresolvable. We need a structured audit trail that captures user-initiated changes.

### Success Criteria

| # | Criterion | Measurement | Target |
|---|-----------|-------------|--------|
| 1 | All write operations captured | Audit log coverage of mutation endpoints | 100% |
| 2 | Support can answer "who changed X" | Time to resolve audit tickets | < 5 min |
| 3 | No performance impact | P95 latency on audited endpoints | < 5ms increase |

### Constraints

- Must work with existing Laravel/MySQL stack
- Must not break existing API contracts
- 90-day retention requirement from compliance
- Single developer, 2-week timeline

---

## 2. Scope

### In Scope (v1)

| Priority | Feature | Description |
|----------|---------|-------------|
| MUST | Write operation logging | Capture create, update, delete with before/after state |
| MUST | Audit log viewer | Admin UI to search and filter by user, action, entity, date |
| MUST | Retention policy | Automated purge of entries older than 90 days |
| SHOULD | CSV export | Admin export of filtered results |
| COULD | Slack notifications | Webhook for high-sensitivity actions |

### Out of Scope

- **Read operation logging** — Too noisy (~50x volume). Revisit after v1.
- **User-facing activity feed** — Different UX concern, separate effort.
- **Cross-service aggregation** — Only the main Laravel app.

### Dependencies

- None — fully contained.

---

## 3. Technical Architecture

### High-Level Approach

Laravel model observers capture before/after state of Eloquent operations automatically. A middleware layer captures authenticated user and request context. Audit entries are written asynchronously via queued jobs to avoid blocking requests.

### Key Decisions

| Decision | Options Considered | Choice | Rationale |
|----------|--------------------|--------|-----------|
| Capture mechanism | Manual controller logging vs. Model observers | Model observers | Automatic coverage, can't be forgotten |
| Storage | Same DB vs. separate DB vs. log service | Same MySQL, dedicated table | Simplest to query; volume manageable at our scale |
| Write strategy | Sync vs. async queue | Async (queued job) | Eliminates latency impact |
| State capture | Full snapshot vs. changed fields only | Changed fields + old values | Balances storage with usefulness |

### Data Model Changes

New table: `audit_logs`

```sql
CREATE TABLE audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    action ENUM('created', 'updated', 'deleted') NOT NULL,
    auditable_type VARCHAR(255) NOT NULL,
    auditable_id BIGINT UNSIGNED NOT NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    metadata JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_entity (auditable_type, auditable_id),
    INDEX idx_audit_created (created_at)
);
```

### Integration Points

- Laravel queue (Redis) for async writes
- Existing auth middleware for user context
- Scheduler for retention cleanup

---

## 4. File-Level Implementation Plan

### New Files

| File Path | Purpose |
|-----------|---------|
| `app/Models/AuditLog.php` | Eloquent model with scopes for filtering |
| `app/Observers/AuditObserver.php` | Captures model changes, dispatches audit jobs |
| `app/Jobs/WriteAuditLog.php` | Queued job for async DB write |
| `app/Http/Controllers/Admin/AuditLogController.php` | Admin API for viewing/exporting logs |
| `app/Traits/Auditable.php` | Trait to mark models for auditing |
| `database/migrations/2026_02_10_create_audit_logs_table.php` | Schema migration |
| `app/Console/Commands/PurgeOldAuditLogs.php` | Retention cleanup command |
| `resources/js/Pages/Admin/AuditLog/Index.vue` | Admin UI with filters |

### Modified Files

| File Path | Changes |
|-----------|---------|
| `app/Models/User.php` | Add `Auditable` trait |
| `app/Models/Project.php` | Add `Auditable` trait |
| `app/Models/Document.php` | Add `Auditable` trait |
| `routes/admin.php` | Add audit log routes |
| `app/Console/Kernel.php` | Schedule purge command daily at 2am |

### Config / Environment Changes

| Item | Change |
|------|--------|
| `AUDIT_RETENTION_DAYS` | New env var, default 90 |
| `AUDIT_QUEUE` | Queue name for audit jobs, default "audit" |
| `AUDIT_ENABLED` | Kill switch, default true |

---

## 5. Edge Cases & Error Handling

### Input Validation

| Scenario | Handling |
|----------|----------|
| Sensitive fields (password, API keys) | Config-based exclusion list — never log these |
| JSON exceeds MySQL max packet | Truncate with `[TRUNCATED]` marker, log warning |

### Failure Modes

| Failure | Impact | Recovery |
|---------|--------|----------|
| Queue worker down | Jobs pile up, user requests unaffected | Jobs process on restart — no data loss |
| Audit table disk full | Inserts fail, jobs dead-letter | Emergency purge or disk expansion |
| Observer throws exception | Could break user operation | try/catch in observer — log failure, don't block user |
| User deleted before job processes | Null user_id on entry | Nullable column — entry still captures the action |

### Security Considerations

- Audit entries are append-only (no update/delete endpoints)
- Admin-only access via existing middleware
- Sensitive field exclusion prevents password/token logging

### Backwards Compatibility

- No API changes — entirely additive
- Trait is opt-in per model — no risk to untagged models

---

## 6. Acceptance Criteria & Testing

### Acceptance Criteria

| # | Criteria | Test Type |
|---|----------|-----------|
| AC-1 | Given an auditable model, when created, then audit entry captures action, user, and new values | Unit |
| AC-2 | Given an auditable model, when updated, then audit entry captures old and new values for changed fields only | Unit |
| AC-3 | Given an auditable model, when deleted, then audit entry captures deleted record's values | Unit |
| AC-4 | Given a model with a password field, when updated, then audit entry does NOT contain the password | Unit |
| AC-5 | Given audit logging enabled, when model changed, then write happens via queue (not sync) | Integration |
| AC-6 | Given observer throws, when user creates/updates, then user's operation still succeeds | Integration |
| AC-7 | Given audit entries exist, when admin filters by user + date + entity, then only matches returned | Feature |
| AC-8 | Given entries older than 90 days, when purge runs, then old entries deleted, newer ones remain | Unit |

### Testing Strategy

**Backend Tests (Pest)**:
- Unit: Observer capture, field exclusion, purge logic, model scopes
- Feature: Queue processing, observer failure isolation, admin controller with auth, CSV export endpoint

**Frontend Tests (Vitest)**:
- Unit: Filter component rendering, date range picker interactions
- Integration: AuditLog/Index.vue renders table data, applies filters, triggers export

**Manual Testing**: Create entity → verify in audit log → filter → export.

---

## 7. Implementation Roadmap

### Build Order

| Step | Task | Depends On | Est. Effort |
|------|------|------------|-------------|
| 1 | Migration + Model | — | 1 hour |
| 2 | Observer + Queue Job | Step 1 | 3 hours |
| 3 | Auditable Trait + apply to User | Step 2 | 1 hour |
| 4 | Unit Tests | Step 3 | 2 hours |
| 5 | Config + Kill Switch | Step 2 | 1 hour |
| 6 | Admin Controller + Routes | Step 1 | 2 hours |
| 7 | Admin Vue UI | Step 6 | 4 hours |
| 8 | Apply to all models | Step 4 | 1 hour |
| 9 | Retention Command | Step 1 | 1 hour |
| 10 | Integration Tests | Steps 8, 9 | 2 hours |

### Checkpoints

- **After Step 4**: Core logging works for User model, tests pass.
- **After Step 7**: Admin can view, filter, export. Manual walkthrough.
- **After Step 10**: Full coverage, retention working, all tests green.

### Open Questions

| # | Question | Owner |
|---|----------|-------|
| 1 | Log bulk operations? (Observers don't fire on `Model::where()->update()`) | Andrew — accepted as v1 limitation |
| 2 | Audit admin actions on the audit log itself? | Andrew — No, audit log is append-only |
