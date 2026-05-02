import React from 'react';
import { useLocation } from 'react-router-dom';
import { EmptyState } from '../components/primitives/EmptyState';
import { Card } from '../components/primitives/Card';

export function PlaceholderPage() {
  const { pathname } = useLocation();
  const name = pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2);

  return (
    <div style={{ animation: 'fadeSlideIn 0.3s ease both' }}>
      <Card>
        <EmptyState
          title={`${name} — Coming Soon`}
          sub="This page is under construction. Check back soon."
          icon="box"
        />
      </Card>
    </div>
  );
}
