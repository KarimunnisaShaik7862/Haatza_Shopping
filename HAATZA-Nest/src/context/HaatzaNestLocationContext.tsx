import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { HaatzaNestLocation, NestCustomerAddress } from '../types/haatzaNest.types';

import { parseValidCoordinate } from '../services/haatzaNestAddressParser';
import { reverseGeocodeCoordinates, resolveCoordinatesToArea, BENGALURU_PINCODE_AREAS } from '../services/haatzaNestGeocoding';

export interface HaatzaNestLocationContextType {
  location: HaatzaNestLocation;
  isLocationSelected: boolean;
  isModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
  updateLocation: (loc: Partial<HaatzaNestLocation>, sessionToken?: number) => void;
  clearLocation: () => void;
  selectAddressAsLocation: (address: NestCustomerAddress | any) => void;
  getSessionToken: () => number;
}

export const EMPTY_NEST_LOCATION: HaatzaNestLocation = {
  pincode: '',
  city: '',
  state: '',
  locality: '',
  formattedAddress: '',
  latitude: '',
  longitude: '',
};

const getStoredCustomerEmail = (): string | null => {
  try {
    const raw = localStorage.getItem('haatza_demo_user');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
        return parsed.email.trim().toLowerCase();
      }
    }
  } catch {}
  return null;
};

const LOCATION_PERSIST_KEY = 'haatza_nest_persisted_location';

interface PersistedLocationPayload {
  customerEmail: string | null;
  location: HaatzaNestLocation;
  timestamp: number;
}

const isStaleIpLocation = (loc: HaatzaNestLocation | null | undefined): boolean => {
  if (!loc) return false;
  // Always preserve valid saved customer addresses
  if (loc.isSavedAddress || loc.tableId || loc.customerId || loc.addressLine1) {
    return false;
  }
  // Always preserve confirmed actual device GPS locations
  if (loc.source === 'device-gps') {
    return false;
  }
  // Provenance check: Known ISP broadband IP geocoder coordinates for Bengaluru (approx 12.97194, 77.59369)
  const numLat = Number(loc.latitude);
  const numLng = Number(loc.longitude);
  const isIspGatewayCoords =
    !isNaN(numLat) &&
    !isNaN(numLng) &&
    Math.abs(numLat - 12.972) < 0.005 &&
    Math.abs(numLng - 77.594) < 0.005;

  const isStaleShanthalaNagar =
    (loc.locality === 'Shanthala Nagar' ||
      Boolean(loc.formattedAddress && loc.formattedAddress.includes('Shanthala Nagar'))) &&
    (!loc.source || loc.source === 'ip');

  return isIspGatewayCoords || isStaleShanthalaNagar;
};

const loadPersistedLocation = (): HaatzaNestLocation => {
  try {
    const currentEmail = getStoredCustomerEmail();
    const raw = sessionStorage.getItem(LOCATION_PERSIST_KEY) || localStorage.getItem(LOCATION_PERSIST_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // If persisted payload has a customerEmail, verify it matches the currently authenticated user
      if (parsed && typeof parsed === 'object') {
        const storedCustomerEmail = parsed.customerEmail;
        // If the location was stored under a customer, only restore if current user is that exact user
        if (storedCustomerEmail) {
          if (!currentEmail || storedCustomerEmail.toLowerCase() !== currentEmail.toLowerCase()) {
            removePersistedLocation();
            return EMPTY_NEST_LOCATION;
          }
        } else if (currentEmail) {
          // If stored payload had no email (e.g. from guest/anonymous session) but we now have an authenticated user,
          // do not inherit anonymous session location into user's account
          removePersistedLocation();
          return EMPTY_NEST_LOCATION;
        }

        const loc: HaatzaNestLocation = parsed.location || parsed;
        if (loc && (loc.locality || loc.formattedAddress || (loc.latitude && loc.longitude))) {
          if (isStaleIpLocation(loc)) {
            removePersistedLocation();
            return EMPTY_NEST_LOCATION;
          }
          if (loc.formattedAddress && loc.formattedAddress.startsWith('Current Location: ')) {
            loc.formattedAddress = loc.formattedAddress.replace(/^Current Location:\s*/i, '');
          }
          return loc;
        }
      }
    }
  } catch (err) {
    console.error('Failed to load persisted location:', err);
  }
  return EMPTY_NEST_LOCATION;
};

