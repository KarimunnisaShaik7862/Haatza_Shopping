import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HaatzaLiteCategory, HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { haatzaLiteService } from '../../services/haatzaLiteService';
import { HaatzaLiteProductGrid } from '../../components/HaatzaLiteProducts/HaatzaLiteProductGrid';
import { HaatzaLiteLoading } from '../../components/common/HaatzaLiteLoading';
import { HaatzaLiteEmptyState } from '../../components/common/HaatzaLiteEmptyState';
import { Sparkles, Layers } from 'lucide-react';

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
            name: 'All Groceries & Essentials',
            iconName: 'LayoutGrid',
            image: '',
            itemCount: allProds.length,
            description: 'All 10-15 minute quick grocery essentials delivered fresh to your door.',
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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 sm:py-8 space-y-6">
      {/* Category Header Banner with Glassmorphism */}
      <div className="bg-gradient-to-r from-white via-[#F2FBF4] to-white rounded-3xl p-6 sm:p-8 border border-[#CBEAD2] shadow-[0_4px_20px_rgba(12,131,31,0.05)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#0C831F]/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SUPERFAST AISLE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#111D15] tracking-tight font-heading">
              {currentCategory?.name || 'Aisles'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mt-1">
              {currentCategory?.description || 'Browse fresh daily essentials dispatched in 10-15 minutes.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#0C831F] bg-white px-3.5 py-2 rounded-2xl border border-[#CBEAD2] shadow-2xs">
            <Layers className="w-4 h-4" />
            <span>{products.length} Items Available</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills Header */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <Link
          to="/lite/categories"
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 shrink-0 cursor-pointer ${
            activeSlug === 'all'
              ? 'bg-[#0C831F] text-white shadow-[0_3px_12px_rgba(12,131,31,0.3)] border border-[#09711A] scale-[1.02]'
              : 'bg-white border border-[#E5EBE6] text-[#111D15] hover:border-[#0C831F]/50 hover:bg-[#F2FBF4] hover:text-[#0C831F]'
          }`}
        >
          All Aisles
        </Link>
        {categories
          .filter((c) => c.slug !== 'all')
          .map((cat) => (
            <Link
              key={cat.id}
              to={`/lite/categories/${cat.slug}`}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-200 shrink-0 cursor-pointer ${
                activeSlug === cat.slug
                  ? 'bg-[#0C831F] text-white shadow-[0_3px_12px_rgba(12,131,31,0.3)] border border-[#09711A] scale-[1.02]'
                  : 'bg-white border border-[#E5EBE6] text-[#111D15] hover:border-[#0C831F]/50 hover:bg-[#F2FBF4] hover:text-[#0C831F]'
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
