import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  MapPin,
  FileText,
  Video,
  Link2,
  Star,
  Sparkles,
  Calendar,
  Target,
  Flame,
  ArrowRight,
  Bell,
  X,
  Flag,
  TrendingUp,
  Users,
  GraduationCap,
  BarChart2,
  Play,
} from 'lucide-react';

/* ══════════════════════════════════════
   MOCK DATA
══════════════════════════════════════ */

const studyPlan = {
  id: 'sp1',
  title: 'IELTS 6.5 Preparation Plan',
  tutor: 'Dr. Emma Farooq',
  tutorAvatar: 'https://i.pravatar.cc/150?u=emma',
  subject: 'English – IELTS',
  duration: '8 Weeks',
  startDate: 'Oct 06, 2026',
  endDate: 'Nov 30, 2026',
  progress: 38,
  totalSessions: 24,
  completedSessions: 9,
  upcomingSessions: 15,
  tasksDueThisWeek: 3,
  consistency: '4 sessions this week',
  weeklyData: [3, 2, 4, 3, 4, 3, 4], // last 7 days sessions done per day (mock)
};

const reminders = [
  { id: 'r1', type: 'session', message: 'You have a session tomorrow at 08:00', icon: Calendar, color: 'blue' },
  { id: 'r2', type: 'task', message: '3 tasks are due this week', icon: AlertTriangle, color: 'amber' },
  { id: 'r3', type: 'update', message: 'Your tutor updated the study plan', icon: Sparkles, color: 'indigo' },
];

