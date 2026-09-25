import React, { useState, useEffect } from 'react';
import { useProject } from '../context/ProjectContext';
import { MarketHeader } from '../components/market-intelligence/MarketHeader';
import { PositioningMatrix } from '../components/market-intelligence/PositioningMatrix';
import { CompetitorComparisonView } from '../components/market-intelligence/CompetitorComparisonView';
import { OpportunityWhitespaceMap } from '../components/market-intelligence/OpportunityWhitespaceMap';
import { DifferentiatorEngineView } from '../components/market-intelligence/DifferentiatorEngineView';
import { CustomerSegmentsView } from '../components/market-intelligence/CustomerSegmentsView';
import { MarketTrendsView } from '../components/market-intelligence/MarketTrendsView';
import { MarketSizeFrameworkView } from '../components/market-intelligence/MarketSizeFrameworkView';
import { MarketRiskHeatmap } from '../components/market-intelligence/MarketRiskHeatmap';
import { EvidenceIntegrityView } from '../components/market-intelligence/EvidenceIntegrityView';
import { AICouncilPanel } from '../components/market-intelligence/AICouncilPanel';
import { MarketSpecialistChat } from '../components/market-intelligence/MarketSpecialistChat';
import { MarketDecisionAndHandoff } from '../components/market-intelligence/MarketDecisionAndHandoff';
import { CompetitorRoadmapsModal } from '../components/brand-roadmap/CompetitorRoadmapsModal';
import { AlertCircle, ArrowRight, Compass, Target, Zap, Users, Activity, AlertOctagon, ShieldCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MarketIntelligencePage: React.FC = () => {
  const {
    state,
    marketReport,
    brandReport,
    specialistMessages,
    refreshMarketIntelligence,
    saveMarketIntelligenceReport,
    addCompetitor,
    updatePositioningAxes,
    sendSpecialistQuery,
    markStageCompleted,
    hasMinimumDiscovery,
    loadSampleVenture,
  } = useProject();

  // Deterministically ensure scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const main = document.querySelector('main');
    if (main) {
      main.scrollTop = 0;
      main.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  const [activeTab, setActiveTab] = useState<
    'all' | 'landscape' | 'whitespace' | 'differentiator' | 'segments' | 'trends' | 'risks' | 'evidence' | 'specialist'
  >('all');
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);

  const ventureName = state.idea.name || state.project.name || 'Untitled Venture';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* 1. MARKET INTELLIGENCE HEADER */}
      <section id="section-header">
        <MarketHeader
          report={marketReport}
          onRefresh={refreshMarketIntelligence}
          ventureName={ventureName}
        />
      </section>

      {/* Advisory Notice if user navigated directly without Stage 01 context */}
      {!hasMinimumDiscovery && (
        <div className="p-4 rounded-lg bg-[#FDFCF8] border border-[#8A6D2B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#8A6D2B] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-[#2B3D4F]">
                Preliminary Discovery Grounding
              </div>
              <p className="text-xs text-[#4A5E73] mt-0.5 leading-relaxed">
                Stage 01 Idea Lab has minimal input. Market intelligence is running on preliminary archetypes. Load a pre-configured seed case to test full dynamic capabilities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => loadSampleVenture('skincare_d2c')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            >
              🌿 Skincare D2C
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('restaurant_ai')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            >
              ⚡ Restaurant AI
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('tutoring_marketplace')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            >
              🎓 Tutoring Mkt
            </button>
            <Link
              to="/idea-lab"
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#2B3D4F] text-white hover:bg-[#3E5770] transition-colors inline-flex items-center gap-1"
            >
              Complete Idea Lab <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* View Switcher Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FDFCF8] border border-[#DDD5C5] overflow-x-auto scrollbar-none text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'all'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          All Intelligence Views
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('landscape')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'landscape'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Competitive Landscape</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('whitespace')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'whitespace'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Market Whitespace</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('differentiator')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'differentiator'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Differentiator Engine</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('segments')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'segments'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Customer Segments</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('trends')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'trends'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Trend Signals & Sizing</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('risks')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'risks'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Market Risk Heatmap</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('evidence')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'evidence'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Evidence Integrity</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('specialist')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'specialist'
              ? 'bg-[#2B3D4F] text-white font-semibold shadow-sm'
              : 'text-[#4A5E73] hover:text-[#2B3D4F] hover:bg-[#ECE6DA]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Specialist & Council</span>
        </button>
      </div>

      {/* 2. COMPETITIVE LANDSCAPE — VISUAL FIRST */}
      {(activeTab === 'all' || activeTab === 'landscape') && (
        <section id="section-competitive-landscape" className="space-y-6">
          <PositioningMatrix
            competitors={marketReport.competitors}
            availableAxes={marketReport.availableAxes}
            selectedAxes={marketReport.selectedAxes}
            onUpdateAxes={updatePositioningAxes}
            onAddCompetitor={addCompetitor}
            onOpenCompetitorRoadmap={() => setIsRoadmapModalOpen(true)}
            ventureName={ventureName}
          />
          <CompetitorComparisonView competitors={marketReport.competitors} />
        </section>
      )}

      {/* Competitor Roadmaps Evolution Modal */}
      <CompetitorRoadmapsModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
        competitors={brandReport.competitorRoadmaps}
        comparisons={brandReport.competitorComparisons}
        ventureName={ventureName}
      />

      {/* 3. MARKET WHITESPACE / GAP ANALYSIS */}
      {(activeTab === 'all' || activeTab === 'whitespace') && (
        <section id="section-whitespace" className="space-y-6">
          <OpportunityWhitespaceMap opportunityGaps={marketReport.opportunityGaps} />
        </section>
      )}

      {/* 4. DIFFERENTIATOR ENGINE */}
      {(activeTab === 'all' || activeTab === 'differentiator') && (
        <section id="section-differentiator" className="space-y-6">
          <DifferentiatorEngineView
            data={marketReport.differentiatorEngine}
            ventureName={ventureName}
          />
        </section>
      )}

      {/* 5. CUSTOMER SEGMENTS */}
      {(activeTab === 'all' || activeTab === 'segments') && (
        <section id="section-customer-segments" className="space-y-6">
          <CustomerSegmentsView segments={marketReport.customerSegments} />
        </section>
      )}

      {/* 6. DEMAND / TREND SIGNALS & MARKET SIZING */}
      {(activeTab === 'all' || activeTab === 'trends') && (
        <section id="section-trends" className="space-y-6">
          <MarketTrendsView trends={marketReport.trends} />
          <MarketSizeFrameworkView marketSize={marketReport.marketSize} />
        </section>
      )}

      {/* 7. MARKET RISK / HEATMAP */}
      {(activeTab === 'all' || activeTab === 'risks') && (
        <section id="section-risks" className="space-y-6">
          <MarketRiskHeatmap risks={marketReport.riskHeatmap} />
        </section>
      )}

      {/* 8. EVIDENCE INTEGRITY */}
      {(activeTab === 'all' || activeTab === 'evidence') && (
        <section id="section-evidence" className="space-y-6">
          <EvidenceIntegrityView
            evidenceLog={marketReport.evidenceLog}
            evidenceSummary={marketReport.brief.evidenceQualitySummary}
          />
        </section>
      )}

      {/* 9. SPECIALIST CHAT / AI COUNCIL & HANDOFF */}
      {(activeTab === 'all' || activeTab === 'specialist') && (
        <section id="section-specialist" className="space-y-6">
          <AICouncilPanel synthesis={marketReport.aiCouncil} />
          <MarketSpecialistChat
            messages={specialistMessages}
            onSendMessage={sendSpecialistQuery}
            ventureName={ventureName}
          />
        </section>
      )}

      {/* STAGE 03 → STAGE 04 HANDOFF BRIEF & PERSISTENCE */}
      <section id="section-handoff">
        <MarketDecisionAndHandoff
          report={marketReport}
          onSaveReport={saveMarketIntelligenceReport}
          onMarkStageCompleted={markStageCompleted}
        />
      </section>
    </div>
  );
};
