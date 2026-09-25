import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Target,
  Compass,
  Palette,
  Users,
  Rocket,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { BrandTransformationMilestone } from '../../types/brandRoadmap';

interface BrandTransformationRoadmapProps {
  milestones: BrandTransformationMilestone[];
  ventureName: string;
}

export const BrandTransformationRoadmap: React.FC<BrandTransformationRoadmapProps> = ({
  milestones = [],
  ventureName,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(milestones[0]?.id || '');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const activeMilestone = milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];

  const getStageIcon = (key: BrandTransformationMilestone['stageKey']) => {
    switch (key) {
      case 'IDEA':
        return <Sparkles className="w-4 h-4 text-blue-400" />;
      case 'VALIDATION':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'POSITIONING':
        return <Target className="w-4 h-4 text-cyan-400" />;
      case 'DIFFERENTIATION':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'BRAND_DNA':
        return <Compass className="w-4 h-4 text-purple-400" />;
      case 'IDENTITY':
        return <Palette className="w-4 h-4 text-pink-400" />;
      case 'CUSTOMER_EXP':
        return <Users className="w-4 h-4 text-amber-400" />;
      case 'LAUNCH':
        return <Rocket className="w-4 h-4 text-rose-400" />;
      case 'GROWTH':
        return <TrendingUp className="w-4 h-4 text-teal-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />;
    }
  };

  const getStatusBadge = (status: BrandTransformationMilestone['status']) => {
    switch (status) {
      case 'READY':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'IN PROGRESS':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'PLANNED':
        return 'bg-[#1C2635] text-[#AAB4C3] border-[#263244]';
    }
  };

  return (
    <div id="section-roadmap" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 01 — Strategic Brand Transformation Roadmap
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              8 STRATEGIC PHASES
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Dynamic strategic progression guiding <span className="text-blue-400 font-semibold">{ventureName}</span> from raw idea to positioning wedge, brand identity in Stage 05A, and compounding market growth.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#738095] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>Strategic Sequencing Journey</span>
        </div>
      </div>

      {/* Visual Roadmap Pipeline (Connected Node Cards with Arrows) */}
      <div className="overflow-x-auto pb-3 scrollbar-thin">
        <div className="flex items-stretch gap-2.5 min-w-[980px]">
          {milestones.map((m, idx) => {
            const isSelected = activeMilestone?.id === m.id;

            return (
              <React.Fragment key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMilestoneId(m.id);
                    setIsExpanded(true);
                  }}
                  className={`flex-1 min-w-[115px] p-3 rounded-xl border text-left transition-all duration-200 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#151E2B] border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10'
                      : 'bg-[#111823] border-[#263244] hover:border-slate-500 hover:bg-[#131C29]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#738095]">0{m.stepNumber}</span>
                      {getStageIcon(m.stageKey)}
                    </div>

                    <h3 className="text-xs font-bold text-[#F3F4F6] truncate">{m.title}</h3>
                    <p className="text-[10px] text-[#AAB4C3] truncate mt-0.5">{m.subtitle}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#1C2635] flex items-center justify-between">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold border ${getStatusBadge(m.status)}`}>
                      {m.status}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </div>
                </button>

                {idx < milestones.length - 1 && (
                  <div className="flex items-center justify-center flex-shrink-0 text-[#2B394E]">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Expandable Phase Inspection Deck (Compact, Click to Toggle) */}
      {activeMilestone && (
        <div className="rounded-xl bg-[#111823] border border-blue-500/40 p-5 space-y-4 animate-fadeIn shadow-2xl">
          {/* Header of Active Phase Card with Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C2635] pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#0D141F] border border-[#263244]">
                {getStageIcon(activeMilestone.stageKey)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                    PHASE 0{activeMilestone.stepNumber} • {activeMilestone.stageKey}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold border ${getStatusBadge(activeMilestone.status)}`}>
                    {activeMilestone.status}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#F3F4F6]">
                  {activeMilestone.title} — <span className="text-xs font-normal text-[#AAB4C3]">{activeMilestone.subtitle}</span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#738095]">
                Dependency: <span className="text-blue-300">{activeMilestone.dependency}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg bg-[#0D141F] text-[#738095] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
                title={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 6 Core Requirements: Objective, Founder Action, Milestone, Outcome, Dependency, Gate */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-fadeIn">
              {/* 1. OBJECTIVE */}
              <div className="p-3.5 rounded-xl bg-[#080B10] border border-[#1C2635] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                  01 • STRATEGIC OBJECTIVE
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {activeMilestone.objective || activeMilestone.whatItIs}
                </p>
              </div>

              {/* 2. FOUNDER ACTION */}
              <div className="p-3.5 rounded-xl bg-[#080B10] border border-[#1C2635] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  02 • WHAT FOUNDER MUST ACCOMPLISH
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {activeMilestone.founderAction || activeMilestone.whyItMatters}
                </p>
              </div>

              {/* 3. IMPORTANT MILESTONE */}
              <div className="p-3.5 rounded-xl bg-[#080B10] border border-amber-500/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                  03 • CRITICAL MILESTONE
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {activeMilestone.keyMilestone || activeMilestone.title}
                </p>
              </div>

              {/* 4. EXPECTED OUTCOME */}
              <div className="p-3.5 rounded-xl bg-[#080B10] border border-emerald-500/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  04 • EXPECTED OUTCOME (DELIVERABLE)
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {activeMilestone.expectedOutcome || activeMilestone.concreteOutput}
                </p>
              </div>

              {/* 5. DEPENDENCY */}
              <div className="p-3.5 rounded-xl bg-[#080B10] border border-purple-500/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                  05 • UPSTREAM DEPENDENCY
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {activeMilestone.dependency}
                </p>
              </div>

              {/* 6. DECISION / GATE */}
              <div className="p-3.5 rounded-xl bg-[#080B10] border border-rose-500/20 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                  06 • DECISION / PASS GATE
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {activeMilestone.decisionGate || activeMilestone.recommendedNextStep}
                </p>
              </div>
            </div>
          )}

          {/* Grounding Footer */}
          <div className="pt-2 border-t border-[#1C2635] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-[#738095]">
            <span className="flex items-center gap-1.5 text-blue-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Grounded Context: {activeMilestone.groundedDetail}</span>
            </span>
            <span>Refreshes dynamically with upstream project state</span>
          </div>
        </div>
      )}
    </div>
  );
};
