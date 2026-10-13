import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, HomeService } from '../types';

interface ActivityContextType {
  viewedProducts: Product[];
  viewedServices: HomeService[];
  recentSearches: string[];
  visitedCategories: string[];
  recordProductView: (product: Product) => void;
  recordServiceView: (service: HomeService) => void;
  recordSearch: (query: string) => void;
  recordCategoryVisit: (categorySlug: string) => void;
  clearSearches: () => void;
}

const ACTIVITY_STORAGE_KEY = 'haatza_user_activity';

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewedProducts, setViewedProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(`${ACTIVITY_STORAGE_KEY}_products`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [viewedServices, setViewedServices] = useState<HomeService[]>(() => {
    try {
      const stored = localStorage.getItem(`${ACTIVITY_STORAGE_KEY}_services`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${ACTIVITY_STORAGE_KEY}_searches`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [visitedCategories, setVisitedCategories] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`${ACTIVITY_STORAGE_KEY}_categories`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(`${ACTIVITY_STORAGE_KEY}_products`, JSON.stringify(viewedProducts));
    } catch (e) {
      console.error(e);
    }
  }, [viewedProducts]);

  useEffect(() => {
    try {
      localStorage.setItem(`${ACTIVITY_STORAGE_KEY}_services`, JSON.stringify(viewedServices));
    } catch (e) {
      console.error(e);
    }
  }, [viewedServices]);

  useEffect(() => {
    try {
      localStorage.setItem(`${ACTIVITY_STORAGE_KEY}_searches`, JSON.stringify(recentSearches));
    } catch (e) {
      console.error(e);
    }
  }, [recentSearches]);

  useEffect(() => {
    try {
      localStorage.setItem(`${ACTIVITY_STORAGE_KEY}_categories`, JSON.stringify(visitedCategories));
    } catch (e) {
      console.error(e);
    }
  }, [visitedCategories]);

  const recordProductView = (product: Product) => {
    setViewedProducts((prev) => {
      const next = [product, ...prev.filter((p) => p.id !== product.id)].slice(0, 10);
      return next;
    });
  };

  const recordServiceView = (service: HomeService) => {
    setViewedServices((prev) => {
      const next = [service, ...prev.filter((s) => s.id !== service.id)].slice(0, 8);
      return next;
    });
  };

  const recordSearch = (query: string) => {
    const q = query.trim();
    if (!q) return;
    setRecentSearches((prev) => {
      const next = [q, ...prev.filter((s) => s.toLowerCase() !== q.toLowerCase())].slice(0, 8);
      return next;
    });
  };

  const recordCategoryVisit = (categorySlug: string) => {
    if (!categorySlug) return;
    setVisitedCategories((prev) => {
      const next = [categorySlug, ...prev.filter((c) => c !== categorySlug)].slice(0, 6);
      return next;
    });
  };

  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(`${ACTIVITY_STORAGE_KEY}_searches`);
  };

  return (
    <ActivityContext.Provider
      value={{
        viewedProducts,
        viewedServices,
        recentSearches,
        visitedCategories,
        recordProductView,
        recordServiceView,
        recordSearch,
        recordCategoryVisit,
        clearSearches,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    return {
      viewedProducts: [],
      viewedServices: [],
      recentSearches: [],
      visitedCategories: [],
      recordProductView: () => {},
      recordServiceView: () => {},
      recordSearch: () => {},
      recordCategoryVisit: () => {},
      clearSearches: () => {},
    };
  }
  return context;
};
