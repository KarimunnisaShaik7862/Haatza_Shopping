import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HaatzaNestHomeService, 
  HaatzaNestServiceCategory 
} from '../../types/haatzaNest.types';
import { haatzaNestService } from '../../services/haatzaNestService';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';
import { HaatzaNestLoading } from '../../components/common/HaatzaNestLoading';
import { HaatzaNestButton } from '../../components/common/HaatzaNestButton';
import { HaatzaNestBookingOptionsSection } from '../../components/HaatzaNestBooking/HaatzaNestBookingOptionsSection';
import { HaatzaNestInstantBottomSheet } from '../../components/HaatzaNestBooking/HaatzaNestInstantBottomSheet';
import { HaatzaNestScheduleScreen } from '../../components/HaatzaNestBooking/HaatzaNestScheduleScreen';
import { HaatzaNestBookingSummary } from '../../components/HaatzaNestBooking/HaatzaNestBookingSummary';
import { NestBookingSelection } from '../../components/HaatzaNestBooking/nestBookingData';
import { HaatzaNestExploreServicesSection } from '../../components/HaatzaNestServices/HaatzaNestExploreServicesSection';
import { HaatzaNestHeroCarousel } from '../../components/HaatzaNestHome/HaatzaNestHeroCarousel';
import { HaatzaNestComingSoonSection } from '../../components/HaatzaNestHome/HaatzaNestComingSoonSection';
import { HaatzaNestAvailabilityErrorSection } from '../../components/HaatzaNestHome/HaatzaNestAvailabilityErrorSection';
import { HaatzaNestBusyBanner } from '../../components/HaatzaNestHome/HaatzaNestBusyBanner';
import { HaatzaNestBannerLoadingSkeleton } from '../../components/HaatzaNestHome/HaatzaNestBannerLoadingSkeleton';
import { HaatzaNestReferralBanner } from '../../components/HaatzaNestReferral/HaatzaNestReferralBanner';
import heroBannerOfficial from '../../assets/haatza_nest_hero_banner_official.jpg';
import heroBannerMopping from '../../assets/haatza_nest_hero_banner_mopping.jpg';
import specialistCleanImg from '../../assets/haatza_namaste_pro_clean.png';
import namasteProImg from '../../assets/haatza-nest-namaste-pro.jpg';
import serviceHouseCleaning from '../../assets/services/house-cleaning.jpg';
import serviceMopping from '../../assets/services/mopping.jpg';
import serviceDustingWiping from '../../assets/services/dusting-wiping.jpg';
import serviceDishwashing from '../../assets/services/dishwashing.jpg';
import serviceMealPrep from '../../assets/services/meal-prep.jpg';
import serviceBathroomCleaning from '../../assets/services/bathroom-cleaning.jpg';
import serviceLaundryIroning from '../../assets/services/laundry-ironing.jpg';
import expertSilhouette from '../../assets/haatza_house_help_expert_silhouette.png';
import { 
  Sparkles, MapPin, 
  CheckCircle2, ChevronRight, ArrowRight, 
  Zap, Calendar, Copy, Check, Share2, 
  XCircle, AlertCircle,
  Users, Leaf, ChevronLeft, Home
} from 'lucide-react';

const SERVICE_DESCRIPTIVE_CONTENT: Record<string, string> = {
  'srv-clean-deep': 'Trusted Experts • Complete Home Care • Quality Service',
  'srv-bath-deep': 'Hygienic Bathrooms • Expert Care • Sparkling Clean',
  'srv-mopping-daily': 'Spotless Floors • Reliable Experts • Fresh Spaces',
  'srv-utensils-wash': 'Expert Dish Care • Clean Utensils • Hygienic Kitchen',
  'srv-ironing-steam': 'Expert Garment Care • Neat Finish • Care You Can Trust',
  'srv-meal-assist': 'Trusted Home Helpers • Fresh Preparation • Quality Care',
  'full-home-deep-cleaning': 'Trusted Experts • Complete Home Care • Quality Service',
  'bathroom-stain-descaling': 'Hygienic Bathrooms • Expert Care • Sparkling Clean',
  'daily-maid-mopping-sweeping': 'Spotless Floors • Reliable Experts • Fresh Spaces',
  'sink-dishwashing-utensils-assist': 'Expert Dish Care • Clean Utensils • Hygienic Kitchen',
  'doorstep-steam-ironing-laundry': 'Expert Garment Care • Neat Finish • Care You Can Trust',
  'meal-assistance-prep': 'Trusted Home Helpers • Fresh Preparation • Quality Care',
};

