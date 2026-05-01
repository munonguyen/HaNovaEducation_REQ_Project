import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  BookOpenCheck,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Home,
  Settings,
  UserRound,
  UsersRound,
} from 'lucide-react';
import { readStoredUserProfile, USER_UPDATED_EVENT } from '../../utils/helpers';
import RoleWorkspaceBridge from '../RoleWorkspaceBridge';

const tutorLinks = [
  { path: '/tutor/dashboard', label: 'Home', num: '01', desc: 'Daily teaching overview', icon: Home },
  { path: '/tutor/schedule', label: 'My Schedule', num: '02', desc: 'Availability and conflict control', icon: CalendarDays },
  { path: '/tutor/bookings', label: 'Booking Requests', num: '03', desc: 'Accept, reject, suggest time', icon: ClipboardList },
  { path: '/tutor/lessons', label: 'My Lessons', num: '04', desc: 'Upcoming, completed, cancelled', icon: BookOpenCheck },
  { path: '/tutor/study-plans', label: 'Study Plans', num: '05', desc: 'Roadmaps, tasks, materials', icon: GraduationCap },
  { path: '/tutor/students', label: 'Students / Groups', num: '06', desc: 'Progress, notes, group sessions', icon: UsersRound },
  { path: '/tutor/notifications', label: 'Notifications', num: '07', desc: 'Booking and reminder updates', icon: Bell },
  { path: '/tutor/profile', label: 'Tutor Profile', num: '08', desc: 'Bio, pricing, certificates', icon: UserRound },
  { path: '/tutor/settings', label: 'Settings', num: '09', desc: 'Availability, payments, alerts', icon: Settings },
];

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 8 L38 16.5 L38 31.5 L24 40 L10 31.5 L10 16.5 Z" stroke="white" strokeWidth="1.2" />
      <path d="M24 13 L33 18.5 L33 29.5 L24 35 L15 29.5 L15 18.5 Z" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="rgba(255,255,255,0.03)" />
      <path d="M19 18 L19 30M29 18 L29 30M19 24 L29 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="24" cy="4" r="1.5" fill="white" opacity="0.8" />
      <path d="M24 1 L24 7" stroke="white" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export default function TutorNavigation() {
  const location = useLocation();
  const [profile, setProfile] = useState(() => readStoredUserProfile());
  const [isOpen, setIsOpen] = useState(false);
  const activePath = location.pathname === '/tutor' ? '/tutor/dashboard' : location.pathname;

  useEffect(() => {
    const syncProfile = () => setProfile(readStoredUserProfile());
    window.addEventListener('storage', syncProfile);
    window.addEventListener(USER_UPDATED_EVENT, syncProfile);
    return () => {
      window.removeEventListener('storage', syncProfile);
      window.removeEventListener(USER_UPDATED_EVENT, syncProfile);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const tutorName = profile?.accountRole === 'tutor' ? profile.name : 'Dr. Nguyen Lan Anh';

  return (
    <>
      <div className={`tutor-menu-backdrop${isOpen ? ' is-open' : ''}`} onClick={() => setIsOpen(false)} />

      <nav className={`tutor-floating-menu${isOpen ? ' is-open' : ''}`} aria-label="Tutor navigation">
        <div className="tutor-floating-header">
          <Link to="/tutor/dashboard" className="tutor-floating-brand" onClick={() => setIsOpen(false)} aria-label="HaNova Tutor Home">
            <span className="tutor-floating-logo">
              <LogoMark />
            </span>
            <span>
              <strong>HaNova</strong>
              <em>Tutor Workspace</em>
            </span>
          </Link>

          <button className="tutor-menu-trigger" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} type="button">
            {isOpen ? (
              <>
                <span className="tutor-menu-x" />
                Close
              </>
            ) : (
              <>
                <span className="tutor-menu-lines" />
                Tutor Menu
              </>
            )}
          </button>
        </div>

        <div className="tutor-floating-links">
          <RoleWorkspaceBridge onNavigate={() => setIsOpen(false)} />
          {tutorLinks.map(({ path, label, num, desc, icon: Icon }) => {
            const isActive = activePath === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`tutor-floating-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="tutor-floating-link-bar" />
                <span className="tutor-floating-link-num">{num}</span>
                <span className="tutor-floating-link-icon"><Icon size={16} /></span>
                <span className="tutor-floating-link-copy">
                  <strong>{label}</strong>
                  <em>{desc}</em>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="tutor-floating-footer">
          <span className="tutor-live-dot" />
          <span>
            <strong>{tutorName}</strong>
            <em>Verified tutor</em>
          </span>
        </div>
      </nav>
    </>
  );
}
