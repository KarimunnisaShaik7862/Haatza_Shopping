import React from 'react';

export interface HaatzaNestAddressSelectionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
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

/**
 * Service location selection is now rendered as a sleek, professional dropdown attached directly
 * to the Header Location Selector button, eliminating separate slide-out drawer popups.
 */
export const HaatzaNestAddressSelectionModal: React.FC<HaatzaNestAddressSelectionModalProps> = () => {
  return null;
};

export default HaatzaNestAddressSelectionModal;
