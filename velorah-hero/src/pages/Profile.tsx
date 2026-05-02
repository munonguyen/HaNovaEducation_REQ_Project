import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CreditCard, Shield, Edit2, Bookmark, ChevronRight, Globe, Moon, Bell, CheckCircle2, LogOut, Camera, Mail, MapPin, Target } from 'lucide-react';
import {
  USER_UPDATED_EVENT,
  clearStoredUserProfile,
  readStoredUserProfile,
  type StoredUserProfile,
} from '../utils/helpers';

type ProfileTab = 'personal' | 'preferences' | 'billing' | 'security';

const DEFAULT_TAB: ProfileTab = 'personal';

const tabs = [
  { id: 'personal' as const, label: 'Personal Details', icon: User, desc: 'Name, email, timezone' },
  { id: 'preferences' as const, label: 'Learning Preferences', icon: Bookmark, desc: 'Notifications & study habits' },
  { id: 'billing' as const, label: 'Billing & Plans', icon: CreditCard, desc: 'Subscription & payment' },
  { id: 'security' as const, label: 'Security', icon: Shield, desc: 'Password & 2FA' },
];

function isProfileTab(value: string | null): value is ProfileTab {
  return tabs.some((tab) => tab.id === value);
}

function buildToggleState(profile: StoredUserProfile | null) {
  return {
    reminders: profile?.notifications?.inApp ?? true,
    studyGroups: profile?.accountRole === 'student',
    quietMode: false,
    emailDigest: profile?.notifications?.email ?? true,
  };
}

