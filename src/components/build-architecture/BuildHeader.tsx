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
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl relative overflow-hidden space-y-6">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top row: Stage number, Title, Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              STAGE 05
            </span>
            <span className="text-xs text-[#738095] font-mono">
              BUILD &amp; ARCHITECTURE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6] tracking-tight">
            Build &amp; Architecture Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#AAB4C3] mt-1 max-w-2xl">
            {activeBuildArea === 'brand'
              ? 'Stage 05A — Brand System: Actively generate, customize, and finalize the logo, color palette, typography hierarchy, brand voice, and identity board.'
              : 'Stage 05B — Product Build: Architect technical specifications, MoSCoW MVP scope, system diagrams, data entity models, APIs, and dependency graphs.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111823] hover:bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] text-xs font-mono font-medium transition-colors"
            title="Recalculate architecture based on current upstream state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate</span>
          </button>
        </div>
      </div>

      {/* Primary Segmented Navigation: [ BRAND SYSTEM ▼ ] vs [ PRODUCT BUILD ▼ ] */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 bg-[#0B1017] rounded-xl border border-[#263244]">
        <button
          type="button"
          onClick={() => {
            onSelectBuildArea('brand');
            onSelectSection('all');
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all ${
            activeBuildArea === 'brand'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/30'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#111823]'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>STAGE 05A — BRAND SYSTEM</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-black/30 font-mono font-normal">
            IDENTITY &amp; CREATIVE
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onSelectBuildArea('product');
            onSelectSection('all');
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-mono text-xs sm:text-sm font-bold transition-all ${
            activeBuildArea === 'product'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/30'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#111823]'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>STAGE 05B — PRODUCT BUILD</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-black/30 font-mono font-normal">
            ENGINEERING &amp; SPECS
          </span>
        </button>
      </div>

      {/* 4 Status Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl bg-[#111823] border border-[#263244] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#738095] uppercase">Readiness</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold font-mono text-[#F3F4F6]">
              {readinessOverview.overallScore}%
            </span>
            <span className="text-[11px] text-[#AAB4C3]">Score</span>
          </div>
          <div className="w-full bg-[#1A2332] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${readinessOverview.overallScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl bg-[#111823] border border-[#263244] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#738095] uppercase">Build Status</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm font-bold text-[#F3F4F6] truncate">
              {readinessOverview.buildStatus}
            </span>
          </div>
          <p className="text-[10px] text-[#738095] mt-1.5 truncate">
            {readinessOverview.statusExplanation}
          </p>
        </div>

        <div className="rounded-xl bg-[#111823] border border-[#263244] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#738095] uppercase">MVP Perimeter</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold font-mono text-emerald-400">
              {mvpScope.matrixSummary.mustCount} Must-Have
            </span>
          </div>
          <p className="text-[10px] text-[#738095] mt-1.5">
            ~{mvpScope.matrixSummary.mvpEffortWeeks} wks engineering effort
          </p>
        </div>

        <div className="rounded-xl bg-[#111823] border border-[#263244] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#738095] uppercase">Stage 06 Handoff</span>
            {handoff.isReady ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            )}
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-sm font-bold font-mono ${
                handoff.isReady ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {handoff.isReady ? 'READY TO EXECUTE' : 'AUDIT IN PROGRESS'}
            </span>
          </div>
          <p className="text-[10px] text-[#738095] mt-1.5">
            {handoff.checklist.filter((c) => c.passed).length} of {handoff.checklist.length} verified
          </p>
        </div>
      </div>

      {/* Sub-Section Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#1C2635] pt-4">
        <span className="text-xs font-mono text-[#738095] mr-2 flex-shrink-0">
          {activeBuildArea === 'brand' ? 'BRAND VIEWS:' : 'PRODUCT VIEWS:'}
        </span>
        {currentPills.map((pill) => {
          const isActive = activeSection === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => onSelectSection(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'bg-[#111823] text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B] border border-[#263244]'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
