import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';

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

export default function Tutors() {
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col gap-10"
    >
      <BookingModal 
        isOpen={!!selectedTutor} 
        onClose={() => setSelectedTutor(null)} 
        tutorName={selectedTutor || ''} 
      />

      {/* Search & Filter Row */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full glass-panel rounded-2xl p-6 flex flex-wrap gap-4 items-center justify-between bg-soft-charcoal/40 border-moonlight-gray/20"
      >
        <div className="flex bg-midnight-navy/40 border border-moonlight-gray/20 rounded-xl px-4 py-3 min-w-[280px]">
          <Search size={18} className="text-moonlight-gray mr-3" />
          <input type="text" placeholder="Search tutors..." className="bg-transparent outline-none text-sm w-full text-cream placeholder-moonlight-gray" />
        </div>
        <div className="flex gap-4">
          <select className="bg-midnight-navy/40 border border-moonlight-gray/20 rounded-xl px-4 py-3 text-sm outline-none text-cream appearance-none cursor-pointer hover:bg-midnight-navy/60 transition-colors">
            <option className="bg-midnight-navy text-cream">All Subjects</option>
            <option className="bg-midnight-navy text-cream">Mathematics</option>
            <option className="bg-midnight-navy text-cream">Physics</option>
          </select>
          <select className="bg-midnight-navy/40 border border-moonlight-gray/20 rounded-xl px-4 py-3 text-sm outline-none text-cream appearance-none cursor-pointer hover:bg-midnight-navy/60 transition-colors">
            <option className="bg-midnight-navy text-cream">All Prices</option>
            <option className="bg-midnight-navy text-cream">Under $20/hr</option>
          </select>
        </div>
      </motion.div>

      {/* Tutor Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[1, 2, 3, 4, 5, 6].map(i => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
            className="glass-panel rounded-2xl p-6 flex flex-col gap-5 bg-soft-charcoal/30 border-moonlight-gray/20 transition-colors duration-500 ease-out"
          >
            <Link to={`/tutors/${i}`} className="flex gap-4 items-center cursor-pointer group">
              <img src={`https://ui-avatars.com/api/?name=Dr+Name${i}&background=3B4A7A&color=fff`} alt="Avatar" className="w-16 h-16 rounded-full border border-indigo/40 lg:group-hover:scale-105 transition-transform" />
              <div>
                <h3 className="text-xl font-serif text-white group-hover:text-muted-amber transition-colors">Dr. Nguyen {i}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={14} className="text-muted-amber fill-muted-amber" />
                  <span className="text-xs text-moonlight-gray">4.9 (120 reviews)</span>
                </div>
              </div>
            </Link>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-indigo-dark/40 rounded-full text-[11px] text-cream border border-indigo/30">Mathematics</span>
              <span className="px-3 py-1 bg-indigo-dark/40 rounded-full text-[11px] text-cream border border-indigo/30">Calculus</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-moonlight-gray/10">
              <div className="text-sm"><strong className="text-muted-amber font-medium text-lg">$25</strong><span className="text-moonlight-gray text-xs ml-1">/hr</span></div>
              <button 
                onClick={() => setSelectedTutor(`Dr. Nguyen ${i}`)}
                className="glass-button-secondary px-5 py-2 rounded-lg text-sm transition-all hover:bg-muted-amber/20 hover:border-muted-amber/40 hover:text-white"
              >
                Book Session
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
