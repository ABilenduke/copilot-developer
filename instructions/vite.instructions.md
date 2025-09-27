---
description: 'Vite configuration guardrails for fast dev cycles and production-ready builds.'
applyTo: '**/vite*.config.{ts,js,mts,mjs}, **/*.env*'
---

# Vite Delivery Checklist

Follow these checks whenever configuring or reviewing Vite-powered projects.

## 1. Baseline Project Setup

_Docs: [Vite Config Reference](https://vitejs.dev/config/), [Plugin API Guide](https://vitejs.dev/guide/api-plugin.html)_

* [ ] Pin Vite to the latest minor and use `defineConfig` in `vite.config.(ts|js)`; document rationale for plugins and experimental flags.
* [ ] Keep `root`, `base`, and `build.outDir` aligned with repository structure (monorepos: set `root` per package and share a `packages/<app>/vite.config.ts`).
* [ ] Mirror alias definitions between `tsconfig.json`/`jsconfig.json` and Vite via `resolve.alias`; avoid relative `../../` imports.
* [ ] Register shared globals or shims (`vite-env.d.ts`) for TypeScript, and add JSDoc typedefs when staying in JavaScript.
* [ ] Track plugin versions explicitly, warn when introducing ones that mutate globals or polyfill Node APIs.

## 2. Environment & Secrets Hygiene

_Docs: [Environment Variables & Modes](https://vitejs.dev/guide/env-and-mode.html)_

* [ ] Store environment defaults in `.env`, `.env.local`, etc., with non-secret values; prefix runtime variables with `VITE_`.
* [ ] Provide `.env.example` documenting required keys and acceptable values; never commit secrets.
* [ ] Use `loadEnv` or helper wrappers to merge mode-specific variables and validate them (throw on missing keys at startup).
* [ ] Surface environment-driven behaviour in docs/ADRs so QA and Ops know which flags affect builds.

## 3. Dev Server & DX

_Docs: [Server Options](https://vitejs.dev/config/server-options.html)_

* [ ] Configure `server.host`, `port`, and `open` for team norms; enable HTTPS locally only when required and document certificates.
* [ ] Ensure HMR works across containers/tunnels (`server.hmr.host` and `clientPort` tuned for cloud IDEs).
* [ ] Add proxy rules for backend services with clear `/api` rewriting and timeout handling; avoid proxying auth tokens.
* [ ] Monitor dependency pre-bundling warnings; configure `optimizeDeps.include/exclude` to stabilize dev startup.

## 4. Asset Handling & Bundling

_Docs: [Static Assets Guide](https://vitejs.dev/guide/assets.html), [Build Options](https://vitejs.dev/config/build-options.html)_

* [ ] Set `assetsInclude`/`publicDir` intentionally; keep large static assets in `public/` and reference with absolute `/` paths.
* [ ] Configure `build.assetsInlineLimit` and manual chunking to control bundle sizes; document thresholds per route.
* [ ] Enable CSS code splitting and PostCSS plugins (Autoprefixer, Tailwind, etc.) in `vite.config` rather than ad-hoc imports.
* [ ] Use `import.meta.glob` / `import.meta.globEager` judiciously; prefer lazy imports for heavy modules.
* [ ] Validate tree-shaking by avoiding CommonJS-only dependencies or add `optimizeDeps.esbuildOptions` shims when necessary.

## 5. Testing & Tooling Integration

_Docs: [Vitest Guide](https://vitest.dev/guide/), [Preview Command](https://vitejs.dev/guide/cli.html#vite-preview)_

* [ ] Wire Vitest via `test` block inside `defineConfig` (environment, globals, coverage) and co-locate `vitest.config.ts` if customizing.
* [ ] Align Playwright/Cypress base URLs with Vite dev server/preview; ensure `npm run test:e2e` starts Vite in preview mode.
* [ ] Run `vite build` in CI alongside lint/type checks; fail fast on build warnings (treat as errors) using `--minify terser` when needed.
* [ ] Document how to use `vite inspect` for plugin graphs and share common debugging recipes in developer docs.

## 6. Production Builds & Deployment

_Docs: [Build Guide](https://vitejs.dev/guide/build.html), [SSR Handbook](https://vitejs.dev/guide/ssr.html)_

* [ ] Use `build.target` matching supported browsers; polyfill via `@vitejs/plugin-legacy` only when analytics require it.
* [ ] Configure `build.sourcemap` (true for staging, hidden in production) and upload maps to observability tooling when needed.
* [ ] Ensure `preview` mirrors production hosting (set `preview.port`, `proxy`, HTTPS) and use it in smoke-test scripts.
* [ ] For SSR/hybrid apps, split `vite.config` into shared + server/client files; validate `ssr.external`/`ssr.noExternal` to prevent bundle inflation.
* [ ] Cache `node_modules` and `.vite` in CI/CD pipelines; invalidate caches when plugin or Node versions change.

## 7. Maintenance & Documentation

_Docs: [Vite Release Notes](https://vitejs.dev/guide/changes.html), [Plugin Directory](https://vitejs.dev/plugins/)_

* [ ] Record plugin additions/removals, base path changes, or SSR toggles in ADRs or CHANGELOG entries.
* [ ] Keep README or runbooks updated with key scripts (`npm run dev`, `npm run build`, `npm run preview`, profiling commands).
* [ ] Automate dependency updates (Renovate/Dependabot) and watch Vite release notes for breaking changes.
* [ ] Monitor bundle size reports (e.g., `rollup-plugin-visualizer`) and set alerts when thresholds are crossed.

## 8. Documentation Lookup & Research

_Docs: [Vite Guide](https://vitejs.dev/guide/), [Vite Site Search](https://vitejs.dev/)_

* [ ] Before adding workarounds, search the official Vite docs to confirm the recommended approach and cite relevant sections in PRs or ADRs.
* [ ] Track the changelog for new features or breaking changes and schedule upgrade reviews when major versions ship.
* [ ] Cross-check ecosystem documentation (Vue, React, Svelte, Vitest, Playwright) when integrating framework-specific plugins.
* [ ] Maintain a shared knowledge base of frequently referenced Vite docs within the project wiki or docs folder.

Adhering to this checklist keeps Vite projects fast in development, lean in production, and easy for teams to operate.
