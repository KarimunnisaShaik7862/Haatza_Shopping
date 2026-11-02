import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HaatzaLiteHeroSlide, 
  HaatzaLiteProduct 
} from '../../types/haatzaLite.types';
import { haatzaLiteService } from '../../services/haatzaLiteService';
import { haatzaLiteHeroSlides, haatzaLiteProducts } from '../../data/liteData';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { HaatzaLiteHeroBanner } from '../../components/HaatzaLiteBanners/HaatzaLiteHeroBanner';
import { HaatzaLiteEverydayEssentials } from '../../components/HaatzaLiteProducts/HaatzaLiteEverydayEssentials';
import { HaatzaLiteConveyor } from '../../components/HaatzaLiteConveyor/HaatzaLiteConveyor';
import { HaatzaLiteDualPromoBanners } from '../../components/HaatzaLiteBanners/HaatzaLiteDualPromoBanners';
import { HaatzaLiteProductCarousel } from '../../components/HaatzaLiteProducts/HaatzaLiteProductCarousel';
import { HaatzaLiteQualityPromise } from '../../components/common/HaatzaLiteQualityPromise';
import { HaatzaLiteLightningVault } from '../../components/HaatzaLiteDeals/HaatzaLiteLightningVault';
import { formatCurrency } from '../../utils/formatters';
import { 
  ChevronRight, ShoppingBag, ArrowRight, Leaf, Sparkles
} from 'lucide-react';

