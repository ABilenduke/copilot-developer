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
    - `templates/feature-readme.md` — template for individual feature READMEs
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
4. Create the directory structure and files
5. Generate the index

**Keep it lightweight.** The feature README is intentionally minimal — just description and purpose. Don't try to document implementation details, file lists, or technical architecture here. That's what plans are for.

### Mode 2: Add a Feature

The catalog already exists. The developer wants to add a new feature.

1. Ask what the feature is
2. Brief Q&A to get description and purpose
3. Create the feature directory and README
4. Update the index

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
│   ├── README.md                         ← what this feature is
│   └── iterations/                       ← created by /plan and /execute
│       └── ...
├── billing/
│   ├── README.md
│   └── iterations/
│       └── ...
└── [feature-name]/
    ├── README.md
    └── iterations/
        └── ...
```

The `iterations/` directory is created later by the `/plan` skill — this skill only creates the feature directory and README.

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

The index groups features by domain and tracks iteration counts:

<code-snippet name="Feature Index Entry" lang="markdown">
## Business Domain

| Feature | Description | Iterations |
|---------|-------------|------------|
| [article-publishing](article-publishing/) | Core content lifecycle — CRUD, status workflow, revisions, SEO metadata | 1 — [Block-Based Content Architecture](article-publishing/iterations/2026-02-14_block-based-content-architecture/plan.md) |
| [newsletter](newsletter/) | Double opt-in email subscriber system with verification and unsubscribe | 0 |
</code-snippet>

---

## Feature README Format

Feature READMEs are intentionally minimal — two sections, no technical details:

<code-snippet name="Feature README" lang="markdown">
# Broadcasting

## What is it?

Real-time communication layer using Laravel Reverb as the WebSocket server and Laravel Echo on the frontend. Runs as a dedicated Docker service with nginx proxying, and exposes Vue composables for channel subscriptions.

## Why does it exist?

Enables real-time features (notifications, live content updates, collaborative signals) without polling. The foundation for any future feature that needs instant feedback.
</code-snippet>

---

## Common Pitfalls

- **Over-documenting in READMEs**: Feature READMEs are "what" and "why" only — never "how". Technical details, file lists, and architecture go in iteration plans created by `/plan`. READMEs that include implementation details become stale within days.
- **Forgetting to update the index**: Every add, remove, or rename must update `docs/features/index.md`. The index is the entry point — a feature without an index entry is invisible to `/plan` and `/execute`.
- **Feature granularity mismatch**: A feature should be one cohesive capability. "Admin" is too broad (it contains dashboard, articles, categories, tags, media — each is a separate feature). "Article slug generation" is too narrow (it's part of article-publishing). If two things always change together, they're one feature.
- **Missing iterations directory**: The `iterations/` directory is created by `/plan`, not `/feature`. But the feature directory must exist before `/plan` can create iterations inside it. If `/plan` says the feature doesn't exist, run `/feature` first.
- **Wrong domain grouping in index**: Features are grouped by domain (Business, Platform, Infrastructure). A feature in the wrong domain confuses navigation. Auth is Platform (not Infrastructure). Newsletter is Business (not Platform). Broadcasting is Infrastructure (not Platform).

$ARGUMENTS
