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
import { tutors as studentTutorCatalog } from '../services/tutors';

export type TutorStatus = 'pending' | 'approved' | 'active' | 'suspended';
export type BookingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';
export type ComplaintStatus = 'open' | 'in_progress' | 'resolved';
export type TransactionStatus = 'paid' | 'hold' | 'refund_requested' | 'refunded' | 'failed';
export type ReviewDecision = 'visible' | 'hidden' | 'flagged';
export type Priority = 'critical' | 'high' | 'normal';

const findStudentTutor = (id: string) => studentTutorCatalog.find((tutor) => tutor.id === id) ?? studentTutorCatalog[0];

const mathTutor = findStudentTutor('1');
const physicsTutor = findStudentTutor('3');
const chemistryTutor = findStudentTutor('5');
const ieltsTutor = findStudentTutor('7');
const pendingChemTutor = findStudentTutor('52');
const suspendedIeltsTutor = findStudentTutor('24');

const tutorNick = (name: string) => `@${name.toLowerCase().replace(/^(dr\.|mr\.|ms\.)\s*/, '').replace(/[^a-z0-9]+/g, '')}`;

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
    value: '4',
    detail: 'Minh Quan completed, Lan Anh next, Gia Bao and Group A3 booked',
    icon: CalendarCheck2,
    tone: 'blue',
  },
  {
    label: 'Weekly bookings',
    value: '8',
    detail: 'Synced from tutor requests, weekly calendar, and lesson workspace',
    icon: TrendingUp,
    tone: 'indigo',
  },
  {
    label: 'Active tutors',
    value: `${studentTutorCatalog.length}`,
    detail: 'Synced from student tutor discovery catalog',
    icon: UsersRound,
    tone: 'green',
  },
  {
    label: 'Open complaints',
    value: '2',
    detail: 'Bao Chau refund case and Gia Linh conflict need response',
    icon: MessageSquareWarning,
    tone: 'rose',
  },
  {
    label: 'Revenue this month',
    value: '2.82M VND',
    detail: 'VNPay and MoMo holds mirror active tutor lessons',
    icon: CircleDollarSign,
    tone: 'amber',
  },
];

export const systemAlerts: SystemAlert[] = [
  {
    id: 'high-cancel',
    title: 'High cancellation rate detected',
    detail: `${suspendedIeltsTutor.name} crossed the quality threshold after an IELTS Speaking cancellation.`,
    priority: 'critical',
    actionLabel: 'Review tutor performance',
    targetPath: '/manager/tutors',
  },
  {
    id: 'approval-aging',
    title: 'Tutor pending approval > 3 days',
    detail: `${pendingChemTutor.name} is waiting on Organic Chemistry certificate verification and interview notes.`,
    priority: 'high',
    actionLabel: 'Open approval queue',
    targetPath: '/manager/tutors',
  },
  {
    id: 'booking-overlap',
    title: 'Potential double booking',
    detail: `${mathTutor.name} has Gia Linh's 11:00 request overlapping Lan Anh's Math lesson.`,
    priority: 'critical',
    actionLabel: 'Check conflict',
    targetPath: '/manager/bookings',
  },
];

