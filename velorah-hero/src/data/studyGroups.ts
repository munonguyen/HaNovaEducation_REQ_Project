export type StudyGroupLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type StudyGroupMode = 'Tutor-led' | 'Peer-led';
export type StudyGroupStatus = 'Open' | 'Full';
export type MembershipStatus = 'Active' | 'Completed';
export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';
export type SessionStatus = 'Scheduled' | 'Rescheduled' | 'Cancelled';
export type TaskStatus = 'Pending' | 'Completed' | 'Overdue';
export type MaterialKind = 'PDF' | 'Slides' | 'Link' | 'Video';
export type DiscussionReaction = 'Helpful' | 'Insightful';
export type NotificationKind = 'Session' | 'Schedule' | 'Task' | 'Announcement';
export type MemberRole = 'Student' | 'Tutor' | 'Host';
export type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type GroupDetailTab = 'overview' | 'schedule' | 'tasks' | 'materials' | 'discussion';
export type TeachingRole = 'Tutor' | 'Mentor' | 'Host';
export type TeamAccent = 'cyan' | 'violet' | 'amber' | 'emerald';

export interface StudyGroupMember {
  id: string;
  name: string;
  initials: string;
  role: MemberRole;
  focus: string;
  attendance: number;
}

export interface StudyGroupTeacher {
  id: string;
  name: string;
  initials: string;
  role: TeachingRole;
  specialty: string;
  sessionFocus: string;
  availabilityLabel: string;
  rateLabel?: string;
  accent: TeamAccent;
}

export interface StudyGroupSession {
  id: string;
  dateLabel: string;
  day: Weekday;
  startTime: string;
  endTime: string;
  topic: string;
  hostName: string;
  preparationNote?: string;
  requiredMaterials: string[];
  status: SessionStatus;
  statusReason?: string;
  linkedStudyPlanMilestone?: string;
  conflictsWithPersonalSchedule?: boolean;
}

export interface StudyGroupTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignedBy: string;
  status: TaskStatus;
}

export interface StudyGroupMaterial {
  id: string;
  topic: string;
  sessionTitle: string;
  title: string;
  kind: MaterialKind;
  meta: string;
}

export interface StudyGroupReply {
  id: string;
  author: string;
  role: MemberRole;
  postedAt: string;
  content: string;
}

export interface StudyGroupThread {
  id: string;
  author: string;
  role: MemberRole;
  postedAt: string;
  title: string;
  content: string;
  pinned?: boolean;
  reactions: Record<DiscussionReaction, number>;
  replies: StudyGroupReply[];
}

export interface StudyGroupNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  createdAt: string;
  unread: boolean;
}

export interface StudyGroupActivity {
  taskStatuses?: Partial<Record<string, TaskStatus>>;
  reactions?: Partial<Record<string, Record<DiscussionReaction, number>>>;
  readNotificationIds?: string[];
}

export interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  level: StudyGroupLevel;
  mode: StudyGroupMode;
  status: StudyGroupStatus;
  description: string;
  learningGoal: string;
  duration: string;
  nextSessionLabel: string;
  schedulePreview: string;
  availability: TimeSlot[];
  memberCount: number;
  maxMembers: number;
  tutorName?: string;
  tutorSpecialty?: string;
  teachingTeam?: StudyGroupTeacher[];
  personalStatus?: MembershipStatus;
  linkedStudyPlan?: string;
  recommendedReasons: string[];
  aiSuggestion: string;
  progress: {
    completion: number;
    attendance: number;
    milestone: string;
  };
  members: StudyGroupMember[];
  sessions: StudyGroupSession[];
  tasks: StudyGroupTask[];
  materials: StudyGroupMaterial[];
  threads: StudyGroupThread[];
  notifications: StudyGroupNotification[];
}

export const STUDY_GROUPS_KEY = 'hanova:student-groups';
export const CREATED_STUDY_GROUPS_KEY = 'hanova:created-study-groups';
export const STUDY_GROUP_ACTIVITY_KEY = 'hanova:study-group-activity';
export const STUDY_GROUPS_UPDATED_EVENT = 'hanova:study-groups-updated';

