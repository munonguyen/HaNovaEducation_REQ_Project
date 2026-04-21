import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Users,
  Sparkles,
  AlertTriangle,
  FileText,
  X,
  RefreshCw,
  XCircle,
  BellRing,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

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
  { id: 's1', tutorId: '1', title: 'Quantum Mechanics Review', type: 'Session', durationMinutes: 60, dayIndex: 0, startHour: 8, status: 'Confirmed', note: 'Review Chapter 3 before class.', isUpdated: false },
  { id: 's2', tutorId: '2', title: 'Syntax Analysis', type: 'Monthly', durationMinutes: 90, dayIndex: 2, startHour: 14, status: 'Rescheduled', note: 'No preparation note', isUpdated: true },
  { id: 's3', tutorId: '1', title: 'Thermodynamics Lab', type: 'Course', durationMinutes: 120, dayIndex: 4, startHour: 10, status: 'Cancelled', note: '', isUpdated: false },
  { id: 's4', tutorId: '2', title: 'Phonetics Practice', type: 'Monthly', durationMinutes: 60, dayIndex: 3, startHour: 15, status: 'Confirmed', note: 'Read the handout on IPA', isUpdated: false },
  { id: 's5', tutorId: '3', title: 'Data Structures Intro', type: 'Course', durationMinutes: 120, dayIndex: 0, startHour: 13, status: 'Confirmed', note: 'Setup dev environment', isUpdated: false },
  { id: 's6', tutorId: '1', title: 'Relativity Seminar', type: 'Session', durationMinutes: 60, dayIndex: 1, startHour: 9, status: 'Confirmed', note: 'Bring notes on Einstein', isUpdated: false },
  { id: 's7', tutorId: '2', title: 'Morphology Deep Dive', type: 'Monthly', durationMinutes: 90, dayIndex: 1, startHour: 16, status: 'Confirmed', note: '', isUpdated: false },
  { id: 's8', tutorId: '3', title: 'Algorithm Complexity', type: 'Course', durationMinutes: 90, dayIndex: 3, startHour: 11, status: 'Confirmed', note: 'Review Big O notation', isUpdated: true },
  { id: 's9', tutorId: '1', title: 'Electromagnetism', type: 'Session', durationMinutes: 60, dayIndex: 5, startHour: 10, status: 'Rescheduled', note: '', isUpdated: true },
  { id: 's10', tutorId: '2', title: 'Semantics Tutorial', type: 'Session', durationMinutes: 60, dayIndex: 6, startHour: 14, status: 'Confirmed', note: '', isUpdated: false }
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const startH = 8; // 08:00
const endH = 20;  // 20:00
const pxPerHour = 100; // Expanded height for supreme readability and comfort

