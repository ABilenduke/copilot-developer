---
name: execute
description: >-
  Execute an existing plan step-by-step on a dedicated git branch, with fast
  ralph loops per step and a deep final ralph loop that includes self-review and
  adversarial testing. Writes a timestamped journal with commit hashes and loop
  results. Supports both new multi-file story format (plan.md + design.md +
  prd.md) and old monolithic iteration format. Use when the user wants to
  implement a plan, says "execute the plan", "start building", "implement this",
  or references a plan.md file to work from.
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
4. **Detect format** (see Format Detection below)
5. **Run the Definition of Ready gate** (see Definition of Ready below)
6. Read all available story documents thoroughly. Understand every step AND every acceptance criterion.
7. **Identify verification stack**: Examine the project to determine what's available:
    - Test runner (e.g. `php artisan test`, `npm test`, `pytest`)
    - Linter (e.g. `phpstan`, `eslint`, `pint`, `ruff`)
    - Type checker (e.g. `vue-tsc`, `tsc --noEmit`, `mypy`)
    - Any custom checks mentioned in the plan
    - Record these in the journal header as the **verification stack**
8. **Set up the git branch** (see Git Workflow below)
9. **Update GitHub ticket status** (new format only — see GitHub Integration below)
10. Create the journal file alongside the plan
11. Write the journal header (including "Documents available" status)
12. Begin executing Step 1

---

## Format Detection

Detect whether this is the new multi-file story format or the old monolithic iteration format:

```
if plan.md path contains "/stories/" → NEW FORMAT
  → multi-file consumption (plan.md + design.md + prd.md + brief.md)
  → update feature README on completion
  → create PR via gh pr create
  → update GitHub ticket status throughout

elif plan.md path contains "/iterations/" → OLD FORMAT
  → monolithic parsing (sections 1-7 in one file)
  → write journal.md only
  → do NOT update README, create PR, or touch GitHub

else → UNKNOWN
  → ask the user which format to use
```

Record the detected format in the journal header.

---

## Definition of Ready Gate

Before execution begins, validate that the inputs are sufficient. This prevents starting with incomplete planning artifacts.

### New Format (stories/)

| Document | Check | Enforcement |
|----------|-------|-------------|
| `plan.md` | Has `## Implementation Roadmap` with at least one `### Step` | **Hard requirement** — refuse to execute without steps |
| `design.md` | Has `## File Manifest` section | **Hard requirement** — can't verify completeness without knowing all files |
| `prd.md` | Has `## Acceptance Criteria` section | **Soft requirement** — warn but proceed. Ralph loop AC verification will be limited |
| `brief.md` | Exists | **Optional** — note in journal if missing. Business context only, not needed for execution |

**Validation sequence:**

1. Locate story directory from plan.md path
2. Check plan.md for Implementation Roadmap with steps → HARD
3. Check for design.md with File Manifest → HARD
4. Check for prd.md with Acceptance Criteria → SOFT (warn, continue)
5. Check for brief.md → OPTIONAL (note, continue)
6. Record "Documents available: brief ✅|⬜ | prd ✅|⬜ | design ✅|⬜ | plan ✅" in journal header

If a hard requirement fails, tell the user what's missing and suggest they run `/plan` to create it.

### Old Format (iterations/)

| Document | Check | Enforcement |
|----------|-------|-------------|
| `plan.md` | Has implementation steps (Section 7 or similar) | **Hard requirement** |

Old format has everything in one file — no multi-file validation needed.

---

## Document Consumption Model

### New Format

```
/execute reads:
  1. plan.md    → Implementation roadmap (steps, order, dependencies) — PRIMARY
  2. design.md  → File manifest, data model, integration points — REFERENCE
  3. prd.md     → Acceptance criteria for ralph loop verification — REFERENCE
  4. brief.md   → Business context (for understanding intent) — OPTIONAL
```

**Cross-referencing during execution:**
- plan.md steps reference design.md file manifest entries by path
- Ralph loop AC verification cross-checks against prd.md Given/When/Then criteria
- Journal records which documents informed each step

### Old Format

Read plan.md as a monolithic document. Parse sections 1-7 from the single file.

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

Every commit message must include the **story name** so commits are self-describing in `git log`:

- **After each step** (post ralph loop): `{story-name} step {N}: {task name}`
- **If ralph fixed issues**: `{story-name} step {N}: {task name} (verified after {X} ralph iterations)`
- **Final ralph fixes**: `{story-name} ralph review: {description}` or `{story-name} ralph adversarial: {description}`
- **Final commit**: `{story-name}: complete - add execution journal`

