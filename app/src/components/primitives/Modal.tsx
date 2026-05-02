import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from './Icon';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const { theme: t, r } = useTheme();
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeSlideIn 0.15s ease both',
      }}
      onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: r.lg + 4, boxShadow: t.shadowLg,
          width: 440, maxWidth: '90vw',
          animation: 'fadeSlideIn 0.2s ease both',
        }}>
        <div style={{
          padding: '16px 20px', borderBottom: `1px solid ${t.cardBorder}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text, flex: 1 }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: t.textMuted, display: 'flex', padding: 4, borderRadius: 6,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = t.bgAlt)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <Icon name="x" size={14} />
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
        {footer && (
          <div style={{
            padding: '12px 20px', borderTop: `1px solid ${t.cardBorder}`,
            display: 'flex', justifyContent: 'flex-end', gap: 8,
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
