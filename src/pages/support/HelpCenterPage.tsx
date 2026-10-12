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
      icon: <Package className="w-6 h-6 text-[#E53935]" />,
      title: 'Order Status & Tracking',
      description: 'Check when your shipment will arrive, track Blue Dart courier AWB numbers.',
      link: '/orders',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#E53935]" />,
      title: 'Returns & Doorstep Pickups',
      description: 'Initiate 7-day hassle-free replacement or money-back return requests.',
      link: '/returns',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#E53935]" />,
      title: 'Payments & Instant Refunds',
      description: 'UPI refunds, credit card transactions, invoices, and payment failure FAQs.',
      link: '/faq',
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#E53935]" />,
      title: 'Delivery PIN Codes & Locations',
      description: 'Learn about standard delivery speeds and NEXT 15-minute quick-commerce regions.',
      link: '/shipping-policy',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-neutral-900 to-zinc-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-lg">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
          24/7 Customer Care
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto">
          Search frequently asked topics or get in touch with our Mumbai customer happiness squad.
        </p>
      </div>

      {/* Popular Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {helpTopics.map((topic, i) => (
          <Link
            key={i}
            to={topic.link}
            className="p-6 bg-white rounded-3xl border border-zinc-200 hover:border-[#E53935] hover:shadow-md transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFEBEE] flex items-center justify-center shrink-0">
              {topic.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-[#202124] group-hover:text-[#E53935] transition-colors">
                {topic.title}
              </h3>
              <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">{topic.description}</p>
              <span className="text-xs font-bold text-[#E53935] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read topic <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Contact Channels */}
      <div className="bg-zinc-50 rounded-3xl border border-zinc-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-[#202124]">Still Need Assistance?</h3>
          <p className="text-xs text-[#5F6368] mt-1">Our dedicated team is ready 24/7 to resolve any issue.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-[#E53935] text-white font-bold text-xs hover:bg-[#D32F2F] transition-colors shadow-2xs flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With Support</span>
          </Link>
          <a
            href="tel:18004198282"
            className="px-5 py-2.5 rounded-xl bg-white border border-zinc-300 text-zinc-800 font-bold text-xs hover:bg-zinc-100 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>1800-419-8282</span>
          </a>
        </div>
      </div>
    </div>
  );
};
