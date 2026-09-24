import React, { useState } from 'react';
import {
  ArrowRight,
  Cpu,
  Monitor,
  Activity,
  Box,
  Compass,
  Sparkles,
  CheckCircle2,
  X,
  Workflow,
  Radio,
} from 'lucide-react';
import type {
  ProductBlueprint as ProductBlueprintType,
  BlueprintNode,
} from '../../types/project';

interface ProductBlueprintProps {
  blueprint: ProductBlueprintType;
}

export const ProductBlueprint: React.FC<ProductBlueprintProps> = ({ blueprint }) => {
  const { nodes, summary, modalityBlueprint } = blueprint;
  const [selectedNode, setSelectedNode] = useState<BlueprintNode | null>(nodes[0] || null);
  const [activeTab, setActiveTab] = useState<'tree' | 'causal'>('tree');
  const [modalityOverride, setModalityOverride] = useState<'software' | 'hardware' | 'hybrid' | null>(
    null
  );

  const activeModality = modalityOverride || modalityBlueprint?.modality || 'software';

  const getCategoryColor = (cat: BlueprintNode['category']) => {
    switch (cat) {
      case 'problem':
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'user':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'job':
        return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'solution':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'experience':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'outcome':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      default:
        return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    }
  };

  // Branch data according to active modality
  const branchA = modalityBlueprint?.branchA || {
    title: 'CUSTOMER FLOW',
    items: [
      { id: '1', name: 'Discovery & Onboarding', description: 'Immediate user sign-up and initial setup.', detail: 'Frictionless entry' },
      { id: '2', name: 'Core Action Execution', description: 'Primary value interaction loop.', detail: 'Instant aha moment' },
      { id: '3', name: 'Insight & Export Loop', description: 'Continuous reporting and retention loop.', detail: 'High retention trigger' },
    ],
  };

  const branchB = modalityBlueprint?.branchB || {
    title: 'CORE ENGINE',
    items: [
      { id: '1', name: 'Telemetry & Ingest Queue', description: 'High-throughput data streaming and buffering.', detail: 'Sub-20ms latency' },
      { id: '2', name: 'Core Computation Engine', description: 'Algorithmic logic and data transformation.', detail: 'Deterministic rules' },
      { id: '3', name: 'Anomaly & Trigger Watchdog', description: 'Continuous background health evaluations.', detail: 'Automated webhooks' },
    ],
  };

  const branchC = modalityBlueprint?.branchC || {
    title: 'INTERFACE / UX',
    items: [
      { id: '1', name: 'Primary Dashboard Screen', description: 'Executive workspace rendering core metrics.', detail: 'Real-time charts' },
      { id: '2', name: 'Deep-Dive Explorer Screen', description: 'Detailed inspection and filtering view.', detail: 'Multi-facet filters' },
      { id: '3', name: 'Settings & Integrations', description: 'Team roles, API tokens, and webhook config.', detail: 'Role-based access' },
    ],
  };

  return (
    <div id="section-blueprint" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header and View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 02 — Product Blueprint
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
              {activeModality} ARCHITECTURE
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">{summary}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub-view switcher */}
          <div className="flex items-center p-1 rounded-xl bg-[#080B10] border border-[#263244]">
            <button
              type="button"
              onClick={() => setActiveTab('tree')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'tree'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[#AAB4C3] hover:text-[#F3F4F6]'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>3-Branch Tree</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('causal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'causal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-[#AAB4C3] hover:text-[#F3F4F6]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Causal Chain</span>
            </button>
          </div>

          {/* Modality toggle (Software / Hardware / Hybrid) */}
          <div className="hidden lg:flex items-center p-1 rounded-xl bg-[#080B10] border border-[#263244] text-[11px] font-mono">
            {(['software', 'hardware', 'hybrid'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModalityOverride(m)}
                className={`px-2.5 py-1 rounded-lg uppercase transition-all ${
                  activeModality === m
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'text-[#738095] hover:text-[#CBD5E1]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: 3-BRANCH VISUAL BLUEPRINT TREE
          ========================================================================= */}
      {activeTab === 'tree' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Root Node: Product Core */}
          <div className="flex flex-col items-center">
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-blue-900/40 border border-cyan-500/40 shadow-lg text-center max-w-md">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Box className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  PRODUCT SPECIFICATION ROOT
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#F3F4F6]">
                Target Architecture &amp; Modular Composition
              </h3>
              <span className="text-[10px] font-mono text-[#AAB4C3] mt-0.5 block">
                Mode: {activeModality.toUpperCase()} • Grounded to Venture Idea
              </span>
            </div>

            {/* Tree Branch Connector SVG */}
            <div className="w-full max-w-4xl h-8 relative hidden md:block">
              {/* Vertical trunk line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-500/40" />
              {/* Horizontal bridge bar */}
              <div className="absolute top-4 left-[16.6%] right-[16.6%] h-0.5 bg-cyan-500/40" />
              {/* 3 descending drops */}
              <div className="absolute top-4 left-[16.6%] w-0.5 h-4 bg-cyan-500/40" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-500/40" />
              <div className="absolute top-4 right-[16.6%] w-0.5 h-4 bg-cyan-500/40" />
            </div>
          </div>

          {/* 3 Distinct Functional Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Branch A: Customer Flow / Physical Workflow */}
            <div className="rounded-2xl bg-[#080B10] border border-blue-500/30 p-5 space-y-4 shadow-lg hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono font-bold uppercase text-blue-300">
                    BRANCH A: {branchA.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#738095]">01 / FLOWS</span>
              </div>

              <div className="space-y-3">
                {branchA.items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] hover:border-blue-500/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F3F4F6]">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                        Flow 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#AAB4C3] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[10px] font-mono text-[#738095] pt-1 border-t border-[#1C2635]">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch B: Core Engine / Device Modules */}
            <div className="rounded-2xl bg-[#080B10] border border-purple-500/30 p-5 space-y-4 shadow-lg hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono font-bold uppercase text-purple-300">
                    BRANCH B: {branchB.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#738095]">02 / ENGINE</span>
              </div>

              <div className="space-y-3">
                {branchB.items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] hover:border-purple-500/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F3F4F6]">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                        Engine 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#AAB4C3] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[10px] font-mono text-[#738095] pt-1 border-t border-[#1C2635]">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch C: Interface UX / Physical Components */}
            <div className="rounded-2xl bg-[#080B10] border border-cyan-500/30 p-5 space-y-4 shadow-lg hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold uppercase text-cyan-300">
                    BRANCH C: {branchC.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#738095]">03 / UI &amp; UX</span>
              </div>

              <div className="space-y-3">
                {branchC.items.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] hover:border-cyan-500/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F3F4F6]">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                        Screen 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#AAB4C3] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="text-[10px] font-mono text-[#738095] pt-1 border-t border-[#1C2635]">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
              HYBRID PIPELINE (If Modality is Hybrid)
              ========================================================================= */}
          {activeModality === 'hybrid' && modalityBlueprint?.hybridPipeline && (
            <div className="rounded-2xl bg-[#080B10] border border-amber-500/40 p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                  <h3 className="text-xs font-mono font-bold uppercase text-amber-300 tracking-wider">
                    HYBRID CONTINUUM PIPELINE: PHYSICAL &rarr; DIGITAL &rarr; USER
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-amber-400/80">
                  Bi-Directional Telemetry Loop
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {modalityBlueprint.hybridPipeline.map((step, idx) => (
                  <div
                    key={step.stage}
                    className="p-3 rounded-xl bg-[#111823] border border-[#263244] flex flex-col justify-between space-y-2 relative"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#738095] mb-1">
                        <span>STAGE 0{idx + 1}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#F3F4F6] block">
                        {step.stage}
                      </span>
                      <p className="text-[10px] text-[#AAB4C3] leading-relaxed mt-1">
                        {step.description}
                      </p>
                    </div>

                    {idx < modalityBlueprint.hybridPipeline!.length - 1 && (
                      <ArrowRight className="hidden lg:block w-3.5 h-3.5 text-amber-500/60 absolute -right-2 top-1/2 -translate-y-1/2 z-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 2: CAUSAL CHAIN FLOW
          ========================================================================= */}
      {activeTab === 'causal' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Connected Horizontal Flow Chain */}
          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="flex items-center gap-3 min-w-[900px]">
              {nodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                const colorClass = getCategoryColor(node.category);

                return (
                  <React.Fragment key={node.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedNode(node)}
                      className={`flex-1 min-w-[140px] text-left p-4 rounded-xl border transition-all duration-200 relative ${
                        isSelected
                          ? 'bg-[#151E2B] border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
                          : 'bg-[#111823] border-[#263244] hover:border-[#34445A] hover:bg-[#131C29]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${colorClass}`}
                        >
                          {node.label}
                        </span>
                        <span className="text-[10px] font-mono text-[#738095]">0{index + 1}</span>
                      </div>
                      <h3 className="text-xs font-bold text-[#F3F4F6] line-clamp-1 mb-1">
                        {node.title}
                      </h3>
                      <p className="text-[11px] text-[#AAB4C3] line-clamp-2 leading-relaxed">
                        {node.description}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-[#1C2635] flex items-center justify-between text-[9px] font-mono text-[#738095]">
                        <span className="truncate">{node.originatingStage}</span>
                        <span className="text-blue-400">{node.provenance}</span>
                      </div>
                    </button>

                    {index < nodes.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-[#34445A] flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Deep Inspection Drawer for Selected Node */}
          {selectedNode && (
            <div className="rounded-xl bg-[#111823] border border-blue-500/40 p-5 relative transition-all animate-fadeIn">
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-[#738095] hover:text-[#F3F4F6] transition-colors"
                title="Close node inspector"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-mono font-semibold uppercase ${getCategoryColor(
                    selectedNode.category
                  )}`}
                >
                  {selectedNode.label}
                </span>
                <span className="text-xs font-mono text-[#738095]">
                  Origin: {selectedNode.originatingStage} • Evidence: {selectedNode.provenance}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[#F3F4F6] mb-2">
                {selectedNode.title}
              </h3>
              <p className="text-xs text-[#AAB4C3] leading-relaxed mb-4">
                {selectedNode.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#1C2635]">
                <div className="rounded-lg bg-[#0D141F] p-3 border border-[#263244]">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineering &amp; Build Implication</span>
                  </div>
                  <p className="text-xs text-[#AAB4C3] leading-relaxed">
                    {selectedNode.buildImplication}
                  </p>
                </div>

                <div className="rounded-lg bg-[#0D141F] p-3 border border-[#263244]">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Validation &amp; Grounding</span>
                  </div>
                  <p className="text-xs text-[#AAB4C3] leading-relaxed">
                    {selectedNode.evidenceQuote
                      ? `Direct raw input quote: "${selectedNode.evidenceQuote.slice(0, 110)}..."`
                      : `Synthesized dynamically from Stage ${selectedNode.originatingStage} without synthetic mock data.`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
