import type { SupersetTheme, UiTokens, TerminalTokens } from "../../../../packages/schema/index.ts";

const UI_KEYS: Array<keyof UiTokens> = [
  "background", "foreground", "card", "cardForeground", "popover", "popoverForeground",
  "primary", "primaryForeground", "secondary", "secondaryForeground",
  "muted", "mutedForeground", "accent", "accentForeground",
  "tertiary", "tertiaryActive", "destructive", "destructiveForeground",
  "border", "input", "ring",
  "sidebar", "sidebarForeground", "sidebarPrimary", "sidebarPrimaryForeground",
  "sidebarAccent", "sidebarAccentForeground", "sidebarBorder", "sidebarRing",
  "chart1", "chart2", "chart3", "chart4", "chart5",
  "highlightMatch", "highlightActive", "highlight", "highlightForeground",
];

const TERMINAL_KEYS: Array<keyof TerminalTokens> = [
  "background", "foreground", "cursor", "cursorAccent", "selectionBackground", "selectionForeground",
  "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white",
  "brightBlack", "brightRed", "brightGreen", "brightYellow",
  "brightBlue", "brightMagenta", "brightCyan", "brightWhite",
];

const TERMINAL_VAR_MAP: Record<keyof TerminalTokens, string> = {
  background: "--term-bg",
  foreground: "--term-fg",
  cursor: "--term-cursor",
  cursorAccent: "--term-cursorAccent",
  selectionBackground: "--term-selection",
  selectionForeground: "--term-selection-fg",
  black: "--term-black",
  red: "--term-red",
  green: "--term-green",
  yellow: "--term-yellow",
  blue: "--term-blue",
  magenta: "--term-magenta",
  cyan: "--term-cyan",
  white: "--term-white",
  brightBlack: "--term-brightBlack",
  brightRed: "--term-brightRed",
  brightGreen: "--term-brightGreen",
  brightYellow: "--term-brightYellow",
  brightBlue: "--term-brightBlue",
  brightMagenta: "--term-brightMagenta",
  brightCyan: "--term-brightCyan",
  brightWhite: "--term-brightWhite",
};

export function applyTheme(theme: SupersetTheme, root: HTMLElement = document.documentElement): void {
  for (const key of UI_KEYS) {
    const v = theme.ui?.[key];
    if (v) root.style.setProperty(`--${key}`, v);
  }
  for (const key of TERMINAL_KEYS) {
    const v = theme.terminal?.[key];
    if (v) root.style.setProperty(TERMINAL_VAR_MAP[key], v);
  }
  root.dataset.themeId = theme.id;
  root.dataset.themeType = theme.type;
}
