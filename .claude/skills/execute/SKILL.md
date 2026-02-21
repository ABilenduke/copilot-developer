---
name: execute
description: Execute an existing plan step-by-step on a dedicated git branch, with fast ralph loops per step and a deep final ralph loop that includes self-review and adversarial testing. Writes a timestamped journal with commit hashes and loop results. Use when the user wants to implement a plan, says "execute the plan", "start building", "implement this", or references a plan.md file to work from.
---

# Plan Executor Skill

## Purpose

This skill takes a plan created by `/plan` and works through it step by step on a **dedicated git branch**. It uses a two-tier verification system:

- **Per-step ralph loops** (fast) — run relevant tests and lint after each step, fix failures iteratively
- **Final ralph loop** (deep) — a structured multi-phase review that goes beyond "do tests pass" into self-review, adversarial testing, and acceptance verification

A companion **journal** records everything — implementation details, verification results, fixes, and commit hashes.

## First Steps

When this skill is invoked:

1. Read `templates/journal-template.md` to understand the journal format
2. Read `examples/example-journal.md` to see the expected quality
3. **Locate the plan**:
    - If the user specified a path, use that
    - If not, check `docs/features/` for available plans. Show what exists and ask which to execute.
    - If no plans exist, tell the user to run `/plan` first.
4. Read the plan thoroughly. Understand every step AND every acceptance criterion.
5. **Identify verification stack**: Examine the project to determine what's available:
    - Test runner (e.g. `php artisan test`, `npm test`, `pytest`)
    - Linter (e.g. `phpstan`, `eslint`, `pint`, `ruff`)
    - Type checker (e.g. `vue-tsc`, `tsc --noEmit`, `mypy`)
    - Any custom checks mentioned in the plan
    - Record these in the journal header as the **verification stack**
6. **Set up the git branch** (see Git Workflow below)
7. Create the journal file alongside the plan
8. Write the journal header
9. Begin executing Step 1

---

## Git Workflow

### Branch Creation

1. **Check for clean working tree**: Run `git status`. If uncommitted changes exist, ask the user to commit or stash before proceeding.
2. **Create and checkout a new branch**:
    - Format: `feature/{feature-name}/{change-name}`
    - Run: `git checkout -b feature/{feature-name}/{change-name}`
3. **Record branch name and base commit** in journal header
    - Base commit: `git rev-parse --short HEAD`

### Committing

- **After each step** (post ralph loop): `step {N}: {task name}`
- **If ralph fixed issues**: `step {N}: {task name} (verified after {X} ralph iterations)`
- **Final ralph fixes**: `ralph review: {description}` or `ralph adversarial: {description}`
- **Final commit**: `complete: {change-name} - add execution journal`

Always record the hash (`git rev-parse --short HEAD`) in the journal.

---

## Per-Step Ralph Loop (Fast)

After implementing each plan step, run a quick verification loop. The goal is **fast feedback**, not comprehensive review. Keep these tight.

```
Implement step
     │
     ▼
Run quick checks:          ◄──────────────┐
  • Tests related to step                  │
  • Lint changed files                     │
  • Step-specific validation               │
     │                                     │
  Pass? ─── No ──► iteration < 5? ─ Yes ─►│ Fix
     │                    │                │
     Yes                  No               │
     │                    │                │
     ▼               Commit with           │
  Evaluate work:    notes, move on         │
  • Re-read plan step                      │
  • Compare implementation                 │
  • Check test coverage                    │
     │                                     │
  Gaps found? ─── No ──► Commit            │
     │                                     │
     Yes                                   │
     │                                     │
  iteration < 5? ─── Yes ─► Fix ──────────┘
     │
     No
     │
  Commit with notes, move on
```

**Scope the checks narrowly:**

- If a step creates a model, run that model's test class
- If a step writes a migration, run the migration
- If a step modifies a controller, lint that file and run its route tests
- Do NOT run the full test suite — that's for the final loop

**After checks pass, evaluate the work:**

Passing tests are necessary but not sufficient. Before committing, do a quick evaluation:

1. **Re-read the plan step** — what was it supposed to accomplish?
2. **Compare implementation to plan** — is anything missing, partially done, or deviated without justification?
3. **Evaluate test quality** — do the tests actually assert meaningful behavior, or are they shallow? Did you test what the step requires, or just what was easy to test? Are there obvious scenarios the tests don't cover?
4. **If gaps are found** — fix them (implementation or tests), re-run checks, and re-evaluate. This counts toward the 5-iteration limit.
5. **If no gaps** — commit and move on.

This prevents the "green bar illusion" where tests pass but the work is incomplete or the tests themselves are weak.

**Max 5 iterations** (checks + evaluations combined). After 5, commit with notes and move on.

---

## Final Ralph Loop (Deep)

