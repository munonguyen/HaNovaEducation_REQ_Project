import { useState, useEffect, useMemo, useRef, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Video,
  ChevronRight,
  Clock,
  CheckCircle,
  Circle,
  CalendarDays,
  BookOpen,
  Sparkles,
  Star,
  ArrowUpRight,
  GraduationCap,
  Flame,
  TrendingUp,
  BarChart2,
  Award,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
type AgendaTag = 'lesson' | 'self';
interface AgendaItem {
  id: string; dayNum: string; dayName: string;
  time: string; title: string; tutor?: string; type: AgendaTag;
}
interface StudyTopic { id: string; title: string; status: 'done' | 'active' | 'locked'; }
interface ActivityWeek { week: string; lessons: number; selfStudy: number; }
interface SubjectStat  { subject: string; pct: number; color: string; trackColor: string; label: string; }
interface SessionRecord { id: string; date: string; subject: string; tutor: string; duration: number; rating: number; }

/* ═══════════════════════════════════════════
   STATIC DATA (module-level = defined once)
═══════════════════════════════════════════ */
const AGENDA: AgendaItem[] = [
  { id:'a1', dayNum:'23', dayName:'Thu', time:'19:00', title:'Advanced Calculus: Limits & Continuity', tutor:'Dr. Nguyen Minh Anh', type:'lesson' },
  { id:'a2', dayNum:'24', dayName:'Fri', time:'09:00', title:'Self-Study: Integral Formulas Review', type:'self' },
  { id:'a3', dayNum:'25', dayName:'Sat', time:'14:00', title:'Physics – Electromagnetism & Fields', tutor:'Dr. Elena Ivanova', type:'lesson' },
  { id:'a4', dayNum:'26', dayName:'Sun', time:'10:00', title:'Independent: Practice Problem Set 3', type:'self' },
  { id:'a5', dayNum:'27', dayName:'Mon', time:'20:00', title:'Macroeconomics: Market Structures', tutor:'Prof. James Holden', type:'lesson' },
];

const STUDY_TOPICS: StudyTopic[] = [
  { id:'t1', title:'Chapter 1: Limits & Derivatives',       status:'done'   },
  { id:'t2', title:'Chapter 2: Rules of Differentiation',   status:'done'   },
  { id:'t3', title:'Chapter 3: Applications of Derivatives',status:'done'   },
  { id:'t4', title:'Chapter 4: Integration Fundamentals',   status:'active' },
  { id:'t5', title:'Chapter 5: Techniques of Integration',  status:'locked' },
  { id:'t6', title:'Chapter 6: Differential Equations',     status:'locked' },
];

const ACTIVITY: ActivityWeek[] = [
  { week:'W1', lessons:3, selfStudy:5 },
  { week:'W2', lessons:4, selfStudy:6 },
  { week:'W3', lessons:2, selfStudy:4 },
  { week:'W4', lessons:5, selfStudy:7 },
];

const SUBJECTS: SubjectStat[] = [
  { subject:'Calculus',       pct:88, color:'#818cf8', trackColor:'rgba(99,102,241,0.15)',  label:'Proficient'  },
  { subject:'Physics',        pct:74, color:'#fbbf24', trackColor:'rgba(245,158,11,0.15)',  label:'Developing'  },
  { subject:'Macroeconomics', pct:61, color:'#34d399', trackColor:'rgba(52,211,153,0.15)', label:'Developing'  },
  { subject:'English Writing',pct:92, color:'#c084fc', trackColor:'rgba(192,132,252,0.15)',label:'Excellent'   },
];

const SESSIONS: SessionRecord[] = [
  { id:'h1', date:'Oct 21', subject:'Calculus: Derivatives',        tutor:'Dr. Nguyen Minh Anh', duration:60, rating:5 },
  { id:'h2', date:'Oct 18', subject:'Physics: Electromagnetism',    tutor:'Dr. Elena Ivanova',   duration:90, rating:4 },
  { id:'h3', date:'Oct 15', subject:'Macroeconomics: GDP & Growth', tutor:'Prof. James Holden',  duration:60, rating:4 },
  { id:'h4', date:'Oct 12', subject:'English: Essay Tasks',         tutor:'Dr. Emma Farooq',     duration:75, rating:5 },
];

const PLAN_TITLE   = 'Midterm Prep Mastery';
const PLAN_TUTOR   = 'Dr. Nguyen Minh Anh';
const DONE_COUNT   = 3;
const TOTAL_COUNT  = 6;
const PROGRESS_PCT = Math.round((DONE_COUNT / TOTAL_COUNT) * 100);

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

function useCountdown(targetHour: number, targetMinute: number) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const t = new Date(); t.setHours(targetHour, targetMinute, 0, 0);
      if (t <= now) t.setDate(t.getDate() + 1);
      setSec(Math.max(0, Math.floor((t.getTime() - now.getTime()) / 1000)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetHour, targetMinute]);

  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return {
    display: h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`,
    isNear:  sec < 3600 && sec > 0,
    isReady: sec === 0,
  };
}

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════ */
const AgendaCard = memo(function AgendaCard({ item }: { item: AgendaItem }) {
  const isLesson = item.type === 'lesson';
  return (
    <div className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-200 cursor-pointer
      ${isLesson
        ? 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-amber-400/20'
        : 'bg-white/[0.015] border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10'
      }`}
    >
      <div className="flex flex-col items-center min-w-[40px] shrink-0">
        <span className="text-[9px] uppercase tracking-widest text-white/35 font-semibold">{item.dayName}</span>
        <span className="text-xl font-serif text-white leading-none mt-0.5">{item.dayNum}</span>
      </div>
      <div className={`w-px h-9 shrink-0 ${isLesson ? 'bg-amber-400/25' : 'bg-white/8'}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-medium leading-snug truncate ${isLesson ? 'text-white' : 'text-white/65'}`}>{item.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-[10px] text-white/35"><Clock size={10}/>{item.time}</span>
          {item.tutor && <span className="text-[10px] text-white/35 truncate hidden sm:block">{item.tutor}</span>}
        </div>
      </div>
      <div className="shrink-0">
        {isLesson
          ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/20"><Video size={8}/>Lesson</span>
          : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/5 text-white/35 border border-white/8"><BookOpen size={8}/>Self</span>
        }
      </div>
      <ChevronRight size={13} className="text-white/15 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-white/50" />
    </div>
  );
});

