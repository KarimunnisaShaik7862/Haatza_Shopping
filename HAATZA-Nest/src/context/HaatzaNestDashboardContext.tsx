import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { 
  NestDashboardData, 
  NestAvailability, 
  NestServiceItem, 
  NestNearestAddress, 
  NestCouponItem, 
  NestPassItem 
} from '../types/haatzaNest.types';
import { NestDurationOption, mapApiDurationsToNestDurationOptions } from '../components/HaatzaNestBooking/nestBookingData';
import { haatzaNestService } from '../services/haatzaNestService';
import { useHaatzaNestLocation } from '../context/HaatzaNestLocationContext';
import { useHaatzaNestUser } from '../hooks/useHaatzaNestUser';
import { resolveCustomerId } from '../services/haatzaNestAddressParser';

import { parseValidCoordinate } from '../services/haatzaNestAddressParser';

interface HaatzaNestDashboardContextType {
  dashboardData: NestDashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  availability: NestAvailability | null;
  durations: NestDurationOption[];
  services: NestServiceItem[];
  nearestAddress: NestNearestAddress | null;
  coupons: NestCouponItem[];
  nestpass: boolean;
  nestpassData: NestPassItem[];
  nestuserpass: boolean;
  nestuserpassData: any[];
  isAvailable: boolean;
  isCovered: boolean;
  isOutsideCoverage: boolean;
  vendorAvailable: boolean;
  availableVendorCount: number;
  estimatedTimeInMinutes: number;
  isScheduleAvailable: boolean;
  setSimulatedBusy?: (busy: boolean) => void;
  isSimulatedBusy?: boolean;
}

const HaatzaNestDashboardContext = createContext<HaatzaNestDashboardContextType | undefined>(undefined);

