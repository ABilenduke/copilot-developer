# Research Brief: {Feature Name}

**Date**: {YYYY-MM-DD}
**Feature**: {feature-name}
**Description**: {One-paragraph description of what is being researched}

---

## 1. Constraints & Non-Negotiables

These constraints are absolute. All research recommendations MUST comply with them.

### Stack Constraints

- **Runtime**: PHP 8.4 on Docker (php-fpm-alpine) — no local PHP, all commands via `docker compose exec -T app`
- **Framework**: Laravel 12 — use current Laravel 12 patterns, not legacy approaches
- **Frontend**: Vue 3 + Inertia.js v2 — NO Blade views (except `app.blade.php`), NO separate SPA/API
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin — NO postcss.config, NO tailwind.config
- **UI Components**: shadcn-vue (Zinc base color, new-york style) — components at `@/components/ui/`
- **Database**: PostgreSQL 16 — NOT MySQL, NOT SQLite
- **Cache/Queue/Sessions**: Redis 7 — queue driver is Redis
- **Testing**: Pest v4 — NOT PHPUnit syntax. Closure-based tests with `$this->get()`, `$this->post()`, etc.
- **Package Manager**: pnpm — NOT npm, NOT yarn
- **TypeScript**: Strict — `<script setup lang="ts">`, no `any`, define types in `resources/js/types/`

### Architectural Constraints

- Controllers return `Inertia::render()` — never JSON or Blade
- Form validation via FormRequest classes — never inline validation
- Eloquent over raw queries — `Model::query()` over `DB::`
- Named routes with `route()` helper — never hardcoded URLs
- Environment variables only in config files — `config()` not `env()` in app code
- Queued jobs for time-consuming operations — `ShouldQueue` interface

### Feature-Specific Constraints

{Any constraints specific to this feature — e.g., "must integrate with existing Reverb WebSocket setup", "must work within the admin layout system"}

---

## 2. Project Context

### Installed Packages (Backend)

{Relevant subset from composer.json — package: version format}

### Installed Packages (Frontend)

{Relevant subset from package.json — package: version format}

### Key Configuration

{Relevant config values — e.g., queue driver, broadcast driver, cache driver, mail driver}

### Directory Structure Conventions

```
app/
  Http/Controllers/Admin/  — Admin controllers (behind EnsureUserIsAdmin middleware)
  Http/Controllers/         — Public controllers
  Http/Requests/Admin/      — Admin form requests
  Models/                   — Eloquent models
  Enums/                    — PHP enums (TitleCase keys)
  Services/                 — Business logic services
  Jobs/                     — Queued jobs
  Events/                   — Event classes
  Listeners/                — Event listeners

resources/js/
  Pages/                    — Inertia page components
  Pages/Admin/              — Admin page components
  Layouts/                  — Layout components (DefaultLayout, AdminLayout, PopupLayout)
  components/ui/            — shadcn-vue components
  components/site/          — Public site components
  components/admin/         — Admin components
  composables/              — Vue composables
  types/                    — TypeScript type definitions
  lib/                      — Utility functions
```

### Existing Route Surface

{Route listing for relevant areas — from `routes/web.php`, `routes/admin.php`}

### Existing Model Inventory

{List of models with one-line descriptions of what they represent}

---

## 3. Current Architecture Snapshot

{This section contains inline code excerpts from the codebase areas relevant to the feature being researched. Only include what's needed — not the entire codebase.}

### Relevant Models

{For each relevant model: relationships, casts, traits, key scopes — inline as code}

```php
// app/Models/{ModelName}.php
{structural excerpt — relationships, casts, traits}
```

### Relevant Database Schema

{For each relevant table: columns, types, indexes, foreign keys — inline from migrations or schema tool}

```sql
{schema excerpt}
```

### Relevant Routes

```php
// routes/{file}.php
{route definitions for the relevant area}
```

### Relevant TypeScript Types

```typescript
// resources/js/types/index.ts
{relevant type definitions and interfaces}
```

### Relevant Services / Jobs / Events

{Summarize behavioral implementation — don't inline full method bodies}

- `{ServiceClass}`: {what it does, what it delegates to, what it returns}
- `{JobClass}`: {what it processes, retry/backoff config, what it dispatches}

### Relevant Frontend Components

{Summarize structure — don't inline templates}

- `{ComponentName}.vue`: {what it renders, what composables it uses, what events it emits}
- `{ComposableName}.ts`: {what state it manages, what it exposes}

---

## 4. Pattern Exemplar: {Exemplar Feature Name}

This existing feature is architecturally similar to what we're building. It demonstrates our established patterns for {what it demonstrates — e.g., "async processing with jobs and events", "real-time updates with broadcasting"}.

### Why This Exemplar

{2-3 sentences explaining why this feature was chosen as the reference point and what patterns it demonstrates}

### Key Files (Inline)

```php
// {path to exemplar service/controller/job}
{full structural excerpt of the key file — this is the "build it like this" reference}
```

```php
// {path to second key file if needed}
{structural excerpt}
```

```vue
// {path to key Vue component if relevant}
<script setup lang="ts">
{structural excerpt — imports, props, composable usage, key logic}
</script>
```

### Pattern Summary

- **Data flow**: {how data moves through the exemplar feature}
- **Job/event chain**: {if applicable — what triggers what}
- **Frontend pattern**: {how the UI is structured and what state management is used}
- **Testing approach**: {how the exemplar is tested — patterns to follow}

---

## 5. Research Objectives

Answer each objective considering the constraints in Section 1, the existing architecture in Section 3, and the exemplar patterns in Section 4. Organize your response by these numbered objectives.

### Architecture & Approach (maps to Plan Section 3: Technical Architecture)

1. **{Specific architecture question}**
   Context: {reference to relevant constraint or exemplar pattern}

2. **{Specific architecture question}**
   Context: {reference}

### Technology & Package Choices (maps to Plan Section 3: Key Decisions)

3. **{Specific package/technology question — include version constraints}**
   Context: {reference to installed packages and compatibility requirements}

### Data Model Design (maps to Plan Section 3: Data Model Changes)

4. **{Specific schema design question}**
   Context: {reference to existing models and relationships from Section 3}

### Integration Approach (maps to Plan Section 3: Integration Points)

5. **{Specific integration question}**
   Context: {reference to exemplar pattern or existing service}

### Implementation Patterns (maps to Plan Section 4: File-Level Plan)

6. **{Specific implementation pattern question}**
   Context: {reference to directory conventions and existing patterns}

### Edge Cases & Security (maps to Plan Section 5: Edge Cases)

7. **{Specific failure mode or security question}**
   Context: {reference to existing error handling patterns}

---

## Suggested Gemini Prompt

Paste this brief into Gemini Deep Research with the following prompt:

> Based on this project research brief, conduct deep research on implementing {feature description}. The brief contains our exact stack, constraints, existing architecture, and a pattern exemplar showing how we build similar features. Organize your findings by the numbered research objectives in Section 5. For each objective, provide specific recommendations that comply with our constraints and build on our existing patterns. Include code examples where helpful, using our stack (Laravel 12, Vue 3, Inertia.js v2, Pest v4, shadcn-vue).
