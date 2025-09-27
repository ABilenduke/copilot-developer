---
description: 'pnpm workspace practices for fast, deterministic JavaScript tooling.'
applyTo: '**/*'
---

# pnpm Delivery Checklist

Use this checklist when setting up or maintaining projects that rely on pnpm for dependency management and monorepo workflows.

## 1. Workspace Setup & Tooling

_Docs: [pnpm Installation](https://pnpm.io/installation), [Workspace Fundamentals](https://pnpm.io/workspaces)_

* [ ] Pin pnpm via `.npmrc` or `corepack` and document the expected version in onboarding guides and CI images.
* [ ] Configure `pnpm-workspace.yaml` with explicit package globs; avoid over-broad patterns that include build artifacts or tooling cache directories.
* [ ] Check in `.npmrc` settings (e.g., `shared-workspace-lockfile=true`) so developers and CI share the same defaults.

## 2. Package Management & Lockfiles

_Docs: [package.json Reference](https://pnpm.io/package_json), [pnpm-lock.yaml](https://pnpm.io/lockfile)_

* [ ] Treat `pnpm-lock.yaml` as the source of truth—never hand-edit it; regenerate via `pnpm install`.
* [ ] Enable `prefer-frozen-lockfile` in CI to detect drift early and block inconsistent dependency trees.
* [ ] Use `pnpm install --prod` or `--filter` flags in deployment pipelines to avoid shipping dev-only dependencies.

## 3. Dependency Resolution & Overrides

_Docs: [Overrides & Package Aliases](https://pnpm.io/package_json#pnpm-overrides), [npmrc Options](https://pnpm.io/npmrc)_

* [ ] Capture dependency overrides in `package.json` rather than ad-hoc resolutions to keep intent reviewable.
* [ ] Prefer `node-linker=isolated` unless your runtime mandates `hoisted`; document justification for alternative linkers.
* [ ] Audit `pnpm list --depth 0` regularly to spot duplicate major versions or hidden npm transitive installs.

## 4. Scripts & Task Runners

_Docs: [pnpm run](https://pnpm.io/cli/run), [Recursive Commands](https://pnpm.io/cli/filtering)_

* [ ] Define scripts in package manifests and invoke them via `pnpm run`; avoid direct `node` invocations in CI to keep hooks consistent.
* [ ] Use `pnpm recursive run` (or `pnpm -r`) with `--filter` selectors to target affected packages instead of bespoke shell loops.
* [ ] Capture script environment requirements (env vars, required services) in README or task comments to smooth onboarding.

## 5. Monorepo Modules & Sharing

_Docs: [Workspaces Guide](https://pnpm.io/workspaces), [Workspace Protocol](https://pnpm.io/workspace_protocol)_

* [ ] Reference internal packages with the `workspace:*` protocol to prevent accidental publication of placeholder versions.
* [ ] Keep shared tooling (lint configs, types) in dedicated packages and version them like application code.
* [ ] Use `pnpm install --filter` to bootstrap only the packages you need in constrained environments (e.g., Codespaces, CI matrix jobs).

## 6. Performance & Caching

_Docs: [Store Configuration](https://pnpm.io/npmrc#store-dir), [pnpm store](https://pnpm.io/cli/store)_

* [ ] Co-locate the pnpm store on fast storage (SSD, ephemeral disk) and persist it in CI cache keys for consistent build times.
* [ ] Run `pnpm store prune` in scheduled jobs to cap disk usage and remove orphaned tarballs.
* [ ] Leverage `pnpm fetch` to prepopulate the store during CI/remote dev startup.

## 7. Continuous Integration

_Docs: [CI Recipes](https://pnpm.io/continuous-integration), [filtering CLI](https://pnpm.io/filtering)_

* [ ] Install dependencies with `pnpm install --frozen-lockfile` (or `--filter`) to ensure deterministic pipelines.
* [ ] Cache the pnpm store and the `node_modules/.pnpm` directory between jobs; invalidate caches on lockfile or `pnpmfile.cjs` changes.
* [ ] Emit dependency and workspace graphs via `pnpm list --json` for debugging when builds fail.

## 8. Environment & Publishing

_Docs: [Environment Variables](https://pnpm.io/environment-variables), [pnpm publish](https://pnpm.io/cli/publish)_

* [ ] Load environment variables via `.env` files or CI secrets before running scripts that rely on them; pnpm doesn’t inject npm defaults automatically.
* [ ] Use `pnpm publish --filter` with `access` and `tag` flags to ship the right subset of packages and avoid accidental public releases.
* [ ] Configure `publishConfig` and `packageManager` fields so downstream consumers know which registry and toolchain to use.

## 9. Troubleshooting & Maintenance

_Docs: [FAQ](https://pnpm.io/faq), [pnpm doctor](https://pnpm.io/cli/doctor)_

* [ ] Run `pnpm doctor` when encountering linker issues; include its output in incident tickets.
* [ ] Document known incompatibilities (e.g., native add-ons requiring rebuilds) and the scripts used to remediate them.
* [ ] Reset the store with `pnpm store prune` or `pnpm store path` + deletion during postmortems to rule out cache corruption.

## 10. Documentation Lookup & Research

_Docs: [pnpm Documentation](https://pnpm.io/), [Release Notes](https://github.com/pnpm/pnpm/releases)_

* [ ] Monitor pnpm release notes for breaking changes to CLI flags, lockfile format, or Node.js support.
* [ ] Track ecosystem guidance (Turborepo, Nx, GitHub Actions) for updated pnpm integrations and bake learnings into runbooks.
* [ ] Share internal recipes for caching, filtering, and sandboxing so new services don’t rediscover the same patterns.
