export interface HaatzaNestServicePackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  recommended?: boolean;
}

export interface HaatzaNestHomeService {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  iconName: string;
  image: string;
  popular?: boolean;
  packages: HaatzaNestServicePackage[];
  included: string[];
  excluded: string[];
  faqList?: { question: string; answer: string }[];
}

export interface HaatzaNestServiceCategory {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  image: string;
  serviceCount: number;
  description: string;
}

export interface HaatzaNestServiceBooking {
  id: string;
  bookingNumber: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  categoryName: string;
  packageId?: string;
  packageName?: string;
  price: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTimeSlot: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  notes?: string;
  professionalName?: string;
  professionalRating?: number;
  createdAt: string;
}

export interface HaatzaNestLocation {
  pincode: string;
  city: string;
  state: string;
  locality: string;
  formattedAddress: string;
}
