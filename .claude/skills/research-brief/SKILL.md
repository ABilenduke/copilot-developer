---
name: research-brief
description: >-
  Scans the codebase and produces a structured research brief optimized for
  Gemini Deep Research. Gathers stack context, architectural patterns, relevant
  code excerpts, and a pattern exemplar, then frames research objectives that
  map to the plan skill's expected sections. Activates when the user says
  "research brief", "/research-brief", "I want to research", "prepare a brief
  for", or wants to research how to build a feature before planning it.
---

# Research Brief Generator

## HARD RULES

These rules are absolute. No exceptions.

### Rule 1: NEVER do research yourself

You are a **context packager**, not a researcher. Your job is to scan the codebase, gather facts, and frame questions. You do NOT answer the research questions, suggest architectures, or recommend packages. Gemini does that. You provide the raw material.

### Rule 2: NEVER fabricate codebase details

Every code excerpt, version number, file path, and pattern description in the brief MUST come from actually reading the codebase. If you can't find something, say it doesn't exist. Never invent model relationships, guess at config values, or assume a file's contents.

### Rule 3: Structural contracts inline, behavioral implementation summarized

This is the core content rule for the brief:

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

### Rule 4: Constraints go FIRST in the brief

The brief is read top-to-bottom by Gemini. Constraints and non-negotiables must appear before research objectives so Gemini internalizes your boundaries before forming answers.

---

## Purpose

This skill bridges Claude Code and Gemini Deep Research. Claude does what it's good at — reading your codebase, understanding your patterns — and produces a self-contained briefing document. Gemini does what it's good at — deep web research — but grounded in your actual stack, architecture, and constraints instead of giving generic advice.

The output feeds into the `/plan` skill. Research objectives are structured to produce answers that map directly to the plan template's sections (Technical Architecture, File-Level Plan, Edge Cases).

**Pipeline position**: `/research-brief` → Gemini (manual) → `/feature` → `/plan` → `/execute`

---

## First Steps

When this skill is invoked:

1. Read the supporting files in this skill directory:
    - `templates/brief-template.md` — output format for the research brief
    - `templates/scan-guide.md` — two-tier scan reference (what to scan, inline vs summarize)
2. **Parse the feature description** from the user's input
3. **Decide if clarification is needed**:
    - If the description is rich enough to identify the domain area and primary technical challenge → skip to Phase 2 immediately
    - If genuinely ambiguous (can't tell if it's backend-only or full-stack, unclear domain area) → ask 2-3 clarifying questions **in a single batched prompt**
4. **Opportunistically check** if `docs/features/` has a relevant feature doc — if so, read it for free context. This is NOT a gate; the skill works without it.
5. Begin scanning

---

## How It Works: The 4-Phase Process

### Phase 1: Feature Intake (OFTEN SKIPPABLE)

**Goal**: Understand what the user wants to build well enough to know what to scan.

**Skip if**: The user's description already tells you the domain area (e.g., "notification system"), the technical challenge (e.g., "real-time WebSocket delivery"), and whether it's full-stack or backend-only. A sentence like "real-time notification system with WebSocket delivery and in-app notification center" is enough — start scanning.

