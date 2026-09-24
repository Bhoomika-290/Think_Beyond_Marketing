import React, { useState } from 'react';
import { StagePlaceholder } from '../components/layout/StagePlaceholder';
import { STAGES } from '../types/project';
import { useProject } from '../context/ProjectContext';
import { FileText, Download, X, ShieldCheck, Printer } from 'lucide-react';

export const ExecutionPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'execution') || STAGES[5];
  return <StagePlaceholder stage={stage} />;
};

export const SimulationPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'simulation') || STAGES[6];
  return <StagePlaceholder stage={stage} />;
};

export const LaunchGrowthPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'launch-growth') || STAGES[7];
  const { state, brandReport, buildReport } = useProject();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const ventureName = state.idea.name || state.project.name || 'Untitled Venture';

  return (
    <div className="space-y-6">
      {/* Stage 08 Header with Prominent [ BRAND REPORT ] Button */}
      <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#263244] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#738095] uppercase">Executive Output</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                MULTI-STAGE AGGREGATE
              </span>
            </div>
            <h2 className="text-base font-bold text-[#F3F4F6] mt-0.5">
              Brand Intelligence Report Access
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsReportOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-blue-600/20"
        >
          <FileText className="w-4 h-4" />
          <span>[ BRAND REPORT ]</span>
        </button>
      </div>

      {/* Main Stage Placeholder */}
      <StagePlaceholder stage={stage} />

      {/* Brand Intelligence Report Modal */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0B1017] border border-[#263244] rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1C2635] bg-[#0E1520]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#F3F4F6]">
                    Venture Brand Intelligence Dossier: {ventureName}
                  </h3>
                  <p className="text-[11px] font-mono text-[#738095]">
                    Consolidated strategic synthesis across Stages 01–05
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-xs font-mono text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsReportOpen(false)}
                  className="p-1.5 rounded-lg text-[#738095] hover:text-[#F3F4F6] hover:bg-[#151E2B] transition-colors"
                  aria-label="Close report"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin text-xs text-[#AAB4C3]">
              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2">
                <div className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                  Stage 01 — Core Thesis &amp; Problem
                </div>
                <h4 className="text-sm font-bold text-[#F3F4F6]">
                  {state.idea.name || 'Venture Concept'}
                </h4>
                <p className="text-xs text-[#E1E7EF] leading-relaxed">
                  {state.idea.rawInput || 'No raw thesis provided.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0D141F] border border-[#1C2635] text-[#738095]">
                    Target: {state.idea.targetAudience || 'Target segment defined'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0D141F] border border-[#1C2635] text-[#738095]">
                    Category: {state.businessModel.productType || 'Technology'}
                  </span>
                </div>
              </div>

              {/* Brand Roadmap & Strategy Summary */}
              <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                  Stage 04 — Brand Strategy &amp; Positioning Wedge
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Positioning Statement</div>
                    <div className="text-xs font-semibold text-[#F3F4F6] mt-1">
                      {brandReport.positioningStatement.fullStatement}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Active Tagline</div>
                    <div className="text-xs font-semibold text-blue-400 mt-1">
                      &ldquo;{brandReport.taglineWorkspace.activeTagline}&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand System Specification */}
              <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
                <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                  Stage 05A — Brand System Specification
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Selected Mark</div>
                    <div className="text-xs font-bold text-[#F3F4F6] mt-1">
                      {brandReport.brandBoard.selectedMark.name}
                    </div>
                    <div className="text-[10px] text-[#738095] capitalize">
                      {brandReport.brandBoard.selectedMark.style}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Typography</div>
                    <div className="text-xs font-bold text-[#F3F4F6] mt-1">
                      {brandReport.brandBoard.typography.name}
                    </div>
                    <div className="text-[10px] text-[#738095]">
                      {brandReport.brandBoard.typography.headingFont} / {brandReport.brandBoard.typography.bodyFont}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Primary Color</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: brandReport.brandBoard.colorPalette[0]?.hex || '#4D8DFF' }}
                      />
                      <span className="text-xs font-mono font-bold text-[#F3F4F6]">
                        {brandReport.brandBoard.colorPalette[0]?.hex || '#4D8DFF'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Brand Voice</div>
                    <div className="text-xs font-bold text-[#F3F4F6] mt-1 truncate">
                      {brandReport.brandBoard.voiceCharacteristics.slice(0, 2).join(', ') || 'Authentic, Precise'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Build & Engineering Architecture Specification */}
              <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  Stage 05B — Product Build Architecture
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Readiness Score</div>
                    <div className="text-lg font-bold font-mono text-[#F3F4F6] mt-1">
                      {buildReport.readinessOverview.overallScore}%
                    </div>
                    <div className="text-[10px] text-emerald-400">
                      {buildReport.readinessOverview.buildStatus}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">MVP Must-Haves</div>
                    <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                      {buildReport.mvpScope.matrixSummary.mustCount} Features
                    </div>
                    <div className="text-[10px] text-[#738095]">
                      ~{buildReport.mvpScope.matrixSummary.mvpEffortWeeks} wks to production
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                    <div className="text-[10px] font-mono text-[#738095] uppercase">Primary Stack</div>
                    <div className="text-xs font-bold text-[#F3F4F6] mt-1 truncate">
                      {buildReport.techStack.items[0]?.currentTech || 'TypeScript, React'}
                    </div>
                    <div className="text-[10px] text-[#738095]">
                      {buildReport.techStack.items[1]?.currentTech || 'Tailwind, Node'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#1C2635] bg-[#0E1520] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#738095]">
                Exportable Dossier • Stage 08 Integrated Report
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ReportPage: React.FC = () => {
  return <LaunchGrowthPage />;
};
