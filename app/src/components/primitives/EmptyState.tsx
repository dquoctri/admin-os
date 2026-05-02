import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from './Icon';

interface EmptyStateProps {
  title: string;
  sub?: string;
  icon?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, sub, icon = 'box', action }: EmptyStateProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '56px 24px', gap: 12,
      animation: 'fadeSlideIn 0.3s ease both',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14, background: t.accentSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={22} color={t.accent} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: t.textMuted, textAlign: 'center', maxWidth: 280 }}>{sub}</div>}
      {action}
    </div>
  );
}
