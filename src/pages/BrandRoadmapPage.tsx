import React, { useEffect, useState, useRef } from 'react';
import { useProject } from '../context/ProjectContext';
import { BrandRoadmapHeader } from '../components/brand-roadmap/BrandRoadmapHeader';
import { BrandTransformationRoadmap } from '../components/brand-roadmap/BrandTransformationRoadmap';
import { BrandStrategicDecisions } from '../components/brand-roadmap/BrandStrategicDecisions';
import { FounderLearningResources } from '../components/brand-roadmap/FounderLearningResources';
import { CompetitorRoadmapsModal } from '../components/brand-roadmap/CompetitorRoadmapsModal';
import { BrandHandoff } from '../components/brand-roadmap/BrandHandoff';

type SectionTab = 'all' | 'roadmap' | 'decisions' | 'resources' | 'handoff';

const SECTION_ANCHORS: Record<SectionTab, string | null> = {
  all: null,
  roadmap: 'section-roadmap',
  decisions: 'section-strategic-decisions',
  resources: 'section-resources',
  handoff: 'section-handoff',
};

const VALID_TABS: SectionTab[] = ['all', 'roadmap', 'decisions', 'resources', 'handoff'];

const toSectionTab = (id: string): SectionTab =>
  (VALID_TABS.includes(id as SectionTab) ? id : 'roadmap') as SectionTab;

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
          const tab = toSectionTab(id);
          setActiveTab(tab);
          const anchor = SECTION_ANCHORS[tab];
          if (anchor) {
            const el = document.getElementById(anchor);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        onRefresh={refreshBrandRoadmap}
        onOpenCompetitorRoadmaps={() => setIsCompetitorModalOpen(true)}
      />

      {/* Discovery Warning / Sample Loader if project is empty */}
      {!hasDiscovery && (
        <div className="rounded-2xl bg-[#FFF3E7] border border-[#F29A42]/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#F29A42]">
              Limited Upstream Venture Discovery
            </h3>
            <p className="text-xs text-[#60738F] mt-1 max-w-xl">
              Stage 04 synthesizes your strategic Brand Roadmap from upstream discovery in Idea Lab and Market Intelligence. Load a sample venture to inspect the full strategic progression.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => loadSampleVenture('skincare_d2c')}
              className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF4FB] text-[#F29A42] border border-[#F29A42]/30 text-xs font-mono font-medium transition-colors"
            >
              🌿 Skincare D2C
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('restaurant_ai')}
              className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF4FB] text-[#F29A42] border border-[#F29A42]/30 text-xs font-mono font-medium transition-colors"
            >
              ⚡ Restaurant AI
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('tutoring_marketplace')}
              className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEF4FB] text-[#F29A42] border border-[#F29A42]/30 text-xs font-mono font-medium transition-colors"
            >
              🎓 Tutoring Mkt
            </button>
          </div>
        </div>
      )}

      {/* Section View Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#FFFFFF] rounded-xl border border-[#E2EAF4] overflow-x-auto scrollbar-thin text-xs font-mono">
        {[
          { id: 'all', label: 'All Roadmap Views' },
          { id: 'roadmap', label: '01 Brand Transformation Roadmap' },
          { id: 'decisions', label: '02 Strategic Decisions & Reality Check' },
          { id: 'resources', label: '03 Founder Learning & Case Studies' },
          { id: 'handoff', label: '04 Stage 05 Build Handoff' },
        ].map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            onClick={() => {
              const next = toSectionTab(tabItem.id);
              setActiveTab(next);
              const anchor = SECTION_ANCHORS[next];
              if (anchor) {
                const el = document.getElementById(anchor);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === tabItem.id
                ? 'bg-[#14213D] text-white font-bold shadow-sm'
                : 'text-[#60738F] hover:text-[#14213D] hover:bg-[#EEF4FB]'
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {/* 01. Strategic Brand Transformation Roadmap */}
      {(activeTab === 'all' || activeTab === 'roadmap') && (
        <BrandTransformationRoadmap
          milestones={brandReport.transformationRoadmap ?? []}
          ventureName={ventureName}
        />
      )}

      {/* 02. Brand Strategic Decisions & 4-Quadrant Reality Board */}
      {(activeTab === 'all' || activeTab === 'decisions') && (
        <BrandStrategicDecisions
          strategicDecisions={brandReport.strategicDecisions ?? {
            recommendedPositioningDirection: '',
            differentiationTerritory: '',
            strategicPriorities: [],
            brandRisks: [],
            sequencingStrategy: '',
          }}
          decisionBoard={brandReport.decisionBoard ?? {
            decided: [],
            needsReview: [],
            openQuestions: [],
            validationRequired: [],
          }}
          ventureName={ventureName}
        />
      )}

      {/* 03. Founder Learning & Strategic Case Studies */}
      {(activeTab === 'all' || activeTab === 'resources') && (
        <FounderLearningResources
          resources={brandReport.learningResources ?? []}
          category={brandReport.category ?? 'venture'}
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
        competitors={brandReport.competitorRoadmaps ?? []}
        ventureName={ventureName}
      />
    </div>
  );
};
