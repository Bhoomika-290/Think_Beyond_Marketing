import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { FeasibilityReport } from '../../types/project';
import { useProject } from '../../context/ProjectContext';
import { Button } from '../common/Button';
import {
  TrendingUp,
  AlertTriangle,
  ShieldX,
  ArrowRight,
  Database,
  CheckCircle,
  Search,
  Tag,
  MapPin,
  HelpCircle,
} from 'lucide-react';

interface DecisionAndHandoffProps {
  report: FeasibilityReport;
}

export const DecisionAndHandoff: React.FC<DecisionAndHandoffProps> = ({ report }) => {
  const { markStageCompleted, saveFeasibilityReport } = useProject();
  const navigate = useNavigate();

  const handleProceedToStage03 = () => {
    saveFeasibilityReport(report);
    markStageCompleted('feasibility');
    navigate('/market-intelligence');
  };

  const handoff = report.handoffToMarketIntelligence;

  return (
    <div className="space-y-5 pt-2">
      {/* Section Header */}
      <div>
        <div className="text-xs font-mono uppercase text-[#738095] tracking-wider font-semibold">
          Section 07 // Strategic Decision Synthesis & Stage 03 Handoff
        </div>
        <p className="text-xs text-[#AAB4C3] mt-0.5">
          Executive summary of structural viability and the structured research dossier required for Stage 03 — Market Intelligence.
        </p>
      </div>

      {/* 3 Visual Columns: Promising, Uncertain, Blockers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. Promising */}
        <div className="p-4 rounded-xl bg-[#111823] border border-emerald-500/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Promising Vectors
              </span>
            </div>
            <ul className="space-y-2 text-xs text-[#AAB4C3]">
              {report.promisingAspects.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-[10px] font-mono text-emerald-400/80 pt-2 border-t border-emerald-500/20">
            Structurally Sound Foundations
          </div>
        </div>

        {/* 2. Uncertain */}
        <div className="p-4 rounded-xl bg-[#111823] border border-[#4D8DFF]/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#4D8DFF]">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Critical Uncertainties
              </span>
            </div>
            <ul className="space-y-2 text-xs text-[#AAB4C3]">
              {report.criticalUncertainties.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#4D8DFF] font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-[10px] font-mono text-[#4D8DFF]/80 pt-2 border-t border-[#4D8DFF]/20">
            Empirical Validation Required
          </div>
        </div>

        {/* 3. Blockers */}
        <div className="p-4 rounded-xl bg-[#111823] border border-rose-500/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-rose-400">
              <ShieldX className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Potential Fatal Blockers
              </span>
            </div>
            <ul className="space-y-2 text-xs text-[#AAB4C3]">
              {report.potentialBlockers.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-[10px] font-mono text-rose-400/80 pt-2 border-t border-rose-500/20">
            Falsification Kill Thresholds
          </div>
        </div>
      </div>

      {/* Visual NEXT INTELLIGENCE REQUIRED Panel */}
      <div className="p-5 rounded-xl bg-[#111823] border border-[#263244] border-t-2 border-t-[#4D8DFF] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#263244]">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#4D8DFF]" />
            <h3 className="text-sm font-bold text-[#F3F4F6] uppercase tracking-wider font-mono">
              Next Intelligence Required // Stage 03 Handoff Dossier
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#738095]">
            Target: Stage 03 Market Intelligence
          </span>
        </div>

        {/* Visual Vector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* 1. Competitors */}
          <div className="p-3 rounded-lg bg-[#0B1017] border border-[#263244] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-[#4D8DFF] font-semibold flex items-center gap-1">
              <Search className="w-3 h-3" />
              <span>Competitor Vectors</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#AAB4C3]">
              {handoff.competitorResearchNeeds.slice(0, 2).map((item, i) => (
                <li key={i} className="line-clamp-2 leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Pricing */}
          <div className="p-3 rounded-lg bg-[#0B1017] border border-[#263244] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>Pricing Benchmarks</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#AAB4C3]">
              {handoff.pricingBenchmarksToStudy.slice(0, 2).map((item, i) => (
                <li key={i} className="line-clamp-2 leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Geographic / Regulatory */}
          <div className="p-3 rounded-lg bg-[#0B1017] border border-[#263244] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-purple-400 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Regional Constraints</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#AAB4C3]">
              {handoff.geographicRegulatoryQueries.slice(0, 2).map((item, i) => (
                <li key={i} className="line-clamp-2 leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Audience Discovery */}
          <div className="p-3 rounded-lg bg-[#0B1017] border border-[#263244] space-y-1.5">
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Audience Hypotheses</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#AAB4C3]">
              {handoff.audienceValidationNeeds.slice(0, 2).map((item, i) => (
                <li key={i} className="line-clamp-2 leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final Prominent Transition CTA */}
        <div className="pt-3 border-t border-[#263244] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#738095] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Stage 02 verification complete. Unlocks Stage 03 with persistent upstream feasibility payload.
            </span>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleProceedToStage03}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Lock Feasibility & Proceed to Market Intelligence
          </Button>
        </div>
      </div>
    </div>
  );
};
