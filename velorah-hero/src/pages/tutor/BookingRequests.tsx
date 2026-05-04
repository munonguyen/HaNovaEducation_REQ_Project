import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarCheck,
  Check,
  Clock,
  MessageSquare,
  RefreshCw,
  Send,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

type BookingStatus = 'Clear' | 'Conflict' | 'Accepted' | 'Suggested' | 'Rejected';

const initialRequests: Array<{
  student: string;
  subject: string;
  time: string;
  message: string;
  status: BookingStatus;
  payment: string;
  expires: string;
}> = [
  {
    student: 'Thanh Truc',
    subject: 'Chemistry 11',
    time: 'Fri 24 Apr, 18:00-19:30',
    message: 'I want to review organic chemistry each Friday before school tests.',
    status: 'Clear',
    payment: 'MoMo hold ready',
    expires: '11h 42m',
  },
  {
    student: 'Duc Huy',
    subject: 'SAT Math',
    time: 'Sat 25 Apr, 09:00-10:00',
    message: 'Can we start with a trial lesson and then decide a weekly plan?',
    status: 'Clear',
    payment: 'VNPay hold ready',
    expires: '18h 05m',
  },
  {
    student: 'Gia Linh',
    subject: 'Grade 12 Math',
    time: 'Wed 22 Apr, 11:00-12:30',
    message: 'I need help with integrals. My exam is next Monday.',
    status: 'Conflict',
    payment: 'Awaiting slot',
    expires: '07h 20m',
  },
  {
    student: 'Bao Chau',
    subject: 'IELTS Speaking',
    time: 'Tue 21 Apr, 20:00-21:00',
    message: '',
    status: 'Clear',
    payment: 'MoMo hold ready',
    expires: '23h 10m',
  },
];

