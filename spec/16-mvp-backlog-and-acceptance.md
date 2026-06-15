# MVP Backlog and Acceptance

This artifact translates the product/domain specs into implementation-ready epics, stories, and acceptance criteria.

Rules:

- Story titles and implementation references are in English.
- UI labels and expected visible text are in **pt-BR**.
- Code identifiers and comments are in **English**.

## 1) MVP sequence

Recommended implementation order:

1. Auth and RBAC foundation
2. Partner and DirectClient registries
3. Asset intake and asset hub
4. Prospecting and partner ranking
5. Interest and interaction timeline
6. Parallel negotiations and allocation
7. State machine and cancellation
8. Commercial terms
9. Commission split
10. NCDA draft data
11. Follow-ups and dashboard

## 2) Epics

### Epic 1 — Internal Auth and RBAC

Goal: allow internal users to access the app with role-based permissions.

| Story | Acceptance |
|-------|------------|
| Login internal user | User accesses `/login`, enters credentials, and reaches `/` |
| Current user session | App can read current user role and user id |
| Role-gated navigation | Settings visible only to Admin |
| Restricted field redaction | Users without clearance cannot see asset origin fields |

Relevant specs: `08`, `11`, `15`.

### Epic 2 — Partner Registry

Goal: manage partners, provenance, and trust score.

| Story | Acceptance |
|-------|------------|
| Create partner | User creates partner with name, phone, email, source type |
| Partner referral | `PARTNER_REFERRAL` requires `referredByPartnerId` |
| Trust score | Manager/Admin can set 1-5 trust; Deal Owner cannot |
| Partner detail | Shows origin, referrer, referred partners, and trust |

Visible labels: `Parceiros`, `Como surgiu o parceiro?`, `Indicado por`, `Confiança`.

Relevant specs: `09`, `11`, `14`.

### Epic 3 — Direct Client Registry

Goal: manage direct clients and their asset needs.

| Story | Acceptance |
|-------|------------|
| Create direct client | User creates client with name, phone, email, asset need |
| Client detail | User views and edits asset need |
| Client participation | Direct client can be selected as interested party in negotiation |

Visible labels: `Clientes diretos`, `Necessidade de ativos`.

### Epic 4 — Asset Intake and Asset Hub

Goal: register assets and centralize all work around them.

| Story | Acceptance |
|-------|------------|
| Create asset | User creates asset with type, gross value, capacity, disclosing partner |
| Asset metadata | Type-specific fields appear for selected asset type |
| Capacity summary | Asset hub shows Total, Alocado, Disponivel |
| Confidential origin | Disclosing partner hidden for unauthorized roles |

Visible labels: `Ativos`, `Valor bruto`, `Capacidade total`, `Parceiro divulgador`.

Relevant specs: `09`, `11`, `14`.

### Epic 5 — Prospecting and Partner Ranking

Goal: rank partners and record outreach.

| Story | Acceptance |
|-------|------------|
| Recommendations | `/assets/[id]/prospecting` shows partners sorted by score |
| Score explanation | User sees history, trust, commercial, and affinity breakdown |
| Register outreach | User records prospecting channel and notes |
| Already contacted | Previously prospected partners are marked and not duplicated |

Visible labels: `Preferido`, `Recomendado`, `Neutro`, `Baixa prioridade`, `Registrar prospecção`.

Relevant specs: `13`, `14`, `15`.

### Epic 6 — Interest and Interaction Timeline

Goal: capture asynchronous partner/client responses.

| Story | Acceptance |
|-------|------------|
| Register interest | User creates interest for partner or direct client |
| Add interaction | User adds question, answer, proposal, or note |
| Timeline | Asset interest tab shows chronological events |
| Convert to negotiation | Interest can create a negotiation if capacity allows |

Visible labels: `Interesse`, `Pergunta`, `Resposta`, `Proposta`, `Observação`.

### Epic 7 — Parallel Negotiations and Allocation

Goal: allow multiple negotiations per asset without over-allocation.

