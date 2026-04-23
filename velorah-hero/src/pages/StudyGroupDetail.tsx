import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileText,
  Link2,
  MessagesSquare,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import { cn } from '../utils/helpers';
import {
  findStudyGroupById,
  groupTabs,
  readJoinedStudyGroupIds,
  readStudyGroupActivity,
  STUDY_GROUPS_UPDATED_EVENT,
  writeJoinedStudyGroupIds,
  writeStudyGroupActivity,
} from '../data/studyGroups';
import type {
  DiscussionReaction,
  GroupDetailTab,
  StudyGroupActivity,
  StudyGroup,
  StudyGroupMaterial,
  StudyGroupTeacher,
  TaskStatus,
  TeamAccent,
} from '../data/studyGroups';

const scheduleStartHour = 8;
const scheduleEndHour = 22;
const hourHeight = 72;
const hourSlots = Array.from({ length: scheduleEndHour - scheduleStartHour }, (_, index) => {
  const hour = scheduleStartHour + index;
  return {
    hour,
    label: `${hour.toString().padStart(2, '0')}:00`,
  };
});
const accentCycle: TeamAccent[] = ['cyan', 'violet', 'amber', 'emerald'];

const accentThemes: Record<
  TeamAccent,
  {
    badge: string;
    softPanel: string;
    text: string;
    muted: string;
    borderColor: string;
    accent: string;
    glow: string;
    softGlow: string;
    background: string;
  }
> = {
  cyan: {
    badge: 'border-cyan-300/25 bg-cyan-300/[0.08] text-cyan-100',
    softPanel: 'bg-[linear-gradient(160deg,rgba(8,18,34,0.96),rgba(34,211,238,0.16))]',
    text: 'text-cyan-100',
    muted: 'text-cyan-50/72',
    borderColor: 'rgba(103,232,249,0.28)',
    accent: 'rgba(103,232,249,0.95)',
    glow: '0 22px 44px rgba(34,211,238,0.16)',
    softGlow: '0 16px 34px rgba(34,211,238,0.12)',
    background: 'linear-gradient(160deg, rgba(8,18,34,0.96), rgba(34,211,238,0.2))',
  },
  violet: {
    badge: 'border-violet-300/25 bg-violet-300/[0.08] text-violet-100',
    softPanel: 'bg-[linear-gradient(160deg,rgba(15,14,36,0.96),rgba(167,139,250,0.16))]',
    text: 'text-violet-100',
    muted: 'text-violet-50/72',
    borderColor: 'rgba(196,181,253,0.28)',
    accent: 'rgba(196,181,253,0.92)',
    glow: '0 22px 44px rgba(139,92,246,0.16)',
    softGlow: '0 16px 34px rgba(139,92,246,0.12)',
    background: 'linear-gradient(160deg, rgba(15,14,36,0.96), rgba(167,139,250,0.2))',
  },
  amber: {
    badge: 'border-amber-300/25 bg-amber-300/[0.08] text-amber-100',
    softPanel: 'bg-[linear-gradient(160deg,rgba(28,19,10,0.96),rgba(251,191,36,0.16))]',
    text: 'text-amber-100',
    muted: 'text-amber-50/72',
    borderColor: 'rgba(252,211,77,0.26)',
    accent: 'rgba(252,211,77,0.92)',
    glow: '0 22px 44px rgba(251,191,36,0.15)',
    softGlow: '0 16px 34px rgba(251,191,36,0.12)',
    background: 'linear-gradient(160deg, rgba(28,19,10,0.96), rgba(251,191,36,0.2))',
  },
  emerald: {
    badge: 'border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-100',
    softPanel: 'bg-[linear-gradient(160deg,rgba(9,23,20,0.96),rgba(52,211,153,0.16))]',
    text: 'text-emerald-100',
    muted: 'text-emerald-50/72',
    borderColor: 'rgba(110,231,183,0.26)',
    accent: 'rgba(110,231,183,0.92)',
    glow: '0 22px 44px rgba(52,211,153,0.16)',
    softGlow: '0 16px 34px rgba(52,211,153,0.12)',
    background: 'linear-gradient(160deg, rgba(9,23,20,0.96), rgba(52,211,153,0.2))',
  },
};

const cancelledTheme = {
  badge: 'border-red-300/25 bg-red-300/[0.08] text-red-100',
  borderColor: 'rgba(252,165,165,0.24)',
  accent: 'rgba(252,165,165,0.9)',
  glow: '0 18px 38px rgba(248,113,113,0.12)',
  background: 'linear-gradient(160deg, rgba(35,11,15,0.96), rgba(248,113,113,0.16))',
};

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function buildFallbackTeachingTeam(group: StudyGroup): StudyGroupTeacher[] {
  const uniqueLeads = [...new Set(group.sessions.map((session) => session.hostName).filter(Boolean))];

  if (group.tutorName) {
    const tutor: StudyGroupTeacher = {
      id: `${group.id}-primary-tutor`,
      name: group.tutorName,
      initials: initialsFromName(group.tutorName),
      role: 'Tutor',
      specialty: group.tutorSpecialty ?? 'Structured cohort teaching',
      sessionFocus: 'Leads the group learning arc and keeps milestones aligned with the study plan.',
      availabilityLabel: group.schedulePreview,
      rateLabel: 'Primary cohort tutor',
      accent: 'cyan',
    };

    const supportHosts = uniqueLeads
      .filter((name) => name !== group.tutorName)
      .map((name, index) => ({
        id: `${group.id}-lead-${index}`,
        name,
        initials: initialsFromName(name),
        role: 'Mentor' as const,
        specialty: 'Group review support',
        sessionFocus: 'Supports practice sessions and maintains continuity between live lessons.',
        availabilityLabel: group.schedulePreview,
        rateLabel: 'Group support',
        accent: accentCycle[(index + 1) % accentCycle.length],
      }));

    return [tutor, ...supportHosts];
  }

  if (uniqueLeads.length > 0) {
    return uniqueLeads.map((name, index) => ({
      id: `${group.id}-lead-${index}`,
      name,
      initials: initialsFromName(name),
      role: index === 0 ? 'Host' : 'Mentor',
      specialty: index === 0 ? 'Peer-led group coordination' : 'Session support and review',
      sessionFocus:
        index === 0
          ? 'Keeps the group cadence stable and moderates structured discussion.'
          : 'Supports practice sessions and deeper topic reviews.',
      availabilityLabel: group.schedulePreview,
      rateLabel: index === 0 ? 'Community host' : 'Group mentor',
      accent: accentCycle[index % accentCycle.length],
    }));
  }

  const memberLead = group.members.find((member) => member.role === 'Tutor' || member.role === 'Host') ?? group.members[0];
  return [
    {
      id: `${group.id}-fallback-lead`,
      name: memberLead?.name ?? 'Group Lead',
      initials: memberLead?.initials ?? 'GL',
      role: memberLead?.role === 'Tutor' ? 'Tutor' : 'Host',
      specialty: group.tutorSpecialty ?? 'Structured group facilitation',
      sessionFocus: 'Keeps sessions aligned with the group target.',
      availabilityLabel: group.schedulePreview,
      rateLabel: memberLead?.role === 'Tutor' ? 'Primary cohort tutor' : 'Community host',
      accent: 'cyan',
    },
  ];
}

