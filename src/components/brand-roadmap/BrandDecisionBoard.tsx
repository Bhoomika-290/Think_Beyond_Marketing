import React from 'react';
import type { BrandDecisionBoardSystem } from '../../types/project';

interface BrandDecisionBoardProps {
  decisions: BrandDecisionBoardSystem;
}

export const BrandDecisionBoard: React.FC<BrandDecisionBoardProps> = ({
  decisions,
}) => {
  return (
    <section className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#14213D] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#14213D]">
              STRATEGIC REALITY AUDIT
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight">
            Brand Decision Board
          </h2>
          <p className="text-xs sm:text-sm text-[#60738F]">
            Four strategic reality check quadrants making certainty and operational unknowns visible.
          </p>
        </div>

        <div className="text-xs font-mono text-[#60738F] bg-[#EEF4FB] px-3 py-1.5 rounded-lg border border-[#E2EAF4]">
          Zero-Fabrication Audit
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrant 1: DECIDED */}
        <div className="p-5 rounded-xl bg-[#EEF4FB] border border-[#19A875]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#19A875] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#19A875]" />
                DECIDED (Locked Brand Baseline)
              </span>
              <span className="text-[10px] font-mono text-[#60738F]">{decisions.decided.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.decided.map((item) => (
                <li key={item.id} className="text-xs text-[#14213D] flex items-start gap-2">
                  <span className="text-[#19A875] mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#60738F] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#19A875]">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 2: NEEDS REVIEW */}
        <div className="p-5 rounded-xl bg-[#EEF4FB] border border-[#14213D]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#14213D] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#14213D]" />
                NEEDS REVIEW (Strategic Refinement)
              </span>
              <span className="text-[10px] font-mono text-[#60738F]">{decisions.needsReview.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.needsReview.map((item) => (
                <li key={item.id} className="text-xs text-[#14213D] flex items-start gap-2">
                  <span className="text-[#14213D] mt-0.5">◆</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#60738F] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#14213D]">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 3: OPEN QUESTION */}
        <div className="p-5 rounded-xl bg-[#EEF4FB] border border-[#F29A42]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#F29A42] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F29A42]" />
                OPEN QUESTION (Unknowns to Resolve)
              </span>
              <span className="text-[10px] font-mono text-[#60738F]">{decisions.openQuestions.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.openQuestions.map((item) => (
                <li key={item.id} className="text-xs text-[#14213D] flex items-start gap-2">
                  <span className="text-[#F29A42] mt-0.5">?</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#60738F] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#F29A42]">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 4: VALIDATION REQUIRED */}
        <div className="p-5 rounded-xl bg-[#EEF4FB] border border-[#9272DB]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#9272DB] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#9272DB]" />
                VALIDATION REQUIRED (Test Commitments)
              </span>
              <span className="text-[10px] font-mono text-[#60738F]">{decisions.validationRequired.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.validationRequired.map((item) => (
                <li key={item.id} className="text-xs text-[#14213D] flex items-start gap-2">
                  <span className="text-[#9272DB] mt-0.5">!</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#60738F] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#9272DB]">• Impact: {item.impact}</span>}
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
