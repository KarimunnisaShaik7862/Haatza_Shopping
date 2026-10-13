import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeliveryLocation } from '../types';
import { locationService } from '../services/locationService';

interface LocationContextType {
  location: DeliveryLocation;
  isModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  setPincode: (pincode: string) => boolean;
}

const LOCATION_STORAGE_KEY = 'haatza_delivery_location';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<DeliveryLocation>(() => {
    try {
      const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return locationService.lookupPincode('530102');
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  const setPincode = (pincode: string): boolean => {
    if (!/^\d{6}$/.test(pincode.trim())) {
      return false;
    }
    const resolved = locationService.lookupPincode(pincode);
    setLocation(resolved);
    setIsModalOpen(false);
    return true;
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isModalOpen,
        openLocationModal: () => setIsModalOpen(true),
        closeLocationModal: () => setIsModalOpen(false),
        setPincode,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
