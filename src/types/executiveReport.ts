export interface Page1IdentitySummary {
  ventureName: string;
  category: string;
  productType: string;
  location: string;
  targetAudience: string;
  problemStatement: string;
  solutionStatement: string;
  valueProposition: string;
}

export interface Page1StrategicFlowStep {
  stepNumber: string;
  stepKey: 'PROBLEM' | 'INSIGHT' | 'SOLUTION' | 'VALUE';
  title: string;
  detail: string;
}

export interface Page1BrandIdentity {
  name: string;
  logoMonogram: string;
  tagline: string;
  positioningWedge: string;
  primaryColor: string;
  accentColor: string;
  typography: string;
  tone: string;
}

export interface Page1StageProgressItem {
  stageNumber: string;
  stageName: string;
  isComplete: boolean;
  keyOutput: string;
}

export interface CompetitorMapItem {
  id: string;
  name: string;
  x: number; // 0 to 100 (Generalized -> Specialized)
  y: number; // 0 to 100 (Legacy/Basic -> Premium/Modern)
  isProject: boolean;
  label: string;
}

export interface CompetitorBreakdownItem {
  name: string;
  whatTheyDo: string;
  limitation: string;
  ourDifferentiator: string;
}

export interface Page2MarketIntelligence {
  hasCompetitors: boolean;
  competitorsNote: string;
  positioningMap: {
    xLabelLeft: string;
    xLabelRight: string;
    yLabelTop: string;
    yLabelBottom: string;
    items: CompetitorMapItem[];
  };
  competitorBreakdown: CompetitorBreakdownItem[];
  positioningWedge: string;
  keyMarketOpportunity: string;
  riskOpportunity2x2: {
    highImpactRisks: { title: string; action: string; source: string }[];
    highImpactOpportunities: { title: string; rationale: string; source: string }[];
    watchList: { title: string; action: string; source: string }[];
    exploreList: { title: string; rationale: string; source: string }[];
  };
}

export interface Page3JourneyMilestone {
  stageNumber: string;
  stageName: string;
  keyOutput: string;
  status: 'complete' | 'in_progress' | 'pending';
}

export interface Page3ArchitectureTier {
  tierName: string;
  components: string[];
}

export interface Page3WhatWeBuilt {
  productType: string;
  architectureTiers: Page3ArchitectureTier[];
  scopedFeatures: string[];
  experienceSimulationStatus: string;
  growthAssetsSummary: string;
  keyDependencies: { name: string; status: 'resolved' | 'critical_path'; resolution: string }[];
}

export interface Page4RoadmapStep {
  number: string;
  stepKey: string;
  whatToDo: string;
  why: string;
  nextAction: string;
  status: 'complete' | 'in_progress' | 'pending';
}

export interface Page4FirstAction {
  priority: number;
  action: string;
  why: string;
  resolvingStage: string;
}

export interface Page4Horizon {
  timeframe: string;
  title: string;
  milestones: string[];
}

export interface Page4GrowthLoopStep {
  phase: string;
  title: string;
  action: string;
}

export interface ExecutiveBrandIntelligenceReport {
  generatedAt: string;
  ventureName: string;
  version: string;
  readinessPercentage: number;
  readinessVerdict: string;
  page1: {
    identity: Page1IdentitySummary;
    strategicFlow: Page1StrategicFlowStep[];
    brand: Page1BrandIdentity;
    stageProgress: Page1StageProgressItem[];
  };
  page2: Page2MarketIntelligence;
  page3: {
    journeyMilestones: Page3JourneyMilestone[];
    builtSummary: Page3WhatWeBuilt;
  };
  page4: {
    roadmapSteps: Page4RoadmapStep[];
    first3Actions: Page4FirstAction[];
    horizons: Page4Horizon[];
    growthLoop: Page4GrowthLoopStep[];
  };
}
