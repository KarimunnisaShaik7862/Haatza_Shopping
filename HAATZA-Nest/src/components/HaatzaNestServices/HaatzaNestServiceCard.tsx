import React from 'react';
import { HaatzaNestHomeService } from '../../types/haatzaNest.types';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';
import { formatCurrency, formatDuration } from '../../utils/formatters';
import { Star, Clock, CheckCircle2 } from 'lucide-react';
import { HaatzaNestButton } from '../common/HaatzaNestButton';

interface HaatzaNestServiceCardProps {
  service: HaatzaNestHomeService;
  className?: string;
}

export const HaatzaNestServiceCard: React.FC<HaatzaNestServiceCardProps> = React.memo(({
  service,
  className = '',
}) => {
  const { openBookingModal } = useHaatzaNestBooking();

  return (
    <div
      className={`group bg-white rounded-3xl border border-zinc-200/90 overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Service Image Banner */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Rating Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-zinc-900">{service.rating}</span>
            <span className="text-zinc-400 font-medium">({service.reviewCount})</span>
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[11px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md border border-white/20">
              {service.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <h3 className="text-base sm:text-lg font-black text-zinc-900 group-hover:text-[#6C3FC5] transition-colors line-clamp-1 font-heading">
            {service.name}
          </h3>

          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Features list bullet previews */}
          {service.included && service.included.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-zinc-100">
              {service.included.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Details & Action Button */}
      <div className="p-5 pt-0 border-t border-zinc-100/80 mt-2 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
            <Clock className="w-3 h-3 text-zinc-400" />
            <span>{formatDuration(service.durationMinutes)}</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xs text-zinc-400 font-medium">From</span>
            <span className="text-lg font-black text-zinc-900">
              {formatCurrency(service.price)}
            </span>
          </div>
        </div>

        <HaatzaNestButton
          variant="primary"
          size="sm"
          onClick={() => openBookingModal(service)}
          className="shadow-sm font-black"
        >
          Book Now
        </HaatzaNestButton>
      </div>
    </div>
  );
});

HaatzaNestServiceCard.displayName = 'HaatzaNestServiceCard';
