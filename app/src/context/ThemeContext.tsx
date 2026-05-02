import React, { createContext, useContext, useState } from 'react';
import type { Theme, Mood, Mode, Corners, Density, Radii } from '../tokens/types';
import { buildTheme, RADII } from '../tokens/themes';

interface ThemeContextValue {
  mood: Mood;
  mode: Mode;
  corners: Corners;
  setMood: (m: Mood) => void;
  setMode: (m: Mode) => void;
  setCorners: (c: Corners) => void;
  theme: Theme;
  r: Radii;
  density: Density;
  setDensity: (d: Density) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<Mood>('cool');
  const [mode, setMode] = useState<Mode>('dark');
  const [corners, setCorners] = useState<Corners>('rounded');
  const [density, setDensity] = useState<Density>('compact');

  return (
    <ThemeContext.Provider value={{
      mood, mode, corners,
      setMood, setMode, setCorners,
      theme: buildTheme(mood, mode),
      r: RADII[corners],
      density, setDensity,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
