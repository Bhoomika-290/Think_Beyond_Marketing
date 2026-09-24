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
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              STRATEGIC POSTURE CONTROLS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand Personality Spectrums
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Dial in brand tone and posture. Sliders compare your customized stance against the AI strategic baseline.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4D8DFF]" />
            <span className="text-[#F3F4F6]">User Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500/60 border border-purple-400" />
            <span className="text-purple-300">AI Recommendation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {traits.map((trait) => {
          return (
            <div
              key={trait.id}
              className="p-5 rounded-xl bg-[#111823] border border-[#263244] hover:border-[#38BDF8]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Labels Header */}
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <span className={`${trait.userValue <= 50 ? 'text-[#4D8DFF]' : 'text-[#64748B]'}`}>
                    {trait.leftLabel}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">
                    {trait.userValue}%
                  </span>
                  <span className={`${trait.userValue > 50 ? 'text-[#4D8DFF]' : 'text-[#64748B]'}`}>
                    {trait.rightLabel}
                  </span>
                </div>

                {/* Spectrum Slider Container */}
                <div className="relative py-3">
                  {/* Slider Track */}
                  <div className="h-2 w-full bg-[#080B10] rounded-full relative overflow-hidden border border-[#263244]">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all"
                      style={{ width: `${trait.userValue}%` }}
                    />
                  </div>

                  {/* AI Baseline Marker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-none flex flex-col items-center"
                    style={{ left: `${trait.aiValue}%` }}
                    title={`AI Recommendation: ${trait.aiValue}%`}
                  >
                    <div className="w-3 h-3 bg-purple-500 border border-white rounded-sm shadow-md" />
                    <span className="text-[8px] font-mono text-purple-300 bg-purple-950 px-1 rounded border border-purple-500/40 mt-1 whitespace-nowrap">
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
              <div className="mt-3 pt-3 border-t border-[#1C2636] flex items-center justify-between text-[11px] text-[#AAB4C3]">
                <p className="line-clamp-1 italic text-[#64748B]">
                  {trait.rationale}
                </p>
                {trait.isUserModified ? (
                  <span className="text-[9px] font-mono font-bold text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/30 whitespace-nowrap ml-2">
                    Customized
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/30 whitespace-nowrap ml-2">
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
