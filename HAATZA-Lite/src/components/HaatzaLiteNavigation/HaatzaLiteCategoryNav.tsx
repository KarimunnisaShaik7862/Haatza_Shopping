import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { haatzaLiteCategories } from '../../data/liteData';
import { getProductByIdOrSlug } from '../../data/allProductsRegistry';

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
  'bakery-breads': {
    image: '/images/categories/3d_bakery.jpg?v=2',
    alt: '3D Render of Sliced Whole Wheat Bread, Golden Croissants and Sourdough Boule',
  },
  'staples-cooking-essentials': {
    image: '/images/categories/3d_staples.jpg?v=2',
    alt: '3D Render of Wheat Flour Atta, Sunflower Cooking Oil, Yellow Dal and Spices',
  },
  'frozen-foods': {
    image: '/images/categories/3d_frozen.jpg?v=2',
    alt: '3D Render of Vanilla Strawberry Ice Cream Tub, Frozen Peas Bag and Popsicles',
  },
  'baby-care-essentials': {
    image: '/images/categories/3d_baby.jpg?v=2',
    alt: '3D Render of Colorful Diaper Pack, Baby Milk Bottle, Yellow Rubber Duck and Rattle',
  },
  'pet-supplies': {
    image: '/images/categories/3d_pet.jpg?v=2',
    alt: '3D Render of Healthy Dog Food Kibble Bag, Steel Bowl, Cat Food and Chew Bone',
  },
};

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  all: 'All / For You',
  'fruits-vegetables': 'Fruits & Vegetables',
  'dairy-breakfast': 'Dairy & Breakfast',
  'snacks-beverages': 'Snacks & Beverages',
  'household-cleaning': 'Household Cleaning',
  'personal-care': 'Personal Care',
  'kitchen-essentials': 'Kitchen Essentials',
  'bakery-breads': 'Bakery & Breads',
  'staples-cooking-essentials': 'Staples & Cooking',
  'frozen-foods': 'Frozen Foods',
  'baby-care-essentials': 'Baby Care',
  'pet-supplies': 'Pet Supplies',
};

const CATEGORY_NAME_TO_SLUG: Record<string, string> = {
  'fruits & vegetables': 'fruits-vegetables',
  'fresh fruits': 'fruits-vegetables',
  'fresh vegetables': 'fruits-vegetables',
  'daily vegetables': 'fruits-vegetables',
  'dairy & breakfast': 'dairy-breakfast',
  'dairy, bread & eggs': 'dairy-breakfast',
  'milk & paneer': 'dairy-breakfast',
  'farm eggs': 'dairy-breakfast',
  'milk': 'dairy-breakfast',
  'snacks & beverages': 'snacks-beverages',
  'chips & namkeen': 'snacks-beverages',
  'cold drinks & juices': 'snacks-beverages',
  'munchies': 'snacks-beverages',
  'chips & crisps': 'snacks-beverages',
  'household cleaning': 'household-cleaning',
  'cleaning essentials': 'household-cleaning',
  'personal care': 'personal-care',
  'kitchen essentials': 'kitchen-essentials',
  'cookware & pans': 'kitchen-essentials',
  'bakery & breads': 'bakery-breads',
  'breads & bakery': 'bakery-breads',
  'breads & buns': 'bakery-breads',
  'cakes & pastries': 'bakery-breads',
  'cookies & rusks': 'bakery-breads',
  'staples & cooking essentials': 'staples-cooking-essentials',
  'staples & cooking': 'staples-cooking-essentials',
  'atta & rice': 'staples-cooking-essentials',
  'dals & pulses': 'staples-cooking-essentials',
  'cooking oils & ghee': 'staples-cooking-essentials',
  'spices & seasonings': 'staples-cooking-essentials',
  'frozen foods': 'frozen-foods',
  'frozen veggies & corn': 'frozen-foods',
  'fries & ready snacks': 'frozen-foods',
  'ice creams & tubs': 'frozen-foods',
  'baby care & essentials': 'baby-care-essentials',
  'baby care': 'baby-care-essentials',
  'diapers & wipes': 'baby-care-essentials',
  'baby bath & skincare': 'baby-care-essentials',
  'feeding & teethers': 'baby-care-essentials',
  'pet supplies': 'pet-supplies',
  'dog food & chews': 'pet-supplies',
  'cat food & litter': 'pet-supplies',
  'all / for you': 'all',
  'all for you': 'all',
};

