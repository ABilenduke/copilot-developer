# Worked example: passing tests omit required behavior

Illustrative scenario only; do not copy these results into a real review without obtaining evidence.

The current plan requires REQ-001 to strip outer whitespace while preserving inner spaces, and
REQ-002 to raise `TypeError` for nonstrings. `labels.py` contains:

```python
def normalize(value):
    return value.strip()
```

The only test asserts `normalize(" A ") == "A"`. It passes. The execution journal says Complete.
A safe isolated call to `normalize(None)` raises `AttributeError`.

## Example review

### P2 — Reject nonstrings with the required exception

`labels.py:2` calls `.strip()` before validating the input. For `None`, the observed result is
`AttributeError`; REQ-002 requires `TypeError`. Callers handling the documented exception will miss
this failure. Add explicit input validation and regression coverage for the specified nonstring inputs.

### Acceptance coverage

- REQ-001: Inspected `.strip()` behavior and passing trim test; inner-space and blank-input cases
  were verified by isolated calls.
- REQ-002: Unmet; reproduced wrong exception for `None`. Current tests omit nonstring behavior.

**Conclusion: Changes needed.** Reviewed the current workspace against the supplied plan. The passing
suite does not support the journal's Complete claim. No source, test, plan, or journal files changed.

After a fix, review the current implementation and rerun the affected checks. If a required external
checker is then unavailable, report Verification incomplete rather than retaining the resolved defect
or inferring that the checker would pass.
