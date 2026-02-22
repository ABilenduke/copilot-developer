# Skills How-To Guide

This guide covers the 8 custom Claude Code skills that form the ContentEngine development workflow. Skills are specialized instructions that Claude follows when invoked, ensuring consistent processes across planning, building, and maintaining the application.

## How Skills Work

Skills live in `.claude/skills/{name}/SKILL.md`. They activate in two ways:

1. **Slash commands** — Type `/skill-name` to invoke workflow skills directly
2. **Auto-activation** — Domain skills activate automatically when Claude detects relevant context (registered in `boost.json`)

Skills chain together as a pipeline. A typical feature goes through several skills in sequence, each producing artifacts that feed the next.

## Workflow Pipeline

```
                    ┌─────────────────────────────────────────┐
                    │           RESEARCH PHASE                │
                    │                                         │
                    │  /research story ──► brief.md + ticket  │
                    │  /research context ──► context brief    │
                    │  /research spike ──► spike doc          │
                    └──────────────┬──────────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────────┐
                    │           PLANNING PHASE                │
                    │                                         │
                    │  /plan ──► brief.md + prd.md +          │
                    │            design.md + plan.md          │
                    └──────────────┬──────────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────────┐
                    │          EXECUTION PHASE                │
                    │                                         │
                    │  /execute ──► code + journal.md + PR    │
                    └──────────────┬──────────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────────┐
                    │           REVIEW PHASE                  │
                    │                                         │
                    │  /feedback ──► feedback.md + PR updates │
                    └─────────────────────────────────────────┘

  SUPPORTING SKILLS (used anytime):

    /feature ──► catalog & manage features in docs/features/
    /bugfix ──► quick fixes with root cause analysis + PR
    /skill-builder ──► create new skills (meta-skill)
```

---

## 1. `/feature` — Feature Catalog Manager

**What it does**: Discovers, catalogs, and manages application features in `docs/features/`. Creates the organizational backbone that all other skills depend on — features must exist in the catalog before `/research` or `/plan` can target them.

**How to invoke**:
- `/feature`
- "What features do we have?"
- "Add a feature"
- "Feature catalog"
- "Map out the app"

**Modes**:
| Mode | Description |
|------|-------------|
| Initial Discovery | Scan codebase and build the full feature catalog from scratch |
| Add a Feature | Add a single new feature to an existing catalog |
| Update a Feature | Modify an existing feature's description or purpose |
| Review Catalog | View and audit the current catalog |

**What it produces**:
- `docs/features/index.md` — master catalog grouped by domain
- `docs/features/{name}/README.md` — living feature description (Diataxis format)
- `docs/features/{name}/stories/` — directory for future story work
- `docs/features/{name}/bugs/` — directory for bug reports
- `docs/features/{name}/spikes/` — directory for investigations

**Key rules**:
- Feature names are kebab-case (`user-auth`, `admin-panel`)
- READMEs are "what" and "why" only — never implementation details
- Always updates the index after any change
- Explores the codebase first and proposes features for you to confirm

---

## 2. `/research` — Research & Discovery

**What it does**: Handles pre-planning research with three distinct modes. Story mode creates the business case. Context mode packages codebase context for external AI tools. Spike mode runs time-boxed investigations.

**How to invoke**:
- `/research story` or `/research story {feature}` — create a story with business case
- `/research context` or `/research brief` — build a codebase context brief
- `/research spike` — time-boxed investigation
- `/research` (ambiguous) — Claude asks which mode you want

**Modes**:

### Story Mode (`/research story`)
Creates a story directory and writes `brief.md` with RICE scoring and pre-mortem analysis. Creates a GitHub issue with `type:story` label.

**Produces**: `docs/features/{feature}/stories/{date}_{name}/brief.md` + GitHub issue

**Pipeline**: `/research story` -> `/plan` -> `/execute`

### Context Mode (`/research context`)
Scans the codebase and produces a self-contained briefing document (800-1500 lines) for external AI research tools (Gemini, Perplexity, ChatGPT). Claude packages the context — the external tool does the research.

**Produces**: `context.md` in the story directory (or `docs/research-briefs/`)

**Pipeline**: `/research context` -> paste into AI tool -> `/plan`

### Spike Mode (`/research spike`)
Creates a time-boxed investigation with a specific question, conducts the research, and ends with a recommendation and next steps.

**Produces**: Spike document + GitHub issue with `type:spike` label

**Pipeline**: `/research spike` -> recommendation -> story or no action

**Key rules**:
- The target feature must exist in the catalog — run `/feature` first if needed
- In context mode, Claude never answers the research questions itself
- All code excerpts must come from actually reading the codebase
- Spikes always end with a recommendation and explicit next steps

---

## 3. `/research-brief` — (Deprecated)

