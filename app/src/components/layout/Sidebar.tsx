import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from '../primitives/Icon';
import { Avatar } from '../primitives/Avatar';
import { NAV_GROUPS } from '../../data';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { theme: t } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarSearch, setSidebarSearch] = useState('');

  const isLight = t.sidebarLight;
  const textColor = isLight ? t.text : '#fff';
  const mutedColor = isLight ? t.textMuted : t.sidebarText;
  const borderColor = t.sidebarBorder;

  const filteredGroups = useMemo(() => {
    if (!sidebarSearch) return NAV_GROUPS;
    const q = sidebarSearch.toLowerCase();
    return NAV_GROUPS.map(g => ({
      ...g,
      items: g.items.filter(item => item.label.toLowerCase().includes(q)),
    })).filter(g => g.items.length > 0);
  }, [sidebarSearch]);

  return (
    <nav style={{
      width: collapsed ? 56 : 220,
      flexShrink: 0,
      background: t.sidebar,
      borderRight: isLight ? `1px solid ${t.cardBorder}` : 'none',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 10,
    }}>

      {/* Logo */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center',
        padding: collapsed ? '0 14px' : '0 16px',
        gap: 10, flexShrink: 0,
        borderBottom: `1px solid ${borderColor}`,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: t.sidebarActive,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: 12, fontWeight: 800, color: '#fff',
          letterSpacing: '-0.02em',
        }}>A</div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: textColor, whiteSpace: 'nowrap', lineHeight: 1.2 }}>AdminOS</div>
            <div style={{ fontSize: 10, color: mutedColor, whiteSpace: 'nowrap' }}>v2.4.1</div>
          </div>
        )}
      </div>

      {/* Search */}
      {!collapsed && (
        <div style={{ padding: '10px 10px 4px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: isLight ? t.bgAlt : 'rgba(255,255,255,0.06)',
            borderRadius: 7, padding: '6px 10px',
          }}>
            <Icon name="search" size={12} color={mutedColor} />
            <input
              placeholder="Search…"
              value={sidebarSearch}
              onChange={e => setSidebarSearch(e.target.value)}
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 12, color: textColor, width: '100%', fontFamily: 'inherit',
              }}
            />
          </div>
        </div>
      )}

      {/* Nav groups */}
      <div style={{ flex: 1, padding: '8px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
        {filteredGroups.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 4 }}>
            {!collapsed && (
              <div style={{
                fontSize: 10, fontWeight: 700, color: mutedColor,
                letterSpacing: '0.08em', padding: '8px 8px 4px',
                opacity: 0.7,
              }}>{group.group}</div>
            )}
            {collapsed && gi > 0 && (
              <div style={{ height: 1, background: borderColor, margin: '6px 8px' }} />
            )}
            {group.items.map(item => {
              const active = location.pathname === item.path || (location.pathname === '/' && item.path === '/overview');
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  title={collapsed ? item.label : ''}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: collapsed ? '9px 12px' : '8px 10px',
                    borderRadius: 7, border: 'none', cursor: 'pointer',
                    background: active ? t.sidebarActiveBg : 'transparent',
                    color: active ? t.sidebarActive : mutedColor,
                    fontFamily: 'inherit', fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    textAlign: 'left', whiteSpace: 'nowrap',
                    width: '100%',
                    transition: 'background 0.12s, color 0.12s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = isLight ? t.bgAlt : t.sidebarAlt; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
                  <Icon name={item.icon} size={15} color="currentColor" />
                  {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                  {!collapsed && active && (
                    <span style={{ width: 5, height: 5, borderRadius: 999, background: t.sidebarActive }} />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User profile */}
      {!collapsed ? (
        <div
          style={{
            padding: '10px 12px',
            borderTop: `1px solid ${borderColor}`,
            display: 'flex', alignItems: 'center', gap: 9,
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = isLight ? t.bgAlt : t.sidebarAlt)}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
          <Avatar name="Amara Osei" size={30} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: textColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Amara Osei</div>
            <div style={{ fontSize: 10, color: mutedColor, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Admin</div>
          </div>
          <Icon name="logout" size={13} color={mutedColor} />
        </div>
      ) : (
        <div style={{ padding: '10px 12px', borderTop: `1px solid ${borderColor}`, display: 'flex', justifyContent: 'center' }}>
          <Avatar name="Amara Osei" size={28} />
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          margin: '4px 8px 10px', padding: '7px 10px', borderRadius: 7,
          border: 'none', cursor: 'pointer',
          background: 'transparent', color: mutedColor,
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'inherit', fontSize: 12,
          transition: 'background 0.12s',
          flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = isLight ? t.bgAlt : t.sidebarAlt)}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        <Icon name="menu" size={13} />
        {!collapsed && <span>Collapse</span>}
      </button>
    </nav>
  );
}
