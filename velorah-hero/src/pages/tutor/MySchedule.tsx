import React from 'react';
import { Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const MySchedule: React.FC = () => {
  const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 07:00 to 22:00
  const days = ['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28', 'Sat 29', 'Sun 30'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-serif text-white mb-2">My Schedule</h1>
          <p className="text-white/50 tracking-wide">Manage your availability and lesson time slots.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors">
            <Filter size={16} /> Filter
          </button>
          <button className="glass-button-primary px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold">
            <Plus size={16} /> Add Availability
          </button>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-serif text-white">April 24 – 30, 2026</h2>
            <div className="flex border border-white/10 rounded-xl overflow-hidden bg-white/5">
              <button className="p-2.5 hover:bg-white/10 border-r border-white/10 text-white/70 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
              <button className="p-2.5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button className="px-5 py-2 rounded-xl text-xs font-bold tracking-widest uppercase bg-indigo-500/20 text-indigo-300 shadow-sm border border-indigo-500/30">Week</button>
            <button className="px-5 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors">Day</button>
          </div>
        </div>

        <div className="calendar-grid">
          <div className="calendar-header">Time</div>
          {days.map(day => (
            <div key={day} className="calendar-header">{day}</div>
          ))}

          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className="calendar-cell text-[10px] font-bold text-white/40 flex items-center justify-center border-r border-white/10 bg-white/5">
                {hour < 10 ? `0${hour}:00` : `${hour}:00`}
              </div>
              {days.map((day, di) => (
                <div key={`${day}-${hour}`} className="calendar-cell group relative hover:bg-indigo-500/10 cursor-pointer transition-colors">
                  {/* Mock data for availability */}
                  {hour === 10 && di === 0 && (
                    <div className="slot-booked">
                      <div className="text-[9px] font-bold text-white/60 truncate">Booked: Alex</div>
                    </div>
                  )}
                  {hour === 14 && di <= 2 && (
                    <div className="slot-available shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                      <div className="font-bold tracking-wider uppercase text-[8px]">Available</div>
                    </div>
                  )}
                  {hour === 9 && di === 4 && (
                    <div className="slot-available shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                      <div className="font-bold tracking-wider uppercase text-[8px]">Available</div>
                    </div>
                  )}
                  <button className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="bg-indigo-500/20 p-2 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-500/40 text-indigo-200">
                      <Plus size={16} />
                    </div>
                  </button>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MySchedule;
