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
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-[#E2EAF4] bg-[#F5F8FC] transition-colors overflow-hidden">
      {/* Editorial strategy workspace photography background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-multiply"
        style={{ backgroundImage: `url('/images/hero_strategy_workspace.jpg')` }}
      />
      {/* Refined light blue-white gradient overlay ensuring text remains completely dominant & legible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F5F8FC]/80 via-[#EEF4FB]/85 to-[#FFFFFF]/95"
      />
      {/* Subtle blueprint grid overlay for architectural precision */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
      >
        <defs>
          <pattern id="hero-draft-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#2684F7" strokeOpacity="0.10" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hero-draft-grid)" />
      </svg>
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Stage metadata badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F2FF] border border-[#2684F7]/30 text-xs font-mono text-[#2684F7] shadow-xs backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2684F7] animate-pulse" />
          STAGE 01 // IDEA LAB
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#14213D] max-w-4xl mx-auto leading-[1.12]">
          From a raw idea to a <span className="text-[#2684F7]">launch-ready brand</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#60738F] max-w-2xl mx-auto font-normal leading-relaxed">
          Think Beyond Marketing deconstructs your unpolished founder intuition into an architectural business model, validated market intelligence, and cohesive brand strategy.
        </p>

        {/* Architectural Transformation Pipeline UI */}
        <div className="pt-4 pb-2">
          <div className="p-4 sm:p-5 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] shadow-sm">
            <div className="text-[11px] font-mono uppercase tracking-wider text-left mb-3 flex items-center justify-between">
              <span className="text-[#14213D] font-medium">Continuous Transformation Journey</span>
              <span className="text-[#8495AE]">Staged Reasoning Pipeline</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === 0;
                return (
                  <div
                    key={step.label}
                    className={`relative p-3 rounded-lg border text-left flex flex-col justify-between h-20 transition-all duration-200 ${
                      isActive
                        ? 'bg-[#E8F2FF] border-[#2684F7]/40 shadow-xs'
                        : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-[#2684F7]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[10px] ${isActive ? 'text-[#2684F7] font-semibold' : 'text-[#8495AE]'}`}>
                        0{idx + 1}
                      </span>
                      <Icon className="w-4 h-4 text-[#2684F7]" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#14213D] tracking-tight block">
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
