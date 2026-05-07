/**
 * Build-time theme loader.
 * Imports every JSON file under themes/ via Vite's import.meta.glob, normalizes paths into theme metadata.
 */

import type { SupersetTheme } from "../../../../packages/schema/index.ts";

const originals = import.meta.glob<{ default: SupersetTheme }>(
  "../../../../themes/originals/*.json",
  { eager: true },
);
const ports = import.meta.glob<{ default: SupersetTheme }>(
  "../../../../themes/ports/*/*.json",
  { eager: true },
);

export interface ThemeEntry {
  slug: string;
  origin: "original" | "port";
  theme: SupersetTheme;
  shippable: boolean;
}

function entryFromModule(path: string, origin: "original" | "port", mod: { default: SupersetTheme }): ThemeEntry {
  const filename = path.split("/").pop()!.replace(/\.json$/, "");
  const slug = filename;
  return {
    slug,
    origin,
    theme: mod.default,
    shippable: !filename.startsWith("_"),
  };
}

export const themes: ThemeEntry[] = [
  ...Object.entries(originals).map(([p, m]) => entryFromModule(p, "original", m)),
  ...Object.entries(ports).map(([p, m]) => entryFromModule(p, "port", m)),
];

export const shippableThemes = themes.filter((t) => t.shippable);

export const referenceTheme = themes.find((t) => t.slug === "_reference")?.theme;
