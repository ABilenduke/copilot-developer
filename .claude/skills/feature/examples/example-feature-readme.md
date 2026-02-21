# Example: Well-Written Feature README

This shows a good feature README — concise, focused on "what" and "why", no implementation details.

---

# Broadcasting

## What is it?

Real-time communication layer using Laravel Reverb as the WebSocket server and Laravel Echo on the frontend. Runs as a dedicated Docker service with nginx proxying, and exposes Vue composables for channel subscriptions.

## Why does it exist?

Enables real-time features (notifications, live content updates, collaborative signals) without polling. The foundation for any future feature that needs instant feedback.

---

## What makes this good

1. **"What" is concrete** — names specific technologies (Reverb, Echo), how it's deployed (Docker service), and what it exposes (Vue composables)
2. **"Why" explains the need** — not "because we need WebSockets" but "enables real-time features without polling"
3. **No implementation details** — doesn't list files, configs, or code patterns (that's for plans and skills)
4. **Appropriate length** — 2-3 sentences each, readable in 10 seconds

## Common mistakes to avoid

- **Too vague**: "Handles real-time stuff" — doesn't say how or what technologies
- **Too detailed**: Listing every config file, Docker port, and nginx rule — that's plan/skill territory
- **Implementation-focused**: "Uses `configureEcho()` in `echo.ts` with Reverb broadcaster" — too technical for a README
- **Missing the "why"**: Just describing what it does without explaining the problem it solves
