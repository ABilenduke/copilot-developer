---
description: 'Figma Code Connect guardrails for unifying design systems and codebases.'
applyTo: '**/*'
---

# Figma Code Connect Delivery Checklist

Use this checklist when rolling out or maintaining Figma Code Connect integrations across product teams.

## 1. Prerequisites & Access Management

_Docs: [Code Connect Overview](https://help.figma.com/hc/en-us/articles/17047935808919-Code-Connect-overview), [Enable Dev Mode](https://help.figma.com/hc/en-us/articles/1500002409282-Enable-Dev-Mode)_

* [ ] Confirm your organization’s plan supports Dev Mode and Code Connect; document license owners and renewal cadence.
* [ ] Assign Code Connect admin roles and ensure engineers, designers, and reviewers have the correct workspace permissions.
* [ ] Capture onboarding steps (Dev Mode enablement, plugin installation) in team playbooks for repeatability.

## 2. Repository & Project Setup

_Docs: [Code Connect Quick Start](https://help.figma.com/hc/en-us/articles/17048689407319-Get-started-with-Code-Connect), [Project Configuration](https://help.figma.com/hc/en-us/articles/17048692441175-Set-up-Code-Connect)_

* [ ] Store Code Connect configuration (`codeconnect.config.ts/json`) alongside the source design system repository with version control.
* [ ] Define default platforms, frameworks, and component paths; verify build scripts reference the same directories as the design tokens.
* [ ] Add README notes describing how to run Code Connect locally, including Node versions and package manager usage.

## 3. Component Mapping & Structure

_Docs: [Map Components](https://help.figma.com/hc/en-us/articles/17048700310295-Map-components-to-code), [Component Metadata](https://help.figma.com/hc/en-us/articles/17048700416343-Add-component-metadata)_

* [ ] Mirror Figma component naming conventions in code (PascalCase, variant structure) to keep bindings predictable.
* [ ] Group components by platform/library within the config to avoid ambiguous matches.
* [ ] Document ownership and review workflows for each component group (e.g., core UI vs. marketing widgets).

## 4. Variants, Props & Controls

_Docs: [Define Props](https://help.figma.com/hc/en-us/articles/17048701219927-Define-props-with-Code-Connect), [Variant Mapping](https://help.figma.com/hc/en-us/articles/17048701452695-Configure-variants)_

* [ ] Map component props and variant controls to Figma properties, including types, default values, and required flags.
* [ ] Establish naming conventions for boolean, enum, and slot props that align with the engineering framework (React props, Swift parameters, etc.).
* [ ] Validate that prop documentation surfaces in Dev Mode with clear usage guidance and visual references.

## 5. Design Tokens & Shared Variables

_Docs: [Tokens in Code Connect](https://help.figma.com/hc/en-us/articles/17048701656151-Use-design-tokens-with-Code-Connect), [Variables Overview](https://help.figma.com/hc/en-us/articles/14793968583447-Use-variables)_

* [ ] Link Figma variables (color, typography, spacing) to corresponding tokens in code; ensure synchronization scripts run in CI.
* [ ] Document fallback strategies when tokens diverge or platform-specific aliases are required.
* [ ] Audit token coverage quarterly to catch stale or unused variables and retire them from both design and code.

## 6. Platform & Framework Integrations

_Docs: [React Integration](https://help.figma.com/hc/en-us/articles/17048702209431-Connect-React-components), [iOS & Android Guides](https://help.figma.com/hc/en-us/articles/17048702627543-Connect-native-components)_

* [ ] Configure platform-specific build commands (React, Vue, SwiftUI, Jetpack Compose) and validate generated documentation renders correctly.
* [ ] Provide starter templates or examples that demonstrate idiomatic usage per platform.
* [ ] Coordinate release schedules so design updates align with component library version bumps across ecosystems.

## 7. Collaboration & Review Workflow

_Docs: [Dev Mode Collaboration](https://help.figma.com/hc/en-us/articles/1500002436461-Collaborate-in-Dev-Mode), [Request Feedback](https://help.figma.com/hc/en-us/articles/17048702961751-Review-Code-Connect-changes)_

* [ ] Establish review checklists covering visual parity, prop coverage, accessibility notes, and code sample accuracy.
* [ ] Integrate Code Connect review steps into design critiques and engineering PR templates.
* [ ] Track sign-offs in shared tools (Jira, Notion) to ensure component bindings are approved before release.

## 8. Testing & Validation

_Docs: [Preview Components](https://help.figma.com/hc/en-us/articles/17048703183447-Preview-Code-Connect-components), [Validation Best Practices](https://help.figma.com/hc/en-us/articles/17048703563863-Test-your-Code-Connect-setup)_

* [ ] Run automated linting/validation (`codeconnect validate`) in CI to catch broken links, missing props, or build errors.
* [ ] Pair visual regression tests (Chromatic, Loki) with Code Connect previews to confirm UI fidelity.
* [ ] Schedule periodic manual audits comparing Dev Mode output with living style guides or Storybook.

## 9. Automation & Continuous Delivery

_Docs: [CLI Reference](https://help.figma.com/hc/en-us/articles/17048703879127-Code-Connect-CLI), [API & Webhooks](https://www.figma.com/developers/api#code-connect)_

* [ ] Automate Dev Mode publish steps during component releases to keep documentation fresh.
* [ ] Use webhooks or scripts to notify teams when component bindings change or require revalidation.
* [ ] Version Code Connect configs in lockstep with design system packages; tag releases for traceability.

## 10. Performance & Asset Handling

_Docs: [Optimize Assets](https://help.figma.com/hc/en-us/articles/1500002418482-Optimize-assets-for-developers), [Component Performance Tips](https://help.figma.com/hc/en-us/articles/17048704133847-Improve-Code-Connect-performance)_

* [ ] Optimize preview assets (SVGs, animations) for Dev Mode to reduce load times.
* [ ] Document limits on component complexity (nesting depth, variant count) and monitor build duration.
* [ ] Remove unused sample code or legacy bindings to keep generated bundles lean.

## 11. Documentation & Developer Experience

_Docs: [Dev Mode Documentation](https://help.figma.com/hc/en-us/articles/17048704508183-Document-components-for-developers), [Embed Dev Mode](https://help.figma.com/hc/en-us/articles/17048704779223-Embed-Code-Connect-docs)_

* [ ] Link Dev Mode component pages within engineering handbooks, Storybook, or internal portals.
* [ ] Provide quickstart guides, code snippets, and troubleshooting FAQs adjacent to each component.
* [ ] Encourage feedback loops—collect developer pain points and iterate on documentation structure.

## 12. Governance & Continuous Improvement

_Docs: [Design System Governance](https://help.figma.com/hc/en-us/articles/360039823654-Guide-to-setting-up-your-organization#governance), [Release Notes](https://www.figma.com/release-notes/)_

* [ ] Maintain a governance board or working group that reviews Code Connect metrics, incidents, and roadmap updates.
* [ ] Track adoption KPIs (components mapped, Dev Mode usage, build health) and report quarterly.
* [ ] Review Figma release notes to plan upgrades, deprecations, and new automation opportunities.
