import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface RadioOption {
  value: string;
  label: string;
  sub?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (v: string) => void;
}

export function RadioGroup({ options, value, onChange }: RadioGroupProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {options.map(opt => (
        <label key={opt.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
          <div
            onClick={() => onChange(opt.value)}
            style={{
              width: 16, height: 16, borderRadius: 999, marginTop: 1,
              border: `2px solid ${value === opt.value ? t.accent : t.cardBorder}`,
              background: 'transparent', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.15s', cursor: 'pointer',
            }}>
            {value === opt.value && <div style={{ width: 6, height: 6, borderRadius: 999, background: t.accent }} />}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: t.text, lineHeight: 1.3 }}>{opt.label}</div>
            {opt.sub && <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{opt.sub}</div>}
          </div>
        </label>
      ))}
    </div>
  );
}
