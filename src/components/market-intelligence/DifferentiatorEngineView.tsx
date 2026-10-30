import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, SlidersHorizontal } from 'lucide-react';
import type { DifferentiatorEngineData, DifferentiationOpportunityItem } from '../../types/project';
import { ChartEmptyState } from '../common/ChartEmptyState';

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
        return 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30';
      case 'Emerging opportunity':
        return 'bg-[#E8F2FF] text-[#2684F7] border-[#2684F7]/30';
      case 'Evidence-supported gap':
        return 'bg-[#5B6B7F]/15 text-[#60738F] border-[#5B6B7F]/30';
      case 'Requires validation':
      default:
        return 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFFFF] p-4 rounded-xl border border-[#E2EAF4]">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#2684F7]" />
            <h2 className="text-base font-semibold text-[#14213D]">
              Differentiator Engine
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              Strategy Canvas
            </span>
          </div>
          <p className="text-xs text-[#60738F] mt-1">
            Translates <span className="text-[#14213D] font-semibold">Evidence</span> → <span className="text-[#60738F] font-semibold">Competitive Gap</span> → <span className="text-[#19A875] font-semibold">Differentiation Opportunity</span> across 10 strategic dimensions.
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
                  ? 'bg-[#14213D] text-white font-semibold'
                  : 'bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4]'
              }`}
            >
              All Dimensions
            </button>
            <button
              type="button"
              onClick={() => setSelectedDimensionFilter('differentiator')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedDimensionFilter === 'differentiator'
                  ? 'bg-[#19A875] text-white font-semibold'
                  : 'bg-[#EEF4FB] text-[#19A875] hover:text-[#19A875] border border-[#19A875]/30'
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
                  : 'bg-[#EEF4FB] text-[#60738F] hover:text-[#60738F] border border-[#5B6B7F]/30'
              }`}
            >
              Gaps
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono bg-[#FFFFFF] px-2.5 py-1 rounded border border-[#E2EAF4] text-[#60738F]">
            <span className="text-[#19A875]">Evidence</span>
            <ArrowRight className="w-3 h-3 text-[#60738F]" />
            <span className="text-[#60738F]">Gap</span>
            <ArrowRight className="w-3 h-3 text-[#60738F]" />
            <span className="text-[#14213D] font-semibold">Moat</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Strategy Canvas Visual Comparison (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2EAF4]">
            <div className="flex items-center gap-2 text-xs font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#2684F7]" />
              <span className="text-[#14213D] font-semibold">Competitive Curve: {ventureName} vs. Incumbents</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#2684F7]" />
                <span className="text-[#14213D]">{ventureName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#8495AE]" />
                <span className="text-[#60738F]">Incumbent Avg</span>
              </div>
            </div>
          </div>

          {/* Strategy Dimension Bars — empty guard names the Stage 01 differentiation input */}
          <div className="space-y-3 my-2">
            {filteredDimensions.length === 0 ? (
              <ChartEmptyState
                title={data.dimensions.length === 0 ? 'No differentiation dimensions yet' : 'No dimensions match this filter'}
                message={
                  data.dimensions.length === 0
                    ? 'The strategy canvas unlocks from your Stage 01 differentiation input — describe what makes you different to score dimensions.'
                    : 'No strategy dimensions match the current filter — clear it or refine your Stage 01 differentiation input.'
                }
                hint="Stage 01 → differentiation"
                action={
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Link
                      to="/idea-lab"
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#2684F7] underline underline-offset-2 hover:text-[#1769D2]"
                    >
                      Complete Stage 01 in Idea Lab →
                    </Link>
                    {data.dimensions.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedDimensionFilter('all')}
                        className="text-xs font-mono font-semibold text-[#60738F] underline underline-offset-2 hover:text-[#14213D]"
                      >
                        Clear filter
                      </button>
                    )}
                  </div>
                }
              />
            ) : (
              filteredDimensions.map((dim) => {
              const delta = dim.ventureScore - dim.incumbentAvgScore;
              return (
                <div key={dim.dimensionKey} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#14213D] text-[11px]">{dim.dimension}</span>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-[#14213D] font-bold">{dim.ventureScore}</span>
                      <span className="text-[#60738F]">vs</span>
                      <span className="text-[#60738F]">{dim.incumbentAvgScore}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] ${
                          delta > 25
                            ? 'text-[#19A875] bg-[#E8F8F1]'
                            : delta > 10
                            ? 'text-[#2684F7] bg-[#E8F2FF]'
                            : 'text-[#60738F] bg-[#EEF4FB]'
                        }`}
                      >
                        {delta > 0 ? `+${delta}` : delta}
                      </span>
                    </div>
                  </div>

                  {/* Dual Comparison Bar */}
                  <div className="w-full h-2.5 rounded-full bg-[#EEF4FB] border border-[#E2EAF4] p-0.5 overflow-hidden flex flex-col justify-center relative">
                    {/* Incumbent benchmark marker */}
                    <div
                      style={{ left: `${dim.incumbentAvgScore}%` }}
                      className="absolute top-0 bottom-0 w-1 bg-[#8495AE] z-10 rounded-full opacity-80"
                      title={`Incumbent Avg: ${dim.incumbentAvgScore}`}
                    />
                    {/* Venture progress bar */}
                    <div
                      style={{ width: `${dim.ventureScore}%` }}
                      className="h-1.5 rounded-full transition-all duration-700 bg-[#2684F7]"
                    />
                  </div>
                </div>
              );
            })
            )}
          </div>

          <div className="pt-3 border-t border-[#E2EAF4] text-[11px] font-mono text-[#60738F] flex items-center justify-between">
            <span>Dimensions scored 0–100 against status-quo incumbents</span>
            <span className="text-[#19A875]">Verified via Stage 01/02 context</span>
          </div>
        </div>

        {/* Potential Differentiation Opportunities Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[#60738F] pb-1">
            Surfaced Differentiation Vectors ({data.opportunities.length}):
          </div>

          {data.opportunities.length === 0 ? (
            <ChartEmptyState
              title="No differentiation vectors yet"
              message="Differentiation vectors unlock from your Stage 01 differentiation input — describe your edge to surface moats."
              hint="Stage 01 → differentiation"
              action={
                <Link
                  to="/idea-lab"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#2684F7] underline underline-offset-2 hover:text-[#1769D2]"
                >
                  Complete Stage 01 in Idea Lab →
                </Link>
              }
            />
          ) : (
            data.opportunities.map((opp) => {
            const isSelected = selectedOpportunity?.id === opp.id;
            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpportunity(isSelected ? null : opp)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#2684F7] shadow-md ring-2 ring-[#2684F7]/25'
                    : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-[#2684F7]/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2684F7]" />
                      <h3 className="text-xs font-bold text-[#14213D]">{opp.differentiationArea}</h3>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border whitespace-nowrap ${getStatusBadge(
                        opp.statusLabel
                      )}`}
                    >
                      {opp.statusLabel}
                    </span>
                  </div>

                  <p className="text-xs text-[#60738F] leading-relaxed">
                    {opp.whyThisMatters}
                  </p>

                  {/* Intelligence Chain Inspector (Appears when card is active) */}
                  {isSelected && (
                    <div className="pt-3 border-t border-[#E2EAF4] space-y-2 text-xs animate-fade-in">
                      <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
                        <span className="text-[10px] font-mono text-[#60738F] uppercase tracking-wider block mb-0.5">
                          1. Connected Market Gap
                        </span>
                        <p className="text-xs text-[#14213D] leading-snug">{opp.connectedMarketGap}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#FFF0EF] border border-[#E46D68]/20">
                        <span className="text-[10px] font-mono text-[#E46D68] uppercase tracking-wider block mb-0.5">
                          2. Incumbent Vulnerability
                        </span>
                        <p className="text-xs text-[#60738F] leading-snug">{opp.currentCompetitiveSituation}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#E8F8F1] border border-[#19A875]/20">
                        <span className="text-[10px] font-mono text-[#19A875] uppercase tracking-wider block mb-0.5">
                          3. Supporting Evidence
                        </span>
                        <p className="text-xs text-[#60738F] leading-snug">{opp.supportingEvidence}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#FFF3E7] border border-[#F29A42]/20">
                        <span className="text-[10px] font-mono text-[#F29A42] uppercase tracking-wider block mb-0.5">
                          4. Validation Requirement Before Capital Spend
                        </span>
                        <p className="text-xs text-[#60738F] leading-snug">{opp.validationRequirement}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#60738F] pt-1">
                    <span>Confidence: {opp.confidence}</span>
                    <span>Provenance: {opp.provenance}</span>
                  </div>
                </div>
              </div>
            );
          })
          )}
        </div>
      </div>
    </div>
  );
};
