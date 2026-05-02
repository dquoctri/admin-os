import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { Select } from '../components/primitives/Select';
import { StatusBadge } from '../components/primitives/Badge';
import { Icon } from '../components/primitives/Icon';
import { EmptyState } from '../components/primitives/EmptyState';
import { PageHeader } from '../components/primitives/PageHeader';
import { PRODUCTS } from '../data';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'security', label: 'Security' },
  { value: 'communication', label: 'Communication' },
];

const SORT_OPTIONS = [
  { value: 'name', label: 'Name A–Z' },
  { value: 'price', label: 'Price' },
  { value: 'users', label: 'Users' },
];

type Product = typeof PRODUCTS[number];

export function ProductsPage() {
  const { theme: t } = useTheme();
  const [searchQ, setSearchQ] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filtered = PRODUCTS.filter((p: Product) =>
    (filterCat === 'all' || p.category.toLowerCase() === filterCat) &&
    (filterStatus === 'all' || p.status === filterStatus) &&
    (!searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()))
  ).sort((a: Product, b: Product) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
    if (sortBy === 'users') return (b.users ?? 0) - (a.users ?? 0);
    return 0;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeSlideIn 0.3s ease both' }}>
      <PageHeader
        title="Products"
        description={`${filtered.length} products`}
        actions={
          <>
            <Button variant="outline" size="sm" icon="download">Export</Button>
            <Button variant="primary" size="sm" icon="plus">New Product</Button>
          </>
        }
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Input placeholder="Search products…" value={searchQ} onChange={e => setSearchQ(e.target.value)} icon="search" style={{ width: 220 }} />
        <Select value={filterCat} onChange={v => setFilterCat(v)} options={CATEGORY_OPTIONS} />
        <Select value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
        <div style={{ display: 'flex', gap: 4 }}>
          {['all', 'active', 'beta', 'deprecated'].map(f => (
            <button key={f} onClick={() => setFilterStatus(f)}
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

      {filtered.length === 0 ? (
        <Card><EmptyState title="No products found" sub="Try adjusting your search or filters" icon="box" /></Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {filtered.map((p: Product, i) => (
            <Card key={p.id} style={{ padding: 20, animation: `fadeSlideIn 0.3s ease ${i * 0.04}s both` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: t.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={p.icon as string || 'box'} size={20} color={t.accent} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{p.name}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{p.category}</div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5, marginBottom: 16, minHeight: 36 }}>{p.description}</div>

              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 10, color: t.textFaint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Price</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{p.price}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: t.textFaint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Users</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{(p.users ?? 0).toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: t.textFaint, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Revenue</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{p.revenue}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 6, paddingTop: 14, borderTop: `1px solid ${t.cardBorder}` }}>
                <Button variant="outline" size="xs" icon="eye" style={{ flex: 1 }}>View</Button>
                <Button variant="outline" size="xs" icon="edit" style={{ flex: 1 }}>Edit</Button>
                <Button variant="ghost" size="xs" icon="more-v" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
