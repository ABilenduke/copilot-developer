# Question Bank Reference

A curated set of probing questions organized by phase. These are a toolkit — NOT a script. Pick the right questions for the context, rephrase naturally, skip ones that don't apply.

Each phase indicates which document it feeds with `[→ filename]`.

---

## Phase 1: Problem Discovery [→ brief.md]

### Core
- What problem are we solving? Who experiences it? How often?
- What's the current behavior? What's the desired behavior?
- What triggered this work? Why now?
- What does success look like in measurable terms?

### Market Context
- What competitors/alternatives exist?
- What trends make this timely?
- What's the cost of NOT doing this?

### RICE Scoring
- How many users/sessions does this affect per quarter? (Reach: 1-10)
- How much does this move the needle for those reached? (Impact: 1-10)
- How sure are we about reach and impact? (Confidence: %)
- How many person-days of focused work? (Effort)

### Pre-mortem
- It's 3 months later and this failed. What went wrong?
- What are we assuming that might not be true?
- What external factors could derail us?

### Depth
- Have you tried workarounds? What worked, what didn't?
- Are there compliance, legal, or regulatory factors?

### Challenge
- You said [X] is the problem — could the real problem be [Y]?
- Is this a symptom of something deeper?
- How do you know users want this vs. it being an assumption?

---

## Phase 2: Scope Definition [→ prd.md]

### Core
- What are the must-haves for v1?
- What's explicitly out of scope?
- Existing patterns to follow or break?
- Dependencies on other teams or services?

### User Stories
- As a [role], I want [capability] so that [outcome]?
- Who are the personas affected?

### Prioritization (MoSCoW)
- If you cut scope in half, what stays?
- Is there a "walking skeleton" — thinnest useful slice?
- Which features carry the most technical risk?
- Everything is a MUST? If I forced you to move one to SHOULD, which?

### INVEST Validation
- Is this story Independent of other in-progress work?
- Is the scope Negotiable without losing core value?
- Does it deliver clear user or business Value?
- Can we Estimate the effort with reasonable confidence?
- Is it Small enough to complete in 1-3 focused days?
- Is every Must-have Testable with Given/When/Then criteria?

---

## Phase 3: Technical Architecture [→ design.md]

### Core
- How does data flow through this feature?
- What technologies and frameworks are involved?
- Key architectural decisions to make?
- How does this integrate with existing systems?

### Key Decisions (document with alternatives)
- What are the options for [decision]?
- What are the trade-offs between [option A] and [option B]?
- Why does [chosen option] win for our context?

### Data & Storage
- New data to store? New tables, columns, migrations?
- Data lifecycle? Temporary, cached, eventually deleted?

### Performance & Security
- Performance requirements? Latency, throughput?
- Authentication and authorization?
- Data sensitivity? PII, financial data, secrets?

---

## Phase 4: File-Level Plan [→ design.md]

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

## Phase 5: Edge Cases & Error Handling [→ design.md]

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

### Assumption Mapping
- What are we assuming to be true? (list each)
- How certain are we? (High/Medium/Low)
- What's the impact if we're wrong? (High/Medium/Low)
- For high-impact + low-certainty: should we spike first?

---

## Phase 6: Acceptance Criteria & Testing [→ prd.md]

- Given [precondition], when [action], then [expected result]?
- What's the happy path? Key alternative paths?
- How to verify each edge case from Phase 5?
- Rollback plan if this goes wrong in production?
- Does this change touch backend, frontend, or both? What tests are needed in each layer?
- Backend tests (Pest) — what feature/unit tests cover the PHP side?
- Frontend tests (Vitest) — what component/composable tests cover the Vue side?
- If both layers change, are there cross-layer integration concerns to test?

---

## Phase 7: Implementation Roadmap [→ plan.md]

- What's the riskiest part? Tackle first or last?
- Minimum viable slice that proves the approach end-to-end?
- Parts that can be built in parallel?
- Natural commit/PR boundaries?
- Biggest risk? Contingency?
- Effort estimate per step? (S = hours, M = half day, L = full day+)
