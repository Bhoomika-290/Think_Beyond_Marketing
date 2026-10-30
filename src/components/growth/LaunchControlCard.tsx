import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Package, 
  Layers, 
  Users, 
  Settings, 
  Megaphone,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LaunchReadinessSystem, LaunchReadinessDimension, ProjectSynthesisData } from '../../types/growth';

interface LaunchControlCardProps {
  readiness: LaunchReadinessSystem;
  synthesis: ProjectSynthesisData;
}

export const LaunchControlCard: React.FC<LaunchControlCardProps> = ({
  readiness,
  synthesis,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);

  const getDimensionIcon = (id: string) => {
    switch (id) {
      case 'brand':
        return <Layers className="w-4 h-4 text-[#9272DB]" />;
      case 'product':
        return <Package className="w-4 h-4 text-[#2684F7]" />;
      case 'market':
        return <Users className="w-4 h-4 text-[#2684F7]" />;
      case 'experience':
        return <Cpu className="w-4 h-4 text-[#19A875]" />;
      case 'execution':
        return <Settings className="w-4 h-4 text-[#F29A42]" />;
      case 'growth':
        return <Megaphone className="w-4 h-4 text-[#EC4899]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#2684F7]" />;
    }
  };

  const getStatusBadge = (status: LaunchReadinessDimension['status']) => {
    switch (status) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30">
            <CheckCircle2 className="w-2.5 h-2.5" /> READY
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#2684F7]/15 text-[#2684F7] border border-[#2684F7]/30">
            <Clock className="w-2.5 h-2.5" /> IN PROGRESS
          </span>
        );
      case 'needs_input':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFF3E7] text-[#F29A42] border border-[#F29A42]/30">
            <AlertCircle className="w-2.5 h-2.5" /> NEEDS INPUT
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* 1. Launch Readiness & Diagnostic Dimensions */}
      <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-2xl p-4 shadow-xl space-y-3">
        {/* Readiness Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2EAF4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2684F7]/10 border border-[#2684F7]/30 flex items-center justify-center text-[#2684F7]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#60738F] font-bold">
                  Launch Control // Diagnostic Scorecard
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#EEF4FB] text-[#2684F7]">
                  {readiness.completedChecklistCount} OF {readiness.totalChecklistCount} CHECKS
                </span>
              </div>
              <h2 className="text-base font-bold text-[#14213D]">
                Venture Launch Readiness
              </h2>
            </div>
          </div>

          {/* Dynamic Radial Score */}
          <div className="flex items-center gap-3 bg-[#FFFFFF] px-3.5 py-1.5 rounded-xl border border-[#E2EAF4]">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#1A2536]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#19A875] transition-all duration-1000"
                  strokeDasharray={`${readiness.overallPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-mono font-bold text-white">
                {readiness.overallPercentage}%
              </span>
            </div>

            <div>
              <div className="text-[9px] font-mono uppercase text-[#60738F]">Derived Readiness</div>
              <div className="text-xs font-bold text-[#19A875]">{readiness.verdict}</div>
            </div>
          </div>
        </div>

        {/* 6 Dimension Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {readiness.dimensions.map((dim) => {
            const isSelected = selectedDimension === dim.id;

            return (
              <button
                key={dim.id}
                type="button"
                onClick={() => setSelectedDimension(isSelected ? null : dim.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#151E2B] border-[#2684F7] ring-1 ring-[#2684F7]/40 shadow-md'
                    : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-[#384860]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  {getDimensionIcon(dim.id)}
                  {getStatusBadge(dim.status)}
                </div>

                <div className="text-xs font-bold text-[#14213D] font-mono truncate">{dim.name}</div>

                <div className="w-full bg-[#FFFFFF] h-1 rounded-full overflow-hidden my-2">
                  <div
                    className={`h-full rounded-full ${
                      dim.status === 'ready' ? 'bg-[#19A875]' : dim.status === 'in_progress' ? 'bg-[#2684F7]' : 'bg-[#F29A42]'
                    }`}
                    style={{ width: `${(dim.completedCount / dim.totalCount) * 100}%` }}
                  />
                </div>

                <div className="text-[10px] font-mono text-[#60738F] truncate">
                  {dim.completedCount}/{dim.totalCount} Complete
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Dimension Item Inspection */}
        {selectedDimension && (
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-2 animate-fadeIn">
            {(() => {
              const activeDim = readiness.dimensions.find((d) => d.id === selectedDimension);
              if (!activeDim) return null;

              return (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2EAF4]">
                    <div className="flex items-center gap-2">
                      {getDimensionIcon(activeDim.id)}
                      <span className="text-xs font-mono font-bold text-[#14213D] uppercase">
                        {activeDim.name} Diagnostic Verification
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedDimension(null)}
                      className="text-[10px] font-mono text-[#60738F] hover:text-white"
                    >
                      Close [×]
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeDim.items.map((item) => (
                      <div key={item.id} className="px-2.5 py-2 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] space-y-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-[#14213D]">{item.label}</span>
                            {item.isComplete ? (
                              <span className="text-[10px] font-mono text-[#19A875] flex items-center gap-1 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> VERIFIED
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-[#F29A42] flex items-center gap-1 font-bold">
                                <AlertCircle className="w-3 h-3" /> PENDING
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-mono text-[#60738F]">{item.stageSource}</div>
                          <p className="text-[11px] text-[#8495AE] leading-relaxed pt-1">{item.detail}</p>
                        </div>

                        {item.actionPath && !item.isComplete && (
                          <Link
                            to={item.actionPath}
                            className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#2684F7] hover:underline pt-1"
                          >
                            <span>Complete in {item.stageSource}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* 2. Clean Project Synthesis & Launch Dependencies (Blockers + Opportunities ONLY) */}
      <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#E2EAF4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E8F8F1] border border-[#19A875]/30 flex items-center justify-center text-[#19A875]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#60738F] font-bold">
                Synthesis &amp; Evaluation Matrix
              </div>
              <h3 className="text-base font-bold text-[#14213D]">
                Project Synthesis &amp; Launch Dependencies
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#60738F]">
            Evaluated from active project parameters
          </span>
        </div>

        {/* Blockers vs Opportunities 2-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {/* A. Identified Launch Blockers */}
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-2">
            <div className="text-[10px] font-mono uppercase text-[#F29A42] font-bold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Identified Launch Blockers</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#FFF3E7] text-[#F29A42] border border-[#F29A42]/30">
                {synthesis.criticalBlockers.length} Detected
              </span>
            </div>

            {synthesis.criticalBlockers.length === 0 ? (
              <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#19A875]/30 text-xs text-[#19A875] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#19A875] shrink-0" />
                <span>No blocking dependencies detected. Upstream stage outputs are aligned for launch.</span>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[9px] font-mono uppercase text-[#60738F] border-b border-[#E2EAF4]">
                    <th className="py-1 pr-2 font-bold">Issue</th>
                    <th className="py-1 pr-2 font-bold w-16">Severity</th>
                    <th className="py-1 font-bold w-24">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {synthesis.criticalBlockers.map((blk) => (
                    <tr key={blk.id} className="border-b border-[#E2EAF4] last:border-0 align-top">
                      <td className="py-1.5 pr-2">
                        <details className="group">
                          <summary className="text-xs font-bold text-white cursor-pointer list-none hover:text-[#F29A42]">
                            {blk.title}
                          </summary>
                          <p className="text-[11px] text-[#8495AE] leading-snug pt-1">{blk.detail}</p>
                        </details>
                      </td>
                      <td className="py-1.5 pr-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${
                            blk.severity === 'high'
                              ? 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30'
                              : blk.severity === 'medium'
                                ? 'bg-[#2684F7]/10 text-[#8495AE] border-[#E2EAF4]'
                                : 'bg-[#FFFFFF] text-[#60738F] border-[#E2EAF4]'
                          }`}
                        >
                          {blk.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-1.5 text-[10px] font-mono text-[#8495AE]">{blk.resolvingStage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* B. Derived Growth Opportunities */}
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-2">
            <div className="text-[10px] font-mono uppercase text-[#19A875] font-bold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Derived Growth Opportunities</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30">
                {synthesis.strategicOpportunities.length} Available
              </span>
            </div>

            <div className="space-y-1">
              {synthesis.strategicOpportunities.map((opp) => (
                <details key={opp.id} className="px-2.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] group">
                  <summary className="text-xs font-bold text-white cursor-pointer list-none hover:text-[#19A875]">
                    {opp.title}
                  </summary>
                  <p className="text-[11px] text-[#8495AE] leading-snug pt-1">{opp.rationale}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
