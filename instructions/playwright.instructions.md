---
description: 'Playwright testing guardrails for stable, insightful end-to-end suites.'
applyTo: '**/playwright.config.{ts,js,mts,mjs}, **/*.{pw,pw-ct}.{spec,test}.{ts,tsx,js,jsx}, **/tests/playwright/**/*'
---

# Playwright Delivery Checklist

Use this checklist when building or reviewing Playwright end-to-end and component tests.

## 1. Project Setup & Configuration

_Docs: [Configuration Reference](https://playwright.dev/docs/test-configuration), [Test Project Settings](https://playwright.dev/docs/test-projects), [CLI Guide](https://playwright.dev/docs/test-cli)_

* [ ] Keep a single `playwright.config.(ts|js)` per workspace; derive environment-specific overrides via `projects` and shared `use` blocks.
* [ ] Align base URLs, timeouts, and retries with product SLAs; document rationale for non-default values in the config.
* [ ] Enable `fullyParallel` only when tests are isolated; otherwise scope to per-project parallelism to avoid shared-state clashes.
* [ ] Surface environment variables through `process.env` with type-safe helpers; never store secrets directly in config files.
* [ ] Version-lock Playwright and browsers (`npx playwright install --with-deps`) within CI images to reduce flake from browser updates.

## 2. Test Authoring Patterns

_Docs: [Writing Tests](https://playwright.dev/docs/writing-tests), [Test Hooks](https://playwright.dev/docs/test-annotations#hooks), [Expect Assertions](https://playwright.dev/docs/test-assertions)_

* [ ] Model scenarios around user journeys with clear `test.describe` groupings; use `test.step` to annotate multi-phase flows.
* [ ] Prefer `test` fixtures for setup/teardown (auth, seed data) rather than ad-hoc `beforeAll` scripts.
* [ ] Keep tests deterministic—avoid relying on animation timing or arbitrary waits; favour `await expect()` with `toBeVisible`/`toHaveText`.
* [ ] Annotate expected slow tests using `test.slow()` and tag flaky ones `test.fixme()` with linked tracking issues.
* [ ] Co-locate `.spec.ts` files near features or use domain-focused directories mirroring the product architecture.

## 3. Locators & Assertions

_Docs: [Locators](https://playwright.dev/docs/locators), [Best Practices](https://playwright.dev/docs/best-practices), [Assertions API](https://playwright.dev/docs/test-assertions#locator-assertions)_

* [ ] Use `page.getByRole`/`getByTestId` selectors to keep tests resilient to layout changes; discourage brittle CSS/XPath selectors.
* [ ] Chain locators for context (e.g., `getByRole('dialog').getByRole('button', { name: 'Save' })`) instead of indexing arrays.
* [ ] Set assertion timeouts via `expect.poll` or per-assertion options rather than sprinkling `waitForTimeout`.
* [ ] Validate visual states with `toHaveScreenshot` only after stabilizing animations with `page.waitForLoadState('networkidle')`.
* [ ] Capture console errors by asserting `page.on('pageerror')` listeners to surface silent failures.

## 4. Fixtures, Data & State Management

_Docs: [Fixtures](https://playwright.dev/docs/test-fixtures), [Auth Strategies](https://playwright.dev/docs/auth), [Trace Viewer](https://playwright.dev/docs/trace-viewer#test-fixtures)_

* [ ] Centralize reusable fixtures with `test.extend` to share authenticated contexts, seeded data, or API clients.
* [ ] Cache authentication states via `test.use({ storageState })` and regenerate them automatically when tokens expire.
* [ ] Build deterministic data factories (REST/GraphQL helpers) instead of hitting production endpoints or relying on seeded UIs.
* [ ] Reset backend state between tests through API calls or database fixtures; never depend on prior test execution order.
* [ ] Record traces (`use: { trace: 'on-first-retry' }`) to support flaky reproduction while keeping CI artifacts lean.

## 5. Network, Mocking & Integrations

_Docs: [Network Interception](https://playwright.dev/docs/network), [API Testing](https://playwright.dev/docs/test-api-testing), [WebSocket Testing](https://playwright.dev/docs/network#websocket)_

* [ ] Stub non-deterministic services (analytics, third-party APIs) with `page.route` or server-side fixtures; avoid leaking real calls.
* [ ] Validate request payloads and headers using `expect(request.postDataJSON())` assertions within `page.waitForRequest` handlers.
* [ ] Simulate network faults (timeouts, 500s) to verify resilience logic and offline experiences.
* [ ] Keep API contract checks in dedicated tests using Playwright’s request context to decouple UI flows from backend drift.
* [ ] Document any live-environment dependencies and gate them behind tags or CLI flags to prevent accidental execution in CI.

## 6. Accessibility, Visual & Performance Checks

_Docs: [Accessibility Testing](https://playwright.dev/docs/test-accessibility), [Visual Comparisons](https://playwright.dev/docs/test-snapshots), [Tracing & Profiling](https://playwright.dev/docs/trace-viewer)_

* [ ] Integrate `@axe-core/playwright` or similar tooling to scan pages for WCAG regressions as part of critical journeys.
* [ ] Baseline visual diffs (`toHaveScreenshot`) per viewport/device and store them under version control with review gates.
* [ ] Capture performance metrics (First Contentful Paint, TTI) via `page.evaluate(() => performance.getEntriesByType('navigation'))` or browser tracing hooks.
* [ ] Collect traces, screenshots, and HAR files on failure for swift triage; prune artifacts on success to control storage costs.
* [ ] Exercise responsive layouts using device descriptors (`devices['iPhone 13']`) and assert layout-specific expectations.

## 7. Continuous Integration & Reporting

_Docs: [CI Recipes](https://playwright.dev/docs/ci), [Reporters](https://playwright.dev/docs/test-reporters), [Docker Guide](https://playwright.dev/docs/docker)_

* [ ] Run `npx playwright install --with-deps` in CI images and cache the `~/.playwright` directory to speed up jobs.
* [ ] Parallelize suites using sharding (`--shard`) and project-level concurrency; cap workers to match environment CPU limits.
* [ ] Publish HTML or Allure reports and make them accessible from CI artifacts; fail builds on test flakiness beyond agreed thresholds.
* [ ] Configure retries and `retries` metadata based on test criticality; log flaky occurrences to alert owners.
* [ ] Add smoke-tagged suites (`--grep @smoke`) for quick pre-merge signal alongside the full regression pack.

## 8. Maintenance & Collaboration

_Docs: [Best Practices](https://playwright.dev/docs/best-practices), [Test Annotations](https://playwright.dev/docs/test-annotations), [Troubleshooting Guide](https://playwright.dev/docs/troubleshooting)_

* [ ] Review Playwright release notes before upgrading; capture breaking changes and migration steps in ADRs or CHANGELOGs.
* [ ] Keep flake dashboards or issue trackers updated; never leave `test.skip` or `test.fail` without an owner and resolution date.
* [ ] Pair with design/QA to validate critical paths and encode them as shared helpers or page objects when complexity grows.
* [ ] Document custom fixtures, environment variables, and data management workflows in the repo’s testing handbook.

## 9. Documentation Lookup & Research

_Docs: [Playwright Documentation](https://playwright.dev/docs/intro), [Release Notes](https://github.com/microsoft/playwright/releases)_

* [ ] Search the official docs before implementing bespoke utilities—many features (test retries, video capture, component testing) are built-in.
* [ ] Monitor release notes and roadmap updates to adopt new APIs (trace viewer, component testing) and deprecations proactively.
* [ ] Cross-reference related tooling docs (Vitest, Axe, Allure, Docker) when integrating Playwright into broader pipelines.
* [ ] Maintain an internal knowledge base or runbook linking to common troubleshooting guides and recorded debugging sessions.

Adhering to this checklist keeps Playwright suites actionable, reliable, and informative for the entire team.
