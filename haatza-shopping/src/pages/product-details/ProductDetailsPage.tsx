import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product, ProductVariant } from '../../types';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { useLocationContext } from '../../context/LocationContext';
import { ProductGallery } from './ProductGallery';
import { ProductVariants } from './ProductVariants';
import { ProductInformation } from './ProductInformation';
import { PriceDisplay } from '../../components/common/PriceDisplay';
import { RatingDisplay } from '../../components/common/RatingDisplay';
import { QuantitySelector } from '../../components/common/QuantitySelector';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ProductGrid } from '../../components/products/ProductGrid';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Heart, ShoppingBag, Zap, Truck, RotateCcw, Check } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recordView } = useRecentlyViewed();
  const { location, openLocationModal } = useLocationContext();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [variantError, setVariantError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'seller'>('specs');

  useEffect(() => {
    async function loadProduct() {
      if (!idOrSlug) return;
      setLoading(true);
      const prod = await productService.getProductByIdOrSlug(idOrSlug);
      if (prod) {
        setProduct(prod);
        recordView(prod);
        if (prod.variants && prod.variants.length > 0) {
          const firstInStock = prod.variants.find((v) => v.inStock) || prod.variants[0];
          setSelectedVariant(firstInStock);
        } else {
          setSelectedVariant(undefined);
        }

        const related = await productService.getRelatedProducts(prod.id, 4);
        setRelatedProducts(related);
      }
      setLoading(false);
    }
    loadProduct();
  }, [idOrSlug]);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <LoadingSkeleton type="text" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-zinc-200 rounded-2xl animate-pulse" />
          <LoadingSkeleton type="text" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-[#172033] mb-2 font-heading">Product Not Found</h2>
        <p className="text-sm text-[#64748B] mb-6 font-body">The product you are looking for might have been moved or is unavailable.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold rounded-xl transition-colors shadow-soft-sm font-heading">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const effectivePrice = product.price + (selectedVariant?.priceDelta || 0);

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantError(`Please select an option before adding to cart.`);
      return;
    }
    setVariantError('');
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantError(`Please select an option.`);
      return;
    }
    addToCart(product, quantity, selectedVariant);
    navigate('/checkout');
  };

  const breadcrumbs = [
    { label: product.destination.toUpperCase(), link: `/${product.destination}` },
    { label: product.categoryName, link: `/category/${product.categoryId}` },
    { label: product.name },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} className="mb-6" />

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#E5EAF3]">
        {/* Left: Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Right: Details & Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2962FF] font-heading">
                {product.brand}
              </span>
              <span className="text-xs text-[#64748B]">SKU: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight leading-tight font-heading">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-zinc-300">|</span>
              <span className="text-xs font-semibold text-[#16A34A] bg-[#EEF3FF] px-2 py-0.5 rounded-md font-heading">
                ✓ Verified Authentic
              </span>
              {product.stock < 10 && product.stock > 0 && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-heading">
                  Only {product.stock} units left in stock!
                </span>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-white rounded-2xl border border-[#E5EAF3] shadow-soft-sm">
            <PriceDisplay
              price={effectivePrice}
              mrp={product.mrp}
              discountPercentage={product.discountPercentage}
              unit={product.unit}
              size="xl"
            />
            <p className="text-[11px] text-[#64748B] mt-1 font-body">
              Inclusive of all taxes. Free delivery on orders above ₹499.
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-[#172033] leading-relaxed font-body">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <ProductVariants
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelect={(v) => {
                setSelectedVariant(v);
                setVariantError('');
              }}
              error={variantError}
            />
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-[#172033] uppercase tracking-wider font-heading">Quantity:</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              size="md"
            />
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="p-4 rounded-2xl border border-[#E5EAF3] bg-white shadow-soft-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#172033] flex items-center gap-1.5 font-heading">
                <Truck className="w-4 h-4 text-[#2962FF]" /> Delivery Options
              </span>
              <button
                type="button"
                onClick={openLocationModal}
                className="text-[#2962FF] font-bold hover:underline font-heading cursor-pointer"
              >
                Change PIN ({location.pincode})
              </button>
            </div>

            <div className="text-xs text-[#64748B] space-y-1 font-body">
              <p className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                Standard Delivery in {product.deliveryDays} business days to {location.city}
              </p>
              <p className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
                7-day replacement guarantee & Doorstep pickup
              </p>
            </div>
          </div>

          {/* Actions: Add to Cart + Buy Now + Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-[#F5F7FF] text-[#172033] border border-[#E5EAF3] font-bold text-sm transition-all shadow-soft-sm flex items-center justify-center gap-2 cursor-pointer font-heading"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-sm transition-all shadow-soft flex items-center justify-center gap-2 cursor-pointer font-heading"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isFavorited
                    ? 'border-[#2962FF] bg-[#EEF3FF] text-[#2962FF]'
                    : 'border-[#E5EAF3] hover:border-[#DBEAFE] text-[#172033] bg-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Full Specs */}
      <ProductInformation
        product={product}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-[#172033] font-heading">You Might Also Like</h3>
            <Link to="/products" className="text-xs font-bold text-[#2962FF] hover:underline font-heading">
              View Similar Products →
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
