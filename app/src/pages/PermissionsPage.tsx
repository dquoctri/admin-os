import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Icon } from '../components/primitives/Icon';
import { PageHeader } from '../components/primitives/PageHeader';
import { ROLES, RESOURCES } from '../data';

type Role = typeof ROLES[number];
type Resource = typeof RESOURCES[number];

const ROLE_ACCENTS: Record<string, string> = {
  admin:   '#e84848',
  manager: '#e8a030',
  editor:  '#4d8cff',
  viewer:  '#3ab88a',
};

function PermBox({ checked, onChange, color }: { checked: boolean; onChange: () => void; color: string }) {
  return (
    <div
      onClick={onChange}
      title={checked ? 'Allowed' : 'Denied'}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 26, height: 26, cursor: 'pointer', transition: 'all 0.15s',
        borderRadius: 6,
        background: checked ? color + '22' : 'transparent',
        border: `1.5px solid ${checked ? color : 'var(--cb)'}`,
      }}>
      {checked
        ? <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        : <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="var(--tf)" strokeWidth="1.5" strokeLinecap="round"/></svg>
      }
    </div>
  );
}

export function PermissionsPage() {
  const { theme: t, r } = useTheme();
  const [perms, setPerms] = useState<Record<string, Record<string, boolean>>>(() => {
    const init: Record<string, Record<string, boolean>> = {};
    ROLES.forEach((role: Role) => {
      init[role.id] = {};
      RESOURCES.forEach((res: Resource) => {
        res.actions.forEach((a: string) => {
          init[role.id][`${res.id}:${a}`] = role.level >= res.minLevel;
        });
      });
    });
    return init;
  });

  const togglePerm = (roleId: string, key: string) => {
    setPerms(p => ({ ...p, [roleId]: { ...p[roleId], [key]: !p[roleId][key] } }));
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 18,
      animation: 'fadeSlideIn 0.3s ease both',
      '--cb': t.cardBorder, '--tf': t.textFaint,
    } as React.CSSProperties}>
      <PageHeader
        title="Permissions"
        description="Manage role-based access control."
        actions={
          <>
            <Button variant="outline" size="sm" icon="plus">New Role</Button>
            <Button variant="primary" size="sm" icon="check">Save Changes</Button>
          </>
        }
      />

      {/* Role Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {ROLES.map((role: Role, i) => {
          const color = ROLE_ACCENTS[role.id] ?? t.accent;
          const permCount = Object.values(perms[role.id] ?? {}).filter(Boolean).length;
          return (
            <Card key={role.id} style={{ padding: '16px 18px', animation: `fadeSlideIn 0.3s ease ${i * 0.05}s both` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: r.sm + 2, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="shield" size={15} color={color} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: t.text, fontSize: 13 }}>{role.name}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{role.members} members</div>
                </div>
              </div>
              <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 10, lineHeight: 1.4 }}>{role.description}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color }}>{permCount} permissions</div>
            </Card>
          );
        })}
      </div>

      {/* Permission Matrix */}
      <Card style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Permission Matrix</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginLeft: 10 }}>Click cells to toggle access per role</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em', width: 150 }}>Resource</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em', width: 80 }}>Action</th>
                {ROLES.map((role: Role) => (
                  <th key={role.id} style={{ padding: '10px 20px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: ROLE_ACCENTS[role.id] ?? t.accent, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESOURCES.map((res: Resource) =>
                res.actions.map((action: string, ai) => {
                  const key = `${res.id}:${action}`;
                  const isFirst = ai === 0;
                  const isLast = ai === res.actions.length - 1;
                  return (
                    <tr key={key}
                      style={{ borderBottom: isLast ? `2px solid ${t.cardBorder}` : `1px solid ${t.cardBorder}55` }}
                      onMouseEnter={e => { e.currentTarget.style.background = t.bgAlt; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                      <td style={{ padding: '9px 16px', fontWeight: 600, color: isFirst ? t.text : 'transparent', fontSize: 12, whiteSpace: 'nowrap' }}>
                        {isFirst ? res.name : ''}
                      </td>
                      <td style={{ padding: '9px 14px', color: t.textMuted, textTransform: 'capitalize', fontSize: 11 }}>{action}</td>
                      {ROLES.map((role: Role) => (
                        <td key={role.id} style={{ padding: '9px 20px', textAlign: 'center' }}>
                          <PermBox
                            checked={perms[role.id]?.[key] ?? false}
                            onChange={() => togglePerm(role.id, key)}
                            color={ROLE_ACCENTS[role.id] ?? t.accent}
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
