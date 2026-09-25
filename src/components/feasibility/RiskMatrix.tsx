import React, { useState } from 'react';
import type {
  FeasibilityRisk,
  RiskSeverity,
  FeasibilityDimensionId,
  FeasibilityValidationTask,
} from '../../types/project';
import { ChartEmptyState } from '../common/ChartEmptyState';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  FlaskConical,
} from 'lucide-react';

interface RiskMatrixProps {
  risks: FeasibilityRisk[];
  tasks?: FeasibilityValidationTask[];
  onAddTask?: (task: {
    title: string;
    action: string;
    dimension: FeasibilityDimensionId;
  }) => void;
}

const SEVERITY_CONFIG: Record<
  RiskSeverity,
  { label: string; bg: string; text: string; border: string; dot: string; icon: React.ReactNode }
> = {
  critical: {
    label: 'Critical',
    bg: 'bg-[#9E4A4A]/10',
    text: 'text-[#9E4A4A]',
    border: 'border-[#9E4A4A]/30',
    dot: 'bg-[#9E4A4A]',
    icon: <AlertOctagon className="w-3.5 h-3.5 text-[#9E4A4A]" />,
  },
  high: {
    label: 'High',
    bg: 'bg-[#8A6D2B]/10',
    text: 'text-[#8A6D2B]',
    border: 'border-[#8A6D2B]/30',
    dot: 'bg-[#8A6D2B]',
    icon: <AlertTriangle className="w-3.5 h-3.5 text-[#8A6D2B]" />,
  },
  medium: {
    label: 'Medium',
    bg: 'bg-[#2B3D4F]/10',
    text: 'text-[#2B3D4F]',
    border: 'border-[#2B3D4F]/30',
    dot: 'bg-[#2B3D4F]',
    icon: <Info className="w-3.5 h-3.5 text-[#2B3D4F]" />,
  },
  low: {
    label: 'Low',
    bg: 'bg-slate-500/10',
    text: 'text-[#4A5E73]',
    border: 'border-[#7A8CA0]/40',
    dot: 'bg-[#4A5E73]',
    icon: <CheckCircle className="w-3.5 h-3.5 text-[#4A5E73]" />,
  },
};

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ risks, tasks = [], onAddTask }) => {
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<string>('all');
  const [expandedRiskId, setExpandedRiskId] = useState<string | null>(null);
  const [queuedTaskIds, setQueuedTaskIds] = useState<string[]>([]);

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
          <div className="text-xs font-mono uppercase text-[#6B7D90] tracking-wider font-semibold">
            Section 03 // Risk Intelligence & Severity Clusters
          </div>
          <p className="text-xs text-[#4A5E73] mt-0.5">
            Prioritized failure modes. Click any card to inspect empirical falsification test and recommended mitigation.
          </p>
        </div>

        {/* Severity Cluster Filter */}
        <div className="flex items-center gap-1.5 bg-[#FDFCF8] p-1 rounded-md border border-[#DDD5C5] text-xs font-mono self-start">
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('all')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'all'
                ? 'bg-[#ECE6DA] text-[#2B3D4F] font-semibold border border-[#C4B8A0]'
                : 'text-[#6B7D90] hover:text-[#4A5E73]'
            }`}
          >
            All ({risks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('critical')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'critical'
                ? 'bg-[#9E4A4A]/20 text-[#9E4A4A] font-semibold border border-[#9E4A4A]/40'
                : 'text-[#6B7D90] hover:text-[#9E4A4A]'
            }`}
          >
            Critical ({criticalCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('high')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'high'
                ? 'bg-[#8A6D2B]/20 text-[#8A6D2B] font-semibold border border-[#8A6D2B]/40'
                : 'text-[#6B7D90] hover:text-[#8A6D2B]'
            }`}
          >
            High ({highCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('medium')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'medium'
                ? 'bg-[#2B3D4F]/20 text-[#2B3D4F] font-semibold border border-[#2B3D4F]/40'
                : 'text-[#6B7D90] hover:text-[#2B3D4F]'
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
                  ? 'bg-[#ECE6DA] border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30 shadow-md'
                  : 'bg-[#FDFCF8] hover:bg-[#ECE6DA] border-[#DDD5C5] hover:border-[#C4B8A0]'
              }`}
            >
              <div>
                {/* Header: Category + Severity Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90] truncate">
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
                <h3 className="text-xs font-bold text-[#2B3D4F] leading-snug mb-1.5">
                  {risk.title}
                </h3>

                {/* One-line Consequence */}
                <p className="text-[11px] text-[#4A5E73] line-clamp-2 leading-relaxed">
                  {risk.whyItMatters}
                </p>
              </div>

              {/* Click to expand cue */}
              <div className="mt-3 pt-2 border-t border-[#DDD5C5]/80 flex items-center justify-between text-[10px] font-mono text-[#6B7D90]">
                <span className="text-[#2B3D4F]">
                  {isExpanded ? 'Hide Details' : 'Inspect Test & Mitigation'}
                </span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {/* Expanded Details Drawer */}
              {isExpanded && (
                <div
                  className="mt-3 pt-3 border-t border-[#DDD5C5] space-y-2.5 text-xs text-left animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase text-[#5A7A96] font-semibold block mb-1">
                      Falsification / Validation Test:
                    </span>
                    <p className="text-[#2B3D4F] text-[11px] leading-relaxed">
                      {risk.validationTest}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase text-[#4A7C59] font-semibold block mb-1 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      Recommended Mitigation:
                    </span>
                    <p className="text-[#4A5E73] text-[11px] leading-relaxed">
                      {risk.mitigation}
                    </p>
                  </div>

                  {onAddTask && (() => {
                    const alreadyQueued =
                      queuedTaskIds.includes(risk.id) ||
                      tasks.some((t) => t.title === `Falsify: ${risk.title}`);
                    return (
                      <button
                        type="button"
                        disabled={alreadyQueued}
                        onClick={() => {
                          onAddTask({
                            title: `Falsify: ${risk.title}`,
                            action: risk.validationTest,
                            dimension: risk.dimension,
                          });
                          setQueuedTaskIds((prev) => (prev.includes(risk.id) ? prev : [...prev, risk.id]));
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold bg-[#2B3D4F] text-[#F5F1EB] hover:bg-[#3E5770] disabled:opacity-50 disabled:cursor-default transition-colors"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        {alreadyQueued
                          ? 'Queued in Validation Plan'
                          : 'Run falsification test → queue task'}
                      </button>
                    );
                  })()}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {risks.length === 0 && (
        <ChartEmptyState
          title="No risks modelled yet"
          message="The engine produced no risk entries. Add discovery input in Stage 01 and re-evaluate."
          hint="risks[] is empty"
        />
      )}
      {risks.length > 0 && filteredRisks.length === 0 && (
        <p className="text-xs text-[#6B7D90] italic text-center py-6">
          No risks match the active severity filter — widen the filter to inspect the full set.
        </p>
      )}
    </div>
  );
};
