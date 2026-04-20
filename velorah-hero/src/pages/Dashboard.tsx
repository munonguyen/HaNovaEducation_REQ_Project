import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Video, FileText, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col gap-16 py-8"
    >
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <p className="text-moonlight-gray font-medium tracking-wide uppercase text-sm mb-4">Your Sanctuary</p>
        <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1]">
          Good evening, <br/>
          <span className="text-cream/70">the momentum is yours.</span>
        </h1>
      </motion.div>

      {/* Focus Area: Next Lesson */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-muted-amber/20 to-indigo/20 rounded-[34px] blur-lg opacity-40"></div>
        <div className="relative glass-panel rounded-[32px] p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 bg-soft-charcoal/60 border-muted-amber/20">
          <div className="flex gap-6 items-start lg:items-center">
            <div className="w-16 h-16 rounded-full bg-muted-amber/10 flex items-center justify-center shrink-0 border border-muted-amber/30">
               <Video size={28} className="text-muted-amber" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[11px] text-cream uppercase tracking-widest border border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-amber animate-pulse"></span>
                  Up Next
                </span>
                <span className="text-sm text-moonlight-gray flex items-center gap-1"><Clock size={14} /> Starts in 45 mins</span>
              </div>
              <h3 className="text-2xl font-serif text-white mb-1">Advanced Calculus: Limits & Continuity</h3>
              <p className="text-moonlight-gray">with Dr. Nguyen 1 • Video Call</p>
            </div>
          </div>
          
          <button className="glass-button-primary pulse-glow w-full lg:w-auto px-10 py-4 rounded-full text-white font-medium bg-muted-amber/20 border border-muted-amber/40 hover:bg-muted-amber/30 transition-all flex justify-center items-center gap-2 shrink-0">
            Enter Studio <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>

      {/* Grid: Schedule & Plans */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Column: This Week's Agenda */}
        <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-serif text-white">This Week's Agenda</h4>
            <Link to="/schedule" className="text-sm text-moonlight-gray hover:text-white transition-colors flex items-center gap-1">
              View Calendar <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="flex flex-col gap-4">
            {[ 
              { date: '12', day: 'Wed', title: 'Macroeconomics Discussion', time: '10:00 AM', status: 'upcoming' },
              { date: '14', day: 'Fri', title: 'Physics Labs: Mechanics', time: '02:30 PM', status: 'upcoming' },
              { date: '15', day: 'Sat', title: 'Self-Study: Integral Formulas', time: '09:00 AM', status: 'self' },
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl flex items-center gap-6 bg-midnight-navy/40 border-moonlight-gray/10 hover:bg-midnight-navy/60 transition-colors group cursor-pointer">
                <div className="flex flex-col items-center justify-center shrink-0 w-12 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs uppercase text-moonlight-gray">{item.day}</span>
                  <span className="text-2xl font-serif text-white">{item.date}</span>
                </div>
                <div className="w-px h-10 bg-moonlight-gray/20"></div>
                <div className="flex-1">
                  <h5 className="text-cream text-lg group-hover:text-muted-amber transition-colors">{item.title}</h5>
                  <p className="text-sm text-moonlight-gray">{item.time}</p>
                </div>
                <div className="hidden sm:block">
                  {item.status === 'upcoming' 
                    ? <span className="px-4 py-1.5 rounded-full text-xs bg-indigo-dark/30 text-indigo-100 border border-indigo/30">Lesson</span>
                    : <span className="px-4 py-1.5 rounded-full text-xs bg-white/5 text-moonlight-gray border border-white/10">Independent</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Active Study Path */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
           <div className="flex items-center justify-between">
            <h4 className="text-xl font-serif text-white">Active Milestone</h4>
          </div>
          
          <div className="glass-panel p-8 rounded-3xl bg-soft-charcoal/40 border-moonlight-gray/20 flex flex-col h-full">
            <div className="w-12 h-12 rounded-2xl bg-indigo/20 flex items-center justify-center mb-6 border border-indigo/30">
              <FileText size={20} className="text-indigo-200" />
            </div>
            
            <h5 className="text-xl font-medium text-white mb-2">Midterm Prep Mastery</h5>
            <p className="text-sm text-moonlight-gray mb-8">4 of 6 topics completed. You are pacing beautifully for next week's exam.</p>
            
            <div className="w-full h-1.5 bg-midnight-navy/60 rounded-full mb-8 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "66%" }}
                 transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                 className="h-full bg-muted-amber rounded-full" 
               />
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-3 text-sm text-moonlight-gray opacity-50">
                 <CheckCircle size={16} className="text-green-400" /> Topic 3: Limits
              </div>
              <div className="flex items-center gap-3 text-sm text-white font-medium">
                 <div className="w-4 h-4 rounded-full border border-muted-amber bg-muted-amber/20 flex-shrink-0" /> Focus: Differentiation Laws
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
