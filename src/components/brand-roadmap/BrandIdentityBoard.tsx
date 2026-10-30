import React from 'react';
import type { VisualBrandBoard } from '../../types/project';

interface BrandIdentityBoardProps {
  board: VisualBrandBoard;
}

export const BrandIdentityBoard: React.FC<BrandIdentityBoardProps> = ({ board }) => {
  return (
    <section className="rounded-3xl bg-gradient-to-b from-[#EEF4FB] via-[#EEF4FB] to-[#EEF4FB] border-2 border-[#14213D]/40 p-6 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Visual Ambient Lighting Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#14213D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2684F7]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E2EAF4]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#19A875] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#14213D]">
              SYNTHESIZED IDENTITY SYSTEM
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#14213D] tracking-tight">
            Official Brand Identity Board
          </h2>
          <p className="text-xs sm:text-sm text-[#60738F] mt-1">
            &ldquo;This is what my brand looks like, sounds like, and stands for.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#14213D]/20 border border-[#14213D]/40 text-[#14213D] font-mono text-xs font-bold flex items-center gap-2">
            <span>READY FOR BUILD</span>
            <span className="text-[#19A875]">✓</span>
          </div>
        </div>
      </div>

      {/* Main Brand Board Canvas Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Brand Hero Mark & Wordmark (5 cols) */}
        <div className="lg:col-span-5 bg-[#EEF4FB] border border-[#E2EAF4] rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#14213D]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold">
                01 • OFFICIAL BRAND MARK
              </span>
              <span className="text-[10px] font-mono text-[#19A875] bg-[#E8F8F1] px-2 py-0.5 rounded border border-[#19A875]/20">
                ACTIVE
              </span>
            </div>

            {/* Central SVG Mark Render */}
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div
                className="w-28 h-28 flex items-center justify-center transition-transform group-hover:scale-105 duration-300 mb-4"
                dangerouslySetInnerHTML={{ __html: board.selectedMark.svgMarkup }}
              />
              <h3 className="text-2xl sm:text-3xl font-black text-[#14213D] tracking-tight font-mono">
                {board.selectedMark.wordmark}
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-[#14213D] mt-1">
                {board.selectedMark.style} • ARCHETYPE
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E1D3] flex items-center justify-between text-[11px] font-mono text-[#60738F]">
            <span>Layout: {board.selectedMark.customization.layout}</span>
            <span>Complexity: {board.selectedMark.customization.complexity}/5</span>
          </div>
        </div>

        {/* Right Column: Colors, Typography, Tagline, Voice & Positioning (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 justify-between">
            {/* Tagline Card */}
            <div className="bg-white border border-[#E2EAF4] rounded-2xl p-5 shadow-md">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold block mb-1">
              02 • CORE BRAND TAGLINE
            </span>
            <p className="text-lg sm:text-xl font-black text-[#14213D] tracking-tight">
              &ldquo;{board.tagline}&rdquo;
            </p>
          </div>

          {/* Color Palette Strip */}
            <div className="bg-white border border-[#E2EAF4] rounded-2xl p-5 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold">
                  03 • CHROMATIC SYSTEM
                </span>
              <span className="text-[10px] font-mono text-[#60738F]">5 Semantic Tokens</span>
            </div>
            <div className="rounded-xl overflow-hidden h-12 flex border border-[#E2EAF4] mb-3">
              {board.colorPalette.map((swatch) => (
                <div
                  key={swatch.id}
                  className="flex-1 h-full flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                  title={`${swatch.role}: ${swatch.hex}`}
                >
                  <span className="hidden sm:inline bg-black/60 px-1 py-0.5 rounded text-[9px] backdrop-blur-sm">
                    {swatch.hex}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono text-[#60738F]">
              {board.colorPalette.map((s) => (
                <span key={s.id} className="truncate uppercase">{s.role}</span>
              ))}
            </div>
          </div>

          {/* Typography & Verbal Voice Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Typography */}
            <div className="bg-white border border-[#E2EAF4] rounded-2xl p-4 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold block mb-1">
                  04 • TYPOGRAPHY PAIR
                </span>
                <h4 className="text-sm font-bold text-[#14213D]">
                  {board.typography.name}
                </h4>
                <div className="mt-2 space-y-1 text-[11px] font-mono text-[#60738F]">
                  <div>H: <span className="text-[#14213D] font-semibold">{board.typography.headingFont}</span></div>
                  <div>B: <span className="text-[#14213D]">{board.typography.bodyFont}</span></div>
                </div>
              </div>
            </div>

            {/* Voice Traits */}
            <div className="bg-white border border-[#E2EAF4] rounded-2xl p-4 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold block mb-1">
                  05 • VERBAL TONALITY
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {board.voiceCharacteristics.map((v, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#14213D]/15 border border-[#14213D]/30 text-[#14213D] text-[10px] font-mono font-semibold"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full Positioning Statement */}
          <div className="bg-white border border-[#E2EAF4] rounded-2xl p-5 shadow-md">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold block mb-1">
              06 • CANONICAL POSITIONING FORMULA
            </span>
            <p className="text-xs sm:text-sm text-[#60738F] leading-relaxed italic font-serif">
              &ldquo;{board.positioningStatement}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
