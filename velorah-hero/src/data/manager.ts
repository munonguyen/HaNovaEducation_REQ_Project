import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  BadgeCheck,
  BellRing,
  CalendarCheck2,
  CircleDollarSign,
  Clock3,
  GraduationCap,
  MessageSquareWarning,
  ShieldCheck,
  Star,
  TrendingUp,
  UserCheck,
  UsersRound,
} from 'lucide-react';

export type TutorStatus = 'pending' | 'approved' | 'active' | 'suspended';
export type BookingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved';
export type TransactionStatus = 'paid' | 'hold' | 'refund_requested' | 'refunded' | 'failed';
export type ReviewDecision = 'visible' | 'hidden' | 'flagged';
export type Priority = 'critical' | 'high' | 'normal';

export interface ManagerStat {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: 'blue' | 'green' | 'amber' | 'rose' | 'indigo';
}

export interface SystemAlert {
  id: string;
  title: string;
  detail: string;
  priority: Priority;
  actionLabel: string;
  targetPath: string;
}

export interface TutorRecord {
  id: string;
  name: string;
  nick: string;
  subject: string;
  city: string;
  status: TutorStatus;
  profile: string;
  certificates: Array<{ name: string; verified: boolean; uploadedAt: string }>;
  rating: number;
  students: number;
  completionRate: number;
  cancellationRate: number;
  pendingDays: number;
  lastLesson: string;
  nextStep: string;
  riskNote?: string;
}

export interface BookingRecord {
  id: string;
  tutorId: string;
  tutor: string;
  student: string;
  studentNick: string;
  subject: string;
  date: string;
  start: string;
  end: string;
  status: BookingStatus;
  payment: 'VNPay' | 'MoMo' | 'Trial';
  issue?: string;
  conflictWith?: string;
  nextStep: string;
}

export interface TransactionRecord {
  id: string;
  student: string;
  tutor: string;
  amount: number;
  method: 'VNPay' | 'MoMo';
  status: TransactionStatus;
  bookingId: string;
  policy: string;
  refundable: boolean;
  nextStep: string;
}

export interface ReviewRecord {
  id: string;
  student: string;
  tutor: string;
  rating: number;
  comment: string;
  lessonStatus: 'completed';
  decision: ReviewDecision;
  flags: string[];
  nextStep: string;
}

export interface ComplaintRecord {
  id: string;
  student: string;
  tutor: string;
  issue: string;
  priority: Priority;
  status: ComplaintStatus;
  submittedAt: string;
  handler?: string;
  resolutionNote?: string;
  nextStep: string;
}

export interface ManagerNotification {
  id: string;
  title: string;
  detail: string;
  source: 'Student' | 'Tutor' | 'Payment' | 'System';
  priority: Priority;
  time: string;
  targetPath: string;
  actionLabel: string;
}

export const managerStats: ManagerStat[] = [
  {
    label: 'Bookings today',
    value: '42',
    detail: '11 requested, 25 confirmed, 6 completed',
    icon: CalendarCheck2,
    tone: 'blue',
  },
  {
    label: 'Weekly bookings',
    value: '218',
    detail: '18% above last week, 2 conflicts watched',
    icon: TrendingUp,
    tone: 'indigo',
  },
  {
    label: 'Active tutors',
    value: '36',
    detail: '5 pending approval, 2 on quality watch',
    icon: UsersRound,
    tone: 'green',
  },
  {
    label: 'Open complaints',
    value: '7',
    detail: '3 critical cases need manager response',
    icon: MessageSquareWarning,
    tone: 'rose',
  },
  {
    label: 'Revenue this month',
    value: '148.6M VND',
    detail: 'VNPay 61%, MoMo 39%, refund queue 4',
    icon: CircleDollarSign,
    tone: 'amber',
  },
];

export const systemAlerts: SystemAlert[] = [
  {
    id: 'high-cancel',
    title: 'High cancellation rate detected',
    detail: 'Three tutors crossed the 12% cancellation threshold in the last 7 days.',
    priority: 'critical',
    actionLabel: 'Review tutor performance',
    targetPath: '/manager/tutors',
  },
  {
    id: 'approval-aging',
    title: 'Tutor pending approval > 3 days',
    detail: 'Nguyen Hoang Phuc is waiting on certificate verification and interview notes.',
    priority: 'high',
    actionLabel: 'Open approval queue',
    targetPath: '/manager/tutors',
  },
  {
    id: 'booking-overlap',
    title: 'Potential double booking',
    detail: 'IELTS Writing slots for @minhquan and @baochau overlap by 30 minutes.',
    priority: 'critical',
    actionLabel: 'Check conflict',
    targetPath: '/manager/bookings',
  },
];

