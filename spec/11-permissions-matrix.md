# Permissions Matrix (finfor)

Role-based access control and confidentiality rules for MVP (internal users only).

Related: `spec/09-domain-model.md` §6, `spec/08-product-requirements.md`.

## 1) Roles

| Role | Description |
|------|-------------|
| `ADMIN` | Full system access; user management |
| `MANAGER` | All negotiations; commission approval; pipeline |
| `DEAL_OWNER` | Own negotiations and assigned assets; day-to-day desk work |
| `LEGAL` | NCDA, contracts, signatures, documents; read commercial terms |
| `BACKOFFICE` | Execution plans, follow-ups; broad read access |
| `READ_ONLY` | Read pipeline and reports; no mutations |

MVP users hold exactly one primary role. Multi-role support is a future enhancement.

## 2) Resource × action matrix

Legend: ✅ allowed · 🔒 restricted · ❌ denied · 👁 own/assigned only

| Resource / Action | ADMIN | MANAGER | DEAL_OWNER | LEGAL | BACKOFFICE | READ_ONLY |
|-------------------|-------|---------|------------|-------|------------|-----------|
| **Users** — manage | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Partners** — create/update | ✅ | ✅ | ✅ | 👁 | 👁 | 👁 |
| **Partners** — update trustScore | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Partners** — delete | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **DirectClients** — create/update | ✅ | ✅ | ✅ | 👁 | 👁 | 👁 |
| **Assets** — create/update | ✅ | ✅ | ✅ | 👁 | 👁 | 👁 |
| **Assets** — view restricted origin fields | ✅ | ✅ | 👁 owner | 🔒 | 🔒 | ❌ |
| **Prospecting / Interest** — create | ✅ | ✅ | 👁 | ❌ | 👁 | ❌ |
| **Negotiations** — create | ✅ | ✅ | 👁 | ❌ | 👁 | ❌ |
| **Negotiations** — view all | ✅ | ✅ | 👁 | 👁 | 👁 | 👁 |
| **Negotiations** — transition states | ✅ | ✅ | 👁 | 👁 legal states* | ❌ | ❌ |
| **CommercialTerms** — create version | ✅ | ✅ | 👁 | ❌ | ❌ | ❌ |
| **CommissionSplit** — propose | ✅ | ✅ | 👁 | ❌ | ❌ | ❌ |
| **CommissionSplit** — agree | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **NcdaDraftInfo** — edit | ✅ | ✅ | 👁 | ✅ | ❌ | ❌ |
| **FollowUp** — manage | ✅ | ✅ | 👁 | 👁 | ✅ | ❌ |
| **ExecutionPlan** — manage | ✅ | ✅ | 👁 | ❌ | ✅ | ❌ |
| **Audit log** — view | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Settings** — manage | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

\* **Legal states:** `CONTRACT_DRAFTING`, `SIGNATURES`, `DOCUMENT_EXCHANGE` — LEGAL may transition among these and read related data.

## 3) Ownership rules

| Rule | Description |
|------|-------------|
| OWN-01 | `DEAL_OWNER` is assigned via `Negotiation.ownerUserId` |
| OWN-02 | Deal Owner may fully manage own negotiations unless action requires MANAGER (commission agree) |
| OWN-03 | MANAGER and ADMIN may reassign `ownerUserId` |
| OWN-04 | Restricted asset fields visible to Deal Owner **only** when they own ≥1 active negotiation on that asset |

## 4) Confidentiality (LGPD + desk policy)

### 4.1 Restricted fields

When `Asset.confidentialityLevel = RESTRICTED`:

| Field / data | Visible to |
|--------------|------------|
| `disclosingPartnerId` | ADMIN, MANAGER, owning DEAL_OWNER |
| Asset origin metadata | Same as above |
| Partner referral chain | All internal roles (not restricted) |

### 4.2 API enforcement

- List endpoints for assets **omit** restricted fields unless caller has clearance.
- Detail endpoints return `403` or redacted payload for unauthorized roles.
- Post-MVP portfolio endpoints must **never** return restricted fields.

### 4.3 LGPD operations

| Operation | Role |
|-----------|------|
| Export partner/client personal data | ADMIN |
| Anonymize / delete partner/client | ADMIN (with audit) |
| Access audit log for data subject request | ADMIN |

## 5) State transition permissions (summary)

| Transition | Minimum role |
|------------|--------------|
| Create negotiation | DEAL_OWNER (own asset context) |
| → COMMERCIAL_PROPOSAL | DEAL_OWNER |
| → COMMISSION_NEGOTIATION | DEAL_OWNER |
| → CONTRACT_DRAFTING | MANAGER (commission agreed) |
| → SIGNATURES | LEGAL or DEAL_OWNER |
| → DOCUMENT_EXCHANGE | LEGAL or DEAL_OWNER |
| → CONDITIONS_ACCEPTANCE | DEAL_OWNER |
| → EXECUTION | MANAGER |
| → LOST / ARCHIVED | DEAL_OWNER; ARCHIVED also ADMIN |
| → CANCELLED | DEAL_OWNER, MANAGER (through CONDITIONS_ACCEPTANCE only) |

## 6) Commission approval

| Action | Role |
|--------|------|
| Propose split lines | DEAL_OWNER, MANAGER |
| Set status = AGREED | MANAGER, ADMIN |
| Modify agreed split | ADMIN only (with audit); otherwise new negotiation |

## 7) Future external roles (Post-MVP)

| Role | Scope |
|------|-------|
| `PARTNER_PORTAL` | Own interest, anonymized asset catalog, confirm interest |
| `CLIENT_PORTAL` | Same, scoped to direct client identity |

Not implemented in MVP.

## 8) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Product | Initial RBAC — internal MVP + confidentiality |
| 2026-06-15 | Product | Cancel negotiation permission (pre-execution) |
