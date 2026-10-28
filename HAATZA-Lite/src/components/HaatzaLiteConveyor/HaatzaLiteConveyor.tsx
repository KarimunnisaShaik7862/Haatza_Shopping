import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface ConveyorProduct {
  id: string;
  name: string;
  categoryLabel: string;
  slug: string;
  image: string;
  badge: string;
  price: string;
}

const CONVEYOR_PRODUCTS: ConveyorProduct[] = [
  {
    id: 'conv-mango',
    name: 'Alphonso Mango',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_mango.png',
    badge: 'ORCHARD FRESH',
    price: '₹749',
  },
  {
    id: 'conv-milk',
    name: 'Dairy Milk Splash',
    categoryLabel: 'Dairy & Farmhouse Aisle ➔',
    slug: 'dairy-breakfast',
    image: '/images/kits/kit_3d_breakfast.png',
    badge: 'COLD DISPATCH',
    price: '₹42',
  },
  {
    id: 'conv-chips',
    name: 'Midnight Munchies',
    categoryLabel: 'Midnight Munchies Lounge ➔',
    slug: 'snacks-beverages',
    image: '/images/kits/kit_3d_munchies.png',
    badge: 'INSTANT CRUNCH',
    price: '₹50',
  },
  {
    id: 'conv-apple',
    name: 'Royal Gala Apple',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_apple.png',
    badge: 'NATURAL CRISP',
    price: '₹180',
  },
  {
    id: 'conv-spray',
    name: 'Citrus Surface Cleaner',
    categoryLabel: 'Sparkling Hygiene Aisle ➔',
    slug: 'household-cleaning',
    image: '/images/products/3d_spray.png',
    badge: '99.9% GERM KILL',
    price: '₹149',
  },
  {
    id: 'conv-avocado',
    name: 'Hass Avocado',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_avocado.png',
    badge: 'FARM FRESH',
    price: '₹220',
  },
  {
    id: 'conv-paneer',
    name: 'Artisan Malai Paneer',
    categoryLabel: 'Dairy & Farmhouse Aisle ➔',
    slug: 'dairy-breakfast',
    image: '/images/kits/kit_3d_paneer.png',
    badge: 'FRESH BATCH',
    price: '₹125',
  },
  {
    id: 'conv-orange',
    name: 'Nagpur Oranges',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_orange.png',
    badge: 'CITRUS BURST',
    price: '₹95',
  },
  {
    id: 'conv-dishwash',
    name: 'Lemon Dishwash Gel',
    categoryLabel: 'Sparkling Hygiene Aisle ➔',
    slug: 'household-cleaning',
    image: '/images/products/3d_dishwash.png',
    badge: 'DARK STORE READY',
    price: '₹85',
  },
  {
    id: 'conv-broccoli',
    name: 'Crisp Broccoli',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_broccoli.png',
    badge: 'HYDROPONIC',
    price: '₹65',
  },
  {
    id: 'conv-personal',
    name: 'Botanical Care Essentials',
    categoryLabel: 'Wellness & Care Lounge ➔',
    slug: 'personal-care',
    image: '/images/categories/3d_personal.jpg',
    badge: 'PURE BOTANIC',
    price: '₹280',
  },
  {
    id: 'conv-cookware',
    name: 'Chef Non-Stick Pan',
    categoryLabel: 'Kitchen Utilities Aisle ➔',
    slug: 'kitchen-essentials',
    image: '/images/categories/3d_kitchen.jpg',
    badge: 'PRO CHEF',
    price: '₹599',
  },
];

