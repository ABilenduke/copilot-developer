# Example: quoted CSV fields

This fictional example illustrates reporting, not evidence for a real project.

**Question:** Can the current importer's line-splitting approach support quoted commas and embedded
newlines, or should it use a CSV parser? Scope is syntax handling; production throughput is unmeasured.

**Repository fact:** Inspection of the import function shows `splitlines()` followed by `split(",")`.

**Experiment:** In a disposable Python standard-library probe, compare that approach with `csv.reader`
using this input:

```python
import csv
import io

payload = 'name,note\n"A, B","line one\nline two"\n'
expected = [["name", "note"], ["A, B", "line one\nline two"]]
actual = list(csv.reader(io.StringIO(payload)))
assert actual == expected
print(repr(actual))
```

**Illustrative observation:** The parser returns the expected two records and preserves both quoted
fields; naïve splitting separates the embedded newline and comma incorrectly. In a real report, record
the actual runtime version and command output, plus any authoritative documentation used.

**Recommendation:** Use a CSV parser for these required quoted-field cases. The observed split approach
does not meet them. No third-party library is established as necessary by this result.

**Outcome: Answered** for the bounded syntax question. This does not establish memory usage, malformed
input policy, encoding support, or production throughput. Confirm those requirements before planning
the import change. No production implementation, ticket, or commit is implied.
