import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Product } from '../../types';
import {
  PromotionalProductItem,
  getTwoColumnPromos,
  calculateDiscount,
} from './productPromosData';

interface ProductPromosSectionProps {
  currentProduct: Product;
  autoRotateIntervalMs?: number;
}

export const ProductPromosSection: React.FC<ProductPromosSectionProps> = ({
  currentProduct,
  autoRotateIntervalMs = 6000,
}) => {
  const dataset = getTwoColumnPromos(currentProduct);
  const rotatingFeatured = dataset.rotatingFeatured;
  const galleryPromotions = dataset.galleryPromotions;

  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotation timer for the single large featured promotion in the left column
  useEffect(() => {
    if (rotatingFeatured.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveFeaturedIndex((prev) => (prev + 1) % rotatingFeatured.length);
        setIsTransitioning(false);
      }, 250);
    }, autoRotateIntervalMs);

    return () => clearInterval(timer);
  }, [rotatingFeatured.length, isPaused, autoRotateIntervalMs]);

  // Reset index on product switch
  useEffect(() => {
    setActiveFeaturedIndex(0);
  }, [currentProduct.id]);

  const activeFeatured = rotatingFeatured[activeFeaturedIndex] || dataset.featuredPromotion;

  return (
    <section
      aria-label="Promos for you"
      className="w-full py-2.5 sm:py-3 space-y-3 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Scoped CSS for Realistic Floating Garment, Ambient Radial Shadows, and Strikethrough Animation */}
      <style>{`
        @keyframes promoLevitate {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }
        @keyframes promoShadowBreathe {
          0%, 100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0.52;
            filter: blur(3.5px);
          }
          50% {
            transform: scaleX(0.86) scaleY(0.78);
            opacity: 0.28;
            filter: blur(5px);
          }
        }
        .promo-levitate-effect {
          animation: promoLevitate 4.5s ease-in-out infinite;
          will-change: transform;
        }
        .promo-shadow-effect {
          animation: promoShadowBreathe 4.5s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .promo-levitate-effect,
          .promo-shadow-effect {
            animation: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-0.5">
        <div className="flex items-center gap-2">
          <div className="w-5.5 h-5.5 rounded-md bg-[#EAF2FF] flex items-center justify-center text-[#155EEF] shrink-0">
            <Sparkles className="w-3 h-3 text-[#155EEF]" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#111827] tracking-tight font-heading leading-tight">
            Promos for you
          </h3>
          <span className="hidden sm:inline-block text-slate-300">•</span>
          <p className="hidden sm:inline-block text-xs text-slate-500 font-body">
            Curated campaign spotlights with floating product displays & verified savings
          </p>
        </div>

        {/* Small Dot Nav Indicator for rotating featured items */}
        {rotatingFeatured.length > 1 && (
          <div className="flex items-center gap-1.5 bg-slate-100/80 px-2 py-0.5 rounded-full border border-slate-200/60 shadow-2xs">
            {rotatingFeatured.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setActiveFeaturedIndex(idx);
                    setIsTransitioning(false);
                  }, 200);
                }}
                aria-label={`Show ${item.productName}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeFeaturedIndex === idx
                    ? 'w-3.5 h-1.5 bg-[#155EEF]'
                    : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          TWO-COLUMN MOSAIC LAYOUT:
          - LEFT COLUMN: 35% WIDTH (Large Dominant Featured Product with Increased Image Size)
          - RIGHT COLUMN: 65% WIDTH (Row 1: 3 Grids + Row 2: 2 Grids with Increased Image Sizes)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-3 sm:gap-3.5 items-stretch">
        {/* =====================================================================
            LEFT COLUMN (35% WIDTH): Large Featured Promotion
            - ONE large dominant featured product (Ghost Mannequin apparel)
            - Significantly increased image size to fill card majestically
            - Soft black elliptical shadow directly underneath
            - Natural stretching to match the exact combined height of the right side
            ===================================================================== */}
        <div className="flex flex-col h-full">
          <LeftFeaturedColumnTile
            item={activeFeatured}
            isTransitioning={isTransitioning}
          />
        </div>

        {/* =====================================================================
            RIGHT COLUMN (65% WIDTH): Promotional Gallery
            - FIRST ROW: Exactly THREE GRIDS (Eyewear, Skincare, Watches)
            - SECOND ROW: Exactly TWO GRIDS (Luxury Handbag, Urban Sneakers)
            - Increased floating product image sizes throughout
            ===================================================================== */}
        <div className="flex flex-col h-full">
          <RightPromotionalGallery items={galleryPromotions} />
        </div>
      </div>
    </section>
  );
};

// ===========================================================================
// 1. LEFT FEATURED COLUMN TILE (35% Width, Stretches to match Right Column)
// Dominant enlarged floating ghost mannequin product display
// ===========================================================================
interface LeftFeaturedColumnTileProps {
  item: PromotionalProductItem;
  isTransitioning: boolean;
}

