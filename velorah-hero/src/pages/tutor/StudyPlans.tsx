import { useState } from 'react';
import {
  BookMarked,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Plus,
  Save,
  Send,
  Target,
  Trash2,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialPlans = [
  { id: 'p1', student: 'Lan Anh', title: 'Grade 12 Math Sprint', progress: 62, sessions: 12, next: 'Integrals checkpoint' },
  { id: 'p2', student: 'Minh Quan', title: 'IELTS Writing Band 6.5', progress: 48, sessions: 10, next: 'Coherence drills' },
  { id: 'p3', student: 'Group A3', title: 'Entrance Exam Roadmap', progress: 35, sessions: 18, next: 'Mixed problem set' },
];

const initialPhases = [
  {
    id: 'ph1',
    title: 'Diagnostic and goal setting',
    copy: 'Review current level, define target score, and choose the right lesson cadence.',
    sessions: '2 sessions',
    tasks: 'Baseline quiz, parent note',
    material: 'Diagnostic worksheet',
    status: 'Done',
  },
  {
    id: 'ph2',
    title: 'Core concept repair',
    copy: 'Close gaps in algebra manipulation and integral setup before timed practice.',
    sessions: '5 sessions',
    tasks: 'Weekly problem log',
    material: 'Chapter summary pack',
    status: 'Active',
  },
  {
    id: 'ph3',
    title: 'Exam simulation',
    copy: 'Run timed lessons with quick feedback and targeted homework after each session.',
    sessions: '4 sessions',
    tasks: 'Mock tests, review notes',
    material: 'Past exam bank',
    status: 'Planned',
  },
  {
    id: 'ph4',
    title: 'Final mentoring review',
    copy: 'Stabilize confidence, prepare day-before routine, and hand off a self-study plan.',
    sessions: '1 session',
    tasks: 'Checklist, reflection',
    material: 'Final review sheet',
    status: 'Planned',
  },
];

export default function StudyPlans() {
  const [plans, setPlans] = useState(initialPlans);
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlans[0].id);
  const [phases, setPhases] = useState(initialPhases);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', student: '' });
  const [feedback, setFeedback] = useState('Study plan roadmap is ready for editing, assignment, tasks, and materials.');

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[0];

  const handleCreatePlan = () => {
    const newId = `p${Date.now()}`;
    const newPlan = { 
      id: newId, 
      student: 'New Student', 
      title: 'New Mentoring Roadmap', 
      progress: 0, 
      sessions: 8, 
      next: 'Define diagnostic phase' 
    };
    setPlans([newPlan, ...plans]);
    setSelectedPlanId(newId);
    setIsEditing(true);
    setEditForm({ title: newPlan.title, student: newPlan.student });
    setFeedback('Draft created. Please enter the plan details and save.');
  };

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditForm({ title: selectedPlan.title, student: selectedPlan.student });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setPlans(current => current.map(p => 
      p.id === selectedPlanId ? { ...p, title: editForm.title, student: editForm.student } : p
    ));
    setIsEditing(false);
    setFeedback(`Changes to "${editForm.title}" have been saved and synced.`);
  };

  const handleDelete = (id: string) => {
    const nextPlans = plans.filter(p => p.id !== id);
    setPlans(nextPlans);
    if (id === selectedPlanId && nextPlans.length > 0) {
      setSelectedPlanId(nextPlans[0].id);
    }
    setFeedback('Study plan has been permanently removed from the workspace.');
  };

  const handleAddPhase = () => {
    const newPhase = {
      id: `ph${Date.now()}`,
      title: 'New Phase',
      copy: 'Describe the objectives and learning outcomes for this stage.',
      sessions: '0 sessions',
      tasks: 'None',
      material: 'None',
      status: 'Planned',
    };
    setPhases([...phases, newPhase]);
    setFeedback('New roadmap phase added. Configure the sessions and materials below.');
  };

  return (
    <motion.div
      className="tutor-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><GraduationCap size={16} /> Study planning</span>
          <h1 className="tutor-page-title">Study Plans</h1>
          <p className="tutor-page-subtitle">
            Create, edit, and assign structured learning roadmaps with phases, sessions, tasks, and materials.
          </p>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn" onClick={() => setFeedback(`${selectedPlan.title} assigned to ${selectedPlan.student}.`)}>
            <Send size={16} /> Assign to student
          </button>
          <button className="tutor-btn primary" onClick={handleCreatePlan}>
            <Plus size={16} /> Create plan
          </button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><CheckCircle2 size={19} /></div>
        <div>
          <strong>Study plan action status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <div className="plans-layout">
        <aside className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Active Plans</h2>
              <p className="tutor-section-copy">Pick a student plan to edit its roadmap.</p>
            </div>
          </div>
          <div className="plan-list">
            <AnimatePresence mode="popLayout">
              {plans.map((plan) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  key={plan.id}
                  className="relative group"
                >
                  <button
                    className={`plan-item${selectedPlanId === plan.id ? ' is-active' : ''}`}
                    onClick={() => { setSelectedPlanId(plan.id); setIsEditing(false); }}
                  >
                    <strong>{plan.title}</strong>
                    <span>{plan.student} - {plan.sessions} planned sessions</span>
                    <div className="progress-bar" aria-label={`${plan.progress}% complete`}>
                      <span style={{ width: `${plan.progress}%` }} />
                    </div>
                    <span>Next: {plan.next}</span>
                  </button>
                  <button 
                    className="absolute top-4 right-4 p-2 rounded-lg bg-rose-500/10 text-rose-400 opacity-0 group-hover:opacity-100 hover:bg-rose-500/20 transition-all"
                    onClick={(e) => { e.stopPropagation(); handleDelete(plan.id); }}
                    title="Delete plan"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </aside>

        <section className="tutor-card roadmap">
          <div className="roadmap-header">
            <div className="flex-1">
              {isEditing ? (
                <div className="flex flex-col gap-3 mb-4">
                  <input 
                    type="text" 
                    className="form-input text-lg font-serif !bg-white/5" 
                    value={editForm.title}
                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Plan Title"
                  />
                  <input 
                    type="text" 
                    className="form-input !bg-white/5" 
                    value={editForm.student}
                    onChange={e => setEditForm({ ...editForm, student: e.target.value })}
                    placeholder="Student Name"
                  />
                </div>
              ) : (
                <>
                  <span className="tutor-chip indigo">{selectedPlan.student}</span>
                  <h2 className="tutor-section-title" style={{ marginTop: 12 }}>{selectedPlan.title}</h2>
                </>
              )}
              <p className="tutor-section-copy">Timeline view for mentoring flow, lesson planning, and homework follow-up.</p>
            </div>
            <div className="tutor-actions">
              {isEditing ? (
                <>
                  <button className="tutor-btn primary" onClick={handleSave}><Save size={16} /> Save Changes</button>
                  <button className="tutor-btn" onClick={() => setIsEditing(false)}><X size={16} /> Cancel</button>
                </>
              ) : (
                <>
                  <button className="tutor-btn" onClick={handleEditToggle}><Edit3 size={16} /> Edit Details</button>
                  <button className="tutor-btn" onClick={handleAddPhase}><Plus size={16} /> Add Phase</button>
                </>
              )}
            </div>
          </div>

          <div className="phase-list">
            <AnimatePresence mode="popLayout">
              {phases.map((phase, index) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="phase-step group" 
                  key={phase.id}
                >
                  <div className="phase-index">{index + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3>{phase.title}</h3>
                      <button 
                        className="p-1.5 rounded-lg text-white/20 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => {
                          setPhases(current => current.filter(p => p.id !== phase.id));
                          setFeedback('Roadmap phase removed.');
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>

      <div className="schedule-side-grid">
        <div className="side-note">
          <div className="tutor-soft-icon"><Plus size={18} /></div>
          <strong style={{ marginTop: 12 }}>Create & Edit</strong>
          <p>Define clear objectives and edit student assignments as goals shift over time.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon green"><Send size={18} /></div>
          <strong style={{ marginTop: 12 }}>Assign roadmap</strong>
          <p>Once a plan is finalized, assign it to sync with the student's personal dashboard.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon amber"><Trash2 size={18} /></div>
          <strong style={{ marginTop: 12 }}>Manage lifecycle</strong>
          <p>Delete outdated plans or archive completed roadmaps to keep the workspace clean.</p>
        </div>
      </div>
    </motion.div>
  );
}
