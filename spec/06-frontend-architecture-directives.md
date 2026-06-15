# Frontend Architecture Directives (React 19.2.3 + Expo SDK 56)

This document is the canonical frontend architecture directive for AI-guided planning and implementation of the mobile app.

Inheritance:

1. This document inherits all cross-cutting rules from `spec/00-shared-architecture-directives.md`.
2. This file defines frontend-specific constraints only.

## 1) Runtime and Framework Baseline

Enforce all of the following by default:

1. React 19.2.3.
2. Expo SDK 56 (~56.0.9).
3. Expo Router v4+ as the routing system.
4. TypeScript-first implementation.

## 2) Required Modern Feature Usage

### 2.1 React 19 Actions API

Use React 19 async transitions and action patterns by default:

1. Use useActionState for async submission state orchestration.
2. Use useFormStatus in form UI state feedback.
3. Use useOptimistic for immediate optimistic UX when applicable.
4. Prefer action-driven flows over manual loading and error booleans in components.

### 2.2 Expo SDK 56 Standards

1. Use Expo Router v4+ file-based routing under app.
2. Keep route groups and layouts explicit and predictable.
3. Use Expo UI stable production widgets when suitable.
4. Use type-safe Expo config plugins where configuration extensibility is needed.

## 3) Code Layering Architecture (3-Tier)

Follow this strict 3-tier model:

1. Presentation Layer
   - Owns UI composition and rendering.
   - Contains screen files in app, presentational components, and layout primitives.
   - Must not contain network or persistence logic.
2. Domain and Business Logic Layer
   - Owns screen behavior, orchestration, local validation rules, and app-level state coordination.
   - Contains custom hooks, providers, and domain logic utilities.
   - Must not embed transport-specific code in UI components.
3. Data and Infrastructure Layer
   - Owns API clients, cache/query integrations, and secure persistence.
   - Handles network boundaries, DTO mapping, and storage adapters.
   - Exposes narrow interfaces to hooks and services.

Allowed data flow:

1. Presentation -> Domain -> Data
2. Data -> Domain -> Presentation (mapped and UI-safe outputs)

Forbidden shortcuts:

1. Presentation directly calling infrastructure internals across screens.
2. Shared UI components containing direct credential or token persistence logic.

## 4) Directory Structure (Expo Router + Layered Src)

Use a structure similar to:

```text
apps/
  frontend/
    app/
      _layout.tsx                # root layout and providers composition
      (public)/                  # public route group
        _layout.tsx
        index.tsx
      (auth)/                    # auth route group
        _layout.tsx
        sign-in.tsx
      (app)/                     # protected route group
        _layout.tsx
        home.tsx
        profile.tsx
    src/
      components/                # reusable presentational UI
      hooks/                     # domain hooks and interaction logic
      providers/                 # app context providers
      services/                  # business services and orchestrators
      infrastructure/
        api/                     # fetch/axios clients and API modules
        cache/                   # TanStack Query client setup
        storage/                 # secure storage adapters
      schemas/                   # zod schemas for runtime boundaries
      styles/                    # tokens, themes, style primitives
      types/                     # shared contracts and DTOs
    tests/
      unit/                      # Vitest unit tests
      integration/               # optional integration tests
      mocks/                     # shared mocks and stubs
  shared/
    schemas/         # zod input/output schemas
    config/          # env parsing/validation and app config
    security/        # helmet, brute-force and security helpers
    observability/   # logging, metrics, tracing bootstrap
    types/           # shared type contracts
```

## 5) React 19 Data Flow and Actions Strategy

Apply these principles:

1. Form submissions and mutations should be modeled as actions.
2. Use useActionState to centralize pending, success, and failure transitions.
3. Use useFormStatus for submit affordances and status-driven accessibility.
4. Use useOptimistic for mutation flows that benefit from immediate UI feedback.
5. Keep error translation close to domain hooks, not deep inside presentational components.
6. Delegate server-state synchronization to TanStack Query where appropriate.

## 6) Production-Grade Security Patterns

### 6.1 Secure Token and Credential Storage

1. Store sensitive credentials only via expo-secure-store.
2. Never persist secrets in AsyncStorage or plain-text local storage.
3. Centralize token read and write operations in storage adapters.

### 6.2 Network Layer Security

1. Enforce HTTPS-only endpoints in production configuration.
2. Send auth tokens only through controlled request interceptors or wrappers.
3. Implement robust token refresh and retry rules to avoid infinite loops.
4. Avoid leaking sensitive headers or tokens in logs.

### 6.3 Input Sanitization and Runtime Validation

1. Validate boundary inputs and outputs with Zod.
2. Validate navigation params and remote payload decoding at boundaries.
3. Sanitize user-provided text before rendering or submitting.

## 7) Optimized Dependency Stack (Expo 56 Compatible)

Preferred baseline:

1. Routing and navigation: expo-router v4+.
2. Server-state and caching: @tanstack/react-query v5.
3. Runtime validation: zod.
4. Secure persistence: expo-secure-store.
5. Networking: native fetch wrapper or axios (project standard must pick one).
6. Testing: vitest for unit tests.

## 8) Mandatory AI Response Shape for Frontend Architecture Requests

When asked for frontend architecture, AI responses must be structured in this order:

1. Code Layering Architecture
2. Directory Structure
3. React 19 Data Flow and Actions
4. Production-Grade Security Patterns
5. Optimized Dependency Stack