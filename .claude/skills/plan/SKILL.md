---
name: plan
description: >-
  Interactive planner that walks through a 7-phase discovery process producing
  altitude-layered documents: brief.md (WHY), prd.md (WHAT), design.md (HOW),
  plan.md (WHEN/ORDER). Supports subcommands for individual layers and GitHub
  sub-issue creation. Plans are scoped to a feature and saved in story
  directories. Auto-invoke when the user says "let's plan", "PRD", "before we
  code", "plan this out", "walk me through the requirements", or describes a
  significant change they want to build.
---

# PRD Planner Skill

## ⛔ HARD RULES — READ BEFORE DOING ANYTHING

These rules are absolute. No exceptions. No workarounds.

### Rule 1: NEVER create features

You do NOT create feature directories, feature READMEs, or update the feature index. EVER.

If the user names a feature that does not exist under `docs/features/`, STOP and tell them: "The feature '{name}' doesn't exist in the catalog. Please run `/feature` to create it first, then come back to `/plan`."

Feature creation belongs to `/feature`. Not you. Not ever.

### Rule 2: ALWAYS use the story directory structure

Plans go here and ONLY here:

```
docs/features/{feature}/stories/{YYYY-MM-DD}_{story-name}/plan.md
```

CORRECT:
```
docs/features/auth/stories/2026-02-21_add-oauth2/plan.md
```

WRONG — all of these are WRONG:
```
docs/features/auth/plan.md
docs/features/auth/stories/plan.md
docs/plans/auth-add-oauth2.md
```

**Format detection**: If the user points you at an existing directory under `iterations/`, use the old monolithic format (backward compatibility). If creating new work, always use `stories/`.

### Rule 3: NEVER skip the done gate

Each document layer has a done gate. Do not write the file until the gate criteria are met through the interactive process.

### Verification Checklist (run before Phase 1)

- [ ] `docs/features/` exists? If no → STOP, tell user to run `/feature`
- [ ] Target feature directory exists? If no → STOP, tell user to run `/feature`
- [ ] Story directory exists or can be created at `docs/features/{feature}/stories/{YYYY-MM-DD}_{story-name}/`?
- [ ] All checks pass? → Proceed

---

## Purpose

This skill enforces a **planning-first discipline** for software development. Before any code is written, you walk the developer through an interactive 7-phase discovery process that produces **four altitude-layered documents**:

| Document | Question | Phase(s) | Mutable? |
|----------|----------|----------|----------|
| `brief.md` | WHY are we doing this? | Phase 1 | Immutable after approval |
| `prd.md` | WHAT are we building? | Phases 2 + 6 | Immutable after approval |
| `design.md` | HOW will we build it? | Phases 3-5 | Immutable after approval |
| `plan.md` | WHEN and in what ORDER? | Phase 7 | Immutable after approval |

Each document exists at a different altitude and answers a different question. This separation lets you revisit the business case independently of the technical design, or update scope without re-reading implementation details.

---

## First Steps

When this skill is invoked:

1. Read the supporting files in this skill directory:
    - `templates/brief-template.md` — business case with RICE scoring
    - `templates/prd-template.md` — product requirements with INVEST checklist
    - `templates/design-template.md` — technical design with assumption mapping
    - `templates/plan-template.md` — implementation roadmap
    - `templates/questions.md` — question bank organized by phase with layer annotations
    - `examples/example-plan.md` — a completed plan showing the expected quality bar
2. **Check for subcommand mode** (see Subcommands section below)
3. **Determine the target feature**:
    - Read `docs/features/index.md` and list the available features
    - Ask: "Which feature does this change belong to?"
    - If the user provided arguments (e.g., `/plan auth add-oauth2`), infer feature and story name
    - Verify the feature exists — if not, STOP (Rule 1)
4. **Locate or create the story directory**:
    - If a story directory already exists (from `/research story`), use it
    - If not, ask for a short kebab-case name, create `docs/features/{feature}/stories/{YYYY-MM-DD}_{story-name}/`
    - Check for existing sibling documents (brief.md from `/research story`)
5. Explore the codebase to understand existing architecture and patterns
6. Begin Phase 1 (or the appropriate phase for the subcommand)

