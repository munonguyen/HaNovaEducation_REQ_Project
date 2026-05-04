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

export default function SupportComplaints() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState('Our support managers review all critical complaints within 24 hours.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(1);
      setDescription('');
      setFeedback('Your complaint (CMP-952) has been logged. A manager will reach out via notifications soon.');
    }, 1500);
  };

  return (
    <motion.div
      className="mx-auto min-h-screen max-w-[960px] px-8 pb-32 pt-[120px] text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
