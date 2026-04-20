import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorName: string;
}

export default function BookingModal({ isOpen, onClose, tutorName }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [12, 13, 14, 15, 16]; // Mock dates
  const times = ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { opacity: 1, backdropFilter: 'blur(16px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.4 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.4 } }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const handleClose = () => {
    setTimeout(() => setStep(1), 500); // Reset after close animation
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-2xl bg-soft-charcoal/80 border border-moonlight-gray/30 rounded-[32px] overflow-hidden shadow-2xl glass-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-moonlight-gray/10">
              <div>
                <h3 className="text-xl font-serif text-white">Book Session</h3>
                <p className="text-sm text-moonlight-gray">with {tutorName}</p>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-moonlight-gray hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stepper */}
            <div className="flex gap-2 px-8 pt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div 
                    className="h-full bg-muted-amber"
                    initial={{ width: step >= i ? '100%' : '0%' }}
                    animate={{ width: step >= i ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="relative h-[360px] overflow-hidden">
              <AnimatePresence custom={1} mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 px-8 py-6 flex flex-col gap-6"
                  >
                    <h4 className="text-lg font-medium text-white flex items-center gap-2">
                      <CalendarIcon size={18} className="text-muted-amber" />
                      Select a Date
                    </h4>
                    <div className="flex gap-3">
                      {dates.map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`flex-1 py-4 flex flex-col items-center gap-1 rounded-2xl border transition-all duration-300 ${
                            selectedDate === d 
                            ? 'bg-muted-amber/20 border-muted-amber/50 text-white' 
                            : 'bg-white/5 border-moonlight-gray/20 text-moonlight-gray hover:bg-white/10'
                          }`}
                        >
                          <span className="text-xs uppercase tracking-wider">Oct</span>
                          <span className="text-2xl font-serif">{d}</span>
                        </button>
                      ))}
                    </div>

                    <h4 className="text-lg font-medium text-white flex items-center gap-2 mt-2">
                      <Clock size={18} className="text-muted-amber" />
                      Select a Time
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          disabled={!selectedDate}
                          className={`py-3 rounded-xl border transition-all duration-300 text-sm ${
                            !selectedDate ? 'opacity-50 cursor-not-allowed bg-white/5 border-moonlight-gray/10 text-moonlight-gray/50' :
                            selectedTime === t 
                            ? 'bg-muted-amber/20 border-muted-amber/50 text-white' 
                            : 'bg-midnight-navy/40 border-moonlight-gray/20 text-cream hover:bg-midnight-navy/60'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 px-8 py-6 flex flex-col gap-6"
                  >
                    <h4 className="text-lg font-medium text-white">Lesson Focus</h4>
                    <p className="text-sm text-moonlight-gray -mt-4">Briefly tell the mentor what you'd like to achieve.</p>
                    
                    <textarea 
                      placeholder="E.g., I'm struggling with derivatives and need help preparing for the upcoming mid-term..."
                      className="w-full h-32 bg-midnight-navy/40 border border-moonlight-gray/20 rounded-2xl p-4 text-cream placeholder-moonlight-gray/50 outline-none resize-none focus:border-muted-amber/50 transition-colors duration-300"
                    />

                    <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-moonlight-gray/10 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-dark/40 flex items-center justify-center">
                          <CheckCircle2 size={20} className="text-muted-amber" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Calculus 101 - 1 Hour</p>
                          <p className="text-xs text-moonlight-gray">Oct {selectedDate} at {selectedTime}</p>
                        </div>
                      </div>
                      <span className="text-xl font-serif text-muted-amber">$25</span>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 px-8 py-6 flex flex-col gap-6 items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-muted-amber/20 flex items-center justify-center mb-2">
                      <CreditCard size={28} className="text-muted-amber" />
                    </div>
                    <h4 className="text-2xl font-serif text-white">Secure Your Session</h4>
                    <p className="text-moonlight-gray max-w-sm">
                      Your booking is reserved for 10 minutes. Complete the payment of <strong className="text-white">$25</strong> to finalize.
                    </p>

                    <button 
                      onClick={() => {
                        handleClose();
                        alert('Integration to Payment Gateway (VNPay/Momo) would open here.');
                      }}
                      className="glass-button-primary pulse-glow mt-4 w-full max-w-sm rounded-full py-4 text-[15px] font-medium text-cream bg-muted-amber/20 border-muted-amber/40 hover:bg-muted-amber/30 transition-all duration-300 flex justify-center items-center gap-2"
                    >
                      Proceed to Payment <ChevronRight size={18} />
                    </button>
                    <p className="text-xs text-moonlight-gray/60 flex gap-2">
                      <span>🔒 Fully encrypted</span>
                      <span>•</span>
                      <span>Cancel anytime within 24h</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-8 py-5 border-t border-moonlight-gray/10 bg-midnight-navy/20">
              {step > 1 ? (
                <button 
                  onClick={prevStep}
                  className="text-sm text-moonlight-gray hover:text-white transition-colors"
                >
                  Back
                </button>
              ) : (
                <button 
                  onClick={handleClose}
                  className="text-sm text-moonlight-gray hover:text-white transition-colors"
                >
                  Cancel
                </button>
              )}
              
              {step < 3 && (
                <button 
                  onClick={nextStep}
                  disabled={step === 1 && (!selectedDate || !selectedTime)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    (step === 1 && (!selectedDate || !selectedTime))
                    ? 'bg-white/5 text-moonlight-gray/50 cursor-not-allowed'
                    : 'bg-white text-midnight-navy hover:scale-105'
                  }`}
                >
                  Continue <ChevronRight size={16} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
