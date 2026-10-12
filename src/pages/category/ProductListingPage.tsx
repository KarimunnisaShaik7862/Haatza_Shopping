import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { DestinationType, FilterState, Product, Category } from '../../types';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { ProductGrid } from '../../components/products/ProductGrid';
import { FilterSidebar } from '../../components/products/FilterSidebar';
import { FilterDrawer } from '../../components/products/FilterDrawer';
import { SortControl } from '../../components/products/SortControl';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { SlidersHorizontal, X } from 'lucide-react';

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

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
            {getPageTitle()}
          </h1>
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
            <SlidersHorizontal className="w-4 h-4 text-[#A60000]" />
            <span>Filters {activeChips.length > 0 && `(${activeChips.length})`}</span>
          </button>

          <SortControl
            sortBy={filters.sortBy}
            onChange={(sort) => setFilters((prev) => ({ ...prev, sortBy: sort }))}
          />
        </div>
      </div>

      {/* Horizontally Scrollable Subcategories Strip (Section 6 Requirement) */}
      {category && category.subcategories && category.subcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 border-b border-zinc-100">
          <button
            type="button"
            onClick={() => setSelectedSubcategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all select-none ${
              selectedSubcategory === null
                ? 'bg-[#A60000] text-white shadow-xs scale-102'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80'
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
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all select-none ${
                  isSubActive
                    ? 'bg-[#A60000] text-white shadow-xs scale-102'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80'
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

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex items-center gap-2 py-3 flex-wrap">
          <span className="text-xs font-semibold text-zinc-400">Active Filters:</span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFEBEE] text-[#E53935] text-xs font-semibold"
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
            className="text-xs font-bold text-zinc-500 hover:text-[#E53935] underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Content Layout: Desktop Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
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

      {/* Mobile Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filter={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        availableBrands={availableBrands}
      />
    </div>
  );
};
