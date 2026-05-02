export const KPI_DATA = [
  { label: 'Total Revenue', value: '$284,392', change: +12.4, suffix: 'vs last month', trend: [42,48,44,58,52,68,60,72,65,80,74,92] },
  { label: 'Active Users',  value: '18,942',   change: +5.8,  suffix: 'vs last month', trend: [30,36,32,40,38,45,43,50,47,55,52,60] },
  { label: 'Conversions',   value: '3,841',    change: -2.1,  suffix: 'vs last month', trend: [55,52,58,50,47,53,49,45,48,44,46,42] },
  { label: 'Avg Session',   value: '4m 32s',   change: +8.3,  suffix: 'vs last month', trend: [28,32,30,38,35,42,40,48,44,52,50,58] },
];

export const MONTHLY_REVENUE = [
  { label: 'Jan', value: 42 }, { label: 'Feb', value: 58 }, { label: 'Mar', value: 47 },
  { label: 'Apr', value: 73 }, { label: 'May', value: 68 }, { label: 'Jun', value: 85 },
  { label: 'Jul', value: 62 }, { label: 'Aug', value: 91 }, { label: 'Sep', value: 78 },
  { label: 'Oct', value: 65 }, { label: 'Nov', value: 88 }, { label: 'Dec', value: 96 },
];

export const WEEKLY_SESSIONS = [
  { label: 'Mon', value: 320 }, { label: 'Tue', value: 480 }, { label: 'Wed', value: 410 },
  { label: 'Thu', value: 560 }, { label: 'Fri', value: 490 }, { label: 'Sat', value: 280 }, { label: 'Sun', value: 190 },
];

export const TRAFFIC_SOURCES = [
  { label: 'Direct',   value: 38 },
  { label: 'Organic',  value: 29 },
  { label: 'Referral', value: 19 },
  { label: 'Social',   value: 14 },
];

export const LINE_MULTI = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  series: [
    { name: 'Revenue',  data: [42,58,47,73,68,85,62,91,78,65,88,96] },
    { name: 'Sessions', data: [30,45,38,60,55,72,50,80,65,52,75,88] },
  ],
};

export const USERS_TABLE = [
  { id: 'USR-001', name: 'Amara Osei',      email: 'amara@corp.io',  role: 'admin',   status: 'active',   joined: 'Jan 12, 2024', lastActive: '2h ago' },
  { id: 'USR-002', name: 'James Whitfield', email: 'james@corp.io',  role: 'manager', status: 'active',   joined: 'Feb 3, 2024',  lastActive: '5m ago' },
  { id: 'USR-003', name: 'Liu Mei-Xing',    email: 'liu@corp.io',    role: 'editor',  status: 'inactive', joined: 'Mar 8, 2024',  lastActive: '3d ago' },
  { id: 'USR-004', name: 'Rafael Moraes',   email: 'rafael@corp.io', role: 'viewer',  status: 'active',   joined: 'Mar 22, 2024', lastActive: '1h ago' },
  { id: 'USR-005', name: 'Priya Nair',      email: 'priya@corp.io',  role: 'manager', status: 'pending',  joined: 'Apr 1, 2024',  lastActive: 'Just now' },
  { id: 'USR-006', name: 'Tom Eriksen',     email: 'tom@corp.io',    role: 'editor',  status: 'active',   joined: 'Apr 14, 2024', lastActive: '4h ago' },
  { id: 'USR-007', name: 'Sara Kim',        email: 'sara@corp.io',   role: 'admin',   status: 'active',   joined: 'Apr 20, 2024', lastActive: '30m ago' },
  { id: 'USR-008', name: 'Dev Patel',       email: 'dev@corp.io',    role: 'viewer',  status: 'inactive', joined: 'Apr 28, 2024', lastActive: '1w ago' },
  { id: 'USR-009', name: 'Clara Voss',      email: 'clara@corp.io',  role: 'editor',  status: 'active',   joined: 'May 2, 2024',  lastActive: '10m ago' },
  { id: 'USR-010', name: 'Kwame Asante',    email: 'kwame@corp.io',  role: 'viewer',  status: 'active',   joined: 'May 10, 2024', lastActive: '2d ago' },
];

