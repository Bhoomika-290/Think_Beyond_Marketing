import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MarketIntelligenceReport, StageId } from '../../types/project';

interface MarketDecisionAndHandoffProps {
  report: MarketIntelligenceReport;
  onSaveReport: (report: MarketIntelligenceReport) => void;
  onMarkStageCompleted: (stageId: StageId) => void;
}

export const MarketDecisionAndHandoff: React.FC<MarketDecisionAndHandoffProps> = ({
  report,
  onSaveReport,
  onMarkStageCompleted,
}) => {
  const navigate = useNavigate();
  const [hasSaved, setHasSaved] = useState(false);
  const brief = report.brief;

  const handleProceed = () => {
    onSaveReport(report);
    onMarkStageCompleted('market-intelligence');
    setHasSaved(true);
    setTimeout(() => {
      navigate('/brand-roadmap');
    }, 400);
  };

  return (
    <div className="bg-[#0B1017] border border-[#263244] rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#263244]">
        <div>
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-[#F3F4F6]">
              Stage 03 → Stage 04 Intelligence Handoff
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Brief Ready
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1 max-w-2xl leading-relaxed">
            Synthesized Market Intelligence Brief formatted for immediate consumption by Stage 04 (Brand Roadmap). Persisted directly to project state.
          </p>
        </div>

        <button
          type="button"
          onClick={handleProceed}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4D8DFF] text-white text-xs font-bold hover:bg-[#6EA8FF] transition-all shadow-md shrink-0 self-start sm:self-auto"
        >
          {hasSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Persisting to Stage 04...</span>
            </>
          ) : (
            <>
              <span>Lock Intelligence & Enter Brand Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Brief Dossier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {/* Validated Target Segments */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] space-y-2">
          <span className="text-[10px] font-mono text-[#4D8DFF] uppercase tracking-wider block font-bold">
            1. Priority Audience Beachheads
          </span>
          <ul className="space-y-1 text-xs text-[#F3F4F6]">
            {brief.validatedSegments.map((seg, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4D8DFF]" />
                <span>{seg}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strategic Whitespace Wedge */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] space-y-2">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
            2. Strategic Whitespace Wedge
          </span>
          <ul className="space-y-1 text-xs text-[#F3F4F6]">
            {brief.strategicWhitespaceOpportunities.map((opp, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Differentiation Mandates */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] space-y-2">
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
            3. Brand Positioning Directives
          </span>
          <ul className="space-y-1 text-xs text-[#F3F4F6]">
            {brief.strategicBrandImplications.map((imp, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Competitor Vulnerabilities */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] space-y-2">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
            4. Competitor Landscape Summary
          </span>
          <p className="text-xs text-[#AAB4C3] leading-relaxed">
            {brief.competitorLandscapeSummary}
          </p>
        </div>

        {/* Primary Market Headwinds */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] space-y-2">
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-bold">
            5. Primary Market Headwinds
          </span>
          <ul className="space-y-1 text-xs text-[#AAB4C3]">
            {brief.coreMarketRisks.slice(0, 3).map((risk, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="truncate">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence Provenance Quality */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] space-y-2">
          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block font-bold">
            6. Evidence Quality Rating
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#AAB4C3]">
            <div>Verified: <span className="text-emerald-400 font-bold">{brief.evidenceQualitySummary.verified}</span></div>
            <div>Inferred: <span className="text-blue-400 font-bold">{brief.evidenceQualitySummary.inference}</span></div>
            <div>Assumptions: <span className="text-amber-400 font-bold">{brief.evidenceQualitySummary.assumptions}</span></div>
            <div>Needs Val: <span className="text-slate-400 font-bold">{brief.evidenceQualitySummary.needsVal}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