const savePersistedLocation = (loc: HaatzaNestLocation) => {
  try {
    const currentEmail = getStoredCustomerEmail();
    const payload: PersistedLocationPayload = {
      customerEmail: currentEmail,
      location: loc,
      timestamp: Date.now(),
    };
    const serialized = JSON.stringify(payload);
    sessionStorage.setItem(LOCATION_PERSIST_KEY, serialized);
    localStorage.setItem(LOCATION_PERSIST_KEY, serialized);
    sessionStorage.setItem('haatza_nest_session_location', JSON.stringify(loc));
    localStorage.setItem('haatza_nest_location', JSON.stringify(loc));
  } catch (err) {
    console.error('Failed to save persisted location:', err);
  }
};

const removePersistedLocation = () => {
  try {
    sessionStorage.removeItem(LOCATION_PERSIST_KEY);
    localStorage.removeItem(LOCATION_PERSIST_KEY);
    sessionStorage.removeItem('haatza_nest_session_location');
    localStorage.removeItem('haatza_nest_location');
    sessionStorage.removeItem('haatza_nest_location_unauth');
    localStorage.removeItem('haatza_nest_location_unauth');
    sessionStorage.removeItem('haatza_nest_location_guest');
    localStorage.removeItem('haatza_nest_location_guest');
    Object.keys(sessionStorage).forEach((k) => {
      if (k.startsWith('haatza_nest_location') || k.startsWith('haatza_nest_persisted_location')) {
        sessionStorage.removeItem(k);
      }
    });
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith('haatza_nest_location') || k.startsWith('haatza_nest_persisted_location')) {
        localStorage.removeItem(k);
      }
    });
  } catch {}
};

const HaatzaNestLocationContext = createContext<HaatzaNestLocationContextType | undefined>(undefined);

