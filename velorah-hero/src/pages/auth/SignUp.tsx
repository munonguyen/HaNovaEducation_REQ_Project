import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  GraduationCap,
  Mail,
  Moon,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  User,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import { writeStoredUserProfile } from '../../utils/helpers';

type StepId = 'account' | 'goals' | 'preferences' | 'profile' | 'review';
type Role = 'student' | 'tutor' | 'manager' | 'admin';
type Level = 'Beginner' | 'Intermediate' | 'Advanced';
type LearningStyle = 'Structured plan' | 'Flexible sessions';

interface OnboardingData {
  role: Role;
  email: string;
  password: string;
  confirmPassword: string;
  goal: string;
  customGoal: string;
  target: string;
  timeline: string;
  currentLevel: Level;
  subjects: string[];
  studyTimes: string[];
  preferredDays: string[];
  budget: string;
  learningStyle: LearningStyle;
  fullName: string;
  avatarName: string;
  bio: string;
  qualification: string;
  experience: string;
  hourlyRate: string;
  teachingFormats: string[];
  organizationName: string;
  organizationRole: string;
  organizationSize: string;
  organizationNeed: string;
  notifications: {
    email: boolean;
    inApp: boolean;
  };
}

const DRAFT_KEY = 'hanova:onboarding-draft';

const roleSteps: Record<Role, Array<{ id: StepId; label: string; eyebrow: string }>> = {
  student: [
    { id: 'account', label: 'Account', eyebrow: 'Fast entry' },
    { id: 'goals', label: 'Learning Goals', eyebrow: 'Study plan' },
    { id: 'preferences', label: 'Preferences', eyebrow: 'Booking fit' },
    { id: 'profile', label: 'Profile', eyebrow: 'Personal touch' },
    { id: 'review', label: 'Review & Continue', eyebrow: 'First session' },
  ],
  tutor: [
    { id: 'account', label: 'Account', eyebrow: 'Tutor access' },
    { id: 'goals', label: 'Teaching Expertise', eyebrow: 'Verification' },
    { id: 'preferences', label: 'Availability & Rates', eyebrow: 'Booking setup' },
    { id: 'profile', label: 'Tutor Profile', eyebrow: 'Public presence' },
    { id: 'review', label: 'Review & Apply', eyebrow: 'Tutor onboarding' },
  ],
  manager: [
    { id: 'account', label: 'Account', eyebrow: 'Manager access' },
    { id: 'goals', label: 'Organization', eyebrow: 'Institution setup' },
    { id: 'preferences', label: 'Management Needs', eyebrow: 'Operations' },
    { id: 'profile', label: 'Contact Profile', eyebrow: 'Trusted owner' },
    { id: 'review', label: 'Review & Create', eyebrow: 'Workspace ready' },
  ],
  admin: [
    { id: 'account', label: 'Account', eyebrow: 'Admin access' },
    { id: 'goals', label: 'Platform Scope', eyebrow: 'Governance setup' },
    { id: 'preferences', label: 'Admin Needs', eyebrow: 'Security and audit' },
    { id: 'profile', label: 'Admin Profile', eyebrow: 'Account owner' },
    { id: 'review', label: 'Review & Create', eyebrow: 'Console ready' },
  ],
};

const roleOptions = [
  {
    id: 'student',
    title: 'Student',
    desc: 'Find tutors, book sessions, and generate a study plan.',
    icon: GraduationCap,
  },
  {
    id: 'tutor',
    title: 'Tutor',
    desc: 'Create a teaching profile and receive booking requests.',
    icon: School,
  },
  {
    id: 'manager',
    title: 'Manager',
    desc: 'Run tutor approvals, bookings, payments, reviews, and complaints.',
    icon: Building2,
  },
  {
    id: 'admin',
    title: 'Admin',
    desc: 'Govern users, roles, security, audit logs, and platform configuration.',
    icon: ShieldCheck,
  },
] satisfies Array<{ id: Role; title: string; desc: string; icon: LucideIcon }>;

const goalOptions = [
  {
    id: 'Improve school performance',
    title: 'Improve school performance',
    desc: 'Build stronger grades and study habits.',
    icon: GraduationCap,
  },
  {
    id: 'Prepare for exams',
    title: 'Prepare for exams',
    desc: 'IELTS, TOEIC, high school and university exams.',
    icon: Target,
  },
  {
    id: 'Learn a new subject',
    title: 'Learn a new subject',
    desc: 'Start a topic with a guided mentor plan.',
    icon: BookOpen,
  },
  {
    id: 'Other',
    title: 'Other',
    desc: 'Tell HaNova what you need in your own words.',
    icon: Sparkles,
  },
];

const subjectOptions = [
  'IELTS',
  'TOEIC',
  'English',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Programming',
  'Economics',
  'Literature',
];

const timeOptions = ['Morning', 'Afternoon', 'Evening'];
const dayOptions = ['Weekdays', 'Weekends'];
const budgetOptions = ['Under 300k VND', '300k-500k VND', '500k-800k VND', 'Flexible'];
const levelOptions: Level[] = ['Beginner', 'Intermediate', 'Advanced'];
const teachingFormatOptions = ['1:1 Online', 'Group class', 'Exam prep', 'Homework review'];
const organizationSizeOptions = ['Under 100 learners', '100-500 learners', '500+ learners', 'Pilot program'];
const organizationNeedOptions = ['Tutor operations', 'Student progress', 'Scheduling', 'Payments & invoices'];
const adminNeedOptions = ['Users & roles', 'Security policy', 'Audit logs', 'System configuration'];

