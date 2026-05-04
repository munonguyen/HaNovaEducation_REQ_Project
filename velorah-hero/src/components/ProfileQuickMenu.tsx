import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  CreditCard,
  LogIn,
  LogOut,
  Settings,
  User,
} from 'lucide-react';
import {
  USER_UPDATED_EVENT,
  clearStoredUserProfile,
  readStoredUserProfile,
  type StoredUserProfile,
} from '../utils/helpers';
const authRoutes = ['/signin', '/signup', '/forgot-password', '/auth-success'];

export default function ProfileQuickMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [profile, setProfile] = useState<StoredUserProfile | null>(() => readStoredUserProfile());
  const [open, setOpen] = useState(false);
  const currentTab = new URLSearchParams(location.search).get('tab');

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
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  if (authRoutes.includes(location.pathname)) return null;

  if (!profile) {
    return (
      <div className="fixed right-4 top-5 z-[1000] sm:right-8 sm:top-7">
        <Link
          to="/signin"
          className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-cyan-200/30 bg-[linear-gradient(135deg,rgba(6,8,19,0.88),rgba(20,29,55,0.78))] px-2.5 py-2 pr-3 text-white shadow-[0_18px_55px_rgba(0,0,0,0.42),0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-cyan-100/50 hover:bg-[#0b1020]/90 hover:shadow-[0_22px_65px_rgba(0,0,0,0.5),0_0_34px_rgba(34,211,238,0.2)]"
          aria-label="Log in to HaNova"
        >
          <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/55 to-transparent" />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-100/25 bg-cyan-200/[0.12] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.18)]">
            <LogIn size={16} />
          </span>
          <span className="min-w-0 text-left">
            <span className="block text-sm font-bold leading-4 text-white">Log in</span>
            <span className="mt-1 hidden text-[10px] uppercase tracking-[0.18em] text-cyan-100/45 sm:block">
              Student access
            </span>
          </span>
          <ArrowRight size={15} className="text-cyan-100/55 transition group-hover:translate-x-0.5 group-hover:text-cyan-50" />
        </Link>
      </div>
    );
  }

  const actions = [
    {
      label: 'Profile',
      detail: 'Personal details and account info',
      href: profile.role === 'tutor' ? '/tutor/profile' : '/profile?tab=personal',
      icon: User,
      active: location.pathname.includes('/profile') && (!currentTab || currentTab === 'personal'),
    },
    {
      label: 'Settings',
      detail: 'Preferences, notifications, security',
      href: profile.role === 'tutor' ? '/tutor/settings' : '/profile?tab=preferences',
      icon: Settings,
      active: location.pathname.includes('/settings') || (location.pathname.includes('/profile') && (currentTab === 'preferences' || currentTab === 'security')),
    },
    ...(profile.role === 'student' ? [
      {
        label: 'Study plan',
        detail: 'Milestones from onboarding',
        href: '/study-plan',
        icon: BookOpen,
        active: location.pathname === '/study-plan',
      },
      {
        label: 'Schedule',
        detail: 'Upcoming sessions',
        href: '/schedule',
        icon: Calendar,
        active: location.pathname === '/schedule',
      },
      {
        label: 'Billing',
        detail: 'VNPay, MoMo, invoices',
        href: '/profile?tab=billing',
        icon: CreditCard,
        active: location.pathname === '/profile' && currentTab === 'billing',
      }
    ] : []),
    {
      label: 'Notifications',
      detail: 'Reminders and updates',
      href: profile.role === 'tutor' ? '/tutor/notifications' : (profile.role === 'manager' ? '/manager/notifications' : '/notifications'),
      icon: Bell,
      active: location.pathname.includes('/notifications'),
    },
  ];

  return (
    <div ref={menuRef} className="fixed right-4 top-5 z-[1000] sm:right-8 sm:top-7">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#060813]/75 px-2.5 py-2 pr-3 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition hover:border-white/[0.22] hover:bg-[#0b1020]/85"
        aria-expanded={open}
        aria-label="Open profile menu"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.18] bg-gradient-to-br from-cyan-300/30 to-violet-400/35 font-serif text-sm text-white shadow-[0_0_18px_rgba(34,211,238,0.12)]">
          {profile.initials}
        </span>
        <span className="hidden max-w-[150px] text-left sm:block">
          <span className="block truncate text-sm font-semibold leading-4 text-white">{profile.name}</span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-white/35">{profile.role}</span>
        </span>
        <ChevronDown size={15} className={`text-white/45 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 mt-3 w-[min(340px,calc(100vw-32px))] origin-top-right overflow-hidden rounded-[26px] border border-white/[0.12] bg-[#060813]/92 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-300 ${
          open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-[0.98] opacity-0'
        }`}
      >
        <div className="border-b border-white/10 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.16] bg-gradient-to-br from-cyan-300/25 to-violet-400/30 font-serif text-lg text-white">
              {profile.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-white">{profile.name}</p>
              <p className="mt-1 truncate text-xs text-white/[0.42]">{profile.email}</p>
            </div>
          </div>
          {profile.goal && (
            <div className="mt-4 rounded-2xl border border-cyan-200/[0.12] bg-cyan-200/[0.045] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">Current goal</p>
              <p className="mt-1 text-xs leading-5 text-white/[0.62]">{profile.goal}</p>
            </div>
          )}
        </div>

        <div className="p-2">
          {actions.map((action) => (
            <Link
              key={`${action.label}-${action.href}`}
              to={action.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition ${
                action.active ? 'bg-white/[0.055]' : 'hover:bg-white/[0.055]'
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] ${
                  action.active ? 'text-cyan-100' : 'text-white/[0.46] group-hover:text-cyan-100'
                }`}
              >
                <action.icon size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm font-semibold ${action.active ? 'text-white' : 'text-white/[0.78] group-hover:text-white'}`}>
                  {action.label}
                </span>
                <span className="mt-0.5 block truncate text-xs text-white/32">{action.detail}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => {
              clearStoredUserProfile();
              setProfile(null);
              setOpen(false);
              navigate('/signin');
            }}
            className="flex w-full items-center justify-between rounded-2xl border border-red-400/[0.12] bg-red-400/[0.04] px-4 py-3 text-left text-sm font-semibold text-red-200/[0.72] transition hover:bg-red-400/[0.08] hover:text-red-100"
          >
            <span className="flex items-center gap-3">
              <LogOut size={16} />
              Sign out
            </span>
            <ArrowRight size={15} className="text-red-200/[0.35]" />
          </button>
        </div>
      </div>
    </div>
  );
}
