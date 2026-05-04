import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Flag, ShieldCheck, Star, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
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

/* Tutor performance aggregation from reviews + tutor records */
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
      status: tutorRecord?.status ?? 'active',
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
      { label: 'Visible', value: records.filter((review) => review.decision === 'visible').length, tone: 'green' as const },
      { label: 'Flagged', value: records.filter((review) => review.decision === 'flagged').length, tone: 'amber' as const },
      { label: 'Hidden', value: records.filter((review) => review.decision === 'hidden').length, tone: 'rose' as const },
    ],
    [records],
  );

  const ratingItems = useMemo(
    () => [5, 4, 3, 2, 1].map((rating) => ({
      label: `${rating} star`,
      value: records.filter((review) => review.rating === rating).length,
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
    setRecords((current) =>
      current.map((item) => (item.id === review.id ? { ...item, decision } : item)),
    );
    setNotice(`${review.id}: ${message}`);
  };

  const flagInappropriate = (review: ReviewRecord) => {
    setRecords((current) =>
      current.map((item) =>
        item.id === review.id
          ? {
              ...item,
              decision: 'flagged',
              flags: Array.from(new Set([...item.flags, 'Inappropriate content review'])),
            }
          : item,
      ),
    );
    setNotice(`${review.id}: content flagged. Manager can now hide it or keep it with quality note.`);
  };

  const renderReviewActions = (review: ReviewRecord) => (
    <>
      {review.decision === 'visible' ? (
        <ManagerActionButton
          icon={Eye}
          reason="Already visible"
          alternative="Flag inappropriate content or hide if policy requires"
          onClick={() => setNotice(`${review.id}: review is already visible. Next valid actions are flag inappropriate content or hide with moderation reason.`)}
        >
          Keep review
        </ManagerActionButton>
      ) : (
        <ManagerActionButton
          icon={Eye}
          variant="primary"
          onClick={() => updateDecision(review, 'visible', 'review kept visible and tutor performance remains counted.')}
        >
          Keep review
        </ManagerActionButton>
      )}
      {review.decision === 'hidden' ? (
        <ManagerActionButton
          icon={EyeOff}
          reason="Already hidden"
          alternative="Keep review to restore visibility after moderation"
          onClick={() => setNotice(`${review.id}: review is already hidden. Next valid action is keep review after the moderation concern is cleared.`)}
        >
          Hide review
        </ManagerActionButton>
      ) : (
        <ManagerActionButton
          icon={EyeOff}
          variant="danger"
          onClick={() => updateDecision(review, 'hidden', 'review hidden from public tutor profile and moderation audit note added.')}
        >
          Hide review
        </ManagerActionButton>
      )}
      {review.decision === 'flagged' ? (
        <ManagerActionButton
          icon={Flag}
          reason="Already flagged"
          alternative="Keep or hide after moderation review"
          onClick={() => setNotice(`${review.id}: review is already flagged. Choose keep or hide to complete moderation.`)}
        >
          Flag inappropriate
        </ManagerActionButton>
      ) : (
        <ManagerActionButton icon={Flag} onClick={() => flagInappropriate(review)}>
          Flag inappropriate
        </ManagerActionButton>
      )}
    </>
  );

  return (
    <motion.div
      className="manager-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <ManagerPageHeader
        eyebrow="UC-10"
        title="Reviews & Ratings"
        description="Moderate completed-lesson reviews, monitor tutor quality signals, and protect tutor profiles from inappropriate content."
        actions={
          <ManagerActionButton
            icon={ShieldCheck}
            variant="primary"
            onClick={() => setNotice('Moderation sweep started. Flagged reviews are prioritized, visible reviews remain counted in tutor performance.')}
          >
            Run moderation sweep
          </ManagerActionButton>
        }
      />

      <ActionLog message={notice} />

      {/* ══ KPI SUMMARY STRIP ══ */}
      <section className="manager-chart-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }} aria-label="Review KPIs">
        <article className="manager-panel" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={18} style={{ color: 'rgb(96,165,250)' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.4 }}>Total Reviews</div>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'serif' }}>{records.length}</div>
            </div>
          </div>
        </article>
        <article className="manager-panel" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={18} style={{ color: 'rgb(52,211,153)' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.4 }}>Avg Rating</div>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'serif' }}>{avgRating}<span style={{ fontSize: 14, opacity: 0.4 }}>/5</span></div>
            </div>
          </div>
        </article>
        <article className="manager-panel" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flag size={18} style={{ color: 'rgb(251,191,36)' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.4 }}>Flagged</div>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'serif' }}>{records.filter(r => r.decision === 'flagged').length}</div>
            </div>
          </div>
        </article>
        <article className="manager-panel" style={{ padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EyeOff size={18} style={{ color: 'rgb(251,113,133)' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.4 }}>Hidden</div>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'serif' }}>{records.filter(r => r.decision === 'hidden').length}</div>
            </div>
          </div>
        </article>
      </section>

      {/* ══ CHARTS ROW ══ */}
      <section className="manager-chart-grid" aria-label="Review moderation charts">
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Moderation mix</span>
              <h2>Review visibility states</h2>
            </div>
            <StatusPill tone="green">Completed only</StatusPill>
          </div>
          <ManagerDonutChart items={moderationItems} centerValue={`${records.length}`} centerLabel="Reviews" />
        </article>

        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Rating distribution</span>
              <h2>Quality signals</h2>
            </div>
            <StatusPill tone="amber">{records.filter((review) => review.rating <= 3).length} watch</StatusPill>
          </div>
          <ManagerBarChart items={ratingItems} />
        </article>
      </section>

      {/* ══ TUTOR PERFORMANCE OVERVIEW ══ */}
      <section aria-label="Tutor performance overview" style={{ marginBottom: '1.5rem' }}>
        <article className="manager-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow"><TrendingUp size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Tutor Performance Overview</span>
              <h2>Quality scorecard by tutor</h2>
            </div>
            <StatusPill tone="blue">{tutorPerformance.length} tutors</StatusPill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {tutorPerformance.map((tutor) => {
              const isRisk = tutor.avg < 3 || tutor.cancellationRate > 10;
              return (
                <div
                  key={tutor.name}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 18,
                    border: `1px solid ${isRisk ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    background: isRisk ? 'rgba(244,63,94,0.03)' : 'rgba(255,255,255,0.02)',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: isRisk ? 'rgba(244,63,94,0.15)' : 'rgba(59,130,246,0.1)',
                        border: `1px solid ${isRisk ? 'rgba(244,63,94,0.3)' : 'rgba(59,130,246,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, color: isRisk ? 'rgb(251,113,133)' : 'rgb(96,165,250)',
                      }}>
                        {tutor.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{tutor.name}</div>
                        <div style={{ fontSize: 11, opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {tutor.total} review{tutor.total !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    {isRisk ? (
                      <StatusPill tone="rose">At risk</StatusPill>
                    ) : tutor.avg >= 4.5 ? (
                      <StatusPill tone="green">Excellent</StatusPill>
                    ) : (
                      <StatusPill tone="blue">Good</StatusPill>
                    )}
                  </div>

                  {/* Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                    <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.3, marginBottom: 4 }}>Avg Rating</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 700, fontFamily: 'serif', color: tutor.avg >= 4 ? 'rgb(52,211,153)' : tutor.avg >= 3 ? 'rgb(251,191,36)' : 'rgb(251,113,133)' }}>
                          {tutor.avg}
                        </span>
                        <RatingStars rating={Math.round(tutor.avg)} size={11} />
                      </div>
                    </div>
                    <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.3, marginBottom: 4 }}>Completion</div>
                      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'serif', color: tutor.completionRate >= 90 ? 'rgb(52,211,153)' : 'rgb(251,191,36)' }}>
                        {tutor.completionRate}%
                      </div>
                    </div>
                  </div>

                  {/* Flags bar */}
                  {(tutor.flagged > 0 || tutor.hidden > 0) && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {tutor.flagged > 0 && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: 'rgb(251,191,36)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {tutor.flagged} flagged
                        </span>
                      )}
                      {tutor.hidden > 0 && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', color: 'rgb(251,113,133)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {tutor.hidden} hidden
                        </span>
                      )}
                    </div>
                  )}

                  {isRisk && (
                    <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 10, background: 'rgba(244,63,94,0.06)', border: '1px solid rgba(244,63,94,0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <AlertTriangle size={13} style={{ color: 'rgb(251,113,133)', flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                        {tutor.avg < 3 ? 'Below quality threshold. Requires performance review.' : `Cancellation rate ${tutor.cancellationRate}% exceeds 10% limit.`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </article>
      </section>

      {/* ══ FILTER BAR ══ */}
      <section className="manager-filter-bar" aria-label="Review filters">
        {(['all', 'visible', 'flagged', 'hidden'] as const).map((decision) => (
          <button
            type="button"
            key={decision}
            className={`manager-filter-chip ${decisionFilter === decision ? 'active' : ''}`}
            onClick={() => setDecisionFilter(decision)}
          >
            {decision === 'all' ? 'Completed lessons only' : decisionLabel(decision)}
          </button>
        ))}
      </section>

      {/* ══ REVIEW LIST + DETAIL ══ */}
      <section className="manager-two-column">
        <div className="manager-panel manager-list-panel">
          <div className="manager-panel-header">
            <div>
              <span className="manager-eyebrow">Moderation queue</span>
              <h2>{filteredReviews.length} completed reviews</h2>
            </div>
            <StatusPill tone="green">Completed lessons</StatusPill>
          </div>

          <div className="manager-record-list">
            {filteredReviews.map((review) => (
              <article className={`manager-record-row ${selectedReview?.id === review.id ? 'selected' : ''}`} key={review.id}>
                <button type="button" className="manager-record-main" onClick={() => setSelectedId(review.id)}>
                  <span className="manager-avatar">{review.student.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                  <span>
                    <strong>{review.student} reviewed {review.tutor}</strong>
                    <small><RatingStars rating={review.rating} /> {review.comment}</small>
                  </span>
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
              <div>
                <span className="manager-eyebrow">{selectedReview.id}</span>
                <h2>{selectedReview.student} to {selectedReview.tutor}</h2>
                <p>{selectedReview.comment}</p>
              </div>
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
