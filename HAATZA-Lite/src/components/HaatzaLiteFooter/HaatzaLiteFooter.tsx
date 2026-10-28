import React from 'react';
import { Link } from 'react-router-dom';

export const HaatzaLiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-6 sm:mt-8 pt-8 sm:pt-10 pb-8 select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* 4-Column Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
          {/* Column 1: Useful Links */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-[#111D15] tracking-tight">
              Useful Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Blog', href: '#' },
                { name: 'Privacy', href: '#' },
                { name: 'Terms', href: '#' },
                { name: 'FAQs', href: '#' },
                { name: 'Security', href: '#' },
                { name: 'Contact', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-[13px] font-normal text-slate-600 hover:text-[#0C831F] transition-colors duration-150 block leading-tight"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Partner Programs */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-[#111D15] tracking-tight">
              Partner Programs
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Partner', href: '#' },
                { name: 'Franchise', href: '#' },
                { name: 'Seller', href: '#' },
                { name: 'Warehouse', href: '#' },
                { name: 'Deliver', href: '#' },
                { name: 'Resources', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-[13px] font-normal text-slate-600 hover:text-[#0C831F] transition-colors duration-150 block leading-tight"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Haatza Services */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-[#111D15] tracking-tight">
              Haatza Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Marketplace', href: '/' },
                { name: 'Lite Delivery', href: '/lite' },
                { name: 'Home Services', href: '#' },
                { name: 'District Dispatch', href: '#' },
                { name: 'Feeding India', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-[13px] font-normal text-slate-600 hover:text-[#0C831F] transition-colors duration-150 block leading-tight"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Categories Directory */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold text-[#111D15] tracking-tight">
              Categories Directory
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Fruits & Vegetables', href: '/lite/categories/fruits-vegetables' },
                { name: 'Dairy & Breakfast', href: '/lite/categories/dairy-breakfast' },
                { name: 'Snacks & Beverages', href: '/lite/categories/snacks-beverages' },
                { name: 'Household Cleaning', href: '/lite/categories/household-cleaning' },
                { name: 'Personal Care', href: '/lite/categories/personal-care' },
                { name: 'Kitchen Essentials', href: '/lite/categories/kitchen-essentials' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-xs sm:text-[13px] font-normal text-slate-600 hover:text-[#0C831F] transition-colors duration-150 block leading-tight"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Utility Row: Copyright | Download App Cluster | Social Links */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Left: Copyright */}
          <div className="text-xs text-slate-500 font-normal order-3 lg:order-1 text-center lg:text-left whitespace-nowrap">
            © 2026 HAATZA Commerce Private Limited.
          </div>

          {/* Center: App Store & Google Play Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 order-1 lg:order-2 shrink-0">
            {/* Apple App Store */}
            <a
                href="#"
                className="w-[136px] sm:w-[140px] h-[40px] px-3 flex items-center gap-2.5 rounded-lg bg-[#0F1012] border border-slate-800 text-white hover:-translate-y-0.5 hover:border-[#0C831F] hover:shadow-[0_0_14px_rgba(12,131,31,0.4)] transition-all duration-150 ease-out cursor-pointer select-none shrink-0"
                aria-label="Download on the App Store"
              >
                {/* Official Apple Logo */}
                <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.83-11.89-14.36-6.19-9.55-10.9-20.19-14.13-31.93-3.23-11.74-4.85-22.9-4.85-33.48 0-14.93 3.63-27.18 10.89-36.75 7.26-9.57 16.37-14.48 27.33-14.73 4.89 0 10.35 1.25 16.37 3.75 6.02 2.5 10.05 3.75 12.09 3.75 1.63 0 5.86-1.29 12.69-3.87 6.83-2.58 12.56-3.75 17.19-3.5 12.63.75 22.84 5.41 30.63 13.98-11.01 6.64-16.34 15.8-15.99 27.48.35 9.17 3.86 16.89 10.53 23.16 6.67 6.27 14.61 9.87 23.82 10.8-2.3 6.94-5.06 14.07-8.28 21.39zm-29.58-106.82c0 6.67-2.38 13.06-7.14 19.17-5.45 6.98-12.03 11.23-19.74 12.75-.43-1.63-.65-3.14-.65-4.52 0-6.66 2.45-13.3 7.35-19.92 4.9-6.62 11.39-10.74 19.47-12.36.44 1.63.71 3.26.71 4.88z" />
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[7.5px] uppercase tracking-wider text-slate-300 font-medium">Download on the</span>
                  <span className="text-[12px] sm:text-[13px] font-bold tracking-tight text-white mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play Store */}
              <a
                href="#"
                className="w-[136px] sm:w-[140px] h-[40px] px-3 flex items-center gap-2.5 rounded-lg bg-[#0F1012] border border-slate-800 text-white hover:-translate-y-0.5 hover:border-[#0C831F] hover:shadow-[0_0_14px_rgba(12,131,31,0.4)] transition-all duration-150 ease-out cursor-pointer select-none shrink-0"
                aria-label="Get it on Google Play"
              >
                {/* Official Authentic Google Play Store Colorful Logo */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512">
                  <path fill="#00D775" d="M380.9 203.2l-58.1-33.6-67.4 67.4 67.4 67.4 58.4-33.8c16.6-9.6 16.6-57.8-.3-67.4z"/>
                  <path fill="#00B0FF" d="M30.4 20.3C24.8 26.5 21.3 36 21.3 48.4v415.2c0 12.4 3.5 21.9 9.1 28.1l2.4 2.3 232.6-232.6v-5.5L32.8 18z"/>
                  <path fill="#FF3A44" d="M265.4 256.3l-235 235.3c7.5 7.9 20.1 8.9 34.1.8l258.3-149.3-57.4-86.8z"/>
                  <path fill="#FFC107" d="M265.4 255.7l57.4-86.8L64.5 19.6C50.5 11.5 37.9 12.5 30.4 20.4l235 235.3z"/>
                </svg>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[7.5px] uppercase tracking-wider text-slate-300 font-medium">GET IT ON</span>
                  <span className="text-[12px] sm:text-[13px] font-bold tracking-tight text-white mt-0.5">Google Play</span>
                </div>
              </a>
            </div>

          {/* Right: Minimalist Circular Social Icons */}
          <div className="flex items-center gap-2.5 order-2 md:order-3">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-[#0C831F] flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="#"
              aria-label="X (formerly Twitter)"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-[#0C831F] flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-[#0C831F] flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:text-white hover:bg-[#0C831F] flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
