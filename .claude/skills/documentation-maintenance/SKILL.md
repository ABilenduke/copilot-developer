---
name: documentation-maintenance
description: >-
  Guides when and how to update domain skills, documentation files, and agents after code changes.
  Activates when the doc-sync-hint hook flags related skills/docs, when directly editing
  skill, doc, or agent files, or when the user requests documentation updates.
---

# Documentation Maintenance

## When to Apply

Activate this skill when:

- The `doc-sync-hint` PostToolUse hook flags related skills or docs after a code change
- You are directly creating or editing files in `.claude/skills/`, `.claude/agents/`, or `docs/`
- The user asks you to update documentation, skills, or agents
- You notice that existing skill or agent guidance no longer matches actual code patterns
- A new domain area needs a dedicated agent, or an existing agent's domain knowledge is outdated

## File-to-Domain Mapping

This table shows which skills, docs, and agents relate to each code area. The hook script uses the same mapping for skills and docs.

| Code path pattern | Skills | Docs | Agents |
|---|---|---|---|
| `app/Models/{Article,Category,Tag,ArticleInternalLink,ArticleRevision,KeywordRanking}.php`, `app/Enums/{ArticleStatus,ContentType}.php` | `content-publishing` | `docs/architecture.md`, `docs/generated/schema.md` | `content-manager` |
| `app/Http/Controllers/{Article,Category}Controller*` | `content-publishing` | `docs/generated/routes.md` | `content-manager` |
| `app/Ai/Agents/*.php` | `content-publishing` | `docs/architecture.md` | `campaign-orchestrator`, `content-manager` |
| `resources/js/composables/useArticleAiChat.ts` | `content-publishing`, `inertia-vue-development` | `docs/architecture.md` | `frontend-developer` |
| `app/Models/{Campaign,CampaignTopic}*` | `content-publishing` | `docs/generated/schema.md` | `campaign-orchestrator` |
| `app/Models/{AffiliateLink,AffiliateClick,AffiliateProgram,AffiliateConversion,AdPlacement}*`, `app/Enums/{CommissionType,ConversionStatus}.php` | `affiliate-tracking` | `docs/generated/schema.md` | `monetization-specialist` |
| `app/Http/Controllers/AffiliateRedirectController*` | `affiliate-tracking` | `docs/generated/routes.md` | `monetization-specialist` |
| `app/Models/ArticleAnalytics*` | `analytics-dashboard` | `docs/generated/schema.md` | `analytics-engineer` |
| `app/Http/Middleware/EnsureUserIsAdmin.php`, `routes/admin.php` | — | `docs/architecture.md` | — |
| `app/Http/Controllers/Admin/*.php` | `analytics-dashboard` | `docs/generated/routes.md` | `analytics-engineer` |
| `resources/js/Layouts/AdminLayout.vue`, `resources/js/components/admin/*.vue` | `inertia-vue-development` | `docs/architecture.md` | `frontend-developer` |
| `resources/js/Pages/Admin/*.vue`, `resources/js/Pages/Admin/**/*.vue` | `analytics-dashboard`, `inertia-vue-development` | `docs/generated/routes.md` | `analytics-engineer`, `frontend-developer` |
| `app/Services/ExternalApi/**`, `app/Contracts/ExternalApi/*`, `app/Enums/{ApiProvider,ApiConnectionStatus,WebhookStatus}.php`, `config/external-apis.php`, `app/Models/{ApiConnection,Webhook}.php`, `app/Providers/ExternalApiServiceProvider.php` | `queue-job-patterns` | `docs/generated/schema.md`, `docs/generated/jobs.md` | `social-media-manager`, `laravel-specialist` |
| `app/Jobs/*.php`, `app/Jobs/**/*.php` | `queue-job-patterns` | `docs/generated/jobs.md` | `laravel-specialist` |
| `config/queue.php`, `config/horizon.php`, `app/Providers/HorizonServiceProvider.php` | `queue-job-patterns` | `docs/architecture.md`, `docs/generated/jobs.md` | `laravel-specialist` |
| `resources/js/**/*.vue` | `inertia-vue-development` | — | `frontend-developer` |
| `resources/js/Pages/**/*.vue` (public-facing) | `inertia-vue-development` | — | `frontend-developer`, `seo-specialist` |
| `tests/**/*.php` | `pest-testing` | — | — |
| `database/migrations/*.php` | — | `docs/generated/schema.md` | — |
| `routes/{web,console}.php` | — | `docs/generated/routes.md` | — |
| `app/Features/*.php` | `inertia-vue-development` | — | — |
| `app/Models/SocialAccount*`, `app/Http/Controllers/Social*` | — | `docs/generated/schema.md` | `social-media-manager` |
| `app/Models/NewsletterSubscriber.php`, `app/Enums/{SubscriberStatus,SubscriptionSource}.php`, `app/Http/Controllers/NewsletterController.php`, `app/Mail/Newsletter*.php`, `app/Events/Newsletter*.php`, `app/Listeners/Send*Email.php` | — | `docs/generated/schema.md`, `docs/generated/routes.md` | — |
| `app/Models/SocialIdentity.php`, `app/Enums/AuthProvider.php`, `app/Http/Controllers/Auth/*`, `app/Actions/Fortify/*`, `app/Providers/FortifyServiceProvider.php`, `app/Http/Responses/*`, `config/fortify.php`, `routes/auth.php` | — | `docs/generated/schema.md`, `docs/generated/routes.md` | `frontend-developer` |
| `.claude/skills/*` (excluding `skill-builder/` itself) | `skill-builder` | — | — |

