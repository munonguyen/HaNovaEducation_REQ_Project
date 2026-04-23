import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, CalendarDays, ShieldCheck, Sparkles, WalletCards, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  panelEyebrow: string;
  panelTitle: string;
  panelDescription: string;
  children: ReactNode;
  highlights?: Array<{
    icon: LucideIcon;
    label: string;
  }>;
}

const defaultHighlights = [
  { icon: ShieldCheck, label: 'Secure access' },
  { icon: CalendarDays, label: 'Booking ready' },
  { icon: BookOpen, label: 'Study plan sync' },
  { icon: WalletCards, label: 'VNPay / MoMo' },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AuthShell({
  eyebrow,
  title,
  description,
  panelEyebrow,
  panelTitle,
  panelDescription,
  children,
  highlights = defaultHighlights,
}: AuthShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
      className="relative min-h-screen overflow-hidden px-5 pb-24 pt-20 text-white sm:px-8 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(139,92,246,0.18),transparent_34%),linear-gradient(135deg,rgba(2,6,23,0.45),rgba(17,24,39,0.18))]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="order-2 min-w-0 lg:sticky lg:top-24 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-8"
          >
            <Link
              to="/"
              aria-label="Back to HaNova home"
              title="Back to home"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/[0.55] transition hover:border-cyan-200/30 hover:bg-cyan-200/[0.08] hover:text-white"
            >
              <Sparkles size={13} className="text-cyan-300" />
              {eyebrow}
            </Link>

            <h1 className="max-w-xl break-words font-serif text-3xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/[0.58] sm:text-base">{description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
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
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/[0.55]">{panelEyebrow}</p>
            <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">{panelTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/[0.48]">{panelDescription}</p>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">{children}</div>
        </section>
      </div>
    </motion.main>
  );
}
