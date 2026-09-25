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
    <div className="relative py-10 px-4 sm:px-6 lg:px-8 border-b border-theme-border bg-theme-background transition-colors">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* Stage metadata */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(43,61,79,0.08)] border border-[rgba(43,61,79,0.25)] text-xs font-mono text-theme-deep-blue">
          <span className="w-1.5 h-1.5 rounded-full bg-theme-deep-blue" />
          STAGE 01 // IDEA LAB
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-theme-primary max-w-4xl mx-auto leading-[1.15]">
          From a raw idea to a launch-ready brand.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-theme-secondary max-w-2xl mx-auto font-normal leading-relaxed">
          Think Beyond Marketing deconstructs your unpolished founder intuition into an architectural business model, validated market intelligence, and cohesive brand strategy.
        </p>

        {/* Architectural Transformation Pipeline UI */}
        <div className="pt-4 pb-2">
          <div className="p-4 sm:p-5 rounded-xl bg-theme-surface border border-theme-border shadow-intel-card">
            <div className="text-[11px] font-mono uppercase tracking-wider text-left mb-3 flex items-center justify-between">
              <span className="text-theme-secondary font-medium">Continuous Transformation Journey</span>
              <span className="text-theme-muted">Staged Reasoning Pipeline</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className="relative p-3 rounded-lg bg-theme-background border border-theme-border text-left flex flex-col justify-between h-20 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-theme-muted">
                        0{idx + 1}
                      </span>
                      <Icon className="w-4 h-4 text-theme-deep-blue" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-theme-primary tracking-tight block">
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
