import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Database,
  FileClock,
  KeyRound,
  Lock,
  RefreshCw,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
  UserCog,
  Users,
} from 'lucide-react';

/* ── UC definitions – each unique to Admin only ── */
const adminUCs = [
  {
    code: 'UC-A01',
    title: 'User Account Management',
    owner: 'Admin only',
    desc: 'Create, edit, deactivate, or permanently remove platform accounts across all roles. Managers cannot create or deactivate accounts.',
    icon: UserCog,
    accent: 'teal',
    action: 'Open user list',
  },
  {
    code: 'UC-A02',
    title: 'Role Assignment & Access Control',
    owner: 'Admin only',
    desc: 'Grant or revoke Student, Tutor, Manager, and Admin roles. Approve role escalation requests from Managers. No other role can change access rights.',
    icon: KeyRound,
    accent: 'indigo',
    action: 'Review role requests',
  },
  {
    code: 'UC-A03',
    title: 'Security Policy Management',
    owner: 'Admin only',
    desc: 'Rotate API keys, enforce session policies, manage MFA requirements, block suspicious IPs, and review login risk events.',
    icon: Lock,
    accent: 'rose',
    action: 'Open security panel',
  },
  {
    code: 'UC-A04',
    title: 'Platform Audit Log',
    owner: 'Admin only',
    desc: 'Read-only trace of every privileged action: role changes, config edits, login events, payment gateway changes. Managers and Tutors have no access.',
    icon: FileClock,
    accent: 'amber',
    action: 'View audit log',
  },
  {
    code: 'UC-A05',
    title: 'System Configuration',
    owner: 'Admin only',
    desc: 'Manage feature flags, third-party integrations (VNPay, MoMo, Zalo), notification templates, and platform-level service health thresholds.',
    icon: ServerCog,
    accent: 'blue',
    action: 'Open config',
  },
  {
    code: 'UC-A06',
    title: 'Data Governance & Compliance',
    owner: 'Admin only',
    desc: 'Set data retention windows, run GDPR export requests, monitor backup jobs, and generate compliance audit packages for external review.',
    icon: Database,
    accent: 'emerald',
    action: 'Review data controls',
  },
];

const platformStats = [
  { label: 'Total accounts', value: '1,284', detail: 'Students · Tutors · Managers · Admins', icon: Users, tone: 'teal' },
  { label: 'Pending role requests', value: '6', detail: 'Awaiting admin approval or denial', icon: KeyRound, tone: 'indigo' },
  { label: 'Audit events today', value: '312', detail: 'Auth, role, config, and gateway events', icon: FileClock, tone: 'amber' },
  { label: 'System uptime', value: '99.98%', detail: 'API · Gateway · Notifications', icon: Activity, tone: 'emerald' },
];

const escalationQueue = [
  {
    id: 'e1',
    type: 'Role escalation',
    detail: 'Manager Trang requested temporary Finance Review permission.',
    priority: 'High',
    from: 'Manager',
    action: 'Approve or deny',
    icon: KeyRound,
  },
  {
    id: 'e2',
    type: 'Security event',
    detail: 'Unusual login pattern from IP 103.x — 4 failed attempts on admin account.',
    priority: 'Critical',
    from: 'System',
    action: 'Block or whitelist',
    icon: ShieldAlert,
  },
  {
    id: 'e3',
    type: 'Gateway config warning',
    detail: 'MoMo sandbox callback latency exceeded 2s threshold — config review needed.',
    priority: 'Medium',
    from: 'System',
    action: 'Inspect config',
    icon: ServerCog,
  },
  {
    id: 'e4',
    type: 'Audit export ready',
    detail: 'April 2026 compliance log package is ready for external review download.',
    priority: 'Normal',
    from: 'Scheduler',
    action: 'Download export',
    icon: FileClock,
  },
];

