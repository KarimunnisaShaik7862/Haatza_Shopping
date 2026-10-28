import React, { useState } from 'react';
import { Address } from '../../types';
import { locationService } from '../../services/locationService';
import { Navigation, Loader2, AlertCircle } from 'lucide-react';

interface AddressFormProps {
  initialValues?: Partial<Address>;
  onSubmit: (address: Omit<Address, 'id'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [fullName, setFullName] = useState(initialValues?.fullName || '');
  const [phone, setPhone] = useState(initialValues?.phone || '');
  const [houseNumber, setHouseNumber] = useState(initialValues?.houseNumber || '');
  const [buildingName, setBuildingName] = useState(initialValues?.buildingName || '');
  const [street, setStreet] = useState(initialValues?.street || '');
  const [area, setArea] = useState(initialValues?.area || '');
  const [landmark, setLandmark] = useState(initialValues?.landmark || '');
  const [city, setCity] = useState(initialValues?.city || 'Mumbai');
  const [state, setState] = useState(initialValues?.state || 'Maharashtra');
  const [pincode, setPincode] = useState(initialValues?.pincode || '');
  const [country, setCountry] = useState(initialValues?.country || 'India');
  const [addressType, setAddressType] = useState<Address['addressType']>(
    initialValues?.addressType || 'home'
  );
  const [isDefault, setIsDefault] = useState(initialValues?.isDefault ?? true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLocating, setIsLocating] = useState(false);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // If initialValues only had addressLine1 / addressLine2 from an older format, initialize
  React.useEffect(() => {
    if (initialValues?.addressLine1 && !houseNumber) {
      setHouseNumber(initialValues.addressLine1);
    }
    if (initialValues?.addressLine2 && !street) {
      setStreet(initialValues.addressLine2);
    }
  }, [initialValues]);

  // Handle PIN code input with automatic city/state lookup
  const handlePincodeChange = (pin: string) => {
    const clean = pin.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    if (errors.pincode) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.pincode;
        return next;
      });
    }

    if (clean.length === 6) {
      const loc = locationService.lookupPincode(clean);
      if (loc.city && loc.city !== 'City Area') setCity(loc.city);
      if (loc.state && loc.state !== 'India') setState(loc.state);
      if (loc.area && !area) setArea(loc.area);
    }
  };

  // Working location detection via browser Geolocation + Reverse Geocoding
  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setLocationError(null);
    setLocationNotice(null);

    try {
      const coords = await locationService.getCurrentPosition();
      const geocoded = await locationService.reverseGeocode(coords.latitude, coords.longitude);

      if (geocoded.houseNumber && !houseNumber) {
        setHouseNumber(geocoded.houseNumber);
      }
      if (geocoded.buildingName && !buildingName) {
        setBuildingName(geocoded.buildingName);
      }
      if (geocoded.street) {
        setStreet((prev) => prev || geocoded.street || '');
      }
      if (geocoded.area) {
        setArea((prev) => prev || geocoded.area || '');
      }
      if (geocoded.city) {
        setCity(geocoded.city);
      }
      if (geocoded.state) {
        setState(geocoded.state);
      }
      if (geocoded.pincode) {
        setPincode(geocoded.pincode);
      }
      if (geocoded.country) {
        setCountry(geocoded.country);
      }

      setLocationNotice('Location details detected and prefilled! Please review and complete any missing fields.');
    } catch (err: any) {
      setLocationError(err.message || 'Unable to detect location. You can enter your address details manually.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // 1. Full Name — required
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // 2. Mobile Number — required Indian 10-digit number
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Mobile Number is required';
    } else if (country.toLowerCase() === 'india' && (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6-9';
    } else if (cleanPhone.length < 8) {
      newErrors.phone = 'Please enter a valid mobile number';
    }

    // 3. House/Flat/Building Number — required
    if (!houseNumber.trim()) {
      newErrors.houseNumber = 'House / Flat / Building Number is required';
    }

    // 4. Street/Road — required
    if (!street.trim()) {
      newErrors.street = 'Street / Road name is required';
    }

    // 5. Area/Locality — required
    if (!area.trim()) {
      newErrors.area = 'Area / Locality is required';
    }

    // 6. City — required
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }

    // 7. State — required
    if (!state.trim()) {
      newErrors.state = 'State is required';
    }

    // 8. PIN Code — required (6-digit Indian PIN code when country is India)
    const cleanPin = pincode.replace(/\D/g, '');
    if (!pincode.trim()) {
      newErrors.pincode = 'PIN Code is required';
    } else if (country.toLowerCase() === 'india' && cleanPin.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit Indian PIN code';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Construct addressLine1 and addressLine2 for backwards compatibility
    const addressLine1 = buildingName.trim()
      ? `${houseNumber.trim()}, ${buildingName.trim()}`
      : houseNumber.trim();
    const addressLine2 = `${street.trim()}, ${area.trim()}`;

    onSubmit({
      fullName: fullName.trim(),
      phone: phone.trim(),
      houseNumber: houseNumber.trim(),
      buildingName: buildingName.trim() || undefined,
      street: street.trim(),
      area: area.trim(),
      landmark: landmark.trim() || undefined,
      addressLine1,
      addressLine2,
      city: city.trim(),
      state: state.trim(),
      pincode: cleanPin || pincode.trim(),
      country: country.trim() || 'India',
      addressType,
      isDefault,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Top Banner: Use My Location inside form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-[#EEF3FF] border border-[#DBEAFE]">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#2962FF] shrink-0" />
          <span className="text-xs font-semibold text-[#172033]">
            Auto-fill address using GPS location
          </span>
        </div>
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={isLocating}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#2962FF] hover:bg-[#1E4ED8] disabled:bg-blue-400 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs shrink-0"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Detecting...</span>
            </>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5" />
              <span>Use My Location</span>
            </>
          )}
        </button>
      </div>

      {locationNotice && (
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
          {locationNotice}
        </div>
      )}

      {locationError && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <span>{locationError}</span>
        </div>
      )}

      {/* Row 1: Full Name & Mobile Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
            }}
            placeholder="e.g. Rahul Sharma"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.fullName
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.fullName && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            maxLength={14}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
            }}
            placeholder="e.g. 9876543210"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.phone
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.phone && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.phone}</p>}
        </div>
      </div>

      {/* Row 2: House/Flat/Building Number & Apartment/Building Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            House / Flat / Building No. <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={houseNumber}
            onChange={(e) => {
              setHouseNumber(e.target.value);
              if (errors.houseNumber) setErrors((prev) => ({ ...prev, houseNumber: '' }));
            }}
            placeholder="e.g. Flat 402, House #12"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.houseNumber
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.houseNumber && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.houseNumber}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Apartment / Building Name <span className="text-zinc-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            placeholder="e.g. Sea Green Apartments"
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15 transition-all"
          />
        </div>
      </div>

      {/* Row 3: Street/Road & Area/Locality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Street / Road <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              if (errors.street) setErrors((prev) => ({ ...prev, street: '' }));
            }}
            placeholder="e.g. Marine Drive Road"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.street
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.street && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.street}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Area / Locality <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              if (errors.area) setErrors((prev) => ({ ...prev, area: '' }));
            }}
            placeholder="e.g. Fort, South Mumbai"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.area
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.area && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.area}</p>}
        </div>
      </div>

      {/* Row 4: Landmark (Optional) */}
      <div>
        <label className="block text-xs font-semibold text-[#172033] mb-1">
          Landmark <span className="text-zinc-400 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="e.g. Near Oval Maidan or Metro Station"
          className="w-full px-3 py-2 text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15 transition-all"
        />
      </div>

      {/* Row 5: City, State, PIN Code, Country */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            City <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
            }}
            placeholder="City"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.city
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.city && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            State <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              if (errors.state) setErrors((prev) => ({ ...prev, state: '' }));
            }}
            placeholder="State"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.state
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.state && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            PIN Code <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => handlePincodeChange(e.target.value)}
            placeholder="e.g. 400001"
            className={`w-full px-3 py-2 text-xs rounded-xl border bg-white text-[#172033] focus:outline-hidden transition-all ${
              errors.pincode
                ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-[#CBD5E1] focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15'
            }`}
          />
          {errors.pincode && <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.pincode}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#172033] mb-1">
            Country <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15 transition-all"
          />
        </div>
      </div>

      {/* Row 6: Address Type (Home, Work, Other) */}
      <div>
        <label className="block text-xs font-semibold text-[#172033] mb-1.5">
          Address Type
        </label>
        <div className="flex items-center gap-4">
          {(['home', 'work', 'other'] as const).map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold capitalize cursor-pointer transition-all ${
                addressType === type
                  ? 'border-[#2962FF] bg-[#EEF3FF] text-[#2962FF]'
                  : 'border-[#E2E8F0] bg-white text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <input
                type="radio"
                name="addressType"
                value={type}
                checked={addressType === type}
                onChange={() => setAddressType(type)}
                className="accent-[#2962FF]"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Row 7: Set as Default Address */}
      <div className="pt-1">
        <label className="flex items-center gap-2.5 text-xs text-zinc-700 font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="w-4 h-4 rounded-md border-zinc-300 accent-[#2962FF] cursor-pointer"
          />
          <span>Set as Default Delivery Address</span>
        </label>
      </div>

      {/* Actions: Save Address & Cancel */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5EAF3]">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] disabled:bg-blue-400 text-white text-xs font-bold rounded-xl transition-colors shadow-soft-sm cursor-pointer"
        >
          {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          <span>Save Address</span>
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
