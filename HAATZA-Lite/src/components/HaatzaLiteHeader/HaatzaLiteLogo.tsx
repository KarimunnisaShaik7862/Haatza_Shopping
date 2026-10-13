import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sprout } from 'lucide-react';

export const HaatzaLiteLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group select-none">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#238636] to-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform">
        <Sprout className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-black text-xl tracking-tight text-zinc-900 font-heading">HAATZA</span>
          <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-[#238636] text-white tracking-wider flex items-center gap-0.5 shadow-2xs">
            <Zap className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" /> LITE
          </span>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#238636] leading-none mt-0.5">
          10-15 Mins Groceries
        </span>
      </div>
    </Link>
  );
};
