import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const E = 'cubic-bezier(0.16, 1, 0.3, 1)';

const tutorLinks = [
  { path: '/tutor/dashboard', label: 'Home', num: '01', desc: 'Your teaching overview & daily tasks' },
  { path: '/tutor/schedule', label: 'My Schedule', num: '02', desc: 'Manage your availability & calendar' },
  { path: '/tutor/bookings', label: 'Booking Requests', num: '03', desc: 'Review and accept student requests' },
  { path: '/tutor/lessons', label: 'My Lessons', num: '04', desc: 'Track upcoming & past sessions' },
  { path: '/tutor/study-plans', label: 'Study Plans', num: '05', desc: 'Design personalized learning paths' },
  { path: '/tutor/students', label: 'Students & Groups', num: '06', desc: 'Manage your scholars & classes' },
  { path: '/tutor/notifications', label: 'Notifications', num: '07', desc: 'System & booking alerts' },
  { path: '/tutor/profile', label: 'Profile', num: '08', desc: 'Your public tutor presence' },
  { path: '/tutor/settings', label: 'Settings', num: '09', desc: 'Preferences & account details' },
];

/* ═══ LOGO: The HaNova Hexagon (Bespoke Brand Mark) ═══ */
function LogoMark({ size, glow }: { size: number; glow?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: 'block' }}>
      <defs>
        {glow && (
          <filter id="nova-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>

      {/* Intro Glow */}
      {glow && (
        <path d="M24 6 L40 15.5 L40 32.5 L24 42 L8 32.5 L8 15.5 Z" 
          fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1.5" opacity="0.25" filter="url(#nova-glow)" />
      )}

      {/* Outer Hexagon Frame */}
      <path d="M24 8 L38 16.5 L38 31.5 L24 40 L10 31.5 L10 16.5 Z" 
        stroke="white" strokeWidth="1.2" />
      
      {/* Inner Accent Hexagon */}
      <path d="M24 13 L33 18.5 L33 29.5 L24 35 L15 29.5 L15 18.5 Z" 
        stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="rgba(255,255,255,0.03)" />

      {/* Monogram 'H' + 'N' embedded */}
      {/* Left Pillar */}
      <path d="M19 18 L19 30" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right Pillar */}
      <path d="M29 18 L29 30" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      {/* Crossbar (H) */}
      <path d="M19 24 L29 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Nova Star Accent */}
      <circle cx="24" cy="4" r="1.5" fill="white" opacity="0.8" />
      <path d="M24 1 L24 7" stroke="white" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

export default function TutorNavigation() {
  const location = useLocation();
  const activeTab = location.pathname;
  // Initialize to 3 to skip the heavy intro animation (which only happens on the main app load)
  const [phase, setPhase] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const isIntro = phase === 0;
  const isPill = phase >= 2;
  const isReady = phase >= 3;

  return (
    <>
      {/* ── Overlay ── */}
      <div
        className="fixed inset-0 z-[95]"
        onClick={() => isOpen && setIsOpen(false)}
        style={{
          opacity: isOpen ? 1 : 0,
          backgroundColor: 'rgba(2,2,5,0.6)',
          backdropFilter: isOpen ? 'blur(24px)' : 'blur(0px)',
          WebkitBackdropFilter: isOpen ? 'blur(24px)' : 'blur(0px)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: `opacity 0.5s ${E}, backdrop-filter 0.6s ${E}`,
        }}
      />

      {/* ═══ THE ONE ELEMENT ═══ */}
      <div
        className="fixed left-0 right-0 z-[999] flex justify-center"
        style={{
          top: isIntro ? '50%' : 'auto',
          bottom: isIntro ? 'auto' : isOpen ? 'max(8vh, 30px)' : '34px',
          transform: isIntro ? 'translateY(-50%)' : 'none',
          willChange: 'top, bottom, transform',
          transition: `top 1.4s ${E}, bottom 0.6s ${E}, transform 1.4s ${E}`,
          pointerEvents: 'none',
        }}
      >
        {/* Container */}
        <div
          style={{
            display: 'flex', flexDirection: 'column', position: 'relative',
            width: isOpen ? 'min(460px, 95vw)' : isPill ? '280px' : '56px',
            borderRadius: isOpen ? '28px' : '9999px',
            padding: isOpen ? '24px 28px 22px' : '6px',
            background: isPill
              ? isOpen ? 'rgba(6,8,14,0.95)' : 'rgba(6,8,14,0.7)'
              : 'transparent',
            backdropFilter: isPill ? 'blur(50px) saturate(180%)' : 'none',
            WebkitBackdropFilter: isPill ? 'blur(50px) saturate(180%)' : 'none',
            border: `1px solid rgba(255,255,255,${isPill ? (isOpen ? '0.08' : '0.12') : '0'})`,
            boxShadow: isPill
              ? isOpen
                ? '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)'
                : '0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)'
              : 'none',
            willChange: 'width, border-radius, padding',
            transition: [
              `width 1s ${E}`, `border-radius 0.8s ${E}`, `padding 0.7s ${E}`,
              `background 0.7s ${E}`, `backdrop-filter 0.6s ${E}`, `-webkit-backdrop-filter 0.6s ${E}`,
              `border-color 0.6s ${E}`, `box-shadow 0.7s ${E}`,
            ].join(', '),
            overflow: 'hidden',
            pointerEvents: isPill ? 'auto' : 'none',
          }}
        >
          {/* ── HEADER ── */}
          <div className="flex items-center flex-shrink-0" style={{
            justifyContent: isOpen ? 'space-between' : 'center',
            marginBottom: isOpen ? '18px' : '0',
            paddingBottom: isOpen ? '16px' : '0',
            borderBottom: `1px solid rgba(255,255,255,${isOpen ? '0.06' : '0'})`,
            minHeight: '38px',
            transition: `margin 0.5s ${E}, padding 0.5s ${E}, border-color 0.4s ${E}`,
          }}>
            <Link to="/tutor/dashboard" onClick={() => setIsOpen(false)} className="flex items-center flex-shrink-0" style={{
              gap: isPill ? '10px' : '0',
              paddingLeft: isPill ? (isOpen ? '4px' : '12px') : '0',
              paddingRight: isPill ? (isOpen ? '0' : '12px') : '0',
              borderRight: isPill && !isOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
              transition: `gap 0.8s ${E}, padding 0.7s ${E}, border-color 0.5s ${E}`,
            }}>
              <div style={{
                width: isPill ? '30px' : '44px', height: isPill ? '30px' : '44px',
                flexShrink: 0, willChange: 'width, height',
                transition: `width 1.4s ${E}, height 1.4s ${E}`,
              }}>
                <LogoMark size={isPill ? 30 : 44} glow={isIntro} />
              </div>
              <span className="font-serif text-white tracking-[0.15em] select-none whitespace-nowrap" style={{
                fontSize: '14px', fontWeight: 500,
                opacity: isPill ? (isOpen ? 0.5 : 0.9) : 0,
                width: isPill ? '68px' : '0', overflow: 'hidden',
                transition: `opacity 0.8s ${E}, width 1s ${E}`,
              }}>
                HaNova
              </span>
            </Link>

            <div className="flex-shrink-0 overflow-hidden" style={{
              opacity: isPill ? 1 : 0, maxWidth: isPill ? '160px' : '0',
              transition: `opacity 0.8s ${E} 0.15s, max-width 1s ${E}`,
            }}>
              {isOpen ? (
                <button onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-white/60 hover:text-white transition-all py-2 px-3 rounded-full hover:bg-white/[0.08]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  <span className="text-[10px] uppercase tracking-widest font-medium">Close</span>
                </button>
              ) : (
                <button onClick={() => isReady && setIsOpen(true)} className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors whitespace-nowrap py-2 pl-4 pr-5">
                  <div className="flex flex-col gap-[2.5px] w-[14px]">
                    <span className="h-[1.2px] w-full bg-current rounded-full" />
                    <span className="h-[1.2px] w-[55%] bg-current rounded-full" />
                    <span className="h-[1.2px] w-full bg-current rounded-full" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest font-semibold">Tutor Menu</span>
                </button>
              )}
            </div>
          </div>

          {/* ── MENU LINKS ── */}
          <div className="custom-scrollbar" style={{
            maxHeight: isOpen ? '75vh' : '0', opacity: isOpen ? 1 : 0,
            transition: `max-height 0.6s ${E}, opacity 0.45s ${E} ${isOpen ? '0.1s' : '0s'}`,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}>
            {tutorLinks.map((link, i) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="group block" style={{
                opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 0.45s ${E} ${isOpen ? `${0.12 + i * 0.04}s` : `${(tutorLinks.length - 1 - i) * 0.02}s`}, transform 0.45s ${E} ${isOpen ? `${0.12 + i * 0.04}s` : `${(tutorLinks.length - 1 - i) * 0.02}s`}`,
              }}>
                <div className={`py-[12px] px-3 rounded-[14px] transition-all duration-300 flex items-center gap-4 ${
                  activeTab === link.path 
                    ? 'bg-white/[0.04]' 
                    : 'hover:bg-white/[0.03]'
                }`}>
                  {/* Active indicator */}
                  <div className={`w-1 h-10 rounded-full flex-shrink-0 transition-colors duration-500 ${
                      activeTab === link.path ? 'bg-gradient-to-b from-blue-400 to-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]' : 'bg-white/[0.05]'
                  }`} />
                  
                  <span className={`text-[10px] uppercase font-bold tracking-widest flex-shrink-0 w-6 transition-colors duration-300 ${
                    activeTab === link.path ? 'text-indigo-400' : 'text-white/20 group-hover:text-white/50'
                  }`}>{link.num}</span>

                  <div className="flex-1 min-w-0 pr-4">
                    <span className={`text-xl font-serif tracking-wide block transition-colors duration-300 ${
                      activeTab === link.path ? 'text-white' : 'text-white/40 group-hover:text-white/80'
                    }`}>{link.label}</span>
                    <span className={`text-[10px] font-medium block mt-0.5 transition-colors duration-300 ${
                      activeTab === link.path ? 'text-white/50' : 'text-white/20 group-hover:text-white/40'
                    }`}>{link.desc}</span>
                  </div>
                  {/* Arrow */}
                  <svg className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                    activeTab === link.path ? 'text-white/30' : 'text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}

            {/* Footer */}
            <div className="mt-4 pt-4 flex justify-between items-center px-4 pb-2" style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              opacity: isOpen ? 1 : 0, transition: `opacity 0.3s ${E} ${isOpen ? '0.5s' : '0s'}`,
            }}>
              <span className="text-[9px] text-white/20 uppercase tracking-[0.15em] bg-white/[0.04] px-3 py-1.5 rounded-full">v1.0 Tutor</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/signin';
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all border border-red-500/20"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  <span className="text-[10px] uppercase tracking-widest font-bold">Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
