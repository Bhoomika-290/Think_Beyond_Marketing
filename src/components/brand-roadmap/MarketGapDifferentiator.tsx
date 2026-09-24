import React, { useState } from 'react';
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
  const [inspectingCandidateId, setInspectingCandidateId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customDiffText, setCustomDiffText] = useState('');

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

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              MARKET GAP → DIFFERENTIATOR ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Competitive Gap & Differentiation Flow
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Transforming observed competitor voids into a defensible brand position and market advantage.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          Connected to Stage 03 Whitespace
        </div>
      </div>

      {/* 4 Core Strategic Questions Banner */}
      {activeCandidate && (
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-[#111823] via-[#151E2B] to-[#111823] border border-blue-500/30 shadow-xl relative overflow-hidden">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] mb-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Strategic Causal Chain (Active Derivation Path)
            </span>
            <span className={`px-2 py-0.5 rounded border text-[10px] ${getEvidenceColor(activeCandidate.evidenceState)}`}>
              {activeCandidate.evidenceState}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Question 1: What are competitors doing? */}
            <div className="p-4 rounded-xl bg-[#0B1017]/90 border border-[#263244]">
              <span className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">
                01 • WHAT ARE COMPETITORS DOING?
              </span>
              <p className="text-xs font-medium text-[#F3F4F6] mt-1.5 leading-relaxed">
                {activeCandidate.competitorPattern}
              </p>
            </div>

            {/* Question 2: What are they missing? */}
            <div className="p-4 rounded-xl bg-[#0B1017]/90 border border-[#263244]">
              <span className="text-[10px] font-mono uppercase text-[#64748B] block font-bold">
                02 • WHAT ARE THEY MISSING?
              </span>
              <p className="text-xs font-medium text-[#F3F4F6] mt-1.5 leading-relaxed">
                {activeCandidate.customerNeed}
              </p>
            </div>

            {/* Question 3: What gap exists? */}
            <div className="p-4 rounded-xl bg-[#0B1017]/90 border border-[#263244]">
              <span className="text-[10px] font-mono uppercase text-[#38BDF8] block font-bold">
                03 • WHAT GAP EXISTS?
              </span>
              <p className="text-xs font-medium text-cyan-200 mt-1.5 leading-relaxed">
                {activeCandidate.marketGap}
              </p>
            </div>

            {/* Question 4: What can MY brand do differently? */}
            <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-500/50 shadow-inner">
              <span className="text-[10px] font-mono uppercase text-[#4D8DFF] block font-bold">
                04 • WHAT CAN MY BRAND DO?
              </span>
              <p className="text-xs font-bold text-white mt-1.5 leading-relaxed">
                {activeCandidate.differentiator}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Differentiator Wedges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map((cand) => {
          const isSelected = cand.id === activeDifferentiatorId;
          const isEditing = editingId === cand.id;

          return (
            <div
              key={cand.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#151E2B] border-[#4D8DFF] shadow-lg shadow-blue-500/10 ring-1 ring-[#4D8DFF]'
                  : 'bg-[#111823] border-[#263244] hover:border-[#38BDF8]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${getEvidenceColor(cand.evidenceState)}`}>
                    {cand.evidenceState}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold text-[#4D8DFF] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                      ★ SELECTED WEDGE
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className="my-2 space-y-2">
                    <textarea
                      rows={2}
                      value={customDiffText}
                      onChange={(e) => setCustomDiffText(e.target.value)}
                      className="w-full p-2 bg-[#080B10] border border-[#4D8DFF] rounded-lg text-xs font-bold text-[#F3F4F6] focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(cand.id)}
                        className="px-2.5 py-1 rounded bg-blue-600 text-white text-[11px] font-mono font-semibold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded bg-[#1C2636] text-[#AAB4C3] text-[11px] font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-sm font-bold text-[#F3F4F6] mb-2 leading-snug">
                    {cand.differentiator}
                  </h3>
                )}

                <p className="text-xs text-[#AAB4C3] mb-3 leading-relaxed">
                  <span className="text-[#64748B] block font-mono text-[10px] uppercase mb-0.5">Exploits Void:</span>
                  {cand.marketGap}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1C2636] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInspectingCandidateId(cand.id)}
                    className="text-xs font-mono text-[#64748B] hover:text-[#4D8DFF] underline transition-colors"
                  >
                    Why this?
                  </button>
                  {onCustomEditDifferentiator && !isEditing && (
                    <button
                      type="button"
                      onClick={() => handleStartEdit(cand)}
                      className="text-xs font-mono text-[#64748B] hover:text-[#F3F4F6] transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectDifferentiator(cand.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white cursor-default shadow-md shadow-blue-500/20'
                      : 'bg-[#1C2636] hover:bg-blue-600/30 text-[#AAB4C3] hover:text-white border border-[#263244]'
                  }`}
                >
                  {isSelected ? 'Active Differentiator' : 'Select Wedge'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* "Why this?" Modal Drawer */}
      {inspectingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#111823] border border-[#263244] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2636] mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#4D8DFF]">Strategic Rationale</span>
                <h3 className="text-sm font-bold text-[#F3F4F6]">{inspectingCandidate.differentiator}</h3>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getEvidenceColor(inspectingCandidate.evidenceState)}`}>
                {inspectingCandidate.evidenceState}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Reasoning & Synthesis</span>
                <p className="text-[#AAB4C3] leading-relaxed">{inspectingCandidate.reasoning}</p>
              </div>

              <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Competitor Vulnerability</span>
                <p className="text-[#AAB4C3] leading-relaxed">
                  Competitors rely on {inspectingCandidate.competitorPattern.toLowerCase()}, leaving buyers who demand {inspectingCandidate.customerNeed.toLowerCase()} stranded.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Brand Advantage</span>
                <p className="text-emerald-300 font-medium leading-relaxed">
                  {inspectingCandidate.brandPosition}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-[#1C2636]">
              <button
                type="button"
                onClick={() => setInspectingCandidateId(null)}
                className="px-4 py-2 rounded-lg bg-[#151E2B] hover:bg-[#1C2636] text-[#AAB4C3] border border-[#263244] text-xs font-mono"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectDifferentiator(inspectingCandidate.id);
                  setInspectingCandidateId(null);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold"
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
