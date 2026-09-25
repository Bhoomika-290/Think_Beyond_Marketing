import React from 'react';
import { Target, Compass, ShieldAlert, CheckCircle2, Layers } from 'lucide-react';
import type { BrandStrategicDecisionsData, BrandDecisionBoardSystem } from '../../types/brandRoadmap';

interface BrandStrategicDecisionsProps {
  strategicDecisions: BrandStrategicDecisionsData;
  decisionBoard: BrandDecisionBoardSystem;
  ventureName: string;
}

export const BrandStrategicDecisions: React.FC<BrandStrategicDecisionsProps> = ({
  strategicDecisions,
  decisionBoard,
  ventureName,
}) => {
  return (
    <div id="section-strategic-decisions" className="space-y-6">
      {/* Strategic Direction Container */}
      <div className="rounded-2xl bg-[#0F141C] border border-[#232F42] p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-[#F1F5F9]">
                Section 02 — Brand Strategic Decisions & Guardrails
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-[#38BDF8] border border-blue-500/30">
                GO-TO-MARKET ANCHORS
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">
              Positioning wedge, differentiation moat, sequenced operational priorities, and pre-emptive risk governance for {ventureName}.
            </p>
          </div>
          <div className="text-xs font-mono text-[#38BDF8] bg-[#162132] px-3 py-1.5 rounded-lg border border-[#23354E]">
            Pre-Build Alignment Locked
          </div>
        </div>

        {/* 2-Column Grid: Positioning Direction (Blue) & Differentiation Territory (Green) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recommended Positioning Direction (Indigo/Blue) */}
          <div className="p-5 rounded-xl bg-[#0B1728] border border-[#1E3A5F] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#60A5FA] mb-2.5">
                <Target className="w-4 h-4 text-[#38BDF8]" />
                RECOMMENDED POSITIONING DIRECTION
              </div>
              <p className="text-sm font-semibold text-[#F1F5F9] leading-relaxed mb-3">
                {strategicDecisions.recommendedPositioningDirection}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1E3A5F]/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#94A3B8]">Grounding: Upstream Discovery</span>
              <span className="text-[#38BDF8] font-bold px-2 py-0.5 rounded bg-[#162B48] border border-[#2563EB]/40">Active Wedge</span>
            </div>
          </div>

          {/* Differentiation Territory (Emerald/Green) */}
          <div className="p-5 rounded-xl bg-[#062018] border border-[#065F46] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#34D399] mb-2.5">
                <Compass className="w-4 h-4 text-[#10B981]" />
                DIFFERENTIATION TERRITORY
              </div>
              <p className="text-sm font-semibold text-[#ECFDF5] leading-relaxed mb-3">
                {strategicDecisions.differentiationTerritory}
              </p>
            </div>
            <div className="pt-3 border-t border-[#065F46]/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#94A3B8]">Grounding: Market Whitespace</span>
              <span className="text-[#34D399] font-bold px-2 py-0.5 rounded bg-[#0A3326] border border-[#10B981]/40">Defensible Moat</span>
            </div>
          </div>
        </div>

        {/* Strategic Priorities (Warm Amber Zone) */}
        <div className="p-5 rounded-xl bg-[#1C1408] border border-[#78350F] shadow-md">
          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#78350F]/80">
            <span className="text-xs font-mono font-bold uppercase text-[#FBBF24] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />
              Strategic Priorities & Sequencing
            </span>
            <span className="text-[10px] font-mono text-[#FDE68A] bg-[#451A03] px-2 py-0.5 rounded border border-[#B45309]/50">FOUNDER DIRECTIVES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {strategicDecisions.strategicPriorities.map((priority, pIdx) => (
              <div key={pIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#271A0B] border border-[#92400E]/50">
                <span className="w-5 h-5 rounded-full bg-[#B45309]/30 text-[#FBBF24] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#F59E0B]/40">
                  0{pIdx + 1}
                </span>
                <span className="text-xs text-[#FEF3C7] leading-relaxed">{priority}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-[#271A0B] border border-[#92400E]/50 text-xs font-mono text-[#FDE68A] flex items-center gap-2">
            <span className="text-[#FBBF24] font-bold">SEQUENCING LOGIC:</span>
            <span className="text-[#FEF3C7]">{strategicDecisions.sequencingStrategy}</span>
          </div>
        </div>

        {/* Brand Risks & Mitigations Matrix (Crimson/Red Zone) */}
        <div className="p-5 rounded-xl bg-[#1F0A11] border border-[#881337] shadow-md">
          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#881337]/80">
            <span className="text-xs font-mono font-bold uppercase text-[#FB7185] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#F43F5E]" />
              Brand Strategic Risks & Pre-Emptive Mitigations
            </span>
            <span className="text-[10px] font-mono text-[#FDA4AF] bg-[#4C0519] px-2 py-0.5 rounded border border-[#E11D48]/50">RISK GOVERNANCE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {strategicDecisions.brandRisks.map((riskItem, rIdx) => (
              <div key={rIdx} className="p-3.5 rounded-lg bg-[#2D0F18] border border-[#9F1239]/60 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#FFF1F2]">{riskItem.risk}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-bold ${
                        riskItem.severity === 'High'
                          ? 'bg-[#E11D48]/30 text-[#FDA4AF] border-[#E11D48]/50'
                          : 'bg-[#9F1239]/30 text-[#FECDD3] border-[#9F1239]/40'
                      }`}
                    >
                      {riskItem.severity} Risk
                    </span>
                  </div>
                  <p className="text-xs text-[#FECDD3] mb-3 leading-relaxed">
                    <strong className="text-white">Impact:</strong> {riskItem.impact}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#9F1239]/50 text-xs text-[#34D399] leading-relaxed font-mono">
                  <span className="text-[#94A3B8] uppercase text-[10px] block mb-0.5">Mitigation:</span>
                  {riskItem.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Quadrant Decision Reality Board (Violet/Purple Zone) */}
      <div className="rounded-2xl bg-[#0F141C] border border-[#232F42] p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#F1F5F9] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A855F7]" />
              Strategic Reality Quadrants (Continuous Verification Audit)
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Tracks decided baselines, strategic refinements, open questions, and operational blockers.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#C084FC] bg-[#2E1065] px-2.5 py-1 rounded border border-[#8B5CF6]/40">
            CONTINUOUS VALIDATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quadrant 1: DECIDED (Emerald) */}
          <div className="p-4 rounded-xl bg-[#071F17] border border-[#065F46] shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#065F46]/80">
              <span className="text-xs font-mono font-bold uppercase text-[#34D399] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                DECIDED (Locked Brand Baseline)
              </span>
              <span className="text-[10px] font-mono text-[#A7F3D0]">{decisionBoard.decided.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.decided.map((item) => (
                <li key={item.id} className="text-xs text-[#ECFDF5] flex items-start gap-2">
                  <span className="text-[#10B981] mt-0.5 shrink-0 font-bold">✓</span>
                  <div>
                    <span className="font-medium text-[#F0FDF4]">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#94A3B8] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#34D399]">• {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quadrant 2: NEEDS REVIEW (Blue) */}
          <div className="p-4 rounded-xl bg-[#091B30] border border-[#1E3A8A] shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1E3A8A]/80">
              <span className="text-xs font-mono font-bold uppercase text-[#60A5FA] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                NEEDS REVIEW (Strategic Refinement)
              </span>
              <span className="text-[10px] font-mono text-[#93C5FD]">{decisionBoard.needsReview.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.needsReview.map((item) => (
                <li key={item.id} className="text-xs text-[#EFF6FF] flex items-start gap-2">
                  <span className="text-[#38BDF8] mt-0.5 shrink-0">◆</span>
                  <div>
                    <span className="font-medium text-[#F8FAFC]">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#94A3B8] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#60A5FA]">• {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quadrant 3: OPEN QUESTIONS (Amber) */}
          <div className="p-4 rounded-xl bg-[#201405] border border-[#92400E] shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#92400E]/80">
              <span className="text-xs font-mono font-bold uppercase text-[#FBBF24] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                OPEN QUESTION (Unknowns to Resolve)
              </span>
              <span className="text-[10px] font-mono text-[#FDE68A]">{decisionBoard.openQuestions.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.openQuestions.map((item) => (
                <li key={item.id} className="text-xs text-[#FFFBEB] flex items-start gap-2">
                  <span className="text-[#F59E0B] mt-0.5 shrink-0 font-bold">?</span>
                  <div>
                    <span className="font-medium text-[#FEF3C7]">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#94A3B8] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#FBBF24]">• {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quadrant 4: VALIDATION REQUIRED (Rose/Red) */}
          <div className="p-4 rounded-xl bg-[#240A12] border border-[#9F1239] shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#9F1239]/80">
              <span className="text-xs font-mono font-bold uppercase text-[#FB7185] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                VALIDATION REQUIRED (Impediments to Launch)
              </span>
              <span className="text-[10px] font-mono text-[#FDA4AF]">{decisionBoard.validationRequired.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.validationRequired.map((item) => (
                <li key={item.id} className="text-xs text-[#FFF1F2] flex items-start gap-2">
                  <span className="text-[#E11D48] mt-0.5 shrink-0 font-bold">✕</span>
                  <div>
                    <span className="font-medium text-[#FFE4E6]">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#94A3B8] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#FB7185]">• {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
