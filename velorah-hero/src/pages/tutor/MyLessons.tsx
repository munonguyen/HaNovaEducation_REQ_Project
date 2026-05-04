import { useMemo, useState } from 'react';
import {
  Ban,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  MoreHorizontal,
  PencilLine,
  RefreshCw,
  Search,
  Video,
} from 'lucide-react';
import { motion } from 'framer-motion';

type LessonStatus = 'upcoming' | 'completed' | 'cancelled';
type LessonMode = 'Online' | 'Offline';

interface Lesson {
  id: string;
  student: string;
  subject: string;
  time: string;
  mode: LessonMode;
  status: LessonStatus;
  payment: string;
  note: string;
  locked: boolean;
}

const initialLessons: Lesson[] = [
  {
    id: 'l1',
    student: 'Lan Anh',
    subject: 'Grade 12 Math - Integrals',
    time: 'Today, 10:30-12:00',
    mode: 'Online',
    status: 'upcoming',
    payment: 'Paid via VNPay',
    note: 'Review substitution method and keep 10 minutes for homework planning.',
    locked: false,
  },
  {
    id: 'l2',
    student: 'Gia Bao',
    subject: 'Physics - Electric field',
    time: 'Today, 14:00-15:30',
    mode: 'Offline',
    status: 'upcoming',
    payment: 'MoMo hold verified',
    note: 'Bring printed field diagram examples.',
    locked: false,
  },
  {
    id: 'l3',
    student: 'Group A3',
    subject: 'University entrance review',
    time: 'Today, 19:30-21:00',
    mode: 'Online',
    status: 'upcoming',
    payment: 'Group payment complete',
    note: 'Quick quiz at the start. Assign phase 2 practice after class.',
    locked: true,
  },
  {
    id: 'l4',
    student: 'Minh Quan',
    subject: 'IELTS Writing Task 2',
    time: 'Yesterday, 08:00-09:00',
    mode: 'Online',
    status: 'completed',
    payment: 'Paid via MoMo',
    note: 'Completed. Essay score moved from 6.0 to 6.5 target band.',
    locked: true,
  },
  {
    id: 'l5',
    student: 'Bao Chau',
    subject: 'IELTS Speaking',
    time: 'Mon 20 Apr, 20:00-21:00',
    mode: 'Online',
    status: 'cancelled',
    payment: 'Refund queued',
    note: 'Student cancelled before 24h window. Slot returned to availability.',
    locked: true,
  },
];

