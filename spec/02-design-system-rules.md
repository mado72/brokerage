# Design System Rules

## Layout System

Desktop container:
- Use a centered content container with generous horizontal padding.
- Keep consistent max-width across major screens.

Vertical rhythm:
- Large spacing between major sections.
- Moderate spacing between heading and content blocks.
- Tight spacing only for metadata inside cards or list rows.

Grid patterns:
- Collection/list views: multi-column, image- or content-led grids on desktop; 1–2 columns on mobile.
- Catalog or shop-style listings: 2–3 columns depending on card aspect ratio.
- Multi-step flows: horizontal step cards on desktop, stacked on mobile.

## Navigation

Header behavior:
- Clean top nav with a restrained number of primary links.
- Brand or app identity on the left; primary nav center or right.
- Utility actions (search, menu, account) remain minimal on the far edge.

Navigation style:
- No heavy backgrounds or oversized controls.
- Keep nav legible and consistent at all breakpoints.

## Card and List Blocks

Default card hierarchy:
1. Media or icon (when applicable)
2. Title
3. Type, category, or metadata
4. Status, price, or summary
5. Primary action (CTA)

Card style:
- Minimal border/noise
- Light separators
- Soft button styling

CTA style:
- Neutral filled or outlined buttons aligned with the palette
- No bright promotional button colors unless explicitly approved for campaigns

## Components

Use these component categories consistently (rename in code to match the product, keep the roles):
- SectionHeader (title + optional subtitle)
- FilterTabs
- SortControl
- ContentCard (generic list/grid item)
- ProductCard (commerce or catalog item when needed)
- FeatureBanner
- StepCard (multi-step or onboarding flows)
- FormBlock (contact, settings, or data entry)

## Motion and Interaction

Allowed motion:
- Soft fade-in
- Slight scale on hover for interactive media cards
- Gentle underline/opacity transitions on nav and filters

Avoid:
- Bouncy motion
- Aggressive parallax
- Distracting animated backgrounds

## Responsive Behavior

Mobile priorities:
1. Preserve primary content prominence
2. Keep typography readable
3. Maintain comfortable tap targets (minimum ~44px where possible)
4. Stack sections without losing hierarchy

Rules:
- Convert multi-column grids to 1–2 columns cleanly.
- Keep headers sticky only if they remain visually light.
- Maintain section spacing; do not collapse into cramped blocks.
