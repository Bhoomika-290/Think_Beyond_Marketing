import React from 'react';
import { Lightbulb, Compass, ShieldCheck, Sparkles, Hammer, Rocket } from 'lucide-react';

export const HeroTransformation: React.FC = () => {
  const steps = [
    { label: 'Raw Idea', icon: Lightbulb, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { label: 'Understand', icon: Compass, color: 'text-[#4D8DFF]', bg: 'bg-blue-500/10', border: 'border-[#4D8DFF]/30' },
    { label: 'Validate', icon: ShieldCheck, color: 'text-[#45D4E8]', bg: 'bg-cyan-500/10', border: 'border-[#45D4E8]/30' },
    { label: 'Differentiate', icon: Sparkles, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { label: 'Build', icon: Hammer, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { label: 'Launch', icon: Rocket, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  ];

  return (
    <div className="relative py-10 px-4 sm:px-6 lg:px-8 border-b border-[#263244] bg-[#0B1017]/70 transition-colors">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Stage metadata */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(77,141,255,0.12)] border border-[rgba(77,141,255,0.35)] text-xs font-mono text-[#4D8DFF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF]" />
          STAGE 01 // IDEA LAB
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F3F4F6] max-w-4xl mx-auto leading-[1.15]">
          From a raw idea to a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D8DFF] via-[#6EA8FF] to-[#45D4E8]">
            launch-ready brand.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#AAB4C3] max-w-2xl mx-auto font-normal leading-relaxed">
          Think Beyond Marketing deconstructs your unpolished founder intuition into an architectural business model, validated market intelligence, and cohesive brand strategy.
        </p>

        {/* Architectural Transformation Pipeline UI */}
        <div className="pt-4 pb-2">
          <div className="p-4 sm:p-5 rounded-xl bg-[#151E2B] border border-[#263244] shadow-intel-card">
            <div className="text-[11px] font-mono uppercase tracking-wider text-left mb-3 flex items-center justify-between">
              <span className="text-[#AAB4C3] font-medium">Continuous Transformation Journey</span>
              <span className="text-[#738095]">Staged Reasoning Pipeline</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className={`relative p-3 rounded-lg ${step.bg} ${step.border} border text-left flex flex-col justify-between h-20 transition-all duration-200 hover:scale-[1.02]`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#738095]">
                        0{idx + 1}
                      </span>
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#F3F4F6] tracking-tight block">
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
