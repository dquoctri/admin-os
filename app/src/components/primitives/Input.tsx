import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from './Icon';

interface InputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  style?: React.CSSProperties;
  type?: string;
}

export function Input({ placeholder, value, defaultValue, onChange, icon, style: ext, type = 'text' }: InputProps) {
  const { theme: t, r } = useTheme();
  const [focus, setFocus] = useState(false);
  const controlled = value !== undefined;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: t.card,
      border: `1px solid ${focus ? t.accent : t.cardBorder}`,
      borderRadius: r.md, padding: '6px 10px',
      boxShadow: focus ? `0 0 0 3px ${t.accentSoft}` : 'none',
      transition: 'all 0.18s',
      ...ext,
    }}>
      {icon && <Icon name={icon} size={13} color={focus ? t.accent : t.textMuted} />}
      <input
        type={type}
        placeholder={placeholder}
        {...(controlled ? { value, onChange } : { defaultValue })}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          border: 'none', outline: 'none', background: 'transparent',
          fontSize: 13, color: t.text, width: '100%', fontFamily: 'inherit',
        }}
      />
    </div>
  );
}
