import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Select } from '../components/primitives/Select';
import { Icon } from '../components/primitives/Icon';
import { PageHeader } from '../components/primitives/PageHeader';
import { BarChart } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { StatBar } from '../components/charts/StatBar';
import { LINE_MULTI, WEEKLY_SESSIONS } from '../data';

export function AnalyticsPage() {
  const { theme: t } = useTheme();
  const [period, setPeriod] = useState('last30');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeSlideIn 0.3s ease both' }}>
      <PageHeader
        title="Analytics"
        description="Track performance across all channels."
        actions={
          <>
            <Select value={period} onChange={setPeriod} options={[
              { value: 'last7', label: 'Last 7 days' }, { value: 'last30', label: 'Last 30 days' },
              { value: 'last90', label: 'Last 90 days' }, { value: 'ytd', label: 'Year to date' },
            ]} />
            <Button variant="outline" size="sm" icon="download">Export</Button>
            <Button variant="primary" size="sm" icon="refresh">Refresh</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Pageviews',    value: '1.24M',  change: +18.2 },
          { label: 'Bounce Rate',  value: '38.4%',  change: -4.1 },
          { label: 'New Visitors', value: '64.2%',  change: +2.8 },
          { label: 'Avg Duration', value: '3m 14s', change: +6.0 },
        ].map((s, i) => (
          <Card key={i} style={{ padding: '14px 18px', animation: `fadeSlideIn 0.35s ease ${i * 0.06}s both` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, marginTop: 4, color: s.change > 0 ? t.success : t.danger, fontWeight: 600 }}>
              <Icon name={s.change > 0 ? 'arrow-up' : 'arrow-down'} size={10} color="currentColor" />
              {s.change > 0 ? '+' : ''}{s.change}% vs prev
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Traffic Overview</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>Sessions, pageviews and conversions</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
            {['Sessions', 'Revenue', 'Conversions'].map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: t.chartColors[i] }} />
                <span style={{ fontSize: 12, color: t.textMuted }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <LineChart
          series={[
            { name: 'Sessions',    data: [30,45,38,60,55,72,50,80,65,52,75,88], color: t.chartColors[0] },
            { name: 'Revenue',     data: [42,58,47,73,68,85,62,91,78,65,88,96], color: t.chartColors[1] },
            { name: 'Conversions', data: [12,18,14,24,20,30,22,35,28,20,30,40], color: t.chartColors[2] },
          ]}
          labels={LINE_MULTI.labels}
          height={160}
          width={800}
        />
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }}>Weekly Sessions</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 14 }}>This week's daily breakdown</div>
          <BarChart data={WEEKLY_SESSIONS} height={110} />
        </Card>
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 16 }}>Top Pages</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { page: '/dashboard', views: 8420, pct: 100 },
              { page: '/users',     views: 4210, pct: 50  },
              { page: '/analytics', views: 3180, pct: 38  },
              { page: '/orders',    views: 2840, pct: 34  },
              { page: '/settings',  views: 1920, pct: 23  },
            ].map((p, i) => (
              <StatBar key={i} label={p.page} value={p.views} max={8420} color={t.chartColors[i % t.chartColors.length]} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
