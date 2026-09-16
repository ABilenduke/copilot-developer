# BRD Plan evaluations

See the [2026-09-15 results](results/2026-09-15.md) for recorded responses, the focused revision,
fresh-session discovery evidence, and evaluation limitations.

## Protocol

The cases in [scenarios.json](scenarios.json) are reusable controlled behavioral probes. They cover
ambiguous and specified work, absent project infrastructure, conflicting requirements, unsupported
metrics, revision consistency, saving, and activation boundaries.

For each variant, use a fresh evaluating agent without the author's design discussion:

1. Supply the case context and request. Capture its first response before supplying the scripted
   answers. Keep cases independent.
2. Supply the scripted answers as the next user turn. Capture the resulting plan or remaining blocker.
3. For the saving case, provide an isolated temporary repository root and verify the actual file.
4. Record the complete responses, artifact locations, and limitations. Retain source-relative copies
   of generated artifacts with the results when useful.

Compare ordinary Codex judgment without a planning skill (`native`), the original Claude planner
(`legacy`), and the new skill (`brd-plan`) with the same cases and answers. Do not provide the grader's
expected answers or the author's conclusions to the evaluating agents.

Multi-case single-agent probes are cheaper preliminary checks, but are not independent statistical
trials: later cases share context and scripted answers are visible to the evaluator. Record this
limitation when using them. They do not verify the native Plan Mode UI, structured question tools,
or implicit skill selection in a real client. Use a separate fresh-session smoke test for discovery
and explicit invocation; report which client and mode were actually tested.

Captured results are excluded from formatting so response text and generated artifacts remain
verbatim. Absolute temporary paths in transcripts identify their original locations; artifact copies
under `results/artifacts/` are the portable record.

## Review rubric

Manually review the responses for these observable outcomes; heading matches alone are insufficient:

- **Question value:** Count questions already answered by the request or supplied repository facts.
  Distinguish necessary unresolved choices from confirmation of reversible implementation details.
- **Honesty:** Identify unsupported numerical claims, ownership, dates, or approval assertions.
- **Completeness:** Check whether every required behavior has observable acceptance criteria and an
  implementing step; identify unresolved decisions incorrectly labeled Ready.
- **Revision consistency:** REQ-001 and REQ-003 survive unchanged in identity; CSV delivery, tests,
  success claims, and delimiter questions disappear. The component evidence uses the new location.
- **Boundaries:** Missing catalogs do not prevent standalone planning; native Plan Mode writes no
  files; authorized saving creates the expected artifact; unrelated implementation stays outside the
  planning workflow.
- **Efficiency:** Record instruction size, response size, redundant questions, and actual token usage
  when available. Do not represent word counts as token counts or claim faster development from a
  small qualitative sample.

Treat missing requirements, fabricated facts, unauthorized mutations, and false readiness as
failures. Lower questioning or shorter output counts as an improvement only with completeness
preserved. Repeat changed or failing cases after revisions, then rerun the full set before release.

## Structural validation

Run the installed skill-creator's `scripts/quick_validate.py` against `skills/brd-plan`; the helper is
normally under `~/.codex/skills/.system/skill-creator/`. Check local Markdown references, parse
`agents/openai.yaml`, and run the repository's Prettier on changed source documents. These checks
validate packaging, not planning judgment.

## Research basis

- [GOV.UK: Plan user research](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service)
  supports prioritizing uncertainty and revising questions as evidence accumulates.
- [NASA: How to write a good requirement](https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/)
  supports atomic, verifiable requirements, explicit assumptions, and traceability.
- [Intercom: RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/)
  grounds optional prioritization in reach, impact, confidence, and effort evidence.
- [Basecamp: Principles of shaping](https://basecamp.com/shapeup/1.1-chapter-02)
  supports bounded work with enough direction to proceed without premature fine detail.
- [OpenAI: Testing agent skills](https://developers.openai.com/blog/eval-skills)
  motivates baselines, recorded outputs, and separate outcome and efficiency checks.
- [Codex skill documentation](https://learn.chatgpt.com/docs/build-skills)
  specifies discovery, user-level installation, symlinks, and invocation metadata.

These sources informed the design. They do not establish that this particular skill improves team
delivery; that needs evaluation and evidence from real use.
