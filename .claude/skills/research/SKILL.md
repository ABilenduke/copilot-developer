---
name: research
description: >-
  Research and discovery skill with three modes: story mode (creates story directory,
  writes brief.md with RICE scoring, creates GitHub ticket), context mode
  (scans codebase, produces research brief for external AI tools), and spike mode
  (creates time-boxed investigation document). Activates when the user says
  "research story", "research spike", "research brief", "research context",
  "/research", "I want to research", or wants to investigate before planning.
---

# Research Skill

## Purpose

This skill handles three distinct research workflows:

1. **Story Mode** (`/research story`) — Creates a story directory under a feature, writes `brief.md` (business case with RICE scoring and pre-mortem), and creates a GitHub issue (`type:story`, Backlog).
2. **Context Mode** (`/research context` or `/research brief`) — Scans the codebase and produces a self-contained research brief for external AI deep research tools (Gemini, Perplexity, ChatGPT). This is the evolution of the old `/research-brief` skill.
3. **Spike Mode** (`/research spike`) — Creates a time-boxed investigation document with a clear question, findings, recommendation, and next steps.

**Pipeline position**:
- Story mode: `/research story` → `/plan` → `/execute`
- Context mode: `/research context` → external AI tool (manual) → `/plan`
- Spike mode: `/research spike` → recommendation → story or no action

---

## HARD RULES

These rules are absolute. No exceptions.

### Rule 1: NEVER do research yourself (Context Mode only)

In Context Mode, you are a **context packager**, not a researcher. Your job is to scan the codebase, gather facts, and frame questions. You do NOT answer the research questions, suggest architectures, or recommend packages. The external AI research tool does that. You provide the raw material.

### Rule 2: NEVER fabricate codebase details

Every code excerpt, version number, file path, and pattern description MUST come from actually reading the codebase. If you can't find something, say it doesn't exist. Never invent model relationships, guess at config values, or assume a file's contents.

### Rule 3: Structural contracts inline, behavioral implementation summarized (Context Mode)

**Inline as actual code** (structural contracts):
- Model relationships, casts, traits (10-20 lines per model)
- Migration schema (column names, types, indexes)
- Pattern exemplar key files (service class, job chain, controller)
- Route definitions for the relevant area
- TypeScript type definitions and interfaces

**Summarize, don't inline** (behavioral implementation):
- Controller method bodies — summarize the flow
- Vue component templates — describe the structure
- Config files — note the relevant settings
- Test files — note the patterns used

### Rule 4: Constraints go FIRST in the brief (Context Mode)

The brief is read top-to-bottom by the research tool. Constraints and non-negotiables must appear before research objectives so the AI internalizes your boundaries before forming answers.

### Rule 5: NEVER create features

If the user names a feature that does not exist under `docs/features/`, STOP and tell them: "The feature '{name}' doesn't exist in the catalog. Please run `/feature` to create it first, then come back to `/research`."

---

## First Steps

When this skill is invoked:

1. Read the supporting files in this skill directory:
    - `templates/brief-template.md` — business case template with RICE scoring (used by **Story Mode**)
    - `templates/context-template.md` — codebase context brief for external AI tools (used by **Context Mode**)
    - `templates/spike-template.md` — time-boxed investigation template (used by **Spike Mode**)
    - `templates/scan-guide.md` — codebase scan reference (used by **Context Mode** for inline vs summarize decisions)
2. **Determine the mode** from the user's input:
    - `/research story` or `/research story {feature}` → Story Mode
    - `/research context` or `/research brief` → Context Mode
    - `/research spike` → Spike Mode
    - Ambiguous → ask: "Are you starting a new story (business case), investigating something (spike), or preparing context for external research?"
3. Proceed with the appropriate mode below

---

## Mode 1: Story Research

**Goal**: Create a story directory and write the business case (brief.md), then create a GitHub ticket.

### Process

1. **Identify the feature**: Read `docs/features/index.md` for existing features. Ask which feature this story belongs to. If the feature doesn't exist, tell the user to run `/feature` first.
2. **Get the story name**: Ask for a short kebab-case name (e.g., "add-oauth2", "inline-editing").
3. **Create the story directory**: `docs/features/{feature}/stories/{YYYY-MM-DD}_{story-name}/`
4. **Interactive brief writing**: Walk through the brief.md template section by section:
    - **Business Case** — Why does this matter? What problem does it solve?
    - **Market Context** — Competitors, alternatives, trends making this timely
    - **RICE Scoring** — Work through each factor interactively:
      - **Reach**: How many users/sessions does this affect per quarter? (1-10)
      - **Impact**: How much does this move the needle? (1-10, where Massive=10, Minimal=1)
      - **Confidence**: How sure are we about reach and impact estimates? (percentage)
      - **Effort**: How many person-days of focused work?
      - **Score**: Calculate (R x I x C) / E — higher = more valuable per unit effort
    - **Success Criteria** — Measurable outcomes (metric + target), not implementation details
    - **Constraints** — Non-negotiables (budget, timeline, tech stack, regulatory)
    - **Pre-mortem** — "It's 3 months later and this failed. Why?" Minimum 3 risks with mitigations
