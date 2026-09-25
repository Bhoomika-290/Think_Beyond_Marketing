import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Sparkles } from 'lucide-react';
import type { MarketOpportunityGap } from '../../types/project';
import { ChartEmptyState } from '../common/ChartEmptyState';

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
          bg: 'bg-[#064E3B]/20 border-[#059669]/50 text-[#34D399]',
          badge: 'bg-[#064E3B] text-[#34D399] border-[#059669]/60',
          title: 'Prime Opportunity (High Demand · Low Incumbency)',
          accent: '#10B981',
        };
      case 'crowded':
        return {
          bg: 'bg-[#4C0519]/20 border-[#E11D48]/40 text-[#FDA4AF]',
          badge: 'bg-[#4C0519] text-[#FDA4AF] border-[#E11D48]/50',
          title: 'Crowded Zone (High Demand · High Incumbency)',
          accent: '#E11D48',
        };
      case 'niche':
        return {
          bg: 'bg-[#2E1065]/20 border-[#8B5CF6]/40 text-[#DDD6FE]',
          badge: 'bg-[#2E1065] text-[#DDD6FE] border-[#8B5CF6]/50',
          title: 'Specialized Niche (Focused Need · Defensible)',
          accent: '#8B5CF6',
        };
      case 'low_priority':
      default:
        return {
          bg: 'bg-[#1E293B]/40 border-[#475569]/50 text-[#94A3B8]',
          badge: 'bg-[#1E293B] text-[#94A3B8] border-[#475569]',
          title: 'Low Priority (Low Demand · Slow Growth)',
          accent: '#64748B',
        };
    }
  };

  const filteredGaps =
    selectedQuadrant === 'all'
      ? opportunityGaps
      : opportunityGaps.filter((g) => g.quadrant === selectedQuadrant);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111823] p-4 rounded-xl border border-[#263244]">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#38BDF8]" />
            <h2 className="text-base font-bold text-[#F1F5F9]">
              Market Whitespace & Opportunity Matrix
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#064E3B]/80 text-[#34D399] border border-[#059669]/40">
              Demand vs. Competition
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Maps underserved buyer friction points against incumbent density to reveal high-margin entry wedges.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedQuadrant('all')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              selectedQuadrant === 'all'
                ? 'bg-[#38BDF8] text-[#0B1320] font-bold shadow-xs'
                : 'bg-[#182230] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#263244]'
            }`}
          >
            All Quadrants ({opportunityGaps.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedQuadrant('prime_opportunity');
              const g = opportunityGaps.find((item) => item.quadrant === 'prime_opportunity');
              if (g) setSelectedGap(g);
            }}
            className={`px-3 py-1 rounded-lg transition-colors ${
              selectedQuadrant === 'prime_opportunity'
                ? 'bg-[#059669] text-white font-bold shadow-xs'
                : 'bg-[#182230] text-[#34D399] hover:bg-[#064E3B]/40 border border-[#059669]/40'
            }`}
          >
            Prime Whitespace
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedQuadrant('niche');
              const g = opportunityGaps.find((item) => item.quadrant === 'niche');
              if (g) setSelectedGap(g);
            }}
            className={`px-3 py-1 rounded-lg transition-colors ${
              selectedQuadrant === 'niche'
                ? 'bg-[#8B5CF6] text-white font-bold shadow-xs'
                : 'bg-[#182230] text-[#C084FC] hover:bg-[#2E1065]/40 border border-[#8B5CF6]/40'
            }`}
          >
            Specialized Niche
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedQuadrant('crowded');
              const g = opportunityGaps.find((item) => item.quadrant === 'crowded');
              if (g) setSelectedGap(g);
            }}
            className={`px-3 py-1 rounded-lg transition-colors ${
              selectedQuadrant === 'crowded'
                ? 'bg-[#E11D48] text-white font-bold shadow-xs'
                : 'bg-[#182230] text-[#FDA4AF] hover:bg-[#4C0519]/40 border border-[#E11D48]/40'
            }`}
          >
            Crowded / Avoid
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 4-Quadrant Visual Opportunity Map (5 Cols) */}
        <div className="lg:col-span-5 bg-[#111823] border border-[#263244] rounded-xl p-5 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#1C2635] text-xs font-mono">
            <span className="text-[#F1F5F9] font-bold">2×2 Whitespace Topology</span>
            <span className="text-[#64748B]">Click quadrant to inspect</span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-4">
            {/* Top Left: PRIME OPPORTUNITY */}
            <div
              onClick={() => {
                setSelectedQuadrant('prime_opportunity');
                const primeGap = opportunityGaps.find((g) => g.quadrant === 'prime_opportunity');
                if (primeGap) setSelectedGap(primeGap);
              }}
              className={`p-4 rounded-xl border flex flex-col justify-between min-h-[140px] cursor-pointer transition-all ${
                selectedQuadrant === 'prime_opportunity'
                  ? 'bg-[#064E3B]/40 border-[#10B981] shadow-lg ring-2 ring-[#10B981]/50'
                  : 'bg-[#064E3B]/20 border-[#059669]/40 hover:border-[#10B981]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#34D399] block tracking-wider">
                  ▲ PRIME OPPORTUNITY
                </span>
                <span className="text-[10px] text-[#A7F3D0] block mt-0.5">High Demand · Low Incumbency</span>
              </div>
              <div className="text-xs font-semibold text-[#ECFDF5] mt-3 line-clamp-2">
                {opportunityGaps.find((g) => g.quadrant === 'prime_opportunity')?.title ||
                  'High-Demand Underserved Wedge'}
              </div>
              <div className="text-[10px] font-mono text-[#34D399] mt-2">
                Recommended Beachhead
              </div>
            </div>

            {/* Top Right: CROWDED */}
            <div
              onClick={() => {
                setSelectedQuadrant('crowded');
                const crowdedGap = opportunityGaps.find((g) => g.quadrant === 'crowded');
                if (crowdedGap) setSelectedGap(crowdedGap);
              }}
              className={`p-4 rounded-xl border flex flex-col justify-between min-h-[140px] cursor-pointer transition-all ${
                selectedQuadrant === 'crowded'
                  ? 'bg-[#4C0519]/40 border-[#E11D48] shadow-lg ring-2 ring-[#E11D48]/50'
                  : 'bg-[#4C0519]/20 border-[#E11D48]/40 hover:border-[#E11D48]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#FDA4AF] block tracking-wider">
                  ▲ CROWDED / AVOID
                </span>
                <span className="text-[10px] text-[#FECDD3] block mt-0.5">High Demand · High Incumbency</span>
              </div>
              <div className="text-xs font-semibold text-[#FFF1F2] mt-3 line-clamp-2">
                {opportunityGaps.find((g) => g.quadrant === 'crowded')?.title ||
                  'Mass-Market Price War / High CAC'}
              </div>
              <div className="text-[10px] font-mono text-[#FDA4AF] mt-2">
                High Acquisition Risk
              </div>
            </div>

            {/* Bottom Left: NICHE */}
            <div
              onClick={() => {
                setSelectedQuadrant('niche');
                const nicheGap = opportunityGaps.find((g) => g.quadrant === 'niche');
                if (nicheGap) setSelectedGap(nicheGap);
              }}
              className={`p-4 rounded-xl border flex flex-col justify-between min-h-[140px] cursor-pointer transition-all ${
                selectedQuadrant === 'niche'
                  ? 'bg-[#2E1065]/40 border-[#8B5CF6] shadow-lg ring-2 ring-[#8B5CF6]/50'
                  : 'bg-[#2E1065]/20 border-[#8B5CF6]/40 hover:border-[#8B5CF6]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#DDD6FE] block tracking-wider">
                  ▼ SPECIALIZED NICHE
                </span>
                <span className="text-[10px] text-[#E9D5FF] block mt-0.5">Focused Audience · Defensible</span>
              </div>
              <div className="text-xs font-semibold text-[#FAF5FF] mt-3 line-clamp-2">
                {opportunityGaps.find((g) => g.quadrant === 'niche')?.title ||
                  'High-Retention Specialty Segment'}
              </div>
              <div className="text-[10px] font-mono text-[#C084FC] mt-2">
                Strong Pricing Power
              </div>
            </div>

            {/* Bottom Right: LOW PRIORITY */}
            <div
              onClick={() => {
                setSelectedQuadrant('low_priority');
                const lowGap = opportunityGaps.find((g) => g.quadrant === 'low_priority');
                if (lowGap) setSelectedGap(lowGap);
              }}
              className={`p-4 rounded-xl border flex flex-col justify-between min-h-[140px] cursor-pointer transition-all ${
                selectedQuadrant === 'low_priority'
                  ? 'bg-[#1E293B]/60 border-[#64748B] shadow-lg ring-2 ring-[#64748B]/50'
                  : 'bg-[#1E293B]/30 border-[#334155] hover:border-[#64748B]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#94A3B8] block tracking-wider">
                  ▼ LOW PRIORITY
                </span>
                <span className="text-[10px] text-[#64748B] block mt-0.5">Low Demand · High Friction</span>
              </div>
              <div className="text-xs font-semibold text-[#CBD5E1] mt-3 line-clamp-2">
                {opportunityGaps.find((g) => g.quadrant === 'low_priority')?.title ||
                  'Low Willingness to Pay'}
              </div>
              <div className="text-[10px] font-mono text-[#64748B] mt-2">
                Deprioritize in V1
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#64748B] text-center pt-3 border-t border-[#1C2635] flex items-center justify-between">
            <span>↑ Vertical: Buyer Pain & Demand</span>
            <span>Horizontal: Incumbent Density →</span>
          </div>
        </div>

        {/* Whitespace Gap Cards & Inspector Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredGaps.length === 0 ? (
            <ChartEmptyState
              title={opportunityGaps.length === 0 ? 'No whitespace mapped yet' : 'No gaps in this zone'}
              message={
                opportunityGaps.length === 0
                  ? 'Whitespace unlocks from your Stage 01 target audience + problem inputs — complete discovery to map underserved needs.'
                  : `No opportunity gaps match the current zone filter — clear the filter or refine your Stage 01 target audience + problem inputs.`
              }
              hint={opportunityGaps.length === 0 ? 'Stage 01 → target audience / problem' : undefined}
              action={
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Link
                    to="/idea-lab"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#38BDF8] underline underline-offset-2 hover:text-[#93C5FD]"
                  >
                    Complete Stage 01 in Idea Lab →
                  </Link>
                  {opportunityGaps.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedQuadrant('all')}
                      className="text-xs font-mono font-semibold text-[#94A3B8] underline underline-offset-2 hover:text-[#F1F5F9]"
                    >
                      Show all quadrants
                    </button>
                  )}
                </div>
              }
            />
          ) : (
            filteredGaps.map((gap) => {
              const isSelected = selectedGap?.id === gap.id;
              const quad = getQuadrantColor(gap.quadrant);

              // Calculate honest model indicators based on gap parameters (NO hardcoded percentages)
              const demandLevelText = gap.demandLevel === 'High' ? 'Acute Market Need' : gap.demandLevel === 'Medium' ? 'Moderate Demand' : 'Emerging / Niche Need';
              const compLevelText = gap.competitionLevel === 'Crowded' ? 'Dense Incumbent Coverage' : gap.competitionLevel === 'Moderate' ? 'Fragmented Competitors' : 'Minimal Incumbent Presence';
              const whitespaceRating = gap.quadrant === 'prime_opportunity' ? 'Substantial Unserved Whitespace' : gap.quadrant === 'niche' ? 'Focused Moat Opportunity' : gap.quadrant === 'crowded' ? 'Constrained Whitespace (Price War)' : 'Limited Commercial Pull';

              return (
                <div
                  key={gap.id}
                  onClick={() => setSelectedGap(isSelected ? null : gap)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-[#151D29] border-[#38BDF8] ring-1 ring-[#38BDF8]/40'
                      : 'bg-[#111823] border-[#263244] hover:border-[#38BDF8]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                        <h3 className="text-sm font-bold text-[#F1F5F9]">{gap.title}</h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${quad.badge}`}>
                          {gap.quadrant.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">{gap.opportunityAngle}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-[#64748B] block">Evidence Confidence:</span>
                      <span className="text-xs font-mono text-[#38BDF8] font-bold">{gap.confidence}</span>
                    </div>
                  </div>

                  {/* Evidence-Derived Market Condition Indicators */}
                  <div className="mt-4 pt-3 border-t border-[#1C2635] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded bg-[#0A1017] border border-[#1A2332]">
                      <span className="text-[9px] text-[#64748B] block uppercase tracking-wider">Demand Signal</span>
                      <span className="text-xs text-[#34D399] font-semibold mt-0.5 block">{demandLevelText}</span>
                      <span className="text-[10px] text-[#64748B] mt-0.5 block">{gap.provenance || 'Founder Signal'}</span>
                    </div>

                    <div className="p-2.5 rounded bg-[#0A1017] border border-[#1A2332]">
                      <span className="text-[9px] text-[#64748B] block uppercase tracking-wider">Incumbent Coverage</span>
                      <span className="text-xs text-[#F59E0B] font-semibold mt-0.5 block">{compLevelText}</span>
                      <span className="text-[10px] text-[#64748B] mt-0.5 block">
                        {gap.competitorsAddressing.length > 0
                          ? `${gap.competitorsAddressing.length} player(s) tracked`
                          : 'No direct incumbent'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded bg-[#0A1017] border border-[#1A2332]">
                      <span className="text-[9px] text-[#64748B] block uppercase tracking-wider">Strategic Wedge</span>
                      <span className="text-xs text-[#38BDF8] font-semibold mt-0.5 block">{whitespaceRating}</span>
                      <span className="text-[10px] text-[#64748B] mt-0.5 block">Stage 03 Synthesis</span>
                    </div>
                  </div>

                  {/* Expanded Details Panel */}
                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-[#1C2635] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-fade-in">
                      <div className="p-3 rounded bg-[#0A1017] border border-[#10B981]/30 space-y-1">
                        <span className="text-[10px] font-mono text-[#34D399] block uppercase font-bold">
                          What Appears Underserved
                        </span>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          {gap.underservedAspect || 'High-quality execution currently absent in market.'}
                        </p>
                      </div>

                      <div className="p-3 rounded bg-[#0A1017] border border-[#38BDF8]/30 space-y-1">
                        <span className="text-[10px] font-mono text-[#38BDF8] block uppercase font-bold">
                          Why It Matters
                        </span>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          {gap.whyItMatters || 'Creates high switching intent and organic word-of-mouth.'}
                        </p>
                      </div>

                      <div className="p-3 rounded bg-[#0A1017] border border-[#1E293B] space-y-1">
                        <span className="text-[10px] font-mono text-[#94A3B8] block uppercase font-bold">
                          Supporting Evidence
                        </span>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {gap.supportingEvidence || 'Derived from competitor feature matrix and pricing analysis.'}
                        </p>
                      </div>

                      <div className="p-3 rounded bg-[#0A1017] border border-[#1E293B] space-y-1">
                        <span className="text-[10px] font-mono text-[#F59E0B] block uppercase font-bold">
                          Incumbents in Zone
                        </span>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          {gap.competitorsAddressing.length > 0
                            ? gap.competitorsAddressing.join(', ')
                            : 'Zero direct incumbent coverage observed.'}
                        </p>
                      </div>

                      <div className="p-3 rounded bg-[#0A1017] border border-[#E11D48]/30 space-y-1">
                        <span className="text-[10px] font-mono text-[#FDA4AF] block uppercase font-bold">
                          What Remains Unresolved
                        </span>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          {gap.unresolvedElement || 'Willingness to pay requires direct customer testing.'}
                        </p>
                      </div>

                      <div className="p-3 rounded bg-[#0A1017] border border-[#8B5CF6]/30 space-y-1">
                        <span className="text-[10px] font-mono text-[#C084FC] block uppercase font-bold">
                          Validation Next Step
                        </span>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          {gap.whatToValidateNext || 'Conduct 5 customer discovery interviews in Stage 02.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

