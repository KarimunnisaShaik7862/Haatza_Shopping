import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { productService } from '../../../services/productService';
import { ProductGrid } from '../../../components/products/ProductGrid';
import { SectionHeading } from '../../../components/common/SectionHeading';
import { Loading } from '../../../components/common/Loading';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';

export const GroceryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProductsByCategory('groceries', 20);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <PageContainer className="py-6">
      <Breadcrumbs items={[{ label: 'Categories', link: '/products' }, { label: 'Daily Groceries' }]} className="mb-4" />
      <SectionHeading
        title="Daily Groceries & Pantry Staples"
        subtitle="Fresh fruits, organic veggies, dairy produce, and pantry staples in 10-15 minutes."
        badge="10-15 MIN EXPRESS"
      />
      {loading ? (
        <Loading type="grid" count={8} />
      ) : (
        <ProductGrid products={products} />
      )}
    </PageContainer>
  );
};

export default GroceryPage;