Example: `add-oauth2 step 3: create token refresh job`

Always record the hash (`git rev-parse --short HEAD`) in the journal.

---

## GitHub Integration (New Format Only)

Skip all GitHub operations for old-format iterations.

### At Execution Start

If the plan.md header contains a `**Ticket**: #{number}`, update the ticket:

```bash
# Assign to yourself and comment that work is starting
~/.local/bin/gh issue edit {ticket-number} \
  --repo ABilenduke/content-engine \
  --add-assignee @me

~/.local/bin/gh issue comment {ticket-number} \
  --repo ABilenduke/content-engine \
  --body "Execution started. Branch: feature/{feature}/{change}"
```

Note: Status is tracked via the **project board columns** (Backlog → Ready → In Progress → Review → Done), not via labels. Move the ticket on the board manually or via project field updates if needed.

### During Execution (per step)

```bash
# When a step's sub-issue is being worked on, optionally comment progress:
~/.local/bin/gh issue comment {sub-issue-number} \
  --repo ABilenduke/content-engine \
  --body "Working on Step {N}. Branch: feature/{feature}/{change}"
```

### At Execution Completion

```bash
# Create PR with detailed summary
~/.local/bin/gh pr create \
  --repo ABilenduke/content-engine \
  --title "{story-name}" \
  --label "type:story,area:{area}" \
  --body "$(cat <<'EOF'
## Summary
{1-3 sentences from journal summary}

## Changes
{list of key files changed, grouped by step}

## Story Documents
- Brief: {path}/brief.md
- PRD: {path}/prd.md
- Design: {path}/design.md
- Plan: {path}/plan.md
- Journal: {path}/journal.md

## Acceptance Criteria Verification
{from ralph loop Phase 2 — each AC with ✅/⚠️/❌ status}

## Testing
- Ralph loop: {iterations} step loops, {fixes} fixes
- Final ralph: {phases} phases, {adversarial-tests} adversarial tests
- All checks passing: ✅ | ⚠️ {issues}
EOF
)"

# Comment on the story ticket that PR is ready for review
~/.local/bin/gh issue comment {ticket-number} \
  --repo ABilenduke/content-engine \
  --body "PR #{pr-number} created. Ready for review."
```

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

If failures exist, fix them and commit: `{story-name} ralph check: {description}`

Proceed to Phase 2 regardless (even if Phase 1 was clean).

### Phase 2: Self-Review

Re-read every file you created or modified. Compare against the plan. This is a code review of your own work.

**Check for:**

- **Missed requirements**: Walk through each plan step. Is anything from scope that wasn't implemented?
- **Acceptance criteria gaps** (format-dependent):
    - **New format**: Read prd.md's Acceptance Criteria section. Go through each Given/When/Then criterion line by line. Is each criterion satisfied? Can you prove it?
    - **Old format**: Go through Section 6 of the plan line by line. Is each criterion satisfied?
- **Code smells**: Duplicated logic, overly complex methods, poor naming, missing error handling, hardcoded values that should be configurable
- **Missing documentation**: Did you add docblocks/comments where the plan called for them? Are new config values documented?
- **Consistency**: Does the new code follow the same patterns as the existing codebase? Naming conventions, file organization, error handling patterns?
- **Security**: SQL injection vectors, XSS, missing auth checks, exposed sensitive data, mass assignment vulnerabilities
- **Performance**: N+1 queries, missing indexes, unbounded queries, missing pagination

Journal everything found. Fix issues and commit: `{story-name} ralph review: {description}`

Proceed to Phase 3 regardless (even if Phase 2 was clean).

### Phase 3: Adversarial Testing

Actively try to break your own code. Write NEW tests that target edge cases, failure modes, and the "what if" scenarios from the plan's edge cases section.

**Source of edge cases** (format-dependent):
- **New format**: Read design.md's "Edge Cases & Error Handling" section for scenarios to test
- **Old format**: Read Section 5 of the plan for edge case scenarios

**Techniques:**

- **Edge case inputs**: Empty strings, null values, extremely long strings, special characters, Unicode, negative numbers, zero, max integers
- **Boundary conditions**: Off-by-one errors, empty collections, single-item collections, exactly-at-limit values
- **Failure injection**: What happens when a dependency is unavailable? A database query times out? An external API returns garbage?
- **Concurrency**: Two users do the same thing simultaneously. A record is deleted between read and write.
- **Permission boundaries**: Can a regular user access admin endpoints? Can user A modify user B's data?
- **State transitions**: Invalid state transitions, operations on soft-deleted records, duplicate submissions

