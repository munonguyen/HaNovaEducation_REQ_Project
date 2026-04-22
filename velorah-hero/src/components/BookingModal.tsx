import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  Smartphone,
  Info,
  ChevronDown,
  AlertCircle,
  Percent
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorName: string;
  hourlyRate?: number;
  subject?: string;
  formats?: string[];
}

const timeSlots = [
  { label: '09:00 AM', note: 'Most requested' },
  { label: '11:00 AM', note: 'Quiet review' },
  { label: '02:00 PM', note: 'After class' },
  { label: '04:30 PM', note: 'Evening prep' },
];

const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PlanType = 'single' | 'monthly' | 'course';

export default function BookingModal({
  isOpen,
  onClose,
  tutorName,
  hourlyRate = 25,
  subject = 'Focused Lesson',
  formats = ['1:1 Live Session'],
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 9, 1)); // Start at Oct 2026
  
  // Store full date object
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 9, 13));
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[1]?.label ?? null);
  
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('single');
  const [selectedPayment, setSelectedPayment] = useState('vnpay');
  const [policyExpanded, setPolicyExpanded] = useState(false);
  const [policyAgreed, setPolicyAgreed] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins

  // Full calendar generation
  const calendarDays = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Make Monday index 0
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];
    
    // Previous month filler
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isAvailable: false, isFull: false, dateObj: null });
    }
    
    const today = new Date(2026, 9, 12); // Simulated today

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const isAvailable = i % 2 !== 0 && i !== 25; // Simulator logic
        const isFull = i === 15 || i === 22; // Simulated fully booked
        const dateObj = new Date(year, month, i);
        const isToday = dateObj.getTime() === today.getTime();

        days.push({ 
           day: i, 
           isCurrentMonth: true, 
           isAvailable, 
           isFull,
           isToday,
           dateObj
        });
    }
    
    // Next month filler
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
        days.push({ day: i, isCurrentMonth: false, isAvailable: false, isFull: false, isToday: false, dateObj: null });
    }
    
    return days;
  }, [currentMonthDate]);

  const handlePrevMonth = () => setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' });
  const yearName = currentMonthDate.getFullYear();

  // Timer logic for Step 3
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (step === 3 && isOpen) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const resetTimer = window.setTimeout(() => {
      setStep(1);
      setSelectedPlan('single');
      setPolicyAgreed(false);
      setPolicyExpanded(false);
      setTimeLeft(600);
      setSelectedPayment('vnpay');
    }, 0);

    return () => window.clearTimeout(resetTimer);
  }, [isOpen]);

  const plans = {
    single: {
      id: 'single',
      title: 'Single Session',
      desc: 'Flexible booking, no commitment.',
      price: hourlyRate,
      sessions: 1,
      discount: 0,
      badge: null,
    },
    monthly: {
      id: 'monthly',
      title: 'Monthly Plan',
      desc: 'Recurring weekly schedule.',
      price: Math.round(hourlyRate * 4 * 0.9), // 10% off
      sessions: 4,
      discount: 10,
      badge: 'Most popular',
    },
    course: {
      id: 'course',
      title: 'Full Course Package',
      desc: 'Structured learning path over weeks.',
      price: Math.round(hourlyRate * 12 * 0.8), // 20% off
      sessions: 12,
      discount: 20,
      badge: 'Best value',
    },
  };

  const currentPlan = plans[selectedPlan];
  const serviceFee = Math.round(currentPlan.price * 0.05);
  const total = currentPlan.price + serviceFee;
  const originalPrice = hourlyRate * currentPlan.sessions;
  const savings = originalPrice - currentPlan.price;

  const displayDateStr = selectedDate 
    ? `${selectedDate.toLocaleString('default', { month: 'short' })} ${selectedDate.getDate()}`
    : 'Choose date';

  const bookingReference = `HN-${String(selectedDate?.getDate() ?? 0).padStart(2, '0')}${String(total).padStart(2, '0')}X`;

  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(18px)',
      transition: { duration: 0.6, ease: motionEase },
    },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.35 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 26 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: motionEase, delay: 0.05 } },
    exit: { opacity: 0, scale: 0.97, y: 20, transition: { duration: 0.3 } },
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 42 : -42, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: motionEase } },
    exit: (direction: number) => ({ x: direction < 0 ? 42 : -42, opacity: 0, transition: { duration: 0.25 } }),
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, 4));
  const prevStep = () => setStep((current) => Math.max(current - 1, 1));

  const canContinue = Boolean(
    (step === 1 && selectedDate !== null && selectedTime !== null) || 
    (step === 2 && selectedPlan !== null) || 
    (step === 3 && policyAgreed) || 
    step === 4
  );

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-5xl overflow-hidden rounded-[34px] border border-moonlight-gray/20 bg-soft-charcoal/95 shadow-[0_45px_120px_rgba(0,0,0,0.65)] glass-panel"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(212,163,91,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_40%)]" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 px-8 py-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-moonlight-gray/70">Secure Booking Process</p>
                <h3 className="mt-2 text-2xl font-serif text-white">Reserve your learning path</h3>
              </div>
              {step === 3 && (
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                   <Clock size={14} className="text-red-400" />
                   <span className="text-xs font-medium text-red-400">Slot expires in {formatTime(timeLeft)}</span>
                </div>
              )}
              <button
                onClick={onClose}
                className="rounded-full p-2 text-moonlight-gray transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="relative border-b border-white/10 px-8 py-4 bg-white/[0.01]">
              <div className="grid grid-cols-4 gap-3">
                {['Schedule', 'Learning Plan', 'Payment Review', 'Confirmed'].map((label, index) => {
                  const current = index + 1;
                  const active = step >= current;
                  return (
                    <div key={label} className="space-y-2">
                      <div className="h-1 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-blue-500"
                          initial={{ width: active ? '100%' : '0%' }}
                          animate={{ width: active ? '100%' : '0%' }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                        />
                      </div>
                      <p className={`text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium ${active ? 'text-white/80' : 'text-moonlight-gray/40'}`}>
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="relative w-full h-[600px] min-h-[600px] overflow-hidden overflow-y-auto custom-scrollbar">
              <AnimatePresence custom={1} mode="wait">
                
                {/* STEP 1: SCHEDULE */}
                {step === 1 && (
                  <motion.div
                    key="schedule"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 grid gap-8 px-8 py-8 lg:grid-cols-[1.3fr_0.7fr] overflow-y-auto custom-scrollbar"
                  >
                    <div className="space-y-8">
                      <div>
                        <h4 className="flex items-center gap-2 text-lg font-medium text-white mb-2">
                          <CalendarIcon size={18} className="text-blue-400" />
                          Choose your starting date
                        </h4>
                        <p className="text-[13.5px] text-moonlight-gray/80 leading-relaxed">
                          Select a date that matches your learning rhythm and tutor availability. Your selected date will automatically serve as the first session or the beginning of your long-term study plan.
                        </p>
                      </div>

                      {/* Premium Calendar Segment */}
                      <div className="rounded-[28px] border border-white/10 bg-white/[0.01] overflow-hidden p-6 relative">
                         {/* Calendar Header */}
                         <div className="flex items-center justify-between mb-8">
                            <h5 className="text-xl md:text-2xl font-serif text-white tracking-wide">{monthName} {yearName}</h5>
                            <div className="flex items-center gap-2">
                               <button onClick={handlePrevMonth} className="p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                                  <ChevronLeft size={18} />
                               </button>
                               <button onClick={handleNextMonth} className="p-2 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                                  <ChevronRight size={18} />
                               </button>
                            </div>
                         </div>
                         
                         {/* Calendar Days Header */}
                         <div className="grid grid-cols-7 gap-1 md:gap-2 mb-3">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                               <div key={d} className="text-center text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold py-1">
                                  {d}
                               </div>
                            ))}
                         </div>
                         
                         {/* Calendar Grid */}
                         <div className="grid grid-cols-7 gap-2 md:gap-3">
                            {calendarDays.map((d, idx) => {
                               // Check selection accurately
                               const isSelected = selectedDate !== null && d.dateObj !== null && selectedDate.getTime() === d.dateObj.getTime();
                               const isDisabled = !d.isCurrentMonth || (!d.isAvailable && !d.isFull);
                               
                               return (
                                  <button 
                                    key={idx}
                                    disabled={isDisabled || d.isFull}
                                    onClick={() => d.dateObj && d.isAvailable && setSelectedDate(d.dateObj)}
                                    className={`relative flex items-center justify-center w-full aspect-square rounded-[18px] text-[15px] font-medium transition-all duration-300
                                      ${isSelected ? 'bg-blue-500/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] border border-blue-400/50' : ''}
                                      ${!isSelected && d.isCurrentMonth && d.isAvailable ? 'bg-white/[0.03] text-white/80 hover:bg-white/[0.06] hover:border-white/20 border border-transparent' : ''}
                                      ${!isSelected && d.isCurrentMonth && d.isFull ? 'bg-white/[0.01] text-white/40 cursor-not-allowed opacity-50' : ''}
                                      ${!d.isCurrentMonth ? 'text-transparent cursor-default pointer-events-none' : ''}
                                      ${d.isToday && !isSelected ? 'ring-1 ring-inset ring-white/20' : ''}
                                    `}
                                  >
                                    <span className="relative z-10">{d.isCurrentMonth ? d.day : ''}</span>
                                    
                                    {/* Availability Dot */}
                                    {d.isCurrentMonth && d.isAvailable && !isSelected && (
                                       <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400/60 block shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                                    )}

                                    {/* Fully Booked Line */}
                                    {d.isCurrentMonth && d.isFull && (
                                       <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-red-400/40 block" />
                                    )}
                                  </button>
                               )
                            })}
                         </div>
                      </div>

                      {/* Time Slots (Only visible if date is selected) */}
                      <AnimatePresence>
                         {selectedDate && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="pt-2 border-t border-white/10"
                            >
                              <h4 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                                <Clock size={18} className="text-blue-400" />
                                Available session windows
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {timeSlots.map((slot) => (
                                  <button
                                    key={slot.label}
                                    onClick={() => setSelectedTime(slot.label)}
                                    className={`rounded-[18px] border px-5 py-4 text-left transition-all duration-300 ${
                                      selectedTime === slot.label
                                        ? 'border-blue-400/50 bg-blue-500/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                                        : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:bg-white/[0.05]'
                                    }`}
                                  >
                                    <div className="flex flex-col gap-1">
                                      <span className="text-[16px] font-medium">{slot.label}</span>
                                      <span className="text-[10px] uppercase tracking-widest text-white/40">
                                        {slot.note}
                                      </span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                         )}
                      </AnimatePresence>
                    </div>

                    <div className="hidden lg:block h-max rounded-[32px] border border-white/10 bg-white/[0.02] p-8 mt-2 sticky top-6 shadow-2xl">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 font-bold">Booking Details</p>
                      
                      <div className="mt-8 space-y-6">
                        <div>
                          <p className="text-sm text-white/50 mb-1">Mentor / Advisor</p>
                          <p className="text-[22px] font-serif text-white">{tutorName}</p>
                        </div>
                        <div className="border-t border-white/5 pt-6">
                          <p className="text-sm text-white/50 mb-1">Subject Scope</p>
                          <p className="text-white text-[15px]">{subject}</p>
                        </div>
                        <div className="rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent)] p-6 mt-4">
                          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-blue-400/80 mb-2">First Session Setup</p>
                          <p className="text-xl text-white font-serif">
                            {displayDateStr} {selectedTime ? `• ${selectedTime}` : ''}
                          </p>
                          <p className="text-[13px] text-white/40 mt-3 leading-relaxed">
                            This date will be automatically used to structure the syllabus if you select a Monthly Plan or Full Course later.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: LEARNING PLAN */}
                {step === 2 && (
                  <motion.div
                    key="plan"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col px-8 py-8 overflow-y-auto custom-scrollbar"
                  >
                    <div className="text-center mb-10">
                      <h4 className="text-2xl font-serif text-white mb-2">Choose your learning plan</h4>
                      <p className="text-sm text-moonlight-gray">
                        Select a package that best fits your academic commitment and budget.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
                      {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => {
                        const plan = plans[key];
                        const active = selectedPlan === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                               setSelectedPlan(key);
                               if (step === 2) {
                                  setTimeout(() => setStep(3), 350);
                               }
                            }}
                            className={`relative text-left flex flex-col p-6 rounded-[28px] border transition-all duration-300 ease-out overflow-hidden group ${
                              active
                                ? 'border-amber-400 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15),transparent)] shadow-[0_0_30px_rgba(251,191,36,0.1)]'
                                : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                          >
                            {plan.badge && (
                              <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-[16px] text-[10px] font-bold uppercase tracking-widest ${active ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/80'}`}>
                                {plan.badge}
                              </div>
                            )}
                            
                            <div className="mb-8 mt-2">
                               <h5 className={`text-xl font-serif mb-2 ${active ? 'text-amber-400' : 'text-white'}`}>{plan.title}</h5>
                               <p className="text-sm text-white/50 leading-relaxed min-h-[40px]">{plan.desc}</p>
                            </div>

                            <div className="mt-auto">
                               <div className="flex items-end gap-2 mb-1">
                                  <span className="text-3xl font-serif text-white leading-none">${plan.price}</span>
                               </div>
                               <p className="text-sm text-white/40 mb-5">{plan.sessions} session{plan.sessions > 1 ? 's' : ''}</p>
                               
                               <div className={`flex items-center justify-center p-3 rounded-xl border transition-colors ${active ? 'bg-amber-400 text-black border-amber-400 font-bold' : 'bg-white/[0.04] text-white/70 border-white/10 group-hover:bg-white/10'}`}>
                                  {active ? 'Selected' : 'Choose Plan'}
                               </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PAYMENT REVIEW */}
                {step === 3 && (
                  <motion.div
                    key="payment"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 grid gap-8 px-8 py-8 lg:grid-cols-[1fr_360px] overflow-y-auto custom-scrollbar"
                  >
                    {/* LEFT PANEL */}
                    <div className="space-y-8 pr-2">
                      {/* Booking Summary */}
                      <div>
                        <h4 className="text-lg font-serif text-white border-b border-white/10 pb-3 mb-4">Plan Summary</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                           <div className="p-4 rounded-[20px] bg-white/[0.02] border border-white/5">
                             <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1 font-bold">Subject & Format</p>
                             <p className="text-sm text-white/90">{subject}</p>
                             <p className="text-sm text-white/50 mt-1">{formats[0]} • 60 mins</p>
                           </div>
                           <div className="p-4 rounded-[20px] bg-white/[0.02] border border-white/5">
                             <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1 font-bold">First Session</p>
                             <p className="text-sm text-white/90">{displayDateStr} • {selectedTime}</p>
                             <p className="text-sm text-white/50 mt-1">With {tutorName}</p>
                           </div>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h4 className="text-lg font-serif text-white border-b border-white/10 pb-3 mb-4">Payment Method</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                           {[
                             { id: 'vnpay', lbl: 'VNPay', desc: 'Secure local banking', icon: Landmark, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                             { id: 'momo', lbl: 'MoMo', desc: 'Fast digital wallet', icon: Smartphone, color: 'text-pink-400', bg: 'bg-pink-400/10' }
                           ].map(pm => {
                             const Ico = pm.icon;
                             const active = selectedPayment === pm.id;
                             return (
                               <button
                                 key={pm.id}
                                 onClick={() => setSelectedPayment(pm.id)}
                                 className={`flex items-center gap-4 p-4 rounded-[20px] border transition-all ${active ? 'border-white/40 bg-white/[0.06]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'}`}
                               >
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${active ? pm.bg : 'bg-white/5'}`}>
                                    <Ico size={24} className={active ? pm.color : 'text-white/40'} />
                                  </div>
                                  <div className="text-left">
                                     <p className="text-white font-medium">{pm.lbl}</p>
                                     <p className="text-[11px] text-white/50">{pm.desc}</p>
                                  </div>
                               </button>
                             )
                           })}
                        </div>
                      </div>

                      {/* Refund & Cancellation Policy */}
                      <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                         <button 
                           onClick={() => setPolicyExpanded(!policyExpanded)}
                           className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                         >
                           <div className="flex items-center gap-3 text-white/90 font-medium">
                              <AlertCircle size={18} className="text-amber-400" />
                              Cancellation & Refund Policy
                           </div>
                           <ChevronDown size={18} className={`text-white/40 transition-transform ${policyExpanded ? 'rotate-180' : ''}`} />
                         </button>
                         <AnimatePresence>
                            {policyExpanded && (
                               <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="px-5 pb-5 pt-0 text-[13px] text-white/60 leading-relaxed border-t border-white/5 mt-2 pt-4"
                               >
                                  <ul className="list-disc pl-5 space-y-2 mb-4">
                                     <li>Free cancellation up to 24 hours before the scheduled session.</li>
                                     <li>50% refund applied for cancellations within 12-24 hours.</li>
                                     <li>No-shows or cancellations within 12 hours are non-refundable.</li>
                                     <li>Only reviews can be submitted after successful completion of a lesson.</li>
                                  </ul>
                               </motion.div>
                            )}
                         </AnimatePresence>
                         
                         <label className="flex items-start gap-3 p-5 border-t border-white/5 bg-white/[0.01] cursor-pointer group">
                            <div className={`mt-0.5 w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${policyAgreed ? 'bg-amber-400 border-amber-400' : 'bg-transparent border-white/30 group-hover:border-white/50'}`}>
                               {policyAgreed && <CheckCircle2 size={14} className="text-black" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={policyAgreed} onChange={(e) => setPolicyAgreed(e.target.checked)} />
                            <span className="text-sm text-white/80 select-none">I have read and agree to the Cancellation & Refund Policy.</span>
                         </label>
                      </div>
                    </div>

                    {/* RIGHT PANEL: PRICE BREAKDOWN */}
                    <div className="h-max sticky top-0 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(6,8,19,0.5))] p-6 shadow-2xl">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 font-bold mb-5 block">Order Breakdown</p>
                      
                      <div className="mb-6">
                        <h4 className="text-2xl font-serif text-white">{currentPlan.title}</h4>
                        {currentPlan.discount > 0 && (
                          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            <Percent size={12} /> You save {currentPlan.discount}%
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between text-[15px]">
                          <span className="text-white/60">Base sessions ({currentPlan.sessions})</span>
                          <span className="text-white/90">${originalPrice}</span>
                        </div>
                        
                        {currentPlan.discount > 0 && (
                          <div className="flex items-center justify-between text-[15px]">
                            <span className="text-emerald-400/80">Package discount</span>
                            <span className="text-emerald-400">- ${savings}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-[15px]">
                          <span className="text-white/60 flex items-center gap-1.5">Platform service fee <Info size={12} className="text-white/30"/></span>
                          <span className="text-white/90">${serviceFee}</span>
                        </div>
                      </div>

                      <div className="border-t border-white/10 mt-6 pt-6 flex items-end justify-between">
                        <div>
                           <span className="block text-white/50 text-sm mb-1">Total due</span>
                           <span className="text-3xl font-serif text-amber-400 leading-none">${total}</span>
                        </div>
                      </div>

                      <div className="mt-8 rounded-[16px] bg-white/[0.02] border border-white/5 p-4 flex items-start gap-3">
                         <ShieldCheck size={18} className="text-white/40 shrink-0 mt-0.5" />
                         <p className="text-[12px] leading-relaxed text-white/50">Processing securely via {selectedPayment === 'vnpay' ? 'VNPay' : 'MoMo Wallet'}. Receipt generated instantly upon confirmation.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONFIRMED */}
                {step === 4 && (
                  <motion.div
                    key="success"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-[32px] bg-gradient-to-br from-emerald-400/20 to-teal-500/10 border border-emerald-500/30 mb-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                      >
                         <CheckCircle2 size={40} className="text-emerald-400" />
                      </motion.div>
                    </div>
                    
                    <h4 className="max-w-xl text-4xl font-serif text-white mb-4">
                      Payment Successful!
                    </h4>
                    <p className="max-w-md text-[15px] leading-relaxed text-white/60 mb-10">
                      Your <strong>{currentPlan.title}</strong> with {tutorName} is confirmed. A receipt and calendar invite have been sent to your email.
                    </p>

                    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3 text-left">
                      <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-2">First Session</p>
                        <p className="text-white font-medium">{displayDateStr} • {selectedTime}</p>
                      </div>
                      <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-2">Reference ID</p>
                        <p className="text-white font-medium">{bookingReference}</p>
                      </div>
                      <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 mb-2">Next Steps</p>
                        <p className="text-white/80 text-[13px] leading-snug">Study plan will be shared 24h prior.</p>
                      </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                       <button onClick={onClose} className="px-8 py-3.5 rounded-full border border-white/10 text-white hover:bg-white/[0.04] transition-colors font-medium">
                          Close Window
                       </button>
                       <button onClick={onClose} className="px-8 py-3.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors font-medium shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                          Go to Dashboard
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            <div className="relative flex items-center justify-between border-t border-white/10 bg-black/20 px-8 py-6">
              {step > 1 && step < 4 ? (
                <button onClick={prevStep} className="text-sm font-medium text-white/50 transition-colors hover:text-white">
                  Go Back
                </button>
              ) : (
                <button onClick={onClose} className="text-sm font-medium text-white/50 transition-colors hover:text-white">
                  {step === 4 ? '' : 'Cancel'}
                </button>
              )}

              {step < 4 && (
                <button
                  onClick={() => {
                     if (canContinue) nextStep();
                  }}
                  disabled={!canContinue}
                  className={`flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 ${
                    canContinue
                      ? 'bg-white text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'cursor-not-allowed bg-white/5 text-white/30'
                  }`}
                >
                  {step === 1 && 'Choose Plan'}
                  {step === 2 && 'Review Payment'}
                  {step === 3 && 'Pay Now'}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
