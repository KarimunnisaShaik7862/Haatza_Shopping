import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductRatingSummary } from './ProductRatingSummary';
import { ProductCustomerFeedback } from './ProductCustomerFeedback';
import { ProductCustomerPhotosCollage, CustomerPhotoMeta } from './ProductCustomerPhotosCollage';
import { ProductReviewsList } from './ProductReviewsList';
import { getProductReviews } from './productDetailHelper';

interface ProductRatingsAndReviewsProps {
  product: Product;
}

export const ProductRatingsAndReviews: React.FC<ProductRatingsAndReviewsProps> = ({ product }) => {
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Extract customer photos and metadata from product reviews
  const reviews = getProductReviews(product);
  const photos: string[] = [];
  const photoMetaList: CustomerPhotoMeta[] = [];

  reviews.forEach((r) => {
    if (r.images && r.images.length > 0) {
      r.images.forEach((img) => {
        if (!photos.includes(img)) {
          photos.push(img);
          photoMetaList.push({
            url: img,
            userName: r.userName,
            rating: r.rating,
            date: r.date,
            comment: r.comment,
          });
        }
      });
    }
  });

  return (
    <section id="ratings-and-reviews" className="w-full pt-8 sm:pt-10 space-y-9 scroll-mt-24">
      {/* Side-by-Side: Ratings & Customer Feedback (Left) and What Customers Like (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left: Ratings & Customer Feedback */}
        <div className="lg:col-span-7 xl:col-span-7">
          <ProductRatingSummary
            product={product}
            onWriteReviewClick={() => setIsWriteModalOpen(true)}
            selectedRatingFilter={selectedRatingFilter}
            onSelectRatingFilter={(stars) => setSelectedRatingFilter(stars)}
          />
        </div>

        {/* Right: What Customers Like */}
        <div className="lg:col-span-5 xl:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <ProductCustomerFeedback product={product} />
        </div>
      </div>

      {/* Customer-Uploaded Photos (Dynamic Collage Layout) */}
      <ProductCustomerPhotosCollage
        photos={photos}
        photoMetaList={photoMetaList}
      />

      {/* Customer Reviews and written feedback (Single Horizontal Row Carousel) */}
      <ProductReviewsList
        product={product}
        isWriteModalOpen={isWriteModalOpen}
        onCloseWriteModal={() => setIsWriteModalOpen(false)}
        onOpenWriteModal={() => setIsWriteModalOpen(true)}
        selectedRatingFilter={selectedRatingFilter}
        onSelectRatingFilter={(stars) => setSelectedRatingFilter(stars)}
      />
    </section>
  );
};
