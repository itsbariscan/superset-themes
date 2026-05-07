# superset-themes

[![License: MIT](https://img.shields.io/badge/License-MIT-9933ee.svg)](./LICENSE)
[![Themes](https://img.shields.io/badge/themes-20-2cb4e8)](#catalog)
[![For superset.sh](https://img.shields.io/badge/for-superset.sh-ff6b1a)](https://superset.sh)
[![Validated](https://img.shields.io/badge/validation-WCAG--AA%20%2B%20schema-success)](./docs/RENDERER_FIDELITY.md)

> 20 hand-tuned themes for [superset.sh](https://superset.sh) — the AI-agent code editor. 8 ports of beloved classics + 12 originals, each anchored to a physical reference (warehouse, forge, control room, riso print, paper, …).

<p align="center">
  <img src="apps/site/public/og/_hero.png" alt="The full superset-themes catalog: 8 ports + 12 originals" width="100%" />
</p>

## Why this exists

When superset.sh launched, the marketplace shipped with three built-in themes (Dark, Light, Monokai) and very few third-party options. This repo fills that gap with a curated set — heavy on character, no AI-slop palettes.

## Install

1. Pick a theme below and click its name to open the JSON file
2. On GitHub, click **Raw** and **save the page** as `<theme>.json`
3. In superset.sh: **Settings → Appearance → Custom themes → Import**
4. Activate from the theme grid

## Catalog

### Originals (12)

| | Theme | Type | Concept |
|---|---|---|---|
| <img src="apps/site/public/og/atlas.png" width="160" /> | **[Atlas](./themes/originals/atlas.json)** | light | Old map atlas — faded teal water, dust-rose place names, mountain-shadow brown |
| <img src="apps/site/public/og/brutalist.png" width="160" /> | **[Brutalist](./themes/originals/brutalist.json)** | dark | Concrete-and-glass discipline — black, white, three greys + one red |
| <img src="apps/site/public/og/console.png" width="160" /> | **[Console](./themes/originals/console.json)** | dark | 1980s P1-phosphor CRT — phosphor green on near-black, after midnight |
| <img src="apps/site/public/og/ferro.png" width="160" /> | **[Ferro](./themes/originals/ferro.json)** | dark | Blacksmith's forge at first light — cold steel meets hot embers |
| <img src="apps/site/public/og/hangar.png" width="160" /> | **[Hangar](./themes/originals/hangar.json)** | dark | Working warehouse — concrete grey, safety orange, diesel yellow |
| <img src="apps/site/public/og/inkwell.png" width="160" /> | **[Inkwell](./themes/originals/inkwell.json)** | light | Fountain-pen blue ink on bone-white paper — long-form essayist's draft |
| <img src="apps/site/public/og/kintsugi.png" width="160" /> | **[Kintsugi](./themes/originals/kintsugi.json)** | dark | Black lacquer mended with gold dust — the repair as the point |
| <img src="apps/site/public/og/reactor.png" width="160" /> | **[Reactor](./themes/originals/reactor.json)** | dark | Cooling pool inside a research reactor — Cherenkov blue, uranium yellow |
| <img src="apps/site/public/og/riso.png" width="160" /> | **[Riso](./themes/originals/riso.json)** | light | Risograph print — fluorescent pink, soybean yellow, federal blue on cream |
| <img src="apps/site/public/og/supernova.png" width="160" /> | **[Supernova](./themes/originals/supernova.json)** | dark | Hubble narrowband — deep space, nebula magentas, OIII teal |
| <img src="apps/site/public/og/twilight-run.png" width="160" /> | **[Twilight Run](./themes/originals/twilight-run.json)** | dark | Pre-dawn navy meets sodium-vapor orange — a single moment |
| <img src="apps/site/public/og/vellum.png" width="160" /> | **[Vellum](./themes/originals/vellum.json)** | light | Cream paper, deep ink, sepia accent — typography-first light theme |

### Ports (8)

| | Theme | Type | Source |
|---|---|---|---|
| <img src="apps/site/public/og/catppuccin-mocha.png" width="160" /> | **[Catppuccin Mocha](./themes/ports/catppuccin-mocha/catppuccin-mocha.json)** | dark | [Catppuccin Org](https://github.com/catppuccin/catppuccin) (Mocha flavor) |
| <img src="apps/site/public/og/dracula.png" width="160" /> | **[Dracula](./themes/ports/dracula/dracula.json)** | dark | [Zeno Rocha + contributors](https://draculatheme.com) |
| <img src="apps/site/public/og/gruvbox-dark.png" width="160" /> | **[Gruvbox Dark](./themes/ports/gruvbox-dark/gruvbox-dark.json)** | dark | [Pavel Pertsev](https://github.com/morhetz/gruvbox) (medium contrast) |
| <img src="apps/site/public/og/nord.png" width="160" /> | **[Nord](./themes/ports/nord/nord.json)** | dark | [Sven Greb](https://www.nordtheme.com) |
| <img src="apps/site/public/og/rose-pine.png" width="160" /> | **[Rosé Pine](./themes/ports/rose-pine/rose-pine.json)** | dark | [Rosé Pine team](https://rosepinetheme.com) (Main variant) |
| <img src="apps/site/public/og/solarized-dark.png" width="160" /> | **[Solarized Dark](./themes/ports/solarized/solarized-dark.json)** | dark | [Ethan Schoonover](https://ethanschoonover.com/solarized) |
| <img src="apps/site/public/og/solarized-light.png" width="160" /> | **[Solarized Light](./themes/ports/solarized/solarized-light.json)** | light | [Ethan Schoonover](https://ethanschoonover.com/solarized) |
| <img src="apps/site/public/og/tokyo-night.png" width="160" /> | **[Tokyo Night](./themes/ports/tokyo-night/tokyo-night.json)** | dark | [Enkia + contributors](https://github.com/enkia/tokyo-night-vscode-theme) |

## Live preview

**[itsbariscan.github.io/superset-themes](https://itsbariscan.github.io/superset-themes/)** — full catalog with a hot-swap demo. Pick any theme from the dropdown and the entire page re-skins instantly.

Or run locally:

```bash
bun install
bun run dev
# http://localhost:4321
```

## Authoring

Want to fork a theme or contribute a new one?

```bash
bun run check        # validate schema + WCAG-AA contrast on critical pairs
bun run dev          # preview site
bun run screenshots  # regenerate per-theme OG images (needs dev server running)
```

Reference docs:
- [`docs/TOKENS.md`](./docs/TOKENS.md) — what each UI + terminal token controls
- [`docs/RENDERER_FIDELITY.md`](./docs/RENDERER_FIDELITY.md) — exact derivation rules for editor + syntax colors, validated against the [upstream source](https://github.com/superset-sh/superset)
- [`docs/SCHEMA_VERSION.md`](./docs/SCHEMA_VERSION.md) — schema pinning + drift policy
- [`docs/moodboards/`](./docs/moodboards/) — physical references for each original (the bar for new originals)

Originals must be drawn from a physical reference — if you can't sketch the moodboard before opening JSON, the theme isn't ready.

## License

- Tooling, preview site, and originals under [`themes/originals/`](./themes/originals/): **MIT** (see [LICENSE](./LICENSE))
- Themes under [`themes/ports/`](./themes/ports/): derivative works retaining their upstream licenses, reproduced verbatim per subfolder with attribution in `ATTRIBUTION.md`

---

Built by [@itsbariscan](https://github.com/itsbariscan).