const LeftFeaturedColumnTile: React.FC<LeftFeaturedColumnTileProps> = ({
  item,
  isTransitioning,
}) => {
  return (
    <Link
      to={item.navigationUrl}
      className="group relative flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#EBF2FF] via-[#F6F9FF] to-white border border-[#D4E3FF]/90 shadow-2xs hover:shadow-soft-sm hover:border-[#155EEF]/50 transition-all duration-300 overflow-hidden cursor-pointer h-full"
    >
      {/* Subtle Atmospheric Radial Glow Behind Product */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(21,94,239,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Large Dominant Floating Product Image (Enlarged Ghost Mannequin) */}
      <div className="relative z-10 py-3 sm:py-5 flex-1 flex flex-col items-center justify-center">
        <div
          className={`relative flex flex-col items-center justify-center transition-all duration-400 ease-out ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Floating Garment Image - Significantly Enlarged Size */}
          <div className="promo-levitate-effect flex items-center justify-center">
            <img
              src={item.image}
              alt={item.productName}
              className="w-52 sm:w-64 md:w-72 lg:w-80 h-52 sm:h-64 md:h-72 lg:h-80 object-contain drop-shadow-[0_16px_32px_rgba(21,94,239,0.18)] group-hover:scale-104 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Soft Visible Elliptical Black Floating Shadow Directly Underneath */}
          <div
            className="promo-shadow-effect -mt-1 sm:-mt-2"
            style={{
              width: '185px',
              height: '13px',
              background:
                'radial-gradient(ellipse at center, rgba(17, 24, 39, 0.48) 0%, rgba(17, 24, 39, 0.16) 48%, transparent 72%)',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>

      {/* Bottom Content: Product Name & Sequential Animated Pricing */}
      <div className="relative z-10 pt-2.5 border-t border-slate-200/70 space-y-1.5">
        <div className="space-y-0.5">
          <h4 className="text-base sm:text-lg font-bold text-[#111827] group-hover:text-[#155EEF] transition-colors font-heading leading-tight line-clamp-1">
            {item.productName}
          </h4>
          {item.tagline && (
            <p className="text-xs text-slate-500 font-body line-clamp-1">
              {item.tagline}
            </p>
          )}
        </div>

        {/* Pricing in sequential order: Original -> Strikethrough -> % OFF -> Final Selling Price */}
        <div className="pt-0.5">
          <AnimatedPriceSequence
            key={item.id}
            originalPrice={item.originalPrice}
            sellingPrice={item.sellingPrice}
            isLarge={true}
          />
        </div>
      </div>
    </Link>
  );
};

// ===========================================================================
// 2. RIGHT PROMOTIONAL GALLERY (65% Width)
// Row 1: THREE GRIDS (Sunglasses, Skincare, Watches)
// Row 2: TWO GRIDS (Luxury Handbag, Urban Sneakers)
// Uses a 6-column CSS Grid: Row 1 = 3 x col-span-2; Row 2 = 2 x col-span-3
// ===========================================================================
interface RightPromotionalGalleryProps {
  items: PromotionalProductItem[];
}

const RightPromotionalGallery: React.FC<RightPromotionalGalleryProps> = ({ items }) => {
  // Row 1: Exactly 3 items
  const row1Items = items.slice(0, 3);
  // Row 2: Exactly 2 items
  const row2Items = items.slice(3, 5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-3.5 h-full items-stretch">
      {/* =====================================================================
          FIRST ROW: EXACTLY THREE GRIDS (Each col-span-2 in 6-col grid)
          ===================================================================== */}
      {row1Items.map((item) => (
        <div key={item.id} className="col-span-1 sm:col-span-2 flex flex-col">
          <RightGalleryTile item={item} isRow2={false} />
        </div>
      ))}

      {/* =====================================================================
          SECOND ROW: EXACTLY TWO GRIDS (Each col-span-3 in 6-col grid)
          ===================================================================== */}
      {row2Items.map((item) => (
        <div key={item.id} className="col-span-1 sm:col-span-3 flex flex-col">
          <RightGalleryTile item={item} isRow2={true} />
        </div>
      ))}
    </div>
  );
};

// ===========================================================================
// 3. RIGHT GALLERY TILE (For Both Row 1 and Row 2)
// Clean focus with significantly enlarged floating product imagery
// ===========================================================================
interface RightGalleryTileProps {
  item: PromotionalProductItem;
  isRow2: boolean;
}

const RightGalleryTile: React.FC<RightGalleryTileProps> = ({ item, isRow2 }) => {
  return (
    <Link
      to={item.navigationUrl}
      className="group relative flex-1 flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFF] to-white border border-[#D9E6FF]/80 shadow-2xs hover:shadow-soft-sm hover:border-[#155EEF]/50 transition-all duration-300 overflow-hidden cursor-pointer h-full"
    >
      {/* Subtle Radial Glow Behind Product */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(21,94,239,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* Floating Center Product with Soft Elliptical Black Shadow (Enlarged Sizes) */}
      <div className="relative z-10 py-2 sm:py-3 flex-1 flex flex-col items-center justify-center">
        {/* Floating Product Image - Significantly Larger & Crisp */}
        <div className="promo-levitate-effect flex items-center justify-center">
          <img
            src={item.image}
            alt={item.productName}
            className={`object-contain transition-transform duration-400 group-hover:scale-106 ${
              isRow2
                ? 'w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 drop-shadow-[0_12px_24px_rgba(21,94,239,0.15)]'
                : 'w-28 sm:w-32 md:w-36 h-28 sm:h-32 md:h-36 drop-shadow-[0_10px_20px_rgba(21,94,239,0.14)]'
            }`}
            loading="lazy"
          />
        </div>

        {/* Soft Elliptical Black Shadow directly underneath */}
        <div
          className="promo-shadow-effect -mt-1 sm:-mt-1.5"
          style={{
            width: isRow2 ? '118px' : '102px',
            height: isRow2 ? '9.5px' : '8.5px',
            background:
              'radial-gradient(ellipse at center, rgba(17, 24, 39, 0.45) 0%, rgba(17, 24, 39, 0.14) 48%, transparent 72%)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Bottom Content: Product Name & Sequential Animated Price Presentation */}
      <div className="relative z-10 pt-2 border-t border-slate-100/90 space-y-1">
        <h5 className="text-xs sm:text-[13px] font-bold text-[#111827] group-hover:text-[#155EEF] transition-colors font-heading truncate">
          {item.productName}
        </h5>

        {/* Animated Price Sequence: Original (struck out) -> % OFF -> Final Price below */}
        <AnimatedPriceSequence
          key={item.id}
          originalPrice={item.originalPrice}
          sellingPrice={item.sellingPrice}
        />
      </div>
    </Link>
  );
};

// ===========================================================================
// 4. ANIMATED PRICE PRESENTATION (Sequential Order)
// Sequence:
// 1. Original price appears
// 2. Strikethrough animation crosses original price
// 3. Discount percentage appears (e.g. 40% OFF)
// 4. Final discounted price appears below
// ===========================================================================
interface AnimatedPriceSequenceProps {
  originalPrice: number;
  sellingPrice: number;
  isLarge?: boolean;
}

const AnimatedPriceSequence: React.FC<AnimatedPriceSequenceProps> = ({
  originalPrice,
  sellingPrice,
  isLarge = false,
}) => {
  const { percentage } = calculateDiscount(originalPrice, sellingPrice);

  const [step, setStep] = useState(1);

  useEffect(() => {
    setStep(1);

    const timer1 = setTimeout(() => setStep(2), 300);
    const timer2 = setTimeout(() => setStep(3), 600);
    const timer3 = setTimeout(() => setStep(4), 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [originalPrice, sellingPrice]);

  return (
    <div className="flex flex-col gap-0.2">
      {/* Top Line: Step 1 (Original Price) -> Step 2 (Strikethrough) + Step 3 (Discount % Badge) */}
      <div className="flex items-center gap-1.5 flex-wrap min-h-[16px]">
        {/* Step 1 & 2: Original Price with Animated Strikethrough */}
        {originalPrice > sellingPrice && (
          <span
            className={`relative font-semibold text-slate-400 font-body inline-block transition-opacity duration-300 ${
              isLarge ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-xs'
            }`}
          >
            <span>₹{originalPrice.toLocaleString('en-IN')}</span>

            {/* Strikethrough line animates across from left to right */}
            <span
              className="absolute top-1/2 left-0 h-[1.5px] bg-slate-400 rounded-full transition-all duration-400 ease-out pointer-events-none"
              style={{ width: step >= 2 ? '100%' : '0%' }}
            />
          </span>
        )}

        {/* Step 3: Discount Percentage Badge (e.g. 40% OFF) */}
        {percentage > 0 && (
          <span
            className={`font-bold font-heading rounded tracking-wide transition-all duration-300 ease-out ${
              isLarge
                ? 'px-1.5 py-0.5 text-[10px] sm:text-xs bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs'
                : 'px-1 py-0.2 text-[9px] sm:text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/40'
            } ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          >
            {percentage}% OFF
          </span>
        )}
      </div>

      {/* Step 4: Final Discounted Selling Price Appears Below */}
      <div className="flex items-baseline">
        <span
          className={`font-black text-[#111827] font-heading tracking-tight transition-all duration-400 ease-out leading-tight ${
            isLarge ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'
          } ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
        >
          ₹{sellingPrice.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
};
