import React from 'react';
import { Target, AlertCircle, Compass, Sparkles, ShieldCheck, ArrowRight, Layers, Award } from 'lucide-react';
import type { BrandRoadmapReport, IdeaData, MarketIntelligenceReport } from '../../types/project';

interface BrandStrategyPipelineProps {
  idea: IdeaData;
  marketReport?: MarketIntelligenceReport | null;
  brandReport: BrandRoadmapReport;
  onNavigateToSection?: (sectionId: string) => void;
}

export const BrandStrategyPipeline: React.FC<BrandStrategyPipelineProps> = ({
  idea,
  marketReport,
  brandReport,
  onNavigateToSection,
}) => {
  const problemSnippet = idea.problem
    ? idea.problem.slice(0, 50) + (idea.problem.length > 50 ? '...' : '')
    : 'Unaddressed customer dilemma';

  const customerSnippet = idea.targetAudience
    ? idea.targetAudience.slice(0, 45) + (idea.targetAudience.length > 45 ? '...' : '')
    : 'Early adopters & target segment';

  const marketSnippet = marketReport?.competitors?.length
    ? `${marketReport.competitors.length} competitors identified`
    : 'Specialized competitive landscape';

  const whitespaceCandidate = brandReport.differentiatorChain.candidates.find((c) => c.isSelected) ||
    brandReport.differentiatorChain.candidates[0];

  const gapSnippet = whitespaceCandidate?.marketGap
    ? whitespaceCandidate.marketGap.slice(0, 48) + (whitespaceCandidate.marketGap.length > 48 ? '...' : '')
    : 'Unserved market whitespace';

  const diffSnippet = whitespaceCandidate?.differentiator
    ? whitespaceCandidate.differentiator.slice(0, 50) + (whitespaceCandidate.differentiator.length > 50 ? '...' : '')
    : 'Core defensible advantage';

  const positionSnippet = brandReport.positioningStatement.valuePromise
    ? brandReport.positioningStatement.valuePromise.slice(0, 45) + (brandReport.positioningStatement.valuePromise.length > 45 ? '...' : '')
    : 'Category wedge & value promise';

  const brandSnippet = brandReport.taglineWorkspace.activeTagline ||
    `${brandReport.ventureName} Strategy Active`;

  const pipelineSteps = [
    {
      id: 'step_prob',
      num: '01',
      label: 'PROBLEM',
      insight: problemSnippet,
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-400" />,
      color: 'border-rose-500/30 text-rose-400 bg-rose-500/5',
      badge: 'STAGE 01',
      targetSection: 'dna',
    },
    {
      id: 'step_cust',
      num: '02',
      label: 'CUSTOMER',
      insight: customerSnippet,
      icon: <Target className="w-3.5 h-3.5 text-amber-400" />,
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/5',
      badge: 'STAGE 01',
      targetSection: 'dna',
    },
    {
      id: 'step_mkt',
      num: '03',
      label: 'MARKET',
      insight: marketSnippet,
      icon: <Compass className="w-3.5 h-3.5 text-blue-400" />,
      color: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
      badge: 'STAGE 03',
      targetSection: 'positioning',
    },
    {
      id: 'step_gap',
      num: '04',
      label: 'GAP',
      insight: gapSnippet,
      icon: <Layers className="w-3.5 h-3.5 text-purple-400" />,
      color: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
      badge: 'WHITESPACE',
      targetSection: 'diff',
    },
    {
      id: 'step_diff',
      num: '05',
      label: 'DIFFERENTIATOR',
      insight: diffSnippet,
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
      badge: 'PROVENANCE',
      targetSection: 'diff',
    },
    {
      id: 'step_pos',
      num: '06',
      label: 'POSITION',
      insight: positionSnippet,
      icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" />,
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5',
      badge: 'MOORE FORMULA',
      targetSection: 'positioning',
    },
    {
      id: 'step_brand',
      num: '07',
      label: 'BRAND',
      insight: brandSnippet,
      icon: <Award className="w-3.5 h-3.5 text-yellow-400" />,
      color: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5',
      badge: 'IDENTITY',
      targetSection: 'identity',
    },
  ];

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-5 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1C2636]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              STRATEGY TRANSFORMATION PIPELINE
            </h2>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-0.5">
            Causal intelligence flow converting upstream discovery vectors into an unmistakable brand identity.
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#64748B]">
          7 Sequential Decision Nodes • Click to Inspect
        </span>
      </div>

      {/* Visual Pipeline Strip */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-stretch gap-2 min-w-[980px]">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div
                onClick={() => onNavigateToSection?.(step.targetSection)}
                className={`flex-1 min-w-[130px] p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.02] hover:shadow-lg ${step.color}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {step.icon}
                      <span className="text-[10px] font-mono font-bold tracking-wider text-[#F3F4F6]">
                        {step.label}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono opacity-60">
                      {step.num}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#CBD5E1] line-clamp-2 leading-snug">
                    {step.insight}
                  </p>
                </div>

                <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono opacity-70">
                  <span>{step.badge}</span>
                  <span className="text-blue-400">→</span>
                </div>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="flex items-center justify-center text-[#334155] flex-shrink-0 self-center">
                  <ArrowRight className="w-3.5 h-3.5 text-[#3E4C5F]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
