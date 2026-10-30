import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, ArrowRight, Star } from 'lucide-react';

interface ConveyorProduct {
  id: string;
  productId?: string;
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
    productId: 'prod-lite-mango',
    name: 'Alphonso Mango',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_mango.png',
    badge: 'ORCHARD FRESH',
    price: '₹749',
  },
  {
    id: 'conv-milk',
    productId: 'prod-lite-milk',
    name: 'Dairy Milk Splash',
    categoryLabel: 'Dairy & Farmhouse Aisle ➔',
    slug: 'dairy-breakfast',
    image: '/images/kits/kit_3d_breakfast.png',
    badge: 'COLD DISPATCH',
    price: '₹42',
  },
  {
    id: 'conv-chips',
    productId: 'prod-lite-kettle-chips',
    name: 'Midnight Munchies',
    categoryLabel: 'Midnight Munchies Lounge ➔',
    slug: 'snacks-beverages',
    image: '/images/kits/kit_3d_munchies.png',
    badge: 'INSTANT CRUNCH',
    price: '₹50',
  },
  {
    id: 'conv-apple',
    productId: 'prod-lite-apples',
    name: 'Royal Gala Apple',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_apple.png',
    badge: 'NATURAL CRISP',
    price: '₹180',
  },
  {
    id: 'conv-spray',
    productId: 'prod-lite-spray',
    name: 'Citrus Surface Cleaner',
    categoryLabel: 'Sparkling Hygiene Aisle ➔',
    slug: 'household-cleaning',
    image: '/images/products/3d_spray.png',
    badge: '99.9% GERM KILL',
    price: '₹149',
  },
  {
    id: 'conv-avocado',
    productId: 'prod-lite-avocado',
    name: 'Hass Avocado',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_avocado.png',
    badge: 'FARM FRESH',
    price: '₹220',
  },
  {
    id: 'conv-paneer',
    productId: 'prod-lite-paneer',
    name: 'Artisan Malai Paneer',
    categoryLabel: 'Dairy & Farmhouse Aisle ➔',
    slug: 'dairy-breakfast',
    image: '/images/kits/kit_3d_paneer.png',
    badge: 'FRESH BATCH',
    price: '₹125',
  },
  {
    id: 'conv-orange',
    productId: 'prod-lite-oranges',
    name: 'Nagpur Oranges',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_orange.png',
    badge: 'CITRUS BURST',
    price: '₹95',
  },
  {
    id: 'conv-dishwash',
    productId: 'prod-lite-dishwash',
    name: 'Lemon Dishwash Gel',
    categoryLabel: 'Sparkling Hygiene Aisle ➔',
    slug: 'household-cleaning',
    image: '/images/products/3d_dishwash.png',
    badge: 'DARK STORE READY',
    price: '₹85',
  },
  {
    id: 'conv-broccoli',
    productId: 'prod-lite-broccoli',
    name: 'Crisp Broccoli',
    categoryLabel: 'Fresh Harvest Aisle ➔',
    slug: 'fruits-vegetables',
    image: '/images/products/3d_broccoli.png',
    badge: 'HYDROPONIC',
    price: '₹65',
  },
  {
    id: 'conv-personal',
    productId: 'prod-lite-dettol-handwash',
    name: 'Botanical Care Essentials',
    categoryLabel: 'Wellness & Care Lounge ➔',
    slug: 'personal-care',
    image: '/images/categories/3d_personal.jpg',
    badge: 'PURE BOTANIC',
    price: '₹280',
  },
  {
    id: 'conv-cookware',
    productId: 'prod-lite-chef-knife',
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

  // Duplicated array to create a seamless infinite horizontal loop
  const infiniteProducts = [...CONVEYOR_PRODUCTS, ...CONVEYOR_PRODUCTS];

  return (
    <section
      aria-label="Haatza Infinite Live Conveyor"
      className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 select-none py-3 sm:py-5"
    >
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .conveyor-marquee-container {
          display: flex !important;
          overflow: hidden !important;
        }

        .conveyor-marquee-row {
          display: flex !important;
          width: max-content !important;
          animation: marquee 25s linear infinite !important;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .conveyor-marquee-container:hover .conveyor-marquee-row,
        .conveyor-marquee-row:hover {
          animation-play-state: paused !important;
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

      {/* Container: display: flex; overflow: hidden; */}
      <div 
        className="conveyor-marquee-container relative rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xs border border-[#0C831F]/15 shadow-[0_8px_32px_-4px_rgba(12,131,31,0.08),0_2px_8px_rgba(0,0,0,0.02)] py-12 sm:py-16 min-h-[310px] sm:min-h-[340px] items-center"
        style={{ display: 'flex', overflow: 'hidden' }}
      >
        {/* Top Ultra-Thin Radiant Neon Green Guide Rail */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0C831F] to-transparent shadow-[0_0_12px_#0C831F] z-20 pointer-events-none" />

        {/* Roller Texture / Track Grid Glass Accent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0C831F_1px,transparent_1px)] [background-size:18px_18px]" />

        {/* Edge Blur Glass Vignette Scrims */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none rounded-l-2xl sm:rounded-l-3xl" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none rounded-r-2xl sm:rounded-r-3xl" />

        {/* Inner row: animation: marquee 25s linear infinite; On hover: animation-play-state: paused; */}
        <div 
          className="conveyor-marquee-row items-center gap-5 sm:gap-7 px-6 py-4"
          style={{ display: 'flex', width: 'max-content' }}
        >
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
                {/* Floating Tracking Badge Above Hovered Item */}
                <div
                  className={`absolute -top-11 z-40 pointer-events-none transition-all duration-200 transform ${
                    isHovered
                      ? 'opacity-100 -translate-y-1.5 scale-100'
                      : 'opacity-0 translate-y-2 scale-90'
                  }`}
                >
                  <div className="px-3 py-1 rounded-full bg-[#0C831F] text-white text-[11px] font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
                    <span>AUTOMATED DISPATCH READY</span>
                  </div>
                </div>

                {/* Conveyor Card Face */}
                <Link
                  to={`/lite/product/${item.productId || item.slug || item.id}`}
                  className={`relative w-[190px] sm:w-[210px] h-[220px] sm:h-[240px] rounded-2xl bg-white border p-3.5 flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out ${
                    isHovered
                      ? 'border-[#0C831F] shadow-[0_16px_36px_-6px_rgba(12,131,31,0.28),0_0_24px_rgba(34,197,94,0.3)] -translate-y-2 scale-[1.03]'
                      : 'border-slate-100 hover:border-slate-200 shadow-2xs'
                  }`}
                >
                  {/* Top Badge & Rating & Price Tag */}
                  <div className="flex items-center justify-between gap-1 z-10">
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-[#EAF8ED] text-[#0C831F] text-[9px] font-black uppercase tracking-wider border border-[#0C831F]/20">
                      <Zap className="w-2.5 h-2.5 fill-current" />
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shadow-2xs">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span>4.8</span>
                      </div>
                      <span className="text-xs font-black text-[#111D15]">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Floating Product Render */}
                  <div className="relative w-full h-28 sm:h-32 flex items-center justify-center my-auto z-10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)] group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                    />
                  </div>

                  {/* Title & Category Destination */}
                  <div className="z-10 pt-1">
                    <p className="text-xs sm:text-sm font-bold text-[#111D15] truncate group-hover:text-[#0C831F] transition-colors">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 truncate flex items-center justify-between">
                      <span>{item.categoryLabel}</span>
                      <ArrowRight className="w-3 h-3 text-[#0C831F] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HaatzaLiteConveyor;
