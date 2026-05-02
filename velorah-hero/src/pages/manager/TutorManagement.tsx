import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Eye, FileCheck2, ShieldAlert, UserCheck, UserX } from 'lucide-react';
import {
  tutors as initialTutors,
  type TutorRecord,
  type TutorStatus,
} from '../../data/manager';
import {
  ActionLog,
  DecisionDialog,
  ManagerActionButton,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

type TutorAction = {
  tutorId: string;
  label: string;
  description: string;
  nextStatus?: TutorStatus;
};

function statusTone(status: TutorStatus) {
  if (status === 'active') return 'green';
  if (status === 'pending') return 'amber';
  if (status === 'suspended') return 'rose';
  return 'blue';
}

function statusLabel(status: TutorStatus) {
  if (status === 'pending') return 'Pending approval';
  if (status === 'approved') return 'Approved';
  if (status === 'active') return 'Active';
  return 'Suspended';
}

function rejectAction(tutor: TutorRecord): TutorAction {
  return {
    tutorId: tutor.id,
    label: `Reject ${tutor.name}`,
    description: 'The tutor application will be rejected and the tutor receives a clear reason plus re-apply guidance.',
  };
}

function hasVerifiedCertificates(tutor: TutorRecord) {
  return tutor.certificates.every((certificate) => certificate.verified);
}

export default function TutorManagement() {
  const [records, setRecords] = useState<TutorRecord[]>(initialTutors);
  const [selectedId, setSelectedId] = useState(initialTutors[0]?.id ?? '');
  const [statusFilter, setStatusFilter] = useState<'all' | TutorStatus>('all');
  const [notice, setNotice] = useState('Tutor approval queue is synced with certificate verification, booking eligibility, and quality metrics.');
  const [pendingAction, setPendingAction] = useState<TutorAction | null>(null);

  const filteredTutors = useMemo(() => {
    if (statusFilter === 'all') return records;
    return records.filter((tutor) => tutor.status === statusFilter);
  }, [records, statusFilter]);

  const selectedTutor = records.find((tutor) => tutor.id === selectedId) ?? records[0];

  const updateTutorStatus = (tutorId: string, nextStatus: TutorStatus) => {
    setRecords((current) =>
      current.map((tutor) => (tutor.id === tutorId ? { ...tutor, status: nextStatus } : tutor)),
    );
    const tutor = records.find((item) => item.id === tutorId);
    setNotice(`${tutor?.name ?? 'Tutor'} moved to ${statusLabel(nextStatus)}. Student and booking visibility has been updated.`);
  };

  const verifyCertificate = (tutorId: string, certificateName: string) => {
    setRecords((current) =>
      current.map((tutor) =>
        tutor.id === tutorId
          ? {
              ...tutor,
              certificates: tutor.certificates.map((certificate) =>
                certificate.name === certificateName ? { ...certificate, verified: true } : certificate,
              ),
            }
          : tutor,
      ),
    );
    setNotice(`${certificateName} marked as verified. Approval can continue if all required documents are verified.`);
  };

  const requestStatusChange = (action: TutorAction) => {
    setPendingAction(action);
  };

  const runBlockedAction = (tutor: TutorRecord, reason: string, alternative: string) => {
    setSelectedId(tutor.id);
    setNotice(`${tutor.name}: ${reason}. Next step: ${alternative}.`);
  };

  const renderPrimaryAction = (tutor: TutorRecord) => {
    const certificateReady = hasVerifiedCertificates(tutor);

    if (tutor.status === 'pending') {
      if (!certificateReady) {
        return (
          <ManagerActionButton
            icon={BadgeCheck}
            reason="Requires certificate verification"
            alternative="Open certificates and verify missing files"
            onClick={() => runBlockedAction(tutor, 'Approval is blocked because one certificate is not verified', 'verify missing certificate in the detail panel')}
          >
            Approve tutor
          </ManagerActionButton>
        );
      }

      return (
        <ManagerActionButton
          icon={BadgeCheck}
          variant="primary"
          onClick={() =>
            requestStatusChange({
              tutorId: tutor.id,
              label: `Approve ${tutor.name}`,
              description: 'This moves the tutor from Pending to Approved. They still need activation before receiving bookings.',
              nextStatus: 'approved',
            })
          }
        >
          Approve
        </ManagerActionButton>
      );
    }

    if (tutor.status === 'approved') {
      return (
        <ManagerActionButton
          icon={UserCheck}
          variant="primary"
          onClick={() =>
            requestStatusChange({
              tutorId: tutor.id,
              label: `Activate ${tutor.name}`,
              description: 'This allows the tutor to receive student bookings and appear in matching results.',
              nextStatus: 'active',
            })
          }
        >
          Activate
        </ManagerActionButton>
      );
    }

    if (tutor.status === 'active') {
      return (
        <ManagerActionButton
          icon={ShieldAlert}
          variant="danger"
          onClick={() =>
            requestStatusChange({
              tutorId: tutor.id,
              label: `Suspend ${tutor.name}`,
              description: 'New bookings will stop immediately. Existing confirmed bookings must be reviewed in Booking Monitoring.',
              nextStatus: 'suspended',
            })
          }
        >
          Suspend
        </ManagerActionButton>
      );
    }

    if (tutor.riskNote) {
      return (
        <ManagerActionButton
          icon={UserCheck}
          reason="Requires complaint resolution"
          alternative="Open complaint case before reactivation"
          onClick={() => runBlockedAction(tutor, 'Reactivation is blocked by unresolved quality risk', 'resolve the linked complaint and add manager note')}
        >
          Reactivate tutor
        </ManagerActionButton>
      );
    }

    return (
      <ManagerActionButton
        icon={UserCheck}
        variant="primary"
        onClick={() =>
          requestStatusChange({
            tutorId: tutor.id,
            label: `Reactivate ${tutor.name}`,
            description: 'The tutor will become Active and booking visibility will be restored.',
            nextStatus: 'active',
          })
        }
      >
        Reactivate
      </ManagerActionButton>
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
        eyebrow="UC-01 / UC-11"
        title="Tutor Management"
        description="Approve tutors, reject weak applications, monitor performance, and control suspension or reactivation without leaving the manager flow."
        actions={
          <ManagerActionButton
            icon={FileCheck2}
            variant="primary"
            onClick={() => setNotice('Certificate review queue opened. Select a pending tutor and verify missing documents before approval.')}
          >
            Certificate queue
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      <section className="manager-filter-bar" aria-label="Tutor filters">
        {(['all', 'pending', 'approved', 'active', 'suspended'] as const).map((status) => (
          <button
            type="button"
            key={status}
            className={`manager-filter-chip ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status === 'all' ? 'All tutors' : statusLabel(status)}
          </button>
        ))}
      </section>

      {/* Analytics Chart for Tutor Management */}
      <section className="mb-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 manager-panel flex flex-col justify-between">
          <div>
            <span className="manager-eyebrow">Pipeline Analytics</span>
            <h2 className="mb-4">Tutor Onboarding Funnel</h2>
          </div>
          <div className="flex items-end justify-between gap-3 h-32 px-4 mt-4">
            {[
              { label: 'Applied', value: 120, color: 'bg-white/20' },
              { label: 'Pending', value: 45, color: 'bg-amber-400/80' },
              { label: 'Approved', value: 30, color: 'bg-blue-400/80' },
              { label: 'Active', value: 25, color: 'bg-emerald-400/80' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full bg-white/5 rounded-t-md relative overflow-hidden flex-1 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(step.value / 120) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    className={`w-full rounded-t-md ${step.color} group-hover:brightness-110 transition-all`}
                  />
                </div>
                <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{step.label}</span>
                <span className="text-xs font-mono">{step.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="manager-panel flex flex-col justify-center items-center text-center">
          <span className="manager-eyebrow mb-2">Conversion Rate</span>
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className="text-emerald-400"
                strokeWidth="3"
                strokeDasharray="100, 100"
                stroke="currentColor"
                fill="none"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: "20.8, 100" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="text-xl font-bold">20.8%</span>
          </div>
          <p className="text-[10px] text-white/40 mt-3 uppercase tracking-widest">Active / Applied</p>
        </div>
      </section>

      <section className="manager-two-column">
        <div className="manager-panel manager-list-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Approval queue</span>
              <h2>Tutor list</h2>
            </div>
            <StatusPill tone="amber">{records.filter((tutor) => tutor.status === 'pending').length} pending</StatusPill>
          </div>

          <div className="manager-record-list">
            {filteredTutors.map((tutor) => (
              <article className={`manager-record-row ${selectedTutor?.id === tutor.id ? 'selected' : ''}`} key={tutor.id}>
                <button type="button" className="manager-record-main" onClick={() => setSelectedId(tutor.id)}>
                  <span className="manager-avatar">{tutor.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                  <span>
                    <strong>{tutor.name}</strong>
                    <small>{tutor.subject} - {tutor.city} - {tutor.nick}</small>
                  </span>
                </button>
                <div className="manager-record-actions">
                  <StatusPill tone={statusTone(tutor.status)}>{statusLabel(tutor.status)}</StatusPill>
                  <ManagerActionButton icon={Eye} variant="quiet" onClick={() => setSelectedId(tutor.id)}>
                    View details
                  </ManagerActionButton>
                  {renderPrimaryAction(tutor)}
                  {(tutor.status === 'pending' || tutor.status === 'approved') && (
                    <ManagerActionButton
                      icon={UserX}
                      variant="danger"
                      onClick={() => requestStatusChange(rejectAction(tutor))}
                    >
                      Reject
                    </ManagerActionButton>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {selectedTutor && (
          <aside className="manager-panel manager-detail-panel">
            <div className="manager-detail-head">
              <div>
                <span className="manager-eyebrow">Tutor detail</span>
                <h2>{selectedTutor.name}</h2>
                <p>{selectedTutor.profile}</p>
              </div>
              <StatusPill tone={statusTone(selectedTutor.status)}>{statusLabel(selectedTutor.status)}</StatusPill>
            </div>

            <div className="manager-metric-grid">
              <div><strong>{selectedTutor.rating.toFixed(1)}</strong><span>Rating</span></div>
              <div><strong>{selectedTutor.students}</strong><span>Students</span></div>
              <div><strong>{selectedTutor.completionRate}%</strong><span>Completion</span></div>
              <div><strong>{selectedTutor.cancellationRate}%</strong><span>Cancel rate</span></div>
            </div>

            <div className="manager-detail-section">
              <h3>Certificates</h3>
              <div className="manager-certificate-list">
                {selectedTutor.certificates.map((certificate) => (
                  <div className="manager-certificate" key={certificate.name}>
                    <div>
                      <strong>{certificate.name}</strong>
                      <small>Uploaded {certificate.uploadedAt}</small>
                    </div>
                    {certificate.verified ? (
                      <StatusPill tone="green">Verified</StatusPill>
                    ) : (
                      <ManagerActionButton
                        icon={FileCheck2}
                        variant="primary"
                        onClick={() => verifyCertificate(selectedTutor.id, certificate.name)}
                      >
                        Verify
                      </ManagerActionButton>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="manager-detail-section">
              <h3>Next step suggestion</h3>
              <p className="manager-suggestion">{selectedTutor.nextStep}</p>
              {selectedTutor.riskNote && <p className="manager-risk-note">{selectedTutor.riskNote}</p>}
            </div>

            <div className="manager-detail-section">
              <h3>Tutor lifecycle</h3>
              <div className="manager-state-ladder">
                {(['pending', 'approved', 'active', 'suspended'] as TutorStatus[]).map((status) => (
                  <span key={status} className={selectedTutor.status === status ? 'active' : ''}>{statusLabel(status)}</span>
                ))}
              </div>
            </div>

            <div className="manager-detail-actions">
              {renderPrimaryAction(selectedTutor)}
              {(selectedTutor.status === 'pending' || selectedTutor.status === 'approved') && (
                <ManagerActionButton icon={UserX} variant="danger" onClick={() => requestStatusChange(rejectAction(selectedTutor))}>
                  Reject
                </ManagerActionButton>
              )}
              <ManagerActionButton
                variant="quiet"
                onClick={() => setNotice(`${selectedTutor.name}: details shared with Booking Monitoring so manager can inspect affected sessions.`)}
              >
                Send to booking monitor
              </ManagerActionButton>
            </div>
          </aside>
        )}
      </section>

      <DecisionDialog
        open={Boolean(pendingAction)}
        title={pendingAction?.label ?? 'Confirm tutor action'}
        description={pendingAction?.description ?? 'Review this action before applying it to the tutor lifecycle.'}
        confirmLabel="Confirm action"
        onClose={() => setPendingAction(null)}
        onConfirm={() => {
          if (!pendingAction) return;
          if (pendingAction.nextStatus) {
            updateTutorStatus(pendingAction.tutorId, pendingAction.nextStatus);
          } else {
            setRecords((current) => current.filter((tutor) => tutor.id !== pendingAction.tutorId));
            setSelectedId((current) => (current === pendingAction.tutorId ? records.find((tutor) => tutor.id !== pendingAction.tutorId)?.id ?? '' : current));
            setNotice('Tutor application rejected. The applicant receives a reason, re-apply checklist, and support channel.');
          }
        }}
      />
    </motion.div>
  );
}
