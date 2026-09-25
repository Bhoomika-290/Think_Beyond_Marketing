import React, { useEffect, useState, useRef } from 'react';
import {
  Activity,
  ListTodo,
  ShieldAlert,
  Layers,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { BuildHeader } from '../components/build-architecture/BuildHeader';

// Stage 05A — Brand System Components
import { BrandDNAMap } from '../components/brand-roadmap/BrandDNAMap';
import { PositioningStatementBuilder } from '../components/brand-roadmap/PositioningStatementBuilder';
import { BrandPersonality } from '../components/brand-roadmap/BrandPersonality';
import { BrandVoice } from '../components/brand-roadmap/BrandVoice';
import { TaglineBuilder } from '../components/brand-roadmap/TaglineBuilder';
import { LogoGenerator } from '../components/brand-roadmap/LogoGenerator';
import { ColorSystem } from '../components/brand-roadmap/ColorSystem';
import { TypographySystem } from '../components/brand-roadmap/TypographySystem';
import { BrandIdentityBoard } from '../components/brand-roadmap/BrandIdentityBoard';
import { CustomerExperienceMap } from '../components/brand-roadmap/CustomerExperienceMap';

// Stage 05B — Product Build Components
import { BuildReadinessOverview } from '../components/build-architecture/BuildReadinessOverview';
import { ProductBlueprint } from '../components/build-architecture/ProductBlueprint';
import { MVPScopeMatrix } from '../components/build-architecture/MVPScopeMatrix';
import { FeatureBehaviorFlow } from '../components/build-architecture/FeatureBehaviorFlow';
import { FeatureArchitectureTree } from '../components/build-architecture/FeatureArchitectureTree';
import { SystemArchitectureVisualizer } from '../components/build-architecture/SystemArchitectureVisualizer';
import { TechStackBuilder } from '../components/build-architecture/TechStackBuilder';
import { DataEntityModel } from '../components/build-architecture/DataEntityModel';
import { ProductUserFlow } from '../components/build-architecture/ProductUserFlow';
import { ScreenArchitecture } from '../components/build-architecture/ScreenArchitecture';
import { APIIntegrationMap } from '../components/build-architecture/APIIntegrationMap';
import { AIArchitectureDiagram } from '../components/build-architecture/AIArchitectureDiagram';
import { BuildDependencyGraph } from '../components/build-architecture/BuildDependencyGraph';
import { BuildRoadmapBoard } from '../components/build-architecture/BuildRoadmapBoard';
import { BuildRiskMatrix } from '../components/build-architecture/BuildRiskMatrix';
import { BuildDecisionBoard } from '../components/build-architecture/BuildDecisionBoard';
import { BrandProductConsistency } from '../components/build-architecture/BrandProductConsistency';
import { AICouncilBuildPanel } from '../components/build-architecture/AICouncilBuildPanel';
import { BuildSpecialistChat } from '../components/build-architecture/BuildSpecialistChat';
import { ArchitectureChallenger } from '../components/build-architecture/ArchitectureChallenger';
import { BuildHandoff } from '../components/build-architecture/BuildHandoff';

export const BuildPage: React.FC = () => {
  const {
    state,
    brandReport,
    buildReport,
    refreshBuildArchitecture,
    refreshBrandRoadmap,
    // Brand System Actions
    updateBrandPersonality,
    toggleBrandVoice,
    updatePositioningStatement,
    updateVoiceTransformation,
    selectTagline,
    selectLogoConcept,
    customizeLogo,
    updateColorSwatch,
    selectTypography,
    // Product Build Actions
    updateFeaturePriority,
    updateFeatureDetails,
    addCustomFeature,
    updateTechStackItem,
    toggleBuildTask,
    addCustomBuildTask,
    moveBuildDecision,
    addBuildDecision,
    sendBuildSpecialistQuery,
    buildSpecialistMessages,
    markStageCompleted,
    loadSampleVenture,
  } = useProject();

  const [activeBuildArea, setActiveBuildArea] = useState<'brand' | 'product'>('brand');
  const [activeSection, setActiveSection] = useState<string>('all');
  const [showReadinessOverview, setShowReadinessOverview] = useState<boolean>(false);
  const [showRoadmapSection, setShowRoadmapSection] = useState<boolean>(false);
  const [showRiskSection, setShowRiskSection] = useState<boolean>(false);
  const [showConsistencySection, setShowConsistencySection] = useState<boolean>(false);
  const [showCouncilSection, setShowCouncilSection] = useState<boolean>(false);
  const [showHandoffSection, setShowHandoffSection] = useState<boolean>(false);

  const pageTopRef = useRef<HTMLDivElement>(null);

  // Guarantee that opening Stage 05 always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
    if (pageTopRef.current) {
      pageTopRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  const ventureName = state.idea.name || state.project.name || 'Untitled Venture';
  const hasDiscovery = Boolean(
    state.idea.name || state.idea.rawInput || state.businessModel.productType
  );

  return (
    <div ref={pageTopRef} className="space-y-8 pb-16 animate-fadeIn">
      {/* Stage Header with Segmented Navigation ([ BRAND SYSTEM ] vs [ PRODUCT BUILD ]) */}
      <BuildHeader
        report={buildReport}
        activeBuildArea={activeBuildArea}
        onSelectBuildArea={(area) => {
          setActiveBuildArea(area);
          setActiveSection('all');
          // Smooth scroll accurately to the start of the selected workspace without jumping to bottom
          setTimeout(() => {
            if (area === 'product') {
              const el = document.getElementById('product-build');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            } else {
              const el = document.getElementById('brand-system');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }, 40);
        }}
        activeSection={activeSection}
        onSelectSection={(id) => {
          setActiveSection(id);
          if (id === 'roadmap') setShowRoadmapSection(true);
          if (id === 'council') setShowCouncilSection(true);
          if (id === 'handoff') setShowHandoffSection(true);
          if (id !== 'all') {
            setTimeout(() => {
              const el = document.getElementById(`section-${id}`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 40);
          }
        }}
        onRefresh={() => {
          refreshBuildArchitecture();
          refreshBrandRoadmap();
        }}
      />

      {/* Discovery Warning / Sample Loader if project is empty */}
      {!hasDiscovery && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-amber-300">
              Limited Upstream Venture Discovery
            </h3>
            <p className="text-xs text-amber-200/80 mt-1 max-w-xl">
              Stage 05 transforms upstream discovery into a concrete Brand Identity System (05A) and Engineering Architecture (05B). Load a sample venture to inspect the full system.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadSampleVenture('skincare_d2c')}
              className="px-3.5 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-amber-300 border border-amber-500/40 text-xs font-mono font-medium transition-colors"
            >
              🌿 Skincare D2C
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('restaurant_ai')}
              className="px-3.5 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-amber-300 border border-amber-500/40 text-xs font-mono font-medium transition-colors"
            >
              ⚡ Restaurant AI
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('tutoring_marketplace')}
              className="px-3.5 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-amber-300 border border-amber-500/40 text-xs font-mono font-medium transition-colors"
            >
              🎓 Tutoring Mkt
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STAGE 05A — BRAND SYSTEM
          ======================================================== */}
      {activeBuildArea === 'brand' && (
        <div id="brand-system" className="space-y-8 animate-fadeIn scroll-mt-28">
          {/* Section banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0E1520] border border-blue-500/30">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                  BUILD AREA 05A: BRAND SYSTEM
                </span>
                <h2 className="text-sm font-bold text-[#F3F4F6]">
                  Active Visual Identity Creation &amp; System Generation
                </h2>
              </div>
            </div>
            <span className="text-xs font-mono text-[#738095] hidden sm:inline-block">
              Dynamic Vector Mark • WCAG AA Palette • Typographic Hierarchy
            </span>
          </div>

          {/* 1. Brand DNA */}
          {(activeSection === 'all' || activeSection === 'dna') && (
            <div id="section-dna" className="space-y-6">
              <BrandDNAMap nodes={brandReport.brandDnaNodes} />
            </div>
          )}

          {/* 2. Positioning Statement Builder */}
          {(activeSection === 'all' || activeSection === 'positioning') && (
            <div id="section-positioning" className="space-y-6">
              <PositioningStatementBuilder
                positioning={brandReport.positioningStatement}
                onChangeField={updatePositioningStatement}
              />
            </div>
          )}

          {/* 3. Brand Personality, Voice, and Tagline Builder */}
          {(activeSection === 'all' || activeSection === 'personality') && (
            <div id="section-personality" className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <BrandPersonality
                  traits={brandReport.personalityTraits}
                  onUpdateTrait={updateBrandPersonality}
                />

                <BrandVoice
                  brandVoice={brandReport.brandVoice}
                  ventureName={ventureName}
                  onToggleAttribute={toggleBrandVoice}
                  onUpdateTransformation={updateVoiceTransformation}
                />

                <TaglineBuilder
                  workspace={brandReport.taglineWorkspace}
                  onSelectTagline={selectTagline}
                  onRegenerateTaglines={refreshBrandRoadmap}
                />
              </div>
            </div>
          )}

          {/* 4. Logo Generator & Customizer */}
          {(activeSection === 'all' || activeSection === 'logo') && (
            <div id="section-logo" className="space-y-6">
              <LogoGenerator
                logoSystem={brandReport.logoGenerator}
                ventureName={ventureName}
                onSelectConcept={selectLogoConcept}
                onCustomize={customizeLogo}
              />
            </div>
          )}

          {/* 5. Color System */}
          {(activeSection === 'all' || activeSection === 'color') && (
            <div id="section-color" className="space-y-6">
              <ColorSystem
                colorSystem={brandReport.colorSystem}
                onUpdateSwatch={updateColorSwatch}
              />
            </div>
          )}

          {/* 6. Typography System */}
          {(activeSection === 'all' || activeSection === 'typography') && (
            <div id="section-typography" className="space-y-6">
              <TypographySystem
                typographySystem={brandReport.typographySystem}
                ventureName={ventureName}
                tagline={brandReport.taglineWorkspace.activeTagline}
                onSelectPair={selectTypography}
              />
            </div>
          )}

          {/* 7. Official Brand Identity Board (Visual Synthesis) */}
          {(activeSection === 'all' || activeSection === 'board') && (
            <div id="section-board" className="space-y-6">
              <BrandIdentityBoard board={brandReport.brandBoard} />
            </div>
          )}

          {/* 8. Customer Experience Journey & Touchpoints */}
          {(activeSection === 'all' || activeSection === 'touchpoints') && (
            <div id="section-touchpoints" className="space-y-6">
              <CustomerExperienceMap touchpoints={brandReport.customerExperience.touchpoints} />
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          STAGE 05B — PRODUCT BUILD
          ======================================================== */}
      {activeBuildArea === 'product' && (
        <div id="product-build" className="space-y-8 animate-fadeIn scroll-mt-28">
          {/* Section banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0E1520] border border-blue-500/30">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  BUILD AREA 05B: PRODUCT BUILD
                </span>
                <h2 className="text-sm font-bold text-[#F3F4F6]">
                  Engineering Specification, System Architecture &amp; Execution Readiness
                </h2>
              </div>
            </div>
            <span className="text-xs font-mono text-[#738095] hidden sm:inline-block">
              Software / Hardware / Hybrid Modular Spec
            </span>
          </div>

          {/* Compact Readiness Summary Bar (Replaces duplicated 9-card section) */}
          <div className="rounded-xl bg-[#080B10] border border-[#263244] p-3 text-xs">
            <button
              type="button"
              onClick={() => setShowReadinessOverview((prev) => !prev)}
              className="w-full flex items-center justify-between text-left group transition-colors"
            >
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-mono text-xs text-[#CBD5E1]">
                  Readiness Score: <strong className="text-white font-mono">{buildReport.readinessOverview.overallScore}%</strong> • Status: <strong className="text-cyan-400 font-mono">{buildReport.readinessOverview.buildStatus}</strong>
                </span>
              </div>
              <span className="text-xs font-mono text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                {showReadinessOverview ? 'Hide Readiness Breakdown ▲' : 'Inspect 9 Readiness Metrics ▼'}
              </span>
            </button>
            {showReadinessOverview && (
              <div className="mt-3 pt-3 border-t border-[#1C2635] animate-fadeIn">
                <BuildReadinessOverview overview={buildReport.readinessOverview} />
              </div>
            )}
          </div>

          {/* CORE SECTION 01: Product Blueprint & Features */}
          {(activeSection === 'all' || activeSection === 'blueprint') && (
            <div id="section-blueprint" className="space-y-8 scroll-mt-28">
              <ProductBlueprint blueprint={buildReport.blueprint} />
              <FeatureBehaviorFlow flows={buildReport.featureBehaviorFlows || []} />
              <MVPScopeMatrix
                mvpScope={buildReport.mvpScope}
                onUpdatePriority={updateFeaturePriority}
                onUpdateFeature={updateFeatureDetails}
                onAddCustomFeature={addCustomFeature}
              />
              <FeatureArchitectureTree featureTree={buildReport.featureTree} />
            </div>
          )}

          {/* CORE SECTION 02: Architecture & Stack */}
          {(activeSection === 'all' || activeSection === 'architecture') && (
            <div id="section-architecture" className="space-y-8 scroll-mt-28">
              <SystemArchitectureVisualizer systemArchitecture={buildReport.systemArchitecture} />
              <TechStackBuilder
                techStack={buildReport.techStack}
                onUpdateTech={updateTechStackItem}
              />
              <APIIntegrationMap apiIntegrations={buildReport.apiIntegrations} />
              <AIArchitectureDiagram aiArchitecture={buildReport.aiArchitecture} />
            </div>
          )}

          {/* CORE SECTION 03: Data & Flows */}
          {(activeSection === 'all' || activeSection === 'data') && (
            <div id="section-data" className="space-y-8 scroll-mt-28">
              <DataEntityModel dataModel={buildReport.dataModel} />
              <ProductUserFlow userJourney={buildReport.userJourney} />
              <ScreenArchitecture screenArchitecture={buildReport.screenArchitecture} />
            </div>
          )}

          {/* SECONDARY SECTION 04: Build Roadmap & Tasks (Collapsed by default) */}
          <div id="section-roadmap" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-5 shadow-lg space-y-4 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
              <div className="flex items-center gap-2.5">
                <ListTodo className="w-4 h-4 text-blue-400" />
                <div>
                  <h3 className="text-sm font-bold text-[#F3F4F6]">
                    Build Roadmap &amp; Implementation Tasks
                  </h3>
                  <span className="text-[11px] font-mono text-[#738095]">
                    {buildReport.roadmap.totalTasksCount} tasks across {buildReport.roadmap.phases.length} phases • Critical Path Mapped
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRoadmapSection((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-xs font-mono text-blue-400 hover:text-blue-300 border border-[#263244] transition-colors"
              >
                {showRoadmapSection || activeSection === 'roadmap' ? 'Collapse Details ▲' : '+ Expand Roadmap Details ▼'}
              </button>
            </div>
            {(showRoadmapSection || activeSection === 'roadmap') && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                <BuildDependencyGraph dependencyGraph={buildReport.dependencyGraph} />
                <BuildRoadmapBoard
                  roadmap={buildReport.roadmap}
                  onToggleTask={toggleBuildTask}
                  onAddCustomTask={addCustomBuildTask}
                />
              </div>
            )}
          </div>

          {/* SECONDARY SECTION 05: Risk Matrix & Decision Governance (Collapsed by default) */}
          <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-[#F3F4F6]">
                    Build Risk Governance &amp; Decision Board
                  </h3>
                  <span className="text-[11px] font-mono text-[#738095]">
                    {buildReport.riskMatrix.risks.length} evaluated risks • {buildReport.decisionBoard.decisions.length} architectural decisions
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRiskSection((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-xs font-mono text-amber-400 hover:text-amber-300 border border-[#263244] transition-colors"
              >
                {showRiskSection ? 'Collapse Governance ▲' : '+ Expand Risk & Decisions ▼'}
              </button>
            </div>
            {showRiskSection && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                <BuildRiskMatrix riskMatrix={buildReport.riskMatrix} />
                <ArchitectureChallenger challengerTests={buildReport.challengerTests} />
                <BuildDecisionBoard
                  decisionBoard={buildReport.decisionBoard}
                  onMoveDecision={moveBuildDecision}
                  onAddDecision={addBuildDecision}
                />
              </div>
            )}
          </div>

          {/* SECONDARY SECTION 06: Brand to Product Consistency (Collapsed by default) */}
          <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-[#F3F4F6]">
                    Brand &rarr; Product Token Translation
                  </h3>
                  <span className="text-[11px] font-mono text-[#738095]">
                    {buildReport.brandConsistency.tokens.length} token rules ensuring visual identity and voice consistency
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConsistencySection((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-xs font-mono text-purple-400 hover:text-purple-300 border border-[#263244] transition-colors"
              >
                {showConsistencySection ? 'Collapse Tokens ▲' : '+ Expand Token Translation ▼'}
              </button>
            </div>
            {showConsistencySection && (
              <div className="pt-2 animate-fadeIn">
                <BrandProductConsistency brandConsistency={buildReport.brandConsistency} />
              </div>
            )}
          </div>

          {/* SECONDARY SECTION 07: Specialist Advisory & Council Synthesis (Collapsed by default) */}
          <div id="section-council" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-5 shadow-lg space-y-4 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-[#F3F4F6]">
                    Specialist Advisory &amp; AI Council Synthesis
                  </h3>
                  <span className="text-[11px] font-mono text-[#738095]">
                    Multi-agent architectural perspectives and build specialist chatbot
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCouncilSection((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-xs font-mono text-cyan-400 hover:text-cyan-300 border border-[#263244] transition-colors"
              >
                {showCouncilSection || activeSection === 'council' ? 'Collapse Advisory ▲' : '+ Expand Council & Specialist ▼'}
              </button>
            </div>
            {(showCouncilSection || activeSection === 'council') && (
              <div className="space-y-6 pt-2 animate-fadeIn">
                <AICouncilBuildPanel councilDiscussion={buildReport.councilDiscussion} />
                <BuildSpecialistChat
                  messages={buildSpecialistMessages}
                  onSendMessage={sendBuildSpecialistQuery}
                  ventureName={ventureName}
                />
              </div>
            )}
          </div>

          {/* SECONDARY SECTION 08: Stage 06 Execution Handoff (Collapsed by default) */}
          <div id="section-handoff" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-5 shadow-lg space-y-4 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-[#F3F4F6]">
                    Stage 06 Execution Readiness Handoff
                  </h3>
                  <span className="text-[11px] font-mono text-[#738095]">
                    {buildReport.handoff.readinessScore}% operational criteria met • {buildReport.handoff.isReady ? 'Ready for Stage 06' : 'Prerequisites Pending'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHandoffSection((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-xs font-mono text-emerald-400 hover:text-emerald-300 border border-[#263244] transition-colors"
              >
                {showHandoffSection || activeSection === 'handoff' ? 'Collapse Handoff ▲' : '+ Expand Handoff Dossier ▼'}
              </button>
            </div>
            {(showHandoffSection || activeSection === 'handoff') && (
              <div className="pt-2 animate-fadeIn">
                <BuildHandoff
                  handoff={buildReport.handoff}
                  onMarkStageCompleted={() => markStageCompleted('build')}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
