#!/usr/bin/env bun
/**
 * WCAG contrast checker for superset.sh themes.
 * Enforces WCAG-AA per pair, using the correct threshold for the surface:
 *   foreground / background          → body text   → 4.5:1 (AA-normal)
 *   cardForeground / card            → body text   → 4.5:1 (AA-normal)
 *   popoverForeground / popover      → body text   → 4.5:1 (AA-normal)
 *   primaryForeground / primary      → button label (large text by WCAG) → 3:1 (AA-large)
 *
 * Tokens that are missing (the schema marks them optional) are skipped — superset.sh fills them from defaults.
 */

import { Glob } from "bun";
import type { SupersetTheme } from "../packages/schema/index.ts";

const AA_NORMAL = 4.5;
const AA_LARGE = 3;

const PAIRS: Array<{
  fg: keyof SupersetTheme["ui"];
  bg: keyof SupersetTheme["ui"];
  threshold: number;
  surface: string;
}> = [
  { fg: "foreground", bg: "background", threshold: AA_NORMAL, surface: "body" },
  { fg: "cardForeground", bg: "card", threshold: AA_NORMAL, surface: "card" },
  { fg: "popoverForeground", bg: "popover", threshold: AA_NORMAL, surface: "popover" },
  { fg: "primaryForeground", bg: "primary", threshold: AA_LARGE, surface: "button (large text)" },
];

function parseColor(input: string): [number, number, number, number] | null {
  const s = input.trim();
  if (s.startsWith("#")) {
    const hex = s.slice(1);
    const expand = (c: string) => parseInt(c.length === 1 ? c + c : c, 16);
    if (hex.length === 3) return [expand(hex[0]!), expand(hex[1]!), expand(hex[2]!), 1];
    if (hex.length === 4)
      return [expand(hex[0]!), expand(hex[1]!), expand(hex[2]!), expand(hex[3]!) / 255];
    if (hex.length === 6)
      return [expand(hex.slice(0, 2)), expand(hex.slice(2, 4)), expand(hex.slice(4, 6)), 1];
    if (hex.length === 8)
      return [
        expand(hex.slice(0, 2)),
        expand(hex.slice(2, 4)),
        expand(hex.slice(4, 6)),
        expand(hex.slice(6, 8)) / 255,
      ];
    return null;
  }
  const m = s.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] !== undefined ? Number(m[4]) : 1];
}

function relLum(r: number, g: number, b: number): number {
  const f = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a: [number, number, number, number], b: [number, number, number, number]): number {
  const la = relLum(a[0], a[1], a[2]);
  const lb = relLum(b[0], b[1], b[2]);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const args = process.argv.slice(2);
const patterns = args.length > 0 ? args : ["themes/**/*.json"];

const cwd = process.cwd();
const files: string[] = [];
for (const pattern of patterns) {
  const glob = new Glob(pattern);
  for await (const file of glob.scan({ cwd, absolute: false })) {
    files.push(file);
  }
}

if (files.length === 0) {
  console.log("No theme files found.");
  process.exit(0);
}

let failed = 0;

for (const file of files.sort()) {
  const data = (await Bun.file(file).json()) as SupersetTheme;
  const issues: string[] = [];

  for (const pair of PAIRS) {
    const fg = data.ui?.[pair.fg];
    const bg = data.ui?.[pair.bg];
    if (!fg || !bg) continue;
    const fgC = parseColor(fg);
    const bgC = parseColor(bg);
    if (!fgC || !bgC) {
      issues.push(`${pair.fg}/${pair.bg}: unparseable color`);
      continue;
    }
    const ratio = contrast(fgC, bgC);
    if (ratio < pair.threshold) {
      issues.push(
        `${pair.fg} on ${pair.bg} (${pair.surface}): ${ratio.toFixed(2)}:1 (need ≥${pair.threshold}:1)`,
      );
    }
  }

  if (issues.length > 0) {
    failed++;
    console.log(`\x1b[31m✗\x1b[0m ${file}`);
    for (const issue of issues) console.log(`    ${issue}`);
  } else {
    console.log(`\x1b[32m✓\x1b[0m ${file}`);
  }
}

console.log(`\n${files.length - failed}/${files.length} themes pass WCAG-AA on critical pairs.`);
process.exit(failed === 0 ? 0 : 1);
