---
description: 'Figma collaboration guardrails for scalable product design workflows.'
applyTo: '**/*'
---

# Figma Delivery Checklist

Use this checklist when planning, designing, and shipping experiences with Figma.

## 1. Strategy, Governance & Access

_Docs: [Figma Team Setup](https://help.figma.com/hc/en-us/articles/360039823654-Guide-to-setting-up-your-organization), [Roles & Permissions](https://help.figma.com/hc/en-us/articles/360040529313-Manage-members-permissions), [DesignOps Playbook](https://help.figma.com/hc/en-us/articles/360057079513)_

* [ ] Define workspace structure (org, teams, projects) and assign owners for licensing, billing, and user lifecycle management.
* [ ] Document access policies for confidential files, prototypes, and shared libraries; review permissions quarterly.
* [ ] Align design governance rituals (critique cadence, design QA) with product and engineering roadmaps.

## 2. File Organization & Naming Conventions

_Docs: [Best Practices for Files & Projects](https://www.figma.com/community/file/809075942385498948), [File Naming Tips](https://help.figma.com/hc/en-us/articles/360041068413)_

* [ ] Standardize project structure (e.g., `01-Discovery`, `02-Design`, `03-Handoff`) and template new files with cover pages.
* [ ] Adopt naming conventions for pages, frames, and components that surface product area, platform, and status.
* [ ] Archive deprecated files and pages regularly; document retention policies for historical work.

## 3. Design Systems & Component Libraries

_Docs: [Create Design System Libraries](https://help.figma.com/hc/en-us/articles/360042786954), [Variants & Properties](https://help.figma.com/hc/en-us/articles/360056440594), [Tokens & Styles](https://help.figma.com/hc/en-us/articles/360040451373)_

* [ ] Maintain centralized component libraries with published versions, release notes, and owner contact info.
* [ ] Enforce usage of styles (color, text, effects, spacing tokens) and variants to avoid ad-hoc duplication.
* [ ] Schedule library audits for deprecations, accessibility compliance, and parity with coded components.

## 4. Collaboration & Workflow Practices

_Docs: [Commenting & Feedback](https://help.figma.com/hc/en-us/articles/360040028434), [Multiplayer Collaboration](https://help.figma.com/hc/en-us/articles/360041065894), [FigJam Collaboration](https://help.figma.com/hc/en-us/articles/1500012016121)_

* [ ] Establish feedback etiquette (tagging stakeholders, use of annotations, resolution workflow) to keep files actionable.
* [ ] Leverage FigJam for ideation, journey mapping, and retrospectives; link outcomes back to design files.
* [ ] Capture decisions within files (sticky notes, callouts) and synchronize with project management tools.

## 5. Prototyping & Interaction Design

_Docs: [Prototype Basics](https://help.figma.com/hc/en-us/articles/360040450173), [Smart Animate](https://help.figma.com/hc/en-us/articles/360039957734), [Advanced Prototyping](https://help.figma.com/hc/en-us/articles/360057510533)_

* [ ] Map user flows across dedicated pages; ensure entry points, transitions, and screen states mirror real-world scenarios.
* [ ] Use interaction naming conventions (`:hover`, `:focus`, `:error`) and document logic for branching, overlays, and conditional flows.
* [ ] Optimize prototype performance (reduce oversized images, limit nested autolayout) before stakeholder reviews or user tests.

## 6. Version Control & Change Management

_Docs: [File Version History](https://help.figma.com/hc/en-us/articles/360039957594), [Branching for Design](https://help.figma.com/hc/en-us/articles/4418635980303), [Design Review Workflows](https://www.figma.com/blog/introducing-branching-and-merge/)_

* [ ] Use branches for exploratory or feature-specific work; merge only after review and conflict resolution.
* [ ] Annotate file versions with release notes or Jira/issue references before handoff.
* [ ] Export critical milestones (PDF/PNG) for compliance or stakeholder approvals when required.

## 7. Accessibility & Inclusive Design

_Docs: [Accessible Design in Figma](https://www.figma.com/community/file/978836173593438714), [Color Contrast Checker](https://help.figma.com/hc/en-us/articles/360054315293), [Accessible Components](https://help.figma.com/hc/en-us/articles/4411093914903)_

* [ ] Apply accessibility criteria (contrast ratios, touch targets, typography scales) directly within design files.
* [ ] Provide annotations for focus order, keyboard interactions, and screen reader expectations in handoff notes.
* [ ] Include inclusive imagery, language, and locale considerations; validate via plugin audits or expert reviews.

## 8. Developer Handoff & Documentation

_Docs: [Inspect Designs](https://help.figma.com/hc/en-us/articles/360039823174), [Design Tokens & Dev Mode](https://help.figma.com/hc/en-us/articles/14803839029655), [Embed & Integrations](https://help.figma.com/hc/en-us/articles/360040451753)_

* [ ] Enable Dev Mode for handoff-ready pages and document component usage, redlines, and edge cases.
* [ ] Sync design tokens and measurements with engineering platforms (Storybook, design token pipelines) through plugins or exports.
* [ ] Embed Figma frames in specs, PRDs, or documentation hubs to keep teams aligned with the latest designs.

## 9. Plugins, Integrations & Automation

_Docs: [Plugin Directory](https://www.figma.com/community/plugins), [REST & GraphQL APIs](https://www.figma.com/developers/api), [Webhooks](https://www.figma.com/developers/api#webhooks_v2-intro)_

* [ ] Vet plugins for security, maintenance, and vendor reputation before adoption; document approved tooling per workflow.
* [ ] Automate repetitive tasks (design tokens export, content population, localization) via plugins or API scripts.
* [ ] Monitor API usage quotas and webhook reliability; log automation failures to shared observability channels.

## 10. Performance & Asset Management

_Docs: [Optimize Files](https://help.figma.com/hc/en-us/articles/360040450233), [Image Handling](https://help.figma.com/hc/en-us/articles/360040531113), [Component Performance](https://www.figma.com/blog/improving-large-design-files/)_

* [ ] Audit files for unused components, fonts, and images; perform regular cleanups to keep load times manageable.
* [ ] Compress raster assets and prefer vector primitives where feasible; document export presets per platform.
* [ ] Track file size, component counts, and publish performance; escalate hotspots to design system owners.

## 11. Testing, Research & Validation

_Docs: [Prototype Testing](https://help.figma.com/hc/en-us/articles/360040450193), [User Testing Integrations](https://help.figma.com/hc/en-us/articles/4411089104279), [Collaborative Research in FigJam](https://help.figma.com/hc/en-us/articles/4406813207447)_

* [ ] Prepare research prototypes with dedicated variants for each scenario, including error and edge cases.
* [ ] Integrate with research tools (Maze, UserTesting, Lookback) and capture findings adjacent to design artifacts.
* [ ] Feed insights back into component libraries and documentation to prevent recurring usability issues.

## 12. Documentation, Training & Continuous Improvement

_Docs: [Design Systems Documentation](https://help.figma.com/hc/en-us/articles/360052489034), [Figma Education Hub](https://www.figma.com/education/), [Release Notes & Updates](https://www.figma.com/release-notes/)_

* [ ] Maintain design playbooks, change logs, and onboarding guides in shared knowledge bases linked from Figma home pages.
* [ ] Host regular trainings on new features (Dev Mode, new plugins) and record sessions for async access.
* [ ] Review workflows quarterly against Figma release notes and team retrospectives; iterate on standards and tooling accordingly.
