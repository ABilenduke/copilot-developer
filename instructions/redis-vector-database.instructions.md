---
description: 'Redis Vector Database guardrails for high-recall semantic search.'
applyTo: '**/*'
---

# Redis Vector Database Delivery Checklist

Use this checklist when designing, deploying, and operating Redis as a vector database.

## 1. Platform & Prerequisites

_Docs: [Redis Stack Overview](https://redis.io/docs/latest/operate/oss_and_stack/stack/), [Vector Search Quickstart](https://redis.io/docs/latest/develop/vector-search/quickstart/)_

* [ ] Pin Redis Stack or RediSearch module versions per environment; document feature availability (vector similarity, hybrid search, storage backends).
* [ ] Verify hardware prerequisites (RAM for embeddings, CPU SIMD support, storage throughput) and capture them in infra runbooks.
* [ ] Automate provisioning (Terraform, Helm charts, Redis Cloud templates) with reproducible module configuration and health checks.

## 2. Embedding & Data Pipeline Strategy

_Docs: [Embedding Pipelines](https://redis.io/docs/latest/develop/vector-search/embeddings/), [Data Ingestion Guide](https://redis.io/docs/latest/develop/vector-search/best-practices/ingest/)_

* [ ] Select embedding models (OpenAI, Hugging Face, in-house) and record versioning, dimensionality, and normalization requirements.
* [ ] Design ETL pipelines that batch, normalize, and checksum vectors before insertion; store source metadata for replay.
* [ ] Implement back-pressure and retry logic around embedding services to prevent partial dataset ingestion.

## 3. Schema & Index Modeling

_Docs: [Vector Search Concepts](https://redis.io/docs/latest/develop/vector-search/concepts/), [FT.CREATE Command](https://redis.io/docs/latest/develop/reference/commands/ft-create/)_

* [ ] Define RediSearch index schemas with explicit aliases, vector fields, and metadata attributes (tags, text, numerics) for filtering.
* [ ] Capture primary key conventions (Redis keys vs. HASH fields) and enforce uniqueness via deployment scripts or CI checks.
* [ ] Document mappings between business entities and vector documents, including multi-tenant isolation strategies.

## 4. Vector Index Configuration

_Docs: [Vector Indexing Overview](https://redis.io/docs/latest/develop/vector-search/indexing/), [HNSW Parameters](https://redis.io/docs/latest/develop/vector-search/indexing/hnsw/)_

* [ ] Choose FLAT vs HNSW indexes per workload; justify trade-offs for recall, ingestion speed, and memory footprint.
* [ ] Tune HNSW parameters (`M`, `EF_CONSTRUCTION`, `EF_RUNTIME`, distance metric) and record settings in configuration baselines.
* [ ] Evaluate optional compression/quantization (e.g., product quantization) and document acceptable accuracy loss.

## 5. Ingestion & Maintenance Workflows

_Docs: [Best Practices for Ingestion](https://redis.io/docs/latest/develop/vector-search/best-practices/ingest/), [FT.ADD / HSET Reference](https://redis.io/docs/latest/develop/reference/commands/ft-add/)_

* [ ] Implement bulk-loading flows with pipelining or RedisGears to minimize index rebuild costs.
* [ ] Schedule incremental refresh jobs (upserts, deletes) and validate index consistency via sample queries after each batch.
* [ ] Monitor index fragmentation and plan rolling rebuilds or re-indexing procedures for major schema changes.

## 6. Query Patterns & Relevance Tuning

_Docs: [KNN Query Guide](https://redis.io/docs/latest/develop/vector-search/query/knn/), [Hybrid Querying](https://redis.io/docs/latest/develop/vector-search/query/hybrid/)_

* [ ] Standardize KNN query templates (K, vector field, filter predicates) and expose as reusable API endpoints.
* [ ] Combine metadata filters (tag/text) with vector similarity for hybrid search and document precedence rules.
* [ ] Validate relevance using offline evaluation sets (recall@K, precision) and optional re-ranking layers before production rollout.

## 7. Performance & Capacity Planning

_Docs: [Vector Search Performance Tuning](https://redis.io/docs/latest/develop/vector-search/best-practices/performance/), [Memory Optimization](https://redis.io/docs/latest/operate/oss_and_stack/management/config/memory-optimization/)_

* [ ] Model memory usage per embedding (bytes = dimension × datatype) plus index overhead; reserve headroom for growth and replication.
* [ ] Benchmark latency/throughput under representative concurrent workloads (read/write mix, K variations) using redis-benchmark or custom harnesses.
* [ ] Track key metrics (latency percentiles, recall, ingestion lag) and establish SLOs with alerting thresholds.

## 8. Durability, Replication & Warmup

_Docs: [Redis Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/), [Redis Replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)_

* [ ] Configure AOF/RDB persistence aligned with recovery objectives; test restart behavior for large vector indexes.
* [ ] Validate replica sync performance and consider diskless replication for reduced latency during failover.
* [ ] Implement warmup routines (preload indexes, prime caches) after restarts or scaling events to stabilize latency quickly.

## 9. Security & Compliance

_Docs: [Redis Security](https://redis.io/docs/latest/operate/oss_and_stack/management/security/), [Access Control Lists](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/)_

* [ ] Enforce TLS for client and inter-node traffic; rotate certificates and credentials per security policy.
* [ ] Scope ACL users to specific commands (`FT.SEARCH`, `FT.ADD`, `HSET`) and namespaces; audit access logs regularly.
* [ ] Classify stored embeddings for privacy/GDPR implications and document retention/redaction procedures.

## 10. Observability & Monitoring

_Docs: [Monitoring Redis](https://redis.io/docs/latest/operate/oss_and_stack/management/monitor/), [FT.INFO Command](https://redis.io/docs/latest/develop/reference/commands/ft-info/)_

* [ ] Collect FT.INFO metrics (doc count, index size, vector stats) and expose them via Prometheus or Redis Cloud dashboards.
* [ ] Track slowlog entries, command latency, and network usage to detect query hotspots or saturation.
* [ ] Correlate application traces with query identifiers to debug relevance or latency regressions.

## 11. Testing & Evaluation

_Docs: [Vector Search Evaluation](https://redis.io/docs/latest/develop/vector-search/best-practices/evaluation/), [Jepsen Analyses](https://jepsen.io/analyses/redis)_

* [ ] Maintain regression suites that validate recall@K, latency budgets, and metadata filter correctness on sample datasets.
* [ ] Simulate failovers, replica promotion, and index rebuilds in staging to verify recovery procedures.
* [ ] Capture offline evaluation artifacts (embedding snapshots, ground-truth labels) to compare against future model updates.

## 12. Documentation & Lifecycle Governance

_Docs: [Operational Runbooks](https://redis.io/docs/latest/operate/oss_and_stack/management/), [Architecture Decision Records](https://adr.github.io/)_

* [ ] Publish runbooks covering index deployment, schema migration, and rollback steps; keep them versioned with infra code.
* [ ] Record ADRs for embedding model choices, index parameters, and scaling strategies; revisit after major releases.
* [ ] Schedule quarterly audits of recall, latency, and cost metrics to align with product requirements and budget.
