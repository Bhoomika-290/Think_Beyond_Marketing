import React from 'react';
import type { RoadmapMilestone } from '../../types/project';

interface BrandRoadmapTimelineProps {
  milestones: RoadmapMilestone[];
}

export const BrandRoadmapTimeline: React.FC<BrandRoadmapTimelineProps> = ({
  milestones,
}) => {
  const getStatusBadge = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'COMPLETE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'READY':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'IN PROGRESS':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'NEEDS VALIDATION':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'BLOCKED':
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              EXECUTION SEQUENCING
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand Execution Roadmap & Milestones
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Eight critical milestones transitioning strategy from positioning into build and market launch.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          Grounded Execution Sequence
        </div>
      </div>

      {/* Visual Timeline Path */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#263244] space-y-6">
        {milestones.map((ms, idx) => {
          return (
            <div key={ms.id} className="relative group">
              {/* Timeline Node Bullet */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  ms.status === 'COMPLETE'
                    ? 'bg-emerald-500 border-emerald-300 text-black text-[9px] font-bold shadow-md shadow-emerald-500/30'
                    : ms.status === 'READY'
                    ? 'bg-[#4D8DFF] border-blue-200 text-black text-[9px] font-bold shadow-md shadow-blue-500/30'
                    : 'bg-[#111823] border-[#263244] text-[#64748B] text-[9px]'
                }`}
              >
                {idx + 1}
              </div>

              {/* Milestone Card */}
              <div className="p-5 rounded-xl bg-[#111823] border border-[#263244] hover:border-[#38BDF8]/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#F3F4F6]">
                      {ms.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      Dep: {ms.dependency}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold self-start sm:self-auto ${getStatusBadge(ms.status)}`}>
                    {ms.status}
                  </span>
                </div>

                <p className="text-xs text-[#AAB4C3] mb-3">
                  <span className="text-[#64748B] font-mono text-[10px] uppercase block mb-0.5">Objective:</span>
                  {ms.objective}
                </p>

                <div className="pt-2 border-t border-[#1C2636] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#64748B]">Next Action:</span>
                  <span className="text-[#4D8DFF] font-medium">{ms.nextAction}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
