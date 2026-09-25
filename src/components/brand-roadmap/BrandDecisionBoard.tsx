import React from 'react';
import type { BrandDecisionBoardSystem } from '../../types/project';

interface BrandDecisionBoardProps {
  decisions: BrandDecisionBoardSystem;
}

export const BrandDecisionBoard: React.FC<BrandDecisionBoardProps> = ({
  decisions,
}) => {
  return (
    <section className="rounded-2xl bg-[#FDFCF8] border border-[#DDD5C5] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2B3D4F] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#2B3D4F]">
              STRATEGIC REALITY AUDIT
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B3D4F] tracking-tight">
            Brand Decision Board
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5E73]">
            Four strategic reality check quadrants making certainty and operational unknowns visible.
          </p>
        </div>

        <div className="text-xs font-mono text-[#6B7D90] bg-[#F5F1EB] px-3 py-1.5 rounded-lg border border-[#DDD5C5]">
          Zero-Fabrication Audit
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrant 1: DECIDED */}
        <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#4A7C59]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#4A7C59] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4A7C59]" />
                DECIDED (Locked Brand Baseline)
              </span>
              <span className="text-[10px] font-mono text-[#6B7D90]">{decisions.decided.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.decided.map((item) => (
                <li key={item.id} className="text-xs text-[#2B3D4F] flex items-start gap-2">
                  <span className="text-[#4A7C59] mt-0.5">✓</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#6B7D90] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#4A7C59]">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 2: NEEDS REVIEW */}
        <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#2B3D4F]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#2B3D4F] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2B3D4F]" />
                NEEDS REVIEW (Strategic Refinement)
              </span>
              <span className="text-[10px] font-mono text-[#6B7D90]">{decisions.needsReview.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.needsReview.map((item) => (
                <li key={item.id} className="text-xs text-[#2B3D4F] flex items-start gap-2">
                  <span className="text-[#2B3D4F] mt-0.5">◆</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#6B7D90] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#2B3D4F]">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 3: OPEN QUESTION */}
        <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#8A6D2B]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#8A6D2B] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8A6D2B]" />
                OPEN QUESTION (Unknowns to Resolve)
              </span>
              <span className="text-[10px] font-mono text-[#6B7D90]">{decisions.openQuestions.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.openQuestions.map((item) => (
                <li key={item.id} className="text-xs text-[#2B3D4F] flex items-start gap-2">
                  <span className="text-[#8A6D2B] mt-0.5">?</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#6B7D90] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#8A6D2B]">• Impact: {item.impact}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 4: VALIDATION REQUIRED */}
        <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#6C5E8F]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E1D3]">
              <span className="text-xs font-mono font-bold uppercase text-[#6C5E8F] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6C5E8F]" />
                VALIDATION REQUIRED (Test Commitments)
              </span>
              <span className="text-[10px] font-mono text-[#6B7D90]">{decisions.validationRequired.length} Items</span>
            </div>
            <ul className="space-y-3">
              {decisions.validationRequired.map((item) => (
                <li key={item.id} className="text-xs text-[#2B3D4F] flex items-start gap-2">
                  <span className="text-[#6C5E8F] mt-0.5">!</span>
                  <div>
                    <span className="font-medium">{item.statement}</span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#6B7D90] mt-0.5">
                      <span>Source: {item.source}</span>
                      {item.impact && <span className="text-[#6C5E8F]">• Impact: {item.impact}</span>}
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
