import React, { useState, useEffect } from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { locationService } from '../../services/locationService';
import { AddressForm } from '../forms/AddressForm';
import { Address } from '../../types';
import {
  MapPin,
  Navigation,
  Plus,
  X,
  Check,
  Search,
  Home,
  Briefcase,
  Building,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

export const LocationSelectorModal: React.FC = () => {
  const {
    location,
    selectedAddress,
    isModalOpen,
    modalInitialMode = 'select',
    closeLocationModal,
    setPincode,
    setSelectedAddress,
  } = useLocationContext();
  const { addresses, addAddress } = useAuth();

  const [mode, setMode] = useState<'select' | 'add'>('select');
  const [prefilledLocation, setPrefilledLocation] = useState<Partial<Address> | undefined>(undefined);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sync mode when modal opens or closes
  useEffect(() => {
    if (isModalOpen) {
      setMode(modalInitialMode);
    } else {
      setMode('select');
      setPrefilledLocation(undefined);
      setLocationError(null);
      setErrorMsg('');
      setInputVal('');
    }
  }, [isModalOpen, modalInitialMode]);

  // Handle Escape key to close
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLocationModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeLocationModal]);

  if (!isModalOpen) return null;

  // Use My Location action in the main list view
  const handleUseMyLocation = async () => {
    setIsLocating(true);
    setLocationError(null);

    try {
      const coords = await locationService.getCurrentPosition();
      const geocoded = await locationService.reverseGeocode(coords.latitude, coords.longitude);

      setPrefilledLocation({
        houseNumber: geocoded.houseNumber || '',
        buildingName: geocoded.buildingName || '',
        street: geocoded.street || '',
        area: geocoded.area || '',
        city: geocoded.city || '',
        state: geocoded.state || '',
        pincode: geocoded.pincode || '',
        country: geocoded.country || 'India',
        addressLine1: geocoded.houseNumber
          ? `${geocoded.houseNumber}${geocoded.buildingName ? ', ' + geocoded.buildingName : ''}`
          : geocoded.buildingName || '',
        addressLine2: `${geocoded.street || ''}${geocoded.area ? ', ' + geocoded.area : ''}`,
      });
      setMode('add');
    } catch (err: any) {
      setLocationError(err.message || 'Unable to detect location. Please enter your address details manually.');
    } finally {
      setIsLocating(false);
    }
  };

  const handleApplyPincode = (pin: string) => {
    setErrorMsg('');
    const success = setPincode(pin);
    if (!success) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.');
    } else {
      setInputVal('');
    }
  };

  const handleSelectSavedAddress = (addr: Address) => {
    setSelectedAddress(addr);
  };

  const handleSaveNewAddress = (newAddr: Omit<Address, 'id'>) => {
    const saved = addAddress(newAddr);
    setSelectedAddress(saved);
  };

  const getAddressIcon = (type: Address['addressType']) => {
    switch (type) {
      case 'home':
        return <Home className="w-4 h-4 text-[#2962FF]" />;
      case 'work':
        return <Briefcase className="w-4 h-4 text-amber-600" />;
      case 'other':
      default:
        return <Building className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Transparent Click-to-Dismiss Backdrop:
          CRITICAL: Do NOT blur, dim, or darken the background! The rest of the site remains clear and visible. */}
      <div
        className="fixed inset-0 bg-transparent"
        onClick={closeLocationModal}
        aria-hidden="true"
      />

      {/* Right-Side Sliding Sidebar Panel */}
      <div className="relative w-full sm:max-w-md md:max-w-lg h-full bg-white shadow-2xl border-l border-zinc-200 overflow-hidden z-10 animate-in slide-in-from-right duration-300 ease-out flex flex-col">
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-100 bg-white shrink-0">
          <div className="flex items-center gap-2">
            {mode === 'add' && (
              <button
                type="button"
                onClick={() => setMode('select')}
                className="p-1 -ml-1 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer mr-1"
                title="Back to saved addresses"
                aria-label="Back to saved addresses"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#172033] font-heading">
                {mode === 'add' ? 'Add New Delivery Address' : 'Choose Delivery Location'}
              </h3>
              {mode === 'select' && (
                <p className="text-[11px] text-zinc-400">
                  Select a delivery location for accurate delivery time and availability
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={closeLocationModal}
            className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer shrink-0"
            title="Close sidebar"
            aria-label="Close delivery location sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {mode === 'add' ? (
            /* ==========================================================
               ADD NEW ADDRESS FORM VIEW
               ========================================================== */
            <AddressForm
              initialValues={prefilledLocation}
              onSubmit={handleSaveNewAddress}
              onCancel={() => setMode('select')}
            />
          ) : (
            /* ==========================================================
               DELIVERY LOCATION SELECTION VIEW (RIGHT-SIDE SIDEBAR)
               ========================================================== */
            <>
              {/* Error notice if location detection failed */}
              {locationError && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{locationError}</span>
                </div>
              )}

              {/* Action Buttons: "Use My Location" + "Add New Address" */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Use My Location Button */}
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={isLocating}
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#EEF3FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-[#2962FF] rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-2xs group"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#2962FF]" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 text-[#2962FF] group-hover:scale-110 transition-transform" />
                      <span>Use My Location</span>
                    </>
                  )}
                </button>

                {/* 2. Add New Address Button */}
                <button
                  type="button"
                  onClick={() => {
                    setPrefilledLocation(undefined);
                    setMode('add');
                  }}
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-white hover:bg-zinc-50 border border-[#CBD5E1] text-[#172033] rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-2xs group"
                >
                  <Plus className="w-4 h-4 text-[#2962FF] group-hover:scale-110 transition-transform" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Currently Selected Delivery Location */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-emerald-800">
                        Currently Delivering to:
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                        {selectedAddress
                          ? `${selectedAddress.fullName} — ${selectedAddress.addressLine1}, ${selectedAddress.city} (${selectedAddress.pincode})`
                          : location.formattedAddress}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded-md shrink-0 shadow-2xs">
                    <Check className="w-3 h-3" />
                    Active
                  </span>
                </div>
              </div>

              {/* Saved Addresses List */}
              {addresses.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider font-heading">
                      Saved Addresses ({addresses.length})
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {addresses.map((addr) => {
                      const isSelected =
                        selectedAddress?.id === addr.id ||
                        (!selectedAddress && location.pincode === addr.pincode && addr.isDefault);

                      return (
                        <div
                          key={addr.id}
                          onClick={() => handleSelectSavedAddress(addr)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'border-[#2962FF] bg-[#F5F8FF] ring-2 ring-[#2962FF]/10 shadow-xs'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="mt-0.5 p-1.5 rounded-lg bg-zinc-100 shrink-0">
                              {getAddressIcon(addr.addressType)}
                            </div>

                            <div className="min-w-0 flex-1 text-xs space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-bold text-zinc-900 text-xs sm:text-sm">
                                  {addr.fullName}
                                </span>
                                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                                  {addr.addressType}
                                </span>
                                {addr.isDefault && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-[#2962FF]">
                                    Default
                                  </span>
                                )}
                              </div>

                              <p className="text-zinc-600 line-clamp-2">
                                {addr.addressLine1}
                                {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                                {addr.landmark ? `, Landmark: ${addr.landmark}` : ''}
                              </p>

                              <p className="text-zinc-500 font-medium">
                                {addr.city}, {addr.state} — <strong className="text-zinc-800">{addr.pincode}</strong>
                              </p>

                              <p className="text-[11px] text-zinc-400">
                                Phone: {addr.phone}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectSavedAddress(addr);
                            }}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors shrink-0 ${
                              isSelected
                                ? 'bg-[#2962FF] text-white shadow-xs'
                                : 'bg-zinc-100 hover:bg-[#EEF3FF] text-zinc-700 hover:text-[#2962FF]'
                            }`}
                          >
                            {isSelected ? 'Delivering Here' : 'Deliver Here'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-zinc-200 text-center space-y-1">
                  <p className="text-xs font-semibold text-zinc-700">No saved addresses</p>
                  <p className="text-[11px] text-zinc-400">
                    Click &ldquo;Use My Location&rdquo; or &ldquo;Add New Address&rdquo; to add your delivery address.
                  </p>
                </div>
              )}

              {/* Enter PIN Code */}
              <div className="pt-2 border-t border-zinc-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleApplyPincode(inputVal);
                  }}
                  className="space-y-2"
                >
                  <label htmlFor="pincode-input" className="block text-xs font-semibold text-zinc-700">
                    Check delivery by 6-digit PIN code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                        className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#CBD5E1] bg-white text-zinc-900 focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] text-white text-xs font-bold rounded-xl transition-colors shadow-soft-sm cursor-pointer shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelectorModal;
