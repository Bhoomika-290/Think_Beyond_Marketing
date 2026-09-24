import React, { useState } from 'react';
import {
  Bot,
  User,
  Database,
  Users,
  BookOpen,
  Cpu,
  ShieldAlert,
  FileCheck2,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { AIArchitectureSystem, AIArchitectureNode } from '../../types/project';

interface AIArchitectureDiagramProps {
  aiArchitecture: AIArchitectureSystem;
}

interface ReasoningStage {
  id: string;
  stepNumber: number;
  name: string;
  shortDesc: string;
  icon: React.ReactNode;
  accentColor: string;
  borderColor: string;
  bgLight: string;
  detail: string;
  dataArtifact: string;
}

export const AIArchitectureDiagram: React.FC<AIArchitectureDiagramProps> = ({ aiArchitecture }) => {
  const { isAIPrimary, roleSummary, justification, pipeline, costSensitivityNotice } = aiArchitecture;
  const [selectedLoopStage, setSelectedLoopStage] = useState<number>(3); // Default on Specialist Agent
  const [selectedPipelineStep, setSelectedPipelineStep] = useState<AIArchitectureNode | null>(
    pipeline[0] || null
  );

  // The 8-stage AI Cognitive Loop specified in Section 29
  const reasoningLoop: ReasoningStage[] = [
    {
      id: 'user_input',
      stepNumber: 1,
      name: 'USER INPUT',
      shortDesc: 'Raw prompts & constraints',
      icon: <User className="w-4 h-4 text-blue-400" />,
      accentColor: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      bgLight: 'bg-blue-500/10',
      detail:
        'Captures founder raw intent, domain hypotheses, customer profile selections, and venture parameters without conversational hallucination.',
      dataArtifact: 'RawFounderPromptPayload',
    },
    {
      id: 'project_context',
      stepNumber: 2,
      name: 'PROJECT CONTEXT',
      shortDesc: 'Stage 01-04 persistent memory',
      icon: <Database className="w-4 h-4 text-indigo-400" />,
      accentColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      bgLight: 'bg-indigo-500/10',
      detail:
        'Injects deterministic outputs from upstream stages: validated customer pains, feasibility margins, competitor gaps, and brand positioning tokens.',
      dataArtifact: 'ProjectState (Upstream Stages)',
    },
    {
      id: 'specialist_agent',
      stepNumber: 3,
      name: 'SPECIALIST AGENT',
      shortDesc: 'Domain-scoped orchestrator',
      icon: <Users className="w-4 h-4 text-purple-400" />,
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgLight: 'bg-purple-500/10',
      detail:
        'Routes task to targeted specialist agent (Technical Architect, Market Analyst, Brand Strategist, UX Critic) rather than a generic monolithic LLM.',
      dataArtifact: 'SpecialistAgentPersona & DomainRules',
    },
    {
      id: 'evidence_knowledge',
      stepNumber: 4,
      name: 'EVIDENCE / KNOWLEDGE',
      shortDesc: 'Empirical industry benchmarks',
      icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
      accentColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgLight: 'bg-cyan-500/10',
      detail:
        'Grounds agent generation in real market frameworks, tech stack operational baselines, margin benchmarks, and empirical failure modes.',
      dataArtifact: 'DomainKnowledgeStore & ProvenanceTags',
    },
    {
      id: 'analysis',
      stepNumber: 5,
      name: 'ANALYSIS',
      shortDesc: 'Deterministic reasoning engine',
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      accentColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgLight: 'bg-amber-500/10',
      detail:
        'Executes multi-step reasoning, trade-off evaluation, and scoring matrices with strict mathematical bounds and schema validation.',
      dataArtifact: 'InferenceEngine & TradeoffMatrix',
    },
    {
      id: 'critic',
      stepNumber: 6,
      name: 'CRITIC & ADVERSARY',
      shortDesc: 'Stress-test & bias challenge',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      accentColor: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgLight: 'bg-rose-500/10',
      detail:
        'Automated red-team critique identifying optimism bias, missing operational costs, unvalidated assumptions, and technical scalability bottlenecks.',
      dataArtifact: 'AdversarialReview & FlawCheck',
    },
    {
      id: 'final_output',
      stepNumber: 7,
      name: 'FINAL OUTPUT',
      shortDesc: 'Validated JSON schema output',
      icon: <FileCheck2 className="w-4 h-4 text-emerald-400" />,
      accentColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgLight: 'bg-emerald-500/10',
      detail:
        'Produces structured, typed deliverables (specifications, architecture models, risk matrices) conforming strictly to TypeScript contracts.',
      dataArtifact: 'ValidatedSchemaPayload',
    },
    {
      id: 'project_state',
      stepNumber: 8,
      name: 'PROJECT STATE',
      shortDesc: 'Context update & stage unlock',
      icon: <CheckCircle2 className="w-4 h-4 text-teal-400" />,
      accentColor: 'text-teal-400',
      borderColor: 'border-teal-500/40',
      bgLight: 'bg-teal-500/10',
      detail:
        'Updates the global ProjectContext, stores provenance metadata, and enables progressive stage unlocking for subsequent strategic workflows.',
      dataArtifact: 'ProjectContext.buildArchitecture',
    },
  ];

  const currentLoopStage = reasoningLoop.find((s) => s.stepNumber === selectedLoopStage) || reasoningLoop[2];

  return (
    <div id="section-ai-arch" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 11 — AI Architecture &amp; Multi-Agent Reasoning Loop
            </h2>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                isAIPrimary
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                  : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
              }`}
            >
              {isAIPrimary ? 'CORE AI PIPELINE' : 'LIGHT OPERATIONAL AUTOMATION'}
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">{roleSummary}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#738095] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
            {costSensitivityNotice}
          </span>
        </div>
      </div>

      {/* Grounding Explanation Banner */}
      <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] flex items-start gap-3">
        <Bot className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isAIPrimary ? 'text-purple-400' : 'text-blue-400'}`} />
        <div className="text-xs">
          <span className="font-mono font-bold text-[#F3F4F6] block mb-1">
            Grounded AI Justification &amp; Multi-Agent Mandate:
          </span>
          <p className="text-[#AAB4C3] leading-relaxed">{justification}</p>
        </div>
      </div>

      {/* Visual AI Cognitive Architecture Pipeline (8 Connected Steps) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono text-[#F3F4F6] font-bold uppercase tracking-wider">
              COGNITIVE REASONING PIPELINE (SECTION 29 SPECIFICATION)
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#738095]">
            Click any step to inspect cognitive contracts
          </span>
        </div>

        {/* 8 Step Pipeline Visual Conduit */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {reasoningLoop.map((stage) => {
            const isSelected = stage.stepNumber === selectedLoopStage;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedLoopStage(stage.stepNumber)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? `${stage.bgLight} ${stage.borderColor} ring-1 ring-blue-500 shadow-lg`
                    : 'bg-[#111823] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#738095]">
                      0{stage.stepNumber}
                    </span>
                    <div className="p-1 rounded bg-[#0D141F] border border-[#1C2635]">
                      {stage.icon}
                    </div>
                  </div>
                  <h4 className={`text-[11px] font-mono font-bold leading-tight ${stage.accentColor}`}>
                    {stage.name}
                  </h4>
                  <p className="text-[10px] text-[#AAB4C3] mt-1 line-clamp-2 leading-snug">
                    {stage.shortDesc}
                  </p>
                </div>

                {isSelected && (
                  <div className="mt-2 pt-1 border-t border-white/10 flex items-center gap-1 text-[9px] font-mono text-[#F3F4F6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    ACTIVE
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Inspector */}
        <div className="p-4 rounded-xl bg-[#111823] border border-blue-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#738095]">
                STEP 0{currentLoopStage.stepNumber} DEEP SPECIFICATION:
              </span>
              <span className={`text-xs font-mono font-bold ${currentLoopStage.accentColor}`}>
                {currentLoopStage.name}
              </span>
            </div>
            <p className="text-xs text-[#AAB4C3] leading-relaxed max-w-2xl">
              {currentLoopStage.detail}
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0D141F] border border-[#263244] text-[10px] font-mono text-right flex-shrink-0">
            <span className="text-[#738095] block">GROUNDED DATA CONTRACT:</span>
            <span className="text-emerald-400 font-bold block mt-0.5">
              {currentLoopStage.dataArtifact}
            </span>
          </div>
        </div>
      </div>

      {/* Venture Execution Pipeline Mapping */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono text-[#F3F4F6] font-bold uppercase tracking-wider">
              VENTURE-SPECIFIC EXECUTION INSTANCES ({pipeline.length} COMPONENTS)
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#738095]">
            Grounded in active venture problem &amp; architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {pipeline.map((step) => {
            const isSelected = selectedPipelineStep?.id === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setSelectedPipelineStep(step)}
                className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#151E2B] border-blue-500 shadow-md ring-1 ring-blue-500'
                    : 'bg-[#111823] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-[#738095] mb-2">
                    <span>STEP 0{step.stepNumber}</span>
                    <span className="px-1.5 py-0.5 rounded text-blue-300 bg-blue-500/10 border border-blue-500/20 truncate">
                      {step.role}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#F3F4F6] mb-1">{step.component}</h3>
                  <p className="text-[11px] text-[#AAB4C3] leading-relaxed mb-3">{step.purpose}</p>

                  <div className="p-2.5 rounded bg-[#0D141F] border border-[#1C2635] space-y-1 text-[10px] font-mono mb-3">
                    <div className="text-[#738095] truncate">
                      <span className="text-[#F3F4F6]">In:</span> {step.inputs.join(', ')}
                    </div>
                    <div className="text-[#738095] truncate">
                      <span className="text-emerald-400">Out:</span> {step.outputs.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1C2635] text-[10px] font-mono text-[#738095]">
                  <span className="text-amber-400/90 truncate block">
                    Fallback: {step.fallback}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
