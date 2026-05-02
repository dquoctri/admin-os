import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { QuickAddModal } from './QuickAddModal';
import { ThemePanel } from './ThemePanel';
import { Skeleton } from '../primitives/Skeleton';
import { Card } from '../primitives/Card';

function SkeletonPage() {
  const { theme: t } = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4 }}>
        <div style={{ flex: 1 }}>
          <Skeleton w="180px" h={22} r={8} />
          <div style={{ marginTop: 6 }}><Skeleton w="280px" h={13} r={6} /></div>
        </div>
        <Skeleton w="90px" h={30} r={7} />
        <Skeleton w="130px" h={30} r={7} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: 20 }}>
            <Skeleton w="70%" h={11} r={4} />
            <div style={{ marginTop: 12 }}><Skeleton w="55%" h={26} r={6} /></div>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton w="90px" h={11} r={4} />
              <Skeleton w="60px" h={24} r={4} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 12 }}>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: 20 }}>
          <Skeleton w="40%" h={14} r={5} />
          <div style={{ marginTop: 6 }}><Skeleton w="25%" h={11} r={4} /></div>
          <div style={{ marginTop: 20, height: 130, background: t.bgAlt, borderRadius: 8 }} />
        </div>
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 14, padding: 20 }}>
          <Skeleton w="50%" h={14} r={5} />
          <div style={{ marginTop: 20, height: 130, background: t.bgAlt, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}

export function AppShell() {
  const { theme: t, density } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [quickAdd, setQuickAdd] = useState(false);

  const densityPad = { compact: 16, default: 22, spacious: 32 }[density];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: t.bg, color: t.text,
      fontFamily: "'DM Sans', sans-serif",
      transition: 'background 0.25s ease, color 0.2s ease',
    }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar onQuickAdd={() => setQuickAdd(true)} />
        <main style={{ flex: 1, overflowY: 'auto', padding: densityPad }}>
          {loading ? <SkeletonPage /> : <Outlet />}
        </main>
      </div>

      <QuickAddModal open={quickAdd} onClose={() => setQuickAdd(false)} />
      <ThemePanel />
    </div>
  );
}
