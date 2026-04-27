import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  BellRing,
  CalendarSearch,
  CircleDollarSign,
  Gauge,
  MessageSquareWarning,
  Settings,
  ShieldCheck,
  Star,
  UsersRound,
} from 'lucide-react';
import '../styles/manager.css';

const managerNav = [
  { path: '/manager/dashboard', label: 'Dashboard', icon: Gauge },
  { path: '/manager/tutors', label: 'Tutor Management', icon: UsersRound },
  { path: '/manager/bookings', label: 'Booking Monitoring', icon: CalendarSearch },
  { path: '/manager/payments', label: 'Payments & Revenue', icon: CircleDollarSign },
  { path: '/manager/reviews', label: 'Reviews & Ratings', icon: Star },
  { path: '/manager/complaints', label: 'Complaints', icon: MessageSquareWarning },
  { path: '/manager/notifications', label: 'Notifications', icon: BellRing },
  { path: '/manager/insights', label: 'System Insights', icon: BarChart3 },
  { path: '/manager/settings', label: 'Settings', icon: Settings },
];

export default function ManagerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="manager-shell">
      <header className="manager-topbar">
        <NavLink to="/manager/dashboard" className="manager-brand" aria-label="HaNova Manager dashboard">
          <span className="manager-brand-mark"><ShieldCheck size={21} /></span>
          <span>
            <strong>HaNova</strong>
            <small>Manager Control</small>
          </span>
        </NavLink>

        <nav className="manager-nav" aria-label="Manager navigation">
          {managerNav.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} className={({ isActive }) => `manager-nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="manager-live">
          <span />
          Live ops
        </div>
      </header>

      <main className="manager-main">{children}</main>
    </div>
  );
}
