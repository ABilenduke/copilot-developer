---
description: 'Docker Compose guardrails for dependable multi-service environments.'
applyTo: '**/*'
---

# Docker Compose Delivery Checklist

Use this checklist when modeling, developing, and operating applications with Docker Compose.

## 1. Tooling & CLI Setup

_Docs: [Install Compose](https://docs.docker.com/compose/install/), [Compose CLI Reference](https://docs.docker.com/engine/reference/commandline/compose/), [Compatibility Matrix](https://docs.docker.com/compose/compose-file/compose-versioning/)_

* [ ] Standardize on Docker Compose V2 (`docker compose`) and document minimum Docker Engine requirements across environments.
* [ ] Pin CLI versions in CI/dev images; capture upgrade cadence and breaking changes in release notes.
* [ ] Provide onboarding scripts or devcontainer settings so contributors share the same Docker context and credentials.

## 2. Project Structure & Files

_Docs: [Compose File Reference](https://docs.docker.com/compose/compose-file/), [Multiple Compose Files](https://docs.docker.com/compose/multiple-compose-files/)_

* [ ] Store canonical definitions in `compose.yaml`; use environment-specific overrides (`compose.prod.yaml`, `compose.test.yaml`).
* [ ] Document directory layout (services, .env files, config/secret directories) in README or ADRs.
* [ ] Keep service-specific assets (Dockerfiles, configs) colocated to simplify builds and reviews.

## 3. Services, Images & Builds

_Docs: [Services Configuration](https://docs.docker.com/compose/compose-file/services/), [Build Section](https://docs.docker.com/compose/compose-file/build/)_

* [ ] Prefer immutable image tags (digests or versioned tags) for `image`; use `build` context only when source lives in repo.
* [ ] Share multi-stage Dockerfiles, caching rules, and build args across services to avoid duplication.
* [ ] Leverage `x-` extensions for reusable fragments (logging, healthchecks) and reference them via anchors.

## 4. Environment Variables & Configuration

_Docs: [Environment & Env Files](https://docs.docker.com/compose/compose-file/compose-file-v3/#env_file), [Config Reference](https://docs.docker.com/compose/compose-file/config/)_

* [ ] Store non-secret env defaults in checked-in `.env.example`; inject secrets via external managers or CI variables.
* [ ] Surface required env vars in documentation and fail fast with entrypoint validation when values are missing.
* [ ] Use `configs` for large immutable files (JSON schemas, feature flags) instead of embedding them in images.

## 5. Networking & Service Discovery

_Docs: [Networks](https://docs.docker.com/compose/compose-file/compose-file-v3/#networks), [DNS & Service Discovery](https://docs.docker.com/compose/networking/)_

* [ ] Define user-scope networks with explicit names; avoid implicit default network in production stacks.
* [ ] Reference services via Compose DNS (`service-name`, `service-name:port`) rather than hard-coding IPs.
* [ ] Expose only externally required ports; document ingress controllers or reverse proxies that front the stack.

## 6. Volumes, Bind Mounts & State

_Docs: [Volumes](https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes), [Bind Mounts](https://docs.docker.com/storage/bind-mounts/)_

* [ ] Use named volumes for persistent data and declare ownership (UID/GID) expectations.
* [ ] Limit bind mounts to development scenarios; when required, restrict permissions (`:ro`, `delegated`).
* [ ] Document backup/restore steps for critical volumes and automate snapshots where feasible.

## 7. Secrets & Sensitive Material

_Docs: [Secrets](https://docs.docker.com/compose/compose-file/compose-file-v3/#secrets), [Docker Secrets Management](https://docs.docker.com/engine/swarm/secrets/)_

* [ ] Store secrets outside of source control; reference them via `secrets:` backed by external providers or runtime mounts.
* [ ] Rotate credentials regularly and ensure Compose deployments reload refreshed secrets without rebuilds.
* [ ] Audit Compose files for accidental plaintext credentials or insecure defaults before merging.

## 8. Profiles, Scaling & Deployment Modes

_Docs: [Profiles](https://docs.docker.com/compose/profiles/), [Deploy Section](https://docs.docker.com/compose/compose-file/deploy/)_

* [ ] Organize optional services (observability, seed data) under profiles and document activation commands.
* [ ] Define `deploy.resources` and replication counts when targeting Swarm or compatible orchestrators.
* [ ] Capture scaling limits and inter-service dependencies in ADRs to guide production rollouts.

## 9. Development & Test Workflows

_Docs: [docker compose up](https://docs.docker.com/engine/reference/commandline/compose_up/), [Watch Support](https://docs.docker.com/compose/file-watch/), [Healthcheck](https://docs.docker.com/compose/compose-file/compose-file-v3/#healthcheck)_

* [ ] Provide standard commands for dev (`docker compose up --build`, `--watch`) and scripted teardown/reset flows.
* [ ] Ensure services expose healthchecks so dependent containers wait for readiness.
* [ ] Use `docker compose exec` or `run` for integration tests; seed test data via dedicated profiles or scripts.

## 10. CI/CD Integration

_Docs: [Compose in CI Pipelines](https://docs.docker.com/compose/ci-cd/), [V2 CLI Environment Variables](https://docs.docker.com/compose/reference/envvars/)_

* [ ] Run Compose stacks in CI for integration tests, injecting env vars and secrets via pipeline credentials.
* [ ] Cache image layers between builds or use pre-built registries to accelerate pipeline execution.
* [ ] Tear down environments deterministically (`docker compose down -v`) and surface logs/artifacts on failure.

## 11. Observability & Debugging

_Docs: [docker compose logs](https://docs.docker.com/engine/reference/commandline/compose_logs/), [Events & Ps](https://docs.docker.com/engine/reference/commandline/compose_ps/)_

* [ ] Aggregate service logs via `docker compose logs --timestamps` and forward to centralized sinks when needed.
* [ ] Monitor container state with `docker compose ps` and `docker events`; capture snapshots during incidents.
* [ ] Provide debugging runbooks covering shell access (`docker compose exec`), metric scraping, and packet inspection.

## 12. Documentation & Governance

_Docs: [Compose Documentation Hub](https://docs.docker.com/compose/), [Architecture Decision Records](https://adr.github.io/)_

* [ ] Maintain architectural diagrams and Compose topology notes alongside the stack.
* [ ] Record decisions about service boundaries, scaling policies, and secret stores in ADRs.
* [ ] Schedule periodic reviews to retire unused services, update base images, and align with platform standards.
