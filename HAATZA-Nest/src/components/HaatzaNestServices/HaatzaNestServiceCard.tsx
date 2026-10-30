import React, { useState } from 'react';
import { HaatzaNestHomeService } from '../../types/haatzaNest.types';

interface HaatzaNestServiceCardProps {
  service: HaatzaNestHomeService;
  className?: string;
}

export const HaatzaNestServiceCard: React.FC<HaatzaNestServiceCardProps> = React.memo(({
  service,
  className = '',
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleCardClick = () => {
    if (window.matchMedia('(hover: none)').matches && !isTouched) {
      setIsTouched(true);
    } else {
      document.getElementById('service-scope')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      document.getElementById('service-scope')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onTouchStart={() => setIsTouched(true)}
      aria-label={`${service.name} - ${service.category}`}
      className={`haatza-layered-card group cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7027C9] ${className}`}
    >
      {/* 1. Image Container Frame with rounded corners and overflow hidden */}
      <div className="haatza-card-image-frame w-full aspect-[4/3.9] sm:aspect-[4/3.8] min-h-[270px] sm:min-h-[290px] max-h-[340px] relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="haatza-layered-card-img select-none"
        />
      </div>

      {/* 2. Small Purple Content Box with White Text */}
      <div
        className={`haatza-layered-floating-panel ${
          isTouched ? 'is-active' : ''
        }`}
      >
        <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-white text-center font-heading tracking-tight leading-snug select-none">
          {service.name}
        </h3>
      </div>
    </div>
  );
});

HaatzaNestServiceCard.displayName = 'HaatzaNestServiceCard';

