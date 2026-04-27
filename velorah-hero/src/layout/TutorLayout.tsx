import React from 'react';
import TutorNavigation from '../components/tutor/TutorNavigation';
import StarfieldCanvas from '../components/StarfieldCanvas';
import backgroundVideo from '../assets/videos/background-video.mp4';
import '../styles/tutor.css';

interface TutorLayoutProps {
  children: React.ReactNode;
}

const TutorLayout: React.FC<TutorLayoutProps> = ({ children }) => {
  return (
    <div className="tutor-app-shell">
      <StarfieldCanvas />
      <div className="tutor-video-overlay" aria-hidden="true">
        <video autoPlay loop muted playsInline src={backgroundVideo} />
      </div>
      <TutorNavigation />
      <main className="tutor-content">
        {children}
      </main>
    </div>
  );
};

export default TutorLayout;