## When to Update Skills

Update a skill's `SKILL.md` when:

- A new code pattern or convention is established that the skill should teach
- An existing convention documented in the skill has changed
- A new pitfall or gotcha is discovered that future work should avoid
- New model relationships, enum values, or API endpoints are added to the domain
- Code snippets in the skill no longer match actual implementations

## When NOT to Update Skills

Do **not** update skills for:

- Formatting-only changes (Pint ran, whitespace adjustments)
- Bug fixes that don't change conventions or patterns
- Adding a single new test that follows existing patterns
- Trivial additions that match documented patterns exactly (e.g., adding a new tag follows the existing tag pattern)

## When to Update Agents

Update an agent's `.md` file in `.claude/agents/` when:

- The agent's domain knowledge section references patterns or models that have changed
- New code conventions are established in the agent's domain (e.g., new model relationships, new API patterns)
- The agent's `<example>` blocks in the description no longer reflect realistic usage
- A new tool, service, or integration is added to the agent's domain
- The agent's memory directory needs seeding with initial knowledge

Do **not** update agents for:

- Changes outside the agent's domain (the agent won't be invoked for those areas)
- Formatting-only or Pint changes
- Bug fixes that don't change domain patterns

## How to Update Skills

### SKILL.md Structure

Every skill file follows this structure:

```markdown
---
name: skill-name
description: >-
  One-paragraph description. Used by Claude to decide when to activate.
---

# Skill Title

## When to Apply
- Bullet list of activation triggers

## Domain sections...
- Code conventions, patterns, relationships
- Use <code-snippet> blocks for examples

## Common Pitfalls
- Things to watch out for
```

### Updating an Existing Skill

- **Make targeted edits** — update only the specific section that changed; do not rewrite the entire file
- **Keep the description accurate** — it controls when Claude activates the skill; if the domain scope changes, update the description
- **Check hook mappings** — if the skill now covers additional code paths, update `doc-sync-hint.sh` and the mapping table above
- **Use `<code-snippet>` blocks** for code examples — they render correctly in boost guidelines
- **Match sibling skill style** — check other skills in `.claude/skills/` for formatting conventions

## How to Update Docs

### What belongs in docs vs skills vs agents

| Content type | Location |
|---|---|
| Architecture decisions, schema diagrams, system overview | `docs/` |
| Code conventions, patterns, how-to guidance for Claude | `.claude/skills/` |
| Deep domain knowledge, implementation patterns for subagents | `.claude/agents/` |
| Project setup, commands, key files | `CLAUDE.md` |

### Updating an Existing Doc

- Update tables and diagrams only when the actual architecture changes (new models, new relationships, changed flows)
- Keep docs factual and descriptive — they describe **what the system is**, not how to code it
- Skills describe **how to work with the system** — patterns, conventions, pitfalls
- If a new model or relationship is added, update the relevant schema/architecture doc

