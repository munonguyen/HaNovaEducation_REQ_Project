import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const E = 'cubic-bezier(0.16, 1, 0.3, 1)';

const links = [
  { path: '/', label: 'Home' },
  { path: '/tutors', label: 'Find Tutors' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/dashboard', label: 'Study Plans' },
  { path: '/notifications', label: 'Notifications' },
  { path: '/profile', label: 'Profile' },
];

/* ═══ LOGO: Clean monochrome diamond — white on transparent ═══ */
function LogoMark({ size, glow }: { size: number; glow?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: 'block' }}>
      <defs>
        {glow && (
          <filter id="intro-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>

      {/* Outer glow during intro */}
      {glow && (
        <rect x="11" y="11" width="26" height="26" rx="2.5" transform="rotate(45 24 24)"
          stroke="white" strokeWidth="1" opacity="0.2" filter="url(#intro-glow)" />
      )}

      {/* Diamond outline */}
      <rect x="12" y="12" width="24" height="24" rx="2.5" transform="rotate(45 24 24)"
        fill="none" stroke="white" strokeWidth="1.5" />

      {/* Inner diamond (smaller, subtle fill) */}
      <rect x="17" y="17" width="14" height="14" rx="1.5" transform="rotate(45 24 24)"
        fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

      {/* H letterform — clean serif */}
      <text x="24" y="28" textAnchor="middle" fill="white" fontFamily="serif" fontSize="16" fontWeight="500" letterSpacing="0.5">
        H
      </text>

      {/* Small star accent (top) */}
      <circle cx="24" cy="8.5" r="1.2" fill="white" opacity="0.7" />
      <line x1="24" y1="6" x2="24" y2="11" stroke="white" strokeWidth="0.3" opacity="0.3" />
    </svg>
  );
}

export default function Navigation() {
  const location = useLocation();
  const activeTab = location.pathname;
  const [phase, setPhase] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [introIn, setIntroIn] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  useEffect(() => {
    const t0 = setTimeout(() => setIntroIn(true), 300);
    const t = [
      setTimeout(() => setPhase(1), 2400),
      setTimeout(() => setPhase(2), 3800),
      setTimeout(() => setPhase(3), 4500),
    ];
    return () => { clearTimeout(t0); t.forEach(clearTimeout); };
  }, []);

  const isIntro = phase === 0;
  const isPill = phase >= 2;
  const isReady = phase >= 3;

  return (
    <>
      <style>{`
        @keyframes introReveal {
          from { opacity: 0; letter-spacing: 0.5em; }
          to { opacity: 1; letter-spacing: 0.25em; }
        }
        @keyframes introLineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes introTagline {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 0.75; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

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
          bottom: isIntro ? 'auto' : isOpen ? 'max(14vh, 50px)' : '34px',
          transform: isIntro ? 'translateY(-50%)' : 'none',
          willChange: 'top, bottom, transform',
          transition: `top 1.4s ${E}, bottom 0.6s ${E}, transform 1.4s ${E}`,
          pointerEvents: isPill ? 'auto' : 'none',
        }}
      >
        {/* Container */}
        <div
          style={{
            display: 'flex', flexDirection: 'column', position: 'relative',
            width: isOpen ? 'min(420px, 90vw)' : isPill ? '230px' : '56px',
            borderRadius: isOpen ? '28px' : '9999px',
            padding: isOpen ? '24px 28px 22px' : '6px',
            /* STRONGER glass for menu visibility */
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
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center flex-shrink-0" style={{
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
              opacity: isPill ? 1 : 0, maxWidth: isPill ? '130px' : '0',
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
                  <span className="text-[11px] uppercase tracking-widest font-semibold">Menu</span>
                </button>
              )}
            </div>
          </div>

          {/* ── MENU LINKS ── */}
          <div style={{
            maxHeight: isOpen ? '600px' : '0', opacity: isOpen ? 1 : 0,
            transition: `max-height 0.6s ${E}, opacity 0.45s ${E} ${isOpen ? '0.1s' : '0s'}`,
            overflow: 'hidden',
          }}>
            {links.map((link, i) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="group block" style={{
                opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 0.45s ${E} ${isOpen ? `${0.12 + i * 0.06}s` : `${(links.length - 1 - i) * 0.03}s`}, transform 0.45s ${E} ${isOpen ? `${0.12 + i * 0.06}s` : `${(links.length - 1 - i) * 0.03}s`}`,
              }}>
                <div className="py-[13px] px-4 rounded-xl transition-colors duration-300 group-hover:bg-white/[0.05]">
                  <span className={`text-[24px] font-serif tracking-wide transition-colors duration-300 ${
                    activeTab === link.path ? 'text-white' : 'text-white/40 group-hover:text-white'
                  }`}>{link.label}</span>
                </div>
              </Link>
            ))}
            <div className="mt-4 pt-5 flex justify-between items-center px-3" style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              opacity: isOpen ? 1 : 0, transition: `opacity 0.3s ${E} ${isOpen ? '0.5s' : '0s'}`,
            }}>
              <span className="text-[9px] text-white/25 uppercase tracking-[0.15em]">Sanctuary</span>
              <a href="#" className="text-[9px] text-white/25 hover:text-white/50 uppercase tracking-widest transition-colors">About</a>
            </div>
          </div>
        </div>

        {/* ── Intro text ── */}
        <div className="absolute left-1/2 flex flex-col items-center pointer-events-none" style={{
          top: '100%', transform: 'translateX(-50%)', marginTop: '28px',
          opacity: isIntro && introIn ? 1 : 0, transition: `opacity 0.8s ${E}`,
        }}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/25 to-transparent mb-7" style={{
            width: '80px', animation: introIn ? `introLineGrow 1s ${E} 0.4s both` : 'none',
          }} />
          <h1 className="font-serif text-white uppercase whitespace-nowrap" style={{
            fontSize: '32px', animation: introIn ? `introReveal 1.6s ${E} 0.3s both` : 'none',
          }}>HaNova</h1>
          <p className="text-white/70 tracking-[0.2em] text-[11px] uppercase mt-6 whitespace-nowrap" style={{
            animation: introIn ? `introTagline 1s ${E} 1.2s both` : 'none',
          }}>Where Guidance Becomes Progress</p>
        </div>
      </div>
    </>
  );
}
