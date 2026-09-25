import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, SlidersHorizontal } from 'lucide-react';
import type { DifferentiatorEngineData, DifferentiationOpportunityItem } from '../../types/project';

interface DifferentiatorEngineViewProps {
  data: DifferentiatorEngineData;
  ventureName: string;
}

export const DifferentiatorEngineView: React.FC<DifferentiatorEngineViewProps> = ({
  data,
  ventureName,
}) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<DifferentiationOpportunityItem | null>(
    data.opportunities[0] || null
  );
  const [selectedDimensionFilter, setSelectedDimensionFilter] = useState<string>('all');

  const getStatusBadge = (status: DifferentiationOpportunityItem['statusLabel']) => {
    switch (status) {
      case 'Potential differentiator':
        return 'bg-[#4A7C59]/15 text-[#4A7C59] border-[#4A7C59]/30';
      case 'Emerging opportunity':
        return 'bg-[#2B3D4F]/15 text-[#2B3D4F] border-[#2B3D4F]/30';
      case 'Evidence-supported gap':
        return 'bg-[#5B6B7F]/15 text-[#5B6B7F] border-[#5B6B7F]/30';
      case 'Requires validation':
      default:
        return 'bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30';
    }
  };

  const filteredDimensions =
    selectedDimensionFilter === 'all'
      ? data.dimensions
      : data.dimensions.filter((d) =>
          d.status.toLowerCase().includes(selectedDimensionFilter.toLowerCase())
        );

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FDFCF8] p-4 rounded-xl border border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#2B3D4F]" />
            <h2 className="text-base font-semibold text-[#2B3D4F]">
              Differentiator Engine
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/20">
              Strategy Canvas
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
            Translates <span className="text-[#2B3D4F] font-semibold">Evidence</span> → <span className="text-[#5B6B7F] font-semibold">Competitive Gap</span> → <span className="text-[#4A7C59] font-semibold">Differentiation Opportunity</span> across 10 strategic dimensions.
          </p>
        </div>

        {/* Visual Intelligence Chain Tag & Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setSelectedDimensionFilter('all')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedDimensionFilter === 'all'
                  ? 'bg-[#2B3D4F] text-white font-semibold'
                  : 'bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5]'
              }`}
            >
              All Dimensions
            </button>
            <button
              type="button"
              onClick={() => setSelectedDimensionFilter('differentiator')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedDimensionFilter === 'differentiator'
                  ? 'bg-[#4A7C59] text-white font-semibold'
                  : 'bg-[#ECE6DA] text-[#4A7C59] hover:text-[#4A7C59] border border-[#4A7C59]/30'
              }`}
            >
              Differentiators
            </button>
            <button
              type="button"
              onClick={() => setSelectedDimensionFilter('gap')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedDimensionFilter === 'gap'
                  ? 'bg-[#5B6B7F] text-white font-semibold'
                  : 'bg-[#ECE6DA] text-[#5B6B7F] hover:text-[#5B6B7F] border border-[#5B6B7F]/30'
              }`}
            >
              Gaps
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono bg-[#FDFCF8] px-2.5 py-1 rounded border border-[#DDD5C5] text-[#4A5E73]">
            <span className="text-[#4A7C59]">Evidence</span>
            <ArrowRight className="w-3 h-3 text-[#6B7D90]" />
            <span className="text-[#5B6B7F]">Gap</span>
            <ArrowRight className="w-3 h-3 text-[#6B7D90]" />
            <span className="text-[#2B3D4F] font-semibold">Moat</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Strategy Canvas Visual Comparison (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DDD5C5]">
            <div className="flex items-center gap-2 text-xs font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#2B3D4F]" />
              <span className="text-[#2B3D4F] font-semibold">Competitive Curve: {ventureName} vs. Incumbents</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#2B3D4F]" />
                <span className="text-[#2B3D4F]">{ventureName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#7A8CA0]" />
                <span className="text-[#4A5E73]">Incumbent Avg</span>
              </div>
            </div>
          </div>

          {/* Strategy Dimension Bars */}
          <div className="space-y-3 my-2">
            {filteredDimensions.map((dim) => {
              const delta = dim.ventureScore - dim.incumbentAvgScore;
              return (
                <div key={dim.dimensionKey} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#2B3D4F] text-[11px]">{dim.dimension}</span>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-[#2B3D4F] font-bold">{dim.ventureScore}</span>
                      <span className="text-[#6B7D90]">vs</span>
                      <span className="text-[#7A8CA0]">{dim.incumbentAvgScore}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] ${
                          delta > 25
                            ? 'text-[#4A7C59] bg-[#4A7C59]/10'
                            : delta > 10
                            ? 'text-[#2B3D4F] bg-[#2B3D4F]/10'
                            : 'text-[#4A5E73] bg-[#ECE6DA]'
                        }`}
                      >
                        {delta > 0 ? `+${delta}` : delta}
                      </span>
                    </div>
                  </div>

                  {/* Dual Comparison Bar */}
                  <div className="w-full h-2.5 rounded-full bg-[#F5F1EB] border border-[#DDD5C5] p-0.5 overflow-hidden flex flex-col justify-center relative">
                    {/* Incumbent benchmark marker */}
                    <div
                      style={{ left: `${dim.incumbentAvgScore}%` }}
                      className="absolute top-0 bottom-0 w-1 bg-[#7A8CA0] z-10 rounded-full opacity-80"
                      title={`Incumbent Avg: ${dim.incumbentAvgScore}`}
                    />
                    {/* Venture progress bar */}
                    <div
                      style={{ width: `${dim.ventureScore}%` }}
                      className="h-1.5 rounded-full transition-all duration-700 bg-[#2B3D4F]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#DDD5C5] text-[11px] font-mono text-[#6B7D90] flex items-center justify-between">
            <span>Dimensions scored 0–100 against status-quo incumbents</span>
            <span className="text-[#4A7C59]">Verified via Stage 01/02 context</span>
          </div>
        </div>

        {/* Potential Differentiation Opportunities Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[#6B7D90] pb-1">
            Surfaced Differentiation Vectors ({data.opportunities.length}):
          </div>

          {data.opportunities.map((opp) => {
            const isSelected = selectedOpportunity?.id === opp.id;
            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpportunity(isSelected ? null : opp)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ECE6DA] border-[#2B3D4F] shadow-lg ring-1 ring-[#2B3D4F]/30'
                    : 'bg-[#F5F1EB] border-[#DDD5C5] hover:border-[#2B3D4F]/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2B3D4F]" />
                      <h3 className="text-xs font-bold text-[#2B3D4F]">{opp.differentiationArea}</h3>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border whitespace-nowrap ${getStatusBadge(
                        opp.statusLabel
                      )}`}
                    >
                      {opp.statusLabel}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A5E73] leading-relaxed">
                    {opp.whyThisMatters}
                  </p>

                  {/* Intelligence Chain Inspector (Appears when card is active) */}
                  {isSelected && (
                    <div className="pt-3 border-t border-[#DDD5C5] space-y-2 text-xs animate-fade-in">
                      <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
                        <span className="text-[10px] font-mono text-[#5B6B7F] uppercase tracking-wider block mb-0.5">
                          1. Connected Market Gap
                        </span>
                        <p className="text-xs text-[#2B3D4F] leading-snug">{opp.connectedMarketGap}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
                        <span className="text-[10px] font-mono text-[#9E4A4A] uppercase tracking-wider block mb-0.5">
                          2. Incumbent Vulnerability
                        </span>
                        <p className="text-xs text-[#4A5E73] leading-snug">{opp.currentCompetitiveSituation}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
                        <span className="text-[10px] font-mono text-[#4A7C59] uppercase tracking-wider block mb-0.5">
                          3. Supporting Evidence
                        </span>
                        <p className="text-xs text-[#4A5E73] leading-snug">{opp.supportingEvidence}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#FDFCF8] border border-[#8A6D2B]/20">
                        <span className="text-[10px] font-mono text-[#8A6D2B] uppercase tracking-wider block mb-0.5">
                          4. Validation Requirement Before Capital Spend
                        </span>
                        <p className="text-xs text-[#4A5E73] leading-snug">{opp.validationRequirement}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6B7D90] pt-1">
                    <span>Confidence: {opp.confidence}</span>
                    <span>Provenance: {opp.provenance}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
