import { useState } from 'react';
import {
  ShieldAlert,
  Send,
  History,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Upload,
  MessageSquare,
  LifeBuoy,
  X,
  Bell,
  FileCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'quality', label: 'Teaching Quality', icon: LifeBuoy, desc: 'Tutor behavior, knowledge gaps, or missed material.' },
  { id: 'payment', label: 'Payment & Billing', icon: ShieldAlert, desc: 'Incorrect charges, refund requests, or payment errors.' },
  { id: 'technical', label: 'Technical Issue', icon: AlertCircle, desc: 'App crashes, video/audio failure, or account access.' },
  { id: 'ethics', label: 'Ethics & Conduct', icon: ShieldAlert, desc: 'Harassment, unprofessionalism, or policy violations.' },
  { id: 'other', label: 'Other Support', icon: MessageSquare, desc: 'General inquiries and platform feedback.' },
];

const mockHistory = [
  { id: 'CMP-821', category: 'Payment', issue: 'Overcharged for Group Session', status: 'Resolved', date: '2 weeks ago', resolution: 'The extra $15 has been credited back to your scholarship balance.' },
  { id: 'CMP-945', category: 'Quality', issue: 'Tutor was 15 mins late', status: 'Investigating', date: 'Yesterday', resolution: null },
];

interface SubmissionNotification {
  caseId: string;
  category: string;
  timestamp: string;
}

