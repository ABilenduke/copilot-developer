---
description: 'Atomic design guardrails for cohesive, reusable UI systems.'
applyTo: '**/*.vue, **/*.tsx, **/*.jsx, **/components/**/*, **/stories/**/*'
---

# Atomic Design Delivery Checklist

Follow this checklist to keep component libraries aligned with atomic design principles.

## 1. Foundations & Design Tokens

_Docs: [Brad Frost’s Atomic Design](https://atomicdesign.bradfrost.com/), [Design Tokens Community Group](https://design-tokens.github.io/community-group/), [Figma Tokens Guide](https://www.figma.com/community/file/843461159747178978)_

* [ ] Centralize color, typography, spacing, and motion tokens in platform-agnostic files; generate platform outputs (CSS vars, JSON) from a single source.
* [ ] Version tokens and document semantic naming (e.g., `color.surface.primary`) to decouple design intent from raw values.
* [ ] Keep accessibility in mind when defining tokens—establish minimum contrast ratios and motion alternatives.
* [ ] Sync tokens with design tools (Figma/Sketch) through automated pipelines to prevent drift.

## 2. Component Taxonomy & Naming

_Docs: [Atomic Methodology Overview](https://atomicdesign.bradfrost.com/chapter-2/), [Design System Checklist](https://designsystemchecklist.com/)_

* [ ] Classify components explicitly as atoms, molecules, organisms, templates, or pages; reflect this hierarchy in folder naming.
* [ ] Keep atoms stateless and style-oriented, molecules focused on small interactions, and organisms orchestrating complex layouts.
* [ ] Prevent business logic from leaking into atoms/molecules—route service calls through organisms or dedicated containers.
* [ ] Provide clear migration guidance when promoting a component up/down the hierarchy; avoid duplicating nearly identical pieces.

## 3. Component Authoring Standards

_Docs: [Component API Design](https://storybook.js.org/docs/react/writing-components/introducing-storybook), [React Composition Patterns](https://react.dev/learn/passing-props-to-a-component)_

* [ ] Favor composition over props explosion—expose slots/children for layout flexibility.
* [ ] Define prop types/interfaces with sensible defaults, minimal optional fields, and targeted union types for variants.
* [ ] Keep render functions pure; delegate side effects to hooks/composables to enable reuse across platforms.
* [ ] Export accompanying utility hooks (e.g., `useButton`) when logic can be shared beyond the visual component.
* [ ] Provide fallbacks for asynchronous data to prevent layout shifts in higher-level templates.

## 4. Styling, Theming & Responsiveness

_Docs: [Design Tokens in CSS](https://web.dev/design-tokens/), [Responsive Design Patterns](https://material.io/design/layout/responsive-layout-grid.html), [Storybook Theming](https://storybook.js.org/docs/react/configure/theming)_

* [ ] Drive styles from design tokens or utility classes; avoid hard-coded values inside component files.
* [ ] Support dark mode and theming through context/providers rather than prop drilling.
* [ ] Design for responsive breakpoints at the organism/template level; ensure atoms scale with relative units.
* [ ] Keep critical CSS co-located with components but allow global overrides through theme packages.

## 5. State, Data & Integration Boundaries

_Docs: [Smart vs Presentational Components](https://kentcdodds.com/blog/smart-and-dumb-components), [Composition API/React Hooks Docs](https://react.dev/learn/reusing-logic-with-custom-hooks)_

* [ ] Maintain presentational purity for atoms/molecules; fetch or mutate data only in organisms or dedicated containers.
* [ ] Normalize incoming data models before reaching templates/pages to avoid leaking backend fields into UI primitives.
* [ ] Use context providers or stores for cross-cutting state (theme, auth) instead of passing props through many layers.
* [ ] Document integration contracts (API DTOs, event payloads) for organisms interacting with external services.

## 6. Accessibility & UX Validation

_Docs: [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/), [ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/), [Deque Component Accessibility](https://www.deque.com/blog/component-based-accessibility/)_

* [ ] Provide semantic roles, labels, and keyboard support at the atom level; ensure variants remain accessible.
* [ ] Run automated accessibility scans (axe, pa11y) inside Storybook or component test suites.
* [ ] Include focus management and motion-reduced alternatives when organisms present overlays or animated flows.
* [ ] Validate color contrast and spacing using design tokens to guarantee consistency across themes.

## 7. Testing & Quality Gates

_Docs: [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/overview), [Visual Regression Testing](https://www.chromatic.com/docs/visual-testing), [Component Contract Tests](https://martinfowler.com/articles/micro-frontends.html#ContractTests)_

* [ ] Cover atoms/molecules with unit and snapshot tests to lock in structure and behavior.
* [ ] Exercise organisms/templates with interaction tests (Testing Library, Playwright component mode) reflecting real workflows.
* [ ] Run visual regression tests for shared styles to catch token regressions before release.
* [ ] Fail builds on accessibility or visual diffs beyond agreed thresholds.
* [ ] Track story coverage—every reusable component must ship with at least one documented story.

## 8. Documentation & Communication

_Docs: [Storybook Docs Mode](https://storybook.js.org/docs/react/writing-docs/docs-page), [Design System Playbook](https://uxdesign.cc/the-anatomy-of-a-design-system-6f5c2a60cca7)_

* [ ] Publish Storybook or similar playgrounds with usage guidelines, props tables, and live examples.
* [ ] Link visual specs, accessibility notes, and design tokens directly from documentation pages.
* [ ] Capture component decisions (e.g., when merging atoms) in ADRs and reference them in story metadata.
* [ ] Provide contribution guidelines detailing naming conventions, required tests, and review steps.

## 9. Governance & Maintenance

_Docs: [Design System Governance](https://www.designsystems.com/), [Component Lifecycle Management](https://www.invisionapp.com/inside-design/design-system-governance/)_

* [ ] Establish review gates involving design + engineering for new or modified organisms/templates.
* [ ] Deprecate components using codemods or lint rules with clear timelines and migration paths.
* [ ] Audit libraries regularly for unused or overlapping components; consolidate to reduce maintenance overhead.
* [ ] Track adoption metrics and feedback loops to prioritize improvements.

## 10. Documentation Lookup & Research

_Docs: [Atomic Design Resources](https://github.com/davidhund/awesome-atomic-design), [Design Systems Repo](https://designsystemsrepo.com/)_

* [ ] Reference authoritative design system examples when introducing new patterns to avoid net-new inventions.
* [ ] Monitor industry design system releases and conference talks for emerging best practices.
* [ ] Maintain an internal wiki of component migration guides, token change logs, and shared learnings.
* [ ] Encourage cross-discipline critiques (design, QA, accessibility) to iterate on standards.

Adhering to this checklist keeps component libraries scalable, consistent, and easy to evolve across products.
