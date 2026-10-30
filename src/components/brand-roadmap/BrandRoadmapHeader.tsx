import React from 'react';
import { Compass, RotateCw } from 'lucide-react';
import type { BrandRoadmapReport } from '../../types/brandRoadmap';

interface BrandRoadmapHeaderProps {
  report: BrandRoadmapReport;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onRefresh?: () => void;
  onOpenCompetitorRoadmaps?: () => void;
}

const STRATEGIC_NODES = [
  { id: 'idea', label: 'IDEA', sub: 'Phase 01' },
  { id: 'positioning', label: 'POSITIONING', sub: 'Phase 02' },
  { id: 'diff', label: 'DIFFERENTIATION', sub: 'Phase 03' },
  { id: 'dna', label: 'BRAND DNA', sub: 'Phase 04' },
  { id: 'identity', label: 'IDENTITY', sub: 'Phase 05' },
  { id: 'experience', label: 'CUSTOMER EXP', sub: 'Phase 06' },
  { id: 'launch', label: 'LAUNCH', sub: 'Phase 07' },
  { id: 'growth', label: 'GROWTH', sub: 'Phase 08' },
];

export const BrandRoadmapHeader: React.FC<BrandRoadmapHeaderProps> = ({
  report,
  activeSection,
  onSelectSection,
  onRefresh,
  onOpenCompetitorRoadmaps,
}) => {
  const identityAudit = report?.identityAudit ?? {
    positioningStatus: 'NEEDS INPUT',
    identityStatus: 'NEEDS INPUT',
    differentiationStatus: 'NEEDS INPUT',
  };
  const stage05Handoff = report?.stage05Handoff ?? { isReady: false };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30';
      case 'USER INPUT':
        return 'bg-[#2684F7]/10 text-[#2684F7] border-[#2684F7]/30';
      case 'AI INFERENCE':
        return 'bg-[#F2EDFF] text-[#9272DB] border-[#9272DB]/30';
      case 'READY':
        return 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30';
      case 'IN PROGRESS':
        return 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30';
      default:
        return 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30';
    }
  };

  return (
    <header className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 lg:p-8 shadow-xl relative overflow-hidden">
      {/* Background visual glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#14213D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#5B6B7F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top bar with stage badge & title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-wider uppercase rounded-md bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/30">
                STAGE 04
              </span>
              <span className="text-xs font-mono text-[#60738F] uppercase tracking-wider">
                Strategic Brand Transformation Roadmap
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#14213D] tracking-tight">
              BRAND ROADMAP
            </h1>
            <p className="mt-1 text-sm sm:text-base text-[#60738F] max-w-2xl">
              What should a founder DO to turn this idea into a strong brand? Turn market intelligence into a distinctive brand position, visual identity system, and customer journey.
            </p>
          </div>

          {/* Quick audit indicators & Action buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* View Competitor Roadmaps Button */}
            {onOpenCompetitorRoadmaps && (
              <button
                type="button"
                onClick={onOpenCompetitorRoadmaps}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14213D] hover:bg-[#3A4F63] text-white border border-[#14213D] text-xs font-mono font-bold transition-all shadow-sm"
              >
                <Compass className="w-4 h-4 animate-pulse" />
                <span>VIEW COMPETITOR ROADMAPS</span>
              </button>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#EEF4FB] p-3 rounded-xl border border-[#E2EAF4]">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#60738F]">Positioning</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.positioningStatus)}`}>
                  {identityAudit.positioningStatus}
                </span>
              </div>
              <div className="h-6 w-px bg-[#E2EAF4]" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#60738F]">Identity</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.identityStatus)}`}>
                  {identityAudit.identityStatus}
                </span>
              </div>
              <div className="h-6 w-px bg-[#E2EAF4]" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#60738F]">Differentiation</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.differentiationStatus)}`}>
                  {identityAudit.differentiationStatus}
                </span>
              </div>
              <div className="h-6 w-px bg-[#E2EAF4]" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#60738F]">Readiness</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${stage05Handoff.isReady ? 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30' : 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30'}`}>
                  {stage05Handoff.isReady ? 'READY FOR BUILD' : 'NEEDS INPUT'}
                </span>
              </div>
              {onRefresh && (
                <button
                  type="button"
                  onClick={onRefresh}
                  title="Recalculate Brand Roadmap"
                  className="ml-2 p-2 rounded-lg bg-[#EEF4FB] hover:bg-[#E2EAF4] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Horizontal Visual Progression Flow: IDEA -> POSITIONING -> DIFFERENTIATION -> BRAND DNA -> IDENTITY -> CUSTOMER EXP -> LAUNCH -> GROWTH */}
        <div className="pt-2 border-t border-[#E8E1D3]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#60738F] mb-2 flex items-center justify-between">
            <span>Dynamic Brand Transformation Progression</span>
            <span className="text-[10px] text-[#14213D] font-bold">8 STRATEGIC PHASES</span>
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#E2EAF4]">
            <div className="flex items-center min-w-max gap-2">
              {STRATEGIC_NODES.map((node, idx) => {
                // These pills visualize the 8-phase venture journey; the page
                // itself filters by SectionTab (all/roadmap/decisions/resources/handoff),
                // so a pill selects the roadmap section rather than an invalid tab.
                const isActive = activeSection === 'all' || activeSection === 'roadmap';
                return (
                  <React.Fragment key={node.id}>
                    <button
                      type="button"
                      onClick={() => onSelectSection('roadmap')}
                      className={`group flex flex-col text-left px-3 py-1.5 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-[#14213D]/15 border-[#14213D] text-[#14213D] shadow-sm'
                          : 'bg-[#EEF4FB] hover:bg-[#EEF4FB] border-[#E2EAF4] text-[#60738F] hover:text-[#14213D]'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-semibold tracking-wider text-[#60738F] group-hover:text-[#14213D]">
                        0{idx + 1} &bull; {node.sub}
                      </span>
                      <span className="text-xs font-bold font-mono tracking-tight mt-0.5">
                        {node.label}
                      </span>
                    </button>
                    {idx < STRATEGIC_NODES.length - 1 && (
                      <div className="text-[#14213D] flex items-center px-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
