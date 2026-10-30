import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { 
  NEST_DURATION_OPTIONS, 
  NestDurationOption, 
  NestBookingSelection,
  TimePeriod,
  TIME_PERIOD_SLOTS,
  isSlotAvailable,
  formatBookingDateToBackend,
} from './nestBookingData';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';

export interface HaatzaNestScheduleScreenProps {
  onBack: () => void;
  onProceedToSummary: (selection: NestBookingSelection) => void;
}

export const HaatzaNestScheduleScreen: React.FC<HaatzaNestScheduleScreenProps> = ({
  onBack,
  onProceedToSummary,
}) => {
  const { location } = useHaatzaNestLocation();
  const { durations: apiDurations } = useHaatzaNestDashboard();
  const durationList = apiDurations && apiDurations.length > 0 ? apiDurations : NEST_DURATION_OPTIONS;

  // State:
  // - selectedDateOption starts null so time-period tabs/slots are hidden initially
  // - selectedDuration starts null so all duration cards are unselected initially
  const [selectedDateOption, setSelectedDateOption] = useState<'Today' | 'Tomorrow' | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<NestDurationOption | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('Morning');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Micro-interaction states: smooth entrance/exit & duplicate submission prevention
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onBack();
    }, 200);
  };

  const addressText = location.formattedAddress || (location.locality ? `${location.locality}${location.pincode ? `, ${location.pincode}` : ''}` : 'Location not selected');

  // Date switching: reset both duration and time slot on date change
  const handleDateChange = (newDate: 'Today' | 'Tomorrow') => {
    if (selectedDateOption !== newDate) {
      setSelectedDateOption(newDate);
      setSelectedDuration(null);
      setSelectedTimeSlot(null);
    }
  };

  // Duration switching: reset selected time slot when duration changes
  const handleDurationChange = (opt: NestDurationOption) => {
    setSelectedDuration(opt);
    setSelectedTimeSlot(null);
  };

  // Period switching: reset selected time only if invalid in newly selected period
  const handlePeriodChange = (newPeriod: TimePeriod) => {
    setSelectedPeriod(newPeriod);
    const slotsInNewPeriod = TIME_PERIOD_SLOTS[newPeriod];
    if (selectedTimeSlot && !slotsInNewPeriod.includes(selectedTimeSlot)) {
      setSelectedTimeSlot(null);
    }
  };

  // Get active period slots
  const currentSlots = useMemo(() => {
    return TIME_PERIOD_SLOTS[selectedPeriod];
  }, [selectedPeriod]);

  // Check if at least one slot in the active period is available
  const hasAnyAvailableInPeriod = useMemo(() => {
    if (!selectedDateOption) return false;
    const isToday = selectedDateOption === 'Today';
    return currentSlots.some((slot) => isSlotAvailable(slot, isToday));
  }, [currentSlots, selectedDateOption]);

  // Check if at least one slot is available today across all periods
  const hasAnySlotToday = useMemo(() => {
    if (selectedDateOption !== 'Today') return true;
    return Object.values(TIME_PERIOD_SLOTS).some((slots) =>
      slots.some((slot) => isSlotAvailable(slot, true))
    );
  }, [selectedDateOption]);

  // Validation: date, duration, and time slot must all be manually selected
  const isReadyToBook = Boolean(selectedDateOption && selectedDuration && selectedTimeSlot);

  const handleBookNow = () => {
    if (!selectedDateOption || !selectedDuration || !selectedTimeSlot || isSubmitting) return;
    setIsSubmitting(true);

    const baseDate = new Date();
    if (selectedDateOption === 'Tomorrow') {
      baseDate.setDate(baseDate.getDate() + 1);
    }

    const dateFormatted = formatBookingDateToBackend(baseDate);

    const selection: NestBookingSelection = {
      mode: 'schedule',
      selectedDateOption,
      formattedDate: dateFormatted,
      formattedTime: selectedTimeSlot,
      apiBookingDate: dateFormatted,
      apiBookingTime: selectedTimeSlot,
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
      {/* Dark Transparent Backdrop Overlay - Smooth 200ms Fade */}
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
        aria-label="Schedule Booking"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md sm:max-w-lg bg-[#F5F6F8] shadow-2xl flex flex-col transition-all duration-200 ease-out motion-reduce:transform-none ${
          isMounted && !isClosing
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[10px]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="bg-white border-b border-zinc-100 px-4 py-3.5 sm:px-6 sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={handleClose}
                className="p-1 -ml-1 rounded-full text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Back to home"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex flex-col min-w-0">
                <h1 className="font-extrabold text-lg sm:text-xl text-zinc-900 leading-tight font-heading">
                  Schedule
                </h1>
                <p className="text-xs text-zinc-600 truncate mt-0.5">
                  <span className="font-extrabold text-zinc-900">Work</span>
                  <span className="mx-1.5 text-zinc-300">|</span>
                  <span title={addressText}>{addressText}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Close schedule drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Section A: Select Date */}
          <div className="bg-white rounded-3xl p-5 border border-zinc-100/90 shadow-2xs">
            <h2 className="font-extrabold text-base text-zinc-900 mb-3.5 font-heading">
              Select Date
            </h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleDateChange('Today')}
                aria-pressed={selectedDateOption === 'Today'}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedDateOption === 'Today'
                    ? 'bg-[#FAF5FF] border-2 border-[#7B2CBF] text-[#7B2CBF] shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-300 font-medium'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleDateChange('Tomorrow')}
                aria-pressed={selectedDateOption === 'Tomorrow'}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedDateOption === 'Tomorrow'
                    ? 'bg-[#FAF5FF] border-2 border-[#7B2CBF] text-[#7B2CBF] shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-800 hover:border-zinc-300 font-medium'
                }`}
              >
                Tomorrow
              </button>
            </div>
          </div>

          {/* Section B: Duration (Rendered ONLY after a date is selected) */}
          {selectedDateOption !== null && (
            <div className="bg-white rounded-3xl p-5 border border-zinc-100/90 shadow-2xs">
              <h2 className="font-extrabold text-base text-zinc-900 mb-3.5 font-heading">
                Duration
              </h2>
              <div className="overflow-x-auto scrollbar-none flex items-stretch gap-3 pt-3.5 pb-2 -mt-2 -mx-1 px-1">
                {durationList.map((opt) => {
                  const isSelected = selectedDuration?.id === opt.id;
                  const hasBadge = Boolean(opt.badge && opt.badge.trim().toLowerCase() === 'popular');
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleDurationChange(opt)}
                      aria-pressed={isSelected}
                      className={`relative w-[114px] sm:w-[124px] h-[104px] sm:h-[112px] shrink-0 flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer select-none ${
                        isSelected
                          ? 'bg-[#FAF5FF] border-2 border-[#7B2CBF] shadow-xs'
                          : 'bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                      }`}
                    >
                      {hasBadge && (
                        <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FFD43B] text-[#281044] shadow-xs border border-yellow-300 z-10 pointer-events-none select-none inline-flex items-center justify-center leading-tight">
                          {opt.badge}
                        </span>
                      )}
                      <span className="font-bold text-sm sm:text-base text-zinc-900 leading-tight">
                        {opt.durationLabel}
                      </span>

                      <div className="flex items-baseline gap-1.5 mt-auto">
                        <span className="font-extrabold text-sm sm:text-base text-zinc-900 leading-none">
                          ₹{opt.price}
                        </span>
                        {opt.originalPrice > opt.price && (
                          <span className="text-xs text-zinc-400 line-through leading-none font-normal">
                            ₹{opt.originalPrice}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section C: Start Time (Rendered ONLY after duration has been selected) */}
          {selectedDateOption !== null && selectedDuration !== null && (
            <div className="bg-white rounded-3xl p-5 border border-zinc-100/90 shadow-2xs">
              <h2 className="font-extrabold text-base text-zinc-900 mb-3.5 font-heading">
                Start Time
              </h2>

              {/* Pill Tab Switcher: Morning, Afternoon, Evening */}
              <div 
                role="tablist"
                aria-label="Select Time Period"
                className="bg-[#F2F3F6] p-1 rounded-full flex items-center mb-4"
              >
                {(['Morning', 'Afternoon', 'Evening'] as TimePeriod[]).map((period) => {
                  const isActive = selectedPeriod === period;
                  return (
                    <button
                      key={period}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handlePeriodChange(period)}
                      className={`flex-1 py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold text-center transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#7B2CBF] text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900 font-semibold'
                      }`}
                    >
                      {period}
                    </button>
                  );
                })}
              </div>

              {/* Responsive 3-Column Time Slot Grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {currentSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  const isToday = selectedDateOption === 'Today';
                  const available = isSlotAvailable(slot, isToday);

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedTimeSlot(slot)}
                      aria-pressed={isSelected}
                      aria-disabled={!available}
                      className={`py-2.5 sm:py-3 px-1 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-150 text-center select-none ${
                        !available
                          ? 'border border-zinc-200/80 bg-zinc-100/70 text-zinc-400 line-through decoration-zinc-300 opacity-45 cursor-not-allowed pointer-events-none'
                          : isSelected
                          ? 'border-2 border-[#7B2CBF] bg-[#FAF5FF] text-[#7B2CBF] font-bold shadow-xs active:scale-98 cursor-pointer'
                          : 'border border-zinc-200/90 bg-white text-zinc-800 hover:border-[#7B2CBF]/60 hover:bg-purple-50/20 active:scale-98 cursor-pointer'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              {/* Notice if all slots in active period have passed today */}
              {!hasAnySlotToday && selectedDateOption === 'Today' ? (
                <div className="mt-3.5 p-3 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between text-xs text-[#7B2CBF]">
                  <span>No time slots are available for today.</span>
                  <button
                    type="button"
                    onClick={() => handleDateChange('Tomorrow')}
                    className="font-bold underline ml-2 hover:text-[#581A9E] cursor-pointer"
                  >
                    Book for Tomorrow
                  </button>
                </div>
              ) : !hasAnyAvailableInPeriod && selectedDateOption === 'Today' ? (
                <div className="mt-3.5 p-3 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between text-xs text-[#7B2CBF]">
                  <span>All {selectedPeriod.toLowerCase()} slots have passed for today.</span>
                  <button
                    type="button"
                    onClick={() => handleDateChange('Tomorrow')}
                    className="font-bold underline ml-2 hover:text-[#581A9E] cursor-pointer"
                  >
                    Book for Tomorrow
                  </button>
                </div>
              ) : null}
            </div>
          )}

        </div>

        {/* Pinned Bottom CTA Bar - ONLY visible when date, duration, and time slot are all selected */}
        {isReadyToBook && selectedDuration && (
          <div className="p-4 sm:p-5 bg-white border-t border-zinc-100 shadow-md flex flex-col gap-2.5 sticky bottom-0 z-20">
            <div className="flex items-center justify-between text-xs sm:text-sm px-1">
              <span className="text-zinc-600 font-medium">
                {selectedDateOption} • {selectedTimeSlot}
              </span>
              <span className="font-extrabold text-zinc-900 text-sm sm:text-base">
                ₹{selectedDuration.price}
                <span className="text-xs text-zinc-400 font-normal ml-1">
                  ({selectedDuration.durationLabel})
                </span>
              </span>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleBookNow}
              className="w-full py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base transition-all duration-180 text-center shadow-md bg-[#7024C7] hover:bg-[#581A9E] text-white hover:shadow-lg active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed select-none cursor-pointer motion-reduce:transform-none"
            >
              {isSubmitting ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
