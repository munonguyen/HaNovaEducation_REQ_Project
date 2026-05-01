import { Link, useLocation } from 'react-router-dom';
import { Building2, GraduationCap, School, ShieldCheck } from 'lucide-react';

const roleWorkspaces = [
  {
    id: 'student',
    label: 'Student Workspace',
    detail: 'Learning, booking, study plans',
    path: '/dashboard',
    icon: GraduationCap,
  },
  {
    id: 'tutor',
    label: 'Tutor Workspace',
    detail: 'Teaching, lessons, students',
    path: '/tutor/dashboard',
    icon: School,
  },
  {
    id: 'manager',
    label: 'Manager Workspace',
    detail: 'Operations and queues',
    path: '/manager/dashboard',
    icon: Building2,
  },
  {
    id: 'admin',
    label: 'Admin Workspace',
    detail: 'Users, security, audit',
    path: '/admin/dashboard',
    icon: ShieldCheck,
  },
] as const;

function isActiveWorkspace(pathname: string, path: string) {
  if (path === '/dashboard') return pathname === '/dashboard';
  return pathname === path || pathname.startsWith(path.replace('/dashboard', '/'));
}

export default function RoleWorkspaceBridge({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <section className="role-workspace-bridge" aria-label="Role workspace switcher">
      <div className="role-workspace-heading">
        <span>Connected roles</span>
        <strong>Switch workspace</strong>
      </div>
      <div className="role-workspace-grid">
        {roleWorkspaces.map(({ id, label, detail, path, icon: Icon }) => {
          const active = isActiveWorkspace(location.pathname, path);

          return (
            <Link
              key={id}
              to={path}
              onClick={onNavigate}
              className={`role-workspace-link ${active ? 'is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="role-workspace-icon"><Icon size={15} /></span>
              <span>
                <strong>{label}</strong>
                <em>{detail}</em>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
