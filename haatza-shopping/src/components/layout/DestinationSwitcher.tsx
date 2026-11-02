import React from 'react';
import { Link } from 'react-router-dom';
import { useDestination } from '../../context/DestinationContext';
import { DestinationType } from '../../types';
import { ShoppingBag, Sprout, Zap } from 'lucide-react';

interface DestinationSwitcherProps {
  className?: string;
}

interface DestinationCardConfig {
  id: DestinationType;
  label: string;
  tagline: string;
  icon: React.ReactNode;
  activeBg: string;
  activeBorder: string;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
}

export const DestinationSwitcher: React.FC<DestinationSwitcherProps> = ({ className = '' }) => {
  const { destination, setDestination } = useDestination();

  const destinations: DestinationCardConfig[] = [
    {
      id: 'haatza',
      label: 'HAATZA',
      tagline: 'Marketplace',
      icon: <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      activeBg: 'bg-[#00C853] shadow-[0_0_16px_rgba(0,230,118,0.45)]',
      activeBorder: 'border-[#00C853]',
      iconBg: 'bg-emerald-50 text-[#00C853]',
      iconColor: 'text-[#00C853]',
      hoverBorder: 'hover:border-[#00C853]/40 hover:bg-emerald-50/40',
    },
    {
      id: 'lite',
      label: 'LITE',
      tagline: '10-15 Mins',
      icon: <Sprout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      activeBg: 'bg-[#00C853] shadow-[0_0_16px_rgba(0,230,118,0.45)]',
      activeBorder: 'border-[#00C853]',
      iconBg: 'bg-emerald-50 text-[#00C853]',
      iconColor: 'text-[#00C853]',
      hoverBorder: 'hover:border-[#00C853]/40 hover:bg-emerald-50/40',
    },
    {
      id: 'nest',
      label: 'NEST',
      tagline: 'Home Services',
      icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      activeBg: 'bg-[#00C853] shadow-[0_0_16px_rgba(0,230,118,0.45)]',
      activeBorder: 'border-[#00C853]',
      iconBg: 'bg-emerald-50 text-[#00C853]',
      iconColor: 'text-[#00C853]',
      hoverBorder: 'hover:border-[#00C853]/40 hover:bg-emerald-50/40',
    },
  ];

  return (
    <div className={`flex items-center gap-1 sm:gap-2.5 ${className}`}>
      {destinations.map((dest) => {
        const isActive = destination === dest.id;
        return (
          <Link
            key={dest.id}
            to={dest.id === 'haatza' ? '/' : `/${dest.id}`}
            onClick={() => setDestination(dest.id)}
            className={`group relative flex items-center gap-1.5 sm:gap-2 w-[100px] sm:w-[138px] h-8 sm:h-10 px-2 sm:px-3 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer select-none text-left shadow-2xs shrink-0 ${
              isActive
                ? `${dest.activeBg} ${dest.activeBorder} text-white shadow-xs scale-[1.01]`
                : `bg-white border-zinc-200/90 text-zinc-800 ${dest.hoverBorder} hover:shadow-xs`
            }`}
          >
            {/* Brand Icon Box */}
            <div
              className={`w-5 h-5 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? 'bg-white/20 text-white' : dest.iconBg
              }`}
            >
              {dest.icon}
            </div>

            {/* Brand Name & Tagline */}
            <div className="flex flex-col min-w-0 pr-0.5">
              <span
                className={`font-black text-[10px] sm:text-xs tracking-tight leading-tight ${
                  isActive ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {dest.label}
              </span>
              <span
                className={`text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate ${
                  isActive ? 'text-white/80' : 'text-zinc-400 group-hover:text-zinc-600'
                }`}
              >
                {dest.tagline}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
