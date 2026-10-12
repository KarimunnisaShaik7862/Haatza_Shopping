import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product, ProductVariant } from '../../types';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { useLocationContext } from '../../context/LocationContext';
import { ProductGallery } from '../../components/products/ProductGallery';
import { PriceDisplay } from '../../components/common/PriceDisplay';
import { RatingDisplay } from '../../components/common/RatingDisplay';
import { QuantitySelector } from '../../components/common/QuantitySelector';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ProductGrid } from '../../components/products/ProductGrid';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { 
  Heart, ShoppingBag, Zap, Truck, 
  RotateCcw, Check, Star
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
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
        // Default select first available variant if exists
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
        <h2 className="text-2xl font-bold text-[#202124] mb-2">Product Not Found</h2>
        <p className="text-sm text-[#5F6368] mb-6">The product you are looking for might have been moved or is unavailable.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#E53935] text-white font-bold rounded-xl">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const effectivePrice = product.price + (selectedVariant?.priceDelta || 0);

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantError(`Please select a ${product.variants[0].name.toLowerCase()} option before adding to cart.`);
      return;
    }
    setVariantError('');
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantError(`Please select a ${product.variants[0].name.toLowerCase()} option.`);
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-6" />

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-200">
        
        {/* Left: Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery
            images={product.images}
            productName={product.name}
            discountPercentage={product.discountPercentage}
            instantDeliveryMinutes={product.instantDeliveryMinutes}
          />
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                {product.brand}
              </span>
              <span className="text-xs text-zinc-400">SKU: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-zinc-300">|</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                ✓ Verified Authentic
              </span>
              {product.stock < 10 && product.stock > 0 && (
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Only {product.stock} units left in stock!
                </span>
              )}
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80">
            <PriceDisplay
              price={effectivePrice}
              mrp={product.mrp}
              discountPercentage={product.discountPercentage}
              unit={product.unit}
              size="xl"
            />
            <p className="text-[11px] text-[#5F6368] mt-1">
              Inclusive of all taxes. Free delivery on orders above ₹499.
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-700 leading-relaxed">
            {product.description}
          </p>

          {/* Variants Selection (Size / Color / Storage) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800">
                <span>Select {product.variants[0].name}:</span>
                {selectedVariant && (
                  <span className="text-zinc-500 font-normal">
                    Selected: <strong>{selectedVariant.value}</strong>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={!v.inStock}
                      onClick={() => {
                        setSelectedVariant(v);
                        setVariantError('');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'border-[#E53935] bg-[#FFEBEE] text-[#E53935] shadow-xs'
                          : v.inStock
                          ? 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {v.value}
                      {v.priceDelta ? ` (+₹${v.priceDelta})` : ''}
                    </button>
                  );
                })}
              </div>

              {variantError && (
                <p className="text-xs text-rose-600 font-semibold">{variantError}</p>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Quantity:</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              size="md"
            />
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="p-4 rounded-2xl border border-zinc-200 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#E53935]" /> Delivery Options
              </span>
              <button
                type="button"
                onClick={openLocationModal}
                className="text-[#E53935] font-bold hover:underline"
              >
                Change PIN ({location.pincode})
              </button>
            </div>

            <div className="text-xs text-zinc-600 space-y-1">
              {product.instantDeliveryMinutes ? (
                <p className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <Zap className="w-4 h-4 fill-emerald-600" />
                  Express 15-Minute Delivery available to {location.area || location.city}
                </p>
              ) : (
                <p className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Standard Delivery in {product.deliveryDays} business days to {location.city}
                </p>
              )}
              <p className="flex items-center gap-1.5 text-zinc-500">
                <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
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
                className="flex-1 py-3.5 px-6 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isFavorited
                    ? 'border-[#E53935] bg-[#FFEBEE] text-[#E53935]'
                    : 'border-zinc-300 hover:border-zinc-400 text-zinc-700'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Reviews, Seller Info */}
      <div className="py-12 border-b border-zinc-200">
        <div className="flex border-b border-zinc-200 gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'specs'
                ? 'border-[#E53935] text-[#E53935]'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Product Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#E53935] text-[#E53935]'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seller')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'seller'
                ? 'border-[#E53935] text-[#E53935]'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Seller & Warranty
          </button>
        </div>

        <div className="pt-6">
          {activeTab === 'specs' && (
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm text-zinc-700 leading-relaxed">{product.fullDescription}</p>
              {product.specifications && (
                <div className="border border-zinc-200 rounded-2xl overflow-hidden mt-4">
                  {Object.entries(product.specifications).map(([key, val], i) => (
                    <div
                      key={key}
                      className={`flex text-xs p-3 ${
                        i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'
                      }`}
                    >
                      <span className="w-1/3 font-semibold text-zinc-500">{key}</span>
                      <span className="w-2/3 font-bold text-zinc-800">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-6 p-5 bg-zinc-50 rounded-2xl border border-zinc-200">
                <div className="text-center">
                  <p className="text-3xl font-black text-[#202124]">{product.rating.toFixed(1)}</p>
                  <div className="flex text-amber-500 justify-center my-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500">{product.reviewCount} ratings</p>
                </div>
                <div className="text-xs text-zinc-600 border-l border-zinc-200 pl-6 space-y-1">
                  <p>94% of customers recommend this product</p>
                  <p>✓ All reviews verified by Indian OTP purchases</p>
                </div>
              </div>

              {/* Sample reviews */}
              <div className="space-y-4">
                {[
                  {
                    name: 'Aarav Patel',
                    rating: 5,
                    date: '3 days ago',
                    title: 'Exceeded expectations!',
                    comment: 'Top notch packaging and the build quality feels premium. Delivered in Mumbai under 24 hours.',
                  },
                  {
                    name: 'Pooja Iyer',
                    rating: 5,
                    date: '1 week ago',
                    title: 'Worth every rupee',
                    comment: 'Extremely satisfied with the purchase. Color and materials match the online photos perfectly.',
                  },
                ].map((rev, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-zinc-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-xs">
                          {rev.name.charAt(0)}
                        </div>
                        <span className="font-bold text-zinc-900">{rev.name}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-zinc-400 text-[11px]">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, r) => (
                        <Star key={r} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-zinc-800">{rev.title}</p>
                    <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seller' && (
            <div className="max-w-xl space-y-4 p-5 bg-white rounded-2xl border border-zinc-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900">{product.sellerName}</h4>
                  <p className="text-xs text-zinc-500">Authorized Merchant Partner</p>
                </div>
                <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg">
                  ★ {product.sellerRating} / 5.0
                </div>
              </div>
              <div className="text-xs text-zinc-600 space-y-1.5 pt-2 border-t border-zinc-100">
                <p>• 100% genuine product guarantee backed by HAATZA Trust Shield</p>
                <p>• 7-day replacement policy for damaged or defective units</p>
                <p>• GST invoice provided with all deliveries</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-[#202124]">You Might Also Like</h3>
            <Link to="/products" className="text-xs font-bold text-[#E53935] hover:underline">
              View Similar Products →
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
};
