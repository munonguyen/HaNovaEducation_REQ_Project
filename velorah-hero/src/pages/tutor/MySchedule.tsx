import React, { useRef, useState } from 'react';
import {
  AlertTriangle,
  BellRing,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CopyPlus,
  Edit3,
  FileUp,
  GripVertical,
  MessageSquare,
  Plus,
  Repeat,
  Save,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

const hours = Array.from({ length: 15 }, (_, i) => i + 7);
const days = [
  { label: 'Mon', date: '20 Apr' },
  { label: 'Tue', date: '21 Apr' },
  { label: 'Wed', date: '22 Apr' },
  { label: 'Thu', date: '23 Apr' },
  { label: 'Fri', date: '24 Apr' },
  { label: 'Sat', date: '25 Apr' },
  { label: 'Sun', date: '26 Apr' },
];

const studentDirectory = [
  { nick: '@lananh', name: 'Lan Anh' },
  { nick: '@minhquan', name: 'Minh Quan' },
  { nick: '@giabao', name: 'Gia Bao' },
  { nick: '@duchuy', name: 'Duc Huy' },
  { nick: '@baochau', name: 'Bao Chau' },
  { nick: '@group-a3', name: 'Group A3' },
];

const timeOptions = Array.from({ length: 31 }, (_, index) => {
  const totalMinutes = 7 * 60 + index * 30;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
});

type SlotType = 'available' | 'booked' | 'blocked' | 'conflict';
type LessonFormat = 'Online' | 'Offline' | 'Hybrid';
type LearningState = 'study' | 'leave';

type Slot = {
  type: SlotType;
  title: string;
  subject: string;
  startTime: string;
  endTime: string;
  format: LessonFormat;
  learningState: LearningState;
  leaveReason: string;
  students: string[];
  note: string;
  detail: string;
};

type SlotDraft = Slot & { dayIndex: number };

const initialSlotMap: Record<string, Slot> = {
  '0-8': {
    type: 'booked',
    title: 'Minh Quan',
    subject: 'IELTS Writing',
    startTime: '08:00',
    endTime: '09:30',
    format: 'Online',
    learningState: 'study',
    leaveReason: '',
    students: ['@minhquan'],
    note: 'Paid by MoMo',
    detail: 'IELTS Writing - Online - paid by MoMo',
  },
  '0-14': {
    type: 'available',
    title: 'Available',
    subject: 'Open tutoring slot',
    startTime: '14:00',
    endTime: '15:30',
    format: 'Online',
    learningState: 'study',
    leaveReason: '',
    students: [],
    note: 'Drag to extend until 16:00',
    detail: 'Drag to extend until 16:00',
  },
  '1-19': {
    type: 'available',
    title: 'Available',
    subject: 'Open tutoring slot',
    startTime: '19:00',
    endTime: '20:30',
    format: 'Online',
    learningState: 'study',
    leaveReason: '',
    students: [],
    note: 'Recurring Tue evening slot',
    detail: 'Recurring Tue evening slot',
  },
  '2-10': {
    type: 'booked',
    title: 'Lan Anh',
    subject: 'Grade 12 Math',
    startTime: '10:00',
    endTime: '11:30',
    format: 'Online',
    learningState: 'study',
    leaveReason: '',
    students: ['@lananh'],
    note: 'VNPay confirmed',
    detail: 'Grade 12 Math - VNPay confirmed',
  },
  '2-11': {
    type: 'conflict',
    title: 'Overlap risk',
    subject: 'Trial booking',
    startTime: '11:00',
    endTime: '12:30',
    format: 'Online',
    learningState: 'study',
    leaveReason: '',
    students: ['@lananh'],
    note: 'Overlaps with Lan Anh by 15 minutes',
    detail: 'Trial booking overlaps with Lan Anh by 15 minutes',
  },
  '3-18': {
    type: 'available',
    title: 'Available',
    subject: 'Open tutoring slot',
    startTime: '18:00',
    endTime: '19:30',
    format: 'Hybrid',
    learningState: 'study',
    leaveReason: '',
    students: [],
    note: 'Best-fit suggestion from demand data',
    detail: 'Best-fit suggestion from demand data',
  },
  '4-9': {
    type: 'blocked',
    title: 'Blocked',
    subject: 'School meeting',
    startTime: '09:00',
    endTime: '10:30',
    format: 'Offline',
    learningState: 'leave',
    leaveReason: 'School meeting, unavailable',
    students: [],
    note: 'School meeting, unavailable',
    detail: 'School meeting, unavailable',
  },
  '4-19': {
    type: 'available',
    title: 'Available',
    subject: 'Open tutoring slot',
    startTime: '19:00',
    endTime: '20:30',
    format: 'Online',
    learningState: 'study',
    leaveReason: '',
    students: [],
    note: 'Recurring Friday evening slot',
    detail: 'Recurring Friday evening slot',
  },
  '5-9': {
    type: 'booked',
    title: 'Duc Huy',
    subject: 'SAT Math trial',
    startTime: '09:00',
    endTime: '10:30',
    format: 'Online',
    learningState: 'study',
    leaveReason: '',
    students: ['@duchuy'],
    note: 'Pending payment hold',
    detail: 'SAT Math trial - pending payment hold',
  },
  '6-15': {
    type: 'blocked',
    title: 'Blocked',
    subject: 'Personal time',
    startTime: '15:00',
    endTime: '16:30',
    format: 'Offline',
    learningState: 'leave',
    leaveReason: 'Personal time',
    students: [],
    note: 'Personal time',
    detail: 'Personal time',
  },
};

export default function MySchedule() {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const slotsRef = useRef(initialSlotMap);
  const [slots, setSlots] = useState(initialSlotMap);
  const [editingSlotKey, setEditingSlotKey] = useState<string | null>(null);
  const [draft, setDraft] = useState<SlotDraft | null>(null);
  const [feedback, setFeedback] = useState('Calendar is conflict-checked. Booked slots are locked and available slots are visible to students.');

  const weekLabel = weekOffset === 0 ? 'April 20-26, 2026' : weekOffset > 0 ? `Week +${weekOffset}` : `Week ${weekOffset}`;

  const describeSlot = (key: string, slot = slotsRef.current[key]) => {
    const [dayIndex, hour] = key.split('-').map(Number);
    const start = slot?.startTime ?? `${String(hour).padStart(2, '0')}:00`;
    const end = slot?.endTime ?? `${String(hour + 1).padStart(2, '0')}:30`;
    return `${days[dayIndex]?.label ?? 'Day'} ${start}-${end}`;
  };

  const parseHourFromTime = (time: string) => Number(time.split(':')[0]);

  const addMinutes = (time: string, minutes: number) => {
    const [hour, minute] = time.split(':').map(Number);
    const total = hour * 60 + minute + minutes;
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  };

  const composeSlotDetail = (slot: Slot) => {
    if (slot.learningState === 'leave') {
      return `Nghỉ học - ${slot.leaveReason || 'Chưa nhập lý do'}`;
    }

    const tagged = slot.students.length ? ` - ${slot.students.join(', ')}` : '';
    const note = slot.note ? ` - ${slot.note}` : '';
    return `${slot.subject} - ${slot.format}${tagged}${note}`;
  };

  const createDraft = (slotKey: string, slot?: Slot): SlotDraft => {
    const [dayIndex, hour] = slotKey.split('-').map(Number);
    const startTime = `${String(hour).padStart(2, '0')}:00`;
    return {
      dayIndex,
      type: slot?.type ?? 'available',
      title: slot?.title ?? 'Available',
      subject: slot?.subject ?? 'Open tutoring slot',
      startTime: slot?.startTime ?? startTime,
      endTime: slot?.endTime ?? addMinutes(startTime, 90),
      format: slot?.format ?? 'Online',
      learningState: slot?.learningState ?? 'study',
      leaveReason: slot?.leaveReason ?? '',
      students: slot?.students ?? [],
      note: slot?.note ?? 'Created manually from tutor workspace',
      detail: slot?.detail ?? 'Created manually from tutor workspace',
    };
  };

  const openSlotEditor = (slotKey: string, slot?: Slot) => {
    setEditingSlotKey(slot ? slotKey : null);
    setDraft(createDraft(slotKey, slot));
    setFeedback(slot ? `${describeSlot(slotKey, slot)} opened for editing.` : `${describeSlot(slotKey)} ready for a new slot.`);
  };

  const updateDraft = (patch: Partial<SlotDraft>) => {
    setDraft((current) => (current ? { ...current, ...patch } : current));
  };

  const toggleStudent = (nick: string) => {
    setDraft((current) => {
      if (!current) return current;
      const students = current.students.includes(nick)
        ? current.students.filter((item) => item !== nick)
        : [...current.students, nick];
      const firstStudent = studentDirectory.find((student) => student.nick === students[0]);
      return {
        ...current,
        students,
        title: current.type === 'booked' && firstStudent ? firstStudent.name : current.title,
      };
    });
  };

  const saveDraft = (notify = false) => {
    if (!draft) return;

    const normalizedSlot: Slot = {
      ...draft,
      type: draft.learningState === 'leave' ? 'blocked' : draft.type,
      title: draft.learningState === 'leave' ? 'Nghỉ học' : draft.title.trim() || 'Available',
      subject: draft.subject.trim() || 'Open tutoring slot',
      leaveReason: draft.learningState === 'leave' ? draft.leaveReason.trim() : '',
      note: draft.note.trim(),
      detail: '',
    };
    normalizedSlot.detail = composeSlotDetail(normalizedSlot);

    const targetKey = `${draft.dayIndex}-${parseHourFromTime(draft.startTime)}`;
    const nextSlots = { ...slotsRef.current };

    if (editingSlotKey && editingSlotKey !== targetKey) {
      delete nextSlots[editingSlotKey];
    }

    if (!editingSlotKey && nextSlots[targetKey]) {
      setFeedback(`${describeSlot(targetKey)} already has a slot. Open that slot to edit instead.`);
      return;
    }

    if (editingSlotKey && editingSlotKey !== targetKey && nextSlots[targetKey]) {
      setFeedback(`${describeSlot(targetKey)} already has another slot. Choose a free time first.`);
      return;
    }

    nextSlots[targetKey] = normalizedSlot;
    slotsRef.current = nextSlots;
    setSlots(nextSlots);
    setEditingSlotKey(targetKey);
    setDraft({ ...normalizedSlot, dayIndex: draft.dayIndex });

    const taggedStudents = normalizedSlot.students.length ? normalizedSlot.students.join(', ') : 'no tagged students';
    const leaveCopy = normalizedSlot.learningState === 'leave' ? ` Leave reason: ${normalizedSlot.leaveReason || 'Not specified'}.` : '';
    setFeedback(
      notify
        ? `${describeSlot(targetKey, normalizedSlot)} saved and notification queued for ${taggedStudents}.${leaveCopy}`
        : `${describeSlot(targetKey, normalizedSlot)} saved. Tagged: ${taggedStudents}.`,
    );
  };

  const findNextEmptySlot = (currentSlots: Record<string, Slot>) => {
    for (const dayIndex of [1, 3, 0, 2, 4, 5, 6]) {
      for (const hour of [18, 19, 17, 20, 14, 15, 16, 8, 9, 10, 11, 12, 13, 21, 7]) {
        const key = `${dayIndex}-${hour}`;
        if (!currentSlots[key]) return key;
      }
    }
    return '';
  };

  const buildSlotsWithAvailability = (
    currentSlots: Record<string, Slot>,
    requests: Array<{ key?: string; detail: string }>,
  ) => {
    const nextSlots = { ...currentSlots };
    const addedKeys: string[] = [];

    requests.forEach(({ key: preferredKey, detail }) => {
      const key = preferredKey && !nextSlots[preferredKey] ? preferredKey : findNextEmptySlot(nextSlots);
      if (!key) return;
      const [, hour] = key.split('-').map(Number);
      const startTime = `${String(hour).padStart(2, '0')}:00`;
      nextSlots[key] = {
        type: 'available',
        title: 'Available',
        subject: 'Open tutoring slot',
        startTime,
        endTime: addMinutes(startTime, 90),
        format: 'Online',
        learningState: 'study',
        leaveReason: '',
        students: [],
        note: detail,
        detail,
      };
      addedKeys.push(key);
    });

    return { nextSlots, addedKeys };
  };

  const addAvailability = (preferredKey?: string, detail = 'Created manually from tutor workspace') => {
    const { nextSlots, addedKeys } = buildSlotsWithAvailability(slotsRef.current, [{ key: preferredKey, detail }]);
    if (!addedKeys.length) {
      setFeedback('No empty slot is available in this calendar range.');
      return;
    }
    slotsRef.current = nextSlots;
    setSlots(nextSlots);
    setEditingSlotKey(addedKeys[0]);
    setDraft(createDraft(addedKeys[0], nextSlots[addedKeys[0]]));
    setFeedback(`Availability added at ${describeSlot(addedKeys[0])}. Student booking search will update in real time.`);
  };

  const addAvailabilityBatch = (requests: Array<{ key?: string; detail: string }>, label: string) => {
    const { nextSlots, addedKeys } = buildSlotsWithAvailability(slotsRef.current, requests);
    if (!addedKeys.length) {
      setFeedback(`${label} could not add a new slot because this calendar range is full.`);
      return;
    }
    slotsRef.current = nextSlots;
    setSlots(nextSlots);
    setFeedback(`${label}: ${addedKeys.map((key) => describeSlot(key)).join(', ')} are now open and synced to student booking search.`);
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
          <span className="tutor-eyebrow"><CalendarRange size={16} /> Core scheduling</span>
          <h1 className="tutor-page-title">My Schedule</h1>
          <p className="tutor-page-subtitle">
            Weekly availability is the source of truth for bookings. Slots sync in real time to prevent double booking.
          </p>
        </div>
        <div className="tutor-actions">
          <button
            className="tutor-btn"
            onClick={() => addAvailabilityBatch([
              { key: '1-17', detail: 'Bulk-uploaded slot' },
              { key: '3-20', detail: 'Bulk-uploaded evening slot' },
            ], 'Bulk availability uploaded')}
          >
            <FileUp size={16} /> Bulk upload
          </button>
          <button
            className="tutor-btn"
            onClick={() => addAvailabilityBatch([
              { key: '1-18', detail: 'Recurring Tue evening slot' },
              { key: '4-18', detail: 'Recurring Friday evening slot' },
            ], 'Recurring Tue/Fri evening slots')}
          >
            <Repeat size={16} /> Recurring slots
          </button>
          <button className="tutor-btn primary" onClick={() => addAvailability('3-18', 'Smart suggested Thu 18:00 slot')}><Plus size={16} /> Add availability</button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon amber"><AlertTriangle size={19} /></div>
        <div>
          <strong>Conflict detection is active</strong>
          <p>Wed 11:00 has a 15-minute overlap with an accepted Math lesson. Accepting the new request is disabled until a new time is suggested.</p>
        </div>
      </section>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><ShieldCheck size={19} /></div>
        <div>
          <strong>Schedule action status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      {draft && (
        <motion.section
          className="tutor-card slot-editor-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="slot-editor-head">
            <div>
              <span className="tutor-eyebrow"><Edit3 size={15} /> Slot editor</span>
              <h2 className="tutor-section-title">
                {editingSlotKey ? 'Edit class slot' : 'Create class slot'}
              </h2>
              <p className="tutor-section-copy">Set time, learning mode, absence reason, and tagged students for notification.</p>
            </div>
            <button className="compact-btn" onClick={() => { setDraft(null); setEditingSlotKey(null); }} type="button">
              <X size={14} /> Close
            </button>
          </div>

          <div className="slot-editor-grid">
            <label className="form-field">
              <span>Slot title</span>
              <input className="form-input" value={draft.title} onChange={(event) => updateDraft({ title: event.target.value })} />
            </label>

            <label className="form-field">
              <span>Subject / focus</span>
              <input className="form-input" value={draft.subject} onChange={(event) => updateDraft({ subject: event.target.value })} />
            </label>

            <label className="form-field">
              <span>Day</span>
              <select className="form-select" value={draft.dayIndex} onChange={(event) => updateDraft({ dayIndex: Number(event.target.value) })}>
                {days.map((day, index) => (
                  <option key={day.label} value={index}>{day.label} - {day.date}</option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Start</span>
              <select
                className="form-select"
                value={draft.startTime}
                onChange={(event) => updateDraft({ startTime: event.target.value, endTime: addMinutes(event.target.value, 90) })}
              >
                {timeOptions.slice(0, -2).map((time) => <option key={time} value={time}>{time}</option>)}
              </select>
            </label>

            <label className="form-field">
              <span>End</span>
              <select className="form-select" value={draft.endTime} onChange={(event) => updateDraft({ endTime: event.target.value })}>
                {timeOptions.filter((time) => time > draft.startTime).map((time) => <option key={time} value={time}>{time}</option>)}
              </select>
            </label>

            <label className="form-field">
              <span>Slot status</span>
              <select
                className="form-select"
                value={draft.type}
                onChange={(event) => updateDraft({ type: event.target.value as SlotType })}
                disabled={draft.learningState === 'leave'}
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="blocked">Blocked</option>
                <option value="conflict">Conflict</option>
              </select>
            </label>

            <div className="form-field full">
              <span>Class mode</span>
              <div className="slot-mode-row">
                {(['Online', 'Offline', 'Hybrid'] as LessonFormat[]).map((format) => (
                  <button
                    key={format}
                    className={`slot-pill${draft.format === format ? ' is-active' : ''}`}
                    onClick={() => updateDraft({ format })}
                    type="button"
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field full">
              <span>Study / leave mode</span>
              <div className="slot-mode-row">
                <button
                  className={`slot-pill${draft.learningState === 'study' ? ' is-active' : ''}`}
                  onClick={() => updateDraft({ learningState: 'study' })}
                  type="button"
                >
                  <UserCheck size={14} /> Học
                </button>
                <button
                  className={`slot-pill danger${draft.learningState === 'leave' ? ' is-active' : ''}`}
                  onClick={() => updateDraft({ learningState: 'leave', type: 'blocked', title: 'Nghỉ học' })}
                  type="button"
                >
                  <BellRing size={14} /> Nghỉ học
                </button>
              </div>
            </div>

            {draft.learningState === 'leave' && (
              <label className="form-field full">
                <span>Leave reason sent to students</span>
                <textarea
                  className="form-textarea compact"
                  value={draft.leaveReason}
                  onChange={(event) => updateDraft({ leaveReason: event.target.value })}
                  placeholder="Example: Tutor has an urgent school meeting. The make-up slot is Thu 18:00."
                />
              </label>
            )}

            <div className="form-field full">
              <span>Tag students by nick</span>
              <div className="student-tag-picker">
                {studentDirectory.map((student) => {
                  const isTagged = draft.students.includes(student.nick);
                  return (
                    <button
                      key={student.nick}
                      className={`student-tag${isTagged ? ' is-tagged' : ''}`}
                      onClick={() => toggleStudent(student.nick)}
                      type="button"
                    >
                      <span>{student.nick}</span>
                      <em>{student.name}</em>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="form-field full">
              <span>Internal note / public summary</span>
              <textarea className="form-textarea compact" value={draft.note} onChange={(event) => updateDraft({ note: event.target.value })} />
            </label>
          </div>

          <div className="slot-editor-footer">
            <div className="slot-notify-preview">
              <MessageSquare size={16} />
              <span>
                Notify preview: {draft.learningState === 'leave' ? 'Leave notice' : 'Schedule update'} to {draft.students.length ? draft.students.join(', ') : 'tagged students'} for {days[draft.dayIndex]?.label} {draft.startTime}-{draft.endTime}.
              </span>
            </div>
            <div className="tutor-actions">
              <button className="tutor-btn" onClick={() => saveDraft(false)} type="button"><Save size={16} /> Save slot</button>
              <button className="tutor-btn primary" onClick={() => saveDraft(true)} type="button"><BellRing size={16} /> Save & notify</button>
            </div>
          </div>
        </motion.section>
      )}

      <div className="schedule-toolbar">
        <div className="segmented-control" aria-label="Calendar view">
          <button className={viewMode === 'week' ? 'is-active' : ''} onClick={() => setViewMode('week')}>Weekly</button>
          <button className={viewMode === 'month' ? 'is-active' : ''} onClick={() => setViewMode('month')}>Monthly</button>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn ghost" onClick={() => { setWeekOffset((current) => current - 1); setFeedback('Moved to previous week. Availability remains conflict-checked.'); }}><ChevronLeft size={16} /> Previous</button>
          <button className="tutor-btn ghost" onClick={() => { setWeekOffset(0); setFeedback('Returned to current week.'); }}>Today</button>
          <button className="tutor-btn ghost" onClick={() => { setWeekOffset((current) => current + 1); setFeedback('Moved to next week.'); }}>Next <ChevronRight size={16} /></button>
        </div>
      </div>

      <section className="tutor-card calendar-shell">
        <div className="calendar-topline">
          <div>
            <h2 className="calendar-title">
              {viewMode === 'week' ? weekLabel : 'April 2026'}
              <span>Timezone: Vietnam (GMT+7). Drag across empty cells to create availability.</span>
            </h2>
          </div>
          <div className="calendar-legend">
            <span className="legend-item"><span className="legend-dot" /> Available</span>
            <span className="legend-item"><span className="legend-dot booked" /> Booked</span>
            <span className="legend-item"><span className="legend-dot blocked" /> Blocked</span>
            <span className="legend-item"><span className="legend-dot conflict" /> Conflict</span>
          </div>
        </div>

        {viewMode === 'week' ? (
          <div className="calendar-scroller">
            <div className="calendar-grid">
              <div className="calendar-header">Time</div>
              {days.map((day) => (
                <div className="calendar-header" key={day.label}>
                  {day.label}
                  <span>{day.date}</span>
                </div>
              ))}

              {hours.map((hour) => (
                <React.Fragment key={hour}>
                  <div className="calendar-time">{hour.toString().padStart(2, '0')}:00</div>
                  {days.map((day, dayIndex) => {
                    const slotKey = `${dayIndex}-${hour}`;
                    const slot = slots[slotKey];
                    return (
                      <div className="calendar-cell" key={`${day.label}-${hour}`}>
                        {slot ? (
                          <button
                            className={`calendar-slot ${slot.type}${slot.learningState === 'leave' ? ' is-leave' : ''}`}
                            onClick={() => openSlotEditor(slotKey, slot)}
                            type="button"
                            aria-label={`Edit ${slot.title} ${day.label} ${slot.startTime}`}
                          >
                            <GripVertical size={12} />
                            <strong>{slot.title}</strong>
                            <span>{slot.startTime}-{slot.endTime}</span>
                            <em>{slot.learningState === 'leave' ? slot.leaveReason || 'Leave notice needs reason' : slot.subject}</em>
                            {slot.students.length > 0 && (
                              <div className="slot-tags">
                                {slot.students.slice(0, 2).map((student) => <small key={student}>{student}</small>)}
                                {slot.students.length > 2 && <small>+{slot.students.length - 2}</small>}
                              </div>
                            )}
                            <div className="slot-tooltip">
                              <strong>{slot.title}</strong>
                              <span>{slot.detail}</span>
                              {slot.students.length > 0 && <span>Tagged: {slot.students.join(', ')}</span>}
                            </div>
                          </button>
                        ) : (
                          <button className="compact-btn" aria-label={`Add availability ${day.label} ${hour}:00`} onClick={() => openSlotEditor(slotKey)}>
                            <Plus size={14} /> Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="schedule-side-grid" style={{ padding: 22 }}>
            {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'].map((week, index) => (
              <div className="side-note" key={week}>
                <strong>{week}</strong>
                <p>{index === 2 ? '1 conflict, 8 booked sessions, 12 available slots.' : 'No conflicts. Availability coverage is healthy.'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="schedule-side-grid">
        <div className="side-note">
          <div className="tutor-soft-icon"><CopyPlus size={18} /></div>
          <strong style={{ marginTop: 12 }}>Drag & drop availability</strong>
          <p>Move blue availability blocks between days. Students see changes immediately.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon green"><ShieldCheck size={18} /></div>
          <strong style={{ marginTop: 12 }}>Auto-sync after booking</strong>
          <p>Accepted requests become booked slots and trigger confirmation notifications.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon amber"><Sparkles size={18} /></div>
          <strong style={{ marginTop: 12 }}>Smart suggestion</strong>
          <p>Open Thu 18:00 because three students search this subject and no overlap exists.</p>
        </div>
        <div className="side-note">
          <div className="tutor-soft-icon"><Clock3 size={18} /></div>
          <strong style={{ marginTop: 12 }}>24h reminders</strong>
          <p>Reminder rules are tied to booked sessions and can be changed in Settings.</p>
        </div>
      </div>
    </motion.div>
  );
}
