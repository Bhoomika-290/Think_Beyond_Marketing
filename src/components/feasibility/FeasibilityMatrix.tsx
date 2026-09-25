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
  market: <Compass className="w-4 h-4 text-[#2B3D4F]" />,
  customer: <Users className="w-4 h-4 text-[#5A7A96]" />,
  'business-model': <DollarSign className="w-4 h-4 text-[#4A7C59]" />,
  operational: <Rocket className="w-4 h-4 text-[#8A6D2B]" />,
  technical: <Cpu className="w-4 h-4 text-[#3E5770]" />,
  financial: <DollarSign className="w-4 h-4 text-[#3E7A73]" />,
  location: <MapPin className="w-4 h-4 text-[#5B6B7F]" />,
  competitive: <Swords className="w-4 h-4 text-[#9E4A4A]" />,
  execution: <Compass className="w-4 h-4 text-[#2B3D4F]" />,
};

const RATING_PILLS: Record<
  AssessmentRating,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  strong: {
    label: 'Strong',
    bg: 'bg-[#4A7C59]/10',
    text: 'text-[#4A7C59]',
    border: 'border-[#4A7C59]/30',
    dot: 'bg-[#4A7C59]',
  },
  moderate: {
    label: 'Moderate',
    bg: 'bg-[#2B3D4F]/10',
    text: 'text-[#2B3D4F]',
    border: 'border-[#2B3D4F]/30',
    dot: 'bg-[#2B3D4F]',
  },
  weak: {
    label: 'Weak',
    bg: 'bg-[#9E4A4A]/10',
    text: 'text-[#9E4A4A]',
    border: 'border-[#9E4A4A]/30',
    dot: 'bg-[#9E4A4A]',
  },
  'needs-validation': {
    label: 'Needs Validation',
    bg: 'bg-[#8A6D2B]/10',
    text: 'text-[#8A6D2B]',
    border: 'border-[#8A6D2B]/30',
    dot: 'bg-[#8A6D2B]',
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
          <div className="text-xs font-mono uppercase text-[#6B7D90] tracking-wider font-semibold">
            Section 02 // 9-Dimension Intelligence Map & Evaluation Grid
          </div>
          <p className="text-xs text-[#4A5E73] mt-0.5">
            Holistic assessment of venture mechanics. Click any dimension node or tile to inspect underlying reasoning and evidence.
          </p>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-1 bg-[#FDFCF8] p-1 rounded-md border border-[#DDD5C5] text-[11px] font-mono self-start">
          <span className="text-[#6B7D90] px-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {(['all', 'strong', 'moderate', 'needs-validation'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setFilterRating(r)}
              className={`px-2 py-0.5 rounded capitalize transition-colors ${
                filterRating === r
                  ? 'bg-[#ECE6DA] text-[#2B3D4F] font-semibold border border-[#C4B8A0]'
                  : 'text-[#6B7D90] hover:text-[#4A5E73]'
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
            const icon = DIMENSION_ICONS[dimension.id] || <Compass className="w-4 h-4 text-[#2B3D4F]" />;
            const pill = RATING_PILLS[dimension.rating];
            const isSelected = selectedDimensionId === dimension.id;

            return (
              <div
                key={dimension.id}
                onClick={() => handleTileClick(dimension)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? 'bg-[#ECE6DA] border-[#2B3D4F] ring-1 ring-[#2B3D4F]/40 shadow-md'
                    : 'bg-[#FDFCF8] hover:bg-[#ECE6DA] border-[#DDD5C5] hover:border-[#C4B8A0]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Status Pill */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <div className="p-1 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
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
                  <h3 className="text-xs font-semibold text-[#2B3D4F] truncate mb-1">
                    {dimension.name}
                  </h3>
                  <p className="text-[11px] text-[#4A5E73] line-clamp-2 leading-relaxed">
                    {dimension.headline}
                  </p>
                </div>

                {/* Bottom Metadata & Drill-down Cue */}
                <div className="mt-3 pt-2 border-t border-[#DDD5C5]/80 space-y-1.5">
                  {/* Evidence confidence meter */}
                  <div className="flex items-center gap-1.5" title={`Evidence confidence: ${dimension.confidence}`}>
                    <div className="flex-1 h-1 rounded-full bg-[#F5F1EB] border border-[#DDD5C5] overflow-hidden flex">
                      {(['high', 'medium', 'low'] as const).map((level, i) => {
                        const filled =
                          dimension.confidence === 'high' ? 3 : dimension.confidence === 'medium' ? 2 : 1;
                        return (
                          <div
                            key={level}
                            className={`flex-1 h-full ${i > 0 ? 'ml-0.5' : ''} ${
                              i < filled
                                ? dimension.confidence === 'high'
                                  ? 'bg-[#4A7C59]'
                                  : dimension.confidence === 'medium'
                                  ? 'bg-[#2B3D4F]'
                                  : 'bg-[#8A6D2B]'
                                : 'bg-transparent'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[9px] font-mono text-[#6B7D90] shrink-0">
                      {dimension.evidence.length} signals · {dimension.missingInformation.length} gaps
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6B7D90]">
                    <span>
                      Risk: <strong className="text-[#4A5E73]">{dimension.riskLevel.toUpperCase()}</strong>
                    </span>
                    <span className="text-[#2B3D4F] hover:text-[#3E5770] flex items-center gap-0.5 font-medium">
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