const phases = [
  {
    id: 'p1',
    title: 'Grammar Foundation',
    duration: 'Weeks 1–2',
    sessionCount: 6,
    status: 'Completed' as const,
    sessions: [
      { id: 'ses1', title: 'Present & Past Tenses', date: 'Oct 07', time: '08:00', tutor: 'Dr. Emma Farooq', status: 'Completed' as const, prepNote: 'Review Cambridge Grammar Unit 1–3', objectives: ['Identify tense errors', 'Use time expressions'], materials: [{ type: 'pdf', label: 'Grammar Workbook.pdf' }, { type: 'link', label: 'BBC Grammar Resource' }], tutorFeedback: 'Excellent engagement. Needs more practice with conditionals.', studentReview: null },
      { id: 'ses2', title: 'Conditionals & Modals', date: 'Oct 10', time: '08:00', tutor: 'Dr. Emma Farooq', status: 'Completed' as const, prepNote: 'Pre-read Unit 4 in workbook', objectives: ['Master all 4 conditional forms'], materials: [{ type: 'pdf', label: 'Conditional Exercises.pdf' }], tutorFeedback: 'Good progress. Practice written sentences daily.', studentReview: 4 },
      { id: 'ses3', title: 'Passive Voice', date: 'Oct 13', time: '14:00', tutor: 'Dr. Emma Farooq', status: 'Completed' as const, prepNote: '', objectives: ['Rewrite 20 active sentences'], materials: [], tutorFeedback: null, studentReview: 5 },
    ],
    tasks: [
      { id: 't1', title: 'Grammar Workbook Ex. 1–20', dueDate: 'Oct 08', status: 'Completed' as const, priority: 'High' as const },
      { id: 't2', title: 'Rewrite 15 sentences using passive voice', dueDate: 'Oct 14', status: 'Completed' as const, priority: 'Medium' as const },
    ],
  },
  {
    id: 'p2',
    title: 'Reading Strategies',
    duration: 'Weeks 3–4',
    sessionCount: 6,
    status: 'Ongoing' as const,
    sessions: [
      { id: 'ses4', title: 'Skimming & Scanning Techniques', date: 'Oct 20', time: '08:00', tutor: 'Dr. Emma Farooq', status: 'Completed' as const, prepNote: 'Read 2 sample passages from Cambridge 17', objectives: ['Identify main ideas', 'Find specific info quickly'], materials: [{ type: 'pdf', label: 'Cambridge IELTS 17.pdf' }, { type: 'video', label: 'Scanning Technique Demo' }], tutorFeedback: 'Strong instincts. Work on time management.', studentReview: 4 },
      { id: 'ses5', title: 'Matching Headings Task', date: 'Oct 23', time: '08:00', tutor: 'Dr. Emma Farooq', status: 'Completed' as const, prepNote: 'Do practice test from Cambridge 16 p.34', objectives: ['Score 6/7 on matching headings'], materials: [{ type: 'pdf', label: 'Practice Test 2.pdf' }], tutorFeedback: null, studentReview: null },
      { id: 'ses6', title: 'True / False / Not Given', date: 'Oct 27', time: '08:00', tutor: 'Dr. Emma Farooq', status: 'Upcoming' as const, prepNote: 'Read the strategy guide first', objectives: ['Distinguish T/F/NG accurately', 'Avoid guessing'], materials: [{ type: 'pdf', label: 'Strategy Guide.pdf' }], tutorFeedback: null, studentReview: null },
    ],
    tasks: [
      { id: 't3', title: 'Complete Cambridge 17 Test 1 Reading', dueDate: 'Oct 22', status: 'Completed' as const, priority: 'High' as const },
      { id: 't4', title: 'Vocabulary: Academic word list 1–20', dueDate: 'Oct 26', status: 'Pending' as const, priority: 'Medium' as const },
      { id: 't5', title: 'Timed reading practice (60 min)', dueDate: 'Oct 28', status: 'Pending' as const, priority: 'High' as const },
    ],
  },
  {
    id: 'p3',
    title: 'Writing Task 1 & 2',
    duration: 'Weeks 5–6',
    sessionCount: 6,
    status: 'Upcoming' as const,
    sessions: [
      { id: 'ses7', title: 'Task 1: Describing Charts', date: 'Nov 03', time: '08:00', tutor: 'Dr. Emma Farooq', status: 'Upcoming' as const, prepNote: 'Review sample band 7 essay', objectives: ['Use appropriate language for trends'], materials: [{ type: 'pdf', label: 'Task 1 Model Answers.pdf' }], tutorFeedback: null, studentReview: null },
      { id: 'ses8', title: 'Task 2: Opinion Essay', date: 'Nov 06', time: '08:00', tutor: 'Dr. Emma Farooq', status: 'Upcoming' as const, prepNote: '', objectives: ['Write 250 words in 40 min'], materials: [], tutorFeedback: null, studentReview: null },
    ],
    tasks: [
      { id: 't6', title: 'Write 2 Task 1 responses for feedback', dueDate: 'Nov 05', status: 'Pending' as const, priority: 'High' as const },
      { id: 't7', title: 'Read 5 band 8 Task 2 essays', dueDate: 'Nov 02', status: 'Overdue' as const, priority: 'Medium' as const },
    ],
  },
  {
    id: 'p4',
    title: 'Listening & Speaking',
    duration: 'Weeks 7–8',
    sessionCount: 6,
    status: 'Upcoming' as const,
    sessions: [
      { id: 'ses9', title: 'Listening: Form Completion', date: 'Nov 17', time: '09:00', tutor: 'Dr. Emma Farooq', status: 'Upcoming' as const, prepNote: '', objectives: [], materials: [], tutorFeedback: null, studentReview: null },
    ],
    tasks: [
      { id: 't8', title: 'Speaking mock test recording', dueDate: 'Nov 20', status: 'Pending' as const, priority: 'Low' as const },
    ],
  },
];

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
const statusConfig = {
  Completed: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400', line: 'bg-emerald-500/30' },
  Ongoing:   { color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20',    dot: 'bg-blue-400',    line: 'bg-blue-500/30' },
  Upcoming:  { color: 'text-white/40',    bg: 'bg-white/5 border-white/10',          dot: 'bg-white/20',    line: 'bg-white/10' },
  Missed:    { color: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20',     dot: 'bg-red-400',     line: 'bg-red-500/20' },
};

const priorityConfig = {
  High:   'text-red-400 border-red-400/30 bg-red-400/5',
  Medium: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  Low:    'text-white/40 border-white/10 bg-white/[0.02]',
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status as keyof typeof statusConfig] || statusConfig.Upcoming;
  return (
    <span className={`px-2 py-0.5 rounded-lg border text-[9px] uppercase font-bold tracking-widest ${cfg.bg} ${cfg.color}`}>
      {status}
    </span>
  );
}

function MaterialIcon({ type }: { type: string }) {
  if (type === 'pdf') return <FileText size={12} className="text-red-400" />;
  if (type === 'video') return <Video size={12} className="text-blue-400" />;
  return <Link2 size={12} className="text-indigo-400" />;
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function StudyPlan() {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['p2']);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
  const [taskStatuses, setTaskStatuses] = useState<Record<string, string>>({});
  const [dismissedReminders, setDismissedReminders] = useState<string[]>([]);
  const [reviewingSession, setReviewingSession] = useState<string | null>(null);
  const [starRating, setStarRating] = useState<Record<string, number>>({});

  const togglePhase = (id: string) => {
    setExpandedPhases(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleSession = (id: string) => {
    setExpandedSession(prev => prev === id ? null : id);
  };

  const allTasks = useMemo(() => phases.flatMap(p => p.tasks.map(t => ({ ...t, phase: p.title }))), []);
  const filteredTasks = useMemo(() => {
    return allTasks.filter(t => {
      const effectiveStatus = taskStatuses[t.id] || t.status;
      if (taskFilter === 'All') return true;
      if (taskFilter === 'Pending') return effectiveStatus === 'Pending' || effectiveStatus === 'Overdue';
      return effectiveStatus === 'Completed';
    });
  }, [allTasks, taskFilter, taskStatuses]);

  const markTaskDone = (id: string) => {
    setTaskStatuses(prev => ({ ...prev, [id]: prev[id] === 'Completed' ? 'Pending' : 'Completed' }));
  };

  const activeReminders = reminders.filter(r => !dismissedReminders.includes(r.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-[88px] pb-28 px-4 lg:px-10 max-w-[1400px] mx-auto text-white"
    >

      {/* ══ SOFT REMINDERS ══ */}
      <AnimatePresence>
        {activeReminders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-2 mb-6"
          >
            {activeReminders.map(r => {
              const Icon = r.Icon || r.icon;
              const colorMap: Record<string, string> = {
                blue: 'border-blue-500/20 bg-blue-500/5 text-blue-300',
                amber: 'border-amber-500/20 bg-amber-500/5 text-amber-300',
                indigo: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-300',
              };
              return (
                <motion.div
                  key={r.id}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className={`flex-1 flex items-center justify-between gap-3 px-4 py-3 rounded-[14px] border ${colorMap[r.color]} backdrop-blur-sm`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bell size={13} />
                    <span className="text-[12px] font-medium">{r.message}</span>
                  </div>
                  <button
                    onClick={() => setDismissedReminders(prev => [...prev, r.id])}
                    className="text-white/30 hover:text-white/70 transition-colors shrink-0"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
         SECTION 1: OVERVIEW DASHBOARD
      ══════════════════════════════════════ */}
      <section className="mb-10">
        {/* Plan Header */}
        <div className="glass-panel rounded-[28px] p-7 mb-5 relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent)] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={14} className="text-indigo-400" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-indigo-300/70">Active Study Plan</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-3 leading-tight">
                {studyPlan.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-6">
                <div className="flex items-center gap-2">
                  <img src={studyPlan.tutorAvatar} className="w-6 h-6 rounded-full border border-white/10" alt="" />
                  <span className="text-white/80">{studyPlan.tutor}</span>
                </div>
                <span>·</span>
                <span>{studyPlan.subject}</span>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{studyPlan.startDate} → {studyPlan.endDate}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{studyPlan.duration}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Overall Progress</span>
                  <span className="text-2xl font-bold text-white">{studyPlan.progress}<span className="text-sm text-white/40">%</span></span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${studyPlan.progress}%` }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#6366f1,#a78bfa,#f4c47c)]"
                    style={{ boxShadow: '0 0 14px rgba(99,102,241,0.5)' }}
                  />
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex lg:flex-col gap-3 shrink-0">
              <Link
                to="/schedule"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-sm font-medium text-white/80 transition-all"
              >
                <Calendar size={15} />
                View Schedule
              </Link>
              <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-sm font-bold text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <Play size={15} />
                Continue Learning
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Sessions', value: studyPlan.totalSessions, icon: BookOpen, color: 'text-white/60', accent: 'bg-white/[0.03]' },
            { label: 'Completed', value: studyPlan.completedSessions, icon: CheckCircle2, color: 'text-emerald-400', accent: 'bg-emerald-500/[0.05]' },
            { label: 'Upcoming', value: studyPlan.upcomingSessions, icon: ArrowRight, color: 'text-blue-400', accent: 'bg-blue-500/[0.05]' },
            { label: 'Tasks Due', value: studyPlan.tasksDueThisWeek, icon: Flag, color: 'text-amber-400', accent: 'bg-amber-500/[0.05]' },
          ].map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className={`glass-panel rounded-[20px] p-5 flex flex-col gap-3 border border-white/10 ${card.accent}`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{card.label}</span>
                  <Icon size={18} className={card.color} />
                </div>
                <span className="text-4xl font-bold tracking-tighter text-white">{card.value}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
         LAYOUT: TIMELINE + SIDEBAR
      ══════════════════════════════════════ */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

        {/* ══════════════════════════
           LEFT: TIMELINE + TASKS
        ══════════════════════════ */}
        <div className="space-y-8">

          {/* ── SECTION 2: TIMELINE ROADMAP ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Target size={16} className="text-indigo-400" />
              <h2 className="text-lg font-serif tracking-wide">Learning Roadmap</h2>
            </div>

            <div className="relative">
              {/* Vertical spine */}
              <div className="absolute left-[22px] top-4 bottom-4 w-px bg-white/5 z-0" />

              <div className="space-y-4">
                {phases.map((phase, phaseIdx) => {
                  const cfg = statusConfig[phase.status];
                  const isOpen = expandedPhases.includes(phase.id);

                  return (
                    <motion.div key={phase.id} layout>
                      {/* Phase Header */}
                      <div className="flex items-start gap-5 relative z-10">
                        {/* Node */}
                        <div className="shrink-0 mt-1 relative">
                          <div className={`w-11 h-11 rounded-full border flex items-center justify-center ${cfg.bg}`}>
                            {phase.status === 'Completed'
                              ? <CheckCircle2 size={18} className="text-emerald-400" />
                              : phase.status === 'Ongoing'
                              ? <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                              : <Circle size={16} className="text-white/20" />
                            }
                          </div>
                          {/* Connector to next */}
                          {phaseIdx < phases.length - 1 && (
                            <div className={`absolute top-11 left-5 w-px h-6 ${cfg.line}`} />
                          )}
                        </div>

                        {/* Card */}
                        <div className="flex-1 glass-panel rounded-[20px] border border-white/10 overflow-hidden">
                          <button
                            onClick={() => togglePhase(phase.id)}
                            className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-2.5 mb-1">
                                <StatusBadge status={phase.status} />
                                <span className="text-[10px] text-white/30 uppercase tracking-wider font-mono">{phase.duration}</span>
                              </div>
                              <h3 className="text-base font-serif text-white">{phase.title}</h3>
                              <p className="text-[11px] text-white/40 mt-0.5">{phase.sessionCount} sessions · {phase.tasks.length} tasks</p>
                            </div>
                            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                              <ChevronDown size={18} className="text-white/40" />
                            </div>
                          </button>

                          {/* Expanded phase body */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-white/5 p-5 space-y-3">

                                  {/* Sessions */}
                                  {phase.sessions.map(session => {
                                    const scfg = statusConfig[session.status];
                                    const isSessionOpen = expandedSession === session.id;

                                    return (
                                      <div key={session.id} className="rounded-[16px] border border-white/5 bg-white/[0.015] overflow-hidden">
                                        <button
                                          onClick={() => toggleSession(session.id)}
                                          className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.03] transition-colors"
                                        >
                                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${scfg.dot}`} />
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <span className="text-sm font-medium text-white/90 truncate">{session.title}</span>
                                              <StatusBadge status={session.status} />
                                            </div>
                                            <div className="flex items-center gap-3 mt-0.5 text-[11px] text-white/40">
                                              <span className="flex items-center gap-1"><Calendar size={10} />{session.date}</span>
                                              <span className="flex items-center gap-1"><Clock size={10} />{session.time}</span>
                                            </div>
                                          </div>
                                          <ChevronDown size={14} className={`text-white/30 shrink-0 transition-transform ${isSessionOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                          {isSessionOpen && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.28 }}
                                              className="overflow-hidden"
                                            >
                                              <div className="border-t border-white/5 px-4 pb-4 pt-3 space-y-4">
                                                {/* Objectives */}
                                                {session.objectives?.length > 0 && (
                                                  <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">Learning Objectives</p>
                                                    <ul className="space-y-1">
                                                      {session.objectives.map((obj, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-[12px] text-white/70">
                                                          <div className="w-1 h-1 rounded-full bg-indigo-400" />
                                                          {obj}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                )}

                                                {/* Prep note */}
                                                {session.prepNote && (
                                                  <div className="rounded-[12px] bg-amber-500/5 border border-amber-500/10 p-3">
                                                    <p className="text-[9px] uppercase tracking-widest text-amber-400/60 font-bold mb-1 flex items-center gap-1"><FileText size={10} />Tutor Prep Note</p>
                                                    <p className="text-[12px] text-white/60 italic">"{session.prepNote}"</p>
                                                  </div>
                                                )}

                                                {/* Materials */}
                                                {session.materials?.length > 0 && (
                                                  <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">Materials</p>
                                                    <div className="flex flex-wrap gap-2">
                                                      {session.materials.map((m, i) => (
                                                        <button key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] text-white/70 hover:bg-white/[0.08] transition-colors">
                                                          <MaterialIcon type={m.type} />
                                                          {m.label}
                                                        </button>
                                                      ))}
                                                    </div>
                                                  </div>
                                                )}

                                                {/* Tutor Feedback */}
                                                {session.tutorFeedback && (
                                                  <div className="rounded-[12px] bg-indigo-500/5 border border-indigo-500/10 p-3">
                                                    <p className="text-[9px] uppercase tracking-widest text-indigo-400/60 font-bold mb-1 flex items-center gap-1"><GraduationCap size={10} />Tutor Feedback</p>
                                                    <p className="text-[12px] text-white/60">"{session.tutorFeedback}"</p>
                                                  </div>
                                                )}

                                                {/* Student Review — only for Completed */}
                                                {session.status === 'Completed' && (
                                                  <div>
                                                    <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">Your Rating</p>
                                                    {session.studentReview || starRating[session.id] ? (
                                                      <div className="flex gap-1">
                                                        {[1,2,3,4,5].map(s => (
                                                          <Star key={s} size={16}
                                                            className={s <= (starRating[session.id] || session.studentReview || 0) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
                                                          />
                                                        ))}
                                                      </div>
                                                    ) : (
                                                      <div className="flex items-center gap-1">
                                                        {[1,2,3,4,5].map(s => (
                                                          <button key={s} onClick={() => setStarRating(prev => ({ ...prev, [session.id]: s }))}
                                                            className="hover:scale-125 transition-transform"
                                                          >
                                                            <Star size={18} className="text-white/20 hover:text-amber-400 transition-colors" />
                                                          </button>
                                                        ))}
                                                        <span className="text-[10px] text-white/30 ml-1">Rate this session</span>
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── SECTION 4: TASK MANAGEMENT ── */}
          <section>
            <div className="glass-panel rounded-[24px] border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <h2 className="text-lg font-serif">Tasks & Assignments</h2>
                </div>
                <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-full border border-white/5">
                  {(['All', 'Pending', 'Completed'] as const).map(f => (
                    <button key={f} onClick={() => setTaskFilter(f)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${taskFilter === f ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task List */}
              <div className="p-4 space-y-2">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.map(task => {
                    const effectiveStatus = taskStatuses[task.id] || task.status;
                    const isDone = effectiveStatus === 'Completed';
                    const isOverdue = effectiveStatus === 'Overdue';

                    return (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className={`flex items-center gap-4 p-4 rounded-[16px] border transition-all group cursor-pointer hover:bg-white/[0.02]
                          ${isDone ? 'border-white/5 opacity-50' : isOverdue ? 'border-red-500/10 bg-red-500/[0.02]' : 'border-white/5'}`}
                        onClick={() => markTaskDone(task.id)}
                      >
                        {/* Checkbox */}
                        <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                          ${isDone ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 group-hover:border-white/40'}`}>
                          {isDone && <CheckCircle2 size={12} className="text-white" />}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-medium truncate transition-all ${isDone ? 'line-through text-white/30' : 'text-white/90'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-3 mt-0.5 text-[10px] text-white/40">
                            <span className="flex items-center gap-1"><Calendar size={9} />{task.dueDate}</span>
                            <span className="opacity-60">{task.phase}</span>
                          </div>
                        </div>

                        {/* Priority & Status */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isOverdue && !isDone && (
                            <span className="text-[9px] uppercase font-bold tracking-widest text-red-400/70 bg-red-500/5 border border-red-500/10 px-2 py-0.5 rounded-lg">Overdue</span>
                          )}
                          <span className={`text-[9px] uppercase font-bold tracking-widest border px-2 py-0.5 rounded-lg ${priorityConfig[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {filteredTasks.length === 0 && (
                  <div className="text-center py-10 text-white/30">
                    <CheckCircle2 size={28} className="mx-auto mb-3 text-emerald-500/30" />
                    <p className="text-sm">All caught up! No tasks here.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>

        {/* ══════════════════════════
           RIGHT SIDEBAR
        ══════════════════════════ */}
        <div className="space-y-5 lg:sticky lg:top-[100px]">

          {/* ── SECTION 5: PROGRESS ANALYTICS (LIGHTWEIGHT) ── */}
          <div className="glass-panel rounded-[24px] border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={15} className="text-indigo-400" />
              <h3 className="text-base font-serif">This Week</h3>
            </div>

            {/* Consistency badge */}
            <div className="flex items-center gap-2.5 p-3.5 rounded-[14px] bg-indigo-500/10 border border-indigo-500/15 mb-5">
              <Flame size={18} className="text-amber-400" />
              <div>
                <p className="text-sm font-bold text-white">{studyPlan.consistency}</p>
                <p className="text-[10px] text-white/40">Keep up the momentum!</p>
              </div>
            </div>

            {/* Mini bar chart */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-3">Daily Sessions (Last 7 Days)</p>
              <div className="flex items-end justify-between gap-1 h-14">
                {['M','T','W','T','F','S','S'].map((d, i) => {
                  const max = Math.max(...studyPlan.weeklyData);
                  const h = studyPlan.weeklyData[i];
                  const heightPct = max > 0 ? (h / max) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="w-full rounded-t-sm bg-white/5 relative overflow-hidden" style={{ height: '48px' }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPct}%` }}
                          transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className={`absolute bottom-0 w-full rounded-t-sm ${h > 0 ? 'bg-indigo-500/60' : ''}`}
                        />
                      </div>
                      <span className="text-[9px] text-white/30">{d}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Plan summary info ── */}
          <div className="glass-panel rounded-[24px] border border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 size={15} className="text-white/50" />
              <h3 className="text-base font-serif">Plan Details</h3>
            </div>

            {[
              { label: 'Phases', value: `${phases.length} phases` },
              { label: 'Tutor', value: studyPlan.tutor },
              { label: 'Subject', value: studyPlan.subject },
              { label: 'Duration', value: studyPlan.duration },
              { label: 'Target', value: 'IELTS 6.5 Band' },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-[11px] text-white/40 uppercase tracking-widest">{row.label}</span>
                <span className="text-[13px] font-medium text-white/80">{row.value}</span>
              </div>
            ))}
          </div>

          {/* ── Next session reminder ── */}
          <div className="glass-panel rounded-[24px] border border-blue-500/15 bg-blue-500/[0.03] p-5">
            <p className="text-[9px] uppercase tracking-widest text-blue-400/60 font-bold mb-3 flex items-center gap-1.5">
              <Calendar size={11} /> Next Session
            </p>
            <h4 className="font-serif text-white text-base mb-0.5">True / False / Not Given</h4>
            <p className="text-[12px] text-white/50 mb-4">With Dr. Emma Farooq</p>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-white/60"><Calendar size={11} />Oct 27, 2026</span>
              <span className="flex items-center gap-1.5 text-white/60"><Clock size={11} />08:00</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
