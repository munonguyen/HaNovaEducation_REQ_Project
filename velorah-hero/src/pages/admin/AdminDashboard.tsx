import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  FileClock,
  KeyRound,
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
    role: 'Manager',
    scope: 'Runs academic operations: tutors, bookings, payments, reviews, complaints.',
    cannot: 'Cannot create admin users, rotate security keys, or change platform-wide access policies.',
  },
  {
    role: 'Admin',
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
            {roleBoundaries.map((item) => (
              <div className="admin-boundary-card" key={item.role}>
                <strong>{item.role}</strong>
                <p>{item.scope}</p>
                <small>{item.cannot}</small>
              </div>
            ))}
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
        <article className="admin-panel">
          <ServerCog size={21} />
          <h2>System configuration</h2>
          <p>Platform-level flags, integrations, retention windows, and service health checks.</p>
          <button type="button" onClick={() => setNotice('System configuration panel opened. Changes require audit note and admin confirmation.')}>Open config</button>
        </article>
        <article className="admin-panel">
          <Database size={21} />
          <h2>Data governance</h2>
          <p>Export logs, retention policy, backup status, and privacy requests.</p>
          <button type="button" onClick={() => setNotice('Data governance queue opened with export, retention, and backup actions.')}>Review data controls</button>
        </article>
        <article className="admin-panel">
          <CheckCircle2 size={21} />
          <h2>Manager handoff</h2>
          <p>Operational cases stay with Manager unless platform access, security, or audit intervention is needed.</p>
          <button type="button" onClick={() => setNotice('Manager handoff rules verified. Operational queues remain under /manager.')}>Verify handoff</button>
        </article>
      </section>
    </motion.div>
  );
}
