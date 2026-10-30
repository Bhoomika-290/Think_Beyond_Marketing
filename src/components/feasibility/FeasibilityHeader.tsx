import React from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  MapPin,
  Tag,
  Target,
  FileCheck,
} from 'lucide-react';

interface FeasibilityHeaderProps {
  onRefresh: () => void;
}

export const FeasibilityHeader: React.FC<FeasibilityHeaderProps> = ({ onRefresh }) => {
  const { state, loadSampleVenture } = useProject();
  const { project, businessModel, idea } = state;

  const productType = businessModel.productType;
  const locationString = businessModel.location.cityRegion
    ? `${businessModel.location.cityRegion}, ${businessModel.location.country}`
    : businessModel.location.country || null;

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/idea-lab"
          className="inline-flex items-center gap-1.5 text-xs text-[#60738F] hover:text-[#14213D] transition-colors font-mono uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Stage 01 // Idea Lab</span>
        </Link>

        {/* Sample Venture Quick Loaders for Demonstrations */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#60738F] font-mono hidden sm:inline">
            Load Seed Test Case:
          </span>
          <button
            type="button"
            onClick={() => loadSampleVenture('skincare_d2c')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#FFFFFF] hover:bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] transition-colors"
            title="Load Clean Skincare D2C Physical Goods Venture"
          >
            🌿 Skincare D2C
          </button>
          <button
            type="button"
            onClick={() => loadSampleVenture('restaurant_ai')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#FFFFFF] hover:bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] transition-colors"
            title="Load Restaurant AI Waste Prediction Venture"
          >
            ⚡ Restaurant AI
          </button>
          <button
            type="button"
            onClick={() => loadSampleVenture('tutoring_marketplace')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#FFFFFF] hover:bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] transition-colors"
            title="Load Peer Tutoring Marketplace Venture"
          >
            🎓 Tutoring Mkt
          </button>
          <Button
            size="sm"
            variant="secondary"
            onClick={onRefresh}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Re-evaluate
          </Button>
        </div>
      </div>

      {/* Main Stage Heading */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#E2EAF4]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="font-mono text-xs text-[#14213D] font-semibold tracking-widest uppercase inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C8B6F]" title="Stage 02 analytical identity" />
              STAGE 02 // VALIDATION
            </span>
            <span className="text-[#E2EAF4]">•</span>
            <Badge variant="active">Decision Engine Active</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#14213D]">
            Feasibility & Viability Engine
          </h1>
          <p className="mt-1.5 text-sm text-[#60738F] max-w-3xl leading-relaxed">
            Test whether the idea is realistically worth pursuing before investing capital or brand equity. Evaluates technical complexity, regulatory boundaries, unit margins, and structural fatal flaws.
          </p>
        </div>

        {/* Integrity Badge */}
        <div className="shrink-0 p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#EEF4FB] border border-[#E2EAF4] flex items-center justify-center text-[#14213D]">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold text-[#14213D]">Data Integrity Protocol</div>
            <div className="text-[11px] text-[#60738F]">Zero fabricated data or arbitrary scores</div>
          </div>
        </div>
      </div>

      {/* Upstream Idea Lab Grounding Bar */}
      <div className="p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#14213D] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#14213D]" />
            <span className="font-mono text-[#60738F] uppercase">Venture:</span>
            <span>{project.name || 'Untitled Venture'}</span>
          </div>

          {productType && (
            <div className="flex items-center gap-1.5 text-[#60738F]">
              <Tag className="w-3 h-3 text-[#60738F]" />
              <span className="font-mono text-[#60738F] uppercase">Type:</span>
              <span className="capitalize text-[#14213D]">{productType}</span>
            </div>
          )}

          {locationString ? (
            <div className="flex items-center gap-1.5 text-[#60738F]">
              <MapPin className="w-3 h-3 text-[#60738F]" />
              <span className="font-mono text-[#60738F] uppercase">Scope:</span>
              <span className="text-[#14213D]">{locationString}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#F29A42]/90 font-mono text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>Location Unspecified</span>
            </div>
          )}

          {idea.targetAudience && (
            <div className="flex items-center gap-1.5 text-[#60738F] max-w-xs truncate">
              <Target className="w-3 h-3 text-[#60738F]" />
              <span className="font-mono text-[#60738F] uppercase">Audience:</span>
              <span className="truncate text-[#14213D]">{idea.targetAudience}</span>
            </div>
          )}
        </div>

        <Link
          to="/idea-lab"
          className="text-[11px] font-mono text-[#14213D] hover:text-[#1769D2] hover:underline shrink-0"
        >
          Edit Inputs in Stage 01 →
        </Link>
      </div>
    </div>
  );
};
