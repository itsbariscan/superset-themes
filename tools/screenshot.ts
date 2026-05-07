#!/usr/bin/env bun
/**
 * Snapshot every shippable theme detail page from a running dev server.
 * Outputs PNGs into apps/site/public/og/<slug>.png at fixed 1200×630 (Open Graph aspect).
 *
 * Usage:
 *   bun --cwd apps/site dev   # in another terminal
 *   bun tools/screenshot.ts
 */

import { Glob } from "bun";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4321";
const OUT_DIR = "apps/site/public/og";

interface ThemeMeta {
  slug: string;
  origin: "original" | "port";
}

const metas: ThemeMeta[] = [];

const originalsGlob = new Glob("themes/originals/*.json");
for await (const file of originalsGlob.scan({ cwd: process.cwd(), absolute: false })) {
  const slug = file.split("/").pop()!.replace(/\.json$/, "");
  if (slug.startsWith("_")) continue;
  metas.push({ slug, origin: "original" });
}
const portsGlob = new Glob("themes/ports/*/*.json");
for await (const file of portsGlob.scan({ cwd: process.cwd(), absolute: false })) {
  const slug = file.split("/").pop()!.replace(/\.json$/, "");
  metas.push({ slug, origin: "port" });
}
metas.sort((a, b) => a.slug.localeCompare(b.slug));

await Bun.$`mkdir -p ${OUT_DIR}`.quiet();

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const page = await ctx.newPage();

  for (const m of metas) {
    const url = `${BASE}/themes/${m.slug}/`;
    process.stdout.write(`→ ${m.slug}…`);
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForLoadState("domcontentloaded");
    // Wait for fonts to settle so screenshots are deterministic
    await page.evaluate(() => document.fonts.ready);
    const out = `${OUT_DIR}/${m.slug}.png`;
    await page.screenshot({ path: out, fullPage: false, type: "png" });
    console.log(` ${out}`);
  }
} finally {
  await browser.close();
}

console.log(`\nDone — ${metas.length} screenshots into ${OUT_DIR}/.`);
