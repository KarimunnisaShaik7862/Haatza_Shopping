import React, { useState, useEffect } from 'react';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { HaatzaNestServicePackage, HaatzaNestServiceBooking } from '../../types/haatzaNest.types';
import { formatCurrency } from '../../utils/formatters';
import { 
  X, Check, Calendar, Clock, MapPin, 
  Sparkles, CheckCircle2, ChevronRight, Phone, User 
} from 'lucide-react';
import { HaatzaNestButton } from '../common/HaatzaNestButton';

export const HaatzaNestBookingModal: React.FC = () => {
  const { 
    activeModalService, 
    closeBookingModal, 
    createBooking, 
    preselectedPackage 
  } = useHaatzaNestBooking();
  const { location } = useHaatzaNestLocation();

  const [step, setStep] = useState<'package' | 'details' | 'confirmed'>('package');
  const [selectedPkg, setSelectedPkg] = useState<HaatzaNestServicePackage | null>(null);
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 10:00 AM');
  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [customerAddress, setCustomerAddress] = useState(location.formattedAddress || 'Flat 402, Sea Breeze Heights');
  const [notes, setNotes] = useState('Please bring eco-friendly pet-safe chemicals.');
  const [confirmedBooking, setConfirmedBooking] = useState<HaatzaNestServiceBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (activeModalService) {
      setSelectedPkg(preselectedPackage || (activeModalService.packages && activeModalService.packages[0]) || null);
      setStep('package');
    }
  }, [activeModalService, preselectedPackage]);

  if (!activeModalService) return null;

  const currentPrice = selectedPkg ? selectedPkg.price : activeModalService.price;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const b = await createBooking({
        serviceId: activeModalService.id,
        serviceName: activeModalService.name,
        serviceImage: activeModalService.image,
        categoryName: activeModalService.category,
        packageId: selectedPkg?.id,
        packageName: selectedPkg?.name,
        price: currentPrice,
        scheduledDate: selectedDate,
        scheduledTimeSlot: '10:00 AM - 01:00 PM',
        customerName,
        customerPhone,
        customerAddress,
        notes,
      });
      setConfirmedBooking(b);
      setStep('confirmed');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-[#FAF8FD]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-[#6C3FC5] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-zinc-900 font-heading">
                {activeModalService.name}
              </h3>
              <p className="text-xs text-purple-700 font-medium">On-Demand Verified Booking</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeBookingModal}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 'package' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-zinc-900 mb-1">Select Service Package</h4>
                <p className="text-xs text-zinc-500">Choose the apartment size or workload requirement</p>
              </div>

              <div className="space-y-2.5">
                {activeModalService.packages && activeModalService.packages.length > 0 ? (
                  activeModalService.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedPkg?.id === pkg.id
                          ? 'border-[#6C3FC5] bg-purple-50/50 shadow-xs'
                          : 'border-zinc-200 hover:border-purple-200 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900">{pkg.name}</span>
                          {pkg.recommended && (
                            <span className="text-[10px] bg-[#6C3FC5] text-white px-2 py-0.5 rounded-full font-black">
                              POPULAR
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500">{pkg.description}</p>
                        <span className="text-[11px] text-purple-700 font-medium">{pkg.duration}</span>
                      </div>
                      <span className="text-base font-black text-[#6C3FC5] shrink-0 ml-4">
                        {formatCurrency(pkg.price)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">Standard Service Visit</p>
                      <p className="text-xs text-zinc-500">Includes complete kit and trained helper</p>
                    </div>
                    <span className="text-base font-black text-[#6C3FC5]">
                      {formatCurrency(activeModalService.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Inclusions summary */}
              {activeModalService.included && activeModalService.included.length > 0 && (
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/60 space-y-2">
                  <span className="text-xs font-bold text-emerald-900">What's Included:</span>
                  <div className="space-y-1">
                    {activeModalService.included.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-emerald-800">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-zinc-900 mb-1">Appointment & Address</h4>
                <p className="text-xs text-zinc-500">Provide preferred slot and doorstep address</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Date & Time Slot</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 bg-white text-xs font-medium focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Today, 03:00 PM - 05:00 PM">Today, 03:00 PM - 05:00 PM (Express Slot)</option>
                    <option value="Tomorrow, 10:00 AM">Tomorrow, 10:00 AM - 01:00 PM (Morning)</option>
                    <option value="Tomorrow, 02:00 PM">Tomorrow, 02:00 PM - 05:00 PM (Afternoon)</option>
                    <option value="Weekend Special Slot">Saturday, 10:00 AM - 01:00 PM (Weekend)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 text-xs font-medium focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 text-xs font-medium focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Service Address</label>
                  <textarea
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border border-zinc-200 text-xs font-medium focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">Special Notes / Requests</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please bring pet-safe cleaning agents"
                    className="w-full p-3 rounded-xl border border-zinc-200 text-xs font-medium focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'confirmed' && confirmedBooking && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-black tracking-wider text-purple-700 uppercase bg-purple-100 px-3 py-1 rounded-full">
                  Booking #{confirmedBooking.bookingNumber}
                </span>
                <h3 className="text-xl font-black text-zinc-900 mt-2 font-heading">
                  Service Appointment Confirmed!
                </h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  A verified specialist has been assigned and will arrive on time with the required tools.
                </p>
              </div>

              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Service:</span>
                  <span className="font-bold text-zinc-900">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Date/Time:</span>
                  <span className="font-bold text-zinc-900">{confirmedBooking.scheduledDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Amount Due:</span>
                  <span className="font-bold text-[#6C3FC5]">{formatCurrency(confirmedBooking.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Partner:</span>
                  <span className="font-bold text-emerald-700">{confirmedBooking.professionalName}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-zinc-100 bg-[#FAF8FD] flex items-center justify-between gap-3">
          {step === 'package' && (
            <>
              <div>
                <span className="text-xs text-zinc-400">Total Price</span>
                <p className="text-lg font-black text-[#6C3FC5]">
                  {formatCurrency(currentPrice)}
                </p>
              </div>
              <HaatzaNestButton
                variant="primary"
                onClick={() => setStep('details')}
                className="flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </HaatzaNestButton>
            </>
          )}

          {step === 'details' && (
            <>
              <HaatzaNestButton
                variant="outline"
                size="sm"
                onClick={() => setStep('package')}
              >
                Back
              </HaatzaNestButton>
              <HaatzaNestButton
                variant="primary"
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex items-center gap-1.5"
              >
                <span>{isSubmitting ? 'Confirming...' : `Confirm & Pay ${formatCurrency(currentPrice)}`}</span>
              </HaatzaNestButton>
            </>
          )}

          {step === 'confirmed' && (
            <HaatzaNestButton
              variant="primary"
              fullWidth
              onClick={closeBookingModal}
            >
              Done
            </HaatzaNestButton>
          )}
        </div>
      </div>
    </div>
  );
};
