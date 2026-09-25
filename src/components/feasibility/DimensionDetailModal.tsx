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
  market: <Compass className="w-5 h-5 text-[#2B3D4F]" />,
  customer: <Users className="w-5 h-5 text-[#5A7A96]" />,
  'business-model': <DollarSign className="w-5 h-5 text-[#4A7C59]" />,
  operational: <Rocket className="w-5 h-5 text-[#8A6D2B]" />,
  technical: <Cpu className="w-5 h-5 text-[#3E5770]" />,
  financial: <DollarSign className="w-5 h-5 text-[#3E7A73]" />,
  location: <MapPin className="w-5 h-5 text-[#5B6B7F]" />,
  competitive: <Swords className="w-5 h-5 text-[#9E4A4A]" />,
  execution: <Compass className="w-5 h-5 text-[#2B3D4F]" />,
};

const EVIDENCE_BADGES: Record<
  EvidenceItem['type'],
  { label: string; bg: string; text: string; border: string }
> = {
  verified: {
    label: 'VERIFIED / USER INPUT',
    bg: 'bg-[#4A7C59]/10',
    text: 'text-[#4A7C59]',
    border: 'border-[#4A7C59]/30',
  },
  'ai-inference': {
    label: 'AI INFERENCE',
    bg: 'bg-[#2B3D4F]/10',
    text: 'text-[#2B3D4F]',
    border: 'border-[#2B3D4F]/30',
  },
  assumption: {
    label: 'ASSUMPTION',
    bg: 'bg-[#8A6D2B]/10',
    text: 'text-[#8A6D2B]',
    border: 'border-[#8A6D2B]/30',
  },
  'needs-validation': {
    label: 'NEEDS VALIDATION',
    bg: 'bg-[#5A7A96]/10',
    text: 'text-[#5A7A96]',
    border: 'border-[#5A7A96]/30',
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

  const icon = DIMENSION_ICONS[dimension.id] || <Compass className="w-5 h-5 text-[#2B3D4F]" />;
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
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl shadow-2xl p-5 sm:p-6 space-y-5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#DDD5C5]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90]">
                  Dimension Drill-Down
                </span>
                <span className="text-[#DDD5C5]">•</span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                    dimension.rating === 'strong'
                      ? 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30'
                      : dimension.rating === 'moderate'
                      ? 'bg-[#2B3D4F]/10 text-[#2B3D4F] border-[#2B3D4F]/30'
                      : dimension.rating === 'weak'
                      ? 'bg-[#9E4A4A]/10 text-[#9E4A4A] border-[#9E4A4A]/30'
                      : 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30'
                  }`}
                >
                  {dimension.rating.replace('-', ' ')}
                </span>
              </div>
              <h2 id="modal-dimension-title" className="text-lg font-bold text-[#2B3D4F]">
                {dimension.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B7D90] hover:text-[#2B3D4F] hover:bg-[#ECE6DA] transition-colors"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Headline & Metrics Banner */}
        <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#2B3D4F] font-sans font-medium flex-1">
            {dimension.headline}
          </span>
          <div className="flex items-center gap-3 text-[#4A5E73] shrink-0">
            <span>
              Confidence: <strong className="text-[#2B3D4F]">{dimension.confidence.toUpperCase()}</strong>
            </span>
            <span>•</span>
            <span>
              Risk Level: <strong className="text-[#2B3D4F]">{dimension.riskLevel.toUpperCase()}</strong>
            </span>
          </div>
        </div>

        {/* Detailed Reasoning */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase text-[#6B7D90] tracking-wider flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#2B3D4F]" />
            <span>Structural Reasoning & Mechanics</span>
          </div>
          <p className="text-xs text-[#4A5E73] leading-relaxed p-3.5 rounded-lg bg-[#ECE6DA] border border-[#DDD5C5]">
            {dimension.reasoning}
          </p>
        </div>

        {/* Grounding Evidence */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#6B7D90] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#4A7C59]" />
            <span>Supporting Evidence & Grounding Vectors</span>
          </div>
          <div className="space-y-2">
            {dimension.evidence.map((item) => {
              const badge = EVIDENCE_BADGES[item.type];
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[#2B3D4F] block">
                      {item.label}
                    </span>
                    <p className="text-xs text-[#4A5E73] leading-relaxed">
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
          <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
            <div className="text-xs font-mono uppercase text-[#8A6D2B] flex items-center gap-1.5 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Assumptions</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#4A5E73]">
              {dimension.assumptions.map((assump, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#8A6D2B] font-bold shrink-0">•</span>
                  <span>{assump}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Information */}
          <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
            <div className="text-xs font-mono uppercase text-[#5A7A96] flex items-center gap-1.5 font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Unknowns / Information Gaps</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#4A5E73]">
              {dimension.missingInformation.map((info, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#5A7A96] font-bold shrink-0">•</span>
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Next Validation Action (from the live validation plan) */}
        <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#2B3D4F]/25 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#2B3D4F] font-bold block">
            Next validation action
          </span>
          {nextTask ? (
            <p className="text-xs text-[#4A5E73] leading-relaxed">
              <span className="font-semibold text-[#2B3D4F]">{nextTask.title}.</span>{' '}
              {nextTask.action}
              {nextTask.completed && (
                <span className="text-[#4A7C59] font-mono text-[10px] ml-1">● DONE</span>
              )}
            </p>
          ) : (
            <p className="text-xs text-[#6B7D90] italic">
              No validation task scoped to this dimension yet — add one in Section 06.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#DDD5C5] space-y-2">
          <p className="text-[10px] font-mono text-[#6B7D90]">
            Assessment strength reflects current evidence weight — not a measured probability.
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-md bg-[#ECE6DA] text-xs font-mono text-[#2B3D4F] hover:bg-[#DDD5C5] border border-[#C4B8A0] transition-colors"
            >
              Close Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
