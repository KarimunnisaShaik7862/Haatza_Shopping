import React, { useState } from 'react';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { haatzaLiteProducts } from '../../data/liteData';
import { ChefHat, Plus, Check, Sparkles, Clock, Star } from 'lucide-react';

interface KitchenRecipeKit {
  id: string;
  title: string;
  cookingTime: string;
  price: number;
  originalPrice: number;
  image: string;
  productId: string;
}

const BASE_RECIPE_KITS: KitchenRecipeKit[] = [
  {
    id: 'kit-paneer-box',
    title: '10-Min Gourmet Paneer Box',
    cookingTime: '10 mins',
    price: 249,
    originalPrice: 299,
    image: '/images/kits/kit_3d_paneer.png',
    productId: 'prod-lite-mango',
  },
  {
    id: 'kit-breakfast-combo',
    title: 'Instant Morning Breakfast Combo',
    cookingTime: '8 mins',
    price: 189,
    originalPrice: 229,
    image: '/images/kits/kit_3d_breakfast.png',
    productId: 'prod-lite-apples',
  },
  {
    id: 'kit-dum-biryani',
    title: 'Royal Dum Biryani Kit',
    cookingTime: '15 mins',
    price: 329,
    originalPrice: 399,
    image: '/images/kits/kit_3d_biryani.png',
    productId: 'prod-lite-avocado',
  },
  {
    id: 'kit-munchies-bowl',
    title: 'Midnight Munchies Bowl',
    cookingTime: '5 mins',
    price: 159,
    originalPrice: 199,
    image: '/images/kits/kit_3d_munchies.png',
    productId: 'prod-lite-broccoli',
  },
  {
    id: 'kit-power-salad',
    title: 'Farm Fresh Green Salad Kit',
    cookingTime: '7 mins',
    price: 199,
    originalPrice: 249,
    image: '/images/kits/kit_3d_salad.png',
    productId: 'prod-lite-oranges',
  },
  {
    id: 'kit-fruit-dessert',
    title: 'Artisan Orchard Fruit Platter',
    cookingTime: '5 mins',
    price: 219,
    originalPrice: 269,
    image: '/images/products/3d_mango.png',
    productId: 'prod-lite-mango',
  },
];

// Duplicated for seamless, continuous infinite horizontal marquee
const MARQUEE_RECIPE_KITS = [...BASE_RECIPE_KITS, ...BASE_RECIPE_KITS];

