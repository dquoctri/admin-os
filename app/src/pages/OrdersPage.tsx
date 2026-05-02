import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { Checkbox } from '../components/primitives/Checkbox';
import { StatusBadge } from '../components/primitives/Badge';
import { Avatar } from '../components/primitives/Avatar';
import { Icon } from '../components/primitives/Icon';
import { Tooltip } from '../components/primitives/Tooltip';
import { Modal } from '../components/primitives/Modal';
import { EmptyState } from '../components/primitives/EmptyState';
import { PageHeader } from '../components/primitives/PageHeader';
import { ORDERS_TABLE } from '../data';

const COLS = [
  { key: 'id', label: 'Order ID' }, { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' }, { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' }, { key: 'date', label: 'Date' },
];
const PER_PAGE = 5;

type Order = typeof ORDERS_TABLE[number];

export function OrdersPage() {
  const { theme: t } = useTheme();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortCol, setSortCol] = useState('id');
  const [sortDir, setSortDir] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQ, setSearchQ] = useState('');
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<Order | null>(null);

  const filtered = ORDERS_TABLE.filter(o =>
    (filterStatus === 'all' || o.status === filterStatus) &&
    (!searchQ || o.customer.toLowerCase().includes(searchQ.toLowerCase()) || o.id.includes(searchQ))
  );

  const sorted = [...filtered].sort((a, b) => {
    const av = (a as Record<string, string>)[sortCol] ?? '';
    const bv = (b as Record<string, string>)[sortCol] ?? '';
    return av < bv ? -sortDir : av > bv ? sortDir : 0;
  });

  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const allSelected = paginated.length > 0 && paginated.every(o => selected.has(o.id));

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => -d);
    else { setSortCol(col); setSortDir(1); }
  };

  const toggleAll = () => {
    const next = new Set(selected);
    if (allSelected) paginated.forEach(o => next.delete(o.id));
    else paginated.forEach(o => next.add(o.id));
    setSelected(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeSlideIn 0.3s ease both' }}>
      <PageHeader
        title="Orders"
        description={`${filtered.length} orders total`}
        actions={
          <>
            {selected.size > 0 && <Button variant="danger" size="sm" icon="trash">{selected.size} selected</Button>}
            <Button variant="outline" size="sm" icon="download">Export CSV</Button>
            <Button variant="primary" size="sm" icon="plus">New Order</Button>
          </>
        }
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Input placeholder="Search orders…" value={searchQ} onChange={e => setSearchQ(e.target.value)} icon="search" style={{ width: 220 }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {['all', 'completed', 'pending', 'failed', 'refunded'].map(f => (
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
        <div style={{ marginLeft: 'auto', fontSize: 12, color: t.textMuted }}>{filtered.length} results</div>
      </div>

      <Card style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                <th style={{ padding: '11px 16px', width: 40 }}>
                  <Checkbox checked={allSelected} indeterminate={selected.size > 0 && !allSelected} onChange={toggleAll} />
                </th>
                {COLS.map(c => (
                  <th key={c.key} onClick={() => toggleSort(c.key)}
                    style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {c.label}
                      {sortCol === c.key
                        ? <Icon name={sortDir > 0 ? 'arrow-up' : 'arrow-down'} size={10} color={t.accent} />
                        : <Icon name="sort" size={10} color={t.textFaint} />}
                    </div>
                  </th>
                ))}
                <th style={{ padding: '11px 14px' }} />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0
                ? <tr><td colSpan={8}><EmptyState title="No orders found" sub="Try adjusting your search or filters" icon="orders" /></td></tr>
                : paginated.map((o, i) => (
                  <tr key={o.id}
                    style={{ borderBottom: i < paginated.length - 1 ? `1px solid ${t.cardBorder}` : 'none', background: selected.has(o.id) ? t.accentSoft : 'transparent', transition: 'background 0.12s' }}
                    onMouseEnter={e => { if (!selected.has(o.id)) e.currentTarget.style.background = t.bgAlt; }}
                    onMouseLeave={e => { e.currentTarget.style.background = selected.has(o.id) ? t.accentSoft : 'transparent'; }}>
                    <td style={{ padding: '11px 16px' }}>
                      <Checkbox checked={selected.has(o.id)}
                        onChange={c => { const n = new Set(selected); c ? n.add(o.id) : n.delete(o.id); setSelected(n); }} />
                    </td>
                    <td style={{ padding: '11px 14px', fontFamily: "'DM Mono',monospace", fontSize: 11, color: t.textMuted }}>{o.id}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar name={o.customer} size={26} />
                        <span style={{ fontWeight: 600, color: t.text }}>{o.customer}</span>
                      </div>
                    </td>
                    <td style={{ padding: '11px 14px', color: t.textMuted, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.product}</td>
                    <td style={{ padding: '11px 14px', fontWeight: 700, color: t.text }}>{o.amount}</td>
                    <td style={{ padding: '11px 14px' }}><StatusBadge status={o.status} /></td>
                    <td style={{ padding: '11px 14px', color: t.textMuted, whiteSpace: 'nowrap' }}>{o.date}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <div className="row-actions" style={{ display: 'flex', gap: 4, opacity: 0 }}>
                        <Tooltip text="View"><Button variant="ghost" size="xs" icon="eye" /></Tooltip>
                        <Tooltip text="Edit"><Button variant="ghost" size="xs" icon="edit" /></Tooltip>
                        <Tooltip text="Delete"><Button variant="ghost" size="xs" icon="trash" onClick={() => setDeleteModal(o)} /></Tooltip>
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
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, sorted.length)} of {sorted.length}
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

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Confirm Delete"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteModal(null)}>Cancel</Button>
            <Button variant="danger" size="sm" icon="trash" onClick={() => setDeleteModal(null)}>Delete Order</Button>
          </>
        }>
        {deleteModal && (
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.6 }}>
            Are you sure you want to delete order <strong style={{ color: t.text }}>{deleteModal.id}</strong> from <strong style={{ color: t.text }}>{deleteModal.customer}</strong>? This action cannot be undone.
          </div>
        )}
      </Modal>
    </div>
  );
}
