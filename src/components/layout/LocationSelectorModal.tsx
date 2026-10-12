import React, { useState } from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { Modal } from '../common/Modal';
import { MapPin, Search, Check } from 'lucide-react';

const POPULAR_METROS = [
  { city: 'Mumbai', pincode: '400001' },
  { city: 'New Delhi', pincode: '110001' },
  { city: 'Bengaluru', pincode: '560001' },
  { city: 'Hyderabad', pincode: '500081' },
  { city: 'Kolkata', pincode: '700001' },
  { city: 'Pune', pincode: '411001' },
];

export const LocationSelectorModal: React.FC = () => {
  const { location, isModalOpen, closeLocationModal, setPincode } = useLocationContext();
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleApply = (pin: string) => {
    setErrorMsg('');
    const success = setPincode(pin);
    if (!success) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.');
    } else {
      setInputVal('');
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeLocationModal} title="Choose Delivery Location">
      <div className="space-y-5">
        <p className="text-sm text-[#5F6368]">
          Select delivery PIN code to see product availability and delivery time estimates for your area.
        </p>

        {/* Current Location Badge */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FFEBEE] border border-[#E53935]/20">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-[#E53935] shrink-0" />
            <div>
              <p className="text-xs text-[#5F6368]">Currently Delivering to</p>
              <p className="text-sm font-bold text-[#202124]">{location.formattedAddress}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-white text-[#E53935] rounded-md shadow-2xs">
            Active
          </span>
        </div>

        {/* Input form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApply(inputVal);
          }}
          className="space-y-2"
        >
          <label htmlFor="pincode-input" className="block text-xs font-semibold text-[#202124]">
            Enter 6-digit PIN code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="pincode-input"
                type="text"
                maxLength={6}
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value.replace(/\D/g, ''));
                  setErrorMsg('');
                }}
                placeholder="e.g. 400051 or 560001"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-hidden focus:border-[#E53935] focus:ring-1 focus:ring-[#E53935]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#E53935] hover:bg-[#D32F2F] text-white text-sm font-semibold rounded-xl transition-colors shadow-2xs"
            >
              Apply
            </button>
          </div>
          {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}
        </form>

        {/* Popular Cities */}
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5">
            Popular Cities
          </p>
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_METROS.map((metro) => {
              const isSelected = location.pincode === metro.pincode;
              return (
                <button
                  key={metro.pincode}
                  type="button"
                  onClick={() => handleApply(metro.pincode)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all ${
                    isSelected
                      ? 'border-[#E53935] bg-[#FFEBEE] text-[#E53935] font-bold'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-800'
                  }`}
                >
                  <div>
                    <p className="font-semibold">{metro.city}</p>
                    <p className="text-[11px] text-zinc-500">{metro.pincode}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#E53935]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
