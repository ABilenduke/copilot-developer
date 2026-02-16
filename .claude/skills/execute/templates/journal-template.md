# Journal: [Change Name]

**Feature**: [Feature Name]
**Plan**: [relative path to plan.md]
**Branch**: `feature/{feature}/{change-name}`
**Base commit**: `[hash]` ([branch it was created from])
**Started**: [YYYY-MM-DD HH:MM]
**Completed**: [YYYY-MM-DD HH:MM or "In Progress"]

**Verification Stack**:
- Tests: [command]
- Lint: [command]
- Type check: [command or "N/A"]
- Custom: [any project-specific checks]

---

## Step 1: [Task Name]
**Started**: [YYYY-MM-DD HH:MM]

[What was done, findings, decisions, deviations]

### Ralph Loop (Step 1) — Iteration 1
**Checks run**: [relevant tests + lint on changed files]
**Failures**: [what failed, or "None"]
**Fix applied**: [what was fixed, or N/A]
**Result**: All checks pass ✅ | Continuing...

**Commit**: `[short hash]`
**Status**: ✅ Complete | ⚠️ Complete with notes | ❌ Blocked

---

## Final Ralph Loop

### Phase 1: Automated Checks
**Checks run**: [full test suite, lint, type check, custom]
**Results**: [pass/fail details per check]
**Fixes**: [what was fixed, or "No fixes needed"]
**Commit**: `ralph check: [desc]` → `[hash]` | "No commit needed"

### Phase 2: Self-Review
**Files reviewed**: [list of new/modified files]
**Findings**:
- [Finding — severity, description, fix applied or "acceptable"]
**Acceptance criteria check**:
- AC-1: ✅ | ⚠️ | ❌ — [verification method or note]
**Commit**: `ralph review: [desc]` → `[hash]` | "No issues found"

### Phase 3: Adversarial Testing
**Tests written**: [count] new test cases
**Targeting**: [what scenarios/edge cases]
**Failures found**:
- [Failure — edge case, what broke, fix applied]
**Commit**: `ralph adversarial: [desc]` → `[hash]` | "All adversarial tests passed"

### Phase 4: Re-verification (if fixes were made)
**Checks run**: [full suite including new adversarial tests]
**Result**: All checks pass ✅ | [remaining issues]
**Commit**: `[hash]` | "Clean pass"

---

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

**Adversarial tests added**: [count] — covering [brief description of what they test]

**Duration**: [Start] → [End]

**Deviations from plan**: [Count — brief summary]

**Open items**:
- [Anything left undone or needing follow-up]

**Lessons learned**:
- [What would you do differently?]