export const HaatzaLite10MinKitchen: React.FC = () => {
  const { addToCart } = useHaatzaLiteCart();
  const [addedKitId, setAddedKitId] = useState<string | null>(null);

  const handleAddKit = (e: React.MouseEvent, kit: KitchenRecipeKit) => {
    e.preventDefault();
    e.stopPropagation();
    const product = haatzaLiteProducts.find((p) => p.id === kit.productId) || haatzaLiteProducts[0];
    addToCart(product, 1);
    setAddedKitId(kit.id);
    setTimeout(() => {
      setAddedKitId(null);
    }, 2000);
  };

  return (
    <section
      aria-label="Haatza 10-Minute Interactive Kitchen"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none"
    >
      <style>{`
        @keyframes marqueeScroll3D {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes gentleSlowFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(1.5deg);
          }
        }

        .marquee-stage-3d {
          perspective: 1200px;
          perspective-origin: center center;
        }

        .marquee-track-3d {
          display: flex;
          width: max-content;
          animation: marqueeScroll3D 36s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Hover-Pause Function: Smoothly stops scroller in place upon mouse hover */
        .marquee-stage-3d:hover .marquee-track-3d,
        .marquee-track-3d:hover {
          animation-play-state: paused !important;
        }

        .kitchen-3d-card {
          transform: translateZ(0) translateY(0);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.28s ease-out,
                      border-color 0.28s ease-out;
          transform-style: preserve-3d;
          will-change: transform, box-shadow;
        }

        /* Active Card Pop-Out & Radiant Digital Spotlight */
        .kitchen-3d-card:hover {
          transform: translateZ(20px) translateY(-7px) scale(1.02) !important;
          border-color: #0C831F !important;
          box-shadow: 0 18px 40px rgba(12, 131, 31, 0.35),
                      0 0 28px rgba(12, 131, 31, 0.25),
                      0 0 10px rgba(12, 131, 31, 0.45) !important;
          z-index: 40;
        }

        .kitchen-float-graphic {
          animation: gentleSlowFloat 4.6s ease-in-out infinite;
          will-change: transform;
        }

        .kitchen-3d-card:nth-child(even) .kitchen-float-graphic {
          animation-delay: -2.3s;
        }
      `}</style>

      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E5EBE6] shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-1.5 border border-[#0C831F]/25 shadow-2xs">
              <ChefHat className="w-3.5 h-3.5 text-[#0C831F]" />
              <span>HAATZA 10-MINUTE INTERACTIVE KITCHEN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
              Trending Quick-Prep Recipe Kits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Pre-portioned fresh ingredients delivered in 10-15 minutes. Cook chef-crafted meals effortlessly.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold text-[#0C831F] bg-[#F2FBF4] px-3.5 py-1.5 rounded-full border border-[#CBEAD2]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Portioned • Zero Food Waste</span>
          </div>
        </div>

        {/* 3D Cinematic Marquee Scroller Stage */}
        <div className="marquee-stage-3d relative w-full overflow-hidden py-1">
          {/* Edge Vignette Scrims */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* Continuous Infinite Timeline Track */}
          <div className="marquee-track-3d flex items-center gap-5 sm:gap-6 py-1 px-1">
            {MARQUEE_RECIPE_KITS.map((kit, index) => {
              const isAdded = addedKitId === kit.id;

              return (
                <div
                  key={`${kit.id}-${index}`}
                  className="kitchen-3d-card group/card relative w-[240px] sm:w-[260px] shrink-0 rounded-[18px] bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] cursor-pointer flex flex-col justify-between p-4"
                >
                  {/* Top Cooking Time Tag & Rating */}
                  <div className="flex items-center justify-between mb-1 select-none">
                    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-[#0C831F] bg-[#EAF8ED] px-2 py-0.5 rounded-md border border-[#0C831F]/20">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{kit.cookingTime}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shadow-2xs">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400">Express</span>
                    </div>
                  </div>

                  {/* 3D Floating Product Asset Render */}
                  <div className="relative h-40 sm:h-44 w-full flex items-center justify-center p-2 mb-2 select-none overflow-visible">
                    {/* Soft Ambient Radial Shadow */}
                    <div className="absolute bottom-1 inset-x-8 h-4 bg-black/10 blur-xl rounded-full pointer-events-none transition-transform duration-300 group-hover/card:scale-115 group-hover/card:bg-[#0C831F]/25" />

                    {/* Hyper-Realistic 3D Asset */}
                    <img
                      src={kit.image}
                      alt={kit.title}
                      className="kitchen-float-graphic relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.12)] pointer-events-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Info */}
                  <div className="flex flex-col space-y-2.5 pt-1">
                    <h3 className="text-[14px] sm:text-[15px] font-extrabold text-[#111D15] tracking-tight leading-snug line-clamp-1 font-heading text-left">
                      {kit.title}
                    </h3>

                    {/* Price and Compact White '+ ADD' Capsule Button Row */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-[#0C831F] tracking-tight leading-none">
                          ₹{kit.price}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 line-through mt-0.5">
                          ₹{kit.originalPrice}
                        </span>
                      </div>

                      {/* Compact White 'ADD' Capsule Button */}
                      <button
                        type="button"
                        onClick={(e) => handleAddKit(e, kit)}
                        className={`group/kit px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-95 border ${
                          isAdded
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-600 shadow-[0_0_12px_rgba(12,131,31,0.25)]'
                            : 'bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border-emerald-600 hover:shadow-[0_4px_14px_rgba(16,185,129,0.32)] hover:scale-105'
                        }`}
                        aria-label={`Add ${kit.title} to basket`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.75] transition-transform duration-200 group-hover/kit:rotate-90" />
                            <span>ADD</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HaatzaLite10MinKitchen;
