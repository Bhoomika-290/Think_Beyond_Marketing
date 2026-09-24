import React from 'react';
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';

import type { ExecutionReport, ExecutionPathStage } from '../../types/project';

interface ExecutionOverviewProps {
  report: ExecutionReport;
}

export const ExecutionOverview: React.FC<ExecutionOverviewProps> = ({ report }) => {
  const { synthesis, modality, location } = report;
  const { ventureSummary, pathStages, intelligenceAdvice } = synthesis;

  return (
    <div className="space-y-5">
      {/* 4-Item Compact Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            PROJECT
          </div>
          <div className="text-sm font-semibold text-[#1E293B] mt-1 truncate">
            {ventureSummary.projectName}
          </div>
          <div className="text-[11px] text-[#64748B] mt-0.5">
            Stage 06 Active
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            VENTURE TYPE
          </div>
          <div className="text-sm font-semibold text-[#1E293B] mt-1">
            {ventureSummary.ventureType}
          </div>
          <div className="text-[11px] text-[#1E40AF] mt-0.5 font-mono">
            {modality.toUpperCase()} PATH
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            LOCATION / CLUSTER
          </div>
          <div className="text-sm font-semibold text-[#1E293B] mt-1 truncate">
            {ventureSummary.locationLabel}
          </div>
          <div className="text-[11px] text-[#065F46] mt-0.5 flex items-center gap-1 font-mono">
            <MapPin className="w-3 h-3" />
            {location.cityRegion ? `${location.cityRegion} Zone` : 'National Grid'}
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-4 shadow-xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
            BUILD PATH
          </div>
          <div className="text-sm font-semibold text-[#1E293B] mt-1 truncate">
            {ventureSummary.buildPathSummary}
          </div>
          <div className="text-[11px] text-[#64748B] mt-0.5 font-mono">
            {pathStages.length} sequential phases
          </div>
        </div>
      </div>

      {/* Visual Sequence Flow Diagram */}
      <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#E8E2D8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E293B] font-mono">
              Execution Sequence Flow
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">
            End-to-End Operational Lifecycle
          </span>
        </div>

        {/* Connected Step Cards (Ultra-compact, visual-first, zero explanatory paragraphs) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 relative">
          {pathStages.map((stage: ExecutionPathStage, idx: number) => {
            return (
              <div 
                key={stage.id} 
                className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-3 flex flex-col justify-between relative group hover:border-[#1E40AF]/40 hover:bg-[#FFFFFF] transition-all shadow-2xs"
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-[#E8E2D8]">
                    <span className="text-[10px] font-mono font-bold text-[#1E40AF] bg-[#EFF6FF] px-1.5 py-0.5 rounded border border-[#BFDBFE]">
                      PHASE 0{stage.stageNumber}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#1E40AF]" />
                      {stage.estimatedDays}d
                    </span>
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] mt-2 font-mono">
                    {stage.name}
                  </h3>

                  <span className="inline-block text-[10px] text-[#475569] font-medium bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E5DFD5] mt-1.5 truncate max-w-full">
                    {stage.primaryResourceCategory}
                  </span>
                </div>

                {/* Step Deliverable Pill */}
                <div className="mt-2.5 pt-2 border-t border-[#E8E2D8]">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
                    Deliverable
                  </div>
                  <div className="text-[10px] font-semibold text-[#1E40AF] mt-0.5 line-clamp-2" title={stage.keyDeliverable}>
                    {stage.keyDeliverable}
                  </div>
                </div>

                {/* Arrow connector for desktop */}
                {idx < pathStages.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#CBD5E1] items-center justify-center text-[#64748B] shadow-2xs">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Cluster Intelligence, Procurement Caveats & Risk Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#DCFCE7] text-[#15803D] flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#166534] uppercase tracking-wider font-mono">
              Geographic Cluster Advantage
            </div>
            <p className="text-xs text-[#14532D] mt-1 leading-relaxed">
              {intelligenceAdvice.localAdvantage}
            </p>
          </div>
        </div>

        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#92400E] uppercase tracking-wider font-mono">
              Operational Procurement Caveat
            </div>
            <p className="text-xs text-[#78350F] mt-1 leading-relaxed">
              {intelligenceAdvice.sourcingCaveat}
            </p>
          </div>
        </div>

        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 flex items-start gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#991B1B] uppercase tracking-wider font-mono">
              Critical Execution Risk Factor
            </div>
            <p className="text-xs text-[#7F1D1D] mt-1 leading-relaxed">
              {intelligenceAdvice.criticalRiskFactor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
