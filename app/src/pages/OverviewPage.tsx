import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/primitives/Card';
import { Button } from '../components/primitives/Button';
import { Select } from '../components/primitives/Select';
import { Icon } from '../components/primitives/Icon';
import { PageHeader } from '../components/primitives/PageHeader';
import { Sparkline } from '../components/charts/Sparkline';
import { BarChart } from '../components/charts/BarChart';
import { LineChart } from '../components/charts/LineChart';
import { DonutChart } from '../components/charts/DonutChart';
import { KPI_DATA, MONTHLY_REVENUE, TRAFFIC_SOURCES, LINE_MULTI, RECENT_ACTIVITY } from '../data';

export function OverviewPage() {
  const { theme: t } = useTheme();
  const [period, setPeriod] = React.useState('last30');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeSlideIn 0.3s ease both' }}>
      <PageHeader
        title="Overview"
        description="Welcome back, Amara. Here's what's happening today."
        actions={
          <>
            <Button variant="outline" size="sm" icon="download">Export</Button>
            <Select value={period} onChange={setPeriod} options={[
              { value: 'last7', label: 'Last 7 days' },
              { value: 'last30', label: 'Last 30 days' },
              { value: 'last90', label: 'Last 90 days' },
            ]} />
          </>
        }
      />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {KPI_DATA.map((item, i) => {
          const up = item.change > 0;
          return (
            <Card key={i} style={{ padding: '18px 20px', animation: `fadeSlideIn 0.35s ease ${i * 0.06}s both` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>{item.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.text, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 8 }}>{item.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                  <span style={{ color: up ? t.success : t.danger, display: 'flex', alignItems: 'center', gap: 2, fontWeight: 700 }}>
                    <Icon name={up ? 'arrow-up' : 'arrow-down'} size={11} color={up ? t.success : t.danger} />
                    {up ? '+' : ''}{item.change}%
                  </span>
                  <span style={{ color: t.textFaint }}>{item.suffix}</span>
                </div>
                <Sparkline data={item.trend} color={up ? t.success : t.danger} width={60} height={24} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>Monthly Revenue</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>12-month breakdown</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              <Button variant="ghost" size="xs">Bar</Button>
              <Button variant="ghost" size="xs">Line</Button>
            </div>
          </div>
          <BarChart data={MONTHLY_REVENUE} height={130} />
        </Card>

        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 4 }}>Traffic Sources</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 16 }}>Last 30 days</div>
          <DonutChart data={TRAFFIC_SOURCES} size={110} strokeWidth={18} />
        </Card>
      </div>

      {/* Line + Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12 }}>
        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>Session Volume</div>
          <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 14 }}>Revenue vs sessions this year</div>
          <LineChart
            series={LINE_MULTI.series.map((s, i) => ({ ...s, color: t.chartColors[i] }))}
            labels={LINE_MULTI.labels}
            height={100}
          />
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            {LINE_MULTI.series.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: t.chartColors[i] }} />
                <span style={{ fontSize: 11, color: t.textMuted }}>{s.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 14 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {RECENT_ACTIVITY.map((a, i) => {
              const colorMap: Record<string, string> = { success: t.success, warning: t.warning, danger: t.danger, info: t.accent };
              const c = colorMap[a.type] ?? t.accent;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  paddingBottom: i < RECENT_ACTIVITY.length - 1 ? 12 : 0,
                  marginBottom: i < RECENT_ACTIVITY.length - 1 ? 12 : 0,
                  borderBottom: i < RECENT_ACTIVITY.length - 1 ? `1px solid ${t.cardBorder}` : 'none',
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: c + '18', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={a.icon} size={13} color={c} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t.text, lineHeight: 1.3 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.sub}</div>
                  </div>
                  <div style={{ fontSize: 10, color: t.textFaint, flexShrink: 0, marginTop: 1 }}>{a.time}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
