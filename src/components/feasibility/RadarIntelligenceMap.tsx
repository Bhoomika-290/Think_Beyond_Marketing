import React, { useMemo } from 'react';
import type { FeasibilityDimensionResult, FeasibilityDimensionId } from '../../types/project';

interface RadarIntelligenceMapProps {
  dimensions: Record<FeasibilityDimensionId, FeasibilityDimensionResult>;
  onSelectDimension: (dimensionId: FeasibilityDimensionId) => void;
  selectedDimensionId: string | null;
}

const DIMENSION_ORDER: { id: FeasibilityDimensionId; label: string; short: string }[] = [
  { id: 'market', label: 'Market', short: 'Market' },
  { id: 'customer', label: 'Customer', short: 'Customer' },
  { id: 'business-model', label: 'Business Model', short: 'Business' },
  { id: 'operational', label: 'Operations', short: 'Ops' },
  { id: 'technical', label: 'Technical', short: 'Tech' },
  { id: 'financial', label: 'Financial', short: 'Financial' },
  { id: 'location', label: 'Location', short: 'Location' },
  { id: 'competitive', label: 'Competitive', short: 'Competitive' },
  { id: 'execution', label: 'Execution', short: 'Execution' },
];

const CX = 210;
const CY = 190;
const MAX_R = 125;
const TOTAL_AXES = DIMENSION_ORDER.length;

export const RadarIntelligenceMap: React.FC<RadarIntelligenceMapProps> = ({
  dimensions,
  onSelectDimension,
  selectedDimensionId,
}) => {

  // Rating to normalized coordinate scale (for visualization mapping only, NOT statistical percentages)
  const getRatingValue = (rating: string): number => {
    switch (rating) {
      case 'strong':
        return 1.0;
      case 'moderate':
        return 0.65;
      case 'needs-validation':
      case 'weak':
      default:
        return 0.35;
    }
  };

  // Concentric polygon points generator
  const getConcentricPoints = (fraction: number): string => {
    const points: string[] = [];
    for (let i = 0; i < TOTAL_AXES; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / TOTAL_AXES;
      const r = MAX_R * fraction;
      const x = CX + r * Math.cos(angle);
      const y = CY + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  // Main data polygon points and vertex coords
  const { polygonPoints, vertices } = useMemo(() => {
    const pts: string[] = [];
    const verts = DIMENSION_ORDER.map((item, i) => {
      const dim = dimensions[item.id];
      const val = dim ? getRatingValue(dim.rating) : 0.35;
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / TOTAL_AXES;
      const r = MAX_R * val;
      const x = CX + r * Math.cos(angle);
      const y = CY + r * Math.sin(angle);

      // Label coordinate (outer)
      const labelR = MAX_R + 24;
      const labelX = CX + labelR * Math.cos(angle);
      const labelY = CY + labelR * Math.sin(angle);

      pts.push(`${x},${y}`);
      return {
        ...item,
        x,
        y,
        labelX,
        labelY,
        angle,
        dim,
        val,
      };
    });
    return { polygonPoints: pts.join(' '), vertices: verts };
  }, [dimensions]);

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-[#111823] rounded-xl border border-[#263244] text-center">
      <div className="w-full flex items-center justify-between mb-1 px-2 text-xs font-mono">
        <span className="text-[#F3F4F6] font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#4D8DFF] animate-pulse" />
          Radar Intelligence Map
        </span>
        <span className="text-[11px] text-[#738095]">Click nodes to drill down</span>
      </div>

      <div className="relative w-full max-w-[420px] aspect-[420/380]">
        <svg
          viewBox="0 0 420 380"
          className="w-full h-full overflow-visible select-none"
          aria-label="Feasibility 9-dimension radar map"
        >
          <defs>
            {/* Radar area gradient fill */}
            <linearGradient id="radarAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4D8DFF" stopOpacity="0.30" />
              <stop offset="50%" stopColor="#6EA8FF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#45D4E8" stopOpacity="0.28" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Concentric Polygon Rings */}
          <polygon
            points={getConcentricPoints(1.0)}
            fill="none"
            stroke="#263244"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <polygon
            points={getConcentricPoints(0.65)}
            fill="none"
            stroke="#263244"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <polygon
            points={getConcentricPoints(0.35)}
            fill="none"
            stroke="#263244"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Axis Spokes from center to edge */}
          {vertices.map((v, i) => {
            const edgeX = CX + MAX_R * Math.cos(v.angle);
            const edgeY = CY + MAX_R * Math.sin(v.angle);
            return (
              <line
                key={`spoke-${i}`}
                x1={CX}
                y1={CY}
                x2={edgeX}
                y2={edgeY}
                stroke="#1E2837"
                strokeWidth="1"
              />
            );
          })}

          {/* Qualitative Tier Ring Labels */}
          <text
            x={CX}
            y={CY - MAX_R + 12}
            textAnchor="middle"
            fill="#738095"
            fontSize="9"
            fontFamily="monospace"
            className="uppercase"
          >
            Strong Tier
          </text>
          <text
            x={CX}
            y={CY - MAX_R * 0.65 + 10}
            textAnchor="middle"
            fill="#738095"
            fontSize="8"
            fontFamily="monospace"
            className="uppercase"
          >
            Moderate
          </text>
          <text
            x={CX}
            y={CY - MAX_R * 0.35 + 9}
            textAnchor="middle"
            fill="#738095"
            fontSize="7"
            fontFamily="monospace"
            className="uppercase"
          >
            Needs Val
          </text>

          {/* The Active Radar Polygon Footprint */}
          <polygon
            points={polygonPoints}
            fill="url(#radarAreaGradient)"
            stroke="#4D8DFF"
            strokeWidth="2.5"
            filter="url(#radarGlow)"
            className="transition-all duration-300"
          />

          {/* Interactive Vertex Nodes and Labels */}
          {vertices.map((v) => {
            const isSelected = selectedDimensionId === v.id;
            const ratingColor =
              v.dim?.rating === 'strong'
                ? '#10B981'
                : v.dim?.rating === 'moderate'
                ? '#4D8DFF'
                : '#F59E0B';

            return (
              <g
                key={`node-${v.id}`}
                onClick={() => onSelectDimension(v.id)}
                className="cursor-pointer group"
              >
                {/* Connecting Spoke Node */}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={isSelected ? 6.5 : 4.5}
                  fill={ratingColor}
                  stroke="#080B10"
                  strokeWidth="2"
                  className="transition-all duration-150 group-hover:scale-125"
                />

                {isSelected && (
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r="10"
                    fill="none"
                    stroke="#4D8DFF"
                    strokeWidth="1.5"
                    className="animate-ping"
                  />
                )}

                {/* Dimension Label */}
                <text
                  x={v.labelX}
                  y={v.labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight={isSelected ? '700' : '500'}
                  fill={isSelected ? '#F3F4F6' : '#AAB4C3'}
                  className="group-hover:fill-[#F3F4F6] transition-colors"
                >
                  {v.short}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="text-[10px] font-mono text-[#738095] mt-1">
        Geometric visualization scale based on verified qualitative vectors (not synthetic scores)
      </div>
    </div>
  );
};
