import React, { useState } from 'react';
import { Sparkles, Compass, Award, Heart, Eye } from 'lucide-react';
import type { BrandDNANode } from '../../types/project';
import { useProject } from '../../context/ProjectContext';

interface BrandDNAMapProps {
  nodes: BrandDNANode[];
}

export const BrandDNAMap: React.FC<BrandDNAMapProps> = ({ nodes }) => {
  const { state } = useProject();
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'dna_purp');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredDnaAttr, setHoveredDnaAttr] = useState<string | null>('craft');
  const [selectedDnaAttr, setSelectedDnaAttr] = useState<string>('craft');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const hoveredNode = hoveredNodeId ? nodes.find((n) => n.id === hoveredNodeId) : null;

  const getNodeOpacity = (nodeId: string) => {
    if (!hoveredNode) return 'opacity-100';
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return 'opacity-100';
    return node.originatingStage === hoveredNode.originatingStage ? 'opacity-100' : 'opacity-40';
  };

  const connectedNodes = selectedNode
    ? nodes.filter((n) => n.id !== selectedNode.id && n.originatingStage === selectedNode.originatingStage)
    : [];

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
    <section className="rounded-2xl bg-[#090D14] border border-[#1E293B] p-6 lg:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#38BDF8]">
              BRAND DNA SYSTEM &bull; CORE STRATEGIC ANATOMY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F1F5F9] tracking-tight">
            Brand DNA Relational Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Connected visual architecture mapping how purpose, values, personality, and promise form the gravitational center of your venture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Grounded in Stages 01&ndash;03</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>Click any node to inspect relationships</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Brand DNA Connected Diagram (Left 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0B101B] border border-[#1F293D] relative min-h-[480px] shadow-inner overflow-hidden">
            {/* Architectural blueprint dot grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none rounded-2xl" />

            {/* SVG Connector Lines with active illumination */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Top to Center (Purpose) */}
              <line
                x1="50%"
                y1="22%"
                x2="50%"
                y2="50%"
                stroke={selectedNodeId === purposeNode?.id ? '#38BDF8' : '#233044'}
                strokeWidth={selectedNodeId === purposeNode?.id ? '3' : '2'}
                strokeDasharray={selectedNodeId === purposeNode?.id ? 'none' : '4 4'}
                className="transition-colors duration-300"
              />
              {/* Left to Center (Values) */}
              <line
                x1="22%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke={selectedNodeId === valuesNode?.id ? '#10B981' : '#233044'}
                strokeWidth={selectedNodeId === valuesNode?.id ? '3' : '2'}
                strokeDasharray={selectedNodeId === valuesNode?.id ? 'none' : '4 4'}
                className="transition-colors duration-300"
              />
              {/* Right to Center (Personality) */}
              <line
                x1="78%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke={selectedNodeId === personalityNode?.id ? '#8B5CF6' : '#233044'}
                strokeWidth={selectedNodeId === personalityNode?.id ? '3' : '2'}
                strokeDasharray={selectedNodeId === personalityNode?.id ? 'none' : '4 4'}
                className="transition-colors duration-300"
              />
              {/* Bottom to Center (Promise) */}
              <line
                x1="50%"
                y1="78%"
                x2="50%"
                y2="50%"
                stroke={selectedNodeId === promiseNode?.id ? '#F59E0B' : '#233044'}
                strokeWidth={selectedNodeId === promiseNode?.id ? '3' : '2'}
                strokeDasharray={selectedNodeId === promiseNode?.id ? 'none' : '4 4'}
                className="transition-colors duration-300"
              />
            </svg>

            {/* TOP NODE: PURPOSE (Indigo/Blue Zone) */}
            {purposeNode && (
              <div className="z-10 mb-8 sm:mb-12">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(purposeNode.id)}
                  onMouseEnter={() => setHoveredNodeId(purposeNode.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`px-5 py-3.5 rounded-2xl border transition-all flex items-center gap-3 shadow-md bg-[#0B1A2F]/95 ${getNodeOpacity(purposeNode.id)} ${
                    selectedNodeId === purposeNode.id
                      ? 'border-[#38BDF8] ring-2 ring-[#38BDF8]/60 shadow-lg shadow-[#0284C7]/20 scale-105'
                      : 'border-[#1E3A8A] hover:border-[#38BDF8]/60'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[#1E3A8A]/50 text-[#38BDF8] border border-[#38BDF8]/30">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase text-[#60A5FA] block font-bold tracking-wider">
                      PURPOSE (NORTH STAR)
                    </span>
                    <span className="text-xs font-bold text-[#F1F5F9] max-w-[220px] truncate block">
                      {purposeNode.value}
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* MIDDLE ROW: VALUES — BRAND NUCLEUS — PERSONALITY */}
            <div className="z-10 flex items-center justify-between w-full max-w-xl px-2 gap-4">
              {/* LEFT NODE: VALUES (Emerald/Green Zone) */}
              {valuesNode && (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(valuesNode.id)}
                  onMouseEnter={() => setHoveredNodeId(valuesNode.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`flex-1 max-w-[195px] p-4 rounded-2xl border transition-all text-left shadow-md bg-[#062419]/95 ${getNodeOpacity(valuesNode.id)} ${
                    selectedNodeId === valuesNode.id
                      ? 'border-[#10B981] ring-2 ring-[#10B981]/60 shadow-lg shadow-[#059669]/20 scale-105'
                      : 'border-[#065F46] hover:border-[#10B981]/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#065F46]/50 text-[#34D399] border border-[#10B981]/30">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#34D399] font-bold tracking-wider">
                      CORE VALUES
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#ECFDF5] line-clamp-2 block leading-snug">
                    {valuesNode.value}
                  </span>
                </button>
              )}

              {/* CENTER NODE: BRAND NUCLEUS (High-Contrast Intelligence Anchor) */}
              <div className="flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-tr from-[#38BDF8] via-[#8B5CF6] to-[#10B981] p-1 shadow-2xl flex items-center justify-center text-center animate-pulse">
                <div className="w-full h-full rounded-full bg-[#080D16] flex flex-col items-center justify-center p-2.5 border border-[#38BDF8]/40 shadow-inner">
                  <Sparkles className="w-5 h-5 text-[#38BDF8] mb-1" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#94A3B8]">
                    BRAND NUCLEUS
                  </span>
                  <span className="text-xs font-black text-[#F1F5F9] tracking-wider">
                    CORE DNA
                  </span>
                </div>
              </div>

              {/* RIGHT NODE: PERSONALITY (Violet/Purple Zone) */}
              {personalityNode && (
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(personalityNode.id)}
                  onMouseEnter={() => setHoveredNodeId(personalityNode.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`flex-1 max-w-[195px] p-4 rounded-2xl border transition-all text-left shadow-md bg-[#1C112C]/95 ${getNodeOpacity(personalityNode.id)} ${
                    selectedNodeId === personalityNode.id
                      ? 'border-[#8B5CF6] ring-2 ring-[#8B5CF6]/60 shadow-lg shadow-[#7C3AED]/20 scale-105'
                      : 'border-[#6D28D9] hover:border-[#8B5CF6]/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-[#6D28D9]/50 text-[#C084FC] border border-[#8B5CF6]/30">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#C084FC] font-bold tracking-wider">
                      PERSONALITY
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#FAF5FF] line-clamp-2 block leading-snug">
                    {personalityNode.value}
                  </span>
                </button>
              )}
            </div>

            {/* BOTTOM NODE: PROMISE (Warm Amber/Gold Zone) */}
            {promiseNode && (
              <div className="z-10 mt-8 sm:mt-12">
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(promiseNode.id)}
                  onMouseEnter={() => setHoveredNodeId(promiseNode.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`px-5 py-3.5 rounded-2xl border transition-all flex items-center gap-3 shadow-md bg-[#261705]/95 ${getNodeOpacity(promiseNode.id)} ${
                    selectedNodeId === promiseNode.id
                      ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/60 shadow-lg shadow-[#D97706]/20 scale-105'
                      : 'border-[#92400E] hover:border-[#F59E0B]/60'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[#92400E]/50 text-[#FBBF24] border border-[#F59E0B]/30">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase text-[#FBBF24] block font-bold tracking-wider">
                      BRAND PROMISE
                    </span>
                    <span className="text-xs font-bold text-[#FEF3C7] max-w-[220px] truncate block">
                      {promiseNode.value}
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* Discovery Supporting Vector Pills */}
            <div className="w-full mt-6 pt-4 border-t border-[#1E293B] flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
              <span className="text-[#64748B]">SUPPORTING VECTORS:</span>
              {otherNodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedNodeId(n.id)}
                  onMouseEnter={() => setHoveredNodeId(n.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`px-2.5 py-1 rounded-lg border transition-all ${getNodeOpacity(n.id)} ${
                    selectedNodeId === n.id
                      ? 'bg-[#38BDF8] border-[#38BDF8] text-[#0B1320] font-bold shadow-xs'
                      : 'bg-[#111823] border-[#263244] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#38BDF8]/40'
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flow visual connector indicator */}
          <div className="bg-[#111823] p-3 rounded-xl border border-[#263244] overflow-x-auto scrollbar-thin text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center min-w-max gap-2">
              <span className="text-[#10B981] font-bold">DNA CHAIN:</span>
              <span className="text-[#38BDF8]">CUSTOMER</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span>PROBLEM</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span>NEED</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span className="text-[#60A5FA]">PURPOSE</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span className="text-[#FBBF24]">PROMISE</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span className="text-[#34D399]">VALUE</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span>GAP</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span className="text-[#F1F5F9] font-bold">DIFFERENTIATOR</span>
              <span className="text-[#64748B]">&rarr;</span>
              <span className="text-[#C084FC]">PERCEPTION</span>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector Drawer (Right 4 cols) */}
        {selectedNode && (
          <div className="lg:col-span-4 bg-[#111823] border border-[#263244] rounded-xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#1E293B] text-[#38BDF8] border border-[#334155]">
                  {getNodeIcon(selectedNode.id)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B]">Inspecting DNA Node</span>
                  <h4 className="text-sm font-bold text-[#F1F5F9] uppercase tracking-wide">
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

              <div className="pt-2 border-t border-[#E8E1D3]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90] block mb-1.5">
                  Connected to &bull; shares {selectedNode.originatingStage}
                </span>
                {connectedNodes.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {connectedNodes.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => setSelectedNodeId(n.id)}
                        className="px-2.5 py-1 rounded-lg border text-[10px] font-mono bg-white border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F] hover:border-[#2B3D4F]/40 transition-all"
                      >
                        {n.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] font-mono text-[#6B7D90]">
                    No other nodes share this originating stage.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BRAND DNA RELATIONSHIP MATRIX — Interactive relationship system */}
      {(() => {
        interface DNADimensionLink {
          active: boolean;
          tag: string;
          rationale: string;
        }

        interface DNARelationshipRow {
          id: string;
          attribute: string;
          functional: DNADimensionLink;
          emotional: DNADimensionLink;
          cultural: DNADimensionLink;
          brandPromise: string;
          audienceExpectation: string;
          positioning: string;
          toneOfVoice: string;
          underlyingReasoning: string;
        }

        const productType = state?.businessModel?.productType || 'saas';
        const isPhysical = productType === 'physical';
        const targetAudience = state?.idea?.targetAudience || 'discerning customers';

        const DNA_RELATIONSHIP_ROWS: DNARelationshipRow[] = [
          {
            id: 'trust',
            attribute: 'Trust',
            functional: {
              active: true,
              tag: isPhysical ? 'Certified Purity' : 'High Reliability',
              rationale: isPhysical
                ? 'Third-party verified 100% natural wool & certified ethical origin tags.'
                : 'Deterministic data integrity, verifiable uptime SLAs, and strict compliance.',
            },
            emotional: {
              active: true,
              tag: 'Zero Anxiety',
              rationale: isPhysical
                ? 'Reassurance against fabric pilling, cold-air leakage, and premature wear.'
                : 'Reassurance that mission-critical workflows and core operations never fail.',
            },
            cultural: {
              active: false,
              tag: 'Latent',
              rationale: 'Functional integrity and emotional confidence without folklore dependency.',
            },
            brandPromise: isPhysical
              ? 'Lifetime structural garment durability backed by certified origin traceability.'
              : 'Enterprise-grade operational reliability backed by uncompromising architectural discipline.',
            audienceExpectation: isPhysical
              ? 'Unquestioned thermal reliability in varying northern/western microclimates.'
              : `Flawless execution that ${targetAudience} can stake their daily operations on.`,
            positioning: isPhysical
              ? 'The transparent antithesis to opaque fast-fashion polyester outerwear.'
              : 'The robust, trustworthy benchmark outperforming bloated legacy alternatives.',
            toneOfVoice: 'Understated, transparent, factual, free of aggressive sales adjectives.',
            underlyingReasoning: 'Repeat loyalty is won on build integrity. Trust eliminates post-purchase dissonance and bridges premium price tolerance.',
          },
          {
            id: 'craft',
            attribute: 'Craft',
            functional: {
              active: true,
              tag: isPhysical ? 'Thermal Interlock' : 'Ergonomic UX',
              rationale: isPhysical
                ? 'High-gauge interlocking knit engineered for thermal insulation and breathability.'
                : 'Low-latency interaction loops, refined information density, and keyboard-first workflows.',
            },
            emotional: {
              active: true,
              tag: isPhysical ? 'Tactile Pride' : 'Operator Pride',
              rationale: isPhysical
                ? 'Sensory pleasure of wearing hand-finished seams, weighted drape, and natural fibers.'
                : 'The satisfaction of using precision software sculpted for high-leverage work.',
            },
            cultural: {
              active: true,
              tag: isPhysical ? 'Artisan Guild' : 'Engineering Craft',
              rationale: isPhysical
                ? 'Direct continuity with royal regional textile traditions and artisan weaver guilds.'
                : 'A homage to software-as-craft, repudiating throwaway bloated digital experiences.',
            },
            brandPromise: isPhysical
              ? 'Every stitch reflects ancestral regional textile mastery adapted for cosmopolitan utility.'
              : 'Every interaction respects the user’s cognitive flow and time.',
            audienceExpectation: isPhysical
              ? 'Distinctive tactile weight and artisanal finish immediately recognizable from commodity knitwear.'
              : 'Immediate responsiveness and thoughtful design nuance in every screen.',
            positioning: isPhysical
              ? 'Contemporary regional haute craftsmanship delivering luxury house quality at direct pricing.'
              : 'Product-led craft delivering sovereign operational leverage.',
            toneOfVoice: 'Sensory, reverent, articulate about structure and tactile geometry.',
            underlyingReasoning: 'Craft is the ultimate barrier to commoditization. It elevates functional utility into an emotional, defensible advantage.',
          },
          {
            id: 'transparency',
            attribute: 'Transparency',
            functional: {
              active: true,
              tag: isPhysical ? 'Open BOM' : 'Open Pricing & APIs',
              rationale: isPhysical
                ? 'Itemized material costs, supplier locations, and artisan wage premiums published openly.'
                : 'Documented schemas, unencumbered data portability, and predictable tier pricing.',
            },
            emotional: {
              active: false,
              tag: 'Latent',
              rationale: 'Operates as an intellectual and ethical respect trigger rather than pure sentiment.',
            },
            cultural: {
              active: true,
              tag: isPhysical ? 'Fair Trade' : 'Open Standard',
              rationale: isPhysical
                ? 'Direct cooperative economic partnership protecting generational cottage industries.'
                : 'Commitment to customer sovereignty without vendor lock-in traps.',
            },
            brandPromise: isPhysical
              ? '100% provenance clarity on who crafted your garment and under what conditions.'
              : '100% pricing and data clarity without hidden gates or surprise enterprise fees.',
            audienceExpectation: isPhysical
              ? 'Verifiable ethical proof without greenwashing or tokenistic charity marketing.'
              : 'Clear, direct documentation and honest self-serve evaluation.',
            positioning: 'Radical honesty that leaves legacy, opaque competitors defenseless.',
            toneOfVoice: 'Candid, unvarnished, direct, analytical, respectful of founder-customer parity.',
            underlyingReasoning: 'Modern buyers demand ethical validation. Transparent operations create profound moral defensibility and organic advocate resonance.',
          },
          {
            id: 'premium',
            attribute: 'Premium',
            functional: {
              active: false,
              tag: 'Derived',
              rationale: 'Premium status is an emergent property of craft, speed, and reliable architecture.',
            },
            emotional: {
              active: true,
              tag: 'Quiet Poise',
              rationale: 'Understated elegance that signals discerning taste without loud gimmicks.',
            },
            cultural: {
              active: true,
              tag: isPhysical ? 'Desert Royalty' : 'Modern Sovereign',
              rationale: isPhysical
                ? 'Architectural silhouettes inspired by royal Thar winter wraps and regional ceremonial coats.'
                : 'Sophisticated aesthetics for forward-thinking teams operating at the technological frontier.',
            },
            brandPromise: 'Understated excellence that asserts its presence through proportion and purity.',
            audienceExpectation: 'Timeless aesthetic longevity that outlasts rapid seasonal micro-trends.',
            positioning: `Quiet category excellence for ${targetAudience} who value substance over noise.`,
            toneOfVoice: 'Measured, literary, confident, spare, deliberate.',
            underlyingReasoning: 'Sustainable high margins require cultural resonance and aspirational self-identity, not merely baseline utility.',
          },
        ];

        const activeRow =
          DNA_RELATIONSHIP_ROWS.find((r) => r.id === (hoveredDnaAttr || selectedDnaAttr)) ??
          DNA_RELATIONSHIP_ROWS[1];

        return (
          <div className="rounded-xl bg-[#FAF8F5] border border-[#DDD5C5] p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DDD5C5]">
              <div>
                <span className="text-xs font-mono uppercase text-[#7D6536] tracking-wider font-bold">
                  Brand DNA Relationship Matrix
                </span>
                <p className="text-xs text-[#5E6857] mt-0.5">
                  Interactive relationship system mapping core brand DNA across Functional, Emotional, and Cultural dimensions.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#5E6857] px-2.5 py-1 rounded bg-[#EFECE4] border border-[#DDD5C5] self-start sm:self-auto">
                Hover attribute to trace · Click to pin reasoning
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left 7 cols: Interactive Diagram */}
              <div className="lg:col-span-7 space-y-3">
                {/* Column Headers */}
                <div className="grid grid-cols-12 gap-2 text-[11px] font-mono font-bold text-[#5E6857] px-3 pb-1 border-b border-[#DDD5C5]/60">
                  <div className="col-span-3 text-left">DNA ATTRIBUTE</div>
                  <div className="col-span-3 text-center">FUNCTIONAL</div>
                  <div className="col-span-3 text-center">EMOTIONAL</div>
                  <div className="col-span-3 text-center">CULTURAL</div>
                </div>

                {/* Rows with animated connecting lines */}
                <div className="space-y-2">
                  {DNA_RELATIONSHIP_ROWS.map((row) => {
                    const isSelected = selectedDnaAttr === row.id;
                    const isHovered = hoveredDnaAttr === row.id;
                    const isActive = isSelected || isHovered;

                    return (
                      <div
                        key={row.id}
                        onMouseEnter={() => setHoveredDnaAttr(row.id)}
                        onMouseLeave={() => setHoveredDnaAttr(null)}
                        onClick={() => setSelectedDnaAttr(row.id)}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer select-none ${
                          isActive
                            ? 'bg-[#EFECE4] border-[#7D6536] shadow-sm ring-1 ring-[#7D6536]/30'
                            : 'bg-[#F5F2EB]/80 border-[#DDD5C5] hover:border-[#BDB5A2]'
                        }`}
                      >
                        <div className="grid grid-cols-12 gap-2 items-center">
                          {/* Attribute Label */}
                          <div className="col-span-3 flex items-center gap-1.5">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? 'bg-[#7D6536]' : 'bg-[#BDB5A2]'
                              }`}
                            />
                            <span
                              className={`text-xs font-mono font-bold ${
                                isActive ? 'text-[#2C3527]' : 'text-[#5E6857]'
                              }`}
                            >
                              {row.attribute}
                            </span>
                          </div>

                          {/* Functional Node */}
                          <div className="col-span-3 flex items-center justify-center relative">
                            {row.functional.active ? (
                              <div className="flex flex-col items-center group/node">
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                    isActive
                                      ? 'bg-[#2C3527] border-[#2C3527] ring-2 ring-[#2C3527]/20'
                                      : 'bg-[#FAF8F5] border-[#55634B]'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FAF8F5]' : 'bg-[#55634B]'}`} />
                                </div>
                                <span className="text-[9px] font-mono text-[#5E6857] mt-1 whitespace-nowrap">
                                  {row.functional.tag}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[#C4BDB0] text-xs font-mono">—</span>
                            )}
                          </div>

                          {/* Emotional Node */}
                          <div className="col-span-3 flex items-center justify-center relative">
                            {/* Horizontal connector line from functional to emotional if both active */}
                            {row.functional.active && row.emotional.active && (
                              <div
                                className={`absolute left-0 right-1/2 top-[8px] h-0.5 transition-colors ${
                                  isActive ? 'bg-[#7D6536]' : 'bg-[#DDD5C5]'
                                }`}
                              />
                            )}

                            {row.emotional.active ? (
                              <div className="flex flex-col items-center group/node z-10">
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                    isActive
                                      ? 'bg-[#7D6536] border-[#7D6536] ring-2 ring-[#7D6536]/20'
                                      : 'bg-[#FAF8F5] border-[#7D6536]'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FAF8F5]' : 'bg-[#7D6536]'}`} />
                                </div>
                                <span className="text-[9px] font-mono text-[#5E6857] mt-1 whitespace-nowrap">
                                  {row.emotional.tag}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[#C4BDB0] text-xs font-mono">—</span>
                            )}
                          </div>

                          {/* Cultural Node */}
                          <div className="col-span-3 flex items-center justify-center relative">
                            {/* Horizontal connector line from emotional to cultural if both active */}
                            {row.emotional.active && row.cultural.active && (
                              <div
                                className={`absolute left-0 right-1/2 top-[8px] h-0.5 transition-colors ${
                                  isActive ? 'bg-[#55634B]' : 'bg-[#DDD5C5]'
                                }`}
                              />
                            )}

                            {row.cultural.active ? (
                              <div className="flex flex-col items-center group/node z-10">
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                    isActive
                                      ? 'bg-[#55634B] border-[#55634B] ring-2 ring-[#55634B]/20'
                                      : 'bg-[#FAF8F5] border-[#55634B]'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#FAF8F5]' : 'bg-[#55634B]'}`} />
                                </div>
                                <span className="text-[9px] font-mono text-[#5E6857] mt-1 whitespace-nowrap">
                                  {row.cultural.tag}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[#C4BDB0] text-xs font-mono">—</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right 5 cols: Strategic Output HUD */}
              <div className="lg:col-span-5 p-4 rounded-xl bg-[#EFECE4] border border-[#DDD5C5] space-y-3">
                <div className="flex items-center justify-between border-b border-[#DDD5C5] pb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D6536] font-bold">
                    Strategic Resonance // {activeRow.attribute}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD5C5] text-[#2C3527]">
                    Pinned Vector
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#55634B] block font-bold mb-0.5">
                      Brand Promise
                    </span>
                    <p className="text-[#2C3527] text-[11px] font-medium leading-relaxed">
                      "{activeRow.brandPromise}"
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E6857] block font-bold mb-0.5">
                      Audience Expectation
                    </span>
                    <p className="text-[#3A4537] text-[11px] leading-relaxed">
                      {activeRow.audienceExpectation}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#5E6857] block font-bold mb-0.5">
                        Positioning
                      </span>
                      <p className="text-[#3A4537] text-[10px] leading-snug">
                        {activeRow.positioning}
                      </p>
                    </div>

                    <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#7D6536] block font-bold mb-0.5">
                        Tone of Voice
                      </span>
                      <p className="text-[#3A4537] text-[10px] leading-snug">
                        {activeRow.toneOfVoice}
                      </p>
                    </div>
                  </div>

                  {/* Underlying Reasoning */}
                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#7D6536]/30">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7D6536] block font-bold mb-0.5">
                      Underlying Strategic Reasoning
                    </span>
                    <p className="text-[#3A4537] text-[11px] leading-relaxed italic">
                      {activeRow.underlyingReasoning}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};
