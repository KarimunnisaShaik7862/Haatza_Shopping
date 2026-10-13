import React from 'react';
import { HaatzaNestBookingHistory } from '../../components/HaatzaNestBooking/HaatzaNestBookingHistory';

export const HaatzaNestBookingsPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-zinc-200/80 pb-4">
        <h1 className="text-2xl font-black text-zinc-900 font-heading">
          My Service Bookings
        </h1>
        <p className="text-xs text-zinc-500 font-medium">
          Track upcoming appointments, professional assignments, and booking history.
        </p>
      </div>

      <HaatzaNestBookingHistory />
    </div>
  );
};
