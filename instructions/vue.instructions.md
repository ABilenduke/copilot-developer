---
description: 'Vue.js project conventions and best practices for maintainable, testable apps.'
applyTo: '**/*.vue, **/main.ts, **/main.js, **/router/**/*, **/stores/**/*, **/composables/**/*
---

# Vue.js Delivery Checklist

Follow these guardrails when building or reviewing Vue 3 + Vite applications.

## 1. Project Setup & Tooling

_Docs: [Vue Quick Start](https://vuejs.org/guide/quick-start.html), [`<script setup>` SFC Syntax](https://vuejs.org/api/sfc-script-setup.html), [Vue + TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)_

* [ ] Use Vite with the latest Vue 3 and `<script setup>` syntax. Prefer TypeScript in all new files; if a file must stay JavaScript, enforce JSDoc typings and `defineComponent` helper usage.
* [ ] Configure Path aliases (`@/`) and ensure `tsconfig.json` / `vite.config.ts` stay in sync.
* [ ] Keep dependencies minimal; document any plugin introducing global side effects.
* [ ] Enforce linting/formatting via ESLint + Prettier + Stylelint (for CSS/SCSS) in the CI pipeline.
* [ ] Track environment variables in `.env.example` and access them through `import.meta.env` wrappers.

## 2. Component Authoring

_Docs: [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html), [Props Definition](https://vuejs.org/guide/components/props.html), [Emits](https://vuejs.org/guide/components/events.html)_

* [ ] Prefer functional Composition API patterns; isolate business logic in composables (`/composables`).
* [ ] Keep components focused: `setup` logic < 75 lines, template responsibilities cohesive.
* [ ] Define props with `defineProps`—use generics for TypeScript or runtime validators for JavaScript; provide sensible defaults via `withDefaults`.
* [ ] Emit events with `defineEmits`; document payload shapes in interfaces (TypeScript) or JSDoc typedefs (JavaScript).
* [ ] Co-locate unit tests (`Component.spec.ts`) and stories/docs (`Component.stories.ts`) beside components.

## 3. State & Data Flow

_Docs: [Pinia Core Concepts](https://pinia.vuejs.org/core-concepts/), [Reusable Composables](https://vuejs.org/guide/reusability/composables.html), [State Management Overview](https://vuejs.org/guide/scaling-up/state-management.html)_

* [ ] Use Pinia stores for cross-view state; keep them domain-scoped and typed (`defineStore` with `StoreDefinition` or JSDoc typedefs).
* [ ] Leverage composables for reusable request/side-effect logic instead of bloating stores.
* [ ] Model network data with `async setup` or `useQuery`-style composables; handle loading/error states explicitly.
* [ ] Normalize incoming API payloads; never let views depend on backend field naming.
* [ ] Guard against stale data by invalidating caches on mutations and cleaning up subscriptions on unmount.

## 4. Routing & Navigation

_Docs: [Vue Router Guide](https://router.vuejs.org/guide/), [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html), [Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)_

* [ ] Define routes in dedicated modules; enable route-level code splitting with dynamic imports.
* [ ] Enforce auth/permission checks in `beforeEnter` or global guards; never rely solely on UI hiding.
* [ ] Provide descriptive route names and meta fields for breadcrumbs, titles, and permissions.
* [ ] Scroll behavior and focus management must be handled via router hooks for accessibility.

## 5. Styling & UI Consistency

_Docs: [SFC Style Features](https://vuejs.org/guide/scaling-up/sfc-style.html), [Scoped CSS](https://vuejs.org/guide/components/styles.html)_

* [ ] Prefer utility-first CSS (e.g., Tailwind) or CSS Modules; avoid global selectors in SFC `<style>`.
* [ ] Scope component styles and use design tokens/variables from a centralized theme file.
* [ ] Maintain responsive breakpoints; test key screens on mobile/desktop widths.
* [ ] Ensure interactive elements have hover, focus, and disabled states defined.

## 6. Testing & Quality Gates

_Docs: [Vue Test Utils Guide](https://test-utils.vuejs.org/guide/), [Vitest Guide](https://vitest.dev/guide/), [Playwright Docs](https://playwright.dev/docs/intro)_

* [ ] Write unit tests with Vitest + Testing Library for components/composables (happy path + edge cases); run `vue-tsc --noEmit` or ESLint type-aware rules when TypeScript is enabled.
* [ ] Cover routing flows and critical journeys with Cypress or Playwright E2E specs.
* [ ] Snapshot tests are acceptable only for stable, low-volatility markup.
* [ ] Add contract tests or MSW mocks for API integrations to keep UI isolated from backend drift.
* [ ] All new code must pass `npm run lint`, `npm run test`, `npm run build`, and `npm run typecheck` (when TypeScript is configured) before merge.

## 7. Performance & Observability

_Docs: [Vue Performance Best Practices](https://vuejs.org/guide/best-practices/performance.html), [Suspense & Async Components](https://vuejs.org/guide/built-ins/suspense.html)_

* [ ] Lazy-load heavyweight components; combine with `Suspense` + skeleton fallbacks.
* [ ] Use `computed`/`watch` sparingly; memoize expensive computations and clear watchers on unmount.
* [ ] Track Web Vitals and key metrics (TTFB, FID, CLS) via analytics/observability tooling.
* [ ] Budget bundle size per route; fail builds if chunks exceed agreed thresholds.
* [ ] Instrument critical user flows with logging/telemetry that respects privacy guidelines.

## 8. Accessibility & Internationalization

_Docs: [Vue Accessibility Guide](https://vuejs.org/guide/best-practices/accessibility.html), [Vue I18n Guide](https://vue-i18n.intlify.dev/guide/)_

* [ ] Run automated accessibility checks (axe, Pa11y) and address WCAG AA issues before release.
* [ ] Ensure components expose proper ARIA roles, labels, and keyboard navigation.
* [ ] Manage focus on route changes and dialog interactions.
* [ ] Externalize copy in localization files; support pluralization and RTL if applicable.

## 9. Documentation & Collaboration

_Docs: [Architecture Decision Records](https://adr.github.io/), [Storybook Docs](https://storybook.js.org/docs)_

* [ ] Update architectural or feature ADRs when decisions impact shared patterns.
* [ ] Maintain README or Storybook docs for reusable components and composables.
* [ ] Capture release notes and migration steps whenever breaking changes ship.
* [ ] Link design specs, API contracts, and tracking tickets directly from merge requests.

## 10. Documentation Lookup & Research

_Docs: [Vue Docs Search](https://vuejs.org/), [Awesome Vue Ecosystem](https://github.com/vuejs/awesome-vue)_

* [ ] When unclear on behaviour, search the official Vue docs (and relevant ecosystem guides) before adding workarounds; cite discoveries in PRs or ADRs.
* [ ] Monitor Vue release notes and RFCs to anticipate breaking changes and plan migrations early.
* [ ] Cross-reference companion libraries (Pinia, Vue Router, Vitest, Playwright) to confirm compatibility and configuration details.
* [ ] Maintain a shared index of frequently referenced documentation pages in the project wiki or docs site for quick lookup.

Adhere to this checklist to keep Vue applications stable, discoverable, and easy for teammates to extend.
