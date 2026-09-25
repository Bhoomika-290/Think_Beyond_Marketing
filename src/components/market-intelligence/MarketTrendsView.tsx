import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle, Sparkles, Activity } from 'lucide-react';
import type { MarketTrendSignal } from '../../types/project';

interface MarketTrendsViewProps {
  trends: MarketTrendSignal[];
}

export const MarketTrendsView: React.FC<MarketTrendsViewProps> = ({ trends }) => {
  const getDirectionBadge = (dir: MarketTrendSignal['direction']) => {
    switch (dir) {
      case 'rising':
        return {
          icon: <ArrowUpRight className="w-4 h-4 text-[#4A7C59]" />,
          label: 'Rising Vector',
          bg: 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30',
        };
      case 'emerging':
        return {
          icon: <Sparkles className="w-4 h-4 text-[#2B3D4F]" />,
          label: 'Emerging Shift',
          bg: 'bg-[#2B3D4F]/10 text-[#2B3D4F] border-[#2B3D4F]/30',
        };
      case 'stable':
        return {
          icon: <Minus className="w-4 h-4 text-[#4A5E73]" />,
          label: 'Stable Baseline',
          bg: 'bg-[#ECE6DA] text-[#4A5E73] border-[#DDD5C5]',
        };
      case 'declining':
        return {
          icon: <ArrowDownRight className="w-4 h-4 text-[#9E4A4A]" />,
          label: 'Declining Relevance',
          bg: 'bg-[#9E4A4A]/10 text-[#9E4A4A] border-[#9E4A4A]/30',
        };
      case 'uncertain':
      default:
        return {
          icon: <HelpCircle className="w-4 h-4 text-[#8A6D2B]" />,
          label: 'Uncertain Signal',
          bg: 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#2B3D4F]" />
            <h2 className="text-base font-semibold text-[#2B3D4F]">
              Market Forces & Vector Signals
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/20">
              Macro Vectors
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
            Structural market forces affecting customer habits, switching costs, and willingness to pay.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {trends.map((t) => {
          const dir = getDirectionBadge(t.direction);
          return (
            <div
              key={t.id}
              className="p-4 rounded-xl bg-[#FDFCF8] border border-[#DDD5C5] flex flex-col justify-between hover:border-[#2B3D4F]/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {dir.icon}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${dir.bg}`}>
                      {dir.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B7D90] uppercase">
                    Impact: <span className="text-[#2B3D4F] font-semibold">{t.impact}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#2B3D4F] leading-snug">{t.signal}</h4>

                <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5] text-[11px] text-[#4A5E73]">
                  <span className="text-[10px] font-mono text-[#6B7D90] block mb-0.5">
                    OBSERVED EVIDENCE SOURCE
                  </span>
                  {t.evidenceSource}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#DDD5C5] flex items-center justify-between text-[10px] font-mono text-[#6B7D90]">
                <span>Confidence: {t.confidence.toUpperCase()}</span>
                <span>{t.provenance}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
