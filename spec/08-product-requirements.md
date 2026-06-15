# Product Requirements (finfor)

This document is the source of truth for **what** finfor delivers in the MVP phase. Specs `00`–`07` define **how** it is built. Domain details: `spec/09-domain-model.md`, `spec/10-deal-state-machine.md`.

Update this file before design or implementation when scope, journeys, or domain rules change.

## 1) Product overview

| Field | Value |
|-------|-------|
| Product name | finfor |
| One-line description | Internal platform for intermediation of credit rights and similar assets (precatórios, ICMS export, IPI credits, etc.) |
| Current phase | MVP — internal intermediary users only |
| Last updated | 2026-06-14 |
| Owner | Product / intermediary office |

## 2) Goals and success metrics

| Goal | Metric | Target |
|------|--------|--------|
| Replace WhatsApp-only tracking | Active assets with complete prospecting + interest data | 100% of desk-active assets within 60 days |
| Prioritize parallel interest | Dashboard shows assets ranked by recent interest / overdue follow-up | Used weekly by ≥ 80% of staff |
| Accurate partial allocation | Capacity bar (total / allocated / remaining) matches business reality | Zero over-allocation incidents |
| NCDA readiness | Negotiations reaching contract drafting have NCDA draft fields complete | 100% before state advance |
| Commission clarity | Every agreed commission has office + partner split defined | 100% before execution |

Non-goals for this phase (explicitly out of scope):

- Partner or direct client login / portal
- Anonymized portfolio search for external parties
- E-signature or automated contract PDF generation
- Document upload module (defer to Phase 1.1 unless sprint capacity allows)
- WhatsApp or email ingestion
- Commission payment / ERP integration
- AI counterparty matching

## 3) Audience and personas

| Persona | Needs | Primary device |
|---------|-------|----------------|
| **Deal Owner** (intermediary) | Register assets, prospect partners, track interest, run parallel negotiations, follow-ups | Mobile + Web |
| **Manager** | Pipeline overview, approve commissions, reassign negotiations | Web + Mobile |
| **Legal / Backoffice** | NCDA data, contract drafting support, execution tracking | Web |
| **Admin** | User management, confidentiality policy, reference data | Web |

**Registered entities (not MVP app users):**

| Entity | Needs |
|--------|-------|
| **Partner** | Tracked as counterparty; may disclose assets, receive prospecting, express interest, refer other partners |
| **DirectClient** | Tracked as counterparty; may express asset needs and participate in negotiations |

## 4) Platform targets

- [x] Expo mobile app (`apps/frontend`)
- [x] Expo web
- [ ] Separate web app (future)
- [x] Backend API (`apps/backend`)
- [x] Admin or internal tools (same app, role-gated)

Notes:

- Mobile-first: quick checks between WhatsApp conversations
- UI locale: pt-BR
- Timezone: `America/Sao_Paulo`
- Currency: BRL
- LGPD: personal data for partners and direct clients; confidentiality for asset origin

## 5) Core user journeys

| Journey | Steps (summary) | Layout pattern(s) | Priority |
|---------|-----------------|-------------------|----------|
| **Register partner** | Create partner with contact data + source (direct / partner referral) | Form, Detail | P0 |
| **Register direct client** | Create client with contact + asset need | Form, Detail | P0 |
| **Intake asset** | Create asset with type, gross value, disclosing partner, type-specific IDs | Form wizard, Detail | P0 |
| **Prospect partners for asset** | From asset hub, record which partners received outreach | Detail + inline List/Form | P0 |
| **Capture interest** | Record partner/client interest + interactions (questions, proposals) | Detail + timeline | P0 |
| **Open parallel negotiation** | Create negotiation for interested party with allocation; validate capacity | Detail + Form | P0 |
| **Advance negotiation** | Move through 9 states; reserve capacity at commercial proposal | Detail + state stepper | P0 |
| **Set commercial terms** | Version terms; deságio on gross value | Form, List | P0 |
| **Define commission split** | Office + each partner: % or fixed amount | Form | P0 |
| **Prepare NCDA data** | Fill assignor, assignee, intermediaries, terms, commissions, comarca | Form | P0 |
| **Follow up** | Schedule and complete follow-ups on negotiations | List, Form | P0 |
| **Monitor pipeline** | Filter by state, asset, party, owner; spot stale deals | List / Kanban, Landing | P0 |

## 6) Feature scope

### In scope (MVP)

