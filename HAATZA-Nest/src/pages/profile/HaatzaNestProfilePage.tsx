import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, Calendar, MapPin, 
  Plus, Edit2, Trash2, CheckCircle2, 
  X, Phone, Mail, Home, Briefcase, Tag,
  Clock, AlertCircle, ArrowRight, LogOut, Check,
  Sparkles, ShieldCheck
} from 'lucide-react';
import { useHaatzaNestUser, NestAddress } from '../../hooks/useHaatzaNestUser';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';
import { HaatzaNestServiceBooking } from '../../types/haatzaNest.types';
import bookingSpecialistImg from '../../assets/haatza_nest_booking_specialist.jpg';

const getBookingImage = (img?: string) => {
  if (
    !img ||
    img.includes('73d0ef_0b2f688068434e46a538a629de0a6e17') ||
    img.includes('house-cleaning')
  ) {
    return bookingSpecialistImg;
  }
  return img;
};

// Friendly lightweight vector illustration for Saved Addresses empty state
const FriendlyHouseIllustration: React.FC = () => (
  <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-3 flex items-center justify-center select-none animate-float-subtle">
    {/* Soft ambient background glow */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[#7027C9]/15 via-[#FFD83D]/20 to-transparent rounded-full blur-xl transform scale-90" />
    
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-sm">
      {/* Base Ground Ellipses */}
      <ellipse cx="80" cy="138" rx="52" ry="8" fill="#E8DEF8" opacity="0.7" />
      <ellipse cx="80" cy="138" rx="34" ry="5" fill="#D4BEEF" opacity="0.5" />

      {/* House Body */}
      <rect x="44" y="74" width="72" height="54" rx="8" fill="#FFFFFF" stroke="#7027C9" strokeWidth="3" />
      <rect x="44" y="120" width="72" height="8" rx="4" fill="#FAF5FF" />

      {/* Chimney & Smoke Hearts */}
      <rect x="96" y="44" width="14" height="22" rx="3" fill="#FAF5FF" stroke="#7027C9" strokeWidth="3" />
      <circle cx="103" cy="34" r="4" fill="#FFD83D" />
      <circle cx="108" cy="24" r="3" fill="#9138F5" opacity="0.8" />
      <circle cx="112" cy="16" r="2" fill="#7027C9" opacity="0.6" />

      {/* Pitched Roof */}
      <path d="M34 78L80 40L126 78" stroke="#7027C9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#FAF5FF" />
      <path d="M42 74L80 43L118 74" fill="url(#nestHouseRoofGrad)" />

      {/* Welcoming Door with Gold Handle */}
      <path d="M68 128V98C68 93.5817 71.5817 90 76 90H84C88.4183 90 92 93.5817 92 98V128H68Z" fill="#F5ECFF" stroke="#7027C9" strokeWidth="2.5" />
      <circle cx="86" cy="110" r="2.5" fill="#FFD83D" stroke="#7027C9" strokeWidth="1.5" />

      {/* Warm Amber Glowing Windows */}
      <rect x="52" y="86" width="12" height="12" rx="3" fill="#FFE885" stroke="#7027C9" strokeWidth="2" />
      <line x1="58" y1="86" x2="58" y2="98" stroke="#7027C9" strokeWidth="1.5" />
      <line x1="52" y1="92" x2="64" y2="92" stroke="#7027C9" strokeWidth="1.5" />

      <rect x="96" y="86" width="12" height="12" rx="3" fill="#FFE885" stroke="#7027C9" strokeWidth="2" />
      <line x1="102" y1="86" x2="102" y2="98" stroke="#7027C9" strokeWidth="1.5" />
      <line x1="96" y1="92" x2="108" y2="92" stroke="#7027C9" strokeWidth="1.5" />

      {/* Floating Animated Location Pin */}
      <g className="animate-bounce" style={{ animationDuration: '3s' }}>
        <path d="M80 18C72.268 18 66 24.268 66 32C66 41.5 80 54 80 54C80 54 94 41.5 94 32C94 24.268 87.732 18 80 18Z" fill="url(#nestPinGrad)" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="80" cy="31" r="5" fill="#FFFFFF" />
        <circle cx="80" cy="31" r="2.5" fill="#7027C9" />
      </g>

      {/* Decorative Warm Sparkles */}
      <path d="M30 46L32 50L36 52L32 54L30 58L28 54L24 52L28 50L30 46Z" fill="#FFD83D" />
      <path d="M132 88L133.5 91L136.5 92.5L133.5 94L132 97L130.5 94L127.5 92.5L130.5 91L132 88Z" fill="#FFD83D" />

      <defs>
        <linearGradient id="nestHouseRoofGrad" x1="42" y1="43" x2="118" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5ECFF" />
          <stop offset="1" stopColor="#EAD7FF" />
        </linearGradient>
        <linearGradient id="nestPinGrad" x1="66" y1="18" x2="94" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9138F5" />
          <stop offset="1" stopColor="#7027C9" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Friendly lightweight vector illustration for Bookings empty state
const FriendlyCalendarIllustration: React.FC = () => (
  <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-3 flex items-center justify-center select-none animate-float-subtle">
    <div className="absolute inset-0 bg-gradient-to-tr from-[#7027C9]/15 via-[#FFD83D]/20 to-transparent rounded-full blur-xl transform scale-90" />
    <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-sm">
      <ellipse cx="70" cy="122" rx="46" ry="7" fill="#E8DEF8" opacity="0.7" />
      <rect x="30" y="36" width="80" height="76" rx="16" fill="#FFFFFF" stroke="#7027C9" strokeWidth="3" />
      <path d="M30 54H110" stroke="#7027C9" strokeWidth="2.5" />
      <rect x="46" y="26" width="8" height="18" rx="4" fill="#FFD83D" stroke="#7027C9" strokeWidth="2" />
      <rect x="86" y="26" width="8" height="18" rx="4" fill="#FFD83D" stroke="#7027C9" strokeWidth="2" />
      <circle cx="50" cy="70" r="3.5" fill="#E8DEF8" />
      <circle cx="70" cy="70" r="3.5" fill="#E8DEF8" />
      <circle cx="90" cy="70" r="3.5" fill="#E8DEF8" />
      <circle cx="50" cy="88" r="3.5" fill="#E8DEF8" />
      <circle cx="70" cy="88" r="4.5" fill="#FFD83D" stroke="#7027C9" strokeWidth="1.5" />
      <circle cx="90" cy="88" r="3.5" fill="#9138F5" />
      <path d="M106 20L108 24L112 26L108 28L106 32L104 28L100 26L104 24L106 20Z" fill="#FFD83D" />
      <path d="M24 78L25.5 81L28.5 82.5L25.5 84L24 87L22.5 84L19.5 82.5L22.5 81L24 78Z" fill="#9138F5" />
    </svg>
  </div>
);

// Friendly cute house mascot holding heart for top header card (matching design reference)
const HappyHomeMascot: React.FC = () => (
  <div className="hidden lg:flex items-center gap-3 select-none pointer-events-none">
    {/* Vector House Mascot */}
    <div className="relative w-28 h-24 flex items-center justify-center">
      <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* Soft Lavender Background Aura / Leaves */}
        <ellipse cx="60" cy="100" rx="42" ry="7" fill="#E8DEF8" opacity="0.6" />
        <path d="M22 88C18 78 22 68 28 64C28 72 32 80 34 85Z" fill="#D4BAF9" opacity="0.7" />
        <path d="M18 72C15 64 18 56 24 53C24 60 27 66 29 70Z" fill="#EADDFB" opacity="0.8" />
        
        {/* Chimney */}
        <rect x="74" y="22" width="13" height="22" rx="3.5" fill="#6A1B9A" stroke="#52127A" strokeWidth="1.5" />
        <ellipse cx="80.5" cy="22" rx="6.5" ry="2.5" fill="#8E38F5" />
        
        {/* House Roof & Body */}
        <path
          d="M60 20L98 52C101 54.5 101.5 59 99 62L96 65C94 67 90.5 66.5 88.5 64.5L60 38L31.5 64.5C29.5 66.5 26 67 24 65L21 62C18.5 59 19 54.5 22 52L60 20Z"
          fill="url(#mascotRoofGrad)"
          stroke="#52127A"
          strokeWidth="1.75"
        />
        {/* House Walls */}
        <rect x="28" y="52" width="64" height="46" rx="14" fill="#FFFFFF" stroke="#52127A" strokeWidth="2" />
        <rect x="28" y="52" width="64" height="46" rx="14" fill="url(#mascotWallGrad)" opacity="0.25" />

        {/* Attic Round Window */}
        <circle cx="60" cy="42" r="5" fill="#FFE885" stroke="#52127A" strokeWidth="1.5" />

        {/* Cute Mascot Face */}
        {/* Left Eye: Open & Happy with white twinkle */}
        <circle cx="48" cy="68" r="4.5" fill="#24152F" />
        <circle cx="46.5" cy="66.5" r="1.5" fill="#FFFFFF" />
        
        {/* Right Eye: Cute Wink Arc */}
        <path d="M70 68C72 65 77 65 79 68" stroke="#24152F" strokeWidth="2.5" strokeLinecap="round" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="43" cy="74" rx="4" ry="2.5" fill="#FFB4D6" opacity="0.8" />
        <ellipse cx="77" cy="74" rx="4" ry="2.5" fill="#FFB4D6" opacity="0.8" />

        {/* Sweet Smile */}
        <path d="M57 73C58.5 76 61.5 76 63 73" stroke="#24152F" strokeWidth="2" strokeLinecap="round" />

        {/* Heart Hugging Hands (Cute Purple Arms) */}
        {/* Left Arm */}
        <path d="M35 77C38 82 46 88 52 86" stroke="#7027C9" strokeWidth="4.5" strokeLinecap="round" />
        {/* Right Arm */}
        <path d="M85 77C82 82 74 88 68 86" stroke="#7027C9" strokeWidth="4.5" strokeLinecap="round" />

        {/* Glowing Warm Yellow Heart held in hands */}
        <path
          d="M60 93L53.5 86.5C49.5 82.5 49.5 76 54 73C57 71 60 74 60 74C60 74 63 71 66 73C70.5 76 70.5 82.5 66.5 86.5L60 93Z"
          fill="url(#mascotHeartGrad)"
          stroke="#7027C9"
          strokeWidth="1.5"
        />

        {/* Little Yellow Sparkle Dots */}
        <path d="M14 42L15.5 45L18.5 46.5L15.5 48L14 51L12.5 48L9.5 46.5L12.5 45L14 42Z" fill="#FFD83D" />
        <path d="M98 28L99 30L101 31L99 32L98 34L97 32L95 31L97 30L98 28Z" fill="#FFD83D" />

        <defs>
          <linearGradient id="mascotRoofGrad" x1="20" y1="20" x2="100" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8E38F5" />
            <stop offset="1" stopColor="#6A1B9A" />
          </linearGradient>
          <linearGradient id="mascotWallGrad" x1="28" y1="52" x2="92" y2="98" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5ECFF" />
            <stop offset="1" stopColor="#D4BAF9" />
          </linearGradient>
          <linearGradient id="mascotHeartGrad" x1="50" y1="72" x2="70" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE34D" />
            <stop offset="1" stopColor="#FFC107" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    {/* Text: Happy Home Journey ♡ */}
    <div className="flex flex-col -space-y-0.5">
      <span className="text-sm font-black text-[#7027C9] italic font-heading tracking-tight">
        Happy Home
      </span>
      <div className="flex items-center gap-1">
        <span className="text-sm font-black text-[#24152F] italic font-heading tracking-tight">
          Journey
        </span>
        <span className="text-xs font-bold text-[#7027C9]">♡</span>
      </div>
    </div>
  </div>
);

// Decorative subtle house and botanical elements for the bottom of the left Customer Profile card
const ProfileCardHouseIllustration: React.FC = () => (
  <div className="relative w-full h-24 overflow-hidden select-none pointer-events-none flex items-end justify-center">
    <svg viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Soft lavender botanical leaf branches on left & right */}
      <path d="M20 95C25 78 35 68 46 62C42 72 40 85 36 95Z" fill="#D4BAF9" opacity="0.6" />
      <path d="M12 88C15 76 22 68 30 64C28 72 26 80 23 88Z" fill="#EADDFB" opacity="0.8" />
      <path d="M220 95C215 78 205 68 194 62C198 72 200 85 204 95Z" fill="#D4BAF9" opacity="0.6" />
      <path d="M228 88C225 76 218 68 210 64C212 72 214 80 217 88Z" fill="#EADDFB" opacity="0.8" />

      {/* Ground hill arc */}
      <ellipse cx="120" cy="115" rx="110" ry="25" fill="#EFE5FD" />

      {/* House Silhouette */}
      {/* Chimney */}
      <rect x="135" y="42" width="10" height="18" rx="2" fill="#D4BAF9" />
      
      {/* Roof */}
      <path d="M120 32L156 60H84L120 32Z" fill="#C5A4F4" />
      <path d="M120 30L158 59C159 60 158 61 156 61H84C82 61 81 60 82 59L120 30Z" stroke="#B187EE" strokeWidth="2" strokeLinejoin="round" />

      {/* House Body */}
      <rect x="94" y="60" width="52" height="38" rx="4" fill="#FFFFFF" opacity="0.85" />
      
      {/* Window */}
      <rect x="112" y="68" width="16" height="16" rx="3" fill="#D4BAF9" opacity="0.7" />
      <line x1="120" y1="68" x2="120" y2="84" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="112" y1="76" x2="128" y2="76" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Subtle little floating heart above roof */}
      <path d="M120 22C118.5 20 115 20 114 22C113 24 115 26.5 120 29C125 26.5 127 24 126 22C125 20 121.5 20 120 22Z" fill="#D4BAF9" opacity="0.8" />
    </svg>
  </div>
);

