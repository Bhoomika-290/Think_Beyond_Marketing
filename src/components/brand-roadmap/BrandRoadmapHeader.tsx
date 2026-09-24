import React from 'react';
import type { BrandRoadmapReport } from '../../types/project';

interface BrandRoadmapHeaderProps {
  report: BrandRoadmapReport;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onRefresh?: () => void;
}

const PROGRESSION_NODES = [
  { id: 'dna', label: 'MARKET INSIGHT', sub: 'Grounding' },
  { id: 'diff', label: 'DIFFERENTIATION', sub: 'Wedge' },
  { id: 'positioning', label: 'POSITIONING', sub: 'Matrix & Formula' },
  { id: 'dna', label: 'BRAND DNA', sub: 'Causal Chain' },
  { id: 'identity', label: 'IDENTITY', sub: 'Logo & System' },
  { id: 'experience', label: 'EXPERIENCE', sub: 'Journey' },
  { id: 'roadmap', label: 'ROADMAP', sub: 'Milestones' },
];

export const BrandRoadmapHeader: React.FC<BrandRoadmapHeaderProps> = ({
  report,
  activeSection,
  onSelectSection,
  onRefresh,
}) => {
  const { identityAudit, stage05Handoff } = report;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'USER INPUT':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'AI INFERENCE':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'READY':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'IN PROGRESS':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <header className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl relative overflow-hidden">
      {/* Background visual glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top bar with stage badge & title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 text-xs font-mono font-bold tracking-wider uppercase rounded-md bg-blue-500/10 text-[#4D8DFF] border border-blue-500/30">
                STAGE 04
              </span>
              <span className="text-xs font-mono text-[#64748B] uppercase tracking-wider">
                Venture Intelligence Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F3F4F6] tracking-tight">
              BRAND ROADMAP & IDENTITY SYSTEM
            </h1>
            <p className="mt-1 text-sm sm:text-base text-[#AAB4C3] max-w-2xl">
              Turn market intelligence into a distinctive brand position, visual identity system, and customer journey.
            </p>
          </div>

          {/* Quick audit indicators */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-[#111823] p-3 rounded-xl border border-[#263244]">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-[#64748B]">Positioning</span>
              <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.positioningStatus)}`}>
                {identityAudit.positioningStatus}
              </span>
            </div>
            <div className="h-6 w-px bg-[#263244]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-[#64748B]">Identity</span>
              <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.identityStatus)}`}>
                {identityAudit.identityStatus}
              </span>
            </div>
            <div className="h-6 w-px bg-[#263244]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-[#64748B]">Differentiation</span>
              <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${getStatusBadgeClass(identityAudit.differentiationStatus)}`}>
                {identityAudit.differentiationStatus}
              </span>
            </div>
            <div className="h-6 w-px bg-[#263244]" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-[#64748B]">Readiness</span>
              <span className={`text-xs px-2 py-0.5 rounded border font-mono font-semibold ${stage05Handoff.isReady ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                {stage05Handoff.isReady ? 'READY FOR BUILD' : 'NEEDS INPUT'}
              </span>
            </div>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                title="Recalculate Brand System"
                className="ml-2 p-2 rounded-lg bg-[#151E2B] hover:bg-[#263244] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Visual Progression Flow */}
        <div className="pt-2 border-t border-[#1C2636]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-2">
            Strategic Progression Architecture
          </div>
          <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#263244]">
            <div className="flex items-center min-w-max gap-2">
              {PROGRESSION_NODES.map((node, idx) => {
                const isActive = activeSection === node.id;
                return (
                  <React.Fragment key={`${node.id}-${idx}`}>
                    <button
                      type="button"
                      onClick={() => onSelectSection(node.id)}
                      className={`group flex flex-col text-left px-3.5 py-2 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-blue-600/15 border-[#4D8DFF] text-[#F3F4F6] shadow-sm shadow-blue-500/10'
                          : 'bg-[#111823]/80 hover:bg-[#151E2B] border-[#263244] text-[#AAB4C3] hover:text-[#F3F4F6]'
                      }`}
                    >
                      <span className="text-[9px] font-mono font-semibold tracking-wider text-[#64748B] group-hover:text-[#4D8DFF]">
                        0{idx + 1} • {node.sub}
                      </span>
                      <span className="text-xs font-bold font-mono tracking-tight mt-0.5">
                        {node.label}
                      </span>
                    </button>
                    {idx < PROGRESSION_NODES.length - 1 && (
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