const resolveCategorySlugForProduct = (product: {
  categoryName?: string;
  categoryId?: string;
  name?: string;
  subcategoryName?: string;
  tags?: string[];
}): string => {
  if (product.categoryName) {
    const normalizedName = product.categoryName.trim().toLowerCase();
    if (CATEGORY_NAME_TO_SLUG[normalizedName]) {
      return CATEGORY_NAME_TO_SLUG[normalizedName];
    }
  }
  if (product.categoryId) {
    const cid = product.categoryId.toLowerCase();
    if (cid.includes('fruit') || cid.includes('veg')) return 'fruits-vegetables';
    if (cid.includes('dairy')) return 'dairy-breakfast';
    if (cid.includes('snack')) return 'snacks-beverages';
    if (cid.includes('clean')) return 'household-cleaning';
    if (cid.includes('personal')) return 'personal-care';
    if (cid.includes('kitchen')) return 'kitchen-essentials';
    if (cid.includes('bakery') || cid.includes('bread')) return 'bakery-breads';
    if (cid.includes('staple') || cid.includes('cooking')) return 'staples-cooking-essentials';
    if (cid.includes('frozen')) return 'frozen-foods';
    if (cid.includes('baby')) return 'baby-care-essentials';
    if (cid.includes('pet')) return 'pet-supplies';
  }
  const text = `${product.name || ''} ${product.subcategoryName || ''} ${(product.tags || []).join(' ')}`.toLowerCase();
  if (text.includes('fruit') || text.includes('apple') || text.includes('banana') || text.includes('vegetable') || text.includes('potato') || text.includes('tomato') || text.includes('onion') || text.includes('mango') || text.includes('berry') || text.includes('orange') || text.includes('grape')) return 'fruits-vegetables';
  if (text.includes('milk') || text.includes('paneer') || text.includes('butter') || text.includes('cheese') || text.includes('egg') || text.includes('yogurt') || text.includes('curd') || text.includes('ghee')) return 'dairy-breakfast';
  if (text.includes('chip') || text.includes('biscuit') || text.includes('cookie') || text.includes('namkeen') || text.includes('snack') || text.includes('coke') || text.includes('juice') || text.includes('drink') || text.includes('chocolate') || text.includes('cola')) return 'snacks-beverages';
  if (text.includes('detergent') || text.includes('cleaner') || text.includes('dishwash') || text.includes('wash') || text.includes('soap') || text.includes('floor') || text.includes('liquid') || text.includes('harpic') || text.includes('surf')) return 'household-cleaning';
  if (text.includes('shampoo') || text.includes('face') || text.includes('cream') || text.includes('paste') || text.includes('brush') || text.includes('lotion') || text.includes('serum') || text.includes('doves') || text.includes('colgate')) return 'personal-care';
  if (text.includes('pan') || text.includes('cooker') || text.includes('bottle') || text.includes('box') || text.includes('jar') || text.includes('foil') || text.includes('knife') || text.includes('towel') || text.includes('drainer') || text.includes('rack')) return 'kitchen-essentials';
  if (text.includes('bread') || text.includes('pav') || text.includes('bun') || text.includes('cake') || text.includes('rusk') || text.includes('croissant') || text.includes('toast')) return 'bakery-breads';
  if (text.includes('rice') || text.includes('atta') || text.includes('dal') || text.includes('oil') || text.includes('salt') || text.includes('spice') || text.includes('sugar') || text.includes('flour') || text.includes('turmeric') || text.includes('chilli')) return 'staples-cooking-essentials';
  if (text.includes('frozen') || text.includes('ice cream') || text.includes('peas') || text.includes('fry') || text.includes('nugget') || text.includes('popsicle') || text.includes('paratha')) return 'frozen-foods';
  if (text.includes('diaper') || text.includes('wipe') || text.includes('baby') || text.includes('infant') || text.includes('cerelac') || text.includes('pampers')) return 'baby-care-essentials';
  if (text.includes('dog') || text.includes('cat') || text.includes('pet') || text.includes('pedigree') || text.includes('whiskas') || text.includes('kibble') || text.includes('litter')) return 'pet-supplies';
  return 'fruits-vegetables';
};

