import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItemRow } from '../../components/cart/CartItemRow';
import { CartSummary } from '../../components/cart/CartSummary';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ShoppingBag, ArrowLeft, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { EmptyCartIllustration } from './EmptyCartIllustration';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import { formatINR } from '../../utils/formatters';

export const CartPage: React.FC = () => {
  const {
    cart,
    savedForLater,
    clearCart,
    moveToCartFromSaved,
    removeFromSaved,
  } = useCart();

  const breadcrumbs = [{ label: 'My Cart' }];
  const totalUnits = cart.reduce((s, i) => s + (i.quantity || 1), 0);

  // Empty state handling
  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-lg w-full bg-white rounded-lg border border-[#E5E7EB] p-8 sm:p-12 text-center space-y-5 shadow-xs">
          {/* Supermarket Mart Basket Animated Illustration */}
          <EmptyCartIllustration />

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1F1F1F] font-heading tracking-tight">
              Your cart is empty!
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore our curated collections across fashion, electronics, and home essentials.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2962FF] hover:bg-[#1747CC] text-white font-extrabold rounded-lg text-sm transition-all shadow-md hover:shadow-lg font-heading cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-8 pb-24 sm:pb-16 font-body">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} className="text-xs" />

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1F1F1F] tracking-tight font-heading">
              My Cart
            </h1>
          </div>

          {/* Continue Shopping Pill Button (Matching Reference Image) */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#2962FF] text-[#1F1F1F] hover:text-[#2962FF] text-xs font-bold transition-all shadow-2xs shrink-0 self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue shopping</span>
          </Link>
        </div>

        {/* Two-Column Grid: Left (Cart Items) & Right (Order Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            
            {cart.length > 0 ? (
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 sm:p-6 shadow-xs space-y-4">
                
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>

                {/* Bottom Actions inside Cart Items Container */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB] flex-wrap gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2962FF] hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Continue shopping</span>
                  </Link>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="px-4 py-2 text-xs font-semibold text-[#555555] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-lg border border-[#E5E7EB] shadow-xs space-y-3">
                <p className="text-sm font-semibold text-[#555555]">
                  Your active cart is empty, but you have items saved for later below.
                </p>
                <Link
                  to="/"
                  className="inline-block text-xs font-bold text-[#2962FF] hover:underline"
                >
                  Explore More Products →
                </Link>
              </div>
            )}

            {/* Saved For Later Section */}
            {savedForLater.length > 0 && (
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-[#2962FF]" />
                    <h3 className="font-extrabold text-base text-[#1F1F1F] font-heading">
                      Saved for Later ({savedForLater.length})
                    </h3>
                  </div>
                  <span className="text-xs text-[#555555]">
                    Items saved to purchase at a later time
                  </span>
                </div>

                <div className="space-y-3">
                  {savedForLater.map((saved) => {
                    const product = saved?.product || (saved as any) || {};
                    const price = (product.price || 0) + (saved.selectedVariant?.priceDelta || 0);

                    return (
                      <div
                        key={saved.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB] hover:border-[#2962FF]/40 gap-4 transition-all"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={optimizeImageUrl(product.mainImage, { width: 120, quality: 70 }) || ''}
                            alt={product.name || 'Product'}
                            width="56"
                            height="56"
                            loading="lazy"
                            decoding="async"
                            className="w-14 h-14 rounded-lg object-contain bg-white border border-[#E5E7EB] shrink-0 p-1"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-extrabold text-[#1F1F1F] font-heading line-clamp-1">
                              {product.name || 'Product'}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-black text-[#2962FF]">
                                {formatINR(price)}
                              </span>
                              {saved.selectedVariant && (
                                <span className="text-[10px] font-semibold text-[#555555] bg-white border border-[#E5E7EB] px-1.5 py-0.2 rounded">
                                  {saved.selectedVariant.name}: {saved.selectedVariant.value}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => moveToCartFromSaved(saved.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#2962FF] text-white text-xs font-bold hover:bg-[#1747CC] transition-colors cursor-pointer"
                          >
                            Move to Cart
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromSaved(saved.id)}
                            className="p-1.5 text-[#555555] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                            aria-label="Remove from saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary (Desktop Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CartSummary />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
