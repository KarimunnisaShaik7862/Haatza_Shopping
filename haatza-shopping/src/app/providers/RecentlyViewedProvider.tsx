import React from 'react';
import { RecentlyViewedProvider as BaseRecentlyViewedProvider } from '../../context/RecentlyViewedContext';

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseRecentlyViewedProvider>{children}</BaseRecentlyViewedProvider>;
};

export default RecentlyViewedProvider;
