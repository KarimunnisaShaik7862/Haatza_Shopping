import React, { useMemo } from 'react';
import { Flame } from 'lucide-react';
import { DealEndingItem } from '../../services/mock/data/promotions';
import { ProductCard } from '../products/ProductCard';
import { ProductCarouselTrack } from './ProductCarouselTrack';
import { CountdownClock } from './CountdownClock';
import { Product } from '../../types';

interface DealsEndingSoonProps {
  deals: DealEndingItem[];
  onQuickView?: (product: Product) => void;
}

export const DealsEndingSoonSection: React.FC<DealsEndingSoonProps> = React.memo(({
  deals,
  onQuickView,
}) => {
  // Memoize stable product representations so references don't churn on parent re-renders
  const dealProducts = useMemo(() => {
    if (!deals) return [];
    return deals.map((deal) => {
      const productRepresentation: Product = {
        id: deal.id,
        slug: deal.slug,
        name: deal.name,
        brand: deal.brand,
        destination: 'haatza',
        categoryId: 'cat-fashion',
        categoryName: deal.categoryName,
        description: deal.name,
        fullDescription: deal.name,
        price: deal.offerPrice,
        mrp: deal.originalPrice,
        discountPercentage: deal.discountPercentage,
        rating: deal.rating,
        reviewCount: deal.reviewCount,
        stock: deal.stockLeft,
        inStock: true,
        images: [deal.mainImage],
        mainImage: deal.mainImage,
        tags: ['Deal'],
        sellerName: deal.brand,
        sellerRating: deal.rating,
        deliveryDays: 2,
      };
      return { deal, productRepresentation };
    });
  }, [deals]);

  if (!deals || deals.length === 0) return null;

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs space-y-4" aria-label="Hurry Deals Ending Soon">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2962FF] to-[#1E40AF] text-white flex items-center justify-center shadow-soft-sm">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight font-heading">
                Hurry! Deals Ending Soon
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-[10px] font-black uppercase tracking-wider font-heading">
                Limited Time Offers
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5 font-body">
              Your next great deal won't wait. Grab extraordinary price drops before time runs out.
            </p>
          </div>
        </div>

        {/* Live Countdown Pill - isolated leaf component */}
        <CountdownClock
          initialHours={4}
          initialMinutes={28}
          initialSeconds={45}
          variant="boxed"
          label="Ends In:"
        />
      </div>

      {/* Standardized Carousel with Left/Right Edge Navigation Arrows */}
      <ProductCarouselTrack>
        {dealProducts.map(({ deal, productRepresentation }) => (
          <div key={deal.id} className="w-[210px] sm:w-[240px] md:w-[260px] shrink-0">
            <ProductCard
              product={productRepresentation}
              dealBadge={deal.badge}
              stockLeft={deal.stockLeft}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </ProductCarouselTrack>
    </section>
  );
});

DealsEndingSoonSection.displayName = 'DealsEndingSoonSection';
