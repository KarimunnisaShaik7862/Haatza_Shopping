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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12 pb-24 sm:pb-16">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#E5EAF3] p-8 sm:p-12 shadow-soft text-center space-y-6">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Order Confirmed & Placed Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight mt-3">
            Thank You for Shopping With HAATZA!
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2">
            A confirmation SMS and email have been dispatched with your shipment docket.
          </p>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="bg-[#F5F7FF] rounded-2xl border border-[#E5EAF3] p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF3] flex-wrap gap-2">
              <div>
                <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                  Order Number
                </p>
                <p className="text-sm font-black text-[#172033]">{order.orderNumber}</p>
              </div>

              <div>
                <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                  Estimated Delivery
                </p>
                <p className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                  <Truck className="w-4 h-4" /> {order.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Delivery address preview */}
            <div className="flex items-start gap-2.5 text-xs text-[#172033]">
              <MapPin className="w-4 h-4 text-[#2962FF] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#172033]">{order.shippingAddress.fullName}</span>
                <p className="text-[#64748B]">
                  {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
              </div>
            </div>

            {/* Items summary */}
            <div className="pt-3 border-t border-[#E5EAF3] space-y-2">
              <p className="text-xs font-bold text-[#172033]">
                Purchased Items ({order.items.length})
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 no-scrollbar">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.mainImage}
                        alt={item.product.name}
                        className="w-9 h-9 rounded-md object-cover border border-[#E5EAF3]"
                      />
                      <span className="font-medium text-[#172033] line-clamp-1 max-w-xs">
                        {item.product.name} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-[#172033]">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5EAF3] flex justify-between text-sm font-bold">
              <span className="text-[#172033]">Total Paid:</span>
              <span className="text-[#2962FF] font-black">{formatINR(order.total)}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          {order && (
            <Link
              to={`/orders/${order.orderNumber}/track`}
              className="px-6 py-3 rounded-xl bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-xs sm:text-sm transition-all shadow-soft flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
            </Link>
          )}

          <Link
            to="/orders"
            className="px-6 py-3 rounded-xl border border-[#E5EAF3] bg-white hover:bg-[#EEF3FF] hover:text-[#2962FF] text-[#172033] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <span>View All My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
