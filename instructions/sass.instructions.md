---
description: 'Sass delivery guardrails for scalable, maintainable styling systems.'
applyTo: '**/*'
---

# Sass Delivery Checklist

Use this checklist when architecting, shipping, and evolving Sass codebases.

## 1. Tooling & Runtime Setup

_Docs: [Sass Install Guide](https://sass-lang.com/install), [Dart Sass CLI Reference](https://sass-lang.com/documentation/cli/dart-sass)_

* [ ] Standardize on Dart Sass (the reference implementation); document required versions of Node.js and package managers.
* [ ] Provide installation scripts or devcontainers that install Sass CLI, Node toolchains, and necessary native dependencies.
* [ ] Capture IDE/editor configuration (extensions, formatting on save) aligned with Sass official tooling.

## 2. Project Structure & Naming

_Docs: [Sass @use/@forward](https://sass-lang.com/documentation/at-rules/use), [Sass Module System](https://sass-lang.com/documentation/at-rules/forward)_

* [ ] Organize source under predictable directories (`styles/`, `sass/`, feature folders) with clear separation for base, layout, components, and utilities.
* [ ] Adopt naming conventions for partials (`_partial.scss`), modules, and entry files; enforce relative import hygiene.
* [ ] Document ownership of shared style libraries and ensure README coverage for each major folder.

## 3. Architecture & Modularization

_Docs: [7-1 Pattern Overview](https://sass-guidelin.es/#the-7-1-pattern), [Sass Guidelines](https://sass-guidelin.es)_

* [ ] Apply a modular architecture (e.g., 7-1 pattern) that keeps concerns isolated and promotes reuse.
* [ ] Replace legacy `@import` directives with `@use`/`@forward` to benefit from namespacing and faster builds.
* [ ] Limit global scope leakage by encapsulating variables and mixins within modules unless intentionally exported.

## 4. Variables & Design Tokens

_Docs: [Sass Variables](https://sass-lang.com/documentation/variables), [Design Tokens Community Group](https://design-tokens.github.io/community-group/)_

* [ ] Centralize semantic tokens (color, spacing, typography) and align them with cross-platform token sources where applicable.
* [ ] Enforce naming conventions and default fallbacks for variables; document mapping from tokens to Sass variables.
* [ ] Guard against hard-coded values in component styles by linting for token usage and reviewing pull requests for deviations.

## 5. Mixins, Functions & Utilities

_Docs: [Sass Mixins](https://sass-lang.com/documentation/at-rules/mixin), [Sass Functions](https://sass-lang.com/documentation/modules)_

* [ ] Define reusable mixins/functions with clear input contracts and defaults to avoid duplicated logic.
* [ ] Prefer mixins over `@extend` for composition to reduce selector bloat and cascade coupling.
* [ ] Provide unit docs or examples for complex utilities and ensure they are covered by tests or visual regression checks.

## 6. Module Imports & Dependency Management

_Docs: [Sass Module System](https://sass-lang.com/documentation/at-rules/use), [Sass Migrator](https://sass-lang.com/documentation/cli/migrator)_

* [ ] Use namespaced imports with `@use` and re-export shared APIs with `@forward`; avoid deep relative import chains.
* [ ] Document module public APIs and enforce linting to prevent accidental private symbol usage.
* [ ] Automate migrations from legacy `@import` using `sass-migrator` for consistency across the codebase.

## 7. Build Pipeline Integration

_Docs: [Vite CSS Preprocessors](https://vitejs.dev/guide/features.html#css-pre-processors), [webpack sass-loader](https://webpack.js.org/loaders/sass-loader/)_

* [ ] Configure bundlers (Vite, Webpack, Rollup) or task runners (Gulp, Parcel) with consistent Sass options (source maps, include paths).
* [ ] Align development and production builds to avoid drift, including minification and source map strategies.
* [ ] Chain PostCSS/autoprefixer after Sass compilation to ensure modern CSS compatibility and vendor prefix coverage.

## 8. Theming & Runtime Adaptation

_Docs: [Sass Maps](https://sass-lang.com/documentation/values/maps), [CSS Custom Properties Guide](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties)_

* [ ] Structure token maps to support multiple brands or dark mode and expose helper mixins for theme overrides.
* [ ] Emit CSS custom properties where runtime theming is required, using Sass to generate fallback values when needed.
* [ ] Keep theming logic deterministic and document how runtime toggles integrate with design tokens.

## 9. Performance & Output Optimization

_Docs: [Sass Output Styles](https://sass-lang.com/documentation/cli/dart-sass#style), [Critical CSS Strategies](https://web.dev/extract-critical-css/)_

* [ ] Monitor compiled CSS size; leverage minified output (`compressed` style) in production builds.
* [ ] Avoid excessive selector nesting, `@extend` chains, and heavy mixin expansion that increase specificity or file size.
* [ ] Generate critical CSS or code-split styles where applicable to improve initial render performance.

## 10. Linting, Formatting & Quality Gates

_Docs: [Stylelint with Sass](https://stylelint.io/), [stylelint-scss Plugin](https://github.com/stylelint-scss/stylelint-scss)_

* [ ] Enforce Stylelint (with `stylelint-scss`) for syntax rules and best practices; run lint checks in CI with zero-warning budgets.
* [ ] Integrate Prettier or agreed formatting tools to maintain consistent indentation and style across `.scss`/`.sass` files.
* [ ] Add pre-commit hooks or staged checks to catch lint/format issues before code review.

## 11. Testing & Regression Safety

_Docs: [Storybook Visual Testing](https://storybook.js.org/docs/react/workflows/visual-testing), [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)_

* [ ] Run visual regression tests (Chromatic, Percy, Playwright) on critical components to detect styling regressions early.
* [ ] Include accessibility scans (axe-core, Lighthouse) on pages influenced by Sass updates.
* [ ] Validate responsive layouts across breakpoints, zoom levels, and language directions prior to release.

## 12. Security, Maintenance & Governance

_Docs: [OWASP CSS Injection Guidance](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html#rule-3-dont-put-untrusted-data-in-css), [Sass Release Notes](https://github.com/sass/dart-sass/releases)_

* [ ] Sanitize or escape user-supplied values passed into Sass variables or interpolations to mitigate injection risks.
* [ ] Monitor Sass and tooling release notes for breaking changes; schedule upgrades and communicate migrations.
* [ ] Record ADRs for architectural decisions (e.g., theming strategies, shared mixin libraries) and revisit metrics (bundle size, lint violations) quarterly.
