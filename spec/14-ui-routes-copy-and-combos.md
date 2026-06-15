# UI Routes, Copy, and Combos

This artifact defines MVP screens, routes, user-facing labels, dropdown options, and baseline Portuguese copy.

Rules:

- UI labels, combo values, empty states, button text, and messages are in **pt-BR**.
- Code identifiers, comments, route names, API payloads, and enum codes are in **English**.
- Layout patterns must follow `spec/03-page-layout-guidelines.md`.
- Visual execution must follow `spec/01-visual-direction.md` through `spec/04-ai-aesthetic-guardrails.md`.

## 1) Route map

| Screen | Route | Layout pattern | Primary purpose |
|--------|-------|----------------|-----------------|
| Login | `/login` | Form | Internal access |
| Dashboard | `/` | Landing | Operational summary |
| Pipeline | `/pipeline` | List / Kanban | Negotiations by state |
| Partners list | `/partners` | List | Partner registry |
| Partner create | `/partners/new` | Form | Create partner |
| Partner detail/edit | `/partners/[id]` | Detail + Form | Partner profile and provenance |
| Direct clients list | `/clients` | List | Direct client registry |
| Direct client create | `/clients/new` | Form | Create direct client |
| Direct client detail/edit | `/clients/[id]` | Detail + Form | Direct client needs |
| Assets list | `/assets` | List | Asset portfolio |
| Asset create | `/assets/new` | Form wizard | Intake asset |
| Asset hub | `/assets/[id]` | Detail + tabs | Central asset workspace |
| Asset prospecting | `/assets/[id]/prospecting` | List + inline Form | Prospect partners |
| Asset interest | `/assets/[id]/interest` | Detail + timeline | Track interest and interactions |
| Asset negotiations | `/assets/[id]/negotiations` | List + Detail | Parallel negotiations |
| Negotiation detail | `/negotiations/[id]` | Detail + state stepper | Manage negotiation lifecycle |
| Commercial terms | `/negotiations/[id]/terms` | List + Form | Version commercial terms |
| Commission split | `/negotiations/[id]/commission` | Form | Define office + partner split |
| NCDA draft data | `/negotiations/[id]/ncda` | Form | Prepare contract data |
| Follow-ups | `/negotiations/[id]/follow-ups` | List + Form | Track pending actions |
| Settings | `/settings` | Settings | Admin configuration |

## 2) Navigation labels (pt-BR)

| Route | Navigation label |
|-------|------------------|
| `/` | Início |
| `/pipeline` | Pipeline |
| `/assets` | Ativos |
| `/partners` | Parceiros |
| `/clients` | Clientes diretos |
| `/settings` | Configurações |

## 3) Core screen copy

### Dashboard

| Element | Text |
|---------|------|
| Title | Início |
| Subtitle | Acompanhe ativos, prospecções, negociações e follow-ups do escritório. |
| Active deals title | Negócios ativos |
| Active deals subtitle | Acompanhe ativos, parceiros prospectados, condições comerciais e comissões em andamento. |
| KPI: active assets | Ativos ativos |
| KPI: overdue follow-ups | Follow-ups vencidos |
| KPI: reserved capacity | Capacidade alocada |
| KPI: stalled negotiations | Negociações paradas |

### Active deals

The first authenticated screen uses the Dashboard route (`/`) as an operational list of active asset-centered deals. Each item follows the List / Browse card pattern and groups the asset, disclosing partner, commercial terms, commission summary, contacted partners, and next recommended partners.

| Element | Text |
|---------|------|
| Section title | Negócios ativos |
| Empty state | Nenhum negócio ativo encontrado. |
| Primary action | Cadastrar ativo |
| Retry action | Tentar novamente |
| Restricted disclosing partner | Informação restrita |
| Contacted group | Prospectados |
| Recommendations group | Recomendados para próxima abordagem |
| Prospecting status: prospected | Prospectado |
| Prospecting status: interested | Com interesse |
| Prospecting status: no response | Sem retorno |
| Prospecting status: converted | Convertido |
| Prospecting status: not prospected | Não prospectado |
| Commercial fallback | Condições comerciais pendentes |
| Commission fallback | Comissão pendente |
| Commission proposed | Proposta |
| Commission agreed | Acordada |
| Sort: recent | Mais recentes |
| Sort: gross value | Maior valor bruto |
| Sort: follow-up | Próximo follow-up |
| Sort: activity | Maior atividade |
| Filter: all | Todos |
| Filter: with interest | Com interesse |
| Filter: with proposal | Com proposta |
| Filter: with commission | Com comissão |
| Filter: no response | Sem retorno |
| Filter: capacity available | Capacidade disponível |