export const HaatzaLiteConveyor: React.FC = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Duplicated array to create a seamless infinite loop
  const infiniteProducts = [...CONVEYOR_PRODUCTS, ...CONVEYOR_PRODUCTS];

  return (
    <section
      aria-label="Haatza Infinite Live Conveyor"
      className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full select-none py-12 sm:py-16"
    >
      <style>{`
        @keyframes conveyorScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .conveyor-belt-track {
          display: flex;
          width: max-content;
          animation: conveyorScroll 42s linear infinite;
          will-change: transform;
        }

        /* Pause infinite loop on hover so user can easily interact */
        .conveyor-belt-container:hover .conveyor-belt-track {
          animation-play-state: paused;
        }

        .conveyor-item-card {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.22s ease-out,
                      border-color 0.22s ease-out,
                      background-color 0.22s ease-out;
          will-change: transform, box-shadow;
        }

        .conveyor-product-image {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.28s ease-out;
          will-change: transform;
        }
      `}</style>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-1.5 border border-[#0C831F]/25 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0C831F]" />
            <span>HAATZA INFINITE LIVE CONVEYOR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
            Live Automated Dispatch Belt
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Real-time automated dark-store conveyor moving fresh 10-15 minute grocery essentials
          </p>
        </div>
      </div>

      {/* The Digital Conveyor Belt Container (Expanded 30% height, locked horizontal overflow boundaries) */}
      <div className="conveyor-belt-container relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#0C831F]/14 shadow-[0_6px_28px_-4px_rgba(12,131,31,0.07),0_2px_8px_rgba(0,0,0,0.02)] py-14 sm:py-16 min-h-[320px] sm:min-h-[350px] flex items-center">
        
        {/* Top Ultra-Thin Neon Green Guide Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0C831F] to-transparent shadow-[0_0_12px_#0C831F] z-20 pointer-events-none" />

        {/* Conveyor Belt Roller Texture / Track Grid Accent */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0C831F_1px,transparent_1px)] [background-size:18px_18px]" />

        {/* Edge Blur Scrims for Seamless Entry & Exit */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none rounded-l-2xl sm:rounded-l-3xl" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none rounded-r-2xl sm:rounded-r-3xl" />

        {/* Infinite Moving Loop Track (Strictly contained inside container boundaries) */}
        <div className="conveyor-belt-track items-center gap-5 sm:gap-7 px-6 py-4">
          {infiniteProducts.map((item, index) => {
            const uniqueKey = `${item.id}-${index}`;
            const isHovered = hoveredKey === uniqueKey;

            return (
              <div
                key={uniqueKey}
                onMouseEnter={() => setHoveredKey(uniqueKey)}
                onMouseLeave={() => setHoveredKey(null)}
                className="relative shrink-0 flex flex-col items-center cursor-pointer group"
              >
                {/* Floating Frosted-Glass Text Bubble Tracking Above Hovered Item */}
                <div
                  className={`absolute -top-11 z-40 pointer-events-none transition-all duration-200 transform ${
                    isHovered
                      ? 'opacity-100 -translate-y-1.5 scale-100'
                      : 'opacity-0 translate-y-2 scale-95'
                  }`}
                >
                  <div className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#0C831F]/40 shadow-[0_6px_22px_rgba(12,131,31,0.28)] flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C831F] animate-ping" />
                    <span className="text-[11px] font-black text-[#0C831F] tracking-tight font-heading">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Compact Conveyor Bed Platform (Scaled down 10% to glide weightlessly between neon lines) */}
                <Link
                  to={`/lite/categories/${item.slug}`}
                  className={`conveyor-item-card relative flex flex-col items-center justify-between p-3 sm:p-3.5 rounded-2xl w-[130px] sm:w-[155px] h-[172px] sm:h-[195px] overflow-visible ${
                    isHovered
                      ? 'bg-[#EAF8ED] border-2 border-[#0C831F] shadow-[0_0_40px_rgba(12,131,31,0.42),0_8px_24px_rgba(12,131,31,0.20)] -translate-y-2.5 scale-[1.03] z-30'
                      : 'bg-white border border-[#0C831F]/12 shadow-[0_2px_12px_rgba(12,131,31,0.04)] z-10'
                  }`}
                >
                  {/* Organic Radial Neon-Green Aura Spotlight beneath item */}
                  <div
                    className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200 ${
                      isHovered
                        ? 'opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(12,131,31,0.28)_0%,transparent_75%)]'
                        : 'opacity-0'
                    }`}
                  />

                  {/* Micro Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span
                      className={`text-[8.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors duration-150 ${
                        isHovered
                          ? 'bg-[#0C831F] text-white shadow-xs'
                          : 'bg-[#F2FBF4] text-[#0C831F] border border-[#CBEAD2]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* High-Definition 3D Animated Product Graphic (Compact size, +20% scale on hover) */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center my-auto relative z-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`conveyor-product-image w-full h-full object-contain pointer-events-none drop-shadow-sm ${
                        isHovered
                          ? 'scale-120 rotate-[8deg] drop-shadow-[0_12px_20px_rgba(12,131,31,0.35)]'
                          : 'scale-100 rotate-0'
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom Label: Name & Price */}
                  <div className="w-full text-center mt-auto z-10">
                    <p
                      className={`text-[11px] font-black truncate transition-colors duration-150 ${
                        isHovered ? 'text-[#0C831F]' : 'text-[#111D15]'
                      }`}
                    >
                      {item.name}
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-0.5">
                      <span className="text-[10px] font-black text-[#0C831F]">
                        {item.price}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">
                        • 10-15m
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Conveyor Belt Roller Indicator below each platform */}
                <div className="w-12 h-1.5 rounded-full bg-[#E5EBE6] mt-2 flex items-center justify-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#CBEAD2]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0C831F]/70" />
                  <span className="w-1 h-1 rounded-full bg-[#CBEAD2]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Ultra-Thin Neon Green Guide Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0C831F] to-transparent shadow-[0_0_12px_#0C831F] z-20 pointer-events-none" />
      </div>
    </section>
  );
};
