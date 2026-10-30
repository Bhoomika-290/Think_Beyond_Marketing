import React, { useState } from 'react';
import { Server } from 'lucide-react';
import type { APIIntegrationMap as APIIntegrationMapType, APIIntegrationItem } from '../../types/project';

interface APIIntegrationMapProps {
  apiIntegrations: APIIntegrationMapType;
}

export const APIIntegrationMap: React.FC<APIIntegrationMapProps> = ({ apiIntegrations }) => {
  const { integrations, totalIntegrationsCount } = apiIntegrations;
  const [selectedIntegration, setSelectedIntegration] = useState<APIIntegrationItem | null>(
    integrations[0] || null
  );

  const getLockInBadge = (risk: string) => {
    if (risk.toLowerCase().includes('high') || risk.toLowerCase().includes('critical')) {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
    if (risk.toLowerCase().includes('medium') || risk.toLowerCase().includes('moderate')) {
      return 'bg-[#FFF3E7] text-amber-400 border-[#F29A42]/30';
    }
    return 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30';
  };

  return (
    <div id="section-integrations" className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 10 — API &amp; External Integration Network
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              {totalIntegrationsCount || integrations.length} INTEGRATIONS
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">
            Visual topology mapping external service dependencies, lock-in vulnerability, and runtime fallbacks.
          </p>
        </div>

        <span className="text-xs font-mono text-[#60738F]">
          Actual dependencies only • Zero placeholder vendors
        </span>
      </div>

      {/* Network Topology Visualizer */}
      <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8495AE] block font-bold">
          INTEGRATION TOPOLOGY &amp; VENDOR BOUNDARIES
        </span>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Central App Node */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 text-center shadow-lg">
            <Server className="w-6 h-6 text-[#2684F7] mx-auto mb-1.5" />
            <span className="text-xs font-mono font-bold text-white block">
              APPLICATION CORE
            </span>
            <span className="text-[10px] font-mono text-blue-300 block mt-0.5">
              Service Orchestration Tier
            </span>
          </div>

          {/* External Integration Nodes */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {integrations.map((item) => {
              const isSelected = selectedIntegration?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIntegration(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-[#151E2B] border-blue-500 ring-2 ring-blue-500/40'
                      : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono text-[#14213D] truncate">
                      {item.serviceName}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase border ${getLockInBadge(item.riskAndLockIn)}`}>
                      {item.provider}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#8495AE] line-clamp-2 block leading-snug mb-2">
                    {item.purpose}
                  </span>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#60738F] pt-1.5 border-t border-[#E2EAF4]">
                    <span>{item.category}</span>
                    <span className="text-[#2684F7]">Inspect →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Vendor Deep-Dive Drawer */}
      {selectedIntegration && (
        <div className="rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#E2EAF4] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#60738F] block">
                INTEGRATION SPECIFICATION
              </span>
              <h3 className="text-sm font-bold text-[#14213D]">
                {selectedIntegration.serviceName} — {selectedIntegration.provider} ({selectedIntegration.category})
              </h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase border ${getLockInBadge(selectedIntegration.riskAndLockIn)}`}>
              Lock-In Risk: {selectedIntegration.riskAndLockIn}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#2684F7] font-bold block">
                Data Exchanged
              </span>
              <p className="text-[#14213D] leading-relaxed">
                {selectedIntegration.dataExchanged}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                Interface &amp; Protocol Spec
              </span>
              <p className="text-[#14213D] leading-relaxed">
                {selectedIntegration.costModel}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#19A875] font-bold block">
                Architectural Fallback
              </span>
              <p className="text-[#14213D] leading-relaxed">
                {selectedIntegration.fallbackStrategy}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
