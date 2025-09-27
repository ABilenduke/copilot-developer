---
description: 'HTML authoring guardrails for semantic, resilient interfaces.'
applyTo: '**/*'
---

# HTML Delivery Checklist

Use this checklist when planning, authoring, and maintaining production HTML.

## 1. Information Architecture & Semantics

_Docs: [HTML Elements Reference](https://developer.mozilla.org/docs/Web/HTML/Element), [W3C HTML Standard](https://html.spec.whatwg.org/multipage/)_.

* [ ] Map content hierarchy to appropriate semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
* [ ] Avoid non-semantic wrappers unless required; replace `<div>`/`<span>` with richer elements when semantics exist.
* [ ] Provide descriptive section headings and link text to support assistive technologies and SEO.

## 2. Tooling & Environment Setup

_Docs: [W3C Nu HTML Checker](https://validator.w3.org/nu/), [MDN HTML Development Tools](https://developer.mozilla.org/docs/Web/HTML/Using_HTML_developing#tools)_.

* [ ] Standardize on linting/formatting (e.g., HTMLHint, Prettier) and integrate them into local and CI workflows.
* [ ] Configure editor extensions for Emmet/IntelliSense, live preview, and accessibility hints.
* [ ] Automate validation (Nu HTML Checker, axe, Lighthouse) as part of build pipelines.

## 3. Document Structure & Metadata

_Docs: [MDN: HTML Document Structure](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure), [MDN: Metadata in HTML](https://developer.mozilla.org/docs/Web/HTML/Element/meta)_.

* [ ] Declare correct `<!DOCTYPE html>` and language (`<html lang="…">`) attributes.
* [ ] Populate `<head>` with responsive viewport, charset, canonical URLs, and required SEO/social meta tags.
* [ ] Reference stylesheets/scripts with integrity, fallback plans, and defer/async where applicable.

## 4. Accessibility & Inclusive Design

_Docs: [WAI ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/), [MDN Accessibility Overview](https://developer.mozilla.org/docs/Learn/Accessibility/HTML)_.

* [ ] Ensure logical heading hierarchy and land marking; keep one `<h1>` per page or section as appropriate.
* [ ] Provide text alternatives for images (`alt`), aria-labels for icon-only controls, and captions/transcripts for media.
* [ ] Manage focus order, skip links, and keyboard operability across interactive content.

## 5. Forms, Inputs & Validation

_Docs: [MDN: Form Best Practices](https://developer.mozilla.org/docs/Learn/Forms/Form_validation), [W3C Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)_.

* [ ] Pair every input with an explicit `<label>` or aria-labelledby relationship.
* [ ] Use semantic input types (`email`, `tel`, `date`, `number`) and native validation where possible.
* [ ] Surface accessible error messaging via aria-live regions and inline guidance linked to the relevant field.

## 6. Media, Embeds & Graphics

_Docs: [MDN: Responsive Images](https://developer.mozilla.org/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images), [Web Shareable Media Guidance](https://web.dev/media/)_.

* [ ] Use responsive image markup (`<picture>`, `srcset`, `sizes`) and provide fallbacks for unsupported formats.
* [ ] Prefer `<figure>`/`<figcaption>` for rich media context and `<track>` for captions/subtitles.
* [ ] Lazy-load non-critical media (e.g., `loading="lazy"`) and sandbox embedded content (iframes) with restrictive attributes.

## 7. Performance & Loading Strategy

_Docs: [web.dev Critical Rendering Path](https://web.dev/critical-rendering-path/), [MDN: Resource Hints](https://developer.mozilla.org/docs/Web/HTML/Preloading_content)_.

* [ ] Keep DOM depth manageable; audit unused nodes and inline scripts.
* [ ] Apply resource hints (`preload`, `prefetch`, `dns-prefetch`, `preconnect`) to optimize perceived performance.
* [ ] Defer non-essential scripts and leverage modular loading (e.g., `type="module"`) for modern browsers.

## 8. Internationalization & Localization Readiness

_Docs: [W3C Internationalization Techniques](https://www.w3.org/International/techniques/authoring-html), [MDN: HTML dir Attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir)_.

* [ ] Specify language and direction attributes at document and sectional levels as needed.
* [ ] Keep copy externalized in translation files; avoid hard-coded concatenations that impede localization.
* [ ] Use Unicode-compliant encodings (`UTF-8`) and support bi-directional text via logical CSS/HTML attributes.

## 9. Security & Privacy Controls

_Docs: [OWASP Cheat Sheet: HTML5 Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html), [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)_.

* [ ] Escape user-generated content, enforce Content Security Policy, and avoid inline event handlers where possible.
* [ ] Restrict autoplay, geolocation, and camera APIs to trusted contexts with user consent.
* [ ] Harden forms against CSRF/Clickjacking (use tokens, `SameSite` cookies, `frame-ancestors` directives).

## 10. Testing & Validation

_Docs: [HTMLHint Documentation](https://htmlhint.com/docs/user-guide/getting-started), [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/overview/)_.

* [ ] Validate markup with automated tools (Nu HTML Checker, HTMLHint) on every build.
* [ ] Run end-to-end tests (Playwright, Cypress) covering critical flows, accessibility assertions, and structured data.
* [ ] Capture render regressions with visual diffing or Percy/Backstop snapshots for key templates.

## 11. Documentation & Collaboration

_Docs: [Storybook Docs for HTML](https://storybook.js.org/docs/html/get-started/overview), [Zeroheight Documentation Playbook](https://zeroheight.com/blog/design-system-documentation-playbook/)_.

* [ ] Maintain component usage guides, examples, and code snippets in shared documentation systems.
* [ ] Record architectural decisions (ADRs) and capture pairing notes or code review learnings.
* [ ] Provide onboarding materials that explain naming, structure, templating engines, and deployment flows.

## 12. Governance & Continuous Improvement

_Docs: [W3C HTML Working Group](https://www.w3.org/groups/wg/html), [web.dev/measure](https://web.dev/measure/)_.

* [ ] Schedule accessibility, performance, and security audits; track outcomes in shared dashboards.
* [ ] Monitor HTML specification changes and browser support matrices; plan deprecation/adoption timelines.
* [ ] Review metrics (validation errors, a11y defects, page weight) regularly to prioritize improvement initiatives.
