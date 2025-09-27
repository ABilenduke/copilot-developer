---
description: 'Cardano engineering practices for secure, reliable blockchain apps.'
applyTo: '**/*'
---

# Cardano Delivery Checklist

Use this checklist when building Cardano-powered services, smart contracts, or infrastructure.

## 1. Node & Environment Setup

_Docs: [Cardano Node Docs](https://docs.cardano.org/cardano-components/cardano-node), [Testnet Guide](https://docs.cardano.org/cardano-testnet/), [Docker Images](https://hub.docker.com/r/inputoutput/cardano-node)_

* [ ] Pin `cardano-node` and `cardano-cli` versions; document the block height and network era they target.
* [ ] Use Nix flakes or container images to standardize build environments and avoid implicit system dependencies.
* [ ] Mirror production topology in lower environments (mainnet vs preprod) and rotate KES keys before expiry.
* [ ] Centralize configuration (`config.json`, `topology.json`, `db-sync`) and check them into infrastructure repos, not app code.

## 2. Project Structure & Tooling

_Docs: [Cardano Developer Portal](https://developers.cardano.org/), [Plutus Application Backend](https://github.com/input-output-hk/plutus-apps), [Aiken Language](https://aiken-lang.org/docs)_

* [ ] Separate on-chain code, off-chain services, and infrastructure into dedicated packages with clear interfaces.
* [ ] Use reproducible tooling (Cabal, Stack, Aiken toolchain, Node scripts) defined via `shell.nix`/`package.json`.
* [ ] Automate builds and formatters (Ormolu/Fourmolu for Haskell, ESLint/Prettier for TS) to keep diffs clean.
* [ ] Maintain environment-specific configuration overlays instead of branching logic throughout the codebase.

## 3. On-Chain Smart Contracts

_Docs: [Plutus Tx Guide](https://plutus.readthedocs.io/en/latest/), [Plutus Design Patterns](https://github.com/input-output-hk/plutus-pioneer-program/tree/main/code/week03), [Aiken Cookbook](https://aiken-lang.org/docs/cookbook)_

* [ ] Keep validators pure and deterministic—avoid `IO` or non-deterministic builtins to ensure script consistency.
* [ ] Model datum/redeemer types explicitly and version them; avoid partial functions in pattern matching.
* [ ] Enforce budget limits (CPU, memory) via profiling tools before deploying; track script sizes against protocol limits.
* [ ] Guard value conservation and signature checks in validators; fail fast with descriptive error codes for debugging.
* [ ] Store compiled artifacts (`*.plutus`, `*.aiken`) in version control and hash-lock deployments for reproducibility.

## 4. Off-Chain Services & Transaction Building

_Docs: [Cardano CLI Reference](https://developers.cardano.org/docs/get-started/cardano-cli/), [Cardano Serialization Lib](https://github.com/Emurgo/cardano-serialization-lib), [Ogmios/Websocket Bridge](https://ogmios.dev/)_

* [ ] Use the serialization library or PAB to construct transactions—never concatenate CBOR manually.
* [ ] Validate UTxO states before submission; re-query the ledger to avoid double-spend conflicts.
* [ ] Abstract wallet integrations (CIP-30 dApps, hardware wallets) behind interfaces to support multiple providers.
* [ ] Log transaction IDs, submission times, and retry attempts; react to mempool errors with actionable telemetry.
* [ ] Rate-limit off-chain services and implement backoff to respect node capacity.

## 5. Testing & Simulation

_Docs: [Plutus Emulator Guide](https://plutus.readthedocs.io/en/latest/plutus/tutorials/plutus-emulator.html), [QuickCheck for Haskell](https://hackage.haskell.org/package/QuickCheck), [Testnets Overview](https://docs.cardano.org/cardano-testnet/about)_

* [ ] Cover validators with property-based tests and emulator scenarios that assert value flow and signature checks.
* [ ] Rehearse end-to-end flows on preprod/testnet before mainnet deployment; automate faucet funding and key rotation.
* [ ] Use deterministic seeds when running emulators to make failing scenarios reproducible.
* [ ] Track code coverage on on-chain logic (Plutus coverage reports) and investigate uncovered branches.
* [ ] Integrate load/regression tests for off-chain services to emulate spikes and network contention.

## 6. Security & Compliance

_Docs: [Cardano Improvement Proposals (CIP)](https://cips.cardano.org/), [Cardano Security Best Practices](https://docs.cardano.org/security/), [IOHK Auditing Guidelines](https://github.com/input-output-hk/plutus/blob/master/doc/plutus-auditing.md)_

* [ ] Align wallets and metadata with relevant CIPs (e.g., CIP-25 NFT metadata, CIP-68 multi-asset). Document versions adopted.
* [ ] Rotate signing keys, protect cold keys offline, and enforce multi-sig policies for treasury or upgrade scripts.
* [ ] Run third-party audits or internal reviews for critical validators; remediate findings before deployment.
* [ ] Monitor protocol parameter changes (K, a0, new ledger eras) and evaluate their impact on scripts.
* [ ] Implement defense-in-depth: rate limits, WAF, and anomaly detection around submission endpoints.

## 7. Deployment & Monitoring

_Docs: [cardano-db-sync](https://github.com/input-output-hk/cardano-db-sync), [Cardano Monitoring Stack](https://docs.cardano.org/cardano-monitoring/), [Hydra Head Protocol](https://hydra.family/head-protocol/)_

* [ ] Automate deployment pipelines with explicit approvals for mainnet releases; sign artifacts and verify checksums post-deploy.
* [ ] Collect node metrics (KES remaining, block propagation, mempool state) and surface alerts in on-call dashboards.
* [ ] Leverage db-sync or Ogmios for read models; ensure they run against the same snapshot as production nodes.
* [ ] Smoke-test validators immediately after deployment using low-value transactions before opening to users.
* [ ] Plan upgrade windows for hard forks; rehearse rolling restarts and fallback procedures.

## 8. Documentation & Governance

_Docs: [Cardano Documentation Hub](https://docs.cardano.org/), [Cardano Forum](https://forum.cardano.org/), [Project Catalyst Guides](https://projectcatalyst.io/)_

* [ ] Maintain ADRs describing validator intent, off-chain architecture, and deployment processes.
* [ ] Document monitoring dashboards, alert runbooks, and key rotation schedules in an accessible wiki.
* [ ] Keep onboarding guides current with environment setup scripts and sample transactions.
* [ ] Engage with community governance (Catalyst, CIPs) to stay aligned with ecosystem standards.

## 9. Documentation Lookup & Research

_Docs: [Cardano Docs Search](https://docs.cardano.org/search), [Cardano Stack Exchange](https://cardano.stackexchange.com/)_

* [ ] Consult the official docs and Stack Exchange before implementing custom ledger logic; many patterns are available.
* [ ] Track CIP proposals and Node release notes to anticipate breaking changes.
* [ ] Share learnings from audits, incidents, or Catalyst feedback in internal knowledge bases.
* [ ] Maintain a list of canonical resources (Plutus Pioneer Program, Emurgo guides) and revisit them each era.

Adhering to this checklist keeps Cardano applications secure, observable, and ready for mainnet scale.
