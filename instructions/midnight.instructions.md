---
description: 'Midnight engineering practices for privacy-preserving Cardano apps.'
applyTo: '**/*'
---

# Midnight Delivery Checklist

Use this checklist when building applications, services, or infrastructure on the Midnight data-protection network.

## 1. Ecosystem Orientation & Governance

_Docs: [Midnight Docs – Overview](https://docs.midnight.network/docs/overview/), [CIP-1694 Governance](https://cips.cardano.org/cips/cip-1694/)_

* [ ] Document which Midnight network (devnet, partner testnet, future mainnet) you target and align release scope with its feature set and regulatory expectations.
* [ ] Track foundational governance proposals (CIP-1694 and subsequent Midnight-specific CIPs) that affect privacy rules, validator behavior, or data retention.
* [ ] Maintain a risk register identifying sensitive data classes handled by your solution and map them to applicable jurisdictional requirements (GDPR, HIPAA, etc.).

## 2. Node & Environment Setup

_Docs: [Midnight Docs – Node Operations](https://docs.midnight.network/docs/node-operations/), [Cardano Node Configuration](https://docs.cardano.org/cardano-components/cardano-node)_

* [ ] Pin Midnight node, prover, and CLI versions with reproducible environment definitions (Nix flakes, containers) and record the ledger era at deployment time.
* [ ] Mirror production topology across lower environments, including shielded relay nodes and data availability bridges; automate key rotation with alerting before expiry.
* [ ] Centralize configuration files (privacy layers, network peers, proving key directories) and store secrets using a hardened secret manager—never in source control.

## 3. Privacy Primitives & Data Classification

_Docs: [Midnight Docs – Privacy Fundamentals](https://docs.midnight.network/docs/privacy/fundamentals/), [Cardano Privacy Research](https://research.input-output-hk.io/en/papers/privacy-enhancing-smart-contracts/)_

* [ ] Define which records require public, shielded, or hybrid exposure; implement deterministic tagging so downstream services respect classification boundaries.
* [ ] Version proving and verification keys, storing hashes alongside deployment manifests so circuits can be reproduced and audited.
* [ ] Build retention and zero-knowledge revocation flows that allow regulators or data owners to request selective disclosure without deanonymizing other records.

## 4. Smart Contracts & Zero-Knowledge Programs

_Docs: [Midnight Docs – zk Programming](https://docs.midnight.network/docs/zk-programming/), [Plutus Design Patterns](https://plutus.readthedocs.io/en/latest/)_

* [ ] Keep on-chain logic pure and deterministic; avoid side effects or time-dependent assumptions that could diverge across proving and verification environments.
* [ ] Model datums, redeemers, and shielded payloads explicitly with schema versions and validation guards that reject malformed ciphertexts early.
* [ ] Profile circuit resource budgets (constraint counts, proof size, verification cost) and gate CI on thresholds tied to protocol limits.

## 5. Off-Chain Services & Data Handling

_Docs: [Midnight Docs – Off-Chain Services](https://docs.midnight.network/docs/off-chain-services/), [Cardano Serialization Lib](https://github.com/Emurgo/cardano-serialization-lib), [Cardano Developer Services](https://developers.cardano.org/docs/get-started/cardano-services/)_

* [ ] Build transaction pipelines that validate UTxO state and privacy policies immediately before submission; re-query Midnight nodes to avoid stale proofs.
* [ ] Isolate shielded data processing into dedicated services with hardened access controls, audit logging, and explicit data minimization strategies.
* [ ] Abstract wallet, identity, and compliance attestations (e.g., CIP-30, DID integrations) behind interfaces so multiple providers can be swapped without rewriting circuits.

## 6. Wallets, Identity & Selective Disclosure

_Docs: [Midnight Docs – Identity & Wallets](https://docs.midnight.network/docs/identity-and-wallets/), [CIP-30 dApp Connector](https://cips.cardano.org/cips/cip-30/), [Atala PRISM DID Docs](https://atalaprism.io/developers)_

* [ ] Support wallets that understand Midnight shielded transactions; detect capabilities at runtime and surface clear fallbacks for unsupported features.
* [ ] Bind identity proofs and attestations to shielded payloads using DIDs or verifiable credentials, ensuring the linkage is auditable without exposing raw data.
* [ ] Implement selective disclosure flows that emit disclosure receipts, consent records, and expiry policies for every access to sensitive data.

## 7. Testing, Simulation & Auditability

_Docs: [Midnight Docs – Testing](https://docs.midnight.network/docs/testing-and-simulation/), [Plutus Emulator Guide](https://plutus.readthedocs.io/en/latest/plutus/tutorials/plutus-emulator.html), [QuickCheck for Haskell](https://hackage.haskell.org/package/QuickCheck)_

* [ ] Cover circuits with property-based tests and emulator scenarios that confirm privacy boundaries, signature checks, and correct selective disclosure behavior.
* [ ] Rehearse end-to-end flows on Midnight partner networks with deterministic seeds, capturing proof artifacts for regression comparisons.
* [ ] Automate compliance checks (e.g., detection of over-disclosure, retention breaches) and fail builds when policy assertions regress.

## 8. Security, Monitoring & Incident Response

_Docs: [Midnight Docs – Security](https://docs.midnight.network/docs/security/), [Cardano Security Best Practices](https://docs.cardano.org/security/), [IOHK Audit Guidelines](https://github.com/input-output-hk/plutus/blob/master/doc/plutus-auditing.md)_

* [ ] Harden shielded endpoints with rate limits, WAF rules, and anomaly detection tuned for privacy-specific threats (proof replay, disclosure abuse, metadata leaks).
* [ ] Maintain tamper-evident logs for proof generation, selective disclosure requests, and key material operations; integrate with SIEM tooling.
* [ ] Run third-party cryptography audits on zero-knowledge circuits and remediate findings before shipping to production networks.

## 9. Deployment, Operations & Compliance

_Docs: [Midnight Docs – Operations](https://docs.midnight.network/docs/operations-and-compliance/), [Midnight Launch Updates](https://iohk.io/en/blog/tags/midnight/), [Cardano Deployment Runbooks](https://docs.cardano.org/operations/runbooks)_

* [ ] Automate deployment approvals with dual control, capturing hashes of proving keys, contract artifacts, and configuration bundles for notarized releases.
* [ ] Smoke-test privacy flows post-deploy using low-value shielded transactions before exposing endpoints to users.
* [ ] Maintain disclosure and breach response playbooks aligned with jurisdictional obligations; rehearse tabletop exercises quarterly.

## 10. Documentation Lookup & Research

_Docs: [Midnight Docs – Resource Hub](https://docs.midnight.network/docs/resources/), [Cardano Developer Portal](https://developers.cardano.org/), [Cardano Forum – Midnight](https://forum.cardano.org/c/midnight/), [IOG Blog](https://iohk.io/en/blog/)_

* [ ] Monitor official Midnight announcements and release notes for protocol or tooling changes that impact privacy guarantees.
* [ ] Catalog authoritative references for regulators and partners, including policy whitepapers and technical specs, inside your project wiki.
* [ ] Share learnings from audits, incidents, or regulator engagements to evolve team playbooks and reduce duplicated research.