| Feature | Description | App surface |
|---------|-------------|-------------|
| Auth (JWT) | Internal user login | both |
| Partner CRUD | name, phone, email, sourceType, referredByPartnerId, trustScore (1–5) | both |
| DirectClient CRUD | name, phone, email, assetNeed | both |
| Asset CRUD | type, gross value, capacity unit (BRL/%), disclosing partner, type metadata | both |
| ProspectingOutreach | Map partners contacted per asset; **rank partners by prospecting score** | both |
| PartnerInterest + Interaction | Interest per asset/party; timeline of questions/proposals | both |
| Parallel Negotiations | N negotiations per asset; partial allocation; block at zero remaining | both |
| State machine | 9 negotiation states (see `spec/10`) | both |
| CommercialTerms | Versioned; deságio on gross; discount value | both |
| CommissionSplit | Always split: office + partners (% or amount) | both |
| NcdaDraftInfo | Intermediaries, assignor, assignee, terms, commissions, comarca | both |
| FollowUp | Due dates and completion on negotiations | both |
| Capacity bar | Total / allocated / remaining on asset | both |
| Dashboard | Recent interest, overdue follow-ups, stale negotiations | both |
| Audit log | State transitions and commission agreement | backend |
| Confidentiality | Restrict origin / disclosing partner fields | both |

### Out of scope (MVP)

| Item | Reason / defer to |
|------|-------------------|
| External portal | Post-MVP Phase 2 |
| Anonymized asset search | Post-MVP Phase 2 |
| Document upload | Phase 1.1 or Phase 3 |
| E-signature | Phase 3 |
| Recurring execution scheduler UI | Phase 1.1 (domain model supports tranches) |
| Contract type enforcement (always 3) | Case-by-case; manual checklist in MVP |

## 7) Domain model (summary)

Full detail in `spec/09-domain-model.md`.

| Entity | Key fields | Notes |
|--------|------------|-------|
| User | id, email, role | Internal intermediary staff |
| Partner | name, phone, email, sourceType, referredByPartnerId, trustScore | May refer other partners; ranked for prospecting |
| DirectClient | name, phone, email, assetNeed | May participate in negotiations |
| Asset | type, grossValue, capacityUnit, totalCapacity, disclosingPartnerId, metadata | Hub entity |
| ProspectingOutreach | assetId, partyId, partyType, sentAt, channel | party = Partner or DirectClient |
| PartnerInterest | assetId, partyId, partyType, expressedAt, status | Pre-negotiation interest |
| Interaction | interestId, type, content, occurredAt | question, answer, proposal, note |
| Negotiation | assetId, interestedPartyId, partyType, officeRole, allocatedAmount, currentState | Parallel per asset |
| CommercialTerms | negotiationId, assetValue, desagioRate, discountValue, version | deságio on gross |
| CommissionSplit | negotiationId, lines[] | office + partners; % or amount |
| NcdaDraftInfo | negotiationId, assignor, assignee, intermediaries, commercialSummary, commissionSummary, comarca | Draft data only |
| FollowUp | negotiationId, dueAt, completedAt, notes, assigneeId | |
| ExecutionPlan | negotiationId, type, tranches[] | single or recurring; tranches for ICMS-style deals |
| StateTransition | negotiationId, fromState, toState, triggeredBy, timestamp | Audit |

## 8) Screens and routes

| Screen | Route (planned) | Layout pattern | Auth required |
|--------|-----------------|----------------|---------------|
| Login | `/login` | Form | No |
| Dashboard | `/` | Landing | Yes |
| Pipeline | `/pipeline` | List / Kanban | Yes |
| Partners list | `/partners` | List | Yes |
| Partner create/edit | `/partners/new`, `/partners/[id]` | Form, Detail | Yes |
| Direct clients list | `/clients` | List | Yes |
| Direct client create/edit | `/clients/new`, `/clients/[id]` | Form, Detail | Yes |
| Assets list | `/assets` | List | Yes |
| Asset create | `/assets/new` | Form wizard | Yes |
| Asset hub | `/assets/[id]` | Detail + tabs | Yes |
| — Prospecting tab | `/assets/[id]/prospecting` | List + inline Form | Yes |
| — Interest tab | `/assets/[id]/interest` | Detail + timeline | Yes |
| — Negotiations tab | `/assets/[id]/negotiations` | List + Detail | Yes |
| Negotiation detail | `/negotiations/[id]` | Detail + state stepper | Yes |
| — Commercial terms | `/negotiations/[id]/terms` | List + Form | Yes |
| — Commission | `/negotiations/[id]/commission` | Form | Yes |
| — NCDA | `/negotiations/[id]/ncda` | Form | Yes |
| — Follow-ups | `/negotiations/[id]/follow-ups` | List + Form | Yes |
| Settings | `/settings` | Settings | Yes (Admin) |

