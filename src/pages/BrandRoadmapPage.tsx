import React, { useEffect, useState, useRef } from 'react';
import { useProject } from '../context/ProjectContext';
import { BrandRoadmapHeader } from '../components/brand-roadmap/BrandRoadmapHeader';
import { BrandTransformationRoadmap } from '../components/brand-roadmap/BrandTransformationRoadmap';
import { BrandStrategicDecisions } from '../components/brand-roadmap/BrandStrategicDecisions';
import { FounderLearningResources } from '../components/brand-roadmap/FounderLearningResources';
import { CompetitorRoadmapsModal } from '../components/brand-roadmap/CompetitorRoadmapsModal';
import { BrandHandoff } from '../components/brand-roadmap/BrandHandoff';

type SectionTab = 'all' | 'roadmap' | 'decisions' | 'resources' | 'handoff';

export const BrandRoadmapPage: React.FC = () => {
  const {
    state,
    brandReport,
    refreshBrandRoadmap,
    markStageCompleted,
    loadSampleVenture,
  } = useProject();

  const [activeTab, setActiveTab] = useState<SectionTab>('all');
  const [isCompetitorModalOpen, setIsCompetitorModalOpen] = useState(false);
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
    <div ref={pageTopRef} className="space-y-8 pb-16 animate-fadeIn">
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
        onOpenCompetitorRoadmaps={() => setIsCompetitorModalOpen(true)}
      />

      {/* Discovery Warning / Sample Loader if project is empty */}
      {!hasDiscovery && (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-amber-300">
              Limited Upstream Venture Discovery
            </h3>
            <p className="text-xs text-amber-200/80 mt-1 max-w-xl">
              Stage 04 synthesizes your strategic Brand Roadmap from upstream discovery in Idea Lab and Market Intelligence. Load a sample venture to inspect the full strategic progression.
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
          { id: 'all', label: 'All Roadmap Views' },
          { id: 'roadmap', label: '01 Brand Transformation Roadmap' },
          { id: 'decisions', label: '02 Strategic Decisions & Reality Check' },
          { id: 'resources', label: '03 Founder Learning & Case Studies' },
          { id: 'handoff', label: '04 Stage 05 Build Handoff' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id as SectionTab);
              if (tab.id !== 'all') {
                const el = document.getElementById(`section-${tab.id}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
                : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 01. Strategic Brand Transformation Roadmap */}
      {(activeTab === 'all' || activeTab === 'roadmap') && (
        <BrandTransformationRoadmap
          milestones={brandReport.transformationRoadmap}
          ventureName={ventureName}
        />
      )}

      {/* 02. Brand Strategic Decisions & 4-Quadrant Reality Board */}
      {(activeTab === 'all' || activeTab === 'decisions') && (
        <BrandStrategicDecisions
          strategicDecisions={brandReport.strategicDecisions}
          decisionBoard={brandReport.decisionBoard}
          ventureName={ventureName}
        />
      )}

      {/* 03. Founder Learning & Strategic Case Studies */}
      {(activeTab === 'all' || activeTab === 'resources') && (
        <FounderLearningResources
          resources={brandReport.learningResources}
          category={brandReport.category}
          ventureName={ventureName}
        />
      )}

      {/* 04. Stage 05 Build Handoff Dossier */}
      {(activeTab === 'all' || activeTab === 'handoff') && (
        <div id="section-handoff" className="space-y-4">
          <BrandHandoff
            handoff={brandReport.stage05Handoff}
            onMarkStageComplete={() => markStageCompleted('brand-roadmap')}
          />
        </div>
      )}

      {/* Modal: Competitor Historical Evolution Roadmaps */}
      <CompetitorRoadmapsModal
        isOpen={isCompetitorModalOpen}
        onClose={() => setIsCompetitorModalOpen(false)}
        competitors={brandReport.competitorRoadmaps}
        ventureName={ventureName}
      />
    </div>
  );
};
