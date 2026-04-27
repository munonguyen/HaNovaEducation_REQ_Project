import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileText, Save, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { systemRules } from '../../data/manager';
import {
  ActionLog,
  ManagerActionButton,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

export default function ManagerSettings() {
  const [notice, setNotice] = useState('System rules, cancellation policy, and payment configuration are editable with audit-friendly save actions.');
  const [cancelWindow, setCancelWindow] = useState(24);
  const [vnpayEnabled, setVnpayEnabled] = useState(true);
  const [momoEnabled, setMomoEnabled] = useState(true);
  const [holdFirst, setHoldFirst] = useState(true);

  return (
    <motion.div
      className="manager-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ManagerPageHeader
        eyebrow="Settings"
        title="Operational Rules"
        description="Manage cancellation policy, tutor approval requirements, payment configuration, and notification routing for the manager workspace."
        actions={
          <ManagerActionButton
            icon={Save}
            variant="primary"
            onClick={() => setNotice(`Settings saved. Cancellation window: ${cancelWindow}h. VNPay ${vnpayEnabled ? 'on' : 'off'}, MoMo ${momoEnabled ? 'on' : 'off'}, hold-first ${holdFirst ? 'on' : 'off'}.`)}
          >
            Save settings
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      <section className="manager-settings-grid">
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">System rules</span>
              <h2>Policy library</h2>
            </div>
            <StatusPill tone="blue">3 active rules</StatusPill>
          </div>
          <div className="manager-record-list">
            {systemRules.map((rule) => (
              <article className="manager-rule-card" key={rule.title}>
                <div className="manager-rule-icon"><FileText size={18} /></div>
                <div>
                  <strong>{rule.title}</strong>
                  <p>{rule.detail}</p>
                  <small>{rule.owner}</small>
                </div>
                <ManagerActionButton
                  variant="quiet"
                  onClick={() => setNotice(`${rule.title}: edit panel opened. Changes require manager audit note before publishing.`)}
                >
                  Edit rule
                </ManagerActionButton>
              </article>
            ))}
          </div>
        </article>

        <aside className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Cancellation policy</span>
              <h2>Refund window</h2>
            </div>
            <StatusPill tone="amber">{cancelWindow} hours</StatusPill>
          </div>
          <label className="manager-setting-field">
            <span>Student refundable window before lesson</span>
            <input type="number" min={1} max={72} value={cancelWindow} onChange={(event) => setCancelWindow(Number(event.target.value))} />
          </label>
          <ManagerActionButton
            icon={ShieldCheck}
            variant="primary"
            onClick={() => setNotice(`Cancellation policy published with ${cancelWindow}h student refund window and tutor-conflict exception enabled.`)}
          >
            Publish policy
          </ManagerActionButton>
        </aside>
      </section>

      <section className="manager-settings-grid">
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Payment configuration</span>
              <h2>Gateway controls</h2>
            </div>
            <StatusPill tone="green">Healthy</StatusPill>
          </div>
          <div className="manager-toggle-list">
            <label className="manager-toggle-row">
              <input type="checkbox" checked={vnpayEnabled} onChange={(event) => setVnpayEnabled(event.target.checked)} />
              <span><strong>VNPay</strong><small>Accept bank cards and QR payments.</small></span>
            </label>
            <label className="manager-toggle-row">
              <input type="checkbox" checked={momoEnabled} onChange={(event) => setMomoEnabled(event.target.checked)} />
              <span><strong>MoMo</strong><small>Accept wallet payments and trial holds.</small></span>
            </label>
            <label className="manager-toggle-row">
              <input type="checkbox" checked={holdFirst} onChange={(event) => setHoldFirst(event.target.checked)} />
              <span><strong>Hold-first settlement</strong><small>Keep payment held until booking state is safe.</small></span>
            </label>
          </div>
          <div className="manager-detail-actions">
            <ManagerActionButton
              icon={CreditCard}
              variant="primary"
              onClick={() => setNotice('Payment gateway test completed. VNPay and MoMo callbacks are reachable.')}
            >
              Test gateways
            </ManagerActionButton>
            <ManagerActionButton
              icon={SlidersHorizontal}
              onClick={() => setNotice('Payment routing audit opened with settlement, refund, and failed payment queues.')}
            >
              Open audit
            </ManagerActionButton>
          </div>
        </article>

        <aside className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Notification routing</span>
              <h2>Role separation</h2>
            </div>
            <StatusPill tone="indigo">Manager only</StatusPill>
          </div>
          <p className="manager-suggestion">Manager alerts are operational: tutor approval, complaints, booking conflicts, refunds. Admin alerts remain separate for security and system audit.</p>
          <ManagerActionButton
            icon={ShieldCheck}
            variant="quiet"
            onClick={() => setNotice('Role routing verified. Manager and Admin notification lanes remain separated.')}
          >
            Verify role lanes
          </ManagerActionButton>
        </aside>
      </section>
    </motion.div>
  );
}
