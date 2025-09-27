---
description: 'RESTful delivery guardrails for predictable, evolvable APIs.'
applyTo: '**/*'
---

# RESTful API Delivery Checklist

Use this checklist to design, implement, and operate REST-style services that honor HTTP semantics.

## 1. REST Foundations & Constraints

_Docs: [Fielding Dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf), [REST Architectural Style](https://restfulapi.net/rest-architectural-constraints/)_

* [ ] Reaffirm the six REST constraints (client-server, stateless, cacheable, uniform interface, layered system, optional code-on-demand) for each project.
* [ ] Document which constraints are intentionally relaxed and capture mitigations for resulting trade-offs.
* [ ] Align API governance charters with REST principles to avoid RPC-style coupling and chatty endpoints.

## 2. Resource Modeling & Domain Boundaries

_Docs: [Microsoft REST API Guidelines – Resource Model](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#7-resource-model), [JSON:API Concepts](https://jsonapi.org/format/#document-structure)_

* [ ] Identify domain resources, relationships, and collection boundaries before writing endpoints.
* [ ] Map verbs to state transitions on resources; avoid embedding operations that mutate unrelated aggregates.
* [ ] Expose relationship links or identifiers so clients can traverse associations without bespoke endpoints.

## 3. URI Design & Naming

_Docs: [RFC 3986 URI Syntax](https://www.rfc-editor.org/rfc/rfc3986), [Google API URI Design Guide](https://cloud.google.com/apis/design/names)_

* [ ] Use plural nouns for collections (`/users`) and nested paths for containment (`/users/{id}/posts`).
* [ ] Keep URIs opaque identifiers—do not encode business logic or session data in the path.
* [ ] Support discoverability by advertising canonical URIs via `Link` headers or documented navigation patterns.

## 4. HTTP Methods & Semantics

_Docs: [RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110), [MDN HTTP Methods](https://developer.mozilla.org/docs/Web/HTTP/Methods)_

* [ ] Match CRUD semantics to methods: GET (safe, idempotent), POST (non-idempotent create/action), PUT/PATCH (idempotent updates), DELETE (idempotent removal).
* [ ] Honor method idempotency and safety guarantees; avoid side effects in GET/HEAD endpoints.
* [ ] Implement proper status codes (201 on create, 204 on delete, 409 for conflicts) instead of overloading 200.

## 5. Representations & Hypermedia

_Docs: [HAL Specification](https://stateless.group/hal_specification.html), [IANA Media Type Registry](https://www.iana.org/assignments/media-types/media-types.xhtml)_

* [ ] Serve resources with explicit media types (`application/json`, custom vendor types) and include charset when applicable.
* [ ] Provide hypermedia controls (links, embedded resources) where clients benefit from runtime navigation.
* [ ] Version representations via content negotiation (`Accept`, `Content-Type`) before resorting to URI versioning.

## 6. Filtering, Sorting & Pagination

_Docs: [JSON:API Filtering](https://jsonapi.org/recommendations/#filtering), [Microsoft REST API Guidelines – Query Parameters](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#721-query-parameters)_

* [ ] Use consistent query parameter names (`filter[status]`, `sort=-createdAt`, `page[size]`) across endpoints.
* [ ] Cap page sizes and advertise defaults/maximums in documentation and error responses.
* [ ] Include pagination metadata (links or cursors) so clients can traverse large datasets without guesswork.

## 7. Versioning & Evolution

_Docs: [API Evolution](https://cloud.google.com/apis/design/versioning), [Roy Fielding on Versioning](https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven)_

* [ ] Prefer additive, backward-compatible changes; treat breaking changes as new major versions.
* [ ] Communicate deprecation timelines via headers (`Sunset`, `Deprecation`) and changelog announcements.
* [ ] Maintain contract tests across supported versions to catch regressions before release.

## 8. Caching & Conditional Requests

_Docs: [RFC 9111 HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111), [MDN Conditional Requests](https://developer.mozilla.org/docs/Web/HTTP/Conditional_requests)_

* [ ] Annotate responses with cache directives (`Cache-Control`, `ETag`, `Last-Modified`) aligned to data volatility.
* [ ] Respect conditional headers (`If-None-Match`, `If-Modified-Since`) to enable efficient revalidation.
* [ ] Separate cacheable GET endpoints from non-cacheable actions; document caching expectations for integrators.

## 9. Error Handling & Problem Details

_Docs: [RFC 7807 Problem Details](https://www.rfc-editor.org/rfc/rfc7807), [Stripe API Error Design](https://stripe.com/docs/api/errors)_

* [ ] Return structured error payloads (type, title, detail, instance) to aid automated diagnosis.
* [ ] Differentiate client (4xx) and server (5xx) conditions; avoid masking validation errors with 500 responses.
* [ ] Localize human-readable messages while keeping machine-readable codes stable across locales.

## 10. Security, Auth & Rate Limiting

_Docs: [OWASP API Security Top 10](https://owasp.org/API-Security/), [OAuth 2.0 RFC 6749](https://www.rfc-editor.org/rfc/rfc6749)_

* [ ] Enforce TLS, strong authentication (OAuth 2.0/OIDC), and scopes/claims aligned with least privilege.
* [ ] Validate and sanitize all inputs, including headers and query parameters, to prevent injection attacks.
* [ ] Apply layered rate limiting (per user, per token, per IP) and surface quota status via response headers (`X-RateLimit-*`).

## 11. Documentation & Discoverability

_Docs: [OpenAPI Specification](https://www.openapis.org/), [Stoplight API Style Guide](https://stoplight.io/openapi)_

* [ ] Publish up-to-date OpenAPI/Swagger documents with examples, schemas, and auth flows.
* [ ] Provide quickstart guides and SDKs that mirror documented workflows.
* [ ] Embed changelog entries and migration notes with each release; notify consumers through agreed channels.

## 12. Testing, Monitoring & Reliability

_Docs: [Postman API Testing](https://learning.postman.com/docs/introduction/overview/), [OpenTelemetry HTTP Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/http/)_

* [ ] Automate contract, integration, and performance tests that run in CI and pre-production environments.
* [ ] Instrument endpoints with tracing, metrics (latency, error rate), and structured logs for observability.
* [ ] Continuously monitor SLIs/SLOs (availability, throughput) and rehearse incident response for API degradations.