export const tutors: TutorRecord[] = [
  {
    id: ieltsTutor.id,
    name: ieltsTutor.name,
    nick: tutorNick(ieltsTutor.name),
    subject: ieltsTutor.role,
    city: 'Ha Noi',
    status: 'active',
    profile: ieltsTutor.headline,
    certificates: [
      { name: ieltsTutor.achievements[0], verified: true, uploadedAt: '18 Apr 2026' },
      { name: 'Identity verified from student catalog', verified: true, uploadedAt: '18 Apr 2026' },
    ],
    rating: ieltsTutor.rating,
    students: ieltsTutor.reviews,
    completionRate: 93,
    cancellationRate: 5,
    pendingDays: 0,
    lastLesson: 'Minh Quan IELTS Writing feedback completed',
    nextStep: 'Confirm Bao Chau replacement slot and keep refund communication clear',
  },
  {
    id: mathTutor.id,
    name: mathTutor.name,
    nick: tutorNick(mathTutor.name),
    subject: mathTutor.role,
    city: 'Da Nang',
    status: 'active',
    profile: mathTutor.headline,
    certificates: [
      { name: mathTutor.achievements[0], verified: true, uploadedAt: '20 Apr 2026' },
      { name: 'Student-facing tutor profile verified', verified: true, uploadedAt: '20 Apr 2026' },
    ],
    rating: mathTutor.rating,
    students: mathTutor.reviews,
    completionRate: 96,
    cancellationRate: 3,
    pendingDays: 0,
    lastLesson: 'Lan Anh Grade 12 Math session is next in tutor workspace',
    nextStep: 'Monitor Lan Anh and Gia Linh Grade 12 Math requests',
  },
  {
    id: chemistryTutor.id,
    name: chemistryTutor.name,
    nick: tutorNick(chemistryTutor.name),
    subject: chemistryTutor.role,
    city: 'Ho Chi Minh City',
    status: 'active',
    profile: chemistryTutor.headline,
    certificates: [
      { name: chemistryTutor.achievements[0], verified: true, uploadedAt: '10 Mar 2026' },
      { name: 'Chemistry teaching record verified', verified: true, uploadedAt: '12 Mar 2026' },
    ],
    rating: chemistryTutor.rating,
    students: chemistryTutor.reviews,
    completionRate: 91,
    cancellationRate: 6,
    pendingDays: 0,
    lastLesson: 'Thanh Truc Chemistry 11 request waiting for tutor response',
    nextStep: 'Confirm Thanh Truc recurring Friday request or suggest another time',
  },
  {
    id: physicsTutor.id,
    name: physicsTutor.name,
    nick: tutorNick(physicsTutor.name),
    subject: physicsTutor.role,
    city: 'Hai Phong',
    status: 'active',
    profile: physicsTutor.headline,
    certificates: [
      { name: physicsTutor.achievements[0], verified: true, uploadedAt: '02 Feb 2026' },
      { name: 'Physics cohort record verified', verified: true, uploadedAt: '15 Apr 2026' },
    ],
    rating: physicsTutor.rating,
    students: physicsTutor.reviews,
    completionRate: 94,
    cancellationRate: 4,
    pendingDays: 0,
    lastLesson: 'Gia Bao Physics session scheduled today',
    nextStep: 'Keep Gia Bao offline session and payment hold synced',
  },
  {
    id: pendingChemTutor.id,
    name: pendingChemTutor.name,
    nick: tutorNick(pendingChemTutor.name),
    subject: pendingChemTutor.role,
    city: 'Ha Noi',
    status: 'pending',
    profile: pendingChemTutor.headline,
    certificates: [
      { name: pendingChemTutor.achievements[0], verified: true, uploadedAt: '24 Apr 2026' },
      { name: 'Organic Chemistry teaching portfolio', verified: false, uploadedAt: '25 Apr 2026' },
    ],
    rating: pendingChemTutor.rating,
    students: pendingChemTutor.reviews,
    completionRate: 88,
    cancellationRate: 0,
    pendingDays: 4,
    lastLesson: 'Not visible to students until approval',
    nextStep: 'Verify Organic Chemistry teaching portfolio before approval',
  },
  {
    id: suspendedIeltsTutor.id,
    name: suspendedIeltsTutor.name,
    nick: tutorNick(suspendedIeltsTutor.name),
    subject: suspendedIeltsTutor.role,
    city: 'Ho Chi Minh City',
    status: 'suspended',
    profile: suspendedIeltsTutor.headline,
    certificates: [
      { name: suspendedIeltsTutor.achievements[0], verified: true, uploadedAt: '03 Feb 2026' },
      { name: 'Parent feedback record', verified: true, uploadedAt: '15 Apr 2026' },
    ],
    rating: suspendedIeltsTutor.rating,
    students: suspendedIeltsTutor.reviews,
    completionRate: 78,
    cancellationRate: 18,
    pendingDays: 0,
    lastLesson: 'Paused after Bao Chau IELTS Speaking cancellation',
    nextStep: 'Resolve complaint CMP-102 before reactivation',
    riskNote: 'Reactivation blocked by open complaint',
  },
];

