# Project Agent Instructions

Cursor loads these rules automatically from `.cursor/rules/` (mirrors this file and `.github/copilot-instructions.md`).

Always treat the /spec folder as the source of truth for planning and implementation decisions.

Mandatory for any architecture planning and implementation:
1. Read spec/00-shared-architecture-directives.md
2. Treat spec/00-shared-architecture-directives.md as canonical for cross-cutting rules shared by frontend and backend

Mandatory for any testing planning and implementation:
1. Read spec/07-monorepo-testing-strategy.md
2. Treat spec/07-monorepo-testing-strategy.md as canonical for monorepo test layers, rollout phases, and CI execution order

Mandatory for backend architecture planning and implementation:
1. Read spec/05-backend-architecture-directives.md
2. Treat spec/05-backend-architecture-directives.md as canonical for Node.js 24 + npm 11 backend architecture decisions

Mandatory for frontend architecture planning and implementation:
1. Read spec/06-frontend-architecture-directives.md
2. Treat spec/06-frontend-architecture-directives.md as canonical for React 19.2.3 + Expo SDK 56 frontend architecture decisions

Mandatory for any UI/UX, page layout, styling, or component task:
1. Read spec/01-visual-direction.md
2. Read spec/02-design-system-rules.md
3. Read spec/03-page-layout-guidelines.md
4. Enforce spec/04-ai-aesthetic-guardrails.md

Mandatory for any product feature, user journey, or domain modeling task:
1. Read spec/prd.md and spec/08-product-requirements.md
2. Read spec/09-domain-model.md and spec/10-deal-state-machine.md when touching entities, negotiations, allocation, or commissions
3. Read spec/11-permissions-matrix.md when touching auth, roles, or confidential fields
4. Read spec/13-prospecting-and-partner-ranking.md when touching prospecting or partner preference logic
5. Read spec/14-ui-routes-copy-and-combos.md before implementing UI screens, labels, combos, or validation messages
6. Read spec/15-api-contract-draft.md before backend/frontend integration work
7. Read spec/16-mvp-backlog-and-acceptance.md when implementing MVP stories or acceptance criteria
8. Use spec/12-glossary.md for PT ↔ EN terminology
9. Keep UI labels/copy in Portuguese; keep code identifiers and comments in English
10. Update the relevant product/domain spec before implementation when scope, journeys, or domain rules change

If there is a conflict between ad-hoc implementation ideas and /spec documents, /spec documents win.

Do not implement visual changes that break the established content-first visual direction in the spec files.
