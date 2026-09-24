import React, { useState } from 'react';
import {
  Target,
  Server,
  DollarSign,
  Sparkles,
  ShieldAlert,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  GitMerge,
  MessagesSquare,
  Scale,
  Compass,
} from 'lucide-react';
import type { AICouncilBuildSynthesis, BuildCouncilRole } from '../../types/project';

interface AICouncilBuildPanelProps {
  councilDiscussion: AICouncilBuildSynthesis;
}

export const AICouncilBuildPanel: React.FC<AICouncilBuildPanelProps> = ({ councilDiscussion }) => {
  const { topic, perspectives, unanimousAgreement, keyDivergence, criticalRisks, recommendedAction } =
    councilDiscussion;
  const [selectedRole, setSelectedRole] = useState<BuildCouncilRole>(perspectives[0]?.role || 'product_strategist');
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(3); // 1: Specialists, 2: Discussion, 3: Conflict/Agreement, 4: Critic, 5: Synthesis

  const getRoleIcon = (role: BuildCouncilRole) => {
    switch (role) {
      case 'product_strategist':
        return <Target className="w-4 h-4 text-emerald-400" />;
      case 'technical_architect':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'business_specialist':
        return <DollarSign className="w-4 h-4 text-amber-400" />;
      case 'ux_specialist':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'security_specialist':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'growth_specialist':
        return <TrendingUp className="w-4 h-4 text-cyan-400" />;
    }
  };

  const activePerspective = perspectives.find((p) => p.role === selectedRole) || perspectives[0];

  // The 5-stage council convergence pipeline specified in Section 30
  const councilStages = [
    {
      step: 1,
      title: 'SPECIALISTS',
      subtitle: '6 Domain Agents',
      desc: 'Autonomous personas evaluate venture context under their specific mandates (Architecture, Margin, UX, Defense).',
      icon: <Target className="w-3.5 h-3.5 text-blue-400" />,
    },
    {
      step: 2,
      title: 'DISCUSSION',
      subtitle: 'Parallel Evaluation',
      desc: 'Each specialist formulates initial recommendations based on Stage 01-04 project state.',
      icon: <MessagesSquare className="w-3.5 h-3.5 text-indigo-400" />,
    },
    {
      step: 3,
      title: 'CONFLICT / AGREEMENT',
      subtitle: 'Tension Mapping',
      desc: 'Cross-agent dialectic identifies areas of unanimous consensus versus irreconcilable trade-offs.',
      icon: <Scale className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      step: 4,
      title: 'CRITIC',
      subtitle: 'Adversarial Challenge',
      desc: 'Red-team checks stress-test architectural feasibility against known failure modes.',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />,
    },
    {
      step: 5,
      title: 'SYNTHESIS',
      subtitle: 'Action Directive',
      desc: 'Synthesizes conflicting specialist positions into a singular, bounded founder action directive.',
      icon: <Compass className="w-3.5 h-3.5 text-emerald-400" />,
    },
  ];

  return (
    <div id="section-council" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 13 — Multi-Agent Build Council Synthesis
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30">
              6 SPECIALIST AGENTS
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">{topic}</p>
        </div>

        <span className="text-xs font-mono text-[#738095] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          Deterministic multi-agent debate &amp; consensus
        </span>
      </div>

      {/* Visual Council Convergence Pipeline (Section 30 Specification) */}
      <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-[#F3F4F6] font-bold uppercase tracking-wider">
              COUNCIL CONVERGENCE WORKFLOW (SECTION 30)
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#738095]">
            Unified ProjectContext Input
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {councilStages.map((st) => {
            const isActive = activeWorkflowStage === st.step;

            return (
              <button
                key={st.step}
                type="button"
                onClick={() => setActiveWorkflowStage(st.step)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isActive
                    ? 'bg-[#151E2B] border-purple-500 ring-1 ring-purple-500 shadow-md'
                    : 'bg-[#0D141F] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-[#738095]">0{st.step}</span>
                  {st.icon}
                </div>
                <div className="text-xs font-bold font-mono text-[#F3F4F6] truncate">
                  {st.title}
                </div>
                <div className="text-[10px] text-purple-300 font-mono mt-0.5 truncate">
                  {st.subtitle}
                </div>
                <p className="text-[10px] text-[#AAB4C3] mt-1.5 line-clamp-2 leading-relaxed">
                  {st.desc}
                </p>

                {isActive && (
                  <div className="mt-2 pt-1.5 border-t border-purple-500/30 flex items-center gap-1 text-[9px] font-mono text-purple-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    STAGE VIEW
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Specialist Roles Selector */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-[#738095] uppercase block">
          SPECIALIST AGENTS ACTIVE IN THIS DELIBERATION
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {perspectives.map((agent) => {
            const isSelected = selectedRole === agent.role;

            return (
              <button
                key={agent.role}
                type="button"
                onClick={() => setSelectedRole(agent.role)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#151E2B] border-blue-500 ring-1 ring-blue-500 shadow-md'
                    : 'bg-[#111823] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {getRoleIcon(agent.role)}
                  <span className="text-xs font-bold text-[#F3F4F6] truncate">{agent.roleName}</span>
                </div>
                <p className="text-[10px] text-[#AAB4C3] line-clamp-2 leading-relaxed">
                  {agent.stance}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Perspective Drawer */}
      {activePerspective && (
        <div className="p-4 rounded-xl bg-[#111823] border border-blue-500/40 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1C2635] pb-2">
            <div className="flex items-center gap-2">
              {getRoleIcon(activePerspective.role)}
              <h3 className="text-xs font-bold font-mono text-[#F3F4F6]">
                {activePerspective.roleName} Stance &amp; Mandate
              </h3>
            </div>
            <span className="text-[10px] font-mono text-blue-400">
              {activePerspective.stance}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#0D141F] border border-[#263244]">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold block mb-1">
                KEY STRATEGIC RECOMMENDATION:
              </span>
              <p className="text-[#AAB4C3] leading-relaxed">
                {activePerspective.keyRecommendation}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0D141F] border border-[#263244]">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-semibold block mb-1">
                FLAGGED TECHNICAL / BUSINESS RISK:
              </span>
              <p className="text-[#AAB4C3] leading-relaxed">
                {activePerspective.flaggedRisk}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Council Synthesis: Consensus, Divergence & Action Directive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-[#111823] border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>UNANIMOUS AGREEMENT</span>
          </div>
          <p className="text-xs text-[#AAB4C3] leading-relaxed">{unanimousAgreement}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111823] border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>CRITICAL DIVERGENCE</span>
          </div>
          <p className="text-xs text-[#AAB4C3] leading-relaxed">{keyDivergence}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#111823] border border-blue-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400">
            <ArrowRight className="w-4 h-4" />
            <span>RECOMMENDED FOUNDER ACTION</span>
          </div>
          <p className="text-xs text-[#AAB4C3] leading-relaxed">{recommendedAction}</p>
        </div>
      </div>

      {criticalRisks && criticalRisks.length > 0 && (
        <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
            COUNCIL FLAGGED RISKS:
          </span>
          {criticalRisks.map((risk, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300 font-mono"
            >
              ⚠ {risk}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
