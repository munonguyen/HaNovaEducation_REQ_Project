import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Flag, ShieldCheck, Star, AlertTriangle, BarChart3, Lock, ShieldAlert } from 'lucide-react';
import {
  reviews as initialReviews,
  tutors as tutorRecords,
  type ReviewDecision,
  type ReviewRecord,
} from '../../data/manager';
import {
  ActionLog,
  ManagerBarChart,
  ManagerActionButton,
  ManagerDonutChart,
  ManagerPageHeader,
  StatusPill,
} from '../../components/manager/ManagerUI';

function decisionTone(d: ReviewDecision) { return d === 'visible' ? 'green' : d === 'hidden' ? 'rose' : 'amber'; }
function decisionLabel(d: ReviewDecision) { return d === 'visible' ? 'Visible' : d === 'hidden' ? 'Hidden' : 'Flagged'; }

function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="manager-rating-stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill={i < rating ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

/* ── Credibility score system ── */
function calcCredibility(reviews: ReviewRecord[]) {
  let score = 100;
  reviews.forEach(r => {
    if (r.rating === 5) score += 2;
    else if (r.rating === 4) score += 1;
    else if (r.rating === 2) score -= 8;
    else if (r.rating <= 1) score -= 15;
    if (r.decision === 'hidden') score -= 10;
    if (r.decision === 'flagged') score -= 5;
  });
  return Math.max(0, Math.min(100, score));
}

