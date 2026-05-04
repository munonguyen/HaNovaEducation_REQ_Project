import { useState } from 'react';
import {
  Star,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  BarChart3,
  Award,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reviewStats = [
  { label: 'Average Rating', value: '4.9', icon: Star, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { label: 'Total Reviews', value: '48', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Recommend Rate', value: '98%', icon: ThumbsUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { label: 'Improvement', value: '+0.2', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-400/10' },
];

const mockReviews = [
  {
    id: 'rev1',
    student: 'Lan Anh',
    subject: 'Grade 12 Math',
    rating: 5,
    date: '2 hours ago',
    comment: 'The integral techniques shared today were extremely helpful. I finally understand the substitution method clearly. Looking forward to our next sprint session!',
    status: 'new',
  },
  {
    id: 'rev2',
    student: 'Minh Quan',
    subject: 'IELTS Writing',
    rating: 4,
    date: 'Yesterday',
    comment: 'Great feedback on my Task 2 essay. The suggestions on coherence and cohesion really helped me restructure my arguments. Just need to work more on complex grammar structures.',
    status: 'read',
  },
  {
    id: 'rev3',
    student: 'Gia Bao',
    subject: 'Physics',
    rating: 5,
    date: '3 days ago',
    comment: 'Excellent explanation of electric fields. The visual analogies helped me grasp the concept much faster than reading the textbook alone.',
    status: 'read',
  },
  {
    id: 'rev4',
    student: 'Thanh Truc',
    subject: 'Chemistry 11',
    rating: 5,
    date: '1 week ago',
    comment: 'Very patient and clear explanations. I feel much more confident about the upcoming midterm exam after our review sessions.',
    status: 'read',
  },
];

export default function PerformanceReviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [filter, setFilter] = useState<'all' | 'new'>('all');
  const [feedback, setFeedback] = useState('Monitor your teaching impact and student feedback in real-time.');

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(r => r.status === 'new');

  const handleAcknowledge = (id: string) => {
    setReviews(current => current.map(r => r.id === id ? { ...r, status: 'read' } : r));
    setFeedback('Review acknowledged. Thank you for monitoring student feedback!');
  };

  return (
    <motion.div
      className="tutor-page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="tutor-page-header">
        <div>
          <span className="tutor-eyebrow"><BarChart3 size={16} /> UC-09 performance review</span>
          <h1 className="tutor-page-title">Tutor Performance</h1>
          <p className="tutor-page-subtitle">
            Analyze your teaching metrics and review direct feedback from your students to improve quality.
          </p>
        </div>
        <div className="tutor-actions">
          <button className="tutor-btn" onClick={() => setFeedback('Performance report generated for April 2026.')}>
            <Award size={16} /> Monthly Report
          </button>
          <button className="tutor-btn primary" onClick={() => setFeedback('Live feedback sync completed.')}>
            <Zap size={16} /> Sync Reviews
          </button>
        </div>
      </div>

      <section className="insight-panel">
        <div className="tutor-soft-icon green"><CheckCircle2 size={19} /></div>
        <div>
          <strong>Performance status</strong>
          <p>{feedback}</p>
        </div>
      </section>

      <div className="performance-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {reviewStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className="tutor-card !mb-0 flex items-center gap-4" key={stat.label}>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon size={22} className={stat.color} />
              </div>
              <div>
                <strong className="text-2xl font-serif text-white">{stat.value}</strong>
                <p className="text-[12px] text-white/40">{stat.label}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="reviews-layout grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <section className="tutor-card">
          <div className="tutor-card-header">
            <div>
              <h2 className="tutor-section-title">Student Feedback</h2>
              <p className="tutor-section-copy">Direct comments from students after completed lessons.</p>
            </div>
            <div className="flex gap-2">
              <button 
                className={`compact-btn ${filter === 'all' ? 'primary' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`compact-btn ${filter === 'new' ? 'primary' : ''}`}
                onClick={() => setFilter('new')}
              >
                New
              </button>
            </div>
          </div>

          <div className="review-feed space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={review.id}
                  className={`p-5 rounded-2xl border transition-all ${review.status === 'new' ? 'bg-white/[0.04] border-emerald-500/20' : 'bg-white/[0.02] border-white/[0.06]'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                        {review.student[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white">{review.student}</strong>
                          <span className="tutor-chip indigo">{review.subject}</span>
                        </div>
                        <span className="text-[11px] text-white/30">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-white/10'} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 italic">
                    "{review.comment}"
                  </p>
                  {review.status === 'new' && (
                    <button 
                      className="compact-btn success text-[11px]"
                      onClick={() => handleAcknowledge(review.id)}
                    >
                      <CheckCircle2 size={13} /> Acknowledge feedback
                    </button>
                  )}
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="tutor-card">
            <div className="tutor-card-header mb-4">
              <div>
                <h2 className="tutor-section-title">Growth Insights</h2>
                <p className="tutor-section-copy">AI-driven areas for improvement.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <strong className="text-emerald-400 text-xs block mb-1">STRENGTH</strong>
                <p className="text-white/60 text-[11px]">Consistent positive feedback on "Visual Analogies" and "Patience".</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <strong className="text-amber-400 text-xs block mb-1">OPPORTUNITY</strong>
                <p className="text-white/60 text-[11px]">Some students mentioned wanting more "Complex Grammar" examples in IELTS.</p>
              </div>
            </div>
          </section>

          <section className="tutor-card">
            <div className="tutor-card-header mb-4">
              <div>
                <h2 className="tutor-section-title">Rating Mix</h2>
                <p className="tutor-section-copy">Distribution of star ratings.</p>
              </div>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(star => {
                const count = star === 5 ? 42 : star === 4 ? 5 : 1;
                const pct = (count / 48) * 100;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-[11px] text-white/40 w-3">{star}</span>
                    <Star size={10} className="text-white/20" />
                    <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400/60 rounded-full" 
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-white/30 w-5">{count}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </motion.div>
  );
}
