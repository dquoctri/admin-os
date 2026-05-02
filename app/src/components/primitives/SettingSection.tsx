import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Card } from './Card';

interface SettingSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingSection({ title, description, children }: SettingSectionProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: '-0.01em' }}>{title}</div>
        {description && <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4, lineHeight: 1.5 }}>{description}</div>}
      </div>
      <Card style={{ padding: '0 20px' }}>
        {children}
      </Card>
    </div>
  );
}
