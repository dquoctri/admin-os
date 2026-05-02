import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SettingRowProps {
  label: string;
  description?: string;
  control?: React.ReactNode;
  children?: React.ReactNode;
  danger?: boolean;
}

export function SettingRow({ label, description, control, children, danger }: SettingRowProps) {
  const { theme: t } = useTheme();
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '14px 0',
      borderBottom: `1px solid ${t.cardBorder}`,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: danger ? t.danger : t.text }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3, lineHeight: 1.5 }}>{description}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children ?? control}</div>
    </div>
  );
}
