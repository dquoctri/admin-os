import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 16,
      marginBottom: 20, animation: 'fadeSlideIn 0.3s ease both',
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em', margin: 0 }}>{title}</h1>
        {description && <p style={{ fontSize: 13, color: t.textMuted, marginTop: 4, margin: '4px 0 0' }}>{description}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{actions}</div>}
    </div>
  );
}
