# AI Agents, Skills, and Specs Operating Model

This artifact defines how AI agents should use the finfor specs to implement the product safely and consistently.

## 1) Source-of-truth hierarchy

```text
spec/prd.md                      -> WHY
spec/08-product-requirements.md  -> WHAT
spec/09-domain-model.md          -> ENTITIES AND BUSINESS RULES
spec/10-deal-state-machine.md    -> STATES AND TRANSITIONS
spec/11-permissions-matrix.md    -> ROLES AND CONFIDENTIALITY
spec/12-glossary.md              -> TERMINOLOGY
spec/13-prospecting...md         -> PARTNER RANKING
spec/14-ui...md                  -> UI ROUTES, COPY, COMBOS
spec/15-api...md                 -> API CONTRACTS
spec/16-mvp...md                 -> BACKLOG AND ACCEPTANCE
spec/00-07                       -> ENGINEERING AND UX HOW-TO
```

If product/domain behavior conflicts with implementation ideas, update the relevant spec first.

## 2) Existing rules

| Rule | Purpose |
|------|---------|
| `.cursor/rules/finfor-core.mdc` | Always-on monorepo and spec source-of-truth rule |
| `.cursor/rules/finfor-product.mdc` | Product scope, journeys, and domain modeling |
| `.cursor/rules/finfor-domain.mdc` | Asset, negotiation, allocation, commission, cancellation, ranking |
| `.cursor/rules/finfor-backend.mdc` | Backend architecture |
| `.cursor/rules/finfor-frontend.mdc` | Frontend architecture |
| `.cursor/rules/finfor-ui-ux.mdc` | UI/UX and visual standards |
| `.cursor/rules/finfor-testing.mdc` | Testing strategy |
| `.cursor/rules/finfor-context7.mdc` | Third-party docs via Context7 |

## 3) Recommended agents

Agents are operational roles. They do not need to be separate processes unless useful for the task.

| Agent | Responsibility | Mandatory reads |
|-------|----------------|-----------------|
| `finfor-product-architect` | Scope, journeys, acceptance, business terminology | `prd`, `08`, `12`, `16` |
| `finfor-domain-agent` | Entities, BR-* rules, state machine, allocation, cancellation | `09`, `10`, `11`, `13` |
| `finfor-backend-agent` | Fastify routes, services, repos, schemas, tests | `00`, `05`, `07`, `09`, `10`, `15` |
| `finfor-frontend-agent` | Expo routes, screens, forms, UI copy | `01`-`04`, `06`, `14`, `15` |
| `finfor-test-agent` | Unit, integration, component, state-machine coverage | `07`, `09`, `10`, `16` |
| `finfor-review-agent` | Reviews PRs for spec compliance and regressions | All changed-area specs |

## 4) Recommended skills

### `asset-hub`

Use when implementing `/assets/[id]` or nested asset tabs.

Mandatory reads:

- `spec/09-domain-model.md`
- `spec/13-prospecting-and-partner-ranking.md`
- `spec/14-ui-routes-copy-and-combos.md`

Checklist:

- Show capacity total/allocated/remaining.
- Hide restricted origin fields when role lacks clearance.
- Surface prospecting, interest, negotiations, and follow-ups.

### `prospecting-ranking`

Use when implementing partner recommendations or prospecting UI.

Mandatory reads:

- `spec/13-prospecting-and-partner-ranking.md`
- `spec/11-permissions-matrix.md`

Checklist:

- Use history/trust/commercial formula.
- Display pt-BR tier labels.
- Explain score breakdown.
- Restrict trust updates to Manager/Admin.

### `negotiation-state-machine`

Use when implementing negotiation transitions.

Mandatory reads:

- `spec/10-deal-state-machine.md`
- `spec/09-domain-model.md`
- `spec/11-permissions-matrix.md`

Checklist:

- Reserve allocation at `COMMERCIAL_PROPOSAL`.
- Confirm at `CONDITIONS_ACCEPTANCE`.
- Release on `LOST`, `ARCHIVED`, `CANCELLED`.
- Block cancellation in `EXECUTION`.
- Persist `StateTransition`.

### `commission-split`

Use when implementing commission forms, validation, or APIs.

Mandatory reads:

- `spec/09-domain-model.md` § CommissionSplit
- `spec/15-api-contract-draft.md`

Checklist:

- Require at least one office line and one partner line.
- Validate percentage sum = 100 when all percentage.
- Manager/Admin required for agreement.

### `ncda-draft-info`

Use when implementing NCDA fields or contract-preparation flows.

Mandatory reads:

- `spec/09-domain-model.md` § NcdaDraftInfo
- `spec/14-ui-routes-copy-and-combos.md`

Checklist:

- Capture assignor, assignee, intermediaries, commercial summary, commission summary, comarca.
- Contract types are case-dependent.
- Do not generate PDF in MVP.

### `api-contract-first`

Use before backend/frontend integration work.

Mandatory reads:

- `spec/15-api-contract-draft.md`
- `spec/05-backend-architecture-directives.md`
- `spec/06-frontend-architecture-directives.md`

Checklist:

- Define or update Zod schemas first.
- Validate route input/output.
- Keep domain logic in services.
- Keep UI copy in Portuguese, code identifiers in English.

## 5) Prompt template for implementation tasks

```text
Task:
Implement <feature>.

Specs:
- Read <specific specs>.

Constraints:
- UI labels/copy in pt-BR.
- Code identifiers and comments in English.
- Do not bypass domain/service-layer rules.
- Add tests for BR-* rules touched.

Acceptance:
- <copy from spec/16>.
```

## 6) PR review checklist

- [ ] Relevant specs were read and cited in work summary.
- [ ] UI strings visible to users are in Portuguese.
- [ ] Code identifiers and comments are in English.
- [ ] API contracts match `spec/15`.
- [ ] Domain rules are enforced server-side.
- [ ] State machine behavior has unit tests.
- [ ] Role/confidentiality restrictions are tested.
- [ ] No implementation contradicts product/domain specs.

## 7) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product/Architecture | Initial AI operating model |
