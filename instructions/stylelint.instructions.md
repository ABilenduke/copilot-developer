---
description: 'Stylelint guardrails for consistent, modern CSS linting.'
applyTo: '**/*'
---

# Stylelint Delivery Checklist

Use this checklist when introducing or maintaining Stylelint across CSS, SCSS, or CSS-in-JS codebases.

## 1. Tooling & Installation

_Docs: [Get Started](https://stylelint.io/user-guide/get-started), [CLI Options](https://stylelint.io/user-guide/cli)_

* [ ] Install Stylelint and core configs via the project’s package manager; pin major versions to align with team support windows.
* [ ] Add `stylelint` scripts (`lint:styles`, `lint:styles:fix`) to `package.json` so CI and developers run the same entry points.
* [ ] Document minimum Node.js and Stylelint versions required for the repository.

## 2. Config Structure & Shared Presets

_Docs: [Configuration](https://stylelint.io/user-guide/configure), [Extending Configs](https://stylelint.io/user-guide/configure#extends)_

* [ ] Centralize Stylelint config (`stylelint.config.{js,cjs,mjs,json}`) at the repo root and export overrides for app/package-specific needs.
* [ ] Extend from maintained presets (e.g., `stylelint-config-standard`, `stylelint-config-recommended-scss`) to inherit community best practices.
* [ ] Annotate config files with comments explaining rationale for major rule groups or overrides.

## 3. Rules & Overrides

_Docs: [Rules List](https://stylelint.io/user-guide/rules), [Disable Options](https://stylelint.io/user-guide/complementary-tools/#disable-commands)_

* [ ] Prefer project-wide rule adjustments over inline `stylelint-disable`; if inline exceptions are unavoidable, scope them narrowly and add reasoning.
* [ ] Keep rule overrides grouped by category (color, typography, SCSS, CSS-in-JS) to simplify audits.
* [ ] Review breaking changes to default rule severity when upgrading Stylelint majors.

## 4. File Targeting & Ignore Patterns

_Docs: [Ignore Files](https://stylelint.io/user-guide/ignoring-code), [Custom Syntaxes](https://stylelint.io/user-guide/custom-syntaxes)_

* [ ] Configure `ignoreFiles` or `.stylelintignore` to skip generated assets, vendor bundles, and compiled output.
* [ ] Model per-language overrides (`overrides`/`overrides[].customSyntax`) for SCSS, Less, or CSS-in-JS to ensure accurate parsing.
* [ ] Align lint target globs with the build pipeline so CI and local runs cover the same files.

## 5. Formatting & Complementary Tools

_Docs: [Prettier Integration](https://stylelint.io/user-guide/complementary-tools/#prettier), [Stylelint Order Plugins](https://github.com/hudochenkov/stylelint-order)_

* [ ] Decide whether Stylelint or Prettier owns formatting; disable overlapping rules when Prettier is the formatter of record.
* [ ] Adopt ordering plugins (`stylelint-order`, `stylelint-config-recess-order`) to enforce property grouping if the design system requires it.
* [ ] Run formatting and linting sequentially in scripts to avoid conflicting rewrites.

## 6. Custom Plugins & Processors

_Docs: [Stylelint Plugins](https://stylelint.io/user-guide/plugins), [Processors](https://stylelint.io/user-guide/processors)_

* [ ] Vet third-party plugins for maintenance cadence and security posture before adoption; pin versions explicitly in `package.json`.
* [ ] Scope experimental rules to specific directories with `overrides` until they prove stable.
* [ ] Remove deprecated processors (legacy CSS-in-JS tooling) in favor of custom syntaxes supported by Stylelint v15+.

## 7. Continuous Integration & Quality Gates

_Docs: [CI Recipes](https://stylelint.io/user-guide/cli#exit-codes), [Git Hooks](https://stylelint.io/user-guide/complementary-tools/#git-hooks)_

* [ ] Run Stylelint in CI with `--max-warnings=0` to prevent regressions from landing silently.
* [ ] Cache `node_modules` or use package manager caching so lint jobs stay fast; surface lint outputs as CI artifacts for debugging.
* [ ] Wire Stylelint into pre-commit hooks (Husky, Lefthook) for immediate feedback during development.

## 8. Editor & IDE Integration

_Docs: [Editor Plugins](https://stylelint.io/user-guide/complementary-tools/#editor-plugins), [Stylelint VS Code Extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)_

* [ ] Document recommended editor extensions (VS Code `stylelint`, WebStorm integration) and configuration hints for the team.
* [ ] Enable auto-fix on save for supported editors while ensuring it respects the project’s scripts and rule set.
* [ ] Provide snippets or code actions for common fixes (e.g., `stylelint-disable-next-line` templates with explanation placeholders).

## 9. Autofix & Migration Workflows

_Docs: [Autofix](https://stylelint.io/user-guide/cli#autofixing-errors), [Migration Guide](https://stylelint.io/migration-guide)_

* [ ] Use `stylelint --fix` in dedicated branches to roll out rule changes; review diffs to spot unintended formatting shifts.
* [ ] Stage migrations incrementally (one rule family per PR) to keep reviews focused and reversible.
* [ ] Capture upgrade notes (rule renames, removed options) in release communication when bumping Stylelint majors.

## 10. Troubleshooting & Maintenance

_Docs: [FAQ](https://stylelint.io/user-guide/faq), [Known Issues](https://stylelint.io/user-guide/complementary-tools/#troubleshooting)_

* [ ] Track flaky lint behavior (parser crashes, memory usage) and cross-reference open Stylelint issues before crafting workarounds.
* [ ] Audit lint output regularly for muted warnings or disabled rules that can be re-enabled after migrations.
* [ ] Schedule dependency review to keep configs, plugins, and Stylelint itself within supported release windows.

## 11. Documentation Lookup & Research

_Docs: [Stylelint Docs](https://stylelint.io/), [Release Notes](https://github.com/stylelint/stylelint/releases)_

* [ ] Monitor Stylelint release notes for breaking rule defaults, Node.js compatibility shifts, or plugin ecosystem changes.
* [ ] Curate an internal knowledge base with examples of passing/failing patterns that align with your design system.
* [ ] Share findings from audits or migrations to keep teams aligned on linting posture.
