import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HaatzaLiteCategory, HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { haatzaLiteService } from '../../services/haatzaLiteService';
import { HaatzaLiteProductGrid } from '../../components/HaatzaLiteProducts/HaatzaLiteProductGrid';
import { HaatzaLiteLoading } from '../../components/common/HaatzaLiteLoading';
import { HaatzaLiteEmptyState } from '../../components/common/HaatzaLiteEmptyState';

export const HaatzaLiteCategoriesPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const activeSlug = slug || 'all';

  const [categories, setCategories] = useState<HaatzaLiteCategory[]>([]);
  const [products, setProducts] = useState<HaatzaLiteProduct[]>([]);
  const [currentCategory, setCurrentCategory] = useState<HaatzaLiteCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const cats = await haatzaLiteService.getCategories();
        setCategories(cats);

        if (activeSlug === 'all') {
          const allProds = await haatzaLiteService.getAllProducts();
          setProducts(allProds);
          setCurrentCategory({
            id: 'all',
            slug: 'all',
            name: 'All Groceries',
            iconName: 'LayoutGrid',
            image: '',
            itemCount: allProds.length,
            description: 'All 10-15 minute quick grocery essentials delivered to your door.',
          });
        } else {
          const cat = await haatzaLiteService.getCategoryBySlug(activeSlug);
          setCurrentCategory(cat);
          const prods = await haatzaLiteService.getProductsByCategory(activeSlug, 50);
          setProducts(prods);
        }
      } catch (e) {
        console.error('Failed loading categories', e);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [activeSlug]);

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 space-y-6">
      {/* Category Pills Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          to="/lite/categories"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeSlug === 'all'
              ? 'bg-[#238636] text-white shadow-sm'
              : 'bg-white border border-zinc-200 text-zinc-700 hover:border-emerald-300'
          }`}
        >
          All Items
        </Link>
        {categories
          .filter((c) => c.slug !== 'all')
          .map((cat) => (
            <Link
              key={cat.id}
              to={`/lite/categories/${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeSlug === cat.slug
                  ? 'bg-[#238636] text-white shadow-sm'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:border-emerald-300'
              }`}
            >
              {cat.name}
            </Link>
          ))}
      </div>

      {loading ? (
        <HaatzaLiteLoading type="grid" count={6} />
      ) : products.length === 0 ? (
        <HaatzaLiteEmptyState
          title={`No items in ${currentCategory?.name || 'this category'}`}
          description="Check back shortly or explore other aisles."
          actionText="All Groceries"
          actionLink="/lite/categories"
        />
      ) : (
        <HaatzaLiteProductGrid
          products={products}
          title={currentCategory?.name || 'Products'}
          subtitle={currentCategory?.description}
        />
      )}
    </div>
  );
};
