import { useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  BellRing,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Megaphone,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { readStoredUserProfile } from '../utils/helpers';

type NotificationRole = 'student' | 'tutor' | 'manager' | 'admin';
type Priority = 'critical' | 'high' | 'normal';
type Category = 'schedule' | 'booking' | 'learning' | 'finance' | 'system';

interface RoleMeta {
  label: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  pulse: string;
}

interface RoleNotification {
  id: string;
  role: NotificationRole;
  category: Category;
  priority: Priority;
  title: string;
  detail: string;
  time: string;
  target: string;
  action: string;
  unread: boolean;
}

const roleMeta: Record<NotificationRole, RoleMeta> = {
  student: {
    label: 'Student',
    subtitle: 'Class changes, homework, tutor messages',
    icon: GraduationCap,
    accent: 'from-cyan-400 to-blue-500',
    pulse: 'bg-cyan-400',
  },
  tutor: {
    label: 'Tutor',
    subtitle: 'Bookings, tagged students, leave notices',
    icon: UserRound,
    accent: 'from-amber-300 to-orange-500',
    pulse: 'bg-amber-300',
  },
  manager: {
    label: 'Manager',
    subtitle: 'Academic operations and coverage risk',
    icon: UsersRound,
    accent: 'from-emerald-300 to-teal-500',
    pulse: 'bg-emerald-300',
  },
  admin: {
    label: 'Admin',
    subtitle: 'Security, system health, audit controls',
    icon: ShieldCheck,
    accent: 'from-fuchsia-300 to-violet-500',
    pulse: 'bg-fuchsia-300',
  },
};

const categoryLabels: Record<Category, string> = {
  schedule: 'Schedule',
  booking: 'Booking',
  learning: 'Learning',
  finance: 'Finance',
  system: 'System',
};

const priorityLabels: Record<Priority, string> = {
  critical: 'Critical',
  high: 'Needs action',
  normal: 'FYI',
};

const initialNotifications: RoleNotification[] = [
  {
    id: 'student-leave-lananh',
    role: 'student',
    category: 'schedule',
    priority: 'critical',
    title: 'Math class changed to leave mode',
    detail: 'Dr. Nguyen Lan Anh marked Thu 18:00 as nghỉ học. Reason: school meeting. A make-up slot is waiting for confirmation.',
    time: 'Now',
    target: '@lananh',
    action: 'Pick make-up slot',
    unread: true,
  },
  {
    id: 'student-homework-minhquan',
    role: 'student',
    category: 'learning',
    priority: 'high',
    title: 'Writing task returned with notes',
    detail: 'Your IELTS Writing Task 2 draft has 3 focus comments and one follow-up exercise due before Friday.',
    time: '12m',
    target: '@minhquan',
    action: 'View feedback',
    unread: true,
  },
  {
    id: 'student-booking-baochau',
    role: 'student',
    category: 'booking',
    priority: 'normal',
    title: 'Suggested time accepted',
    detail: 'Bao Chau accepted Tue 20:00. The booking is waiting for tutor confirmation and payment hold refresh.',
    time: '1h',
    target: '@baochau',
    action: 'Open booking',
    unread: false,
  },
  {
    id: 'tutor-tag-groupa3',
    role: 'tutor',
    category: 'schedule',
    priority: 'critical',
    title: 'Tagged students need schedule notice',
    detail: '@group-a3 was tagged in a new Hybrid lesson. Send the confirmation before the 24h reminder window starts.',
    time: 'Now',
    target: '@group-a3',
    action: 'Send notice',
    unread: true,
  },
  {
    id: 'tutor-booking-thanhtruc',
    role: 'tutor',
    category: 'booking',
    priority: 'high',
    title: 'New booking request',
    detail: 'Thanh Truc requested Chemistry 11 for Fri 18:00. No conflict detected and MoMo hold is ready.',
    time: '7m',
    target: '@thanhtruc',
    action: 'Review request',
    unread: true,
  },
  {
    id: 'tutor-leave-reason',
    role: 'tutor',
    category: 'schedule',
    priority: 'normal',
    title: 'Leave reason delivered',
    detail: 'Your nghỉ học notice for @lananh was delivered by in-app push and email. Zalo fallback is queued.',
    time: '28m',
    target: '@lananh',
    action: 'View delivery',
    unread: false,
  },
  {
    id: 'manager-coverage-risk',
    role: 'manager',
    category: 'schedule',
    priority: 'critical',
    title: 'Coverage risk after tutor leave',
    detail: 'Two Grade 12 Math sessions need replacement coverage because a tutor marked leave with a school-meeting reason.',
    time: 'Now',
    target: 'Grade 12 Math',
    action: 'Assign substitute',
    unread: true,
  },
  {
    id: 'manager-payment-review',
    role: 'manager',
    category: 'finance',
    priority: 'high',
    title: 'Refund queue needs approval',
    detail: 'Bao Chau cancellation is inside the 24h window. Review refund policy before releasing payment.',
    time: '18m',
    target: 'Refund queue',
    action: 'Review refund',
    unread: true,
  },
  {
    id: 'manager-quality',
    role: 'manager',
    category: 'learning',
    priority: 'normal',
    title: 'Weekly progress summary ready',
    detail: '8 active study plans have updated progress notes. Parent summaries can be released today.',
    time: '2h',
    target: 'Academic ops',
    action: 'Open summary',
    unread: false,
  },
  {
    id: 'admin-security',
    role: 'admin',
    category: 'system',
    priority: 'critical',
    title: 'New admin session detected',
    detail: 'A privileged admin session started from a new device. Confirm it or revoke access from the audit panel.',
    time: 'Now',
    target: 'Access control',
    action: 'Open audit',
    unread: true,
  },
  {
    id: 'admin-integrations',
    role: 'admin',
    category: 'system',
    priority: 'high',
    title: 'Notification gateway degraded',
    detail: 'Email delivery is healthy, but Zalo fallback latency crossed the 95th percentile threshold.',
    time: '9m',
    target: 'Gateway health',
    action: 'Inspect gateway',
    unread: true,
  },
  {
    id: 'admin-policy',
    role: 'admin',
    category: 'finance',
    priority: 'normal',
    title: 'Payment policy synced',
    detail: 'VNPay and MoMo settlement rules were updated for the new workspace policy set.',
    time: '3h',
    target: 'Payment config',
    action: 'View config',
    unread: false,
  },
];

const categoryIcons: Record<Category, LucideIcon> = {
  schedule: CalendarClock,
  booking: BellRing,
  learning: GraduationCap,
  finance: Building2,
  system: Zap,
};

function getInitialRole(): NotificationRole {
  const profile = readStoredUserProfile();
  if (profile?.accountRole === 'tutor') return 'tutor';
  if (profile?.accountRole === 'manager') return 'manager';
  if (profile?.accountRole === 'admin') return 'admin';
  return 'student';
}

function priorityClass(priority: Priority) {
  if (priority === 'critical') return 'border-rose-400/30 bg-rose-500/10 text-rose-200';
  if (priority === 'high') return 'border-amber-300/30 bg-amber-400/10 text-amber-100';
  return 'border-white/10 bg-white/[0.04] text-white/48';
}

function NotificationMetric({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
      <div className="mb-3 flex items-center justify-between text-white/34">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]">{label}</span>
        {icon}
      </div>
      <strong className="font-serif text-2xl text-white">{value}</strong>
    </div>
  );
}

