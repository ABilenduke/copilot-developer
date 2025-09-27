---
description: 'Turborepo conventions for scalable, cache-efficient monorepos.'
applyTo: '**/*'
---

# Turborepo Delivery Checklist

Use this checklist to keep monorepos fast, predictable, and easy to maintain with Turborepo.

## 1. Workspace Setup & Structure

_Docs: [Getting Started](https://turbo.build/repo/docs/getting-started/overview), [Monorepo Layout](https://turbo.build/repo/docs/getting-started/existing-monorepo)_

* [ ] Organize apps and packages under clearly named directories (`apps/`, `packages/`) with a shared workspace manifest (`package.json` or `pnpm-workspace.yaml`).
* [ ] Keep cross-cutting utilities in shared packages; avoid deep relative imports across apps—use workspace aliases instead.
* [ ] Document ownership for each app/package and surface contacts in `CODEOWNERS` or README badges.
* [ ] Enforce consistent package manager (npm, pnpm, yarn) via `.npmrc`/`.yarnrc` and lockfiles checked into source control.

## 2. Pipelines & Scheduling

_Docs: [Pipeline Configuration](https://turbo.build/repo/docs/reference/configuration#pipeline), [Task Interference](https://turbo.build/repo/docs/core-concepts/pipelines)

* [ ] Define tasks in `turbo.json` with explicit dependencies (`dependsOn`) to express true DAG order (e.g., `^build` before `build`).
* [ ] Scope `outputs` for each task to the exact build artifacts/folders to maximize cache hits and avoid stale files.
* [ ] Use `inputs` globs to capture config files that should bust caches (linters, tsconfig, env schema).
* [ ] Mark tasks that can run concurrently with `cache: true` and `persistent: false`; reserve persistent workers for dev-only processes.
* [ ] Provide lightweight task variants (e.g., `lint` vs `lint:fix`) and map them via `pipeline` to prevent redundant runs.

## 3. Task Authoring & Scripts

_Docs: [Task Runtime](https://turbo.build/repo/docs/reference/tasks), [Using Package Scripts](https://turbo.build/repo/docs/guides/integrate-package-manager-scripts)

* [ ] Align package scripts (`package.json`) with Turborepo tasks—every pipeline entry should map to a script or binary checked into the repo.
* [ ] Keep task names consistent across packages (`build`, `test`, `lint`) to unlock `turbo run test --filter` ergonomics.
* [ ] Fail fast: ensure scripts exit with non-zero status on any warning/error; avoid suppressing failures inside package scripts.
* [ ] Document required environment variables or secrets for tasks directly in the script description or README.
* [ ] Provide local developer commands (`turbo run dev --filter=app`) within onboarding docs.

## 4. Caching & Remote Storage

_Docs: [Caching Fundamentals](https://turbo.build/repo/docs/core-concepts/caching), [Remote Caching](https://turbo.build/repo/docs/reference/remote-cache)_

* [ ] Enable Turborepo cache (`cache: true`) for deterministic tasks and verify `node_modules`, `.turbo`, and build outputs are excluded from source control.
* [ ] Configure remote cache (Vercel, S3, Redis) with appropriate auth to share build artifacts across CI and developer machines.
* [ ] Monitor cache hit rates; investigate low percentages to adjust `inputs`, `outputs`, or dependency graphs.
* [ ] Purge caches on breaking configuration changes (compiler version jumps, mass file relocations) and communicate to the team.
* [ ] Store cache credentials securely (env vars, secret managers) rather than committing tokens.

## 5. Dependency & Version Management

_Docs: [Workspaces & Dependencies](https://turbo.build/repo/docs/handbook/dependency-management), [Version Strategies](https://turbo.build/repo/docs/handbook/publishing-packages)

* [ ] Use workspace protocol (`workspace:*`) or exact versions for internal packages to prevent duplicate installations.
* [ ] Run `pnpm install`, `yarn install`, or `npm install` from the repo root to respect workspace hoisting rules.
* [ ] Automate dependency updates and detect conflicts via Renovate/Dependabot tuned for monorepos.
* [ ] Publish shared packages using changesets or similar tooling to track version bumps and changelogs.
* [ ] Eliminate circular dependencies between packages; rely on shared util layers or interface contracts instead.

## 6. Environment Variables & Secrets

_Docs: [Environment Variables](https://turbo.build/repo/docs/guides/environment-variables), [Secrets Management](https://turbo.build/repo/docs/handbook/ci#secrets)

* [ ] Store environment schemas (`.env.example`, `env.d.ts`) at the repo root and reference them from app-specific configs.
* [ ] Inject secrets at runtime via `.env.local` or CI secret stores; never commit sensitive values.
* [ ] Ensure tasks that depend on env vars declare them in documentation and fail with clear errors when missing.
* [ ] Keep shared config loaders (Zod, dotenv) in a common package to avoid drift.

## 7. CI/CD Integration

_Docs: [CI Guides](https://turbo.build/repo/docs/handbook/ci), [Remote Cache in CI](https://turbo.build/repo/docs/guides/remote-caching-ci)

* [ ] Run `turbo run` commands in CI with `--cache-dir=.turbo` and remote caching enabled for consistent performance.
* [ ] Use `--filter` or `--affected` flags to limit CI runs to changed apps/packages.
* [ ] Cache dependency installs (node_modules, pnpm store) separately from Turborepo cache to maximize reuse.
* [ ] Surface pipeline results (HTML reports, coverage) as CI artifacts for debugging.
* [ ] Fail pipelines on cache misconfigurations (missing credentials) to avoid silent slowdowns.

## 8. Observability & Maintenance

_Docs: [Turborepo Insights](https://turbo.build/repo/docs/reference/insights), [Performance Tuning](https://turbo.build/repo/docs/guides/performance)

* [ ] Track execution times and cache metrics using Turborepo Insights or custom dashboards.
* [ ] Regularly prune stale packages/apps; archive or delete deprecated projects to reduce pipeline load.
* [ ] Benchmark critical pipelines after major dependency upgrades and adjust concurrency/pipeline rules.
* [ ] Establish disaster recovery steps for remote cache outages (fallback to local cache, disable temporarily).

## 9. Documentation Lookup & Research

_Docs: [Turborepo Documentation](https://turbo.build/repo/docs), [Community Templates](https://turbo.build/repo/docs/reference/examples)_

* [ ] Reference official guides before building custom tooling—many workflows (linting, testing, preview deployments) have turnkey examples.
* [ ] Monitor release notes and community discussions to adopt new features (e.g., pipeline forEach, task outputs) quickly.
* [ ] Maintain an internal runbook covering cache credentials, CI integration steps, and troubleshooting tips.
* [ ] Share learnings from production incidents or performance wins to evolve the monorepo standards.

Adhering to this checklist keeps Turborepo projects fast, reliable, and ready to scale with the organization.
