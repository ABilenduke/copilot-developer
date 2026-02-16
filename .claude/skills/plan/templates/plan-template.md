# PRD: [Feature/Project Name]

**Status**: Draft | In Review | Approved | In Progress | Complete
**Author**: [Name]
**Date**: [Date]
**Last Updated**: [Date]

---

## 1. Problem Statement

[2-4 sentences describing the problem being solved, who it affects, and why it matters.]

### Success Criteria

| # | Criterion | Measurement | Target |
|---|-----------|-------------|--------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Constraints

- [Time, budget, technical, team, or other constraints]

---

## 2. Scope

### In Scope (v1)

| Priority | Feature | Description |
|----------|---------|-------------|
| MUST | | |
| MUST | | |
| SHOULD | | |
| COULD | | |

### Out of Scope

- [Feature/behavior explicitly excluded and why]

### Dependencies

- [External teams, services, features, or decisions this depends on]

---

## 3. Technical Architecture

### High-Level Approach

[Narrative description of the technical approach — how data flows, what components are involved, and how they interact.]

### Key Architectural Decisions

| Decision | Options Considered | Choice | Rationale |
|----------|--------------------|--------|-----------|
| | | | |

### Data Model Changes

[New tables, columns, relationships, migrations needed.]

```
[Schema or migration pseudocode if applicable]
```

### Integration Points

- [External APIs, services, queues, events this touches]

---

## 4. File-Level Implementation Plan

### New Files

| File Path | Purpose | Key Contents |
|-----------|---------|--------------|
| | | |

### Modified Files

| File Path | Changes | Reason |
|-----------|---------|--------|
| | | |

### Deleted Files

| File Path | Reason |
|-----------|--------|
| | |

### Config / Environment Changes

| Item | Change | Environment(s) |
|------|--------|-----------------|
| | | |

---

## 5. Edge Cases & Error Handling

### Input Validation

| Scenario | Handling Strategy |
|----------|-------------------|
| | |

### Failure Modes

| Failure | Impact | Detection | Recovery |
|---------|--------|-----------|----------|
| | | | |

### Security Considerations

- [Auth, permissions, injection, data exposure concerns]

### Backwards Compatibility

- [Impact on existing users, APIs, data]

---

## 6. Acceptance Criteria & Testing

### Acceptance Criteria

| # | Feature | Criteria | Test Type |
|---|---------|----------|-----------|
| AC-1 | | Given... When... Then... | Unit / Integration / Manual |
| AC-2 | | Given... When... Then... | |
| AC-3 | | Given... When... Then... | |

### Testing Strategy

**Backend Tests (Pest)**:
- Unit: [What to test, key scenarios]
- Feature: [What to test, routes/controllers involved]

**Frontend Tests (Vitest)**:
- Unit: [Components, composables, utilities to test]
- Integration: [Page-level rendering, user interaction flows]

**Manual Testing**:
- [Steps for manual verification]

**Performance**:
- [Benchmarks, load tests, metrics to validate]

---

## 7. Implementation Roadmap

### Build Order

| Step | Task | Description | Depends On | Est. Effort |
|------|------|-------------|------------|-------------|
| 1 | | | — | |
| 2 | | | Step 1 | |
| 3 | | | Step 1 | |
| 4 | | | Steps 2, 3 | |

### Checkpoints

- **After Step [N]**: [What should be true / what to validate before continuing]

### Open Questions

| # | Question | Impact | Owner | Resolution |
|---|----------|--------|-------|------------|
| 1 | | | | |

---

## Revision History

| Date | Author | Changes |
|------|--------|---------|
| | | Initial draft |