const initialData: OnboardingData = {
  role: 'student',
  email: '',
  password: '',
  confirmPassword: '',
  goal: 'Prepare for exams',
  customGoal: '',
  target: 'IELTS 6.5',
  timeline: '3 months',
  currentLevel: 'Intermediate',
  subjects: ['IELTS', 'English'],
  studyTimes: ['Evening'],
  preferredDays: ['Weekends'],
  budget: '300k-500k VND',
  learningStyle: 'Structured plan',
  fullName: '',
  avatarName: '',
  bio: '',
  qualification: '',
  experience: '',
  hourlyRate: '300k-500k VND',
  teachingFormats: ['1:1 Online'],
  organizationName: '',
  organizationRole: '',
  organizationSize: 'Pilot program',
  organizationNeed: 'Tutor operations',
  notifications: {
    email: true,
    inApp: true,
  },
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getInitials(name: string, email: string) {
  const source = name.trim() || email.split('@')[0] || 'Student';
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function loadDraft(): OnboardingData {
  if (typeof window === 'undefined') return initialData;

  try {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    if (!stored) return initialData;
    const parsed = JSON.parse(stored) as Partial<OnboardingData>;

    return {
      ...initialData,
      ...parsed,
      password: '',
      confirmPassword: '',
      notifications: {
        ...initialData.notifications,
        ...parsed.notifications,
      },
    };
  } catch {
    return initialData;
  }
}

function SignUp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(() => loadDraft());
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [socialNotice, setSocialNotice] = useState('');

  const selectedTutor = searchParams.get('tutor') ?? searchParams.get('tutorId');
  const selectedSession = searchParams.get('session') ?? searchParams.get('sessionId');
  const returnTo = searchParams.get('returnTo');

  const goalLabel = data.goal === 'Other' ? data.customGoal || 'Custom goal' : data.goal;
  const goalSummary = `${data.target || goalLabel} in ${data.timeline || 'a flexible timeline'}`;
  const steps = roleSteps[data.role];
  const progress = ((activeStep + 1) / steps.length) * 100;
  const selectedRole = roleOptions.find((role) => role.id === data.role) ?? roleOptions[0];
  const SelectedRoleIcon = selectedRole.icon;
  const roleDisplay = selectedRole.title;
  const isOrganizationRole = data.role === 'manager' || data.role === 'admin';
  const accountSummary =
    data.role === 'student'
      ? goalSummary
      : data.role === 'tutor'
        ? `${data.subjects.slice(0, 2).join(', ') || 'Academic'} tutor • ${data.hourlyRate}`
        : data.role === 'manager'
          ? `${data.organizationName || 'Organization'} • ${data.organizationNeed || 'Operations'}`
          : `${data.organizationName || 'HaNova platform'} • ${data.organizationNeed || 'Governance'}`;
  const sidebarTitle =
    data.role === 'student'
      ? "Let's start your learning journey with a clear first step."
      : data.role === 'tutor'
        ? 'Create a trusted tutor account for students to book.'
        : data.role === 'manager'
          ? 'Set up an academic operations workspace for your organization.'
          : 'Set up a platform administration console.';
  const sidebarDescription =
    data.role === 'student'
      ? 'Tell us your goal so HaNova can recommend tutors, draft a study plan, suggest available slots, and keep your booking flow ready for VNPay or MoMo checkout.'
      : data.role === 'tutor'
        ? 'Share your expertise, availability, and teaching profile so HaNova can verify you and route the right students to your schedule.'
        : data.role === 'manager'
          ? 'Create a manager account for coordinating tutors, learners, schedules, notifications, and payment operations across your institution.'
          : 'Create an admin account for governing users, roles, security, audit logs, and platform-level configuration.';

  const accountValidation = useMemo(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    const passwordRules = [
      data.password.length >= 8,
      /[A-Z]/.test(data.password),
      /\d/.test(data.password),
    ];
    const passwordValid = passwordRules.every(Boolean);
    const confirmValid = data.confirmPassword.length > 0 && data.confirmPassword === data.password;

    return {
      emailValid,
      passwordRules,
      passwordValid,
      confirmValid,
      canContinue: emailValid && passwordValid && confirmValid,
    };
  }, [data.confirmPassword, data.email, data.password]);

  const canGoNext = useMemo(() => {
    if (activeStep === 0) return accountValidation.canContinue;
    if (activeStep === 1) {
      if (data.role === 'student') return Boolean(goalLabel.trim() && data.target.trim() && data.timeline.trim());
      if (data.role === 'tutor') return data.subjects.length > 0 && Boolean(data.qualification.trim() && data.experience.trim());
      return Boolean(data.organizationName.trim() && data.organizationRole.trim());
    }
    if (activeStep === 2) {
      if (data.role === 'manager' || data.role === 'admin') return Boolean(data.organizationSize && data.organizationNeed);
      return data.subjects.length > 0 && data.studyTimes.length > 0 && data.preferredDays.length > 0;
    }
    if (activeStep === 3) return Boolean(data.fullName.trim());
    return true;
  }, [
    accountValidation.canContinue,
    activeStep,
    data.experience,
    data.fullName,
    data.organizationName,
    data.organizationNeed,
    data.organizationRole,
    data.organizationSize,
    data.preferredDays.length,
    data.qualification,
    data.role,
    data.studyTimes.length,
    data.subjects.length,
    data.target,
    data.timeline,
    goalLabel,
  ]);

  useEffect(() => {
    const draft = {
      ...data,
      password: '',
      confirmPassword: '',
    };

    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [data]);

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const markTouched = (key: string) => {
    setTouched((current) => ({ ...current, [key]: true }));
  };

  const toggleArrayValue = (key: 'subjects' | 'studyTimes' | 'preferredDays' | 'teachingFormats', value: string) => {
    setData((current) => {
      const active = current[key].includes(value);
      return {
        ...current,
        [key]: active ? current[key].filter((item) => item !== value) : [...current[key], value],
      };
    });
  };

  const nextStep = () => {
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      target: true,
      timeline: true,
      fullName: true,
    });

    if (!canGoNext) return;
    setActiveStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const previousStep = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const resolveDestination = (intent: 'discover' | 'booking') => {
    if (data.role === 'tutor') return '/tutor/dashboard';
    if (data.role === 'manager') return '/manager/dashboard';
    if (data.role === 'admin') return '/admin/dashboard';
    if (intent === 'discover') return '/tutors?recommended=true&source=onboarding';
    if (selectedSession) return `/schedule?resumeSession=${encodeURIComponent(selectedSession)}&next=payment`;
    if (returnTo) return returnTo;
    if (selectedTutor) return `/tutors/${encodeURIComponent(selectedTutor)}?booking=resume`;
    return '/schedule?source=onboarding&next=booking';
  };

  const completeSignup = (intent: 'discover' | 'booking') => {
    setIsSaving(true);
    const profileName = data.fullName.trim() || data.organizationName.trim() || `${roleDisplay} Account`;
    const roleGoal =
      data.role === 'student'
        ? goalSummary
        : data.role === 'tutor'
          ? `Teach ${data.subjects.slice(0, 2).join(', ') || 'academic subjects'}`
          : data.role === 'manager'
            ? `Manage ${data.organizationName || 'HaNova workspace'} operations`
            : `Administer ${data.organizationName || 'HaNova platform'}`;

    const userProfile = {
      name: profileName,
      email: data.email,
      initials: getInitials(profileName, data.email),
      role: roleDisplay,
      goal: roleGoal,
      subjects: data.subjects,
      notifications: data.notifications,
      learningStyle: data.learningStyle,
      budget: data.budget,
      accountRole: data.role,
      tutorProfile:
        data.role === 'tutor'
          ? {
              qualification: data.qualification,
              experience: data.experience,
              hourlyRate: data.hourlyRate,
              teachingFormats: data.teachingFormats,
            }
          : undefined,
      organization:
        isOrganizationRole
          ? {
              name: data.organizationName,
              role: data.organizationRole,
              size: data.organizationSize,
              need: data.organizationNeed,
            }
          : undefined,
      createdAt: new Date().toISOString(),
    };

    writeStoredUserProfile(userProfile);
    window.localStorage.removeItem(DRAFT_KEY);

    window.setTimeout(() => {
      setIsSaving(false);
      navigate(resolveDestination(intent));
    }, 650);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeStep < steps.length - 1) {
      nextStep();
      return;
    }
    completeSignup(selectedTutor || selectedSession || returnTo ? 'booking' : 'discover');
  };

  const errorFor = (field: 'email' | 'password' | 'confirmPassword' | 'fullName') => {
    if (!touched[field]) return '';
    if (field === 'email' && !accountValidation.emailValid) return 'Use a valid email so we can send booking reminders.';
    if (field === 'password' && !accountValidation.passwordValid) {
      return 'Password needs 8 characters, one uppercase letter, and one number.';
    }
    if (field === 'confirmPassword' && !accountValidation.confirmValid) return 'Passwords do not match yet.';
    if (field === 'fullName' && !data.fullName.trim()) return 'Add your name so tutors know how to address you.';
    return '';
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
      className="relative min-h-screen overflow-hidden px-5 pb-32 pt-24 text-white sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(139,92,246,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.45),rgba(17,24,39,0.18))]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

      <form onSubmit={handleSubmit} className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <aside className="order-2 min-w-0 lg:sticky lg:top-24 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-full overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-8"
          >
            <Link
              to="/"
              aria-label="Back to HaNova home"
              title="Back to home"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/[0.55] transition hover:border-cyan-200/30 hover:bg-cyan-200/[0.08] hover:text-white"
            >
              <Sparkles size={13} className="text-cyan-300" />
              HaNova Onboarding
            </Link>

            <h1 className="max-w-xl break-words font-serif text-3xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {sidebarTitle}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/[0.58] sm:text-base">
              {sidebarDescription}
            </p>

            <div className="mt-9 rounded-[26px] border border-white/10 bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Progress</span>
                <span className="text-xs text-white/[0.55]">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.55, ease }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-[0_0_22px_rgba(96,165,250,0.65)]"
                />
              </div>

              <div className="mt-6 space-y-3">
                {steps.map((stepItem, index) => {
                  const active = index === activeStep;
                  const complete = index < activeStep;

                  return (
                    <button
                      key={stepItem.id}
                      type="button"
                      onClick={() => index <= activeStep && setActiveStep(index)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                        active
                          ? 'border-cyan-300/35 bg-cyan-300/[0.08] shadow-[0_0_28px_rgba(34,211,238,0.12)]'
                          : complete
                            ? 'border-emerald-300/20 bg-emerald-300/[0.04]'
                            : 'border-white/5 bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                            complete
                              ? 'border-emerald-300/30 bg-emerald-300/15 text-emerald-200'
                              : active
                                ? 'border-cyan-200/40 bg-white/10 text-white'
                                : 'border-white/10 bg-white/[0.03] text-white/35'
                          }`}
                        >
                          {complete ? <Check size={15} /> : index + 1}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-white/[0.62]'}`}>{stepItem.label}</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/28">{stepItem.eyebrow}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: 'Secure account' },
                { icon: CalendarDays, label: 'Booking ready' },
                { icon: WalletCards, label: 'VNPay / MoMo' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                  <item.icon size={16} className="mb-2 text-white/[0.55]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/[0.36]">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </aside>

        <section className="order-1 min-w-0 overflow-hidden rounded-[36px] border border-white/[0.12] bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(10,15,30,0.58))] shadow-[0_34px_110px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:order-2">
          <div className="border-b border-white/10 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/55">{steps[activeStep].eyebrow}</p>
                <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">{steps[activeStep].label}</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/50">
                <CheckCircle2 size={14} className="text-emerald-300" />
                Auto-saving progress
              </div>
            </div>
          </div>

          <div className="min-h-[650px] px-5 py-6 sm:px-8 sm:py-8">
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <StepShell key="account" title="Create your account" subtitle="Choose your role first so HaNova can create the right registration path.">
                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">Register as</p>
                    <div className="grid gap-3 lg:grid-cols-3">
                      {roleOptions.map((role) => {
                        const active = data.role === role.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => {
                              update('role', role.id);
                              setTouched({});
                            }}
                            className={`rounded-3xl border p-5 text-left transition-all duration-300 ${
                              active
                                ? 'border-cyan-300/35 bg-cyan-300/[0.08] shadow-[0_0_28px_rgba(34,211,238,0.12)]'
                                : 'border-white/[0.08] bg-white/[0.025] hover:border-white/[0.18] hover:bg-white/[0.045]'
                            }`}
                          >
                            <div className="mb-4 flex items-center justify-between">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${active ? 'bg-cyan-300/15 text-cyan-100' : 'bg-white/[0.055] text-white/45'}`}>
                                <role.icon size={19} />
                              </div>
                              {active && <CheckCircle2 size={18} className="text-cyan-200" />}
                            </div>
                            <p className="text-sm font-semibold text-white">{role.title}</p>
                            <p className="mt-2 text-xs leading-5 text-white/[0.42]">{role.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setSocialNotice('Google sign-up is not connected in this demo. Continue with email to create any role workspace.')}
                      className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white/[0.82] transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-black">G</span>
                      Continue with Google
                    </button>
                    <button
                      type="button"
                      onClick={() => setSocialNotice('Facebook sign-up is not connected in this demo. Continue with email to create any role workspace.')}
                      className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/[0.07]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-sm font-bold text-white">f</span>
                      Continue with Facebook
                    </button>
                  </div>

                  <AnimatePresence>
                    {socialNotice && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="rounded-2xl border border-cyan-200/18 bg-cyan-200/[0.08] px-4 py-3 text-xs font-medium leading-5 text-cyan-50"
                      >
                        {socialNotice}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/32">or use email</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <Field
                    icon={Mail}
                    label="Email"
                    error={errorFor('email')}
                    success={touched.email && accountValidation.emailValid}
                  >
                    <input
                      value={data.email}
                      onBlur={() => markTouched('email')}
                      onChange={(event) => update('email', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                      placeholder="student@hanova.vn"
                      type="email"
                      autoComplete="email"
                    />
                  </Field>

                  <Field
                    icon={ShieldCheck}
                    label="Password"
                    error={errorFor('password')}
                    success={touched.password && accountValidation.passwordValid}
                  >
                    <input
                      value={data.password}
                      onBlur={() => markTouched('password')}
                      onChange={(event) => update('password', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                      placeholder="Create a secure password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </Field>

                  <div className="grid gap-2 sm:grid-cols-3">
                    {[
                      { done: accountValidation.passwordRules[0], label: '8+ characters' },
                      { done: accountValidation.passwordRules[1], label: 'Uppercase' },
                      { done: accountValidation.passwordRules[2], label: 'Number' },
                    ].map((rule) => (
                      <div
                        key={rule.label}
                        className={`rounded-full border px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.13em] ${
                          rule.done
                            ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-200'
                            : 'border-white/[0.08] bg-white/[0.025] text-white/30'
                        }`}
                      >
                        {rule.label}
                      </div>
                    ))}
                  </div>

                  <Field
                    icon={ShieldCheck}
                    label="Confirm password"
                    error={errorFor('confirmPassword')}
                    success={touched.confirmPassword && accountValidation.confirmValid}
                  >
                    <input
                      value={data.confirmPassword}
                      onBlur={() => markTouched('confirmPassword')}
                      onChange={(event) => update('confirmPassword', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                      placeholder="Repeat password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </Field>

                  <div className="rounded-3xl border border-indigo-300/15 bg-indigo-300/[0.055] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                        <SelectedRoleIcon size={18} className="text-cyan-200" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{roleDisplay} registration selected</p>
                        <p className="mt-1 text-xs leading-6 text-white/45">
                          {data.role === 'student'
                            ? 'This account will feed tutor discovery, booking, study plan generation, and reminders.'
                            : data.role === 'tutor'
                              ? 'Next steps collect teaching subjects, credentials, availability, rates, and profile details for review.'
                              : 'Next steps collect organization details, management needs, and owner contact information.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-white/45 sm:flex-row sm:gap-4">
                    <span>
                      Already have an account?{' '}
                      <Link to="/signin" className="font-semibold text-white transition hover:text-cyan-200">
                        Log in
                      </Link>
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
                    <Link to="/forgot-password" className="font-semibold text-white/[0.72] transition hover:text-cyan-200">
                      Forgot password?
                    </Link>
                  </div>
                </StepShell>
              )}

              {activeStep === 1 && (
                <StepShell
                  key="goals"
                  title={
                    data.role === 'student'
                      ? 'What do you want to achieve?'
                      : data.role === 'tutor'
                        ? 'What do you teach?'
                        : data.role === 'manager'
                          ? 'Tell us about your organization'
                          : 'Tell us about your admin scope'
                  }
                  subtitle={
                    data.role === 'student'
                      ? 'This becomes the first input for tutor matching and Study Plan generation.'
                      : data.role === 'tutor'
                        ? 'These details help HaNova verify your expertise and match you with the right learners.'
                        : data.role === 'manager'
                          ? 'This creates the workspace context for schedules, tutors, learners, and reporting.'
                          : 'This creates the platform context for users, roles, security policy, and audit ownership.'
                  }
                >
                  {data.role === 'student' ? (
                  <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {goalOptions.map((goal) => {
                      const active = data.goal === goal.id;
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => update('goal', goal.id)}
                          className={`rounded-3xl border p-5 text-left transition-all duration-300 ${
                            active
                              ? 'border-cyan-300/35 bg-cyan-300/[0.08] shadow-[0_0_28px_rgba(34,211,238,0.12)]'
                              : 'border-white/[0.08] bg-white/[0.025] hover:border-white/[0.18] hover:bg-white/[0.045]'
                          }`}
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${active ? 'bg-cyan-300/15 text-cyan-100' : 'bg-white/[0.055] text-white/45'}`}>
                              <goal.icon size={19} />
                            </div>
                            {active && <CheckCircle2 size={18} className="text-cyan-200" />}
                          </div>
                          <p className="text-sm font-semibold text-white">{goal.title}</p>
                          <p className="mt-2 text-xs leading-5 text-white/[0.42]">{goal.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {data.goal === 'Other' && (
                    <Field icon={Sparkles} label="Custom goal">
                      <input
                        value={data.customGoal}
                        onChange={(event) => update('customGoal', event.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                        placeholder="Example: Improve academic writing for university applications"
                      />
                    </Field>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field icon={Target} label="Target">
                      <input
                        value={data.target}
                        onBlur={() => markTouched('target')}
                        onChange={(event) => update('target', event.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                        placeholder="IELTS 6.5, GPA 8.5, TOEIC 750..."
                      />
                    </Field>
                    <Field icon={CalendarDays} label="Timeline">
                      <input
                        value={data.timeline}
                        onBlur={() => markTouched('timeline')}
                        onChange={(event) => update('timeline', event.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                        placeholder="3 months, 8 weeks..."
                      />
                    </Field>
                  </div>

                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">Current level</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {levelOptions.map((level) => (
                        <ChoiceButton
                          key={level}
                          active={data.currentLevel === level}
                          label={level}
                          onClick={() => update('currentLevel', level)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/[0.045] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200/60">Study Plan Preview</p>
                    <p className="mt-3 font-serif text-2xl text-white">Your goal: {goalSummary}</p>
                    <p className="mt-2 text-xs leading-6 text-white/45">
                      HaNova will use this to generate milestones, weekly study focus, and tutor recommendations.
                    </p>
                  </div>
                  </>
                  ) : data.role === 'tutor' ? (
                  <>
                    <ChipGroup
                      label="Subjects you teach"
                      values={subjectOptions}
                      selected={data.subjects}
                      onToggle={(value) => toggleArrayValue('subjects', value)}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field icon={GraduationCap} label="Qualification">
                        <input
                          value={data.qualification}
                          onChange={(event) => update('qualification', event.target.value)}
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                          placeholder="Bachelor, Master, IELTS 8.0, industry certificate..."
                        />
                      </Field>
                      <Field icon={BriefcaseBusiness} label="Teaching experience">
                        <input
                          value={data.experience}
                          onChange={(event) => update('experience', event.target.value)}
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                          placeholder="3 years, 200+ hours, classroom mentor..."
                        />
                      </Field>
                    </div>

                    <ChipGroup
                      label="Teaching formats"
                      values={teachingFormatOptions}
                      selected={data.teachingFormats}
                      onToggle={(value) => toggleArrayValue('teachingFormats', value)}
                    />

                    <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/[0.045] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200/60">Tutor verification preview</p>
                      <p className="mt-3 font-serif text-2xl text-white">
                        Teach {data.subjects.slice(0, 2).join(', ') || 'your strongest subjects'}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-white/45">
                        HaNova will use this for profile review, tutor discovery ranking, and booking recommendations.
                      </p>
                    </div>
                  </>
                  ) : (
                  <>
	                    <Field icon={Building2} label={data.role === 'manager' ? 'Organization name' : 'Platform or organization name'}>
                      <input
                        value={data.organizationName}
                        onChange={(event) => update('organizationName', event.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
	                        placeholder={data.role === 'manager' ? 'HaNova Academy, school, center, or department' : 'HaNova Platform, security team, or organization'}
                      />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field icon={User} label="Your role">
                        <input
                          value={data.organizationRole}
                          onChange={(event) => update('organizationRole', event.target.value)}
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
	                          placeholder={data.role === 'manager' ? 'Academic manager, operations lead...' : 'Platform admin, security lead...'}
                        />
                      </Field>
                      <Field icon={BriefcaseBusiness} label="Primary need">
                        <input
                          value={data.organizationNeed}
                          onChange={(event) => update('organizationNeed', event.target.value)}
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
	                          placeholder={data.role === 'manager' ? 'Tutor scheduling, learner progress, payments...' : 'Role governance, audit logs, security policy...'}
                        />
                      </Field>
                    </div>

                    <div>
	                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">{data.role === 'manager' ? 'Organization size' : 'Admin coverage'}</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {organizationSizeOptions.map((size) => (
                          <ChoiceButton
                            key={size}
                            active={data.organizationSize === size}
                            label={size}
                            onClick={() => update('organizationSize', size)}
                          />
                        ))}
                      </div>
                    </div>

	                    <div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/[0.045] p-5">
	                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200/60">{data.role === 'manager' ? 'Workspace preview' : 'Admin console preview'}</p>
	                      <p className="mt-3 font-serif text-2xl text-white">
	                        {data.organizationName || (data.role === 'manager' ? 'Your organization' : 'HaNova platform')} {data.role === 'manager' ? 'workspace' : 'console'}
	                      </p>
	                      <p className="mt-2 text-xs leading-6 text-white/45">
	                        {data.role === 'manager'
                            ? 'HaNova will prepare controls for tutor operations, schedules, student progress, and billing.'
                            : 'HaNova will prepare controls for users, roles, security policies, audit logs, and platform configuration.'}
	                      </p>
                    </div>
                  </>
                  )}
                </StepShell>
              )}

              {activeStep === 2 && (
                <StepShell
                  key="preferences"
                  title={
                    data.role === 'student'
                      ? 'Choose your learning preferences'
                      : data.role === 'tutor'
                        ? 'Set availability and rates'
                        : data.role === 'manager'
                          ? 'Choose workspace priorities'
                          : 'Choose admin priorities'
                  }
                  subtitle={
                    data.role === 'student'
                      ? 'Keep it quick. These choices help scheduling, booking, and reminders feel personal.'
                      : data.role === 'tutor'
                        ? 'This helps HaNova show your open slots and quote the right price before payment.'
                        : data.role === 'manager'
                          ? 'These choices shape operational dashboard defaults, notifications, and manager workflows.'
                          : 'These choices shape user governance, audit visibility, and platform security workflows.'
                  }
                >
                  {data.role === 'student' ? (
                  <>
                  <ChipGroup
                    label="Preferred subjects"
                    values={subjectOptions}
                    selected={data.subjects}
                    onToggle={(value) => toggleArrayValue('subjects', value)}
                  />

                  <div className="grid gap-5 lg:grid-cols-2">
                    <ChipGroup
                      label="Preferred study time"
                      values={timeOptions}
                      selected={data.studyTimes}
                      onToggle={(value) => toggleArrayValue('studyTimes', value)}
                    />
                    <ChipGroup
                      label="Preferred days"
                      values={dayOptions}
                      selected={data.preferredDays}
                      onToggle={(value) => toggleArrayValue('preferredDays', value)}
                    />
                  </div>

                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">Budget range</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {budgetOptions.map((budget) => (
                        <ChoiceButton
                          key={budget}
                          active={data.budget === budget}
                          label={budget}
                          onClick={() => update('budget', budget)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">Learning style</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(['Structured plan', 'Flexible sessions'] as LearningStyle[]).map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => update('learningStyle', style)}
                          className={`rounded-3xl border p-5 text-left transition-all duration-300 ${
                            data.learningStyle === style
                              ? 'border-violet-300/35 bg-violet-300/[0.08]'
                              : 'border-white/[0.08] bg-white/[0.025] hover:border-white/[0.18] hover:bg-white/[0.045]'
                          }`}
                        >
                          <p className="text-sm font-semibold text-white">{style}</p>
                          <p className="mt-2 text-xs leading-5 text-white/[0.42]">
                            {style === 'Structured plan'
                              ? 'Best for exam targets, weekly milestones, and progress reports.'
                              : 'Best for adaptive tutoring, homework review, and changing priorities.'}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="mb-4 flex items-start gap-3">
                      <Bell size={18} className="mt-0.5 text-cyan-200" />
                      <div>
                        <p className="text-sm font-semibold text-white">How would you like to receive reminders?</p>
                        <p className="mt-1 text-xs text-white/40">Both are on by default for booking, payment, and session events.</p>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <ToggleCard
                        icon={Mail}
                        title="Email"
                        active={data.notifications.email}
                        onClick={() =>
                          update('notifications', { ...data.notifications, email: !data.notifications.email })
                        }
                      />
                      <ToggleCard
                        icon={Bell}
                        title="In-app notifications"
                        active={data.notifications.inApp}
                        onClick={() =>
                          update('notifications', { ...data.notifications, inApp: !data.notifications.inApp })
                        }
                      />
                    </div>
                  </div>
                  </>
                  ) : data.role === 'tutor' ? (
                  <>
                    <div className="grid gap-5 lg:grid-cols-2">
                      <ChipGroup
                        label="Available teaching time"
                        values={timeOptions}
                        selected={data.studyTimes}
                        onToggle={(value) => toggleArrayValue('studyTimes', value)}
                      />
                      <ChipGroup
                        label="Teaching days"
                        values={dayOptions}
                        selected={data.preferredDays}
                        onToggle={(value) => toggleArrayValue('preferredDays', value)}
                      />
                    </div>

                    <div>
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">Hourly rate</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {budgetOptions.map((budget) => (
                          <ChoiceButton
                            key={budget}
                            active={data.hourlyRate === budget}
                            label={budget}
                            onClick={() => update('hourlyRate', budget)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="mb-4 flex items-start gap-3">
                        <CalendarDays size={18} className="mt-0.5 text-cyan-200" />
                        <div>
                          <p className="text-sm font-semibold text-white">Booking setup</p>
                          <p className="mt-1 text-xs text-white/40">
                            Students will see your preferred time, available days, and rate during booking.
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <ToggleCard
                          icon={Mail}
                          title="Email booking alerts"
                          active={data.notifications.email}
                          onClick={() =>
                            update('notifications', { ...data.notifications, email: !data.notifications.email })
                          }
                        />
                        <ToggleCard
                          icon={Bell}
                          title="In-app booking alerts"
                          active={data.notifications.inApp}
                          onClick={() =>
                            update('notifications', { ...data.notifications, inApp: !data.notifications.inApp })
                          }
                        />
                      </div>
                    </div>
                  </>
                  ) : (
                  <>
                    <div>
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">{data.role === 'manager' ? 'Workspace priority' : 'Admin priority'}</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {(data.role === 'manager' ? organizationNeedOptions : adminNeedOptions).map((need) => (
                          <ChoiceButton
                            key={need}
                            active={data.organizationNeed === need}
                            label={need}
                            onClick={() => update('organizationNeed', need)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">{data.role === 'manager' ? 'Workspace size' : 'Platform scope'}</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {organizationSizeOptions.map((size) => (
                          <ChoiceButton
                            key={size}
                            active={data.organizationSize === size}
                            label={size}
                            onClick={() => update('organizationSize', size)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <div className="mb-4 flex items-start gap-3">
                        <Bell size={18} className="mt-0.5 text-cyan-200" />
                        <div>
                          <p className="text-sm font-semibold text-white">{data.role === 'manager' ? 'Manager notifications' : 'Admin notifications'}</p>
                          <p className="mt-1 text-xs text-white/40">
                            {data.role === 'manager'
                              ? 'Keep booking, payment, complaint, and tutor review events visible for managers.'
                              : 'Keep role, security, audit, and platform configuration events visible for admins.'}
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <ToggleCard
                          icon={Mail}
                          title="Email updates"
                          active={data.notifications.email}
                          onClick={() =>
                            update('notifications', { ...data.notifications, email: !data.notifications.email })
                          }
                        />
                        <ToggleCard
                          icon={Bell}
                          title="In-app updates"
                          active={data.notifications.inApp}
                          onClick={() =>
                            update('notifications', { ...data.notifications, inApp: !data.notifications.inApp })
                          }
                        />
                      </div>
                    </div>
                  </>
                  )}
                </StepShell>
              )}

              {activeStep === 3 && (
                <StepShell
                  key="profile"
                  title={
                    data.role === 'student'
                      ? 'Set up your profile'
                      : data.role === 'tutor'
                        ? 'Set up your tutor profile'
                        : data.role === 'manager'
                          ? 'Set up the manager profile'
                          : 'Set up the admin profile'
                  }
                  subtitle={
                    data.role === 'student'
                      ? 'A lightweight profile helps tutors prepare before your first session.'
                      : data.role === 'tutor'
                        ? 'This public-facing profile helps students trust your teaching style before booking.'
                        : data.role === 'manager'
                          ? 'This contact profile helps HaNova identify the manager responsible for daily operations.'
                          : 'This profile identifies the admin responsible for platform governance and audit decisions.'
                  }
                >
                  <Field icon={User} label={isOrganizationRole ? 'Account owner name' : 'Full name'} error={errorFor('fullName')} success={Boolean(data.fullName.trim())}>
                    <input
                      value={data.fullName}
                      onBlur={() => markTouched('fullName')}
                      onChange={(event) => update('fullName', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                      placeholder={data.role === 'tutor' ? 'Dr. Nguyen Lan Anh' : data.role === 'manager' ? 'Tran Minh, Academic Manager' : data.role === 'admin' ? 'Pham Gia Bao, Platform Admin' : 'Nguyen Minh Anh'}
                      autoComplete="name"
                    />
                  </Field>

                  <label className="block rounded-3xl border border-dashed border-white/[0.14] bg-white/[0.025] p-5 transition hover:border-cyan-200/35 hover:bg-white/[0.045]">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        update('avatarName', event.target.files?.[0]?.name ?? '')
                      }
                    />
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06]">
                        <Upload size={20} className="text-white/[0.55]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{isOrganizationRole ? 'Organization or owner avatar optional' : 'Avatar upload optional'}</p>
                        <p className="mt-1 text-xs text-white/40">{data.avatarName || 'PNG or JPG. You can skip this for now.'}</p>
                      </div>
                    </div>
                  </label>

                  <div>
                    <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">
                      {data.role === 'tutor' ? 'Teaching bio optional' : isOrganizationRole ? 'Workspace note optional' : 'Short bio optional'}
                    </label>
                    <textarea
                      value={data.bio}
                      onChange={(event) => update('bio', event.target.value)}
                      className="min-h-28 w-full resize-none rounded-3xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/[0.24] focus:border-cyan-200/35 focus:bg-white/[0.055]"
                      placeholder={
                        data.role === 'tutor'
                          ? 'Example: I help Vietnamese students prepare for IELTS speaking with structured feedback.'
                          : data.role === 'manager'
                            ? 'Example: We manage after-school tutoring for Grade 10-12 students.'
                            : data.role === 'admin'
                              ? 'Example: I manage platform access, security policies, and audit readiness.'
                            : 'Example: I am preparing for IELTS while balancing school assignments. I prefer calm, structured sessions.'
                      }
                    />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                    <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.045] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-100/60">
	                        {data.role === 'student' ? 'Learning goal summary' : data.role === 'tutor' ? 'Tutor setup summary' : data.role === 'manager' ? 'Manager workspace summary' : 'Admin console summary'}
                      </p>
                      <p className="mt-3 font-serif text-2xl text-white">{accountSummary}</p>
                      <p className="mt-2 text-xs leading-6 text-white/45">
                        {data.role === 'student'
                          ? 'This will appear in your study plan and give recommended tutors useful context.'
                          : data.role === 'tutor'
                            ? 'This will help students understand your teaching scope and booking expectations.'
	                            : data.role === 'manager'
                              ? 'This will shape the manager dashboard and operational defaults.'
                              : 'This will shape the admin console, role governance, and audit defaults.'}
                      </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.34]">Profile preview</p>
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-300/30 to-violet-400/30 font-serif text-xl text-white">
                          {getInitials(data.fullName, data.email)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-base font-semibold text-white">{data.fullName || `${roleDisplay} Account`}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/[0.36]">{roleDisplay} profile</p>
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/[0.42]">{accountSummary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </StepShell>
              )}

              {activeStep === 4 && (
                <StepShell
                  key="review"
                  title={
                    data.role === 'student'
                      ? 'Review and continue'
                      : data.role === 'tutor'
                        ? 'Review and apply'
                        : data.role === 'manager'
                          ? 'Review and create manager workspace'
                          : 'Review and create admin console'
                  }
                  subtitle={
                    data.role === 'student'
                      ? 'You are just a few steps away from your first session.'
                      : data.role === 'tutor'
                        ? 'Your tutor account will be ready for review and scheduling setup.'
                        : data.role === 'manager'
                          ? 'Your manager account will be ready to coordinate tutors, students, bookings, payments, reviews, and complaints.'
                          : 'Your admin account will be ready to govern users, roles, security, audit logs, and platform configuration.'
                  }
                >
                  {data.role === 'student' ? (
                  <>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <SummaryCard title="Learning goal" icon={Target}>
                      <p className="font-serif text-2xl text-white">{goalSummary}</p>
                      <p className="mt-2 text-xs leading-6 text-white/[0.42]">
                        Current level: {data.currentLevel}. Learning style: {data.learningStyle}.
                      </p>
                    </SummaryCard>

                    <SummaryCard title="Preferences" icon={CalendarDays}>
                      <p className="text-sm text-white">{data.subjects.join(', ')}</p>
                      <p className="mt-2 text-xs leading-6 text-white/[0.42]">
                        {data.studyTimes.join(', ')} on {data.preferredDays.join(', ')}. Budget: {data.budget}.
                      </p>
                    </SummaryCard>

                    <SummaryCard title="Suggested tutor types" icon={GraduationCap}>
                      <div className="flex flex-wrap gap-2">
                        {[
                          `${data.currentLevel} friendly`,
                          data.learningStyle,
                          `${data.subjects[0] ?? 'Academic'} specialist`,
                        ].map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/[0.56]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </SummaryCard>

                    <SummaryCard title="System alignment" icon={CreditCard}>
                      <div className="space-y-2 text-xs leading-6 text-white/45">
                        <p>Study Plan receives goals and timeline.</p>
                        <p>Booking uses days, time, budget, and tutor fit.</p>
                        <p>Payment resumes with VNPay or MoMo after schedule selection.</p>
                      </div>
                    </SummaryCard>
                  </div>

                  <div className="rounded-[30px] border border-emerald-300/15 bg-emerald-300/[0.045] p-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200/60">Smart personalization ready</p>
                        <p className="mt-3 font-serif text-2xl text-white">Based on your goal, HaNova can show 3 best-fit tutors first.</p>
                        <p className="mt-2 text-xs leading-6 text-white/45">
                          Recommended time slots and study plan milestones will be available immediately after signup.
                        </p>
                      </div>
                      <div className="grid min-w-[230px] gap-2 text-xs text-white/50">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
                          <CheckCircle2 size={14} className="text-emerald-300" />
                          Email reminders {data.notifications.email ? 'on' : 'off'}
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">
                          <CheckCircle2 size={14} className="text-emerald-300" />
                          In-app reminders {data.notifications.inApp ? 'on' : 'off'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => completeSignup('discover')}
                      disabled={isSaving}
                      className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-50 disabled:cursor-wait disabled:opacity-70"
                    >
                      Start exploring tutors
                      <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => completeSignup('booking')}
                      disabled={isSaving}
                      className="group flex items-center justify-center gap-3 rounded-2xl border border-white/[0.14] bg-white/[0.05] px-5 py-4 text-sm font-bold text-white transition hover:bg-white/[0.08] disabled:cursor-wait disabled:opacity-70"
                    >
                      Continue to booking
                      <ChevronRight size={17} className="transition group-hover:translate-x-0.5" />
                    </button>
                  </div>
                  </>
                  ) : data.role === 'tutor' ? (
                  <>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <SummaryCard title="Tutor account" icon={School}>
                        <p className="font-serif text-2xl text-white">{data.fullName || 'Tutor profile'}</p>
                        <p className="mt-2 text-xs leading-6 text-white/[0.42]">
                          {data.qualification || 'Qualification pending'} • {data.experience || 'Experience pending'}
                        </p>
                      </SummaryCard>

                      <SummaryCard title="Teaching expertise" icon={BookOpen}>
                        <p className="text-sm text-white">{data.subjects.join(', ') || 'No subjects selected'}</p>
                        <p className="mt-2 text-xs leading-6 text-white/[0.42]">
                          Formats: {data.teachingFormats.join(', ')}.
                        </p>
                      </SummaryCard>

                      <SummaryCard title="Booking setup" icon={CalendarDays}>
                        <p className="text-sm text-white">
                          {data.studyTimes.join(', ')} on {data.preferredDays.join(', ')}
                        </p>
                        <p className="mt-2 text-xs leading-6 text-white/[0.42]">Rate: {data.hourlyRate}</p>
                      </SummaryCard>

                      <SummaryCard title="Next system step" icon={CreditCard}>
                        <div className="space-y-2 text-xs leading-6 text-white/45">
                          <p>Profile goes to tutor verification.</p>
                          <p>Availability connects to booking requests.</p>
                          <p>Payout/payment setup can be completed from tutor dashboard.</p>
                        </div>
                      </SummaryCard>
                    </div>

                    <div className="rounded-[30px] border border-emerald-300/15 bg-emerald-300/[0.045] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200/60">Tutor onboarding ready</p>
                      <p className="mt-3 font-serif text-2xl text-white">HaNova can now prepare your tutor dashboard.</p>
                      <p className="mt-2 text-xs leading-6 text-white/45">
                        You will continue to schedule, booking requests, tutor profile, and student management.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => completeSignup('booking')}
                      disabled={isSaving}
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-50 disabled:cursor-wait disabled:opacity-70"
                    >
                      Create tutor account
                      <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
                    </button>
                  </>
                  ) : (
                  <>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <SummaryCard title={data.role === 'manager' ? 'Manager account' : 'Admin account'} icon={User}>
                        <p className="font-serif text-2xl text-white">{data.fullName || (data.role === 'manager' ? 'Workspace owner' : 'Platform admin')}</p>
                        <p className="mt-2 text-xs leading-6 text-white/[0.42]">{data.organizationRole || 'Organization role pending'}</p>
                      </SummaryCard>

                      <SummaryCard title="Organization" icon={Building2}>
                        <p className="text-sm text-white">{data.organizationName || 'Organization name pending'}</p>
                        <p className="mt-2 text-xs leading-6 text-white/[0.42]">
                          {data.organizationSize} • {data.organizationNeed}
                        </p>
                      </SummaryCard>

                      <SummaryCard title={data.role === 'manager' ? 'Manager modules' : 'Admin modules'} icon={BriefcaseBusiness}>
                        <div className="flex flex-wrap gap-2">
                          {(data.role === 'manager' ? ['Tutors', 'Bookings', 'Payments', 'Complaints'] : ['Users', 'Roles', 'Audit', 'Security']).map((item) => (
                            <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/[0.56]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </SummaryCard>

                      <SummaryCard title="Notification setup" icon={Bell}>
                        <div className="space-y-2 text-xs leading-6 text-white/45">
                          <p>Email updates {data.notifications.email ? 'on' : 'off'}.</p>
                          <p>In-app updates {data.notifications.inApp ? 'on' : 'off'}.</p>
                          <p>{data.role === 'manager' ? 'Events align with bookings, payments, and tutor review.' : 'Events align with role changes, security policy, and audit logs.'}</p>
                        </div>
                      </SummaryCard>
                    </div>

                    <div className="rounded-[30px] border border-emerald-300/15 bg-emerald-300/[0.045] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200/60">{data.role === 'manager' ? 'Workspace ready' : 'Admin console ready'}</p>
                      <p className="mt-3 font-serif text-2xl text-white">{data.role === 'manager' ? `Create a manager workspace for ${data.organizationName || 'your organization'}.` : `Create an admin console for ${data.organizationName || 'HaNova platform'}.`}</p>
                      <p className="mt-2 text-xs leading-6 text-white/45">
                        {data.role === 'manager'
                          ? 'The dashboard can support tutor operations, student progress, schedules, and payments.'
                          : 'The console can support platform users, roles, security, audit logs, and system configuration.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => completeSignup('booking')}
                      disabled={isSaving}
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-50 disabled:cursor-wait disabled:opacity-70"
                    >
                      {data.role === 'manager' ? 'Create manager account' : 'Create admin account'}
                      <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
                    </button>
                  </>
                  )}
                </StepShell>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={previousStep}
              disabled={activeStep === 0}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white/60 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {activeStep < steps.length - 1 ? (
              <button
                type="submit"
                disabled={!canGoNext}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Continue
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs text-white/[0.42]">
                {isSaving ? (
                  <>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                    Creating your personalized space...
                  </>
                ) : (
                  <>
                    <Moon size={14} />
                    Profile menu will appear at the top-right after signup.
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </form>
    </motion.main>
  );
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28 }}
      transition={{ duration: 0.45, ease }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-serif text-3xl text-white sm:text-4xl">{title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/[0.48]">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}

function Field({
  icon: Icon,
  label,
  error,
  success,
  children,
}: {
  icon: LucideIcon;
  label: string;
  error?: string;
  success?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">{label}</label>
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white/[0.035] px-4 py-3.5 transition-all ${
          error
            ? 'border-red-300/35 bg-red-300/[0.05]'
            : success
              ? 'border-emerald-300/30 bg-emerald-300/[0.04]'
              : 'border-white/10 focus-within:border-cyan-200/35 focus-within:bg-white/[0.055]'
        }`}
      >
        <Icon size={17} className={error ? 'text-red-200' : success ? 'text-emerald-200' : 'text-white/[0.36]'} />
        {children}
        {success && <CheckCircle2 size={16} className="shrink-0 text-emerald-200" />}
      </div>
      {error && <p className="mt-2 text-xs leading-5 text-red-200/80">{error}</p>}
    </div>
  );
}

function ChoiceButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
        active
          ? 'border-cyan-300/35 bg-cyan-300/[0.08] text-white'
          : 'border-white/[0.08] bg-white/[0.025] text-white/[0.48] hover:border-white/[0.18] hover:bg-white/[0.045] hover:text-white/[0.75]'
      }`}
    >
      {label}
    </button>
  );
}

function ChipGroup({
  label,
  values,
  selected,
  onToggle,
}: {
  label: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => {
          const active = selected.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => onToggle(value)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                active
                  ? 'border-cyan-300/35 bg-cyan-300/[0.1] text-white shadow-[0_0_18px_rgba(34,211,238,0.1)]'
                  : 'border-white/10 bg-white/[0.025] text-white/[0.48] hover:border-white/20 hover:text-white/[0.75]'
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleCard({
  icon: Icon,
  title,
  active,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all ${
        active ? 'border-emerald-300/25 bg-emerald-300/[0.06]' : 'border-white/10 bg-white/[0.025]'
      }`}
    >
      <span className="flex items-center gap-3 text-sm font-semibold text-white">
        <Icon size={16} className={active ? 'text-emerald-200' : 'text-white/[0.38]'} />
        {title}
      </span>
      <span className={`h-5 w-9 rounded-full border p-0.5 transition ${active ? 'border-emerald-300/35 bg-emerald-300/20' : 'border-white/[0.12] bg-white/5'}`}>
        <span className={`block h-3.5 w-3.5 rounded-full transition ${active ? 'translate-x-4 bg-emerald-200' : 'bg-white/35'}`} />
      </span>
    </button>
  );
}

function SummaryCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.028] p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06]">
          <Icon size={17} className="text-cyan-200" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.38]">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default SignUp;
