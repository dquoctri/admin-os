import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from './Icon';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  style?: React.CSSProperties;
}

export function Select({ value, onChange, options, style: ext }: SelectProps) {
  const { theme: t, r } = useTheme();
  return (
    <div style={{ position: 'relative', ...ext }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: 'none', WebkitAppearance: 'none',
          padding: '6px 28px 6px 10px', borderRadius: r.md,
          border: `1px solid ${t.cardBorder}`,
          background: t.card, color: t.text,
          fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
          cursor: 'pointer', outline: 'none', width: '100%',
        }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <Icon name="chevron-down" size={12} color={t.textMuted}
        style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  );
}
