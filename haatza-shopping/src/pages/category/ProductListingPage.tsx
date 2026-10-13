import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { DestinationType, FilterState, Product, Category } from '../../types';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { ProductGrid } from '../../components/products/ProductGrid';
import { FilterSidebar } from '../../components/products/FilterSidebar';
import { FilterDrawer } from '../../components/products/FilterDrawer';
import { SortControl } from '../../components/products/SortControl';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { BenefitsSection } from '../../components/home/BenefitsSection';
import { NewsletterSection } from '../../components/home/NewsletterSection';
import { ProductCarouselTrack } from '../../components/home/ProductCarouselTrack';
import { ProductCard } from '../../components/products/ProductCard';
import { CountdownClock } from '../../components/home/CountdownClock';
import { QuickViewModal } from '../../components/products/QuickViewModal';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import { SlidersHorizontal, X, Sparkles, Flame, ArrowRight, TrendingUp } from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();
  const destQuery = searchParams.get('dest') as DestinationType | null;
  const filterQuery = searchParams.get('filter'); // e.g. 'trending', 'deals', 'bestsellers'

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  // Filter & Sort State
  const [filters, setFilters] = useState<FilterState>({
    category: slug,
    brands: [],
    discountRanges: [],
    inStockOnly: false,
    sortBy: 'featured',
  });

  // Load category details and brands
  useEffect(() => {
    async function init() {
      setLoading(true);
      setSelectedSubcategory(null);
      if (slug) {
        const cat = await categoryService.getCategoryBySlug(slug);
        setCategory(cat);
      } else {
        setCategory(null);
      }

      const brands = await productService.getAvailableBrands(destQuery || undefined);
      setAvailableBrands(brands);
      setLoading(false);
    }
    init();
  }, [slug, destQuery]);

  // Load filtered products
  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      const queryFilter = { ...filters, category: slug || filters.category };

      let list = await productService.getProducts(queryFilter, destQuery || category?.destination);

      if (selectedSubcategory) {
        const term = selectedSubcategory.toLowerCase();
        list = list.filter((p) => 
          (p.subcategoryId && p.subcategoryId.toLowerCase().includes(term)) ||
          (p.subcategoryName && p.subcategoryName.toLowerCase().includes(term)) ||
          p.tags.some((t) => t.toLowerCase().includes(term))
        );
      }

      if (filterQuery === 'deals') {
        list = list.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 35);
      } else if (filterQuery === 'trending') {
        list = list.filter((p) => p.isTrending);
      } else if (filterQuery === 'bestsellers') {
        list = list.filter((p) => p.isBestseller);
      } else if (filterQuery === 'new_arrivals') {
        list = list.filter((p) => p.isNewArrival);
      }

      setProducts(list);
      setLoading(false);
    }
    fetchFiltered();
  }, [filters, slug, destQuery, category?.destination, filterQuery, selectedSubcategory]);

  const handleResetFilters = () => {
    setFilters({
      category: slug,
      brands: [],
      discountRanges: [],
      inStockOnly: false,
      sortBy: 'featured',
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
    });
  };

  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    filters.brands.forEach((b) => {
      chips.push({
        label: `Brand: ${b}`,
        onRemove: () =>
          setFilters((prev) => ({ ...prev, brands: prev.brands.filter((brand) => brand !== b) })),
      });
    });
    if (filters.minRating) {
      chips.push({
        label: `Rating: ${filters.minRating}★ & above`,
        onRemove: () => setFilters((prev) => ({ ...prev, minRating: undefined })),
      });
    }
    if (filters.inStockOnly) {
      chips.push({
        label: 'In Stock Only',
        onRemove: () => setFilters((prev) => ({ ...prev, inStockOnly: false })),
      });
    }
    filters.discountRanges.forEach((d) => {
      chips.push({
        label: `${d}% Off or more`,
        onRemove: () =>
          setFilters((prev) => ({
            ...prev,
            discountRanges: prev.discountRanges.filter((val) => val !== d),
          })),
      });
    });
    if (filters.minPrice || filters.maxPrice) {
      chips.push({
        label: `Price: ₹${filters.minPrice || 0} - ₹${filters.maxPrice || 'Any'}`,
        onRemove: () => setFilters((prev) => ({ ...prev, minPrice: undefined, maxPrice: undefined })),
      });
    }
    return chips;
  }, [filters]);

  const breadcrumbs = [
    { label: category ? category.destination.toUpperCase() : 'Products', link: '/products' },
    ...(category ? [{ label: category.name }] : []),
  ];

  const getPageTitle = () => {
    if (category) return category.name;
    if (filterQuery === 'deals') return 'Daily Deals & Discounts';
    if (filterQuery === 'trending') return 'Trending Products';
    if (filterQuery === 'bestsellers') return 'Bestselling Products';
    if (filterQuery === 'new_arrivals') return 'New Arrivals';
    if (destQuery) return `${destQuery.toUpperCase()} Products`;
    return 'All Products';
  };

  // Dynamic category promotional hero banner
  const categoryBanner = useMemo(() => {
    switch (slug) {
      case 'fashion':
      case 'men-fashion':
      case 'women-fashion':
        return {
          tag: 'FESTIVE COUTURE EDIT',
          discount: 'FLAT 50% - 70% OFF',
          title: 'Royal Ethnic Kurtas, Banarasi Silks & Designer Fits',
          subtitle: 'Handpicked handcrafted textiles, contemporary silhouettes & luxury wardrobe essentials.',
          bgGradient: 'from-[#0F2042] via-[#1E40AF] to-[#2962FF]',
          badgeColor: 'bg-amber-400 text-stone-950',
          image: optimizeImageUrl('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=75', { width: 1000, quality: 75 }),
          ctaText: 'Explore Fashion Deals',
        };
      case 'electronics':
      case 'mobiles':
        return {
          tag: 'NEXT-GEN TECH FESTIVAL',
          discount: 'UP TO 65% OFF',
          title: 'Flagship 5G Smartphones, ANC Audio & AMOLED Wearables',
          subtitle: 'Snapdragon power, 120Hz displays, studio microphones & ultra-fast accessories.',
          bgGradient: 'from-[#0B1A3A] via-[#1E4ED8] to-[#1D4ED8]',
          badgeColor: 'bg-amber-300 text-stone-950',
          image: optimizeImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=75', { width: 1000, quality: 75 }),
          ctaText: 'Explore Tech Deals',
        };
      case 'beauty':
        return {
          tag: 'CLINICAL GLOW REVOLUTION',
          discount: 'BUY 1 GET 1 AT ₹1',
          title: 'Dermatologist Skincare, Glow Serums & Luxury Fragrances',
          subtitle: 'Pure 15% Vitamin C, Hyaluronic acid drops & all-day revitalizing essentials.',
          bgGradient: 'from-[#1E3A8A] via-[#2962FF] to-[#3B82F6]',
          badgeColor: 'bg-rose-400 text-white',
          image: optimizeImageUrl('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=75', { width: 1000, quality: 75 }),
          ctaText: 'Shop Beauty Drops',
        };
      case 'home-living':
      case 'furniture':
        return {
          tag: 'HOME HARMONY EDIT',
          discount: 'UP TO 60% OFF',
          title: 'Artisanal Decor, Pure Belgian Linen & Smart Living',
          subtitle: 'Transform your space with handcrafted comfort, warm lighting & modern aesthetics.',
          bgGradient: 'from-[#0F2042] via-[#1E40AF] to-[#0284C7]',
          badgeColor: 'bg-emerald-400 text-stone-950',
          image: optimizeImageUrl('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=75', { width: 1000, quality: 75 }),
          ctaText: 'Shop Home Living',
        };
      default:
        return {
          tag: category ? `${category.name.toUpperCase()} SPECIALS` : 'MEGA FESTIVE CARNIVAL',
          discount: 'FLAT 40% - 70% OFF',
          title: category ? `Curated ${category.name} Selections & Daily Offers` : 'Grand Festive Carnival & Exclusive Price Drops',
          subtitle: 'Verified marketplace sellers, express 2-day delivery & authentic brand warranty.',
          bgGradient: 'from-[#0F2042] via-[#1E40AF] to-[#2962FF]',
          badgeColor: 'bg-amber-400 text-stone-950',
          image: optimizeImageUrl('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=75', { width: 1000, quality: 75 }),
          ctaText: 'Shop Best Deals',
        };
    }
  }, [slug, category]);

  // Top category deals with high discount or deal flag
  const categoryDeals = useMemo(() => {
    return products
      .filter((p) => (p.discountPercentage && p.discountPercentage >= 30) || p.isDealOfTheDay || p.rating >= 4.5)
      .slice(0, 10);
  }, [products]);

  // Trending in this category
  const categoryTrending = useMemo(() => {
    return products
      .filter((p) => p.isTrending || p.isBestseller || p.rating >= 4.6)
      .slice(0, 10);
  }, [products]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-16 space-y-6">
      {/* 01. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} className="mb-2" />

      {/* 02. Category Promotional Hero Banner - Exactly matching Lite Header Banner inner padding p-6 sm:p-12 */}
      <section
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${categoryBanner.bgGradient} text-white shadow-xl min-h-[260px] sm:min-h-[320px] flex items-center border border-white/10`}
        aria-label="Category Promotional Banner"
      >
        {/* Background Image overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={categoryBanner.image}
            alt={categoryBanner.title}
            className="w-full h-full object-cover object-center opacity-25 mix-blend-overlay scale-105"
            loading="eager"
            decoding="async"
            width="1000"
            height="360"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-3/4" />
        </div>

        {/* Banner Content with Lite Header Banner padding p-6 sm:p-12 */}
        <div className="relative z-10 p-6 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-black tracking-wider uppercase text-white shadow-2xs font-heading">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{categoryBanner.tag}</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-2xs ${categoryBanner.badgeColor} font-heading`}>
                {categoryBanner.discount}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-heading">
              {categoryBanner.title}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-body max-w-xl">
              {categoryBanner.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#catalog-grid"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group font-heading"
              >
                <span>{categoryBanner.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#2962FF] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Category Top Deals Carousel - Wrapped in Lite's rounded-3xl p-5 sm:p-6 card */}
      {categoryDeals.length > 0 && (
        <section
          className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs space-y-4"
          aria-label="Category Deals"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2962FF] to-[#1E40AF] text-white flex items-center justify-center shadow-soft-sm">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight font-heading">
                    {category ? `${category.name} Deals Ending Soon` : 'Flash Deals Ending Soon'}
                  </h2>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-[10px] font-black uppercase tracking-wider font-heading">
                    Limited Time Offers
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5 font-body">
                  Top verified price drops in {category ? category.name : 'all categories'}. Grab discounts before timer expires.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <CountdownClock
                initialHours={4}
                initialMinutes={28}
                initialSeconds={37}
                variant="pill"
                label="Ends In:"
              />
            </div>
          </div>

          <ProductCarouselTrack scrollDistance={320}>
            {categoryDeals.map((prod) => (
              <div key={prod.id} className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px]">
                <ProductCard
                  product={prod}
                  onQuickView={handleQuickView}
                  dealBadge={prod.discountPercentage ? `FLAT ${prod.discountPercentage}% OFF` : undefined}
                />
              </div>
            ))}
          </ProductCarouselTrack>
        </section>
      )}

      {/* 04. Horizontally Scrollable Subcategories Strip */}
      {category && category.subcategories && category.subcategories.length > 0 && (
        <div className="bg-white rounded-2xl p-3 border border-zinc-200/90 shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setSelectedSubcategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all select-none ${
              selectedSubcategory === null
                ? 'bg-[#2962FF] text-white shadow-xs scale-102'
                : 'bg-zinc-100 text-zinc-700 hover:bg-[#EEF3FF] hover:text-[#2962FF]'
            }`}
          >
            All {category.name}
          </button>
          {category.subcategories.map((sub) => {
            const isSubActive = selectedSubcategory === sub.slug;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubcategory(sub.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all select-none ${
                  isSubActive
                    ? 'bg-[#2962FF] text-white shadow-xs scale-102'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-[#EEF3FF] hover:text-[#2962FF]'
                }`}
              >
                <span>{sub.name}</span>
                {sub.itemCount && (
                  <span className={`ml-1 text-[10px] font-normal ${isSubActive ? 'text-white/80' : 'text-zinc-400'}`}>
                    ({sub.itemCount})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 05. Main Catalog Area: Desktop Sidebar + Product Grid */}
      <div id="catalog-grid" className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs">
        {/* Header with Title and Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight">
              {getPageTitle()} Catalog
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6368] mt-1 font-medium">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Controls: Filter Drawer Trigger (Mobile) + Sort Dropdown */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50 shadow-2xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#2962FF]" />
              <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
            </button>

            <SortControl
              sortBy={filters.sortBy}
              onChange={(sort) => setFilters((prev) => ({ ...prev, sortBy: sort }))}
            />
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="flex items-center gap-2 py-2 flex-wrap mb-4">
            <span className="text-xs font-semibold text-zinc-400">Active Filters:</span>
            {activeChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-xs font-semibold"
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-2">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              filter={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableBrands={availableBrands}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSkeleton type="grid" count={6} />
            ) : (
              <ProductGrid
                products={products}
                columns={3}
                initialBatchSize={15}
                emptyTitle="No Matching Products"
                emptyDescription="We couldn't find any products matching your selected filters. Try broadening your criteria or resetting filters."
              />
            )}
          </div>
        </div>
      </div>

      {/* 06. Trending in Category Carousel */}
      {categoryTrending.length > 0 && (
        <section
          className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs space-y-4"
          aria-label="Trending Category Products"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#2962FF] text-white flex items-center justify-center shadow-soft-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight font-heading">
                  Trending in {category ? category.name : 'Catalog'}
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5 font-body">
                  Top-rated & bestselling items selected by customers this week
                </p>
              </div>
            </div>
          </div>

          <ProductCarouselTrack scrollDistance={320}>
            {categoryTrending.map((prod) => (
              <div key={prod.id} className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px]">
                <ProductCard
                  product={prod}
                  onQuickView={handleQuickView}
                  statusBadge="TRENDING"
                />
              </div>
            ))}
          </ProductCarouselTrack>
        </section>
      )}

      {/* 07. Benefits & Newsletter Sections */}
      <BenefitsSection />
      <NewsletterSection />

      {/* Mobile Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filter={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        availableBrands={availableBrands}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
        />
      )}
    </div>
  );
};

export default ProductListingPage;
