import React, { useState } from 'react';
import { Compass, UserCheck, Key, Zap, CheckCircle2, RotateCcw, Heart, ArrowRight } from 'lucide-react';
import type { CustomerTouchpoint } from '../../types/project';

interface CustomerExperienceMapProps {
  touchpoints: CustomerTouchpoint[];
}

export const CustomerExperienceMap: React.FC<CustomerExperienceMapProps> = ({
  touchpoints,
}) => {
  const [activeStage, setActiveStage] = useState<string>(touchpoints[0]?.stage || 'DISCOVER');

  const selectedPoint = touchpoints.find((t) => t.stage === activeStage) || touchpoints[0];

  const getStageIcon = (stage: string) => {
    switch (stage.toUpperCase()) {
      case 'DISCOVER':
        return <Compass className="w-4 h-4 text-blue-400" />;
      case 'CONSIDER':
        return <UserCheck className="w-4 h-4 text-purple-400" />;
      case 'SIGN UP / BUY':
      case 'SIGN UP':
        return <Key className="w-4 h-4 text-amber-400" />;
      case 'ONBOARD':
        return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'USE':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'RETAIN':
      case 'RETURN':
        return <RotateCcw className="w-4 h-4 text-indigo-400" />;
      case 'ADVOCATE':
      default:
        return <Heart className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2636] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              LIFECYCLE RETENTION &amp; EXPERIENCE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Customer Experience Journey Map
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Continuous journey line ensuring the brand promise and differentiator are validated at every customer lifecycle touchpoint.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          7 Sequential Experience Milestones
        </div>
      </div>

      {/* Visual Journey Line Strip */}
      <div className="overflow-x-auto pb-3 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-[880px]">
          {touchpoints.map((tp, idx) => {
            const isSelected = tp.stage === activeStage;

            return (
              <React.Fragment key={tp.stage}>
                <button
                  type="button"
                  onClick={() => setActiveStage(tp.stage)}
                  className={`flex-1 min-w-[110px] p-3 rounded-xl border transition-all text-left group ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500'
                      : 'bg-[#111823] border-[#263244] hover:border-slate-500 text-[#AAB4C3]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono text-[#64748B]">
                      STAGE 0{idx + 1}
                    </span>
                    <div className="p-1 rounded-md bg-[#080B10]">
                      {getStageIcon(tp.stage)}
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold uppercase block truncate ${isSelected ? 'text-white' : 'text-[#CBD5E1]'}`}>
                    {tp.stage}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400/80 truncate block mt-0.5">
                    {tp.desiredEmotion || 'Reassurance'}
                  </span>
                </button>

                {idx < touchpoints.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#334155] flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Inspected Milestone Dossier Card */}
      {selectedPoint && (
        <div className="rounded-xl bg-[#111823] border border-[#263244] p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1C2636] pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                {getStageIcon(selectedPoint.stage)}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#738095] block font-semibold">
                  ACTIVE LIFECYCLE MILESTONE
                </span>
                <h3 className="text-sm font-bold text-[#F3F4F6] uppercase">
                  {selectedPoint.stage}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#738095] uppercase">Target Emotion:</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                {selectedPoint.desiredEmotion}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {/* Customer Expectation */}
            <div className="p-3.5 rounded-xl bg-[#0D141F] border border-[#1C2636] space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                1. CUSTOMER EXPECTATION
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedPoint.customerExpectation}
              </p>
            </div>

            {/* Brand Touchpoint */}
            <div className="p-3.5 rounded-xl bg-[#0D141F] border border-[#1C2636] space-y-1">
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                2. BRAND TOUCHPOINT
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedPoint.touchpoint}
              </p>
            </div>

            {/* Brand Behavior */}
            <div className="p-3.5 rounded-xl bg-[#0D141F] border border-[#1C2636] space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                3. BRAND BEHAVIOR &amp; RITUAL
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedPoint.brandBehavior}
              </p>
            </div>

            {/* Growth Opportunity */}
            <div className="p-3.5 rounded-xl bg-[#0D141F] border border-[#1C2636] space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                4. RETENTION &amp; ADVOCACY MOAT
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedPoint.opportunity}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
