# API Contract Draft

This artifact defines the initial API surface for the MVP. It is intentionally contract-first and implementation-neutral.

Rules:

- Endpoint paths, payload fields, schema names, enum codes, and comments are in **English**.
- User-facing error messages may be localized to **pt-BR** by the frontend using error codes.
- Backend implementation must follow `spec/05-backend-architecture-directives.md`: route handlers validate transport concerns, services own business rules, repositories own persistence.
- Fastify routes must declare request and response schemas. Context7 Fastify docs confirm schema-based validation on route definitions and pre-validation hooks as standard practice.
- Zod schemas should be the source for request/response contracts where practical. Zod 4 object composition should prefer shape destructuring for TypeScript performance.

## 1) API conventions

| Concern | Convention |
|---------|------------|
| Base path | `/api` |
| Versioning | Start unversioned; introduce `/api/v1` before public/external portal |
| IDs | UUID strings |
| Dates | ISO 8601 UTC strings |
| Timezone display | `America/Sao_Paulo` in UI |
| Currency | BRL |
| Validation | Zod at boundaries; Fastify route schemas |
| Errors | `{ code, message, details? }` |
| Pagination | `limit`, `cursor` for list endpoints |
| Sorting | `sort` query param where needed |

## 2) Error codes

| Code | HTTP | Meaning |
|------|------|---------|
| `VALIDATION_ERROR` | 400 | Invalid request payload |
| `UNAUTHORIZED` | 401 | Missing/invalid session |
| `FORBIDDEN` | 403 | Role or confidentiality restriction |
| `NOT_FOUND` | 404 | Resource not found |
| `CAPACITY_EXCEEDED` | 409 | Allocation exceeds asset capacity |
| `NO_REMAINING_CAPACITY` | 409 | Asset cannot accept new negotiations |
| `INVALID_STATE_TRANSITION` | 409 | State machine blocked transition |
| `COMMISSION_SPLIT_INVALID` | 409 | Missing or invalid split lines |
| `NCDA_DRAFT_INCOMPLETE` | 409 | Required NCDA fields missing |
| `CANCELLATION_REASON_REQUIRED` | 409 | Missing cancellation reason/category |
| `TRUST_UPDATE_FORBIDDEN` | 403 | Only Manager/Admin may update trust |

## 3) Auth

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/auth/login` | Login internal user |
| `POST` | `/api/auth/refresh` | Refresh session |
| `POST` | `/api/auth/logout` | End session |
| `GET` | `/api/auth/me` | Current user |

## 4) Partners

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/partners` | List partners |
| `POST` | `/api/partners` | Create partner |
| `GET` | `/api/partners/:partnerId` | Partner detail |
| `PATCH` | `/api/partners/:partnerId` | Update partner |
| `PATCH` | `/api/partners/:partnerId/trust` | Update trust score (Manager/Admin only) |

### CreatePartner request

```ts
type CreatePartnerRequest = {
  name: string;
  phone: string;
  email: string;
  sourceType: "DIRECT" | "PARTNER_REFERRAL" | "OTHER";
  referredByPartnerId?: string;
  referredAt?: string;
  sourceNotes?: string;
  trustScore?: 1 | 2 | 3 | 4 | 5;
};
```

Rules:

- `sourceType = PARTNER_REFERRAL` requires `referredByPartnerId`.
- `sourceType = OTHER` requires `sourceNotes`.
- `trustScore` defaults to `3`.

## 5) Direct clients

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/direct-clients` | List direct clients |
| `POST` | `/api/direct-clients` | Create direct client |
| `GET` | `/api/direct-clients/:clientId` | Direct client detail |
| `PATCH` | `/api/direct-clients/:clientId` | Update direct client |

## 6) Assets

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/assets` | List assets |
| `GET` | `/api/active-deals` | Active deal summaries for the first operational screen |
| `POST` | `/api/assets` | Create asset |
| `GET` | `/api/assets/:assetId` | Asset detail with redaction based on permissions |
| `PATCH` | `/api/assets/:assetId` | Update asset |
| `GET` | `/api/assets/:assetId/capacity` | Capacity summary |

### CreateAsset request

```ts
type CreateAssetRequest = {
  type: "CREDIT_RIGHT" | "PRECATORY" | "ICMS_EXPORT" | "IPI_CREDIT" | "OTHER";
  description?: string;
  grossValue: number;
  capacityUnit: "BRL" | "PERCENTAGE";
  totalCapacity: number;
  disclosingPartnerId: string;
  confidentialityLevel: "STANDARD" | "RESTRICTED";
  metadata: Record<string, unknown>;
};
```

### ActiveDealSummary response

`GET /api/active-deals` returns a composed read model for the first authenticated operational screen. The backend owns redaction of `disclosingPartner` and any origin metadata before the payload reaches the frontend.

