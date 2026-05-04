import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Activity,
  FileClock,
  KeyRound,
  ServerCog,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import RoleWorkspaceBridge from '../components/RoleWorkspaceBridge';
import '../styles/admin.css';

const adminNav = [
  { path: '/admin/dashboard', label: 'Platform Overview', desc: 'System health and governance', icon: Activity },
  { path: '/admin/users', label: 'Users & Roles', desc: 'Accounts, roles, access requests', icon: Users },
  { path: '/admin/security', label: 'Security', desc: 'Policies, sessions, risk controls', icon: KeyRound },
  { path: '/admin/audit', label: 'Audit Logs', desc: 'Trace platform actions', icon: FileClock },
  { path: '/admin/config', label: 'System Config', desc: 'Infrastructure-level settings', icon: ServerCog },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <div className="admin-shell">
      <div className={`admin-menu-backdrop ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav className={`admin-floating-menu ${open ? 'is-open' : ''}`} aria-label="Admin navigation">
        <div className="admin-floating-header">
          <Link to="/admin/dashboard" className="admin-brand" onClick={() => setOpen(false)}>
            <span><ShieldCheck size={19} /></span>
            <strong>HaNova Admin</strong>
          </Link>
          <button type="button" className="admin-menu-trigger" onClick={() => setOpen((current) => !current)} aria-expanded={open}>
            <SlidersHorizontal size={16} />
            {open ? 'Close' : 'Admin Menu'}
          </button>
        </div>

        <div className="admin-floating-links" data-lenis-prevent>
          <RoleWorkspaceBridge onNavigate={() => setOpen(false)} />
          {adminNav.map(({ path, label, desc, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `admin-floating-link ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={17} />
              <span>
                <strong>{label}</strong>
                <em>{desc}</em>
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
      <main className="admin-main">{children}</main>
    </div>
  );
}
