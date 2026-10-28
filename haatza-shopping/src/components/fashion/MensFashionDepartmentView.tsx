import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { CompactCategoryCard } from './CompactCategoryCard';
import { MENS_FASHION_MAJOR_SECTIONS } from '../../data/mensFashionNavigation.data';
import premiumMensStyleBanner from '../../assets/images/mens-fashion/premium-mens-fashion-style-banner.png';
import { MensTrendingFashionSection } from './MensTrendingFashionSection';
import { DealsOfTheDayWidget } from '../home/widgets/DealsOfTheDayWidget';
import { FashionOccasionGrid, OccasionItem } from './FashionOccasionGrid';
import { FashionBudgetStoreWidget } from './FashionBudgetStoreWidget';
import { MoreToExploreWidget } from '../home/widgets/MoreToExploreWidget';
import { productService } from '../../services/productService';
import { Product } from '../../types';



// Curated Occasion Collections for Men
const MENS_OCCASION_ITEMS: OccasionItem[] = [
  {
    id: 'men-occ-office',
    title: 'Executive Office Wear',
    subtitle: 'Crisp Oxford shirts, formal trousers & structured blazers.',
    badge: '9 TO 5 SHARP',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    link: '/category/men-fashion/clothing/shirts',
  },
  {
    id: 'men-occ-weekend',
    title: 'Weekend Casuals',
    subtitle: 'Breathable cotton tees, relaxed denim & easy polo shirts.',
    badge: 'OFF DUTY',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    link: '/category/men-fashion/clothing/t-shirts',
  },
  {
    id: 'men-occ-festive',
    title: 'Festive & Celebration',
    subtitle: 'Regal silk kurtas, Nehru jackets & coordinated ethnic sets.',
    badge: 'TRADITION',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    link: '/category/men-fashion/clothing/kurtas',
  },
  {
    id: 'men-occ-active',
    title: 'Athleisure & Training',
    subtitle: 'Moisture-wicking track pants, gym shorts & runners.',
    badge: 'ACTIVEWEAR',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80',
    link: '/category/men-fashion/clothing/track-pants',
  },
];

export const MensFashionDepartmentView: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [budgetProducts, setBudgetProducts] = useState<Product[]>([]);
  const [exploreProducts, setExploreProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      const [trending, deals, budget, explore] = await Promise.all([
        productService.getMensTrending(8),
        productService.getMensDeals(8),
        productService.getMensBudgetProducts(10),
        productService.getProductsByCategory('men-fashion', 50),
      ]);
      setTrendingProducts(trending);
      setDealsProducts(deals);
      setBudgetProducts(budget);
      setExploreProducts(explore);
    }
    loadData();
  }, []);

  const breadcrumbItems = [
    { label: 'Men Fashion' },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 01. Breadcrumb Hierarchy */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 02. Existing Premium Men's Fashion Style Banner */}
      <section
        className="relative w-full overflow-hidden bg-transparent shadow-none border-0"
        aria-label="Premium Men's Fashion Style Banner"
      >
        <img
          src={premiumMensStyleBanner}
          alt="Premium Men's Fashion Style Banner"
          className="w-full h-auto block select-none mix-blend-multiply"
          loading="eager"
          decoding="async"
        />
      </section>

      {/* 03. Existing Compact Circular Category Navigation (7 Departments PRESERVED) */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-7 gap-2.5 sm:gap-3.5 lg:gap-4 no-scrollbar py-2 items-start justify-start sm:justify-between overscroll-x-contain">
        {MENS_FASHION_MAJOR_SECTIONS.map((section) => (
          <CompactCategoryCard
            key={section.id}
            id={section.id}
            name={section.title}
            image={section.image}
            link={`/category/men-fashion/${section.slug}`}
            accentColor={section.accentColor}
          />
        ))}
      </div>



      {/* 05. Section B: Trending in Men's Fashion (Recreated Exactly from Reference Design) */}
      <MensTrendingFashionSection />

      {/* 06. Section C: Men's Deals of the Day */}
      {dealsProducts.length > 0 && (
        <DealsOfTheDayWidget
          deals={dealsProducts}
          title="Men's Deals of the Day"
          subtitle="Unbeatable limited-time price drops on top menswear essentials."
          viewAllLink="/category/men-fashion/clothing"
        />
      )}

      {/* 07. Section D: Shop by Style or Occasion */}
      <FashionOccasionGrid
        title="Shop by Style or Occasion"
        subtitle="Office wear, weekend casuals, festive wear, and high-performance activewear."
        items={MENS_OCCASION_ITEMS}
      />

      {/* 08. Section E: Men's Budget Store */}
      {budgetProducts.length > 0 && (
        <FashionBudgetStoreWidget
          products={budgetProducts}
          priceLabel="UNDER ₹499"
          storeLabel="MEN'S VALUE FINDS"
          description="Quality cotton socks, vests, boxers, and accessories at accessible prices."
          exploreLink="/category/men-fashion/clothing"
        />
      )}

      {/* 09. Section F: More to Explore in Men's Fashion (Vertical Product Grid with Infinite Scroll) */}
      {exploreProducts.length > 0 && (
        <MoreToExploreWidget
          products={exploreProducts}
          title="More to Explore in Men's Fashion"
          subtitle="Curated new drops, footwear, and accessories handpicked for you."
          eyebrow="Men's Style Picks"
          viewAllLink="/category/men-fashion/clothing"
          layout="vertical-grid"
          enableInfiniteScroll={true}
          categoryContext="men-fashion"
        />
      )}
    </div>
  );
};

export default MensFashionDepartmentView;
