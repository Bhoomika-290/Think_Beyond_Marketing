import React from 'react';
import type { BrandPersonalityTrait } from '../../types/project';

interface BrandPersonalityProps {
  traits: BrandPersonalityTrait[];
  onUpdateTrait: (traitId: string, userValue: number) => void;
}

export const BrandPersonality: React.FC<BrandPersonalityProps> = ({
  traits,
  onUpdateTrait,
}) => {
  return (
    <section className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#14213D] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#14213D]">
              STRATEGIC POSTURE CONTROLS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight">
            Brand Personality Spectrums
          </h2>
          <p className="text-xs sm:text-sm text-[#60738F]">
            Dial in brand tone and posture. Sliders compare your customized stance against the AI strategic baseline.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-[#FFFFFF] px-3 py-1.5 rounded-lg border border-[#E2EAF4]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#14213D]" />
            <span className="text-[#14213D]">User Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#9272DB]/60 border border-[#9272DB]" />
            <span className="text-[#9272DB]">AI Recommendation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {traits.map((trait) => {
          return (
            <div
              key={trait.id}
              className="p-5 rounded-xl bg-[#EEF4FB] border border-[#E2EAF4] hover:border-[#2684F7]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Labels Header */}
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <span className={`${trait.userValue <= 50 ? 'text-[#14213D]' : 'text-[#60738F]'}`}>
                    {trait.leftLabel}
                  </span>
                  <span className="text-[10px] text-[#60738F] font-mono">
                    {trait.userValue}%
                  </span>
                  <span className={`${trait.userValue > 50 ? 'text-[#14213D]' : 'text-[#60738F]'}`}>
                    {trait.rightLabel}
                  </span>
                </div>

                {/* Spectrum Slider Container */}
                <div className="relative py-3">
                  {/* Slider Track */}
                  <div className="h-2 w-full bg-white rounded-full relative overflow-hidden border border-[#E2EAF4]">
                    <div
                      className="h-full bg-[#14213D] rounded-full transition-all"
                      style={{ width: `${trait.userValue}%` }}
                    />
                  </div>

                  {/* AI Baseline Marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center"
                    style={{ left: `${trait.aiValue}%` }}
                    title={`AI Recommendation: ${trait.aiValue}%`}
                  >
                    <div className="w-3 h-3 bg-[#9272DB] border border-white rounded-sm shadow-sm" />
                    <span className="text-[8px] font-mono text-[#EEF4FB] bg-[#9272DB] px-1 rounded border border-[#9272DB] mt-1 whitespace-nowrap">
                      AI: {trait.aiValue}%
                    </span>
                  </div>

                  {/* Interactive Native Range Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={trait.userValue}
                    onChange={(e) => onUpdateTrait(trait.id, parseInt(e.target.value, 10))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
              </div>

              {/* Rationale and modification badge */}
              <div className="mt-3 pt-3 border-t border-[#E8E1D3] flex items-center justify-between text-[11px] text-[#60738F]">
                <p className="line-clamp-1 italic text-[#60738F]">
                  {trait.rationale}
                </p>
                {trait.isUserModified ? (
                  <span className="text-[9px] font-mono font-bold text-[#2684F7] bg-[#2684F7]/10 px-1.5 py-0.5 rounded border border-[#2684F7]/30 whitespace-nowrap ml-2">
                    Customized
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-[#9272DB] bg-[#F2EDFF] px-1.5 py-0.5 rounded border border-[#9272DB]/30 whitespace-nowrap ml-2">
                    Default Model
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
