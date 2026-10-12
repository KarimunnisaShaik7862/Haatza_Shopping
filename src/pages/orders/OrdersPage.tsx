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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <LoadingSkeleton type="text" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
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
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
            My Orders
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Track past and active orders, download invoices, and initiate returns
          </p>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-2xs hover:border-zinc-300 transition-all"
          >
            {/* Header info */}
            <div className="p-4 sm:p-5 bg-zinc-50 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-6 flex-wrap">
                <div>
                  <p className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Order Date</p>
                  <p className="font-bold text-zinc-900">{formatDate(order.date)}</p>
                </div>
                <div>
                  <p className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Total Amount</p>
                  <p className="font-bold text-zinc-900">{formatINR(order.total)}</p>
                </div>
                <div>
                  <p className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Ship To</p>
                  <p className="font-bold text-zinc-900">{order.shippingAddress.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-zinc-500 font-bold">#{order.orderNumber}</span>
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
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-200"
                    />
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-xs sm:text-sm font-bold text-zinc-900 hover:text-[#E53935] line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Qty: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant.value}` : ''}
                      </p>
                      <p className="text-xs font-semibold text-zinc-900 mt-1">
                        {formatINR(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                    >
                      Buy Again
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Order actions footer */}
            <div className="p-4 sm:px-6 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>
                  {order.status === 'delivered' ? 'Delivered on ' + formatDate(order.date) : 'Estimated delivery: ' + order.estimatedDelivery}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/returns?order=${order.orderNumber}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 hover:text-[#E53935] flex items-center gap-1 hover:bg-zinc-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return/Replace</span>
                </Link>

                <Link
                  to={`/orders/${order.orderNumber}/track`}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-[#E53935] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
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
