import React from 'react';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';
import { formatCurrency } from '../../utils/formatters';
import { Calendar, CheckCircle2, Clock, MapPin, User } from 'lucide-react';
import { HaatzaNestEmptyState } from '../common/HaatzaNestEmptyState';

export const HaatzaNestBookingHistory: React.FC = () => {
  const { bookings } = useHaatzaNestBooking();

  if (bookings.length === 0) {
    return (
      <HaatzaNestEmptyState
        title="No bookings yet"
        description="Book your first deep clean or home maintenance service with a verified pro."
        actionText="Browse Home Services"
        actionLink="/nest/services"
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white rounded-3xl p-5 border border-zinc-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <img
              src={b.serviceImage}
              alt={b.serviceName}
              className="w-16 h-16 rounded-2xl object-cover shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                  #{b.bookingNumber}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Confirmed
                </span>
              </div>
              <h4 className="text-base font-bold text-zinc-900 font-heading">
                {b.serviceName}
              </h4>
              {b.packageName && (
                <p className="text-xs text-zinc-500 font-medium">Package: {b.packageName}</p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" /> {b.scheduledDate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" /> {b.customerAddress}
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
            <span className="text-lg font-black text-[#6C3FC5]">
              {formatCurrency(b.price)}
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              Pay upon completion
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
