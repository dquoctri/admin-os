import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SettingsTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export function SettingsTabs({ tabs, active, onChange }: SettingsTabsProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{
      display: 'flex', gap: 2,
      borderBottom: `1px solid ${t.cardBorder}`,
    }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderBottom: `2px solid ${active === tab ? t.accent : 'transparent'}`,
            background: 'transparent',
            color: active === tab ? t.accent : t.textMuted,
            fontSize: 13, fontWeight: active === tab ? 600 : 400,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.15s',
            marginBottom: -1,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { if (active !== tab) e.currentTarget.style.color = t.text; }}
          onMouseLeave={e => { if (active !== tab) e.currentTarget.style.color = t.textMuted; }}>
          {tab}
        </button>
      ))}
    </div>
  );
}
