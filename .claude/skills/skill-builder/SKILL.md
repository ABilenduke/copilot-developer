---
name: skill-builder
description: >-
  Builds production-grade Claude Code skills through interactive discovery.
  Guides through qualifying the idea, scoping, designing architecture, writing
  SKILL.md and supporting files, and integrating with boost.json and hooks.
  Activates when the user wants to create a new skill, says "build a skill",
  "new skill", "create a skill", "skill for", or describes automation they
  want Claude to learn.
---

# Skill Builder

## HARD RULES

These rules are absolute. No exceptions.

### Rule 1: ALWAYS walk through discovery

Never generate a skill from a one-line description. Always walk through the interactive phases to understand purpose, scope, and boundaries. Even experienced users benefit from Phase 1 qualification.

### Rule 2: NEVER overwrite without confirmation

If a skill directory already exists, STOP and ask: "The skill '{name}' already exists. Do you want to update it or create a different skill?" Never silently overwrite.

### Rule 3: ALWAYS register in boost.json

Every domain skill must be added to the `skills` array in `boost.json`. Workflow skills invoked via slash commands do not go in boost.json.

### Rule 4: ALWAYS check for overlapping skills

Before creating a new skill, compare its scope against every existing skill. If overlap exists, propose merging or boundary clarification before proceeding.

---

## Purpose

This is a **meta-skill** that builds other skills through interactive Q&A. It ensures every new skill follows project conventions, has proper frontmatter, uses `<code-snippet>` blocks for code examples, and integrates with boost.json and hook mappings.

## Skill Type Classification

Every skill falls into one of three types. Identifying the type early determines the output shape.

| Type | Purpose | Output Shape | Examples |
|---|---|---|---|
| **Domain Knowledge** | Teaches patterns for a code area | SKILL.md with code snippets, "When to Apply", "Common Pitfalls" | `pest-testing`, `content-publishing`, `affiliate-tracking` |
| **Interactive Workflow** | Guides multi-step processes | SKILL.md with phases, progress indicator, templates/, examples/ | `plan`, `execute`, `feature` |
| **Utility** | Cross-cutting conventions | SKILL.md with rules and mapping tables | `documentation-maintenance` |

### Key Differences

- **Domain skills** go in `boost.json` — they auto-activate based on context
- **Workflow skills** are invoked via slash commands — they do NOT go in `boost.json`
- **Utility skills** go in `boost.json` — they auto-activate like domain skills
- Only workflow skills typically need `templates/` and `examples/` subdirectories
- Domain skills embed code patterns inline using `<code-snippet>` blocks

---

## First Steps

When this skill is invoked:

1. Read the supporting files in this skill directory:
    - `templates/questions.md` — question bank organized by phase (your toolkit, not a script)
    - `templates/skill-template-domain.md` — output template for domain knowledge skills
    - `templates/skill-template-workflow.md` — output template for workflow skills
    - `examples/example-domain-skill.md` — completed domain skill showing expected quality
    - `examples/example-workflow-skill.md` — completed workflow skill showing expected quality
2. List existing skills by reading directories under `.claude/skills/`
3. Read `boost.json` to see which skills are registered
4. Ask: "What skill do you want to build? Describe the problem it solves or the task it automates."
5. Begin Phase 1 immediately

---

## How It Works: The 6-Phase Discovery Process

The process is **conversational and interactive** — not a form to fill out. You guide the developer through 6 phases, asking probing questions, challenging weak answers, and building the skill incrementally.

### Critical Rules

1. **Ask ONE question at a time** (sometimes two if tightly related). This is a conversation, not an interrogation.
2. **Reflect back what you heard.** After each answer, briefly summarize your understanding before moving on.
3. **Challenge weak answers.** "It should cover everything" is not a scope boundary. Push back.
4. **Offer informed suggestions.** If you see overlap with existing skills, flag it. If a scope is too broad, suggest splitting.
5. **Track progress visibly.** Show the progress indicator at the start of each response.
6. **Build incrementally.** Write to disk at checkpoints, not just at the end.
7. **Use the question bank as a toolkit.** Read `templates/questions.md` for inspiration but never ask questions robotically.

---

## Phase Details

### Phase 1: Qualification & Purpose (WHY THIS SKILL)

**Goal**: Understand what problem the skill solves and whether it should exist.

