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
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'Moderate':
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-400',
        };
      case 'Weak':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'Needs Validation':
      default:
        return {
          bg: 'bg-slate-700/30 text-[#AAB4C3] border-slate-600/40',
          dot: 'bg-slate-400',
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
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-[#111823] p-3 rounded-lg border border-[#263244]">
        <div className="flex items-center gap-2 text-[#AAB4C3]">
          <span className="text-[#64748B] uppercase tracking-wider font-semibold">Stage Grounding:</span>
          <Link
            to="/idea-lab"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Idea Lab
          </Link>
          <span className="text-[#475569]">→</span>
          <Link
            to="/feasibility"
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Feasibility & Viability
          </Link>
          <span className="text-[#475569]">→</span>
          <span className="inline-flex items-center gap-1 text-[#4D8DFF] font-semibold bg-[#4D8DFF]/10 px-2 py-0.5 rounded border border-[#4D8DFF]/30">
            ● 03 Market Intelligence
          </span>
          <span className="text-[#475569]">→</span>
          <Link
            to="/brand-roadmap"
            className="inline-flex items-center gap-1 text-[#64748B] hover:text-[#AAB4C3] transition-colors"
          >
            04 Brand Roadmap <ArrowRight className="w-3 h-3 text-[#475569]" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#64748B]">Active Venture:</span>
          <span className="text-[#F3F4F6] font-medium">{ventureName}</span>
        </div>
      </div>

      {/* Hero Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#263244] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#4D8DFF]/15 text-[#4D8DFF] border border-[#4D8DFF]/30">
              STAGE 03
            </span>
            <span className="text-xs font-mono text-[#64748B]">MACRO INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F4F6] mt-2">
            Market Intelligence
          </h1>
          <p className="text-sm text-[#AAB4C3] mt-1 max-w-2xl leading-relaxed">
            See the market before you enter it. Dynamic competitor positioning, customer segments, demand-opportunity whitespace, and verified risk signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#151E2B] text-xs font-medium text-[#F3F4F6] border border-[#263244] hover:bg-[#1E293B] hover:border-[#4D8DFF]/50 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#4D8DFF]" />
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
              className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-[#64748B] tracking-wider block">
                  {item.label}
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                  <span className="text-sm font-semibold text-[#F3F4F6]">{item.level}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#AAB4C3] mt-2">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Evidence Integrity Bar */}
      <div className="p-4 rounded-lg bg-[#0B1017] border border-[#263244] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 font-mono text-[#AAB4C3]">
            <ShieldCheck className="w-4 h-4 text-[#4D8DFF]" />
            <span className="text-[#F3F4F6] font-semibold">Market Evidence Integrity</span>
            <span className="text-[#64748B]">({totalEvidence} data points tracked)</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {evidence.verified} Verified Source
            </span>
            <span className="inline-flex items-center gap-1 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {evidence.inference} AI Inference
            </span>
            <span className="inline-flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {evidence.assumptions} Assumptions
            </span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              {evidence.needsVal} Needs Validation
            </span>
          </div>
        </div>

        {/* Multi-segmented bar */}
        <div className="w-full h-2 rounded-full bg-[#111823] overflow-hidden flex">
          <div
            style={{ width: `${verifiedPct}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
            title={`${verifiedPct}% Verified`}
          />
          <div
            style={{ width: `${inferencePct}%` }}
            className="h-full bg-blue-500 transition-all duration-500"
            title={`${inferencePct}% AI Inference`}
          />
          <div
            style={{ width: `${assumptionPct}%` }}
            className="h-full bg-amber-500 transition-all duration-500"
            title={`${assumptionPct}% Assumption`}
          />
          <div
            style={{ width: `${needsValPct}%` }}
            className="h-full bg-slate-600 transition-all duration-500"
            title={`${needsValPct}% Needs Validation`}
          />
        </div>
      </div>
    </div>
  );
};
