import React from 'react';
import { Truck, MapPin, Check, RotateCcw, ShieldAlert } from 'lucide-react';
import { DeliveryLocation } from '../../types';
import { Product } from '../../types';

interface ProductDeliveryAddressProps {
  product: Product;
  location: DeliveryLocation;
  openLocationModal: () => void;
}

export const ProductDeliveryAddress: React.FC<ProductDeliveryAddressProps> = ({
  product,
  location,
  openLocationModal,
}) => {
  // Format estimated delivery date based on product.deliveryDays
  const getEstimatedDate = (days: number = 2) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    return target.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const deliveryDateString = getEstimatedDate(product.deliveryDays || 2);

  return (
    <div className="py-2 space-y-3">
      {/* Header & Change PIN */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#2962FF]" />
          <span className="text-base sm:text-lg font-bold text-slate-900 font-heading">
            Deliver To:{' '}
            <span className="text-[#2962FF] font-black">
              {location.city} — {location.pincode}
            </span>
          </span>
        </div>

        <button
          type="button"
          onClick={openLocationModal}
          className="text-xs font-bold text-[#2962FF] hover:underline cursor-pointer font-heading"
        >
          Change PIN
        </button>
      </div>

      {/* Delivery Timelines and Guarantees */}
      <div className="text-xs text-slate-600 space-y-2 font-body">
        <div className="flex items-start gap-2">
          <Truck className="w-4 h-4 text-[#2962FF] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-800">
              FREE Delivery by <strong className="text-emerald-700 font-bold">{deliveryDateString}</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              Dispatched in 24 hours from nearest fulfillment hub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Cash on Delivery (COD) eligible for this pincode</span>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <RotateCcw className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>7-day doorstep replacement & free pickup</span>
        </div>
      </div>
    </div>
  );
};
