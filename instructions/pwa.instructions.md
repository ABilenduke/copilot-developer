---
description: 'Progressive Web App guardrails for fast, resilient user experiences.'
applyTo: '**/*'
---

# PWA Delivery Checklist

Use this checklist when designing, building, and shipping progressive web apps.

## 1. Product Strategy & App Shell

_Docs: [What Makes a Good PWA](https://web.dev/what-are-pwas/), [App Shell Model](https://web.dev/app-shell/)_

* [ ] Define core user journeys and decide which flows must function offline or on poor networks.
* [ ] Establish an app shell architecture that keeps navigation and critical UI responsive during fetch failures.
* [ ] Document fallback experiences for unsupported features (legacy browsers, restricted storage) and communicate them to stakeholders.

## 2. Web App Manifest & Installability

_Docs: [Web App Manifest](https://developer.mozilla.org/docs/Web/Manifest), [Installable Criteria](https://web.dev/install-criteria/)_

* [ ] Provide a complete manifest (`name`, `short_name`, `start_url`, `scope`, `display`, `background_color`, `theme_color`).
* [ ] Supply multi-resolution icons and maskable icons for adaptive launcher shapes.
* [ ] Host the manifest at the app root and link it from every entry document; validate with DevTools' Application panel.

## 3. Service Worker & Caching Strategy

_Docs: [Service Workers Overview](https://developer.chrome.com/docs/workbox/service-worker-overview/), [Offline Cookbook](https://web.dev/service-worker-cookbook/)_

* [ ] Register a service worker that precaches critical shell assets and guards network requests with deterministic strategies.
* [ ] Version cache names and clean up old caches during the `activate` event to prevent storage bloat.
* [ ] Guard third-party requests with fail-fast logic (fallback assets, network timeout) to avoid hanging promises.

## 4. Offline UX & Data Resilience

_Docs: [Reliable Offline Experiences](https://web.dev/reliable/), [Background Sync](https://web.dev/background-sync/)_

* [ ] Provide offline fallbacks for navigation, forms, and media (cached pages, queued submissions, placeholder assets).
* [ ] Queue mutations for retry with Background Sync or custom IndexedDB queues; surface status to users.
* [ ] Detect connectivity changes and communicate when fresh content is available or when the app is offline.

## 5. Performance & Core Web Vitals

_Docs: [Core Web Vitals](https://web.dev/vitals/), [Web Performance with Lighthouse](https://web.dev/lighthouse-performance/)_

* [ ] Optimize render-critical bundles (code splitting, tree shaking) and defer non-essential scripts.
* [ ] Use `Cache-Control`/`ETag` headers to balance freshness and cache hit rates for API responses.
* [ ] Monitor CWV (LCP, FID, CLS) in lab and field data; regressions should block releases.

## 6. Security & Platform Compliance

_Docs: [Service Workers and HTTPS](https://web.dev/service-worker-lifecycle/#require-https), [Cross-Origin Isolation](https://web.dev/coop-coep/)_

* [ ] Serve the entire PWA over HTTPS and enforce HSTS; service workers must never be registered on insecure origins.
* [ ] Apply `Content-Security-Policy` that balances safety with caching needs; avoid wildcard sources for scripts.
* [ ] Review storage quotas and permissions (notifications, geolocation) with privacy/legal before prompting users.

## 7. Engagement Features & Notifications

_Docs: [Web Push Notifications](https://web.dev/push-notifications-overview/), [Badging API](https://web.dev/badging-api/)_

* [ ] Request push/subscription permissions with contextual UX and fallbacks for unsupported browsers.
* [ ] Store push subscriptions encrypted, rotate VAPID keys as needed, and respect user opt-out requests.
* [ ] Use engagement APIs (Shortcuts, Badging, File Handling) judiciously and document their availability matrix.

## 8. Testing & QA Automation

_Docs: [Lighthouse PWA Checklist](https://developer.chrome.com/docs/lighthouse/pwa/), [PWABuilder Testing](https://docs.pwabuilder.com/#/starter/quick-start)_

* [ ] Automate Lighthouse PWA audits in CI; enforce passing scores for installability, offline support, and best practices.
* [ ] Run end-to-end tests in offline/online toggles to validate caching, background sync, and update flows.
* [ ] Verify install prompts on major platforms (Chrome, Edge, Safari, Android) before releases.

## 9. Deployment & Version Management

_Docs: [Service Worker Update Lifecycle](https://developer.chrome.com/docs/workbox/guides/advanced-guides/service-worker-lifecycle/), [Rollouts & Canary Releases](https://web.dev/phased-rollouts/)_

* [ ] Automate build hashing and manifest revisions so new deployments invalidate stale caches predictably.
* [ ] Choose an update strategy (`skipWaiting` vs. manual prompt) and communicate changes to users.
* [ ] Canary releases on staggered cohorts or regions to detect service worker regressions safely.

## 10. Monitoring & Support

_Docs: [Web Vitals Field Monitoring](https://web.dev/vitals-field-measurement-best-practices/), [Crash & Error Reporting](https://web.dev/error-reporting-with-crux/)_

* [ ] Capture runtime errors, service worker install failures, and cache metrics; feed them into observability dashboards.
* [ ] Track install/uninstall events and prompt rates to fine-tune engagement UX.
* [ ] Maintain a support playbook for cache purges, rollback procedures, and user troubleshooting tips.
