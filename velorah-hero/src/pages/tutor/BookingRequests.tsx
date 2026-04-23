import React from 'react';
import { User, Calendar, Book, MessageSquare, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingRequests: React.FC = () => {
  const requests = [
    {
      student: 'Julian Thorne',
      subject: 'Relativity & Spacetime',
      time: 'Monday, 24 April • 2:00 PM – 3:30 PM',
      message: 'I would like to focus on the Lorentz transformations and their derivation.',
      status: 'pending'
    },
    {
      student: 'Isabella Grant',
      subject: 'Calculus III: Multiple Integrals',
      time: 'Tuesday, 25 April • 10:00 AM – 11:00 AM',
      message: 'I have an exam coming up next week and need help with triple integrals in spherical coordinates.',
      status: 'pending'
    },
    {
      student: 'Nathaniel West',
      subject: 'Classical Mechanics',
      time: 'Wednesday, 26 April • 4:00 PM – 5:00 PM',
      message: '',
      status: 'pending'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-white mb-2">Booking Requests</h1>
        <p className="text-white/50 tracking-wide">Respond to student requests for new tutoring sessions.</p>
      </div>

      <div className="space-y-6">
        {requests.map((req, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel overflow-hidden rounded-3xl"
          >
            <div className="flex flex-col md:flex-row gap-8 p-8">
              <div className="flex-1">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-1">{req.student}</h3>
                    <div className="flex items-center gap-2 text-indigo-400 text-xs tracking-widest uppercase font-bold">
                      <Book size={14} /> {req.subject}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/60">
                    <Calendar size={18} className="text-indigo-400" />
                    <span className="text-sm">{req.time}</span>
                  </div>
                  {req.message && (
                    <div className="flex items-start gap-3 text-white/60">
                      <MessageSquare size={18} className="text-indigo-400 mt-1 flex-shrink-0" />
                      <p className="text-sm italic leading-relaxed">"{req.message}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-72 flex flex-col justify-center gap-4 border-t border-white/10 md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8">
                <button className="glass-button-primary w-full justify-center py-3 rounded-xl flex items-center gap-2 text-sm font-semibold">
                  <Check size={18} /> Accept Booking
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border border-white/10 text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                  <X size={18} /> Decline Request
                </button>
                <p className="text-[10px] text-center text-amber-500/70 mt-2 uppercase tracking-widest font-bold">
                  Expires in 12 hours
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BookingRequests;
