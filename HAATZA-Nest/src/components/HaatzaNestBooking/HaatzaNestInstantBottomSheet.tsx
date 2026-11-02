import React, { useState, useEffect } from 'react';
import { Zap, X } from 'lucide-react';
import { 
  NEST_DURATION_OPTIONS, 
  NestDurationOption, 
  NestBookingSelection,
  formatBookingDateToBackend,
  formatBookingTimeToBackend,
} from './nestBookingData';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';

import serviceHouseCleaning from '../../assets/services/house-cleaning.jpg';
import serviceMopping from '../../assets/services/mopping.jpg';
import serviceDustingWiping from '../../assets/services/dusting-wiping.jpg';
import serviceDishwashing from '../../assets/services/dishwashing.jpg';
import serviceMealPrep from '../../assets/services/meal-prep.jpg';
import serviceBathroomCleaning from '../../assets/services/bathroom-cleaning.jpg';

export interface HaatzaNestInstantBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToSummary: (selection: NestBookingSelection) => void;
}

export const HaatzaNestInstantBottomSheet: React.FC<HaatzaNestInstantBottomSheetProps> = ({
  isOpen,
  onClose,
  onProceedToSummary,
}) => {
  const { location } = useHaatzaNestLocation();
  const { 
    durations: apiDurations, 
    estimatedTimeInMinutes,
    vendorAvailable,
    availability 
  } = useHaatzaNestDashboard();

  const durationList = apiDurations && apiDurations.length > 0 ? apiDurations : NEST_DURATION_OPTIONS;
  const [selectedDuration, setSelectedDuration] = useState<NestDurationOption>(durationList[0]);

  // Keep selected duration synced when durationList updates
  useEffect(() => {
    if (durationList.length > 0 && (!selectedDuration || !durationList.some(d => d.id === selectedDuration.id))) {
      setSelectedDuration(durationList[0]);
    }
  }, [durationList]);

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Six-image domestic specialist gallery with Haatza Nest uniformed employees
  const galleryImages = [
    { id: 'srv-1', image: serviceHouseCleaning, label: 'Table Cleaning Specialist' },
    { id: 'srv-2', image: serviceMopping, label: 'Floor Mopping Specialist' },
    { id: 'srv-3', image: serviceDustingWiping, label: 'Dusting & Upkeep Specialist' },
    { id: 'srv-4', image: serviceDishwashing, label: 'Dishwashing Specialist' },
    { id: 'srv-5', image: serviceMealPrep, label: 'Meal Preparation Specialist' },
    { id: 'srv-6', image: serviceBathroomCleaning, label: 'Bathroom Cleaning Specialist' },
  ];

  // Prevent background scroll when side popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
      const raf = requestAnimationFrame(() => {
        setIsMounted(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsMounted(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const serviceAreaName = availability?.areaName || location.nestAreaName || location.locality || 'Service Area';
  const addressText = location.formattedAddress || (location.locality ? `${location.locality}${location.pincode ? `, ${location.pincode}` : ''}` : 'Location not selected');
  const dispatchMins = availability?.estimatedTimeInMinutes ?? (estimatedTimeInMinutes > 0 ? estimatedTimeInMinutes : 6);

  // Smooth reverse exit transition when closing
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const handleBookNow = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const now = new Date();
    const dateFormatted = formatBookingDateToBackend(now);
    const timeFormatted = formatBookingTimeToBackend(now);

    const selection: NestBookingSelection = {
      mode: 'instant',
      selectedDateOption: 'Today',
      formattedDate: dateFormatted,
      formattedTime: `Within ${dispatchMins} Mins (Instant Dispatch)`,
      apiBookingDate: dateFormatted,
      apiBookingTime: timeFormatted,
      duration: selectedDuration,
      addressLabel: location.addressType ? (location.addressType.charAt(0).toUpperCase() + location.addressType.slice(1)) : 'Home',
      fullAddress: addressText,
    };

    onProceedToSummary(selection);

    // Prevent duplicate rapid submissions
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 select-none">
      {/* Dark Transparent Overlay Backdrop - Smooth 200ms Fade */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity duration-200 ${
          isMounted && !isClosing ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Side Pop Up Drawer (Smooth Fade-In with 10px Upward Movement) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Instant Booking Duration Selector"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col transition-all duration-200 ease-out motion-reduce:transform-none ${
          isMounted && !isClosing
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[10px]'
        }`}
      >
        {/* Top Header Bar with Close Button */}
        <div className="px-5 py-3.5 sm:py-4 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg text-[#24152F] font-heading">
              Instant Booking
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Instant Dispatch Time Badge with Gradient Border Outline */}
          <div className="inline-flex p-[1.5px] rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 shadow-2xs w-fit">
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white">
              <Zap className="w-3.5 h-3.5 text-[#7024C7] fill-[#7024C7]" />
              <span className="text-sm font-black text-[#7024C7] tracking-tight">{dispatchMins} Min</span>
            </div>
          </div>

          {/* Service Area strictly using availability.areaName */}
          <div className="flex items-baseline gap-2 text-xs sm:text-sm text-zinc-800 pb-0.5">
            <span className="font-extrabold text-[#24152F] shrink-0">
              Service Area
            </span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-700 font-medium truncate" title={serviceAreaName}>
              {serviceAreaName}
            </span>
          </div>

          {/* Horizontally Scrollable Duration Cards (180ms smooth selection transition) */}
          <div className="overflow-x-auto scrollbar-none flex items-center gap-3 pt-3.5 pb-2 -mt-2 px-1 -mx-1">
            {durationList.map((opt) => {
              const isSelected = selectedDuration?.id === opt.id;
              const hasPopularBadge = opt.badge && opt.badge.trim().toLowerCase() === 'popular';
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedDuration(opt)}
                  className={`relative w-[115px] sm:w-[125px] h-[104px] sm:h-[112px] shrink-0 flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-180 ease-out active:scale-[0.98] cursor-pointer select-none motion-reduce:transform-none ${
                    isSelected
                      ? 'bg-[#F5ECFF] border-2 border-[#7024C7] shadow-sm'
                      : 'bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                  }`}
                  aria-pressed={isSelected}
                >
                  {hasPopularBadge && (
                    <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FFD43B] text-[#281044] shadow-xs border border-yellow-300 z-10 pointer-events-none select-none inline-flex items-center justify-center leading-tight">
                      {opt.badge || 'Popular'}
                    </span>
                  )}
                  <span className="font-bold text-sm sm:text-base text-zinc-900 leading-tight">
                    {opt.durationLabel}
                  </span>

                  <div className="flex items-baseline gap-1.5 mt-auto">
                    <span className="font-extrabold text-sm sm:text-base text-zinc-900 leading-none">
                      ₹{opt.price}
                    </span>
                    <span className="text-xs text-zinc-400 line-through leading-none">
                      ₹{opt.originalPrice}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =========================================================================
              SECTION: HAATZA NEST SERVICE SPECIALISTS GALLERY (6-IMAGE GRID)
              - 3 Columns x 2 Rows dynamic clean grid matching reference screenshot
              - Subtle scale effect on desktop hover (capped at 1.02)
              - Brief tap feedback on touch devices without persistent hover
              - Never crop or distort image proportions
              ========================================================================= */}
          <div className="bg-[#FAF8FD] rounded-2xl p-2.5 sm:p-3 border border-purple-100/70 shadow-2xs">
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden border border-purple-200/60 shadow-2xs aspect-[4/3] bg-zinc-100 select-none cursor-pointer transition-transform duration-200 ease-out active:scale-[0.98] motion-reduce:transform-none"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover select-none transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pinned Bottom CTA Bar (Pressed-state scale 0.98, prevent duplicate submission) */}
        <div className="p-4 sm:p-5 bg-white border-t border-zinc-100 shadow-md sticky bottom-0 z-20">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleBookNow}
            className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#7024C7] hover:bg-[#581A9E] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-180 cursor-pointer active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed select-none text-center motion-reduce:transform-none"
          >
            {isSubmitting ? 'Processing...' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
