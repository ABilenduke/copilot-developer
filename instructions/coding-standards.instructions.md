---
description: 'General coding standards emphasizing clean, resilient software design.'
applyTo: '**/*'
---

# Engineering Coding Standards Checklist

Use this checklist across codebases to keep implementations clean, maintainable, and fail-fast.

## 1. Core Engineering Principles

_Docs: [Clean Code Summary](https://github.com/JuanCrg90/Clean-Code-Notes), [SOLID Principles](https://www.baeldung.com/solid-principles), [Twelve-Factor App](https://12factor.net/)_

* [ ] Adhere to SOLID, DRY, and YAGNI—ship the simplest solution that satisfies current requirements without over-engineering.
* [ ] Build fail-fast systems: validate inputs early, throw explicit errors, and avoid swallowing exceptions silently.
* [ ] Apply single-responsibility boundaries to modules, classes, and functions to keep concerns isolated.
* [ ] Prefer immutable data structures and pure functions when possible to minimize side effects.
* [ ] Continuously refactor to improve design clarity; never defer "boy scout rule" cleanups when touching code.

## 2. Code Structure & Readability

_Docs: [Naming Guidelines](https://martinfowler.com/bliki/TwoHardThings.html), [Refactoring Techniques](https://refactoring.guru/refactoring/techniques)_

* [ ] Keep functions and methods small (≤ 20 lines) with descriptive names that reflect behavior and outcome.
* [ ] Organize files by feature/domain rather than technical layer when it improves discoverability.
* [ ] Use expressive naming—avoid abbreviations; prefer `calculateInvoiceTotal` over `calcInv`.
* [ ] Eliminate dead code, commented-out blocks, and unused imports in the same change.
* [ ] Write comments sparingly to explain why, not what; rely on code structure to communicate intent.

## 3. Error Handling & Observability

_Docs: [Designing Resilient Systems](https://sre.google/sre-book/handling-overload/), [Structured Logging Guide](https://12factor.net/logs)_

* [ ] Bubble exceptions with contextual metadata; convert catch-all blocks into specific error types or rethrows.
* [ ] Return typed error responses or result objects instead of magic strings/nulls.
* [ ] Log at appropriate levels (info/warn/error) with structured fields to aid tracing and analytics.
* [ ] Guard external calls with timeouts, retries, and circuit breakers that surface metrics when triggered.
* [ ] Instrument critical paths with tracing/metrics to confirm system health before shipping.

## 4. Testing & Quality Gates

_Docs: [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html), [Given-When-Then Style](https://martinfowler.com/bliki/GivenWhenThen.html), [Mutation Testing Overview](https://stryker-mutator.io/docs/General/mutation-testing-concepts)_

* [ ] Cover new code with appropriate tests (unit, integration, e2e) that validate behavior and edge cases.
* [ ] Write tests that fail fast and read like documentation, using AAA or Given-When-Then patterns.
* [ ] Keep CI pipelines running lint, type checks, tests, and builds on every merge request.
* [ ] Track code coverage trends; investigate significant drops or untested critical paths.
* [ ] Use mutation testing or contract tests sparingly to harden critical logic.

## 5. Tooling & Automation

_Docs: [EditorConfig](https://editorconfig.org/), [Conventional Commits](https://www.conventionalcommits.org/), [Semantic Versioning](https://semver.org/)_

* [ ] Standardize formatting (Prettier, Black, gofmt) and linting to catch style and correctness issues early.
* [ ] Enforce pre-commit hooks or CI checks to block inconsistent formatting or failing tests.
* [ ] Automate dependency updates (Renovate/Dependabot) and review release notes before upgrades.
* [ ] Keep CI/CD pipelines reproducible; codify shared build scripts and environment setup.
* [ ] Tag releases and document changes using Conventional Commits and Semantic Versioning where applicable.

## 6. Code Review & Collaboration

_Docs: [Code Review Best Practices](https://google.github.io/eng-practices/review/), [Pair Programming Guide](https://martinfowler.com/articles/on-pair-programming.html)_

* [ ] Submit small, focused pull requests with clear descriptions and relevant context/links.
* [ ] Review for correctness, design, tests, and naming; leave actionable, respectful feedback rooted in standards.
* [ ] Resolve TODOs or technical debt tickets before merging; avoid "will fix later" notes without owners.
* [ ] Use pair/mob programming for complex changes or knowledge sharing across teams.
* [ ] Capture decisions from review threads in ADRs or documentation when they affect standards.

## 7. Documentation & Knowledge Sharing

_Docs: [Architecture Decision Records](https://adr.github.io/), [Docs-as-Code Practices](https://www.writethedocs.org/guide/docs-as-code/)_

* [ ] Update README, runbooks, or platform docs whenever behavior, APIs, or operations change.
* [ ] Maintain living ADRs for significant architectural or process decisions; link them from relevant modules.
* [ ] Document onboarding guides and coding conventions in a central handbook accessible to all teams.
* [ ] Ensure examples/snippets stay executable; integrate doc linting or tests to catch drift.

## 8. Continuous Improvement & Technical Debt

_Docs: [Tech Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html), [Kaizen Practices](https://en.wikipedia.org/wiki/Kaizen)_

* [ ] Track technical debt openly; prioritize high-impact refactors in sprint planning.
* [ ] Conduct regular retrospectives to adapt standards based on feedback and incidents.
* [ ] Use feature flags and incremental delivery to de-risk large changes.
* [ ] Measure and improve build times, test stability, and deployment frequency.

## 9. Documentation Lookup & Research

_Docs: [Clean Code Book](https://www.oreilly.com/library/view/clean-code/9780136083238/), [Refactoring Catalog](https://refactoring.guru/catalog), [Awesome Engineering Practices](https://github.com/charlax/professional-programming)_

* [ ] Consult canonical references (Clean Code, SOLID, 12-Factor) when encountering ambiguous design choices.
* [ ] Share new learnings or patterns via lunch & learns, brown bags, or internal blog posts.
* [ ] Review industry guides regularly to keep standards current with evolving best practices.
* [ ] Curate an internal knowledge base linking to key articles, talks, and ADRs for quick discovery.

Adhering to this checklist keeps codebases resilient, maintainable, and aligned with shared engineering values.
