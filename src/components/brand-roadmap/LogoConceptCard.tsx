import React, { useState } from 'react';
import type { LogoConcept } from '../../types/project';

interface LogoConceptCardProps {
  concept: LogoConcept;
  isSelected: boolean;
  onSelect: () => void;
}

export const LogoConceptCard: React.FC<LogoConceptCardProps> = ({
  concept,
  isSelected,
  onSelect,
}) => {
  const [viewMode, setViewMode] = useState<'combination' | 'mark' | 'wordmark'>(
    concept.customization.layout === 'mark_only'
      ? 'mark'
      : concept.customization.layout === 'wordmark_only'
      ? 'wordmark'
      : 'combination'
  );

  const getFontFamily = (treatment: string) => {
    switch (treatment) {
      case 'Monospace Geometric':
        return 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      case 'Classic Serif':
        return 'Georgia, Cambria, "Times New Roman", Times, serif';
      case 'Grotesque Bold':
        return '"Helvetica Neue", Arial, sans-serif';
      case 'Modern Tech Sans':
      default:
        return 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    }
  };

  const scale = (concept.customization.symbolScale || 100) / 100;

  return (
    <div
      className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
        isSelected
          ? 'bg-[#EEF4FB] border-[#14213D]/60 shadow-xl ring-2 ring-[#14213D]/50 scale-[1.02]'
          : 'bg-white border-[#E2EAF4] hover:border-[#2684F7]/40 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] bg-[#14213D]/10 px-2 py-0.5 rounded border border-[#14213D]/20 font-bold">
              {concept.style}
            </span>
            <span className="text-[10px] font-mono text-[#60738F]">
              {concept.personalityAlignment}
            </span>
          </div>

          {isSelected ? (
            <span className="text-[10px] font-mono font-bold text-[#19A875] bg-[#E8F8F1] px-2.5 py-0.5 rounded-full border border-[#19A875]/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19A875]" />
              SELECTED BRAND MARK
            </span>
          ) : (
            <span className="text-[10px] font-mono text-[#60738F]">
              Candidate
            </span>
          )}
        </div>

        {/* Concept Title */}
        <h3 className="text-base font-bold text-[#14213D] mb-1">
          {concept.name}
        </h3>
        <p className="text-xs text-[#60738F] mb-2.5 line-clamp-2">
          {concept.rationale}
        </p>

        {/* Usage Suitability */}
        {concept.usageSuitability && (
          <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4]/80 text-[10px] font-mono text-[#60738F]">
            <span className="font-bold text-[#14213D]">SUITABILITY: </span>
            {concept.usageSuitability}
          </div>
        )}

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#EEF4FB] rounded-xl border border-[#E2EAF4] mb-3 text-[10px] font-mono overflow-hidden">
          <button
            type="button"
            onClick={() => setViewMode('combination')}
            className={`flex-1 py-1 rounded transition-colors text-center ${
              viewMode === 'combination' ? 'bg-[#EEF4FB] text-[#14213D] font-bold' : 'text-[#60738F] hover:text-[#60738F]'
            }`}
          >
            Combo
          </button>
          <button
            type="button"
            onClick={() => setViewMode('mark')}
            className={`flex-1 py-1 rounded transition-colors text-center ${
              viewMode === 'mark' ? 'bg-[#EEF4FB] text-[#14213D] font-bold' : 'text-[#60738F] hover:text-[#60738F]'
            }`}
          >
            Mark Only
          </button>
          <button
            type="button"
            onClick={() => setViewMode('wordmark')}
            className={`flex-1 py-1 rounded transition-colors text-center ${
              viewMode === 'wordmark' ? 'bg-[#EEF4FB] text-[#14213D] font-bold' : 'text-[#60738F] hover:text-[#60738F]'
            }`}
          >
            Wordmark
          </button>
        </div>

        {/* Visual Logo Stage Canvas */}
        <div
          className="w-full aspect-[16/10] rounded-xl border border-[#E2EAF4] flex items-center justify-center p-6 relative overflow-hidden group"
          style={{ backgroundColor: concept.customization.backgroundColor || '#EEF4FB' }}
        >          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14213D_1px,transparent_1px)] [background-size:16px_16px]" />

          {viewMode === 'mark' && (
            <div
              className="w-24 h-24 flex items-center justify-center relative z-10 transition-transform group-hover:scale-105"
              style={{ transform: `scale(${scale})` }}
              dangerouslySetInnerHTML={{ __html: concept.svgMarkup }}
            />
          )}

          {viewMode === 'wordmark' && (
            <div className="relative z-10 text-center">
              <span
                className="text-2xl font-black tracking-tight text-[#14213D]"
                style={{ fontFamily: getFontFamily(concept.customization.fontTreatment) }}
              >
                {concept.wordmark}
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#14213D] mt-1">
                VENTURE IDENTITY
              </span>
            </div>
          )}

          {viewMode === 'combination' && (
            <div className="flex flex-col items-center gap-3 relative z-10 transition-transform group-hover:scale-105">
              <div
                className="w-16 h-16 flex items-center justify-center"
                style={{ transform: `scale(${scale})` }}
                dangerouslySetInnerHTML={{ __html: concept.svgMarkup }}
              />
              <div className="text-center">
                <span
                  className="text-lg font-black tracking-tight text-[#14213D]"
                  style={{ fontFamily: getFontFamily(concept.customization.fontTreatment) }}
                >
                  {concept.wordmark}
                </span>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-[#14213D]">
                  OFFICIAL SYSTEM
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-[#E8E1D3] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#60738F]">
          Complexity: Level {concept.customization.complexity}/5
        </span>

        <button
          type="button"
          onClick={onSelect}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            isSelected
              ? 'bg-[#14213D] text-white cursor-default shadow-sm'
              : 'bg-[#E8E1D3] hover:bg-[#14213D] text-[#60738F] hover:text-[#EEF4FB] border border-[#E2EAF4]'
          }`}
        >
          {isSelected ? '✓ Active Brand Mark' : 'Select This Mark'}
        </button>
      </div>
    </div>
  );
};
