import { DeliveryLocation } from '../types';

export interface ReverseGeocodeResult {
  houseNumber?: string;
  buildingName?: string;
  street?: string;
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  formattedAddress?: string;
}

const PINCODE_DATABASE: Record<string, Omit<DeliveryLocation, 'pincode' | 'formattedAddress'>> = {
  '530102': { city: 'Visakhapatnam', state: 'Andhra Pradesh', area: 'Central Hub' },
  '400001': { city: 'Mumbai', state: 'Maharashtra', area: 'Fort / Marine Lines' },
  '400051': { city: 'Mumbai', state: 'Maharashtra', area: 'Bandra Kurla Complex (BKC)' },
  '110001': { city: 'New Delhi', state: 'Delhi', area: 'Connaught Place' },
  '560001': { city: 'Bengaluru', state: 'Karnataka', area: 'MG Road / Brigade Road' },
  '560034': { city: 'Bengaluru', state: 'Karnataka', area: 'Koramangala 4th Block' },
  '500081': { city: 'Hyderabad', state: 'Telangana', area: 'Madhapur / Hitec City' },
  '600002': { city: 'Chennai', state: 'Tamil Nadu', area: 'Anna Salai' },
  '700001': { city: 'Kolkata', state: 'West Bengal', area: 'BBD Bagh / Dalhousie' },
  '411001': { city: 'Pune', state: 'Maharashtra', area: 'Shivajinagar' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', area: 'Lal Darwaja' },
};

export const locationService = {
  lookupPincode(pincode: string): DeliveryLocation {
    const trimmed = pincode.trim();
    const entry = PINCODE_DATABASE[trimmed];

    if (entry) {
      return {
        pincode: trimmed,
        city: entry.city,
        state: entry.state,
        area: entry.area,
        formattedAddress: `${entry.area}, ${entry.city} - ${trimmed}`,
      };
    }

    // Fallback for any 6-digit Indian PIN code
    if (/^\d{6}$/.test(trimmed)) {
      return {
        pincode: trimmed,
        city: 'City Area',
        state: 'India',
        area: 'Standard Delivery Area',
        formattedAddress: `Area (${trimmed}), Express Hub`,
      };
    }

    // Default to 530102 as per design specification
    return {
      pincode: '530102',
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      area: 'Central Hub',
      formattedAddress: 'Central Hub, Visakhapatnam - 530102',
    };
  },

  /**
   * Request device geolocation coordinates via browser Geolocation API
   */
  getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (typeof navigator === 'undefined' || !navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser. Please enter your address manually.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          let msg = 'Failed to detect your location.';
          if (error.code === error.PERMISSION_DENIED) {
            msg = 'Location permission was denied. Please allow location access or enter address manually.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            msg = 'Location information is currently unavailable. Please enter address manually.';
          } else if (error.code === error.TIMEOUT) {
            msg = 'Location request timed out. Please try again or enter address manually.';
          }
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 }
      );
    });
  },

  /**
   * Convert coordinates to readable address components using reverse geocoding
   */
  async reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodeResult> {
    // Primary: OpenStreetMap Nominatim reverse geocoding
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const addr = data.address || {};
        const houseNumber = addr.house_number || '';
        const buildingName = addr.building || addr.amenity || addr.office || '';
        const street = addr.road || addr.pedestrian || addr.street || addr.footway || '';
        const area =
          addr.suburb ||
          addr.neighbourhood ||
          addr.residential ||
          addr.city_district ||
          addr.subdistrict ||
          '';
        const city = addr.city || addr.town || addr.village || addr.county || '';
        const state = addr.state || '';
        const pincode = (addr.postcode || '').replace(/\D/g, '').slice(0, 6);
        const country = addr.country || 'India';

        return {
          houseNumber,
          buildingName,
          street,
          area,
          city,
          state,
          pincode,
          country,
          formattedAddress: data.display_name,
        };
      }
    } catch (e) {
      console.warn('Nominatim reverse geocode error, attempting fallback:', e);
    }

    // Fallback: BigDataCloud free client reverse geocoding
    try {
      const bdcRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      if (bdcRes.ok) {
        const bdcData = await bdcRes.json();
        return {
          houseNumber: '',
          buildingName: '',
          street: bdcData.locality || '',
          area: bdcData.localityInfo?.administrative?.[3]?.name || bdcData.locality || '',
          city: bdcData.city || bdcData.locality || '',
          state: bdcData.principalSubdivision || '',
          pincode: (bdcData.postcode || '').replace(/\D/g, '').slice(0, 6),
          country: bdcData.countryName || 'India',
          formattedAddress: `${bdcData.locality || ''}, ${bdcData.city || ''}, ${bdcData.principalSubdivision || ''}`,
        };
      }
    } catch (err) {
      console.warn('Fallback reverse geocoding failed:', err);
    }

    throw new Error('Unable to resolve address from your coordinates. Please enter your address details manually.');
  },
};

export default locationService;
