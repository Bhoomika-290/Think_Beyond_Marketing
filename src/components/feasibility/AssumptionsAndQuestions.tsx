import React, { useState } from 'react';
import type {
  FeasibilityAssumption,
  FeasibilityDimensionId,
  FeasibilityDimensionResult,
  FeasibilityOpenQuestion,
} from '../../types/project';
import { ChartEmptyState } from '../common/ChartEmptyState';
import {
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AssumptionsAndQuestionsProps {
  assumptions: FeasibilityAssumption[];
  openQuestions: FeasibilityOpenQuestion[];
  dimensions?: Partial<Record<FeasibilityDimensionId, FeasibilityDimensionResult>>;
}

const EVIDENCE_DOT: Record<string, string> = {
  verified: 'bg-[#4A7C59]',
  'ai-inference': 'bg-[#2B3D4F]',
  assumption: 'bg-[#8A6D2B]',
  'needs-validation': 'bg-[#5A7A96]',
};

// Assumption dependency graph: nodes map to feasibility dimensions so a
// click reveals the assumptions that feed each link. Purely derived — no
// new state, no fabricated edges.
const GRAPH_NODES: { id: string; label: string; dims: FeasibilityDimensionId[] }[] = [
  { id: 'need', label: 'Customer Need', dims: ['customer', 'market'] },
  { id: 'wtp', label: 'Willingness to Pay', dims: ['customer', 'financial'] },
  { id: 'pricing', label: 'Pricing', dims: ['financial', 'business-model'] },
  { id: 'margin', label: 'Gross Margin', dims: ['financial'] },
  { id: 'distribution', label: 'Distribution', dims: ['operational', 'location'] },
  { id: 'viability', label: 'Viability', dims: ['execution', 'market', 'competitive'] },
];

export const AssumptionsAndQuestions: React.FC<AssumptionsAndQuestionsProps> = ({
  assumptions,
  openQuestions,
  dimensions = {},
}) => {
  const [expandedAssumptionId, setExpandedAssumptionId] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [activeGraphNodeId, setActiveGraphNodeId] = useState<string | null>(null);

  const toggleAssumption = (id: string) => {
    setExpandedAssumptionId(expandedAssumptionId === id ? null : id);
  };

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  const activeGraphNode = GRAPH_NODES.find((n) => n.id === activeGraphNodeId) ?? null;
  const graphLinkedAssumptions = activeGraphNode
    ? assumptions.filter((a) => activeGraphNode.dims.includes(a.dimension))
    : [];

  const dimensionOf = (dim: FeasibilityDimensionId) => dimensions[dim];

  return (
    <div className="space-y-6">
      {/* SECTION 04: ASSUMPTION INTELLIGENCE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[#6B7D90] tracking-wider font-semibold">
              Section 04 // Assumption Intelligence Chain
            </div>
            <p className="text-xs text-[#4A5E73] mt-0.5">
              Structural premises the current assessment assumes. Click to inspect the full validation chain.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#6B7D90]">
            {assumptions.length} Unproven Hypotheses
          </span>
        </div>

        {/* Visual Assumption Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assumptions.map((assump) => {
            const isExpanded = expandedAssumptionId === assump.id;
            const linkedDim = dimensionOf(assump.dimension);

            return (
              <div
                key={assump.id}
                onClick={() => toggleAssumption(assump.id)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isExpanded
                    ? 'bg-[#ECE6DA] border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30 shadow-md'
                    : 'bg-[#FDFCF8] hover:bg-[#ECE6DA] border-[#DDD5C5] hover:border-[#C4B8A0]'
                }`}
              >
                <div>
                  {/* Top Bar: Dimension + Impact Tag + Status */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90] tracking-wider">
                      {assump.dimension} Dimension
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30">
                        Unproven
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                          assump.impact === 'critical'
                            ? 'bg-[#9E4A4A]/15 text-[#9E4A4A] border-[#9E4A4A]/30'
                            : 'bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30'
                        }`}
                      >
                        {assump.impact} impact
                      </span>
                    </div>
                  </div>

                  {/* Assumption Statement */}
                  <h3 className="text-xs font-bold text-[#2B3D4F] leading-snug mb-2">
                    "{assump.statement}"
                  </h3>

                  {/* Chain Preview Bar */}
                  <div className="p-2 rounded bg-[#F5F1EB] border border-[#DDD5C5] flex items-center justify-between text-[10px] font-mono text-[#4A5E73]">
                    <span className="text-[#6B7D90]">Evidence → Test → Decision</span>
                    <span className="text-[#2B3D4F] truncate max-w-[240px]">
                      {linkedDim ? `${linkedDim.evidence.length} signals · ${linkedDim.confidence} confidence` : 'No linked evidence yet'}
                    </span>
                  </div>
                </div>

                {/* Click cue */}
                <div className="mt-3 pt-2 border-t border-[#DDD5C5]/80 flex items-center justify-between text-[10px] font-mono text-[#6B7D90]">
                  <span className="text-[#2B3D4F]">
                    {isExpanded ? 'Hide Validation Chain' : 'View Full Validation Chain'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>

                {/* Expanded Validation Pipeline */}
                {isExpanded && (
                  <div
                    className="mt-3 pt-3 border-t border-[#DDD5C5] space-y-2 text-left animate-fade-in text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#8A6D2B] font-semibold block">
                        1. Assumption
                      </span>
                      <p className="text-[#4A5E73] text-[11px]">{assump.statement}</p>
                    </div>

                    <div className="flex justify-center text-[#6B7D90]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#2B3D4F] font-semibold block">
                        2. Why it matters
                      </span>
                      <p className="text-[#4A5E73] text-[11px]">
                        {linkedDim
                          ? linkedDim.headline
                          : 'Linked dimension assessment is not available yet.'}
                      </p>
                    </div>

                    <div className="flex justify-center text-[#6B7D90]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#4A7C59] font-semibold block">
                        3. Current evidence · Confidence: {linkedDim ? linkedDim.confidence.toUpperCase() : 'UNKNOWN'}
                      </span>
                      {linkedDim && linkedDim.evidence.length > 0 ? (
                        <ul className="space-y-1">
                          {linkedDim.evidence.map((ev) => (
                            <li key={ev.id} className="flex items-start gap-1.5 text-[11px] text-[#4A5E73]">
                              <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${EVIDENCE_DOT[ev.type] ?? 'bg-[#6B7D90]'}`} />
                              <span>
                                <span className="font-semibold text-[#2B3D4F]">{ev.label}:</span> {ev.content}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-[#6B7D90] italic">No direct evidence attached yet.</p>
                      )}
                    </div>

                    <div className="flex justify-center text-[#6B7D90]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#5A7A96] font-semibold block">
                        4. Validation test
                      </span>
                      <p className="text-[#2B3D4F] text-[11px] font-medium">
                        {assump.validationMethod}
                      </p>
                    </div>

                    <div className="flex justify-center text-[#6B7D90]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#9E4A4A] font-semibold block">
                        5. Decision rule
                      </span>
                      <p className="text-[11px] text-[#4A5E73]">
                        Promote to SUPPORTED only on direct evidence; reject on contradictory evidence.
                        Until then this assumption stays UNPROVEN — define its kill criteria before testing.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assumption Dependency Graph */}
        <div className="p-4 rounded-xl bg-[#FDFCF8] border border-[#DDD5C5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#2B3D4F] font-bold">
              Assumption dependency graph
            </span>
            <span className="text-[10px] font-mono text-[#6B7D90]">
              {activeGraphNode ? `Filtering: ${activeGraphNode.label} — click again to clear` : 'Click a node to reveal linked assumptions'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-0 py-1" role="group" aria-label="Assumption dependency chain">
            {GRAPH_NODES.map((node, idx) => {
              const linkedCount = assumptions.filter((a) => node.dims.includes(a.dimension)).length;
              const isActive = activeGraphNodeId === node.id;
              return (
                <React.Fragment key={node.id}>
                  <button
                    type="button"
                    onClick={() => setActiveGraphNodeId(isActive ? null : node.id)}
                    aria-pressed={isActive}
                    className={`w-full max-w-md px-4 py-2 rounded-lg border text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-[#2B3D4F] text-[#F5F1EB] border-[#2B3D4F] font-bold shadow-sm'
                        : 'bg-[#F5F1EB] text-[#2B3D4F] border-[#DDD5C5] hover:border-[#2B3D4F]/50'
                    }`}
                  >
                    {node.label}
                    <span className={`ml-2 text-[10px] ${isActive ? 'text-[#F5F1EB]/70' : 'text-[#6B7D90]'}`}>
                      {linkedCount} linked
                    </span>
                  </button>
                  {idx < GRAPH_NODES.length - 1 && (
                    <span className="text-[#C4B8A0] text-sm leading-none py-0.5" aria-hidden="true">↓</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {activeGraphNode && (
            <div className="pt-1">
              {graphLinkedAssumptions.length > 0 ? (
                <ul className="space-y-1.5">
                  {graphLinkedAssumptions.map((a) => (
                    <li key={a.id} className="text-xs text-[#4A5E73] p-2.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] flex items-start gap-2">
                      <span className="text-[#8A6D2B] font-bold shrink-0">•</span>
                      <span>
                        <span className="font-semibold text-[#2B3D4F]">"{a.statement}"</span>
                        <span className="block text-[10px] font-mono text-[#6B7D90] mt-0.5">
                          {a.dimension} · {a.impact} impact · Test: {a.validationMethod}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ChartEmptyState
                  title="No assumptions linked here yet"
                  message={`Nothing in the current assessment feeds ${activeGraphNode.label.toLowerCase()} — add discovery input to grow this chain.`}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 05: STRATEGIC QUESTIONS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[#6B7D90] tracking-wider font-semibold">
              Section 05 // Strategic Open Questions
            </div>
            <p className="text-xs text-[#4A5E73] mt-0.5">
              Decisive unknowns that must be answered before capital commitment. Click to reveal strategic rationale.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#6B7D90]">
            {openQuestions.length} Decision Drivers
          </span>
        </div>

        {/* 4 Interactive Question Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {openQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            const linkedAssumption = assumptions.find((a) => a.dimension === q.dimension);

            return (
              <div
                key={q.id}
                onClick={() => toggleQuestion(q.id)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isExpanded
                    ? 'bg-[#ECE6DA] border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30 shadow-md'
                    : 'bg-[#FDFCF8] hover:bg-[#ECE6DA] border-[#DDD5C5] hover:border-[#C4B8A0]'
                }`}
              >
                <div>
                  {/* Top Bar: Dimension + Urgency Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90] tracking-wider">
                      {q.dimension}
                    </span>

                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold flex items-center gap-1 ${
                        q.urgency === 'immediate'
                          ? 'bg-[#9E4A4A]/15 text-[#9E4A4A] border-[#9E4A4A]/30'
                          : q.urgency === 'pre-launch'
                          ? 'bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30'
                          : 'bg-[#2B3D4F]/15 text-[#2B3D4F] border-[#2B3D4F]/30'
                      }`}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      {q.urgency}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-xs font-bold text-[#2B3D4F] leading-snug mb-1">
                    {q.question}
                  </h3>
                  <p className="text-[10px] font-mono text-[#6B7D90]">
                    Unlocks: <span className="text-[#2B3D4F] font-semibold">{q.dimension}</span>
                  </p>
                </div>

                {/* Click cue */}
                <div className="mt-3 pt-2 border-t border-[#DDD5C5]/80 flex items-center justify-between text-[10px] font-mono text-[#6B7D90]">
                  <span className="text-[#2B3D4F]">
                    {isExpanded ? 'Hide Strategic Rationale' : 'Inspect Strategic Context'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>

                {/* Expanded Context */}
                {isExpanded && (
                  <div
                    className="mt-3 pt-3 border-t border-[#DDD5C5] space-y-2.5 text-left animate-fade-in text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                      <span className="text-[10px] font-mono uppercase text-[#6B7D90] block mb-1">
                        Why this determines viability:
                      </span>
                      <p className="text-[#4A5E73] text-[11px] leading-relaxed">
                        {q.context}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                      <span className="text-[10px] font-mono uppercase text-[#2B3D4F] font-semibold block mb-1">
                        Suggested validation method:
                      </span>
                      <p className="text-[#4A5E73] text-[11px] leading-relaxed">
                        {linkedAssumption
                          ? linkedAssumption.validationMethod
                          : 'Founder interview plus targeted evidence capture for this dimension.'}
                      </p>
                    </div>
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
