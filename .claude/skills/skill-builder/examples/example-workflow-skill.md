---
name: api-client-generator
description: >-
  Interactive workflow for generating type-safe API client classes that integrate
  with the external API infrastructure. Guides through API discovery, endpoint
  mapping, response typing, error handling, and rate limit configuration.
  Activates when the user wants to add a new API integration, says "new API client",
  "integrate with [service]", "add [service] API", or needs to connect to an
  external service.
---

# API Client Generator

## HARD RULES

These rules are absolute. No exceptions.

### Rule 1: ALWAYS extend BaseApiClient

Every API client must extend `App\Services\ExternalApi\BaseApiClient`. Never create standalone HTTP client classes. The base class provides rate limiting, circuit breaker, request logging, and retry logic.

### Rule 2: NEVER hardcode API keys

API credentials must come from the `api_connections` table via `ApiConnection::getCredentials()`. Never use `env()` or `config()` for API keys directly in client classes.

### Rule 3: ALWAYS add to ApiProvider enum

Every new API integration must have a corresponding case in `App\Enums\ApiProvider`. The enum value is used for rate limit tracking, connection management, and request logging.

### Rule 4: ALWAYS generate tests

Every API client must have a corresponding test file with mocked HTTP responses. No client ships without tests.

---

## Purpose

This skill guides you through building a new API client that integrates with the existing external API infrastructure. It ensures every client follows the established patterns for authentication, rate limiting, error handling, and response typing — producing consistent, production-ready integrations.

## First Steps

When this skill is invoked:

1. Read the supporting files in this skill directory:
    - `templates/client-template.md` — output template for the API client class
    - `examples/example-client.md` — completed Pexels client showing expected quality
2. Read the existing API infrastructure:
    - `app/Services/ExternalApi/BaseApiClient.php` — base class to extend
    - `app/Enums/ApiProvider.php` — existing provider cases
    - `app/Services/ExternalApi/RateLimitTracker.php` — rate limit integration
3. Ask: "Which API are you integrating with? Share the API documentation URL if available."
4. Begin Phase 1 immediately

---

## How It Works: The 4-Phase Process

The process is **conversational and interactive**. Guide the user through each phase, pulling from API docs and codebase patterns.

### Critical Rules

1. **Ask ONE question at a time.** This is a conversation, not a form.
2. **Reflect back what you heard.** Summarize before moving on.
3. **Challenge weak answers.** "We'll handle all endpoints" is not a scope — push for specifics.
4. **Track progress visibly.** Show the progress indicator every response.
5. **Build incrementally.** Write to disk at checkpoints.
6. **Reference actual codebase patterns.** Show how existing clients solve similar problems.

---

## Phase Details

### Phase 1: API Discovery (WHAT ARE WE CONNECTING TO)

**Goal**: Understand the API, its authentication model, and rate limits.

Explore:
- What service are we integrating with?
- What authentication method? (API key, OAuth2, Bearer token)
- What are the rate limits? (requests/minute, daily quota)
- Is there a sandbox/test environment?
- What data format? (JSON, XML, GraphQL)

**Actions**:
- Fetch and read the API documentation if a URL was provided
- Check if the API already exists in `ApiProvider` enum

**Output**: API profile — name, auth method, rate limits, base URL, data format.

### Phase 2: Endpoint Mapping (WHAT DO WE NEED)

**Goal**: Identify which endpoints to implement and what data they return.

Explore:
- Which endpoints do we need for v1? (List the minimum viable set)
- What does each response look like? (Shape the DTO/response types)
- Are there pagination patterns? (cursor, offset, page-based)
- Any webhook endpoints to receive? (Incoming vs outgoing)

**Technique**: Walk through each endpoint — method, path, parameters, response shape.

**Output**: Endpoint manifest with request/response shapes.

**Checkpoint**: Write the `ApiProvider` enum case and create the empty client class file.

### Phase 3: Implementation (BUILD IT)

**Goal**: Generate the complete API client with types, error handling, and rate limiting.

**Actions**:
1. Add case to `ApiProvider` enum with rate limit configuration
2. Create the client class extending `BaseApiClient`
3. Implement each endpoint method with:
    - Typed parameters and return values
    - Rate limit check via `RateLimitTracker`
    - Error handling using `ApiException` hierarchy
    - Response mapping to typed DTOs or arrays
4. Create response DTO classes if the API returns complex objects
5. Register the client in `ApiClientFactory`

**Output**: Complete client class, DTOs, factory registration, enum case.

**Checkpoint**: Write all PHP files. Review against quality checklist.

### Phase 4: Testing & Integration (PROVE IT WORKS)

**Goal**: Generate tests and verify the integration.

**Actions**:
1. Create test file with `Http::fake()` mocked responses
2. Test each endpoint method:
    - Happy path with realistic response data
    - Error responses (401, 403, 404, 429, 500)
    - Rate limit exceeded scenario
    - Malformed response handling
3. Test the factory resolves the new client
4. Run the test suite

**Output**: Passing test suite covering all endpoints and error cases.

**Checkpoint**: Run tests. If green, finalize. If red, fix and re-run.

---

## Progress Indicator

Start EVERY response with:

```
🔌 API Client Generator: Phase N of 4 — [Phase Name]
[██████░░░░░░░░] N/4 complete
```

---

## Quality Checklist

Before finalizing:

- [ ] Client extends `BaseApiClient` (not standalone)
- [ ] `ApiProvider` enum has new case with rate limit config
- [ ] `ApiClientFactory` resolves the new client
- [ ] All endpoint methods have typed parameters and return values
- [ ] Rate limiting integrated via `RateLimitTracker`
- [ ] Error handling uses `ApiException` hierarchy (not generic exceptions)
- [ ] No hardcoded API keys — credentials from `api_connections` table
- [ ] Tests cover happy path, error responses, and rate limit scenarios
- [ ] Tests use `Http::fake()` — no real API calls in tests
- [ ] All tests pass

---

## Handling Impatience

- **"Can we skip to coding?"** → "Let me confirm the endpoint list and I'll generate everything. Two quick questions..."
- **"I already know the API well"** → "Give me the endpoint list with request/response shapes and I'll generate the client directly."
- **"Just look at the API docs"** → Fetch the docs, propose the endpoint manifest, ask for confirm/correct.

---

## After Completion

Once the client is complete:

1. Summarize: files created, endpoints implemented, test count
2. Provide manual testing instructions: "Create an `ApiConnection` record for {provider} with your API key, then test with tinker: `app(XyzClient::class)->search('test')`"
3. Remind: "If the API adds new endpoints later, extend the existing client — don't create a second one."

$ARGUMENTS
