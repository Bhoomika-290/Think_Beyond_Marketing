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
          className="inline-flex items-center gap-1.5 text-xs text-[#6B7D90] hover:text-[#2B3D4F] transition-colors font-mono uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Stage 01 // Idea Lab</span>
        </Link>

        {/* Sample Venture Quick Loaders for Demonstrations */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#6B7D90] font-mono hidden sm:inline">
            Load Seed Test Case:
          </span>
          <button
            type="button"
            onClick={() => loadSampleVenture('skincare_d2c')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#FDFCF8] hover:bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            title="Load Clean Skincare D2C Physical Goods Venture"
          >
            🌿 Skincare D2C
          </button>
          <button
            type="button"
            onClick={() => loadSampleVenture('restaurant_ai')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#FDFCF8] hover:bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            title="Load Restaurant AI Waste Prediction Venture"
          >
            ⚡ Restaurant AI
          </button>
          <button
            type="button"
            onClick={() => loadSampleVenture('tutoring_marketplace')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#FDFCF8] hover:bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="font-mono text-xs text-[#2B3D4F] font-semibold tracking-widest uppercase inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C8B6F]" title="Stage 02 analytical identity" />
              STAGE 02 // VALIDATION
            </span>
            <span className="text-[#DDD5C5]">•</span>
            <Badge variant="active">Decision Engine Active</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2B3D4F]">
            Feasibility & Viability Engine
          </h1>
          <p className="mt-1.5 text-sm text-[#4A5E73] max-w-3xl leading-relaxed">
            Test whether the idea is realistically worth pursuing before investing capital or brand equity. Evaluates technical complexity, regulatory boundaries, unit margins, and structural fatal flaws.
          </p>
        </div>

        {/* Integrity Badge */}
        <div className="shrink-0 p-3 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#ECE6DA] border border-[#C4B8A0] flex items-center justify-center text-[#2B3D4F]">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold text-[#2B3D4F]">Data Integrity Protocol</div>
            <div className="text-[11px] text-[#6B7D90]">Zero fabricated data or arbitrary scores</div>
          </div>
        </div>
      </div>

      {/* Upstream Idea Lab Grounding Bar */}
      <div className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#2B3D4F] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#2B3D4F]" />
            <span className="font-mono text-[#6B7D90] uppercase">Venture:</span>
            <span>{project.name || 'Untitled Venture'}</span>
          </div>

          {productType && (
            <div className="flex items-center gap-1.5 text-[#4A5E73]">
              <Tag className="w-3 h-3 text-[#6B7D90]" />
              <span className="font-mono text-[#6B7D90] uppercase">Type:</span>
              <span className="capitalize text-[#2B3D4F]">{productType}</span>
            </div>
          )}

          {locationString ? (
            <div className="flex items-center gap-1.5 text-[#4A5E73]">
              <MapPin className="w-3 h-3 text-[#6B7D90]" />
              <span className="font-mono text-[#6B7D90] uppercase">Scope:</span>
              <span className="text-[#2B3D4F]">{locationString}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#8A6D2B]/90 font-mono text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>Location Unspecified</span>
            </div>
          )}

          {idea.targetAudience && (
            <div className="flex items-center gap-1.5 text-[#4A5E73] max-w-xs truncate">
              <Target className="w-3 h-3 text-[#6B7D90]" />
              <span className="font-mono text-[#6B7D90] uppercase">Audience:</span>
              <span className="truncate text-[#2B3D4F]">{idea.targetAudience}</span>
            </div>
          )}
        </div>

        <Link
          to="/idea-lab"
          className="text-[11px] font-mono text-[#2B3D4F] hover:text-[#3E5770] hover:underline shrink-0"
        >
          Edit Inputs in Stage 01 →
        </Link>
      </div>
    </div>
  );
};
