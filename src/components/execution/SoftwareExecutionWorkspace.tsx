import React, { useState } from 'react';
import { 
  Code2, 
  Database, 
  Cloud, 
  CreditCard, 
  BarChart3, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  BookOpen, 
  Layers,
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';
import type { 
  ExecutionReport, 
  ExecutionResourceItem, 
  ExecutionSpecialistMessage 
} from '../../types/project';
import { ContextualIntelligenceModal } from './ContextualIntelligenceModal';

interface SoftwareExecutionWorkspaceProps {
  report: ExecutionReport;
  onToggleSave?: (resourceId: string) => void;
  onAddToPlan?: (resourceId: string) => void;
  messages?: ExecutionSpecialistMessage[];
  onSendQuery?: (query: string, resourceId?: string) => void;
}

export const SoftwareExecutionWorkspace: React.FC<SoftwareExecutionWorkspaceProps> = ({
  report,
  onToggleSave: _onToggleSave,
  onAddToPlan: _onAddToPlan,
  messages = [],
  onSendQuery,
}) => {
  const { synthesis, location } = report;
  const items = synthesis.procurementMap.items;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [auditTargetResource, setAuditTargetResource] = useState<ExecutionResourceItem | null>(null);

  // Filter categories
  const categories = ['all', 'development', 'database', 'hosting', 'deployment', 'analytics'];

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const architectureLayers = [
    {
      step: '01',
      phase: 'PLAN & UI',
      tech: 'Design System & Spec',
      role: 'UI/UX Specs',
      icon: Layers,
      color: 'text-[#1E40AF]',
      bg: 'bg-[#EFF6FF]',
      border: 'border-[#BFDBFE]',
      sub: 'Strict TypeScript interfaces & wireframes',
    },
    {
      step: '02',
      phase: 'DEVELOP',
      tech: 'Next.js 15 / React 19',
      role: 'Frontend & App API',
      icon: Code2,
      color: 'text-[#065F46]',
      bg: 'bg-[#ECFDF5]',
      border: 'border-[#A7F3D0]',
      sub: 'Server components & typed actions',
    },
    {
      step: '03',
      phase: 'HOST & DB',
      tech: 'Supabase PostgreSQL',
      role: 'ACID Relational DB',
      icon: Database,
      color: 'text-[#7C3AED]',
      bg: 'bg-[#F5F3FF]',
      border: 'border-[#DDD6FE]',
      sub: 'Row-Level Security & automated backup',
    },
    {
      step: '04',
      phase: 'DEPLOY',
      tech: 'Vercel / Cloudflare Edge',
      role: 'Global Edge Delivery',
      icon: Cloud,
      color: 'text-[#D97706]',
      bg: 'bg-[#FFFBEB]',
      border: 'border-[#FDE68A]',
      sub: 'Sub-50ms TTFB & Git CI/CD',
    },
    {
      step: '05',
      phase: 'MAINTAIN',
      tech: 'PostHog & Sentry',
      role: 'Telemetry & Health',
      icon: BarChart3,
      color: 'text-[#0284C7]',
      bg: 'bg-[#F0F9FF]',
      border: 'border-[#BAE6FD]',
      sub: 'Real-time alerting & GDPR analytics',
    },
    {
      step: '06',
      phase: 'ACQUIRE',
      tech: 'Stripe Billing / Portal',
      role: 'Self-Serve Subscriptions',
      icon: CreditCard,
      color: 'text-[#059669]',
      bg: 'bg-[#ECFDF5]',
      border: 'border-[#A7F3D0]',
      sub: 'PCI-DSS checkout & tiered seats',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-base font-bold text-[#1E293B] tracking-tight">
              Software Infrastructure & Engineering Stack
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
              Production Architecture
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Verified production-grade developer resources, cloud hosting, and official API documentation tailored to your product build.
          </p>
        </div>

        {/* Local engineering note */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#065F46] bg-[#ECFDF5] px-3 py-1.5 rounded-lg border border-[#A7F3D0]">
          <Globe className="w-3.5 h-3.5" />
          <span>Local Base: {location.operatingLocation}</span>
        </div>
      </div>

      {/* Visual Software Architecture Flow Diagram */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-bold">
            Live Software Architecture Pipeline (Plan → Develop → Host → Deploy → Maintain → Acquire)
          </div>
          <span className="text-[10px] font-mono text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
            Zero-Serverless Overhead
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2.5 relative">
          {architectureLayers.map((layer, idx) => {
            const IconComp = layer.icon;
            return (
              <div
                key={layer.step}
                className={`bg-[#FFFFFF] border ${layer.border} rounded-lg p-3 flex flex-col justify-between shadow-2xs relative group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-[#E8E2D8]">
                    <span className="text-[9px] font-mono font-bold text-[#1E40AF]">
                      PHASE {layer.step}
                    </span>
                    <div className={`w-5 h-5 rounded ${layer.bg} ${layer.color} flex items-center justify-center`}>
                      <IconComp className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono uppercase font-bold text-[#64748B] mt-2">
                    {layer.phase}
                  </div>
                  <div className="text-xs font-bold text-[#1E293B] mt-0.5 leading-tight">
                    {layer.tech}
                  </div>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-[#E8E2D8]">
                  <div className="text-[10px] text-[#475569] leading-snug line-clamp-2 font-mono">
                    {layer.sub}
                  </div>
                </div>

                {idx < architectureLayers.length - 1 && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#CBD5E1] items-center justify-center text-[#64748B] shadow-2xs">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[11px] font-mono uppercase text-[#64748B] font-semibold shrink-0">Filter Layer:</span>
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-md text-xs font-mono capitalize transition-colors ${
              selectedCategory === cat
                ? 'bg-[#1E40AF] text-white shadow-2xs'
                : 'bg-[#FAF8F5] text-[#64748B] hover:text-[#1E293B] border border-[#E5DFD5]'
            }`}
          >
            {cat === 'all' ? 'All Infrastructure' : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Production Infrastructure Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
          return (
            <div
              key={item.id}
              className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-4 flex flex-col justify-between transition-all hover:border-[#1E40AF]/40 hover:shadow-xs shadow-2xs"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#E8E2D8]">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[#1E40AF] block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold text-[#1E293B] mt-0.5 leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-[#15803D] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#BBF7D0] shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    VERIFIED
                  </span>
                </div>

                {/* Purpose & Specs */}
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-[#64748B]">
                    Production Role & Spec
                  </div>
                  <p className="text-xs text-[#334155] font-medium mt-0.5 leading-snug">
                    {item.purpose}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-1 font-mono leading-relaxed">
                    {item.specification}
                  </p>
                </div>

                {/* Latency & Pricing Pill */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E2D8]">
                  <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#E5DFD5]">
                    <div className="text-[9px] font-mono uppercase text-[#64748B]">Benchmark SLA</div>
                    <div className="text-[11px] font-mono text-[#065F46] font-semibold mt-0.5 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#10B981]" />
                      <span>{item.proximityDistance || '<30ms Latency'}</span>
                    </div>
                  </div>

                  <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#E5DFD5]">
                    <div className="text-[9px] font-mono uppercase text-[#64748B]">Pricing Model</div>
                    <div className="text-[11px] font-mono text-[#1E293B] font-semibold mt-0.5 truncate" title={item.estimatedBudgetRange}>
                      {item.estimatedBudgetRange || 'Free Tier Available'}
                    </div>
                  </div>
                </div>

                {/* Verification Source */}
                <div className="text-[10px] font-mono text-[#64748B] bg-[#FFFFFF] p-2 rounded border border-[#E5DFD5]">
                  <span className="font-semibold text-[#1E293B]">Registry:</span> {item.sourceEvidence}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex items-center justify-between gap-2">
                {/* Official Docs Link */}
                {item.officialDocsUrl ? (
                  <a
                    href={item.officialDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-[11px] font-semibold transition-colors shadow-2xs"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Official Docs</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : item.website ? (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-[11px] font-semibold transition-colors shadow-2xs"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-[#94A3B8]">Docs on Portal</span>
                )}

                {/* Specialist Audit Query */}
                {onSendQuery && (
                  <button
                    type="button"
                    onClick={() => setAuditTargetResource(item)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E40AF] hover:underline"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Audit Fit</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Software Comparison & Pricing Table */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-bold">
            Software Stack Comparison & Operational Tiering
          </div>
          <span className="text-[10px] font-mono text-[#64748B]">
            All entries verified against current cloud provider documentation
          </span>
        </div>

        <div className="overflow-x-auto border border-[#E5DFD5] rounded-lg bg-[#FFFFFF]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E5DFD5] text-[10px] font-mono uppercase text-[#64748B]">
                <th className="py-2.5 px-3">Infrastructure Layer</th>
                <th className="py-2.5 px-3">Primary Provider</th>
                <th className="py-2.5 px-3">SLA / Edge Latency</th>
                <th className="py-2.5 px-3">Estimated Tier Cost</th>
                <th className="py-2.5 px-3">Official Documentation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8]">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#1E40AF] whitespace-nowrap">
                    {item.categoryLabel}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#1E293B]">
                    {item.name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#065F46] whitespace-nowrap">
                    {item.proximityDistance || 'Global Edge Network'}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#475569]">
                    {item.estimatedBudgetRange || 'Free tier available'}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {item.officialDocsUrl ? (
                      <a
                        href={item.officialDocsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#1E40AF] font-semibold hover:underline"
                      >
                        <span>Documentation</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#1E40AF] font-semibold hover:underline"
                      >
                        <span>Provider Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-[#94A3B8]">Direct repository</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Specialist Modal */}
      {auditTargetResource && onSendQuery && (
        <ContextualIntelligenceModal
          resource={auditTargetResource}
          isOpen={Boolean(auditTargetResource)}
          messages={messages}
          onSendQuery={onSendQuery}
          onClose={() => setAuditTargetResource(null)}
        />
      )}
    </div>
  );
};
