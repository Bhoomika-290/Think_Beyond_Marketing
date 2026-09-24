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
      {/* Strategic Direction Cards */}
      <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
                Section 02 — Brand Strategic Decisions & Guardrails
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
                GO-TO-MARKET ANCHORS
              </span>
            </div>
            <p className="text-xs text-[#AAB4C3] mt-1">
              Strategic positioning wedge, differentiation territory, critical milestones, and risk mitigations for {ventureName}.
            </p>
          </div>
          <div className="text-xs font-mono text-[#738095] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
            Pre-Build Alignment
          </div>
        </div>

        {/* 2-Column Grid: Positioning Direction & Differentiation Territory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recommended Positioning Direction */}
          <div className="p-5 rounded-xl bg-[#111823] border border-blue-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 mb-2">
                <Target className="w-4 h-4" />
                RECOMMENDED POSITIONING DIRECTION
              </div>
              <p className="text-sm font-semibold text-[#F3F4F6] leading-relaxed mb-3">
                {strategicDecisions.recommendedPositioningDirection}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1C2635] flex items-center justify-between text-[11px] font-mono text-[#738095]">
              <span>Grounding: Upstream Discovery</span>
              <span className="text-blue-400 font-semibold">Active Wedge</span>
            </div>
          </div>

          {/* Differentiation Territory */}
          <div className="p-5 rounded-xl bg-[#111823] border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-2">
                <Compass className="w-4 h-4" />
                DIFFERENTIATION TERRITORY
              </div>
              <p className="text-sm font-semibold text-[#F3F4F6] leading-relaxed mb-3">
                {strategicDecisions.differentiationTerritory}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1C2635] flex items-center justify-between text-[11px] font-mono text-[#738095]">
              <span>Grounding: Market Whitespace</span>
              <span className="text-emerald-400 font-semibold">Defensible Moat</span>
            </div>
          </div>
        </div>

        {/* Strategic Priorities */}
        <div className="p-5 rounded-xl bg-[#111823] border border-[#263244]">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2635]">
            <span className="text-xs font-mono font-bold uppercase text-[#F3F4F6] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Strategic Priorities & Sequencing
            </span>
            <span className="text-[10px] font-mono text-[#738095]">FOUNDER DIRECTIVES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {strategicDecisions.strategicPriorities.map((priority, pIdx) => (
              <div key={pIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0D141F] border border-[#1C2635]">
                <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  0{pIdx + 1}
                </span>
                <span className="text-xs text-[#E1E7EF] leading-relaxed">{priority}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-[#0A0F17] border border-[#1C2635] text-xs font-mono text-[#AAB4C3] flex items-center gap-2">
            <span className="text-blue-400 font-bold">SEQUENCING:</span>
            <span>{strategicDecisions.sequencingStrategy}</span>
          </div>
        </div>

        {/* Brand Risks & Mitigations Matrix */}
        <div className="p-5 rounded-xl bg-[#111823] border border-amber-500/20">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2635]">
            <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Brand Strategic Risks & Pre-Emptive Mitigations
            </span>
            <span className="text-[10px] font-mono text-amber-400/80">RISK GOVERNANCE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {strategicDecisions.brandRisks.map((riskItem, rIdx) => (
              <div key={rIdx} className="p-3.5 rounded-lg bg-[#0D141F] border border-[#1C2635] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#F3F4F6]">{riskItem.risk}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-bold ${
                        riskItem.severity === 'High'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {riskItem.severity} Risk
                    </span>
                  </div>
                  <p className="text-xs text-[#AAB4C3] mb-3 leading-relaxed">
                    <strong className="text-[#F3F4F6]">Impact:</strong> {riskItem.impact}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#1C2635] text-xs text-emerald-400/90 leading-relaxed font-mono">
                  <span className="text-[#738095] uppercase text-[10px] block">Mitigation:</span>
                  {riskItem.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Quadrant Decision Reality Board */}
      <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#F3F4F6] flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Strategic Reality Quadrants (Zero-Fabrication Audit)
            </h3>
            <p className="text-xs text-[#AAB4C3] mt-0.5">
              Tracks decided baselines, strategic refinements, open questions, and operational blockers.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#738095]">CONTINUOUS VALIDATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quadrant 1: DECIDED */}
          <div className="p-4 rounded-xl bg-[#111823] border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                DECIDED (Locked Brand Baseline)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisionBoard.decided.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.decided.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-emerald-400">• {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quadrant 2: NEEDS REVIEW */}
          <div className="p-4 rounded-xl bg-[#111823] border border-blue-500/30">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-[#4D8DFF] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4D8DFF]" />
                NEEDS REVIEW (Strategic Refinement)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisionBoard.needsReview.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.needsReview.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">◆</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-blue-300">• {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quadrant 3: OPEN QUESTIONS */}
          <div className="p-4 rounded-xl bg-[#111823] border border-amber-500/30">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                OPEN QUESTION (Unknowns to Resolve)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisionBoard.openQuestions.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.openQuestions.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 shrink-0">?</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-amber-300">• {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quadrant 4: VALIDATION REQUIRED */}
          <div className="p-4 rounded-xl bg-[#111823] border border-rose-500/30">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                VALIDATION REQUIRED (Impediments to Launch)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisionBoard.validationRequired.length} Items</span>
            </div>
            <ul className="space-y-2.5">
              {decisionBoard.validationRequired.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5 shrink-0">✕</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-rose-300">• {item.impact}</span>}
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