After ALL plan steps are complete, run a structured multi-phase review. This is where the real quality comes from. Even if every test passes on the first check, the self-review and adversarial phases give the loop substantive work.

### Phase Structure

The final ralph loop has **three mandatory phases**, followed by **fix-and-verify iterations** if issues are found:

```
Phase 1: Automated Checks
     │
     ▼
Phase 2: Self-Review
     │
     ▼
Phase 3: Adversarial Testing
     │
     ▼
Issues found? ─── No ──► Complete (minimum 3 iterations guaranteed)
     │
     Yes
     │
     ▼
Phase 4-5: Fix & Re-verify (up to 2 more iterations)
```

### Phase 1: Automated Checks

Run the full verification stack against the entire project:

1. **Full test suite** — ALL tests, not just step-related. Catches integration issues.
2. **Full lint** — Entire project. Catches cross-file issues.
3. **Type checking** — If available (TypeScript, PHPStan, mypy, etc.)
4. **Regenerate reference docs** — Run `php artisan docs:generate` and commit any changes to `docs/generated/`.
5. **Custom checks** — Anything the plan specifies (migration reversibility, performance benchmarks, etc.)

If failures exist, fix them and commit: `ralph check: {description}`

Proceed to Phase 2 regardless (even if Phase 1 was clean).

### Phase 2: Self-Review

Re-read every file you created or modified. Compare against the plan. This is a code review of your own work.

**Check for:**

- **Missed requirements**: Walk through each plan section. Is anything from scope that wasn't implemented?
- **Acceptance criteria gaps**: Go through Section 6 of the plan line by line. Is each criterion satisfied? Can you prove it?
- **Code smells**: Duplicated logic, overly complex methods, poor naming, missing error handling, hardcoded values that should be configurable
- **Missing documentation**: Did you add docblocks/comments where the plan called for them? Are new config values documented?
- **Consistency**: Does the new code follow the same patterns as the existing codebase? Naming conventions, file organization, error handling patterns?
- **Security**: SQL injection vectors, XSS, missing auth checks, exposed sensitive data, mass assignment vulnerabilities
- **Performance**: N+1 queries, missing indexes, unbounded queries, missing pagination

Journal everything found. Fix issues and commit: `ralph review: {description}`

Proceed to Phase 3 regardless (even if Phase 2 was clean).

### Phase 3: Adversarial Testing

Actively try to break your own code. Write NEW tests that target edge cases, failure modes, and the "what if" scenarios from Section 5 of the plan.

**Techniques:**

- **Edge case inputs**: Empty strings, null values, extremely long strings, special characters, Unicode, negative numbers, zero, max integers
- **Boundary conditions**: Off-by-one errors, empty collections, single-item collections, exactly-at-limit values
- **Failure injection**: What happens when a dependency is unavailable? A database query times out? An external API returns garbage?
- **Concurrency**: Two users do the same thing simultaneously. A record is deleted between read and write.
- **Permission boundaries**: Can a regular user access admin endpoints? Can user A modify user B's data?
- **State transitions**: Invalid state transitions, operations on soft-deleted records, duplicate submissions

**Write the tests.** Don't just think about edge cases — write actual test cases, run them, and see what breaks.

Journal everything found. Fix issues and commit: `ralph adversarial: {description}`

### Phase 4-5: Fix & Re-verify (if needed)

If Phases 2 or 3 found issues that required fixes, re-run the full automated checks to make sure fixes didn't break anything else. Up to 2 more iterations.

If issues remain after Phase 5 (iteration 5 total), stop and journal what's unresolved.

### Final Ralph Loop Journal Format

```markdown
## Final Ralph Loop

### Phase 1: Automated Checks

**Checks run**: [full test suite, lint, type check, custom]
**Results**: [pass/fail details]
**Fixes**: [if any]
**Commit**: `ralph check: {desc}` → `[hash]` (or "No fixes needed")

### Phase 2: Self-Review

**Files reviewed**: [list of files examined]
**Findings**:

- [Finding 1 — severity, description, fix applied]
- [Finding 2 — ...]
  **Acceptance criteria check**:
- AC-1: ✅ Verified by test_xxx
- AC-2: ✅ Verified by test_yyy
- AC-3: ⚠️ Requires manual verification — [why]
  **Commit**: `ralph review: {desc}` → `[hash]` (or "No issues found")

### Phase 3: Adversarial Testing

**Tests written**: [count] new test cases
**Targeting**: [what scenarios were tested]
**Failures found**:

- [Failure 1 — edge case, what broke, fix applied]
- [Failure 2 — ...]
  **Commit**: `ralph adversarial: {desc}` → `[hash]` (or "All adversarial tests passed")

### Phase 4: Re-verification (if needed)

**Checks run**: [re-run of full suite including new adversarial tests]
**Result**: All checks pass ✅ | [remaining issues]
**Commit**: [hash or "Clean pass"]
```