type ProfileTab = 'profile' | 'bookings' | 'addresses';
type BookingFilterTab = 'upcoming' | 'completed' | 'cancelled';

export const HaatzaNestProfilePage: React.FC = () => {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    updateProfile, 
    addresses, 
    isAddressesLoading,
    addressesError,
    refetchAddresses,
    addAddress, 
    updateAddress, 
    deleteAddress, 
    setDefaultAddress 
  } = useHaatzaNestUser();

  const { bookings, cancelBooking } = useHaatzaNestBooking();
  const location = useLocation();
  const navigate = useNavigate();

  // Active Main Tab: ONLY 'profile' | 'bookings' | 'addresses'
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');

  // Bookings sub-tab: 'upcoming' | 'completed' | 'cancelled'
  const [bookingFilter, setBookingFilter] = useState<BookingFilterTab>('upcoming');

  // Selected booking for Details View / Modal
  const [selectedBooking, setSelectedBooking] = useState<HaatzaNestServiceBooking | null>(null);
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<NestAddress | null>(null);
  const [addressDeleteConfirmId, setAddressDeleteConfirmId] = useState<string | null>(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);

  // Address Form State
  const [addressForm, setAddressForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    altPhone: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    addressType: 'home' as 'home' | 'work' | 'other',
    isDefault: false,
  });

  // Sync tab from URL query params or hash
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'bookings' || tabParam === 'addresses' || tabParam === 'profile') {
      setActiveTab(tabParam as ProfileTab);
    } else if (location.hash === '#addresses') {
      setActiveTab('addresses');
    } else if (location.hash === '#bookings') {
      setActiveTab('bookings');
    }
  }, [location.search, location.hash]);

  // Keep profile form synced with user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // Tab switch handler with URL update
  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab);
    navigate(`/nest/profile?tab=${tab}`, { replace: true });
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F7F1FF]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5D7F7] p-8 text-center space-y-5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#F5ECFF] text-[#7027C9] flex items-center justify-center mx-auto shadow-2xs">
            <UserIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#24152F] font-heading">
              Sign in to view your Nest Profile
            </h2>
            <p className="text-xs text-[#7D6F8D] mt-1.5 leading-relaxed">
              Access your personal profile, service bookings, and saved addresses.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#7027C9] to-[#9138F5] hover:from-[#5A1EAA] hover:to-[#7B2CBF] text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-all active:scale-95"
          >
            <span>Sign In to HAATZA</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Booking filtering
  const upcomingBookings = bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending' || b.status === 'in_progress'
  );
  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  const filteredBookings = 
    bookingFilter === 'upcoming' 
      ? upcomingBookings 
      : bookingFilter === 'completed' 
        ? completedBookings 
        : cancelledBookings;

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrorMsg(null);

    if (!profileForm.name.trim()) {
      setProfileErrorMsg('Full Name is required.');
      return;
    }
    if (!profileForm.email.trim() || !profileForm.email.includes('@')) {
      setProfileErrorMsg('Please provide a valid email address.');
      return;
    }

    updateProfile({
      name: profileForm.name.trim(),
      phone: profileForm.phone.trim(),
      email: profileForm.email.trim(),
    });

    setIsEditingProfile(false);
    setProfileSuccessMsg('Profile updated successfully.');
    setTimeout(() => setProfileSuccessMsg(null), 3000);
  };

  // Address Modal Open
  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      fullName: user.name,
      phone: user.phone || '',
      altPhone: '',
      pincode: '560001',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: 'Bengaluru',
      state: 'Karnataka',
      addressType: 'home',
      isDefault: addresses.length === 0,
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr: NestAddress) => {
    setEditingAddress(addr);
    setAddressForm({
      fullName: addr.fullName,
      phone: addr.phone,
      altPhone: addr.altPhone || '',
      pincode: String(addr.pincode || ''),
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || '',
      landmark: addr.landmark || '',
      city: addr.city,
      state: addr.state,
      addressType: (addr.addressType?.toLowerCase() === 'work' ? 'work' : addr.addressType?.toLowerCase() === 'other' ? 'other' : 'home'),
      isDefault: addr.isDefault,
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName.trim() || !addressForm.addressLine1.trim() || !addressForm.pincode.trim()) {
      return;
    }

    if (editingAddress) {
      updateAddress({
        ...addressForm,
        id: editingAddress.id,
      });
    } else {
      addAddress(addressForm);
    }
    setIsAddressModalOpen(false);
  };

  // Booking Cancellation
  const handleConfirmCancelBooking = async (bookingId: string) => {
    setCancellingBookingId(bookingId);
    try {
      await cancelBooking(bookingId);
      setCancelSuccessMsg('Booking cancelled successfully.');
      setTimeout(() => setCancelSuccessMsg(null), 4000);
      if (selectedBooking && selectedBooking.id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: 'cancelled' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingBookingId(null);
    }
  };

  const getStatusBadge = (status: HaatzaNestServiceBooking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7027C9] bg-purple-50 border border-purple-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#7027C9] animate-pulse" /> In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-900 bg-[#F5ECFF] border border-[#E5D7F7] px-2.5 py-0.5 rounded-full shadow-2xs">
            <Check className="w-3 h-3 text-[#7027C9]" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
            <X className="w-3 h-3 text-rose-600" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full capitalize shadow-2xs">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-[#F7F1FF] min-h-screen py-6 sm:py-8 pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#7D6F8D]">
          <Link to="/" className="hover:text-[#7027C9] transition-colors">HAATZA</Link>
          <span>/</span>
          <Link to="/nest" className="hover:text-[#7027C9] transition-colors">HAATZA Nest</Link>
          <span>/</span>
          <span className="text-[#7027C9] font-bold">Profile</span>
        </nav>

        {/* User Summary Header Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FAF6FF] rounded-3xl border border-[#E8DEF8] p-5 sm:p-7 shadow-[0_4px_24px_rgba(112,39,201,0.05)] transition-all duration-300">
          {/* Subtle Ambient Decorative Glow Accent */}
          <div className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-[#FFD83D]/15 via-[#9138F5]/10 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left w-full sm:w-auto">
              {/* Circular Avatar with gradient & gold sparkle accent */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#7027C9] via-[#8532E3] to-[#9D4EDD] text-white font-black text-2xl sm:text-3xl flex items-center justify-center border-4 border-white shadow-md shadow-purple-900/15 font-heading ring-4 ring-[#F3EBFF]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFD83D] text-[#351064] flex items-center justify-center border-2 border-white shadow-2xs" title="Verified Nest Member">
                  <Sparkles className="w-3 h-3 fill-[#351064]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#24152F] font-heading tracking-tight">
                    {user.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7027C9] bg-gradient-to-r from-[#FAF5FF] to-[#F5ECFF] px-2.5 py-0.5 rounded-full border border-[#D8C7F0] shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7027C9]" />
                    <span>Verified Member</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-[#7D6F8D] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#7027C9]/80" />
                    <span>{user.email}</span>
                  </span>
                  {user.phone && (
                    <>
                      <span className="text-[#D8C7F0] hidden sm:inline">|</span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#7027C9]/80" />
                        <span>{user.phone}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Mascot: Cute purple house mascot holding heart with "Happy Home Journey ♡" */}
            <HappyHomeMascot />

            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/nest');
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#E5D7F7] bg-white hover:border-[#7027C9] hover:bg-[#F5ECFF]/70 text-xs font-bold text-[#24152F] hover:text-[#7027C9] transition-all duration-200 shadow-2xs active:scale-95 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main 3 Tabs Navigation Bar */}
        <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8DEF8] shadow-2xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {/* Tab 1: My Profile */}
          <button
            type="button"
            onClick={() => handleTabChange('profile')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98] ${
              activeTab === 'profile'
                ? 'text-[#7027C9] bg-[#F5ECFF] border border-[#E5D7F7] shadow-2xs font-heading'
                : 'text-[#625D6E] hover:text-[#24152F] hover:bg-[#F7F1FF]'
            }`}
          >
            <UserIcon className="w-4 h-4 text-[#7027C9]" />
            <span>My Profile</span>
          </button>

          {/* Tab 2: My Bookings */}
          <button
            type="button"
            onClick={() => handleTabChange('bookings')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98] ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-[#7027C9] to-[#8E38F5] text-white shadow-xs font-heading'
                : 'text-[#625D6E] hover:text-[#24152F] hover:bg-[#F7F1FF]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Bookings</span>
            {upcomingBookings.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight ${
                activeTab === 'bookings' 
                  ? 'bg-white/20 text-white border border-white/25' 
                  : 'bg-[#F5ECFF] text-[#7027C9] border border-[#E5D7F7]'
              }`}>
                {upcomingBookings.length}
              </span>
            )}
          </button>

          {/* Tab 3: Saved Addresses */}
          <button
            type="button"
            onClick={() => handleTabChange('addresses')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98] ${
              activeTab === 'addresses'
                ? 'bg-gradient-to-r from-[#7027C9] to-[#8E38F5] text-white shadow-xs font-heading'
                : 'text-[#625D6E] hover:text-[#24152F] hover:bg-[#F7F1FF]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-tight ${
              activeTab === 'addresses' 
                ? 'bg-white/20 text-white border border-white/25' 
                : 'bg-[#F5ECFF] text-[#7027C9] border border-[#E5D7F7]'
            }`}>
              {addresses.length}
            </span>
          </button>
        </div>

        {/* Alert Messages */}
        {profileSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{profileSuccessMsg}</span>
          </div>
        )}
        {cancelSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{cancelSuccessMsg}</span>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT 1: MY PROFILE
            ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-[#E8DEF8] p-5 sm:p-7 shadow-[0_2px_16px_rgba(112,39,201,0.03)] animate-in fade-in duration-200">
            {profileErrorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{profileErrorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Customer Profile Card */}
              <div className="lg:col-span-4 rounded-[24px] border border-[#E8DEF8] bg-gradient-to-b from-white via-[#FAF7FF] to-[#F3EAFF] p-6 flex flex-col items-center text-center justify-between min-h-[380px] shadow-2xs relative overflow-hidden">
                {/* Avatar with Circular Gradient & Gold Sparkle */}
                <div className="flex flex-col items-center w-full">
                  <div className="relative mt-2 mb-3.5 shrink-0">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#7027C9] via-[#8532E3] to-[#9D4EDD] text-white font-black text-3xl sm:text-4xl flex items-center justify-center border-4 border-white shadow-md shadow-purple-900/15 font-heading ring-4 ring-[#F3EBFF]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FFD83D] text-[#351064] flex items-center justify-center border-2 border-white shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 fill-[#351064]" />
                    </div>
                  </div>

                  {/* Customer Name */}
                  <h3 className="text-lg sm:text-xl font-black text-[#24152F] font-heading tracking-tight mb-2">
                    {user.name}
                  </h3>

                  {/* Verified Member Badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7027C9] bg-[#F5ECFF] border border-[#E5D7F7] px-3.5 py-1 rounded-full shadow-2xs mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7027C9]" />
                    <span>Verified Member</span>
                  </span>

                  {/* Subtitle & Heart Divider */}
                  <p className="text-xs font-semibold text-[#7D6F8D] mb-1.5">
                    Better Homes • Happier Lives
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[#7027C9]/40 mb-2">
                    <span className="h-px w-6 bg-[#E5D7F7]" />
                    <span className="text-xs font-bold text-[#7027C9]">♡</span>
                    <span className="h-px w-6 bg-[#E5D7F7]" />
                  </div>
                </div>

                {/* Bottom Decorative House Elements */}
                <div className="w-full mt-auto pt-2">
                  <ProfileCardHouseIllustration />
                </div>
              </div>

              {/* Right Column: Personal Details & Care Passport */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
                <div>
                  {/* Section Header: Personal Details + Edit Profile CTA */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#F0E6FC]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F5ECFF] text-[#7027C9] flex items-center justify-center border border-[#E8DEF8] shrink-0">
                        <UserIcon className="w-5 h-5 text-[#7027C9]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-[#24152F] font-heading">
                          Personal Details
                        </h3>
                        <p className="text-xs text-[#7D6F8D]">
                          Your verified personal information
                        </p>
                      </div>
                    </div>

                    {!isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E5D7F7] bg-white hover:border-[#7027C9] hover:bg-[#F5ECFF]/70 text-xs font-bold text-[#7027C9] transition-all cursor-pointer shadow-2xs active:scale-95"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  {!isEditingProfile ? (
                    <div className="space-y-4">
                      {/* 3 Information Cards: Full Name, Mobile Number, Email Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {/* Card 1: Full Name */}
                        <div className="p-4 sm:p-5 rounded-2xl border border-[#E8DEF8] bg-white hover:border-[#7027C9]/40 hover:shadow-xs transition-all duration-200 space-y-2">
                          <div className="w-8 h-8 rounded-full bg-[#F5ECFF] text-[#7027C9] flex items-center justify-center">
                            <UserIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-medium text-[#7D6F8D]">
                              Full Name
                            </span>
                            <p className="text-sm sm:text-base font-bold text-[#24152F] font-heading truncate mt-0.5">
                              {user.name}
                            </p>
                          </div>
                        </div>

                        {/* Card 2: Mobile Number */}
                        <div className="p-4 sm:p-5 rounded-2xl border border-[#E8DEF8] bg-white hover:border-[#7027C9]/40 hover:shadow-xs transition-all duration-200 space-y-2">
                          <div className="w-8 h-8 rounded-full bg-[#F5ECFF] text-[#7027C9] flex items-center justify-center">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-medium text-[#7D6F8D]">
                              Mobile Number
                            </span>
                            <p className="text-sm sm:text-base font-bold text-[#24152F] font-heading truncate mt-0.5">
                              {user.phone || 'Not provided'}
                            </p>
                          </div>
                        </div>

                        {/* Card 3: Email Address */}
                        <div className="p-4 sm:p-5 rounded-2xl border border-[#E8DEF8] bg-white hover:border-[#7027C9]/40 hover:shadow-xs transition-all duration-200 space-y-2">
                          <div className="w-8 h-8 rounded-full bg-[#F5ECFF] text-[#7027C9] flex items-center justify-center">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-xs font-medium text-[#7D6F8D]">
                              Email Address
                            </span>
                            <p className="text-sm sm:text-base font-bold text-[#24152F] font-heading truncate mt-0.5">
                              {user.email || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* HAATZA Nest Care Passport Card */}
                      <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl border border-[#E8DEF8] bg-gradient-to-r from-[#FAF6FF] via-[#F4EBFF]/60 to-[#FAF8FD] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs hover:shadow-[0_4px_20px_rgba(112,39,201,0.06)] hover:border-[#7027C9]/35 hover:-translate-y-0.5 transition-all duration-300 group">
                        {/* Subtle decorative ambient lavender glow in corner */}
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#7027C9]/5 rounded-full blur-xl pointer-events-none" />

                        <div className="flex items-start gap-3.5 relative z-10">
                          {/* Clean Shield-and-Home Icon */}
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#7027C9] to-[#9138F5] text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-600/20 group-hover:scale-105 transition-transform duration-200">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 2.2L4 5.6V11.5C4 16.3 7.4 20.8 12 22C16.6 20.8 20 16.3 20 11.5V5.6L12 2.2Z"
                                fill="currentColor"
                                fillOpacity="0.12"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.5 12.3L12 9.5L15.5 12.3"
                                stroke="#FFD83D"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9.5 12V16H14.5V12"
                                stroke="#FFFFFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11 16V13.8H13V16"
                                stroke="#FFD83D"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-xs sm:text-sm font-black text-[#24152F] font-heading tracking-tight">
                              Your Trusted Home Care Partner
                            </h4>
                            <p className="text-[11px] text-[#7D6F8D] leading-relaxed max-w-md">
                              Reliable home care services designed around your comfort, convenience, and peace of mind.
                            </p>
                            <div className="pt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-[#7027C9]">
                              <span>Trusted Professionals</span>
                              <span className="text-[#D8C7F0]">•</span>
                              <span>Easy Booking</span>
                              <span className="text-[#D8C7F0]">•</span>
                              <span>Care You Can Count On</span>
                            </div>
                          </div>
                        </div>

                        {/* Right side: Your Home, Our Care ♡ + Decorative Shield with Sparkles */}
                        <div className="hidden sm:flex items-center gap-4 shrink-0 pl-4 border-t md:border-t-0 md:border-l border-[#E8DEF8]/80 relative z-10 self-stretch justify-end">
                          <div className="text-right">
                            <span className="block text-xs sm:text-sm font-bold text-[#7027C9] italic font-heading">
                              Your Home,
                            </span>
                            <span className="block text-xs sm:text-sm font-bold text-[#7027C9] italic font-heading">
                              Our Care ♡
                            </span>
                          </div>

                          {/* Decorative Shield Emblem with sparkles */}
                          <div className="relative w-11 h-11 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7027C9] via-[#8532E3] to-[#9D4EDD] flex items-center justify-center shadow-xs text-white">
                              <CheckCircle2 className="w-5 h-5 text-[#FFD83D]" />
                            </div>
                            <Sparkles className="w-3.5 h-3.5 text-[#FFD83D] fill-[#FFD83D] absolute -top-1 -right-1 animate-pulse" />
                            <Sparkles className="w-2.5 h-2.5 text-[#9138F5] fill-[#9138F5] absolute -bottom-0.5 -left-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Edit Profile Form (Editable fields supported by existing user API: name, phone, email) */
                    <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                      <div>
                        <label className="block text-xs font-bold text-[#24152F] mb-1">
                          Customer Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                          placeholder="Enter full name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#24152F] mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                          placeholder="e.g. +91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#24152F] mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7027C9] to-[#9138F5] hover:from-[#5A1EAA] hover:to-[#7B2CBF] text-white text-xs font-bold shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingProfile(false);
                            setProfileForm({
                              name: user.name || '',
                              phone: user.phone || '',
                              email: user.email || '',
                            });
                          }}
                          className="px-4 py-2.5 rounded-xl border border-[#E5D7F7] text-xs font-bold text-[#7D6F8D] hover:bg-zinc-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT 2: MY BOOKINGS
            ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Sub-tabs: Upcoming | Completed | Cancelled */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-[#E8DEF8] w-fit shadow-2xs">
              <button
                type="button"
                onClick={() => setBookingFilter('upcoming')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  bookingFilter === 'upcoming'
                    ? 'bg-gradient-to-r from-[#7027C9] to-[#9138F5] text-white shadow-xs'
                    : 'text-[#7D6F8D] hover:text-[#24152F] hover:bg-[#F5ECFF]'
                }`}
              >
                <span>Upcoming</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  bookingFilter === 'upcoming' ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#7027C9]'
                }`}>
                  {upcomingBookings.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setBookingFilter('completed')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  bookingFilter === 'completed'
                    ? 'bg-gradient-to-r from-[#7027C9] to-[#9138F5] text-white shadow-xs'
                    : 'text-[#7D6F8D] hover:text-[#24152F] hover:bg-[#F5ECFF]'
                }`}
              >
                <span>Completed</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  bookingFilter === 'completed' ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#7027C9]'
                }`}>
                  {completedBookings.length}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setBookingFilter('cancelled')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  bookingFilter === 'cancelled'
                    ? 'bg-gradient-to-r from-[#7027C9] to-[#9138F5] text-white shadow-xs'
                    : 'text-[#7D6F8D] hover:text-[#24152F] hover:bg-[#F5ECFF]'
                }`}
              >
                <span>Cancelled</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  bookingFilter === 'cancelled' ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#7027C9]'
                }`}>
                  {cancelledBookings.length}
                </span>
              </button>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E5D7F7] p-8 sm:p-12 text-center space-y-3.5 shadow-[0_2px_16px_rgba(112,39,201,0.03)] animate-in fade-in duration-300">
                <FriendlyCalendarIllustration />
                <h3 className="text-base sm:text-lg font-bold text-[#24152F] font-heading">
                  {bookingFilter === 'upcoming' 
                    ? 'No upcoming service bookings' 
                    : bookingFilter === 'completed' 
                      ? 'No completed bookings yet' 
                      : 'No cancelled bookings'}
                </h3>
                <p className="text-xs sm:text-sm text-[#7D6F8D] max-w-md mx-auto leading-relaxed">
                  {bookingFilter === 'upcoming'
                    ? 'Schedule certified home cleaning, dishwashing, or deep descaling specialists whenever you need.'
                    : bookingFilter === 'completed'
                      ? 'Your completed service visits and invoices will be neatly organized right here.'
                      : 'Cancelled bookings will appear here for your records.'}
                </p>
                {bookingFilter === 'upcoming' && (
                  <div className="pt-2">
                    <Link
                      to="/nest/services"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7027C9] to-[#9138F5] hover:from-[#5A1EAA] hover:to-[#7B2CBF] text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/20 active:scale-95 transition-all"
                    >
                      <span>Browse Home Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-[#E5D7F7] hover:border-[#7027C9]/60 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs hover:shadow-md hover:shadow-purple-600/5 transition-all cursor-pointer group hover:-translate-y-0.5 duration-200"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={getBookingImage(b.serviceImage)}
                        alt={b.serviceName}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-[#E5D7F7] shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-black uppercase text-[#7027C9] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                            #{b.bookingNumber}
                          </span>
                          {getStatusBadge(b.status)}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#24152F] font-heading group-hover:text-[#7027C9] transition-colors">
                          {b.serviceName}
                        </h4>
                        {b.packageName && (
                          <p className="text-xs text-[#7D6F8D]">Package: {b.packageName}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7D6F8D] pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#7027C9]" /> {b.scheduledDate} • {b.scheduledTimeSlot}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#7D6F8D]" /> {b.customerAddress}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Total Amount & Action CTA */}
                    <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3.5 md:pt-0 border-t md:border-t-0 border-[#F0E6FC] md:pl-6 md:border-l md:border-[#F0E6FC] shrink-0 gap-2">
                      <div className="flex flex-col items-start md:items-end">
                        <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#7D6F8D]">
                          Total Fare
                        </span>
                        <div className="flex items-baseline gap-0.5 mt-0.5">
                          <span className="text-xs sm:text-sm font-bold text-[#7027C9]">₹</span>
                          <span className="text-lg sm:text-2xl font-black text-[#24152F] font-heading tracking-tight">
                            {typeof b.price === 'number'
                              ? b.price.toLocaleString('en-IN')
                              : String(b.price || '0').replace(/^₹/, '')}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#7D6F8D] font-medium hidden sm:inline-block">
                          Pay upon completion
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBooking(b);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#F5ECFF] group-hover:bg-[#7027C9] text-[#7027C9] group-hover:text-white text-xs font-bold transition-all duration-200 shadow-2xs group-hover:shadow-xs active:scale-95 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB CONTENT 3: SAVED ADDRESSES
            ========================================================================= */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl border border-[#E5D7F7] p-6 sm:p-8 shadow-[0_2px_16px_rgba(112,39,201,0.03)] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F0E6FC]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-[#24152F] font-heading">
                    Saved Service Addresses
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#7027C9] border border-purple-200">
                    {addresses.length} {addresses.length === 1 ? 'Address' : 'Addresses'}
                  </span>
                </div>
                <p className="text-xs text-[#7D6F8D] mt-0.5">
                  Manage your home, apartment, and office locations for instant service dispatch.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddAddress}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7027C9] to-[#9138F5] hover:from-[#5A1EAA] hover:to-[#7B2CBF] text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Address</span>
              </button>
            </div>

            {/* Address Delete Confirmation Banner */}
            {addressDeleteConfirmId && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 flex items-center justify-between gap-2">
                <span>Are you sure you want to delete this address?</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      deleteAddress(addressDeleteConfirmId);
                      setAddressDeleteConfirmId(null);
                    }}
                    className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold cursor-pointer hover:bg-rose-700 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddressDeleteConfirmId(null)}
                    className="px-3 py-1 rounded-lg border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {isAddressesLoading ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-8 h-8 border-3 border-[#7027C9] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#7D6F8D]">Loading your saved service addresses...</p>
              </div>
            ) : addressesError ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{addressesError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => refetchAddresses()}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold cursor-pointer hover:bg-rose-700 transition-colors shrink-0"
                >
                  Retry
                </button>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-10 sm:py-14 space-y-4 animate-in fade-in duration-300">
                <FriendlyHouseIllustration />
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#24152F] font-heading">
                    No saved addresses yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7D6F8D] max-w-sm mx-auto leading-relaxed">
                    Add your home, apartment, or workspace address to schedule verified HAATZA Nest experts with 1 tap.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddAddress}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7027C9] via-[#8530E0] to-[#9138F5] hover:from-[#5E1EA8] hover:to-[#7B2CBF] text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/25 active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Your First Address</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => {
                  const labelIcon = 
                    addr.addressType === 'work' 
                      ? <Briefcase className="w-3.5 h-3.5" />
                      : addr.addressType === 'other'
                        ? <Tag className="w-3.5 h-3.5" />
                        : <Home className="w-3.5 h-3.5" />;

                  return (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl sm:rounded-3xl border-2 transition-all bg-white relative flex flex-col justify-between group ${
                        addr.isDefault 
                          ? 'border-[#7027C9] shadow-sm bg-gradient-to-b from-[#FAF8FD] to-white ring-1 ring-[#7027C9]/20' 
                          : 'border-[#E5D7F7] hover:border-[#7027C9]/40 hover:shadow-2xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#24152F]">{addr.fullName}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-[#7027C9] border border-purple-200 flex items-center gap-1">
                              {labelIcon}
                              <span className="capitalize">{addr.addressType}</span>
                            </span>
                          </div>
                          {addr.isDefault && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7027C9] bg-gradient-to-r from-[#F5ECFF] to-[#FAF8FD] border border-[#E5D7F7] px-2.5 py-0.5 rounded-full shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#7027C9]" /> Default
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#625D6E] leading-relaxed mt-1">
                          {addr.addressLine1}
                          {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
                          {addr.landmark ? `, Near ${addr.landmark}` : ''}
                          <br />
                          {addr.city}, {addr.state} - <strong className="text-[#24152F]">{addr.pincode}</strong>
                          {addr.nestAreaName ? (
                            <span className="block text-[11px] text-[#7027C9] font-bold mt-0.5">
                              Area: {addr.nestAreaName}
                            </span>
                          ) : null}
                        </p>

                        <p className="text-xs text-[#7D6F8D] font-medium mt-3 flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#7027C9]" />
                          <span>{addr.phone} {addr.altPhone ? `(Alt: ${addr.altPhone})` : ''}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F0E6FC] text-xs">
                        {!addr.isDefault ? (
                          <button
                            type="button"
                            onClick={() => setDefaultAddress(addr.id)}
                            className="font-bold text-[#7027C9] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Set as Default</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#7027C9] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#7027C9]" />
                            <span>Primary Address</span>
                          </span>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditAddress(addr)}
                            className="px-2.5 py-1.5 text-[#7D6F8D] hover:text-[#7027C9] hover:bg-[#F5ECFF] rounded-lg transition-colors flex items-center gap-1 cursor-pointer font-medium"
                            title="Edit Address"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span className="text-xs">Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setAddressDeleteConfirmId(addr.id)}
                            className="px-2.5 py-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer font-medium"
                            title="Delete Address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="text-xs">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* =========================================================================
          MODAL 1: BOOKING DETAILS VIEW (Opens on booking selection)
          ========================================================================= */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E5D7F7] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E6FC]">
              <div>
                <span className="text-[11px] font-black uppercase text-[#7027C9] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  #{selectedBooking.bookingNumber}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#24152F] font-heading mt-1">
                  Booking Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 rounded-full bg-[#FAF8FD] hover:bg-[#F5ECFF] text-[#7D6F8D] hover:text-[#7027C9] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Service Snapshot */}
            <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#FAF8FD] border border-[#E5D7F7]">
              <img
                src={getBookingImage(selectedBooking.serviceImage)}
                alt={selectedBooking.serviceName}
                className="w-16 h-16 rounded-xl object-cover border border-[#E5D7F7] shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedBooking.status)}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#24152F] font-heading">
                  {selectedBooking.serviceName}
                </h4>
                {selectedBooking.packageName && (
                  <p className="text-xs text-[#7D6F8D]">
                    Package: <strong className="text-[#24152F]">{selectedBooking.packageName}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Schedule & Address Information */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl border border-[#E5D7F7] space-y-1">
                <span className="font-bold text-[#7D6F8D] flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#7027C9]" /> Scheduled Date & Time
                </span>
                <p className="font-bold text-sm text-[#24152F]">
                  {selectedBooking.scheduledDate} ({selectedBooking.scheduledTimeSlot})
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-[#E5D7F7] space-y-1">
                <span className="font-bold text-[#7D6F8D] flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-[#7027C9]" /> Service Address
                </span>
                <p className="text-[#24152F] font-medium leading-relaxed">
                  {selectedBooking.customerAddress}
                </p>
                <p className="text-[11px] text-[#7D6F8D]">
                  Contact: {selectedBooking.customerName} ({selectedBooking.customerPhone})
                </p>
              </div>

              {selectedBooking.professionalName && (
                <div className="p-3.5 rounded-2xl border border-[#E5D7F7] space-y-1">
                  <span className="font-bold text-[#7D6F8D] uppercase text-[10px] tracking-wider">
                    Assigned Specialist
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#24152F]">{selectedBooking.professionalName}</p>
                    {selectedBooking.professionalRating && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        ★ {selectedBooking.professionalRating}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Price summary */}
              <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-[#24152F]">Total Amount</span>
                  <p className="text-[11px] text-[#7D6F8D]">Pay upon completion</p>
                </div>
                <span className="text-lg font-black text-[#7027C9]">
                  ₹{selectedBooking.price}
                </span>
              </div>
            </div>

            {/* Cancellation Option (Shown ONLY for confirmed or pending bookings) */}
            <div className="pt-2 border-t border-[#F0E6FC] flex items-center justify-between gap-3">
              {(selectedBooking.status === 'confirmed' || selectedBooking.status === 'pending') ? (
                <button
                  type="button"
                  disabled={cancellingBookingId === selectedBooking.id}
                  onClick={() => handleConfirmCancelBooking(selectedBooking.id)}
                  className="px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {cancellingBookingId === selectedBooking.id ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 rounded-xl bg-[#7027C9] text-white text-xs font-bold hover:bg-[#5A1EAA] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: ADD / EDIT ADDRESS MODAL
          ========================================================================= */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E5D7F7] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E6FC]">
              <h3 className="text-base sm:text-lg font-black text-[#24152F] font-heading">
                {editingAddress ? 'Edit Service Address' : 'Add New Service Address'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8FD] hover:bg-[#F5ECFF] text-[#7D6F8D] hover:text-[#7027C9] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3.5">
              {/* Address Label / Type Selector */}
              <div>
                <label className="block text-xs font-bold text-[#24152F] mb-1">
                  Address Label <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {(['home', 'work', 'other'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAddressForm({ ...addressForm, addressType: type })}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        addressForm.addressType === type
                          ? 'bg-[#7027C9] border-[#7027C9] text-white shadow-2xs'
                          : 'bg-white border-[#E5D7F7] text-[#7D6F8D] hover:bg-[#F5ECFF]'
                      }`}
                    >
                      {type === 'home' && <Home className="w-3.5 h-3.5" />}
                      {type === 'work' && <Briefcase className="w-3.5 h-3.5" />}
                      {type === 'other' && <Tag className="w-3.5 h-3.5" />}
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#24152F] mb-1">
                    Contact Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#24152F] mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24152F] mb-1">
                  House / Flat / Block / Floor <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.addressLine1}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                  placeholder="e.g. Flat 402, Block B, Prestige Lavender Apartments"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24152F] mb-1">
                  Full Address / Street / Society
                </label>
                <input
                  type="text"
                  value={addressForm.addressLine2}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                  placeholder="e.g. Indiranagar 100ft Road"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#24152F] mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    value={addressForm.landmark}
                    onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                    placeholder="Near Metro Pillar"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#24152F] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#24152F] mb-1">
                    Pincode <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5D7F7] focus:border-[#7027C9] focus:ring-2 focus:ring-[#7027C9]/15 text-xs text-[#24152F] outline-none"
                    placeholder="e.g. 560001"
                  />
                </div>
              </div>

              {/* Default Address Option */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer select-none text-xs text-[#24152F] font-semibold">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="rounded text-[#7027C9] focus:ring-[#7027C9]"
                />
                <span>Set as default address for service booking</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0E6FC]">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5D7F7] text-xs font-bold text-[#7D6F8D] hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#7027C9] to-[#9138F5] hover:from-[#5A1EAA] hover:to-[#7B2CBF] text-white text-xs font-bold shadow-md shadow-purple-600/20 cursor-pointer active:scale-95"
                >
                  {editingAddress ? 'Save Changes' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default HaatzaNestProfilePage;
