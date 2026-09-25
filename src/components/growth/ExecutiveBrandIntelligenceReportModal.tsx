import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  ArrowLeft,
  Printer, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles,
  Target,
  Layers,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  LayoutGrid,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Compass,
  Zap,
  CheckSquare
} from 'lucide-react';
import type { LaunchGrowthReportData } from '../../types/growth';
import type { ProjectState } from '../../types/project';
import type { ExecutiveBrandIntelligenceReport } from '../../types/executiveReport';
import { generateExecutiveBrandReport } from '../../services/intelligenceReportEngine';

interface ExecutiveBrandIntelligenceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: LaunchGrowthReportData;
  projectState: ProjectState;
  brandReport?: any;
  buildReport?: any;
  executionReport?: any;
  simulationReport?: any;
  marketReport?: any;
}

export const ExecutiveBrandIntelligenceReportModal: React.FC<ExecutiveBrandIntelligenceReportModalProps> = ({
  isOpen,
  onClose,
  report: launchReport,
  projectState,
  brandReport,
  buildReport,
  executionReport,
  simulationReport,
  marketReport,
}) => {
  const [activePageView, setActivePageView] = useState<'all' | 1 | 2 | 3 | 4>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [synthesisStep, setSynthesisStep] = useState<number>(0);
  const [regeneratedReport, setRegeneratedReport] = useState<ExecutiveBrandIntelligenceReport | null>(null);

  // Keyboard Escape listener to close report
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const derivedReport = useMemo(() => 
    generateExecutiveBrandReport({
      projectState,
      launchReport,
      brandReport,
      buildReport,
      executionReport,
      simulationReport,
      marketReport,
    }),
    [projectState, launchReport, brandReport, buildReport, executionReport, simulationReport, marketReport]
  );

  const intelligenceReport = regeneratedReport || derivedReport;

  if (!isOpen) return null;


  const synthesisSteps = [
    'Aggregating multi-stage project state...',
    'Synthesizing brand thesis & market positioning...',
    'Constructing 8-stage venture creation flowchart...',
    'Mapping 9-step beginner startup journey & growth flywheel...',
    'Finalizing 4-Page Executive A4 Strategy Report...',
  ];

  const handleRegenerate = () => {
    setIsSynthesizing(true);
    setSynthesisStep(0);

    const stepInterval = setInterval(() => {
      setSynthesisStep((prev) => {
        if (prev < synthesisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setRegeneratedReport(
              generateExecutiveBrandReport({
                projectState,
                launchReport,
                brandReport,
                buildReport,
                executionReport,
                simulationReport,
                marketReport,
              })
            );
            setIsSynthesizing(false);
          }, 350);
          return prev;
        }
      });
    }, 400);
  };

  const handleCopySummary = () => {
    const p1 = intelligenceReport.page1;
    const p2 = intelligenceReport.page2;
    const p3 = intelligenceReport.page3;
    const p4 = intelligenceReport.page4;

    const summaryText = `=====================================================
EXECUTIVE BRAND INTELLIGENCE REPORT // 4-PAGE STRATEGY BRIEF
Venture: ${intelligenceReport.ventureName}
Generated: ${intelligenceReport.generatedAt} | ${intelligenceReport.version}
=====================================================

1. EXECUTIVE SNAPSHOT
• Category: ${p1.identity.category} (${p1.identity.productType})
• Target ICP: ${p1.identity.targetAudience} in ${p1.identity.location}
• Core Problem: ${p1.identity.problemStatement}
• Proposed Solution: ${p1.identity.solutionStatement}
• Value Proposition: ${p1.identity.valueProposition}
• Tagline: "${p1.brand.tagline}"
• Positioning: ${p1.brand.positioningWedge}

2. MARKET & COMPETITIVE INTELLIGENCE
• Positioning Wedge: ${p2.positioningWedge}
• Market Opportunity: ${p2.keyMarketOpportunity}
• Competitor Landscape: ${p2.competitorsNote}
• Top Risk: ${p2.riskOpportunity2x2.highImpactRisks[0]?.title || 'None'}

3. WHAT WE BUILT + VENTURE JOURNEY
• Scoped Features: ${p3.builtSummary.scopedFeatures.join(', ')}
• Simulation Status: ${p3.builtSummary.experienceSimulationStatus}
• Assets Generated: ${p3.builtSummary.growthAssetsSummary}

4. FOUNDER ACTION ROADMAP
• #1 Next Action: ${p4.first3Actions[0]?.action || 'None'} (${p4.first3Actions[0]?.why || ''})
• 30-Day Focus: ${p4.horizons[0]?.milestones.join('; ') || 'None'}
• Growth Loop: Acquire -> Activate -> Retain -> Learn -> Improve
=====================================================`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const p1 = intelligenceReport.page1;
  const p2 = intelligenceReport.page2;
  const p3 = intelligenceReport.page3;
  const p4 = intelligenceReport.page4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Workspace modal wrapper */}
      <div className="relative w-full max-w-5xl h-[96vh] flex flex-col bg-[#0B0F17] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden print:p-0 print:border-none print:shadow-none print:max-w-none print:h-auto print:bg-white">
        
        {/* Top Dark Header Toolbar (Screen only - Hidden in print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border-b border-[#1E293B] bg-[#0E1522] print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-xs font-mono font-bold text-white border border-[#475569] transition-colors"
              title="Close report and return to Launch & Growth (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back / Close</span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#94A3B8] uppercase font-bold tracking-wider">
                  Stage 09 Executive Deliverable
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
                  4-PAGE A4 DOCUMENT
                </span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Executive Brand Intelligence Report: <span className="text-[#38BDF8]">{intelligenceReport.ventureName}</span>
              </h3>
            </div>
          </div>

          {/* Page Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#111827] rounded-xl border border-[#1E293B]">
            <button
              type="button"
              onClick={() => setActivePageView('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                activePageView === 'all'
                  ? 'bg-[#3B82F6] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 inline mr-1" />
              All 4 Pages
            </button>
            <button
              type="button"
              onClick={() => setActivePageView(1)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                activePageView === 1
                  ? 'bg-[#3B82F6] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              P1 Snapshot
            </button>
            <button
              type="button"
              onClick={() => setActivePageView(2)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                activePageView === 2
                  ? 'bg-[#3B82F6] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              P2 Market
            </button>
            <button
              type="button"
              onClick={() => setActivePageView(3)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                activePageView === 3
                  ? 'bg-[#3B82F6] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              P3 What We Built
            </button>
            <button
              type="button"
              onClick={() => setActivePageView(4)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                activePageView === 4
                  ? 'bg-[#3B82F6] text-white shadow'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              P4 Action Plan
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={isSynthesizing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] hover:bg-[#1F2937] text-xs font-mono text-[#CBD5E1] hover:text-white border border-[#1E293B] transition-colors"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSynthesizing ? 'animate-spin text-[#3B82F6]' : ''}`} />
              <span>{isSynthesizing ? 'Synthesizing...' : 'Regenerate'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111827] hover:bg-[#1F2937] text-xs font-mono text-[#CBD5E1] hover:text-white border border-[#1E293B] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-xs font-mono font-bold text-[#0F172A] transition-colors shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#1F2937] transition-colors"
              aria-label="Close intelligence report"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Synthesis Progress Overlay */}
        {isSynthesizing && (
          <div className="absolute inset-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6] animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <div className="text-xs font-mono uppercase text-[#3B82F6] font-bold">
                Synthesizing Multi-Stage Project Intelligence
              </div>
              <div className="text-sm font-bold text-white max-w-md">
                {synthesisSteps[synthesisStep]}
              </div>
            </div>
            <div className="w-60 h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] transition-all duration-300"
                style={{ width: `${((synthesisStep + 1) / synthesisSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Document Viewing Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-12 bg-[#0F172A]/90 flex flex-col items-center scrollbar-thin print:bg-white print:p-0 print:overflow-visible print:space-y-0">
          
          {/* ================================================================= */}
          {/* PAGE 1: EXECUTIVE SNAPSHOT                                        */}
          {/* ================================================================= */}
          {(activePageView === 'all' || activePageView === 1) && (
            <div className="a4-page w-full max-w-[794px] min-h-[1123px] bg-white text-[#0F172A] p-8 sm:p-10 rounded-xl shadow-2xl border border-[#CBD5E1] flex flex-col justify-between print:rounded-none print:shadow-none print:border-none print:p-8 print:break-after-page print:m-0">
              <div className="space-y-5">
                
                {/* 1. Document Header */}
                <div className="flex items-start justify-between pb-3.5 border-b-2 border-[#0F172A]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#64748B] uppercase font-extrabold flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#1E40AF]" />
                      <span>THINK BEYOND MARKETING // EXECUTIVE INTELLIGENCE BRIEF</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-[#0F172A] mt-1">
                      {intelligenceReport.ventureName}
                    </h1>
                    <div className="text-xs font-mono text-[#2563EB] font-bold mt-0.5">
                      {p1.identity.category} • {p1.identity.productType}
                    </div>
                  </div>

                  <div className="text-right font-mono text-[10px] text-[#64748B] space-y-1">
                    <div>DATE: <span className="font-bold text-[#0F172A]">{intelligenceReport.generatedAt}</span></div>
                    <div>STATUS: <span className="font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">{intelligenceReport.readinessPercentage}% READINESS</span></div>
                  </div>
                </div>

                {/* 2. Structured Executive Identity Matrix (3 Clean Editorial Columns) */}
                <div className="border border-[#CBD5E1] rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#CBD5E1] grid grid-cols-1 sm:grid-cols-3 bg-[#F8FAFC]">
                  <div className="p-3.5 space-y-1">
                    <div className="text-[9px] font-mono uppercase font-bold text-[#64748B] flex items-center gap-1">
                      <Target className="w-3 h-3 text-[#2563EB]" />
                      <span>01 // Target ICP &amp; Market</span>
                    </div>
                    <div className="text-xs font-bold text-[#0F172A]">{p1.identity.targetAudience}</div>
                    <div className="text-[10px] text-[#475569] font-medium">{p1.identity.location}</div>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <div className="text-[9px] font-mono uppercase font-bold text-[#DC2626] flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-[#DC2626]" />
                      <span>02 // Unmet Problem</span>
                    </div>
                    <p className="text-[11px] text-[#0F172A] leading-snug font-medium">{p1.identity.problemStatement}</p>
                  </div>

                  <div className="p-3.5 space-y-1">
                    <div className="text-[9px] font-mono uppercase font-bold text-[#059669] flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#059669]" />
                      <span>03 // Core Solution</span>
                    </div>
                    <p className="text-[11px] text-[#0F172A] leading-snug font-medium">{p1.identity.solutionStatement}</p>
                  </div>
                </div>

                {/* 3. Connected Horizontal Flowchart: PROBLEM ➔ INSIGHT ➔ SOLUTION ➔ VALUE */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#1E3A8A] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Strategic Transformation Flowchart</span>
                  </div>

                  <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
                    {p1.strategicFlow.map((step, idx) => (
                      <React.Fragment key={step.stepNumber}>
                        <div 
                          className={`flex-1 p-3 rounded-xl border flex flex-col justify-between ${
                            idx === 0 ? 'bg-[#FEF2F2] border-[#FECACA]' :
                            idx === 1 ? 'bg-[#FFFBEB] border-[#FDE68A]' :
                            idx === 2 ? 'bg-[#EFF6FF] border-[#BFDBFE]' :
                            'bg-[#ECFDF5] border-[#A7F3D0]'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="text-[9px] font-mono font-black uppercase text-[#0F172A]">
                              {step.stepNumber} // {step.stepKey}
                            </div>
                            <div className="text-xs font-bold text-[#0F172A]">{step.title}</div>
                            <p className="text-[10px] text-[#334155] leading-snug">{step.detail}</p>
                          </div>
                        </div>
                        {idx < p1.strategicFlow.length - 1 && (
                          <div className="hidden sm:flex items-center justify-center text-[#94A3B8] px-0.5">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* 4. Brand Identity Visual Architecture Bar */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#475569] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Brand Visual System &amp; Positioning Tokens</span>
                  </div>

                  <div className="border border-[#CBD5E1] rounded-xl overflow-hidden bg-[#F8FAFC]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#CBD5E1] p-3.5 gap-3 sm:gap-0">
                      
                      {/* Brand Logo & Name */}
                      <div className="flex items-center gap-3 sm:pr-3">
                        <div 
                          className="w-12 h-12 rounded-xl text-white font-mono font-black text-lg flex items-center justify-center shadow shrink-0"
                          style={{ backgroundColor: p1.brand.primaryColor }}
                        >
                          {p1.brand.logoMonogram}
                        </div>
                        <div className="space-y-0.5">
                          <div className="text-sm font-black text-[#0F172A]">{p1.brand.name}</div>
                          <div className="text-[11px] font-mono text-[#059669] font-bold">&ldquo;{p1.brand.tagline}&rdquo;</div>
                        </div>
                      </div>

                      {/* Color Palette Hierarchy Bar */}
                      <div className="sm:px-3 space-y-1.5 pt-2 sm:pt-0">
                        <div className="text-[9px] font-mono uppercase font-bold text-[#64748B]">Color System Hierarchy</div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <div 
                              className="w-4 h-4 rounded border border-black/20 shadow-xs"
                              style={{ backgroundColor: p1.brand.primaryColor }}
                            />
                            <span className="font-mono text-[10px] font-bold text-[#0F172A]">{p1.brand.primaryColor}</span>
                          </div>
                          <div className="flex items-center gap-1.5 ml-2">
                            <div 
                              className="w-4 h-4 rounded border border-black/20 shadow-xs"
                              style={{ backgroundColor: p1.brand.accentColor }}
                            />
                            <span className="font-mono text-[10px] font-bold text-[#0F172A]">{p1.brand.accentColor}</span>
                          </div>
                        </div>
                        <div className="text-[9px] font-mono text-[#64748B]">
                          Typography: <span className="font-bold text-[#0F172A]">{p1.brand.typography}</span>
                        </div>
                      </div>

                      {/* Positioning Wedge Statement */}
                      <div className="sm:pl-3 space-y-1 pt-2 sm:pt-0">
                        <div className="text-[9px] font-mono uppercase font-bold text-[#1E3A8A]">Positioning Wedge</div>
                        <p className="text-[11px] text-[#1E293B] font-semibold leading-snug">{p1.brand.positioningWedge}</p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* 5. 8-Stage Venture Creation Stepper Line */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#475569] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                    <span>8-Stage Creation Journey Progress</span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 border border-[#CBD5E1] p-1.5 rounded-xl bg-[#F8FAFC]">
                    {p1.stageProgress.map((stg) => (
                      <div 
                        key={stg.stageNumber}
                        className={`p-1.5 rounded-lg text-center space-y-0.5 border ${
                          stg.isComplete 
                            ? 'bg-[#ECFDF5] border-[#A7F3D0]' 
                            : 'bg-white border-[#E2E8F0]'
                        }`}
                      >
                        <div className="text-[8px] font-mono font-bold text-[#64748B]">S0{stg.stageNumber}</div>
                        <div className="text-[9px] font-bold text-[#0F172A] truncate">{stg.stageName}</div>
                        <div className="text-[8px] font-mono text-[#059669] font-semibold truncate">{stg.keyOutput}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Page 1 Footer */}
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                <span>CONFIDENTIAL // EXECUTIVE STRATEGY DOCUMENT</span>
                <span>PAGE 1 OF 4</span>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PAGE 2: MARKET + COMPETITIVE INTELLIGENCE                         */}
          {/* ================================================================= */}
          {(activePageView === 'all' || activePageView === 2) && (
            <div className="a4-page w-full max-w-[794px] min-h-[1123px] bg-white text-[#0F172A] p-8 sm:p-10 rounded-xl shadow-2xl border border-[#CBD5E1] flex flex-col justify-between print:rounded-none print:shadow-none print:border-none print:p-8 print:break-after-page print:m-0">
              <div className="space-y-5">
                
                {/* Page 2 Header */}
                <div className="flex items-start justify-between pb-3.5 border-b-2 border-[#0F172A]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#64748B] uppercase font-extrabold">
                      PAGE 02 // MARKET &amp; COMPETITIVE INTELLIGENCE
                    </div>
                    <h2 className="text-2xl font-black text-[#0F172A] mt-0.5">
                      Competitive Wedge &amp; Strategic Risk Matrix
                    </h2>
                  </div>

                  <div className="text-right font-mono text-[10px] text-[#64748B]">
                    {p2.competitorsNote}
                  </div>
                </div>

                {/* Section A: 2D Cartesian Competitor Positioning Quadrant Map */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#1E3A8A] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>2D Market Positioning Map (Quadrant Analysis)</span>
                  </div>

                  <div className="relative h-44 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 flex flex-col justify-between overflow-hidden">
                    <div className="text-center text-[8px] font-mono font-bold text-[#64748B] uppercase">
                      ▲ {p2.positioningMap.yLabelTop}
                    </div>

                    <div className="flex items-center justify-between text-[8px] font-mono font-bold text-[#64748B] uppercase px-2">
                      <span>◀ {p2.positioningMap.xLabelLeft}</span>
                      <span>{p2.positioningMap.xLabelRight} ▶</span>
                    </div>

                    <div className="text-center text-[8px] font-mono font-bold text-[#64748B] uppercase">
                      ▼ {p2.positioningMap.yLabelBottom}
                    </div>

                    {/* Coordinate axes */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full border-t border-dashed border-[#CBD5E1]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="h-full border-l border-dashed border-[#CBD5E1]" />
                    </div>

                    {/* Rendered positioning nodes */}
                    {p2.positioningMap.items.map((node) => (
                      <div 
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                        style={{ left: `${node.x}%`, top: `${100 - node.y}%` }}
                      >
                        <div 
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-black shadow-sm ${
                            node.isProject
                              ? 'bg-[#1E40AF] text-white ring-2 ring-[#3B82F6]'
                              : 'bg-white text-[#334155] border border-[#CBD5E1]'
                          }`}
                        >
                          {node.name}
                        </div>
                        <span className="text-[7px] font-mono text-[#64748B] bg-white/95 px-1 rounded mt-0.5 border border-[#E2E8F0]">
                          {node.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Structured Competitor Comparison Table (No Cards) */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#475569] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Competitor Comparison &amp; Strategic Opportunity Table</span>
                  </div>

                  <div className="border border-[#CBD5E1] rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[10px]">
                      <thead className="bg-[#F1F5F9] border-b border-[#CBD5E1] font-mono font-bold text-[#475569] uppercase text-[9px]">
                        <tr>
                          <th className="p-2.5">Competitor</th>
                          <th className="p-2.5">Market Approach</th>
                          <th className="p-2.5">Observed Gap / Limitation</th>
                          <th className="p-2.5">Our Strategic Wedge</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E2E8F0]">
                        {p2.competitorBreakdown.map((comp, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                            <td className="p-2.5 font-bold font-mono text-[#0F172A] whitespace-nowrap">{comp.name}</td>
                            <td className="p-2.5 text-[#475569]">{comp.whatTheyDo}</td>
                            <td className="p-2.5 text-[#DC2626] font-medium">{comp.limitation}</td>
                            <td className="p-2.5 text-[#059669] font-bold">{comp.ourDifferentiator}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section C: Differentiation Flow Banner */}
                <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="text-[8px] font-mono uppercase font-bold text-[#1E3A8A]">Our Positioning Wedge</div>
                    <div className="text-xs font-black text-[#1E3A8A]">{p2.positioningWedge}</div>
                  </div>
                  <div className="text-left sm:text-right text-[10px] text-[#2563EB] font-mono font-semibold max-w-xs">
                    {p2.keyMarketOpportunity}
                  </div>
                </div>

                {/* Section D: True 2x2 Risk × Opportunity Crosshair Matrix */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#475569] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>2x2 Strategic Risk × Opportunity Matrix</span>
                  </div>

                  <div className="border border-[#CBD5E1] rounded-xl overflow-hidden divide-y divide-[#CBD5E1]">
                    {/* Top Row: High Impact */}
                    <div className="grid grid-cols-2 divide-x divide-[#CBD5E1]">
                      {/* High Impact Risks */}
                      <div className="p-3 bg-[#FEF2F2] space-y-1">
                        <div className="text-[9px] font-mono uppercase font-extrabold text-[#DC2626]">
                          ▲ High Impact // Risks to Mitigate
                        </div>
                        {p2.riskOpportunity2x2.highImpactRisks.map((r, i) => (
                          <div key={i} className="text-[10px] text-[#450A0A] leading-snug">
                            <span className="font-bold">• {r.title}:</span> {r.action}
                          </div>
                        ))}
                      </div>

                      {/* High Impact Opportunities */}
                      <div className="p-3 bg-[#ECFDF5] space-y-1">
                        <div className="text-[9px] font-mono uppercase font-extrabold text-[#059669]">
                          ▲ High Impact // Strategic Opportunities
                        </div>
                        {p2.riskOpportunity2x2.highImpactOpportunities.map((o, i) => (
                          <div key={i} className="text-[10px] text-[#064E3B] leading-snug">
                            <span className="font-bold">• {o.title}:</span> {o.rationale}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Row: Low Impact */}
                    <div className="grid grid-cols-2 divide-x divide-[#CBD5E1]">
                      {/* Watchlist */}
                      <div className="p-3 bg-[#F8FAFC] space-y-1">
                        <div className="text-[9px] font-mono uppercase font-extrabold text-[#64748B]">
                          ▼ Low Impact // Watch List (Defensive)
                        </div>
                        {p2.riskOpportunity2x2.watchList.map((w, i) => (
                          <div key={i} className="text-[10px] text-[#334155] leading-snug">
                            <span className="font-bold">• {w.title}:</span> {w.action}
                          </div>
                        ))}
                      </div>

                      {/* Explore */}
                      <div className="p-3 bg-[#EFF6FF] space-y-1">
                        <div className="text-[9px] font-mono uppercase font-extrabold text-[#2563EB]">
                          ▼ Low Impact // Explore (Upside)
                        </div>
                        {p2.riskOpportunity2x2.exploreList.map((e, i) => (
                          <div key={i} className="text-[10px] text-[#1E3A8A] leading-snug">
                            <span className="font-bold">• {e.title}:</span> {e.rationale}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Page 2 Footer */}
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                <span>CONFIDENTIAL // EXECUTIVE STRATEGY DOCUMENT</span>
                <span>PAGE 2 OF 4</span>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PAGE 3: WHAT WE BUILT + VENTURE JOURNEY                           */}
          {/* ================================================================= */}
          {(activePageView === 'all' || activePageView === 3) && (
            <div className="a4-page w-full max-w-[794px] min-h-[1123px] bg-white text-[#0F172A] p-8 sm:p-10 rounded-xl shadow-2xl border border-[#CBD5E1] flex flex-col justify-between print:rounded-none print:shadow-none print:border-none print:p-8 print:break-after-page print:m-0">
              <div className="space-y-5">
                
                {/* Page 3 Header */}
                <div className="flex items-start justify-between pb-3.5 border-b-2 border-[#0F172A]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#64748B] uppercase font-extrabold">
                      PAGE 03 // WHAT WE BUILT &amp; VENTURE CREATION JOURNEY
                    </div>
                    <h2 className="text-2xl font-black text-[#0F172A] mt-0.5">
                      Venture Flowchart &amp; Product Architecture
                    </h2>
                  </div>

                  <div className="text-right font-mono text-[10px] text-[#64748B]">
                    Stages 04–08 Synthesis
                  </div>
                </div>

                {/* Section A: Linear Connected Venture Journey Flowchart (Stages 01 ➔ 08) */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#1E3A8A] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Venture Creation Flowchart (Idea ➔ Launch)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {p3.journeyMilestones.map((m) => {
                      const isComplete = m.status === 'complete';

                      return (
                        <div 
                          key={m.stageNumber}
                          className={`p-2.5 rounded-xl border space-y-1 ${
                            isComplete ? 'bg-[#ECFDF5] border-[#A7F3D0]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-mono font-bold text-[#64748B]">
                              STAGE 0{m.stageNumber}
                            </span>
                            <span 
                              className={`text-[7px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                isComplete ? 'bg-[#059669] text-white' : 'bg-[#CBD5E1] text-[#475569]'
                              }`}
                            >
                              {m.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-[#0F172A]">{m.stageName}</div>
                          <div className="text-[9px] font-mono text-[#475569]">{m.keyOutput}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section B: 3-Tier Product Architecture Diagram */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#475569] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>3-Tier Product Architecture Diagram</span>
                  </div>

                  <div className="space-y-2 p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl">
                    {p3.builtSummary.architectureTiers.map((tier, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2.5 p-2 rounded-lg bg-white border border-[#E2E8F0] shadow-xs">
                        <div className="w-36 text-[10px] font-mono font-black text-[#1E3A8A] uppercase shrink-0 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-[#EFF6FF] text-[#1E3A8A] flex items-center justify-center text-[8px] font-bold">
                            T{idx + 1}
                          </span>
                          <span>{tier.tierName}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {tier.components.map((comp, cIdx) => (
                            <span key={cIdx} className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section C: MVP Scoped Features & Experience Simulation Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-1.5">
                    <div className="text-[9px] font-mono uppercase font-bold text-[#64748B] flex items-center gap-1">
                      <CheckSquare className="w-3 h-3 text-[#059669]" />
                      <span>Scoped MVP Feature Set</span>
                    </div>
                    <div className="space-y-1">
                      {p3.builtSummary.scopedFeatures.map((f, i) => (
                        <div key={i} className="text-[10px] text-[#0F172A] flex items-center gap-2">
                          <Check className="w-3 h-3 text-[#059669] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-1.5">
                    <div className="text-[9px] font-mono uppercase font-bold text-[#64748B] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#2563EB]" />
                      <span>Simulation &amp; Growth Assets</span>
                    </div>
                    <div className="text-xs font-bold text-[#059669]">{p3.builtSummary.experienceSimulationStatus}</div>
                    <div className="text-[10px] text-[#475569]">{p3.builtSummary.growthAssetsSummary}</div>
                  </div>
                </div>

              </div>

              {/* Page 3 Footer */}
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                <span>CONFIDENTIAL // EXECUTIVE STRATEGY DOCUMENT</span>
                <span>PAGE 3 OF 4</span>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PAGE 4: BEGINNER → STARTUP ACTION ROADMAP                         */}
          {/* ================================================================= */}
          {(activePageView === 'all' || activePageView === 4) && (
            <div className="a4-page w-full max-w-[794px] min-h-[1123px] bg-white text-[#0F172A] p-8 sm:p-10 rounded-xl shadow-2xl border border-[#CBD5E1] flex flex-col justify-between print:rounded-none print:shadow-none print:border-none print:p-8 print:break-after-page print:m-0">
              <div className="space-y-5">
                
                {/* Page 4 Header */}
                <div className="flex items-start justify-between pb-3.5 border-b-2 border-[#0F172A]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#64748B] uppercase font-extrabold">
                      PAGE 04 // BEGINNER → STARTUP ACTION ROADMAP
                    </div>
                    <h2 className="text-2xl font-black text-[#0F172A] mt-0.5">
                      Sequential Execution Flowchart &amp; Growth Flywheel
                    </h2>
                  </div>

                  <div className="text-right font-mono text-[10px] text-[#64748B]">
                    Founder Action Engine
                  </div>
                </div>

                {/* Section A: 9-Step Sequential Startup Journey Flowchart */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#1E3A8A] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    <span>9-Step Startup Flowchart (From Idea to Scale)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {p4.roadmapSteps.map((step) => (
                      <div 
                        key={step.number}
                        className={`p-2.5 rounded-xl border space-y-1 ${
                          step.status === 'complete' ? 'bg-[#ECFDF5] border-[#A7F3D0]' :
                          step.status === 'in_progress' ? 'bg-[#EFF6FF] border-[#BFDBFE]' :
                          'bg-[#F8FAFC] border-[#E2E8F0]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-black text-[#0F172A]">
                            {step.number} // {step.stepKey}
                          </span>
                          <span className="text-[7px] font-mono uppercase text-[#64748B] font-bold">
                            {step.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-[#0F172A] leading-snug">{step.whatToDo}</div>
                        <div className="text-[10px] text-[#475569] leading-snug">{step.why}</div>
                        <div className="text-[8px] font-mono text-[#059669] pt-1 border-t border-black/5 font-semibold">
                          Next: {step.nextAction}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section B: Top 3 Immediate Actions */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#DC2626] flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Immediate Top 3 Founder Actions</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {p4.first3Actions.map((item) => (
                      <div key={item.priority} className="p-2.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white font-mono font-black text-[9px] flex items-center justify-center">
                            #{item.priority}
                          </span>
                          <span className="text-[8px] font-mono text-[#7F1D1D] font-bold">{item.resolvingStage}</span>
                        </div>
                        <div className="text-xs font-bold text-[#450A0A] leading-snug">{item.action}</div>
                        <p className="text-[9px] text-[#7F1D1D] leading-snug">{item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section C: Growth & Retention Compounding Flywheel */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#059669] flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Customer Growth &amp; Retention Flywheel (Compounding Loop)</span>
                  </div>

                  <div className="border border-[#CBD5E1] rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#CBD5E1] grid grid-cols-1 sm:grid-cols-5 bg-[#F8FAFC]">
                    {p4.growthLoop.map((loop, idx) => (
                      <div key={idx} className="p-2.5 space-y-0.5 text-center">
                        <div className="text-[8px] font-mono font-black text-[#059669] uppercase">{loop.phase}</div>
                        <div className="text-[10px] font-bold text-[#0F172A] truncate">{loop.title}</div>
                        <div className="text-[9px] text-[#475569] leading-snug">{loop.action}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Page 4 Footer */}
              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                <span>THINK BEYOND MARKETING PLATFORM // SIGNED &amp; DELIVERED</span>
                <span>PAGE 4 OF 4</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