export default function Notifications() {
  const [activeRole, setActiveRole] = useState<NotificationRole>(() => getInitialRole());
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [readIds, setReadIds] = useState<string[]>([]);

  const roleNotifications = useMemo(
    () => initialNotifications.filter((item) => item.role === activeRole),
    [activeRole],
  );
  const visibleNotifications = useMemo(
    () => roleNotifications.filter((item) => activeCategory === 'all' || item.category === activeCategory),
    [activeCategory, roleNotifications],
  );

  const unreadCount = roleNotifications.filter((item) => item.unread && !readIds.includes(item.id)).length;
  const urgentCount = roleNotifications.filter((item) => item.priority === 'critical').length;
  const actionCount = roleNotifications.filter((item) => item.priority !== 'normal').length;
  const meta = roleMeta[activeRole];
  const RoleIcon = meta.icon;

  const markRead = (id: string) => setReadIds((current) => (current.includes(id) ? current : [...current, id]));
  const markAllRead = () => setReadIds((current) => Array.from(new Set([...current, ...roleNotifications.map((item) => item.id)])));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 pb-28 pt-[120px] text-white"
    >
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
            <Sparkles size={14} /> Smart notification center
          </p>
          <h1 className="font-serif text-4xl tracking-tight text-white lg:text-6xl">Notifications</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/54">
            Role-specific alerts for students, tutors, managers, and admins. Manager operations and admin controls are separated.
          </p>
        </div>

        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/58 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCircle2 size={15} /> Mark role read
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[330px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-3 backdrop-blur-xl">
            {Object.entries(roleMeta).map(([role, roleInfo]) => {
              const Icon = roleInfo.icon;
              const count = initialNotifications.filter((item) => item.role === role && item.unread && !readIds.includes(item.id)).length;
              const active = activeRole === role;
              return (
                <button
                  key={role}
                  onClick={() => {
                    setActiveRole(role as NotificationRole);
                    setActiveCategory('all');
                  }}
                  className={`group relative mb-2 flex w-full items-center gap-4 rounded-[22px] border p-4 text-left transition-all last:mb-0 ${
                    active ? 'border-white/16 bg-white/[0.08]' : 'border-transparent hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${roleInfo.accent} text-black shadow-[0_0_24px_rgba(255,255,255,0.08)]`}>
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-sm text-white">{roleInfo.label}</strong>
                    <em className="mt-1 block truncate text-xs not-italic text-white/36">{roleInfo.subtitle}</em>
                  </span>
                  {count > 0 && (
                    <span className="relative grid h-7 min-w-7 place-items-center rounded-full bg-white text-xs font-black text-black">
                      <span className={`absolute inset-0 rounded-full ${roleInfo.pulse} opacity-30 blur-md`} />
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            <NotificationMetric label="Unread" value={`${unreadCount}`} icon={<Bell size={15} />} />
            <NotificationMetric label="Urgent" value={`${urgentCount}`} icon={<AlertTriangle size={15} />} />
            <NotificationMetric label="Actions" value={`${actionCount}`} icon={<Megaphone size={15} />} />
          </div>
        </aside>

        <main className="min-w-0 overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <div className="relative overflow-hidden border-b border-white/10 p-6">
            <div className={`absolute -right-12 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${meta.accent} opacity-20 blur-[70px]`} />
            <div className="relative flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
              <div className="flex items-center gap-4">
                <div className={`relative grid h-14 w-14 place-items-center rounded-[22px] bg-gradient-to-br ${meta.accent} text-black`}>
                  <RoleIcon size={24} />
                  {unreadCount > 0 && <span className={`absolute -right-1 -top-1 h-4 w-4 rounded-full ${meta.pulse} ring-4 ring-[#090b14] animate-pulse`} />}
                </div>
                <div>
                  <h2 className="font-serif text-3xl text-white">{meta.label} alerts</h2>
                  <p className="mt-1 text-sm text-white/44">{meta.subtitle}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['all', 'schedule', 'booking', 'learning', 'finance', 'system'] as Array<Category | 'all'>).map((category) => {
                  const count = category === 'all'
                    ? roleNotifications.length
                    : roleNotifications.filter((item) => item.category === category).length;
                  if (count === 0 && category !== 'all') return null;
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] transition ${
                        active ? 'border-white/22 bg-white text-black' : 'border-white/10 bg-white/[0.035] text-white/48 hover:bg-white/[0.075] hover:text-white'
                      }`}
                    >
                      {category === 'all' ? 'All' : categoryLabels[category]} {count}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="max-h-[680px] overflow-y-auto p-5 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {visibleNotifications.map((notification, index) => {
                const Icon = categoryIcons[notification.category];
                const read = !notification.unread || readIds.includes(notification.id);
                return (
                  <motion.article
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.34, delay: index * 0.04 }}
                    className={`group relative mb-3 overflow-hidden rounded-[24px] border p-5 transition last:mb-0 ${
                      read ? 'border-white/8 bg-white/[0.018]' : 'border-white/14 bg-white/[0.055] shadow-[0_18px_60px_rgba(0,0,0,0.24)]'
                    }`}
                  >
                    {!read && (
                      <motion.span
                        className={`absolute inset-y-4 left-0 w-1 rounded-full bg-gradient-to-b ${meta.accent}`}
                        animate={{ opacity: [0.48, 1, 0.48] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}

                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-[18px] border ${priorityClass(notification.priority)}`}>
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${priorityClass(notification.priority)}`}>
                            {priorityLabels[notification.priority]}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
                            {categoryLabels[notification.category]}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
                            {notification.target}
                          </span>
                        </div>

                        <h3 className={`text-lg font-semibold leading-snug ${read ? 'text-white/64' : 'text-white'}`}>{notification.title}</h3>
                        <p className={`mt-2 max-w-3xl text-sm leading-6 ${read ? 'text-white/36' : 'text-white/58'}`}>{notification.detail}</p>
                      </div>

                      <div className="flex shrink-0 items-center justify-between gap-3 md:flex-col md:items-end">
                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/30">{notification.time}</span>
                        <div className="flex items-center gap-2">
                          {!read && (
                            <button
                              onClick={() => markRead(notification.id)}
                              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/42 transition hover:bg-white/[0.09] hover:text-white"
                              aria-label={`Mark ${notification.title} read`}
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-cyan-50">
                            {notification.action} <ChevronRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {visibleNotifications.length === 0 && (
              <div className="grid min-h-[320px] place-items-center text-center">
                <div>
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/24">
                    <Bell size={26} />
                  </div>
                  <h3 className="font-serif text-2xl text-white/70">No alerts in this lane</h3>
                  <p className="mt-2 text-sm text-white/36">Try another role or category.</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </motion.div>
  );
}
