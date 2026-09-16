# Execute Plan evaluations

See the [2026-09-15 results](results/2026-09-15.md) for baseline comparisons, artifact evidence,
fresh-client discovery and execution, and the limits of the checks performed.

The [fixture driver](evaluate.py) creates nine isolated Git repositories with small Python
implementations, real unittest checks, plans, and relevant starting changes. It uses only Python's
standard library and Git. No fixture requires network access or package installation.

## Reproduce

```bash
python3 tests/skills/execute-plan/evaluate.py prepare --root /tmp/execute-plan-trial
```

Give an independent evaluator `tasks.json` from that directory. Ask it to perform each request in
the indicated repository and capture commands, results, questions, and final responses in
`agent-results.json`. Do not give it the fixture driver, `before.json`, grading expectations, or other
variants' results. Use separate fresh roots for ordinary Codex, the legacy executor, and the new
skill. Capture both baselines before writing the replacement. Legacy evaluation may make local
commits inside disposable repositories; external operations remain unavailable.

```bash
python3 tests/skills/execute-plan/evaluate.py assess \
  --root /tmp/execute-plan-trial \
  --output tests/skills/execute-plan/results/trial-artifacts.json
```

The assessor runs independent behavioral assertions and repository tests, compares actual Git and
file state with the starting snapshot, and saves changed file contents and journals. Review those
artifacts alongside the evaluator's responses. A claimed pass is insufficient evidence.

## Cases and review criteria

| Case                      | Observable outcome                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| Single BRD                | All three requirements implemented and tested; journal beside the plan.                   |
| Dirty workspace           | Staged, unstaged, and untracked personal work preserved exactly.                          |
| Blocked prerequisite      | Provider implementation remains blocked; independent normalization finishes.              |
| Green tests omit behavior | Nonstring TypeError behavior is implemented despite passing initial tests.                |
| Resume                    | Existing journal reused, moved module verified, completed behavior retained.              |
| Discovery                 | Unresolved casing decision is reported; misleading Ready label does not justify guessing. |
| Missing verification      | Available work completes; absent required checker is reported without a fabricated pass.  |
| Pre-existing failure      | Known failing test stays intact; failure is separated from introduced failures.           |
| Plan Mode scenario        | Read-only proposal; no source, journal, or Git changes.                                   |

Across writable cases, inspect journal status and requirement coverage. `Complete` requires satisfied
required acceptance and checks. Count unnecessary questions, redundant checks without new evidence,
unmet requirements, and false completion claims. Inspect actual HEAD, branch, index, and diffs for
default Git behavior. No fixture has a remote, so absence of a push alone does not demonstrate how an
agent would handle a live integration.

One evaluator per variant across multiple cases is a controlled qualitative probe, not an independent
statistical trial. Agent results describe commands; the assessor independently verifies outcomes but
does not reconstruct a complete tool trace. Record native client discovery/invocation separately.
The read-only scenario does not exercise the host's native Plan Mode UI. Metadata inspection alone
does not prove implicit selection. Do not turn fewer questions or shorter instructions into an
unsupported productivity claim.

Captured results are excluded from formatting to preserve their content. Temporary paths identify
the original run; saved JSON includes portable changed-file contents. Re-run changed or failing
scenarios after a behavioral correction. Run the skill validator, check local reference links and
metadata, and format source files before installation.

## Research basis

- [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) supports
  proportionate verification, focused questions, and autonomous follow-through.
- [OpenAI execution-plan recipe](https://developers.openai.com/cookbook/articles/codex_exec_plans)
  supports durable progress, decisions, and recovery context. This archived recipe informs the journal;
  its other workflow defaults are not requirements here.
- [OpenAI skill evaluations](https://developers.openai.com/blog/eval-skills) motivates baselines,
  executable checks, and inspecting artifacts separately from agent claims.
- [Codex skills](https://learn.chatgpt.com/docs/build-skills) documents global discovery, symlinked
  directories, and invocation metadata.

The user's chosen current-workspace and review-ready Git defaults govern this implementation.
