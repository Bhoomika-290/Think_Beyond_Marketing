import React, { useState } from 'react';
import { Server, ArrowDown, Zap, Database, Globe, Cpu, ChevronRight, Sparkles } from 'lucide-react';
import type { SystemArchitectureSystem, ArchitectureComponent } from '../../types/project';

interface SystemArchitectureVisualizerProps {
  systemArchitecture: SystemArchitectureSystem;
}

export const SystemArchitectureVisualizer: React.FC<SystemArchitectureVisualizerProps> = ({
  systemArchitecture,
}) => {
  const { pattern, layers, description, primaryRationale } = systemArchitecture;
  const [selectedComponent, setSelectedComponent] = useState<ArchitectureComponent | null>(
    layers[0]?.components[0] || null
  );
  const [activeTierId, setActiveTierId] = useState<string>(layers[0]?.id || '');

  const getTierIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('presentation') || lower.includes('client') || lower.includes('frontend')) {
      return <Globe className="w-4 h-4 text-[#2684F7]" />;
    }
    if (lower.includes('api') || lower.includes('gateway') || lower.includes('ingestion')) {
      return <Zap className="w-4 h-4 text-amber-400" />;
    }
    if (lower.includes('service') || lower.includes('logic') || lower.includes('backend')) {
      return <Cpu className="w-4 h-4 text-purple-400" />;
    }
    if (lower.includes('data') || lower.includes('storage') || lower.includes('persistence')) {
      return <Database className="w-4 h-4 text-[#19A875]" />;
    }
    return <Server className="w-4 h-4 text-cyan-400" />;
  };

  const getComplexityBadge = (c: ArchitectureComponent['complexity']) => {
    switch (c) {
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Medium':
        return 'bg-[#FFF3E7] text-amber-400 border-[#F29A42]/30';
      case 'Low':
        return 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30';
    }
  };

  return (
    <div id="section-architecture" className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 05 — System Architecture Visualizer (Multi-Tier Topology)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              {pattern}
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">{description}</p>
        </div>

        <span className="text-xs font-mono text-[#60738F] bg-[#FFFFFF] px-3 py-1.5 rounded-lg border border-[#E2EAF4]">
          {layers.length} Tiers • {layers.reduce((acc, l) => acc + l.components.length, 0)} Verified Components
        </span>
      </div>

      {/* Rationale Pill */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] flex items-start gap-3">
        <Server className="w-4 h-4 text-[#2684F7] mt-0.5 flex-shrink-0" />
        <div className="text-xs">
          <span className="font-mono font-bold text-[#14213D] block mb-1">
            Primary Architectural Rationale:
          </span>
          <p className="text-[#8495AE] leading-relaxed">{primaryRationale}</p>
        </div>
      </div>

      {/* System Flow Diagram Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Connected Tier Flow (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {/* User Entry Node */}
          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#2684F7]/30 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8F2FF] border border-[#2684F7]/30 flex items-center justify-center">
                <Globe className="w-4 h-4 text-[#2684F7]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#60738F] block">
                  ORIGIN GATEWAY
                </span>
                <span className="text-xs font-bold text-white">
                  END USER (Browser / Mobile / API Client)
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#19A875] bg-[#E8F8F1] px-2 py-0.5 rounded border border-emerald-500/20">
              HTTPS / TLS 1.3
            </span>
          </div>

          <div className="flex justify-center text-[#3E4C5F] -my-1">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Tiers in Pipeline */}
          {layers.map((layer, index) => {
            const isTierActive = activeTierId === layer.id;

            return (
              <React.Fragment key={layer.id}>
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isTierActive
                      ? 'bg-[#FFFFFF] border-blue-500 shadow-md ring-1 ring-blue-500/30'
                      : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 border-b border-[#E2EAF4] pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
                        {getTierIcon(layer.name)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#60738F] block">
                          TIER 0{layer.tierNumber} • {layer.role}
                        </span>
                        <h3 className="text-xs font-bold text-[#14213D] uppercase">
                          {layer.name}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#60738F]">
                      {layer.components.length} Components
                    </span>
                  </div>

                  {/* Components Inside Tier */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {layer.components.map((comp) => {
                      const isCompSelected = selectedComponent?.name === comp.name;

                      return (
                        <div
                          key={`${layer.id}-${comp.name}`}
                          onClick={() => {
                            setSelectedComponent(comp);
                            setActiveTierId(layer.id);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isCompSelected
                              ? 'bg-[#2684F7]/20 border-[#2684F7] shadow-sm text-white'
                              : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-slate-500 text-[#14213D]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold font-mono truncate">
                                {comp.name}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            </div>
                            <span className="text-[10px] font-mono text-blue-300 block truncate">
                              {comp.tech}
                            </span>
                          </div>

                          <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#8495AE]">
                            <span className="truncate">{comp.role}</span>
                            <ChevronRight className="w-3 h-3 text-[#2684F7] flex-shrink-0" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {index < layers.length - 1 && (
                  <div className="flex justify-center text-[#3E4C5F] -my-1">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right: Component Detail Inspection Drawer (4 cols) */}
        {selectedComponent && (
          <div className="lg:col-span-4 rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E2EAF4] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#60738F] block">
                  ARCHITECTURE SPECIFICATION
                </span>
                <h3 className="text-sm font-bold text-[#14213D]">
                  {selectedComponent.name}
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getComplexityBadge(selectedComponent.complexity)}`}>
                {selectedComponent.complexity}
              </span>
            </div>

            {/* Tech Stack Selection */}
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#2684F7] block font-semibold">
                Technology / Framework:
              </span>
              <span className="text-xs font-bold font-mono text-white block">
                {selectedComponent.tech}
              </span>
              <span className="text-[10px] font-mono text-[#60738F] block">
                Role: {selectedComponent.role}
              </span>
            </div>

            {/* Justification */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#60738F] block font-semibold">
                Technical Justification &amp; Grounding
              </span>
              <p className="text-xs text-[#14213D] bg-[#FFFFFF] p-3 rounded-xl border border-[#E2EAF4] leading-relaxed">
                {selectedComponent.justification}
              </p>
            </div>

            {/* Alternatives Considered */}
            {selectedComponent.alternatives && selectedComponent.alternatives.length > 0 && (
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>Alternatives Considered:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedComponent.alternatives.map((alt, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#FFFFFF] text-[10px] font-mono text-[#8495AE] border border-[#E2EAF4]"
                    >
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-[#E2EAF4] flex items-center justify-between text-[10px] font-mono text-[#60738F]">
              <span>Provenance: {selectedComponent.provenance}</span>
              <span className="text-[#19A875]">Validated</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
