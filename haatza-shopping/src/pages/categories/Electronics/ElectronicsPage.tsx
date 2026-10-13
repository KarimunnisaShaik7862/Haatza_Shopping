import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { productService } from '../../../services/productService';
import { ProductGrid } from '../../../components/products/ProductGrid';
import { SectionHeading } from '../../../components/common/SectionHeading';
import { Loading } from '../../../components/common/Loading';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';

export const ElectronicsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProductsByCategory('electronics', 20);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <PageContainer className="py-6">
      <Breadcrumbs items={[{ label: 'Categories', link: '/products' }, { label: 'Electronics & Audio' }]} className="mb-4" />
      <SectionHeading
        title="Next-Gen Electronics & Hi-Res Audio"
        subtitle="Hybrid ANC headphones, smartphones, wearables, and fast accessories."
        badge="TOP TECH"
      />
      {loading ? (
        <Loading type="grid" count={8} />
      ) : (
        <ProductGrid products={products} />
      )}
    </PageContainer>
  );
};

export default ElectronicsPage;
