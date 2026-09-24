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
          icon: <ArrowUpRight className="w-4 h-4 text-emerald-400" />,
          label: 'Rising Vector',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
      case 'emerging':
        return {
          icon: <Sparkles className="w-4 h-4 text-[#4D8DFF]" />,
          label: 'Emerging Shift',
          bg: 'bg-blue-500/10 text-[#4D8DFF] border-blue-500/30',
        };
      case 'stable':
        return {
          icon: <Minus className="w-4 h-4 text-[#AAB4C3]" />,
          label: 'Stable Baseline',
          bg: 'bg-slate-700/30 text-[#AAB4C3] border-slate-600/40',
        };
      case 'declining':
        return {
          icon: <ArrowDownRight className="w-4 h-4 text-red-400" />,
          label: 'Declining Relevance',
          bg: 'bg-red-500/10 text-red-400 border-red-500/30',
        };
      case 'uncertain':
      default:
        return {
          icon: <HelpCircle className="w-4 h-4 text-amber-400" />,
          label: 'Uncertain Signal',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#4D8DFF]" />
            <h2 className="text-base font-semibold text-[#F3F4F6]">
              Market Forces & Vector Signals
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4D8DFF]/10 text-[#4D8DFF] border border-[#4D8DFF]/20">
              Macro Vectors
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
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
              className="p-4 rounded-xl bg-[#0B1017] border border-[#263244] flex flex-col justify-between hover:border-[#4D8DFF]/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {dir.icon}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${dir.bg}`}>
                      {dir.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase">
                    Impact: <span className="text-[#F3F4F6] font-semibold">{t.impact}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#F3F4F6] leading-snug">{t.signal}</h4>

                <div className="p-2.5 rounded bg-[#111823] border border-[#263244] text-[11px] text-[#AAB4C3]">
                  <span className="text-[10px] font-mono text-[#64748B] block mb-0.5">
                    OBSERVED EVIDENCE SOURCE
                  </span>
                  {t.evidenceSource}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#263244] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
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