export const bookings: BookingRecord[] = [
  {
    id: 'BKG-2401',
    tutorId: chemistryTutor.id,
    tutor: chemistryTutor.name,
    student: 'Thanh Truc',
    studentNick: '@thanhtruc',
    subject: 'Chemistry 11',
    date: '2026-04-24',
    start: '18:00',
    end: '19:30',
    status: 'requested',
    payment: 'MoMo',
    nextStep: 'Confirm tutor availability or suggest another time',
  },
  {
    id: 'BKG-2402',
    tutorId: mathTutor.id,
    tutor: mathTutor.name,
    student: 'Duc Huy',
    studentNick: '@duchuy',
    subject: 'SAT Math',
    date: '2026-04-25',
    start: '09:00',
    end: '10:00',
    status: 'requested',
    payment: 'VNPay',
    nextStep: 'Confirm trial lesson and keep VNPay hold ready',
  },
  {
    id: 'BKG-2403',
    tutorId: mathTutor.id,
    tutor: mathTutor.name,
    student: 'Gia Linh',
    studentNick: '@gialinh',
    subject: 'Grade 12 Math',
    date: '2026-04-22',
    start: '11:00',
    end: '12:30',
    status: 'requested',
    payment: 'Trial',
    conflictWith: 'BKG-2404',
    issue: 'Requested slot overlaps with Lan Anh by 30 minutes in Tutor Booking Requests.',
    nextStep: 'Suggest another time or assign a substitute math tutor',
  },
  {
    id: 'BKG-2404',
    tutorId: mathTutor.id,
    tutor: mathTutor.name,
    student: 'Lan Anh',
    studentNick: '@lananh',
    subject: 'Grade 12 Math',
    date: '2026-04-22',
    start: '10:00',
    end: '11:30',
    status: 'confirmed',
    payment: 'VNPay',
    conflictWith: 'BKG-2403',
    issue: 'Gia Linh request starts before this accepted Math lesson ends.',
    nextStep: 'Keep Lan Anh slot locked and send Gia Linh a new time suggestion',
  },
  {
    id: 'BKG-2405',
    tutorId: ieltsTutor.id,
    tutor: ieltsTutor.name,
    student: 'Minh Quan',
    studentNick: '@minhquan',
    subject: 'IELTS Writing Task 2',
    date: '2026-04-27',
    start: '08:00',
    end: '09:00',
    status: 'completed',
    payment: 'MoMo',
    nextStep: 'Release writing feedback and keep review moderation available',
  },
  {
    id: 'BKG-2406',
    tutorId: physicsTutor.id,
    tutor: physicsTutor.name,
    student: 'Gia Bao',
    studentNick: '@giabao',
    subject: 'Physics - Electric field',
    date: '2026-04-28',
    start: '14:00',
    end: '15:30',
    status: 'confirmed',
    payment: 'MoMo',
    nextStep: 'Keep offline lesson details and payment hold synced',
  },
  {
    id: 'BKG-2407',
    tutorId: suspendedIeltsTutor.id,
    tutor: suspendedIeltsTutor.name,
    student: 'Bao Chau',
    studentNick: '@baochau',
    subject: 'IELTS Speaking',
    date: '2026-04-20',
    start: '20:00',
    end: '21:00',
    status: 'cancelled',
    payment: 'MoMo',
    issue: 'Refund queued after cancellation; student needs clear policy explanation.',
    nextStep: 'Review refund policy, notify Bao Chau, then decide reactivation path',
  },
  {
    id: 'BKG-2408',
    tutorId: ieltsTutor.id,
    tutor: ieltsTutor.name,
    student: 'Bao Chau',
    studentNick: '@baochau',
    subject: 'IELTS Speaking replacement',
    date: '2026-04-21',
    start: '20:00',
    end: '21:00',
    status: 'requested',
    payment: 'MoMo',
    nextStep: 'Confirm accepted Tuesday replacement time and refresh payment hold',
  },
];

