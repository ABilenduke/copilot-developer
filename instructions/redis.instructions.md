---
description: 'Redis delivery guardrails for high-performance data services.'
applyTo: '**/*'
---

# Redis Delivery Checklist

Use this checklist to design, operate, and maintain reliable Redis-backed systems.

## 1. Installation & Environment Setup

_Docs: [Redis Installation](https://redis.io/docs/install/), [Redis Docker Official Image](https://hub.docker.com/_/redis)_

* [ ] Pin Redis server versions and document supported platforms (bare metal, Docker, managed services) across environments.
* [ ] Automate provisioning scripts (Terraform, Ansible, Helm) to ensure consistent configurations in every environment.
* [ ] Validate kernel/sysctl prerequisites (`vm.overcommit_memory`, `transparent_hugepage`) during bootstrapping.

## 2. Configuration & Persistence

_Docs: [redis.conf Reference](https://redis.io/docs/interact/config/), [Persistence (RDB/AOF)](https://redis.io/docs/latest/operate/persistence/)_

* [ ] Track configuration as code (`redis.conf`, `users.acl`) with environment overlays in version control.
* [ ] Choose persistence strategy (RDB snapshots, AOF, hybrid) aligned with RPO/RTO requirements and test recovery regularly.
* [ ] Configure eviction policies, maxmemory, and expire settings that match workload expectations.

## 3. Data Modeling & Key Management

_Docs: [Data Types](https://redis.io/docs/data-types/), [Key Design Guidelines](https://redis.io/docs/latest/develop/data-modeling/keys/)_

* [ ] Establish key naming conventions (`namespace:resource:id`) and document TTL policies per dataset.
* [ ] Select appropriate data structures (Hashes, Sorted Sets, Streams) for access patterns; avoid storing large payloads in strings.
* [ ] Periodically audit for orphaned keys, oversized values, and hot-key distribution issues.

## 4. High Availability & Clustering

_Docs: [Redis Sentinel](https://redis.io/docs/latest/operate/rs/administering/high-availability/sentinel/), [Redis Cluster](https://redis.io/docs/latest/operate/oss_and_stack/management/cluster/)_

* [ ] Deploy Sentinel or managed equivalents for automatic failover; validate quorum, notification, and reconfiguration flows.
* [ ] For sharded workloads, design hash-slot allocation and resharding procedures before production launch.
* [ ] Simulate node failures and partition scenarios to confirm clients handle reconnection logic gracefully.

## 5. Performance & Memory Management

_Docs: [Memory Optimization](https://redis.io/docs/latest/operate/oss_and_stack/management/config/memory-optimization/), [Latency Diagnostics](https://redis.io/docs/latest/operate/oss_and_stack/management/monitor/latency/)_

* [ ] Benchmark critical commands with representative datasets; watch for blocking operations (`KEYS`, large Lua scripts).
* [ ] Monitor memory fragmentation, swap usage, and eviction rates; tune `maxmemory-policy` and object encoding.
* [ ] Profile pipeline usage, batching, and network round trips to minimize latency.

## 6. Security & Access Control

_Docs: [Redis Security Guidelines](https://redis.io/docs/latest/operate/oss_and_stack/management/security/), [Access Control Lists](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/)_

* [ ] Require TLS in transit, strong authentication (`AUTH`, ACL users), and restrict bind addresses/firewall rules.
* [ ] Enforce least-privilege ACL categories and rotate credentials via secret managers; monitor for auth failures.
* [ ] Disable unsafe commands (e.g., `FLUSHALL`, `CONFIG`) for non-admin roles and strip module installation in production.

## 7. Observability & Monitoring

_Docs: [INFO Command](https://redis.io/docs/latest/operate/oss_and_stack/management/monitor/info-stats/), [Redis Exporter (Prometheus)](https://github.com/oliver006/redis_exporter)_

* [ ] Collect INFO metrics, slowlog events, and keyspace stats; ship them to centralized monitoring (Prometheus, Datadog, CloudWatch).
* [ ] Define alert thresholds for latency spikes, replication lag, memory usage, and failover events.
* [ ] Instrument application clients with correlation IDs and command timing to trace bottlenecks end-to-end.

## 8. Client Usage & Patterns

_Docs: [Redis Clients](https://redis.io/docs/latest/develop/clients/), [Pipelining](https://redis.io/docs/latest/develop/use/pipelining/)_

* [ ] Adopt officially supported client libraries with connection pooling, automatic retries, and circuit breakers.
* [ ] Encapsulate Redis access behind repositories/services to centralize serialization, key naming, and metrics.
* [ ] Use pipelining or client-side caching judiciously; confirm operations remain idempotent under retries.

## 9. Reliability, Backups & Disaster Recovery

_Docs: [Backup & Restore](https://redis.io/docs/latest/operate/oss_and_stack/management/backup/), [Replica Migration](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)_

* [ ] Automate snapshots and offsite replication; validate restore drills with checksum verification.
* [ ] Document failover procedures for Sentinel/Cluster and managed offerings (AWS ElastiCache, Azure Cache) with clear RTO commitments.
* [ ] Maintain runbooks for large key deletions, data repair, and resharding with staged execution plans.

## 10. Testing & Local Development

_Docs: [redis-server Testing](https://redis.io/docs/latest/develop/interact/cli/), [Testcontainers Redis Module](https://www.testcontainers.org/modules/redis/)_

* [ ] Provide lightweight local instances (Docker Compose, Redis Stack) with seed data and disposable resets.
* [ ] Integrate Redis emulators/mocks sparingly; prefer real instances in integration and contract tests.
* [ ] Include load/regression tests that simulate eviction, failover, and latency to validate resilience assumptions.

## 11. Operations & Upgrades

_Docs: [Upgrading Redis](https://redis.io/docs/latest/operate/oss_and_stack/management/upgrade/), [Rolling Upgrades Guidance](https://redis.io/docs/latest/operate/oss_and_stack/management/upgrade/rolling/)_

* [ ] Track upstream release notes and CVEs; stage upgrades in lower environments with replayed traffic before production rollout.
* [ ] Use rolling or blue/green strategies for cluster upgrades; verify replication sync and persistence after each hop.
* [ ] Automate configuration drift detection (e.g., `redis-cli --intrusive`) and enforce immutable infrastructure patterns.

## 12. Documentation & Governance

_Docs: [Redis Documentation Hub](https://redis.io/docs/), [Incident Response Playbooks](https://redis.io/docs/latest/operate/oss_and_stack/management/troubleshoot/)_

* [ ] Maintain architecture diagrams, keyspace inventories, and capacity forecasts in a shared knowledge base.
* [ ] Record operational runbooks (failover, backup restore, key migration) with on-call ownership and escalation paths.
* [ ] Publish post-incident reviews and tuning decisions to inform future feature development and capacity planning.