## How to Update Agents

### Agent File Structure

Agent files live in `.claude/agents/` and use YAML frontmatter:

```markdown
---
name: agent-name
description: "When to invoke + <example> blocks showing user/assistant/commentary"
model: sonnet
color: orange
memory: project
---

Agent persona and domain knowledge body...
```

| Field | Purpose |
|---|---|
| `name` | Agent identifier (matches filename without `.md`) |
| `description` | Determines when the Task tool invokes this agent; includes `<example>` blocks |
| `model` | AI model to use (`sonnet`, `opus`, `haiku`) |
| `color` | Display color in the UI |
| `memory` | Memory scope — `project` stores memory in `.claude/agent-memory/{agent-name}/` |

### Updating an Existing Agent

- **Update domain knowledge** — when models, relationships, or patterns change in the agent's domain, update the body sections
- **Update `<example>` blocks** — if the agent's invocation patterns change, update examples in the `description` field
- **Update memory** — seed the agent's `MEMORY.md` at `.claude/agent-memory/{agent-name}/MEMORY.md` with initial knowledge if it's empty
- **Keep the description scope accurate** — the description controls when the Task tool selects this agent
- **Make targeted edits** — update specific sections, don't rewrite the entire file

## Adding a New Skill

1. Create `.claude/skills/{skill-name}/SKILL.md` with YAML frontmatter (`name` + `description`)
2. Add the skill name to the `skills` array in `boost.json`
3. Add path mappings to `.claude/hooks/doc-sync-hint.sh` if the skill covers specific code paths
4. Update the mapping table in this file

## Adding a New Doc

Root-level docs:
1. Create `docs/{topic}.md` (architecture narrative) or add to `docs/generated/` (auto-generated references)
2. Update `docs/README.md` index
3. Add path mappings to `.claude/hooks/doc-sync-hint.sh` for code paths related to the new doc
4. Update the mapping table in this file

Feature docs:
1. Create `docs/features/{feature-name}/README.md` using the `/feature` skill
2. Add `## Key References` section linking to relevant `docs/generated/*.md#feature-name` anchors
3. Update `docs/features/index.md`

Auto-generated references (`docs/generated/`):
- Run `php artisan docs:generate` to regenerate `schema.md`, `routes.md`, `jobs.md`
- These are committed but never edited manually — update the command at `app/Console/Commands/GenerateReferenceDocs.php` instead

## Adding a New Agent

1. Create `.claude/agents/{agent-name}.md` with YAML frontmatter (`name`, `description`, `model`, `color`, `memory`)
2. Create the agent memory directory: `.claude/agent-memory/{agent-name}/MEMORY.md` (can be empty initially)
3. Write the agent body with persona, domain knowledge, implementation patterns, and critical conventions
4. Include `<example>` blocks in the `description` field showing when to invoke the agent (user/assistant/commentary format)
5. Update the Agents column in the mapping table in this file
6. No `boost.json` or hook changes needed — agents are auto-discovered from `.claude/agents/`

## Common Pitfalls

- **Rewriting whole files**: Use targeted `Edit` operations, not `Write`, when updating existing skills, docs, or agents
- **Wrong file for content**: Architecture decisions go in `docs/`, coding guidance goes in skills, deep domain knowledge goes in agents, project config goes in `CLAUDE.md`
- **Forgetting hook updates**: When adding a new skill or doc, also update the path mappings in `doc-sync-hint.sh` and the table above
- **Feedback loops**: The hook script skips files in `.claude/skills/`, `.claude/agents/`, `docs/`, and `CLAUDE.md` to prevent infinite hint loops — don't remove those guards
- **Forgetting agent memory directories**: When creating a new agent, always create `.claude/agent-memory/{agent-name}/MEMORY.md` — the agent won't persist learnings without it
- **Mismatched agent description vs domain**: The `description` field determines when the agent is invoked; if it doesn't mention a code area, the agent won't be selected for that work
- **Stale agent examples**: When domain patterns change significantly, update the `<example>` blocks in the agent's `description` — outdated examples lead to incorrect invocation
