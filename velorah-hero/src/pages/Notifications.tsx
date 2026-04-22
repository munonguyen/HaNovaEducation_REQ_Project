import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, MessageSquare, BookOpen, AlertCircle, Check, CheckCircle2, Video, Clock, Award, UserPlus, Zap, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: Bell },
  { id: 'unread', label: 'Unread', icon: AlertCircle },
  { id: 'sessions', label: 'Sessions', icon: Calendar },
  { id: 'academic', label: 'Academic', icon: BookOpen },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'system', label: 'System', icon: Zap },
];

const initialNotifications = [
  {
    id: 1,
    type: 'session',
    title: 'Session Starting in 45 Minutes',
    description: 'Advanced Calculus: Limits & Continuity with Dr. Jane Smith. Your virtual studio is ready.',
    time: '45 min ago',
    date: 'Today',
    unread: true,
    actionText: 'Join Studio',
    actionType: 'primary' as const,
    accent: 'blue',
  },
  {
    id: 2,
    type: 'message',
    title: 'Emma Farooq sent you a message',
    description: '"I have uploaded the handout for our Phonetics practice session. Please review it before tomorrow\'s class — particularly pages 12-18."',
    time: '2h ago',
    date: 'Today',
    unread: true,
    actionText: 'Reply',
    actionType: 'secondary' as const,
    accent: 'emerald',
  },
  {
    id: 3,
    type: 'academic',
    title: 'Assignment Graded: Syntax Trees',
    description: 'Your essay was graded by Emma Farooq. Score: 92/100. "Excellent structural analysis — your tree diagrams are particularly well drawn."',
    time: '5h ago',
    date: 'Today',
    unread: true,
    actionText: 'View Feedback',
    actionType: 'secondary' as const,
    accent: 'amber',
  },
  {
    id: 4,
    type: 'session',
    title: 'Session Rescheduled',
    description: 'Your "Thermodynamics Lab" session with Dr. Jane Smith has been moved from Oct 16 to Oct 18, 10:00 AM. Reason: Tutor personal leave.',
    time: 'Yesterday',
    date: 'Oct 20',
    unread: false,
    accent: 'orange',
  },
  {
    id: 5,
    type: 'academic',
    title: 'New Milestone Unlocked',
    description: 'You\'ve completed 4 out of 6 topics in "Midterm Prep Mastery". Keep up the excellent momentum — only 2 topics remaining!',
    time: 'Yesterday',
    date: 'Oct 20',
    unread: false,
    accent: 'purple',
  },
  {
    id: 6,
    type: 'system',
    title: 'Platform Update: Dark Mode Enhanced',
    description: 'We\'ve improved contrast ratios across all pages for better readability. Your settings have been preserved.',
    time: '2 days ago',
    date: 'Oct 19',
    unread: false,
    accent: 'slate',
  },
  {
    id: 7,
    type: 'session',
    title: 'Session Completed',
    description: 'Your "Algorithm Complexity" session with Prof. David Chen was marked as completed. Don\'t forget to review the recording.',
    time: '3 days ago',
    date: 'Oct 18',
    unread: false,
    actionText: 'View Recording',
    actionType: 'secondary' as const,
    accent: 'purple',
  },
  {
    id: 8,
    type: 'message',
    title: 'Dr. Jane Smith shared a resource',
    description: '"Here\'s the supplementary reading on Special Relativity. Focus on chapters 2 and 4 for our next session."',
    time: '3 days ago',
    date: 'Oct 18',
    unread: false,
    actionText: 'Download',
    actionType: 'secondary' as const,
    accent: 'emerald',
  },
];