5. **Write brief.md** to the story directory using `templates/brief-template.md`
6. **Create GitHub issue** via `gh` CLI:

```bash
# Create the story ticket
~/.local/bin/gh issue create \
  --repo ABilenduke/content-engine \
  --title "Story: {story-name}" \
  --label "type:story,priority:{priority},area:{area}" \
  --body "$(cat <<'EOF'
## Summary
{one-line summary from brief.md}

## Business Case
{brief summary of WHY from brief.md}

## RICE Score
{score} = ({reach} x {impact} x {confidence}) / {effort}

## Story Docs
- Brief: docs/features/{feature}/stories/{date}_{name}/brief.md

## Acceptance Criteria
_To be defined during /plan_
EOF
)"
```

7. **Add to project board** (Backlog):

```bash
# Get the issue number from the create output, then add to project
~/.local/bin/gh issue edit {number} --add-project "Content Engine"
```

8. **Tell the user**: "Story created at [path]. GitHub issue #{N} created in Backlog. When ready to plan, run `/plan` and point it at this story."

### Progress Indicator

```
🔬 Research [story / {feature}]: Phase N of 4 — [Phase Name]
[██████░░░░░░░░] N/4 complete
```

Phases: 1. Feature Selection, 2. Story Setup, 3. Brief Writing, 4. GitHub Integration

---

## Mode 2: Context Research (External AI Brief)

This mode scans the codebase and produces a self-contained briefing document for external AI deep research tools. It is a direct evolution of the old `/research-brief` skill.

### Process

Follow the 4-phase process:

#### Phase 1: Feature Intake (OFTEN SKIPPABLE)

**Goal**: Understand what the user wants to build well enough to know what to scan.

**Skip if**: The user's description already tells you the domain area (e.g., "notification system"), the technical challenge (e.g., "real-time WebSocket delivery"), and whether it's full-stack or backend-only.