export default function BookingRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeBucket, setActiveBucket] = useState<'pending' | 'suggested' | 'accepted'>('pending');
  const [feedback, setFeedback] = useState('Booking requests are synced with schedule locks and payment holds.');

  const counts = useMemo(() => {
    const pending = requests.filter((request) => request.status === 'Clear' || request.status === 'Conflict').length;
    const suggested = requests.filter((request) => request.status === 'Suggested').length;
    const accepted = requests.filter((request) => request.status === 'Accepted').length;
    return { pending, suggested, accepted };
  }, [requests]);

  const updateRequest = (student: string, status: BookingStatus) => {
    setRequests((current) =>
      current.map((request) => {
        if (request.student !== student) return request;
        if (status === 'Accepted') {
          return {
            ...request,
            status,
            payment: request.payment.replace('hold ready', 'verified'),
            expires: 'Synced',
          };
        }
        if (status === 'Suggested') {
          return {
            ...request,
            status,
            expires: 'Waiting for student',
          };
        }
        if (status === 'Rejected') {
          return {
            ...request,
            status,
            payment: 'No charge',
            expires: 'Closed',
          };
        }
        return { ...request, status };
      }),
    );
    setFeedback(`${student}: ${status === 'Accepted' ? 'accepted, payment verified, schedule booked, notification queued.' : status === 'Suggested' ? 'new time suggestion sent to student.' : status === 'Rejected' ? 'request rejected with no charge.' : 'status updated.'}`);
  };

  const acceptClearRequests = () => {
    setRequests((current) =>
      current.map((request) =>
        request.status === 'Clear'
          ? {
              ...request,
              status: 'Accepted',
              payment: request.payment.replace('hold ready', 'verified'),
              expires: 'Synced',
            }
          : request,
      ),
    );
    setActiveBucket('accepted');
    setFeedback('All clear requests accepted. Schedule lock, payment verification, and confirmations were triggered.');
  };

  const syncRequests = () => {
    setRequests(initialRequests);
    setActiveBucket('pending');
    setFeedback('Requests re-synced from booking queue.');
  };

  const visibleRequests = requests.filter((request) => {
    if (activeBucket === 'pending') return request.status === 'Clear' || request.status === 'Conflict' || request.status === 'Rejected';
    if (activeBucket === 'suggested') return request.status === 'Suggested';
    return request.status === 'Accepted';
  });

  return (
    <motion.div
      className="tutor-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><CalendarCheck size={16} /> Booking flow</span>
          <h1 className="tutor-page-title">Booking Requests</h1>
          <p className="tutor-page-subtitle">
            Review incoming requests, prevent invalid accepts, and auto-sync confirmed bookings into your schedule.
          </p>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn" onClick={syncRequests}><RefreshCw size={16} /> Sync now</button>
          <button className="tutor-btn primary" onClick={acceptClearRequests}><Check size={16} /> Accept clear requests</button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><ShieldCheck size={19} /></div>
        <div>
          <strong>Booking action status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <div className="requests-toolbar">
        <div className="tab-bar">
          <button className={`tab-button${activeBucket === 'pending' ? ' is-active' : ''}`} onClick={() => setActiveBucket('pending')}>Pending {counts.pending}</button>
          <button className={`tab-button${activeBucket === 'suggested' ? ' is-active' : ''}`} onClick={() => setActiveBucket('suggested')}>Suggested {counts.suggested}</button>
          <button className={`tab-button${activeBucket === 'accepted' ? ' is-active' : ''}`} onClick={() => setActiveBucket('accepted')}>Accepted today {counts.accepted}</button>
        </div>
        <div className="tutor-actions">
          <span className="tutor-chip success"><ShieldCheck size={13} /> Live schedule lock on</span>
          <span className="tutor-chip info"><Clock size={13} /> Average response 8 min</span>
        </div>
      </div>

      <div className="requests-layout">
        <section className="requests-list-large">
          {visibleRequests.map((request) => {
            const hasConflict = request.status === 'Conflict';
            const isAccepted = request.status === 'Accepted';
            const isSuggested = request.status === 'Suggested';
            const isRejected = request.status === 'Rejected';
            const isClosed = isAccepted || isSuggested || isRejected;
            const statusTone = hasConflict ? 'danger' : isAccepted ? 'success' : isSuggested ? 'info' : isRejected ? 'warning' : 'success';
            return (
              <article className="booking-request-full" key={request.student}>
                <div className="booking-request-main">
                  <div>
                    <div className="request-card-top">
                      <div className="request-person">
                        <div className="avatar-initial">{request.student.split(' ').map((part) => part[0]).join('')}</div>
                        <div>
                          <strong>{request.student}</strong>
                          <span>{request.subject}</span>
                        </div>
                      </div>
                      <span className={`tutor-chip ${statusTone}`}>
                        {hasConflict ? <AlertTriangle size={13} /> : isRejected ? <X size={13} /> : <ShieldCheck size={13} />}
                        {request.status}
                      </span>
                    </div>

                    <div className="request-detail-grid">
                      <div className="request-detail">
                        <span>Requested time</span>
                        <strong>{request.time}</strong>
                      </div>
                      <div className="request-detail">
                        <span>Payment</span>
                        <strong>{request.payment}</strong>
                      </div>
                      <div className="request-detail">
                        <span>Expires in</span>
                        <strong>{request.expires}</strong>
                      </div>
                    </div>

                    {request.message && (
                      <p className="request-message">
                        <MessageSquare size={14} style={{ display: 'inline', marginRight: 6 }} />
                        {request.message}
                      </p>
                    )}
                  </div>

                  <div className="request-actions" style={{ alignContent: 'start', justifyContent: 'flex-end' }}>
                    <button
                      className="compact-btn success"
                      disabled={hasConflict || isClosed}
                      onClick={() => updateRequest(request.student, 'Accepted')}
                    >
                      <Check size={14} /> {isAccepted ? 'Accepted' : 'Accept'}
                    </button>
                    <button
                      className="compact-btn primary"
                      disabled={isAccepted || isRejected}
                      onClick={() => updateRequest(request.student, 'Suggested')}
                    >
                      <Send size={14} /> {isSuggested ? 'Suggested' : 'Suggest new time'}
                    </button>
                    <button
                      className="compact-btn danger"
                      disabled={isAccepted || isRejected}
                      onClick={() => updateRequest(request.student, 'Rejected')}
                    >
                      <X size={14} /> {isRejected ? 'Rejected' : 'Reject'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
          {visibleRequests.length === 0 && (
            <section className="tutor-card" style={{ padding: 24 }}>
              <h2 className="tutor-section-title">No requests in this queue</h2>
              <p className="tutor-section-copy">Switch tabs or sync to refresh the booking queue.</p>
            </section>
          )}
        </section>

        <aside className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Connected Accept Flow</h2>
              <p className="tutor-section-copy">What happens after a tutor accepts a valid request.</p>
            </div>
          </div>

          <div className="flow-steps">
            <div className="flow-step">
              <div className="flow-step-num">1</div>
              <div>
                <strong>Schedule lock</strong>
                <span>The requested time becomes Booked and is removed from public availability.</span>
              </div>
            </div>
            <div className="flow-step">
              <div className="flow-step-num">2</div>
              <div>
                <strong>Payment confirmation</strong>
                <span>VNPay or MoMo hold is verified before the lesson is fully confirmed.</span>
              </div>
            </div>
            <div className="flow-step">
              <div className="flow-step-num">3</div>
              <div>
                <strong>Notifications</strong>
                <span>Student receives confirmation now and an automatic 24h reminder later.</span>
              </div>
            </div>
          </div>
        </aside>

        <aside className="insight-panel">
          <div className="tutor-soft-icon amber"><AlertTriangle size={19} /></div>
          <div>
            <strong>Invalid action prevention</strong>
            <p>Gia Linh cannot be accepted because the requested slot overlaps with an existing Math lesson. Suggesting a new time keeps the flow moving.</p>
          </div>
        </aside>

        <aside className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Request Mix</h2>
              <p className="tutor-section-copy">Light operational context, not an analytics dashboard.</p>
            </div>
          </div>
          <div className="session-list">
            <div className="session-row">
              <div className="tutor-soft-icon"><UserRound size={18} /></div>
              <div>
                <h3 className="session-title">2 new individual students</h3>
                <div className="session-meta"><span>Both ask for exam prep this week</span></div>
              </div>
              <span className="tutor-chip info">New</span>
            </div>
            <div className="session-row">
              <div className="tutor-soft-icon green"><CalendarCheck size={18} /></div>
              <div>
                <h3 className="session-title">2 recurring opportunities</h3>
                <div className="session-meta"><span>Friday evening and Tuesday night</span></div>
              </div>
              <span className="tutor-chip success">Fit</span>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
