import React from 'react';
import type { BrandDecisionBoardSystem } from '../../types/project';

interface BrandDecisionBoardProps {
  decisions: BrandDecisionBoardSystem;
}

export const BrandDecisionBoard: React.FC<BrandDecisionBoardProps> = ({
  decisions,
}) => {
  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              STRATEGIC REALITY AUDIT
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand Decision Board
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Four strategic reality check quadrants making certainty and operational unknowns visible.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          Zero-Fabrication Audit
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrant 1: DECIDED */}
        <div className="p-5 rounded-xl bg-[#111823] border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                DECIDED (Locked Brand Baseline)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisions.decided.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.decided.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-emerald-400">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 2: NEEDS REVIEW */}
        <div className="p-5 rounded-xl bg-[#111823] border border-blue-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-[#4D8DFF] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4D8DFF]" />
                NEEDS REVIEW (Strategic Refinement)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisions.needsReview.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.needsReview.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">◆</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-blue-300">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 3: OPEN QUESTION */}
        <div className="p-5 rounded-xl bg-[#111823] border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                OPEN QUESTION (Unknowns to Resolve)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisions.openQuestions.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.openQuestions.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">?</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-amber-300">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 4: VALIDATION REQUIRED */}
        <div className="p-5 rounded-xl bg-[#111823] border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1C2636]">
              <span className="text-xs font-mono font-bold uppercase text-purple-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                VALIDATION REQUIRED (Test Commitments)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">{decisions.validationRequired.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.validationRequired.map((item) => (
                <li key={item.id} className="text-xs text-[#F3F4F6] flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">!</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#64748B] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-purple-300">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
