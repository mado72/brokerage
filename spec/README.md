# Project Specifications Index

This folder contains planning and decision guidelines for the finfor monorepo.

Scope:
- Cross-cutting architecture, testing, and engineering standards
- Visual and UX consistency rules that all agents must follow
- Framework-specific directives where the stack is already chosen
- Product requirements template for finfor-specific features and journeys

Specs in this folder:

**Engineering and UX (`00`–`07`) — how work is done**

1. 00-shared-architecture-directives.md
2. 01-visual-direction.md
3. 02-design-system-rules.md
4. 03-page-layout-guidelines.md
5. 04-ai-aesthetic-guardrails.md
6. 05-backend-architecture-directives.md
7. 06-frontend-architecture-directives.md
8. 07-monorepo-testing-strategy.md

**Product and domain (`prd`, `08`–`18`) — what finfor delivers and how agents should apply it**

- prd.md — product vision, phases, success metrics
- 08-product-requirements.md — MVP scope, journeys, screens, acceptance
- 09-domain-model.md — entities, enums, calculations, business rules
- 10-deal-state-machine.md — negotiation states, transitions, allocation
- 11-permissions-matrix.md — RBAC and confidentiality
- 12-glossary.md — PT ↔ EN terminology
- 13-prospecting-and-partner-ranking.md — partner scoring for prospecting
- 14-ui-routes-copy-and-combos.md — routes, UI labels, dropdowns, validation messages
- 15-api-contract-draft.md — initial API surface and payload contracts
- 16-mvp-backlog-and-acceptance.md — epics, stories, acceptance, test focus
- 17-ai-agents-skills-and-specs.md — AI agent/skill operating model
- 18-technical-best-practices-context7.md — Context7-backed technical practices

Decision policy:
- If future implementation choices conflict with these specs, update the relevant spec first.
- Keep this folder as the source of truth for engineering and UX intent.
- Product scope lives in `prd.md` and `08`; domain rules in `09`–`13`; implementation-facing product artifacts in `14`–`18`. Files `00`–`07` define how engineering and UX work is done.

## Sprint Approval Checklist

Use this checklist at the end of each sprint phase before moving forward.

### 1) Discovery Approval
- Business goals are explicit and measurable for the phase (`08-product-requirements.md` §2).
- Primary audience and core user journeys are documented (`08-product-requirements.md` §3, §5).
- Scope boundaries (in/out) are defined (`08-product-requirements.md` §6).
- Open assumptions and risks are listed with owners (`08-product-requirements.md` §11).
- Any reference designs or mocks are mapped to concrete UX decisions.

Exit criteria:
- Approved by product/stakeholders before design execution.

### 2) Design Approval
- Proposed layouts align with spec/01-visual-direction.md.
- Components and spacing rules align with spec/02-design-system-rules.md.
- Page structures align with spec/03-page-layout-guidelines.md.
- Aesthetic QA checklist from spec/04-ai-aesthetic-guardrails.md is fully passed.
- Mobile behavior was reviewed for hierarchy and readability.

Exit criteria:
- Design sign-off confirms visual identity and consistency.

### 3) Build Approval
- Implemented UI matches approved design direction.
- No visual regressions against core content-first hierarchy.
- Critical navigation and primary user flows are functional.
- Performance-sensitive media and data handling is validated.
- Any implementation trade-off is recorded with rationale.

Exit criteria:
- Build is functionally stable and visually consistent with specs.

### 4) QA Approval
- Critical user journeys pass on desktop and mobile.
- Accessibility basics pass (contrast, focus, semantics, tap targets).
- End-to-end flows for the sprint scope are verified.
- Content consistency and typography are validated across screens.
- Release notes include deviations, known issues, and next actions.

Exit criteria:
- QA sign-off confirms release readiness for the sprint scope.
