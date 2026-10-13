import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const PolicyPage: React.FC = () => {
  const { pathname } = useLocation();

  const getPolicyDetails = () => {
    if (pathname.includes('privacy')) {
      return {
        title: 'Privacy Policy',
        lastUpdated: '10 October 2026',
        content: [
          {
            heading: '1. Information We Collect',
            text: 'We collect customer contact information (name, phone number, delivery address, email) solely for fulfilling orders placed on HAATZA, LIGHT, and NEXT. We do not store sensitive payment card details or CVVs on our frontend servers.',
          },
          {
            heading: '2. How We Use Your Data',
            text: 'Your delivery address and contact details are securely transmitted to our logistics partners (e.g. Blue Dart Express and NEXT dark-store delivery executives) solely for dispatch, real-time OTP verification, and transit updates.',
          },
          {
            heading: '3. Data Security & Cookies',
            text: 'All communications are protected using 256-bit SSL encryption. Local storage is strictly reserved for non-sensitive shopping preferences such as cart contents and recently viewed items.',
          },
        ],
      };
    }

    if (pathname.includes('terms')) {
      return {
        title: 'Terms of Service',
        lastUpdated: '10 October 2026',
        content: [
          {
            heading: '1. Marketplace Platform Terms',
            text: 'By accessing HAATZA, LIGHT, or NEXT, you agree to comply with Indian e-commerce laws and regulations. All transactions are concluded in Indian Rupees (INR).',
          },
          {
            heading: '2. Pricing & Product Accuracy',
            text: 'All listed prices include applicable GST. While we strive for extreme accuracy, in the rare event of a typographical pricing error, we reserve the right to cancel affected orders with immediate full refund.',
          },
        ],
      };
    }

    if (pathname.includes('shipping')) {
      return {
        title: 'Shipping & Delivery Policy',
        lastUpdated: '10 October 2026',
        content: [
          {
            heading: '1. Delivery Speeds & Service Areas',
            text: 'HAATZA and LIGHT deliver across 28,000+ PIN codes in India. Standard delivery timeline is 2 to 4 business days. NEXT quick-commerce operates within dedicated dark-store serviceable radiuses for 10-15 minute grocery dispatches.',
          },
          {
            heading: '2. Shipping Charges',
            text: 'Orders exceeding ₹499 qualify for FREE Standard Delivery. For orders below ₹499, a flat delivery fee of ₹49 is charged. NEXT grocery orders over ₹199 qualify for free instant delivery.',
          },
        ],
      };
    }

    // Default: Refund & Return Policy
    return {
      title: 'Return, Replacement & Refund Policy',
      lastUpdated: '10 October 2026',
      content: [
        {
          heading: '1. 7-Day Doorstep Replacement Guarantee',
          text: 'Customers may initiate return or size/variant replacement requests within 7 days of package delivery for apparel, lifestyle goods, electronics, and cookware.',
        },
        {
          heading: '2. Instant Refund Timelines',
          text: 'Once the returned item is picked up and verified by our courier executive, refunds are triggered immediately to your source UPI or bank account within 2-4 business hours.',
        },
      ],
    };
  };

  const policy = getPolicyDetails();
  const breadcrumbs = [{ label: 'Legal & Policies' }, { label: policy.title }];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-6 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          {policy.title}
        </h1>
        <p className="text-xs text-[#5F6368] mt-1">
          Last revised: {policy.lastUpdated} • Compliance with Consumer Protection (E-Commerce) Rules
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        {policy.content.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="font-bold text-sm text-[#202124]">{sec.heading}</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">{sec.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