export const ORDERS_TABLE = [
  { id: 'ORD-8821', customer: 'Amara Osei',     product: 'Enterprise Plan',  amount: '$2,400', status: 'completed', date: 'Apr 30, 2024' },
  { id: 'ORD-8820', customer: 'Acme Corp',       product: 'Pro Plan × 5',     amount: '$1,200', status: 'completed', date: 'Apr 29, 2024' },
  { id: 'ORD-8819', customer: 'James Whitfield', product: 'Starter Plan',     amount: '$49',    status: 'pending',   date: 'Apr 29, 2024' },
  { id: 'ORD-8818', customer: 'Liu Mei-Xing',    product: 'Add-on Storage',   amount: '$120',   status: 'failed',    date: 'Apr 28, 2024' },
  { id: 'ORD-8817', customer: 'Rafael Moraes',   product: 'Pro Plan',         amount: '$240',   status: 'completed', date: 'Apr 27, 2024' },
  { id: 'ORD-8816', customer: 'Priya Nair',      product: 'Enterprise Plan',  amount: '$2,400', status: 'pending',   date: 'Apr 27, 2024' },
  { id: 'ORD-8815', customer: 'BuildFast Inc',   product: 'Pro Plan × 12',    amount: '$2,880', status: 'completed', date: 'Apr 26, 2024' },
  { id: 'ORD-8814', customer: 'Tom Eriksen',     product: 'Starter Plan',     amount: '$49',    status: 'refunded',  date: 'Apr 25, 2024' },
  { id: 'ORD-8813', customer: 'Clara Voss',      product: 'API Access',       amount: '$80',    status: 'completed', date: 'Apr 24, 2024' },
  { id: 'ORD-8812', customer: 'Kwame Asante',    product: 'Add-on Storage',   amount: '$120',   status: 'pending',   date: 'Apr 23, 2024' },
  { id: 'ORD-8811', customer: 'Sara Kim',        product: 'Enterprise Plan',  amount: '$2,400', status: 'completed', date: 'Apr 22, 2024' },
  { id: 'ORD-8810', customer: 'Dev Patel',       product: 'Starter Plan',     amount: '$49',    status: 'failed',    date: 'Apr 21, 2024' },
];

export const PRODUCTS = [
  { id: 'PRD-01', name: 'Analytics Pro',    category: 'analytics',       icon: 'chart',    price: '$49/mo',    users: 1284, revenue: '$62.9K', status: 'active',     description: 'Advanced analytics with real-time dashboards and AI insights.' },
  { id: 'PRD-02', name: 'CloudInfra',       category: 'infrastructure',  icon: 'server',   price: '$240/mo',   users: 836,  revenue: '$200.6K', status: 'active',    description: 'Managed cloud infrastructure with auto-scaling and 99.99% SLA.' },
  { id: 'PRD-03', name: 'SecureVault',      category: 'security',        icon: 'shield',   price: '$120/mo',   users: 502,  revenue: '$60.2K',  status: 'active',    description: 'End-to-end encryption, SSO, and compliance reporting.' },
  { id: 'PRD-04', name: 'TeamCollab',       category: 'communication',   icon: 'users',    price: '$29/mo',    users: 3410, revenue: '$98.9K',  status: 'active',    description: 'Real-time collaboration tools for distributed teams.' },
  { id: 'PRD-05', name: 'DataStream',       category: 'analytics',       icon: 'activity', price: '$180/mo',   users: 318,  revenue: '$57.2K',  status: 'beta',      description: 'Stream processing pipeline with sub-millisecond latency.' },
  { id: 'PRD-06', name: 'AutoScale',        category: 'infrastructure',  icon: 'refresh',  price: '$400/mo',   users: 98,   revenue: '$39.2K',  status: 'active',    description: 'Intelligent auto-scaling based on predictive load models.' },
  { id: 'PRD-07', name: 'LegacyConnect',    category: 'infrastructure',  icon: 'link',     price: '$60/mo',    users: 124,  revenue: '$7.4K',   status: 'deprecated', description: 'Legacy system integration adapter. Deprecated — migrate to CloudInfra.' },
  { id: 'PRD-08', name: 'PushNotify',       category: 'communication',   icon: 'bell',     price: '$15/mo',    users: 5820, revenue: '$87.3K',  status: 'active',    description: 'Multi-channel push notifications with delivery guarantees.' },
];

