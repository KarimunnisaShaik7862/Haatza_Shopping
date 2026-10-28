import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeliveryLocation, Address } from '../types';
import { locationService } from '../services/locationService';

interface LocationContextType {
  location: DeliveryLocation;
  selectedAddress: Address | null;
  isModalOpen: boolean;
  modalInitialMode: 'select' | 'add';
  openLocationModal: (initialMode?: 'select' | 'add' | unknown) => void;
  closeLocationModal: () => void;
  setPincode: (pincode: string) => boolean;
  setSelectedAddress: (address: Address) => void;
}

const LOCATION_STORAGE_KEY = 'haatza_delivery_location';
const SELECTED_ADDRESS_STORAGE_KEY = 'haatza_selected_delivery_address';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAddress, setSelectedAddressState] = useState<Address | null>(() => {
    try {
      const stored = localStorage.getItem(SELECTED_ADDRESS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

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
  const [modalInitialMode, setModalInitialMode] = useState<'select' | 'add'>('select');

  useEffect(() => {
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  useEffect(() => {
    try {
      if (selectedAddress) {
        localStorage.setItem(SELECTED_ADDRESS_STORAGE_KEY, JSON.stringify(selectedAddress));
      } else {
        localStorage.removeItem(SELECTED_ADDRESS_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedAddress]);

  const setPincode = (pincode: string): boolean => {
    if (!/^\d{6}$/.test(pincode.trim())) {
      return false;
    }
    const resolved = locationService.lookupPincode(pincode);
    setLocation(resolved);
    setSelectedAddressState(null);
    setIsModalOpen(false);
    return true;
  };

  const setSelectedAddress = (address: Address) => {
    setSelectedAddressState(address);
    const resolved: DeliveryLocation = {
      pincode: address.pincode,
      city: address.city,
      state: address.state,
      area: address.area || address.landmark || address.addressLine2 || address.city,
      formattedAddress: `${address.fullName ? address.fullName + ' - ' : ''}${address.addressLine1}, ${address.city} - ${address.pincode}`,
    };
    setLocation(resolved);
    setIsModalOpen(false);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        selectedAddress,
        isModalOpen,
        modalInitialMode,
        openLocationModal: (initialMode?: 'select' | 'add' | unknown) => {
          const mode = initialMode === 'add' ? 'add' : 'select';
          setModalInitialMode(mode);
          setIsModalOpen(true);
        },
        closeLocationModal: () => setIsModalOpen(false),
        setPincode,
        setSelectedAddress,
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

export default LocationContext;
