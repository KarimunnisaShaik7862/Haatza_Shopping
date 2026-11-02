import { useState, useEffect, useCallback, useRef } from 'react';
import { NestCustomerAddress, CreateCustomerAddressPayload } from '../types/haatzaNest.types';
import { haatzaNestService } from '../services/haatzaNestService';
import { parseCustomerAddressApiResponse, resolveCustomerId } from '../services/haatzaNestAddressParser';
import { useHaatzaNestUser } from './useHaatzaNestUser';

export interface UseHaatzaNestCustomerAddressesReturn {
  addresses: NestCustomerAddress[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  customerId: string;
  refetch: () => Promise<void>;
  createAddress: (data: Omit<CreateCustomerAddressPayload, 'customerId'>) => Promise<NestCustomerAddress>;
}

/**
 * Custom hook to fetch and manage customer addresses from the live GET API:
 * https://www.haatza.com/_functions/customerAddress?customerId={customerId}
 *
 * Strict Requirements:
 * 1. Uses existing authentication flow to identify customer.
 * 2. Uses the Email ID as customerId dynamically (never uses name or phone number).
 * 3. Immediately clears previous customer's address state when a different user signs in.
 * 4. Never matches users by name alone or displays another user's addresses.
 * 5. Safely handles missing/unauthenticated customers without falling back to hardcoded IDs.
 * 6. Distinct handling for loading, successful responses, empty addresses array, and errors.
 */
export function useHaatzaNestCustomerAddresses(explicitCustomerId?: string): UseHaatzaNestCustomerAddressesReturn {
  const { user } = useHaatzaNestUser();
  
  // Resolve customerId dynamically: explicit parameter (if valid email) takes priority, else resolve from authenticated user
  const customerId = (explicitCustomerId && explicitCustomerId.includes('@')
    ? explicitCustomerId.trim()
    : resolveCustomerId(user) || '').trim();

  const [addresses, setAddresses] = useState<NestCustomerAddress[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean(customerId));
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(!customerId);

  const activeRequestRef = useRef<string>('');
  const isMountedRef = useRef<boolean>(true);
  const previousCustomerIdRef = useRef<string | null>(null);

  // Clear previous customer's addresses immediately if the customer identity changes
  useEffect(() => {
    if (previousCustomerIdRef.current !== null && previousCustomerIdRef.current !== customerId) {
      setAddresses([]);
      setError(null);
      setIsEmpty(!customerId);
    }
    previousCustomerIdRef.current = customerId;
  }, [customerId]);

  const fetchAddresses = useCallback(async () => {
    // If no customerId can be identified, do not fetch and safely set empty state
    if (!customerId) {
      setAddresses([]);
      setLoading(false);
      setError(null);
      setIsEmpty(true);
      return;
    }

    const currentReqKey = `${customerId}_${Date.now()}`;
    activeRequestRef.current = currentReqKey;

    setLoading(true);
    setError(null);

    try {
      const response = await haatzaNestService.getCustomerAddresses(customerId);

      // Guard against unmounted component or superseded requests
      if (!isMountedRef.current || activeRequestRef.current !== currentReqKey) {
        return;
      }

      const parsed = parseCustomerAddressApiResponse(response);

      if (parsed.error) {
        setError(parsed.error);
        setAddresses([]);
        setIsEmpty(true);
      } else {
        // Strict: Filter and ensure addresses strictly match the authenticated customer's email ID
        const matchedAddresses = parsed.addresses.filter((addr) => {
          if (!addr.customerId) return true;
          return addr.customerId.toLowerCase() === customerId.toLowerCase();
        });

        setAddresses(matchedAddresses);
        setIsEmpty(matchedAddresses.length === 0);
        setError(null);
      }
    } catch (err: any) {
      if (isMountedRef.current && activeRequestRef.current === currentReqKey) {
        console.error('Failed to fetch customer addresses:', err);
        setError(err?.message || 'Failed to fetch customer addresses from API');
        setAddresses([]);
        setIsEmpty(true);
      }
    } finally {
      if (isMountedRef.current && activeRequestRef.current === currentReqKey) {
        setLoading(false);
      }
    }
  }, [customerId]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchAddresses();

    const handleAddressChange = () => {
      fetchAddresses();
    };
    window.addEventListener('haatza_address_change', handleAddressChange);

    return () => {
      isMountedRef.current = false;
      window.removeEventListener('haatza_address_change', handleAddressChange);
    };
  }, [fetchAddresses]);

  const createAddress = useCallback(
    async (data: Omit<CreateCustomerAddressPayload, 'customerId'>): Promise<NestCustomerAddress> => {
      if (!customerId || !customerId.includes('@')) {
        throw new Error('Please sign in to save an address to your account.');
      }

      const payload: CreateCustomerAddressPayload = {
        ...data,
        customerId,
      };

      const res = await haatzaNestService.createCustomerAddress(payload);

      if (res.status === 'success' && res.message?.data) {
        // Automatically re-fetch GET API so the newly saved address appears in the list immediately
        await fetchAddresses();
        window.dispatchEvent(new Event('haatza_address_change'));
        return res.message.data;
      }

      throw new Error(res.message?.message || res.message?.error || 'Failed to save customer address');
    },
    [customerId, fetchAddresses]
  );

  return {
    addresses,
    loading,
    error,
    isEmpty,
    customerId,
    refetch: fetchAddresses,
    createAddress,
  };
}
