import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
          transform: 'translateX(-50%)',
          background: '#111', color: '#fff', fontSize: 11, fontWeight: 500,
          padding: '4px 8px', borderRadius: 5, whiteSpace: 'nowrap',
          pointerEvents: 'none', zIndex: 999,
          animation: 'fadeSlideIn 0.1s ease both',
        }}>
          {text}
        </div>
      )}
    </div>
  );
}
