import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CalendarSearch, GraduationCap, MessageSquareWarning, School, ShieldCheck, UsersRound } from 'lucide-react';
import {
  bookings,
  bookingFlow,
  complaints,
  complaintFlow,
  managerNotifications,
  managerStats,
  operationalFlows,
  reviews,
  systemAlerts,
  transactions,
  tutorFlow,
  tutors,
} from '../../data/manager';
import {
  FlowStrip,
  ManagerBarChart,
  ManagerActionLink,
  ManagerDonutChart,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

function alertTone(priority: string) {
  if (priority === 'critical') return 'rose';
  if (priority === 'high') return 'amber';
  return 'blue';
}

export default function ManagerDashboard() {
  const bookingStateItems = [
    { label: 'Requested', value: bookings.filter((booking) => booking.status === 'requested').length, tone: 'amber' as const },
    { label: 'Confirmed', value: bookings.filter((booking) => booking.status === 'confirmed').length, tone: 'blue' as const },
    { label: 'Completed', value: bookings.filter((booking) => booking.status === 'completed').length, tone: 'green' as const },
    { label: 'Cancelled', value: bookings.filter((booking) => booking.status === 'cancelled').length, tone: 'rose' as const },
  ];
  const riskLoadItems = [
    { label: 'Critical alerts', value: systemAlerts.filter((alert) => alert.priority === 'critical').length, tone: 'rose' as const, detail: 'Needs manager action now' },
    { label: 'Open complaints', value: complaints.filter((complaint) => complaint.status !== 'resolved').length, tone: 'amber' as const, detail: 'Owner, response, or note required' },
    { label: 'Pending tutors', value: tutors.filter((tutor) => tutor.status === 'pending').length, tone: 'blue' as const, detail: 'Certificate review queue' },
    { label: 'Refund queue', value: transactions.filter((transaction) => transaction.status === 'refund_requested').length, tone: 'indigo' as const, detail: 'Policy decision required' },
    { label: 'Reviews waiting', value: reviews.filter((review) => review.decision === 'flagged').length, tone: 'green' as const, detail: 'Moderation can keep or hide' },
  ];

  return (
    <motion.div
      className="manager-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ManagerPageHeader
        eyebrow="Manager workspace"
        title="Operational Control Center"
        description="Monitor students, tutors, bookings, payments, reviews, complaints, and the next action required for every live state."
        actions={
          <>
            <ManagerActionLink to="/manager/tutors" icon={UsersRound} variant="primary">Review tutors</ManagerActionLink>
            <ManagerActionLink to="/manager/complaints" icon={MessageSquareWarning}>Check complaints</ManagerActionLink>
          </>
        }
      />

      <section className="manager-stat-grid" aria-label="Manager overview">
        {managerStats.map(({ label, value, detail, icon: Icon, tone }) => (
          <article className={`manager-stat manager-stat-${tone}`} key={label}>
            <div className="manager-stat-icon"><Icon size={20} /></div>
            <strong>{value}</strong>
            <span>{label}</span>
            <p>{detail}</p>
          </article>
        ))}
      </section>

      <section className="manager-chart-grid" aria-label="Operational visual summary">
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Booking state mix</span>
              <h2>Live lesson pipeline</h2>
            </div>
            <StatusPill tone="blue">{bookings.length} bookings</StatusPill>
          </div>
          <ManagerDonutChart items={bookingStateItems} centerValue={`${bookings.length}`} centerLabel="Bookings" />
          <ManagerActionLink to="/manager/bookings" icon={CalendarSearch} variant="quiet">Resolve booking states</ManagerActionLink>
        </article>

        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Operational pressure</span>
              <h2>Queues needing decisions</h2>
            </div>
            <StatusPill tone="rose">Risk view</StatusPill>
          </div>
          <ManagerBarChart items={riskLoadItems} />
          <ManagerActionLink to="/manager/notifications" variant="quiet">Open notification stream</ManagerActionLink>
        </article>
      </section>

      <section className="manager-panel">
        <div className="manager-panel-header">
          <div>
            <span className="manager-eyebrow">Role separation</span>
            <h2>Manager is operations, Admin is platform governance</h2>
          </div>
          <StatusPill tone="indigo">4 role systems</StatusPill>
        </div>
        <div className="manager-flow-card-grid manager-role-boundary-grid">
          <article className="manager-flow-card">
            <span className="manager-flow-card-icon"><GraduationCap size={18} /></span>
            <div>
              <StatusPill tone="blue">Student</StatusPill>
              <strong>Owns learning workflows: tutor discovery, booking, schedule, study plan, and personal notifications.</strong>
              <p>Students request lessons, review completed sessions, submit complaints, and receive operational updates from managers.</p>
              <ManagerActionLink to="/dashboard" variant="quiet">Open student system</ManagerActionLink>
            </div>
          </article>
          <article className="manager-flow-card">
            <span className="manager-flow-card-icon"><School size={18} /></span>
            <div>
              <StatusPill tone="amber">Tutor</StatusPill>
              <strong>Owns teaching workflows: booking requests, lessons, schedule, students, and study plan support.</strong>
              <p>Tutors accept or respond to booking requests; managers only intervene when approval, conflict, complaint, or quality control is needed.</p>
              <ManagerActionLink to="/tutor/dashboard" variant="quiet">Open tutor system</ManagerActionLink>
            </div>
          </article>
          <article className="manager-flow-card">
            <span className="manager-flow-card-icon"><UsersRound size={18} /></span>
            <div>
              <StatusPill tone="green">Manager</StatusPill>
              <strong>Owns tutor, student, booking, payment, review, and complaint operations.</strong>
              <p>Valid next actions stay inside operational queues: approve tutors, resolve overlaps, moderate reviews, refund by policy, and close complaints with notes.</p>
              <ManagerActionLink to="/manager/settings" variant="quiet">Review manager rules</ManagerActionLink>
            </div>
          </article>
          <article className="manager-flow-card">
            <span className="manager-flow-card-icon"><ShieldCheck size={18} /></span>
            <div>
              <StatusPill tone="rose">Admin</StatusPill>
              <strong>Owns users, roles, security, audit logs, and platform configuration.</strong>
              <p>When a case needs privileged access, the manager escalates instead of changing admin-only settings directly.</p>
              <ManagerActionLink to="/admin/dashboard" variant="quiet">Open admin console</ManagerActionLink>
            </div>
          </article>
        </div>
      </section>

      <section className="manager-dashboard-grid">
        <div className="manager-panel manager-panel-wide">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">System alerts</span>
              <h2>Needs manager action</h2>
            </div>
            <StatusPill tone="rose">3 live alerts</StatusPill>
          </div>

          <div className="manager-alert-list">
            {systemAlerts.map((alert) => (
              <article className="manager-alert" key={alert.id}>
                <div className={`manager-alert-icon manager-alert-${alertTone(alert.priority)}`}>
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.detail}</p>
                </div>
                <Link to={alert.targetPath} className="manager-inline-link">
                  {alert.actionLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Realtime</span>
              <h2>Manager notifications</h2>
            </div>
            <StatusPill tone="blue">Live</StatusPill>
          </div>
          <div className="manager-mini-list">
            {managerNotifications.slice(0, 4).map((item) => (
              <Link to={item.targetPath} className="manager-mini-item" key={item.id}>
                <span className={`manager-priority-dot manager-priority-${item.priority}`} />
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>
                <em>{item.time}</em>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="manager-panel">
        <div className="manager-panel-header">
          <div>
            <span className="manager-eyebrow">Flow integration</span>
            <h2>Student and tutor actions become manager queues</h2>
          </div>
          <StatusPill tone="indigo">No dead ends</StatusPill>
        </div>
        <div className="manager-flow-card-grid">
          {operationalFlows.map(({ id, source, trigger, managerVisibility, actionLabel, targetPath, icon: Icon }) => (
            <article className="manager-flow-card" key={id}>
              <span className="manager-flow-card-icon"><Icon size={18} /></span>
              <div>
                <StatusPill tone={source === 'Student' ? 'blue' : source === 'Tutor' ? 'green' : 'amber'}>{source}</StatusPill>
                <strong>{trigger}</strong>
                <p>{managerVisibility}</p>
                <Link to={targetPath} className="manager-inline-link">{actionLabel}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manager-flow-grid">
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Tutor lifecycle</span>
              <h2>Tutor state flow</h2>
            </div>
          </div>
          <FlowStrip items={tutorFlow} />
          <ManagerActionLink to="/manager/tutors" variant="quiet">Open tutor queue</ManagerActionLink>
        </article>

        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Booking control</span>
              <h2>Student to tutor flow</h2>
            </div>
          </div>
          <FlowStrip items={bookingFlow} />
          <ManagerActionLink to="/manager/bookings" icon={CalendarSearch} variant="quiet">Open booking monitor</ManagerActionLink>
        </article>

        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Resolution flow</span>
              <h2>Complaint state flow</h2>
            </div>
          </div>
          <FlowStrip items={complaintFlow} />
          <ManagerActionLink to="/manager/complaints" icon={MessageSquareWarning} variant="quiet">Open complaint system</ManagerActionLink>
        </article>
      </section>
    </motion.div>
  );
}