function getTeamTheme(accent?: TeamAccent) {
  return accentThemes[accent ?? 'cyan'];
}

function getSessionTheme(status: string, accent?: TeamAccent) {
  if (status === 'Cancelled') return cancelledTheme;
  if (status === 'Rescheduled') return accentThemes.amber;
  return getTeamTheme(accent);
}

function parseTab(value: string | null): GroupDetailTab {
  return groupTabs.some((tab) => tab.id === value) ? (value as GroupDetailTab) : 'overview';
}

function statusTone(status: string) {
  if (status === 'Scheduled') return 'border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-100';
  if (status === 'Rescheduled') return 'border-amber-300/20 bg-amber-300/[0.08] text-amber-100';
  return 'border-red-300/20 bg-red-300/[0.08] text-red-100';
}

function taskTone(status: TaskStatus) {
  if (status === 'Completed') return 'border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-100';
  if (status === 'Overdue') return 'border-red-300/20 bg-red-300/[0.08] text-red-100';
  return 'border-amber-300/20 bg-amber-300/[0.08] text-amber-100';
}

function materialIcon(kind: StudyGroupMaterial['kind']) {
  if (kind === 'PDF') return <FileText size={15} className="text-red-200" />;
  if (kind === 'Slides') return <BookOpen size={15} className="text-cyan-100" />;
  if (kind === 'Video') return <PlayCircle size={15} className="text-violet-100" />;
  return <Link2 size={15} className="text-emerald-100" />;
}

function parseTimeToMinutes(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return hour * 60 + minute;
}

function getInitialFocusedSessionId(group: StudyGroup | null) {
  if (!group) return null;
  return group.sessions.find((session) => session.status !== 'Cancelled')?.id ?? group.sessions[0]?.id ?? null;
}

function buildTaskStatuses(group: StudyGroup, activity: StudyGroupActivity) {
  return Object.fromEntries(
    group.tasks.map((task) => [task.id, activity.taskStatuses?.[task.id] ?? task.status]),
  ) as Record<string, TaskStatus>;
}

function buildReactionState(group: StudyGroup, activity: StudyGroupActivity) {
  return Object.fromEntries(
    group.threads.map((thread) => [
      thread.id,
      {
        Helpful: activity.reactions?.[thread.id]?.Helpful ?? thread.reactions.Helpful,
        Insightful: activity.reactions?.[thread.id]?.Insightful ?? thread.reactions.Insightful,
      },
    ]),
  ) as Record<string, Record<DiscussionReaction, number>>;
}

function buildReadNotificationIds(group: StudyGroup, activity: StudyGroupActivity) {
  const defaultReadIds = group.notifications.filter((notification) => !notification.unread).map((notification) => notification.id);
  return [...new Set([...defaultReadIds, ...(activity.readNotificationIds ?? [])])];
}

