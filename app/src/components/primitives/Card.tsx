import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({ children, style: ext, onClick }: CardProps) {
  const { theme: t, r } = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: r.lg,
        boxShadow: hov && onClick ? t.shadowLg : t.shadow,
        transform: hov && onClick ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...ext,
      }}>
      {children}
    </div>
  );
}
