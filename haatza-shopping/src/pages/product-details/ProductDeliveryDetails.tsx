import React from 'react';
import { MapPin, Truck, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { useLocationContext } from '../../context/LocationContext';

interface ProductDeliveryDetailsProps {
  product: Product;
}

export const ProductDeliveryDetails: React.FC<ProductDeliveryDetailsProps> = ({ product }) => {
  const { location, selectedAddress, openLocationModal } = useLocationContext();

  // Extract structured address lines from selectedAddress or fallback location
  let addressLine1 = '';
  let addressLine2 = '';

  if (selectedAddress) {
    const partsLine1: string[] = [];
    if (selectedAddress.houseNumber) partsLine1.push(selectedAddress.houseNumber);
    if (selectedAddress.buildingName) partsLine1.push(selectedAddress.buildingName);
    if (selectedAddress.addressLine1) partsLine1.push(selectedAddress.addressLine1);
    if (selectedAddress.street && !selectedAddress.addressLine1?.toLowerCase().includes(selectedAddress.street.toLowerCase())) {
      partsLine1.push(selectedAddress.street);
    }
    addressLine1 = partsLine1.length > 0 ? partsLine1.join(', ') : selectedAddress.addressLine1 || '';

    const partsLine2: string[] = [];
    if (selectedAddress.area) partsLine2.push(selectedAddress.area);
    if (selectedAddress.city) partsLine2.push(selectedAddress.city);
    if (selectedAddress.state) partsLine2.push(selectedAddress.state);
    if (selectedAddress.pincode) partsLine2.push(selectedAddress.pincode);
    addressLine2 = partsLine2.join(', ');
  } else if (location) {
    if (location.formattedAddress && location.formattedAddress.includes(',')) {
      const parts = location.formattedAddress.split(',');
      const mid = Math.ceil(parts.length / 2);
      addressLine1 = parts.slice(0, mid).join(',').trim();
      addressLine2 = parts.slice(mid).join(',').trim();
    } else {
      addressLine1 = location.area ? location.area : (location.city || 'Standard Hub Delivery');
      addressLine2 = `${location.city}${location.state ? ', ' + location.state : ''} - ${location.pincode}`;
    }
  }

  // Format delivery estimate from real project product data
  const getEstimatedDate = (days: number = 2) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    return target.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const isInstant = Boolean(product.instantDeliveryMinutes);
  const deliveryDays = product.deliveryDays || 2;
  const deliveryDateString = getEstimatedDate(deliveryDays);
  const deliveryEstimateText = isInstant
    ? `Arrives in ${product.instantDeliveryMinutes} mins`
    : `Arrives by ${deliveryDateString}`;

  return (
    <div className="space-y-3.5">
      {/* A. Card Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2962FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 shadow-2xs">
            <MapPin className="w-4 h-4 text-[#2962FF]" />
          </div>
          <h3 className="text-base font-bold text-[#111827] font-heading">
            Delivery Details
          </h3>
        </div>

        <button
          type="button"
          onClick={openLocationModal}
          className="text-xs font-bold text-[#2962FF] hover:text-[#1D4ED8] hover:underline transition-colors cursor-pointer font-heading flex items-center gap-1 py-1 px-2.5 rounded-lg hover:bg-[#EFF6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2962FF]"
          aria-label="Change delivery location"
        >
          <span>Change</span>
        </button>
      </div>

      {/* B. Address Information (Clickable Inset Panel) */}
      <div
        role="button"
        tabIndex={0}
        onClick={openLocationModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLocationModal();
          }
        }}
        className="w-full text-left p-3 sm:p-3.5 rounded-xl bg-[#EFF6FF] hover:bg-blue-100/50 border border-[#DBEAFE] transition-all cursor-pointer group flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-[#2962FF]/40 shadow-2xs"
        aria-label="Click to change delivery address"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#2962FF] font-heading">
            Delivering to
          </p>

          {addressLine1 ? (
            <div className="mt-0.5 space-y-0.5">
              <p className="text-xs sm:text-sm font-bold text-[#111827] font-heading truncate">
                {addressLine1}
              </p>
              <p className="text-xs text-[#4B5563] font-body truncate">
                {addressLine2}
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm font-bold text-[#111827] font-heading mt-0.5">
              Select delivery address
            </p>
          )}
        </div>

        <div className="w-7 h-7 rounded-lg bg-white/80 group-hover:bg-white text-[#2962FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5 shadow-2xs">
          <ChevronRight className="w-4 h-4 text-[#2962FF]" />
        </div>
      </div>

      {/* C. Delivery Estimate */}
      <div className="flex items-center justify-between flex-wrap gap-2.5 pt-0.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2962FF] flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-[#2962FF]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] font-medium text-[#4B5563] font-body block leading-tight">
              Estimated delivery
            </span>
            <p className="text-xs sm:text-sm font-bold text-[#111827] font-heading mt-0.5">
              {deliveryEstimateText}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2962FF] bg-[#EFF6FF] border border-[#DBEAFE] px-2.5 py-0.5 rounded-full font-heading shrink-0 shadow-2xs">
          {isInstant ? '15-Min Instant Delivery' : 'Standard Delivery • FREE'}
        </span>
      </div>
    </div>
  );
};

export default ProductDeliveryDetails;
