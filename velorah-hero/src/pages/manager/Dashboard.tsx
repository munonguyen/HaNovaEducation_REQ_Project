import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, CalendarSearch, MessageSquareWarning, UsersRound } from 'lucide-react';
import {
  bookingFlow,
  complaintFlow,
  managerNotifications,
  managerStats,
  operationalFlows,
  systemAlerts,
  tutorFlow,
} from '../../data/manager';
import {
  FlowStrip,
  ManagerActionLink,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

function alertTone(priority: string) {
  if (priority === 'critical') return 'rose';
  if (priority === 'high') return 'amber';
  return 'blue';
}

export default function ManagerDashboard() {
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
              <span className="manager-eyebrow">UC-01 / UC-11</span>
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
              <span className="manager-eyebrow">UC-12</span>
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