export const HaatzaLiteCategoryNav: React.FC = () => {
  const location = useLocation();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || document.documentElement.scrollTop;
          setIsScrolled((prev) => {
            // Robust non-oscillating deadband (85px collapse vs 15px expand):
            // The 70px gap is strictly larger than the 60px layout height change,
            // permanently preventing scroll-loop feedback and eliminating all shaking/jitter.
            if (prev) {
              return currentY > 15;
            }
            return currentY > 85;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSearchPage = location.pathname.includes('/search');
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

  // Active category derived from pathname, category state or product registry
  const activeSlug = useMemo(() => {
    const path = decodeURIComponent(location.pathname).toLowerCase().replace(/\/+$/, '');
    
    // 0. Search results page detection: mark category respective of searched product!
    if (path.includes('/search') && searchQuery) {
      return resolveCategorySlugForProduct({ name: searchQuery });
    }

    // 1. Direct Product Details detection (/lite/product/:id or /product/:id)
    if (path.includes('/product/')) {
      const parts = path.split('/product/');
      const rawId = parts[1]?.split('/')[0]?.split('?')[0];
      if (rawId) {
        const prod = getProductByIdOrSlug(rawId);
        if (prod) {
          return resolveCategorySlugForProduct(prod);
        }
        // Fallback from rawId text keywords if synthesized
        return resolveCategorySlugForProduct({ name: rawId });
      }
    }

    // 2. On the homepage (/lite or /), All / For You is active by default
    if (path === '/lite' || path === '' || path === '/lite/home' || path.includes('all-for-you') || path.endsWith('/all')) {
      return 'all';
    }
    if (path.includes('fruit') || path.includes('veg')) {
      return 'fruits-vegetables';
    }
    if (path.includes('dairy')) {
      return 'dairy-breakfast';
    }
    if (path.includes('snack')) {
      return 'snacks-beverages';
    }
    if (path.includes('clean')) {
      return 'household-cleaning';
    }
    if (path.includes('personal')) {
      return 'personal-care';
    }
    if (path.includes('kitchen')) {
      return 'kitchen-essentials';
    }
    if (path.includes('bakery') || path.includes('bread')) {
      return 'bakery-breads';
    }
    if (path.includes('staple') || path.includes('cooking')) {
      return 'staples-cooking-essentials';
    }
    if (path.includes('frozen')) {
      return 'frozen-foods';
    }
    if (path.includes('baby')) {
      return 'baby-care-essentials';
    }
    if (path.includes('pet')) {
      return 'pet-supplies';
    }
    if (path.includes('/lite/categories/')) {
      const parts = path.split('/lite/categories/');
      return parts[1] || null;
    }
    return null;
  }, [location.pathname, searchQuery]);

  useEffect(() => {
    if (activeSlug && isSearchPage) {
      const timer = setTimeout(() => {
        const activeEl = document.querySelector('.cat-item-link.is-active');
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeSlug, isSearchPage]);

  return (
    <nav
      aria-label="Haatza Lite Category Aisles"
      className={`bg-white relative z-10 border-b border-slate-100 select-none transition-[padding,box-shadow,border-color] duration-300 ease-out ${
        isScrolled || isSearchPage
          ? 'nav-is-scrolled py-1.5 sm:py-2 shadow-xs'
          : 'pt-3.5 pb-2.5 sm:pt-3.5 sm:pb-2.5'
      }`}
    >
      <style>{`
        /* 3D Category Image: Clean, crisp 3D renders with pure seamless blend */
        .cat-image-box {
          position: relative;
          height: 34px;
          width: 34px;
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          flex-shrink: 0;
          transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
        }

        @media (max-width: 639px) {
          .cat-image-box {
            height: 34px;
            width: 34px;
            margin-bottom: 3px;
          }
        }

        @media (min-width: 640px) {
          .cat-image-box {
            height: 34px;
            width: 34px;
            margin-bottom: 3px;
          }
        }

        @media (min-width: 1024px) {
          .cat-image-box {
            height: 36px;
            width: 36px;
            margin-bottom: 3px;
          }
        }

        /* Category Item Link: Clean, balanced card geometry with generous breathing room */
        .cat-item-link {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          flex: 1 1 0%;
          min-width: 0;
          max-width: 96px;
          height: 74px;
          min-height: 74px;
          max-height: 74px;
          box-sizing: border-box;
          padding: 5px 3px 6px 3px;
          background: transparent;
          border: none;
          border-radius: 12px;
          transition: transform 200ms cubic-bezier(0.2, 0, 0, 1),
                      background-color 200ms ease,
                      border-color 200ms ease,
                      box-shadow 200ms ease;
          will-change: transform;
        }

        @media (max-width: 639px) {
          .cat-item-link {
            min-width: 68px;
            max-width: 76px;
            height: 74px;
            min-height: 74px;
            max-height: 74px;
            flex-shrink: 0;
            padding: 5px 3px 6px 3px;
            border-radius: 12px;
          }
        }

        @media (min-width: 640px) and (max-width: 820px) {
          .cat-item-link {
            min-width: 68px;
            height: 74px;
            min-height: 74px;
            max-height: 74px;
            flex-shrink: 0;
            padding: 5px 3px 6px 3px;
          }
        }

        /* Clean hover interaction: Soft green shade at background, no line */
        .cat-item-link:hover:not(.is-active) {
          transform: translateY(-1.5px);
          background: rgba(12, 131, 31, 0.045);
          border-radius: 14px;
        }

        .cat-item-link:hover .cat-name-text {
          color: #0C831F !important;
          font-weight: 800 !important;
        }

        /* Active Category: Borderless pure soft green shade at background */
        .cat-item-link.is-active {
          background: #E8F8EE !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          border-radius: 14px !important;
        }

        .cat-item-link.is-active .cat-image-box img {
          transform: scale(1.05);
        }

        .cat-item-link.is-active .cat-name-text {
          color: #0C831F !important;
          font-weight: 800 !important;
        }



        /* Category Name Label: Multi-line layout with line-height that never overlaps */
        .cat-name-text {
          font-size: 10px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          text-align: center;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: normal;
          max-width: 76px;
          min-height: 26px;
          transition: font-weight 150ms ease, color 150ms ease;
        }

        @media (max-width: 639px) {
          .cat-name-text {
            font-size: 9.5px;
            line-height: 1.25;
            max-width: 66px;
            min-height: 25px;
            font-weight: 600;
          }
        }

        @media (min-width: 640px) {
          .cat-name-text {
            font-size: 10.5px;
            line-height: 1.25;
            max-width: 78px;
            min-height: 26px;
          }
        }

        @media (min-width: 1280px) {
          .cat-name-text {
            font-size: 11px;
            line-height: 1.25;
            max-width: 84px;
            min-height: 27px;
          }
        }

        /* WHEN SCROLLED: Small, sleek, professional pills with fully visible category names */
        nav.nav-is-scrolled {
          padding-top: 6px !important;
          padding-bottom: 6px !important;
          background: #FFFFFF !important;
          border-bottom: 1px solid rgba(226, 232, 240, 0.9) !important;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
          min-height: auto !important;
        }

        .nav-is-scrolled .cat-image-box {
          display: none !important;
        }

        .nav-is-scrolled .cat-nav-wrapper {
          padding-left: 12px !important;
          padding-right: 12px !important;
          width: 100% !important;
          max-width: 1440px !important;
        }

        @media (min-width: 640px) {
          .nav-is-scrolled .cat-nav-wrapper {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }

        @media (min-width: 1024px) {
          .nav-is-scrolled .cat-nav-wrapper {
            padding-left: 28px !important;
            padding-right: 28px !important;
          }
        }

        /* Scrolled Inner Row: Smooth horizontal scroll list so names are never truncated */
        .nav-is-scrolled .cat-nav-inner {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 6px !important;
          overflow-x: auto !important;
          scrollbar-width: none !important;
          -webkit-overflow-scrolling: touch !important;
          padding: 2px 2px !important;
          width: 100% !important;
        }

        @media (min-width: 1280px) {
          .nav-is-scrolled .cat-nav-inner {
            gap: 8px !important;
          }
        }

        .nav-is-scrolled .cat-nav-inner::-webkit-scrollbar {
          display: none !important;
        }

        /* Scrolled Category Pill: Small, sleek, professional */
        .nav-is-scrolled .cat-item-link {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          flex: 0 0 auto !important;
          width: auto !important;
          min-width: max-content !important;
          max-width: none !important;
          height: 28px !important;
          min-height: 28px !important;
          max-height: 28px !important;
          padding: 0 11px !important;
          margin: 0 !important;
          border-radius: 9999px !important;
          background: #F8FAFC !important;
          border: 1px solid #E2E8F0 !important;
          box-shadow: none !important;
          transform: none !important;
          cursor: pointer !important;
          transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease !important;
        }

        .nav-is-scrolled .cat-item-link:hover:not(.is-active) {
          background: #F1F5F9 !important;
          border-color: #CBD5E1 !important;
        }

        /* Active Scrolled Pill: Soft green shade background matching the active theme */
        .nav-is-scrolled .cat-item-link.is-active {
          background: #E8F8EE !important;
          border: 1px solid rgba(12, 131, 31, 0.28) !important;
          box-shadow: 0 1px 3px rgba(12, 131, 31, 0.10) !important;
          transform: none !important;
        }

        /* Scrolled Category Name: Fully shown, crisp, no ellipsis or cutoffs */
        .nav-is-scrolled .cat-item-link .cat-name-text {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #334155 !important;
          letter-spacing: -0.01em !important;
          white-space: nowrap !important;
          text-overflow: clip !important;
          overflow: visible !important;
          max-width: none !important;
          min-height: auto !important;
          max-height: none !important;
          -webkit-line-clamp: unset !important;
          display: inline-block !important;
          line-height: 28px !important;
          text-align: center !important;
        }

        .nav-is-scrolled .cat-item-link.is-active .cat-name-text {
          color: #0C831F !important;
          font-weight: 700 !important;
          text-shadow: none !important;
        }

        .nav-is-scrolled .cat-item-link:hover:not(.is-active) .cat-name-text {
          color: #0C831F !important;
        }

        .nav-is-scrolled .cat-active-glow-span,
        .nav-is-scrolled .cat-active-line {
          display: none !important;
        }
      `}</style>

      <div className="cat-nav-wrapper w-full max-w-[1440px] mx-auto px-3.5 sm:px-4 lg:px-6">
        <div
          className="cat-nav-inner flex items-center justify-between w-full px-0.5 overflow-x-auto scrollbar-none gap-2.5 sm:gap-1 lg:gap-1.5"
          onMouseLeave={() => setHoveredSlug(null)}
        >
          {haatzaLiteCategories.map((cat) => {
            const asset = CATEGORY_3D_ASSETS[cat.slug];
            const imageUrl = asset?.image || cat.image;
            const isHovered = hoveredSlug === cat.slug;
            const isActive = activeSlug === cat.slug;
            const isSelected = isHovered || isActive;
            const isAllForYou = cat.slug === 'all' || cat.slug === 'all-for-you';
            const isFruitsVeg = cat.slug === 'fruits-vegetables';
            const isDairyBreakfast = cat.slug === 'dairy-breakfast';
            const isSnacksBeverages = cat.slug === 'snacks-beverages';
            const isHouseholdCleaning = cat.slug === 'household-cleaning';
            const isPersonalCare = cat.slug === 'personal-care';
            const isKitchenEssentials = cat.slug === 'kitchen-essentials';
            const isBakeryBreads = cat.slug === 'bakery-breads';
            const isStaplesCooking = cat.slug === 'staples-cooking-essentials';
            const isFrozenFoods = cat.slug === 'frozen-foods';
            const isBabyCare = cat.slug === 'baby-care-essentials';
            const isPetSupplies = cat.slug === 'pet-supplies';

            const categoryLink = isAllForYou 
              ? '/lite' 
              : isFruitsVeg 
              ? '/lite/fruits-vegetables' 
              : isDairyBreakfast
              ? '/lite/dairy-breakfast'
              : isSnacksBeverages
              ? '/lite/snacks-beverages'
              : isHouseholdCleaning
              ? '/lite/household-cleaning'
              : isPersonalCare
              ? '/lite/personal-care'
              : isKitchenEssentials
              ? '/lite/kitchen-essentials'
              : isBakeryBreads
              ? '/lite/bakery-breads'
              : isStaplesCooking
              ? '/lite/staples-cooking-essentials'
              : isFrozenFoods
              ? '/lite/frozen-foods'
              : isBabyCare
              ? '/lite/baby-care-essentials'
              : isPetSupplies
              ? '/lite/pet-supplies'
              : `/lite/${cat.slug}`;

            return (
              <Link
                key={cat.id}
                to={categoryLink}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                }}
                onMouseEnter={() => setHoveredSlug(cat.slug)}
                className={`cat-item-link relative group cursor-pointer ${isActive ? 'is-active' : ''}`}
              >
                {/* 3D Category Icon - floating cleanly with seamless multiply blend */}
                <div className="cat-image-box relative">
                  <img
                    src={imageUrl}
                    alt={asset?.alt || cat.name}
                    className={`w-full h-full object-contain select-none mix-blend-multiply transition-transform duration-200 relative z-[1] ${
                      isSelected ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                    loading="eager"
                  />
                </div>

                {/* Category Name - highlighted in green and bold when active or hovered */}
                <span
                  className={`cat-name-text transition-all duration-150 relative z-[1] ${
                    isActive
                      ? 'text-[#0C831F] font-black tracking-tight'
                      : isHovered
                      ? 'text-[#0C831F] font-extrabold'
                      : 'text-[#111D15] font-medium group-hover:text-[#0C831F] group-hover:font-extrabold'
                  }`}
                >
                  {CATEGORY_DISPLAY_NAMES[cat.slug] || cat.name}
                </span>


              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default HaatzaLiteCategoryNav;
