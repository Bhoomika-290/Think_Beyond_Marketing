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
          bg: 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30',
          dot: 'bg-[#4A7C59]',
        };
      case 'Moderate':
        return {
          bg: 'bg-[#2B3D4F]/10 text-[#2B3D4F] border-[#2B3D4F]/30',
          dot: 'bg-[#2B3D4F]',
        };
      case 'Weak':
        return {
          bg: 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30',
          dot: 'bg-[#8A6D2B]',
        };
      case 'Needs Validation':
      default:
        return {
          bg: 'bg-[#ECE6DA] text-[#4A5E73] border-[#DDD5C5]',
          dot: 'bg-[#7A8CA0]',
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
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-[#FDFCF8] p-3 rounded-lg border border-[#DDD5C5]">
        <div className="flex items-center gap-2 text-[#4A5E73]">
          <span className="text-[#6B7D90] uppercase tracking-wider font-semibold">Stage Grounding:</span>
          <Link
            to="/idea-lab"
            className="inline-flex items-center gap-1 text-[#4A7C59] hover:text-[#4A7C59] transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Idea Lab
          </Link>
          <span className="text-[#6B7D90]">→</span>
          <Link
            to="/feasibility"
            className="inline-flex items-center gap-1 text-[#4A7C59] hover:text-[#4A7C59] transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Feasibility & Viability
          </Link>
          <span className="text-[#6B7D90]">→</span>
          <span className="inline-flex items-center gap-1 text-[#2B3D4F] font-semibold bg-[#2B3D4F]/10 px-2 py-0.5 rounded border border-[#2B3D4F]/30">
            ● 03 Market Intelligence
          </span>
          <span className="text-[#6B7D90]">→</span>
          <Link
            to="/brand-roadmap"
            className="inline-flex items-center gap-1 text-[#6B7D90] hover:text-[#4A5E73] transition-colors"
          >
            04 Brand Roadmap <ArrowRight className="w-3 h-3 text-[#6B7D90]" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#6B7D90]">Active Venture:</span>
          <span className="text-[#2B3D4F] font-medium">{ventureName}</span>
        </div>
      </div>

      {/* Hero Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDD5C5] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#2B3D4F]/15 text-[#2B3D4F] border border-[#2B3D4F]/30">
              STAGE 03
            </span>
            <span className="text-xs font-mono text-[#6B7D90]">MACRO INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2B3D4F] mt-2">
            Market Intelligence
          </h1>
          <p className="text-sm text-[#4A5E73] mt-1 max-w-2xl leading-relaxed">
            See the market before you enter it. Dynamic competitor positioning, customer segments, demand-opportunity whitespace, and verified risk signals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ECE6DA] text-xs font-medium text-[#2B3D4F] border border-[#DDD5C5] hover:bg-[#E8E1D3] hover:border-[#2B3D4F]/50 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#2B3D4F]" />
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
              className="p-3.5 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-[#6B7D90] tracking-wider block">
                  {item.label}
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                  <span className="text-sm font-semibold text-[#2B3D4F]">{item.level}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#4A5E73] mt-2">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Evidence Integrity Bar */}
      <div className="p-4 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] space-y-2.5">
        <div className="flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 font-mono text-[#4A5E73]">
            <ShieldCheck className="w-4 h-4 text-[#2B3D4F]" />
            <span className="text-[#2B3D4F] font-semibold">Market Evidence Integrity</span>
            <span className="text-[#6B7D90]">({totalEvidence} data points tracked)</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span className="inline-flex items-center gap-1 text-[#4A7C59]">
              <span className="w-2 h-2 rounded-full bg-[#4A7C59]" />
              {evidence.verified} Verified Source
            </span>
            <span className="inline-flex items-center gap-1 text-[#6C5E8F]">
              <span className="w-2 h-2 rounded-full bg-[#6C5E8F]" />
              {evidence.inference} AI Inference
            </span>
            <span className="inline-flex items-center gap-1 text-[#8A6D2B]">
              <span className="w-2 h-2 rounded-full bg-[#8A6D2B]" />
              {evidence.assumptions} Assumptions
            </span>
            <span className="inline-flex items-center gap-1 text-[#7A8CA0]">
              <span className="w-2 h-2 rounded-full bg-[#7A8CA0]" />
              {evidence.needsVal} Needs Validation
            </span>
          </div>
        </div>

        {/* Multi-segmented bar */}
        <div className="w-full h-2 rounded-full bg-[#FDFCF8] overflow-hidden flex">
          <div
            style={{ width: `${verifiedPct}%` }}
            className="h-full bg-[#4A7C59] transition-all duration-500"
            title={`${verifiedPct}% Verified`}
          />
          <div
            style={{ width: `${inferencePct}%` }}
            className="h-full bg-[#2B3D4F] transition-all duration-500"
            title={`${inferencePct}% AI Inference`}
          />
          <div
            style={{ width: `${assumptionPct}%` }}
            className="h-full bg-[#8A6D2B] transition-all duration-500"
            title={`${assumptionPct}% Assumption`}
          />
          <div
            style={{ width: `${needsValPct}%` }}
            className="h-full bg-[#7A8CA0] transition-all duration-500"
            title={`${needsValPct}% Needs Validation`}
          />
        </div>
      </div>
    </div>
  );
};
