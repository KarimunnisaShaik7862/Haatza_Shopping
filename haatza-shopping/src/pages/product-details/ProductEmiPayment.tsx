import React, { useState } from 'react';
import {
  CreditCard,
  ChevronDown,
  ChevronUp,
  Percent,
  Sparkles,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';

interface ProductEmiPaymentProps {
  product: Product;
}

interface EmiPlan {
  months: number;
  monthlyAmount: number;
  interestAmount: number;
  interestRate: string;
  isNoCost?: boolean;
  totalPayable: number;
}

interface BankOption {
  id: string;
  name: string;
  cardType: string;
  subtitle: string;
  tag: string;
  isNoCostEligible?: boolean;
  logoType: 'hdfc' | 'icici' | 'sbi' | 'axis' | 'debit' | 'nocost';
  processingFee: string;
  plans: (price: number) => EmiPlan[];
}

export const ProductEmiPayment: React.FC<ProductEmiPaymentProps> = ({ product }) => {
  const [isMainExpanded, setIsMainExpanded] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null);
  const [selectedPlanMonths, setSelectedPlanMonths] = useState<Record<string, number>>({});
  const [expandedTerms, setExpandedTerms] = useState<Record<string, boolean>>({});

  const price = product.price || 1399;
  const startingMonthlyEmi = Math.round(price / 12) || 127;

  const banks: BankOption[] = [
    {
      id: 'hdfc',
      name: 'HDFC Bank Credit Card',
      cardType: 'Credit Card EMI',
      subtitle: 'EMI plans starts at 16% per annum with ₹199 processing fees',
      tag: 'No-Cost EMI Available',
      isNoCostEligible: true,
      logoType: 'hdfc',
      processingFee: '₹199 + GST one-time bank processing fee',
      plans: (p: number) => [
        {
          months: 3,
          monthlyAmount: Math.round(p / 3),
          interestAmount: 0,
          interestRate: '0% (No-Cost)',
          isNoCost: true,
          totalPayable: p,
        },
        {
          months: 6,
          monthlyAmount: Math.round((p * 1.045) / 6),
          interestAmount: Math.round(p * 0.045),
          interestRate: '14% p.a.',
          totalPayable: Math.round(p * 1.045),
        },
        {
          months: 9,
          monthlyAmount: Math.round((p * 1.068) / 9),
          interestAmount: Math.round(p * 0.068),
          interestRate: '15% p.a.',
          totalPayable: Math.round(p * 1.068),
        },
        {
          months: 12,
          monthlyAmount: Math.round((p * 1.092) / 12),
          interestAmount: Math.round(p * 0.092),
          interestRate: '16% p.a.',
          totalPayable: Math.round(p * 1.092),
        },
      ],
    },
    {
      id: 'icici',
      name: 'ICICI Bank Credit Card',
      cardType: 'Credit Card EMI',
      subtitle: 'EMI plans starts at 15.5% per annum with ₹199 processing fees',
      tag: 'Instant Bank Cashback',
      isNoCostEligible: true,
      logoType: 'icici',
      processingFee: '₹199 + GST one-time bank fee',
      plans: (p: number) => [
        {
          months: 3,
          monthlyAmount: Math.round(p / 3),
          interestAmount: 0,
          interestRate: '0% (No-Cost)',
          isNoCost: true,
          totalPayable: p,
        },
        {
          months: 6,
          monthlyAmount: Math.round((p * 1.042) / 6),
          interestAmount: Math.round(p * 0.042),
          interestRate: '13.5% p.a.',
          totalPayable: Math.round(p * 1.042),
        },
        {
          months: 9,
          monthlyAmount: Math.round((p * 1.065) / 9),
          interestAmount: Math.round(p * 0.065),
          interestRate: '14.5% p.a.',
          totalPayable: Math.round(p * 1.065),
        },
        {
          months: 12,
          monthlyAmount: Math.round((p * 1.09) / 12),
          interestAmount: Math.round(p * 0.09),
          interestRate: '15.5% p.a.',
          totalPayable: Math.round(p * 1.09),
        },
      ],
    },
    {
      id: 'sbi',
      name: 'SBI Card',
      cardType: 'Credit Card EMI',
      subtitle: 'EMI plans starts at 14.5% per annum with ₹99 processing fees',
      tag: 'Lowest Processing Fee',
      logoType: 'sbi',
      processingFee: '₹99 + GST one-time bank fee',
      plans: (p: number) => [
        {
          months: 3,
          monthlyAmount: Math.round((p * 1.025) / 3),
          interestAmount: Math.round(p * 0.025),
          interestRate: '12.5% p.a.',
          totalPayable: Math.round(p * 1.025),
        },
        {
          months: 6,
          monthlyAmount: Math.round((p * 1.04) / 6),
          interestAmount: Math.round(p * 0.04),
          interestRate: '13% p.a.',
          totalPayable: Math.round(p * 1.04),
        },
        {
          months: 9,
          monthlyAmount: Math.round((p * 1.065) / 9),
          interestAmount: Math.round(p * 0.065),
          interestRate: '14% p.a.',
          totalPayable: Math.round(p * 1.065),
        },
        {
          months: 12,
          monthlyAmount: Math.round((p * 1.085) / 12),
          interestAmount: Math.round(p * 0.085),
          interestRate: '14.5% p.a.',
          totalPayable: Math.round(p * 1.085),
        },
      ],
    },
    {
      id: 'axis',
      name: 'Axis Bank Credit Card',
      cardType: 'Credit Card EMI',
      subtitle: 'EMI plans starts at 15% per annum with ₹199 processing fees',
      tag: 'Special Partner Reward',
      isNoCostEligible: true,
      logoType: 'axis',
      processingFee: '₹199 + GST one-time bank fee',
      plans: (p: number) => [
        {
          months: 3,
          monthlyAmount: Math.round(p / 3),
          interestAmount: 0,
          interestRate: '0% (No-Cost)',
          isNoCost: true,
          totalPayable: p,
        },
        {
          months: 6,
          monthlyAmount: Math.round((p * 1.04) / 6),
          interestAmount: Math.round(p * 0.04),
          interestRate: '13.5% p.a.',
          totalPayable: Math.round(p * 1.04),
        },
        {
          months: 9,
          monthlyAmount: Math.round((p * 1.065) / 9),
          interestAmount: Math.round(p * 0.065),
          interestRate: '14.5% p.a.',
          totalPayable: Math.round(p * 1.065),
        },
        {
          months: 12,
          monthlyAmount: Math.round((p * 1.09) / 12),
          interestAmount: Math.round(p * 0.09),
          interestRate: '15% p.a.',
          totalPayable: Math.round(p * 1.09),
        },
      ],
    },
    {
      id: 'debit',
      name: 'Debit Card EMI',
      cardType: 'Debit Card EMI',
      subtitle: 'Instant paperless approval via SMS verification',
      tag: 'No Credit Card Required',
      logoType: 'debit',
      processingFee: 'Instant paperless approval via SMS verification',
      plans: (p: number) => [
        {
          months: 3,
          monthlyAmount: Math.round((p * 1.03) / 3),
          interestAmount: Math.round(p * 0.03),
          interestRate: '13.5% p.a.',
          totalPayable: Math.round(p * 1.03),
        },
        {
          months: 6,
          monthlyAmount: Math.round((p * 1.055) / 6),
          interestAmount: Math.round(p * 0.055),
          interestRate: '14.5% p.a.',
          totalPayable: Math.round(p * 1.055),
        },
        {
          months: 9,
          monthlyAmount: Math.round((p * 1.08) / 9),
          interestAmount: Math.round(p * 0.08),
          interestRate: '15.5% p.a.',
          totalPayable: Math.round(p * 1.08),
        },
      ],
    },
    {
      id: 'nocost',
      name: 'No-Cost EMI Across Top Banks',
      cardType: 'Zero Interest EMI',
      subtitle: '₹0 interest & zero hidden charges across eligible banks',
      tag: 'Zero Down Payment',
      isNoCostEligible: true,
      logoType: 'nocost',
      processingFee: '₹0 interest & zero hidden charges',
      plans: (p: number) => [
        {
          months: 3,
          monthlyAmount: Math.round(p / 3),
          interestAmount: 0,
          interestRate: '0% Interest',
          isNoCost: true,
          totalPayable: p,
        },
        {
          months: 6,
          monthlyAmount: Math.round(p / 6),
          interestAmount: 0,
          interestRate: '0% Interest',
          isNoCost: true,
          totalPayable: p,
        },
      ],
    },
  ];

  const handleToggleBank = (bankId: string) => {
    setSelectedBankId((prev) => (prev === bankId ? null : bankId));
  };

  const renderBankLogo = (type: BankOption['logoType']) => {
    switch (type) {
      case 'hdfc':
        return (
          <div className="w-9 h-9 rounded-lg bg-[#004C8F] flex items-center justify-center p-1.5 shadow-2xs shrink-0">
            <div className="w-full h-full border border-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-[#ED1C24]" />
            </div>
          </div>
        );
      case 'icici':
        return (
          <div className="w-9 h-9 rounded-lg bg-[#F37021] text-white flex items-center justify-center font-black text-[11px] font-heading shadow-2xs shrink-0 tracking-tight">
            ICICI
          </div>
        );
      case 'sbi':
        return (
          <div className="w-9 h-9 rounded-lg bg-[#008ACF] text-white flex items-center justify-center font-black text-xs font-heading shadow-2xs shrink-0">
            SBI
          </div>
        );
      case 'axis':
        return (
          <div className="w-9 h-9 rounded-lg bg-[#97144D] text-white flex items-center justify-center font-black text-[11px] font-heading shadow-2xs shrink-0 tracking-tight">
            AXIS
          </div>
        );
      case 'debit':
        return (
          <div className="w-9 h-9 rounded-lg bg-[#059669] text-white flex items-center justify-center shadow-2xs shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
        );
      case 'nocost':
      default:
        return (
          <div className="w-9 h-9 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-2xs shrink-0">
            <Percent className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="w-full space-y-2.5">
      {/* 1. Initial Collapsed Design — Unique Rich Blue EMI Banner */}
      <button
        type="button"
        onClick={() => setIsMainExpanded(!isMainExpanded)}
        className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#155EEF] via-[#1E4ED8] to-[#2962FF] p-4 text-white text-left shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group cursor-pointer"
        aria-expanded={isMainExpanded}
      >
        {/* Subtle decorative glow & pattern overlays */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Payment Icon Container */}
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <CreditCard className="w-5 h-5 text-white" />
            </div>

            {/* Typography with strong visual hierarchy */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold font-heading text-white">
                  Easy EMI, Easy Payments
                </span>
                <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/25 backdrop-blur-xs font-mono">
                  <Percent className="w-3 h-3" /> Starts at ₹{startingMonthlyEmi.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <p className="text-xs text-blue-100 font-body mt-0.5 line-clamp-1">
                Split your payment into affordable monthly instalments across top banks.
              </p>
            </div>
          </div>

          {/* Elegant Downward Chevron */}
          <div className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center shrink-0 border border-white/20 transition-transform duration-300">
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform duration-300 ${
                isMainExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {/* 2. Expanded Design — Horizontally Scrollable Sample Bank Cards */}
      {isMainExpanded && (
        <div className="rounded-2xl bg-slate-50/80 p-3.5 sm:p-4 border border-slate-200/80 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 font-heading">
              <Building2 className="w-4 h-4 text-[#2962FF]" />
              <span>Available Bank & Card Plans</span>
            </div>
            <span className="text-[11px] text-slate-400 font-body">
              Swipe cards horizontally to view all banks
            </span>
          </div>

          {/* Horizontally scrollable track */}
          <div className="flex gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {banks.map((bank) => {
              const isSelected = selectedBankId === bank.id;
              const plans = bank.plans(price);
              const lowestPlan = plans[plans.length - 1] || plans[0];

              return (
                <div
                  key={bank.id}
                  onClick={() => handleToggleBank(bank.id)}
                  className={`shrink-0 rounded-2xl bg-white border transition-all duration-200 p-4 flex flex-col justify-between snap-start cursor-pointer ${
                    isSelected
                      ? 'w-[310px] sm:w-[360px] md:w-[380px] border-[#2962FF] ring-2 ring-[#2962FF]/15 shadow-md'
                      : 'w-[270px] sm:w-[290px] border-slate-200 hover:border-[#2962FF]/50 shadow-2xs hover:shadow-soft-sm'
                  }`}
                >
                  {/* Card Header & Individual Dropdown Chevron */}
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        {renderBankLogo(bank.logoType)}
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading truncate">
                            {bank.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-body line-clamp-1">
                            {bank.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Card Dropdown Trigger Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBank(bank.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'bg-[#EEF3FF] border-[#2962FF] text-[#2962FF]'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'
                        }`}
                        aria-label={`Toggle ${bank.name} EMI plans`}
                      >
                        {isSelected ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Tag badge & starting summary */}
                    <div className="flex items-center justify-between gap-2 flex-wrap pt-0.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md font-heading ${
                          bank.isNoCostEligible
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-blue-50 text-[#2962FF] border border-blue-100'
                        }`}
                      >
                        {bank.isNoCostEligible ? (
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        ) : (
                          <Sparkles className="w-2.5 h-2.5" />
                        )}
                        {bank.tag}
                      </span>
                    </div>

                    {!isSelected && (
                      <div className="pt-1">
                        <p className="text-xs text-slate-500 font-body">EMI starts from:</p>
                        <p className="text-sm font-extrabold text-slate-900 font-heading">
                          {formatINR(lowestPlan.monthlyAmount)}
                          <span className="text-[11px] font-normal text-slate-400">
                            /month for {lowestPlan.months}m
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 3. Individual Card Dropdown Accordion — Expanded EMI Plans Table (Image 4 Design) */}
                  {isSelected && (
                    <div
                      className="mt-3.5 pt-3.5 border-t border-slate-100 space-y-3 animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Table Header Row */}
                      <div className="grid grid-cols-12 text-[11px] font-bold text-slate-500 pb-2 border-b border-slate-100 font-heading">
                        <div className="col-span-3">Duration</div>
                        <div className="col-span-3 text-center">EMI/Month</div>
                        <div className="col-span-2 text-center">Interest</div>
                        <div className="col-span-3 text-center">Total Cost</div>
                        <div className="col-span-1 text-right"></div>
                      </div>

                      {/* Table Rows with Radio Selection */}
                      <div className="divide-y divide-slate-100">
                        {plans.map((p) => {
                          const isPlanSelected =
                            (selectedPlanMonths[bank.id] ?? plans[0]?.months) === p.months;
                          return (
                            <div
                              key={p.months}
                              onClick={() =>
                                setSelectedPlanMonths((prev) => ({
                                  ...prev,
                                  [bank.id]: p.months,
                                }))
                              }
                              className={`grid grid-cols-12 items-center py-2.5 px-1 text-xs rounded-lg transition-colors cursor-pointer ${
                                isPlanSelected ? 'bg-blue-50/70 font-medium' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="col-span-3 font-semibold text-slate-900 font-heading">
                                {p.months} months
                              </div>
                              <div className="col-span-3 text-center font-bold text-[#155EEF] font-heading">
                                {formatINR(p.monthlyAmount)}
                              </div>
                              <div className="col-span-2 text-center text-slate-600 font-body text-[11px]">
                                {p.isNoCost ? (
                                  <span className="text-emerald-700 font-bold">0%</span>
                                ) : (
                                  formatINR(p.interestAmount)
                                )}
                              </div>
                              <div className="col-span-3 text-center font-semibold text-slate-800 font-heading">
                                {formatINR(p.totalPayable)}
                              </div>
                              <div className="col-span-1 flex justify-end">
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                    isPlanSelected
                                      ? 'border-emerald-600 bg-white ring-2 ring-emerald-600/20'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isPlanSelected && (
                                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Terms and Conditions (Image 4) */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <p className="text-xs font-bold text-slate-800 font-heading">
                          Terms and conditions
                        </p>
                        <ul className="text-[11px] text-slate-600 font-body list-disc pl-4 space-y-1">
                          <li>
                            To avail an EMI plan, the Bill total has to be paid in full when
                            placing the order
                          </li>
                          <li>
                            Once the order gets delivered, the bank will process your EMI in 3-5
                            days
                          </li>
                          {expandedTerms[bank.id] && (
                            <>
                              <li>
                                Bank processing fees and GST will be billed directly by your card
                                issuing bank
                              </li>
                              <li>
                                Pre-closure and foreclosure charges may apply as per bank policy
                              </li>
                            </>
                          )}
                        </ul>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedTerms((prev) => ({
                              ...prev,
                              [bank.id]: !prev[bank.id],
                            }))
                          }
                          className="text-[#2962FF] font-bold hover:underline cursor-pointer text-[11px] font-heading inline-block pt-0.5"
                        >
                          {expandedTerms[bank.id] ? '− Show less' : '+ Read more'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 font-body text-center pt-1">
            *Illustrative EMI options. Final tenure and offers will be verified during payment checkout.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductEmiPayment;
