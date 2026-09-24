import React from 'react';
import { 
  Compass, 
  MapPin, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Building2,
  Cpu
} from 'lucide-react';
import type { ExecutionReport } from '../../types/project';

interface ExecutionHeaderProps {
  report: ExecutionReport;
  onRefresh: () => void;
}

export const ExecutionHeader: React.FC<ExecutionHeaderProps> = ({ report, onRefresh }) => {
  const { synthesis, modality, location } = report;
  const { procurementMap, ventureSummary } = synthesis;

  const totalResources = procurementMap.items.length;
  const day1Critical = procurementMap.day1CriticalCount;
  const localCount = procurementMap.localResourceCount;
  const localPercentage = totalResources > 0 ? Math.round((localCount / totalResources) * 100) : 0;
  
  const verifiedCount = procurementMap.items.filter(
    (i) => i.verificationStatus === 'VERIFIED_OFFICIAL' || i.verificationStatus === 'TRADE_DIRECTORY'
  ).length;
  const verificationRate = totalResources > 0 ? Math.round((verifiedCount / totalResources) * 100) : 0;

  const isPhysical = modality === 'physical' || modality === 'hybrid';

  return (
    <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-5 sm:p-6 shadow-sm">
      {/* Top Bar: Stage & Modality */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#F4EFE6] text-[#475569] border border-[#E2DCD2]">
              Stage 06 // Practical Execution
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
              {isPhysical ? <Building2 className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
              {modality.toUpperCase()} VENTURE
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]">
              <MapPin className="w-3 h-3" />
              {location.operatingLocation || location.cityRegion || 'Regional Sourcing'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-2 tracking-tight">
            Resource Procurement & Execution Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-3xl leading-relaxed">
            Real-world supplier pathways, location-aware infrastructure, distribution channels, and 60-day launch roadmap derived from <span className="font-semibold text-[#334155]">{ventureSummary.projectName}</span>.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-[#475569] bg-[#FFFFFF] hover:bg-[#F7F4EE] border border-[#E2DCD2] transition-colors shadow-xs"
            title="Recalculate execution blueprint against updated project inputs"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Recalculate Execution</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
        <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E2D8] flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Total Resources
            </div>
            <div className="text-lg font-bold text-[#1E293B] mt-0.5">
              {totalResources} <span className="text-xs font-normal text-[#64748B]">items</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E2D8] flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#FEF2F2] text-[#B91C1C] flex items-center justify-center shrink-0 border border-[#FEE2E2]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Day 1 Critical
            </div>
            <div className="text-lg font-bold text-[#1E293B] mt-0.5">
              {day1Critical} <span className="text-xs font-normal text-[#64748B]">prerequisites</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E2D8] flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#F0FDF4] text-[#15803D] flex items-center justify-center shrink-0 border border-[#DCFCE7]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Local Sourcing
            </div>
            <div className="text-lg font-bold text-[#1E293B] mt-0.5">
              {localPercentage}% <span className="text-xs font-normal text-[#64748B]">in cluster</span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E8E2D8] flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-[#FAF5FF] text-[#7E22CE] flex items-center justify-center shrink-0 border border-[#F3E8FF]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Verified Provenance
            </div>
            <div className="text-lg font-bold text-[#1E293B] mt-0.5">
              {verificationRate}% <span className="text-xs font-normal text-[#64748B]">official/trade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
