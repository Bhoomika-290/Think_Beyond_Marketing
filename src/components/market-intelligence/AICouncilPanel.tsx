import React, { useState } from 'react';
import { Users2, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import type { AICouncilSynthesis } from '../../types/project';

interface AICouncilPanelProps {
  synthesis: AICouncilSynthesis;
}

export const AICouncilPanel: React.FC<AICouncilPanelProps> = ({ synthesis }) => {
  const [isDebateExpanded, setIsDebateExpanded] = useState(false);

  return (
    <div className="bg-[#0B1017] border border-[#263244] rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#263244]">
        <div>
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#4D8DFF]" />
            <h3 className="text-base font-semibold text-[#F3F4F6]">
              AI Strategic Council — Market Deliberation
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4D8DFF]/15 text-[#4D8DFF] border border-[#4D8DFF]/30">
              Synthesized Multi-Agent
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Internal deliberation between Strategy, Market Intelligence, Growth, Challenger, and Brand specialists, synthesized into decisive founder guidance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsDebateExpanded(!isDebateExpanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151E2B] text-xs font-mono text-[#F3F4F6] border border-[#263244] hover:bg-[#1E293B] hover:border-[#4D8DFF]/40 transition-colors self-start sm:self-auto"
        >
          <span>{isDebateExpanded ? 'Hide Specialist Debate' : 'Inspect Council Debate'}</span>
          {isDebateExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Synthesized Founder-Facing Insight (The default concise view) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {/* Primary Consensus */}
        <div className="p-4 rounded-lg bg-[#111823] border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>PRIMARY CONSENSUS</span>
          </div>
          <p className="text-xs text-[#F3F4F6] leading-relaxed">
            {synthesis.primaryConsensus}
          </p>
        </div>

        {/* Critical Divergence */}
        <div className="p-4 rounded-lg bg-[#111823] border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>CRITICAL DIVERGENCE / CHALLENGE</span>
          </div>
          <p className="text-xs text-[#AAB4C3] leading-relaxed">
            {synthesis.criticalDivergence}
          </p>
        </div>

        {/* Founder Action Recommendation */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#4D8DFF]/30 space-y-2">
          <div className="flex items-center gap-1.5 text-[#4D8DFF] font-mono text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOUNDER ACTION DIRECTIVE</span>
          </div>
          <p className="text-xs text-[#F3F4F6] leading-relaxed">
            {synthesis.founderActionRecommendation}
          </p>
        </div>
      </div>

      {/* Expandable Specialist Debate Perspectives */}
      {isDebateExpanded && (
        <div className="pt-3 border-t border-[#263244] space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
            <span>Individual Specialist Stances & Caveats:</span>
            <span>6 Council Members Contributing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {synthesis.specialistDebates.map((spec) => (
              <div
                key={spec.role}
                className="p-3.5 rounded-lg bg-[#151E2B] border border-[#263244] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{spec.badge}</span>
                    <span className="text-xs font-bold text-[#F3F4F6]">{spec.roleName}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B]">
                    {spec.role.replace('_', ' ')}
                  </span>
                </div>

                <div className="text-xs text-[#F3F4F6] bg-[#0B1017] p-2 rounded border border-[#263244]/60">
                  <span className="text-[10px] font-mono text-[#4D8DFF] block mb-0.5">
                    STRATEGIC STANCE
                  </span>
                  {spec.keyPerspective}
                </div>

                <div className="text-xs text-[#AAB4C3] bg-[#0B1017] p-2 rounded border border-[#263244]/60">
                  <span className="text-[10px] font-mono text-amber-400 block mb-0.5">
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
