import React, { useState } from 'react';
import {
  AlertTriangle,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CopyPlus,
  FileUp,
  GripVertical,
  Plus,
  Repeat,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const hours = Array.from({ length: 15 }, (_, i) => i + 7);
const days = [
  { label: 'Mon', date: '20 Apr' },
  { label: 'Tue', date: '21 Apr' },
  { label: 'Wed', date: '22 Apr' },
  { label: 'Thu', date: '23 Apr' },
  { label: 'Fri', date: '24 Apr' },
  { label: 'Sat', date: '25 Apr' },
  { label: 'Sun', date: '26 Apr' },
];

const slotMap: Record<string, { type: 'available' | 'booked' | 'blocked' | 'conflict'; title: string; detail: string }> = {
  '0-8': { type: 'booked', title: 'Minh Quan', detail: 'IELTS Writing - Online - paid by MoMo' },
  '0-14': { type: 'available', title: 'Available', detail: 'Drag to extend until 16:00' },
  '1-19': { type: 'available', title: 'Available', detail: 'Recurring Tue evening slot' },
  '2-10': { type: 'booked', title: 'Lan Anh', detail: 'Grade 12 Math - VNPay confirmed' },
  '2-11': { type: 'conflict', title: 'Overlap risk', detail: 'Trial booking overlaps with Lan Anh by 15 minutes' },
  '3-18': { type: 'available', title: 'Available', detail: 'Best-fit suggestion from demand data' },
  '4-9': { type: 'blocked', title: 'Blocked', detail: 'School meeting, unavailable' },
  '4-19': { type: 'available', title: 'Available', detail: 'Recurring Friday evening slot' },
  '5-9': { type: 'booked', title: 'Duc Huy', detail: 'SAT Math trial - pending payment hold' },
  '6-15': { type: 'blocked', title: 'Blocked', detail: 'Personal time' },
};

export default function MySchedule() {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  return (
    <motion.div
      className="tutor-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><CalendarRange size={16} /> Core scheduling</span>
          <h1 className="tutor-page-title">My Schedule</h1>
          <p className="tutor-page-subtitle">
            Weekly availability is the source of truth for bookings. Slots sync in real time to prevent double booking.
          </p>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn"><FileUp size={16} /> Bulk upload</button>
          <button className="tutor-btn"><Repeat size={16} /> Recurring slots</button>
          <button className="tutor-btn primary"><Plus size={16} /> Add availability</button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon amber"><AlertTriangle size={19} /></div>
        <div>
          <strong>Conflict detection is active</strong>
          <p>Wed 11:00 has a 15-minute overlap with an accepted Math lesson. Accepting the new request is disabled until a new time is suggested.</p>
        </div>
      </section>

      <div className="schedule-toolbar">
        <div className="segmented-control" aria-label="Calendar view">
          <button className={viewMode === 'week' ? 'is-active' : ''} onClick={() => setViewMode('week')}>Weekly</button>
          <button className={viewMode === 'month' ? 'is-active' : ''} onClick={() => setViewMode('month')}>Monthly</button>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn ghost"><ChevronLeft size={16} /> Previous</button>
          <button className="tutor-btn ghost">Today</button>
          <button className="tutor-btn ghost">Next <ChevronRight size={16} /></button>
        </div>
      </div>

      <section className="tutor-card calendar-shell">
        <div className="calendar-topline">
          <div>
            <h2 className="calendar-title">
              {viewMode === 'week' ? 'April 20-26, 2026' : 'April 2026'}
              <span>Timezone: Vietnam (GMT+7). Drag across empty cells to create availability.</span>
            </h2>
          </div>
          <div className="calendar-legend">
            <span className="legend-item"><span className="legend-dot" /> Available</span>
            <span className="legend-item"><span className="legend-dot booked" /> Booked</span>
            <span className="legend-item"><span className="legend-dot blocked" /> Blocked</span>
            <span className="legend-item"><span className="legend-dot conflict" /> Conflict</span>
          </div>
        </div>

        {viewMode === 'week' ? (
          <div className="calendar-scroller">
            <div className="calendar-grid">
              <div className="calendar-header">Time</div>
              {days.map((day) => (
                <div className="calendar-header" key={day.label}>
                  {day.label}
                  <span>{day.date}</span>
                </div>
              ))}

              {hours.map((hour) => (
                <React.Fragment key={hour}>
                  <div className="calendar-time">{hour.toString().padStart(2, '0')}:00</div>
                  {days.map((day, dayIndex) => {
                    const slot = slotMap[`${dayIndex}-${hour}`];
                    return (
                      <div className="calendar-cell" key={`${day.label}-${hour}`}>
                        {slot ? (
                          <div className={`calendar-slot ${slot.type}`}>
                            <GripVertical size={12} />
                            {slot.title}
                            <span>{slot.type === 'available' ? `${hour}:00-${hour + 1}:30` : slot.detail}</span>
                            <div className="slot-tooltip">
                              <strong>{slot.title}</strong>
                              <span>{slot.detail}</span>
                            </div>
                          </div>
                        ) : (
                          <button className="compact-btn" aria-label={`Add availability ${day.label} ${hour}:00`}>
                            <Plus size={14} /> Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="schedule-side-grid" style={{ padding: 22 }}>
            {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'].map((week, index) => (
              <div className="side-note" key={week}>
                <strong>{week}</strong>
                <p>{index === 2 ? '1 conflict, 8 booked sessions, 12 available slots.' : 'No conflicts. Availability coverage is healthy.'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="schedule-side-grid">
        <div className="side-note">
          <div className="tutor-soft-icon"><CopyPlus size={18} /></div>
          <strong style={{ marginTop: 12 }}>Drag & drop availability</strong>
          <p>Move blue availability blocks between days. Students see changes immediately.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon green"><ShieldCheck size={18} /></div>
          <strong style={{ marginTop: 12 }}>Auto-sync after booking</strong>
          <p>Accepted requests become booked slots and trigger confirmation notifications.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon amber"><Sparkles size={18} /></div>
          <strong style={{ marginTop: 12 }}>Smart suggestion</strong>
          <p>Open Thu 18:00 because three students search this subject and no overlap exists.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon"><Clock3 size={18} /></div>
          <strong style={{ marginTop: 12 }}>24h reminders</strong>
          <p>Reminder rules are tied to booked sessions and can be changed in Settings.</p>
        </div>
      </div>
    </motion.div>
  );
}
