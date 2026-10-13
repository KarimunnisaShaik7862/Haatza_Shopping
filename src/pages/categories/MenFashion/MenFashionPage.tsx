import React, { useEffect, useState } from 'react';
import { Product } from '../../../types';
import { productService } from '../../../services/productService';
import { ProductGrid } from '../../../components/products/ProductGrid';
import { SectionHeading } from '../../../components/common/SectionHeading';
import { Loading } from '../../../components/common/Loading';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';

export const MenFashionPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProductsByCategory('fashion', 20);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <PageContainer className="py-6">
      <Breadcrumbs items={[{ label: 'Categories', link: '/products' }, { label: "Men's Fashion" }]} className="mb-4" />
      <SectionHeading
        title="Men's Fashion & Lifestyle"
        subtitle="Artisan pure linen shirts, tailored kurtas, denim, and sneakers."
        badge="CURATED COLLECTION"
      />
      {loading ? (
        <Loading type="grid" count={8} />
      ) : (
        <ProductGrid products={products} />
      )}
    </PageContainer>
  );
};

export default MenFashionPage;
