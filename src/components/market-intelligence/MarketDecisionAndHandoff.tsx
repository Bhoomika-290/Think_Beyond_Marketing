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
    <div className="bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-[#4A7C59]" />
            <h2 className="text-lg font-bold text-[#2B3D4F]">
              Stage 03 → Stage 04 Intelligence Handoff
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4A7C59]/10 text-[#4A7C59] border border-[#4A7C59]/30">
              Brief Ready
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1 max-w-2xl leading-relaxed">
            Synthesized Market Intelligence Brief formatted for immediate consumption by Stage 04 (Brand Roadmap). Persisted directly to project state.
          </p>
        </div>

        <button
          type="button"
          onClick={handleProceed}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2B3D4F] text-white text-xs font-bold hover:bg-[#3E5770] transition-all shadow-md shrink-0 self-start sm:self-auto"
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
        <div className="p-4 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
          <span className="text-[10px] font-mono text-[#2B3D4F] uppercase tracking-wider block font-bold">
            1. Priority Audience Beachheads
          </span>
          <ul className="space-y-1 text-xs text-[#2B3D4F]">
            {brief.validatedSegments.map((seg, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2B3D4F]" />
                <span>{seg}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strategic Whitespace Wedge */}
        <div className="p-4 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
          <span className="text-[10px] font-mono text-[#4A7C59] uppercase tracking-wider block font-bold">
            2. Strategic Whitespace Wedge
          </span>
          <ul className="space-y-1 text-xs text-[#2B3D4F]">
            {brief.strategicWhitespaceOpportunities.map((opp, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Differentiation Mandates */}
        <div className="p-4 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
          <span className="text-[10px] font-mono text-[#5B6B7F] uppercase tracking-wider block font-bold">
            3. Brand Positioning Directives
          </span>
          <ul className="space-y-1 text-xs text-[#2B3D4F]">
            {brief.strategicBrandImplications.map((imp, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B6B7F]" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Competitor Vulnerabilities */}
        <div className="p-4 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
          <span className="text-[10px] font-mono text-[#8A6D2B] uppercase tracking-wider block font-bold">
            4. Competitor Landscape Summary
          </span>
          <p className="text-xs text-[#4A5E73] leading-relaxed">
            {brief.competitorLandscapeSummary}
          </p>
        </div>

        {/* Primary Market Headwinds */}
        <div className="p-4 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
          <span className="text-[10px] font-mono text-[#9E4A4A] uppercase tracking-wider block font-bold">
            5. Primary Market Headwinds
          </span>
          <ul className="space-y-1 text-xs text-[#4A5E73]">
            {brief.coreMarketRisks.slice(0, 3).map((risk, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E4A4A]" />
                <span className="truncate">{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Evidence Provenance Quality */}
        <div className="p-4 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
          <span className="text-[10px] font-mono text-[#6B7D90] uppercase tracking-wider block font-bold">
            6. Evidence Quality Rating
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#4A5E73]">
            <div>Verified: <span className="text-[#4A7C59] font-bold">{brief.evidenceQualitySummary.verified}</span></div>
            <div>Inferred: <span className="text-[#2B3D4F] font-bold">{brief.evidenceQualitySummary.inference}</span></div>
            <div>Assumptions: <span className="text-[#8A6D2B] font-bold">{brief.evidenceQualitySummary.assumptions}</span></div>
            <div>Needs Val: <span className="text-[#7A8CA0] font-bold">{brief.evidenceQualitySummary.needsVal}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
