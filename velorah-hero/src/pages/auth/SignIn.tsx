import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle2, GraduationCap, LockKeyhole, Mail, School, ShieldCheck, type LucideIcon } from 'lucide-react';
import AuthShell from '../../components/auth/AuthShell';
import { demoAccounts, findDemoAccount, type DemoAccountRole, writeStoredUserProfile } from '../../utils/helpers';
const roleIcons: Record<DemoAccountRole, LucideIcon> = {
  student: GraduationCap,
  tutor: School,
  manager: Building2,
  admin: ShieldCheck,
};

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const passwordValid = password.length >= 8;
  const canSubmit = emailValid && passwordValid;

  const markTouched = (field: string) => {
    setTouched((current) => ({ ...current, [field]: true }));
  };

  const errorFor = (field: 'email' | 'password') => {
    if (!touched[field]) return '';
    if (field === 'email' && !emailValid) return 'Use the email connected to your HaNova account.';
    if (field === 'password' && !passwordValid) return 'Password must have at least 8 characters.';
    return '';
  };

  const createSessionProfile = (account: (typeof demoAccounts)[number]) => {
    writeStoredUserProfile({
      name: account.name,
      email: account.email,
      initials: account.initials,
      role: account.label,
      goal: account.goal,
      remember,
      accountRole: account.role,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    const account = findDemoAccount(email, password);
    if (!account) {
      setAuthError('Sai tài khoản hoặc mật khẩu demo. Hãy dùng một trong các tài khoản bên dưới.');
      return;
    }

    setLoading(true);
    setAuthError('');
    window.setTimeout(() => {
      createSessionProfile(account);
      setLoading(false);
      navigate(account.redirectTo);
    }, 850);
  };

  return (
    <AuthShell
      eyebrow="HaNova Access"
      title="Welcome back to your learning space."
      description="Continue from your dashboard, upcoming sessions, study plan, and booking updates without losing context."
      panelEyebrow="Login"
      panelTitle="Sign in"
      panelDescription="Use your HaNova account to return to tutors, schedule, payments, and reminders."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <SocialButton label="Continue with Google" mark="G" />
          <SocialButton label="Continue with Facebook" mark="f" brandColor="#1877F2" />
        </div>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.32]">or use email</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <AuthField icon={Mail} label="Email" error={errorFor('email')} success={touched.email && emailValid}>
          <input
            value={email}
            onBlur={() => markTouched('email')}
            onChange={(event) => {
              setEmail(event.target.value);
              setAuthError('');
            }}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
            placeholder="student@hanova.vn"
            type="email"
            autoComplete="email"
          />
        </AuthField>

        <AuthField icon={LockKeyhole} label="Password" error={errorFor('password')} success={touched.password && passwordValid}>
          <input
            value={password}
            onBlur={() => markTouched('password')}
            onChange={(event) => {
              setPassword(event.target.value);
              setAuthError('');
            }}
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
          />
        </AuthField>

        {authError && (
          <div className="rounded-2xl border border-red-300/25 bg-red-300/[0.06] px-4 py-3 text-sm text-red-100/85">
            {authError}
          </div>
        )}

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck size={18} className="text-cyan-200" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Demo accounts by role</p>
              <p className="mt-1 text-xs leading-6 text-white/[0.45]">
                Click one card to autofill email and password for testing.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {demoAccounts.map((account) => {
              const Icon = roleIcons[account.role];
              return (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                    setAuthError('');
                    setTouched({});
                  }}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-left transition hover:border-cyan-200/25 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-200/[0.08] text-cyan-100">
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{account.label}</p>
                        <p className="mt-1 text-xs text-white/[0.48]">{account.name}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/[0.5]">
                      Use
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/[0.34]">Email</p>
                      <p className="mt-1 font-mono text-xs text-cyan-100">{account.email}</p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-black/20 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/[0.34]">Password</p>
                      <p className="mt-1 font-mono text-xs text-cyan-100">{account.password}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setRemember((current) => !current)}
            className="flex items-center gap-3 text-left text-sm text-white/[0.56] transition hover:text-white"
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${remember ? 'border-cyan-200/40 bg-cyan-200/15' : 'border-white/15 bg-white/[0.025]'}`}>
              <AnimatePresence>
                {remember && (
                  <motion.span initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}>
                    <CheckCircle2 size={13} className="text-cyan-100" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            Remember this device
          </button>

          <Link to="/forgot-password" className="text-sm font-semibold text-cyan-100/80 transition hover:text-white">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
              Signing in
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.045] p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck size={18} className="text-cyan-200" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Your booking context stays connected</p>
              <p className="mt-1 text-xs leading-6 text-white/[0.45]">
                If you started from a tutor profile, HaNova can resume scheduling and payment after login.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-white/[0.45]">
          New to HaNova?{' '}
          <Link to="/signup" className="font-semibold text-white transition hover:text-cyan-200">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

function SocialButton({ label, mark, brandColor }: { label: string; mark: string; brandColor?: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white/[0.82] transition hover:border-white/20 hover:bg-white/[0.08]"
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold"
        style={{ background: brandColor ?? '#ffffff', color: brandColor ? '#ffffff' : '#020617' }}
      >
        {mark}
      </span>
      {label}
    </button>
  );
}

function AuthField({
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

export default SignIn;
