import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CalendarDays,
  Check,
  Clock,
  Lightbulb,
  PlayCircle,
  Send,
  ShieldCheck,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

const todaySessions = [
  { time: '08:00', student: 'Minh Quan', subject: 'IELTS Writing Task 2', mode: 'Online', status: 'Completed' },
  { time: '10:30', student: 'Lan Anh', subject: 'Grade 12 Math - Integrals', mode: 'Online', status: 'Next' },
  { time: '14:00', student: 'Gia Bao', subject: 'Physics - Electric field', mode: 'Offline', status: 'Booked' },
  { time: '19:30', student: 'Group A3', subject: 'University entrance review', mode: 'Online', status: 'Booked' },
];

const initialPendingRequests = [
  { student: 'Thanh Truc', subject: 'Chemistry 11', time: 'Fri 24 Apr, 18:00', note: 'Needs a recurring Friday evening slot.', status: 'Pending' },
  { student: 'Duc Huy', subject: 'SAT Math', time: 'Sat 25 Apr, 09:00', note: 'Parent asks for a trial lesson first.', status: 'Pending' },
];

const notifications = [
  { icon: Bell, title: 'New booking request', detail: 'Thanh Truc requested Chemistry 11 for Friday evening.', type: 'info' },
  { icon: ShieldCheck, title: 'Payment confirmed', detail: 'MoMo payment for Lan Anh lesson has been verified.', type: 'success' },
  { icon: Clock, title: '24h reminder ready', detail: 'Reminder for Group A3 will send automatically tonight.', type: 'warning' },
];

const stats = [
  { value: '4', label: 'Sessions today', note: '1 completed, 3 remaining' },
  { value: '6', label: 'Requests pending', note: '2 need response in 12h' },
  { value: '0', label: 'Schedule conflicts', note: 'Calendar is synced live' },
  { value: '92%', label: 'Auto-booking coverage', note: 'Zalo/Excel work reduced' },
];

const monthlyRevenue = {
  total: '12,800,000 VND',
  received: '11,450,000 VND received',
  pending: '1,350,000 VND pending',
  payout: 'Next payout: 30 Apr 2026',
};

