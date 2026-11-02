import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import {
  MajorSection,
  SubcategoryItem,
  WOMENS_SECTION_SUBCATEGORIES_MAP,
} from '../data/womensFashionNavigation.data';
import { Sparkles, Grid, SlidersHorizontal, X } from 'lucide-react';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';
import { Product, FilterState } from '../../../types';
import { productService } from '../../../services/productService';
import { ProductGrid } from '../../../components/products/ProductGrid';
import { FilterSidebar } from '../../../components/products/FilterSidebar';
import { FilterDrawer } from '../../../components/products/FilterDrawer';
import { SortControl } from '../../../components/products/SortControl';
import { LoadingSkeleton } from '../../../components/common/LoadingSkeleton';
import {
  QuickViewModal,
  SuggestedForYouWidget,
  TrendingCollectionsWidget,
  LikedByYouWidget,
  RecentlyViewedWidget,
} from '../../../shared/widgets';

interface WomensFashionSectionViewProps {
  section: MajorSection;
  initialSubcategorySlug?: string;
}

export const WomensFashionSectionView: React.FC<WomensFashionSectionViewProps> = ({
  section,
  initialSubcategorySlug,
}) => {
  const subcategories: SubcategoryItem[] = useMemo(() => {
    return WOMENS_SECTION_SUBCATEGORIES_MAP[section.slug] || [];
  }, [section.slug]);

  const navigate = useNavigate();

  // Selected subcategory state
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoryItem | null>(() => {
    if (initialSubcategorySlug) {
      const match = subcategories.find(
        (s) =>
          s.slug === initialSubcategorySlug ||
          s.id === initialSubcategorySlug ||
          s.aliases?.includes(initialSubcategorySlug)
      );
      if (match) return match;
    }
    return null;
  });

  // Sync state if section or initialSubcategorySlug changes
  useEffect(() => {
    if (initialSubcategorySlug) {
      const match = subcategories.find(
        (s) =>
          s.slug === initialSubcategorySlug ||
          s.id === initialSubcategorySlug ||
          s.aliases?.includes(initialSubcategorySlug)
      );
      if (match) {
        setSelectedSubcategory(match);
        return;
      }
    }
    setSelectedSubcategory(null);
  }, [section.slug, initialSubcategorySlug, subcategories]);

  // Catalog Products & Filter State
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    brands: [],
    discountRanges: [],
    inStockOnly: false,
    sortBy: 'featured',
  });

  const productSectionRef = useRef<HTMLDivElement>(null);

  // Fetch products whenever selected subcategory or section changes
  useEffect(() => {
    let isCancelled = false;

    async function fetchProducts() {
      setLoading(true);
      try {
        const filterTerm =
          selectedSubcategory?.productFilterTerm ||
          selectedSubcategory?.slug ||
          section.slug;

        let list = await productService.getProducts(
          {
            category: filterTerm,
            gender: 'women',
          },
          'haatza',
          'women'
        );

        // Fallback matching if direct category query yielded empty
        if (list.length === 0 && selectedSubcategory) {
          const normSlug = selectedSubcategory.slug.toLowerCase();
          const normName = (selectedSubcategory.shortTitle || selectedSubcategory.name).toLowerCase();
          const secList = await productService.getProducts(
            { category: section.slug, gender: 'women' },
            'haatza',
            'women'
          );

          const matched = secList.filter((p) => {
            const pTags = p.tags?.map((t) => t.toLowerCase()) || [];
            const pName = p.name.toLowerCase();
            const pSub = (p.subcategoryName || p.subcategoryId || '').toLowerCase();
            return (
              pTags.some((t) => t.includes(normSlug) || normSlug.includes(t)) ||
              pName.includes(normName) ||
              pSub.includes(normSlug)
            );
          });

          if (matched.length > 0) {
            list = matched;
          } else if (secList.length > 0) {
            list = secList;
          }
        }

        if (!isCancelled) {
          setRawProducts(list);
          const brands = Array.from(new Set(list.map((p) => p.brand).filter(Boolean)));
          setAvailableBrands(brands);
        }
      } catch (err) {
        console.error('Failed to load products for women section:', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [section.slug, selectedSubcategory]);

  // Apply client-side filters and sorting to raw products
  const filteredProducts = useMemo(() => {
    let list = [...rawProducts];

    // Filter by Brand
    if (filterState.brands && filterState.brands.length > 0) {
      list = list.filter((p) => filterState.brands.includes(p.brand));
    }

    // Filter by Discount
    if (filterState.discountRanges && filterState.discountRanges.length > 0) {
      const minDisc = Math.min(...filterState.discountRanges);
      list = list.filter((p) => p.discountPercentage >= minDisc);
    }

    // Filter by In-Stock
    if (filterState.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Filter by Rating
    if (filterState.minRating !== undefined && filterState.minRating > 0) {
      list = list.filter((p) => p.rating >= (filterState.minRating || 0));
    }

    // Filter by Sizes
    if (filterState.sizes && filterState.sizes.length > 0) {
      list = list.filter((p) =>
        p.variants?.some((v) =>
          filterState.sizes?.some((s) => v.value.toLowerCase().includes(s.toLowerCase()))
        )
      );
    }

    // Sorting
    switch (filterState.sortBy) {
      case 'price_low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        list.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return list;
  }, [rawProducts, filterState]);

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilterState((prev) => ({
      ...prev,
      brands: [],
      discountRanges: [],
      inStockOnly: false,
      minRating: undefined,
      sizes: [],
    }));
  }, []);

  // Category selection handler with route navigation and smooth scroll
  const handleCategorySelect = (sub: SubcategoryItem | null) => {
    setSelectedSubcategory(sub);
    handleResetFilters();

    if (sub) {
      navigate(`/category/women-fashion/${section.slug}/${sub.slug}`);
    } else {
      navigate(`/category/women-fashion/${section.slug}`);
    }

    setTimeout(() => {
      if (productSectionRef.current) {
        const headerOffset = 95;
        const elementPosition = productSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 40);
  };

  // Active filter chips
  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    filterState.brands.forEach((brand) => {
      chips.push({
        label: brand,
        onRemove: () =>
          setFilterState((prev) => ({
            ...prev,
            brands: prev.brands.filter((b) => b !== brand),
          })),
      });
    });
    filterState.discountRanges.forEach((disc) => {
      chips.push({
        label: `${disc}% & Above`,
        onRemove: () =>
          setFilterState((prev) => ({
            ...prev,
            discountRanges: prev.discountRanges.filter((d) => d !== disc),
          })),
      });
    });
    if (filterState.inStockOnly) {
      chips.push({
        label: 'In Stock Only',
        onRemove: () => setFilterState((prev) => ({ ...prev, inStockOnly: false })),
      });
    }
    if (filterState.minRating) {
      chips.push({
        label: `${filterState.minRating}★ & Above`,
        onRemove: () => setFilterState((prev) => ({ ...prev, minRating: undefined })),
      });
    }
    return chips;
  }, [filterState]);

  const breadcrumbItems = useMemo(() => {
    const items: { label: string; link?: string }[] = [
      { label: "Women's Fashion", link: '/category/women-fashion' },
      {
        label: section.title,
        link: selectedSubcategory ? `/category/women-fashion/${section.slug}` : undefined,
      },
    ];
    if (selectedSubcategory) {
      items.push({
        label: selectedSubcategory.shortTitle || selectedSubcategory.name,
      });
    }
    return items;
  }, [section.title, section.slug, selectedSubcategory]);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 01. Breadcrumb Hierarchy */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 02. Department Heading and Compact 8-Col Category Grid (NO outer background box) */}
      <div className="space-y-4 sm:space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 sm:pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#DB2777] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 font-heading">
              <Sparkles className="w-3 h-3 text-[#DB2777] fill-[#DB2777]" />
              <span>{subcategories.length} Curated Categories</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight uppercase font-heading">
              {section.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-body">
              Explore {section.shortTitle.toLowerCase()} · choose a category to browse verified styles
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-zinc-500 shrink-0">
            <Grid className="w-4 h-4 text-zinc-400" />
            <span>Select to filter</span>
          </div>
        </div>

        {/* Level 2 Subcategory Grid: Clean navbar-inspired items on mobile, 8 cards per row on large desktop */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible no-scrollbar pb-1 sm:pb-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-2.5 lg:gap-3">
          {/* 'All Section' option */}
          <button
            type="button"
            onClick={() => handleCategorySelect(null)}
            className={`group relative flex flex-col items-center transition-all duration-200 text-center select-none cursor-pointer shrink-0 min-w-[68px] sm:min-w-0 sm:flex-1 ${
              selectedSubcategory === null
                ? 'text-[#DB2777] sm:bg-[#FDF2F8] sm:border-[#DB2777] sm:ring-2 sm:ring-[#DB2777]/20 sm:shadow-xs'
                : 'text-[#172033] hover:text-[#DB2777] sm:bg-[#F8FAFC] sm:hover:bg-white sm:border-slate-200/80 sm:hover:border-[#DB2777]/50 sm:shadow-2xs hover:shadow-xs'
            } p-1 sm:p-2.5 sm:rounded-xl sm:border`}
            title={`View all ${section.title} styles`}
          >
            <div className="w-14 h-14 sm:w-full sm:aspect-square flex items-center justify-center overflow-hidden sm:rounded-lg sm:bg-pink-50 mb-1 sm:mb-2 sm:shadow-2xs relative text-[#DB2777]">
              <Grid className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
            </div>
            <span
              className={`text-[11px] sm:text-xs font-bold transition-colors line-clamp-1 font-heading leading-tight ${
                selectedSubcategory === null ? 'text-[#DB2777]' : 'text-[#172033] group-hover:text-[#DB2777]'
              }`}
            >
              All {section.shortTitle}
            </span>
            <span className="text-[10px] text-slate-400 font-sans mt-0.5 leading-none">
              All Styles
            </span>
            {selectedSubcategory === null && (
              <span className="sm:hidden w-6 h-0.5 bg-[#DB2777] rounded-full mt-1" />
            )}
          </button>

          {subcategories.map((sub) => {
            const optimized = optimizeImageUrl(sub.image, { width: 300, quality: 80 });
            const isSelected = selectedSubcategory?.id === sub.id;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleCategorySelect(sub)}
                className={`group relative flex flex-col items-center transition-all duration-200 text-center select-none cursor-pointer shrink-0 min-w-[68px] sm:min-w-0 sm:flex-1 ${
                  isSelected
                    ? 'text-[#DB2777] sm:bg-[#FDF2F8] sm:border-[#DB2777] sm:ring-2 sm:ring-[#DB2777]/20 sm:shadow-xs'
                    : 'text-[#172033] hover:text-[#DB2777] sm:bg-[#F8FAFC] sm:hover:bg-white sm:border-slate-200/80 sm:hover:border-[#DB2777]/50 sm:shadow-2xs hover:shadow-xs'
                } p-1 sm:p-2.5 sm:rounded-xl sm:border`}
                title={`View ${sub.name} styles`}
              >
                <div className="w-14 h-14 sm:w-full sm:aspect-square flex items-center justify-center overflow-hidden sm:rounded-lg sm:bg-white mb-1 sm:mb-2 sm:shadow-2xs relative">
                  <img
                    src={optimized}
                    alt={sub.name}
                    loading="lazy"
                    className="w-full h-full object-contain sm:object-cover object-center transform transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  {sub.badge && (
                    <span className="hidden sm:inline-block absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-white/95 text-zinc-900 shadow-2xs backdrop-blur-xs">
                      {sub.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-bold transition-colors line-clamp-1 font-heading leading-tight ${
                    isSelected ? 'text-[#DB2777]' : 'text-[#172033] group-hover:text-[#DB2777]'
                  }`}
                >
                  {sub.shortTitle || sub.name}
                </span>
                {sub.itemCount && (
                  <span className="text-[10px] text-slate-400 font-sans mt-0.5 leading-none">
                    {sub.itemCount}
                  </span>
                )}
                {isSelected && (
                  <span className="sm:hidden w-6 h-0.5 bg-[#DB2777] rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 03. Selected Category Product Section Below All Category Cards */}
      <section
        ref={productSectionRef}
        id="department-catalog"
        className="scroll-mt-24 space-y-6"
        aria-label={`${selectedSubcategory?.name || section.title} Products`}
      >
        {/* Catalog Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-50 text-[#DB2777] text-[10px] font-bold uppercase tracking-wider font-heading">
                {section.title}
              </span>
              {selectedSubcategory?.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider font-heading">
                  {selectedSubcategory.badge}
                </span>
              )}
            </div>
            <h2 className="text-[22px] font-extrabold text-[#1F1F1F] tracking-tight font-heading leading-tight">
              {selectedSubcategory?.name || section.title} Collection
            </h2>
            <p className="text-sm text-[#555555] mt-1 font-body">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'style' : 'styles'}
              {selectedSubcategory?.description ? ` • ${selectedSubcategory.description}` : ''}
            </p>
          </div>

          {/* Controls: Filter Drawer Trigger (Mobile) + Sort Dropdown */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#2962FF]" />
              <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
            </button>

            <SortControl
              sortBy={filterState.sortBy}
              onChange={(sort) => setFilterState((prev) => ({ ...prev, sortBy: sort }))}
            />
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex items-center gap-2 py-1 flex-wrap">
            <span className="text-xs font-semibold text-zinc-400">Active Filters:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5F7FF] text-[#2962FF] border border-[#E5E7EB] text-xs font-semibold"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.onRemove}
                  className="hover:text-black p-0.5"
                  aria-label={`Remove ${chip.label}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-zinc-500 hover:text-[#2962FF] underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Content Layout: Desktop Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 pt-2">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              filter={filterState}
              onChange={setFilterState}
              onReset={handleResetFilters}
              availableBrands={availableBrands}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSkeleton type="grid" count={8} />
            ) : (
              <ProductGrid
                products={filteredProducts}
                columns="auto"
                initialBatchSize={16}
                emptyTitle={`No ${selectedSubcategory?.name || 'Styles'} Found`}
                emptyDescription={`We currently don't have items matching this filter in ${selectedSubcategory?.name || section.title}. Try clearing filters or exploring other categories above.`}
              />
            )}
          </div>
        </div>
      </section>

      {/* Trending Collections */}
      <TrendingCollectionsWidget categoryContext="women-fashion" />

      {/* Liked by You */}
      <LikedByYouWidget categoryContext="women-fashion" />

      {/* Suggested For You (Classic Lift & Glow Transition) */}
      <SuggestedForYouWidget categoryContext="women-fashion" />

      {/* Recently Viewed by You */}
      <RecentlyViewedWidget
        categoryContext="women-fashion"
        title={`Recently Viewed in ${section.title}`}
      />

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filter={filterState}
        onChange={setFilterState}
        onReset={handleResetFilters}
        availableBrands={availableBrands}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default WomensFashionSectionView;
