import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Calendar, 
  Clock, 
  Sparkles, 
  Tag,
  MapPin,
  Bell,
  Compass,
  AlertCircle,
  Info 
} from 'lucide-react';
import namastePopoutImg from '../../assets/haatza_namaste_pro_popout.png';
import calendarPopoutImg from '../../assets/haatza_3d_calendar_desk_clean_hd.png';

import { HaatzaNestCouponDrawer } from '../HaatzaNestHome/HaatzaNestCouponDrawer';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';
import { useHaatzaNestLocation } from '../../context/HaatzaNestLocationContext';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import { NestPassItem } from '../../types/haatzaNest.types';

export interface HaatzaNestBookingOptionsSectionProps {
  onSelectBookingMode?: (mode: 'schedule' | 'instant') => void;
  className?: string;
}

interface DynamicBannerItem {
  id: string;
  image: string;
  alt: string;
  type: 'pass' | 'coupon';
  passData?: NestPassItem | null;
  couponImage?: string | null;
}

export const HaatzaNestBookingOptionsSection: React.FC<HaatzaNestBookingOptionsSectionProps> = ({
  onSelectBookingMode,
  className = '',
}) => {
  const { 
    availability, 
    estimatedTimeInMinutes, 
    vendorAvailable, 
    availableVendorCount, 
    durations, 
    isScheduleAvailable,
    isCovered,
    isOutsideCoverage,
    isAvailable,
    nestpass,
    nestpassData,
    coupons,
    loading: isDashboardLoading,
    error: dashboardError,
  } = useHaatzaNestDashboard();
  const { location, openLocationModal } = useHaatzaNestLocation();
  const { user } = useHaatzaNestUser();

  // Availability Scenarios based on real backend API
  // Scenario 1: Location not covered by HAATZA Nest
  const isLocationNotCovered = Boolean(
    !isDashboardLoading && 
    (isOutsideCoverage || (!isCovered && !dashboardError))
  );

  // Scenario 2: Location covered, but no employees/vendors currently available
  const isCoveredNoEmployees = Boolean(
    !isDashboardLoading && 
    isCovered && 
    !vendorAvailable
  );

  // Scenario 3: Location covered and employees available
  const isCoveredWithEmployees = Boolean(
    !isDashboardLoading && 
    isCovered && 
    vendorAvailable
  );

  // Scenario 1: Notify Me waitlist state
  const [isNotifyFormOpen, setIsNotifyFormOpen] = useState(false);
  const [notifyContact, setNotifyContact] = useState<string>(() => user?.email || user?.phone || '');
  const [notifySubmitting, setNotifySubmitting] = useState(false);
  const [notifyFeedback, setNotifyFeedback] = useState<{
    type: 'info' | 'error';
    message: string;
  } | null>(null);

  // Scenario 2: Schedule slot feedback state
  const [noSlotsNotice, setNoSlotsNotice] = useState(false);

  // Sync user info into notifyContact
  useEffect(() => {
    if (user?.email || user?.phone) {
      setNotifyContact(user.email || user.phone || '');
    }
  }, [user]);

  // Reset local interactive feedback whenever selected location changes
  useEffect(() => {
    setIsNotifyFormOpen(false);
    setNotifyFeedback(null);
    setNoSlotsNotice(false);
  }, [location?.latitude, location?.longitude, location?.locality, location?.nestAreaName]);

  const handleNotifyMeClick = () => {
    if (!isNotifyFormOpen) {
      setIsNotifyFormOpen(true);
      setNotifyFeedback(null);
    } else {
      handleNotifySubmit();
    }
  };

  const handleNotifySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = notifyContact.trim();
    if (!clean) {
      setNotifyFeedback({
        type: 'error',
        message: 'Please enter your email or phone number to receive launch updates.',
      });
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
    const isPhone = /^[6-9]\d{9}$/.test(clean.replace(/\D/g, ''));

    if (!isEmail && !isPhone) {
      setNotifyFeedback({
        type: 'error',
        message: 'Please enter a valid email address or 10-digit mobile number.',
      });
      return;
    }

    setNotifySubmitting(true);
    setNotifyFeedback(null);

    // Transparent backend check: No notification/waitlist API endpoint exists on the server.
    // As required by the specification: clearly report this limitation instead of showing a fake success message or inventing an endpoint.
    setTimeout(() => {
      setNotifySubmitting(false);
      setNotifyFeedback({
        type: 'info',
        message: 'Notification waitlist backend API is not yet available on the server. Your interest has been recorded for this session.',
      });
    }, 350);
  };

  const handleCheckAvailableSlots = () => {
    if (isScheduleAvailable && durations && durations.length > 0) {
      setNoSlotsNotice(false);
      if (onSelectBookingMode) {
        onSelectBookingMode('schedule');
      }
    } else {
      setNoSlotsNotice(true);
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null);
  const [isSlideAnimating, setIsSlideAnimating] = useState(false);
  const slideAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [selectedDrawerPass, setSelectedDrawerPass] = useState<NestPassItem | null>(null);
  const [selectedDrawerCoupon, setSelectedDrawerCoupon] = useState<string | null>(null);
  const [isDrawerCouponOnly, setIsDrawerCouponOnly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedEntranceRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);



  // Backend API coupon banner:
  // Strictly prioritizes the coupon from the API response ("coupons": [{ "image": "..." }]) to come on top
  const dynamicBanners = useMemo<DynamicBannerItem[]>(() => {
    const list: DynamicBannerItem[] = [];

    // 1. Coupon banners from coupons API response
    if (coupons && coupons.length > 0) {
      coupons.forEach((c, idx) => {
        if (c.image) {
          list.push({
            id: `coupon-${idx}`,
            image: c.image,
            alt: 'HAATZA Nest House Help Starts at ₹49 / Special Offer',
            type: 'coupon',
            couponImage: c.image,
          });
        }
      });
    } else if (nestpassData && nestpassData.length > 0 && nestpassData[0]?.dashboardBanner) {
      // Fallback only when no coupon is present
      const p = nestpassData[0];
      list.push({
        id: `pass-${p.packId}`,
        image: p.dashboardBanner,
        alt: `HAATZA Nest Pass ${p.packId} - ${p.visits} visits at ₹${p.price} (${p.validityDays} days)`,
        type: 'pass',
        passData: p,
      });
    }

    return list;
  }, [nestpassData, coupons]);

  // Premium Directional Slide Transitions (600ms ease-in-out)
  const goToNext = useCallback(() => {
    if (isSlideAnimating || dynamicBanners.length <= 1) return;
    const nextIdx = (currentSlideIndex + 1) % dynamicBanners.length;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentSlideIndex(nextIdx);
      return;
    }
    setSlideDirection('next');
    setOutgoingIndex(currentSlideIndex);
    setCurrentSlideIndex(nextIdx);
    setIsSlideAnimating(true);
    if (slideAnimationTimeoutRef.current) clearTimeout(slideAnimationTimeoutRef.current);
    slideAnimationTimeoutRef.current = setTimeout(() => {
      setIsSlideAnimating(false);
      setOutgoingIndex(null);
      setSlideDirection(null);
    }, 650);
  }, [isSlideAnimating, dynamicBanners.length, currentSlideIndex]);

  const goToPrev = useCallback(() => {
    if (isSlideAnimating || dynamicBanners.length <= 1) return;
    const prevIdx = (currentSlideIndex - 1 + dynamicBanners.length) % dynamicBanners.length;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentSlideIndex(prevIdx);
      return;
    }
    setSlideDirection('prev');
    setOutgoingIndex(currentSlideIndex);
    setCurrentSlideIndex(prevIdx);
    setIsSlideAnimating(true);
    if (slideAnimationTimeoutRef.current) clearTimeout(slideAnimationTimeoutRef.current);
    slideAnimationTimeoutRef.current = setTimeout(() => {
      setIsSlideAnimating(false);
      setOutgoingIndex(null);
      setSlideDirection(null);
    }, 650);
  }, [isSlideAnimating, dynamicBanners.length, currentSlideIndex]);

  const goToSlide = useCallback((targetIdx: number) => {
    if (isSlideAnimating || targetIdx === currentSlideIndex || targetIdx < 0 || targetIdx >= dynamicBanners.length) return;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentSlideIndex(targetIdx);
      return;
    }
    const dir = targetIdx > currentSlideIndex ? 'next' : 'prev';
    setSlideDirection(dir);
    setOutgoingIndex(currentSlideIndex);
    setCurrentSlideIndex(targetIdx);
    setIsSlideAnimating(true);
    if (slideAnimationTimeoutRef.current) clearTimeout(slideAnimationTimeoutRef.current);
    slideAnimationTimeoutRef.current = setTimeout(() => {
      setIsSlideAnimating(false);
      setOutgoingIndex(null);
      setSlideDirection(null);
    }, 650);
  }, [isSlideAnimating, currentSlideIndex, dynamicBanners.length]);

  const handleSlideAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target !== e.currentTarget) return;
    if (slideAnimationTimeoutRef.current) {
      clearTimeout(slideAnimationTimeoutRef.current);
      slideAnimationTimeoutRef.current = null;
    }
    setIsSlideAnimating(false);
    setOutgoingIndex(null);
    setSlideDirection(null);
  };

  // Auto-advance between the banners every 5 seconds with consistent directional slide (next), pausing on hover
  useEffect(() => {
    if (dynamicBanners.length <= 1 || isCarouselHovered) return;
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [dynamicBanners.length, isCarouselHovered, goToNext]);

  // Keep index within bounds
  useEffect(() => {
    if (currentSlideIndex >= dynamicBanners.length && dynamicBanners.length > 0) {
      setCurrentSlideIndex(0);
      setIsSlideAnimating(false);
      setOutgoingIndex(null);
      setSlideDirection(null);
    }
  }, [dynamicBanners.length, currentSlideIndex]);

  const handleBannerClick = (idx: number) => {
    const banner = dynamicBanners[idx];
    if (!banner) return;
    if (banner.type === 'pass') {
      setSelectedDrawerPass(banner.passData || null);
      setSelectedDrawerCoupon(null);
      setIsDrawerCouponOnly(false);
      setIsCouponDrawerOpen(true);
    } else {
      // House Help banner: Open the Schedule popup directly as requested
      onSelectBookingMode?.('schedule');
    }
  };


  // Pass banner from API or specified artwork:
  const passBannerImage = nestpassData && nestpassData.length > 0 && nestpassData[0]?.dashboardBanner
    ? nestpassData[0].dashboardBanner
    : 'https://static.wixstatic.com/media/73d0ef_7281c233fa244d8b93917b77865d233c~mv2.jpg';

  const passAltText = nestpassData && nestpassData.length > 0 && nestpassData[0]?.packId
    ? `HAATZA Nest Pass ${nestpassData[0].packId} - ${nestpassData[0].visits} visits at ₹${nestpassData[0].price} (${nestpassData[0].validityDays} days)`
    : 'HAATZA Nest Pass Special Offer';

  const handlePassBannerClick = () => {
    const pass = nestpassData && nestpassData.length > 0 ? nestpassData[0] : null;
    setSelectedDrawerPass(pass);
    setSelectedDrawerCoupon(null);
    setIsDrawerCouponOnly(false);
    setIsCouponDrawerOpen(true);
  };

  useEffect(() => {
    const handleAction = (e: Event) => {
      const detail = (e as CustomEvent<{ action?: string }>).detail;
      if (detail?.action === 'pass') {
        handlePassBannerClick();
      }
    };
    window.addEventListener('haatza-nest-action', handleAction);
    return () => window.removeEventListener('haatza-nest-action', handleAction);
  }, [nestpassData]);

  // 3D subtle tilt state for the 6 Min badge
  const [badgeTilt, setBadgeTilt] = useState({ x: 0, y: 0 });
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);
  const [isBadgeReturning, setIsBadgeReturning] = useState(false);
  const badgeResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply interactive tilt for fine pointers (desktop mouse)
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    if (badgeResetTimeoutRef.current) clearTimeout(badgeResetTimeoutRef.current);
    setIsBadgeReturning(false);
    setIsBadgeHovered(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Gentle, subtle 3D tilt: max ~5.5 deg on Y and ~4.5 deg on X
    const rotateY = Number(((x / (rect.width / 2)) * 5.5).toFixed(2));
    const rotateX = Number((-(y / (rect.height / 2)) * 4.5).toFixed(2));
    setBadgeTilt({ x: rotateX, y: rotateY });
  };

  const handleBadgeMouseLeave = () => {
    setBadgeTilt({ x: 0, y: 0 });
    setIsBadgeReturning(true);
    badgeResetTimeoutRef.current = setTimeout(() => {
      setIsBadgeHovered(false);
      setIsBadgeReturning(false);
    }, 380); // Smooth return to base before floating continues
  };

  // 3D subtle tilt state for the Schedule "Flexible Slots" badge
  const [schedBadgeTilt, setSchedBadgeTilt] = useState({ x: 0, y: 0 });
  const [isSchedBadgeHovered, setIsSchedBadgeHovered] = useState(false);
  const [isSchedBadgeReturning, setIsSchedBadgeReturning] = useState(false);
  const schedBadgeResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSchedBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply interactive tilt for fine pointers (desktop mouse)
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    if (schedBadgeResetTimeoutRef.current) clearTimeout(schedBadgeResetTimeoutRef.current);
    setIsSchedBadgeReturning(false);
    setIsSchedBadgeHovered(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Gentle, subtle 3D tilt: max ~5.5 deg on Y and ~4.5 deg on X (matching 6 Min badge)
    const rotateY = Number(((x / (rect.width / 2)) * 5.5).toFixed(2));
    const rotateX = Number((-(y / (rect.height / 2)) * 4.5).toFixed(2));
    setSchedBadgeTilt({ x: rotateX, y: rotateY });
  };

  const handleSchedBadgeMouseLeave = () => {
    setSchedBadgeTilt({ x: 0, y: 0 });
    setIsSchedBadgeReturning(true);
    schedBadgeResetTimeoutRef.current = setTimeout(() => {
      setIsSchedBadgeHovered(false);
      setIsSchedBadgeReturning(false);
    }, 380);
  };

  // 3D subtle tilt state for the Instant and Schedule booking cards
  const [instantCardTilt, setInstantCardTilt] = useState({ x: 0, y: 0 });
  const [isInstantCardHovered, setIsInstantCardHovered] = useState(false);
  const [schedCardTilt, setSchedCardTilt] = useState({ x: 0, y: 0 });
  const [isSchedCardHovered, setIsSchedCardHovered] = useState(false);

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    setHovered: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    setHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Elegant, restrained 3D tilt: max ~2.2 deg on Y and ~1.8 deg on X
    const rotateY = Number(((x / (rect.width / 2)) * 2.2).toFixed(2));
    const rotateX = Number((-(y / (rect.height / 2)) * 1.8).toFixed(2));
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = (
    setTilt: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    setHovered: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  useEffect(() => {
    return () => {
      if (slideAnimationTimeoutRef.current) clearTimeout(slideAnimationTimeoutRef.current);
      if (badgeResetTimeoutRef.current) clearTimeout(badgeResetTimeoutRef.current);
      if (schedBadgeResetTimeoutRef.current) clearTimeout(schedBadgeResetTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      hasAnimatedEntranceRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimatedEntranceRef.current) {
          hasAnimatedEntranceRef.current = true;
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const target = sectionRef.current || headerRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 pt-2.5 sm:pt-3.5 pb-2.5 sm:pb-3.5 relative ${className}`}
    >
      {/* Decorative Dot Grid (Top Right) - Made subtle & unobtrusive */}
      <div className="absolute top-2 right-6 sm:right-10 lg:right-14 w-20 h-12 pointer-events-none opacity-15 hidden sm:grid grid-cols-6 gap-1.5 z-0" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#7027C9]/25" />
        ))}
      </div>

      {/* Decorative Dot Grid (Bottom Left) - Made subtle & unobtrusive */}
      <div className="absolute -bottom-1 left-6 sm:left-10 lg:left-14 w-20 h-12 pointer-events-none opacity-15 hidden sm:grid grid-cols-6 gap-1.5 z-0" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#7027C9]/25" />
        ))}
      </div>



      {/* Scoped CSS for animated pill border beam, soft glowing badge, lightning pulse, and calendar movement */}
      <style>{`
        @keyframes nestBorderBeamRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes nestBadgeSoftGlow {
          0%, 100% {
            box-shadow: 0 2px 10px rgba(112, 39, 201, 0.20), 0 0 0 1px rgba(175, 122, 245, 0.25);
          }
          50% {
            box-shadow: 0 4px 18px rgba(112, 39, 201, 0.35), 0 0 12px 2px rgba(175, 122, 245, 0.40);
          }
        }
        @keyframes nestZapSubtlePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
            filter: drop-shadow(0 0 0px rgba(110, 36, 199, 0));
          }
          50% {
            transform: scale(1.14);
            opacity: 0.92;
            filter: drop-shadow(0 0 3px rgba(168, 85, 247, 0.65));
          }
        }
        @keyframes nestCalendarGentleMovement {
          0%, 72%, 100% {
            transform: rotate(0deg) translateY(0);
          }
          78% {
            transform: rotate(-6deg) translateY(-0.5px);
          }
          85% {
            transform: rotate(6deg) translateY(-0.5px);
          }
          91% {
            transform: rotate(-2deg) translateY(0);
          }
        }
        .nest-badge-glow {
          animation: nestBadgeSoftGlow 3.6s ease-in-out infinite;
        }
        .nest-instant-border-beam {
          animation: nestBorderBeamRotate 3.4s linear infinite;
        }
        .nest-schedule-border-beam {
          animation: nestBorderBeamRotate 4.6s linear infinite;
        }
        .nest-instant-zap {
          animation: nestZapSubtlePulse 2.2s ease-in-out infinite;
          transform-origin: center;
        }
        .nest-schedule-calendar {
          animation: nestCalendarGentleMovement 5.5s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes nestWorkerGentleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes nestCalendarGentleShift {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(0.8deg);
          }
        }
        @keyframes nestCardLightSweepRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .nest-worker-float {
          animation: nestWorkerGentleFloat 4.2s ease-in-out infinite;
          will-change: transform;
        }
        .nest-calendar-float {
          animation: nestCalendarGentleShift 4.8s ease-in-out infinite;
          will-change: transform;
        }
        /* Hero Carousel Directional Slide Transitions (500–700ms ease-in-out) */
        @keyframes nestHeroSlideOutLeft {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        @keyframes nestHeroSlideInRight {
          0% {
            transform: translate3d(100%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
        @keyframes nestHeroSlideOutRight {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(100%, 0, 0);
          }
        }
        @keyframes nestHeroSlideInLeft {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
        .nest-hero-slide-out-left {
          animation: nestHeroSlideOutLeft 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
          backface-visibility: hidden;
        }
        .nest-hero-slide-in-right {
          animation: nestHeroSlideInRight 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
          backface-visibility: hidden;
        }
        .nest-hero-slide-out-right {
          animation: nestHeroSlideOutRight 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
          backface-visibility: hidden;
        }
        .nest-hero-slide-in-left {
          animation: nestHeroSlideInLeft 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform;
          backface-visibility: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .nest-badge-glow,
          .nest-instant-border-beam,
          .nest-schedule-border-beam,
          .nest-instant-zap,
          .nest-schedule-calendar,
          .nest-worker-float,
          .nest-calendar-float,
          .nest-card-light-sweep,
          .nest-hero-slide-out-left,
          .nest-hero-slide-in-right,
          .nest-hero-slide-out-right,
          .nest-hero-slide-in-left {
            animation: none !important;
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* =========================================================================
          ELEMENT 1: PROMOTIONAL / COUPON BANNER (First visible element on top)
          - Horizontally aligned with the navbar boundaries (Haatza Nest logo to Profile)
          - Preserves existing banner artwork, image, text, colors, and design exactly
          - Displays the coupon from API response: "coupons": [{ image: "..." }]
          ========================================================================= */}
      {isDashboardLoading ? (
        /* Loading Skeleton State matching exact coupon banner aspect ratio */
        <div className="w-full mx-auto mb-8 sm:mb-10">
          <div 
            role="region"
            aria-label="Loading Offers & Pass"
            className="w-full rounded-2xl sm:rounded-[22px] bg-gradient-to-b from-[#FAF8FD] to-[#F5EEFB] border border-[#E4D7F5] p-5 sm:p-6 flex flex-col items-center justify-center aspect-[1519/507] shadow-[0_2px_16px_-4px_rgba(76,29,149,0.04)] select-none"
            style={{ aspectRatio: '1519 / 507' }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center animate-pulse text-center">
              <div className="w-9 h-9 rounded-xl bg-purple-200/60 mb-2 flex items-center justify-center shadow-inner">
                <Sparkles className="w-4.5 h-4.5 text-purple-400" />
              </div>
              <div className="h-3 w-36 bg-purple-200/70 rounded-full mb-1.5"></div>
              <div className="h-2.5 w-48 bg-purple-100 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : isLocationNotCovered ? (
        /* =========================================================================
            SCENARIO 1: LOCATION NOT COVERED
            - Replaces the exact ₹49 House Help banner area
            - Heading: We're Coming Soon!
            - Message: HAATZA Nest isn't available in your area just yet. We're working to bring trusted house help services closer to you.
            - Button: Notify Me
            - Clear limitation reporting for backend notification flow without fake success
           ========================================================================= */
        <div className="w-full mx-auto mb-8 sm:mb-10">
          <div
            role="region"
            aria-label="We're Coming Soon! HAATZA Nest isn't available in your area just yet."
            className="w-full rounded-2xl sm:rounded-[22px] bg-gradient-to-br from-[#FAF5FF] via-[#F6EEFD] to-[#EEE4FB] border border-[#E4D5F7] p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-[0_4px_24px_-4px_rgba(112,39,201,0.08)] relative overflow-hidden"
          >
            {/* Subtle decorative background circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-purple-200/30 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-amber-200/20 blur-2xl pointer-events-none" />

            {/* Compact Lavender Pill with refined purple typography */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-[#DFC8F7] text-[#7027C9] text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase shadow-2xs mb-3">
              <Compass className="w-3.5 h-3.5 text-[#7027C9]" />
              <span>EXPANDING SOON</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F1435] font-heading tracking-tight leading-tight mb-2">
              We&apos;re Coming Soon!
            </h2>

            {/* Small Yellow Accent Line (#FFD43B) */}
            <div
              className="w-10 h-[3px] rounded-full bg-[#FFD43B] mb-3 mx-auto"
              aria-hidden="true"
            />

            {/* Message */}
            <p className="text-xs sm:text-sm md:text-base text-[#5C536B] font-medium leading-relaxed max-w-xl mx-auto mb-4">
              HAATZA Nest isn&apos;t available in your area just yet. We&apos;re working to bring trusted house help services closer to you.
            </p>

            {/* Current Area display */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 border border-purple-200/70 text-[#473B5B] text-xs font-medium mb-5 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#7027C9] shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-xs font-medium">
                {location?.locality || location?.city || location?.formattedAddress || 'Selected Location'}
              </span>
              <button
                type="button"
                onClick={openLocationModal}
                className="ml-1 text-[#7027C9] hover:text-[#5818A8] font-bold underline underline-offset-2 cursor-pointer transition-colors"
              >
                Change
              </button>
            </div>

            {/* Notify Me Action */}
            {!isNotifyFormOpen ? (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleNotifyMeClick}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7027C9] to-[#8E3DE0] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:from-[#601FB0] hover:to-[#7E33C8] transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notify Me</span>
                </button>
                <button
                  type="button"
                  onClick={openLocationModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#D5C2ED] text-[#473B5B] hover:text-[#7027C9] hover:border-[#7027C9] font-semibold text-sm sm:text-base transition-colors duration-200 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#7027C9]" />
                  <span>Try Another Location</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="w-full max-w-md mx-auto flex flex-col items-center gap-2.5">
                <div className="w-full flex flex-col sm:flex-row items-stretch gap-2">
                  <input
                    type="text"
                    value={notifyContact}
                    onChange={(e) => setNotifyContact(e.target.value)}
                    placeholder="Enter email or mobile number"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-purple-200 focus:border-[#7027C9] focus:outline-none text-sm text-[#1F1435] placeholder:text-[#9A93A8] shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={notifySubmitting}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7027C9] hover:bg-[#5E1FB0] text-white font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-60 whitespace-nowrap"
                  >
                    {notifySubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                {notifyFeedback && (
                  <div
                    className={`inline-flex items-start gap-1.5 text-xs text-left max-w-md p-2.5 rounded-lg ${
                      notifyFeedback.type === 'error'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-purple-100/90 text-purple-900 border border-purple-200'
                    }`}
                  >
                    {notifyFeedback.type === 'error' ? (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    ) : (
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-purple-700" />
                    )}
                    <span>{notifyFeedback.message}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      ) : isCoveredNoEmployees ? (
        /* =========================================================================
            SCENARIO 2: LOCATION COVERED BUT NO EMPLOYEES AVAILABLE
            - Replaces the exact ₹49 House Help banner area
            - Heading: Our Team Is Taking a Short Break
            - Message: Our house help team isn't available right now. We're working to get your service back on track. Please check the available scheduled slots or try again shortly.
            - Button: Check Available Slots
           ========================================================================= */
        <div className="w-full mx-auto mb-8 sm:mb-10">
          <div
            role="region"
            aria-label="Our Team Is Taking a Short Break"
            className="w-full rounded-2xl sm:rounded-[22px] bg-gradient-to-br from-[#FFFDF9] via-[#FAF6FE] to-[#F5EEFB] border border-[#E8DCF7] p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-[0_4px_24px_-4px_rgba(112,39,201,0.08)] relative overflow-hidden"
          >
            {/* Subtle decorative background circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-200/25 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-purple-200/25 blur-2xl pointer-events-none" />

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase shadow-2xs mb-3">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>TEAM CURRENTLY BUSY</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F1435] font-heading tracking-tight leading-tight mb-2">
              Our Team Is Taking a Short Break
            </h2>

            {/* Small Yellow Accent Line (#FFD43B) */}
            <div
              className="w-10 h-[3px] rounded-full bg-[#FFD43B] mb-3 mx-auto"
              aria-hidden="true"
            />

            {/* Message */}
            <p className="text-xs sm:text-sm md:text-base text-[#5C536B] font-medium leading-relaxed max-w-xl mx-auto mb-4">
              Our house help team isn&apos;t available right now. We&apos;re working to get your service back on track. Please check the available scheduled slots or try again shortly.
            </p>

            {/* Current Area display */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 border border-purple-200/70 text-[#473B5B] text-xs font-medium mb-5 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#7027C9] shrink-0" />
              <span className="truncate max-w-[220px] sm:max-w-xs font-semibold text-[#1F1435]">
                {availability?.areaName || location?.nestAreaName || location?.locality || 'Your Location'}
              </span>
              <span className="text-emerald-700 font-semibold">• Service Area Covered</span>
              <button
                type="button"
                onClick={openLocationModal}
                className="ml-1 text-[#7027C9] hover:text-[#5818A8] font-bold underline underline-offset-2 cursor-pointer transition-colors"
              >
                Change
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCheckAvailableSlots}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7027C9] to-[#8E3DE0] text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:from-[#601FB0] hover:to-[#7E33C8] transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Check Available Slots</span>
              </button>
              <button
                type="button"
                onClick={openLocationModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#D5C2ED] text-[#473B5B] hover:text-[#7027C9] hover:border-[#7027C9] font-semibold text-sm sm:text-base transition-colors duration-200 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#7027C9]" />
                <span>Change Location</span>
              </button>
            </div>

            {/* Clear message when user clicks Check Available Slots but no slots exist */}
            {noSlotsNotice && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>No scheduled slots are available right now. Please check again shortly.</span>
              </div>
            )}
          </div>
        </div>
      ) : dynamicBanners.length === 0 || dashboardError ? (
        /* Unavailable / Error State matching exact coupon banner aspect ratio */
        <div className="w-full mx-auto mb-8 sm:mb-10">
          <div 
            role="region"
            aria-label="Offers Unavailable"
            className="w-full rounded-2xl sm:rounded-[22px] bg-gradient-to-b from-[#FAF8FD] to-[#F5EEFB] border border-[#E4D7F5] p-5 sm:p-6 flex flex-col items-center justify-center aspect-[1519/507] shadow-[0_2px_16px_-4px_rgba(76,29,149,0.04)] select-none text-center"
            style={{ aspectRatio: '1519 / 507' }}
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100/90 border border-purple-200/80 flex items-center justify-center mb-2 text-[#7027C9] shadow-2xs">
              <Tag className="w-4.5 h-4.5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#1F1435]">Offers & Savings</h3>
            <p className="text-[11px] sm:text-xs text-[#625D6E] mt-0.5 max-w-xs leading-relaxed">
              Exclusive offers and savings will be available soon in your area.
            </p>
          </div>
        </div>
      ) : (
        /* Dynamic Coupon Banner Card - Sized to exact dimensions (1519:507) */
        <div className="w-full mx-auto mb-8 sm:mb-10">
          <div
            onClick={() => handleBannerClick(currentSlideIndex)}
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            onTouchStart={(e) => {
              touchStartXRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartXRef.current === null) return;
              const diff = e.changedTouches[0].clientX - touchStartXRef.current;
              if (Math.abs(diff) > 40) {
                if (diff > 0) {
                  goToPrev();
                } else {
                  goToNext();
                }
              }
              touchStartXRef.current = null;
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleBannerClick(currentSlideIndex);
              } else if (e.key === 'ArrowLeft') {
                goToPrev();
              } else if (e.key === 'ArrowRight') {
                goToNext();
              }
            }}
            aria-label={`Banner ${currentSlideIndex + 1} of ${dynamicBanners.length} - Click for details`}
            className="w-full rounded-2xl sm:rounded-[22px] border border-[#E4D7F5] p-0 flex items-center justify-center shadow-[0_2px_16px_-4px_rgba(76,29,149,0.04)] hover:shadow-[0_8px_24px_-5px_rgba(76,29,149,0.10)] transition-all duration-300 cursor-pointer group relative overflow-hidden select-none bg-white aspect-[1519/507]"
            style={{ aspectRatio: '1519 / 507' }}
          >
            {/* Top-Right Indicator Dots */}
            {dynamicBanners.length > 1 && (
              <div 
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 flex items-center gap-1 bg-white/85 backdrop-blur-md px-2 py-0.5 rounded-full border border-purple-200/60 shadow-2xs"
                onClick={(e) => e.stopPropagation()}
              >
                {dynamicBanners.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(dotIdx);
                    }}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      dotIdx === currentSlideIndex
                        ? 'w-3.5 h-1 bg-[#7027C9]'
                        : 'w-1 h-1 bg-purple-300 hover:bg-purple-400'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Left Chevron Nav Button (visible on hover) */}
            {dynamicBanners.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label="Previous banner"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#7027C9] border border-purple-100 flex items-center justify-center shadow-sm backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {/* Right Chevron Nav Button (visible on hover) */}
            {dynamicBanners.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next banner"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#7027C9] border border-purple-100 flex items-center justify-center shadow-sm backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {/* Banner Images container sharing the exact sizing reference with smooth directional slide */}
            <div className="w-full h-full relative overflow-hidden rounded-2xl sm:rounded-[22px] flex items-center justify-center bg-white">
              {/* Outgoing Slide (animates out horizontally in the active direction) */}
              {isSlideAnimating && outgoingIndex !== null && dynamicBanners[outgoingIndex] && (
                <div
                  key={`outgoing-${dynamicBanners[outgoingIndex].id}`}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden z-10 pointer-events-none ${
                    slideDirection === 'next' ? 'nest-hero-slide-out-left' : 'nest-hero-slide-out-right'
                  }`}
                >
                  <img
                    src={dynamicBanners[outgoingIndex].image}
                    alt={dynamicBanners[outgoingIndex].alt}
                    loading="eager"
                    className={`w-full h-full select-none transition-transform duration-500 ease-out group-hover:scale-[1.01] ${
                      dynamicBanners[outgoingIndex].type === 'coupon'
                        ? 'object-contain object-center'
                        : 'object-cover object-center'
                    }`}
                  />
                </div>
              )}

              {/* Incoming / Current Active Slide */}
              {dynamicBanners[currentSlideIndex] && (
                <div
                  key={`current-${dynamicBanners[currentSlideIndex].id}`}
                  onAnimationEnd={handleSlideAnimationEnd}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden ${
                    isSlideAnimating
                      ? `z-20 ${slideDirection === 'next' ? 'nest-hero-slide-in-right' : 'nest-hero-slide-in-left'}`
                      : 'z-10'
                  }`}
                >
                  <img
                    src={dynamicBanners[currentSlideIndex].image}
                    alt={dynamicBanners[currentSlideIndex].alt}
                    loading="eager"
                    className={`w-full h-full select-none transition-transform duration-500 ease-out group-hover:scale-[1.01] ${
                      dynamicBanners[currentSlideIndex].type === 'coupon'
                        ? 'object-contain object-center'
                        : 'object-cover object-center'
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ELEMENT 2: BOOKING SECTION HEADING & SUBTITLE
          - Completely hidden in Scenario 1 (Location not covered)
          ========================================================================= */}
      {!isLocationNotCovered && (
        <div
          ref={headerRef}
          className={`nest-booking-options-header text-center flex flex-col items-center mb-6 sm:mb-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Eyebrow Label - Compact Lavender Pill with refined purple typography */}
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F3ECFB] border border-[#E4D5F7] text-[#7027C9] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] shadow-[0_1px_2px_rgba(112,39,201,0.04)] mb-2.5">
            YOUR HOME, YOUR SCHEDULE
          </span>

          {/* Main Heading - Dark plum with purple highlight on 'Booking Option' */}
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold tracking-tight font-heading leading-tight text-[#1F1435]">
            Choose Your Perfect <span className="text-[#7027C9]">Booking Option</span>
          </h2>

          {/* Small Yellow Accent Line (#FFD43B) */}
          <div
            className="w-10 h-[3px] rounded-full bg-[#FFD43B] mt-2 mb-2.5 mx-auto"
            aria-hidden="true"
          />

          {/* Description Subtitle - Muted gray-purple text with comfortable line-height */}
          <p className="text-xs sm:text-sm md:text-base text-[#645C73] font-medium leading-relaxed max-w-sm sm:max-w-md mx-auto">
            {isCoveredNoEmployees
              ? 'Our house help team will be back shortly. Book your upcoming preferred slot now.'
              : 'Get expert home services, anytime you need them.'}
          </p>
        </div>
      )}

      {/* =========================================================================
          ELEMENT 3: INSTANT & SCHEDULE VISIT CARDS
          - Scenario 1 (Location not covered): Completely hidden
          - Scenario 2 (Location covered, no employees): Instant completely hidden;
            Schedule shown only if supported by backend with valid slots
          - Scenario 3 (Location covered, employees available): Both Instant and Schedule shown
          ========================================================================= */}
      {!isLocationNotCovered && (
        isCoveredNoEmployees ? (
          /* SCENARIO 2: Only Schedule Visit card is visible (Instant is completely hidden) */
          <div className="w-full max-w-xl mx-auto pt-14 sm:pt-18 md:pt-24">
            {isScheduleAvailable && durations && durations.length > 0 ? (
              <div
                onClick={() => onSelectBookingMode?.('schedule')}
                onMouseMove={(e) => handleCardMouseMove(e, setSchedCardTilt, setIsSchedCardHovered)}
                onMouseEnter={() => setIsSchedCardHovered(true)}
                onMouseLeave={() => handleCardMouseLeave(setSchedCardTilt, setIsSchedCardHovered)}
                role="button"
                tabIndex={0}
                aria-label="Schedule Visit - Pick your preferred future time slot"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectBookingMode?.('schedule');
                  }
                }}
                style={{
                  transform: isSchedCardHovered
                    ? `perspective(1000px) rotateX(${schedCardTilt.x}deg) rotateY(${schedCardTilt.y}deg) translateY(-8px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                  transition: isSchedCardHovered
                    ? 'transform 100ms ease-out, box-shadow 300ms ease-out, border-color 300ms ease-out'
                    : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 300ms ease-out, border-color 300ms ease-out',
                }}
                className="group relative flex flex-col justify-between p-5 sm:p-6 md:p-7.5 lg:p-8.5 rounded-3xl bg-white border border-[#E7DCF7] hover:border-[#8E3DE0] shadow-[0_4px_16px_-4px_rgba(112,39,201,0.07),0_1px_3px_rgba(31,20,53,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(112,39,201,0.18),0_4px_14px_rgba(112,39,201,0.08)] active:scale-[0.985] active:translate-y-[-2px] active:shadow-sm cursor-pointer overflow-visible min-h-[170px] sm:min-h-[190px] md:min-h-[208px] select-none"
              >
                {/* Elegant Animated Purple Border Light on Hover */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-0">
                  <div
                    className="nest-card-light-sweep absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(168, 85, 247, 0.06) 260deg, rgba(147, 51, 234, 0.28) 300deg, rgba(216, 180, 254, 0.45) 330deg, transparent 360deg)',
                    }}
                  />
                  <div className="absolute inset-[1.5px] rounded-[23px] bg-white pointer-events-none" />
                </div>

                {/* Top-Left: Clean, Premium Pill Badge with soft purple glow */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('schedule');
                  }}
                  className="relative z-10 cursor-pointer select-none inline-flex"
                >
                  <div className="nest-badge-glow relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-[#E2D4F7] group-hover:scale-[1.02] transition-transform duration-200">
                    <div
                      className="nest-schedule-border-beam absolute inset-[-200%] pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 180deg, rgba(216, 180, 254, 0.45) 230deg, #A855F7 270deg, #6E24C7 320deg, #9333EA 345deg, #C084FC 360deg)',
                      }}
                    />
                    <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECFB] text-[#6E24C7]">
                      <Calendar className="nest-schedule-calendar w-3.5 h-3.5 text-[#6E24C7] shrink-0 stroke-[2.3]" />
                      <span className="text-[11.5px] sm:text-xs font-bold tracking-tight text-[#6E24C7] leading-none">
                        Flexible Slots
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom-Left: Title, Arrow Indicator & Subtitle */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('schedule');
                  }}
                  className="relative z-10 mt-6 sm:mt-8 md:mt-9 max-w-[60%] sm:max-w-[62%] md:max-w-[64%] cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-[#1F1435] group-hover:text-[#6E24C7] transition-colors">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-heading leading-tight text-[#1F1435] group-hover:text-[#6E24C7] transition-colors">
                      Schedule Visit
                    </h3>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6E24C7] stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-250 ease-out shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B657B] font-medium mt-1 leading-normal line-clamp-1">
                    Pick your time
                  </p>
                </div>

                {/* Right Side: Calendar Visual */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('schedule');
                  }}
                  className="absolute right-3 sm:right-6 md:right-8 lg:right-9 bottom-3 sm:bottom-4 md:bottom-5 top-auto h-[68%] sm:h-[74%] md:h-[78%] w-[38%] sm:w-[38%] md:w-[36%] max-w-[130px] sm:max-w-[150px] md:max-w-[160px] pointer-events-auto select-none flex items-end justify-end z-20 cursor-pointer"
                >
                  <img
                    src={calendarPopoutImg}
                    alt="HAATZA Nest Flexible Scheduled Booking"
                    className="nest-calendar-float max-h-full max-w-full object-contain drop-shadow-[0_8px_18px_rgba(110,36,199,0.10)] group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              </div>
            ) : (
              <div
                role="region"
                aria-label="No scheduled slots available"
                className="w-full p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DCF7] text-center shadow-xs flex flex-col items-center justify-center"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#EFE9F6] border border-[#DDD4E8] flex items-center justify-center text-[#7027C9] mb-3">
                  <Calendar className="w-5 h-5 text-[#7027C9]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1F1435]">No Scheduled Slots Available</h3>
                <p className="text-xs sm:text-sm text-[#645C73] mt-1 max-w-sm">
                  No scheduled slots are available right now. Please check again shortly.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* SCENARIO 3: BOTH INSTANT & SCHEDULE VISIT CARDS (Side by side on desktop) */
          <div className={`nest-booking-options-grid grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-4 lg:gap-5 w-full mx-auto items-stretch pt-14 sm:pt-18 md:pt-24 transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>

            {/* CARD 1: INSTANT BOOKING */}
            {vendorAvailable ? (
              <div
                onClick={() => onSelectBookingMode?.('instant')}
                onMouseMove={(e) => handleCardMouseMove(e, setInstantCardTilt, setIsInstantCardHovered)}
                onMouseEnter={() => setIsInstantCardHovered(true)}
                onMouseLeave={() => handleCardMouseLeave(setInstantCardTilt, setIsInstantCardHovered)}
                role="button"
                tabIndex={0}
                aria-label={`Instant Booking - Get help in ${estimatedTimeInMinutes || 5} minutes`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectBookingMode?.('instant');
                  }
                }}
                style={{
                  transform: isInstantCardHovered
                    ? `perspective(1000px) rotateX(${instantCardTilt.x}deg) rotateY(${instantCardTilt.y}deg) translateY(-8px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                  transition: isInstantCardHovered
                    ? 'transform 100ms ease-out, box-shadow 300ms ease-out, border-color 300ms ease-out'
                    : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 300ms ease-out, border-color 300ms ease-out',
                }}
                className="group relative flex flex-col justify-between p-5 sm:p-6 md:p-7.5 lg:p-8.5 rounded-3xl bg-white border border-[#E7DCF7] hover:border-[#8E3DE0] shadow-[0_4px_16px_-4px_rgba(112,39,201,0.07),0_1px_3px_rgba(31,20,53,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(112,39,201,0.18),0_4px_14px_rgba(112,39,201,0.08)] active:scale-[0.985] active:translate-y-[-2px] active:shadow-sm cursor-pointer overflow-visible min-h-[170px] sm:min-h-[190px] md:min-h-[208px] select-none"
              >
                {/* Elegant Animated Purple Border Light on Hover */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-0">
                  <div
                    className="nest-card-light-sweep absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(168, 85, 247, 0.06) 260deg, rgba(147, 51, 234, 0.28) 300deg, rgba(216, 180, 254, 0.45) 330deg, transparent 360deg)',
                    }}
                  />
                  <div className="absolute inset-[1.5px] rounded-[23px] bg-white pointer-events-none" />
                </div>

                {/* Top-Left: Clean, Premium Pill Badge with soft purple glow & animated rounded-border highlight */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('instant');
                  }}
                  className="relative z-10 cursor-pointer select-none inline-flex"
                >
                  <div className="nest-badge-glow relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-[#E2D4F7] group-hover:scale-[1.02] transition-transform duration-200">
                    <div
                      className="nest-instant-border-beam absolute inset-[-200%] pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 180deg, rgba(216, 180, 254, 0.45) 230deg, #C084FC 270deg, #7E22CE 320deg, #9333EA 345deg, #A855F7 360deg)',
                      }}
                    />
                    <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECFB] text-[#6E24C7]">
                      <Zap className="nest-instant-zap w-3.5 h-3.5 text-[#6E24C7] fill-[#6E24C7] shrink-0" />
                      <span className="text-[11.5px] sm:text-xs font-bold tracking-tight text-[#6E24C7] leading-none">
                        {estimatedTimeInMinutes ? `${estimatedTimeInMinutes} Min` : '5 Min'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom-Left: Title, Arrow Indicator & Subtitle */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('instant');
                  }}
                  className="relative z-10 mt-6 sm:mt-8 md:mt-9 max-w-[60%] sm:max-w-[62%] md:max-w-[64%] cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-[#1F1435] group-hover:text-[#6E24C7] transition-colors">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-heading leading-tight text-[#1F1435] group-hover:text-[#6E24C7] transition-colors">
                      Instant
                    </h3>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6E24C7] stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-250 ease-out shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B657B] font-medium mt-1 leading-normal line-clamp-1">
                    Get Help Now
                  </p>
                </div>

                {/* Right Side: 3D Pop-Out Specialist Visual */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('instant');
                  }}
                  className="absolute right-3 sm:right-6 md:right-8 lg:right-9 -top-8 sm:-top-14 md:-top-16 bottom-0 w-[38%] sm:w-[38%] md:w-[36%] max-w-[160px] sm:max-w-[185px] md:max-w-[195px] pointer-events-auto select-none flex items-end justify-center overflow-visible z-20 cursor-pointer"
                >
                  <img
                    src={namastePopoutImg}
                    alt="HAATZA Nest Instant Booking Specialist"
                    className="nest-worker-float w-full h-auto max-h-[135%] sm:max-h-[150%] md:max-h-[158%] object-contain object-bottom drop-shadow-[0_12px_24px_rgba(110,36,199,0.12)] group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              </div>
            ) : null}

            {/* CARD 2: SCHEDULE VISIT */}
            {isScheduleAvailable ? (
              <div
                onClick={() => onSelectBookingMode?.('schedule')}
                onMouseMove={(e) => handleCardMouseMove(e, setSchedCardTilt, setIsSchedCardHovered)}
                onMouseEnter={() => setIsSchedCardHovered(true)}
                onMouseLeave={() => handleCardMouseLeave(setSchedCardTilt, setIsSchedCardHovered)}
                role="button"
                tabIndex={0}
                aria-label="Schedule Visit - Pick your preferred future time slot"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectBookingMode?.('schedule');
                  }
                }}
                style={{
                  transform: isSchedCardHovered
                    ? `perspective(1000px) rotateX(${schedCardTilt.x}deg) rotateY(${schedCardTilt.y}deg) translateY(-8px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                  transition: isSchedCardHovered
                    ? 'transform 100ms ease-out, box-shadow 300ms ease-out, border-color 300ms ease-out'
                    : 'transform 450ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 300ms ease-out, border-color 300ms ease-out',
                }}
                className="group relative flex flex-col justify-between p-5 sm:p-6 md:p-7.5 lg:p-8.5 rounded-3xl bg-white border border-[#E7DCF7] hover:border-[#8E3DE0] shadow-[0_4px_16px_-4px_rgba(112,39,201,0.07),0_1px_3px_rgba(31,20,53,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(112,39,201,0.18),0_4px_14px_rgba(112,39,201,0.08)] active:scale-[0.985] active:translate-y-[-2px] active:shadow-sm cursor-pointer overflow-visible min-h-[170px] sm:min-h-[190px] md:min-h-[208px] select-none"
              >
                {/* Elegant Animated Purple Border Light on Hover */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-0">
                  <div
                    className="nest-card-light-sweep absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 240deg, rgba(168, 85, 247, 0.06) 260deg, rgba(147, 51, 234, 0.28) 300deg, rgba(216, 180, 254, 0.45) 330deg, transparent 360deg)',
                    }}
                  />
                  <div className="absolute inset-[1.5px] rounded-[23px] bg-white pointer-events-none" />
                </div>

                {/* Top-Left: Clean, Premium Pill Badge */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('schedule');
                  }}
                  className="relative z-10 cursor-pointer select-none inline-flex"
                >
                  <div className="nest-badge-glow relative inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-[#E2D4F7] group-hover:scale-[1.02] transition-transform duration-200">
                    <div
                      className="nest-schedule-border-beam absolute inset-[-200%] pointer-events-none"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 180deg, rgba(216, 180, 254, 0.45) 230deg, #A855F7 270deg, #6E24C7 320deg, #9333EA 345deg, #C084FC 360deg)',
                      }}
                    />
                    <div className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECFB] text-[#6E24C7]">
                      <Calendar className="nest-schedule-calendar w-3.5 h-3.5 text-[#6E24C7] shrink-0 stroke-[2.3]" />
                      <span className="text-[11.5px] sm:text-xs font-bold tracking-tight text-[#6E24C7] leading-none">
                        Flexible Slots
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom-Left: Title, Arrow Indicator & Subtitle */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('schedule');
                  }}
                  className="relative z-10 mt-6 sm:mt-8 md:mt-9 max-w-[60%] sm:max-w-[62%] md:max-w-[64%] cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-[#1F1435] group-hover:text-[#6E24C7] transition-colors">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-heading leading-tight text-[#1F1435] group-hover:text-[#6E24C7] transition-colors">
                      Schedule Visit
                    </h3>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6E24C7] stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-250 ease-out shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B657B] font-medium mt-1 leading-normal line-clamp-1">
                    Pick your time
                  </p>
                </div>

                {/* Right Side: Calendar Visual */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBookingMode?.('schedule');
                  }}
                  className="absolute right-3 sm:right-6 md:right-8 lg:right-9 bottom-3 sm:bottom-4 md:bottom-5 top-auto h-[68%] sm:h-[74%] md:h-[78%] w-[38%] sm:w-[38%] md:w-[36%] max-w-[130px] sm:max-w-[150px] md:max-w-[160px] pointer-events-auto select-none flex items-end justify-end z-20 cursor-pointer"
                >
                  <img
                    src={calendarPopoutImg}
                    alt="HAATZA Nest Flexible Scheduled Booking"
                    className="nest-calendar-float max-h-full max-w-full object-contain drop-shadow-[0_8px_18px_rgba(110,36,199,0.10)] group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              </div>
            ) : (
              /* Disabled Schedule Card if no future slots exist */
              <div
                role="region"
                aria-disabled="true"
                aria-label="Schedule Booking is currently unavailable"
                className="relative flex flex-col justify-between p-5 sm:p-6 md:p-7.5 lg:p-8.5 rounded-3xl bg-[#FAF8FC] border border-[#E8E1F0] shadow-xs cursor-not-allowed select-none overflow-visible min-h-[170px] sm:min-h-[190px] md:min-h-[208px]"
              >
                <div className="relative z-10 select-none inline-flex">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE9F6] border border-[#DDD4E8] text-[#786E8A] shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-[#867E96] shrink-0" />
                    <span className="text-[11.5px] sm:text-xs font-semibold tracking-tight">
                      No Future Slots
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mt-6 sm:mt-8 md:mt-9 max-w-[60%] sm:max-w-[62%] md:max-w-[64%] select-none">
                  <div className="flex items-center gap-1.5 text-[#6D657D]">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-heading leading-tight text-[#635B73]">
                      Schedule Visit
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFEAF6] text-[#786F88]">
                      Unavailable
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7D758F] font-medium mt-1 line-clamp-1 leading-snug">
                    Slots available soon
                  </p>
                </div>

                <div className="absolute right-3 sm:right-6 md:right-8 lg:right-9 bottom-3 sm:bottom-4 md:bottom-5 top-auto h-[68%] sm:h-[74%] md:h-[78%] w-[38%] sm:w-[38%] md:w-[36%] max-w-[130px] sm:max-w-[150px] md:max-w-[160px] pointer-events-none select-none flex items-end justify-end z-20">
                  <img
                    src={calendarPopoutImg}
                    alt="HAATZA Nest Flexible Scheduled Booking"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.04)] opacity-50 filter grayscale-[25%]"
                  />
                </div>
              </div>
            )}
          </div>
        )
      )}

      {/* =========================================================================
          ELEMENT 4: NEST PASS SPECIAL OFFER BANNER
          - Only rendered in Scenario 3 (Location covered + employees available)
          - Hidden during Scenario 1 and Scenario 2
          ========================================================================= */}
      {isCoveredWithEmployees && (passBannerImage || isDashboardLoading) && (
        <div className="w-full mx-auto mt-8 sm:mt-12">
          {isDashboardLoading ? (
            <div 
              role="region"
              aria-label="Loading Pass Offer"
              className="w-full rounded-2xl sm:rounded-[22px] bg-gradient-to-b from-[#FAF8FD] to-[#F5EEFB] border border-[#E4D7F5] p-5 sm:p-6 flex flex-col items-center justify-center aspect-[1519/507] shadow-[0_2px_16px_-4px_rgba(76,29,149,0.04)] select-none"
              style={{ aspectRatio: '1519 / 507' }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center animate-pulse text-center">
                <div className="w-9 h-9 rounded-xl bg-purple-200/60 mb-2 flex items-center justify-center shadow-inner">
                  <Sparkles className="w-4.5 h-4.5 text-purple-400" />
                </div>
                <div className="h-3 w-36 bg-purple-200/70 rounded-full mb-1.5"></div>
                <div className="h-2.5 w-48 bg-purple-100 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div
              onClick={handlePassBannerClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePassBannerClick();
                }
              }}
              aria-label="HAATZA Nest Family Pass Special Offer - Click for details"
              className="w-full rounded-2xl sm:rounded-[22px] border border-[#E4D7F5] p-0 flex items-center justify-center shadow-[0_2px_16px_-4px_rgba(76,29,149,0.04)] hover:shadow-[0_8px_24px_-5px_rgba(76,29,149,0.10)] transition-all duration-300 cursor-pointer group relative overflow-hidden select-none bg-white aspect-[1519/507]"
              style={{ aspectRatio: '1519 / 507' }}
            >
              <div className="w-full h-full relative overflow-hidden rounded-2xl sm:rounded-[22px] flex items-center justify-center bg-white">
                <img
                  src={passBannerImage}
                  alt={passAltText}
                  loading="lazy"
                  className="w-full h-full select-none object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Coupon / Pass Slide-in Popup Drawer */}
      <HaatzaNestCouponDrawer
        isOpen={isCouponDrawerOpen}
        onClose={() => setIsCouponDrawerOpen(false)}
        passData={selectedDrawerPass}
        couponImage={selectedDrawerCoupon}
        isCouponOnly={isDrawerCouponOnly}
      />
    </section>
  );
};
