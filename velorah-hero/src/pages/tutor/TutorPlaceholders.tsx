import { useState } from 'react';
import {
  BadgeCheck,
  Bell,
  BellRing,
  CalendarClock,
  Camera,
  CheckCircle2,
  Clock,
  CreditCard,
  FileUp,
  Mail,
  MessageSquare,
  Moon,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UserRound,
  WalletCards,
  XCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

const pageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

export function Notifications() {
  const [readTitles, setReadTitles] = useState<string[]>([]);
  const [channels, setChannels] = useState({ push: true, email: true, zalo: true });
  const groups = [
    {
      title: 'New bookings',
      icon: BellRing,
      items: [
        { title: 'Thanh Truc requested Chemistry 11', detail: 'Fri 24 Apr, 18:00-19:30. Payment hold ready.', time: 'Now', tone: 'info' },
        { title: 'Bao Chau accepted suggested time', detail: 'Tuesday evening replacement slot is waiting for your confirmation.', time: '6m', tone: 'success' },
      ],
    },
    {
      title: 'Confirmations',
      icon: CheckCircle2,
      items: [
        { title: 'Lan Anh lesson confirmed', detail: 'VNPay payment verified and schedule updated automatically.', time: '18m', tone: 'success' },
      ],
    },
    {
      title: 'Cancellations and reminders',
      icon: XCircle,
      items: [
        { title: 'Bao Chau cancellation processed', detail: 'Slot returned to availability and refund is queued.', time: '1h', tone: 'warning' },
        { title: '24h reminder scheduled', detail: 'Group A3 will receive reminders tonight at 19:30.', time: '2h', tone: 'info' },
      ],
    },
  ];
  const allTitles = groups.flatMap((group) => group.items.map((item) => item.title));
  const unreadCount = allTitles.filter((title) => !readTitles.includes(title)).length;

  return (
    <motion.div className="tutor-page" {...pageMotion}>
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><Bell size={16} /> UC-06 real-time updates</span>
          <h1 className="tutor-page-title">Notifications</h1>
          <p className="tutor-page-subtitle">
            Real-time booking, confirmation, cancellation, and 24h reminder updates grouped by action type.
          </p>
        </div>
        <div className="tutor-actions">
          <span className="tutor-chip success"><span className="tutor-live-dot" /> Live</span>
          <button className="tutor-btn" onClick={() => setReadTitles(allTitles)} disabled={unreadCount === 0}>
            Mark all read
          </button>
        </div>
      </div>

      <div className="notifications-layout">
        <section className="tutor-card">
          {groups.map(({ title, icon: Icon, items }) => (
            <div className="notification-group" key={title}>
              <h2 className="notification-group-title"><Icon size={17} /> {title}</h2>
              {items.map((item) => {
                const isRead = readTitles.includes(item.title);
                return (
                  <article className="notification-item" key={item.title}>
                    <div className={`tutor-soft-icon ${item.tone === 'success' ? 'green' : item.tone === 'warning' ? 'amber' : ''}`}>
                      <Icon size={17} />
                    </div>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </div>
                    <span className={`tutor-chip ${isRead ? '' : item.tone}`}>{isRead ? 'Read' : item.time}</span>
                  </article>
                );
              })}
            </div>
          ))}
        </section>

        <aside className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Delivery Rules</h2>
              <p className="tutor-section-copy">Channels used by the tutor workspace.</p>
            </div>
          </div>
          <div className="settings-list">
            <div className="settings-item">
              <div className="tutor-soft-icon"><Smartphone size={17} /></div>
              <div>
                <strong>Mobile push</strong>
                <span>Booking and reminder alerts</span>
              </div>
              <button className="toggle" aria-label="Toggle mobile push" aria-pressed={channels.push} onClick={() => setChannels((current) => ({ ...current, push: !current.push }))} />
            </div>
            <div className="settings-item">
              <div className="tutor-soft-icon green"><Mail size={17} /></div>
              <div>
                <strong>Email summary</strong>
                <span>Daily schedule at 06:30</span>
              </div>
              <button className="toggle" aria-label="Toggle email summary" aria-pressed={channels.email} onClick={() => setChannels((current) => ({ ...current, email: !current.email }))} />
            </div>
            <div className="settings-item">
              <div className="tutor-soft-icon amber"><MessageSquare size={17} /></div>
              <div>
                <strong>Zalo fallback</strong>
                <span>Used when student prefers Zalo</span>
              </div>
              <button className="toggle" aria-label="Toggle Zalo fallback" aria-pressed={channels.zalo} onClick={() => setChannels((current) => ({ ...current, zalo: !current.zalo }))} />
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

export function Profile() {
  const [feedback, setFeedback] = useState('Tutor profile is approved and visible to students.');
  const [publicVisible, setPublicVisible] = useState(true);

  return (
    <motion.div className="tutor-page" {...pageMotion}>
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><UserRound size={16} /> UC-01 tutor profile</span>
          <h1 className="tutor-page-title">Tutor Profile</h1>
          <p className="tutor-page-subtitle">
            Manage public bio, subjects, pricing, teaching style, certificates, and approval status.
          </p>
        </div>
        <div className="tutor-actions">
          <span className="tutor-chip success"><BadgeCheck size={13} /> Approved</span>
          <button className="tutor-btn primary" onClick={() => setFeedback('Profile changes saved. Student-facing search will refresh after review checks.')}>Save profile</button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><ShieldCheck size={19} /></div>
        <div>
          <strong>Profile action status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <div className="profile-layout">
        <section className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Public Teaching Profile</h2>
              <p className="tutor-section-copy">These fields appear in the student booking flow.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="form-field full">
              <span>Bio</span>
              <textarea className="form-textarea" defaultValue="I mentor grade 11-12 students in Math and Physics with structured exam plans, short weekly feedback, and clear homework cycles." />
            </label>
            <label className="form-field">
              <span>Subjects</span>
              <input className="form-input" defaultValue="Math 12, Physics, SAT Math" />
            </label>
            <label className="form-field">
              <span>Pricing</span>
              <input className="form-input" defaultValue="450,000 VND / 90 minutes" />
            </label>
            <label className="form-field full">
              <span>Teaching style</span>
              <select className="form-select" defaultValue="structured">
                <option value="structured">Structured mentoring with weekly checkpoints</option>
                <option value="exam">Exam-focused drills</option>
                <option value="concept">Concept repair and confidence building</option>
              </select>
            </label>

            <div className="form-field full">
              <span>Certificates</span>
              <div className="certificate-zone">
                <div className="request-person">
                  <div className="tutor-soft-icon"><BadgeCheck size={18} /></div>
                  <div>
                    <strong>Upload degree, teaching certificate, or award</strong>
                    <span>PDF, PNG, JPG up to 10MB. Approval team reviews changes.</span>
                  </div>
                </div>
                <button className="tutor-btn" onClick={() => setFeedback('Certificate upload queued for academic approval review.')}>
                  <FileUp size={16} /> Upload
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside>
          <div className="approval-card">
            <ShieldCheck size={28} color="#15803d" />
            <h3>Approval status: Verified</h3>
            <p>Your profile is approved for student booking. Certificate changes will enter review without hiding your current profile.</p>
          </div>

          <div className="tutor-card" style={{ marginTop: 18 }}>
            <div className="settings-list">
              <div className="settings-item">
                <div className="tutor-soft-icon"><Camera size={17} /></div>
                <div>
                  <strong>Profile photo</strong>
                  <span>Warm, professional headshot</span>
                </div>
                <button className="compact-btn" onClick={() => setFeedback('Profile photo picker opened. New image will be reviewed before replacing the public photo.')}>Change</button>
              </div>
              <div className="settings-item">
                <div className="tutor-soft-icon green"><CheckCircle2 size={17} /></div>
                <div>
                  <strong>Student-facing profile</strong>
                  <span>{publicVisible ? 'Visible in booking search' : 'Hidden from new booking search'}</span>
                </div>
                <button className="toggle" aria-label="Toggle student-facing profile" aria-pressed={publicVisible} onClick={() => { setPublicVisible((current) => !current); setFeedback(publicVisible ? 'Student-facing profile hidden from new searches.' : 'Student-facing profile restored to booking search.'); }} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

export function Settings() {
  const [feedback, setFeedback] = useState('Settings are active. Availability, notifications, and payments are connected.');
  const [notificationToggles, setNotificationToggles] = useState({
    'Booking requests': true,
    Confirmations: true,
    '24h reminders': true,
  });

  return (
    <motion.div className="tutor-page" {...pageMotion}>
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><SlidersHorizontal size={16} /> Workspace controls</span>
          <h1 className="tutor-page-title">Settings</h1>
          <p className="tutor-page-subtitle">
            Configure availability preferences, notification channels, payment setup, and schedule rules.
          </p>
        </div>
        <button className="tutor-btn primary" onClick={() => setFeedback('Settings saved. Booking rules, notification rules, and payment preferences are synced.')}>Save settings</button>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><SlidersHorizontal size={19} /></div>
        <div>
          <strong>Settings action status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <div className="settings-layout">
        <section className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Availability Preferences</h2>
              <p className="tutor-section-copy">Rules used by booking requests and recurring slots.</p>
            </div>
          </div>
          <div className="settings-list">
            <div className="settings-item">
              <div className="tutor-soft-icon"><CalendarClock size={17} /></div>
              <div>
                <strong>Minimum booking notice</strong>
                <span>Students must book at least 12 hours before a lesson.</span>
              </div>
              <span className="tutor-chip info">12 hours</span>
            </div>
            <div className="settings-item">
              <div className="tutor-soft-icon green"><Clock size={17} /></div>
              <div>
                <strong>Default lesson duration</strong>
                <span>Used when creating new availability slots.</span>
              </div>
              <span className="tutor-chip">90 min</span>
            </div>
            <div className="settings-item">
              <div className="tutor-soft-icon amber"><Moon size={17} /></div>
              <div>
                <strong>Quiet hours</strong>
                <span>Suppress non-critical notifications overnight.</span>
              </div>
              <span className="tutor-chip">22:00-06:30</span>
            </div>
          </div>
        </section>

        <aside className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Payment Setup</h2>
              <p className="tutor-section-copy">Integrated payment methods for Vietnam.</p>
            </div>
          </div>
          <div className="settings-list">
            <div className="payment-card">
              <div className="request-person">
                <div className="tutor-soft-icon"><CreditCard size={18} /></div>
                <div>
                  <strong>VNPay</strong>
                  <span>Connected to Vietcombank account ending 0426</span>
                </div>
              </div>
            </div>
            <div className="payment-card">
              <div className="request-person">
                <div className="tutor-soft-icon green"><WalletCards size={18} /></div>
                <div>
                  <strong>MoMo</strong>
                  <span>Enabled for payment holds and refunds</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Notification Settings</h2>
              <p className="tutor-section-copy">Choose which events create alerts for tutor and students.</p>
            </div>
          </div>
          <div className="settings-list">
            {[
              ['Booking requests', 'Notify immediately when a student asks for a slot.'],
              ['Confirmations', 'Send confirmation to student after acceptance and payment verification.'],
              ['24h reminders', 'Send automatic reminder before every booked lesson.'],
            ].map(([title, detail]) => (
              <div className="settings-item" key={title}>
                <div className="tutor-soft-icon"><Bell size={17} /></div>
                <div>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
                <button
                  className="toggle"
                  aria-label={`Toggle ${title}`}
                  aria-pressed={notificationToggles[title as keyof typeof notificationToggles]}
                  onClick={() => {
                    setNotificationToggles((current) => ({
                      ...current,
                      [title]: !current[title as keyof typeof current],
                    }));
                    setFeedback(`${title} notification rule updated.`);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
