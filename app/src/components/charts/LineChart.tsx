import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SeriesData {
  name: string;
  data: number[];
  color?: string;
}

interface LineChartProps {
  data?: number[];
  series?: SeriesData[];
  labels?: string[];
  height?: number;
  width?: number;
}

export function LineChart({ data, series, labels, height = 100, width = 540 }: LineChartProps) {
  const { theme: t } = useTheme();
  const [hovIdx, setHovIdx] = useState<number | null>(null);

  const allSeries: SeriesData[] = series ?? [{ name: 'Value', data: data ?? [], color: t.accent }];
  const allVals = allSeries.flatMap(s => s.data);
  const max = Math.max(...allVals) * 1.05;
  const min = 0;
  const range = max - min || 1;
  const W = width, H = height;

  const pts = (arr: number[]) =>
    arr.map((v, i) => [i * (W / (arr.length - 1)), H - ((v - min) / range) * H]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={H}
      preserveAspectRatio="none"
      style={{ display: 'block', overflow: 'visible' }}
      onMouseLeave={() => setHovIdx(null)}>
      <defs>
        {allSeries.map((s, si) => {
          const c = s.color ?? t.chartColors[si] ?? t.accent;
          return (
            <linearGradient key={si} id={`lg${si}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c} stopOpacity="0.2" />
              <stop offset="100%" stopColor={c} stopOpacity="0" />
            </linearGradient>
          );
        })}
      </defs>
      {allSeries.map((s, si) => {
        const color = s.color ?? t.chartColors[si] ?? t.accent;
        const points = pts(s.data);
        const pathD = points.map((p, i) => (i === 0 ? 'M' : 'L') + `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
        const areaD = pathD + ` L${points[points.length - 1][0]},${H} L0,${H} Z`;
        return (
          <React.Fragment key={si}>
            <path d={areaD} fill={`url(#lg${si})`} />
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="600"
              strokeDashoffset="600"
              style={{ animation: `lineDrawAnim 1.1s ease ${si * 0.2}s forwards` }}
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p[0]}
                cy={p[1]}
                r={hovIdx === i ? 4 : 2.5}
                fill={color}
                opacity={hovIdx === i ? 1 : 0.6}
                style={{ transition: 'r 0.1s' }}
                onMouseEnter={() => setHovIdx(i)}
              />
            ))}
          </React.Fragment>
        );
      })}
      {labels && labels.map((_, i) => {
        const x = i * (W / (labels.length - 1));
        return (
          <rect
            key={i}
            x={x - W / (labels.length * 2)}
            y={0}
            width={W / labels.length}
            height={H}
            fill="transparent"
            onMouseEnter={() => setHovIdx(i)}
          />
        );
      })}
      {hovIdx !== null && labels && (() => {
        const x = hovIdx * (W / (labels.length - 1));
        return (
          <g>
            <line x1={x} y1={0} x2={x} y2={H} stroke={t.cardBorder} strokeWidth="1" strokeDasharray="3,3" />
            <rect x={x - 40} y={4} width={80} height={allSeries.length * 16 + 10} rx="4"
              fill={t.card} stroke={t.cardBorder} strokeWidth="1" />
            <text x={x} y={16} textAnchor="middle" fontSize="9" fontWeight="600" fill={t.textMuted}>{labels[hovIdx]}</text>
            {allSeries.map((s, si) => (
              <text key={si} x={x} y={28 + si * 14} textAnchor="middle" fontSize="9" fontWeight="700"
                fill={s.color ?? t.chartColors[si] ?? t.accent}>{s.data[hovIdx]}</text>
            ))}
          </g>
        );
      })()}
    </svg>
  );
}
