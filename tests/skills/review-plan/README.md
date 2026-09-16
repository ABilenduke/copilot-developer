# Review Plan evaluation

The [fixture driver](evaluate.py) prepares four real Python/Git repositories. All begin with passing
tests, uncommitted implementation files, and unrelated staged and unstaged user notes.

```bash
python3 tests/skills/review-plan/evaluate.py prepare --root /tmp/review-plan-trial
```

Give an evaluator only `tasks.json`, the indicated repositories, and the skill for a candidate run.
Use a fresh evaluator with no inherited author conversation. Ask it to store actual review responses
and command results outside the repositories as `results.json`. Do not expose the driver, starting
snapshots, expected findings, or other variants. Compare ordinary Codex without a review skill against
the candidate, then independently check workspace preservation:

```bash
python3 tests/skills/review-plan/evaluate.py assess \
  --root /tmp/review-plan-trial \
  --output tests/skills/review-plan/results/trial-artifacts.json
```

## Rubric

| Scenario                | Expected evidence-backed outcome                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Gap despite green tests | Identify AttributeError instead of required TypeError; reject unsupported Complete claim.                 |
| Complete                | Recognize all requirements satisfied; do not invent defects or require unnecessary work.                  |
| Unavailable checker     | Separate correct implementation from unavailable required verification.                                   |
| Revised plan            | Honor removed CSV scope and current module path; distinguish stale journal from missing product behavior. |

Inspect actual reviews, reproductions, acceptance coverage, and byte-level file/Git snapshots. Assess
false positives, missed defects, unsupported completion, unnecessary questions, and unintended writes.
File preservation checks include ignored files, so Python checks use `-B` to avoid bytecode caches.

These are small controlled qualitative probes, with one fresh worker per variant and shared context
across its four cases. They do not prove general accuracy or productivity gains. Metadata and source
inspection cover invocation boundaries; actual native Plan Mode UI and implicit routing need separate
client evaluation. See [recorded results](results/2026-09-15.md) for checks actually performed.
