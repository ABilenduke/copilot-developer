# Codebase Scan Guide

Reference for what to scan, how deep to go, and whether to inline or summarize.

---

## Always-Scan Tier (Run Every Time)

These provide the structural foundation. They're cheap reads — mostly listings and version checks.

| What to Scan | How | Purpose |
|---|---|---|
| `CLAUDE.md` | Read file | Project conventions, stack rules, key file table |
| `composer.json` | Read `require` + `require-dev` sections | Backend package versions |
| `package.json` | Read `dependencies` + `devDependencies` | Frontend package versions |
| `.env.example` | Read file (NEVER `.env`) | What services are configured |
| `config/` | Directory listing only | What's configurable |
| Database schema | Use MCP `database-schema` tool | Full schema overview |
| `routes/web.php` | Read file | Public route surface |
| `routes/admin.php` | Read file | Admin route surface |
| `routes/api.php` | Read file (if exists) | API route surface |
| `app/Models/` | List files + read relationship methods | Domain model inventory |
| `resources/js/` | 2-level directory listing | Frontend structure overview |
| `docs/features/` | Read index + relevant feature docs (if they exist) | Existing feature context |

### What Goes in the Brief from Always-Scan

- **Section 1 (Constraints)**: Stack versions from composer/package.json, conventions from CLAUDE.md
- **Section 2 (Context)**: Package lists, config summary, directory structure, route surface, model inventory

---

## Selective-Scan Tier (Judgment-Driven)

Scan only what's relevant to the feature being researched. Use the feature description to determine relevance.

### Decision Matrix

| If the feature involves... | Scan these areas |
|---|---|
| Database/models | Relevant migrations, model files with relationships/casts/scopes, factories |
| API endpoints | Relevant controllers, form requests, API resources, route definitions |
| Frontend pages | Relevant Vue pages, components, composables, TypeScript types |
| Real-time / broadcasting | `config/broadcasting.php`, `config/reverb.php`, event classes, Echo setup |
| AI / agents | `app/Ai/` directory, agent classes, AI config |
| Async processing | Relevant jobs, events, listeners, `config/queue.php`, `config/horizon.php` |
| Authentication / authorization | Policies, gates, middleware, Fortify config |
| File uploads / media | Media library config, `MediaPathGenerator`, relevant HasMedia traits |
| Email / notifications | Mailables, notification classes, `config/mail.php` |
| External APIs | `app/Services/ExternalApi/`, `ApiProvider` enum, `api_connections` schema |
| Feature flags | `app/Features/` directory, Pennant config |
| Admin features | `app/Http/Controllers/Admin/`, admin Vue pages, admin layout components |

### What Goes in the Brief from Selective-Scan

- **Section 3 (Architecture Snapshot)**: Inline structural contracts, summarized behavioral implementation
- **Section 5 (Research Objectives)**: Context references for each question

---

## Pattern Exemplar Selection

The exemplar is the most architecturally similar existing feature. It gives the research tool a concrete "build it like this" reference.

### How to Choose

1. **Match the primary technical pattern**: If building real-time features, look for existing broadcasting/event usage. If building CRUD with complex forms, look at the article editor. If building async pipelines, look at the campaign system.

2. **Architectural similarity > domain similarity**: A notification system is more architecturally similar to the newsletter system (events, queues, user targeting) than to articles, even though notifications might relate to article publishing.

3. **Prefer features with full vertical slices**: The best exemplar has a model, controller, service, job/event, and Vue page — showing the full stack pattern.

### Exemplar Candidates (Common Patterns)

| Pattern | Likely Exemplar | Why |
|---|---|---|
| CRUD with complex forms | Article editor (AdminArticleController + ArticleForm.vue) | Two-column form, media upload, tag management, slug generation |
| Async processing pipeline | Campaign system or newsletter | Jobs, events, status transitions, queue processing |
| Real-time / broadcasting | Reverb setup + existing Echo usage | WebSocket config, channel auth, frontend Echo composables |
| External API integration | Stock photo search (Pexels/Unsplash) | BaseApiClient pattern, rate limiting, API connection model |
| Public content pages | Article/Category controllers | SEO meta, JSON-LD, Inertia deferred props, pagination |
| Admin list pages | Admin Articles/Categories/Tags Index | DataTable, search/filter, pagination, bulk actions |
| AI-powered features | AI Article Helper (AgentResolver) | Agent pattern, streaming, conversation history |
| Email / transactional | Newsletter system | Queued mailables, signed URLs, double opt-in flow |

### How Deep to Scan the Exemplar

Scan the exemplar's **key files** — the ones that demonstrate the pattern:

- The main model (full structural excerpt)
- The service or controller that orchestrates the flow (structural excerpt + flow summary)
- The job or event chain (if async)
- The primary Vue page or component (structural excerpt of `<script setup>`)
- One test file (summarize patterns only — don't inline)

---

## Inline vs Summarize Rules

### Inline as Code (Structural Contracts)

These define the **shape** of the system. The research tool needs to see them exactly to give compatible recommendations.

- Model class: `protected $fillable`, `protected $casts` / `casts()`, relationship methods, trait usage, key scopes
- Migration schema: `Schema::create()` block with all columns, indexes, foreign keys
- Route definitions: `Route::get()`, `Route::resource()`, middleware groups
- TypeScript interfaces: `interface Props`, `type Article`, exported types
- Enum definitions: Full enum class with cases and methods
- Config values: Only specific key-value pairs that constrain the feature (e.g., `'driver' => 'redis'`)

**Guideline**: 10-30 lines per excerpt. If a model file is 200 lines, extract the structural parts (relationships, casts, traits, scopes) and skip the method bodies.

### Summarize (Behavioral Implementation)

These describe **how things work**. The research tool needs the flow, not the code.

| What | Summarize As |
|---|---|
| Controller method | "Validates via `StoreArticleRequest`, delegates to `ArticleService::create()`, returns `Inertia::render('Admin/Articles/Edit')`" |
| Vue component | "Uses `useForm()` composable for state, two-column grid layout, emits `saved` event, renders via shadcn-vue Card/Input/Button" |
| Service method | "Accepts DTO, creates model within transaction, dispatches `ArticlePublished` event, returns model" |
| Job class | "Implements `ShouldQueue`, processes in `default` queue, 3 retries with exponential backoff, calls `AiService::generate()`" |
| Test file | "Feature test using `RefreshDatabase`, creates models via factories, asserts Inertia page + props, tests auth/validation/happy path" |
| Config file | "`config/queue.php`: Redis driver, `default` and `ai` queues, 3 retry attempts" |
| Middleware | "Checks `$user->role` against allowed roles array, aborts 403 if unauthorized" |

**Guideline**: 1-2 sentences per item. Focus on what it does, what it delegates to, and what it returns/dispatches.
