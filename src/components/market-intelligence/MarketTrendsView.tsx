import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle, Sparkles, Activity } from 'lucide-react';
import type { MarketTrendSignal } from '../../types/project';
import { ChartEmptyState } from '../common/ChartEmptyState';

interface MarketTrendsViewProps {
  trends: MarketTrendSignal[];
}

export const MarketTrendsView: React.FC<MarketTrendsViewProps> = ({ trends }) => {
  const getDirectionBadge = (dir: MarketTrendSignal['direction']) => {
    switch (dir) {
      case 'rising':
        return {
          icon: <ArrowUpRight className="w-4 h-4 text-[#19A875]" />,
          label: 'Rising Vector',
          bg: 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30',
        };
      case 'emerging':
        return {
          icon: <Sparkles className="w-4 h-4 text-[#14213D]" />,
          label: 'Emerging Shift',
          bg: 'bg-[#14213D]/10 text-[#14213D] border-[#14213D]/30',
        };
      case 'stable':
        return {
          icon: <Minus className="w-4 h-4 text-[#60738F]" />,
          label: 'Stable Baseline',
          bg: 'bg-[#EEF4FB] text-[#60738F] border-[#E2EAF4]',
        };
      case 'declining':
        return {
          icon: <ArrowDownRight className="w-4 h-4 text-[#E46D68]" />,
          label: 'Declining Relevance',
          bg: 'bg-[#FFF0EF] text-[#E46D68] border-[#E46D68]/30',
        };
      case 'uncertain':
      default:
        return {
          icon: <HelpCircle className="w-4 h-4 text-[#F29A42]" />,
          label: 'Uncertain Signal',
          bg: 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#14213D]" />
            <h2 className="text-base font-semibold text-[#14213D]">
              Market Forces & Vector Signals
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/20">
              Macro Vectors
            </span>
          </div>
          <p className="text-xs text-[#60738F] mt-1">
            Structural market forces affecting customer habits, switching costs, and willingness to pay.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {trends.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-4">
            <ChartEmptyState
              title="No market signals yet"
              message="Trend vectors unlock from your Stage 01 problem + context inputs — complete discovery to detect structural market forces."
              hint="Stage 01 → problem / context"
              action={
                <Link
                  to="/idea-lab"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#14213D] underline underline-offset-2 hover:text-[#F29A42]"
                >
                  Complete Stage 01 in Idea Lab →
                </Link>
              }
            />
          </div>
        ) : (
          trends.map((t) => {
          const dir = getDirectionBadge(t.direction);
          return (
            <div
              key={t.id}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] flex flex-col justify-between hover:border-[#14213D]/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {dir.icon}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${dir.bg}`}>
                      {dir.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#60738F] uppercase">
                    Impact: <span className="text-[#14213D] font-semibold">{t.impact}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#14213D] leading-snug">{t.signal}</h4>

                <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4] text-[11px] text-[#60738F]">
                  <span className="text-[10px] font-mono text-[#60738F] block mb-0.5">
                    OBSERVED EVIDENCE SOURCE
                  </span>
                  {t.evidenceSource}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E2EAF4] flex items-center justify-between text-[10px] font-mono text-[#60738F]">
                <span>Confidence: {t.confidence.toUpperCase()}</span>
                <span>{t.provenance}</span>
              </div>
            </div>
          );
        })
        )}
      </div>
    </div>
  );
};
