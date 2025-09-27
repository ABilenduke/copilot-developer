---
description: 'PHP engineering guardrails for maintainable applications.'
applyTo: '**/*'
---

# PHP Delivery Checklist

Use this checklist to ship reliable, modern PHP services, libraries, and applications.

## 1. Toolchain & Runtime Setup

_Docs: [php.net Installation Guide](https://www.php.net/manual/en/install.php), [PHP Release Support](https://www.php.net/supported-versions.php)_

* [ ] Pin supported PHP versions in `composer.json` and CI matrices; track end-of-life dates for planned upgrades.
* [ ] Standardize local/container runtimes with reproducible images (Docker, devcontainers) and capture required extensions.
* [ ] Automate environment bootstrapping (brew/apt scripts, Ansible) to install CLI tools, extensions, and intl/timezone data consistently.

## 2. Project Structure & Autoloading

_Docs: [Composer Autoloading](https://getcomposer.org/doc/04-schema.md#autoload), [PHP-FIG PSR-4](https://www.php-fig.org/psr/psr-4/)_

* [ ] Organize source under `src/` (libraries) or domain-driven folders (apps) aligned with PSR-4 namespaces.
* [ ] Separate application entrypoints (`public/index.php`, console binaries) from reusable domain logic.
* [ ] Generate optimized autoloaders in CI/CD (`composer dump-autoload --optimize`) and fail builds on namespace drift.

## 3. Coding Standards & Type Safety

_Docs: [PHP Manual – Type Declarations](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration), [PSR-12](https://www.php-fig.org/psr/psr-12/)_

* [ ] Enable strict types (`declare(strict_types=1);`) in new files and enforce scalar/return type declarations.
* [ ] Run automated formatters/linters (PHP-CS-Fixer, PHP_CodeSniffer) with PSR-12 profiles to keep diffs clean.
* [ ] Document nullable behaviors and union types explicitly in docblocks and method contracts.

## 4. Dependencies & Composer Hygiene

_Docs: [Composer CLI](https://getcomposer.org/doc/03-cli.md), [FriendsOfPHP security-advisories](https://github.com/FriendsOfPHP/security-advisories)_

* [ ] Use `composer.lock` as the single source of truth; enforce `composer install --no-dev --prefer-dist --no-interaction` in CI.
* [ ] Audit third-party packages with `composer audit`/Security Advisories and schedule remediation SLAs for critical CVEs.
* [ ] Prefer virtual packages (`provide`, `conflict`, `replace`) to express API contracts and prevent incompatible installs.

## 5. Testing Strategy

_Docs: [PHPUnit Manual](https://phpunit.de/manual/current/en/index.html), [Pest Documentation](https://pestphp.com/docs/installation)_

* [ ] Maintain fast unit suites (PHPUnit or Pest) with deterministic fixtures and CI gating.
* [ ] Cover integration boundaries (HTTP, database, queue) with containerized test harnesses or Testcontainers for PHP.
* [ ] Track code coverage trends; enforce minimum thresholds for critical modules and flag sudden drops.

## 6. Static Analysis & Quality Gates

_Docs: [PHPStan](https://phpstan.org/), [Psalm](https://psalm.dev/docs/)_

* [ ] Run PHPStan/Psalm at level 7+ (or comparable) in CI to harden against type regressions.
* [ ] Integrate Deptrac or PhpMetrics to watch for architectural boundary violations and complexity creep.
* [ ] Fail pipelines on static analysis or lint errors; surface reports as CI artifacts for developer triage.

## 7. Framework & Library Conventions

_Docs: [Laravel Documentation](https://laravel.com/docs), [Symfony Docs](https://symfony.com/doc/current/index.html)_

* [ ] Follow framework-specific best practices (service container bindings, config caching, artisan/console tooling) and document deviations.
* [ ] Treat framework upgrades as projects: rehearsal branches, deprecation audits, and changelog reviews before bumping versions.
* [ ] Keep reusable packages framework-agnostic by isolating adapters from core domain logic.

## 8. Configuration & Environment Management

_Docs: [PHP dotenv](https://github.com/vlucas/phpdotenv), [Symfony Config Component](https://symfony.com/doc/current/components/config.html)_

* [ ] Externalize secrets and environment-specific settings using `.env` files or secret managers; never commit real credentials.
* [ ] Validate configuration at bootstrap (required env vars, writable directories) and fail fast with descriptive errors.
* [ ] Version shared configs (feature flags, runtime settings) and ensure parity across development, staging, and production.

## 9. Database, ORM & Migrations

_Docs: [Doctrine ORM](https://www.doctrine-project.org/projects/orm.html), [Laravel Eloquent](https://laravel.com/docs/eloquent)_

* [ ] Standardize on migration tooling (Doctrine Migrations, Laravel migrations) and enforce forward-only, idempotent scripts.
* [ ] Use repositories or query builders to encapsulate persistence logic; avoid leaking SQL in controllers/views.
* [ ] Profile slow queries with database analyzers (EXPLAIN, Blackfire) and add indexes or caching layers accordingly.

## 10. Performance & Observability

_Docs: [Blackfire Profiler](https://blackfire.io/docs/introduction), [New Relic PHP Agent](https://docs.newrelic.com/docs/apm/agents/php-agent/)_

* [ ] Benchmark critical paths with profilers (Blackfire, Xdebug, Tideways) before and after major changes.
* [ ] Cache expensive computations with PSR-6/16 caches or opcache preloading; monitor hit ratios.
* [ ] Emit structured logs and metrics (Monolog, OpenTelemetry PHP) with correlation IDs for tracing.

## 11. Security & Compliance

_Docs: [OWASP PHP Security Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/PHP_Security_Cheat_Sheet.html), [CWE Top 25](https://cwe.mitre.org/top25/archive/2023/2023_cwe_top25.html)_

* [ ] Sanitize and validate all inbound data (filter_var, symfony/validator) before it reaches domain logic.
* [ ] Use parameterized queries or ORM guards against SQL injection; escape output for context (HTML, JS, JSON).
* [ ] Rotate keys/secrets regularly and enforce secure session handling (SameSite, HttpOnly, secure cookies).

## 12. Deployment & Documentation

_Docs: [PHP-FIG Deployment Best Practices](https://www.php-fig.org/bylaws/psr-beta/), [Twelve-Factor App](https://12factor.net/)_

* [ ] Automate build and deploy pipelines (GitHub Actions, GitLab CI) with zero-downtime strategies and health checks.
* [ ] Generate API/docs with tools like phpDocumentor or Doctum; publish change logs for public packages.
* [ ] Maintain incident runbooks (cache flush, queue restarts, rollbacks) and keep them synchronized with infra changes.
