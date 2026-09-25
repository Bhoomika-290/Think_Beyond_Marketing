import React from 'react';
import { Layers, CheckCircle2, AlertTriangle, RefreshCw, Cpu, Activity, Palette, Wrench } from 'lucide-react';
import type { BuildArchitectureReport } from '../../types/project';

interface BuildHeaderProps {
  report: BuildArchitectureReport;
  activeBuildArea: 'brand' | 'product';
  onSelectBuildArea: (area: 'brand' | 'product') => void;
  activeSection: string;
  onSelectSection: (id: string) => void;
  onRefresh: () => void;
}

export const BuildHeader: React.FC<BuildHeaderProps> = ({
  report,
  activeBuildArea,
  onSelectBuildArea,
  activeSection,
  onSelectSection,
  onRefresh,
}) => {
  const { readinessOverview, mvpScope, handoff } = report;

  const brandPills = [
    { id: 'all', label: 'All Brand Systems' },
    { id: 'dna', label: '01 Brand DNA' },
    { id: 'positioning', label: '02 Positioning Builder' },
    { id: 'personality', label: '03 Personality & Voice' },
    { id: 'logo', label: '04 Logo Generator' },
    { id: 'color', label: '05 Color System' },
    { id: 'typography', label: '06 Typography' },
    { id: 'board', label: '07 Identity Board' },
    { id: 'touchpoints', label: '08 Customer Journey' },
  ];

  const productPills = [
    { id: 'all', label: 'All Product Views' },
    { id: 'blueprint', label: 'Blueprint & Scope' },
    { id: 'architecture', label: 'Architecture & Stack' },
    { id: 'data', label: 'Data & Flows' },
    { id: 'roadmap', label: 'Roadmap & Tasks' },
    { id: 'council', label: 'Council & Specialist' },
    { id: 'handoff', label: 'Stage 06 Handoff' },
  ];

  const currentPills = activeBuildArea === 'brand' ? brandPills : productPills;

  return (
    <div className="rounded-2xl border border-[#2B3441] shadow-2xl relative overflow-hidden space-y-6">
      {/* Visual Architectural Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/images/build_architecture_hero.jpg')",
          filter: 'contrast(1.05) brightness(0.65) saturate(0.85)',
        }}
      />

      {/* Dark Translucent Editorial Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#0B0E14]/85 via-[#0D121A]/90 to-[#0F1420]/95 pointer-events-none"
      />

      {/* Blueprint grid watermark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #4A6585 1px, transparent 1px), linear-gradient(to bottom, #4A6585 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 space-y-6">
        {/* Top row: [STAGE 05] and Hero Typography */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider bg-[#1E2633] text-[#CBD5E1] border border-[#334155]">
                [STAGE 05]
              </span>
              <span className="text-xs text-[#94A3B8] font-mono tracking-widest uppercase">
                ENGINEERING &amp; IDENTITY BLUEPRINT
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FAF8F5] tracking-tight leading-tight">
              BUILD &amp; ARCHITECTURE<br />INTELLIGENCE
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-2xl leading-relaxed">
              {activeBuildArea === 'brand'
                ? 'Stage 05A — Brand System: Actively generate, customize, and finalize the logo, color palette, typography hierarchy, brand voice, and identity board.'
                : 'Stage 05B — Product Build: Architect technical specifications, MoSCoW MVP scope, system diagrams, data entity models, APIs, and dependency graphs.'}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <button
              type="button"
              onClick={onRefresh}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141A24]/90 hover:bg-[#1E2636] text-[#CBD5E1] hover:text-[#FAF8F5] border border-[#2B3545] text-xs font-mono font-medium transition-all shadow-sm active:translate-y-0.5"
              title="Recalculate architecture based on current upstream state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recalculate</span>
            </button>
          </div>
        </div>

        {/* Primary Segmented Navigation: Stage 05A vs Stage 05B */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-[#080B10]/80 rounded-xl border border-[#263142] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => {
              onSelectBuildArea('brand');
              onSelectSection('all');
            }}
            className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all ${
              activeBuildArea === 'brand'
                ? 'bg-[#FAF8F5] text-[#0F1420] shadow-md border border-[#FAF8F5]'
                : 'text-[#94A3B8] hover:text-[#FAF8F5] hover:bg-[#141B26]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>STAGE 05A — BRAND SYSTEM</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-mono font-normal ${
                activeBuildArea === 'brand'
                  ? 'bg-[#0F1420]/10 text-[#0F1420]'
                  : 'bg-[#1E2633] text-[#94A3B8]'
              }`}
            >
              IDENTITY &amp; CREATIVE
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectBuildArea('product');
              onSelectSection('all');
            }}
            className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all ${
              activeBuildArea === 'product'
                ? 'bg-[#FAF8F5] text-[#0F1420] shadow-md border border-[#FAF8F5]'
                : 'text-[#94A3B8] hover:text-[#FAF8F5] hover:bg-[#141B26]'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>STAGE 05B — PRODUCT BUILD</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-mono font-normal ${
                activeBuildArea === 'product'
                  ? 'bg-[#0F1420]/10 text-[#0F1420]'
                  : 'bg-[#1E2633] text-[#94A3B8]'
              }`}
            >
              ENGINEERING &amp; SPECS
            </span>
          </button>
        </div>

        {/* 4 Status Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-[#0F1420]/80 border border-[#253040] p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#7D8B9F] uppercase">Readiness</span>
              <Activity className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-bold font-mono text-[#FAF8F5]">
                {readinessOverview.overallScore}%
              </span>
              <span className="text-[11px] text-[#7D8B9F]">Score</span>
            </div>
            <div className="w-full bg-[#1A2332] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#94A3B8] h-full rounded-full transition-all duration-500"
                style={{ width: `${readinessOverview.overallScore}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl bg-[#0F1420]/80 border border-[#253040] p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#7D8B9F] uppercase">Build Status</span>
              <Cpu className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm font-bold text-[#FAF8F5] truncate">
                {readinessOverview.buildStatus}
              </span>
            </div>
            <p className="text-[10px] text-[#7D8B9F] mt-1.5 truncate">
              {readinessOverview.statusExplanation}
            </p>
          </div>

          <div className="rounded-xl bg-[#0F1420]/80 border border-[#253040] p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#7D8B9F] uppercase">MVP Perimeter</span>
              <Layers className="w-4 h-4 text-[#55634B]" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-bold font-mono text-[#D1D5DB]">
                {mvpScope.matrixSummary.mustCount} Must-Have
              </span>
            </div>
            <p className="text-[10px] text-[#7D8B9F] mt-1.5">
              ~{mvpScope.matrixSummary.mvpEffortWeeks} wks engineering effort
            </p>
          </div>

          <div className="rounded-xl bg-[#0F1420]/80 border border-[#253040] p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#7D8B9F] uppercase">Stage 06 Handoff</span>
              {handoff.isReady ? (
                <CheckCircle2 className="w-4 h-4 text-[#3E6F4A]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[#8A6D2B]" />
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span
                className={`text-sm font-bold font-mono ${
                  handoff.isReady ? 'text-[#3E6F4A]' : 'text-[#8A6D2B]'
                }`}
              >
                {handoff.isReady ? 'READY TO EXECUTE' : 'AUDIT IN PROGRESS'}
              </span>
            </div>
            <p className="text-[10px] text-[#7D8B9F] mt-1.5">
              {handoff.checklist.filter((c) => c.passed).length} of {handoff.checklist.length} verified
            </p>
          </div>
        </div>

        {/* Sub-Section Filter Tabs — Tactile editorial tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#232D3B] pt-4">
          <span className="text-xs font-mono text-[#7D8B9F] mr-2 flex-shrink-0">
            {activeBuildArea === 'brand' ? 'BRAND VIEWS:' : 'PRODUCT VIEWS:'}
          </span>
          {currentPills.map((pill) => {
            const isActive = activeSection === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => onSelectSection(pill.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-[#FAF8F5] text-[#0F1420] font-bold shadow-sm translate-y-[-1px]'
                    : 'bg-[#111722]/80 text-[#94A3B8] hover:text-[#FAF8F5] hover:bg-[#1B2332] border border-[#2B3545]'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