const tabs: { label: string; value: LessonStatus }[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function MyLessons() {
  const [activeTab, setActiveTab] = useState<LessonStatus>('upcoming');
  const [query, setQuery] = useState('');
  const [lessons, setLessons] = useState(initialLessons);
  const [feedback, setFeedback] = useState('Lesson list is synced with booking requests, payment status, and reminders.');

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesTab = lesson.status === activeTab;
      const haystack = `${lesson.student} ${lesson.subject}`.toLowerCase();
      return matchesTab && haystack.includes(query.toLowerCase());
    });
  }, [activeTab, lessons, query]);

  const lessonCounts = useMemo(() => {
    return {
      upcoming: lessons.filter((lesson) => lesson.status === 'upcoming').length,
      completed: lessons.filter((lesson) => lesson.status === 'completed').length,
      cancelled: lessons.filter((lesson) => lesson.status === 'cancelled').length,
    };
  }, [lessons]);

  const updateLesson = (id: string, update: Partial<Lesson>) => {
    setLessons((current) => current.map((lesson) => (lesson.id === id ? { ...lesson, ...update } : lesson)));
  };

  const markNextCompleted = () => {
    const nextLesson = lessons.find((lesson) => lesson.status === 'upcoming' && !lesson.locked) ?? lessons.find((lesson) => lesson.status === 'upcoming');
    if (!nextLesson) {
      setFeedback('No upcoming lessons available to mark completed.');
      return;
    }
    updateLesson(nextLesson.id, {
      status: 'completed',
      locked: true,
      note: 'Completed from tutor workspace. Notes are ready for student review and study plan follow-up.',
    });
    setFeedback(`${nextLesson.student}: lesson marked completed and notes are ready for the student.`);
    setActiveTab('completed');
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
          <span className="tutor-eyebrow"><BookOpenCheck size={16} /> Lesson management</span>
          <h1 className="tutor-page-title">My Lessons</h1>
          <p className="tutor-page-subtitle">
            Manage upcoming, completed, and cancelled sessions with payment state, reschedule rules, and quick notes.
          </p>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn" onClick={() => { setLessons(initialLessons); setFeedback('Lessons re-synced from schedule.'); }}><RefreshCw size={16} /> Sync lessons</button>
          <button className="tutor-btn primary" onClick={markNextCompleted}><CheckCircle2 size={16} /> Mark completed</button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><CheckCircle2 size={19} /></div>
        <div>
          <strong>Lesson action status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <div className="lesson-toolbar">
        <div className="tab-bar" aria-label="Lesson tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`tab-button${activeTab === tab.value ? ' is-active' : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label} {lessonCounts[tab.value]}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search student or subject..."
          />
        </label>
      </div>

      <section className="lesson-grid">
        {filteredLessons.map((lesson) => {
          const isUpcoming = lesson.status === 'upcoming';
          const paymentChip = lesson.payment.includes('Refund') ? 'warning' : 'success';
          return (
            <article className="lesson-card" key={lesson.id}>
              <div className="lesson-card-head">
                <div>
                  <h3>{lesson.student}</h3>
                  <p>{lesson.subject}</p>
                </div>
                <button className="compact-btn" aria-label="More actions" onClick={() => setFeedback(`${lesson.student}: action menu opened for lesson rules and payment-safe actions.`)}><MoreHorizontal size={16} /></button>
              </div>

              <div className="lesson-meta-grid">
                <div className="lesson-meta-item"><CalendarClock size={15} /> {lesson.time}</div>
                <div className="lesson-meta-item">{lesson.mode === 'Online' ? <Video size={15} /> : <MapPin size={15} />} {lesson.mode}</div>
                <div className="lesson-meta-item"><CreditCard size={15} /> {lesson.payment}</div>
                <div className="lesson-meta-item"><Clock size={15} /> 24h reminder on</div>
              </div>

              <div className="inline-note">
                <PencilLine size={15} />
                <span>{lesson.note}</span>
              </div>

              <div className="lesson-actions">
                {isUpcoming ? (
                  <>
                    <button
                      className="compact-btn primary"
                      onClick={() => setFeedback(`${lesson.student}: ${lesson.mode === 'Online' ? 'online room opened' : 'offline lesson details opened'}.`)}
                    >
                      {lesson.mode === 'Online' ? 'Enter session' : 'Open details'}
                    </button>
	                    <button
	                      className="compact-btn"
	                      disabled={lesson.locked}
	                      onClick={() => {
	                        updateLesson(lesson.id, {
	                          time: 'Suggested: Thu 23 Apr, 18:00-19:30',
	                          note: 'Reschedule suggestion sent. Original slot stays locked until the student confirms.',
	                        });
	                        setFeedback(`${lesson.student}: reschedule suggestion sent and original slot remains locked.`);
	                      }}
                    >
                      Reschedule
                    </button>
	                    <button
	                      className="compact-btn danger"
	                      disabled={lesson.locked}
	                      onClick={() => {
	                        updateLesson(lesson.id, {
	                          status: 'cancelled',
	                          payment: 'Refund queued',
	                          note: 'Cancelled by tutor. Slot returned to availability and notification sent to student.',
	                          locked: true,
	                        });
	                        setFeedback(`${lesson.student}: lesson cancelled, slot reopened, refund/notification queued.`);
	                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : lesson.status === 'completed' ? (
                  <>
                    <button className="compact-btn primary" onClick={() => setFeedback(`${lesson.student}: completed lesson notes opened.`)}>View notes</button>
                    <button className="compact-btn" onClick={() => setFeedback(`${lesson.student}: follow-up task assigned to active study plan.`)}>Assign task</button>
                    <button className="compact-btn" disabled><Ban size={14} /> Cannot cancel</button>
                  </>
                ) : (
                  <>
                    <button className="compact-btn primary" onClick={() => setFeedback(`${lesson.student}: replacement availability slot created from cancelled lesson.`)}>Create replacement slot</button>
                    <button className="compact-btn" disabled><Ban size={14} /> Payment locked</button>
                  </>
                )}
                <span className={`tutor-chip ${paymentChip}`}>{lesson.payment}</span>
              </div>
            </article>
          );
        })}
      </section>

      {filteredLessons.length === 0 && (
        <section className="tutor-card" style={{ padding: 32, textAlign: 'center' }}>
          <div className="tutor-soft-icon" style={{ margin: '0 auto 14px' }}><BookOpenCheck size={18} /></div>
          <h2 className="tutor-section-title">No lessons found</h2>
          <p className="tutor-section-copy">Try a different tab or search term.</p>
        </section>
      )}
    </motion.div>
  );
}
