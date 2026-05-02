import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface DonutSegment {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  strokeWidth?: number;
}

export function DonutChart({ data, size = 110, strokeWidth = 18 }: DonutChartProps) {
  const { theme: t } = useTheme();
  const [hov, setHov] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = size / 2 - strokeWidth / 2;
  const C = size / 2;
  const circumference = 2 * Math.PI * R;
  let offset = 0;
  const segments = data.map((d, i) => {
    const pct = d.value / total;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const rot = offset * 360;
    offset += pct;
    return { ...d, dash, gap, rot, color: d.color ?? t.chartColors[i] };
  });
  const hovSeg = hov !== null ? segments[hov] : null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
        {segments.map((s, i) => (
          <circle
            key={i}
            cx={C} cy={C} r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={hov === i ? strokeWidth + 3 : strokeWidth}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeLinecap="butt"
            transform={`rotate(${s.rot - 90} ${C} ${C})`}
            style={{ transition: 'stroke-width 0.15s', cursor: 'pointer' }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          />
        ))}
        <text x={C} y={C - 5} textAnchor="middle" fontSize={size * 0.11} fontWeight="700" fill={t.text}>
          {hovSeg ? hovSeg.value + '%' : '100%'}
        </text>
        <text x={C} y={C + 10} textAnchor="middle" fontSize={size * 0.085} fill={t.textMuted}>
          {hovSeg ? hovSeg.label : 'Total'}
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1, minWidth: 0 }}>
        {segments.map((s, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', opacity: hov === null || hov === i ? 1 : 0.4, transition: 'opacity 0.15s' }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: t.textMuted, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.text }}>{s.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
