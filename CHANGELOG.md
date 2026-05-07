# Changelog

All notable changes to this project will be documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] — 2026-05-07

Initial release: 20 themes for [superset.sh](https://superset.sh).

### Added

- **8 ports** of beloved classics, each with verbatim upstream LICENSE + ATTRIBUTION.md:
  - Catppuccin Mocha
  - Dracula
  - Gruvbox Dark (medium contrast)
  - Nord
  - Rosé Pine (Main variant)
  - Solarized Dark
  - Solarized Light
  - Tokyo Night (Night variant)
- **12 originals**, each anchored to a physical reference with a moodboard:
  - Atlas (light) — old map atlas
  - Brutalist (dark) — concrete + single accent
  - Console (dark) — P1-phosphor CRT
  - Ferro (dark) — blacksmith's forge
  - Hangar (dark) — working warehouse
  - Inkwell (light) — fountain pen on bone paper
  - Kintsugi (dark) — black lacquer + gold seam
  - Reactor (dark) — Cherenkov-blue cooling pool
  - Riso (light) — risograph print
  - Supernova (dark) — Hubble narrowband
  - Twilight Run (dark) — pre-dawn navy + sodium orange
  - Vellum (light) — cream paper, deep ink, sepia
- **JSON Schema** validating the superset.sh theme shape (`packages/schema/superset-theme.schema.json`), with TypeScript type definitions
- **Validation tooling** (`tools/validate.ts`, `tools/contrast.ts`) — Ajv schema check + WCAG-AA contrast on body / card / popover (≥ 4.5:1) and large-text on button labels (≥ 3:1)
- **Astro 5 preview site** (`apps/site/`) with hot-swap demo, per-theme detail pages, full UI + terminal mock surfacing every token
- **Screenshot generator** (`tools/screenshot.ts`) — Playwright-driven, produces 1200×630 OG images for every theme
- **GitHub Pages workflow** (`.github/workflows/deploy.yml`) — auto-deploys the preview site on push to `main`
- **Docs**:
  - `docs/TOKENS.md` — what each token controls
  - `docs/RENDERER_FIDELITY.md` — exact derivation rules sourced from upstream `editor-theme.ts`, validated against 7 real-app imports
  - `docs/SCHEMA_VERSION.md` — schema pinning + drift policy
  - `docs/design/ADR-001-theme-set-direction.md` — the editorial-mix decision (5–7 ports + 12–15 originals)
  - `docs/moodboards/` — physical-reference moodboards for all 12 originals
- `CONTRIBUTING.md` with the bar for new themes (originals must come from a moodboard)
