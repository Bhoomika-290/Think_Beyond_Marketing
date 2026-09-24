import React, { useEffect } from 'react';
import type { FeasibilityDimensionResult, EvidenceItem } from '../../types/project';
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
}

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  market: <Compass className="w-5 h-5 text-[#4D8DFF]" />,
  customer: <Users className="w-5 h-5 text-cyan-400" />,
  'business-model': <DollarSign className="w-5 h-5 text-emerald-400" />,
  operational: <Rocket className="w-5 h-5 text-amber-400" />,
  technical: <Cpu className="w-5 h-5 text-indigo-400" />,
  financial: <DollarSign className="w-5 h-5 text-teal-400" />,
  location: <MapPin className="w-5 h-5 text-purple-400" />,
  competitive: <Swords className="w-5 h-5 text-rose-400" />,
  execution: <Compass className="w-5 h-5 text-blue-400" />,
};

const EVIDENCE_BADGES: Record<
  EvidenceItem['type'],
  { label: string; bg: string; text: string; border: string }
> = {
  verified: {
    label: 'VERIFIED / USER INPUT',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
  'ai-inference': {
    label: 'AI INFERENCE',
    bg: 'bg-[#4D8DFF]/10',
    text: 'text-[#4D8DFF]',
    border: 'border-[#4D8DFF]/30',
  },
  assumption: {
    label: 'ASSUMPTION',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  'needs-validation': {
    label: 'NEEDS VALIDATION',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
};

export const DimensionDetailModal: React.FC<DimensionDetailModalProps> = ({
  dimension,
  onClose,
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

  const icon = DIMENSION_ICONS[dimension.id] || <Compass className="w-5 h-5 text-[#4D8DFF]" />;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dimension-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111823] border border-[#263244] rounded-xl shadow-2xl p-5 sm:p-6 space-y-5 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#263244]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#0B1017] border border-[#263244]">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#738095]">
                  Dimension Drill-Down
                </span>
                <span className="text-[#263244]">•</span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                    dimension.rating === 'strong'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : dimension.rating === 'moderate'
                      ? 'bg-blue-500/10 text-[#4D8DFF] border-blue-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {dimension.rating.replace('-', ' ')}
                </span>
              </div>
              <h2 id="modal-dimension-title" className="text-lg font-bold text-[#F3F4F6]">
                {dimension.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#738095] hover:text-[#F3F4F6] hover:bg-[#151E2B] transition-colors"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Headline & Metrics Banner */}
        <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#F3F4F6] font-sans font-medium flex-1">
            {dimension.headline}
          </span>
          <div className="flex items-center gap-3 text-[#AAB4C3] shrink-0">
            <span>
              Confidence: <strong className="text-[#F3F4F6]">{dimension.confidence.toUpperCase()}</strong>
            </span>
            <span>•</span>
            <span>
              Risk Level: <strong className="text-[#F3F4F6]">{dimension.riskLevel.toUpperCase()}</strong>
            </span>
          </div>
        </div>

        {/* Detailed Reasoning */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase text-[#738095] tracking-wider flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#4D8DFF]" />
            <span>Structural Reasoning & Mechanics</span>
          </div>
          <p className="text-xs text-[#AAB4C3] leading-relaxed p-3.5 rounded-lg bg-[#151E2B] border border-[#263244]">
            {dimension.reasoning}
          </p>
        </div>

        {/* Grounding Evidence */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#738095] tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Supporting Evidence & Grounding Vectors</span>
          </div>
          <div className="space-y-2">
            {dimension.evidence.map((item) => {
              const badge = EVIDENCE_BADGES[item.type];
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-[#0B1017] border border-[#263244] flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                >
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <span className="text-xs font-semibold text-[#F3F4F6] block">
                      {item.label}
                    </span>
                    <p className="text-xs text-[#AAB4C3] leading-relaxed">
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
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244] space-y-2">
            <div className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1.5 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Assumptions</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#AAB4C3]">
              {dimension.assumptions.map((assump, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span>{assump}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing Information */}
          <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244] space-y-2">
            <div className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-1.5 font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Unknowns / Information Gaps</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#AAB4C3]">
              {dimension.missingInformation.map((info, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold shrink-0">•</span>
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#263244] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#151E2B] text-xs font-mono text-[#F3F4F6] hover:bg-[#263244] border border-[#34445A] transition-colors"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};
