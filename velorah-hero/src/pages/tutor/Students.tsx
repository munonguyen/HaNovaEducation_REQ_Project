import { useState } from 'react';
import {
  BookOpenCheck,
  CalendarDays,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
  UserPlus,
  UsersRound,
} from 'lucide-react';
import { motion } from 'framer-motion';

const initialStudents = [
  {
    id: 's1',
    name: 'Lan Anh',
    activePlan: 'Grade 12 Math Sprint',
    nextSession: 'Today, 10:30',
    progress: 62,
    history: ['Solved 18 integral problems', 'Needs more work on substitutions', 'Parent requested weekly progress note'],
    notes: 'Strong motivation. Keep examples close to Vietnam national exam structure.',
  },
  {
    id: 's2',
    name: 'Minh Quan',
    activePlan: 'IELTS Writing Band 6.5',
    nextSession: 'Fri, 08:00',
    progress: 48,
    history: ['Task response improved', 'Grammar errors still repeated', 'Submitted essay 4/5 on time'],
    notes: 'Prefers direct examples and short homework cycles.',
  },
  {
    id: 's3',
    name: 'Gia Bao',
    activePlan: 'Physics Core Repair',
    nextSession: 'Today, 14:00',
    progress: 54,
    history: ['Good at formulas', 'Needs conceptual explanation', 'Paid by VNPay'],
    notes: 'Use diagrams before equations. Parent wants offline sessions twice a month.',
  },
  {
    id: 's4',
    name: 'Bao Chau',
    activePlan: 'IELTS Speaking Routine',
    nextSession: 'No confirmed session',
    progress: 36,
    history: ['Cancelled latest session', 'Replacement slot suggested', 'Reminder preference: Zalo + email'],
    notes: 'Confidence is the main blocker. Keep warm-up short and predictable.',
  },
];

const initialGroups = [
  { name: 'Group A3', members: '6 members', next: 'Today, 19:30', plan: 'Entrance Exam Roadmap' },
  { name: 'IELTS Evening', members: '4 members', next: 'Thu, 20:00', plan: 'Speaking Routine' },
  { name: 'Math 12 Weekend', members: '8 members', next: 'Sat, 08:30', plan: 'Problem Solving Sprint' },
];

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [groups, setGroups] = useState(initialGroups);
  const [selected, setSelected] = useState(students[0]);
  const [feedback, setFeedback] = useState('Student and group workspace is synced with lessons, plans, progress, and notes.');

  const addStudent = () => {
    const newStudent = {
      id: `s${students.length + 1}`,
      name: 'New Student',
      activePlan: 'Needs plan assignment',
      nextSession: 'No confirmed session',
      progress: 0,
      history: ['Student profile created from tutor workspace'],
      notes: 'Add notes after the first diagnostic lesson.',
    };
    setStudents((current) => [newStudent, ...current]);
    setSelected(newStudent);
    setFeedback('New student profile created. Assign a plan or schedule a diagnostic lesson.');
  };

  const createGroup = () => {
    const newGroup = { name: `New Group ${groups.length + 1}`, members: '0 members', next: 'No session yet', plan: 'Needs roadmap' };
    setGroups((current) => [newGroup, ...current]);
    setFeedback('New group created. Add members, assign a plan, then schedule the first session.');
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
          <span className="tutor-eyebrow"><UsersRound size={16} /> UC-08 students and groups</span>
          <h1 className="tutor-page-title">Students / Groups</h1>
          <p className="tutor-page-subtitle">
            Keep student progress, lesson history, study plan assignment, notes, and group sessions in one place.
          </p>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn" onClick={addStudent}><UserPlus size={16} /> Add student</button>
          <button className="tutor-btn primary" onClick={createGroup}><Plus size={16} /> Create group</button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><UsersRound size={19} /></div>
        <div>
          <strong>Students action status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <section className="tutor-card" style={{ padding: 22 }}>
        <div className="group-strip">
          {groups.map((group) => (
            <article className="group-card" key={group.name}>
              <strong>{group.name}</strong>
              <span>{group.members} - {group.plan}</span>
              <div className="session-meta" style={{ marginTop: 12 }}>
                <span><CalendarDays size={13} style={{ display: 'inline', marginRight: 4 }} /> {group.next}</span>
              </div>
              <div className="request-actions">
                <button className="compact-btn primary" onClick={() => setFeedback(`${group.name}: group session assigned and reminders queued.`)}>Assign session</button>
                <button className="compact-btn" onClick={() => setFeedback(`${group.name}: member management panel opened.`)}>Members</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="students-layout">
        <section className="student-grid">
          {students.map((student) => (
            <button
              className={`student-card${selected.id === student.id ? ' is-selected' : ''}`}
              key={student.id}
              onClick={() => setSelected(student)}
            >
              <div className="student-card-head">
                <div className="request-person">
                  <div className="avatar-initial">{student.name.split(' ').map((part) => part[0]).join('')}</div>
                  <div>
                    <h3>{student.name}</h3>
                    <p>{student.activePlan}</p>
                  </div>
                </div>
                <span className="tutor-chip info">{student.progress}%</span>
              </div>
              <div className="student-facts">
                <div className="student-fact">
                  <span>Next session</span>
                  <strong>{student.nextSession}</strong>
                </div>
                <div className="student-fact">
                  <span>Active plan</span>
                  <strong>{student.activePlan}</strong>
                </div>
              </div>
              <div className="progress-bar" aria-label={`${student.progress}% progress`}>
                <span style={{ width: `${student.progress}%` }} />
              </div>
            </button>
          ))}
        </section>

        <aside className="tutor-card student-detail">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">{selected.name}</h2>
              <p className="tutor-section-copy">Student detail, progress, history, and tutor notes.</p>
            </div>
            <span className="tutor-chip success">Active</span>
          </div>

          <div className="detail-body">
            <div className="student-facts">
              <div className="student-fact">
                <span>Progress</span>
                <strong>{selected.progress}%</strong>
              </div>
              <div className="student-fact">
                <span>Next session</span>
                <strong>{selected.nextSession}</strong>
              </div>
            </div>

            <div className="progress-bar" aria-label={`${selected.progress}% complete`}>
              <span style={{ width: `${selected.progress}%` }} />
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 className="notification-group-title"><TrendingUp size={16} /> Recent progress</h3>
              <div className="student-history">
                {selected.history.map((item) => (
                  <div className="notification-item" key={item}>
                    <div className="tutor-soft-icon"><BookOpenCheck size={16} /></div>
                    <div>
                      <strong>{item}</strong>
                      <span>Updated from latest lesson note</span>
                    </div>
                    <span className="tutor-chip">Note</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 className="notification-group-title"><FileText size={16} /> Tutor notes</h3>
              <div className="notes-box">{selected.notes}</div>
            </div>

            <div className="request-actions">
              <button className="compact-btn primary" onClick={() => setFeedback(`${selected.name}: message composer opened.`)}><MessageSquare size={14} /> Message</button>
              <button className="compact-btn" onClick={() => setFeedback(`${selected.name}: active study plan assignment started.`)}>Assign plan</button>
              <button className="compact-btn" onClick={() => setFeedback(`${selected.name}: lesson scheduling flow opened with conflict check.`)}>Schedule lesson</button>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
