---
description: 'Yarn best practices for maintainable JavaScript workspaces.'
applyTo: '**/*'
---

# Yarn Delivery Checklist

Use this checklist when setting up or maintaining projects that rely on Yarn (Classic or Berry) for dependency management and workspace orchestration.

## 1. Toolchain Selection & Installation

_Docs: [Install Yarn](https://yarnpkg.com/getting-started/install), [Set Yarn Version](https://yarnpkg.com/cli/set/version)_

* [ ] Decide whether the project standardizes on Yarn Classic (v1) or Yarn Berry (v2+) and document the rationale in onboarding guides.
* [ ] Pin the Yarn release (`yarn set version berry` or `.yarn/releases/yarn-*.cjs`) and commit the artifacts so CI/dev environments remain consistent.
* [ ] Configure Corepack (Node ≥16.10) or install Yarn globally on older toolchains; record the minimum Node version required for the chosen Yarn release.

## 2. Workspace Structure & Manifest Hygiene

_Docs: [Workspaces Overview](https://yarnpkg.com/features/workspaces), [package.json Workspaces](https://yarnpkg.com/configuration/manifest)_

* [ ] Define workspace globs in the root `package.json` (Berry) or `package.json` + `yarn workspaces` (Classic) and keep them scoped to source packages only.
* [ ] Provide per-workspace ownership metadata (READMEs, CODEOWNERS) and avoid deep cross-workspace relative imports—prefer package aliases.
* [ ] Run `yarn workspaces focus <name>` or `yarn install --focus` when working on individual packages to keep dependency graphs lean during feature work.

## 3. Dependency Management & Lockfiles

_Docs: [Dependency Types](https://yarnpkg.com/getting-started/usage), [Lockfile Format](https://yarnpkg.com/configuration/yarnrc#lockfileFilename)_

* [ ] Treat `yarn.lock` as immutable; regenerate via `yarn install` rather than editing by hand.
* [ ] Use `yarn up` (Berry) or `yarn upgrade` (Classic) with explicit semver ranges to keep dependency bumps reviewable.
* [ ] Enable `yarn install --immutable` (Berry) or `--frozen-lockfile` (Classic) in CI pipelines to block drift between environments.

## 4. Configuration & Project Settings

_Docs: [yarnrc Reference](https://yarnpkg.com/configuration/yarnrc), [Constraints & Plugins](https://yarnpkg.com/features/constraints)_

* [ ] Check in `.yarnrc.yml`/`.yarnrc` with repository defaults (cache folder, `nodeLinker`, npm registry, plugin list) and document any environment overrides.
* [ ] Use Yarn constraints or the `@yarnpkg/plugin-constraints` plugin to enforce dependency policies across workspaces.
* [ ] Audit custom plugins before adoption; pin plugin versions and store them in `.yarn/plugins` (Berry) so builds remain reproducible.

## 5. Scripts & Task Execution

_Docs: [yarn run](https://yarnpkg.com/cli/run), [Workspace Commands](https://yarnpkg.com/cli/workspaces/foreach)_

* [ ] Define project tasks as package scripts and execute them via `yarn run` or `yarn workspace <pkg> run`; avoid shelling directly to Node binaries in CI.
* [ ] Use `yarn workspaces foreach` (Berry) or `yarn workspaces run` (Classic) with `--since`/`--parallel` flags to scope commands to changed packages.
* [ ] Document prerequisite services and environment variables for each script to reduce onboarding friction.

## 6. Caching & Zero-Install Strategies

_Docs: [Cache Architecture](https://yarnpkg.com/features/caching), [Zero-Installs](https://yarnpkg.com/features/zero-installs)_

* [ ] Enable the global cache (`.yarn/cache` or global cache directory) and persist it in CI for faster restores; bust caches on lockfile or Yarn version changes.
* [ ] Consider Zero-Install (checking in `.yarn/cache`) only when repo policies and storage budgets permit; otherwise document cache warmup commands for developers.
* [ ] Run `yarn cache clean` during postmortems to rule out corruption when debugging install anomalies.

## 7. Plug'n'Play & Node Compatibility

_Docs: [Plug'n'Play Guide](https://yarnpkg.com/features/pnp), [nodeLinker Options](https://yarnpkg.com/configuration/yarnrc#nodeLinker)_

* [ ] Decide on `nodeLinker` (`pnp`, `node-modules`, or `pnpm`) per project; document compatibility constraints for tooling that requires `node_modules`.
* [ ] Commit `.pnp.cjs`/`.pnp.data.json` when using PnP and configure IDE integrations (VS Code SDK, JetBrains) to consume the PnP API.
* [ ] Provide fallbacks (e.g., `YARN_NODE_LINKER=node-modules yarn install`) for developers running tools incompatible with Plug'n'Play.

## 8. Continuous Integration & Quality Gates

_Docs: [Yarn in CI](https://yarnpkg.com/advanced/ci), [Build Scripts](https://yarnpkg.com/features/maintain)_

* [ ] Use `yarn install --immutable --immutable-cache` (Berry) or `yarn install --frozen-lockfile` (Classic) to guarantee reproducible installs in CI.
* [ ] Cache `.yarn/cache` (Berry) or the global cache directory between jobs; couple cache keys with lockfile checksums to avoid stale artifacts.
* [ ] Emit build metadata (`yarn workspaces list --json`, dependency graphs) on failures to accelerate debugging.

## 9. Publishing & Release Management

_Docs: [yarn npm publish](https://yarnpkg.com/cli/npm/publish), [Versioning Workspaces](https://yarnpkg.com/features/release-workflow)_

* [ ] Use `yarn version` or `yarn workspaces foreach version` to apply consistent semver bumps and generate changelog entries.
* [ ] Publish packages via `yarn npm publish --tolerate-republish` with scoped authentication tokens and environment-specific registries.
* [ ] Automate provenance checks (integrity hashes, provenance attestations) post-publish and mirror artifacts in internal registries when required.

## 10. Troubleshooting & Maintenance

_Docs: [Error Codes](https://yarnpkg.com/advanced/error-codes), [Doctor Command](https://yarnpkg.com/cli/doctor)_

* [ ] Run `yarn doctor` (Berry) to surface misconfigurations; track recurring findings in team runbooks.
* [ ] Capture solutions for frequent issues (binary builds, OpenSSL, proxy auth) in a troubleshooting section of the repo README.
* [ ] Reset installs with `yarn install --check-cache` or `yarn cache clean` + fresh install when debugging hard-to-reproduce dependency issues.

## 11. Documentation Lookup & Research

_Docs: [Yarn Documentation](https://yarnpkg.com/), [Release Notes](https://github.com/yarnpkg/berry/releases)_

* [ ] Monitor Yarn release notes for breaking changes to CLI behavior, configuration defaults, or Plug'n'Play semantics.
* [ ] Track ecosystem guidance (Turborepo, Nx, GitHub Actions) for Yarn-specific integrations and bake lessons into internal runbooks.
* [ ] Share internal templates (CI configs, `yarnrc` presets, Zero-Install policies) so new projects start from vetted patterns.