---

## Execution Process

For each step in the plan's implementation roadmap:

### Before Starting a Step

1. Write journal entry: `## Step N: [Task Name]` with timestamp
2. Note what you're about to do

### During the Step

3. Implement as described in the plan
4. If unexpected findings, journal before continuing
5. If a decision isn't covered by the plan, ask the user, journal the decision

### After the Step — Per-Step Ralph Loop

6. Run relevant tests + lint on changed files
7. If fail: journal, fix, re-run
8. If pass: **evaluate the work** — re-read the plan step, compare what was implemented vs. what was required, check that tests actually cover the step's requirements (not just the happy path or easy scenarios)
9. If evaluation finds gaps: fix implementation or tests, re-run checks, re-evaluate (max 5 total iterations)
10. If evaluation is clean: journal result, commit
11. Record commit hash

### Between Steps

10. "Step N done (`abc1234`, ralph clean). Moving to Step N+1: [name]."
11. If ralph didn't pass: warn user, ask if they want to continue
12. Keep momentum — don't wait unless blocked

### After All Steps — Final Ralph Loop

13. Write `## Final Ralph Loop` in journal
14. Phase 1: Automated checks → fix if needed → commit
15. Phase 2: Self-review → fix if needed → commit
16. Phase 3: Adversarial testing → write tests → fix failures → commit
17. Phase 4-5: Re-verify if fixes were made (max 2 more iterations)
18. Journal every phase's results

---

## What to Journal

### Always Journal

- **Commit hashes** — every step and every ralph fix
- **Ralph loop results** — checks run, failures, fixes, iteration count
- **Self-review findings** — even if minor (they're lessons for next time)
- **Adversarial tests written** — what was tested, what broke, what held up
- **Deviations from plan** — with rationale
- **Codebase discoveries** — existing patterns, conflicts, surprises
- **Decisions made on the fly** — with rationale
- **Acceptance criteria verification** — line-by-line check against plan

### Don't Journal

- Routine implementation that matched the plan ("completed as planned" is fine)
- Verbose code listings (reference file path + commit hash)
- Ralph phases that found nothing (brief "no issues found" is enough)

---

## Progress Indicators

During steps:

```
🔨 Executing [{feature} / {change-name}]: Step N of M — [Task Name]
[██████░░░░░░░░] N/M complete
Branch: feature/{feature}/{change} | Last commit: {hash}
```

During final ralph loop:

```
🔄 Final Ralph Loop [{feature} / {change-name}]: Phase N — [Phase Name]
Branch: feature/{feature}/{change} | Last commit: {hash}
```

---

## Critical Rules

1. **Run per-step ralph loop after EVERY step.** Fast checks + work evaluation, no excuses. Passing tests alone is NOT a green light — evaluate the work against the plan step before committing.
2. **The final ralph loop ALWAYS runs all 3 phases.** Even if automated checks pass, self-review and adversarial testing still run. This is the whole point.
3. **Max 5 total iterations in the final loop.** 3 mandatory phases + up to 2 fix-and-verify rounds.
4. **Adversarial testing means WRITING TESTS.** Not just thinking about edge cases — write actual test cases and run them.
5. **Commit after every step and every ralph phase that produces fixes or new tests.**
6. **Record every commit hash in the journal.**
7. **Journal ralph results honestly.** If something's still broken after 5 iterations, say so.
8. **Journal before you deviate.**
9. **Never rewrite journal entries.** Append corrections.
10. **Ask the user when the plan doesn't cover something.**
11. **Pause at plan checkpoints.**
12. **The final commit includes the journal.**

---

## Completion

When the final ralph loop completes:

1. Add `## Summary` section to the journal:
    - What was delivered
    - Branch name, total commits, final commit hash
    - Ralph loop stats: per-step iterations/fixes + final loop phases/fixes
    - Adversarial tests added: count and what they cover
    - Verification result: all passing / N issues remaining
    - Duration
    - Deviations from plan
    - Open items
    - Lessons learned
2. Final commit with completed journal
3. Update plan status to "Complete" (or "Complete with issues")
4. Update `docs/features/index.md` if needed
5. Tell user: "Done on branch `feature/{name}`. [N] commits, [N] ralph fixes, [N] adversarial tests added. [All checks pass / N issues remain.] Journal at [path]."

---

## Handling Blocked Steps

1. Journal what's blocking
2. Commit partial work: `step {N} (partial): {reason}`
3. Mark as ❌ Blocked
4. Ask user: skip, resolve now, or stop?
5. If skipping, note downstream impacts — final ralph loop may catch cascading issues

---

## Handling Plan Updates

1. Journal the discovery
2. Ask user: update plan, continue with deviation, or stop and re-plan?
3. If updating, commit plan change separately: `update plan: {what changed}`

$ARGUMENTS
