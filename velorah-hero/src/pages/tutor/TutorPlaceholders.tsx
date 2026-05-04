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
  const [readIds, setReadIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [channels, setChannels] = useState({ push: true, email: true, zalo: true });
  const [actionFeedback, setActionFeedback] = useState('');

  type NI = { id: string; title: string; detail: string; time: string; tone: 'info' | 'success' | 'warning' | 'danger'; priority?: 'high'; action?: string; student?: string; subject?: string; amount?: string; date?: string };
  const groups: { title: string; icon: typeof BellRing; items: NI[] }[] = [
    { title: 'New Bookings', icon: BellRing, items: [
      { id: 'n01', title: 'New booking from Thanh Truc', detail: 'Chemistry 11 - Ch5: Organic reactions. Fri 24 Apr, 18:00-19:30. Payment hold ₫350,000 via VNPay. Note: "Focus on reaction mechanisms."', time: '2m ago', tone: 'info', priority: 'high', action: 'Accept or Decline', student: 'Thanh Truc', subject: 'Chemistry 11', amount: '₫350,000', date: 'Fri 24 Apr, 18:00-19:30' },
      { id: 'n02', title: 'Bao Chau accepted suggested time', detail: 'Physics replacement slot Tue 22 Apr, 19:00-20:30 confirmed by student. Waiting for your final confirmation.', time: '6m ago', tone: 'success', action: 'Confirm Schedule', student: 'Bao Chau', subject: 'Physics', date: 'Tue 22 Apr, 19:00-20:30' },
      { id: 'n03', title: 'Group session - IELTS Writing', detail: '3 students (Minh Quan, Gia Bao, Lan Anh) request group. Sat 26 Apr, 09:00-11:00. Total: ₫900,000.', time: '15m ago', tone: 'info', action: 'Review Group', student: 'Minh Quan +2', subject: 'IELTS Writing', amount: '₫900,000', date: 'Sat 26 Apr, 09:00-11:00' },
    ]},
    { title: 'Confirmations & Reminders', icon: CheckCircle2, items: [
      { id: 'n04', title: 'Lan Anh lesson confirmed & paid', detail: 'VNPay ₫280,000 verified. Schedule locked Wed 23 Apr, 14:00-15:30. Materials: IPA Chart. Online via Google Meet.', time: '18m ago', tone: 'success', student: 'Lan Anh', subject: 'Phonetics', amount: '₫280,000', date: 'Wed 23 Apr, 14:00-15:30' },
      { id: 'n05', title: '24h reminder: 3 lessons tomorrow', detail: 'Tomorrow: Quantum Mechanics (08:00), Data Structures (13:00), Syntax Analysis (14:00). Total 4.5h. All students confirmed.', time: '2h ago', tone: 'info', date: 'Tomorrow' },
      { id: 'n06', title: 'Monthly report ready', detail: 'April 2026: 28 lessons, 96% completion, avg 4.6★. Check Performance dashboard.', time: '5h ago', tone: 'success' },
    ]},
    { title: 'Leave Requests', icon: CalendarClock, items: [
      { id: 'n07', title: 'Minh Quan requested leave', detail: 'IELTS Writing, Wed 23 Apr, 10:00-11:30. Reason: "Trùng lịch thi / Exam conflict". Requests reschedule to next week.', time: '25m ago', tone: 'warning', priority: 'high', action: 'Approve or Decline', student: 'Minh Quan', subject: 'IELTS Writing', date: 'Wed 23 Apr, 10:00-11:30' },
      { id: 'n08', title: 'Gia Bao leave auto-approved', detail: 'Algorithm Complexity, Thu 24 Apr. Reason: "Sức khỏe / Health". Auto-approved (48h advance). Slot returned.', time: '1h ago', tone: 'info', student: 'Gia Bao', subject: 'Algorithm Complexity', date: 'Thu 24 Apr' },
    ]},
    { title: 'Cancellations', icon: XCircle, items: [
      { id: 'n09', title: 'Bao Chau cancelled session', detail: 'Physics Fri 25 Apr. Reason: "Công việc đột xuất". Refund ₫200,000 queued (12h policy met). Slot returned.', time: '1h ago', tone: 'warning', student: 'Bao Chau', subject: 'Physics', amount: '₫200,000 refund', date: 'Fri 25 Apr' },
    ]},
    { title: 'Student Reviews', icon: MessageSquare, items: [
      { id: 'n10', title: 'New 5★ review from Lan Anh', detail: '"Excellent phonetics session! Clear explanations and great IPA exercises." — Credibility +2 points.', time: '3h ago', tone: 'success', student: 'Lan Anh', subject: 'Phonetics' },
      { id: 'n11', title: 'New 3★ review from Bao Chau', detail: '"Content was fine but session started late and felt rushed." — Neutral credibility. Consider punctuality.', time: '6h ago', tone: 'warning', student: 'Bao Chau', subject: 'Physics' },
    ]},
    { title: 'Credibility & Alerts', icon: ShieldCheck, items: [
      { id: 'n12', title: 'Credibility score: 87/100 (Good)', detail: 'Recent 5★ reviews boosted score +4. Keep above 70 to maintain Good standing. Below 25 = critical warning.', time: '1d ago', tone: 'success' },
    ]},
    { title: 'Payments', icon: CreditCard, items: [
      { id: 'n13', title: 'Weekly payout: ₫2,450,000', detail: '14-20 Apr: 8 sessions. Transferred to VietcomBank ****6789. Processing: 1-2 business days.', time: '1d ago', tone: 'success', amount: '₫2,450,000' },
      { id: 'n14', title: 'Payment hold: Thanh Truc', detail: '₫350,000 pre-paid for Chemistry. Released after lesson completion.', time: '2d ago', tone: 'info', amount: '₫350,000', student: 'Thanh Truc' },
    ]},
  ];

  const allIds = groups.flatMap(g => g.items.map(i => i.id));
  const unread = allIds.filter(id => !readIds.includes(id)).length;
  const sel = groups.flatMap(g => g.items).find(i => i.id === selectedId);
  const markRead = (id: string) => { if (!readIds.includes(id)) setReadIds(p => [...p, id]); };

  return (
    <motion.div className="tutor-page" {...pageMotion}>
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><Bell size={16} /> Real-time updates</span>
          <h1 className="tutor-page-title">Notifications</h1>
          <p className="tutor-page-subtitle">Booking requests, leave approvals, reviews, credibility alerts, payments, and reminders.</p>
        </div>
        <div className="tutor-actions">
          <span className="tutor-chip success"><span className="tutor-live-dot" /> Live</span>
          <span className="tutor-chip">{unread} unread</span>
          <button className="tutor-btn" onClick={() => setReadIds(allIds)} disabled={unread === 0}>Mark all read</button>
        </div>
      </div>

      <div className="notifications-layout">
        <section className="tutor-card" style={{ maxHeight: '78vh', overflowY: 'auto' }}>
          {groups.map(({ title, icon: Icon, items }) => (
            <div className="notification-group" key={title}>
              <h2 className="notification-group-title"><Icon size={17} /> {title} <span style={{ fontSize: 11, opacity: 0.35, fontWeight: 400, marginLeft: 4 }}>({items.length})</span></h2>
              {items.map(item => {
                const isRead = readIds.includes(item.id);
                return (
                  <article className="notification-item" key={item.id} onClick={() => { setSelectedId(item.id); markRead(item.id); setActionFeedback(''); }}
                    style={{ cursor: 'pointer', opacity: isRead ? 0.55 : 1, borderLeft: selectedId === item.id ? '3px solid var(--tutor-accent, #60a5fa)' : '3px solid transparent', transition: 'all 0.2s' }}>
                    <div className={`tutor-soft-icon ${item.tone === 'success' ? 'green' : item.tone === 'warning' ? 'amber' : ''}`}><Icon size={17} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {item.title}
                        {item.priority === 'high' && <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 4, background: 'rgba(239,68,68,0.15)', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Urgent</span>}
                      </strong>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{item.detail}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
                      <span className={`tutor-chip ${isRead ? '' : item.tone}`} style={{ fontSize: 10 }}>{isRead ? 'Read' : item.time}</span>
                      {item.action && !isRead && <span style={{ fontSize: 9, color: 'rgb(96,165,250)', fontWeight: 600 }}>{item.action}</span>}
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </section>

        <aside className="tutor-card" style={{ position: 'sticky', top: 20 }}>
          {sel ? (
            <>
              <div className="tutor-card-header">
                <div><h2 className="tutor-section-title">{sel.title}</h2><p className="tutor-section-copy" style={{ marginTop: 4, fontSize: 12, opacity: 0.4 }}>{sel.time}</p></div>
                <span className={`tutor-chip ${sel.tone}`}>{sel.priority === 'high' ? 'Urgent' : sel.tone === 'success' ? 'Confirmed' : sel.tone === 'warning' ? 'Attention' : 'Info'}</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, opacity: 0.65, margin: '12px 0 16px' }}>{sel.detail}</p>
              {(sel.student || sel.subject || sel.amount || sel.date) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {sel.student && <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.3, marginBottom: 4 }}>Student</div><div style={{ fontSize: 13, fontWeight: 600 }}>{sel.student}</div></div>}
                  {sel.subject && <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.3, marginBottom: 4 }}>Subject</div><div style={{ fontSize: 13, fontWeight: 600 }}>{sel.subject}</div></div>}
                  {sel.date && <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.3, marginBottom: 4 }}>Schedule</div><div style={{ fontSize: 13, fontWeight: 600 }}>{sel.date}</div></div>}
                  {sel.amount && <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.3, marginBottom: 4 }}>Amount</div><div style={{ fontSize: 13, fontWeight: 600 }}>{sel.amount}</div></div>}
                </div>
              )}
              {sel.action && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {sel.action.includes('Accept') || sel.action.includes('Approve') ? (
                    <>
                      <button className="tutor-btn primary" style={{ flex: 1 }} onClick={() => setActionFeedback(`✅ Accepted: ${sel!.title}`)}>Accept</button>
                      <button className="tutor-btn" style={{ flex: 1 }} onClick={() => setActionFeedback(`❌ Declined: ${sel!.title}`)}>Decline</button>
                    </>
                  ) : (
                    <button className="tutor-btn primary" style={{ flex: 1 }} onClick={() => setActionFeedback(`✅ Done: ${sel!.title}`)}>{sel.action}</button>
                  )}
                </div>
              )}
              {actionFeedback && <p style={{ fontSize: 12, marginTop: 12, padding: '10px 14px', borderRadius: 12, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)', color: 'rgb(134,239,172)' }}>{actionFeedback}</p>}
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, opacity: 0.2 }}>
              <Bell size={36} /><p style={{ marginTop: 12, fontSize: 13 }}>Select a notification</p>
            </div>
          )}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="tutor-section-title">Delivery Channels</h2>
            <div className="settings-list" style={{ marginTop: 12 }}>
              <div className="settings-item"><div className="tutor-soft-icon"><Smartphone size={17} /></div><div><strong>Mobile push</strong><span>Booking & reminder alerts</span></div><button className="toggle" aria-pressed={channels.push} onClick={() => setChannels(c => ({ ...c, push: !c.push }))} /></div>
              <div className="settings-item"><div className="tutor-soft-icon green"><Mail size={17} /></div><div><strong>Email summary</strong><span>Daily schedule at 06:30</span></div><button className="toggle" aria-pressed={channels.email} onClick={() => setChannels(c => ({ ...c, email: !c.email }))} /></div>
              <div className="settings-item"><div className="tutor-soft-icon amber"><MessageSquare size={17} /></div><div><strong>Zalo fallback</strong><span>When student prefers Zalo</span></div><button className="toggle" aria-pressed={channels.zalo} onClick={() => setChannels(c => ({ ...c, zalo: !c.zalo }))} /></div>
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
          <span className="tutor-eyebrow"><UserRound size={16} /> Tutor profile</span>
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
