import React, { useState } from 'react';
import { Users2, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import type { AICouncilSynthesis } from '../../types/project';

interface AICouncilPanelProps {
  synthesis: AICouncilSynthesis;
}

export const AICouncilPanel: React.FC<AICouncilPanelProps> = ({ synthesis }) => {
  const [isDebateExpanded, setIsDebateExpanded] = useState(true);

  return (
    <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2EAF4]">
        <div>
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#14213D]" />
            <h3 className="text-base font-semibold text-[#14213D]">
              AI Strategic Council — Market Deliberation
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#14213D]/15 text-[#14213D] border border-[#14213D]/30">
              Synthesized Multi-Agent
            </span>
          </div>
          <p className="text-xs text-[#60738F] mt-1">
            Internal deliberation between Strategy, Market Intelligence, Growth, Challenger, and Brand specialists, synthesized into decisive founder guidance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDebateExpanded(!isDebateExpanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#EEF4FB] text-xs font-mono text-[#14213D] border border-[#E2EAF4] hover:bg-[#E8E1D3] hover:border-[#14213D]/40 transition-colors self-start sm:self-auto"
        >
          <span>{isDebateExpanded ? 'Hide Specialist Debate' : 'Inspect Council Debate'}</span>
          {isDebateExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Synthesized Founder-Facing Insight (Conclusion, Why, Main Risk, Next Action) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* Council Conclusion */}
        <div className="p-4 rounded-lg bg-[#EEF4FB] border border-[#14213D]/30 space-y-2">
          <div className="flex items-center gap-1.5 text-[#14213D] font-mono text-[11px] font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-[#19A875]" />
            <span>COUNCIL CONCLUSION</span>
          </div>
          <p className="text-xs text-[#14213D] leading-relaxed">
            {synthesis.primaryConsensus}
          </p>
        </div>

        {/* Supporting Reasoning / Why */}
        <div className="p-4 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] space-y-2">
          <div className="flex items-center gap-1.5 text-[#14213D] font-mono text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#14213D]" />
            <span>WHY (STRATEGIC LOGIC)</span>
          </div>
          <p className="text-xs text-[#60738F] leading-relaxed">
            Direct problem-solution fit against legacy inertia. Bypasses mass incumbent overhead by focusing strictly on the verified wedge.
          </p>
        </div>

        {/* Main Risk */}
        <div className="p-4 rounded-lg bg-[#EEF4FB] border border-[#F29A42]/30 space-y-2">
          <div className="flex items-center gap-1.5 text-[#F29A42] font-mono text-[11px] font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>MAIN RISK &amp; UNKNOWNS</span>
          </div>
          <p className="text-xs text-[#60738F] leading-relaxed">
            {synthesis.criticalDivergence}
          </p>
        </div>

        {/* Next Action */}
        <div className="p-4 rounded-lg bg-[#EEF4FB] border border-[#19A875]/30 space-y-2">
          <div className="flex items-center gap-1.5 text-[#19A875] font-mono text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#19A875]" />
            <span>RECOMMENDED NEXT ACTION</span>
          </div>
          <p className="text-xs text-[#14213D] leading-relaxed">
            {synthesis.founderActionRecommendation}
          </p>
        </div>
      </div>

      {/* Expandable Specialist Debate Perspectives */}
      {isDebateExpanded && (
        <div className="pt-3 border-t border-[#E2EAF4] space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono text-[#60738F]">
            <span>Individual Specialist Stances & Caveats:</span>
            <span>6 Council Members Contributing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {synthesis.specialistDebates.map((spec) => (
              <div
                key={spec.role}
                className="p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{spec.badge}</span>
                    <span className="text-xs font-bold text-[#14213D]">{spec.roleName}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#60738F]">
                    {spec.role.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs text-[#14213D] bg-[#EEF4FB] p-2 rounded border border-[#E2EAF4]">
                  <span className="text-[10px] font-mono text-[#14213D] block mb-0.5">
                    STRATEGIC STANCE
                  </span>
                  {spec.keyPerspective}
                </div>

                <div className="text-xs text-[#60738F] bg-[#EEF4FB] p-2 rounded border border-[#E2EAF4]">
                  <span className="text-[10px] font-mono text-[#F29A42] block mb-0.5">
                    CAVEAT / CHALLENGE
                  </span>
                  {spec.challengeOrCaveat}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
