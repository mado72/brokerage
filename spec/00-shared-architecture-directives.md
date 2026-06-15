# Shared Architecture Directives (Cross-Platform)

This document defines reusable architectural standards shared by backend and frontend directives.

## 1) Scope and Inheritance

These directives are mandatory for:

1. `spec/05-backend-architecture-directives.md`
2. `spec/06-frontend-architecture-directives.md`

If there is a conflict between this file and platform-specific directives, platform-specific constraints win only for platform-only concerns. For cross-cutting concerns, this file remains canonical.

## 2) Shared Layering Principles

Apply these rules to all layered architectures:

1. Keep strict separation between presentation or transport concerns, domain logic, and data or infrastructure details.
2. Enforce one-directional dependency flow from outer layers to inner policies.
3. Prevent framework-specific primitives from leaking into domain logic.
4. Define narrow interfaces between layers.
5. Forbid direct shortcuts that bypass domain rules.

## 3) Shared Boundary Validation and Sanitization

1. Validate untrusted input and output contracts at boundaries.
2. Prefer schema-first validation (Zod as default unless explicitly overridden).
3. Reject malformed or unknown payload shapes where appropriate.
4. Sanitize user-controlled data before logging, persistence, or rendering.

## 4) Shared Security Baseline

1. Enforce secure configuration defaults from day one.
2. Use least-privilege credentials and scoped tokens.
3. Centralize secret handling and never hardcode sensitive values.
4. Redact secrets and sensitive fields from logs and telemetry.
5. Ensure production communication paths are secured (for example, HTTPS/TLS).

## 5) Shared Testing Baseline

1. Use Vitest as the baseline unit testing framework unless a platform-specific rule overrides this.
2. Keep deterministic unit tests with dependency isolation via mocks and stubs.
3. Follow consistent naming conventions (`*.spec.ts` preferred, `*.test.ts` accepted by team convention).
4. Apply AAA structure (Arrange, Act, Assert).
5. Maintain coverage gates for critical business and security paths.

## 6) Shared AI Output Quality Contract

When producing architecture blueprints:

1. Keep responses direct, technical, and highly scannable.
2. Use clear Markdown headers and flat bullet lists.
3. Explicitly call out allowed flow and forbidden shortcuts.
4. Separate shared definitions from platform-specific constraints.