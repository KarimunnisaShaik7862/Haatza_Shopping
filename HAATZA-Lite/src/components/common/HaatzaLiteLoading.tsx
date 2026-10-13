import React from 'react';
import { Loader2 } from 'lucide-react';

interface HaatzaLiteLoadingProps {
  type?: 'spinner' | 'skeleton' | 'grid';
  count?: number;
  message?: string;
}

export const HaatzaLiteLoading: React.FC<HaatzaLiteLoadingProps> = ({
  type = 'spinner',
  count = 4,
  message = 'Loading groceries in 10-15 mins...',
}) => {
  if (type === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3">
        <Loader2 className="w-8 h-8 text-[#238636] animate-spin" />
        <span className="text-xs font-semibold text-zinc-500">{message}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-3 border border-zinc-100 space-y-2">
          <div className="aspect-square bg-zinc-100 rounded-xl w-full" />
          <div className="h-3 bg-zinc-100 rounded w-1/3" />
          <div className="h-4 bg-zinc-100 rounded w-3/4" />
          <div className="h-6 bg-zinc-100 rounded w-full mt-2" />
        </div>
      ))}
    </div>
  );
};
