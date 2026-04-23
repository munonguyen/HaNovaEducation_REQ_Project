import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck, type LucideIcon } from 'lucide-react';
import AuthShell from '../../components/auth/AuthShell';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const emailError = touched && !emailValid ? 'Enter the email used for your HaNova account.' : '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!emailValid) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 850);
  };

  return (
    <AuthShell
      eyebrow="HaNova Recovery"
      title="A calm reset path back to your learning plan."
      description="Reset your password without losing tutor recommendations, booking context, or notification settings."
      panelEyebrow="Password recovery"
      panelTitle={submitted ? 'Check your email' : 'Reset password'}
      panelDescription={
        submitted
          ? 'We sent a secure reset link. The link keeps your account and learning data connected.'
          : 'Enter your account email and HaNova will send a secure reset link.'
      }
    >
      <div className="space-y-6">
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/[0.55] transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <AuthField icon={Mail} label="Email" error={emailError} success={touched && emailValid}>
              <input
                value={email}
                onBlur={() => setTouched(true)}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.24]"
                placeholder="student@hanova.vn"
                type="email"
                autoComplete="email"
              />
            </AuthField>

            <button
              type="submit"
              disabled={!emailValid || loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
                  Sending reset link
                </>
              ) : (
                <>
                  Send reset link
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
                  <p className="text-sm font-semibold text-white">Secure by default</p>
                  <p className="mt-1 text-xs leading-6 text-white/[0.45]">
                    Reset links are designed for account recovery only and do not expose booking or payment details.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-white/[0.45]">
              Need a new account?{' '}
              <Link to="/signup" className="font-semibold text-white transition hover:text-cyan-200">
                Register with HaNova
              </Link>
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[30px] border border-emerald-300/15 bg-emerald-300/[0.045] p-6"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-200/20 bg-emerald-200/10">
              <Mail size={26} className="text-emerald-100" />
            </div>
            <h3 className="font-serif text-3xl text-white">Reset link sent</h3>
            <p className="mt-3 text-sm leading-7 text-white/[0.58]">
              We sent instructions to <strong className="font-semibold text-white">{email}</strong>. Open the email to
              create a new password, then return to your dashboard.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/[0.72] transition hover:bg-white/[0.08] hover:text-white"
              >
                Send again
              </button>
              <Link
                to="/signin"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-50"
              >
                Return to login
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </AuthShell>
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

export default ForgotPassword;
