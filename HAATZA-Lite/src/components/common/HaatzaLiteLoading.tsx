import React from 'react';
import { Loader2 } from 'lucide-react';

interface HaatzaLiteLoadingProps {
  type?: 'spinner' | 'skeleton' | 'grid';
  count?: number;
  message?: string;
}

export const HaatzaLiteLoading: React.FC<HaatzaLiteLoadingProps> = ({
  type = 'spinner',
  count = 6,
  message = 'Loading farm fresh groceries in 10-15 mins...',
}) => {
  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center p-14 space-y-4">
        <Loader2 className="w-10 h-10 text-[#0C831F] animate-spin stroke-[2.5]" />
        <span className="text-xs font-bold text-slate-500 tracking-wide">{message}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4.5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-3xl p-3.5 border border-[#E5EBE6] space-y-3 shadow-2xs">
          <div className="aspect-square bg-[#F4F8F5] rounded-2xl w-full" />
          <div className="h-3 bg-[#EAF8ED] rounded-full w-1/3" />
          <div className="h-4 bg-[#F2FBF4] rounded-full w-3/4" />
          <div className="h-8 bg-[#F4F8F5] rounded-xl w-full mt-3" />
        </div>
      ))}
    </div>
  );
};