export const transactions: TransactionRecord[] = [
  {
    id: 'PAY-9101',
    student: 'Minh Quan',
    tutor: ieltsTutor.name,
    amount: 450000,
    method: 'MoMo',
    status: 'paid',
    bookingId: 'BKG-2405',
    policy: 'Completed lessons can be disputed within 48h, not refunded automatically.',
    refundable: false,
    nextStep: 'Open dispute flow only if Minh Quan reports an issue',
  },
  {
    id: 'PAY-9102',
    student: 'Lan Anh',
    tutor: mathTutor.name,
    amount: 500000,
    method: 'VNPay',
    status: 'paid',
    bookingId: 'BKG-2404',
    policy: 'Confirmed lessons keep payment locked unless manager cancels or student disputes within policy.',
    refundable: false,
    nextStep: 'Keep slot locked and block overlapping requests',
  },
  {
    id: 'PAY-9103',
    student: 'Bao Chau',
    tutor: suspendedIeltsTutor.name,
    amount: 450000,
    method: 'MoMo',
    status: 'refund_requested',
    bookingId: 'BKG-2407',
    policy: 'Cancellations inside the 24h window require manager review before releasing payment.',
    refundable: true,
    nextStep: 'Approve refund or explain policy before reactivation decision',
  },
  {
    id: 'PAY-9104',
    student: 'Duc Huy',
    tutor: mathTutor.name,
    amount: 420000,
    method: 'VNPay',
    status: 'hold',
    bookingId: 'BKG-2402',
    policy: 'SAT Math trial hold stays pending until tutor confirms the requested slot.',
    refundable: true,
    nextStep: 'Confirm trial booking or release VNPay hold',
  },
  {
    id: 'PAY-9105',
    student: 'Gia Bao',
    tutor: physicsTutor.name,
    amount: 470000,
    method: 'MoMo',
    status: 'hold',
    bookingId: 'BKG-2406',
    policy: 'Offline lesson holds settle after attendance confirmation.',
    refundable: true,
    nextStep: 'Settle after Gia Bao offline attendance is confirmed',
  },
  {
    id: 'PAY-9106',
    student: 'Thanh Truc',
    tutor: chemistryTutor.name,
    amount: 390000,
    method: 'MoMo',
    status: 'hold',
    bookingId: 'BKG-2401',
    policy: 'New booking holds stay pending until tutor accepts or suggests another time.',
    refundable: true,
    nextStep: 'Confirm Chemistry 11 request or release MoMo hold',
  },
];

export const reviews: ReviewRecord[] = [
  {
    id: 'REV-3001',
    student: 'Minh Quan',
    tutor: ieltsTutor.name,
    rating: 5,
    comment: 'IELTS Writing feedback was clear and moved my essay toward the 6.5 target band.',
    lessonStatus: 'completed',
    decision: 'visible',
    flags: [],
    nextStep: 'Keep review and publish progress badge',
  },
];

export const complaints: ComplaintRecord[] = [
  {
    id: 'CMP-102',
    student: 'Bao Chau',
    tutor: suspendedIeltsTutor.name,
    issue: 'IELTS Speaking session was cancelled and refund communication was unclear.',
    priority: 'critical',
    status: 'open',
    submittedAt: '27 Apr 2026, 09:12',
    nextStep: 'Assign handler within 30 minutes',
  },
  {
    id: 'CMP-103',
    student: 'Gia Linh',
    tutor: mathTutor.name,
    issue: 'Grade 12 Math request is blocked by a conflict in Tutor Booking Requests.',
    priority: 'high',
    status: 'in_progress',
    submittedAt: '27 Apr 2026, 10:05',
    handler: 'Manager Trang',
    nextStep: 'Respond with reschedule options and payment hold status',
  },
  {
    id: 'CMP-097',
    student: 'Lan Anh',
    tutor: mathTutor.name,
    issue: 'Student needed a make-up option after a leave notice changed the Math slot.',
    priority: 'normal',
    status: 'resolved',
    submittedAt: '25 Apr 2026, 20:18',
    handler: 'Manager Hieu',
    resolutionNote: 'Manager kept the accepted lesson locked and sent make-up alternatives.',
    nextStep: 'Archive after 7-day follow-up window',
  },
];

export const managerNotifications: ManagerNotification[] = [
  {
    id: 'NOT-1',
    title: 'New tutor application',
    detail: `${pendingChemTutor.name} uploaded Organic Chemistry portfolio and waits for final certificate verification.`,
    source: 'Tutor',
    priority: 'high',
    time: 'Now',
    targetPath: '/manager/tutors',
    actionLabel: 'Review application',
  },
  {
    id: 'NOT-2',
    title: 'Complaint submitted',
    detail: `Bao Chau submitted an IELTS Speaking refund communication complaint against ${suspendedIeltsTutor.name}.`,
    source: 'Student',
    priority: 'critical',
    time: '4m',
    targetPath: '/manager/complaints',
    actionLabel: 'Assign handler',
  },
  {
    id: 'NOT-3',
    title: 'Booking issue detected',
    detail: `Gia Linh's Grade 12 Math request overlaps Lan Anh's accepted slot with ${mathTutor.name}.`,
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
  {
    id: 'NOT-5',
    title: 'New booking request',
    detail: 'Thanh Truc requested Chemistry 11 for Fri 18:00. MoMo hold is ready and no conflict is detected.',
    source: 'Student',
    priority: 'high',
    time: '22m',
    targetPath: '/manager/bookings',
    actionLabel: 'Review request',
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
