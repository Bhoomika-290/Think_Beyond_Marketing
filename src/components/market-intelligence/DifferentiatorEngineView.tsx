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
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Emerging opportunity':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Evidence-supported gap':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Requires validation':
      default:
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0B1017] p-4 rounded-xl border border-[#263244]">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#4D8DFF]" />
            <h2 className="text-base font-semibold text-[#F3F4F6]">
              Differentiator Engine
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4D8DFF]/10 text-[#4D8DFF] border border-[#4D8DFF]/20">
              Strategy Canvas
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Translates <span className="text-[#4D8DFF] font-semibold">Evidence</span> → <span className="text-purple-400 font-semibold">Competitive Gap</span> → <span className="text-emerald-400 font-semibold">Differentiation Opportunity</span> across 10 strategic dimensions.
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
                  ? 'bg-[#4D8DFF] text-white font-semibold'
                  : 'bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244]'
              }`}
            >
              All Dimensions
            </button>
            <button
              type="button"
              onClick={() => setSelectedDimensionFilter('differentiator')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedDimensionFilter === 'differentiator'
                  ? 'bg-emerald-500 text-white font-semibold'
                  : 'bg-[#151E2B] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30'
              }`}
            >
              Differentiators
            </button>
            <button
              type="button"
              onClick={() => setSelectedDimensionFilter('gap')}
              className={`px-2 py-1 rounded transition-colors ${
                selectedDimensionFilter === 'gap'
                  ? 'bg-purple-500 text-white font-semibold'
                  : 'bg-[#151E2B] text-purple-400 hover:text-purple-300 border border-purple-500/30'
              }`}
            >
              Gaps
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono bg-[#111823] px-2.5 py-1 rounded border border-[#263244] text-[#AAB4C3]">
            <span className="text-emerald-400">Evidence</span>
            <ArrowRight className="w-3 h-3 text-[#64748B]" />
            <span className="text-purple-400">Gap</span>
            <ArrowRight className="w-3 h-3 text-[#64748B]" />
            <span className="text-[#4D8DFF] font-semibold">Moat</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Strategy Canvas Visual Comparison (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0B1017] border border-[#263244] rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#263244]">
            <div className="flex items-center gap-2 text-xs font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#4D8DFF]" />
              <span className="text-[#F3F4F6] font-semibold">Competitive Curve: {ventureName} vs. Incumbents</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#4D8DFF]" />
                <span className="text-[#F3F4F6]">{ventureName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-slate-600" />
                <span className="text-[#AAB4C3]">Incumbent Avg</span>
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
                    <span className="font-medium text-[#F3F4F6] text-[11px]">{dim.dimension}</span>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-[#4D8DFF] font-bold">{dim.ventureScore}</span>
                      <span className="text-[#64748B]">vs</span>
                      <span className="text-slate-400">{dim.incumbentAvgScore}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] ${
                          delta > 25
                            ? 'text-emerald-400 bg-emerald-500/10'
                            : delta > 10
                            ? 'text-blue-400 bg-blue-500/10'
                            : 'text-slate-400 bg-slate-800'
                        }`}
                      >
                        {delta > 0 ? `+${delta}` : delta}
                      </span>
                    </div>
                  </div>

                  {/* Dual Comparison Bar */}
                  <div className="w-full h-2.5 rounded-full bg-[#111823] p-0.5 overflow-hidden flex flex-col justify-center relative">
                    {/* Incumbent benchmark marker */}
                    <div
                      style={{ left: `${dim.incumbentAvgScore}%` }}
                      className="absolute top-0 bottom-0 w-1 bg-slate-400 z-10 rounded-full opacity-80"
                      title={`Incumbent Avg: ${dim.incumbentAvgScore}`}
                    />
                    {/* Venture progress bar */}
                    <div
                      style={{ width: `${dim.ventureScore}%` }}
                      className={`h-1.5 rounded-full transition-all duration-700 ${
                        dim.ventureScore >= 85
                          ? 'bg-gradient-to-r from-[#4D8DFF] to-emerald-400'
                          : 'bg-[#4D8DFF]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#263244] text-[11px] font-mono text-[#64748B] flex items-center justify-between">
            <span>Dimensions scored 0–100 against status-quo incumbents</span>
            <span className="text-emerald-400">Verified via Stage 01/02 context</span>
          </div>
        </div>

        {/* Potential Differentiation Opportunities Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[#64748B] pb-1">
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
                    ? 'bg-[#151E2B] border-[#4D8DFF] shadow-lg ring-1 ring-[#4D8DFF]/30'
                    : 'bg-[#0B1017] border-[#263244] hover:border-[#4D8DFF]/40'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#4D8DFF]" />
                      <h3 className="text-xs font-bold text-[#F3F4F6]">{opp.differentiationArea}</h3>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border whitespace-nowrap ${getStatusBadge(
                        opp.statusLabel
                      )}`}
                    >
                      {opp.statusLabel}
                    </span>
                  </div>

                  <p className="text-xs text-[#AAB4C3] leading-relaxed">
                    {opp.whyThisMatters}
                  </p>

                  {/* Intelligence Chain Inspector (Appears when card is active) */}
                  {isSelected && (
                    <div className="pt-3 border-t border-[#263244] space-y-2 text-xs animate-fade-in">
                      <div className="p-2.5 rounded bg-[#111823] border border-[#263244]">
                        <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-0.5">
                          1. Connected Market Gap
                        </span>
                        <p className="text-xs text-[#F3F4F6] leading-snug">{opp.connectedMarketGap}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#111823] border border-[#263244]">
                        <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block mb-0.5">
                          2. Incumbent Vulnerability
                        </span>
                        <p className="text-xs text-[#AAB4C3] leading-snug">{opp.currentCompetitiveSituation}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#111823] border border-[#263244]">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-0.5">
                          3. Supporting Evidence
                        </span>
                        <p className="text-xs text-[#AAB4C3] leading-snug">{opp.supportingEvidence}</p>
                      </div>

                      <div className="p-2.5 rounded bg-[#111823] border border-amber-500/20">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-0.5">
                          4. Validation Requirement Before Capital Spend
                        </span>
                        <p className="text-xs text-[#AAB4C3] leading-snug">{opp.validationRequirement}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
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
