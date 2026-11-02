import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { CartItem, Coupon, Product, ProductVariant } from '../types';
import { couponService } from '../services/couponService';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  savedForLater: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  moveToSaveForLater: (cartItemId: string) => void;
  moveToCartFromSaved: (savedItemId: string) => void;
  removeFromSaved: (savedItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CART_STORAGE_KEY = 'haatza_cart_items';
const SAVED_STORAGE_KEY = 'haatza_saved_items';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  // Professional Bottom-Center Pop-up Notification State for 3-second Add-to-Cart feedback
  interface CartPopupData {
    visible: boolean;
    title: string;
    price: number;
    image?: string;
    unit?: string;
    variantName?: string;
    quantity: number;
  }

  const [cartPopup, setCartPopup] = useState<CartPopupData | null>(null);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerCartPopup = useCallback((product: Product, quantity = 1, variant?: ProductVariant) => {
    if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    const finalPrice = (product.price || 0) + (variant?.priceDelta || 0);
    const image = product.mainImage || (product.images && product.images[0]) || '';

    setCartPopup({
      visible: true,
      title: product.name || 'Product',
      price: finalPrice,
      image,
      unit: product.unit,
      variantName: variant?.name || variant?.value,
      quantity,
    });

    popupTimerRef.current = setTimeout(() => {
      setCartPopup((prev) => (prev ? { ...prev, visible: false } : null));
      hideTimerRef.current = setTimeout(() => {
        setCartPopup(null);
      }, 300);
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item: any) => {
              if (!item) return null;
              const prod = item.product || item;
              if (!prod || !prod.id) return null;
              return {
                id: item.id || `${prod.id}-standard`,
                productId: item.productId || prod.id,
                product: prod,
                selectedVariant: item.selectedVariant,
                quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
                addedAt: item.addedAt || new Date().toISOString(),
              };
            })
            .filter(Boolean) as CartItem[];
        }
      }
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
    }
    return [];
  });

  const [savedForLater, setSavedForLater] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item: any) => {
              if (!item) return null;
              const prod = item.product || item;
              if (!prod || !prod.id) return null;
              return {
                id: item.id || `${prod.id}-saved`,
                productId: item.productId || prod.id,
                product: prod,
                selectedVariant: item.selectedVariant,
                quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
                addedAt: item.addedAt || new Date().toISOString(),
              };
            })
            .filter(Boolean) as CartItem[];
        }
      }
    } catch (e) {
      console.error('Error reading saved items', e);
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Sync with LocalStorage across both common and lite keys
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      localStorage.setItem('haatza_lite_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedForLater));
    } catch (e) {
      console.error(e);
    }
  }, [savedForLater]);

  // Recalculate coupon discount if cart changes
  useEffect(() => {
    if (appliedCoupon) {
      const currentSubtotal = cart.reduce((sum, item) => {
        const prod = item?.product || (item as any);
        const itemPrice = (prod?.price || 0) + (item?.selectedVariant?.priceDelta || 0);
        return sum + itemPrice * (item?.quantity || 1);
      }, 0);

      if (currentSubtotal < appliedCoupon.minOrderValue) {
        setAppliedCoupon(null);
        setCouponDiscount(0);
        showToast(`Coupon ${appliedCoupon.code} removed as minimum cart requirement was not met.`, 'info');
      } else {
        let disc = 0;
        if (appliedCoupon.discountType === 'flat') {
          disc = appliedCoupon.discountValue;
        } else {
          disc = Math.round((currentSubtotal * appliedCoupon.discountValue) / 100);
          if (appliedCoupon.maxDiscount && disc > appliedCoupon.maxDiscount) {
            disc = appliedCoupon.maxDiscount;
          }
        }
        setCouponDiscount(disc);
      }
    }
  }, [cart, appliedCoupon, showToast]);

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const cartItemId = `${product.id}-${variant?.id || 'standard'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId || item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedVariant: variant,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    });

    triggerCartPopup(product, quantity, variant);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId && item.productId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId || item.productId === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const moveToSaveForLater = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    if (item) {
      setCart((prev) => prev.filter((i) => i.id !== cartItemId));
      setSavedForLater((prev) => [...prev, item]);
      showToast('Moved item to Saved for Later', 'info');
    }
  };

  const moveToCartFromSaved = (savedItemId: string) => {
    const item = savedForLater.find((i) => i.id === savedItemId);
    if (item) {
      setSavedForLater((prev) => prev.filter((i) => i.id !== savedItemId));
      addToCart(item.product, item.quantity, item.selectedVariant);
    }
  };

  const removeFromSaved = (savedItemId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.id !== savedItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const currentSubtotal = cart.reduce((sum, item) => {
      const prod = item?.product || (item as any);
      const itemPrice = (prod?.price || 0) + (item?.selectedVariant?.priceDelta || 0);
      return sum + itemPrice * (item?.quantity || 1);
    }, 0);

    const res = await couponService.validateCoupon(code, currentSubtotal);
    if (res.isValid && res.coupon) {
      setAppliedCoupon(res.coupon);
      setCouponDiscount(res.discount);
      showToast(`Coupon ${res.coupon.code} applied! Saved ₹${res.discount}`, 'success');
      return { success: true, message: `Coupon applied! You saved ₹${res.discount}` };
    }
    return { success: false, message: res.error || 'Failed to apply coupon.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Coupon removed', 'info');
  };

  // Calculations
  const itemCount = cart.reduce((count, item) => count + (item?.quantity || 1), 0);

  const subtotal = cart.reduce((sum, item) => {
    const prod = item?.product || (item as any);
    const itemPrice = (prod?.price || 0) + (item?.selectedVariant?.priceDelta || 0);
    return sum + itemPrice * (item?.quantity || 1);
  }, 0);

  const deliveryCharge = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const total = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToSaveForLater,
        moveToCartFromSaved,
        removeFromSaved,
        clearCart,
        itemCount,
        subtotal,
        discount: couponDiscount,
        deliveryCharge,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}

      {/* Professional Bottom-Center Pop-up Notification: Triggered on add to cart, visible for 3 seconds */}
      {cartPopup && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] w-full max-w-lg px-4 flex justify-center select-none"
        >
          <div
            className={`pointer-events-auto flex items-center gap-3 w-full sm:w-auto min-w-[320px] max-w-[440px] px-3.5 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 transform shadow-2xl ${
              cartPopup.visible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
            }`}
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(16, 185, 129, 0.25)',
              color: '#FFFFFF',
            }}
          >
            {/* Thumbnail */}
            <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 flex items-center justify-center">
              {cartPopup.image ? (
                <img
                  src={cartPopup.image}
                  alt={cartPopup.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
              )}
              <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 border border-slate-900 shadow">
                <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Added to Cart
                </span>
                {cartPopup.quantity > 1 && (
                  <span className="text-[11px] text-slate-400 font-medium">
                    × {cartPopup.quantity}
                  </span>
                )}
              </div>
              <h4 className="text-xs sm:text-[13px] font-semibold text-white truncate max-w-[160px] sm:max-w-[200px]" title={cartPopup.title}>
                {cartPopup.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="font-bold text-emerald-400">₹{cartPopup.price}</span>
                {cartPopup.unit && (
                  <span className="text-[11px] text-slate-400">({cartPopup.unit})</span>
                )}
                {cartPopup.variantName && (
                  <span className="text-[11px] text-slate-400 truncate">• {cartPopup.variantName}</span>
                )}
              </div>
            </div>

            {/* CTA & Close */}
            <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-slate-800">
              <Link
                to="/cart"
                onClick={() => setCartPopup(null)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-semibold shadow-md transition-all duration-200"
              >
                <span>View Cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setCartPopup(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
