import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { DestinationType, FilterState, Product, Category } from '../../types';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { ProductGrid } from '../../components/products/ProductGrid';
import { FilterSidebar } from '../../components/products/FilterSidebar';
import { FilterDrawer } from '../../components/products/FilterDrawer';
import { SortControl } from '../../components/products/SortControl';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { ProductCarouselTrack } from '../../components/home/ProductCarouselTrack';
import { ProductCard } from '../../components/products/ProductCard';
import { CountdownClock } from '../../components/home/CountdownClock';
import { QuickViewModal } from '../../components/products/QuickViewModal';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import { SlidersHorizontal, X, Sparkles, Flame, ArrowRight, ArrowLeft, TrendingUp } from 'lucide-react';
import premiumMensStyleBanner from '../../assets/images/mens-fashion/premium-mens-fashion-style-banner.png';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { MensFashionDepartmentView } from '../../components/fashion/MensFashionDepartmentView';
import { MensFashionSectionView } from '../../components/fashion/MensFashionSectionView';
import { WomensFashionDepartmentView } from '../../components/fashion/WomensFashionDepartmentView';
import { WomensFashionSectionView } from '../../components/fashion/WomensFashionSectionView';
import { UniversalCategoryLandingView } from '../../components/category/UniversalCategoryLandingView';
import { UniversalCategorySectionView } from '../../components/category/UniversalCategorySectionView';
import {
  getCategoryConfig,
  getCategorySection,
} from '../../data/categoriesNavigation.data';
import {
  getMajorSectionBySlug,
  getSubcategoryBySlug,
  SubcategoryItem,
} from '../../data/mensFashionNavigation.data';
import {
  getWomensMajorSectionBySlug,
  getWomensSubcategoryBySlug,
} from '../../data/womensFashionNavigation.data';

