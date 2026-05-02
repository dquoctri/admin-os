import React from 'react';

interface SparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

export function Sparkline({ data, color, width = 80, height = 28 }: SparklineProps) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    i * (width / (data.length - 1)),
    height - ((v - min) / range) * (height - 4) - 2,
  ]);
  const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = d + ` L${pts[pts.length - 1][0]},${height} L0,${height} Z`;
  const id = 'sg' + color.replace(/[^a-z0-9]/gi, '') + width;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
