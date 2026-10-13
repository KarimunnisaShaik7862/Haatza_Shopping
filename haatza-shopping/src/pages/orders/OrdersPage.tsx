import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { formatINR, formatDate } from '../../utils/formatters';
import { EmptyState } from '../../components/common/EmptyState';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Package, Truck, ArrowRight, RotateCcw } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const breadcrumbs = [{ label: 'My Account', link: '/account' }, { label: 'My Orders' }];

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSkeleton type="text" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="You haven't placed any orders yet. Start exploring thousands of premium products across fashion, electronics, home and groceries."
          actionText="Start Shopping"
          actionLink="/"
        />
      </div>
    );
  }

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Delivered</span>;
      case 'shipped':
      case 'out_for_delivery':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">In Transit</span>;
      case 'confirmed':
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Processing</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-[#E5EAF3]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
            My Orders
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Track past and active orders, download invoices, and initiate returns
          </p>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-[#E5EAF3] overflow-hidden shadow-soft hover:border-[#DBEAFE] transition-all"
          >
            {/* Header info */}
            <div className="p-4 sm:p-5 bg-[#F5F7FF] border-b border-[#E5EAF3] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-6 flex-wrap">
                <div>
                  <p className="text-[#64748B] font-bold uppercase tracking-wider text-[10px]">Order Date</p>
                  <p className="font-bold text-[#172033]">{formatDate(order.date)}</p>
                </div>
                <div>
                  <p className="text-[#64748B] font-bold uppercase tracking-wider text-[10px]">Total Amount</p>
                  <p className="font-bold text-[#172033]">{formatINR(order.total)}</p>
                </div>
                <div>
                  <p className="text-[#64748B] font-bold uppercase tracking-wider text-[10px]">Ship To</p>
                  <p className="font-bold text-[#172033]">{order.shippingAddress.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#64748B] font-bold">#{order.orderNumber}</span>
                {getStatusBadge(order.status)}
              </div>
            </div>

            {/* Items in order */}
            <div className="p-4 sm:p-6 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E5EAF3]"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-xs sm:text-sm font-bold text-[#172033] hover:text-[#2962FF] line-clamp-1 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        Qty: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant.value}` : ''}
                      </p>
                      <p className="text-xs font-semibold text-[#172033] mt-1">
                        {formatINR(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="px-3 py-1.5 rounded-lg border border-[#E5EAF3] text-xs font-semibold text-[#172033] hover:bg-[#EEF3FF] hover:text-[#2962FF] transition-colors"
                    >
                      Buy Again
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Order actions footer */}
            <div className="p-4 sm:px-6 bg-[#F5F7FF]/50 border-t border-[#E5EAF3] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>
                  {order.status === 'delivered' ? 'Delivered on ' + formatDate(order.date) : 'Estimated delivery: ' + order.estimatedDelivery}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/returns?order=${order.orderNumber}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#64748B] hover:text-[#2962FF] flex items-center gap-1 hover:bg-[#EEF3FF] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return/Replace</span>
                </Link>

                <Link
                  to={`/orders/${order.orderNumber}/track`}
                  className="px-4 py-2 rounded-xl bg-[#2962FF] hover:bg-[#1E4ED8] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-soft-sm"
                >
                  <span>Track Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