**What it does**: Redirects to `/research context`. Kept for backward compatibility only.

**How to invoke**: `/research-brief` (explicit invocation only)

**Use instead**: `/research context`

---

## 4. `/plan` — Interactive Planner

**What it does**: Walks through a 7-phase interactive discovery process producing four altitude-layered documents. Each document answers a different question (WHY/WHAT/HOW/WHEN) and is immutable after approval.

**How to invoke**:
- `/plan` — full 7-phase walk-through
- "Let's plan", "PRD", "Before we code", "Plan this out"
- "Walk me through the requirements"

**Subcommands**:
| Command | Phases | Output |
|---------|--------|--------|
| `/plan` | All 7 | brief.md + prd.md + design.md + plan.md |
| `/plan brief` | Phase 1 | brief.md (WHY) |
| `/plan prd` | Phases 2 + 6 | prd.md (WHAT) |
| `/plan design` | Phases 3-5 | design.md (HOW) |
| `/plan steps` | Phase 7 | plan.md (WHEN/ORDER) — requires design.md |
| `/plan tickets` | — | Creates GitHub sub-issues from existing plan.md |
| `/plan review` | — | Reconciles docs vs GitHub ticket state |

**The 7 Phases**:
1. **Problem Discovery** (WHY) -> brief.md — business case, RICE scoring, pre-mortem
2. **Scope Definition** (WHAT) -> prd.md first pass — user stories, MoSCoW, INVEST
3. **Technical Architecture** (HOW) -> design.md — high-level approach, key decisions
4. **File-Level Plan** (HOW) -> design.md — file manifest, migrations, config changes
5. **Edge Cases** (WHAT IF) -> design.md — failure modes, assumption mapping
6. **Acceptance Criteria** (PROVE IT) -> prd.md second pass — Given/When/Then, testing strategy
7. **Implementation Roadmap** (ORDER) -> plan.md — ordered steps, effort estimates

**What it produces**:
- `docs/features/{feature}/stories/{date}_{name}/brief.md`
- `docs/features/{feature}/stories/{date}_{name}/prd.md`
- `docs/features/{feature}/stories/{date}_{name}/design.md`
- `docs/features/{feature}/stories/{date}_{name}/plan.md`
- GitHub story ticket + sub-issues for each plan step

**Key rules**:
- Never creates features — run `/feature` first
- Plans always go in `stories/` directories (not root of feature)
- Each document has a done gate that must pass before writing
- Supports old monolithic format for `iterations/` directories (backward compat)
- One question at a time — it's a conversation, not a form

---

## 5. `/execute` — Plan Executor

**What it does**: Takes a plan from `/plan` and implements it step-by-step on a dedicated git branch. Uses a two-tier verification system: fast per-step ralph loops and a deep final ralph loop with self-review and adversarial testing. Records everything in a timestamped journal.

**How to invoke**:
- `/execute`
- "Execute the plan", "Start building", "Implement this"
- Reference a plan.md file path

**What it produces**:
- Implemented code on branch `feature/{feature}/{change-name}`
- `journal.md` — timestamped record with commit hashes and verification results
- Updated feature README.md (stories table, architecture sections)
- GitHub PR with acceptance criteria verification
- Updated `docs/features/index.md`

**Verification system**:

| Loop | When | Scope | Max Iterations |
|------|------|-------|----------------|
| Per-step ralph | After each plan step | Related tests + lint on changed files + work evaluation | 5 |
| Final ralph Phase 1 | After all steps | Full test suite + full lint + type checking | — |
| Final ralph Phase 2 | After Phase 1 | Self-review of all changed files vs plan | — |
| Final ralph Phase 3 | After Phase 2 | Write new adversarial tests targeting edge cases | — |
| Fix & re-verify | If issues found | Re-run full checks | Up to 2 more |

**Key rules**:
- Checks for clean git working tree before starting
- Reads plan.md (primary), design.md, prd.md, and brief.md as references
- Commit messages always include the story name: `{story-name} step {N}: {task name}`
- Per-step loops evaluate work quality, not just test passage
- Final ralph loop always runs all 3 phases, even if tests pass
- Adversarial testing means writing actual tests, not just thinking about edge cases
- Journal entries are append-only — never rewritten

---

## 6. `/feedback` — PR Review Handler

**What it does**: Processes PR review comments after `/execute` creates a PR. Reads reviewer feedback, creates an immutable `feedback.md` record, applies fixes in priority order, and updates the PR with a summary.

**How to invoke**:
- `/feedback`
- "PR feedback", "Address review comments", "Handle review"

**Process**:
1. **Gather & Categorize** — reads all PR comments, categorizes by type (Cosmetic/Logic/Architecture/Testing/Documentation), presents for confirmation
2. **Create feedback.md** — immutable record of what was raised
3. **Apply Fixes** — in severity order (Logic > Architecture > Testing > Documentation > Cosmetic), each fix gets its own commit
4. **Update PR** — posts summary table to PR, closes ticket if all resolved

