---
description: 'MongoDB delivery guardrails for scalable document databases.'
applyTo: '**/*'
---

# MongoDB Delivery Checklist

Use this checklist when designing, deploying, and operating MongoDB clusters across environments.

## 1. Installation & Tooling Setup

_Docs: [MongoDB Installation Tutorials](https://www.mongodb.com/docs/manual/installation/), [Production Notes](https://www.mongodb.com/docs/manual/administration/production-notes/)_

* [ ] Pin MongoDB server and tooling versions (shell, mongosh, database tools) for every environment, documenting upgrade cadence and compatibility with drivers.
* [ ] Automate provisioning (Ansible, Terraform, Kubernetes operators) to install binaries, dependencies, and OS prerequisites consistently.
* [ ] Validate host requirements (CPU, RAM, storage type, NUMA configuration) and kernel settings (`transparent_hugepage`, `vm.swappiness`, file descriptor limits) during bootstrap.

## 2. Deployment Architecture & Topology Planning

_Docs: [MongoDB Deployment Models](https://www.mongodb.com/docs/manual/core/cluster-architecture/), [Replica Set Architectures](https://www.mongodb.com/docs/manual/core/replica-set-architecture-3-members/)_

* [ ] Decide between standalone, replica set, or sharded cluster based on workload, scale, and availability targets; capture trade-offs in an ADR.
* [ ] Map node placement across availability zones/regions, ensuring election quorum, latency budgets, and failure domains are understood.
* [ ] Document cluster topology diagrams (config servers, mongos routers, application entrypoints) with ownership and on-call contacts.

## 3. Configuration & Environment Management

_Docs: [Configuration File Options](https://www.mongodb.com/docs/manual/reference/configuration-options/), [Runtime Parameters](https://www.mongodb.com/docs/manual/reference/parameters/)_

* [ ] Maintain `mongod.conf`/`mongos.conf` templates in version control with environment overlays and secrets sourced from managers (Vault, AWS Secrets Manager).
* [ ] Validate configuration changes in staging using `mongod --config` checks or `mongo --eval` scripts before production rollout.
* [ ] Align feature flags (featureCompatibilityVersion, auditing, profiling) across environments and record deviation rationale.

## 4. Data Modeling & Schema Design

_Docs: [Data Modeling Introduction](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/), [Schema Design Patterns](https://www.mongodb.com/developer/article/mongodb-schema-design-best-practices/)_

* [ ] Classify entities by access patterns to decide between embedding, referencing, or bucketing strategies; document schema contracts.
* [ ] Standardize field naming, BSON data types, and validation rules (`$jsonSchema`, validators) to prevent schema drift.
* [ ] Model time-series, geospatial, and multi-tenancy requirements explicitly to ensure index support and partitioning strategies.

## 5. Indexing & Query Strategy

_Docs: [Index Fundamentals](https://www.mongodb.com/docs/manual/indexes/), [Query Plan Analysis](https://www.mongodb.com/docs/manual/tutorial/evaluate-query-performance/)_

* [ ] Create compound, partial, and TTL indexes aligned with top query patterns; document ownership and review cadence.
* [ ] Use `explain()` plans and index statistics to verify selectivity and avoid blocking collection scans in production.
* [ ] Implement guardrails for index build operations (background builds, resumable index builds) and enforce index size monitoring.

## 6. Replication & Sharding Strategy

_Docs: [Replica Set Administration](https://www.mongodb.com/docs/manual/replication/), [Sharding Concepts](https://www.mongodb.com/docs/manual/sharding/)_

* [ ] Configure replica set member priorities, hidden/delayed nodes, and election settings to meet RPO/RTO requirements.
* [ ] Define sharding keys using cardinality and monotonicity analysis; avoid hotspots by leveraging hashed or zoned shard keys where appropriate.
* [ ] Monitor replication lag, chunk migrations, and balancer status; document failover and rebalancing runbooks.

## 7. Performance & Capacity Planning

_Docs: [Performance Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/#performance), [WiredTiger Storage Engine](https://www.mongodb.com/docs/manual/core/wiredtiger/)_

* [ ] Benchmark representative workloads (YCSB, k6, custom runners) to size CPU, memory, and storage IOPS requirements.
* [ ] Track working set size versus RAM, cache pressure, and eviction metrics to prevent disk thrash.
* [ ] Establish headroom policies for connections, open cursors, and oplog size; capture scaling triggers and approval workflows.

## 8. Security & Compliance

_Docs: [Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/), [Encryption](https://www.mongodb.com/docs/manual/core/security-encryption/)_

* [ ] Enforce authentication (`auth=true`), TLS/SSL for intra-cluster and client traffic, and enable SCRAM or X.509 mechanisms as required.
* [ ] Configure role-based access control with least privilege; audit custom roles and user grants regularly.
* [ ] Implement encryption at rest (KMIP, cloud KMS) and field-level encryption for sensitive data; document key rotation cadences.

## 9. Observability & Monitoring

_Docs: [Monitoring Reference](https://www.mongodb.com/docs/manual/administration/monitoring/), [Cloud Manager / Ops Manager](https://www.mongodb.com/docs/ops-manager/current/monitoring/)_

* [ ] Collect metrics (opCounters, replication lag, cache usage, locks) via Ops Manager, Cloud Manager, or Prometheus exporters; define SLOs and alert thresholds.
* [ ] Centralize logs with structured parsing (log timestamps, component, severity) and retain them per compliance requirements.
* [ ] Instrument application traces with command monitoring (APM) to correlate database latency with request flows.

## 10. Application Integration & Drivers

_Docs: [MongoDB Drivers](https://www.mongodb.com/docs/drivers/), [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)_

* [ ] Standardize on supported driver versions and enable automatic retries, topology awareness, and connection pooling consistent with server versions.
* [ ] Manage connection strings via secret management and ensure SRV records/DNS TTLs align with failover expectations.
* [ ] Encapsulate database access in repositories/services with input validation, timeouts, and unified retry/backoff policies.

## 11. Testing & Quality Assurance

_Docs: [Testing Strategies](https://www.mongodb.com/docs/manual/administration/production-checklist-testing/), [Replica Set Testing](https://www.mongodb.com/docs/manual/tutorial/role-based-access-control-development-testing/)_

* [ ] Run integration tests against ephemeral MongoDB instances (containers, Testcontainers, in-memory emulators) exercising migrations and validation rules.
* [ ] Simulate failovers, network partitions, and shard balancing in staging to validate application resilience.
* [ ] Automate data migration and schema evolution tests (mongodump/mongorestore, `$merge`, change streams) before production deployments.

## 12. Backup, Recovery & Governance

_Docs: [Backup Methods](https://www.mongodb.com/docs/manual/core/backups/), [Auditing](https://www.mongodb.com/docs/manual/core/auditing/)_

* [ ] Implement continuous backups (Ops Manager, cloud snapshots, filesystem snapshots) with documented RPO/RTO targets and restore drills.
* [ ] Retain oplog archives or point-in-time recovery streams; verify recovery procedures for both replica sets and sharded clusters.
* [ ] Maintain governance artifacts (runbooks, ADRs, compliance evidence, data retention policies) and schedule periodic reviews after incidents or audits.
