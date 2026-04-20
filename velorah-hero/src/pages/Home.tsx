import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const navigate = useNavigate();

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
          Study with Structure.<br />Progress with Clarity.
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
            className="px-10 py-4 bg-white text-[#0c0d12] rounded-full font-semibold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            Start Learning
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-10 py-4 border border-white/20 text-white rounded-full text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
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
          className="mt-16 inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] px-6 py-3 rounded-full"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-[12px] text-white/60 tracking-wide">Next Session: Calculus with Minh Anh – Tomorrow, 19:00</p>
        </motion.div>
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
              Engineered<br />for Results.
            </h2>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-14">
            {[
              { icon: '◎', title: 'Clarity', desc: 'Know exactly what to study, when, and why.' },
              { icon: '▣', title: 'Structure', desc: 'Every lesson is part of a guided academic plan.' },
              { icon: '◈', title: 'Consistency', desc: 'Stay on track with scheduled sessions and reminders.' },
              { icon: '⬡', title: 'Guidance', desc: 'Learn with mentors who understand your goals.' },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease }}
                className="flex flex-col gap-4"
              >
                <span className="text-2xl text-white/20">{val.icon}</span>
                <h3 className="text-xl text-white font-serif">{val.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 4. SHOWCASE VIDEO — Cinematic ═══ */}
      <div className="w-full py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease }}
          className="w-full max-w-6xl mx-auto px-6"
        >
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4">Experience</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">See HaNova in Action</h2>
          </div>
          <motion.div
            initial={{ scale: 0.96 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease }}
            className="w-full aspect-video rounded-[28px] overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative group"
          >
            <video
              autoPlay loop muted playsInline
              className="w-full h-full object-cover"
              src="/showcase-video.mp4"
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205]/30 via-transparent to-transparent pointer-events-none" />
          </motion.div>
          <p className="text-center text-[11px] text-white/25 uppercase tracking-[0.2em] mt-8">
            The HaNova Experience — Academic Mentoring Reimagined
          </p>
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
            A logical flow to mastery.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
          <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {[
            { num: '01', title: 'Find the Right Tutor', desc: 'Browse by subject, level, and learning goals.' },
            { num: '02', title: 'Book with Clarity', desc: 'Choose time slots with full visibility and pricing.' },
            { num: '03', title: 'Follow a Structured Plan', desc: 'Receive a guided learning roadmap after each session.' },
            { num: '04', title: 'Track Your Progress', desc: 'Monitor your improvement with clear milestones.' },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease }}
              className="relative flex flex-col items-center text-center px-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#0a0b14] border border-white/10 flex items-center justify-center text-white/40 font-serif text-lg mb-8 z-10">
                {step.num}
              </div>
              <h4 className="text-lg text-white font-serif mb-3">{step.title}</h4>
              <p className="text-[13px] text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ 6. FEATURED TUTORS ═══ */}
      <div className="w-full py-32 border-y border-white/5 bg-[#060810]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease }}
                className="text-4xl md:text-5xl font-serif text-white mb-4"
              >Selected Mentors</motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease }}
                className="text-white/40 text-sm md:text-base max-w-md"
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
                <div className="w-full h-[420px] overflow-hidden rounded-2xl relative shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020205] to-transparent opacity-60 z-10" />
                  <img src={tutor.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt={tutor.name} />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-white mb-1 group-hover:text-white/80 transition-colors">{tutor.name}</h4>
                  <p className="text-sm text-white/40 mb-2">{tutor.sub}</p>
                  <p className="text-[11px] text-white/25 uppercase tracking-wider">{tutor.cred}</p>
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
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight mb-8">A Clear<br />Path Forward.</h2>
          <p className="text-white/45 leading-relaxed max-w-md text-lg">
            Each lesson contributes to a structured academic plan tailored to your goals. No scattered notes. No lost progress. Just a continuous upward trajectory.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-10 px-8 py-3 border border-white/15 rounded-full text-white/60 text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
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

      {/* ═══ 8. TRUST ═══ */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/30">Trust & Reliability</h3>
          </div>
          {[
            { title: 'Academic Credibility', desc: 'Built with input from experienced tutors and academic mentors.' },
            { title: 'Operational Reliability', desc: 'Designed to reduce scheduling conflicts and improve consistency.' },
            { title: 'System Transparency', desc: 'Clear booking, clear pricing, clear progress tracking.' },
          ].map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease }}
              className="border-t border-white/[0.06] pt-6"
            >
              <h4 className="text-white font-serif text-xl mb-4">{t.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ 9. TESTIMONIAL ═══ */}
      <div className="w-full h-[60vh] bg-[#020205] border-y border-white/5 flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-snug mb-10">
            "Before HaNova, I didn't know what to focus on. Now I have a clear plan every week."
          </h2>
          <p className="text-xs text-white/30 uppercase tracking-widest">— Student Profile, Grade 12</p>
        </motion.div>
      </div>

      {/* ═══ 10. FINAL CTA ═══ */}
      <div className="w-full py-40 flex justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease }}
          className="flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1] mb-14">
            Start with clarity.<br />Stay with progress.
          </h2>
          <button
            onClick={() => navigate('/tutors')}
            className="px-12 py-5 bg-white text-[#0c0d12] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            Find Your Tutor
          </button>
        </motion.div>
      </div>

    </div>
  );
}
