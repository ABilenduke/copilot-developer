---
description: 'Nuxt engineering practices for fast, maintainable Vue applications.'
applyTo: '**/*'
---

# Nuxt Delivery Checklist

Use this checklist when architecting, building, and operating Nuxt applications.

## 1. Tooling & Environment Setup

_Docs: [Nuxt Getting Started](https://nuxt.com/docs/getting-started/installation), [Nuxt Configuration Reference](https://nuxt.com/docs/api/nuxt-config), [Release Notes](https://github.com/nuxt/nuxt/releases)_

* [ ] Pin Node.js, `nuxi`, and Nuxt versions; document upgrade cadence and breaking changes.
* [ ] Initialize projects via `nuxi init` or templates that embed linting, testing, and formatting defaults.
* [ ] Enable TypeScript strict mode and Volar tooling for DX; distribute shared editor settings across the team.

## 2. Directory Structure & Auto Imports

_Docs: [Directory Structure](https://nuxt.com/docs/guide/directory-structure/nuxt), [Auto Imports](https://nuxt.com/docs/guide/concepts/auto-imports)_

* [ ] Keep feature domains separated using Nuxt directories (`pages/`, `components/`, `composables/`, `server/`).
* [ ] Favor auto-imported components/composables; disable auto-import only when tree shaking or clarity demands manual imports.
* [ ] Register shared UI primitives under `components/` and domain-specific pieces under nested folders to align with atomic design guidance.

## 3. Components, Layouts & UI Architecture

_Docs: [Components Guide](https://nuxt.com/docs/guide/directory-structure/components), [Layouts](https://nuxt.com/docs/guide/directory-structure/layouts)_

* [ ] Use default, error, and nested layouts to encapsulate shell chrome, navigation, and route-level guards.
* [ ] Leverage `<NuxtPage>` and `<NuxtLayout>` for slot-driven composition; avoid duplicating layout scaffolding inside pages.
* [ ] Extract reusable logic into composables or plugins rather than mixins to keep component footprint minimal.

## 4. Routing, Navigation & Middleware

_Docs: [Pages & Routing](https://nuxt.com/docs/getting-started/routing), [Route Middleware](https://nuxt.com/docs/guide/directory-structure/middleware), [Navigation](https://nuxt.com/docs/guide/going-further/nuxt-links)_

* [ ] Model routes with file-based conventions; document dynamic parameters and route rules in README/ADR.
* [ ] Implement authentication, authorization, and analytics via named middleware with clear redirect/error paths.
* [ ] Prefer `<NuxtLink>` over raw anchors to benefit from prefetching, active classes, and accessibility defaults.

## 5. Data Fetching & State Management

_Docs: [Data Fetching](https://nuxt.com/docs/guide/going-further/data-fetching), [Composable Utilities](https://nuxt.com/docs/api/composables/use-fetch), [Pinia Integration](https://nuxt.com/docs/getting-started/stores)_

* [ ] Choose `useAsyncData`/`useFetch` for SSR-friendly data; specify `server: false` only when APIs are client-only.
* [ ] Centralize shared state in Pinia stores or composables; avoid directly accessing `$fetch` across components without abstraction.
* [ ] Handle loading/error states explicitly, surfacing error boundaries or fallbacks that work in SSR and CSR modes.

## 6. Nitro Server, API Routes & Runtime Config

_Docs: [Nitro Server](https://nitro.unjs.io/guide), [Server Routes](https://nuxt.com/docs/guide/directory-structure/server), [Runtime Config](https://nuxt.com/docs/guide/going-further/runtime-config)_

* [ ] Implement API/cron/ISR handlers under `server/` with deterministic input validation and error handling.
* [ ] Store secrets in `runtimeConfig` and reference via injections; never ship sensitive env vars to the public runtime.
* [ ] Use route rules (`nuxt.config`) to configure caching, edge rendering, and static fallbacks per endpoint.

## 7. Rendering Strategies & Performance

_Docs: [Rendering Modes](https://nuxt.com/docs/guide/going-further/route-rules), [Payload Optimization](https://nuxt.com/docs/guide/going-further/payload-extraction), [Image Optimization](https://nuxt.com/modules/image)_

* [ ] Select SSR, SSG, ISR, or client-only per route; document rationale and rollbacks in ADRs.
* [ ] Enable payload extraction, route chunk splitting, and component-level code splitting to minimize initial bundle size.
* [ ] Use the Nuxt Image module or CDN-backed transformers to optimize assets; configure caching headers for static outputs.

## 8. Styling, Assets & Head Management

_Docs: [Styling](https://nuxt.com/docs/guide/going-further/using-css), [Head & SEO](https://nuxt.com/docs/getting-started/seo-meta), [Fonts & Assets](https://nuxt.com/docs/guide/directory-structure/assets)_

* [ ] Configure PostCSS/Tailwind/SCSS in `nuxt.config` and document design system tokens.
* [ ] Manage metadata via `useHead`/`useSeoMeta`; ensure SSR renders canonical, OG, and structured data tags.
* [ ] Serve fonts and media through the `assets/` pipeline or external CDNs with preconnect/preload hints.

## 9. Testing, Linting & Quality Gates

_Docs: [Nuxt Testing](https://nuxt.com/docs/guide/going-further/testing), [Vitest Config](https://nuxt.com/docs/getting-started/testing#unit-testing), [Playwright E2E](https://nuxt.com/docs/getting-started/testing#end-to-end-testing)_

* [ ] Configure unit tests with Vitest + Vue Test Utils and snapshot strategy mindful of SSR output.
* [ ] Run Playwright (or Cypress) against built deployments to verify routing, data hydration, and accessibility.
* [ ] Align ESLint, Stylelint, and Prettier with Nuxt presets; enforce via CI before merges.

## 10. Deployment, Hosting & Environments

_Docs: [Deployment Guide](https://nuxt.com/docs/getting-started/deployment), [Nitro Adapters](https://nuxt.com/docs/getting-started/deployment#supported-hosting-providers), [Runtime Environments](https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables)_

* [ ] Choose the correct Nitro adapter (Vercel, Netlify, Node, Workers); verify serverless size limits and cold start budgets.
* [ ] Automate build, preview, and production pipelines with `nuxi build` and environment-specific configs.
* [ ] Document env var ownership, rotation policies, and secrets management for each deployment target.

## 11. Observability & Documentation

_Docs: [Logging & Monitoring](https://nitro.unjs.io/guide/deploy/logging), [Nuxt DevTools](https://nuxt.com/docs/getting-started/nuxt-devtools), [Content Module](https://content.nuxt.com/)_

* [ ] Instrument server handlers and critical composables with structured logging and tracing hooks.
* [ ] Keep runbooks for cache flushes, adapter upgrades, and dependency updates; capture incidents in ADRs.
* [ ] Use Nuxt Content or Storybook to document components, composables, and API behaviors for downstream teams.
