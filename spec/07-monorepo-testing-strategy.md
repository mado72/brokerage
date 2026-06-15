# Monorepo Testing Strategy (Backend Node.js + Frontend React Expo)

This document defines how to use the shared architecture directives in practical test planning and implementation across the monorepo.

## 1) Purpose

Use this plan to guarantee:

1. Fast feedback in pull requests.
2. Stable cross-app behavior between backend and frontend.
3. Clear ownership by test layer.
4. Predictable CI cost as the project scales.

## 2) Inheritance and Source of Truth

1. This plan inherits `spec/00-shared-architecture-directives.md` for shared testing rules.
2. Backend-specific test constraints from `spec/05-backend-architecture-directives.md` apply.
3. Frontend-specific test constraints from `spec/06-frontend-architecture-directives.md` apply.

## 3) Test Pyramid by App

### 3.1 Backend (Node.js)

1. Unit tests:
   - Target services, domain rules, and pure utilities.
   - Mock repositories and external providers.
2. Integration tests:
   - Target routes, middleware, auth guards, and validation boundaries.
   - Prefer Fastify injection over real network server boot.
3. Contract tests:
   - Validate request and response compatibility for critical endpoints.

### 3.2 Frontend (React + Expo)

1. Unit tests:
   - Target hooks, state transitions, formatters, and pure logic.
2. Component tests:
   - Target screens and reusable components with user-centric assertions.
3. E2E smoke tests:
   - Cover high-value journeys (authentication, navigation, main action flow).

## 4) Folder and Naming Conventions

Use this structure:

```text
apps/
  backend/
    tests/
      unit/
      integration/
      contract/
      fixtures/
      mocks/
  frontend/
    tests/
      unit/
      component/
      e2e/
      fixtures/
      mocks/
```

Naming conventions:

1. Prefer `*.spec.ts`.
2. Accept `*.test.ts` when already dominant in a folder.
3. Keep one convention per folder to avoid noise.

## 5) Quality Gates and Coverage

1. PR minimum gate:
   - lint + typecheck + all unit tests.
2. Main branch gate:
   - unit + integration/component + critical contract tests.
3. Scheduled gate (nightly or release candidate):
   - complete suite including E2E smoke tests.
4. Coverage priorities:
   - highest for domain/business and security-sensitive paths.

## 6) CI Execution Order

Run stages in this order:

1. Static checks (lint and typecheck).
2. Backend unit tests.
3. Frontend unit tests.
4. Backend integration and contract tests.
5. Frontend component tests.
6. Frontend E2E smoke tests.

If only one workspace changed, run affected stages first and keep full-suite execution for main branch.

## 7) Mocking and Isolation Rules

1. Mock external IO in unit tests (database, HTTP, storage, queue).
2. Avoid mocking core business rules under test.
3. Keep shared fixtures deterministic and small.
4. Centralize reusable doubles in each app `tests/mocks`.

## 8) Implementation Rollout Plan

Adopt in three phases:

1. Phase 1 (foundation):
   - Add test runners, scripts, and baseline unit suites.
2. Phase 2 (stability):
   - Add backend integration and frontend component suites.
3. Phase 3 (release confidence):
   - Add contract and E2E smoke coverage for critical paths.

## 9) Mandatory AI Behavior for Test Tasks

Before implementing tests, AI must:

1. Read this file and inherited architecture directives.
2. Propose the layer target (unit, integration, component, contract, or e2e).
3. Explain what is mocked and what remains real.
4. Keep tests aligned with the current phase when rollout is incremental.