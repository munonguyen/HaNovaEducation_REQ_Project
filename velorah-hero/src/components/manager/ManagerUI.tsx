import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Info, X } from 'lucide-react';

export type ManagerTone = 'blue' | 'green' | 'amber' | 'rose' | 'indigo' | 'neutral';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

interface ActionButtonProps {
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger' | 'quiet';
  reason?: string;
  alternative?: string;
  onClick: () => void;
}

interface ActionLinkProps {
  to: string;
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'quiet';
}

interface DecisionDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void | false;
  onClose: () => void;
  children?: ReactNode;
}

interface ActionLogProps {
  message: string;
}

interface ChartDatum {
  label: string;
  value: number;
  tone?: ManagerTone;
  detail?: string;
}

const chartToneColors: Record<ManagerTone, string> = {
  blue: '#2563eb',
  green: '#059669',
  amber: '#d97706',
  rose: '#e11d48',
  indigo: '#4f46e5',
  neutral: '#64748b',
};

export function ManagerPageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="manager-page-header">
      <div>
        <span className="manager-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="manager-header-actions">{actions}</div>}
    </header>
  );
}

export function StatusPill({ tone = 'neutral', children }: { tone?: ManagerTone; children: ReactNode }) {
  return <span className={`manager-status manager-status-${tone}`}>{children}</span>;
}

export function ManagerActionButton({
  children,
  icon: Icon,
  variant = 'secondary',
  reason,
  alternative,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`manager-action manager-action-${variant} ${reason ? 'manager-action-explained' : ''}`}
      onClick={onClick}
      title={reason ? `${reason}. Alternative: ${alternative ?? 'Open details'}` : undefined}
    >
      {Icon && <Icon size={16} />}
      <span>{children}</span>
      {reason && <small>{alternative ? `${reason}. Next: ${alternative}.` : reason}</small>}
    </button>
  );
}

export function ManagerActionLink({ to, children, icon: Icon = ArrowRight, variant = 'secondary' }: ActionLinkProps) {
  return (
    <Link to={to} className={`manager-action manager-action-${variant}`}>
      <span>{children}</span>
      <Icon size={16} />
    </Link>
  );
}

export function ActionLog({ message }: ActionLogProps) {
  return (
    <div className="manager-action-log" role="status" aria-live="polite">
      <Info size={17} />
      <span>{message}</span>
    </div>
  );
}

export function ManagerDonutChart({
  items,
  centerLabel,
  centerValue,
}: {
  items: ChartDatum[];
  centerLabel: string;
  centerValue: string;
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const gradient = total > 0
    ? items
        .map((item) => {
          const start = cursor;
          const next = cursor + (item.value / total) * 100;
          cursor = next;
          return `${chartToneColors[item.tone ?? 'neutral']} ${start}% ${next}%`;
        })
        .join(', ')
    : '#e2e8f0 0% 100%';

  return (
    <div className="manager-chart-donut-wrap">
      <div className="manager-donut" style={{ background: `conic-gradient(${gradient})` }} aria-label={`${centerLabel}: ${centerValue}`}>
        <span>
          <strong>{centerValue}</strong>
          <small>{centerLabel}</small>
        </span>
      </div>
      <div className="manager-chart-legend">
        {items.map((item) => (
          <div className="manager-chart-legend-row" key={item.label}>
            <span className="manager-chart-swatch" style={{ background: chartToneColors[item.tone ?? 'neutral'] }} />
            <strong>{item.label}</strong>
            <em>{item.value}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ManagerBarChart({
  items,
  valueSuffix = '',
}: {
  items: ChartDatum[];
  valueSuffix?: string;
}) {
  const max = Math.max(1, ...items.map((item) => item.value));

  return (
    <div className="manager-chart-bars">
      {items.map((item) => {
        const width = `${Math.max(7, (item.value / max) * 100)}%`;
        return (
          <div className="manager-chart-bar-row" key={item.label}>
            <div className="manager-chart-bar-copy">
              <strong>{item.label}</strong>
              <em>{item.value}{valueSuffix}</em>
            </div>
            <div className="manager-chart-track" aria-label={`${item.label}: ${item.value}${valueSuffix}`}>
              <span
                className={`manager-chart-fill manager-chart-fill-${item.tone ?? 'neutral'}`}
                style={{ '--manager-chart-width': width } as CSSProperties}
              />
            </div>
            {item.detail && <small>{item.detail}</small>}
          </div>
        );
      })}
    </div>
  );
}

export function DecisionDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
  children,
}: DecisionDialogProps) {
  if (!open) return null;

  return (
    <div className="manager-dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="manager-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manager-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="manager-dialog-close" onClick={onClose} aria-label="Close dialog">
          <X size={17} />
        </button>
        <span className="manager-eyebrow">Confirmation</span>
        <h2 id="manager-dialog-title">{title}</h2>
        <p>{description}</p>
        {children}
        <div className="manager-dialog-actions">
          <ManagerActionButton variant="quiet" onClick={onClose}>
            Review details
          </ManagerActionButton>
          <ManagerActionButton
            variant="primary"
            onClick={() => {
              const shouldClose = onConfirm();
              if (shouldClose !== false) onClose();
            }}
          >
            {confirmLabel}
          </ManagerActionButton>
        </div>
      </section>
    </div>
  );
}

export function FlowStrip({
  items,
}: {
  items: Array<{ label: string; detail: string; icon: LucideIcon }>;
}) {
  return (
    <div className="manager-flow-strip">
      {items.map(({ label, detail, icon: Icon }, index) => (
        <div className="manager-flow-step" key={label}>
          <span className="manager-flow-icon">
            <Icon size={17} />
          </span>
          <strong>{label}</strong>
          <small>{detail}</small>
          {index < items.length - 1 && <ArrowRight size={16} className="manager-flow-arrow" />}
        </div>
      ))}
    </div>
  );
}
