import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'grid' | 'text' | 'banner';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', count = 4 }) => {
  if (type === 'banner') {
    return (
      <div className="w-full h-80 sm:h-96 rounded-2xl bg-zinc-200 animate-pulse" />
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-zinc-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-zinc-200 rounded w-1/2 animate-pulse" />
        <div className="h-4 bg-zinc-200 rounded w-5/6 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-zinc-200 animate-pulse space-y-4">
          <div className="w-full aspect-square bg-zinc-200 rounded-xl" />
          <div className="space-y-2">
            <div className="h-3 bg-zinc-200 rounded w-1/3" />
            <div className="h-4 bg-zinc-200 rounded w-4/5" />
            <div className="h-4 bg-zinc-200 rounded w-1/2" />
          </div>
          <div className="h-8 bg-zinc-200 rounded-lg w-full" />
        </div>
      ))}
    </div>
  );
};
