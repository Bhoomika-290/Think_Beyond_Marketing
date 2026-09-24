import React, { useState } from 'react';
import type {
  FeasibilityReport,
  FeasibilityDimensionResult,
  FeasibilityDimensionId,
  AssessmentRating,
} from '../../types/project';
import { RadarIntelligenceMap } from './RadarIntelligenceMap';
import { DimensionDetailModal } from './DimensionDetailModal';
import {
  Compass,
  Cpu,
  DollarSign,
  MapPin,
  Swords,
  Rocket,
  Users,
  ExternalLink,
  Filter,
} from 'lucide-react';

interface FeasibilityMatrixProps {
  report: FeasibilityReport;
  selectedDimensionId: string | null;
  onSelectDimension: (dimensionId: string) => void;
}

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  market: <Compass className="w-4 h-4 text-[#4D8DFF]" />,
  customer: <Users className="w-4 h-4 text-cyan-400" />,
  'business-model': <DollarSign className="w-4 h-4 text-emerald-400" />,
  operational: <Rocket className="w-4 h-4 text-amber-400" />,
  technical: <Cpu className="w-4 h-4 text-indigo-400" />,
  financial: <DollarSign className="w-4 h-4 text-teal-400" />,
  location: <MapPin className="w-4 h-4 text-purple-400" />,
  competitive: <Swords className="w-4 h-4 text-rose-400" />,
  execution: <Compass className="w-4 h-4 text-blue-400" />,
};

const RATING_PILLS: Record<
  AssessmentRating,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  strong: {
    label: 'Strong',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  moderate: {
    label: 'Moderate',
    bg: 'bg-blue-500/10',
    text: 'text-[#4D8DFF]',
    border: 'border-blue-500/30',
    dot: 'bg-[#4D8DFF]',
  },
  weak: {
    label: 'Weak',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    dot: 'bg-rose-400',
  },
  'needs-validation': {
    label: 'Needs Validation',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
};

export const FeasibilityMatrix: React.FC<FeasibilityMatrixProps> = ({
  report,
  selectedDimensionId,
  onSelectDimension,
}) => {
  const [filterRating, setFilterRating] = useState<string>('all');
  const [activeModalDimension, setActiveModalDimension] = useState<FeasibilityDimensionResult | null>(null);

  const allDimensions = Object.values(report.dimensions);

  const filteredDimensions = allDimensions.filter((dim) => {
    if (filterRating !== 'all') {
      return dim.rating === filterRating;
    }
    return true;
  });

  const handleTileClick = (dimension: FeasibilityDimensionResult) => {
    onSelectDimension(dimension.id);
    setActiveModalDimension(dimension);
  };

  const handleRadarSelect = (dimensionId: FeasibilityDimensionId) => {
    onSelectDimension(dimensionId);
    const dim = report.dimensions[dimensionId];
    if (dim) setActiveModalDimension(dim);
  };

  return (
    <div className="space-y-4">
      {/* Section Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono uppercase text-[#738095] tracking-wider font-semibold">
            Section 02 // 9-Dimension Intelligence Map & Evaluation Grid
          </div>
          <p className="text-xs text-[#AAB4C3] mt-0.5">
            Holistic assessment of venture mechanics. Click any dimension node or tile to inspect underlying reasoning and evidence.
          </p>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-1 bg-[#111823] p-1 rounded-md border border-[#263244] text-[11px] font-mono self-start">
          <span className="text-[#738095] px-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {(['all', 'strong', 'moderate', 'needs-validation'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setFilterRating(r)}
              className={`px-2 py-0.5 rounded capitalize transition-colors ${
                filterRating === r
                  ? 'bg-[#151E2B] text-[#F3F4F6] font-semibold border border-[#34445A]'
                  : 'text-[#738095] hover:text-[#AAB4C3]'
              }`}
            >
              {r === 'all' ? 'All (9)' : r === 'needs-validation' ? 'Needs Val' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Centerpiece: Radar Intelligence Map + 3x3 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Interactive Radar Intelligence Map (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <RadarIntelligenceMap
            dimensions={report.dimensions}
            onSelectDimension={handleRadarSelect}
            selectedDimensionId={selectedDimensionId}
          />
        </div>

        {/* Right: 3x3 Intelligence Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredDimensions.map((dimension) => {
            const icon = DIMENSION_ICONS[dimension.id] || <Compass className="w-4 h-4 text-[#4D8DFF]" />;
            const pill = RATING_PILLS[dimension.rating];
            const isSelected = selectedDimensionId === dimension.id;

            return (
              <div
                key={dimension.id}
                onClick={() => handleTileClick(dimension)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'bg-[#151E2B] border-[#4D8DFF] ring-1 ring-[#4D8DFF]/40 shadow-md'
                    : 'bg-[#111823] hover:bg-[#151E2B] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Status Pill */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <div className="p-1 rounded bg-[#0B1017] border border-[#263244]">
                      {icon}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${pill.bg} ${pill.border} ${pill.text}`}
                    >
                      <span className={`w-1 h-1 rounded-full ${pill.dot}`} />
                      {pill.label}
                    </span>
                  </div>

                  {/* Title & 1-line Headline */}
                  <h3 className="text-xs font-semibold text-[#F3F4F6] truncate mb-1">
                    {dimension.name}
                  </h3>
                  <p className="text-[11px] text-[#AAB4C3] line-clamp-2 leading-relaxed">
                    {dimension.headline}
                  </p>
                </div>

                {/* Bottom Metadata & Drill-down Cue */}
                <div className="mt-3 pt-2 border-t border-[#263244]/80 flex items-center justify-between text-[10px] font-mono text-[#738095]">
                  <span>
                    Risk: <strong className="text-[#AAB4C3]">{dimension.riskLevel.toUpperCase()}</strong>
                  </span>
                  <span className="text-[#4D8DFF] hover:text-[#6EA8FF] flex items-center gap-0.5 font-medium">
                    Drill down <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* On-demand Detailed Drill-down Modal */}
      <DimensionDetailModal
        dimension={activeModalDimension}
        onClose={() => setActiveModalDimension(null)}
      />
    </div>
  );
};
