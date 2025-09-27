---
description: 'OWASP-aligned security safeguards for resilient digital products.'
applyTo: '**/*'
---

# OWASP Security Delivery Checklist

Use this checklist to embed OWASP guidance across the secure development lifecycle.

## 1. Governance & Security Policy

_Docs: [OWASP SAMM](https://owaspsamm.org/model/), [OWASP ASVS Governance](https://owasp.org/www-project-application-security-verification-standard/)_

* [ ] Define a security governance model mapping OWASP SAMM practices to owners and escalation paths.
* [ ] Establish policy baselines leveraging ASVS Level 2 (or higher) for all internet-facing applications.
* [ ] Review policies semi-annually to align with evolving OWASP Top 10 and regulatory changes.

## 2. Threat Modeling & Risk Management

_Docs: [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html), [OWASP Risk Assessment Framework](https://owasp.org/www-project-risk-assessment-framework/)_

* [ ] Conduct threat modeling at project inception and major changes, documenting STRIDE-style abuse cases.
* [ ] Quantify risks using OWASP risk rating; prioritize mitigations for high likelihood or impact scenarios.
* [ ] Integrate threat findings into backlog items with explicit remediation acceptance criteria.

## 3. Secure SDLC & Requirements

_Docs: [OWASP Secure SDLC Quick Reference Guide](https://owasp.org/www-pdf-archive/OWASP-SDLCQuickReferenceGuide.pdf), [OWASP Proactive Controls](https://owasp.org/www-project-proactive-controls/)_

* [ ] Embed OWASP Proactive Controls into definition-of-ready/definition-of-done checklists.
* [ ] Require security sign-off gates at requirements, design, build, and release phases.
* [ ] Track security debt in the backlog and time-box remediation per sprint or release train.

## 4. Secure Coding Standards

_Docs: [OWASP Secure Coding Practices Guide](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/), [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)_

* [ ] Publish language/framework-specific secure coding guidelines aligned with OWASP cheat sheets.
* [ ] Enforce input validation, output encoding, and error handling patterns across all modules.
* [ ] Prohibit insecure defaults (e.g., verbose stack traces, weak cryptographic modes) via code review policies.

## 5. Dependency & Supply Chain Security

_Docs: [OWASP Dependency-Track](https://dependencytrack.org/), [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/)_

* [ ] Inventory third-party components with SBOMs and continuously scan using OWASP Dependency-Check or equivalent.
* [ ] Enforce version pinning and signature verification for critical libraries and container images.
* [ ] Establish rapid patch SLAs for components flagged by OWASP Top 10 A06 (Vulnerable & Outdated Components).

## 6. Authentication & Session Management

_Docs: [OWASP ASVS V2 Authentication](https://owasp.org/www-project-application-security-verification-standard/), [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)_

* [ ] Implement MFA-ready authentication flows with secure password storage (PBKDF2, bcrypt, Argon2).
* [ ] Issue session tokens with secure, HttpOnly, SameSite attributes and regenerate after privilege changes.
* [ ] Centralize credential recovery and brute-force protections aligned with ASVS controls.

## 7. Access Control & Authorization

_Docs: [OWASP Top 10 A01/Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/), [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)_

* [ ] Enforce server-side authorization checks on every request, avoiding client-managed trust decisions.
* [ ] Apply least privilege with role- and attribute-based access mappings reviewed each release.
* [ ] Automate regression tests for critical authorization paths to prevent reintroducing A01 weaknesses.

## 8. Data Protection & Privacy

_Docs: [OWASP Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html), [OWASP Privacy Risks Project](https://owasp.org/www-project-top-10-privacy-risks/)_

* [ ] Classify data assets and enforce encryption in transit (TLS 1.2+) and at rest using approved libraries.
* [ ] Rotate keys, certificates, and secrets with documented ownership and tamper-evident storage.
* [ ] Conduct privacy impact assessments to mitigate OWASP Top 10 Privacy Risks before launch.

## 9. API & Microservices Security

_Docs: [OWASP API Security Top 10](https://owasp.org/API-Security/), [OWASP ASVS V13 API & Web Service](https://owasp.org/www-project-application-security-verification-standard/)_

* [ ] Authenticate and authorize every API call, avoiding reliance on implicit trust between services.
* [ ] Implement schema validation, rate limiting, and input throttling for public and internal APIs.
* [ ] Maintain API inventories with lifecycle status; decommission or sandbox unused endpoints promptly.

## 10. Testing & Verification

_Docs: [OWASP ASVS Testing Guidance](https://owasp.org/www-project-application-security-verification-standard/), [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)_

* [ ] Cover each release with automated SAST, DAST, and interactive testing mapped to ASVS controls.
* [ ] Schedule manual penetration tests for high-risk applications and before major releases.
* [ ] Track findings in a centralized system with remediation SLAs and verification evidence.

## 11. Infrastructure & Deployment Hardening

_Docs: [OWASP Infrastructure as Code Security Checklist](https://owasp.org/www-project-infrastructure-as-code-security/), [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)_

* [ ] Harden build and deployment pipelines with signing, reproducible builds, and least-privilege runners.
* [ ] Scan IaC templates and container images for OWASP Cloud-Native risks before provisioning.
* [ ] Enforce security baselines (firewall rules, network segmentation, secrets management) as code.

## 12. Monitoring, Response & Continuous Improvement

_Docs: [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html), [OWASP Incident Response Guide](https://owasp.org/www-project-incident-response/)_

* [ ] Instrument applications with structured logging, anomaly detection, and alerting for critical events.
* [ ] Maintain incident response runbooks aligned with OWASP guidance; rehearse annually with tabletop exercises.
* [ ] Feed post-incident findings into SAMM maturity assessments and backlog improvements.
