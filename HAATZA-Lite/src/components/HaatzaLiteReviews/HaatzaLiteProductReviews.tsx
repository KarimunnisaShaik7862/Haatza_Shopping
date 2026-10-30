import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Star, CheckCircle2, ThumbsUp, X, ChevronDown, ChevronUp, Sparkles, Check,
  Camera, Image as ImageIcon, ZoomIn, PenSquare, Zap, ShieldCheck
} from 'lucide-react';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  helpfulCount: number;
  images?: string[];
}

interface HaatzaLiteProductReviewsProps {
  product: HaatzaLiteProduct;
}

export const HaatzaLiteProductReviews: React.FC<HaatzaLiteProductReviewsProps> = ({ product }) => {
  const storageKey = `haatza_lite_reviews_${product.id || product.slug}`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default seed reviews with photos
  const defaultReviews: CustomerReview[] = useMemo(() => [
    {
      id: 'rev-1',
      author: 'Priya Sundaram',
      rating: 5,
      date: '2 days ago',
      comment: 'Very fresh and delivered in 7 mins! The moisture seal kept everything crisp. The quality is exceptional and packaging is clean, sturdy, and well-handled.',
      isVerified: true,
      helpfulCount: 14,
      images: [
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80',
      ],
    },
    {
      id: 'rev-2',
      author: 'Arjun Mehta',
      rating: 5,
      date: '5 days ago',
      comment: 'Top quality, zero blemishes, packed carefully. Super fast delivery straight to doorstep in perfect condition.',
      isVerified: true,
      helpfulCount: 8,
      images: [
        'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=400&q=80',
      ],
    },
    {
      id: 'rev-3',
      author: 'Kavita Sharma',
      rating: 4,
      date: '1 week ago',
      comment: 'Clean packaging and high everyday quality. Value for money is exceptional.',
      isVerified: true,
      helpfulCount: 5,
    },
    {
      id: 'rev-4',
      author: 'Rahul Verma',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Top-tier dark store hygiene. Way fresher than typical stores, love the contactless delivery.',
      isVerified: true,
      helpfulCount: 9,
    },
  ], []);

  // Load reviews from localStorage
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return defaultReviews;
  });

  const [votedHelpful, setVotedHelpful] = useState<Record<string, boolean>>({});
  const [helpfulPopups, setHelpfulPopups] = useState<Record<string, boolean>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Persist reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch {
      // Ignore
    }
  }, [reviews, storageKey]);

  // Total rating display: 4.5 based on 920 reviews
  const totalReviewsCount = 920;
  const averageRating = '4.5';

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      counts[star] = (counts[star] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (filterRating === 'all') return reviews;
    return reviews.filter(r => Math.round(r.rating) === filterRating);
  }, [reviews, filterRating]);

  // Limit display to 4 reviews unless expanded
  const visibleReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 4);

  const handleHelpful = (id: string) => {
    if (votedHelpful[id]) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
    setVotedHelpful(prev => ({ ...prev, [id]: true }));
    setHelpfulPopups(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setHelpfulPopups(prev => ({ ...prev, [id]: false }));
    }, 1400);
  };

  // Image Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos(prev => [...prev, event.target!.result as string].slice(0, 4));
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeUploadedPhoto = (indexToRemove: number) => {
    setUploadedPhotos(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: name.trim(),
      rating,
      date: 'Just now',
      comment: comment.trim(),
      isVerified: true,
      helpfulCount: 0,
      images: uploadedPhotos.length > 0 ? [...uploadedPhotos] : undefined,
    };

    setReviews(prev => [newRev, ...prev]);
    setSubmitted(true);
    setName('');
    setComment('');
    setRating(5);
    setUploadedPhotos([]);

    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
      setShowAllReviews(true);
    }, 1200);
  };

  // Rating breakdown rows
  const ratingBreakdown = [
    { stars: 5, percent: 65, barColor: 'bg-[#2563EB]' },
    { stars: 4, percent: 23, barColor: 'bg-[#2563EB]' },
    { stars: 3, percent: 8, barColor: 'bg-[#F59E0B]' },
    { stars: 2, percent: 2, barColor: 'bg-slate-300' },
    { stars: 1, percent: 2, barColor: 'bg-slate-300' },
  ];

  // Verified grocery customer sentiments tailored for HAATZA Lite quick commerce
  const customerSentiments = useMemo(() => {
    const category = (product.categoryName || product.categoryId || '').toLowerCase();

    if (category.includes('fruit') || category.includes('vegetable')) {
      return [
        { label: 'Farm Fresh & Crisp', percentage: 98 },
        { label: 'Clean & Safe Packaging', percentage: 96 },
        { label: 'Natural Color & Look', percentage: 95 },
        { label: 'Sweet & Juicy Taste', percentage: 93 },
        { label: '10-Min Express Delivery', percentage: 98 },
      ];
    }

    if (category.includes('dairy') || category.includes('milk') || category.includes('breakfast')) {
      return [
        { label: 'Fresh Daily Stock', percentage: 98 },
        { label: 'Chilled Cold-Chain Storage', percentage: 97 },
        { label: 'Long Expiry Shelf Life', percentage: 96 },
        { label: 'Pure Taste & Quality', percentage: 94 },
        { label: '10-Min Express Delivery', percentage: 98 },
      ];
    }

    if (category.includes('snack') || category.includes('beverage') || category.includes('drink')) {
      return [
        { label: 'Crisp & Fresh Batch', percentage: 97 },
        { label: 'Airtight Sealed Packing', percentage: 96 },
        { label: 'Authentic Brand Taste', percentage: 95 },
        { label: 'Zero Damage Handling', percentage: 94 },
        { label: '10-Min Express Delivery', percentage: 98 },
      ];
    }

    if (category.includes('household') || category.includes('clean') || category.includes('kitchen')) {
      return [
        { label: '100% Genuine Certified', percentage: 97 },
        { label: 'Leak-Proof Safe Seal', percentage: 96 },
        { label: 'Effective Everyday Utility', percentage: 95 },
        { label: 'Fresh Long Expiry Date', percentage: 94 },
        { label: '10-Min Express Delivery', percentage: 98 },
      ];
    }

    // Default authentic grocery sentiments for Haatza Lite
    return [
      { label: 'Farm Fresh Quality', percentage: 97 },
      { label: 'Hygienic Sealed Packing', percentage: 96 },
      { label: 'Item as Described', percentage: 95 },
      { label: 'Rich Natural Taste', percentage: 93 },
      { label: '10-Min Express Delivery', percentage: 98 },
    ];
  }, [product.categoryName, product.categoryId]);

  return (
    <section className="space-y-6 mt-4 mb-8">
      <style>{`
        /* 1. Review Card Magnetic Container with 3D Depth */
        .review-box-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          position: relative;
          transition: transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      box-shadow 320ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      border-color 320ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      background-color 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          will-change: transform, box-shadow;
          overflow: hidden;
        }

        .review-box-card:hover {
          transform: translate3d(0, -6px, 0) scale(1.018);
          border-color: rgba(12, 131, 31, 0.50) !important;
          background: #FFFFFF !important;
          box-shadow: 0 20px 38px -10px rgba(12, 131, 31, 0.18),
                      0 0 24px 2px rgba(12, 131, 31, 0.10),
                      0 2px 8px rgba(0, 0, 0, 0.04) !important;
          z-index: 20;
        }

        /* 2. Dynamic Cursor Spotlight (Follows mouse inside card) */
        .review-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(12, 131, 31, 0.12), transparent 75%);
          opacity: 0;
          transition: opacity 280ms ease;
          z-index: 1;
        }

        .review-box-card:hover .review-spotlight {
          opacity: 1;
        }

        /* 3. Iridescent Glowing Border Accent */
        .review-box-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: linear-gradient(135deg, rgba(12, 131, 31, 0.6) 0%, rgba(52, 211, 153, 0.35) 45%, rgba(245, 158, 11, 0.3) 75%, rgba(12, 131, 31, 0.6) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 320ms ease;
          pointer-events: none;
          z-index: 3;
        }

        .review-box-card:hover::before {
          opacity: 1;
        }

        /* 4. Optical Sheen Sweep across Card on Hover */
        @keyframes reviewSheenSweep {
          0% { transform: translate3d(-150%, 0, 0) skewX(-25deg); opacity: 0; }
          30% { opacity: 0.75; }
          100% { transform: translate3d(260%, 0, 0) skewX(-25deg); opacity: 0; }
        }

        .review-box-card .card-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 45%, rgba(12, 131, 31, 0.22) 55%, transparent 100%);
          opacity: 0;
          z-index: 15;
        }

        .review-box-card:hover .card-sheen {
          animation: reviewSheenSweep 0.85s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* 5. Sequential Star Wave Ripple on Card Hover */
        @keyframes starWaveRipple {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0)); }
          50% { transform: scale(1.35) rotate(-10deg); filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.9)) brightness(1.25); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0)); }
        }

        .review-box-card:hover .star-wave-0 { animation: starWaveRipple 0.35s ease 0.04s; }
        .review-box-card:hover .star-wave-1 { animation: starWaveRipple 0.35s ease 0.11s; }
        .review-box-card:hover .star-wave-2 { animation: starWaveRipple 0.35s ease 0.18s; }
        .review-box-card:hover .star-wave-3 { animation: starWaveRipple 0.35s ease 0.25s; }
        .review-box-card:hover .star-wave-4 { animation: starWaveRipple 0.35s ease 0.32s; }

        /* 6. Verified Buyer Badge Gentle Radar Pulse */
        @keyframes verifiedBadgePulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(12, 131, 31, 0.3)); }
          50% { transform: scale(1.05); filter: drop-shadow(0 0 6px rgba(12, 131, 31, 0.6)); }
        }

        .review-box-card:hover .badge-verified {
          animation: verifiedBadgePulse 2s ease-in-out infinite;
        }

        /* 7. Star Rating Sparkle Box */
        .review-box-card:hover .star-badge-box {
          transform: scale(1.08);
          border-color: rgba(245, 158, 11, 0.8);
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.35);
        }

        .star-badge-box {
          transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 250ms ease,
                      border-color 250ms ease;
        }

        /* 8. Floating "+1 Helpful!" Particle Burst */
        @keyframes helpfulParticleFloat {
          0% { transform: translateY(0) scale(0.7); opacity: 0; }
          25% { transform: translateY(-8px) scale(1.15); opacity: 1; }
          75% { transform: translateY(-22px) scale(1); opacity: 0.95; }
          100% { transform: translateY(-32px) scale(0.9); opacity: 0; }
        }

        .helpful-float-particle {
          animation: helpfulParticleFloat 1.35s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* 9. Helpful Button Pop Animation */
        @keyframes helpfulPop {
          0% { transform: scale(1); }
          40% { transform: scale(1.3) translateY(-2px); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        .btn-helpful-pop {
          animation: helpfulPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* 10. Staggered Card Entrance */
        @keyframes reviewCardSlideUp {
          from {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .review-card-animate {
          animation: reviewCardSlideUp 400ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        /* 11. Rating Breakdown Progress Bars Smooth Width Fill */
        .rating-bar-progress {
          transition: width 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 12. Sentiment Pill Interactive Micro-Lift */
        .sentiment-item-card {
          transition: transform 250ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      border-color 250ms ease,
                      box-shadow 250ms ease,
                      background-color 250ms ease;
        }

        .sentiment-item-card:hover {
          transform: translate3d(0, -2.5px, 0);
          border-color: rgba(12, 131, 31, 0.40) !important;
          background: #FFFFFF !important;
          box-shadow: 0 6px 16px -2px rgba(12, 131, 31, 0.10) !important;
        }

        .sentiment-item-card:hover .sentiment-thumb {
          transform: scale(1.2) rotate(-8deg);
          color: #0C831F;
        }

        .sentiment-thumb {
          transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms ease;
        }

        /* 13. Photo Thumbnail Micro-Zoom */
        .review-thumb-zoom {
          transition: transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease;
        }

        .review-thumb-zoom:hover {
          transform: scale(1.12) rotate(1.5deg);
          border-color: #0C831F !important;
          box-shadow: 0 4px 12px rgba(12, 131, 31, 0.25) !important;
          z-index: 10;
        }

        @media (prefers-reduced-motion: reduce) {
          .review-box-card,
          .card-sheen,
          .review-card-animate,
          .sentiment-item-card,
          .btn-helpful-pop,
          .helpful-float-particle {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* =========================================================================
          1. SECTION HEADER (Ratings & Customer Feedback + Write a Review Button)
          ========================================================================= */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Ratings & Customer Feedback
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Based on {totalReviewsCount} verified customer reviews
          </p>
        </div>

        {/* Write a Review Button */}
        <button
          type="button"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] border border-[#BFDBFE] font-bold text-xs sm:text-sm transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
        >
          {isFormOpen ? <X className="w-4 h-4" /> : <PenSquare className="w-4 h-4" />}
          <span>{isFormOpen ? 'Close Review Form' : 'Write a Review'}</span>
        </button>
      </div>

      {/* =========================================================================
          2. TWO MAIN CARDS SIDE-BY-SIDE (Rating Breakdown + What Customers Like)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        
        {/* LEFT CARD: Score & Rating Breakdown */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6">
            
            {/* Left Sub-Box: 4.5 Stars + 920 Ratings & Reviews + 96% Recommended */}
            <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center w-full sm:w-[170px] shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">
                  {averageRating}
                </span>
                <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-medium mt-1.5">
                {totalReviewsCount} Ratings & Reviews
              </span>
              <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold">
                <Check className="w-3 h-3 stroke-[2.5]" />
                <span>96% Recommended</span>
              </div>
            </div>

            {/* Right Side: Rating Breakdown Bars */}
            <div className="flex-1 w-full flex flex-col justify-center space-y-2 sm:pl-2">
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                Rating Breakdown
              </h4>
              {ratingBreakdown.map((b) => (
                <div key={b.stars} className="flex items-center text-xs">
                  <span className="flex items-center gap-1 font-bold text-slate-700 w-7 shrink-0">
                    {b.stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-3">
                    <div
                      className={`h-full rounded-full ${b.barColor} rating-bar-progress`}
                      style={{ width: `${b.percent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 w-8 text-right shrink-0">
                    {b.percent}%
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT CARD: What Customers Like (Sentiment Pills) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header: ThumbsUp in Circle + Title + Subtitle */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <ThumbsUp className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  What Customers Like
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Verified customer sentiment based on recent purchases
                </p>
              </div>
            </div>

            {/* 2-Column Sentiment Pills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-4">
              {customerSentiments.map((item, idx) => (
                <div
                  key={idx}
                  className="sentiment-item-card flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-slate-200/80 bg-white shadow-2xs cursor-default"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ThumbsUp className="sentiment-thumb w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-800 truncate">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md shrink-0">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          3. INLINE WRITE REVIEW FORM WITH PHOTO UPLOADER
          ========================================================================= */}
      {isFormOpen && (
        <div className="bg-[#F0FDF4]/70 border border-[#00C853]/30 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
            <span className="flex items-center gap-1.5 text-[#00C853] text-sm">
              <Sparkles className="w-4 h-4" /> Rate & Review this product
            </span>
            {submitted && (
              <span className="text-xs text-[#00C853] flex items-center gap-1 font-bold animate-pulse">
                <Check className="w-4 h-4" /> Review Published with Photos!
              </span>
            )}
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {/* Star selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Your Rating:</span>
                <div className="flex items-center gap-0.5 bg-white px-2 py-1 rounded-lg border border-emerald-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-0.5 text-slate-300 hover:text-[#00C853] transition-colors cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          (hoverRating || rating) >= star
                            ? 'fill-[#00C853] text-[#00C853] drop-shadow-[0_0_6px_rgba(0,200,83,0.35)]'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#00C853] ml-1">
                  ({rating} of 5 Stars)
                </span>
              </div>

              {/* Name & review inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Ananya Sen)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]/20 shadow-2xs"
                  required
                />
                <input
                  type="text"
                  placeholder="Your review (e.g. Crisp, fresh, arrived in 8 mins)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="sm:col-span-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]/20 shadow-2xs"
                  required
                />
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#00C853]" />
                    <span>Upload Product Photos (Max 4 photos)</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Optional</span>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Upload button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="review-photo-upload"
                  />
                  <label
                    htmlFor="review-photo-upload"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[#00C853] bg-white hover:bg-[#F0FDF4] text-[#00C853] text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Choose Photos</span>
                  </label>

                  {/* Uploaded photo thumbnails with remove button */}
                  {uploadedPhotos.map((photo, idx) => (
                    <div key={idx} className="relative w-11 h-11 rounded-lg overflow-hidden border border-emerald-300 shadow-2xs group">
                      <img src={photo} alt={`Upload preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeUploadedPhoto(idx)}
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 hover:bg-red-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                        title="Remove photo"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-3 py-1.5 text-slate-500 hover:text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00C853] hover:bg-[#00B348] text-white text-xs font-bold cursor-pointer transition-all shadow-xs hover:shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-2 text-xs font-bold text-[#00C853]">
              Thank you! Your verified review and photos are now live.
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          4. CUSTOMER REVIEWS FEED & PHOTO GALLERY
          ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        
        {/* Filter Pills */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-full font-bold cursor-pointer transition-all duration-200 active:scale-95 shrink-0 text-xs ${
                filterRating === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 hover:text-slate-900 text-slate-700'
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            {[5, 4, 3].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterRating(filterRating === s ? 'all' : s)}
                className={`px-3 py-1 rounded-full font-bold cursor-pointer transition-all duration-200 active:scale-95 shrink-0 flex items-center gap-1 text-xs ${
                  filterRating === s
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 hover:text-slate-900 text-slate-700'
                }`}
              >
                <span>{s}★</span>
                <span className="opacity-75">({ratingCounts[s as 1 | 2 | 3 | 4 | 5] || 0})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-[10px] font-extrabold text-emerald-800 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>DarkStore Verified Feed</span>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Showing {visibleReviews.length} of {filteredReviews.length}
            </span>
          </div>
        </div>

        {/* Reviews Feed: Compact Rectangle Customer Review Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {visibleReviews.map((rev, idx) => {
            const isLiked = votedHelpful[rev.id];
            return (
              <div
                key={rev.id}
                style={{ animationDelay: `${idx * 65}ms` }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="review-box-card review-card-animate bg-[#F8FAFC]/75 border border-slate-200/85 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs group"
              >
                {/* Dynamic Cursor Spotlight Following Mouse Pointer */}
                <div className="review-spotlight" aria-hidden="true" />
                {/* Optical Sheen Streak */}
                <div className="card-sheen" aria-hidden="true" />

                <div className="relative z-10 space-y-2">
                  {/* Top Row: Customer Name & Rating Badge */}
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 text-xs sm:text-[13px] truncate">
                          {rev.author}
                        </span>
                        {rev.isVerified && (
                          <span className="badge-verified inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200/60 shrink-0 transition-transform">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {rev.date}
                        </span>
                        <span className="text-[9px] font-extrabold text-emerald-800/90 bg-emerald-50/90 px-1.5 py-0.2 rounded border border-emerald-200/70 inline-flex items-center gap-0.5 shadow-3xs">
                          <Zap className="w-2.5 h-2.5 text-[#0C831F] fill-[#0C831F]" />
                          <span>DarkStore #{10 + (idx % 5)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Stars Badge */}
                    <div className="star-badge-box flex items-center gap-0.5 shrink-0 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/60 cursor-default">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] font-black text-amber-800">
                        {rev.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Stars Row with Sequential Wave Ripple on Hover */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s, sIdx) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 star-wave-${sIdx} transition-transform ${
                          s <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-slate-700 font-normal leading-relaxed line-clamp-3">
                    {rev.comment}
                  </p>

                  {/* Attached Photos (Compact thumbnails if present) */}
                  {rev.images && rev.images.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                      {rev.images.map((imgUrl, imgIdx) => (
                        <div
                          key={imgIdx}
                          onClick={() => setPreviewImage(imgUrl)}
                          className="review-thumb-zoom relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group shrink-0"
                        >
                          <img
                            src={imgUrl}
                            alt={`Review photo ${imgIdx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                            <ZoomIn className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Helpful Button with Floating Particle */}
                <div className="relative z-10 flex items-center justify-end pt-2 mt-2 border-t border-slate-100">
                  {helpfulPopups[rev.id] && (
                    <span className="helpful-float-particle absolute -top-5 right-1 z-30 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black shadow-md pointer-events-none">
                      <Sparkles className="w-2.5 h-2.5 fill-current" /> +1 Helpful!
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleHelpful(rev.id)}
                    disabled={isLiked}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                      isLiked
                        ? 'text-emerald-600 font-bold btn-helpful-pop'
                        : 'text-slate-400 hover:text-slate-700 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All / Collapse toggle */}
        {filteredReviews.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="w-full py-2 text-center text-xs sm:text-sm font-bold text-[#2563EB] hover:text-blue-800 border-t border-slate-100 pt-3 flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <span>{showAllReviews ? 'Show Less Reviews' : `View All ${filteredReviews.length} Customer Reviews`}</span>
            {showAllReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* =========================================================================
          5. LIGHTBOX MODAL FOR PREVIEWING CUSTOMER PHOTOS
          ========================================================================= */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden bg-black p-1 shadow-2xl">
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Customer product photo enlarged"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

    </section>
  );
};

export default HaatzaLiteProductReviews;