export const HaatzaLiteHomePage: React.FC = () => {
  const { itemCount, total } = useHaatzaLiteCart();

  // Pre-populate with synchronous defaults to avoid any section delay or flash
  const [heroSlides, setHeroSlides] = useState<HaatzaLiteHeroSlide[]>(() => haatzaLiteHeroSlides);
  const [freshProduce, setFreshProduce] = useState<HaatzaLiteProduct[]>(() => 
    haatzaLiteProducts.filter(p => p.categoryId === 'cat-lite-fruits-veg' || p.categoryId === 'fruits-vegetables').slice(0, 10)
  );
  const [householdCleaning, setHouseholdCleaning] = useState<HaatzaLiteProduct[]>(() => 
    haatzaLiteProducts.filter(p => p.categoryId === 'cat-lite-cleaning' || p.categoryId === 'household-cleaning').slice(0, 10)
  );

  useEffect(() => {
    async function loadData() {
      try {
        const [slides, produce, cleaning] = await Promise.all([
          haatzaLiteService.getHeroSlides(),
          haatzaLiteService.getProductsByCategory('fruits-vegetables', 10),
          haatzaLiteService.getProductsByCategory('cleaning', 10),
        ]);

        if (slides.length > 0) setHeroSlides(slides);
        if (produce.length > 0) setFreshProduce(produce);
        if (cleaning.length > 0) setHouseholdCleaning(cleaning);
      } catch (e) {
        console.error('Failed loading LITE data', e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col space-y-6 sm:space-y-10 lg:space-y-14 bg-transparent w-full overflow-x-hidden py-2 sm:py-4">

      {/* 1. MAIN SLIDING HERO BANNERS (Full-bleed green banners) */}
      <HaatzaLiteHeroBanner slides={heroSlides} />

      {/* 2. EVERYDAY ESSENTIALS (8-Product Grid: 4 cols x 2 rows on Desktop) */}
      <HaatzaLiteEverydayEssentials />

      {/* 3. HAATZA INFINITE LIVE CONVEYOR (Automated 3D Moving Product Belt) */}
      <HaatzaLiteConveyor />

      {/* 4. BALANCED 50/50 HORIZONTAL ROW: TWO BRAND PROMOTIONAL BANNERS */}
      <HaatzaLiteDualPromoBanners />

      {/* 5. LIGHTNING DROP VAULT (Compact 3D High-Urgency Flash Deal) */}
      <HaatzaLiteLightningVault />

      {/* 8. Main Product Carousels */}
      {/* Scoped Keyframes for Section Theme Animations */}
      <style>{`
        @keyframes fruitsOrbDrift1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-20px, 15px) scale(1.1); }
        }
        @keyframes fruitsOrbDrift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(25px, -15px) scale(1.08); }
        }
        @keyframes fruitsLeafFloat1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.22; }
          50% { transform: translateY(-12px) rotate(10deg); opacity: 0.35; }
        }
        @keyframes fruitsLeafFloat2 {
          0%, 100% { transform: translateY(0px) rotate(35deg); opacity: 0.18; }
          50% { transform: translateY(-16px) rotate(22deg); opacity: 0.30; }
        }
        @keyframes greenShimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          20% { opacity: 0.45; }
          50% { opacity: 0.45; }
          70%, 100% { transform: translateX(250%) skewX(-20deg); opacity: 0; }
        }

        .fruits-ambient-orb-1 { animation: fruitsOrbDrift1 11s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .fruits-ambient-orb-2 { animation: fruitsOrbDrift2 13s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .fruits-leaf-float-1 { animation: fruitsLeafFloat1 7s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .fruits-leaf-float-2 { animation: fruitsLeafFloat2 9s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .green-shimmer-sweep { animation: greenShimmerSweep 9s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }

        @keyframes cleanOrbDrift1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-18px, 16px) scale(1.12); }
        }
        @keyframes cleanOrbDrift2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(22px, -14px) scale(1.08); }
        }
        @keyframes cleanBubbleFloat1 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.08); opacity: 0.65; }
        }
        @keyframes cleanBubbleFloat2 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.25; }
          50% { transform: translateY(-26px) scale(0.94); opacity: 0.6; }
        }
        @keyframes cleanBubbleFloat3 {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-15px) scale(1.15); opacity: 0.55; }
        }
        @keyframes cleanSparkleTwinkle1 {
          0%, 100% { transform: scale(0.85) rotate(0deg); opacity: 0.25; }
          50% { transform: scale(1.25) rotate(90deg); opacity: 0.75; }
        }
        @keyframes cleanSparkleTwinkle2 {
          0%, 100% { transform: scale(0.8) rotate(45deg); opacity: 0.2; }
          50% { transform: scale(1.2) rotate(135deg); opacity: 0.7; }
        }

        .clean-ambient-orb-1 { animation: cleanOrbDrift1 12s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .clean-ambient-orb-2 { animation: cleanOrbDrift2 14s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .clean-bubble-1 { animation: cleanBubbleFloat1 6s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .clean-bubble-2 { animation: cleanBubbleFloat2 8s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .clean-bubble-3 { animation: cleanBubbleFloat3 5s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .clean-sparkle-1 { animation: cleanSparkleTwinkle1 4s ease-in-out infinite; transform: translate3d(0,0,0); will-change: transform; }
        .clean-sparkle-2 { animation: cleanSparkleTwinkle2 5.5s ease-in-out infinite 1.5s; transform: translate3d(0,0,0); will-change: transform; }

        .lite-lazy-section {
          content-visibility: auto;
          contain-intrinsic-size: 1px 480px;
        }
      `}</style>

      {/* Fresh Fruits & Daily Greens Carousel */}
      <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div 
          className="relative overflow-hidden rounded-2xl sm:rounded-[28px] p-2.5 sm:p-5 border border-[#0C831F]/20 shadow-[0_12px_45px_-8px_rgba(12,131,31,0.08),0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 group/fruits"
          style={{
            background: 'radial-gradient(ellipse at 12% 12%, rgba(12, 131, 31, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 88% 88%, rgba(12, 131, 31, 0.05) 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #FAFCFB 45%, #F4F9F6 100%)',
          }}
        >
          {/* Animated Ambient Nature Background Effects (Green & White only) */}
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-gradient-to-br from-[#0C831F]/15 to-emerald-200/20 rounded-full blur-3xl pointer-events-none fruits-ambient-orb-1" />
          <div className="absolute -bottom-20 -left-16 w-80 h-80 bg-gradient-to-tr from-emerald-100/30 to-[#0C831F]/10 rounded-full blur-3xl pointer-events-none fruits-ambient-orb-2" />
          
          {/* Floating Botanical Leaves */}
          <div className="absolute top-4 right-32 sm:right-48 pointer-events-none fruits-leaf-float-1 text-[#0C831F]">
            <Leaf className="w-7 h-7" />
          </div>
          <div className="absolute bottom-6 right-1/4 pointer-events-none fruits-leaf-float-2 text-[#0C831F]">
            <Leaf className="w-5 h-5" />
          </div>
          <div className="absolute top-1/2 left-4 pointer-events-none fruits-leaf-float-1 text-[#0C831F] opacity-20">
            <Leaf className="w-4 h-4 -rotate-45" />
          </div>

          {/* Luminous Shimmer Light Sweep */}
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none green-shimmer-sweep" />

          {/* Content Layer */}
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 rounded-full bg-[#0C831F]/10 border border-[#0C831F]/20 text-[#0C831F] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0C831F] animate-pulse"></span>
                  <Leaf className="w-3 h-3 text-[#0C831F]" />
                  <span>Farm Direct • 100% Fresh & Crispy</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-[#111D15] tracking-tight">
                  Fresh Fruits & Daily Greens
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 line-clamp-1 sm:line-clamp-none">
                  Naturally ripened, inspected for crisp sweetness & zero chemicals
                </p>
              </div>
              <Link
                to="/lite/fruits-vegetables"
                className="self-start sm:self-auto inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0C831F] hover:text-[#09711A] bg-white/80 hover:bg-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#0C831F]/20 shadow-2xs hover:shadow-sm transition-all duration-200 group/btn"
              >
                <span>see all</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>

            <HaatzaLiteProductCarousel products={freshProduce} variant="fruits" />
          </div>
        </div>
      </div>

      {/* Household Cleaning & Hygiene Carousel */}
      <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div 
          className="relative overflow-hidden rounded-2xl sm:rounded-[28px] p-2.5 sm:p-5 border border-[#0C831F]/20 shadow-[0_12px_45px_-8px_rgba(12,131,31,0.08),0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 group/clean"
          style={{
            background: 'radial-gradient(ellipse at 88% 12%, rgba(12, 131, 31, 0.07) 0%, transparent 60%), radial-gradient(ellipse at 12% 88%, rgba(12, 131, 31, 0.04) 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #FCFDFC 45%, #F4F9F6 100%)',
          }}
        >
          {/* Animated Ambient Hygiene Effects (Green & White only, zero blue) */}
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-gradient-to-br from-[#0C831F]/12 to-emerald-100/25 rounded-full blur-3xl pointer-events-none clean-ambient-orb-1" />
          <div className="absolute -bottom-20 -left-16 w-80 h-80 bg-gradient-to-tr from-white/80 to-[#0C831F]/10 rounded-full blur-3xl pointer-events-none clean-ambient-orb-2" />

          {/* Floating Translucent Bubbles (White with Green Rim) */}
          <div className="absolute top-6 right-36 sm:right-56 w-8 h-8 rounded-full border border-[#0C831F]/30 bg-white/60 backdrop-blur-xs pointer-events-none clean-bubble-1 shadow-xs flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/90 -mt-1.5 -ml-1.5" />
          </div>
          <div className="absolute bottom-8 right-1/4 w-6 h-6 rounded-full border border-[#0C831F]/25 bg-white/50 backdrop-blur-xs pointer-events-none clean-bubble-2 shadow-xs flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/90 -mt-1 -ml-1" />
          </div>
          <div className="absolute top-1/2 left-5 w-4 h-4 rounded-full border border-[#0C831F]/20 bg-white/70 pointer-events-none clean-bubble-3" />

          {/* Twinkling Sparkles (Green & White) */}
          <div className="absolute top-5 right-20 pointer-events-none clean-sparkle-1 text-[#0C831F]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute bottom-6 right-1/3 pointer-events-none clean-sparkle-2 text-[#0C831F]">
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Luminous Shimmer Light Sweep */}
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none green-shimmer-sweep" />

          {/* Content Layer */}
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 rounded-full bg-[#0C831F]/10 border border-[#0C831F]/20 text-[#0C831F] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1 backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0C831F] animate-pulse"></span>
                  <Sparkles className="w-3 h-3 text-[#0C831F]" />
                  <span>Hospital-Grade Shield • Sparkling Clean</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-[#111D15] tracking-tight">
                  Household Cleaning & Hygiene
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 line-clamp-1 sm:line-clamp-none">
                  Detergents, floor cleansers, dishwashing liquids & soaps
                </p>
              </div>
              <Link
                to="/lite/categories/household-cleaning"
                className="self-start sm:self-auto inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0C831F] hover:text-[#09711A] bg-white/80 hover:bg-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#0C831F]/20 shadow-2xs hover:shadow-sm transition-all duration-200 group/btn"
              >
                <span>see all</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </div>

            <HaatzaLiteProductCarousel products={householdCleaning} variant="cleaning" />
          </div>
        </div>
      </div>

      {/* Haatza Quality Promise Glassmorphic Banner */}
      <HaatzaLiteQualityPromise />

      {/* Floating Bottom Cart Bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-3 sm:bottom-5 left-3 right-3 sm:left-4 sm:right-4 z-50 max-w-lg mx-auto pointer-events-auto">
          <Link
            to="/cart"
            className="flex items-center justify-between p-3 sm:p-4 bg-[#083510] hover:bg-[#06290C] text-white rounded-xl sm:rounded-2xl shadow-[0_10px_35px_rgba(12,131,31,0.4)] transition-all duration-200 group border border-[#0C831F]/50 backdrop-blur-md active:scale-98"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0C831F] flex items-center justify-center text-white shadow-xs">
                <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold leading-tight text-emerald-200">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your basket
                </p>
                <p className="text-sm sm:text-base font-black leading-tight text-white mt-0.5">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black bg-[#0C831F] hover:bg-[#09711A] text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl group-hover:scale-105 transition-all shadow-md">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