export const tutors: TutorRecord[] = [
  {
    id: 'tutor-lan',
    name: 'Nguyen Minh Lan',
    nick: '@minhlan',
    subject: 'IELTS Writing',
    city: 'Ha Noi',
    status: 'pending',
    profile: '8 years IELTS coaching, focus on band 6.5-7.5 writing rescue plans.',
    certificates: [
      { name: 'IELTS Academic 8.0', verified: true, uploadedAt: '24 Apr 2026' },
      { name: 'Teaching portfolio', verified: false, uploadedAt: '25 Apr 2026' },
    ],
    rating: 4.8,
    students: 18,
    completionRate: 93,
    cancellationRate: 5,
    pendingDays: 4,
    lastLesson: 'Trial reviewed 26 Apr',
    nextStep: 'Verify teaching portfolio before final approval',
  },
  {
    id: 'tutor-phuc',
    name: 'Nguyen Hoang Phuc',
    nick: '@hoangphuc',
    subject: 'Grade 12 Math',
    city: 'Da Nang',
    status: 'approved',
    profile: 'University entrance Math mentor, strong calculus and probability track.',
    certificates: [
      { name: 'Pedagogy certificate', verified: true, uploadedAt: '20 Apr 2026' },
      { name: 'Identity document', verified: true, uploadedAt: '20 Apr 2026' },
    ],
    rating: 4.9,
    students: 26,
    completionRate: 96,
    cancellationRate: 3,
    pendingDays: 0,
    lastLesson: 'Completed 26 Apr',
    nextStep: 'Activate account and assign first recurring cohort',
  },
  {
    id: 'tutor-mai',
    name: 'Tran Phuong Mai',
    nick: '@phuongmai',
    subject: 'Chemistry 11',
    city: 'Ho Chi Minh City',
    status: 'active',
    profile: 'Chemistry mentor for Grade 10-12, labs and exam problem-solving.',
    certificates: [
      { name: 'Chemistry degree', verified: true, uploadedAt: '10 Mar 2026' },
      { name: 'Background check', verified: true, uploadedAt: '12 Mar 2026' },
    ],
    rating: 4.7,
    students: 31,
    completionRate: 91,
    cancellationRate: 14,
    pendingDays: 0,
    lastLesson: 'Completed today',
    nextStep: 'Review cancellation pattern and confirm coverage backup',
    riskNote: 'Cancellation rate above manager threshold',
  },
  {
    id: 'tutor-khanh',
    name: 'Le Khanh Vy',
    nick: '@khanhvy',
    subject: 'SAT Math',
    city: 'Hai Phong',
    status: 'suspended',
    profile: 'SAT Math specialist, temporarily suspended after unresolved complaint.',
    certificates: [
      { name: 'SAT 790 Math proof', verified: true, uploadedAt: '02 Feb 2026' },
      { name: 'Parent feedback record', verified: true, uploadedAt: '15 Apr 2026' },
    ],
    rating: 4.1,
    students: 9,
    completionRate: 78,
    cancellationRate: 18,
    pendingDays: 0,
    lastLesson: 'Paused 22 Apr',
    nextStep: 'Resolve complaint CMP-102 before reactivation',
    riskNote: 'Reactivation blocked by open complaint',
  },
];

