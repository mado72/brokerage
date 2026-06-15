# Product Requirements Document — finfor

## 1. Executive summary

**finfor** is an internal operations platform for a Brazilian intermediation office that brokers **credit rights and similar debt-settlement assets** — including *precatórios*, *ICMS de exportação*, *créditos de IPI*, and other comparable instruments.

Today, deal information lives in **parallel WhatsApp conversations**, making it hard to track which partners were prospected, who expressed interest at different times, and which negotiations deserve priority. finfor replaces that fragmentation with a **single asset-centric hub**: who disclosed the asset, who was prospected, who returned interest, what was asked or proposed, and how each parallel negotiation evolves through a defined state machine.

**MVP scope:** internal intermediary users only. Partners and end clients are **registered entities**, not application users.

**Post-MVP:** portfolio catalog for non-negotiated assets (basic information only, without revealing the asset holder or disclosing partner) and external interest confirmation.

## 2. Problem statement

| Pain | Impact |
|------|--------|
| Information scattered across WhatsApp threads | Lost context, duplicate outreach, missed follow-ups |
| Partners express interest asynchronously | Hard to compare momentum and prioritize deals |
| Multiple interested parties on one asset | No visibility into partial allocations and remaining capacity |
| Commission splits involve office + multiple partners | Manual tracking; risk of inconsistent terms |
| NCDA preparation | Data re-keyed from messages into contracts |

## 3. Product vision

Provide the intermediary office with a **trustworthy operational system of record** for:

1. Asset intake and partner provenance
2. Prospecting and interest tracking per asset
3. **Parallel negotiations** with partial allocation (BRL or %)
4. Commercial terms, commission splits, and NCDA draft data
5. Negotiation state progression through execution (single or recurring / tranched)

## 4. Target market and users

| Dimension | Value |
|-----------|-------|
| Geography | Brazil only |
| Market | B2B and B2C counterparty types (partners and direct clients) |
| MVP users | Internal intermediary staff |
| Post-MVP users | Partners and direct clients (read / express interest) |
| Regulatory context | LGPD; Brazilian legal jurisdiction |
| UI language | pt-BR |
| Documentation / code language | English |

## 5. Solution overview

### 5.1 Core concept: asset-centric hub

Every workflow anchors on an **Asset**. The asset detail screen is the operational hub with tabs for:

- Prospecting outreach
- Partner interest and interactions
- Parallel negotiations
- Commercial terms and commission splits
- NCDA draft information
- Follow-ups

### 5.2 Parallel negotiations with partial allocation

One asset may have **multiple simultaneous negotiations**, each tied to one interested party (partner or direct client). Each negotiation consumes a portion of the asset's negotiable capacity. When **remaining capacity reaches zero**, new negotiations are blocked.

Capacity unit: **BRL** or **percentage**.

Allocation reservation starts at **Commercial Proposal** state.

### 5.3 Partner provenance

When a partner introduces another partner, the system records **how the new partner entered** (`sourceType`, `referredByPartnerId`).

### 5.4 Confidentiality

Fields that identify **asset origin** or the **disclosing partner** are restricted by confidentiality rules (see `spec/09-domain-model.md` § Confidentiality).

## 6. Product phases

### Phase 1 — MVP (internal intermediary)

| Capability | Included |
|------------|----------|
| Partner CRUD + provenance | Yes |
| Direct client CRUD + asset need | Yes |
| Asset CRUD + type-specific identifiers | Yes |
| Prospecting mapping per asset | Yes |
| Interest + interaction timeline | Yes |
| Parallel negotiations + capacity | Yes |
| Commercial terms (deságio on gross value) | Yes |
| Commission splits (office + partners) | Yes |
| NCDA draft data capture | Yes |
| Follow-ups | Yes |
| Pipeline / dashboard | Yes |
| Internal auth + RBAC | Yes |

### Phase 2 — Portfolio and external interest

| Capability | Included |
|------------|----------|
| Search non-negotiated assets (anonymized) | Yes |
| External interest confirmation | Yes |
| Partner / client portal login | Yes |

### Phase 3 — Formalization and automation

| Capability | Included |
|------------|----------|
| Document exchange module | Yes |
| E-signature integration | Yes |
| Contract generation from templates | Yes |
| Recurring execution scheduler | Enhanced |
| Commission payment tracking | Yes |

## 7. Success metrics (MVP)

| Goal | Metric | Target |
|------|--------|--------|
| Centralize deal tracking | Active assets registered in system | 100% of active desk assets |
| Reduce lost follow-ups | Overdue follow-ups without action | Trend down vs baseline |
| Visibility on parallel deals | Assets with capacity bar accurate | 100% of active assets |
| Adoption | Weekly active internal users | ≥ 80% of desk staff |

## 8. Non-goals (MVP)

- Partner or client self-service login
- Anonymized public portfolio search
- Automated contract PDF generation
- E-signature integration
- Financial settlement / commission payment
- AI-based counterparty matching
- WhatsApp ingestion

## 9. Key domain terminology

See `spec/12-glossary.md` for the full PT ↔ EN glossary.

| PT (business) | EN (system) |
|---------------|-------------|
| Ativo | Asset |
| Parceiro | Partner |
| Cliente direto | DirectClient |
| Negociação | Negotiation |
| Deságio | Deságio (discount rate on gross value) |
| NCDA | NCDA (intermediation + non-disclosure + non-circumvention) |
| Cedente | Assignor |
| Cessionário | Assignee |
| Comarca | Jurisdiction (court district) |

## 10. Specification map

| Document | Purpose |
|----------|---------|
| `spec/08-product-requirements.md` | MVP scope, journeys, screens, acceptance |
| `spec/09-domain-model.md` | Entities, fields, relationships, calculations |
| `spec/10-deal-state-machine.md` | Negotiation states, transitions, allocation rules |
| `spec/11-permissions-matrix.md` | RBAC and confidentiality |
| `spec/12-glossary.md` | Terminology |
| `spec/00`–`07` | Engineering and UX directives |

## 11. Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product | Initial PRD from discovery sessions |
