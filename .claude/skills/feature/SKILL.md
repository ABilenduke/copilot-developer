---
name: feature
description: Discover, catalog, and manage application features in docs/features/. Use when the user wants to map out what their application does, add a new feature to the catalog, review existing features, or understand the feature landscape before planning work. Auto-invoke when the user says "what features do we have", "add a feature", "feature catalog", "document this feature", or "map out the app".
---

# Feature Discovery Skill

## Purpose

This skill builds and maintains a living catalog of application features in `docs/features/`. Through interactive Q&A, it helps the developer articulate what each feature is and why it exists, creating lightweight documentation that serves as the organizational backbone for planning and execution.

## First Steps

When this skill is invoked:

1. Read the supporting files in this skill directory:
    - `templates/feature-readme-v2.md` — template for individual feature READMEs (Diátaxis structure: Overview, Architecture, Common Tasks, Stories)
    - `templates/feature-readme.md` — legacy template (for reference only; use v2 for all new features)
    - `templates/index.md` — template for the feature catalog index
2. Check if `docs/features/` already exists:
    - **If yes**: Read `docs/features/index.md` and list existing features. Ask the user what they want to do (add a new feature, update an existing one, review the catalog).
    - **If no**: This is a fresh start. Explain briefly what you're building, then begin discovery.
3. Explore the codebase to understand what exists (routes, controllers, models, directories) — this gives you informed suggestions during discovery.

---

## Modes of Operation

### Mode 1: Initial Discovery (Fresh Catalog)

Walk the developer through mapping out their entire application. This is a brainstorming conversation.

**Approach**:

1. Explore the codebase first (directory structure, routes, models, key config files)
2. Propose an initial list of features based on what you find: "Based on the codebase, I can see what looks like: auth, billing, notifications, reporting, and an admin panel. Does that sound right? What am I missing?"
3. For each feature, have a brief conversation to nail down:
    - **What is it?** (1-3 sentence description)
    - **Why does it exist?** (What problem does it solve?)
4. Create the directory structure and files (each feature gets: `README.md`, `stories/`, `bugs/`, `spikes/`)
5. Generate the index

**Keep it lightweight.** The feature README is intentionally minimal — just description and purpose. Don't try to document implementation details, file lists, or technical architecture here. That's what plans are for.

### Mode 2: Add a Feature

The catalog already exists. The developer wants to add a new feature.

1. Ask what the feature is
2. Brief Q&A to get description, purpose, domain, and status
3. Create the feature directory with subdirectories: `stories/`, `bugs/`, `spikes/`
4. Create the README using `templates/feature-readme-v2.md` (Diátaxis format)
5. Update the index

### Mode 3: Update a Feature

The developer wants to update an existing feature's description or purpose.

1. Show current content
2. Discuss what's changed
3. Update the README
4. Update the index if needed

### Mode 4: Review Catalog

The developer wants to see what's documented.

1. Read and present the index
2. Offer to drill into any specific feature
3. Flag any features that might be missing based on codebase exploration

---

## Directory Structure

This skill creates and maintains:

```
docs/features/
├── index.md                              ← auto-maintained catalog
├── auth/
│   ├── README.md                         ← living doc: what this feature IS today
│   ├── stories/                          ← immutable story records (new format)
│   │   └── {YYYY-MM-DD}_{story-name}/
│   │       ├── brief.md                  ← WHY (business case)
│   │       ├── prd.md                    ← WHAT (requirements + AC)
│   │       ├── design.md                 ← HOW (architecture)
│   │       ├── plan.md                   ← WHEN/ORDER (roadmap)
│   │       ├── journal.md                ← WHAT HAPPENED (execution record)
│   │       └── feedback.md               ← REVIEW CYCLE (PR feedback)
│   ├── bugs/                             ← bug reports and fixes
│   │   └── {YYYY-MM-DD}_{description}.md
│   ├── spikes/                           ← feature-specific investigations
│   │   └── {YYYY-MM-DD}_{question}.md
│   └── iterations/                       ← legacy plans (old format, read-only)
│       └── ...
└── [feature-name]/
    ├── README.md
    ├── stories/
    ├── bugs/
    ├── spikes/
    └── iterations/                       ← legacy (if any exist)
```

### Directory Responsibilities