---

## Subcommands

The skill supports targeted invocations for individual document layers:

```
/plan                      # Full 7-phase walk-through → all 4 documents
/plan brief                # Phase 1 only → brief.md
/plan prd                  # Phases 2 + 6 → prd.md
/plan design               # Phases 3-5 → design.md
/plan steps                # Phase 7 → plan.md
/plan tickets              # Create GitHub sub-issues from existing plan.md
/plan review               # Reconcile docs vs GitHub ticket state
```

### Dependency Enforcement

| Subcommand | Requires | Enforcement |
|------------|----------|-------------|
| `brief` | Nothing | Always allowed |
| `prd` | brief.md exists | Advisory warning if missing, proceed anyway |
| `design` | prd.md exists | Advisory warning if missing, proceed anyway |
| `steps` | design.md exists | **Hard block** — can't create roadmap without knowing the files |
| `tickets` | plan.md exists | **Hard block** — can't create tickets without steps |
| `review` | plan.md with ticket refs | Advisory — reports what it can find |

**Why advisory (not hard) for brief→prd→design**: A solo developer may have the business context in their head and just want to jump to the PRD. Hard blocks create friction. The quality checklist at the end catches missing layers.

### Subcommand Behavior

When a subcommand is used:
1. Read existing sibling documents as context (brief.md informs prd.md, etc.)
2. Run only the phases relevant to that layer
3. Run only the quality checklist items relevant to that layer
4. Skip the GitHub ticket creation (use `/plan tickets` separately)

---

## How It Works: The 7-Phase Discovery Process

The planning process is **conversational and interactive** — not a form to fill out. You guide the developer through 7 phases, asking probing questions, challenging assumptions, and synthesizing answers into documents at checkpoints.

### Critical Rules

1. **NEVER create features.** STOP and tell the user to run `/feature` first.
2. **ALWAYS use the story directory structure.** New plans go in `stories/`, not `iterations/`.
3. **NEVER skip phases** in full mode. Move quickly through obvious answers, but don't skip.
4. **Ask ONE question at a time** (sometimes two if tightly related).
5. **Reflect back what you heard.** Briefly summarize before moving on.
6. **Challenge weak answers.** "It should just work" is not an error handling strategy.
7. **Offer informed suggestions.** You're a thinking partner.
8. **Track progress visibly.** Show the progress indicator at the start of each response.
9. **Build documents incrementally.** Write at checkpoints, not just at the end.
10. **Use the question bank as a toolkit.** Read `templates/questions.md` for inspiration.

---

## Phase Details

### Phase 1: Problem Discovery (WHY) [→ brief.md]

**Goal**: Understand the problem and motivation. Build the business case.

Explore: What problem? Who has it? Current vs desired behavior? Why now? Market context? What does success look like (measurably)? Constraints?

**Interactive RICE scoring**:
- **Reach**: How many users/sessions per quarter? (1-10)
- **Impact**: How much does this move the needle? (1-10)
- **Confidence**: How sure are we? (percentage)
- **Effort**: Person-days of focused work?
- **Score**: (R x I x C) / E

**Pre-mortem**: "It's 3 months later and this failed. Why?" Require minimum 3 risks with mitigations.

**Done gate**: Business case is clear, RICE score is calculated, success criteria are measurable, pre-mortem has ≥3 risks with mitigations.

**Checkpoint**: Write `brief.md` using `templates/brief-template.md`.

### Phase 2: Scope Definition (WHAT) [→ prd.md, first pass]

**Goal**: Draw a sharp line around what's in and out.

Explore: User stories? Core v1 features? What's explicitly out? Existing patterns to follow or break? Dependencies?

