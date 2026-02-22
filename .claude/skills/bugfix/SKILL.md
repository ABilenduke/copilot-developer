---
name: bugfix
description: >-
  Lightweight bug fix handler. Creates a bug document with Five Whys root cause
  analysis, fixes the issue, writes regression tests, and creates a PR.
  Activates when the user says "bugfix", "fix this bug", "something is broken",
  or reports a defect that needs a quick fix.
---

# Bugfix Skill

## Purpose

This skill handles lightweight bug fixes — problems that can be described in one document and fixed in a few hours. If the fix requires planning, designing, and roadmapping, promote it to a story instead (the brief.md explains the bug and its impact instead of a business case).

**Pipeline position**: Bug reported → `/bugfix` → bug doc + fix + tests → PR → merge

---

## First Steps

When this skill is invoked:

1. Read the template: `templates/bug-template.md`
2. **Understand the bug**: Ask the user what's broken, or investigate if they've provided a description
3. **Determine the feature**: Which feature does this bug belong to?
    - If the feature exists in `docs/features/`, the bug doc goes in `docs/features/{feature}/bugs/`
    - If it's cross-cutting or unclear, ask the user
4. **Assess scope**: Can this be fixed in a few hours with one document?
    - If yes → proceed with bugfix
    - If no → suggest promoting to a story: "This looks bigger than a quick fix. Consider running `/research story` to create a proper story for it."
5. Begin the fix process

---

## Process

### Phase 1: Document the Bug

1. Create the bug document at `docs/features/{feature}/bugs/{YYYY-MM-DD}_{short-description}.md`
2. Fill in using `templates/bug-template.md`:
    - **Symptoms**: What the user/developer sees
    - **Steps to Reproduce**: Numbered steps to trigger the bug
    - **Expected vs Actual**: Clear comparison
    - **Severity**: Critical / High / Medium / Low

### Phase 2: Investigate Root Cause

1. Trace the bug through the codebase
2. Apply **Five Whys** analysis:
    - Why 1: [surface cause — what directly caused the symptom]
    - Why 2: [deeper cause — why that happened]
    - Why 3: [root cause — the systemic issue, or as deep as meaningful]
    - Continue only if the root cause isn't clear yet (not all bugs need all 5)
    - Stop when you reach a systemic cause: process gap, missing validation, architectural limitation
3. Document findings in the bug doc's "Root Cause — Five Whys" section

### Phase 3: Fix and Test

1. Create a branch: `fix/{feature}/{short-description}`
2. Apply the fix
3. Write regression test(s) — at minimum, one test that would have caught this bug before the fix
4. Run the relevant test suite to verify no regressions
5. Update the bug doc with:
    - **Root Cause**: What was actually wrong (summary from Five Whys)
    - **Fix**: What was changed (files and approach)
    - **Regression Prevention**: What tests were added and what they assert
    - **Status**: Changed from "Open" to "Fixed"

### Phase 4: Create GitHub Issue & PR

1. Create a GitHub issue (if one doesn't already exist):
    ```bash
    ISSUE_NUM=$(~/.local/bin/gh issue create \
      --repo ABilenduke/content-engine \
      --title "Bug: {short description}" \
      --label "type:bug,priority:{severity},area:{area}" \
      --body "$(cat <<'EOF'
    ## Symptoms
    {from bug doc}

    ## Steps to Reproduce
    {from bug doc}

    ## Root Cause
    {from Five Whys analysis}

    ## Bug Doc
    docs/features/{feature}/bugs/{date}_{description}.md
    EOF
    )" --json number --jq '.number')

    # Add to project board
    ~/.local/bin/gh issue edit $ISSUE_NUM --add-project "Content Engine"
    ```

2. Update the bug doc with the ticket number in the header

3. Commit the fix and bug doc:
    ```bash
    git add {changed-files}
    git commit -m "fix: {short description}"

    git add docs/features/{feature}/bugs/{date}_{description}.md
    git commit -m "docs: add bug report for {description}"
    ```

4. Create a PR:
    ```bash
    ~/.local/bin/gh pr create \
      --repo ABilenduke/content-engine \
      --title "fix: {short description}" \
      --label "type:bug,priority:{severity},area:{area}" \
      --body "$(cat <<'EOF'
    ## Summary
    {1-2 sentences: what was broken and why}

    Fixes #{issue-number}

    ## Root Cause
    {from Five Whys — the systemic cause, not just the surface fix}

    ## Changes
    {list of files changed and what was done}

    ## Regression Tests
    {list of tests added and what they assert}

    ## Bug Doc
    docs/features/{feature}/bugs/{date}_{description}.md
    EOF
    )"
    ```

5. Close the issue when the PR is merged (or let GitHub auto-close via "Fixes #N"):
    ```bash
    # The "Fixes #{issue-number}" in the PR body auto-closes when merged
    # If manual close is needed:
    ~/.local/bin/gh issue close $ISSUE_NUM \
      --repo ABilenduke/content-engine \
      --comment "Fixed in PR #{pr-number}"
    ```

---

## Bug vs Story Promotion

A bug stays a bug if:
- You can describe the fix in one document
- You can implement it in a few hours
- The fix is localized (1-3 files)
- The root cause is clear after investigation

Promote to a story if:
- You need to plan, design, and roadmap it
- The fix touches many files or changes architecture
- The "fix" is really a feature gap
- The Five Whys reveals a systemic problem requiring redesign

When promoting: run `/research story` where the brief.md explains the bug and its impact instead of a business case.

---

## Progress Indicator

```
🐛 Bugfix [{feature} / {description}]: Phase N of 4 — [Phase Name]
[██████░░░░░░░░] N/4 complete
```

---

## Critical Rules

1. **Always write a regression test** — a bugfix without a test is a future regression
2. **Five Whys is mandatory** — at minimum go 2-3 levels deep. Surface-level fixes recur.
3. **Don't scope-creep** — fix the bug, nothing more. Improvements go in a separate story.
4. **Document before fixing** — the bug doc captures symptoms and reproduction while they're fresh
5. **Keep it lightweight** — if the process feels heavy, the bug might be a story in disguise
6. **No ralph loop required** — bugfixes are lightweight by design. Run relevant tests, not the full verification suite. If you find yourself wanting a ralph loop, promote to a story.

---

## After Completion

1. Tell the user: "Bug fixed. PR #{N} created. Regression test added. Bug doc at [path]. Issue #{N} will auto-close when PR is merged."
2. Update the bug doc status to "Fixed"
3. If a GitHub issue was created, it's linked to the PR via "Fixes #N"

$ARGUMENTS
