import React from 'react';
import type { TypographySystem as TypographySystemType } from '../../types/project';

interface TypographySystemProps {
  typographySystem: TypographySystemType;
  ventureName?: string;
  tagline?: string;
  onSelectPair: (pairId: string) => void;
}

export const TypographySystem: React.FC<TypographySystemProps> = ({
  typographySystem,
  ventureName = 'Untitled Venture',
  tagline = 'Crafted Without Compromise.',
  onSelectPair,
}) => {
  const activePair =
    typographySystem.pairs.find((p) => p.id === typographySystem.selectedPairId) ||
    typographySystem.pairs[0];

  return (
    <section className="rounded-2xl bg-[#FDFCF8] border border-[#DDD5C5] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2B3D4F] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#2B3D4F]">
              EDITORIAL ARCHITECTURE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B3D4F] tracking-tight">
            Typography System & Specimen Scale
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5E73]">
            Curated typographic hierarchy balancing character, legibility, and technical precision across all device viewports.
          </p>
        </div>

        {/* Pair Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {typographySystem.pairs.map((pair) => {
            const isSelected = pair.id === activePair.id;
            return (
              <button
                key={pair.id}
                type="button"
                onClick={() => onSelectPair(pair.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-[#2B3D4F] text-white font-bold shadow-sm'
                    : 'bg-[#F5F1EB] hover:bg-[#ECE6DA] text-[#4A5E73] border border-[#DDD5C5]'
                }`}
              >
                {pair.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Specimen Render Canvas (Left 8 cols) */}
        <div className="lg:col-span-8 bg-[#F5F1EB] border border-[#DDD5C5] rounded-2xl p-6 lg:p-8 space-y-6">
          {/* 1. Display Tier */}
          <div className="pb-5 border-b border-[#E8E1D3]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#6B7D90] mb-2">
              <span>01 • Display Brand Wordmark</span>
              <span>{activePair.headingFont} • 900 Black</span>
            </div>
            <div
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B3D4F] tracking-tight leading-none"
              style={{ fontFamily: activePair.headingFont }}
            >
              {ventureName}
            </div>
          </div>

          {/* 2. Heading Tier */}
          <div className="pb-5 border-b border-[#E8E1D3]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#6B7D90] mb-2">
              <span>02 • Heading & Proposition</span>
              <span>{activePair.headingFont} • 700 Bold</span>
            </div>
            <h2
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2B3D4F] tracking-tight leading-snug"
              style={{ fontFamily: activePair.headingFont }}
            >
              &ldquo;{tagline}&rdquo;
            </h2>
          </div>

          {/* 3. Body Reading Tier */}
          <div className="pb-5 border-b border-[#E8E1D3]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#6B7D90] mb-2">
              <span>03 • Body Editorial & Narrative Reading</span>
              <span>{activePair.bodyFont} • 400 Regular</span>
            </div>
            <p
              className="text-sm text-[#4A5E73] leading-relaxed max-w-2xl"
              style={{ fontFamily: activePair.bodyFont }}
            >
              Modern buyers no longer tolerate opaque supply chains, bloated enterprise suites, or commodity compromises. By establishing an undeniable truth benchmark on Day 1, {ventureName} establishes authority before the transaction even occurs.
            </p>
          </div>

          {/* 4. Caption / UI Tier */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#6B7D90] mb-3">
              <span>04 • Caption & Interactive UI</span>
              <span>{activePair.uiFont} • 500 Medium</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-[#2B3D4F] hover:bg-[#2B3D4F] text-white text-xs font-bold shadow-sm transition-all"
                style={{ fontFamily: activePair.uiFont }}
              >
                Experience {ventureName}
              </button>
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-[#ECE6DA] hover:bg-[#E8E1D3] text-[#4A5E73] border border-[#DDD5C5] text-xs font-semibold transition-all"
                style={{ fontFamily: activePair.uiFont }}
              >
                Inspect Provenance Math
              </button>
              <span
                className="text-xs font-mono text-[#4A7C59] px-3 py-1.5 rounded-lg bg-[#4A7C59]/10 border border-[#4A7C59]/30"
                style={{ fontFamily: activePair.uiFont }}
              >
                ● SYSTEM_TOKEN_VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Selected Typographic Details (Right 4 cols) */}
        <div className="lg:col-span-4 bg-[#FDFCF8] border border-[#DDD5C5] rounded-2xl p-5 space-y-4">
          <div className="pb-3 border-b border-[#E8E1D3]">
            <span className="text-[10px] font-mono uppercase text-[#2B3D4F] font-bold">
              Pair Archetype
            </span>
            <h3 className="text-base font-bold text-[#2B3D4F] mt-0.5">
              {activePair.name}
            </h3>
            <p className="text-xs text-[#4A5E73] mt-1 leading-relaxed">
              {activePair.sampleHeading}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5]">
              <span className="text-[9px] font-mono uppercase text-[#6B7D90] block mb-1">Display & Headings</span>
              <span className="text-xs font-mono font-bold text-[#2B3D4F] block">{activePair.headingFont}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5]">
              <span className="text-[9px] font-mono uppercase text-[#6B7D90] block mb-1">Body Reading</span>
              <span className="text-xs font-mono font-bold text-[#2B3D4F] block">{activePair.bodyFont}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5]">
              <span className="text-[9px] font-mono uppercase text-[#6B7D90] block mb-1">Interface Controls & Captions</span>
              <span className="text-xs font-mono font-bold text-[#2B3D4F] block">{activePair.uiFont}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8E1D3] flex items-center justify-between text-[10px] font-mono text-[#6B7D90]">
            <span>System Web Fonts</span>
            <span className="text-[#4A7C59] font-bold">Zero Webfont Latency</span>
          </div>
        </div>
      </div>
    </section>
  );
};
