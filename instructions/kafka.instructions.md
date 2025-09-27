---
description: 'Kafka delivery guardrails for reliable event streaming platforms.'
applyTo: '**/*'
---

# Kafka Delivery Checklist

Use this checklist when architecting, deploying, and operating Apache Kafka clusters and dependent services.

## 1. Tooling & Environment Setup

_Docs: [Apache Kafka Quickstart](https://kafka.apache.org/quickstart), [Kafka Operations Overview](https://kafka.apache.org/documentation/#basic_ops_add_topic)_

* [ ] Pin Kafka, ZooKeeper/KRaft (if applicable), and Java runtime versions; document support windows and upgrade cadence.
* [ ] Provision reproducible environments (Infrastructure as Code, containers) with required OS tuning (`vm.swappiness`, file descriptors, network limits).
* [ ] Install CLI/admin tools (`kafka-topics.sh`, `kafka-configs.sh`, `kafka-acls.sh`, `kafka-dump-log`) and verify connectivity from operator workstations.

## 2. Cluster Architecture & Deployment Topology

_Docs: [Kafka Cluster Architecture](https://kafka.apache.org/documentation/#design), [KRaft Mode Deployment](https://kafka.apache.org/documentation/#kraft)_

* [ ] Decide between ZooKeeper or KRaft mode and document quorum requirements, controller placements, and migration plan if needed.
* [ ] Map brokers across fault domains (racks, AZs, regions) and configure rack awareness for replica placement.
* [ ] Capture sizing assumptions (broker count, storage throughput, network bandwidth) and revisit quarterly.

## 3. Configuration & Resource Management

_Docs: [Broker Configuration Guide](https://kafka.apache.org/documentation/#configuration), [Dynamic Broker Configs](https://kafka.apache.org/documentation/#dynamicbrokerconfigs)_

* [ ] Version-control `server.properties`, listener configs, and rack mappings; externalize secrets to approved managers.
* [ ] Tune broker resources (`num.network.threads`, `num.io.threads`, `socket.send.buffer.bytes`) based on workload profiling.
* [ ] Validate configuration changes in staging with `kafka-configs.sh --describe` and rolling restarts before production rollout.

## 4. Topics, Partitions & Schema Governance

_Docs: [Topic Design Guidelines](https://kafka.apache.org/documentation/#intro_topics), [Kafka Improvement Proposal KIP-500+](https://cwiki.apache.org/confluence/display/KAFKA/Kafka+Improvement+Proposals), [Confluent Schema Registry Overview](https://docs.confluent.io/platform/current/schema-registry/index.html)_

* [ ] Define naming conventions, retention policies, and ACL ownership for each topic; document partition counts and replication factors.
* [ ] Review partition strategies for hotspot risk; reassign partitions with `kafka-reassign-partitions.sh` as loads evolve.
* [ ] Enforce schema compatibility using Schema Registry or equivalent tooling; block breaking changes through CI validations.

## 5. Producers & Consumers

_Docs: [Producer Configs](https://kafka.apache.org/documentation/#producerconfigs), [Consumer Configs](https://kafka.apache.org/documentation/#consumerconfigs)_

* [ ] Configure idempotent producers (`enable.idempotence=true`) and appropriate acknowledgements (`acks=all`) for critical topics.
* [ ] Tune batching (`linger.ms`, `batch.size`) and compression (`compression.type`) to balance latency and throughput.
* [ ] Implement robust consumer groups with cooperative rebalancing, offset commits, and dead-letter handling for poison messages.

## 6. Storage, Durability & Data Retention

_Docs: [Log Basics](https://kafka.apache.org/documentation/#design_log), [Retention Policies](https://kafka.apache.org/documentation/#retention)_

* [ ] Validate storage provisioning for log segments, page cache, and snapshots; monitor disk usage versus retention settings.
* [ ] Set topic-level retention (`retention.ms`, `retention.bytes`) and enforce compacting policies (`cleanup.policy`) where required.
* [ ] Schedule log cleanup verification and segment roll checks to prevent unbounded disk growth.

## 7. Security & Access Control

_Docs: [Kafka Security Overview](https://kafka.apache.org/documentation/#security), [Authorization & ACLs](https://kafka.apache.org/documentation/#security_authz)_

* [ ] Enforce TLS for inter-broker and client connections; rotate certificates and credentials on a defined cadence.
* [ ] Implement authentication (SASL/GSSAPI, SCRAM, OAuthBearer) and least-privilege ACLs (`kafka-acls.sh`).
* [ ] Audit security configs (listener protocols, truststores, JAAS files) and capture incident response runbooks.

## 8. Observability & Monitoring

_Docs: [JMX Monitoring](https://kafka.apache.org/documentation/#monitoring), [Kafka Metrics Reference](https://kafka.apache.org/documentation/#monitoring_metrics)_

* [ ] Export broker and client metrics via JMX to observability platforms (Prometheus, Grafana, Datadog) with alert thresholds.
* [ ] Aggregate logs (broker, controller, client) centrally and index by cluster/topic for incident analysis.
* [ ] Track key health indicators (under-replicated partitions, ISR shrink/expand, consumer lag) and surface dashboards to on-call teams.

## 9. Performance & Capacity Planning

_Docs: [Apache Kafka Performance Tuning](https://kafka.apache.org/documentation/#performance), [Producer Performance Benchmark](https://kafka.apache.org/documentation/#producerperf)_

* [ ] Benchmark workloads with `kafka-producer-perf-test.sh` / `kafka-consumer-perf-test.sh` under representative traffic.
* [ ] Model throughput, latency, and message size ceilings; capture scaling triggers (add brokers, increase partitions).
* [ ] Review JVM heap usage, garbage collection, and page cache hit rates; tune GC settings accordingly.

## 10. Disaster Recovery & High Availability

_Docs: [Kafka Replication](https://kafka.apache.org/documentation/#replication), [MirrorMaker 2.0 Guide](https://kafka.apache.org/documentation/#mm2)_

* [ ] Configure replication factors and min in-sync replicas (ISR) to meet durability targets.
* [ ] Implement cross-cluster replication (MirrorMaker 2, Confluent Replicator) with monitored lag and failover plans.
* [ ] Rehearse broker, rack, and region-level failure drills; document RPO/RTO outcomes and remediation steps.

## 11. Testing & Quality Assurance

_Docs: [Kafka Streams Testing](https://kafka.apache.org/33/documentation/streams/developer-guide/testing), [Embedded Kafka for Integration Tests](https://kafka.apache.org/documentation/#developer_tools)_

* [ ] Automate integration tests using embedded Kafka or containerized clusters to validate producers, consumers, and stream processors.
* [ ] Include chaos and fault-injection tests (broker restarts, network partitions) to verify resilience of client applications.
* [ ] Track code coverage and mutation testing for stream processing logic where business-critical.

## 12. Documentation & Governance

_Docs: [Kafka Operations Tools](https://kafka.apache.org/documentation/#tools), [Kafka Improvement Process](https://cwiki.apache.org/confluence/display/KAFKA/Improvement+Proposals)_

* [ ] Maintain runbooks for common operations (topic creation, partition reassignments, rolling upgrades) with validated command examples.
* [ ] Record Architecture Decision Records (ADRs) for cluster sizing, security models, and tooling selections.
* [ ] Review governance artifacts quarterly, incorporating lessons from incidents, audits, and performance reviews.