export default function SupportComplaints() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('Our support managers review all critical complaints within 24 hours.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [notification, setNotification] = useState<SubmissionNotification | null>(null);

  const handleSubmit = () => {
    setIsSubmitting(true);
    const caseId = `CMP-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(1);
      setDescription('');
      setFeedback(`Your complaint (${caseId}) has been logged. A manager will reach out via notifications soon.`);
      setNotification({
        caseId,
        category: selectedCategory.label,
        timestamp,
      });
    }, 1500);
  };

  const dismissNotification = () => {
    setNotification(null);
  };

  return (
    <motion.div
      className="mx-auto min-h-screen max-w-[960px] px-8 pb-32 pt-[120px] text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ══ SUCCESS NOTIFICATION OVERLAY ══ */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md"
            onClick={dismissNotification}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="relative w-full max-w-md bg-[#0a0d16] border border-emerald-500/20 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(16,185,129,0.08)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow accent */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent)] pointer-events-none" />
              
              <button
                onClick={dismissNotification}
                className="absolute top-5 right-5 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/40 hover:text-white z-10"
              >
                <X size={14} />
              </button>

              <div className="px-8 pt-10 pb-8 text-center relative z-10">
                {/* Animated check icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.15 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.35, type: 'spring', damping: 10 }}
                  >
                    <CheckCircle2 size={36} className="text-emerald-400" />
                  </motion.div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-2xl font-serif text-white mb-2"
                >
                  Complaint Submitted
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-white/40 text-sm leading-relaxed mb-8"
                >
                  Your case has been successfully logged into the resolution system. Our support team will review and respond promptly.
                </motion.p>

                {/* Case details card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mb-6 text-left space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 block mb-1">CASE ID</span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">{notification.caseId}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Open</span>
                    </div>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 block mb-1">CATEGORY</span>
                      <span className="text-sm text-white/70">{notification.category}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 block mb-1">SUBMITTED</span>
                      <span className="text-sm text-white/70">{notification.timestamp}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline expectations */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-4 mb-8 text-left"
                >
                  <div className="flex items-start gap-3">
                    <Bell size={16} className="text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        <strong className="text-blue-400">Next steps:</strong> You will receive a notification once a manager begins reviewing your case. Most complaints are acknowledged within <strong className="text-white/80">24 hours</strong>.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={() => { dismissNotification(); setShowHistory(true); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all text-xs font-bold uppercase tracking-widest"
                  >
                    <FileCheck size={14} /> View History
                  </button>
                  <button
                    onClick={dismissNotification}
                    className="flex-1 py-3.5 rounded-full bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                  >
                    Done
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35 flex items-center gap-2">
              <LifeBuoy size={12} /> UC-12 Support & Resolution
            </span>
            <h1 className="mt-3 font-serif text-4xl lg:text-5xl text-white">Support Center</h1>
            <p className="mt-4 max-w-xl text-lg text-white/40 leading-relaxed">
              We maintain a professional "Academic Sanctuary". If your experience falls short of our standards, we are here to resolve it.
            </p>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest text-white/60"
          >
            {showHistory ? <Send size={14} /> : <History size={14} />}
            {showHistory ? 'Submit New' : 'Case History'}
          </button>
        </div>

        <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} className="text-emerald-400" />
          </div>
          <div>
            <strong className="text-emerald-400 text-sm block mb-1">Response Guarantee</strong>
            <p className="text-white/50 text-xs leading-relaxed">{feedback}</p>
          </div>
        </section>
      </header>

      <AnimatePresence mode="wait">
        {showHistory ? (
          <motion.div 
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-serif mb-6 text-white/80">Your Resolution History</h2>
            {mockHistory.map((item) => (
              <article key={item.id} className="p-6 rounded-[24px] border border-white/10 bg-white/[0.03] glass-panel group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 text-[9px] font-bold uppercase tracking-widest">
                      {item.id}
                    </span>
                    <span className="text-white font-semibold">{item.category} • {item.issue}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {item.status}
                  </span>
                </div>
                {item.resolution && (
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white/60 italic mb-3">
                    "{item.resolution}"
                  </div>
                )}
                <div className="flex items-center gap-2 text-[11px] text-white/20 uppercase tracking-widest font-bold">
                  <Clock size={12} /> Logged {item.date}
                </div>
              </article>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {step === 1 ? (
              <div className="space-y-8">
                <h2 className="text-xl font-serif text-white/80">1. Select issue category</h2>
                <div className="grid gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-start gap-5 p-6 rounded-[24px] border transition-all duration-300 text-left ${
                        selectedCategory.id === cat.id 
                          ? 'bg-white/[0.08] border-white/20 shadow-xl scale-[1.01]' 
                          : 'bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${selectedCategory.id === cat.id ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5 border border-white/10'}`}>
                        <cat.icon size={22} className={selectedCategory.id === cat.id ? 'text-blue-400' : 'text-white/30'} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold text-lg">{cat.label}</h3>
                          {selectedCategory.id === cat.id && <CheckCircle2 size={18} className="text-blue-400" />}
                        </div>
                        <p className="text-white/40 text-sm mt-1 leading-relaxed">{cat.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-all shadow-xl"
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setStep(1)} className="text-white/30 hover:text-white transition-colors">
                    <History size={18} />
                  </button>
                  <h2 className="text-xl font-serif text-white/80">2. Describe the issue</h2>
                </div>

                <article className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <selectedCategory.icon size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <strong className="text-white/80 text-sm">{selectedCategory.label}</strong>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">Category context</p>
                  </div>
                </article>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 block px-1">Case details & Timeline</label>
                  <textarea 
                    autoFocus
                    className="w-full min-h-[200px] p-6 rounded-[28px] border border-white/10 bg-white/[0.02] text-white placeholder:text-white/10 focus:border-white/20 focus:bg-white/[0.04] transition-all outline-none leading-relaxed"
                    placeholder="Tell our resolution team exactly what happened. Include dates, tutor names, or booking IDs if applicable..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                   <div className="p-6 rounded-[24px] border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                      <Upload size={24} className="text-white/20 group-hover:text-white/40 transition-colors" />
                      <div className="text-center">
                        <span className="text-xs font-bold text-white/40 block">Attach Evidence</span>
                        <span className="text-[10px] text-white/10 block mt-1">Screenshots, logs, or files</span>
                      </div>
                   </div>
                   <div className="p-6 rounded-[24px] border border-white/5 bg-white/[0.01] flex flex-col justify-center gap-2">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">SLA Priority: High</span>
                      </div>
                      <p className="text-[11px] text-white/30 leading-relaxed">
                        Based on your category, this case will be reviewed by a lead manager within one business day.
                      </p>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-8">
                  <button 
                    onClick={() => setStep(1)}
                    className="text-white/40 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest"
                  >
                    Back to category
                  </button>
                  <button 
                    disabled={!description.trim() || isSubmitting}
                    onClick={handleSubmit}
                    className="flex items-center gap-3 px-10 py-4 rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-30 disabled:shadow-none"
                  >
                    {isSubmitting ? 'Logging case...' : 'Submit Resolution Request'}
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-32 pt-12 border-t border-white/5 text-center">
        <p className="text-white/20 text-[10px] uppercase tracking-widest font-medium leading-relaxed max-w-sm mx-auto">
          All complaints are logged in your permanent audit history and governed by HaNova's Professional Excellence Policy.
        </p>
      </footer>
    </motion.div>
  );
}
