import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
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
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
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

    showToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
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
