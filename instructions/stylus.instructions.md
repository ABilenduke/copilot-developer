---
description: 'Stylus workflow guardrails for maintainable, production-ready styling.'
applyTo: '**/*'
---

# Stylus Delivery Checklist

Use this checklist to evaluate Stylus adoption, maintenance, and evolution across projects.

## 1. Tooling & Prerequisites

_Docs: [Stylus CLI](https://stylus-lang.com/docs/executable.html), [npm stylus Package](https://www.npmjs.com/package/stylus)_

* [ ] Standardize on Node.js and Stylus versions; document minimum supported releases and lock dependencies.
* [ ] Provide bootstrap scripts or devcontainer setups that install the Stylus CLI and required build plugins.
* [ ] Ensure contributors have editor extensions for `.styl` syntax highlighting, linting, and snippets.

## 2. Syntax & Project Layout

_Docs: [Stylus Syntax Guide](https://stylus-lang.com/docs/syntax.html), [Whitespace & Indentation](https://stylus-lang.com/docs/indentation.html)_

* [ ] Establish conventions for indented vs bracketed syntax; enforce spaces vs tabs and newline policies.
* [ ] Organize files by responsibility (base, layout, components, utilities) with clear entry points.
* [ ] Document filename rules (`*.styl`, partial prefixes) and discourage mixing Stylus with unrelated preprocessors in the same folder.

## 3. Imports, Modules & Shared Assets

_Docs: [@import & @require](https://stylus-lang.com/docs/import.html), [Path Resolution](https://stylus-lang.com/docs/import.html#path-resolution)_

* [ ] Centralize shared variables, mixins, and functions in dedicated modules with explicit `@require` usage.
* [ ] Configure import paths (`--include` or loader aliases) and document how they align with monorepos/bundlers.
* [ ] Avoid duplicate imports by using `@require` for singleton modules and capturing dependencies in README files.

## 4. Variables, Mixins & Functions

_Docs: [Variables](https://stylus-lang.com/docs/variables.html), [Mixins](https://stylus-lang.com/docs/mixins.html), [Functions & Expressions](https://stylus-lang.com/docs/functions.html)_

* [ ] Define semantic variables that map to design tokens and expose them via focused modules.
* [ ] Create reusable mixins/functions with documented parameters and sensible defaults; avoid global scope leakage.
* [ ] Guard against `@extend` abuse by favoring mixins or utility classes to control selector growth.

## 5. Built-ins, Libraries & Nib Usage

_Docs: [Built-In Functions](https://stylus-lang.com/docs/bifs.html), [Nib Library](https://github.com/stylus/nib)_

* [ ] Catalogue approved built-in helpers and third-party libraries (Nib, Axis) with owners and replacement plans.
* [ ] Disable or remove unmaintained libraries; prefer PostCSS autoprefixer over Nib when long-term support is required.
* [ ] Document custom helper libraries and publish examples/tests for critical mixins.

## 6. Build Pipeline Integration

_Docs: [Stylus Loader for Webpack](https://webpack.js.org/loaders/stylus-loader/), [Vite CSS Preprocessors](https://vitejs.dev/guide/features.html#css-pre-processors)_

* [ ] Configure bundlers (Webpack, Vite, Rollup) or task runners (Gulp, Grunt) with consistent Stylus options and include paths.
* [ ] Align dev/prod configurations for source maps, minification, and hot reload behavior.
* [ ] Validate Stylus compilation runs in CI and production builds using the same plugin order as local builds.

## 7. CSS Interoperability & Post-Processing

_Docs: [Stylus CSS Output Options](https://stylus-lang.com/docs/executable.html#command-line-parameters), [PostCSS Integration](https://postcss.org/)_

* [ ] Define how Stylus output feeds into downstream tools (PostCSS, cssnano, Tailwind) and document pipeline boundaries.
* [ ] Ensure autoprefixing, minification, and vendor-specific steps occur after Stylus compilation for consistent results.
* [ ] Provide fallbacks or alternative builds when consuming apps require plain CSS.

## 8. Theming & Design Tokens

_Docs: [Stylus Conditionals](https://stylus-lang.com/docs/conditionals.html), [Design Tokens Community Group](https://design-tokens.github.io/community-group/)_

* [ ] Map design tokens to Stylus variables/mixins with clear naming and fallback hierarchies.
* [ ] Support runtime theming by exporting CSS custom properties or data attributes where needed.
* [ ] Document strategies for dark mode, brand variants, and localization-driven styles.

## 9. Linting, Formatting & Quality Gates

_Docs: [Stylint](https://github.com/SimenB/stylint), [stylelint-stylus Plugin](https://github.com/ota-meshi/stylelint-stylus)_

* [ ] Enforce linting (Stylint or Stylelint with Stylus plugin) for syntax correctness and coding standards.
* [ ] Configure formatters or editor settings to maintain consistent indentation and property ordering.
* [ ] Run lint/format checks in CI and block merges on errors or warnings.

## 10. Testing & Regression Controls

_Docs: [Storybook Visual Testing](https://storybook.js.org/docs/react/workflows/visual-testing), [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)_

* [ ] Cover key components and layouts with visual regression tests (Chromatic, Percy, Playwright snapshots).
* [ ] Add integration or end-to-end tests that exercise Stylus-driven themes and responsive breakpoints.
* [ ] Maintain manual QA scripts for high-risk areas like animations or complex grid layouts.

## 11. Security & Dependency Hygiene

_Docs: [npm Audit](https://docs.npmjs.com/cli/v10/commands/npm-audit), [Snyk Advisor for Stylus](https://snyk.io/advisor/npm-package/stylus)_

* [ ] Monitor Stylus and related build plugins for security advisories; pin versions in lockfiles and patch promptly.
* [ ] Review custom functions/importers for untrusted input handling, especially when generating CSS from dynamic data.
* [ ] Restrict network-based imports and ensure CI environments do not fetch remote stylesheets implicitly.

## 12. Governance & Continuous Improvement

_Docs: [Stylus Release Notes](https://github.com/stylus/stylus/releases), [Stylus RFCs & Issues](https://github.com/stylus/stylus/issues)_

* [ ] Schedule periodic audits to retire dead code, obsolete mixins, or unmaintained libraries.
* [ ] Track build times, bundle sizes, and lint trends; create backlog items to address regressions.
* [ ] Record architectural decisions (e.g., PostCSS vs Nib, theme strategy) in ADRs and update documentation after implementation.
