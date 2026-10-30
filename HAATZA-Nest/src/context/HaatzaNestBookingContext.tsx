import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  HaatzaNestHomeService, 
  HaatzaNestServiceBooking, 
  HaatzaNestServicePackage 
} from '../types/haatzaNest.types';
import { haatzaNestService } from '../services/haatzaNestService';

import { confirmWithRetry } from '../services/haatzaNestBookingApi';
import { getPendingConfirmation, clearPendingConfirmation } from '../services/haatzaNestPaymentService';

interface HaatzaNestBookingContextType {
  bookings: HaatzaNestServiceBooking[];
  activeModalService: HaatzaNestHomeService | null;
  openBookingModal: (service: HaatzaNestHomeService, pkg?: HaatzaNestServicePackage) => void;
  closeBookingModal: () => void;
  createBooking: (booking: Omit<HaatzaNestServiceBooking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>) => Promise<HaatzaNestServiceBooking>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  refreshBookings: () => Promise<void>;
  preselectedPackage: HaatzaNestServicePackage | null;
}

const HaatzaNestBookingContext = createContext<HaatzaNestBookingContextType | undefined>(undefined);

export const HaatzaNestBookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<HaatzaNestServiceBooking[]>([]);
  const [activeModalService, setActiveModalService] = useState<HaatzaNestHomeService | null>(null);
  const [preselectedPackage, setPreselectedPackage] = useState<HaatzaNestServicePackage | null>(null);

  const refreshBookings = async () => {
    const list = await haatzaNestService.getBookings();
    setBookings(list);
  };

  useEffect(() => {
    refreshBookings();

    // Check for any pending confirmation from a previous session / app reload
    const pending = getPendingConfirmation();
    if (pending && pending.tableId && pending.paymentId && pending.signature && pending.orderId) {
      confirmWithRetry({
        tableId: pending.tableId,
        orderId: pending.orderId,
        paymentId: pending.paymentId,
        signature: pending.signature,
      })
        .then(() => {
          clearPendingConfirmation();
          refreshBookings();
        })
        .catch((err) => {
          console.warn('Startup pending confirmation check:', err);
        });
    }
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

  const cancelBooking = async (bookingId: string) => {
    const success = await haatzaNestService.cancelBooking(bookingId);
    if (success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
      );
    }
    return success;
  };

  return (
    <HaatzaNestBookingContext.Provider
      value={{
        bookings,
        activeModalService,
        openBookingModal,
        closeBookingModal,
        createBooking,
        cancelBooking,
        refreshBookings,
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
