import { DeliveryLocation } from '../types';

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
};
