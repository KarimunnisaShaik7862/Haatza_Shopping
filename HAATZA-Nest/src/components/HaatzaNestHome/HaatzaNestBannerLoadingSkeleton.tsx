import React from 'react';

export const HaatzaNestBannerLoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div 
      aria-label="Checking service availability in your area" 
      aria-busy="true"
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 animate-pulse ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch pt-2">
        {/* Left Panel Skeleton */}
        <div className="rounded-3xl bg-purple-100/40 border border-[#E9E1F8] p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-6 h-full">
          <div className="space-y-2">
            <div className="h-4 w-36 bg-purple-200/60 rounded-full" />
            <div className="h-7 w-64 sm:w-72 bg-purple-200/70 rounded-xl" />
            <div className="h-3.5 w-52 bg-purple-100/80 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-stretch pt-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E9E1F8] h-36 flex flex-col justify-between">
              <div className="h-5 w-20 bg-purple-100 rounded-full" />
              <div className="space-y-1">
                <div className="h-4 w-24 bg-purple-200/70 rounded-xl" />
                <div className="h-3 w-32 bg-purple-100 rounded-full" />
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E9E1F8] h-36 flex flex-col justify-between">
              <div className="h-5 w-24 bg-purple-100 rounded-full" />
              <div className="space-y-1">
                <div className="h-4 w-28 bg-purple-200/70 rounded-xl" />
                <div className="h-3 w-28 bg-purple-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel Skeleton */}
        <div className="rounded-3xl bg-purple-100/40 border border-[#E9E1F8] p-0 sm:p-1 lg:p-1.5 flex items-center justify-center h-full min-h-[280px]">
          <div className="w-full h-full min-h-[240px] rounded-2xl bg-purple-200/50" />
        </div>
      </div>
    </div>
  );
};

export default HaatzaNestBannerLoadingSkeleton;