Explore:
- What task do you find yourself repeating?
- What goes wrong when Claude doesn't have this guidance?
- Is there an existing skill that partially covers this?
- Could this be a section added to an existing skill instead?
- Who uses it — you or Claude? (Skills guide Claude's behavior)
- When should it activate? What phrases or code paths trigger it?

**Classify**: Based on answers, identify the skill type (domain / workflow / utility).

**Output**: Purpose statement + activation triggers + skill type classification.

### Phase 2: Scope & Boundaries (WHAT IT COVERS)

**Goal**: Draw a sharp line around what's in and what's out.

Explore:
- Can you describe the skill in one paragraph? If not, it's too big — split it.
- What code areas does it cover? What files/directories?
- What sibling skills exist? Where does this one start and they end?
- What's explicitly excluded?
- Does it chain with other skills? (feeds into or receives from)
- How many modes of operation? (>4 means reconsider scope)
- Does it need supporting files? (templates, examples, both, neither)

**Output**: Domain boundaries + supporting file decisions.

**Checkpoint**: Write skill name + one-paragraph description to disk as a draft.

### Phase 3: Instruction Design (HOW IT WORKS)

**Goal**: Design the internal structure of the SKILL.md.

Based on the skill type:

**For domain skills**:
- What are the 3-8 domain sections? (e.g., "Model Patterns", "Controller Conventions", "Testing")
- What code snippets illustrate the patterns? (pull from actual codebase where possible)
- What are the 3-5 most common pitfalls?
- What does a "bad" outcome look like? What constraints prevent it?

**For workflow skills**:
- How many phases? What's the goal of each?
- What checkpoints exist? When should output be written to disk?
- Does it need a progress indicator?
- What questions drive each phase? (build a question bank)
- What templates should be provided?
- What does a completed example look like?

**For utility skills**:
- What rules does it enforce?
- What mapping tables or reference data does it maintain?

**Output**: Section outline with content sketches.

**Checkpoint**: Write SKILL.md draft (frontmatter + skeleton with section headers).

### Phase 4: Security & Tool Constraints (PERMISSIONS)

**Goal**: Determine permission boundaries and integration points.

Explore:
- Does this skill need `allowed-tools` restrictions? (Most don't — only restrict if the skill should NOT edit files, run commands, etc.)
- Does it need a companion agent? (Heavy workflows that could overwhelm the main context benefit from a subagent)
- Does it need hook integration? (Domain skills covering specific code paths should be mapped in `doc-sync-hint.sh`)
- Should it appear in the documentation-maintenance mapping table?

**Output**: Permission spec + agent decision + hook mapping decision.

### Phase 5: Write the Skill (PRODUCE IT)

**Goal**: Create all skill files.

Actions:
1. Finalize SKILL.md from the Phase 3 skeleton — fill in all sections with real content
2. Write `templates/` files if the skill needs them
3. Write `examples/` files if the skill needs them
4. If a companion agent is needed, create it in `.claude/agents/`

**Checkpoint**: Review against the quality checklist below.

### Phase 6: Integration & Verification (WIRE IT UP)

**Goal**: Register the skill and verify everything works.

Actions:
1. Add to `boost.json` skills array (if domain or utility type)
2. Add hook mappings to `.claude/hooks/doc-sync-hint.sh` (if skill covers code paths that should trigger hints)
3. Add a row to the file-to-domain mapping table in `.claude/skills/documentation-maintenance/SKILL.md`
4. Run the quality checklist one final time
5. Provide test instructions: "Try activating this skill by [trigger]. It should [expected behavior]."

---

## Progress Indicator

Start EVERY response with:

```
🔧 Skill Builder: Phase N of 6 — [Phase Name]
[██████░░░░░░░░] N/6 complete
```

---

## Quality Checklist

Before finalizing any skill:

- [ ] YAML frontmatter has `name` (kebab-case, matches directory) and `description` (activation-friendly, uses `>-`)
- [ ] Description includes activation triggers (user phrases, code contexts)
- [ ] "When to Apply" section has specific bullet points
- [ ] Domain skills use `<code-snippet>` blocks for code examples (not markdown fences)
- [ ] Code snippets reflect actual codebase patterns (not generic examples)
- [ ] Common Pitfalls section exists with 3+ entries
- [ ] Skill name is kebab-case and matches the directory name
- [ ] No overlap with existing skills (or overlap is documented and intentional)
- [ ] Workflow skills have templates/ and/or examples/ if needed
- [ ] `boost.json` updated (domain/utility skills only)
- [ ] Documentation-maintenance mapping table updated

---

## Domain Skill Fast Path

For simple domain skills (the most common type), phases 1-3 are the core work. Offer to compress phases 4-6 when ALL of these are true:

- No special tool restrictions needed
- No companion agent needed
- Standard hook integration (just add to `doc-sync-hint.sh` case statement)
- No templates or examples needed

Say: "This looks like a standard domain skill. I can handle the integration steps (boost.json, hook mappings, doc-maintenance table) automatically. Want me to fast-track phases 4-6?"

---

## Handling Impatience

- **"Can we just skip to writing it?"** → "Let me speed up. I'll propose the structure and you correct me." Then present your best guess for the remaining phases and ask for confirm/correct.
- **"I already know what I want"** → Speed-run: have them describe the full skill, then validate against the quality checklist.
- **"This is too many questions"** → Batch remaining questions as a numbered list for one-shot answers.

---

## After Building

Once the skill is complete:

1. Summarize what was created (files, integration points)
2. Provide activation test instructions
3. Remind: "If this skill covers code paths that change frequently, the `documentation-maintenance` skill will flag when updates are needed."

$ARGUMENTS