**Write the tests.** Don't just think about edge cases — write actual test cases, run them, and see what breaks.

Journal everything found. Fix issues and commit: `{story-name} ralph adversarial: {description}`

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
**Commit**: `{story-name} ralph check: {desc}` → `[hash]` (or "No fixes needed")

### Phase 2: Self-Review

**Files reviewed**: [list of files examined]
**Findings**:

- [Finding 1 — severity, description, fix applied]
- [Finding 2 — ...]
  **Acceptance criteria check**:
- AC-1: ✅ Verified by test_xxx
- AC-2: ✅ Verified by test_yyy
- AC-3: ⚠️ Requires manual verification — [why]
  **Commit**: `{story-name} ralph review: {desc}` → `[hash]` (or "No issues found")

### Phase 3: Adversarial Testing

**Tests written**: [count] new test cases
**Targeting**: [what scenarios were tested]
**Failures found**:

- [Failure 1 — edge case, what broke, fix applied]
- [Failure 2 — ...]
  **Commit**: `{story-name} ralph adversarial: {desc}` → `[hash]` (or "All adversarial tests passed")

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
- **Acceptance criteria verification** — line-by-line check against prd.md (new format) or plan Section 6 (old format)

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
13. **GitHub operations are new-format only.** Never touch GitHub for old-format iterations.

---

## Completion

When the final ralph loop completes:

### New Format (stories/)

1. Add `## Summary` section to the journal (see below)
2. **Update feature README.md**:
    - Add the story to the stories table in the feature's README.md
    - Update the "Current Architecture" or other living sections if the story changed the feature
    - If no README.md exists, create one using the feature README template
3. **Create PR** via `gh pr create` with the format shown in GitHub Integration above
4. **Comment on ticket** that PR is ready for review
5. Final commit with completed journal: `{story-name}: complete - add execution journal and update feature docs`
6. Update plan status to "Complete" (or "Complete with issues")
7. Update `docs/features/index.md` with latest story info
8. Tell user: "Done on branch `feature/{name}`. [N] commits, [N] ralph fixes, [N] adversarial tests added. [All checks pass / N issues remain.] PR #{number} created. Journal at [path]."

### Old Format (iterations/)

1. Add `## Summary` section to the journal
2. Final commit with completed journal
3. Update plan status to "Complete" (or "Complete with issues")
4. Update `docs/features/index.md` if needed
5. Tell user: "Done on branch `feature/{name}`. [N] commits, [N] ralph fixes, [N] adversarial tests added. [All checks pass / N issues remain.] Journal at [path]."

### Journal Summary Section

```markdown
## Summary

**Delivered**: [1-3 sentences]

**Branch**: `feature/{feature}/{change-name}`
**Commits**: [total count]
**Final commit**: `[short hash]`

**Ralph loop stats**:
- Step loops: [iterations] iterations, [fixes] fixes
- Final loop — Phase 1 (checks): [pass/fix count]
- Final loop — Phase 2 (self-review): [findings count] findings, [fixes] fixes
- Final loop — Phase 3 (adversarial): [tests written] tests written, [failures] failures caught
- Verification result: All passing ✅ | [N] issues remaining ⚠️

**Adversarial tests added**: [count] — covering [brief description]

**Deviations from plan**: [Count — brief summary]

**Open items**:
- [Anything left undone or needing follow-up]

**Lessons learned**:
- [What would you do differently?]
```

---

## Feature README Updates (New Format Only)

After completing execution, update the feature's living documentation:

1. **Stories table**: Add a new row to the stories table in `docs/features/{feature}/README.md`:
    ```markdown
    | {date} | [{story-name}](stories/{date}_{story-name}/) | [#{ticket}](link) | Complete |
    ```

2. **Architecture section**: If the story changed the feature's architecture (new models, routes, components), update the "Current Architecture" section in the README.

3. **Known Issues**: If the ralph loop found unresolved issues, add them to the "Known Issues" section.

4. If the feature README doesn't exist yet, create one using `.claude/skills/feature/templates/feature-readme-v2.md`.

---

## Handling Blocked Steps

1. Journal what's blocking
2. Commit partial work: `{story-name} step {N} (partial): {reason}`
3. Mark as ❌ Blocked
4. Ask user: skip, resolve now, or stop?
5. If skipping, note downstream impacts — final ralph loop may catch cascading issues

---

## Handling Plan Updates

1. Journal the discovery
2. Ask user: update plan, continue with deviation, or stop and re-plan?
3. If updating, commit plan change separately: `update plan: {what changed}`

$ARGUMENTS
