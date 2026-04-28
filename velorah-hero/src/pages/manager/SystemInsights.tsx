import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, CalendarSearch, GraduationCap, TrendingUp, UsersRound } from 'lucide-react';
import { bookings, complaints, tutors } from '../../data/manager';
import {
  ActionLog,
  ManagerActionButton,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

const bookingTrend = [
  { day: 'Mon', value: 32 },
  { day: 'Tue', value: 36 },
  { day: 'Wed', value: 29 },
  { day: 'Thu', value: 41 },
  { day: 'Fri', value: 38 },
  { day: 'Sat', value: 24 },
  { day: 'Sun', value: 18 },
];

function hasOverlap(bookingId: string) {
  const booking = bookings.find((item) => item.id === bookingId);
  if (!booking || booking.status === 'cancelled') return false;
  return bookings.some((candidate) => {
    if (candidate.id === booking.id || candidate.status === 'cancelled') return false;
    return candidate.date === booking.date && candidate.tutorId === booking.tutorId && booking.start < candidate.end && candidate.start < booking.end;
  });
}

export default function SystemInsights() {
  const [notice, setNotice] = useState('Insights stay light: booking trend, tutor ranking, student return rate, and operational next steps.');
  const topTutors = useMemo(
    () => [...tutors].sort((a, b) => b.rating + b.completionRate / 100 - (a.rating + a.completionRate / 100)).slice(0, 4),
    [],
  );
  const maxTrend = Math.max(...bookingTrend.map((item) => item.value));
  const confirmedBookings = bookings.filter((booking) => booking.status === 'confirmed').length;
  const completedBookings = bookings.filter((booking) => booking.status === 'completed').length;
  const overlapCount = bookings.filter((booking) => hasOverlap(booking.id)).length;
  const pendingTutorCount = tutors.filter((tutor) => tutor.status === 'pending').length;
  const openComplaintCount = complaints.filter((complaint) => complaint.status !== 'resolved').length;

  return (
    <motion.div
      className="manager-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ManagerPageHeader
        eyebrow="System Insights"
        title="Academic Operations Signals"
        description="A focused analytics view for booking trends, tutor ranking, student return rate, and immediate operational decisions."
        actions={
          <ManagerActionButton
            icon={BarChart3}
            variant="primary"
            onClick={() => setNotice('Insight snapshot refreshed using booking, tutor, payment, review, and complaint signals.')}
          >
            Refresh snapshot
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      <section className="manager-insight-grid">
        <article className="manager-panel manager-panel-wide">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Booking trends</span>
              <h2>Weekly lesson demand</h2>
            </div>
            <StatusPill tone="blue">{confirmedBookings} confirmed now</StatusPill>
          </div>
          <div className="manager-bar-chart" aria-label="Weekly booking trend">
            {bookingTrend.map((item) => (
              <div className="manager-bar-item" key={item.day}>
                <span style={{ height: `${Math.max(20, (item.value / maxTrend) * 100)}%` }} />
                <strong>{item.day}</strong>
                <small>{item.value}</small>
              </div>
            ))}
          </div>
          <Link to="/manager/bookings" className="manager-inline-link">
            Open booking monitor
          </Link>
        </article>

        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Student return rate</span>
              <h2>68%</h2>
            </div>
            <StatusPill tone="green">Healthy</StatusPill>
          </div>
          <p className="manager-suggestion">Students with a completed lesson and a second booking within 14 days are counted as returned.</p>
          <ManagerActionButton
            icon={GraduationCap}
            variant="quiet"
            onClick={() => setNotice(`${completedBookings} completed booking groups are ready for follow-up study plan suggestions.`)}
          >
            Suggest study plans
          </ManagerActionButton>
        </article>
      </section>

      <section className="manager-panel">
        <div className="manager-panel-header">
          <div>
            <span className="manager-eyebrow">Tutor ranking</span>
            <h2>Performance watchlist</h2>
          </div>
          <StatusPill tone="indigo">Rating + completion</StatusPill>
        </div>
        <div className="manager-ranking-list">
          {topTutors.map((tutor, index) => (
            <article className="manager-ranking-row" key={tutor.id}>
              <span className="manager-rank">{index + 1}</span>
              <div>
                <strong>{tutor.name}</strong>
                <small>{tutor.subject} - rating {tutor.rating.toFixed(1)} - completion {tutor.completionRate}%</small>
              </div>
              <div className="manager-record-actions">
                {tutor.riskNote && <StatusPill tone="rose">Watch</StatusPill>}
                <Link to="/manager/tutors" className="manager-action manager-action-quiet">
                  <UsersRound size={15} />
                  Review tutor
                </Link>
                <Link to="/manager/bookings" className="manager-action manager-action-quiet">
                  <CalendarSearch size={15} />
                  Check bookings
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manager-insight-grid manager-insight-grid-three">
        <article className="manager-panel">
          <div className="manager-insight-icon"><TrendingUp size={20} /></div>
          <h2>Low missed lesson rate</h2>
          <p className="manager-suggestion">Missed lessons are down after tutor reminders and manager complaint routing.</p>
        </article>
        <article className="manager-panel">
          <div className="manager-insight-icon"><CalendarSearch size={20} /></div>
          <h2>{overlapCount} overlap risks</h2>
          <p className="manager-risk-note">Grade 12 Math has same-tutor overlap. Booking Monitoring already has confirm, cancel, complete, and flag actions.</p>
        </article>
        <article className="manager-panel">
          <div className="manager-insight-icon"><UsersRound size={20} /></div>
          <h2>{pendingTutorCount} pending tutors</h2>
          <p className="manager-suggestion">Approval aging is visible in Tutor Management with certificate-level reasons. {openComplaintCount} complaint cases still affect quality decisions.</p>
        </article>
      </section>
    </motion.div>
  );
}
