# Worked example: label normalization

This fictional example illustrates one execution and its later resumption. Check outputs below are
illustrative; record only evidence actually obtained in a real run.

The plan `docs/plans/2026-09-15-labels.md` requires:

- **REQ-001:** Trim surrounding whitespace while preserving case and internal spaces. Acceptance:
  `" \tA  B\n "` becomes `"A  B"`; whitespace-only input becomes `""`.
- **REQ-002:** Reject nonstrings with `TypeError`, including `None`, integers, and lists.
- **S1:** Implement REQ-001 and REQ-002 in `text_ops.py` with regression tests.
- **S2:** Run the unittest suite and the repository's required contract checker.

The user authorized implementation in the current checkout. A staged personal note is unrelated.
The contract checker is initially unavailable. The journal is
`docs/plans/2026-09-15-labels.execution.md`:

```markdown
# Execution: label normalization

**Status:** Verification incomplete

## Execution context

- Plan: [Labels](2026-09-15-labels.md), REQ-001 and REQ-002; no new dependencies.
- Workspace: labels repository, current main checkout.
- Existing changes: staged personal.txt note preserved, including its unstaged additions.

## Progress

- [x] S1 — Implement trimming and TypeError validation; add tests (REQ-001, REQ-002).
- [ ] S2 — Unit suite passes; required contract checker remains unavailable.

## Verification evidence

| Requirement / acceptance | Actual check                                                                               | Result and limitations                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| REQ-001                  | python3 -m unittest discover -s tests -v; inspected whitespace and preservation assertions | PASS on current text_ops.py.                                                             |
| REQ-002                  | Same suite; inspected nonstring TypeError assertions                                       | PASS on current text_ops.py.                                                             |
| S2 contract validation   | python3 -m company_contract_checker                                                        | Cannot run: module is unavailable.                                                       |
| Scope / existing work    | Full task diff, new test file, and staged diff review                                      | Changes match requested behavior; personal note and index preserved; no commits created. |

## Decisions and deviations

- 2026-09-15: Implemented specified behavior; missing internal checker prevents complete verification.

## Handoff

Normalization is implemented and unit-tested. Provide the required checker in its supported environment
and run S2. Changes remain ready for review; execution is not Complete.
```

On resumption, the checker has become available and the module has moved to `src/text_ops.py`.
The plan and imports point to the new path. Inspect them, confirm the original behavior remains, and
run relevant checks against the moved code. If both required checks pass, reuse this journal, mark S2
done and status Complete, update evidence to the current module, and add a short dated entry describing
the move and successful verification. Keep the historical checker limitation as resolved history.
Do not recreate the old module, add a second journal, or invent a commit.
