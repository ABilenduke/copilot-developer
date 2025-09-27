---
description: 'Privacy compliance guardrails for data-responsible product teams.'
applyTo: '**/*'
---

# Privacy Standards Delivery Checklist

Use this checklist when designing, implementing, and operating products that must comply with global privacy and data protection obligations.

## 1. Governance, Accountability & Scope

_Docs: [ISO/IEC 27701 Overview](https://www.iso.org/standard/71670.html), [NIST Privacy Framework](https://www.nist.gov/privacy-framework)_

* [ ] Establish executive sponsorship, privacy officer(s), and cross-functional steering committees with clear RACI charts.
* [ ] Define the privacy program scope, risk appetite, and applicable control frameworks; document links to corporate policies.
* [ ] Align privacy governance with security, legal, compliance, and data ethics forums to coordinate decisions and escalations.

## 2. Regulatory & Contractual Mapping

_Docs: [GDPR Text](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [CCPA/CPRA](https://oag.ca.gov/privacy/ccpa), [LGPD English Translation](https://www.gov.br/cidadania/pt-br/acoes-e-programas/lgpd)_

* [ ] Inventory jurisdictions where users, customers, or data reside and map applicable regulations, sector rules, and contractual clauses.
* [ ] Maintain a regulatory matrix capturing lawful bases, notice requirements, and data transfer restrictions per region.
* [ ] Engage counsel to review product changes against emerging statutes (e.g., US state laws, ePrivacy, PIPEDA) and update obligations.

## 3. Data Inventory, Classification & Records of Processing

_Docs: [GDPR Article 30 Records](https://gdpr-info.eu/art-30-gdpr/), [NIST SP 800-53 Rev. 5 PM-5](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)_

* [ ] Maintain system-of-record data inventories detailing sources, categories, retention, sensitivity, and storage locations.
* [ ] Classify personal data (PII, sensitive, children) and assign handling requirements with supporting controls.
* [ ] Generate and review Records of Processing Activities (RoPAs) and update data flow diagrams whenever systems change.

## 4. Data Subject Rights (DSR) Management

_Docs: [GDPR Chapter III Rights](https://gdpr-info.eu/chapter-3/), [NIST Privacy Framework CT-P](https://www.nist.gov/privacy-framework)_

* [ ] Offer accessible intake channels (web forms, portals, customer support) with identity verification and SLA tracking.
* [ ] Automate discovery and fulfillment workflows for access, correction, deletion, portability, restriction, and opt-out requests.
* [ ] Retain audit logs of requests, decisions, and communications to demonstrate compliance.

## 5. Consent, Preference & Notice Management

_Docs: [IAB TCF Policies](https://iabeurope.eu/transparency-consent-framework/), [CNIL Consent Guidelines](https://www.cnil.fr/en/cookies-and-other-tracking-devices)_

* [ ] Deliver layered privacy notices, just-in-time disclosures, and machine-readable policies aligned with applicable laws.
* [ ] Implement consent and preference management tooling supporting withdrawal, granular scopes, and proof-of-consent storage.
* [ ] Localize notices for language, cultural, and legal requirements; document updates and user communications.

## 6. Privacy by Design, DPIAs & PETs

_Docs: [GDPR Article 25](https://gdpr-info.eu/art-25-gdpr/), [ENISA DPIA Guidelines](https://www.enisa.europa.eu/publications/dpia-guidelines)_

* [ ] Embed privacy design reviews in SDLC checkpoints; require sign-off for new features touching personal data.
* [ ] Conduct Data Protection Impact Assessments (DPIAs) and Transfer Impact Assessments (TIAs) for high-risk processing.
* [ ] Evaluate and implement privacy-enhancing technologies (PETs) such as differential privacy, tokenization, or federated learning when appropriate.

## 7. Security Controls & Access Management

_Docs: [ISO/IEC 27001](https://www.iso.org/standard/27001.html), [NIST SP 800-53 Rev. 5 AC & SC Families](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)_

* [ ] Enforce least-privilege access, multi-factor authentication, and segregation of duties for systems processing personal data.
* [ ] Encrypt data in transit and at rest; monitor key management, certificate lifecycles, and cryptographic agility plans.
* [ ] Integrate privacy requirements into secure SDLC, vulnerability management, and logging/monitoring programs.

## 8. Third Parties, Data Transfers & Vendor Management

_Docs: [Standard Contractual Clauses (SCCs)](https://commission.europa.eu/publications/standard-contractual-clauses-international-transfers_en), [ISO/IEC 27036 Supplier Relationships](https://www.iso.org/standard/54544.html)_

* [ ] Maintain vendor inventory with data processing agreements, transfer impact results, and security/privacy assessments.
* [ ] Require contractual commitments for privacy safeguards, breach notification timelines, and sub-processor transparency.
* [ ] Monitor cross-border data flows and ensure lawful mechanisms (SCCs, BCRs, adequacy, local storage) are in place.

## 9. Data Minimization, Retention & Disposal

_Docs: [GDPR Article 5(1)(c)-(e)](https://gdpr-info.eu/art-5-gdpr/), [NIST Privacy Framework ID.IM-P](https://www.nist.gov/privacy-framework)_

* [ ] Collect only necessary data, anonymize or pseudonymize when feasible, and document justification for each attribute.
* [ ] Implement retention schedules tied to legal and business requirements with automated deletion or archival workflows.
* [ ] Verify secure disposal for backups, logs, exported datasets, and hardware, ensuring proof of deletion.

## 10. Incident Response & Breach Notification

_Docs: [GDPR Articles 33-34](https://gdpr-info.eu/art-33-gdpr/), [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)_

* [ ] Integrate privacy considerations into incident response plans, including escalation paths and regulatory notification criteria.
* [ ] Run tabletop exercises covering multi-jurisdiction breach reporting, customer communications, and regulator engagement.
* [ ] Maintain templates for supervisory authorities, impacted individuals, and contractual partners with localized requirements.

## 11. Training, Awareness & Culture

_Docs: [ISO/IEC 27701 Clause 7.2](https://www.iso.org/standard/71670.html), [NIST Privacy Framework GV.AW-P](https://www.nist.gov/privacy-framework)_

* [ ] Deliver role-based privacy training for engineers, product, support, marketing, and leadership annually (or more often as required).
* [ ] Track completion, effectiveness metrics, and refresher cadences; address gaps identified through audits or incidents.
* [ ] Promote privacy champions, feedback channels, and inclusive communication that empowers employees to raise concerns.

## 12. Monitoring, Auditing & Continuous Improvement

_Docs: [AICPA GAPP Principles](https://us.aicpa.org/interestareas/informationtechnology/resources/privacy/gapp), [NIST Privacy Framework PR.PT](https://www.nist.gov/privacy-framework)_

* [ ] Implement KPI/KRI dashboards (DSR SLAs, consent rates, incident metrics) and review trends with leadership.
* [ ] Schedule internal audits, external assessments, and certification renewals; track remediation ownership to closure.
* [ ] Maintain change management, policy reviews, and regulatory horizon scanning to evolve controls proactively.
