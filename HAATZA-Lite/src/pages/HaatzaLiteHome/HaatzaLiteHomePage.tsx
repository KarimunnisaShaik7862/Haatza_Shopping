import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HaatzaLiteCategory, 
  HaatzaLiteHeroSlide, 
  HaatzaLiteProduct, 
  HaatzaLitePromoBanner as PromoBannerType 
} from '../../types/haatzaLite.types';
import { haatzaLiteService } from '../../services/haatzaLiteService';
import { useHaatzaLiteLocation } from '../../hooks/useHaatzaLiteLocation';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { HaatzaLiteHeroBanner } from '../../components/HaatzaLiteBanners/HaatzaLiteHeroBanner';
import { HaatzaLitePromoBanner } from '../../components/HaatzaLiteBanners/HaatzaLitePromoBanner';
import { HaatzaLiteProductCard } from '../../components/HaatzaLiteProducts/HaatzaLiteProductCard';
import { HaatzaLiteLoading } from '../../components/common/HaatzaLiteLoading';
import { formatCurrency } from '../../utils/formatters';
import { 
  Zap, Clock, ShieldCheck, MapPin, 
  ChevronRight, ShoppingBag, ArrowRight 
} from 'lucide-react';

export const HaatzaLiteHomePage: React.FC = () => {
  const { location, openLocationModal } = useHaatzaLiteLocation();
  const { itemCount, total } = useHaatzaLiteCart();

  const [heroSlides, setHeroSlides] = useState<HaatzaLiteHeroSlide[]>([]);
  const [categories, setCategories] = useState<HaatzaLiteCategory[]>([]);
  const [dealProducts, setDealProducts] = useState<HaatzaLiteProduct[]>([]);
  const [freshProduce, setFreshProduce] = useState<HaatzaLiteProduct[]>([]);
  const [householdCleaning, setHouseholdCleaning] = useState<HaatzaLiteProduct[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBannerType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [slides, cats, deals, produce, cleaning, banners] = await Promise.all([
          haatzaLiteService.getHeroSlides(),
          haatzaLiteService.getCategories(),
          haatzaLiteService.getDeals(6),
          haatzaLiteService.getProductsByCategory('fruits-vegetables', 6),
          haatzaLiteService.getProductsByCategory('cleaning', 6),
          haatzaLiteService.getPromoBanners(),
        ]);

        setHeroSlides(slides);
        setCategories(cats);
        setDealProducts(deals);
        setFreshProduce(produce);
        setHouseholdCleaning(cleaning);
        setPromoBanners(banners);
      } catch (e) {
        console.error('Failed loading LITE data', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <HaatzaLiteLoading type="grid" count={6} />
      </div>
    );
  }

  return (
    <div className="pb-24 sm:pb-16 space-y-6 bg-zinc-50/40 min-h-screen">
      
      {/* 10-15 Min Express Delivery Announcement Bar */}
      <div className="bg-[#238636] text-white py-2.5 px-4 shadow-sm border-b border-emerald-700">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 font-black uppercase tracking-wider bg-emerald-900/60 px-2.5 py-1 rounded-lg text-emerald-200">
              <Zap className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
              LITE ⚡ 10-15 MINS
            </span>
            <span className="font-semibold text-emerald-100 hidden md:inline">
              Superfast groceries & daily essentials from your nearest dark store.
            </span>
          </div>

          <button
            type="button"
            onClick={openLocationModal}
            className="flex items-center gap-1.5 font-bold hover:text-emerald-200 transition-colors bg-white/10 px-3 py-1 rounded-full text-xs cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-yellow-300" />
            <span>Delivering to <strong className="underline">{location.pincode}</strong> ({location.city})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Slides */}
      <HaatzaLiteHeroBanner slides={heroSlides} />

      {/* Quick Category Circles / Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#202124] tracking-tight font-heading">
                Daily Grocery Aisles
              </h2>
              <p className="text-xs text-zinc-500 font-medium">Explore everyday essentials stocked fresh daily</p>
            </div>
            <Link
              to="/categories"
              className="text-xs font-bold text-[#238636] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group flex flex-col items-center text-center p-2 rounded-2xl hover:bg-[#EAF6EC] transition-all duration-200"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-50 group-hover:bg-white overflow-hidden p-1.5 mb-2 border border-zinc-100 shadow-2xs group-hover:shadow-xs group-hover:scale-105 transition-all">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <span className="text-xs font-bold text-zinc-800 group-hover:text-[#238636] line-clamp-1 leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium mt-0.5">
                  {cat.itemCount}+ items
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Flash Deals / Super Savers in 10-15 Mins */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                %
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#202124] tracking-tight font-heading">
                  Flash Deals in 10-15 Mins
                </h3>
                <p className="text-xs text-zinc-500 font-medium">Daily pocket-friendly discounts on top groceries</p>
              </div>
            </div>
            <Link
              to="/categories/all"
              className="text-xs font-bold text-[#238636] hover:underline flex items-center gap-1"
            >
              <span>See All Deals</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {dealProducts.map((p) => (
              <HaatzaLiteProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      {promoBanners.length > 0 && (
        <HaatzaLitePromoBanner banners={promoBanners} />
      )}

      {/* Fresh Fruits & Vegetables Aisle */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF6EC] text-[#238636] text-[11px] font-bold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#238636]" />
                100% FARM FRESH
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#202124] tracking-tight font-heading">
                Fresh Fruits & Daily Greens
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Naturally ripened, inspected for crisp sweetness</p>
            </div>
            <Link
              to="/categories/fruits-vegetables"
              className="text-xs font-bold text-[#238636] hover:underline flex items-center gap-1"
            >
              <span>Explore Fruits</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {freshProduce.map((p) => (
              <HaatzaLiteProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Household Cleaning & Personal Care Aisle */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#202124] tracking-tight font-heading">
                Household Cleaning & Hygiene
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Detergents, floor cleansers, dishwashing gels & soaps</p>
            </div>
            <Link
              to="/categories/household-cleaning"
              className="text-xs font-bold text-[#238636] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {householdCleaning.map((p) => (
              <HaatzaLiteProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* LITE Quality Guarantees */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#EAF6EC]/60 border border-emerald-200/80 rounded-3xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#238636] flex items-center justify-center shadow-xs shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#202124]">10-15 Min Delivery</h4>
              <p className="text-xs text-zinc-600">Dispatched from neighborhood micro dark stores</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#238636] flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#202124]">Zero-Question Returns</h4>
              <p className="text-xs text-zinc-600">Instant replacement or refund if quality isn't crisp</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#238636] flex items-center justify-center shadow-xs shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#202124]">Direct From Orchards</h4>
              <p className="text-xs text-zinc-600">Alphonso mangoes, mountain apples & dairy produce</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Cart Bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto">
          <Link
            to="/cart"
            className="flex items-center justify-between p-3.5 bg-[#238636] hover:bg-emerald-700 text-white rounded-2xl shadow-xl transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
                </p>
                <p className="text-sm font-black leading-tight">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold bg-white text-[#238636] px-3.5 py-2 rounded-xl group-hover:scale-105 transition-transform shadow-xs">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      )}

    </div>
  );
};
