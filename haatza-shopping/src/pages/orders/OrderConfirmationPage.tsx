import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { formatINR } from '../../utils/formatters';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import {
  Package, MapPin, Truck, ArrowRight,
  Sparkles, ShoppingBag, Copy, Check,
  ShieldCheck, AlertCircle
} from 'lucide-react';

// Confetti particle configuration
interface Particle {
  id: number;
  x: number; // percentage
  delay: number; // seconds
  size: number;
  color: string;
  duration: number;
}

const CONFETTI_COLORS = [
  '#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444', '#E8B8B8', '#A60000'
];

function generateConfetti(): Particle[] {
  return Array.from({ length: 36 }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 96) + 2,
    delay: Math.random() * 2.5,
    size: Math.floor(Math.random() * 6) + 5,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    duration: Math.random() * 2 + 2.5,
  }));
}

// Destination Shopping Route Resolver (Determines destination path without displaying category labels)
function getShoppingDestinationRoute(order: Order | null, returnUrl?: string): string {
  // If an explicit shopping return URL was supplied in navigation state, return to it
  if (returnUrl && typeof returnUrl === 'string') {
    return returnUrl;
  }

  // Check session storage for shopping context
  try {
    const lastShopping = sessionStorage.getItem('haatza_last_shopping_route');
    if (lastShopping && lastShopping !== '/checkout' && !lastShopping.startsWith('/order-confirmation')) {
      return lastShopping;
    }
  } catch (e) {
    // Ignore storage errors
  }

  if (!order || !order.items || order.items.length === 0) {
    return '/';
  }

  const primaryItem = order.items[0];
  const prod = primaryItem.product;
  if (!prod) return '/';

  const catId = (prod.categoryId || '').toLowerCase();
  const catName = (prod.categoryName || '').toLowerCase();
  const tags = (prod.tags || []).map((t) => t.toLowerCase());

  // Women's Fashion
  if (
    catId.includes('women') ||
    catName.includes('women') ||
    tags.some((t) => ['women', 'womens', 'saree', 'kurti', 'lehenga', 'dress'].includes(t))
  ) {
    return '/category/women-fashion';
  }

  // Men's Fashion
  if (
    catId.includes('men') ||
    catName.includes('men') ||
    tags.some((t) => ['men', 'mens', 'shirt', 'jeans', 'trousers', 't-shirt'].includes(t))
  ) {
    return '/category/men-fashion';
  }

  // Electronics
  if (
    catId.includes('electron') ||
    catName.includes('electron') ||
    tags.some((t) => ['electronics', 'audio', 'gadget', 'headphones', 'smartwatch'].includes(t))
  ) {
    return '/category/electronics';
  }

  // Home & Living
  if (
    catId.includes('home') ||
    catName.includes('home') ||
    tags.some((t) => ['home', 'decor', 'bedsheet', 'kitchen', 'living'].includes(t))
  ) {
    return '/category/home-living';
  }

  // Beauty
  if (
    catId.includes('beauty') ||
    catName.includes('beauty') ||
    tags.some((t) => ['beauty', 'skincare', 'makeup', 'serum', 'perfume'].includes(t))
  ) {
    return '/category/beauty';
  }

  // Appliances
  if (catId.includes('appliance') || catName.includes('appliance')) {
    return '/category/appliances';
  }

  // Under 49 Store
  if (catId.includes('under-49') || catName.includes('49')) {
    return '/category/under-49';
  }

  // Deals
  if (catId.includes('deal') || catName.includes('deal')) {
    return '/deals-of-the-day';
  }

  // Fallback to specific category slug if available
  if (prod.categoryId) {
    const slug = prod.categoryId.replace(/^cat-/, '');
    return `/category/${slug}`;
  }

  return '/';
}

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to use order from state, or load via orderService
  const stateOrder = (location.state as any)?.order as Order | undefined;
  const [order, setOrder] = useState<Order | null>(stateOrder || null);
  const [isLoading, setIsLoading] = useState(!stateOrder);
  const [isCopied, setIsCopied] = useState(false);

  // Confetti particles
  const [particles] = useState<Particle[]>(() => generateConfetti());

  useEffect(() => {
    if (!order && orderId) {
      setIsLoading(true);
      orderService.getOrderById(orderId).then((found) => {
        setOrder(found);
        setIsLoading(false);
      });
    }
  }, [orderId, order]);

  const handleCopyOrderId = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.orderNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleContinueShoppingNow = () => {
    const returnUrl = (location.state as any)?.returnUrl;
    const destinationPath = getShoppingDestinationRoute(order, returnUrl);
    navigate(destinationPath);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBFBFC] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-700">Verifying order confirmation...</p>
        </div>
      </div>
    );
  }

  // Strict constraint: If order failed or not found, NEVER show success screen!
  if (!order) {
    return (
      <div className="min-h-screen bg-[#FBFBFC] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-rose-200 p-8 text-center space-y-4 shadow-soft">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900 font-heading">Order Not Found</h2>
          <p className="text-xs text-slate-500">
            We could not locate this order. If your payment was deducted, please check your bank account or contact customer support.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/"
              className="px-6 py-2.5 bg-[#2962FF] text-white font-bold text-xs rounded-xl hover:bg-[#1E4ED8] transition-colors"
            >
              Return to Marketplace
            </Link>
            <Link
              to="/orders"
              className="px-6 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#064E3B] via-[#047857] to-[#0F172A] py-8 sm:py-14 px-4 sm:px-6 lg:px-8 text-white font-body">
      
      {/* Subtle Celebratory Animated Confetti & Shimmering Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Shimmering Stars */}
        <div className="absolute top-12 left-1/4 w-3 h-3 text-amber-300 animate-pulse">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-20 right-1/4 w-4 h-4 text-emerald-200 animate-pulse delay-700">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-48 left-1/6 w-2.5 h-2.5 text-amber-200 animate-pulse delay-1000">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="absolute top-64 right-1/6 w-3 h-3 text-emerald-300 animate-pulse delay-500">
          <Sparkles className="w-full h-full" />
        </div>

        {/* CSS Confetti Falling Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-80"
            style={{
              left: `${p.x}%`,
              top: `-20px`,
              width: `${p.size}px`,
              height: `${p.size * 1.5}px`,
              backgroundColor: p.color,
              transform: `rotate(${p.id * 25}deg)`,
              animation: `confettiDrop ${p.duration}s ease-in infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes confettiDrop {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes checkmarkPop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-checkmark {
          animation: checkmarkPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Main Full-Screen Success Container */}
      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        
        {/* Top Celebratory Header Panel */}
        <div className="text-center space-y-3 pt-4 sm:pt-6">
          
          {/* Animated Green Checkmark with Pulse Ring */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl border-4 border-emerald-300/40 animate-checkmark">
              <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[3]" />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-emerald-100 border border-white/20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Verified Payment & Confirmed Order</span>
            </span>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-heading text-white drop-shadow-md">
              Order Placed Successfully!
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg mx-auto font-body">
              Thank you for shopping with Haatza. Your order has been placed and is being prepped for dispatch.
            </p>
          </div>

        </div>

        {/* Polished White Receipt Card */}
        <div className="bg-white text-[#1F1F1F] rounded-lg p-6 sm:p-8 shadow-2xl border border-white/20 space-y-6">
          
          {/* Order Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                Order Reference Number
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-base sm:text-lg font-black text-[#172033] font-mono tracking-wide">
                  {order.orderNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Copy Order ID"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                Estimated Delivery
              </p>
              <p className="text-sm font-extrabold text-emerald-700 flex items-center sm:justify-end gap-1.5 mt-0.5 font-heading">
                <Truck className="w-4 h-4" />
                <span>{order.estimatedDelivery || 'In 2-3 business days'}</span>
              </p>
            </div>
          </div>

          {/* Delivery Address Preview */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200/80">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2962FF] shrink-0">
              <MapPin className="w-4 h-4 text-[#2962FF]" />
            </div>
            <div className="text-xs space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#172033]">{order.shippingAddress.fullName}</span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                  {order.shippingAddress.addressType || 'Home'}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed font-body">
                {[
                  order.shippingAddress.houseNumber,
                  order.shippingAddress.buildingName,
                  order.shippingAddress.addressLine1,
                  order.shippingAddress.street,
                  order.shippingAddress.city,
                  order.shippingAddress.state,
                ]
                  .filter(Boolean)
                  .join(', ')} - <span className="font-bold">{order.shippingAddress.pincode}</span>
              </p>
              <p className="text-slate-500 font-medium">Contact: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500 font-heading">
              Ordered Items ({order.items.length})
            </h3>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={optimizeImageUrl(item.product.mainImage, { width: 90, quality: 70 }) || item.product.mainImage}
                      alt={item.product.name}
                      className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-800 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {item.selectedVariant ? `${item.selectedVariant.name || 'Option'}: ${item.selectedVariant.value} • ` : ''}
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-[#172033] font-heading shrink-0">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Total Amount Summary */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="text-slate-500">
              Payment Mode: <strong className="uppercase text-slate-800">{order.paymentMethod}</strong> ({order.paymentStatus === 'paid' ? 'Paid Online' : 'Pay on Delivery'})
            </div>
            <div className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>Total Paid:</span>
              <span className="text-xl font-black text-[#2962FF] font-heading">{formatINR(order.total)}</span>
            </div>
          </div>

          {/* Action Buttons: Continue Shopping & Track Order */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            {/* Primary Continue Shopping Button (Blue with White Text) */}
            <button
              type="button"
              onClick={handleContinueShoppingNow}
              className="flex-1 py-3.5 px-6 rounded-lg bg-[#2962FF] hover:bg-[#1747CC] text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2962FF]/50"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Track Order */}
            <Link
              to={`/orders/${order.orderNumber}/track`}
              className="py-3.5 px-6 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[#1F1F1F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4 text-emerald-600" />
              <span>Track Live Delivery</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderConfirmationPage;
