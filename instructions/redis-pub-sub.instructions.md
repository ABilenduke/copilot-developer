---
description: 'Redis Pub/Sub delivery guardrails for low-latency messaging.'
applyTo: '**/*'
---

# Redis Pub/Sub Delivery Checklist

Use this checklist when architecting, deploying, and operating Redis Pub/Sub messaging workloads.

## 1. Strategy & Use Cases

_Docs: [Redis Pub/Sub Introduction](https://redis.io/docs/latest/develop/interact/pubsub/), [Designing Pub/Sub Systems](https://redis.io/docs/latest/develop/use/pubsub/)_

* [ ] Confirm pub/sub semantics (fire-and-forget, best-effort delivery) match the business requirements; document gaps (no persistence, no delivery guarantees).
* [ ] Align stakeholders on alternative patterns (Redis Streams, message queues) when replay, ordering, or acknowledgements are needed.
* [ ] Catalog expected publisher/subscriber counts, topics, and message fan-out to estimate capacity and SLA targets.

## 2. Infrastructure & Topology Planning

_Docs: [Redis High Availability](https://redis.io/docs/latest/operate/oss_and_stack/management/high-availability/), [Cluster Architecture](https://redis.io/docs/latest/operate/oss_and_stack/management/cluster/)_

* [ ] Choose deployment mode (standalone, Sentinel-managed replicas, Redis Cluster, managed cloud) based on latency, availability, and scale requirements.
* [ ] Co-locate publishers/subscribers with Redis nodes or replicas to reduce cross-zone latency; document topology diagrams.
* [ ] For Redis Cluster, plan channel-to-slot distribution and resharding procedures to keep related topics on the same hash slot when possible.

## 3. Configuration & Persistence Choices

_Docs: [Redis Configuration](https://redis.io/docs/latest/operate/oss_and_stack/management/config/), [Persistence Options](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)_

* [ ] Tune `notify-keyspace-events` only when keyspace notifications coexist with pub/sub traffic to avoid unnecessary load.
* [ ] Decide on RDB/AOF persistence settings to protect configuration data and optional auxiliary state; note that messages are ephemeral even with persistence enabled.
* [ ] Configure network timeouts, backlog, and client output buffers to guard against slow subscribers causing server-side resource exhaustion.

## 4. Channel Naming & Schema Governance

_Docs: [Pub/Sub Commands](https://redis.io/docs/latest/commands/pubsub/), [Naming Keys and Channels](https://redis.io/docs/latest/develop/data-modeling/keys/)_

* [ ] Define channel naming conventions (namespaces, environment suffixes, versioning) and document ownership of each topic.
* [ ] Separate internal control channels from user-facing data channels; restrict wildcard usage to avoid unintentional subscriptions.
* [ ] Version message payload schemas; use JSON schema or Protobuf definitions and maintain backward compatibility contracts.

## 5. Publisher Implementation

_Docs: [PUBLISH Command](https://redis.io/docs/latest/commands/publish/), [RESP Protocol](https://redis.io/docs/latest/develop/interact/protocol/)_

* [ ] Batch or pipeline publish calls when throughput is high to reduce network round trips and CPU overhead.
* [ ] Instrument publishers with retry/backoff policies for transient network errors while preventing duplicate messages when possible.
* [ ] Log published message IDs/metadata for observability and correlation with downstream processing.

## 6. Subscriber Implementation

_Docs: [SUBSCRIBE & PSUBSCRIBE](https://redis.io/docs/latest/commands/subscribe/), [Redis Clients](https://redis.io/docs/latest/develop/clients/)_

* [ ] Use dedicated long-lived connections for subscriptions; avoid mixing request/response traffic on the same connection.
* [ ] Implement graceful reconnection logic with exponential backoff and jitter; resubscribe automatically after failover or network partitions.
* [ ] Handle unordered, duplicate, and bursty message delivery gracefully; persist offsets or last processed IDs externally if required.

## 7. Reliability & Delivery Guarantees

_Docs: [When to Use Streams vs Pub/Sub](https://redis.io/docs/latest/develop/use/pubsub/#pubsub-vs-streams), [Redis Streams Introduction](https://redis.io/docs/latest/data-types/streams/)_

* [ ] Document limitations (no history replay, subscriber receive guarantee, or backpressure) and communicate them to consumers.
* [ ] Pair pub/sub with idempotent subscriber logic and side-effect guards to reduce impact of duplicate deliveries.
* [ ] Offer companion streams or durable queues for critical topics that need auditing, replay, or consumer acknowledgement.

## 8. Scaling & Performance

_Docs: [Performance Tuning](https://redis.io/docs/latest/operate/oss_and_stack/management/performance/), [Pub/Sub Scaling Tips](https://redis.io/docs/latest/develop/use/pubsub/#scaling-pubsub)_

* [ ] Benchmark message throughput and latency under realistic fan-out scenarios using tooling (redis-benchmark, custom load generators).
* [ ] Monitor subscriber counts per channel to avoid overwhelming single-threaded servers; shard hot channels across nodes or introduce channel partitioning.
* [ ] Tune network stack (TCP keepalive, buffer sizes) and leverage client-side sharding or proxies (Twemproxy, Envoy) for horizontal scale.

## 9. Security & Access Control

_Docs: [Redis ACLs](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/), [TLS for Redis](https://redis.io/docs/latest/operate/oss_and_stack/management/security/encryption/)_

* [ ] Enforce TLS for in-flight traffic and rotate certificates regularly; disable plaintext ports when possible.
* [ ] Configure ACL users with least privilege (`~channel` patterns, `+publish`, `+subscribe` commands) and audit ACL changes.
* [ ] Rate-limit or sandbox untrusted publishers to mitigate flooding or denial-of-service attacks; maintain anomaly detection for unusual topic usage.

## 10. Observability & Monitoring

_Docs: [Monitoring Redis](https://redis.io/docs/latest/operate/oss_and_stack/management/monitor/), [PUBSUB Command Metrics](https://redis.io/docs/latest/commands/pubsub/)_

* [ ] Collect `PUBSUB CHANNELS`, `PUBSUB NUMSUB`, and `PUBSUB NUMPAT` metrics to understand topic utilization and wildcard subscriptions.
* [ ] Track client connections, memory usage, output buffer sizes, and command latency via Redis INFO, slowlog, and Prometheus exporters.
* [ ] Emit structured logs or traces for publish/subscribe events, including correlation IDs and processing durations for downstream analysis.

## 11. Testing & Failure Drills

_Docs: [Redis Testing Strategies](https://redis.io/docs/latest/operate/oss_and_stack/management/troubleshoot/#testing), [Jepsen Reports on Redis](https://jepsen.io/analyses/redis)_

* [ ] Build automated integration tests that spin up ephemeral Redis instances, publish scenarios, and validate subscriber behavior (pattern matches, reconnections, failure handling).
* [ ] Rehearse node failovers, partitions, and subscriber restarts in staging to verify reconnection and resubscription logic.
* [ ] Simulate slow consumer scenarios to ensure buffering and backpressure strategies prevent server instability.

## 12. Documentation & Governance

_Docs: [Operational Runbooks](https://redis.io/docs/latest/operate/oss_and_stack/management/), [Architecture Decision Records](https://adr.github.io/)_

* [ ] Maintain channel catalogs, schema definitions, and ownership in shared documentation or service catalogs.
* [ ] Record ADRs for key decisions (pub/sub vs streams, channel partitioning strategy, security posture) and revisit quarterly.
* [ ] Keep incident runbooks current with troubleshooting steps for subscription drops, flooding, or misrouted messages.
