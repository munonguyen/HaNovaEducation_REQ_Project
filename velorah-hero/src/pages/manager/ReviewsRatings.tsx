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
  ManagerActionButton,
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
      <ManagerActionButton
        icon={Eye}
        variant={review.decision === 'visible' ? 'quiet' : 'primary'}
        onClick={() => updateDecision(review, 'visible', 'review kept visible and tutor performance remains counted.')}
      >
        Keep review
      </ManagerActionButton>
      <ManagerActionButton
        icon={EyeOff}
        variant="danger"
        onClick={() => updateDecision(review, 'hidden', 'review hidden from public tutor profile and moderation audit note added.')}
      >
        Hide review
      </ManagerActionButton>
      <ManagerActionButton icon={Flag} onClick={() => flagInappropriate(review)}>
        Flag inappropriate
      </ManagerActionButton>
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
