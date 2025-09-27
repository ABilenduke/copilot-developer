---
description: 'Vitest testing conventions to keep suites fast, reliable, and maintainable.'
applyTo: '**/*.{spec,test}.{ts,tsx,js,jsx}, **/vitest.config.*, **/tests/**/*'
---

# Vitest Quality Checklist

Use this checklist when creating or reviewing tests powered by Vitest.

## 1. Environment & Configuration

_Docs: [Config Reference](https://vitest.dev/config/), [Environment Guide](https://vitest.dev/guide/environment.html)_

* [ ] Share a single `vitest.config.(ts|js)` with project-wide aliases, `globals`, and `environment` defaults; document deviations per package.
* [ ] Keep `tsconfig.vitest.json` (or overrides) aligned with the main `tsconfig` for path aliases and JSX settings.
* [ ] Enable `environmentMatchGlobs` when mixing DOM and Node suites; never rely on per-file side effects to switch environments.
* [ ] Declare test setup modules via `setupFiles` rather than importing helpers in every spec.
* [ ] Guard CI by setting `CI=true` and turning on `watch: false`, `threads: true`, and `isolate: true` to avoid leaking state.

## 2. Test Authoring Practices

_Docs: [Writing Tests Guide](https://vitest.dev/guide/writing-tests.html), [Expect API](https://vitest.dev/api/expect.html)_

* [ ] Co-locate tests next to source (`Component.spec.ts`) unless integration scope demands `/tests` folders; keep filenames consistent across TypeScript and JavaScript.
* [ ] Structure suites with `describe` blocks mirroring user scenarios and use `it` statements describing observable outcomes.
* [ ] Use `expect` matchers that express behaviour (e.g., `.toHaveBeenCalledWith`) instead of low-level equality checks.
* [ ] Prefer pure helpers and factories per test; avoid mutating shared objects across cases.
* [ ] Favor inline snapshots or `toMatchInlineSnapshot` only for stable, intentional output—otherwise, assert on specific fields.

## 3. Async, Timers & DOM Interaction

_Docs: [Mocking Guide](https://vitest.dev/guide/mocking.html#timers), [Browser Mode](https://vitest.dev/guide/browser.html)_

* [ ] Wrap async expectations in `await` (use `await vi.runAllTimersAsync()` when manipulating fake timers).
* [ ] Reach for fake timers via `vi.useFakeTimers()` only after explicitly testing with real timers; reset with `vi.useRealTimers()` in `afterEach`.
* [ ] When testing DOM/UI (Vue, React, Svelte), rely on Testing Library queries (`findBy`, `queryBy`) and avoid directly accessing `innerHTML`.
* [ ] Use `vi.stubGlobal` or `vi.mock` for browser APIs rather than mutating `window` manually.

## 4. Mocking & Test Data

_Docs: [Mocking Guide](https://vitest.dev/guide/mocking.html), [Manual Mocks API](https://vitest.dev/guide/mocking.html#manual-mocks)_

* [ ] Configure module mocks with `vi.mock` at the top scope; reset using `vi.clearAllMocks()` / `vi.resetModules()` in `afterEach`.
* [ ] Provide deterministic test data from factories/builders; store shared fixtures in `/tests/fixtures` or `__mocks__` directories.
* [ ] Use MSW or API contract mocks for network boundaries; never rely on real HTTP calls in automated suites.
* [ ] Leverage `vi.spyOn` for observable side effects and restore with `mockRestore` to prevent bleed-over.

## 5. Coverage & Quality Gates

_Docs: [Coverage Guide](https://vitest.dev/guide/coverage.html)_

* [ ] Enable coverage via `coverage: { provider: 'v8', all: true }` and enforce thresholds (line/branch/function) that match project SLAs.
* [ ] Exclude generated or vendor files in `coverage.exclude`; document the rationale for each exclusion.
* [ ] Fail PRs when coverage decreases beyond the allowed delta; report coverage summaries in CI logs or PR comments.

## 6. Performance & Stability

_Docs: [CLI Reference](https://vitest.dev/guide/cli.html), [Test Filtering & Sharding](https://vitest.dev/guide/cli.html#filters)_

* [ ] Keep tests deterministic—avoid `Date.now()` or random data without seeding (use `vi.setSystemTime`).
* [ ] Parallelize heavy suites with `--threads` and shard by file (`--runInBand` only for stateful integrations).
* [ ] Detect slow tests using `slowTestThreshold`; address root causes instead of raising the threshold.
* [ ] Use `test.each` or `describe.each` for data-driven cases instead of loops inside tests.

## 7. CI & Developer Experience

_Docs: [CLI Reference](https://vitest.dev/guide/cli.html), [Debugging Guide](https://vitest.dev/guide/debugging.html)_

* [ ] Expose standard scripts: `npm run test` (Vitest), `npm run test:watch`, `npm run test:ci` with coverage and reporters.
* [ ] Cache `node_modules` and `.vitest` directories in CI to speed up subsequent pipelines.
* [ ] Publish JUnit or HTML reports (`--reporter=junit,default`) for CI visibility.
* [ ] Document how to debug with `vitest --run --inspect` and configure IDE launchers for breakpoint workflows.

## 8. Maintenance & Documentation

_Docs: [CLI Reference](https://vitest.dev/guide/cli.html#reporters), [GitHub Releases](https://github.com/vitest-dev/vitest/releases)_

* [ ] Audit flaky tests regularly; track them in issue trackers and never leave `test.skip`/`test.todo` without owner and follow-up.
* [ ] Update ADRs or testing strategy docs when adding new environments, coverage rules, or tooling.
* [ ] Encourage code review checklists to include assertions on test readability and failure messaging.

## 9. Documentation Lookup & Research

_Docs: [Vitest Guide](https://vitest.dev/guide/), [Vitest Site Search](https://vitest.dev/)_

* [ ] When facing unfamiliar behaviour, search the official Vitest docs before adopting workarounds; note relevant sections in the PR or ADR.
* [ ] Subscribe to release notes and changelog feeds to stay ahead of breaking changes or newly added APIs.
* [ ] Cross-reference related ecosystem docs (Vue Testing Library, MSW, Playwright) when integrating external tooling.
* [ ] Curate a shared knowledge base of frequently used Vitest documentation pages inside the repository’s docs folder or handbook.

Adhering to this checklist keeps Vitest suites reliable, fast, and informative for the whole team.
