---
description: 'PostgreSQL delivery guardrails for resilient relational data platforms.'
applyTo: '**/*'
---

# PostgreSQL Delivery Checklist

Use this checklist when designing, operating, and modernizing PostgreSQL deployments.

## 1. Installation & Tooling Setup

_Docs: [PostgreSQL Downloads](https://www.postgresql.org/download/), [Installation Guide](https://www.postgresql.org/docs/current/installation.html), [pgAdmin Documentation](https://www.pgadmin.org/docs/)_

* [ ] Pin PostgreSQL server and client tool versions per environment; record supported OS, package repos, and patch cadences.
* [ ] Automate provisioning (Ansible, Terraform, containers) to install binaries, extensions, locales, and ICU data consistently.
* [ ] Validate host prerequisites (filesystem settings, kernel parameters, disk layout, `huge_pages`) before promoting nodes to higher environments.

## 2. Architecture & Topology Planning

_Docs: [Server Architecture](https://www.postgresql.org/docs/current/overview.html), [High Availability Concepts](https://www.postgresql.org/docs/current/high-availability.html), [Logical Replication Overview](https://www.postgresql.org/docs/current/logical-replication.html)_

* [ ] Document deployment topology (single instance, streaming replicas, logical replication, sharding/federation) with ownership and failover roles.
* [ ] Map component placement across availability zones/regions, including connection proxies, load balancers, and read pools.
* [ ] Capture resource sizing assumptions (CPU, RAM, storage IOPS, network) with growth forecasts and revisit quarterly.

## 3. Configuration & Environment Management

_Docs: [Runtime Configuration](https://www.postgresql.org/docs/current/runtime-config.html), [postgresql.conf](https://www.postgresql.org/docs/current/config-setting.html), [pg_hba.conf](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)_

* [ ] Track `postgresql.conf`, `pg_hba.conf`, and `postgresql.auto.conf` as code with environment overlays and secrets sourced from a manager.
* [ ] Validate configuration changes in staging using `pg_ctl reload`, `ALTER SYSTEM`, or container health checks before production rollout.
* [ ] Align locale, encoding, timezone, and default collation across environments; document rationale for any deviations.

## 4. Schema Design & Data Modeling

_Docs: [SQL Syntax](https://www.postgresql.org/docs/current/sql.html), [Schemas & Namespaces](https://www.postgresql.org/docs/current/ddl-schemas.html), [Extension Ecosystem](https://www.postgresql.org/docs/current/extend-extensions.html)_

* [ ] Normalize schemas where appropriate and document denormalization patterns, partitioning strategies, and inheritance usage.
* [ ] Version DDL changes via migrations (Sqitch, Flyway, Liquibase) and enforce peer review for destructive operations.
* [ ] Standardize naming conventions, data types, default values, and extension usage (e.g., `uuid-ossp`, `pg_partman`) across teams.

## 5. Indexing, Query Planning & Optimization

_Docs: [Indexes](https://www.postgresql.org/docs/current/indexes.html), [EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html), [Statistics Collector](https://www.postgresql.org/docs/current/monitoring-stats.html)_

* [ ] Create appropriate index types (B-tree, BRIN, GIN, GiST, hash) based on access patterns, selectivity, and maintenance cost.
* [ ] Use `EXPLAIN (ANALYZE, BUFFERS)` and auto_explain to profile long-running queries; keep `default_statistics_target` tuned for skewed data.
* [ ] Guard against bloat with regular `VACUUM`, `ANALYZE`, and `REINDEX` schedules; monitor index size growth and fragmentation.

## 6. Replication, High Availability & Failover

_Docs: [Streaming Replication](https://www.postgresql.org/docs/current/warm-standby.html), [Replication Slots](https://www.postgresql.org/docs/current/logicaldecoding-explanation.html), [Failover Management](https://www.postgresql.org/docs/current/different-replication-solutions.html)_

* [ ] Configure streaming replication with replication slots, WAL retention, and synchronous/asynchronous policies aligned to RPO/RTO.
* [ ] Implement orchestrated failover (Patroni, repmgr, pg_auto_failover) with fencing, quorum rules, and documented manual overrides.
* [ ] Test disaster recovery scenarios regularly, including replica promotion, cascading replication, and slot resynchronization.

## 7. Performance & Capacity Planning

_Docs: [Performance Optimization](https://www.postgresql.org/docs/current/performance-tips.html), [VACUUM & Autovacuum](https://www.postgresql.org/docs/current/routine-vacuuming.html), [Work Memory](https://www.postgresql.org/docs/current/runtime-config-resource.html)_

* [ ] Tune critical parameters (`shared_buffers`, `work_mem`, `maintenance_work_mem`, `effective_cache_size`, `max_parallel_workers`) per workload and hardware.
* [ ] Monitor autovacuum effectiveness, freeze age, and bloat; adjust thresholds, cost limits, and table-specific settings proactively.
* [ ] Benchmark workloads with pgBench or production traffic replays; track capacity KPIs (TPS, latency, cache hit ratios) and scaling triggers.

## 8. Security, Compliance & Access Control

_Docs: [Authentication Methods](https://www.postgresql.org/docs/current/auth-methods.html), [TLS Setup](https://www.postgresql.org/docs/current/ssl-tcp.html), [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)_

* [ ] Enforce encrypted connections (TLS), strong authentication (SCRAM-SHA-256, LDAP, Kerberos) and rotate credentials via secret stores.
* [ ] Harden `pg_hba.conf` with least-privilege rules, RLS policies, and audited roles; document admin escalation procedures.
* [ ] Enable auditing/logging (pgaudit, log_statement, log_connections) to meet compliance requirements and retain evidence per policy.

## 9. Observability & Monitoring

_Docs: [Logging Configuration](https://www.postgresql.org/docs/current/runtime-config-logging.html), [Monitoring Views](https://www.postgresql.org/docs/current/monitoring-stats.html), [pgMonitor Toolkit](https://github.com/CrunchyData/pgmonitor)_

* [ ] Collect metrics from `pg_stat_*` views, system catalogs, and extensions (pg_stat_statements, pg_wait_sampling) into observability platforms.
* [ ] Configure structured logging with log levels, CSV/JSON formats, and rotation policies; centralize logs for incident analysis.
* [ ] Set alerts for replication lag, blocking sessions, cache hit drop, autovacuum backlog, WAL archive failures, and disk exhaustion.

## 10. Application Integration & Connection Management

_Docs: [Libpq](https://www.postgresql.org/docs/current/libpq.html), [Connection Pooling](https://www.postgresql.org/docs/current/runtime-config-connection.html), [pgBouncer Documentation](https://www.pgbouncer.org/)_

* [ ] Standardize drivers and ORM settings (timeouts, prepared statements, fetch sizes) to avoid connection storms and transaction leaks.
* [ ] Deploy connection pooling (pgBouncer, Odyssey, Pgpool-II) with transaction/session pooling modes tuned per workload.
* [ ] Encapsulate database access in services or repositories; enforce retry, backoff, and idempotency patterns for transient errors.

## 11. Testing, Validation & Quality Assurance

_Docs: [Regression Testing Guide](https://www.postgresql.org/docs/current/regress-run.html), [pgBench](https://www.postgresql.org/docs/current/pgbench.html), [Fault Tolerance Testing](https://www.postgresql.org/docs/current/high-availability.html#HIGH-AVAILABILITY-TESTING)_

* [ ] Automate migration tests, integration suites, and contract tests against disposable PostgreSQL instances or containers.
* [ ] Stress test critical flows with pgBench or custom harnesses, covering failover, replication lag, vacuum impact, and large transactions.
* [ ] Simulate incident drills (server crash, network partitions, corrupted WAL) and document expected recovery timelines.

## 12. Backup, Recovery & Governance

_Docs: [Backup & Restore](https://www.postgresql.org/docs/current/backup.html), [Point-in-Time Recovery](https://www.postgresql.org/docs/current/continuous-archiving.html), [Archiving Instructions](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-ARCHIVE-COMMAND)_

* [ ] Implement layered backups (base backups, WAL archiving, snapshots) with automated verification and checksum validation.
* [ ] Practice PITR regularly; maintain runbooks for timeline management, recovery targets, and replica rebuild procedures.
* [ ] Record governance artifacts (ADRs, capacity plans, compliance evidence, RTO/RPO commitments) and review them after audits or incidents.
