---
description: 'Prettier formatting guardrails for consistent multi-language codebases.'
applyTo: '**/*'
---

# Prettier Delivery Checklist

Use this checklist when introducing or maintaining Prettier as the canonical formatter across projects.

## 1. Tooling & Installation

_Docs: [Install Prettier](https://prettier.io/docs/en/install.html), [Command Line Usage](https://prettier.io/docs/en/cli.html)_

* [ ] Install Prettier via the repository’s package manager and pin the major version (`package.json` + lockfile) to avoid surprise formatting shifts.
* [ ] Add convenience scripts (`format`, `format:check`) so local development, CI, and pre-commit hooks invoke identical commands.
* [ ] Document minimum Node.js and Prettier versions alongside upgrade cadence expectations.

## 2. Configuration & Options

_Docs: [Configuration File](https://prettier.io/docs/en/configuration.html), [Options Reference](https://prettier.io/docs/en/options.html)_

* [ ] Store shared formatting choices in `.prettierrc.{json,js,yaml}` (or `package.json` `prettier` field) and commit an `.editorconfig` when needed for editor alignment.
* [ ] Favor explicit option settings (e.g., `singleQuote`, `printWidth`) over relying on defaults so future upgrades don’t change behavior silently.
* [ ] Use `prettier.config.cjs`/`mjs` for advanced logic (comments, conditional overrides) rather than script-based custom formatters.

## 3. File Targeting & Ignore Patterns

_Docs: [Ignore Files](https://prettier.io/docs/en/ignore.html), [File Info](https://prettier.io/docs/en/cli.html#--file-info)_

* [ ] Maintain `.prettierignore` to exclude generated assets, vendored code, and files managed by alternative formatters.
* [ ] Audit glob coverage so every source format you care about is formatted—use `prettier --write` in dry-run mode to confirm.
* [ ] Revisit ignores after migrations or tooling changes to avoid stale exclusions that allow drift.

## 4. Formatter Ownership & Linting Interop

_Docs: [Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html), [Prettier vs Linters](https://prettier.io/docs/en/comparison.html)_

* [ ] Decide whether Prettier or linters own formatting concerns and disable overlapping stylistic rules (ESLint `eslint-config-prettier`, Stylelint `stylelint-config-prettier`).
* [ ] Run formatters before lint checks in CI to minimize noise and keep lint output focused on logical errors.
* [ ] Document any remaining stylistic lint rules with justification so contributors understand dual ownership boundaries.

## 5. Scripts & Automation

_Docs: [CLI --write & --check](https://prettier.io/docs/en/cli.html#--check), [Git Hooks Guide](https://prettier.io/docs/en/install.html#git-hooks)_

* [ ] Gate pull requests with `prettier --check` (or `npm run format:check`) to block unformatted diffs.
* [ ] Use pre-commit hooks (Husky, Lefthook) to run `prettier --write` on staged files and keep auto-fixes near the author.
* [ ] Cache formatter results in CI (e.g., lint-staged + incremental workflows) to shorten feedback loops on large repos.

## 6. Editor & IDE Integration

_Docs: [Editor Integration](https://prettier.io/docs/en/editors.html)_

* [ ] Publish recommended editor settings/extensions (VS Code Prettier, WebStorm built-in integration) with instructions for enabling format-on-save.
* [ ] Align editor defaults with project config by distributing shared workspace settings (`.vscode/settings.json`, IDE templates).
* [ ] Verify format-on-save doesn’t conflict with multi-root workspace setups or alternative language tooling.

## 7. Plugins & Language Support

_Docs: [Prettier Plugins](https://prettier.io/docs/en/plugins.html), [Supported Languages](https://prettier.io/docs/en/language-support.html)_

* [ ] Adopt official or well-maintained community plugins for languages not covered out of the box (e.g., `@prettier/plugin-php`, `prettier-plugin-tailwindcss`).
* [ ] Pin plugin versions and list them in documentation; ensure CI includes any required binaries (e.g., `@prettier/plugin-ruby`).
* [ ] Validate plugin performance and formatting parity before rollout; capture fallback formatting plans if plugins lag behind language changes.

## 8. Monorepo & Project Structure

_Docs: [Shareable Configs](https://prettier.io/docs/en/configuration.html#sharing-configurations), [Prettier for Teams](https://prettier.io/docs/en/option-philosophy.html)_

* [ ] Hoist Prettier config to the repo root and share via package workspaces or npm packages when multiple projects need the same rules.
* [ ] Document per-package overrides (e.g., server vs. frontend) and keep them minimal to preserve a consistent authoring experience.
* [ ] Provide bootstrap scripts that install Prettier in new packages to avoid divergent formatter versions.

## 9. Migration & Adoption Workflows

_Docs: [Adopting Prettier](https://prettier.io/docs/en/adopting-prettier.html), [Release Notes](https://prettier.io/blog/)_

* [ ] Roll out Prettier incrementally by formatting one directory/package at a time to keep diffs reviewable.
* [ ] Coordinate with QA and release teams on timing—large formatting sweeps can invalidate open PRs or snapshots.
* [ ] Communicate upgrade plans (changelogs, release blog highlights) so teams anticipate stylistic diffs when bumping versions.

## 10. Troubleshooting & Maintenance

_Docs: [Troubleshooting](https://prettier.io/docs/en/troubleshooting.html), [Command Line Options](https://prettier.io/docs/en/cli.html)_

* [ ] Capture known issues (performance hotspots, parser mismatches) and the workarounds you employ (e.g., `--parser` overrides).
* [ ] Use `prettier --debug-check` or `--debug-print-doc` when diagnosing unexpected formatting output.
* [ ] Schedule periodic dependency reviews to stay current with parser updates (Babel, TypeScript, PostCSS) that Prettier depends on.

## 11. Documentation Lookup & Research

_Docs: [Prettier Documentation](https://prettier.io/docs/en/), [Prettier GitHub Releases](https://github.com/prettier/prettier/releases)_

* [ ] Monitor release notes for breaking formatting changes or parser upgrades that require regen runs.
* [ ] Track ecosystem guidance (framework CLIs, language toolchains) to align on recommended Prettier options.
* [ ] Share internal guidelines (code review checklists, formatter FAQs) so new contributors ramp up quickly.
