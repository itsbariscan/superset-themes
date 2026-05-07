# ADR-002: Distribution strategy — standalone repo first, marketplace PR later

**Status:** Accepted — 2026-05-07
**Gear used:** HOLD — finite option set, stress-test the right one

## Context

`superset-sh/superset` ships an in-app marketplace at `apps/marketing/public/marketplace/themes/` with a `themeListings: ThemeListing[]` registry in `apps/marketing/src/lib/marketplace.ts`. As of 2026-05-07 it contains 8 entries — all ports (Catppuccin family, ember, github-dark-colorblind, monokai-classic, one-dark-pro). Submissions go via fork → PR → maintainer review, with `submittedBy: "<handle>"` credit.

The question: should `itsbariscan/superset-themes` exist as a standalone repo, submit upstream into the marketplace, or both?

## Decision

**Phase 1 (immediate): ship `itsbariscan/superset-themes` standalone.**
- Full 20-theme catalog
- GitHub Pages preview site with hot-swap demo
- Canonical home, source of truth for tooling + schema validation

**Phase 2 (~1–2 weeks after Phase 1 lands): curated marketplace PR for the 12 originals.**
- Single PR to `superset-sh/superset`
- Skips ports (most exist upstream or are commodity content elsewhere)
- Each `themeListings` entry credits `submittedBy: "itsbariscan"` and `source.href` links back to standalone repo's raw JSON
- One-paragraph PR description with reference to `itsbariscan/superset-themes`

**Phase 3: not planned.** Individual ports submitted only if maintainers request them.

## Consequences

**Enables:**
- Ship velocity — standalone repo not gated by upstream review
- Editorial integrity — the 12 originals stay together as a set with a coherent thesis; not cherry-picked into a marketplace where they're isolated
- Brand attribution — the standalone repo is the recognizable "home" and the marketplace listings point back to it
- Hot-swap demo can ship (the marketplace listing format only stores ~9 UI tokens + 9 terminal tokens for previews, not the full schema)
- Lower friction for fixes — one PR to standalone, no synchronization with upstream until next batch
- Moodboard discipline — the upstream marketplace has no concept of "anchored to a physical reference"; standalone keeps that bar

**Rules out:**
- Day-1 in-app distribution. Users have to find the standalone repo.
- Tight sync with upstream releases (marketplace versions may lag standalone updates by weeks).

## NOT in scope

- Submitting all 20 themes upstream
- Removing themes from standalone after upstream merges them
- Sub-licensing or relicensing for the marketplace submission

## Conflicts to handle in Phase 2

- **Catppuccin Mocha** is already in upstream marketplace — skip from submission (we have it in standalone for parity, but it would just duplicate upstream).
- **Solarized D+L, Dracula, Nord, Tokyo Night, Gruvbox Dark, Rosé Pine** — not currently upstream but widely-ported elsewhere. If we submit ports at all, these would be the candidates, but it's optional.

## Open questions

- Final answer on whether Phase 3 (individual port PRs) is worth doing, or if standalone discoverability is enough. Decide after Phase 2 lands and we have signal on marketplace traffic.
- Whether to use `source.href` pointing to `raw.githubusercontent.com/itsbariscan/superset-themes/...` (single source of truth) or duplicate the JSON into upstream (current convention based on how existing themes are stored). Lean toward duplication for convention compliance.
