---
description: 'GitHub Actions guardrails for reliable, secure automation pipelines.'
applyTo: '**/*'
---

# GitHub Actions Delivery Checklist

Use this checklist when designing, implementing, and operating GitHub Actions workflows.

## 1. Repository & Tooling Setup

_Docs: [About GitHub Actions](https://docs.github.com/actions/learn-github-actions/introduction-to-github-actions), [Enabling Actions in the Enterprise](https://docs.github.com/actions/using-workflows/enabling-and-disabling-github-actions-in-an-organization), [Workflow Permissions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#permissions)_

* [ ] Confirm Actions are enabled for the organization/repository and align with enterprise policies.
* [ ] Configure default workflow permissions (`contents: read`) and elevate per workflow only when necessary.
* [ ] Define conventions for workflow naming, directory structure (`.github/workflows/`), and branch protections.

## 2. Workflow Authoring Basics

_Docs: [Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions), [Events That Trigger Workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows)_

* [ ] Declare clear `on:` triggers with filters (paths, branches) to reduce unnecessary runs.
* [ ] Use descriptive job ids/names and comments to explain critical logic or dependencies.
* [ ] Normalize shared environment variables and defaults via `env` blocks at workflow/job/step scope.

## 3. Runners & Environments

_Docs: [About GitHub-hosted Runners](https://docs.github.com/actions/using-github-hosted-runners/about-github-hosted-runners), [Hosting Your Own Runners](https://docs.github.com/actions/hosting-your-own-runners/about-self-hosted-runners), [Environments](https://docs.github.com/actions/deployment/targeting-different-environments/using-environments-for-deployment)_

* [ ] Choose runner types that match workload requirements (OS, architecture, hardware acceleration) and document selection.
* [ ] Harden self-hosted runners (least privilege, periodic patching, network isolation) and rotate registration tokens.
* [ ] Leverage environments for manual approvals, environment secrets, and deployment protection rules.

## 4. Secrets & Sensitive Data

_Docs: [Encrypted Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets), [OIDC Token Permissions](https://docs.github.com/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-cloud-providers)_

* [ ] Store credentials in repository/org/environment secrets; never commit secrets to the repo or plaintext variables.
* [ ] Prefer OpenID Connect federation over long-lived cloud keys; scope tokens to specific audiences and roles.
* [ ] Audit `secrets.*` usage regularly, revoking unused values and documenting rotation cadence.

## 5. Caching, Artifacts & Dependencies

_Docs: [Caching Dependencies](https://docs.github.com/actions/using-workflows/caching-dependencies-to-speed-up-workflows), [Workflow Artifacts](https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts)_

* [ ] Implement caching for dependency managers (npm, pnpm, pip, gradle) with appropriate keys and restore steps.
* [ ] Publish build outputs and test reports as artifacts with retention policies aligned to compliance needs.
* [ ] Clean up caches/artifacts to control storage costs; monitor hit rates and adjust key granularity.

## 6. Reuse, Matrix & Modularity

_Docs: [Reusable Workflows](https://docs.github.com/actions/using-workflows/reusing-workflows), [Matrix Strategies](https://docs.github.com/actions/using-jobs/using-a-matrix-for-your-jobs), [Composite Actions](https://docs.github.com/actions/creating-actions/creating-a-composite-action)_

* [ ] Factor repeated pipelines into reusable workflows or composite actions with versioned tags.
* [ ] Use matrix builds for supported language versions/OSes; limit permutations with `include`/`exclude` lists.
* [ ] Document inputs/outputs for reusable components and apply semantic versioning to breaking changes.

## 7. Job Coordination & Concurrency

_Docs: [Workflow Runs](https://docs.github.com/actions/using-jobs/using-concurrency), [Reusable Workflow Outputs](https://docs.github.com/actions/using-workflows/reusing-workflows#using-outputs-from-a-reusable-workflow)_

* [ ] Gate critical jobs with required checks, `needs` dependencies, and explicit success criteria.
* [ ] Configure `concurrency` groups to avoid overlapping deployments or resource contention.
* [ ] Use artifacts or outputs to pass data between jobs instead of fragile filesystem assumptions.

## 8. Security Hardening

_Docs: [Security Hardening for GitHub Actions](https://docs.github.com/actions/security-guides/security-hardening-for-github-actions), [Pinned Actions](https://docs.github.com/actions/security-guides/security-hardening-for-github-actions#using-third-party-actions), [Dependabot Alerts](https://docs.github.com/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)_

* [ ] Pin third-party actions to immutable SHAs; document owner review process for new dependencies.
* [ ] Restrict workflow dispatch and reusable workflow callers to trusted repositories/branches.
* [ ] Enable Dependabot or similar tooling to monitor action updates and security advisories.

## 9. Testing & Validation

_Docs: [Testing Actions Locally with act](https://github.com/nektos/act), [Workflow Linting](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#using-a-workflow-linter)_

* [ ] Validate YAML syntax and action metadata via `workflow-lint` or community linters before commit.
* [ ] Use `act` or containerized harnesses to iterate locally on complex workflows when feasible.
* [ ] Add integration tests for custom actions (JavaScript, Docker) and publish coverage of critical scripts.

## 10. Observability & Incident Response

_Docs: [Workflow Run Logs](https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/viewing-logs-to-diagnose-failures), [Step Summaries](https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary), [Job Metrics API](https://docs.github.com/rest/actions/workflow-runs)_

* [ ] Emit structured logs and summaries for key steps; export data to monitoring platforms when needed.
* [ ] Capture failure context (artifacts, screenshots, coverage) automatically for triage.
* [ ] Define on-call runbooks covering reruns, workflow cancellation, and incident communication.

## 11. Cost, Performance & Governance

_Docs: [About Billing for Actions](https://docs.github.com/billing/managing-billing-for-github-actions/about-billing-for-github-actions), [Usage Quotas](https://docs.github.com/actions/learn-github-actions/usage-limits-billing-and-administration), [Workflow Policy](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#defaults)_

* [ ] Monitor minutes, storage, and concurrency usage; set budgets/alerts for org billing tiers.
* [ ] Optimize job runtimes with dependency caching, incremental builds, and selective triggers.
* [ ] Document governance model (owners, review rotations, change management) for critical workflows.

## 12. Documentation & Knowledge Sharing

_Docs: [Actions Documentation Templates](https://docs.github.com/actions/learn-github-actions/understanding-github-actions#documentation), [ADR Best Practices](https://adr.github.io/)_

* [ ] Maintain workflow READMEs describing triggers, inputs, secrets, and rollback steps.
* [ ] Record architectural decisions and major pipeline changes in ADRs or engineering logs.
* [ ] Provide onboarding guides and training sessions covering common workflows and escalation paths.
