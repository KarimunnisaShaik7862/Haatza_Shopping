import { HomeService, ServiceBooking } from '../types';
import { mockNestServices, mockInitialBookings } from './mock/data/nestServices';

const BOOKINGS_STORAGE_KEY = 'haatza_nest_bookings';

function getStoredBookings(): ServiceBooking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading NEST bookings', e);
  }
  return mockInitialBookings;
}

function saveBookings(list: ServiceBooking[]) {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed saving NEST bookings', e);
  }
}

export const nestService = {
  async getAllServices(): Promise<HomeService[]> {
    return [...mockNestServices];
  },

  async getPopularServices(limit: number = 6): Promise<HomeService[]> {
    return mockNestServices.filter((s) => s.popular).slice(0, limit);
  },

  async getServicesByCategory(categorySlug: string): Promise<HomeService[]> {
    if (!categorySlug || categorySlug === 'all') {
      return [...mockNestServices];
    }
    return mockNestServices.filter(
      (s) => s.categorySlug === categorySlug || s.category.toLowerCase().includes(categorySlug.toLowerCase())
    );
  },

  async getServiceBySlug(slug: string): Promise<HomeService | null> {
    const found = mockNestServices.find((s) => s.slug === slug || s.id === slug);
    return found ? { ...found } : null;
  },

  async searchServices(query: string): Promise<HomeService[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return mockNestServices.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
    );
  },

  async getBookings(): Promise<ServiceBooking[]> {
    return getStoredBookings();
  },

  async getBookingById(bookingId: string): Promise<ServiceBooking | null> {
    const bookings = getStoredBookings();
    const found = bookings.find((b) => b.id === bookingId || b.bookingNumber === bookingId);
    return found ? { ...found } : null;
  },

  async createBooking(bookingData: Omit<ServiceBooking, 'id' | 'bookingNumber' | 'createdAt' | 'status'>): Promise<ServiceBooking> {
    const num = Math.floor(1000 + Math.random() * 9000);
    const newBooking: ServiceBooking = {
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
};
