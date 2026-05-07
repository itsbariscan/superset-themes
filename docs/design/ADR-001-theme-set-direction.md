# ADR-001: Theme set direction — editorial mix of ports + originals

**Status:** Accepted — Position B locked 2026-05-07
**Gear used:** EXPAND — generate a real menu before curating, since "15+ themes" needs a creative direction, not just a count.

## Context

Building a 15+ theme library for superset.sh (AI-agent code editor). Native schema: top-level `id/name/type/author/description` + `ui` block (~30 tokens) + `terminal` block (16-color ANSI palette + cursor + selection). Distribution: GitHub repo + static preview site. Already have a Monokai-style base file as schema reference. Open question entering this session: what is this set's editorial position?

## Color pattern families surveyed

The recurring "schools" themes descend from:

1. **Pastel-mid** (Catppuccin, Rosé Pine) — desaturated mid-lights, warm dark base
2. **Neon-on-black** (Dracula, Tokyo Night, Synthwave) — high-saturation accents on near-black
3. **Earth/forest** (Gruvbox, Everforest, Kanagawa) — muted ochre/olive/clay
4. **Solarized math** — engineered luminance pairs; same accents on dark+light
5. **Monokai-class** — green primary, magenta destructive, brown-black bg
6. **Arctic / cool desaturated** (Nord, Vesper) — blue-grey, low chroma
7. **Paper / sepia** (Vellum, Flexoki) — warm white, ink black, restrained accent
8. **Material / true-blue** (One Dark, GitHub Dark) — cobalt-leaning IDE-default
9. **Warm gold dark** (Ayu, Noctis, Vitesse) — caramel/saffron on warm dark
10. **Brutalist mono** — black/white/grey + ≤1 accent
11. **Cyberpunk** — magenta + cyan + black
12. **Risograph / print** — fluorescent pink + soybean + cream (rare in code themes)

## Roster: ports worth considering

**Tier-1 obligatory (search recognition):** Dracula · Nord · Tokyo Night · Catppuccin (Mocha/Macchiato/Frappé/Latte) · Gruvbox (Dark/Light) · Solarized (Dark/Light) · Monokai Pro · One Dark/Light · Rosé Pine (Main/Moon/Dawn) · GitHub (Dark/Light)

**Tier-2 connoisseur:** Everforest · Kanagawa · Ayu · Synthwave '84 · Night Owl · Material Palenight · Flexoki · Vitesse · Poimandres · Vesper

## Original concepts proposed (20)

Each anchored to a physical reference — the antidote to "AI slop palettes."

**Industrial/material:** Hangar · Ferro · Foundry · Reactor · Slate Quarry
**Print/graphic:** Riso · Linotype · Bauhaus · Polaroid · Subway
**Paper/archive:** Vellum · Inkwell · Atlas · Field Notes
**Atmospheric/poetic:** Twilight Run · Velvet Rope · Kintsugi · Supernova · Console · Brutalist

(Full one-liner concepts in `.craft/context/design.md`.)

## Decision

**Editorial position B (LOCKED): 5–7 ports + 12–15 originals.**

| Position | Pro | Con |
|---|---|---|
| A. 15 classics ported | Familiar, search-friendly | Generic — nobody stars yet-another-port repo |
| **B. Editorial mix** | **Hooks via classics, differentiates via originals** | **Originals must hold the bar — any slop kills credibility** |
| C. 20+ originals only | Auteur position | No search hook; weak discovery |

**Variant policy:** light/dark variants only where the concept earns one. No forced pairs.

**Naming:** single-word, evocative, physical (Hangar, Vellum, Reactor). No "Dark/Light" suffixes. No animals.

## Consequences

**Enables:** A repo with editorial identity — recognizable in screenshots, harder to dismiss as derivative. Each original is its own marketing asset.

**Rules out:** Comprehensive coverage (anyone wanting 30+ ports goes elsewhere). Parametric/generated themes (every entry is hand-tuned).

## NOT in scope

(Inherited from `.craft/context/scope.md`.)

- No theme builder / editor UI
- No CLI installer or package
- No cross-product exports (VS Code, iTerm, etc.)
- No paid tier
- No backend on the preview site
- No Apache Superset (the BI tool) support

## Open questions (carried into `/plan`)

1. ~~Editorial position~~ — **B locked**
2. **Final 12–15 originals** from the 20 candidates (tentative cut: Hangar, Ferro, Reactor, Riso, Vellum, Inkwell, Atlas, Twilight Run, Console, Brutalist, Kintsugi, Supernova — 12)
3. **Final 5–7 ports** (rec: Dracula, Nord, Tokyo Night, Catppuccin Mocha, Gruvbox Dark, Solarized D+L pair, Rosé Pine — 7)
4. **Variant policy** — earn-it (rec, default)
5. **Preview site** — grid vs. hot-swap demo (rec: hot-swap)
6. **License** — MIT for originals; respect upstream license for ports
