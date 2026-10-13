import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HaatzaNestLocation } from '../types/haatzaNest.types';

interface HaatzaNestLocationContextType {
  location: HaatzaNestLocation;
  isModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  updateLocation: (loc: Partial<HaatzaNestLocation>) => void;
}

const defaultLocation: HaatzaNestLocation = {
  pincode: '400018',
  city: 'Mumbai',
  state: 'Maharashtra',
  locality: 'Worli / Lower Parel',
  formattedAddress: 'Worli, Mumbai - 400018',
};

const HaatzaNestLocationContext = createContext<HaatzaNestLocationContextType | undefined>(undefined);

export const HaatzaNestLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<HaatzaNestLocation>(() => {
    try {
      const saved = localStorage.getItem('haatza_nest_location');
      return saved ? JSON.parse(saved) : defaultLocation;
    } catch {
      return defaultLocation;
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLocationModal = () => setIsModalOpen(true);
  const closeLocationModal = () => setIsModalOpen(false);

  const updateLocation = (updated: Partial<HaatzaNestLocation>) => {
    setLocation((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('haatza_nest_location', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  return (
    <HaatzaNestLocationContext.Provider
      value={{
        location,
        isModalOpen,
        openLocationModal,
        closeLocationModal,
        updateLocation,
      }}
    >
      {children}
    </HaatzaNestLocationContext.Provider>
  );
};

export function useHaatzaNestLocation(): HaatzaNestLocationContextType {
  const context = useContext(HaatzaNestLocationContext);
  if (!context) {
    throw new Error('useHaatzaNestLocation must be used within a HaatzaNestLocationProvider');
  }
  return context;
}
