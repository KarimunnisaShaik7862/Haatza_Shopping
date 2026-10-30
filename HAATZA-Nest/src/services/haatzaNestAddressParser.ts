import { NestCustomerAddress, NestCustomerAddressApiResponse } from '../types/haatzaNest.types';

/**
 * Maps and sanitizes an individual address object from the API response
 * Strict Requirement:
 * - Preserves original latitude and longitude (whether string or number)
 * - Safely handles all 14 specified fields
 */
export function parseCustomerAddress(raw: any): NestCustomerAddress {
  if (!raw || typeof raw !== 'object') {
    return {
      tableId: '',
      customerId: '',
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      landmark: '',
      pincode: '',
      country: 'India',
      addressType: 'Home',
      latitude: '',
      longitude: '',
      nestAreaName: '',
    };
  }

  return {
    tableId: raw.tableId ? String(raw.tableId).trim() : '',
    customerId: raw.customerId ? String(raw.customerId).trim() : '',
    fullName: raw.fullName ? String(raw.fullName).trim() : '',
    phoneNumber: raw.phoneNumber ? String(raw.phoneNumber).trim() : '',
    addressLine1: raw.addressLine1 ? String(raw.addressLine1).trim() : '',
    addressLine2: raw.addressLine2 !== undefined && raw.addressLine2 !== null ? String(raw.addressLine2).trim() : '',
    city: raw.city ? String(raw.city).trim() : '',
    state: raw.state ? String(raw.state).trim() : '',
    landmark: raw.landmark !== undefined && raw.landmark !== null ? String(raw.landmark).trim() : '',
    pincode: raw.pincode !== undefined && raw.pincode !== null ? raw.pincode : '',
    country: raw.country ? String(raw.country).trim() : 'India',
    addressType: raw.addressType ? String(raw.addressType).trim() : 'Home',
    // Preserve original format (string or number) as returned by API
    latitude: raw.latitude !== undefined && raw.latitude !== null ? raw.latitude : '',
    longitude: raw.longitude !== undefined && raw.longitude !== null ? raw.longitude : '',
    nestAreaName: raw.nestAreaName !== undefined && raw.nestAreaName !== null ? String(raw.nestAreaName).trim() : '',
  };
}

/**
 * Parses the customerAddress API response
 * Handles:
 * - Successful responses with addresses array (1 or many)
 * - Empty addresses array
 * - "Failed" status (e.g. "No addresses found for the given customerId")
 * - Unsuccessful / error responses
 */
export function parseCustomerAddressApiResponse(response: NestCustomerAddressApiResponse): {
  addresses: NestCustomerAddress[];
  isEmpty: boolean;
  error: string | null;
} {
  if (!response) {
    return { addresses: [], isEmpty: true, error: 'Empty response received from API' };
  }

  if (response.status === 'success' && Array.isArray(response.message?.addresses)) {
    const addresses = response.message.addresses.map(parseCustomerAddress);
    return {
      addresses,
      isEmpty: addresses.length === 0,
      error: null,
    };
  }

  // Handle case where status is Failed with message: "No addresses found for the given customerId"
  const msg = response.message?.message || '';
  if (msg.toLowerCase().includes('no addresses found')) {
    return {
      addresses: [],
      isEmpty: true,
      error: null,
    };
  }

  if (response.status !== 'success') {
    return {
      addresses: [],
      isEmpty: true,
      error: msg || `Customer address API returned status: ${response.status}`,
    };
  }

  return {
    addresses: [],
    isEmpty: true,
    error: null,
  };
}

/**
 * Converts latitude or longitude to a number safely, validating type and GPS boundaries:
 * Latitude: -90 to 90, Longitude: -180 to 180.
 * Returns valid number, or null if missing, malformed, or out of range.
 */
export function parseValidCoordinate(
  coord: string | number | undefined | null,
  type?: 'latitude' | 'longitude'
): number | null {
  if (coord === undefined || coord === null || coord === '') return null;
  const str = String(coord).trim();
  if (!str) return null;
  const num = typeof coord === 'number' ? coord : parseFloat(str);
  if (isNaN(num) || !isFinite(num)) return null;
  if (type === 'latitude' && (num < -90 || num > 90)) return null;
  if (type === 'longitude' && (num < -180 || num > 180)) return null;
  return num;
}

/**
 * Converts latitude or longitude to a number safely only when needed (e.g. for distance calculations),
 * while preserving the original string/number elsewhere.
 */
export function getNumericCoordinate(
  coord: string | number | undefined | null,
  type?: 'latitude' | 'longitude'
): number | null {
  return parseValidCoordinate(coord, type);
}

/**
 * Resolves the authenticated customer's identifier required by the backend Customer Address API.
 * The backend API (https://www.haatza.com/_functions/customerAddress?customerId=...) expects the customer's Email ID.
 * 
 * Rules:
 * - Checks user.email first.
 * - Inspects user.customerId and user.id only if they are valid email addresses.
 * - Explicitly rejects using the customer's full name or phone number as customerId.
 * - Returns null if no valid customer identifier is present.
 */
export function resolveCustomerId(user: { email?: string; customerId?: string; id?: string; name?: string; phone?: string } | null | undefined): string | null {
  if (!user || typeof user !== 'object') {
    return null;
  }

  // 1. Email field (primary customerId expected by API)
  if (typeof user.email === 'string' && user.email.trim().includes('@')) {
    return user.email.trim();
  }

  // 2. customerId field if it contains an email
  if (typeof user.customerId === 'string' && user.customerId.trim().includes('@')) {
    return user.customerId.trim();
  }

  // 3. id field if it contains an email
  if (typeof user.id === 'string' && user.id.trim().includes('@')) {
    return user.id.trim();
  }

  // Never use name or mobile number as customerId
  return null;
}
