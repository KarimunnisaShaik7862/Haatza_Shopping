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
import { HaatzaLiteCinematicShowcase } from '../../components/HaatzaLiteShowcase/HaatzaLiteCinematicShowcase';
import { HaatzaLiteConveyor } from '../../components/HaatzaLiteConveyor/HaatzaLiteConveyor';
import { HaatzaLiteProductCarousel } from '../../components/HaatzaLiteProducts/HaatzaLiteProductCarousel';
import { HaatzaLiteQualityPromise } from '../../components/common/HaatzaLiteQualityPromise';
import { HaatzaLiteLightningVault } from '../../components/HaatzaLiteDeals/HaatzaLiteLightningVault';
import { formatCurrency } from '../../utils/formatters';
import { 
  ChevronRight, ShoppingBag, ArrowRight
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
    <div className="flex flex-col space-y-8 sm:space-y-10 bg-transparent">
      {/* 4. MAIN SLIDING HERO BANNERS (Full-bleed green banners) */}
      <HaatzaLiteHeroBanner slides={heroSlides} />

      {/* 5. EXPLORE LIVE NEIGHBORHOOD AISLES (5-Card Row with Distinct Images) */}
      <HaatzaLiteCinematicShowcase />

      {/* 6. HAATZA INFINITE LIVE CONVEYOR (Automatic 3D Moving Product Belt) */}
      <HaatzaLiteConveyor />

      {/* 7. LIGHTNING DROP VAULT (Compact 3D High-Urgency Flash Deal) */}
      <HaatzaLiteLightningVault />

      {/* 8. Main Product Carousels */}
      {/* Fresh Fruits & Daily Greens Carousel */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full">
        <div 
          className="rounded-[24px] p-5 sm:p-7 border border-[#0C831F]/15 shadow-[0_8px_30px_-6px_rgba(12,131,31,0.07),0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300"
          style={{
            background: 'linear-gradient(90deg, #FFFFFF 0%, #FAFCFB 40%, #F2FAF5 100%)',
          }}
        >
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight">
                Fresh Fruits & Daily Greens
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Naturally ripened, inspected for crisp sweetness & zero chemicals</p>
            </div>
            <Link
              to="/lite/categories/fruits-vegetables"
              className="text-xs sm:text-sm font-bold text-[#0C831F] hover:text-[#09711A] flex items-center gap-1 transition-colors"
            >
              <span>see all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <HaatzaLiteProductCarousel products={freshProduce} />
        </div>
      </div>

      {/* Household Cleaning & Hygiene Carousel */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full">
        <div 
          className="rounded-[24px] p-5 sm:p-7 border border-[#0C831F]/15 shadow-[0_8px_30px_-6px_rgba(12,131,31,0.06),0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300"
          style={{
            background: 'linear-gradient(90deg, #FFFFFF 0%, #F9FBFC 40%, #F3F8FA 100%)',
          }}
        >
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight">
                Household Cleaning & Hygiene
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Detergents, floor cleansers, dishwashing liquids & soaps</p>
            </div>
            <Link
              to="/lite/categories/household-cleaning"
              className="text-xs sm:text-sm font-bold text-[#0C831F] hover:text-[#09711A] flex items-center gap-1 transition-colors"
            >
              <span>see all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <HaatzaLiteProductCarousel products={householdCleaning} />
        </div>
      </div>

      {/* Haatza Quality Promise Glassmorphic Banner */}
      <HaatzaLiteQualityPromise />

      {/* Floating Bottom Cart Bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-5 left-4 right-4 z-50 max-w-lg mx-auto pointer-events-auto">
          <Link
            to="/cart"
            className="flex items-center justify-between p-3.5 sm:p-4 bg-[#083510] hover:bg-[#06290C] text-white rounded-2xl shadow-[0_10px_35px_rgba(12,131,31,0.4)] transition-all duration-200 group border border-[#0C831F]/50 backdrop-blur-md active:scale-98"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0C831F] flex items-center justify-center text-white shadow-xs">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight text-emerald-200">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your basket
                </p>
                <p className="text-base font-black leading-tight text-white mt-0.5">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black bg-[#0C831F] hover:bg-[#09711A] text-white px-4 py-2.5 rounded-xl group-hover:scale-105 transition-all shadow-md">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
