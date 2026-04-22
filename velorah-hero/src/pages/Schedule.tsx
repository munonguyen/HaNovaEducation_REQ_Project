import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Search,
  Users,
  Sparkles,
  AlertTriangle,
  FileText,
  X,
  RefreshCw,
  XCircle,
  BellRing,
  CheckCircle2,
  Palette,
  Eye,
  EyeOff,
  Settings2,
  MapPin,
  DoorOpen,
  BookOpen
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

const mockTutorOffDays: Record<string, string[]> = {
   '1': ['Fri'],
   '2': ['Tue']
};

const mySessions = [
  { id: 's1', tutorId: '1', title: 'Quantum Mechanics Review', type: 'Session', durationMinutes: 60, dayIndex: 0, startHour: 8, status: 'Confirmed', note: 'Review Chapter 3 before class.', isUpdated: false, location: 'Academic Plaza', room: 'A1-204', materials: 'Formula Sheet v2, Lab Goggles' },
  { id: 's2', tutorId: '2', title: 'Syntax Analysis', type: 'Monthly', durationMinutes: 90, dayIndex: 2, startHour: 14, status: 'Rescheduled', note: 'No preparation note', isUpdated: true, location: 'Language Hub', room: 'B3-102', materials: 'IPA Chart, Syntax Workbook' },
  { id: 's3', tutorId: '1', title: 'Thermodynamics Lab', type: 'Course', durationMinutes: 120, dayIndex: 4, startHour: 10, status: 'Cancelled', note: '', isUpdated: false, location: 'Science Wing', room: 'Lab 4', materials: 'None' },
  { id: 's4', tutorId: '2', title: 'Phonetics Practice', type: 'Monthly', durationMinutes: 60, dayIndex: 3, startHour: 15, status: 'Confirmed', note: 'Read the handout on IPA', isUpdated: false, location: 'Digital Studio', room: 'Studio B', materials: 'Microphone, Handout 3' },
  { id: 's5', tutorId: '3', title: 'Data Structures Intro', type: 'Course', durationMinutes: 120, dayIndex: 0, startHour: 13, status: 'Confirmed', note: 'Setup dev environment', isUpdated: false, location: 'Tech Tower', room: 'Lounge 1', materials: 'VS Code, Git installed' },
  { id: 's6', tutorId: '1', title: 'Relativity Seminar', type: 'Session', durationMinutes: 60, dayIndex: 1, startHour: 9, status: 'Confirmed', note: 'Bring notes on Einstein', isUpdated: false, location: 'Academic Plaza', room: 'A1-405', materials: 'Field Journal' },
  { id: 's7', tutorId: '2', title: 'Morphology Deep Dive', type: 'Monthly', durationMinutes: 90, dayIndex: 1, startHour: 16, status: 'Confirmed', note: '', isUpdated: false, location: 'Language Hub', room: 'B3-105', materials: 'Textbook' },
  { id: 's8', tutorId: '3', title: 'Algorithm Complexity', type: 'Course', durationMinutes: 90, dayIndex: 3, startHour: 11, status: 'Confirmed', note: 'Review Big O notation', isUpdated: true, location: 'Tech Tower', room: 'Room 202', materials: 'Graph Paper' },
  { id: 's9', tutorId: '1', title: 'Electromagnetism', type: 'Session', durationMinutes: 60, dayIndex: 5, startHour: 10, status: 'Rescheduled', note: '', isUpdated: true, location: 'Science Wing', room: 'Hall 1', materials: 'Calculator' },
  { id: 's10', tutorId: '2', title: 'Semantics Tutorial', type: 'Session', durationMinutes: 60, dayIndex: 6, startHour: 14, status: 'Confirmed', note: '', isUpdated: false, location: 'Virtual', room: 'Zoom ID: 882-192', materials: 'Internet connection' },
  { id: 's11', tutorId: '1', title: 'Advanced Quantum Physics', type: 'Course', durationMinutes: 120, dayIndex: 2, startHour: 19, status: 'Confirmed', note: 'Prepare for late night lab discussion', isUpdated: true, location: 'Science Wing', room: 'Lab 2', materials: 'Dark-room goggles' },
  { id: 's12', tutorId: '3', title: 'AI Ethics', type: 'Session', durationMinutes: 90, dayIndex: 4, startHour: 20, status: 'Confirmed', note: 'Reading assignment on AI safety', isUpdated: false, location: 'Innovation Lab', room: 'Glass Hub', materials: 'iPad/Laptop' }
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const startH = 7;
const endH = 22;
type ScheduleTab = 'All' | 'Active' | 'Completed';
type Tutor = (typeof myTutors)[number];
type Session = (typeof mySessions)[number];
type SessionWithTutor = Session & { tutor: Tutor };
const scheduleTabs: ScheduleTab[] = ['All', 'Active', 'Completed'];

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */
export default function Schedule() {
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ScheduleTab>('All');
  
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [themeMode, setThemeMode] = useState<'glass' | 'solid' | 'neon'>('glass');
  
  const [hoveredSession, setHoveredSession] = useState<SessionWithTutor | null>(null);
  const [selectedModalSession, setSelectedModalSession] = useState<SessionWithTutor | null>(null);

  // Customization state
  const [pxPerHour, setPxPerHour] = useState(90);
  const [showWeekend, setShowWeekend] = useState(true);
  const [showCustomPanel, setShowCustomPanel] = useState(false);
  const [hiddenDays, setHiddenDays] = useState<number[]>([]);
  
  const timetableRef = useRef<HTMLDivElement>(null);

  const visibleDays = useMemo(() => {
    let days = daysOfWeek.map((d, i) => ({ name: d, index: i }));
    if (!showWeekend) days = days.filter(d => d.index < 5);
    return days.filter(d => !hiddenDays.includes(d.index));
  }, [showWeekend, hiddenDays]);

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

  // Insights
  const upcomingCount = displaySessions.filter(s => s.status !== 'Cancelled').length;
  const hasConflict = false;
  
  const handleSlotClick = (session: SessionWithTutor) => {
    setSelectedModalSession(session);
  };

  const offDays = selectedTutor ? mockTutorOffDays[selectedTutor] || [] : [];

  const toggleDay = (idx: number) => {
    setHiddenDays(prev => prev.includes(idx) ? prev.filter(d => d !== idx) : [...prev, idx]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 pt-[90px] pb-12 px-4 lg:px-10 text-white font-sans flex flex-col z-10"
    >
      
      {/* ══ COMPACT HEADER ══ */}
      <div className="mb-4 shrink-0 flex items-end justify-between gap-6 max-w-[1800px] w-full mx-auto">
        <div>
          <h1 className="text-3xl lg:text-4xl font-serif tracking-tight mb-1">Your Schedule</h1>
          <p className="text-white/40 text-sm max-w-xl">
            Manage sessions, view tutor notes, and maintain your academic momentum.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Stats */}
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

      {/* ══ MAIN LAYOUT: FIXED HEIGHT, INTERNAL SCROLL ══ */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-[280px_1fr] gap-6 max-w-[1800px] w-full mx-auto">
        
        {/* ═══ LEFT PANEL: TUTOR LIST ═══ */}
        <div className="flex flex-col min-h-0 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] shadow-2xl glass-panel overflow-hidden">
          
          {/* Search — FIXED */}
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

            {/* Tab filter */}
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

          {/* Tutor List — SCROLLABLE */}
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
                        ? `border-${tutor.color}-400/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent)] shadow-[0_8px_25px_rgba(0,0,0,0.4)]` 
                        : 'border-white/5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/10'
                    }`}
                  >
                    {/* Accent bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${isSelected ? `bg-${tutor.color}-400` : `bg-${tutor.color}-500/20 group-hover:bg-${tutor.color}-500/40`}`} />
                    
                    {isSelected && (
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
                    )}
                    
                    <div className="flex items-start gap-3.5 pl-2">
                       <img src={tutor.avatar} alt={tutor.name} className={`w-11 h-11 rounded-full object-cover border border-${tutor.color}-500/30 shrink-0`} />
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-0.5">
                             <h4 className={`font-serif text-base truncate transition-colors ${isSelected ? 'text-white' : 'text-white/80'}`}>{tutor.name}</h4>
                             <div className={`ml-2 px-2 py-0.5 rounded border text-[8px] uppercase font-bold tracking-wider shrink-0 ${tutor.badge}`}>
                                {tutor.status}
                             </div>
                          </div>
                          <p className="text-[10px] text-white/50 uppercase tracking-widest truncate">{tutor.subject}</p>
                          
                          <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-white/40">
                             <Clock size={11} className={isSelected ? `text-${tutor.color}-400` : ''} />
                             <span className={tutor.nextSession === 'No upcoming sessions' ? 'opacity-60' : 'text-white/70 font-medium'}>
                                {tutor.nextSession}
                             </span>
                          </div>
                       </div>
                    </div>
                  </button>
                );
             })}
             
             {filteredTutors.length === 0 && (
                <div className="text-center py-8 text-white/30 text-sm">No mentors found.</div>
             )}
          </div>
        </div>

        {/* ═══ RIGHT PANEL: TIMETABLE ═══ */}
        <div className="flex flex-col min-h-0">
          
          {/* Calendar Container */}
          <div className="rounded-[24px] border border-white/10 bg-white/[0.01] overflow-hidden shadow-2xl glass-panel flex-1 flex flex-col min-h-0">
             
             {/* ── Calendar Header — FIXED ── */}
             <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/10 shrink-0">
                <div>
                   <h3 className="text-lg font-serif tracking-wide">{viewMode === 'week' ? 'Oct 12 – Oct 18, 2026' : 'Course Overview'}</h3>
                   <p className="text-[10px] text-white/35 uppercase tracking-widest mt-0.5">GMT+7 Timezone</p>
                </div>
                <div className="flex items-center gap-3">
                   {/* Customization Toggle */}
                   {viewMode === 'week' && (
                     <>
                       <button
                         onClick={() => setShowCustomPanel(!showCustomPanel)}
                         className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all text-[10px] uppercase font-bold tracking-widest ${
                           showCustomPanel 
                             ? 'border-blue-500/30 bg-blue-500/10 text-blue-400' 
                             : 'border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/[0.05]'
                         }`}
                       >
                         <Settings2 size={12} /> Customize
                       </button>
                       <button 
                         onClick={() => setThemeMode(c => c === 'glass' ? 'solid' : c === 'solid' ? 'neon' : 'glass')}
                         className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-[10px] uppercase font-bold tracking-widest text-white/50 hover:text-white"
                       >
                         <Palette size={12} /> {themeMode}
                       </button>
                     </>
                   )}

                   <div className="flex bg-white/[0.04] p-1 rounded-full border border-white/5">
                      <button onClick={() => setViewMode('week')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'week' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}>Week</button>
                      <button onClick={() => setViewMode('month')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'month' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}>Month</button>
                   </div>
                </div>
             </div>

             {/* ── Customization Panel (Collapsible) ── */}
             <AnimatePresence>
               {showCustomPanel && viewMode === 'week' && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }} 
                   animate={{ height: 'auto', opacity: 1 }} 
                   exit={{ height: 0, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="overflow-hidden border-b border-white/5 bg-black/15 shrink-0"
                 >
                   <div className="px-6 py-4 flex flex-wrap items-center gap-6">
                     {/* Row Height */}
                     <div className="flex items-center gap-3">
                       <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Row Height</span>
                       <div className="flex items-center gap-2">
                         {[60, 75, 90, 110].map(v => (
                           <button 
                             key={v}
                             onClick={() => setPxPerHour(v)}
                             className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                               pxPerHour === v 
                                 ? 'bg-white/10 text-white border-white/20' 
                                 : 'bg-white/[0.02] text-white/30 border-white/5 hover:text-white/60'
                             }`}
                           >
                             {v === 60 ? 'S' : v === 75 ? 'M' : v === 90 ? 'L' : 'XL'}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="w-px h-6 bg-white/10" />

                     {/* Toggle Weekend */}
                     <button
                       onClick={() => setShowWeekend(!showWeekend)}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase font-bold tracking-widest transition-all ${
                         showWeekend 
                           ? 'border-white/15 bg-white/[0.05] text-white/70' 
                           : 'border-amber-500/20 bg-amber-500/5 text-amber-400'
                       }`}
                     >
                       {showWeekend ? <Eye size={11} /> : <EyeOff size={11} />}
                       Weekend {showWeekend ? 'On' : 'Off'}
                     </button>
                     
                     <div className="w-px h-6 bg-white/10" />

                     {/* Toggle Individual Days */}
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Days</span>
                       {daysOfWeek.map((d, i) => (
                         <button
                           key={d}
                           onClick={() => toggleDay(i)}
                           className={`w-7 h-7 rounded-lg text-[10px] font-bold border transition-all ${
                             hiddenDays.includes(i) 
                               ? 'bg-red-500/5 border-red-500/20 text-red-400/60 line-through' 
                               : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white'
                           }`}
                         >
                           {d[0]}
                         </button>
                       ))}
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* ── Grid Body — SCROLLABLE ── */}
             {viewMode === 'month' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto custom-scrollbar min-h-0">
                  {myTutors.filter(t => t.status !== 'Completed').map(tutor => (
                     <div key={tutor.id} className={`rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent)] p-6 hover:bg-white/[0.05] transition-colors shadow-2xl h-max flex flex-col`}>
                        <div className="flex items-center justify-between mb-2">
                           <h4 className={`text-xl font-serif text-${tutor.color}-400`}>{tutor.subject}</h4>
                           <div className="w-9 h-9 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center">
                              <Users size={14} className="text-white/40" />
                           </div>
                        </div>
                        <p className="text-sm text-white/50 mb-5">Instructor: {tutor.name}</p>
                        
                        <div className="space-y-4 flex-1">
                           <div>
                              <h5 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">Syllabus</h5>
                              <div className="p-3.5 rounded-[14px] bg-black/20 border border-white/5 text-xs text-white/70 leading-relaxed">
                                 {tutor.id === '1' ? 'Quantum Theory basics over 8 weeks. Comprehensive lab test + weekly assignments.' 
                                 : 'Morphology & Syntax. Weekly quizzes, final term paper, conversational practice.'}
                              </div>
                           </div>
                           
                           <div>
                              <div className="flex justify-between items-center mb-2">
                                 <h5 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Progress</h5>
                                 <span className="text-[10px] font-bold text-white/50">{tutor.id === '1' ? '40%' : '75%'}</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                 <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: tutor.id === '1' ? '40%' : '75%' }} 
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className={`h-full bg-${tutor.color}-500 shadow-[0_0_10px_currentColor]`} 
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
                </motion.div>
             ) : (
                <div ref={timetableRef} className="flex-1 min-h-0 overflow-auto custom-scrollbar relative bg-black/10">
                 <div className="flex w-full" style={{ minHeight: `${(endH - startH + 1) * pxPerHour + 40}px` }}>
                  {/* Y-Axis (Time) */}
                  <div className="w-16 shrink-0 border-r border-white/10 bg-black/40 relative z-10">
                   {Array.from({ length: endH - startH + 1 }).map((_, i) => {
                      const hour = startH + i;
                      return (
                        <div key={hour} className="absolute w-full border-b border-white/5" style={{ top: i * pxPerHour + 40, height: pxPerHour }}>
                           <span className="absolute top-2 right-2.5 text-[10px] text-white/30 uppercase tracking-wider font-mono">
                              {hour.toString().padStart(2, '0')}:00
                           </span>
                        </div>
                      )
                   })}
                </div>

                {/* X-Axis (Days) & Sessions */}
                <div className="flex-1 flex relative min-w-[500px]">
                   {/* BG Hour lines */}
                   <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: endH - startH + 1 }).map((_, i) => (
                        <div key={i} className="absolute w-full border-b border-white/[0.02]" style={{ top: i * pxPerHour + 40, height: pxPerHour }} />
                      ))}
                   </div>

                   {visibleDays.map(day => {
                      const isOffDay = offDays.includes(day.name);
                      
                      return (
                        <div key={day.name} className="flex-1 relative border-r border-white/5 group transition-colors hover:bg-white/[0.01]" style={{ minWidth: '80px' }}>
                           {/* Day Header — sticky */}
                           <div className="sticky top-0 z-20 h-10 border-b border-white/10 bg-[linear-gradient(180deg,rgba(10,12,20,0.95),rgba(10,12,20,0.8))] backdrop-blur-md flex items-center justify-center">
                              <span className={`text-[10px] font-bold uppercase tracking-widest ${isOffDay ? 'text-amber-500/40' : 'text-white/60'}`}>{day.name}</span>
                           </div>

                           {/* Off Day Overlay */}
                           {isOffDay && (
                              <div className="absolute inset-0 top-10 opacity-[0.03] pointer-events-none" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
                           )}
                           
                           {/* Sessions */}
                           {displaySessions.filter(s => s.dayIndex === day.index).map(session => {
                              const tutor = myTutors.find(t => t.id === session.tutorId);
                              if (!tutor) return null;
                              
                              const tOffset = (session.startHour - startH) * pxPerHour;
                              const tHeight = (session.durationMinutes / 60) * pxPerHour;
                              
                              const isCancelled = session.status === 'Cancelled';

                              return (
                                <div 
                                  key={session.id}
                                  onMouseEnter={() => setHoveredSession({ ...session, tutor })}
                                  onMouseLeave={() => setHoveredSession(null)}
                                  onClick={() => handleSlotClick({ ...session, tutor })}
                                  className={`absolute inset-x-1.5 rounded-xl px-2.5 py-2 border transition-all duration-300 cursor-pointer overflow-hidden group/card flex flex-col justify-between
                                    ${isCancelled 
                                       ? 'bg-[linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.02))] border-red-500/20 hover:border-red-500/40 opacity-70' 
                                       : themeMode === 'neon'
                                           ? `bg-[#030408] border border-${tutor.color}-500/80 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:border-${tutor.color}-400 hover:-translate-y-0.5`
                                           : themeMode === 'solid'
                                               ? `bg-${tutor.color}-500/20 border-l-4 border-${tutor.color}-500 hover:bg-${tutor.color}-500/30 hover:shadow-xl hover:-translate-y-0.5`
                                               : `bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] border-${tutor.color}-400/30 hover:border-${tutor.color}-400/60 shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 backdrop-blur-md`
                                    }
                                  `}
                                  style={{ top: tOffset + 40 + 2, height: tHeight - 4 }}
                                >
                                   {/* Accent bar */}
                                   <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCancelled ? 'bg-red-500/50' : `bg-${tutor.color}-400`}`} />
                                   
                                   <div className="flex-1 overflow-hidden min-h-0 pl-1.5 relative z-10">
                                      <h5 className={`font-serif text-[12px] leading-snug mb-0.5 truncate ${isCancelled ? 'text-red-400/90' : 'text-white'}`}>
                                         {session.title}
                                      </h5>
                                      <p className={`text-[9px] uppercase tracking-widest truncate ${isCancelled ? 'text-red-500/60' : `text-${tutor.color}-300/80`}`}>
                                         {tutor.name}
                                      </p>
                                   </div>
                                   
                                   <div className="flex items-center justify-between shrink-0 pt-1 pl-1.5 relative z-10">
                                      <span className={`text-[9px] uppercase font-bold tracking-widest ${isCancelled ? 'text-red-500/40' : 'text-white/40'}`}>
                                         {session.durationMinutes}m
                                      </span>
                                      {session.isUpdated && !isCancelled && (
                                         <div title="Updated" className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                                            <BellRing size={8} className="text-amber-400" />
                                         </div>
                                      )}
                                   </div>
                                </div>
                              )
                           })}

                           {/* Off-Day Hover Message */}
                           {isOffDay && (
                              <div className="absolute inset-0 top-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-30 pointer-events-none p-4 text-center">
                                 <div className="border border-amber-500/20 bg-amber-500/10 rounded-[14px] p-3 shadow-2xl">
                                    <AlertTriangle size={14} className="text-amber-400 mx-auto mb-1.5" />
                                    <p className="text-[9px] uppercase font-bold tracking-widest text-amber-500/80">Unavailable</p>
                                 </div>
                              </div>
                           )}
                        </div>
                      )
                   })}
                </div>
                </div>

                {/* FLOATING HOVER CARD */}
                <AnimatePresence>
                  {hoveredSession && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.95, y: 10 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.95, y: 5 }}
                       transition={{ duration: 0.2 }}
                       className="fixed z-50 pointer-events-none w-72 rounded-[20px] border border-white/10 bg-[#080c14]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
                       style={{ top: '30%', left: '50%', marginLeft: '-9rem' }}
                     >
                        <div className={`h-1 w-full bg-${hoveredSession.tutor.color}-500/50`} />
                        <div className="p-4">
                           <div className="flex items-center justify-between mb-2">
                              <p className="text-[9px] uppercase font-bold tracking-widest text-white/40">{hoveredSession.type}</p>
                              <span className={`px-2 py-0.5 rounded border text-[8px] uppercase font-bold tracking-wider 
                                 ${hoveredSession.status === 'Cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/10 border-white/20 text-white/70'}`}>
                                 {hoveredSession.status}
                              </span>
                           </div>
                           <h4 className="font-serif text-base text-white mb-0.5">{hoveredSession.title}</h4>
                           <p className="text-xs text-white/50 mb-3">{hoveredSession.tutor.name}</p>
                           
                           {/* Location & Room */}
                           <div className="flex flex-col gap-1.5 mb-4">
                              <div className="flex items-center gap-1.5 grayscale opacity-60">
                                 <MapPin size={10} />
                                 <span className="text-[10px] uppercase tracking-wider">{hoveredSession.location}</span>
                              </div>
                              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 w-max">
                                 <DoorOpen size={12} className="text-indigo-400" />
                                 <span className="text-[11px] font-bold text-white tracking-tight">Room {hoveredSession.room}</span>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-2 mb-4">
                              <div>
                                <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">Time</p>
                                <p className="text-xs text-white/90 font-mono">
                                  {hoveredSession.startHour.toString().padStart(2,'0')}:00 – {(hoveredSession.startHour + hoveredSession.durationMinutes/60).toString().padStart(2,'0')}:00
                                </p>
                              </div>
                              <div>
                                <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">Duration</p>
                                <p className="text-xs text-white/90">{hoveredSession.durationMinutes} mins</p>
                              </div>
                           </div>
                           
                           <div className="space-y-2.5">
                              {hoveredSession.note && (
                                 <div className="rounded-[12px] bg-white/[0.03] border border-white/5 p-2.5">
                                    <div className="flex items-center gap-1.5 mb-1 text-white/70">
                                       <FileText size={10} className="text-amber-400" />
                                       <span className="text-[9px] uppercase tracking-widest font-bold">Prep Note</span>
                                    </div>
                                    <p className="text-[10px] leading-relaxed text-white/50 italic">"{hoveredSession.note}"</p>
                                 </div>
                              )}

                              {hoveredSession.materials && (
                                 <div className="rounded-[12px] bg-white/[0.03] border border-white/5 p-2.5">
                                    <div className="flex items-center gap-1.5 mb-1 text-white/70">
                                       <BookOpen size={10} className="text-purple-400" />
                                       <span className="text-[9px] uppercase tracking-widest font-bold">Materials</span>
                                    </div>
                                    <p className="text-[10px] leading-relaxed text-white/50">{hoveredSession.materials}</p>
                                 </div>
                              )}
                           </div>
                        </div>
                     </motion.div>
                  )}
                </AnimatePresence>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* ═══ SESSION DETAIL MODAL ═══ */}
      <AnimatePresence>
        {selectedModalSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
             <motion.div
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               className="relative w-full max-w-lg bg-[#060810] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl glass-panel"
             >
                <div className="absolute top-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
                <button onClick={() => setSelectedModalSession(null)} className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors z-10 text-white/50 hover:text-white">
                   <X size={16} />
                </button>
                
                <div className="px-7 pt-7 pb-5 border-b border-white/10">
                   <div className="w-11 h-11 rounded-[12px] bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                      <Clock size={18} className="text-blue-400" />
                   </div>
                   <h3 className="text-xl font-serif text-white mb-1">{selectedModalSession.title}</h3>
                   <p className="text-sm text-white/50">With {selectedModalSession.tutor.name}</p>
                </div>
                
                <div className="p-7 space-y-6">
                   <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-[16px] bg-white/[0.02] border border-white/5 p-4 flex flex-col justify-between">
                         <span className="block text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 mb-2">When</span>
                         <div className="flex items-center gap-2">
                            <Clock size={15} className="text-blue-400" />
                            <span className="text-sm font-medium text-white/90">
                              {daysOfWeek[selectedModalSession.dayIndex]}, {selectedModalSession.startHour.toString().padStart(2,'0')}:00
                            </span>
                         </div>
                      </div>
                      <div className="rounded-[16px] bg-indigo-500/10 border border-indigo-500/20 p-4 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                         <span className="block text-[9px] uppercase font-bold tracking-[0.2em] text-indigo-300/60 mb-2">Room Number</span>
                         <div className="flex items-center gap-2">
                            <DoorOpen size={18} className="text-indigo-400" />
                            <span className="text-xl font-bold text-white tracking-tighter">
                               {selectedModalSession.room}
                            </span>
                         </div>
                      </div>
                   </div>

                   <div className="rounded-[16px] bg-white/[0.02] border border-white/5 p-4">
                      <span className="block text-[9px] uppercase font-bold tracking-[0.2em] text-white/30 mb-2">Location</span>
                      <div className="flex items-center gap-2">
                         <MapPin size={14} className="text-emerald-400" />
                         <span className="text-sm font-medium text-white/80">
                            {selectedModalSession.location}
                         </span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      {selectedModalSession.note && (
                         <div className="rounded-[18px] bg-amber-500/5 border border-amber-500/10 p-4">
                            <h5 className="text-[10px] uppercase font-bold tracking-widest text-amber-500/60 mb-2 flex items-center gap-2">
                               <FileText size={13} /> Preparation Notes
                            </h5>
                            <p className="text-[13px] text-white/70 leading-relaxed italic">
                               "{selectedModalSession.note}"
                            </p>
                         </div>
                      )}

                      {selectedModalSession.materials && (
                         <div className="rounded-[18px] bg-purple-500/5 border border-purple-500/10 p-4">
                            <h5 className="text-[10px] uppercase font-bold tracking-widest text-purple-400/60 mb-2 flex items-center gap-2">
                               <BookOpen size={13} /> Required Materials
                            </h5>
                            <ul className="text-[13px] text-white/70 space-y-1">
                               {selectedModalSession.materials.split(',').map((item: string, i: number) => (
                                  <li key={i} className="flex items-center gap-2">
                                     <div className="w-1 h-1 rounded-full bg-purple-500" />
                                     {item.trim()}
                                  </li>
                               ))}
                            </ul>
                         </div>
                      )}
                   </div>

                   <div className="rounded-[16px] bg-black/40 border border-white/5 p-4">
                      <h5 className="text-[10px] uppercase font-bold tracking-widest text-white/60 mb-1.5 flex items-center gap-2">
                        <AlertTriangle size={12} className="text-amber-500" /> Policy
                      </h5>
                      <p className="text-[12px] text-white/40 leading-relaxed">
                         Rescheduling must occur at least 12 hours prior. Cancellations within 12 hours are non-refundable.
                      </p>
                   </div>
                   
                   <div className="flex gap-3 pt-3 border-t border-white/5">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-white/10 hover:bg-white/[0.03] transition-colors text-sm font-medium text-white/70">
                         <XCircle size={15} /> Cancel
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                         <RefreshCw size={15} /> Reschedule
                      </button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
