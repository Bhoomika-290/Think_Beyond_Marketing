import React, { useState } from 'react';
import type { FeasibilityRisk, RiskSeverity } from '../../types/project';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface RiskMatrixProps {
  risks: FeasibilityRisk[];
}

const SEVERITY_CONFIG: Record<
  RiskSeverity,
  { label: string; bg: string; text: string; border: string; dot: string; icon: React.ReactNode }
> = {
  critical: {
    label: 'Critical',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    dot: 'bg-rose-400',
    icon: <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />,
  },
  high: {
    label: 'High',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
  },
  medium: {
    label: 'Medium',
    bg: 'bg-blue-500/10',
    text: 'text-[#4D8DFF]',
    border: 'border-blue-500/30',
    dot: 'bg-[#4D8DFF]',
    icon: <Info className="w-3.5 h-3.5 text-[#4D8DFF]" />,
  },
  low: {
    label: 'Low',
    bg: 'bg-slate-500/10',
    text: 'text-[#AAB4C3]',
    border: 'border-slate-500/30',
    dot: 'bg-[#AAB4C3]',
    icon: <CheckCircle className="w-3.5 h-3.5 text-[#AAB4C3]" />,
  },
};

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ risks }) => {
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<string>('all');
  const [expandedRiskId, setExpandedRiskId] = useState<string | null>(null);

  const toggleRiskExpand = (id: string) => {
    setExpandedRiskId(expandedRiskId === id ? null : id);
  };

  const filteredRisks = risks.filter((r) => {
    if (activeSeverityFilter === 'all') return true;
    return r.severity === activeSeverityFilter;
  });

  const criticalCount = risks.filter((r) => r.severity === 'critical').length;
  const highCount = risks.filter((r) => r.severity === 'high').length;
  const mediumCount = risks.filter((r) => r.severity === 'medium').length;

  return (
    <div className="space-y-3.5">
      {/* Header & Severity Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono uppercase text-[#738095] tracking-wider font-semibold">
            Section 03 // Risk Intelligence & Severity Clusters
          </div>
          <p className="text-xs text-[#AAB4C3] mt-0.5">
            Prioritized failure modes. Click any card to inspect empirical falsification test and recommended mitigation.
          </p>
        </div>

        {/* Severity Cluster Filter */}
        <div className="flex items-center gap-1.5 bg-[#111823] p-1 rounded-md border border-[#263244] text-xs font-mono self-start">
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('all')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'all'
                ? 'bg-[#151E2B] text-[#F3F4F6] font-semibold border border-[#34445A]'
                : 'text-[#738095] hover:text-[#AAB4C3]'
            }`}
          >
            All ({risks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('critical')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'critical'
                ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/40'
                : 'text-[#738095] hover:text-rose-400'
            }`}
          >
            Critical ({criticalCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('high')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'high'
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                : 'text-[#738095] hover:text-amber-400'
            }`}
          >
            High ({highCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('medium')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'medium'
                ? 'bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/40'
                : 'text-[#738095] hover:text-blue-400'
            }`}
          >
            Medium ({mediumCount})
          </button>
        </div>
      </div>

      {/* Visual Risk Grid: Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredRisks.map((risk) => {
          const config = SEVERITY_CONFIG[risk.severity];
          const isExpanded = expandedRiskId === risk.id;

          return (
            <div
              key={risk.id}
              onClick={() => toggleRiskExpand(risk.id)}
              className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                isExpanded
                  ? 'bg-[#151E2B] border-[#4D8DFF] ring-1 ring-[#4D8DFF]/30 shadow-md'
                  : 'bg-[#111823] hover:bg-[#151E2B] border-[#263244] hover:border-[#34445A]'
              }`}
            >
              <div>
                {/* Header: Category + Severity Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#738095] truncate">
                    {risk.category}
                  </span>

                  <span
                    className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border uppercase tracking-wider ${config.bg} ${config.border} ${config.text}`}
                  >
                    {config.icon}
                    {config.label}
                  </span>
                </div>

                {/* Risk Title */}
                <h3 className="text-xs font-bold text-[#F3F4F6] leading-snug mb-1.5">
                  {risk.title}
                </h3>

                {/* One-line Consequence */}
                <p className="text-[11px] text-[#AAB4C3] line-clamp-2 leading-relaxed">
                  {risk.whyItMatters}
                </p>
              </div>

              {/* Click to expand cue */}
              <div className="mt-3 pt-2 border-t border-[#263244]/80 flex items-center justify-between text-[10px] font-mono text-[#738095]">
                <span className="text-[#4D8DFF]">
                  {isExpanded ? 'Hide Details' : 'Inspect Test & Mitigation'}
                </span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {/* Expanded Details Drawer */}
              {isExpanded && (
                <div
                  className="mt-3 pt-3 border-t border-[#263244] space-y-2.5 text-xs text-left animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2.5 rounded bg-[#0B1017] border border-[#263244]">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold block mb-1">
                      Falsification / Validation Test:
                    </span>
                    <p className="text-[#F3F4F6] text-[11px] leading-relaxed">
                      {risk.validationTest}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[#0B1017] border border-[#263244]">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block mb-1 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      Recommended Mitigation:
                    </span>
                    <p className="text-[#AAB4C3] text-[11px] leading-relaxed">
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
