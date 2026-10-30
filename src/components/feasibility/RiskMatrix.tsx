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
    bg: 'bg-[#FFF0EF]',
    text: 'text-[#E46D68]',
    border: 'border-[#E46D68]/30',
    dot: 'bg-[#E46D68]',
    icon: <AlertOctagon className="w-3.5 h-3.5 text-[#E46D68]" />,
  },
  high: {
    label: 'High',
    bg: 'bg-[#FFF3E7]',
    text: 'text-[#F29A42]',
    border: 'border-[#F29A42]/30',
    dot: 'bg-[#F29A42]',
    icon: <AlertTriangle className="w-3.5 h-3.5 text-[#F29A42]" />,
  },
  medium: {
    label: 'Medium',
    bg: 'bg-[#14213D]/10',
    text: 'text-[#14213D]',
    border: 'border-[#14213D]/30',
    dot: 'bg-[#14213D]',
    icon: <Info className="w-3.5 h-3.5 text-[#14213D]" />,
  },
  low: {
    label: 'Low',
    bg: 'bg-slate-500/10',
    text: 'text-[#60738F]',
    border: 'border-[#8495AE]/40',
    dot: 'bg-[#60738F]',
    icon: <CheckCircle className="w-3.5 h-3.5 text-[#60738F]" />,
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
          <div className="text-xs font-mono uppercase text-[#60738F] tracking-wider font-semibold">
            Section 03 // Risk Intelligence & Severity Clusters
          </div>
          <p className="text-xs text-[#60738F] mt-0.5">
            Prioritized failure modes. Click any card to inspect empirical falsification test and recommended mitigation.
          </p>
        </div>

        {/* Severity Cluster Filter */}
        <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1 rounded-md border border-[#E2EAF4] text-xs font-mono self-start">
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('all')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'all'
                ? 'bg-[#EEF4FB] text-[#14213D] font-semibold border border-[#E2EAF4]'
                : 'text-[#60738F] hover:text-[#60738F]'
            }`}
          >
            All ({risks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('critical')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'critical'
                ? 'bg-[#FFF0EF] text-[#E46D68] font-semibold border border-[#E46D68]/30'
                : 'text-[#60738F] hover:text-[#E46D68]'
            }`}
          >
            Critical ({criticalCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('high')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'high'
                ? 'bg-[#FFF3E7] text-[#F29A42] font-semibold border border-[#F29A42]/30'
                : 'text-[#60738F] hover:text-[#F29A42]'
            }`}
          >
            High ({highCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveSeverityFilter('medium')}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeSeverityFilter === 'medium'
                ? 'bg-[#14213D]/20 text-[#14213D] font-semibold border border-[#14213D]/40'
                : 'text-[#60738F] hover:text-[#14213D]'
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
                  ? 'bg-[#EEF4FB] border-[#14213D] ring-1 ring-[#14213D]/30 shadow-md'
                  : 'bg-[#FFFFFF] hover:bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#E2EAF4]'
              }`}
            >
              <div>
                {/* Header: Category + Severity Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#60738F] truncate">
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
                <h3 className="text-xs font-bold text-[#14213D] leading-snug mb-1.5">
                  {risk.title}
                </h3>

                {/* One-line Consequence */}
                <p className="text-[11px] text-[#60738F] line-clamp-2 leading-relaxed">
                  {risk.whyItMatters}
                </p>
              </div>

              {/* Click to expand cue */}
              <div className="mt-3 pt-2 border-t border-[#E2EAF4]/80 flex items-center justify-between text-[10px] font-mono text-[#60738F]">
                <span className="text-[#14213D]">
                  {isExpanded ? 'Hide Details' : 'Inspect Test & Mitigation'}
                </span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>

              {/* Expanded Details Drawer */}
              {isExpanded && (
                <div
                  className="mt-3 pt-3 border-t border-[#E2EAF4] space-y-2.5 text-xs text-left animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
                    <span className="text-[10px] font-mono uppercase text-[#2684F7] font-semibold block mb-1">
                      Falsification / Validation Test:
                    </span>
                    <p className="text-[#14213D] text-[11px] leading-relaxed">
                      {risk.validationTest}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
                    <span className="text-[10px] font-mono uppercase text-[#19A875] font-semibold block mb-1 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      Recommended Mitigation:
                    </span>
                    <p className="text-[#60738F] text-[11px] leading-relaxed">
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
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold bg-[#14213D] text-[#EEF4FB] hover:bg-[#1769D2] disabled:opacity-50 disabled:cursor-default transition-colors"
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
        <p className="text-xs text-[#60738F] italic text-center py-6">
          No risks match the active severity filter — widen the filter to inspect the full set.
        </p>
      )}
    </div>
  );
};
