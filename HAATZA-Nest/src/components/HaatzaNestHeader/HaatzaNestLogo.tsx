import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export const HaatzaNestLogo: React.FC = () => {
  return (
    <Link to="/nest" className="flex items-center gap-2 group select-none">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C3FC5] to-indigo-900 text-white flex items-center justify-center shadow-md shadow-purple-900/10 group-hover:scale-105 transition-transform">
        <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-black text-xl tracking-tight text-zinc-900 font-heading">HAATZA</span>
          <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-[#6C3FC5] text-white tracking-wider flex items-center gap-0.5 shadow-2xs">
            NEST
          </span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#6C3FC5] leading-none mt-0.5">
          Home Services
        </span>
      </div>
    </Link>
  );
};
