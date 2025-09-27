---
description: 'PostCSS workflow guardrails for maintainable, future-friendly CSS.'
applyTo: '**/*'
---

# PostCSS Delivery Checklist

Use this checklist when adopting, maintaining, or expanding PostCSS pipelines.

## 1. Tooling & Prerequisites

_Docs: [PostCSS Installation Guide](https://postcss.org/), [CLI Reference](https://postcss.org/api/)_

* [ ] Pin Node.js and PostCSS major versions; document minimum tooling requirements in onboarding guides.
* [ ] Install PostCSS via the project’s package manager and commit lockfiles for deterministic dependency trees.
* [ ] Provide bootstrap scripts that set up PostCSS configs, plugins, and required peer dependencies.

## 2. Configuration Structure & Presets

_Docs: [Configuration Files](https://postcss.org/api/#postcss-cli), [Standard Config Patterns](https://github.com/postcss/postcss-load-config)_

* [ ] Centralize configuration (`postcss.config.js`, `postcss.config.cjs`, or `postcss.config.mjs`) at the repo root; export overrides for package-specific needs.
* [ ] Document environment switches (development vs production) and the plugins enabled in each mode.
* [ ] Align config structure with bundlers or frameworks in use (Vite, Webpack, Next.js) to avoid duplicate definitions.

## 3. Plugin Strategy & Governance

_Docs: [PostCSS Plugin List](https://www.postcss.parts/), [Authoring Plugins](https://postcss.org/architecture/)_

* [ ] Curate an approved plugin catalog; vet maintenance cadence, license, and security posture before adoption.
* [ ] Capture plugin intent, configuration, and owners in documentation; rotate deprecated plugins promptly.
* [ ] Prefer official or well-supported plugins (Autoprefixer, `postcss-nesting`, `postcss-preset-env`) before building custom code.

## 4. Modern CSS Features & Polyfills

_Docs: [postcss-preset-env](https://preset-env.cssdb.org/), [CSSDB Compatibility](https://cssdb.org/)_

* [ ] Enable `postcss-preset-env` (or equivalent) with documented stage levels and browser targets.
* [ ] Evaluate which CSS features need polyfills vs transpilation; track browser support in release notes.
* [ ] Keep autoprefixer browserlist targets aligned with product requirements and analytics data.

## 5. Build Pipeline Integration

_Docs: [Using PostCSS with Bundlers](https://postcss.org/docs/usage/), [Vite PostCSS](https://vitejs.dev/guide/features.html#postcss), [Webpack PostCSS Loader](https://github.com/webpack-contrib/postcss-loader)_

* [ ] Integrate PostCSS via bundler loaders, framework hooks, or CLI scripts; avoid parallel pipelines that drift.
* [ ] Share caching strategies (e.g., Vite cache, Webpack cache) to speed rebuilds across environments.
* [ ] Validate that PostCSS runs in CI and production builds with identical plugin order.

## 6. Syntax Extensions & Module Support

_Docs: [postcss-scss](https://github.com/postcss/postcss-scss), [postcss-modules](https://github.com/madyankin/postcss-modules), [SugarSS Syntax](https://github.com/postcss/sugarss)_

* [ ] Configure alternative syntaxes (SCSS, SugarSS) or CSS Modules by registering the correct PostCSS parser.
* [ ] Document file naming conventions (`*.module.css`, `*.pcss`) and ensure tooling resolves them consistently.
* [ ] Provide migration guidance when moving from preprocessors (Sass/Less) to PostCSS-based pipelines.

## 7. Performance & Build Optimization

_Docs: [PostCSS Performance Tips](https://postcss.org/architecture/#performance), [postcss-cli Options](https://github.com/postcss/postcss-cli)_

* [ ] Measure build times before and after plugin changes; remove redundant or legacy plugins.
* [ ] Cache intermediate results where supported (e.g., using `--watch` or build system cache) to improve authoring speed.
* [ ] Benchmark bundle size impact and adjust minification/post-processing (cssnano, lightningcss) accordingly.

## 8. Compatibility & Regression Strategy

_Docs: [Browserslist](https://github.com/browserslist/browserslist), [Can I Use](https://caniuse.com/)_

* [ ] Align Browserslist targets across PostCSS, Babel, and frontend frameworks to prevent mismatched builds.
* [ ] Track browser regressions introduced by plugin updates and maintain downgrade/rollback procedures.
* [ ] Share compatibility test matrices and confirm critical paths in target browsers after major upgrades.

## 9. Testing & Linting

_Docs: [PostCSS Tester](https://github.com/postcss/postcss#how-to-use-postcss-programmatically), [Stylelint Integration](https://stylelint.io/), [jest-preset-style](https://github.com/stylelint/jest-preset-style)_

* [ ] Add unit or snapshot tests for custom PostCSS plugins and transformations.
* [ ] Integrate Stylelint (or equivalent) to validate CSS syntax after PostCSS processing.
* [ ] Include CSS visual regression or integration tests (Playwright, Percy, Chromatic) for critical components.

## 10. Documentation & Collaboration

_Docs: [PostCSS Architecture Notes](https://postcss.org/architecture/), [Design System Documentation Patterns](https://zeroheight.com/blog/design-system-documentation-playbook/)_

* [ ] Maintain READMEs outlining plugin purpose, configuration, and usage examples for developers and designers.
* [ ] Provide contributor guides covering local setup, debugging tips, and common pitfalls.
* [ ] Surface pipeline diagrams showing how PostCSS integrates with design tokens, preprocessors, and bundlers.

## 11. Security & Dependency Hygiene

_Docs: [npm Audit](https://docs.npmjs.com/cli/v10/commands/npm-audit), [Snyk PostCSS Advisory](https://security.snyk.io/package/npm/postcss)_

* [ ] Monitor PostCSS and plugin advisories; patch or pin versions promptly when vulnerabilities emerge.
* [ ] Run automated dependency scans (npm audit, Snyk, Dependabot) and track remediation status.
* [ ] Review custom plugins for untrusted input handling and sandbox third-party transformations when possible.

## 12. Governance & Continuous Improvement

_Docs: [PostCSS Release Notes](https://github.com/postcss/postcss/releases), [Plugin Maintenance Guidelines](https://github.com/postcss/postcss/blob/main/docs/plugins.md)_

* [ ] Schedule periodic audits to retire unused plugins, align configs, and incorporate new CSS features.
* [ ] Record architectural decisions (ADRs) for major pipeline changes, including migration plans and rollback steps.
* [ ] Measure developer experience metrics (build time, hot reload latency) and prioritize improvements each quarter.
