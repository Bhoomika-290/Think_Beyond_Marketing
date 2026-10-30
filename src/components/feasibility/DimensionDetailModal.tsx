import React, { useEffect } from 'react';
import type {
  FeasibilityDimensionResult,
  EvidenceItem,
  FeasibilityValidationTask,
} from '../../types/project';
import {
  X,
  Compass,
  Cpu,
  DollarSign,
  MapPin,
  Swords,
  Rocket,
  Users,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface DimensionDetailModalProps {
  dimension: FeasibilityDimensionResult | null;
  onClose: () => void;
  tasks?: FeasibilityValidationTask[];
}

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  market: <Compass className="w-5 h-5 text-[#14213D]" />,
  customer: <Users className="w-5 h-5 text-[#2684F7]" />,
  'business-model': <DollarSign className="w-5 h-5 text-[#19A875]" />,
  operational: <Rocket className="w-5 h-5 text-[#F29A42]" />,
  technical: <Cpu className="w-5 h-5 text-[#1769D2]" />,
  financial: <DollarSign className="w-5 h-5 text-[#3E7A73]" />,
  location: <MapPin className="w-5 h-5 text-[#60738F]" />,
  competitive: <Swords className="w-5 h-5 text-[#E46D68]" />,
  execution: <Compass className="w-5 h-5 text-[#14213D]" />,
};

const EVIDENCE_BADGES: Record<
  EvidenceItem['type'],
  { label: string; bg: string; text: string; border: string }
> = {
  verified: {
    label: 'VERIFIED / USER INPUT',
    bg: 'bg-[#E8F8F1]',
    text: 'text-[#19A875]',
    border: 'border-[#19A875]/30',
  },
  'ai-inference': {
    label: 'AI INFERENCE',
    bg: 'bg-[#14213D]/10',
    text: 'text-[#14213D]',
    border: 'border-[#14213D]/30',
  },
  assumption: {
    label: 'ASSUMPTION',
    bg: 'bg-[#FFF3E7]',
    text: 'text-[#F29A42]',
    border: 'border-[#F29A42]/30',
  },
  'needs-validation': {
    label: 'NEEDS VALIDATION',
    bg: 'bg-[#2684F7]/10',
    text: 'text-[#2684F7]',
    border: 'border-[#2684F7]/30',
  },
};

export const DimensionDetailModal: React.FC<DimensionDetailModalProps> = ({
  dimension,
  onClose,
  tasks = [],
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dimension) return null;

  const icon = DIMENSION_ICONS[dimension.id] || <Compass className="w-5 h-5 text-[#14213D]" />;
  const nextTask = tasks.find((t) => t.dimension === dimension.id && !t.completed)
    ?? tasks.find((t) => t.dimension === dimension.id)
    ?? null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dimension-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl shadow-2xl p-5 sm:p-6 space-y-5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E2EAF4]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4]">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#60738F]">
                  Dimension Drill-Down
                </span>
                <span className="text-[#E2EAF4]">•</span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                    dimension.rating === 'strong'
                      ? 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30'
                      : dimension.rating === 'moderate'
                      ? 'bg-[#14213D]/10 text-[#14213D] border-[#14213D]/30'
                      : dimension.rating === 'weak'
                      ? 'bg-[#FFF0EF] text-[#E46D68] border-[#E46D68]/30'
                      : 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30'
                  }`}
                >
                  {dimension.rating.replace('-', ' ')}
                </span>
              </div>
              <h2 id="modal-dimension-title" className="text-lg font-bold text-[#14213D]">
                {dimension.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#60738F] hover:text-[#14213D] hover:bg-[#EEF4FB] transition-colors"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Headline & Metrics Banner */}
        <div className="p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#14213D] font-sans font-medium flex-1">
            {dimension.headline}
          </span>
          <div className="flex items-center gap-3 text-[#60738F] shrink-0">
            <span>
              Confidence: <strong className="text-[#14213D]">{dimension.confidence.toUpperCase()}</strong>
            </span>
            <span>•</span>
            <span>
              Risk Level: <strong className="text-[#14213D]">{dimension.riskLevel.toUpperCase()}</strong>
            </span>
          </div>
        </div>

        {/* Detailed Reasoning */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase text-[#60738F] tracking-wider flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#14213D]" />
            <span>Structural Reasoning & Mechanics</span>
          </div>
          <p className="text-xs text-[#60738F] leading-relaxed p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4]">
            {dimension.reasoning}
          </p>
        </div>

        {/* Grounding Evidence */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#60738F] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#19A875]" />
            <span>Supporting Evidence & Grounding Vectors</span>
          </div>
          <div className="space-y-2">
            {dimension.evidence.map((item) => {
              const badge = EVIDENCE_BADGES[item.type];
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[#14213D] block">
                      {item.label}
                    </span>
                    <p className="text-xs text-[#60738F] leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 self-start text-[9px] font-mono font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.bg} ${badge.border} ${badge.text}`}
                  >
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assumptions & Information Gaps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Assumptions */}
          <div className="p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] space-y-2">
            <div className="text-xs font-mono uppercase text-[#F29A42] flex items-center gap-1.5 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Assumptions</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#60738F]">
              {dimension.assumptions.map((assump, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#F29A42] font-bold shrink-0">•</span>
                  <span>{assump}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Information */}
          <div className="p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] space-y-2">
            <div className="text-xs font-mono uppercase text-[#2684F7] flex items-center gap-1.5 font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Unknowns / Information Gaps</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#60738F]">
              {dimension.missingInformation.map((info, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#2684F7] font-bold shrink-0">•</span>
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Validation Action (from the live validation plan) */}
        <div className="p-3.5 rounded-lg bg-[#EEF4FB] border border-[#14213D]/25 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold block">
            Next validation action
          </span>
          {nextTask ? (
            <p className="text-xs text-[#60738F] leading-relaxed">
              <span className="font-semibold text-[#14213D]">{nextTask.title}.</span>{' '}
              {nextTask.action}
              {nextTask.completed && (
                <span className="text-[#19A875] font-mono text-[10px] ml-1">● DONE</span>
              )}
            </p>
          ) : (
            <p className="text-xs text-[#60738F] italic">
              No validation task scoped to this dimension yet — add one in Section 06.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#E2EAF4] space-y-2">
          <p className="text-[10px] font-mono text-[#60738F]">
            Assessment strength reflects current evidence weight — not a measured probability.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-md bg-[#EEF4FB] text-xs font-mono text-[#14213D] hover:bg-[#E2EAF4] border border-[#E2EAF4] transition-colors"
            >
              Close Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