**Ask only if genuinely ambiguous**. Batch all questions in a single prompt:
- What are you building? (if the description is too vague to identify domain)
- What's the primary technical challenge? (if you can't infer)
- Any hard constraints? (must integrate with X, can't use Y)

#### Phase 2: Codebase Scan (AUTOMATED)

**Goal**: Gather all codebase context needed for the brief. No user interaction.

Follow `templates/scan-guide.md`. Two tiers:

**Always-scan tier** (structural foundation — always run):
- `CLAUDE.md` — project conventions and rules
- `composer.json` + `package.json` — exact package versions
- `.env.example` — configured services (never include actual `.env`)
- `config/` directory listing
- Database schema overview via MCP `database-schema` tool
- Route files (`routes/web.php`, `routes/admin.php`, `routes/api.php` if exists)
- `app/Models/` listing with key relationships
- Frontend directory structure (`resources/js/` top 2 levels)
- Existing feature docs if available (`docs/features/`)

**Selective-scan tier** (judgment-driven — based on feature description):
- Models/migrations that touch the feature's domain
- Controllers/services in the relevant area
- Vue components/composables the feature would extend or mimic
- Agent/AI architecture files — only if the feature involves AI
- Job/event/listener files — only if the feature involves async processing
- Config files relevant to the feature's infrastructure needs
- Enums, form requests, policies in the relevant domain

**Pattern exemplar scan** (the differentiator):
- Identify the most architecturally similar existing feature
- Scan its key files deeply — the service, the job chain, the controller, the Vue page
- This gives the research tool a concrete "build it like this" reference

**Technique**: Use the Explore agent or direct Glob/Grep/Read for the always-tier. Use judgment for the selective tier.

#### Phase 3: Brief Assembly (AUTOMATED)

**Goal**: Build the research brief document from the scanned context.

Follow `templates/context-template.md` for the output structure. The five sections, in this order:

1. **Constraints & Non-Negotiables** — Stack rules, architectural constraints, feature-specific constraints
2. **Project Context** — Stack versions, key config, directory conventions, route surface, model inventory
3. **Current Architecture Snapshot** — Inline structural contracts for the relevant domain
4. **Pattern Exemplar** — One deeply-scanned similar feature with key files inlined
5. **Research Objectives** — Numbered questions mapped to plan sections. Each references constraints and exemplar patterns

**Target length**: 800-1500 lines.

#### Phase 4: Review & Finalize (INTERACTIVE)

**Goal**: Let the user review and adjust before finalizing.

Present a summary:
- Stack context highlights
- Which models/services/components were scanned
- Pattern exemplar chosen and why
- Research objectives (the questions the research tool will answer)

Ask: "Anything missing, or any research questions you want to add or reshape?"

**Output location**: If a story directory exists, save as `context.md` in the story directory. Otherwise, save to `docs/research-briefs/{feature-name}-research-brief.md`.

After saving, tell the user: "Brief saved at [path]. Paste into your AI deep research tool. When results are back, run `/plan` to build the implementation plan."

### Research Objectives: Mapping to Plan Documents

Each objective maps to the document layer it informs:

| Plan Document | Research Objective Category | Example Question |
|---|---|---|
| design.md — Architecture | Architecture & approach | "Given our Reverb WebSocket setup, what notification delivery architecture works best?" |
| design.md — Key Decisions | Technology choices | "Which Laravel packages (compatible with v12, PHP 8.4) handle X? Compare trade-offs." |
| design.md — Data Model | Schema design | "Given these existing models [inline], what schema design supports X?" |
| design.md — Integration | Service integration | "How should X integrate with our existing [exemplar pattern]?" |
| design.md — File Manifest | Implementation patterns | "What file organization pattern works best for X in a Laravel 12 + Inertia app?" |
| design.md — Edge Cases | Failure modes & security | "What are the common failure modes and security considerations for X?" |

Frame objectives as specific questions with inline context, not generic asks.

### Progress Indicator

```
🔬 Research [context / {feature}]: Phase N of 4 — [Phase Name]
[██████░░░░░░░░] N/4 complete
```

---

## Mode 3: Spike Research

**Goal**: Create a time-boxed investigation document with a clear question, conduct the investigation, and end with a recommendation.

### Process

1. **Determine scope**: Is this feature-specific or cross-cutting?
    - Feature-specific → save in `docs/features/{feature}/spikes/`
    - Cross-cutting → save in `docs/spikes/`
2. **Get the question**: What specifically are we trying to learn? Push for specificity — "How do WebSockets work?" is too broad. "Can Laravel Reverb handle 500 concurrent connections with our current Redis config?" is good.
3. **Get the time-box**: How long should we spend on this? (hours or days). A spike without a time-box becomes an indefinite exploration.
4. **Create the spike document** using `templates/spike-template.md`
5. **Create GitHub issue** via `gh` CLI:

```bash
~/.local/bin/gh issue create \
  --repo ABilenduke/content-engine \
  --title "Spike: {question-summary}" \
  --label "type:spike,area:{area}" \
  --body "$(cat <<'EOF'
## Question
{specific question}

## Time-box
{hours/days}

## Context
{why we need to know this now}

## Spike Doc
{path to spike document}
EOF
)"
```

6. **Add to project board** (Backlog):

```bash
~/.local/bin/gh issue edit {number} --add-project "Content Engine"
```

7. **Conduct the investigation** within the time-box — read code, run experiments, search documentation
8. **Write findings, recommendation, and next steps** in the spike document

### Spike Rules

- A spike **always** ends with a recommendation and explicit next steps
- It either spawns a story, updates existing docs, or concludes "no action needed"
- Without a recommendation, spikes become knowledge graveyards
- Time-box is mandatory — prevents indefinite exploration

### Progress Indicator

```
🔬 Research [spike]: {question}
Time-box: {hours/days} | Started: {time}
```

---

## Quality Checklists

### Brief.md (Story Mode)
- [ ] Business case is clear (not hand-waving)
- [ ] RICE score is calculated with real numbers
- [ ] Success criteria are measurable (not "make it better")
- [ ] Pre-mortem has 3+ risks with mitigations
- [ ] Constraints are documented
- [ ] GitHub issue created with correct labels
- [ ] Done gate passes: "Business case is clear, RICE score is calculated, success criteria are measurable, pre-mortem has ≥3 risks with mitigations"

### Context Brief (Context Mode)
- [ ] Constraints appear BEFORE research objectives
- [ ] All code excerpts are from the actual codebase
- [ ] Structural contracts inlined; behavioral implementation summarized
- [ ] Package versions match composer.json / package.json exactly
- [ ] Pattern exemplar is identified and key files included
- [ ] Research objectives reference specific constraints and exemplar patterns
- [ ] Brief is self-contained (800-1500 lines)
- [ ] No actual `.env` values included (only `.env.example` structure)

### Spike
- [ ] Question is specific and answerable
- [ ] Time-box is defined
- [ ] Recommendation is actionable
- [ ] Next steps are explicit
- [ ] GitHub issue created with correct labels

---

## Handling Impatience

- **"Just scan and generate it"** → Skip Phase 1 entirely in Context Mode if the description is even remotely sufficient. Go straight to scanning.
- **"I already have research questions"** → "Give me your questions and I'll build the codebase context around them."
- **"This is taking too long"** → In Context Mode, reduce the selective scan — focus on the pattern exemplar and the most critical models/routes only. In Story Mode, propose RICE scores yourself for confirm/correct.

---

## After Completion

- **Story mode**: "Brief saved at [path]. GitHub issue #{N} created in Backlog. Run `/plan` when ready to plan this story."
- **Context mode**: "Brief saved at [path]. Paste into your AI deep research tool. When results are back, run `/plan` to build the implementation plan."
- **Spike mode**: "Spike documented at [path]. GitHub issue #{N} created. Recommendation: [summary]. Next steps: [actions]."

$ARGUMENTS
