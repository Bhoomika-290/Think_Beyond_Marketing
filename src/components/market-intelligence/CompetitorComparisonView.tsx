import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import type { CompetitorItem } from '../../types/project';

interface CompetitorComparisonViewProps {
  competitors: CompetitorItem[];
  xLabel?: string;
  yLabel?: string;
}

const CATEGORY_DOT: Record<CompetitorItem['category'], string> = {
  direct: '#E46D68',
  indirect: '#F29A42',
  alternative_workaround: '#64748B',
};

const CATEGORY_LABEL: Record<CompetitorItem['category'], string> = {
  direct: 'direct',
  indirect: 'indirect',
  alternative_workaround: 'workaround',
};

export const CompetitorComparisonView: React.FC<CompetitorComparisonViewProps> = ({
  competitors,
  xLabel,
  yLabel,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getPriceTierBadge = (tier: CompetitorItem['priceTier']) => {
    switch (tier) {
      case 'budget':
        return { label: '$ Budget Mass', color: 'text-[#19A875] bg-[#E8F8F1] border-[#19A875]/30' };
      case 'mid_market':
        return { label: '$ Mid-Market', color: 'text-[#2684F7] bg-[#E8F2FF] border-[#2684F7]/30' };
      case 'premium':
        return { label: '$$$ Premium Craft', color: 'text-[#9272DB] bg-[#F2EDFF] border-[#9272DB]/30' };
      case 'enterprise':
        return { label: '$$$$ Enterprise Bespoke', color: 'text-[#F29A42] bg-[#FFF3E7] border-[#F29A42]/30' };
    }
  };

  const xAxisLabel = xLabel ?? 'X';
  const yAxisLabel = yLabel ?? 'Y';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#2684F7]" />
          <h3 className="text-sm font-semibold text-[#14213D]">Competitor Comparative Profiles</h3>
        </div>
        <span className="text-xs font-mono text-[#60738F]">
          {competitors.length} tracked entities
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {competitors.map((comp) => {
          const priceBadge = getPriceTierBadge(comp.priceTier);
          const isExpanded = expandedId === comp.id;
          const isSelected = selectedId === comp.id;
          const initial = (comp.name || '?').charAt(0).toUpperCase();
          const dotColor = CATEGORY_DOT[comp.category] ?? '#64748B';

          return (
            <div
              key={comp.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedId(isSelected ? null : comp.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId(isSelected ? null : comp.id);
                }
              }}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FFFFFF] border-[#2684F7] ring-2 ring-[#2684F7]/25 shadow-md'
                  : comp.isUserAdded
                    ? 'bg-[#E8F8F1] border-[#19A875]/30 hover:border-[#19A875]/60'
                    : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-[#2684F7]/40'
              }`}
            >
              <div className="space-y-2.5">
                {/* Identity row: avatar + category dot + badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border border-[#E2EAF4] bg-[#EEF4FB] text-[#14213D]"
                      aria-hidden="true"
                    >
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-bold text-[#14213D] truncate">{comp.name}</h4>
                        {comp.isUserAdded ? (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30 font-semibold">
                            USER
                          </span>
                        ) : (
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#EEF4FB] text-[#60738F] border border-[#E2EAF4] font-semibold"
                            title="Model-generated archetype — not a verified company"
                          >
                            ARCHETYPE
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: dotColor }}
                          aria-hidden="true"
                        />
                        <span className="text-[11px] font-mono text-[#60738F] capitalize">
                          {CATEGORY_LABEL[comp.category] ?? comp.category.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-mono text-[#60738F]">
                          Confidence:{' '}
                          <span className="text-[#60738F] font-semibold">{comp.confidence || 'Medium'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${priceBadge.color}`}
                  >
                    {priceBadge.label}
                  </span>
                </div>

                {/* Coordinates readout — existing coordinates only, no invented scores */}
                <div className="text-[10px] font-mono text-[#60738F] flex items-center gap-2">
                  <span>
                    {xAxisLabel}: <span className="text-[#60738F] font-semibold">{comp.coordinates.x}</span>
                  </span>
                  <span aria-hidden="true">•</span>
                  <span>
                    {yAxisLabel}: <span className="text-[#60738F] font-semibold">{comp.coordinates.y}</span>
                  </span>
                </div>

                <div className="text-xs text-[#60738F] bg-[#FFFFFF] p-2.5 rounded border border-[#E2EAF4]/80 leading-relaxed">
                  <span className="text-[10px] font-mono text-[#60738F] block mb-0.5">
                    POSITIONING CORE
                  </span>
                  {comp.positioningLabel}
                </div>

                {/* Compact customer / pricing lines — existing fields only */}
                {(comp.targetCustomer || comp.businessPricingModel) && (
                  <div className="space-y-1 text-[11px] leading-relaxed">
                    {comp.targetCustomer && (
                      <div className="text-[#60738F]">
                        <span className="font-mono text-[10px] text-[#60738F] uppercase">Serves: </span>
                        {comp.targetCustomer}
                      </div>
                    )}
                    {comp.businessPricingModel && (
                      <div className="text-[#60738F]">
                        <span className="font-mono text-[10px] text-[#60738F] uppercase">Pricing: </span>
                        {comp.businessPricingModel}
                      </div>
                    )}
                  </div>
                )}

                {/* Collapsed counts vs expanded full lists */}
                {!isExpanded ? (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#60738F]">
                    <span className="px-2 py-0.5 rounded bg-[#E8F8F1] border border-[#19A875]/20 text-[#19A875]">
                      {comp.strengths.length} strengths
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#FFF3E7] border border-[#F29A42]/20 text-[#F29A42]">
                      {comp.weaknesses.length} gaps
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2.5 pt-1 text-xs">
                    {comp.offeringSummary && (
                      <div className="text-xs text-[#60738F] leading-relaxed">
                        <span className="text-[10px] font-mono text-[#60738F] uppercase tracking-wide block mb-0.5">
                          Offering
                        </span>
                        {comp.offeringSummary}
                      </div>
                    )}
                    {comp.differentiationFactor && (
                      <div className="text-xs text-[#60738F] leading-relaxed">
                        <span className="text-[10px] font-mono text-[#60738F] uppercase tracking-wide block mb-0.5">
                          Differentiation
                        </span>
                        {comp.differentiationFactor}
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-mono text-[#19A875] uppercase tracking-wide block mb-1">
                        Strengths
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {comp.strengths.map((str, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/20"
                          >
                            {str}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-[#F29A42] uppercase tracking-wide block mb-1">
                        Weaknesses / Gaps
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {comp.weaknesses.map((wk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#FFF3E7] text-[#F29A42] border border-[#F29A42]/20"
                          >
                            {wk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(isExpanded ? null : comp.id);
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#60738F] hover:text-[#14213D] transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-3 h-3" /> Collapse details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" /> Expand details
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E2EAF4] space-y-1 text-[11px] font-mono">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#60738F]">Evidence:</span>
                  <span className={comp.evidenceSource ? 'text-[#60738F]' : 'text-[#60738F]'}>
                    {comp.evidenceSource || 'Unstated source'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#60738F]">Provenance:</span>
                  <span className="text-[#60738F]">{comp.provenance}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
