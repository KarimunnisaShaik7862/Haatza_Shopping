import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HaatzaLiteLocation } from '../types/haatzaLite.types';

interface HaatzaLiteLocationContextType {
  location: HaatzaLiteLocation;
  isModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  updateLocation: (loc: Partial<HaatzaLiteLocation>) => void;
}

const defaultLocation: HaatzaLiteLocation = {
  pincode: '400001',
  city: 'Mumbai',
  state: 'Maharashtra',
  locality: 'Fort / Marine Lines',
  formattedAddress: 'Fort, Mumbai - 400001',
};

const HaatzaLiteLocationContext = createContext<HaatzaLiteLocationContextType | undefined>(undefined);

export const HaatzaLiteLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<HaatzaLiteLocation>(() => {
    try {
      const saved = localStorage.getItem('haatza_lite_location');
      return saved ? JSON.parse(saved) : defaultLocation;
    } catch {
      return defaultLocation;
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLocationModal = () => setIsModalOpen(true);
  const closeLocationModal = () => setIsModalOpen(false);

  const updateLocation = (updated: Partial<HaatzaLiteLocation>) => {
    setLocation((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('haatza_lite_location', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  return (
    <HaatzaLiteLocationContext.Provider
      value={{
        location,
        isModalOpen,
        openLocationModal,
        closeLocationModal,
        updateLocation,
      }}
    >
      {children}
    </HaatzaLiteLocationContext.Provider>
  );
};

export function useHaatzaLiteLocation(): HaatzaLiteLocationContextType {
  const context = useContext(HaatzaLiteLocationContext);
  if (!context) {
    throw new Error('useHaatzaLiteLocation must be used within a HaatzaLiteLocationProvider');
  }
  return context;
}
