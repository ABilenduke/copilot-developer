---
description: 'Cloudflare delivery guardrails for resilient edge platforms.'
applyTo: '**/*'
---

# Cloudflare Delivery Checklist

Use this checklist when planning, deploying, and operating workloads on the Cloudflare platform.

## 1. Account & Organization Setup

_Docs: [Account Fundamentals](https://developers.cloudflare.com/fundamentals/setup/account-setup/), [Enterprise Onboarding](https://developers.cloudflare.com/fundamentals/reference/enterprise-onboarding/)_

* [ ] Document the owning organization, billing contacts, and escalation paths; ensure contractual SLAs and support tiers are recorded.
* [ ] Configure multi-factor authentication and SSO for all administrative users before granting production access.
* [ ] Map environments (dev, staging, prod) to distinct accounts or resource groups with clear ownership and quotas.

## 2. Zone Onboarding & DNS Management

_Docs: [Add a Site](https://developers.cloudflare.com/dns/zone-setups/), [DNS Management](https://developers.cloudflare.com/dns/manage-dns-records/)_

* [ ] Verify domain ownership and authoritative name servers during onboarding; capture rollback steps for registrar changes.
* [ ] Import existing DNS records, validate TTLs, and remove deprecated entries before switching traffic.
* [ ] Enable DNSSEC and commit key rollover procedures to runbooks; test validation after cutover.

## 3. Network Architecture & Traffic Steering

_Docs: [Load Balancing](https://developers.cloudflare.com/load-balancing/), [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/)_

* [ ] Design traffic distribution (load balancers, origin pools, geo-steering) aligned with availability targets and latency budgets.
* [ ] Configure health checks with sensible intervals and failure thresholds; alert on pool or origin degradation.
* [ ] Evaluate Argo or tiered caching for latency-sensitive workloads and document cost implications.

## 4. Edge Security Controls

_Docs: [DDoS Protection](https://developers.cloudflare.com/ddos-protection/), [Web Application Firewall](https://developers.cloudflare.com/waf/)_

* [ ] Deploy WAF managed rulesets and tune custom rules for known threats; stage changes in log-only mode before enforcement.
* [ ] Configure bot management, DDoS protections, and rate limiting policies tailored to application traffic patterns.
* [ ] Maintain allow/deny lists and firewall events dashboards; integrate alerts with the security operations center.

## 5. Zero Trust Access & Identity

_Docs: [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/applications/), [ZTNA Policies](https://developers.cloudflare.com/cloudflare-one/policies/)_

* [ ] Protect internal applications with Cloudflare Access, enforcing SSO, device posture, and contextual policies.
* [ ] Standardize identity providers and SCIM provisioning where available to centralize lifecycle management.
* [ ] Log authentication events and policy decisions for compliance auditing and incident response.

## 6. Performance & Caching Strategy

_Docs: [Caching Overview](https://developers.cloudflare.com/cache/), [Cache Rules](https://developers.cloudflare.com/rules/cache/)_

* [ ] Define cache hierarchies, TTL policies, and bypass rules for dynamic content; document purge workflows.
* [ ] Optimize image and asset delivery with Polish, Mirage, or Image Resizing as required; benchmark improvements.
* [ ] Use analytics to monitor cache hit ratios and adjust rules to meet performance SLAs.

## 7. Workers & Serverless Compute

_Docs: [Workers Platform](https://developers.cloudflare.com/workers/), [Durable Objects](https://developers.cloudflare.com/durable-objects/)_

* [ ] Establish coding standards, bundling practices, and dependency policies for Workers deployments.
* [ ] Separate staging and production namespaces (KV, Durable Objects, queues) and guard them with environment-specific tokens.
* [ ] Monitor script CPU time, subrequest counts, and tail logs; set alerts for usage approaching plan limits.

## 8. Data Services & Storage

_Docs: [Workers KV](https://developers.cloudflare.com/kv/), [R2 Object Storage](https://developers.cloudflare.com/r2/), [Queues](https://developers.cloudflare.com/queues/)_

* [ ] Choose appropriate data services (KV, Durable Objects, R2, Queues) based on consistency, latency, and retention requirements.
* [ ] Implement lifecycle policies, encryption, and namespace naming conventions aligned with data governance standards.
* [ ] Capture backup, export, and disaster recovery procedures for each storage service in operational runbooks.

## 9. Observability & Logging

_Docs: [Analytics & Logs](https://developers.cloudflare.com/logs/), [Spectrum & Firewall Analytics](https://developers.cloudflare.com/analytics/)_

* [ ] Enable Logpush or logpull integrations to ship events into centralized observability platforms with defined retention.
* [ ] Create dashboards for traffic, security events, and performance KPIs; align alert thresholds with SLOs.
* [ ] Correlate Cloudflare analytics with origin telemetry to validate routing and cache behaviors.

## 10. Testing, Staging & Validation

_Docs: [Zone Versioning](https://developers.cloudflare.com/domain-configuration/zone-versioning/), [Testing Guidance](https://developers.cloudflare.com/fundamentals/setup/account-setup/staging-environment/)_

* [ ] Maintain lower environments that mirror production configurations, including DNS, rulesets, and Workers scripts.
* [ ] Use zone versioning or configuration exports to rehearse changes before production rollout.
* [ ] Automate smoke and regression tests covering routing, security, and cache behaviors after each deployment.

## 11. Deployment, Change Control & Incident Response

_Docs: [Change Management](https://developers.cloudflare.com/fundamentals/setup/change-management/), [Incident Response](https://developers.cloudflare.com/fundamentals/account-and-billing/support/incident-management/)_

* [ ] Schedule maintenance windows for impactful changes (DNS, firewall, rules) and notify stakeholders of expected impact.
* [ ] Maintain documented rollback plans, including previously exported configs and origin failover procedures.
* [ ] Test escalation paths with Cloudflare Support, and archive incident timelines, remediation steps, and lessons learned.

## 12. Documentation, Training & Continuous Improvement

_Docs: [Cloudflare Changelog](https://developers.cloudflare.com/fundamentals/reference/changelog/), [Learning Paths](https://developers.cloudflare.com/learning-paths/)_

* [ ] Keep architecture diagrams, dependency maps, and ownership matrices updated for every Cloudflare-integrated service.
* [ ] Provide recurring training on new platform capabilities, security updates, and operational tooling.
* [ ] Review metrics, incidents, and backlog items quarterly to prioritize optimizations and retire unused features.
