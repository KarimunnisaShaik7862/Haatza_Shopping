import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Clock, 
  Plus, 
  Minus, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  RotateCcw,
  Check
} from 'lucide-react';
import { formatCurrency } from '@shopping/utils/formatters';

export interface GenericSearchResultProduct {
  id: string;
  slug?: string;
  name: string;
  brand: string;
  categoryId?: string;
  subcategoryId?: string;
  categoryName?: string;
  subcategoryName?: string;
  description?: string;
  price: number;
  mrp: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock?: number;
  inStock: boolean;
  unit?: string;
  instantDeliveryMinutes?: number;
  deliveryDays?: number;
  mainImage: string;
  images?: string[];
  tags?: string[];
  isTrending?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
}

export interface UnifiedSearchResultsViewProps {
  platform: 'lite' | 'shopping';
  query: string;
  products: GenericSearchResultProduct[];
  loading: boolean;
  getCartQuantity: (productId: string) => number;
  onAddToCart: (product: GenericSearchResultProduct, qty: number) => void;
  onUpdateQuantity: (productId: string, qty: number) => void;
  onProductClick: (product: GenericSearchResultProduct) => void;
  onSearchChange?: (newQuery: string) => void;
}

export const UnifiedSearchResultsView: React.FC<UnifiedSearchResultsViewProps> = ({
  platform,
  query,
  products,
  loading,
  getCartQuantity,
  onAddToCart,
  onUpdateQuantity,
  onProductClick,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedHealthyPicks, setSelectedHealthyPicks] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);
  const [selectedPackOf, setSelectedPackOf] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'discount'>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const sortOptions = useMemo(
    () => [
      { value: 'featured', label: 'Featured / Relevance' },
      { value: 'price_low', label: 'Price: Low to High' },
      { value: 'price_high', label: 'Price: High to Low' },
      { value: 'discount', label: 'Highest Discount' },
      { value: 'rating', label: 'Customer Rating' },
    ],
    []
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    if (isSortOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSortOpen]);

  // Accordion Sections Open/Closed States
  const [openSections, setOpenSections] = useState({
    subcategories: true,
    price: true,
    brand: true,
    healthyPicks: true,
    weight: true,
    packaging: true,
    packOf: true,
  });

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showAllSubcategories, setShowAllSubcategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllHealthyPicks, setShowAllHealthyPicks] = useState(false);
  const [showAllWeights, setShowAllWeights] = useState(false);
  const [showAllPackaging, setShowAllPackaging] = useState(false);
  const [showAllPackOf, setShowAllPackOf] = useState(false);

  const isLite = platform === 'lite';

  // Strictly enforce platform boundary: Lite items only in Lite, Shopping items only in Shopping
  const scopedProducts = useMemo(() => {
    return products.filter((p: any) => {
      if (isLite) {
        return p.destination !== 'haatza' && p.destination !== 'nest';
      } else {
        return p.destination === 'haatza' || (!p.destination && p.destination !== 'lite' && p.destination !== 'nest');
      }
    });
  }, [products, isLite]);

  // Derive dynamic min/max price from incoming scoped products
  const { minProductPrice, maxProductPrice } = useMemo(() => {
    if (scopedProducts.length === 0) return { minProductPrice: 0, maxProductPrice: 1000 };
    const prices = scopedProducts.map((p) => p.price);
    return {
      minProductPrice: Math.min(...prices),
      maxProductPrice: Math.max(...prices),
    };
  }, [scopedProducts]);

  // Sync initial price range when products arrive
  useEffect(() => {
    if (scopedProducts.length > 0) {
      setPriceRange([minProductPrice, maxProductPrice]);
    }
  }, [minProductPrice, maxProductPrice, scopedProducts.length]);

  // Extract all Primary Categories dynamically from matched products
  const categoryOptions = useMemo(() => {
    const map = new Map<string, number>();
    scopedProducts.forEach((p) => {
      const cat = p.categoryName || 'General';
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [scopedProducts]);

  // Determine which category should be marked regarding the product searched
  const markedCategoryName = useMemo(() => {
    if (!query) return 'all';
    const q = query.toLowerCase();
    const match = categoryOptions.find((c) => {
      const name = c.name.toLowerCase();
      if (name.includes(q) || q.includes(name)) return true;
      if (q.includes('milk') && (name.includes('dairy') || name.includes('grocer'))) return true;
      if (q.includes('bread') && (name.includes('bakery') || name.includes('dairy'))) return true;
      if (q.includes('fruit') && name.includes('fruit')) return true;
      if (q.includes('snack') && name.includes('snack')) return true;
      return false;
    });
    return match ? match.name : (categoryOptions[0]?.name || 'all');
  }, [query, categoryOptions]);

  // Set default selected category to the marked category on load/query change
  useEffect(() => {
    if (markedCategoryName) {
      setSelectedCategory(markedCategoryName);
    }
  }, [markedCategoryName]);

  // Extract all Subcategories dynamically respective of the matching products!
  const subcategoryOptions = useMemo(() => {
    const map = new Map<string, number>();
    scopedProducts.forEach((p) => {
      const sub = p.subcategoryName || p.categoryName || 'Other Essentials';
      map.set(sub, (map.get(sub) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [scopedProducts]);

  // Extract all Brands dynamically with count
  const brandOptions = useMemo(() => {
    const map = new Map<string, number>();
    scopedProducts.forEach((p) => {
      if (p.brand) {
        map.set(p.brand, (map.get(p.brand) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [scopedProducts]);

  // Quick Brand chips (top popular brands from screenshot)
  const quickBrandPills = useMemo(() => {
    return brandOptions.slice(0, 8).map((b) => b.name);
  }, [brandOptions]);

  // Extract Healthy Picks / Special Tags with count
  const healthyPicksOptions = useMemo(() => {
    const tagsOfInterest = [
      'A2 Milk',
      'High Protein',
      'Organic',
      'Probiotic',
      'Low Fat',
      'No Added Sugar',
      'Gluten Free',
      'Fresh Harvest',
    ];
    const map = new Map<string, number>();
    scopedProducts.forEach((p) => {
      const allTags = [...(p.tags || []), p.name, p.description || ''].join(' ').toLowerCase();
      tagsOfInterest.forEach((tag) => {
        if (allTags.includes(tag.toLowerCase())) {
          map.set(tag, (map.get(tag) || 0) + 1);
        }
      });
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [scopedProducts]);

  // Extract Weights / Sizes dynamically with count
  const weightOptions = useMemo(() => {
    const map = new Map<string, number>();
    scopedProducts.forEach((p) => {
      const u = p.unit?.trim();
      if (u) {
        // Normalize common units e.g. 1 L, 500 ml, 450 ml, etc.
        let standard = u;
        if (/1\s*L/i.test(u)) standard = '1 L';
        else if (/500\s*ml/i.test(u)) standard = '500 ml';
        else if (/450\s*ml|450\s*g/i.test(u)) standard = '450 ml or 450 g';
        else if (/250\s*ml|250\s*g/i.test(u)) standard = '250 ml';
        else if (/200\s*ml|200\s*g/i.test(u)) standard = '200 ml';
        else if (/100\s*g/i.test(u)) standard = '100 g';
        else if (/400\s*g/i.test(u)) standard = '400 g';
        else if (/350\s*g/i.test(u)) standard = '350 g';

        map.set(standard, (map.get(standard) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [scopedProducts]);

  // Extract Packaging dynamically
  const packagingOptions = useMemo(() => {
    const types = ['Pouch', 'Bottle', 'Tetra Pack', 'Tub', 'Gable Top Pack', 'Box'];
    const map = new Map<string, number>();
    scopedProducts.forEach((p) => {
      const combined = `${p.name} ${p.unit || ''} ${p.tags?.join(' ') || ''} ${p.description || ''}`.toLowerCase();
      types.forEach((t) => {
        if (combined.includes(t.toLowerCase())) {
          map.set(t, (map.get(t) || 0) + 1);
        }
      });
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [scopedProducts]);

  // Extract Pack Of
  const packOfOptions = useMemo(() => {
    const packs = ['1', '2', '4', '6', '10', '12'];
    const map = new Map<string, number>();
    scopedProducts.forEach((p) => {
      const u = (p.unit || '').toLowerCase();
      packs.forEach((pk) => {
        if (u.includes(`pack of ${pk}`) || u.includes(`(${pk} pcs)`) || u.includes(`(${pk} pieces)`) || pk === '1') {
          map.set(pk, (map.get(pk) || 0) + 1);
        }
      });
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [scopedProducts]);

  // Filter Pipeline
  const filteredProducts = useMemo(() => {
    return scopedProducts.filter((p) => {
      // Category filter from top strip
      if (selectedCategory && selectedCategory !== 'all') {
        const cat = p.categoryName || '';
        if (cat !== selectedCategory) return false;
      }

      // Subcategory filter
      if (selectedSubcategories.length > 0) {
        const sub = p.subcategoryName || p.categoryName || '';
        if (!selectedSubcategories.includes(sub)) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(p.brand)) return false;
      }

      // Price filter
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      // Healthy picks filter
      if (selectedHealthyPicks.length > 0) {
        const combined = [...(p.tags || []), p.name, p.description || ''].join(' ').toLowerCase();
        const hasMatch = selectedHealthyPicks.some((pick) => combined.includes(pick.toLowerCase()));
        if (!hasMatch) return false;
      }

      // Weight filter
      if (selectedWeights.length > 0) {
        const u = p.unit || '';
        const hasWeight = selectedWeights.some((w) => {
          if (w === '1 L') return /1\s*L/i.test(u);
          if (w === '500 ml') return /500\s*ml/i.test(u);
          if (w.includes('450')) return /450/i.test(u);
          if (w.includes('250')) return /250/i.test(u);
          if (w.includes('200')) return /200/i.test(u);
          return u.toLowerCase().includes(w.toLowerCase());
        });
        if (!hasWeight) return false;
      }

      // Packaging filter
      if (selectedPackaging.length > 0) {
        const combined = `${p.name} ${p.unit || ''} ${p.tags?.join(' ') || ''}`.toLowerCase();
        const hasPkg = selectedPackaging.some((pkg) => combined.includes(pkg.toLowerCase()));
        if (!hasPkg) return false;
      }

      // Pack of filter
      if (selectedPackOf.length > 0) {
        const u = (p.unit || '').toLowerCase();
        const hasPack = selectedPackOf.some((pk) => {
          if (pk === '1') return !u.includes('pack of') || u.includes('1 pack') || u.includes('1 pc');
          return u.includes(`pack of ${pk}`) || u.includes(`(${pk} pcs)`) || u.includes(`${pk} x `);
        });
        if (!hasPack) return false;
      }

      // In stock
      if (inStockOnly && !p.inStock) return false;

      return true;
    });
  }, [
    products,
    selectedSubcategories,
    selectedBrands,
    priceRange,
    selectedHealthyPicks,
    selectedWeights,
    selectedPackaging,
    selectedPackOf,
    inStockOnly,
  ]);

  // Sort Pipeline
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price_low':
        return list.sort((a, b) => a.price - b.price);
      case 'price_high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return list.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
      default:
        // Featured
        return list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Total Active Filters Count
  const totalActiveFilters = 
    selectedSubcategories.length +
    selectedBrands.length +
    selectedHealthyPicks.length +
    selectedWeights.length +
    selectedPackaging.length +
    selectedPackOf.length +
    (inStockOnly ? 1 : 0) +
    (priceRange[1] < maxProductPrice || priceRange[0] > minProductPrice ? 1 : 0);

  // Clear All Filters
  const handleClearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setPriceRange([minProductPrice, maxProductPrice]);
    setSelectedHealthyPicks([]);
    setSelectedWeights([]);
    setSelectedPackaging([]);
    setSelectedPackOf([]);
    setInStockOnly(false);
  };

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleArrayFilter = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (arr.includes(item)) {
      setArr(arr.filter((i) => i !== item));
    } else {
      setArr([...arr, item]);
    }
  };

  // Color Accents based on platform
  const brandAccentBg = isLite ? 'bg-[#0C831F]' : 'bg-[#2962FF]';
  const brandAccentBorder = isLite ? 'border-[#0C831F]' : 'border-[#2962FF]';
  const brandAccentText = isLite ? 'text-[#0C831F]' : 'text-[#2962FF]';
  const brandPillActive = isLite
    ? 'bg-emerald-50 text-emerald-800 border-emerald-400 font-bold'
    : 'bg-blue-50 text-blue-800 border-blue-400 font-bold';

  // Tactile ADD button style from screenshot (pink/magenta for Zepto style or matching brand)
  const addBtnClass = 'border-2 border-[#E11D48] text-[#E11D48] hover:bg-[#FFF1F2] active:scale-95';
  const stepperClass = 'bg-[#E11D48] text-white';

  return (
    <div className="w-full max-w-[1536px] mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 font-sans">
      {/* ============================================================== */}
      {/* TOP HEADER / SEARCH META BAR                                  */}
      {/* ============================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 mb-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${isLite ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              <Sparkles className="w-3 h-3" />
              <span>{isLite ? 'HAATZA LITE EXPRESS' : 'HAATZA SHOPPING'}</span>
            </span>
            {isLite && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>6-10 Mins Delivery</span>
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {query ? `Search results for "${query}"` : 'All Available Catalog Items'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Found <strong className="text-slate-800">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? 'product' : 'products'} {query ? `for "${query}"` : 'ready for dispatch'}
          </p>
        </div>

        {/* Right action / Sort bar & Mobile Filter Button */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Mobile Filter Drawer Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {totalActiveFilters > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E11D48] text-white text-[10px] flex items-center justify-center font-bold">
                {totalActiveFilters}
              </span>
            )}
          </button>

          {/* Sort By Dropdown (Fully working in responsive & desktop mode) */}
          <div ref={sortRef} className="relative">
            <button
              type="button"
              id="sort-dropdown-button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs hover:border-slate-300 hover:bg-slate-50 focus:outline-none cursor-pointer transition-all active:scale-95"
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate max-w-[130px] sm:max-w-none">
                {sortOptions.find((o) => o.value === sortBy)?.label || 'Featured / Relevance'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Popup */}
            {isSortOpen && (
              <>
                {/* Mobile Backdrop */}
                <div
                  className="fixed inset-0 z-[150] sm:hidden"
                  onClick={() => setIsSortOpen(false)}
                />

                <div className="absolute right-0 top-full mt-1.5 w-52 sm:w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-1.5 z-[160] animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 sm:hidden">
                    Sort Products
                  </div>
                  {sortOptions.map((opt) => {
                    const isSelected = sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.value as any);
                          setIsSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left cursor-pointer transition-colors ${
                          isSelected
                            ? isLite
                              ? 'bg-emerald-50 text-emerald-700 font-extrabold'
                              : 'bg-blue-50 text-blue-700 font-extrabold'
                            : 'text-slate-700 hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className={`w-3.5 h-3.5 ${isLite ? 'text-emerald-600' : 'text-blue-600'}`} />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TOP CATEGORY PILLS STRIP: Only Category Name shown, marked regarding to product */}
      {/* ============================================================== */}
      {categoryOptions.length > 0 && (
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-3.5 select-none scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all'
                ? isLite
                  ? 'bg-[#0C831F] text-white shadow-xs'
                  : 'bg-[#2962FF] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>All Categories ({products.length})</span>
          </button>
          {categoryOptions.map(({ name, count }) => {
            const isMarked = selectedCategory === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setSelectedCategory(name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isMarked
                    ? isLite
                      ? 'bg-[#0C831F] text-white shadow-xs'
                      : 'bg-[#2962FF] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isMarked ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500 font-normal'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN TWO-COLUMN BODY LAYOUT                                   */}
      {/* Left: Zepto-Style Filter Sidebar                              */}
      {/* Right: Zepto Multi-Column High-Density Product Grid           */}
      {/* ============================================================== */}
      <div className="flex items-start gap-4 lg:gap-6">
        
        {/* ============================================================ */}
        {/* DESKTOP FILTER SIDEBAR                                       */}
        {/* ============================================================ */}
        <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0 sticky top-[135px] max-h-[calc(100vh-150px)] overflow-y-auto pr-1 select-none custom-scrollbar pb-10">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
            
            {/* Top Filter Chips & Clear All Button */}
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Quick Filters</span>
                {totalActiveFilters > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="text-xs font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer hover:underline flex items-center gap-0.5"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {/* Quick Brand Pills (e.g. Amul, Akshayakalpa, Nandini, Heritage, etc.) */}
              <div className="flex flex-wrap gap-1.5">
                {quickBrandPills.map((brandName) => {
                  const isSelected = selectedBrands.includes(brandName);
                  return (
                    <button
                      key={brandName}
                      type="button"
                      onClick={() => toggleArrayFilter(selectedBrands, setSelectedBrands, brandName)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#E11D48] text-white border-[#E11D48] font-bold shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-semibold'
                      }`}
                    >
                      <span>{brandName}</span>
                      {isSelected && <X className="w-2.5 h-2.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion: SUBCATEGORIES (Respective of the products!) */}
            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection('subcategories')}
                className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 cursor-pointer hover:text-emerald-700"
              >
                <span>Subcategories ({subcategoryOptions.length})</span>
                {openSections.subcategories ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {openSections.subcategories && (
                <div className="mt-2.5 space-y-1.5">
                  {(showAllSubcategories ? subcategoryOptions : subcategoryOptions.slice(0, 6)).map(({ name, count }) => {
                    const isChecked = selectedSubcategories.includes(name);
                    return (
                      <label
                        key={name}
                        className="flex items-center justify-between gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-0.5 group"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleArrayFilter(selectedSubcategories, setSelectedSubcategories, name)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#E11D48] focus:ring-[#E11D48] cursor-pointer"
                          />
                          <span className={`text-[12px] group-hover:text-slate-900 ${isChecked ? 'font-bold text-slate-900' : 'font-normal'}`}>
                            {name}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded-full">
                          {count}
                        </span>
                      </label>
                    );
                  })}

                  {subcategoryOptions.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllSubcategories(!showAllSubcategories)}
                      className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                    >
                      {showAllSubcategories ? '- Show less' : `+ Show more (${subcategoryOptions.length - 6})`}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Accordion: BRAND */}
            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => toggleSection('brand')}
                className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 cursor-pointer"
              >
                <span>Brand ({brandOptions.length})</span>
                {openSections.brand ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {openSections.brand && (
                <div className="mt-2.5 space-y-1.5">
                  {(showAllBrands ? brandOptions : brandOptions.slice(0, 6)).map(({ name, count }) => {
                    const isChecked = selectedBrands.includes(name);
                    return (
                      <label
                        key={name}
                        className="flex items-center justify-between gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-0.5 group"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleArrayFilter(selectedBrands, setSelectedBrands, name)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#E11D48] focus:ring-[#E11D48] cursor-pointer"
                          />
                          <span className={`text-[12px] group-hover:text-slate-900 ${isChecked ? 'font-bold text-slate-900' : 'font-normal'}`}>
                            {name}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full">
                          {count}
                        </span>
                      </label>
                    );
                  })}

                  {brandOptions.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllBrands(!showAllBrands)}
                      className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                    >
                      {showAllBrands ? '- Show less' : `+ Show more (${brandOptions.length - 6})`}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Accordion: HEALTHY PICKS */}
            {healthyPicksOptions.length > 0 && (
              <div className="border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection('healthyPicks')}
                  className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 cursor-pointer"
                >
                  <span>Healthy Picks</span>
                  {openSections.healthyPicks ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                {openSections.healthyPicks && (
                  <div className="mt-2.5 space-y-1.5">
                    {(showAllHealthyPicks ? healthyPicksOptions : healthyPicksOptions.slice(0, 6)).map(({ name, count }) => {
                      const isChecked = selectedHealthyPicks.includes(name);
                      return (
                        <label
                          key={name}
                          className="flex items-center justify-between gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-0.5 group"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleArrayFilter(selectedHealthyPicks, setSelectedHealthyPicks, name)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-[#E11D48] focus:ring-[#E11D48] cursor-pointer"
                            />
                            <span className={`text-[12px] group-hover:text-slate-900 ${isChecked ? 'font-bold text-slate-900' : 'font-normal'}`}>
                              {name}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        </label>
                      );
                    })}

                    {healthyPicksOptions.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setShowAllHealthyPicks(!showAllHealthyPicks)}
                        className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                      >
                        {showAllHealthyPicks ? '- Show less' : `+ Show more (${healthyPicksOptions.length - 6})`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Accordion: WEIGHT */}
            {weightOptions.length > 0 && (
              <div className="border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection('weight')}
                  className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 cursor-pointer"
                >
                  <span>Weight / Size</span>
                  {openSections.weight ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                {openSections.weight && (
                  <div className="mt-2.5 space-y-1.5">
                    {(showAllWeights ? weightOptions : weightOptions.slice(0, 6)).map(({ name, count }) => {
                      const isChecked = selectedWeights.includes(name);
                      return (
                        <label
                          key={name}
                          className="flex items-center justify-between gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-0.5 group"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleArrayFilter(selectedWeights, setSelectedWeights, name)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-[#E11D48] focus:ring-[#E11D48] cursor-pointer"
                            />
                            <span className={`text-[12px] group-hover:text-slate-900 ${isChecked ? 'font-bold text-slate-900' : 'font-normal'}`}>
                              {name}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        </label>
                      );
                    })}

                    {weightOptions.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setShowAllWeights(!showAllWeights)}
                        className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                      >
                        {showAllWeights ? '- Show less' : `+ Show more (${weightOptions.length - 6})`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Accordion: PACKAGING */}
            {packagingOptions.length > 0 && (
              <div className="border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleSection('packaging')}
                  className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 cursor-pointer"
                >
                  <span>Packaging</span>
                  {openSections.packaging ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                {openSections.packaging && (
                  <div className="mt-2.5 space-y-1.5">
                    {(showAllPackaging ? packagingOptions : packagingOptions.slice(0, 6)).map(({ name, count }) => {
                      const isChecked = selectedPackaging.includes(name);
                      return (
                        <label
                          key={name}
                          className="flex items-center justify-between gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-0.5 group"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleArrayFilter(selectedPackaging, setSelectedPackaging, name)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-[#E11D48] focus:ring-[#E11D48] cursor-pointer"
                            />
                            <span className={`text-[12px] group-hover:text-slate-900 ${isChecked ? 'font-bold text-slate-900' : 'font-normal'}`}>
                              {name}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        </label>
                      );
                    })}

                    {packagingOptions.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setShowAllPackaging(!showAllPackaging)}
                        className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                      >
                        {showAllPackaging ? '- Show less' : `+ Show more (${packagingOptions.length - 6})`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Accordion: PACK OF */}
            {packOfOptions.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('packOf')}
                  className="w-full flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-900 py-1 cursor-pointer"
                >
                  <span>Pack Of</span>
                  {openSections.packOf ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                {openSections.packOf && (
                  <div className="mt-2.5 space-y-1.5">
                    {(showAllPackOf ? packOfOptions : packOfOptions.slice(0, 6)).map(({ name, count }) => {
                      const isChecked = selectedPackOf.includes(name);
                      return (
                        <label
                          key={name}
                          className="flex items-center justify-between gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-0.5 group"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleArrayFilter(selectedPackOf, setSelectedPackOf, name)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-[#E11D48] focus:ring-[#E11D48] cursor-pointer"
                            />
                            <span className={`text-[12px] group-hover:text-slate-900 ${isChecked ? 'font-bold text-slate-900' : 'font-normal'}`}>
                              {name}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        </label>
                      );
                    })}

                    {packOfOptions.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setShowAllPackOf(!showAllPackOf)}
                        className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                      >
                        {showAllPackOf ? '- Show less' : `+ Show more (${packOfOptions.length - 6})`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </aside>

        {/* ============================================================ */}
        {/* RIGHT PRODUCT GRID AREA                                      */}
        {/* ============================================================ */}
        <main className="flex-1 min-w-0">
          
          {/* Active Filter Badges Row */}
          {totalActiveFilters > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-4 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
              <span className="text-xs font-bold text-slate-500">Active filters:</span>
              
              {selectedSubcategories.map((sub) => (
                <span
                  key={sub}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <span>{sub}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter(selectedSubcategories, setSelectedSubcategories, sub)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <span>{b}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter(selectedBrands, setSelectedBrands, b)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedHealthyPicks.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <span>{p}</span>
                  <button
                    type="button"
                    onClick={() => toggleArrayFilter(selectedHealthyPicks, setSelectedHealthyPicks, p)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-xs font-bold text-[#E11D48] hover:underline cursor-pointer ml-auto"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-3 animate-pulse space-y-3">
                  <div className="aspect-square bg-slate-100 rounded-xl" />
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-7 bg-slate-100 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                No matching items found
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
                We couldn't find any products matching your active filters. Try removing some filters or search for everyday staples.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
                {onSearchChange && (
                  <button
                    type="button"
                    onClick={() => onSearchChange(isLite ? 'milk' : 'shirt')}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Search "{isLite ? 'milk' : 'shirt'}"
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Multi-column High Density Product Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-3.5">
              {sortedProducts.map((product) => {
                const qty = getCartQuantity(product.id);
                const discountAmt = product.mrp > product.price ? product.mrp - product.price : 0;

                return (
                  <div
                    key={product.id}
                    onClick={() => onProductClick(product)}
                    className="group bg-white rounded-2xl border border-slate-200/80 p-2 sm:p-3 hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-200 flex flex-col justify-between select-none cursor-pointer relative"
                  >
                    {/* Top Image Stage */}
                    <div className="relative aspect-square w-full rounded-xl bg-[#F8FAFC] overflow-hidden mb-2 flex items-center justify-center border border-slate-100">
                      
                      {/* Top Discount Badge (Green Tag from screenshot) */}
                      {discountAmt > 0 && (
                        <div className="absolute top-1.5 left-1.5 z-10 bg-[#0C831F] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs tracking-tight">
                          ₹{discountAmt} OFF
                        </div>
                      )}

                      {/* Product Image */}
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full max-h-full max-w-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-300 ease-out"
                        onError={(e) => {
                          // Fallback image if broken
                          (e.target as HTMLImageElement).src = '/images/products/3d_milk_bottle.png';
                        }}
                      />

                      {/* Tactile "+ ADD" or Stepper Button on bottom right of image */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-1.5 right-1.5 z-10"
                      >
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onAddToCart(product, 1);
                            }}
                            className={`px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-white shadow-sm flex items-center gap-1 cursor-pointer transition-all duration-150 ${addBtnClass}`}
                            aria-label={`Add ${product.name} to cart`}
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div className={`inline-flex items-center rounded-lg shadow-sm overflow-hidden text-xs font-black ${stepperClass}`}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onUpdateQuantity(product.id, qty - 1);
                              }}
                              className="px-2 py-1 hover:bg-black/15 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 stroke-[3]" />
                            </button>
                            <span className="px-1.5 text-xs font-black min-w-4 text-center select-none text-white">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onUpdateQuantity(product.id, qty + 1);
                              }}
                              className="px-2 py-1 hover:bg-black/15 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Pricing Row: Current Price, MRP Strikethrough, Green Discount Badge */}
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                            {formatCurrency(product.price)}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-[10px] sm:text-[11px] text-slate-400 line-through font-medium">
                              {formatCurrency(product.mrp)}
                            </span>
                          )}
                          {product.discountPercentage && product.discountPercentage > 0 && (
                            <span className="text-[9px] font-bold text-[#0C831F] bg-[#EAF8ED] px-1 py-0.2 rounded">
                              {product.discountPercentage}% OFF
                            </span>
                          )}
                        </div>

                        {/* Title: 2 lines */}
                        <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#E11D48] transition-colors mb-1">
                          {product.name}
                        </h3>

                        {/* Unit / Weight */}
                        <div className="text-[11px] text-slate-500 font-medium mb-1.5 truncate">
                          {product.unit || '1 unit'}
                        </div>
                      </div>

                      {/* Rating & Fast Delivery badges */}
                      <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-100 mt-auto text-[10px]">
                        <div className="flex items-center gap-1 text-slate-600 font-bold">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>{(product.rating || 4.6).toFixed(1)}</span>
                          <span className="text-slate-400 font-normal">
                            ({product.reviewCount > 1000 ? `${(product.reviewCount / 1000).toFixed(1)}k` : product.reviewCount || 100})
                          </span>
                        </div>

                        {isLite && (
                          <div className="flex items-center gap-0.5 text-emerald-700 font-black">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{product.instantDeliveryMinutes || 6}m</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* MOBILE FILTER SLIDE-OVER DRAWER                                */}
      {/* ============================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-800" />
                <h3 className="text-sm font-black text-slate-900">Filters & Refinements</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Quick Clear */}
              {totalActiveFilters > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500">{totalActiveFilters} filters selected</span>
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="text-xs font-bold text-[#E11D48]"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Sort By Section in Mobile Drawer */}
              <div className="pb-3 border-b border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sort By</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {sortOptions.map((opt) => {
                    const isSelected = sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSortBy(opt.value as any)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left cursor-pointer transition-all ${
                          isSelected
                            ? isLite
                              ? 'bg-emerald-600 text-white font-bold shadow-xs'
                              : 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80 font-medium'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Subcategories</h4>
                <div className="space-y-1.5">
                  {(showAllSubcategories ? subcategoryOptions : subcategoryOptions.slice(0, 6)).map(({ name, count }) => (
                    <label key={name} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(name)}
                          onChange={() => toggleArrayFilter(selectedSubcategories, setSelectedSubcategories, name)}
                          className="w-4 h-4 rounded text-[#E11D48] focus:ring-[#E11D48]"
                        />
                        <span>{name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{count}</span>
                    </label>
                  ))}
                  {subcategoryOptions.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllSubcategories(!showAllSubcategories)}
                      className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                    >
                      {showAllSubcategories ? '- Show less' : `+ Show more (${subcategoryOptions.length - 6})`}
                    </button>
                  )}
                </div>
              </div>

              {/* Brands */}
              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Brand</h4>
                <div className="space-y-1.5">
                  {(showAllBrands ? brandOptions : brandOptions.slice(0, 6)).map(({ name, count }) => (
                    <label key={name} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(name)}
                          onChange={() => toggleArrayFilter(selectedBrands, setSelectedBrands, name)}
                          className="w-4 h-4 rounded text-[#E11D48] focus:ring-[#E11D48]"
                        />
                        <span>{name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{count}</span>
                    </label>
                  ))}
                  {brandOptions.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllBrands(!showAllBrands)}
                      className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                    >
                      {showAllBrands ? '- Show less' : `+ Show more (${brandOptions.length - 6})`}
                    </button>
                  )}
                </div>
              </div>


              {/* Healthy Picks */}
              {healthyPicksOptions.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Healthy Picks</h4>
                  <div className="space-y-1.5">
                    {(showAllHealthyPicks ? healthyPicksOptions : healthyPicksOptions.slice(0, 6)).map(({ name, count }) => (
                      <label key={name} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedHealthyPicks.includes(name)}
                            onChange={() => toggleArrayFilter(selectedHealthyPicks, setSelectedHealthyPicks, name)}
                            className="w-4 h-4 rounded text-[#E11D48] focus:ring-[#E11D48]"
                          />
                          <span>{name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">{count}</span>
                      </label>
                    ))}
                    {healthyPicksOptions.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setShowAllHealthyPicks(!showAllHealthyPicks)}
                        className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                      >
                        {showAllHealthyPicks ? '- Show less' : `+ Show more (${healthyPicksOptions.length - 6})`}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Weights */}
              {weightOptions.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Weight / Size</h4>
                  <div className="space-y-1.5">
                    {(showAllWeights ? weightOptions : weightOptions.slice(0, 6)).map(({ name, count }) => (
                      <label key={name} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedWeights.includes(name)}
                            onChange={() => toggleArrayFilter(selectedWeights, setSelectedWeights, name)}
                            className="w-4 h-4 rounded text-[#E11D48] focus:ring-[#E11D48]"
                          />
                          <span>{name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">{count}</span>
                      </label>
                    ))}
                    {weightOptions.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setShowAllWeights(!showAllWeights)}
                        className="text-[11px] font-bold text-[#E11D48] hover:text-[#BE123C] cursor-pointer pt-1 hover:underline block"
                      >
                        {showAllWeights ? '- Show less' : `+ Show more (${weightOptions.length - 6})`}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-2 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                Apply ({sortedProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