**Ask only if genuinely ambiguous**. Batch all questions in a single prompt:
- What are you building? (if the description is too vague to identify domain)
- What's the primary technical challenge? (if you can't infer: async? real-time? external API? data modeling?)
- Any hard constraints? (must integrate with X, can't use Y)

**Output**: A clear enough feature picture to drive selective scanning.

### Phase 2: Codebase Scan (AUTOMATED)

**Goal**: Gather all codebase context needed for the brief. No user interaction in this phase.

Follow the scan guide in `templates/scan-guide.md`. Two tiers:

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
- This gives Gemini a concrete "build it like this" reference, not just abstract conventions

**Technique**: Use the Explore agent or direct Glob/Grep/Read for the always-tier. Use judgment for the selective tier — if building notifications, scan broadcasting config, event classes, Reverb setup, but don't scan affiliate tracking code.

**Output**: Raw codebase context organized by section, ready for assembly.

### Phase 3: Brief Assembly (AUTOMATED)

**Goal**: Build the research brief document from the scanned context.

Follow `templates/brief-template.md` for the output structure. The five sections, in this order:

1. **Constraints & Non-Negotiables** — Stack rules Gemini must respect (Docker, Pest, pnpm, Inertia, existing packages before new ones). Plus feature-specific constraints.
2. **Project Context** — Stack versions, key config, directory conventions, architectural patterns.
3. **Current Architecture Snapshot** — Inline structural contracts for the relevant domain. Models with relationships/casts, migrations, routes, TS interfaces.
4. **Pattern Exemplar** — One deeply-scanned similar feature showing "this is how we already do things." Key files inlined.
5. **Research Objectives** — Numbered questions for Gemini, each mapped to a plan template section (Technical Architecture, File-Level Plan, Edge Cases). Each question references constraints and the exemplar: "Given [constraint X] and [exemplar pattern Y], research how to..."

**Target length**: 800-1500 lines. Long enough to be self-contained, short enough for Gemini's Deep Research context.

**Output**: Complete draft brief.

### Phase 4: Review & Finalize (INTERACTIVE)

**Goal**: Let the user review and adjust before finalizing.

Present a summary of what was captured:
- Stack context highlights
- Which models/services/components were scanned
- Which feature was chosen as the pattern exemplar and why
- The research objectives (the questions Gemini will answer)

Ask: "Anything missing, or any research questions you want to add or reshape?"

After user confirms, write to `docs/research-briefs/{feature-name}-research-brief.md`.

Tell the user: "Brief saved. Paste it into Gemini Deep Research. When you get results back, run `/feature` to catalog the feature, then `/plan` to build the implementation plan informed by the research."

---

## Progress Indicator

Start EVERY response with:

```
🔬 Research Brief [{feature}]: Phase N of 4 — [Phase Name]
[██████░░░░░░░░] N/4 complete
```

---

## Research Objectives: Mapping to Plan Sections

The research objectives are the most important part of the brief. They shape what Gemini produces. Each objective should map to a plan template section:

| Plan Section | Research Objective Category | Example Question |
|---|---|---|
| 3. Technical Architecture | Architecture & approach | "Given our Reverb WebSocket setup, what notification delivery architecture works best?" |
| 3. Key Decisions | Technology choices | "Which Laravel packages (compatible with v12, PHP 8.4) handle X? Compare trade-offs." |
| 3. Data Model | Schema design | "Given these existing models [inline], what schema design supports X?" |
| 3. Integration Points | Service integration | "How should X integrate with our existing [exemplar pattern]?" |
| 4. File-Level Plan | Implementation patterns | "What file organization pattern works best for X in a Laravel 12 + Inertia app?" |
| 5. Edge Cases | Failure modes & security | "What are the common failure modes and security considerations for X?" |

Frame objectives as specific questions with inline context, not generic asks. "How do notifications work in Laravel?" is useless. "Given our Reverb broadcasting setup [config excerpt], Redis queue driver, and this existing event pattern [code excerpt], what's the best architecture for real-time notifications with read/unread state?" is what produces good research.

---

## Quality Checklist

Before finalizing the brief:

- [ ] Constraints appear BEFORE research objectives in the document
- [ ] All code excerpts are from the actual codebase (nothing fabricated)
- [ ] Structural contracts are inlined; behavioral implementation is summarized
- [ ] Package versions match `composer.json` / `package.json` exactly
- [ ] Pattern exemplar is identified and key files are included
- [ ] Research objectives reference specific constraints and exemplar patterns
- [ ] Each research objective maps to a plan template section
- [ ] No actual `.env` values included (only `.env.example` structure)
- [ ] Brief is self-contained — Gemini needs zero codebase access to understand it
- [ ] Target length is 800-1500 lines

---

## Handling Impatience

- **"Just scan and generate it"** → Skip Phase 1 entirely if the description is even remotely sufficient. Go straight to scanning.
- **"I already have research questions"** → "Give me your questions and I'll build the codebase context around them."
- **"This is taking too long"** → Reduce the selective scan — focus on the pattern exemplar and the most critical models/routes only.

---

## After Completion

Once the brief is saved:

1. Tell the user the file path
2. Remind them of the pipeline: "Paste into Gemini Deep Research → `/feature` to catalog → `/plan` to build the implementation plan"
3. Suggest: "When pasting into Gemini, use a prompt like: 'Based on this project brief, conduct deep research on [feature]. Organize your findings by the research objectives listed at the end.'"

$ARGUMENTS
