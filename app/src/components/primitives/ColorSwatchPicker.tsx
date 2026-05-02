import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ColorSwatchPickerProps {
  colors: string[];
  value: string;
  onChange: (c: string) => void;
}

export function ColorSwatchPicker({ colors, value, onChange }: ColorSwatchPickerProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {colors.map(c => (
        <div
          key={c}
          onClick={() => onChange(c)}
          style={{
            width: 24, height: 24, borderRadius: 6, background: c, cursor: 'pointer',
            border: `2px solid ${value === c ? t.text : 'transparent'}`,
            outline: `2px solid ${value === c ? c : 'transparent'}`,
            outlineOffset: 2,
            transition: 'transform 0.12s, outline 0.12s',
            transform: value === c ? 'scale(1.15)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
}
