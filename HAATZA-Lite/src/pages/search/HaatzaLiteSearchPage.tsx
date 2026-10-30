import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { haatzaLiteService } from '../../services/haatzaLiteService';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { UnifiedSearchResultsView, GenericSearchResultProduct } from '@/components/search/UnifiedSearchResultsView';

export const HaatzaLiteSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<HaatzaLiteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      try {
        const results = await haatzaLiteService.searchProducts(query);
        const liteOnly = results.filter(
          (p: any) => p.destination !== 'haatza' && p.destination !== 'nest'
        );
        setProducts(liteOnly);
      } catch (e) {
        console.error('Search failed', e);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  const getCartQuantity = (productId: string) => {
    const item = cart.find((c) => c.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: GenericSearchResultProduct, qty: number) => {
    const original = products.find((p) => p.id === product.id);
    if (original) {
      addToCart(original, qty);
    }
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    const item = cart.find((c) => c.productId === productId);
    if (item) {
      updateQuantity(item.id, qty);
    } else {
      const original = products.find((p) => p.id === productId);
      if (original && qty > 0) {
        addToCart(original, qty);
      }
    }
  };

  const handleProductClick = (product: GenericSearchResultProduct) => {
    navigate(`/lite/product/${product.id || product.slug}`);
  };

  const handleSearchChange = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <UnifiedSearchResultsView
      platform="lite"
      query={query}
      products={products}
      loading={loading}
      getCartQuantity={getCartQuantity}
      onAddToCart={handleAddToCart}
      onUpdateQuantity={handleUpdateQuantity}
      onProductClick={handleProductClick}
      onSearchChange={handleSearchChange}
    />
  );
};

export default HaatzaLiteSearchPage;
