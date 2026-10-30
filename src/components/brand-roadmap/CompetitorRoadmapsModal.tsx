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
  competitors = [],
  comparisons,
  ventureName,
}) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [viewMode, setViewMode] = useState<'journey' | 'comparison'>('journey');

  // Lock body scroll while modal is open to prevent accidental background interaction
  React.useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasCompetitors = competitors && competitors.length > 0;
  if (competitors.length === 0) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#E2EAF4] rounded-2xl p-6 text-center space-y-4 shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#FFF3E7] border border-[#F29A42]/30 flex items-center justify-center text-amber-400 mx-auto">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#14213D] uppercase tracking-wider font-mono">
              NO COMPETITOR DATA AVAILABLE
            </h3>
            <p className="text-xs text-[#8495AE] leading-relaxed mt-2">
              Competitor trajectories for {ventureName} require competitor intelligence from Stage 03 Market Intelligence.
              Please populate or verify competitors in Stage 03 first.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#1a2436] text-[#14213D] border border-[#E2EAF4] text-xs font-mono font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const activeCompetitor = competitors.find((c) => c.id === selectedId) || competitors[0];

  const getStageColor = (idx: number) => {
    const colors = [
      'border-[#14213D]/30 text-[#14213D] bg-[#14213D]/10',
      'border-[#F29A42]/30 text-[#F29A42] bg-[#FFF3E7]',
      'border-[#19A875]/30 text-[#19A875] bg-[#E8F8F1]',
      'border-[#14213D]/30 text-[#14213D] bg-[#14213D]/10',
      'border-[#F29A42]/30 text-[#F29A42] bg-[#FFF3E7]',
      'border-[#19A875]/30 text-[#19A875] bg-[#E8F8F1]',
      'border-[#14213D]/30 text-[#14213D] bg-[#14213D]/10',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#FFFFFF] border border-[#E2EAF4] rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-[#E2EAF4] bg-[#EEF4FB] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[rgba(43,61,79,0.12)] border border-[#14213D]/30 flex items-center justify-center text-[#14213D]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
                  Competitor Historical Roadmaps &amp; Evolution
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/30 font-semibold">
                  LESSONS FOR {ventureName.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#60738F] mt-0.5">
                Inspect how comparable category leaders evolved from inception to scale. Extract strategic patterns, not features to copy blindly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasCompetitors && (
              <div className="flex items-center gap-1 p-1 bg-[#EEF4FB] rounded-xl border border-[#E2EAF4] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('journey')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    viewMode === 'journey'
                      ? 'bg-[#14213D] text-white font-bold'
                      : 'text-[#60738F] hover:text-[#14213D]'
                  }`}
                >
                  Journey Map
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('comparison')}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                    viewMode === 'comparison'
                      ? 'bg-[#14213D] text-white font-bold'
                      : 'text-[#60738F] hover:text-[#14213D]'
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
              className="p-2 rounded-xl text-[#60738F] hover:text-[#14213D] hover:bg-[#EEF4FB] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Empty State if No Competitor Roadmaps */}
        {!hasCompetitors ? (
          <div className="p-8 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#FFF3E7] text-[#F29A42] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14213D]">
                No verified competitor roadmap is available yet
              </h3>
              <p className="text-xs text-[#60738F] mt-1 leading-relaxed">
                Competitor historical evolution analysis requires verified public milestones from comparable market players. As your venture completes Stage 03 (Market Intelligence), the council will surface benchmark roadmaps.
              </p>
            </div>
            <div className="p-3 bg-[#EEF4FB] rounded-lg border border-[#E2EAF4] text-left text-xs text-[#60738F] space-y-1">
              <span className="font-semibold text-[#14213D] block">Required Evidence:</span>
              <p>• Verified category competitors in Stage 03</p>
              <p>• Public S-1 filings or documented founder case studies</p>
            </div>
          </div>
        ) : (
          <>
            {/* Competitor Selector Dropdown & Quick Badges */}
            {viewMode === 'journey' && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3.5 border-b border-[#E2EAF4] bg-[#EEF4FB]/70">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#60738F] uppercase font-bold flex-shrink-0">
                    SELECT HISTORICAL CASE:
                  </span>
                  <div className="relative">
                    <select
                      value={activeCompetitor?.id || ''}
                      onChange={(e) => setSelectedId(e.target.value)}
                      className="appearance-none rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] hover:border-[#14213D] px-4 py-1.5 pr-9 text-xs font-bold text-[#14213D] focus:outline-none focus:border-[#14213D] cursor-pointer shadow-sm"
                    >
                      {competitors.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#FFFFFF] text-[#14213D]">
                          {c.competitorName} ({c.category})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#60738F] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {activeCompetitor && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#60738F]">Status:</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold border ${
                        activeCompetitor.validationStatus === 'VERIFIED'
                          ? 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30'
                          : 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30'
                      }`}
                    >
                      {activeCompetitor.validationStatus}
                    </span>
                    <span className="text-xs text-[#E2EAF4]">•</span>
                    <span className="text-xs text-[#60738F] truncate max-w-xs">
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
                <div className="p-4 rounded-xl bg-[#EEF4FB] border border-[#E2EAF4] flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#F29A42] font-bold block mb-1">
                      HISTORICAL EVOLUTION TRAJECTORY
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#14213D]">
                      {activeCompetitor.evolutionTrajectory}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] text-xs font-mono text-[#60738F] shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-[#14213D]" />
                    <span>{activeCompetitor.stages.length} Recorded Phases</span>
                  </div>
                </div>

                {/* Visual Historical Progression Flow */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#14213D]" />
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
                <div className="space-y-3 pt-4 border-t border-[#E2EAF4]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#14213D] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#19A875]" />
                    Strategic Takeaways for {ventureName}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-xl bg-[#EEF4FB] border border-[#E2EAF4] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#F29A42] font-bold block">
                        POSITIONING LESSON
                      </span>
                      <p className="text-xs text-[#14213D] leading-relaxed">
                        {activeCompetitor.takeaways.positioningLesson}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#EEF4FB] border border-[#E2EAF4] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#19A875] font-bold block">
                        SEQUENCING &amp; MVP LESSON
                      </span>
                      <p className="text-xs text-[#14213D] leading-relaxed">
                        {activeCompetitor.takeaways.sequencingLesson}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#EEF4FB] border border-[#E2EAF4] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#14213D] font-bold block">
                        CUSTOMER ACQUISITION LESSON
                      </span>
                      <p className="text-xs text-[#14213D] leading-relaxed">
                        {activeCompetitor.takeaways.customerAcquisitionLesson}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#EEF4FB] border border-[#F29A42]/30 bg-[#F29A42]/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#F29A42] font-bold block">
                        ⚠️ WHAT NOT TO COPY
                      </span>
                      <p className="text-xs text-[#14213D] leading-relaxed">
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
                      className="p-4 rounded-xl bg-[#EEF4FB] border border-[#E2EAF4] space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#E2EAF4]">
                        <h4 className="font-bold text-sm text-[#14213D]">{c.competitorName}</h4>
                        <span className="text-[10px] font-mono text-[#60738F]">{c.category}</span>
                      </div>
                      <div className="text-xs text-[#60738F] space-y-2">
                        <p><strong>First Wedge:</strong> {c.stages[0]?.focus || 'Initial MVP'}</p>
                        <p><strong>Scaling Lever:</strong> {c.stages[2]?.focus || 'Market positioning'}</p>
                        <p><strong>Core Warning:</strong> {c.takeaways.whatNotToCopy}</p>
                        {(() => {
                          const cmp = comparisons?.find(
                            (x) => x.competitorName.toLowerCase() === c.competitorName.toLowerCase()
                          );
                          return cmp?.founderSynthesis ? (
                            <p>
                              <strong>Founder Synthesis:</strong> {cmp.founderSynthesis}
                            </p>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E2EAF4] bg-[#EEF4FB] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#60738F]">
            <ShieldCheck className="w-4 h-4 text-[#19A875]" />
            <span>Historical intelligence synthesized for {ventureName} strategic roadmapping.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#14213D] hover:bg-[#3A4F63] text-white text-xs font-mono font-bold transition-all"
          >
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
