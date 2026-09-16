# Choosing useful follow-up questions

Consult this guide when a consequential gap remains. It is a menu, not an interview script.

## Choose the next question

Ask what would most change scope, correctness, acceptance, or avoidable rework. First check whether
the conversation, repository, or an authoritative source already answers it. Technical exploration
usually resolves file locations, framework versions, test commands, and existing behavior.

For a product decision, explain the concrete choice and its consequence. Present a recommendation
when supported; keep meaningful alternatives available. Avoid leading choices that smuggle a new
feature into scope. Batch at most three related questions, then use the answers to select the next
gap. An answered question needs revisiting only when new evidence conflicts with it.

## Question menu

| Gap                      | Useful prompt                                                                                                                       | Stop condition                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Outcome or audience      | “Who needs this, and what can they accomplish afterward that they cannot today?”                                                    | A concrete user need and desired behavior are clear.                        |
| Scope boundary           | “Should search cover loaded items or all records? Loaded-only is simpler; all-record search needs API support.”                     | The v1 boundary and excluded behavior are explicit.                         |
| Conflicting requirements | “These two rules require different retention behavior. Which applies to stored data, and which to what users see?”                  | The contradiction is resolved without silently dropping either requirement. |
| Success                  | “What observable result would show this works? If there is no baseline, which acceptance scenarios should define delivery success?” | Success is verifiable without fabricated targets.                           |
| Consequential tradeoff   | “Should this preserve the existing API, or may the response contract change for all consumers?”                                     | Compatibility and affected consumers are settled.                           |
| Failure behavior         | “If the external service is unavailable, should the action wait, fail visibly, or queue for retry?”                                 | The relevant failure has specified behavior.                                |
| Uncertain assumption     | “What evidence would establish this dependency can meet the requirement?”                                                           | Evidence exists or a bounded investigation is defined.                      |

These examples suggest forms of questions, not default requirements. Ask about privacy, security,
accessibility, retention, scale, and rollout only to resolve requirements relevant to the work.

## Keep the conversation efficient

- For a fully specified change, write the plan immediately after the necessary inspection.
- For a vague request, begin with the outcome and scope decisions, not a filename or roadmap date.
- If the user says “use your judgment,” choose and label reasonable defaults within that authority.
  Explain a material unresolved uncertainty instead of disguising it as an accepted requirement.
- If the user requests an early draft, mark it Draft and make blocking questions visible.
- If information cannot be obtained, produce a Discovery needed plan identifying the investigation
  and dependent work. Do not repeat an unanswerable question to simulate progress.
- Research can settle facts; it cannot decide the user's product priorities for them.
- When a baseline is explicitly absent, propose how to obtain it and label the benefit as a
  hypothesis. Asking for the already-missing evidence or permission to be accurate adds no decision.
- Reflect a consequential choice briefly when it helps alignment. Do not repeat a phase banner or
  summarize the entire conversation on every turn.
