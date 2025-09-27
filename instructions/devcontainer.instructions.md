---
description: 'Dev Container guardrails for reproducible local and cloud workspaces.'
applyTo: '**/*'
---

# Dev Container Delivery Checklist

Use this checklist when designing, building, and maintaining Visual Studio Code or Codespaces Dev Container environments.

## 1. Tooling & Prerequisites

_Docs: [VS Code Dev Containers Overview](https://code.visualstudio.com/docs/devcontainers/containers), [Dev Container CLI](https://code.visualstudio.com/docs/devcontainers/devcontainer-cli), [Docker Desktop Requirements](https://docs.docker.com/desktop/install/)_

* [ ] Pin minimum versions for VS Code/Codespaces, Dev Containers extension, Docker Engine, and `devcontainer` CLI; document installation steps.
* [ ] Verify host prerequisites (WSL2 on Windows, virtualization enabled, disk space) and capture them in onboarding docs.
* [ ] Provide quick health-check commands (`devcontainer info`, `docker info`) to confirm local readiness.

## 2. Base Images & Features

_Docs: [Dev Container Images](https://containers.dev/implementors/images), [devcontainer Features Catalog](https://containers.dev/features), [Dockerfile Reference](https://containers.dev/guide/dockerfile)_

* [ ] Start from maintained base images (official `mcr.microsoft.com/devcontainers/*` or hardened internal images) and pin digests/tags.
* [ ] Compose image layers via devcontainer Features instead of bespoke scripts when possible to reduce duplication.
* [ ] Document image provenance and rebuild cadence; automate rebuilds when upstream dependencies receive security fixes.

## 3. Workspace Layout & Mounts

_Docs: [devcontainer.json Reference](https://containers.dev/implementors/json_reference/), [Workspace Mounts](https://code.visualstudio.com/remote/advancedcontainers/volumes)_

* [ ] Keep `devcontainer.json`, Dockerfiles, and supporting scripts near the workspace root for discoverability.
* [ ] Use named volumes or bind mounts intentionally (e.g., package caches, Docker-in-Docker socket) and document permissions.
* [ ] Minimize `mounts` scope to avoid leaking host secrets; prefer `runArgs` or Features for common configuration.

## 4. Editor Extensions & Settings

_Docs: [Extension Recommendations](https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommendations), [Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync)_

* [ ] Define `customizations` in `devcontainer.json` for extensions, settings, and keybindings required by the project.
* [ ] Separate essential extensions from optional ones; include comments describing rationale and owners.
* [ ] Align devcontainer settings with repo lint/format rules (Prettier, ESLint) to ensure consistent authoring experience.

## 5. Environment Variables & Secrets

_Docs: [Environment Variables](https://containers.dev/guide/env-vars), [Codespaces Secrets](https://learn.microsoft.com/azure/developer/github/codespaces/secrets), [VS Code Environment Management](https://code.visualstudio.com/docs/remote/containers#_set-environment-variables)_

* [ ] Store non-sensitive defaults in `devcontainer.json` or checked-in `.env.example`; inject secrets via user/environment-level stores (Codespaces, `devcontainer env` files).
* [ ] Fail fast when required env vars are missing using entrypoint validation scripts.
* [ ] Document secret ownership and rotation schedules; never commit actual secrets to the repo.

## 6. Lifecycle Commands & Automation

_Docs: [Lifecycle Properties](https://containers.dev/guide/commands), [postCreateCommand Guidance](https://code.visualstudio.com/docs/remote/containers#_lifecycle-scripts)_

* [ ] Use `postCreateCommand`, `postStartCommand`, and `updateContentCommand` for deterministic setup (deps install, schema generation).
* [ ] Keep lifecycle scripts idempotent and fast; cache artifacts (node_modules, pip cache) where possible.
* [ ] Capture long-running bootstraps in separate scripts checked into the repo for reviewability and reuse.

## 7. Dependencies & Package Management

_Docs: [Dev Container Best Practices](https://containers.dev/guide/best-practices), [Caching Strategies](https://learn.microsoft.com/visualstudio/devcontainers/containers-best-practices?tabs=devcontainercli#optimize-builds)_

* [ ] Install project dependencies in the container (not on the host) to ensure parity across contributors.
* [ ] Cache package managers (npm, pnpm, pip, go) via volumes or shared directories to speed rebuilds.
* [ ] Align dependency install scripts with CI pipelines to catch mismatches early.

## 8. Performance & Resource Tuning

_Docs: [Performance Tips](https://code.visualstudio.com/docs/remote/containers#_tips-for-improving-performance), [Docker Resource Settings](https://docs.docker.com/desktop/settings/#resources)_

* [ ] Document recommended CPU/RAM/disk allocations for Docker Desktop and Codespaces sizes.
* [ ] Avoid large bind mounts on slow filesystems; prefer cached or delegated mount options when unavoidable.
* [ ] Profile container startup and rebuild times; optimize image size and lifecycle commands accordingly.

## 9. Testing & Validation

_Docs: [devcontainer CLI Commands](https://code.visualstudio.com/docs/devcontainers/devcontainer-cli#_commands), [Continuous Validation](https://learn.microsoft.com/visualstudio/devcontainers/ci-cd/validate-dev-containers)_

* [ ] Validate configurations with `devcontainer up`/`devcontainer build` in CI before merging.
* [ ] Provide smoke-test scripts that verify tooling (linters, compilers, runtimes) inside the container.
* [ ] Capture known issues (platform-specific bugs, flaky extensions) in troubleshooting docs with workarounds.

## 10. Team Onboarding & Documentation

_Docs: [Dev Container Documentation Template](https://containers.dev/guide/docs), [Codespaces Quickstart](https://docs.github.com/codespaces/getting-started/quickstart)_

* [ ] Maintain README sections describing how to open the repo in Dev Containers or Codespaces and expected first-run steps.
* [ ] Provide dotfiles or personalization hooks where allowed; keep them optional to avoid polluting base images.
* [ ] Record ownership for container definitions and escalation paths for environment issues.

## 11. CI/CD & Remote Environment Alignment

_Docs: [GitHub Codespaces for CI](https://docs.github.com/codespaces/developing-in-codespaces/configuring-codespaces-for-your-project), [Dev Container CI Workflows](https://learn.microsoft.com/visualstudio/devcontainers/ci-cd/github-actions)_

* [ ] Reuse devcontainer definitions in automated workflows (GitHub Actions `devcontainers/ci`, Azure DevOps) to keep parity.
* [ ] Sync environment variables, secrets, and feature flags between local devcontainers and hosted environments.
* [ ] Monitor compute costs for hosted dev environments; enforce idle timeouts and cleanup policies.

## 12. Troubleshooting & Maintenance

_Docs: [Remote Containers Troubleshooting](https://code.visualstudio.com/docs/remote/troubleshooting), [Docker Logs & Inspect](https://docs.docker.com/engine/reference/commandline/inspect/)_

* [ ] Document common failure modes (lifecycle script errors, permissions, port conflicts) with step-by-step fixes.
* [ ] Encourage use of `Dev Containers: Rebuild Container` and `Dev Containers: Show Container Log` commands during incidents.
* [ ] Review devcontainer definitions quarterly for deprecated features, base image updates, and extension changes.
