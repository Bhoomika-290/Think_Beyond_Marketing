import React from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Package, 
  Cpu, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import type { SimulationReport } from '../../types/project';

interface SimulationHeaderProps {
  report: SimulationReport;
  activePathway: 'physical' | 'software';
  onPathwayChange: (pathway: 'physical' | 'software') => void;
  onRefresh: () => void;
  activeStage: number;
  totalStages: number;
  onPrevStage: () => void;
  onNextStage: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
}

export const SimulationHeader: React.FC<SimulationHeaderProps> = ({
  report,
  activePathway,
  onPathwayChange,
  onRefresh,
  activeStage,
  totalStages,
  onPrevStage,
  onNextStage,
  isPlaying,
  onTogglePlay,
  onReset,
}) => {
  const { ventureName } = report;

  return (
    <div className="bg-[#111823] border border-[#263244] rounded-xl p-5 shadow-lg space-y-4">
      {/* Top Meta Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#263244]">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#1A2536] text-[#AAB4C3] border border-[#263244]">
              Stage 07 // Experience Simulation
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-[#4D8DFF]/20 text-[#4D8DFF] border border-[#4D8DFF]/40">
              {activePathway === 'physical' ? <Package className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
              {activePathway === 'physical' ? 'PHYSICAL PRODUCT LAB' : 'INTERACTIVE SAAS PROTOTYPE'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono text-[#34D399] bg-[#10B981]/15 border border-[#10B981]/40">
              <Sparkles className="w-3 h-3" />
              Real-World Preview Canvas
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] mt-2 tracking-tight">
            {activePathway === 'physical'
              ? 'Physical Product Experience & Sensory Simulation'
              : 'Interactive Software Prototype & Core Workflow Simulator'}
          </h1>
          <p className="text-xs sm:text-sm text-[#AAB4C3] mt-1 max-w-3xl leading-relaxed">
            Experience what <strong className="text-[#F3F4F6]">{ventureName}</strong> actually looks, feels, and operates like in the hands of customers before build.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-[#AAB4C3] bg-[#151E2B] hover:bg-[#1A2536] hover:text-white border border-[#263244] transition-colors shadow-sm"
            title="Recalculate simulation from project discovery tokens"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#738095]" />
            <span>Recalculate</span>
          </button>
        </div>
      </div>

      {/* Pathway Switcher & Interactive Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0D121B] border border-[#263244] rounded-lg p-2.5 shadow-inner">
        {/* Pathway Tabs */}
        <div className="flex items-center gap-1.5 bg-[#111823] p-1 rounded-md border border-[#263244] w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onPathwayChange('physical')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activePathway === 'physical'
                ? 'bg-[#4D8DFF] text-[#080B10] shadow-sm'
                : 'text-[#AAB4C3] hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>1. Physical Product Lab</span>
          </button>

          <button
            type="button"
            onClick={() => onPathwayChange('software')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
              activePathway === 'software'
                ? 'bg-[#4D8DFF] text-[#080B10] shadow-sm'
                : 'text-[#AAB4C3] hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>2. Software Prototype</span>
          </button>
        </div>

        {/* Step Progress & Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-mono text-[#738095] hover:text-[#AAB4C3] transition-colors"
          >
            ↺ Reset
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#AAB4C3]">
            <span className="font-bold text-[#4D8DFF]">STAGE 0{activeStage + 1}</span>
            <span className="text-[#738095]">/</span>
            <span className="text-[#738095]">0{totalStages}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onTogglePlay}
              className={`p-1.5 rounded-md border transition-colors ${
                isPlaying
                  ? 'bg-[#10B981]/20 text-[#34D399] border-[#10B981]/40'
                  : 'bg-[#111823] text-[#AAB4C3] hover:text-white border-[#263244]'
              }`}
              title={isPlaying ? 'Pause Auto-Play' : 'Auto-Play Simulation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={onPrevStage}
              disabled={activeStage === 0}
              className="p-1.5 rounded-md bg-[#111823] text-[#AAB4C3] hover:text-white border border-[#263244] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onNextStage}
              disabled={activeStage === totalStages - 1}
              className="p-1.5 rounded-md bg-[#111823] text-[#AAB4C3] hover:text-white border border-[#263244] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next Stage"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