export const groupSubjects = ['All', 'IELTS', 'Math', 'Programming', 'TOEIC', 'Physics'] as const;
export const groupLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;
export const groupModes = ['All', 'Tutor-led', 'Peer-led'] as const;
export const groupTimeSlots = ['Morning', 'Afternoon', 'Evening'] as const;
export const groupViews = ['discover', 'my-groups'] as const;
export const groupTabs: { id: GroupDetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'materials', label: 'Materials' },
  { id: 'discussion', label: 'Discussion' },
];

export const defaultJoinedGroupIds = ['group-ielts-writing', 'group-python-lab', 'group-calculus'];

export const baseStudyGroups: StudyGroup[] = [
  {
    id: 'group-ielts-writing',
    name: 'IELTS Writing Sprint',
    subject: 'IELTS',
    level: 'Intermediate',
    mode: 'Tutor-led',
    status: 'Open',
    description:
      'A structured writing cohort built around weekly feedback, timed essays, and band descriptor practice. Sessions stay focused on measurable writing improvement rather than open-ended chat.',
    learningGoal: 'Reach IELTS 6.5 writing with stable Task 1 and Task 2 performance.',
    duration: '8 weeks',
    nextSessionLabel: 'Tue · 19:00',
    schedulePreview: 'Tue 19:00, Sat 09:00',
    availability: ['Evening', 'Morning'],
    memberCount: 8,
    maxMembers: 10,
    tutorName: 'Dr. Le Thao Nguyen',
    tutorSpecialty: 'IELTS Writing & band score feedback',
    personalStatus: 'Active',
    linkedStudyPlan: 'IELTS 6.5 Preparation Plan',
    recommendedReasons: ['Matches your IELTS 6.5 goal', 'Tutor-led structure connects to your study plan'],
    aiSuggestion:
      'Because your onboarding goal is IELTS 6.5 in 3 months, this cohort gives the fastest feedback loop for writing accuracy and timing.',
    progress: {
      completion: 38,
      attendance: 92,
      milestone: 'Task response and idea development',
    },
    members: [
      { id: 'm-ielts-tutor', name: 'Dr. Le Thao Nguyen', initials: 'TN', role: 'Tutor', focus: 'Writing feedback', attendance: 100 },
      { id: 'm-anh', name: 'Nguyen Minh Anh', initials: 'MA', role: 'Student', focus: 'IELTS 6.5 target', attendance: 92 },
      { id: 'm-linh', name: 'Pham Bao Linh', initials: 'BL', role: 'Student', focus: 'Task 2 argument flow', attendance: 88 },
      { id: 'm-khanh', name: 'Vo Khanh Ngan', initials: 'KN', role: 'Student', focus: 'Grammar range', attendance: 95 },
      { id: 'm-an', name: 'Tran Hoang An', initials: 'TA', role: 'Student', focus: 'Essay coherence', attendance: 90 },
    ],
    sessions: [
      {
        id: 's-ielts-1',
        dateLabel: 'Tue, Apr 28',
        day: 'Tue',
        startTime: '19:00',
        endTime: '20:30',
        topic: 'Task 2 thesis and outline workshop',
        hostName: 'Dr. Le Thao Nguyen',
        preparationNote: 'Draft one introduction for the environment topic before class.',
        requiredMaterials: ['Band descriptor sheet', 'Cambridge IELTS 18 - Writing test 2'],
        status: 'Scheduled',
        linkedStudyPlanMilestone: 'Writing phase · Thesis clarity',
      },
      {
        id: 's-ielts-2',
        dateLabel: 'Sat, May 02',
        day: 'Sat',
        startTime: '09:00',
        endTime: '10:30',
        topic: 'Peer review clinic for body paragraph development',
        hostName: 'Dr. Le Thao Nguyen',
        preparationNote: 'Bring one completed Task 2 body paragraph for peer marking.',
        requiredMaterials: ['Marked sample essays', 'Peer review rubric'],
        status: 'Scheduled',
      },
      {
        id: 's-ielts-3',
        dateLabel: 'Tue, May 05',
        day: 'Tue',
        startTime: '19:00',
        endTime: '20:30',
        topic: 'Task 1 data comparison patterns',
        hostName: 'Dr. Le Thao Nguyen',
        preparationNote: 'Review chapter 3 of the writing strategy guide.',
        requiredMaterials: ['Task 1 phrase bank', 'Line graph dataset'],
        status: 'Rescheduled',
        statusReason: 'Tutor shifted the session by 30 minutes after a campus seminar.',
      },
      {
        id: 's-ielts-4',
        dateLabel: 'Sat, May 09',
        day: 'Sat',
        startTime: '09:00',
        endTime: '10:30',
        topic: 'Timed mock and live feedback',
        hostName: 'Dr. Le Thao Nguyen',
        requiredMaterials: ['Timer', 'Notebook'],
        status: 'Cancelled',
        statusReason: 'Tutor illness. Replacement session will be added on Sunday morning.',
        conflictsWithPersonalSchedule: true,
      },
    ],
    tasks: [
      {
        id: 't-ielts-1',
        title: 'Write one full Task 2 essay',
        description: 'Submit a 40-minute essay draft for band-based tutor comments.',
        dueDate: 'Apr 27 · 22:00',
        assignedBy: 'Dr. Le Thao Nguyen',
        status: 'Pending',
      },
      {
        id: 't-ielts-2',
        title: 'Task 1 vocabulary drill',
        description: 'Memorize 20 comparison phrases and use each phrase in one sentence.',
        dueDate: 'Apr 29 · 20:00',
        assignedBy: 'Dr. Le Thao Nguyen',
        status: 'Completed',
      },
      {
        id: 't-ielts-3',
        title: 'Rewrite weak conclusion paragraph',
        description: 'Improve the essay conclusion from last week using the tutor notes.',
        dueDate: 'Apr 23 · 18:00',
        assignedBy: 'Dr. Le Thao Nguyen',
        status: 'Overdue',
      },
    ],
    materials: [
      {
        id: 'mat-ielts-1',
        topic: 'Essay structure',
        sessionTitle: 'Task 2 thesis and outline workshop',
        title: 'Writing framework pack',
        kind: 'PDF',
        meta: '12 pages · tutor template',
      },
      {
        id: 'mat-ielts-2',
        topic: 'Peer review',
        sessionTitle: 'Peer review clinic for body paragraph development',
        title: 'Peer review rubric',
        kind: 'Slides',
        meta: '8 slides · annotation guide',
      },
      {
        id: 'mat-ielts-3',
        topic: 'Task 1 vocabulary',
        sessionTitle: 'Task 1 data comparison patterns',
        title: 'Phrase bank library',
        kind: 'Link',
        meta: 'Shared knowledge base',
      },
      {
        id: 'mat-ielts-4',
        topic: 'Mock review',
        sessionTitle: 'Timed mock and live feedback',
        title: 'Band 6.5 sample walkthrough',
        kind: 'Video',
        meta: '14 min replay',
      },
    ],
    threads: [
      {
        id: 'thr-ielts-1',
        author: 'Dr. Le Thao Nguyen',
        role: 'Tutor',
        postedAt: 'Today · 08:20',
        title: 'Pinned tutor message',
        content:
          'Before Tuesday, prioritize clarity over complexity. A simple thesis with direct support will score higher than an ambitious but unstable argument.',
        pinned: true,
        reactions: { Helpful: 16, Insightful: 9 },
        replies: [
          {
            id: 'r-ielts-1',
            author: 'Nguyen Minh Anh',
            role: 'Student',
            postedAt: 'Today · 08:42',
            content: 'Understood. I will bring one stronger outline instead of drafting a full essay first.',
          },
        ],
      },
      {
        id: 'thr-ielts-2',
        author: 'Pham Bao Linh',
        role: 'Student',
        postedAt: 'Yesterday · 20:15',
        title: 'How many examples should we use in Task 2 body paragraphs?',
        content:
          'I noticed my essay becomes too long when I add multiple examples. Is one precise example enough if the explanation is strong?',
        reactions: { Helpful: 8, Insightful: 5 },
        replies: [
          {
            id: 'r-ielts-2',
            author: 'Dr. Le Thao Nguyen',
            role: 'Tutor',
            postedAt: 'Yesterday · 21:00',
            content: 'One strong example is enough. Depth of explanation matters more than quantity.',
          },
        ],
      },
      {
        id: 'thr-ielts-3',
        author: 'Vo Khanh Ngan',
        role: 'Student',
        postedAt: 'Mon · 18:10',
        title: 'Useful transition phrases for contrast',
        content:
          'I collected six transition phrases from the workbook. Posting them here so the group can reuse them during timed practice.',
        reactions: { Helpful: 12, Insightful: 3 },
        replies: [],
      },
    ],
    notifications: [
      {
        id: 'n-ielts-1',
        kind: 'Task',
        title: 'New writing assignment',
        message: 'Submit one Task 2 essay draft before Monday 22:00.',
        createdAt: '12 min ago',
        unread: true,
      },
      {
        id: 'n-ielts-2',
        kind: 'Schedule',
        title: 'Session rescheduled',
        message: 'Task 1 data comparison patterns was moved 30 minutes later.',
        createdAt: '1 hour ago',
        unread: true,
      },
      {
        id: 'n-ielts-3',
        kind: 'Announcement',
        title: 'Tutor note added',
        message: 'Prepare chapter 3 before the next live critique.',
        createdAt: 'Yesterday',
        unread: false,
      },
    ],
  },
  {
    id: 'group-python-lab',
    name: 'Python Problem-Solving Lab',
    subject: 'Programming',
    level: 'Intermediate',
    mode: 'Peer-led',
    status: 'Open',
    description:
      'A peer-led lab for students building stronger coding fluency through weekly problem sets, algorithm walkthroughs, and structured review sessions.',
    learningGoal: 'Improve problem-solving speed and consistency before technical interviews.',
    duration: '6 weeks',
    nextSessionLabel: 'Thu · 18:30',
    schedulePreview: 'Thu 18:30, Sun 10:00',
    availability: ['Evening', 'Morning'],
    memberCount: 6,
    maxMembers: 8,
    personalStatus: 'Active',
    teachingTeam: [
      {
        id: 'tt-python-host',
        name: 'Tran Gia Bao',
        initials: 'GB',
        role: 'Host',
        specialty: 'Peer-led coding drills and weekly challenge moderation',
        sessionFocus: 'Keeps the group cadence stable and reviews member submissions before live sessions.',
        availabilityLabel: 'Thu 18:30 · Sun 10:00',
        rateLabel: 'Community host',
        accent: 'emerald',
      },
      {
        id: 'tt-python-mentor-1',
        name: 'Pham Huy Khang',
        initials: 'HK',
        role: 'Mentor',
        specialty: 'Algorithms, complexity analysis, interview prep',
        sessionFocus: 'Runs challenge labs and teaches cleaner problem decomposition.',
        availabilityLabel: 'Thu 18:30 · Sat 08:30',
        rateLabel: 'Booked as group mentor',
        accent: 'cyan',
      },
      {
        id: 'tt-python-mentor-2',
        name: 'Nguyen Bao Chau',
        initials: 'BC',
        role: 'Mentor',
        specialty: 'Python optimization and code review',
        sessionFocus: 'Leads performance clinics and debugging review for submitted solutions.',
        availabilityLabel: 'Sun 10:00 · Tue 19:15',
        rateLabel: 'Booked as review tutor',
        accent: 'violet',
      },
    ],
    recommendedReasons: ['Fits your flexible-session preference', 'Builds consistency between tutor sessions'],
    aiSuggestion:
      'This group pairs well with one-to-one mentoring because it turns weekly concepts into practice volume without adding another tutor booking.',
    progress: {
      completion: 52,
      attendance: 89,
      milestone: 'Arrays, stacks, and two-pointer patterns',
    },
    members: [
      { id: 'm-python-host', name: 'Tran Gia Bao', initials: 'GB', role: 'Host', focus: 'Weekly challenge host', attendance: 97 },
      { id: 'm-python-1', name: 'Nguyen Minh Anh', initials: 'MA', role: 'Student', focus: 'Algorithm practice', attendance: 91 },
      { id: 'm-python-2', name: 'Do Huyen Trang', initials: 'HT', role: 'Student', focus: 'LeetCode medium questions', attendance: 86 },
      { id: 'm-python-3', name: 'Le Quoc Nam', initials: 'QN', role: 'Student', focus: 'Data structures review', attendance: 90 },
    ],
    sessions: [
      {
        id: 's-python-1',
        dateLabel: 'Thu, Apr 30',
        day: 'Thu',
        startTime: '18:30',
        endTime: '20:00',
        topic: 'Sliding window challenge set',
        hostName: 'Pham Huy Khang',
        preparationNote: 'Solve at least one easy sliding window problem before joining.',
        requiredMaterials: ['Laptop', 'Shared Python notebook'],
        status: 'Scheduled',
      },
      {
        id: 's-python-1b',
        dateLabel: 'Sat, May 02',
        day: 'Sat',
        startTime: '08:30',
        endTime: '09:30',
        topic: 'Mock interview warm-up clinic',
        hostName: 'Pham Huy Khang',
        preparationNote: 'Prepare one explanation of your array solution out loud before joining.',
        requiredMaterials: ['Camera on', 'One recent LeetCode solution'],
        status: 'Scheduled',
      },
      {
        id: 's-python-2',
        dateLabel: 'Sun, May 03',
        day: 'Sun',
        startTime: '10:00',
        endTime: '11:30',
        topic: 'Code review and optimization clinic',
        hostName: 'Nguyen Bao Chau',
        preparationNote: 'Bring one solution that timed out or felt slow.',
        requiredMaterials: ['Your latest challenge submission'],
        status: 'Scheduled',
      },
      {
        id: 's-python-2b',
        dateLabel: 'Tue, May 05',
        day: 'Tue',
        startTime: '19:15',
        endTime: '20:15',
        topic: 'Debugging review office hour',
        hostName: 'Tran Gia Bao',
        preparationNote: 'Post one bug you could not isolate before 17:00.',
        requiredMaterials: ['Error trace notes', 'Current code branch'],
        status: 'Scheduled',
      },
      {
        id: 's-python-3',
        dateLabel: 'Thu, May 07',
        day: 'Thu',
        startTime: '18:30',
        endTime: '20:00',
        topic: 'Stacks and monotonic patterns',
        hostName: 'Nguyen Bao Chau',
        requiredMaterials: ['Python snippets', 'Notebook'],
        status: 'Rescheduled',
        statusReason: 'One host has an exam review, so the session starts 15 minutes later.',
      },
    ],
    tasks: [
      {
        id: 't-python-1',
        title: 'Finish three two-pointer problems',
        description: 'Post your code and complexity notes before Sunday review.',
        dueDate: 'Apr 26 · 21:00',
        assignedBy: 'Tran Gia Bao',
        status: 'Pending',
      },
      {
        id: 't-python-2',
        title: 'Refactor the deque solution',
        description: 'Reduce duplicate condition branches in last week solution.',
        dueDate: 'Apr 24 · 20:00',
        assignedBy: 'Tran Gia Bao',
        status: 'Completed',
      },
    ],
    materials: [
      {
        id: 'mat-python-1',
        topic: 'Patterns',
        sessionTitle: 'Sliding window challenge set',
        title: 'Sliding window cheat sheet',
        kind: 'PDF',
        meta: '5 pages · examples included',
      },
      {
        id: 'mat-python-2',
        topic: 'Practice',
        sessionTitle: 'Code review and optimization clinic',
        title: 'Shared challenge board',
        kind: 'Link',
        meta: 'Live board with solutions',
      },
      {
        id: 'mat-python-3',
        topic: 'Stacks',
        sessionTitle: 'Stacks and monotonic patterns',
        title: 'Monotonic stack walkthrough',
        kind: 'Video',
        meta: '11 min recap',
      },
    ],
    threads: [
      {
        id: 'thr-python-1',
        author: 'Tran Gia Bao',
        role: 'Host',
        postedAt: 'Today · 09:10',
        title: 'Pinned tutor message',
        content:
          'Keep Thursday practical. Post only one debugging question per thread so the discussion stays searchable and useful for everyone.',
        pinned: true,
        reactions: { Helpful: 11, Insightful: 4 },
        replies: [],
      },
      {
        id: 'thr-python-2',
        author: 'Do Huyen Trang',
        role: 'Student',
        postedAt: 'Yesterday · 22:05',
        title: 'Why did my O(n) solution still fail the time limit?',
        content:
          'I think the algorithm is linear, but Python string slicing might still be hurting the runtime. Sharing the idea here before the clinic.',
        reactions: { Helpful: 6, Insightful: 7 },
        replies: [
          {
            id: 'r-python-1',
            author: 'Le Quoc Nam',
            role: 'Student',
            postedAt: 'Yesterday · 22:30',
            content: 'Try avoiding repeated string copies. The logic is fine, but the implementation still creates extra arrays.',
          },
        ],
      },
    ],
    notifications: [
      {
        id: 'n-python-1',
        kind: 'Session',
        title: 'Upcoming challenge set',
        message: 'Sliding window challenge set starts Thursday at 18:30.',
        createdAt: '40 min ago',
        unread: true,
      },
      {
        id: 'n-python-2',
        kind: 'Announcement',
        title: 'New optimization notes',
        message: 'Host uploaded a short recap on avoiding extra memory allocations.',
        createdAt: 'Yesterday',
        unread: false,
      },
    ],
  },
  {
    id: 'group-calculus',
    name: 'Calculus Foundations Cohort',
    subject: 'Math',
    level: 'Advanced',
    mode: 'Tutor-led',
    status: 'Open',
    description:
      'A tutor-led revision cohort for calculus fundamentals, designed for students who need stronger continuity between lectures, homework, and exam review.',
    learningGoal: 'Stabilize weekly problem-solving accuracy before the midterm exam.',
    duration: '5 weeks',
    nextSessionLabel: 'Completed cohort',
    schedulePreview: 'Mon 19:30, Wed 19:30',
    availability: ['Evening'],
    memberCount: 10,
    maxMembers: 12,
    tutorName: 'Prof. Nguyen Minh Duc',
    tutorSpecialty: 'Calculus and engineering math',
    personalStatus: 'Completed',
    linkedStudyPlan: 'Midterm Prep Mastery',
    recommendedReasons: ['Strong exam structure', 'Tutor links sessions to study-plan milestones'],
    aiSuggestion:
      'Students in this cohort were less likely to miss revision sessions because tasks and reminders were synchronized with the schedule system.',
    progress: {
      completion: 100,
      attendance: 95,
      milestone: 'Integration and optimization',
    },
    members: [
      { id: 'm-calc-tutor', name: 'Prof. Nguyen Minh Duc', initials: 'MD', role: 'Tutor', focus: 'Exam strategy', attendance: 100 },
      { id: 'm-calc-1', name: 'Nguyen Minh Anh', initials: 'MA', role: 'Student', focus: 'Problem sets', attendance: 95 },
      { id: 'm-calc-2', name: 'Hoang Thu Ha', initials: 'HH', role: 'Student', focus: 'Derivative review', attendance: 90 },
    ],
    sessions: [
      {
        id: 's-calc-1',
        dateLabel: 'Mon, Apr 07',
        day: 'Mon',
        startTime: '19:30',
        endTime: '21:00',
        topic: 'Optimization problem clinic',
        hostName: 'Prof. Nguyen Minh Duc',
        requiredMaterials: ['Problem set 4', 'Calculator'],
        status: 'Scheduled',
      },
      {
        id: 's-calc-2',
        dateLabel: 'Wed, Apr 09',
        day: 'Wed',
        startTime: '19:30',
        endTime: '21:00',
        topic: 'Integral techniques review',
        hostName: 'Prof. Nguyen Minh Duc',
        requiredMaterials: ['Revision worksheet'],
        status: 'Scheduled',
      },
    ],
    tasks: [
      {
        id: 't-calc-1',
        title: 'Final mixed worksheet',
        description: 'Complete the final revision worksheet before exam week.',
        dueDate: 'Apr 10 · 18:00',
        assignedBy: 'Prof. Nguyen Minh Duc',
        status: 'Completed',
      },
    ],
    materials: [
      {
        id: 'mat-calc-1',
        topic: 'Exam review',
        sessionTitle: 'Optimization problem clinic',
        title: 'Optimization mini-pack',
        kind: 'PDF',
        meta: 'Practice set with answer key',
      },
    ],
    threads: [
      {
        id: 'thr-calc-1',
        author: 'Prof. Nguyen Minh Duc',
        role: 'Tutor',
        postedAt: 'Apr 10',
        title: 'Pinned tutor message',
        content:
          'You completed this cohort with strong attendance. Revisit the optimization worksheet before any advanced applications course.',
        pinned: true,
        reactions: { Helpful: 9, Insightful: 3 },
        replies: [],
      },
    ],
    notifications: [
      {
        id: 'n-calc-1',
        kind: 'Announcement',
        title: 'Cohort completed',
        message: 'Your calculus cohort is archived. Materials stay available for exam revision.',
        createdAt: 'Apr 10',
        unread: false,
      },
    ],
  },
  {
    id: 'group-toeic-listening',
    name: 'TOEIC Listening Acceleration',
    subject: 'TOEIC',
    level: 'Beginner',
    mode: 'Tutor-led',
    status: 'Full',
    description:
      'A concentrated listening bootcamp for students preparing for TOEIC fundamentals, with tutor briefings, replay packs, and weekly checkpoints.',
    learningGoal: 'Raise listening accuracy on parts 1 to 3 within one month.',
    duration: '4 weeks',
    nextSessionLabel: 'Fri · 20:00',
    schedulePreview: 'Fri 20:00, Sun 08:30',
    availability: ['Evening', 'Morning'],
    memberCount: 12,
    maxMembers: 12,
    tutorName: 'Ms. Hoang Anh Thu',
    tutorSpecialty: 'TOEIC listening strategy',
    recommendedReasons: ['Useful if you pivot to TOEIC', 'High reminder compliance and clear task structure'],
    aiSuggestion:
      'This group is currently full, but you may benefit from joining the waitlist because its schedule fits students with weekday study blocks.',
    progress: {
      completion: 24,
      attendance: 87,
      milestone: 'Photo description and short response',
    },
    members: [
      { id: 'm-toeic-tutor', name: 'Hoang Anh Thu', initials: 'AT', role: 'Tutor', focus: 'Listening strategies', attendance: 100 },
      { id: 'm-toeic-1', name: 'Le Huu Phuc', initials: 'HP', role: 'Student', focus: 'Part 2 drills', attendance: 88 },
      { id: 'm-toeic-2', name: 'Pham Gia Linh', initials: 'GL', role: 'Student', focus: 'Note taking', attendance: 84 },
    ],
    sessions: [
      {
        id: 's-toeic-1',
        dateLabel: 'Fri, May 01',
        day: 'Fri',
        startTime: '20:00',
        endTime: '21:00',
        topic: 'Part 2 response traps',
        hostName: 'Hoang Anh Thu',
        preparationNote: 'Replay the sample audio packet before class.',
        requiredMaterials: ['Listening packet A', 'Earphones'],
        status: 'Scheduled',
      },
    ],
    tasks: [
      {
        id: 't-toeic-1',
        title: 'Replay packet A twice',
        description: 'Track where you missed distractor words and note the reason.',
        dueDate: 'Apr 30 · 19:00',
        assignedBy: 'Hoang Anh Thu',
        status: 'Pending',
      },
    ],
    materials: [
      {
        id: 'mat-toeic-1',
        topic: 'Listening packet',
        sessionTitle: 'Part 2 response traps',
        title: 'Audio packet A',
        kind: 'Video',
        meta: '7 clips with transcripts',
      },
    ],
    threads: [
      {
        id: 'thr-toeic-1',
        author: 'Hoang Anh Thu',
        role: 'Tutor',
        postedAt: 'Today · 07:50',
        title: 'Pinned tutor message',
        content: 'If you join the waitlist, keep Sunday mornings free. That is the first slot likely to open.',
        pinned: true,
        reactions: { Helpful: 5, Insightful: 2 },
        replies: [],
      },
    ],
    notifications: [
      {
        id: 'n-toeic-1',
        kind: 'Announcement',
        title: 'Group full',
        message: 'Waitlist opens automatically if any student leaves after the first checkpoint.',
        createdAt: 'Today',
        unread: true,
      },
    ],
  },
];

