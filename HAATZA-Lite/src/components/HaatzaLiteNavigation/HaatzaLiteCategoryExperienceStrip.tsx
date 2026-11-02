import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

interface SubAisle {
  id: string;
  label: string;
  icon: string;
  tag?: string;
}

const CATEGORY_SUB_AISLES: Record<string, { aisles: SubAisle[]; highlight: string; promoTag: string }> = {
  all: {
    highlight: '🔥 Peak Demand: Over 1,200 orders dispatched in your area today',
    promoTag: 'INSTANT COMBOS ACTIVE',
    aisles: [
      { id: 'all-top', label: 'All Items', icon: '✨' },
      { id: 'all-flash', label: 'Flash Steals', icon: '⚡', tag: 'Under ₹99' },
      { id: 'all-loved', label: 'Most Loved', icon: '🔥', tag: 'Top Rated' },
      { id: 'all-farm', label: 'Farm Fresh', icon: '🌿' },
      { id: 'all-dairy', label: 'Morning Dairy', icon: '🥛' },
      { id: 'all-munch', label: 'Munchies & Sips', icon: '🍿' },
      { id: 'all-clean', label: 'Home Hygiene', icon: '✨' },
      { id: 'all-organic', label: '100% Organic', icon: '💚', tag: 'Certified' },
    ],
  },
  'fruits-vegetables': {
    highlight: '🌿 Sunrise Harvest: Hydro-cooled produce received 45 mins ago',
    promoTag: 'ZERO CHEMICALS',
    aisles: [
      { id: 'fv-all', label: 'All Harvest', icon: '🌿' },
      { id: 'fv-daily', label: 'Daily Cooking Essentials', icon: '🥔', tag: 'Fresh Picks' },
      { id: 'fv-fruits', label: 'Orchard & Exotic Fruits', icon: '🍎', tag: 'Sweet & Juicy' },
      { id: 'fv-greens', label: 'Hydroponic Leafy Greens', icon: '🥬' },
      { id: 'fv-super', label: 'Berries & Superfoods', icon: '🥑', tag: 'Immunity' },
      { id: 'fv-salads', label: 'Cut & Ready-to-Cook', icon: '🥗' },
      { id: 'fv-citrus', label: 'Citrus & Seasonal', icon: '🍊' },
    ],
  },
  'dairy-breakfast': {
    highlight: '🥛 Farm Cold-Chain: Stored at constant 3.8°C for ultimate purity',
    promoTag: 'PURE MILK GUARANTEE',
    aisles: [
      { id: 'db-all', label: 'All Dairy & Breakfast', icon: '🥛' },
      { id: 'db-milk', label: 'Whole & Toned Milk', icon: '🥛', tag: 'Morning Batch' },
      { id: 'db-paneer', label: 'Artisan Paneer & Curd', icon: '🧀' },
      { id: 'db-eggs', label: 'Pasture Country Eggs', icon: '🥚', tag: 'High Protein' },
      { id: 'db-bread', label: 'Sourdough & Whole Wheat', icon: '🍞' },
      { id: 'db-butter', label: 'Cultured Butter & Ghee', icon: '🧈' },
      { id: 'db-cereal', label: 'Muesli & Granola Bowls', icon: '🥣' },
    ],
  },
  'snacks-beverages': {
    highlight: '🔥 Midnight Cravings: Chips, cold brews & chocolates ready for dispatch',
    promoTag: 'CHILLED ON ARRIVAL',
    aisles: [
      { id: 'sb-all', label: 'All Snacks & Sips', icon: '🍿' },
      { id: 'sb-chips', label: 'Kettle Chips & Crisps', icon: '🥔', tag: 'Crunch' },
      { id: 'sb-energy', label: 'Cold Energy & Sodas', icon: '⚡', tag: 'Ice Cold' },
      { id: 'sb-choco', label: 'Artisan & Dark Chocolates', icon: '🍫' },
      { id: 'sb-namkeen', label: 'Traditional Namkeen & Sev', icon: '🥨' },
      { id: 'sb-nuts', label: 'Roasted Makhana & Cashews', icon: '🥜', tag: 'Guilt Free' },
      { id: 'sb-cookies', label: 'Gourmet Cookies & Dips', icon: '🍪' },
    ],
  },
  'household-cleaning': {
    highlight: '✨ 99.9% Protection: Hospital-grade disinfectants and gentle detergents',
    promoTag: 'TOUGH ON GRIME',
    aisles: [
      { id: 'hc-all', label: 'All Household Essentials', icon: '✨' },
      { id: 'hc-surf', label: 'Disinfectant Surface Sprays', icon: '🧴', tag: 'Anti-Bacterial' },
      { id: 'hc-dish', label: 'Enzyme Dishwash Liquids', icon: '🍋' },
      { id: 'hc-wash', label: 'Aromatic Laundry Pods', icon: '👕', tag: 'Color Safe' },
      { id: 'hc-toilet', label: 'Floor & Toilet Sparkle', icon: '🧽' },
      { id: 'hc-room', label: 'Aromatherapy Sprays', icon: '🌸' },
    ],
  },
  'personal-care': {
    highlight: '🌸 Clean Radiance: Dermatologist approved serums, washes & haircare',
    promoTag: 'CRUELTY FREE',
    aisles: [
      { id: 'pc-all', label: 'All Self-Care', icon: '🌸' },
      { id: 'pc-skin', label: 'Hydrating Glow Serums', icon: '💧', tag: 'Trending' },
      { id: 'pc-body', label: 'Botanical Body Washes', icon: '🚿' },
      { id: 'pc-hair', label: 'Sulfate-Free Shampoos', icon: '✨' },
      { id: 'pc-oral', label: 'Probiotic Oral Care', icon: '🦷' },
      { id: 'pc-soap', label: 'Luxury Cold-Pressed Soaps', icon: '🧼' },
    ],
  },
  'kitchen-essentials': {
    highlight: '🍳 Chef Curated: Heavy-gauge cookware, sharp knives and storage jars',
    promoTag: 'PREMIUM QUALITY',
    aisles: [
      { id: 'ke-all', label: 'All Cookware', icon: '🍳' },
      { id: 'ke-pans', label: 'Hard-Anodized Fry Pans', icon: '🍳', tag: 'Non-Stick' },
      { id: 'ke-knives', label: 'Japanese Steel Cutlery', icon: '🔪' },
      { id: 'ke-jars', label: 'Borosilicate Glass Jars', icon: '🫙', tag: 'Airtight' },
      { id: 'ke-prep', label: 'Choppers & Silicone Spatulas', icon: '🥣' },
      { id: 'ke-coffee', label: 'French Press & Mugs', icon: '☕' },
    ],
  },
  'bakery-breads': {
    highlight: '🥐 Morning Oven: Sourdough and butter croissants baked fresh at 4:00 AM',
    promoTag: 'OVEN FRESH',
    aisles: [
      { id: 'bb-all', label: 'All Bakery', icon: '🥐' },
      { id: 'bb-sour', label: 'Artisan Sourdough Boules', icon: '🍞', tag: 'Wild Yeast' },
      { id: 'bb-wheat', label: '100% Whole Wheat Bread', icon: '🥪' },
      { id: 'bb-croiss', label: 'Flaky Butter Croissants', icon: '🥐', tag: 'French Style' },
      { id: 'bb-buns', label: 'Brioche Burger Buns', icon: '🥯' },
      { id: 'bb-dessert', label: 'Tea Cakes & Brownies', icon: '🧁' },
    ],
  },
  'staples-cooking-essentials': {
    highlight: '🌾 Heritage Grains: 100% unpolished dals and cold-pressed pure oils',
    promoTag: 'FARM PURITY',
    aisles: [
      { id: 'sc-all', label: 'All Pantry Staples', icon: '🌾' },
      { id: 'sc-atta', label: 'Chakki-Fresh Stoneground Atta', icon: '🌾', tag: 'High Fiber' },
      { id: 'sc-rice', label: 'Aged Long Basmati Rice', icon: '🍚' },
      { id: 'sc-dal', label: 'Unpolished Organic Dals', icon: '🫘' },
      { id: 'sc-oil', label: 'Wood-Pressed Mustard & Sesame Oil', icon: '🌻', tag: 'Cold Pressed' },
      { id: 'sc-spice', label: 'Whole Roasted Spices & Salt', icon: '🧂' },
    ],
  },
  'frozen-foods': {
    highlight: '🧊 Fast Lock: Flash-frozen at -18°C to seal in nutrients and crispness',
    promoTag: '5-MIN COOK',
    aisles: [
      { id: 'ff-all', label: 'All Frozen Eats', icon: '🧊' },
      { id: 'ff-fries', label: 'Crinkle French Fries & Wedges', icon: '🍟', tag: 'Extra Crisp' },
      { id: 'ff-ice', label: 'Artisan Gelato & Ice Creams', icon: '🍦', tag: 'Chilled Safe' },
      { id: 'ff-peas', label: 'Sweet Green Peas & Corn', icon: '🌱' },
      { id: 'ff-momos', label: 'Steamed Momos & Dimsums', icon: '🥟' },
      { id: 'ff-nuggets', label: 'Crispy Veg Nuggets', icon: '🧀' },
    ],
  },
  'baby-care-essentials': {
    highlight: '👶 Pediatrician Approved: Ultra-soft cotton diapers, wipes & gentle care',
    promoTag: 'TEAR FREE',
    aisles: [
      { id: 'bc-all', label: 'All Baby Care', icon: '👶' },
      { id: 'bc-diaper', label: 'Feather-Soft Cotton Diapers', icon: '👶', tag: '12h Dryness' },
      { id: 'bc-wipes', label: 'Pure Water & Aloe Wipes', icon: '🌿' },
      { id: 'bc-bath', label: 'Hypoallergenic Wash & Lotion', icon: '🧴' },
      { id: 'bc-feed', label: 'BPA-Free Sterile Bottles', icon: '🍼' },
      { id: 'bc-food', label: 'Organic Purees & Cereals', icon: '🥣' },
    ],
  },
  'pet-supplies': {
    highlight: '🐾 Vet Formulated: Complete nutrition, crunchy treats and chewing toys',
    promoTag: 'HAPPY PETS',
    aisles: [
      { id: 'ps-all', label: 'All Pet Feasts', icon: '🐾' },
      { id: 'ps-dog', label: 'High-Protein Dog Kibble', icon: '🐕', tag: 'Vet Choice' },
      { id: 'ps-cat', label: 'Gourmet Gravy Cat Food', icon: '🐈' },
      { id: 'ps-bones', label: 'Natural Dental Chew Bones', icon: '🦴' },
      { id: 'ps-treats', label: 'Crunchy Training Treats', icon: '🥩' },
      { id: 'ps-litter', label: 'Odor-Lock Clean Litter', icon: '🐾' },
    ],
  },
};