// 6 Official Backend HAATZA Nest Service Cards with Dedicated High-Res Backend Artworks (1080x1456)
const DEFAULT_BACKEND_SCOPE_SERVICES: HaatzaNestHomeService[] = [
  {
    id: 'srv-backend-0',
    slug: 'house-cleaning',
    name: 'House Cleaning',
    category: 'Home Service',
    categorySlug: 'home-services',
    shortDescription: 'Professional House Cleaning by background-verified helpers.',
    fullDescription: 'Professional House Cleaning starting at ₹99.',
    price: 99,
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 96,
    iconName: 'Sparkles',
    image: 'https://static.wixstatic.com/media/73d0ef_0b2f688068434e46a538a629de0a6e17~mv2.png',
    popular: true,
    packages: [],
    included: [
      'Sweep and mop accessible floors',
      'Dust and wipe furniture and wardrobes',
      'Dust reachable walls, fans, ceilings',
      'Change or rearrange existing bedding',
      'Dispose wet and dry household waste',
    ],
    excluded: [
      'Cleaning unsafe or inaccessible areas',
      'Any tasks involving ladders or working at height',
      'Moving heavy furniture or appliances',
      'Cleaning outside home areas',
      'Child, elderly, pet or medical care',
    ],
  },
  {
    id: 'srv-backend-1',
    slug: 'meal-assistance',
    name: 'Meal Assistance',
    category: 'Home Service',
    categorySlug: 'home-services',
    shortDescription: 'Professional Meal Assistance by background-verified helpers.',
    fullDescription: 'Professional Meal Assistance starting at ₹99.',
    price: 99,
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 110,
    iconName: 'Salad',
    image: 'https://static.wixstatic.com/media/73d0ef_df2b5922e789460a9c223f9721aa8600~mv2.png',
    popular: true,
    packages: [],
    included: [
      'Basic meal preparation such as washing, cutting and arranging ingredients',
      'Plating and serving prepared food',
      'Setting up plates, cutlery and serving dishes',
      'Reheating already prepared food',
      'Cleaning and organizing the dining and meal preparation area after serving',
    ],
    excluded: [
      'Cooking or preparing dishes from raw ingredients',
      'Deep frying, baking or pressure cooking',
      'Preparing meals that require extensive cooking',
      'Handling raw meat, fish or other hazardous ingredients',
      'Kitchen deep cleaning or stain removal',
    ],
  },
  {
    id: 'srv-backend-2',
    slug: 'bathroom-cleaning',
    name: 'Bathroom Cleaning',
    category: 'Home Service',
    categorySlug: 'home-services',
    shortDescription: 'Professional Bathroom Cleaning by background-verified helpers.',
    fullDescription: 'Professional Bathroom Cleaning starting at ₹49.',
    price: 49,
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 124,
    iconName: 'Sparkle',
    image: 'https://static.wixstatic.com/media/73d0ef_bbb27baf115e4695ac3e567912c4bd2a~mv2.png',
    popular: false,
    packages: [],
    included: [
      'Clean mirrors and reachable walls',
      'Clean WC (rim, seat, and lid)',
      'Scrub sinks and wipe fittings',
      'Mop and dry the bathroom floor',
      'Basic surface clean in bathroom',
    ],
    excluded: [
      'Hard stains, grouts or acid wash',
      'Cleaning ceilings and exhausts',
      'No drain unclogging/dismantling',
      'Handling biohazard waste',
      'No electrical or open wiring work',
    ],
  },
  {
    id: 'srv-backend-3',
    slug: 'laundry-ironing',
    name: 'Laundry & Ironing',
    category: 'Home Service',
    categorySlug: 'home-services',
    shortDescription: 'Professional Laundry & Ironing by background-verified helpers.',
    fullDescription: 'Professional Laundry & Ironing starting at ₹25.',
    price: 25,
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 138,
    iconName: 'Shirt',
    image: 'https://static.wixstatic.com/media/73d0ef_8ce9f719540942f18666cfcab4f6de01~mv2.png',
    popular: false,
    packages: [],
    included: [
      'Sort clothes and machine wash',
      'Dry clothes on a line or rack',
      'Fold and arrange in cupboards',
      'Iron regular daily wear clothes',
      'Tidy the laundry area after work',
    ],
    excluded: [
      'Ironing delicate or expensive fabrics',
      'Handling biohazard-stained clothes',
      'Cleaning the washing machine or dryer',
      'Advanced stain treatments',
      'Hand washing bed sheets, or footwear',
    ],
  },
  {
    id: 'srv-backend-4',
    slug: 'cleaning-dishes',
    name: 'Cleaning Dishes',
    category: 'Home Service',
    categorySlug: 'home-services',
    shortDescription: 'Professional Cleaning Dishes by background-verified helpers.',
    fullDescription: 'Professional Cleaning Dishes starting at ₹35.',
    price: 35,
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 152,
    iconName: 'Utensils',
    image: 'https://static.wixstatic.com/media/73d0ef_d5bf7f4e43b54de5899ac4a629c65182~mv2.png',
    popular: false,
    packages: [],
    included: [
      'Wash regular household utensils',
      'Scrub and clean the kitchen sink',
      'Clean burners & wipe stove top',
      'Dispose wet/dry kitchen waste',
      'Leave sink area clean and dry',
    ],
    excluded: [
      'Chimney, degreasing or duct cleaning',
      'Cleaning inside of electrical appliances',
      'Heavy scrubbing of burnt/old deposits',
      'Handling broken glass/sharp waste',
      'No specialised cookware handling',
    ],
  },
  {
    id: 'srv-backend-5',
    slug: 'and-many-more',
    name: 'And Many More',
    category: 'Home Service',
    categorySlug: 'home-services',
    shortDescription: 'Additional trusted home assistance by background-verified helpers.',
    fullDescription: 'Professional home help services starting at ₹49.',
    price: 49,
    durationMinutes: 60,
    rating: 4.9,
    reviewCount: 166,
    iconName: 'PlusCircle',
    image: 'https://static.wixstatic.com/media/73d0ef_e07b4518ef834af0846bfb8446373c14~mv2.png',
    popular: false,
    packages: [],
    included: [
      'Clean reachable fans and cobwebs',
      'Basic kitchen prep (washing/chopping)',
      'Clean fridge',
      'Organising wardrobes',
      'Clean kitchen slab and stove top',
      'Clean windows (interior areas)',
      'Change or rearrange existing bedding',
      'Arrange sofa cushions',
      'Arrange tabletops (dining or study)',
      'Clean and shine mirrors and taps',
      'Clean appliance exteriors',
    ],
    excluded: [
      'Heavy maintenance or structural work',
      'Working at unsafe heights',
      'External area cleaning',
    ],
  },
];