export function parseStoredStudyGroupIds(raw: string | null): string[] {
  if (!raw) return defaultJoinedGroupIds;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultJoinedGroupIds;
    return parsed.filter((value): value is string => typeof value === 'string');
  } catch {
    return defaultJoinedGroupIds;
  }
}

export function readJoinedStudyGroupIds(): string[] {
  if (typeof window === 'undefined') return defaultJoinedGroupIds;
  return parseStoredStudyGroupIds(window.localStorage.getItem(STUDY_GROUPS_KEY));
}

export function writeJoinedStudyGroupIds(ids: string[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STUDY_GROUPS_KEY, JSON.stringify([...new Set(ids)]));
  window.dispatchEvent(new Event(STUDY_GROUPS_UPDATED_EVENT));
}

export function readCreatedStudyGroups(): StudyGroup[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(CREATED_STUDY_GROUPS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as StudyGroup[];
  } catch {
    return [];
  }
}

export function writeCreatedStudyGroups(groups: StudyGroup[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CREATED_STUDY_GROUPS_KEY, JSON.stringify(groups));
  window.dispatchEvent(new Event(STUDY_GROUPS_UPDATED_EVENT));
}

function readStudyGroupActivityMap(): Record<string, StudyGroupActivity> {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(STUDY_GROUP_ACTIVITY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as Record<string, StudyGroupActivity>;
  } catch {
    return {};
  }
}

export function readStudyGroupActivity(groupId: string): StudyGroupActivity {
  return readStudyGroupActivityMap()[groupId] ?? {};
}

export function writeStudyGroupActivity(groupId: string, activity: StudyGroupActivity) {
  if (typeof window === 'undefined') return;

  const current = readStudyGroupActivityMap();
  current[groupId] = {
    ...current[groupId],
    ...activity,
    taskStatuses: {
      ...(current[groupId]?.taskStatuses ?? {}),
      ...(activity.taskStatuses ?? {}),
    },
    reactions: {
      ...(current[groupId]?.reactions ?? {}),
      ...(activity.reactions ?? {}),
    },
    readNotificationIds: activity.readNotificationIds
      ? [...new Set(activity.readNotificationIds)]
      : current[groupId]?.readNotificationIds,
  };

  window.localStorage.setItem(STUDY_GROUP_ACTIVITY_KEY, JSON.stringify(current));
  window.dispatchEvent(new Event(STUDY_GROUPS_UPDATED_EVENT));
}

export function getAllStudyGroups() {
  return [...readCreatedStudyGroups(), ...baseStudyGroups];
}

export function findStudyGroupById(groupId: string) {
  return getAllStudyGroups().find((group) => group.id === groupId) ?? null;
}
