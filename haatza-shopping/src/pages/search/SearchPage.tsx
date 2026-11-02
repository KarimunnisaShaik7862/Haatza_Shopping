import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import { UnifiedSearchResultsView, GenericSearchResultProduct } from '@/components/search/UnifiedSearchResultsView';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      try {
        const results = await productService.searchProducts(query, 'haatza');
        const shoppingOnly = results.filter(
          (p) => p.destination === 'haatza' || (!p.destination && (p as any).destination !== 'lite' && (p as any).destination !== 'nest')
        );
        setProducts(shoppingOnly);
      } catch (e) {
        console.error('Search failed', e);
      } finally {
        setLoading(false);
      }
    }
    doSearch();
  }, [query]);

  const getCartQuantity = (productId: string) => {
    const item = cart.find((c) => c.productId === productId || c.product?.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: GenericSearchResultProduct, qty: number) => {
    const original = products.find((p) => p.id === product.id);
    if (original) {
      addToCart(original, qty);
    }
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    const item = cart.find((c) => c.productId === productId || c.product?.id === productId);
    if (item) {
      if (qty <= 0) {
        removeFromCart(item.id);
      } else {
        updateQuantity(item.id, qty);
      }
    } else {
      const original = products.find((p) => p.id === productId);
      if (original && qty > 0) {
        addToCart(original, qty);
      }
    }
  };

  const handleProductClick = (product: GenericSearchResultProduct) => {
    navigate(`/product/${product.slug || product.id}`);
  };

  const handleSearchChange = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <UnifiedSearchResultsView
      platform="shopping"
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

export default SearchPage;
