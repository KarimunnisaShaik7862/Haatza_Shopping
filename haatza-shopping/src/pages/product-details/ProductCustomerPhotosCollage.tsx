import React, { useState, useEffect } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface CustomerPhotoMeta {
  url: string;
  userName?: string;
  rating?: number;
  date?: string;
  comment?: string;
}

interface ProductCustomerPhotosCollageProps {
  photos: string[];
  photoMetaList?: CustomerPhotoMeta[];
  onPhotoClick?: (index: number) => void;
}

export const ProductCustomerPhotosCollage: React.FC<ProductCustomerPhotosCollageProps> = ({
  photos,
  photoMetaList = [],
  onPhotoClick,
}) => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : null
        );
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, photos.length]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const handleOpenPhoto = (index: number) => {
    if (onPhotoClick) {
      onPhotoClick(index);
    }
    setActiveLightboxIndex(index);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % photos.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + photos.length) % photos.length);
  };

  const count = photos.length;
  const currentMeta = activeLightboxIndex !== null ? photoMetaList[activeLightboxIndex] : undefined;

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Customer-Uploaded Photos
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                {count} {count === 1 ? 'photo' : 'photos'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-body">
              Real photos taken and shared by verified purchasers
            </p>
          </div>
        </div>

        {count > 0 && (
          <button
            type="button"
            onClick={() => handleOpenPhoto(0)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#2962FF] text-xs font-bold transition-all shadow-2xs font-heading cursor-pointer self-start sm:self-auto"
          >
            <Eye className="w-3.5 h-3.5 text-[#2962FF]" />
            <span>View All Photos ({count})</span>
          </button>
        )}
      </div>

      {/* Dynamic Editorial Collage Layout according to photo count */}
      {/* 1 IMAGE: One large natural aspect ratio hero card */}
      {count === 1 && (
        <div className="max-w-lg">
          <div
            onClick={() => handleOpenPhoto(0)}
            className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
          >
            <img
              src={optimizeImageUrl(photos[0], { width: 900, quality: 85 })}
              alt="Customer review photo"
              className="w-full max-h-[380px] sm:max-h-[440px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-heading">
                <Maximize2 className="w-3.5 h-3.5" /> Click to view full image
              </span>
              <span className="text-[11px] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded font-mono">
                1 of 1
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2 IMAGES: Two balanced photos side by side */}
      {count === 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-2xl">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenPhoto(idx)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
            >
              <img
                src={optimizeImageUrl(photo, { width: 650, quality: 85 })}
                alt={`Customer review photo ${idx + 1}`}
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs">
                  <Maximize2 className="w-4 h-4 text-[#2962FF]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3 IMAGES: Collage with 1 larger feature image + 2 smaller stacked images */}
      {count === 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 max-w-3xl">
          {/* Feature Photo */}
          <div
            onClick={() => handleOpenPhoto(0)}
            className="sm:col-span-7 group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
          >
            <img
              src={optimizeImageUrl(photos[0], { width: 750, quality: 85 })}
              alt="Customer photo 1"
              className="w-full h-64 sm:h-[332px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2.5 rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs">
                <Maximize2 className="w-4 h-4 text-[#2962FF]" />
              </span>
            </div>
          </div>

          {/* Two stacked photos */}
          <div className="sm:col-span-5 grid grid-cols-2 sm:grid-cols-1 gap-3.5 sm:gap-4">
            {photos.slice(1, 3).map((photo, i) => (
              <div
                key={i}
                onClick={() => handleOpenPhoto(i + 1)}
                className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
              >
                <img
                  src={optimizeImageUrl(photo, { width: 500, quality: 85 })}
                  alt={`Customer photo ${i + 2}`}
                  className="w-full h-32 sm:h-[158px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5 text-[#2962FF]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4 IMAGES: Clean 2x2 grid preserving natural proportions */}
      {count === 4 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenPhoto(idx)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
            >
              <img
                src={optimizeImageUrl(photo, { width: 500, quality: 85 })}
                alt={`Customer photo ${idx + 1}`}
                className="w-full h-44 sm:h-52 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs">
                  <Maximize2 className="w-3.5 h-3.5 text-[#2962FF]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5 OR MORE IMAGES: Editorial e-commerce collage with hero tile + supporting tiles & "+N more" overlay */}
      {count >= 5 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl">
          {/* Hero Feature Tile (Spans 2 columns & 2 rows on tablet/desktop) */}
          <div
            onClick={() => handleOpenPhoto(0)}
            className="col-span-2 row-span-2 group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
          >
            <img
              src={optimizeImageUrl(photos[0], { width: 850, quality: 85 })}
              alt="Customer feature photo"
              className="w-full h-64 sm:h-[348px] object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-heading">
                <Maximize2 className="w-3.5 h-3.5" /> View Photo
              </span>
              <span className="text-[11px] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded font-mono">
                1 of {count}
              </span>
            </div>
          </div>

          {/* Tiles 1, 2, 3 */}
          {photos.slice(1, 4).map((photo, i) => (
            <div
              key={i}
              onClick={() => handleOpenPhoto(i + 1)}
              className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
            >
              <img
                src={optimizeImageUrl(photo, { width: 450, quality: 85 })}
                alt={`Customer photo ${i + 2}`}
                className="w-full h-32 sm:h-[166px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-1.5 rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs">
                  <Maximize2 className="w-3.5 h-3.5 text-[#2962FF]" />
                </span>
              </div>
            </div>
          ))}

          {/* Tile 4 (With overlay if count > 5, or normal tile if exactly 5) */}
          <div
            onClick={() => handleOpenPhoto(4)}
            className="col-span-1 row-span-1 group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-50 cursor-pointer shadow-soft-sm hover:shadow-md transition-all"
          >
            <img
              src={optimizeImageUrl(photos[4], { width: 450, quality: 85 })}
              alt="Customer photo 5"
              className="w-full h-32 sm:h-[166px] object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {count > 5 ? (
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] hover:bg-black/75 transition-colors flex flex-col items-center justify-center text-white p-2 text-center">
                <span className="text-lg sm:text-xl font-black font-heading tracking-tight">
                  +{count - 4}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-slate-200 font-heading">
                  More Photos
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-1.5 rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs">
                  <Maximize2 className="w-3.5 h-3.5 text-[#2962FF]" />
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Lightbox Viewer */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 text-white z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                  {activeLightboxIndex + 1} / {photos.length}
                </span>
                {currentMeta?.userName && (
                  <span className="text-xs text-slate-300 font-heading hidden sm:inline">
                    Photo uploaded by <strong className="text-white">{currentMeta.userName}</strong>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close photo viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Display with Navigation Arrows */}
            <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 min-h-[320px] max-h-[68vh] overflow-hidden bg-black/40">
              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-xs cursor-pointer z-10 border border-white/10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              <img
                src={photos[activeLightboxIndex]}
                alt={`Customer photo ${activeLightboxIndex + 1}`}
                className="max-h-[64vh] max-w-full object-contain rounded-xl select-none"
              />

              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors backdrop-blur-xs cursor-pointer z-10 border border-white/10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Strip for Fast Navigation */}
            {photos.length > 1 && (
              <div className="px-4 py-3 bg-slate-900 border-t border-slate-800/80 flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveLightboxIndex(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      idx === activeLightboxIndex
                        ? 'border-[#2962FF] scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={optimizeImageUrl(photo, { width: 120, quality: 75 })}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