interface ServiceScopeCardProps {
  srv: HaatzaNestHomeService;
  idx: number;
  isActive: boolean;
  isAutoRotating: boolean;
  onClick: () => void;
}

const ServiceScopeCard: React.FC<ServiceScopeCardProps> = ({
  srv,
  idx,
  isActive,
  isAutoRotating,
  onClick,
}) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Only apply desktop mouse parallax for fine pointers; ignore touch devices
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    // Refined subtle depth response: max ±3.2px
    setParallax({
      x: Number((x * 3.2).toFixed(2)),
      y: Number((y * 3.2).toFixed(2)),
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-pressed={isActive}
      title={
        isActive
          ? isAutoRotating
            ? `${srv.name} (Click to pause on this service)`
            : `${srv.name} (Click again to resume auto-rotation)`
          : `${srv.name} (Click to select)`
      }
      className={`category-card group relative overflow-hidden ${isActive ? 'is-rotated-active is-active' : ''}`}
    >
      {/* Inner Image Container Filling the Entire Card to the Single Outer Border */}
      <div className="w-full h-full rounded-[inherit] overflow-hidden relative flex items-center justify-center bg-white">
        {/* Full Image Display - Complete & Uncropped with object-fit: contain */}
        <img
          src={srv.image}
          alt={srv.name}
          className="w-full h-full object-contain object-center select-none will-change-transform"
          style={{
            objectFit: 'contain',
            transform: isHovered
              ? `translate3d(${parallax.x}px, ${parallax.y}px, 0)`
              : 'translate3d(0, 0, 0)',
            transition: isHovered
              ? 'transform 100ms ease-out'
              : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          loading="lazy"
        />

        {/* Subtle Selection Aura without duplicate inner borders or outlines */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-[inherit] bg-[#7B2CBF]/[0.05] pointer-events-none transition-opacity duration-300"
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
};

export const HaatzaNestHomePage: React.FC = () => {
  const { location, openLocationModal } = useHaatzaNestLocation();
  const { 
    services: apiServices, 
    loading: isDashboardLoading, 
    error: dashboardError,
    dashboardData,
    availability, 
    isAvailable,
    isCovered,
    isOutsideCoverage,
    vendorAvailable,
    availableVendorCount,
    isScheduleAvailable,
    refetch: refetchDashboard,
  } = useHaatzaNestDashboard();

  const [services, setServices] = useState<HaatzaNestHomeService[]>([]);
  const [categories, setCategories] = useState<HaatzaNestServiceCategory[]>([]);
  const [selectedScopeServiceId, setSelectedScopeServiceId] = useState<string>('srv-api-0');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [referralCopied, setReferralCopied] = useState(false);
  const [bannerCopied, setBannerCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeWorksStep, setActiveWorksStep] = useState(0);

  const [bookingFlowMode, setBookingFlowMode] = useState<'none' | 'schedule' | 'instant' | 'summary'>('none');
  const [currentBookingSelection, setCurrentBookingSelection] = useState<NestBookingSelection | null>(null);
  const [summaryPreviousMode, setSummaryPreviousMode] = useState<'schedule' | 'instant'>('schedule');

  // Single-fire Viewport Visibility for What Is Included / Not Included Comparison Boxes
  const [isInclusionsVisible, setIsInclusionsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !('IntersectionObserver' in window);
  });
  const inclusionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInclusionsVisible) return;
    const target = inclusionsRef.current;
    if (!target) return;

    // If already in viewport (or scrolled past), reveal immediately
    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsInclusionsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInclusionsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '60px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isInclusionsVisible, activeCardIndex, selectedScopeServiceId]);

  // Synchronized 6-second continuous animation loop for How HAATZA Nest Works (2s per step)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const worksTimer = setInterval(() => {
      setActiveWorksStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(worksTimer);
  }, []);

  // 7 Home Services Showcase Configuration with Haatza Nest Uniformed Employees
  const homeServicesShowcase = [
    {
      id: 'house-cleaning',
      name: 'House Cleaning',
      image: serviceHouseCleaning,
      alt: 'Professional female house cleaning specialist in Haatza Nest uniform wiping table',
      categorySlug: 'home-cleaning',
      serviceId: 'srv-clean-deep',
    },
    {
      id: 'mopping',
      name: 'Mopping',
      image: serviceMopping,
      alt: 'Professional female mopping specialist in Haatza Nest uniform cleaning floor',
      categorySlug: 'sweeping-mopping',
      serviceId: 'srv-mopping-daily',
    },
    {
      id: 'dusting-wiping',
      name: 'Dusting & Wiping',
      image: serviceDustingWiping,
      alt: 'Professional female dusting specialist in Haatza Nest uniform dusting shelves',
      categorySlug: 'home-cleaning',
      serviceId: 'srv-clean-deep',
    },
    {
      id: 'dishwashing',
      name: 'Dishwashing',
      image: serviceDishwashing,
      alt: 'Professional female dishwashing specialist in Haatza Nest uniform cleaning dishes',
      categorySlug: 'utensil-cleaning',
      serviceId: 'srv-utensils-wash',
    },
    {
      id: 'meal-prep',
      name: 'Meal Preparation',
      image: serviceMealPrep,
      alt: 'Professional female meal preparation specialist in Haatza Nest uniform chopping vegetables',
      categorySlug: 'meal-assistance',
      serviceId: 'srv-meal-assist',
    },
    {
      id: 'bathroom-cleaning',
      name: 'Bathroom Cleaning',
      image: serviceBathroomCleaning,
      alt: 'Professional female bathroom cleaning specialist in Haatza Nest uniform sanitizing vanity',
      categorySlug: 'bathroom-cleaning',
      serviceId: 'srv-bath-deep',
    },
    {
      id: 'laundry-ironing',
      name: 'Laundry & Ironing',
      image: serviceLaundryIroning,
      alt: 'Professional female laundry and ironing specialist in Haatza Nest uniform pressing clothes',
      categorySlug: 'laundry-ironing',
      serviceId: 'srv-ironing-steam',
    },
  ];

  const [activeServiceId, setActiveServiceId] = useState<string>('showcase-0');
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      servicesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleServiceSelect = (item: typeof homeServicesShowcase[0]) => {
    setActiveServiceId(item.id);
    const target = 
      services.find((s) => s.id === item.serviceId) ||
      services.find((s) => s.categorySlug === item.categorySlug) ||
      services.find((s) => s.name.toLowerCase().includes(item.name.toLowerCase()));
    if (target) {
      const scopeIdx = scopeServices.findIndex(s => s.id === target.id || s.slug === target.slug || s.name.toLowerCase().includes(target.name.toLowerCase()));
      if (scopeIdx !== -1) {
        handleScopeCardClick(scopeIdx, scopeServices[scopeIdx].id);
      }
      document.getElementById('service-scope')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const kitchenBanner = {
    id: 'kitchen',
    label: 'Kitchen Deep Cleaning',
    eyebrow: 'KITCHEN DEEP CLEANING',
    headlinePrefix: 'Get Your Kitchen',
    headlineAccent: 'Sanitized.',
    description: 'Professional Countertop Scrubbing, Chimney Degreasing & Stove Sanitization by Certified Helpers.',
    offerText: 'Kitchen service starting at',
    offerPrice: '₹799 only.',
    image: '',
    alt: 'HAATZA Nest Kitchen Deep Cleaning Service Banner',
    serviceSlug: 'srv-kitchen-degrease',
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [allSrv, cats] = await Promise.all([
          haatzaNestService.getAllServices(),
          haatzaNestService.getCategories(),
        ]);
        setServices(allSrv);
        setCategories(cats);
        if (allSrv.length > 0) {
          setSelectedScopeServiceId(allSrv[0].id);
        }
      } catch (e) {
        console.error('Failed loading NEST services', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://haatzanest.com/invite?code=NEST100');
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2500);
  };

  const dynamicApiServices = useMemo<HaatzaNestHomeService[]>(() => {
    if (apiServices && apiServices.length > 0) {
      return apiServices.map((srv, idx) => ({
        id: `srv-api-${idx}`,
        slug: srv.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: srv.name,
        category: 'Home Service',
        categorySlug: 'home-services',
        shortDescription: `Professional ${srv.name} by background-verified helpers.`,
        fullDescription: `Professional ${srv.name} starting at ₹${srv.price}.`,
        price: srv.price,
        durationMinutes: 60,
        rating: 4.9,
        reviewCount: 96 + idx * 14,
        iconName: 'Sparkles',
        image: srv.image,
        popular: idx < 2,
        packages: [],
        included: (srv.serviceIncluded && srv.serviceIncluded.length > 0)
          ? srv.serviceIncluded
          : (DEFAULT_BACKEND_SCOPE_SERVICES.find((d) => d.name.toLowerCase() === srv.name.toLowerCase())?.included || DEFAULT_BACKEND_SCOPE_SERVICES[idx]?.included || []),
        excluded: (srv.serviceExcluded && srv.serviceExcluded.length > 0)
          ? srv.serviceExcluded
          : (DEFAULT_BACKEND_SCOPE_SERVICES.find((d) => d.name.toLowerCase() === srv.name.toLowerCase())?.excluded || DEFAULT_BACKEND_SCOPE_SERVICES[idx]?.excluded || []),
      }));
    }
    return DEFAULT_BACKEND_SCOPE_SERVICES;
  }, [apiServices]);

  const scopeServices = dynamicApiServices;

  // Automatic Purple Color Rotation across the 6 Scope Service Cards (~1.8s per card)
  useEffect(() => {
    if (!isAutoRotating || scopeServices.length === 0) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % scopeServices.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isAutoRotating, scopeServices.length]);

  const handleScopeCardClick = (idx: number, srvId: string) => {
    if (isAutoRotating) {
      // Click a card: immediately stop automatic rotation and keep purple highlight ONLY on clicked card
      setIsAutoRotating(false);
      setActiveCardIndex(idx);
      setSelectedScopeServiceId(srvId);
    } else {
      // Resume automatic mode: clicking currently selected card again resumes rotation from that card
      if (activeCardIndex === idx) {
        setIsAutoRotating(true);
      } else {
        // Switch manual selection to a different card (still paused)
        setActiveCardIndex(idx);
        setSelectedScopeServiceId(srvId);
      }
    }
  };
  const activeScopeService = scopeServices[activeCardIndex] || scopeServices.find((s) => s.id === selectedScopeServiceId) || scopeServices[0];
  const firstVisitService = services.find(
    (s) => s.slug === 'daily-maid-mopping-sweeping' || s.id === 'srv-mopping-daily'
  ) || services[0];
  const kitchenService = services.find(
    (s) => s.id === kitchenBanner.serviceSlug || s.slug === kitchenBanner.serviceSlug
  ) || services[0];

  const handleBookingModeSelect = (mode: 'schedule' | 'instant') => {
    if (!isAvailable) {
      openLocationModal();
      return;
    }
    if (mode === 'instant') {
      if (!vendorAvailable) {
        // Instant employees currently assisting nearby families - prevent opening sheet
        return;
      }
      setBookingFlowMode('instant');
    } else {
      setBookingFlowMode('schedule');
    }
  };

  const handleProceedToSummaryFromSchedule = (selection: NestBookingSelection) => {
    setCurrentBookingSelection(selection);
    setSummaryPreviousMode('schedule');
    setBookingFlowMode('summary');
  };

  const handleProceedToSummaryFromInstant = (selection: NestBookingSelection) => {
    setCurrentBookingSelection(selection);
    setSummaryPreviousMode('instant');
    setBookingFlowMode('summary');
  };

  const handleSummaryBack = () => {
    setBookingFlowMode(summaryPreviousMode);
  };

  const handleSummaryComplete = () => {
    setBookingFlowMode('none');
    setCurrentBookingSelection(null);
  };

  if (loading && services.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-6">
        <HaatzaNestLoading type="skeleton" count={6} />
      </div>
    );
  }

  // Check if API request failed or availability status is unknown
  const isAvailabilityErrorOrUnknown = Boolean(
    dashboardError ||
    (!isDashboardLoading && (!availability || typeof availability.status !== 'boolean'))
  );

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#F7F1FF] min-h-screen">
      
      {/* =========================================================================
          LOCATION-BASED & EMPLOYEE-AVAILABILITY CONDITIONAL RENDERING:
          1. Loading state: While availability API check is pending, show loading skeleton.
          2. Unserviceable location (!isAvailable):
             - Hide hero banner, Instant Booking, and Schedule Booking.
             - Display "We Are Coming Soon" UI.
          3. Serviceable location (isAvailable === true):
             a. Instant employees available (vendorAvailable === true):
                - Display existing Hero Carousel normally.
                - Display Instant Booking & Schedule Booking normally.
             b. Instant employees unavailable (vendorAvailable === false):
                - Do NOT show "We Are Coming Soon" (location is serviceable).
                - Hide the existing hero banner only.
                - Display the friendly, professional employee-unavailability banner:
                  "A Little More Time, A Better Home Experience" in the exact hero banner area.
                - Instant Booking remains visible in its existing position with light neutral
                  disabled appearance and all actions disabled.
                - Schedule Booking remains visible and functional for future slots.
          4. All other homepage sections below remain visible and functional in all states.
          ========================================================================= */}
      {isDashboardLoading ? (
        <HaatzaNestBannerLoadingSkeleton />
      ) : isAvailabilityErrorOrUnknown ? (
        <HaatzaNestAvailabilityErrorSection 
          errorMessage={dashboardError}
          onRetry={refetchDashboard}
          onOpenLocationModal={openLocationModal}
        />
      ) : (
        <HaatzaNestBookingOptionsSection onSelectBookingMode={handleBookingModeSelect} />
      )}

      {/* =========================================================================
          SECTION D (PART 2): REFERENCE 4 SNABBIT-INSPIRED "WHAT IS INCLUDED" EXPLORER
          ========================================================================= */}
      <section id="service-scope" className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 scroll-mt-28">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E0F3] shadow-sm space-y-8">
          
          {/* Header Row - Centered Heading */}
          <div className="text-center max-w-xl lg:max-w-2xl mx-auto space-y-2.5 px-4 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#7B2CBF] bg-purple-50 px-3 py-1 rounded-full inline-block">
              Transparent Service Scope
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#35106F] font-heading leading-tight tracking-tight">
              One Expert. <span className="text-[#7B2CBF]">Every Home Need.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4A4654] font-medium leading-relaxed">
              Clear Services. Honest Pricing. No Surprises.
            </p>
          </div>

          {/* 1. Category Cards Row (.category-list) - Centered and Enriched Size */}
          <div className="relative">
            <div className="category-list">
              {scopeServices.map((srv, idx) => (
                <ServiceScopeCard
                  key={srv.id}
                  srv={srv}
                  idx={idx}
                  isActive={idx === activeCardIndex}
                  isAutoRotating={isAutoRotating}
                  onClick={() => handleScopeCardClick(idx, srv.id)}
                />
              ))}
            </div>

            {/* Seamless Brand Specialist Silhouette Illustration - Positioned in the marked place beside category cards on desktop */}
            <div className="hidden xl:flex absolute right-0 bottom-1 items-end justify-center pointer-events-none select-none z-10">
              <img
                src={expertSilhouette}
                alt="HAATZA Nest House Help Expert"
                className="h-44 sm:h-48 md:h-52 lg:h-56 xl:h-60 w-auto object-contain drop-shadow-xs"
              />
            </div>
          </div>

          {/* 2. Included / Not Included Comparison Section (.inclusion-grid) */}
          {activeScopeService && (
            <div className="space-y-6 pt-2">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-black text-[#25212D]">
                  What is included in <span className="text-[#7b2cbf]">{activeScopeService.name}</span>?
                </h3>
              </div>

              <div 
                ref={inclusionsRef}
                className={`inclusion-grid ${isInclusionsVisible ? 'inclusion-revealed' : ''}`}
              >
                
                {/* Left Card: Included (The expert is trained to) */}
                <div className="inclusion-card inclusion-card-included space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="inclusion-header-icon w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                      <Check className="w-4 h-4 stroke-[3.5]" />
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-[#064e3b] font-heading">
                      The expert is trained to:
                    </h4>
                  </div>

                  <ul key={`inc-${activeScopeService.id}`} className="space-y-1.5 pt-2">
                    {activeScopeService.included.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="inclusion-list-item flex items-start gap-3 text-xs sm:text-sm text-[#065f46] font-medium leading-relaxed group"
                        style={{ animationDelay: `${idx * 60 + 80}ms` }}
                      >
                        <div 
                          className="inclusion-check-icon w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center shrink-0 mt-0.5 text-white shadow-2xs group-hover:scale-110 transition-transform duration-200"
                          style={{ animationDelay: `${idx * 60 + 110}ms` }}
                        >
                          <Check className="w-3 h-3 stroke-[3.5]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Card: Not Included (What is not included) */}
                <div className="inclusion-card inclusion-card-excluded space-y-4 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="inclusion-header-icon w-7 h-7 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-[#7f1d1d] font-heading">
                      What is not included:
                    </h4>
                  </div>

                  <ul key={`exc-${activeScopeService.id}`} className="space-y-1.5 pt-2">
                    {activeScopeService.excluded && activeScopeService.excluded.length > 0 ? (
                      activeScopeService.excluded.map((item, idx) => (
                        <li 
                          key={idx} 
                          className="inclusion-list-item flex items-start gap-3 text-xs sm:text-sm text-[#991b1b] font-medium leading-relaxed group"
                          style={{ animationDelay: `${idx * 60 + 130}ms` }}
                        >
                          <div 
                            className="inclusion-cross-icon w-5 h-5 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0 mt-0.5 text-white shadow-2xs group-hover:scale-110 transition-transform duration-200"
                            style={{ animationDelay: `${idx * 60 + 160}ms` }}
                          >
                            <span className="text-[11px] font-black leading-none">✕</span>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-500 italic py-2">
                        <span>No specific exclusions — all standard domestic tasks included</span>
                      </li>
                    )}
                  </ul>
                </div>

              </div>


              {/* Bottom Direct Booking Controls with Schedule and Book Instant */}
              <div className="bg-[#FAF8FD] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
                
                {/* Service Details & Trust tag */}
                <div className="flex items-center gap-3.5 text-center md:text-left w-full md:w-auto justify-center md:justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7B2CBF] flex items-center justify-center font-black shadow-xs shrink-0">
                    <Sparkles className="w-6 h-6 fill-[#7B2CBF]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <h4 className="text-base font-black text-[#25212D] leading-tight">
                        {activeScopeService.name}
                      </h4>
                      {activeScopeService.price > 0 && (
                        <span className="text-xs font-black text-[#7B2CBF] bg-purple-100/90 px-2.5 py-0.5 rounded-full">
                          ₹{activeScopeService.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#625D6E] mt-0.5">
                      {SERVICE_DESCRIPTIVE_CONTENT[activeScopeService.id] ||
                        SERVICE_DESCRIPTIVE_CONTENT[activeScopeService.slug] ||
                        activeScopeService.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: Schedule and Book Instant - Only shown when service is available */}
                {isAvailable && (
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full md:w-auto shrink-0 sm:min-w-[300px] md:min-w-[340px]">
                    {/* Schedule Button */}
                    <button
                      type="button"
                      onClick={() => isScheduleAvailable && handleBookingModeSelect('schedule')}
                      disabled={!isScheduleAvailable}
                      aria-disabled={!isScheduleAvailable}
                      className={
                        isScheduleAvailable
                          ? "inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white border-2 border-[#7B2CBF] text-[#7B2CBF] hover:bg-purple-50 font-black text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
                          : "inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-[#EDE7F6] text-[#8C839C] border border-[#DDD4EB] font-bold text-xs sm:text-sm tracking-wide shadow-none cursor-not-allowed select-none"
                      }
                    >
                      <Calendar className="w-4 h-4 text-[#7B2CBF] group-hover:scale-110 transition-transform shrink-0" />
                      <span>Schedule</span>
                    </button>

                    {/* Book Instant Button */}
                    <button
                      type="button"
                      onClick={() => vendorAvailable && handleBookingModeSelect('instant')}
                      disabled={!vendorAvailable}
                      aria-disabled={!vendorAvailable}
                      title={vendorAvailable ? "Book Instant Service" : "Specialists currently helping nearby families"}
                      className={
                        vendorAvailable
                          ? "inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] hover:from-[#6A1B9A] hover:to-[#8B2FC9] text-white font-black text-xs sm:text-sm tracking-wide shadow-md shadow-purple-600/25 hover:shadow-lg hover:shadow-purple-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
                          : "inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-[#EDE7F6] text-[#8C839C] border border-[#DDD4EB] font-bold text-xs sm:text-sm tracking-wide shadow-none cursor-not-allowed select-none"
                      }
                    >
                      <Zap className={`w-4 h-4 shrink-0 ${vendorAvailable ? 'fill-[#FFD83D] text-[#FFD83D] group-hover:scale-110' : 'text-[#8C839C] fill-[#8C839C]'} transition-transform`} />
                      <span className="truncate">{vendorAvailable ? 'Book Instant' : 'Instant (Busy)'}</span>
                    </button>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION: EXPLORE OUR HOUSE HELP SERVICES (7 UNIFORMED SPECIALISTS)
          - Clean professional heading: "Explore Our House Help Services"
          - Supporting text: "Expert care for every corner of your home."
          - Continuous, seamless right-to-left horizontal auto-scrolling carousel
          - Positioned directly above the Join & Earn ₹100 banner
          ========================================================================= */}
      <HaatzaNestExploreServicesSection
        services={homeServicesShowcase}
        activeServiceId={activeServiceId}
        onSelectService={handleServiceSelect}
        onHoverService={setActiveServiceId}
      />

      {/* =========================================================================
          SECTION: REFER & EARN BANNER ("Join & Earn ₹100" Banner)
          ========================================================================= */}
      <HaatzaNestReferralBanner className="my-8 sm:my-12" />

      {/* =========================================================================
          SECTION F: HOW IT WORKS (3 Simple Connected Steps)
          ========================================================================= */}
      <section id="how-it-works" className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 scroll-mt-28">
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#7027C9]">Seamless Process</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#25212D] font-heading">
              How Haatza Nest Works
            </h2>
            <p className="text-xs text-[#625D6E] font-medium">
              Professional domestic service at your door in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Step 1 */}
            <div 
              className={`haatza-step-card bg-white rounded-3xl p-6 sm:p-7 border relative space-y-3 z-10 text-center ${
                activeWorksStep === 0 
                  ? 'haatza-step-card-active' 
                  : 'border-[#E8E0F3] shadow-xs'
              }`}
            >
              <h3 className="text-base sm:text-lg font-black text-[#25212D]">
                Choose Your Service
              </h3>
              <p className="text-xs text-[#625D6E] leading-relaxed">
                Explore our home cleaning services, choose the tasks you need, and view transparent pricing before booking.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => handleBookingModeSelect('instant')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleBookingModeSelect('instant');
                }
              }}
              className={`haatza-step-card bg-white rounded-3xl p-6 sm:p-7 border relative space-y-3 z-10 text-center cursor-pointer hover:border-[#7024C7] transition-all ${
                activeWorksStep === 1 
                  ? 'haatza-step-card-active' 
                  : 'border-[#E8E0F3] shadow-xs'
              }`}
            >
              <h3 className="text-base sm:text-lg font-black text-[#25212D]">
                Select Instant or Schedule
              </h3>
              <p className="text-xs text-[#625D6E] leading-relaxed">
                Need help right away? Choose Instant for immediate assistance or Schedule to book a convenient date and time that works for you.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              className={`haatza-step-card bg-white rounded-3xl p-6 sm:p-7 border relative space-y-3 z-10 text-center ${
                activeWorksStep === 2 
                  ? 'haatza-step-card-active' 
                  : 'border-[#E8E0F3] shadow-xs'
              }`}
            >
              <h3 className="text-base sm:text-lg font-black text-[#25212D]">
                Relax & Enjoy Your Service
              </h3>
              <p className="text-xs text-[#625D6E] leading-relaxed">
                Sit back and relax while your verified expert takes care of your home with reliable, professional service you can trust.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Dedicated Schedule Selection Screen (matches Screenshot 1) */}
      {bookingFlowMode === 'schedule' && (
        <HaatzaNestScheduleScreen
          onBack={() => setBookingFlowMode('none')}
          onProceedToSummary={handleProceedToSummaryFromSchedule}
        />
      )}

      {/* Instant Duration Bottom Sheet (matches Screenshots 2-4) */}
      <HaatzaNestInstantBottomSheet
        isOpen={bookingFlowMode === 'instant'}
        onClose={() => setBookingFlowMode('none')}
        onProceedToSummary={handleProceedToSummaryFromInstant}
      />

      {/* Dedicated Booking Summary Screen (matches Screenshot 5 with HAATZA brand purple) */}
      {bookingFlowMode === 'summary' && currentBookingSelection && (
        <HaatzaNestBookingSummary
          selection={currentBookingSelection}
          onBack={handleSummaryBack}
          onComplete={handleSummaryComplete}
        />
      )}

    </div>
  );
};

export default HaatzaNestHomePage;
