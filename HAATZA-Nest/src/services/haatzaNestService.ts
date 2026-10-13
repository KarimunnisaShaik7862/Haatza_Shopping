import { 
  HaatzaNestHomeService, 
  HaatzaNestServiceBooking, 
  HaatzaNestServiceCategory 
} from '../types/haatzaNest.types';
import { 
  haatzaNestCategories, 
  haatzaNestInitialBookings, 
  haatzaNestServices 
} from '../data/nestData';

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
};
