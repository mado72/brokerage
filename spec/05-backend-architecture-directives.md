# Backend Architecture Directives (Node.js 24 + npm 11)

This document is the canonical backend architecture directive for AI-guided planning and implementation.

Inheritance:

1. This document inherits all cross-cutting rules from `spec/00-shared-architecture-directives.md`.
2. This file defines backend-specific constraints only.

## 1) Runtime and Language Baseline

Enforce all of the following by default:

1. Node.js v24.x and npm v11.x.
2. Native ESM only (import/export).
3. Modern JavaScript features and native APIs (optional chaining, nullish coalescing, top-level await, global fetch, AbortController, Web Crypto).

## 2) Code Layering and Separation of Concerns

Follow this strict layering model:

1. Entry layer (routes/controllers/handlers):
   - Owns transport concerns only.
   - Performs request validation, auth checks, and response mapping.
   - Must not contain business rules.
2. Domain/service layer:
   - Owns business rules and orchestration.
   - Coordinates use cases and cross-service flows.
   - Must not depend on HTTP framework objects.
3. Data/repository layer:
   - Owns persistence and external data access.
   - Exposes narrow interfaces to service layer.
   - Must not be called directly by controllers.

Data flow must be one-directional:

1. Entry -> Service -> Repository
2. Repository -> Service -> Entry (result mapping only)

Forbidden shortcuts:

1. Controller -> Repository direct access.
2. HTTP request/response objects leaking into service or repository layers.

## 3) Directory Structure (Reference)

Use a layered structure similar to:

```text
apps/
  backend/
    src/
      app/
        routes/          # route registration and endpoint wiring
        controllers/     # entry handlers, request/response mapping
        middlewares/     # auth, rate-limit hooks, shared entry protections
      domain/
        services/        # business use cases and orchestration
        entities/        # core domain objects and invariants
        types/           # internal type contracts
      data/
        repositories/    # db adapters and external providers
        orm/             # prisma/drizzle configuration and clients
        schemas/         # zod input/output internal schemas
      index.ts           # bootstrap and startup
    tests/
      unit/              # Vitest unit tests (*.spec.ts or *.test.ts)
      fixtures/          # reusable test data factories and fixtures
      mocks/             # shared mocks and stubs
  shared/
    schemas/         # zod input/output schemas
    config/          # env parsing/validation and app config
    security/        # helmet, brute-force and security helpers
    observability/   # logging, metrics, tracing bootstrap
    types/           # shared type contracts
```

## 4) Vitest Setup Strategy (Node 24 ESM)

Apply these practices:

1. Use Vitest as the default unit test runner.
2. Co-locate tests with module or keep them under tests/unit with mirrored folders. Pick one strategy and keep consistency.
3. Isolation strategy:
   - Mock repositories and external gateways when testing service/domain logic.
   - Keep controller tests focused on entry contracts and status mapping.

## 5) Security Patterns and Best Practices

### 5.1 Rate Limiting and Brute-force Protection

1. Apply global rate limiting per IP and route-level tightening for auth endpoints.
2. Add brute-force controls for sign-in/reset flows (attempt windows, temporary lockouts, and audit logs).

### 5.2 Secure HTTP Headers

1. Use Helmet (or framework-equivalent) with explicit API-safe policies.
2. Disable or tune policies that conflict with API-only deployments, but keep secure defaults whenever possible.

### 5.3 Validation and Sanitization at Entry Layer

1. Use schema-first validation (Zod preferred) at route boundary.
2. Validate route params, query, headers, and body independently.
3. Normalize and sanitize values before domain execution.

### 5.4 Environment Variables and Secrets

1. Validate environment variables at startup with a strict schema.
2. Fail fast on missing/invalid configuration.
3. Separate runtime config from deploy-time secret injection.

## 6) Modern Dependency Stack (npm 11 Compatible)

Preferred baseline:

1. HTTP framework: Fastify (preferred) or Express.
2. Validation: Zod.
3. ORM/data access: Prisma or Drizzle.
4. Security headers: Helmet.
5. Rate limiting: framework-compatible limiter package.
6. Testing: Vitest.
7. Logging: Pino.

## 7) Mandatory AI Response Shape for Architecture Requests

When asked for backend architecture, AI responses must be structured in this order:

1. Code Layering and Separation of Concerns
2. Directory Structure (Markdown tree)
3. Vitest Setup Strategy
4. Security Patterns and Best Practices
5. Modern Dependency Stack