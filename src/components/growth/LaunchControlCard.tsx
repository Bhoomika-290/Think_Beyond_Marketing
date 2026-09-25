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
        return <Layers className="w-4 h-4 text-[#A78BFA]" />;
      case 'product':
        return <Package className="w-4 h-4 text-[#38BDF8]" />;
      case 'market':
        return <Users className="w-4 h-4 text-[#4D8DFF]" />;
      case 'experience':
        return <Cpu className="w-4 h-4 text-[#10B981]" />;
      case 'execution':
        return <Settings className="w-4 h-4 text-[#F59E0B]" />;
      case 'growth':
        return <Megaphone className="w-4 h-4 text-[#EC4899]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#4D8DFF]" />;
    }
  };

  const getStatusBadge = (status: LaunchReadinessDimension['status']) => {
    switch (status) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
            <CheckCircle2 className="w-2.5 h-2.5" /> READY
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#4D8DFF]/15 text-[#60A5FA] border border-[#4D8DFF]/30">
            <Clock className="w-2.5 h-2.5" /> IN PROGRESS
          </span>
        );
      case 'needs_input':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30">
            <AlertCircle className="w-2.5 h-2.5" /> NEEDS INPUT
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Launch Readiness & Diagnostic Dimensions */}
      <div className="bg-[#0D121B] border border-[#263244] rounded-2xl p-5 shadow-xl space-y-4">
        {/* Readiness Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1A2536]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 flex items-center justify-center text-[#4D8DFF]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#738095] font-bold">
                  Launch Control // Diagnostic Scorecard
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#1E293B] text-[#4D8DFF]">
                  {readiness.completedChecklistCount} OF {readiness.totalChecklistCount} CHECKS
                </span>
              </div>
              <h2 className="text-base font-bold text-[#F3F4F6]">
                Venture Launch Readiness
              </h2>
            </div>
          </div>

          {/* Dynamic Radial Score */}
          <div className="flex items-center gap-3 bg-[#111823] px-3.5 py-1.5 rounded-xl border border-[#263244]">
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
                  className="text-[#10B981] transition-all duration-1000"
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
              <div className="text-[9px] font-mono uppercase text-[#738095]">Derived Readiness</div>
              <div className="text-xs font-bold text-[#34D399]">{readiness.verdict}</div>
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
                    ? 'bg-[#151E2B] border-[#4D8DFF] ring-1 ring-[#4D8DFF]/40 shadow-md'
                    : 'bg-[#111823] border-[#263244] hover:border-[#384860]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  {getDimensionIcon(dim.id)}
                  {getStatusBadge(dim.status)}
                </div>

                <div className="text-xs font-bold text-[#F3F4F6] font-mono truncate">{dim.name}</div>

                <div className="w-full bg-[#1A2536] h-1 rounded-full overflow-hidden my-2">
                  <div
                    className={`h-full rounded-full ${
                      dim.status === 'ready' ? 'bg-[#10B981]' : dim.status === 'in_progress' ? 'bg-[#4D8DFF]' : 'bg-[#F59E0B]'
                    }`}
                    style={{ width: `${(dim.completedCount / dim.totalCount) * 100}%` }}
                  />
                </div>

                <div className="text-[10px] font-mono text-[#738095] truncate">
                  {dim.completedCount}/{dim.totalCount} Complete
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Dimension Item Inspection */}
        {selectedDimension && (
          <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3 animate-fadeIn">
            {(() => {
              const activeDim = readiness.dimensions.find((d) => d.id === selectedDimension);
              if (!activeDim) return null;

              return (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-[#1A2536]">
                    <div className="flex items-center gap-2">
                      {getDimensionIcon(activeDim.id)}
                      <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
                        {activeDim.name} Diagnostic Verification
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedDimension(null)}
                      className="text-[10px] font-mono text-[#738095] hover:text-white"
                    >
                      Close [×]
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeDim.items.map((item) => (
                      <div key={item.id} className="p-3 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-[#F3F4F6]">{item.label}</span>
                            {item.isComplete ? (
                              <span className="text-[10px] font-mono text-[#10B981] flex items-center gap-1 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> VERIFIED
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-[#F59E0B] flex items-center gap-1 font-bold">
                                <AlertCircle className="w-3 h-3" /> PENDING
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-mono text-[#738095]">{item.stageSource}</div>
                          <p className="text-[11px] text-[#AAB4C3] leading-relaxed pt-1">{item.detail}</p>
                        </div>

                        {item.actionPath && !item.isComplete && (
                          <Link
                            to={item.actionPath}
                            className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#4D8DFF] hover:underline pt-1"
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
      <div className="bg-[#0D121B] border border-[#263244] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1A2536]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#738095] font-bold">
                Synthesis &amp; Evaluation Matrix
              </div>
              <h3 className="text-base font-bold text-[#F3F4F6]">
                Project Synthesis &amp; Launch Dependencies
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#738095]">
            Evaluated from active project parameters
          </span>
        </div>

        {/* Blockers vs Opportunities 2-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* A. Identified Launch Blockers */}
          <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2.5">
            <div className="text-[10px] font-mono uppercase text-[#EF4444] font-bold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Identified Launch Blockers</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/30">
                {synthesis.criticalBlockers.length} Detected
              </span>
            </div>

            {synthesis.criticalBlockers.length === 0 ? (
              <div className="p-3.5 rounded-lg bg-[#0D121B] border border-[#10B981]/30 text-xs text-[#34D399] font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>No blocking dependencies detected. Upstream stage outputs are aligned for launch.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {synthesis.criticalBlockers.map((blk) => (
                  <div key={blk.id} className="p-3 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1">
                    <div className="font-bold text-white text-xs">{blk.title}</div>
                    <div className="text-[11px] text-[#AAB4C3] leading-snug">{blk.detail}</div>
                    <div className="text-[10px] font-mono text-[#38BDF8] pt-1">
                      Resolving Source: <span className="text-white">{blk.resolvingStage}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* B. Derived Growth Opportunities */}
          <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-2.5">
            <div className="text-[10px] font-mono uppercase text-[#10B981] font-bold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Derived Growth Opportunities</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
                {synthesis.strategicOpportunities.length} Available
              </span>
            </div>

            <div className="space-y-2">
              {synthesis.strategicOpportunities.map((opp) => (
                <div key={opp.id} className="p-3 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1">
                  <div className="font-bold text-white text-xs">{opp.title}</div>
                  <div className="text-[11px] text-[#AAB4C3] leading-snug">{opp.rationale}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
