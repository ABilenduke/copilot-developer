---
description: 'MariaDB delivery guardrails for reliable relational platforms.'
applyTo: '**/*'
---

# MariaDB Delivery Checklist

Use this checklist when designing, deploying, and operating MariaDB across environments.

## 1. Installation & Tooling Setup

_Docs: [MariaDB Server Installation Guide](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/), [MariaDB Repository Setup](https://mariadb.com/kb/en/yum/), [MariaDB Client Tools](https://mariadb.com/kb/en/mariadb-client/)_

* [ ] Pin MariaDB server and client versions per environment; track end-of-life dates and patch cadences in runbooks.
* [ ] Automate provisioning (Ansible, Terraform, Docker, Kubernetes Operators) to install binaries, plugins, and dependencies consistently.
* [ ] Validate host prerequisites (filesystem type, NUMA settings, `vm.swappiness`, `transparent_hugepage`, file descriptors) before promoting to higher environments.

## 2. Architecture & Topology Planning

_Docs: [MariaDB Architecture Overview](https://mariadb.com/kb/en/mariadb-architecture/), [Replication Overview](https://mariadb.com/kb/en/replication-overview/), [MariaDB Enterprise Topologies](https://mariadb.com/docs/server/architecture/topologies/)_

* [ ] Document baseline topology (standalone, asynchronous replication, Galera Cluster, Xpand, ColumnStore) with ownership and failover roles.
* [ ] Map node placement across availability zones/regions; capture quorum requirements, latency budgets, and failure domains.
* [ ] Record capacity assumptions (CPU, RAM, storage IOPS, network) with growth forecasts and revisit quarterly.

## 3. Configuration & Environment Management

_Docs: [Option File Configuration](https://mariadb.com/kb/en/configuring-mariadb-with-option-files/), [Dynamic System Variables](https://mariadb.com/kb/en/server-system-variables/), [Configuring Character Sets](https://mariadb.com/kb/en/setting-character-sets-and-collations/)_

* [ ] Version-control `my.cnf`/`mariadb.conf.d` with environment overlays; externalize secrets to vaults or orchestration layers.
* [ ] Validate configuration changes in staging using `mysqld --help --verbose`, `mariadb-admin reload`, or container health checks prior to production rollout.
* [ ] Align character set, collation, SQL mode, and timezone defaults across environments; document rationale for deviations.

## 4. Schema Design & Data Modeling

_Docs: [MariaDB Storage Engines](https://mariadb.com/kb/en/storage-engines/), [Data Types](https://mariadb.com/kb/en/data-types/), [Partitioning Overview](https://mariadb.com/kb/en/partitioning-overview/)_

* [ ] Normalize schemas while documenting denormalization, partitioning, and sharding strategies for analytic or multi-tenant workloads.
* [ ] Choose storage engines (InnoDB, Aria, ColumnStore, MyRocks) intentionally and record rationale, limits, and operational considerations.
* [ ] Manage schema changes through migrations (Flyway, Liquibase, Skeema); enforce peer review for destructive operations and maintain rollback plans.

## 5. Indexing & Query Optimization

_Docs: [Optimizer Overview](https://mariadb.com/kb/en/the-query-optimizer/), [EXPLAIN Statement](https://mariadb.com/kb/en/explain/), [Optimizer Trace](https://mariadb.com/kb/en/optimizer-trace/)_

* [ ] Create covering and composite indexes aligned with access patterns; evaluate virtual columns and functional indexes where beneficial.
* [ ] Analyze execution plans with `EXPLAIN`, `ANALYZE FORMAT=JSON`, and optimizer trace; tune statistics (ANALYZE TABLE, histogram collection) for skewed data.
* [ ] Monitor index fragmentation and cardinality; schedule `OPTIMIZE TABLE` or `ALTER TABLE ... ENGINE=InnoDB` maintenance when justified.

## 6. Replication, Clustering & High Availability

_Docs: [Asynchronous Replication Setup](https://mariadb.com/kb/en/setting-up-replication/), [MariaDB Galera Cluster](https://mariadb.com/kb/en/galera-cluster/), [MariaDB Replication Configuration](https://mariadb.com/kb/en/replication-configuration/)_

* [ ] Configure replication mode (asynchronous, semi-synchronous, GTID-based) with appropriate binlog formats, GTID settings, and `log_slave_updates` policies.
* [ ] Harden Galera clusters by tuning quorum, flow control, and segment configuration; document state snapshot transfer (SST) procedures.
* [ ] Test failover workflows (MHA, Replication Manager, Orchestrator, custom scripts) and capture fencing/rollback steps in runbooks.

## 7. Performance & Capacity Planning

_Docs: [Performance Schema](https://mariadb.com/kb/en/performance-schema/), [Server Status Variables](https://mariadb.com/kb/en/server-status-variables/), [Thread Pool Plugin](https://mariadb.com/kb/en/thread-pool-in-mariadb/)_

* [ ] Tune resource-critical variables (`innodb_buffer_pool_size`, `max_connections`, `innodb_log_file_size`, `join_buffer_size`, thread pool settings) per workload and hardware.
* [ ] Monitor InnoDB buffer pool hit ratios, row lock waits, temporary table usage, and disk I/O saturation; adjust configuration proactively.
* [ ] Benchmark representative loads with sysbench, HammerDB, or custom harnesses; track TPS, query latency, and queue depth against SLOs.

## 8. Security, Compliance & Governance

_Docs: [User Account Management](https://mariadb.com/kb/en/grant/), [MariaDB Encryption](https://mariadb.com/kb/en/data-at-rest-encryption-overview/), [MariaDB Audit Plugin](https://mariadb.com/kb/en/mysql-audit-plugin/)_

* [ ] Enforce TLS for client and intra-cluster communication; rotate certificates, master keys, and credentials via approved secret stores.
* [ ] Implement least-privilege grants, password policies, and role-based access; disable remote root logins and anonymous users.
* [ ] Enable auditing (MariaDB Audit Plugin, MariaDB Enterprise Audit) and document retention, scrubbing, and access review cadences.

## 9. Observability & Monitoring

_Docs: [MariaDB Monitoring and Observability](https://mariadb.com/kb/en/monitoring-mariadb/), [MariaDB Prometheus Exporter](https://github.com/prometheus/mysqld_exporter), [MariaDB Log System](https://mariadb.com/kb/en/error-log/)_

* [ ] Collect metrics from performance_schema, information_schema, `SHOW STATUS`, and custom exporters; integrate with Prometheus, Grafana, or MariaDB Monitor.
* [ ] Configure error, slow, and audit logs with rotation policies; forward structured logs to centralized observability stacks.
* [ ] Define alerts for replication lag, Galera flow control, disk usage, connection exhaustion, long-running queries, and failed backups.

## 10. Application Integration & Connection Management

_Docs: [MariaDB Connectors](https://mariadb.com/products/skysql/docs/developer/connection-guides/), [MaxScale Documentation](https://mariadb.com/kb/en/mariadb-maxscale-overview/), [Client/Server Protocol](https://mariadb.com/kb/en/connection-process/)_

* [ ] Standardize on supported connectors (JDBC, MariaDB Connector/C, Node.js, Python) and align versions with server features (TLS, authentication plugins).
* [ ] Use connection pools or proxies (MaxScale, ProxySQL) to manage concurrency, read/write splitting, and connection reuse.
* [ ] Implement retry/backoff, transaction boundaries, and idempotency patterns to handle transient failures and failovers gracefully.

## 11. Testing & Quality Assurance

_Docs: [MariaDB Test Suite](https://mariadb.com/kb/en/the-mariadb-test-suite/), [MariaDB Replayer](https://mariadb.com/kb/en/mariadb-replayer/), [Backup Testing](https://mariadb.com/kb/en/testing-backups/)_

* [ ] Run automated integration and migration tests against ephemeral MariaDB instances (containers, Testcontainers) with representative datasets.
* [ ] Stress-test replication, Galera failover, and connection pools using fault injection or chaos tooling; document recovery times.
* [ ] Validate backup restores and PITR workflows regularly using production-like copies; capture evidence for compliance audits.

## 12. Backup, Recovery & Lifecycle Management

_Docs: [MariaDB Backup Overview](https://mariadb.com/kb/en/mariadb-backup-overview/), [mariabackup](https://mariadb.com/kb/en/mariabackup-overview/), [Binary Log Management](https://mariadb.com/kb/en/binary-log/)_

* [ ] Implement layered backups (mariabackup physical copies, logical dumps, storage snapshots) with automated verification and checksum validation.
* [ ] Retain binary logs for PITR; document recovery procedures for GTID and non-GTID environments, including replica resync steps.
* [ ] Maintain governance artifacts (ADRs, capacity plans, compliance evidence, RTO/RPO commitments) and review after incidents or scheduled audits.
