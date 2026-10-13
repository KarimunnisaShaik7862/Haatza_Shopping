import React from 'react';
import { Loader2 } from 'lucide-react';

interface HaatzaNestLoadingProps {
  type?: 'spinner' | 'skeleton';
  count?: number;
  message?: string;
}

export const HaatzaNestLoading: React.FC<HaatzaNestLoadingProps> = ({
  type = 'spinner',
  count = 3,
  message = 'Connecting to verified service pros...',
}) => {
  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3">
        <Loader2 className="w-8 h-8 text-[#6C3FC5] animate-spin" />
        <span className="text-xs font-semibold text-zinc-500">{message}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-3xl p-5 border border-zinc-100 space-y-3">
          <div className="h-44 bg-zinc-100 rounded-2xl w-full" />
          <div className="h-4 bg-zinc-100 rounded w-1/3" />
          <div className="h-5 bg-zinc-100 rounded w-3/4" />
          <div className="h-10 bg-zinc-100 rounded w-full mt-4" />
        </div>
      ))}
    </div>
  );
};