### Asset hub

| Element | Text |
|---------|------|
| Title fallback | Ativo sem código |
| Capacity label | Capacidade do ativo |
| Total label | Total |
| Allocated label | Alocado |
| Remaining label | Disponível |
| Confidential warning | Informações de origem restritas pelo nível de confidencialidade. |

### Negotiation detail

| Element | Text |
|---------|------|
| State stepper label | Etapa da negociação |
| Cancel button | Cancelar negociação |
| State change button | Avançar etapa |
| Capacity warning | Esta negociação consome parte da capacidade disponível do ativo. |
| Execution blocked | A execução só pode iniciar após formalização e aceite das condições. |

## 4) Form labels (pt-BR)

### Partner

| Field | Label | Helper |
|-------|-------|--------|
| `name` | Nome | Nome do parceiro. |
| `phone` | Telefone | Informe WhatsApp ou telefone principal. |
| `email` | E-mail | E-mail principal do parceiro. |
| `sourceType` | Como surgiu o parceiro? | Identifique a origem do cadastro. |
| `referredByPartnerId` | Indicado por | Obrigatório quando a origem for indicação de parceiro. |
| `trustScore` | Confiança | Nota interna de confiança do escritório. |

### DirectClient

| Field | Label | Helper |
|-------|-------|--------|
| `name` | Nome | Nome do cliente direto. |
| `phone` | Telefone | Informe WhatsApp ou telefone principal. |
| `email` | E-mail | E-mail principal do cliente. |
| `assetNeed` | Necessidade de ativos | Descreva o tipo de ativo ou papel de interesse. |

### Asset

| Field | Label | Helper |
|-------|-------|--------|
| `type` | Tipo de ativo | Selecione a natureza do ativo. |
| `grossValue` | Valor bruto | Base para cálculo do deságio. |
| `capacityUnit` | Unidade da capacidade | BRL ou percentual. |
| `totalCapacity` | Capacidade total | Parcela negociável do ativo. |
| `disclosingPartnerId` | Parceiro divulgador | Parceiro que trouxe ou divulgou o ativo. |
| `confidentialityLevel` | Confidencialidade | Controla visibilidade da origem do ativo. |

### CommercialTerms

| Field | Label | Helper |
|-------|-------|--------|
| `assetValue` | Valor bruto de referência | Valor usado para calcular o deságio. |
| `desagioRate` | Taxa de deságio | Incide sobre o valor bruto. |
| `discountValue` | Valor de desconto | Valor de desconto informado, quando aplicável. |
| `validUntil` | Validade da proposta | Data limite da proposta comercial. |

### CommissionSplit

| Field | Label | Helper |
|-------|-------|--------|
| `commissionBase` | Base da comissão | Valor usado para percentuais. |
| `lineType` | Tipo de linha | Escritório ou parceiro. |
| `partnerId` | Parceiro | Obrigatório para linha de parceiro. |
| `valueType` | Tipo de valor | Percentual ou montante fixo. |
| `value` | Valor | Informe percentual ou valor em BRL. |

### Cancellation

| Field | Label | Helper |
|-------|-------|--------|
| `cancellationReasonCategory` | Tipo de cancelamento | Selecione o motivo principal. |
| `cancellationReason` | Razão do cancelamento | Descreva as razões apontadas para o cancelamento. |

## 5) Dropdowns

### Asset type

| Code | UI label |
|------|----------|
| `CREDIT_RIGHT` | Direito creditório |
| `PRECATORY` | Precatório |
| `ICMS_EXPORT` | ICMS de exportação |
| `IPI_CREDIT` | Crédito de IPI |
| `OTHER` | Outro |

### Office role

| Code | UI label |
|------|----------|
| `SELL` | Posição de venda |
| `BUY` | Posição de compra |
| `INTERMEDIATE` | Apenas intermediador |

### Capacity unit

