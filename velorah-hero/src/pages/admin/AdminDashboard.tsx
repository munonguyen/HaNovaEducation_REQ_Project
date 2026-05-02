import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  FileClock,
  GraduationCap,
  KeyRound,
  School,
  ServerCog,
  ShieldCheck,
  Users,
} from 'lucide-react';

const platformStats = [
  { label: 'Active accounts', value: '1,284', detail: 'Students, tutors, managers, admins', icon: Users },
  { label: 'Role requests', value: '6', detail: 'Access changes waiting for admin review', icon: KeyRound },
  { label: 'Audit events today', value: '312', detail: 'Config, auth, payment gateway and role events', icon: FileClock },
  { label: 'System health', value: '99.98%', detail: 'API, gateway callbacks, notification delivery', icon: Activity },
];

const roleBoundaries = [
  {
    role: 'Student',
    icon: GraduationCap,
    scope: 'Learns through tutor discovery, bookings, schedule, study plan, reviews, and complaints.',
    cannot: 'Cannot access tutor workspaces, operational queues, or platform administration.',
  },
  {
    role: 'Tutor',
    icon: School,
    scope: 'Teaches through booking requests, lessons, schedule, assigned students, and study plan support.',
    cannot: 'Cannot approve other tutors, process refunds, resolve complaints, or change platform roles.',
  },
  {
    role: 'Manager',
    icon: Users,
    scope: 'Runs academic operations: tutors, bookings, payments, reviews, complaints.',
    cannot: 'Cannot create admin users, rotate security keys, or change platform-wide access policies.',
  },
  {
    role: 'Admin',
    icon: ShieldCheck,
    scope: 'Controls platform governance: users, roles, security, audit logs, infrastructure config.',
    cannot: 'Does not resolve student complaints or approve tutor performance decisions directly.',
  },
];

const adminQueues = [
  { title: 'Role escalation request', detail: 'Manager Trang requested temporary Finance Review permission.', priority: 'High', action: 'Open role request' },
  { title: 'Gateway callback warning', detail: 'MoMo sandbox callback latency crossed the platform threshold.', priority: 'Medium', action: 'Inspect gateway' },
  { title: 'Audit export ready', detail: 'April 2026 access log package is ready for compliance review.', priority: 'Normal', action: 'View export' },
];

export default function AdminDashboard() {
  const [notice, setNotice] = useState('Admin console controls platform governance. Manager operational work remains in /manager.');

  return (
    <motion.div
      className="admin-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="admin-page-header">
        <span className="admin-eyebrow">Admin workspace</span>
        <h1>Platform Administration</h1>
        <p>Admin is separate from Manager. Admin owns users, roles, security, audit logs, and system configuration.</p>
        <div className="admin-header-actions">
          <button type="button" onClick={() => setNotice('Role request queue opened. Admin can approve, deny, or request justification.')}>
            <KeyRound size={16} />
            Review role requests
          </button>
          <button type="button" onClick={() => setNotice('Audit log viewer opened with filters for actor, role, module, and timestamp.')}>
            <FileClock size={16} />
            Open audit logs
          </button>
        </div>
      </header>

      <div className="admin-notice" role="status" aria-live="polite">
        <ShieldCheck size={17} />
        <span>{notice}</span>
      </div>

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

      <section className="admin-grid">
        <article className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">Role boundary</span>
              <h2>Manager and Admin are not the same role</h2>
            </div>
            <span className="admin-pill">Separated</span>
          </div>
          <div className="admin-boundary-list">
            {roleBoundaries.map((item) => {
              const Icon = item.icon;
              return (
              <div className="admin-boundary-card" key={item.role}>
                <Icon size={18} />
                <strong>{item.role}</strong>
                <p>{item.scope}</p>
                <small>{item.cannot}</small>
              </div>
              );
            })}
          </div>
        </article>

        <aside className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">Platform queues</span>
              <h2>Admin decisions</h2>
            </div>
            <span className="admin-pill admin-pill-warn">3 waiting</span>
          </div>
          <div className="admin-queue-list">
            {adminQueues.map((item) => (
              <article className="admin-queue-row" key={item.title}>
                <AlertTriangle size={17} />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <button type="button" onClick={() => setNotice(`${item.action}: ${item.detail}`)}>{item.action}</button>
                </div>
                <em>{item.priority}</em>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="admin-grid admin-grid-three">
        <article className="admin-panel col-span-3 lg:col-span-2">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">Analytics</span>
              <h2>Platform Activity</h2>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-40 mt-4 px-2">
            {[45, 60, 40, 70, 85, 55, 95].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden flex-1 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-teal-500/80 rounded-t-md group-hover:bg-teal-400 transition-colors"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Day {i+1}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-eyebrow">Distribution</span>
              <h2>Active Roles</h2>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            {[
              { label: 'Students', count: 950, color: 'bg-emerald-400' },
              { label: 'Tutors', count: 210, color: 'bg-blue-400' },
              { label: 'Managers', count: 45, color: 'bg-amber-400' },
              { label: 'Admins', count: 12, color: 'bg-rose-400' },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{r.label}</span>
                  <span className="font-mono text-slate-700 font-medium">{r.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.count / 1217) * 100}%` }}
                    transition={{ duration: 1.2 }}
                    className={`h-full ${r.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="admin-grid admin-grid-three">
        <article className="admin-panel">
          <ServerCog size={21} className="text-indigo-400 mb-3" />
          <h2>System Configuration</h2>
          <p className="text-sm text-slate-500 mb-4 mt-2">Manage platform-level flags, third-party integrations, data retention windows, and core service health checks.</p>
          <button className="admin-action-btn" type="button" onClick={() => setNotice('System configuration panel opened. Changes require audit note and admin confirmation.')}>Open Config</button>
        </article>
        <article className="admin-panel">
          <Database size={21} className="text-emerald-400 mb-3" />
          <h2>Data Governance</h2>
          <p className="text-sm text-slate-500 mb-4 mt-2">Enforce data retention policies, monitor backup integrity, handle privacy requests, and export system logs.</p>
          <button className="admin-action-btn" type="button" onClick={() => setNotice('Data governance queue opened with export, retention, and backup actions.')}>Review Data Controls</button>
        </article>
        <article className="admin-panel">
          <CheckCircle2 size={21} className="text-amber-400 mb-3" />
          <h2>Manager Handoff</h2>
          <p className="text-sm text-slate-500 mb-4 mt-2">Transfer operational cases to Managers while maintaining strict access boundaries and escalation paths.</p>
          <button className="admin-action-btn" type="button" onClick={() => setNotice('Manager handoff rules verified. Operational queues remain under /manager.')}>Verify Handoff</button>
        </article>
      </section>
    </motion.div>
  );
}
