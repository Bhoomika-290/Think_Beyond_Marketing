import React, { useState } from 'react';
import { Sparkles, Compass, Award, Heart, Eye } from 'lucide-react';
import type { BrandDNANode } from '../../types/project';

interface BrandDNAMapProps {
  nodes: BrandDNANode[];
}

export const BrandDNAMap: React.FC<BrandDNAMapProps> = ({ nodes }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'dna_purp');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getEvidenceColor = (state: string) => {
    switch (state) {
      case 'VERIFIED':
        return 'text-[#4A7C59] bg-[#4A7C59]/10 border-[#4A7C59]/30';
      case 'USER INPUT':
        return 'text-[#5A7A96] bg-[#5A7A96]/10 border-[#5A7A96]/30';
      case 'AI INFERENCE':
        return 'text-[#6C5E8F] bg-[#6C5E8F]/10 border-[#6C5E8F]/30';
      case 'ASSUMPTION':
        return 'text-[#8A6D2B] bg-[#8A6D2B]/10 border-[#8A6D2B]/30';
      case 'NEEDS VALIDATION':
      default:
        return 'text-[#9E4A4A] bg-[#9E4A4A]/10 border-[#9E4A4A]/30';
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

  // Find primary core elements
  const purposeNode = nodes.find((n) => n.id === 'dna_purp' || n.label.toLowerCase().includes('purpose')) || nodes[3];
  const valuesNode = nodes.find((n) => n.id === 'dna_val' || n.label.toLowerCase().includes('value')) || nodes[5];
  const personalityNode = nodes.find((n) => n.id === 'dna_pers' || n.label.toLowerCase().includes('personality') || n.label.toLowerCase().includes('perception')) || nodes[8];
  const promiseNode = nodes.find((n) => n.id === 'dna_prom' || n.label.toLowerCase().includes('promise')) || nodes[4];

  const otherNodes = nodes.filter(
    (n) => n.id !== purposeNode?.id && n.id !== valuesNode?.id && n.id !== personalityNode?.id && n.id !== promiseNode?.id
  );

  return (
    <section className="rounded-2xl bg-[#FDFCF8] border border-[#DDD5C5] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D3] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2B3D4F] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#2B3D4F]">
              BRAND DNA SYSTEM &bull; CORE STRATEGIC ANATOMY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B3D4F] tracking-tight">
            Brand DNA Relational Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5E73]">
            Connected visual architecture mapping how purpose, values, personality, and promise form the gravitational center of your venture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#6B7D90] bg-[#F5F1EB] px-3 py-1.5 rounded-lg border border-[#DDD5C5]">
            <span className="w-2 h-2 rounded-full bg-[#4A7C59]" />
            <span>Grounded in Stages 01&ndash;03</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#6B7D90] bg-[#F5F1EB] px-3 py-1.5 rounded-lg border border-[#DDD5C5]">
            <span className="w-2 h-2 rounded-full bg-[#4A7C59] animate-pulse" />
            <span>Click any node to expand rationale</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Brand DNA Connected Diagram (Left 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#F5F1EB] border border-[#DDD5C5] relative min-h-[460px]">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#CFC7B4_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none rounded-2xl" />

            {/* SVG Connector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#C9BFA9] stroke-2">
              {/* Top to Center */}
              <line x1="50%" y1="22%" x2="50%" y2="50%" strokeDasharray="4 4" />
              {/* Left to Center */}
              <line x1="22%" y1="50%" x2="50%" y2="50%" strokeDasharray="4 4" />
              {/* Right to Center */}
              <line x1="78%" y1="50%" x2="50%" y2="50%" strokeDasharray="4 4" />
              {/* Bottom to Center */}
              <line x1="50%" y1="78%" x2="50%" y2="50%" strokeDasharray="4 4" />
            </svg>

            {/* TOP NODE: PURPOSE */}
            {purposeNode && (
              <div className="z-10 mb-8 sm:mb-12">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(purposeNode.id)}
                  className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-3 shadow-sm bg-white ${
                    selectedNodeId === purposeNode.id
                      ? 'border-[#2B3D4F] ring-2 ring-[#2B3D4F]/30'
                      : 'border-[#DDD5C5] hover:border-[#2B3D4F]/50'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[#2B3D4F]/10 text-[#2B3D4F]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90] block font-bold">
                      PURPOSE (NORTH STAR)
                    </span>
                    <span className="text-xs font-bold text-[#2B3D4F] max-w-[200px] truncate block">
                      {purposeNode.value}
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* MIDDLE ROW: VALUES — BRAND CORE — PERSONALITY */}
            <div className="z-10 flex items-center justify-between w-full max-w-xl px-2 gap-4">
              {/* LEFT NODE: VALUES */}
              {valuesNode && (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(valuesNode.id)}
                  className={`flex-1 max-w-[190px] p-3.5 rounded-2xl border transition-all text-left shadow-sm bg-white ${
                    selectedNodeId === valuesNode.id
                      ? 'border-[#8A6D2B] ring-2 ring-[#8A6D2B]/30'
                      : 'border-[#DDD5C5] hover:border-[#8A6D2B]/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-[#8A6D2B]/15 text-[#8A6D2B]">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90] font-bold">
                      CORE VALUES
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#2B3D4F] line-clamp-2 block leading-snug">
                    {valuesNode.value}
                  </span>
                </button>
              )}

              {/* CENTER NODE: BRAND NUCLEUS */}
              <div className="flex-shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-[#2B3D4F] via-[#5A7A96] to-[#6C5E8F] p-1 shadow-lg flex items-center justify-center text-center">
                <div className="w-full h-full rounded-full bg-[#FDFCF8] flex flex-col items-center justify-center p-2 border border-[#2B3D4F]/20">
                  <Sparkles className="w-4 h-4 text-[#2B3D4F] mb-0.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B7D90]">
                    CORE
                  </span>
                  <span className="text-xs font-black text-[#2B3D4F] tracking-wider">
                    BRAND DNA
                  </span>
                </div>
              </div>

              {/* RIGHT NODE: PERSONALITY */}
              {personalityNode && (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(personalityNode.id)}
                  className={`flex-1 max-w-[190px] p-3.5 rounded-2xl border transition-all text-left shadow-sm bg-white ${
                    selectedNodeId === personalityNode.id
                      ? 'border-[#6C5E8F] ring-2 ring-[#6C5E8F]/30'
                      : 'border-[#DDD5C5] hover:border-[#6C5E8F]/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-[#6C5E8F]/15 text-[#6C5E8F]">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90] font-bold">
                      PERSONALITY
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#2B3D4F] line-clamp-2 block leading-snug">
                    {personalityNode.value}
                  </span>
                </button>
              )}
            </div>

            {/* BOTTOM NODE: PROMISE */}
            {promiseNode && (
              <div className="z-10 mt-8 sm:mt-12">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(promiseNode.id)}
                  className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-3 shadow-sm bg-white ${
                    selectedNodeId === promiseNode.id
                      ? 'border-[#4A7C59] ring-2 ring-[#4A7C59]/30'
                      : 'border-[#DDD5C5] hover:border-[#4A7C59]/50'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[#4A7C59]/15 text-[#4A7C59]">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90] block font-bold">
                      BRAND PROMISE
                    </span>
                    <span className="text-xs font-bold text-[#2B3D4F] max-w-[200px] truncate block">
                      {promiseNode.value}
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* Discovery Supporting Vector Pills */}
            <div className="w-full mt-6 pt-4 border-t border-[#E8E1D3] flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
              <span className="text-[#6B7D90]">SUPPORTING VECTORS:</span>
              {otherNodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${
                    selectedNodeId === n.id
                      ? 'bg-[#2B3D4F] border-[#2B3D4F] text-white font-bold'
                      : 'bg-white border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F] hover:border-[#2B3D4F]/40'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flow visual connector indicator */}
          <div className="bg-[#F5F1EB] p-3 rounded-xl border border-[#DDD5C5] overflow-x-auto scrollbar-thin text-xs font-mono text-[#4A5E73]">
            <div className="flex items-center min-w-max gap-2">
              <span className="text-[#4A7C59] font-bold">DNA CHAIN:</span>
              <span className="text-[#2B3D4F]">CUSTOMER</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span>PROBLEM</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span>NEED</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span>PURPOSE</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span>PROMISE</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span>VALUE</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span>GAP</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span className="text-[#2B3D4F] font-bold">DIFFERENTIATOR</span>
              <span className="text-[#6B7D90]">&rarr;</span>
              <span className="text-[#5A7A96]">PERCEPTION</span>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector Drawer (Right 4 cols) */}
        {selectedNode && (
          <div className="lg:col-span-4 bg-white border border-[#DDD5C5] rounded-xl p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D3]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#2B3D4F]/10 text-[#2B3D4F]">
                  {getNodeIcon(selectedNode.id)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#6B7D90]">Inspecting DNA Node</span>
                  <h4 className="text-sm font-bold text-[#2B3D4F] uppercase tracking-wide">
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
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90] block mb-1">
                  Active Value
                </span>
                <div className="p-3 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5] text-[#2B3D4F] font-medium leading-relaxed">
                  {selectedNode.value}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#2B3D4F] block mb-1">
                  What It Means
                </span>
                <div className="p-3 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5] text-[#4A5E73] leading-relaxed">
                  {selectedNode.whatItMeans}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4A7C59] block mb-1">
                  How It Affects the Brand
                </span>
                <div className="p-3 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5] text-[#4A7C59]/90 leading-relaxed">
                  {selectedNode.howItAffectsBrand}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90] block mb-1">
                  Strategic Reasoning
                </span>
                <div className="p-3 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5] text-[#4A5E73] leading-relaxed">
                  {selectedNode.reasoning}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E1D3]">
                <div className="p-2.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                  <span className="text-[9px] font-mono uppercase text-[#6B7D90] block">Originating Stage</span>
                  <span className="text-xs font-mono font-bold text-[#2B3D4F] mt-0.5 block">
                    {selectedNode.originatingStage}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                  <span className="text-[9px] font-mono uppercase text-[#6B7D90] block">Information Source</span>
                  <span className="text-xs font-mono text-[#4A5E73] mt-0.5 block truncate" title={selectedNode.source}>
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
