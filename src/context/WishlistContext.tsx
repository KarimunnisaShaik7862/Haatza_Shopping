import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, WishlistItem } from '../types';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: WishlistItem[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  itemCount: number;
}

const WISHLIST_STORAGE_KEY = 'haatza_wishlist_items';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item: any) => {
              if (!item) return null;
              const prod = item.product || item;
              if (!prod || !prod.id) return null;
              return {
                productId: item.productId || prod.id,
                product: prod,
                addedAt: item.addedAt || new Date().toISOString(),
              };
            })
            .filter(Boolean) as WishlistItem[];
        }
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const isInWishlist = (productId: string) => {
    if (!productId) return false;
    return wishlist.some((item) => item?.productId === productId || item?.product?.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (!product || !product.id) return;
    const exists = isInWishlist(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item?.productId !== product.id && item?.product?.id !== product.id));
      showToast(`Removed "${product.name || 'item'}" from your wishlist`, 'info');
    } else {
      setWishlist((prev) => [
        ...prev,
        {
          productId: product.id,
          product,
          addedAt: new Date().toISOString(),
        },
      ]);
      showToast(`Saved "${product.name || 'item'}" to your wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId: string) => {
    if (!productId) return;
    setWishlist((prev) => prev.filter((item) => item?.productId !== productId && item?.product?.id !== productId));
    showToast('Item removed from wishlist', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        itemCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
