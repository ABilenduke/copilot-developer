# BRD outline

Use the following five sections as a document contract. Scale their length to the work: short prose
and a few requirement bullets are enough for a small change. Use tables when they clarify mappings.
Omit irrelevant subtopics instead of manufacturing content to fill them.

Start with a descriptive title, local date, and **Status: Draft | Ready | Discovery needed**, selecting
one status. Identify the existing plan being revised when applicable. Include approval only if it
was actually given; Ready alone is not an approval record.

## 1. Business context — WHY

Describe the problem, affected users or stakeholders, current behavior, desired behavior, and
intended value. Point to the evidence for consequential claims. Describe success in observable
terms; distinguish delivery acceptance from longer-term business impact.

Use supplied or measured targets. If a desired business benefit lacks a baseline, label it a
hypothesis and state the observation or measurement needed. Do not invent a percentage, budget,
owner, deadline, or response-time target. Stakeholder tables and financial justification are optional.

## 2. Scope and requirements — WHAT

State what is included, excluded, and constrained. Capture business rules and quality requirements
relevant to this work, including accessibility, security, performance, and data retention when they
apply. Read actual project requirements rather than importing an example stack or standard.

Give each distinct required behavior a stable identifier, priority, rationale/source, and observable
acceptance criterion. A compact table can use:

| ID      | Requirement and rationale/source                       | Priority | Acceptance criteria                      |
| ------- | ------------------------------------------------------ | -------- | ---------------------------------------- |
| REQ-001 | One behavior, tied to a stated user need or constraint | Must     | Preconditions, action, observable result |

The row above describes the format; replace it with actual requirements. Use Must/Should/Could for
in-scope priorities; put deferred work outside scope. A Must has at least one acceptance criterion.
Use Given/When/Then when helpful, or equally precise ordinary language. Cover consequential alternate
and failure paths. Avoid requirements such as “robust” or “intuitive” without observable meaning.

## 3. Technical approach — HOW

Connect the requirements to the inspected architecture and proposed changes. Cite meaningful paths
or symbols as evidence; explicitly identify proposed new paths. Specify consequential API/schema
changes, data flow, integrations, compatibility, and failure handling needed for implementation.
Explain the selected approach and material alternatives with their tradeoffs.

Prefer affected subsystems and a focused file list to an exhaustive speculative manifest. If source
is unavailable, describe a proposed structure and the needed inspection instead of asserting a
current architecture. Clearly identify decisions that prevent implementation readiness.

## 4. Delivery and validation — ORDER

Order steps by dependency and useful deliverable. Each step identifies its requirement IDs, concrete
change, dependencies, and verification. Keep acceptance criteria with requirements; refer to them
from steps and explain how they will be checked.

For example, write a step as: **Step 1 — capability (REQ-001).** Describe the change, affected code,
dependency (if any), and the test or observation that verifies its acceptance criteria.

Include the minimum useful end-to-end slice and investigate blocking technical unknowns before
dependent implementation. Use the repository's actual test commands when known, marking suggested
new commands as proposed. Distinguish planned tests from completed checks. Include release,
migration, rollback, and monitoring details only when applicable. Estimates are optional and must
state their basis; a user's time budget is a constraint rather than an estimate.

## 5. Decisions and assumptions

Summarize confirmed user choices, consequential evidence, proposed defaults, and unresolved
assumptions without repeating the requirements. Each blocking unknown names the missing decision
or evidence, its effect on delivery, and the next question or investigation. Do not invent an owner.

If a blocker remains, use Draft or Discovery needed and explicitly condition dependent work on its
resolution. A Ready plan may contain an unmeasured future business benefit or reversible default
when it does not block implementation; it may not hide an undecided required behavior.

On revision, briefly record the changed decision and affected IDs. Removed IDs remain retired;
remaining IDs stay stable. Reconcile requirements, acceptance, steps, success claims, and questions
so the current document can be handed off without reading a superseded version.
