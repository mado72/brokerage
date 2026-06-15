# AI Aesthetic Guardrails

Purpose:
Ensure all agents keep a consistent, content-first aesthetic across every screen and feature.

## Mandatory Workflow For Any Design/UI Task

1. Read spec/01-visual-direction.md before proposing layout or styles.
2. Read spec/02-design-system-rules.md before creating components.
3. Read spec/03-page-layout-guidelines.md before screen-level work.
4. Verify output against the Aesthetic QA Checklist in this file.

If any required spec is missing or ambiguous for the task, ask for clarification before implementation.

## Non-Negotiable Rules

1. Do not use generic startup/SaaS visual patterns by default.
2. Do not use loud accent colors for primary UI controls without explicit approval.
3. Do not reduce primary content prominence in favor of UI chrome.
4. Do not mix unrelated visual styles across screens.
5. Do not add decorative effects that compete with the user’s main task or content.

## Aesthetic QA Checklist (must pass)

- Content-first hierarchy is preserved above the fold.
- Typography style is consistent with the project’s visual direction.
- Spacing rhythm is generous and consistent.
- Button, border, and control styles match the defined palette.
- Filters, sort, and secondary controls are present but visually quiet.
- Mobile layout preserves hierarchy and breathing room.
- New sections look native to existing screens, not bolted-on.

## Consistency Enforcement

For every screen/component change, the agent must provide:
1. Which spec files were applied.
2. Which aesthetic rules were intentionally enforced.
3. Any deviation and reason.

## Conflict Resolution

If product or engineering constraints conflict with these guardrails:
1. Propose 2–3 alternatives that preserve aesthetic intent.
2. Do not implement the lowest-quality fallback without explicit approval.