export const bookings: BookingRecord[] = [
  {
    id: 'BKG-2401',
    tutorId: 'tutor-mai',
    tutor: 'Tran Phuong Mai',
    student: 'Thanh Truc',
    studentNick: '@thanhtruc',
    subject: 'Chemistry 11',
    date: '2026-04-27',
    start: '18:00',
    end: '19:30',
    status: 'requested',
    payment: 'MoMo',
    nextStep: 'Confirm tutor availability or suggest another time',
  },
  {
    id: 'BKG-2402',
    tutorId: 'tutor-lan',
    tutor: 'Nguyen Minh Lan',
    student: 'Minh Quan',
    studentNick: '@minhquan',
    subject: 'IELTS Writing',
    date: '2026-04-27',
    start: '20:00',
    end: '21:30',
    status: 'confirmed',
    payment: 'VNPay',
    conflictWith: 'BKG-2403',
    issue: 'Overlaps with another IELTS Writing slot by 30 minutes.',
    nextStep: 'Move one student or assign substitute tutor',
  },
  {
    id: 'BKG-2403',
    tutorId: 'tutor-lan',
    tutor: 'Nguyen Minh Lan',
    student: 'Bao Chau',
    studentNick: '@baochau',
    subject: 'IELTS Writing',
    date: '2026-04-27',
    start: '21:00',
    end: '22:00',
    status: 'confirmed',
    payment: 'VNPay',
    conflictWith: 'BKG-2402',
    issue: 'Same tutor overlap detected.',
    nextStep: 'Open conflict resolution and notify affected students',
  },
  {
    id: 'BKG-2404',
    tutorId: 'tutor-phuc',
    tutor: 'Nguyen Hoang Phuc',
    student: 'Lan Anh',
    studentNick: '@lananh',
    subject: 'Grade 12 Math',
    date: '2026-04-27',
    start: '14:00',
    end: '15:30',
    status: 'completed',
    payment: 'MoMo',
    nextStep: 'Release lesson review request',
  },
  {
    id: 'BKG-2405',
    tutorId: 'tutor-khanh',
    tutor: 'Le Khanh Vy',
    student: 'Duc Huy',
    studentNick: '@duchuy',
    subject: 'SAT Math Trial',
    date: '2026-04-28',
    start: '09:00',
    end: '10:00',
    status: 'cancelled',
    payment: 'Trial',
    issue: 'Tutor suspended after complaint escalation.',
    nextStep: 'Assign replacement tutor and message parent',
  },
];

export const transactions: TransactionRecord[] = [
  {
    id: 'PAY-9101',
    student: 'Minh Quan',
    tutor: 'Nguyen Minh Lan',
    amount: 450000,
    method: 'VNPay',
    status: 'hold',
    bookingId: 'BKG-2402',
    policy: 'Refund allowed until 24h before lesson start or if manager cancels due to tutor conflict.',
    refundable: true,
    nextStep: 'Hold payment until conflict is resolved',
  },
  {
    id: 'PAY-9102',
    student: 'Lan Anh',
    tutor: 'Nguyen Hoang Phuc',
    amount: 500000,
    method: 'MoMo',
    status: 'paid',
    bookingId: 'BKG-2404',
    policy: 'Completed lessons can be disputed within 48h, not refunded automatically.',
    refundable: false,
    nextStep: 'Open dispute flow if student reports an issue',
  },
  {
    id: 'PAY-9103',
    student: 'Bao Chau',
    tutor: 'Nguyen Minh Lan',
    amount: 450000,
    method: 'VNPay',
    status: 'refund_requested',
    bookingId: 'BKG-2403',
    policy: 'Conflict-created refunds are manager-approved and do not penalize the student.',
    refundable: true,
    nextStep: 'Approve refund or reschedule with compensation credit',
  },
  {
    id: 'PAY-9104',
    student: 'Duc Huy',
    tutor: 'Le Khanh Vy',
    amount: 0,
    method: 'MoMo',
    status: 'failed',
    bookingId: 'BKG-2405',
    policy: 'Trial holds are voided when tutor is suspended.',
    refundable: false,
    nextStep: 'Offer replacement trial booking',
  },
];

export const reviews: ReviewRecord[] = [
  {
    id: 'REV-3001',
    student: 'Lan Anh',
    tutor: 'Nguyen Hoang Phuc',
    rating: 5,
    comment: 'Thay giai thich ro, co bai tap bo sung dung nhu muc tieu thi THPT.',
    lessonStatus: 'completed',
    decision: 'visible',
    flags: [],
    nextStep: 'Keep review and publish progress badge',
  },
  {
    id: 'REV-3002',
    student: 'Minh Quan',
    tutor: 'Nguyen Minh Lan',
    rating: 2,
    comment: 'Lich bi doi sat gio, em can nguoi ho tro truoc bai thi thu.',
    lessonStatus: 'completed',
    decision: 'flagged',
    flags: ['Scheduling issue'],
    nextStep: 'Flag for booking investigation before hiding',
  },
  {
    id: 'REV-3003',
    student: 'Bao Chau',
    tutor: 'Nguyen Minh Lan',
    rating: 4,
    comment: 'Feedback tot nhung phan thanh toan refund can ro hon.',
    lessonStatus: 'completed',
    decision: 'visible',
    flags: ['Payment mention'],
    nextStep: 'Keep review, send payment explanation via notification',
  },
];

