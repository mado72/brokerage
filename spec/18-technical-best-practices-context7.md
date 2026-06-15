# Technical Best Practices from Context7

This artifact records the current third-party documentation guidance consulted through Context7 and the Expo SDK 56 reference. It does not replace `spec/00`-`07`; it adds library-specific implementation guidance.

## 1) Sources consulted

| Source | Purpose |
|--------|---------|
| Context7 `/websites/expo_dev` | Expo Router and Expo web/mobile practices |
| Expo SDK 56 docs (`https://docs.expo.dev/versions/v56.0.0/`) | Version baseline and runtime compatibility |
| Context7 `/fastify/fastify` | Fastify schemas, validation, hooks, TypeScript route typing |
| Context7 `/websites/zod_dev_v4` | Zod 4 schema composition and discriminated unions |

## 2) Expo / React frontend guidance

Project baseline:

| Dependency | Version guidance |
|------------|------------------|
| Expo SDK | 56.0.0 |
| React Native | 0.85 |
| React | 19.2.3 |
| React Native Web | 0.21.0 |
| Minimum Node.js for Expo SDK 56 | 22.13.x |

The monorepo backend standard is Node.js 24, which satisfies the Expo SDK 56 minimum.

### 2.1 Routing

Context7 Expo docs show Expo Router using file-system routes and `_layout.tsx` files with `Stack` and `Tabs`.

Implementation guidance:

- Use Expo Router for app navigation.
- Use route groups for auth vs authenticated app.
- Keep route names aligned with `spec/14-ui-routes-copy-and-combos.md`.
- Use screen options for Portuguese titles.

Recommended structure:

```text
apps/frontend/app/
  (auth)/
    _layout.tsx
    login.tsx
  (app)/
    _layout.tsx
    index.tsx
    pipeline.tsx
    assets/
      index.tsx
      new.tsx
      [id]/
        index.tsx
        prospecting.tsx
        interest.tsx
        negotiations.tsx
    partners/
    clients/
    negotiations/
      [id]/
        index.tsx
        terms.tsx
        commission.tsx
        ncda.tsx
        follow-ups.tsx
    settings.tsx
```

### 2.2 Web target

Expo docs support configuring web output in app config. For MVP:

- Start with standard Expo web output unless server rendering is explicitly needed.
- Do not introduce SSR unless a concrete requirement appears.
- Keep mobile-first layouts compatible with Expo web.

### 2.3 UI and forms

- Use Portuguese UI labels from `spec/14`.
- Keep validation messages user-readable in pt-BR.
- Keep schema names, field names, and comments in English.
- Prefer shared schema-driven forms once Zod contracts are in place.

## 3) Fastify backend guidance

Context7 Fastify docs show route definitions with schemas for request parts (`body`, `params`, `querystring`, `headers`) and response types, plus validation hooks.

Implementation guidance:

- Every route declares input and response schema.
- Authentication and authorization should run in hooks (`preValidation` or `preHandler`).
- Route handlers should be thin and call service-layer use cases.
- Business rules must not live inside controllers/route handlers.

Layering:

```text
routes -> services -> repositories
```

Examples of service-owned rules:

- Capacity validation and allocation release
- State transition preconditions
- Cancellation rules
- Commission split validation
- Partner prospecting score
- Confidential field redaction policy

## 4) Zod 4 guidance

Context7 Zod 4 docs highlight:

- `z.discriminatedUnion()` for polymorphic data
- Type inference from schemas
- Object shape destructuring for better TypeScript performance when extending schemas

Recommended usage:

### 4.1 Asset metadata discriminated union

Use discriminated unions for type-specific `Asset.metadata`:

```ts
const AssetMetadataSchema = z.discriminatedUnion("type", [
  PrecatoryMetadataSchema,
  IcmsExportMetadataSchema,
  IpiCreditMetadataSchema,
  CreditRightMetadataSchema,
  OtherAssetMetadataSchema,
]);
```

### 4.2 Schema extension

Prefer:

```ts
const UpdatePartnerSchema = z.object({
  ...BasePartnerFields.shape,
  updatedReason: z.string().optional(),
});
```

Avoid ambiguous schema merging patterns when strictness matters.

### 4.3 Shared contracts

Recommended path:

```text
apps/backend/src/schemas/
packages/shared/schemas/    (future)
```

Until a shared package exists, keep schemas close to backend routes and mirror frontend types carefully.

## 5) Cross-cutting implementation rules

| Concern | Rule |
|---------|------|
| UI language | Visible text in Portuguese |
| Code language | Identifiers and comments in English |
| Validation | Zod schemas at boundaries |
| API | Fastify route schemas and typed handlers |
| State machine | Service-layer validation only |
| Security | Redact restricted origin fields server-side |
| Tests | Unit tests for every BR-* rule touched |
| Expo | Use SDK-compatible packages via `npx expo install` |

## 6) Documentation workflow

Before coding a feature:

1. Read the feature specs (`08`-`16`).
2. Read platform specs (`05` for backend, `06` for frontend).
3. Use Context7 for any library API or setup decision.
4. Update specs first if behavior changes.
5. Implement contracts, services, tests, then UI.

## 7) Revision history

| Date | Author | Summary |
|------|--------|---------|
| 2026-06-14 | Architecture | Initial Context7-backed technical practices |
