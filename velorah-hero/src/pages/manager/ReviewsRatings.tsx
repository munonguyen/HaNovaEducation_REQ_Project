import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Flag, ShieldCheck, Star } from 'lucide-react';
import {
  reviews as initialReviews,
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

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="manager-rating-stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={15} fill={index < rating ? 'currentColor' : 'none'} />
      ))}
    </span>
  );
}

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
        description="Moderate completed-lesson reviews, protect tutor profiles from inappropriate content, and keep quality signals available for manager decisions."
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
