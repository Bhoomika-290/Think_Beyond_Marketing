import React from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import type { MarketIntelligenceReport, SignalLevel } from '../../types/project';
import { Link } from 'react-router-dom';

interface MarketHeaderProps {
  report: MarketIntelligenceReport;
  onRefresh: () => void;
  ventureName: string;
}

export const MarketHeader: React.FC<MarketHeaderProps> = ({
  report,
  onRefresh,
  ventureName,
}) => {
  const { signals, brief } = report;

  const getSignalBadge = (level: SignalLevel) => {
    switch (level) {
      case 'Strong':
        return {
          bg: 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30',
          dot: 'bg-[#19A875]',
        };
      case 'Moderate':
        return {
          bg: 'bg-[#14213D]/10 text-[#14213D] border-[#14213D]/30',
          dot: 'bg-[#14213D]',
        };
      case 'Weak':
        return {
          bg: 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30',
          dot: 'bg-[#F29A42]',
        };
      case 'Needs Validation':
      default:
        return {
          bg: 'bg-[#EEF4FB] text-[#60738F] border-[#E2EAF4]',
          dot: 'bg-[#8495AE]',
        };
    }
  };

  const evidence = brief.evidenceQualitySummary;
  const totalEvidence =
    evidence.verified + evidence.inference + evidence.assumptions + evidence.needsVal;
  const verifiedPct = Math.round((evidence.verified / totalEvidence) * 100);
  const inferencePct = Math.round((evidence.inference / totalEvidence) * 100);
  const assumptionPct = Math.round((evidence.assumptions / totalEvidence) * 100);
  const needsValPct = 100 - (verifiedPct + inferencePct + assumptionPct);

  return (
    <div className="space-y-6">
      {/* Stage Grounding Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-[#FFFFFF] p-3 rounded-lg border border-[#E2EAF4]">
        <div className="flex items-center gap-2 text-[#60738F]">
          <span className="text-[#60738F] uppercase tracking-wider font-semibold">Stage Grounding:</span>
          <Link
            to="/idea-lab"
            className="inline-flex items-center gap-1 text-[#19A875] hover:text-[#19A875] transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Idea Lab
          </Link>
          <span className="text-[#60738F]">→</span>
          <Link
            to="/feasibility"
            className="inline-flex items-center gap-1 text-[#19A875] hover:text-[#19A875] transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Feasibility & Viability
          </Link>
          <span className="text-[#60738F]">→</span>
          <span className="inline-flex items-center gap-1 text-[#14213D] font-semibold bg-[#14213D]/10 px-2 py-0.5 rounded border border-[#14213D]/30">
            ● 03 Market Intelligence
          </span>
          <span className="text-[#60738F]">→</span>
          <Link
            to="/brand-roadmap"
            className="inline-flex items-center gap-1 text-[#60738F] hover:text-[#60738F] transition-colors"
          >
            04 Brand Roadmap <ArrowRight className="w-3 h-3 text-[#60738F]" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#60738F]">Active Venture:</span>
          <span className="text-[#14213D] font-medium">{ventureName}</span>
        </div>
      </div>

      {/* Hero Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#B99B7A]/15 text-[#7A5F42] border border-[#B99B7A]/40">
              STAGE 03
            </span>
            <span className="text-xs font-mono text-[#60738F]">MACRO INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#14213D] mt-2">
            Market Intelligence
          </h1>
          <p className="text-sm text-[#60738F] mt-1 max-w-2xl leading-relaxed">
            See the market before you enter it. Dynamic competitor positioning, customer segments, demand-opportunity whitespace, and verified risk signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EEF4FB] text-xs font-medium text-[#14213D] border border-[#E2EAF4] hover:bg-[#E8E1D3] hover:border-[#14213D]/50 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#14213D]" />
            Re-evaluate Intelligence
          </button>
        </div>
      </div>

      {/* Top Indicators: 4 Macro Signals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'MARKET SIGNAL', level: signals.marketSignal, desc: 'Category momentum & headroom' },
          { label: 'CUSTOMER SIGNAL', level: signals.customerSignal, desc: 'Target ICP pain severity' },
          { label: 'COMPETITIVE SIGNAL', level: signals.competitiveSignal, desc: 'Incumbent vulnerability' },
          { label: 'OPPORTUNITY SIGNAL', level: signals.opportunitySignal, desc: 'Unserved whitespace viability' },
        ].map((item) => {
          const badge = getSignalBadge(item.level);
          return (
            <div
              key={item.label}
              className="p-3.5 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-[#60738F] tracking-wider block">
                  {item.label}
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                  <span className="text-sm font-semibold text-[#14213D]">{item.level}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#60738F] mt-2">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Evidence Integrity Bar */}
      <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 font-mono text-[#60738F]">
            <ShieldCheck className="w-4 h-4 text-[#14213D]" />
            <span className="text-[#14213D] font-semibold">Market Evidence Integrity</span>
            <span className="text-[#60738F]">({totalEvidence} data points tracked)</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1 text-[#19A875]">
              <span className="w-2 h-2 rounded-full bg-[#19A875]" />
              {evidence.verified} Verified Source
            </span>
            <span className="inline-flex items-center gap-1 text-[#9272DB]">
              <span className="w-2 h-2 rounded-full bg-[#9272DB]" />
              {evidence.inference} AI Inference
            </span>
            <span className="inline-flex items-center gap-1 text-[#F29A42]">
              <span className="w-2 h-2 rounded-full bg-[#F29A42]" />
              {evidence.assumptions} Assumptions
            </span>
            <span className="inline-flex items-center gap-1 text-[#60738F]">
              <span className="w-2 h-2 rounded-full bg-[#8495AE]" />
              {evidence.needsVal} Needs Validation
            </span>
          </div>
        </div>

        {/* Multi-segmented bar */}
        <div className="w-full h-2 rounded-full bg-[#FFFFFF] overflow-hidden flex">
          <div
            style={{ width: `${verifiedPct}%` }}
            className="h-full bg-[#19A875] transition-all duration-500"
            title={`${verifiedPct}% Verified`}
          />
          <div
            style={{ width: `${inferencePct}%` }}
            className="h-full bg-[#14213D] transition-all duration-500"
            title={`${inferencePct}% AI Inference`}
          />
          <div
            style={{ width: `${assumptionPct}%` }}
            className="h-full bg-[#F29A42] transition-all duration-500"
            title={`${assumptionPct}% Assumption`}
          />
          <div
            style={{ width: `${needsValPct}%` }}
            className="h-full bg-[#8495AE] transition-all duration-500"
            title={`${needsValPct}% Needs Validation`}
          />
        </div>
      </div>
    </div>
  );
};
