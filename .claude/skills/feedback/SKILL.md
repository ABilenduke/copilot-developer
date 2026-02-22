---
name: feedback
description: >-
  Handles PR review feedback cycles. Reads PR comments, creates feedback.md
  as an immutable review record, applies fixes, and updates the PR. Activates
  when the user says "feedback", "PR feedback", "address review comments",
  "handle review", or has PR feedback to process.
---

# Feedback Skill

## Purpose

This skill handles the review cycle after `/execute` creates a PR. It reads PR comments, creates an immutable `feedback.md` record in the story directory, applies fixes, and updates the PR. The feedback document is a permanent historical record of what was raised and how it was resolved.

**Pipeline position**: `/execute` → PR created → reviewer comments → `/feedback` → feedback.md + PR updates → merge → Done

---

## First Steps

When this skill is invoked:

1. Read the template: `templates/feedback-template.md`
2. **Identify the PR**:
    - If the user specified a PR number, use that
    - If on a feature branch, check for an open PR:
      ```bash
      ~/.local/bin/gh pr list --head "$(git branch --show-current)" \
        --repo ABilenduke/content-engine --json number,title --jq '.[0]'
      ```
    - If no PR found, ask the user for the PR number
3. **Read PR details**:
    ```bash
    ~/.local/bin/gh pr view {number} --repo ABilenduke/content-engine \
      --json title,body,reviews,comments,reviewDecision
    ```
4. **Locate the story directory**: Find the story that produced this PR by:
    - Checking the PR description for story document paths
    - Checking the branch name for feature/story naming
    - Asking the user if neither works
5. **Read existing story documents**: Load plan.md and design.md for context on what was intended
6. **Read PR review comments**:
    ```bash
    # General PR comments
    ~/.local/bin/gh pr view {number} --repo ABilenduke/content-engine --comments

    # Inline code review comments
    ~/.local/bin/gh api repos/ABilenduke/content-engine/pulls/{number}/comments \
      --jq '.[] | {path: .path, line: .line, body: .body, user: .user.login}'

    # Review summaries
    ~/.local/bin/gh api repos/ABilenduke/content-engine/pulls/{number}/reviews \
      --jq '.[] | {state: .state, body: .body, user: .user.login}'
    ```
7. Begin processing feedback

---

## Process

### Phase 1: Gather & Categorize Feedback

1. Read all PR review comments (inline and general)
2. Categorize each piece of feedback:
    - **Cosmetic** — formatting, naming, style, typos
    - **Logic** — bug, incorrect behavior, missing edge case
    - **Architecture** — structural concern, pattern violation, wrong abstraction
    - **Testing** — missing tests, weak assertions, coverage gaps
    - **Documentation** — missing docs, unclear comments, stale references
3. Present the categorized feedback to the user for confirmation
4. Ask: "Any items you want to defer or disagree with?"

### Phase 2: Create feedback.md

1. Create `feedback.md` in the story directory using `templates/feedback-template.md`
2. Record each feedback item with:
    - Number and summary
    - Type (Cosmetic/Logic/Architecture/Testing/Documentation)
    - Affected file(s)
    - What was raised (quoted or paraphrased from review)
    - Resolution: "Pending" initially
3. Commit: `feedback: create review cycle record`
4. This document is **immutable** — once entries are written, append updates and resolutions, never rewrite the original feedback text

### Phase 3: Apply Fixes

For each feedback item (in order of severity: Logic > Architecture > Testing > Documentation > Cosmetic):

1. Read the affected file(s)
2. Apply the fix
3. Run relevant tests to verify the fix doesn't break anything
4. Update feedback.md with:
    - **Resolution**: What was changed
    - **Commit**: the commit hash
5. Commit with message: `feedback: {short description of fix}`

For deferred items:
- Mark in feedback.md as "Deferred to future story: {reason}"
- Do NOT attempt to fix — these are intentionally out of scope

### Phase 4: Update PR & Close the Loop

1. Push all fix commits to the PR branch:
    ```bash
    git push
    ```

2. Reply to the PR with a summary of changes:
    ```bash
    ~/.local/bin/gh pr comment {number} --repo ABilenduke/content-engine \
      --body "$(cat <<'EOF'
    ## Feedback Addressed

    | # | Type | Summary | Resolution |
    |---|------|---------|------------|
    | 1 | Logic | {summary} | Fixed in {hash} |
    | 2 | Testing | {summary} | Fixed in {hash} |
    | 3 | Architecture | {summary} | Deferred — {reason} |

    **Total**: {N} items | {N} resolved | {N} deferred
    EOF
    )"
    ```

3. Update feedback.md with final summary section
4. Commit: `feedback: finalize review cycle record`

5. If all feedback is resolved (no deferred items), move ticket to Done:
    ```bash
    ~/.local/bin/gh issue close {ticket-number} \
      --repo ABilenduke/content-engine \
      --comment "All feedback addressed. PR #{pr-number} ready to merge."
    ```

---

## Handling Deferred Feedback

Not all feedback needs to be addressed in this PR:

- **Valid but out of scope** → note in feedback.md as "Deferred to future story: {reason}"
- **Disagreement** → discuss with user, document the decision in feedback.md as "Declined: {rationale}"
- **Requires re-architecture** → too big for a feedback cycle. Create a new story: "This feedback reveals a bigger issue. Consider running `/research story` to create a proper story for it."

Track deferred items so they can become future stories. Suggest creating follow-up tickets if warranted.

---

## Progress Indicator

```
📝 Feedback [{story}]: Phase N of 4 — [Phase Name]
[██████░░░░░░░░] N/4 complete
PR: #{number} | Items: {resolved}/{total}
```

---

## Critical Rules

1. **feedback.md is immutable** — append corrections and resolutions, never rewrite the original feedback text
2. **Every fix gets its own commit** — atomic, traceable changes with message prefix `feedback: `
3. **Run tests after every fix** — don't batch fixes and hope they work
4. **Deferred items must be documented** — they're future work, not forgotten work
5. **Don't scope-creep** — if feedback reveals a bigger issue, that's a new story, not a bigger PR
6. **Respond to the PR** — the reviewer should see what was changed without digging through commits

---

## After Completion

1. Tell the user: "Feedback processed. {N} items resolved, {N} deferred. PR #{number} updated with {N} commits."
2. If all feedback is resolved: "PR is ready for re-review or merge. Ticket moved to Done."
3. If items were deferred: "Consider creating follow-up stories for deferred items: [list]"
4. If the PR is approved and merged, the ticket auto-moves to Done (if GitHub workflows are configured)

$ARGUMENTS
