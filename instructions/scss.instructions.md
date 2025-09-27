---
description: 'SCSS delivery guardrails for scalable, maintainable stylesheets.'
applyTo: '**/*'
---

# SCSS Delivery Checklist

Use this checklist when architecting, shipping, and evolving SCSS codebases.

## 1. Tooling & Runtime Setup

_Docs: [Sass Install Guide](https://sass-lang.com/install), [Dart Sass CLI Reference](https://sass-lang.com/documentation/cli/dart-sass)_

* [ ] Standardize on Dart Sass (the reference implementation); document required versions of Node.js and package managers.
* [ ] Provide installation scripts or devcontainers that install Sass CLI, Node toolchains, and necessary native dependencies.
* [ ] Capture IDE/editor configuration (extensions, formatting on save) aligned with Sass official tooling.

## 2. Project Structure & Naming

_Docs: [Sass @use/@forward](https://sass-lang.com/documentation/at-rules/use), [Sass Module System](https://sass-lang.com/documentation/at-rules/forward)_

* [ ] Organize source under predictable directories (`styles/`, `scss/`, feature folders) with clear separation for base, layout, components, and utilities.
* [ ] Adopt naming conventions for partials (`_partial.scss`), modules, and entry files; enforce relative import hygiene.
* [ ] Document ownership of shared style libraries and ensure README coverage for each major folder.

## 3. Architecture & Modularization

_Docs: [7-1 Pattern Overview](https://sass-guidelin.es/#the-7-1-pattern), [Sass Guidelines](https://sass-guidelin.es)_

* [ ] Apply a modular architecture (e.g., 7-1 pattern) that keeps concerns isolated and promotes reuse.
* [ ] Replace legacy `@import` directives with `@use`/`@forward` to benefit from namespacing and faster builds.
* [ ] Limit global scope leakage by encapsulating variables and mixins within modules unless intentionally exported.

## 4. Variables & Design Tokens

_Docs: [Design Tokens Community Group](https://design-tokens.github.io/community-group/), [Sass Variables Documentation](https://sass-lang.com/documentation/variables)_

* [ ] Centralize semantic variables (colors, spacing, typography) and align them with cross-platform token sources where applicable.
* [ ] Enforce naming conventions and default fallbacks for variables; document mapping from tokens to SCSS variables.
* [ ] Guard against hard-coded values in component styles by linting for token usage and reviewing pull requests for deviations.

## 5. Mixins, Functions & Utilities

_Docs: [Sass Mixins](https://sass-lang.com/documentation/at-rules/mixin), [Sass Functions](https://sass-lang.com/documentation/modules)_

* [ ] Define reusable mixins and functions with clear input contracts and defaults to avoid duplicated logic.
* [ ] Prefer mixins over `@extend` for composition to reduce selector bloat and cascade coupling.
* [ ] Provide unit docs or examples for complex utilities and ensure they are covered by tests or visual regression checks.

## 6. Build Pipeline Integration

_Docs: [Sass CLI Build Options](https://sass-lang.com/documentation/cli/dart-sass#output-style), [Vite CSS Preprocessors](https://vitejs.dev/guide/features.html#css-pre-processors), [Webpack sass-loader](https://webpack.js.org/loaders/sass-loader/)_

* [ ] Configure bundlers (Vite, Webpack, Rollup) or build tools (Gulp, Parcel) with consistent Sass loader options and include paths.
* [ ] Document environment-specific build flags (`--style`, source maps, watch mode) and share npm/yarn/pnpm scripts.
* [ ] Validate CI builds execute the same pipeline as local dev to prevent drift (including PostCSS, autoprefixer, or CSS Modules integration).

## 7. Linting, Formatting & Quality Gates

_Docs: [Stylelint](https://stylelint.io/), [stylelint-scss Plugin](https://github.com/stylelint-scss/stylelint-scss), [Prettier for SCSS](https://prettier.io/docs/en/options.html#scss)_

* [ ] Enforce Stylelint (with `stylelint-scss`) for syntax rules, best practices, and disallowing deprecated patterns (e.g., deep nesting).
* [ ] Integrate Prettier or agreed formatting tools and ensure they complement lint rules without conflicts.
* [ ] Run lint/format checks in CI with zero-warnings policy and pre-commit hooks for immediate developer feedback.

## 8. Performance & Output Optimization

_Docs: [Sass Output Styles](https://sass-lang.com/documentation/cli/dart-sass#style), [Critical CSS Best Practices](https://web.dev/extract-critical-css/)_

* [ ] Monitor compiled CSS size; leverage minified output in production and source maps only in development builds.
* [ ] Avoid excessive selector nesting, `@extend` chains, and heavy mixin expansion that increase specificity or file size.
* [ ] Generate critical CSS or code-split styles where applicable to improve initial render performance.

## 9. Testing & Regression Safety

_Docs: [Storybook Visual Testing](https://storybook.js.org/docs/react/workflows/visual-testing), [Percy Visual Reviews](https://docs.percy.io/)_

* [ ] Run visual regression tests (Chromatic, Percy, Loki) for components relying on SCSS to catch unintended styling changes.
* [ ] Validate layout-sensitive pages against multiple breakpoints during CI (Playwright/Cypress screenshot diffing).
* [ ] Maintain manual QA checklists for responsive, accessibility, and dark-mode scenarios impacted by SCSS updates.

## 10. Documentation & Collaboration

_Docs: [Zeroheight Documentation Playbook](https://zeroheight.com/blog/design-system-documentation-playbook/), [Sass Style Guide](https://sass-guidelin.es/#introduction)_

* [ ] Document component style APIs, required variables, and usage patterns in design system or project portals.
* [ ] Provide onboarding guides covering module layout, token usage, and contribution standards for new engineers/designers.
* [ ] Record architectural decisions (mixins vs utility classes, token sources) in ADRs for future reference.

## 11. Security & Dependency Hygiene

_Docs: [npm Audit](https://docs.npmjs.com/cli/v10/commands/npm-audit), [Snyk Advisor for Sass](https://snyk.io/advisor/npm-package/sass)_

* [ ] Audit Sass-related packages (Sass, loaders, plugins) for vulnerabilities and pin versions in lockfiles.
* [ ] Restrict remote `@import` usage and sanitize any dynamic data used within SCSS (e.g., user-supplied values in theming systems).
* [ ] Review build scripts for execution of untrusted Sass functions or custom importers before enabling in CI/CD.

## 12. Governance & Continuous Improvement

_Docs: [Sass Release Notes](https://github.com/sass/dart-sass/releases), [Sass RFCs](https://github.com/sass/sass/issues)_

* [ ] Review Sass release notes regularly; schedule dependency upgrades and communicate breaking changes promptly.
* [ ] Track KPIs (bundle size, lint warning trends, build time) and create improvement backlogs each quarter.
* [ ] Conduct periodic audits to retire dead code, consolidate utilities, and ensure alignment with design tokens and component libraries.
