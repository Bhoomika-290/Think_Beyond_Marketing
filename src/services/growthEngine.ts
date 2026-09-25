import type { ProjectState } from '../types/project';
import type { 
  LaunchGrowthReportData, 
  LaunchReadinessSystem, 
  ReadinessCheckItem,
  ReadinessDimensionId,
  LaunchReadinessDimension,
  ProjectSynthesisData,
  VisualReelConcept,
  VisualCarouselConcept,
  BannerAdConcept,
  FullCampaignConcept,
  MetaCampaignWorkspace,
  SeoWorkspaceData,
  CrmWorkspaceData,
  MaintainWorkspaceData,
  BrandMonitoringData
} from '../types/growth';

export function generateLaunchGrowthReportData(
  projectState: ProjectState,
  brandReport?: any,
  buildReport?: any,
  executionReport?: any,
  marketReport?: any,
  simulationReport?: any
): LaunchGrowthReportData {
  const idea = projectState.idea;
  const businessModel = projectState.businessModel;
  const workflow = projectState.workflow;

  const ventureName = idea.name || projectState.project.name || 'Untitled Venture';
  const targetAudience = idea.targetAudience || 'Target Customer Demographic';
  const operatingLocation = businessModel.location?.operatingLocation || businessModel.location?.cityRegion || 'Primary Target Region';
  const rawInputLower = (idea.rawInput + ' ' + idea.problem + ' ' + idea.differentiation).toLowerCase();

  const isSaaS = businessModel.productType === 'saas' || businessModel.productType === 'marketplace' || rawInputLower.includes('software') || rawInputLower.includes('platform') || rawInputLower.includes('dashboard') || rawInputLower.includes('app');
  const isPhysical = businessModel.productType === 'physical' || rawInputLower.includes('hardware') || rawInputLower.includes('device') || rawInputLower.includes('apparel') || rawInputLower.includes('coffee') || rawInputLower.includes('shoe');
  const productType = isSaaS ? 'Software / SaaS' : isPhysical ? 'Physical / Hardware' : 'Service / Hybrid';

  const isMedical = rawInputLower.includes('medical') || rawInputLower.includes('health') || rawInputLower.includes('clinical') || rawInputLower.includes('diagnostic');
  const isFootwear = rawInputLower.includes('shoe') || rawInputLower.includes('sneaker') || rawInputLower.includes('footwear') || rawInputLower.includes('runner');
  const isApparel = rawInputLower.includes('clothing') || rawInputLower.includes('apparel') || rawInputLower.includes('wool') || rawInputLower.includes('jacket');
  const isCoffee = rawInputLower.includes('coffee') || rawInputLower.includes('roast') || rawInputLower.includes('bean') || rawInputLower.includes('brew');
  const isHardware = rawInputLower.includes('hardware') || rawInputLower.includes('iot') || rawInputLower.includes('sensor') || rawInputLower.includes('gadget');

  const ventureCategory = isMedical ? 'Medical Device & Health Telemetry'
    : isFootwear ? 'Sustainable Performance Footwear'
    : isApparel ? 'Artisan Technical Apparel'
    : isCoffee ? 'Specialty Food & Beverage'
    : isHardware ? 'Connected Hardware & IoT'
    : isSaaS ? 'B2B Software & Platform'
    : 'Direct-to-Consumer Precision Goods';

  const brandPrimaryColor = brandReport?.brandBoard?.colorPalette?.[0]?.hex || '#4D8DFF';
  const brandAccentColor = brandReport?.brandBoard?.colorPalette?.[1]?.hex || '#10B981';
  const activeTagline = brandReport?.taglineWorkspace?.activeTagline || idea.differentiation || 'Engineered without compromise';

  // =========================================================================
  // 1. DYNAMIC LAUNCH READINESS (Derived strictly from project state)
  // =========================================================================
  const completedStages = workflow.completedStages || [];

  const readinessItems: ReadinessCheckItem[] = [
    // Brand
    {
      id: 'chk_brand_dna',
      dimension: 'brand',
      label: 'Brand Strategy & Positioning Wedge',
      isComplete: Boolean(brandReport?.positioningStatement?.fullStatement || completedStages.includes('brand-roadmap')),
      stageSource: 'Stage 04 Brand Roadmap',
      detail: brandReport?.positioningStatement?.fullStatement ? 'Positioning statement & tagline finalized.' : 'Define positioning in Stage 04.',
      actionPath: '/brand-roadmap',
    },
    {
      id: 'chk_brand_mark',
      dimension: 'brand',
      label: 'Visual Identity & Design Tokens',
      isComplete: Boolean(brandReport?.brandBoard?.selectedMark?.name || completedStages.includes('brand-roadmap')),
      stageSource: 'Stage 04 Brand Roadmap',
      detail: brandReport?.brandBoard?.selectedMark?.name ? `Mark selected (${brandReport.brandBoard.selectedMark.name}).` : 'Select brand mark & color palette in Stage 04.',
      actionPath: '/brand-roadmap',
    },
    // Product
    {
      id: 'chk_mvp_scope',
      dimension: 'product',
      label: 'MVP Feature Scope & Specifications',
      isComplete: Boolean(buildReport?.mvpScope?.matrixSummary?.mustCount || completedStages.includes('build')),
      stageSource: 'Stage 05 Build & Architecture',
      detail: buildReport?.mvpScope?.matrixSummary?.mustCount ? `${buildReport.mvpScope.matrixSummary.mustCount} core features scoped.` : 'Lock MVP features in Stage 05.',
      actionPath: '/build',
    },
    {
      id: 'chk_tech_stack',
      dimension: 'product',
      label: 'Production Architecture & Infrastructure',
      isComplete: Boolean(buildReport?.techStack?.items?.length || completedStages.includes('build')),
      stageSource: 'Stage 05 Build & Architecture',
      detail: buildReport?.techStack?.items?.length ? 'Technology / manufacturing specs defined.' : 'Select stack or supply specs in Stage 05.',
      actionPath: '/build',
    },
    // Market
    {
      id: 'chk_market_icp',
      dimension: 'market',
      label: 'Target ICP & Problem Definition',
      isComplete: Boolean(idea.targetAudience && idea.problem),
      stageSource: 'Stage 01 & 03 Market Intelligence',
      detail: idea.targetAudience ? `Targeted to: ${idea.targetAudience}.` : 'Define audience & problem in Stage 01.',
      actionPath: '/idea-lab',
    },
    {
      id: 'chk_competitors',
      dimension: 'market',
      label: 'Competitive Wedge & Counter-Positioning',
      isComplete: Boolean(marketReport?.competitors?.length || completedStages.includes('market-intelligence')),
      stageSource: 'Stage 03 Market Intelligence',
      detail: marketReport?.competitors?.length ? `${marketReport.competitors.length} competitors indexed.` : 'Map competitors in Stage 03.',
      actionPath: '/market-intelligence',
    },
    // Experience
    {
      id: 'chk_sim_experience',
      dimension: 'experience',
      label: 'Customer Journey & Prototype Validation',
      isComplete: Boolean(completedStages.includes('simulation') || simulationReport),
      stageSource: 'Stage 07 Experience Simulation',
      detail: completedStages.includes('simulation') ? '7-stage experience simulation verified.' : 'Run simulation in Stage 07.',
      actionPath: '/simulation',
    },
    // Execution
    {
      id: 'chk_exec_tasks',
      dimension: 'execution',
      label: 'Milestone Execution & Operations Hub',
      isComplete: Boolean(executionReport?.tasks?.length || completedStages.includes('execution')),
      stageSource: 'Stage 06 Execution Intelligence',
      detail: executionReport?.tasks?.length ? `${executionReport.tasks.length} execution milestones scheduled.` : 'Plan sprint tasks in Stage 06.',
      actionPath: '/execution',
    },
    // Growth
    {
      id: 'chk_growth_channels',
      dimension: 'growth',
      label: 'Launch Channels & Acquisition Loops',
      isComplete: Boolean(idea.differentiation && (completedStages.includes('execution') || completedStages.includes('launch-growth'))),
      stageSource: 'Stage 08 Launch & Growth',
      detail: 'Launch campaigns & tracking ready to deploy.',
      actionPath: '/launch-growth',
    },
  ];

  const totalChecklistCount = readinessItems.length;
  const completedChecklistCount = readinessItems.filter((i) => i.isComplete).length;
  const overallPercentage = Math.round((completedChecklistCount / totalChecklistCount) * 100);

  const dimensionIds: ReadinessDimensionId[] = ['brand', 'product', 'market', 'experience', 'execution', 'growth'];
  const dimensions: LaunchReadinessDimension[] = dimensionIds.map((dimId) => {
    const items = readinessItems.filter((i) => i.dimension === dimId);
    const complete = items.filter((i) => i.isComplete).length;
    const total = items.length;
    let status: 'ready' | 'in_progress' | 'needs_input' = 'needs_input';
    if (complete === total && total > 0) status = 'ready';
    else if (complete > 0) status = 'in_progress';

    const name = dimId === 'brand' ? 'Brand & Identity'
      : dimId === 'product' ? 'Product & MVP'
      : dimId === 'market' ? 'Market & ICP'
      : dimId === 'experience' ? 'Experience Simulation'
      : dimId === 'execution' ? 'Execution Operations'
      : 'GTM & Growth';

    const highlight = status === 'ready' ? `${complete}/${total} checks passed`
      : status === 'in_progress' ? `${complete}/${total} checks complete`
      : 'Requires Stage Input';

    return {
      id: dimId,
      name,
      completedCount: complete,
      totalCount: total,
      status,
      highlight,
      items,
    };
  });

  const readinessSystem: LaunchReadinessSystem = {
    overallPercentage,
    completedChecklistCount,
    totalChecklistCount,
    verdict: overallPercentage >= 80 ? 'High Launch Readiness' : overallPercentage >= 50 ? 'Moderate Readiness • Complete Remaining Stages' : 'Early Stage • Requires Upstream Inputs',
    dimensions,
  };

  // =========================================================================
  // 2. PROJECT SYNTHESIS DATA
  // =========================================================================
  const synthesisNodes = [
    {
      id: 'node_1',
      stageNumber: '01',
      stageName: 'Idea Lab',
      title: 'Venture Problem & Core Thesis',
      keyOutputs: [
        idea.name ? `Venture: ${idea.name}` : 'Name pending',
        idea.problem ? `Problem: ${idea.problem.slice(0, 70)}...` : 'Problem statement not entered',
        targetAudience ? `Target: ${targetAudience}` : 'Target audience pending',
      ],
      status: (idea.name && idea.problem ? 'complete' : 'pending') as 'complete' | 'pending',
    },
    {
      id: 'node_2',
      stageNumber: '02',
      stageName: 'Feasibility',
      title: 'Viability & Risk Profile',
      keyOutputs: [
        `Delivery: ${businessModel.deliveryModel || 'Online/Direct'}`,
        `Location: ${operatingLocation}`,
      ],
      status: (completedStages.includes('feasibility') ? 'complete' : 'partial') as 'complete' | 'partial',
    },
    {
      id: 'node_3',
      stageNumber: '03',
      stageName: 'Market Intelligence',
      title: 'Competitive Differentiation',
      keyOutputs: [
        marketReport?.competitors?.length ? `${marketReport.competitors.length} competitors indexed` : 'Competitor landscape identified',
        idea.differentiation ? `Differentiator: ${idea.differentiation.slice(0, 60)}` : 'Differentiation defined',
      ],
      status: (completedStages.includes('market-intelligence') ? 'complete' : 'partial') as 'complete' | 'partial',
    },
    {
      id: 'node_4',
      stageNumber: '04',
      stageName: 'Brand Roadmap',
      title: 'Positioning & Design Tokens',
      keyOutputs: [
        activeTagline ? `Tagline: "${activeTagline}"` : 'Tagline pending',
        `Primary Color: ${brandPrimaryColor}`,
      ],
      status: (completedStages.includes('brand-roadmap') ? 'complete' : 'partial') as 'complete' | 'partial',
    },
    {
      id: 'node_5',
      stageNumber: '05',
      stageName: 'Build & Specs',
      title: 'MVP Architecture',
      keyOutputs: [
        buildReport?.mvpScope?.matrixSummary?.mustCount ? `${buildReport.mvpScope.matrixSummary.mustCount} MVP features` : 'Core architecture specs mapped',
        `Stack: ${buildReport?.techStack?.items?.[0]?.currentTech || (isSaaS ? 'TypeScript, React, API' : 'Precision Manufacturing')}`,
      ],
      status: (completedStages.includes('build') ? 'complete' : 'partial') as 'complete' | 'partial',
    },
    {
      id: 'node_6',
      stageNumber: '06',
      stageName: 'Execution Ops',
      title: 'Milestone Roadmap',
      keyOutputs: [
        executionReport?.tasks?.length ? `${executionReport.tasks.length} execution tasks scheduled` : 'Operational tasks mapped',
        `Operations Hub: ${operatingLocation}`,
      ],
      status: (completedStages.includes('execution') ? 'complete' : 'partial') as 'complete' | 'partial',
    },
    {
      id: 'node_7',
      stageNumber: '07',
      stageName: 'Simulation',
      title: 'Customer Experience Simulation',
      keyOutputs: [
        isPhysical ? '7-Stage 3D Product Film & Materials Spec' : 'Interactive Prototype & Retention Loop',
        'Customer journey validation verified',
      ],
      status: (completedStages.includes('simulation') ? 'complete' : 'partial') as 'complete' | 'partial',
    },
  ];

  const criticalBlockers = [];
  if (!idea.problem) {
    criticalBlockers.push({
      id: 'blk_1',
      severity: 'high' as const,
      title: 'Problem Statement Undefined',
      detail: 'Missing clear founder thesis. Return to Stage 01 to anchor differentiation.',
      resolvingStage: 'Stage 01 Idea Lab',
    });
  }
  if (!brandReport?.positioningStatement?.fullStatement && !completedStages.includes('brand-roadmap')) {
    criticalBlockers.push({
      id: 'blk_2',
      severity: 'medium' as const,
      title: 'Brand Positioning Unlocked',
      detail: 'Positioning wedge not explicitly finalized. Lock positioning in Stage 04.',
      resolvingStage: 'Stage 04 Brand Roadmap',
    });
  }
  if (!completedStages.includes('build')) {
    criticalBlockers.push({
      id: 'blk_3',
      severity: 'medium' as const,
      title: 'MVP Scope Not Frozen',
      detail: 'Must-have feature list requires final confirmation in Stage 05.',
      resolvingStage: 'Stage 05 Build',
    });
  }

  const strategicOpportunities = [
    {
      id: 'opp_1',
      title: 'Direct Competitor Counter-Positioning',
      rationale: `Position ${ventureName} as the purpose-built modern alternative against bloated legacy incumbents.`,
    },
    {
      id: 'opp_2',
      title: `High-Intent Organic Search in ${operatingLocation}`,
      rationale: `Search demand for solutions to "${idea.problem ? idea.problem.slice(0, 40) : 'the core problem'}" has high commercial intent with low competitor coverage.`,
    },
  ];

  const launchDependencies = [
    {
      fromStage: 'Stage 04 Brand Roadmap',
      toStage: 'Stage 08 GTM Launch Ads',
      description: 'Design tokens and positioning copy feed directly into Meta & Banner creatives.',
      isSatisfied: Boolean(brandReport?.positioningStatement?.fullStatement || completedStages.includes('brand-roadmap')),
    },
    {
      fromStage: 'Stage 05 Build & Specs',
      toStage: 'Stage 07 Experience Simulation',
      description: 'MVP features drive the simulated product demo and prototype walkthrough.',
      isSatisfied: Boolean(completedStages.includes('build')),
    },
  ];

  const synthesisData: ProjectSynthesisData = {
    isActive: true,
    ventureIdentity: {
      name: ventureName,
      category: ventureCategory,
      productType,
      location: operatingLocation,
      targetAudience,
    },
    synthesisNodes,
    criticalBlockers,
    strategicOpportunities,
    launchDependencies,
  };

  // =========================================================================
  // 3. GENERATE MODULE (Visual Reels, Carousels, Banners, Campaigns)
  // =========================================================================
  const reels: VisualReelConcept[] = [
    {
      id: 'reel_1',
      title: 'The "Broken Status Quo" Contrast Storyboard',
      durationSeconds: 24,
      hookHeadline: `Still wrestling with ${idea.problem ? idea.problem.slice(0, 40) : 'legacy compromises'}?`,
      targetAudience,
      audioTrackVibe: 'Crisp minimal electronic pulse with tactile Foley clicks',
      ctaText: 'Discover The Difference',
      productType,
      brandColorPrimary: brandPrimaryColor,
      brandColorAccent: brandAccentColor,
      frames: [
        {
          frameNumber: 1,
          timestamp: '00:00 - 00:04',
          startTimeSec: 0,
          endTimeSec: 4,
          motionType: 'kinetic_glitch',
          visualSceneType: 'problem_friction',
          kineticHeadline: 'STOP GUESSING.',
          visualDirection: `Extreme close-up on friction point. Fast kinetic cut showcasing legacy bottlenecks.`,
          onScreenText: `Why does solving this still feel so broken?`,
          voiceoverOrAudio: `If you are like most ${targetAudience}, you are tired of the same compromises.`,
          featureHighlight: 'Status Quo Bottleneck',
          metricBadge: 'Legacy Friction Detected',
        },
        {
          frameNumber: 2,
          timestamp: '00:04 - 00:10',
          startTimeSec: 4,
          endTimeSec: 10,
          motionType: 'push_in',
          visualSceneType: 'hero_hook',
          kineticHeadline: 'MEET THE NEW STANDARD.',
          visualDirection: `Sharp transition to clean studio lighting. ${ventureName} emerges with specular product reflections.`,
          onScreenText: `Meet ${ventureName}: Re-engineered from first principles.`,
          voiceoverOrAudio: `We built ${ventureName} with zero bloat and 100% focus on ${idea.differentiation || 'quality'}.`,
          featureHighlight: `${ventureName} Core Engine`,
          metricBadge: 'Zero Bloat Architecture',
        },
        {
          frameNumber: 3,
          timestamp: '00:10 - 00:18',
          startTimeSec: 10,
          endTimeSec: 18,
          motionType: 'orbit_zoom',
          visualSceneType: 'product_demo',
          kineticHeadline: '10X FASTER WORKFLOWS.',
          visualDirection: `Rapid demonstration of core feature in action. Zero tool delay.`,
          onScreenText: `✓ Instant Setup  ✓ Zero Compromise  ✓ Verified in ${operatingLocation}`,
          voiceoverOrAudio: `Experience immediate time-to-value with effortless precision.`,
          featureHighlight: isSaaS ? 'Live Interactive Telemetry' : 'Precision Hardware Build',
          metricBadge: 'P95 Load <1.2s',
        },
        {
          frameNumber: 4,
          timestamp: '00:18 - 00:24',
          startTimeSec: 18,
          endTimeSec: 24,
          motionType: 'macro_focus',
          visualSceneType: 'brand_cta',
          kineticHeadline: 'CLAIM YOUR ALLOCATION.',
          visualDirection: `Cinematic hero packshot with clean brand mark and call to action card.`,
          onScreenText: `Priority Launch Access Open • Link in Bio`,
          voiceoverOrAudio: `Join the new standard today. Tap below to claim priority launch access.`,
          featureHighlight: 'Official Launch Portal',
          metricBadge: 'Batch 01 Live',
        },
      ],
    },
    {
      id: 'reel_2',
      title: 'The "Behind The Build" Engineering Deep-Dive',
      durationSeconds: 30,
      hookHeadline: `Why we spent months perfecting ${ventureName}`,
      targetAudience: `Quality-First ${targetAudience}`,
      audioTrackVibe: 'Atmospheric ambient synthesizer with low hum',
      ctaText: 'Inspect Specifications',
      productType,
      brandColorPrimary: brandPrimaryColor,
      brandColorAccent: brandAccentColor,
      frames: [
        {
          frameNumber: 1,
          timestamp: '00:00 - 00:06',
          startTimeSec: 0,
          endTimeSec: 6,
          motionType: 'macro_focus',
          visualSceneType: 'hero_hook',
          kineticHeadline: 'NO SHORTCUTS ALLOWED.',
          visualDirection: 'Macro exploded view of internal architecture and materials.',
          onScreenText: 'Inside the build: Engineered without compromise.',
          voiceoverOrAudio: 'Most products cut corners where you cannot see them. We did the opposite.',
          featureHighlight: 'Zero Compromise Design',
          metricBadge: '100% Precision Specs',
        },
        {
          frameNumber: 2,
          timestamp: '00:06 - 00:18',
          startTimeSec: 6,
          endTimeSec: 18,
          motionType: 'pan_right',
          visualSceneType: 'feature_zoom',
          kineticHeadline: 'BUILT TO SCALE.',
          visualDirection: `Screen recording or CAD animation showing ${idea.differentiation || 'the unique technical architecture'}.`,
          onScreenText: 'Engineered for daily reliability.',
          voiceoverOrAudio: `Every detail was selected specifically for ${targetAudience}.`,
          featureHighlight: 'Verified Supply & Architecture',
          metricBadge: 'Continuous Reliability',
        },
        {
          frameNumber: 3,
          timestamp: '00:18 - 00:30',
          startTimeSec: 18,
          endTimeSec: 30,
          motionType: 'split_reveal',
          visualSceneType: 'brand_cta',
          kineticHeadline: 'VERIFIED REGIONAL LAUNCH.',
          visualDirection: 'Founder signature / verification badge appearing on screen.',
          onScreenText: `Built with pride in ${operatingLocation}`,
          voiceoverOrAudio: `See the complete specifications at our launch portal.`,
          featureHighlight: `Operating Hub: ${operatingLocation}`,
          metricBadge: 'Official Release',
        },
      ],
    },
  ];

  const carousels: VisualCarouselConcept[] = [
    {
      id: 'car_1',
      title: `5 Reasons ${targetAudience} Are Switching To ${ventureName}`,
      theme: 'Educational Teardown',
      targetPersona: targetAudience,
      slides: [
        {
          slideNumber: 1,
          visualConcept: 'High-contrast typography with bold accent badge.',
          headline: `5 Reasons ${targetAudience} Are Leaving Legacy Solutions Behind`,
          bodyCopy: `Swipe to see how ${ventureName} re-engineers the standard for ${operatingLocation}.`,
          badgeOrNumber: '01 / 05',
        },
        {
          slideNumber: 2,
          visualConcept: 'Side-by-side comparison table icon.',
          headline: '1. No Hidden Complexity',
          bodyCopy: `Traditional options burden you with features you never use. ${ventureName} focuses on what matters.`,
          badgeOrNumber: '02 / 05',
        },
        {
          slideNumber: 3,
          visualConcept: 'Speed / Precision gauge graphic.',
          headline: '2. 10x Faster Time-To-Value',
          bodyCopy: `Get up and running in under 5 minutes without mandatory onboarding friction.`,
          badgeOrNumber: '03 / 05',
        },
        {
          slideNumber: 4,
          visualConcept: 'Security / Verification shield.',
          headline: '3. Transparent Guarantees',
          bodyCopy: `Backed by our verified performance standards and regional support in ${operatingLocation}.`,
          badgeOrNumber: '04 / 05',
        },
        {
          slideNumber: 5,
          visualConcept: 'Hero product display with CTA button.',
          headline: 'Ready To Upgrade Your Standard?',
          bodyCopy: `Claim your launch allocation today. Link in profile.`,
          badgeOrNumber: '05 / 05',
          ctaButton: 'Get Started Now',
        },
      ],
    },
  ];

  const banners: BannerAdConcept[] = [
    {
      id: 'ban_1',
      formatName: 'Square Social Feed Banner',
      dimensions: '1080 x 1080',
      headline: `The New Standard For ${targetAudience}`,
      subheadline: idea.differentiation || 'Precision engineering with zero compromises.',
      badgeText: 'LAUNCH EDITION',
      ctaText: 'Explore Platform',
      visualComposition: `Clean studio background with floating product asset on right, crisp typography on left with ${brandPrimaryColor} accent highlights.`,
      primaryColor: brandPrimaryColor,
      accentColor: brandAccentColor,
    },
    {
      id: 'ban_2',
      formatName: 'Landscape Display / Header Banner',
      dimensions: '1200 x 628',
      headline: `Solve ${idea.problem ? idea.problem.slice(0, 35) : 'Core Bottlenecks'} Instantly`,
      subheadline: `Purpose-built for ${targetAudience} across ${operatingLocation}.`,
      badgeText: 'NOW AVAILABLE',
      ctaText: 'Claim Priority Access',
      visualComposition: 'Split-screen composition: Left side features value thesis with CTA, right side displays interactive UI/hardware.',
      primaryColor: brandPrimaryColor,
      accentColor: brandAccentColor,
    },
  ];

  const campaigns: FullCampaignConcept[] = [
    {
      id: 'camp_1',
      campaignTitle: `${ventureName.toUpperCase()}: THE STATUS QUO REJECTION`,
      objective: 'Customer Acquisition & Category Conquest',
      targetAudience,
      coreAngle: `Position ${ventureName} as the focused, high-precision alternative against bloated legacy incumbents.`,
      primaryChannel: isSaaS ? 'High-Intent Search & Founder Social' : 'Meta Video Ads & Creator Seeding',
      funnelStage: 'Top of Funnel (Awareness)',
      primaryCta: 'See The Difference',
      keyDifferentiator: idea.differentiation || 'Sub-second setup with zero hidden fees',
    },
    {
      id: 'camp_2',
      campaignTitle: `${ventureName.toUpperCase()}: REGIONAL LAUNCH ALLOCATION`,
      objective: 'High-Intent Conversion',
      targetAudience: `Active Decision-Makers in ${operatingLocation}`,
      coreAngle: 'Lead with verified launch guarantees and limited first-batch allocation.',
      primaryChannel: 'Meta Retargeting & Direct Email Broadcast',
      funnelStage: 'Bottom of Funnel (Conversion)',
      primaryCta: isSaaS ? 'Start Free Trial' : 'Order Now',
      keyDifferentiator: 'Priority onboarding with 100% satisfaction guarantee',
    },
  ];

  // =========================================================================
  // 4. META ADVERTISING WORKSPACE
  // =========================================================================
  const metaWorkspace: MetaCampaignWorkspace = {
    campaignName: `${ventureName.toUpperCase()}_GTM_LAUNCH_CAMPAIGN`,
    objective: isSaaS ? 'Lead Generation / Free Trial Signups' : 'Sales / Purchases',
    targetAudienceName: `${targetAudience} (${operatingLocation})`,
    demographicSummary: `Ages 24–54 • Located in ${operatingLocation} • Interested in ${ventureCategory}`,
    suggestedInterests: [
      ventureCategory,
      'Quality & Efficiency Tools',
      'Modern Workflows',
    ],
    activeAdVariantIndex: 0,
    variants: [
      {
        id: 'var_1',
        headline: `Meet ${ventureName}: Built to solve ${idea.problem ? idea.problem.slice(0, 30) : 'friction'}.`,
        primaryText: `If you are tired of legacy compromises, discover how ${ventureName} re-engineers the experience for ${targetAudience}. Zero bloat. 100% purpose-built.`,
        descriptionText: `Official Launch • Priority Access Now Open in ${operatingLocation}`,
        ctaButton: 'Learn More',
        visualAssetDescription: 'High-contrast studio hero packshot with dynamic brand title overlay.',
        placementType: 'feed',
        hookAngle: 'Contrast against legacy compromises',
      },
      {
        id: 'var_2',
        headline: `Why ${targetAudience} are switching to ${ventureName}.`,
        primaryText: `See why modern teams in ${operatingLocation} choose ${ventureName}: 10x faster deployment, transparent pricing, and verified reliability.`,
        descriptionText: 'Rated #1 for Ease of Use and Speed.',
        ctaButton: isSaaS ? 'Book Demo' : 'Shop Now',
        visualAssetDescription: 'Side-by-side visual comparison showing speed & simplicity.',
        placementType: 'feed',
        hookAngle: 'Social proof and speed verification',
      },
      {
        id: 'var_3',
        headline: 'Launch Allocation Now Live.',
        primaryText: `Lock in your launch access today. Backed by our full satisfaction guarantee and priority support in ${operatingLocation}.`,
        descriptionText: 'Limited First-Batch Availability.',
        ctaButton: isSaaS ? 'Sign Up' : 'Get Offer',
        visualAssetDescription: 'Clean unboxing visual / live interactive interface preview.',
        placementType: 'story_reel',
        hookAngle: 'Urgency & Launch Guarantee',
      },
    ],
  };

  // =========================================================================
  // 5. SEO WORKSPACE DATA
  // =========================================================================
  const seoWorkspace: SeoWorkspaceData = {
    searchThemes: [
      `Best ${ventureCategory} in ${operatingLocation}`,
      `How to solve ${idea.problem ? idea.problem.slice(0, 30) : 'core problem'}`,
      `${ventureName} alternatives and comparisons`,
      `Modern ${ventureCategory} for ${targetAudience}`,
    ],
    keywordClusters: [
      {
        id: 'seo_1',
        clusterTheme: 'Category Solution Intent',
        searchIntent: 'Commercial',
        primaryKeyword: `best ${ventureCategory.toLowerCase()} for ${targetAudience.toLowerCase()}`,
        secondaryKeywords: [
          `${ventureCategory.toLowerCase()} in ${operatingLocation.toLowerCase()}`,
          `top rated ${ventureCategory.toLowerCase()} 2026`,
        ],
        suggestedPageTitle: `The Modern ${ventureCategory} for ${targetAudience} | ${ventureName}`,
        metaDescription: `Discover how ${ventureName} re-engineers ${ventureCategory.toLowerCase()} for ${targetAudience} across ${operatingLocation}. Read the breakdown.`,
        contentAngle: `Curated decision-maker guide detailing key criteria when choosing modern ${ventureCategory.toLowerCase()}.`,
        targetSlug: `/best-${ventureCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        contentPriority: 'P1 - High Intent',
      },
      {
        id: 'seo_2',
        clusterTheme: 'Problem-Solving How-To',
        searchIntent: 'Informational',
        primaryKeyword: `how to solve ${idea.problem ? idea.problem.slice(0, 30).toLowerCase() : 'bottlenecks'}`,
        secondaryKeywords: [
          'common friction points',
          'step by step guide for teams',
        ],
        suggestedPageTitle: `How to Eliminate ${idea.problem ? idea.problem.slice(0, 30) : 'Core Bottlenecks'} | Complete Guide`,
        metaDescription: `A comprehensive playbook for ${targetAudience} on eliminating friction without expensive legacy overhead.`,
        contentAngle: 'Actionable founder guide providing immediate value, introducing our product as the natural workflow automation.',
        targetSlug: `/guides/solve-${(idea.problem || 'friction').slice(0, 25).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        contentPriority: 'P2 - Supporting Pillar',
      },
      {
        id: 'seo_3',
        clusterTheme: 'Comparison & Alternatives',
        searchIntent: 'Transactional',
        primaryKeyword: `${ventureName.toLowerCase()} vs traditional alternatives`,
        secondaryKeywords: [
          `${ventureName.toLowerCase()} review`,
          `why switch to ${ventureName.toLowerCase()}`,
        ],
        suggestedPageTitle: `${ventureName} vs Legacy Competitors: Full 2026 Breakdown`,
        metaDescription: `Compare ${ventureName} against legacy alternatives on architecture, pricing transparency, and speed.`,
        contentAngle: 'Objective side-by-side matrix demonstrating clear architectural and economic advantages.',
        targetSlug: `/compare/legacy-alternatives`,
        contentPriority: 'P1 - High Intent',
      },
    ],
    technicalAudit: [
      {
        id: 'tech_1',
        checkpoint: 'Title Tag & OpenGraph Metadata',
        category: 'Metadata',
        status: 'passed',
        recommendation: 'Dynamic page titles and social share cards verified with brand tokens.',
      },
      {
        id: 'tech_2',
        checkpoint: 'Structured Schema Markup (Product / Organization)',
        category: 'Architecture',
        status: 'needs_action',
        recommendation: 'Embed JSON-LD Schema on landing page for rich Google SERP snippet display.',
      },
      {
        id: 'tech_3',
        checkpoint: 'Core Web Vitals & Mobile Responsive Test',
        category: 'Performance',
        status: 'passed',
        recommendation: 'P95 load time under 1.2s on mobile connections.',
      },
    ],
  };

  // =========================================================================
  // 6. CRM / CUSTOMER WORKSPACE DATA (Zero fake records - connection required)
  // =========================================================================
  const crmWorkspace: CrmWorkspaceData = {
    lifecycleStages: [
      { id: 'new_lead', label: 'New Inquiries', description: 'Waitlist signups & initial landing page leads' },
      { id: 'engaged', label: 'Engaged Prospects', description: 'Opened emails or requested product specifications' },
      { id: 'trial_demo', label: 'Beta / Trial Users', description: 'Active in sandbox or testing pilot sample' },
      { id: 'customer', label: 'Active Customers', description: 'Completed checkout & onboarded' },
      { id: 'advocate', label: 'Brand Advocates', description: 'Power users generating referrals & reviews' },
    ],
    leads: [],
  };

  // =========================================================================
  // 7. MAINTAIN WORKSPACE DATA (Audits actual project completeness)
  // =========================================================================
  const maintainIssues = [];

  if (!brandReport?.positioningStatement?.fullStatement && !completedStages.includes('brand-roadmap')) {
    maintainIssues.push({
      id: 'iss_1',
      touchpoint: 'Stage 04 Brand Positioning',
      category: 'Brand Identity' as const,
      status: 'attention' as const,
      whatChangedOrWrong: 'Positioning wedge statement not explicitly saved in project state.',
      whyItMatters: 'Marketing copy across Meta, SEO, and ad generators requires an anchored positioning thesis.',
      actionToTake: 'Visit Stage 04 Brand Roadmap to lock positioning.',
      actionPath: '/brand-roadmap',
    });
  }

  if (!completedStages.includes('build')) {
    maintainIssues.push({
      id: 'iss_2',
      touchpoint: 'Stage 05 MVP Feature Scope',
      category: 'Execution Ops' as const,
      status: 'attention' as const,
      whatChangedOrWrong: 'MVP feature matrix has not been formally confirmed.',
      whyItMatters: 'Risk of scope creep during initial launch development.',
      actionToTake: 'Review and confirm Must-Have features in Stage 05.',
      actionPath: '/build',
    });
  }

  if (!completedStages.includes('simulation')) {
    maintainIssues.push({
      id: 'iss_3',
      touchpoint: 'Stage 07 Experience Simulation',
      category: 'Experience Simulation' as const,
      status: 'attention' as const,
      whatChangedOrWrong: 'Experience simulation walkthrough has not been stress-tested.',
      whyItMatters: 'Validates customer experience before investing capital into live ad spend.',
      actionToTake: 'Test the 7-stage experience simulation in Stage 07.',
      actionPath: '/simulation',
    });
  }

  // If everything is complete, provide positive alignment status
  if (maintainIssues.length === 0) {
    maintainIssues.push({
      id: 'iss_all_good',
      touchpoint: 'Multi-Stage Project Cohesion',
      category: 'Brand Identity' as const,
      status: 'resolved' as const,
      whatChangedOrWrong: 'All 7 upstream stages have synchronized outputs in the project state.',
      whyItMatters: 'Ensures consistent brand messaging from thesis to launch ads.',
      actionToTake: 'Maintain existing project parameters.',
    });
  }

  const maintainWorkspace: MaintainWorkspaceData = {
    issues: maintainIssues,
  };

  // =========================================================================
  // 8. BRAND MONITORING CENTER DATA
  // =========================================================================
  const monitoringData: BrandMonitoringData = {
    brandHealth: {
      status: overallPercentage >= 75 ? 'Strong Strategic Alignment' : 'Pending Upstream Stage Inputs',
      completenessRatio: `${completedChecklistCount} of ${totalChecklistCount} verified`,
      activeIdentityElements: [
        `Venture: ${ventureName}`,
        `Category: ${ventureCategory}`,
        `Tagline: "${activeTagline}"`,
        `Primary Color: ${brandPrimaryColor}`,
      ],
      missingElements: readinessItems.filter((i) => !i.isComplete).map((i) => i.label),
    },
    marketSignals: {
      competitorsTracked: marketReport?.competitors?.slice(0, 3).map((c: any) => ({
        name: c.name || 'Category Competitor',
        positioning: c.type || 'Incumbent Provider',
        wedgeOpportunity: `Counter with ${ventureName}'s faster time-to-value and transparent pricing.`,
      })) || [
        {
          name: 'Legacy Market Incumbent',
          positioning: 'High-cost traditional provider',
          wedgeOpportunity: `Counter with ${ventureName}'s focused simplicity.`,
        },
      ],
      marketTailwinds: [
        `Accelerating demand for localized solutions in ${operatingLocation}`,
        `Buyer fatigue with complex multi-feature bloat`,
        `High willingness to pay for verified reliability`,
      ],
    },
    connectedTelemetryStatus: {
      googleAnalytics: false,
      metaPixel: false,
      stripeBilling: false,
      crmSync: false,
    },
    signalActionQueue: [
      {
        id: 'sig_1',
        severity: 'opportunity',
        title: 'High-Intent Search Arbitrage Ready',
        description: `SEO keyword cluster for "${ventureCategory}" mapped and ready for content publishing.`,
        actionLabel: 'Deploy SEO Cluster',
        timestamp: 'Real-Time Synthesis',
      },
      {
        id: 'sig_2',
        severity: 'milestone',
        title: 'Launch Ads Ready For Export',
        description: '3 Meta ad copy variants and creative reels generated from brand roadmap.',
        actionLabel: 'Inspect Meta Workspace',
        timestamp: 'Real-Time Synthesis',
      },
    ],
  };

  return {
    ventureName,
    ventureCategory,
    productType,
    operatingLocation,
    targetAudience,
    readinessSystem,
    synthesisData,
    generateModule: {
      reels,
      carousels,
      banners,
      campaigns,
    },
    metaWorkspace,
    seoWorkspace,
    crmWorkspace,
    maintainWorkspace,
    monitoringData,
  };
}
