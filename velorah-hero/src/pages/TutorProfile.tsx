import { type ReactNode, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Target,
  TrendingUp,
  UserCheck,
  Sparkles,
  MapPin,
  Globe2,
  Zap,
} from 'lucide-react';
import BookingModal from '../components/BookingModal';
import { getTutorById, tutorAvatars, tutorCovers } from '../services/tutors';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TutorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const tutor = getTutorById(id);

  const studentSatisfaction = useMemo(() => `${Math.min(99, 84 + Math.round(tutor.rating * 2))}%`, [tutor.rating]);
  const avatar = tutorAvatars[tutor.id] ?? tutorAvatars['1'];
  const coverImage = tutorCovers[tutor.id] ?? tutorCovers['1'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease }}
      className="w-full pb-28 font-sans min-h-screen selection:bg-indigo-500/30"
    >
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tutorName={tutor.name}
        hourlyRate={tutor.hourlyRate}
        subject={tutor.subjects[0]}
        formats={tutor.formats}
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation & Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/tutors')}
            className="group flex items-center gap-3 rounded-full bg-white/[0.03] border border-white/[0.08] px-4 py-2 text-xs uppercase tracking-widest text-white/60 transition-all hover:bg-white/[0.08] hover:text-white"
          >
            <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Discovery
          </button>
        </div>

        {/* Hero Meta Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative mb-10 rounded-[40px] border border-white/[0.08] overflow-hidden bg-[#0A0D18] flex flex-col"
        >
          {/* TOP HALF: Cover Image */}
          <div className="relative h-[220px] md:h-[280px] w-full">
             <div className="absolute inset-0 bg-[#0A0D18]">
                <img src={coverImage} alt="Cover profile" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D18]/90 via-[#0A0D18]/40 to-transparent"></div>
             </div>
          </div>

          {/* BOTTOM HALF: Info + Avatar overlap */}
          <div className="relative z-10 px-4 sm:px-6 pb-12 pt-0 md:px-12 md:pb-16 flex flex-col md:flex-row gap-6 md:gap-8 items-center text-center md:text-left md:items-end -mt-16 sm:-mt-20 md:-mt-24">
            <div className="shrink-0 relative group">
               <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 overflow-hidden rounded-[36px] bg-[#0A0D18] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 z-20 relative">
                 <img src={avatar} alt={tutor.name} className="w-full h-full object-cover rounded-[28px] transition-transform duration-700 group-hover:scale-105" />
               </div>
               <div className="absolute bottom-2 -right-2 flex items-center justify-center p-3 rounded-2xl border border-white/10 bg-[#0A0D18]/90 backdrop-blur-xl shadow-xl z-30">
                 <CheckCircle2 size={24} className="text-emerald-400" />
               </div>
            </div>

            <div className="flex-1 mt-2 md:mt-0 z-10 w-full pt-[2px]">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-300 backdrop-blur-md">
                     <Sparkles size={14} /> Elite Academic
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-emerald-300 backdrop-blur-md">
                     <CheckCircle2 size={14} /> Identity Verified
                  </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight mb-3 drop-shadow-md">{tutor.name}</h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 font-medium mb-6 max-w-2xl mx-auto md:mx-0 leading-relaxed drop-shadow-sm">
                 {tutor.headline}
              </p>
              
              {/* Detailed Meta Items (Degree, Location, Language) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-white/10 pt-5 mt-2">
                 <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/[0.04]">
                    <div className="h-10 w-10 shrink-0 flex border items-center justify-center rounded-xl bg-indigo-500/10 border-indigo-500/20">
                       <GraduationCap size={18} className="text-indigo-400"/> 
                    </div>
                    <div>
                       <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Specialty</p>
                       <p className="text-sm text-white/90 font-medium mt-0.5">{tutor.role}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/[0.04]">
                    <div className="h-10 w-10 shrink-0 flex border items-center justify-center rounded-xl bg-violet-500/10 border-violet-500/20">
                       <MapPin size={18} className="text-violet-400"/> 
                    </div>
                    <div>
                       <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Institution</p>
                       <p className="text-sm text-white/90 font-medium mt-0.5">{tutor.university}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/[0.04]">
                    <div className="h-10 w-10 shrink-0 flex border items-center justify-center rounded-xl bg-emerald-500/10 border-emerald-500/20">
                       <Globe2 size={18} className="text-emerald-400"/> 
                    </div>
                    <div>
                       <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Languages</p>
                       <p className="text-sm text-white/90 font-medium mt-0.5">{tutor.languages.join(', ')}</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Book Action Card inside Hero */}
            <div className="hidden xl:flex flex-col bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 md:p-8 rounded-[28px] w-full xl:w-[280px] shrink-0 self-center xl:items-end shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-4xl font-serif text-white mb-1 drop-shadow-sm">${tutor.hourlyRate}</p>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold mb-6">Per Session</p>
              <button onClick={() => setIsBookingOpen(true)} className="group relative w-full inline-flex items-center justify-between overflow-hidden rounded-[16px] bg-white px-6 py-4 text-sm font-bold text-black transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                 <span>Book Now</span>
                 <CalendarIcon size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="w-full text-center text-[10px] text-emerald-400 uppercase tracking-widest font-bold mt-5 flex items-center justify-center gap-1.5"><Clock3 size={12}/> Next: {tutor.nextSlots[0].split(' • ')[0]}</p>
            </div>
          </div>
        </motion.section>

        {/* Bento Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
            <StatCard label="Hourly Rate" value={`$${tutor.hourlyRate}`} sub="per session" icon={<Target size={20} />} colorName="amber" />
            <StatCard label="Student Rating" value={tutor.rating.toFixed(2)} sub={`${studentSatisfaction} satisfaction`} icon={<TrendingUp size={20} />} colorName="violet" />
            <StatCard label="Verified Reviews" value={`${tutor.reviews}`} sub="consistent output" icon={<UserCheck size={20} />} colorName="cyan" />
            <StatCard label="Avg Response" value={tutor.responseTime.replace('Replies ', '')} sub="SLA guaranteed" icon={<Zap size={20} />} colorName="emerald" />
        </motion.div>

        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 lg:items-start relative">
            
            {/* Left Sticky Sidebar */}
            <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 space-y-6 lg:sticky lg:top-8">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.2, ease }}
                 className="rounded-[32px] p-8 border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-white/[0.01]"
               >
                  <h3 className="text-2xl font-serif text-white mb-8">Tutor Identity</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold select-none">Primary Institution</p>
                      <p className="text-white/90 font-serif text-lg">{tutor.university}</p>
                    </div>

                    <div className="pt-6 border-t border-white/[0.04]">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold select-none">Headline Focus</p>
                      <p className="text-white/70 leading-relaxed text-[14px]">{tutor.headline}</p>
                    </div>

                    <div className="pt-6 border-t border-white/[0.04]">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-bold select-none">Delivery Formats</p>
                      <div className="flex flex-wrap gap-2">
                        {tutor.formats.map(fmt => (
                           <span key={fmt} className="px-3 py-1 rounded-full border border-white/10 text-[12px] text-white/70 bg-white/[0.02]">
                             {fmt}
                           </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/[0.04]">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4 font-bold select-none">Availability (GMT+7)</p>
                      <div className="space-y-3">
                        {tutor.weeklyAvailability.map(day => (
                           <div key={day.day} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                              <span className="text-sm font-semibold text-white/80">{day.day}</span>
                              <div className="flex gap-1.5">
                                 {day.slots.map(s => (
                                   <span key={s} className="text-[11px] bg-white/[0.06] px-2 py-1.5 rounded-lg text-white/70 font-medium">
                                     {s}
                                   </span>
                                 ))}
                              </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  </div>
               </motion.div>
            </aside>

            {/* Right Main Panel - One Page Editorial Layout */}
            <div className="flex-1 min-w-0 flex flex-col space-y-16 pb-20">
               {/* Philosophy & Methodology */}
               <section>
                 <h3 className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-8"><span className="w-12 h-px bg-white/20"></span> Teaching Philosophy</h3>
                 <div className="relative p-8 md:p-12 rounded-[32px] border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white/90 italic leading-relaxed mb-6">
                   "{tutor.quote}"
                 </h2>   <p className="text-white/60 text-lg md:text-xl leading-relaxed font-serif max-w-3xl">{tutor.intro}</p>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {tutor.teachingStyle.map((style, idx) => (
                       <div key={idx} className="p-8 rounded-[24px] border border-white/[0.04] bg-white/[0.01]">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 font-bold">Framework Phase 0{idx + 1}</p>
                          <h4 className="text-white text-lg font-serif mb-3 leading-snug">{style}</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Systematically implemented to ensure robust conceptual consolidation and prevent knowledge gaps before advancing to next-level curriculum challenges.</p>
                       </div>
                    ))}
                 </div>
               </section>

               {/* Academic Trajectory */}
               <section>
                 <h3 className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-8"><span className="w-12 h-px bg-white/20"></span> Career Trajectory</h3>
                 <div className="grid gap-6">
                   {tutor.achievements.map((item, i) => (
                     <div key={i} className="group relative overflow-hidden p-8 md:p-10 rounded-[24px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-white/20 transition-all">
                        <span className="absolute -right-4 -bottom-8 text-[140px] font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors pointer-events-none select-none font-serif leading-none">
                          0{i + 1}
                        </span>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-blue-400 mb-3 font-bold font-sans">Professional Milestone</p>
                        <h4 className="text-xl md:text-2xl text-white font-medium leading-relaxed font-serif relative z-10 mb-4 max-w-2xl">{item}</h4>
                        <div className="grid md:grid-cols-2 gap-6 text-white/40 text-[15px] leading-relaxed relative z-10">
                           <p>This critical milestone heavily forged the pedagogical rigor required to guide students through the complexities of {tutor.subjects[0] || 'advanced academics'}.</p>
                           <p>Leveraging this profound real-world experience, abstract syllabus theories are reliably transformed into high-impact, retentive strategies.</p>
                        </div>
                     </div>
                   ))}
                 </div>
               </section>

               {/* Expertise Matrix */}
               <section>
                 <h3 className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-8"><span className="w-12 h-px bg-white/20"></span> Domain Expertise</h3>
                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                   {tutor.expertise.map(exp => (
                     <div key={exp} className="p-8 rounded-[24px] bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                        <h4 className="text-xl text-white font-serif mb-3 leading-snug">{exp}</h4>
                        <p className="text-white/40 text-[13px] leading-relaxed">Comprehensive mastery and robust pedagogical methodologies tailored specifically for academic prerequisites.</p>
                     </div>
                   ))}
                 </div>
               </section>

               {/* Outcomes & Reviews */}
               <section>
                 <h3 className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50 mb-8"><span className="w-12 h-px bg-white/20"></span> Verified Outcomes</h3>
                 
                 <div className="grid gap-6 mb-6">
                    {tutor.outcomes.map((outcome, idx) => (
                       <div key={idx} className="p-6 md:p-8 rounded-[24px] border-l-4 border-white/20 bg-white/[0.02] pl-8">
                          <p className="text-lg md:text-xl font-serif text-white/80 leading-relaxed">{outcome}</p>
                       </div>
                    ))}
                 </div>

                 <div className="grid gap-4 mt-8">
                   {tutor.reviewsPreview.map(rev => (
                     <div key={rev.name} className="p-8 md:p-10 rounded-[24px] border border-white/[0.04] bg-white/[0.01] flex flex-col md:flex-row gap-8 justify-between hover:bg-white/[0.03] transition-colors">
                        <h4 className="text-xl md:text-2xl font-serif text-white/90 italic md:max-w-[70%] leading-relaxed">"{rev.quote}"</h4>
                        <div className="md:text-right shrink-0">
                           <p className="text-white font-medium text-lg mb-1">{rev.name}</p>
                           <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{rev.school}</p>
                        </div>
                     </div>
                   ))}
                 </div>
               </section>
            </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-[1000] border-t border-white/10 bg-[#05070f]/95 p-4 pb-28 backdrop-blur-2xl md:hidden">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="flex w-full items-center justify-between rounded-[20px] bg-white px-6 py-4 text-base font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <span>Book Session</span>
            <div className="flex items-center gap-2 text-black/80 text-sm font-semibold">
               <span>${tutor.hourlyRate}</span>
               <span className="w-1 h-1 rounded-full bg-black/30"></span>
               <span>{tutor.nextSlots[0]}</span>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, sub, icon, colorName }: { label: string; value: string; sub: string; icon: ReactNode; colorName: 'amber' | 'violet' | 'cyan' | 'emerald' }) {
  const colorConfig = {
    amber: { bg: "bg-amber-500/20", iconRef: "text-amber-400 bg-amber-500/10 ring-amber-500/20" },
    violet: { bg: "bg-violet-500/20", iconRef: "text-violet-400 bg-violet-500/10 ring-violet-500/20" },
    cyan: { bg: "bg-cyan-500/20", iconRef: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/20" },
    emerald: { bg: "bg-emerald-500/20", iconRef: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20" },
  };

  const currentConfig = colorConfig[colorName];

  return (
     <div className="relative group overflow-hidden rounded-[24px] md:rounded-[28px] border border-white/[0.06] bg-[#0A0D18] p-4 md:p-6 transition-all duration-300 hover:bg-white/[0.03] hover:border-white/[0.12] hover:-translate-y-1">
        <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full ${currentConfig.bg} transition-opacity duration-500 group-hover:opacity-100 opacity-60`}></div>
        <div className="relative z-10 flex flex-col justify-between h-full space-y-4 md:space-y-6">
           <div className="flex items-center justify-between">
              <span className="text-white/40 text-[10px] md:text-xs font-bold tracking-widest uppercase">{label}</span>
              <div className={`p-2 rounded-[12px] md:p-2.5 md:rounded-[14px] ring-1 ${currentConfig.iconRef}`}>
                 {icon}
              </div>
           </div>
           <div>
              <span className="text-2xl md:text-4xl font-serif text-white tracking-tight drop-shadow-sm">{value}</span>
              <p className="text-white/40 text-[11px] md:text-[13px] mt-1 font-medium">{sub}</p>
           </div>
        </div>
     </div>
  );
}
