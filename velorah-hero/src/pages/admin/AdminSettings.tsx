import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, ShieldCheck, Server, Database, Key, Lock, Globe,
  Bell, Clock, FileText, Users, AlertTriangle, Save, RefreshCw,
} from 'lucide-react';

const toggle = (v: boolean) => !v;

export default function AdminSettings() {
  const [feedback, setFeedback] = useState('Admin settings loaded. Security policies, system maintenance, and audit configuration are editable.');

  const [twoFA, setTwoFA] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(true);
  const [autoLockout, setAutoLockout] = useState(true);
  const [auditLog, setAuditLog] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);

  const saveAll = () => {
    setFeedback(`Settings saved. 2FA: ${twoFA ? 'on' : 'off'}, IP Whitelist: ${ipWhitelist ? 'on' : 'off'}, Auto-Lockout: ${autoLockout ? 'on' : 'off'}, Audit: ${auditLog ? 'on' : 'off'}, Maintenance: ${maintenanceMode ? 'ACTIVE' : 'off'}.`);
  };

  return (
    <motion.div
      className="admin-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.35, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={13} /> System Administration
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: 'serif', margin: 0 }}>Admin Settings</h1>
          <p style={{ fontSize: 14, opacity: 0.4, marginTop: 6 }}>Security policies, system maintenance, backup configuration, and audit controls.</p>
        </div>
        <button
          onClick={saveAll}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 14, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: 'rgb(134,239,172)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}
        >
          <Save size={14} /> Save All Settings
        </button>
      </div>

      {/* Feedback */}
      <div style={{ padding: '12px 18px', borderRadius: 14, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)', marginBottom: '1.5rem', fontSize: 13, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 10 }}>
        <ShieldCheck size={15} style={{ color: 'rgb(96,165,250)', flexShrink: 0 }} />
        {feedback}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* ── SECURITY POLICIES ── */}
        <div style={{ padding: '1.5rem', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Lock size={16} style={{ color: 'rgb(239,68,68)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Security Policies</h2>
          </div>
          {[
            { label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin and manager accounts', icon: Key, val: twoFA, set: () => setTwoFA(toggle) },
            { label: 'IP Whitelist', desc: 'Restrict admin access to approved IP ranges', icon: Globe, val: ipWhitelist, set: () => setIpWhitelist(toggle) },
            { label: 'Auto Account Lockout', desc: 'Lock accounts after 5 failed login attempts (30 min)', icon: Lock, val: autoLockout, set: () => setAutoLockout(toggle) },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={14} style={{ color: 'rgb(251,113,133)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.3 }}>{item.desc}</div>
                </div>
              </div>
              <button onClick={item.set} style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', background: item.val ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.3s' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: item.val ? 21 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </button>
            </div>
          ))}
        </div>

        {/* ── AUDIT & LOGGING ── */}
        <div style={{ padding: '1.5rem', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <FileText size={16} style={{ color: 'rgb(96,165,250)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Audit & Logging</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={14} style={{ color: 'rgb(96,165,250)' }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Audit Trail</div>
                <div style={{ fontSize: 11, opacity: 0.3 }}>Log all admin actions with timestamps and IPs</div>
              </div>
            </div>
            <button onClick={() => setAuditLog(toggle)} style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', background: auditLog ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.3s' }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: auditLog ? 21 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: 'Retention', value: '90 days', icon: Clock },
              { label: 'Total logs', value: '12,847', icon: Database },
              { label: 'Active admins', value: '3', icon: Users },
              { label: 'Last backup', value: '2h ago', icon: RefreshCw },
            ].map(s => (
              <div key={s.label} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.3, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}><s.icon size={10} />{s.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'serif' }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SYSTEM MAINTENANCE ── */}
        <div style={{ padding: '1.5rem', borderRadius: 20, background: maintenanceMode ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${maintenanceMode ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Server size={16} style={{ color: 'rgb(251,191,36)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>System Maintenance</h2>
          </div>
          {[
            { label: 'Maintenance Mode', desc: 'Show maintenance page to all non-admin users', icon: AlertTriangle, val: maintenanceMode, set: () => setMaintenanceMode(toggle), danger: true },
            { label: 'Auto Backup', desc: 'Daily database backup at 03:00 AM (UTC+7)', icon: Database, val: autoBackup, set: () => setAutoBackup(toggle) },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: `1px solid ${item.danger && item.val ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)'}`, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: item.danger ? 'rgba(245,158,11,0.08)' : 'rgba(34,197,94,0.08)', border: `1px solid ${item.danger ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={14} style={{ color: item.danger ? 'rgb(251,191,36)' : 'rgb(52,211,153)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.3 }}>{item.desc}</div>
                </div>
              </div>
              <button onClick={item.set} style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', background: item.val ? (item.danger ? 'rgb(245,158,11)' : 'rgb(34,197,94)') : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.3s' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: item.val ? 21 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </button>
            </div>
          ))}
          {maintenanceMode && (
            <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={13} style={{ color: 'rgb(251,191,36)', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Maintenance mode is ACTIVE. All non-admin users see a maintenance page.</span>
            </div>
          )}
        </div>

        {/* ── NOTIFICATION ROUTING ── */}
        <div style={{ padding: '1.5rem', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Bell size={16} style={{ color: 'rgb(168,85,247)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Admin Alerts</h2>
          </div>
          {[
            { label: 'Email Alerts', desc: 'Critical system events to admin@hanova.edu.vn', icon: Bell, val: emailAlerts, set: () => setEmailAlerts(toggle) },
            { label: 'Slack Integration', desc: 'Post alerts to #admin-ops channel', icon: Bell, val: slackAlerts, set: () => setSlackAlerts(toggle) },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={14} style={{ color: 'rgb(192,132,252)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.3 }}>{item.desc}</div>
                </div>
              </div>
              <button onClick={item.set} style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', background: item.val ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background 0.3s' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: item.val ? 21 : 3, transition: 'left 0.3s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
              </button>
            </div>
          ))}
          <p style={{ fontSize: 11, opacity: 0.25, marginTop: 8 }}>Admin alerts are separated from Manager operational alerts. Security events, login failures, and system errors are routed here only.</p>
        </div>
      </div>
    </motion.div>
  );
}
