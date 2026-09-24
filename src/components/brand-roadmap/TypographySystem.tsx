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
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              EDITORIAL ARCHITECTURE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Typography System & Specimen Scale
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
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
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-[#111823] hover:bg-[#151E2B] text-[#AAB4C3] border border-[#263244]'
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
        <div className="lg:col-span-8 bg-[#080B10] border border-[#263244] rounded-2xl p-6 lg:p-8 space-y-6">
          {/* 1. Display Tier */}
          <div className="pb-5 border-b border-[#1C2636]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#64748B] mb-2">
              <span>01 • Display Brand Wordmark</span>
              <span>{activePair.headingFont} • 900 Black</span>
            </div>
            <div
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F3F4F6] tracking-tight leading-none"
              style={{ fontFamily: activePair.headingFont }}
            >
              {ventureName}
            </div>
          </div>

          {/* 2. Heading Tier */}
          <div className="pb-5 border-b border-[#1C2636]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#64748B] mb-2">
              <span>02 • Heading & Proposition</span>
              <span>{activePair.headingFont} • 700 Bold</span>
            </div>
            <h2
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F3F4F6] tracking-tight leading-snug"
              style={{ fontFamily: activePair.headingFont }}
            >
              &ldquo;{tagline}&rdquo;
            </h2>
          </div>

          {/* 3. Body Reading Tier */}
          <div className="pb-5 border-b border-[#1C2636]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#64748B] mb-2">
              <span>03 • Body Editorial & Narrative Reading</span>
              <span>{activePair.bodyFont} • 400 Regular</span>
            </div>
            <p
              className="text-sm text-[#AAB4C3] leading-relaxed max-w-2xl"
              style={{ fontFamily: activePair.bodyFont }}
            >
              Modern buyers no longer tolerate opaque supply chains, bloated enterprise suites, or commodity compromises. By establishing an undeniable truth benchmark on Day 1, {ventureName} establishes authority before the transaction even occurs.
            </p>
          </div>

          {/* 4. Caption / UI Tier */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#64748B] mb-3">
              <span>04 • Caption & Interactive UI</span>
              <span>{activePair.uiFont} • 500 Medium</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
                style={{ fontFamily: activePair.uiFont }}
              >
                Experience {ventureName}
              </button>
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-[#151E2B] hover:bg-[#1C2636] text-[#AAB4C3] border border-[#263244] text-xs font-semibold transition-all"
                style={{ fontFamily: activePair.uiFont }}
              >
                Inspect Provenance Math
              </button>
              <span
                className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30"
                style={{ fontFamily: activePair.uiFont }}
              >
                ● SYSTEM_TOKEN_VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Selected Typographic Details (Right 4 cols) */}
        <div className="lg:col-span-4 bg-[#111823] border border-[#263244] rounded-2xl p-5 space-y-4">
          <div className="pb-3 border-b border-[#1C2636]">
            <span className="text-[10px] font-mono uppercase text-[#4D8DFF] font-bold">
              Pair Archetype
            </span>
            <h3 className="text-base font-bold text-[#F3F4F6] mt-0.5">
              {activePair.name}
            </h3>
            <p className="text-xs text-[#AAB4C3] mt-1 leading-relaxed">
              {activePair.sampleHeading}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
              <span className="text-[9px] font-mono uppercase text-[#64748B] block mb-1">Display & Headings</span>
              <span className="text-xs font-mono font-bold text-[#F3F4F6] block">{activePair.headingFont}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
              <span className="text-[9px] font-mono uppercase text-[#64748B] block mb-1">Body Reading</span>
              <span className="text-xs font-mono font-bold text-[#F3F4F6] block">{activePair.bodyFont}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
              <span className="text-[9px] font-mono uppercase text-[#64748B] block mb-1">Interface Controls & Captions</span>
              <span className="text-xs font-mono font-bold text-[#F3F4F6] block">{activePair.uiFont}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1C2636] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
            <span>System Web Fonts</span>
            <span className="text-emerald-400 font-bold">Zero Webfont Latency</span>
          </div>
        </div>
      </div>
    </section>
  );
};
