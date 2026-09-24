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
          ? 'bg-[#151E2B] border-[#4D8DFF] shadow-xl shadow-blue-500/15 ring-2 ring-[#4D8DFF]'
          : 'bg-[#111823] border-[#263244] hover:border-[#38BDF8]/40'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
              {concept.style}
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">
              {concept.personalityAlignment}
            </span>
          </div>

          {isSelected ? (
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SELECTED BRAND MARK
            </span>
          ) : (
            <span className="text-[10px] font-mono text-[#64748B]">
              Candidate
            </span>
          )}
        </div>

        {/* Concept Title */}
        <h3 className="text-base font-bold text-[#F3F4F6] mb-1">
          {concept.name}
        </h3>
        <p className="text-xs text-[#AAB4C3] mb-4 line-clamp-2">
          {concept.rationale}
        </p>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#080B10] rounded-lg border border-[#263244] mb-3 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setViewMode('combination')}
            className={`flex-1 py-1 rounded transition-colors text-center ${
              viewMode === 'combination' ? 'bg-[#151E2B] text-[#F3F4F6] font-bold' : 'text-[#64748B] hover:text-[#AAB4C3]'
            }`}
          >
            Combo
          </button>
          <button
            type="button"
            onClick={() => setViewMode('mark')}
            className={`flex-1 py-1 rounded transition-colors text-center ${
              viewMode === 'mark' ? 'bg-[#151E2B] text-[#F3F4F6] font-bold' : 'text-[#64748B] hover:text-[#AAB4C3]'
            }`}
          >
            Mark Only
          </button>
          <button
            type="button"
            onClick={() => setViewMode('wordmark')}
            className={`flex-1 py-1 rounded transition-colors text-center ${
              viewMode === 'wordmark' ? 'bg-[#151E2B] text-[#F3F4F6] font-bold' : 'text-[#64748B] hover:text-[#AAB4C3]'
            }`}
          >
            Wordmark
          </button>
        </div>

        {/* Visual Logo Stage Canvas */}
        <div
          className="w-full aspect-[16/10] rounded-xl border border-[#263244] flex items-center justify-center p-6 relative overflow-hidden group"
          style={{ backgroundColor: concept.customization.backgroundColor || '#080B10' }}
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4D8DFF_1px,transparent_1px)] [background-size:16px_16px]" />

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
                className="text-2xl font-black tracking-tight text-[#F3F4F6]"
                style={{ fontFamily: getFontFamily(concept.customization.fontTreatment) }}
              >
                {concept.wordmark}
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#4D8DFF] mt-1">
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
                  className="text-lg font-black tracking-tight text-[#F3F4F6]"
                  style={{ fontFamily: getFontFamily(concept.customization.fontTreatment) }}
                >
                  {concept.wordmark}
                </span>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-[#4D8DFF]">
                  OFFICIAL SYSTEM
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-[#1C2636] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#64748B]">
          Complexity: Level {concept.customization.complexity}/5
        </span>

        <button
          type="button"
          onClick={onSelect}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
            isSelected
              ? 'bg-blue-600 text-white cursor-default shadow-lg shadow-blue-500/20'
              : 'bg-[#1C2636] hover:bg-blue-600/30 text-[#AAB4C3] hover:text-white border border-[#263244]'
          }`}
        >
          {isSelected ? '✓ Active Brand Mark' : 'Select This Mark'}
        </button>
      </div>
    </div>
  );
};
