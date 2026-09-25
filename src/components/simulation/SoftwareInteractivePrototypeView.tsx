import React, { useState } from 'react';
import { 
  Terminal, 
  Zap, 
  Globe, 
  Play, 
  RotateCw, 
  CheckCircle2, 
  Sparkles,
  ShoppingBag,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  Database,
  Filter,
  Check,
  BarChart3,
  Table,
  Cpu,
  Layers,
  Activity,
  User,
  Sliders
} from 'lucide-react';
import { SimulationAgentBar } from './SimulationAgentBar';
import type { 
  SoftwareInteractivePrototype, 
  SimulatedDataSource, 
  SimulatedRecordItem,
  SoftwarePrototypeStageId,
  SimulationAppearance,
  SoftwareModificationState 
} from '../../types/simulation';

interface SoftwareInteractivePrototypeViewProps {
  walkthrough: SoftwareInteractivePrototype;
  appearance: SimulationAppearance;
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
}

export const SoftwareInteractivePrototypeView: React.FC<SoftwareInteractivePrototypeViewProps> = ({
  walkthrough,
  appearance,
  activeStageIndex: _activeStageIndex,
  onSelectStage,
}) => {
  const { 
    appName, 
    archetype,
    categoryTag, 
    workflowGoal, 
    activeScreenTitle, 
    dataSources: initialSources, 
    sampleRecords, 
    insightAction, 
    summaryMetrics,
    outcomeSummary 
  } = walkthrough;

  // Local interactive prototype state & AI Overrides
  const [softwareOverrides, setSoftwareOverrides] = useState<SoftwareModificationState>({});
  const [dataSources, setDataSources] = useState<SimulatedDataSource[]>(initialSources);
  const [prototypeStage, setPrototypeStage] = useState<SoftwarePrototypeStageId>('idle');
  const [selectedRecord, setSelectedRecord] = useState<SimulatedRecordItem | null>(sampleRecords[0] || null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasExecutedAction, setHasExecutedAction] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'workspace' | 'connectors' | 'automation' | 'telemetry'>('workspace');
  const [customSearchQuery, setCustomSearchQuery] = useState<string>('');

  const handleApplySoftwareOverrides = (updated: SoftwareModificationState) => {
    setSoftwareOverrides(updated);
  };

  const handleResetSoftwareOverrides = () => {
    setSoftwareOverrides({});
  };

  // Archetype specific UI Styling and Themes
  const getArchetypeStyles = () => {
    // Theme modifier
    const isLight = appearance.theme === 'light';
    const isGlass = appearance.surface === 'glass';

    const accentColor = 
      appearance.accent === 'green' ? '#10B981' :
      appearance.accent === 'orange' ? '#F59E0B' :
      appearance.accent === 'purple' ? '#8B5CF6' : '#4D8DFF';

    let frameBg = isLight ? 'bg-[#F8FAFC]' : 'bg-[#0B1017]';
    let cardBg = isLight ? 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A]' : 'bg-[#111823] border-[#263244] text-[#F3F4F6]';
    let textPrimary = isLight ? 'text-[#0F172A]' : 'text-[#F3F4F6]';
    let textSecondary = isLight ? 'text-[#64748B]' : 'text-[#AAB4C3]';
    let headerBg = isLight ? 'bg-[#FFFFFF] border-b border-[#E2E8F0]' : 'bg-[#080B10] border-b border-[#263244]';

    if (archetype === 'developer_tool') {
      frameBg = 'bg-[#0A0D14] font-mono';
    } else if (archetype === 'ai_workspace') {
      frameBg = isLight ? 'bg-[#FAF9F6]' : 'bg-[#0D1117]';
    }

    return { frameBg, cardBg, textPrimary, textSecondary, headerBg, accentColor, isGlass };
  };

  const ui = getArchetypeStyles();

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return ShoppingBag;
      case 'TrendingUp': return TrendingUp;
      case 'CreditCard': return CreditCard;
      case 'Terminal': return Terminal;
      case 'Cpu': return Cpu;
      case 'Layers': return Layers;
      case 'Activity': return Activity;
      case 'User': return User;
      default: return Globe;
    }
  };

  const handleToggleSource = (sourceId: string) => {
    setDataSources(prev => prev.map(s => s.id === sourceId ? { ...s, isConnected: !s.isConnected } : s));
  };

  const handleRunPipeline = () => {
    setIsProcessing(true);
    setPrototypeStage('processing');
    setTimeout(() => {
      setIsProcessing(false);
      setPrototypeStage('result');
      onSelectStage(3);
    }, 1100);
  };

  const handleExecuteOptimization = () => {
    setHasExecutedAction(true);
    setPrototypeStage('completed');
    onSelectStage(4);
  };

  const handleResetSimulation = () => {
    setPrototypeStage('idle');
    setHasExecutedAction(false);
    setIsProcessing(false);
    onSelectStage(0);
  };

  const filteredRecords = sampleRecords.filter(r => {
    const matchesCat = filterCategory === 'all' || r.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch = customSearchQuery === '' || r.title.toLowerCase().includes(customSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Prototype Lifecycle Progress Bar */}
      <div className="bg-[#111823] border border-[#263244] rounded-xl p-3 shadow-md flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
            Interactive SaaS Prototype // Live Simulator
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#4D8DFF] border border-[#33445A]">
            {categoryTag}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetSimulation}
            className="px-2.5 py-1 rounded text-[11px] font-mono text-[#AAB4C3] hover:text-white hover:bg-[#1A2536] border border-[#263244] transition-colors flex items-center gap-1"
          >
            <RotateCw className="w-3 h-3 text-[#738095]" />
            <span>Reset Prototype</span>
          </button>
        </div>
      </div>

      {/* 2. Standalone SaaS Application Canvas Frame (Customized per venture style & theme) */}
      <div className={`${ui.frameBg} border-2 border-[#263244] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}>
        
        {/* Browser Mockup Chrome Header */}
        <div className={`${ui.headerBg} px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <div className="flex items-center gap-3">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            </div>

            {/* URL Route Bar */}
            <div className="flex items-center gap-2 bg-[#111823] px-3 py-1 rounded-md border border-[#263244] text-[11px] font-mono text-[#738095]">
              <Globe className="w-3.5 h-3.5" style={{ color: ui.accentColor }} />
              <span className="text-[#F3F4F6] font-semibold">
                https://app.{appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.io
              </span>
              <span className="text-[#738095]">/workspace/live</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#93C5FD] border border-[#263244]">
              State: {prototypeStage.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Simulated Prototype</span>
            </span>
          </div>
        </div>

        {/* Workflow Mission Strip */}
        <div className="bg-[#080B10] px-4 py-2 border-b border-[#263244] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="text-[#AAB4C3] flex items-center gap-2 truncate">
            <span className="font-bold" style={{ color: ui.accentColor }}>MISSION:</span>
            <span className="truncate">{workflowGoal}</span>
          </div>
          <div className="text-[11px] text-[#738095] shrink-0">
            {activeScreenTitle}
          </div>
        </div>

        {/* Prototype Internal Navigation Bar */}
        <div className="bg-[#111823] border-b border-[#263244] px-4 py-2 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xs text-[#F3F4F6] mr-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ui.accentColor }} />
              <span>{appName}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('workspace')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'workspace' ? 'bg-[#4D8DFF] text-[#080B10] font-bold' : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
                }`}
              >
                1. Core Workspace
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('connectors')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'connectors' ? 'bg-[#4D8DFF] text-[#080B10] font-bold' : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
                }`}
              >
                2. Data Sources ({dataSources.filter(s => s.isConnected).length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('automation')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'automation' ? 'bg-[#4D8DFF] text-[#080B10] font-bold' : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
                }`}
              >
                3. Automations
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('telemetry')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'telemetry' ? 'bg-[#4D8DFF] text-[#080B10] font-bold' : 'text-[#AAB4C3] hover:text-white hover:bg-[#1A2536]'
                }`}
              >
                4. Telemetry
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRunPipeline}
              disabled={isProcessing}
              className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              style={{ backgroundColor: ui.accentColor, color: '#080B10' }}
            >
              {isProcessing ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Stream...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Live Ingestion</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prototype Main Interactive Canvas */}
        <div className="p-6 space-y-6">
          
          {/* TAB 1: CORE WORKSPACE VIEW */}
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              {/* Metric Pulse HUD */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {summaryMetrics
                  .filter((met) => !(softwareOverrides.hiddenMetricLabels || []).some(h => met.label.toLowerCase().includes(h.toLowerCase())))
                  .map((met, mIdx) => (
                    <div key={mIdx} className={`${ui.cardBg} p-3.5 rounded-xl space-y-1 shadow-inner`}>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#738095]">
                        <span>{met.label}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#1A2536] text-[#4D8DFF] border border-[#263244]">
                          {met.badge}
                        </span>
                      </div>
                      <div className="text-base font-bold">
                        {met.value}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Dynamic Prototype Analytics & Chart Visualization */}
              <div className={`${ui.cardBg} rounded-xl p-4 border border-[#263244] shadow-md space-y-3`}>
                <div className="flex items-center justify-between border-b border-[#263244] pb-2.5">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#4D8DFF]" />
                    <span className="text-xs font-mono font-bold text-[#F3F4F6]">
                      {softwareOverrides.chartTypeOverride === 'funnel'
                        ? (archetype === 'ecommerce' ? 'Storefront Conversion & Sizing Funnel' : 'Live Conversion Funnel Analysis')
                        : softwareOverrides.chartTypeOverride === 'timeseries'
                        ? (archetype === 'ecommerce' ? '30-Day Artisan Loom Dispatch Velocity' : '30-Day Ingestion & Attribution Trendlines')
                        : (archetype === 'ecommerce' ? 'Omnichannel D2C Channel & Fulfillment Breakdown' : 'Multi-Touch Channel Attribution Breakdown')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => handleApplySoftwareOverrides({ ...softwareOverrides, chartTypeOverride: 'attribution' })}
                      className={`px-2 py-0.5 rounded ${(!softwareOverrides.chartTypeOverride || softwareOverrides.chartTypeOverride === 'attribution') ? 'bg-[#263244] text-white font-bold' : 'text-[#738095] hover:text-white'}`}
                    >
                      {archetype === 'ecommerce' ? 'Channels' : 'Attribution'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySoftwareOverrides({ ...softwareOverrides, chartTypeOverride: 'funnel' })}
                      className={`px-2 py-0.5 rounded ${softwareOverrides.chartTypeOverride === 'funnel' ? 'bg-[#263244] text-white font-bold' : 'text-[#738095] hover:text-white'}`}
                    >
                      Funnel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySoftwareOverrides({ ...softwareOverrides, chartTypeOverride: 'timeseries' })}
                      className={`px-2 py-0.5 rounded ${softwareOverrides.chartTypeOverride === 'timeseries' ? 'bg-[#263244] text-white font-bold' : 'text-[#738095] hover:text-white'}`}
                    >
                      {archetype === 'ecommerce' ? 'Dispatch' : 'Trend'}
                    </button>
                  </div>
                </div>

                {/* RENDER FUNNEL VIEW */}
                {softwareOverrides.chartTypeOverride === 'funnel' && (
                  <div className="space-y-3 py-2">
                    {(archetype === 'ecommerce'
                      ? [
                          { stage: '1. Collection Capsule Visitors', count: '24,600', pct: 100, color: '#3B82F6', drop: '0%' },
                          { stage: '2. Garment PDP & Sizing Guide Viewed', count: '8,400', pct: 34.1, color: '#60A5FA', drop: '-65.9%' },
                          { stage: '3. Cart & Pincode Serviceability', count: '2,180', pct: 8.9, color: '#10B981', drop: '-74.0%' },
                          { stage: '4. Orders Dispatched & Delivered', count: '680', pct: 2.8, color: '#34D399', drop: '-68.8%' },
                        ]
                      : [
                          { stage: '1. Ad Impressions & Touchpoints', count: '128,400', pct: 100, color: '#3B82F6', drop: '0%' },
                          { stage: '2. High-Intent Landing Page Visits', count: '42,600', pct: 33.2, color: '#60A5FA', drop: '-66.8%' },
                          { stage: '3. Cart / Checkout Initiated', count: '12,800', pct: 10.0, color: '#10B981', drop: '-69.9%' },
                          { stage: '4. Verified Conversions & Revenue', count: '4,920', pct: 3.8, color: '#34D399', drop: '-61.5%' },
                        ]
                    ).map((step, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#F3F4F6] font-semibold">{step.stage}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-bold">{step.count} ({step.pct}%)</span>
                            <span className="text-[10px] text-[#F87171]">{step.drop}</span>
                          </div>
                        </div>
                        <div className="w-full h-3 bg-[#0D121B] rounded-full overflow-hidden border border-[#263244]">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${step.pct}%`, backgroundColor: step.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* RENDER TIMESERIES TREND VIEW */}
                {softwareOverrides.chartTypeOverride === 'timeseries' && (
                  <div className="space-y-2 py-2">
                    <div className="h-32 flex items-end gap-1.5 pt-4">
                      {[42, 55, 48, 62, 70, 65, 80, 74, 88, 92, 85, 96, 110, 105, 118, 124, 115, 130, 142, 138, 155, 160, 152, 170, 182, 176, 194, 205, 198, 220].map((val, bIdx) => (
                        <div key={bIdx} className="flex-1 bg-[#1E293B] hover:bg-[#4D8DFF] rounded-t transition-all group relative h-full flex items-end">
                          <div
                            className="w-full bg-[#3B82F6] group-hover:bg-[#60A5FA] rounded-t transition-all"
                            style={{ height: `${(val / 220) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#738095]">
                      <span>{archetype === 'ecommerce' ? 'Week 1 (Loom Pre-Order)' : 'Day 1 (Baseline)'}</span>
                      <span>{archetype === 'ecommerce' ? 'Week 2 (Cluster Shearing Dispatch)' : 'Day 15 (Optimization Trigger)'}</span>
                      <span>{archetype === 'ecommerce' ? 'Week 4 (Peak Winter Delivery)' : 'Day 30 (Current Run)'}</span>
                    </div>
                  </div>
                )}

                {/* RENDER DEFAULT CHANNEL BREAKDOWN VIEW */}
                {(!softwareOverrides.chartTypeOverride || softwareOverrides.chartTypeOverride === 'attribution') && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 py-2">
                    {(archetype === 'ecommerce'
                      ? [
                          { channel: 'Direct D2C Web & Mobile', share: '52.4%', roas: '71% Margin', spend: '₹4.8L Rev' },
                          { channel: 'Artisan Popups & Trunk Shows', share: '24.2%', roas: '68% Margin', spend: '₹2.2L Rev' },
                          { channel: 'Curated Boutique Wholesale', share: '14.6%', roas: '54% Margin', spend: '₹1.3L Rev' },
                          { channel: 'WhatsApp Concierge & Repeat', share: '8.8%', roas: '74% Margin', spend: '₹0.8L Rev' },
                        ]
                      : [
                          { channel: 'Paid Search (Google/Meta)', share: '42.4%', roas: '4.8x', spend: '$14.2k' },
                          { channel: 'Organic & Content SEO', share: '28.1%', roas: '8.2x', spend: '$3.5k' },
                          { channel: 'Direct & Brand Referral', share: '18.3%', roas: '12.1x', spend: '$1.1k' },
                          { channel: 'Lifecycle Email / SMS', share: '11.2%', roas: '16.4x', spend: '$0.8k' },
                        ]
                    ).map((chan, cIdx) => (
                      <div key={cIdx} className="p-3 rounded-lg bg-[#0D121B] border border-[#263244] space-y-1">
                        <div className="text-[10px] font-mono text-[#738095] truncate">{chan.channel}</div>
                        <div className="text-base font-bold text-white flex items-center justify-between">
                          <span>{chan.share}</span>
                          <span className="text-xs font-mono text-[#34D399]">{chan.roas}</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#AAB4C3]">{chan.spend}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Optional Campaign Comparison Table if requested */}
              {softwareOverrides.showComparisonTable && (
                <div className={`${ui.cardBg} rounded-xl overflow-hidden border border-[#263244] shadow-md animate-fadeIn`}>
                  <div className="p-3 bg-[#0D121B] border-b border-[#263244] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Table className="w-4 h-4 text-[#10B981]" />
                      <span className="text-xs font-mono font-bold text-[#F3F4F6]">
                        Cross-Channel Campaign Comparison Matrix
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#10B981]/20 text-[#34D399] px-2 py-0.5 rounded">
                      Active Matrix
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#111823] text-[#738095] border-b border-[#263244]">
                        <tr>
                          <th className="p-3">Campaign Channel</th>
                          <th className="p-3">Attributed Revenue</th>
                          <th className="p-3">Ad Spend</th>
                          <th className="p-3">ROAS</th>
                          <th className="p-3">CPA</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#263244]">
                        {[
                          { name: 'Google Performance Max (High Intent)', rev: '$48,200', spend: '$9,800', roas: '4.92x', cpa: '$24.50', status: 'Optimal' },
                          { name: 'Meta Retargeting (Catalog V2)', rev: '$31,400', spend: '$6,400', roas: '4.90x', cpa: '$28.10', status: 'Optimal' },
                          { name: 'TikTok Top-Funnel Video Ads', rev: '$14,800', spend: '$4,900', roas: '3.02x', cpa: '$42.80', status: 'Scale Candidate' },
                          { name: 'Klaviyo Post-Purchase Upsell', rev: '$18,900', spend: '$650', roas: '29.0x', cpa: '$3.20', status: 'High Margin' },
                        ].map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#151E2B] transition-colors">
                            <td className="p-3 font-bold text-white">{row.name}</td>
                            <td className="p-3 text-[#34D399]">{row.rev}</td>
                            <td className="p-3 text-[#AAB4C3]">{row.spend}</td>
                            <td className="p-3 text-white font-bold">{row.roas}</td>
                            <td className="p-3 text-[#93C5FD]">{row.cpa}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] bg-[#10B981]/20 text-[#34D399] font-bold">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* High-Impact Anomaly Detection & 1-Click Action Resolution Banner */}
              <div className={`p-4 rounded-xl border transition-all ${
                hasExecutedAction 
                  ? 'bg-[#10B981]/10 border-[#10B981]/60' 
                  : 'bg-[#F59E0B]/10 border-[#F59E0B]/60'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      hasExecutedAction ? 'bg-[#10B981]/20 text-[#34D399]' : 'bg-[#F59E0B]/20 text-[#FBBF24]'
                    }`}>
                      {hasExecutedAction ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#AAB4C3]">
                          {hasExecutedAction ? 'OPTIMIZATION VERIFIED' : 'PROTOTYPE INSIGHT DETECTED'}
                        </span>
                        <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#1E293B] text-[#45D4E8]">
                          {insightAction.quantitativeImpact}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#F3F4F6] mt-0.5">
                        {hasExecutedAction ? 'Workflow Execution Completed' : insightAction.headline}
                      </h4>
                      <p className="text-xs text-[#AAB4C3] mt-1">
                        {hasExecutedAction ? insightAction.successOutcome : insightAction.recommendedAction}
                      </p>
                    </div>
                  </div>

                  {!hasExecutedAction ? (
                    <button
                      type="button"
                      onClick={handleExecuteOptimization}
                      className="px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#080B10] text-xs font-bold font-mono transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{insightAction.actionButtonLabel}</span>
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 rounded-lg bg-[#10B981]/20 text-[#34D399] text-xs font-mono font-bold flex items-center gap-1.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                      <span>Rule Active</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Record Inspector Table with Search & Filter */}
              <div className={`${ui.cardBg} rounded-xl overflow-hidden shadow-md`}>
                <div className="p-3.5 border-b border-[#263244] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0D121B]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#4D8DFF]" />
                    <span className="text-xs font-mono font-bold text-[#F3F4F6]">
                      Simulated Live Records Feed ({filteredRecords.length})
                    </span>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search record title..."
                      value={customSearchQuery}
                      onChange={(e) => setCustomSearchQuery(e.target.value)}
                      className="px-2.5 py-1 rounded bg-[#111823] border border-[#263244] text-xs font-mono text-white placeholder-[#738095] focus:outline-none focus:border-[#4D8DFF]"
                    />

                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      <Filter className="w-3 h-3 text-[#738095]" />
                      <button
                        type="button"
                        onClick={() => setFilterCategory('all')}
                        className={`px-2 py-0.5 rounded ${filterCategory === 'all' ? 'bg-[#263244] text-white font-bold' : 'text-[#738095]'}`}
                      >
                        All
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-[#263244]">
                  {filteredRecords.map((rec) => {
                    const isSelected = selectedRecord?.id === rec.id;
                    const isAnomaly = rec.status === 'anomaly';
                    const isOptimal = rec.status === 'optimal';

                    return (
                      <div
                        key={rec.id}
                        onClick={() => setSelectedRecord(rec)}
                        className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#1A2536] border-l-4 border-l-[#4D8DFF]' : 'hover:bg-[#151E2B]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#F3F4F6]">
                              {rec.title}
                            </span>
                            <span className="text-[10px] font-mono bg-[#1E293B] text-[#AAB4C3] px-1.5 py-0.2 rounded">
                              {rec.category}
                            </span>
                          </div>
                          {rec.flagReason && (
                            <div className="text-[11px] text-[#FBBF24] font-mono flex items-center gap-1">
                              <span>• {rec.flagReason}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                          <span className="text-[#AAB4C3]">{rec.metricA}</span>
                          <span className="text-white font-bold">{rec.metricB}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isAnomaly 
                              ? 'bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40' 
                              : isOptimal 
                              ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40' 
                              : 'bg-[#263244] text-[#AAB4C3]'
                          }`}>
                            {rec.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Streaming Execution Log Terminal */}
              <div className="bg-[#050911] rounded-xl p-4 border border-[#263244] font-mono text-xs text-white space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-[#738095] border-b border-[#263244] pb-1.5">
                  <div className="flex items-center gap-1.5 text-[#4D8DFF]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Real-Time Engine Execution Stream</span>
                  </div>
                  <span>Deterministic Ingestion Engine</span>
                </div>
                <div className="text-[#34D399] space-y-1 leading-relaxed text-[11px]">
                  <div>[SYS] Initialized {dataSources.filter(s => s.isConnected).length} active data connectors with sub-50ms heartbeat.</div>
                  {isProcessing && <div className="text-[#38BDF8] animate-pulse">[PROCESSING] Ingesting 2,481 records into attribution matrix...</div>}
                  {hasExecutedAction && <div className="text-[#FBBF24]">[AUTOMATION] Rebalancing capital rules applied. 14.8h manual triage eliminated.</div>}
                  {!isProcessing && !hasExecutedAction && <div>[READY] Prototype standing by. Core engine ready to execute user actions.</div>}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA SOURCES VIEW */}
          {activeTab === 'connectors' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#AAB4C3]">
                Toggle simulated data pipelines to see how the product adapts to connected sources:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dataSources.map((src) => {
                  const Icon = getSourceIcon(src.iconName);
                  return (
                    <div 
                      key={src.id}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        src.isConnected ? 'bg-[#111823] border-[#4D8DFF]/60' : 'bg-[#0D121B] border-[#263244] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1E293B] text-[#4D8DFF] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#F3F4F6]">{src.name}</div>
                          <div className="text-[10px] font-mono text-[#738095]">
                            {src.type} • {src.recordCount} records ({src.latencyMs}ms)
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleSource(src.id)}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                          src.isConnected 
                            ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40' 
                            : 'bg-[#263244] text-[#AAB4C3]'
                        }`}
                      >
                        {src.isConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: AUTOMATION RULES VIEW */}
          {activeTab === 'automation' && (
            <div className="bg-[#111823] p-5 rounded-xl border border-[#263244] space-y-4">
              <div className="text-sm font-bold text-[#F3F4F6] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#4D8DFF]" />
                <span>Configured Workflow Automation Rules</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#0D121B] border border-[#263244] flex items-center justify-between">
                  <span>RULE 01: When Anomaly Confidence &gt; 92% → Trigger Auto-Rebalance</span>
                  <span className="text-[#34D399] font-bold">ACTIVE</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0D121B] border border-[#263244] flex items-center justify-between">
                  <span>RULE 02: Ingest Continuous Sync Every 60 Seconds</span>
                  <span className="text-[#34D399] font-bold">ACTIVE</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0D121B] border border-[#263244] flex items-center justify-between">
                  <span>RULE 03: Dispatch Weekly Stakeholder PDF Summary to Executive Team</span>
                  <span className="text-[#4D8DFF] font-bold">SCHEDULED</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TELEMETRY & PERFORMANCE VIEW */}
          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#AAB4C3]">
                Real-time telemetry heartbeat from connected data sources:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dataSources.filter((s) => s.isConnected).map((src) => {
                  const Icon = getSourceIcon(src.iconName);
                  return (
                    <div key={src.id} className={`${ui.cardBg} p-4 rounded-xl border border-[#263244] space-y-2`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1E293B] text-[#4D8DFF] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#F3F4F6]">{src.name}</div>
                          <div className="text-[10px] font-mono text-[#738095]">
                            {src.type} • {src.recordCount} records ({src.latencyMs}ms)
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#738095]">Latency (p99)</span>
                          <span className="text-[#34D399] font-mono">{src.latencyMs}ms</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#738095]">Status</span>
                          <span className="text-[#34D399] font-mono">● Connected</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#738095]">Throughput</span>
                          <span className="text-[#34D399] font-mono">{(src.recordCount / 60).toFixed(1)} rec/s</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {dataSources.filter((s) => s.isConnected).length === 0 && (
                <div className="text-center py-8 text-xs text-[#6B7D90] font-mono">
                  No data sources connected. Toggle connectors above to activate telemetry.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. CONTEXT-AWARE AI SIMULATION EDITING BAR DIRECTLY BELOW PROTOTYPE */}
      <SimulationAgentBar
        mode="software"
        softwareArchetype={archetype}
        softwareScreenTitle={activeScreenTitle}
        softwareOverrides={softwareOverrides}
        onApplySoftwareOverrides={handleApplySoftwareOverrides}
        onResetSoftwareOverrides={handleResetSoftwareOverrides}
      />

      {/* 3. Verified Software Outcome Summary */}
      <div className="bg-[#111823] border border-[#263244] rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-2 pb-3 border-b border-[#263244] mb-3">
          <Sparkles className="w-4 h-4 text-[#4D8DFF]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6] font-mono">
            Simulated Software Value Loop & Scalability
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#0D121B] p-3.5 rounded-lg border border-[#263244]">
            <div className="text-[10px] font-mono uppercase text-[#738095] font-bold">
              Time Saved & Efficiency
            </div>
            <div className="text-xs font-semibold text-[#F3F4F6] mt-1">
              {outcomeSummary.timeSavedOrBenefit}
            </div>
          </div>

          <div className="bg-[#0D121B] p-3.5 rounded-lg border border-[#263244]">
            <div className="text-[10px] font-mono uppercase text-[#738095] font-bold">
              Core Value Delivered
            </div>
            <div className="text-xs font-semibold text-[#F3F4F6] mt-1">
              {outcomeSummary.coreValueDelivered}
            </div>
          </div>

          <div className="bg-[#0D121B] p-3.5 rounded-lg border border-[#263244]">
            <div className="text-[10px] font-mono uppercase text-[#738095] font-bold">
              Expansion & Retention Loop
            </div>
            <div className="text-xs font-semibold text-[#34D399] mt-1">
              {outcomeSummary.expansionTrigger}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
