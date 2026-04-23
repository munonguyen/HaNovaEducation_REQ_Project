import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Filter,
  Layers3,
  Lightbulb,
  MessagesSquare,
  Plus,
  Search,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { cn } from '../utils/helpers';
import {
  baseStudyGroups,
  groupLevels,
  groupModes,
  readStudyGroupActivity,
  groupSubjects,
  groupTimeSlots,
  STUDY_GROUPS_UPDATED_EVENT,
  groupViews,
  readCreatedStudyGroups,
  readJoinedStudyGroupIds,
  writeCreatedStudyGroups,
  writeJoinedStudyGroupIds,
} from '../data/studyGroups';
import type { StudyGroup, StudyGroupLevel, TimeSlot } from '../data/studyGroups';

interface StoredProfile {
  name: string;
  initials: string;
  goal?: string;
}

type GroupView = (typeof groupViews)[number];
type SubjectFilter = (typeof groupSubjects)[number];
type LevelFilter = (typeof groupLevels)[number];
type ModeFilter = (typeof groupModes)[number];

const USER_KEY = 'hanova:user-profile';
const EASE = [0.22, 1, 0.36, 1] as const;

function readProfile() {
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredProfile;
  } catch {
    return null;
  }
}

function parseView(value: string | null): GroupView {
  return value === 'my-groups' ? 'my-groups' : 'discover';
}

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Bell;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{label}</p>
          <p className="mt-3 text-2xl font-serif text-white">{value}</p>
          <p className="mt-2 text-sm leading-6 text-white/48">{detail}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-100/80">
          <Icon size={18} />
        </span>
      </div>
    </div>
  );
}

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition',
        active
          ? 'border-cyan-200/30 bg-cyan-200/[0.12] text-cyan-50 shadow-[0_0_20px_rgba(34,211,238,0.08)]'
          : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/80',
      )}
    >
      {label}
    </button>
  );
}

function NotificationTone(kind: string) {
  switch (kind) {
    case 'Task':
      return 'border-amber-400/20 bg-amber-400/[0.06] text-amber-200';
    case 'Schedule':
      return 'border-blue-400/20 bg-blue-400/[0.06] text-blue-200';
    case 'Announcement':
      return 'border-violet-400/20 bg-violet-400/[0.06] text-violet-200';
    default:
      return 'border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200';
  }
}

