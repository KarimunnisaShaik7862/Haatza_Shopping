import React, { useRef, useState, useLayoutEffect } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { DealProductCard } from '../products/DealProductCard';
import {
  TRENDING_IN_MENS_FASHION_PRODUCTS,
  TRENDING_IN_MENS_FASHION_8_PRODUCTS,
} from '../../data/mensFashionProducts.data';

interface MensTrendingFashionSectionProps {
  className?: string;
}

/**
 * MensTrendingFashionSection
 * 
 * Recreates the Trending in Men's Fashion section with:
 * 1. Product cards matching the exact dimensions, aspect ratio, typography,
 *    and button styling of the Men's Deal of the Day section via DealProductCard.
 * 2. Responsive 3 or 4 cards per row depending on available container width,
 *    never stretching or shrinking cards beyond standard dimensions (212px max).
 * 3. Right-side male model image dynamically matching the exact rendered height
 *    of the two product rows (row 1 + gap + row 2), with 100% alpha transparency
 *    and zero wasted canvas padding.
 */
export const MensTrendingFashionSection: React.FC<MensTrendingFashionSectionProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [gridHeight, setGridHeight] = useState<number | undefined>(undefined);
  const [columnCount, setColumnCount] = useState<number>(3);

  useLayoutEffect(() => {
    const handleLayoutUpdate = () => {
      // 1. Measure product grid rendered height
      if (gridRef.current) {
        const height = gridRef.current.offsetHeight;
        if (height > 0) {
          setGridHeight(height);
        }
      }

      // 2. Measure available container width and decide 3 or 4 columns
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        
        // Standard card width = 212px, gap = 16px, column gap = 28px
        // Trimmed model aspect ratio = 572 / 1144 = 0.50
        const estimatedGridHeight = gridRef.current?.offsetHeight || 700;
        const estimatedModelWidth = Math.round(estimatedGridHeight * 0.50);
        const availableGridWidth = containerWidth - estimatedModelWidth - 28;

        // 4 cards need: 4 * 212 + 3 * 16 = 896px
        // 3 cards need: 3 * 212 + 2 * 16 = 668px
        if (containerWidth >= 1260 && availableGridWidth >= 896) {
          setColumnCount(4);
        } else if (containerWidth >= 960 && availableGridWidth >= 668) {
          setColumnCount(3);
        } else if (containerWidth >= 600) {
          setColumnCount(2);
        } else {
          setColumnCount(1);
        }
      }
    };

    handleLayoutUpdate();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        handleLayoutUpdate();
      });
      if (containerRef.current) observer.observe(containerRef.current);
      if (gridRef.current) observer.observe(gridRef.current);
    }

    window.addEventListener('resize', handleLayoutUpdate);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleLayoutUpdate);
    };
  }, []);

  // Determine products to display: 4 cols = 8 cards (2 rows of 4); otherwise 6 cards (2 rows of 3)
  const displayProducts =
    columnCount === 4
      ? TRENDING_IN_MENS_FASHION_8_PRODUCTS
      : columnCount === 2
      ? TRENDING_IN_MENS_FASHION_PRODUCTS.slice(0, 4)
      : TRENDING_IN_MENS_FASHION_PRODUCTS;

  return (
    <section
      aria-label="Trending in Men's Fashion"
      className={`w-full bg-white py-6 sm:py-8 lg:py-10 ${className}`}
    >
      {/* =========================================================================
          01. STANDARDIZED SECTION HEADING & DESCRIPTION (Unified Design System)
          ========================================================================= */}
      <SectionHeader
        title="Trending in Men's Fashion"
        highlightWord="Trending"
        subtitle="Curated collection of streetwear, casuals, jackets, sneakers and more."
        className="mb-6 sm:mb-8"
      />

      {/* =========================================================================
          02. CONTENT ROW: 2-Row Product Grid (Left) + Matched-Height Model (Right)
          ========================================================================= */}
      <div
        ref={containerRef}
        className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 xl:gap-8"
      >
        {/* Left Column: Product Grid with exact Deal of the Day card dimensions */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columnCount}, minmax(0, 212px))`,
            gap: '16px',
            justifyContent: columnCount >= 3 ? 'start' : 'center',
          }}
          className="w-full lg:w-auto"
        >
          {displayProducts.map((product) => (
            <DealProductCard
              key={product.id}
              product={product}
              showRating={true}
            />
          ))}
        </div>

        {/* Right Column: Male Fashion Model Image
            - Height dynamically matches the 2-row product grid on the left
            - Model fills full height with zero unwanted canvas padding
            - Aspect ratio preserved, full head, cap, stool, and sneakers visible
            - 100% transparent PNG with NO checkerboard or background box */}
        <div
          className="w-full lg:w-auto flex items-end justify-center shrink-0 pt-4 lg:pt-0"
          style={{
            height: gridHeight ? `${gridHeight}px` : 'auto',
            width: gridHeight ? `${Math.round(gridHeight * (572 / 1144))}px` : 'auto',
          }}
        >
          <img
            src="/images/mens-fashion/trending-model.png"
            alt="Trending in Men's Fashion Male Model in Sporty Tracksuit"
            style={{
              height: gridHeight ? `${gridHeight}px` : 'auto',
              maxHeight: gridHeight ? `${gridHeight}px` : '100%',
              width: 'auto',
            }}
            className="h-full w-auto object-contain object-bottom select-none drop-shadow-xs"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default MensTrendingFashionSection;
