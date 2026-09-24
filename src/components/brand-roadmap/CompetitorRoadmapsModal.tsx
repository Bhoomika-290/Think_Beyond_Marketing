import React, { useState } from 'react';
import {
  X,
  Layers,
  ArrowRight,
  AlertTriangle,
  Compass,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import type { CompetitorRoadmapItem, CompetitorPatternComparison } from '../../types/brandRoadmap';

interface CompetitorRoadmapsModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitors: CompetitorRoadmapItem[];
  comparisons?: CompetitorPatternComparison[];
  ventureName: string;
}

export const CompetitorRoadmapsModal: React.FC<CompetitorRoadmapsModalProps> = ({
  isOpen,
  onClose,
  competitors,
  comparisons,
  ventureName,
}) => {
  const [selectedId, setSelectedId] = useState<string>(competitors[0]?.id || '');
  const [viewMode, setViewMode] = useState<'journey' | 'comparison'>('journey');

  if (!isOpen) return null;

  const activeCompetitor = competitors.find((c) => c.id === selectedId) || competitors[0];

  const getStageColor = (idx: number) => {
    const colors = [
      'border-blue-500/40 text-blue-400 bg-blue-500/10',
      'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      'border-purple-500/40 text-purple-400 bg-purple-500/10',
      'border-amber-500/40 text-amber-400 bg-amber-500/10',
      'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      'border-rose-500/40 text-rose-400 bg-rose-500/10',
    ];
    return colors[idx % colors.length];
  };

  const renderDots = (score: number) => {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-xs">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={`w-2 h-2 rounded-full ${
              dot <= score ? 'bg-blue-400 shadow-sm shadow-blue-400/50' : 'bg-[#263244]'
            }`}
          />
        ))}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0B1017] border border-[#263244] rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-[#1C2635] bg-[#0E1520] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
                  Competitor Historical Roadmaps &amp; Evolution
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  LESSONS FOR {ventureName.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#AAB4C3] mt-0.5">
                Inspect how comparable category leaders evolved from inception to scale. Extract strategic patterns, not features to copy blindly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle: Selected Journey vs Compare All */}
            <div className="flex items-center gap-1 p-1 bg-[#111823] rounded-xl border border-[#263244] text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('journey')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  viewMode === 'journey'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-[#738095] hover:text-[#F3F4F6]'
                }`}
              >
                Journey Map
              </button>
              <button
                type="button"
                onClick={() => setViewMode('comparison')}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  viewMode === 'comparison'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-[#738095] hover:text-[#F3F4F6]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Compare Matrix</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#738095] hover:text-[#F3F4F6] hover:bg-[#151E2B] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Competitor Selector Dropdown & Quick Badges */}
        {viewMode === 'journey' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3.5 border-b border-[#1C2635] bg-[#0D141F]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#738095] uppercase font-bold flex-shrink-0">
                SELECT COMPETITOR ▼
              </span>
              <div className="relative">
                <select
                  value={activeCompetitor?.id || ''}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="appearance-none rounded-xl bg-[#111823] border border-[#263244] hover:border-blue-500/60 px-4 py-2 pr-9 text-xs font-bold text-[#F3F4F6] focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm"
                >
                  {competitors.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0B1017] text-[#F3F4F6]">
                      {c.competitorName} ({c.category})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#738095] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {activeCompetitor && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#738095]">Status:</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold border ${
                    activeCompetitor.validationStatus === 'VERIFIED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {activeCompetitor.validationStatus}
                </span>
                <span className="text-xs text-[#738095]">•</span>
                <span className="text-xs text-[#AAB4C3] truncate max-w-xs">
                  {activeCompetitor.sourceEvidence}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Modal Body: Selected Journey View */}
        {viewMode === 'journey' && activeCompetitor && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {/* Trajectory Banner */}
            <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block mb-1">
                  HISTORICAL EVOLUTION TRAJECTORY
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#F3F4F6]">
                  {activeCompetitor.evolutionTrajectory}
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D141F] border border-[#1C2635] text-xs font-mono text-[#AAB4C3]">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                <span>{activeCompetitor.stages.length} Recorded Phases</span>
              </div>
            </div>

            {/* Visual 7-Stage Historical Progression Flow */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#AAB4C3] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Evolutionary Journey Map
                </h3>
                <span className="text-[11px] font-mono text-[#738095]">
                  FOUNDING → EARLY PRODUCT → POSITIONING → BRAND → MARKET ENTRY → EXPANSION → GROWTH
                </span>
              </div>

              <div className="overflow-x-auto pb-3 scrollbar-thin">
                <div className="flex items-stretch gap-3 min-w-[900px]">
                  {activeCompetitor.stages.map((st, sIdx) => (
                    <div
                      key={`${st.stageName}-${sIdx}`}
                      className="flex-1 min-w-[130px] rounded-xl bg-[#111823] border border-[#263244] p-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getStageColor(sIdx)}`}>
                            {st.stageName}
                          </span>
                          <span className="text-[10px] font-mono text-[#738095]">
                            {st.yearOrPhase}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#F3F4F6] line-clamp-2 mb-1">
                          {st.focus}
                        </h4>
                        <p className="text-[11px] text-[#AAB4C3] line-clamp-3">
                          {st.milestone}
                        </p>
                      </div>

                      {st.strategicPivot && (
                        <div className="mt-2 pt-2 border-t border-[#1C2635] text-[10px] text-amber-300/90 font-mono">
                          Pivot: {st.strategicPivot}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WHAT TO EXTRACT — Founder Takeaways Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#AAB4C3] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                WHAT TO EXTRACT — Strategic Lessons for {ventureName}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Positioning Lesson */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-[#263244]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Positioning Lesson
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.positioningLesson || activeCompetitor.takeaways.positioningDecisions}
                  </p>
                </div>

                {/* Sequencing Lesson */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-[#263244]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Sequencing Lesson
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.sequencingLesson || activeCompetitor.takeaways.sequencingLessons}
                  </p>
                </div>

                {/* Product -> Brand Transition */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-[#263244]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Product → Brand Transition
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.productToBrandTransition}
                  </p>
                </div>

                {/* Customer Acquisition */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-[#263244]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Customer Acquisition Lesson
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.customerAcquisitionLesson || activeCompetitor.takeaways.distributionStrategy}
                  </p>
                </div>

                {/* Distribution Lesson */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-[#263244]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    Distribution Lesson
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.distributionLesson || activeCompetitor.takeaways.distributionStrategy}
                  </p>
                </div>

                {/* Expansion Lesson */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-[#263244]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    Expansion Lesson
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.expansionLesson || 'Scale adjacencies after core wedge reaches retention plateau.'}
                  </p>
                </div>

                {/* Brand Identity Lesson */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-[#263244]">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-pink-400 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                    Brand Identity Lesson
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.brandIdentityLesson || 'Distinct visual signifiers created recognition before features were explained.'}
                  </p>
                </div>

                {/* What NOT to Copy */}
                <div className="p-3.5 rounded-xl bg-[#0E1622] border border-rose-500/20 bg-rose-500/5">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    What NOT to Copy
                  </div>
                  <p className="text-xs text-[#E1E7EF] leading-relaxed">
                    {activeCompetitor.takeaways.whatNotToCopy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body: Compare All Competitors Matrix View */}
        {viewMode === 'comparison' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#F3F4F6]">
                  Cross-Competitor Evolution Pattern Matrix
                </h3>
                <p className="text-xs text-[#AAB4C3] mt-0.5">
                  Side-by-side strategic comparison of competitor journeys to discover recurring category patterns.
                </p>
              </div>
              <span className="text-xs font-mono text-[#738095]">
                {competitors.length} Competitors Analyzed
              </span>
            </div>

            {/* Pattern Table */}
            <div className="overflow-x-auto rounded-xl border border-[#263244]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#111823] text-[#738095] font-mono uppercase text-[10px] border-b border-[#263244]">
                  <tr>
                    <th className="p-3.5 font-bold text-[#F3F4F6]">Competitor</th>
                    <th className="p-3.5">Positioning Wedge</th>
                    <th className="p-3.5">Brand Shift Moment</th>
                    <th className="p-3.5">Distribution Wedge</th>
                    <th className="p-3.5">Expansion Vector</th>
                    <th className="p-3.5">Strategic Takeaway</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C2635] font-mono">
                  {(comparisons && comparisons.length > 0
                    ? comparisons
                    : competitors.map((c) => ({
                        competitorName: c.competitorName,
                        category: c.category,
                        positioningWedge: c.takeaways.positioningLesson || c.takeaways.positioningDecisions || '',
                        positioningScore: 3,
                        brandShiftMoment: c.takeaways.productToBrandTransition || '',
                        brandShiftScore: 3,
                        initialDistribution: c.takeaways.distributionLesson || c.takeaways.distributionStrategy || '',
                        distributionScore: 2,
                        expansionVector: c.takeaways.expansionLesson || 'Platform expansion',
                        expansionScore: 3,
                        founderSynthesis: c.takeaways.sequencingLesson || c.takeaways.sequencingLessons || '',
                      }))
                  ).map((comp, cIdx) => (
                    <tr key={cIdx} className="hover:bg-[#131C29] transition-colors">
                      <td className="p-3.5 font-bold text-[#F3F4F6] whitespace-nowrap">
                        <div className="font-sans font-bold text-xs">{comp.competitorName}</div>
                        <div className="text-[10px] text-[#738095] font-mono">{comp.category}</div>
                      </td>
                      <td className="p-3.5 max-w-xs text-[#CBD5E1] font-sans">
                        <div className="mb-1">{renderDots(comp.positioningScore)}</div>
                        <div className="line-clamp-2">{comp.positioningWedge}</div>
                      </td>
                      <td className="p-3.5 max-w-xs text-[#CBD5E1] font-sans">
                        <div className="mb-1">{renderDots(comp.brandShiftScore)}</div>
                        <div className="line-clamp-2">{comp.brandShiftMoment}</div>
                      </td>
                      <td className="p-3.5 max-w-xs text-[#CBD5E1] font-sans">
                        <div className="mb-1">{renderDots(comp.distributionScore)}</div>
                        <div className="line-clamp-2">{comp.initialDistribution}</div>
                      </td>
                      <td className="p-3.5 max-w-xs text-[#CBD5E1] font-sans">
                        <div className="mb-1">{renderDots(comp.expansionScore)}</div>
                        <div className="line-clamp-2">{comp.expansionVector}</div>
                      </td>
                      <td className="p-3.5 max-w-xs text-blue-300 font-sans text-[11px] leading-relaxed">
                        {comp.founderSynthesis}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1C2635] bg-[#0E1520] flex items-center justify-between text-xs text-[#738095] font-mono">
          <span>Comparative Intelligence grounded in historical precedents</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Close Insights</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
