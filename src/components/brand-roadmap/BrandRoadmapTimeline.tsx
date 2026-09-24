import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { RoadmapMilestone } from '../../types/project';

interface BrandRoadmapTimelineProps {
  milestones: RoadmapMilestone[];
}

export const BrandRoadmapTimeline: React.FC<BrandRoadmapTimelineProps> = ({
  milestones,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    milestones[0]?.id || ''
  );

  const selectedMilestone = milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];

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

  const completedCount = milestones.filter((m) => m.status === 'COMPLETE').length;

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2636] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
              EXECUTION SEQUENCING TIMELINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand Execution Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Phased strategic timeline translating positioning into build, touchpoint delivery, and launch.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-[#111823] px-3.5 py-1.5 rounded-lg border border-[#263244]">
          <span className="text-[#64748B]">PROGRESS:</span>
          <span className="text-emerald-400 font-bold">
            {completedCount} / {milestones.length} COMPLETED
          </span>
        </div>
      </div>

      {/* Horizontal Visual Timeline Line with Nodes */}
      <div className="overflow-x-auto pb-4 pt-2 scrollbar-thin">
        <div className="flex items-center justify-between min-w-[780px] relative px-4">
          {/* Background Connecting Rail */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#263244] rounded pointer-events-none" />

          {milestones.map((ms, idx) => {
            const isSelected = ms.id === selectedMilestoneId;
            const isComplete = ms.status === 'COMPLETE';

            return (
              <button
                key={ms.id}
                type="button"
                onClick={() => setSelectedMilestoneId(ms.id)}
                className="relative z-10 flex flex-col items-center group focus:outline-none"
              >
                {/* Timeline Node Dot */}
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-blue-600 border-white text-white shadow-lg shadow-blue-500/30 scale-110'
                      : isComplete
                      ? 'bg-emerald-500 border-emerald-300 text-black font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-[#111823] border-[#38495F] text-[#738095] group-hover:border-slate-400'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                  )}
                </div>

                {/* Milestone Label */}
                <span className={`text-[10px] font-mono font-bold uppercase mt-2 max-w-[90px] text-center truncate ${
                  isSelected ? 'text-white' : 'text-[#AAB4C3]'
                }`}>
                  {ms.stageName || ms.title.split(' ')[0]}
                </span>

                <span className="text-[9px] font-mono text-[#64748B]">
                  {ms.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Inspection Card */}
      {selectedMilestone && (
        <div className="p-5 rounded-xl bg-[#111823] border border-[#263244] space-y-3 shadow-xl">
          <div className="flex items-start justify-between gap-4 border-b border-[#1C2636] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase text-[#738095] font-semibold">
                  PHASE: {selectedMilestone.stageName}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#F3F4F6]">
                {selectedMilestone.title}
              </h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase border ${getStatusBadge(selectedMilestone.status)}`}>
              {selectedMilestone.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#0B1017] border border-[#1C2636]">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold block mb-0.5">
                Strategic Objective
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedMilestone.objective}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0B1017] border border-[#1C2636]">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block mb-0.5">
                Upstream Dependency
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedMilestone.dependency}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0B1017] border border-[#1C2636]">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block mb-0.5">
                Action Directive
              </span>
              <p className="text-[#CBD5E1] leading-relaxed">
                {selectedMilestone.nextAction}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
