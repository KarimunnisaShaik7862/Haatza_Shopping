import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface HomeServiceItem {
  id: string;
  name: string;
  image: string;
  alt: string;
  categorySlug: string;
  serviceId: string;
}

interface HaatzaNestExploreServicesSectionProps {
  services: HomeServiceItem[];
  activeServiceId?: string;
  onSelectService: (service: HomeServiceItem) => void;
  onHoverService?: (id: string) => void;
}

export const HaatzaNestExploreServicesSection: React.FC<HaatzaNestExploreServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation & Motion State Refs (Ref-based for 60/120fps stutter-free RAF performance)
  const offsetRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const isInViewRef = useRef<boolean>(false);
  const isReducedMotionRef = useRef<boolean>(false);
  const singleSetWidthRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Drag interaction tracking
  const startXRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);

  // Viewport reveal state
  const [hasRevealed, setHasRevealed] = useState(false);

  // Slow, smooth, luxury auto-scrolling speed (28px per second)
  const SPEED_PX_PER_SEC = 28;

  // Render 3 repeated sets of the 7 cards to ensure unbroken continuity across all monitor sizes
  const repeatedServices = [...services, ...services, ...services];

  // Measure single set width accurately
  const measureSetWidth = useCallback(() => {
    if (services.length > 0 && cardRefs.current[0] && cardRefs.current[services.length]) {
      const firstCardLeft = cardRefs.current[0]!.getBoundingClientRect().left;
      const nextSetFirstCardLeft = cardRefs.current[services.length]!.getBoundingClientRect().left;
      const measured = nextSetFirstCardLeft - firstCardLeft;
      if (measured > 0) {
        singleSetWidthRef.current = measured;
      }
    }
  }, [services.length]);

  // Viewport Observer & Reduced Motion Check
  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Viewport IntersectionObserver for fade-up reveal and rendering optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setHasRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Measure set width on load & window resize
    measureSetWidth();
    const timer = setTimeout(measureSetWidth, 300);
    window.addEventListener('resize', measureSetWidth);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      window.removeEventListener('resize', measureSetWidth);
    };
  }, [measureSetWidth]);

  // Main RAF Animation Loop
  useEffect(() => {
    const loop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1); // Cap dt to avoid sudden spikes on tab switch
      lastTimeRef.current = timestamp;

      // Only auto-advance when in view, not hovered, not dragged, and reduced motion is off
      if (
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        isInViewRef.current &&
        !isReducedMotionRef.current
      ) {
        offsetRef.current -= SPEED_PX_PER_SEC * dt;

        // Seamless wrap without jump or visual reset
        const setWidth = singleSetWidthRef.current;
        if (setWidth > 0) {
          if (offsetRef.current <= -setWidth) {
            offsetRef.current += setWidth;
          } else if (offsetRef.current > 0) {
            offsetRef.current -= setWidth;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Update track transform helper
  const applyTransform = () => {
    const setWidth = singleSetWidthRef.current;
    if (setWidth > 0) {
      if (offsetRef.current <= -setWidth) {
        offsetRef.current += setWidth;
      } else if (offsetRef.current > 0) {
        offsetRef.current -= setWidth;
      }
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  // Pointer drag/swipe handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    dragDistanceRef.current = 0;

    try {
      if (trackRef.current) {
        trackRef.current.setPointerCapture(e.pointerId);
      }
    } catch (_) {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(delta);

    offsetRef.current += delta;
    applyTransform();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    try {
      if (trackRef.current && trackRef.current.hasPointerCapture(e.pointerId)) {
        trackRef.current.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
  };

  // Card click handler (ignores drags)
  const handleCardClick = (service: HomeServiceItem) => {
    if (dragDistanceRef.current > 6) {
      return; // Dragged, not clicked
    }
    onSelectService(service);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-4"
      aria-labelledby="explore-home-services-heading"
    >
      {/* Section Heading & Subtitle */}
      <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto px-4">
        <h2
          id="explore-home-services-heading"
          className="text-2xl sm:text-3xl font-black text-[#25212D] font-heading tracking-tight"
        >
          Explore Our House Help Services
        </h2>
        <p className="text-sm sm:text-base text-[#625D6E] font-medium mt-1.5 max-w-xl mx-auto">
          “Expert care for every corner of your home.”
        </p>
      </div>

      {/* Infinite Horizontal Carousel Container with Edge Gradient Masks */}
      <div
        className={`relative w-full overflow-hidden transition-all duration-700 ease-out select-none ${
          hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Soft edge gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-[#F7F1FF] via-[#F7F1FF]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-[#F7F1FF] via-[#F7F1FF]/80 to-transparent z-10 pointer-events-none" />

        {/* Draggable & Auto-scrolling Track */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex items-start gap-3.5 sm:gap-4 md:gap-4.5 w-max will-change-transform touch-pan-y cursor-grab active:cursor-grabbing pt-3 pb-3 px-1"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {repeatedServices.map((service, index) => {
            const isFirstSet = index < services.length;

            return (
              <div
                key={`${service.id}-${index}`}
                ref={(el) => {
                  if (index < services.length * 2) {
                    cardRefs.current[index] = el;
                  }
                }}
                role="button"
                tabIndex={isFirstSet ? 0 : -1}
                aria-hidden={!isFirstSet}
                onClick={() => handleCardClick(service)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService(service);
                  }
                }}
                className="group flex flex-col items-center select-none shrink-0 w-[150px] sm:w-[170px] md:w-[185px] lg:w-[195px] focus:outline-none cursor-pointer"
              >
                {/* 4:3 Aspect Ratio Card with Smooth Lift, Glow & Zoom */}
                <div
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-purple-50 transition-all duration-300 ease-out relative border border-purple-100/90 shadow-xs group-hover:border-[#7027C9] group-hover:shadow-lg group-hover:shadow-purple-500/15 group-hover:ring-2 group-hover:ring-[#7027C9]/20 group-hover:-translate-y-1.5"
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading={index < 7 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106 select-none pointer-events-none"
                  />

                  {/* Gentle shine overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Service Name Aligned on the Baseline */}
                <span
                  className="mt-2.5 sm:mt-3 text-center text-xs sm:text-sm font-bold tracking-tight transition-colors line-clamp-1 sm:line-clamp-2 px-1 text-[#231F2A] group-hover:text-[#7027C9]"
                >
                  {service.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
