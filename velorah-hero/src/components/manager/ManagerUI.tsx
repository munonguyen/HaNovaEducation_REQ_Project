import type { ReactNode } from 'react';
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
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
}

interface ActionLogProps {
  message: string;
}

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
      {reason && <small>{reason}</small>}
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
              onConfirm();
              onClose();
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