export default function TutorHome() {
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
  const [feedback, setFeedback] = useState('Realtime tutor workspace is synced with schedule, bookings, payments, and reminders.');

  const updateRequest = (student: string, status: string) => {
    setPendingRequests((current) =>
      current.map((request) => (request.student === student ? { ...request, status } : request)),
    );
    setFeedback(`${student}: ${status === 'Accepted' ? 'booking accepted and schedule synced.' : status === 'Suggested' ? 'new time suggestion sent.' : 'request rejected and student notified.'}`);
  };

  return (
    <motion.div
      className="tutor-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <section className="tutor-card home-hero">
        <div>
          <span className="tutor-eyebrow"><ShieldCheck size={16} /> Calm teaching workspace</span>
          <h2>Good morning, Nguyen Minh Anh.</h2>
          <p>
            HaNova keeps your availability, booking requests, lessons, students, payments, and reminders in one focused tutor workspace.
          </p>
          <div className="home-hero-actions">
            <Link to="/tutor/bookings" className="tutor-btn primary"><Check size={17} /> Accept requests</Link>
            <Link to="/tutor/schedule" className="tutor-btn"><CalendarDays size={17} /> View schedule</Link>
          </div>
        </div>

        <div className="teaching-visual" aria-label="Schedule preview illustration">
          <div className="teaching-visual-grid">
            {Array.from({ length: 35 }, (_, index) => <span key={index} />)}
          </div>
          <div className="teaching-visual-card">
            <strong>10:30 - Lan Anh</strong>
            <span>Grade 12 Math lesson starts in 38 minutes. Notes and materials are ready.</span>
          </div>
        </div>
      </section>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><ShieldCheck size={19} /></div>
        <div>
          <strong>Flow status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <div className="home-layout">
        <div className="home-main">
          <section className="tutor-card">
            <div className="tutor-card-header">
              <div>
                <h2 className="tutor-section-title">Today's Schedule</h2>
                <p className="tutor-section-copy">Next sessions with payment, mode, and quick lesson actions.</p>
              </div>
              <Link to="/tutor/schedule" className="tutor-btn ghost">Full calendar</Link>
            </div>

            <div className="session-list">
              {todaySessions.map((session) => (
                <div className="session-row" key={`${session.time}-${session.student}`}>
                  <div className="session-time">{session.time}</div>
                  <div>
                    <h3 className="session-title">{session.subject}</h3>
                    <div className="session-meta">
                      <span>{session.student}</span>
                      <span>{session.mode}</span>
                      <span>VNPay/MoMo synced</span>
                    </div>
                  </div>
                  <div className="tutor-actions">
                    <span className={`tutor-chip ${session.status === 'Completed' ? 'success' : session.status === 'Next' ? 'info' : 'indigo'}`}>
                      {session.status}
                    </span>
                    {session.status === 'Next' && (
                      <button
                        className="compact-btn primary"
                        onClick={() => setFeedback('Opening Lan Anh online lesson room. Payment, materials, and notes are ready.')}
                      >
                        <PlayCircle size={15} /> Enter
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="tutor-card">
            <div className="tutor-card-header">
              <div>
                <h2 className="tutor-section-title">Pending Booking Requests</h2>
                <p className="tutor-section-copy">Fast accept, reject, or suggest another time without leaving the page.</p>
              </div>
              <Link to="/tutor/bookings" className="tutor-btn ghost">Review all</Link>
            </div>

            <div className="request-list">
              {pendingRequests.map((request) => (
                <article className="request-card" key={request.student}>
                  <div className="request-card-top">
                    <div className="request-person">
                      <div className="avatar-initial">{request.student.split(' ').map((part) => part[0]).join('')}</div>
                      <div>
                        <strong>{request.student}</strong>
                        <span>{request.subject} - {request.time}</span>
                      </div>
                    </div>
                    <span className={`tutor-chip ${request.status === 'Accepted' ? 'success' : request.status === 'Rejected' ? 'danger' : request.status === 'Suggested' ? 'info' : 'warning'}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="request-message">{request.note}</p>
                  <div className="request-actions">
                    <button className="compact-btn success" onClick={() => updateRequest(request.student, 'Accepted')} disabled={request.status !== 'Pending'}><Check size={14} /> Accept</button>
                    <button className="compact-btn" onClick={() => updateRequest(request.student, 'Suggested')} disabled={request.status !== 'Pending'}><Send size={14} /> Suggest time</button>
                    <button className="compact-btn danger" onClick={() => updateRequest(request.student, 'Rejected')} disabled={request.status !== 'Pending'}><X size={14} /> Reject</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="home-side">
          <section className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-note">{stat.note}</span>
              </div>
            ))}
          </section>

          <section className="tutor-card">
            <div className="tutor-card-header mb-4">
              <div>
                <h2 className="tutor-section-title">Weekly Lessons</h2>
                <p className="tutor-section-copy">Your teaching hours across the week.</p>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 h-24 mt-2 px-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heightPct = [40, 70, 30, 80, 50, 90, 20][i];
                return (
                  <div key={day} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full bg-white/5 rounded-t-sm relative overflow-hidden flex-1 flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="w-full bg-emerald-500/80 rounded-t-sm group-hover:bg-emerald-400 transition-colors"
                      />
                    </div>
                    <span className="text-[10px] text-white/50">{day}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="tutor-card revenue-card">
            <div className="revenue-card-head">
              <div className="tutor-soft-icon green"><WalletCards size={19} /></div>
              <div>
                <h2 className="tutor-section-title">Monthly Revenue</h2>
                <p className="tutor-section-copy">VNPay and MoMo lesson payments synced for April 2026.</p>
              </div>
            </div>
            <strong className="revenue-total">{monthlyRevenue.total}</strong>
            <div className="revenue-lines">
              <span>{monthlyRevenue.received}</span>
              <span>{monthlyRevenue.pending}</span>
              <span>{monthlyRevenue.payout}</span>
            </div>
          </section>

          <section className="insight-panel">
            <div className="tutor-soft-icon"><Lightbulb size={19} /></div>
            <div>
              <strong>Smart availability suggestion</strong>
              <p>Open Tue/Thu 19:00-20:30 next week. Three students searched for those slots and no conflict is detected.</p>
            </div>
          </section>

          <section className="tutor-card">
            <div className="tutor-card-header">
              <div>
                <h2 className="tutor-section-title">Notifications Preview</h2>
                <p className="tutor-section-copy">Real-time booking, confirmation, cancellation, and reminder events.</p>
              </div>
            </div>
            <div className="notification-list">
              {notifications.map(({ icon: Icon, title, detail, type }) => (
                <div className="notification-item" key={title}>
                  <div className={`tutor-soft-icon ${type === 'success' ? 'green' : type === 'warning' ? 'amber' : ''}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                  <span className={`tutor-chip ${type}`}>Live</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tutor-card flat">
            <div className="session-list">
              <div className="session-row">
                <div className="tutor-soft-icon green"><UsersRound size={18} /></div>
                <div>
                  <h3 className="session-title">Mentoring operations are healthy</h3>
                  <div className="session-meta">
                    <span>500+ user ready</span>
                    <span>Realtime updates</span>
                    <span>Page goal &lt; 3s</span>
                  </div>
                </div>
                <span className="tutor-chip success">OK</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </motion.div>
  );
}
