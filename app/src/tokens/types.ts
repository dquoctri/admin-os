export type Mood = 'warm' | 'cool' | 'pastel' | 'mono';
export type Mode = 'light' | 'dark';
export type Corners = 'sharp' | 'rounded' | 'pill';
export type Density = 'compact' | 'default' | 'spacious';

export interface Radii {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export interface Theme {
  name: string;
  mood: Mood;
  mode: Mode;
  bg: string;
  bgAlt: string;
  bgHover: string;
  sidebar: string;
  sidebarAlt: string;
  sidebarText: string;
  sidebarActive: string;
  sidebarActiveBg: string;
  sidebarBorder: string;
  topbar: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  textFaint: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  info: string;
  infoSoft: string;
  chartColors: string[];
  shadow: string;
  shadowLg: string;
  sidebarLight: boolean;
}

export interface Preset {
  label: string;
  mood: Mood;
  mode: Mode;
  corners: Corners;
}