function formatCreatedAt(createdAt?: string) {
  if (!createdAt) return 'Demo access';

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return 'HaNova member';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function getAccountSummary(profile: StoredUserProfile) {
  if (profile.accountRole === 'tutor') return 'Tutor profile • Teaching account';
  if (profile.accountRole === 'manager') return 'Manager profile • Operations workspace';
  if (profile.accountRole === 'admin') return 'Admin profile • Platform governance';
  return 'Student profile • Learning account';
}

function getFocusLabel(profile: StoredUserProfile) {
  if (profile.accountRole === 'tutor') return 'Teaching focus';
  if (profile.accountRole === 'manager') return 'Operations scope';
  if (profile.accountRole === 'admin') return 'Administration scope';
  return 'Current goal';
}

function getFocusValue(profile: StoredUserProfile) {
  if (profile.accountRole === 'tutor') {
    return profile.tutorProfile?.qualification || profile.goal || 'Teaching profile active';
  }

  if (profile.accountRole === 'manager') {
    return profile.organization?.name || profile.goal || 'Workspace management active';
  }

  if (profile.accountRole === 'admin') {
    return profile.organization?.name || profile.goal || 'Platform administration active';
  }

  return profile.goal || 'No study goal saved yet';
}

function getSecondaryLabel(profile: StoredUserProfile) {
  if (profile.accountRole === 'tutor') return 'Formats';
  if (profile.accountRole === 'manager') return 'Organization role';
  if (profile.accountRole === 'admin') return 'Admin role';
  return 'Learning style';
}

function getSecondaryValue(profile: StoredUserProfile) {
  if (profile.accountRole === 'tutor') {
    return profile.tutorProfile?.teachingFormats?.join(', ') || 'Teaching formats not set';
  }

  if (profile.accountRole === 'manager' || profile.accountRole === 'admin') {
    return profile.organization?.role || 'Workspace owner';
  }

  return profile.learningStyle || 'Structured plan';
}

function ToggleSwitch({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-6 rounded-full relative transition-all duration-300 shrink-0 ${
        enabled
          ? 'bg-blue-500/30 border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
          : 'bg-white/5 border border-white/10'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-1 w-4 h-4 rounded-full transition-colors ${
          enabled ? 'bg-blue-400' : 'bg-white/30'
        }`}
      />
    </button>
  );
}

export default function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedTab = searchParams.get('tab');
  const activeTab = isProfileTab(requestedTab) ? requestedTab : DEFAULT_TAB;
  const [profile, setProfile] = useState<StoredUserProfile | null>(() => readStoredUserProfile());
  const [toggles, setToggles] = useState(() => buildToggleState(readStoredUserProfile()));
  const [profileNotice, setProfileNotice] = useState('');

  useEffect(() => {
    const syncProfile = () => {
      const nextProfile = readStoredUserProfile();
      setProfile(nextProfile);
      setToggles(buildToggleState(nextProfile));
    };

    window.addEventListener('storage', syncProfile);
    window.addEventListener(USER_UPDATED_EVENT, syncProfile);
    return () => {
      window.removeEventListener('storage', syncProfile);
      window.removeEventListener(USER_UPDATED_EVENT, syncProfile);
    };
  }, []);

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showProfileNotice = (message: string) => {
    setProfileNotice(message);
  };

  const handleTabChange = (tab: ProfileTab) => {
    setSearchParams({ tab });
  };

  const handleSignOut = () => {
    clearStoredUserProfile();
    navigate('/signin');
  };

  if (!profile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto min-h-screen max-w-[960px] px-8 pb-32 pt-[120px] text-white"
      >
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-10 text-center shadow-2xl glass-panel">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">Account access</p>
          <h1 className="mt-4 font-serif text-4xl text-white">Sign in to view your profile</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/48">
            The profile page now reads directly from your active HaNova profile card, so you need an active session before editing details.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/signin"
              className="rounded-full border border-cyan-200/25 bg-cyan-200/[0.12] px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/[0.18]"
            >
              Go to sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/72 transition hover:border-white/18 hover:text-white"
            >
              Create account
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  const accountSummary = getAccountSummary(profile);
  const focusLabel = getFocusLabel(profile);
  const focusValue = getFocusValue(profile);
  const secondaryLabel = getSecondaryLabel(profile);
  const secondaryValue = getSecondaryValue(profile);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-[120px] pb-32 px-8 max-w-[1300px] mx-auto text-white font-sans"
    >
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-serif text-white tracking-tight">Account Settings</h1>
          <p className="text-white/50 text-lg mt-3">Manage the same profile identity shown on your HaNova account card.</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400 shrink-0"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <AnimatePresence>
        {profileNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-6 rounded-2xl border border-cyan-200/18 bg-cyan-200/[0.08] px-5 py-3 text-sm font-medium text-cyan-50"
          >
            {profileNotice}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        
        {/* Left Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Profile Card */}
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-6 shadow-2xl glass-panel text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 p-0.5 mx-auto relative group cursor-pointer mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-serif">{profile.initials}</div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={18} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-serif text-white mb-0.5">{profile.name}</h3>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4">{accountSummary}</p>
            <p className="text-sm leading-6 text-white/58">{focusValue}</p>
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest">{profile.role}</span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-white/55 border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                Joined {formatCreatedAt(profile.createdAt)}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-4 shadow-2xl glass-panel">
            <div className="space-y-1">
              {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[16px] transition-all duration-300 text-left ${
                      isActive ? 'bg-white/[0.08] shadow-lg border border-white/15' : 'border border-transparent text-white/40 hover:bg-white/[0.03] hover:text-white/80'
                    }`}
                  >
                    <tab.icon size={16} className={isActive ? 'text-white' : 'text-white/30'} />
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-semibold block ${isActive ? 'text-white' : ''}`}>{tab.label}</span>
                      <span className={`text-[10px] block mt-0.5 ${isActive ? 'text-white/40' : 'text-white/20'}`}>{tab.desc}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="text-white/30" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] p-8 lg:p-10 shadow-2xl glass-panel relative min-h-[600px]">
          
          <AnimatePresence mode="wait">
          {activeTab === 'personal' && (
            <motion.div key="personal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-serif text-white">Personal Details</h2>
                  <p className="text-sm text-white/40 mt-1">Update your basic profile information.</p>
                </div>
                <button
                  onClick={() => showProfileNotice('Profile editor opened. Demo changes are kept in your local HaNova session.')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  <Edit2 size={12} /> Edit
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 flex items-center gap-6 p-5 rounded-[20px] bg-white/[0.02] border border-white/5 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-serif shrink-0 border-2 border-white/20">
                    {profile.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white">{profile.name}</h3>
                    <p className="text-sm text-white/40 mt-0.5">{profile.role} • {formatCreatedAt(profile.createdAt)}</p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><Mail size={10} /> Email</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">{profile.email}</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><User size={10} /> Account role</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">{profile.role}</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><Target size={10} /> {focusLabel}</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">{focusValue}</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><Globe size={10} /> {secondaryLabel}</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">{secondaryValue}</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><Bookmark size={10} /> Subjects</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">
                    {profile.subjects?.length ? profile.subjects.join(', ') : 'No subjects saved yet'}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><MapPin size={10} /> Member since</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">{formatCreatedAt(profile.createdAt)}</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div key="preferences" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <div className="mb-8 pb-6 border-b border-white/10">
                <h2 className="text-2xl font-serif text-white">Learning Preferences</h2>
                <p className="text-sm text-white/40 mt-1">Customize notifications and study habits.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-0.5">Session Reminders</h4>
                      <p className="text-white/35 text-xs">SMS and email reminders 1 hour before every session.</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={toggles.reminders} onClick={() => toggle('reminders')} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-0.5">Study Group Invitations</h4>
                      <p className="text-white/35 text-xs">Allow other students to invite you to collaborative sessions.</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={toggles.studyGroups} onClick={() => toggle('studyGroups')} />
                </div>
                
                <div className="flex items-center justify-between p-5 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Moon size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-0.5">Quiet Mode</h4>
                      <p className="text-white/35 text-xs">Mute all non-urgent notifications between 10 PM and 7 AM.</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={toggles.quietMode} onClick={() => toggle('quietMode')} />
                </div>

                <div className="flex items-center justify-between p-5 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[12px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail size={16} className="text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-0.5">Weekly Email Digest</h4>
                      <p className="text-white/35 text-xs">Receive a summary of your academic progress every Sunday.</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={toggles.emailDigest} onClick={() => toggle('emailDigest')} />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'billing' && (
             <motion.div key="billing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <div className="mb-8 pb-6 border-b border-white/10">
                  <h2 className="text-2xl font-serif text-white">Billing & Plans</h2>
                  <p className="text-sm text-white/40 mt-1">Manage your subscription and payment methods.</p>
                </div>

                {/* Current Plan Card */}
                <div className="p-7 rounded-[24px] bg-gradient-to-br from-indigo-500/15 to-purple-600/5 border border-indigo-500/25 mb-8 relative overflow-hidden">
                   <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none" />
                   <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-purple-500/15 blur-[40px] rounded-full pointer-events-none" />
                   
                   <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-3">
                       <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-widest">Active</span>
                     </div>
                     <h3 className="text-3xl font-serif text-white mb-1">Scholar Premium</h3>
                     <p className="text-sm text-indigo-200/50 mb-6">Renews on Nov 15, 2026 • $150.00/month</p>
                     
                     <div className="flex flex-wrap gap-3">
                       <button
                         onClick={() => showProfileNotice('Plan management opened with upgrade, pause, and cancellation options.')}
                         className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
                       >
                         Manage Plan
                       </button>
                       <button
                         onClick={() => showProfileNotice('Billing history opened for invoices, refunds, and payment receipts.')}
                         className="px-6 py-2.5 rounded-full bg-white/5 text-white/60 font-semibold text-sm border border-white/10 hover:bg-white/10 transition-colors"
                       >
                         View History
                       </button>
                     </div>
                   </div>
                </div>

                {/* Payment Methods */}
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-4 px-1">Payment Methods</h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-[18px] bg-white/[0.02] border border-white/10 flex items-center justify-between hover:bg-white/[0.04] transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                           <span className="text-[11px] font-bold text-white tracking-wider">VISA</span>
                        </div>
                        <div>
                           <p className="text-sm text-white font-medium">•••• •••• •••• 4242</p>
                           <p className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">Expires 12/28</p>
                        </div>
                     </div>
                     <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Default</span>
                  </div>
                  
                  <button
                    onClick={() => showProfileNotice('Payment method form opened. Demo mode validates the card before saving locally.')}
                    className="w-full p-4 rounded-[18px] border border-dashed border-white/10 text-center text-xs text-white/30 hover:bg-white/[0.02] hover:text-white/50 transition-colors font-bold uppercase tracking-widest"
                  >
                    + Add Payment Method
                  </button>
                </div>
             </motion.div>
          )}

          {activeTab === 'security' && (
             <motion.div key="security" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <div className="mb-8 pb-6 border-b border-white/10">
                  <h2 className="text-2xl font-serif text-white">Security Settings</h2>
                  <p className="text-sm text-white/40 mt-1">Keep your account secure and manage login methods.</p>
                </div>

                <div className="space-y-4">
                   <div className="p-5 rounded-[20px] border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Shield size={16} className="text-white/40" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-semibold mb-0.5">Password</h4>
                          <p className="text-white/35 text-xs">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <button
                        onClick={() => showProfileNotice('Password change flow opened. You will need your current password and a new secure password.')}
                        className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors shrink-0"
                      >
                        Change
                      </button>
                   </div>

                   <div className="p-5 rounded-[20px] border border-emerald-500/20 bg-emerald-500/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-[12px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-semibold mb-0.5">Two-Factor Authentication</h4>
                          <p className="text-white/35 text-xs">Authy app is configured as your 2FA method.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => showProfileNotice('Two-factor authentication settings opened with authenticator and backup code options.')}
                        className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors shrink-0"
                      >
                        Configure
                      </button>
                   </div>

                   <div className="p-5 rounded-[20px] border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Globe size={16} className="text-white/40" />
                        </div>
                        <div>
                          <h4 className="text-white text-sm font-semibold mb-0.5">Active Sessions</h4>
                          <p className="text-white/35 text-xs">2 devices currently signed in</p>
                        </div>
                      </div>
                      <button
                        onClick={() => showProfileNotice('All other sessions were queued for sign out. This browser session stays active.')}
                        className="px-5 py-2 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs font-bold tracking-widest uppercase text-red-400/70 hover:text-red-400 transition-colors shrink-0"
                      >
                        Sign Out All
                      </button>
                   </div>
                </div>
             </motion.div>
          )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}