export const RECENT_ACTIVITY = [
  { icon: 'user',  text: 'New user registered',  sub: 'Priya Nair joined as Manager',  time: '2m ago',  type: 'info' },
  { icon: 'pay',   text: 'Payment received',      sub: '$4,200 from Acme Corp',          time: '18m ago', type: 'success' },
  { icon: 'alert', text: 'Server alert',          sub: 'API latency spike detected',     time: '45m ago', type: 'warning' },
  { icon: 'ship',  text: 'Order fulfilled',       sub: 'Order #8821 shipped',            time: '1h ago',  type: 'info' },
  { icon: 'check', text: 'Task completed',        sub: 'Q2 report generated',            time: '3h ago',  type: 'success' },
  { icon: 'error', text: 'Failed transaction',    sub: 'ORD-8818 payment declined',      time: '5h ago',  type: 'danger' },
];

export const NOTIFICATIONS = [
  { id: 1, text: 'New enterprise signup — Acme Corp',   time: '2m ago',  read: false, type: 'success' },
  { id: 2, text: 'Server alert: API latency >500ms',    time: '18m ago', read: false, type: 'warning' },
  { id: 3, text: 'Monthly report is ready to download', time: '1h ago',  read: false, type: 'info' },
  { id: 4, text: 'ORD-8814 refund processed',           time: '3h ago',  read: true,  type: 'info' },
];

export const NAV_GROUPS = [
  {
    group: 'MAIN',
    items: [
      { id: 'overview',    label: 'Overview',    icon: 'squares',  path: '/overview' },
      { id: 'analytics',   label: 'Analytics',   icon: 'chart',    path: '/analytics' },
      { id: 'orders',      label: 'Orders',      icon: 'orders',   path: '/orders' },
      { id: 'users',       label: 'Users',       icon: 'users',    path: '/users' },
    ],
  },
  {
    group: 'MANAGEMENT',
    items: [
      { id: 'products',    label: 'Products',    icon: 'box',      path: '/products' },
      { id: 'categories',  label: 'Categories',  icon: 'tag',      path: '/categories' },
      { id: 'permissions', label: 'Permissions', icon: 'shield',   path: '/permissions' },
    ],
  },
  {
    group: 'SYSTEM',
    items: [
      { id: 'settings',    label: 'Settings',    icon: 'settings', path: '/settings' },
      { id: 'logs',        label: 'Logs',        icon: 'logs',     path: '/logs' },
    ],
  },
];

