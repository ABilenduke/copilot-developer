# Question Bank Reference

A curated set of probing questions organized by phase. These are a toolkit — NOT a script. Pick the right questions for the context, rephrase naturally, skip ones that don't apply.

---

## Phase 1: Qualification & Purpose

### Core
- What task do you find yourself repeating that Claude gets wrong or inconsistent?
- What goes wrong today when Claude doesn't have this guidance?
- When should this skill activate? What phrases or code contexts trigger it?
- Is there an existing skill that partially covers this? Could this be a section in that skill instead?

### Depth
- Is this guidance for Claude (skill) or guidance for a subagent (agent knowledge)?
- How often does this come up — every session, weekly, rarely?
- What does a "bad" outcome look like without this skill?

### Challenge
- Could this be solved with a CLAUDE.md entry instead of a full skill?
- Is the problem inconsistent behavior or missing knowledge? (Skills solve both differently)
- Are you building a skill because it's needed, or because it's interesting?

---

## Phase 2: Scope & Boundaries

### Core
- Can you describe the skill in one paragraph? If you can't, it's too big — split it.
- What code areas does it cover? Which directories, file types, models?
- What's explicitly excluded? Where does this skill end and others begin?
- Does it need supporting files? (templates, examples, both, neither)

### Depth
- What sibling skills exist? Draw the boundary between them.
- Does it chain with other skills? (receives context from X, feeds into Y)
- How many modes of operation? (>4 suggests the scope is too broad)

### Challenge
- If I cut the scope in half, what stays?
- You said it covers [X, Y, Z] — are those really one concern or three?
- Would a user understand when THIS skill applies vs. [sibling skill]?

---

## Phase 3: Instruction Design

### Domain Skills
- What are the 3-8 domain sections? (e.g., "Model Patterns", "Controller Conventions")
- What code snippets illustrate each pattern? Can you pull from the actual codebase?
- What are the 3-5 most common pitfalls in this domain?
- What does a "bad" outcome look like? What constraints prevent it?
- Are there any "always do X, never do Y" rules?

### Workflow Skills
- How many phases? What's the goal and output of each?
- When should the skill write to disk? (checkpoints)
- What questions drive each phase?
- Does it need a progress indicator?
- What does a completed output look like? (build an example)

### Utility Skills
- What rules does it enforce?
- What reference data does it maintain? (mapping tables, checklists)
- How does it interact with hooks or other automation?

### Challenge
- Walk me through a real scenario. What does Claude do at each step?
- What's the minimum viable version of this skill?
- Which sections would a senior dev skip? (Those might be over-documented)

---

## Phase 4: Security & Tool Constraints

### Core
- Should this skill restrict which tools Claude can use? (Most skills don't need restrictions)
- Does this skill do heavy lifting that would benefit from a companion subagent?
- Does it cover code paths that should trigger doc-sync hints when edited?

### Depth
- If a companion agent is needed, what model should it use? (sonnet for speed, opus for quality)
- What code path patterns should map to this skill in `doc-sync-hint.sh`?
- Should the documentation-maintenance skill know about this skill's domain?

---

## Phase 5: Writing Quality

### Self-Review
- Does the description clearly explain WHEN to activate? (Not just what it does)
- Are code snippets from the actual codebase, not generic examples?
- Would a developer reading this skill understand the "why" behind each convention?
- Are the "Common Pitfalls" based on real mistakes, not hypothetical ones?

### Comparison
- Compare against `pest-testing` or `content-publishing` — does quality match?
- Is the density appropriate? (Too sparse = unhelpful; too dense = ignored)
- Does it follow the `<code-snippet>` convention for code blocks?

---

## Phase 6: Integration Verification

### Checklist
- Is the skill registered in `boost.json`? (domain/utility only)
- Are hook mappings added to `doc-sync-hint.sh`? (if it covers specific code paths)
- Is the documentation-maintenance mapping table updated?
- Can you describe how to test that the skill activates correctly?
