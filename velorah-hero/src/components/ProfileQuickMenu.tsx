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
  ShieldCheck,
  Gauge,
  UsersRound,
  CalendarSearch,
  CircleDollarSign,
  FileClock,
  KeyRound,
  ServerCog,
} from 'lucide-react';
import {
  USER_UPDATED_EVENT,
  clearStoredUserProfile,
  readStoredUserProfile,
  type StoredUserProfile,
} from '../utils/helpers';

const authRoutes = ['/signin', '/signup', '/forgot-password', '/auth-success'];

interface RoleTheme {
  primary: string;
  gradient: string;
  iconBg: string;
  border: string;
  accentText: string;
}

interface RoleTheme {
  primary: string;
  gradient: string;
  iconBg: string;
  border: string;
  accentText: string;
  isLight?: boolean;
}

const ROLE_THEMES: Record<string, RoleTheme> = {
  student: {
    primary: 'cyan',
    gradient: 'from-cyan-300/30 to-violet-400/35',
    iconBg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    accentText: 'text-cyan-100',
    isLight: false,
  },
  tutor: {
    primary: 'blue',
    gradient: 'from-blue-400/30 to-indigo-500/35',
    iconBg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    accentText: 'text-blue-100',
    isLight: false,
  },
  manager: {
    primary: 'emerald',
    gradient: 'from-emerald-400/30 to-teal-500/35',
    iconBg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    accentText: 'text-emerald-600',
    isLight: true,
  },
  admin: {
    primary: 'rose',
    gradient: 'from-rose-400/30 to-indigo-500/35',
    iconBg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    accentText: 'text-rose-600',
    isLight: true,
  }
};

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
    document.body.style.overflow = open ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  if (authRoutes.includes(location.pathname)) return null;

  const isTutorWorkspace = location.pathname.startsWith('/tutor');
  const isManagerWorkspace = location.pathname.startsWith('/manager');
  const isAdminWorkspace = location.pathname.startsWith('/admin');
  const isLightShell = isManagerWorkspace || isAdminWorkspace;

  if (!profile) {
    let label = 'Student access';
    let themeBorder = 'border-cyan-200/30';
    let themeBg = 'bg-cyan-200/[0.12]';
    let themeShadow = 'shadow-[0_0_28px_rgba(34,211,238,0.12)]';
    let themeIconColor = 'text-cyan-100';
    let cardBg = 'bg-[linear-gradient(135deg,rgba(6,8,19,0.88),rgba(20,29,55,0.78))]';
    let textColor = 'text-white';

    if (isTutorWorkspace) {
      label = 'Tutor access';
      themeBorder = 'border-blue-200/30';
      themeBg = 'bg-blue-200/[0.12]';
      themeShadow = 'shadow-[0_0_28px_rgba(59,130,246,0.12)]';
      themeIconColor = 'text-blue-100';
    } else if (isManagerWorkspace) {
      label = 'Manager access';
      themeBorder = 'border-emerald-600/20';
      themeBg = 'bg-emerald-600/10';
      themeShadow = 'shadow-[0_12px_40px_rgba(16,185,129,0.08)]';
      themeIconColor = 'text-emerald-600';
      cardBg = 'bg-white/90';
      textColor = 'text-slate-900';
    } else if (isAdminWorkspace) {
      label = 'Admin access';
      themeBorder = 'border-rose-600/20';
      themeBg = 'bg-rose-600/10';
      themeShadow = 'shadow-[0_12px_40px_rgba(244,63,94,0.08)]';
      themeIconColor = 'text-rose-600';
      cardBg = 'bg-white/90';
      textColor = 'text-slate-900';
    }

    return (
      <div className="fixed right-4 top-5 z-[1000] sm:right-8 sm:top-7">
        <Link
          to="/signin"
          className={`group relative flex items-center gap-3 overflow-hidden rounded-full border ${themeBorder} ${cardBg} px-2.5 py-2 pr-3 ${textColor} shadow-[0_18px_55px_rgba(0,0,0,0.12),${themeShadow}] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:shadow-lg`}
          aria-label="Log in to HaNova"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/5 ${themeBg} ${themeIconColor}`}>
            <LogIn size={16} />
          </span>
          <span className="min-w-0 text-left">
            <span className={`block text-sm font-bold leading-4 ${isLightShell ? 'text-slate-900' : 'text-white'}`}>Log in</span>
            <span className={`mt-1 hidden text-[10px] uppercase tracking-[0.18em] ${themeIconColor} opacity-70 sm:block`}>
              {label}
            </span>
          </span>
          <ArrowRight size={15} className={`${themeIconColor} opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100`} />
        </Link>
      </div>
    );
  }

  const role = (profile.role?.toLowerCase() || 'student') as keyof typeof ROLE_THEMES;
  const theme = ROLE_THEMES[role] || ROLE_THEMES.student;
  const isLight = theme.isLight;

  const actions = [
    // ROLE-SPECIFIC DASHBOARD LINK
    ...(role === 'student' ? [] : [
      {
        label: role === 'admin' ? 'Admin Center' : 'Workspace Home',
        detail: `Switch to ${role} dashboard`,
        href: `/${role}/dashboard`,
        icon: role === 'admin' ? ShieldCheck : (role === 'manager' ? Gauge : BookOpen),
        active: location.pathname.includes('/dashboard'),
      }
    ]),

    // CORE LINKS
    {
      label: 'Profile',
      detail: 'Personal details and account info',
      href: role === 'tutor' ? '/tutor/profile' : '/profile?tab=personal',
      icon: User,
      active: location.pathname.includes('/profile') && (!currentTab || currentTab === 'personal'),
    },
    {
      label: 'Settings',
      detail: 'Preferences and security',
      href: role === 'tutor' ? '/tutor/settings' : (role === 'manager' ? '/manager/settings' : '/profile?tab=preferences'),
      icon: Settings,
      active: location.pathname.includes('/settings') || (location.pathname.includes('/profile') && (currentTab === 'preferences' || currentTab === 'security')),
    },

    // STUDENT EXCLUSIVES
    ...(role === 'student' ? [
      {
        label: 'Study plan',
        detail: 'Milestones and roadmaps',
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

    // MANAGER EXCLUSIVES
    ...(role === 'manager' ? [
      { label: 'Tutors', detail: 'Management & performance', href: '/manager/tutors', icon: UsersRound, active: location.pathname === '/manager/tutors' },
      { label: 'Bookings', detail: 'Monitoring & states', href: '/manager/bookings', icon: CalendarSearch, active: location.pathname === '/manager/bookings' },
      { label: 'Payments', detail: 'VNPay, MoMo, Revenue', href: '/manager/payments', icon: CircleDollarSign, active: location.pathname === '/manager/payments' },
    ] : []),

    // ADMIN EXCLUSIVES
    ...(role === 'admin' ? [
      { label: 'Users', detail: 'Accounts & Roles', href: '/admin/users', icon: UsersRound, active: location.pathname === '/admin/users' },
      { label: 'Security', detail: 'Policies & risk controls', href: '/admin/security', icon: KeyRound, active: location.pathname === '/admin/security' },
      { label: 'Audit Logs', detail: 'Trace system actions', href: '/admin/audit', icon: FileClock, active: location.pathname === '/admin/audit' },
      { label: 'Platform Config', detail: 'Infrastructure settings', href: '/admin/config', icon: ServerCog, active: location.pathname === '/admin/config' },
    ] : []),

    {
      label: 'Notifications',
      detail: 'Alerts and updates',
      href: role === 'tutor' ? '/tutor/notifications' : (role === 'manager' ? '/manager/notifications' : '/notifications'),
      icon: Bell,
      active: location.pathname.includes('/notifications'),
    },
  ];

  return (
    <div ref={menuRef} className="fixed right-4 top-5 z-[1000] sm:right-8 sm:top-7">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`group flex items-center gap-3 rounded-full border ${isLight ? 'border-black/10 bg-white/85 shadow-[0_12px_40px_rgba(0,0,0,0.08)]' : 'border-white/[0.12] bg-[#060813]/75 shadow-[0_18px_50px_rgba(0,0,0,0.35)]'} px-2.5 py-2 pr-3 backdrop-blur-2xl transition hover:scale-[1.02] active:scale-[0.98]`}
        aria-expanded={open}
        aria-label="Open profile menu"
      >
        <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${isLight ? 'border-black/5' : 'border-white/[0.18]'} bg-gradient-to-br ${theme.gradient} font-serif text-sm text-white shadow-sm`}>
          {profile.initials}
        </span>
        <span className="hidden max-w-[150px] text-left sm:block">
          <span className={`block truncate text-sm font-bold leading-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>{profile.name}</span>
          <span className={`mt-1 block text-[10px] uppercase tracking-[0.18em] ${theme.accentText} opacity-80 font-bold`}>{profile.role}</span>
        </span>
        <ChevronDown size={15} className={`transition ${isLight ? 'text-slate-400' : 'text-white/45'} ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 mt-3 w-[min(340px,calc(100vw-32px))] origin-top-right overflow-hidden rounded-[26px] border ${isLight ? 'border-black/10 bg-white/95 shadow-[0_40px_100px_rgba(0,0,0,0.15)]' : 'border-white/[0.12] bg-[#060813]/92 shadow-[0_30px_90px_rgba(0,0,0,0.55)]'} backdrop-blur-2xl transition-all duration-300 ${
          open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-[0.98] opacity-0'
        }`}
      >
        <div className={`border-b ${isLight ? 'border-black/5' : 'border-white/10'} p-5`}>
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full border ${isLight ? 'border-black/5' : 'border-white/[0.16]'} bg-gradient-to-br ${theme.gradient} font-serif text-lg text-white`}>
              {profile.initials}
            </div>
            <div className="min-w-0">
              <p className={`truncate text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{profile.name}</p>
              <p className={`mt-1 truncate text-xs ${isLight ? 'text-slate-500' : 'text-white/[0.42]'}`}>{profile.email}</p>
            </div>
          </div>
          {profile.goal && role === 'student' && (
            <div className={`mt-4 rounded-2xl border ${theme.border} ${theme.iconBg} px-4 py-3`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${theme.accentText} opacity-70`}>Current goal</p>
              <p className="mt-1 text-xs leading-5 text-white/[0.62]">{profile.goal}</p>
            </div>
          )}
        </div>

        <div className="p-2 custom-scrollbar max-h-[60vh] overflow-y-auto overscroll-contain" data-lenis-prevent>
          {actions.map((action) => (
            <Link
              key={`${action.label}-${action.href}`}
              to={action.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-3 transition ${
                action.active ? (isLight ? 'bg-slate-100' : 'bg-white/[0.055]') : (isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.055]')
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${isLight ? 'border-black/5' : 'border-white/[0.08]'} ${theme.iconBg} ${
                  action.active ? theme.accentText : (isLight ? 'text-slate-400 group-hover:text-slate-900' : 'text-white/[0.46] group-hover:text-white')
                }`}
              >
                <action.icon size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm font-bold ${action.active ? (isLight ? 'text-slate-900' : 'text-white') : (isLight ? 'text-slate-600 group-hover:text-slate-900' : 'text-white/[0.78] group-hover:text-white')}`}>
                  {action.label}
                </span>
                <span className={`mt-0.5 block truncate text-xs ${isLight ? 'text-slate-400' : 'text-white/32'}`}>{action.detail}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className={`border-t ${isLight ? 'border-black/5' : 'border-white/10'} p-3`}>
          <button
            type="button"
            onClick={() => {
              clearStoredUserProfile();
              setProfile(null);
              setOpen(false);
              navigate('/signin');
            }}
            className="flex w-full items-center justify-between rounded-2xl border border-red-400/[0.12] bg-red-400/[0.04] px-4 py-3 text-left text-sm font-bold text-red-500/80 transition hover:bg-red-400/[0.08] hover:text-red-600"
          >
            <span className="flex items-center gap-3">
              <LogOut size={16} />
              Sign out
            </span>
            <ArrowRight size={15} className="text-red-500/30" />
          </button>
        </div>
      </div>
    </div>
  );
}


