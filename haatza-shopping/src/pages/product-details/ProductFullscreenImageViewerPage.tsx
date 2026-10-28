import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, X, AlertCircle } from 'lucide-react';
import { productService } from '../../services/productService';
import { getProductImages } from './productDetailHelper';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import type { Product } from '../../types/product.types';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85';

export const ProductFullscreenImageViewerPage: React.FC = () => {
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const initialIndex = parseInt(searchParams.get('index') || '0', 10);
    if (!isNaN(initialIndex) && initialIndex >= 0) {
      setSelectedIndex(initialIndex);
    }
  }, [searchParams]);

  useEffect(() => {
    async function loadProduct() {
      if (!idOrSlug) return;
      setLoading(true);
      try {
        const prod = await productService.getProductByIdOrSlug(idOrSlug);
        setProduct(prod);
      } catch (err) {
        console.error('Error loading product for fullscreen view:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [idOrSlug]);

  const images = product ? getProductImages(product) : [];
  const activeImage = images[selectedIndex] || images[0] || FALLBACK_IMAGE;

  const handleBack = () => {
    if (idOrSlug) {
      navigate(`/product/${idOrSlug}`);
    } else {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-700">
        <div className="w-10 h-10 border-3 border-[#2962FF] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-500">Loading high-resolution images...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-700">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-3" />
        <h1 className="text-lg font-bold text-slate-900 mb-2">Product Not Found</h1>
        <p className="text-sm text-slate-500 mb-4">Unable to display fullscreen images for this product.</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#2962FF] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col select-none">
      {/* Top Header Bar with Pure White Background & Subtle Border */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Back to Product Link */}
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#2962FF] transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-slate-50"
          aria-label="Back to product details"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Product</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Center: Product Title & Category */}
        <div className="flex-1 text-center min-w-0 px-2">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {product.name}
          </h1>
          <p className="text-xs text-slate-500 truncate">
            {product.brand ? `${product.brand} • ` : ''}
            {product.categoryName || "Women's Fashion"}
          </p>
        </div>

        {/* Right: Close Button */}
        <button
          type="button"
          onClick={handleBack}
          className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close fullscreen view"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Main Large Image Display Area (Pure White Background) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white overflow-hidden">
        <div className="w-full max-w-4xl h-[62vh] sm:h-[68vh] lg:h-[72vh] flex items-center justify-center">
          <img
            src={optimizeImageUrl(activeImage, { width: 1400, quality: 90 })}
            alt={`${product.name} - View ${selectedIndex + 1}`}
            className="max-h-full max-w-full w-auto h-auto object-contain transition-all duration-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
        </div>
      </main>

      {/* Bottom Horizontal Row: Single row of small thumbnails */}
      <footer className="sticky bottom-0 z-30 bg-white border-t border-slate-200/80 py-3.5 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
          {/* Horizontal Single Row of Small Thumbnails */}
          <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 overflow-x-auto max-w-full py-1 px-2 no-scrollbar">
            {images.map((img, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`relative w-12 h-14 sm:w-16 sm:h-20 lg:w-18 lg:h-22 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-slate-50 ${
                    isSelected
                      ? 'border-[#2962FF] ring-2 ring-[#2962FF]/25 scale-105 shadow-sm'
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={optimizeImageUrl(img, { width: 160, quality: 75 })}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                  />
                  {isSelected && (
                    <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#2962FF]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Indicator text */}
          <div className="text-[12px] text-slate-500 font-medium">
            Image {selectedIndex + 1} of {images.length}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductFullscreenImageViewerPage;
