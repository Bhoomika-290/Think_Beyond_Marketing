import React from 'react';
import { StagePlaceholder } from '../components/layout/StagePlaceholder';
import { STAGES } from '../types/project';

// Stage 02 (FeasibilityPage) is implemented in dedicated src/pages/FeasibilityPage.tsx
// Stage 03 (MarketIntelligencePage) is implemented in dedicated src/pages/MarketIntelligencePage.tsx

export const BrandRoadmapPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'brand-roadmap') || STAGES[3];
  return <StagePlaceholder stage={stage} />;
};

export const BuildPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'build') || STAGES[4];
  return <StagePlaceholder stage={stage} />;
};

export const ExecutionPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'execution') || STAGES[5];
  return <StagePlaceholder stage={stage} />;
};

export const SimulationPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'simulation') || STAGES[6];
  return <StagePlaceholder stage={stage} />;
};

export const LaunchGrowthPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'launch-growth') || STAGES[7];
  return <StagePlaceholder stage={stage} />;
};

export const ReportPage: React.FC = () => {
  const stage = STAGES.find((s) => s.id === 'report') || STAGES[8];
  return <StagePlaceholder stage={stage} />;
};
