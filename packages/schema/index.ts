import schema from "./superset-theme.schema.json" with { type: "json" };

export type ThemeType = "dark" | "light";

export interface UiTokens {
  background?: string;
  foreground?: string;
  card?: string;
  cardForeground?: string;
  popover?: string;
  popoverForeground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  muted?: string;
  mutedForeground?: string;
  accent?: string;
  accentForeground?: string;
  tertiary?: string;
  tertiaryActive?: string;
  destructive?: string;
  destructiveForeground?: string;
  border?: string;
  input?: string;
  ring?: string;
  sidebar?: string;
  sidebarForeground?: string;
  sidebarPrimary?: string;
  sidebarPrimaryForeground?: string;
  sidebarAccent?: string;
  sidebarAccentForeground?: string;
  sidebarBorder?: string;
  sidebarRing?: string;
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  highlightMatch?: string;
  highlightActive?: string;
  highlight?: string;
  highlightForeground?: string;
}

export interface TerminalTokens {
  background?: string;
  foreground?: string;
  cursor?: string;
  cursorAccent?: string;
  selectionBackground?: string;
  selectionForeground?: string;
  black?: string;
  red?: string;
  green?: string;
  yellow?: string;
  blue?: string;
  magenta?: string;
  cyan?: string;
  white?: string;
  brightBlack?: string;
  brightRed?: string;
  brightGreen?: string;
  brightYellow?: string;
  brightBlue?: string;
  brightMagenta?: string;
  brightCyan?: string;
  brightWhite?: string;
}

export interface EditorColors {
  background?: string;
  foreground?: string;
  border?: string;
  cursor?: string;
  gutterBackground?: string;
  gutterForeground?: string;
  activeLine?: string;
  selection?: string;
  search?: string;
  searchActive?: string;
  panel?: string;
  panelBorder?: string;
  panelInputBackground?: string;
  panelInputForeground?: string;
  panelInputBorder?: string;
  panelButtonBackground?: string;
  panelButtonForeground?: string;
  panelButtonBorder?: string;
  diffBuffer?: string;
  diffHover?: string;
  diffSeparator?: string;
  addition?: string;
  deletion?: string;
  modified?: string;
}

export interface EditorSyntaxColors {
  plainText?: string;
  comment?: string;
  keyword?: string;
  string?: string;
  number?: string;
  functionCall?: string;
  variableName?: string;
  typeName?: string;
  className?: string;
  constant?: string;
  regexp?: string;
  tagName?: string;
  attributeName?: string;
  invalid?: string;
}

export interface EditorThemeOverrides {
  colors?: EditorColors;
  syntax?: EditorSyntaxColors;
}

export interface SupersetTheme {
  id: string;
  name: string;
  type: ThemeType;
  author?: string;
  version?: string;
  description?: string;
  ui: UiTokens;
  terminal: TerminalTokens;
  editor?: EditorThemeOverrides;
}

export { schema };
export const SCHEMA_ID = schema.$id;
