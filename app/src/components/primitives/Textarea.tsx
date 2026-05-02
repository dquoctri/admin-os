import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface TextareaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
}

export function Textarea({ value, defaultValue, onChange, placeholder, rows = 3, style: ext }: TextareaProps) {
  const { theme: t, r } = useTheme();
  const [focus, setFocus] = useState(false);
  const controlled = value !== undefined;
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      {...(controlled ? { value, onChange } : { defaultValue })}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: '100%', padding: '8px 12px',
        border: `1px solid ${focus ? t.accent : t.cardBorder}`,
        borderRadius: r.md, background: t.card,
        color: t.text, fontSize: 13, fontFamily: 'inherit',
        resize: 'vertical', outline: 'none',
        boxShadow: focus ? `0 0 0 3px ${t.accentSoft}` : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        lineHeight: 1.6,
        ...ext,
      }}
    />
  );
}