**What it produces**:
- `docs/features/{feature}/stories/{date}_{name}/feedback.md`
- Fix commits with `feedback: {description}` messages
- PR comment with resolution summary table

**Key rules**:
- feedback.md is immutable — append updates, never rewrite original text
- Every fix gets its own commit
- Tests run after every fix
- Out-of-scope feedback is deferred, not ignored — documented for future stories
- If feedback reveals a bigger issue, suggest promoting to a new story

---

## 7. `/bugfix` — Quick Bug Fixer

**What it does**: Handles lightweight bug fixes that can be described in one document and fixed in a few hours. Creates a bug document with Five Whys root cause analysis, applies the fix, writes regression tests, and creates a PR.

**How to invoke**:
- `/bugfix`
- "Fix this bug", "Something is broken"
- Report a defect

**Process**:
1. **Document** — create bug doc with symptoms, reproduction steps, severity
2. **Investigate** — Five Whys root cause analysis (minimum 2-3 levels)
3. **Fix & Test** — branch `fix/{feature}/{description}`, apply fix, write regression tests
4. **PR** — create GitHub issue + PR with "Fixes #N" auto-close

**What it produces**:
- `docs/features/{feature}/bugs/{date}_{description}.md`
- Fix on branch `fix/{feature}/{description}`
- Regression test(s)
- GitHub issue (`type:bug`) + PR

**When to promote to a story**:
- Fix touches many files or changes architecture
- The "fix" is really a feature gap
- Five Whys reveals a systemic problem requiring redesign
- It would need planning, designing, and roadmapping

**Key rules**:
- Always write a regression test — no exceptions
- Five Whys is mandatory — surface-level fixes recur
- Don't scope-creep — improvements go in a separate story
- No ralph loop required — run relevant tests, not the full suite
- Document before fixing (captures symptoms while fresh)

---

## 8. `/skill-builder` — Skill Creator (Meta-Skill)

**What it does**: Builds new Claude Code skills through a 6-phase interactive discovery process. Guides through qualifying the idea, scoping, designing architecture, writing SKILL.md and supporting files, and wiring up integration points (boost.json, hooks).

**How to invoke**:
- `/skill-builder`
- "Build a skill", "New skill", "Create a skill"
- Describe automation you want Claude to learn

**Skill types it can create**:
| Type | Purpose | Auto-activates? | Examples |
|------|---------|-----------------|----------|
| Domain Knowledge | Teaches patterns for a code area | Yes (via boost.json) | `pest-testing`, `content-publishing` |
| Interactive Workflow | Guides multi-step processes | No (slash command) | `plan`, `execute`, `feature` |
| Utility | Cross-cutting conventions | Yes (via boost.json) | `documentation-maintenance` |

**The 6 Phases**:
1. **Qualification & Purpose** — why does this skill need to exist?
2. **Scope & Boundaries** — what's in, what's out, what overlaps?
3. **Instruction Design** — section outline, code snippets, templates
4. **Security & Tool Constraints** — permissions, agents, hooks
5. **Write the Skill** — produce all files
6. **Integration & Verification** — register in boost.json, add hook mappings, test

**What it produces**:
- `.claude/skills/{name}/SKILL.md`
- `templates/` and `examples/` subdirectories (if needed)
- Companion agent in `.claude/agents/` (if needed)
- Updated `boost.json` registration (domain/utility skills)
- Updated hook mappings

**Key rules**:
- Always walks through discovery — never generates from a one-liner
- Checks for overlapping skills before creating
- Never overwrites an existing skill without confirmation
- Domain skills use `<code-snippet>` blocks, not markdown fences

---

## Quick Reference

| Skill | Trigger | Output | Pipeline Position |
|-------|---------|--------|-------------------|
| `/feature` | "add a feature", "feature catalog" | Feature catalog + README | Before everything |
| `/research story` | "research story {feature}" | brief.md + GitHub issue | Before `/plan` |
| `/research context` | "research context", "research brief" | Context brief for external AI | Before `/plan` |
| `/research spike` | "research spike" | Spike doc + recommendation | Standalone |
| `/plan` | "let's plan", "PRD" | brief + prd + design + plan | After research, before `/execute` |
| `/execute` | "execute the plan", "start building" | Code + journal + PR | After `/plan` |
| `/feedback` | "PR feedback", "handle review" | feedback.md + PR updates | After PR review |
| `/bugfix` | "fix this bug", "something is broken" | Bug doc + fix + regression test + PR | Standalone |
| `/skill-builder` | "build a skill", "new skill" | New skill files + integration | Standalone (meta) |
