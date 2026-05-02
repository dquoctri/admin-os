import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/primitives/Button';
import { Input } from '../components/primitives/Input';
import { Textarea } from '../components/primitives/Textarea';
import { Toggle } from '../components/primitives/Toggle';
import { Select } from '../components/primitives/Select';
import { Avatar } from '../components/primitives/Avatar';
import { Icon } from '../components/primitives/Icon';
import { SettingRow } from '../components/primitives/SettingRow';
import { SettingSection } from '../components/primitives/SettingSection';
import { SettingsTabs } from '../components/primitives/SettingsTabs';
import { ColorSwatchPicker } from '../components/primitives/ColorSwatchPicker';
import { PageHeader } from '../components/primitives/PageHeader';

const TABS = ['Profile', 'Appearance', 'Notifications', 'Security', 'Billing'];

const ACCENT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#0ea5e9', '#3b82f6',
];

export function SettingsPage() {
  const { theme: t } = useTheme();
  const [tab, setTab] = useState('Profile');
  const [notifs, setNotifs] = useState({ email: true, push: false, digest: true, security: true, updates: false });
  const [twoFA, setTwoFA] = useState(false);
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [timezone, setTimezone] = useState('UTC');
  const [language, setLanguage] = useState('en');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeSlideIn 0.3s ease both' }}>
      <PageHeader title="Settings" description="Manage your account preferences." />

      <SettingsTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'Profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SettingSection title="Profile Photo">
            <SettingRow label="Avatar" description="Your profile photo shown across the platform">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name="Amara Osei" size={44} />
                <div style={{ display: 'flex', gap: 6 }}>
                  <Button variant="outline" size="sm" icon="upload">Upload</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            </SettingRow>
          </SettingSection>

          <SettingSection title="Personal Info">
            <SettingRow label="Full Name" description="Your display name visible to teammates">
              <Input defaultValue="Amara Osei" style={{ width: 240 }} />
            </SettingRow>
            <SettingRow label="Email Address" description="Primary email for login and notifications">
              <Input defaultValue="amara@adminco.com" icon="mail" style={{ width: 240 }} />
            </SettingRow>
            <SettingRow label="Job Title" description="Your role within the organization">
              <Input defaultValue="Product Manager" style={{ width: 240 }} />
            </SettingRow>
            <SettingRow label="Bio" description="Brief description shown on your profile">
              <Textarea defaultValue="Leading product strategy for AdminOS." style={{ width: 280, height: 72 }} />
            </SettingRow>
          </SettingSection>

          <SettingSection title="Preferences">
            <SettingRow label="Language" description="Interface display language">
              <Select value={language} onChange={setLanguage} options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
              ]} />
            </SettingRow>
            <SettingRow label="Timezone" description="Used for scheduling and reporting">
              <Select value={timezone} onChange={setTimezone} options={[
                { value: 'UTC', label: 'UTC' },
                { value: 'EST', label: 'Eastern (EST)' },
                { value: 'PST', label: 'Pacific (PST)' },
                { value: 'CET', label: 'Central Europe (CET)' },
              ]} />
            </SettingRow>
          </SettingSection>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 4 }}>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button variant="primary" size="sm" icon="check">Save Changes</Button>
          </div>
        </div>
      )}

      {tab === 'Appearance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SettingSection title="Theme">
            <SettingRow label="Accent Color" description="Primary color used for buttons and highlights">
              <ColorSwatchPicker colors={ACCENT_COLORS} value={accentColor} onChange={setAccentColor} />
            </SettingRow>
            <SettingRow label="Font Size" description="Base font size for the interface">
              <Select value="md" onChange={() => {}} options={[
                { value: 'sm', label: 'Small (13px)' },
                { value: 'md', label: 'Medium (14px)' },
                { value: 'lg', label: 'Large (16px)' },
              ]} />
            </SettingRow>
          </SettingSection>

          <SettingSection title="Layout">
            <SettingRow label="Compact Mode" description="Reduce padding for a denser layout">
              <Toggle checked={false} onChange={() => {}} />
            </SettingRow>
            <SettingRow label="Animated Transitions" description="Enable page and component animations">
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
            <SettingRow label="Show Breadcrumbs" description="Display navigation breadcrumbs in topbar">
              <Toggle checked={true} onChange={() => {}} />
            </SettingRow>
          </SettingSection>
        </div>
      )}

      {tab === 'Notifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SettingSection title="Email Notifications">
            <SettingRow label="Email Alerts" description="Receive notifications via email">
              <Toggle checked={notifs.email} onChange={v => setNotifs(n => ({ ...n, email: v }))} />
            </SettingRow>
            <SettingRow label="Weekly Digest" description="Summary of activity every Monday">
              <Toggle checked={notifs.digest} onChange={v => setNotifs(n => ({ ...n, digest: v }))} />
            </SettingRow>
            <SettingRow label="Product Updates" description="News about new features and improvements">
              <Toggle checked={notifs.updates} onChange={v => setNotifs(n => ({ ...n, updates: v }))} />
            </SettingRow>
          </SettingSection>

          <SettingSection title="System Notifications">
            <SettingRow label="Push Notifications" description="Browser push notifications">
              <Toggle checked={notifs.push} onChange={v => setNotifs(n => ({ ...n, push: v }))} />
            </SettingRow>
            <SettingRow label="Security Alerts" description="Immediate alerts for suspicious activity">
              <Toggle checked={notifs.security} onChange={v => setNotifs(n => ({ ...n, security: v }))} />
            </SettingRow>
          </SettingSection>
        </div>
      )}

      {tab === 'Security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SettingSection title="Password">
            <SettingRow label="Current Password" description="Required to change your password">
              <Input type="password" placeholder="••••••••" style={{ width: 240 }} />
            </SettingRow>
            <SettingRow label="New Password" description="At least 8 characters with mixed case">
              <Input type="password" placeholder="••••••••" style={{ width: 240 }} />
            </SettingRow>
            <SettingRow label="Confirm Password" description="Re-enter your new password">
              <Input type="password" placeholder="••••••••" style={{ width: 240 }} />
            </SettingRow>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '4px 20px 16px' }}>
              <Button variant="primary" size="sm" icon="lock">Update Password</Button>
            </div>
          </SettingSection>

          <SettingSection title="Two-Factor Authentication">
            <SettingRow label="Enable 2FA" description="Add an extra layer of security using an authenticator app">
              <Toggle checked={twoFA} onChange={setTwoFA} />
            </SettingRow>
            {twoFA && (
              <div style={{ padding: '12px 20px 16px' }}>
                <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 10 }}>Scan this QR code with your authenticator app:</div>
                <div style={{ width: 100, height: 100, background: t.bgAlt, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="qr" size={60} color={t.textFaint} />
                </div>
              </div>
            )}
          </SettingSection>

          <SettingSection title="Sessions">
            <SettingRow label="Active Sessions" description="Devices currently logged into your account">
              <Button variant="danger" size="sm">Sign Out All Devices</Button>
            </SettingRow>
          </SettingSection>
        </div>
      )}

      {tab === 'Billing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SettingSection title="Current Plan">
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>Pro Plan</div>
                  <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>$49/month · renews Jan 1, 2027</div>
                </div>
                <Button variant="outline" size="sm">Change Plan</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {[
                  { label: 'Team Members', value: '12 / 20' },
                  { label: 'Storage', value: '18 GB / 50 GB' },
                  { label: 'API Calls', value: '84K / 100K' },
                ].map((s, i) => (
                  <div key={i} style={{ background: t.bgAlt, borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: t.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </SettingSection>

          <SettingSection title="Payment Method">
            <SettingRow label="Card on File" description="Visa ending in 4242 · expires 12/26">
              <Button variant="outline" size="sm" icon="edit">Update</Button>
            </SettingRow>
          </SettingSection>

          <SettingSection title="Billing History">
            <div style={{ padding: '4px 20px 16px' }}>
              {[
                { date: 'Apr 1, 2026', amount: '$49.00', status: 'paid' },
                { date: 'Mar 1, 2026', amount: '$49.00', status: 'paid' },
                { date: 'Feb 1, 2026', amount: '$49.00', status: 'paid' },
              ].map((inv, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? `1px solid ${t.cardBorder}` : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{inv.date}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginRight: 16 }}>{inv.amount}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: t.successSoft, color: t.success, textTransform: 'capitalize' }}>{inv.status}</span>
                  <button style={{ marginLeft: 12, background: 'none', border: 'none', cursor: 'pointer', color: t.textMuted, display: 'flex', alignItems: 'center' }}>
                    <Icon name="download" size={14} color={t.textMuted} />
                  </button>
                </div>
              ))}
            </div>
          </SettingSection>
        </div>
      )}
    </div>
  );
}
