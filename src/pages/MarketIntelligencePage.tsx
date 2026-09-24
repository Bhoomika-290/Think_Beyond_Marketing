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
import { AlertCircle, ArrowRight, Compass, Target, Zap, Users, Activity, AlertOctagon, ShieldCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MarketIntelligencePage: React.FC = () => {
  const {
    state,
    marketReport,
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
        <div className="p-4 rounded-lg bg-[#111823] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-[#F3F4F6]">
                Preliminary Discovery Grounding
              </div>
              <p className="text-xs text-[#AAB4C3] mt-0.5 leading-relaxed">
                Stage 01 Idea Lab has minimal input. Market intelligence is running on preliminary archetypes. Load a pre-configured seed case to test full dynamic capabilities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => loadSampleVenture('coffee_d2c')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
            >
              ☕ Sample D2C
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('ai_saas')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
            >
              ⚡ Sample SaaS
            </button>
            <Link
              to="/idea-lab"
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#4D8DFF] text-white hover:bg-[#6EA8FF] transition-colors inline-flex items-center gap-1"
            >
              Complete Idea Lab <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* View Switcher Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0B1017] border border-[#263244] overflow-x-auto scrollbar-none text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'all'
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
          }`}
        >
          All Intelligence Views
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('landscape')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
            activeTab === 'landscape'
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
              ? 'bg-[#4D8DFF] text-white font-semibold shadow-sm'
              : 'text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#151E2B]'
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
            ventureName={ventureName}
          />
          <CompetitorComparisonView competitors={marketReport.competitors} />
        </section>
      )}

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
