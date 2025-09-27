---
description: 'MySQL delivery guardrails for reliable relational databases.'
applyTo: '**/*'
---

# MySQL Delivery Checklist

Use this checklist when designing, deploying, and operating MySQL across environments.

## 1. Installation & Tooling Setup

_Docs: [MySQL Installation Guide](https://dev.mysql.com/doc/refman/en/installing.html), [Server Platform Support](https://dev.mysql.com/doc/refman/en/supported-platforms.html)_

* [ ] Pin MySQL Community/Enterprise server versions per environment and document end-of-life dates for planned upgrades.
* [ ] Automate provisioning (Ansible, Terraform, Kubernetes operators) to install packages, dependencies, and service users consistently.
* [ ] Validate host prerequisites (filesystem, NUMA, huge pages, `vm.swappiness`, file descriptor limits) and record them in onboarding docs.

## 2. Deployment Architecture & Topology Planning

_Docs: [MySQL InnoDB Cluster Overview](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-innodb-cluster-overview.html), [Replication Architectures](https://dev.mysql.com/doc/refman/en/replication-solutions.html)_

* [ ] Decide between standalone, classic primary/replica, Group Replication/InnoDB Cluster, or MySQL HeatWave architectures based on availability targets.
* [ ] Map node placement across availability zones/regions, documenting quorum requirements, failure domains, and networking policies.
* [ ] Maintain topology diagrams (routers, proxies, read replicas) with service ownership and escalation contacts.

## 3. Configuration & Environment Management

_Docs: [Server System Variables](https://dev.mysql.com/doc/refman/en/server-system-variables.html), [Option File Configuration](https://dev.mysql.com/doc/refman/en/using-option-files.html)_

* [ ] Version control baseline `my.cnf` files with environment overlays; manage secrets via vaults or orchestrator tooling.
* [ ] Validate configuration changes in staging using `mysqld --validate-config` or container health checks before production rollout.
* [ ] Align global settings (character set, collation, sql_mode, time zone) across environments and document deviation rationale.

## 4. Schema Design & Data Modeling

_Docs: [Schema Design Considerations](https://dev.mysql.com/doc/refman/en/database-use.html), [InnoDB Storage Engine](https://dev.mysql.com/doc/refman/en/innodb-storage-engine.html)_

* [ ] Normalize critical data while balancing denormalization for read-heavy workloads; document entity relationships and constraints.
* [ ] Standardize naming conventions, column data types, and default values; enforce referential integrity and cascading rules where appropriate.
* [ ] Choose storage engines intentionally (InnoDB default) and capture rationale for MyISAM, MEMORY, or other engine usage.

## 5. Indexing & Query Optimization

_Docs: [Optimization Overview](https://dev.mysql.com/doc/refman/en/optimization.html), [Using EXPLAIN](https://dev.mysql.com/doc/refman/en/using-explain.html)_

* [ ] Define primary keys, composite indexes, and covering indexes aligned with top query patterns; review them periodically for redundancy.
* [ ] Analyze execution plans with `EXPLAIN`, optimizer trace, and Performance Schema to prevent full table scans and temporary table overflow.
* [ ] Configure safe index operations (online DDL, pt-online-schema-change) and document rollback strategies.

## 6. Replication & High Availability

_Docs: [Replication Concepts](https://dev.mysql.com/doc/refman/en/replication-features.html), [MySQL Group Replication](https://dev.mysql.com/doc/refman/en/group-replication.html)_

* [ ] Configure replication modes (asynchronous, semi-synchronous, Group Replication) with proper `sync_binlog`, `innodb_flush_log_at_trx_commit`, and GTID settings.
* [ ] Monitor replication lag, error states, and relay log growth; maintain failover runbooks (MHA, Orchestrator, ProxySQL) with tested procedures.
* [ ] Ensure binary logs, relay logs, and replication filters align with backup/DR policies and auditing requirements.

## 7. Performance & Capacity Planning

_Docs: [InnoDB Buffer Pool Tuning](https://dev.mysql.com/doc/refman/en/innodb-buffer-pool.html), [Performance Schema](https://dev.mysql.com/doc/refman/en/performance-schema.html)_

* [ ] Benchmark representative workloads (sysbench, tpcc-mysql, custom harnesses) to size CPU, memory, and storage IOPS.
* [ ] Tune InnoDB buffer pool, log file sizes, redo/undo logs, and temp tablespace to maintain headroom for peak load.
* [ ] Establish capacity metrics (QPS, transactions, buffer hit ratio) with thresholds and scaling triggers documented in ADRs.

## 8. Security & Compliance

_Docs: [Security Guidelines](https://dev.mysql.com/doc/refman/en/security.html), [Encryption & Keyring](https://dev.mysql.com/doc/refman/en/innodb-data-encryption.html)_

* [ ] Enforce least-privilege accounts with `CREATE USER`/`GRANT`, password policies, role-based access, and MFA/LDAP integration when available.
* [ ] Enable TLS for client/server and replication channels; manage certificates and keyring material via approved secret stores.
* [ ] Implement auditing (MySQL Enterprise Audit, MariaDB Audit Plugin) and log retention to meet regulatory requirements.

## 9. Observability & Monitoring

_Docs: [sys Schema Quick Start](https://dev.mysql.com/doc/refman/en/sys-schema.html), [MySQL Enterprise Monitor](https://dev.mysql.com/doc/mysql-monitor/8.0/en/)_

* [ ] Collect metrics from Performance Schema, sys schema, and INFORMATION_SCHEMA exporters (Prometheus mysqld_exporter, Percona PMM) with alert thresholds.
* [ ] Centralize slow query logs, general logs, and error logs; review log rotation and retention policies regularly.
* [ ] Instrument application tracing with connector-level telemetry (OpenTelemetry, APM agents) to correlate DB latency and errors.

## 10. Application Integration & Connectors

_Docs: [MySQL Connectors](https://dev.mysql.com/doc/index-connectors.html), [Connection Handling Tips](https://dev.mysql.com/doc/refman/en/communication-errors.html)_

* [ ] Standardize on supported connectors (JDBC, Connector/Python, Connector/Node.js) and align version compatibility with server releases.
* [ ] Configure connection pooling (ProxySQL, HikariCP, c3p0) and timeout settings to prevent resource exhaustion.
* [ ] Build data access layers with parameterized queries, prepared statements, and transaction boundaries for consistency and security.

## 11. Testing & Quality Assurance

_Docs: [MySQL Test Strategies](https://dev.mysql.com/doc/refman/en/testing.html), [Percona Toolkit](https://docs.percona.com/percona-toolkit/index.html)_

* [ ] Run integration tests against disposable instances (Docker, Testcontainers, sandbox scripts) covering schema migrations and stored routines.
* [ ] Simulate failovers, read/write split scenarios, and replication breakages in staging to validate resilience.
* [ ] Automate schema diff, data validation, and performance regression tests (pt-table-checksum, pt-query-digest) before release.

## 12. Backup, Recovery & Governance

_Docs: [Backup & Recovery](https://dev.mysql.com/doc/refman/en/backup-and-recovery.html), [Point-in-Time Recovery](https://dev.mysql.com/doc/refman/en/point-in-time-recovery.html)_

* [ ] Implement layered backups (mysqldump/mysqlpump, Percona XtraBackup/MySQL Enterprise Backup, storage snapshots) with tested RPO/RTO targets.
* [ ] Retain binary logs for point-in-time recovery; practice restore drills including replica re-seeding and disaster-recovery site activation.
* [ ] Maintain governance artifacts (runbooks, ADRs, compliance evidence, data retention policies) and review them after incidents or audits.
