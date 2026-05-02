import type { Theme, Mood, Mode, Corners, Radii, Preset } from './types';

// ─── Radii ───────────────────────────────────────────────────────────────────

export const RADII: Record<Corners, Radii> = {
  sharp:   { xs: 2,  sm: 3,  md: 4,  lg: 6,  full: 999 },
  rounded: { xs: 4,  sm: 7,  md: 8,  lg: 12, full: 999 },
  pill:    { xs: 8,  sm: 12, md: 18, lg: 24, full: 999 },
};

// ─── Presets ─────────────────────────────────────────────────────────────────

export const PRESETS: Preset[] = [
  { label: 'Clean SaaS',       mood: 'cool',   mode: 'light', corners: 'rounded' },
  { label: 'Power User',       mood: 'mono',   mode: 'dark',  corners: 'sharp'   },
  { label: 'Friendly Startup', mood: 'pastel', mode: 'light', corners: 'pill'    },
  { label: 'Dark Pro',         mood: 'cool',   mode: 'dark',  corners: 'sharp'   },
  { label: 'Enterprise',       mood: 'warm',   mode: 'dark',  corners: 'rounded' },
];

// ─── Theme builder ────────────────────────────────────────────────────────────

export function buildTheme(mood: Mood, mode: Mode): Theme {
  const dark = mode === 'dark';

  const palettes: Record<Mood, { light: Omit<Theme, 'name' | 'mood' | 'mode'>; dark: Omit<Theme, 'name' | 'mood' | 'mode'> }> = {
    warm: {
      dark: {
        bg: '#16120d', bgAlt: '#1f1812', bgHover: '#2a2218',
        sidebar: '#100d08', sidebarAlt: '#1a1510',
        sidebarText: '#a08870', sidebarActive: '#e07030', sidebarActiveBg: '#e0703022',
        sidebarBorder: 'rgba(255,255,255,0.06)',
        topbar: '#1f1812', card: '#1f1812', cardBorder: '#3a2e1e',
        text: '#f0e6d4', textMuted: '#9a8870', textFaint: '#5c4a38',
        accent: '#e07030', accentSoft: '#e0703020', accentText: '#ffaa70',
        success: '#3ab88a', successSoft: '#3ab88a1a',
        warning: '#e8a030', warningSoft: '#e8a0301a',
        danger: '#e84848', dangerSoft: '#e848481a',
        info: '#60a8e8', infoSoft: '#60a8e81a',
        chartColors: ['#e07030','#f0a060','#e8a030','#3ab88a','#60a8e8','#e84848'],
        shadow: '0 1px 4px rgba(0,0,0,0.4),0 4px 16px rgba(0,0,0,0.3)',
        shadowLg: '0 8px 32px rgba(0,0,0,0.5)', sidebarLight: false,
      },
      light: {
        bg: '#faf7f2', bgAlt: '#f4ede0', bgHover: '#ece3cf',
        sidebar: '#2d1f14', sidebarAlt: '#3d2a1a',
        sidebarText: '#c9b49a', sidebarActive: '#e8714a', sidebarActiveBg: '#e8714a22',
        sidebarBorder: 'rgba(255,255,255,0.08)',
        topbar: '#ffffff', card: '#ffffff', cardBorder: '#ede5db',
        text: '#2a1c0c', textMuted: '#8a7060', textFaint: '#c4b09a',
        accent: '#e8714a', accentSoft: '#e8714a15', accentText: '#b84523',
        success: '#1a9e72', successSoft: '#1a9e7218',
        warning: '#d4882a', warningSoft: '#d4882a18',
        danger: '#d43a3a', dangerSoft: '#d43a3a18',
        info: '#5a82b8', infoSoft: '#5a82b818',
        chartColors: ['#e8714a','#f0a07a','#d4882a','#1a9e72','#5a82b8','#d43a3a'],
        shadow: '0 1px 4px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04)',
        shadowLg: '0 8px 24px rgba(0,0,0,0.12)', sidebarLight: false,
      },
    },
    cool: {
      dark: {
        bg: '#0f1117', bgAlt: '#14192a', bgHover: '#1a2140',
        sidebar: '#090e1c', sidebarAlt: '#0f1828',
        sidebarText: '#6878a0', sidebarActive: '#4d8cff', sidebarActiveBg: '#4d8cff22',
        sidebarBorder: 'rgba(255,255,255,0.06)',
        topbar: '#14192a', card: '#14192a', cardBorder: '#1e2a40',
        text: '#e0e8f8', textMuted: '#607090', textFaint: '#364060',
        accent: '#4d8cff', accentSoft: '#4d8cff1a', accentText: '#90c0ff',
        success: '#3ab88a', successSoft: '#3ab88a1a',
        warning: '#e8a030', warningSoft: '#e8a0301a',
        danger: '#e84848', dangerSoft: '#e848481a',
        info: '#a070f8', infoSoft: '#a070f81a',
        chartColors: ['#4d8cff','#70c8ff','#3ab88a','#e8a030','#e84848','#a070f8'],
        shadow: '0 1px 4px rgba(0,0,0,0.4),0 4px 16px rgba(0,0,0,0.3)',
        shadowLg: '0 8px 32px rgba(0,0,0,0.5)', sidebarLight: false,
      },
      light: {
        bg: '#f4f6fb', bgAlt: '#edf1f8', bgHover: '#e0e8f4',
        sidebar: '#0f1e34', sidebarAlt: '#162840',
        sidebarText: '#8aafc8', sidebarActive: '#4a9eff', sidebarActiveBg: '#4a9eff22',
        sidebarBorder: 'rgba(255,255,255,0.08)',
        topbar: '#ffffff', card: '#ffffff', cardBorder: '#d8e4f0',
        text: '#0d1d2e', textMuted: '#5a7a9a', textFaint: '#a0b8d0',
        accent: '#2b7fff', accentSoft: '#2b7fff14', accentText: '#0055cc',
        success: '#1a9e72', successSoft: '#1a9e7218',
        warning: '#d4882a', warningSoft: '#d4882a18',
        danger: '#d43a3a', dangerSoft: '#d43a3a18',
        info: '#6a5acd', infoSoft: '#6a5acd18',
        chartColors: ['#2b7fff','#4ac8ff','#1a9e72','#d4882a','#d43a3a','#6a5acd'],
        shadow: '0 1px 4px rgba(0,0,0,0.05),0 4px 16px rgba(0,0,0,0.04)',
        shadowLg: '0 8px 24px rgba(0,0,0,0.1)', sidebarLight: false,
      },
    },
    pastel: {
      dark: {
        bg: '#14111e', bgAlt: '#1c1828', bgHover: '#221e32',
        sidebar: '#0f0c1a', sidebarAlt: '#14102a',
        sidebarText: '#8070b8', sidebarActive: '#a07cf8', sidebarActiveBg: '#a07cf822',
        sidebarBorder: 'rgba(255,255,255,0.06)',
        topbar: '#1c1828', card: '#1c1828', cardBorder: '#2c2444',
        text: '#ece8ff', textMuted: '#8878c0', textFaint: '#4a4070',
        accent: '#a07cf8', accentSoft: '#a07cf81a', accentText: '#c8a8ff',
        success: '#3ab88a', successSoft: '#3ab88a1a',
        warning: '#e8a030', warningSoft: '#e8a0301a',
        danger: '#e84868', dangerSoft: '#e848681a',
        info: '#60b8e8', infoSoft: '#60b8e81a',
        chartColors: ['#a07cf8','#f472b6','#3ab88a','#e8a030','#60b8e8','#e84868'],
        shadow: '0 1px 4px rgba(80,0,160,0.3),0 4px 16px rgba(80,0,160,0.2)',
        shadowLg: '0 8px 32px rgba(80,0,160,0.35)', sidebarLight: false,
      },
      light: {
        bg: '#f9f6ff', bgAlt: '#f2eeff', bgHover: '#e8e0ff',
        sidebar: '#ffffff', sidebarAlt: '#f4f1fd',
        sidebarText: '#8878c0', sidebarActive: '#7c5cbf', sidebarActiveBg: '#7c5cbf15',
        sidebarBorder: '#e4ddf8',
        topbar: '#ffffff', card: '#ffffff', cardBorder: '#e4ddf8',
        text: '#2a2040', textMuted: '#8878c0', textFaint: '#b0a0d8',
        accent: '#7c5cbf', accentSoft: '#7c5cbf15', accentText: '#5a3ea0',
        success: '#56b48a', successSoft: '#56b48a18',
        warning: '#e89e50', warningSoft: '#e89e5018',
        danger: '#d46080', dangerSoft: '#d4608018',
        info: '#5ab0d8', infoSoft: '#5ab0d818',
        chartColors: ['#7c5cbf','#a08cd8','#56b48a','#e89e50','#d46080','#5ab0d8'],
        shadow: '0 1px 4px rgba(124,92,191,0.06),0 4px 16px rgba(124,92,191,0.04)',
        shadowLg: '0 8px 24px rgba(124,92,191,0.12)', sidebarLight: true,
      },
    },
    mono: {
      dark: {
        bg: '#111111', bgAlt: '#1a1a1a', bgHover: '#222222',
        sidebar: '#0d0d0d', sidebarAlt: '#151515',
        sidebarText: '#666666', sidebarActive: '#e0e0e0', sidebarActiveBg: '#e0e0e015',
        sidebarBorder: 'rgba(255,255,255,0.06)',
        topbar: '#1a1a1a', card: '#1a1a1a', cardBorder: '#2e2e2e',
        text: '#f0f0f0', textMuted: '#888888', textFaint: '#444444',
        accent: '#e0e0e0', accentSoft: '#e0e0e015', accentText: '#ffffff',
        success: '#4a9e6f', successSoft: '#4a9e6f1a',
        warning: '#c88a30', warningSoft: '#c88a301a',
        danger: '#c85050', dangerSoft: '#c850501a',
        info: '#5888c8', infoSoft: '#5888c81a',
        chartColors: ['#e0e0e0','#aaaaaa','#808080','#cccccc','#bbbbbb','#999999'],
        shadow: '0 1px 4px rgba(0,0,0,0.4),0 4px 16px rgba(0,0,0,0.3)',
        shadowLg: '0 8px 32px rgba(0,0,0,0.5)', sidebarLight: false,
      },
      light: {
        bg: '#f8f8f8', bgAlt: '#f0f0f0', bgHover: '#e4e4e4',
        sidebar: '#111111', sidebarAlt: '#1d1d1d',
        sidebarText: '#888888', sidebarActive: '#ffffff', sidebarActiveBg: 'rgba(255,255,255,0.1)',
        sidebarBorder: 'rgba(255,255,255,0.06)',
        topbar: '#ffffff', card: '#ffffff', cardBorder: '#e0e0e0',
        text: '#111111', textMuted: '#666666', textFaint: '#999999',
        accent: '#222222', accentSoft: '#22222212', accentText: '#000000',
        success: '#1a9e72', successSoft: '#1a9e7218',
        warning: '#d4882a', warningSoft: '#d4882a18',
        danger: '#d43a3a', dangerSoft: '#d43a3a18',
        info: '#5a82b8', infoSoft: '#5a82b818',
        chartColors: ['#222222','#555555','#888888','#444444','#666666','#999999'],
        shadow: '0 1px 4px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04)',
        shadowLg: '0 8px 24px rgba(0,0,0,0.12)', sidebarLight: false,
      },
    },
  };

  const label = `${mood.charAt(0).toUpperCase() + mood.slice(1)} ${dark ? 'Dark' : 'Light'}`;
  return { name: label, mood, mode, ...palettes[mood][dark ? 'dark' : 'light'] };
}
