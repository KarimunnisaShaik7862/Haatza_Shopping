import { useState, useEffect, useCallback, useRef } from 'react';
import { NestCustomerAddress } from '../types/haatzaNest.types';
import { haatzaNestService } from '../services/haatzaNestService';
import { parseCustomerAddressApiResponse, resolveCustomerId } from '../services/haatzaNestAddressParser';

export interface NestAuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface NestAddress {
  id: string;
  tableId?: string;
  customerId?: string;
  fullName: string;
  phone: string;
  altPhone?: string;
  pincode: string | number;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  country?: string;
  addressType: 'home' | 'work' | 'other' | string;
  latitude?: string | number;
  longitude?: string | number;
  nestAreaName?: string;
  isDefault: boolean;
}

const USER_STORAGE_KEY = 'haatza_demo_user';

export const useHaatzaNestUser = () => {
  // Read authenticated user strictly from shared storage without forcing hardcoded fallbacks
  const [user, setUser] = useState<NestAuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && parsed.email) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse authenticated user storage', e);
    }
    return null;
  });

  const [customerAddresses, setCustomerAddresses] = useState<NestCustomerAddress[]>([]);
  const [addresses, setAddresses] = useState<NestAddress[]>([]);
  const [isAddressesLoading, setIsAddressesLoading] = useState<boolean>(false);
  const [addressesError, setAddressesError] = useState<string | null>(null);
  const [isAddressesEmpty, setIsAddressesEmpty] = useState<boolean>(true);

  const activeReqRef = useRef<string>('');
  const isMountedRef = useRef<boolean>(true);
  const previousCustomerIdRef = useRef<string | null>(null);

  // Dynamically resolve customerId (authenticated customer's Email ID required by backend API)
  // Never uses name or phone number as customerId
  const customerId = resolveCustomerId(user);

  // Clear previous customer's address state immediately when account changes
  useEffect(() => {
    if (previousCustomerIdRef.current !== null && previousCustomerIdRef.current !== customerId) {
      setAddresses([]);
      setCustomerAddresses([]);
      setAddressesError(null);
      setIsAddressesEmpty(true);
    }
    previousCustomerIdRef.current = customerId;
  }, [customerId]);

  // GET API integration: fetches live customer addresses for the authenticated customer
  const fetchCustomerAddresses = useCallback(async () => {
    // If no customer can be identified or required customerId (email) is missing:
    // Safely reset state without fetching with hardcoded values
    if (!customerId) {
      setCustomerAddresses([]);
      setAddresses([]);
      setIsAddressesEmpty(true);
      setIsAddressesLoading(false);
      setAddressesError(null);
      return;
    }

    const reqKey = `${customerId}_${Date.now()}`;
    activeReqRef.current = reqKey;

    setIsAddressesLoading(true);
    setAddressesError(null);

    try {
      const response = await haatzaNestService.getCustomerAddresses(customerId);

      if (!isMountedRef.current || activeReqRef.current !== reqKey) {
        return;
      }

      const parsed = parseCustomerAddressApiResponse(response);

      if (parsed.error) {
        setAddressesError(parsed.error);
        setCustomerAddresses([]);
        setAddresses([]);
        setIsAddressesEmpty(true);
      } else {
        // Strict: Validate that every address matches this authenticated customer's email
        // Never match users by name alone or display another user's saved addresses
        const userSpecificAddresses = parsed.addresses.filter((addr) => {
          if (!addr.customerId) return true;
          return addr.customerId.toLowerCase() === customerId.toLowerCase();
        });

        setCustomerAddresses(userSpecificAddresses);
        setIsAddressesEmpty(userSpecificAddresses.length === 0);
        setAddressesError(null);

        // Map live API response to NestAddress UI models (supporting multiple addresses)
        const mappedList: NestAddress[] = userSpecificAddresses.map((addr, idx) => ({
          id: addr.tableId || `addr-${idx}`,
          tableId: addr.tableId,
          customerId: addr.customerId,
          fullName: addr.fullName,
          phone: addr.phoneNumber,
          pincode: addr.pincode,
          addressLine1: addr.addressLine1,
          addressLine2: addr.addressLine2,
          landmark: addr.landmark,
          city: addr.city,
          state: addr.state,
          country: addr.country,
          addressType: (addr.addressType?.toLowerCase() === 'work' ? 'work' : addr.addressType?.toLowerCase() === 'home' ? 'home' : 'other'),
          latitude: addr.latitude,
          longitude: addr.longitude,
          nestAreaName: addr.nestAreaName,
          isDefault: idx === 0,
        }));

        setAddresses(mappedList);
      }
    } catch (err: any) {
      if (isMountedRef.current && activeReqRef.current === reqKey) {
        console.error('Customer Address API error:', err);
        setAddressesError(err?.message || 'Failed to fetch customer addresses');
        setCustomerAddresses([]);
        setAddresses([]);
        setIsAddressesEmpty(true);
      }
    } finally {
      if (isMountedRef.current && activeReqRef.current === reqKey) {
        setIsAddressesLoading(false);
      }
    }
  }, [customerId]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchCustomerAddresses();

    return () => {
      isMountedRef.current = false;
    };
  }, [fetchCustomerAddresses]);

  // Synchronize authentication changes across window/storage events
  useEffect(() => {
    const handleSync = () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        const nextUser = storedUser ? JSON.parse(storedUser) : null;
        setUser(nextUser);
      } catch (e) {
        console.error('Error syncing user state:', e);
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('haatza_auth_change', handleSync);
    window.addEventListener('haatza_address_change', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('haatza_auth_change', handleSync);
      window.removeEventListener('haatza_address_change', handleSync);
    };
  }, []);

  // Login handler: Authenticates with Full Name, Email ID, Mobile Number
  const login = (email: string, name?: string, phone?: string) => {
    const cleanEmail = (email || '').trim();
    if (!cleanEmail || !cleanEmail.includes('@')) return false;

    // Clear previous customer's address state immediately
    setAddresses([]);
    setCustomerAddresses([]);
    setIsAddressesEmpty(true);

    const loggedUser: NestAuthUser = {
      id: cleanEmail,
      name: name?.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: phone?.trim() || '',
    };
    setUser(loggedUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedUser));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('haatza_auth_change'));
    window.dispatchEvent(new CustomEvent('haatza_login'));
    return true;
  };

  // Register handler: Registers new customer with Full Name, Email ID, Mobile Number
  const register = (name: string, email: string, phone: string) => {
    const cleanEmail = (email || '').trim();
    if (!cleanEmail || !cleanEmail.includes('@')) return false;

    // Clear previous customer's address state immediately
    setAddresses([]);
    setCustomerAddresses([]);
    setIsAddressesEmpty(true);

    const newUser: NestAuthUser = {
      id: cleanEmail,
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
    };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('haatza_auth_change'));
    window.dispatchEvent(new CustomEvent('haatza_login'));
    return true;
  };

  const updateProfile = (updated: Partial<NestAuthUser>) => {
    if (!user) return;
    const nextUser: NestAuthUser = { ...user, ...updated };
    setUser(nextUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('haatza_auth_change'));
  };

  // Logout handler: Clears authenticated customer session, location state, and all address state
  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    setAddresses([]);
    setCustomerAddresses([]);
    setIsAddressesEmpty(true);
    setAddressesError(null);
    try {
      sessionStorage.removeItem('haatza_nest_persisted_location');
      localStorage.removeItem('haatza_nest_persisted_location');
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
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('haatza_auth_change'));
    window.dispatchEvent(new CustomEvent('haatza_logout'));
  };

  const addAddress = async (newAddr: Omit<NestAddress, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const addressWithId: NestAddress = {
      ...newAddr,
      id,
      customerId: customerId || undefined,
      isDefault: addresses.length === 0 ? true : !!newAddr.isDefault,
    };
    let updatedAddrs: NestAddress[];
    if (addressWithId.isDefault) {
      updatedAddrs = [addressWithId, ...addresses.map(a => ({ ...a, isDefault: false }))];
    } else {
      updatedAddrs = [addressWithId, ...addresses];
    }
    setAddresses(updatedAddrs);

    // Automatically sync with backend Create Customer Address POST API
    if (customerId && customerId.includes('@')) {
      try {
        const res = await haatzaNestService.createCustomerAddress({
          customerId,
          fullName: newAddr.fullName,
          phoneNumber: newAddr.phone,
          addressLine1: newAddr.addressLine1,
          addressLine2: newAddr.addressLine2,
          landmark: newAddr.landmark,
          city: newAddr.city,
          state: newAddr.state,
          pincode: newAddr.pincode,
          country: newAddr.country || 'India',
          addressType: newAddr.addressType || 'Home',
          latitude: newAddr.latitude,
          longitude: newAddr.longitude,
          nestAreaName: newAddr.nestAreaName,
        });
        if (res.status === 'success') {
          fetchCustomerAddresses();
          window.dispatchEvent(new Event('haatza_address_change'));
        }
      } catch (e) {
        console.error('Failed to sync new address with backend POST API:', e);
      }
    }

    return addressWithId;
  };

  const updateAddress = (updated: NestAddress) => {
    let updatedAddrs = addresses.map(a => (a.id === updated.id ? updated : a));
    if (updated.isDefault) {
      updatedAddrs = updatedAddrs.map(a => ({ ...a, isDefault: a.id === updated.id }));
    }
    setAddresses(updatedAddrs);
  };

  const deleteAddress = (id: string) => {
    const updatedAddrs = addresses.filter(a => a.id !== id);
    if (updatedAddrs.length > 0 && !updatedAddrs.some(a => a.isDefault)) {
      updatedAddrs[0].isDefault = true;
    }
    setAddresses(updatedAddrs);
  };

  const setDefaultAddress = (id: string) => {
    const updatedAddrs = addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updatedAddrs);
  };

  return {
    user,
    isAuthenticated: !!user,
    customerId,
    login,
    register,
    logout,
    updateProfile,
    // Live GET API address state
    customerAddresses,
    isAddressesLoading,
    addressesError,
    isAddressesEmpty,
    refetchAddresses: fetchCustomerAddresses,
    // Address list for UI components
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
};
