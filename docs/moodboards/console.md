# Console — moodboard

**Concept:** A 1980s VT220 terminal at midnight. Phosphor green cursor against a void that isn't quite black. The hum of the CRT. The faint amber bloom around bright glyphs.

**Anchor references:** DEC VT220, IBM 3151, the WarGames war-room, every "hacker" movie's terminal scene done right. Phosphor types: P1 (green), P3 (amber). This theme picks P1.

**Anchor colors (sampled):**
- CRT void: `#050a05` (almost-black with a green ghost)
- Phosphor primary: `#2ed85a` (the color of safe text)
- Phosphor dim: `#1a8c40` (older glow, mutedForeground)
- Amber accent: `#f5d04b` (for warnings — phosphor-gun bias toward yellow)
- Alert red: `#ff4040` (the rare destructive color, slightly bloomed)
- Cursor white-green: `#5dff8a` (active cursor, brighter than text)

**Mood checklist:**
- Near-monochrome — only green, with amber and red as exceptions.
- Type is the *only* feature. No grey backgrounds. No card variations.
- Scanlines belong in CSS, not in the palette — but the palette should imply them.
- This is a dark theme, but the void leans green, not blue.

**What this theme avoids:** any blue, purple, magenta. Anything that breaks the phosphor illusion.

**Type:** dark
