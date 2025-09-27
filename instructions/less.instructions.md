---
description: 'Less workflow guardrails for maintainable, production-ready styling.'
applyTo: '**/*'
---

# Less Delivery Checklist

Use this checklist when adopting, evolving, or maintaining Less-based stylesheets.

## 1. Tooling & Environment Setup

_Docs: [Less Installation Guide](https://lesscss.org/usage/), [Less.js CLI Options](https://lesscss.org/usage/#using-less-in-the-command-line)_

* [ ] Standardize Node.js, npm/pnpm/yarn, and Less compiler versions; pin them in lockfiles and onboarding docs.
* [ ] Provide bootstrap scripts or devcontainers that install the Less CLI, Node toolchains, and native dependencies deterministically.
* [ ] Configure editor extensions (Less syntax highlighting, IntelliSense) and enforce format-on-save settings aligned with project conventions.

## 2. Syntax, Style Architecture & Project Layout

_Docs: [Less Language Features Overview](https://lesscss.org/features/), [Modular CSS Architecture](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)_

* [ ] Organize source folders by responsibility (base, components, utilities) and use partial naming (`_partial.less`) for shared modules.
* [ ] Adopt a naming methodology (BEM, SUIT, namespaces) and encode it within directory structure and linter rules.
* [ ] Avoid deep nesting beyond 3 levels to prevent selector bloat and ensure overrides remain manageable.

## 3. Variables, Mixins & Functions

_Docs: [Less Variables](https://lesscss.org/features/#variables-feature), [Less Mixins](https://lesscss.org/features/#mixins-feature)_

* [ ] Centralize design tokens (color, spacing, typography) as Less variables with semantic naming and documented fallbacks.
* [ ] Encapsulate repeated patterns as mixins; prefer mixin parameters over copy-pasted declarations.
* [ ] Use built-in functions (math, color manipulation) thoughtfully and document custom helpers with usage examples.

## 4. Imports, Modules & Dependency Management

_Docs: [@import Options](https://lesscss.org/features/#import-options), [Less Plugin Authoring](https://lesscss.org/usage/#plugins)_

* [ ] Prefer relative imports or configured include paths; avoid duplicate imports by leveraging reference (`@import (reference)`) where appropriate.
* [ ] Track dependency graph to prevent circular imports; split large files into cohesive modules.
* [ ] Document third-party Less plugins/mixins, pin their versions, and validate compatibility before upgrades.

## 5. Build Pipeline Integration

_Docs: [less-loader for Webpack](https://webpack.js.org/loaders/less-loader/), [Less with Vite/Rollup](https://vitejs.dev/guide/features.html#css-pre-processors)_

* [ ] Configure bundlers (Webpack, Vite, Parcel) or task runners (Gulp, Grunt) with consistent Less options (source maps, paths, javascriptEnabled).
* [ ] Align production and development builds to avoid drift; document required environment variables for compilation.
* [ ] Integrate PostCSS/autoprefixer after Less compilation to ensure modern CSS compatibility.

## 6. Compatibility & Progressive Enhancement

_Docs: [Less Compatibility Notes](https://lesscss.org/usage/#using-less-in-the-command-line-compatibility-modes), [Browserslist](https://github.com/browserslist/browserslist)_

* [ ] Maintain Browserslist targets shared with JS tooling to drive autoprefixer and polyfills.
* [ ] Use Less compatibility flags or alternative syntax when targeting legacy IE/Edge if required.
* [ ] Document fallbacks for features not supported in older browsers and verify graceful degradation.

## 7. Theming & Design Tokens

_Docs: [Less Namespaces & Maps](https://lesscss.org/features/#namespaces-feature), [Design Tokens Community Group](https://design-tokens.github.io/community-group/)_

* [ ] Structure variables to support multi-brand or dark-mode themes; expose theme maps/namespaces for overrides.
* [ ] Provide runtime toggles via CSS custom properties or data attributes emitted from compiled Less where necessary.
* [ ] Keep token sources authoritative and automate synchronization between design tools and Less variable definitions.

## 8. Output Optimization & Performance

_Docs: [Less CLI Compression Modes](https://lesscss.org/usage/#using-less-in-the-command-line-compress), [Critical CSS Strategies](https://web.dev/extract-critical-css/)_

* [ ] Enable minification/compression in production builds and strip comments unless required for licensing.
* [ ] Monitor bundle sizes and leverage tree shaking or PurgeCSS-style tooling on compiled CSS where safe.
* [ ] Generate critical CSS extracts for above-the-fold content and defer non-essential styles.

## 9. Linting, Formatting & Quality Gates

_Docs: [Lesshint Linter](https://lesshint.netlify.app/), [Prettier Less Plugin](https://github.com/prettier/plugin-less)_

* [ ] Enforce coding standards with Lesshint or Stylelint (Less syntax) and run lint checks in CI with zero-warning budgets.
* [ ] Configure Prettier or agreed formatters to avoid stylistic diffs and ensure consistent indentation and spacing.
* [ ] Add pre-commit hooks or staged checks to catch lint/format issues before code review.

## 10. Testing & Regression Safety

_Docs: [BackstopJS Visual Regression](https://github.com/garris/BackstopJS), [Playwright Visual Testing](https://playwright.dev/docs/test-snapshots)_

* [ ] Cover critical flows with visual regression tests to detect Less compilation regressions early.
* [ ] Run accessibility audits (axe-core, Lighthouse) against pages using Less outputs after major changes.
* [ ] Validate core layouts across breakpoints, zoom levels, and RTL locales as part of release testing.

## 11. Documentation & Collaboration

_Docs: [Storybook Styling Docs](https://storybook.js.org/docs/react/essentials/toolbars-and-globals), [Zeroheight Documentation Playbook](https://zeroheight.com/blog/design-system-documentation-playbook/)_

* [ ] Document component usage, required mixins, and variable contracts in shared knowledge bases.
* [ ] Record architectural decisions (ADRs) when introducing new Less patterns or plugins.
* [ ] Provide onboarding materials and pairing sessions to align designers and engineers on Less conventions.

## 12. Security & Continuous Improvement

_Docs: [OWASP CSS Injection Guidance](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html#rule-3-dont-put-untrusted-data-in-css), [Less Release Notes](https://github.com/less/less.js/releases)_

* [ ] Escape or validate user-supplied values passed into Less variables to mitigate CSS injection risks.
* [ ] Monitor Less and plugin release notes for security patches or breaking changes; schedule upgrades proactively.
* [ ] Track metrics (lint violations, build time, bundle size) and prioritize refactors or automation to reduce technical debt.
