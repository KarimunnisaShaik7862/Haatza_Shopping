import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { CompactCategoryCard } from './CompactCategoryCard';
import { WOMENS_FASHION_MAJOR_SECTIONS } from '../../data/womensFashionNavigation.data';
import premiumWomensHeroBanner from '../../assets/images/womens-fashion/hero-banner.png';
import { TrendingProductsWidget } from '../home/widgets/TrendingProductsWidget';
import { FashionCampaignCarousel } from './FashionCampaignCarousel';
import { DealsOfTheDayWidget } from '../home/widgets/DealsOfTheDayWidget';
import { FashionOccasionGrid, OccasionItem } from './FashionOccasionGrid';
import { FashionBudgetStoreWidget } from './FashionBudgetStoreWidget';
import { MoreToExploreWidget } from '../home/widgets/MoreToExploreWidget';
import { productService } from '../../services/productService';
import { Product } from '../../types';

// Curated Occasion Collections for Women (Exactly 3 items matching reference design)
const WOMENS_OCCASION_ITEMS: OccasionItem[] = [
  {
    id: 'w-occ-festive',
    title: 'Festive Celebrations',
    subtitle: 'Banarasi silk sarees, Anarkalis & Kundan jewelry sets.',
    badge: 'HERITAGE',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    link: '/category/women-fashion/ethnic-wear/sarees',
  },
  {
    id: 'w-occ-casual-office',
    title: 'Everyday Casual & Office Wear',
    subtitle: 'Crisp poplin shirts, tailored trousers, casual tops & chic coordinates.',
    badge: 'CASUAL & OFFICE',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    link: '/category/women-fashion/western-wear',
  },
  {
    id: 'w-occ-party',
    title: 'Party & Evening Glamour',
    subtitle: 'Satin slip dresses, cocktail heels & statement chandbalis.',
    badge: 'GLAMOUR',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    link: '/category/women-fashion/dresses',
  },
];

export const WomensFashionDepartmentView: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [budgetProducts, setBudgetProducts] = useState<Product[]>([]);
  const [exploreProducts, setExploreProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadData() {
      const [trending, deals, budget, explore] = await Promise.all([
        productService.getWomensTrending(8),
        productService.getWomensDeals(8),
        productService.getWomensBudgetProducts(10),
        productService.getProductsByCategory('women-fashion', 50),
      ]);
      setTrendingProducts(trending);
      setDealsProducts(deals);
      setBudgetProducts(budget);
      setExploreProducts(explore);
    }
    loadData();
  }, []);

  const breadcrumbItems = [
    { label: "Women's Fashion" },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 01. Breadcrumb Hierarchy */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 02. Women's Fashion Hero Showcase Banner */}
      <section
        className="relative w-full overflow-hidden bg-transparent shadow-none border-0"
        aria-label="Premium Women's Fashion Hero Banner"
      >
        <img
          src={premiumWomensHeroBanner}
          alt="Premium Women's Fashion Hero Banner"
          className="w-full h-auto block select-none mix-blend-multiply"
          loading="eager"
          decoding="async"
        />
      </section>

      {/* 03. 7 Department Tiles (Circular Category Cards) */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-7 gap-2.5 sm:gap-3.5 lg:gap-4 no-scrollbar py-2 items-start justify-start sm:justify-between overscroll-x-contain">
        {WOMENS_FASHION_MAJOR_SECTIONS.map((section) => (
          <CompactCategoryCard
            key={section.id}
            id={section.id}
            name={section.title}
            image={section.image}
            link={`/category/women-fashion/${section.slug}`}
            accentColor={section.accentColor}
          />
        ))}
      </div>

      {/* 04. Section 1: Trending in Women's Fashion */}
      {trendingProducts.length > 0 && (
        <TrendingProductsWidget
          products={trendingProducts}
          title="Trending in Women's Fashion"
          subtitle="Customer-favorite sarees, kurtis, dresses, and handcrafted accessories."
          viewAllLink="/category/women-fashion/ethnic-wear"
        />
      )}

      {/* 05. Section 2: Fashion Promotional Campaign Carousel (After Trending) */}
      <FashionCampaignCarousel autoplayInterval={5500} />

      {/* 06. Section 3: Women's Deals of the Day */}
      {dealsProducts.length > 0 && (
        <DealsOfTheDayWidget
          deals={dealsProducts}
          title="Women's Deals of the Day"
          subtitle="Unbeatable limited-time festive price drops on verified women's fashion."
          viewAllLink="/category/women-fashion/ethnic-wear"
        />
      )}

      {/* 07. Section 4: Shop by Style & Occasion */}
      <FashionOccasionGrid
        title="Shop by Style & Occasion"
        subtitle="Find your look for every moment."
        items={WOMENS_OCCASION_ITEMS}
        variant="clean"
      />

      {/* 08. Section 5: Women's Budget Finds */}
      {budgetProducts.length > 0 && (
        <FashionBudgetStoreWidget
          products={budgetProducts}
          priceLabel="UNDER ₹599"
          storeLabel="WOMEN'S VALUE FINDS"
          description="Affordable earrings, cotton scarves, hair accessories, and everyday tops."
          exploreLink="/category/women-fashion/ethnic-wear"
        />
      )}

      {/* 09. Section 6: More to Explore in Women's Fashion (Vertical Product Grid with Infinite Scroll) */}
      {exploreProducts.length > 0 && (
        <MoreToExploreWidget
          products={exploreProducts}
          title="More to Explore in Women's Fashion"
          subtitle="Curated new arrivals, footwear, and designer handbags handpicked for you."
          eyebrow="Women's Style Picks"
          viewAllLink="/category/women-fashion/ethnic-wear"
          layout="vertical-grid"
          enableInfiniteScroll={true}
          categoryContext="women-fashion"
        />
      )}
    </div>
  );
};

export default WomensFashionDepartmentView;