interface HaatzaLiteCategoryExperienceStripProps {
  title?: string;
  categorySlug?: string;
}

export const HaatzaLiteCategoryExperienceStrip: React.FC<HaatzaLiteCategoryExperienceStripProps> = ({
  title,
  categorySlug,
}) => {
  const location = useLocation();
  const [activeAisleId, setActiveAisleId] = useState<string>('all');

  // Derive active category configuration
  const config = useMemo(() => {
    if (categorySlug && CATEGORY_SUB_AISLES[categorySlug]) {
      return CATEGORY_SUB_AISLES[categorySlug];
    }

    const path = decodeURIComponent(location.pathname).toLowerCase();
    if (path.includes('fruits') || path.includes('veg')) return CATEGORY_SUB_AISLES['fruits-vegetables'];
    if (path.includes('dairy') || path.includes('breakfast')) return CATEGORY_SUB_AISLES['dairy-breakfast'];
    if (path.includes('snack') || path.includes('beverage')) return CATEGORY_SUB_AISLES['snacks-beverages'];
    if (path.includes('clean') || path.includes('household')) return CATEGORY_SUB_AISLES['household-cleaning'];
    if (path.includes('personal') || (path.includes('care') && !path.includes('baby'))) return CATEGORY_SUB_AISLES['personal-care'];
    if (path.includes('kitchen')) return CATEGORY_SUB_AISLES['kitchen-essentials'];
    if (path.includes('bakery') || path.includes('bread')) return CATEGORY_SUB_AISLES['bakery-breads'];
    if (path.includes('staple') || path.includes('cooking')) return CATEGORY_SUB_AISLES['staples-cooking-essentials'];
    if (path.includes('frozen')) return CATEGORY_SUB_AISLES['frozen-foods'];
    if (path.includes('baby')) return CATEGORY_SUB_AISLES['baby-care-essentials'];
    if (path.includes('pet')) return CATEGORY_SUB_AISLES['pet-supplies'];
    if (path.includes('all-for-you') || path.includes('/all')) return CATEGORY_SUB_AISLES['all'];

    if (title) {
      const lower = title.toLowerCase();
      if (lower.includes('fruit') || lower.includes('veg')) return CATEGORY_SUB_AISLES['fruits-vegetables'];
      if (lower.includes('dairy') || lower.includes('breakfast')) return CATEGORY_SUB_AISLES['dairy-breakfast'];
      if (lower.includes('snack') || lower.includes('beverage')) return CATEGORY_SUB_AISLES['snacks-beverages'];
      if (lower.includes('clean') || lower.includes('household')) return CATEGORY_SUB_AISLES['household-cleaning'];
      if (lower.includes('personal')) return CATEGORY_SUB_AISLES['personal-care'];
      if (lower.includes('kitchen')) return CATEGORY_SUB_AISLES['kitchen-essentials'];
      if (lower.includes('bakery') || lower.includes('bread')) return CATEGORY_SUB_AISLES['bakery-breads'];
      if (lower.includes('staple') || lower.includes('cooking')) return CATEGORY_SUB_AISLES['staples-cooking-essentials'];
      if (lower.includes('frozen')) return CATEGORY_SUB_AISLES['frozen-foods'];
      if (lower.includes('baby')) return CATEGORY_SUB_AISLES['baby-care-essentials'];
      if (lower.includes('pet')) return CATEGORY_SUB_AISLES['pet-supplies'];
    }

    return CATEGORY_SUB_AISLES['all'];
  }, [categorySlug, location.pathname, title]);

  return (
    <div className="relative z-10 w-full mb-3 sm:mb-4 select-none">
      {/* CURATED SUBCATEGORY AISLE PILLS CAROUSEL */}
      <div className="relative w-full rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-2 sm:p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        
        {/* Horizontal Scroll Track */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 px-0.5">
          {config.aisles.map((aisle, idx) => {
            const isActive = activeAisleId === aisle.id || (activeAisleId === 'all' && idx === 0);

            return (
              <button
                key={aisle.id}
                type="button"
                onClick={() => setActiveAisleId(aisle.id)}
                className={`group relative shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0C831F] to-[#085C15] text-white shadow-md shadow-emerald-700/20 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-emerald-50/70 text-slate-700 hover:text-[#0C831F] border border-slate-200/60'
                }`}
              >
                {/* Emoji / Icon */}
                <span className="text-sm shrink-0">{aisle.icon}</span>

                {/* Label */}
                <span className="tracking-tight whitespace-nowrap">{aisle.label}</span>

                {/* Optional Micro Tag */}
                {aisle.tag && (
                  <span
                    className={`text-[9.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0 ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-emerald-100 text-[#0C831F] group-hover:bg-emerald-200'
                    }`}
                  >
                    {aisle.tag}
                  </span>
                )}

                {/* Active Indicator checkmark */}
                {isActive && (
                  <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default HaatzaLiteCategoryExperienceStrip;
