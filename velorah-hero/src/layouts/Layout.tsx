import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import StarfieldCanvas from '../components/StarfieldCanvas';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isInternal = location.pathname !== '/';

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Faster, lighter feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical', 
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.2, // Slightly more responsive
      smoothTouch: false,
      touchMultiplier: 2,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-cream" style={{ background: 'transparent' }}>
      {/* Canvas Starfield — z-0 base layer */}
      <StarfieldCanvas />

      {/* Video overlay — z-1, only visible on internal pages */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isInternal ? 'opacity-10 blur-3xl scale-110' : 'opacity-0' 
          }`}
          src="/background-video.mp4"
        />
      </div>

      {/* Main Content Area — z-10, above everything */}
      <main className="relative z-10 w-full min-h-screen">
        {children}
      </main>
    </div>
  );
}