export const HaatzaNestDashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { location } = useHaatzaNestLocation();
  const { user } = useHaatzaNestUser();

  const [dashboardData, setDashboardData] = useState<NestDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef<boolean>(true);
  const requestIdRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const customerId = resolveCustomerId(user) || '';

  // Determine whether the current location originates from a saved customer address
  const isSavedAddress = Boolean(location?.isSavedAddress || location?.tableId);

  // Safely parse latitude and longitude to numbers (within valid GPS ranges)
  const numLat = parseValidCoordinate(location?.latitude, 'latitude');
  const numLng = parseValidCoordinate(location?.longitude, 'longitude');
  const hasValidCoords = numLat !== null && numLng !== null;

  const fetchDashboard = useCallback(async () => {
    // Cancel any previous in-flight request to prevent stale responses from overwriting the latest result
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const currentRequestId = ++requestIdRef.current;

    // SCENARIO A: A saved address has been selected, but coordinates are missing or invalid.
    // Requirement:
    // - The selected address must be the source of the coordinates used for availability checking.
    // - Do not use the browser's current location when a saved address has been selected.
    // - If the selected address has missing or invalid coordinates, handle it gracefully and do not send invalid coordinates.
    if (isSavedAddress && !hasValidCoords) {
      setLoading(false);
      setError(null);
      setDashboardData({
        status: true,
        availability: {
          status: false,
          message: 'The selected address does not have valid GPS coordinates. Please update the address or choose another location.',
          areaName: location?.nestAreaName || location?.locality || 'Selected Address',
          coverageRadius: 0,
          availableVendorCount: 0,
          vendorAvailable: false,
          estimatedTimeInMinutes: 0,
          durations: [],
        },
        services: { message: 'Address missing valid coordinates', totalServices: 0, data: [] },
        coupons: [],
        nestuserpass: false,
        nestuserpassData: [],
        nestpass: false,
        nestpassData: [],
      });
      return;
    }

    // SCENARIO B: No saved address is selected and no coordinates are available yet (e.g. initial clean session before selection).
    // Requirement: Do not hardcode latitude, longitude, area names, vendor counts, or availability results.
    if (!hasValidCoords) {
      setLoading(false);
      setError('Please select your service location to check availability.');
      setDashboardData(null);
      return;
    }

    // SCENARIO C: Valid coordinates are available (from selected saved address or GPS selection).
    // Pass numeric latitude and longitude to the availability GET API.
    // CRITICAL: Clear previous location's availability immediately so stale data is never reused
    setDashboardData(null);
    setLoading(true);
    setError(null);

    try {
      const response = await haatzaNestService.getDashboardData({
        customerId: customerId || undefined,
        latitude: numLat,
        longitude: numLng,
        signal: controller.signal,
      });

      // Avoid updating state if component unmounted or superseded by a newer address selection
      if (!isMountedRef.current || requestIdRef.current !== currentRequestId) {
        return;
      }

      if (response?.status === 'success' && response?.message?.body) {
        const body = response.message.body;
        // Use nestAreaName for saved addresses when available.
        // For live GPS coordinates, follow the backend's supported area-resolution flow (do not invent or reuse).
        if (isSavedAddress && location?.nestAreaName && location.nestAreaName.trim()) {
          if (body.availability && body.availability.message !== 'Service UnAvailable') {
            body.availability.areaName = location.nestAreaName.trim();
          }
        }
        setDashboardData(body);
        setError(null);
      } else if (response?.message?.body?.availability) {
        const body = response.message.body;
        if (isSavedAddress && location?.nestAreaName && location.nestAreaName.trim()) {
          if (body.availability && body.availability.message !== 'Service UnAvailable') {
            body.availability.areaName = location.nestAreaName.trim();
          }
        }
        setDashboardData(body);
        setError(null);
      } else {
        throw new Error('Invalid dashboard availability response format');
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // Ignored: superseding address request cancelled this one
        return;
      }
      if (isMountedRef.current && requestIdRef.current === currentRequestId) {
        console.error('Haatza Nest Availability API Error:', err);
        setError(err?.message || 'Failed to check service availability for this location.');
      }
    } finally {
      if (isMountedRef.current && requestIdRef.current === currentRequestId) {
        setLoading(false);
      }
    }
  }, [
    customerId,
    isSavedAddress,
    hasValidCoords,
    numLat,
    numLng,
    location?.nestAreaName,
    location?.locality,
    location?.tableId,
    location?.addressType,
    location?.formattedAddress,
  ]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchDashboard();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchDashboard]);

  // Derived memoized properties
  const availability = dashboardData?.availability || null;
  const rawDurations = dashboardData?.availability?.durations;
  const durations = mapApiDurationsToNestDurationOptions(rawDurations);
  const services = dashboardData?.services?.data || [];
  const nearestAddress = dashboardData?.nearestAddress || null;
  const coupons = dashboardData?.coupons || [];
  const nestpass = Boolean(dashboardData?.nestpass);
  const nestpassData = dashboardData?.nestpassData || [];
  const nestuserpass = Boolean(dashboardData?.nestuserpass);
  const nestuserpassData = dashboardData?.nestuserpassData || [];

  // 1. Determine if location is within HAATZA Nest coverage (supported area).
  // Live API returns:
  // - status: true (available with active helpers), OR
  // - coverageRadius > 0 (e.g. 800m), OR
  // - durations array with booking durations (e.g. 7 duration tiers), OR
  // - valid areaName (e.g. "AnanthNagar"), OR
  // - message: "Nest Helpers Currently UnAvailable" (covered location where instant pros are assisting nearby families)
  const isCovered = Boolean(
    !loading &&
    !error &&
    availability &&
    availability.message !== 'Service UnAvailable' &&
    (
      availability.status === true ||
      (availability.coverageRadius !== undefined && availability.coverageRadius > 0) ||
      (rawDurations && rawDurations.length > 0) ||
      availability.message === 'Nest Helpers Currently UnAvailable'
    )
  );

  // 2. Determine if location is outside HAATZA Nest service coverage (truly unsupported area).
  // Any location with availability data that is not covered is outside coverage.
  const isOutsideCoverage = Boolean(
    !loading &&
    !error &&
    availability &&
    !isCovered
  );

  // isAvailable represents overall serviceability (the location is supported)
  const isAvailable = isCovered;

  // Check if simulated busy state is active for testing (via location tag or localStorage)
  const isSimulatedBusy = Boolean(
    location?.locality?.includes('(Pros Busy)') || 
    location?.formattedAddress?.includes('(Pros Assisting Nearby Families)') ||
    (typeof window !== 'undefined' && window.localStorage?.getItem('haatza_nest_sim_busy') === 'true')
  );

  // 3. Instant Vendor (Employee) availability:
  // Must be in covered area, not simulated busy, availability.vendorAvailable === true,
  // availability.status === true, message NOT "Nest Helpers Currently UnAvailable", and at least 1 vendor
  const vendorAvailable = Boolean(
    isCovered && 
    !isSimulatedBusy &&
    availability?.vendorAvailable === true && 
    availability?.status === true &&
    availability?.message !== 'Nest Helpers Currently UnAvailable' &&
    (availability?.availableVendorCount === undefined || availability.availableVendorCount > 0)
  );

  const availableVendorCount = isSimulatedBusy ? 0 : (availability?.availableVendorCount ?? (vendorAvailable ? 1 : 0));
  const estimatedTimeInMinutes = availability?.estimatedTimeInMinutes ?? 6;
  const isScheduleAvailable = Boolean(isCovered && durations && durations.length > 0);

  const setSimulatedBusy = (busy: boolean) => {
    if (typeof window !== 'undefined') {
      if (busy) {
        window.localStorage.setItem('haatza_nest_sim_busy', 'true');
      } else {
        window.localStorage.removeItem('haatza_nest_sim_busy');
      }
    }
    fetchDashboard();
  };

  const value: HaatzaNestDashboardContextType = {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboard,
    availability,
    durations,
    services,
    nearestAddress,
    coupons,
    nestpass,
    nestpassData,
    nestuserpass,
    nestuserpassData,
    isAvailable,
    isCovered,
    isOutsideCoverage,
    vendorAvailable,
    availableVendorCount,
    estimatedTimeInMinutes,
    isScheduleAvailable,
    setSimulatedBusy,
    isSimulatedBusy,
  };

  return (
    <HaatzaNestDashboardContext.Provider value={value}>
      {children}
    </HaatzaNestDashboardContext.Provider>
  );
};

export function useHaatzaNestDashboard(): HaatzaNestDashboardContextType {
  const context = useContext(HaatzaNestDashboardContext);
  if (!context) {
    throw new Error('useHaatzaNestDashboard must be used within a HaatzaNestDashboardProvider');
  }
  return context;
}
