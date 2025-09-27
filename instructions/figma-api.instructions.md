---
description: 'Figma API integration guardrails for reliable design automation.'
applyTo: '**/*'
---

# Figma API Delivery Checklist

Use this checklist when planning, building, and maintaining solutions that integrate with the Figma REST APIs.

## 1. Authentication & Access Control

_Docs: [REST API Overview](https://www.figma.com/developers/api), [Personal Access Tokens](https://www.figma.com/developers/api#access-tokens), [OAuth](https://www.figma.com/developers/api#oauth2)_

* [ ] Decide between personal access tokens and OAuth apps; document the auth flow, scopes, and token rotation cadence.
* [ ] Store secrets in a secure manager; never embed tokens in client-side code or commit history.
* [ ] Implement least-privilege scopes and revoke credentials for inactive services regularly.

## 2. Tooling & Environment Setup

_Docs: [REST Endpoints](https://www.figma.com/developers/api#rest-endpoints), [SDKs & Samples](https://www.figma.com/developers/resources), [Rate Limits](https://www.figma.com/developers/api#rate-limits)_

* [ ] Standardize on REST client libraries or SDK wrappers (TypeScript, Python) and pin versions via lockfiles.
* [ ] Provide local environment templates (`.env.example`) capturing API base URLs, file IDs, and team IDs.
* [ ] Document rate limit expectations and retry/backoff strategies; surface metrics during development.

## 3. Workspace & Resource Mapping

_Docs: [Files & Projects](https://www.figma.com/developers/api#files), [Teams & Projects API](https://www.figma.com/developers/api#projects-endpoint)_

* [ ] Maintain a catalog mapping Figma teams, projects, and file IDs to product domains.
* [ ] Create configuration layers (JSON/YAML) that translate friendly names into API identifiers for automation scripts.
* [ ] Version these mappings alongside application code to keep automation reproducible across environments.

## 4. Data Retrieval & Endpoints Usage

_Docs: [File Nodes](https://www.figma.com/developers/api#file-nodes), [Images Endpoint](https://www.figma.com/developers/api#images-endpoint), [Comments Endpoint](https://www.figma.com/developers/api#comments-endpoint)_

* [ ] Encapsulate API calls in typed clients that handle pagination (`ids`, `cursor`) and optional parameters.
* [ ] Cache immutable resources (component metadata, styles) to reduce redundant requests and rate limit pressure.
* [ ] Log request metadata (endpoint, file ID, status code) for observability and troubleshooting.

## 5. Mutations, Writes & Automation

_Docs: [Write Endpoints](https://www.figma.com/developers/api#working-with-design-systems), [Update Comments](https://www.figma.com/developers/api#update-comments)_

* [ ] Confirm whether the workflow requires write capabilities; many endpoints remain read-only—document gaps and fallbacks.
* [ ] When using Dev Mode codegen or component linking, version generated artifacts and track diffs in code review.
* [ ] Wrap write operations with idempotency safeguards and audit logs to support rollbacks.

## 6. Webhooks & Event Processing

_Docs: [Webhooks](https://www.figma.com/developers/api#webhooks), [Webhook Security](https://www.figma.com/developers/api#webhook-security)_

* [ ] Register webhooks per team or file as needed; track IDs and secrets in configuration management.
* [ ] Validate signatures on every webhook request and reject payloads failing HMAC verification.
* [ ] Queue event processing with retry/backoff to absorb delivery bursts and maintain ordering when required.

## 7. Assets, Exports & Design Tokens

_Docs: [Image Export](https://www.figma.com/developers/api#images-endpoint), [Styles & Tokens](https://www.figma.com/developers/api#styles-endpoint), [Dev Mode Tokens](https://help.figma.com/hc/en-us/articles/14803839029655-Dev-Mode-Design-Tokens)_

* [ ] Define export presets (format, scale, background) in code and align them with product requirements.
* [ ] Sync style metadata and design tokens into source control; reconcile differences with engineering design systems.
* [ ] Validate asset export pipelines against performance budgets (file size, color profiles) before publishing.

## 8. Collaboration & Comment Workflows

_Docs: [Comments API](https://www.figma.com/developers/api#comments-endpoint), [Dev Mode Collaboration](https://help.figma.com/hc/en-us/articles/1500002436461-Collaborate-in-Dev-Mode)_

* [ ] Automate issue creation or notifications from Figma comments; track comment IDs to avoid duplication.
* [ ] Provide tooling for designers to tag code owners within Figma; integrate resolves with engineering trackers.
* [ ] Ensure automation respects user privacy settings and team-level visibility restrictions.

## 9. Security, Compliance & Privacy

_Docs: [Security & Privacy](https://www.figma.com/security), [API Terms of Service](https://www.figma.com/developers/api#terms)_

* [ ] Classify data extracted from Figma (PII, confidential designs) and enforce encryption in transit and at rest.
* [ ] Review Figma’s API terms to ensure usage complies with redistribution and rate limit policies.
* [ ] Conduct regular access reviews for service accounts and rotate credentials per security policy.

## 10. Observability & Performance

_Docs: [Rate Limits](https://www.figma.com/developers/api#rate-limits), [Status Page](https://status.figma.com)_

* [ ] Instrument API clients with structured logging, timing metrics, and rate limit headers for monitoring.
* [ ] Alert on sustained 4xx/5xx error spikes, degraded throughput, or rate limit throttling.
* [ ] Subscribe to Figma status updates and degrade gracefully during partial outages.

## 11. Testing & Quality Assurance

_Docs: [API Reference](https://www.figma.com/developers/api), [Sandbox Accounts](https://help.figma.com/hc/en-us/articles/1500002409282-Enable-Dev-Mode#enable-dev-mode)_

* [ ] Use sandbox or duplicate files for integration tests to avoid polluting production assets.
* [ ] Record contract tests for critical endpoints using mocked responses to guard against schema regressions.
* [ ] Include end-to-end tests that validate automation outputs (tokens, exports) against expected fixtures.

## 12. Documentation & Governance

_Docs: [Developer Docs Home](https://www.figma.com/developers), [Change Log](https://www.figma.com/developers/api#changelog)_

* [ ] Maintain runbooks covering auth setup, resource mappings, and failure remediation.
* [ ] Track API changelog updates and schedule dependency reviews when endpoints evolve or deprecate.
* [ ] Capture design-to-code automation decisions in ADRs and review them quarterly with cross-functional stakeholders.
