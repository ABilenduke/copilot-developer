---
name: execute-plan
description: 'Implement or resume an agreed software plan or BRD, verify acceptance criteria, and maintain an execution journal, excluding ordinary coding without an existing plan and requests only to draft or review a plan.'
---

# Execute Plan

Turn an existing plan into working, verified changes and a concise record another session can resume.
Accept BRDs, conversation plans, ordinary Markdown, and usable legacy split documents. No companion
skill, model, connector, catalog, or particular repository layout is required.

## Respect mode and authorization

In native Plan Mode, perform only read-only readiness assessment and propose execution in the host's
required chat format. Make no source, journal, or Git changes. An execution request does not change
the active mode.

When implementation is allowed, work in the current checkout or existing worktree. Leave changes
ready for review by default. Commits, pushes, PRs, ticket updates, and deployments follow explicit
user instructions, including authorization already given. Preserve explicit review checkpoints;
ordinary step boundaries do not require renewed permission.

## Reconcile the plan with reality

1. Use the explicitly supplied plan or the unambiguous plan in the conversation. Read referenced
   supporting documents only as needed. Ask which plan only if multiple plausible candidates remain;
   if none is available, request its location or content. Do not infer readiness from its filename,
   headings, directory, or status label.
2. Identify requested behavior, acceptance criteria, dependency order, exclusions, and consequential
   decisions. Keep existing requirement IDs and delivery references. For plans without IDs, establish
   stable step references in the journal. A BRD's Ready status describes planning completeness, not
   authorization. A Discovery needed plan may authorize investigation while implementation remains
   blocked on specific decisions.
3. Inspect applicable repository instructions, relevant implementation and tests, available check
   commands, and working tree and index changes before editing. Discover the actual stack. Record
   starting revision when available and baseline failures that affect later verification.
4. Preserve unrelated edits and staged state. A dirty tree alone is not a blocker. Use isolation only
   when necessary; carry relevant context and changes deliberately without discarding the user's work.
   If overlapping changes make ownership or intended behavior unclear, resolve that specific gap.
5. On resumption, read the existing journal and reconcile it with the latest plan, code, working tree,
   and check evidence. Recheck affected assumptions and stale results. Continue from the first unmet
   dependency; retain completed behavior and remove explicitly dropped scope from pending work.
   Read [verification and resumption](references/verification-resumption.md) for drift or failures.

Ask focused questions only about consequential scope, behavior, compatibility, dependencies, or
authorization that evidence cannot settle. Resolve routine implementation details through repository
conventions and judgment. Preserve previous answers. While a blocking answer is pending, continue
independent authorized work; do not guess the blocked behavior.

## Implement and verify useful increments

Follow dependency order, adapting step size to the change. Link completed work to requirement IDs or
stable step references. Record consequential deviations and rationale; keep acceptance criteria and
delivery steps consistent with authorized scope changes. Material new product choices need resolution
before their dependent implementation.

During implementation, run relevant tests, lint, type checks, and step-specific validation. Compare
actual behavior with the requirement: a passing suite may omit a required case or assert the wrong
thing. Add regression, boundary, failure, and permission tests where they address meaningful risks.
Simple documentation changes need appropriate inspection, not an invented test suite.

Derive commands and environments from the repository. Validate migrations in an appropriate disposable
environment; never inherit destructive example commands without checking their target and authority.
Diagnose failures and fix causes while evidence shows progress. Rerun affected checks after fixes;
broaden testing when changed dependencies or new evidence warrant it. Repeated failure without new
evidence requires a different approach or a precise blocker, not automatic advancement after a retry
count. Keep failed prerequisites and dependent steps incomplete; continue independent work.

Before completion, inspect the complete task diff, including new files and interactions with existing
changes. Reconcile every in-scope acceptance criterion against implemented behavior and evidence. Run
required repository checks plus relevant integration or end-to-end verification. Reuse still-valid
results when no relevant changes occurred. Distinguish introduced failures, pre-existing failures,
and unavailable verification. Never weaken an acceptance assertion just to obtain a passing result.

## Keep a concise execution journal

For a file plan, save beside it as `<plan-stem>.execution.md`; for legacy split documents, use the
primary plan's stem. Reuse the journal for that execution. For a chat-only plan, use the repository
convention or `docs/plans/YYYY-MM-DD-<topic>.execution.md` and include enough agreed plan context to
resume independently. Inspect existing destinations before writing; preserve an unrelated journal and
choose a descriptive suffix if needed. Honor explicit artifact destinations or no-write constraints;
report when durable recording is unavailable.

Read [journal guidance and template](references/journal.md) when creating or restructuring a journal.
Maintain five compact sections: **Execution context**, **Progress**, **Verification evidence**,
**Decisions and deviations**, and **Handoff**. Update the current summary and checklist after meaningful
increments and before handoff; preserve consequential history with brief dated entries and corrections.
Record commits only if they exist. Keep execution state separate from BRD planning status.

Use these execution statuses:

- **In progress:** Authorized implementation or verification is continuing.
- **Blocked:** A missing decision, prerequisite, or authorization prevents remaining implementation.
- **Verification incomplete:** Implementation is present, but required checks fail or cannot run.
- **Complete:** Requested scope is implemented and required acceptance checks are satisfied.

If implementation is blocked and verification also has gaps, use Blocked and record both. A scoped
success does not make the whole execution Complete. See the [worked example](references/example.md)
when a partial completion or subsequent resume needs clarification.

Conclude with delivered behavior, material verification results and limitations, journal location,
and any specific blocker or next action. Do not claim completion from the checklist alone.