export const complaints: ComplaintRecord[] = [
  {
    id: 'CMP-102',
    student: 'Duc Huy',
    tutor: 'Le Khanh Vy',
    issue: 'Tutor missed trial lesson and did not notify student before start time.',
    priority: 'critical',
    status: 'open',
    submittedAt: '27 Apr 2026, 09:12',
    nextStep: 'Assign handler within 30 minutes',
  },
  {
    id: 'CMP-103',
    student: 'Minh Quan',
    tutor: 'Nguyen Minh Lan',
    issue: 'Double-booked IELTS session created schedule conflict near exam week.',
    priority: 'high',
    status: 'in_progress',
    submittedAt: '27 Apr 2026, 10:05',
    handler: 'Manager Trang',
    nextStep: 'Respond with reschedule options and payment hold status',
  },
  {
    id: 'CMP-097',
    student: 'Lan Anh',
    tutor: 'Nguyen Hoang Phuc',
    issue: 'Student requested clearer homework scope after completed lesson.',
    priority: 'normal',
    status: 'resolved',
    submittedAt: '25 Apr 2026, 20:18',
    handler: 'Manager Hieu',
    resolutionNote: 'Tutor sent revised homework checklist and student confirmed.',
    nextStep: 'Archive after 7-day follow-up window',
  },
];

export const managerNotifications: ManagerNotification[] = [
  {
    id: 'NOT-1',
    title: 'New tutor application',
    detail: 'Nguyen Minh Lan uploaded portfolio and waits for final certificate verification.',
    source: 'Tutor',
    priority: 'high',
    time: 'Now',
    targetPath: '/manager/tutors',
    actionLabel: 'Review application',
  },
  {
    id: 'NOT-2',
    title: 'Complaint submitted',
    detail: 'Duc Huy submitted a missed lesson complaint against Le Khanh Vy.',
    source: 'Student',
    priority: 'critical',
    time: '4m',
    targetPath: '/manager/complaints',
    actionLabel: 'Assign handler',
  },
  {
    id: 'NOT-3',
    title: 'Booking issue detected',
    detail: 'Two IELTS Writing sessions overlap for the same tutor tonight.',
    source: 'System',
    priority: 'critical',
    time: '8m',
    targetPath: '/manager/bookings',
    actionLabel: 'Resolve conflict',
  },
  {
    id: 'NOT-4',
    title: 'Refund queue updated',
    detail: 'Bao Chau refund request is ready for policy review.',
    source: 'Payment',
    priority: 'high',
    time: '18m',
    targetPath: '/manager/payments',
    actionLabel: 'Open refund',
  },
];

export const tutorFlow = [
  { label: 'Pending', detail: 'Application received', icon: Clock3 },
  { label: 'Approved', detail: 'Certificates verified', icon: BadgeCheck },
  { label: 'Active', detail: 'Can receive bookings', icon: UserCheck },
  { label: 'Suspended', detail: 'Bookings blocked until resolved', icon: ShieldCheck },
];

export const bookingFlow = [
  { label: 'Requested', detail: 'Student books a slot', icon: GraduationCap },
  { label: 'Confirmed', detail: 'Tutor and payment hold match', icon: CalendarCheck2 },
  { label: 'Completed', detail: 'Lesson attended and review opens', icon: Star },
  { label: 'Cancelled', detail: 'Reason, refund and notification required', icon: AlertTriangle },
];

export const complaintFlow = [
  { label: 'Open', detail: 'Student or tutor reports issue', icon: BellRing },
  { label: 'In progress', detail: 'Manager owns response', icon: MessageSquareWarning },
  { label: 'Resolved', detail: 'Resolution note recorded', icon: ShieldCheck },
];

export const systemRules = [
  {
    title: 'Cancellation policy',
    detail: 'Student cancellations are refundable before 24h. Tutor-created conflicts can be refunded or rescheduled by manager.',
    owner: 'Manager Operations',
  },
  {
    title: 'Tutor approval rule',
    detail: 'At least one identity proof and one teaching certificate must be verified before approval.',
    owner: 'Academic Quality',
  },
  {
    title: 'Payment configuration',
    detail: 'VNPay and MoMo payments use hold-first settlement for active bookings.',
    owner: 'Finance Control',
  },
];

export function formatVnd(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}
