import React from 'react';
import { Link } from 'react-router-dom';

export const FooterLinks: React.FC = () => {
  return (
    <>
      {/* Destinations */}
      <div className="space-y-2.5">
        <h5 className="font-bold text-white uppercase tracking-wider text-[11px] font-heading">Destinations</h5>
        <ul className="space-y-1.5 text-blue-100/80 font-body">
          <li><Link to="/haatza" className="hover:text-white transition-colors">HAATZA Marketplace</Link></li>
          <li><Link to="/lite" className="hover:text-white transition-colors">LITE Quick Commerce ⚡</Link></li>
          <li><Link to="/nest" className="hover:text-white transition-colors">NEST Home Services</Link></li>
          <li><Link to="/products?filter=trending" className="hover:text-white transition-colors">Trending Products</Link></li>
          <li><Link to="/products?filter=deals" className="hover:text-white transition-colors">Daily Deals & Offers</Link></li>
        </ul>
      </div>

      {/* Customer Service */}
      <div className="space-y-2.5">
        <h5 className="font-bold text-white uppercase tracking-wider text-[11px] font-heading">Customer Service</h5>
        <ul className="space-y-1.5 text-blue-100/80 font-body">
          <li><Link to="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
          <li><Link to="/returns" className="hover:text-white transition-colors">Return Request</Link></li>
          <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
          <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors">About HAATZA</Link></li>
        </ul>
      </div>

      {/* Policies */}
      <div className="space-y-2.5">
        <h5 className="font-bold text-white uppercase tracking-wider text-[11px] font-heading">Policies & Legal</h5>
        <ul className="space-y-1.5 text-blue-100/80 font-body">
          <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
          <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation</Link></li>
          <li><Link to="/account/addresses" className="hover:text-white transition-colors">Saved Addresses</Link></li>
        </ul>
      </div>
    </>
  );
};

export default FooterLinks;
