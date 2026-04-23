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

const tutorLinks = [
  { path: '/tutor/dashboard', label: 'Home', icon: Home },
  { path: '/tutor/schedule', label: 'My Schedule', icon: CalendarDays },
  { path: '/tutor/bookings', label: 'Booking Requests', icon: ClipboardList },
  { path: '/tutor/lessons', label: 'My Lessons', icon: BookOpenCheck },
  { path: '/tutor/study-plans', label: 'Study Plans', icon: GraduationCap },
  { path: '/tutor/students', label: 'Students / Groups', icon: UsersRound },
  { path: '/tutor/notifications', label: 'Notifications', icon: Bell },
  { path: '/tutor/profile', label: 'Tutor Profile', icon: UserRound },
  { path: '/tutor/settings', label: 'Settings', icon: Settings },
];

function LogoMark() {
  return (
    <div className="tutor-logo-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 8 L38 16.5 L38 31.5 L24 40 L10 31.5 L10 16.5 Z" stroke="white" strokeWidth="1.2" />
        <path d="M24 13 L33 18.5 L33 29.5 L24 35 L15 29.5 L15 18.5 Z" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="rgba(255,255,255,0.03)" />
        <path d="M19 18 L19 30M29 18 L29 30M19 24 L29 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="24" cy="4" r="1.5" fill="white" opacity="0.8" />
        <path d="M24 1 L24 7" stroke="white" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function TutorNavigation() {
  const location = useLocation();
  const [profile, setProfile] = useState(() => readStoredUserProfile());
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

  const tutorName = profile?.accountRole === 'tutor' ? profile.name : 'Dr. Nguyen Lan Anh';

  return (
    <header className="tutor-topbar">
      <div className="tutor-topbar-inner">
        <Link to="/tutor/dashboard" className="tutor-brand" aria-label="HaNova Tutor Home">
          <LogoMark />
          <div>
            <span className="tutor-brand-name">HaNova</span>
            <span className="tutor-brand-kicker">Tutor Workspace</span>
          </div>
        </Link>

        <nav className="tutor-nav" aria-label="Tutor navigation">
          {tutorLinks.map(({ path, label, icon: Icon }) => {
            const isActive = activePath === path;
            return (
              <Link
                key={path}
                to={path}
                className={`tutor-nav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="tutor-nav-profile" aria-label="Tutor status">
          <span className="tutor-live-dot" />
          <div>
            <strong>{tutorName}</strong>
            <span>Verified tutor</span>
          </div>
        </div>
      </div>
    </header>
  );
}
