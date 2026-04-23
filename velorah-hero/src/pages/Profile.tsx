import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CreditCard, Shield, Edit2, Bookmark, ChevronRight, Globe, Moon, Bell, CheckCircle2, LogOut, Camera, Mail, Phone, MapPin } from 'lucide-react';

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
  const requestedTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<ProfileTab>(isProfileTab(requestedTab) ? requestedTab : DEFAULT_TAB);
  const [toggles, setToggles] = useState({
    reminders: true,
    studyGroups: true,
    quietMode: false,
    emailDigest: true,
  });

  useEffect(() => {
    setActiveTab(isProfileTab(requestedTab) ? requestedTab : DEFAULT_TAB);
  }, [requestedTab]);

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

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
          <p className="text-white/50 text-lg mt-3">Manage your profile, learning preferences, and billing.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors text-xs font-bold uppercase tracking-widest text-red-400/70 hover:text-red-400 shrink-0">
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        
        {/* Left Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Profile Card */}
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-6 shadow-2xl glass-panel text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 p-0.5 mx-auto relative group cursor-pointer mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-serif">M</div>
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={18} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-serif text-white mb-0.5">Muno Nguyen</h3>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Student • Scholar Premium</p>
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-widest">3 Active Courses</span>
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
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                  <Edit2 size={12} /> Edit
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2 flex items-center gap-6 p-5 rounded-[20px] bg-white/[0.02] border border-white/5 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-serif shrink-0 border-2 border-white/20">M</div>
                  <div>
                    <h3 className="text-xl font-serif text-white">Muno Nguyen</h3>
                    <p className="text-sm text-white/40 mt-0.5">Student ID: HNV-2026-0847</p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><Mail size={10} /> Email</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">muno@hanova.edu</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><Phone size={10} /> Phone</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">+84 987 654 321</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><Globe size={10} /> Timezone</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">Indochina Time (GMT+7)</div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/30 mb-2 flex items-center gap-2"><MapPin size={10} /> Location</label>
                  <div className="p-3.5 bg-black/20 rounded-[14px] border border-white/5 text-white/90 text-sm mt-2">Ho Chi Minh City, Vietnam</div>
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
                       <button className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors">Manage Plan</button>
                       <button className="px-6 py-2.5 rounded-full bg-white/5 text-white/60 font-semibold text-sm border border-white/10 hover:bg-white/10 transition-colors">View History</button>
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
                  
                  <button className="w-full p-4 rounded-[18px] border border-dashed border-white/10 text-center text-xs text-white/30 hover:bg-white/[0.02] hover:text-white/50 transition-colors font-bold uppercase tracking-widest">
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
                      <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors shrink-0">Change</button>
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
                      <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-colors shrink-0">Configure</button>
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
                      <button className="px-5 py-2 rounded-full border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs font-bold tracking-widest uppercase text-red-400/70 hover:text-red-400 transition-colors shrink-0">Sign Out All</button>
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
