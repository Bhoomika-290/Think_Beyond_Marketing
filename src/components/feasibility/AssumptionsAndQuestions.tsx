import React, { useState } from 'react';
import type { FeasibilityAssumption, FeasibilityOpenQuestion } from '../../types/project';
import {
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AssumptionsAndQuestionsProps {
  assumptions: FeasibilityAssumption[];
  openQuestions: FeasibilityOpenQuestion[];
}

export const AssumptionsAndQuestions: React.FC<AssumptionsAndQuestionsProps> = ({
  assumptions,
  openQuestions,
}) => {
  const [expandedAssumptionId, setExpandedAssumptionId] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const toggleAssumption = (id: string) => {
    setExpandedAssumptionId(expandedAssumptionId === id ? null : id);
  };

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* SECTION 04: ASSUMPTION INTELLIGENCE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[#738095] tracking-wider font-semibold">
              Section 04 // Assumption Intelligence Chain
            </div>
            <p className="text-xs text-[#AAB4C3] mt-0.5">
              Structural premises the current assessment assumes. Click to inspect the full validation chain.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#738095]">
            {assumptions.length} Unproven Hypotheses
          </span>
        </div>

        {/* Visual Assumption Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assumptions.map((assump) => {
            const isExpanded = expandedAssumptionId === assump.id;

            return (
              <div
                key={assump.id}
                onClick={() => toggleAssumption(assump.id)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isExpanded
                    ? 'bg-[#151E2B] border-[#4D8DFF] ring-1 ring-[#4D8DFF]/30 shadow-md'
                    : 'bg-[#111823] hover:bg-[#151E2B] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div>
                  {/* Top Bar: Dimension + Impact Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#738095] tracking-wider">
                      {assump.dimension} Dimension
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                        assump.impact === 'critical'
                          ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {assump.impact} impact
                    </span>
                  </div>

                  {/* Assumption Statement */}
                  <h3 className="text-xs font-bold text-[#F3F4F6] leading-snug mb-2">
                    "{assump.statement}"
                  </h3>

                  {/* Visual Chain Header Bar */}
                  <div className="p-2 rounded bg-[#0B1017] border border-[#263244] flex items-center justify-between text-[10px] font-mono text-[#AAB4C3]">
                    <span className="text-[#738095]">Protocol:</span>
                    <span className="text-[#4D8DFF] truncate max-w-[240px]">
                      {assump.validationMethod}
                    </span>
                  </div>
                </div>

                {/* Click cue */}
                <div className="mt-3 pt-2 border-t border-[#263244]/80 flex items-center justify-between text-[10px] font-mono text-[#738095]">
                  <span className="text-[#4D8DFF]">
                    {isExpanded ? 'Hide Validation Chain' : 'View Full Validation Chain'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>

                {/* Expanded Visual Chain */}
                {isExpanded && (
                  <div
                    className="mt-3 pt-3 border-t border-[#263244] space-y-2 text-left animate-fade-in text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Step 1 */}
                    <div className="p-2.5 rounded bg-[#0B1017] border border-[#263244] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block">
                        1. Assumption
                      </span>
                      <p className="text-[#AAB4C3] text-[11px]">{assump.statement}</p>
                    </div>

                    <div className="flex justify-center text-[#738095]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    {/* Step 2 */}
                    <div className="p-2.5 rounded bg-[#0B1017] border border-[#263244] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block">
                        2. Empirical Validation Method
                      </span>
                      <p className="text-[#F3F4F6] text-[11px] font-medium">
                        {assump.validationMethod}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 05: STRATEGIC QUESTIONS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[#738095] tracking-wider font-semibold">
              Section 05 // Strategic Open Questions
            </div>
            <p className="text-xs text-[#AAB4C3] mt-0.5">
              Decisive unknowns that must be answered before capital commitment. Click to reveal strategic rationale.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#738095]">
            {openQuestions.length} Decision Drivers
          </span>
        </div>

        {/* 4 Interactive Question Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {openQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                onClick={() => toggleQuestion(q.id)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isExpanded
                    ? 'bg-[#151E2B] border-[#4D8DFF] ring-1 ring-[#4D8DFF]/30 shadow-md'
                    : 'bg-[#111823] hover:bg-[#151E2B] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div>
                  {/* Top Bar: Dimension + Urgency Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#738095] tracking-wider">
                      {q.dimension}
                    </span>

                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold flex items-center gap-1 ${
                        q.urgency === 'immediate'
                          ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          : q.urgency === 'pre-launch'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          : 'bg-blue-500/15 text-[#4D8DFF] border-blue-500/30'
                      }`}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      {q.urgency}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-xs font-bold text-[#F3F4F6] leading-snug mb-1">
                    {q.question}
                  </h3>
                </div>

                {/* Click cue */}
                <div className="mt-3 pt-2 border-t border-[#263244]/80 flex items-center justify-between text-[10px] font-mono text-[#738095]">
                  <span className="text-[#4D8DFF]">
                    {isExpanded ? 'Hide Strategic Rationale' : 'Inspect Strategic Context'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>

                {/* Expanded Context */}
                {isExpanded && (
                  <div
                    className="mt-3 pt-3 border-t border-[#263244] p-3 rounded-lg bg-[#0B1017] text-left animate-fade-in text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[10px] font-mono uppercase text-[#738095] block mb-1">
                      Why This Determines Viability:
                    </span>
                    <p className="text-[#AAB4C3] text-[11px] leading-relaxed">
                      {q.context}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
