---
description: 'Token design system guardrails for scalable cross-platform UI foundations.'
applyTo: '**/*'
---

# Token Design System Delivery Checklist

Use this checklist when creating, evolving, or operationalizing design tokens across products, platforms, and teams.

## 1. Strategy & Governance

_Docs: [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/), [Design Systems Handbook](https://www.designbetter.co/design-systems-handbook)_

* [ ] Define token vision, ownership, and success metrics aligned with product design and engineering leadership.
* [ ] Establish a cross-functional governance council (design, engineering, accessibility, brand) with clear escalation paths.
* [ ] Document decision-making criteria for introducing, deprecating, or evolving tokens and communicate it broadly.

## 2. Token Taxonomy & Naming Conventions

_Docs: [Design Tokens Spec – Format](https://design-tokens.github.io/community-group/format/), [Lightning Design System Token Naming](https://www.lightningdesignsystem.com/design-tokens/)_

* [ ] Organize tokens into layered taxonomy (core/base → semantic → component-specific) with consistent prefixes.
* [ ] Define naming rules (delimiter, casing, modifier order) and enforce them via linting or schema validation.
* [ ] Document mapping examples so contributors understand how to translate visual language into token names.

## 3. Source of Truth & Storage

_Docs: [Tokens Studio Documentation](https://docs.tokens.studio/), [Style Dictionary Concepts](https://amzn.github.io/style-dictionary/#/README)_

* [ ] Maintain a single authoritative token repository (JSON, YAML, or design tool plugin) under version control.
* [ ] Store metadata (description, usage guidance, accessibility checks) alongside token values.
* [ ] Set up automated backups/export routines from design tools to prevent data loss and drift.

## 4. Tooling & Pipeline Integration

_Docs: [Style Dictionary Build System](https://amzn.github.io/style-dictionary/#/build), [Theo Design Token Framework](https://github.com/salesforce-ux/theo)_

* [ ] Choose build tooling that transforms tokens into platform outputs (CSS variables, Android XML, iOS Swift, JSON).
* [ ] Configure pipelines to generate artifacts on every change, including minified and human-readable formats.
* [ ] Validate build outputs for parity across platforms before publishing to consumers.

## 5. Versioning & Release Management

_Docs: [Semantic Versioning](https://semver.org/), [Changesets Workflow](https://github.com/changesets/changesets)_

* [ ] Adopt semantic versioning to communicate impact (patch, minor, major) to downstream teams.
* [ ] Publish release notes describing added, changed, and deprecated tokens with migration guidance.
* [ ] Tag releases in source control and distribute artifacts to registries or package feeds leveraged by client teams.

## 6. Synchronization with Design Tools

_Docs: [Tokens Studio ↔ Figma Sync](https://docs.tokens.studio/sync/figma), [Figma Dev Mode Tokens](https://help.figma.com/hc/en-us/articles/14803839029655-Dev-Mode-Design-Tokens)_

* [ ] Integrate design tool plugins or APIs to keep visual references synchronized with the token source of truth.
* [ ] Provide designers with guidance on applying semantic tokens instead of raw hex values.
* [ ] Schedule sync checks to verify that published libraries match engineering token packages.

## 7. Platform Adoption & Integration Patterns

_Docs: [Material 3 Design Tokens](https://m3.material.io/styles/color/the-color-system/tokens), [Apple Human Interface Guidelines – Tokens](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos/color#design-tokens)_

* [ ] Document baseline integration for each platform (web, iOS, Android, desktop, native modules) with code samples.
* [ ] Provide migration playbooks for legacy stylesheets or hard-coded values to move onto tokenized implementations.
* [ ] Align token consumption with theming systems (dark mode, brand variations) and verify runtime switching behavior.

## 8. Documentation & Education

_Docs: [Zeroheight Documentation Playbook](https://zeroheight.com/blog/design-system-documentation-playbook/), [Design Tokens Reference Site](https://design-tokens.github.io/community-group/format/#documentation)_

* [ ] Publish token catalogs with interactive previews, usage guidance, and accessibility notes.
* [ ] Share onboarding materials for new contributors covering taxonomy, tools, and contribution workflow.
* [ ] Host regular knowledge-sharing sessions or office hours to keep product teams aligned on token usage.

## 9. Testing, Validation & Quality Gates

_Docs: [Design Token Transform Testing](https://amzn.github.io/style-dictionary/#/testing), [Design Lint Automation](https://www.figma.com/community/plugin/801195587640428208/Design-Lint)_

* [ ] Implement automated tests that compare token snapshots, validate schemas, and detect unintended value changes.
* [ ] Integrate visual regression tests to ensure token updates maintain UI fidelity across platforms.
* [ ] Block merges when tests, linting, or accessibility checks fail to preserve design integrity.

## 10. Automation & Continuous Delivery

_Docs: [GitHub Actions for Design Tokens](https://github.com/marketplace/actions/design-token-transformer), [Turborepo Pipelines](https://turbo.build/repo/docs/handbook/pipelines)_

* [ ] Automate builds, checks, and distribution via CI/CD pipelines triggered on token changes.
* [ ] Use preview deployments or package prereleases to let teams validate tokens before general availability.
* [ ] Monitor pipeline health and cache performance to keep iteration fast for designers and engineers.

## 11. Security & Compliance

_Docs: [ISO 27001 Design System Controls](https://www.iso.org/standard/77575.html), [W3C Ethical Web Principles](https://www.w3.org/2001/tag/doc/ethical-web-principles/)_

* [ ] Classify tokens that encode sensitive information (brand-restricted palettes, regulatory thresholds) and restrict access accordingly.
* [ ] Ensure token repositories respect organizational security controls (RBAC, audit logging, secret scanning).
* [ ] Maintain compliance evidence for audits, including change history, approvals, and rollback plans.

## 12. Metrics & Continuous Improvement

_Docs: [Design System KPI Framework](https://www.invisionapp.com/inside-design/design-system-kpis/), [Atlassian Design System Metrics](https://atlassian.design/resources/playbook/measure-success)_

* [ ] Track adoption metrics (packages installed, tokens referenced, teams onboarded) to measure impact.
* [ ] Review incident postmortems and support tickets to prioritize token enhancements or fixes.
* [ ] Schedule quarterly retrospectives to reassess taxonomy, tooling, and governance based on product evolution.
