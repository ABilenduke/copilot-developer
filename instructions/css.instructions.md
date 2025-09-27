---
description: 'CSS authoring guardrails for accessible, performant user interfaces.'
applyTo: '**/*'
---

# CSS Delivery Checklist

Use this checklist when planning, authoring, and maintaining production CSS.

## 1. Design Strategy & Style Architecture

_Docs: [CSS Architecture on MDN](https://developer.mozilla.org/docs/MDN/Guidelines/Code_guidelines/CSS), [Every Layout Principles](https://every-layout.dev/)_

* [ ] Define style architecture (ITCSS, BEM, utility-first, design tokens) that aligns with product complexity and team expertise.
* [ ] Document global layers (reset, base, components, utilities) and ownership boundaries across teams.
* [ ] Establish contribution guidelines covering review expectations, naming, and change management.

## 2. Tooling & Environment Setup

_Docs: [PostCSS Documentation](https://postcss.org/), [Modern Build Tools Overview](https://web.dev/learn/css/tools-and-workflows/)_

* [ ] Standardize on build tooling (Vite, Webpack, Parcel) with linting and autoprefixing baked into shared configs.
* [ ] Provide devcontainer or project scripts that install Node, package managers, and CSS toolchains deterministically.
* [ ] Configure editor extensions (stylelint, CSS IntelliSense) and format-on-save settings across the team.

## 3. Selectors, Naming & Specificity Management

_Docs: [BEM Methodology](http://getbem.com/), [Specificity Guide](https://developer.mozilla.org/docs/Web/CSS/Specificity)_

* [ ] Adopt a naming convention (BEM, SUIT, utility classes) and enforce it via tooling or code review.
* [ ] Keep selectors shallow; avoid IDs or overly specific chains that inhibit reuse and overrides.
* [ ] Track and audit specificity hotspots; refactor inline styles or `!important` usage with architectural fixes.

## 4. Layout, Responsiveness & Modern Features

_Docs: [CSS Layout Cookbook](https://developer.mozilla.org/docs/Web/CSS/Layout_cookbook), [Container Queries Guide](https://web.dev/new-responsive/#container-queries)_

* [ ] Prefer modern layout primitives (Flexbox, Grid, Container Queries) and annotate fallbacks when legacy support is required.
* [ ] Define responsive breakpoints based on design content, not device sizes; centralize them in variables or theme files.
* [ ] Validate complex layouts across browsers, viewport sizes, zoom levels, and writing directions (LTR/RTL).

## 5. Tokens, Variables & Theming

_Docs: [CSS Custom Properties](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties), [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/)_

* [ ] Map design tokens to CSS custom properties with semantic naming and documented fallbacks.
* [ ] Provide theming mechanisms (prefers-color-scheme, high-contrast) with accessible defaults and user overrides.
* [ ] Keep token definitions single-sourced and synchronized with design tooling or generated packages.

## 6. Browser Compatibility & Progressive Enhancement

_Docs: [Can I Use](https://caniuse.com/), [Progressive Enhancement Guide](https://developer.mozilla.org/docs/Glossary/Progressive_Enhancement)_

* [ ] Maintain Browserslist targets across CSS tooling, JS bundlers, and automated tests.
* [ ] Feature-detect advanced capabilities (supports queries, `:has`, container queries) and provide graceful degradation.
* [ ] Track browser quirks or polyfills in documentation; schedule audits when market share shifts.

## 7. Performance & Delivery Optimization

_Docs: [Critical CSS on web.dev](https://web.dev/extract-critical-css/), [HTTP Caching Overview](https://web.dev/http-cache/)_

* [ ] Minimize unused CSS with tooling (PurgeCSS, Lightning CSS) and monitor bundle size budgets in CI.
* [ ] Inline or stream critical CSS for above-the-fold content; defer non-critical styles via media queries or preload hints.
* [ ] Configure caching headers and versioned asset names to control browser revalidation.

## 8. Accessibility & Inclusive Design

_Docs: [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/), [Focus Styling Techniques](https://www.w3.org/WAI/WCAG21/Techniques/css/C15)_

* [ ] Ensure focus states are visible, high contrast, and not removed without accessible replacements.
* [ ] Respect user preferences (reduced motion, high contrast, prefers-reduced-data) through media queries and fallbacks.
* [ ] Test semantics with screen readers, keyboard-only flows, and color blindness simulators before release.

## 9. Testing & Quality Assurance

_Docs: [BackstopJS Visual Regression](https://github.com/garris/BackstopJS), [Playwright Visual Testing](https://playwright.dev/docs/test-snapshots)_

* [ ] Automate visual regression tests for critical pages and components; gate merges on significant diffs.
* [ ] Run accessibility audits (axe-core, Lighthouse) in CI to catch regressions early.
* [ ] Maintain manual QA scripts for edge cases (nested scroll containers, printing, high zoom).

## 10. Documentation & Collaboration

_Docs: [Zeroheight Documentation Playbook](https://zeroheight.com/blog/design-system-documentation-playbook/), [Storybook Styling Docs](https://storybook.js.org/docs/react/essentials/toolbars-and-globals)_

* [ ] Publish component usage guidelines, code samples, and design intent in a shared portal or Storybook.
* [ ] Capture style decisions and rationales in ADRs or pattern libraries; link issues to implemented solutions.
* [ ] Provide onboarding materials covering architecture, naming, tooling, and testing expectations.

## 11. Security & Privacy Considerations

_Docs: [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/), [CSS Exfiltration Prevention](https://css-tricks.com/serious-talk-about-css-injection/)_

* [ ] Guard against CSS injection by escaping user-supplied values and validating dynamic class names.
* [ ] Configure CSP to restrict inline styles when feasible, or hash/nonce allowed inline blocks.
* [ ] Review third-party stylesheets and embedded widgets for privacy, accessibility, and performance impact.

## 12. Governance & Continuous Improvement

_Docs: [Component Governance Playbook](https://designsystem.guide/), [CSS Working Group Drafts](https://www.w3.org/TR/?tag=css)_

* [ ] Set review cadences for CSS debt, refactor opportunities, and design system alignment.
* [ ] Track metrics (bundle size, lint warnings, accessibility issues) and surface them in sprint rituals.
* [ ] Monitor CSS Working Group drafts to anticipate spec changes and plan adoption experiments.
