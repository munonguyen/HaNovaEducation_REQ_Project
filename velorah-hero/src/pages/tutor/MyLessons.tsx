import React, { useState } from 'react';
import { Search, Calendar, User, Video, MapPin, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyLessons: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const lessons = [
    { student: 'Alexander Sterling', subject: 'Quantum Mechanics', time: 'Today, 10:30 AM', format: 'Online', status: 'upcoming' },
    { student: 'Sophia Chen', subject: 'Linear Algebra', time: 'Today, 1:00 PM', format: 'Online', status: 'upcoming' },
    { student: 'Marcus Vane', subject: 'Astrophysics', time: 'Today, 3:30 PM', format: 'Offline', status: 'upcoming' },
    { student: 'Elena Rossi', subject: 'Vector Calculus', time: 'Yesterday, 8:00 AM', format: 'Online', status: 'completed' },
  ];

  const filteredLessons = lessons.filter(l => l.status === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">My Lessons</h1>
          <p className="text-white/50 tracking-wide">Track and manage all your teaching sessions.</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input 
            type="text" 
            placeholder="Search student or subject..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all text-sm placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="flex gap-8 border-b border-white/10 mb-10">
        {['upcoming', 'completed', 'cancelled'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab ? 'border-indigo-400 text-indigo-300' : 'border-transparent text-white/30 hover:text-white/60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredLessons.length > 0 ? filteredLessons.map((lesson, i) => (
            <motion.div 
              key={lesson.student + lesson.time}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-panel p-6 rounded-3xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all group-hover:bg-indigo-500/20"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white mb-0.5">{lesson.student}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">{lesson.subject}</p>
                  </div>
                </div>
                <button className="text-white/20 hover:text-white/60 p-1 transition-colors"><MoreVertical size={20} /></button>
              </div>

              <div className="space-y-3 mb-8 relative z-10">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Calendar size={16} className="text-white/30" />
                  {lesson.time}
                </div>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  {lesson.format === 'Online' ? <Video size={16} className="text-white/30" /> : <MapPin size={16} className="text-white/30" />}
                  {lesson.format} Session
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <button className="glass-button-primary flex-1 justify-center py-2.5 rounded-xl text-xs font-semibold">
                  {lesson.status === 'upcoming' ? 'Enter Session' : 'View Notes'}
                </button>
                <button className="flex-1 justify-center py-2.5 rounded-xl text-xs font-semibold border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                  Reschedule
                </button>
              </div>
            </motion.div>
          )) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Calendar size={32} className="text-white/20" />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">No {activeTab} lessons found</h3>
              <p className="text-white/40 text-sm">Your schedule looks clear for now.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MyLessons;
