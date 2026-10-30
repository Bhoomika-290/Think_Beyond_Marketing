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
  Sliders,
  BookOpen,
  Utensils,
  Store
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
      appearance.accent === 'purple' ? '#8B5CF6' : '#2684F7';

    let frameBg = isLight ? 'bg-[#14213D]' : 'bg-[#0B1017]';
    let cardBg = isLight ? 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A]' : 'bg-[#FFFFFF] border-[#E2EAF4] text-[#14213D]';
    let textPrimary = isLight ? 'text-[#0F172A]' : 'text-[#14213D]';
    let textSecondary = isLight ? 'text-[#8495AE]' : 'text-[#8495AE]';
    let headerBg = isLight ? 'bg-[#FFFFFF] border-b border-[#E2E8F0]' : 'bg-[#FFFFFF] border-b border-[#E2EAF4]';

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
      case 'BookOpen': return BookOpen;
      case 'Utensils': return Utensils;
      case 'Store': return Store;
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
      <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-3 shadow-md flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#19A875] animate-pulse" />
          <span className="text-xs font-mono font-bold text-[#14213D] uppercase">
            Interactive SaaS Prototype // Live Simulator
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EEF4FB] text-[#2684F7] border border-[#33445A]">
            {categoryTag}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetSimulation}
            className="px-2.5 py-1 rounded text-[11px] font-mono text-[#8495AE] hover:text-white hover:bg-[#FFFFFF] border border-[#E2EAF4] transition-colors flex items-center gap-1"
          >
            <RotateCw className="w-3 h-3 text-[#60738F]" />
            <span>Reset Prototype</span>
          </button>
        </div>
      </div>

      {/* 2. Standalone SaaS Application Canvas Frame (Customized per venture style & theme) */}
      <div className={`${ui.frameBg} border-2 border-[#E2EAF4] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}>
        
        {/* Browser Mockup Chrome Header */}
        <div className={`${ui.headerBg} px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <div className="flex items-center gap-3">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E46D68]" />
              <span className="w-3 h-3 rounded-full bg-[#F29A42]" />
              <span className="w-3 h-3 rounded-full bg-[#19A875]" />
            </div>

            {/* URL Route Bar */}
            <div className="flex items-center gap-2 bg-[#FFFFFF] px-3 py-1 rounded-md border border-[#E2EAF4] text-[11px] font-mono text-[#60738F]">
              <Globe className="w-3.5 h-3.5" style={{ color: ui.accentColor }} />
              <span className="text-[#14213D] font-semibold">
                https://app.{appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.io
              </span>
              <span className="text-[#60738F]">/workspace/live</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EEF4FB] text-[#2684F7] border border-[#E2EAF4]">
              State: {prototypeStage.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Simulated Prototype</span>
            </span>
          </div>
        </div>

        {/* Workflow Mission Strip */}
        <div className="bg-[#FFFFFF] px-4 py-2 border-b border-[#E2EAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="text-[#8495AE] flex items-center gap-2 truncate">
            <span className="font-bold" style={{ color: ui.accentColor }}>MISSION:</span>
            <span className="truncate">{workflowGoal}</span>
          </div>
          <div className="text-[11px] text-[#60738F] shrink-0">
            {activeScreenTitle}
          </div>
        </div>

        {/* Prototype Internal Navigation Bar */}
        <div className="bg-[#FFFFFF] border-b border-[#E2EAF4] px-4 py-2 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xs text-[#14213D] mr-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ui.accentColor }} />
              <span>{appName}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('workspace')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'workspace' ? 'bg-[#2684F7] text-[#FFFFFF] font-bold' : 'text-[#8495AE] hover:text-white hover:bg-[#FFFFFF]'
                }`}
              >
                1. Core Workspace
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('connectors')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'connectors' ? 'bg-[#2684F7] text-[#FFFFFF] font-bold' : 'text-[#8495AE] hover:text-white hover:bg-[#FFFFFF]'
                }`}
              >
                2. Data Sources ({dataSources.filter(s => s.isConnected).length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('automation')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'automation' ? 'bg-[#2684F7] text-[#FFFFFF] font-bold' : 'text-[#8495AE] hover:text-white hover:bg-[#FFFFFF]'
                }`}
              >
                3. Automations
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('telemetry')}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  activeTab === 'telemetry' ? 'bg-[#2684F7] text-[#FFFFFF] font-bold' : 'text-[#8495AE] hover:text-white hover:bg-[#FFFFFF]'
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
              style={{ backgroundColor: ui.accentColor, color: '#FFFFFF' }}
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
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#60738F]">
                        <span>{met.label}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#FFFFFF] text-[#2684F7] border border-[#E2EAF4]">
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
              <div className={`${ui.cardBg} rounded-xl p-4 border border-[#E2EAF4] shadow-md space-y-3`}>
                <div className="flex items-center justify-between border-b border-[#E2EAF4] pb-2.5">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#2684F7]" />
                    <span className="text-xs font-mono font-bold text-[#14213D]">
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
                      className={`px-2 py-0.5 rounded ${(!softwareOverrides.chartTypeOverride || softwareOverrides.chartTypeOverride === 'attribution') ? 'bg-[#E2EAF4] text-white font-bold' : 'text-[#60738F] hover:text-white'}`}
                    >
                      {archetype === 'ecommerce' ? 'Channels' : 'Attribution'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySoftwareOverrides({ ...softwareOverrides, chartTypeOverride: 'funnel' })}
                      className={`px-2 py-0.5 rounded ${softwareOverrides.chartTypeOverride === 'funnel' ? 'bg-[#E2EAF4] text-white font-bold' : 'text-[#60738F] hover:text-white'}`}
                    >
                      Funnel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplySoftwareOverrides({ ...softwareOverrides, chartTypeOverride: 'timeseries' })}
                      className={`px-2 py-0.5 rounded ${softwareOverrides.chartTypeOverride === 'timeseries' ? 'bg-[#E2EAF4] text-white font-bold' : 'text-[#60738F] hover:text-white'}`}
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
                          { stage: '4. Orders Dispatched & Delivered', count: '680', pct: 2.8, color: '#19A875', drop: '-68.8%' },
                        ]
                      : [
                          { stage: '1. Ad Impressions & Touchpoints', count: '128,400', pct: 100, color: '#3B82F6', drop: '0%' },
                          { stage: '2. High-Intent Landing Page Visits', count: '42,600', pct: 33.2, color: '#60A5FA', drop: '-66.8%' },
                          { stage: '3. Cart / Checkout Initiated', count: '12,800', pct: 10.0, color: '#10B981', drop: '-69.9%' },
                          { stage: '4. Verified Conversions & Revenue', count: '4,920', pct: 3.8, color: '#19A875', drop: '-61.5%' },
                        ]
                    ).map((step, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#14213D] font-semibold">{step.stage}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-bold">{step.count} ({step.pct}%)</span>
                            <span className="text-[10px] text-[#F87171]">{step.drop}</span>
                          </div>
                        </div>
                        <div className="w-full h-3 bg-[#FFFFFF] rounded-full overflow-hidden border border-[#E2EAF4]">
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
                        <div key={bIdx} className="flex-1 bg-[#EEF4FB] hover:bg-[#2684F7] rounded-t transition-all group relative h-full flex items-end">
                          <div
                            className="w-full bg-[#2684F7] group-hover:bg-[#60A5FA] rounded-t transition-all"
                            style={{ height: `${(val / 220) * 100}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#60738F]">
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
                      <div key={cIdx} className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] space-y-1">
                        <div className="text-[10px] font-mono text-[#60738F] truncate">{chan.channel}</div>
                        <div className="text-base font-bold text-white flex items-center justify-between">
                          <span>{chan.share}</span>
                          <span className="text-xs font-mono text-[#19A875]">{chan.roas}</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#8495AE]">{chan.spend}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Optional Campaign Comparison Table if requested */}
              {softwareOverrides.showComparisonTable && (
                <div className={`${ui.cardBg} rounded-xl overflow-hidden border border-[#E2EAF4] shadow-md animate-fadeIn`}>
                  <div className="p-3 bg-[#FFFFFF] border-b border-[#E2EAF4] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Table className="w-4 h-4 text-[#19A875]" />
                      <span className="text-xs font-mono font-bold text-[#14213D]">
                        Cross-Channel Campaign Comparison Matrix
                      </span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#E8F8F1] text-[#19A875] px-2 py-0.5 rounded">
                      Active Matrix
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    {archetype === 'food_waste_prediction' ? (
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#FFFFFF] text-[#60738F] border-b border-[#E2EAF4]">
                          <tr>
                            <th className="p-3">Recipe / Ingredient Batch</th>
                            <th className="p-3">Historic Baseline</th>
                            <th className="p-3">AI Forecast Demand</th>
                            <th className="p-3">Surplus Cut</th>
                            <th className="p-3">Daily Savings</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2EAF4]">
                          {[
                            { name: 'Marinated Paneer & Tikka Base', colA: '22.0 kg', colB: '14.5 kg', colC: '-34.1%', colD: '₹1,420', status: 'Optimal Prep' },
                            { name: 'Fresh Cream & Dairy Stock', colA: '8.0 L', colB: '4.8 L', colC: '-40.0%', colD: '₹890', status: 'Expiry Alert' },
                            { name: 'Biryani Rice & Whole Spices', colA: '35.0 kg', colB: '28.0 kg', colC: '-20.0%', colD: '₹950', status: 'Calibrated' },
                            { name: 'Chopped Herbs & Garnishes', colA: '4.5 kg', colB: '2.2 kg', colC: '-51.1%', colD: '₹340', status: 'Low Spoilage' },
                          ].map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#151E2B] transition-colors">
                              <td className="p-3 font-bold text-white">{row.name}</td>
                              <td className="p-3 text-[#8495AE]">{row.colA}</td>
                              <td className="p-3 text-[#2684F7]">{row.colB}</td>
                              <td className="p-3 text-[#19A875] font-bold">{row.colC}</td>
                              <td className="p-3 text-[#2684F7]">{row.colD}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] bg-[#E8F8F1] text-[#19A875] font-bold">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : archetype === 'tutoring_edtech' ? (
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#FFFFFF] text-[#60738F] border-b border-[#E2EAF4]">
                          <tr>
                            <th className="p-3">Subject / Course Domain</th>
                            <th className="p-3">Active Student Queries</th>
                            <th className="p-3">Tutor Pool</th>
                            <th className="p-3">Match SLA</th>
                            <th className="p-3">Avg Rate</th>
                            <th className="p-3">Liquidity Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2EAF4]">
                          {[
                            { name: 'Calculus II & Multivariable Math', colA: '42 Active', colB: '18 Verified Tutors', colC: '1.4 min', colD: '₹450 / hr', status: 'High Liquidity' },
                            { name: 'Organic Chemistry & Reaction Pathways', colA: '28 Active', colB: '12 Verified Tutors', colC: '2.1 min', colD: '₹500 / hr', status: 'Optimal' },
                            { name: 'Intro to Python & Algorithms', colA: '35 Active', colB: '8 Verified Tutors', colC: '4.8 min', colD: '₹400 / hr', status: 'Surge Candidate' },
                            { name: 'University Macroeconomics', colA: '14 Active', colB: '9 Verified Tutors', colC: '1.2 min', colD: '₹420 / hr', status: 'Balanced' },
                          ].map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#151E2B] transition-colors">
                              <td className="p-3 font-bold text-white">{row.name}</td>
                              <td className="p-3 text-[#2684F7]">{row.colA}</td>
                              <td className="p-3 text-[#8495AE]">{row.colB}</td>
                              <td className="p-3 text-[#19A875] font-bold">{row.colC}</td>
                              <td className="p-3 text-[#2684F7]">{row.colD}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] bg-[#E8F8F1] text-[#19A875] font-bold">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : archetype === 'meal_delivery_service' ? (
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#FFFFFF] text-[#60738F] border-b border-[#E2EAF4]">
                          <tr>
                            <th className="p-3">Corporate Account</th>
                            <th className="p-3">Daily Headcount</th>
                            <th className="p-3">Partner Kitchen</th>
                            <th className="p-3">Drop Window</th>
                            <th className="p-3">Weekly Billing</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2EAF4]">
                          {[
                            { name: 'Acme Software Labs (Tower B)', colA: '48 Meals', colB: 'Artisan Kitchen & Grill', colC: '12:00 - 12:15 PM', colD: '₹34,500', status: 'Consolidated' },
                            { name: 'TechMatrix Global HQ', colA: '82 Meals', colB: 'Urban Green Bowl Hub', colC: '12:15 - 12:30 PM', colD: '₹58,200', status: 'Dispatched' },
                            { name: 'Innovate Studio Coworking', colA: '26 Meals', colB: 'Curry & Spice Bistro', colC: '12:30 - 12:45 PM', colD: '₹18,900', status: 'Active Recurring' },
                          ].map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#151E2B] transition-colors">
                              <td className="p-3 font-bold text-white">{row.name}</td>
                              <td className="p-3 text-[#2684F7]">{row.colA}</td>
                              <td className="p-3 text-[#8495AE]">{row.colB}</td>
                              <td className="p-3 text-[#19A875] font-bold">{row.colC}</td>
                              <td className="p-3 text-[#2684F7]">{row.colD}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] bg-[#E8F8F1] text-[#19A875] font-bold">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#FFFFFF] text-[#60738F] border-b border-[#E2EAF4]">
                          <tr>
                            <th className="p-3">Module / Feature Channel</th>
                            <th className="p-3">Active Throughput</th>
                            <th className="p-3">Operational Cost</th>
                            <th className="p-3">Efficiency Ratio</th>
                            <th className="p-3">Unit Metric</th>
                            <th className="p-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2EAF4]">
                          {[
                            { name: 'Automated Real-time Ingestion', colA: '48,200 events/hr', colB: '$18.40 / mo', colC: '99.98%', colD: '<12ms Latency', status: 'Optimal' },
                            { name: 'Rule-Based Anomaly Resolver', colA: '1,420 triggers', colB: '$12.00 / mo', colC: '94.2%', colD: 'Zero False Positives', status: 'Optimal' },
                            { name: 'Third-party API Webhooks', colA: '9,840 syncs', colB: '$6.50 / mo', colC: '98.5%', colD: '<45ms Latency', status: 'Stable' },
                          ].map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#151E2B] transition-colors">
                              <td className="p-3 font-bold text-white">{row.name}</td>
                              <td className="p-3 text-[#19A875]">{row.colA}</td>
                              <td className="p-3 text-[#8495AE]">{row.colB}</td>
                              <td className="p-3 text-white font-bold">{row.colC}</td>
                              <td className="p-3 text-[#2684F7]">{row.colD}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] bg-[#E8F8F1] text-[#19A875] font-bold">
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* High-Impact Anomaly Detection & 1-Click Action Resolution Banner */}
              <div className={`p-4 rounded-xl border transition-all ${
                hasExecutedAction 
                  ? 'bg-[#E8F8F1] border-[#10B981]/60' 
                  : 'bg-[#FFF3E7] border-[#F59E0B]/60'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      hasExecutedAction ? 'bg-[#E8F8F1] text-[#19A875]' : 'bg-[#FFF3E7] text-[#F29A42]'
                    }`}>
                      {hasExecutedAction ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#8495AE]">
                          {hasExecutedAction ? 'OPTIMIZATION VERIFIED' : 'PROTOTYPE INSIGHT DETECTED'}
                        </span>
                        <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#EEF4FB] text-[#45D4E8]">
                          {insightAction.quantitativeImpact}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#14213D] mt-0.5">
                        {hasExecutedAction ? 'Workflow Execution Completed' : insightAction.headline}
                      </h4>
                      <p className="text-xs text-[#8495AE] mt-1">
                        {hasExecutedAction ? insightAction.successOutcome : insightAction.recommendedAction}
                      </p>
                    </div>
                  </div>

                  {!hasExecutedAction ? (
                    <button
                      type="button"
                      onClick={handleExecuteOptimization}
                      className="px-4 py-2 rounded-lg bg-[#F29A42] hover:bg-[#D97706] text-[#FFFFFF] text-xs font-bold font-mono transition-colors shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{insightAction.actionButtonLabel}</span>
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 rounded-lg bg-[#E8F8F1] text-[#19A875] text-xs font-mono font-bold flex items-center gap-1.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                      <span>Rule Active</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Record Inspector Table with Search & Filter */}
              <div className={`${ui.cardBg} rounded-xl overflow-hidden shadow-md`}>
                <div className="p-3.5 border-b border-[#E2EAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFFFF]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#2684F7]" />
                    <span className="text-xs font-mono font-bold text-[#14213D]">
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
                      className="px-2.5 py-1 rounded bg-[#FFFFFF] border border-[#E2EAF4] text-xs font-mono text-white placeholder-[#8495AE] focus:outline-none focus:border-[#2684F7]"
                    />

                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      <Filter className="w-3 h-3 text-[#60738F]" />
                      <button
                        type="button"
                        onClick={() => setFilterCategory('all')}
                        className={`px-2 py-0.5 rounded ${filterCategory === 'all' ? 'bg-[#E2EAF4] text-white font-bold' : 'text-[#60738F]'}`}
                      >
                        All
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-[#E2EAF4]">
                  {filteredRecords.map((rec) => {
                    const isSelected = selectedRecord?.id === rec.id;
                    const isAnomaly = rec.status === 'anomaly';
                    const isOptimal = rec.status === 'optimal';

                    return (
                      <div
                        key={rec.id}
                        onClick={() => setSelectedRecord(rec)}
                        className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#FFFFFF] border-l-4 border-l-[#2684F7]' : 'hover:bg-[#151E2B]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#14213D]">
                              {rec.title}
                            </span>
                            <span className="text-[10px] font-mono bg-[#EEF4FB] text-[#8495AE] px-1.5 py-0.2 rounded">
                              {rec.category}
                            </span>
                          </div>
                          {rec.flagReason && (
                            <div className="text-[11px] text-[#F29A42] font-mono flex items-center gap-1">
                              <span>• {rec.flagReason}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                          <span className="text-[#8495AE]">{rec.metricA}</span>
                          <span className="text-white font-bold">{rec.metricB}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isAnomaly 
                              ? 'bg-[#FFF3E7] text-[#F29A42] border border-[#F29A42]/30' 
                              : isOptimal 
                              ? 'bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30' 
                              : 'bg-[#E2EAF4] text-[#8495AE]'
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
              <div className="bg-[#050911] rounded-xl p-4 border border-[#E2EAF4] font-mono text-xs text-white space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-[#60738F] border-b border-[#E2EAF4] pb-1.5">
                  <div className="flex items-center gap-1.5 text-[#2684F7]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Real-Time Engine Execution Stream</span>
                  </div>
                  <span>Deterministic Ingestion Engine</span>
                </div>
                <div className="text-[#19A875] space-y-1 leading-relaxed text-[11px]">
                  <div>[SYS] Initialized {dataSources.filter(s => s.isConnected).length} active data connectors with sub-50ms heartbeat.</div>
                  {isProcessing && <div className="text-[#2684F7] animate-pulse">[PROCESSING] Ingesting 2,481 records into attribution matrix...</div>}
                  {hasExecutedAction && <div className="text-[#F29A42]">[AUTOMATION] Rebalancing capital rules applied. 14.8h manual triage eliminated.</div>}
                  {!isProcessing && !hasExecutedAction && <div>[READY] Prototype standing by. Core engine ready to execute user actions.</div>}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATA SOURCES VIEW */}
          {activeTab === 'connectors' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#8495AE]">
                Toggle simulated data pipelines to see how the product adapts to connected sources:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dataSources.map((src) => {
                  const Icon = getSourceIcon(src.iconName);
                  return (
                    <div 
                      key={src.id}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        src.isConnected ? 'bg-[#FFFFFF] border-[#2684F7]/60' : 'bg-[#FFFFFF] border-[#E2EAF4] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#EEF4FB] text-[#2684F7] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#14213D]">{src.name}</div>
                          <div className="text-[10px] font-mono text-[#60738F]">
                            {src.type} • {src.recordCount} records ({src.latencyMs}ms)
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleSource(src.id)}
                        className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                          src.isConnected 
                            ? 'bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30' 
                            : 'bg-[#E2EAF4] text-[#8495AE]'
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
            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E2EAF4] space-y-4">
              <div className="text-sm font-bold text-[#14213D] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2684F7]" />
                <span>Configured Workflow Automation Rules</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
                  <span>RULE 01: When Anomaly Confidence &gt; 92% → Trigger Auto-Rebalance</span>
                  <span className="text-[#19A875] font-bold">ACTIVE</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
                  <span>RULE 02: Ingest Continuous Sync Every 60 Seconds</span>
                  <span className="text-[#19A875] font-bold">ACTIVE</span>
                </div>
                <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
                  <span>RULE 03: Dispatch Weekly Stakeholder PDF Summary to Executive Team</span>
                  <span className="text-[#2684F7] font-bold">SCHEDULED</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TELEMETRY & PERFORMANCE VIEW */}
          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#8495AE]">
                Real-time telemetry heartbeat from connected data sources:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dataSources.filter((s) => s.isConnected).map((src) => {
                  const Icon = getSourceIcon(src.iconName);
                  return (
                    <div key={src.id} className={`${ui.cardBg} p-4 rounded-xl border border-[#E2EAF4] space-y-2`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#EEF4FB] text-[#2684F7] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#14213D]">{src.name}</div>
                          <div className="text-[10px] font-mono text-[#60738F]">
                            {src.type} • {src.recordCount} records ({src.latencyMs}ms)
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#60738F]">Latency (p99)</span>
                          <span className="text-[#19A875] font-mono">{src.latencyMs}ms</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#60738F]">Status</span>
                          <span className="text-[#19A875] font-mono">● Connected</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#60738F]">Throughput</span>
                          <span className="text-[#19A875] font-mono">{(src.recordCount / 60).toFixed(1)} rec/s</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {dataSources.filter((s) => s.isConnected).length === 0 && (
                <div className="text-center py-8 text-xs text-[#60738F] font-mono">
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
      <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E2EAF4] mb-3">
          <Sparkles className="w-4 h-4 text-[#2684F7]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#14213D] font-mono">
            Simulated Software Value Loop & Scalability
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E2EAF4]">
            <div className="text-[10px] font-mono uppercase text-[#60738F] font-bold">
              Time Saved & Efficiency
            </div>
            <div className="text-xs font-semibold text-[#14213D] mt-1">
              {outcomeSummary.timeSavedOrBenefit}
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E2EAF4]">
            <div className="text-[10px] font-mono uppercase text-[#60738F] font-bold">
              Core Value Delivered
            </div>
            <div className="text-xs font-semibold text-[#14213D] mt-1">
              {outcomeSummary.coreValueDelivered}
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E2EAF4]">
            <div className="text-[10px] font-mono uppercase text-[#60738F] font-bold">
              Expansion & Retention Loop
            </div>
            <div className="text-xs font-semibold text-[#19A875] mt-1">
              {outcomeSummary.expansionTrigger}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