```ts
type ActiveDealSummary = {
  asset: {
    id: string;
    code?: string;
    description?: string;
    type: "CREDIT_RIGHT" | "PRECATORY" | "ICMS_EXPORT" | "IPI_CREDIT" | "OTHER";
    grossValue: number;
    createdAt: string;
    capacity: {
      total: number;
      allocated: number;
      remaining: number;
      unit: "BRL" | "PERCENTAGE";
    };
    disclosingPartner?: {
      id: string;
      name: string;
    } | null;
    restrictedFieldsRedacted: boolean;
  };
  commercialSummary?: {
    desagioRate?: number;
    netValue?: number;
    validUntil?: string;
  };
  commissionSummary?: {
    status: "PROPOSED" | "AGREED";
    lineCount: number;
  };
  prospecting: {
    contacted: Array<{
      partnerId: string;
      partnerName: string;
      status: "PROSPECTED" | "INTERESTED" | "NO_RESPONSE" | "CONVERTED";
      sentAt?: string;
      channel?: "WHATSAPP" | "PHONE" | "EMAIL" | "MEETING" | "OTHER";
    }>;
    recommendations: Array<{
      partnerId: string;
      partnerName: string;
      prospectingScore: number;
      prospectRankTier: "PREFERRED" | "RECOMMENDED" | "NEUTRAL" | "LOW_PRIORITY";
    }>;
  };
};
```

Rules:

- Only include assets with `status = ACTIVE`.
- Sort by `createdAt` descending by default.
- Preserve backend RBAC redaction for confidential asset origin and disclosing partner fields.
- `commercialSummary` and `commissionSummary` should reflect the most relevant active negotiation for the asset, prioritizing later lifecycle states over drafts.
- `prospecting.contacted` should be derived from outreach, interest, and negotiation conversion state.
- `prospecting.recommendations` should exclude already prospected partners unless the frontend explicitly asks for full recommendation context later.

## 7) Prospecting and interest

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/assets/:assetId/prospecting/recommendations` | Ranked partner recommendations |
| `GET` | `/api/assets/:assetId/prospecting` | List outreach records |
| `POST` | `/api/assets/:assetId/prospecting` | Register outreach |
| `GET` | `/api/assets/:assetId/interests` | List interests |
| `POST` | `/api/assets/:assetId/interests` | Register interest |
| `POST` | `/api/interests/:interestId/interactions` | Add interaction |

### Recommendation response

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

## 8) Negotiations

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/assets/:assetId/negotiations` | List negotiations for asset |
| `POST` | `/api/assets/:assetId/negotiations` | Create negotiation |
| `GET` | `/api/negotiations/:negotiationId` | Negotiation detail |
| `PATCH` | `/api/negotiations/:negotiationId` | Update editable fields |
| `POST` | `/api/negotiations/:negotiationId/transitions` | Advance or change state |
| `POST` | `/api/negotiations/:negotiationId/cancel` | Cancel before formalization complete |

### CreateNegotiation request

```ts
type CreateNegotiationRequest = {
  interestedPartyId: string;
  partyType: "PARTNER" | "DIRECT_CLIENT";
  officeRole: "SELL" | "BUY" | "INTERMEDIATE";
  allocatedAmount: number;
  ownerUserId: string;
};
```

### Transition request

```ts
type TransitionNegotiationRequest = {
  toState:
    | "INTEREST_SPECULATION"
    | "COMMERCIAL_PROPOSAL"
    | "COMMISSION_NEGOTIATION"
    | "CONTRACT_DRAFTING"
    | "SIGNATURES"
    | "DOCUMENT_EXCHANGE"
    | "CONDITIONS_ACCEPTANCE"
    | "EXECUTION"
    | "LOST"
    | "ARCHIVED";
  reason?: string;
};
```

### Cancel request

```ts
type CancelNegotiationRequest = {
  cancellationReasonCategory: CancellationReasonCategory;
  cancellationReason: string;
};
```

Rules:

- Cancel allowed through `CONDITIONS_ACCEPTANCE`.
- Cancel blocked in `EXECUTION`.
- `OTHER` requires `cancellationReason.length >= 20`.
- Cancellation releases allocation.

## 9) Commercial terms

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/negotiations/:negotiationId/commercial-terms` | List versions |
| `POST` | `/api/negotiations/:negotiationId/commercial-terms` | Create new version |

`desagioRate` applies to gross value. Store as decimal fraction (`0.15` = 15%).

## 10) Commission split

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/negotiations/:negotiationId/commission-split` | Current split |
| `PUT` | `/api/negotiations/:negotiationId/commission-split` | Save proposed split |
| `POST` | `/api/negotiations/:negotiationId/commission-split/agree` | Mark agreed (Manager/Admin) |

Rules:

- At least one `OFFICE` line.
- At least one `PARTNER` line.
- Percentage-only splits sum to 100%.

## 11) NCDA draft information

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/negotiations/:negotiationId/ncda` | Read draft data |
| `PUT` | `/api/negotiations/:negotiationId/ncda` | Save draft data |

Required before `CONTRACT_DRAFTING`:

- Assignor (`cedente`)
- Assignee (`cessionário`)
- Intermediaries
- Commercial summary
- Commission summary
- Comarca

## 12) Follow-ups

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/negotiations/:negotiationId/follow-ups` | List follow-ups |
| `POST` | `/api/negotiations/:negotiationId/follow-ups` | Create follow-up |
| `PATCH` | `/api/follow-ups/:followUpId` | Update/complete follow-up |

## 13) Backend implementation notes

Fastify best-practice alignment from Context7:

- Declare JSON schemas on route definitions for `body`, `params`, `querystring`, and `response`.
- Use `preValidation` or auth hooks for authentication and authorization.
- Keep route handlers thin; call services for state transitions, allocation, score calculation, and commission validation.

Zod best-practice alignment from Context7:

- Use Zod 4 object schemas and infer TypeScript types from schemas.
- Use discriminated unions for polymorphic payloads such as asset metadata by `AssetType`.
- Prefer object shape destructuring for extending schemas when performance matters.

## 14) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product/Architecture | Initial API contract draft |
