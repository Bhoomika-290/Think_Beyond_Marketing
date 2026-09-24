import React, { useState } from 'react';
import {
  AlertCircle,
  Layers,
  MousePointer,
  Cpu,
  CheckCircle2,
  Workflow,
} from 'lucide-react';
import type { FeatureBehaviorFlowItem } from '../../types/project';

interface FeatureBehaviorFlowProps {
  flows: FeatureBehaviorFlowItem[];
}

export const FeatureBehaviorFlow: React.FC<FeatureBehaviorFlowProps> = ({ flows }) => {
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'must' | 'should' | 'could'>('all');
  const [activeFlowId, setActiveFlowId] = useState<string>(flows[0]?.id || '');

  const filteredFlows = flows.filter((f) => {
    if (priorityFilter === 'all') return true;
    return f.priority === priorityFilter;
  });

  const getPriorityBadge = (p: FeatureBehaviorFlowItem['priority']) => {
    switch (p) {
      case 'must':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'should':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'could':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div id="section-feature-behavior" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header and Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Feature &rarr; User Problem &rarr; System Behaviour Architecture
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              5-STEP CAUSAL BEHAVIOUR
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Every critical feature connects an acute user problem to tangible user action, deterministic system execution, and verified expected outcome.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080B10] border border-[#263244]">
          {(['all', 'must', 'should'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                priorityFilter === p
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[#AAB4C3] hover:text-[#F3F4F6]'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {filteredFlows.map((flow) => {
          const isSelected = (activeFlowId || filteredFlows[0]?.id) === flow.id;
          return (
            <button
              key={flow.id}
              type="button"
              onClick={() => setActiveFlowId(flow.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap border transition-all ${
                isSelected
                  ? 'bg-[#151E2B] border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500/40'
                  : 'bg-[#111823] border-[#263244] text-[#AAB4C3] hover:text-[#F3F4F6] hover:border-[#34445A]'
              }`}
            >
              {flow.featureName}
            </button>
          );
        })}
      </div>

      {/* 5-Step Connected Flow Cards for Active Feature */}
      {filteredFlows.map((flow) => {
        const isSelected = (activeFlowId || filteredFlows[0]?.id) === flow.id;
        if (!isSelected) return null;

        return (
          <div key={flow.id} className="space-y-6 animate-fadeIn">
            {/* Feature Header Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#080B10] border border-[#1C2635]">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase border ${getPriorityBadge(flow.priority)}`}>
                  {flow.priority.toUpperCase()} HAVE
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#F3F4F6]">
                    {flow.featureName}
                  </h3>
                  <span className="text-[11px] font-mono text-[#738095]">
                    Category: {flow.productCategory}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-400">
                End-to-End Behavioral Loop
              </span>
            </div>

            {/* 5-Step Visual Chain Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 relative items-stretch">
              {/* Step 1: User Problem */}
              <div className="p-4 rounded-xl bg-[#111823] border border-rose-500/30 flex flex-col justify-between space-y-3 shadow-md hover:border-rose-500/50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                      STEP 01
                    </span>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#F3F4F6] uppercase">
                    USER PROBLEM
                  </h4>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {flow.userProblem}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-rose-400/80 pt-2 border-t border-rose-500/20">
                  Status-Quo Friction
                </div>
              </div>

              {/* Step 2: Feature Spec */}
              <div className="p-4 rounded-xl bg-[#111823] border border-cyan-500/30 flex flex-col justify-between space-y-3 shadow-md hover:border-cyan-500/50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      STEP 02
                    </span>
                    <Layers className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#F3F4F6] uppercase">
                    FEATURE SPEC
                  </h4>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {flow.featureName}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-cyan-400/80 pt-2 border-t border-cyan-500/20">
                  Differentiated Mechanism
                </div>
              </div>

              {/* Step 3: User Action */}
              <div className="p-4 rounded-xl bg-[#111823] border border-amber-500/30 flex flex-col justify-between space-y-3 shadow-md hover:border-amber-500/50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      STEP 03
                    </span>
                    <MousePointer className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#F3F4F6] uppercase">
                    USER ACTION
                  </h4>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {flow.userAction}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-amber-400/80 pt-2 border-t border-amber-500/20">
                  User Interaction Touchpoint
                </div>
              </div>

              {/* Step 4: System Behaviour */}
              <div className="p-4 rounded-xl bg-[#111823] border border-purple-500/30 flex flex-col justify-between space-y-3 shadow-md hover:border-purple-500/50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
                      STEP 04
                    </span>
                    <Cpu className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#F3F4F6] uppercase">
                    SYSTEM BEHAVIOUR
                  </h4>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {flow.systemBehaviour}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-purple-400/80 pt-2 border-t border-purple-500/20">
                  Automated Engine Execution
                </div>
              </div>

              {/* Step 5: Expected Result */}
              <div className="p-4 rounded-xl bg-[#111823] border border-emerald-500/30 flex flex-col justify-between space-y-3 shadow-md hover:border-emerald-500/50 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      STEP 05
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="text-xs font-bold text-[#F3F4F6] uppercase">
                    EXPECTED RESULT
                  </h4>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    {flow.expectedResult}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-emerald-400/80 pt-2 border-t border-emerald-500/20">
                  Verified Outcome &amp; Value
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
