export interface Address {
  id: string;
  fullName: string;
  phone: string;
  altPhone?: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  houseNumber?: string;
  buildingName?: string;
  street?: string;
  area?: string;
  landmark?: string;
  city: string;
  state: string;
  country?: string;
  addressType: 'home' | 'work' | 'other';
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  walletBalance?: number;
}

export interface SavedCard {
  id: string;
  cardHolder: string;
  last4: string;
  network: 'visa' | 'mastercard' | 'rupay' | 'amex';
  expiryMonth: string;
  expiryYear: string;
  isDefault?: boolean;
}

export interface DeliveryLocation {
  pincode: string;
  city: string;
  state: string;
  area: string;
  formattedAddress: string;
}

export interface UserActivity {
  viewedProductIds: string[];
  viewedServiceIds: string[];
  recentSearches: string[];
  visitedCategories: string[];
}
