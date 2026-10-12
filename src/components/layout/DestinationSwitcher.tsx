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
      activeBg: 'bg-[#A60000]',
      activeBorder: 'border-[#A60000]',
      iconBg: 'bg-rose-100 text-[#A60000]',
      iconColor: 'text-[#A60000]',
      hoverBorder: 'hover:border-[#A60000]/40 hover:bg-rose-50/40',
    },
    {
      id: 'lite',
      label: 'LITE',
      tagline: '10-15 Mins',
      icon: <Sprout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      activeBg: 'bg-[#238636]',
      activeBorder: 'border-[#238636]',
      iconBg: 'bg-emerald-100 text-[#238636]',
      iconColor: 'text-[#238636]',
      hoverBorder: 'hover:border-[#238636]/40 hover:bg-emerald-50/40',
    },
    {
      id: 'nest',
      label: 'NEST',
      tagline: 'Home Services',
      icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
      activeBg: 'bg-[#6C3FC5]',
      activeBorder: 'border-[#6C3FC5]',
      iconBg: 'bg-purple-100 text-[#6C3FC5]',
      iconColor: 'text-[#6C3FC5]',
      hoverBorder: 'hover:border-[#6C3FC5]/40 hover:bg-purple-50/40',
    },
  ];

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 ${className}`}>
      {destinations.map((dest) => {
        const isActive = destination === dest.id;
        return (
          <Link
            key={dest.id}
            to={`/${dest.id}`}
            onClick={() => setDestination(dest.id)}
            className={`group relative flex items-center gap-2 w-[122px] sm:w-[138px] h-9 sm:h-10 px-2.5 sm:px-3 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer select-none text-left shadow-2xs shrink-0 ${
              isActive
                ? `${dest.activeBg} ${dest.activeBorder} text-white shadow-xs scale-[1.01]`
                : `bg-white border-zinc-200/90 text-zinc-800 ${dest.hoverBorder} hover:shadow-xs`
            }`}
          >
            {/* Brand Icon Box */}
            <div
              className={`w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? 'bg-white/20 text-white' : dest.iconBg
              }`}
            >
              {dest.icon}
            </div>

            {/* Brand Name & Tagline */}
            <div className="flex flex-col min-w-0 pr-0.5">
              <span
                className={`font-black text-[11px] sm:text-xs tracking-tight leading-tight ${
                  isActive ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {dest.label}
              </span>
              <span
                className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate ${
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
