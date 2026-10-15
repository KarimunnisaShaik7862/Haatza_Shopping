import React, { useState } from 'react';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { haatzaLiteProducts } from '../../data/liteData';
import { ChefHat, Plus, Check, Sparkles } from 'lucide-react';

interface KitchenRecipeKit {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  productId: string;
}

const BASE_RECIPE_KITS: KitchenRecipeKit[] = [
  {
    id: 'kit-paneer-box',
    title: '10-Min Gourmet Paneer Box',
    price: 249,
    originalPrice: 299,
    image: '/images/kits/kit_3d_paneer.png',
    productId: 'prod-lite-mango',
  },
  {
    id: 'kit-breakfast-combo',
    title: 'Instant Morning Breakfast Combo',
    price: 189,
    originalPrice: 229,
    image: '/images/kits/kit_3d_breakfast.png',
    productId: 'prod-lite-apples',
  },
  {
    id: 'kit-dum-biryani',
    title: 'Royal Dum Biryani Kit',
    price: 329,
    originalPrice: 399,
    image: '/images/kits/kit_3d_biryani.png',
    productId: 'prod-lite-avocado',
  },
  {
    id: 'kit-munchies-bowl',
    title: 'Midnight Munchies Bowl',
    price: 159,
    originalPrice: 199,
    image: '/images/kits/kit_3d_munchies.png',
    productId: 'prod-lite-broccoli',
  },
  {
    id: 'kit-power-salad',
    title: 'Farm Fresh Green Salad Kit',
    price: 199,
    originalPrice: 249,
    image: '/images/kits/kit_3d_salad.png',
    productId: 'prod-lite-oranges',
  },
  {
    id: 'kit-fruit-dessert',
    title: 'Artisan Orchard Fruit Platter',
    price: 219,
    originalPrice: 269,
    image: '/images/products/3d_mango.png',
    productId: 'prod-lite-mango',
  },
];

// Duplicate for continuous, seamless infinite loop
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
      className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full select-none"
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
            transform: translateY(-6px) rotate(1.4deg);
          }
        }

        @keyframes buttonLightSweep {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }

        .marquee-stage-3d {
          perspective: 1200px;
          perspective-origin: center center;
        }

        .marquee-track-3d {
          display: flex;
          width: max-content;
          animation: marqueeScroll3D 38s linear infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Master Hover-Pause: instantly stops scroller in place */
        .marquee-track-3d:hover {
          animation-play-state: paused !important;
        }

        .kitchen-3d-card {
          transform: translateZ(0) translateY(0);
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease-out, border-color 0.28s ease-out;
          transform-style: preserve-3d;
          will-change: transform, box-shadow;
        }

        /* Active Card Pop-Out & Digital Spotlight */
        .kitchen-3d-card:hover {
          transform: translateZ(24px) translateY(-8px) scale(1.02) !important;
          border-color: #0C831F !important;
          box-shadow: 0 20px 42px rgba(12, 131, 31, 0.38), 0 0 30px rgba(12, 131, 31, 0.28), 0 0 12px rgba(12, 131, 31, 0.5) !important;
          z-index: 40;
        }

        /* Gentle Slow-Motion 3D Looping Rotations */
        .kitchen-float-graphic {
          animation: gentleSlowFloat 4.8s ease-in-out infinite;
          will-change: transform;
        }

        .kitchen-3d-card:nth-child(even) .kitchen-float-graphic {
          animation-delay: -2.4s;
        }

        /* Button Glossy Light-Sweep */
        .kitchen-3d-card:hover .button-sweep-effect {
          animation: buttonLightSweep 1.1s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E5EBE6] shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-1.5 border border-[#0C831F]/25 shadow-2xs">
              <ChefHat className="w-3.5 h-3.5 text-[#0C831F]" />
              <span>HAATZA 10-MINUTE INTERACTIVE KITCHEN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
              Trending Quick-Prep Recipe Kits
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Pre-portioned fresh ingredients delivered in 10-15 minutes. Cook restaurant-quality meals in minutes.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold text-[#0C831F] bg-[#F2FBF4] px-3.5 py-1.5 rounded-full border border-[#CBEAD2]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Portioned • Zero Prep</span>
          </div>
        </div>

        {/* 3D Cinematic Infinite Marquee Scroller Stage */}
        <div className="marquee-stage-3d relative w-full overflow-hidden py-3">
          {/* Subtle Left & Right Edge Vignette Scrims */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* Continuous Infinite Timeline Track */}
          <div className="marquee-track-3d flex items-center gap-5 sm:gap-6 py-2 px-2">
            {MARQUEE_RECIPE_KITS.map((kit, index) => {
              const isAdded = addedKitId === kit.id;

              return (
                <div
                  key={`${kit.id}-${index}`}
                  className="kitchen-3d-card group/card relative w-[240px] sm:w-[260px] shrink-0 rounded-[16px] bg-white border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.05)] cursor-pointer flex flex-col justify-between p-4.5"
                >
                  {/* Upper Portion: 3D Floating Product Asset with Slow-Motion Bobbing Animation */}
                  <div className="relative h-44 sm:h-48 w-full flex items-center justify-center p-2 mb-2 select-none overflow-visible">
                    {/* Soft Ambient Radial Depth Shadow */}
                    <div className="absolute bottom-1 inset-x-8 h-5 bg-black/10 blur-xl rounded-full pointer-events-none transition-transform duration-300 group-hover/card:scale-115 group-hover/card:bg-[#0C831F]/20" />

                    {/* Hyper-Realistic 3D Asset Render Floating Dynamically */}
                    <img
                      src={kit.image}
                      alt={kit.title}
                      className="kitchen-float-graphic relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)] pointer-events-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Minimalist Executive Typography & Action Button */}
                  <div className="flex flex-col justify-between flex-1 space-y-3 pt-1">
                    <div>
                      {/* Kit Name */}
                      <h3 className="text-[15px] sm:text-base font-extrabold text-[#111D15] tracking-tight leading-snug line-clamp-1 font-heading text-left">
                        {kit.title}
                      </h3>

                      {/* Single Clean Line for Pricing */}
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base sm:text-lg font-black text-[#0C831F] tracking-tight leading-none">
                          ₹{kit.price}
                        </span>
                        <span className="text-xs sm:text-[13px] font-normal text-slate-400 line-through">
                          ₹{kit.originalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Solid Brand-Green "+ Add All Ingredients" Button with Glossy Light-Sweep Reflection */}
                    <button
                      type="button"
                      onClick={(e) => handleAddKit(e, kit)}
                      className={`relative overflow-hidden w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
                        isAdded
                          ? 'bg-[#084A13] text-emerald-200'
                          : 'bg-[#0C831F] hover:bg-[#09711A] text-white hover:shadow-[0_4px_14px_rgba(12,131,31,0.4)]'
                      }`}
                    >
                      {/* Glossy Light-Sweep Reflection Element */}
                      <div className="button-sweep-effect absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3] relative z-10" />
                          <span className="relative z-10">Added to Basket!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[2.5] relative z-10" />
                          <span className="relative z-10">+ Add All Ingredients</span>
                        </>
                      )}
                    </button>
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
