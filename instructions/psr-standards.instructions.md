---
description: 'PSR interoperability guardrails for modern PHP ecosystems.'
applyTo: '**/*'
---

# PSR Standards Delivery Checklist

Use this checklist to align PHP codebases and libraries with PHP-FIG PHP Standard Recommendations (PSRs).

## 1. Coding Style & Basic Conventions

_Docs: [PSR-1](https://www.php-fig.org/psr/psr-1/), [PSR-12](https://www.php-fig.org/psr/psr-12/)_

* [ ] Enforce PSR-1 naming, file structure, and autoloadable class requirements across the project.
* [ ] Format code according to PSR-12 (indentation, namespace placement, control structures) using automated tools (PHP-CS-Fixer, PHP_CodeSniffer).
* [ ] Block pulls that violate PSR-12 via CI linting and pre-commit hooks.

## 2. Autoloading & Package Structure

_Docs: [PSR-4](https://www.php-fig.org/psr/psr-4/)_

* [ ] Configure Composer autoload sections using PSR-4 namespace prefixes mapped to `src/` directories.
* [ ] Mirror namespace hierarchies to directory structures and avoid class-map fallbacks for new code.
* [ ] Validate autoloaders with `composer dump-autoload --optimize` in CI to detect namespace drift.

## 3. Interfaces, Contracts & Extensibility

_Docs: [PSR-1](https://www.php-fig.org/psr/psr-1/), [PSR-12](https://www.php-fig.org/psr/psr-12/)_

* [ ] Publish public interfaces for extensibility points; avoid exposing concrete implementations in consumer APIs.
* [ ] Document interface semantics inline and in README/API docs to facilitate interoperable adapters.
* [ ] Version interfaces carefully, following semantic versioning and marking deprecated methods before removal.

## 4. Logging Integration

_Docs: [PSR-3](https://www.php-fig.org/psr/psr-3/)_

* [ ] Depend on `Psr\Log\LoggerInterface` instead of framework-specific loggers.
* [ ] Map custom log levels to PSR-3 severity semantics and document any adapter-specific metadata usage.
* [ ] Provide default null or buffer loggers to keep packages usable without external dependencies.

## 5. Caching Abstractions

_Docs: [PSR-6](https://www.php-fig.org/psr/psr-6/), [PSR-16](https://www.php-fig.org/psr/psr-16/)_

* [ ] Use `Psr\Cache\CacheItemPoolInterface` for complex cache orchestration and `Psr\SimpleCache\CacheInterface` for lightweight scenarios.
* [ ] Surface cache configuration (TTL, key namespaces) through dependency injection to allow drop-in replacements.
* [ ] Provide integration tests covering cache hit/miss behavior with at least one PSR-compliant cache provider.

## 6. HTTP Messages & Middleware

_Docs: [PSR-7](https://www.php-fig.org/psr/psr-7/), [PSR-15](https://www.php-fig.org/psr/psr-15/)_

* [ ] Accept and emit `Psr\Http\Message\ServerRequestInterface`/`ResponseInterface` objects across HTTP layers.
* [ ] Implement middleware using `Psr\Http\Server\MiddlewareInterface` and `RequestHandlerInterface` to maximize framework portability.
* [ ] Validate that immutability guarantees of PSR-7 objects are preserved when decorating or modifying requests/responses.

## 7. HTTP Factories & Clients

_Docs: [PSR-17](https://www.php-fig.org/psr/psr-17/), [PSR-18](https://www.php-fig.org/psr/psr-18/)_

* [ ] Depend on PSR-17 factories for constructing requests, responses, streams, and URIs within libraries.
* [ ] Integrate HTTP clients via `Psr\Http\Client\ClientInterface` to support multiple transport implementations.
* [ ] Provide discovery or configuration options for selecting concrete PSR-17/18 implementations at runtime.

## 8. Dependency Injection & Service Containers

_Docs: [PSR-11](https://www.php-fig.org/psr/psr-11/)_

* [ ] Design components to receive dependencies via `Psr\Container\ContainerInterface` or direct constructor injection.
* [ ] Fail fast with `NotFoundExceptionInterface` / `ContainerExceptionInterface` when services are unavailable or misconfigured.
* [ ] Document required container entries and publish factory helpers for popular container libraries.

## 9. Event Dispatching

_Docs: [PSR-14](https://www.php-fig.org/psr/psr-14/)_

* [ ] Emit domain events via `Psr\EventDispatcher\EventDispatcherInterface` to decouple publishers and listeners.
* [ ] Keep events immutable or document mutation semantics; prefer value objects to arrays for payloads.
* [ ] Provide listener discovery and priority strategies compatible with PSR-14 dispatchers.

## 10. Error Handling & HTTP Exceptions

_Docs: [PSR-7](https://www.php-fig.org/psr/psr-7/), [RFC 7807](https://datatracker.ietf.org/doc/html/rfc7807)_

* [ ] Normalize HTTP exceptions using PSR-7-compliant responses and optional RFC 7807 problem detail payloads.
* [ ] Convert framework-specific exceptions into PSR-aware responses at integration boundaries.
* [ ] Log critical errors through PSR-3 before returning sanitized responses to callers.

## 11. Testing & Compliance

_Docs: [PHPUnit](https://phpunit.de/), [PHP-FIG Compliance Tools](https://github.com/php-fig)_

* [ ] Add PHPUnit suites to assert PSR compliance (e.g., middleware contract tests, cache behavior, container expectations).
* [ ] Use community test suites (HTTPlug, psr/http-factory-tests) to validate HTTP client and factory adherence.
* [ ] Include static analysis (PHPStan/Psalm) rules that flag violations of PSR interfaces and method signatures.

## 12. Documentation & Release Management

_Docs: [PHP-FIG](https://www.php-fig.org/), [Semantic Versioning](https://semver.org/)_

* [ ] Reference supported PSRs in package READMEs, changelogs, and composer metadata (`provide`/`suggest`).
* [ ] Announce PSR adoption or upgrades in release notes, highlighting migration guidance for breaking changes.
* [ ] Participate in FIG discussions when proposing deviations; align internal standards with upcoming PSR drafts.
