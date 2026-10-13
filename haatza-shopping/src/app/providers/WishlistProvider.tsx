import React from 'react';
import { WishlistProvider as BaseWishlistProvider } from '../../context/WishlistContext';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseWishlistProvider>{children}</BaseWishlistProvider>;
};

export { BaseWishlistProvider };
export default WishlistProvider;
