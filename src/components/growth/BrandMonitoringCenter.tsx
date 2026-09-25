import React, { useState } from 'react';
import { 
  Radio, 
  Globe, 
  Search, 
  Share2, 
  CreditCard, 
  Users, 
  Activity,
  Layers,
  ArrowRight,
  Zap,
  PlugZap,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BrandMonitoringData } from '../../types/growth';

interface BrandMonitoringCenterProps {
  monitoring: BrandMonitoringData;
  ventureName: string;
}

export const BrandMonitoringCenter: React.FC<BrandMonitoringCenterProps> = ({
  monitoring,
  ventureName,
}) => {
  const [activeSignalFilter, setActiveSignalFilter] = useState<'all' | 'opportunity' | 'risk' | 'milestone'>('all');
  const [connectedSources, setConnectedSources] = useState({
    googleAnalytics: false,
    metaPixel: false,
    stripeBilling: false,
    crmSync: true, // internal CRM active
  });
  const [connectingKey, setConnectingKey] = useState<string | null>(null);

  const handleToggleConnection = (key: keyof typeof connectedSources) => {
    setConnectingKey(key);
    setTimeout(() => {
      setConnectedSources((prev) => ({ ...prev, [key]: !prev[key] }));
      setConnectingKey(null);
    }, 600);
  };

  const filteredQueue = monitoring.signalActionQueue.filter((item) => {
    if (activeSignalFilter === 'all') return true;
    return item.severity === activeSignalFilter;
  });

  return (
    <div className="bg-[#0D121B] border border-[#263244] rounded-2xl p-4 shadow-xl space-y-4">
      {/* 1. Header & Live Telemetry Protocol Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#1A2536]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#738095] font-bold">
                Telemetry Protocol // Brand Intelligence Hub
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                ACTIVE MONITORING
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Brand &amp; Market Intelligence Radar — {ventureName}
            </h2>
          </div>
        </div>

        {/* Dynamic Source Status Badges */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-[#111823] border border-[#263244] text-[#AAB4C3] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Stages 01–07 Telemetry</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#111823] border border-[#263244] text-[#AAB4C3] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <span>Market Wedge Radar</span>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#111823] border border-[#263244] text-[#AAB4C3] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span>Calibrated Baseline</span>
          </span>
        </div>
      </div>

      {/* 2. Core 4-Pillar Visual Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Card 1: Brand Health & Identity Completeness */}
        <div className="p-3 rounded-xl bg-[#111823] border border-[#263244] space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#738095] font-bold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#A78BFA]" /> Brand Health
              </span>
              <span className="text-[10px] font-mono text-[#34D399] font-bold">
                {monitoring.brandHealth.completenessRatio}
              </span>
            </div>
            <div className="text-sm font-bold text-white leading-snug">
              {monitoring.brandHealth.status}
            </div>
            <div className="space-y-1 pt-1 text-[10px] font-mono text-[#AAB4C3]">
              {monitoring.brandHealth.activeIdentityElements.map((el, i) => (
                <div key={i} className="truncate">• {el}</div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#1A2536] flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#738095]">Stage 04 Roadmap</span>
            <Link to="/brand-roadmap" className="text-[#A78BFA] hover:underline flex items-center gap-0.5">
              <span>View Brand</span> <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* Card 2: Market Signals & Competitive Radar */}
        <div className="p-3 rounded-xl bg-[#111823] border border-[#263244] space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#738095] font-bold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#38BDF8]" /> Market Signals
              </span>
              <span className="text-[10px] font-mono text-[#38BDF8] font-bold">
                {monitoring.marketSignals.competitorsTracked.length} Competitors Tracked
              </span>
            </div>
            <div className="text-sm font-bold text-white leading-snug">
              Counter-Wedge Positioning
            </div>
            <div className="space-y-1 pt-1 text-[10px] font-mono text-[#AAB4C3]">
              {monitoring.marketSignals.competitorsTracked.slice(0, 2).map((c, i) => (
                <div key={i} className="truncate">
                  • <span className="text-white font-bold">{c.name}:</span> {c.positioning}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#1A2536] flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#738095]">Stage 03 Intelligence</span>
            <Link to="/market-intelligence" className="text-[#38BDF8] hover:underline flex items-center gap-0.5">
              <span>Inspect Wedge</span> <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* Card 3: SEO & Search Demand Visibility */}
        <div className="p-3 rounded-xl bg-[#111823] border border-[#263244] space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#738095] font-bold flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-[#10B981]" /> Search Visibility
              </span>
              <span className="text-[10px] font-mono text-[#10B981] font-bold">
                Derived High Intent
              </span>
            </div>
            <div className="text-sm font-bold text-white leading-snug">
              Commercial Keyword Clusters
            </div>
            <div className="space-y-1 pt-1 text-[10px] font-mono text-[#AAB4C3]">
              <div>• Category Solution Pages Mapped</div>
              <div>• Competitor Comparison Angle Active</div>
              <div>• Structured Schema Audit Ready</div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1A2536] flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#738095]">Organic Search</span>
            <span className="text-[#10B981]">Ready To Deploy</span>
          </div>
        </div>

        {/* Card 4: CRM Pipeline & Lead Velocity */}
        <div className="p-3 rounded-xl bg-[#111823] border border-[#263244] space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#738095] font-bold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#F59E0B]" /> CRM &amp; Pipeline
              </span>
              <span className="text-[10px] font-mono text-[#F59E0B] font-bold">
                Interactive Studio
              </span>
            </div>
            <div className="text-sm font-bold text-white leading-snug">
              Customer Lifecycle Tracker
            </div>
            <div className="space-y-1 pt-1 text-[10px] font-mono text-[#AAB4C3]">
              <div>• Waitlist &amp; Trial Queue Live</div>
              <div>• Stage Movement Active</div>
              <div>• Automated Follow-Up Ready</div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1A2536] flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#738095]">Telemetry Status</span>
            <span className="text-[#34D399] font-bold">Hub Synchronized</span>
          </div>
        </div>
      </div>

      {/* 3. Live Telemetry Connections & Integrations Panel */}
      <div className="p-3 rounded-xl bg-[#111823] border border-[#263244] space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1A2536]">
          <div className="flex items-center gap-2">
            <PlugZap className="w-4 h-4 text-[#4D8DFF]" />
            <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
              External Production Telemetry Connectors
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#738095]">
            Live Data Pipeline // Connect real production endpoints to stream live metrics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Connector 1: Google Analytics 4 */}
          <div className="px-2.5 py-2 rounded-lg bg-[#0D121B] border border-[#263244] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#4D8DFF]" />
                <span>Google Analytics 4</span>
              </div>
              <div className="text-[10px] font-mono text-[#738095]">
                {connectedSources.googleAnalytics ? 'Live Stream Active' : 'Awaiting Data Stream'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggleConnection('googleAnalytics')}
              disabled={connectingKey === 'googleAnalytics'}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors ${
                connectedSources.googleAnalytics
                  ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                  : 'bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244]'
              }`}
            >
              {connectingKey === 'googleAnalytics' ? 'Syncing...' : connectedSources.googleAnalytics ? 'Connected' : 'Connect'}
            </button>
          </div>

          {/* Connector 2: Meta Conversions API & Pixel */}
          <div className="px-2.5 py-2 rounded-lg bg-[#0D121B] border border-[#263244] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Meta CAPI / Pixel</span>
              </div>
              <div className="text-[10px] font-mono text-[#738095]">
                {connectedSources.metaPixel ? 'Pixel Active' : 'Awaiting Ad Spend'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggleConnection('metaPixel')}
              disabled={connectingKey === 'metaPixel'}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors ${
                connectedSources.metaPixel
                  ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                  : 'bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244]'
              }`}
            >
              {connectingKey === 'metaPixel' ? 'Syncing...' : connectedSources.metaPixel ? 'Connected' : 'Connect'}
            </button>
          </div>

          {/* Connector 3: Stripe Billing & Revenue */}
          <div className="px-2.5 py-2 rounded-lg bg-[#0D121B] border border-[#263244] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Stripe Checkout</span>
              </div>
              <div className="text-[10px] font-mono text-[#738095]">
                {connectedSources.stripeBilling ? 'Webhook Connected' : 'Awaiting Checkout'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggleConnection('stripeBilling')}
              disabled={connectingKey === 'stripeBilling'}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors ${
                connectedSources.stripeBilling
                  ? 'bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40'
                  : 'bg-[#1A2536] text-[#AAB4C3] hover:text-white border border-[#263244]'
              }`}
            >
              {connectingKey === 'stripeBilling' ? 'Syncing...' : connectedSources.stripeBilling ? 'Connected' : 'Connect'}
            </button>
          </div>

          {/* Connector 4: Integrated CRM Lead Webhook */}
          <div className="px-2.5 py-2 rounded-lg bg-[#0D121B] border border-[#263244] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Venture CRM Sync</span>
              </div>
              <div className="text-[10px] font-mono text-[#34D399]">
                Internal State Active
              </div>
            </div>

            <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 flex items-center gap-1">
              <Check className="w-3 h-3" /> Ready
            </span>
          </div>
        </div>
      </div>

      {/* 4. Real-Time Signal & Action Queue */}
      <div className="p-3 rounded-xl bg-[#111823] border border-[#263244] space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1A2536]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
            <h4 className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
              Real-Time Signal Matrix &amp; Action Queue
            </h4>
            <span className="text-[10px] font-mono text-[#738095]">{filteredQueue.length} signals</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => setActiveSignalFilter('all')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeSignalFilter === 'all' ? 'bg-[#4D8DFF] text-[#080B10] font-bold' : 'text-[#738095] hover:text-white'
              }`}
            >
              ALL
            </button>
            <button
              type="button"
              onClick={() => setActiveSignalFilter('opportunity')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeSignalFilter === 'opportunity' ? 'bg-[#10B981] text-[#080B10] font-bold' : 'text-[#738095] hover:text-white'
              }`}
            >
              OPPORTUNITIES
            </button>
            <button
              type="button"
              onClick={() => setActiveSignalFilter('risk')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeSignalFilter === 'risk' ? 'bg-[#F59E0B] text-[#080B10] font-bold' : 'text-[#738095] hover:text-white'
              }`}
            >
              RISKS
            </button>
            <button
              type="button"
              onClick={() => setActiveSignalFilter('milestone')}
              className={`px-2 py-0.5 rounded transition-colors ${
                activeSignalFilter === 'milestone' ? 'bg-[#AAB4C3] text-[#080B10] font-bold' : 'text-[#738095] hover:text-white'
              }`}
            >
              MILESTONES
            </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[9px] font-mono uppercase text-[#738095] border-b border-[#1A2536]">
              <th className="py-1 pr-2 font-bold w-24">Severity</th>
              <th className="py-1 pr-2 font-bold">Signal</th>
              <th className="py-1 pr-2 font-bold w-32">Action</th>
              <th className="py-1 font-bold w-24">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueue.map((sig) => (
              <tr key={sig.id} className="border-b border-[#1A2536] last:border-0 align-top">
                <td className="py-1.5 pr-2">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap ${
                    sig.severity === 'opportunity' ? 'bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30' :
                    sig.severity === 'risk' ? 'bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30' :
                    'bg-[#1A2536] text-[#AAB4C3] border border-[#263244]'
                  }`}>
                    {sig.severity.toUpperCase()}
                  </span>
                </td>
                <td className="py-1.5 pr-2">
                  <details className="group">
                    <summary className="text-xs font-bold text-white cursor-pointer list-none hover:text-[#F3F4F6]">
                      {sig.title}
                    </summary>
                    <p className="text-[11px] text-[#AAB4C3] leading-snug pt-0.5">{sig.description}</p>
                  </details>
                </td>
                <td className="py-1.5 pr-2 text-[10px] font-mono text-[#AAB4C3]">{sig.actionLabel}</td>
                <td className="py-1.5 text-[9px] font-mono text-[#738095] whitespace-nowrap">{sig.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
