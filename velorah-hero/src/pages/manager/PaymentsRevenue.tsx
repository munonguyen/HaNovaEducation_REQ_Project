import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleDollarSign, Eye, ReceiptText, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react';
import {
  formatVnd,
  transactions as initialTransactions,
  type TransactionRecord,
  type TransactionStatus,
} from '../../data/manager';
import {
  ActionLog,
  DecisionDialog,
  ManagerActionButton,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

function statusTone(status: TransactionStatus) {
  if (status === 'paid') return 'green';
  if (status === 'hold') return 'blue';
  if (status === 'refund_requested') return 'amber';
  if (status === 'refunded') return 'indigo';
  return 'rose';
}

function statusLabel(status: TransactionStatus) {
  if (status === 'paid') return 'Paid';
  if (status === 'hold') return 'Payment hold';
  if (status === 'refund_requested') return 'Refund requested';
  if (status === 'refunded') return 'Refunded';
  return 'Failed';
}

export default function PaymentsRevenue() {
  const [records, setRecords] = useState<TransactionRecord[]>(initialTransactions);
  const [selectedId, setSelectedId] = useState(initialTransactions[0]?.id ?? '');
  const [statusFilter, setStatusFilter] = useState<'all' | TransactionStatus>('all');
  const [notice, setNotice] = useState('Revenue, refund policy, and payment health are connected to booking state. No refund action is hidden.');
  const [refundTarget, setRefundTarget] = useState<TransactionRecord | null>(null);

  const filteredTransactions = useMemo(() => {
    if (statusFilter === 'all') return records;
    return records.filter((transaction) => transaction.status === statusFilter);
  }, [records, statusFilter]);

  const selectedTransaction = records.find((transaction) => transaction.id === selectedId) ?? records[0];

  const revenue = useMemo(() => {
    const paid = records.filter((transaction) => transaction.status === 'paid').reduce((sum, transaction) => sum + transaction.amount, 0);
    const holds = records.filter((transaction) => transaction.status === 'hold').reduce((sum, transaction) => sum + transaction.amount, 0);
    const refundQueue = records.filter((transaction) => transaction.status === 'refund_requested').reduce((sum, transaction) => sum + transaction.amount, 0);
    return { paid, holds, refundQueue };
  }, [records]);

  const approveRefund = (transaction: TransactionRecord) => {
    setRecords((current) =>
      current.map((item) => (item.id === transaction.id ? { ...item, status: 'refunded' } : item)),
    );
    setNotice(`${transaction.id}: refund approved under policy. Student, tutor payout, and booking audit trail were updated.`);
  };

  const explainPolicy = (transaction: TransactionRecord) => {
    setSelectedId(transaction.id);
    setNotice(`${transaction.id}: refund is not allowed automatically. Policy: ${transaction.policy} Next action: open dispute review or offer learning credit.`);
  };

  const renderPaymentActions = (transaction: TransactionRecord) => {
    if (transaction.refundable && transaction.status !== 'refunded') {
      return (
        <ManagerActionButton icon={RotateCcw} variant="primary" onClick={() => setRefundTarget(transaction)}>
          Refund
        </ManagerActionButton>
      );
    }

    if (!transaction.refundable && transaction.status !== 'failed') {
      return (
        <ManagerActionButton
          icon={ShieldCheck}
          reason="Refund blocked by policy"
          alternative="Open dispute review or issue learning credit"
          onClick={() => explainPolicy(transaction)}
        >
          Refund review
        </ManagerActionButton>
      );
    }

    if (transaction.status === 'failed') {
      return (
        <ManagerActionButton
          icon={RefreshCw}
          variant="primary"
          onClick={() => setNotice(`${transaction.id}: payment retry link sent to student and replacement trial booking remains available.`)}
        >
          Send retry link
        </ManagerActionButton>
      );
    }

    return (
      <ManagerActionButton icon={ReceiptText} onClick={() => setNotice(`${transaction.id}: refund receipt opened with payment gateway reference and manager audit note.`)}>
        View receipt
      </ManagerActionButton>
    );
  };

  return (
    <motion.div
      className="manager-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ManagerPageHeader
        eyebrow="UC-05"
        title="Payments & Revenue"
        description="Monitor revenue, VNPay/MoMo transactions, payment holds, failed trials, and policy-aware refunds tied to booking state."
        actions={
          <ManagerActionButton
            icon={CircleDollarSign}
            variant="primary"
            onClick={() => setNotice('Finance summary exported with paid revenue, active holds, refund queue, and gateway status.')}
          >
            Export finance summary
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      <section className="manager-stat-grid manager-revenue-grid">
        <article className="manager-stat manager-stat-green">
          <div className="manager-stat-icon"><CircleDollarSign size={20} /></div>
          <strong>{formatVnd(revenue.paid)}</strong>
          <span>Total revenue</span>
          <p>Completed and settled lessons this month.</p>
        </article>
        <article className="manager-stat manager-stat-blue">
          <div className="manager-stat-icon"><ShieldCheck size={20} /></div>
          <strong>{formatVnd(revenue.holds)}</strong>
          <span>Payment holds</span>
          <p>Held until booking conflict or completion state is resolved.</p>
        </article>
        <article className="manager-stat manager-stat-amber">
          <div className="manager-stat-icon"><RotateCcw size={20} /></div>
          <strong>{formatVnd(revenue.refundQueue)}</strong>
          <span>Refund queue</span>
          <p>Requests waiting for manager policy confirmation.</p>
        </article>
      </section>

      <section className="manager-filter-bar" aria-label="Payment filters">
        {(['all', 'paid', 'hold', 'refund_requested', 'refunded', 'failed'] as const).map((status) => (
          <button
            type="button"
            key={status}
            className={`manager-filter-chip ${statusFilter === status ? 'active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            {status === 'all' ? 'All transactions' : statusLabel(status)}
          </button>
        ))}
      </section>

      <section className="manager-two-column">
        <div className="manager-panel manager-list-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Transactions</span>
              <h2>{filteredTransactions.length} payment records</h2>
            </div>
            <StatusPill tone="blue">VNPay / MoMo</StatusPill>
          </div>

          <div className="manager-record-list">
            {filteredTransactions.map((transaction) => (
              <article className={`manager-record-row ${selectedTransaction?.id === transaction.id ? 'selected' : ''}`} key={transaction.id}>
                <button type="button" className="manager-record-main" onClick={() => setSelectedId(transaction.id)}>
                  <span className="manager-avatar">{transaction.method}</span>
                  <span>
                    <strong>{transaction.student} paid {transaction.tutor}</strong>
                    <small>{transaction.id} - {transaction.bookingId} - {formatVnd(transaction.amount)} - {transaction.method}</small>
                  </span>
                </button>
                <div className="manager-record-actions">
                  <StatusPill tone={statusTone(transaction.status)}>{statusLabel(transaction.status)}</StatusPill>
                  <ManagerActionButton icon={Eye} variant="quiet" onClick={() => setSelectedId(transaction.id)}>
                    View details
                  </ManagerActionButton>
                  {renderPaymentActions(transaction)}
                </div>
              </article>
            ))}
          </div>
        </div>

        {selectedTransaction && (
          <aside className="manager-panel manager-detail-panel">
            <div className="manager-detail-head">
              <div>
                <span className="manager-eyebrow">{selectedTransaction.id}</span>
                <h2>{formatVnd(selectedTransaction.amount)}</h2>
                <p>{selectedTransaction.student} - {selectedTransaction.tutor} - booking {selectedTransaction.bookingId}</p>
              </div>
              <StatusPill tone={statusTone(selectedTransaction.status)}>{statusLabel(selectedTransaction.status)}</StatusPill>
            </div>

            <div className="manager-info-grid">
              <div><span>Method</span><strong>{selectedTransaction.method}</strong></div>
              <div><span>Booking</span><strong>{selectedTransaction.bookingId}</strong></div>
              <div><span>Refundable</span><strong>{selectedTransaction.refundable ? 'Allowed by policy' : 'Requires dispute path'}</strong></div>
              <div><span>Next action</span><strong>{selectedTransaction.nextStep}</strong></div>
            </div>

            <div className="manager-detail-section">
              <h3>Policy explanation</h3>
              <p className="manager-suggestion">{selectedTransaction.policy}</p>
            </div>

            <div className="manager-detail-section">
              <h3>Manager actions</h3>
              <div className="manager-detail-actions">{renderPaymentActions(selectedTransaction)}</div>
            </div>
          </aside>
        )}
      </section>

      <DecisionDialog
        open={Boolean(refundTarget)}
        title={`Refund ${refundTarget?.id ?? 'transaction'}`}
        description={refundTarget ? `${refundTarget.policy} This will update student wallet, tutor payout, and booking audit logs.` : 'Review refund policy before confirming.'}
        confirmLabel="Approve refund"
        onClose={() => setRefundTarget(null)}
        onConfirm={() => {
          if (refundTarget) approveRefund(refundTarget);
        }}
      />
    </motion.div>
  );
}
