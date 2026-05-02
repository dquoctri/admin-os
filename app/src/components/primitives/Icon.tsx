import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 16, color = 'currentColor', style: ext }: IconProps) {
  const s: React.CSSProperties = { display: 'inline-block', flexShrink: 0, ...ext };
  const p = { width: size, height: size, viewBox: '0 0 16 16', fill: 'none' as const, style: s };
  switch (name) {
    case 'squares':      return <svg {...p}><rect x="1" y="1" width="6" height="6" rx="1.5" fill={color}/><rect x="9" y="1" width="6" height="6" rx="1.5" fill={color} opacity=".6"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill={color} opacity=".6"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill={color} opacity=".3"/></svg>;
    case 'chart':        return <svg {...p}><rect x="1" y="10" width="3" height="5" rx="1" fill={color}/><rect x="6" y="6" width="3" height="9" rx="1" fill={color} opacity=".7"/><rect x="11" y="2" width="3" height="13" rx="1" fill={color} opacity=".4"/></svg>;
    case 'users':        return <svg {...p}><circle cx="6" cy="5" r="3" fill={color}/><path d="M1 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="5" r="2" fill={color} opacity=".5"/><path d="M14 13c0-1.66-1.34-3-3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity=".5"/></svg>;
    case 'orders':       return <svg {...p}><rect x="2" y="1" width="12" height="14" rx="2" stroke={color} strokeWidth="1.5"/><path d="M5 5h6M5 8h6M5 11h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'settings':     return <svg {...p}><circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.41 1.41M11.37 11.37l1.41 1.41M3.22 12.78l1.41-1.41M11.37 4.63l1.41-1.41" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'box':          return <svg {...p}><path d="M2 5l6-3 6 3v6l-6 3-6-3V5z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 2v14M2 5l6 3 6-3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'tag':          return <svg {...p}><path d="M2 2h5.5l6.5 6.5-5.5 5.5L2 7.5V2z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/><circle cx="5" cy="5" r="1" fill={color}/></svg>;
    case 'shield':       return <svg {...p}><path d="M8 1L2 4v5c0 3.31 2.67 5.74 6 6.92C11.33 14.74 14 12.31 14 9V4L8 1z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/><path d="M5.5 8l1.5 1.5L10.5 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'logs':         return <svg {...p}><path d="M2 4h12M2 8h8M2 12h10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'bell':         return <svg {...p}><path d="M8 1a5 5 0 0 1 5 5v3l1 2H2l1-2V6a5 5 0 0 1 5-5z" stroke={color} strokeWidth="1.5"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" stroke={color} strokeWidth="1.5"/></svg>;
    case 'search':       return <svg {...p}><circle cx="6.5" cy="6.5" r="4" stroke={color} strokeWidth="1.5"/><path d="M10 10l3.5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'plus':         return <svg {...p}><path d="M8 2v12M2 8h12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'menu':         return <svg {...p}><path d="M2 4h12M2 8h12M2 12h12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'chevron-right':return <svg {...p}><path d="M6 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'chevron-down': return <svg {...p}><path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'arrow-up':     return <svg {...p}><path d="M8 13V3M3 8l5-5 5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'arrow-down':   return <svg {...p}><path d="M8 3v10M13 8l-5 5-5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'sort':         return <svg {...p}><path d="M5 4v8M3 10l2 2 2-2M11 12V4M9 6l2-2 2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'edit':         return <svg {...p}><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/></svg>;
    case 'trash':        return <svg {...p}><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'eye':          return <svg {...p}><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke={color} strokeWidth="1.5"/><circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1.5"/></svg>;
    case 'more':         return <svg {...p}><circle cx="4" cy="8" r="1.2" fill={color}/><circle cx="8" cy="8" r="1.2" fill={color}/><circle cx="12" cy="8" r="1.2" fill={color}/></svg>;
    case 'filter':       return <svg {...p}><path d="M2 4h12M5 8h6M7 12h2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'download':     return <svg {...p}><path d="M8 2v8M5 7l3 3 3-3M2 13h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'check':        return <svg {...p}><path d="M3 8l3 3 7-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'x':            return <svg {...p}><path d="M4 4l8 8M12 4l-8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'user':         return <svg {...p}><circle cx="8" cy="5" r="3" fill={color}/><path d="M2 15c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'pay':          return <svg {...p}><rect x="1" y="4" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5"/><path d="M1 7h14" stroke={color} strokeWidth="1.5"/><circle cx="5" cy="10" r="1" fill={color}/></svg>;
    case 'alert':        return <svg {...p}><path d="M8 1L1 14h14L8 1z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6v4M8 11.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'ship':         return <svg {...p}><path d="M2 10l2-7h8l2 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 10h14l-1.5 3H2.5L1 10z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/><path d="M6 3V1h4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'error':        return <svg {...p}><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5"/><path d="M8 5v4M8 10.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'calendar':     return <svg {...p}><rect x="1" y="3" width="14" height="12" rx="2" stroke={color} strokeWidth="1.5"/><path d="M5 1v4M11 1v4M1 7h14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'refresh':      return <svg {...p}><path d="M13 8A5 5 0 1 1 8 3h3M11 1l3 2-2 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'logout':       return <svg {...p}><path d="M10 3h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-3M7 11l4-3-4-3M1 8h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'list':         return <svg {...p}><path d="M6 4h8M6 8h8M6 12h8M2 4h.5M2 8h.5M2 12h.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'grid':         return <svg {...p}><rect x="1" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/><rect x="9" y="1" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/><rect x="1" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/><rect x="9" y="9" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5"/></svg>;
    case 'mail':         return <svg {...p}><rect x="1" y="3" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5"/><path d="M1 5l7 5 7-5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'send':         return <svg {...p}><path d="M14 2L7 9M14 2L9 14l-2-5-5-2 12-5z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'server':       return <svg {...p}><rect x="1" y="2" width="14" height="5" rx="1.5" stroke={color} strokeWidth="1.5"/><rect x="1" y="9" width="14" height="5" rx="1.5" stroke={color} strokeWidth="1.5"/><circle cx="4" cy="4.5" r="1" fill={color}/><circle cx="4" cy="11.5" r="1" fill={color}/></svg>;
    case 'activity':     return <svg {...p}><path d="M1 8h3l2-5 3 10 2-5h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'link':         return <svg {...p}><path d="M7 9a3 3 0 0 0 4.24 0l2-2a3 3 0 0 0-4.24-4.24l-1 1" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M9 7a3 3 0 0 0-4.24 0l-2 2a3 3 0 0 0 4.24 4.24l1-1" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case 'lock':         return <svg {...p}><rect x="3" y="7" width="10" height="8" rx="2" stroke={color} strokeWidth="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="11" r="1.2" fill={color}/></svg>;
    case 'upload':       return <svg {...p}><path d="M8 10V2M5 5l3-3 3 3M2 13h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'chevron-up':   return <svg {...p}><path d="M4 10l4-4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'qr':           return <svg {...p}><rect x="1" y="1" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5"/><rect x="10" y="1" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5"/><rect x="1" y="10" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5"/><rect x="2.5" y="2.5" width="2" height="2" fill={color}/><rect x="11.5" y="2.5" width="2" height="2" fill={color}/><rect x="2.5" y="11.5" width="2" height="2" fill={color}/><path d="M10 10h2v2h-2zM12 12h2v2h-2zM10 14h2" stroke={color} strokeWidth="1.2"/></svg>;
    case 'more-v':       return <svg {...p}><circle cx="8" cy="4" r="1.2" fill={color}/><circle cx="8" cy="8" r="1.2" fill={color}/><circle cx="8" cy="12" r="1.2" fill={color}/></svg>;
    default:             return <svg {...p}><circle cx="8" cy="8" r="5" stroke={color} strokeWidth="1.5"/></svg>;
  }
}
