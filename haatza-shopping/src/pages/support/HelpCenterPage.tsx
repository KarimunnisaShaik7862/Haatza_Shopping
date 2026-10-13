import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { 
  Package, RotateCcw, CreditCard, 
  MapPin, Phone, MessageSquare, ArrowRight 
} from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const breadcrumbs = [{ label: 'Help Center' }];

  const helpTopics = [
    {
      icon: <Package className="w-6 h-6 text-[#2962FF]" />,
      title: 'Order Status & Tracking',
      description: 'Check when your shipment will arrive, track Blue Dart courier AWB numbers.',
      link: '/orders',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#2962FF]" />,
      title: 'Returns & Doorstep Pickups',
      description: 'Initiate 7-day hassle-free replacement or money-back return requests.',
      link: '/returns',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#2962FF]" />,
      title: 'Payments & Instant Refunds',
      description: 'UPI refunds, credit card transactions, invoices, and payment failure FAQs.',
      link: '/faq',
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#2962FF]" />,
      title: 'Delivery PIN Codes & Locations',
      description: 'Learn about standard delivery speeds and NEXT 15-minute quick-commerce regions.',
      link: '/shipping-policy',
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 space-y-10 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0F2042] via-[#1E40AF] to-[#2962FF] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-soft">
        <span className="text-xs font-bold uppercase tracking-wider text-[#DBEAFE]">
          24/7 Customer Care
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-sm text-[#DBEAFE]/80 max-w-lg mx-auto">
          Search frequently asked topics or get in touch with our Mumbai customer happiness squad.
        </p>
      </div>

      {/* Popular Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {helpTopics.map((topic, i) => (
          <Link
            key={i}
            to={topic.link}
            className="p-6 bg-white rounded-3xl border border-[#E5EAF3] hover:border-[#2962FF] hover:shadow-soft transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] flex items-center justify-center shrink-0">
              {topic.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#172033] group-hover:text-[#2962FF] transition-colors">
                {topic.title}
              </h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{topic.description}</p>
              <span className="text-xs font-bold text-[#2962FF] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read topic <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Contact Channels */}
      <div className="bg-[#F5F7FF] rounded-3xl border border-[#E5EAF3] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-sm">
        <div>
          <h3 className="text-lg font-bold text-[#172033]">Still Need Assistance?</h3>
          <p className="text-xs text-[#64748B] mt-1">Our dedicated team is ready 24/7 to resolve any issue.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-[#2962FF] text-white font-bold text-xs hover:bg-[#1E4ED8] transition-colors shadow-soft-sm flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With Support</span>
          </Link>
          <a
            href="tel:18004198282"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#E5EAF3] text-[#172033] font-bold text-xs hover:bg-[#EEF3FF] hover:text-[#2962FF] transition-colors flex items-center gap-2 shadow-2xs"
          >
            <Phone className="w-4 h-4" />
            <span>1800-419-8282</span>
          </a>
        </div>
      </div>
    </div>
  );
};
