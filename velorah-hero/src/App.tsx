import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './layout/Layout';
import Navigation from './components/Navigation';

// ── Code-split every page: only load JS when the route is visited ──
const Home         = lazy(() => import('./pages/Home'));
const Tutors       = lazy(() => import('./pages/Tutors'));
const TutorProfile = lazy(() => import('./pages/TutorProfile'));
const Dashboard    = lazy(() => import('./pages/Dashboard'));
const Schedule     = lazy(() => import('./pages/Schedule'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Profile      = lazy(() => import('./pages/Profile'));
const StudyPlan    = lazy(() => import('./pages/StudyPlan'));

// Auth Pages
const SignIn       = lazy(() => import('./pages/auth/SignIn'));
const SignUp       = lazy(() => import('./pages/auth/SignUp'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const AuthSuccess  = lazy(() => import('./pages/auth/AuthSuccess'));

// Tutor Pages
const TutorLayout    = lazy(() => import('./layout/TutorLayout'));
const TutorHome      = lazy(() => import('./pages/tutor/TutorHome'));
const MySchedule     = lazy(() => import('./pages/tutor/MySchedule'));
const BookingRequests = lazy(() => import('./pages/tutor/BookingRequests'));
const MyLessons      = lazy(() => import('./pages/tutor/MyLessons'));
const StudyPlans     = lazy(() => import('./pages/tutor/StudyPlans'));
const Students       = lazy(() => import('./pages/tutor/Students'));
const TutorNotifications = lazy(() => import('./pages/tutor/TutorPlaceholders').then(m => ({ default: m.Notifications })));
const TutorSelfProfile   = lazy(() => import('./pages/tutor/TutorPlaceholders').then(m => ({ default: m.Profile })));
const TutorSettings  = lazy(() => import('./pages/tutor/TutorPlaceholders').then(m => ({ default: m.Settings })));

/** Minimal dark-theme fallback shown while a lazy chunk loads */
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020205]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white/70 animate-spin" />
        <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">Loading</p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isTutorRoute = location.pathname.startsWith('/tutor');
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Intro flash — reduced from 2.2s → 0.6s */}
      <div
        className="fixed inset-0 z-[997] bg-[#020205] pointer-events-none"
        style={{
          opacity: (introDone || isTutorRoute) ? 0 : 1,
          transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {!isTutorRoute && <Navigation />}

      <div style={{
        opacity: (introDone || isTutorRoute) ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {isTutorRoute ? (
          <Suspense fallback={<PageLoader />}>
            <TutorLayout>
              <Routes location={location} key={location.pathname}>
                <Route path="/tutor/dashboard"   element={<TutorHome />} />
                <Route path="/tutor/schedule"    element={<MySchedule />} />
                <Route path="/tutor/bookings"    element={<BookingRequests />} />
                <Route path="/tutor/lessons"     element={<MyLessons />} />
                <Route path="/tutor/study-plans" element={<StudyPlans />} />
                <Route path="/tutor/students"    element={<Students />} />
                <Route path="/tutor/notifications" element={<TutorNotifications />} />
                <Route path="/tutor/profile"     element={<TutorSelfProfile />} />
                <Route path="/tutor/settings"    element={<TutorSettings />} />
                <Route path="/tutor/*"           element={<TutorHome />} />
              </Routes>
            </TutorLayout>
          </Suspense>
        ) : (
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                <Route path="/"            element={<Home />} />
                <Route path="/tutors"      element={<Tutors />} />
                <Route path="/tutors/:id"  element={<TutorProfile />} />
                <Route path="/dashboard"   element={<Dashboard />} />
                <Route path="/schedule"    element={<Schedule />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile"     element={<Profile />} />
                <Route path="/study-plan"  element={<StudyPlan />} />
                
                {/* Auth Routes */}
                <Route path="/signin"      element={<SignIn />} />
                <Route path="/signup"      element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                <Route path="*" element={
                  <div className="w-full flex items-center justify-center min-h-[50vh]">
                    <div className="glass-panel px-10 py-16 rounded-3xl text-center max-w-lg">
                      <h2 className="text-2xl font-serif text-white mb-4">Your sanctuary is quiet.</h2>
                      <p className="text-white/50 mb-8">Ready to learn something new?</p>
                      <button onClick={() => window.location.href='/tutors'} className="glass-button-primary px-8 py-3 rounded-xl text-sm font-medium transition-all">Find Tutor</button>
                    </div>
                  </div>
                } />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </Layout>
        )}
      </div>
    </>
  );
}