function credibilityLevel(score: number) {
  if (score <= 0) return { label: 'AUTO-LOCKED', color: '#991b1b', bg: 'rgba(153,27,27,0.15)', border: 'rgba(153,27,27,0.3)', icon: Lock };
  if (score <= 25) return { label: 'Critical', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', icon: ShieldAlert };
  if (score <= 50) return { label: 'Warning Lv.2', color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)', icon: AlertTriangle };
  if (score <= 70) return { label: 'Warning Lv.1', color: '#eab308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.2)', icon: AlertTriangle };
  return { label: 'Good', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)', icon: ShieldCheck };
}

function getTutorPerformance(records: ReviewRecord[]) {
  const map = new Map<string, { name: string; ratings: number[]; reviews: ReviewRecord[] }>();
  records.forEach(r => {
    if (!map.has(r.tutor)) map.set(r.tutor, { name: r.tutor, ratings: [], reviews: [] });
    const e = map.get(r.tutor)!;
    e.ratings.push(r.rating);
    e.reviews.push(r);
  });
  return Array.from(map.values()).map(t => {
    const avg = t.ratings.reduce((a, b) => a + b, 0) / t.ratings.length;
    const rec = tutorRecords.find(tr => tr.name === t.name);
    const cred = calcCredibility(t.reviews);
    return { ...t, avg: Math.round(avg * 10) / 10, total: t.ratings.length, completionRate: rec?.completionRate ?? 0, cancellationRate: rec?.cancellationRate ?? 0, flagged: t.reviews.filter(r => r.decision === 'flagged').length, hidden: t.reviews.filter(r => r.decision === 'hidden').length, credibility: cred, level: credibilityLevel(cred) };
  }).sort((a, b) => b.credibility - a.credibility);
}

/* ═══════════════════════════════════════════════ */
export default function ReviewsRatings() {
  const completed = initialReviews.filter(r => r.lessonStatus === 'completed');
  const [records, setRecords] = useState<ReviewRecord[]>(completed);
  const [selectedId, setSelectedId] = useState(completed[0]?.id ?? '');
  const [filter, setFilter] = useState<'all' | ReviewDecision>('all');
  const [notice, setNotice] = useState('Review moderation active. Tutor credibility is calculated in real-time based on student reviews.');

  const filtered = useMemo(() => filter === 'all' ? records : records.filter(r => r.decision === filter), [filter, records]);
  const selected = records.find(r => r.id === selectedId) ?? records[0];
  const tutorPerf = useMemo(() => getTutorPerformance(records), [records]);
  const avgRating = useMemo(() => records.length ? Math.round((records.reduce((a, r) => a + r.rating, 0) / records.length) * 10) / 10 : 0, [records]);

  const modItems = useMemo(() => [
    { label: 'Visible', value: records.filter(r => r.decision === 'visible').length, tone: 'green' as const },
    { label: 'Flagged', value: records.filter(r => r.decision === 'flagged').length, tone: 'amber' as const },
    { label: 'Hidden', value: records.filter(r => r.decision === 'hidden').length, tone: 'rose' as const },
  ], [records]);

  const ratingItems = useMemo(() => [5, 4, 3, 2, 1].map(r => ({
    label: `${r} star`, value: records.filter(rv => rv.rating === r).length,
    tone: r >= 5 ? 'green' as const : r === 4 ? 'blue' as const : r === 3 ? 'amber' as const : 'rose' as const,
    detail: r <= 2 ? 'Credibility penalty applied' : r === 3 ? 'Neutral impact' : 'Positive signal',
  })), [records]);

  const update = (rv: ReviewRecord, d: ReviewDecision, msg: string) => {
    setRecords(c => c.map(i => i.id === rv.id ? { ...i, decision: d } : i));
    setNotice(`${rv.id}: ${msg}`);
  };
  const flagIt = (rv: ReviewRecord) => {
    setRecords(c => c.map(i => i.id === rv.id ? { ...i, decision: 'flagged' as const, flags: Array.from(new Set([...i.flags, 'Inappropriate content'])) } : i));
    setNotice(`${rv.id}: flagged. Tutor credibility score updated.`);
  };

  const actions = (rv: ReviewRecord) => (
    <>
      {rv.decision === 'visible'
        ? <ManagerActionButton icon={Eye} reason="Already visible" alternative="Flag or hide" onClick={() => setNotice(`${rv.id}: already visible.`)}>Keep</ManagerActionButton>
        : <ManagerActionButton icon={Eye} variant="primary" onClick={() => update(rv, 'visible', 'restored to visible.')}>Keep</ManagerActionButton>}
      {rv.decision === 'hidden'
        ? <ManagerActionButton icon={EyeOff} reason="Already hidden" alternative="Keep to restore" onClick={() => setNotice(`${rv.id}: already hidden.`)}>Hide</ManagerActionButton>
        : <ManagerActionButton icon={EyeOff} variant="danger" onClick={() => update(rv, 'hidden', 'hidden. Credibility penalty applied.')}>Hide</ManagerActionButton>}
      {rv.decision === 'flagged'
        ? <ManagerActionButton icon={Flag} reason="Already flagged" alternative="Keep or hide" onClick={() => setNotice(`${rv.id}: already flagged.`)}>Flag</ManagerActionButton>
        : <ManagerActionButton icon={Flag} onClick={() => flagIt(rv)}>Flag</ManagerActionButton>}
    </>
  );

  return (
    <motion.div className="manager-page" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <ManagerPageHeader
        eyebrow="Review Moderation"
        title="Reviews & Ratings"
        description="Monitor student reviews, calculate tutor credibility scores, and enforce quality standards. Tutors with 0 credibility are auto-locked."
        actions={<ManagerActionButton icon={ShieldCheck} variant="primary" onClick={() => setNotice('Moderation sweep started. Credibility scores recalculated.')}>Run moderation sweep</ManagerActionButton>}
      />
      <ActionLog message={notice} />

      {/* ── KPI STRIP ── */}
      <section className="manager-chart-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { icon: BarChart3, label: 'Total Reviews', val: String(records.length), c: '59,130,246' },
          { icon: Star, label: 'Avg Rating', val: `${avgRating}/5`, c: '16,185,129' },
          { icon: Flag, label: 'Flagged', val: String(records.filter(r => r.decision === 'flagged').length), c: '245,158,11' },
          { icon: EyeOff, label: 'Hidden', val: String(records.filter(r => r.decision === 'hidden').length), c: '244,63,94' },
        ].map(k => (
          <article key={k.label} className="manager-panel" style={{ padding: '1.1rem 1.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `rgba(${k.c},0.1)`, border: `1px solid rgba(${k.c},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <k.icon size={16} style={{ color: `rgba(${k.c},0.8)` }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', opacity: 0.35 }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'serif' }}>{k.val}</div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── CHARTS + CREDIBILITY SCOREBOARD ── */}
      <section className="manager-chart-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <article className="manager-panel">
          <div className="manager-panel-header"><div><span className="manager-eyebrow">Moderation overview</span><h2>Visibility states</h2></div></div>
          <ManagerDonutChart items={modItems} centerValue={`${records.length}`} centerLabel="Reviews" />
        </article>
        <article className="manager-panel">
          <div className="manager-panel-header"><div><span className="manager-eyebrow">Rating breakdown</span><h2>Quality signals</h2></div><StatusPill tone="amber">{records.filter(r => r.rating <= 2).length} penalty</StatusPill></div>
          <ManagerBarChart items={ratingItems} />
        </article>
      </section>

      {/* ── TUTOR CREDIBILITY SCOREBOARD ── */}
      <section style={{ marginBottom: '1.5rem' }}>
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div><span className="manager-eyebrow">Tutor Credibility System</span><h2>Reputation & Trust Score</h2></div>
            <StatusPill tone="blue">{tutorPerf.length} tutors monitored</StatusPill>
          </div>
          <p style={{ fontSize: 12, opacity: 0.35, marginTop: 4, marginBottom: 16, lineHeight: 1.5 }}>
            Score starts at 100. 5★ = +2, 4★ = +1, 2★ = -8, 1★ = -15. Flagged reviews: -5, Hidden reviews: -10. Score ≤ 0 → account auto-locked.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem' }}>
            {tutorPerf.map(t => {
              const Ico = t.level.icon;
              return (
                <div key={t.name} style={{ padding: '1rem 1.2rem', borderRadius: 16, border: `1px solid ${t.level.border}`, background: t.level.bg, transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.level.bg, border: `1.5px solid ${t.level.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: t.level.color }}>
                        {t.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{t.name}</div>
                        <div style={{ fontSize: 10.5, opacity: 0.35 }}>{t.total} review{t.total !== 1 ? 's' : ''} · Avg {t.avg}★ · {t.completionRate}% completion</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: t.level.bg, border: `1px solid ${t.level.border}`, color: t.level.color, textTransform: 'uppercase' as const, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Ico size={11} />{t.level.label}
                      </span>
                    </div>
                  </div>
                  {/* Credibility bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                      <div style={{ width: `${t.credibility}%`, height: '100%', borderRadius: 4, background: t.level.color, transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'serif', color: t.level.color, minWidth: 40, textAlign: 'right' as const }}>{t.credibility}</span>
                    <span style={{ fontSize: 10, opacity: 0.3 }}>/100</span>
                  </div>
                  {/* Breakdown tags */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' as const }}>
                    {t.flagged > 0 && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: 'rgb(251,191,36)', textTransform: 'uppercase' as const }}>{t.flagged} flagged (-{t.flagged * 5}pt)</span>}
                    {t.hidden > 0 && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', color: 'rgb(251,113,133)', textTransform: 'uppercase' as const }}>{t.hidden} hidden (-{t.hidden * 10}pt)</span>}
                    {t.credibility <= 0 && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: 'rgba(153,27,27,0.2)', border: '1px solid rgba(153,27,27,0.4)', color: '#fca5a5', textTransform: 'uppercase' as const, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Lock size={9} />Account auto-locked
                      </span>
                    )}
                    {t.credibility > 0 && t.credibility <= 25 && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 5, background: 'rgba(239,68,68,0.1)', color: '#f87171', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <ShieldAlert size={9} />Near auto-lock threshold
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      {/* ── FILTER ── */}
      <section className="manager-filter-bar">
        {(['all', 'visible', 'flagged', 'hidden'] as const).map(d => (
          <button type="button" key={d} className={`manager-filter-chip ${filter === d ? 'active' : ''}`} onClick={() => setFilter(d)}>
            {d === 'all' ? 'All reviews' : decisionLabel(d)}
          </button>
        ))}
      </section>

      {/* ── LIST + DETAIL ── */}
      <section className="manager-two-column">
        <div className="manager-panel manager-list-panel">
          <div className="manager-panel-header"><div><span className="manager-eyebrow">Moderation queue</span><h2>{filtered.length} reviews</h2></div><StatusPill tone="green">Completed</StatusPill></div>
          <div className="manager-record-list">
            {filtered.map(rv => (
              <article className={`manager-record-row ${selected?.id === rv.id ? 'selected' : ''}`} key={rv.id}>
                <button type="button" className="manager-record-main" onClick={() => setSelectedId(rv.id)}>
                  <span className="manager-avatar">{rv.student.split(' ').map(p => p[0]).join('').slice(0, 2)}</span>
                  <span><strong>{rv.student} → {rv.tutor}</strong><small><RatingStars rating={rv.rating} size={12} /> {rv.comment}</small></span>
                </button>
                <div className="manager-record-actions">
                  <StatusPill tone={decisionTone(rv.decision)}>{decisionLabel(rv.decision)}</StatusPill>
                  {actions(rv)}
                </div>
              </article>
            ))}
          </div>
        </div>

        {selected && (
          <aside className="manager-panel manager-detail-panel">
            <div className="manager-detail-head">
              <div><span className="manager-eyebrow">{selected.id}</span><h2>{selected.student} → {selected.tutor}</h2><p>"{selected.comment}"</p></div>
              <StatusPill tone={decisionTone(selected.decision)}>{decisionLabel(selected.decision)}</StatusPill>
            </div>
            <div className="manager-info-grid">
              <div><span>Rating</span><strong><RatingStars rating={selected.rating} /></strong></div>
              <div><span>Lesson</span><strong>Completed</strong></div>
              <div><span>Flags</span><strong>{selected.flags.length ? selected.flags.join(', ') : 'None'}</strong></div>
              <div><span>Next action</span><strong>{selected.nextStep}</strong></div>
            </div>
            <div className="manager-detail-section">
              <h3>Moderation actions</h3>
              <div className="manager-detail-actions">{actions(selected)}</div>
            </div>
          </aside>
        )}
      </section>
    </motion.div>
  );
}
