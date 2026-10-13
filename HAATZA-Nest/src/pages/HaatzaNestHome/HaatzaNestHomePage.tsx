import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HaatzaNestHomeService, 
  HaatzaNestServiceCategory 
} from '../../types/haatzaNest.types';
import { haatzaNestService } from '../../services/haatzaNestService';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';
import { HaatzaNestServiceCard } from '../../components/HaatzaNestServices/HaatzaNestServiceCard';
import { HaatzaNestLoading } from '../../components/common/HaatzaNestLoading';
import { 
  Sparkles, ShieldCheck, Clock, Star, MapPin, 
  CheckCircle2, ChevronRight, HelpCircle, 
  ArrowRight, ThumbsUp, Award, HeartHandshake, ChevronDown
} from 'lucide-react';
import { HaatzaNestButton } from '../../components/common/HaatzaNestButton';

export const HaatzaNestHomePage: React.FC = () => {
  const { location, openLocationModal } = useHaatzaNestLocation();
  const { openBookingModal } = useHaatzaNestBooking();

  const [services, setServices] = useState<HaatzaNestHomeService[]>([]);
  const [categories, setCategories] = useState<HaatzaNestServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [allSrv, cats] = await Promise.all([
          haatzaNestService.getAllServices(),
          haatzaNestService.getCategories(),
        ]);
        setServices(allSrv);
        setCategories(cats);
      } catch (e) {
        console.error('Failed loading NEST services', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredServices = services.filter((srv) => {
    return selectedCategory === 'all' || srv.categorySlug === selectedCategory;
  });

  const faqs = [
    {
      q: 'Do NEST specialists bring their own cleaning supplies and equipment?',
      a: 'Yes, absolutely. Our verified partners arrive equipped with industrial-grade vacuum cleaners, certified non-toxic chemicals, microfiber cleaning cloths, and safety gear.',
    },
    {
      q: 'How are professionals verified and trained before visiting homes?',
      a: 'All NEST pros undergo mandatory government Aadhaar background verification, police clearance checks, and 40 hours of in-house professional etiquette and service training.',
    },
    {
      q: 'What if I need to reschedule or cancel my service booking?',
      a: 'You can reschedule or cancel with zero penalty up to 2 hours before the scheduled time slot directly from your Bookings dashboard.',
    },
    {
      q: 'When do I have to pay for the home service?',
      a: 'You only pay after the specialist finishes the work to your 100% satisfaction. We accept UPI, credit cards, and cash on service completion.',
    },
  ];

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 space-y-6">
        <HaatzaNestLoading type="skeleton" count={6} />
      </div>
    );
  }

  return (
    <div className="pb-20 space-y-8 bg-[#FAF8FD] min-h-screen">
      
      {/* Hero Banner Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#6C3FC5] via-[#522ba0] to-indigo-950 text-white shadow-xl min-h-[360px] sm:min-h-[420px] flex items-center p-6 sm:p-12">
          {/* Background Glow */}
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#FFD54F]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-300" /> ON-DEMAND HOME HELP
                </span>
                <span className="text-[11px] font-black text-yellow-300">
                  ★ 4.9 RATED
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-none text-white font-heading">
                Home Help, Made Simple.
              </h1>

              <p className="text-base sm:text-xl font-bold text-purple-200">
                Trained & Background-Verified Specialists at Your Doorstep
              </p>

              <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl leading-relaxed">
                Book certified domestic specialists in 60 seconds with upfront transparent pricing, on-time arrival guarantee, and hospital-grade sanitization.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {services.length > 0 && (
                  <HaatzaNestButton
                    variant="yellow"
                    size="md"
                    onClick={() => openBookingModal(services[0])}
                    className="flex items-center gap-2 shadow-lg"
                  >
                    <span>Book Full Deep Clean</span>
                    <ArrowRight className="w-4 h-4" />
                  </HaatzaNestButton>
                )}
                <button
                  type="button"
                  onClick={openLocationModal}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-yellow-300" />
                  <span>Serving {location.pincode} ({location.city})</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                  alt="Nest Home Cleaning"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-xs font-black text-white bg-black/50 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                    Trusted by 45,000+ Households
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Category Switcher */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 font-heading">
                Explore Services by Category
              </h2>
              <p className="text-xs text-zinc-500 font-medium">Select a category to filter expert services</p>
            </div>
            <Link
              to="/nest/services"
              className="text-xs font-bold text-[#6C3FC5] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`p-3 rounded-2xl text-center border-2 transition-all flex flex-col items-center cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'border-[#6C3FC5] bg-[#F2ECFC] shadow-xs'
                    : 'border-zinc-100 hover:border-purple-200 bg-zinc-50/50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden mb-2 bg-white p-1 shadow-2xs">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className="text-xs font-bold text-zinc-800 line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {cat.serviceCount} services
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 font-heading">
                {selectedCategory === 'all' ? 'All Verified Services' : `Services in ${selectedCategory}`}
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                Transparent packages • Free re-service guarantee • Verified specialists
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredServices.map((srv) => (
              <HaatzaNestServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        </div>
      </div>

      {/* NEST Trust & Assurance */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 sm:p-8 bg-[#F2ECFC] border border-purple-200/80 rounded-3xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#6C3FC5] flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-zinc-900">100% Background Verified</h4>
              <p className="text-xs text-zinc-600 mt-1">Police verified ID credentials & safety training for all service personnel.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#6C3FC5] flex items-center justify-center shadow-xs shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-zinc-900">Hospital-Grade Sanitization</h4>
              <p className="text-xs text-zinc-600 mt-1">Industrial equipment and certified non-toxic chemicals safe for kids and pets.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#6C3FC5] flex items-center justify-center shadow-xs shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-zinc-900">On-Time Arrival Guarantee</h4>
              <p className="text-xs text-zinc-600 mt-1">Specialists reach your door within the chosen 1-hour appointment window.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-2xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 font-heading">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-zinc-500 font-medium">Everything you need to know about booking on NEST</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-zinc-900 hover:text-[#6C3FC5] bg-zinc-50/50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-2 text-xs text-zinc-600 bg-white border-t border-zinc-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
