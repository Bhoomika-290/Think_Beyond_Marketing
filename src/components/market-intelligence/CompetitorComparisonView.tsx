import React from 'react';
import { Layers } from 'lucide-react';
import type { CompetitorItem } from '../../types/project';

interface CompetitorComparisonViewProps {
  competitors: CompetitorItem[];
}

export const CompetitorComparisonView: React.FC<CompetitorComparisonViewProps> = ({
  competitors,
}) => {
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
          return (
            <div
              key={comp.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all hover:border-[#2B3D4F]/60 ${
                comp.isUserAdded
                  ? 'bg-[#4A7C59]/10 border-[#4A7C59]/40'
                  : 'bg-[#FDFCF8] border-[#DDD5C5]'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#2B3D4F]">{comp.name}</h4>
                      {comp.isUserAdded ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#4A7C59]/20 text-[#4A7C59] border border-[#4A7C59]/30 font-semibold">
                          VERIFIED
                        </span>
                      ) : (
                        <span
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/30 font-semibold"
                          title="Model-generated archetype — not a verified company"
                        >
                          MODEL ARCHETYPE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-mono text-[#6B7D90] capitalize">
                        {comp.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-[#6B7D90]">
                        Confidence: <span className="text-[#4A5E73] font-semibold">{comp.confidence || 'Medium'}</span>
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${priceBadge.color}`}
                  >
                    {priceBadge.label}
                  </span>
                </div>

                <div className="text-xs text-[#4A5E73] bg-[#FDFCF8] p-2.5 rounded border border-[#DDD5C5]/80 leading-relaxed">
                  <span className="text-[10px] font-mono text-[#6B7D90] block mb-0.5">
                    POSITIONING CORE
                  </span>
                  {comp.positioningLabel}
                </div>

                <div className="space-y-1.5 pt-1 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#4A7C59] uppercase tracking-wide block mb-1">
                      Strengths
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {comp.strengths.map((str, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#ECE6DA] text-[#4A5E73] border border-[#DDD5C5]"
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
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#DDD5C5] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#6B7D90]">Provenance:</span>
                <span className="text-[#4A5E73]">{comp.provenance}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
