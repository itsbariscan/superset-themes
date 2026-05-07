# Theme tokens — what each one controls

Every superset.sh theme JSON has two blocks: `ui` (~38 tokens) and `terminal` (21 tokens). All values are CSS color strings (`#rrggbb`, `#rrggbbaa`, or `rgba()`). Missing values fall back to superset.sh defaults for the chosen `type` (`dark` or `light`) — but the renderer in `apps/site` does **not** fall back, so authors should set every token they care about.

The renderer surfaces every token visibly. If you change a token and nothing in the preview moves, it's either unused on this surface or your value matches the previous one.

---

## UI tokens

### Surfaces

| Token | What it controls |
|---|---|
| `background` | Page background (the editor pane behind code) |
| `foreground` | Default body / code text on `background` |
| `card` | Floating card container background (e.g. terminal header strip in the renderer) |
| `cardForeground` | Text on `card` surfaces |
| `popover` | Popover/dialog background (the Quick Command panel) |
| `popoverForeground` | Text on `popover` surfaces |

### Action / state

| Token | What it controls |
|---|---|
| `primary` | Primary action color (Run button, active tab underline, ring of focused inputs) |
| `primaryForeground` | Text on `primary` |
| `secondary` | Secondary surface (tab bar background, secondary button) |
| `secondaryForeground` | Text on `secondary` |
| `muted` | Muted surface (less-prominent backgrounds) |
| `mutedForeground` | Muted body text (line numbers, descriptions, sidebar headings) |
| `accent` | Active-row highlight inside popovers/menus |
| `accentForeground` | Text on `accent` |
| `tertiary` | Tertiary surface (kbd chips) |
| `tertiaryActive` | Active state of tertiary surfaces |
| `destructive` | Destructive action (Stop button, error dot, error log lines) |
| `destructiveForeground` | Text on `destructive` |

### Form / focus

| Token | What it controls |
|---|---|
| `border` | Default border (cards, popovers, terminal frame) |
| `input` | Input field background |
| `ring` | Focus ring (input focus glow, cursor color) |

### Sidebar

| Token | What it controls |
|---|---|
| `sidebar` | Sidebar background |
| `sidebarForeground` | Default sidebar text |
| `sidebarPrimary` | Active-item background in sidebar (the highlighted file row) |
| `sidebarPrimaryForeground` | Text on `sidebarPrimary` |
| `sidebarAccent` | Hover background of sidebar items |
| `sidebarAccentForeground` | Text on `sidebarAccent` |
| `sidebarBorder` | Sidebar border + divider lines |
| `sidebarRing` | Focus ring for sidebar interactive elements |

### Charts

| Token | What it controls |
|---|---|
| `chart1` | Data series 1 / numeric literals in code |
| `chart2` | Data series 2 / string literals in code |
| `chart3` | Data series 3 / function names in code |
| `chart4` | Data series 4 / property names in code |
| `chart5` | Data series 5 / keywords in code |

These five colors should be **distinct in hue** and roughly equal in saturation/brightness so the chart row doesn't favor any one series.

### Highlights

| Token | What it controls |
|---|---|
| `highlightMatch` | Inactive search match band (translucent — use `rgba()`) |
| `highlightActive` | Active search match band (translucent, more opaque than match) |
| `highlight` | Solid highlight color (selected text background outside search) |
| `highlightForeground` | Text on `highlight` |

---

## Terminal tokens

The terminal block is the standard 16-color ANSI palette plus three application tokens.

| Token | What it controls |
|---|---|
| `background` | Terminal pane background |
| `foreground` | Default text in terminal |
| `cursor` | Block cursor color |
| `cursorAccent` | Text/character color when overlapping the cursor block |
| `selectionBackground` | Selected-text background (translucent — use `rgba()`) |

### ANSI palette (8 + 8 bright)

| Token | Standard role |
|---|---|
| `black` / `brightBlack` | Background, dark text, dim foreground |
| `red` / `brightRed` | Errors, destructive |
| `green` / `brightGreen` | Success, paths |
| `yellow` / `brightYellow` | Warnings, modified |
| `blue` / `brightBlue` | Info, keywords, paths |
| `magenta` / `brightMagenta` | Special, keywords, prompts |
| `cyan` / `brightCyan` | Hosts, types, data |
| `white` / `brightWhite` | Default light text |

The 16-color block in `TerminalMock` displays each color in order — `black, red, green, yellow, blue, magenta, cyan, white` then the `bright*` row. Use this row to sanity-check your palette has hue variety and the `bright*` versions are clearly lighter/lift from the base.

---

## Authoring guidance

1. **Anchor first.** Pick the physical reference (warehouse, forge, paper, riso print) before opening JSON. Sample 3–5 anchor colors from a reference image.
2. **Type before tokens.** Set `type: dark` or `type: light` first; the rest of the choices follow from this.
3. **Background → foreground → primary.** Lock these three first. Everything else flows from their relationships.
4. **Sidebar can diverge.** Don't reflexively copy `background` into `sidebar` — many strong themes use a slightly darker (or warmer) sidebar to create depth.
5. **Charts last.** Pick chart1–5 to maximize hue separation, not to match any other surface.
6. **Run validators.** `bun run check` runs schema + WCAG-AA contrast on the four critical pairs (`foreground/background`, `primaryForeground/primary`, `cardForeground/card`, `popoverForeground/popover`). Fix any failures before committing.

## Authoring workflow

```bash
# 1. Copy the reference as a starting point
cp themes/originals/_reference.json themes/originals/<slug>.json

# 2. Edit metadata (id, name, type, author, description) and tune tokens

# 3. Validate + check contrast
bun run check

# 4. Visually inspect in the renderer
bun run dev
# open http://localhost:4321 and select your theme from the dropdown
```
