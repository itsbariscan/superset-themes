# Contributing

Thanks for considering a contribution. This repo accepts:

1. **New original themes** — see "The bar" below
2. **New port themes** — only if licensing permits and the upstream is widely-used
3. **Bug fixes** — schema, validator, renderer, docs, anything else

The project is small and opinionated. The bar for new themes is intentionally high.

## The bar (originals)

Every original theme in this repo has a physical reference — Hangar = warehouse, Reactor = control room, Riso = print, Vellum = paper. The discipline that keeps the catalog from feeling generic is this: **if you can't draw the moodboard before opening a JSON file, the theme isn't ready**.

A new original needs:

1. **A moodboard at `docs/moodboards/<slug>.md`** with:
   - Concept (one paragraph)
   - Anchor references (named — not "vibes" but specific things: a photo, a place, a material)
   - Anchor colors (5–6 named hexes you'd sample from the reference)
   - Mood checklist (3–5 bullets — what it favors and what it avoids)
2. **A theme JSON at `themes/originals/<slug>.json`** matching `packages/schema/superset-theme.schema.json`
3. **Validation passes** — `bun run check` returns green
4. **Visual review** — load `bun run dev` and confirm the theme reads coherent in the renderer

Themes that are "just colors I like" are not the goal here. If a reviewer can't tell what physical reference inspired a theme from looking at it, that's a signal it isn't anchored enough.

### Banned palette patterns

- AI-generated parametric palettes (we tune by hand, not by sliders)
- Pure-black backgrounds (`#000000`) — pick a tone with intent
- Pure-white backgrounds (`#ffffff`) on light themes — same reason
- Dracula clones with one color shifted (be original or port the actual theme)

## The bar (ports)

A port goes in `themes/ports/<slug>/` as a folder containing:

1. **`<slug>.json`** — the theme, hex values matching the canonical upstream spec as closely as the schema allows
2. **`LICENSE`** — verbatim copy of the upstream's license file
3. **`ATTRIBUTION.md`** — link to upstream, statement of mapping decisions, citation of any deviations from canonical

If the upstream license forbids redistribution or imposes constraints (e.g. naming, branding), respect them. When in doubt, open an issue first.

## Workflow

```bash
# Fork + clone, then:
bun install
bun run check        # validate schema + WCAG-AA contrast
bun run dev          # preview at http://localhost:4321
bun run screenshots  # regenerate per-theme OG images (needs dev server running)
```

Open a PR with:
- The theme JSON
- The moodboard (originals only) or LICENSE + ATTRIBUTION.md (ports only)
- A regenerated screenshot in `apps/site/public/og/<slug>.png`
- A one-line addition to README's catalog table
- A CHANGELOG entry under `## [Unreleased]`

## Validation rules enforced by `bun run check`

- **Schema**: every required token present; color values match a CSS-color regex; ID is kebab-case
- **WCAG-AA contrast** on four critical pairs:
  - `foreground / background` ≥ 4.5:1 (body text)
  - `cardForeground / card` ≥ 4.5:1 (card text)
  - `popoverForeground / popover` ≥ 4.5:1 (popover text)
  - `primaryForeground / primary` ≥ 3:1 (button label, large-text rule)

If a theme fails, the check tells you which pair and the actual ratio. Fix the JSON, re-run, repeat.

## Reference docs

- [`docs/TOKENS.md`](./docs/TOKENS.md) — what each UI + terminal token controls
- [`docs/RENDERER_FIDELITY.md`](./docs/RENDERER_FIDELITY.md) — how superset.sh actually applies these tokens (validated against upstream source)
- [`docs/SCHEMA_VERSION.md`](./docs/SCHEMA_VERSION.md) — schema pinning to upstream + drift policy
- [`docs/design/ADR-001-theme-set-direction.md`](./docs/design/ADR-001-theme-set-direction.md) — why this set is editorial-mix not comprehensive-port

## Code of conduct

Be kind. Be specific. Critique themes, not authors. Don't ship slop.
