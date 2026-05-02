import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface BarData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarData[];
  height?: number;
  showLabels?: boolean;
}

export function BarChart({ data, height = 120, showLabels = true }: BarChartProps) {
  const { theme: t } = useTheme();
  const [hov, setHov] = useState<number | null>(null);
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height, paddingTop: 8 }}>
      {data.map((d, i) => {
        const pct = d.value / max;
        const isH = hov === i;
        return (
          <div
            key={i}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer' }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}>
            {isH && (
              <div style={{ fontSize: 10, fontWeight: 700, color: t.accent, animation: 'fadeSlideIn 0.12s ease both', lineHeight: 1 }}>
                {d.value}
              </div>
            )}
            <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
              <div style={{
                width: '100%',
                height: `${pct * 100}%`,
                minHeight: 3,
                background: isH ? t.accent : t.chartColors[0],
                borderRadius: '3px 3px 0 0',
                opacity: isH ? 1 : 0.7,
                transformOrigin: 'bottom',
                animation: `chartBarAnim 0.5s ease ${i * 0.03}s both`,
                transition: 'background 0.15s, opacity 0.15s',
              }} />
            </div>
            {showLabels && <div style={{ fontSize: 9, color: t.textMuted, fontWeight: 500, lineHeight: 1 }}>{d.label}</div>}
          </div>
        );
      })}
    </div>
  );
}
