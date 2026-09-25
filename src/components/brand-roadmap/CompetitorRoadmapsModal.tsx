import React, { useState } from 'react';
import {
  X,
  Layers,
  Compass,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  TrendingUp,
  AlertCircle,
  ShieldCheck,
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
  ventureName,
}) => {
  const [selectedId, setSelectedId] = useState<string>(competitors[0]?.id || '');
  const [viewMode, setViewMode] = useState<'journey' | 'comparison'>('journey');

  if (!isOpen) return null;

  const hasCompetitors = competitors && competitors.length > 0;
  const activeCompetitor = competitors.find((c) => c.id === selectedId) || competitors[0];

  const getStageColor = (idx: number) => {
    const colors = [
      'border-[#2B3D4F]/30 text-[#2B3D4F] bg-[#2B3D4F]/10',
      'border-[#8A6D2B]/30 text-[#8A6D2B] bg-[#8A6D2B]/10',
      'border-[#4A7C59]/30 text-[#4A7C59] bg-[#4A7C59]/10',
      'border-[#2B3D4F]/30 text-[#2B3D4F] bg-[#2B3D4F]/10',
      'border-[#8A6D2B]/30 text-[#8A6D2B] bg-[#8A6D2B]/10',
      'border-[#4A7C59]/30 text-[#4A7C59] bg-[#4A7C59]/10',
      'border-[#2B3D4F]/30 text-[#2B3D4F] bg-[#2B3D4F]/10',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#FDFCF8] border border-[#DDD5C5] rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-[#DDD5C5] bg-[#F5F1EB] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[rgba(43,61,79,0.12)] border border-[#2B3D4F]/30 flex items-center justify-center text-[#2B3D4F]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#2B3D4F]">
                  Competitor Historical Roadmaps &amp; Evolution
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/30 font-semibold">
                  LESSONS FOR {ventureName.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#5B6B7F] mt-0.5">
                Inspect how comparable category leaders evolved from inception to scale. Extract strategic patterns, not features to copy blindly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasCompetitors && (
              <div className="flex items-center gap-1 p-1 bg-[#ECE6DA] rounded-xl border border-[#DDD5C5] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('journey')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    viewMode === 'journey'
                      ? 'bg-[#2B3D4F] text-white font-bold'
                      : 'text-[#5B6B7F] hover:text-[#2B3D4F]'
                  }`}
                >
                  Journey Map
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('comparison')}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                    viewMode === 'comparison'
                      ? 'bg-[#2B3D4F] text-white font-bold'
                      : 'text-[#5B6B7F] hover:text-[#2B3D4F]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Compare Matrix</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#6B7D90] hover:text-[#2B3D4F] hover:bg-[#ECE6DA] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Empty State if No Competitor Roadmaps */}
        {!hasCompetitors ? (
          <div className="p-8 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#8A6D2B]/10 text-[#8A6D2B] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2B3D4F]">
                No verified competitor roadmap is available yet
              </h3>
              <p className="text-xs text-[#5B6B7F] mt-1 leading-relaxed">
                Competitor historical evolution analysis requires verified public milestones from comparable market players. As your venture completes Stage 03 (Market Intelligence), the council will surface benchmark roadmaps.
              </p>
            </div>
            <div className="p-3 bg-[#F5F1EB] rounded-lg border border-[#DDD5C5] text-left text-xs text-[#5B6B7F] space-y-1">
              <span className="font-semibold text-[#2B3D4F] block">Required Evidence:</span>
              <p>• Verified category competitors in Stage 03</p>
              <p>• Public S-1 filings or documented founder case studies</p>
            </div>
          </div>
        ) : (
          <>
            {/* Competitor Selector Dropdown & Quick Badges */}
            {viewMode === 'journey' && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3.5 border-b border-[#DDD5C5] bg-[#F5F1EB]/70">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#6B7D90] uppercase font-bold flex-shrink-0">
                    SELECT HISTORICAL CASE:
                  </span>
                  <div className="relative">
                    <select
                      value={activeCompetitor?.id || ''}
                      onChange={(e) => setSelectedId(e.target.value)}
                      className="appearance-none rounded-xl bg-[#FDFCF8] border border-[#DDD5C5] hover:border-[#2B3D4F] px-4 py-1.5 pr-9 text-xs font-bold text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F] cursor-pointer shadow-sm"
                    >
                      {competitors.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#FDFCF8] text-[#2B3D4F]">
                          {c.competitorName} ({c.category})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#6B7D90] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {activeCompetitor && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#6B7D90]">Status:</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold border ${
                        activeCompetitor.validationStatus === 'VERIFIED'
                          ? 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30'
                          : 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30'
                      }`}
                    >
                      {activeCompetitor.validationStatus}
                    </span>
                    <span className="text-xs text-[#DDD5C5]">•</span>
                    <span className="text-xs text-[#6B7D90] truncate max-w-xs">
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
                <div className="p-4 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A6D2B] font-bold block mb-1">
                      HISTORICAL EVOLUTION TRAJECTORY
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#2B3D4F]">
                      {activeCompetitor.evolutionTrajectory}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5] text-xs font-mono text-[#5B6B7F] shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-[#2B3D4F]" />
                    <span>{activeCompetitor.stages.length} Recorded Phases</span>
                  </div>
                </div>

                {/* Visual Historical Progression Flow */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B3D4F] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#2B3D4F]" />
                      Evolutionary Progression Map
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeCompetitor.stages.map((stg, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border space-y-2 relative transition-all ${getStageColor(idx)}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                            {stg.stageName}
                          </span>
                          <span className="text-[10px] font-mono opacity-80">
                            {stg.yearOrPhase}
                          </span>
                        </div>

                        <div className="font-bold text-xs">
                          {stg.focus}
                        </div>

                        <p className="text-xs leading-relaxed opacity-90">
                          {stg.milestone}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Takeaways Grid */}
                <div className="space-y-3 pt-4 border-t border-[#DDD5C5]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B3D4F] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4A7C59]" />
                    Strategic Takeaways for {ventureName}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#8A6D2B] font-bold block">
                        POSITIONING LESSON
                      </span>
                      <p className="text-xs text-[#2B3D4F] leading-relaxed">
                        {activeCompetitor.takeaways.positioningLesson}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#4A7C59] font-bold block">
                        SEQUENCING &amp; MVP LESSON
                      </span>
                      <p className="text-xs text-[#2B3D4F] leading-relaxed">
                        {activeCompetitor.takeaways.sequencingLesson}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#2B3D4F] font-bold block">
                        CUSTOMER ACQUISITION LESSON
                      </span>
                      <p className="text-xs text-[#2B3D4F] leading-relaxed">
                        {activeCompetitor.takeaways.customerAcquisitionLesson}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#8A6D2B]/40 bg-[#8A6D2B]/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#8A6D2B] font-bold block">
                        ⚠️ WHAT NOT TO COPY
                      </span>
                      <p className="text-xs text-[#2B3D4F] leading-relaxed">
                        {activeCompetitor.takeaways.whatNotToCopy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body: Comparison Matrix View */}
            {viewMode === 'comparison' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {competitors.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#DDD5C5]">
                        <h4 className="font-bold text-sm text-[#2B3D4F]">{c.competitorName}</h4>
                        <span className="text-[10px] font-mono text-[#6B7D90]">{c.category}</span>
                      </div>
                      <div className="text-xs text-[#5B6B7F] space-y-2">
                        <p><strong>First Wedge:</strong> {c.stages[0]?.focus || 'Initial MVP'}</p>
                        <p><strong>Scaling Lever:</strong> {c.stages[2]?.focus || 'Market positioning'}</p>
                        <p><strong>Core Warning:</strong> {c.takeaways.whatNotToCopy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#DDD5C5] bg-[#F5F1EB] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#6B7D90]">
            <ShieldCheck className="w-4 h-4 text-[#4A7C59]" />
            <span>Historical intelligence synthesized for {ventureName} strategic roadmapping.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#2B3D4F] hover:bg-[#3A4F63] text-white text-xs font-mono font-bold transition-all"
          >
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
