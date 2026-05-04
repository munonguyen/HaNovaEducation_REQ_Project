import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Search,
  Users,
  Sparkles,
  AlertTriangle,
  FileText,
  X,
  CheckCircle2,
  Settings2,
  BookOpen,
  ExternalLink,
  Video,
  Link2,
} from 'lucide-react';

/* ═══════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════ */
const myTutors = [
  { 
    id: '1', 
    name: 'Dr. Jane Smith', 
    subject: 'Advanced Physics', 
    status: 'Active', 
    nextSession: 'Oct 15, 08:00 AM', 
    avatar: 'https://i.pravatar.cc/150?u=jane', 
    color: 'emerald',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  { 
    id: '2', 
    name: 'Emma Farooq', 
    subject: 'Linguistics', 
    status: 'Active', 
    nextSession: 'Oct 16, 02:00 PM', 
    avatar: 'https://i.pravatar.cc/150?u=emma', 
    color: 'blue',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  { 
    id: '3', 
    name: 'Prof. David Chen', 
    subject: 'Computer Science', 
    status: 'Completed', 
    nextSession: 'No upcoming sessions', 
    avatar: 'https://i.pravatar.cc/150?u=david', 
    color: 'purple',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  }
];

type SessionDelivery = 'In-person' | 'Online';

interface Session {
  id: string;
  tutorId: string;
  title: string;
  type: string;
  durationMinutes: number;
  dayIndex: number;
  startHour: number;
  status: 'Confirmed' | 'Rescheduled' | 'Cancelled';
  note: string;
  isUpdated: boolean;
  location: string;
  room: string;
  materials: string;
  delivery: SessionDelivery;
  meetingPlatform?: string;
  meetingLink?: string;
  meetingCode?: string;
  meetingPasscode?: string;
}

const mySessions: Session[] = [
  { id: 's1', tutorId: '1', title: 'Quantum Mechanics Review', type: 'Session', durationMinutes: 60, dayIndex: 0, startHour: 8, status: 'Confirmed', note: 'Review Chapter 3 before class.', isUpdated: false, location: 'Academic Plaza', room: 'A1-204', materials: 'Formula Sheet v2, Lab Goggles', delivery: 'In-person' },
  { id: 's2', tutorId: '2', title: 'Syntax Analysis', type: 'Monthly', durationMinutes: 90, dayIndex: 2, startHour: 14, status: 'Rescheduled', note: 'Use the shared sentence bank before joining the live parse walkthrough.', isUpdated: true, location: 'Virtual classroom', room: 'Meet Room Syntax-Lab', materials: 'IPA Chart, Syntax Workbook', delivery: 'Online', meetingPlatform: 'Google Meet', meetingLink: 'https://meet.google.com/lookup/hanova-syntax-lab', meetingCode: 'Syntax-Lab', meetingPasscode: 'HANOVA26' },
  { id: 's3', tutorId: '1', title: 'Thermodynamics Lab', type: 'Course', durationMinutes: 120, dayIndex: 4, startHour: 10, status: 'Cancelled', note: '', isUpdated: false, location: 'Science Wing', room: 'Lab 4', materials: 'None', delivery: 'In-person' },
  { id: 's4', tutorId: '2', title: 'Phonetics Practice', type: 'Monthly', durationMinutes: 60, dayIndex: 3, startHour: 15, status: 'Confirmed', note: 'Read the handout on IPA', isUpdated: false, location: 'Digital Studio', room: 'Studio B', materials: 'Microphone, Handout 3', delivery: 'In-person' },
  { id: 's5', tutorId: '3', title: 'Data Structures Intro', type: 'Course', durationMinutes: 120, dayIndex: 0, startHour: 13, status: 'Confirmed', note: 'Setup dev environment', isUpdated: false, location: 'Tech Tower', room: 'Lounge 1', materials: 'VS Code, Git installed', delivery: 'In-person' },
  { id: 's6', tutorId: '1', title: 'Relativity Seminar', type: 'Session', durationMinutes: 60, dayIndex: 1, startHour: 9, status: 'Confirmed', note: 'Bring notes on Einstein', isUpdated: false, location: 'Academic Plaza', room: 'A1-405', materials: 'Field Journal', delivery: 'In-person' },
  { id: 's7', tutorId: '2', title: 'Morphology Deep Dive', type: 'Monthly', durationMinutes: 90, dayIndex: 1, startHour: 16, status: 'Confirmed', note: '', isUpdated: false, location: 'Language Hub', room: 'B3-105', materials: 'Textbook', delivery: 'In-person' },
  { id: 's8', tutorId: '3', title: 'Algorithm Complexity', type: 'Course', durationMinutes: 90, dayIndex: 3, startHour: 11, status: 'Confirmed', note: 'Review Big O notation', isUpdated: true, location: 'Tech Tower', room: 'Room 202', materials: 'Graph Paper', delivery: 'In-person' },
  { id: 's9', tutorId: '1', title: 'Electromagnetism', type: 'Session', durationMinutes: 60, dayIndex: 5, startHour: 10, status: 'Rescheduled', note: '', isUpdated: true, location: 'Science Wing', room: 'Hall 1', materials: 'Calculator', delivery: 'In-person' },
  { id: 's10', tutorId: '2', title: 'Semantics Tutorial', type: 'Session', durationMinutes: 60, dayIndex: 6, startHour: 14, status: 'Confirmed', note: 'Keep your camera on for the small-group breakout analysis.', isUpdated: false, location: 'Virtual classroom', room: 'Zoom Room 882-192', materials: 'Internet connection', delivery: 'Online', meetingPlatform: 'Zoom', meetingLink: 'https://us06web.zoom.us/j/8821923321?pwd=hanovaSemantics', meetingCode: '882-192', meetingPasscode: 'Syntax24' },
  { id: 's11', tutorId: '1', title: 'Advanced Quantum Physics', type: 'Course', durationMinutes: 120, dayIndex: 2, startHour: 19, status: 'Confirmed', note: 'Prepare for late night lab discussion', isUpdated: true, location: 'Virtual classroom', room: 'Teams Room Quantum-Night', materials: 'Dark-room goggles', delivery: 'Online', meetingPlatform: 'Microsoft Teams', meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3Ahanova-quantum-night%40thread.v2/0?context=%7B%22Tid%22%3A%22hanova-academy%22%2C%22Oid%22%3A%22physics-night%22%7D', meetingCode: 'Quantum-Night', meetingPasscode: 'Photon88' },
  { id: 's12', tutorId: '3', title: 'AI Ethics', type: 'Session', durationMinutes: 90, dayIndex: 4, startHour: 20, status: 'Confirmed', note: 'Reading assignment on AI safety', isUpdated: false, location: 'Innovation Lab', room: 'Glass Hub', materials: 'iPad/Laptop', delivery: 'In-person' }
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const startH = 7;
const endH = 22;
type ScheduleTab = 'All' | 'Active' | 'Completed';
type Tutor = (typeof myTutors)[number];
type SessionWithTutor = Session & { tutor: Tutor };
const scheduleTabs: ScheduleTab[] = ['All', 'Active', 'Completed'];

function formatTimeSlot(hourValue: number) {
  const hour = Math.floor(hourValue);
  const minute = Math.round((hourValue - hour) * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function formatSessionRange(session: Session) {
  return `${formatTimeSlot(session.startHour)} – ${formatTimeSlot(session.startHour + session.durationMinutes / 60)}`;
}

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */
export default function Schedule() {
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ScheduleTab>('All');
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedModalSession, setSelectedModalSession] = useState<SessionWithTutor | null>(null);
  const [scheduleNotice, setScheduleNotice] = useState('');
  const [showCustomPanel, setShowCustomPanel] = useState(false);
  
  const pxPerHour = 90;

  const visibleDays = useMemo(() => {
    return daysOfWeek.map((d, i) => ({ name: d, index: i }));
  }, []);

  // Filter Tutors
  const filteredTutors = useMemo(() => {
    let lst = myTutors;
    if (activeTab !== 'All') {
      lst = lst.filter(t => t.status === activeTab);
    }
    if (searchQuery) {
      lst = lst.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return lst;
  }, [searchQuery, activeTab]);

  // Filter Sessions
  const displaySessions = useMemo(() => {
    if (selectedTutor) {
      return mySessions.filter(s => s.tutorId === selectedTutor);
    }
    return mySessions;
  }, [selectedTutor]);

  const onlineSessions = useMemo(() => {
    return displaySessions
      .filter((session) => session.delivery === 'Online' && session.status !== 'Cancelled' && session.meetingLink)
      .map((session) => {
        const tutor = myTutors.find((item) => item.id === session.tutorId);
        return tutor ? { ...session, tutor } : null;
      })
      .filter((session): session is SessionWithTutor => Boolean(session))
      .sort((left, right) => left.dayIndex - right.dayIndex || left.startHour - right.startHour);
  }, [displaySessions]);

  // Insights
  const upcomingCount = displaySessions.filter(s => s.status !== 'Cancelled').length;
  const hasConflict = false;
  const nextOnlineSession = onlineSessions[0] ?? null;
  
  const handleSlotClick = (session: SessionWithTutor) => {
    setSelectedModalSession(session);
  };

  const handleSessionAction = (action: 'cancel' | 'reschedule', session: SessionWithTutor) => {
    setScheduleNotice(
      action === 'cancel'
        ? `${session.title}: cancellation request opened with the 12-hour refund policy applied.`
        : `${session.title}: reschedule flow opened with tutor availability and conflict checks.`,
    );
    setSelectedModalSession(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 pt-[90px] pb-12 px-4 lg:px-10 text-white font-sans flex flex-col z-10"
    >
      <AnimatePresence>
        {scheduleNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mb-4 w-full max-w-[1800px] rounded-2xl border border-cyan-200/18 bg-cyan-200/[0.08] px-5 py-3 text-sm font-medium text-cyan-50"
          >
            {scheduleNotice}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ══ COMPACT HEADER ══ */}
      <div className="mb-4 shrink-0 flex items-end justify-between gap-6 max-w-[1800px] w-full mx-auto">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-1">Your Schedule</h1>
          <p className="text-white/40 text-sm max-w-xl">
            Manage sessions, view tutor notes, and maintain your academic momentum.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
            <Sparkles size={13} className="text-blue-400" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">AI Tip: </span>
            <span className="text-[11px] text-white/70">Best focus 08:00-11:00</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
            {hasConflict ? (
              <>
                <AlertTriangle size={13} className="text-amber-400" />
                <span className="text-[11px] text-amber-400 font-medium">Conflict</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-medium">Conflict-free</span>
              </>
            )}
          </div>
          <div className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="text-[11px] text-white/70"><strong className="text-white">{upcomingCount}</strong> sessions</span>
          </div>
        </div>
      </div>

      {/* ══ MAIN LAYOUT ══ */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-[280px_1fr] gap-6 max-w-[1800px] w-full mx-auto">
        
        {/* ═══ LEFT PANEL: TUTOR LIST ═══ */}
        <div className="flex flex-col min-h-0 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] shadow-2xl glass-panel overflow-hidden">
          
          <div className="p-5 pb-0 shrink-0">
            <div className="relative mb-4">
               <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
               <input 
                 type="text"
                 placeholder="Search tutors or subjects..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/[0.04] border border-white/5 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
               />
            </div>

            <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-full mb-4">
               {scheduleTabs.map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 z-10 ${
                      activeTab === tab ? 'text-black glass-button-primary shadow-lg' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    {tab}
                  </button>
               ))}
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-5 pb-5 space-y-2.5">
             <button 
               onClick={() => setSelectedTutor(null)}
               className={`w-full text-left p-3.5 rounded-[16px] border transition-all duration-300 flex items-center justify-between ${
                 selectedTutor === null 
                   ? 'border-white/25 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                   : 'border-transparent hover:bg-white/[0.02]'
               }`}
             >
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                      <Users size={16} className="text-white/60" />
                   </div>
                   <span className="font-medium text-sm">All Mentors</span>
                </div>
             </button>

             {filteredTutors.map(tutor => {
                const isSelected = selectedTutor === tutor.id;
                return (
                  <button
                    key={tutor.id}
                    onClick={() => setSelectedTutor(tutor.id)}
                    className={`w-full text-left p-4 rounded-[20px] border transition-all duration-300 overflow-hidden relative group ${
                      isSelected 
                        ? `border-white/25 bg-white/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.4)]` 
                        : 'border-white/5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/10'
                    }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${isSelected ? `bg-${tutor.color}-400` : `bg-${tutor.color}-500/20 group-hover:bg-${tutor.color}-500/40`}`} />
                    
                    <div className="flex items-start gap-3.5 pl-2">
                       <img src={tutor.avatar} alt={tutor.name} className={`w-11 h-11 rounded-full object-cover border border-${tutor.color}-500/30 shrink-0`} />
                       <div className="flex-1 min-w-0 text-left">
                          <div className="flex justify-between items-start mb-0.5">
                             <h4 className="font-serif text-base truncate text-white">{tutor.name}</h4>
                             <div className={`ml-2 px-2 py-0.5 rounded border text-[8px] uppercase font-bold tracking-wider shrink-0 ${tutor.badge}`}>
                                {tutor.status}
                             </div>
                          </div>
                          <p className="text-[10px] text-white/50 uppercase tracking-widest truncate">{tutor.subject}</p>
                          <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-white/40">
                             <Clock size={11} />
                             <span className="text-white/70 font-medium">{tutor.nextSession}</span>
                          </div>
                       </div>
                    </div>
                  </button>
                );
             })}
          </div>
        </div>

        {/* ═══ RIGHT PANEL ═══ */}
        <div className="flex flex-col min-h-0">
          <div className="mb-4 grid shrink-0 gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            {/* ONLINE CLASSROOM CARD */}
            <div className="rounded-[24px] border border-cyan-400/15 bg-[#0a0d16]/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100/75">
                    <Video size={12} /> ONLINE CLASSROOM
                  </div>
                  <h3 className="mt-3 text-xl font-serif text-white">Remote lessons with instant join links</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-white/40">
                    Jump into your next virtual room without opening chat history or notification threads.
                  </p>
                </div>
                <div className="rounded-[18px] border border-white/10 bg-white/[0.02] px-4 py-3 md:min-w-[110px] text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/20">AVAILABLE ROOMS</p>
                  <p className="mt-2 text-2xl font-serif text-white">{onlineSessions.length || 0}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-1 custom-scrollbar">
                {onlineSessions.map((session) => (
                  <div key={session.id} className="min-w-[240px] flex-1 rounded-[20px] border border-white/10 bg-white/[0.02] p-4 shadow-xl">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-100">
                        <Video size={11} /> {session.meetingPlatform}
                      </span>
                      <span className={`rounded-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.16em] ${session.status === 'Rescheduled' ? 'border-amber-400/25 bg-amber-400/10 text-amber-300' : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'}`}>
                        {session.status}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg text-white mb-0.5">{session.title}</h4>
                    <p className="text-xs text-white/40 mb-3">{session.tutor.name}</p>
                    <div className="space-y-2 text-[11px] text-white/50 mb-4">
                       <div className="flex items-center gap-2">
                         <Clock size={12} className="text-cyan-400" />
                         <span>{daysOfWeek[session.dayIndex]} · {formatTimeSlot(session.startHour)} - {formatTimeSlot(session.startHour + session.durationMinutes/60)}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <Link2 size={12} className="text-cyan-400" />
                         <span>{session.room}</span>
                       </div>
                    </div>
                    <div className="flex gap-2">
                      <a href={session.meetingLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-white/90">
                        Join room <ExternalLink size={12} />
                      </a>
                      <button onClick={() => setSelectedModalSession(session)} className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/70 hover:text-white">Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEXT ONLINE ROOM CARD */}
            <div className="rounded-[24px] border border-violet-400/15 bg-[#120a1c]/80 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-300/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-100/75">
                  <Sparkles size={12} /> NEXT ONLINE ROOM
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/20 font-bold">READY TO JOIN</div>
              </div>

              {nextOnlineSession ? (
                <>
                  <h3 className="text-xl font-serif text-white">{nextOnlineSession.title}</h3>
                  <p className="mt-1 text-sm text-white/40">
                    {nextOnlineSession.tutor.name} · Wed · 14:00 – 15:30
                  </p>
                  <div className="mt-4 rounded-[18px] bg-black/40 border border-white/5 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/20 mb-3">MEETING ACCESS</p>
                    <div className="space-y-2 text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <Video size={14} className="text-violet-400" />
                        <span>{nextOnlineSession.meetingPlatform}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link2 size={14} className="text-violet-400" />
                        <span>{nextOnlineSession.room}</span>
                      </div>
                      <p className="text-xs text-white/30 pt-1">Passcode: {nextOnlineSession.meetingPasscode}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a href={nextOnlineSession.meetingLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-full bg-violet-200 px-4 py-3 text-xs font-bold text-black transition hover:bg-violet-100">
                      Open meeting <ExternalLink size={14} />
                    </a>
                    <button onClick={() => setSelectedModalSession(nextOnlineSession)} className="flex-1 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-white/70 hover:text-white">
                      Review materials <BookOpen size={14} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="h-40 flex items-center justify-center text-white/20 text-sm border border-dashed border-white/5 rounded-2xl">No upcoming online room.</div>
              )}
            </div>
          </div>
          
          {/* CALENDAR / OVERVIEW CONTAINER */}
          <div className="rounded-[24px] border border-white/10 bg-white/[0.01] overflow-hidden shadow-2xl glass-panel flex-1 flex flex-col min-h-0">
             
             <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/10 shrink-0">
                <div>
                   <h3 className="text-lg font-serif tracking-wide">{viewMode === 'week' ? 'Oct 12 – Oct 18, 2026' : 'Course Overview'}</h3>
                   <p className="text-[10px] text-white/20 uppercase tracking-widest mt-0.5">GMT+7 Timezone</p>
                </div>
                <div className="flex items-center gap-3">
                   {viewMode === 'week' && (
                     <button
                       onClick={() => setShowCustomPanel(!showCustomPanel)}
                       className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all text-[10px] uppercase font-bold tracking-widest ${showCustomPanel ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' : 'border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/[0.05]'}`}
                     >
                       <Settings2 size={12} /> CUSTOMIZE
                     </button>
                   )}
                   <div className="flex bg-white/[0.04] p-1 rounded-full border border-white/5">
                      <button onClick={() => setViewMode('week')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'week' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}>WEEK</button>
                      <button onClick={() => setViewMode('month')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'month' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}>MONTH</button>
                   </div>
                </div>
             </div>

             <div className="flex-1 min-h-0 overflow-auto custom-scrollbar relative bg-black/10">
               {viewMode === 'month' ? (
                 <div className="p-6 grid md:grid-cols-2 gap-6">
                    {myTutors.filter(t => t.status !== 'Completed').map(tutor => (
                      <div key={tutor.id} className="rounded-[28px] border border-white/5 bg-[#0a0c14] p-8 hover:border-white/10 transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full -translate-y-12 translate-x-12" />
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h4 className={`text-2xl font-serif ${tutor.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'} mb-1`}>{tutor.subject}</h4>
                            <p className="text-sm text-white/40">Instructor: {tutor.name}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center"><Users size={18} className="text-white/30" /></div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-3">SYLLABUS</h5>
                            <div className="text-sm text-white/50 leading-relaxed text-left">
                               {tutor.id === '1' ? 'Quantum Theory basics over 8 weeks. Comprehensive lab test + weekly assignments.' : 'Morphology & Syntax. Weekly quizzes, final term paper, conversational practice.'}
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2">
                               <span>PROGRESS</span>
                               <span className="text-white/60">{tutor.id === '1' ? '40%' : '75%'}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: tutor.id === '1' ? '40%' : '75%' }} transition={{ duration: 1.5 }} className={`h-full ${tutor.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]'}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="flex w-full" style={{ minHeight: `${(endH - startH + 1) * pxPerHour + 40}px` }}>
                   <div className="w-16 shrink-0 border-r border-white/5 bg-black/40 relative z-10">
                    {Array.from({ length: endH - startH + 1 }).map((_, i) => {
                       const hour = startH + i;
                       return (
                         <div key={hour} className="absolute w-full border-b border-white/[0.02]" style={{ top: i * pxPerHour + 40, height: pxPerHour }}>
                            <span className="absolute top-2 right-2.5 text-[10px] text-white/20 font-mono">
                               {hour.toString().padStart(2, '0')}:00
                            </span>
                         </div>
                       )
                    })}
                   </div>

                   <div className="flex-1 flex relative">
                    <div className="absolute inset-0 pointer-events-none">
                       {Array.from({ length: endH - startH + 1 }).map((_, i) => (
                         <div key={i} className="absolute w-full border-b border-white/[0.02]" style={{ top: i * pxPerHour + 40, height: pxPerHour }} />
                       ))}
                    </div>

                    {visibleDays.map(day => (
                      <div key={day.name} className="flex-1 relative border-r border-white/5 group hover:bg-white/[0.01]">
                         <div className="sticky top-0 z-20 h-10 border-b border-white/5 bg-[#0a0d16]/90 backdrop-blur-md flex items-center justify-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{day.name}</span>
                         </div>
                         {displaySessions.filter(s => s.dayIndex === day.index).map(session => {
                            const tutor = myTutors.find(t => t.id === session.tutorId);
                            if (!tutor) return null;
                            const tOffset = (session.startHour - startH) * pxPerHour;
                            const tHeight = (session.durationMinutes / 60) * pxPerHour;
                            return (
                              <button key={session.id} onClick={() => handleSlotClick({ ...session, tutor })} className={`absolute inset-x-1 rounded-xl px-3 py-2 border transition-all text-left overflow-hidden group/card shadow-xl ${session.status === 'Cancelled' ? 'bg-red-500/5 border-red-500/20 opacity-60' : `bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent)] border-${tutor.color}-400/20 hover:border-${tutor.color}-400/50`}`} style={{ top: tOffset + 42, height: tHeight - 4, zIndex: 50 }}>
                                 <div className={`absolute left-0 top-0 bottom-0 w-1 ${session.status === 'Cancelled' ? 'bg-red-500' : `bg-${tutor.color}-400`}`} />
                                 <h5 className="font-serif text-[11px] text-white truncate mb-0.5">{session.title}</h5>
                                 <p className="text-[9px] text-white/40 uppercase tracking-widest truncate">{tutor.name}</p>
                              </button>
                            )
                         })}
                      </div>
                    ))}
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* SESSION DETAIL MODAL */}
      <AnimatePresence>
        {selectedModalSession && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
             <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-lg bg-[#0a0d16] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden p-8">
                <button onClick={() => setSelectedModalSession(null)} className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white/40 hover:text-white"><X size={16} /></button>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6"><Clock size={20} className="text-blue-400" /></div>
                <h3 className="text-2xl font-serif text-white mb-2">{selectedModalSession.title}</h3>
                <p className="text-white/40 mb-8 font-medium text-left">With {selectedModalSession.tutor.name} · {selectedModalSession.type}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 block mb-2">TIME & DATE</span>
                    <p className="text-sm text-white/90">{daysOfWeek[selectedModalSession.dayIndex]}, {formatSessionRange(selectedModalSession)}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border text-left ${selectedModalSession.delivery === 'Online' ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-indigo-500/5 border-indigo-500/20'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 block mb-2">{selectedModalSession.delivery === 'Online' ? 'PLATFORM' : 'ROOM'}</span>
                    <p className="text-sm text-white/90">{selectedModalSession.delivery === 'Online' ? selectedModalSession.meetingPlatform : selectedModalSession.room}</p>
                  </div>
                </div>

                {selectedModalSession.note && (
                  <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 mb-6 text-left">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-amber-500/50 mb-2 flex items-center gap-2"><FileText size={13} /> PREP NOTE</h5>
                    <p className="text-sm text-white/60 leading-relaxed italic">"{selectedModalSession.note}"</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4 border-t border-white/5">
                   <button onClick={() => handleSessionAction('cancel', selectedModalSession)} className="flex-1 py-4 rounded-full border border-white/10 text-white/40 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5">CANCEL</button>
                   <button onClick={() => handleSessionAction('reschedule', selectedModalSession)} className="flex-1 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white/90">RESCHEDULE</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
