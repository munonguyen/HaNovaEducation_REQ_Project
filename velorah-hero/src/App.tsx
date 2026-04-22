import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './layout/Layout';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Tutors from './pages/Tutors';
import TutorProfile from './pages/TutorProfile';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import StudyPlan from './pages/StudyPlan';

export default function App() {
  const location = useLocation();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Black intro background */}
      <div
        className="fixed inset-0 z-[997] bg-[#020205] pointer-events-none"
        style={{
          opacity: introDone ? 0 : 1,
          transition: 'opacity 1s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* Navigation — OUTSIDE the opacity wrapper so it's always visible */}
      <Navigation />

      {/* Main content */}
      <div style={{
        opacity: introDone ? 1 : 0,
        transition: 'opacity 1.2s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/tutors/:id" element={<TutorProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/study-plan" element={<StudyPlan />} />
              <Route path="*" element={
                <div className="w-full flex items-center justify-center min-h-[50vh]">
                  <div className="glass-panel px-10 py-16 rounded-3xl text-center max-w-lg bg-soft-charcoal/40 border-moonlight-gray/20">
                    <h2 className="text-2xl font-serif text-white mb-4">Your sanctuary is quiet.</h2>
                    <p className="text-cream/70 mb-8">Ready to learn something new?</p>
                    <button onClick={() => window.location.href='/tutors'} className="glass-button-primary px-8 py-3 rounded-xl text-sm font-medium bg-muted-amber/20 border-muted-amber/40 hover:bg-muted-amber/30 transition-all">Find Tutor</button>
                  </div>
                </div>
              } />
            </Routes>
          </AnimatePresence>
        </Layout>
      </div>
    </>
  );
}
