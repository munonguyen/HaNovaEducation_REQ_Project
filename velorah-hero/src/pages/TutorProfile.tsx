import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, GraduationCap, Clock, Award, ChevronLeft, Calendar as CalendarIcon } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import { useState, useRef } from 'react';

export default function TutorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom scroll logic for subtle parallax on hero text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mock Data
  const tutorName = `Dr. Nguyen ${id || '1'}`;
  const subjects = ['Mathematics', 'Advanced Calculus', 'Statistical Analysis'];
  
  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full relative pb-20"
    >
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        tutorName={tutorName} 
      />

      {/* Back Button */}
      <button 
        onClick={() => navigate('/tutors')}
        className="absolute top-0 left-0 z-20 flex items-center gap-2 text-moonlight-gray hover:text-white transition-colors duration-300"
      >
        <ChevronLeft size={16} /> <span>Back to Directory</span>
      </button>

      {/* Magazine-style Asymmetrical Header */}
      <div className="flex flex-col md:flex-row gap-12 mt-16 relative">
        <motion.div 
          className="md:w-5/12 sticky top-40 self-start"
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl lg:text-[80px] font-serif leading-[0.95] text-white tracking-tight"
          >
            {tutorName}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-1 bg-muted-amber mt-8 mb-8"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-moonlight-gray leading-relaxed font-light"
          >
            "My goal isn't just to help you pass an exam. It's to build a mental framework where mathematics ceases to be a chore and becomes a language you naturally speak."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6 mt-12 mb-8"
          >
            <div className="flex gap-1 items-center">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-muted-amber text-muted-amber" />)}
            </div>
            <span className="text-moonlight-gray text-sm">4.92 / 5.0 (184 Verified Reviews)</span>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            onClick={() => setIsBookingOpen(true)}
            className="glass-button-primary pulse-glow w-full xl:w-auto px-10 py-4 rounded-full text-white font-medium bg-muted-amber/20 border border-muted-amber/40 hover:bg-muted-amber/30 transition-all flex justify-center items-center gap-3"
          >
            <CalendarIcon size={18} /> Reseve  Time — $25/hr
          </motion.button>
        </motion.div>

        {/* Right side Visual Content & Details */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:w-7/12 flex flex-col gap-10"
        >
          {/* Hero Portrait */}
          <div className="w-full h-[500px] rounded-[32px] overflow-hidden relative group">
            <img 
              src={`https://ui-avatars.com/api/?name=Dr+Name&background=3B4A7A&color=fff&size=512`} 
              alt={tutorName}
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 filter grayscale hover:grayscale-0"
              style={{ objectPosition: 'center top' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 flex gap-3">
              {subjects.map(sub => (
                <span key={sub} className="glass-panel px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 border-moonlight-gray/20 backdrop-blur-md">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Profile */}
          <div className="glass-panel rounded-[32px] p-10 bg-soft-charcoal/40 border-moonlight-gray/20">
            <h3 className="text-2xl font-serif text-white mb-8 border-b border-white/10 pb-4">Academic Pedigree</h3>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex flex-shrink-0 items-center justify-center text-muted-amber">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-medium">Ph.D. in Applied Mathematics</h4>
                  <p className="text-moonlight-gray mt-1">Stanford University, 2018</p>
                  <p className="text-sm text-moonlight-gray/70 mt-2 leading-relaxed">Focus on complex systems and predictive modeling. Published 12 peer-reviewed articles.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex flex-shrink-0 items-center justify-center text-muted-amber">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-medium">Excellence in Teaching Award</h4>
                  <p className="text-moonlight-gray mt-1">Hanoi National University, 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Grid */}
          <div className="glass-panel rounded-[32px] p-10 bg-soft-charcoal/40 border-moonlight-gray/20">
             <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                <h3 className="text-2xl font-serif text-white">Availability</h3>
                <span className="text-moonlight-gray flex items-center gap-2"><Clock size={16}/> GMT+7</span>
             </div>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               {['Mon', 'Wed', 'Fri', 'Sat'].map(day => (
                 <div key={day} className="bg-midnight-navy/40 border border-moonlight-gray/10 rounded-xl p-4 text-center">
                    <p className="text-moonlight-gray uppercase text-xs mb-3">{day}</p>
                    <div className="space-y-2">
                       <div className="text-sm text-cream bg-white/5 py-1.5 rounded-md">18:00 - 20:00</div>
                       <div className="text-sm text-cream bg-white/5 py-1.5 rounded-md">20:30 - 22:30</div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