export default function StudyGroupDetail() {
  const { groupId } = useParams<{ groupId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const group = useMemo(() => (groupId ? findStudyGroupById(groupId) : null), [groupId]);
  const initialActivity = group ? readStudyGroupActivity(group.id) : {};
  const [joined, setJoined] = useState(() => (group ? readJoinedStudyGroupIds().includes(group.id) : false));
  const [focusedSessionId, setFocusedSessionId] = useState<string | null>(() => getInitialFocusedSessionId(group));
  const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>(() => (group ? buildTaskStatuses(group, initialActivity) : {}));
  const [taskFilter, setTaskFilter] = useState<'All' | TaskStatus>('All');
  const [reactionState, setReactionState] = useState<Record<string, Record<DiscussionReaction, number>>>(() => (
    group ? buildReactionState(group, initialActivity) : {}
  ));
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>(() => (
    group ? buildReadNotificationIds(group, initialActivity) : []
  ));
  const scheduleScrollerRef = useRef<HTMLDivElement | null>(null);
  const didAlignScheduleViewRef = useRef(false);

  const activeTab = parseTab(searchParams.get('tab'));
  const focusedSession = group?.sessions.find((session) => session.id === focusedSessionId) ?? null;

  useEffect(() => {
    if (!group) return;

    const syncGroupState = () => {
      const nextActivity = readStudyGroupActivity(group.id);
      setJoined(readJoinedStudyGroupIds().includes(group.id));
      setTaskStatuses(buildTaskStatuses(group, nextActivity));
      setReactionState(buildReactionState(group, nextActivity));
      setReadNotificationIds(buildReadNotificationIds(group, nextActivity));
    };

    window.addEventListener('storage', syncGroupState);
    window.addEventListener(STUDY_GROUPS_UPDATED_EVENT, syncGroupState);

    return () => {
      window.removeEventListener('storage', syncGroupState);
      window.removeEventListener(STUDY_GROUPS_UPDATED_EVENT, syncGroupState);
    };
  }, [group]);

  useEffect(() => {
    if (activeTab !== 'schedule') {
      didAlignScheduleViewRef.current = false;
      return;
    }

    if (!focusedSession || !scheduleScrollerRef.current || didAlignScheduleViewRef.current) return;

    const sessionTop = ((parseTimeToMinutes(focusedSession.startTime) - scheduleStartHour * 60) / 60) * hourHeight;
    const targetTop = Math.max(0, sessionTop - hourHeight);
    const maxTop = Math.max(0, scheduleScrollerRef.current.scrollHeight - scheduleScrollerRef.current.clientHeight);

    scheduleScrollerRef.current.scrollTop = Math.min(targetTop, maxTop);
    didAlignScheduleViewRef.current = true;
  }, [activeTab, focusedSession]);

  if (!group) {
    return (
      <div className="min-h-screen px-4 pb-28 pt-[98px] text-white">
        <div className="mx-auto max-w-4xl rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">Study group</p>
          <h1 className="mt-4 text-4xl font-serif text-white">Group not found</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/48">
            This study group may have been removed or the link is no longer valid.
          </p>
          <Link
            to="/groups"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/[0.12] px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/[0.18]"
          >
            <ArrowLeft size={15} />
            Back to groups
          </Link>
        </div>
      </div>
    );
  }

  const timelineSessions = group.sessions;
  const tasks = group.tasks.map((task) => ({ ...task, status: taskStatuses[task.id] ?? task.status }));
  const filteredTasks = tasks.filter((task) => taskFilter === 'All' || task.status === taskFilter);
  const materialSections = group.materials.reduce<Record<string, StudyGroupMaterial[]>>((accumulator, material) => {
    accumulator[material.topic] = [...(accumulator[material.topic] ?? []), material];
    return accumulator;
  }, {});
  const pinnedThread = group.threads.find((thread) => thread.pinned);
  const regularThreads = group.threads.filter((thread) => !thread.pinned);
  const readNotificationSet = new Set(readNotificationIds);
  const notifications = group.notifications.map((notification) => ({
    ...notification,
    unread: notification.unread && !readNotificationSet.has(notification.id),
  }));
  const unreadNotifications = notifications.filter((item) => item.unread).length;
  const completionCount = tasks.filter((task) => task.status === 'Completed').length;
  const pendingCount = tasks.filter((task) => task.status === 'Pending').length;
  const overdueCount = tasks.filter((task) => task.status === 'Overdue').length;
  const activeMembers = [...group.members].sort((left, right) => right.attendance - left.attendance).slice(0, 3);
  const teachingTeam = group.teachingTeam?.length ? group.teachingTeam : buildFallbackTeachingTeam(group);
  const teachingTeamByName = new Map(teachingTeam.map((teacher) => [teacher.name, teacher]));
  const liveSessions = group.sessions.filter((session) => session.status !== 'Cancelled');
  const rescheduledSessions = group.sessions.filter((session) => session.status === 'Rescheduled');
  const conflictSessions = group.sessions.filter((session) => session.conflictsWithPersonalSchedule);
  const preparationSessions = group.sessions.filter((session) => session.preparationNote).slice(0, 4);
  const focusCoach = focusedSession ? teachingTeamByName.get(focusedSession.hostName) : undefined;
  const focusTheme = getSessionTheme(focusedSession?.status ?? 'Scheduled', focusCoach?.accent);
  const bookedTutors = teachingTeam.filter((teacher) => teacher.role !== 'Host');
  const nextLiveSession = liveSessions[0] ?? null;

  const setTab = (tab: GroupDetailTab) => {
    setSearchParams({ tab });
  };

  const handleMembershipToggle = () => {
    if (!joined && group.status === 'Full') return;

    const nextIds = joined
      ? readJoinedStudyGroupIds().filter((id) => id !== group.id)
      : [group.id, ...readJoinedStudyGroupIds().filter((id) => id !== group.id)];

    writeJoinedStudyGroupIds(nextIds);
    setJoined(!joined);
  };

  const toggleTask = (taskId: string) => {
    setTaskStatuses((current) => ({
      ...current,
      [taskId]: current[taskId] === 'Completed' ? 'Pending' : 'Completed',
    }));
  };

  const persistTaskStatus = (taskId: string, status: TaskStatus) => {
    writeStudyGroupActivity(group.id, {
      taskStatuses: {
        [taskId]: status,
      },
    });
  };

  const addReaction = (threadId: string, key: DiscussionReaction) => {
    setReactionState((current) => ({
      ...current,
      [threadId]: {
        Helpful: current[threadId]?.Helpful ?? 0,
        Insightful: current[threadId]?.Insightful ?? 0,
        [key]: (current[threadId]?.[key] ?? 0) + 1,
      },
    }));
  };

  const persistReaction = (threadId: string, nextReactions: Record<DiscussionReaction, number>) => {
    writeStudyGroupActivity(group.id, {
      reactions: {
        [threadId]: nextReactions,
      },
    });
  };

  const handleMarkAllNotificationsRead = () => {
    const nextReadIds = group.notifications.map((notification) => notification.id);
    setReadNotificationIds(nextReadIds);
    writeStudyGroupActivity(group.id, {
      readNotificationIds: nextReadIds,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 pb-28 pt-[96px] text-white lg:px-8"
    >
      <div className="mx-auto max-w-[1480px]">
        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(11,14,28,0.96),rgba(16,20,42,0.86))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] lg:p-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[34%] bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.24),transparent_64%)]" />
          <div className="pointer-events-none absolute left-[10%] top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_70%)]" />

          <div className="relative">
            <Link
              to="/groups?view=my-groups"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/56 transition hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to study groups
            </Link>

            <div className="mt-6 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {group.subject}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {group.level}
                  </span>
                  <span
                    className={cn(
                      'rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]',
                      group.mode === 'Tutor-led'
                        ? 'border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-100/80'
                        : 'border-violet-200/20 bg-violet-200/[0.08] text-violet-100/80',
                    )}
                  >
                    {group.mode}
                  </span>
                </div>
                <h1 className="mt-4 text-4xl font-serif leading-tight text-white lg:text-5xl">{group.name}</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/56">{group.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleMembershipToggle}
                  disabled={!joined && group.status === 'Full'}
                  className={cn(
                    'rounded-full px-5 py-2.5 text-sm font-semibold transition',
                    joined
                      ? 'border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-100 hover:bg-emerald-300/[0.14]'
                      : group.status === 'Full'
                        ? 'cursor-not-allowed border border-white/10 bg-white/[0.03] text-white/35'
                        : 'border border-cyan-200/25 bg-cyan-200/[0.12] text-cyan-50 hover:bg-cyan-200/[0.18]',
                  )}
                >
                  {joined ? 'Leave group' : group.status === 'Full' ? 'Group full' : 'Join group'}
                </button>
                <Link
                  to="/schedule"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/72 transition hover:border-white/18 hover:text-white"
                >
                  Open schedule
                </Link>
                {group.tutorName && (
                  <Link
                    to="/tutors"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/72 transition hover:border-white/18 hover:text-white"
                  >
                    Continue to booking
                  </Link>
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Learning goal</p>
                <p className="mt-3 text-sm leading-6 text-white/78">{group.learningGoal}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Duration</p>
                <p className="mt-3 text-sm leading-6 text-white/78">{group.duration}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Schedule preview</p>
                <p className="mt-3 text-sm leading-6 text-white/78">{group.schedulePreview}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Unread updates</p>
                <p className="mt-3 text-sm leading-6 text-white/78">{unreadNotifications} active group notifications</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[340px_1fr]">
          <aside className="space-y-6 xl:sticky xl:top-[108px] xl:h-fit">
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Group info</p>
              <div className="mt-5 space-y-4 text-sm text-white/60">
                <div className="rounded-[22px] border border-white/8 bg-black/15 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">Lead</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {group.tutorName ?? group.members.find((member) => member.role === 'Host')?.name ?? 'Shared leadership'}
                  </p>
                  <p className="mt-1 text-xs text-white/40">{group.tutorSpecialty ?? 'Peer-led accountability and discussion'}</p>
                </div>
                <div className="rounded-[22px] border border-white/8 bg-black/15 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">Connected systems</p>
                  <div className="mt-3 space-y-2">
                    <Link
                      to={group.linkedStudyPlan ? '/study-plan' : '/dashboard'}
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
                    >
                      <span className="flex items-center gap-3">
                        <BookOpen size={15} className="text-cyan-100/75" />
                        <span className="text-sm text-white/78">{group.linkedStudyPlan ?? 'No linked study plan'}</span>
                      </span>
                      <ChevronRight size={15} className="text-white/28" />
                    </Link>
                    <Link
                      to="/schedule"
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
                    >
                      <span className="flex items-center gap-3">
                        <CalendarClock size={15} className="text-cyan-100/75" />
                        <span className="text-sm text-white/78">Schedule sync and conflict check</span>
                      </span>
                      <ChevronRight size={15} className="text-white/28" />
                    </Link>
                    <Link
                      to="/notifications"
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.05]"
                    >
                      <span className="flex items-center gap-3">
                        <Bell size={15} className="text-cyan-100/75" />
                        <span className="text-sm text-white/78">Email + in-app notification routing</span>
                      </span>
                      <ChevronRight size={15} className="text-white/28" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Members</p>
              <div className="mt-5 space-y-3">
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between rounded-[22px] border border-white/8 bg-black/15 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-serif text-sm text-white">
                        {member.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{member.name}</p>
                        <p className="mt-1 text-xs text-white/40">
                          {member.role} · {member.focus}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-100/82">{member.attendance}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Group notifications</p>
                  <p className="mt-2 text-xs text-white/38">Reschedules, tutor notes, and task alerts stay grouped here.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-cyan-200/15 bg-cyan-200/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100/82">
                    {unreadNotifications} unread
                  </span>
                  {unreadNotifications > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllNotificationsRead}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/58 transition hover:border-white/18 hover:text-white"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="rounded-[22px] border border-white/8 bg-black/15 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{notification.title}</p>
                        <p className="mt-1 text-xs text-white/38">{notification.createdAt}</p>
                      </div>
                      {notification.unread && <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.65)]" />}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/56">{notification.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.016))] p-4">
              <div className="flex flex-wrap gap-2">
                {groupTabs.map((tab) => {
                  const selected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setTab(tab.id)}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm font-semibold transition',
                        selected
                          ? 'border-cyan-200/25 bg-cyan-200/[0.12] text-cyan-50'
                          : 'border-white/10 bg-white/[0.03] text-white/56 hover:border-white/18 hover:text-white',
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid gap-5 xl:grid-cols-3">
                  <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6 xl:col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Group overview</p>
                    <h2 className="mt-4 text-3xl font-serif text-white">Structured learning, shared accountability</h2>
                    <p className="mt-4 text-sm leading-7 text-white/56">{group.description}</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-[24px] border border-white/8 bg-black/15 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Target size={15} className="text-cyan-100/72" />
                          Learning goal
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/56">{group.learningGoal}</p>
                      </div>
                      <div className="rounded-[24px] border border-white/8 bg-black/15 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <CalendarClock size={15} className="text-cyan-100/72" />
                          Duration
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/56">{group.duration}</p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[28px] border border-cyan-200/15 bg-cyan-200/[0.06] p-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.1] text-cyan-100">
                          <Bot size={18} />
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">AI suggestion</p>
                          <p className="mt-2 text-sm leading-6 text-cyan-50/88">{group.aiSuggestion}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Group progress</p>
                    <div className="mt-5 rounded-[28px] border border-white/8 bg-black/15 p-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-4xl font-serif text-white">{group.progress.completion}%</p>
                          <p className="mt-2 text-sm text-white/46">Milestone completion</p>
                        </div>
                        <span className="rounded-full border border-cyan-200/15 bg-cyan-200/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-100/80">
                          {group.progress.attendance}% attendance
                        </span>
                      </div>
                      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/6">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.9),rgba(99,102,241,0.85))]"
                          style={{ width: `${group.progress.completion}%` }}
                        />
                      </div>
                      <p className="mt-4 text-sm text-white/56">Current focus: {group.progress.milestone}</p>
                    </div>

                    <div className="mt-5 rounded-[28px] border border-white/8 bg-black/15 p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">Most active members</p>
                      <div className="mt-4 space-y-3">
                        {activeMembers.map((member) => (
                          <div key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-serif text-sm text-white">
                                {member.initials}
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-white">{member.name}</p>
                                <p className="mt-1 text-xs text-white/38">{member.role}</p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-cyan-100/82">{member.attendance}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(9,13,28,0.96),rgba(17,22,48,0.9))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-[38%] bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_60%)]" />
                  <div className="pointer-events-none absolute bottom-0 left-[10%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_72%)]" />

                  <div className="relative grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.08] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-50/82">
                        <CalendarClock size={13} />
                        Group Schedule
                      </div>
                      <h2 className="mt-5 text-4xl font-serif leading-tight text-white">Color-coded learning rhythm for the whole cohort</h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/56">
                        Session cards now mirror the clarity of HaNova&apos;s personal schedule: richer gradients, clearer tutor ownership, stronger status colors, and a more readable timetable for group flow.
                      </p>

                      <div className="mt-6 rounded-[28px] border border-cyan-200/14 bg-cyan-200/[0.06] p-5">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.1] text-cyan-100">
                            <Bot size={18} />
                          </span>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">Schedule insight</p>
                            <p className="mt-2 text-sm leading-7 text-cyan-50/88">
                              {group.mode === 'Peer-led'
                                ? 'This cohort now shows both the peer host and the hired mentors, so students can immediately see who is responsible for each teaching block.'
                                : 'Tutor-led sessions remain linked to the study plan, with reminder notes visible before each live block.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          to="/schedule"
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/[0.12] px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/[0.18]"
                        >
                          Open full schedule
                          <ArrowRight size={15} />
                        </Link>
                        <Link
                          to="/tutors"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/72 transition hover:border-white/18 hover:text-white"
                        >
                          View tutor booking
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          label: 'Live sessions',
                          value: `${liveSessions.length}`,
                          detail: nextLiveSession ? `Next: ${nextLiveSession.dateLabel} · ${nextLiveSession.startTime}` : 'No live session scheduled',
                          icon: Clock3,
                          accent: 'cyan' as const,
                        },
                        {
                          label: 'Teaching crew',
                          value: `${teachingTeam.length}`,
                          detail: bookedTutors.length > 0 ? `${bookedTutors.length} booked tutors + mentors` : 'Community host coverage',
                          icon: Users,
                          accent: 'violet' as const,
                        },
                        {
                          label: 'Preparation coverage',
                          value: `${preparationSessions.length}/${group.sessions.length}`,
                          detail: 'Sessions with notes and required prep ready before class.',
                          icon: CheckCircle2,
                          accent: 'emerald' as const,
                        },
                        {
                          label: 'Conflict watch',
                          value: conflictSessions.length === 0 ? 'Clear' : `${conflictSessions.length}`,
                          detail: conflictSessions.length === 0 ? 'No group session currently overlaps your personal calendar.' : 'A session needs attention because of calendar overlap.',
                          icon: ShieldCheck,
                          accent: (rescheduledSessions.length > 0 || conflictSessions.length > 0 ? 'amber' : 'cyan') as TeamAccent,
                        },
                      ].map((item, index) => {
                        const theme = getTeamTheme(item.accent);
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.34, delay: index * 0.05 }}
                            className="rounded-[26px] border p-5"
                            style={{
                              background: theme.background,
                              borderColor: theme.borderColor,
                              boxShadow: theme.softGlow,
                            }}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{item.label}</p>
                                <p className="mt-3 text-3xl font-serif text-white">{item.value}</p>
                                <p className="mt-2 text-sm leading-6 text-white/58">{item.detail}</p>
                              </div>
                              <span className={cn('flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/5', theme.badge)}>
                                <item.icon size={18} />
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                      <div className="max-w-3xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Weekly timetable</p>
                        <h3 className="mt-3 text-3xl font-serif text-white">Upcoming session timeline</h3>
                        <p className="mt-2 text-sm leading-6 text-white/50">
                          Each column now represents a real class date instead of collapsing multiple weeks into one weekday lane, so session cards keep their own slot and never overlap.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {teachingTeam.slice(0, 3).map((teacher) => {
                          const theme = getTeamTheme(teacher.accent);
                          return (
                            <span
                              key={teacher.id}
                              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                              style={{
                                borderColor: theme.borderColor,
                                background: theme.background,
                                boxShadow: theme.softGlow,
                              }}
                            >
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                              {teacher.name}
                            </span>
                          );
                        })}
                        {(['Scheduled', 'Rescheduled', 'Cancelled'] as const).map((status) => (
                          <span
                            key={status}
                            className={cn(
                              'inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]',
                              statusTone(status),
                            )}
                          >
                            {status}
                          </span>
                        ))}
                      </div>
                    </div>

                    {group.sessions.length === 0 ? (
                      <div className="mt-6 rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-8 py-14 text-center">
                        <h3 className="text-2xl font-serif text-white">No sessions yet</h3>
                        <p className="mt-3 text-sm text-white/46">Once the host confirms the first slot, the timetable and reminder system will appear here.</p>
                      </div>
                    ) : (
                      <div className="mt-6 overflow-hidden rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(5,7,15,0.86),rgba(10,12,24,0.72))] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                        <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3 text-xs text-white/42">
                          <div className="flex items-center gap-2 leading-5">
                            <CalendarClock size={14} className="text-cyan-100/70" />
                            <span>Scroll inside the board for time. On smaller screens, swipe horizontally to inspect every class date.</span>
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                            {timelineSessions.length} upcoming blocks
                          </span>
                        </div>

                        <div
                          ref={scheduleScrollerRef}
                          className="h-[min(68vh,760px)] overflow-auto rounded-b-[26px] border-t border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]"
                        >
                          <div
                            className="grid w-full"
                            style={{
                              gridTemplateColumns: `72px repeat(${timelineSessions.length}, minmax(180px, 1fr))`,
                              minWidth: `${72 + timelineSessions.length * 180}px`,
                            }}
                          >
                            <div className="sticky left-0 top-0 z-40 border-b border-r border-white/8 bg-[linear-gradient(180deg,rgba(8,10,18,0.98),rgba(8,10,18,0.94))] px-3 py-4 backdrop-blur-xl">
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Time</p>
                              <p className="mt-2 text-xs text-white/20">Scrollable</p>
                            </div>

                            {timelineSessions.map((session) => (
                              <div
                                key={`head-${session.id}`}
                                className="sticky top-0 z-30 border-b border-l border-white/8 bg-[linear-gradient(180deg,rgba(8,10,18,0.98),rgba(8,10,18,0.92))] px-3 py-4 backdrop-blur-xl"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/42">{session.day}</p>
                                    <p className="mt-2 text-sm font-semibold text-white">{session.dateLabel.replace(`${session.day}, `, '')}</p>
                                  </div>
                                  <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]', statusTone(session.status))}>
                                    {session.status}
                                  </span>
                                </div>
                                <p className="mt-2 text-xs text-white/34">{session.hostName}</p>
                              </div>
                            ))}

                            <div className="sticky left-0 z-20 border-r border-white/8 bg-[linear-gradient(180deg,rgba(8,10,18,0.98),rgba(8,10,18,0.92))]">
                              {hourSlots.map((slot) => (
                                <div
                                  key={slot.label}
                                  className="relative border-b border-white/[0.05] px-3"
                                  style={{ height: `${hourHeight}px` }}
                                >
                                  <span className="absolute left-3 top-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/24">
                                    {slot.label}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {timelineSessions.map((session, index) => (
                              <div
                                key={session.id}
                                className="relative border-l border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))]"
                                style={{ height: `${hourSlots.length * hourHeight}px` }}
                              >
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_50%)]" />
                                {hourSlots.map((slot, index) => (
                                  <div
                                    key={`${session.id}-${slot.label}`}
                                    className="absolute inset-x-0 border-t border-white/[0.04]"
                                    style={{ top: `${index * hourHeight}px` }}
                                  />
                                ))}

                                {(() => {
                                  const teacher = teachingTeamByName.get(session.hostName);
                                  const theme = getSessionTheme(session.status, teacher?.accent);
                                  const top = ((parseTimeToMinutes(session.startTime) - scheduleStartHour * 60) / 60) * hourHeight;
                                  const rawHeight = ((parseTimeToMinutes(session.endTime) - parseTimeToMinutes(session.startTime)) / 60) * hourHeight;
                                  const height = Math.max(rawHeight - 10, 88);
                                  const active = focusedSessionId === session.id;

                                  return (
                                    <motion.button
                                      key={session.id}
                                      type="button"
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.28, delay: index * 0.05 }}
                                      whileHover={{ y: -3, scale: 1.01 }}
                                      whileTap={{ scale: 0.995 }}
                                      onMouseEnter={() => setFocusedSessionId(session.id)}
                                      onFocus={() => setFocusedSessionId(session.id)}
                                      onClick={() => setFocusedSessionId(session.id)}
                                      className={cn(
                                        'absolute left-2 right-2 overflow-hidden rounded-[22px] border px-3 py-3 text-left backdrop-blur-md transition',
                                        active ? 'ring-1 ring-white/15' : '',
                                      )}
                                      style={{
                                        top: `${top + 8}px`,
                                        height: `${height}px`,
                                        background: theme.background,
                                        borderColor: theme.borderColor,
                                        boxShadow: active ? theme.glow : '0 12px 28px rgba(0,0,0,0.18)',
                                      }}
                                    >
                                      <span className="absolute inset-y-3 left-1 w-[4px] rounded-full" style={{ backgroundColor: theme.accent }} />
                                      <div className="pl-2">
                                        <div className="flex items-start justify-between gap-2">
                                          <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]', statusTone(session.status))}>
                                            {session.status}
                                          </span>
                                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                                            {session.startTime} - {session.endTime}
                                          </span>
                                        </div>
                                        <p className="mt-3 text-[13px] font-semibold leading-5 text-white">{session.topic}</p>
                                        <p className="mt-2 text-[11px] font-medium text-white/64">{session.hostName}</p>
                                        <p className="mt-2 text-[11px] leading-4 text-white/46">
                                          {session.preparationNote ?? 'No preparation note yet. Open the detail panel for materials and linked study-plan context.'}
                                        </p>
                                      </div>
                                    </motion.button>
                                  );
                                })()}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                    <div className="space-y-6">
                      <div
                        className="rounded-[30px] border p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                        style={{
                          background: focusTheme.background,
                          borderColor: focusTheme.borderColor,
                          boxShadow: focusTheme.glow,
                        }}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Session detail</p>
                            <h3 className="mt-3 text-2xl font-serif text-white">
                              {focusedSession ? 'Selected teaching block' : 'No session selected'}
                            </h3>
                          </div>
                          {focusedSession && (
                            <span className={cn('inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', statusTone(focusedSession.status))}>
                              {focusedSession.status}
                            </span>
                          )}
                        </div>

                        {focusedSession ? (
                          <motion.div
                            key={focusedSession.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.24 }}
                            className="mt-5 space-y-4"
                          >
                            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">{focusedSession.dateLabel}</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
                                  {focusedSession.startTime} - {focusedSession.endTime}
                                </span>
                              </div>
                              <h3 className="mt-4 text-2xl font-serif text-white">{focusedSession.topic}</h3>
                              <p className="mt-3 text-sm leading-6 text-white/64">Lead: {focusedSession.hostName}</p>
                            </div>

                            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                <BookOpen size={15} className="text-cyan-100/72" />
                                Preparation note
                              </div>
                              <p className="mt-3 text-sm leading-6 text-white/62">
                                {focusedSession.preparationNote ?? 'No preparation note was added for this session.'}
                              </p>
                            </div>

                            <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                <FileText size={15} className="text-cyan-100/72" />
                                Required materials
                              </div>
                              <ul className="mt-3 space-y-2 text-sm text-white/62">
                                {focusedSession.requiredMaterials.map((material) => (
                                  <li key={material} className="flex items-start gap-2">
                                    <Sparkles size={14} className="mt-0.5 shrink-0 text-cyan-100/65" />
                                    <span>{material}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {focusCoach && (
                              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                  <Users size={15} className="text-cyan-100/72" />
                                  Assigned teacher
                                </div>
                                <p className="mt-3 text-sm font-semibold text-white">{focusCoach.name}</p>
                                <p className="mt-2 text-sm leading-6 text-white/62">{focusCoach.specialty}</p>
                                <p className="mt-2 text-xs text-white/40">{focusCoach.rateLabel ?? focusCoach.role}</p>
                              </div>
                            )}

                            {focusedSession.linkedStudyPlanMilestone && (
                              <div className="rounded-[24px] border border-cyan-200/15 bg-cyan-200/[0.06] p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
                                  <Target size={15} />
                                  Study plan link
                                </div>
                                <p className="mt-3 text-sm leading-6 text-cyan-50/84">{focusedSession.linkedStudyPlanMilestone}</p>
                              </div>
                            )}

                            {(focusedSession.statusReason || focusedSession.conflictsWithPersonalSchedule) && (
                              <div className="rounded-[24px] border border-amber-300/18 bg-amber-300/[0.06] p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
                                  <CircleAlert size={15} />
                                  Schedule alert
                                </div>
                                <p className="mt-3 text-sm leading-6 text-amber-100/84">
                                  {focusedSession.statusReason ?? 'This slot overlaps with another item in your current schedule.'}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <div className="mt-5 rounded-[24px] border border-dashed border-white/12 bg-white/[0.02] px-6 py-12 text-center">
                            <p className="text-sm text-white/42">Select a session block from the weekly board to inspect it here.</p>
                          </div>
                        )}
                      </div>

                      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Preparation lane</p>
                            <h3 className="mt-3 text-2xl font-serif text-white">What students should review before class</h3>
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                            {preparationSessions.length} prep notes
                          </span>
                        </div>

                        <div className="mt-5 space-y-3">
                          {preparationSessions.length === 0 ? (
                            <div className="rounded-[22px] border border-dashed border-white/12 bg-white/[0.02] px-5 py-10 text-center text-sm text-white/42">
                              No preparation notes yet. The tutor or host can add them per session.
                            </div>
                          ) : (
                            preparationSessions.map((session, index) => {
                              const teacher = teachingTeamByName.get(session.hostName);
                              const theme = getTeamTheme(teacher?.accent);
                              return (
                                <motion.div
                                  key={session.id}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.28, delay: index * 0.05 }}
                                  className="rounded-[24px] border p-4"
                                  style={{
                                    background: theme.background,
                                    borderColor: theme.borderColor,
                                    boxShadow: theme.softGlow,
                                  }}
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <p className="text-sm font-semibold text-white">{session.topic}</p>
                                      <p className="mt-1 text-xs text-white/40">{session.dateLabel} · {session.startTime}</p>
                                    </div>
                                    <span className={cn('inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', theme.badge)}>
                                      {teacher?.name ?? session.hostName}
                                    </span>
                                  </div>
                                  <p className="mt-3 text-sm leading-6 text-white/60">{session.preparationNote}</p>
                                </motion.div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Teaching crew</p>
                            <h3 className="mt-3 text-2xl font-serif text-white">Tutors and mentors teaching this group</h3>
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                            {teachingTeam.length} total
                          </span>
                        </div>

                        <div className="mt-5 space-y-4">
                          {teachingTeam.map((teacher, index) => {
                            const theme = getTeamTheme(teacher.accent);
                            const sessionsLed = group.sessions.filter((session) => session.hostName === teacher.name).length;
                            return (
                              <motion.div
                                key={teacher.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.28, delay: index * 0.05 }}
                                className="rounded-[26px] border p-4"
                                style={{
                                  background: theme.background,
                                  borderColor: theme.borderColor,
                                  boxShadow: theme.softGlow,
                                }}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] font-serif text-sm text-white">
                                      {teacher.initials}
                                    </span>
                                    <div>
                                      <p className="text-base font-semibold text-white">{teacher.name}</p>
                                      <p className={cn('mt-1 text-xs font-semibold uppercase tracking-[0.16em]', theme.text)}>
                                        {teacher.role}
                                      </p>
                                    </div>
                                  </div>
                                  <span className={cn('inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', theme.badge)}>
                                    {sessionsLed} sessions
                                  </span>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-white/62">{teacher.specialty}</p>
                                <p className="mt-3 text-sm leading-6 text-white/52">{teacher.sessionFocus}</p>
                                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/42">
                                  <span>{teacher.availabilityLabel}</span>
                                  {teacher.rateLabel && <span>· {teacher.rateLabel}</span>}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(18,13,37,0.96),rgba(76,29,149,0.22))] p-5 shadow-[0_24px_70px_rgba(76,29,149,0.14)]">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-200/18 bg-violet-200/[0.08] text-violet-100">
                            <Star size={18} />
                          </span>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-100/55">Booked teaching support</p>
                            <h3 className="mt-3 text-2xl font-serif text-white">
                              {bookedTutors.length > 0 ? `${bookedTutors.length} tutors supporting this group` : 'Peer-led support structure'}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-white/66">
                              This group can continue into one-to-one tutor booking without losing subject context. The same teaching crew can bridge from cohort review into deeper personal sessions.
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {(bookedTutors.length > 0 ? bookedTutors : teachingTeam).map((teacher) => {
                            const theme = getTeamTheme(teacher.accent);
                            return (
                              <span
                                key={teacher.id}
                                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                                style={{
                                  borderColor: theme.borderColor,
                                  background: theme.background,
                                  boxShadow: theme.softGlow,
                                }}
                              >
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.accent }} />
                                {teacher.name}
                              </span>
                            );
                          })}
                        </div>

                        <Link
                          to="/tutors"
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-100 transition hover:text-white"
                        >
                          Explore tutor booking continuation
                          <ArrowRight size={15} />
                        </Link>
                      </div>

                      <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(13,24,22,0.95),rgba(16,185,129,0.12))] p-5 shadow-[0_20px_60px_rgba(16,185,129,0.1)]">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-300/[0.08] text-emerald-100">
                            <Zap size={18} />
                          </span>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/55">Reminder system</p>
                            <h3 className="mt-3 text-2xl font-serif text-white">Schedule notifications stay calm but visible</h3>
                            <p className="mt-3 text-sm leading-7 text-white/66">
                              New session added, session rescheduled, task assigned, and tutor announcement all route through the same in-app and email reminder system used across HaNova.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Completed</p>
                    <p className="mt-3 text-3xl font-serif text-white">{completionCount}</p>
                  </div>
                  <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Pending</p>
                    <p className="mt-3 text-3xl font-serif text-white">{pendingCount}</p>
                  </div>
                  <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/34">Overdue</p>
                    <p className="mt-3 text-3xl font-serif text-white">{overdueCount}</p>
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Assignments</p>
                      <h2 className="mt-3 text-3xl font-serif text-white">Tasks tied to the group learning rhythm</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['All', 'Pending', 'Completed', 'Overdue'] as const).map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setTaskFilter(value)}
                          className={cn(
                            'rounded-full border px-4 py-2 text-sm font-semibold transition',
                            taskFilter === value
                              ? 'border-cyan-200/25 bg-cyan-200/[0.12] text-cyan-50'
                              : 'border-white/10 bg-white/[0.03] text-white/56 hover:border-white/18 hover:text-white',
                          )}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredTasks.length === 0 ? (
                    <div className="mt-6 rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-8 py-14 text-center">
                      <h3 className="text-2xl font-serif text-white">No tasks in this filter</h3>
                      <p className="mt-3 text-sm text-white/46">Tasks will appear here when tutors or hosts assign structured follow-up work.</p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {filteredTasks.map((task) => (
                        <div key={task.id} className="rounded-[28px] border border-white/8 bg-black/15 p-5">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={cn('rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]', taskTone(task.status))}>
                                  {task.status}
                                </span>
                                <span className="text-xs text-white/38">Assigned by {task.assignedBy}</span>
                              </div>
                              <h3 className="mt-4 text-2xl font-serif text-white">{task.title}</h3>
                              <p className="mt-3 text-sm leading-7 text-white/56">{task.description}</p>
                              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/38">Due {task.dueDate}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
                                toggleTask(task.id);
                                persistTaskStatus(task.id, nextStatus);
                              }}
                              className={cn(
                                'rounded-full px-4 py-2 text-sm font-semibold transition',
                                task.status === 'Completed'
                                  ? 'border border-white/10 bg-white/[0.03] text-white/66 hover:border-white/18 hover:text-white'
                                  : 'border border-cyan-200/25 bg-cyan-200/[0.12] text-cyan-50 hover:bg-cyan-200/[0.18]',
                              )}
                            >
                              {task.status === 'Completed' ? 'Mark pending' : 'Mark complete'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-6">
                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Materials library</p>
                  <h2 className="mt-3 text-3xl font-serif text-white">Files and references organized by topic</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
                    Every material belongs to a session or topic so students can review with context instead of hunting through a message stream.
                  </p>

                  {group.materials.length === 0 ? (
                    <div className="mt-6 rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-8 py-14 text-center">
                      <h3 className="text-2xl font-serif text-white">No materials uploaded yet</h3>
                      <p className="mt-3 text-sm text-white/46">Once the host shares files, links, or replays they will appear by topic here.</p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-5">
                      {Object.entries(materialSections).map(([topic, materials]) => (
                        <div key={topic} className="rounded-[28px] border border-white/8 bg-black/15 p-5">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">Topic</p>
                              <h3 className="mt-3 text-2xl font-serif text-white">{topic}</h3>
                            </div>
                            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                              {materials.length} items
                            </span>
                          </div>

                          <div className="mt-5 grid gap-4 md:grid-cols-2">
                            {materials.map((material) => (
                              <div key={material.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                                      {materialIcon(material.kind)}
                                    </span>
                                    <div>
                                      <p className="text-sm font-semibold text-white">{material.title}</p>
                                      <p className="mt-1 text-xs text-white/38">{material.sessionTitle}</p>
                                    </div>
                                  </div>
                                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/38">
                                    {material.kind}
                                  </span>
                                </div>
                                <p className="mt-4 text-sm text-white/54">{material.meta}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-6">
                <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))] p-6">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Structured discussion</p>
                      <h2 className="mt-3 text-3xl font-serif text-white">Threads for questions, notes, and tutor guidance</h2>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/62">
                      One question per thread. Keep it searchable.
                    </div>
                  </div>

                  {pinnedThread && (
                    <div className="mt-6 rounded-[30px] border border-cyan-200/15 bg-cyan-200/[0.06] p-6">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.1] text-cyan-100">
                          <MessagesSquare size={18} />
                        </span>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">Pinned tutor message</p>
                          <h3 className="mt-3 text-2xl font-serif text-cyan-50">{pinnedThread.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-cyan-50/88">{pinnedThread.content}</p>
                          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-cyan-50/70">
                            <span>{pinnedThread.author}</span>
                            <span>{pinnedThread.postedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {regularThreads.length === 0 ? (
                    <div className="mt-6 rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] px-8 py-14 text-center">
                      <h3 className="text-2xl font-serif text-white">No discussion threads yet</h3>
                      <p className="mt-3 text-sm text-white/46">The first academic question or tutor announcement will appear here.</p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      {regularThreads.map((thread) => (
                        <div key={thread.id} className="rounded-[28px] border border-white/8 bg-black/15 p-5">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                              <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                                <span className="font-semibold text-white/78">{thread.author}</span>
                                <span>{thread.role}</span>
                                <span>{thread.postedAt}</span>
                              </div>
                              <h3 className="mt-4 text-2xl font-serif text-white">{thread.title}</h3>
                              <p className="mt-3 text-sm leading-7 text-white/56">{thread.content}</p>
                            </div>
                            <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/54">
                              {thread.replies.length} replies
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {(['Helpful', 'Insightful'] as const).map((reaction) => (
                              <button
                                key={reaction}
                                type="button"
                                onClick={() => {
                                  const nextReactions = {
                                    Helpful: reactionState[thread.id]?.Helpful ?? thread.reactions.Helpful,
                                    Insightful: reactionState[thread.id]?.Insightful ?? thread.reactions.Insightful,
                                    [reaction]:
                                      (reactionState[thread.id]?.[reaction] ?? thread.reactions[reaction]) + 1,
                                  };
                                  addReaction(thread.id, reaction);
                                  persistReaction(thread.id, nextReactions);
                                }}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/68 transition hover:border-white/18 hover:text-white"
                              >
                                {reaction} · {reactionState[thread.id]?.[reaction] ?? thread.reactions[reaction]}
                              </button>
                            ))}
                          </div>

                          {thread.replies.length > 0 && (
                            <div className="mt-5 space-y-3 border-t border-white/6 pt-4">
                              {thread.replies.map((reply) => (
                                <div key={reply.id} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/38">
                                    <span className="font-semibold text-white/78">{reply.author}</span>
                                    <span>{reply.role}</span>
                                    <span>{reply.postedAt}</span>
                                  </div>
                                  <p className="mt-3 text-sm leading-6 text-white/56">{reply.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </motion.div>
  );
}
