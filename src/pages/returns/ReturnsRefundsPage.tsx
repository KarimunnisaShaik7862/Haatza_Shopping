import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Order, ReturnRequest } from '../../types';
import { orderService } from '../../services/orderService';
import { formatINR, formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';

const RETURN_REASONS = [
  'Size does not fit / too small or too large',
  'Received a defective or damaged product',
  'Product does not match website pictures or description',
  'Changed my mind / no longer needed',
  'Received incorrect item or variant',
];

export const ReturnsRefundsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderNumberParam = searchParams.get('order') || '';
  const { showToast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(orderNumberParam);
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [reason, setReason] = useState(RETURN_REASONS[0]);
  const [comment, setComment] = useState('');
  const [resolutionType, setResolutionType] = useState<'refund' | 'replacement'>('refund');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReturn, setSubmittedReturn] = useState<ReturnRequest | null>(null);

  useEffect(() => {
    async function loadData() {
      const [orderList, retList] = await Promise.all([
        orderService.getOrders(),
        orderService.getReturns(),
      ]);
      setOrders(orderList);
      setReturnRequests(retList);

      if (orderNumberParam) {
        setSelectedOrderNumber(orderNumberParam);
      } else if (orderList.length > 0) {
        setSelectedOrderNumber(orderList[0].orderNumber);
      }
    }
    loadData();
  }, [orderNumberParam]);

  const currentOrder = orders.find((o) => o.orderNumber === selectedOrderNumber) || orders[0];
  const currentItem = currentOrder?.items[selectedItemIdx] || currentOrder?.items[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !currentItem) {
      showToast('Please select an order and item to return', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await orderService.createReturnRequest({
        orderId: currentOrder.id,
        orderNumber: currentOrder.orderNumber,
        productId: currentItem.product.id,
        productName: currentItem.product.name,
        productImage: currentItem.product.mainImage,
        reason,
        comment,
        refundAmount: currentItem.price * currentItem.quantity,
        resolutionType,
      });

      setSubmittedReturn(created);
      setReturnRequests((prev) => [created, ...prev]);
      showToast('Return request submitted successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to submit return request', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbs = [
    { label: 'My Orders', link: '/orders' },
    { label: 'Returns & Refunds' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="pb-6 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          Returns & Doorstep Replacements
        </h1>
        <p className="text-xs text-[#5F6368] mt-1 font-medium">
          Hassle-free 7-day pickup & instant refunds back to your source account
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          {submittedReturn ? (
            <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">
                Return Request Registered #{submittedReturn.id}
              </h3>
              <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                Our logistics partner will pick up <strong>{submittedReturn.productName}</strong> from your address within 48 hours. Refund of <strong>{formatINR(submittedReturn.refundAmount)}</strong> will be credited once verified.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedReturn(null)}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-black transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
              <h3 className="font-bold text-base text-[#202124] pb-2 border-b border-zinc-100 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#E53935]" />
                <span>Create a Return or Replacement</span>
              </h3>

              {/* Order selector */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Select Order
                </label>
                <select
                  value={selectedOrderNumber}
                  onChange={(e) => {
                    setSelectedOrderNumber(e.target.value);
                    setSelectedItemIdx(0);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-800 focus:outline-hidden focus:border-[#E53935]"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.orderNumber}>
                      Order #{o.orderNumber} ({formatDate(o.date)}) - {formatINR(o.total)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product item selector in order */}
              {currentOrder && (
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Select Item to Return
                  </label>
                  <div className="space-y-2">
                    {currentOrder.items.map((item, idx) => {
                      const isSelected = selectedItemIdx === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedItemIdx(idx)}
                          className={`p-3 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-[#E53935] bg-[#FFEBEE]/30'
                              : 'border-zinc-200 bg-white hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.mainImage}
                              alt={item.product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="text-xs font-bold text-zinc-900 line-clamp-1">
                                {item.product.name}
                              </p>
                              <p className="text-[11px] text-zinc-500">
                                Qty: {item.quantity} • {formatINR(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-[#E53935]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Resolution type */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Resolution Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-xs font-bold cursor-pointer ${
                      resolutionType === 'refund'
                        ? 'border-[#E53935] bg-[#FFEBEE]/30 text-[#E53935]'
                        : 'border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="resolution"
                      value="refund"
                      checked={resolutionType === 'refund'}
                      onChange={() => setResolutionType('refund')}
                      className="text-[#E53935]"
                    />
                    <span>Full Money Refund</span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-xs font-bold cursor-pointer ${
                      resolutionType === 'replacement'
                        ? 'border-[#E53935] bg-[#FFEBEE]/30 text-[#E53935]'
                        : 'border-zinc-200 text-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="resolution"
                      value="replacement"
                      checked={resolutionType === 'replacement'}
                      onChange={() => setResolutionType('replacement')}
                      className="text-[#E53935]"
                    />
                    <span>Size / Color Replacement</span>
                  </label>
                </div>
              </div>

              {/* Reason selection */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Reason for Return *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 text-xs font-medium text-zinc-800 focus:outline-hidden focus:border-[#E53935]"
                >
                  {RETURN_REASONS.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional comments */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what went wrong..."
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-300 text-xs text-zinc-800 focus:outline-hidden focus:border-[#E53935]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Confirm Return Request'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Existing Return Requests */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 space-y-4 shadow-2xs">
            <h3 className="font-bold text-base text-[#202124] pb-3 border-b border-zinc-100">
              Submitted Return Requests ({returnRequests.length})
            </h3>

            {returnRequests.length === 0 ? (
              <p className="text-xs text-zinc-500 py-4 text-center">No active return requests.</p>
            ) : (
              <div className="space-y-3">
                {returnRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-zinc-800">#{req.orderNumber}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {req.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={req.productImage}
                        alt={req.productName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-900 truncate">{req.productName}</p>
                        <p className="text-[11px] text-zinc-500">{req.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-zinc-200 text-zinc-500">
                      <span>Refund: <strong className="text-zinc-900">{formatINR(req.refundAmount)}</strong></span>
                      <span>Requested on {formatDate(req.requestedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
