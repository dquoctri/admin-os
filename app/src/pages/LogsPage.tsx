import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { Select } from '../components/primitives/Select';
import { Icon } from '../components/primitives/Icon';
import { EmptyState } from '../components/primitives/EmptyState';
import { PageHeader } from '../components/primitives/PageHeader';
import { LOG_DATA } from '../data';

const SEVERITY_COLORS: Record<string, string> = {
  info: '#0ea5e9',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

const PER_PAGE = 12;
type Log = typeof LOG_DATA[number];

export function LogsPage() {
  const { theme: t } = useTheme();
  const [searchQ, setSearchQ] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const types = ['all', ...Array.from(new Set(LOG_DATA.map((l: Log) => l.type)))];

  const filtered = LOG_DATA.filter((l: Log) =>
    (filterSeverity === 'all' || l.severity === filterSeverity) &&
    (filterType === 'all' || l.type === filterType) &&
    (!searchQ || l.message.toLowerCase().includes(searchQ.toLowerCase()) || l.user.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const toggleExpand = (id: string) => {
    const next = new Set(expanded);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpanded(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeSlideIn 0.3s ease both' }}>
      <PageHeader
        title="Audit Logs"
        description="System activity and event history."
        actions={
          <>
            <Button variant="outline" size="sm" icon="download">Export Logs</Button>
            <Button variant="outline" size="sm" icon="refresh">Refresh</Button>
          </>
        }
      />

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Input placeholder="Search logs…" value={searchQ} onChange={e => setSearchQ(e.target.value)} icon="search" style={{ width: 240 }} />
        <Select value={filterSeverity} onChange={v => { setFilterSeverity(v); setPage(1); }} options={[
          { value: 'all', label: 'All Severity' },
          { value: 'info', label: 'Info' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
        ]} />
        <Select value={filterType} onChange={v => { setFilterType(v); setPage(1); }} options={types.map(t => ({ value: t, label: t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1) }))} />
        <div style={{ marginLeft: 'auto', fontSize: 12, color: t.textMuted }}>{filtered.length} entries</div>
      </div>

      <Card style={{ overflow: 'hidden' }}>
        {paginated.length === 0 ? (
          <EmptyState title="No logs found" sub="Try adjusting your search or filters" icon="logs" />
        ) : (
          <div style={{ fontFamily: "'DM Mono', monospace" }}>
            {paginated.map((log: Log, i) => {
              const isExpanded = expanded.has(log.id);
              const sev = SEVERITY_COLORS[log.severity] ?? t.accent;
              return (
                <div key={log.id} style={{ borderBottom: i < paginated.length - 1 ? `1px solid ${t.cardBorder}` : 'none' }}>
                  <div
                    onClick={() => toggleExpand(log.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = t.bgAlt; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                    <div style={{ width: 6, height: 6, borderRadius: 999, background: sev, flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: sev, textTransform: 'uppercase', width: 56, flexShrink: 0 }}>{log.severity}</span>
                    <span style={{ fontSize: 11, color: t.textFaint, width: 130, flexShrink: 0, whiteSpace: 'nowrap' }}>{log.timestamp}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, width: 90, flexShrink: 0, textTransform: 'capitalize' }}>{log.type}</span>
                    <span style={{ fontSize: 12, color: t.text, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.message}</span>
                    <span style={{ fontSize: 11, color: t.textMuted, width: 110, flexShrink: 0, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.user}</span>
                    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={12} color={t.textFaint} />
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '12px 16px 16px 46px', background: t.bgAlt, borderTop: `1px solid ${t.cardBorder}` }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
                        {[
                          { label: 'Event ID', value: log.id },
                          { label: 'IP Address', value: log.ip ?? '—' },
                          { label: 'User Agent', value: log.userAgent ?? '—' },
                        ].map((f, fi) => (
                          <div key={fi}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 3 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: t.text, wordBreak: 'break-all' }}>{f.value}</div>
                          </div>
                        ))}
                      </div>
                      {log.meta && (
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 600, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Metadata</div>
                          <pre style={{ fontSize: 11, color: t.text, background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 6, padding: '8px 12px', overflowX: 'auto', margin: 0 }}>
                            {JSON.stringify(log.meta, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ padding: '12px 16px', borderTop: `1px solid ${t.cardBorder}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: t.textMuted, flex: 1 }}>
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <Button variant="outline" size="xs" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</Button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${page === i + 1 ? t.accent : t.cardBorder}`, background: page === i + 1 ? t.accent : 'transparent', color: page === i + 1 ? '#fff' : t.textMuted, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                {i + 1}
              </button>
            ))}
            <Button variant="outline" size="xs" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
