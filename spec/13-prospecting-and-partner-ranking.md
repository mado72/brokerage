# Prospecting and Partner Ranking

This artifact defines how finfor ranks partners for asset prospecting. It complements `spec/09-domain-model.md` and must be used when implementing the asset prospecting tab, partner recommendation APIs, and dashboard insights.

UI labels, dropdown values, and user-facing text are in **pt-BR**. Code identifiers and comments remain in **English**.

## 1) Purpose

During prospecting, the intermediary needs to decide which partners should receive an asset first. The ranking must favor partners with:

1. Prior completed business
2. Trust
3. Favorable commercial proposals in past negotiations

The score is contextual to the target asset type (`AssetType`) so a partner preferred for `ICMS_EXPORT` may not be preferred for `PRECATORY`.

## 2) Composite score

```text
prospectingScore = round(
  0.35 * historyScore
+ 0.25 * trustScoreNormalized
+ 0.40 * commercialScore
+ affinityBonus
)
```

| Component | Weight | Range | Source |
|-----------|--------|-------|--------|
| `historyScore` | 35% | 0-100 | Past executed negotiations |
| `trustScoreNormalized` | 25% | 0-100 | Manual trust rating |
| `commercialScore` | 40% | 0-100 | Quality and speed of proposals |
| `affinityBonus` | +0 to +10 | 0-10 | Same asset type history |

Final score is capped at `100`.

## 3) Score tiers

| Tier code | Score | UI label (pt-BR) | Guidance (pt-BR) |
|-----------|-------|------------------|------------------|
| `PREFERRED` | 80-100 | Preferido | Contatar primeiro |
| `RECOMMENDED` | 60-79 | Recomendado | Forte candidato |
| `NEUTRAL` | 40-59 | Neutro | Contatar se houver capacidade |
| `LOW_PRIORITY` | 0-39 | Baixa prioridade | Contatar apenas depois dos demais |

## 4) History score

Scope: negotiations where the partner was the interested party and the asset type matches the target asset.

| Submetric | Weight | Calculation |
|-----------|--------|-------------|
| Execution count | 40% | Negotiations that reached `EXECUTION` |
| Execution volume | 30% | Sum of executed `allocatedAmount` |
| Success rate | 20% | `executions / (executions + LOST + CANCELLED)` |
| Recency | 10% | `100 * e^(-daysSinceLastExecution / 365)` |

Cold-start default: `historyScore = 40`.

MVP tiering for execution count:

| Executions | Points |
|------------|--------|
| 0 | 0 |
| 1 | 40 |
| 2-3 | 60 |
| 4-5 | 80 |
| 6+ | 100 |

## 5) Trust score

`Partner.trustScore` is a manual 1-5 rating. Default for new partners: `3`.

| trustScore | Normalized |
|------------|------------|
| 1 | 20 |
| 2 | 40 |
| 3 | 60 |
| 4 | 80 |
| 5 | 100 |

Only `MANAGER` and `ADMIN` may update trust. Changes must be audited.

## 6) Commercial score

Scope: past commercial proposals for the same asset type.

| Submetric | Weight | Calculation |
|-----------|--------|-------------|
| Proposal advance rate | 50% | Proposals that reached `COMMISSION_NEGOTIATION` or later |
| Executed terms quality | 30% | Partner median `desagioRate` distance from desk success median |
| Time to favorable proposal | 20% | Days from negotiation open to first `COMMERCIAL_PROPOSAL` |

Cold-start default: `commercialScore = 40`.

## 7) Affinity bonus

| Condition | Bonus |
|-----------|-------|
| At least 1 execution on same asset type | +5 |
| At least 3 executions on same asset type | +8 |
| At least 1 same-type execution in last 12 months | +2 |

Maximum bonus: `10`.

## 8) Prospecting tab behavior

Route: `/assets/[id]/prospecting`

| UI area | Behavior |
|---------|----------|
| Recommended partners list | Sorted by `prospectingScore` descending |
| Score badge | Shows `Preferido`, `Recomendado`, `Neutro`, or `Baixa prioridade` |
| Breakdown tooltip | Shows `Histórico`, `Confiança`, `Comercial`, `Afinidade` |
| Outreach action | Button label: `Registrar prospecção` |
| Already prospected | Show as disabled or moved to "Parceiros prospectados" |

## 9) Dropdowns and text (pt-BR)

### Trust selector

| Value | UI label |
|-------|----------|
| 1 | 1 - Baixa confiança |
| 2 | 2 - Confiança limitada |
| 3 | 3 - Confiança neutra |
| 4 | 4 - Alta confiança |
| 5 | 5 - Confiança máxima |

### Prospecting channel

| Code | UI label |
|------|----------|
| `WHATSAPP` | WhatsApp |
| `PHONE` | Telefone |
| `EMAIL` | E-mail |
| `MEETING` | Reunião |
| `OTHER` | Outro |

### Empty states

| Context | Text |
|---------|------|
| No ranked partners | Nenhum parceiro elegível para prospecção. |
| No outreach yet | Nenhum parceiro foi prospectado para este ativo. |
| Low confidence warning | Parceiro com baixa confiança. Avalie antes de prospectar. |

## 10) API expectations

Recommended endpoint:

```text
GET /assets/:assetId/prospecting/recommendations
```

Response should include:

```ts
type PartnerProspectingRecommendation = {
  partnerId: string;
  partnerName: string;
  prospectingScore: number;
  prospectRankTier: "PREFERRED" | "RECOMMENDED" | "NEUTRAL" | "LOW_PRIORITY";
  scoreBreakdown: {
    history: number;
    trust: number;
    commercial: number;
    affinityBonus: number;
  };
  alreadyProspected: boolean;
};
```

## 11) Acceptance criteria

1. Partners are ranked by contextual score for the target asset type.
2. New partners default to `NEUTRAL`, not hidden.
3. Managers can update trust score; other roles cannot.
4. The ranking endpoint explains score breakdown.
5. UI labels and helper text are in Portuguese.
6. Code identifiers and comments are in English.

## 12) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product | Initial partner ranking artifact from discovery |
