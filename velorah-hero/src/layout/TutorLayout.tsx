import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import type { LenisOptions } from '@studio-freight/lenis';
import TutorNavigation from '../components/tutor/TutorNavigation';
import StarfieldCanvas from '../components/StarfieldCanvas';
import '../styles/tutor.css';

interface TutorLayoutProps {
  children: React.ReactNode;
}

const TutorLayout: React.FC<TutorLayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const fixedPages = ['/tutor/schedule'];
    if (fixedPages.includes(location.pathname)) return;

    const lenisOptions: LenisOptions = {
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      syncTouch: false,
      touchMultiplier: 2,
    };
    const lenis = new Lenis(lenisOptions);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <div className="tutor-app-container relative min-h-screen overflow-hidden font-sans text-cream bg-stars">
      {/* Canvas Starfield */}
      <StarfieldCanvas />

      {/* Top Navigation */}
      <TutorNavigation />
      
      {/* Main Content Area */}
      <main className="tutor-content">
        {children}
      </main>
    </div>
  );
};

export default TutorLayout;