**Technique**: MoSCoW prioritization (MUST/SHOULD/COULD/WON'T). Push back if everything is a MUST.

**INVEST validation**: Check each user story against:
- **I**ndependent — Can be delivered without other stories in progress
- **N**egotiable — Scope can flex without losing core value
- **V**aluable — Delivers clear user or business value
- **E**stimable — Effort is understood well enough to plan
- **S**mall — Completable in 1-3 focused days
- **T**estable — Every Must-have has a Given/When/Then AC

**Done gate (partial)**: Every Must-have item has a description. Scope boundaries are explicit.

**Checkpoint**: Write `prd.md` first pass (User Stories + Scope sections) using `templates/prd-template.md`.

### Phase 3: Technical Architecture (HOW — High Level) [→ design.md]

**Goal**: Establish the technical approach.

Explore: High-level architecture? Technologies involved? Key decisions (sync/async, polling/webhooks, etc.)? Integration points? Performance requirements? Data model changes? Auth considerations?

**Key Architectural Decisions table**: For each decision, document the choice, rationale, AND alternatives considered. This prevents revisiting decisions without context.

**Technique**: Sketch data flow verbally and confirm.

**Output**: Technical approach with decisions documented and justified.

### Phase 4: File-Level Implementation Plan (HOW — Detailed) [→ design.md]

**Goal**: Map architecture to specific files.

Explore: Files to modify? New files to create? Migrations? Config changes? Dependency graph?

**File Manifest**: New files, modified files, deleted files, config changes — each with purpose.

**Technique**: Walk through the codebase together. Propose a file list for validation.

**Checkpoint**: Write `design.md` (Architecture + File Manifest sections) using `templates/design-template.md`.

### Phase 5: Edge Cases & Error Handling (WHAT IF) [→ design.md]

**Goal**: Systematically identify failure modes.

Probe: Input validation? Network failures? Concurrency/race conditions? Data integrity? Auth edge cases? State transitions? Backward compatibility? Resource limits?

**Assumption Mapping table**: For each assumption, assess certainty (High/Medium/Low) and impact (High/Medium/Low). High-impact + Low-certainty assumptions should trigger a spike before implementation.

**Technique**: "What's the worst thing that could happen? What's the second worst?"

**Done gate**: File manifest covers every change. Data model is complete. Edge cases addressed. High-impact/low-certainty assumptions have actions.

**Checkpoint**: Append Edge Cases and Assumption Mapping to `design.md`.

### Phase 6: Acceptance Criteria & Testing (PROVE IT) [→ prd.md, second pass]

**Goal**: Define exactly what "done" looks like.

Explore: Acceptance criteria per feature (Given/When/Then)? Unit tests? Feature tests? Browser tests? Manual testing? Performance benchmarks? How to verify edge cases from Phase 5?

**Done gate**: Every Must-have item has ≥1 acceptance criterion. Testing strategy covers all AC. INVEST checklist passes.

**Checkpoint**: Append Acceptance Criteria + Testing Strategy + INVEST Checklist to `prd.md`.

### Phase 7: Implementation Roadmap (IN WHAT ORDER) [→ plan.md]

**Goal**: Break work into ordered, shippable increments.

Explore: Optimal build order? PR/commit boundaries? Parallel vs sequential? Risky unknowns to spike first? Effort estimates (S/M/L)? Validation checkpoints?

**Technique**: Propose a build order. Find the minimum viable slice.

**Done gate**: Steps are ordered by dependency. Every file in design.md manifest is covered by a step. Effort estimates provided.

**Checkpoint**: Write `plan.md` using `templates/plan-template.md`. Run quality checklist.

---

## GitHub Integration

### Creating Sub-Issues from Plan Steps

After `plan.md` is written (either in full mode or via `/plan tickets`):

```bash
# 1. Check if a story ticket exists (from /research story)
# If not, create the story ticket first:
STORY_NUM=$(~/.local/bin/gh issue create \
  --repo ABilenduke/content-engine \
  --title "Story: {story-name}" \
  --label "type:story,priority:{priority},area:{area}" \
  --body "$(cat <<'STORYEOF'
## Summary
{one-line from brief.md or prd.md}

## Business Case
{from brief.md or summary}

## Acceptance Criteria
{from prd.md — copy the Given/When/Then criteria}

## Story Docs
- Brief: {path}/brief.md
- PRD: {path}/prd.md
- Design: {path}/design.md
- Plan: {path}/plan.md
STORYEOF
)" --json number --jq '.number')

# 2. Add story ticket to project board
~/.local/bin/gh issue edit $STORY_NUM --add-project "Content Engine"

# 3. Create sub-issues for each plan step
for each step in plan.md:
  SUB_ID=$(~/.local/bin/gh api repos/ABilenduke/content-engine/issues \
    -X POST \
    -f title="Step {N}: {task name}" \
    -f "labels[]=type:story" \
    -f "labels[]=area:{area}" \
    -f body="$(cat <<'SUBEOF'
## Step {N}: {Task Name}

**Files**: {from design.md file manifest}
**Dependencies**: None | Step N
**Estimated effort**: S / M / L

## Description
{from plan.md step description}

## Parent Story
#{story-issue-number}
SUBEOF
)" --jq '.id')

  # 4. Add as sub-issue to story ticket
  ~/.local/bin/gh api repos/ABilenduke/content-engine/issues/$STORY_NUM/sub_issues \
    -X POST -F sub_issue_id=$SUB_ID

  # 5. Add sub-issue to project board
  ~/.local/bin/gh issue edit {sub-issue-number} --add-project "Content Engine"
done
```

**Important**: The `sub_issue_id` in the POST request is the issue's internal numeric `id` (from the `id` field), NOT the issue number. Create the issue first, get the `id`, then add as sub-issue.

### Updating Existing Story Ticket

If the story ticket was already created by `/research story`, update it:

```bash
~/.local/bin/gh issue edit {number} \
  --body "$(cat <<'EOF'
## Summary
{updated with prd.md content}

## Acceptance Criteria
{from prd.md}

## Story Docs
- Brief: {path}/brief.md
- PRD: {path}/prd.md
- Design: {path}/design.md
- Plan: {path}/plan.md
EOF
)"
```

Record the ticket number in `plan.md` header: `**Ticket**: #{issue-number}`

### Reconciling Docs vs GitHub (`/plan review`)

The `/plan review` subcommand detects drift between story documents and GitHub ticket state. It reads, reports, and optionally fixes discrepancies.

**When to use**: Before starting new work on a story, after a long pause, or when the board looks stale.

**Source of truth hierarchy**: Docs > GitHub. If they diverge, trust the docs.

**Phase 1: Extract Ticket References**

Read `plan.md` in the story directory. Extract:
- Story ticket: `**Ticket**: #{number}` from the header
- Sub-issue tickets: `**Sub-issue**: #{number}` from each step

If no ticket references are found:
- If the path contains `/iterations/` (old format): report "This is an old-format iteration — GitHub tickets are not supported for legacy plans." and stop.
- If the path contains `/stories/` (new format): report "No ticket references found in plan.md. Run `/plan tickets` to create them." and stop.

**Phase 2: Query GitHub State**

For each referenced ticket, query its current state:

```bash
# Get story ticket state
~/.local/bin/gh issue view {story-number} \
  --repo ABilenduke/content-engine \
  --json number,title,state,labels,projectItems

# Get all sub-issues
~/.local/bin/gh api repos/ABilenduke/content-engine/issues/{story-number}/sub_issues \
  --jq '.[] | {number: .number, title: .title, state: .state}'

# Get individual sub-issue details if needed
~/.local/bin/gh issue view {sub-number} \
  --repo ABilenduke/content-engine \
  --json number,title,state,labels,assignees
```

**Phase 3: Report Discrepancies**

Compare docs vs GitHub and produce a report:

```markdown
## /plan review: {feature} / {story-name}

### Story Ticket: #{number}
- **GitHub state**: open | closed
- **Docs state**: {plan.md Status field}
- **Drift**: None | ⚠️ {description}

### Sub-Issues

| Step | Sub-issue | GitHub State | Plan State | Drift |
|------|-----------|-------------|------------|-------|
| 1 | #{N} | open | described | None |
| 2 | #{N} | closed | described | ⚠️ Closed but plan not marked complete |
| 3 | — | missing | described | ⚠️ No sub-issue for this step |

### Missing from Plan
Sub-issues on GitHub that aren't referenced in plan.md steps.

### Summary
- Total sub-issues: N in plan, M on GitHub
- Aligned: X | Drifted: Y | Missing: Z
```

**Discrepancy types to detect:**
- Story ticket closed but plan.md status is not "Complete"
- Story ticket open but journal.md exists with a "Summary" section (work is done)
- Sub-issue closed on GitHub but corresponding plan step has no commit hash in journal
- Plan step exists with no corresponding sub-issue (never created)
- Sub-issue exists on GitHub with no corresponding plan step (orphan)
- Labels on GitHub don't match plan metadata (advisory only)

**Phase 4: Optionally Fix**

After presenting the report, ask: "Want me to fix any of these discrepancies?"

Available fixes:
- **Close stale tickets**: `~/.local/bin/gh issue close {number} --repo ABilenduke/content-engine --comment "Closed by /plan review — work completed per journal.md"`
- **Create missing sub-issues**: Same flow as `/plan tickets` but only for the missing steps
- **Reopen incorrectly closed**: `~/.local/bin/gh issue reopen {number} --repo ABilenduke/content-engine`
- **Update plan.md status**: Edit the Status field to match reality

**Do NOT auto-fix.** Always present the report first and let the user decide.

---

## Progress Indicator

Start EVERY response with:

```
📋 Planning [{feature} / {story-name}]: Phase N of 7 — [Phase Name]
[██████░░░░░░░░] N/7 complete
```

For subcommand mode:

```
📋 Planning [{feature} / {story-name}]: {layer} — [Phase Name]
```

---

## Quality Checklist

Before finalizing (full mode runs all; subcommand mode runs relevant subset):

### brief.md
- [ ] Business case is clear (not hand-waving)
- [ ] RICE score is calculated with real numbers
- [ ] Success criteria are measurable
- [ ] Pre-mortem has 3+ risks with mitigations

### prd.md
- [ ] Every Must-have item has ≥1 acceptance criterion
- [ ] Acceptance criteria use Given/When/Then format
- [ ] Testing strategy covers all AC
- [ ] INVEST checklist passes

### design.md
- [ ] Technical approach is justified, not just described
- [ ] Key decisions have alternatives documented
- [ ] File manifest covers every new/modified/deleted file
- [ ] Edge cases have handling strategies
- [ ] High-impact/low-certainty assumptions have actions

### plan.md
- [ ] Steps are ordered by dependency
- [ ] Every file in design.md manifest is covered by a step
- [ ] Effort estimates are provided (S/M/L)
- [ ] Checkpoints are defined
- [ ] No TBDs remain (or flagged as open questions)

### GitHub (if tickets created)
- [ ] Story ticket exists with correct labels
- [ ] Sub-issues created for each plan step
- [ ] All tickets added to project board

---

## Backward Compatibility

### Old Format Detection

When the user points you at a path under `iterations/`:

- **Path contains `/stories/`** → NEW FORMAT: multi-file documents, four altitude layers
- **Path contains `/iterations/`** → OLD FORMAT: monolithic plan.md, single file output

Old format behavior:
- Write a single `plan.md` with all 7 sections (Sections 1-7) in one file
- Use the old `templates/plan-template.md` sections format
- No GitHub ticket creation
- No brief.md/prd.md/design.md separation

New format behavior:
- Write four separate files at checkpoints
- Use the individual layer templates
- Create GitHub tickets via `gh` CLI
- Each file is authoritative for its altitude layer

---

## Handling Impatience

- **"Can we just start coding?"** → "Let me make the remaining phases quick. But [phase] is where [specific risk] bites. Two more questions..."
- **"This is too detailed"** → Shift to proposing answers yourself for confirm/correct.
- **"I already know all this"** → Speed-run: state your best guesses, have them correct you.
- **"I just need the roadmap"** → Use `/plan steps` subcommand (requires design.md to exist).

---

## After Planning

Once all documents are complete and confirmed:

1. Save all files to the story directory
2. Summarize the implementation roadmap compactly
3. Create GitHub sub-issues if not already done (or remind about `/plan tickets`)
4. Tell the developer: "Story planned at [path]. When ready to implement, run `/execute` and point it at this plan."
5. Update `docs/features/index.md` with the new story

---

## Companion Subagent

This skill has a companion subagent at `agents/prd-planner.md`. The subagent runs planning in its own context window, keeping the main conversation clean for implementation.

$ARGUMENTS
