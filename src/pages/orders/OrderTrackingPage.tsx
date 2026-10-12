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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <LoadingSkeleton type="text" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Order Not Found</h2>
        <p className="text-xs text-zinc-500 mb-4">No tracking details found for order #{orderId}.</p>
        <Link to="/orders" className="text-xs font-bold text-[#E53935] hover:underline">
          Return to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
            Courier Partner: Blue Dart Express (AWB #8392109)
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight mt-1">
            Tracking Order #{order.orderNumber}
          </h1>
          <p className="text-xs text-[#5F6368] mt-1 font-medium">
            Expected Delivery by: <strong className="text-emerald-700">{order.estimatedDelivery}</strong>
          </p>
        </div>

        <Link
          to="/orders"
          className="text-xs font-bold text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>
      </div>

      {/* Main Tracking Milestone Timeline */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 mt-6 space-y-8 shadow-2xs">
        <h3 className="font-bold text-base text-[#202124]">Live Shipment Timeline</h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
          {order.trackingSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Dot icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                  step.completed
                    ? 'bg-emerald-600 ring-4 ring-emerald-50'
                    : step.current
                    ? 'bg-[#E53935] ring-4 ring-rose-50 animate-pulse'
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
                  <h4 className={`text-sm font-bold ${step.completed || step.current ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {step.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-zinc-400">
                    {step.date}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination & Items card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <MapPin className="w-4 h-4 text-[#E53935]" />
            <span>Delivery Address</span>
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-900">{order.shippingAddress.fullName}</p>
            <p className="text-xs text-zinc-600 mt-1">
              {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-xs text-zinc-500 mt-1">Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <Package className="w-4 h-4 text-[#E53935]" />
            <span>Items in this Shipment</span>
          </div>
          <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar pr-1">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-800 line-clamp-1 max-w-[200px]">
                  {item.product.name} (×{item.quantity})
                </span>
                <span className="font-bold text-zinc-900">{formatINR(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