const priorityColor: Record<string, string> = {
  Critical: 'text-rose-600 bg-rose-50 border-rose-200',
  High: 'text-amber-700 bg-amber-50 border-amber-200',
  Medium: 'text-blue-700 bg-blue-50 border-blue-200',
  Normal: 'text-slate-600 bg-slate-50 border-slate-200',
};

const accentMap: Record<string, string> = {
  teal: 'bg-teal-50 border-teal-200 text-teal-700',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  rose: 'bg-rose-50 border-rose-200 text-rose-700',
  amber: 'bg-amber-50 border-amber-200 text-amber-700',
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
};

const iconAccentMap: Record<string, string> = {
  teal: 'text-teal-600 bg-teal-100',
  indigo: 'text-indigo-600 bg-indigo-100',
  rose: 'text-rose-600 bg-rose-100',
  amber: 'text-amber-600 bg-amber-100',
  blue: 'text-blue-600 bg-blue-100',
  emerald: 'text-emerald-600 bg-emerald-100',
};

export default function AdminDashboard() {
  const [notice, setNotice] = useState('');

  return (
    <motion.div
      className="admin-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Header ── */}
      <header className="admin-page-header">
        <span className="admin-eyebrow">Admin workspace · Platform governance only</span>
        <h1>Admin Control Center</h1>
        <p>
          Admin manages users, roles, security, audit logs, system config, and data governance.
          Operational tasks (bookings, tutor approval, complaints, payments) belong to the Manager.
        </p>
        <div className="admin-header-actions">
          <button type="button" onClick={() => setNotice('Role request queue opened. Admin can approve, deny, or escalate with justification note.')}>
            <KeyRound size={16} />
            Review role requests
          </button>
          <button type="button" onClick={() => setNotice('Audit log viewer opened. Filter by actor, role, module, timestamp, and action type.')}>
            <FileClock size={16} />
            Open audit log
          </button>
          <button type="button" onClick={() => setNotice('User management panel opened. Create, deactivate, or reassign role accounts.')}>
            <UserCog size={16} />
            Manage users
          </button>
        </div>
      </header>

      {/* ── Notice bar ── */}
      {notice && (
        <div className="admin-notice" role="status" aria-live="polite">
          <ShieldCheck size={17} />
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: 11 }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Platform stats ── */}
      <section className="admin-stat-grid">
        {platformStats.map(({ label, value, detail, icon: Icon }) => (
          <article className="admin-stat" key={label}>
            <Icon size={20} />
            <strong>{value}</strong>
            <span>{label}</span>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      {/* ── Admin-exclusive UC grid ── */}
      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <span className="admin-eyebrow">Use cases · Admin exclusive</span>
            <h2>What only Admin can do</h2>
          </div>
          <span className="admin-pill">6 UC · UC-A01 to UC-A06</span>
        </div>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
          These actions are strictly unavailable to Manager, Tutor, or Student. Any request for access to these
          functions must go through Admin via the escalation queue.
        </p>

        <div className="admin-uc-grid">
          {adminUCs.map((uc) => {
            const Icon = uc.icon;
            return (
              <article key={uc.code} className="admin-uc-card">
                <div className="admin-uc-card-top">
                  <span className={`admin-uc-icon ${iconAccentMap[uc.accent]}`}>
                    <Icon size={18} />
                  </span>
                  <span className={`admin-uc-badge ${accentMap[uc.accent]}`}>{uc.code}</span>
                </div>
                <h3>{uc.title}</h3>
                <p>{uc.desc}</p>
                <div className="admin-uc-footer">
                  <span className="admin-uc-owner">
                    <ShieldCheck size={11} />
                    {uc.owner}
                  </span>
                  <button
                    type="button"
                    className="admin-action-btn"
                    onClick={() => setNotice(`${uc.code} – ${uc.title}: ${uc.action} initiated.`)}
                  >
                    {uc.action}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Escalation queue ── */}
      <section className="admin-grid">
        <article className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">Escalation queue</span>
              <h2>Items requiring admin decision</h2>
            </div>
            <span className="admin-pill admin-pill-warn">
              {escalationQueue.filter(e => e.priority === 'Critical' || e.priority === 'High').length} urgent
            </span>
          </div>
          <div className="admin-queue-list" style={{ marginTop: 16 }}>
            {escalationQueue.map((item) => {
              const Icon = item.icon;
              return (
                <article className="admin-queue-row" key={item.id}>
                  <Icon size={17} style={{ color: '#0f766e', flexShrink: 0 }} />
                  <div>
                    <strong>{item.type}</strong>
                    <p>{item.detail}</p>
                    <span style={{ fontSize: 11, color: '#94a3b8', marginTop: 2, display: 'block' }}>
                      Source: {item.from}
                    </span>
                    <button type="button" onClick={() => setNotice(`${item.type}: ${item.action} — ${item.detail}`)}>
                      {item.action}
                    </button>
                  </div>
                  <em className={`admin-priority-badge ${priorityColor[item.priority]}`}>{item.priority}</em>
                </article>
              );
            })}
          </div>
        </article>

        {/* ── Role distribution ── */}
        <aside className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">Account distribution</span>
              <h2>Accounts by role</h2>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            {[
              { label: 'Students', count: 950, color: 'bg-emerald-400', pct: 78 },
              { label: 'Tutors', count: 210, color: 'bg-blue-400', pct: 17 },
              { label: 'Managers', count: 45, color: 'bg-amber-400', pct: 4 },
              { label: 'Admins', count: 12, color: 'bg-rose-400', pct: 1 },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{r.label}</span>
                  <span className="font-mono text-slate-700 font-medium">{r.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ duration: 1.2 }}
                    className={`h-full ${r.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: 12, color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              What Admin does NOT do
            </p>
            {[
              'Approve/reject tutor applications → Manager',
              'Resolve student complaints → Manager',
              'Process payment refunds → Manager',
              'Monitor live bookings → Manager',
              'Post or moderate reviews → Manager',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
                <AlertTriangle size={11} style={{ color: '#f59e0b', marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* ── Platform activity chart ── */}
      <section className="admin-grid admin-grid-three">
        <article className="admin-panel col-span-3 lg:col-span-2">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">Analytics · Last 7 days</span>
              <h2>Platform Governance Events</h2>
            </div>
            <span className="admin-pill">Audit-grade</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-40 mt-4 px-2">
            {[
              { label: 'Role', val: 45 },
              { label: 'Auth', val: 72 },
              { label: 'Config', val: 28 },
              { label: 'User', val: 60 },
              { label: 'Sec', val: 38 },
              { label: 'Data', val: 55 },
              { label: 'Sys', val: 90 },
            ].map(({ label, val }, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden flex-1 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-teal-500/80 rounded-t-md group-hover:bg-teal-400 transition-colors"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 10, textAlign: 'right' }}>
            Event types: Role · Auth · Config · User · Security · Data · System
          </p>
        </article>

        <aside className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">System health</span>
              <h2>Service Status</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
            {[
              { name: 'Auth service', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
              { name: 'VNPay gateway', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
              { name: 'MoMo callback', status: 'Degraded', color: 'text-amber-700 bg-amber-50' },
              { name: 'Notification API', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
              { name: 'Backup scheduler', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
            ].map((s) => (
              <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', borderRadius: 10 }}>
                <span style={{ fontSize: 13, color: '#334155', fontWeight: 600 }}>{s.name}</span>
                <span style={{ fontSize: 11, fontWeight: 800, padding: '2px 10px', borderRadius: 999 }} className={s.color}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
          <button
            className="admin-action-btn"
            type="button"
            style={{ marginTop: 16, width: '100%' }}
            onClick={() => setNotice('System health panel opened. Config, logs, and restart actions are available.')}
          >
            <RefreshCw size={13} />
            Refresh all services
          </button>
        </aside>
      </section>
    </motion.div>
  );
}
