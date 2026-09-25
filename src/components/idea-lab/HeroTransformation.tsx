import React from 'react';
import { Lightbulb, Compass, ShieldCheck, Sparkles, Hammer, Rocket } from 'lucide-react';

export const HeroTransformation: React.FC = () => {
  const steps = [
    { label: 'Raw Idea', icon: Lightbulb },
    { label: 'Understand', icon: Compass },
    { label: 'Validate', icon: ShieldCheck },
    { label: 'Differentiate', icon: Sparkles },
    { label: 'Build', icon: Hammer },
    { label: 'Launch', icon: Rocket },
  ];

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-theme-border bg-[#0B0E14] transition-colors overflow-hidden">
      {/* Editorial strategy workspace photography background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{ backgroundImage: `url('/images/hero_strategy_workspace.jpg')` }}
      />
      {/* Sophisticated dark/neutral gradient overlay ensuring text remains completely dominant & legible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080B10]/85 via-[#0B0E14]/90 to-[#0F141D]"
      />
      {/* Subtle blueprint grid overlay for architectural precision */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
      >
        <defs>
          <pattern id="hero-draft-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hero-draft-grid)" />
      </svg>
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Stage metadata badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18202F]/80 border border-[#2D3E56] text-xs font-mono text-[#8BB7F9] shadow-xs backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF] animate-pulse" />
          STAGE 01 // IDEA LAB
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] max-w-4xl mx-auto leading-[1.12] drop-shadow-xs">
          From a raw idea to a launch-ready brand.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto font-normal leading-relaxed">
          Think Beyond Marketing deconstructs your unpolished founder intuition into an architectural business model, validated market intelligence, and cohesive brand strategy.
        </p>

        {/* Architectural Transformation Pipeline UI */}
        <div className="pt-4 pb-2">
          <div className="p-4 sm:p-5 rounded-xl bg-[#111823]/80 border border-[#243144] shadow-xl backdrop-blur-sm">
            <div className="text-[11px] font-mono uppercase tracking-wider text-left mb-3 flex items-center justify-between">
              <span className="text-[#94A3B8] font-medium">Continuous Transformation Journey</span>
              <span className="text-[#64748B]">Staged Reasoning Pipeline</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className="relative p-3 rounded-lg bg-[#0B1017]/90 border border-[#202C3D] hover:border-[#3B82F6]/50 text-left flex flex-col justify-between h-20 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#64748B]">
                        0{idx + 1}
                      </span>
                      <Icon className="w-4 h-4 text-[#60A5FA]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#F1F5F9] tracking-tight block">
                        {step.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
