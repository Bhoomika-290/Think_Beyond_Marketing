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
          bg: 'bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59]',
          title: 'Prime Opportunity (High Demand, Low/Fragmented Competition)',
        };
      case 'crowded':
        return {
          bg: 'bg-[#9E4A4A]/10 border-[#9E4A4A]/30 text-[#9E4A4A]',
          title: 'Crowded Red Ocean (High Demand, High Incumbency)',
        };
      case 'niche':
        return {
          bg: 'bg-[#6C5E8F]/10 border-[#6C5E8F]/30 text-[#6C5E8F]',
          title: 'Specialized Niche (Focused Need, Low Competition)',
        };
      case 'low_priority':
      default:
        return {
          bg: 'bg-[#ECE6DA] border-[#DDD5C5] text-[#4A5E73]',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FDFCF8] p-4 rounded-xl border border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#2B3D4F]" />
            <h2 className="text-base font-semibold text-[#2B3D4F]">
              Market Whitespace & Gap Analysis
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20">
              Whitespace Engine
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
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
                ? 'bg-[#2B3D4F] text-white font-semibold'
                : 'bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5]'
            }`}
          >
            All Zones
          </button>
          <button
            type="button"
            onClick={() => setSelectedQuadrant('prime_opportunity')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedQuadrant === 'prime_opportunity'
                ? 'bg-[#4A7C59] text-white font-semibold'
                : 'bg-[#ECE6DA] text-[#4A7C59] hover:text-[#4A7C59] border border-[#4A7C59]/30'
            }`}
          >
            Prime Whitespace
          </button>
          <button
            type="button"
            onClick={() => setSelectedQuadrant('niche')}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedQuadrant === 'niche'
                ? 'bg-[#6C5E8F] text-white font-semibold'
                : 'bg-[#ECE6DA] text-[#6C5E8F] hover:text-[#6C5E8F] border border-[#6C5E8F]/30'
            }`}
          >
            Niche
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 4-Quadrant Visual Opportunity Map (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C5] text-xs font-mono">
            <span className="text-[#2B3D4F] font-semibold">Demand vs. Competition Grid</span>
            <span className="text-[#6B7D90]">Click Zone to Filter</span>
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
                  ? 'bg-[#4A7C59]/25 border-[#4A7C59] shadow-sm ring-1 ring-[#2B3D4F]/40'
                  : 'bg-[#4A7C59]/30 border-[#4A7C59]/30 hover:border-[#4A7C59]/60'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#4A7C59] block">
                  ▲ PRIME OPPORTUNITY
                </span>
                <span className="text-[10px] text-[#4A5E73] block mt-0.5">High Demand · Low Comp</span>
              </div>
              <div className="text-xs font-medium text-[#4A7C59] mt-2">
                {opportunityGaps.find((g) => g.quadrant === 'prime_opportunity')?.title ||
                  'Specialized Craft & Transparency Wedge'}
              </div>
            </div>

            {/* Top Right: CROWDED */}
            <div
              onClick={() => setSelectedQuadrant('crowded')}
              className={`p-3 rounded-lg border flex flex-col justify-between min-h-[120px] cursor-pointer transition-all ${
                selectedQuadrant === 'crowded'
                  ? 'bg-[#9E4A4A]/15 border-[#9E4A4A] shadow-sm ring-1 ring-[#2B3D4F]/40'
                  : 'bg-[#9E4A4A]/20 border-[#9E4A4A]/20 hover:border-[#9E4A4A]/50'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#9E4A4A] block">
                  ▲ CROWDED (AVOID)
                </span>
                <span className="text-[10px] text-[#4A5E73] block mt-0.5">High Demand · High Comp</span>
              </div>
              <div className="text-xs font-medium text-[#9E4A4A]/80 mt-2">
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
                  ? 'bg-[#6C5E8F]/30 border-[#6C5E8F] shadow-sm ring-1 ring-[#2B3D4F]/40'
                  : 'bg-[#6C5E8F]/10 border-[#6C5E8F]/30 hover:border-[#6C5E8F]/50'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#6C5E8F] block">
                  ▼ SPECIALIZED NICHE
                </span>
                <span className="text-[10px] text-[#4A5E73] block mt-0.5">Focused · Defensible</span>
              </div>
              <div className="text-xs font-medium text-[#6C5E8F] mt-2">
                {opportunityGaps.find((g) => g.quadrant === 'niche')?.title ||
                  'Bespoke Enterprise Customization'}
              </div>
            </div>

            {/* Bottom Right: LOW PRIORITY */}
            <div
              onClick={() => setSelectedQuadrant('low_priority')}
              className={`p-3 rounded-lg border flex flex-col justify-between min-h-[120px] cursor-pointer transition-all ${
                selectedQuadrant === 'low_priority'
                  ? 'bg-[#ECE6DA] border-[#7A8CA0] shadow-sm'
                  : 'bg-[#F5F1EB] border-[#DDD5C5] hover:border-[#7A8CA0]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#6B7D90] block">
                  ▼ LOW PRIORITY
                </span>
                <span className="text-[10px] text-[#6B7D90] block mt-0.5">Low Demand · High Comp</span>
              </div>
              <div className="text-xs font-medium text-[#4A5E73] mt-2">
                Unprofitable Segment / Slow Churn
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#6B7D90] text-center pt-2 border-t border-[#DDD5C5]">
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
                    ? 'bg-[#ECE6DA] border-[#2B3D4F] shadow-lg ring-1 ring-[#2B3D4F]/30'
                    : 'bg-[#F5F1EB] border-[#DDD5C5] hover:border-[#2B3D4F]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2B3D4F]" />
                      <h3 className="text-sm font-bold text-[#2B3D4F]">{gap.title}</h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${quad.bg}`}>
                        {gap.quadrant.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5E73] mt-1">{gap.opportunityAngle}</p>
                  </div>

                  <span className="text-xs font-mono text-[#6B7D90] shrink-0">
                    Confidence: <span className="text-[#2B3D4F] font-semibold">{gap.confidence}</span>
                  </span>
                </div>

                {/* Visual Gap Contrast Bars */}
                <div className="mt-3 pt-3 border-t border-[#DDD5C5]/80 space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#4A5E73]">Unmet Customer Need / Expectation</span>
                      <span className="text-[#4A7C59] font-bold">100% Demand Severity</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#F5F1EB] border border-[#DDD5C5] overflow-hidden">
                      <div className="w-full h-full bg-[#4A7C59] rounded" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#4A5E73]">Current Competitor Coverage</span>
                      <span className="text-[#8A6D2B] font-bold">35% Adequate</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#F5F1EB] border border-[#DDD5C5] overflow-hidden">
                      <div className="w-[35%] h-full bg-[#8A6D2B] rounded" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#2B3D4F] font-bold">Unserved Whitespace (Your Wedge)</span>
                      <span className="text-[#2B3D4F] font-bold">65% Open Space</span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#F5F1EB] border border-[#DDD5C5] overflow-hidden">
                      <div className="w-[65%] h-full bg-[#2B3D4F] rounded" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-[#DDD5C5] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fade-in">
                    <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono text-[#4A7C59] block uppercase font-semibold">
                        What Appears Underserved
                      </span>
                      <p className="text-xs text-[#2B3D4F] leading-relaxed">
                        {gap.underservedAspect}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono text-[#2B3D4F] block uppercase font-semibold">
                        Why It Matters
                      </span>
                      <p className="text-xs text-[#4A5E73] leading-relaxed">
                        {gap.whyItMatters}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono text-[#5B6B7F] block uppercase font-semibold">
                        Supporting Evidence
                      </span>
                      <p className="text-xs text-[#4A5E73] leading-relaxed">
                        {gap.supportingEvidence}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono text-[#8A6D2B] block uppercase font-semibold">
                        Competitors Addressing It
                      </span>
                      <p className="text-xs text-[#4A5E73] leading-relaxed">
                        {gap.competitorsAddressing.join(', ')}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#FDFCF8] border border-[#9E4A4A]/20 space-y-1">
                      <span className="text-[10px] font-mono text-[#9E4A4A] block uppercase font-semibold">
                        What Remains Unresolved
                      </span>
                      <p className="text-xs text-[#4A5E73] leading-relaxed">
                        {gap.unresolvedElement}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#FDFCF8] border border-[#2B3D4F]/20 space-y-1">
                      <span className="text-[10px] font-mono text-[#2B3D4F] block uppercase font-semibold">
                        Validation Next Step
                      </span>
                      <p className="text-xs text-[#4A5E73] leading-relaxed">
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
