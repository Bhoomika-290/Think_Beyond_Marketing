import React, { useState } from 'react';
import { StagePlaceholder } from '../components/layout/StagePlaceholder';
import { STAGES } from '../types/project';
import { useProject } from '../context/ProjectContext';
import { FileText, Download, X, ShieldCheck, Printer } from 'lucide-react';



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
      <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F2FF] border border-[#2684F7]/30 flex items-center justify-center text-[#2684F7]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#60738F] uppercase">Executive Output</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30">
                MULTI-STAGE AGGREGATE
              </span>
            </div>
            <h2 className="text-base font-bold text-[#14213D] mt-0.5">
              Brand Intelligence Report Access
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsReportOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2684F7] hover:bg-[#1769D2] text-white font-mono text-xs font-bold transition-all shadow-lg shadow-blue-600/20"
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
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#FFFFFF] border border-[#E2EAF4] rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E2EAF4] bg-[#FFFFFF]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E8F2FF] border border-[#2684F7]/30 flex items-center justify-center text-[#2684F7]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#14213D]">
                    Venture Brand Intelligence Dossier: {ventureName}
                  </h3>
                  <p className="text-[11px] font-mono text-[#60738F]">
                    Consolidated strategic synthesis across Stages 01–05
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF4FB] text-xs font-mono text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsReportOpen(false)}
                  className="p-1.5 rounded-lg text-[#60738F] hover:text-[#14213D] hover:bg-[#EEF4FB] transition-colors"
                  aria-label="Close report"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin text-xs text-[#8495AE]">
              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-2">
                <div className="text-[10px] font-mono uppercase text-[#2684F7] font-bold">
                  Stage 01 — Core Thesis &amp; Problem
                </div>
                <h4 className="text-sm font-bold text-[#14213D]">
                  {state.idea.name || 'Venture Concept'}
                </h4>
                <p className="text-xs text-[#E1E7EF] leading-relaxed">
                  {state.idea.rawInput || 'No raw thesis provided.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FFFFFF] border border-[#E2EAF4] text-[#60738F]">
                    Target: {state.idea.targetAudience || 'Target segment defined'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FFFFFF] border border-[#E2EAF4] text-[#60738F]">
                    Category: {state.businessModel.productType || 'Technology'}
                  </span>
                </div>
              </div>

              {/* Brand Roadmap & Strategy Summary */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-3">
                <div className="text-[10px] font-mono uppercase text-[#19A875] font-bold">
                  Stage 04 — Brand Strategy &amp; Positioning Wedge
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Positioning Statement</div>
                    <div className="text-xs font-semibold text-[#14213D] mt-1">
                      {brandReport.positioningStatement.fullStatement}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Active Tagline</div>
                    <div className="text-xs font-semibold text-[#2684F7] mt-1">
                      &ldquo;{brandReport.taglineWorkspace.activeTagline}&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand System Specification */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-3">
                <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">
                  Stage 05A — Brand System Specification
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Selected Mark</div>
                    <div className="text-xs font-bold text-[#14213D] mt-1">
                      {brandReport.brandBoard.selectedMark.name}
                    </div>
                    <div className="text-[10px] text-[#60738F] capitalize">
                      {brandReport.brandBoard.selectedMark.style}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Typography</div>
                    <div className="text-xs font-bold text-[#14213D] mt-1">
                      {brandReport.brandBoard.typography.name}
                    </div>
                    <div className="text-[10px] text-[#60738F]">
                      {brandReport.brandBoard.typography.headingFont} / {brandReport.brandBoard.typography.bodyFont}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Primary Color</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: brandReport.brandBoard.colorPalette[0]?.hex || '#2684F7' }}
                      />
                      <span className="text-xs font-mono font-bold text-[#14213D]">
                        {brandReport.brandBoard.colorPalette[0]?.hex || '#2684F7'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Brand Voice</div>
                    <div className="text-xs font-bold text-[#14213D] mt-1 truncate">
                      {brandReport.brandBoard.voiceCharacteristics.slice(0, 2).join(', ') || 'Authentic, Precise'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Build & Engineering Architecture Specification */}
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-3">
                <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  Stage 05B — Product Build Architecture
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Readiness Score</div>
                    <div className="text-lg font-bold font-mono text-[#14213D] mt-1">
                      {buildReport.readinessOverview.overallScore}%
                    </div>
                    <div className="text-[10px] text-[#19A875]">
                      {buildReport.readinessOverview.buildStatus}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">MVP Must-Haves</div>
                    <div className="text-lg font-bold font-mono text-[#19A875] mt-1">
                      {buildReport.mvpScope.matrixSummary.mustCount} Features
                    </div>
                    <div className="text-[10px] text-[#60738F]">
                      ~{buildReport.mvpScope.matrixSummary.mvpEffortWeeks} wks to production
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                    <div className="text-[10px] font-mono text-[#60738F] uppercase">Primary Stack</div>
                    <div className="text-xs font-bold text-[#14213D] mt-1 truncate">
                      {buildReport.techStack.items[0]?.currentTech || 'TypeScript, React'}
                    </div>
                    <div className="text-[10px] text-[#60738F]">
                      {buildReport.techStack.items[1]?.currentTech || 'Tailwind, Node'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E2EAF4] bg-[#FFFFFF] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#60738F]">
                Exportable Dossier • Stage 08 Integrated Report
              </span>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2684F7] hover:bg-[#1769D2] text-white font-mono text-xs font-bold transition-colors"
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
