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
          className="inline-flex items-center gap-1.5 text-xs text-[#738095] hover:text-[#F3F4F6] transition-colors font-mono uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Stage 01 // Idea Lab</span>
        </Link>

        {/* Sample Venture Quick Loaders for Demonstrations */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#738095] font-mono hidden sm:inline">
            Load Seed Test Case:
          </span>
          <button
            type="button"
            onClick={() => loadSampleVenture('coffee_d2c')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#111823] hover:bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
            title="Load Coffee D2C Physical Goods Venture"
          >
            ☕ Coffee D2C
          </button>
          <button
            type="button"
            onClick={() => loadSampleVenture('ai_saas')}
            className="px-2.5 py-1 text-xs font-mono rounded bg-[#111823] hover:bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
            title="Load Attribution AI SaaS Venture"
          >
            ⚡ AI SaaS
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#263244]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="font-mono text-xs text-[#4D8DFF] font-semibold tracking-widest uppercase">
              STAGE 02 // VALIDATION
            </span>
            <span className="text-[#263244]">•</span>
            <Badge variant="active">Decision Engine Active</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F4F6]">
            Feasibility & Viability Engine
          </h1>
          <p className="mt-1.5 text-sm text-[#AAB4C3] max-w-3xl leading-relaxed">
            Test whether the idea is realistically worth pursuing before investing capital or brand equity. Evaluates technical complexity, regulatory boundaries, unit margins, and structural fatal flaws.
          </p>
        </div>

        {/* Integrity Badge */}
        <div className="shrink-0 p-3 rounded-lg bg-[#111823] border border-[#263244] flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#151E2B] border border-[#34445A] flex items-center justify-center text-[#4D8DFF]">
            <FileCheck className="w-4 h-4" />
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold text-[#F3F4F6]">Data Integrity Protocol</div>
            <div className="text-[11px] text-[#738095]">Zero fabricated data or arbitrary scores</div>
          </div>
        </div>
      </div>

      {/* Upstream Idea Lab Grounding Bar */}
      <div className="p-3.5 rounded-lg bg-[#0B1017] border border-[#263244] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#F3F4F6] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#4D8DFF]" />
            <span className="font-mono text-[#738095] uppercase">Venture:</span>
            <span>{project.name || 'Untitled Venture'}</span>
          </div>

          {productType && (
            <div className="flex items-center gap-1.5 text-[#AAB4C3]">
              <Tag className="w-3 h-3 text-[#738095]" />
              <span className="font-mono text-[#738095] uppercase">Type:</span>
              <span className="capitalize text-[#F3F4F6]">{productType}</span>
            </div>
          )}

          {locationString ? (
            <div className="flex items-center gap-1.5 text-[#AAB4C3]">
              <MapPin className="w-3 h-3 text-[#738095]" />
              <span className="font-mono text-[#738095] uppercase">Scope:</span>
              <span className="text-[#F3F4F6]">{locationString}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-400/90 font-mono text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>Location Unspecified</span>
            </div>
          )}

          {idea.targetAudience && (
            <div className="flex items-center gap-1.5 text-[#AAB4C3] max-w-xs truncate">
              <Target className="w-3 h-3 text-[#738095]" />
              <span className="font-mono text-[#738095] uppercase">Audience:</span>
              <span className="truncate text-[#F3F4F6]">{idea.targetAudience}</span>
            </div>
          )}
        </div>

        <Link
          to="/idea-lab"
          className="text-[11px] font-mono text-[#4D8DFF] hover:text-[#6EA8FF] hover:underline shrink-0"
        >
          Edit Inputs in Stage 01 →
        </Link>
      </div>
    </div>
  );
};
