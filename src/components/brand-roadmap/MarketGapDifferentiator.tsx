import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Edit3, Check } from 'lucide-react';
import type { DifferentiatorCandidate } from '../../types/project';

interface MarketGapDifferentiatorProps {
  candidates: DifferentiatorCandidate[];
  activeDifferentiatorId: string;
  onSelectDifferentiator: (id: string) => void;
  onCustomEditDifferentiator?: (id: string, text: string) => void;
}

export const MarketGapDifferentiator: React.FC<MarketGapDifferentiatorProps> = ({
  candidates,
  activeDifferentiatorId,
  onSelectDifferentiator,
  onCustomEditDifferentiator,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customDiffText, setCustomDiffText] = useState('');
  const [inspectingCandidateId, setInspectingCandidateId] = useState<string | null>(null);

  const activeCandidate = candidates.find((c) => c.id === activeDifferentiatorId) || candidates[0];
  const inspectingCandidate = candidates.find((c) => c.id === inspectingCandidateId);

  const getEvidenceColor = (state: string) => {
    switch (state) {
      case 'VERIFIED':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'INFERRED':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'ASSUMPTION':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'NEEDS VALIDATION':
      default:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const handleStartEdit = (cand: DifferentiatorCandidate) => {
    setEditingId(cand.id);
    setCustomDiffText(cand.differentiator);
  };

  const handleSaveEdit = (candId: string) => {
    if (customDiffText.trim() && onCustomEditDifferentiator) {
      onCustomEditDifferentiator(candId, customDiffText.trim());
    }
    setEditingId(null);
  };

  // Derive metrics for candidates based on validation and clarity
  const getCandidateScores = (cand: DifferentiatorCandidate) => {
    const isVerified = cand.evidenceState === 'VERIFIED';
    const isInferred = cand.evidenceState === 'INFERRED';
    return {
      diffStrength: isVerified ? 94 : isInferred ? 82 : 68,
      customerRelevance: isVerified ? 96 : isInferred ? 88 : 74,
      defensibility: isVerified ? 89 : isInferred ? 79 : 62,
      confidence: isVerified ? 'High' : isInferred ? 'Medium' : 'Needs Validation',
    };
  };

  const activeScores = activeCandidate ? getCandidateScores(activeCandidate) : null;

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2636] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
              STRATEGIC DIFFERENTIATOR ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Causal Differentiation Chain
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Rigorous causal path demonstrating how customer pain and competitor defects directly produce your defensible advantage.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Stage 03 Market Grounded</span>
        </div>
      </div>

      {/* 6-Step Visual Causal Chain Flow */}
      {activeCandidate && (
        <div className="p-6 rounded-2xl bg-[#0D141F] border border-[#263244] shadow-inner space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              6-NODE CAUSAL DIFFERENTIATION PIPELINE
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${getEvidenceColor(activeCandidate.evidenceState)}`}>
              {activeCandidate.evidenceState}
            </span>
          </div>

          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex items-stretch gap-2.5 min-w-[960px]">
              {/* 1. Customer Pain */}
              <div className="flex-1 p-3 rounded-xl bg-[#111823] border border-rose-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-400 block mb-1 uppercase">
                    1. CUSTOMER PAIN
                  </span>
                  <p className="text-xs text-[#CBD5E1] leading-snug">
                    {activeCandidate.customerNeed}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-[#64748B] mt-2 block">Origin: Stage 01/02</span>
              </div>

              <div className="flex items-center text-[#3E4C5F] flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* 2. Market Gap */}
              <div className="flex-1 p-3 rounded-xl bg-[#111823] border border-purple-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-400 block mb-1 uppercase">
                    2. MARKET GAP
                  </span>
                  <p className="text-xs text-purple-200 leading-snug">
                    {activeCandidate.marketGap}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-[#64748B] mt-2 block">Origin: Stage 03 Whitespace</span>
              </div>

              <div className="flex items-center text-[#3E4C5F] flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* 3. Competitor Limitation */}
              <div className="flex-1 p-3 rounded-xl bg-[#111823] border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 block mb-1 uppercase">
                    3. INCUMBENT DEFECT
                  </span>
                  <p className="text-xs text-amber-200 leading-snug">
                    {activeCandidate.competitorPattern}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-[#64748B] mt-2 block">Structural barrier</span>
              </div>

              <div className="flex items-center text-[#3E4C5F] flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* 4. Your Capability */}
              <div className="flex-1 p-3 rounded-xl bg-[#111823] border border-blue-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-400 block mb-1 uppercase">
                    4. CAPABILITY WEDGE
                  </span>
                  <p className="text-xs text-blue-200 leading-snug">
                    {activeCandidate.opportunity}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-[#64748B] mt-2 block">Operational Moat</span>
              </div>

              <div className="flex items-center text-[#3E4C5F] flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* 5. Differentiator */}
              <div className="flex-1 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/50 shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1 uppercase">
                    5. DIFFERENTIATOR ★
                  </span>
                  <p className="text-xs font-bold text-white leading-snug">
                    {activeCandidate.differentiator}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-emerald-400/80 mt-2 block font-semibold">Active Selection</span>
              </div>

              <div className="flex items-center text-[#3E4C5F] flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* 6. Customer Value */}
              <div className="flex-1 p-3 rounded-xl bg-[#111823] border border-cyan-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-1 uppercase">
                    6. CUSTOMER VALUE
                  </span>
                  <p className="text-xs text-cyan-200 leading-snug">
                    {activeCandidate.brandPosition}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-[#64748B] mt-2 block">Value Realized</span>
              </div>
            </div>
          </div>

          {/* Differentiator Strength Scorecard (Horizontal Bars) */}
          {activeScores && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#111823] border border-[#263244] mt-2">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#AAB4C3]">Differentiation Strength</span>
                  <span className="text-emerald-400 font-bold">{activeScores.diffStrength}%</span>
                </div>
                <div className="w-full h-2 bg-[#0B1017] rounded-full overflow-hidden border border-[#263244]">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${activeScores.diffStrength}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#AAB4C3]">Customer Relevance</span>
                  <span className="text-blue-400 font-bold">{activeScores.customerRelevance}%</span>
                </div>
                <div className="w-full h-2 bg-[#0B1017] rounded-full overflow-hidden border border-[#263244]">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: `${activeScores.customerRelevance}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#AAB4C3]">Defensibility</span>
                  <span className="text-purple-400 font-bold">{activeScores.defensibility}%</span>
                </div>
                <div className="w-full h-2 bg-[#0B1017] rounded-full overflow-hidden border border-[#263244]">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: `${activeScores.defensibility}%` }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#AAB4C3]">Evidence Confidence</span>
                  <span className="text-cyan-400 font-bold">{activeScores.confidence}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-[10px] font-mono text-[#738095]">Empirically Grounded</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Candidate Differentiator Wedges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map((cand) => {
          const isSelected = cand.id === activeDifferentiatorId;
          const isEditing = editingId === cand.id;
          const scores = getCandidateScores(cand);

          return (
            <div
              key={cand.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151E2B] border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : 'bg-[#111823] border-[#263244] hover:border-[#38BDF8]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${getEvidenceColor(cand.evidenceState)}`}>
                    {cand.evidenceState}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      ACTIVE MOAT
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-1">
                  Whitespace Anchor
                </div>
                <h3 className="text-xs font-bold text-[#F3F4F6] mb-2 leading-relaxed">
                  {cand.marketGap}
                </h3>

                {/* Score Meters Mini Bar */}
                <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-[#0D141F] border border-[#1C2636] mb-3 text-[10px] font-mono text-[#738095]">
                  <div>
                    <span>Strength:</span> <span className="text-[#F3F4F6] font-bold">{scores.diffStrength}%</span>
                  </div>
                  <div>
                    <span>Relevance:</span> <span className="text-[#F3F4F6] font-bold">{scores.customerRelevance}%</span>
                  </div>
                  <div>
                    <span>Defensible:</span> <span className="text-[#F3F4F6] font-bold">{scores.defensibility}%</span>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2 mt-2">
                    <textarea
                      value={customDiffText}
                      onChange={(e) => setCustomDiffText(e.target.value)}
                      rows={3}
                      className="w-full bg-[#0B1017] p-2 rounded-lg border border-[#4D8DFF] text-xs font-mono text-white focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(cand.id)}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-mono font-bold flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded bg-[#1C2636] text-[#AAB4C3] text-[10px] font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-[#0B1017] border border-[#1C2636] text-xs text-[#CBD5E1] leading-relaxed mb-3">
                    <span className="text-[#4D8DFF] font-mono font-semibold block text-[10px] mb-0.5">
                      YOUR DIFFERENTIATOR:
                    </span>
                    {cand.differentiator}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#1C2636] text-[11px] font-mono">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setInspectingCandidateId(cand.id)}
                    className="text-[#64748B] hover:text-cyan-300 underline transition-colors"
                  >
                    Why this?
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartEdit(cand)}
                    className="text-[#64748B] hover:text-[#AAB4C3] flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Customize</span>
                  </button>
                </div>

                {!isSelected ? (
                  <button
                    type="button"
                    onClick={() => onSelectDifferentiator(cand.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-[#4D8DFF] border border-blue-500/30 font-semibold transition-colors"
                  >
                    Select As Primary
                  </button>
                ) : (
                  <span className="text-emerald-400 font-bold">Selected</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* "Why this?" Rationale Modal (ported from light port, re-themed dark) */}
      {inspectingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#111823] border border-[#263244] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2636] mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#738095]">Strategic Rationale</span>
                <h3 className="text-sm font-bold text-[#F3F4F6]">{inspectingCandidate.differentiator}</h3>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${getEvidenceColor(inspectingCandidate.evidenceState)}`}>
                {inspectingCandidate.evidenceState}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#0B1017] border border-[#1C2636]">
                <span className="text-[10px] font-mono uppercase text-[#738095] block mb-1">Reasoning &amp; Synthesis</span>
                <p className="text-[#CBD5E1] leading-relaxed">{inspectingCandidate.reasoning}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#0B1017] border border-[#1C2636]">
                <span className="text-[10px] font-mono uppercase text-[#738095] block mb-1">Competitor Vulnerability</span>
                <p className="text-[#AAB4C3] leading-relaxed">
                  Competitors rely on {inspectingCandidate.competitorPattern.toLowerCase()}, leaving buyers who demand {inspectingCandidate.customerNeed.toLowerCase()} stranded.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#0B1017] border border-emerald-500/30">
                <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">Brand Advantage</span>
                <p className="text-emerald-300 font-medium leading-relaxed">
                  {inspectingCandidate.brandPosition}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-[#1C2636]">
              <button
                type="button"
                onClick={() => setInspectingCandidateId(null)}
                className="px-4 py-2 rounded-lg bg-[#1C2636] hover:bg-[#263244] text-[#AAB4C3] border border-[#263244] text-xs font-mono"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectDifferentiator(inspectingCandidate.id);
                  setInspectingCandidateId(null);
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold"
              >
                Adopt as Primary Differentiator
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
