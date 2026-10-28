import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product, ProductVariant } from '../../types';
import { productService, ALL_MOCK_PRODUCTS } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';

// Modular PDP Components
import { ProductGallery } from './ProductGallery';
import { ProductHeaderInfo } from './ProductHeaderInfo';
import { ProductPricingOffers } from './ProductPricingOffers';
import { ProductCategoryOptions } from './ProductCategoryOptions';
import { ProductEmiPayment } from './ProductEmiPayment';
import { ProductDeliveryDetails } from './ProductDeliveryDetails';
import { ProductBenefits } from './ProductBenefits';
import { ProductHighlights } from './ProductHighlights';
import { ProductDetails } from './ProductDetails';
import { ProductSellerInfo } from './ProductSellerInfo';
import { ProductQuestionsAnswers } from './ProductQuestionsAnswers';
import { ProductPurchaseActions } from './ProductPurchaseActions';
import { ProductRecommendations } from './ProductRecommendations';
import { ProductPromosSection } from './ProductPromosSection';
import { ProductRatingsAndReviews } from './ProductRatingsAndReviews';
import { ProductSizeChartModal } from './ProductSizeChartModal';
import { getProductCategoryFamily, getProductImages } from './productDetailHelper';

export const ProductDetailsPage: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recentlyViewed, recordView } = useRecentlyViewed();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Recommendation product sets
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [customersAlsoLike, setCustomersAlsoLike] = useState<Product[]>([]);
  const [topCategoryProducts, setTopCategoryProducts] = useState<Product[]>([]);

  // Selection & UI State
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [variantError, setVariantError] = useState('');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (!idOrSlug) return;
      setLoading(true);

      const prod = await productService.getProductByIdOrSlug(idOrSlug);
      if (prod) {
        setProduct(prod);
        recordView(prod);

        // Do not pre-select any variant by default per user specification
        setSelectedVariant(undefined);

        // 1. Similar Products (matching subcategory or category)
        const similar = ALL_MOCK_PRODUCTS.filter(
          (p) =>
            p.id !== prod.id &&
            ((prod.subcategoryId && p.subcategoryId === prod.subcategoryId) ||
              p.categoryId === prod.categoryId)
        ).slice(0, 8);
        setSimilarProducts(similar);

        // 2. Customers Also Like (complementary items in destination or shared tags)
        const similarIds = new Set(similar.map((s) => s.id));
        const alsoLike = ALL_MOCK_PRODUCTS.filter(
          (p) =>
            p.id !== prod.id &&
            !similarIds.has(p.id) &&
            (p.destination === prod.destination || p.categoryId === prod.categoryId)
        ).slice(0, 8);
        setCustomersAlsoLike(alsoLike);

        // 4. Top Category Products (highest rated & bestsellers in category)
        const topCat = ALL_MOCK_PRODUCTS.filter(
          (p) => p.id !== prod.id && p.categoryId === prod.categoryId
        )
          .sort((a, b) => b.rating - a.rating || (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
          .slice(0, 8);
        setTopCategoryProducts(topCat);
      }
      setLoading(false);
    }

    loadProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idOrSlug]);

  // Track sticky header offset dynamically to ensure gallery remains completely visible below header
  const [headerOffset, setHeaderOffset] = useState(206);

  useEffect(() => {
    const updateHeaderOffset = () => {
      const header = document.querySelector('header');
      if (header) {
        const rect = header.getBoundingClientRect();
        setHeaderOffset(Math.round(rect.bottom + 8));
      }
    };
    updateHeaderOffset();
    window.addEventListener('scroll', updateHeaderOffset, { passive: true });
    window.addEventListener('resize', updateHeaderOffset, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateHeaderOffset);
      window.removeEventListener('resize', updateHeaderOffset);
    };
  }, []);

  // Track when user reaches the end of the product details content
  const [isAtEndOfDetails, setIsAtEndOfDetails] = useState(false);
  const endOfDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkEndOfDetails = () => {
      if (!endOfDetailsRef.current) return;
      const rect = endOfDetailsRef.current.getBoundingClientRect();
      setIsAtEndOfDetails(rect.top <= window.innerHeight - 60);
    };

    checkEndOfDetails();
    window.addEventListener('scroll', checkEndOfDetails, { passive: true });
    window.addEventListener('resize', checkEndOfDetails, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkEndOfDetails);
      window.removeEventListener('resize', checkEndOfDetails);
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        <LoadingSkeleton type="text" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 aspect-square bg-slate-100 rounded-2xl animate-pulse" />
          <div className="lg:col-span-7 space-y-4">
            <LoadingSkeleton type="text" />
            <LoadingSkeleton type="text" />
            <LoadingSkeleton type="card" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#172033] font-heading">Product Not Found</h2>
        <p className="text-sm text-[#64748B] font-body">
          The product you are looking for might have been moved or is currently unavailable.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold rounded-xl transition-colors shadow-soft-sm font-heading cursor-pointer"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const effectivePrice = product.price + (selectedVariant?.priceDelta || 0);
  const family = getProductCategoryFamily(product);
  const isWomens =
    family === 'fashion' &&
    (product.categoryId?.includes('women') ||
      product.tags?.some((t) => ['women', 'womens', 'saree', 'kurti', 'dress', 'lehenga'].includes(t.toLowerCase())));

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantError('Please select a size or configuration before adding to cart.');
      const optionsElem = document.getElementById('product-category-options');
      if (optionsElem) {
        optionsElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setVariantError('');
    const success = addToCart(product, quantity, selectedVariant);
    if (success) {
      navigate('/cart');
    }
  };

  const handleBuyNow = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantError('Please select a size or configuration.');
      const optionsElem = document.getElementById('product-category-options');
      if (optionsElem) {
        optionsElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setVariantError('');
    const buyNowItem = {
      product,
      quantity,
      selectedVariant,
    };
    try {
      sessionStorage.setItem('haatza_buynow_item', JSON.stringify(buyNowItem));
    } catch (e) {
      console.error(e);
    }
    navigate('/checkout', { state: { buyNowItem, returnUrl: `/product/${idOrSlug}` } });
  };

  // Breadcrumbs hierarchy
  const breadcrumbs = [
    { label: product.categoryName, link: `/category/${product.categoryId}` },
    ...(product.subcategoryName
      ? [{ label: product.subcategoryName, link: `/category/${product.categoryId}` }]
      : []),
    { label: product.name },
  ];

  // Exclude current product from recently viewed
  const userRecentlyViewed = recentlyViewed.filter((p) => p.id !== product.id);

  // Product images: Ensure all 4-5 multi-angle images are available
  const productImages = getProductImages(product);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-5 pb-24 sm:pb-16 space-y-6">
      {/* Dynamic Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} className="mb-2" />

      {/* Main Two-Column Layout Grid
          - Left Column: Stationary Gallery (Sticky on desktop, completely visible)
          - Right Column: Independent Scrolling Information Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 xl:gap-6 items-start pb-10">
        {/* Left Column: Product Gallery
            Remains stationary and completely visible within its column while right column scrolls */}
        <div
          className="lg:col-span-6 xl:col-span-6 lg:sticky self-start z-10"
          style={{ top: `${headerOffset}px` }}
        >
          <ProductGallery
            productIdOrSlug={product.slug || product.id}
            images={productImages}
            productName={product.name}
            discountPercentage={product.discountPercentage}
            instantDeliveryMinutes={product.instantDeliveryMinutes}
            isWishlisted={isFavorited}
            onToggleWishlist={() => toggleWishlist(product)}
          />
        </div>

        {/* Right Column: Complete Product Details & Information
            Scrolls independently with rich, comprehensive data */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-7 sm:space-y-8">
          {/* 1. Header Information */}
          <ProductHeaderInfo product={product} />

          {/* 2. Pricing Showcase */}
          <ProductPricingOffers
            price={effectivePrice}
            mrp={product.mrp}
            discountPercentage={product.discountPercentage}
            unit={product.unit}
          />

          {/* 3. Category-Specific Options (Sizes/Colors/Specs + Size Chart Modal trigger) */}
          <ProductCategoryOptions
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={(v) => {
              setSelectedVariant(v);
              setVariantError('');
            }}
            onOpenSizeChart={() => setIsSizeChartOpen(true)}
            variantError={variantError}
          />

          {/* 4. Easy EMI, Delivery Details, Benefits, Highlights & Details Section Group */}
          <div className="space-y-5 sm:space-y-6">
            <ProductEmiPayment product={product} />
            <ProductDeliveryDetails product={product} />
            <ProductBenefits />
            <ProductHighlights
              key={`highlights-${product.id}`}
              product={product}
              defaultExpanded={true}
            />
            <ProductDetails
              key={`details-${product.id}`}
              product={product}
              defaultExpanded={true}
            />
          </div>

          {/* 6. Sold By / Merchant Information */}
          <ProductSellerInfo product={product} />

          {/* 7. Questions & Answers (Q&A) */}
          <ProductQuestionsAnswers product={product} />

          {/* Sentinel marker for detecting end of details content */}
          <div ref={endOfDetailsRef} className="h-px w-full pointer-events-none" />

          {/* 8. Purchase Actions (Sticky bottom bar independent of product image) */}
          <ProductPurchaseActions
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            isAdded={isAddedFeedback}
            inStock={product.inStock}
            isAtEndOfDetails={isAtEndOfDetails}
          />
        </div>
      </div>

      {/* 2. Similar Products (Rendered full-width immediately above Promos & Reviews) */}
      <ProductRecommendations
        currentProduct={product}
        similarProducts={similarProducts}
        filter="similar-only"
      />

      {/* 3. Promos for You (Contextual Campaign Banners Carousel) */}
      <ProductPromosSection currentProduct={product} />

      {/* 4. Full-Width Customer Ratings, Photo Collage & Written Reviews */}
      <ProductRatingsAndReviews product={product} />

      {/* Remaining Related Product Recommendations (Customers Also Like, Recently Viewed, Top Category) */}
      <ProductRecommendations
        currentProduct={product}
        customersAlsoLike={customersAlsoLike}
        recentlyViewedProducts={userRecentlyViewed}
        topCategoryProducts={topCategoryProducts}
        filter="other-only"
      />

      {/* Fashion Size Chart Modal */}
      <ProductSizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        isWomens={isWomens}
      />
    </div>
  );
};

export default ProductDetailsPage;