/* ═══════════════════════════════════════════
   INSIGHTS — BAR CHART  (fixed animation)
   Root cause of empty bars: inView prop arrives
   as `true` on first render so CSS has no
   "from" state to transition from.
   Fix: local `animated` state fires 60ms after
   inView, guaranteeing two distinct renders.
═══════════════════════════════════════════ */
function ActivityChart({ inView }: { inView: boolean }) {
  const MAX = useMemo(() => Math.max(...ACTIVITY.map(w => w.lessons + w.selfStudy)), []);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(true), 60); // force 2nd render
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div
      className="rounded-[22px] border border-white/[0.07] overflow-hidden"
      style={{ background: 'linear-gradient(160deg,rgba(14,16,32,0.98),rgba(8,10,22,0.95))' }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BarChart2 size={15} className="text-indigo-400" />
          <span className="text-[14px] font-serif text-white">Weekly Activity</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] text-white/35 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[3px] bg-indigo-500/80 inline-block"/>Lessons</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-[3px] bg-white/25 inline-block"/>Self-study</span>
        </div>
      </div>

      {/* Chart body */}
      <div className="px-6 pt-5 pb-6">
        {/* Grid lines (decorative) */}
        <div className="relative">
          <div className="flex flex-col justify-between h-40 mb-1 pointer-events-none">
            {[100,75,50,25,0].map(pct => (
              <div key={pct} className="flex items-center gap-2">
                <span className="text-[9px] text-white/15 w-5 text-right shrink-0">{pct === 100 ? '' : ''}</span>
                <div className="flex-1 h-px bg-white/[0.04]"/>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-2 px-0">
            {ACTIVITY.map((w, i) => {
              const total    = w.lessons + w.selfStudy;
              const lPct     = (w.lessons   / MAX) * 100;
              const sPct     = (w.selfStudy / MAX) * 100;
              const baseDelay = 0.06 + i * 0.09;

              return (
                <div key={w.week} className="flex-1 flex flex-col items-center gap-1.5">
                  {/* Value badge */}
                  <span
                    className="text-[10px] text-white/45 font-semibold transition-opacity duration-400"
                    style={{ opacity: animated ? 1 : 0, transitionDelay: `${baseDelay + 0.3}s` }}
                  >
                    {total}h
                  </span>

                  {/* Bar column — grows from bottom */}
                  <div className="relative w-full rounded-xl overflow-hidden bg-white/[0.04]" style={{ height: '148px' }}>
                    {/* Lesson segment — bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 rounded-b-xl"
                      style={{
                        height: animated ? `${lPct}%` : '0%',
                        transition: 'height 0.75s cubic-bezier(0.22,1,0.36,1)',
                        transitionDelay: `${baseDelay}s`,
                        background: 'linear-gradient(to top, rgba(67,56,202,0.95), rgba(99,102,241,0.7))',
                        boxShadow: animated ? '0 0 16px rgba(99,102,241,0.35)' : 'none',
                      }}
                    />
                    {/* Self-study segment — stacked on top of lesson */}
                    <div
                      className="absolute left-0 right-0"
                      style={{
                        bottom:  animated ? `${lPct}%` : '0%',
                        height:  animated ? `${sPct}%` : '0%',
                        transition: 'height 0.75s cubic-bezier(0.22,1,0.36,1), bottom 0.75s cubic-bezier(0.22,1,0.36,1)',
                        transitionDelay: `${baseDelay + 0.05}s`,
                        background: 'rgba(255,255,255,0.12)',
                      }}
                    />
                  </div>

                  {/* Week label */}
                  <span className="text-[10px] text-white/35 uppercase tracking-wide font-semibold">{w.week}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-[9px] text-white/18 text-right mt-2 uppercase tracking-widest">Hours · October 2026</p>
      </div>
    </div>
  );
}

function SubjectPerformance({ inView }: { inView: boolean }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div
      className="rounded-[22px] border border-white/[0.07] overflow-hidden"
      style={{ background: 'linear-gradient(160deg,rgba(14,16,32,0.98),rgba(8,10,22,0.95))' }}
    >
      <div className="px-6 pt-5 pb-4 border-b border-white/[0.05] flex items-center gap-2.5">
        <Award size={15} className="text-amber-400" />
        <span className="text-[14px] font-serif text-white">Subject Performance</span>
      </div>
      <div className="p-6 space-y-5">
        {SUBJECTS.map((s, i) => (
          <div key={s.subject}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-white/75 font-medium">{s.subject}</span>
              <span className="text-[13px] font-bold" style={{ color: s.color }}>{s.pct}%</span>
            </div>
            {/* Track */}
            <div className="h-2 rounded-full overflow-hidden" style={{ background: s.trackColor }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: animated ? `${s.pct}%` : '0%',
                  transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1)',
                  transitionDelay: `${0.05 + i * 0.1}s`,
                  background: `linear-gradient(90deg, ${s.color}88, ${s.color})`,
                  boxShadow: `0 0 8px ${s.color}45`,
                }}
              />
            </div>
            <p className="text-[9px] text-white/20 mt-1 uppercase tracking-widest font-bold">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionHistory() {
  return (
    <div
      className="rounded-[22px] border border-white/[0.07] overflow-hidden"
      style={{ background: 'linear-gradient(160deg,rgba(14,16,32,0.98),rgba(8,10,22,0.95))' }}
    >
      <div className="px-6 pt-5 pb-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GraduationCap size={15} className="text-emerald-400" />
          <span className="text-[14px] font-serif text-white">Recent Sessions</span>
        </div>
        <Link to="/tutors" className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest font-bold">
          All <ArrowUpRight size={10}/>
        </Link>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {SESSIONS.map((s, idx) => (
          <div key={s.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors duration-150">
            <span className="text-[10px] text-white/20 font-mono w-5 shrink-0">{String(idx+1).padStart(2,'0')}</span>
            <span className="text-[10px] text-white/35 font-semibold shrink-0 min-w-[48px]">{s.date}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-white/80 font-medium truncate">{s.subject}</p>
              <p className="text-[10px] text-white/30 truncate mt-0.5">{s.tutor}</p>
            </div>
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <Clock size={10} className="text-white/20"/>
              <span className="text-[10px] text-white/35">{s.duration}m</span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              {[1,2,3,4,5].map(n => (
                <Star key={n} size={11} className={n <= s.rating ? 'text-amber-400 fill-amber-400' : 'text-white/10'}/>
              ))}
            </div>
            <span className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/15 shrink-0">
              <CheckCircle size={8}/> Done
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INSIGHTS SECTION
═══════════════════════════════════════════ */
const KPI_DATA = [
  { label:'Sessions/Month', value:'14', sub:'+3 vs last month',   icon:Video,     iconCls:'text-indigo-400', iconBg:'bg-indigo-500/10 border-indigo-500/20', glowRgb:'99,102,241', trend:true  },
  { label:'Study Hours',    value:'52h', sub:'~4h per lesson',    icon:Clock,     iconCls:'text-amber-400',  iconBg:'bg-amber-500/10 border-amber-500/20',   glowRgb:'245,158,11', trend:true  },
  { label:'Avg. Rating',    value:'4.8', sub:'Based on 9 reviews',icon:Star,      iconCls:'text-violet-400', iconBg:'bg-violet-500/10 border-violet-500/20', glowRgb:'167,139,250',trend:false },
  { label:'Completion',     value:'87%', sub:'Attended / Booked', icon:Zap,       iconCls:'text-emerald-400',iconBg:'bg-emerald-500/10 border-emerald-500/20',glowRgb:'52,211,153', trend:true  },
];

function InsightsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease }}
      className="mt-14"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <TrendingUp size={16} className="text-violet-400"/>
          </div>
          <div>
            <h3 className="text-xl font-serif text-white">Learning Insights</h3>
            <p className="text-[11px] text-white/30 mt-0.5">Your academic overview · October 2026</p>
          </div>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/25 uppercase tracking-widest font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60"/>Last 30 days
        </span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {KPI_DATA.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease, delay: 0.05 + i * 0.07 }}
              className="relative group rounded-[20px] border border-white/[0.07] overflow-hidden p-5 transition-all duration-200 hover:border-white/[0.14] hover:-translate-y-0.5"
              style={{ background:'linear-gradient(145deg,rgba(14,16,32,0.98),rgba(8,10,22,0.95))' }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background:`radial-gradient(circle at 25% 25%, rgba(${k.glowRgb},0.18), transparent 60%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/35 font-bold leading-tight">{k.label}</p>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${k.iconBg} shrink-0`}>
                    <Icon size={14} className={k.iconCls}/>
                  </div>
                </div>
                <p className="text-[28px] font-serif text-white tracking-tight leading-none">{k.value}</p>
                <p className="flex items-center gap-1 mt-1.5 text-[10px] text-white/35">
                  {k.trend && <TrendingUp size={9} className="text-emerald-400"/>}
                  {k.sub}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart + Subjects side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-5 mb-5">
        <ActivityChart inView={inView} />
        <SubjectPerformance inView={inView} />
      </div>

      {/* Session history */}
      <SessionHistory />
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   UPCOMING TASKS CARD
═══════════════════════════════════════════ */
const TASKS_DATA = [
  { id:'tk1', text:'Review Chapter 3 notes before Calculus session',  due:'Tomorrow',  priority:'high',   done:false },
  { id:'tk2', text:'Complete Problem Set 3 — Integrals (pp. 42–48)',   due:'Oct 24',    priority:'high',   done:false },
  { id:'tk3', text:'Read Physics textbook Section 7.2',                due:'Oct 25',    priority:'medium', done:false },
  { id:'tk4', text:'Submit Economics essay outline to Prof. Holden',   due:'Oct 26',    priority:'medium', done:true  },
  { id:'tk5', text:'Watch recorded lecture: Market Equilibrium',       due:'Oct 27',    priority:'low',    done:true  },
];

const PRIORITY_STYLE: Record<string, { badge: string; dot: string }> = {
  high:   { badge:'bg-rose-500/10 text-rose-300 border-rose-500/20',   dot:'bg-rose-400'   },
  medium: { badge:'bg-amber-500/10 text-amber-300 border-amber-500/20', dot:'bg-amber-400'  },
  low:    { badge:'bg-white/5 text-white/35 border-white/10',           dot:'bg-white/25'   },
};

function UpcomingTasksCard() {
  const [tasks, setTasks] = useState(TASKS_DATA);
  const pending   = tasks.filter(t => !t.done).length;
  const completed = tasks.filter(t => t.done).length;

  const toggle = (id: string) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div
      className="rounded-[22px] border border-white/[0.07] overflow-hidden"
      style={{ background:'linear-gradient(160deg,rgba(12,14,28,0.98),rgba(8,10,22,0.95))' }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <CheckCircle size={15} className="text-rose-400"/>
          </div>
          <div>
            <span className="text-[14px] font-serif text-white">Upcoming Tasks</span>
            <p className="text-[9px] text-white/30 mt-0.5">{pending} pending · {completed} done</p>
          </div>
        </div>
        {/* Mini progress ring */}
        <div className="relative w-9 h-9 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke="#f87171" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${(completed / tasks.length) * 88} 88`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white/50">
            {Math.round((completed / tasks.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Task list */}
      <div className="p-4 space-y-2">
        {tasks.map(task => {
          const ps = PRIORITY_STYLE[task.priority];
          return (
            <button
              key={task.id}
              onClick={() => toggle(task.id)}
              className={`group w-full flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200
                ${task.done
                  ? 'bg-white/[0.01] border-white/[0.04] opacity-45 hover:opacity-60'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10'
                }`}
            >
              {/* Checkbox */}
              <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-all duration-200
                ${task.done ? 'bg-emerald-400/30 border-emerald-400' : 'border-white/20 group-hover:border-white/40'}`}
              >
                {task.done && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>}
              </div>

              {/* Text */}
              <p className={`flex-1 text-[12px] leading-snug transition-all
                ${task.done ? 'line-through text-white/30' : 'text-white/75'}`}
              >
                {task.text}
              </p>

              {/* Right side */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border ${ps.badge}`}>
                  {task.priority}
                </span>
                <span className="text-[9px] text-white/25 font-medium flex items-center gap-1">
                  <Clock size={8}/>{task.due}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 pt-1">
        <Link to="/study-plan" className="flex items-center justify-center gap-1.5 text-[10px] text-white/25 hover:text-white/55 transition-colors font-bold uppercase tracking-widest">
          Manage all tasks <ArrowUpRight size={10}/>
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TUTOR QUICK CONNECT CARD
═══════════════════════════════════════════ */
const MY_TUTORS = [
  { id:'t1', name:'Dr. Nguyen Minh Anh', subject:'Advanced Calculus',     online:true,  nextSession:'Tomorrow 19:00', avatar:'NMA' },
  { id:'t2', name:'Dr. Elena Ivanova',   subject:'Physics & Mechanics',   online:false, nextSession:'Sat 14:00',      avatar:'EI'  },
  { id:'t3', name:'Prof. James Holden',  subject:'Macroeconomics',        online:true,  nextSession:'Mon 20:00',      avatar:'JH'  },
];

const AVATAR_COLORS: Record<string, string> = {
  NMA:'from-indigo-500 to-violet-500',
  EI: 'from-cyan-500 to-blue-500',
  JH: 'from-amber-500 to-orange-500',
};

function TutorConnectCard() {
  return (
    <div
      className="rounded-[22px] border border-white/[0.07] overflow-hidden"
      style={{ background:'linear-gradient(160deg,rgba(12,14,28,0.98),rgba(8,10,22,0.95))' }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <GraduationCap size={15} className="text-emerald-400"/>
          </div>
          <div>
            <span className="text-[14px] font-serif text-white">My Tutors</span>
            <p className="text-[9px] text-white/30 mt-0.5">
              <span className="text-emerald-400">●</span>{' '}
              {MY_TUTORS.filter(t => t.online).length} online now
            </p>
          </div>
        </div>
        <Link to="/tutors" className="text-[9px] text-white/25 hover:text-white/55 transition-colors font-bold uppercase tracking-widest flex items-center gap-0.5">
          Browse <ArrowUpRight size={9}/>
        </Link>
      </div>

      {/* Tutor list */}
      <div className="p-4 space-y-2.5">
        {MY_TUTORS.map(tutor => (
          <div
            key={tutor.id}
            className="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-200 cursor-pointer group"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${AVATAR_COLORS[tutor.avatar]} flex items-center justify-center`}>
                <span className="text-[10px] font-bold text-white">{tutor.avatar}</span>
              </div>
              {/* Online dot */}
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0c1a]
                ${tutor.online ? 'bg-emerald-400' : 'bg-white/20'}`}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white/85 truncate">{tutor.name}</p>
              <p className="text-[10px] text-white/35 truncate">{tutor.subject}</p>
            </div>

            {/* Next session + message */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-[9px] text-white/30 font-medium">{tutor.nextSession}</span>
              <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border transition-colors
                ${tutor.online
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 group-hover:bg-emerald-500/18'
                  : 'bg-white/5 text-white/25 border-white/8'}`}
              >
                {tutor.online ? 'Message' : 'Offline'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════ */
export default function Dashboard() {
  const greeting  = useMemo(() => getGreeting(), []);
  const { display: countdown, isNear, isReady } = useCountdown(19, 0);

  const [reviewOpen,      setReviewOpen]      = useState(false);
  const [starHover,       setStarHover]       = useState(0);
  const [starRating,      setStarRating]      = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = () => {
    if (!starRating) return;
    setReviewSubmitted(true);
    setTimeout(() => { setReviewOpen(false); setReviewSubmitted(false); setStarRating(0); }, 1800);
  };

  /* shared stagger preset */
  const container = { hidden:{}, show:{ transition:{ staggerChildren:0.07, delayChildren:0.05 } } };
  const item      = { hidden:{ opacity:0, y:20 }, show:{ opacity:1, y:0, transition:{ duration:0.6, ease } } };

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.45 }}
      className="w-full min-h-screen pt-[88px] pb-24 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto"
    >
      {/* ══════════════ HERO ══════════════ */}
      <motion.section variants={container} initial="hidden" animate="show" className="mb-10">

        {/* Greeting */}
        <motion.div variants={item} className="mb-7">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-semibold mb-2.5">Your Learning Sanctuary</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-[1.1]">
            {greeting},{' '}
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent">Muno.</span>
          </h1>
          <p className="text-white/40 text-base mt-2.5 font-serif italic">
            The momentum you build today becomes tomorrow's advantage.
          </p>
        </motion.div>

        {/* Next Lesson Hero Card */}
        <motion.div variants={item} className="relative">
          <div className="absolute -inset-px rounded-[28px] bg-gradient-to-r from-amber-500/15 via-orange-400/8 to-indigo-500/8 blur-xl pointer-events-none"/>
          <div
            className="relative rounded-[24px] border border-white/[0.09] overflow-hidden"
            style={{ background:'linear-gradient(135deg,rgba(18,15,36,0.98),rgba(8,10,22,0.96))' }}
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-amber-400/55 via-orange-400/35 to-indigo-400/15"/>

            <div className="px-6 pt-6 pb-6 lg:px-9 lg:pt-7 lg:pb-7 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/22 flex items-center justify-center shrink-0">
                  <Video size={22} className="text-amber-300"/>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[9px] font-bold text-white/60 uppercase tracking-widest">
                      <span className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-emerald-400 animate-ping' : isNear ? 'bg-amber-400 animate-pulse' : 'bg-amber-400/55'}`}/>
                      Next Lesson
                    </span>
                    <span className={`flex items-center gap-1 text-[11px] font-medium ${isNear ? 'text-amber-300' : 'text-white/35'}`}>
                      <Clock size={12}/> {isReady ? 'Starting now' : `Starts in ${countdown}`}
                    </span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-serif text-white mb-2 leading-tight">
                    Advanced Calculus: Limits & Continuity
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-[12px] text-white/50">
                    <span className="flex items-center gap-1.5"><GraduationCap size={13} className="text-white/30"/>Dr. Nguyen Minh Anh</span>
                    <span className="flex items-center gap-1.5"><Video size={12} className="text-white/30"/>Video Call</span>
                    <span className="flex items-center gap-1.5"><CalendarDays size={12} className="text-white/30"/>Tomorrow, 19:00</span>
                  </div>
                </div>
              </div>

              <Link to="/schedule" className={`group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-250 shrink-0
                ${isNear||isReady
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-[0_0_28px_rgba(251,191,36,0.35)] hover:shadow-[0_0_40px_rgba(251,191,36,0.55)] hover:scale-[1.03]'
                  : 'bg-amber-400/10 border border-amber-400/28 text-amber-300 hover:bg-amber-400/18 hover:border-amber-400/45'
                }`}
              >
                <Video size={16}/> {isReady ? 'Join Now' : 'Enter Lesson'}
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
              </Link>
            </div>

            {/* Footer strip */}
            <div className="px-6 lg:px-9 py-3 border-t border-white/[0.04] bg-white/[0.01] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles size={11} className="text-indigo-400"/>
                <span className="text-[10px] text-white/35 uppercase tracking-widest font-bold">AI Tip:</span>
                <span className="text-[11px] text-white/50">Review Chapter 3 before this session.</span>
              </div>
              <button onClick={() => setReviewOpen(true)} className="flex items-center gap-1.5 text-[10px] text-white/25 hover:text-amber-300 transition-colors font-bold uppercase tracking-widest">
                <Star size={10}/> Rate Last Lesson
              </button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ══════════════ COLUMNS ══════════════ */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-7 items-start">

        {/* LEFT: AGENDA */}
        <motion.div variants={item} className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <CalendarDays size={15} className="text-indigo-400"/>
              </div>
              <h3 className="text-lg font-serif text-white">This Week's Agenda</h3>
            </div>
            <Link to="/schedule" className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white transition-colors font-bold uppercase tracking-widest">
              Calendar <ArrowUpRight size={11}/>
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {AGENDA.map(item => <AgendaCard key={item.id} item={item}/>)}
          </div>

          <Link to="/schedule" className="group flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-white/[0.07] text-[10px] text-white/25 hover:text-white/50 hover:border-white/15 transition-all duration-200 font-bold uppercase tracking-widest">
            <CalendarDays size={13}/> View all sessions <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5"/>
          </Link>

          {/* ── Upcoming Tasks ── */}
          <UpcomingTasksCard />

          {/* ── Tutor Quick Connect ── */}
          <TutorConnectCard />

        </motion.div>

        {/* RIGHT: STUDY PLAN + EXTRAS */}
        <motion.div variants={item} className="flex flex-col gap-5 lg:sticky lg:top-[100px]">

          {/* Plan card */}
          <div
            className="rounded-[24px] border border-white/[0.08] overflow-hidden"
            style={{ background:'linear-gradient(160deg,rgba(14,16,32,0.98),rgba(8,10,22,0.95))' }}
          >
            <div className="px-5 pt-5 pb-3.5 border-b border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.9)]"/>
                <span className="text-[9px] text-white/45 uppercase tracking-[0.2em] font-bold">Active Study Plan</span>
              </div>
              <Link to="/study-plan" className="text-[9px] text-white/25 hover:text-white/60 transition-colors uppercase tracking-widest font-bold flex items-center gap-0.5">
                Details <ArrowUpRight size={10}/>
              </Link>
            </div>
            <div className="p-5">
              <h4 className="text-lg font-serif text-white mb-0.5">{PLAN_TITLE}</h4>
              <p className="text-[11px] text-white/35 mb-4 flex items-center gap-1"><GraduationCap size={11}/>Created by {PLAN_TUTOR}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-white/35 font-bold">Progress</span>
                  <span className="text-xl font-bold text-white">{PROGRESS_PCT}<span className="text-xs text-white/35">%</span></span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.05]">
                  <motion.div
                    initial={{ width:0 }} animate={{ width:`${PROGRESS_PCT}%` }}
                    transition={{ duration:1.2, ease:[0.22,1,0.36,1], delay:0.2 }}
                    className="h-full rounded-full"
                    style={{ background:'linear-gradient(90deg,#34d399,#10b981)', boxShadow:'0 0 10px rgba(52,211,153,0.35)' }}
                  />
                </div>
                <p className="text-[10px] text-white/30 mt-1.5">{DONE_COUNT} of {TOTAL_COUNT} topics completed</p>
              </div>

              {/* Topics */}
              <div className="space-y-2">
                {STUDY_TOPICS.map(t => (
                  <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors
                    ${t.status==='active'  ? 'bg-indigo-500/[0.07] border-indigo-500/22' :
                      t.status==='done'   ? 'bg-white/[0.012] border-white/[0.04] opacity-55' :
                                            'border-transparent opacity-25'}`}
                  >
                    {t.status==='done'   ? <CheckCircle size={14} className="text-emerald-400 shrink-0"/>
                    :t.status==='active' ? <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-400 bg-indigo-400/20 shrink-0 animate-pulse"/>
                    :                      <Circle size={14} className="text-white/15 shrink-0"/>}
                    <p className={`text-[12px] leading-snug flex-1 min-w-0
                      ${t.status==='done'?'text-white/35 line-through':t.status==='active'?'text-white font-medium':'text-white/20'}`}>
                      {t.title}
                    </p>
                    {t.status==='active' && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest bg-indigo-500/18 text-indigo-300 border border-indigo-500/25">Focus</span>
                    )}
                  </div>
                ))}
              </div>

              <Link to="/study-plan" className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-400/18 bg-emerald-500/[0.04] text-emerald-300 text-[11px] font-bold uppercase tracking-widest hover:bg-emerald-500/[0.09] transition-all duration-200 group">
                Continue Learning <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5"/>
              </Link>
            </div>
          </div>

          {/* Streak */}
          <div className="rounded-[20px] border border-white/[0.06] bg-white/[0.018] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/18 flex items-center justify-center shrink-0">
              <Flame size={18} className="text-orange-400"/>
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-white font-semibold">4-Day Study Streak 🔥</p>
              <p className="text-[10px] text-white/35 mt-0.5">Keep going — you're pacing beautifully.</p>
            </div>
            <span className="text-2xl font-serif text-orange-400 shrink-0">4</span>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:'Schedule', icon:CalendarDays, to:'/schedule',  color:'text-blue-400'  },
              { label:'Study Plan', icon:BookOpen,  to:'/study-plan', color:'text-violet-400' },
            ].map(l => {
              const Icon = l.icon;
              return (
                <Link key={l.label} to={l.to} className="group flex flex-col items-start gap-2.5 p-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.018] hover:bg-white/[0.05] hover:border-white/[0.13] transition-all duration-200">
                  <Icon size={15} className={l.color}/>
                  <span className="text-[11px] font-semibold text-white/55 group-hover:text-white transition-colors">{l.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* ══════════════ INSIGHTS ══════════════ */}
      <InsightsSection/>

      {/* ══════════════ REVIEW MODAL ══════════════ */}
      <AnimatePresence>
        {reviewOpen && (
          <motion.div
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
            onClick={() => setReviewOpen(false)}
          >
            <motion.div
              initial={{scale:0.95,y:22}} animate={{scale:1,y:0}} exit={{scale:0.95,y:16}}
              transition={{duration:0.35,ease}}
              className="relative w-full max-w-md rounded-[26px] border border-white/10 bg-[#070a14] p-8 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {reviewSubmitted ? (
                <div className="flex flex-col items-center py-4">
                  <motion.div
                    initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',bounce:0.5}}
                    className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/28 flex items-center justify-center mb-4"
                  >
                    <CheckCircle size={28} className="text-emerald-400"/>
                  </motion.div>
                  <h4 className="text-xl font-serif text-white mb-2">Thank you!</h4>
                  <p className="text-white/45 text-sm text-center">Your feedback helps improve the experience.</p>
                </div>
              ) : (
                <>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 mb-3 font-bold">Rate Last Lesson</p>
                  <h4 className="text-xl font-serif text-white mb-1">Calculus: Derivatives</h4>
                  <p className="text-sm text-white/40 mb-6">with Dr. Nguyen Minh Anh · Oct 21</p>
                  <div className="flex items-center justify-center gap-3 mb-7">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onMouseEnter={()=>setStarHover(s)} onMouseLeave={()=>setStarHover(0)} onClick={()=>setStarRating(s)} className="transition-transform hover:scale-125">
                        <Star size={30} className={`transition-colors ${s<=(starHover||starRating)?'text-amber-400 fill-amber-400':'text-white/15'}`}/>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={()=>setReviewOpen(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-white/45 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">Skip</button>
                    <button onClick={handleReviewSubmit} disabled={!starRating} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all
                      ${starRating?'bg-gradient-to-r from-amber-400 to-orange-400 text-black hover:shadow-[0_0_18px_rgba(251,191,36,0.38)]':'bg-white/5 text-white/20 cursor-not-allowed'}`}>
                      Submit Review
                    </button>
                  </div>
                  <button onClick={()=>setReviewOpen(false)} className="absolute top-5 right-5 text-white/22 hover:text-white transition-colors text-sm">✕</button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
