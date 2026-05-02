import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export function Toggle({ checked, onChange, size = 'md', disabled }: ToggleProps) {
  const value = checked;
  const { theme: t } = useTheme();
  const W = size === 'sm' ? 32 : 40;
  const H = size === 'sm' ? 18 : 22;
  const knob = H - 4;
  return (
    <div
      onClick={() => !disabled && onChange(!value)}
      style={{
        width: W, height: H, borderRadius: H,
        background: value ? t.accent : t.bgAlt,
        border: `1.5px solid ${value ? t.accent : t.cardBorder}`,
        position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s, border-color 0.2s',
        flexShrink: 0, opacity: disabled ? 0.45 : 1,
      }}>
      <div style={{
        position: 'absolute',
        top: 2, left: value ? W - knob - 2 : 2,
        width: knob, height: knob, borderRadius: knob,
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        transition: 'left 0.2s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </div>
  );
}
