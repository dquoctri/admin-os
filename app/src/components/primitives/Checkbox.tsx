import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Icon } from './Icon';

interface CheckboxProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  indeterminate?: boolean;
}

export function Checkbox({ checked, onChange, indeterminate }: CheckboxProps) {
  const { theme: t } = useTheme();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <div onClick={() => onChange(!checked)} style={{
      width: 16, height: 16, borderRadius: 4, flexShrink: 0,
      border: `1.5px solid ${checked || indeterminate ? t.accent : t.cardBorder}`,
      background: checked || indeterminate ? t.accent : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'all 0.15s',
    }}>
      {(checked || indeterminate) && <Icon name={indeterminate ? 'logs' : 'check'} size={10} color="#fff" />}
    </div>
  );
}
