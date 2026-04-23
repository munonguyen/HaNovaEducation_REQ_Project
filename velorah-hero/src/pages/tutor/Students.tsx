import React from 'react';
import { Users, User, MoreVertical, Brain, Calendar, MessageSquare, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Students: React.FC = () => {
  const students = [
    { name: 'Alexander Sterling', activeLessons: 4, studyPlan: 'Quantum Foundations', lastActive: '2 hours ago' },
    { name: 'Sophia Chen', activeLessons: 2, studyPlan: 'Linear Algebra', lastActive: 'Yesterday' },
    { name: 'Julian Thorne', activeLessons: 6, studyPlan: 'General Relativity', lastActive: 'Just now' },
    { name: 'Marcus Vane', activeLessons: 1, studyPlan: 'None', lastActive: '3 days ago' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">Students & Groups</h1>
          <p className="text-white/50 tracking-wide">Manage your students and their learning progress.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-white/10 text-white hover:bg-white/10 transition-colors">
          <Users size={16} /> Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-6 rounded-3xl group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all group-hover:bg-indigo-500/20"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                <User size={24} />
              </div>
              <button className="text-white/20 hover:text-white/60 p-1 transition-colors"><MoreVertical size={20} /></button>
            </div>

            <h3 className="text-xl font-serif text-white mb-1 relative z-10">{student.name}</h3>
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-6 relative z-10">Active {student.lastActive}</p>

            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-white/50">
                  <Calendar size={16} className="text-white/20" /> Active Lessons
                </div>
                <div className="font-serif text-white text-lg">{student.activeLessons}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-white/50">
                  <Brain size={16} className="text-white/20" /> Study Plan
                </div>
                <div className={`text-[10px] uppercase tracking-widest font-bold ${student.studyPlan === 'None' ? 'text-white/20' : 'text-indigo-400'}`}>
                  {student.studyPlan}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              <button className="glass-button-primary justify-center py-2.5 rounded-xl text-xs font-semibold text-center">
                Profile
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                <MessageSquare size={14} /> Message
              </button>
            </div>
          </motion.div>
        ))}
        
        {/* Add Student Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: students.length * 0.1 }}
          className="border border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center text-white/30 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all cursor-pointer min-h-[320px] group"
        >
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-indigo-500/10 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-serif text-lg">Add New Student</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Students;
