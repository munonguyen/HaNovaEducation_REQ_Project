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
  ExternalLink,
  Video,
  ChevronDown,
  MapPin,
  CalendarOff,
  Send,
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
  address?: string;
  materials: string;
  delivery: SessionDelivery;
  meetingPlatform?: string;
  meetingLink?: string;
  meetingCode?: string;
  meetingPasscode?: string;
}

function googleMapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const mySessions: Session[] = [
  { id: 's1', tutorId: '1', title: 'Quantum Mechanics Review', type: 'Session', durationMinutes: 60, dayIndex: 0, startHour: 8, status: 'Confirmed', note: 'Review Chapter 3 before class.', isUpdated: false, location: 'Academic Plaza', room: 'A1-204', address: '144 Xuân Thủy, Cầu Giấy, Hà Nội', materials: 'Formula Sheet v2, Lab Goggles', delivery: 'In-person' },
  { id: 's2', tutorId: '2', title: 'Syntax Analysis', type: 'Monthly', durationMinutes: 90, dayIndex: 2, startHour: 14, status: 'Rescheduled', note: 'Use the shared sentence bank before joining the live parse walkthrough.', isUpdated: true, location: 'Virtual classroom', room: 'Meet Room Syntax-Lab', materials: 'IPA Chart, Syntax Workbook', delivery: 'Online', meetingPlatform: 'Google Meet', meetingLink: 'https://meet.google.com/lookup/hanova-syntax-lab', meetingCode: 'Syntax-Lab', meetingPasscode: 'HANOVA26' },
  { id: 's3', tutorId: '1', title: 'Thermodynamics Lab', type: 'Course', durationMinutes: 120, dayIndex: 4, startHour: 10, status: 'Cancelled', note: '', isUpdated: false, location: 'Science Wing', room: 'Lab 4', address: '1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội', materials: 'None', delivery: 'In-person' },
  { id: 's4', tutorId: '2', title: 'Phonetics Practice', type: 'Monthly', durationMinutes: 60, dayIndex: 3, startHour: 15, status: 'Confirmed', note: 'Read the handout on IPA', isUpdated: false, location: 'Digital Studio', room: 'Studio B', address: '336 Nguyễn Trãi, Thanh Xuân, Hà Nội', materials: 'Microphone, Handout 3', delivery: 'In-person' },
  { id: 's5', tutorId: '3', title: 'Data Structures Intro', type: 'Course', durationMinutes: 120, dayIndex: 0, startHour: 13, status: 'Confirmed', note: 'Setup dev environment', isUpdated: false, location: 'Tech Tower', room: 'Lounge 1', address: '17 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội', materials: 'VS Code, Git installed', delivery: 'In-person' },
  { id: 's6', tutorId: '1', title: 'Relativity Seminar', type: 'Session', durationMinutes: 60, dayIndex: 1, startHour: 9, status: 'Confirmed', note: 'Bring notes on Einstein', isUpdated: false, location: 'Academic Plaza', room: 'A1-405', address: '144 Xuân Thủy, Cầu Giấy, Hà Nội', materials: 'Field Journal', delivery: 'In-person' },
  { id: 's7', tutorId: '2', title: 'Morphology Deep Dive', type: 'Monthly', durationMinutes: 90, dayIndex: 1, startHour: 16, status: 'Confirmed', note: '', isUpdated: false, location: 'Language Hub', room: 'B3-105', address: '182 Lương Thế Vinh, Nam Từ Liêm, Hà Nội', materials: 'Textbook', delivery: 'In-person' },
  { id: 's8', tutorId: '3', title: 'Algorithm Complexity', type: 'Course', durationMinutes: 90, dayIndex: 3, startHour: 11, status: 'Confirmed', note: 'Review Big O notation', isUpdated: true, location: 'Tech Tower', room: 'Room 202', address: '17 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội', materials: 'Graph Paper', delivery: 'In-person' },
  { id: 's9', tutorId: '1', title: 'Electromagnetism', type: 'Session', durationMinutes: 60, dayIndex: 5, startHour: 10, status: 'Rescheduled', note: '', isUpdated: true, location: 'Science Wing', room: 'Hall 1', address: '1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội', materials: 'Calculator', delivery: 'In-person' },
  { id: 's10', tutorId: '2', title: 'Semantics Tutorial', type: 'Session', durationMinutes: 60, dayIndex: 6, startHour: 14, status: 'Confirmed', note: 'Keep your camera on for the small-group breakout analysis.', isUpdated: false, location: 'Virtual classroom', room: 'Zoom Room 882-192', materials: 'Internet connection', delivery: 'Online', meetingPlatform: 'Zoom', meetingLink: 'https://us06web.zoom.us/j/8821923321?pwd=hanovaSemantics', meetingCode: '882-192', meetingPasscode: 'Syntax24' },
  { id: 's11', tutorId: '1', title: 'Advanced Quantum Physics', type: 'Course', durationMinutes: 120, dayIndex: 2, startHour: 19, status: 'Confirmed', note: 'Prepare for late night lab discussion', isUpdated: true, location: 'Virtual classroom', room: 'Teams Room Quantum-Night', materials: 'Dark-room goggles', delivery: 'Online', meetingPlatform: 'Microsoft Teams', meetingLink: 'https://teams.microsoft.com/l/meetup-join/19%3Ahanova-quantum-night%40thread.v2/0?context=%7B%22Tid%22%3A%22hanova-academy%22%2C%22Oid%22%3A%22physics-night%22%7D', meetingCode: 'Quantum-Night', meetingPasscode: 'Photon88' },
  { id: 's12', tutorId: '3', title: 'AI Ethics', type: 'Session', durationMinutes: 90, dayIndex: 4, startHour: 20, status: 'Confirmed', note: 'Reading assignment on AI safety', isUpdated: false, location: 'Innovation Lab', room: 'Glass Hub', address: '268 Lý Thường Kiệt, Quận 10, TP.HCM', materials: 'iPad/Laptop', delivery: 'In-person' }
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
  const [showOnlinePanel, setShowOnlinePanel] = useState(false);
  
  // Leave request state
  const [leaveSession, setLeaveSession] = useState<SessionWithTutor | null>(null);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDetail, setLeaveDetail] = useState('');
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);
  
  const pxPerHour = 110;

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

  const handleLeaveRequest = (session: SessionWithTutor) => {
    setSelectedModalSession(null);
    setLeaveSession(session);
    setLeaveReason('');
    setLeaveDetail('');
    setLeaveSubmitted(false);
  };

  const submitLeaveRequest = () => {
    if (!leaveSession || !leaveReason) return;
    setLeaveSubmitted(true);
    setScheduleNotice(`Leave request submitted for "${leaveSession.title}" on ${daysOfWeek[leaveSession.dayIndex]}, ${formatSessionRange(leaveSession)}. Reason: ${leaveReason}. Your tutor will be notified.`);
  };

  const leaveReasons = [
    'Lý do sức khỏe / Health issue',
    'Lý do cá nhân / Personal matter',
    'Trùng lịch thi / Exam conflict',
    'Công việc đột xuất / Urgent work',
    'Gia đình có việc / Family emergency',
    'Khác / Other',
  ];

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

          {/* ── COMPACT ONLINE ROOMS STRIP ── */}
          <div className="mb-3 shrink-0">
            <button
              onClick={() => setShowOnlinePanel(!showOnlinePanel)}
              className="w-full flex items-center justify-between px-5 py-3 rounded-[18px] border border-cyan-400/15 bg-[#0a0d16]/80 backdrop-blur-md hover:bg-[#0a0d16] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/75">
                  <Video size={13} className="text-cyan-400" /> Online Rooms
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-bold text-cyan-300">{onlineSessions.length} available</span>
                {nextOnlineSession && (
                  <span className="hidden md:flex items-center gap-2 text-xs text-white/40">
                    <Sparkles size={11} className="text-violet-400" />
                    Next: <strong className="text-white/70">{nextOnlineSession.title}</strong> · {nextOnlineSession.tutor.name}
                  </span>
                )}
              </div>
              <ChevronDown size={16} className={`text-white/30 transition-transform duration-300 ${showOnlinePanel ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showOnlinePanel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 flex gap-3 overflow-x-auto pb-1 custom-scrollbar">
                    {onlineSessions.map((session) => (
                      <div key={session.id} className="min-w-[220px] flex-1 rounded-[16px] border border-white/10 bg-white/[0.02] p-3.5">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-cyan-100">
                            <Video size={9} /> {session.meetingPlatform}
                          </span>
                          <span className={`rounded-full border px-2 py-0.5 text-[7px] font-bold uppercase ${session.status === 'Rescheduled' ? 'border-amber-400/25 bg-amber-400/10 text-amber-300' : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300'}`}>
                            {session.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm text-white mb-0.5 truncate">{session.title}</h4>
                        <p className="text-[10px] text-white/35 mb-2">{session.tutor.name} · {daysOfWeek[session.dayIndex]} · {formatTimeSlot(session.startHour)}-{formatTimeSlot(session.startHour + session.durationMinutes/60)}</p>
                        <div className="flex gap-2">
                          <a href={session.meetingLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-black hover:bg-white/90">
                            Join <ExternalLink size={10} />
                          </a>
                          <button onClick={() => setSelectedModalSession(session)} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold text-white/60 hover:text-white">Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                 <div className="flex w-full" style={{ minHeight: `${(endH - startH + 1) * pxPerHour + 48}px` }}>
                   {/* Time Axis */}
                   <div className="w-[72px] shrink-0 border-r border-white/8 bg-black/30 relative z-10">
                    {Array.from({ length: endH - startH + 1 }).map((_, i) => {
                       const hour = startH + i;
                       return (
                         <div key={hour} className="absolute w-full border-b border-white/[0.04]" style={{ top: i * pxPerHour + 48, height: pxPerHour }}>
                            <span className="absolute top-2 right-3 text-[11px] text-white/35 font-mono font-medium">
                               {hour.toString().padStart(2, '0')}:00
                            </span>
                         </div>
                       )
                    })}
                   </div>

                   {/* Day Columns */}
                   <div className="flex-1 flex relative min-w-[600px]">
                    {/* Background grid lines */}
                    <div className="absolute inset-0 pointer-events-none">
                       {Array.from({ length: endH - startH + 1 }).map((_, i) => (
                         <div key={i} className="absolute w-full border-b border-white/[0.03]" style={{ top: i * pxPerHour + 48, height: pxPerHour }} />
                       ))}
                    </div>

                    {visibleDays.map(day => (
                      <div key={day.name} className="flex-1 relative border-r border-white/[0.06] group hover:bg-white/[0.015] transition-colors" style={{ minWidth: '85px' }}>
                         {/* Day Header */}
                         <div className="sticky top-0 z-20 h-12 border-b border-white/8 bg-[#0a0d16]/95 backdrop-blur-lg flex items-center justify-center">
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">{day.name}</span>
                         </div>
                         {/* Sessions */}
                         {displaySessions.filter(s => s.dayIndex === day.index).map(session => {
                            const tutor = myTutors.find(t => t.id === session.tutorId);
                            if (!tutor) return null;
                            const tOffset = (session.startHour - startH) * pxPerHour;
                            const tHeight = (session.durationMinutes / 60) * pxPerHour;
                            const isCancelled = session.status === 'Cancelled';
                            const isOnline = session.delivery === 'Online';
                            return (
                              <div
                                key={session.id}
                                className={`absolute inset-x-1.5 rounded-[14px] border transition-all text-left overflow-hidden flex flex-col ${
                                  isCancelled
                                    ? 'bg-red-500/[0.06] border-red-500/20 opacity-60'
                                    : `bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.01))] border-${tutor.color}-400/25 hover:border-${tutor.color}-400/60 shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-[1px]`
                                }`}
                                style={{ top: tOffset + 50, height: tHeight - 4, zIndex: 50 }}
                              >
                                {/* Color accent bar */}
                                <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[14px] ${isCancelled ? 'bg-red-500/60' : `bg-${tutor.color}-400`}`} />
                                
                                {/* Clickable main area */}
                                <button onClick={() => handleSlotClick({ ...session, tutor })} className="pl-3 pr-2 pt-2 flex-1 min-h-0 overflow-hidden cursor-pointer text-left">
                                  {/* Status + delivery badge row */}
                                  <div className="flex items-center gap-1 mb-1">
                                    {isCancelled && <span className="px-1.5 py-0.5 rounded bg-red-500/15 border border-red-500/25 text-[7px] font-bold uppercase text-red-400">Cancelled</span>}
                                    {session.status === 'Rescheduled' && <span className="px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-[7px] font-bold uppercase text-amber-300">RSC</span>}
                                    <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold uppercase ${isOnline ? 'bg-cyan-400/10 border border-cyan-400/20 text-cyan-300' : 'bg-indigo-400/10 border border-indigo-400/20 text-indigo-300'}`}>
                                      {isOnline ? 'Online' : 'Offline'}
                                    </span>
                                  </div>
                                  <h5 className="font-serif text-[12px] leading-tight text-white truncate">{session.title}</h5>
                                  <p className={`text-[10px] mt-0.5 truncate ${isCancelled ? 'text-red-400/50' : `text-${tutor.color}-300/70`} uppercase tracking-wider`}>{tutor.name}</p>
                                </button>

                                {/* Bottom: time + location link */}
                                <div className="pl-3 pr-2 pb-2 flex items-center justify-between gap-1 shrink-0">
                                  <span className={`text-[9px] font-mono ${isCancelled ? 'text-red-400/30' : 'text-white/35'}`}>
                                    {formatTimeSlot(session.startHour)}–{formatTimeSlot(session.startHour + session.durationMinutes / 60)}
                                  </span>
                                  {isOnline && session.meetingLink && !isCancelled ? (
                                    <a href={session.meetingLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-400/10 text-[8px] font-bold text-cyan-300 hover:bg-cyan-400/20 transition-colors truncate max-w-[70px]">
                                      <Video size={8} /> Join
                                    </a>
                                  ) : !isOnline && session.address && !isCancelled ? (
                                    <a href={googleMapsUrl(session.address)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-400/10 text-[8px] font-bold text-indigo-300 hover:bg-indigo-400/20 transition-colors truncate max-w-[70px]" title={session.address}>
                                      <MapPin size={8} /> Map
                                    </a>
                                  ) : null}
                                </div>
                              </div>
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
                
                {/* Delivery badge */}
                <div className="flex items-center gap-2 mb-4">
                  {selectedModalSession.delivery === 'Online' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-bold uppercase tracking-widest text-cyan-300"><Video size={12} /> Online Session</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/20 text-[10px] font-bold uppercase tracking-widest text-indigo-300"><MapPin size={12} /> In-person Session</span>
                  )}
                  {selectedModalSession.status === 'Cancelled' && <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold uppercase text-red-400">Cancelled</span>}
                  {selectedModalSession.status === 'Rescheduled' && <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-[10px] font-bold uppercase text-amber-300">Rescheduled</span>}
                </div>

                <h3 className="text-2xl font-serif text-white mb-2">{selectedModalSession.title}</h3>
                <p className="text-white/40 mb-6 font-medium text-left">With {selectedModalSession.tutor.name} · {selectedModalSession.type}</p>
                
                {/* Time & Date */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 block mb-2">TIME & DATE</span>
                  <p className="text-sm text-white/90">{daysOfWeek[selectedModalSession.dayIndex]}, {formatSessionRange(selectedModalSession)} · {selectedModalSession.durationMinutes} min</p>
                </div>

                {/* Online: meeting details */}
                {selectedModalSession.delivery === 'Online' ? (
                  <div className="p-5 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/15 mb-4 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/50 block mb-3">MEETING DETAILS</span>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-3 text-white/80">
                        <Video size={15} className="text-cyan-400 shrink-0" />
                        <span>{selectedModalSession.meetingPlatform}</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <span className="text-[10px] text-white/30 w-[50px] shrink-0 uppercase font-bold">Room</span>
                        <span className="font-mono text-cyan-200/80">{selectedModalSession.meetingCode || selectedModalSession.room}</span>
                      </div>
                      {selectedModalSession.meetingPasscode && (
                        <div className="flex items-center gap-3 text-white/80">
                          <span className="text-[10px] text-white/30 w-[50px] shrink-0 uppercase font-bold">Pass</span>
                          <span className="font-mono text-cyan-200/80">{selectedModalSession.meetingPasscode}</span>
                        </div>
                      )}
                    </div>
                    {selectedModalSession.meetingLink && (
                      <a href={selectedModalSession.meetingLink} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-cyan-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 transition-colors">
                        Join Online Room <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                ) : (
                  /* Offline: location details */
                  <div className="p-5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/15 mb-4 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/50 block mb-3">LOCATION</span>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-3 text-white/80">
                        <span className="text-[10px] text-white/30 w-[50px] shrink-0 uppercase font-bold">Place</span>
                        <span>{selectedModalSession.location} · {selectedModalSession.room}</span>
                      </div>
                      {selectedModalSession.address && (
                        <div className="flex items-start gap-3">
                          <span className="text-[10px] text-white/30 w-[50px] shrink-0 uppercase font-bold mt-0.5">Addr</span>
                          <span className="text-white/70">{selectedModalSession.address}</span>
                        </div>
                      )}
                    </div>
                    {selectedModalSession.address && (
                      <a href={googleMapsUrl(selectedModalSession.address)} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-indigo-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-indigo-300 transition-colors">
                        Open in Google Maps <MapPin size={14} />
                      </a>
                    )}
                  </div>
                )}

                {selectedModalSession.note && (
                  <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 mb-6 text-left">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-amber-500/50 mb-2 flex items-center gap-2"><FileText size={13} /> PREP NOTE</h5>
                    <p className="text-sm text-white/60 leading-relaxed italic">"{selectedModalSession.note}"</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-white/5">
                   <button onClick={() => handleSessionAction('cancel', selectedModalSession)} className="flex-1 py-3.5 rounded-full border border-white/10 text-white/40 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5">CANCEL</button>
                   <button onClick={() => handleLeaveRequest(selectedModalSession)} className="flex-1 py-3.5 rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-300 font-bold uppercase tracking-widest text-[10px] hover:bg-amber-400/20 flex items-center justify-center gap-2">
                     <CalendarOff size={12} /> LEAVE
                   </button>
                   <button onClick={() => handleSessionAction('reschedule', selectedModalSession)} className="flex-1 py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white/90">RESCHEDULE</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ LEAVE REQUEST MODAL ══ */}
      <AnimatePresence>
        {leaveSession && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-[#0a0d16] border border-white/10 rounded-[32px] shadow-2xl overflow-hidden p-8">
              <button onClick={() => setLeaveSession(null)} className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white/40 hover:text-white"><X size={16} /></button>

              {!leaveSubmitted ? (
                <>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                      <CalendarOff size={20} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-white">Xin nghỉ ca</h3>
                      <p className="text-xs text-white/40">Request Leave</p>
                    </div>
                  </div>

                  {/* Session info */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-5 text-left">
                    <h4 className="font-serif text-sm text-white mb-1">{leaveSession.title}</h4>
                    <p className="text-xs text-white/40">{leaveSession.tutor.name} · {daysOfWeek[leaveSession.dayIndex]} · {formatSessionRange(leaveSession)}</p>
                    <p className="text-xs text-white/30 mt-1">{leaveSession.delivery === 'Online' ? '📹 Online' : `📍 ${leaveSession.location}`}</p>
                  </div>

                  {/* Reason selection */}
                  <div className="mb-4 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-2">Lý do xin nghỉ *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {leaveReasons.map(reason => (
                        <button
                          key={reason}
                          type="button"
                          onClick={() => setLeaveReason(reason)}
                          className={`py-2.5 px-3 rounded-xl border text-[11px] font-medium text-left transition-all ${
                            leaveReason === reason
                              ? 'border-amber-400/40 bg-amber-400/10 text-amber-200'
                              : 'border-white/8 bg-white/[0.02] text-white/50 hover:border-white/15 hover:text-white/70'
                          }`}
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Detail text */}
                  <div className="mb-6 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-2">Chi tiết bổ sung (tuỳ chọn)</label>
                    <textarea
                      value={leaveDetail}
                      onChange={(e) => setLeaveDetail(e.target.value)}
                      placeholder="Mô tả thêm lý do nếu cần..."
                      rows={3}
                      className="w-full bg-white/[0.03] border border-white/8 rounded-2xl p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400/30 resize-none transition-colors"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={() => setLeaveSession(null)} className="flex-1 py-3.5 rounded-full border border-white/10 text-white/40 font-bold uppercase tracking-widest text-[10px] hover:bg-white/5">
                      Huỷ
                    </button>
                    <button
                      onClick={submitLeaveRequest}
                      disabled={!leaveReason}
                      className={`flex-1 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all ${
                        leaveReason
                          ? 'bg-amber-400 text-black hover:bg-amber-300'
                          : 'bg-white/5 text-white/20 cursor-not-allowed'
                      }`}
                    >
                      <Send size={12} /> Gửi yêu cầu
                    </button>
                  </div>
                </>
              ) : (
                /* Success state */
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">Đã gửi yêu cầu nghỉ!</h3>
                  <p className="text-sm text-white/40 mb-4">Leave request submitted successfully</p>
                  
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left mb-5">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-white/30">Ca học</span><span className="text-white/80">{leaveSession.title}</span></div>
                      <div className="flex justify-between"><span className="text-white/30">Thời gian</span><span className="text-white/80">{daysOfWeek[leaveSession.dayIndex]}, {formatSessionRange(leaveSession)}</span></div>
                      <div className="flex justify-between"><span className="text-white/30">Lý do</span><span className="text-amber-300 font-medium">{leaveReason}</span></div>
                      {leaveDetail && <div className="pt-2 border-t border-white/5"><span className="text-white/30 text-xs block mb-1">Chi tiết</span><p className="text-white/60 text-xs italic">"{leaveDetail}"</p></div>}
                    </div>
                  </div>

                  <p className="text-xs text-white/30 mb-5">Tutor sẽ nhận được thông báo trong vòng 5 phút. Bạn có thể theo dõi trạng thái trong phần quản lý lịch.</p>

                  <button onClick={() => setLeaveSession(null)} className="w-full py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white/90">
                    Đóng
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
