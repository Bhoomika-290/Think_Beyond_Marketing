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
        return 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30';
      case 'USER INPUT':
        return 'bg-[#5A7A96]/10 text-[#5A7A96] border-[#5A7A96]/30';
      case 'AI INFERENCE':
        return 'bg-[#6C5E8F]/10 text-[#6C5E8F] border-[#6C5E8F]/30';
      case 'READY':
        return 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30';
      case 'IN PROGRESS':
        return 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30';
      default:
        return 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30';
    }
  };

  return (
    <header className="rounded-2xl bg-[#FDFCF8] border border-[#DDD5C5] p-6 lg:p-8 shadow-xl relative overflow-hidden">
      {/* Background visual glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2B3D4F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#5B6B7F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top bar with stage badge & title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-wider uppercase rounded-md bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/30">
                STAGE 04
              </span>
              <span className="text-xs font-mono text-[#6B7D90] uppercase tracking-wider">
                Strategic Brand Transformation Roadmap
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3D4F] tracking-tight">
              BRAND ROADMAP
            </h1>
            <p className="mt-1 text-sm sm:text-base text-[#4A5E73] max-w-2xl">
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2B3D4F] hover:bg-[#3A4F63] text-white border border-[#2B3D4F] text-xs font-mono font-bold transition-all shadow-sm"
              >
                <Compass className="w-4 h-4 animate-pulse" />
                <span>VIEW COMPETITOR ROADMAPS</span>
              </button>
            )}

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#F5F1EB] p-3 rounded-xl border border-[#DDD5C5]">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#6B7D90]">Positioning</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.positioningStatus)}`}>
                  {identityAudit.positioningStatus}
                </span>
              </div>
              <div className="h-6 w-px bg-[#DDD5C5]" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#6B7D90]">Identity</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.identityStatus)}`}>
                  {identityAudit.identityStatus}
                </span>
              </div>
              <div className="h-6 w-px bg-[#DDD5C5]" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#6B7D90]">Differentiation</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.differentiationStatus)}`}>
                  {identityAudit.differentiationStatus}
                </span>
              </div>
              <div className="h-6 w-px bg-[#DDD5C5]" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-[#6B7D90]">Readiness</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${stage05Handoff.isReady ? 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30' : 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30'}`}>
                  {stage05Handoff.isReady ? 'READY FOR BUILD' : 'NEEDS INPUT'}
                </span>
              </div>
              {onRefresh && (
                <button
                  type="button"
                  onClick={onRefresh}
                  title="Recalculate Brand Roadmap"
                  className="ml-2 p-2 rounded-lg bg-[#ECE6DA] hover:bg-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Horizontal Visual Progression Flow: IDEA -> POSITIONING -> DIFFERENTIATION -> BRAND DNA -> IDENTITY -> CUSTOMER EXP -> LAUNCH -> GROWTH */}
        <div className="pt-2 border-t border-[#E8E1D3]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#6B7D90] mb-2 flex items-center justify-between">
            <span>Dynamic Brand Transformation Progression</span>
            <span className="text-[10px] text-[#2B3D4F] font-bold">8 STRATEGIC PHASES</span>
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#DDD5C5]">
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
                          ? 'bg-[#2B3D4F]/15 border-[#2B3D4F] text-[#2B3D4F] shadow-sm'
                          : 'bg-[#F5F1EB] hover:bg-[#ECE6DA] border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F]'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-semibold tracking-wider text-[#6B7D90] group-hover:text-[#2B3D4F]">
                        0{idx + 1} &bull; {node.sub}
                      </span>
                      <span className="text-xs font-bold font-mono tracking-tight mt-0.5">
                        {node.label}
                      </span>
                    </button>
                    {idx < STRATEGIC_NODES.length - 1 && (
                      <div className="text-[#334155] flex items-center px-0.5">
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
