import React from 'react';
import { Plus, Brain, User, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const StudyPlans: React.FC = () => {
  const plans = [
    { student: 'Alexander Sterling', topic: 'Quantum Foundations', progress: 65, sessions: 12, completed: 8, lastUpdate: '2 days ago' },
    { student: 'Sophia Chen', topic: 'Linear Algebra Intensive', progress: 40, sessions: 8, completed: 3, lastUpdate: 'Yesterday' },
    { student: 'Julian Thorne', topic: 'General Relativity Prep', progress: 10, sessions: 15, completed: 1, lastUpdate: 'Just now' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">Study Plans</h1>
          <p className="text-white/50 tracking-wide">Design and track personalized learning paths for your students.</p>
        </div>
        <button className="glass-button-primary px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold">
          <Plus size={16} /> Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {plans.map((plan, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-6 rounded-3xl group hover:border-indigo-500/50 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-shadow">
                <Brain size={32} />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                  <User size={12} /> {plan.student}
                </div>
                <h3 className="text-xl font-serif text-white mb-5">{plan.topic}</h3>
                
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-2">
                      <span className="text-white/40">Progress</span>
                      <span className="text-indigo-300">{plan.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${plan.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-400 to-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.6)]"
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-lg font-serif text-white">{plan.sessions}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-serif text-emerald-300 flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        {plan.completed}
                      </div>
                      <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Done</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 md:border-l border-white/10 md:pl-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-left md:text-right">
                  <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-1">Last update</div>
                  <div className="text-sm text-white/70 font-medium">{plan.lastUpdate}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 group-hover:border-indigo-500/40 transition-all">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 p-10 border border-dashed border-white/20 rounded-[2rem] text-center bg-white/5 hover:bg-white/[0.07] transition-colors cursor-pointer group"
      >
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white/30 group-hover:text-white/60 transition-colors group-hover:scale-110 duration-300">
          <FileText size={32} />
        </div>
        <h3 className="text-xl font-serif text-white mb-3">Build a new roadmap</h3>
        <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          Start by selecting a student and defining their learning objectives for the next term.
        </p>
        <button className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/10 text-white hover:bg-white/10 transition-colors">
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
};

export default StudyPlans;
