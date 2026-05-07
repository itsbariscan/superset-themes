# Renderer fidelity

This doc captures **superset.sh's exact theme behavior** — sourced from the open-source repo at [superset-sh/superset](https://github.com/superset-sh/superset), not inferred from screenshots.

Key files in the upstream:
- [`apps/desktop/src/shared/themes/types.ts`](https://github.com/superset-sh/superset/blob/main/apps/desktop/src/shared/themes/types.ts) — schema interfaces
- [`apps/desktop/src/shared/themes/editor-theme.ts`](https://github.com/superset-sh/superset/blob/main/apps/desktop/src/shared/themes/editor-theme.ts) — derivation logic for editor + syntax colors
- [`apps/desktop/src/shared/themes/import.ts`](https://github.com/superset-sh/superset/blob/main/apps/desktop/src/shared/themes/import.ts) — import validator (Zod schema, ID normalization, reserved IDs)
- [`apps/desktop/src/shared/themes/built-in/`](https://github.com/superset-sh/superset/tree/main/apps/desktop/src/shared/themes/built-in) — the three built-in themes (dark, light, monokai)

## Schema (per upstream `types.ts`)

The complete `Theme` shape:

```ts
interface Theme {
  id: string;
  name: string;
  type: "dark" | "light";
  author?: string;
  version?: string;
  description?: string;
  ui: UIColors;          // 38 tokens (3 are optional: highlight, highlightForeground)
  terminal?: TerminalColors;  // 22 tokens (cursorAccent, selectionBackground, selectionForeground are optional)
  editor?: EditorThemeOverrides;  // optional — partial overrides for derived editor + syntax colors
  isBuiltIn?: boolean;
  isCustom?: boolean;
}
```

**The validator** (Zod, see `import.ts`) is *highly permissive* — every UI / terminal field is optional, top-level `type` defaults to `"dark"`, and the schema uses `.passthrough()` so unknown fields are tolerated. It also accepts `colors` as a legacy alias for `terminal`.

**Our schema** (`packages/schema/superset-theme.schema.json`) is *intentionally stricter* than upstream — we require `id`, `name`, `type`, `ui`, `terminal` so typos and incomplete themes can't slip through. That divergence is by design.

## Reserved theme IDs

Per `import.ts`, IDs that collide with these are rejected at import time:

```
system, dark, light, monokai
```

(plus any future built-in themes added upstream). Our roster: `dracula`, `nord`, `solarized-dark`, `solarized-light`, `tokyo-night`, `catppuccin-mocha`, `gruvbox-dark`, `rose-pine`, `hangar`, `vellum`, `console`, `ferro`, `reactor`, `riso`, `inkwell`, `atlas`, `twilight-run`, `brutalist`, `kintsugi`, `supernova` — none collide.

ID normalization (also in `import.ts`): IDs are lowercased and any `[^a-z0-9]+` runs become `-`, with leading/trailing `-` stripped. So `Tokyo Night` would normalize to `tokyo-night`. Our IDs already match the normalized form.

## Editor + syntax derivation

When a theme provides only `ui` + `terminal` blocks (no `editor` block), superset.sh derives editor + syntax colors via this exact logic from `editor-theme.ts`:

### Editor colors

| Editor token | Derived from |
|---|---|
| `background` | `ui.background` |
| `foreground` | `ui.foreground` |
| `border` | `ui.border` |
| `cursor` | `terminal.cursor` ?? `ui.foreground` |
| `gutterBackground` | `ui.background` |
| `gutterForeground` | `ui.mutedForeground` |
| `activeLine` | `withAlpha(ui.accent, 0.5)` |
| `selection` | `terminal.selectionBackground` ?? `withAlpha(ui.primary, 0.28 dark / 0.18 light)` |
| `search` | `ui.highlightMatch` |
| `searchActive` | `ui.highlightActive` |
| `panel` | `ui.card` |
| `panelBorder` | `ui.border` |
| `panelInputBackground` | `ui.background` |
| `panelInputForeground` | `ui.foreground` |
| `panelInputBorder` | `ui.input` |
| `panelButtonBackground` | `ui.secondary` |
| `panelButtonForeground` | `ui.secondaryForeground` |
| `panelButtonBorder` | `ui.border` |
| `diffBuffer` | `ui.tertiary` |
| `diffHover` | `ui.accent` |
| `diffSeparator` | `ui.border` |
| `addition` | dark: `terminal.brightGreen`; light: `terminal.green`; fallback: `ui.chart2` |
| `deletion` | dark: `terminal.brightRed`; light: `terminal.red`; fallback: `ui.destructive` |
| `modified` | dark: `terminal.brightBlue`; light: `terminal.blue`; fallback: `ui.chart3` |

### Syntax colors

| Syntax category | Source token (terminal) | Fallback (ui) |
|---|---|---|
| `plainText` | — | `foreground` |
| `comment` | `brightBlack` | `mutedForeground` |
| `keyword` | `magenta` | `primary` |
| `string` | `green` | `chart2` |
| `number` | `yellow` | `chart4` |
| `functionCall` | `blue` | `chart3` |
| `variableName` | — | `foreground` |
| `typeName` | `cyan` | `chart3` |
| `className` | `yellow` | `chart4` |
| `constant` | `cyan` | `chart5` |
| `regexp` | `red` | `destructive` |
| `tagName` | `red` | `chart1` |
| `attributeName` | `yellow` | `chart4` |
| `invalid` | `brightRed` | `destructive` |

**Implications for theme authors:**

1. The `terminal` block is **load-bearing** for code legibility. If your theme is meant for code-heavy use, tune `terminal.magenta`, `terminal.green`, `terminal.yellow`, `terminal.blue`, `terminal.cyan`, `terminal.red`, and `terminal.brightBlack` to be hue-distinct AND saturated against `terminal.background`.
2. `chart1–5` are **fallbacks only** — they're consulted *only* when `terminal` is omitted entirely. With `terminal` provided, charts and syntax are completely independent.
3. **Diff colors**: in dark themes, `terminal.brightGreen` / `brightRed` / `brightBlue` drive additions / deletions / modifications. In light themes, the non-bright variants are used. If you're tuning a dark theme, keep your bright-* terminal values noticeably brighter than their base counterparts.

## Confirmed via real-app self-test (7 themes imported)

Validated 2026-05-07 by importing **Dracula, Hangar, Nord, Riso, Reactor, Atlas, Twilight Run** into the real superset.sh app and comparing rendered output to the JSON values. Coverage now spans 6 dark themes + 1 light theme, with palettes ranging from neon (Dracula/Riso) to monochromatic (Reactor) to muted-cartographic (Atlas) — every one renders faithful to its JSON.

- **Status lines / hint text** (e.g. `▶▶ bypass permissions on (shift+tab to cycle)` in the agent terminal) use `terminal.magenta`. Validated across all 7 themes:
  - Dracula `#ff79c6` (saturated pink) — reads bright pink
  - Riso `#ff5290` (fluorescent pink) — reads vivid pink
  - Hangar `#a85a3a` (copper) — reads rust/copper
  - Nord `#b48ead` (Aurora purple) — reads lavender
  - Reactor `#9870b5` (cool purple) — reads muted lavender on dark navy
  - Twilight Run `#a07cd4` (warm purple) — reads soft purple on navy
  - Atlas `#6e5294` (deep purple) — reads as muted salmon on cream (background interaction)

  **Authoring takeaway:** `terminal.magenta` is load-bearing for status messages, not just keyword highlighting. Pick a value that reads well for both — generally a warm-toned magenta with enough saturation to be legible against `terminal.background`.
- **Active sidebar row is subtle**, *not* full `sidebarPrimary`. In all four imports, the highlighted row in the Workspaces sidebar (and the Settings sidebar) appears as a barely-distinct treatment — likely `sidebarAccent` or `accent` for the row background, with `sidebarPrimary` reserved for indicator pixels (left border, status dot, or active-text color). Theme authors should NOT rely on `sidebarPrimary` being the dominant color of an active row.
- **Diff stats next to workspace rows** (e.g. `+5042 -149`) use `terminal.brightGreen` / `terminal.brightRed` in dark themes and `terminal.green` / `terminal.red` in light themes — exactly the source-derivation rule for `editor.addition` / `editor.deletion`.
- **Chrome stays "quiet"** in all four imports — the page mostly shows `background` + `foreground`, with palette accents only on small surfaces (badges, the Open pill, status text). This is a strong argument for `terminal.*` being the load-bearing block for character: most of what the user sees is the terminal palette, not the chart palette.

## Still fuzzy

- **Workspace team / project tag colors** ("BT" badge, "S" "W" workspace icons): each takes a different warm-leaning hue per theme. Hangar shows orange (likely `chart4 = #e6c34c` or `primary`), Nord shows salmon (likely `terminal.brightRed = #bf616a`), Riso shows pale yellow (likely `terminal.brightYellow = #f8c93b`). Unconfirmed — but staying within `chart4` or the warm side of the terminal palette would make it predictable.
- **Object property keys (`id:`, `query:` in JSON literals)**: Astro screenshots showed cyan, suggesting they bind to `typeName` / `constant` (both → `terminal.cyan`). Not yet directly verified in superset.sh's editor view.
- **Theme dropdown indicator dot**: small colored dot next to each theme name in the Settings dropdown. Cosmetic, not blocking.

## Authoring guidance derived from this

| If you want… | Tune… |
|---|---|
| Snappy, readable code | `terminal.magenta` (keywords), `terminal.green` (strings), `terminal.yellow` (numbers), `terminal.blue` (functions), `terminal.cyan` (types) — make sure each is distinct in hue and ≥ 4.5:1 against `terminal.background` |
| Comments that aren't shouty | `terminal.brightBlack` should be a *low-contrast* mute (~3:1 on `background`), not the same dark as the bg |
| Search highlights that pop | `ui.highlightMatch` (subtle, alpha) and `ui.highlightActive` (more opaque) |
| Faithful diff coloring (dark themes) | `terminal.brightGreen` / `brightRed` / `brightBlue` should be perceptibly brighter than the base variants — not duplicates |
| Faithful diff coloring (light themes) | `terminal.green` / `red` / `blue` are used as-is; bright variants only matter in dark mode |

## Recording new drift

When you spot a discrepancy in superset.sh that isn't explained by the source-derived rules above, photograph both surfaces and add a row.

| Theme | Surface | Renderer | superset.sh | Suspected token |
|---|---|---|---|---|
| Ferro | code syntax overall | feels balanced | feels muted (subdued terminal palette by design) | `terminal.*` (working as intended; doc'd as character note) |
| (all dark) | active sidebar row | uses `sidebarPrimary` boldly | very subtle, likely `sidebarAccent` | renderer over-weights `sidebarPrimary` — could be tuned down to match real behavior |