export const LOG_DATA = [
  { id: 'LOG-0091', type: 'auth',    severity: 'info',    user: 'amara@corp.io',  message: 'User logged in',             ip: '192.168.1.1',  userAgent: 'Chrome 124 / macOS', timestamp: '2024-04-30 14:02', meta: { session: 'sess_abc123', duration: '—' } },
  { id: 'LOG-0090', type: 'data',    severity: 'info',    user: 'james@corp.io',  message: 'Record updated: Order #8821',ip: '10.0.0.5',     userAgent: 'Firefox 125 / Win11', timestamp: '2024-04-30 13:46', meta: { resource: 'ORD-8821', fields: ['status', 'amount'] } },
  { id: 'LOG-0089', type: 'system',  severity: 'warning', user: 'system',         message: 'API latency spike >500ms',   ip: null,           userAgent: null, timestamp: '2024-04-30 13:19', meta: { p95: '820ms', endpoint: '/api/v2/orders' } },
  { id: 'LOG-0088', type: 'billing', severity: 'info',    user: 'amara@corp.io',  message: 'Invoice downloaded',         ip: '192.168.1.1',  userAgent: 'Chrome 124 / macOS', timestamp: '2024-04-30 13:04', meta: { invoice: 'INV-2024-11', amount: '$2,400' } },
  { id: 'LOG-0087', type: 'auth',    severity: 'error',   user: 'unknown',        message: 'Failed login attempt ×5',    ip: '203.0.113.55', userAgent: 'curl/7.88.1', timestamp: '2024-04-30 12:02', meta: { attempts: 5, blocked: true } },
  { id: 'LOG-0086', type: 'data',    severity: 'info',    user: 'liu@corp.io',    message: 'Record deleted: PRD-04',     ip: '10.0.0.8',     userAgent: 'Safari 17 / iOS', timestamp: '2024-04-30 11:04', meta: { resource: 'PRD-04', permanent: true } },
  { id: 'LOG-0085', type: 'system',  severity: 'info',    user: 'system',         message: 'Scheduled backup completed', ip: null,           userAgent: null, timestamp: '2024-04-30 10:02', meta: { size: '4.2 GB', duration: '18m 32s' } },
  { id: 'LOG-0084', type: 'auth',    severity: 'info',    user: 'priya@corp.io',  message: 'Password changed',           ip: '172.16.0.3',   userAgent: 'Chrome 124 / Win11', timestamp: '2024-04-30 09:02', meta: { method: '2FA-verified' } },
  { id: 'LOG-0083', type: 'billing', severity: 'error',   user: 'system',         message: 'Payment failed: ORD-8818',   ip: null,           userAgent: null, timestamp: '2024-04-30 08:02', meta: { order: 'ORD-8818', amount: '$120', reason: 'insufficient_funds' } },
  { id: 'LOG-0082', type: 'data',    severity: 'info',    user: 'rafael@corp.io', message: 'Orders CSV exported',        ip: '10.0.0.12',    userAgent: 'Edge 124 / Win11', timestamp: '2024-04-30 06:02', meta: { rows: 284, size: '124 KB' } },
  { id: 'LOG-0081', type: 'system',  severity: 'warning', user: 'system',         message: 'Disk usage at 82%',          ip: null,           userAgent: null, timestamp: '2024-04-30 02:02', meta: { used: '41 GB', total: '50 GB', path: '/data' } },
  { id: 'LOG-0080', type: 'auth',    severity: 'info',    user: 'tom@corp.io',    message: 'User role updated: USR-006', ip: '192.168.1.7',  userAgent: 'Chrome 124 / macOS', timestamp: '2024-04-29 14:02', meta: { from: 'viewer', to: 'editor' } },
  { id: 'LOG-0079', type: 'data',    severity: 'info',    user: 'sara@corp.io',   message: 'New product created: PRD-08',ip: '10.0.0.14',    userAgent: 'Chrome 124 / macOS', timestamp: '2024-04-29 11:30', meta: { product: 'PRD-08', price: '$15/mo' } },
  { id: 'LOG-0078', type: 'system',  severity: 'info',    user: 'system',         message: 'SSL certificate renewed',    ip: null,           userAgent: null, timestamp: '2024-04-29 08:00', meta: { domain: 'adminco.com', expires: '2025-04-29' } },
];

export const ROLES = [
  { id: 'admin',   name: 'Admin',   members: 2,  level: 4, description: 'Full access to all resources and settings.' },
  { id: 'manager', name: 'Manager', members: 2,  level: 3, description: 'Manage users, orders, and content.' },
  { id: 'editor',  name: 'Editor',  members: 3,  level: 2, description: 'Create and edit records, no destructive actions.' },
  { id: 'viewer',  name: 'Viewer',  members: 3,  level: 1, description: 'Read-only access to approved resources.' },
];

export const RESOURCES = [
  {
    id: 'users',     name: 'Users',     minLevel: 2,
    actions: ['view', 'create', 'edit', 'delete'],
  },
  {
    id: 'orders',    name: 'Orders',    minLevel: 1,
    actions: ['view', 'create', 'edit', 'refund'],
  },
  {
    id: 'products',  name: 'Products',  minLevel: 2,
    actions: ['view', 'create', 'edit', 'delete'],
  },
  {
    id: 'analytics', name: 'Analytics', minLevel: 2,
    actions: ['view', 'export'],
  },
  {
    id: 'settings',  name: 'Settings',  minLevel: 4,
    actions: ['view', 'edit'],
  },
  {
    id: 'logs',      name: 'Audit Logs', minLevel: 3,
    actions: ['view', 'export'],
  },
];
