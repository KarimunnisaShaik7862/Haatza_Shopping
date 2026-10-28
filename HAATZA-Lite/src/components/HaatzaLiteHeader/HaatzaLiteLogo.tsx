import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sprout } from 'lucide-react';

export const HaatzaLiteLogo: React.FC = () => {
  return (
    <Link to="/lite" className="flex items-center gap-2.5 group select-none cursor-pointer">
      <div className="w-10 h-10 rounded-2xl bg-[#0C831F] text-white flex items-center justify-center shadow-[0_3px_10px_rgba(12,131,31,0.3)] group-hover:scale-105 transition-transform duration-200">
        <Sprout className="w-5 h-5 text-white stroke-[2.2]" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-black text-xl tracking-tight text-[#111D15] font-heading">HAATZA</span>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#0C831F] text-white tracking-wider flex items-center gap-0.5 shadow-2xs">
            <Zap className="w-2.5 h-2.5 fill-current text-white" /> LITE
          </span>
        </div>
        <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-[#0C831F] leading-none mt-1">
          10-15 Mins Groceries
        </span>
      </div>
    </Link>
  );
};
