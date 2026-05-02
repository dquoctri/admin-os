import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PRESETS } from '../../tokens/themes';
import type { Mood, Mode, Corners, Density } from '../../tokens/types';

const MOODS: { key: Mood; label: string; dot: string }[] = [
  { key: 'warm',   label: 'Warm',   dot: '#e07030' },
  { key: 'cool',   label: 'Cool',   dot: '#4d8cff' },
  { key: 'pastel', label: 'Pastel', dot: '#a07cf8' },
  { key: 'mono',   label: 'Mono',   dot: '#888888' },
];

export function ThemePanel() {
  const { mood, mode, corners, setMood, setMode, setCorners, density, setDensity, theme: t, r } = useTheme();
  const [open, setOpen] = useState(false);

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setMood(preset.mood);
    setMode(preset.mode);
    setCorners(preset.corners);
  };

  const pill = (active: boolean) => ({
    padding: '5px 11px', borderRadius: r.sm,
    border: `1px solid ${active ? t.accent : t.cardBorder}`,
    background: active ? t.accentSoft : 'transparent',
    color: active ? t.accentText : t.textMuted,
    fontSize: 11, fontWeight: active ? 700 : 400,
    cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all 0.12s', textTransform: 'capitalize' as const,
  });

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 500 }}>
      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 10px)', right: 0,
          width: 264, background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: r.lg + 2, padding: 16, boxShadow: t.shadowLg,
          animation: 'fadeSlideIn 0.15s ease both',
        }}>

          {/* Presets */}
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.06em', marginBottom: 8 }}>PRESETS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
            {PRESETS.map(p => {
              const active = p.mood === mood && p.mode === mode && p.corners === corners;
              return (
                <button key={p.label} onClick={() => applyPreset(p)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 10px', borderRadius: r.sm,
                    border: `1px solid ${active ? t.accent : t.cardBorder}`,
                    background: active ? t.accentSoft : t.bgAlt,
                    color: active ? t.accentText : t.text,
                    fontSize: 12, fontWeight: active ? 700 : 500,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.12s',
                    textAlign: 'left',
                  }}>
                  <span>{p.label}</span>
                  <span style={{ fontSize: 10, color: t.textFaint, fontWeight: 400, textTransform: 'capitalize' }}>
                    {p.mood} · {p.mode} · {p.corners}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ height: 1, background: t.cardBorder, margin: '4px 0 14px' }} />

          {/* Mood */}
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.06em', marginBottom: 8 }}>MOOD</div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {MOODS.map(m => (
              <button key={m.key} onClick={() => setMood(m.key)} style={pill(mood === m.key)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: m.dot, flexShrink: 0 }} />
                  {m.label}
                </span>
              </button>
            ))}
          </div>

          {/* Mode */}
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.06em', marginBottom: 8 }}>MODE</div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {(['light', 'dark'] as Mode[]).map(m => (
              <button key={m} onClick={() => setMode(m)} style={pill(mode === m)}>
                {m === 'light' ? '☀ Light' : '🌙 Dark'}
              </button>
            ))}
          </div>

          {/* Corners */}
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.06em', marginBottom: 8 }}>CORNERS</div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {(['sharp', 'rounded', 'pill'] as Corners[]).map(c => (
              <button key={c} onClick={() => setCorners(c)} style={pill(corners === c)}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {/* Density */}
          <div style={{ fontSize: 10, fontWeight: 700, color: t.textFaint, letterSpacing: '0.06em', marginBottom: 8 }}>DENSITY</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['compact', 'default', 'spacious'] as Density[]).map(d => (
              <button key={d} onClick={() => setDensity(d)} style={{ ...pill(density === d), flex: 1 }}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        title="Appearance"
        style={{
          width: 40, height: 40, borderRadius: 20,
          background: t.accent, border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: t.shadowLg,
          transition: 'transform 0.15s',
          transform: open ? 'scale(0.92)' : 'scale(1)',
          fontSize: 16,
        }}>
        🎨
      </button>
    </div>
  );
}
