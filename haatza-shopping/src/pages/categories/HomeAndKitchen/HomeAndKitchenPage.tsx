import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { productService } from '../../../services/productService';
import { ProductGrid } from '../../../components/products/ProductGrid';
import { SectionHeading } from '../../../components/common/SectionHeading';
import { Loading } from '../../../components/common/Loading';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';

export const HomeAndKitchenPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProductsByCategory('home-living', 20);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <PageContainer className="py-6">
      <Breadcrumbs items={[{ label: 'Categories', link: '/products' }, { label: 'Home & Kitchen' }]} className="mb-4" />
      <SectionHeading
        title="Home, Living & Smart Kitchenware"
        subtitle="Egyptian cotton bedsheets, air fryers, ambient lamps, and cookware."
        badge="HOME ESSENTIALS"
      />
      {loading ? (
        <Loading type="grid" count={8} />
      ) : (
        <ProductGrid products={products} />
      )}
    </PageContainer>
  );
};

export default HomeAndKitchenPage;
