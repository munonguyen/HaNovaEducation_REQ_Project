import React from 'react';
import { Play, Calendar, Clock, Video, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const TutorHome: React.FC = () => {
  return (
    <div className="tutor-hero">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <h1 className="text-4xl font-serif text-white mb-2">Good morning, Dr. Aris</h1>
        <p className="text-white/50 tracking-wide">Your guidance today will shape the scholars of tomorrow.</p>
      </motion.div>

      <div className="tutor-grid">
        <div className="left-col flex flex-col gap-8">
          {/* Next Lesson Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-8 rounded-3xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-6">Next Session</div>
            <div className="flex justify-between items-end relative z-10">
              <div>
                <h2 className="text-3xl font-serif text-white mb-2">Advanced Quantum Mechanics</h2>
                <p className="text-white/70 mb-8">Student: Alexander Sterling</p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Clock size={16} className="text-indigo-400" /> 10:30 AM (In 45 mins)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Video size={16} className="text-indigo-400" /> Online Session
                  </div>
                </div>
              </div>
              <button className="glass-button-primary px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold">
                <Play size={16} fill="currentColor" />
                Enter Session
              </button>
            </div>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-8 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl text-white">Today's Schedule</h3>
              <button className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                View Calendar
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { time: '10:30 AM', student: 'Alexander Sterling', subject: 'Quantum Mechanics', status: 'upcoming' },
                { time: '01:00 PM', student: 'Sophia Chen', subject: 'Linear Algebra', status: 'upcoming' },
                { time: '03:30 PM', student: 'Marcus Vane', subject: 'Astrophysics', status: 'upcoming' },
                { time: '08:00 AM', student: 'Elena Rossi', subject: 'Vector Calculus', status: 'completed' },
              ].map((item, i) => (
                <div key={i} className="flex items-center py-3 border-b border-white/5 last:border-0">
                  <div className="w-24 text-sm font-bold text-indigo-300">{item.time}</div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{item.student}</div>
                    <div className="text-xs text-white/40">{item.subject}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold ${
                    item.status === 'upcoming' 
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="right-col flex flex-col gap-8">
          {/* Pending Requests */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-8 rounded-3xl"
          >
            <h3 className="font-serif text-xl text-white mb-6">Pending Bookings</h3>
            <div className="flex flex-col gap-4">
              {[
                { student: 'Julian Thorne', subject: 'Relativity', time: 'Mon, 24 Apr • 2:00 PM' },
                { student: 'Isabella Grant', subject: 'Calculus III', time: 'Tue, 25 Apr • 10:00 AM' },
              ].map((req, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30"></div>
                    <div>
                      <div className="font-medium text-white text-sm">{req.student}</div>
                      <div className="text-xs text-white/40">{req.subject}</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-indigo-300 bg-indigo-500/10 py-2 px-3 rounded-lg text-center mb-4 border border-indigo-500/20">
                    {req.time}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                      <X size={14} /> Reject
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/40 border border-indigo-500/30 transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      <Check size={14} /> Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full text-white/30 text-xs font-medium hover:text-white transition-colors mt-6 uppercase tracking-widest">
              View all requests
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-8 rounded-3xl"
          >
            <h3 className="font-serif text-xl text-white mb-6">Week at a Glance</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl font-bold text-indigo-300 mb-1">12</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40">Lessons</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl font-bold text-emerald-300 mb-1">98%</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40">Done</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-2xl font-bold text-amber-300 mb-1">4.9</div>
                <div className="text-[9px] uppercase tracking-widest text-white/40">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TutorHome;
