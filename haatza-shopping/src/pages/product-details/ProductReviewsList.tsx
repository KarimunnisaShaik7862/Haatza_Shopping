import React, { useState, useRef, useEffect } from 'react';
import { Star, ShieldCheck, ThumbsUp, X, Check } from 'lucide-react';
import { Product } from '../../types';
import { getProductReviews, ReviewItem } from './productDetailHelper';

interface ProductReviewsListProps {
  product: Product;
  isWriteModalOpen: boolean;
  onCloseWriteModal: () => void;
  onOpenWriteModal?: () => void;
  selectedRatingFilter?: number | null;
  onSelectRatingFilter?: (rating: number | null) => void;
  onPhotoClick?: (photoUrl: string) => void;
}

export const ProductReviewsList: React.FC<ProductReviewsListProps> = ({
  product,
  isWriteModalOpen,
  onCloseWriteModal,
  selectedRatingFilter = null,
  onSelectRatingFilter,
}) => {
  const baseReviews = getProductReviews(product);
  const [reviews, setReviews] = useState<ReviewItem[]>(baseReviews);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const trackRef = useRef<HTMLDivElement>(null);

  // Mouse wheel horizontal scroll support on desktop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      // If scrolling mostly vertically over the track, scroll horizontally smoothly
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && track.scrollWidth > track.clientWidth) {
        track.scrollBy({ left: e.deltaY, behavior: 'auto' });
      }
    };

    track.addEventListener('wheel', handleWheel, { passive: true });
    return () => track.removeEventListener('wheel', handleWheel);
  }, []);

  // Write Review Form State
  const [userRating, setUserRating] = useState(5);
  const [userTitle, setUserTitle] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleHelpfulClick = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const toggleReadMore = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTitle.trim() || !userComment.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-user-${Date.now()}`,
      userName: userName.trim() || 'Verified Shopper',
      location: 'India',
      rating: userRating,
      date: 'Just now',
      title: userTitle.trim(),
      comment: userComment.trim(),
      verified: true,
      helpfulCount: 0,
    };

    setReviews([newReview, ...reviews]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onCloseWriteModal();
      setUserTitle('');
      setUserComment('');
      setUserName('');
    }, 1500);
  };

  // Filter reviews
  const filtered = reviews.filter((r) => {
    if (selectedRatingFilter && r.rating !== selectedRatingFilter) return false;
    return true;
  });

  return (
    <div className="space-y-3.5">
      {/* Header */}
      <div className="pb-1.5">
        <h4 className="text-base font-bold text-slate-900 font-heading">
          Customer Reviews ({reviews.length})
        </h4>
        <p className="text-xs text-slate-500 font-body">
          Real feedback from verified purchasers
        </p>
      </div>

      {/* 1. Single Horizontal Row of Compact Review Cards */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
          <p className="text-sm font-semibold text-slate-700 font-heading">
            No customer reviews match your active filter.
          </p>
          <button
            type="button"
            onClick={() => {
              if (onSelectRatingFilter) onSelectRatingFilter(null);
            }}
            className="text-xs font-bold text-[#2962FF] hover:underline font-heading cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div
          ref={trackRef}
          className="flex flex-row flex-nowrap items-stretch gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x py-2 px-0.5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {filtered.map((rev) => {
            const isExpanded = !!expandedReviews[rev.id];
            const isLong = rev.comment.length > 105;

            return (
              <div
                key={rev.id}
                className="w-[260px] sm:w-[290px] md:w-[310px] lg:w-[325px] shrink-0 snap-start p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#2962FF]/40 hover:shadow-soft-sm transition-all flex flex-col justify-between space-y-3.5 shadow-2xs"
              >
                <div className="space-y-2.5">
                  {/* Top Bar: Author, Verification, Rating Badge, Date */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#EEF3FF] border border-[#DBEAFE] text-[#2962FF] font-black text-xs flex items-center justify-center shrink-0 font-heading">
                        {rev.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 font-heading truncate">
                          {rev.userName}
                        </h5>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-emerald-700">
                            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-700 text-white font-bold text-[11px]">
                        <span>{rev.rating}</span>
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-body mt-0.5">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h6 className="text-xs font-bold text-slate-900 font-heading leading-snug line-clamp-1">
                    {rev.title}
                  </h6>

                  {/* Review Text with Truncation & Read More */}
                  <div className="text-xs text-slate-600 leading-relaxed font-body">
                    <p className={!isExpanded ? 'line-clamp-3' : ''}>
                      {rev.comment}
                    </p>
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleReadMore(rev.id)}
                        className="text-[11px] font-semibold text-[#2962FF] hover:underline mt-0.5 inline-block cursor-pointer font-heading"
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Helpful Button */}
                <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs text-slate-500">
                  <span className="text-[11px] text-slate-400 font-body">
                    Helpful?
                  </span>

                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(rev.id)}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md border border-slate-200 hover:border-[#2962FF] hover:text-[#2962FF] transition-colors cursor-pointer text-slate-700 font-medium"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.helpfulCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={onCloseWriteModal}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Write a Customer Review
              </h3>
              <button
                type="button"
                onClick={onCloseWriteModal}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs text-slate-500 font-body">
                  Your verified review has been posted and will assist fellow shoppers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Rating Stars Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= userRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2 font-heading">
                      {userRating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#2962FF] focus:outline-none"
                  />
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={userTitle}
                    onChange={(e) => setUserTitle(e.target.value)}
                    placeholder="e.g. Superb quality and true to fit!"
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#2962FF] focus:outline-none"
                  />
                </div>

                {/* Review Body */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                    Detailed Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Describe what you liked or disliked about this product..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-[#2962FF] focus:outline-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onCloseWriteModal}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 font-heading cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold rounded-xl text-xs transition-colors font-heading shadow-xs cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