const accentColors: Record<string, { icon: string; bg: string; border: string; glow: string }> = {
  blue:    { icon: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]' },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]' },
  amber:   { icon: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]' },
  orange:  { icon: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20',  glow: 'shadow-[0_0_20px_rgba(249,115,22,0.15)]' },
  purple:  { icon: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]' },
  slate:   { icon: 'text-slate-400',   bg: 'bg-slate-500/10',   border: 'border-slate-500/20',   glow: '' },
};

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return n.unread;
    if (activeTab === 'sessions') return n.type === 'session';
    if (activeTab === 'academic') return n.type === 'academic';
    if (activeTab === 'messages') return n.type === 'message';
    if (activeTab === 'system') return n.type === 'system';
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'session': return <Video size={18} />;
      case 'message': return <MessageSquare size={18} />;
      case 'academic': return <Award size={18} />;
      case 'system': return <Zap size={18} />;
      default: return <Bell size={18} />;
    }
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return notifications.length;
    if (catId === 'unread') return unreadCount;
    if (catId === 'sessions') return notifications.filter(n => n.type === 'session').length;
    if (catId === 'academic') return notifications.filter(n => n.type === 'academic').length;
    if (catId === 'messages') return notifications.filter(n => n.type === 'message').length;
    if (catId === 'system') return notifications.filter(n => n.type === 'system').length;
    return 0;
  };

  // Group notifications by date for the feed
  const grouped = filteredNotifications.reduce<Record<string, typeof filteredNotifications>>((acc, n) => {
    const key = n.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-[120px] pb-32 px-8 max-w-[1500px] mx-auto text-white font-sans"
    >
      {/* Header */}
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-serif text-white tracking-tight">Notifications</h1>
          <p className="text-white/50 text-lg max-w-2xl mt-3">
            Stay updated on sessions, grades, and messages from your mentors.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-widest">
              {unreadCount} unread
            </span>
          )}
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white backdrop-blur-sm"
          >
            <CheckCircle2 size={14} /> Mark All Read
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8 h-[calc(100vh-260px)] min-h-[500px]">
        
        {/* LEFT PANEL: CATEGORIES */}
        <div className="flex flex-col h-full">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] p-5 shadow-2xl glass-panel flex flex-col h-full">
            
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/30 px-3 mb-4">Categories</h4>
            
            <div className="space-y-1 flex-1">
              {categories.map(cat => {
                const isActive = activeTab === cat.id;
                const count = getCategoryCount(cat.id);
                const hasUnread = cat.id === 'unread' && count > 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                      isActive 
                       ? 'bg-white/[0.08] shadow-lg border border-white/15' 
                       : 'border border-transparent hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={16} className={isActive ? 'text-white' : 'text-white/30'} />
                      <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/50'}`}>{cat.label}</span>
                    </div>
                    <span className={`min-w-[24px] h-[24px] flex items-center justify-center rounded-full text-[10px] font-bold ${
                      hasUnread 
                        ? 'bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]' 
                        : isActive 
                          ? 'bg-white/15 text-white' 
                          : 'bg-white/5 text-white/30'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-5 pt-5 border-t border-white/5">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={12} className="text-white/30" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">This Week</span>
                </div>
                <p className="text-sm text-white/70">{notifications.filter(n => n.type === 'session').length} session alerts</p>
                <p className="text-sm text-white/70">{notifications.filter(n => n.type === 'academic').length} academic updates</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: FEED */}
        <div className="flex flex-col h-full min-h-0">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.01] overflow-hidden shadow-2xl glass-panel flex-1 flex flex-col min-h-0">
            
            {/* Feed Header */}
            <div className="px-8 py-5 border-b border-white/5 bg-black/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-serif tracking-wide">{categories.find(c => c.id === activeTab)?.label}</h3>
                <span className="text-[10px] bg-white/5 px-2.5 py-1 rounded-full font-bold text-white/30 uppercase tracking-widest">{filteredNotifications.length}</span>
              </div>
            </div>

            {/* Feed Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              <AnimatePresence mode="popLayout">
                {filteredNotifications.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6">
                      <Bell size={32} className="text-white/10" />
                    </div>
                    <h4 className="text-xl font-serif text-white/50 mb-2">You're all caught up!</h4>
                    <p className="text-sm text-white/25 max-w-xs">No notifications in this category. Check back later.</p>
                  </motion.div>
                )}

                {Object.entries(grouped).map(([date, items]) => (
                  <div key={date} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-3 mb-3 px-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">{date}</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>
                    
                    <div className="space-y-3">
                      {items.map((notif, i) => {
                        const colors = accentColors[notif.accent] || accentColors.slate;
                        return (
                          <motion.div
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, delay: i * 0.04 }}
                            key={notif.id}
                            className={`relative group rounded-[20px] border p-5 flex gap-5 items-start transition-all duration-300 cursor-pointer
                              ${notif.unread 
                                ? `bg-white/[0.04] border-white/10 ${colors.glow} hover:bg-white/[0.07]` 
                                : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.04]'
                              }`}
                          >
                            {/* Unread accent bar */}
                            {notif.unread && (
                              <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full ${colors.bg.replace('/10', '')} opacity-80`} />
                            )}

                            {/* Icon */}
                            <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 ${colors.bg} ${colors.border} border`}>
                              <div className={colors.icon}>{getIcon(notif.type)}</div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-1.5">
                                <h4 className={`text-[15px] font-semibold leading-snug ${notif.unread ? 'text-white' : 'text-white/65'}`}>{notif.title}</h4>
                                <span className="text-[10px] text-white/25 uppercase tracking-widest whitespace-nowrap mt-0.5 shrink-0">{notif.time}</span>
                              </div>
                              <p className={`text-[13px] leading-relaxed mb-3 ${notif.unread ? 'text-white/60' : 'text-white/40'}`}>
                                {notif.description}
                              </p>
                              
                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                {notif.actionText && (
                                  <button className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${
                                    notif.actionType === 'primary' 
                                      ? `${colors.bg} ${colors.icon} ${colors.border} border hover:brightness-125`
                                      : 'bg-white/5 text-white/60 border border-white/8 hover:bg-white/10'
                                  }`}>
                                    {notif.actionText} <ChevronRight size={12} />
                                  </button>
                                )}
                                
                                {notif.unread && (
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                                    className="ml-auto w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                                    title="Mark as read"
                                  >
                                    <Check size={12} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
