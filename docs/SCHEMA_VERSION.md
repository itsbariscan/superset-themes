# Schema version

We pin to the superset.sh theme schema as defined in the open-source repo at [superset-sh/superset](https://github.com/superset-sh/superset), specifically [`apps/desktop/src/shared/themes/types.ts`](https://github.com/superset-sh/superset/blob/main/apps/desktop/src/shared/themes/types.ts) and [`import.ts`](https://github.com/superset-sh/superset/blob/main/apps/desktop/src/shared/themes/import.ts), as of **2026-05-07**.

## Pinned shape

```ts
interface Theme {
  id: string;
  name: string;
  type: "dark" | "light";
  author?: string;
  version?: string;
  description?: string;
  ui: UIColors;          // 38 tokens, 2 optional (highlight, highlightForeground)
  terminal?: TerminalColors;  // 22 tokens, 3 optional (cursorAccent, selectionBackground, selectionForeground)
  editor?: EditorThemeOverrides;  // optional partial overrides
  isBuiltIn?: boolean;
  isCustom?: boolean;
}
```

- File can also be an array of themes, or `{ "themes": [...] }`. We ship one theme per file in v0.x.
- `colors` is accepted as a legacy alias for `terminal` by superset.sh's importer, but we don't emit it.
- `isBuiltIn` and `isCustom` are runtime flags set by superset.sh — themes shipped to disk shouldn't include them.

## Reserved IDs (will fail import)

```
system, dark, light, monokai
```

Plus any built-in theme IDs added in future superset.sh releases. Our slugs (`dracula`, `nord`, `solarized-dark`, `solarized-light`, `tokyo-night`, `catppuccin-mocha`, `gruvbox-dark`, `rose-pine`, `hangar`, `vellum`, `console`, `ferro`, `reactor`, `riso`, `inkwell`, `atlas`, `twilight-run`, `brutalist`, `kintsugi`, `supernova`) all clear.

## ID normalization

superset.sh normalizes IDs via `value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")`. Our IDs are already in normalized form, so they round-trip without surprises.

## Validation strictness divergence

Upstream's Zod schema (in `import.ts`) is **highly permissive**: every UI / terminal field is optional, `type` defaults to `"dark"`, and `.passthrough()` accepts unknown fields. Missing fields fall back to one of the three built-in themes (dark, light, monokai).

Our [`packages/schema/superset-theme.schema.json`](../packages/schema/superset-theme.schema.json) is **deliberately stricter**:
- Requires `id`, `name`, `type`, `ui`, `terminal` at the root
- Strict on unknown fields inside `ui`, `terminal`, and `editor` blocks
- Validates color strings against a CSS-color regex (hex / rgb / rgba)

This catches typos and incomplete themes that upstream would silently absorb. The downside: a JSON that imports cleanly into superset.sh might fail our local validator. That's a feature, not a bug.

## Drift policy

When superset.sh adds a field upstream, our validator will fail loudly until:

1. `packages/schema/superset-theme.schema.json` adds the field
2. `packages/schema/index.ts` (TS types) adds the field
3. `docs/TOKENS.md` documents what the field controls
4. `docs/RENDERER_FIDELITY.md` adds the field to the derivation table if relevant

That sequence ensures every author has a contract before the first theme uses the new field.

## How to verify against upstream

```bash
# Fetch the current upstream types and diff against our schema
gh api repos/superset-sh/superset/contents/apps/desktop/src/shared/themes/types.ts --jq '.content' | base64 -d > /tmp/upstream-types.ts
diff /tmp/upstream-types.ts <(jq -r '.properties.ui.properties | keys | .[]' packages/schema/superset-theme.schema.json | sort)
```

(Treat the diff as advisory — type-shape vs. JSON-schema doesn't compare 1:1 cleanly, but the field names should round-trip.)
