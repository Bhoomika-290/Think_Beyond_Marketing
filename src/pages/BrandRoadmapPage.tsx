import React, { useEffect, useState, useRef } from 'react';
import { useProject } from '../context/ProjectContext';
import { BrandRoadmapHeader } from '../components/brand-roadmap/BrandRoadmapHeader';
import { BrandDNAMap } from '../components/brand-roadmap/BrandDNAMap';
import { BrandPositioningMap } from '../components/brand-roadmap/BrandPositioningMap';
import { MarketGapDifferentiator } from '../components/brand-roadmap/MarketGapDifferentiator';
import { PositioningStatementBuilder } from '../components/brand-roadmap/PositioningStatementBuilder';
import { BrandPersonality } from '../components/brand-roadmap/BrandPersonality';
import { BrandVoice } from '../components/brand-roadmap/BrandVoice';
import { TaglineBuilder } from '../components/brand-roadmap/TaglineBuilder';
import { LogoGenerator } from '../components/brand-roadmap/LogoGenerator';
import { ColorSystem } from '../components/brand-roadmap/ColorSystem';
import { TypographySystem } from '../components/brand-roadmap/TypographySystem';
import { BrandIdentityBoard } from '../components/brand-roadmap/BrandIdentityBoard';
import { CustomerExperienceMap } from '../components/brand-roadmap/CustomerExperienceMap';
import { BrandRoadmapTimeline } from '../components/brand-roadmap/BrandRoadmapTimeline';
import { BrandDecisionBoard } from '../components/brand-roadmap/BrandDecisionBoard';
import { BrandHandoff } from '../components/brand-roadmap/BrandHandoff';

type SectionTab = 'all' | 'dna' | 'positioning' | 'diff' | 'identity' | 'experience' | 'roadmap';

