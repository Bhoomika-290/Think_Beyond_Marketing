import React, { useState } from 'react';
import { Target, Sparkles } from 'lucide-react';
import type { MarketOpportunityGap } from '../../types/project';

interface OpportunityWhitespaceMapProps {
  opportunityGaps: MarketOpportunityGap[];
}

export const OpportunityWhitespaceMap: React.FC<OpportunityWhitespaceMapProps> = ({
  opportunityGaps,
}) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('all');
  const [selectedGap, setSelectedGap] = useState<MarketOpportunityGap | null>(
    opportunityGaps[0] || null
  );

  const getQuadrantColor = (quadrant: MarketOpportunityGap['quadrant']) => {
    switch (quadrant) {
      case 'prime_opportunity':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          title: 'Prime Opportunity (High Demand, Low/Fragmented Competition)',
        };
      case 'crowded':
        return {
          bg: 'bg-red-500/10 border-red-500/30 text-red-400',
          title: 'Crowded Red Ocean (High Demand, High Incumbency)',
        };
      case 'niche':
        return {
          bg: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
          title: 'Specialized Niche (Focused Need, Low Competition)',
        };
      case 'low_priority':
      default:
        return {
          bg: 'bg-slate-700/30 border-slate-600/40 text-[#AAB4C3]',
          title: 'Low Priority (Low Demand, High Resistance)',
        };
    }
  };

  const filteredGaps =
    selectedQuadrant === 'all'
      ? opportunityGaps
      : opportunityGaps.filter((g) => g.quadrant === selectedQuadrant);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#0B1017] p-4 rounded-xl border border-[#263244]">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#4D8DFF]" />
            <h2 className="text-base font-semibold text-[#F3F4F6]">
              Market Whitespace & Gap Analysis
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Whitespace Engine
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Identifies open opportunity spaces where customer needs are acutely underserved relative to existing competitive coverage.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setSelectedQuadrant('all')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedQuadrant === 'all'
                ? 'bg-[#4D8DFF] text-white font-semibold'
                : 'bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244]'
            }`}
          >
            All Zones
          </button>
          <button
            type="button"
            onClick={() => setSelectedQuadrant('prime_opportunity')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedQuadrant === 'prime_opportunity'
                ? 'bg-emerald-500 text-white font-semibold'
                : 'bg-[#151E2B] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30'
            }`}
          >
            Prime Whitespace
          </button>
          <button
            type="button"
            onClick={() => setSelectedQuadrant('niche')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedQuadrant === 'niche'
                ? 'bg-purple-500 text-white font-semibold'
                : 'bg-[#151E2B] text-purple-400 hover:text-purple-300 border border-purple-500/30'
            }`}
          >
            Niche
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 4-Quadrant Visual Opportunity Map (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0B1017] border border-[#263244] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#263244] text-xs font-mono">
            <span className="text-[#F3F4F6] font-semibold">Demand vs. Competition Grid</span>
            <span className="text-[#64748B]">Click Zone to Filter</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 my-4">
            {/* Top Left: PRIME OPPORTUNITY */}
            <div
              onClick={() => {
                setSelectedQuadrant('prime_opportunity');
                const primeGap = opportunityGaps.find((g) => g.quadrant === 'prime_opportunity');
                if (primeGap) setSelectedGap(primeGap);
              }}
              className={`p-3 rounded-lg border flex flex-col justify-between min-h-[120px] cursor-pointer transition-all ${
                selectedQuadrant === 'prime_opportunity'
                  ? 'bg-emerald-950/70 border-emerald-400 shadow-md ring-1 ring-emerald-400/40'
                  : 'bg-emerald-950/30 border-emerald-500/30 hover:border-emerald-500/60'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">
                  ▲ PRIME OPPORTUNITY
                </span>
                <span className="text-[10px] text-[#AAB4C3] block mt-0.5">High Demand · Low Comp</span>
              </div>
              <div className="text-xs font-medium text-emerald-200 mt-2">
                {opportunityGaps.find((g) => g.quadrant === 'prime_opportunity')?.title ||
                  'Specialized Craft & Transparency Wedge'}
              </div>
            </div>

            {/* Top Right: CROWDED */}
            <div
              onClick={() => setSelectedQuadrant('crowded')}
              className={`p-3 rounded-lg border flex flex-col justify-between min-h-[120px] cursor-pointer transition-all ${
                selectedQuadrant === 'crowded'
                  ? 'bg-red-950/60 border-red-400 shadow-md ring-1 ring-red-400/40'
                  : 'bg-red-950/20 border-red-500/20 hover:border-red-500/50'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-red-400 block">
                  ▲ CROWDED (AVOID)
                </span>
                <span className="text-[10px] text-[#AAB4C3] block mt-0.5">High Demand · High Comp</span>
              </div>
              <div className="text-xs font-medium text-red-200/80 mt-2">
                Generic Commodity / High CAC Price War
              </div>
            </div>

            {/* Bottom Left: NICHE */}
            <div
              onClick={() => {
                setSelectedQuadrant('niche');
                const nicheGap = opportunityGaps.find((g) => g.quadrant === 'niche');
                if (nicheGap) setSelectedGap(nicheGap);
              }}
              className={`p-3 rounded-lg border flex flex-col justify-between min-h-[120px] cursor-pointer transition-all ${
                selectedQuadrant === 'niche'
                  ? 'bg-purple-950/60 border-purple-400 shadow-md ring-1 ring-purple-400/40'
                  : 'bg-purple-950/20 border-purple-500/20 hover:border-purple-500/50'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-purple-400 block">
                  ▼ SPECIALIZED NICHE
                </span>
                <span className="text-[10px] text-[#AAB4C3] block mt-0.5">Focused · Defensible</span>
              </div>
              <div className="text-xs font-medium text-purple-200 mt-2">
                {opportunityGaps.find((g) => g.quadrant === 'niche')?.title ||
                  'Bespoke Enterprise Customization'}
              </div>
            </div>

            {/* Bottom Right: LOW PRIORITY */}
            <div
              onClick={() => setSelectedQuadrant('low_priority')}
              className={`p-3 rounded-lg border flex flex-col justify-between min-h-[120px] cursor-pointer transition-all ${
                selectedQuadrant === 'low_priority'
                  ? 'bg-[#151E2B] border-slate-400 shadow-md'
                  : 'bg-[#111823] border-[#263244] hover:border-slate-600'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#64748B] block">
                  ▼ LOW PRIORITY
                </span>
                <span className="text-[10px] text-[#64748B] block mt-0.5">Low Demand · High Comp</span>
              </div>
              <div className="text-xs font-medium text-[#AAB4C3] mt-2">
                Unprofitable Segment / Slow Churn
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#64748B] text-center pt-2 border-t border-[#263244]">
            Axis: Vertical (Customer Demand) · Horizontal (Incumbent Density)
          </div>
        </div>

        {/* Whitespace Gap Cards & Visual Contrast Bars (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredGaps.map((gap) => {
            const isSelected = selectedGap?.id === gap.id;
            const quad = getQuadrantColor(gap.quadrant);

            return (
              <div
                key={gap.id}
                onClick={() => setSelectedGap(isSelected ? null : gap)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#151E2B] border-[#4D8DFF] shadow-lg ring-1 ring-[#4D8DFF]/30'
                    : 'bg-[#0B1017] border-[#263244] hover:border-[#4D8DFF]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#4D8DFF]" />
                      <h3 className="text-sm font-bold text-[#F3F4F6]">{gap.title}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${quad.bg}`}>
                        {gap.quadrant.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#AAB4C3] mt-1">{gap.opportunityAngle}</p>
                  </div>

                  <span className="text-xs font-mono text-[#64748B] shrink-0">
                    Confidence: <span className="text-[#F3F4F6] font-semibold">{gap.confidence}</span>
                  </span>
                </div>

                {/* Visual Gap Contrast Bars */}
                <div className="mt-3 pt-3 border-t border-[#263244]/80 space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#AAB4C3]">Unmet Customer Need / Expectation</span>
                      <span className="text-emerald-400 font-bold">100% Demand Severity</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#111823] overflow-hidden">
                      <div className="w-full h-full bg-emerald-500 rounded" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#AAB4C3]">Current Competitor Coverage</span>
                      <span className="text-amber-400 font-bold">35% Adequate</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#111823] overflow-hidden">
                      <div className="w-[35%] h-full bg-amber-500 rounded" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#4D8DFF] font-bold">Unserved Whitespace (Your Wedge)</span>
                      <span className="text-[#4D8DFF] font-bold">65% Open Space</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#111823] overflow-hidden">
                      <div className="w-[65%] h-full bg-[#4D8DFF] rounded" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-[#263244] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fade-in">
                    <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 block uppercase font-semibold">
                        What Appears Underserved
                      </span>
                      <p className="text-xs text-[#F3F4F6] leading-relaxed">
                        {gap.underservedAspect}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-1">
                      <span className="text-[10px] font-mono text-[#4D8DFF] block uppercase font-semibold">
                        Why It Matters
                      </span>
                      <p className="text-xs text-[#AAB4C3] leading-relaxed">
                        {gap.whyItMatters}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-1">
                      <span className="text-[10px] font-mono text-purple-400 block uppercase font-semibold">
                        Supporting Evidence
                      </span>
                      <p className="text-xs text-[#AAB4C3] leading-relaxed">
                        {gap.supportingEvidence}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 block uppercase font-semibold">
                        Competitors Addressing It
                      </span>
                      <p className="text-xs text-[#AAB4C3] leading-relaxed">
                        {gap.competitorsAddressing.join(', ')}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#111823] border border-red-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-red-400 block uppercase font-semibold">
                        What Remains Unresolved
                      </span>
                      <p className="text-xs text-[#AAB4C3] leading-relaxed">
                        {gap.unresolvedElement}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#111823] border border-blue-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-blue-400 block uppercase font-semibold">
                        Validation Next Step
                      </span>
                      <p className="text-xs text-[#AAB4C3] leading-relaxed">
                        {gap.whatToValidateNext}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
