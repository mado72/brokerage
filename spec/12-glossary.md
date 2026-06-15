# Glossary (finfor)

Business terminology (Portuguese) mapped to system terms (English). Use these labels consistently in specs, code, and UI (pt-BR).

## Core entities

| PT (business) | EN (system) | Notes |
|---------------|-------------|-------|
| Ativo | Asset | Credit right or similar negotiable instrument |
| Parceiro | Partner | Counterparty; may disclose, be prospected, or negotiate |
| Cliente direto | DirectClient | End client or direct counterparty |
| Negociação | Negotiation | Formal deal thread; parallel per asset |
| Oportunidade | Opportunity | Informal term for inbound deal lead; maps to Asset intake |
| Escritório | Office | The intermediary firm using finfor |

## Asset types

| PT | EN code |
|----|---------|
| Direito creditório | `CREDIT_RIGHT` |
| Precatório | `PRECATORY` |
| ICMS de exportação | `ICMS_EXPORT` |
| Crédito de IPI | `IPI_CREDIT` |
| Outro | `OTHER` |

## Commercial terms

| PT | EN | Definition |
|----|-----|------------|
| Valor bruto | grossValue / assetValue | Face or gross asset value before discount |
| Deságio | desagioRate | Discount rate applied to **gross** value |
| Valor de desconto | discountValue | Explicit discount amount in BRL |
| Valor líquido | netValue | Derived after deságio or discount |
| Condições comerciais | CommercialTerms | Versioned commercial conditions on a negotiation |
| Proposta comercial | Commercial Proposal | State + formal terms from interested party |

## Roles and parties

| PT | EN | Definition |
|----|-----|------------|
| Cedente | assignor | Party assigning / selling the right |
| Cessionário | assignee | Party receiving the right |
| Intermediador | intermediary / office | The desk brokering the deal |
| Parceiro divulgador | disclosing partner | Partner who brought the asset (`disclosingPartnerId`) |
| Parceiro indicador | referring partner | Partner who referred another partner (`referredByPartnerId`) |
| Parte interessada | interested party | Partner or direct client in a negotiation |
| Posição de venda | `SELL` office role | Office acts on sell side |
| Posição de compra | `BUY` office role | Office acts on buy side |
| Intermediação pura | `INTERMEDIATE` office role | Office brokers only |

## Negotiation states

| PT | EN code |
|----|---------|
| Prospecção | `PROSPECTING` |
| Interesse/Especulação | `INTEREST_SPECULATION` |
| Proposta comercial do interessado | `COMMERCIAL_PROPOSAL` |
| Negociação das comissões | `COMMISSION_NEGOTIATION` |
| Contrato de intermediação, NDA e não circunvenção | `CONTRACT_DRAFTING` |
| Assinaturas | `SIGNATURES` |
| Trocas de documentos | `DOCUMENT_EXCHANGE` |
| Aceite das condições | `CONDITIONS_ACCEPTANCE` |
| Execução | `EXECUTION` |

## Contracts and legal

| PT | EN | Notes |
|----|-----|-------|
| NCDA | NCDA | Intermediation + **N**on-disclosure + **N**on-**c**ircumvention package |
| Contrato de intermediação | intermediation contract | Part of NCDA set; case-dependent |
| Não divulgação | non-disclosure (NDA) | Part of NCDA set; case-dependent |
| Não circunvenção | non-circumvention | Part of NCDA set; case-dependent |
| Comarca | comarca / jurisdiction | Court district for legal purposes |

## Commission and execution

| PT | EN | Definition |
|----|-----|------------|
| Comissionamento | CommissionSplit | Always split across office + partners |
| Split | CommissionSplitLine | One line: office or partner share |
| Execução | Execution | Fulfillment after acceptance |
| Tranche | ExecutionTranche | Recurring slice (e.g. monthly ICMS portion) |
| Capacidade do ativo | totalCapacity | Negotiable portion of asset (BRL or %) |
| Alocação | allocatedAmount | Portion consumed by one negotiation |

## Operations

| PT | EN |
|----|-----|
| Prospecção (ação) | ProspectingOutreach |
| Pontuação de prospecção | prospectingScore | 0–100 rank for partner on asset (§4 in `09`) |
| Confiança | trustScore | Manual 1–5 on Partner |
| Interesse | Interest |
| Interação | Interaction |
| Follow-up | FollowUp |
| Perdida | LOST (terminal) |
| Arquivada | ARCHIVED (terminal) |
| Cancelada | CANCELLED (terminal) |
| Categoria do cancelamento | cancellationReasonCategory | Required enum when cancelling (Option B — see below) |
| Razão do cancelamento | cancellationReason | Required text; min 20 chars when category is OTHER |
| Formalização | formalization | CONTRACT_DRAFTING through CONDITIONS_ACCEPTANCE; complete at EXECUTION |

## Cancellation categories (Option B)

Full definitions in `spec/09-domain-model.md` § CancellationReasonCategory.

| Group | Codes |
|-------|-------|
| Interested party | `INTERESTED_PARTY_WITHDREW`, `INTERESTED_PARTY_UNRESPONSIVE`, `INTERESTED_PARTY_FOUND_ALTERNATIVE` |
| Commercial | `COMMERCIAL_TERMS_NOT_AGREED`, `PROPOSAL_EXPIRED`, `OFFICE_ROLE_CHANGED` |
| Commission | `COMMISSION_SPLIT_NOT_AGREED`, `REFERRAL_COMMISSION_DISPUTE` |
| Asset | `ASSET_UNAVAILABLE`, `ASSET_DUE_DILIGENCE_FAILED`, `DISCLOSING_PARTNER_WITHDREW_ASSET`, `TRANCHE_STRUCTURE_NOT_VIABLE` |
| Allocation | `SUPERSEDED_BY_OTHER_NEGOTIATION`, `PARTIAL_ALLOCATION_RESTRUCTURED` |
| Legal / formalization | `NCDA_FORMATION_BLOCKED`, `REGULATORY_OR_LEGAL_IMPEDIMENT`, `DOCUMENTATION_INCOMPLETE` |
| Desk | `DUPLICATE_OR_ERRONEOUS_ENTRY`, `CONFIDENTIALITY_CONCERN`, `OTHER` |

## Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product | Initial glossary from discovery |
| 2026-06-15 | Product | Cancellation and formalization terms |
| 2026-06-15 | Product | Cancellation categories Option B (19 + OTHER) |
