import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import heroBannerNestFamily from '../../assets/haatza_nest_hero_banner_nest_family.png';
import { HaatzaNestCouponDrawer } from './HaatzaNestCouponDrawer';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';

interface HeroSlideData {
  id: string;
  image: string;
  alt: string;
  badge?: string;
  heading?: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  trustPoints?: string[];
  isImageOnly?: boolean;
}

export const HaatzaNestHeroCarousel: React.FC = () => {
  const { nestpass, nestpassData, coupons } = useHaatzaNestDashboard();
  const activePass = nestpass && nestpassData.length > 0 ? nestpassData[0] : null;
  const passBannerImg = activePass?.dashboardBanner || (coupons.length > 0 ? coupons[0].image : heroBannerNestFamily);
  const passAltText = activePass 
    ? `HAATZA Nest Pass ${activePass.packId} - ${activePass.visits} visits at ₹${activePass.price} (${activePass.validityDays} days)`
    : 'HAATZA Nest Family Pass - Get 15 + 2 visits at ₹1099';

  // Retain the remaining promotional hero banner (Family Pass / Coupons)
  const realSlides: HeroSlideData[] = [
    {
      id: 'banner-nest-family',
      image: passBannerImg,
      alt: passAltText,
      isImageOnly: true,
    },
  ];

  // Extended slides array with prepended and appended clones for seamless infinite looping when multiple slides exist
  const extendedSlides = realSlides.length > 1
    ? [
        realSlides[realSlides.length - 1],
        ...realSlides,
        realSlides[0],
      ]
    : realSlides;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);

  const totalRealSlides = realSlides.length;
  const activeDotIndex = (currentIndex - 1 + totalRealSlides) % totalRealSlides;

  const handleNext = useCallback(() => {
    if (totalRealSlides <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [totalRealSlides]);

  const handlePrev = useCallback(() => {
    if (totalRealSlides <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [totalRealSlides]);

  const handleDotClick = (dotIdx: number) => {
    if (totalRealSlides <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex(dotIdx + 1);
  };

  const handleTransitionEnd = () => {
    if (totalRealSlides <= 1) return;
    if (currentIndex >= extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(realSlides.length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (totalRealSlides <= 1) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, handleNext, totalRealSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (totalRealSlides <= 1) return;
    setTouchStartX(e.touches[0].clientX);
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (totalRealSlides <= 1) return;
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;

      if (deltaX > 40) {
        handleNext();
      } else if (deltaX < -40) {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setIsHovered(false);
  };

  // Single Banner Display
  if (totalRealSlides <= 1) {
    const singleSlide = realSlides[0];
    return (
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4">
        <div 
          className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-[#ECE5FD] via-[#F6F0FE] to-[#F4EDFD] border border-[#EBE4DC] shadow-[0_12px_36px_-12px_rgba(76,29,149,0.08)] min-h-[300px] sm:min-h-[340px] md:min-h-[360px] flex items-center justify-center group select-none cursor-pointer"
          onClick={() => setIsCouponDrawerOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsCouponDrawerOpen(true);
            }
          }}
          aria-label="Open Nest Pass coupon details"
        >
          <img
            src={singleSlide.image}
            alt={singleSlide.alt}
            className="w-full h-full object-contain object-center select-none transition-transform duration-300 group-hover:scale-[1.01]"
            loading="eager"
          />
        </div>

        {/* Coupon Slide-in Popup Drawer */}
        <HaatzaNestCouponDrawer
          isOpen={isCouponDrawerOpen}
          onClose={() => setIsCouponDrawerOpen(false)}
          passData={activePass}
          couponImage={coupons.length > 0 ? coupons[0].image : null}
        />
      </section>
    );
  }

  // Multi-Banner Carousel Display
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4">
      <div 
        className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#EBE4DC] shadow-[0_12px_36px_-12px_rgba(76,29,149,0.08)] min-h-[330px] sm:min-h-[350px] md:min-h-[370px] flex items-center group select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
        aria-label="HAATZA Nest Home Services Highlights"
      >
        {/* Horizontal Slide Track */}
        <div 
          className="flex w-full h-full min-h-[330px] sm:min-h-[350px] md:min-h-[370px]"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning 
              ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)' 
              : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, idx) => {
            if (slide.isImageOnly) {
              return (
                <div 
                  key={`${slide.id}-${idx}`}
                  className="w-full shrink-0 relative min-h-[330px] sm:min-h-[350px] md:min-h-[370px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#ECE5FD] via-[#F6F0FE] to-[#F4EDFD] cursor-pointer group/coupon transition-colors duration-200"
                  aria-hidden={idx !== currentIndex}
                  onClick={() => setIsCouponDrawerOpen(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setIsCouponDrawerOpen(true);
                    }
                  }}
                  aria-label="Open Nest Pass coupon details"
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-contain object-center select-none transition-transform duration-300 group-hover/coupon:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              );
            }

            return (
              <div 
                key={`${slide.id}-${idx}`}
                className="w-full shrink-0 relative min-h-[330px] sm:min-h-[350px] md:min-h-[370px] flex items-center overflow-hidden"
                aria-hidden={idx !== currentIndex}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="absolute inset-0 w-full h-full object-cover object-right select-none pointer-events-none"
                  loading={idx === 1 ? 'eager' : 'lazy'}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/98 via-[#FAF8F5]/90 to-transparent sm:w-[68%] md:w-[60%] lg:w-[54%] pointer-events-none" />

                <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:px-16 py-5 sm:py-6 md:py-6.5 max-w-xl md:max-w-lg lg:max-w-xl flex flex-col items-start text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#7027C9] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 fill-[#7027C9]" />
                    <span className="font-heading font-extrabold text-[10.5px] sm:text-xs uppercase tracking-[0.12em] text-[#7027C9]">
                      {slide.badge}
                    </span>
                  </div>

                  <h1 className="nest-hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-[38px] tracking-tight leading-[1.15] mb-2.5">
                    {slide.heading}
                  </h1>

                  <p className="font-sans font-normal text-xs sm:text-[13.5px] md:text-[14.5px] text-[#2D2638] leading-[1.55] tracking-[0.012em] mb-4 max-w-md">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <a
                      href={slide.ctaHref}
                      className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#FFD83D] hover:bg-[#F0C419] text-[#25212D] font-extrabold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                      <span className="font-heading font-extrabold tracking-[0.02em]">
                        {slide.ctaText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#25212D]" />
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2.5 border-t border-purple-900/10 text-xs sm:text-[13px] text-[#2D2638] font-medium w-full">
                    {slide.trustPoints?.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#7027C9] shrink-0" />
                        <span className="font-medium tracking-[0.01em]">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Previous Navigation Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 hover:text-[#7027C9] flex items-center justify-center shadow-md border border-purple-100 backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-95 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Navigation Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-zinc-800 hover:text-[#7027C9] flex items-center justify-center shadow-md border border-purple-100 backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-95 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div 
          className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100/80 shadow-2xs"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {realSlides.map((_, dotIdx) => {
            const isActive = dotIdx === activeDotIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${dotIdx + 1}`}
                onClick={() => handleDotClick(dotIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2 bg-[#7027C9] shadow-xs'
                    : 'w-2 h-2 bg-purple-200 hover:bg-[#7027C9]/40'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Coupon Slide-in Popup Drawer */}
      <HaatzaNestCouponDrawer
        isOpen={isCouponDrawerOpen}
        onClose={() => setIsCouponDrawerOpen(false)}
        passData={activePass}
        couponImage={coupons.length > 0 ? coupons[0].image : null}
      />
    </section>
  );
};

export default HaatzaNestHeroCarousel;
