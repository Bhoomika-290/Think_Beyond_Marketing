import type { ProjectState } from '../types/project';
import type { LaunchGrowthReportData } from '../types/growth';
import type { 
  ExecutiveBrandIntelligenceReport, 
  Page1IdentitySummary,
  Page1StrategicFlowStep,
  Page1BrandIdentity,
  Page1StageProgressItem,
  Page2MarketIntelligence,
  CompetitorBreakdownItem,
  Page3JourneyMilestone,
  Page3WhatWeBuilt,
  Page4RoadmapStep,
  Page4FirstAction,
  Page4Horizon,
  Page4GrowthLoopStep
} from '../types/executiveReport';

interface GenerateReportInput {
  projectState: ProjectState;
  launchReport: LaunchGrowthReportData;
  brandReport?: any;
  buildReport?: any;
  executionReport?: any;
  simulationReport?: any;
  marketReport?: any;
}

export function generateExecutiveBrandReport({
  projectState,
  launchReport,
  brandReport,
  buildReport,
  executionReport: _executionReport,
  simulationReport,
  marketReport,
}: GenerateReportInput): ExecutiveBrandIntelligenceReport {
  const idea = projectState.idea;
  const businessModel = projectState.businessModel;
  const workflow = projectState.workflow;
  const completedStages = workflow.completedStages || [];

  const ventureName = idea.name || projectState.project.name || 'Untitled Venture';
  const targetAudience = idea.targetAudience || 'Target Customer Demographic';
  const operatingLocation = businessModel.location?.operatingLocation || businessModel.location?.cityRegion || launchReport.operatingLocation;
  const productType = launchReport.productType;
  const ventureCategory = launchReport.ventureCategory;
  const readiness = launchReport.readinessSystem;

  // =========================================================================
  // PAGE 1: EXECUTIVE SNAPSHOT
  // =========================================================================
  const identity: Page1IdentitySummary = {
    ventureName,
    category: ventureCategory,
    productType,
    location: operatingLocation,
    targetAudience,
    problemStatement: idea.problem || 'Inefficient legacy processes create unnecessary cost, friction, and delays.',
    solutionStatement: idea.differentiation || `${ventureName} specialized first-principles architecture.`,
    valueProposition: idea.differentiation ? `Measurable ROI via ${idea.differentiation.slice(0, 45)}` : 'Accelerated time-to-value, zero legacy bloat, and verified unit economics.',
  };

  const rawProblem = idea.problem || 'Legacy tools suffer from high cost, fragmentation, and slow execution.';
  const strategicFlow: Page1StrategicFlowStep[] = [
    {
      stepNumber: '01',
      stepKey: 'PROBLEM',
      title: 'Legacy Friction',
      detail: rawProblem.length > 70 ? rawProblem.slice(0, 67) + '...' : rawProblem,
    },
    {
      stepNumber: '02',
      stepKey: 'INSIGHT',
      title: 'Market Shift',
      detail: `${targetAudience.slice(0, 30)} requires specialized speed without monolithic bloat.`,
    },
    {
      stepNumber: '03',
      stepKey: 'SOLUTION',
      title: 'Our Architecture',
      detail: idea.differentiation ? `${ventureName} built around ${idea.differentiation.slice(0, 35)}.` : `${ventureName} precision-engineered core.`,
    },
    {
      stepNumber: '04',
      stepKey: 'VALUE',
      title: 'Commercial Outcome',
      detail: 'Elimination of overhead with validated customer ROI.',
    },
  ];

  const primaryBrandColor = brandReport?.brandBoard?.colorPalette?.[0]?.hex || '#1E40AF';
  const accentBrandColor = brandReport?.brandBoard?.colorPalette?.[1]?.hex || '#059669';
  const activeTagline = brandReport?.taglineWorkspace?.activeTagline || idea.differentiation || (completedStages.includes('brand-roadmap') ? 'Engineered without compromise' : 'Pending Stage 04');
  const positioning = brandReport?.positioningStatement?.fullStatement || `The dedicated, high-performance standard for ${targetAudience}.`;

  const brand: Page1BrandIdentity = {
    name: ventureName,
    logoMonogram: ventureName.slice(0, 2).toUpperCase(),
    tagline: activeTagline,
    positioningWedge: positioning.length > 95 ? positioning.slice(0, 92) + '...' : positioning,
    primaryColor: primaryBrandColor,
    accentColor: accentBrandColor,
    typography: brandReport?.brandBoard?.typography?.headingFont || 'Inter Sans-Serif',
    tone: brandReport?.voiceAndTone?.attributes?.[0] || 'Technical & Strategic',
  };

  const stageProgress: Page1StageProgressItem[] = [
    { stageNumber: '01', stageName: 'Idea Lab', isComplete: Boolean(idea.problem), keyOutput: 'Core Thesis Defined' },
    { stageNumber: '02', stageName: 'Feasibility', isComplete: completedStages.includes('feasibility'), keyOutput: 'Unit Economics Mapped' },
    { stageNumber: '03', stageName: 'Market Intel', isComplete: completedStages.includes('market-intelligence'), keyOutput: 'Competitors & Wedge' },
    { stageNumber: '04', stageName: 'Brand Roadmap', isComplete: completedStages.includes('brand-roadmap'), keyOutput: 'Positioning & Assets' },
    { stageNumber: '05', stageName: 'Build & Specs', isComplete: completedStages.includes('build'), keyOutput: 'MVP Scope Locked' },
    { stageNumber: '06', stageName: 'Execution Ops', isComplete: completedStages.includes('execution'), keyOutput: 'Sprint Roadmaps' },
    { stageNumber: '07', stageName: 'Simulation', isComplete: completedStages.includes('simulation') || Boolean(simulationReport), keyOutput: 'Experience Loop' },
    { stageNumber: '08', stageName: 'Launch & Growth', isComplete: true, keyOutput: 'Go-To-Market Engine' },
  ];

  // =========================================================================
  // PAGE 2: MARKET + COMPETITIVE INTELLIGENCE
  // =========================================================================
  const stage3Competitors = marketReport?.competitors || launchReport.monitoringData?.marketSignals?.competitorsTracked || [];
  const hasCompetitors = stage3Competitors.length > 0;

  const positioningItems = [
    {
      id: 'our_proj',
      name: ventureName,
      x: 82, // Specialized
      y: 85, // Premium / High Value
      isProject: true,
      label: 'Specialized Standard',
    },
  ];

  const competitorBreakdown: CompetitorBreakdownItem[] = [];

  if (hasCompetitors) {
    stage3Competitors.slice(0, 3).forEach((c: any, idx: number) => {
      const compName = c.name || `Competitor ${idx + 1}`;
      positioningItems.push({
        id: `comp_${idx}`,
        name: compName,
        x: idx === 0 ? 30 : idx === 1 ? 55 : 35,
        y: idx === 0 ? 40 : idx === 1 ? 60 : 25,
        isProject: false,
        label: c.positioning || 'Legacy Generalist',
      });

      competitorBreakdown.push({
        name: compName,
        whatTheyDo: c.positioning || 'Broad monolithic horizontal tooling',
        limitation: c.weakness || 'High complexity, high cost, and slow onboarding',
        ourDifferentiator: c.wedgeOpportunity || idea.differentiation || 'Specialized speed with zero bloat',
      });
    });
  } else {
    positioningItems.push({
      id: 'legacy_generic',
      name: 'Legacy Status Quo',
      x: 35,
      y: 35,
      isProject: false,
      label: 'Broad Horizontal',
    });

    competitorBreakdown.push({
      name: 'Legacy Market Status Quo',
      whatTheyDo: 'Multi-feature enterprise software / manual operations',
      limitation: 'Complex setup, prohibitive overhead, and weak customer focus',
      ourDifferentiator: idea.differentiation || `Focused specifically on ${targetAudience} pain points`,
    });
  }

  const page2: Page2MarketIntelligence = {
    hasCompetitors,
    competitorsNote: hasCompetitors ? `${stage3Competitors.length} Competitors Indexed from Stage 03` : 'Competitor validation pending formal indexing in Stage 03.',
    positioningMap: {
      xLabelLeft: 'General / Broad',
      xLabelRight: 'Specialized / Focused',
      yLabelTop: 'Premium / High Value',
      yLabelBottom: 'Basic / Legacy',
      items: positioningItems,
    },
    competitorBreakdown,
    positioningWedge: positioning,
    keyMarketOpportunity: `Capture underserved ${targetAudience} by solving ${idea.problem ? idea.problem.slice(0, 45) : 'friction'} with transparent velocity.`,
    riskOpportunity2x2: {
      highImpactRisks: [
        {
          title: !idea.problem || idea.problem.length < 15 ? 'Problem Urgency Needs Validation' : 'Customer Acquisition Friction',
          action: 'Conduct 5 user discovery calls in Stage 01.',
          source: 'Stage 01 Idea Lab',
        },
        {
          title: !completedStages.includes('simulation') ? 'Customer Experience Loop Unverified' : 'Channel Saturation',
          action: 'Run complete Stage 07 Experience Simulation.',
          source: 'Stage 07 Simulation',
        },
      ],
      highImpactOpportunities: [
        {
          title: `First-Mover Wedge in ${operatingLocation}`,
          rationale: 'Local dense referral networks reduce initial CAC.',
          source: 'Market Intelligence',
        },
        {
          title: 'Specialized High-Retention ICP',
          rationale: 'Niche focus commands higher willingness to pay.',
          source: 'Brand Roadmap',
        },
      ],
      watchList: [
        {
          title: 'Incumbent Feature Duplication',
          action: 'Maintain strict velocity and proprietary workflows.',
          source: 'Stage 03 Competitors',
        },
      ],
      exploreList: [
        {
          title: 'Direct CRM & 9:16 Social Reel Loops',
          rationale: 'Stage 08 Creatives generate low-cost organic discovery.',
          source: 'Stage 08 Growth Studio',
        },
      ],
    },
  };

  // =========================================================================
  // PAGE 3: WHAT WE BUILT + VENTURE JOURNEY
  // =========================================================================
  const journeyMilestones: Page3JourneyMilestone[] = [
    { stageNumber: '01', stageName: 'IDEA', keyOutput: 'Founder Thesis Defined', status: idea.problem ? 'complete' : 'in_progress' },
    { stageNumber: '02', stageName: 'VALIDATION', keyOutput: 'Economic Feasibility Mapped', status: completedStages.includes('feasibility') ? 'complete' : 'in_progress' },
    { stageNumber: '03', stageName: 'MARKET', keyOutput: 'Competitive Wedge Isolated', status: completedStages.includes('market-intelligence') ? 'complete' : 'in_progress' },
    { stageNumber: '04', stageName: 'BRAND', keyOutput: 'Positioning & Identity Tokens', status: completedStages.includes('brand-roadmap') ? 'complete' : 'in_progress' },
    { stageNumber: '05', stageName: 'PRODUCT', keyOutput: `${buildReport?.mvpScope?.matrixSummary?.mustCount || 3} MVP Features Scoped`, status: completedStages.includes('build') ? 'complete' : 'pending' },
    { stageNumber: '06', stageName: 'EXPERIENCE', keyOutput: 'Customer Retention Simulation', status: completedStages.includes('simulation') ? 'complete' : 'pending' },
    { stageNumber: '07', stageName: 'EXECUTION', keyOutput: 'Operational Sprint Roadmap', status: completedStages.includes('execution') ? 'complete' : 'pending' },
    { stageNumber: '08', stageName: 'LAUNCH', keyOutput: 'Campaigns & Live Telemetry', status: 'complete' },
  ];

  const builtFeatures: string[] = [];
  if (buildReport?.mvpScope?.features?.length) {
    builtFeatures.push(...buildReport.mvpScope.features.slice(0, 4).map((f: any) => f.name || f.title || 'Core Module'));
  } else {
    builtFeatures.push(`${ventureName} Core Engine`, `${targetAudience.slice(0, 20)} Workspace`, 'Real-Time Telemetry & Operations');
  }

  const builtSummary: Page3WhatWeBuilt = {
    productType,
    architectureTiers: [
      { tierName: 'Experience Layer', components: ['Client Web & Mobile UI', 'Interactive Onboarding', 'Customer Telemetry'] },
      { tierName: 'Core Domain Layer', components: [`${ventureName} Logic Engine`, 'Workflow State Machine', 'Authentication & RBAC'] },
      { tierName: 'Infrastructure Layer', components: [buildReport?.techStack?.items?.[0]?.currentTech || (productType.includes('Software') ? 'TypeScript / React / Node API' : 'Precision Hardware Spec'), 'Relational Store', 'Audit Logs'] },
    ],
    scopedFeatures: builtFeatures,
    experienceSimulationStatus: completedStages.includes('simulation') ? '7-Stage Customer Simulation Verified' : 'Prototype Mapped & Ready for Simulation',
    growthAssetsSummary: `${launchReport.generateModule.reels.length} Reels, ${launchReport.generateModule.carousels.length} Carousels, ${launchReport.generateModule.banners.length} Banners Generated`,
    keyDependencies: [
      { name: 'Core MVP Build', status: completedStages.includes('build') ? 'resolved' : 'critical_path', resolution: 'Lock feature creep' },
      { name: 'Experience Validation', status: completedStages.includes('simulation') ? 'resolved' : 'critical_path', resolution: 'Run Stage 07 loop' },
    ],
  };

  // =========================================================================
  // PAGE 4: BEGINNER → STARTUP ACTION ROADMAP
  // =========================================================================
  const roadmapSteps: Page4RoadmapStep[] = [
    { number: '01', stepKey: 'IDEA', whatToDo: 'Lock core founder insight & target bottleneck.', why: 'Prevents building features nobody needs.', nextAction: 'Document the 1-sentence value hypothesis.', status: idea.problem ? 'complete' : 'in_progress' },
    { number: '02', stepKey: 'VALIDATE PROBLEM', whatToDo: `Interview 5 prospective ${targetAudience.slice(0, 25)} customers.`, why: 'Confirms genuine switching intent and willingness to pay.', nextAction: 'Record recurring pain points & budget thresholds.', status: completedStages.includes('feasibility') ? 'complete' : 'in_progress' },
    { number: '03', stepKey: 'DEFINE CUSTOMER', whatToDo: 'Narrow down specific ICP persona and buying trigger.', why: 'Enables high-conversion outbound messaging.', nextAction: 'Map buying persona constraints in Stage 03.', status: completedStages.includes('market-intelligence') ? 'complete' : 'in_progress' },
    { number: '04', stepKey: 'BUILD MVP', whatToDo: `Construct ${builtFeatures.length} essential core features only.`, why: 'Keeps development cycles under 4 weeks.', nextAction: 'Implement core must-haves in Stage 05.', status: completedStages.includes('build') ? 'complete' : 'pending' },
    { number: '05', stepKey: 'TEST WITH USERS', whatToDo: 'Run end-to-end user onboarding & unboxing simulation.', why: 'Identifies friction before spending marketing budget.', nextAction: 'Execute 7-stage loop in Stage 07.', status: completedStages.includes('simulation') ? 'complete' : 'pending' },
    { number: '06', stepKey: 'BUILD BRAND', whatToDo: 'Deploy locked tagline, positioning, and visual tokens.', why: 'Builds immediate trust and memorability.', nextAction: 'Apply brand board assets in Stage 04.', status: completedStages.includes('brand-roadmap') ? 'complete' : 'in_progress' },
    { number: '07', stepKey: 'LAUNCH', whatToDo: 'Publish Stage 08 9:16 Social Reels & open waitlist.', why: 'Generates initial velocity and first 50 leads.', nextAction: 'Broadcast launch announcement in Stage 08.', status: completedStages.includes('launch-growth') ? 'in_progress' : 'pending' },
    { number: '08', stepKey: 'MEASURE', whatToDo: 'Track brand sentiment, CAC, and lead conversion.', why: 'Identifies highest-leverage acquisition channels.', nextAction: 'Review live telemetry in Growth Hub.', status: 'pending' },
    { number: '09', stepKey: 'SCALE', whatToDo: 'Activate automated SEO clusters & customer referrals.', why: 'Transitions from founder push to compounding inbound pull.', nextAction: 'Expand acquisition campaigns.', status: 'pending' },
  ];

  const first3Actions: Page4FirstAction[] = [
    {
      priority: 1,
      action: readiness.overallPercentage < 100 
        ? `Resolve remaining ${readiness.dimensions.find(d => d.completedCount < d.totalCount)?.name || 'Brand'} readiness items.`
        : 'Deploy Stage 08 9:16 Social Reel video campaigns.',
      why: 'Directly unblocks the primary launch blocker in current project diagnostic.',
      resolvingStage: readiness.overallPercentage < 100 ? 'Stages 01–07' : 'Stage 08 Launch Command',
    },
    {
      priority: 2,
      action: `Validate problem urgency with 5 real ${targetAudience.slice(0, 25)} stakeholders.`,
      why: 'Guarantees commercial buying intent before scaling spend.',
      resolvingStage: 'Stage 01 Idea Lab',
    },
    {
      priority: 3,
      action: 'Stress-test onboarding flow in Stage 07 Simulation.',
      why: 'Prevents silent drop-off when initial launch traffic arrives.',
      resolvingStage: 'Stage 07 Simulation',
    },
  ];

  const horizons: Page4Horizon[] = [
    {
      timeframe: '30 DAYS',
      title: 'Foundation & Validation',
      milestones: [
        `Complete 5 customer interviews with ${targetAudience.slice(0, 25)}`,
        `Lock positioning statement: "${positioning.slice(0, 35)}..."`,
        'Finalize MVP feature backlog',
      ],
    },
    {
      timeframe: '60 DAYS',
      title: 'Build & Simulation',
      milestones: [
        `Implement ${builtFeatures.length} core features on target stack`,
        'Verify customer onboarding & unboxing loop',
        'Produce 3 validated 9:16 video reel assets',
      ],
    },
    {
      timeframe: '90 DAYS',
      title: 'Launch & Growth',
      milestones: [
        'Public launch broadcast & waitlist conversion',
        'Capture first 100 qualified prospects in CRM',
        'Scale high-intent SEO keyword clusters',
      ],
    },
  ];

  const growthLoop: Page4GrowthLoopStep[] = [
    { phase: '01 ACQUIRE', title: 'Targeted Inbound', action: 'Stage 08 9:16 Social Reels & SEO' },
    { phase: '02 ACTIVATE', title: 'Frictionless Onboarding', action: 'Validated Stage 07 Experience Flow' },
    { phase: '03 RETAIN', title: 'Core Product Delight', action: 'Stage 05 Must-Have Features Loop' },
    { phase: '04 LEARN', title: 'Live Telemetry Feedback', action: 'Brand Monitoring & CRM Progression' },
    { phase: '05 IMPROVE', title: 'Rapid Iteration', action: 'Continuous Compounding Value' },
  ];

  return {
    generatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    ventureName,
    version: 'Executive Strategy Edition',
    readinessPercentage: readiness.overallPercentage,
    readinessVerdict: readiness.verdict,
    page1: {
      identity,
      strategicFlow,
      brand,
      stageProgress,
    },
    page2,
    page3: {
      journeyMilestones,
      builtSummary,
    },
    page4: {
      roadmapSteps,
      first3Actions,
      horizons,
      growthLoop,
    },
  };
}
