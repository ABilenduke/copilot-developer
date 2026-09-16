---
name: review-plan
description: 'Review delivered work against an existing plan or BRD for acceptance coverage, regressions, and completion claims, excluding plan-only critiques, ordinary code reviews without a plan, and implementation requests.'
---

# Review Plan

Independently assess whether delivered behavior fulfills the current agreed plan. Produce actionable,
evidence-backed findings and concise acceptance coverage. Accept a BRD, chat plan, ordinary Markdown,
or usable split documents. No companion skill, connector, journal, or specific repository layout is
required. A prior executor's success claim is evidence to inspect, not a conclusion to inherit.

## Establish the review boundary

Use the explicitly supplied plan or the unambiguous plan in the conversation. Ask for its location or
which candidate to use only when necessary. Read applicable repository instructions, current plan
decisions, relevant source, tests, and any execution journal. Preserve requirement IDs; use stable
section or step references if IDs are absent. A missing journal alone is not an implementation defect.

Identify the requested revision, comparison base, and included changes. For current-workspace reviews,
inspect staged, unstaged, and relevant untracked files; record HEAD when available. For a supplied
commit range or PR, honor that boundary. Do not silently choose a branch base or review a different
revision. Ask if consequential ambiguity remains, while inspecting unambiguous context. Review actual
resulting code and affected callers as well as the diff: missing implementation may have no changed
line. Keep unrelated user changes outside findings unless they materially affect the requested work.

Resolve plan revisions using the latest explicit user decisions. Removed requirements stay removed;
stale journal tasks do not restore scope. Distinguish a contradictory or underspecified acceptance
criterion from a proven implementation failure. Ask only consequential questions evidence cannot settle.

## Preserve the workspace

Review is read-only by default: do not fix source, edit plans or journals, write a report into the
repository, stage, commit, push, publish comments, or change execution status. Return the review in
chat. Honor explicit authorization to save a report when the active mode permits it; inspect any
existing destination before writing. Authorization to review does not authorize remediation or external
messages. Preserve authorization already given if the user separately requests those actions.

Inspect check commands for side effects before running them. Use non-mutating checks or an appropriate
disposable environment for caches, build output, databases, and reproductions. Do not auto-fix, install
dependencies, run migrations against live data, or invoke external services merely to verify a finding.
If safe verification is unavailable, state the limitation and continue code inspection. In native Plan
Mode, remain read-only and follow the host's response requirements; no report or Git writes.

## Trace acceptance to evidence

For every in-scope requirement, identify the relevant implementation and what demonstrates its
observable acceptance criteria. Read assertions, not just test names or green results. Check relevant
boundary and failure behavior, permissions, compatibility, interfaces, and data flow when the change
affects them. Avoid unrelated security or architecture audits and stylistic preferences.

Run proportionate repository checks and targeted reproductions when safe and useful. Record actual
commands, outcomes, and reviewed code state. Reuse current applicable evidence; do not repeat checks
without new changes or uncertainty. Treat old results as historical until reconciled with current code.
Separate introduced failures, pre-existing failures, and unavailable verification. Never weaken an
assertion or invent an output to make acceptance appear satisfied.

Challenge claimed completeness against actual scope and required checks. A required missing verifier
prevents a fully verified conclusion, even if inspected code appears correct. An omitted automated
test does not by itself prove broken behavior; report the precise evidence gap or violated explicit
testing requirement. Existing code can satisfy a requirement without a new diff.

## Report useful findings

Lead with concrete findings ordered by impact, then acceptance coverage and verification limitations.
Use [report guidance](references/report.md) to distinguish defects, evidence gaps, and unresolved
decisions. Read the [worked example](references/example.md) when green tests conflict with a completion
claim. Keep small reviews short; do not enforce a finding count or produce speculative objections.

Each finding identifies the requirement or affected behavior, triggering condition, observed failure,
practical impact, and a precise file/line reference or missing artifact location. Offer a focused
correction direction without implementing it. Consolidate duplicate symptoms of one cause. Distinguish
confirmed evidence from inference and avoid severity inflation.

Conclude with **Changes needed**, **Verification incomplete**, or **No findings**, qualified by what was
actually reviewed. Confirmed acceptance defects take Changes needed; unresolved decisions or required
evidence gaps take Verification incomplete when no defect is established. Report both when applicable.
No findings means no actionable defects found within the stated scope, not a guarantee or permission
to merge. Do not overwrite the plan's planning status or the journal's execution status.
