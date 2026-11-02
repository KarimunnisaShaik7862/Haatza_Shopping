import React from 'react';
import { HaatzaLiteCategoryCinematicBanner } from '../HaatzaLiteBanners/HaatzaLiteCategoryCinematicBanner';
import { HaatzaLiteCategoryExperienceStrip } from '../HaatzaLiteNavigation/HaatzaLiteCategoryExperienceStrip';

interface HaatzaLiteCategoryShowcaseProps {
  title: string;
  children: React.ReactNode;
}

export const HaatzaLiteCategoryShowcase: React.FC<HaatzaLiteCategoryShowcaseProps> = ({
  title,
  children,
}) => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-4 sm:space-y-6 lg:space-y-8">
      {/* 1. Cinematic Animated Category Banner (Matched to Homepage Hero Banner dimensions) */}
      <HaatzaLiteCategoryCinematicBanner title={title} />

      {/* 2. Subcategory section regarding the category page */}
      <HaatzaLiteCategoryExperienceStrip title={title} />

      {/* 3. Rich Emerald Showcase Container with Rounded Corners & Soft Outer Shadow */}
      <div className="relative rounded-2xl sm:rounded-[36px] bg-gradient-to-br from-[#17804b] via-[#116a3c] to-[#094c2a] p-2.5 sm:p-5 lg:p-6 shadow-[0_20px_60px_-12px_rgba(4,40,20,0.45)] border border-emerald-400/30 overflow-hidden">
        
        {/* Ambient Radial Highlights Behind the Content */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-emerald-400/20 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] bg-emerald-300/15 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -top-20 -right-20 w-[420px] h-[420px] bg-emerald-300/15 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Luminous Flowing Wave Ribbons on Edges and Corners */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0">
          <svg
            className="w-full h-full haatza-aurora-waves opacity-80"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="neon-glow-ribbon" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur1" />
                <feGaussianBlur stdDeviation="10" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="neon-stream-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#34D399" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="neon-stream-2" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#34D399" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Left & Bottom-Left Flowing Curved Energy Lines */}
            <path
              d="M -30,160 C 140,110 220,290 90,460 C -10,610 50,730 210,830"
              fill="none"
              stroke="url(#neon-stream-1)"
              strokeWidth="2.2"
              filter="url(#neon-glow-ribbon)"
            />
            <path
              d="M -15,190 C 110,140 180,320 80,480 C 0,620 70,750 250,830"
              fill="none"
              stroke="url(#neon-stream-2)"
              strokeWidth="1.5"
            />
            <path
              d="M -45,230 C 80,180 150,350 70,510 C -10,650 30,770 170,840"
              fill="none"
              stroke="url(#neon-stream-1)"
              strokeWidth="1.8"
              opacity="0.7"
            />
            <path
              d="M -10,280 C 60,240 120,390 50,540 C -20,680 10,790 120,845"
              fill="none"
              stroke="url(#neon-stream-2)"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <path
              d="M -60,110 C 170,70 260,250 120,420 C 10,560 90,700 290,820"
              fill="none"
              stroke="url(#neon-stream-1)"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Right & Top-Right Flowing Curved Energy Lines */}
            <path
              d="M 1230,640 C 1060,690 980,510 1110,340 C 1210,210 1150,70 990,-30"
              fill="none"
              stroke="url(#neon-stream-1)"
              strokeWidth="2.2"
              filter="url(#neon-glow-ribbon)"
            />
            <path
              d="M 1215,610 C 1090,660 1020,480 1120,320 C 1200,180 1130,50 950,-20"
              fill="none"
              stroke="url(#neon-stream-2)"
              strokeWidth="1.5"
            />
            <path
              d="M 1245,570 C 1120,620 1050,450 1130,290 C 1210,150 1170,30 1030,-40"
              fill="none"
              stroke="url(#neon-stream-1)"
              strokeWidth="1.8"
              opacity="0.7"
            />
            <path
              d="M 1210,520 C 1140,560 1080,410 1150,260 C 1220,120 1190,10 1080,-45"
              fill="none"
              stroke="url(#neon-stream-2)"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <path
              d="M 1260,690 C 1030,730 940,550 1080,380 C 1190,240 1110,100 910,-10"
              fill="none"
              stroke="url(#neon-stream-1)"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Category Header Title Centered at Top with Soft Luminous Text Glow */}
        <div className="relative z-10 text-center mb-3.5 sm:mb-4.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]">
            {title}
          </h1>
        </div>

        {/* Product Cards Grid Wrapper */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};
