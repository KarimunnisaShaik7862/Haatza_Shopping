import React from 'react';
import { Link } from 'react-router-dom';
import { haatzaLiteCategories } from '../../data/liteData';

// Hyper-Realistic High-Definition 3D Food & Product Renders
const CATEGORY_3D_ASSETS: Record<string, { image: string; alt: string }> = {
  all: {
    image: '/images/categories/3d_all.jpg',
    alt: '3D Render of Grocery Shopping Basket with Fresh Essentials',
  },
  'fruits-vegetables': {
    image: '/images/categories/3d_fruits.jpg',
    alt: '3D Render of Glossy Fresh Apple, Orange, Banana and Crisp Broccoli',
  },
  'dairy-breakfast': {
    image: '/images/categories/3d_dairy.jpg',
    alt: '3D Render of Fresh Milk Bottle Splash, Dairy Carton, Butter and Eggs',
  },
  'snacks-beverages': {
    image: '/images/categories/3d_snacks.jpg',
    alt: '3D Render of Glossy Chips Packet, Cold Beverage Can and Cookies',
  },
  'household-cleaning': {
    image: '/images/categories/3d_cleaning.jpg',
    alt: '3D Render of Cyan Spray Cleaner, Detergent Bottle and Sparkling Bubbles',
  },
  'personal-care': {
    image: '/images/categories/3d_personal.jpg',
    alt: '3D Render of Luxury Shampoo, Skincare Lotion Pump and Natural Soap',
  },
  'kitchen-essentials': {
    image: '/images/categories/3d_kitchen.jpg',
    alt: '3D Render of Chef Knife, Non-Stick Frying Pan and Cookware',
  },
};

export const HaatzaLiteCategoryNav: React.FC = () => {
  return (
    <nav
      aria-label="Haatza Lite Category Aisles"
      className="bg-white py-3 sm:py-4 sticky top-[49px] sm:top-[53px] z-30 select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full">
        {/* Borderless, Raw Floating 3D Category Icons with Clean Black Labels Underneath */}
        <div className="flex items-start justify-between gap-3 sm:gap-6 overflow-x-auto no-scrollbar w-full py-2.5 sm:py-3.5 px-1">
          {haatzaLiteCategories.map((cat) => {
            const asset = CATEGORY_3D_ASSETS[cat.slug];
            const imageUrl = asset?.image || cat.image;

            return (
              <Link
                key={cat.id}
                to={`/lite/categories/${cat.slug}`}
                className="group flex flex-col items-center justify-center p-2 rounded-xl border border-transparent bg-transparent shadow-none hover:border-[#0C831F]/30 hover:shadow-xs hover:-translate-y-0.5 active:scale-95 transition-all duration-150 ease-out cursor-pointer flex-1 min-w-[85px] max-w-[145px]"
              >
                {/* Raw, Borderless Floating 3D Grocery Icon - Expanded container & unclipped */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 flex items-center justify-center mb-2 pointer-events-none overflow-visible">
                  <img
                    src={imageUrl}
                    alt={asset?.alt || cat.name}
                    className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-200 ease-out"
                    loading="eager"
                  />
                </div>

                {/* Clean Black Label Positioned Neatly Underneath */}
                <span className="font-semibold text-xs sm:text-[13px] text-[#111D15] group-hover:text-[#0C831F] text-center tracking-tight leading-tight line-clamp-1 transition-colors duration-150">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
