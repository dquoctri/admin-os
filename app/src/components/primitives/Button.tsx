import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from './Icon';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md';
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ children, variant = 'primary', size = 'sm', icon, onClick, disabled, style: ext, type = 'button' }: ButtonProps) {
  const { theme: t, r } = useTheme();
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);

  const variants = {
    primary: { bg: t.accent,      color: '#fff',      border: 'none' },
    outline: { bg: 'transparent', color: t.text,      border: `1px solid ${t.cardBorder}` },
    ghost:   { bg: 'transparent', color: t.textMuted, border: 'none' },
    danger:  { bg: t.dangerSoft,  color: t.danger,    border: `1px solid ${t.danger}33` },
    success: { bg: t.successSoft, color: t.success,   border: `1px solid ${t.success}33` },
  };
  const sizes = {
    xs: { padding: '3px 8px',   fontSize: 11, gap: 4,  iconSize: 12 },
    sm: { padding: '5px 12px',  fontSize: 12, gap: 6,  iconSize: 14 },
    md: { padding: '8px 16px',  fontSize: 13, gap: 7,  iconSize: 15 },
  };
  const v = variants[variant];
  const sz = sizes[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: sz.gap,
        padding: sz.padding, borderRadius: r.sm,
        border: v.border, background: v.bg, color: v.color,
        fontSize: sz.fontSize, fontWeight: 600, fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : hov ? 0.88 : 1,
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.15s, transform 0.1s',
        whiteSpace: 'nowrap',
        ...ext,
      }}>
      {icon && <Icon name={icon} size={sz.iconSize} color={v.color} />}
      {children}
    </button>
  );
}
