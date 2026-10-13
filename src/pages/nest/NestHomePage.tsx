import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomeService, ServiceCategory, ServiceBooking, ServicePackage } from '../../types';
import { nestService } from '../../services/nestService';
import { categoryService } from '../../services/categoryService';
import { useLocationContext } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import {
  Sparkles, ShieldCheck, Clock, Star, MapPin, 
  Search, CheckCircle2, ChevronRight, X, Calendar, 
  Check, Phone, User, HelpCircle, ArrowRight, 
  ThumbsUp, Award, HeartHandshake, Eye
} from 'lucide-react';

export const NestHomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const { location, openLocationModal } = useLocationContext();
  const { user } = useAuth();

  const [services, setServices] = useState<HomeService[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [activeBookingService, setActiveBookingService] = useState<HomeService | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 10:00 AM');
  const [bookingStep, setBookingStep] = useState<'package' | 'slot' | 'details' | 'summary' | 'confirmed'>('package');
  const [createdBooking, setCreatedBooking] = useState<ServiceBooking | null>(null);

  // Form Details
  const [customerName, setCustomerName] = useState(user?.name || 'Priya Sharma');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 98765 43210');
  const [customerAddress, setCustomerAddress] = useState('Flat 402, Sea Breeze Heights');
  const [bookingNotes, setBookingNotes] = useState('Please bring eco-friendly pet-safe chemicals.');

  // Mock Bookings History Drawer/Modal
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [bookingHistory, setBookingHistory] = useState<ServiceBooking[]>([]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [allSrv, cats, history] = await Promise.all([
          nestService.getAllServices(),
          categoryService.getCategories('nest') as unknown as Promise<ServiceCategory[]>,
          nestService.getBookings(),
        ]);
        setServices(allSrv);
        setCategories(cats);
        setBookingHistory(history);
      } catch (e) {
        console.error('Failed loading NEST services', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update selectedCategory if URL changes
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category') || 'all');
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search') || '');
    }
  }, [searchParams]);

  // Filtered Services
  const filteredServices = services.filter((srv) => {
    const matchesCategory =
      selectedCategory === 'all' || srv.categorySlug === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularServices = services.filter((s) => s.popular);

  const startBooking = (service: HomeService) => {
    setActiveBookingService(service);
    setSelectedPackage(service.packages[0] || null);
    setBookingStep('package');
  };

  const handleConfirmBooking = async () => {
    if (!activeBookingService) return;

    const price = selectedPackage ? selectedPackage.price : activeBookingService.price;
    const newBooking = await nestService.createBooking({
      serviceId: activeBookingService.id,
      serviceName: `${activeBookingService.name} ${selectedPackage ? `(${selectedPackage.name})` : ''}`,
      serviceImage: activeBookingService.image,
      packageId: selectedPackage?.id,
      packageName: selectedPackage?.name,
      date: selectedDate.split(',')[0] || 'Tomorrow',
      timeSlot: selectedDate.split(',')[1] || '10:00 AM - 01:00 PM',
      amount: price,
      notes: bookingNotes,
      address: {
        id: `addr-${Date.now()}`,
        fullName: customerName,
        phone: customerPhone,
        pincode: location.pincode,
        addressLine1: customerAddress,
        city: location.city,
        state: location.state,
        addressType: 'home',
        isDefault: true,
      },
    });

    setCreatedBooking(newBooking);
    setBookingHistory((prev) => [newBooking, ...prev]);
    setBookingStep('confirmed');
  };

  return (
    <div className="bg-[#FAF8FE] min-h-screen text-[#202124] space-y-6 pb-24 sm:pb-16">
      
      {/* ========================================================
          HERO SECTION: "Home help, made simple." (Pronto/Snabbit Style)
          ======================================================== */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#6C3FC5] via-[#5A2DBE] to-[#421B9B] text-white shadow-xl">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 w-full">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-[#FFD54F]">
                <Sparkles className="w-3.5 h-3.5 fill-[#FFD54F]" />
                <span>NEST HOME SERVICES — PRONTO & SNABBIT INSPIRED</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Home help, <br />
                <span className="text-[#FFD54F]">made simple.</span>
              </h1>

              <p className="text-sm sm:text-base text-purple-100 max-w-xl font-medium leading-relaxed">
                Book verified domestic specialists for deep cleaning, kitchen degreasing, bathroom scrubbing, sweeping & mopping, and ironing in just 60 seconds.
              </p>

              {/* Service Discovery Search Bar */}
              <div className="pt-2 max-w-xl">
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 border border-purple-200">
                  <Search className="w-5 h-5 text-purple-700 ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search home cleaning, kitchen scrub, sofa..."
                    className="w-full px-3 py-2 text-sm text-[#202124] focus:outline-hidden font-medium placeholder:text-zinc-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-zinc-400 hover:text-zinc-600 mr-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl bg-[#6C3FC5] hover:bg-[#5A2DBE] text-white font-bold text-xs shadow-md transition-all shrink-0"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Location & Booking History Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <button
                  type="button"
                  onClick={openLocationModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs text-white border border-white/15 transition-colors font-medium"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FFD54F]" />
                  <span>Service Area: <strong>{location.city} ({location.pincode})</strong></span>
                  <span className="underline ml-1">Change</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD54F] text-[#202124] hover:bg-amber-300 font-bold shadow-xs transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>My Bookings ({bookingHistory.length})</span>
                </button>
              </div>
            </div>

            {/* Hero Trust Badges Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 space-y-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-purple-200">
                  The NEST Service Guarantee
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-[#FFD54F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">100% Background Verified Pros</h4>
                      <p className="text-[11px] text-purple-200">Police verified & hospital-standard hygiene trained</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-2xl">
                    <Award className="w-5 h-5 text-[#FFD54F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Transparent Indicative Pricing</h4>
                      <p className="text-[11px] text-purple-200">Starting from ₹199 with zero hidden surcharge</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/10 p-3 rounded-2xl">
                    <HeartHandshake className="w-5 h-5 text-[#FFD54F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Satisfaction Guaranteed</h4>
                      <p className="text-[11px] text-purple-200">Free re-service if any corner is missed</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-purple-200">★ 4.9/5 Average Rating across 15,000+ happy homes</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ========================================================
          SERVICE CATEGORIES STRIP (Pronto / Snabbit Style)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight">
              Home Service Categories
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium">Choose a specialized domestic help category</p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-[#6C3FC5] hover:underline"
            >
              Reset to All Services
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#6C3FC5] text-white border-[#6C3FC5] shadow-md scale-102'
                    : 'bg-white text-zinc-700 hover:bg-purple-50 border-zinc-200/80 hover:border-purple-200 shadow-2xs'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 overflow-hidden ${
                  isSelected ? 'bg-white/20' : 'bg-[#F2ECFC]'
                }`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {cat.name}
                </span>
                <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-purple-200' : 'text-zinc-400'}`}>
                  {cat.serviceCount ?? (cat as any).itemCount ?? 0} options
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          POPULAR SERVICES CAROUSEL / HIGHLIGHT (Pronto / Snabbit)
          ======================================================== */}
      {selectedCategory === 'all' && !searchQuery && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFD54F]/30 text-amber-900 text-[11px] font-extrabold mb-1">
                  ★ MOST BOOKED IN YOUR AREA
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight">
                  Popular Services
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularServices.map((srv) => (
                <div
                  key={srv.id}
                  className="group relative bg-[#FAF8FE] rounded-2xl border border-purple-100 hover:border-[#6C3FC5] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                    <img
                      src={srv.image}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#6C3FC5] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-xs">
                      POPULAR CHOICE
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#202124] text-xs font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{srv.rating} ({srv.reviewCount})</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#6C3FC5] uppercase tracking-wider">
                        {srv.category}
                      </span>
                      <h4 className="text-base font-black text-[#202124] group-hover:text-[#6C3FC5] transition-colors mt-0.5">
                        {srv.name}
                      </h4>
                      <p className="text-xs text-zinc-600 line-clamp-2 mt-1.5 font-medium leading-relaxed">
                        {srv.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-purple-100/80 mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-400 block font-semibold uppercase">Starts at</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-[#6C3FC5]">
                            {formatCurrency(srv.price)}
                          </span>
                          <span className="text-[11px] text-zinc-500 font-medium">
                            / {srv.durationMinutes} mins
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => startBooking(srv)}
                        className="px-4 py-2 rounded-xl bg-[#6C3FC5] hover:bg-[#5A2DBE] text-white text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1"
                      >
                        <span>Book Now</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          ALL / FILTERED SERVICES CATALOGUE (Pronto / Snabbit)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight">
              {selectedCategory === 'all' ? 'All On-Demand Services' : `${categories.find(c => c.slug === selectedCategory)?.name || 'Category'} Services`}
            </h3>
            <p className="text-xs text-zinc-500 font-medium">
              Showing {filteredServices.length} verified services in {location.city}
            </p>
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200 max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-[#6C3FC5] mx-auto mb-3 opacity-60" />
            <h4 className="text-base font-bold text-zinc-800">No Services Found</h4>
            <p className="text-xs text-zinc-500 mt-1 mb-4">
              We couldn't find services matching "{searchQuery}". Try selecting another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#6C3FC5] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden hover:shadow-lg hover:border-purple-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#6C3FC5] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                    {srv.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-white text-[#202124] text-xs font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{srv.rating}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-[#202124]">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-zinc-600 mt-1.5 font-normal leading-relaxed line-clamp-2">
                      {srv.shortDescription}
                    </p>

                    {/* What's included preview */}
                    <div className="mt-3 space-y-1">
                      {srv.included.slice(0, 2).map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Indicative Price</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-[#6C3FC5]">
                          {formatCurrency(srv.price)}
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">
                          ({srv.durationMinutes}m)
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => startBooking(srv)}
                      className="px-4 py-2 rounded-xl bg-[#6C3FC5] hover:bg-[#5A2DBE] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                    >
                      Book Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================
          HOW IT WORKS SECTION (Pronto / Snabbit Inspired)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-zinc-200/90 shadow-2xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6C3FC5] bg-[#F2ECFC] px-3 py-1 rounded-full">
              EFFORTLESS PROCESS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight mt-2">
              How NEST Works
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-medium">
              Transparent, reliable domestic help booked in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F2ECFC] text-[#6C3FC5] flex items-center justify-center font-black text-xl mb-3 shadow-xs">
                1
              </div>
              <h4 className="text-sm font-bold text-[#202124] mb-1">Pick a Service</h4>
              <p className="text-xs text-zinc-500">
                Choose domestic cleaning, utensil wash, mopping, or laundry packages.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F2ECFC] text-[#6C3FC5] flex items-center justify-center font-black text-xl mb-3 shadow-xs">
                2
              </div>
              <h4 className="text-sm font-bold text-[#202124] mb-1">Choose a Slot</h4>
              <p className="text-xs text-zinc-500">
                Select your preferred date & time window for home arrival.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F2ECFC] text-[#6C3FC5] flex items-center justify-center font-black text-xl mb-3 shadow-xs">
                3
              </div>
              <h4 className="text-sm font-bold text-[#202124] mb-1">Verified Pro Arrives</h4>
              <p className="text-xs text-zinc-500">
                Background-checked specialist arrives on time with certified kits.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFD54F]/30 text-amber-900 flex items-center justify-center font-black text-xl mb-3 shadow-xs">
                4
              </div>
              <h4 className="text-sm font-bold text-[#202124] mb-1">Enjoy a Pristine Home</h4>
              <p className="text-xs text-zinc-500">
                Pay only after completion. Free re-service if you are not 100% satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CUSTOMER REVIEWS / TESTIMONIALS (Pronto / Snabbit)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-2xl font-black text-[#202124] tracking-tight">
            Real Reviews From Real Homes
          </h3>
          <p className="text-xs text-zinc-500 mt-1 font-medium">
            Illustrative feedback from delighted domestic service customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-zinc-700 italic leading-relaxed">
              "The 2 BHK deep clean transformed our apartment before Diwali. The team scrubbed the chimney grease so thoroughly it looks brand new. Very respectful and prompt."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6C3FC5] font-bold text-xs flex items-center justify-center">
                AK
              </div>
              <div>
                <p className="text-xs font-bold text-[#202124]">Ananya K.</p>
                <p className="text-[10px] text-zinc-400">Visakhapatnam • Full Home Deep Clean</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-zinc-700 italic leading-relaxed">
              "We booked the daily sweeping and herbal mopping service. The pro was punctual, polite, and the house smelled refreshing with natural lemongrass disinfectant."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6C3FC5] font-bold text-xs flex items-center justify-center">
                RK
              </div>
              <div>
                <p className="text-xs font-bold text-[#202124]">Rajesh K.</p>
                <p className="text-[10px] text-zinc-400">Visakhapatnam • Sweeping & Mopping</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-zinc-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-zinc-700 italic leading-relaxed">
              "Bathroom hard water scale removal was magical! The chrome fittings were sparkling like a new hotel suite. Upfront indicative pricing with zero surprises."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6C3FC5] font-bold text-xs flex items-center justify-center">
                SM
              </div>
              <div>
                <p className="text-xs font-bold text-[#202124]">Sneha M.</p>
                <p className="text-[10px] text-zinc-400">Visakhapatnam • Bathroom Descaling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FREQUENTLY ASKED QUESTIONS (Accordion)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs">
          <h3 className="text-xl font-black text-[#202124] tracking-tight mb-2 text-center">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-zinc-500 text-center mb-6 font-medium">
            Everything you need to know about booking NEST on-demand domestic help
          </p>

          <div className="space-y-3">
            {[
              { q: 'Do I need to provide any cleaning supplies or detergents?', a: 'No, NEST service professionals bring their own specialized cleaning kits, hospital-grade non-toxic chemicals, microfiber cloths, scrubbers, and industrial vacuum cleaners.' },
              { q: 'How are NEST domestic helpers verified?', a: 'Every service partner undergoes 3-step screening: Government Aadhaar verification, police background record check, and 40 hours of practical hospitality and safety training.' },
              { q: 'Can I reschedule or cancel a booking?', a: 'Yes! You can reschedule or cancel anytime up to 2 hours before the scheduled slot with zero cancellation fees.' },
              { q: 'Is there any safety guarantee for my home belongings?', a: 'Yes, all NEST bookings include complementary service damage insurance protection up to ₹10,000 for complete peace of mind.' },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-zinc-100 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-zinc-800 hover:bg-zinc-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-90 text-[#6C3FC5]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 bg-zinc-50/50 leading-relaxed font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          STRONG CALL TO ACTION BANNER (Bottom)
          ======================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#6C3FC5] to-[#4A209B] text-white p-6 sm:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to reclaim your free time?
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 font-medium">
              Join thousands of households that trust NEST for on-demand home cleaning, utensil washing, and domestic help.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (services.length > 0) startBooking(services[0]);
                }}
                className="px-6 py-3 rounded-full bg-[#FFD54F] hover:bg-amber-300 text-[#202124] font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                Book Instant Demo
              </button>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(true)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
              >
                View Past Bookings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE DEMO BOOKING MODAL (8-Step Journey)
          ======================================================== */}
      {activeBookingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveBookingService(null)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-[#FAF8FE] rounded-t-3xl">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6C3FC5]">
                  Demo Service Booking
                </span>
                <h3 className="text-base font-black text-[#202124]">
                  {activeBookingService.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveBookingService(null)}
                className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Indicator */}
            {bookingStep !== 'confirmed' && (
              <div className="flex items-center justify-between px-6 py-2.5 bg-purple-50/50 border-b border-purple-100 text-[11px] font-bold text-zinc-500">
                <span className={bookingStep === 'package' ? 'text-[#6C3FC5]' : ''}>1. Package</span>
                <span>→</span>
                <span className={bookingStep === 'slot' ? 'text-[#6C3FC5]' : ''}>2. Slot</span>
                <span>→</span>
                <span className={bookingStep === 'details' ? 'text-[#6C3FC5]' : ''}>3. Details</span>
                <span>→</span>
                <span className={bookingStep === 'summary' ? 'text-[#6C3FC5]' : ''}>4. Summary</span>
              </div>
            )}

            {/* Modal Body: Dynamic Step Content */}
            <div className="p-6 space-y-4">
              
              {/* STEP 1: SELECT PACKAGE */}
              {bookingStep === 'package' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Select Service Option or Package
                  </h4>
                  <div className="space-y-2.5">
                    {activeBookingService.packages.map((pkg) => {
                      const isSelected = selectedPackage?.id === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[#6C3FC5] bg-[#F2ECFC] shadow-2xs'
                              : 'border-zinc-200 hover:border-zinc-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-[#202124]">{pkg.name}</p>
                              {pkg.recommended && (
                                <span className="text-[9px] font-extrabold bg-[#FFD54F] text-amber-900 px-1.5 py-0.5 rounded">
                                  BEST VALUE
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-500 mt-0.5">{pkg.description}</p>
                            <span className="text-[10px] text-purple-700 font-semibold">{pkg.duration}</span>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-black text-[#6C3FC5]">
                              {formatCurrency(pkg.price)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setBookingStep('slot')}
                    className="w-full mt-4 py-3 rounded-xl bg-[#6C3FC5] hover:bg-[#5A2DBE] text-white font-bold text-xs shadow-md transition-all"
                  >
                    Continue to Slot Selection →
                  </button>
                </div>
              )}

              {/* STEP 2: SELECT DEMO DATE & TIME SLOT */}
              {bookingStep === 'slot' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Choose Date & Convenient Window
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      'Today, 04:00 PM',
                      'Tomorrow, 10:00 AM',
                      'Tomorrow, 02:00 PM',
                      'Day After, 11:00 AM',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedDate(slot)}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          selectedDate === slot
                            ? 'border-[#6C3FC5] bg-[#F2ECFC] text-[#6C3FC5] shadow-2xs'
                            : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 mb-1 text-purple-600" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setBookingStep('package')}
                      className="w-1/3 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingStep('details')}
                      className="w-2/3 py-2.5 rounded-xl bg-[#6C3FC5] hover:bg-[#5A2DBE] text-white font-bold text-xs shadow-md"
                    >
                      Enter Details →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: DEMO BOOKING DETAILS */}
              {bookingStep === 'details' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Enter Contact & Address
                  </h4>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-600">Your Full Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:border-[#6C3FC5]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-600">Mobile Phone</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:border-[#6C3FC5]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-600">House / Apartment Address</label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full mt-1 p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:border-[#6C3FC5]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-600">Special Instructions (Optional)</label>
                    <textarea
                      rows={2}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full mt-1 p-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:border-[#6C3FC5]"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingStep('slot')}
                      className="w-1/3 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingStep('summary')}
                      className="w-2/3 py-2.5 rounded-xl bg-[#6C3FC5] hover:bg-[#5A2DBE] text-white font-bold text-xs shadow-md"
                    >
                      Review Booking →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW BOOKING SUMMARY */}
              {bookingStep === 'summary' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Review Indicative Booking Summary
                  </h4>

                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-medium">Service:</span>
                      <strong className="text-zinc-800">{activeBookingService.name}</strong>
                    </div>
                    {selectedPackage && (
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-medium">Package:</span>
                        <strong className="text-zinc-800">{selectedPackage.name}</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-medium">Scheduled Time:</span>
                      <strong className="text-[#6C3FC5]">{selectedDate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-medium">Deliver to:</span>
                      <strong className="text-zinc-800 truncate max-w-[200px]">{customerAddress}, {location.pincode}</strong>
                    </div>
                    <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline">
                      <span className="font-bold text-zinc-800">Total Indicative Price:</span>
                      <span className="text-base font-black text-[#6C3FC5]">
                        {formatCurrency(selectedPackage?.price || activeBookingService.price)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 text-center">
                    Pay securely after job completion. No advance debit required for demo booking.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingStep('details')}
                      className="w-1/3 py-2.5 rounded-xl border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      className="w-2/3 py-2.5 rounded-xl bg-[#6C3FC5] hover:bg-[#5A2DBE] text-white font-bold text-xs shadow-md"
                    >
                      Confirm Demo Booking ✓
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: BOOKING CONFIRMED */}
              {bookingStep === 'confirmed' && createdBooking && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                      DEMO BOOKING CONFIRMED!
                    </span>
                    <h3 className="text-lg font-black text-[#202124] mt-1">
                      {createdBooking.bookingNumber}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                      Your on-demand service appointment has been scheduled for <strong>{createdBooking.date}</strong> ({createdBooking.timeSlot}).
                    </p>
                  </div>

                  <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100 text-xs text-left max-w-sm mx-auto space-y-1">
                    <p className="font-bold text-purple-900">Partner Details:</p>
                    <p className="text-purple-700">{createdBooking.professionalName}</p>
                    <p className="text-[11px] text-purple-500">Rating: ★ {createdBooking.professionalRating} (NEST Certified Domestic Pro)</p>
                  </div>

                  <div className="flex justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveBookingService(null);
                        setIsHistoryOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#6C3FC5] text-white font-bold text-xs shadow-xs"
                    >
                      View in Booking History
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveBookingService(null)}
                      className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-700 font-bold text-xs"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MOCK BOOKING HISTORY DRAWER (Section 8 Requirement)
          ======================================================== */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsHistoryOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto p-6 flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#6C3FC5] text-white flex items-center justify-center font-black">
                    N
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#202124]">NEST Booking History</h3>
                    <p className="text-[11px] text-zinc-500">Your scheduled on-demand home appointments</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3">
                {bookingHistory.length === 0 ? (
                  <p className="text-xs text-zinc-400 text-center py-12">No demo bookings found yet.</p>
                ) : (
                  bookingHistory.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 hover:bg-white hover:border-purple-200 transition-all space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[#6C3FC5]">{b.bookingNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                          {b.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-zinc-900">{b.serviceName}</h4>

                      <div className="flex items-center gap-1.5 text-zinc-600 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        <span>{b.date} • {b.timeSlot}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-200/80">
                        <span className="text-zinc-500 font-medium">Assigned Pro:</span>
                        <span className="font-bold text-zinc-800">{b.professionalName?.split(' ')[0]} (★ {b.professionalRating})</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-zinc-500 font-medium">Amount:</span>
                        <span className="font-black text-[#6C3FC5]">{formatCurrency(b.amount)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200">
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-bold"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
