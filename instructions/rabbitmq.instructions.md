---
description: 'RabbitMQ delivery guardrails for resilient messaging platforms.'
applyTo: '**/*'
---

# RabbitMQ Delivery Checklist

Use this checklist when designing, deploying, and operating RabbitMQ-based messaging systems.

## 1. Installation & Environment Setup

_Docs: [RabbitMQ Installation Guide](https://www.rabbitmq.com/docs/download), [Erlang/OTP Compatibility Matrix](https://www.rabbitmq.com/docs/which-erlang)_

* [ ] Pin RabbitMQ and Erlang/OTP versions per environment; document upgrade cadence and compatibility guarantees.
* [ ] Automate provisioning (Ansible, Terraform, Helm) to install server packages, plugins, and baseline configs consistently.
* [ ] Validate host prerequisites (file descriptors, `vm.swappiness`, `net.core.somaxconn`, disk throughput) during bootstrap and capture results in onboarding docs.

## 2. Architecture & Topology Planning

_Docs: [RabbitMQ Clustering Guide](https://www.rabbitmq.com/docs/clustering), [Federation & Shovel Overview](https://www.rabbitmq.com/docs/federation)_

* [ ] Model whether workloads require a single cluster, multi-site federation, or shovels; record trade-offs in an ADR.
* [ ] Define zone/region placement for cluster nodes and quorum queues, ensuring network latency and split-brain risks are understood.
* [ ] Document topology diagrams (exchanges, queues, upstreams) and ownership boundaries for each logical messaging domain.

## 3. Configuration & Policy Management

_Docs: [RabbitMQ Configuration File Reference](https://www.rabbitmq.com/docs/configure), [Policy & Parameter Guide](https://www.rabbitmq.com/docs/parameters)_

* [ ] Store `rabbitmq.conf`, `advanced.config`, and definitions exports in version control with environment overlays.
* [ ] Leverage policies to enforce queue parameters (quorum vs classic, TTL, DLX, max-length) instead of per-queue ad-hoc settings.
* [ ] Validate configuration syntax via `rabbitmq-diagnostics` or container health checks before promoting changes.

## 4. Messaging Patterns & Exchange Design

_Docs: [RabbitMQ Tutorials](https://www.rabbitmq.com/tutorials), [Exchanges & Routing](https://www.rabbitmq.com/docs/exchanges)_

* [ ] Select exchange types (direct, topic, fanout, headers) and routing keys that align with domain event semantics; document naming conventions.
* [ ] Establish dead-letter strategy (DLX, parking queues) and make it part of standard provisioning flows.
* [ ] Ensure mandatory publishing flows return unroutable messages to publishers or alternate exchanges for diagnostics.

## 5. Reliability & High Availability

_Docs: [Quorum Queues Guide](https://www.rabbitmq.com/docs/quorum-queues), [Classic Mirrored Queues](https://www.rabbitmq.com/docs/ha)_

* [ ] Prefer quorum queues for durable workloads; justify any remaining classic mirrored queues and set sync modes explicitly.
* [ ] Configure `ha-sync-mode`, `ha-promote-on-shutdown`, and partition handling policies and test failover scenarios.
* [ ] Validate publisher confirms and consumer acknowledgements are enabled and monitored for stalled deliveries.

## 6. Performance & Capacity Planning

_Docs: [RabbitMQ Performance Tuning](https://www.rabbitmq.com/docs/tuning), [Memory & Flow Control](https://www.rabbitmq.com/docs/memory)_

* [ ] Benchmark critical message flows (perftest, custom load rigs) to set capacity targets for throughput, latency, and queue depth.
* [ ] Configure resource alarms (memory, disk-free, file descriptors) and document automated remediation or throttling behavior.
* [ ] Size disk, CPU, and RAM for peak message bursts; capture growth forecasts and scaling triggers in capacity plans.

## 7. Security & Compliance

_Docs: [RabbitMQ Security Guide](https://www.rabbitmq.com/docs/security), [TLS Support](https://www.rabbitmq.com/docs/ssl)_

* [ ] Enforce TLS for all client and inter-node traffic; manage certificates via an approved PKI with rotation schedules.
* [ ] Implement least-privilege virtual hosts, users, and permissions; track credentials in a secret manager and rotate regularly.
* [ ] Enable and review authentication/authorization backends (LDAP, OAuth 2.0, internal DB) and align logs with compliance retention policies.

## 8. Observability & Monitoring

_Docs: [RabbitMQ Management Plugin](https://www.rabbitmq.com/docs/management), [Prometheus & Grafana Monitoring](https://www.rabbitmq.com/docs/monitoring)_

* [ ] Collect metrics (queue depth, consumers, publish rate, confirms, resource alarms) via Prometheus/exporters and alert on defined SLOs.
* [ ] Aggregate structured logs (connection events, channel closures, access failures) into centralized observability platforms.
* [ ] Instrument business-level tracing (message IDs, correlation IDs) to follow events through producers, brokers, and consumers.

## 9. Client Integration & Protocol Strategy

_Docs: [AMQP 0-9-1 Reference](https://www.rabbitmq.com/amqp-0-9-1-quickref), [Client Libraries](https://www.rabbitmq.com/docs/clients)_

* [ ] Standardize on supported client libraries per language and version-lock them across services.
* [ ] Ensure publishers use confirms/transactions where required and implement retry/backoff that respects idempotency.
* [ ] Document protocol usage (AMQP, MQTT, STOMP, HTTP API) and test compatibility when enabling additional plugins.

## 10. Testing & Quality Assurance

_Docs: [RabbitMQ PerfTest](https://www.rabbitmq.com/docs/perf-test), [Integration Testing Guide](https://www.rabbitmq.com/docs/testing)_

* [ ] Automate functional tests that provision ephemeral brokers, assert routing, and verify dead-letter flows.
* [ ] Run load and soak tests before major releases to validate quorum queue behavior under churn (node restarts, network faults).
* [ ] Include contract tests for message schemas and serialization formats to prevent consumer breakage.

## 11. Operations, Upgrades & Disaster Recovery

_Docs: [Upgrade & Patch Guide](https://www.rabbitmq.com/docs/upgrade), [Backup & Restore Strategies](https://www.rabbitmq.com/docs/backup)_

* [ ] Rehearse rolling upgrades with canary nodes, verifying inter-version compatibility and plugin migrations.
* [ ] Schedule and test backups of definitions, policies, and durable queue contents (quorum snapshots, shovel replays) with documented RPO/RTO.
* [ ] Maintain incident runbooks covering partition recovery, stuck queues, disk-full events, and certificate failures.

## 12. Documentation & Governance

_Docs: [RabbitMQ Official Docs Hub](https://www.rabbitmq.com/documentation.html), [Architecture Decision Records](https://adr.github.io/)_

* [ ] Keep runbooks, topology diagrams, and dependency maps current in shared knowledge bases.
* [ ] Record ADRs for major messaging decisions (exchange patterns, persistence strategy, multi-region topology).
* [ ] Review governance artifacts quarterly to incorporate lessons learned from incidents, audits, and capacity reviews.
