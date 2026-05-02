import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SkeletonProps {
  w?: string | number;
  h?: number;
  r?: number;
}

export function Skeleton({ w = '100%', h = 14, r = 6 }: SkeletonProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: `linear-gradient(90deg, ${t.bgAlt} 25%, ${t.bgHover} 50%, ${t.bgAlt} 75%)`,
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.4s infinite linear',
    }} />
  );
}
