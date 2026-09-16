# Execution journal

Keep one current record per execution. Use the plan as the source of requirements, referencing IDs
instead of copying its full contents. A chat-only plan needs a compact snapshot of agreed outcomes,
exclusions, acceptance criteria, decisions, and ordered steps so a new session can resume without the
conversation. Record evidence, not a transcript of every command or thought.

Use the five sections below, omitting inapplicable fields rather than inventing values. An existing
journal may keep its useful layout; reconcile its content without erasing consequential history.
Replace obsolete current-state claims and append a short dated correction for material errors.

```markdown
# Execution: <topic>

**Status:** In progress

## Execution context

- Plan: <relative link or agreed chat-plan snapshot>
- Requested scope: <included requirements and explicit exclusions>
- Workspace: <repository and checkout/worktree>
- Starting revision: <observed revision, when available>
- Existing changes: <relevant tracked, staged, and untracked work to preserve>

## Progress

- [ ] S1 — <work and requirement references; dependencies if relevant>
- [ ] S2 — <work and requirement references; dependencies if relevant>

## Verification evidence

| Requirement / acceptance | Actual check                                           | Result and limitations                  |
| ------------------------ | ------------------------------------------------------ | --------------------------------------- |
| <reference>              | <command, assertion, or inspection actually performed> | <observed outcome; relevant code state> |

## Decisions and deviations

- <date>: <consequential discovery, choice or correction, rationale, affected scope>

## Handoff

<Delivered behavior, remaining work or blocker, and concrete next action.>
```

Checklist ticks mean the referenced work is done, not that an attempted prerequisite succeeded. Split
implementation from unavailable verification so a reader can see what remains. Include enough command
and environment detail to reproduce material results; keep long output in existing test artifacts when
useful. Label historical evidence that no longer proves the current state. Do not record secrets.

Use observed dates and revisions. Do not invent commit hashes, owners, estimates, or deadlines. If a
user requests a commit, record its hash after it exists; do not create extra commits merely to make a
journal contain its own final commit hash. A final journal update may remain for review according to
the user's Git instructions.
