import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  HaatzaNestHomeService, 
  HaatzaNestServiceBooking, 
  HaatzaNestServicePackage 
} from '../types/haatzaNest.types';
import { haatzaNestService } from '../services/haatzaNestService';

interface HaatzaNestBookingContextType {
  bookings: HaatzaNestServiceBooking[];
  activeModalService: HaatzaNestHomeService | null;
  openBookingModal: (service: HaatzaNestHomeService, pkg?: HaatzaNestServicePackage) => void;
  closeBookingModal: () => void;
  createBooking: (booking: Omit<HaatzaNestServiceBooking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>) => Promise<HaatzaNestServiceBooking>;
  preselectedPackage: HaatzaNestServicePackage | null;
}

const HaatzaNestBookingContext = createContext<HaatzaNestBookingContextType | undefined>(undefined);

export const HaatzaNestBookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<HaatzaNestServiceBooking[]>([]);
  const [activeModalService, setActiveModalService] = useState<HaatzaNestHomeService | null>(null);
  const [preselectedPackage, setPreselectedPackage] = useState<HaatzaNestServicePackage | null>(null);

  useEffect(() => {
    haatzaNestService.getBookings().then(setBookings);
  }, []);

  const openBookingModal = (service: HaatzaNestHomeService, pkg?: HaatzaNestServicePackage) => {
    setActiveModalService(service);
    setPreselectedPackage(pkg || (service.packages && service.packages[0]) || null);
  };

  const closeBookingModal = () => {
    setActiveModalService(null);
    setPreselectedPackage(null);
  };

  const createBooking = async (
    bookingData: Omit<HaatzaNestServiceBooking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>
  ) => {
    const newBooking = await haatzaNestService.createBooking(bookingData);
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  return (
    <HaatzaNestBookingContext.Provider
      value={{
        bookings,
        activeModalService,
        openBookingModal,
        closeBookingModal,
        createBooking,
        preselectedPackage,
      }}
    >
      {children}
    </HaatzaNestBookingContext.Provider>
  );
};

export function useHaatzaNestBooking(): HaatzaNestBookingContextType {
  const context = useContext(HaatzaNestBookingContext);
  if (!context) {
    throw new Error('useHaatzaNestBooking must be used within a HaatzaNestBookingProvider');
  }
  return context;
}
