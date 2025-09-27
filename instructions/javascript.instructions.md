---
description: 'JavaScript engineering guardrails for resilient, modern applications.'
applyTo: '**/*'
---

# JavaScript Delivery Checklist

Use this checklist to plan, build, and maintain robust JavaScript codebases across environments.

## 1. Toolchain & Runtime Strategy

_Docs: [MDN JavaScript Guide](https://developer.mozilla.org/docs/Web/JavaScript/Guide), [Node.js Releases](https://nodejs.org/en/download/releases), [TC39 Proposals](https://tc39.es/proposals/)_

* [ ] Pin supported ECMAScript targets and runtime versions (Node, Deno, browsers); publish compatibility tables in onboarding docs.
* [ ] Automate environment setup (Volta, fnm, nvm, devcontainers) to avoid drift across contributors and CI.
* [ ] Monitor TC39 proposal stages and plan adoption/avoidance policies for Stage 3+ features.

## 2. Project Structure & Modular Architecture

_Docs: [Node.js Module Systems](https://nodejs.org/docs/latest/api/modules.html), [ES Module Spec](https://tc39.es/ecma262/#sec-modules)_

* [ ] Organize code by feature or domain with clear separation between application, infrastructure, and shared utilities.
* [ ] Choose ES Modules or CommonJS consistently; document interop boundaries and transpilation needs.
* [ ] Enforce barrel/entry patterns thoughtfully to prevent circular dependencies and deep import chains.

## 3. Language Conventions & Type Safety

_Docs: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)_

* [ ] Standardize coding conventions (naming, immutability, async patterns) and enforce through linters or formatters.
* [ ] Adopt TypeScript or JSDoc-based typing for critical surfaces; require strict configurations for new modules.
* [ ] Guard against implicit `any`, dynamic property access, and prototype mutations unless documented exceptions exist.

## 4. Build & Bundling Pipeline

_Docs: [Babel Handbook](https://babel.dev/docs/), [Vite Guide](https://vitejs.dev/guide/), [Webpack Docs](https://webpack.js.org/concepts/)_

* [ ] Select bundlers/transpilers that match project scale (esbuild/Vite for apps, Rollup for libraries) and capture rationale.
* [ ] Version-lock build tooling; store configs in source control with environment overlays.
* [ ] Configure source maps, tree-shaking, code splitting, and asset hashing to balance DX and production performance.

## 5. Dependency Management & Packaging

_Docs: [npm CLI](https://docs.npmjs.com/), [pnpm Guide](https://pnpm.io/), [package.json Spec](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)_

* [ ] Use lockfiles and workspace tooling to maintain deterministic installs across environments.
* [ ] Audit third-party packages for license, maintenance, and supply-chain risk before adoption.
* [ ] Document publishing strategy (npm scopes, versioning, module entry fields) for libraries and internal packages.

## 6. Testing Strategy & Quality Gates

_Docs: [Jest Docs](https://jestjs.io/docs/getting-started), [Vitest Guide](https://vitest.dev/guide/), [Testing Library](https://testing-library.com/docs/)_

* [ ] Define a layered test pyramid (unit, integration, e2e) with explicit tooling per layer.
* [ ] Run tests in CI with coverage thresholds; fail builds on flaky or non-deterministic suites.
* [ ] Include contract or snapshot tests for public APIs and serialization formats when regressions are costly.

## 7. Linting, Formatting & Static Analysis

_Docs: [ESLint](https://eslint.org/docs/latest/), [Prettier](https://prettier.io/docs/en/), [SonarJS Rules](https://rules.sonarsource.com/javascript)_

* [ ] Configure ESLint with shareable configs (Airbnb, Standard, custom) and enforce `--max-warnings=0` in CI.
* [ ] Integrate Prettier or formatting rules that complement lint policies; document conflict resolution.
* [ ] Add static analysis (tsc `--noEmit`, Sonar, dependency scanners) to detect complexity and anti-patterns early.

## 8. Security & Compliance

_Docs: [OWASP NodeGoat](https://owasp.org/www-project-nodegoat/), [npm Audit](https://docs.npmjs.com/cli/v10/commands/npm-audit), [Helmet Docs](https://helmetjs.github.io/)_

* [ ] Sanitize and validate all inputs (HTTP, CLI, IPC); avoid `eval` and dynamic `Function` unless sandboxed.
* [ ] Use security linters/scanners (npm audit, Snyk) and track remediation SLAs.
* [ ] Implement runtime protections (Helmet, CSP, rate limiting) and secrets management across environments.

## 9. Performance & Observability

_Docs: [Chrome Performance](https://developer.chrome.com/docs/devtools/performance/), [Node.js Diagnostics](https://nodejs.org/en/docs/guides/diagnostics/), [OpenTelemetry JS](https://opentelemetry.io/docs/instrumentation/js/)_

* [ ] Profile critical paths (Lighthouse, Web Vitals, Node inspector) before and after major releases.
* [ ] Instrument logs, metrics, and traces with correlation IDs; centralize dashboards for runtime health.
* [ ] Monitor bundle sizes, memory usage, and event loop lag; automate regression alerts in CI/CD.

## 10. Accessibility & Internationalization

_Docs: [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/), [Intl API Guide](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl), [FormatJS](https://formatjs.io/docs/)_

* [ ] Enforce a11y linting (eslint-plugin-jsx-a11y, axe) and manual audits for interactive components.
* [ ] Externalize copy and use localization frameworks to handle pluralization, dates, and currencies.
* [ ] Respect user preferences (reduced motion, high contrast) via feature detection and CSS/JS hooks.

## 11. Documentation & Developer Experience

_Docs: [JSDoc Reference](https://jsdoc.app/), [Storybook Docs](https://storybook.js.org/docs), [Docz Guide](https://www.docz.site/docs/getting-started/introduction)_

* [ ] Maintain README/handbooks covering setup, scripts, architecture decisions, and troubleshooting.
* [ ] Generate API documentation (JSDoc, TypeDoc) and integrate with design systems or Storybook for UI components.
* [ ] Provide runnable examples and playgrounds to accelerate onboarding and experimentation.

## 12. Governance & Continuous Improvement

_Docs: [Conventional Commits](https://www.conventionalcommits.org/), [Semantic Versioning](https://semver.org/), [Architecture Decision Records](https://adr.github.io/)_

* [ ] Track ADRs for major language/tooling decisions and revisit quarterly for relevance.
* [ ] Automate changelog generation, release checks, and dependency updates (Renovate, Dependabot).
* [ ] Run retrospectives on incidents and technical debt; prioritize improvements in roadmap or backlog.