function GroupCard({
  group,
  joined,
  onJoin,
}: {
  group: StudyGroup;
  joined: boolean;
  onJoin: (groupId: string) => void;
}) {
  const isFull = group.status === 'Full';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/45 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_72%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                {group.subject}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                {group.level}
              </span>
              <span
                className={cn(
                  'rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]',
                  group.mode === 'Tutor-led'
                    ? 'border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-100/80'
                    : 'border-violet-200/20 bg-violet-200/[0.08] text-violet-100/80',
                )}
              >
                {group.mode}
              </span>
            </div>
            <h3 className="mt-4 text-[28px] font-serif leading-tight text-white">{group.name}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/52">{group.description}</p>
          </div>

          <span
            className={cn(
              'rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]',
              isFull
                ? 'border-white/12 bg-white/[0.04] text-white/40'
                : 'border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-200',
            )}
          >
            {group.status}
          </span>
        </div>

        <div className="mt-6 grid gap-3 text-sm text-white/60 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">Next session</p>
            <p className="mt-2 font-medium text-white/84">{group.nextSessionLabel}</p>
            <p className="mt-1 text-xs text-white/42">{group.schedulePreview}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">Members</p>
            <p className="mt-2 font-medium text-white/84">
              {group.memberCount}/{group.maxMembers} learners
            </p>
            <p className="mt-1 text-xs text-white/42">
              {group.tutorName ? `Tutor: ${group.tutorName}` : 'Peer-led study rhythm'}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/8 bg-black/15 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/45">Why HaNova recommends this</p>
          <ul className="mt-3 space-y-2 text-sm text-white/62">
            {group.recommendedReasons.slice(0, 2).map((reason) => (
              <li key={reason} className="flex items-start gap-2">
                <Sparkles size={14} className="mt-0.5 shrink-0 text-cyan-100/70" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {group.availability.map((slot) => (
              <span key={slot} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                {slot}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/groups/${group.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/78 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              View group
              <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              onClick={() => onJoin(group.id)}
              disabled={joined || isFull}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
                joined
                  ? 'cursor-default border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-100'
                  : isFull
                    ? 'cursor-not-allowed border border-white/10 bg-white/[0.03] text-white/35'
                    : 'border border-cyan-200/25 bg-cyan-200/[0.12] text-cyan-50 hover:bg-cyan-200/[0.18]',
              )}
            >
              {joined ? <CheckCircle2 size={15} /> : <Plus size={15} />}
              {joined ? 'Joined' : isFull ? 'Full' : 'Join group'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StudyGroups() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profile, setProfile] = useState<StoredProfile | null>(() => readProfile());
  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>(() => readJoinedStudyGroupIds());
  const [createdGroups, setCreatedGroups] = useState<StudyGroup[]>(() => readCreatedStudyGroups());
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>('All');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All');
  const [modeFilter, setModeFilter] = useState<ModeFilter>('All');
  const [timeFilter, setTimeFilter] = useState<TimeSlot | null>(null);
  const [groupActivityVersion, setGroupActivityVersion] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [draft, setDraft] = useState({
    name: '',
    subject: 'Programming',
    level: 'Intermediate' as StudyGroupLevel,
    availability: 'Evening' as TimeSlot,
    goal: '',
    description: '',
  });

  const activeView = parseView(searchParams.get('view'));
  const allGroups = useMemo(() => [...createdGroups, ...baseStudyGroups], [createdGroups]);

  useEffect(() => {
    const syncProfile = () => setProfile(readProfile());
    window.addEventListener('storage', syncProfile);
    window.addEventListener('hanova:user-updated', syncProfile);

    return () => {
      window.removeEventListener('storage', syncProfile);
      window.removeEventListener('hanova:user-updated', syncProfile);
    };
  }, []);

  useEffect(() => {
    const syncGroups = () => {
      setJoinedGroupIds(readJoinedStudyGroupIds());
      setCreatedGroups(readCreatedStudyGroups());
      setGroupActivityVersion((current) => current + 1);
    };

    window.addEventListener('storage', syncGroups);
    window.addEventListener(STUDY_GROUPS_UPDATED_EVENT, syncGroups);

    return () => {
      window.removeEventListener('storage', syncGroups);
      window.removeEventListener(STUDY_GROUPS_UPDATED_EVENT, syncGroups);
    };
  }, []);

  const studentGoal = profile?.goal ?? 'Reach a clear academic milestone with tutor guidance';

  const recommendedGroups = useMemo(() => {
    const goal = studentGoal.toLowerCase();
    const matches = allGroups.filter((group) => {
      const summary = `${group.subject} ${group.name} ${group.learningGoal} ${group.aiSuggestion}`.toLowerCase();
      return summary.includes('ielts') && goal.includes('ielts')
        || summary.includes('toeic') && goal.includes('toeic')
        || summary.includes('program') && goal.includes('program')
        || summary.includes('math') && goal.includes('math')
        || summary.includes('calculus') && goal.includes('math');
    });

    return (matches.length > 0 ? matches : allGroups.filter((group) => group.status === 'Open')).slice(0, 3);
  }, [allGroups, studentGoal]);

  const filteredGroups = useMemo(() => {
    return allGroups.filter((group) => {
      const matchesSearch =
        searchQuery.trim().length === 0
        || `${group.name} ${group.subject} ${group.learningGoal} ${group.tutorName ?? ''}`
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());

      const matchesSubject = subjectFilter === 'All' || group.subject === subjectFilter;
      const matchesLevel = levelFilter === 'All' || group.level === levelFilter;
      const matchesMode = modeFilter === 'All' || group.mode === modeFilter;
      const matchesTime = !timeFilter || group.availability.includes(timeFilter);

      return matchesSearch && matchesSubject && matchesLevel && matchesMode && matchesTime;
    });
  }, [allGroups, levelFilter, modeFilter, searchQuery, subjectFilter, timeFilter]);

  const myGroups = useMemo(
    () => {
      void groupActivityVersion;

      return allGroups
        .filter((group) => joinedGroupIds.includes(group.id))
        .map((group) => {
          const activity = readStudyGroupActivity(group.id);
          const readNotificationIds = new Set([
            ...group.notifications.filter((notification) => !notification.unread).map((notification) => notification.id),
            ...(activity.readNotificationIds ?? []),
          ]);

          return {
            ...group,
            tasks: group.tasks.map((task) => ({
              ...task,
              status: activity.taskStatuses?.[task.id] ?? task.status,
            })),
            notifications: group.notifications.map((notification) => ({
              ...notification,
              unread: notification.unread && !readNotificationIds.has(notification.id),
            })),
          };
        });
    },
    [allGroups, groupActivityVersion, joinedGroupIds],
  );

  const activeGroups = useMemo(
    () => myGroups.filter((group) => group.personalStatus !== 'Completed'),
    [myGroups],
  );

  const completedGroups = useMemo(
    () => myGroups.filter((group) => group.personalStatus === 'Completed'),
    [myGroups],
  );

  const pendingTasks = useMemo(
    () => myGroups.flatMap((group) => group.tasks).filter((task) => task.status !== 'Completed').length,
    [myGroups],
  );

  const unreadNotifications = useMemo(
    () => myGroups.flatMap((group) => group.notifications).filter((item) => item.unread).length,
    [myGroups],
  );

  const notificationFeed = useMemo(
    () => myGroups.flatMap((group) => group.notifications.map((notification) => ({ ...notification, groupName: group.name }))).slice(0, 5),
    [myGroups],
  );

  const nextGroupSession = activeGroups[0]?.nextSessionLabel ?? 'No active group booked yet';

  const updateView = (view: GroupView) => {
    setSearchParams({ view });
  };

  const handleJoinGroup = (groupId: string) => {
    if (joinedGroupIds.includes(groupId)) return;
    const nextIds = [groupId, ...joinedGroupIds];
    setJoinedGroupIds(nextIds);
    writeJoinedStudyGroupIds(nextIds);
  };

  const handleLeaveGroup = (groupId: string) => {
    const nextIds = joinedGroupIds.filter((id) => id !== groupId);
    setJoinedGroupIds(nextIds);
    writeJoinedStudyGroupIds(nextIds);
  };

  const handleCreateGroup = () => {
    const trimmedName = draft.name.trim();
    const trimmedGoal = draft.goal.trim();

    if (!trimmedName || !trimmedGoal) return;

    const ownerName = profile?.name ?? 'HaNova Student';
    const ownerInitials = profile?.initials ?? initialsFromName(ownerName);
    const nextId = `group-custom-${Date.now()}`;

    const newGroup: StudyGroup = {
      id: nextId,
      name: trimmedName,
      subject: draft.subject,
      level: draft.level,
      mode: 'Peer-led',
      status: 'Open',
      description:
        draft.description.trim() || `A student-created study group focused on ${draft.subject.toLowerCase()} with a clear weekly structure and light accountability.`,
      learningGoal: trimmedGoal,
      duration: 'Flexible · 4 weeks',
      nextSessionLabel: `${draft.availability} slot · Pending member confirmation`,
      schedulePreview: `${draft.availability} availability`,
      availability: [draft.availability],
      memberCount: 1,
      maxMembers: 6,
      personalStatus: 'Active',
      recommendedReasons: ['Created by you', 'Can sync with shared availability once more students join'],
      aiSuggestion:
        'HaNova will recommend additional members and a stable weekly slot after the first three students confirm their availability.',
      progress: {
        completion: 0,
        attendance: 100,
        milestone: 'Group created',
      },
      members: [
        {
          id: 'custom-owner',
          name: ownerName,
          initials: ownerInitials,
          role: 'Host',
          focus: trimmedGoal,
          attendance: 100,
        },
      ],
      sessions: [],
      tasks: [],
      materials: [],
      threads: [
        {
          id: 'custom-thread-1',
          author: ownerName,
          role: 'Host',
          postedAt: 'Just now',
          title: 'Pinned tutor message',
          content: 'Welcome. We will keep this group structured around one weekly target and one focused discussion thread per topic.',
          pinned: true,
          reactions: { Helpful: 1, Insightful: 0 },
          replies: [],
        },
      ],
      notifications: [
        {
          id: 'custom-note-1',
          kind: 'Announcement',
          title: 'Group created',
          message: 'HaNova saved your new peer-led group and opened it for member discovery.',
          createdAt: 'Just now',
          unread: true,
        },
      ],
    };

    const nextGroups = [newGroup, ...createdGroups];
    const nextJoinedIds = [nextId, ...joinedGroupIds];
    setCreatedGroups(nextGroups);
    setJoinedGroupIds(nextJoinedIds);
    writeCreatedStudyGroups(nextGroups);
    writeJoinedStudyGroupIds(nextJoinedIds);
    setShowCreateModal(false);
    setDraft({
      name: '',
      subject: 'Programming',
      level: 'Intermediate',
      availability: 'Evening',
      goal: '',
      description: '',
    });
    updateView('my-groups');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 pb-28 pt-[94px] text-white lg:px-8"
    >
      <div className="mx-auto max-w-[1460px]">
        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(11,14,28,0.96),rgba(16,20,42,0.86))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] lg:p-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.24),transparent_62%)]" />
          <div className="pointer-events-none absolute left-[12%] top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_68%)]" />

          <div className="relative grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.08] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-50/80">
                <Layers3 size={13} />
                Study Groups
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-serif leading-tight text-white lg:text-5xl">
                Structured collaboration built around your next academic milestone.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/56">
                Join tutor-led or peer-led cohorts that stay aligned with your study plan, your timetable, and your booking flow. No noisy chat streams. Just clear sessions, tasks, and academic discussion.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {groupViews.map((view) => {
                  const selected = activeView === view;
                  return (
                    <button
                      key={view}
                      type="button"
                      onClick={() => updateView(view)}
                      className={cn(
                        'rounded-full border px-5 py-2.5 text-sm font-semibold transition',
                        selected
                          ? 'border-cyan-200/30 bg-cyan-200/[0.12] text-cyan-50'
                          : 'border-white/10 bg-white/[0.03] text-white/58 hover:border-white/18 hover:text-white',
                      )}
                    >
                      {view === 'discover' ? 'Group Discovery' : 'My Groups'}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/74 transition hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
                >
                  Create peer group
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard
                icon={Users}
                label="Active groups"
                value={`${activeGroups.length}`}
                detail="Sessions and reminders currently synced to your weekly flow."
              />
              <StatCard
                icon={CalendarClock}
                label="Next group session"
                value={nextGroupSession}
                detail="HaNova checks this against your current schedule to reduce missed lessons."
              />
              <StatCard
                icon={BookOpen}
                label="Pending tasks"
                value={`${pendingTasks}`}
                detail="Assignments from tutors or hosts that still need your attention."
              />
              <StatCard
                icon={Bell}
                label="Unread updates"
                value={`${unreadNotifications}`}
                detail="In-app and email reminders tied to group events and changes."
              />
            </div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {activeView === 'discover' ? (
            <motion.section
              key="discover"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="mt-8 grid gap-8 xl:grid-cols-[1fr_330px]"
            >
              <div className="space-y-8">
                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/45">Recommended groups</p>
                      <h2 className="mt-3 text-3xl font-serif text-white">Based on your current goal</h2>
                      <p className="mt-2 text-sm leading-6 text-white/50">
                        {studentGoal}
                      </p>
                    </div>
                    <div className="max-w-sm rounded-[22px] border border-cyan-200/15 bg-cyan-200/[0.06] p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.1] text-cyan-100">
                          <Bot size={18} />
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">AI suggestion</p>
                          <p className="mt-2 text-sm leading-6 text-cyan-50/88">
                            You might benefit most from a tutor-led group first, then a peer-led lab to keep practice consistent between booked sessions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 lg:grid-cols-3">
                    {recommendedGroups.map((group) => (
                      <div key={group.id} className="rounded-[26px] border border-white/10 bg-black/15 p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">{group.subject}</p>
                        <h3 className="mt-3 text-2xl font-serif text-white">{group.name}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/52">{group.aiSuggestion}</p>
                        <div className="mt-5 flex items-center justify-between text-xs text-white/42">
                          <span>{group.schedulePreview}</span>
                          <span>{group.memberCount}/{group.maxMembers}</span>
                        </div>
                        <Link
                          to={`/groups/${group.id}`}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-cyan-50"
                        >
                          Review group fit
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Group discovery</p>
                      <h2 className="mt-3 text-3xl font-serif text-white">Find the right study rhythm</h2>
                    </div>
                    <div className="relative w-full max-w-md">
                      <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/32" />
                      <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search subject, tutor, or goal"
                        className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/28 focus:border-cyan-200/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-white/8 bg-black/15 p-5">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
                      <Filter size={13} />
                      Filters
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/28">Subject</p>
                        <div className="flex flex-wrap gap-2">
                          {groupSubjects.map((subject) => (
                            <FilterPill
                              key={subject}
                              active={subjectFilter === subject}
                              label={subject}
                              onClick={() => setSubjectFilter(subject)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/28">Level</p>
                        <div className="flex flex-wrap gap-2">
                          {groupLevels.map((level) => (
                            <FilterPill
                              key={level}
                              active={levelFilter === level}
                              label={level}
                              onClick={() => setLevelFilter(level)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/28">Format</p>
                        <div className="flex flex-wrap gap-2">
                          {groupModes.map((mode) => (
                            <FilterPill
                              key={mode}
                              active={modeFilter === mode}
                              label={mode}
                              onClick={() => setModeFilter(mode)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/28">Availability</p>
                        <div className="flex flex-wrap gap-2">
                          {groupTimeSlots.map((slot) => (
                            <FilterPill
                              key={slot}
                              active={timeFilter === slot}
                              label={slot}
                              onClick={() => setTimeFilter((current) => (current === slot ? null : slot))}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 xl:grid-cols-2">
                    <AnimatePresence>
                      {filteredGroups.map((group) => (
                        <GroupCard
                          key={group.id}
                          group={group}
                          joined={joinedGroupIds.includes(group.id)}
                          onJoin={handleJoinGroup}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {filteredGroups.length === 0 && (
                    <div className="mt-6 rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-8 py-12 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">No group found</p>
                      <h3 className="mt-3 text-2xl font-serif text-white">Refine the filter set</h3>
                      <p className="mt-3 text-sm text-white/45">Try widening the subject or format filters to discover more groups.</p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="space-y-6 xl:sticky xl:top-[108px] xl:h-fit">
                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">My groups snapshot</p>
                  <h3 className="mt-3 text-2xl font-serif text-white">Current collaboration load</h3>

                  <div className="mt-5 space-y-3">
                    {myGroups.slice(0, 3).map((group) => (
                      <Link
                        key={group.id}
                        to={`/groups/${group.id}`}
                        className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/15 px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{group.name}</p>
                          <p className="mt-1 text-xs text-white/38">{group.nextSessionLabel}</p>
                        </div>
                        <ArrowRight size={15} className="text-white/32" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Notification routing</p>
                      <h3 className="mt-3 text-2xl font-serif text-white">Recent group updates</h3>
                    </div>
                    <span className="rounded-full border border-cyan-200/15 bg-cyan-200/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100/82">
                      Email + In-app
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {notificationFeed.map((item) => (
                      <div key={item.id} className="rounded-[22px] border border-white/8 bg-black/15 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="mt-1 text-xs text-white/38">{item.groupName} · {item.createdAt}</p>
                          </div>
                          {item.unread && <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.65)]" />}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/56">{item.message}</p>
                        <span className={cn('mt-3 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', NotificationTone(item.kind))}>
                          {item.kind}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/notifications"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-cyan-50"
                  >
                    Open notification center
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </aside>
            </motion.section>
          ) : (
            <motion.section
              key="my-groups"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="mt-8 space-y-8"
            >
              <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">My groups</p>
                  <h2 className="mt-3 text-3xl font-serif text-white">Study groups already in your learning flow</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
                    Active groups stay synchronized with your schedule, study plan milestones, and notification rules. Completed groups remain available for revision materials and archived discussion.
                  </p>
                </div>

                <div className="rounded-[30px] border border-cyan-200/15 bg-cyan-200/[0.06] p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.1] text-cyan-100">
                      <Lightbulb size={18} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">Retention insight</p>
                      <p className="mt-2 text-sm leading-6 text-cyan-50/88">
                        Students with one tutor-led group and one peer-led practice group tend to miss fewer sessions because reminders stay distributed across the week.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {myGroups.length === 0 ? (
                <div className="rounded-[30px] border border-dashed border-white/12 bg-white/[0.02] px-8 py-16 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Empty state</p>
                  <h3 className="mt-4 text-3xl font-serif text-white">You haven&apos;t joined any groups yet</h3>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/45">
                    Explore tutor-led and peer-led groups that fit your subject, level, and availability. Once you join, sessions and tasks will appear here automatically.
                  </p>
                  <button
                    type="button"
                    onClick={() => updateView('discover')}
                    className="mt-8 rounded-full border border-cyan-200/25 bg-cyan-200/[0.12] px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/[0.18]"
                  >
                    Explore groups
                  </button>
                </div>
              ) : (
                <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
                  <div className="space-y-8">
                    <div>
                      <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">
                        <CalendarClock size={13} />
                        Active groups
                      </div>
                      <div className="space-y-5">
                        {activeGroups.map((group) => (
                          <div
                            key={group.id}
                            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6"
                          >
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                              <div className="max-w-3xl">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-100">
                                    Active
                                  </span>
                                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                                    {group.mode}
                                  </span>
                                </div>
                                <h3 className="mt-4 text-3xl font-serif text-white">{group.name}</h3>
                                <p className="mt-3 text-sm leading-7 text-white/54">{group.learningGoal}</p>
                              </div>

                              <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
                                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/28">Next session</p>
                                  <p className="mt-2 text-sm font-semibold text-white/82">{group.nextSessionLabel}</p>
                                </div>
                                <div className="rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
                                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/28">Progress</p>
                                  <p className="mt-2 text-sm font-semibold text-white/82">{group.progress.completion}% complete</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 grid gap-3 md:grid-cols-3">
                              <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/28">Members</p>
                                <p className="mt-2 text-sm text-white/78">{group.memberCount} collaborators</p>
                                <p className="mt-1 text-xs text-white/40">Structured attendance and task follow-through.</p>
                              </div>
                              <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/28">Study plan link</p>
                                <p className="mt-2 text-sm text-white/78">{group.linkedStudyPlan ?? 'Independent practice flow'}</p>
                                <p className="mt-1 text-xs text-white/40">Milestone: {group.progress.milestone}</p>
                              </div>
                              <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/28">Notification delivery</p>
                                <p className="mt-2 text-sm text-white/78">Email + in-app reminders</p>
                                <p className="mt-1 text-xs text-white/40">Aligned with HaNova booking and reschedule rules.</p>
                              </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                              <Link
                                to={`/groups/${group.id}`}
                                className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/[0.12] px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/[0.18]"
                              >
                                Enter group
                                <ArrowRight size={15} />
                              </Link>
                              <Link
                                to="/schedule"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74 transition hover:border-white/18 hover:text-white"
                              >
                                Open schedule
                                <Clock3 size={15} />
                              </Link>
                              {group.tutorName && (
                                <Link
                                  to="/tutors"
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/74 transition hover:border-white/18 hover:text-white"
                                >
                                  Continue to booking
                                  <ArrowRight size={15} />
                                </Link>
                              )}
                              <button
                                type="button"
                                onClick={() => handleLeaveGroup(group.id)}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/62 transition hover:border-white/18 hover:text-white"
                              >
                                Leave group
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {completedGroups.length > 0 && (
                      <div>
                        <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">
                          <CheckCircle2 size={13} />
                          Completed groups
                        </div>
                        <div className="space-y-4">
                          {completedGroups.map((group) => (
                            <div key={group.id} className="rounded-[26px] border border-white/8 bg-white/[0.02] p-5">
                              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                  <h3 className="text-2xl font-serif text-white">{group.name}</h3>
                                  <p className="mt-2 text-sm text-white/48">
                                    Archived for revision. Materials and discussion remain available.
                                  </p>
                                </div>
                                <Link
                                  to={`/groups/${group.id}`}
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-cyan-50"
                                >
                                  Review archive
                                  <ArrowRight size={15} />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => handleLeaveGroup(group.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/62 transition hover:border-white/18 hover:text-white"
                                >
                                  Remove from my groups
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <aside className="space-y-6 xl:sticky xl:top-[108px] xl:h-fit">
                    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Most active members</p>
                      <div className="mt-5 space-y-3">
                        {activeGroups.flatMap((group) => group.members.slice(0, 2)).slice(0, 4).map((member) => (
                          <div key={member.id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/15 px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-serif text-sm text-white">
                                {member.initials}
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-white">{member.name}</p>
                                <p className="mt-1 text-xs text-white/38">{member.focus}</p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-cyan-100/82">{member.attendance}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">System alignment</p>
                      <div className="mt-4 space-y-3 text-sm leading-6 text-white/54">
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <div className="flex items-center gap-2 font-semibold text-white/82">
                            <Target size={15} className="text-cyan-100/72" />
                            Study Plan
                          </div>
                          <p className="mt-2">Tutor-led groups reuse study-plan milestones and keep tasks anchored to the same academic goal.</p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <div className="flex items-center gap-2 font-semibold text-white/82">
                            <CalendarClock size={15} className="text-cyan-100/72" />
                            Schedule + Booking
                          </div>
                          <p className="mt-2">Group sessions show availability and can guide the student back to one-to-one tutor booking when deeper support is needed.</p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
                          <div className="flex items-center gap-2 font-semibold text-white/82">
                            <Bell size={15} className="text-cyan-100/72" />
                            Notifications
                          </div>
                          <p className="mt-2">Announcements, task alerts, and reschedules follow the same email and in-app notification channels as the rest of HaNova.</p>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1002] flex items-center justify-center bg-[#02040d]/80 px-4 backdrop-blur-xl"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,24,0.96),rgba(13,18,38,0.9))] p-6 shadow-[0_32px_110px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/50">Create peer group</p>
                  <h2 className="mt-3 text-3xl font-serif text-white">Propose a structured study circle</h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/52">
                    Keep it specific. One subject, one clear target, one predictable meeting rhythm. HaNova can recommend matching students after the group is created.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Group name</label>
                  <input
                    value={draft.name}
                    onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Example: Python Warm-up Circle"
                    className="mt-2 w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/28 focus:border-cyan-200/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Subject</label>
                  <select
                    value={draft.subject}
                    onChange={(event) => setDraft((current) => ({ ...current, subject: event.target.value }))}
                    className="mt-2 w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white focus:border-cyan-200/30 focus:outline-none"
                  >
                    {groupSubjects.filter((subject) => subject !== 'All').map((subject) => (
                      <option key={subject} value={subject} className="bg-[#0a1020]">
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Level</label>
                  <select
                    value={draft.level}
                    onChange={(event) => setDraft((current) => ({ ...current, level: event.target.value as StudyGroupLevel }))}
                    className="mt-2 w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white focus:border-cyan-200/30 focus:outline-none"
                  >
                    {groupLevels.filter((level) => level !== 'All').map((level) => (
                      <option key={level} value={level} className="bg-[#0a1020]">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Preferred slot</label>
                  <select
                    value={draft.availability}
                    onChange={(event) => setDraft((current) => ({ ...current, availability: event.target.value as TimeSlot }))}
                    className="mt-2 w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white focus:border-cyan-200/30 focus:outline-none"
                  >
                    {groupTimeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#0a1020]">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Learning goal</label>
                  <input
                    value={draft.goal}
                    onChange={(event) => setDraft((current) => ({ ...current, goal: event.target.value }))}
                    placeholder="Example: Solve 4 medium array problems every week"
                    className="mt-2 w-full rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/28 focus:border-cyan-200/30 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Structured note</label>
                  <textarea
                    value={draft.description}
                    onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                    placeholder="Optional: describe the study rhythm, expected preparation, or discussion boundaries."
                    rows={4}
                    className="mt-2 w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/28 focus:border-cyan-200/30 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/8 bg-black/15 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/80">
                    <MessagesSquare size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">What HaNova will set up automatically</p>
                    <p className="mt-2 text-sm leading-6 text-white/52">
                      The new group will start with one pinned academic discussion thread, notification routing, and a clean group detail page ready for tasks, materials, and schedule syncing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/62 transition hover:border-white/18 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateGroup}
                  className="rounded-full border border-cyan-200/25 bg-cyan-200/[0.12] px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/[0.18]"
                >
                  Create group
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
