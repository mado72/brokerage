# Copilot Project Instructions

Instructions for GitHub Copilot and other AI assistants working in the finfor monorepo.

Primary rule: treat the `/spec` folder as the source of truth. See `spec/README.md` for the full index.

Cursor agents: rules are imported in `.cursor/rules/` (`finfor-core.mdc` and task-specific rules). `AGENTS.md` at the repo root defines the same mandatory reading order.

If implementation ideas conflict with a spec document, update the spec first or follow the spec — do not bypass it silently.

## Context7 usage (required)

For any task involving external libraries, frameworks, APIs, or setup instructions:

1. Resolve the library ID with `mcp_context7_resolve-library-id`.
2. Retrieve up-to-date docs with `mcp_context7_get-library-docs` before proposing code.
3. Prefer official sources and version-specific docs when a version is provided.
4. Base implementation decisions on fetched documentation, not assumptions.

Apply this workflow to backend (`apps/backend`) and frontend (`apps/frontend`) changes whenever third-party dependencies are involved.

## Monorepo scope

| Workspace | Role |
|-----------|------|
| `apps/backend` | Node.js 24 + Fastify API |
| `apps/frontend` | React 19.2.3 + Expo SDK 56 client |
| `spec/` | Engineering, UX, and product guidelines |

Do not duplicate rules from spec files in this document. Link to the canonical spec for each task type.

## Canonical specs by task type

### Architecture (cross-cutting)

Use `spec/00-shared-architecture-directives.md` for layering, validation, security baseline, and shared testing rules.

### Backend architecture

Use `spec/05-backend-architecture-directives.md` for Node.js 24 + npm 11 backend structure, security patterns, and dependency stack.

### Frontend architecture

Use `spec/06-frontend-architecture-directives.md` for React 19.2.3 + Expo SDK 56 structure, Expo Router, actions API, and client security.

### Testing

Use `spec/07-monorepo-testing-strategy.md` for test layers, folder conventions, CI execution order, and rollout phases.

Before adding tests, state the target layer (unit, integration, component, contract, or e2e) and what is mocked vs real.

### UI, layout, and styling

For any visual or screen-level work, read in order:

1. `spec/01-visual-direction.md`
2. `spec/02-design-system-rules.md`
3. `spec/03-page-layout-guidelines.md`
4. `spec/04-ai-aesthetic-guardrails.md` — enforce the aesthetic QA checklist

Do not break the content-first visual direction defined in those files.

### Product features and domain modeling

Use `spec/08-product-requirements.md` for scope, user journeys, entities, and acceptance criteria.

When a feature changes product scope or domain rules, update `08-product-requirements.md` in the same change set (or in a preceding spec PR).

## Conflict and deviation policy

1. Spec documents win over ad-hoc suggestions.
2. For UI work, document which spec files were applied and any intentional deviation.
3. If engineering constraints conflict with aesthetic guardrails, propose alternatives that preserve intent before implementing a degraded fallback.

## CI expectations

Pull requests should pass the workflow in `.github/workflows/ci.yml`:

1. Typecheck (all workspaces)
2. Unit tests
3. Backend integration tests
4. Frontend component tests

Align new tests with `spec/07-monorepo-testing-strategy.md`. Contract and E2E suites are planned per that spec but are not yet required in CI.
