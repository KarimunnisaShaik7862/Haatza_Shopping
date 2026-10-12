import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { formatINR } from '../../utils/formatters';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      orderService.getOrderById(orderId).then(setOrder);
    }
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-md text-center space-y-6">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed & Placed Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight mt-3">
            Thank You for Shopping With HAATZA!
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-2">
            A confirmation SMS and email have been dispatched with your shipment docket.
          </p>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 flex-wrap gap-2">
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Order Number
                </p>
                <p className="text-sm font-black text-[#202124]">{order.orderNumber}</p>
              </div>

              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  Estimated Delivery
                </p>
                <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                  <Truck className="w-4 h-4" /> {order.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Delivery address preview */}
            <div className="flex items-start gap-2.5 text-xs text-zinc-700">
              <MapPin className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-zinc-900">{order.shippingAddress.fullName}</span>
                <p className="text-zinc-500">
                  {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
              </div>
            </div>

            {/* Items summary */}
            <div className="pt-3 border-t border-zinc-200 space-y-2">
              <p className="text-xs font-bold text-zinc-700">
                Purchased Items ({order.items.length})
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 no-scrollbar">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.mainImage}
                        alt={item.product.name}
                        className="w-9 h-9 rounded-md object-cover border border-zinc-200"
                      />
                      <span className="font-medium text-zinc-800 line-clamp-1 max-w-xs">
                        {item.product.name} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-zinc-900">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 flex justify-between text-sm font-bold">
              <span>Total Paid:</span>
              <span className="text-[#E53935] font-black">{formatINR(order.total)}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          {order && (
            <Link
              to={`/orders/${order.orderNumber}/track`}
              className="px-6 py-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
            </Link>
          )}

          <Link
            to="/orders"
            className="px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View All My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