| Code | UI label |
|------|----------|
| `BRL` | Valor em R$ |
| `PERCENTAGE` | Percentual |

### Partner source type

| Code | UI label |
|------|----------|
| `DIRECT` | Cadastro direto pelo escritório |
| `PARTNER_REFERRAL` | Indicado por parceiro |
| `OTHER` | Outro |

### Negotiation states

| Code | UI label |
|------|----------|
| `PROSPECTING` | Prospecção |
| `INTEREST_SPECULATION` | Interesse/Especulação |
| `COMMERCIAL_PROPOSAL` | Proposta comercial do interessado |
| `COMMISSION_NEGOTIATION` | Negociação das comissões |
| `CONTRACT_DRAFTING` | Contrato de intermediação, não divulgação e não circunvenção |
| `SIGNATURES` | Assinaturas |
| `DOCUMENT_EXCHANGE` | Trocas de documentos |
| `CONDITIONS_ACCEPTANCE` | Aceite das condições |
| `EXECUTION` | Execução |
| `LOST` | Perdida |
| `ARCHIVED` | Arquivada |
| `CANCELLED` | Cancelada |

### Cancellation reason category

| Code | UI label |
|------|----------|
| `INTERESTED_PARTY_WITHDREW` | Parte interessada desistiu |
| `INTERESTED_PARTY_UNRESPONSIVE` | Parte interessada sem retorno |
| `INTERESTED_PARTY_FOUND_ALTERNATIVE` | Parte encontrou outra oportunidade |
| `COMMERCIAL_TERMS_NOT_AGREED` | Condições comerciais não acordadas |
| `PROPOSAL_EXPIRED` | Proposta expirada |
| `OFFICE_ROLE_CHANGED` | Papel do escritório alterado |
| `COMMISSION_SPLIT_NOT_AGREED` | Split de comissão não acordado |
| `REFERRAL_COMMISSION_DISPUTE` | Disputa sobre comissão de indicação |
| `ASSET_UNAVAILABLE` | Ativo indisponível |
| `ASSET_DUE_DILIGENCE_FAILED` | Due diligence do ativo reprovada |
| `DISCLOSING_PARTNER_WITHDREW_ASSET` | Parceiro divulgador retirou o ativo |
| `TRANCHE_STRUCTURE_NOT_VIABLE` | Estrutura de tranches inviável |
| `SUPERSEDED_BY_OTHER_NEGOTIATION` | Substituída por outra negociação no mesmo ativo |
| `PARTIAL_ALLOCATION_RESTRUCTURED` | Realocação de capacidade do ativo |
| `NCDA_FORMATION_BLOCKED` | Impeditivo na formação do NCDA |
| `REGULATORY_OR_LEGAL_IMPEDIMENT` | Impeditivo legal ou regulatório |
| `DOCUMENTATION_INCOMPLETE` | Documentação insuficiente |
| `DUPLICATE_OR_ERRONEOUS_ENTRY` | Cadastro duplicado ou erro operacional |
| `CONFIDENTIALITY_CONCERN` | Risco de confidencialidade |
| `OTHER` | Outro |

## 6) Validation messages (pt-BR)

| Rule | Message |
|------|---------|
| Required field | Campo obrigatório. |
| Invalid email | Informe um e-mail válido. |
| Capacity exceeded | A alocação excede a capacidade disponível do ativo. |
| No remaining capacity | Este ativo não possui capacidade disponível para nova negociação. |
| Commission split missing office | Inclua a linha de comissão do escritório. |
| Commission split missing partner | Inclua ao menos uma linha de comissão para parceiro. |
| Cancellation reason required | Informe a razão do cancelamento. |
| Cancellation category required | Selecione o tipo de cancelamento. |
| Other cancellation too short | Descreva o motivo com mais detalhes. |
| Restricted field | Você não tem permissão para visualizar esta informação. |

## 7) Expo Router note

Expo Router uses file-system routes and `_layout.tsx` files for stacks and tabs. Screen documentation should map routes to folders before implementation.

Suggested top-level app groups:

```text
app/
  (auth)/
    login.tsx
  (app)/
    _layout.tsx
    index.tsx
    pipeline.tsx
    assets/
    partners/
    clients/
    negotiations/
    settings.tsx
```

## 8) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product | Initial UI route, copy, and combo artifact |
