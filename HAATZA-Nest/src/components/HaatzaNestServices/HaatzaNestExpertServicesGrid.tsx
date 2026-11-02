import React from 'react';
import { HaatzaNestHomeService } from '../../types/haatzaNest.types';

import imgMealAssistance from '../../assets/services/nest_meal_assistance.jpg';
import imgBathroomCleaning from '../../assets/services/nest_bathroom_cleaning.jpg';
import imgLaundryIroning from '../../assets/services/nest_laundry_ironing.jpg';
import imgDishwashing from '../../assets/services/nest_dishwashing.jpg';
import imgHomeCleaning from '../../assets/services/home-cleaning.webp';
import imgHomeCare from '../../assets/services/nest_home_care.jpg';

export interface ExpertServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  priceTag: string;
  serviceSlug: string;
}

const EXPERT_SERVICES: ExpertServiceItem[] = [
  {
    id: 'exp-meal',
    name: 'Meal Assistance',
    category: 'Kitchen & Meal Prep',
    description: 'Fresh ingredient prep, vegetable chopping, and healthy cooking support tailored to your taste.',
    image: imgMealAssistance,
    priceTag: 'From ₹149',
    serviceSlug: 'meal-assistance',
  },
  {
    id: 'exp-bathroom',
    name: 'Bathroom Cleaning',
    category: 'Sanitation & Hygiene',
    description: 'Thorough tile descaling, toilet disinfection, and fixture polishing for sparkling hygiene.',
    image: imgBathroomCleaning,
    priceTag: 'From ₹299',
    serviceSlug: 'bathroom-cleaning',
  },
  {
    id: 'exp-laundry',
    name: 'Laundry & Ironing',
    category: 'Garment & Fabric Care',
    description: 'Careful fabric sorting, machine wash handling, and neat drying & wardrobe organization.',
    image: imgLaundryIroning,
    priceTag: 'From ₹199',
    serviceSlug: 'laundry-ironing',
  },
  {
    id: 'exp-dishwashing',
    name: 'Dishwashing',
    category: 'Kitchen Cleaning',
    description: 'Grease-free utensil cleaning, sink sanitation, and spotless sparkling tableware wash.',
    image: imgDishwashing,
    priceTag: 'From ₹99',
    serviceSlug: 'utensil-cleaning',
  },
  {
    id: 'exp-homecleaning',
    name: 'Home Cleaning',
    category: 'Full House Cleaning',
    description: 'Deep house cleaning, floor scrubbing, vacuuming, and complete home sanitization.',
    image: imgHomeCleaning,
    priceTag: 'From ₹499',
    serviceSlug: 'home-cleaning',
  },
  {
    id: 'exp-homecare',
    name: 'Home Care & More',
    category: 'Complete Living Care',
    description: 'Surface dusting, living room upkeep, decluttering, and refreshing daily chore relief.',
    image: imgHomeCare,
    priceTag: 'From ₹199',
    serviceSlug: 'home-cleaning',
  },
];

interface HaatzaNestExpertServicesGridProps {
  onSelectService?: (service: HaatzaNestHomeService | { slug: string; name: string }) => void;
  className?: string;
}

export const HaatzaNestExpertServicesGrid: React.FC<HaatzaNestExpertServicesGridProps> = ({
  onSelectService,
  className = '',
}) => {
  return (
    <section 
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 ${className}`}
      aria-labelledby="expert-service-heading"
    >
      {/* Scoped CSS for Service Title Inward Reveal Animation */}
      <style>{`
        .nest-service-title-container {
          transform: translateY(calc(100% + 24px));
          opacity: 0;
          transition: transform 700ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
          pointer-events: none;
        }

        /* Desktop Hover: Smoothly slide title inward from outside card boundary */
        @media (hover: hover) and (pointer: fine) {
          .group:hover .nest-service-title-container,
          .group:focus-within .nest-service-title-container {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
        }

        /* Touch Devices: Keep service names visible and accessible without requiring hover */
        @media (hover: none) or (pointer: coarse) {
          .nest-service-title-container {
            transform: translateY(0) !important;
            opacity: 1 !important;
            pointer-events: auto;
          }
        }

        /* Reduced Motion Accessibility Settings */
        @media (prefers-reduced-motion: reduce) {
          .nest-service-title-container {
            transition: none !important;
            transform: translateY(0) !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <div className="max-w-[1040px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 
            id="expert-service-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E0E3E] font-heading tracking-tight"
          >
            Easy Booking. Expert Service.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#625D6E] font-medium mt-1.5 max-w-xl mx-auto">
            Book certified, background-verified domestic specialists for on-demand home tasks with complete peace of mind.
          </p>
        </div>

        {/* 3-Column x 2-Row Clean Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 items-stretch">
          {EXPERT_SERVICES.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectService?.({ slug: item.serviceSlug, name: item.name })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectService?.({ slug: item.serviceSlug, name: item.name });
                }
              }}
              aria-label={`Book ${item.name}`}
              title={`Book ${item.name}`}
              className="group relative cursor-pointer select-none rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden border-2 border-[#D8C7F5] bg-[#FAF8FD] p-1 sm:p-1.5 shadow-[0_4px_16px_rgba(112,39,201,0.06)] hover:border-[#7027C9]/60 hover:shadow-[0_10px_26px_rgba(112,39,201,0.12)] transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7027C9] focus-visible:ring-offset-2"
            >
              <div 
                className="w-full h-full rounded-[14px] sm:rounded-[18px] lg:rounded-[22px] overflow-hidden bg-white flex items-center justify-center relative"
                style={{ aspectRatio: '288 / 398' }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-contain select-none"
                />

                {/* Service Name: Text-Only Inward Reveal Animation */}
                <div className="nest-service-title-container absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 z-20">
                  <div className="py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl bg-[#7027C9] text-white shadow-[0_8px_20px_-2px_rgba(112,39,201,0.45)] border border-white/20 text-center flex items-center justify-center">
                    <h3 className="text-xs sm:text-sm md:text-[15px] font-extrabold font-heading text-white tracking-tight leading-snug select-none text-center">
                      {item.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