export const HaatzaNestLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Session version counter to discard any stale in-flight asynchronous location responses
  const sessionTokenRef = useRef<number>(1);
  const currentEmailRef = useRef<string | null>(getStoredCustomerEmail());

  // Restore the selected service location across page refreshes and normal navigation
  const [location, setLocation] = useState<HaatzaNestLocation>(() => {
    return loadPersistedLocation();
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLocationModal = useCallback(() => setIsModalOpen(true), []);
  const closeLocationModal = useCallback(() => setIsModalOpen(false), []);

  const getSessionToken = useCallback(() => sessionTokenRef.current, []);

  // Clear location: Resets state, increments sessionToken to invalidate any in-flight async geocoding/geolocation requests,
  // and removes persisted storage entries.
  const clearLocation = useCallback(() => {
    sessionTokenRef.current += 1;
    setLocation(EMPTY_NEST_LOCATION);
    setIsModalOpen(false);
    removePersistedLocation();
  }, []);

  // Update location: Only commits if the caller's sessionToken matches current sessionTokenRef (if provided),
  // preventing stale asynchronous location callbacks from restoring location, and persists to storage.
  const updateLocation = useCallback((updated: Partial<HaatzaNestLocation>, sessionToken?: number) => {
    if (sessionToken !== undefined && sessionToken !== sessionTokenRef.current) {
      // Discard stale asynchronous response from a past/cleared session
      return;
    }
    setLocation((prev) => {
      const next = { ...prev, ...updated };
      if (updated.isSavedAddress === false) {
        delete (next as any).tableId;
        delete (next as any).nestAreaName;
        delete (next as any).addressLine1;
        delete (next as any).addressLine2;
        delete (next as any).landmark;
        delete (next as any).customerId;
        next.isSavedAddress = false;
        next.addressType = 'Current Location';
      } else if (updated.isSavedAddress === true) {
        next.isSavedAddress = true;
        if (!updated.tableId) {
          delete (next as any).tableId;
        } else {
          next.tableId = updated.tableId;
        }
        next.nestAreaName = updated.nestAreaName || '';
        next.addressType = updated.addressType || 'Home';
        next.addressLine1 = updated.addressLine1 || '';
        next.addressLine2 = updated.addressLine2 || '';
        next.landmark = updated.landmark || '';
        next.latitude = updated.latitude !== undefined && updated.latitude !== null ? updated.latitude : '';
        next.longitude = updated.longitude !== undefined && updated.longitude !== null ? updated.longitude : '';
      }
      if (next.locality || next.formattedAddress || (next.latitude && next.longitude)) {
        savePersistedLocation(next);
      }
      return next;
    });
  }, []);

  const selectAddressAsLocation = useCallback((addr: NestCustomerAddress | any) => {
    if (!addr) return;
    const formatted = [
      addr.addressLine1,
      addr.addressLine2,
      addr.landmark,
      addr.city,
      addr.state,
      addr.pincode ? `- ${addr.pincode}` : '',
    ].filter(Boolean).join(', ');

    // Safely convert string or numeric coordinates to numbers before passing to state / availability API
    const numLat = parseValidCoordinate(addr.latitude, 'latitude');
    const numLng = parseValidCoordinate(addr.longitude, 'longitude');

    const newLoc: HaatzaNestLocation = {
      locality: addr.nestAreaName || addr.city || addr.addressLine1 || 'Selected Location',
      city: addr.city || '',
      state: addr.state || '',
      pincode: String(addr.pincode || ''),
      formattedAddress: formatted || addr.addressLine1 || '',
      latitude: numLat !== null ? numLat : (addr.latitude !== undefined && addr.latitude !== null ? addr.latitude : ''),
      longitude: numLng !== null ? numLng : (addr.longitude !== undefined && addr.longitude !== null ? addr.longitude : ''),
      nestAreaName: addr.nestAreaName ? String(addr.nestAreaName).trim() : '',
      addressLine1: addr.addressLine1 || '',
      addressLine2: addr.addressLine2 || '',
      landmark: addr.landmark || '',
      addressType: addr.addressType || 'Home',
      tableId: addr.tableId ? String(addr.tableId).trim() : undefined,
      customerId: addr.customerId || '',
      isSavedAddress: true,
      source: 'saved-address',
    };
    updateLocation(newLoc, sessionTokenRef.current);
  }, [updateLocation]);

  // Account switching, logout, and login boundary synchronization:
  // Reset selected location upon explicit logout, and NEVER let a newly logged-in user inherit previous location.
  useEffect(() => {
    const handleAuthOrStorageChange = () => {
      const nextEmail = getStoredCustomerEmail();
      const prevEmail = currentEmailRef.current;
      if (nextEmail !== prevEmail) {
        currentEmailRef.current = nextEmail;
        clearLocation();
      }
    };

    const handleExplicitLogout = () => {
      currentEmailRef.current = null;
      clearLocation();
    };

    const handleExplicitLogin = () => {
      const nextEmail = getStoredCustomerEmail();
      const prevEmail = currentEmailRef.current;
      currentEmailRef.current = nextEmail;
      if (nextEmail !== prevEmail) {
        clearLocation();
      }
    };

    window.addEventListener('storage', handleAuthOrStorageChange);
    window.addEventListener('haatza_auth_change', handleAuthOrStorageChange);
    window.addEventListener('haatza_logout', handleExplicitLogout);
    window.addEventListener('haatza_login', handleExplicitLogin);

    return () => {
      window.removeEventListener('storage', handleAuthOrStorageChange);
      window.removeEventListener('haatza_auth_change', handleAuthOrStorageChange);
      window.removeEventListener('haatza_logout', handleExplicitLogout);
      window.removeEventListener('haatza_login', handleExplicitLogin);
    };
  }, [clearLocation]);

  const isLocationSelected = Boolean(
    (location.locality && location.locality.trim()) ||
    (location.formattedAddress && location.formattedAddress.trim())
  );

  return (
    <HaatzaNestLocationContext.Provider
      value={{
        location,
        isLocationSelected,
        isModalOpen,
        openLocationModal,
        closeLocationModal,
        updateLocation,
        clearLocation,
        selectAddressAsLocation,
        getSessionToken,
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
