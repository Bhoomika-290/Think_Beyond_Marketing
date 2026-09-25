import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { IdeaLabPage } from '../pages/IdeaLabPage';
import { FeasibilityPage } from '../pages/FeasibilityPage';
import { MarketIntelligencePage } from '../pages/MarketIntelligencePage';
import { BrandRoadmapPage } from '../pages/BrandRoadmapPage';
import { BuildPage } from '../pages/BuildPage';
import { ExecutionPage } from '../pages/ExecutionPage';
import { SimulationPage } from '../pages/SimulationPage';
import { LaunchGrowthPage } from '../pages/LaunchGrowthPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/idea-lab" replace />} />
          <Route path="/idea-lab" element={<IdeaLabPage />} />
          <Route path="/feasibility" element={<FeasibilityPage />} />
          <Route path="/market-intelligence" element={<MarketIntelligencePage />} />
          <Route path="/brand-roadmap" element={<BrandRoadmapPage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/build-architecture" element={<BuildPage />} />
          <Route path="/execution" element={<ExecutionPage />} />
          <Route path="/execution-intelligence" element={<ExecutionPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/experience-simulation" element={<SimulationPage />} />
          <Route path="/launch-growth" element={<LaunchGrowthPage />} />
          <Route path="/growth" element={<LaunchGrowthPage />} />
          <Route path="/report" element={<Navigate to="/launch-growth" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};
