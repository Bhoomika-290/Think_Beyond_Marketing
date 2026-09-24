import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';

import type { ExecutionReport, DistributionChannelItem } from '../../types/project';

interface SalesDistributionViewProps {
  report: ExecutionReport;
}

export const SalesDistributionView: React.FC<SalesDistributionViewProps> = ({ report }) => {
  const { synthesis, modality } = report;
  const { distributionChannels } = synthesis;
  const isPhysical = modality === 'physical' || modality === 'hybrid';

  const pipelineStages = isPhysical
    ? [
        { label: 'MANUFACTURER', sub: 'Finished Production Batch' },
        { label: 'DISTRIBUTOR', sub: 'Regional Stocking Hub' },
        { label: 'WHOLESALE', sub: 'Consolidation & Guilds' },
        { label: 'RETAIL', sub: 'Point of Sale & Boutique' },
        { label: 'CUSTOMER', sub: 'Direct Doorstep Hand-off' },
      ]
    : [
        { label: 'CODEBASE', sub: 'CI/CD Build Artifact' },
        { label: 'CLOUD HOSTING', sub: 'Edge CDN Deployment' },
        { label: 'SELF-SERVE ONBOARDING', sub: 'User Sign-Up & Activation' },
        { label: 'BILLING GATEWAY', sub: 'Card Checkout & Tier Upgrade' },
        { label: 'ACTIVE SUBSCRIBER', sub: 'Recurring Customer Retention' },
      ];

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <span className="text-[11px] font-mono font-bold uppercase text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              WHERE CAN I SELL?
            </span>
            <h2 className="text-base font-bold text-[#1E293B] tracking-tight">
              Sales & Distribution Architecture
            </h2>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            {isPhysical
              ? 'Multi-tier channel mechanics: from factory floor to distributor hubs, retail partners, and customer doorsteps.'
              : 'Digital acquisition pipeline: from codebase deploy to self-serve trial activation and recurring subscription billing.'}
          </p>
        </div>
      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-bold">
            {isPhysical ? 'Physical Distribution Flow (Manufacturer → Distributor → Wholesale → Retail → Customer)' : 'Digital Distribution Flow (Codebase → Cloud Hosting → Self-Serve → Billing → Subscriber)'}
          </div>
          <span className="text-[10px] font-mono text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
            Verified Route
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={stage.label}>
              <div className="w-full sm:flex-1 bg-[#FFFFFF] border border-[#E5DFD5] rounded-lg p-2.5 text-center shadow-2xs">
                <div className="text-[10px] font-mono text-[#1E40AF] font-bold">
                  STAGE 0{idx + 1}
                </div>
                <div className="text-xs font-bold text-[#1E293B] mt-0.5">
                  {stage.label}
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5">
                  {stage.sub}
                </div>
              </div>

              {idx < pipelineStages.length - 1 && (
                <div className="hidden sm:flex text-[#94A3B8]">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Channels Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {distributionChannels.map((channel: DistributionChannelItem) => {
          const isPrimary = channel.status === 'RECOMMENDED_PRIMARY';
          const isSecondary = channel.status === 'EXPANSION_SECONDARY';

          return (
            <div
              key={channel.id}
              className={`rounded-xl p-4 border flex flex-col justify-between transition-colors shadow-2xs ${
                isPrimary
                  ? 'bg-[#FFFFFF] border-[#BFDBFE]'
                  : 'bg-[#FAF8F5] border-[#E5DFD5]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#E8E2D8]">
                  <h3 className="text-sm font-bold text-[#1E293B]">
                    {channel.name}
                  </h3>
                  <span
                    className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded border ${
                      isPrimary
                        ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]'
                        : isSecondary
                        ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'
                        : 'bg-[#F1F5F9] text-[#64748B] border-[#CBD5E1]'
                    }`}
                  >
                    {isPrimary ? 'PRIMARY' : isSecondary ? 'EXPANSION' : 'NOT NOW'}
                  </span>
                </div>

                {/* Partner Profile */}
                <div className="text-xs text-[#334155] font-medium mt-2.5">
                  {channel.partnerProfile}
                </div>

                {/* Margin & Fee */}
                <div className="mt-3 bg-[#FAF8F5] border border-[#E5DFD5] rounded-md p-2 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono uppercase text-[#64748B]">Take / Margin</span>
                  <span className="font-bold text-[#065F46] font-mono">{channel.marginOrFee}</span>
                </div>

                {/* Why it fits */}
                <p className="text-[11px] text-[#64748B] mt-2.5 leading-relaxed">
                  {channel.whyItFits}
                </p>

                {/* Setup Requirements */}
                <div className="mt-3">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] font-semibold block mb-1">
                    Prerequisites
                  </span>
                  <ul className="space-y-1">
                    {channel.setupRequirements.map((req, rIdx) => (
                      <li key={rIdx} className="text-[11px] text-[#475569] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#1E40AF] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Logistics Mechanism */}
              <div className="mt-4 pt-2.5 border-t border-[#E8E2D8] text-[11px] text-[#64748B] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                <span className="truncate">{channel.logisticsMechanism}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
