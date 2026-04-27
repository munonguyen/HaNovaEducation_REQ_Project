import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BellRing, CheckCheck, ExternalLink, Radio, Send } from 'lucide-react';
import { managerNotifications } from '../../data/manager';
import {
  ActionLog,
  ManagerActionButton,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

type NotificationSource = 'all' | 'Student' | 'Tutor' | 'Payment' | 'System';

function priorityTone(priority: string) {
  if (priority === 'critical') return 'rose';
  if (priority === 'high') return 'amber';
  return 'blue';
}

export default function ManagerNotifications() {
  const [acknowledgedIds, setAcknowledgedIds] = useState<Set<string>>(new Set());
  const [sourceFilter, setSourceFilter] = useState<NotificationSource>('all');
  const [notice, setNotice] = useState('Realtime notifications connect student, tutor, booking, payment, and system events to the manager action queue.');

  const visibleNotifications = useMemo(() => {
    if (sourceFilter === 'all') return managerNotifications;
    return managerNotifications.filter((notification) => notification.source === sourceFilter);
  }, [sourceFilter]);

  const acknowledge = (id: string) => {
    setAcknowledgedIds((current) => new Set([...current, id]));
    setNotice(`${id}: notification acknowledged. It stays searchable and linked to the original module.`);
  };

  return (
    <motion.div
      className="manager-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ManagerPageHeader
        eyebrow="Notifications"
        title="Realtime Manager Alerts"
        description="System-wide events from students, tutors, bookings, payments, and platform health are surfaced with one clear next action."
        actions={
          <ManagerActionButton
            icon={Radio}
            variant="primary"
            onClick={() => setNotice('Realtime stream refreshed. New tutor applications, complaints, booking issues, and payment alerts are prioritized.')}
          >
            Refresh live stream
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      <section className="manager-filter-bar" aria-label="Notification source filters">
        {(['all', 'Student', 'Tutor', 'Payment', 'System'] as const).map((source) => (
          <button
            type="button"
            key={source}
            className={`manager-filter-chip ${sourceFilter === source ? 'active' : ''}`}
            onClick={() => setSourceFilter(source)}
          >
            {source === 'all' ? 'All sources' : source}
          </button>
        ))}
      </section>

      <section className="manager-notification-grid">
        {visibleNotifications.map((notification, index) => {
          const acknowledged = acknowledgedIds.has(notification.id);
          return (
            <motion.article
              className={`manager-notification-card ${acknowledged ? 'acknowledged' : 'unread'}`}
              key={notification.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="manager-notification-icon">
                <BellRing size={19} />
                {!acknowledged && <span />}
              </div>
              <div className="manager-notification-body">
                <div className="manager-notification-top">
                  <StatusPill tone={priorityTone(notification.priority)}>{notification.priority}</StatusPill>
                  <small>{notification.source} - {notification.time}</small>
                </div>
                <h2>{notification.title}</h2>
                <p>{notification.detail}</p>
                <div className="manager-notification-actions">
                  <Link to={notification.targetPath} className="manager-action manager-action-primary">
                    {notification.actionLabel}
                    <ExternalLink size={15} />
                  </Link>
                  <ManagerActionButton icon={CheckCheck} onClick={() => acknowledge(notification.id)}>
                    {acknowledged ? 'Acknowledged' : 'Acknowledge'}
                  </ManagerActionButton>
                  <ManagerActionButton
                    icon={Send}
                    variant="quiet"
                    onClick={() => setNotice(`${notification.id}: escalation note sent to the responsible manager lane with source ${notification.source}.`)}
                  >
                    Escalate
                  </ManagerActionButton>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>
    </motion.div>
  );
}
