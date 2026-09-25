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
        return 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30';
      case 'READY':
        return 'bg-[#5A7A96]/10 text-[#5A7A96] border-[#5A7A96]/30';
      case 'IN PROGRESS':
        return 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30';
      case 'NEEDS VALIDATION':
        return 'bg-[#6C5E8F]/10 text-[#6C5E8F] border-[#6C5E8F]/30';
      case 'BLOCKED':
      default:
        return 'bg-[#9E4A4A]/10 text-[#9E4A4A] border-[#9E4A4A]/30';
    }
  };

  const completedCount = milestones.filter((m) => m.status === 'COMPLETE').length;

  return (
    <section className="rounded-2xl bg-[#FDFCF8] border border-[#DDD5C5] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D3] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2B3D4F] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#2B3D4F]">
              EXECUTION SEQUENCING TIMELINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B3D4F] tracking-tight">
            Brand Execution Roadmap &amp; Milestones
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5E73]">
            Phased strategic timeline translating positioning into build, touchpoint delivery, and launch. Eight critical milestones transitioning strategy into build and market launch.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-mono bg-[#F5F1EB] px-3.5 py-1.5 rounded-lg border border-[#DDD5C5]">
            <span className="text-[#6B7D90]">PROGRESS:</span>
            <span className="text-[#2B3D4F] font-bold">
              {completedCount} / {milestones.length} COMPLETED
            </span>
          </div>
          <div className="text-xs font-mono text-[#6B7D90] bg-[#FDFCF8] px-3 py-1.5 rounded-lg border border-[#DDD5C5]">
            Grounded Execution Sequence
          </div>
        </div>
      </div>

      {/* Horizontal Visual Timeline Line with Nodes (teammate: interactive selector) */}
      <div className="overflow-x-auto pb-4 pt-2 scrollbar-thin">
        <div className="flex items-center justify-between min-w-[780px] relative px-4">
          {/* Background Connecting Rail */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#DDD5C5] rounded pointer-events-none" />

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
                      ? 'bg-[#2B3D4F] border-[#2B3D4F] text-white shadow-md scale-110'
                      : isComplete
                      ? 'bg-[#4A7C59] border-[#4A7C59] text-white font-bold shadow-sm'
                      : 'bg-[#F5F1EB] border-[#DDD5C5] text-[#6B7D90] group-hover:border-[#5A7A96]'
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
                  isSelected ? 'text-[#2B3D4F]' : 'text-[#4A5E73]'
                }`}>
                  {ms.stageName || ms.title.split(' ')[0]}
                </span>

                <span className="text-[9px] font-mono text-[#6B7D90]">
                  {ms.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Timeline Path — all milestones visible (local: exhaustive cards) */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#DDD5C5] space-y-6">
        {milestones.map((ms, idx) => {
          return (
            <div key={ms.id} className="relative group">
              {/* Timeline Node Bullet */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  ms.status === 'COMPLETE'
                    ? 'bg-[#4A7C59] border-[#4A7C59] text-[#F5F1EB] text-[9px] font-bold shadow-sm'
                    : ms.status === 'READY'
                    ? 'bg-[#2B3D4F] border-[#2B3D4F] text-[#F5F1EB] text-[9px] font-bold shadow-sm'
                    : 'bg-[#F5F1EB] border-[#DDD5C5] text-[#6B7D90] text-[9px]'
                }`}
              >
                {idx + 1}
              </div>

              {/* Milestone Card */}
              <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] hover:border-[#5A7A96]/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#2B3D4F]">
                      {ms.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#6B7D90]">
                      Dep: {ms.dependency}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold self-start sm:self-auto ${getStatusBadge(ms.status)}`}>
                    {ms.status}
                  </span>
                </div>

                <p className="text-xs text-[#4A5E73] mb-3">
                  <span className="text-[#6B7D90] font-mono text-[10px] uppercase block mb-0.5">Objective:</span>
                  {ms.objective}
                </p>

                <div className="pt-2 border-t border-[#E8E1D3] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6B7D90]">Next Action:</span>
                  <span className="text-[#2B3D4F] font-medium">{ms.nextAction}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Milestone Inspection Card (teammate: focused dossier for selection) */}
      {selectedMilestone && (
        <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-3 shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-[#E8E1D3] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase text-[#6B7D90] font-semibold">
                  PHASE: {selectedMilestone.stageName}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#2B3D4F]">
                {selectedMilestone.title}
              </h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase border ${getStatusBadge(selectedMilestone.status)}`}>
              {selectedMilestone.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white border border-[#DDD5C5]">
              <span className="text-[10px] font-mono text-[#4A7C59] uppercase font-semibold block mb-0.5">
                Strategic Objective
              </span>
              <p className="text-[#4A5E73] leading-relaxed">
                {selectedMilestone.objective}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#DDD5C5]">
              <span className="text-[10px] font-mono text-[#8A6D2B] uppercase font-semibold block mb-0.5">
                Upstream Dependency
              </span>
              <p className="text-[#4A5E73] leading-relaxed">
                {selectedMilestone.dependency}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#DDD5C5]">
              <span className="text-[10px] font-mono text-[#5A7A96] uppercase font-semibold block mb-0.5">
                Action Directive
              </span>
              <p className="text-[#4A5E73] leading-relaxed">
                {selectedMilestone.nextAction}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
