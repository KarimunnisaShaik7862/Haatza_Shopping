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
  latitude?: string | number;
  longitude?: string | number;
  nestAreaName?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  addressType?: string;
  tableId?: string;
  customerId?: string;
  isSavedAddress?: boolean;
  source?: 'device-gps' | 'saved-address' | 'manual' | string;
}

export interface NestDurationItem {
  duration: string;
  price: number;
  originalPrice: number;
  sequence: number;
  badge: string;
  displayTime: string;
  startTime: string;
  endTime: string;
}

export interface NestAvailability {
  status: boolean;
  message: string;
  areaName: string;
  coverageRadius: number;
  availableVendorCount: number;
  vendorAvailable: boolean;
  estimatedTimeInMinutes: number;
  durations: NestDurationItem[];
  vendors?: any[];
}

export interface NestCustomerAddress {
  tableId: string;
  customerId: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  landmark?: string;
  pincode: string | number;
  country: string;
  addressType: string;
  latitude: string | number;
  longitude: string | number;
  nestAreaName?: string;
}

export interface NestCustomerAddressApiResponse {
  status: string;
  message: {
    addresses?: NestCustomerAddress[];
    message?: string;
  };
}

export interface CreateCustomerAddressPayload {
  customerId: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  landmark?: string;
  pincode: string | number;
  country: string;
  addressType: string;
  latitude?: string | number;
  longitude?: string | number;
  nestAreaName?: string;
}

export interface CreateCustomerAddressApiResponse {
  status: string;
  message: {
    message?: string;
    data?: NestCustomerAddress;
    error?: string;
  };
}

export interface NestNearestAddress {
  tableId?: string;
  customerId?: string;
  fullName?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  landmark?: string;
  pincode?: number | string;
  country?: string;
  addressType?: string;
  latitude?: string;
  longitude?: string;
  nestAreaName?: string;
}

export interface NestServiceItem {
  name: string;
  price: number;
  image: string;
  serviceIncluded: string[];
  serviceExcluded: string[];
}

export interface NestServicesData {
  message?: string;
  totalServices?: number;
  data: NestServiceItem[];
}

export interface NestCouponItem {
  image: string;
}

export interface NestPassItem {
  packId: string;
  dashboardBanner: string;
  popupBanner: string;
  areaName: string;
  packType: string;
  visits: number;
  price: number;
  validityDays: number;
}

export interface NestDashboardData {
  status: boolean;
  availability: NestAvailability;
  nearestAddress?: NestNearestAddress;
  services: NestServicesData;
  coupons: NestCouponItem[];
  nestuserpass: boolean;
  nestuserpassData: any[];
  nestpass: boolean;
  nestpassData: NestPassItem[];
}

export interface NestDashboardApiResponse {
  status: string;
  message: {
    body: NestDashboardData;
  };
}

export interface HaatzaNestPromoOffer {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  validity: string;
  description: string;
  features: string[];
  couponCode?: string;
  ctaText: string;
  highlight?: boolean;
}

export interface HaatzaNestTestimonial {
  id: string;
  customerName: string;
  locality: string;
  city: string;
  serviceBooked: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CreateHaatzaNestBookingPayload {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  bookingType: 'instant' | 'scheduled' | string;
  basePrice: number;
  latitude: number;
  longitude: number;
  address: string;
  areaName: string;
  duration: number; // in minutes
  bookingDate: string; // Format DD-MMM-YYYY
  bookingTime: string; // Format h:mm AM/PM
  totalAmount?: number;
  walletUsage?: number;
  coupon?: string;
  passbooking: boolean;
  passId?: string;
  passbookingId?: string;
  razorpayOrderId?: string;
  paymentMethod?: 'Razorpay' | 'wallet' | 'Pass' | string;
  paymentStatus?: 'Pending' | 'Paid' | string;
  paymentId?: string;
}

export interface HaatzaNestBookingResult {
  tableId: string;
  bookingId: string;
  otp: string;
  bookingType: string;
  bookingDate: string;
  bookingTime: string;
  bookingStatus: 'PendingPayment' | 'Booked' | 'Assigned' | string;
  paymentStatus: 'Pending' | 'Paid' | string;
  assignmentStatus: 'Pending' | 'Assigned' | string;
  assignmentType: string;
  vendorId?: string;
  vendorName?: string;
  basePrice: number;
  walletUsage: number;
  finalPrice: number;
  workerAvailableAfter?: string | null;
  bufferMinutes?: number;
  reservationId?: string;
  requiresPayment?: boolean;
  amountToPay?: number;
}

export interface CreateHaatzaNestBookingResponse {
  status: 'success' | 'error' | string;
  message: {
    status: boolean;
    message?: string;
    booking?: HaatzaNestBookingResult;
    error?: string;
  };
}

export interface OrderConfirmationPayload {
  _id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface OrderConfirmationResponse {
  status: 'success' | 'error' | string;
  message: {
    status: boolean;
    message?: string;
    booking?: HaatzaNestBookingResult;
    error?: string;
  };
}

export interface CreateRazorpayOrderResponse {
  status: 'success' | 'Failed' | string;
  message: {
    order?: {
      id: string;
      amount: number;
      amount_due: number;
      amount_paid: number;
      currency: string;
      receipt: string;
      status: string;
    };
    keyId?: string;
    error?: string;
  };
}

export interface PendingConfirmationStoreItem {
  tableId: string;
  bookingId?: string;
  orderId: string;
  paymentId?: string;
  signature?: string;
  amount: number;
  customerPhone?: string;
  customerEmail?: string;
  createdAt: number;
}

export interface CreateNestPassPayload {
  userId: string;
  packId: string;
  baseprice: number;
  paidAmount: number;
  walletuseage: number;
}

export interface CreateNestPassResponse {
  success: boolean;
  tableId?: string;
  bookingId?: string;
  status?: 'paymentpending' | 'Active' | string;
  paymentType?: 'ONLINE' | 'PART' | string;
  razorpayAmount?: number;
  expiryDate?: string;
  packId?: string;
  totalvisit?: number;
  remainingVisits?: number;
  duration?: string;
  message?: string;
}

export interface ConfirmNestPassPayload {
  _id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface ConfirmNestPassResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
    bookingId: string;
    status: 'Active' | string;
    capturedAmount?: number;
    walletuseage?: number;
    remainingVisits?: number;
    expiryDate?: string;
  };
}

export interface PendingPassConfirmationStoreItem {
  tableId: string;
  bookingId: string;
  packId: string;
  orderId: string;
  amount: number;
  paymentId?: string;
  signature?: string;
  createdAt: number;
}


