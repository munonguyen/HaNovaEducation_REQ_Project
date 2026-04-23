import { useState } from 'react';
import {
  BookMarked,
  CheckCircle2,
  ClipboardList,
  Edit3,
  FileText,
  GraduationCap,
  Plus,
  Send,
  Target,
} from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  { id: 'p1', student: 'Lan Anh', title: 'Grade 12 Math Sprint', progress: 62, sessions: 12, next: 'Integrals checkpoint' },
  { id: 'p2', student: 'Minh Quan', title: 'IELTS Writing Band 6.5', progress: 48, sessions: 10, next: 'Coherence drills' },
  { id: 'p3', student: 'Group A3', title: 'Entrance Exam Roadmap', progress: 35, sessions: 18, next: 'Mixed problem set' },
];

const phases = [
  {
    title: 'Diagnostic and goal setting',
    copy: 'Review current level, define target score, and choose the right lesson cadence.',
    sessions: '2 sessions',
    tasks: 'Baseline quiz, parent note',
    material: 'Diagnostic worksheet',
    status: 'Done',
  },
  {
    title: 'Core concept repair',
    copy: 'Close gaps in algebra manipulation and integral setup before timed practice.',
    sessions: '5 sessions',
    tasks: 'Weekly problem log',
    material: 'Chapter summary pack',
    status: 'Active',
  },
  {
    title: 'Exam simulation',
    copy: 'Run timed lessons with quick feedback and targeted homework after each session.',
    sessions: '4 sessions',
    tasks: 'Mock tests, review notes',
    material: 'Past exam bank',
    status: 'Planned',
  },
  {
    title: 'Final mentoring review',
    copy: 'Stabilize confidence, prepare day-before routine, and hand off a self-study plan.',
    sessions: '1 session',
    tasks: 'Checklist, reflection',
    material: 'Final review sheet',
    status: 'Planned',
  },
];

export default function StudyPlans() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <motion.div
      className="tutor-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><GraduationCap size={16} /> UC-07 study planning</span>
          <h1 className="tutor-page-title">Study Plans</h1>
          <p className="tutor-page-subtitle">
            Create, edit, and assign structured learning roadmaps with phases, sessions, tasks, and materials.
          </p>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn"><Send size={16} /> Assign to student</button>
          <button className="tutor-btn primary"><Plus size={16} /> Create plan</button>
        </div>
      </div>

      <div className="plans-layout">
        <aside className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Active Plans</h2>
              <p className="tutor-section-copy">Pick a student plan to edit its roadmap.</p>
            </div>
          </div>
          <div className="plan-list">
            {plans.map((plan) => (
              <button
                className={`plan-item${selectedPlan.id === plan.id ? ' is-active' : ''}`}
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
              >
                <strong>{plan.title}</strong>
                <span>{plan.student} - {plan.sessions} planned sessions</span>
                <div className="progress-bar" aria-label={`${plan.progress}% complete`}>
                  <span style={{ width: `${plan.progress}%` }} />
                </div>
                <span>Next: {plan.next}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="tutor-card roadmap">
          <div className="roadmap-header">
            <div>
              <span className="tutor-chip indigo">{selectedPlan.student}</span>
              <h2 className="tutor-section-title" style={{ marginTop: 12 }}>{selectedPlan.title}</h2>
              <p className="tutor-section-copy">Timeline view for mentoring flow, lesson planning, and homework follow-up.</p>
            </div>
            <div className="tutor-actions">
              <button className="tutor-btn"><Edit3 size={16} /> Edit plan</button>
              <button className="tutor-btn"><ClipboardList size={16} /> Add task</button>
            </div>
          </div>

          <div className="phase-list">
            {phases.map((phase, index) => (
              <article className="phase-step" key={phase.title}>
                <div className="phase-index">{index + 1}</div>
                <div>
                  <h3>{phase.title}</h3>
                  <p>{phase.copy}</p>
                  <div className="phase-tags">
                    <span className="tutor-chip info">{phase.sessions}</span>
                    <span className="tutor-chip"><Target size={13} /> {phase.tasks}</span>
                    <span className="tutor-chip"><BookMarked size={13} /> {phase.material}</span>
                  </div>
                </div>
                <span className={`tutor-chip ${phase.status === 'Done' ? 'success' : phase.status === 'Active' ? 'info' : ''}`}>
                  {phase.status === 'Done' && <CheckCircle2 size={13} />}
                  {phase.status}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="schedule-side-grid">
        <div className="side-note">
          <div className="tutor-soft-icon"><Plus size={18} /></div>
          <strong style={{ marginTop: 12 }}>Create plan</strong>
          <p>Start from a goal, subject, exam date, and expected number of mentoring sessions.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon green"><Send size={18} /></div>
          <strong style={{ marginTop: 12 }}>Assign plan</strong>
          <p>Assign to one student or a group, then sync sessions to the lesson list.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon amber"><FileText size={18} /></div>
          <strong style={{ marginTop: 12 }}>Materials</strong>
          <p>Attach worksheets, links, notes, and homework tasks to each phase.</p>
        </div>
      </div>
    </motion.div>
  );
}
