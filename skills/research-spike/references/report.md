# Decision record

Use one document. Keep a small spike short; add comparison tables or experiment detail only when useful.

```markdown
# Spike: <decision question>

**Outcome:** Answered | Conditional | Unresolved

## Question and constraints

<Decision enabled, relevant requirements, scope, exclusions, and any supplied budget.>

## Evidence and findings

<Repository paths/revision, authoritative sources with versions/dates, experiments with commands and
observed results. Distinguish fact, external claim, observation, inference, and unknowns.>

## Recommendation and tradeoffs

<Supported choice or no change; consequential alternatives; why it fits the decision criteria.>

## Remaining uncertainty and next steps

<Specific conditions or unanswered questions; next check or implementation-planning input.>
```

For external claims, cite directly supporting sources near the relevant statement. For local claims,
reference inspected files and relevant code state. Retain enough experiment detail to reproduce the
result without relying on a vanished temporary directory. Use measured values only for the conditions
actually tested; omit unsupported numbers rather than adding invented estimates or confidence scores.

On resumption, reuse the supplied record, preserve consequential history with brief dated revisions,
and recheck evidence affected by code, dependencies, constraints, or source changes. Remove withdrawn
scope from the active recommendation. Keep old measurements labeled historical. Do not silently convert
a conditional recommendation into an implementation approval.
