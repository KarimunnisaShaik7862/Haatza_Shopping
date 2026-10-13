import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { formatINR } from '../../utils/formatters';
import { Package, CheckCircle2, Clock, MapPin, ArrowLeft } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      orderService.getOrderById(orderId).then((res) => {
        setOrder(res);
        setLoading(false);
      });
    }
  }, [orderId]);

  const breadcrumbs = [
    { label: 'My Orders', link: '/orders' },
    { label: `Tracking: #${orderId}` },
  ];

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton type="text" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-xl font-bold text-[#172033] mb-2">Order Not Found</h2>
        <p className="text-xs text-[#64748B] mb-4">No tracking details found for order #{orderId}.</p>
        <Link to="/orders" className="text-xs font-bold text-[#2962FF] hover:underline">
          Return to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-[#E5EAF3]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2962FF]">
            Courier Partner: Blue Dart Express (AWB #8392109)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-1">
            Tracking Order #{order.orderNumber}
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Expected Delivery by: <strong className="text-emerald-700">{order.estimatedDelivery}</strong>
          </p>
        </div>

        <Link
          to="/orders"
          className="text-xs font-bold text-[#64748B] hover:text-[#2962FF] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
      </div>

      {/* Main Tracking Milestone Timeline */}
      <div className="bg-white rounded-3xl border border-[#E5EAF3] p-6 sm:p-8 mt-6 space-y-8 shadow-soft">
        <h3 className="font-bold text-base text-[#172033]">Live Shipment Timeline</h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5EAF3]">
          {order.trackingSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Dot icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                  step.completed
                    ? 'bg-emerald-600 ring-4 ring-emerald-50'
                    : step.current
                    ? 'bg-[#2962FF] ring-4 ring-[#DBEAFE] animate-pulse'
                    : 'bg-zinc-300 ring-4 ring-zinc-50'
                }`}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h4 className={`text-sm font-bold ${step.completed || step.current ? 'text-[#172033]' : 'text-zinc-400'}`}>
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#64748B]">
                    {step.date}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination & Items card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl border border-[#E5EAF3] p-5 space-y-3 shadow-soft-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
            <MapPin className="w-4 h-4 text-[#2962FF]" />
            <span>Delivery Address</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#172033]">{order.shippingAddress.fullName}</p>
            <p className="text-xs text-[#64748B] mt-1">
              {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-xs text-[#64748B] mt-1">Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5EAF3] p-5 space-y-3 shadow-soft-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
            <Package className="w-4 h-4 text-[#2962FF]" />
            <span>Items in this Shipment</span>
          </div>
          <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar pr-1">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#172033] line-clamp-1 max-w-[200px]">
                  {item.product.name} (×{item.quantity})
                </span>
                <span className="font-bold text-[#172033]">{formatINR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
