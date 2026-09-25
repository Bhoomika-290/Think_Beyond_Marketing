import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import type { CompetitorItem } from '../../types/project';

interface CompetitorComparisonViewProps {
  competitors: CompetitorItem[];
  xLabel?: string;
  yLabel?: string;
}

const CATEGORY_DOT: Record<CompetitorItem['category'], string> = {
  direct: '#9E4A4A',
  indirect: '#8A6D2B',
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
        return { label: '$ Budget Mass', color: 'text-[#4A7C59] bg-[#4A7C59]/10 border-[#4A7C59]/30' };
      case 'mid_market':
        return { label: '$$ Mid-Market', color: 'text-[#2B3D4F] bg-[#2B3D4F]/10 border-[#2B3D4F]/30' };
      case 'premium':
        return { label: '$$$ Premium Craft', color: 'text-[#6C5E8F] bg-[#6C5E8F]/10 border-[#6C5E8F]/30' };
      case 'enterprise':
        return { label: '$$$$ Enterprise Bespoke', color: 'text-[#8A6D2B] bg-[#8A6D2B]/10 border-[#8A6D2B]/30' };
    }
  };

  const xAxisLabel = xLabel ?? 'X';
  const yAxisLabel = yLabel ?? 'Y';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#2B3D4F]" />
          <h3 className="text-sm font-semibold text-[#2B3D4F]">Competitor Comparative Profiles</h3>
        </div>
        <span className="text-xs font-mono text-[#6B7D90]">
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
                  ? 'bg-[#FDFCF8] border-[#4F8FFF]/60 ring-1 ring-[#4F8FFF]/50 shadow-sm'
                  : comp.isUserAdded
                    ? 'bg-[#4A7C59]/10 border-[#4A7C59]/40 hover:border-[#4A7C59]/60'
                    : 'bg-[#FDFCF8] border-[#DDD5C5] hover:border-[#2B3D4F]/60'
              }`}
            >
              <div className="space-y-2.5">
                {/* Identity row: avatar + category dot + badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border border-[#DDD5C5] bg-[#ECE6DA] text-[#2B3D4F]"
                      aria-hidden="true"
                    >
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-bold text-[#2B3D4F] truncate">{comp.name}</h4>
                        {comp.isUserAdded ? (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#4A7C59]/20 text-[#4A7C59] border border-[#4A7C59]/30 font-semibold">
                            USER
                          </span>
                        ) : (
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/30 font-semibold"
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
                        <span className="text-[11px] font-mono text-[#6B7D90] capitalize">
                          {CATEGORY_LABEL[comp.category] ?? comp.category.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-mono text-[#6B7D90]">
                          Confidence:{' '}
                          <span className="text-[#4A5E73] font-semibold">{comp.confidence || 'Medium'}</span>
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
                <div className="text-[10px] font-mono text-[#6B7D90] flex items-center gap-2">
                  <span>
                    {xAxisLabel}: <span className="text-[#4A5E73] font-semibold">{comp.coordinates.x}</span>
                  </span>
                  <span aria-hidden="true">•</span>
                  <span>
                    {yAxisLabel}: <span className="text-[#4A5E73] font-semibold">{comp.coordinates.y}</span>
                  </span>
                </div>

                <div className="text-xs text-[#4A5E73] bg-[#FDFCF8] p-2.5 rounded border border-[#DDD5C5]/80 leading-relaxed">
                  <span className="text-[10px] font-mono text-[#6B7D90] block mb-0.5">
                    POSITIONING CORE
                  </span>
                  {comp.positioningLabel}
                </div>

                {/* Compact customer / pricing lines — existing fields only */}
                {(comp.targetCustomer || comp.businessPricingModel) && (
                  <div className="space-y-1 text-[11px] leading-relaxed">
                    {comp.targetCustomer && (
                      <div className="text-[#4A5E73]">
                        <span className="font-mono text-[10px] text-[#6B7D90] uppercase">Serves: </span>
                        {comp.targetCustomer}
                      </div>
                    )}
                    {comp.businessPricingModel && (
                      <div className="text-[#4A5E73]">
                        <span className="font-mono text-[10px] text-[#6B7D90] uppercase">Pricing: </span>
                        {comp.businessPricingModel}
                      </div>
                    )}
                  </div>
                )}

                {/* Collapsed counts vs expanded full lists */}
                {!isExpanded ? (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B7D90]">
                    <span className="px-2 py-0.5 rounded bg-[#4A7C59]/10 border border-[#4A7C59]/20 text-[#4A7C59]">
                      {comp.strengths.length} strengths
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#8A6D2B]/10 border border-[#8A6D2B]/20 text-[#8A6D2B]">
                      {comp.weaknesses.length} gaps
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2.5 pt-1 text-xs">
                    {comp.offeringSummary && (
                      <div className="text-xs text-[#4A5E73] leading-relaxed">
                        <span className="text-[10px] font-mono text-[#6B7D90] uppercase tracking-wide block mb-0.5">
                          Offering
                        </span>
                        {comp.offeringSummary}
                      </div>
                    )}
                    {comp.differentiationFactor && (
                      <div className="text-xs text-[#4A5E73] leading-relaxed">
                        <span className="text-[10px] font-mono text-[#6B7D90] uppercase tracking-wide block mb-0.5">
                          Differentiation
                        </span>
                        {comp.differentiationFactor}
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-mono text-[#4A7C59] uppercase tracking-wide block mb-1">
                        Strengths
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {comp.strengths.map((str, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/20"
                          >
                            {str}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-[#8A6D2B] uppercase tracking-wide block mb-1">
                        Weaknesses / Gaps
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {comp.weaknesses.map((wk, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#8A6D2B]/10 text-[#8A6D2B] border border-[#8A6D2B]/20"
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
                  className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#4A5E73] hover:text-[#2B3D4F] transition-colors"
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

              <div className="mt-3 pt-2.5 border-t border-[#DDD5C5] space-y-1 text-[11px] font-mono">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#6B7D90]">Evidence:</span>
                  <span className={comp.evidenceSource ? 'text-[#4A5E73]' : 'text-[#6B7D90]'}>
                    {comp.evidenceSource || 'Unstated source'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#6B7D90]">Provenance:</span>
                  <span className="text-[#4A5E73]">{comp.provenance}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
