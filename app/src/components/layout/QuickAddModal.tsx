import React, { useState } from 'react';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';

interface QuickAddModalProps {
  open: boolean;
  onClose: () => void;
}

type AddType = 'user' | 'order' | 'product';

export function QuickAddModal({ open, onClose }: QuickAddModalProps) {
  const [type, setType] = useState<AddType>('user');
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Quick Create"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" icon="plus" onClick={onClose}>Create</Button>
        </>
      }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['user', 'order', 'product'] as AddType[]).map(ty => (
            <button
              key={ty}
              onClick={() => setType(ty)}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8,
                border: `1px solid transparent`,
                background: type === ty ? 'var(--accent-soft, #ddeeff)' : 'transparent',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                textTransform: 'capitalize', transition: 'all 0.12s',
              }}>
              {ty}
            </button>
          ))}
        </div>
        <Input
          placeholder={type === 'user' ? 'Full name' : type === 'order' ? 'Customer name' : 'Product name'}
          value={name}
          onChange={e => setName(e.target.value)}
          icon={type === 'user' ? 'user' : type === 'order' ? 'orders' : 'box'}
        />
        <Input
          placeholder={type === 'user' ? 'Email address' : type === 'order' ? 'Amount' : 'Price per month'}
          value={detail}
          onChange={e => setDetail(e.target.value)}
          icon={type === 'user' ? 'bell' : 'pay'}
        />
      </div>
    </Modal>
  );
}
