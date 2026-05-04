import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
import StarfieldCanvas from '../components/StarfieldCanvas';
import RoleWorkspaceBridge from '../components/RoleWorkspaceBridge';
import backgroundVideo from '../assets/videos/background-video.mp4';
import '../styles/manager.css';

const managerNav = [
  { path: '/manager/dashboard', label: 'Dashboard', num: '01', desc: 'Control center and alerts', icon: Gauge },
  { path: '/manager/tutors', label: 'Tutor Management', num: '02', desc: 'Approvals and performance', icon: UsersRound },
  { path: '/manager/bookings', label: 'Booking Monitoring', num: '03', desc: 'Conflicts and lesson state', icon: CalendarSearch },
  { path: '/manager/payments', label: 'Payments & Revenue', num: '04', desc: 'VNPay, MoMo, refunds', icon: CircleDollarSign },
  { path: '/manager/reviews', label: 'Reviews & Ratings', num: '05', desc: 'Moderation and quality', icon: Star },
  { path: '/manager/complaints', label: 'Complaints', num: '06', desc: 'Cases and resolution notes', icon: MessageSquareWarning },
  { path: '/manager/notifications', label: 'Notifications', num: '07', desc: 'Realtime operational events', icon: BellRing },
  { path: '/manager/insights', label: 'System Insights', num: '08', desc: 'Light analytics signals', icon: BarChart3 },
  { path: '/manager/settings', label: 'Settings', num: '09', desc: 'Rules and payment config', icon: Settings },
];

export default function ManagerLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="manager-shell">
      <StarfieldCanvas />
      <div className="manager-video-overlay" aria-hidden="true">
        <video autoPlay loop muted playsInline src={backgroundVideo} />
      </div>

      <div
        className={`manager-menu-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <nav className={`manager-floating-menu ${isOpen ? 'is-open' : ''}`} aria-label="Manager navigation">
        <div className="manager-floating-header">
          <Link to="/manager/dashboard" className="manager-floating-brand" onClick={() => setIsOpen(false)}>
            <span className="manager-floating-logo"><ShieldCheck size={20} /></span>
            <span>
              <strong>HaNova</strong>
              <em>Manager Control</em>
            </span>
          </Link>

          <button
            type="button"
            className="manager-menu-trigger"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close manager menu' : 'Open manager menu'}
          >
            <span className={isOpen ? 'manager-menu-x' : 'manager-menu-lines'} />
            <span>{isOpen ? 'Close' : 'Manager Menu'}</span>
          </button>
        </div>

        <div className="manager-floating-links" data-lenis-prevent>
          <RoleWorkspaceBridge onNavigate={() => setIsOpen(false)} />
          {managerNav.map(({ path, label, num, desc, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `manager-floating-link ${isActive ? 'is-active' : ''}`}
            >
              <span className="manager-floating-link-bar" />
              <span className="manager-floating-link-num">{num}</span>
              <span className="manager-floating-link-icon"><Icon size={17} /></span>
              <span className="manager-floating-link-copy">
                <strong>{label}</strong>
                <em>{desc}</em>
              </span>
            </NavLink>
          ))}
        </div>

        <div className="manager-floating-footer">
          <div className="flex items-start gap-3">
            <span className="manager-live-dot mt-1" />
            <span>
              <strong>Live operations</strong>
              <em>Manager handles operations. Admin handles roles, security and audit.</em>
            </span>
          </div>
        </div>
      </nav>

      <main className="manager-main">{children}</main>
    </div>
  );
}
