---
description: 'Laravel delivery guardrails for scalable PHP applications.'
applyTo: '**/*'
---

# Laravel Delivery Checklist

Use this checklist when building, testing, and operating Laravel applications.

## 1. Tooling & Environment Setup

_Docs: [Laravel Installation](https://laravel.com/docs/installation), [Sail & Docker](https://laravel.com/docs/sail)_

* [ ] Standardize on supported PHP, Composer, Node, and Laravel versions; document upgrade cadence and tooling prerequisites.
* [ ] Provide devcontainers or Sail/Docker compose definitions that mirror production extensions (Redis, MySQL/Postgres, Horizon).
* [ ] Automate local bootstrap scripts (`composer install`, `php artisan key:generate`, `npm install && npm run build`) for new contributors.

## 2. Project Structure & Conventions

_Docs: [Application Structure](https://laravel.com/docs/structure)_

* [ ] Organize domain logic into modules (actions, services, value objects) instead of placing everything in controllers.
* [ ] Keep Blade views, Livewire components, and Inertia pages lean; move business rules into dedicated classes.
* [ ] Document architectural decisions (e.g., hexagonal layers, DDD) in ADRs for future contributors.

## 3. Configuration & Environment Management

_Docs: [Configuration](https://laravel.com/docs/configuration), [Environment Variables](https://laravel.com/docs/configuration#environment-configuration)_

* [ ] Store secrets in `.env` files or secret managers; never commit real credentials or API keys.
* [ ] Use config caching (`php artisan config:cache`) in production and ensure cache warmers run during deploys.
* [ ] Maintain environment parity by versioning `.env.example`, queue/cron schedules, and feature flag defaults.

## 4. Routing, Controllers & Middleware

_Docs: [Routing](https://laravel.com/docs/routing), [Middleware](https://laravel.com/docs/middleware)_

* [ ] Define route model binding and request validation in form requests to keep controllers narrow.
* [ ] Apply authentication/authorization middleware at route groups; avoid inline gate checks in controllers.
* [ ] Document API versioning and rate-limiting strategy; ensure `Route::middleware('throttle:...')` policies exist for public endpoints.

## 5. Database & Eloquent Modeling

_Docs: [Eloquent ORM](https://laravel.com/docs/eloquent), [Migrations](https://laravel.com/docs/migrations)_

* [ ] Keep Eloquent models focused on persistence; extract complex queries to scopes or repository classes.
* [ ] Enforce forward-only migrations and seeders with idempotent operations; run `php artisan migrate --pretend` in CI.
* [ ] Guard against N+1 queries using eager loading, `Model::preventLazyLoading()`, or Laravel Debugbar/Clockwork in non-prod.

## 6. Validation, Serialization & APIs

_Docs: [Validation](https://laravel.com/docs/validation), [API Resources](https://laravel.com/docs/eloquent-resources)_

* [ ] Centralize input validation in form requests or custom rules; add translation strings for user-facing errors.
* [ ] Use API Resources/Transformers to serialize responses; avoid returning raw models from controllers.
* [ ] Implement pagination standards (`LengthAwarePaginator`, `cursorPaginate`) and document query parameters.

## 7. Queues, Events & Scheduling

_Docs: [Queues](https://laravel.com/docs/queues), [Events](https://laravel.com/docs/events), [Task Scheduling](https://laravel.com/docs/scheduling)_

* [ ] Configure queue workers (Horizon, Supervisor) with retry policies, failover queues, and alerting for stalled jobs.
* [ ] Keep jobs and listeners idempotent; log correlation IDs to trace async workflows.
* [ ] Version scheduled commands in source control and document cron/Horizon dashboards in runbooks.

## 8. Caching, Performance & Storage

_Docs: [Cache](https://laravel.com/docs/cache), [Filesystem](https://laravel.com/docs/filesystem), [Octane](https://laravel.com/docs/octane)_

* [ ] Use tagged caches and cache drivers (Redis, Memcached) appropriate for the workload; bust caches on deploy via events or versioned keys.
* [ ] Optimize asset builds with Vite/Mix, lazy-load relationships, and consider Octane for high-throughput APIs.
* [ ] Store user-uploaded files on S3/Blob providers with signed URLs and lifecycle policies; never rely on local storage for production.

## 9. Testing Strategy

_Docs: [Testing](https://laravel.com/docs/testing), [Pest for Laravel](https://pestphp.com/docs/laravel)_

* [ ] Maintain unit, feature, and browser (Dusk/Playwright) tests; run suites in CI with parallelization when possible.
* [ ] Use database transactions or RefreshDatabase traits to isolate tests; seed reference data via factories.
* [ ] Mock external services with HTTP fakes or contract tests; ensure critical queues/events are covered in integration tests.

## 10. Security & Authentication

_Docs: [Authentication](https://laravel.com/docs/authentication), [Authorization](https://laravel.com/docs/authorization), [Encryption](https://laravel.com/docs/encryption)_

* [ ] Standardize auth implementations (Fortify, Breeze, Jetstream, Sanctum, Passport) and document token lifetimes.
* [ ] Enforce policies/gates for resource access and verify coverage with authorization tests.
* [ ] Rotate APP_KEY and encryption keys securely; audit CSRF, mass-assignment, and serialization boundaries regularly.

## 11. Observability & Operations

_Docs: [Logging](https://laravel.com/docs/logging), [Laravel Telescope](https://laravel.com/docs/telescope)_

* [ ] Configure Monolog channels (Stack, Syslog, Cloud logs) with structured context and correlation IDs.
* [ ] Use Telescope, Horizon dashboards, or third-party APMs (New Relic, Sentry) in non-production for diagnostics; guard production access.
* [ ] Instrument health checks (`/healthz`), queue metrics, and cache hit ratios; alert on anomalies with clear runbooks.

## 12. Deployment, Upgrades & Documentation

_Docs: [Deployment](https://laravel.com/docs/deployment), [Upgrade Guide](https://laravel.com/docs/upgrade)_

* [ ] Automate zero-downtime deployments (Envoy, GitHub Actions, Forge, Vapor) with atomic `php artisan down --secret` safeguards.
* [ ] Follow official upgrade guides; run Laravel Shift/Rectify or Rector to tackle deprecations before version bumps.
* [ ] Keep README, onboarding docs, and API references current; record incident retrospectives and share lessons learned.
