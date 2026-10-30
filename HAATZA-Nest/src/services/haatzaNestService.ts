import { 
  HaatzaNestHomeService, 
  HaatzaNestServiceBooking, 
  HaatzaNestServiceCategory,
  NestDashboardApiResponse,
  NestCustomerAddressApiResponse,
  CreateCustomerAddressPayload,
  CreateCustomerAddressApiResponse
} from '../types/haatzaNest.types';
import { 
  haatzaNestCategories, 
  haatzaNestInitialBookings, 
  haatzaNestServices 
} from '../data/nestData';
import {
  createHaatzaNestBooking,
  confirmOrder,
  confirmWithRetry,
  createRazorpayOrder,
} from './haatzaNestBookingApi';
import {
  createNestPassBooking,
  confirmNestPassBooking,
  confirmNestPassWithRetry,
} from './haatzaNestPassApi';



const BOOKINGS_KEY = 'haatza_nest_bookings';

function getStoredBookings(): HaatzaNestServiceBooking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading NEST bookings', e);
  }
  return haatzaNestInitialBookings;
}

function saveBookings(bookings: HaatzaNestServiceBooking[]) {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed saving NEST bookings', e);
  }
}

export const haatzaNestService = {
  async getAllServices(): Promise<HaatzaNestHomeService[]> {
    return [...haatzaNestServices];
  },

  async getPopularServices(limit: number = 6): Promise<HaatzaNestHomeService[]> {
    return haatzaNestServices.filter((s) => s.popular).slice(0, limit);
  },

  async getCategories(): Promise<HaatzaNestServiceCategory[]> {
    return [...haatzaNestCategories];
  },

  async getServicesByCategory(categorySlug: string): Promise<HaatzaNestHomeService[]> {
    if (!categorySlug || categorySlug === 'all') {
      return [...haatzaNestServices];
    }
    return haatzaNestServices.filter(
      (s) => s.categorySlug === categorySlug || s.category.toLowerCase().includes(categorySlug.toLowerCase())
    );
  },

  async getServiceBySlug(slug: string): Promise<HaatzaNestHomeService | null> {
    const found = haatzaNestServices.find((s) => s.slug === slug || s.id === slug);
    return found ? { ...found } : null;
  },

  async searchServices(query: string): Promise<HaatzaNestHomeService[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return haatzaNestServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
    );
  },

  async getBookings(): Promise<HaatzaNestServiceBooking[]> {
    return getStoredBookings();
  },

  async createBooking(
    bookingData: Omit<HaatzaNestServiceBooking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>
  ): Promise<HaatzaNestServiceBooking> {
    const num = Math.floor(1000 + Math.random() * 9000);
    const newBooking: HaatzaNestServiceBooking = {
      ...bookingData,
      id: `bok-${Date.now()}`,
      bookingNumber: `NST-2026-${num}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      professionalName: 'Assigned NEST Partner (Background Verified)',
      professionalRating: 4.9,
    };

    const existing = getStoredBookings();
    const updated = [newBooking, ...existing];
    saveBookings(updated);
    return newBooking;
  },

  async cancelBooking(bookingId: string): Promise<boolean> {
    const existing = getStoredBookings();
    const updated = existing.map((b) =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    saveBookings(updated);
    return true;
  },

  async getDashboardData(params: {
    customerId?: string;
    latitude?: string | number;
    longitude?: string | number;
    signal?: AbortSignal;
  }): Promise<NestDashboardApiResponse> {
    const query = new URLSearchParams();
    if (params.customerId) {
      query.set('customerId', params.customerId);
    }
    if (params.latitude !== undefined && params.latitude !== null && params.latitude !== '') {
      query.set('latitude', String(params.latitude));
    }
    if (params.longitude !== undefined && params.longitude !== null && params.longitude !== '') {
      query.set('longitude', String(params.longitude));
    }

    const url = `https://www.haatza.com/_functions/nestDashboard?${query.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: params.signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Nest dashboard data: HTTP ${response.status}`);
    }

    const json: NestDashboardApiResponse = await response.json();

    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
      console.log('[HAATZA Nest API] GET nestDashboard:', {
        url,
        coordinates: { lat: params.latitude, lng: params.longitude },
        status: response.status,
        availability: json?.message?.body?.availability,
      });
    }

    // If the customer already has an active pass (nestuserpass), the Wix backend strips nestpassData from the response.
    // In that case, retrieve the area's promotional pass banner so both backend API banners remain available.
    if (params.customerId && (!json.message?.body?.nestpassData || json.message.body.nestpassData.length === 0)) {
      try {
        const areaQuery = new URLSearchParams();
        if (params.latitude !== undefined && params.latitude !== null && params.latitude !== '') {
          areaQuery.set('latitude', String(params.latitude));
        }
        if (params.longitude !== undefined && params.longitude !== null && params.longitude !== '') {
          areaQuery.set('longitude', String(params.longitude));
        }
        const areaUrl = `https://www.haatza.com/_functions/nestDashboard?${areaQuery.toString()}`;
        const areaResponse = await fetch(areaUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: params.signal,
        });
        if (areaResponse.ok) {
          const areaJson: NestDashboardApiResponse = await areaResponse.json();
          if (areaJson?.message?.body?.nestpassData?.length) {
            json.message.body.nestpassData = areaJson.message.body.nestpassData;
            json.message.body.nestpass = true;
          }
        }
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.warn('Failed to fetch area nestpassData fallback:', err);
        }
      }
    }

    return json;
  },

  async getCustomerAddresses(customerId: string): Promise<NestCustomerAddressApiResponse> {
    const cleanId = (customerId || '').trim();
    if (!cleanId) {
      throw new Error('customerId is required to fetch customer addresses');
    }

    const url = `https://www.haatza.com/_functions/customerAddress?customerId=${encodeURIComponent(cleanId)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch customer addresses: HTTP ${response.status}`);
    }

    const json: NestCustomerAddressApiResponse = await response.json();
    return json;
  },

  /**
   * Create Customer Address POST API:
   * Method: POST
   * Endpoint: https://www.haatza.com/_functions/createcustomerAddress
   * Content-Type: application/json
   */
  async createCustomerAddress(payload: CreateCustomerAddressPayload): Promise<CreateCustomerAddressApiResponse> {
    const cleanEmail = (payload.customerId || '').trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('An authenticated customer email is required to save an address.');
    }
    if (!payload.addressLine1?.trim()) {
      throw new Error('Address Line 1 is required.');
    }
    if (!payload.city?.trim()) {
      throw new Error('City is required.');
    }
    if (!payload.pincode) {
      throw new Error('Pincode is required.');
    }

    const url = 'https://www.haatza.com/_functions/createcustomerAddress';

    // Construct the exact JSON request body format required by the backend
    const body: Record<string, any> = {
      customerId: cleanEmail,
      fullName: (payload.fullName || '').trim(),
      phoneNumber: (payload.phoneNumber || '').trim(),
      addressLine1: payload.addressLine1.trim(),
      addressLine2: (payload.addressLine2 || '').trim(),
      city: payload.city.trim(),
      state: (payload.state || 'Karnataka').trim(),
      landmark: (payload.landmark || '').trim(),
      pincode: String(payload.pincode).trim(),
      country: (payload.country || 'India').trim(),
      addressType: payload.addressType || 'Home',
    };

    if (payload.latitude !== undefined && payload.latitude !== null && payload.latitude !== '') {
      const numLat = typeof payload.latitude === 'number' ? payload.latitude : parseFloat(String(payload.latitude));
      body.latitude = !isNaN(numLat) ? numLat : payload.latitude;
    }

    if (payload.longitude !== undefined && payload.longitude !== null && payload.longitude !== '') {
      const numLng = typeof payload.longitude === 'number' ? payload.longitude : parseFloat(String(payload.longitude));
      body.longitude = !isNaN(numLng) ? numLng : payload.longitude;
    }

    if (payload.nestAreaName && payload.nestAreaName.trim()) {
      body.nestAreaName = payload.nestAreaName.trim();
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (err: any) {
      if (err?.message === 'Failed to fetch' || err?.name === 'TypeError') {
        throw new Error(
          'Failed to fetch: Request blocked by browser CORS policy. Backend server missing OPTIONS preflight response (options_createcustomerAddress in Wix http-functions.js).'
        );
      }
      throw err;
    }

    if (!response.ok) {
      let errMsg = `Failed to create address: HTTP ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson?.message?.error) {
          errMsg = errJson.message.error;
        } else if (errJson?.message?.message) {
          errMsg = errJson.message.message;
        }
      } catch {}
      throw new Error(errMsg);
    }

    const json: CreateCustomerAddressApiResponse = await response.json();

    if (json.status !== 'success') {
      const errorMsg = json.message?.error || json.message?.message || 'Failed to save address';
      throw new Error(errorMsg);
    }

    return json;
  },

  /**
   * HAATZA Nest Backend Booking API
   */
  createHaatzaNestBooking,
  confirmOrder,
  confirmWithRetry,
  createRazorpayOrder,

  /**
   * HAATZA Nest Pass API
   */
  createNestPassBooking,
  confirmNestPassBooking,
  confirmNestPassWithRetry,
};



