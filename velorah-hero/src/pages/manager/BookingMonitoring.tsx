import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CalendarCheck2, CheckCircle2, Eye, Flag, RefreshCw, Search, XCircle } from 'lucide-react';
import {
  bookings as initialBookings,
  type BookingRecord,
  type BookingStatus,
} from '../../data/manager';
import {
  ActionLog,
  DecisionDialog,
  ManagerBarChart,
  ManagerActionButton,
  ManagerDonutChart,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

type BookingDialog =
  | { type: 'cancel'; booking: BookingRecord }
  | { type: 'confirm'; booking: BookingRecord }
  | { type: 'complete'; booking: BookingRecord }
  | null;

function statusTone(status: BookingStatus) {
  if (status === 'requested') return 'amber';
  if (status === 'confirmed') return 'blue';
  if (status === 'completed') return 'green';
  return 'rose';
}

function statusLabel(status: BookingStatus) {
  if (status === 'requested') return 'Requested';
  if (status === 'confirmed') return 'Confirmed';
  if (status === 'completed') return 'Completed';
  return 'Cancelled';
}

function overlaps(a: BookingRecord, b: BookingRecord) {
  if (a.id === b.id || a.date !== b.date || a.tutorId !== b.tutorId) return false;
  return a.start < b.end && b.start < a.end;
}

export default function BookingMonitoring() {
  const [records, setRecords] = useState<BookingRecord[]>(initialBookings);
  const [selectedId, setSelectedId] = useState(initialBookings[0]?.id ?? '');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [tutorFilter, setTutorFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [notice, setNotice] = useState('Student bookings are visible here as soon as they are requested. Conflict detection is running on tutor, date, and time.');
  const [dialog, setDialog] = useState<BookingDialog>(null);
  const [cancelReason, setCancelReason] = useState('Manager force cancel: schedule conflict requires immediate student notification.');

  const conflictIds = useMemo(() => {
    const ids = new Set<string>();
    records.forEach((booking) => {
      if (booking.status === 'cancelled') return;
      records.forEach((candidate) => {
        if (candidate.status !== 'cancelled' && overlaps(booking, candidate)) {
          ids.add(booking.id);
          ids.add(candidate.id);
        }
      });
    });
    return ids;
  }, [records]);

  const bookingStatusItems = useMemo(
    () => [
      { label: 'Requested', value: records.filter((booking) => booking.status === 'requested').length, tone: 'amber' as const },
      { label: 'Confirmed', value: records.filter((booking) => booking.status === 'confirmed').length, tone: 'blue' as const },
      { label: 'Completed', value: records.filter((booking) => booking.status === 'completed').length, tone: 'green' as const },
      { label: 'Cancelled', value: records.filter((booking) => booking.status === 'cancelled').length, tone: 'rose' as const },
    ],
    [records],
  );

  const bookingRiskItems = useMemo(
    () => [
      { label: 'Overlap risks', value: conflictIds.size, tone: 'rose' as const, detail: 'Same tutor, date, and overlapping time' },
      { label: 'Flagged issues', value: records.filter((booking) => Boolean(booking.issue)).length, tone: 'amber' as const, detail: 'Needs manager follow-up note' },
      { label: 'Waiting requests', value: records.filter((booking) => booking.status === 'requested').length, tone: 'blue' as const, detail: 'Confirm, cancel, or propose substitute' },
    ],
    [conflictIds, records],
  );

  const filteredBookings = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return records.filter((booking) => {
      const matchStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchDate = !dateFilter || booking.date === dateFilter;
      const matchTutor = tutorFilter === 'all' || booking.tutor === tutorFilter;
      const matchStudent = studentFilter === 'all' || booking.student === studentFilter;
      const matchQuery =
        !cleanQuery ||
        booking.tutor.toLowerCase().includes(cleanQuery) ||
        booking.student.toLowerCase().includes(cleanQuery) ||
        booking.studentNick.toLowerCase().includes(cleanQuery) ||
        booking.subject.toLowerCase().includes(cleanQuery);
      return matchStatus && matchDate && matchTutor && matchStudent && matchQuery;
    });
  }, [dateFilter, query, records, statusFilter, studentFilter, tutorFilter]);

  const tutorOptions = useMemo(() => Array.from(new Set(records.map((booking) => booking.tutor))).sort(), [records]);
  const studentOptions = useMemo(() => Array.from(new Set(records.map((booking) => booking.student))).sort(), [records]);

  const selectedBooking = records.find((booking) => booking.id === selectedId) ?? records[0];

  const updateBooking = (bookingId: string, patch: Partial<BookingRecord>, message: string) => {
    setRecords((current) => current.map((booking) => (booking.id === bookingId ? { ...booking, ...patch } : booking)));
    setNotice(message);
  };

  const flagIssue = (booking: BookingRecord) => {
    updateBooking(
      booking.id,
      { issue: booking.issue ?? 'Manager flagged this booking for manual follow-up.' },
      `${booking.id}: issue flagged. Student ${booking.studentNick}, tutor, and manager notification queues were updated.`,
    );
  };

  const renderBookingActions = (booking: BookingRecord) => {
    if (booking.status === 'requested') {
      return (
        <>
          <ManagerActionButton icon={CalendarCheck2} variant="primary" onClick={() => setDialog({ type: 'confirm', booking })}>
            Confirm
          </ManagerActionButton>
          <ManagerActionButton icon={XCircle} variant="danger" onClick={() => setDialog({ type: 'cancel', booking })}>
            Force cancel
          </ManagerActionButton>
          <ManagerActionButton icon={Flag} onClick={() => flagIssue(booking)}>
            Flag issue
          </ManagerActionButton>
        </>
      );
    }

    if (booking.status === 'confirmed') {
      return (
        <>
          {conflictIds.has(booking.id) && (
            <ManagerActionButton
              icon={AlertTriangle}
              variant="danger"
              onClick={() => setNotice(`${booking.id}: conflict workspace opened. Next actions are force cancel, reschedule, or assign substitute tutor.`)}
            >
              Resolve overlap
            </ManagerActionButton>
          )}
          <ManagerActionButton icon={XCircle} variant="danger" onClick={() => setDialog({ type: 'cancel', booking })}>
            Force cancel
          </ManagerActionButton>
          <ManagerActionButton icon={CheckCircle2} variant="primary" onClick={() => setDialog({ type: 'complete', booking })}>
            Mark completed
          </ManagerActionButton>
          <ManagerActionButton icon={Flag} onClick={() => flagIssue(booking)}>
            Flag issue
          </ManagerActionButton>
        </>
      );
    }

    if (booking.status === 'completed') {
      return (
        <>
          <ManagerActionButton
            icon={CalendarCheck2}
            variant="primary"
            onClick={() => setNotice(`${booking.id}: review request released to ${booking.studentNick}. Review moderation will only show it after lesson completion.`)}
          >
            Release review
          </ManagerActionButton>
          <ManagerActionButton icon={Flag} onClick={() => flagIssue(booking)}>
            Flag issue
          </ManagerActionButton>
        </>
      );
    }

    return (
      <>
        <ManagerActionButton
          icon={RefreshCw}
          variant="primary"
          onClick={() => setNotice(`${booking.id}: replacement flow opened. Choose another tutor, propose a new time, and notify student ${booking.studentNick}.`)}
        >
          Assign replacement
        </ManagerActionButton>
        <ManagerActionButton icon={Flag} onClick={() => flagIssue(booking)}>
          Flag issue
        </ManagerActionButton>
      </>
    );
  };

  return (
    <motion.div
      className="manager-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ManagerPageHeader
        eyebrow="Booking Monitoring"
        title="Live Booking Control"
        description="Track every requested, confirmed, completed, and cancelled lesson with conflict detection and manager intervention paths."
        actions={
          <ManagerActionButton
            icon={AlertTriangle}
            variant="primary"
            onClick={() => setNotice(`${conflictIds.size} bookings are currently marked by overlap detection. Open each highlighted row to resolve.`)}
          >
            Check conflicts
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      <section className="manager-chart-grid" aria-label="Booking monitoring charts">
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Booking state mix</span>
              <h2>Lesson pipeline</h2>
            </div>
            <StatusPill tone="blue">{records.length} bookings</StatusPill>
          </div>
          <ManagerDonutChart items={bookingStatusItems} centerValue={`${records.length}`} centerLabel="Bookings" />
        </article>

        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Conflict pressure</span>
              <h2>Risks to resolve</h2>
            </div>
            <StatusPill tone={conflictIds.size ? 'rose' : 'green'}>{conflictIds.size ? `${conflictIds.size} conflicts` : 'Clear'}</StatusPill>
          </div>
          <ManagerBarChart items={bookingRiskItems} />
        </article>
      </section>

      <section className="manager-filter-bar manager-control-grid manager-booking-filter-grid" aria-label="Booking filters">
        <label className="manager-field">
          <span>Date</span>
          <input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
        </label>
        <label className="manager-field">
          <span>Tutor</span>
          <select value={tutorFilter} onChange={(event) => setTutorFilter(event.target.value)}>
            <option value="all">All tutors</option>
            {tutorOptions.map((tutor) => <option value={tutor} key={tutor}>{tutor}</option>)}
          </select>
        </label>
        <label className="manager-field">
          <span>Student</span>
          <select value={studentFilter} onChange={(event) => setStudentFilter(event.target.value)}>
            <option value="all">All students</option>
            {studentOptions.map((student) => <option value={student} key={student}>{student}</option>)}
          </select>
        </label>
        <label className="manager-field manager-field-wide">
          <span>Nick or subject</span>
          <div className="manager-search-box">
            <Search size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search @nick, subject, or owner" />
          </div>
        </label>
        <label className="manager-field">
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | BookingStatus)}>
            <option value="all">All statuses</option>
            <option value="requested">Requested</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
      </section>

      <section className="manager-two-column">
        <div className="manager-panel manager-list-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">All bookings</span>
              <h2>{filteredBookings.length} visible bookings</h2>
            </div>
            <StatusPill tone={conflictIds.size ? 'rose' : 'green'}>{conflictIds.size ? `${conflictIds.size} conflicts` : 'No conflict'}</StatusPill>
          </div>

          <div className="manager-record-list">
            {filteredBookings.map((booking) => {
              const hasConflict = conflictIds.has(booking.id) || Boolean(booking.conflictWith);
              return (
                <article className={`manager-record-row manager-booking-row ${selectedBooking?.id === booking.id ? 'selected' : ''} ${hasConflict ? 'conflict' : ''}`} key={booking.id}>
                  <button type="button" className="manager-record-main" onClick={() => setSelectedId(booking.id)}>
                    <span className="manager-avatar">{booking.student.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                    <span>
                      <strong>{booking.student} with {booking.tutor}</strong>
                      <small>{booking.subject} - {booking.date} - {booking.start}-{booking.end} - {booking.studentNick}</small>
                    </span>
                  </button>
                  <div className="manager-record-actions">
                    {hasConflict && <StatusPill tone="rose">Overlap risk</StatusPill>}
                    <StatusPill tone={statusTone(booking.status)}>{statusLabel(booking.status)}</StatusPill>
                    <ManagerActionButton icon={Eye} variant="quiet" onClick={() => setSelectedId(booking.id)}>
                      View details
                    </ManagerActionButton>
                    {renderBookingActions(booking)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {selectedBooking && (
          <aside className="manager-panel manager-detail-panel">
            <div className="manager-detail-head">
              <div>
                <span className="manager-eyebrow">{selectedBooking.id}</span>
                <h2>{selectedBooking.subject}</h2>
                <p>{selectedBooking.student} {selectedBooking.studentNick} books {selectedBooking.tutor} on {selectedBooking.date} from {selectedBooking.start} to {selectedBooking.end}.</p>
              </div>
              <StatusPill tone={statusTone(selectedBooking.status)}>{statusLabel(selectedBooking.status)}</StatusPill>
            </div>

            <div className="manager-info-grid">
              <div><span>Tutor</span><strong>{selectedBooking.tutor}</strong></div>
              <div><span>Student</span><strong>{selectedBooking.studentNick}</strong></div>
              <div><span>Payment</span><strong>{selectedBooking.payment}</strong></div>
              <div><span>Next state</span><strong>{selectedBooking.nextStep}</strong></div>
            </div>

            {selectedBooking.issue && <p className="manager-risk-note">{selectedBooking.issue}</p>}

            <div className="manager-detail-section">
              <h3>Manager actions</h3>
              <div className="manager-detail-actions">{renderBookingActions(selectedBooking)}</div>
            </div>

            <div className="manager-detail-section">
              <h3>State transition</h3>
              <div className="manager-state-ladder">
                {(['requested', 'confirmed', 'completed', 'cancelled'] as BookingStatus[]).map((status) => (
                  <span key={status} className={selectedBooking.status === status ? 'active' : ''}>{statusLabel(status)}</span>
                ))}
              </div>
            </div>
          </aside>
        )}
      </section>

      <DecisionDialog
        open={Boolean(dialog)}
        title={
          dialog?.type === 'cancel'
            ? `Force cancel ${dialog.booking.id}`
            : dialog?.type === 'complete'
              ? `Complete ${dialog.booking.id}`
              : `Confirm ${dialog?.booking.id ?? 'booking'}`
        }
        description={
          dialog?.type === 'cancel'
            ? 'Manager cancellation requires a reason. The reason is sent to student, tutor, payment hold, and notification logs.'
            : dialog?.type === 'complete'
              ? 'Completing this booking records attendance, releases review eligibility, and prepares payment settlement.'
            : 'Confirming this booking checks tutor availability, keeps payment hold, and makes the lesson visible to both student and tutor.'
        }
        confirmLabel={dialog?.type === 'cancel' ? 'Cancel with reason' : dialog?.type === 'complete' ? 'Mark completed' : 'Confirm booking'}
        onClose={() => setDialog(null)}
        onConfirm={() => {
          if (!dialog) return;
          if (dialog.type === 'cancel') {
            const reason = cancelReason.trim() || 'Manager force cancel: operational conflict.';
            updateBooking(dialog.booking.id, { status: 'cancelled', issue: reason }, `${dialog.booking.id}: cancelled with reason "${reason}" and both sides were notified.`);
            return;
          }
          if (dialog.type === 'complete') {
            updateBooking(dialog.booking.id, { status: 'completed' }, `${dialog.booking.id}: marked completed. Review moderation, payment settlement, and tutor performance metrics were updated.`);
            return;
          }
          updateBooking(dialog.booking.id, { status: 'confirmed' }, `${dialog.booking.id}: confirmed. Tutor, student, payment hold, and reminders are synced.`);
        }}
      >
        {dialog?.type === 'cancel' && (
          <label className="manager-dialog-field">
            <span>Cancellation reason</span>
            <textarea value={cancelReason} onChange={(event) => setCancelReason(event.target.value)} rows={4} />
          </label>
        )}
      </DecisionDialog>
    </motion.div>
  );
}
