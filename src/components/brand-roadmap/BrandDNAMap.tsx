import React, { useState } from 'react';
import type { BrandDNANode } from '../../types/project';

interface BrandDNAMapProps {
  nodes: BrandDNANode[];
}

export const BrandDNAMap: React.FC<BrandDNAMapProps> = ({ nodes }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'dna_cust');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getEvidenceColor = (state: string) => {
    switch (state) {
      case 'VERIFIED':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'USER INPUT':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'AI INFERENCE':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'ASSUMPTION':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'NEEDS VALIDATION':
      default:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'dna_cust':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'dna_prob':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'dna_need':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'dna_purp':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 'dna_prom':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'dna_val':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'dna_gap':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'dna_diff':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'dna_perc':
      default:
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
    }
  };

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              BRAND DNA SYSTEM
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand DNA Synthesis Map
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Connected visual architecture mapping how discovery vectors fuse into brand positioning and purpose.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Grounded in Stages 01–03</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Node Graph (Left 7 or 8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nodes.map((node, idx) => {
              const isSelected = node.id === selectedNodeId;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`relative text-left p-4 rounded-xl border transition-all flex flex-col justify-between min-h-[145px] group ${
                    isSelected
                      ? 'bg-[#151E2B] border-[#4D8DFF] shadow-lg shadow-blue-500/10 ring-1 ring-[#4D8DFF]'
                      : 'bg-[#111823] hover:bg-[#151E2B]/80 border-[#263244] hover:border-[#38BDF8]/40'
                  }`}
                >
                  {/* Top bar of node */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-500/20 text-[#4D8DFF]' : 'bg-[#1C2636] text-[#AAB4C3] group-hover:text-[#F3F4F6]'}`}>
                        {getNodeIcon(node.id)}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                        0{idx + 1}
                      </span>
                    </div>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-medium ${getEvidenceColor(node.evidenceState)}`}>
                      {node.evidenceState}
                    </span>
                  </div>

                  {/* Node Title & Value */}
                  <div>
                    <h3 className="text-xs font-bold text-[#F3F4F6] uppercase tracking-wide group-hover:text-[#4D8DFF] transition-colors">
                      {node.label}
                    </h3>
                    <p className="mt-1 text-xs text-[#AAB4C3] line-clamp-2 leading-relaxed">
                      {node.value}
                    </p>
                  </div>

                  {/* Bottom stage badge */}
                  <div className="mt-2 pt-2 border-t border-[#1C2636] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                    <span>{node.originatingStage}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform text-[#4D8DFF]">
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Flow visual connector indicator */}
          <div className="bg-[#111823] p-3 rounded-xl border border-[#263244] overflow-x-auto scrollbar-thin text-xs font-mono text-[#AAB4C3]">
            <div className="flex items-center min-w-max gap-2">
              <span className="text-emerald-400 font-bold">DNA CHAIN:</span>
              <span className="text-[#F3F4F6]">CUSTOMER</span>
              <span className="text-[#64748B]">→</span>
              <span>PROBLEM</span>
              <span className="text-[#64748B]">→</span>
              <span>NEED</span>
              <span className="text-[#64748B]">→</span>
              <span>PURPOSE</span>
              <span className="text-[#64748B]">→</span>
              <span>PROMISE</span>
              <span className="text-[#64748B]">→</span>
              <span>VALUE</span>
              <span className="text-[#64748B]">→</span>
              <span>GAP</span>
              <span className="text-[#64748B]">→</span>
              <span className="text-[#4D8DFF] font-bold">DIFFERENTIATOR</span>
              <span className="text-[#64748B]">→</span>
              <span className="text-cyan-300">PERCEPTION</span>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector Drawer (Right 4 columns) */}
        {selectedNode && (
          <div className="lg:col-span-4 bg-[#111823] border border-[#263244] rounded-xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2636]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-[#4D8DFF]">
                  {getNodeIcon(selectedNode.id)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B]">Inspecting DNA Node</span>
                  <h4 className="text-sm font-bold text-[#F3F4F6] uppercase tracking-wide">
                    {selectedNode.label}
                  </h4>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${getEvidenceColor(selectedNode.evidenceState)}`}>
                {selectedNode.evidenceState}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                  Active Value
                </span>
                <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244] text-[#F3F4F6] font-medium leading-relaxed">
                  {selectedNode.value}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] block mb-1">
                  What It Means
                </span>
                <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244] text-[#AAB4C3] leading-relaxed">
                  {selectedNode.whatItMeans}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                  How It Affects the Brand
                </span>
                <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244] text-emerald-200/90 leading-relaxed">
                  {selectedNode.howItAffectsBrand}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                  Strategic Reasoning
                </span>
                <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244] text-[#AAB4C3] leading-relaxed">
                  {selectedNode.reasoning}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C2636]">
                <div className="p-2.5 rounded-lg bg-[#0B1017] border border-[#263244]">
                  <span className="text-[9px] font-mono uppercase text-[#64748B] block">Originating Stage</span>
                  <span className="text-xs font-mono font-bold text-[#F3F4F6] mt-0.5 block">
                    {selectedNode.originatingStage}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0B1017] border border-[#263244]">
                  <span className="text-[9px] font-mono uppercase text-[#64748B] block">Information Source</span>
                  <span className="text-xs font-mono text-[#AAB4C3] mt-0.5 block truncate" title={selectedNode.source}>
                    {selectedNode.source}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
