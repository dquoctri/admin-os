import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

export function StatBar({ label, value, max, color }: StatBarProps) {
  const { theme: t } = useTheme();
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ fontSize: 12, color: t.textMuted, width: 70, flexShrink: 0 }}>{label}</div>
      <div style={{ flex: 1, height: 6, borderRadius: 999, background: t.bgAlt, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: color, borderRadius: 999,
          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: t.text, width: 36, textAlign: 'right' }}>{value}</div>
    </div>
  );
}
