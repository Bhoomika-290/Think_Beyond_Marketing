import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { FeasibilityReport } from '../../types/project';
import { useProject } from '../../context/ProjectContext';
import { Button } from '../common/Button';
import { ChartEmptyState } from '../common/ChartEmptyState';
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

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'have', 'has', 'are', 'was',
  'were', 'will', 'would', 'could', 'should', 'into', 'onto', 'about', 'across',
  'your', 'their', 'there', 'which', 'when', 'where', 'what', 'while', 'than',
  'then', 'them', 'they', 'its', 'our', 'you', 'may', 'might', 'must',
  'need', 'needs', 'lack', 'without', 'within', 'between', 'among',
]);

// Derived only: tokenize existing display strings to find shared dimension
// keywords between a selected blocker/uncertainty and handoff vectors.
const extractKeywords = (text: string): Set<string> => {
  const tokens = text
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((t) => t.length > 3 && !STOPWORDS.has(t));
  return new Set(tokens);
};

export const DecisionAndHandoff: React.FC<DecisionAndHandoffProps> = ({ report }) => {
  const { markStageCompleted, saveFeasibilityReport } = useProject();
  const navigate = useNavigate();

  // Local UI state only — no new domain data.
  // Collapsible handoff vectors (default collapsed to 2, "Show all N" wired to real length).
  const [expandedHandoff, setExpandedHandoff] = useState<Record<string, boolean>>({});
  // Decision-state interactivity: selected blocker/uncertainty highlights
  // handoff vectors sharing dimension keywords derived from existing strings.
  const [selectedDecisionKey, setSelectedDecisionKey] = useState<string | null>(null);

  const handleProceedToStage03 = () => {
    saveFeasibilityReport(report);
    markStageCompleted('feasibility');
    navigate('/market-intelligence');
  };

  const handoff = report.handoffToMarketIntelligence;

  const selectedKeywords: Set<string> | null = useMemo(() => {
    if (!selectedDecisionKey) return null;
    const [kind, idxRaw] = selectedDecisionKey.split(':');
    const idx = Number(idxRaw);
    const source =
      kind === 'uncertainty' ? report.criticalUncertainties[idx] : report.potentialBlockers[idx];
    if (!source) return null;
    return extractKeywords(source);
  }, [selectedDecisionKey, report.criticalUncertainties, report.potentialBlockers]);

  const vectorMatchesSelection = (items: string[]): boolean => {
    if (!selectedKeywords || selectedKeywords.size === 0) return false;
    return items.some((item) => {
      const words = extractKeywords(item);
      for (const w of words) {
        if (selectedKeywords.has(w)) return true;
      }
      return false;
    });
  };

  const itemMatchesSelection = (item: string): boolean => {
    if (!selectedKeywords || selectedKeywords.size === 0) return false;
    const words = extractKeywords(item);
    for (const w of words) {
      if (selectedKeywords.has(w)) return true;
    }
    return false;
  };

  const toggleDecision = (key: string) => {
    setSelectedDecisionKey((prev) => (prev === key ? null : key));
  };

  const toggleHandoff = (key: string) => {
    setExpandedHandoff((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleItems = (key: string, items: string[]): string[] =>
    expandedHandoff[key] ? items : items.slice(0, 2);

  const ideaLabAction = (
    <Link
      to="/idea-lab"
      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#2B3D4F] underline underline-offset-2 hover:text-[#8A6D2B]"
    >
      Add Stage 01 input in Idea Lab →
    </Link>
  );

  return (
    <div className="space-y-5 pt-2">
      {/* Section Header */}
      <div>
        <div className="text-xs font-mono uppercase text-[#6B7D90] tracking-wider font-semibold">
          Section 07 // Strategic Decision Synthesis & Stage 03 Handoff
        </div>
        <p className="text-xs text-[#4A5E73] mt-0.5">
          Executive summary of structural viability and the structured research dossier required for Stage 03 — Market Intelligence.
        </p>
      </div>

      {/* 3 Visual Columns: Promising, Uncertain, Blockers.
          Empty arrays render ChartEmptyState (no fake points) with Idea Lab action.
          Blockers/uncertainties are clickable and highlight related handoff vectors. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. Promising */}
        <div className="p-4 rounded-xl bg-[#FDFCF8] border border-[#4A7C59]/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#4A7C59]">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Promising Vectors
              </span>
            </div>
            {report.promisingAspects.length > 0 ? (
              <ul className="space-y-2 text-xs text-[#4A5E73]">
                {report.promisingAspects.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#4A7C59] font-bold shrink-0 mt-0.5">•</span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ChartEmptyState
                title="No promising vectors yet"
                message="No structurally sound foundations recorded — refine Stage 01 inputs first."
                action={ideaLabAction}
              />
            )}
          </div>
          <div className="text-[10px] font-mono text-[#4A7C59]/80 pt-2 border-t border-[#4A7C59]/20">
            Structurally Sound Foundations
          </div>
        </div>

        {/* 2. Uncertain — clickable, drives handoff highlight */}
        <div className="p-4 rounded-xl bg-[#FDFCF8] border border-[#2B3D4F]/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#2B3D4F]">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Critical Uncertainties
              </span>
            </div>
            {report.criticalUncertainties.length > 0 ? (
              <>
                <p className="text-[10px] font-mono text-[#6B7D90] mb-2">
                  Click an item to trace related handoff vectors below.
                </p>
                <ul className="space-y-2 text-xs text-[#4A5E73]">
                  {report.criticalUncertainties.map((item, idx) => {
                    const key = `uncertainty:${idx}`;
                    const isSelected = selectedDecisionKey === key;
                    return (
                      <li key={idx}>
                        <button
                          type="button"
                          onClick={() => toggleDecision(key)}
                          aria-pressed={isSelected}
                          title={item}
                          className={`w-full flex items-start gap-2 p-2 rounded-lg border text-left transition-colors ${
                            isSelected
                              ? 'bg-[#2B3D4F] text-[#F5F1EB] border-[#2B3D4F]'
                              : 'border-transparent hover:bg-[#ECE6DA] hover:border-[#DDD5C5]'
                          }`}
                        >
                          <span className={`font-bold shrink-0 mt-0.5 ${isSelected ? 'text-[#F5F1EB]' : 'text-[#2B3D4F]'}`}>•</span>
                          <span className={`leading-snug ${isSelected ? 'text-[#F5F1EB]' : ''}`}>{item}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <ChartEmptyState
                title="No uncertainties logged"
                message="No empirical validation items recorded — refine Stage 01 inputs first."
                action={ideaLabAction}
              />
            )}
          </div>
          <div className="text-[10px] font-mono text-[#2B3D4F]/80 pt-2 border-t border-[#2B3D4F]/20">
            Empirical Validation Required
          </div>
        </div>

        {/* 3. Blockers — clickable, drives handoff highlight */}
        <div className="p-4 rounded-xl bg-[#FDFCF8] border border-[#9E4A4A]/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#9E4A4A]">
              <ShieldX className="w-4 h-4" />
              <span className="text-xs font-mono uppercase font-bold tracking-wider">
                Potential Fatal Blockers
              </span>
            </div>
            {report.potentialBlockers.length > 0 ? (
              <>
                <p className="text-[10px] font-mono text-[#6B7D90] mb-2">
                  Click an item to trace related handoff vectors below.
                </p>
                <ul className="space-y-2 text-xs text-[#4A5E73]">
                  {report.potentialBlockers.map((item, idx) => {
                    const key = `blocker:${idx}`;
                    const isSelected = selectedDecisionKey === key;
                    return (
                      <li key={idx}>
                        <button
                          type="button"
                          onClick={() => toggleDecision(key)}
                          aria-pressed={isSelected}
                          title={item}
                          className={`w-full flex items-start gap-2 p-2 rounded-lg border text-left transition-colors ${
                            isSelected
                              ? 'bg-[#8A6D2B] text-[#FDFCF8] border-[#8A6D2B]'
                              : 'border-transparent hover:bg-[#ECE6DA] hover:border-[#DDD5C5]'
                          }`}
                        >
                          <span className={`font-bold shrink-0 mt-0.5 ${isSelected ? 'text-[#FDFCF8]' : 'text-[#9E4A4A]'}`}>•</span>
                          <span className={`leading-snug ${isSelected ? 'text-[#FDFCF8]' : ''}`}>{item}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <ChartEmptyState
                title="No blockers identified"
                message="No falsification thresholds recorded — refine Stage 01 inputs first."
                action={ideaLabAction}
              />
            )}
          </div>
          <div className="text-[10px] font-mono text-[#9E4A4A]/80 pt-2 border-t border-[#9E4A4A]/20">
            Falsification Kill Thresholds
          </div>
        </div>
      </div>

      {/* Visual NEXT INTELLIGENCE REQUIRED Panel */}
      <div className="p-5 rounded-xl bg-[#FDFCF8] border border-[#DDD5C5] border-t-2 border-t-[#2B3D4F] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDD5C5]">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#2B3D4F]" />
            <h3 className="text-sm font-bold text-[#2B3D4F] uppercase tracking-wider font-mono">
              Next Intelligence Required // Stage 03 Handoff Dossier
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#6B7D90]">
            Target: Stage 03 Market Intelligence
          </span>
        </div>

        {/* Visual Vector Grid — collapsible show-all per vector (default 2),
            empty vectors render ChartEmptyState, selected blocker/uncertainty
            highlights related vectors via shared keywords. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* 1. Competitors */}
          <div
            className={`p-3 rounded-lg bg-[#F5F1EB] border space-y-1.5 transition-colors ${
              vectorMatchesSelection(handoff.competitorResearchNeeds)
                ? 'border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30'
                : 'border-[#DDD5C5]'
            }`}
          >
            <div className="text-[10px] font-mono uppercase text-[#2B3D4F] font-semibold flex items-center gap-1">
              <Search className="w-3 h-3" />
              <span>Competitor Vectors</span>
            </div>
            {handoff.competitorResearchNeeds.length > 0 ? (
              <>
                <ul className="space-y-1 text-[11px] text-[#4A5E73]">
                  {visibleItems('competitors', handoff.competitorResearchNeeds).map((item, i) => (
                    <li
                      key={i}
                      className={`leading-relaxed rounded px-1.5 py-0.5 ${
                        expandedHandoff['competitors'] ? '' : 'line-clamp-2'
                      } ${itemMatchesSelection(item) ? 'bg-[#2B3D4F]/10 text-[#2B3D4F] font-medium' : ''}`}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
                {handoff.competitorResearchNeeds.length > 2 && (
                  <button
                    type="button"
                    onClick={() => toggleHandoff('competitors')}
                    className="text-[10px] font-mono font-semibold text-[#2B3D4F] underline underline-offset-2 hover:text-[#8A6D2B]"
                  >
                    {expandedHandoff['competitors']
                      ? 'Show less'
                      : `Show all ${handoff.competitorResearchNeeds.length}`}
                  </button>
                )}
              </>
            ) : (
              <ChartEmptyState
                title="No competitor vectors"
                message="Add Stage 01 differentiation input to unlock competitor research needs."
                action={ideaLabAction}
              />
            )}
          </div>

          {/* 2. Pricing */}
          <div
            className={`p-3 rounded-lg bg-[#F5F1EB] border space-y-1.5 transition-colors ${
              vectorMatchesSelection(handoff.pricingBenchmarksToStudy)
                ? 'border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30'
                : 'border-[#DDD5C5]'
            }`}
          >
            <div className="text-[10px] font-mono uppercase text-[#5A7A96] font-semibold flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>Pricing Benchmarks</span>
            </div>
            {handoff.pricingBenchmarksToStudy.length > 0 ? (
              <>
                <ul className="space-y-1 text-[11px] text-[#4A5E73]">
                  {visibleItems('pricing', handoff.pricingBenchmarksToStudy).map((item, i) => (
                    <li
                      key={i}
                      className={`leading-relaxed rounded px-1.5 py-0.5 ${
                        expandedHandoff['pricing'] ? '' : 'line-clamp-2'
                      } ${itemMatchesSelection(item) ? 'bg-[#2B3D4F]/10 text-[#2B3D4F] font-medium' : ''}`}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
                {handoff.pricingBenchmarksToStudy.length > 2 && (
                  <button
                    type="button"
                    onClick={() => toggleHandoff('pricing')}
                    className="text-[10px] font-mono font-semibold text-[#2B3D4F] underline underline-offset-2 hover:text-[#8A6D2B]"
                  >
                    {expandedHandoff['pricing']
                      ? 'Show less'
                      : `Show all ${handoff.pricingBenchmarksToStudy.length}`}
                  </button>
                )}
              </>
            ) : (
              <ChartEmptyState
                title="No pricing benchmarks"
                message="Add Stage 01 problem + differentiation input to unlock pricing benchmarks."
                action={ideaLabAction}
              />
            )}
          </div>

          {/* 3. Geographic / Regulatory */}
          <div
            className={`p-3 rounded-lg bg-[#F5F1EB] border space-y-1.5 transition-colors ${
              vectorMatchesSelection(handoff.geographicRegulatoryQueries)
                ? 'border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30'
                : 'border-[#DDD5C5]'
            }`}
          >
            <div className="text-[10px] font-mono uppercase text-[#5B6B7F] font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Regional Constraints</span>
            </div>
            {handoff.geographicRegulatoryQueries.length > 0 ? (
              <>
                <ul className="space-y-1 text-[11px] text-[#4A5E73]">
                  {visibleItems('regional', handoff.geographicRegulatoryQueries).map((item, i) => (
                    <li
                      key={i}
                      className={`leading-relaxed rounded px-1.5 py-0.5 ${
                        expandedHandoff['regional'] ? '' : 'line-clamp-2'
                      } ${itemMatchesSelection(item) ? 'bg-[#2B3D4F]/10 text-[#2B3D4F] font-medium' : ''}`}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
                {handoff.geographicRegulatoryQueries.length > 2 && (
                  <button
                    type="button"
                    onClick={() => toggleHandoff('regional')}
                    className="text-[10px] font-mono font-semibold text-[#2B3D4F] underline underline-offset-2 hover:text-[#8A6D2B]"
                  >
                    {expandedHandoff['regional']
                      ? 'Show less'
                      : `Show all ${handoff.geographicRegulatoryQueries.length}`}
                  </button>
                )}
              </>
            ) : (
              <ChartEmptyState
                title="No regional queries"
                message="Add Stage 01 audience + context input to unlock regional constraints."
                action={ideaLabAction}
              />
            )}
          </div>

          {/* 4. Audience Discovery */}
          <div
            className={`p-3 rounded-lg bg-[#F5F1EB] border space-y-1.5 transition-colors ${
              vectorMatchesSelection(handoff.audienceValidationNeeds)
                ? 'border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30'
                : 'border-[#DDD5C5]'
            }`}
          >
            <div className="text-[10px] font-mono uppercase text-[#4A7C59] font-semibold flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Audience Hypotheses</span>
            </div>
            {handoff.audienceValidationNeeds.length > 0 ? (
              <>
                <ul className="space-y-1 text-[11px] text-[#4A5E73]">
                  {visibleItems('audience', handoff.audienceValidationNeeds).map((item, i) => (
                    <li
                      key={i}
                      className={`leading-relaxed rounded px-1.5 py-0.5 ${
                        expandedHandoff['audience'] ? '' : 'line-clamp-2'
                      } ${itemMatchesSelection(item) ? 'bg-[#2B3D4F]/10 text-[#2B3D4F] font-medium' : ''}`}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
                {handoff.audienceValidationNeeds.length > 2 && (
                  <button
                    type="button"
                    onClick={() => toggleHandoff('audience')}
                    className="text-[10px] font-mono font-semibold text-[#2B3D4F] underline underline-offset-2 hover:text-[#8A6D2B]"
                  >
                    {expandedHandoff['audience']
                      ? 'Show less'
                      : `Show all ${handoff.audienceValidationNeeds.length}`}
                  </button>
                )}
              </>
            ) : (
              <ChartEmptyState
                title="No audience hypotheses"
                message="Add Stage 01 target audience input to unlock audience validation needs."
                action={ideaLabAction}
              />
            )}
          </div>
        </div>
        {selectedDecisionKey && (
          <p className="text-[10px] font-mono text-[#6B7D90]">
            Highlighting handoff vectors sharing keywords with the selected decision item — click it again to clear.
          </p>
        )}

        {/* Final Prominent Transition CTA */}
        <div className="pt-3 border-t border-[#DDD5C5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-[#6B7D90] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4A7C59] shrink-0" />
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
