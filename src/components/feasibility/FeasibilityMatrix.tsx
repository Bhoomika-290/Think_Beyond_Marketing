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
  market: <Compass className="w-4 h-4 text-[#14213D]" />,
  customer: <Users className="w-4 h-4 text-[#2684F7]" />,
  'business-model': <DollarSign className="w-4 h-4 text-[#19A875]" />,
  operational: <Rocket className="w-4 h-4 text-[#F29A42]" />,
  technical: <Cpu className="w-4 h-4 text-[#1769D2]" />,
  financial: <DollarSign className="w-4 h-4 text-[#3E7A73]" />,
  location: <MapPin className="w-4 h-4 text-[#60738F]" />,
  competitive: <Swords className="w-4 h-4 text-[#E46D68]" />,
  execution: <Compass className="w-4 h-4 text-[#14213D]" />,
};

const RATING_PILLS: Record<
  AssessmentRating,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  strong: {
    label: 'Strong',
    bg: 'bg-[#E8F8F1]',
    text: 'text-[#19A875]',
    border: 'border-[#19A875]/30',
    dot: 'bg-[#19A875]',
  },
  moderate: {
    label: 'Moderate',
    bg: 'bg-[#14213D]/10',
    text: 'text-[#14213D]',
    border: 'border-[#14213D]/30',
    dot: 'bg-[#14213D]',
  },
  weak: {
    label: 'Weak',
    bg: 'bg-[#FFF0EF]',
    text: 'text-[#E46D68]',
    border: 'border-[#E46D68]/30',
    dot: 'bg-[#E46D68]',
  },
  'needs-validation': {
    label: 'Needs Validation',
    bg: 'bg-[#FFF3E7]',
    text: 'text-[#F29A42]',
    border: 'border-[#F29A42]/30',
    dot: 'bg-[#F29A42]',
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
          <div className="text-xs font-mono uppercase text-[#60738F] tracking-wider font-semibold">
            Section 02 // 9-Dimension Intelligence Map & Evaluation Grid
          </div>
          <p className="text-xs text-[#60738F] mt-0.5">
            Holistic assessment of venture mechanics. Click any dimension node or tile to inspect underlying reasoning and evidence.
          </p>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-1 bg-[#FFFFFF] p-1 rounded-md border border-[#E2EAF4] text-[11px] font-mono self-start">
          <span className="text-[#60738F] px-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {(['all', 'strong', 'moderate', 'needs-validation'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setFilterRating(r)}
              className={`px-2 py-0.5 rounded capitalize transition-colors ${
                filterRating === r
                  ? 'bg-[#EEF4FB] text-[#14213D] font-semibold border border-[#E2EAF4]'
                  : 'text-[#60738F] hover:text-[#60738F]'
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
            const icon = DIMENSION_ICONS[dimension.id] || <Compass className="w-4 h-4 text-[#14213D]" />;
            const pill = RATING_PILLS[dimension.rating];
            const isSelected = selectedDimensionId === dimension.id;

            return (
              <div
                key={dimension.id}
                onClick={() => handleTileClick(dimension)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'bg-[#EEF4FB] border-[#14213D] ring-1 ring-[#14213D]/40 shadow-md'
                    : 'bg-[#FFFFFF] hover:bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#E2EAF4]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Status Pill */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <div className="p-1 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
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
                  <h3 className="text-xs font-semibold text-[#14213D] truncate mb-1">
                    {dimension.name}
                  </h3>
                  <p className="text-[11px] text-[#60738F] line-clamp-2 leading-relaxed">
                    {dimension.headline}
                  </p>
                </div>

                {/* Bottom Metadata & Drill-down Cue */}
                <div className="mt-3 pt-2 border-t border-[#E2EAF4]/80 space-y-1.5">
                  {/* Evidence confidence meter */}
                  <div className="flex items-center gap-1.5" title={`Evidence confidence: ${dimension.confidence}`}>
                    <div className="flex-1 h-1 rounded-full bg-[#EEF4FB] border border-[#E2EAF4] overflow-hidden flex">
                      {(['high', 'medium', 'low'] as const).map((level, i) => {
                        const filled =
                          dimension.confidence === 'high' ? 3 : dimension.confidence === 'medium' ? 2 : 1;
                        return (
                          <div
                            key={level}
                            className={`flex-1 h-full ${i > 0 ? 'ml-0.5' : ''} ${
                              i < filled
                                ? dimension.confidence === 'high'
                                  ? 'bg-[#19A875]'
                                  : dimension.confidence === 'medium'
                                  ? 'bg-[#14213D]'
                                  : 'bg-[#F29A42]'
                                : 'bg-transparent'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[9px] font-mono text-[#60738F] shrink-0">
                      {dimension.evidence.length} signals · {dimension.missingInformation.length} gaps
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#60738F]">
                    <span>
                      Risk: <strong className="text-[#60738F]">{dimension.riskLevel.toUpperCase()}</strong>
                    </span>
                    <span className="text-[#14213D] hover:text-[#1769D2] flex items-center gap-0.5 font-medium">
                      Drill down <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
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
        tasks={report.validationTasks}
      />
    </div>
  );
};
