import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const navigate = useNavigate();

  // Scroll animations for showcase video
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "center center"]
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);


  return (
    <div className="w-full flex flex-col items-center">

      {/* ═══ 1. HERO — Clean fullscreen video, NO text overlay ═══ */}
      <div className="w-full h-[100vh] relative">
        <div className="absolute inset-x-4 top-4 bottom-4 md:inset-x-8 md:top-6 md:bottom-6 rounded-[32px] overflow-hidden">
          <motion.video
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: 'linear' }}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
            src="/hanova_overview.mp4"
          />
          {/* Subtle bottom gradient for content transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020205]/80" />
        </div>
      </div>

      {/* ═══ 2. HEADLINE SECTION — Below video ═══ */}
      <div className="w-full max-w-5xl px-6 md:px-12 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05]"
        >
          Study with <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">Structure</span>.<br />Progress with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Clarity</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mt-10 leading-relaxed"
        >
          HaNova connects you with the right mentors, structured plans, and a clear path to academic success.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="flex items-center justify-center gap-6 mt-14"
        >
          <button
            onClick={() => navigate('/tutors')}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full font-semibold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300"
          >
            Start Learning
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-10 py-4 border border-white/20 text-white rounded-full text-sm uppercase tracking-widest hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            View Plans
          </button>
        </motion.div>

      {/* Session notifier */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease }}
          className="mt-16 inline-flex items-center gap-3 bg-white/[0.04] backdrop-blur-md border border-white/[0.08] px-6 py-3 rounded-full"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <p className="text-[12px] text-white/60 tracking-wide">Next Session: Calculus with Minh Anh – Tomorrow, 19:00</p>
        </motion.div>
      </div>

      {/* ═══ NEW: INFINITE SCROLLING MARQUEE (Creative Element) ═══ */}
      <div className="w-full py-10 relative overflow-hidden bg-white/[0.01] border-y border-white/[0.05] flex items-center">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020205] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020205] to-transparent z-10" />
        
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex whitespace-nowrap items-center w-max"
        >
          {/* Double array for seamless loop */}
          {[1, 2].map((group) => (
            <div key={group} className="flex items-center gap-16 px-8">
              {[
                { title: "2000+", subtitle: "Active Students", icon: "👩‍🎓" },
                { title: "98%", subtitle: "Pass Rate", icon: "📈" },
                { title: "Harvard, MIT, Oxford", subtitle: "Tutor Alumni", icon: "🏛️" },
                { title: "24/7", subtitle: "Tracking", icon: "⚡" },
                { title: "Personalized", subtitle: "Roadmaps", icon: "🗺️" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-2xl grayscale opacity-60">{item.icon}</span>
                  <div>
                    <h5 className="text-white font-serif text-xl tracking-wide">{item.title}</h5>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">{item.subtitle}</p>
                  </div>
                  {i !== 4 && <div className="w-1.5 h-1.5 rounded-full bg-white/10 ml-8" />}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ═══ NEW: COLLABORATIVE PHOTO GALLERY (Creative Visuals) ═══ */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[450px]">
          {/* Card 1: Study Session */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="md:col-span-4 rounded-[32px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group h-[300px] md:h-full"
          >
            <div className="absolute inset-0 bg-[#020205]/20 group-hover:bg-transparent transition-all duration-500 z-10" />
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=1200&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
          </motion.div>
          
          {/* Card 2: Digital Notes focus */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="md:col-span-5 rounded-[32px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group h-[300px] md:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] to-transparent z-10 opacity-60" />
            <img src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=1000&h=800&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-white font-serif text-2xl">Precision</p>
            </div>
          </motion.div>

          {/* Card 3: Deep Focus */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="md:col-span-3 rounded-[32px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group h-[300px] md:h-full"
          >
            <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=1200&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" />
          </motion.div>
        </div>
      </div>

      {/* ═══ 3. VALUE PROPOSITION ═══ */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="md:w-1/3"
          >
            <h2 className="text-4xl md:text-5xl text-white font-serif tracking-tight">
              Engineered<br />for <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Results</span>.
            </h2>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bento Box 1 - Span full width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease }}
              className="md:col-span-2 p-10 rounded-3xl bg-white/[0.04] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-500 relative overflow-hidden group shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-500/15 to-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:from-blue-500/30 group-hover:to-cyan-500/20 transition-all duration-700" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-blue-400/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <h3 className="text-2xl text-white font-serif mb-4">Unmatched Clarity</h3>
              <p className="text-white/60 leading-relaxed max-w-xl">Know exactly what to study, when, and why. Our advanced academic tracking ensures you never feel lost, with dynamic roadmaps adapting to your pace.</p>
            </motion.div>

            {/* Bento Box 2 */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-100px' }}
               transition={{ duration: 0.8, delay: 0.1, ease }}
               className="p-10 rounded-3xl bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-500 relative overflow-hidden group shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
             >
               <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 blur-[50px] rounded-full pointer-events-none group-hover:from-violet-500/30 group-hover:to-fuchsia-500/20 transition-all duration-700" />
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-400/10 border border-violet-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all">
                 <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
               </div>
               <h3 className="text-xl text-white font-serif mb-3">Structured Flow</h3>
               <p className="text-white/60 leading-relaxed text-sm">Every lesson is part of a guided academic plan, intentionally ordered for maximum retention.</p>
            </motion.div>

            {/* Bento Box 3 */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-100px' }}
               transition={{ duration: 0.8, delay: 0.2, ease }}
               className="p-10 rounded-3xl bg-white/[0.04] border border-white/[0.08] hover:border-teal-500/30 hover:bg-white/[0.06] transition-all duration-500 relative overflow-hidden group shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
             >
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-teal-500/15 to-emerald-500/10 blur-[50px] rounded-full pointer-events-none group-hover:from-teal-500/30 group-hover:to-emerald-500/20 transition-all duration-700" />
               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-400/10 border border-teal-400/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(20,184,166,0.15)] group-hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all">
                 <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
               </div>
               <h3 className="text-xl text-white font-serif mb-3">Premium Guidance</h3>
               <p className="text-white/60 leading-relaxed text-sm">Learn exclusively with vetted mentors who understand high-level goals and structured pedagogy.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ 4. SHOWCASE VIDEO — Cinematic with Parallax Scroll ═══ */}
      <div className="w-full py-32" ref={showcaseRef}>
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="w-full max-w-6xl mx-auto px-6 overflow-hidden rounded-[32px] md:rounded-[48px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10"
        >
          <div className="relative aspect-video w-full group">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="/showcase-video.mp4" />
            
            {/* Cinematic Gradients to blend into the site */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-x from-[#020205]/40 via-transparent to-[#020205]/40 pointer-events-none" />

            {/* Overlay Text inside the video */}
            <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-3 drop-shadow-md">The Experience</p>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg leading-tight text-shadow">
                See HaNova in <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Action</span>
              </h2>
              <div className="flex items-center gap-3 bg-white/[0.15] backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full inline-flex cursor-pointer hover:bg-white/20 transition-all hover:scale-105">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                <span className="text-[11px] text-white font-medium uppercase tracking-[0.15em]">Live Desktop Preview</span>
              </div>
            </div>
            
            {/* Floating Glassmorphic Badge */}
            <div className="absolute top-10 right-10 md:top-12 md:right-12 bg-white/10 backdrop-blur-lg border border-white/15 px-4 py-3 rounded-2xl flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                 <svg className="w-5 h-5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <div>
                 <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Showcase</p>
                 <p className="text-xs text-white font-medium">Virtual Classroom</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ 5. HOW IT WORKS ═══ */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-32">
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="text-4xl md:text-5xl font-serif text-white"
          >
            A logical flow to <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">mastery</span>.
          </motion.h2>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 mt-20">
          {/* Animated curved background line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 hidden md:flex">
            <svg viewBox="0 0 1000 200" fill="none" className="w-[80%]">
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                viewport={{ once: true }}
                d="M 50,100 C 200,-50 300,250 500,100 C 700,-50 800,250 950,100" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="8 8" 
                className="text-white"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Find the Right Tutor', desc: 'Browse curated profiles by subject, level, and specific academic goals.', gradient: 'from-blue-500 to-cyan-500', bgGlow: 'bg-blue-500/10', offset: 'md:-translate-y-12' },
              { num: '02', title: 'Book with Clarity', desc: 'Seamlessly schedule time slots with full visibility of curriculum and pricing.', gradient: 'from-violet-500 to-fuchsia-500', bgGlow: 'bg-violet-500/10', offset: 'md:translate-y-8' },
              { num: '03', title: 'Follow the Plan', desc: 'Engage in a structured progression rather than ad-hoc tutoring sessions.', gradient: 'from-teal-500 to-emerald-500', bgGlow: 'bg-teal-500/10', offset: 'md:-translate-y-4' },
              { num: '04', title: 'Reach Mastery', desc: 'Monitor your improvement and achieve milestones with clear metrics.', gradient: 'from-amber-400 to-orange-500', bgGlow: 'bg-amber-500/10', offset: 'md:translate-y-12' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: i * 0.2, ease }}
                className={`flex flex-col relative w-full h-full ${step.offset}`}
              >
                {/* The card itself - removed overflow-hidden to allow badge to break out safely */}
                <div className="group relative flex flex-col items-center text-center p-8 pt-12 rounded-[32px] bg-white/[0.03] backdrop-blur-md border border-white/[0.05] hover:border-white/20 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:-translate-y-2 h-[280px]">
                  
                  {/* Internal ambient glow */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 ${step.bgGlow} blur-[60px] rounded-full pointer-events-none transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-50`} />
                  
                  {/* Embedded Number Badge (fixed layout issue) */}
                  <div className="mb-6 z-20">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
                      <span className="text-white font-serif text-xl font-bold">{step.num}</span>
                    </div>
                  </div>

                  <h4 className="text-xl text-white font-serif mb-4 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">{step.title}</h4>
                  <p className="text-sm text-white/55 leading-relaxed relative z-10 px-2">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 6. FEATURED TUTORS ═══ */}
      <div className="w-full py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease }}
                className="text-4xl md:text-5xl font-serif text-white mb-4"
              >Selected <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Mentors</span></motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="text-white/50 text-sm md:text-base max-w-md"
              >Carefully chosen for expertise, clarity, and teaching approach.</motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={() => navigate('/tutors')}
              className="text-xs uppercase tracking-widest font-medium border-b border-white/40 text-white/60 hover:text-white hover:border-white pb-1 transition-all"
            >View Roster</motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Elena Rostova', sub: 'Advanced Mathematics', cred: 'Top graduate – Hanoi University of Science', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&q=80' },
              { name: 'James Holden', sub: 'Physics & Engineering', cred: '5+ years mentoring experience', img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&h=1000&fit=crop&q=80' },
              { name: 'Sophie Chen', sub: 'Literature & Composition', cred: 'Published Author & Evaluator', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop&q=80' },
            ].map((tutor, i) => (
              <motion.div
                key={tutor.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease }}
                className="flex flex-col gap-6 group cursor-pointer"
                onClick={() => navigate('/tutors')}
              >
                <div className="w-full h-[450px] overflow-hidden rounded-3xl relative shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/5 group-hover:border-white/20 transition-colors duration-500">
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-[#020205]/40 to-transparent opacity-80 z-10" />
                  
                  {/* Subtle Top Inner Shadow */}
                  <div className="absolute inset-0 shadow-[inset_0_2px_20px_rgba(255,255,255,0.05)] z-20 pointer-events-none rounded-3xl" />

                  {/* Subject Tag Badge */}
                  <div className="absolute top-4 right-4 z-30 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                    <span className="text-[9px] text-white tracking-widest uppercase font-medium">{tutor.sub.split(' ')[0]}</span>
                  </div>

                  <img src={tutor.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" alt={tutor.name} />
                  
                  {/* Tutor Info perfectly positioned inside the card */}
                  <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-2xl font-serif text-white mb-2">{tutor.name}</h4>
                    <p className="text-sm text-white/60 mb-4">{tutor.sub}</p>
                    
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto">
                      <p className="text-[11px] text-white/40 uppercase tracking-widest border-t border-white/10 pt-4 mt-2">
                        {tutor.cred}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 7. STUDY PLAN ═══ */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-32 flex flex-col md:flex-row items-center gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
          className="md:w-1/2"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-8">A Clear<br /><span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Path Forward</span>.</h2>
          <p className="text-white/45 leading-relaxed max-w-md text-lg">
            Each lesson contributes to a structured academic plan tailored to your goals. No scattered notes. No lost progress. Just a continuous upward trajectory.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-10 px-8 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm uppercase tracking-widest hover:from-emerald-500/30 hover:to-teal-500/30 hover:shadow-[0_0_20px_rgba(52,211,153,0.15)] transition-all duration-300"
          >
            Explore Plans
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }}
          className="md:w-1/2 w-full flex flex-col rounded-[32px] border border-white/[0.08] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ background: 'linear-gradient(160deg, rgba(16,18,32,0.98) 0%, rgba(8,10,18,0.95) 100%)' }}
        >
          {/* Subtle glow behind dashboard */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Header bar */}
          <div className="px-7 pt-7 pb-5 flex items-center justify-between border-b border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs text-white/80 uppercase tracking-[0.15em] font-medium">Study Plan</span>
            </div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold bg-white/[0.05] px-3 py-1.5 rounded-full">Week 8 of 16</span>
          </div>

          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Progress & Sessions */}
            <div className="flex flex-col gap-8">
              {/* Progress Ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease }}
                className="flex items-center gap-5"
              >
                <div className="relative">
                  <svg width="84" height="84" viewBox="0 0 90 90">
                    <circle cx="45" cy="45" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                    <circle cx="45" cy="45" r="40" fill="none" stroke="url(#progress-grad)" strokeWidth="5"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.68} ${2 * Math.PI * 40}`}
                      strokeLinecap="round" transform="rotate(-90 45 45)" />
                    <defs>
                      <linearGradient id="progress-grad" x1="0" y1="0" x2="90" y2="90">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-white leading-none mb-1">68</span>
                    <span className="text-[9px] text-emerald-400 font-medium">PERCENT</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">On Track</h4>
                  <p className="text-xs text-white/40 leading-relaxed">2 modules completed this week.</p>
                </div>
              </motion.div>

              {/* Upcoming sessions */}
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium mb-3">Schedule</p>
                <div className="flex gap-2">
                  {['M', 'T', 'W', 'T', 'F'].map((day, i) => (
                    <motion.div
                      key={i + day}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease }}
                      className={`flex-1 aspect-square flex items-center justify-center rounded-lg text-xs font-medium border ${
                        i === 1 || i === 3
                          ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                          : 'bg-white/[0.02] border-white/[0.04] text-white/30'
                      }`}
                    >
                      {day}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Modules */}
            <div className="flex flex-col gap-3">
              {[
                { name: 'Calculus II', progress: 100, status: 'Done', color: 'bg-emerald-400', icon: '∫' },
                { name: 'Linear Algebra', progress: 68, status: 'Active', color: 'bg-blue-400', icon: '⊞' },
                { name: 'Statistics', progress: 0, status: 'Locked', color: 'bg-white/20', icon: '∑' },
              ].map((mod, i) => (
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease }}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-white/70 text-sm font-serif">
                      {mod.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-[13px] text-white/90 font-medium">{mod.name}</h5>
                      <span className="text-[9px] text-white/40 uppercase tracking-wider">{mod.status}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mod.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.2, duration: 1, ease }}
                      className={`h-full rounded-full ${mod.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ 8. IMMERSIVE MEDIA BENTO (Creative Layout) ═══ */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-32 border-t border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-5">The HaNova Ecosystem</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-4xl md:text-5xl font-serif text-white">More than just tutoring.<br />A complete <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">academic network</span>.</h2>
            <p className="text-white/50 max-w-sm text-sm">We combine world-class pedagogy with a unified digital ecosystem designed entirely around your success.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          
          {/* Main Media Card (Spans 8 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-8 rounded-[32px] overflow-hidden relative group shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            {/* Very subtle bottom gradient just for text readability, keeping the image bright */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/90 via-[#020205]/10 to-transparent z-10 transition-opacity duration-500" />
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&q=80" alt="Students studying" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2.5s] ease-out brightness-110 saturate-[1.1]" />
            <div className="absolute bottom-10 left-10 z-20">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-white border border-white/30 mb-5 inline-block">Collaborative</span>
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-3">Engage directly with experts</h3>
              <p className="text-white/90 text-sm max-w-md">Our workspace isn't just a video call. It's a shared environment where ideas are drafted, tested, and mastered.</p>
            </div>
          </motion.div>

          {/* Vertical Video Card (Spans 4 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 rounded-[32px] overflow-hidden relative border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group h-[400px] md:h-auto bg-[#0a0f1d]"
          >
            {/* Extremely subtle bottom gradient just for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 z-10 bg-gradient-to-t from-[#020205] to-transparent pointer-events-none" />
            
            {/* Thematic Educational Video */}
            <video autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[3s] ease-out brightness-110 saturate-[1.1]" src="/showcase-video.mp4" />
            
            <div className="absolute top-6 right-6 z-20 flex px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
               <span className="text-[9px] uppercase font-bold tracking-wider text-white shadow-sm">Live System</span>
            </div>

            <div className="absolute bottom-10 left-8 right-8 z-20">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2 shadow-sm drop-shadow-md">Learn Anywhere</h3>
              <p className="text-white/90 text-sm drop-shadow-md">Full access to roadmaps and mentor chat right from your pocket.</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ═══ 9. CREATIVE TESTIMONIAL ═══ */}
      <div className="w-full py-32 flex flex-col items-center justify-center px-6 text-center border-t border-white/[0.02] bg-gradient-to-b from-transparent to-[#020205] relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease }}
           className="flex items-center gap-2 mb-12"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-3">
            {[
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            ].map((img, i) => (
              <img key={i} src={img} className="w-10 h-10 rounded-full border-2 border-[#020205] opacity-80 hover:opacity-100 hover:scale-110 transition-all cursor-pointer relative z-10" />
            ))}
          </div>
          <p className="text-xs text-white/40 ml-4">Joined by 2000+ ambitious minds.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }}
          className="max-w-4xl relative"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-snug mb-10">
            "Before HaNova, I didn't know what to focus on. Now I have a <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">clear plan</span> every single week."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 p-[2px] shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100&h=100&fit=crop" className="w-full h-full rounded-full border border-white/20 object-cover" />
            </div>
            <div className="text-left">
              <p className="text-sm text-white/90 font-medium">Thanh Nguyen</p>
              <p className="text-xs text-white/40">Secured offer at Univ. of Melbourne</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ 10. FINAL CTA ═══ */}
      <div className="w-full py-40 flex justify-center text-center px-6 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-blue-500/[0.06] blur-[120px] rounded-full" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease }}
          className="flex flex-col items-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1] mb-14">
            Start with <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">clarity</span>.<br />Stay with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">progress</span>.
          </h2>
          <button
            onClick={() => navigate('/tutors')}
            className="px-12 py-5 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300"
          >
            Find Your Tutor
          </button>
        </motion.div>
      </div>

    </div>
  );
}
