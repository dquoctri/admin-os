import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../primitives/Icon';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import { Badge } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { NOTIFICATIONS } from '../../data';

interface TopbarProps {
  onQuickAdd: () => void;
}

export function Topbar({ onQuickAdd }: TopbarProps) {
  const { theme: t } = useTheme();
  const location = useLocation();
  const [searchVal, setSearchVal] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const pageName = location.pathname.replace('/', '') || 'overview';

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const typeColor: Record<string, string> = {
    success: t.success, warning: t.warning, danger: t.danger, info: t.accent,
  };

  return (
    <header style={{
      height: 56, background: t.topbar,
      borderBottom: `1px solid ${t.cardBorder}`,
      display: 'flex', alignItems: 'center', padding: '0 20px',
      gap: 12, flexShrink: 0, position: 'relative', zIndex: 20,
    }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: t.textMuted }}>
        <span style={{ fontWeight: 500 }}>AdminOS</span>
        <Icon name="chevron-right" size={12} color={t.textFaint} />
        <span style={{ color: t.text, fontWeight: 700, textTransform: 'capitalize' }}>{pageName}</span>
      </div>

      <div style={{ flex: 1 }} />

      <Input
        placeholder="Search anything…"
        value={searchVal}
        onChange={e => setSearchVal(e.target.value)}
        icon="search"
        style={{ width: 220 }}
      />

      <Button variant="primary" size="sm" icon="plus" onClick={onQuickAdd}>New</Button>

      {/* Notifications */}
      <div ref={notifRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setNotifOpen(o => !o); setUserOpen(false); }}
          style={{
            position: 'relative', width: 34, height: 34, borderRadius: 8,
            background: notifOpen ? t.bgAlt : 'transparent',
            border: `1px solid ${notifOpen ? t.accent : t.cardBorder}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: t.textMuted, transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = t.bgAlt; e.currentTarget.style.color = t.text; }}
          onMouseLeave={e => { if (!notifOpen) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = t.textMuted; } }}>
          <Icon name="bell" size={14} />
          {unread > 0 && (
            <span style={{
              position: 'absolute', top: 5, right: 5, width: 7, height: 7,
              background: t.danger, borderRadius: 999,
              border: `2px solid ${t.topbar}`,
            }} />
          )}
        </button>

        {notifOpen && (
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
            width: 320, background: t.card,
            border: `1px solid ${t.cardBorder}`, borderRadius: 12,
            boxShadow: t.shadowLg,
            animation: 'fadeSlideIn 0.15s ease both', zIndex: 100,
            overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: t.text, flex: 1 }}>Notifications</span>
              {unread > 0 && <Badge color={t.accent} bg={t.accentSoft}>{unread} new</Badge>}
            </div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} style={{
                padding: '10px 16px', display: 'flex', gap: 10,
                background: n.read ? 'transparent' : t.accentSoft,
                borderTop: `1px solid ${t.cardBorder}`,
                cursor: 'pointer', transition: 'background 0.12s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = t.bgAlt)}
                onMouseLeave={e => (e.currentTarget.style.background = n.read ? 'transparent' : t.accentSoft)}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: typeColor[n.type] ?? t.accent, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: t.text, fontWeight: n.read ? 400 : 600, lineHeight: 1.4 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 16px', borderTop: `1px solid ${t.cardBorder}`, textAlign: 'center' }}>
              <span style={{ fontSize: 12, color: t.accent, fontWeight: 600, cursor: 'pointer' }}>View all notifications</span>
            </div>
          </div>
        )}
      </div>

      {/* User menu */}
      <div ref={userRef} style={{ position: 'relative' }}>
        <button
          onClick={() => { setUserOpen(o => !o); setNotifOpen(false); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'transparent', border: `1px solid ${userOpen ? t.accent : t.cardBorder}`,
            borderRadius: 8, padding: '3px 8px 3px 4px', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = t.accent)}
          onMouseLeave={e => { if (!userOpen) e.currentTarget.style.borderColor = t.cardBorder; }}>
          <Avatar name="Amara Osei" size={26} />
          <span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Amara</span>
          <Icon name="chevron-down" size={11} color={t.textMuted} />
        </button>

        {userOpen && (
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
            width: 200, background: t.card,
            border: `1px solid ${t.cardBorder}`, borderRadius: 10,
            boxShadow: t.shadowLg,
            animation: 'fadeSlideIn 0.15s ease both', zIndex: 100,
            overflow: 'hidden', padding: '6px',
          }}>
            {[
              { label: 'Profile',  icon: 'user',     danger: false },
              { label: 'Settings', icon: 'settings', danger: false },
              { label: 'Sign out', icon: 'logout',   danger: true },
            ].map(item => (
              <button key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 9, width: '100%',
                padding: '8px 10px', borderRadius: 6, border: 'none',
                background: 'transparent', cursor: 'pointer',
                color: item.danger ? t.danger : t.text,
                fontSize: 13, fontFamily: 'inherit', textAlign: 'left',
                transition: 'background 0.12s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = item.danger ? t.dangerSoft : t.bgAlt)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <Icon name={item.icon} size={13} color="currentColor" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
