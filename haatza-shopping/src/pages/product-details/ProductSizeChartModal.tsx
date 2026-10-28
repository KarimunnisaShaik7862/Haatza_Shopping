import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { MENS_SIZE_CHART, WOMENS_SIZE_CHART } from './productDetailHelper';

interface ProductSizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  isWomens?: boolean;
}

export const ProductSizeChartModal: React.FC<ProductSizeChartModalProps> = ({
  isOpen,
  onClose,
  isWomens = false,
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const data = isWomens ? WOMENS_SIZE_CHART : MENS_SIZE_CHART;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-chart-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2962FF] flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 id="size-chart-title" className="text-base font-bold text-slate-900 font-heading">
                {isWomens ? "Women's Fashion Size Guide" : "Men's Fashion Size Guide"}
              </h3>
              <p className="text-xs text-slate-500 font-body">
                Standard garment body measurements in {unit === 'inches' ? 'inches' : 'centimeters'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Unit Toggle */}
            <div className="flex items-center p-1 bg-white border border-slate-200 rounded-lg text-xs font-bold font-heading">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unit === 'inches'
                    ? 'bg-[#2962FF] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Inches
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unit === 'cm'
                    ? 'bg-[#2962FF] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                CM
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close size guide"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider text-[11px] font-heading">
                <tr>
                  <th className="py-3 px-4 border-b border-slate-200">Size Tag</th>
                  <th className="py-3 px-4 border-b border-slate-200">{isWomens ? 'Bust' : 'Chest'}</th>
                  <th className="py-3 px-4 border-b border-slate-200">Waist</th>
                  <th className="py-3 px-4 border-b border-slate-200">{isWomens ? 'Hip' : 'Shoulder'}</th>
                  <th className="py-3 px-4 border-b border-slate-200">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-3 px-4 font-bold text-slate-900 font-heading">{row.size}</td>
                    <td className="py-3 px-4">
                      {isWomens
                        ? (unit === 'inches' ? (row as any).bustInches : (row as any).bustCm)
                        : (unit === 'inches' ? (row as any).chestInches : (row as any).chestCm)}
                    </td>
                    <td className="py-3 px-4">
                      {unit === 'inches' ? row.waistInches : row.waistCm}
                    </td>
                    <td className="py-3 px-4">
                      {isWomens
                        ? (unit === 'inches' ? (row as any).hipInches : (row as any).hipCm || '—')
                        : (unit === 'inches' ? (row as any).shoulderInches : (row as any).shoulderCm || '—')}
                    </td>
                    <td className="py-3 px-4">
                      {unit === 'inches' ? (row as any).lengthInches : (row as any).lengthCm || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measuring Tips */}
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#1E40AF] font-heading">
              <HelpCircle className="w-4 h-4 text-[#2962FF]" />
              <span>How to Measure for the Best Fit</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 font-body">
              <li><strong>{isWomens ? 'Bust' : 'Chest'}:</strong> Measure around the fullest part of your {isWomens ? 'bust' : 'chest'}, keeping the tape level under arms.</li>
              <li><strong>Waist:</strong> Measure around your natural waistline, where your trousers or skirt normally sit.</li>
              <li><strong>Length:</strong> Measured from the highest point of shoulder straight down to the hem.</li>
              <li>If you prefer a relaxed comfort drape, we suggest selecting one size up.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold rounded-xl text-xs transition-colors font-heading shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
