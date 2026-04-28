import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, CheckCircle2, MessageSquareReply, ShieldAlert, UserPlus } from 'lucide-react';
import {
  complaints as initialComplaints,
  type ComplaintRecord,
  type ComplaintStatus,
} from '../../data/manager';
import {
  ActionLog,
  DecisionDialog,
  ManagerActionButton,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

function statusTone(status: ComplaintStatus) {
  if (status === 'open') return 'rose';
  if (status === 'in_progress') return 'amber';
  return 'green';
}

function statusLabel(status: ComplaintStatus) {
  if (status === 'open') return 'Open';
  if (status === 'in_progress') return 'In progress';
  return 'Resolved';
}

function priorityTone(priority: string) {
  if (priority === 'critical') return 'rose';
  if (priority === 'high') return 'amber';
  return 'blue';
}

export default function Complaints() {
  const [records, setRecords] = useState<ComplaintRecord[]>(initialComplaints);
  const [selectedId, setSelectedId] = useState(initialComplaints[0]?.id ?? '');
  const [statusFilter, setStatusFilter] = useState<'all' | ComplaintStatus>('all');
  const [notice, setNotice] = useState('Complaint cases are connected to tutor status, booking monitoring, payment holds, and student notifications.');
  const [resolveTarget, setResolveTarget] = useState<ComplaintRecord | null>(null);
  const [resolutionNote, setResolutionNote] = useState('Resolution: manager contacted both sides, proposed make-up lesson, and confirmed student acceptance.');

  const filteredComplaints = useMemo(() => {
    if (statusFilter === 'all') return records;
    return records.filter((complaint) => complaint.status === statusFilter);
  }, [records, statusFilter]);

  const selectedComplaint = records.find((complaint) => complaint.id === selectedId) ?? records[0];

  const updateComplaint = (complaintId: string, patch: Partial<ComplaintRecord>, message: string) => {
    setRecords((current) => current.map((complaint) => (complaint.id === complaintId ? { ...complaint, ...patch } : complaint)));
    setNotice(message);
  };

  const assignHandler = (complaint: ComplaintRecord) => {
    updateComplaint(
      complaint.id,
      { status: 'in_progress', handler: complaint.handler ?? 'Manager Trang' },
      `${complaint.id}: assigned to ${complaint.handler ?? 'Manager Trang'}. Student and tutor received response SLA notification.`,
    );
  };

  const respond = (complaint: ComplaintRecord) => {
    updateComplaint(
      complaint.id,
      { status: complaint.status === 'open' ? 'in_progress' : complaint.status, handler: complaint.handler ?? 'Manager Trang' },
      `${complaint.id}: response drafted and sent with next steps for student, tutor, and payment/booking follow-up.`,
    );
  };

  const openResolveDialog = (complaint: ComplaintRecord) => {
    if (!complaint.handler) {
      setSelectedId(complaint.id);
      setNotice(`${complaint.id}: resolve requires assigned handler first. Next step: Assign handler, then add resolution note.`);
      return;
    }
    setResolveTarget(complaint);
  };

  const renderComplaintActions = (complaint: ComplaintRecord) => {
    if (complaint.status === 'open') {
      return (
        <>
          <ManagerActionButton icon={UserPlus} variant="primary" onClick={() => assignHandler(complaint)}>
            Assign handler
          </ManagerActionButton>
          <ManagerActionButton icon={MessageSquareReply} onClick={() => respond(complaint)}>
            Respond
          </ManagerActionButton>
          <ManagerActionButton
            icon={CheckCircle2}
            reason="Requires assigned handler"
            alternative="Assign handler before resolving"
            onClick={() => openResolveDialog(complaint)}
          >
            Resolve
          </ManagerActionButton>
        </>
      );
    }

    if (complaint.status === 'in_progress') {
      return (
        <>
          <ManagerActionButton icon={MessageSquareReply} onClick={() => respond(complaint)}>
            Respond
          </ManagerActionButton>
          <ManagerActionButton icon={CheckCircle2} variant="primary" onClick={() => openResolveDialog(complaint)}>
            Resolve
          </ManagerActionButton>
        </>
      );
    }

    return (
      <>
        <ManagerActionButton
          icon={ShieldAlert}
          onClick={() => updateComplaint(complaint.id, { status: 'in_progress' }, `${complaint.id}: reopened for follow-up. Previous resolution note is preserved.`)}
        >
          Reopen
        </ManagerActionButton>
        <ManagerActionButton
          icon={Archive}
          variant="primary"
          onClick={() => setNotice(`${complaint.id}: archive scheduled after 7-day follow-up window. Student satisfaction check remains queued.`)}
        >
          Archive
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
        eyebrow="UC-12"
        title="Complaints"
        description="Handle student and tutor complaints with clear ownership, response steps, resolution notes, and cross-flow impact on tutors, bookings, and payments."
        actions={
          <ManagerActionButton
            icon={ShieldAlert}
            variant="primary"
            onClick={() => setNotice('Critical queue opened. Open cases are sorted by missed lesson, payment risk, and tutor suspension impact.')}
          >
            Critical queue
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      <section className="manager-filter-bar" aria-label="Complaint filters">
        {(['all', 'open', 'in_progress', 'resolved'] as const).map((status) => (
          <button
            type="button"
            key={status}
            className={`manager-filter-chip ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status === 'all' ? 'All complaints' : statusLabel(status)}
          </button>
        ))}
      </section>

      <section className="manager-two-column">
        <div className="manager-panel manager-list-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Case queue</span>
              <h2>{filteredComplaints.length} complaint cases</h2>
            </div>
            <StatusPill tone="rose">{records.filter((complaint) => complaint.status === 'open').length} open</StatusPill>
          </div>

          <div className="manager-record-list">
            {filteredComplaints.map((complaint) => (
              <article className={`manager-record-row ${selectedComplaint?.id === complaint.id ? 'selected' : ''}`} key={complaint.id}>
                <button type="button" className="manager-record-main" onClick={() => setSelectedId(complaint.id)}>
                  <span className="manager-avatar">{complaint.id.replace('CMP-', '')}</span>
                  <span>
                    <strong>{complaint.student} against {complaint.tutor}</strong>
                    <small>{complaint.issue}</small>
                  </span>
                </button>
                <div className="manager-record-actions">
                  <StatusPill tone={priorityTone(complaint.priority)}>{complaint.priority}</StatusPill>
                  <StatusPill tone={statusTone(complaint.status)}>{statusLabel(complaint.status)}</StatusPill>
                  {renderComplaintActions(complaint)}
                </div>
              </article>
            ))}
          </div>
        </div>

        {selectedComplaint && (
          <aside className="manager-panel manager-detail-panel">
            <div className="manager-detail-head">
              <div>
                <span className="manager-eyebrow">{selectedComplaint.id}</span>
                <h2>{selectedComplaint.issue}</h2>
                <p>Submitted {selectedComplaint.submittedAt}. Handler: {selectedComplaint.handler ?? 'Not assigned yet'}.</p>
              </div>
              <StatusPill tone={statusTone(selectedComplaint.status)}>{statusLabel(selectedComplaint.status)}</StatusPill>
            </div>

            <div className="manager-info-grid">
              <div><span>Student</span><strong>{selectedComplaint.student}</strong></div>
              <div><span>Tutor</span><strong>{selectedComplaint.tutor}</strong></div>
              <div><span>Priority</span><strong>{selectedComplaint.priority}</strong></div>
              <div><span>Next action</span><strong>{selectedComplaint.nextStep}</strong></div>
            </div>

            {selectedComplaint.resolutionNote && (
              <div className="manager-detail-section">
                <h3>Resolution note</h3>
                <p className="manager-suggestion">{selectedComplaint.resolutionNote}</p>
              </div>
            )}

            <div className="manager-detail-section">
              <h3>Case actions</h3>
              <div className="manager-detail-actions">{renderComplaintActions(selectedComplaint)}</div>
            </div>

            <div className="manager-detail-section">
              <h3>State transition</h3>
              <div className="manager-state-ladder manager-state-ladder-three">
                {(['open', 'in_progress', 'resolved'] as ComplaintStatus[]).map((status) => (
                  <span key={status} className={selectedComplaint.status === status ? 'active' : ''}>{statusLabel(status)}</span>
                ))}
              </div>
            </div>
          </aside>
        )}
      </section>

      <DecisionDialog
        open={Boolean(resolveTarget)}
        title={`Resolve ${resolveTarget?.id ?? 'complaint'}`}
        description="A resolution note is required before a complaint can move to Resolved. The note is saved to student, tutor, and manager audit history."
        confirmLabel="Resolve with note"
        onClose={() => setResolveTarget(null)}
        onConfirm={() => {
          if (!resolveTarget) return;
          const note = resolutionNote.trim();
          if (!note) {
            setNotice(`${resolveTarget.id}: resolution note is required. Case remains in progress; add the outcome before resolving.`);
            return false;
          }
          updateComplaint(resolveTarget.id, { status: 'resolved', resolutionNote: note }, `${resolveTarget.id}: resolved with manager note and follow-up reminder scheduled.`);
        }}
      >
        <label className="manager-dialog-field">
          <span>Resolution note</span>
          <textarea value={resolutionNote} onChange={(event) => setResolutionNote(event.target.value)} rows={4} />
        </label>
      </DecisionDialog>
    </motion.div>
  );
}
