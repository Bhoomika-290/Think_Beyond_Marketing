import React, { useState } from 'react';
import type { CustomerTouchpoint } from '../../types/project';

interface CustomerExperienceMapProps {
  touchpoints: CustomerTouchpoint[];
}

export const CustomerExperienceMap: React.FC<CustomerExperienceMapProps> = ({
  touchpoints,
}) => {
  const [expandedStage, setExpandedStage] = useState<string>(touchpoints[0]?.stage || 'DISCOVER');

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              CUSTOMER EXPERIENCE ARCHITECTURE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Customer Experience Journey Map
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            7-stage lifecycle journey ensuring the brand promise and differentiator are validated at every customer touchpoint.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          Full Lifecycle Retention Design
        </div>
      </div>

      {/* Visual Progression Horizontal Bar */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#263244] mb-6">
        <div className="flex items-center min-w-max gap-2">
          {touchpoints.map((tp, idx) => {
            const isExpanded = expandedStage === tp.stage;
            return (
              <React.Fragment key={tp.stage}>
                <button
                  type="button"
                  onClick={() => setExpandedStage(tp.stage)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isExpanded
                      ? 'bg-blue-600/20 border-[#4D8DFF] text-[#F3F4F6] shadow-md shadow-blue-500/10'
                      : 'bg-[#111823] border-[#263244] text-[#AAB4C3] hover:text-[#F3F4F6] hover:border-slate-500'
                  }`}
                >
                  <span className="text-[9px] font-mono text-[#64748B] block">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase mt-0.5 block">
                    {tp.stage}
                  </span>
                </button>
                {idx < touchpoints.length - 1 && (
                  <span className="text-[#334155] text-xs font-mono">→</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Grid of Compact Expandable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {touchpoints.map((tp, idx) => {
          const isExpanded = expandedStage === tp.stage;
          return (
            <div
              key={tp.stage}
              className={`p-5 rounded-xl border transition-all ${
                isExpanded
                  ? 'bg-[#151E2B] border-[#4D8DFF] ring-1 ring-[#4D8DFF] shadow-lg'
                  : 'bg-[#111823] border-[#263244] hover:border-[#38BDF8]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] font-bold">
                  0{idx + 1} • {tp.stage}
                </span>
                <button
                  type="button"
                  onClick={() => setExpandedStage(isExpanded ? '' : tp.stage)}
                  className="text-xs text-[#64748B] hover:text-[#F3F4F6] transition-colors"
                >
                  {isExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[9px] font-mono uppercase text-[#64748B] block">
                    Customer Expectation
                  </span>
                  <p className="text-[#F3F4F6] font-medium mt-0.5 leading-snug">
                    {tp.customerExpectation}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] font-mono uppercase text-[#64748B] block">
                    Brand Touchpoint
                  </span>
                  <p className="text-[#AAB4C3] mt-0.5 leading-snug">
                    {tp.touchpoint}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] font-mono uppercase text-purple-400 block font-semibold">
                    Desired Emotion
                  </span>
                  <p className="text-purple-200 mt-0.5 italic leading-snug">
                    {tp.desiredEmotion}
                  </p>
                </div>

                {isExpanded && (
                  <div className="pt-2 border-t border-[#1C2636] space-y-2.5 text-xs animate-fadeIn">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-[#4D8DFF] block font-bold">
                        Brand Behavior
                      </span>
                      <p className="text-blue-200 mt-0.5 leading-snug">{tp.brandBehavior}</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono uppercase text-emerald-400 block font-bold">
                        Strategic Opportunity
                      </span>
                      <p className="text-emerald-200 mt-0.5 leading-snug">{tp.opportunity}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
