import React, { useState } from 'react';
import { Address } from '../../types';
import { locationService } from '../../services/locationService';

interface AddressFormProps {
  initialValues?: Address;
  onSubmit: (address: Omit<Address, 'id'>) => void;
  onCancel: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [fullName, setFullName] = useState(initialValues?.fullName || '');
  const [phone, setPhone] = useState(initialValues?.phone || '');
  const [altPhone, setAltPhone] = useState(initialValues?.altPhone || '');
  const [pincode, setPincode] = useState(initialValues?.pincode || '');
  const [addressLine1, setAddressLine1] = useState(initialValues?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(initialValues?.addressLine2 || '');
  const [landmark, setLandmark] = useState(initialValues?.landmark || '');
  const [city, setCity] = useState(initialValues?.city || 'Mumbai');
  const [state, setState] = useState(initialValues?.state || 'Maharashtra');
  const [addressType, setAddressType] = useState<Address['addressType']>(
    initialValues?.addressType || 'home'
  );
  const [isDefault, setIsDefault] = useState(initialValues?.isDefault ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePincodeChange = (pin: string) => {
    const clean = pin.replace(/\D/g, '');
    setPincode(clean);
    if (clean.length === 6) {
      const loc = locationService.lookupPincode(clean);
      setCity(loc.city);
      setState(loc.state);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!phone.trim() || phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = 'Valid 6-digit PIN code is required';
    if (!addressLine1.trim()) newErrors.addressLine1 = 'House/flat number & building name is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      fullName,
      phone,
      altPhone,
      pincode,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      addressType,
      isDefault,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
          />
          {errors.fullName && <p className="text-[11px] text-rose-600 mt-0.5">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            10-digit Mobile Number *
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
          />
          {errors.phone && <p className="text-[11px] text-rose-600 mt-0.5">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            PIN Code *
          </label>
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => handlePincodeChange(e.target.value)}
            placeholder="e.g. 400001"
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
          />
          {errors.pincode && <p className="text-[11px] text-rose-600 mt-0.5">{errors.pincode}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            City *
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            State *
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#172033] mb-1">
          Flat, House No., Building, Apartment *
        </label>
        <input
          type="text"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          placeholder="e.g. Flat 402, Sea Green Apartments"
          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
        />
        {errors.addressLine1 && <p className="text-[11px] text-rose-600 mt-0.5">{errors.addressLine1}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Area, Street, Sector (Optional)
          </label>
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="e.g. Marine Drive, Fort"
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Landmark (Optional)
          </label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="e.g. Opposite Oval Maidan"
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
          />
        </div>
      </div>

      {/* Type of Address */}
      <div>
        <label className="block text-xs font-semibold text-[#172033] mb-1.5">
          Address Type
        </label>
        <div className="flex gap-4">
          {(['home', 'work', 'other'] as const).map((type) => (
            <label key={type} className="flex items-center gap-1.5 text-xs text-[#64748B] capitalize cursor-pointer">
              <input
                type="radio"
                name="addressType"
                value={type}
                checked={addressType === type}
                onChange={() => setAddressType(type)}
                className="text-[#2962FF] focus:ring-[#2962FF]"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-center gap-2 text-xs text-[#64748B] cursor-pointer">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="rounded text-[#2962FF] focus:ring-[#2962FF]"
          />
          <span>Make this my default delivery address</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-[#E5EAF3]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#172033] rounded-xl hover:bg-[#F5F7FF] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] text-white text-xs font-bold rounded-xl transition-colors shadow-soft-sm"
        >
          Save Address
        </button>
      </div>
    </form>
  );
};