- **stories/**: Created by `/research story` and populated by `/plan` + `/execute`. Story documents are **immutable** — historical records of what was planned, designed, built, and learned.
- **bugs/**: Created by `/bugfix`. Lightweight fix records.
- **spikes/**: Created by `/research spike`. Time-boxed investigations with recommendations.
- **iterations/**: Legacy directory from old format. Existing iterations are untouched; new work goes in `stories/`. The `/execute` skill detects format automatically.
- **README.md**: A **living** document — updated after each story completes. Describes what the feature IS today.

---

## Critical Rules

1. **Keep feature READMEs minimal.** Description and purpose only. Resist the urge to document technical details — they go stale immediately.
2. **Always update the index** after adding, removing, or renaming a feature.
3. **Use the codebase** to inform suggestions. Don't just ask the developer to list features from memory — explore routes, models, and directories to propose a starting list.
4. **Feature names should be kebab-case** directory names: `user-auth`, `billing`, `admin-panel`, `audit-log`.
5. **One feature = one cohesive capability.** If a feature has multiple sub-features that change independently, they might deserve their own entries. Use judgment.
6. **Confirm before creating.** Show the developer what you're about to create and get a thumbs up before writing files.

---

## Conversation Style

This should feel like a quick brainstorm, not a long interview. For initial discovery of an existing app, you should be doing most of the work — exploring the codebase and proposing features for the developer to confirm, correct, or expand.

For each feature, you need two things:

- "What is this?" → 1-3 sentences
- "Why does it exist?" → 1-2 sentences

That's it. Move fast.

---

## Index Generation

After any change to the feature catalog, regenerate `docs/features/index.md` by reading all feature READMEs and compiling them. Use the template at `templates/index.md`.

The index groups features by domain and tracks stories, bugs, and latest activity:

<code-snippet name="Feature Index Entry" lang="markdown">
## Business Domain

| Feature | Description | Stories | Open Bugs | Latest Story |
|---------|-------------|---------|-----------|--------------|
| [article-publishing](article-publishing/) | Core content lifecycle — CRUD, status workflow, revisions, SEO metadata | 1 | 0 | [Block-Based Architecture](article-publishing/stories/2026-02-14_block-based-architecture/) |
| [newsletter](newsletter/) | Double opt-in email subscriber system with verification and unsubscribe | 0 | 0 | — |
</code-snippet>

**Counting rules:**
- **Stories**: Count directories in `stories/` (new format) + directories in `iterations/` (legacy format)
- **Open Bugs**: Count `.md` files in `bugs/` (excluding any marked as Fixed/Won't Fix if you can parse the Status field)
- **Latest Story**: Link to the most recent story or iteration by date prefix

---

## Feature README Format

Feature READMEs use the **v2 Diátaxis-structured format** (`templates/feature-readme-v2.md`). They are **living documents** updated after each story completes:

<code-snippet name="Feature README v2" lang="markdown">
# Broadcasting

**Domain**: Infrastructure
**Status**: Active

## Overview
Real-time communication layer using Laravel Reverb as the WebSocket server and Laravel Echo on the frontend. Enables instant feedback without polling.

## Architecture
- **Models**: None (uses Laravel's built-in broadcasting)
- **Controllers**: None (event-driven)
- **Key routes**: `broadcasting/auth` (channel authorization)
- **Jobs/Events**: BroadcastEvent, NotificationSent

## Common Tasks
- How to add a new broadcast channel
- How to subscribe to events in Vue components

## Stories

| Date | Story | Ticket | Status |
|------|-------|--------|--------|
| 2026-01-15 | [Initial Setup](stories/2026-01-15_initial-setup/) | [#12](link) | Complete |

## Known Issues
- None currently
</code-snippet>

### Living vs Immutable Documents

- **README.md** is **living** — updated after each story completes to reflect current state
- **Story documents** (brief.md, prd.md, design.md, plan.md, journal.md, feedback.md) are **immutable** — historical records never edited after completion
- When updating a README after a story, add the story to the Stories table and update Overview/Architecture sections to reflect new capabilities

---

## Common Pitfalls

- **Over-documenting in READMEs**: Feature READMEs are "what" and "why" only — never "how". Technical details, file lists, and architecture go in iteration plans created by `/plan`. READMEs that include implementation details become stale within days.
- **Forgetting to update the index**: Every add, remove, or rename must update `docs/features/index.md`. The index is the entry point — a feature without an index entry is invisible to `/plan` and `/execute`.
- **Feature granularity mismatch**: A feature should be one cohesive capability. "Admin" is too broad (it contains dashboard, articles, categories, tags, media — each is a separate feature). "Article slug generation" is too narrow (it's part of article-publishing). If two things always change together, they're one feature.
- **Missing stories directory**: The `/feature` skill creates `stories/`, `bugs/`, and `spikes/` directories when adding a feature. The feature directory must exist before `/research story` or `/plan` can create stories inside it. If `/plan` says the feature doesn't exist, run `/feature` first.
- **Old iterations vs new stories**: Features may have both `iterations/` (legacy) and `stories/` (new format). Legacy iterations are read-only — all new work goes in `stories/`. The index counts both when showing story/iteration totals.
- **Wrong domain grouping in index**: Features are grouped by domain (Business, Platform, Infrastructure). A feature in the wrong domain confuses navigation. Auth is Platform (not Infrastructure). Newsletter is Business (not Platform). Broadcasting is Infrastructure (not Platform).

$ARGUMENTS
