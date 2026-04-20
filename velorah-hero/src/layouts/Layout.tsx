import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

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
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
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
    <div className="relative min-h-screen bg-midnight-navy overflow-hidden font-sans text-cream bg-stars">
      {/* Universal Background Cinematic Video */}
      <div className="fixed inset-0 z-0 bg-midnight-navy pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isInternal ? 'opacity-20 blur-3xl scale-110' : 'opacity-0' 
            // In the new layout, we don't want the global background video competing with the Home page's pure imagery
          }`}
          src="/background-video.mp4"
        />
        <div className="absolute inset-0 bg-midnight-navy/60"></div>
      </div>


      {/* Main Content Area */}
      <main className="relative z-10 w-full min-h-screen">
        {children}
      </main>
    </div>
  );
}
