import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface BadgeProps {
  children: React.ReactNode;
  color: string;
  bg: string;
  dot?: boolean;
}

export function Badge({ children, color, bg, dot }: BadgeProps) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: dot ? 5 : 0,
      padding: '2px 8px', borderRadius: 999,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
      color, background: bg, whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: 999, background: color, flexShrink: 0 }} />}
      {children}
    </span>
  );
}

type StatusKey = 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'refunded' | 'beta' | 'paid' | 'deprecated';

export function StatusBadge({ status }: { status: string }) {
  const { theme: t } = useTheme();
  const map: Record<StatusKey, { label: string; color: string; bg: string; dot: boolean }> = {
    active:    { label: 'Active',    color: t.success,   bg: t.successSoft, dot: true  },
    inactive:  { label: 'Inactive',  color: t.textMuted, bg: t.bgAlt,       dot: true  },
    pending:   { label: 'Pending',   color: t.warning,   bg: t.warningSoft, dot: true  },
    completed: { label: 'Completed', color: t.success,   bg: t.successSoft, dot: false },
    failed:    { label: 'Failed',    color: t.danger,    bg: t.dangerSoft,  dot: false },
    refunded:  { label: 'Refunded',  color: t.info,      bg: t.infoSoft,    dot: false },
    beta:       { label: 'Beta',       color: t.info,      bg: t.infoSoft,    dot: false },
    paid:       { label: 'Paid',       color: t.success,   bg: t.successSoft, dot: false },
    deprecated: { label: 'Deprecated', color: t.textMuted, bg: t.bgAlt,       dot: false },
  };
  const m = map[status as StatusKey] ?? { label: status, color: t.textMuted, bg: t.bgAlt, dot: false };
  return <Badge color={m.color} bg={m.bg} dot={m.dot}>{m.label}</Badge>;
}