export default function Schedule() {
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Completed'>('All');
  
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [themeMode, setThemeMode] = useState<'glass' | 'solid' | 'neon'>('glass');
  
  const [hoveredSession, setHoveredSession] = useState<any | null>(null);
  const [selectedModalSession, setSelectedModalSession] = useState<any | null>(null);

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
  const hasConflict = false; // Mock conflict
  
  const handleSlotClick = (session: any) => {
    setSelectedModalSession(session);
  };

  const selectedTutorObj = selectedTutor ? myTutors.find(t => t.id === selectedTutor) : null;
  const offDays = selectedTutor ? mockTutorOffDays[selectedTutor] || [] : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pt-[120px] pb-24 px-8 max-w-[1500px] mx-auto text-white font-sans"
    >
      
      {/* Header Area */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Your Schedule</h1>
        <p className="text-white/50 text-lg max-w-2xl">
          Manage your upcoming mentoring sessions, view tutor notes, and maintain your academic momentum.
        </p>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-8">
        
        {/* LEFT PANEL: TUTOR LIST */}
        <div className="flex flex-col gap-6">
           <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-6 shadow-2xl glass-panel relative overflow-hidden">
             
             {/* Search */}
             <div className="relative mb-6">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text"
                  placeholder="Search tutors or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/5 rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                />
             </div>

             {/* Tabs */}
             <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-full mb-6 relative">
                {['All', 'Active', 'Completed'].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={`flex-1 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 z-10 ${
                       activeTab === tab ? 'text-black glass-button-primary shadow-lg' : 'text-white/40 hover:text-white/80'
                     }`}
                   >
                     {tab}
                   </button>
                ))}
             </div>

             {/* Tutor List */}
             <div className="space-y-3">
                <button 
                  onClick={() => setSelectedTutor(null)}
                  className={`w-full text-left p-4 rounded-[20px] border transition-all duration-300 flex items-center justify-between ${
                    selectedTutor === null 
                      ? 'border-white/30 bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                      : 'border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                         <Users size={18} className="text-white/60" />
                      </div>
                      <span className="font-medium">All Mentors</span>
                   </div>
                </button>

                {filteredTutors.map(tutor => {
                   const isSelected = selectedTutor === tutor.id;
                   return (
                     <button
                       key={tutor.id}
                       onClick={() => setSelectedTutor(tutor.id)}
                       className={`w-full text-left p-5 rounded-[24px] border transition-all duration-300 overflow-hidden relative group flex items-stretch gap-4 ${
                         isSelected 
                           ? `border-${tutor.color}-400/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),transparent)] shadow-[0_10px_30px_rgba(0,0,0,0.4)]` 
                           : 'border-white/5 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/10'
                       }`}
                     >
                       {/* Left Color Accent Bar */}
                       <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 ${isSelected ? `bg-${tutor.color}-400` : `bg-${tutor.color}-500/20 group-hover:bg-${tutor.color}-500/40`}`} />
                       
                       {isSelected && (
                          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none`} />
                       )}
                       
                       <div className="flex items-start gap-4">
                          <img src={tutor.avatar} alt={tutor.name} className={`w-12 h-12 rounded-full object-cover border border-${tutor.color}-500/30`} />
                       <div className="flex-1 min-w-0 pl-2">
                           <div className="flex justify-between items-start mb-1">
                              <h4 className={`font-serif text-lg truncate transition-colors ${isSelected ? 'text-white' : 'text-white/80'}`}>{tutor.name}</h4>
                              <div className={`mt-0.5 px-2 py-0.5 rounded border text-[9px] uppercase font-bold tracking-wider ${tutor.badge}`}>
                                 {tutor.status}
                              </div>
                           </div>
                           <p className="text-[11px] text-white/50 uppercase tracking-widest truncate">{tutor.subject}</p>
                           
                           <div className="mt-4 pt-4 border-t border-white/5 w-full flex items-center gap-2 text-xs text-white/40">
                              <Clock size={12} className={isSelected ? `text-${tutor.color}-400` : ''} />
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
        </div>

        {/* RIGHT PANEL: TIMETABLE */}
        <div className="flex flex-col gap-6">
           
           {/* Smart Insights Bar */}
           <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-[20px] border border-white/10 bg-white/[0.02] p-4 flex items-start gap-3">
                 <div className="p-2 rounded-full bg-blue-500/10 shrink-0">
                    <Sparkles size={16} className="text-blue-400" />
                 </div>
                 <div>
                    <h5 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">AI Suggestion</h5>
                    <p className="text-[13px] text-white/80 leading-relaxed">Best study time based on past focus is weekday mornings (08:00 - 11:00).</p>
                 </div>
              </div>
              
              {hasConflict ? (
                <div className="rounded-[20px] border border-amber-500/20 bg-amber-500/10 p-4 flex items-start gap-3">
                   <div className="p-2 rounded-full bg-amber-500/20 shrink-0">
                      <AlertTriangle size={16} className="text-amber-400" />
                   </div>
                   <div>
                      <h5 className="text-xs uppercase tracking-widest text-amber-500/60 font-bold mb-1">Conflict Warning</h5>
                      <p className="text-[13px] text-amber-400 leading-relaxed">You have overlapping sessions on Friday.</p>
                   </div>
                </div>
              ) : (
                <div className="rounded-[20px] border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-start gap-3">
                   <div className="p-2 rounded-full bg-emerald-500/20 shrink-0">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                   </div>
                   <div>
                      <h5 className="text-xs uppercase tracking-widest text-emerald-500/60 font-bold mb-1">Weekly Status</h5>
                      <p className="text-[13px] text-emerald-400 leading-relaxed">Your timetable is conflict-free.</p>
                   </div>
                </div>
              )}

              <div className="rounded-[20px] border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between">
                 <div>
                    <h5 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">This Week</h5>
                    <p className="text-[13px] text-white/80 leading-relaxed">You have <strong>{upcomingCount} sessions</strong> scheduled.</p>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">
                    <Filter size={16} />
                 </div>
              </div>
           </div>

           {/* Calendar Grid Container */}
           <div className="rounded-[28px] border border-white/10 bg-white/[0.01] overflow-hidden shadow-2xl glass-panel relative flex-1 flex flex-col">
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-black/10">
                 <div>
                    <h3 className="text-xl font-serif tracking-wide">Oct 12 - Oct 18, 2026</h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">GMT+7 Timezone</p>
                 </div>
                 <div className="flex bg-white/[0.04] p-1 rounded-full border border-white/5">
                    <button className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white shadow-sm">Week</button>
                    <button className="px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white">Month</button>
                 </div>
              </div>

              {/* Grid Body */}
              <div className="flex-1 flex overflow-auto custom-scrollbar relative" style={{ minHeight: '600px' }}>
                 {/* Y-Axis (Time) */}
                 <div className="w-20 shrink-0 border-r border-white/10 bg-black/20 relative z-10">
                    {Array.from({ length: endH - startH + 1 }).map((_, i) => {
                       const hour = startH + i;
                       return (
                         <div key={hour} className="absolute w-full border-b border-white/5" style={{ top: i * pxPerHour, height: pxPerHour }}>
                            <span className="absolute top-2 right-3 text-[10px] text-white/30 uppercase tracking-wider">
                               {hour.toString().padStart(2, '0')}:00
                            </span>
                         </div>
                       )
                    })}
                 </div>

                 {/* X-Axis (Days) & Sessions */}
                 <div className="flex-1 flex relative min-w-[700px]">
                    {/* Background horizontal hour lines */}
                    <div className="absolute inset-0 pointer-events-none">
                       {Array.from({ length: endH - startH + 1 }).map((_, i) => (
                         <div key={i} className="absolute w-full border-b border-white/[0.02]" style={{ top: i * pxPerHour, height: pxPerHour }} />
                       ))}
                    </div>

                    {daysOfWeek.map((day, dIdx) => {
                       const isOffDay = offDays.includes(day);
                       
                       return (
                         <div key={day} className="flex-1 relative border-r border-white/5 group transition-colors hover:bg-white/[0.01]">
                            {/* Day Header */}
                            <div className="sticky top-0 z-20 h-10 border-b border-white/10 bg-[linear-gradient(180deg,rgba(10,12,20,0.95),rgba(10,12,20,0.8))] backdrop-blur-md flex items-center justify-center">
                               <span className={`text-[11px] font-bold uppercase tracking-widest ${isOffDay ? 'text-amber-500/40' : 'text-white/60'}`}>{day}</span>
                            </div>

                            {/* Off Day Overlay */}
                            {isOffDay && (
                               <div className="absolute inset-0 top-10 bg-[diagonal-stripes] bg-[length:10px_10px] opacity-[0.03] pointer-events-none flex flex-col items-center pt-8">
                               </div>
                            )}
                            
                            {/* Sessions for this day */}
                            {displaySessions.filter(s => s.dayIndex === dIdx).map(session => {
                               const tutor = myTutors.find(t => t.id === session.tutorId);
                               if (!tutor) return null;
                               
                               const tOffset = (session.startHour - startH) * pxPerHour;
                               const tHeight = (session.durationMinutes / 60) * pxPerHour;
                               
                               const isCancelled = session.status === 'Cancelled';
                               const isRescheduled = session.status === 'Rescheduled';

                               return (
                                 <div 
                                   key={session.id}
                                   onMouseEnter={() => setHoveredSession({ ...session, tutor })}
                                   onMouseLeave={() => setHoveredSession(null)}
                                   onClick={() => handleSlotClick({ ...session, tutor })}
                                   className={`absolute inset-x-2 rounded-xl px-3 py-2.5 border transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden group/card flex flex-col justify-between backdrop-blur-md
                                     ${isCancelled 
                                        ? 'bg-[linear-gradient(135deg,rgba(239,68,68,0.1),rgba(239,68,68,0.02))] border-red-500/20 hover:border-red-500/40' 
                                        : `bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] border-${tutor.color}-400/30 hover:border-${tutor.color}-400/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:-translate-y-1`}
                                   `}
                                   style={{ top: tOffset + 40 + 3, height: tHeight - 6 }} // Less margin for taller boxes inside cells
                                 >
                                    {/* Accent line on left */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCancelled ? 'bg-red-500/50' : `bg-${tutor.color}-400`}`} />
                                    
                                    {/* Content */}
                                    <div className="flex-1 overflow-hidden min-h-0 pl-1.5 relative z-10">
                                       <h5 className={`font-serif text-[13px] leading-snug mb-1 truncate ${isCancelled ? 'text-red-400/90' : 'text-white'}`}>
                                          {session.title}
                                       </h5>
                                       <p className={`text-[10px] uppercase tracking-widest truncate mb-1 ${isCancelled ? 'text-red-500/60' : `text-${tutor.color}-300/80`}`}>
                                          {tutor.name}
                                       </p>
                                    </div>
                                    
                                    {/* Bottom Info: Using Flex instead of Absolute to prevent text overlap */}
                                    <div className="flex items-center justify-between shrink-0 pt-1.5 pl-1.5 relative z-10">
                                       <span className={`text-[10px] uppercase font-bold tracking-widest ${isCancelled ? 'text-red-500/40' : 'text-white/40 group-hover/card:text-white/60'}`}>
                                          {session.durationMinutes}m
                                       </span>
                                       {session.isUpdated && !isCancelled && (
                                          <div title="Updated slot" className="w-[16px] h-[16px] rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                                             <BellRing size={9} className="text-amber-400" />
                                          </div>
                                       )}
                                    </div>
                                 </div>
                               )
                            })}

                            {/* Unavailability Hover Message */}
                            {isOffDay && (
                               <div className="absolute inset-0 top-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-30 pointer-events-none p-4 text-center">
                                  <div className="border border-amber-500/20 bg-amber-500/10 rounded-[14px] p-3 shadow-2xl">
                                     <AlertTriangle size={16} className="text-amber-400 mx-auto mb-2" />
                                     <p className="text-[10px] uppercase font-bold tracking-widest text-amber-500/80 mb-1">Unavailable</p>
                                     <p className="text-[11px] text-amber-500/50">Tutor personal leave</p>
                                  </div>
                               </div>
                            )}
                         </div>
                       )
                    })}
                 </div>

                 {/* FLOATING HOVER CARD */}
                 <AnimatePresence>
                   {hoveredSession && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="fixed z-50 pointer-events-none w-72 rounded-[24px] border border-white/10 bg-soft-charcoal/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
                        style={{ 
                          // Very basic centering for demo; ideally calculate from cursor
                          top: '30%', left: '50%', marginLeft: '-9rem' 
                        }}
                      >
                         <div className={`h-1.5 w-full bg-${hoveredSession.tutor.color}-500/50`} />
                         <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                               <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">{hoveredSession.type}</p>
                               <span className={`px-2 py-0.5 rounded border text-[9px] uppercase font-bold tracking-wider 
                                  ${hoveredSession.status === 'Cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-white/10 border-white/20 text-white/70'}`}>
                                  {hoveredSession.status}
                               </span>
                            </div>
                            <h4 className="font-serif text-lg text-white mb-1">{hoveredSession.title}</h4>
                            <p className="text-sm text-white/50 mb-5">{hoveredSession.tutor.name} • {hoveredSession.tutor.subject}</p>
                            
                            <div className="grid grid-cols-2 gap-3 mb-5">
                               <div>
                                 <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Time</p>
                                 <p className="text-[13px] text-white/90">
                                   {hoveredSession.startHour.toString().padStart(2,'0')}:00 - {(hoveredSession.startHour + hoveredSession.durationMinutes/60).toString().padStart(2,'0')}:00
                                 </p>
                               </div>
                               <div>
                                 <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Duration</p>
                                 <p className="text-[13px] text-white/90">{hoveredSession.durationMinutes} mins</p>
                               </div>
                            </div>
                            
                            {/* Tutor Note */}
                            <div className="rounded-[16px] bg-white/[0.03] border border-white/5 p-4">
                               <div className="flex items-center gap-2 mb-2 text-white/70">
                                  <FileText size={14} className="text-amber-400" />
                                  <span className="text-[11px] uppercase tracking-widest font-bold">Preparation Note</span>
                               </div>
                               <p className="text-[13px] leading-relaxed text-white/50 italic">
                                  {hoveredSession.note ? `"${hoveredSession.note}"` : "No preparation note provided by tutor."}
                               </p>
                            </div>
                         </div>
                      </motion.div>
                   )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>

      {/* SESSION DETAIL MODAL (Mockup) */}
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
               className="relative w-full max-w-lg bg-[#060810] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl glass-panel"
             >
                <div className="absolute top-0 left-0 right-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
                <button onClick={() => setSelectedModalSession(null)} className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors z-10 text-white/50 hover:text-white">
                   <X size={18} />
                </button>
                
                <div className="px-8 pt-8 pb-6 border-b border-white/10">
                   <div className="w-12 h-12 rounded-[14px] bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-5">
                      <Clock size={20} className="text-blue-400" />
                   </div>
                   <h3 className="text-2xl font-serif text-white mb-2">{selectedModalSession.title}</h3>
                   <p className="text-[15px] text-white/50">With {selectedModalSession.tutor.name}</p>
                </div>
                
                <div className="p-8 space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-[20px] bg-white/[0.02] border border-white/5 p-4">
                         <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mb-2">When</span>
                         <span className="block text-[15px] font-medium text-white/90">
                           {daysOfWeek[selectedModalSession.dayIndex]}, {selectedModalSession.startHour.toString().padStart(2,'0')}:00
                         </span>
                      </div>
                      <div className="rounded-[20px] bg-white/[0.02] border border-white/5 p-4">
                         <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-white/30 mb-2">Type</span>
                         <span className="block text-[15px] font-medium text-white/90">{selectedModalSession.type}</span>
                      </div>
                   </div>

                   <div className="rounded-[20px] bg-black/40 border border-white/5 p-5">
                       <h5 className="text-[11px] uppercase font-bold tracking-widest text-white/60 mb-2 flex items-center gap-2">
                         <AlertTriangle size={14} className="text-amber-500" /> Important
                       </h5>
                       <p className="text-[13px] text-white/40 leading-relaxed">
                          Rescheduling must occur at least 12 hours prior to the session. Cancellations within 12 hours are non-refundable according to the payment policy you accepted.
                       </p>
                   </div>
                   
                   <div className="flex gap-4 pt-4 border-t border-white/5">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-white/10 hover:bg-white/[0.03] transition-colors text-sm font-medium text-white/70">
                         <XCircle size={16} /> Cancel Session
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                         <RefreshCw size={16} /> Reschedule
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