## 9) API and integrations

| Capability | Owner | Contract notes |
|------------|-------|----------------|
| Auth (JWT) | backend | Login, refresh, role claims |
| Partners API | backend | CRUD + referral validation |
| DirectClients API | backend | CRUD |
| Assets API | backend | CRUD + capacity summary |
| Prospecting / Interest API | backend | Nested under asset; prospecting includes ranked partner list |
| Negotiations API | backend | CRUD + state transitions + allocation validation |
| CommercialTerms API | backend | Versioned per negotiation |
| CommissionSplit API | backend | Split lines validation (sum rules) |
| NcdaDraftInfo API | backend | One draft per negotiation |
| FollowUp API | backend | CRUD per negotiation |
| Audit log | backend | Read-only for managers |

OpenAPI or shared Zod schemas location (when defined):

- `apps/backend/src/schemas/`
- Future: `packages/shared/schemas/`

MVP integrations: none external. Object storage deferred to Phase 1.1.

## 10) Content and copy

| Area | Source | Reviewer |
|------|--------|----------|
| UI labels (pt-BR) | Product | Product |
| State names (pt-BR) | Product / legal | Product |
| Error messages | Engineering + product | Product |
| NCDA field labels | Legal | Legal |

## 11) Assumptions, risks, and open questions

| Type | Item | Owner | Status |
|------|------|-------|--------|
| Assumption | MVP users are internal only | Product | Resolved |
| Assumption | Capacity unit is BRL or % per asset, not both simultaneously | Product | Resolved |
| Assumption | Allocation reserves at COMMERCIAL_PROPOSAL | Product | Resolved |
| Assumption | deságioRate applies to gross asset value | Product | Resolved |
| Assumption | Commission always split across office + partners | Product | Resolved |
| Assumption | Contract package (NCDA types) depends on case — no forced checklist of 3 | Legal | Resolved |
| Assumption | Changing office role mid-deal requires a new negotiation | Product | Resolved |
| Risk | Over-allocation if reservation rules bypassed | Engineering | Open — mitigate with service-layer guards + tests |
| Risk | Low adoption if data entry feels heavier than WhatsApp | Product | Open — mobile-first, minimal required fields |
| Risk | LGPD exposure of partner PII | Engineering | Open — RBAC + audit |
| Question | Exact NCDA field list per contract template variant | Legal | Open |
| Question | Document module in MVP sprint or Phase 1.1 | Product | Open |

## 12) Acceptance criteria (phase exit)

- [x] Goals in section 2 are testable.
- [ ] P0 journeys in section 5 have acceptance criteria or tickets.
- [x] In/out scope in section 6 is agreed with stakeholders.
- [x] Domain entities in section 7 are sufficient for API and UI design.
- [ ] Screens in section 8 align with `spec/03-page-layout-guidelines.md`.
- [x] Assumptions and risks in section 11 have owners.

### P0 journey acceptance (MVP exit)

1. **Asset hub:** User can open an asset and see capacity bar, prospecting list, interest timeline, and all parallel negotiations.
2. **Parallel negotiations:** User can create two negotiations on the same asset with different interested parties; total allocation cannot exceed capacity; third negotiation blocked when remaining = 0.
3. **Commercial proposal reservation:** Moving to COMMERCIAL_PROPOSAL reserves allocation; losing, archiving, or **cancelling** releases it.
4. **Commission split:** User cannot mark commission as agreed without office line + all partner lines defined (% or amount).
5. **NCDA draft:** User cannot advance to CONTRACT_DRAFTING without assignor, assignee, intermediaries, commercial summary, commission summary, and comarca.
6. **Partner referral:** Creating a partner with PARTNER_REFERRAL requires valid referredByPartnerId; shown on detail screen.
7. **Confidentiality:** User without clearance cannot view disclosing partner or asset origin fields.
8. **Follow-up:** Overdue follow-ups appear on dashboard.
9. **Cancellation:** User can cancel through `CONDITIONS_ACCEPTANCE` with mandatory category + reason; `OTHER` requires ≥ 20 chars; blocked in `EXECUTION`; allocation released.
10. **Partner prospecting rank:** On asset prospecting tab, partners sorted by score; tier badge visible; trust editable by Manager only.

## 13) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product | MVP scope from discovery — parallel negotiations, allocation, NCDA, commission splits |
| 2026-06-15 | Product | Cancellation before formalization complete |
| 2026-06-15 | Product | Complete cancellation taxonomy (Option B) |
