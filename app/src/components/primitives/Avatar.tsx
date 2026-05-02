import React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
  style?: React.CSSProperties;
}

export function Avatar({ name, size = 28, style: ext }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const hue = (name.charCodeAt(0) * 37 + (name.charCodeAt(1) || 0) * 13) % 360;
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: `oklch(0.55 0.18 ${hue})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, color: '#fff',
      flexShrink: 0, userSelect: 'none',
      ...ext,
    }}>
      {initials}
    </div>
  );
}