export const ProductListingPage: React.FC = () => {
  const { slug, sectionSlug, itemSlug } = useParams<{
    slug?: string;
    sectionSlug?: string;
    itemSlug?: string;
  }>();
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

  // Record shopping context for return navigation
  useEffect(() => {
    try {
      sessionStorage.setItem('haatza_last_shopping_route', window.location.pathname + window.location.search);
    } catch (e) {
      // Ignore storage error
    }
  }, [slug, sectionSlug, itemSlug, destQuery, filterQuery]);

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

  const isMen = slug === 'men-fashion' || slug === 'men' || slug === 'fashion';
  const isWomen = slug === 'women-fashion' || slug === 'women';

  const sectionObj = useMemo(
    () => (isMen && sectionSlug ? getMajorSectionBySlug(sectionSlug) : undefined),
    [isMen, sectionSlug]
  );
  const subItemObj = useMemo(
    () =>
      isMen && sectionSlug && itemSlug
        ? getSubcategoryBySlug(sectionSlug, itemSlug)
        : undefined,
    [isMen, sectionSlug, itemSlug]
  );

  const womensSectionObj = useMemo(
    () =>
      isWomen && sectionSlug
        ? getWomensMajorSectionBySlug(sectionSlug)
        : undefined,
    [isWomen, sectionSlug]
  );
  const womensSubItemObj = useMemo(
    () =>
      isWomen && sectionSlug && itemSlug
        ? getWomensSubcategoryBySlug(sectionSlug, itemSlug)
        : undefined,
    [isWomen, sectionSlug, itemSlug]
  );

  const categoryConfig = useMemo(() => (slug ? getCategoryConfig(slug) : undefined), [slug]);
  const categorySectionObj = useMemo(() => {
    if (!categoryConfig || !sectionSlug) return undefined;
    return getCategorySection(categoryConfig.slug, sectionSlug);
  }, [categoryConfig, sectionSlug]);

  // Fallback subcategory metadata generator so direct links and dynamic subcategories never crash
  const fallbackSubItem = useMemo((): SubcategoryItem | undefined => {
    if (!itemSlug) return undefined;
    const formatted = itemSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      id: `syn-${itemSlug}`,
      slug: itemSlug,
      name: formatted,
      shortTitle: formatted,
      description: `Browse curated ${formatted} styles in our collection.`,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      badge: undefined,
      itemCount: undefined,
      productFilterTerm: itemSlug,
    };
  }, [itemSlug]);

  const effectiveSubItemObj = subItemObj || (isMen && itemSlug ? fallbackSubItem : undefined);
  const effectiveWomensSubItemObj = womensSubItemObj || (isWomen && itemSlug ? fallbackSubItem : undefined);

  const currentSectionObj = isWomen ? womensSectionObj : sectionObj;
  const currentSubItemObj = isWomen ? effectiveWomensSubItemObj : effectiveSubItemObj;

  // Load filtered products
  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);

      let effectiveCategory = slug || filters.category;
      let effectiveGender: 'men' | 'women' | undefined = undefined;

      if (isMen) {
        effectiveGender = 'men';
        if (sectionSlug && itemSlug) {
          effectiveCategory = currentSubItemObj?.productFilterTerm || itemSlug;
        } else if (sectionSlug) {
          effectiveCategory = sectionObj?.slug || sectionSlug;
        } else {
          effectiveCategory = 'men-fashion';
        }
      } else if (isWomen) {
        effectiveGender = 'women';
        if (sectionSlug && itemSlug) {
          effectiveCategory = currentSubItemObj?.productFilterTerm || itemSlug;
        } else if (sectionSlug) {
          effectiveCategory = womensSectionObj?.slug || sectionSlug;
        } else {
          effectiveCategory = 'women-fashion';
        }
      }

      const queryFilter = { ...filters, category: effectiveCategory, gender: effectiveGender };

      let list = await productService.getProducts(
        queryFilter,
        destQuery || category?.destination,
        effectiveGender
      );

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
  }, [filters, slug, sectionSlug, itemSlug, subItemObj, womensSubItemObj, destQuery, category?.destination, filterQuery, selectedSubcategory]);

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
    if (filters.sizes && filters.sizes.length > 0) {
      filters.sizes.forEach((s) => {
        chips.push({
          label: `Size: ${s}`,
          onRemove: () =>
            setFilters((prev) => ({
              ...prev,
              sizes: prev.sizes?.filter((size) => size !== s),
            })),
        });
      });
    }
    if (filters.minPrice || filters.maxPrice) {
      chips.push({
        label: `Price: ₹${filters.minPrice || 0} - ₹${filters.maxPrice || 'Any'}`,
        onRemove: () => setFilters((prev) => ({ ...prev, minPrice: undefined, maxPrice: undefined })),
      });
    }
    return chips;
  }, [filters]);

  const getPageTitle = () => {
    if (isMen && sectionSlug && itemSlug) {
      if (currentSubItemObj) return currentSubItemObj.name;
    }
    if (isMen && sectionSlug) {
      if (sectionObj) return sectionObj.title;
    }
    if (isWomen && sectionSlug && itemSlug) {
      if (currentSubItemObj) return currentSubItemObj.name;
    }
    if (isWomen && sectionSlug) {
      if (womensSectionObj) return womensSectionObj.title;
    }
    if (category) return category.name;
    if (filterQuery === 'deals') return 'Daily Deals & Discounts';
    if (filterQuery === 'trending') return 'Trending Products';
    if (filterQuery === 'bestsellers') return 'Bestselling Products';
    if (filterQuery === 'new_arrivals') return 'New Arrivals';
    if (destQuery) return `${destQuery.toUpperCase()} Products`;
    return 'All Products';
  };

  const breadcrumbItems = useMemo(() => {
    if (isMen) {
      if (sectionSlug && itemSlug) {
        return [
          { label: 'Men Fashion', link: '/category/men-fashion' },
          {
            label: sectionObj ? sectionObj.title : sectionSlug,
            link: `/category/men-fashion/${sectionSlug}`,
          },
          { label: currentSubItemObj ? currentSubItemObj.name : itemSlug },
        ];
      }
      if (sectionSlug) {
        return [
          { label: 'Men Fashion', link: '/category/men-fashion' },
          { label: sectionObj ? sectionObj.title : sectionSlug },
        ];
      }
      return [{ label: 'Men Fashion' }];
    }
    if (isWomen) {
      if (sectionSlug && itemSlug) {
        return [
          { label: "Women's Fashion", link: '/category/women-fashion' },
          {
            label: womensSectionObj ? womensSectionObj.title : sectionSlug,
            link: `/category/women-fashion/${sectionSlug}`,
          },
          { label: currentSubItemObj ? currentSubItemObj.name : itemSlug },
        ];
      }
      if (sectionSlug) {
        return [
          { label: "Women's Fashion", link: '/category/women-fashion' },
          { label: womensSectionObj ? womensSectionObj.title : sectionSlug },
        ];
      }
      return [{ label: "Women's Fashion" }];
    }
    return category ? [{ label: category.name }] : [{ label: getPageTitle() }];
  }, [isMen, isWomen, slug, sectionSlug, itemSlug, sectionObj, womensSectionObj, currentSubItemObj, category]);

  // Dynamic category promotional hero banner
  const categoryBanner = useMemo(() => {
    switch (slug) {
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
      case 'fashion':
      case 'men-fashion':
        return {
          tag: 'PREMIUM MENSWEAR EDIT',
          discount: 'FLAT 40% - 70% OFF',
          title: "Explore Premium Men's Fashion",
          subtitle: 'Contemporary essentials, sharp silhouettes & luxury wardrobe staples crafted for modern men.',
          bgGradient: 'from-[#0F2042] via-[#1E40AF] to-[#2962FF]',
          badgeColor: 'bg-amber-400 text-stone-950',
          image: premiumMensStyleBanner,
          ctaText: "Explore Men's Deals",
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

  // 01. Level 1: Dedicated Men's Fashion Landing Page (/category/men-fashion)
  if (isMen && !sectionSlug && !itemSlug) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
        <MensFashionDepartmentView />



        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={handleCloseQuickView}
          />
        )}
      </div>
    );
  }

  // 01b. Level 1: Dedicated Women's Fashion Landing Page (/category/women-fashion)
  if (isWomen && !sectionSlug && !itemSlug) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
        <WomensFashionDepartmentView />



        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={handleCloseQuickView}
          />
        )}
      </div>
    );
  }

  // 02. Men's Fashion Department & Category Pages (Level 2 & Level 3 unified same-page browsing)
  if (isMen && sectionSlug) {
    if (sectionObj) {
      return (
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
          <MensFashionSectionView section={sectionObj} initialSubcategorySlug={itemSlug} />
        </div>
      );
    }
    // Meaningful recovery if department not found
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12 pb-24 sm:pb-16 space-y-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-zinc-200 shadow-2xs space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-[#2962FF] flex items-center justify-center font-bold text-2xl">
            404
          </div>
          <h2 className="text-xl font-black text-zinc-900 font-heading">Department Not Found</h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-body">
            We couldn't find the department &ldquo;{sectionSlug}&rdquo; under Men&apos;s Fashion.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/category/men-fashion"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2962FF] text-white text-xs font-bold hover:bg-[#1E40AF] transition-colors"
            >
              Browse Men's Fashion
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 text-xs font-bold hover:bg-zinc-50 transition-colors"
            >
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 02b. Level 2 & Level 3: Section Page for Women (e.g. /category/women-fashion/ethnic-wear)
  if (isWomen && sectionSlug) {
    if (womensSectionObj) {
      return (
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
          <WomensFashionSectionView section={womensSectionObj} initialSubcategorySlug={itemSlug} />
        </div>
      );
    }
    // Meaningful recovery if department not found
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12 pb-24 sm:pb-16 space-y-8 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-zinc-200 shadow-2xs space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-50 text-[#DB2777] flex items-center justify-center font-bold text-2xl">
            404
          </div>
          <h2 className="text-xl font-black text-zinc-900 font-heading">Department Not Found</h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-body">
            We couldn't find the department &ldquo;{sectionSlug}&rdquo; under Women&apos;s Fashion.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/category/women-fashion"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2962FF] text-white text-xs font-bold hover:bg-[#1E40AF] transition-colors"
            >
              Browse Women's Fashion
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 text-xs font-bold hover:bg-zinc-50 transition-colors"
            >
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 03a. All 15 Top-Level Categories Landing Pages (Level 1)
  if (categoryConfig && !sectionSlug && !itemSlug) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
        <UniversalCategoryLandingView config={categoryConfig} />
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={handleCloseQuickView}
          />
        )}
      </div>
    );
  }

  // 03b. All 15 Category Department & Subcategory Pages (Level 2 & 3 unified same-page browsing)
  if (categoryConfig && sectionSlug) {
    if (categorySectionObj) {
      return (
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
          <UniversalCategorySectionView
            categoryConfig={categoryConfig}
            section={categorySectionObj}
            initialSubcategorySlug={itemSlug}
          />
        </div>
      );
    }

    // Graceful check: Is sectionSlug actually a subcategory in ANY section of this category?
    const foundSectionWithSub = categoryConfig.sections.find((sec) =>
      sec.subcategories.some((sub) => sub.slug === sectionSlug || sub.id === sectionSlug)
    );
    if (foundSectionWithSub) {
      return (
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
          <UniversalCategorySectionView
            categoryConfig={categoryConfig}
            section={foundSectionWithSub}
            initialSubcategorySlug={sectionSlug}
          />
        </div>
      );
    }

    // Fallback: If section was not found, default to first section to guarantee ZERO 404
    if (categoryConfig.sections.length > 0) {
      return (
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-8">
          <UniversalCategorySectionView
            categoryConfig={categoryConfig}
            section={categoryConfig.sections[0]}
            initialSubcategorySlug={itemSlug}
          />
        </div>
      );
    }
  }

  // 03. Level 3 (e.g. /category/men-fashion/clothing/shirts or /category/women-fashion/ethnic-wear/sarees)
  const isLevel3Fashion =
    (isMen && Boolean(sectionSlug && itemSlug)) ||
    (isWomen && Boolean(sectionSlug && itemSlug));
  const parentSectionRoute = isWomen
    ? `/category/women-fashion/${sectionSlug}`
    : `/category/men-fashion/${sectionSlug}`;

  // Unknown category recovery (when not fashion, not general known categories, not loading)
  if (
    !loading &&
    !isMen &&
    !isWomen &&
    !categoryConfig &&
    slug &&
    slug !== 'products' &&
    slug !== 'under-49' &&
    !destQuery &&
    !filterQuery &&
    !category
  ) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16 pb-24 space-y-8 text-center">
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 border border-zinc-200 shadow-2xs space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-[#2962FF] flex items-center justify-center font-black text-2xl">
            404
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#172033] font-heading">Category Not Found</h1>
            <p className="text-sm text-zinc-500 mt-1 font-body">
              The category &ldquo;{slug}&rdquo; does not exist or may have been updated.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/category/men-fashion"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2962FF] text-white text-xs font-bold hover:bg-[#1E40AF] transition-colors"
            >
              Explore Men's Fashion
            </Link>
            <Link
              to="/category/women-fashion"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 text-xs font-bold hover:bg-zinc-50 transition-colors"
            >
              Explore Women's Fashion
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 text-xs font-bold hover:bg-zinc-50 transition-colors"
            >
              Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16 space-y-6">
      {/* Level 3 Breadcrumbs and Back Navigation */}
      {isLevel3Fashion ? (
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-center gap-3">
            <Link
              to={parentSectionRoute}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/90 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-700 transition-colors shadow-2xs"
              title={`Back to ${currentSectionObj ? currentSectionObj.title : 'Section'}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {currentSectionObj ? currentSectionObj.title : 'All Categories'}</span>
            </Link>
          </div>
        </div>
      ) : (
        /* 01. General Category Promotional Hero Banner */
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
      )}

      {/* General Category Deals Carousel (Only for general categories) */}
      {!isLevel3Fashion && categoryDeals.length > 0 && (
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

      {/* General Category Subcategories Strip */}
      {!isLevel3Fashion && category && category.subcategories && category.subcategories.length > 0 && (
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

      {/* Main Catalog Area: Desktop Sidebar + Product Grid */}
      <div id="catalog-grid" className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs">
        {/* Header with Title and Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 gap-4 mb-4">
          <div>
            {isLevel3Fashion && (
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2962FF] text-[10px] font-bold uppercase tracking-wider">
                  {currentSectionObj?.title || "Fashion Collection"}
                </span>
                {currentSubItemObj?.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
                    {currentSubItemObj.badge}
                  </span>
                )}
              </div>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight">
              {getPageTitle()} {isLevel3Fashion ? 'Collection' : 'Catalog'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6368] mt-1 font-medium">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              {currentSubItemObj?.description ? ` • ${currentSubItemObj.description}` : ''}
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
                columns="auto"
                initialBatchSize={16}
                emptyTitle={
                  isLevel3Fashion
                    ? `No ${getPageTitle()} Found`
                    : 'No Matching Products'
                }
                emptyDescription={
                  isLevel3Fashion
                    ? `We couldn't find any products in this specific category. Please browse other ${currentSectionObj?.title || 'Fashion'} categories.`
                    : "We couldn't find any products matching your selected filters. Try broadening your criteria or resetting filters."
                }
              />
            )}
          </div>
        </div>
      </div>

      {/* Trending in Category Carousel (Only for general categories) */}
      {!isLevel3Fashion && categoryTrending.length > 0 && (
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
