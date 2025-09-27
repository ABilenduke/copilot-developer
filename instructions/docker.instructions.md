---
description: 'Docker delivery standards for secure, reproducible container workloads.'
applyTo: '**/*'
---

# Docker Delivery Checklist

Use this checklist when building, shipping, and operating Docker container images and runtimes.

## 1. Toolchain & Environment Setup

_Docs: [Install Docker](https://docs.docker.com/get-docker/), [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/), [Buildx Overview](https://docs.docker.com/build/buildkit/)_

* [ ] Pin Docker Engine/CLI and Buildx versions across dev, CI, and prod; document minimum kernel and cgroup requirements.
* [ ] Enable BuildKit by default for faster, cache-aware builds; capture environment variables (`DOCKER_BUILDKIT`, `BUILDKIT_PROGRESS`).
* [ ] Provide onboarding scripts or devcontainer definitions so contributors share the same daemon configuration.

## 2. Dockerfile Design & Base Images

_Docs: [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/), [Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)_

* [ ] Start from minimal, maintained base images (distroless, alpine, distro LTS) and pin digests where possible.
* [ ] Use multi-stage builds to separate build dependencies from runtime artifacts; copy only required binaries/config.
* [ ] Avoid `latest` tags and implicit COPY contexts; explicitly list files and leverage `.dockerignore` to shrink build context.

## 3. Image Security & Compliance

_Docs: [Docker Scout](https://docs.docker.com/scout/), [Image Signing & Verification](https://docs.docker.com/engine/security/trust/), [Rootless Mode](https://docs.docker.com/engine/security/rootless/)_

* [ ] Scan images for CVEs before promotion; gate releases on critical vulnerability thresholds.
* [ ] Sign images (Notary v2/Cosign) and enforce verification in runtime clusters or registries.
* [ ] Run containers as non-root by default; drop Linux capabilities and configure seccomp/apparmor profiles.

## 4. Build Workflows & Caching

_Docs: [docker buildx build](https://docs.docker.com/engine/reference/commandline/buildx_build/), [Cache Management](https://docs.docker.com/build/cache/), [ARG & ENV Guidance](https://docs.docker.com/engine/reference/builder/#overriding-dockerfile-image-defaults)_

* [ ] Structure layers to maximize reuse (install dependencies before copying app code) and clean package caches in the same layer.
* [ ] Parameterize builds with `ARG` for non-secret configuration; keep secrets out of build context and use BuildKit secrets.
* [ ] Publish multi-architecture images via buildx bake or pipelines that fan out across target platforms.

## 5. Runtime Configuration & Resource Limits

_Docs: [docker run Reference](https://docs.docker.com/engine/reference/run/), [Resource Constraints](https://docs.docker.com/config/containers/resource_constraints/), [Secrets Management](https://docs.docker.com/engine/swarm/secrets/)_

* [ ] Configure CPU/memory quotas (`--cpus`, `--memory`) and pids limits to prevent noisy-neighbor issues.
* [ ] Mount secrets using runtime secret stores or tmpfs; never bake credentials into images or env files committed to VCS.
* [ ] Define healthchecks and restart policies to integrate with orchestrator readiness probes.

## 6. Networking & Service Discovery

_Docs: [Networking Overview](https://docs.docker.com/network/), [User-Defined Networks](https://docs.docker.com/network/bridge/), [DNS Service Discovery](https://docs.docker.com/network/network-tutorial-standalone/#use-user-defined-bridge-networks)_

* [ ] Prefer user-defined bridge or overlay networks for container-to-container communication; avoid default bridge in production.
* [ ] Expose only required ports; document ingress rules and TLS termination strategy.
* [ ] Use internal DNS/service names instead of hard-coded IPs; align labels with higher-level service discovery (Kubernetes, Compose).

## 7. Storage, Volumes & Data Management

_Docs: [Volumes](https://docs.docker.com/storage/volumes/), [Bind Mounts](https://docs.docker.com/storage/bind-mounts/), [Tmpfs Mounts](https://docs.docker.com/storage/tmpfs/)_

* [ ] Separate persistent data into named volumes or external storage; keep containers stateless when feasible.
* [ ] Define backup/restore procedures for volumes and document ownership (permissions, UID/GID expectations).
* [ ] Avoid bind-mounting host root paths in production; restrict mounts with `:ro`, `noexec`, and user namespace remapping.

## 8. Registry Strategy & Image Promotion

_Docs: [Docker Registry](https://docs.docker.com/registry/), [Tagging Best Practices](https://docs.docker.com/engine/reference/commandline/tag/), [Content Trust](https://docs.docker.com/engine/security/trust/)_

* [ ] Use a private registry or artifact repository with role-based access control and immutable tags.
* [ ] Implement semantic or release-channel tagging (`1.2.3`, `1.2`, `latest`) with automated promotion pipelines.
* [ ] Enforce retention policies and garbage collection to manage registry storage footprint.

## 9. CI/CD Integration & Testing

_Docs: [Docker in CI/CD](https://docs.docker.com/ci-cd/), [Test Containers](https://testcontainers.com/), [Docker Build in GitHub Actions](https://docs.docker.com/build/ci/github-actions/)_

* [ ] Run image builds in CI using cached layers and provenance tracking; publish SBOMs alongside artifacts.
* [ ] Execute smoke and integration tests against freshly built images (Testcontainers, `docker compose up` test environments).
* [ ] Fail pipelines on lint (Hadolint), scan, or test regressions before pushing tags to shared registries.

## 10. Observability & Logging

_Docs: [Logging Drivers](https://docs.docker.com/config/containers/logging/configure/), [Metrics & Events](https://docs.docker.com/config/daemon/prometheus/), [Docker Events](https://docs.docker.com/engine/reference/commandline/events/)_

* [ ] Configure logging drivers or sidecars to forward stdout/stderr to centralized aggregators with structured fields.
* [ ] Expose container metrics via cAdvisor, Prometheus, or Docker daemon metrics endpoint for capacity planning.
* [ ] Monitor image digest drift, restart counts, and health status; alert on anomalous patterns.

## 11. Troubleshooting & Maintenance

_Docs: [Troubleshoot the daemon](https://docs.docker.com/config/daemon/troubleshoot/), [Prune System Resources](https://docs.docker.com/config/pruning/), [Checkpoint & Restore](https://docs.docker.com/engine/swarm/checkpoint/)_

* [ ] Keep cleanup routines (`docker system prune`, builder prune) scheduled to control disk usage in shared runners.
* [ ] Capture diagnostic bundles (`docker info`, `docker inspect`, `docker logs`) for incident triage; avoid tampering with running containers.
* [ ] Track daemon upgrades, deprecated flags, and security advisories; test upgrades in staging before production rollout.

## 12. Documentation & Governance

_Docs: [Docker Docs Hub](https://docs.docker.com/), [Architecture Decision Records](https://adr.github.io/), [Container Security Checklist](https://docs.docker.com/engine/security/)_

* [ ] Maintain ADRs detailing base image selection, build pipelines, and promotion flows.
* [ ] Provide runbooks covering image rebuilds, registry credential rotation, and incident escalation paths.
* [ ] Educate teams on container security posture (namespaces, cgroups, least privilege) and revisit policies quarterly.
