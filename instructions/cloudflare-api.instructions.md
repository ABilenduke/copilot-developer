---
description: 'Cloudflare API guardrails for secure automation.'
applyTo: '**/*'
---

# Cloudflare API Delivery Checklist

Use this checklist when designing, integrating, and operating solutions that depend on the Cloudflare REST and GraphQL APIs.

## 1. Accounts & Tooling Setup

_Docs: [Cloudflare API Overview](https://developers.cloudflare.com/api/), [API Quickstart](https://developers.cloudflare.com/fundamentals/api/get-started/)_

* [ ] Confirm the owning account, zone, and organization IDs for each environment; document who can grant access or approve changes.
* [ ] Install and pin required tooling (HTTP clients, Terraform provider, OpenAPI generators) with version matrices in onboarding docs.
* [ ] Capture prerequisite network allowlists and proxy settings so automation can reach `api.cloudflare.com` and GraphQL endpoints reliably.

## 2. Authentication & Secrets Management

_Docs: [API Tokens & Keys](https://developers.cloudflare.com/fundamentals/api/get-started/keys/), [Service Auth Best Practices](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)_

* [ ] Prefer scoped API tokens with least-privilege permissions; avoid using global API keys outside emergency workflows.
* [ ] Store credentials in approved secret managers (Vault, AWS Secrets Manager) and inject them at runtime; never commit tokens to source control.
* [ ] Rotate tokens on a defined cadence and track ownership, expiry, and revocation procedures in security runbooks.

## 3. API Versioning & Schema Governance

_Docs: [REST API Reference](https://developers.cloudflare.com/fundamentals/api/reference/), [GraphQL Schema Explorer](https://developers.cloudflare.com/analytics/graphql-api/)_

* [ ] Pin explicit API versions or GraphQL schema dates in clients to prevent breaking changes from silent upgrades.
* [ ] Serialize request/response contracts via OpenAPI or codegen models and review diffs in pull requests before rolling out.
* [ ] Track Cloudflare changelogs and deprecation notices; schedule compatibility assessments ahead of announced sunsets.

## 4. Request Patterns, Pagination & Data Hygiene

_Docs: [Pagination](https://developers.cloudflare.com/fundamentals/api/reference/pagination/), [Filtering & Sorting](https://developers.cloudflare.com/fundamentals/api/reference/filters/)_

* [ ] Implement cursor-based pagination and retry-safe loops for list endpoints; guard against unbounded page sizes.
* [ ] Validate request payloads and sanitize user input to match Cloudflare field constraints (IDs, enum values, ISO timestamps).
* [ ] Normalize identifiers (zone IDs, account IDs, resource names) into shared utility modules to prevent cross-environment mix-ups.

## 5. Rate Limits, Performance & Idempotency

_Docs: [Rate Limiting Guidance](https://developers.cloudflare.com/fundamentals/api/reference/rate-limits/), [Idempotency Keys](https://developers.cloudflare.com/fundamentals/api/reference/error-codes/#idempotency-errors)_

* [ ] Monitor rate-limit headers (`X-RateLimit-*`) and implement adaptive backoff with jitter; surface metrics to observability dashboards.
* [ ] Use idempotency keys or deterministic request bodies for write operations to avoid duplicate resource creation on retries.
* [ ] Batch modifications where APIs support bulk endpoints to minimize quota consumption and latency.

## 6. Infrastructure as Code & Automation Pipelines

_Docs: [Cloudflare Terraform Provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest), [API Quickstart](https://developers.cloudflare.com/fundamentals/api/get-started/)_

* [ ] Manage API-controlled Cloudflare resources (zones, firewall rules, load balancers) via Terraform or declarative templates checked into source control.
* [ ] Validate IaC plans in CI before applying; require peer review for production changes touching DNS, security, or traffic routing.
* [ ] Capture drift detection and rollback procedures for automation failures, including reverting Terraform state or restoring saved API configurations.

## 7. Security, Zero Trust & Access Policies

_Docs: [Zero Trust Policies](https://developers.cloudflare.com/cloudflare-one/policies/zero-trust/), [API Shield](https://developers.cloudflare.com/api-shield/)_

* [ ] Enforce IP allowlists, Mutual TLS, or API Shield where applicable to protect origin APIs from unauthorized calls.
* [ ] Align Cloudflare Access policies with internal RBAC, ensuring only approved services can invoke sensitive endpoints.
* [ ] Enable logging for policy decisions and export alerts to the central SIEM for anomaly detection.

## 8. Observability, Logging & Data Governance

_Docs: [Logpush & Analytics](https://developers.cloudflare.com/logs/), [Audit Logs](https://developers.cloudflare.com/fundamentals/account-and-billing/account-security/audit-logs/)_

* [ ] Enable Audit Logs for configuration changes and stream them to long-term storage with retention that meets compliance requirements.
* [ ] Use GraphQL analytics or Logpush datasets to monitor API usage volume, errors, and latency across accounts.
* [ ] Classify data returned by Cloudflare APIs (DNS records, traffic metadata) and apply masking or minimization where required by policy.

## 9. Error Handling & Resiliency

_Docs: [Error Codes & Messages](https://developers.cloudflare.com/fundamentals/api/reference/error-codes/), [Troubleshooting Guide](https://developers.cloudflare.com/fundamentals/api/troubleshooting/)_

* [ ] Map Cloudflare error codes to actionable retry vs. fail-fast strategies, and expose enriched context in logs for investigation.
* [ ] Implement circuit breakers or fallback behavior when Cloudflare APIs degrade, coordinating with incident response runbooks.
* [ ] Capture request/response pairs (with sensitive fields redacted) for failed operations to accelerate support escalations.

## 10. Testing, Sandboxes & Release Verification

_Docs: [Staging & Testing Guidance](https://developers.cloudflare.com/fundamentals/setup/account-setup/staging-environment/), [GraphQL Explorer Getting Started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/)_

* [ ] Maintain non-production Cloudflare accounts or zones for integration tests; mirror critical products (Workers, KV, Firewall) before production rollouts.
* [ ] Seed fixtures and teardown scripts via API to keep staging environments deterministic.
* [ ] Automate contract, smoke, and regression tests against Cloudflare APIs in CI and before change windows.

## 11. Deployment, Change Control & Incident Response

_Docs: [Change Management](https://developers.cloudflare.com/fundamentals/setup/change-management/), [Incident Response](https://developers.cloudflare.com/fundamentals/account-and-billing/support/incident-management/)_

* [ ] Schedule production changes within approved maintenance windows and notify stakeholders of potential impact (DNS propagation, security policies).
* [ ] Document steps to roll back API-driven changes (e.g., restoring DNS records, disabling policies) and practice tabletop exercises quarterly.
* [ ] Establish escalation paths with Cloudflare Support for Priority/Paid plans and store account IDs, support PINs, and incident timelines centrally.

## 12. Documentation, Training & Continuous Improvement

_Docs: [Cloudflare Changelog](https://developers.cloudflare.com/fundamentals/reference/changelog/), [Developer Learning Center](https://developers.cloudflare.com/learning-paths/)_

* [ ] Keep internal runbooks, sequence diagrams, and ownership charts current for every Cloudflare-integrated service.
* [ ] Train engineers on Cloudflare API updates, Terraform modules, and security expectations at least twice per year.
* [ ] Review API usage metrics, support tickets, and post-incident notes quarterly to refine playbooks and backlog remediation work.
