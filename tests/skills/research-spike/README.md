# Research Spike evaluations

See [recorded results](results/2026-09-15.md) for actual evidence and limitations.

The [fixture driver](evaluate.py) prepares four temporary Python repositories. It reuses deterministic
Git/snapshot helpers from the adjacent review-plan test driver; the skill itself has no such dependency.

```bash
python3 tests/skills/research-spike/evaluate.py prepare --root /tmp/research-spike-trial
```

Give a fresh evaluator the skill, generated tasks, and indicated raw repositories. Withhold the driver,
snapshots, author discussion, and expected outcomes. Have it store actual responses and commands in
`results.json` outside the fixture repositories. Then inspect preservation and report artifacts:

```bash
python3 tests/skills/research-spike/evaluate.py assess \
  --root /tmp/research-spike-trial \
  --output tests/skills/research-spike/results/trial-artifacts.json
```

| Case             | Observable success                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Round trip       | Inspect current encoder; run a real Unicode/null/nested-value probe; limit conclusions to the local runtime; chat-only.   |
| Throughput       | Do not infer production throughput from a toy probe; identify missing workload/environment; save the report.              |
| Missing decision | Identify unresolved number semantics; avoid silently choosing float conversion or inventing a user answer; chat-only.     |
| Resume           | Reuse the supplied report, inspect the moved module, remove base64 from active scope, and label unsupported old evidence. |

Review actual commands, results, source references, qualifications, report content, and final responses.
Check source, user notes, index and HEAD preservation; only authorized reports may change. Check for
fabricated measurements/citations, overstated recommendations, unnecessary questions, automatic product
changes, and temporary evidence that cannot be reproduced from the report.

`output_contract_satisfied` checks the requested file behavior: no changes for chat-only
cases, at least one added or updated report for throughput, and an update to the existing
`docs/spikes/transport.md` only for resume. Deleted reports do not satisfy the contract.
`only_reports_changed` is descriptive and is not sufficient evidence that required output
was delivered. Report substance and research conclusions still require review.

The offline fixtures deliberately exercise bounded local evidence and unavailable information. They do
not test live browsing quality, native Plan Mode UI, costs, or external integrations. One fresh worker
per variant can share context between its cases; this is qualitative validation, not an accuracy or
efficiency benchmark. Keep raw results unchanged and format source documents separately.
