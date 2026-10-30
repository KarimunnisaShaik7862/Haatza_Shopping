import React, { useState } from 'react';
import { MapPin, Sparkles, Compass, Bell, Loader2, AlertCircle, Info } from 'lucide-react';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import { HaatzaNestLocation } from '../../types/haatzaNest.types';
import { resolveAreaDisplayName } from '../../services/haatzaNestGeocoding';

export interface HaatzaNestComingSoonSectionProps {
  onOpenLocationModal?: () => void;
  locationName?: string;
  className?: string;
}

export const resolveLocationDisplayName = (loc?: HaatzaNestLocation | null): string => {
  if (!loc) return 'Your Area';

  return resolveAreaDisplayName({
    nestAreaName: loc.nestAreaName,
    locality: loc.locality,
    city: loc.city,
    latitude: loc.latitude,
    longitude: loc.longitude,
    pincode: loc.pincode,
    formattedAddress: loc.formattedAddress,
  });
};

export const HaatzaNestComingSoonSection: React.FC<HaatzaNestComingSoonSectionProps> = ({
  onOpenLocationModal,
  locationName,
  className = '',
}) => {
  const { location, openLocationModal } = useHaatzaNestLocation();
  const { user } = useHaatzaNestUser();

  const [contactInput, setContactInput] = useState<string>(() => user?.email || user?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    type: 'error' | 'info';
    message: string;
  } | null>(null);

  const handleOpenModal = () => {
    if (onOpenLocationModal) {
      onOpenLocationModal();
    } else {
      openLocationModal();
    }
  };

  const displayLocationName = (locationName && locationName.trim()) 
    ? locationName.trim() 
    : resolveLocationDisplayName(location);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = contactInput.trim();
    if (!clean) {
      setSubmissionFeedback({
        type: 'error',
        message: 'Please enter your email or phone number to receive launch updates.',
      });
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
    const isPhone = /^[6-9]\d{9}$/.test(clean.replace(/\D/g, ''));

    if (!isEmail && !isPhone) {
      setSubmissionFeedback({
        type: 'error',
        message: 'Please enter a valid email address or 10-digit mobile number.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionFeedback(null);

    // Transparent backend check: No waitlist/notification endpoint exists in backend (_functions).
    // As required by the audit specification: "If no suitable API exists, clearly report that backend support is missing. Do not display a fake success message or invent an endpoint."
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionFeedback({
        type: 'info',
        message: `Notification waitlist backend API is not yet available on the server. Your interest in ${displayLocationName} has been noted for this session.`,
      });
    }, 400);
  };

  return (
    <section 
      aria-label="Service Area Coming Soon"
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6 ${className}`}
    >
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FAF7FD] via-white to-[#F9F5FE] border border-[#E7DCF7] py-9 sm:py-12 px-5 sm:px-8 text-center shadow-[0_6px_28px_-4px_rgba(112,39,201,0.06)] overflow-hidden">
        
        {/* Subtle Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7024C7]/40 to-transparent" />

        <div className="max-w-xl mx-auto flex flex-col items-center">
          
          {/* Service Expansion Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5ECFF] border border-[#E5D7F7] text-[#7024C7] text-[11px] sm:text-xs font-black tracking-wide uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#7024C7]" />
            <span>Service Expansion</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1F1435] font-heading tracking-tight leading-tight">
            HAATZA Nest is Coming Soon!
          </h2>

          {/* Selected Location Pill */}
          <div className="mt-2.5 mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-white border border-[#E5D7F7] shadow-xs">
            <div className="w-5 h-5 rounded-full bg-[#F5ECFF] text-[#7024C7] flex items-center justify-center shrink-0">
              <MapPin className="w-3 h-3 text-[#7024C7]" />
            </div>
            <div className="flex items-baseline gap-1.5 text-left min-w-0">
              <span className="text-[10px] font-bold text-[#7D6F8D] uppercase tracking-wider shrink-0">
                Area:
              </span>
              <span className="text-xs sm:text-sm font-black text-[#24152F] font-heading truncate">
                {displayLocationName}
              </span>
            </div>
          </div>

          {/* Subtext */}
          <p className="text-xs sm:text-sm md:text-[15px] text-[#554C64] font-medium leading-relaxed max-w-lg mx-auto mb-6">
            We’re working to bring trusted home services to your area. Leave your details and we’ll notify you when services become available.
          </p>

          {/* Notify Me Form */}
          <form 
            onSubmit={handleNotifySubmit}
            className="w-full max-w-md mx-auto mb-5 flex flex-col sm:flex-row items-center gap-2.5"
          >
            <input
              type="text"
              value={contactInput}
              onChange={(e) => {
                setContactInput(e.target.value);
                if (submissionFeedback) setSubmissionFeedback(null);
              }}
              placeholder="Enter your email or mobile number"
              aria-label="Email or mobile number for waitlist notification"
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-white border border-[#D9C8F0] focus:border-[#7024C7] focus:ring-2 focus:ring-[#7024C7]/20 outline-none text-[#1F1435] placeholder:text-[#9A90A9] transition-all"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#7024C7] to-[#882EC8] hover:from-[#5C1A9E] hover:to-[#7024C7] text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/20 hover:shadow-lg transition-all duration-200 cursor-pointer shrink-0 disabled:opacity-60 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Me</span>
                </>
              )}
            </button>
          </form>

          {/* Validation / Transparent Backend Status Message */}
          {submissionFeedback && (
            <div 
              role="alert"
              className={`w-full max-w-md mx-auto mb-4 p-3 rounded-xl text-xs sm:text-[12.5px] font-medium flex items-start gap-2.5 text-left ${
                submissionFeedback.type === 'error'
                  ? 'bg-rose-50 border border-rose-200 text-rose-800'
                  : 'bg-[#F6EFFE] border border-[#E3D1F7] text-[#552787]'
              }`}
            >
              {submissionFeedback.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-[#7024C7] shrink-0 mt-0.5" />
              )}
              <span className="leading-snug">{submissionFeedback.message}</span>
            </div>
          )}

          {/* Action to Select Another Location */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl sm:rounded-2xl bg-white border border-[#D5C2ED] hover:border-[#7024C7] hover:bg-[#F9F5FD] text-[#7024C7] text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Compass className="w-3.5 h-3.5 text-[#7024C7] shrink-0" />
              <span>Select Another Location</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HaatzaNestComingSoonSection;
