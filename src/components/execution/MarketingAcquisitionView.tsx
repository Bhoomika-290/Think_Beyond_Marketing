import React from 'react';
import { 
  Target, 
  MapPin, 
  Globe 
} from 'lucide-react';
import type { ExecutionReport, MarketingAcquisitionChannel } from '../../types/project';

interface MarketingAcquisitionViewProps {
  report: ExecutionReport;
}

export const MarketingAcquisitionView: React.FC<MarketingAcquisitionViewProps> = ({ report }) => {
  const { synthesis, modality, location } = report;
  const { marketingChannels } = synthesis;
  const isPhysical = modality === 'physical' || modality === 'hybrid';

  const localOfflineChannels = marketingChannels.filter(c => c.mediumScope === 'local_offline');
  const digitalChannels = marketingChannels.filter(c => c.mediumScope === 'digital');

  const renderChannelCard = (channel: MarketingAcquisitionChannel) => {
    const isLow = channel.estimatedComplexity === 'Low';
    const isMed = channel.estimatedComplexity === 'Medium';

    return (
      <div
        key={channel.id}
        className={`rounded-xl p-4 border flex flex-col justify-between transition-all hover:border-[#1E40AF]/40 hover:shadow-xs shadow-2xs ${
          channel.isPrimary
            ? 'bg-[#FFFFFF] border-[#BFDBFE]'
            : 'bg-[#FAF8F5] border-[#E5DFD5]'
        }`}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#E8E2D8]">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#64748B] block">
                {channel.category.replace(/_/g, ' ')}
              </span>
              <h4 className="text-xs font-bold text-[#1E293B] mt-0.5 leading-tight">
                {channel.channelName}
              </h4>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {channel.isPrimary && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                  PRIMARY
                </span>
              )}
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                  isLow
                    ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                    : isMed
                    ? 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                    : 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]'
                }`}
              >
                {channel.estimatedComplexity}
              </span>
            </div>
          </div>

          {/* Strategic Fit */}
          <div>
            <div className="text-[9px] font-mono uppercase text-[#64748B]">Fit Rationale</div>
            <p className="text-xs text-[#334155] font-medium mt-0.5 leading-snug">
              {channel.whyItFits}
            </p>
          </div>

          {/* Execution Playbook (Compact) */}
          <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#E5DFD5]">
            <div className="text-[9px] font-mono uppercase text-[#1E40AF] font-bold flex items-center gap-1">
              <Target className="w-3 h-3" />
              <span>Action Playbook</span>
            </div>
            <p className="text-[11px] text-[#475569] mt-1 leading-relaxed">
              {channel.executionPlaybook}
            </p>
          </div>

          {/* Resource Required */}
          <div>
            <div className="text-[9px] font-mono uppercase text-[#64748B]">Resource Required</div>
            <p className="text-[11px] text-[#1E293B] font-mono mt-0.5">
              {channel.resourceRequired}
            </p>
          </div>
        </div>

        {/* Benchmark Footer */}
        <div className="mt-3 pt-2 border-t border-[#E8E2D8] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
          <span className="truncate" title={channel.sourceOrBenchmark}>
            Ref: {channel.sourceOrBenchmark}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <span className="text-[11px] font-mono font-bold uppercase text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              HOW TO REACH CUSTOMERS
            </span>
            <h2 className="text-base font-bold text-[#1E293B] tracking-tight">
              Advertising & Acquisition Execution
            </h2>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Grounded acquisition playbooks separated into local/offline outreach and targeted digital channels. No marketing fluff.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#64748B] self-start sm:self-center">
          {isPhysical ? 'Physical Footprint + Digital Retention' : 'Developer & SaaS Growth Engine'}
        </span>
      </div>

      {/* Two-Column Split: LOCAL / OFFLINE vs DIGITAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: LOCAL / OFFLINE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD5]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#1E293B]">
                LOCAL / OFFLINE CHANNELS
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#64748B] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5DFD5]">
              {location.cityRegion || location.country} Footprint
            </span>
          </div>

          {localOfflineChannels.length > 0 ? (
            <div className="space-y-3">
              {localOfflineChannels.map(channel => renderChannelCard(channel))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[#64748B] bg-[#FAF8F5] rounded-xl border border-[#E5DFD5]">
              No offline retail channels required for pure digital deployment. Focus on targeted digital acquisition.
            </div>
          )}
        </div>

        {/* Column 2: DIGITAL */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD5]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ECFDF5] text-[#065F46] flex items-center justify-center">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#1E293B]">
                DIGITAL CHANNELS
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
              Search • Social • Inbound
            </span>
          </div>

          <div className="space-y-3">
            {digitalChannels.map(channel => renderChannelCard(channel))}
          </div>
        </div>
      </div>
    </div>
  );
};
