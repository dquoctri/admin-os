import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { Select } from '../components/primitives/Select';
import { Checkbox } from '../components/primitives/Checkbox';
import { StatusBadge } from '../components/primitives/Badge';
import { Avatar } from '../components/primitives/Avatar';
import { Icon } from '../components/primitives/Icon';
import { Tooltip } from '../components/primitives/Tooltip';
import { Modal } from '../components/primitives/Modal';
import { EmptyState } from '../components/primitives/EmptyState';
import { PageHeader } from '../components/primitives/PageHeader';
import { USERS_TABLE } from '../data';

const PER_PAGE = 8;
type User = typeof USERS_TABLE[number];

export function UsersPage() {
  const { theme: t } = useTheme();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [searchQ, setSearchQ] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');

  const roles = ['all', ...Array.from(new Set(USERS_TABLE.map(u => u.role)))];

  const filtered = USERS_TABLE.filter(u =>
    (filterRole === 'all' || u.role === filterRole) &&
    (filterStatus === 'all' || u.status === filterStatus) &&
    (!searchQ || u.name.toLowerCase().includes(searchQ.toLowerCase()) || u.email.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const allSelected = paginated.length > 0 && paginated.every(u => selected.has(u.id));

  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelected) paginated.forEach(u => next.delete(u.id));
    else paginated.forEach(u => next.add(u.id));
    setSelected(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeSlideIn 0.3s ease both' }}>
      <PageHeader
        title="Users"
        description={`${filtered.length} members`}
        actions={
          <>
            {selected.size > 0 && <Button variant="danger" size="sm" icon="trash">{selected.size} selected</Button>}
            <Button variant="outline" size="sm" icon="download">Export</Button>
            <Button variant="primary" size="sm" icon="plus" onClick={() => setInviteModal(true)}>Invite User</Button>
          </>
        }
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Input placeholder="Search users…" value={searchQ} onChange={e => setSearchQ(e.target.value)} icon="search" style={{ width: 220 }} />
        <Select value={filterRole} onChange={v => { setFilterRole(v); setPage(1); }} options={roles.map(r => ({ value: r, label: r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1) }))} />
        <div style={{ display: 'flex', gap: 4 }}>
          {['all', 'active', 'inactive'].map(f => (
            <button key={f} onClick={() => { setFilterStatus(f); setPage(1); }}
              style={{
                padding: '5px 11px', borderRadius: 6, border: `1px solid ${filterStatus === f ? t.accent : t.cardBorder}`,
                background: filterStatus === f ? t.accentSoft : 'transparent',
                color: filterStatus === f ? t.accentText : t.textMuted,
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                textTransform: 'capitalize', transition: 'all 0.12s',
              }}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          <button onClick={() => setViewMode('table')} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${viewMode === 'table' ? t.accent : t.cardBorder}`, background: viewMode === 'table' ? t.accentSoft : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="list" size={13} color={viewMode === 'table' ? t.accent : t.textMuted} />
          </button>
          <button onClick={() => setViewMode('grid')} style={{ width: 30, height: 30, borderRadius: 6, border: `1px solid ${viewMode === 'grid' ? t.accent : t.cardBorder}`, background: viewMode === 'grid' ? t.accentSoft : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="grid" size={13} color={viewMode === 'grid' ? t.accent : t.textMuted} />
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                  <th style={{ padding: '11px 16px', width: 40 }}>
                    <Checkbox checked={allSelected} indeterminate={selected.size > 0 && !allSelected} onChange={toggleAll} />
                  </th>
                  {['User', 'Role', 'Status', 'Joined', 'Last Active'].map(h => (
                    <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                  <th style={{ padding: '11px 14px' }} />
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0
                  ? <tr><td colSpan={7}><EmptyState title="No users found" sub="Try adjusting your search or filters" icon="users" /></td></tr>
                  : paginated.map((u, i) => (
                    <tr key={u.id}
                      style={{ borderBottom: i < paginated.length - 1 ? `1px solid ${t.cardBorder}` : 'none', background: selected.has(u.id) ? t.accentSoft : 'transparent', transition: 'background 0.12s' }}
                      onMouseEnter={e => { if (!selected.has(u.id)) e.currentTarget.style.background = t.bgAlt; }}
                      onMouseLeave={e => { e.currentTarget.style.background = selected.has(u.id) ? t.accentSoft : 'transparent'; }}>
                      <td style={{ padding: '11px 16px' }}>
                        <Checkbox checked={selected.has(u.id)} onChange={c => { const n = new Set(selected); c ? n.add(u.id) : n.delete(u.id); setSelected(n); }} />
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={u.name} size={30} />
                          <div>
                            <div style={{ fontWeight: 600, color: t.text, fontSize: 13 }}>{u.name}</div>
                            <div style={{ fontSize: 11, color: t.textMuted }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: t.accentSoft, color: t.accentText, textTransform: 'capitalize' }}>{u.role}</span>
                      </td>
                      <td style={{ padding: '11px 14px' }}><StatusBadge status={u.status} /></td>
                      <td style={{ padding: '11px 14px', color: t.textMuted, fontSize: 12 }}>{u.joined}</td>
                      <td style={{ padding: '11px 14px', color: t.textMuted, fontSize: 12 }}>{u.lastActive}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <div className="row-actions" style={{ display: 'flex', gap: 4, opacity: 0 }}>
                          <Tooltip text="View"><Button variant="ghost" size="xs" icon="eye" /></Tooltip>
                          <Tooltip text="Edit"><Button variant="ghost" size="xs" icon="edit" /></Tooltip>
                          <Tooltip text="Delete"><Button variant="ghost" size="xs" icon="trash" /></Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div style={{ padding: '12px 16px', borderTop: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: t.textMuted, flex: 1 }}>
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </span>
              <Button variant="outline" size="xs" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${page === i + 1 ? t.accent : t.cardBorder}`, background: page === i + 1 ? t.accent : 'transparent', color: page === i + 1 ? '#fff' : t.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                  {i + 1}
                </button>
              ))}
              <Button variant="outline" size="xs" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</Button>
            </div>
          )}
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {paginated.length === 0
            ? <div style={{ gridColumn: '1 / -1' }}><EmptyState title="No users found" sub="Try adjusting your search or filters" icon="users" /></div>
            : paginated.map((u, i) => (
              <Card key={u.id} style={{ padding: '20px 18px', animation: `fadeSlideIn 0.3s ease ${i * 0.04}s both`, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                  <Avatar name={u.name} size={48} />
                </div>
                <div style={{ fontWeight: 700, color: t.text, marginBottom: 2 }}>{u.name}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 10 }}>{u.email}</div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: t.accentSoft, color: t.accentText, textTransform: 'capitalize' }}>{u.role}</span>
                  <StatusBadge status={u.status} />
                </div>
                <div style={{ fontSize: 11, color: t.textFaint }}>Joined {u.joined}</div>
              </Card>
            ))}
        </div>
      )}

      {/* Shared pagination for grid view */}
      {viewMode === 'grid' && totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 4 }}>
          <span style={{ fontSize: 12, color: t.textMuted, flex: 1 }}>
            Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <Button variant="outline" size="xs" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${page === i + 1 ? t.accent : t.cardBorder}`, background: page === i + 1 ? t.accent : 'transparent', color: page === i + 1 ? '#fff' : t.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
              {i + 1}
            </button>
          ))}
          <Button variant="outline" size="xs" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</Button>
        </div>
      )}

      <Modal open={inviteModal} onClose={() => setInviteModal(false)} title="Invite User"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setInviteModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm" icon="send" onClick={() => setInviteModal(false)}>Send Invite</Button>
          </>
        }>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 6 }}>Email Address</div>
            <Input placeholder="colleague@company.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} icon="mail" style={{ width: '100%' }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: t.textMuted, marginBottom: 6 }}>Role</div>
            <Select value={inviteRole} onChange={setInviteRole} options={[
              { value: 'viewer', label: 'Viewer' },
              { value: 'editor', label: 'Editor' },
              { value: 'admin', label: 'Admin' },
            ]} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
