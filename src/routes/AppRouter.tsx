import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { IdeaLabPage } from '../pages/IdeaLabPage';
import { FeasibilityPage } from '../pages/FeasibilityPage';
import { MarketIntelligencePage } from '../pages/MarketIntelligencePage';
import {
  BrandRoadmapPage,
  BuildPage,
  ExecutionPage,
  SimulationPage,
  LaunchGrowthPage,
  ReportPage,
} from '../pages/StagePages';
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
          <Route path="/execution" element={<ExecutionPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/launch-growth" element={<LaunchGrowthPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};
