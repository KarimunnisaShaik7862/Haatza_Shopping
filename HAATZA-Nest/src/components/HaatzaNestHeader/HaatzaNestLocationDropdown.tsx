import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapPin, Crosshair, Plus, X, Loader2, AlertCircle, Check, 
  Home, Briefcase, Tag, ArrowLeft, Compass, CheckCircle2,
  Navigation
} from 'lucide-react';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestCustomerAddresses } from '../../hooks/useHaatzaNestCustomerAddresses';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';
import { haatzaNestService } from '../../services/haatzaNestService';
import { reverseGeocodeCoordinates, resolveCoordinatesToArea, BENGALURU_PINCODE_AREAS } from '../../services/haatzaNestGeocoding';
import { HaatzaNestLocation, CreateCustomerAddressPayload } from '../../types/haatzaNest.types';

export interface HaatzaNestLocationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface NearbyServiceLocationItem {
  id: string;
  tableId?: string;
  name: string;
  locality: string;
  formattedAddress: string;
  city: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  addressType: string;
  addressLine1?: string;
  addressLine2?: string;
  isServiceable?: boolean;
}

export const DEFAULT_NEARBY_SERVICE_HUBS: NearbyServiceLocationItem[] = [
  {
    id: 'hub-ecity-phase2',
    name: 'Electronic City Phase 2',
    locality: 'Electronic City Phase 2',
    formattedAddress: 'Electronic City Phase 2, Hosur Road, Bengaluru, 560100',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560100',
    latitude: '12.8452',
    longitude: '77.6602',
    addressType: 'Service Hub',
    isServiceable: true,
  },
  {
    id: 'hub-ecity-phase1',
    name: 'Electronic City Phase 1',
    locality: 'Electronic City Phase 1',
    formattedAddress: 'Electronic City Phase 1, Bengaluru, 560100',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560100',
    latitude: '12.8525',
    longitude: '77.6756',
    addressType: 'Service Hub',
    isServiceable: true,
  },
  {
    id: 'hub-ananth-nagar',
    name: 'Ananth Nagar',
    locality: 'Ananth Nagar',
    formattedAddress: 'Ananth Nagar, Phase 2, Electronic City, Bengaluru, 560099',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560099',
    latitude: '12.8250',
    longitude: '77.6850',
    addressType: 'Service Hub',
    isServiceable: true,
  },
  {
    id: 'hub-hsr-layout',
    name: 'HSR Layout',
    locality: 'HSR Layout',
    formattedAddress: 'HSR Layout Sectors 1-7, Bengaluru, 560102',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560102',
    latitude: '12.9121',
    longitude: '77.6446',
    addressType: 'Service Hub',
    isServiceable: true,
  },
  {
    id: 'hub-koramangala',
    name: 'Koramangala',
    locality: 'Koramangala',
    formattedAddress: 'Koramangala 4th & 5th Block, Bengaluru, 560034',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    latitude: '12.9352',
    longitude: '77.6245',
    addressType: 'Service Hub',
    isServiceable: true,
  },
  {
    id: 'hub-bellandur',
    name: 'Bellandur / Outer Ring Road',
    locality: 'Bellandur',
    formattedAddress: 'Bellandur, Outer Ring Road, Bengaluru, 560103',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560103',
    latitude: '12.9304',
    longitude: '77.6784',
    addressType: 'Service Hub',
    isServiceable: true,
  },
];

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const HaatzaNestLocationDropdown: React.FC<HaatzaNestLocationDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const { 
    location, 
    updateLocation, 
    selectAddressAsLocation, 
    getSessionToken,
  } = useHaatzaNestLocation();

  const { isAuthenticated, user, customerId } = useHaatzaNestUser();
  const { availability } = useHaatzaNestDashboard();

  const { 
    addresses: customerAddresses, 
    loading: isAddressesLoading, 
    error: addressesError, 
    isEmpty: isAddressesEmpty,
    refetch: refetchAddresses,
    createAddress,
  } = useHaatzaNestCustomerAddresses();

  // GPS State
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsSuccess, setGpsSuccess] = useState<string | null>(null);

  // Add Address Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top whenever switching between location list and add address form
  useEffect(() => {
    if (showAddForm && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [showAddForm]);

  const [addForm, setAddForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    addressType: 'Home' as 'Home' | 'Work' | 'Other',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '',
  });

  // Sync user info into addForm when user logs in
  useEffect(() => {
    if (user) {
      setAddForm((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  // Reset form states when closing
  useEffect(() => {
    if (!isOpen) {
      setShowAddForm(false);
      setGpsError(null);
      setGpsSuccess(null);
      setSaveError(null);
      setSaveSuccess(null);
      setIsDetectingGps(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen]);

  // Reset device coordinates and GPS status upon logout or login session switch
  useEffect(() => {
    setDeviceCoords(null);
    setGpsError(null);
    setGpsSuccess(null);
    setIsDetectingGps(false);
  }, [user]);

  // --- NEARBY SERVICE LOCATIONS: Seeded with Verified Hubs & Enriched via Customer Addresses ---
  const [verifiedNearbyLocations, setVerifiedNearbyLocations] = useState<NearbyServiceLocationItem[]>(DEFAULT_NEARBY_SERVICE_HUBS);
  const [isVerifyingNearby, setIsVerifyingNearby] = useState(false);
  const [deviceCoords, setDeviceCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const verifiedCacheRef = useRef<Map<string, boolean>>(new Map());

  // Extract unique areas, combine with default service hubs, and verify service availability
  useEffect(() => {
    let isCancelled = false;

    const areaGroups = new Map<string, typeof customerAddresses>();
    for (const addr of customerAddresses) {
      const area = (addr.nestAreaName || '').trim();
      if (!area) continue;
      const key = area.toLowerCase();
      if (!areaGroups.has(key)) {
        areaGroups.set(key, []);
      }
      areaGroups.get(key)!.push(addr);
    }

    const uniqueAreaMap = new Map<string, NearbyServiceLocationItem>();

    // 1. Seed with known HAATZA Nest Service Hubs in Bengaluru
    for (const hub of DEFAULT_NEARBY_SERVICE_HUBS) {
      uniqueAreaMap.set(hub.locality.toLowerCase(), hub);
    }

    // 2. Merge with any saved customer addresses
    for (const [key, addrList] of areaGroups.entries()) {
      const bestAddr = [...addrList].sort((a, b) => {
        const aHasCoords = Boolean(a.latitude && a.longitude && !isNaN(parseFloat(String(a.latitude))));
        const bHasCoords = Boolean(b.latitude && b.longitude && !isNaN(parseFloat(String(b.latitude))));
        if (aHasCoords && !bHasCoords) return -1;
        if (!aHasCoords && bHasCoords) return 1;

        const aPrecision = String(a.latitude || '').length;
        const bPrecision = String(b.latitude || '').length;
        if (aPrecision !== bPrecision) return bPrecision - aPrecision;

        const aAddrLen = (a.addressLine1 || '').length + (a.addressLine2 || '').length;
        const bAddrLen = (b.addressLine1 || '').length + (b.addressLine2 || '').length;
        return bAddrLen - aAddrLen;
      })[0];

      if (!bestAddr) continue;

      const area = (bestAddr.nestAreaName || '').trim();
      const latStr =
        bestAddr.latitude !== undefined && bestAddr.latitude !== null && bestAddr.latitude !== ''
          ? String(bestAddr.latitude).trim()
          : '';
      const lngStr =
        bestAddr.longitude !== undefined && bestAddr.longitude !== null && bestAddr.longitude !== ''
          ? String(bestAddr.longitude).trim()
          : '';

      const formatted = [
        bestAddr.addressLine1,
        bestAddr.addressLine2,
        bestAddr.city,
        bestAddr.state,
        bestAddr.pincode ? String(bestAddr.pincode) : '',
      ]
        .filter(Boolean)
        .join(', ');

      uniqueAreaMap.set(key, {
        id: bestAddr.tableId ? `loc-area-${bestAddr.tableId}` : `loc-area-${key}`,
        tableId: bestAddr.tableId,
        name: `${area} Service Area`,
        locality: area,
        formattedAddress: formatted || `${area}, ${bestAddr.city || 'Bengaluru'}`,
        city: bestAddr.city || 'Bengaluru',
        state: bestAddr.state || 'Karnataka',
        pincode: bestAddr.pincode ? String(bestAddr.pincode) : '',
        latitude: latStr,
        longitude: lngStr,
        addressType: bestAddr.addressType || 'Home',
        addressLine1: bestAddr.addressLine1,
        addressLine2: bestAddr.addressLine2,
        isServiceable: true,
      });
    }

    const candidateAreas = Array.from(uniqueAreaMap.values());

    if (candidateAreas.length === 0) {
      setVerifiedNearbyLocations(DEFAULT_NEARBY_SERVICE_HUBS);
      setIsVerifyingNearby(false);
      return;
    }

    const verifyAreasAvailability = async () => {
      setIsVerifyingNearby(true);
      const verifiedList: NearbyServiceLocationItem[] = [];

      for (const item of candidateAreas) {
        if (isCancelled) return;

        if (!item.latitude || !item.longitude) continue;

        const latNum = parseFloat(item.latitude);
        const lngNum = parseFloat(item.longitude);
        if (isNaN(latNum) || isNaN(lngNum)) continue;

        const cacheKey = `${latNum.toFixed(4)}_${lngNum.toFixed(4)}`;
        if (verifiedCacheRef.current.has(cacheKey)) {
          if (verifiedCacheRef.current.get(cacheKey)) {
            verifiedList.push({ ...item, isServiceable: true });
          }
          continue;
        }

        try {
          const res = await haatzaNestService.getDashboardData({
            latitude: item.latitude,
            longitude: item.longitude,
            customerId: customerId || undefined,
          });

          const isAvailable =
            res?.status === 'success' && (
              res?.message?.body?.availability?.status === true ||
              (res?.message?.body?.availability?.coverageRadius !== undefined && res.message.body.availability.coverageRadius > 0) ||
              (res?.message?.body?.availability?.durations && res.message.body.availability.durations.length > 0) ||
              res?.message?.body?.availability?.message === 'Nest Helpers Currently UnAvailable'
            );

          verifiedCacheRef.current.set(cacheKey, isAvailable);

          if (isAvailable) {
            verifiedList.push({ ...item, isServiceable: true });
          }
        } catch {
          // If offline or network error, keep known service hubs active
          const isDefaultHub = DEFAULT_NEARBY_SERVICE_HUBS.some((h) => h.locality.toLowerCase() === item.locality.toLowerCase());
          if (isDefaultHub) {
            verifiedList.push({ ...item, isServiceable: true });
          }
          verifiedCacheRef.current.set(cacheKey, isDefaultHub);
        }
      }

      if (!isCancelled) {
        setVerifiedNearbyLocations(verifiedList.length > 0 ? verifiedList : DEFAULT_NEARBY_SERVICE_HUBS);
        setIsVerifyingNearby(false);
      }
    };

    verifyAreasAvailability();

    return () => {
      isCancelled = true;
    };
  }, [customerAddresses, customerId]);

  const currentUserCoords = useMemo<{ lat: number; lng: number } | null>(() => {
    if (deviceCoords) {
      return { lat: deviceCoords.latitude, lng: deviceCoords.longitude };
    }
    if (location?.latitude !== undefined && location?.longitude !== undefined && location?.latitude !== '' && location?.longitude !== '') {
      const lat = parseFloat(String(location.latitude));
      const lng = parseFloat(String(location.longitude));
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    return null;
  }, [deviceCoords, location]);

  const sortedNearbyLocations = useMemo(() => {
    return verifiedNearbyLocations.map((item) => {
      let distanceKm: number | null = null;
      if (currentUserCoords) {
        const aLat = parseFloat(item.latitude);
        const aLng = parseFloat(item.longitude);
        if (!isNaN(aLat) && !isNaN(aLng)) {
          distanceKm = calculateDistanceKm(currentUserCoords.lat, currentUserCoords.lng, aLat, aLng);
        }
      }
      return { ...item, distanceKm };
    }).sort((a, b) => {
      if (a.distanceKm !== null && b.distanceKm !== null) {
        return a.distanceKm - b.distanceKm;
      }
      if (a.distanceKm !== null) return -1;
      if (b.distanceKm !== null) return 1;
      return 0;
    });
  }, [verifiedNearbyLocations, currentUserCoords]);

  // Real device GPS detection
  const handleUseCurrentLocation = async () => {
    // Prevent duplicate in-flight requests
    if (isDetectingGps) return;

    setGpsError(null);
    setGpsSuccess(null);

    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setGpsError('Geolocation is not supported by your browser or device.');
      return;
    }

    const currentSession = getSessionToken();
    setIsDetectingGps(true);

    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '[::1]');
    const isSecureContext = typeof window !== 'undefined' && (Boolean(window.isSecureContext) || isLocalhost);

    // Call browser's native geolocation prompt
    // maximumAge: 0 ensures the device does not use cached coordinates and acquires fresh position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Discard if session changed or user logged out while waiting for permission/GPS
        if (getSessionToken() !== currentSession) {
          return;
        }

        const { latitude, longitude } = position.coords;
        setDeviceCoords({ latitude, longitude });

        let resolvedLocality = '';
        let resolvedCity = 'Bengaluru';
        let resolvedState = 'Karnataka';
        let resolvedPincode = '';
        let resolvedFormatted = '';

        try {
          const geo = await reverseGeocodeCoordinates(latitude, longitude);
          if (geo) {
            resolvedLocality = geo.locality;
            resolvedCity = geo.city || resolvedCity;
            resolvedState = geo.state || resolvedState;
            resolvedPincode = geo.pincode || '';
            resolvedFormatted = geo.formattedAddress;
          }
        } catch {
          // Geocoding network failure - fallback to coordinates
        }

        if (!resolvedLocality || resolvedLocality.toLowerCase() === 'bengaluru') {
          const coordArea = resolveCoordinatesToArea(latitude, longitude);
          if (coordArea) {
            resolvedLocality = coordArea;
          } else {
            resolvedLocality = resolvedCity || 'Current Location';
          }
        }

        if (!resolvedFormatted) {
          resolvedFormatted = resolvedLocality 
            ? `${resolvedLocality}, ${resolvedCity}` 
            : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }

        if (getSessionToken() !== currentSession) {
          setIsDetectingGps(false);
          return;
        }

        const detectedLocation: HaatzaNestLocation = {
          locality: resolvedLocality,
          city: resolvedCity,
          state: resolvedState,
          pincode: resolvedPincode,
          formattedAddress: resolvedFormatted,
          latitude,
          longitude,
          addressType: 'Current Location',
          source: 'device-gps',
          nestAreaName: undefined,
          tableId: undefined,
          isSavedAddress: false,
          addressLine1: '',
          addressLine2: '',
          landmark: '',
        };

        updateLocation(detectedLocation, currentSession);
        setGpsSuccess(`Location detected: ${resolvedLocality}`);
        setIsDetectingGps(false);

        setTimeout(() => {
          onClose();
        }, 500);
      },
      (error) => {
        if (getSessionToken() !== currentSession) {
          return;
        }
        setIsDetectingGps(false);
        if (error.code === error.PERMISSION_DENIED) {
          if (!isSecureContext) {
            setGpsError(
              'Device GPS is blocked by your browser on insecure HTTP network addresses (http://172.16.0.135:5174/). Browsers require a secure HTTPS connection or localhost for live device location. Please open the website via http://localhost:5174/ or select a saved address below.'
            );
          } else {
            setGpsError(
              'Location access was not allowed. If you clicked "Don\'t allow" or blocked permissions, please enable location access in your browser or device settings and click Retry.'
            );
          }
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setGpsError('Location information is unavailable on your device. Please verify device location services are turned on, or select a saved address below.');
        } else if (error.code === error.TIMEOUT) {
          setGpsError('Location request timed out while acquiring GPS. Please click Retry.');
        } else {
          setGpsError('Unable to detect current location. Please click Retry or select a saved address below.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Add Address Form Submission
  const handleSaveAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(null);

    const cleanFullName = addForm.fullName.trim();
    if (!cleanFullName) {
      setSaveError('Contact Name is required.');
      return;
    }

    const cleanPhone = addForm.phone.trim();
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      setSaveError('Please enter a valid 10-digit phone number.');
      return;
    }

    const cleanAddress1 = addForm.addressLine1.trim();
    if (!cleanAddress1) {
      setSaveError('Flat / House / Floor / Society is required.');
      return;
    }

    const cleanCity = addForm.city.trim();
    if (!cleanCity) {
      setSaveError('City is required.');
      return;
    }

    const cleanPincode = addForm.pincode.trim();
    if (!cleanPincode || cleanPincode.replace(/\D/g, '').length !== 6) {
      setSaveError('Please enter a valid 6-digit PIN code.');
      return;
    }

    let latToSend: number | undefined = undefined;
    let lngToSend: number | undefined = undefined;

    if (location?.latitude !== undefined && location?.latitude !== null && location?.latitude !== '') {
      const parsedLat = parseFloat(String(location.latitude));
      if (!isNaN(parsedLat)) latToSend = parsedLat;
    }

    if (location?.longitude !== undefined && location?.longitude !== null && location?.longitude !== '') {
      const parsedLng = parseFloat(String(location.longitude));
      if (!isNaN(parsedLng)) lngToSend = parsedLng;
    }

    if (latToSend === undefined && cleanPincode) {
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${cleanPincode}&country=India&format=json`,
          { headers: { 'User-Agent': 'HaatzaNestApp/1.0' } }
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData && geoData.length > 0 && geoData[0].lat && geoData[0].lon) {
            latToSend = parseFloat(geoData[0].lat);
            lngToSend = parseFloat(geoData[0].lon);
          }
        }
      } catch {}
    }

    const areaNameToSend = location?.nestAreaName || availability?.areaName || undefined;

    const payload: Omit<CreateCustomerAddressPayload, 'customerId'> = {
      fullName: cleanFullName,
      phoneNumber: cleanPhone,
      addressLine1: cleanAddress1,
      addressLine2: addForm.addressLine2.trim() || undefined,
      landmark: addForm.landmark.trim() || undefined,
      city: cleanCity,
      state: addForm.state.trim() || 'Karnataka',
      pincode: cleanPincode,
      country: 'India',
      addressType: addForm.addressType,
      latitude: latToSend,
      longitude: lngToSend,
      nestAreaName: areaNameToSend,
    };

    // For guests, set as active location directly without blocking
    if (!isAuthenticated || !customerId || !customerId.includes('@')) {
      const formatted = [cleanAddress1, addForm.addressLine2.trim(), addForm.landmark.trim(), cleanCity, cleanPincode].filter(Boolean).join(', ');
      updateLocation({
        locality: addForm.addressLine2.trim() || cleanCity,
        city: cleanCity,
        state: addForm.state.trim() || 'Karnataka',
        pincode: cleanPincode,
        formattedAddress: formatted,
        addressType: addForm.addressType,
        isSavedAddress: false,
        addressLine1: cleanAddress1,
        addressLine2: addForm.addressLine2.trim(),
        landmark: addForm.landmark.trim(),
        latitude: latToSend,
        longitude: lngToSend,
      });
      setSaveSuccess('Service address selected successfully!');
      setTimeout(() => {
        setShowAddForm(false);
        setSaveSuccess(null);
        onClose();
      }, 700);
      return;
    }

    setIsSaving(true);

    try {
      const savedAddress = await createAddress(payload);
      setSaveSuccess('Address saved successfully!');

      setAddForm({
        fullName: user?.name || '',
        phone: user?.phone || '',
        addressType: 'Home',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '',
      });

      // Auto-select newly created address
      if (savedAddress) {
        selectAddressAsLocation(savedAddress);
      }

      setTimeout(() => {
        setShowAddForm(false);
        setSaveSuccess(null);
        onClose();
      }, 700);
    } catch (err: any) {
      console.error('Create Customer Address API Error:', err);
      setSaveError(err?.message || 'Failed to save address. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const hasCoordinates = location?.latitude !== undefined && location?.latitude !== null && location?.latitude !== '';
  const displayLat = hasCoordinates ? Number(location.latitude).toFixed(4) : null;
  const displayLng = hasCoordinates ? Number(location.longitude).toFixed(4) : null;
  const displayArea = location?.isSavedAddress && location?.nestAreaName
    ? location.nestAreaName
    : (availability?.areaName || (location?.locality && location.locality !== 'Current Location' && !location.locality.startsWith('GPS (') ? location.locality : null));
  const isCurrentLocationSelected = Boolean(
    location &&
    !location.isSavedAddress &&
    !location.tableId &&
    hasCoordinates &&
    (location.addressType === 'Current Location' || (!location.addressLine1 && !location.tableId))
  );

  if (!isOpen) return null;

  return (
    <div 
      data-nest-location-container="true"
      className="absolute left-0 top-[calc(100%+8px)] w-[360px] sm:w-[420px] max-w-[calc(100vw-2rem)] z-50 bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(36,18,62,0.18)] border border-[#E5D7F7] ring-1 ring-[#7024C7]/10 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-150 text-[#24152F]"
      role="dialog"
      aria-label="Service location dropdown"
    >
      {/* Top Gradient Decorative Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#7024C7] via-[#9138F5] to-[#FFD83D] shrink-0" />

      {/* Dropdown Header */}
      <div className="px-4 sm:px-5 py-3.5 border-b border-[#F0E6FC] flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {showAddForm ? (
            <button
              type="button"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowAddForm(false);
                setSaveError(null);
                setSaveSuccess(null);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTop = 0;
                }
              }}
              className="w-7 h-7 rounded-full bg-[#FAF5FF] hover:bg-[#F5ECFF] text-[#7024C7] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Back to locations"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#F5ECFF] text-[#7024C7] flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-black text-[#24152F] font-heading leading-tight truncate">
              {showAddForm ? 'Add New Address' : 'Choose Service Location'}
            </h3>
            <p className="text-[10.5px] text-[#7D6F8D] truncate">
              {showAddForm 
                ? 'Save verified address to your account' 
                : 'Select where HAATZA Nest specialists will arrive'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-[#FAF8FD] hover:bg-[#F5ECFF] text-[#7D6F8D] hover:text-[#7024C7] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          aria-label="Close dropdown"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dropdown Scrollable Body */}
      <div ref={scrollContainerRef} className="overflow-y-auto overscroll-contain max-h-[460px] p-3.5 sm:p-4 space-y-3">
        {!showAddForm ? (
          <>
            {/* ACTION 1: CURRENT LOCATION OPTION */}
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isDetectingGps}
                className={`w-full flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer group shadow-2xs active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${
                  isCurrentLocationSelected
                    ? 'border-[#7024C7] bg-[#F5ECFF]/70 shadow-xs ring-2 ring-[#7024C7]/15'
                    : 'border-[#E5D7F7] bg-gradient-to-r from-[#FAF5FF] to-white hover:border-[#7024C7] hover:bg-[#F5ECFF]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-all shadow-xs ${
                    isCurrentLocationSelected
                      ? 'bg-[#7024C7] text-white'
                      : 'bg-[#F5ECFF] text-[#7024C7] group-hover:bg-[#7024C7] group-hover:text-white'
                  }`}>
                    {isDetectingGps ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Crosshair className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs sm:text-[13px] font-bold transition-colors ${
                        isCurrentLocationSelected ? 'text-[#7024C7]' : 'text-[#24152F] group-hover:text-[#7024C7]'
                      }`}>
                        Current Location
                      </span>
                      {isCurrentLocationSelected && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full shrink-0 bg-[#7024C7] text-white">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-[10.5px] text-[#7D6F8D] truncate mt-0.5">
                      {isDetectingGps
                        ? 'Requesting device GPS permission...'
                        : isCurrentLocationSelected
                          ? `Live GPS: ${displayLat}, ${displayLng}${displayArea ? ` • ${displayArea}` : ''}`
                          : gpsSuccess || 'Detect location automatically via device GPS'}
                    </p>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all shrink-0 ${
                  isCurrentLocationSelected
                    ? 'bg-[#7024C7] text-white shadow-xs'
                    : 'border border-[#D8C7F0] bg-white group-hover:border-[#7024C7]'
                }`}>
                  {isCurrentLocationSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>

              {gpsError && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-[11px]">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold">Location</span>
                      <button
                        type="button"
                        disabled={isDetectingGps}
                        onClick={handleUseCurrentLocation}
                        className="font-bold text-[#7024C7] underline hover:text-[#4B148C] cursor-pointer disabled:opacity-50"
                      >
                        {isDetectingGps ? 'Detecting...' : 'Retry'}
                      </button>
                    </div>
                    <span className="text-amber-800 mt-0.5 block">{gpsError}</span>
                  </div>
                </div>
              )}

              {gpsSuccess && (
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{gpsSuccess}</span>
                </div>
              )}
            </div>

            {/* ACTION 2: ADD NEW ADDRESS BUTTON */}
            <button
              type="button"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowAddForm(true);
                setGpsError(null);
                setGpsSuccess(null);
                setSaveError(null);
                setSaveSuccess(null);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTop = 0;
                }
              }}
              className="w-full flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border border-dashed border-[#CBB3E9] bg-white hover:bg-[#FAF5FF] hover:border-[#7024C7] text-left transition-all cursor-pointer group shadow-2xs active:scale-[0.99]"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F5ECFF] text-[#7024C7] flex items-center justify-center shrink-0 group-hover:bg-[#7024C7] group-hover:text-white transition-all shadow-xs">
                <Plus className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-[13px] font-bold text-[#7024C7] group-hover:text-[#4B148C] transition-colors block">
                  Add New Address
                </span>
                <p className="text-[10.5px] text-[#7D6F8D] truncate">
                  Enter flat, house, society, and landmark details
                </p>
              </div>
            </button>

            {/* SECTION 3: NEARBY SERVICE LOCATIONS */}
            <div className="pt-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#7024C7]" />
                  <span className="text-[11px] font-black text-[#24152F] uppercase tracking-wider font-heading">
                    Nearby Service Locations
                  </span>
                </div>
                <span className="text-[9.5px] font-bold text-[#7024C7] px-2 py-0.2 rounded-full bg-[#F5ECFF]">
                  Live Available
                </span>
              </div>

              {isAddressesLoading || isVerifyingNearby ? (
                <div className="py-3 px-3 rounded-xl bg-white/60 border border-[#E5D7F7] text-center space-y-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#7024C7] mx-auto" />
                  <p className="text-[10.5px] text-[#7D6F8D]">Checking verified areas...</p>
                </div>
              ) : addressesError ? (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between gap-2">
                  <span className="truncate text-[10.5px]">{addressesError}</span>
                  <button 
                    type="button" 
                    onClick={() => refetchAddresses()}
                    className="text-[10.5px] font-bold text-rose-700 underline shrink-0 hover:text-rose-900 cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              ) : sortedNearbyLocations.length === 0 ? (
                <div className="p-3 rounded-xl bg-[#FAF8FD] border border-[#E5D7F7] text-center space-y-0.5">
                  <p className="text-[11.5px] font-bold text-[#24152F]">No Verified Locations Found</p>
                  <p className="text-[10px] text-[#7D6F8D]">
                    {!isAuthenticated 
                      ? 'Sign in or use GPS to verify availability.'
                      : 'Use GPS or add a verified service address.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {sortedNearbyLocations.map((item) => {
                    const isSelected = Boolean(
                      location &&
                      (
                        (location.tableId && item.tableId && location.tableId === item.tableId) ||
                        (!location.tableId && (
                          (location.nestAreaName && location.nestAreaName.toLowerCase() === item.locality.toLowerCase()) ||
                          (location.locality && location.locality.toLowerCase() === item.locality.toLowerCase())
                        ))
                      )
                    );
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          updateLocation({
                            locality: item.locality,
                            formattedAddress: item.formattedAddress,
                            city: item.city,
                            state: item.state,
                            pincode: item.pincode,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            addressType: item.addressType,
                            nestAreaName: item.locality,
                            tableId: item.tableId,
                            addressLine1: item.addressLine1,
                            addressLine2: item.addressLine2,
                            isSavedAddress: Boolean(item.tableId),
                          });
                          onClose();
                        }}
                        className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 shadow-2xs group ${
                          isSelected
                            ? 'border-[#7024C7] bg-[#F5ECFF]/70 ring-2 ring-[#7024C7]/15'
                            : 'border-[#E5D7F7] bg-white hover:border-[#7024C7]/60 hover:bg-[#FAF5FF]'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-[#24152F] truncate">
                              {item.name}
                            </span>
                            {item.distanceKm !== undefined && item.distanceKm !== null && (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full shrink-0 border border-emerald-200/60">
                                {item.distanceKm < 1
                                  ? `${Math.round(item.distanceKm * 1000)}m away`
                                  : `${item.distanceKm.toFixed(1)} km away`}
                              </span>
                            )}
                            {item.addressType && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full shrink-0 bg-[#F5ECFF] text-[#7024C7]">
                                {item.addressType}
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-[#7D6F8D] truncate mt-0.5">
                            {item.formattedAddress}
                          </p>
                        </div>
                        
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all shrink-0 ${
                          isSelected
                            ? 'bg-[#7024C7] text-white shadow-xs'
                            : 'border border-[#D8C7F0] bg-white group-hover:border-[#7024C7]'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SECTION 4: SAVED ADDRESSES */}
            <div className="pt-1.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7024C7]" />
                  <span className="text-[11px] font-black text-[#24152F] uppercase tracking-wider font-heading">
                    Saved Addresses
                  </span>
                </div>
                {isAuthenticated && customerAddresses.length > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#F5ECFF] text-[#7024C7]">
                    {customerAddresses.length} Available
                  </span>
                )}
              </div>

              {isAddressesLoading ? (
                <div className="py-4 text-center space-y-1">
                  <Loader2 className="w-4 h-4 animate-spin text-[#7024C7] mx-auto" />
                  <p className="text-[10.5px] text-[#7D6F8D]">Loading addresses...</p>
                </div>
              ) : addressesError ? (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between gap-2">
                  <span className="truncate text-[10.5px]">{addressesError}</span>
                  <button 
                    type="button" 
                    onClick={() => refetchAddresses()}
                    className="text-[10.5px] font-bold text-rose-700 underline shrink-0 hover:text-rose-900 cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              ) : !isAuthenticated ? (
                <div className="py-4 px-3 text-center rounded-xl bg-[#FAF8FD] border border-dashed border-[#E5D7F7] space-y-1">
                  <MapPin className="w-5 h-5 text-[#7024C7] mx-auto" />
                  <h4 className="text-xs font-bold text-[#24152F]">Sign in to see saved addresses</h4>
                  <p className="text-[10px] text-[#7D6F8D]">
                    Use GPS or add a new address above to choose location.
                  </p>
                </div>
              ) : isAddressesEmpty || customerAddresses.length === 0 ? (
                <div className="py-4 px-3 text-center rounded-xl bg-[#FAF8FD] border border-dashed border-[#E5D7F7] space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-[#F5ECFF] text-[#7024C7] flex items-center justify-center mx-auto">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#24152F]">No Saved Addresses Found</h4>
                  <p className="text-[10px] text-[#7D6F8D]">
                    Add a new address above or use GPS to select your location.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {customerAddresses.map((addr, idx) => {
                    const isSelected = Boolean(
                      location &&
                      location.isSavedAddress &&
                      (
                        (location.tableId && addr.tableId && location.tableId === addr.tableId) ||
                        (location.addressType && addr.addressType && location.addressType.toLowerCase() === addr.addressType.toLowerCase() && location.addressLine1 === addr.addressLine1) ||
                        (!location.tableId && !addr.tableId && location.addressLine1 && location.addressLine1 === addr.addressLine1 && String(location.pincode || '') === String(addr.pincode || ''))
                      )
                    );

                    const typeLower = (addr.addressType || '').toLowerCase();
                    const typeIcon = 
                      typeLower === 'work' ? <Briefcase className="w-3 h-3" /> :
                      typeLower === 'home' ? <Home className="w-3 h-3" /> :
                      <Tag className="w-3 h-3" />;

                    return (
                      <div
                        key={addr.tableId || `addr-${idx}`}
                        onClick={() => {
                          selectAddressAsLocation(addr);
                          onClose();
                        }}
                        className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative group ${
                          isSelected
                            ? 'border-[#7024C7] bg-[#F5ECFF]/70 shadow-xs ring-2 ring-[#7024C7]/15'
                            : 'border-[#E5D7F7] bg-white hover:border-[#7024C7]/60 hover:bg-[#FAF5FF]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider shrink-0 ${
                              isSelected
                                ? 'bg-[#7024C7] text-white'
                                : 'bg-[#F5ECFF] text-[#7024C7]'
                            }`}>
                              {typeIcon}
                              <span>{addr.addressType || 'Address'}</span>
                            </span>

                            {addr.fullName && (
                              <span className="text-xs font-bold text-[#24152F] truncate">
                                {addr.fullName}
                              </span>
                            )}
                          </div>

                          <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all shrink-0 ${
                            isSelected
                              ? 'bg-[#7024C7] text-white shadow-xs'
                              : 'border border-[#D8C7F0] bg-white group-hover:border-[#7024C7]'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>

                        <p className="text-[11px] text-[#625D6E] mt-1.5 line-clamp-2 leading-relaxed">
                          {[
                            addr.addressLine1,
                            addr.addressLine2,
                            addr.landmark ? `Near ${addr.landmark}` : null,
                            addr.city,
                            addr.pincode ? String(addr.pincode) : null,
                          ].filter(Boolean).join(', ')}
                        </p>

                        {addr.phoneNumber && (
                          <p className="text-[10px] text-[#7D6F8D] mt-1 font-medium">
                            Phone: {addr.phoneNumber}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          /* INLINE ADD NEW ADDRESS FORM */
          <form onSubmit={handleSaveAddressSubmit} className="space-y-3 animate-in fade-in duration-200">
            <div className="p-2.5 rounded-xl bg-[#FAF5FF] border border-[#E5D7F7] text-[11px] space-y-0.5">
              <span className="font-bold text-[#7024C7] block">Save Address to Account</span>
              <p className="text-[#7D6F8D] text-[10.5px]">
                This address will be saved to your verified account.
              </p>
            </div>

            {hasCoordinates && (
              <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-[#7024C7] flex items-center gap-1.5">
                <Navigation className="w-3 h-3 shrink-0 text-[#7024C7]" />
                <span className="text-[10.5px] font-medium truncate">
                  Coordinates: <strong>{displayLat}, {displayLng}</strong>
                  {displayArea ? ` (${displayArea})` : ''}
                </span>
              </div>
            )}

            {saveError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 flex items-start gap-1.5 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span className="text-[11px]">{saveError}</span>
              </div>
            )}

            {saveSuccess && (
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[11px]">{saveSuccess}</span>
              </div>
            )}

            {/* Label Pills */}
            <div>
              <label className="block text-[11px] font-bold text-[#24152F] mb-1">
                Label <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Home', 'Work', 'Other'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    disabled={isSaving}
                    onClick={() => setAddForm({ ...addForm, addressType: type })}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 disabled:opacity-60 ${
                      addForm.addressType === type
                        ? 'bg-[#7024C7] border-[#7024C7] text-white shadow-2xs'
                        : 'bg-white border-[#E5D7F7] text-[#7D6F8D] hover:bg-[#F5ECFF]'
                    }`}
                  >
                    {type === 'Home' && <Home className="w-3 h-3" />}
                    {type === 'Work' && <Briefcase className="w-3 h-3" />}
                    {type === 'Other' && <Tag className="w-3 h-3" />}
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-[#24152F] mb-0.5">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSaving}
                  value={addForm.fullName}
                  onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5D7F7] focus:border-[#7024C7] text-xs text-[#24152F] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#24152F] mb-0.5">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  disabled={isSaving}
                  maxLength={10}
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="10-digit phone"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5D7F7] focus:border-[#7024C7] text-xs text-[#24152F] outline-none"
                />
              </div>
            </div>

            {/* Address Line 1 */}
            <div>
              <label className="block text-[11px] font-bold text-[#24152F] mb-0.5">
                Flat / House / Floor / Society <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isSaving}
                value={addForm.addressLine1}
                onChange={(e) => setAddForm({ ...addForm, addressLine1: e.target.value })}
                placeholder="Flat No, Wing, Building Name"
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5D7F7] focus:border-[#7024C7] text-xs text-[#24152F] outline-none"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-[11px] font-bold text-[#24152F] mb-0.5">
                Street / Area / Sector
              </label>
              <input
                type="text"
                disabled={isSaving}
                value={addForm.addressLine2}
                onChange={(e) => setAddForm({ ...addForm, addressLine2: e.target.value })}
                placeholder="Main Road, Sector, Layout"
                className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5D7F7] focus:border-[#7024C7] text-xs text-[#24152F] outline-none"
              />
            </div>

            {/* Landmark & Pincode */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-[#24152F] mb-0.5">
                  Landmark
                </label>
                <input
                  type="text"
                  disabled={isSaving}
                  value={addForm.landmark}
                  onChange={(e) => setAddForm({ ...addForm, landmark: e.target.value })}
                  placeholder="Nearby landmark"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5D7F7] focus:border-[#7024C7] text-xs text-[#24152F] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#24152F] mb-0.5">
                  PIN Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={isSaving}
                  maxLength={6}
                  value={addForm.pincode}
                  onChange={(e) => setAddForm({ ...addForm, pincode: e.target.value.replace(/\D/g, '') })}
                  placeholder="6-digit PIN"
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5D7F7] focus:border-[#7024C7] text-xs text-[#24152F] outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                disabled={isSaving}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAddForm(false);
                  setSaveError(null);
                  setSaveSuccess(null);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTop = 0;
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-[#E5D7F7] text-xs font-bold text-[#7D6F8D] hover:bg-zinc-50 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#7024C7] to-[#8C3BE2] hover:from-[#581A9E] hover:to-[#7024C7] text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-60 flex items-center gap-1.5 active:scale-95"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Save & Select</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default HaatzaNestLocationDropdown;
