import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Sparkles
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { generateLaunchGrowthReportData } from '../services/growthEngine';
import { LaunchControlCard } from '../components/growth/LaunchControlCard';
import { GrowthPremiumToolsView } from '../components/growth/GrowthPremiumToolsView';
import { BrandMonitoringCenter } from '../components/growth/BrandMonitoringCenter';
import { ExecutiveBrandIntelligenceReportModal } from '../components/growth/ExecutiveBrandIntelligenceReportModal';

export const LaunchGrowthPage: React.FC = () => {
  const { 
    state, 
    brandReport, 
    buildReport, 
    executionReport, 
    marketReport, 
    simulationReport,
    markStageCompleted 
  } = useProject();

  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Guarantee normal scroll position on mount & mark stage completed
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    markStageCompleted('launch-growth');
  }, [markStageCompleted]);

  // Compute live dynamic growth, readiness, and monitoring report derived strictly from Stages 01–07
  const report = useMemo(() => {
    return generateLaunchGrowthReportData(
      state,
      brandReport,
      buildReport,
      executionReport,
      marketReport,
      simulationReport
    );
  }, [state, brandReport, buildReport, executionReport, marketReport, simulationReport]);

  const ventureName = report.ventureName;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5 animate-fadeIn">
      {/* 1. Stage 08 Header with Prominent Stage 09 Dossier Trigger */}
      <div className="p-4 rounded-2xl bg-[#0D121B] border border-[#263244] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
              STAGE 08 // LAUNCH &amp; GROWTH
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#4D8DFF] border border-[#263244]">
              {report.ventureCategory}
            </span>
            <span className="text-xs font-mono text-[#738095]">
              • {report.operatingLocation}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Launch &amp; Growth Command Center
          </h1>
          <p className="text-xs text-[#AAB4C3] max-w-2xl leading-relaxed">
            Dynamic launch readiness diagnostics, interactive project synthesis, and visual brand telemetry matrix for {ventureName}.
          </p>
        </div>

        {/* Prominent Header Action: Brand Intelligence Report */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4D8DFF] hover:bg-[#3B82F6] text-[#080B10] font-mono text-xs font-bold transition-all shadow-lg shadow-[#4D8DFF]/20"
          >
            <FileText className="w-4 h-4" />
            <span>GENERATE BRAND INTELLIGENCE REPORT →</span>
          </button>
        </div>
      </div>

      {/* 2. Top of Page: Launch Readiness & Project Synthesis Command Center */}
      <LaunchControlCard 
        readiness={report.readinessSystem} 
        synthesis={report.synthesisData} 
      />

      {/* 3. Premium Growth Engine (Generate | Maintain | Meta | SEO | CRM) placed prominently near top */}
      <GrowthPremiumToolsView
        reels={report.generateModule.reels}
        carousels={report.generateModule.carousels}
        banners={report.generateModule.banners}
        campaigns={report.generateModule.campaigns}
        meta={report.metaWorkspace}
        seo={report.seoWorkspace}
        crm={report.crmWorkspace}
        maintain={report.maintainWorkspace}
        ventureName={ventureName}
      />

      {/* 4. Core Brand Monitoring Command Center & Real-Time Action Queue */}
      <BrandMonitoringCenter 
        monitoring={report.monitoringData} 
        ventureName={ventureName} 
      />

      {/* 5. Bottom Stage Navigation & Stage 09 Access */}
      <div className="p-4 rounded-xl bg-[#0D121B] border border-[#263244] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <Link
          to="/simulation"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#AAB4C3] hover:text-[#F3F4F6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Stage 07 // Experience Simulation</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsDossierOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-[#080B10] font-mono text-xs font-bold transition-all shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>GENERATE BRAND INTELLIGENCE REPORT (STAGE 09) →</span>
        </button>
      </div>

      {/* Stage 09 Executive Brand Intelligence Report (In-place workspace, no separate route) */}
      <ExecutiveBrandIntelligenceReportModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        report={report}
        projectState={state}
        brandReport={brandReport}
        buildReport={buildReport}
        executionReport={executionReport}
        simulationReport={simulationReport}
        marketReport={marketReport}
      />
    </div>
  );
};
