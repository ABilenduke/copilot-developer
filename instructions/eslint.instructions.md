---
description: 'ESLint guardrails for consistent, error-free JavaScript codebases.'
applyTo: '**/*'
---

# ESLint Delivery Checklist

Use this checklist when introducing or maintaining ESLint across JavaScript, TypeScript, or framework projects.

## 1. Tooling & Installation

_Docs: [Getting Started](https://eslint.org/docs/latest/use/getting-started), [Command Line Interface](https://eslint.org/docs/latest/use/command-line-interface), [Configuration Options](https://eslint.org/docs/latest/use/configure/configuration-files)_

* [ ] Pin Node.js and ESLint major versions; document minimum tooling requirements in onboarding guides.
* [ ] Install ESLint via the project’s package manager and commit lockfiles for deterministic dependency trees.
* [ ] Provide bootstrap scripts (`eslint --init` templates or shared configs) so new packages inherit baseline standards.

## 2. Config Structure & Shared Presets

_Docs: [Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files), [Flat Config Guide](https://eslint.org/docs/latest/use/configure/configuration-files-new)_

* [ ] Centralize ESLint config (`eslint.config.js`, `.eslintrc.{js,cjs,json,yml}`) and export overrides for package-specific needs.
* [ ] Prefer flat config in new projects; migrate legacy `.eslintrc` progressively with compatibility layers when required.
* [ ] Annotate major rule groups or env settings with comments explaining rationale and ownership.

## 3. Rules, Overrides & Baselines

_Docs: [Configuring Rules](https://eslint.org/docs/latest/use/configure/rules), [Configuration Cascading](https://eslint.org/docs/latest/use/configure/configuration-cascading-and-hierarchy)_

* [ ] Enforce rule severity intentionally (`error`, `warn`, `off`); avoid defaulting to blanket `warn` states that mask issues.
* [ ] Scope overrides to targeted globs (tests, stories, legacy code) and document sunset plans for relaxed rules.
* [ ] Review rule additions with the team; capture decisions in ADRs or config comments for future context.

## 4. Plugins & Shareable Configs

_Docs: [Using Plugins](https://eslint.org/docs/latest/use/configure/plugins), [Shareable Configs](https://eslint.org/docs/latest/extend/shareable-configs)_

* [ ] Vet third-party plugins for maintenance cadence and security posture before adoption; pin plugin versions explicitly.
* [ ] Keep framework-specific presets (`eslint-config-next`, `eslint-plugin-vue`, `@nuxtjs/eslint-config`) contained to relevant packages.
* [ ] Remove deprecated or overlapping plugins regularly to reduce lint noise and execution time.

## 5. File Targeting & Ignore Patterns

_Docs: [Ignore Files](https://eslint.org/docs/latest/use/configure/ignore), [Glob Patterns](https://eslint.org/docs/latest/use/configure/file-glob-patterns)_

* [ ] Maintain `.eslintignore` (or `ignorePatterns`) to exclude generated assets, vendored code, and compiled output.
* [ ] Ensure lint scripts cover the same globs as CI; audit target patterns after renaming directories or adding packages.
* [ ] Prefer per-directory overrides to broad ignores that could hide issues in critical code paths.

## 6. Formatter Interop & Prettier Integration

_Docs: [Prettier + ESLint](https://prettier.io/docs/en/integrating-with-linters.html), [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)_

* [ ] Decide whether ESLint or Prettier owns formatting; disable conflicting stylistic rules when Prettier is the formatter of record.
* [ ] Use `eslint-config-prettier` (and `eslint-plugin-prettier` if desired) to keep lint output focused on logical defects.
* [ ] Document workflows so contributors run formatters before lint checks to minimize churn.

## 7. Scripts & Automation

_Docs: [npm Scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts), [ESLint CLI Options](https://eslint.org/docs/latest/use/command-line-interface)_

* [ ] Add `lint` and `lint:fix` scripts to `package.json`; use consistent flags (`--max-warnings=0`, `--cache`) across packages.
* [ ] Wire `lint-staged` or similar tooling to run ESLint on staged files for rapid author feedback.
* [ ] Capture runtime prerequisites (env vars, required services) inside scripts or documentation to smooth onboarding.

## 8. Continuous Integration & Quality Gates

_Docs: [ESLint GitHub Actions](https://github.com/eslint/eslint/tree/main/docs/src/docs/use/integrations/gitlab), [Exit Codes](https://eslint.org/docs/latest/use/command-line-interface#exit-codes)_

* [ ] Run ESLint in CI with `--max-warnings=0` to block regressions; surface reports as job artifacts for debugging.
* [ ] Cache dependency installs and ESLint’s cache directory (`.eslintcache`) to keep pipelines fast.
* [ ] Fail builds on configuration drift (missing plugins, invalid rules) and notify owners automatically.

## 9. Editor & IDE Integration

_Docs: [Editor Integrations](https://eslint.org/docs/latest/use/integrations/editor), [VS Code ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)_

* [ ] Publish recommended editor extensions and workspace settings (`.vscode/settings.json`, IDE templates) with lint-on-save enabled.
* [ ] Confirm Plug'n'Play or remote dev environments resolve ESLint binaries correctly; document fallback commands when needed.
* [ ] Verify editor auto-fixes match CLI output to prevent drift between local and CI runs.

## 10. Autofix & Migration Workflows

_Docs: [Command Line Autofix](https://eslint.org/docs/latest/use/command-line-interface#--fix), [Custom Formatters](https://eslint.org/docs/latest/extend/custom-formatters)_

* [ ] Schedule dedicated PRs for bulk `--fix` runs; review diffs to ensure semantic changes aren’t introduced.
* [ ] Use custom formatters or `--format json` to integrate lint results into dashboards during migrations.
* [ ] Stage rule upgrades incrementally (one rule family per PR) to keep reviews focused and reversible.

## 11. Troubleshooting & Maintenance

_Docs: [FAQ](https://eslint.org/docs/latest/use/faq), [Rule Deprecation Guide](https://eslint.org/docs/latest/use/upgrade-guide)_

* [ ] Track flaky lint behavior (parser crashes, memory usage) and cross-reference open ESLint issues before crafting workarounds.
* [ ] Audit configs quarterly for deprecated rules, parser updates, or unused overrides.
* [ ] Document solutions for recurring errors (missing peer deps, parser options) in team runbooks.

## 12. Documentation & Knowledge Sharing

_Docs: [Rules by Category](https://eslint.org/docs/latest/rules/), [ESLint Blog](https://eslint.org/blog/)_

* [ ] Maintain internal linting guidelines outlining rule intent, ownership, and escalation paths.
* [ ] Share learnings from audits or incident retrospectives to evolve your lint rule set.
* [ ] Update onboarding docs whenever lint scripts, configs, or plugin policies change.