| Story | Acceptance |
|-------|------------|
| Create negotiation | User creates negotiation for partner/direct client with allocation |
| Capacity validation | Creation blocked if allocation exceeds remaining capacity |
| Parallel negotiations | Multiple negotiations can exist for one asset |
| Fully allocated asset | New negotiations blocked when remaining capacity is zero |

Relevant specs: `09`, `10`, `15`.

### Epic 8 — State Machine and Cancellation

Goal: enforce the 9-state negotiation lifecycle.

| Story | Acceptance |
|-------|------------|
| Advance state | Server validates each transition precondition |
| Reserve at proposal | Entering `COMMERCIAL_PROPOSAL` reserves allocation |
| Confirm at acceptance | Entering `CONDITIONS_ACCEPTANCE` confirms allocation |
| Cancel before execution | User cancels through `CONDITIONS_ACCEPTANCE` with category + reason |
| Block cancel in execution | Cancel action disabled and rejected in `EXECUTION` |

Visible labels: `Etapa da negociação`, `Cancelar negociação`, `Tipo de cancelamento`, `Razão do cancelamento`.

Relevant specs: `10`, `14`, `15`.

### Epic 9 — Commercial Terms

Goal: store versioned terms and calculate deságio on gross value.

| Story | Acceptance |
|-------|------------|
| Add terms version | New version created; previous versions immutable |
| Calculate net value | `desagioRate` on gross value derives net value |
| Proposal validity | User records `validUntil` |
| State precondition | Cannot enter `COMMERCIAL_PROPOSAL` without terms |

Visible labels: `Condições comerciais`, `Taxa de deságio`, `Valor líquido`.

### Epic 10 — Commission Split

Goal: define split across office and partners.

| Story | Acceptance |
|-------|------------|
| Save split | User creates office line + partner lines |
| Validate percentage | Percentage-only split sums to 100% |
| Agree split | Manager/Admin marks split as agreed |
| Block contract drafting | Cannot enter `CONTRACT_DRAFTING` without agreed split |

Visible labels: `Comissionamento`, `Escritório`, `Parceiro`, `Percentual`, `Valor fixo`.

### Epic 11 — NCDA Draft Data

Goal: collect information needed to form NCDA.

| Story | Acceptance |
|-------|------------|
| Fill NCDA form | User records assignor, assignee, intermediaries, terms, commissions, comarca |
| Case-dependent contracts | User selects required contract types as needed |
| State precondition | Cannot advance to signatures without required NCDA data |

Visible labels: `Cedente`, `Cessionário`, `Intermediários`, `Comarca`, `Cláusulas especiais`.

### Epic 12 — Follow-ups and Dashboard

Goal: surface pending actions and prioritize work.

| Story | Acceptance |
|-------|------------|
| Create follow-up | User schedules due date and notes |
| Complete follow-up | User marks follow-up complete |
| Dashboard | Shows overdue follow-ups, recent interest, stalled negotiations |
| Stale negotiation | Negotiation stuck over configured days is highlighted |

Visible labels: `Follow-ups vencidos`, `Negociações paradas`, `Interesses recentes`.

## 3) MVP exit checklist

- [ ] All P0 routes from `spec/14` are reachable.
- [ ] All domain BR-* rules touched by MVP have tests.
- [ ] State machine transitions are validated server-side.
- [ ] Capacity cannot be over-allocated.
- [ ] Cancellation requires category + reason.
- [ ] Partner recommendations show score and breakdown.
- [ ] Restricted origin fields are redacted by backend.
- [ ] UI strings visible to users are in Portuguese.
- [ ] Code identifiers and comments are in English.

## 4) Test focus

| Area | Required tests |
|------|----------------|
| Partner referral | source validation and self-referral rejection |
| Prospecting score | cold-start, preferred partner, same asset type affinity |
| Capacity | create, reserve, confirm, release, fully allocated block |
| State machine | allowed and forbidden transitions |
| Cancellation | allowed states, blocked execution, required category/reason |
| Commission split | office + partner lines, percentage total |
| Confidentiality | redacted asset origin by role |

## 5) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product/Architecture | Initial MVP backlog artifact |
