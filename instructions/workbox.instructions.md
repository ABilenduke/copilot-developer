---
description: 'Workbox practices for resilient, offline-first web apps.'
applyTo: '**/*'
---

# Workbox Delivery Checklist

Use this checklist when building, shipping, or evolving service workers with Workbox.

## 1. Strategy & Service Worker Requirements

_Docs: [Workbox Overview](https://developer.chrome.com/docs/workbox/), [PWA Checklist](https://web.dev/pwa-checklist/)_

* [ ] Define offline, performance, and update goals up front (fully offline vs. rich network fallback) and confirm Workbox modules cover them.
* [ ] Map core user journeys to service worker responsibilities (precaching shell, runtime caching APIs, background sync) before implementation.
* [ ] Document unsupported browsers/constraints and decide on progressive enhancement or graceful degradation.

## 2. Tooling & Project Setup

_Docs: [Workbox CLI](https://developer.chrome.com/docs/workbox/modules/workbox-cli/), [Workbox Build Integration](https://developer.chrome.com/docs/workbox/modules/workbox-build/)_

* [ ] Install Workbox via npm and pin versions to avoid surprise runtime changes; note whether you use CLI, `workbox-build`, or bundler plugins (webpack, Rollup, Vite).
* [ ] Externalize Workbox configuration (`workbox-config.js`, bundler plugin options) and check it into version control for reproducible builds.
* [ ] Enable TypeScript typings or JSDoc annotations for custom service worker code to catch API misuse early.

## 3. Precaching & Build Integration

_Docs: [workbox-precaching](https://developer.chrome.com/docs/workbox/modules/workbox-precaching/), [GenerateSW/InjectManifest](https://developer.chrome.com/docs/workbox/reference/workbox-build/)_

* [ ] Choose between `GenerateSW` (managed service worker) or `InjectManifest` (custom service worker) based on customization needs.
* [ ] Include revisioned static assets and critical shell routes in the precache manifest; exclude large or frequently changing files.
* [ ] Validate precache integrity after builds (`workbox build` report, `GenerateSW` warnings) before deployment.

## 4. Runtime Caching Strategies

_Docs: [workbox-routing](https://developer.chrome.com/docs/workbox/modules/workbox-routing/), [workbox-strategies](https://developer.chrome.com/docs/workbox/modules/workbox-strategies/)_

* [ ] Match runtime routes precisely (origin, path, method) and assign strategies that reflect data volatility (cache-first, stale-while-revalidate, network-first).
* [ ] Layer plugins for cache expiration, cacheable response, and broadcast updates so stale assets refresh automatically.
* [ ] Partition caches by resource type (API JSON, images, fonts) to tune limits and debugging.

## 5. Offline UX & Background Sync

_Docs: [workbox-background-sync](https://developer.chrome.com/docs/workbox/modules/workbox-background-sync/), [Offline Fallback](https://web.dev/offline-fallback-page/)_

* [ ] Provide offline fallbacks for navigation, media, and API errors; surface user-friendly messaging when data cannot sync.
* [ ] Queue write operations with background sync where appropriate and set retry policies aligned with API rate limits.
* [ ] Capture analytics events offline (workbox-google-analytics or custom queue) and replay them once connectivity returns.

## 6. Advanced Workbox Modules

_Docs: [Navigation Preload](https://developer.chrome.com/docs/workbox/modules/workbox-navigation-preload/), [Streaming Responses](https://developer.chrome.com/docs/workbox/modules/workbox-streams/)_

* [ ] Enable navigation preload on network-first routes to reduce time-to-first-byte on slow connections.
* [ ] Use `workbox-streams` or `workbox-range-requests` for progressive rendering or partial content when large payloads are involved.
* [ ] Evaluate `workbox-window` for communicating updates to clients and prompting users to refresh smoothly.

## 7. Testing & Quality Assurance

_Docs: [Lighthouse PWA Audits](https://developer.chrome.com/docs/lighthouse/pwa/lighthouse-pwa/), [Workbox Testing Guide](https://developer.chrome.com/docs/workbox/guides/testing/)_

* [ ] Write integration tests that register the service worker, assert cache population, and verify runtime routes with mock fetch responses.
* [ ] Automate Lighthouse PWA audits (CI) to catch regressions in offline readiness, caching, and best practices.
* [ ] Test update flows with controlled builds to ensure existing clients receive new assets without 404s or infinite reload loops.

## 8. Deployment & Versioning

_Docs: [Service Worker Lifecycle](https://developer.chrome.com/docs/workbox/guides/advanced-guides/service-worker-lifecycle/), [Workbox Production Checklist](https://developer.chrome.com/docs/workbox/guides/production/)_

* [ ] Increment cache names or manifest revisions on every deploy; automate via bundler hashing to guarantee fresh asset retrieval.
* [ ] Decide on `skipWaiting`/`clientsClaim` strategy and communicate update prompts to users when breaking changes ship.
* [ ] Serve the service worker over HTTPS with correct scope headers and ensure CI/CD purges CDN caches when assets rotate.

## 9. Monitoring & Observability

_Docs: [workbox-window](https://developer.chrome.com/docs/workbox/modules/workbox-window/), [Google Analytics Module](https://developer.chrome.com/docs/workbox/modules/workbox-google-analytics/)_

* [ ] Instrument cache hit/miss ratios and queue sizes; forward metrics to analytics or logging platforms for trend analysis.
* [ ] Capture service worker errors (install, activate, fetch) and surface them via `clients.matchAll` or `workbox-window` to inform debugging.
* [ ] Review storage quotas and eviction events periodically to keep offline caches within device limits.

## 10. Documentation & Knowledge Sharing

_Docs: [Workbox Guides](https://developer.chrome.com/docs/workbox/guides/), [Workbox Release Notes](https://github.com/GoogleChrome/workbox/releases)_

* [ ] Maintain a runbook covering build commands, cache naming conventions, and rollback steps for service worker incidents.
* [ ] Track Workbox release notes and migrate to new modules or breaking changes during scheduled maintenance windows.
* [ ] Share postmortems and best practices with product teams to keep offline strategy aligned with evolving user needs.
