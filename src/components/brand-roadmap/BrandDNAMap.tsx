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

  // Find primary core elements
  const purposeNode = nodes.find((n) => n.id === 'dna_purp' || n.label.toLowerCase().includes('purpose')) || nodes[3];
  const valuesNode = nodes.find((n) => n.id === 'dna_val' || n.label.toLowerCase().includes('value')) || nodes[5];
  const personalityNode = nodes.find((n) => n.id === 'dna_pers' || n.label.toLowerCase().includes('personality') || n.label.toLowerCase().includes('perception')) || nodes[8];
  const promiseNode = nodes.find((n) => n.id === 'dna_prom' || n.label.toLowerCase().includes('promise')) || nodes[4];

  const otherNodes = nodes.filter(
    (n) => n.id !== purposeNode?.id && n.id !== valuesNode?.id && n.id !== personalityNode?.id && n.id !== promiseNode?.id
  );

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2636] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              CORE STRATEGIC ANATOMY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand DNA Relational Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Connected visual architecture mapping how purpose, values, personality, and promise form the gravitational center of your venture.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Click any node to expand rationale</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Brand DNA Connected Diagram (Left 8 cols) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#080B10] border border-[#263244] relative min-h-[460px]">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#263244] stroke-2">
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
                className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-3 shadow-lg ${
                  selectedNodeId === purposeNode.id
                    ? 'bg-[#151E2B] border-blue-500 ring-2 ring-blue-500/40'
                    : 'bg-[#111823] border-[#263244] hover:border-blue-400/50'
                }`}
              >
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono uppercase text-[#738095] block font-bold">
                    PURPOSE (NORTH STAR)
                  </span>
                  <span className="text-xs font-bold text-[#F3F4F6] max-w-[200px] truncate block">
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
                className={`flex-1 max-w-[190px] p-3.5 rounded-2xl border transition-all text-left shadow-lg ${
                  selectedNodeId === valuesNode.id
                    ? 'bg-[#151E2B] border-amber-500 ring-2 ring-amber-500/40'
                    : 'bg-[#111823] border-[#263244] hover:border-amber-400/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <Heart className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#738095] font-bold">
                    CORE VALUES
                  </span>
                </div>
                <span className="text-xs font-bold text-[#F3F4F6] line-clamp-2 block leading-snug">
                  {valuesNode.value}
                </span>
              </button>
            )}

            {/* CENTER NODE: BRAND NUCLEUS */}
            <div className="flex-shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-2xl shadow-blue-500/20 flex items-center justify-center text-center">
              <div className="w-full h-full rounded-full bg-[#080B10] flex flex-col items-center justify-center p-2 border border-blue-400/40">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin-slow mb-0.5" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#738095]">
                  CORE
                </span>
                <span className="text-xs font-black text-white tracking-wider">
                  BRAND DNA
                </span>
              </div>
            </div>

            {/* RIGHT NODE: PERSONALITY */}
            {personalityNode && (
              <button
                type="button"
                onClick={() => setSelectedNodeId(personalityNode.id)}
                className={`flex-1 max-w-[190px] p-3.5 rounded-2xl border transition-all text-left shadow-lg ${
                  selectedNodeId === personalityNode.id
                    ? 'bg-[#151E2B] border-purple-500 ring-2 ring-purple-500/40'
                    : 'bg-[#111823] border-[#263244] hover:border-purple-400/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#738095] font-bold">
                    PERSONALITY
                  </span>
                </div>
                <span className="text-xs font-bold text-[#F3F4F6] line-clamp-2 block leading-snug">
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
                className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-3 shadow-lg ${
                  selectedNodeId === promiseNode.id
                    ? 'bg-[#151E2B] border-emerald-500 ring-2 ring-emerald-500/40'
                    : 'bg-[#111823] border-[#263244] hover:border-emerald-400/50'
                }`}
              >
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono uppercase text-[#738095] block font-bold">
                    BRAND PROMISE
                  </span>
                  <span className="text-xs font-bold text-[#F3F4F6] max-w-[200px] truncate block">
                    {promiseNode.value}
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* Discovery Supporting Vector Pills */}
          <div className="w-full mt-6 pt-4 border-t border-[#1C2636] flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
            <span className="text-[#64748B]">SUPPORTING VECTORS:</span>
            {otherNodes.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNodeId(n.id)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  selectedNodeId === n.id
                    ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                    : 'bg-[#111823] border-[#263244] text-[#AAB4C3] hover:text-[#F3F4F6]'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Node Inspector Drawer (Right 4 cols) */}
        {selectedNode && (
          <div className="lg:col-span-4 bg-[#111823] border border-[#263244] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2636]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#64748B] block">
                  VECTOR DOSSIER
                </span>
                <h3 className="text-sm font-bold text-[#F3F4F6] uppercase">
                  {selectedNode.label}
                </h3>
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${getEvidenceColor(selectedNode.evidenceState)}`}>
                {selectedNode.evidenceState}
              </span>
            </div>

            {/* Core Formulation */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#738095] block">
                STRATEGIC FORMULATION
              </span>
              <p className="text-xs text-[#CBD5E1] bg-[#0B1017] p-3 rounded-xl border border-[#1C2636] leading-relaxed">
                {selectedNode.value}
              </p>
            </div>

            {/* Strategic Meaning */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#738095] block">
                WHAT IT MEANS FOR THE VENTURE
              </span>
              <p className="text-xs text-[#AAB4C3] leading-relaxed">
                {selectedNode.whatItMeans}
              </p>
            </div>

            {/* Concrete Brand & Product Impact */}
            <div className="space-y-1 pt-2 border-t border-[#1C2636]">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">
                HOW IT SHAPES THE PRODUCT &amp; BRAND
              </span>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {selectedNode.howItAffectsBrand}
              </p>
            </div>

            {/* Stage Origin & Provenance Source */}
            <div className="pt-2 border-t border-[#1C2636] flex items-center justify-between text-[10px] font-mono text-[#738095]">
              <span>Stage: {selectedNode.originatingStage}</span>
              <span>Source: {selectedNode.source}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
