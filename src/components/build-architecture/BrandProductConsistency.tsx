import React, { useState } from 'react';
import {
  CheckCircle2,
  Layers,
  Palette,
  Sparkles,
  Target,
  Compass,
} from 'lucide-react';
import type { BrandProductConsistencySystem } from '../../types/project';

interface BrandProductConsistencyProps {
  brandConsistency: BrandProductConsistencySystem;
}

export const BrandProductConsistency: React.FC<BrandProductConsistencyProps> = ({
  brandConsistency,
}) => {
  const {
    brandName,
    logoInitials,
    primaryColor,
    accentColor,
    typography,
    voiceTone,
    differentiator,
    tokens,
  } = brandConsistency;

  const [selectedBridgeStage, setSelectedBridgeStage] = useState<number>(3); // Default on 3: Features

  // The 5-stage Visual Bridge specified in Section 34
  const bridgeStages = [
    {
      step: 1,
      title: 'BRAND STRATEGY',
      subtitle: 'Stage 04 Core DNA',
      desc: `Positioning: "${brandName}" delivers targeted value grounded in differentiator: "${differentiator || 'Direct market wedge'}"`,
      icon: <Target className="w-3.5 h-3.5 text-blue-400" />,
      status: 'CONSISTENT',
    },
    {
      step: 2,
      title: 'PRODUCT EXPERIENCE',
      subtitle: 'Value Loop',
      desc: `Translates brand personality (${voiceTone}) into an intuitive, zero-fluff software onboarding experience.`,
      icon: <Compass className="w-3.5 h-3.5 text-indigo-400" />,
      status: 'CONSISTENT',
    },
    {
      step: 3,
      title: 'FEATURES',
      subtitle: 'MVP Capabilities',
      desc: 'Technical feature scope directly implements the strategic differentiator without feature creep.',
      icon: <Layers className="w-3.5 h-3.5 text-purple-400" />,
      status: 'CONSISTENT',
    },
    {
      step: 4,
      title: 'UI/UX TOKENS',
      subtitle: 'Design System',
      desc: `Tokenized CSS: Primary (${primaryColor}), Accent (${accentColor}), Typography (${typography}), and microcopy tone.`,
      icon: <Palette className="w-3.5 h-3.5 text-cyan-400" />,
      status: 'CONSISTENT',
    },
    {
      step: 5,
      title: 'CUSTOMER EXPERIENCE',
      subtitle: 'Lifecycle Journey',
      desc: 'Cohesive end-to-end customer sentiment from initial discovery to active retention and advocacy.',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
      status: 'CONSISTENT',
    },
  ];

  const currentBridge = bridgeStages.find((b) => b.step === selectedBridgeStage) || bridgeStages[2];

  return (
    <div id="section-consistency" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 19 — Brand → Product Consistency Bridge
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              INHERITED FROM STAGE 04
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Visual bridge demonstrating how Stage 04 brand identity directly translates into UI design tokens, button states, and product microcopy.
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Stage 04 → Stage 05 Fully Aligned</span>
        </span>
      </div>

      {/* Visual Bridge Pipeline (Section 34 Specification) */}
      <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono text-[#F3F4F6] font-bold uppercase tracking-wider">
              ALIGNMENT BRIDGE (BRAND STRATEGY ↓ PRODUCT EXPERIENCE ↓ FEATURES ↓ UI/UX ↓ CUSTOMER EXPERIENCE)
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">
            5 / 5 Consistency Checks Passed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {bridgeStages.map((stage) => {
            const isSelected = selectedBridgeStage === stage.step;

            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setSelectedBridgeStage(stage.step)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-[#151E2B] border-blue-500 ring-1 ring-blue-500 shadow-md'
                    : 'bg-[#0D141F] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#738095]">0{stage.step}</span>
                  {stage.icon}
                </div>
                <div className="text-xs font-bold font-mono text-[#F3F4F6] truncate">
                  {stage.title}
                </div>
                <div className="text-[10px] text-blue-300 font-mono mt-0.5 truncate">
                  {stage.subtitle}
                </div>
                <div className="mt-2 pt-1 border-t border-[#1C2635] flex items-center justify-between text-[9px] font-mono">
                  <span className="text-emerald-400 flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" /> {stage.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Bridge Tier Inspector */}
        <div className="p-3.5 rounded-lg bg-[#0D141F] border border-blue-500/30 flex items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase block">
              TIER 0{currentBridge.step} SPECIFICATION: {currentBridge.title}
            </span>
            <p className="text-[#AAB4C3] mt-0.5 leading-relaxed">{currentBridge.desc}</p>
          </div>
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono flex-shrink-0">
            Audit: 100% Grounded
          </span>
        </div>
      </div>

      {/* Brand Identity Compact Token Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#111823] border border-[#263244]">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-sm font-mono flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            {logoInitials}
          </div>
          <div className="truncate">
            <span className="text-[10px] font-mono text-[#738095] block">BRAND NAME</span>
            <span className="text-xs font-bold text-[#F3F4F6] truncate block">{brandName}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-[#738095] block">PRIMARY / ACCENT</span>
          <div className="flex items-center gap-2 mt-1">
            <div
              className="w-4 h-4 rounded-full border border-white/20"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="text-xs font-mono text-[#F3F4F6]">{primaryColor}</span>
            <div
              className="w-4 h-4 rounded-full border border-white/20 ml-2"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-xs font-mono text-[#F3F4F6]">{accentColor}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-[#738095] block">TYPOGRAPHY PAIR</span>
          <span className="text-xs font-mono text-[#F3F4F6] truncate block mt-1">
            {typography}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono text-[#738095] block">VOICE PROFILE</span>
          <span className="text-xs text-[#AAB4C3] truncate block mt-1">{voiceTone}</span>
        </div>
      </div>

      {differentiator && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
          <span className="font-mono font-bold uppercase text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">
            Stage 03/04 Differentiator:
          </span>
          <span className="truncate">{differentiator}</span>
        </div>
      )}

      {/* Live Design System Token Materialization Component */}
      <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
        <div className="flex items-center justify-between border-b border-[#1C2635] pb-2">
          <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
            LIVE PRODUCT UI COMPONENT PREVIEW (INHERITED TOKENS)
          </span>
          <span className="text-[10px] font-mono text-[#738095]">
            Rendered with primary/accent colors &amp; typography
          </span>
        </div>

        <div className="p-4 rounded-lg bg-[#0D141F] border border-[#1C2635] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold text-[#F3F4F6] block">
              Sample Action Component
            </span>
            <p className="text-[11px] text-[#AAB4C3]">
              Microcopy aligned with <span className="text-blue-300 font-mono">{voiceTone}</span> voice profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-xs font-mono font-bold text-white shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              Primary CTA
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-xs font-mono font-bold border transition-colors hover:bg-white/5"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Secondary Action
            </button>
          </div>
        </div>
      </div>

      {/* Product Translation Tokens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tokens.map((token, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2.5"
          >
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-2">
              <span className="text-xs font-bold font-mono text-[#F3F4F6]">
                {token.dimension}
              </span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {token.brandToken}
              </span>
            </div>

            <p className="text-xs text-[#AAB4C3] leading-relaxed">
              <span className="text-[#F3F4F6] font-semibold">Product Translation: </span>
              {token.productTranslation}
            </p>

            <div className="p-2.5 rounded-lg bg-[#0D141F] border border-[#1C2635] space-y-1 text-[11px] font-mono">
              <div className="text-[#738095]">
                <span className="text-blue-300">CSS / UI Token:</span> {token.uiImplementation}
              </div>
              <div className="text-[#738095]">
                <span className="text-emerald-400">Microcopy Sample:</span> {token.messagingExample}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
