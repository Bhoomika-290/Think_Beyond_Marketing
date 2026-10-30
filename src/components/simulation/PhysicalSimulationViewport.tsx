import React, { useState } from 'react';
import { Physical3DExperienceCanvas } from './Physical3DExperienceCanvas';
import { SimulationAgentBar } from './SimulationAgentBar';
import type { 
  PhysicalExperienceStoryboard, 
  SimulationAppearance,
  PhysicalSceneOverrides 
} from '../../types/simulation';
import { TrendingUp } from 'lucide-react';

interface PhysicalSimulationViewportProps {
  storyboard: PhysicalExperienceStoryboard;
  appearance: SimulationAppearance;
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
}

export const PhysicalSimulationViewport: React.FC<PhysicalSimulationViewportProps> = ({
  storyboard,
  appearance,
  activeStageIndex,
  onSelectStage,
}) => {
  const { outcomeSummary, productMockup, stages } = storyboard;
  const currentStage = stages[activeStageIndex] || stages[0];

  const [sceneOverrides, setSceneOverrides] = useState<PhysicalSceneOverrides>({});

  const handleApplyOverrides = (updated: PhysicalSceneOverrides) => {
    setSceneOverrides(updated);
  };

  const handleResetOverrides = () => {
    setSceneOverrides({});
  };

  return (
    <div className="space-y-6">
      {/* 1. Genuine Three.js WebGL 3D Experience Scene Canvas */}
      <Physical3DExperienceCanvas
        storyboard={storyboard}
        appearance={appearance}
        activeStageIndex={activeStageIndex}
        onSelectStage={onSelectStage}
        sceneOverrides={sceneOverrides}
      />

      {/* 2. Stage-Aware AI Simulation Modification Bar */}
      <SimulationAgentBar
        activeStageIndex={activeStageIndex}
        stageName={currentStage.stageName}
        categoryType={productMockup.categoryType}
        currentOverrides={sceneOverrides}
        onApplyOverrides={handleApplyOverrides}
        onResetOverrides={handleResetOverrides}
      />

      {/* 2. Experience Outcome Summary */}
      <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E2EAF4] mb-3">
          <TrendingUp className="w-4 h-4 text-[#19A875]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#14213D] font-mono">
            Simulated End-to-End Experience Outcome
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E2EAF4]">
            <div className="text-[10px] font-mono uppercase text-[#60738F] font-bold">
              Emotional Benefit
            </div>
            <div className="text-xs font-semibold text-[#14213D] mt-1 leading-snug">
              {outcomeSummary.emotionalBenefit}
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E2EAF4]">
            <div className="text-[10px] font-mono uppercase text-[#60738F] font-bold">
              Functional Reality
            </div>
            <div className="text-xs font-semibold text-[#14213D] mt-1 leading-snug">
              {outcomeSummary.functionalBenefit}
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-3.5 rounded-lg border border-[#E2EAF4]">
            <div className="text-[10px] font-mono uppercase text-[#60738F] font-bold">
              Repeat & Referral Loop
            </div>
            <div className="text-xs font-semibold text-[#19A875] mt-1 leading-snug">
              {outcomeSummary.retentionTrigger}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
