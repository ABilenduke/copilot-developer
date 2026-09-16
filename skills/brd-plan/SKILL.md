---
name: brd-plan
description: 'Plan software changes and create or revise a BRD for planning, requirements discovery, or implementation-plan revisions, excluding direct implementation, routine debugging, code review, and plans mentioned only as context.'
---

# BRD Plan

Produce one proportionate business requirements document (BRD) connecting **WHY → WHAT → HOW → ORDER**.
Investigate what can be learned, ask what requires a decision, and finish with a verifiable handoff.
This skill adds structure to the host's planning workflow; it does not change Codex modes.

## Ground the work

Read the user's request, prior decisions, relevant repository instructions, existing plans, and the
implementation and tests that establish current behavior. Infer the actual stack and conventions
from evidence. A missing repository, feature catalog, or companion skill is context, not a prerequisite.
When source access is unavailable, distinguish supplied context and proposed paths from inspected facts.

Keep a compact working account of **facts**, **user decisions**, **proposed defaults**, and
**unresolved assumptions**. Inspect only what can change the plan. Cite consequential repository
evidence or external sources where used. Research authoritative sources when requested or when
needed to resolve uncertain or changeable facts; separate sourced findings from inference.

Read [question guidance](references/questions.md) when consequential gaps remain. Read the
[BRD outline](references/brd-template.md) when composing or revising a document. Consult the
[worked example](references/example.md) only when an example would clarify the expected level of detail.

## Resolve consequential gaps

1. Identify unknowns affecting business outcomes, scope, required behavior, acceptance, constraints,
   or consequential implementation choices. Resolve discoverable facts with inspection first.
2. Ask **up to three related questions per round**, using a structured question tool when available
   in the current mode, or concise text otherwise. Offer meaningful choices and a recommendation
   with its tradeoff when useful. Ask one open question when choices would be artificial.
3. Incorporate the answers, investigate newly exposed uncertainty, and ask the next material
   question only if one remains. Do not repeat answered questions or ask the user to locate facts
   that tools can discover. There is no minimum question count or mandatory number of rounds.
4. Use visible, reversible defaults for routine details. A consequential unresolved choice needs a
   user answer or evidence; elapsed time and silence do not resolve it. Preserve prior authorization
   and avoid adding phase-by-phase sign-offs.

Depth follows uncertainty and impact. A specified small change can proceed directly to a short
plan. For larger work, resolve consequential interfaces, data flow, dependencies, failure behavior,
compatibility, and release concerns. Include alternatives only for meaningful tradeoffs.

Use qualitative priorities by default. RICE is optional when comparing competing investments with
credible reach, impact, confidence, and effort inputs. Metrics, effort, owners, dates, and risk counts
are evidence-dependent, not template quotas. Label an unmeasured benefit as a hypothesis; specify
how to assess it without inventing a numerical promise.
When context explicitly says evidence is unavailable, state the limitation and propose how to
measure it. Do not request the same absent evidence again or seek permission to avoid an unsupported
claim; ask only about a remaining decision that would change the plan.

## Compose and check the handoff

Use the five sections in the BRD outline, keeping each brief for small work. Give requirements
stable IDs such as `REQ-001`, observable acceptance criteria, and implementing delivery steps.
Link **requirement → acceptance criterion → delivery step** without duplicating the whole plan in a
second matrix. Acceptance checks describe behavior; implementation steps explain how to deliver it.

Select an honest planning status:

- **Draft:** Still being refined or awaiting a material decision.
- **Discovery needed:** An unresolved blocker requires investigation. Identify the evidence or
  decision needed, concrete investigation steps, and what downstream work depends on the result.
  Complete a bounded discovery handoff instead of presenting speculative implementation as ready.
- **Ready:** Required behavior is clear, every required capability has acceptance criteria and a
  delivery step, consequential choices are settled, and no implementation-blocking question remains.
  Readiness describes completeness. Record approval only when explicitly given.

Before finalizing, check for contradictions between scope, success claims, requirements, tests, and
steps. Verify that interfaces and compatibility choices are specific enough for the work; ground
test commands in the repository where available. Label proposed new files and commands accordingly.
Include recovery and rollout measures when the change needs them. Do not claim checks were run
when they are only planned.

## Revise and resume

Read the existing document and recheck evidence relevant to changed scope or the next decision.
Preserve remaining requirement IDs; do not recycle a removed ID for a different requirement.
Update affected acceptance criteria, steps, dependencies, success claims, and open questions together.
Remove obsolete active work, recording the scope change briefly in revision notes. Keep the full
replacement document coherent and reassess readiness. Revisions need no restart of the interview.

## Deliver in the active mode

- **Native Plan Mode:** Perform permitted read-only investigation and present the complete plan in
  chat using the host's required final-plan format, including a `proposed_plan` block when required.
  Do not write planning files, change modes, or treat plan approval as permission to bypass the mode.
- **Writes allowed:** Creating or revising a plan authorizes saving that planning artifact. Honor an
  explicit chat-only request. Otherwise use the explicit destination, existing plan being revised,
  or established repository planning convention; fall back to
  `docs/plans/YYYY-MM-DD-<topic>.md` using the session's local date and an inferred kebab-case topic.
  Read an existing destination before editing. If the inferred path belongs to unrelated work,
  choose a descriptive unused suffix instead of overwriting it. Create only the needed directories.
- Save one BRD. Existing split documents may inform it, but this skill has no feature-index,
  companion-executor, or ticket-creation dependency. Planning does not itself authorize application
  edits, issue creation, publishing, or messages to others.

Finish with the complete chat plan or a link to the saved document and its status. Surface material
limitations and any next decision. Do not introduce an extra approval ritual after the handoff.
