import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Flag, ShieldCheck, Star, AlertTriangle, BarChart3 } from 'lucide-react';
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

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */
function decisionTone(decision: ReviewDecision) {
  if (decision === 'visible') return 'green';
  if (decision === 'hidden') return 'rose';
  return 'amber';
}

function decisionLabel(decision: ReviewDecision) {
  if (decision === 'visible') return 'Visible';
  if (decision === 'hidden') return 'Hidden';
  return 'Flagged';
}

function RatingStars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span className="manager-rating-stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={size} fill={index < rating ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

function getTutorPerformance(records: ReviewRecord[]) {
  const tutorMap = new Map<string, { name: string; ratings: number[]; reviews: ReviewRecord[] }>();
  records.forEach((r) => {
    if (!tutorMap.has(r.tutor)) tutorMap.set(r.tutor, { name: r.tutor, ratings: [], reviews: [] });
    const entry = tutorMap.get(r.tutor)!;
    entry.ratings.push(r.rating);
    entry.reviews.push(r);
  });
  return Array.from(tutorMap.values()).map((t) => {
    const avg = t.ratings.reduce((a, b) => a + b, 0) / t.ratings.length;
    const tutorRecord = tutorRecords.find((tr) => tr.name === t.name);
    return {
      ...t,
      avg: Math.round(avg * 10) / 10,
      total: t.ratings.length,
      completionRate: tutorRecord?.completionRate ?? 0,
      cancellationRate: tutorRecord?.cancellationRate ?? 0,
      flagged: t.reviews.filter((r) => r.decision === 'flagged').length,
      hidden: t.reviews.filter((r) => r.decision === 'hidden').length,
    };
  }).sort((a, b) => b.avg - a.avg);
}

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */
export default function ReviewsRatings() {
  const completedLessonReviews = initialReviews.filter((review) => review.lessonStatus === 'completed');
  const [records, setRecords] = useState<ReviewRecord[]>(completedLessonReviews);
  const [selectedId, setSelectedId] = useState(completedLessonReviews[0]?.id ?? '');
  const [decisionFilter, setDecisionFilter] = useState<'all' | ReviewDecision>('all');
  const [notice, setNotice] = useState('Review moderation only shows completed lessons. Hide, keep, and flag actions are synced to tutor quality metrics.');

  const filteredReviews = useMemo(() => {
    if (decisionFilter === 'all') return records;
    return records.filter((review) => review.decision === decisionFilter);
  }, [decisionFilter, records]);

  const selectedReview = records.find((review) => review.id === selectedId) ?? records[0];

  const moderationItems = useMemo(
    () => [
      { label: 'Visible', value: records.filter((r) => r.decision === 'visible').length, tone: 'green' as const },
      { label: 'Flagged', value: records.filter((r) => r.decision === 'flagged').length, tone: 'amber' as const },
      { label: 'Hidden', value: records.filter((r) => r.decision === 'hidden').length, tone: 'rose' as const },
    ],
    [records],
  );

  const ratingItems = useMemo(
    () => [5, 4, 3, 2, 1].map((rating) => ({
      label: `${rating} star`,
      value: records.filter((r) => r.rating === rating).length,
      tone: rating >= 5 ? 'green' as const : rating === 4 ? 'blue' as const : rating === 3 ? 'amber' as const : 'rose' as const,
      detail: rating <= 3 ? 'Quality follow-up candidate' : 'Positive tutor quality signal',
    })),
    [records],
  );

  const tutorPerformance = useMemo(() => getTutorPerformance(records), [records]);
  const avgRating = useMemo(() => {
    if (!records.length) return 0;
    return Math.round((records.reduce((a, r) => a + r.rating, 0) / records.length) * 10) / 10;
  }, [records]);

  const updateDecision = (review: ReviewRecord, decision: ReviewDecision, message: string) => {
    setRecords((c) => c.map((item) => (item.id === review.id ? { ...item, decision } : item)));
    setNotice(`${review.id}: ${message}`);
  };

  const flagInappropriate = (review: ReviewRecord) => {
    setRecords((c) => c.map((item) =>
      item.id === review.id ? { ...item, decision: 'flagged' as const, flags: Array.from(new Set([...item.flags, 'Inappropriate content review'])) } : item,
    ));
    setNotice(`${review.id}: content flagged. Manager can now hide it or keep it with quality note.`);
  };

  const renderReviewActions = (review: ReviewRecord) => (
    <>
      {review.decision === 'visible' ? (
        <ManagerActionButton icon={Eye} reason="Already visible" alternative="Flag or hide if needed" onClick={() => setNotice(`${review.id}: already visible.`)}>Keep</ManagerActionButton>
      ) : (
        <ManagerActionButton icon={Eye} variant="primary" onClick={() => updateDecision(review, 'visible', 'review kept visible.')}>Keep</ManagerActionButton>
      )}
      {review.decision === 'hidden' ? (
        <ManagerActionButton icon={EyeOff} reason="Already hidden" alternative="Keep to restore" onClick={() => setNotice(`${review.id}: already hidden.`)}>Hide</ManagerActionButton>
      ) : (
        <ManagerActionButton icon={EyeOff} variant="danger" onClick={() => updateDecision(review, 'hidden', 'review hidden from profile.')}>Hide</ManagerActionButton>
      )}
      {review.decision === 'flagged' ? (
        <ManagerActionButton icon={Flag} reason="Already flagged" alternative="Keep or hide" onClick={() => setNotice(`${review.id}: already flagged.`)}>Flag</ManagerActionButton>
      ) : (
        <ManagerActionButton icon={Flag} onClick={() => flagInappropriate(review)}>Flag</ManagerActionButton>
      )}
    </>
  );

  return (
    <motion.div className="manager-page" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <ManagerPageHeader
        eyebrow="Review Moderation"
        title="Reviews & Ratings"
        description="Moderate student reviews from completed lessons, monitor tutor quality metrics, and protect profiles from inappropriate content."
        actions={
          <ManagerActionButton icon={ShieldCheck} variant="primary" onClick={() => setNotice('Moderation sweep started. Flagged reviews prioritized.')}>
            Run moderation sweep
          </ManagerActionButton>
        }
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
          <article key={k.label} className="manager-panel" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${k.c},0.1)`, border: `1px solid rgba(${k.c},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <k.icon size={18} style={{ color: `rgba(${k.c},0.8)` }} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', opacity: 0.4 }}>{k.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'serif' }}>{k.val}</div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── ANALYTICS ROW: 3 columns ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <article className="manager-panel">
          <div className="manager-panel-header"><div><span className="manager-eyebrow">Moderation overview</span><h2>Visibility states</h2></div></div>
          <ManagerDonutChart items={moderationItems} centerValue={`${records.length}`} centerLabel="Reviews" />
        </article>
        <article className="manager-panel">
          <div className="manager-panel-header"><div><span className="manager-eyebrow">Rating breakdown</span><h2>Quality signals</h2></div><StatusPill tone="amber">{records.filter(r => r.rating <= 3).length} watch</StatusPill></div>
          <ManagerBarChart items={ratingItems} />
        </article>
        <article className="manager-panel">
          <div className="manager-panel-header"><div><span className="manager-eyebrow">Tutor quality</span><h2>Performance</h2></div><StatusPill tone="blue">{tutorPerformance.length} tutors</StatusPill></div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.6rem', marginTop: '0.75rem' }}>
            {tutorPerformance.map(t => {
              const risk = t.avg < 3 || t.cancellationRate > 10;
              return (
                <div key={t.name} style={{ padding: '0.75rem 0.85rem', borderRadius: 14, border: `1px solid ${risk ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.06)'}`, background: risk ? 'rgba(244,63,94,0.03)' : 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: risk ? 'rgba(244,63,94,0.15)' : 'rgba(59,130,246,0.1)', border: `1px solid ${risk ? 'rgba(244,63,94,0.3)' : 'rgba(59,130,246,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: risk ? 'rgb(251,113,133)' : 'rgb(96,165,250)' }}>
                        {t.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12.5 }}>{t.name}</div>
                        <div style={{ fontSize: 10, opacity: 0.3 }}>{t.total} review{t.total !== 1 ? 's' : ''} · {t.completionRate}%</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'serif', color: t.avg >= 4 ? 'rgb(52,211,153)' : t.avg >= 3 ? 'rgb(251,191,36)' : 'rgb(251,113,133)' }}>{t.avg}</span>
                      <RatingStars rating={Math.round(t.avg)} size={9} />
                    </div>
                  </div>
                  {(t.flagged > 0 || t.hidden > 0 || risk) && (
                    <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
                      {t.flagged > 0 && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 5, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: 'rgb(251,191,36)', textTransform: 'uppercase' as const }}>{t.flagged} flagged</span>}
                      {t.hidden > 0 && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 5, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', color: 'rgb(251,113,133)', textTransform: 'uppercase' as const }}>{t.hidden} hidden</span>}
                      {risk && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 5, background: 'rgba(244,63,94,0.08)', color: 'rgb(251,113,133)', textTransform: 'uppercase' as const, display: 'flex', alignItems: 'center', gap: 3 }}><AlertTriangle size={9} />Risk</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </article>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="manager-filter-bar">
        {(['all', 'visible', 'flagged', 'hidden'] as const).map((d) => (
          <button type="button" key={d} className={`manager-filter-chip ${decisionFilter === d ? 'active' : ''}`} onClick={() => setDecisionFilter(d)}>
            {d === 'all' ? 'All reviews' : decisionLabel(d)}
          </button>
        ))}
      </section>

      {/* ── REVIEW LIST + DETAIL ── */}
      <section className="manager-two-column">
        <div className="manager-panel manager-list-panel">
          <div className="manager-panel-header"><div><span className="manager-eyebrow">Moderation queue</span><h2>{filteredReviews.length} reviews</h2></div><StatusPill tone="green">Completed</StatusPill></div>
          <div className="manager-record-list">
            {filteredReviews.map((review) => (
              <article className={`manager-record-row ${selectedReview?.id === review.id ? 'selected' : ''}`} key={review.id}>
                <button type="button" className="manager-record-main" onClick={() => setSelectedId(review.id)}>
                  <span className="manager-avatar">{review.student.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
                  <span><strong>{review.student} → {review.tutor}</strong><small><RatingStars rating={review.rating} /> {review.comment}</small></span>
                </button>
                <div className="manager-record-actions">
                  <StatusPill tone={decisionTone(review.decision)}>{decisionLabel(review.decision)}</StatusPill>
                  {renderReviewActions(review)}
                </div>
              </article>
            ))}
          </div>
        </div>

        {selectedReview && (
          <aside className="manager-panel manager-detail-panel">
            <div className="manager-detail-head">
              <div><span className="manager-eyebrow">{selectedReview.id}</span><h2>{selectedReview.student} → {selectedReview.tutor}</h2><p>"{selectedReview.comment}"</p></div>
              <StatusPill tone={decisionTone(selectedReview.decision)}>{decisionLabel(selectedReview.decision)}</StatusPill>
            </div>
            <div className="manager-info-grid">
              <div><span>Rating</span><strong><RatingStars rating={selectedReview.rating} /></strong></div>
              <div><span>Lesson state</span><strong>Completed</strong></div>
              <div><span>Flags</span><strong>{selectedReview.flags.length ? selectedReview.flags.join(', ') : 'No flags'}</strong></div>
              <div><span>Next action</span><strong>{selectedReview.nextStep}</strong></div>
            </div>
            <div className="manager-detail-section">
              <h3>Moderation actions</h3>
              <div className="manager-detail-actions">{renderReviewActions(selectedReview)}</div>
            </div>
          </aside>
        )}
      </section>
    </motion.div>
  );
}
