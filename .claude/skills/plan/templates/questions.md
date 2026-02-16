# Question Bank Reference

A curated set of probing questions organized by phase. These are a toolkit — NOT a script. Pick the right questions for the context, rephrase naturally, skip ones that don't apply.

---

## Phase 1: Problem Discovery

### Core
- What problem are we solving? Who experiences it? How often?
- What's the current behavior? What's the desired behavior?
- What triggered this work? Why now?
- What does success look like in measurable terms?

### Depth
- What happens if we DON'T build this?
- Have you tried workarounds? What worked, what didn't?
- Are there compliance, legal, or regulatory factors?

### Challenge
- You said [X] is the problem — could the real problem be [Y]?
- Is this a symptom of something deeper?
- How do you know users want this vs. it being an assumption?

---

## Phase 2: Scope Definition

### Core
- What are the must-haves for v1?
- What's explicitly out of scope?
- Existing patterns to follow or break?
- Dependencies on other teams or services?

### Prioritization
- If you cut scope in half, what stays?
- Is there a "walking skeleton" — thinnest useful slice?
- Which features carry the most technical risk?
- Everything is a MUST? If I forced you to move one to SHOULD, which?

---

## Phase 3: Technical Architecture

### Core
- How does data flow through this feature?
- What technologies and frameworks are involved?
- Key architectural decisions to make?
- How does this integrate with existing systems?

### Data & Storage
- New data to store? New tables, columns, migrations?
- Data lifecycle? Temporary, cached, eventually deleted?

### Performance & Security
- Performance requirements? Latency, throughput?
- Authentication and authorization?
- Data sensitivity? PII, financial data, secrets?

---

## Phase 4: File-Level Plan

### Core
- What existing files need modification?
- What new files to create?
- Database migrations?
- Config or environment variable changes?

### Depth
- Walk through the request lifecycle — what code does a request touch?
- Shared utilities or base classes to leverage?
- Feature flags needed?
- Logging, metrics, observability?

---

## Phase 5: Edge Cases & Error Handling

### Input Validation
- Valid input ranges? Boundaries?
- Empty, null, missing inputs?
- Malicious input? SQL injection, XSS?

### Failures
- Database slow or unavailable?
- External API error, timeout, garbage data?
- Two users do the same thing simultaneously?
- Partially written data? Referenced data deleted?

### State & Resources
- Valid vs invalid state transitions?
- Stuck in intermediate state? Retry? Idempotency?
- Memory pressure? Disk? Connection pool exhaustion?

---

## Phase 6: Acceptance Criteria & Testing

- Given [precondition], when [action], then [expected result]?
- What's the happy path? Key alternative paths?
- How to verify each edge case from Phase 5?
- Rollback plan if this goes wrong in production?
- Does this change touch backend, frontend, or both? What tests are needed in each layer?
- Backend tests (Pest) — what feature/unit tests cover the PHP side?
- Frontend tests (Vitest) — what component/composable tests cover the Vue side?
- If both layers change, are there cross-layer integration concerns to test?

---

## Phase 7: Implementation Roadmap

- What's the riskiest part? Tackle first or last?
- Minimum viable slice that proves the approach end-to-end?
- Parts that can be built in parallel?
- Natural commit/PR boundaries?
- Biggest risk? Contingency?