export const BrandRoadmapPage: React.FC = () => {
  const {
    state,
    brandReport,
    marketReport,
    updateBrandPersonality,
    toggleBrandVoice,
    updatePositioningStatement,
    selectDifferentiator,
    updateVoiceTransformation,
    selectTagline,
    selectLogoConcept,
    customizeLogo,
    updateColorSwatch,
    selectTypography,
    refreshBrandRoadmap,
    markStageCompleted,
    addCompetitor,
    updatePositioningAxes,
    loadSampleVenture,
  } = useProject();

  const [activeTab, setActiveTab] = useState<SectionTab>('all');
  const pageTopRef = useRef<HTMLDivElement>(null);

  // Guarantee that mounting or opening Stage 04 scrolls to the very top
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
    <div ref={pageTopRef} className="space-y-8 pb-16">
      {/* Stage Header & Status Indicators */}
      <BrandRoadmapHeader
        report={brandReport}
        activeSection={activeTab}
        onSelectSection={(id) => {
          setActiveTab(id as SectionTab);
          const el = document.getElementById(`section-${id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onRefresh={refreshBrandRoadmap}
      />

      {/* Discovery Warning / Sample Loader if project is empty */}
      {!hasDiscovery && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-amber-300">
              Limited Upstream Venture Discovery
            </h3>
            <p className="text-xs text-amber-200/80 mt-1 max-w-xl">
              Stage 04 synthesizes Brand Identity from your Idea Lab and Market Intelligence. Load a sample venture to inspect the full architecture in action.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadSampleVenture('coffee_d2c')}
              className="px-3.5 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-amber-300 border border-amber-500/40 text-xs font-mono font-medium transition-colors"
            >
              Load Coffee D2C
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('ai_saas')}
              className="px-3.5 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-amber-300 border border-amber-500/40 text-xs font-mono font-medium transition-colors"
            >
              Load AI SaaS
            </button>
          </div>
        </div>
      )}

      {/* Section View Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0B1017] rounded-xl border border-[#263244] overflow-x-auto scrollbar-thin text-xs font-mono">
        {[
          { id: 'all', label: 'All Brand Systems' },
          { id: 'dna', label: '01 Brand DNA' },
          { id: 'diff', label: '02 Differentiation' },
          { id: 'positioning', label: '03 Positioning Matrix' },
          { id: 'identity', label: '04 Visual Identity & Logo' },
          { id: 'experience', label: '05 Customer Journey' },
          { id: 'roadmap', label: '06 Roadmap & Decision' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as SectionTab)}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
                : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 01. Brand DNA */}
      {(activeTab === 'all' || activeTab === 'dna') && (
        <div id="section-dna" className="space-y-8 animate-fadeIn">
          <BrandDNAMap nodes={brandReport.brandDnaNodes} />
        </div>
      )}

      {/* 02. Differentiation & Market Gap */}
      {(activeTab === 'all' || activeTab === 'diff') && (
        <div id="section-diff" className="space-y-8 animate-fadeIn">
          <MarketGapDifferentiator
            candidates={brandReport.differentiatorChain.candidates}
            activeDifferentiatorId={brandReport.differentiatorChain.activeDifferentiatorId}
            onSelectDifferentiator={selectDifferentiator}
            onCustomEditDifferentiator={(id, text) => selectDifferentiator(id, text)}
          />
        </div>
      )}

      {/* 03. Positioning Matrix & Statement */}
      {(activeTab === 'all' || activeTab === 'positioning') && (
        <div id="section-positioning" className="space-y-8 animate-fadeIn">
          <BrandPositioningMap
            ventureName={ventureName}
            competitors={marketReport.competitors}
            currentAxes={marketReport.selectedAxes}
            availableAxes={marketReport.availableAxes}
            onUpdateAxes={updatePositioningAxes}
            onAddCompetitor={addCompetitor}
          />

          <PositioningStatementBuilder
            positioning={brandReport.positioningStatement}
            onChangeField={updatePositioningStatement}
          />
        </div>
      )}

      {/* 04. Visual Identity, Logo Generator, Colors, Typography, & Brand Board */}
      {(activeTab === 'all' || activeTab === 'identity') && (
        <div id="section-identity" className="space-y-8 animate-fadeIn">
          {/* Logo Generator - Core Feature */}
          <LogoGenerator
            logoSystem={brandReport.logoGenerator}
            ventureName={ventureName}
            onSelectConcept={selectLogoConcept}
            onCustomize={customizeLogo}
          />

          {/* Color & Typography Identity */}
          <div className="grid grid-cols-1 gap-8">
            <ColorSystem
              colorSystem={brandReport.colorSystem}
              onUpdateSwatch={updateColorSwatch}
            />

            <TypographySystem
              typographySystem={brandReport.typographySystem}
              ventureName={ventureName}
              tagline={brandReport.taglineWorkspace.activeTagline}
              onSelectPair={selectTypography}
            />
          </div>

          {/* Brand Personality & Voice Controls */}
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

          {/* Official Visual Brand Board */}
          <BrandIdentityBoard board={brandReport.brandBoard} />
        </div>
      )}

      {/* 05. Customer Experience Journey */}
      {(activeTab === 'all' || activeTab === 'experience') && (
        <div id="section-experience" className="space-y-8 animate-fadeIn">
          <CustomerExperienceMap touchpoints={brandReport.customerExperience.touchpoints} />
        </div>
      )}

      {/* 06. Brand Execution Roadmap, Decision Board, & Stage 05 Handoff */}
      {(activeTab === 'all' || activeTab === 'roadmap') && (
        <div id="section-roadmap" className="space-y-8 animate-fadeIn">
          <BrandRoadmapTimeline milestones={brandReport.roadmapTimeline.milestones} />

          <BrandDecisionBoard decisions={brandReport.decisionBoard} />

          <BrandHandoff
            handoff={brandReport.stage05Handoff}
            onMarkStageComplete={() => markStageCompleted('brand-roadmap')}
          />
        </div>
      )}
    </div>
  );
};
