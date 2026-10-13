import React from 'react';

export const PaymentMethods: React.FC = () => {
  const methods = ['UPI Accepted', 'RuPay', 'Visa', 'Mastercard', 'Net Banking', 'Cash on Delivery'];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {methods.map((method) => (
        <span
          key={method}
          className="px-2.5 py-1 rounded-lg bg-white/10 text-[10px] font-semibold text-white border border-white/15 backdrop-blur-xs font-heading"
        >
          {method}
        </span>
      ))}
    </div>
  );
};

export default PaymentMethods;
