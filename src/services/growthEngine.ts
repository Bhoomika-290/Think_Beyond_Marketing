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
  const problem = idea.problem || idea.rawInput || 'Status-quo friction in the market';
  const differentiator = idea.differentiation || 'Precision engineering and transparent execution';
  const country = businessModel.location?.country?.trim() || 'India';
  const cityRegion = businessModel.location?.cityRegion?.trim() || '';
  const operatingLocation =
    businessModel.location?.operatingLocation?.trim() ||
    (cityRegion ? `${cityRegion}, ${country}` : country || 'Primary Target Region');

  const rawInputLower = `${ventureName} ${idea.rawInput} ${idea.problem} ${idea.differentiation} ${targetAudience}`.toLowerCase();

  const isTutoring = rawInputLower.includes('tutor') || rawInputLower.includes('student') || rawInputLower.includes('college') || rawInputLower.includes('teach') || rawInputLower.includes('education') || rawInputLower.includes('academic') || rawInputLower.includes('edtech');
  const isFoodWaste = rawInputLower.includes('waste') || (rawInputLower.includes('restaurant') && rawInputLower.includes('food')) || rawInputLower.includes('spoilage') || rawInputLower.includes('surplus');
  const isRestaurant = !isFoodWaste && (rawInputLower.includes('restaurant') || rawInputLower.includes('dine') || rawInputLower.includes('kitchen') || rawInputLower.includes('waiter') || rawInputLower.includes('food order') || rawInputLower.includes('pos') || rawInputLower.includes('table qr'));
  const isMealDelivery = rawInputLower.includes('meal') || rawInputLower.includes('lunch delivery') || rawInputLower.includes('food delivery') || rawInputLower.includes('diet') || rawInputLower.includes('nutrition');
  const isHomeRepair = rawInputLower.includes('repair') || rawInputLower.includes('handyman') || rawInputLower.includes('plumber') || rawInputLower.includes('electrician') || rawInputLower.includes('home service') || rawInputLower.includes('technician');
  const isSkincare = rawInputLower.includes('skincare') || rawInputLower.includes('cosmetic') || rawInputLower.includes('serum') || rawInputLower.includes('lotion') || rawInputLower.includes('cream') || rawInputLower.includes('beauty') || rawInputLower.includes('dermatolog');
  const isMedical = rawInputLower.includes('medical') || rawInputLower.includes('health') || rawInputLower.includes('clinical') || rawInputLower.includes('diagnostic');
  const isFootwear = rawInputLower.includes('shoe') || rawInputLower.includes('sneaker') || rawInputLower.includes('footwear') || rawInputLower.includes('runner');
  const isApparel = rawInputLower.includes('clothing') || rawInputLower.includes('apparel') || rawInputLower.includes('wool') || rawInputLower.includes('jacket') || rawInputLower.includes('winter');
  const isCoffee = rawInputLower.includes('coffee') || rawInputLower.includes('roast') || rawInputLower.includes('bean') || rawInputLower.includes('brew');
  const isHardware = rawInputLower.includes('hardware') || rawInputLower.includes('iot') || rawInputLower.includes('sensor') || rawInputLower.includes('gadget');
  const isMarketplace = businessModel.productType === 'marketplace' || rawInputLower.includes('marketplace') || isHomeRepair || (isTutoring && !rawInputLower.includes('saas only'));
  const isSaaS = businessModel.productType === 'saas' || isFoodWaste || (!isPhysicalProductDomain() && (rawInputLower.includes('software') || rawInputLower.includes('platform') || rawInputLower.includes('dashboard') || rawInputLower.includes('app') || rawInputLower.includes('ai')));

  function isPhysicalProductDomain(): boolean {
    return businessModel.productType === 'physical' || isSkincare || isFootwear || isApparel || isCoffee || isHardware || isMedical;
  }

  const isPhysical = isPhysicalProductDomain();
  const productType = isTutoring ? 'Two-Sided EdTech Platform' : isFoodWaste ? 'AI Kitchen Intelligence SaaS' : isRestaurant ? 'Restaurant Operations Platform' : isMealDelivery ? 'Direct-to-Desk Meal Subscription' : isHomeRepair ? 'Local Home Services Marketplace' : isSaaS ? 'Software / SaaS' : isPhysical ? 'Physical / Hardware' : 'Service / Hybrid';

  const ventureCategory = isTutoring ? 'Peer Tutoring & Academic Marketplace'
    : isFoodWaste ? 'Restaurant Food-Waste Prediction & Margin Recovery'
    : isRestaurant ? 'Restaurant Operations & Table Dining Tech'
    : isMealDelivery ? 'Chef-Crafted Office Nutrition Delivery'
    : isHomeRepair ? 'Verified Local Home Services Marketplace'
    : isSkincare ? 'Clean Botanical Skincare & D2C Beauty'
    : isMedical ? 'Medical Device & Health Telemetry'
    : isFootwear ? 'Sustainable Performance Footwear'
    : isApparel ? 'Artisan Technical Apparel'
    : isCoffee ? 'Specialty Food & Beverage'
    : isHardware ? 'Connected Hardware & IoT'
    : isMarketplace ? 'Two-Sided Service Marketplace'
    : isSaaS ? 'B2B Software & Platform'
    : 'Direct-to-Consumer Specialty Goods';

  const brandPrimaryColor = brandReport?.brandBoard?.colorPalette?.[0]?.hex || (isTutoring ? '#4F46E5' : isFoodWaste ? '#10B981' : isRestaurant ? '#EA580C' : isMealDelivery ? '#16A34A' : isHomeRepair ? '#0284C7' : isSkincare ? '#0D9488' : '#4D8DFF');
  const brandAccentColor = brandReport?.brandBoard?.colorPalette?.[1]?.hex || '#10B981';
  const activeTagline = brandReport?.taglineWorkspace?.activeTagline || differentiator || 'Engineered without compromise';

  // =========================================================================
  // 1. DYNAMIC LAUNCH READINESS
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
    const completedCount = items.filter((i) => i.isComplete).length;
    const totalCount = items.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const status: LaunchReadinessDimension['status'] = percentage === 100 ? 'ready' : percentage > 0 ? 'in_progress' : 'needs_input';

    const labels: Record<ReadinessDimensionId, { name: string; desc: string }> = {
      brand: { name: 'Brand & Identity', desc: 'Positioning wedge, design tokens & narrative assets' },
      product: { name: 'Product & Architecture', desc: 'MVP specifications, technical schemas & supply chain' },
      market: { name: 'Market & Audience', desc: 'ICP validation, competitor counter-positioning & TAM' },
      experience: { name: 'Customer Experience', desc: 'Interactive simulation & verified user journey loops' },
      execution: { name: 'Execution Operations', desc: 'Sourcing, contract suppliers & 60-day sprint milestones' },
      growth: { name: 'Go-To-Market Engine', desc: 'Meta campaign creatives, SEO clusters & launch tracking' },
    };

    return {
      id: dimId,
      name: labels[dimId].name,
      completedCount,
      totalCount,
      status,
      highlight: `${completedCount}/${totalCount} verified`,
      items,
    };
  });

  const readinessSystem: LaunchReadinessSystem = {
    overallPercentage,
    completedChecklistCount,
    totalChecklistCount,
    verdict: overallPercentage >= 80 ? 'Launch Ready' : overallPercentage >= 50 ? 'Near Ready' : 'In Progress',
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
        `Stack: ${buildReport?.techStack?.items?.[0]?.currentTech || (isSaaS || isTutoring || isRestaurant ? 'TypeScript, React, API' : 'Precision Manufacturing')}`,
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
  let reel1Headline = `Still wrestling with ${problem ? problem.slice(0, 35) : 'legacy compromises'}?`;
  let reel1VoiceoverHook = `If you are like most ${targetAudience}, you are tired of the same expensive compromises.`;
  let reel1FeatureHighlight = differentiator ? differentiator.slice(0, 35) : `${ventureName} Core Engine`;

  if (isTutoring) {
    reel1Headline = 'Exam in 48 hours and completely stuck on a concept?';
    reel1VoiceoverHook = `College tutoring shouldn't cost ₹2,000/hr or require 3-day advance notice. Meet ${ventureName}.`;
    reel1FeatureHighlight = 'Instant WebRTC Peer Classroom';
  } else if (isFoodWaste) {
    reel1Headline = 'Throwing out 15% of your food inventory every evening?';
    reel1VoiceoverHook = `Why are commercial kitchens still guessing tomorrow's prep on gut feel? Meet ${ventureName}.`;
    reel1FeatureHighlight = '60-Sec Prep Loss Elimination';
  } else if (isRestaurant) {
    reel1Headline = 'Tired of waving down waitstaff just to order drinks or get the bill?';
    reel1VoiceoverHook = `Why does dining out still involve waiting 15 minutes for the bill? Meet ${ventureName}.`;
    reel1FeatureHighlight = 'Sub-Second Table QR Ordering';
  } else if (isMealDelivery) {
    reel1Headline = 'Tired of oily 2 PM food comas and 45-minute lunch delivery delays?';
    reel1VoiceoverHook = `Your workday deserves chef-crafted, macro-balanced nutrition delivered right to your desk. Meet ${ventureName}.`;
    reel1FeatureHighlight = '12:30 PM Desk Delivery SLA';
  } else if (isHomeRepair) {
    reel1Headline = 'Plumbing or electrical emergency and no idea who to trust?';
    reel1VoiceoverHook = `No more price gouging or contractors showing up 3 hours late. Meet ${ventureName}.`;
    reel1FeatureHighlight = 'Fixed Price Cards & 30-Min Dispatch';
  } else if (isSkincare) {
    reel1Headline = 'Skin irritated by synthetic perfumes and 20-ingredient filler serums?';
    reel1VoiceoverHook = `Your skin barrier deserves pure botanical actives with zero compromise. Meet ${ventureName}.`;
    reel1FeatureHighlight = 'Cold-Pressed Bio-Lipid Barrier';
  }

  const reels: VisualReelConcept[] = [
    {
      id: 'reel_1',
      title: 'The "Broken Status Quo" Contrast Storyboard',
      durationSeconds: 24,
      hookHeadline: reel1Headline,
      targetAudience,
      audioTrackVibe: 'Crisp minimal electronic pulse with tactile Foley sound effects',
      ctaText: isTutoring ? 'Find A Tutor Now' : isFoodWaste ? 'Start Kitchen Pilot' : isRestaurant ? 'Try Demo Table' : isMealDelivery ? 'Get Trial Box' : isHomeRepair ? 'Book Repair' : isSkincare ? 'Explore Pure Formulas' : 'Discover The Difference',
      productType,
      brandColorPrimary: brandPrimaryColor,
      brandColorAccent: brandAccentColor,
      whyCreativeFits: `Directly attacks the primary customer frustration (${problem.slice(0, 45)}...) in the first 3 seconds and presents ${ventureName}'s core wedge as the obvious relief.`,
      conceptTreatment: 'Contrast narrative comparing the stressful legacy status quo against frictionless modern execution.',
      frames: [
        {
          frameNumber: 1,
          timestamp: '00:00 - 00:04',
          startTimeSec: 0,
          endTimeSec: 4,
          motionType: 'kinetic_glitch',
          visualSceneType: 'problem_friction',
          kineticHeadline: isTutoring ? 'EXAM PANIC?' : isFoodWaste ? 'FOOD WASTE?' : isRestaurant ? 'WAITING FOREVER?' : isMealDelivery ? 'LUNCH CRASH?' : isHomeRepair ? 'REPAIR ANXIETY?' : isSkincare ? 'SKIN BARRIER BROKEN?' : 'STOP GUESSING.',
          visualDirection: isTutoring
            ? 'Close-up of stressed student studying open textbooks late at night before midterms.'
            : isFoodWaste
            ? 'Chef shaking head while scraping full prep pans into kitchen waste bins during closing.'
            : isRestaurant
            ? 'Diner repeatedly looking at watch while trying to get waiter attention in crowded dining room.'
            : isMealDelivery
            ? 'Office worker slumped at desk looking at greasy takeout container with 2 PM energy slump.'
            : isHomeRepair
            ? 'Water leaking from kitchen sink pipe while homeowner stares at confusing classified listings.'
            : `Extreme close-up on real customer friction point: "${problem.slice(0, 50)}...". Fast kinetic cut showcasing legacy bottlenecks.`,
          onScreenText: `Why does solving this still feel so broken?`,
          voiceoverOrAudio: reel1VoiceoverHook,
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
          visualDirection: `Sharp transition to clean studio lighting. ${ventureName} emerges with specular product reflections and clean brand aesthetic.`,
          onScreenText: `Meet ${ventureName}: Built specifically for ${targetAudience}.`,
          voiceoverOrAudio: `We built ${ventureName} with zero bloat and 100% focus on ${differentiator}.`,
          featureHighlight: reel1FeatureHighlight,
          metricBadge: 'Zero Compromise Architecture',
        },
        {
          frameNumber: 3,
          timestamp: '00:10 - 00:18',
          startTimeSec: 10,
          endTimeSec: 18,
          motionType: 'orbit_zoom',
          visualSceneType: 'product_demo',
          kineticHeadline: isTutoring ? 'BOOK IN 45 SECONDS.' : isFoodWaste ? 'SUB-SECOND PREP SHEETS.' : isRestaurant ? 'INSTANT TABLE QR.' : isMealDelivery ? 'DESK DELIVERY AT 12:30.' : isHomeRepair ? 'FIXED PRICE CARD BOOKING.' : isSkincare ? 'VISIBLE BARRIER RELIEF.' : '10X FASTER RESULTS.',
          visualDirection: isTutoring
            ? 'Split screen showing student selecting course -> instant verified tutor room launching with collaborative canvas.'
            : isFoodWaste
            ? 'Line cook tapping 3 quick ingredients on iPad -> automated prep sheet recalculating for tomorrow with 0 waste.'
            : isRestaurant
            ? 'Diner tapping phone to table NFC stand -> instant visual menu -> thermal KOT print in kitchen in <2 seconds.'
            : isMealDelivery
            ? 'Eco-friendly thermal lunch box unboxed at desk revealing vibrant macro-balanced chef recipe.'
            : isHomeRepair
            ? 'Homeowner tapping fixed-price plumbing repair -> live GPS technician route arriving in 24 minutes.'
            : isSkincare
            ? 'Macro amber dropper slow-motion serum drop -> velvety absorption into skin with zero greasy residue.'
            : isPhysical
            ? 'Precision macro camera orbit showing tactile materials, zero tooling defects, and durable seams.'
            : 'Rapid demonstration of core feature in action with live sub-50ms data updates.',
          onScreenText: `✓ Instant Setup  ✓ Zero Compromise  ✓ Verified in ${operatingLocation}`,
          voiceoverOrAudio: `Experience immediate time-to-value with effortless precision.`,
          featureHighlight: isPhysical ? 'Tactile Material Spec' : 'Live Interactive Telemetry',
          metricBadge: 'Verified Performance',
        },
        {
          frameNumber: 4,
          timestamp: '00:18 - 00:24',
          startTimeSec: 18,
          endTimeSec: 24,
          motionType: 'macro_focus',
          visualSceneType: 'brand_cta',
          kineticHeadline: 'CLAIM YOUR ALLOCATION.',
          visualDirection: `Cinematic hero packshot with clean brand mark and official call to action badge.`,
          onScreenText: `Priority Launch Access Open • Link in Bio`,
          voiceoverOrAudio: `Join the new standard today. Tap below to claim priority launch access.`,
          featureHighlight: 'Official Launch Portal',
          metricBadge: 'Launch Batch 01 Live',
        },
      ],
    },
    {
      id: 'reel_2',
      title: 'The "Behind The Build" Engineering Deep-Dive',
      durationSeconds: 30,
      hookHeadline: `Why we spent months perfecting ${ventureName}`,
      targetAudience: `Discerning ${targetAudience}`,
      audioTrackVibe: 'Atmospheric ambient synthesizer with low hum and precision mechanical clicks',
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
          visualDirection: 'Macro view of internal architecture, materials, and rigorous testing standards.',
          onScreenText: 'Inside the build: Engineered without compromise.',
          voiceoverOrAudio: 'Most providers cut corners where you cannot see them. We did the exact opposite.',
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
          visualDirection: `Detailed animation showing ${differentiator || 'the unique architecture'}.`,
          onScreenText: 'Engineered for daily reliability.',
          voiceoverOrAudio: `Every detail was selected specifically for ${targetAudience}.`,
          featureHighlight: 'Verified Architecture',
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
          visualDirection: 'Founder signature and verified quality badge appearing on screen.',
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
      title: `5 Reasons ${targetAudience} Are Choosing ${ventureName}`,
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
          bodyCopy: `Traditional options burden you with features you never use. ${ventureName} focuses directly on: "${problem.slice(0, 50)}...".`,
          badgeOrNumber: '02 / 05',
        },
        {
          slideNumber: 3,
          visualConcept: 'Speed / Precision gauge graphic.',
          headline: '2. 10x Faster Time-To-Value',
          bodyCopy: `Get up and running in under 5 minutes without mandatory onboarding friction or multi-day setup delays.`,
          badgeOrNumber: '03 / 05',
        },
        {
          slideNumber: 4,
          visualConcept: 'Security / Verification shield.',
          headline: '3. Transparent Guarantees',
          bodyCopy: `Backed by verified performance standards and regional support in ${operatingLocation}.`,
          badgeOrNumber: '04 / 05',
        },
        {
          slideNumber: 5,
          visualConcept: 'Hero product display with CTA button.',
          headline: 'Ready To Upgrade Your Standard?',
          bodyCopy: `Claim your launch allocation today. Link in profile.`,
          badgeOrNumber: '05 / 05',
          ctaButton: isTutoring ? 'Find A Tutor' : isRestaurant ? 'Get Demo Stand' : isSkincare ? 'Shop Pure Serums' : 'Get Started Now',
        },
      ],
    },
  ];

  const banners: BannerAdConcept[] = [
    {
      id: 'ban_1',
      formatName: 'Square Social Feed Banner',
      dimensions: '1080 x 1080',
      headline: `The Dedicated Standard For ${targetAudience}`,
      subheadline: differentiator || 'Precision engineering with zero compromises.',
      badgeText: 'LAUNCH EDITION',
      ctaText: isTutoring ? 'Find Tutor' : isRestaurant ? 'Book Demo' : isSkincare ? 'Order Now' : 'Explore Platform',
      visualComposition: `Clean studio background with authentic product asset on right, crisp typography on left with ${brandPrimaryColor} accent highlights.`,
      primaryColor: brandPrimaryColor,
      accentColor: brandAccentColor,
    },
    {
      id: 'ban_2',
      formatName: 'Landscape Display / Header Banner',
      dimensions: '1200 x 628',
      headline: `Solve ${problem ? problem.slice(0, 35) : 'Core Bottlenecks'} Instantly`,
      subheadline: `Purpose-built for ${targetAudience} across ${operatingLocation}.`,
      badgeText: 'NOW AVAILABLE',
      ctaText: 'Claim Priority Access',
      visualComposition: 'Split-screen composition: Left side features value thesis with CTA, right side displays interactive UI / product.',
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
      primaryChannel: isTutoring ? 'Campus Ambassador Programs & Student Reels' : isRestaurant ? 'In-Person Merchant Demos & POS Marketplace' : isSaaS ? 'High-Intent Search & Founder Social' : 'Meta Video Ads & Creator Seeding',
      funnelStage: 'Top of Funnel (Awareness)',
      primaryCta: isTutoring ? 'Book Trial Session' : isRestaurant ? 'Schedule Table Demo' : 'See The Difference',
      keyDifferentiator: differentiator || 'Sub-second setup with zero hidden fees',
    },
    {
      id: 'camp_2',
      campaignTitle: `${ventureName.toUpperCase()}: REGIONAL LAUNCH ALLOCATION`,
      objective: 'High-Intent Conversion',
      targetAudience: `Active Decision-Makers in ${operatingLocation}`,
      coreAngle: 'Lead with verified launch guarantees and limited first-batch allocation.',
      primaryChannel: isRestaurant ? 'Direct Merchant Walk-Ins' : 'Meta Retargeting & Direct WhatsApp Broadcast',
      funnelStage: 'Bottom of Funnel (Conversion)',
      primaryCta: isSaaS || isTutoring ? 'Start Free' : 'Order Now',
      keyDifferentiator: 'Priority onboarding with 100% satisfaction guarantee',
    },
  ];

  // =========================================================================
  // 4. META ADVERTISING WORKSPACE (3 Distinct Creative Angles)
  // =========================================================================
  let problemHeadline = `Still struggling with ${problem ? problem.slice(0, 30) : 'legacy friction'}?`;
  let problemPrimary = `If you are tired of status-quo compromises, discover how ${ventureName} re-engineers the experience for ${targetAudience}. Purpose-built to eliminate "${problem.slice(0, 50)}...".`;
  let problemVisual = `High-contrast cinematic visual capturing the acute friction point experienced by ${targetAudience} in ${operatingLocation}.`;
  let problemHook = `Tired of the standard workaround? Here is why ${ventureName} changes the equation.`;
  let problemReason = `Attacks customer inertia by articulating their exact daily friction and offering an immediate alternative.`;

  let productHeadline = `Inside ${ventureName}: Built around ${differentiator ? differentiator.slice(0, 30) : 'precision engineering'}.`;
  let productPrimary = `See the architecture that gives ${targetAudience} an unfair advantage: ${differentiator || 'Sub-second execution and zero legacy bloat'}. Verified for performance in ${operatingLocation}.`;
  let productVisual = `Clean split-screen product demo showing the core interface / material details in action with live performance telemetry.`;
  let productHook = `10x faster turnaround with zero hidden fees or bureaucratic friction.`;
  let productReason = `Appeals to analytical evaluators who want to inspect the actual product mechanics and feature superiority.`;

  let outcomeHeadline = `Join the new standard for ${targetAudience} in ${operatingLocation}.`;
  let outcomePrimary = `Experience measurable results on Day 1. ${ventureName} delivers proven reliability, validated unit economics, and 100% satisfaction guarantees.`;
  let outcomeVisual = `Authentic customer success snapshot and verified badge highlighting real-world ROI and time saved.`;
  let outcomeHook = `Proven results: How operators in ${operatingLocation} eliminated their biggest operational bottleneck.`;
  let outcomeReason = `Leverages social proof, risk reversal, and outcome clarity to convert bottom-of-funnel decision-makers.`;

  if (isTutoring) {
    problemHeadline = 'Stuck on Homework at 11 PM? Get 1-on-1 Help in 2 Minutes.';
    problemPrimary = `Stop paying ₹2,000/hr for generic coaching centers that don't even know your professor's syllabus. ${ventureName} matches you instantly with verified top students from your exact university. Pay only ₹350–₹500/hr with escrow protection.`;
    problemVisual = 'Split screen: Frustrated student staring at complex Calculus textbook at midnight vs. 1-tap connection to an A-grade peer tutor on phone.';
    problemHook = 'Exam in 48 hours and completely stuck on a concept?';
    problemReason = 'Captures acute academic anxiety during homework and exam crunches when intent is at its absolute peak.';

    productHeadline = 'Instant WebRTC Peer Classroom with Shared Canvas & Recording.';
    productPrimary = `Built specifically for college courses. Launch a collaborative whiteboard, share code or equations in real time, and get auto-recorded lesson notes. Zero downloads, zero subscriptions.`;
    productVisual = 'Crisp interactive preview showing live collaborative whiteboard with LaTeX equation rendering and verified tutor badge.';
    productHook = 'No scheduling emails. No 3-day wait. Just instant peer clarity.';
    productReason = 'Demonstrates modern product superiority over clunky Zoom calls and unverified message board tutors.';

    outcomeHeadline = 'Ace Your Midterms Without Burning Your Savings.';
    outcomePrimary = `Over 25 verified university subject tutors available right now in ${operatingLocation}. Join hundreds of students boosting their GPA without blowing their monthly allowance. First 15 minutes free.`;
    outcomeVisual = 'Student smiling at exam score notification with 5-star peer review badge and transparent hourly escrow receipt.';
    outcomeHook = 'Higher grades, zero financial stress. See available tutors now.';
    outcomeReason = 'Closes hesitant students by emphasizing affordable hourly economics and risk-free first lesson guarantees.';
  } else if (isFoodWaste) {
    problemHeadline = 'Stop Throwing 15% of Your Food Inventory Into the Dumpster.';
    problemPrimary = `Food ingredient inflation is eating your restaurant's margins. ${ventureName} eliminates kitchen over-prep with 60-second end-of-day logging and automated predictive prep sheets. Saves ₹35,000–₹85,000 monthly.`;
    problemVisual = 'Line cook discarding expensive prep containers vs clean smartphone dashboard displaying exact daily prep quantities.';
    problemHook = "Why is your kitchen still guessing tomorrow's prep quantities on gut feel?";
    problemReason = 'Directly targets the #1 pain of independent restaurant owners: food cost margin leakage.';

    productHeadline = 'Zero-Hardware Kitchen Intelligence That Syncs With Your POS.';
    productPrimary = `No expensive smart scales or clunky kiosks. ${ventureName} bridges directly into Petpooja, Toast, or Square to turn sales data into precise tomorrow morning prep sheets in sub-50ms.`;
    productVisual = 'Diagram showing POS ticket data flowing into automated kitchen prep schedule on an iPad.';
    productHook = '60-second evening tap logging your cooks will actually use during peak rush.';
    productReason = 'Overcomes the standard objection that software is too complicated for kitchen staff to maintain.';

    outcomeHeadline = 'Cut Food Costs by 9.4% in 30 Days Guaranteed.';
    outcomePrimary = `Restaurant operators across ${operatingLocation} are recovering an average of 8–14% in food cost savings within their first month. Request a 14-day zero-risk kitchen pilot today.`;
    outcomeVisual = 'Restaurant manager reviewing monthly profit breakdown showing a 9.4% food waste reduction badge and net margin gain.';
    outcomeHook = 'Guaranteed 10x ROI on your software investment or pay nothing.';
    outcomeReason = 'Provides definitive financial justification and risk reversal for cost-conscious restaurant owners.';
  } else if (isMealDelivery) {
    problemHeadline = 'Tired of 2 PM Energy Crashes and Oily Cafeteria Lunches?';
    problemPrimary = `Skip the 45-minute lunch delivery delay and heavy food comas. ${ventureName} delivers chef-crafted, macro-balanced clean meals directly to your office desk at exactly 12:30 PM. From ₹180/meal.`;
    problemVisual = 'Tired professional slumped at desk after heavy fast food vs energized professional enjoying fresh macro-balanced bowl.';
    problemHook = 'Why does ordering lunch at work take 45 minutes and ruin your afternoon focus?';
    problemReason = 'Connects directly with the daily frustration of busy office workers seeking healthy, predictable nutrition.';

    productHeadline = 'Chef-Crafted Daily Rotation in Thermal Insulated Desk Packaging.';
    productPrimary = `High-protein, clean-carb recipes designed by clinical nutritionists. Delivered in compostable thermal insulation boxes with 1-click WhatsApp skip/pause for hybrid work schedules.`;
    productVisual = 'Unboxing shot of hot gourmet meal in sleek eco-friendly compartmentalized container with macro nutrition card.';
    productHook = 'Guaranteed 12:30 PM arrival at your office tower reception or desk.';
    productReason = 'Highlights physical product quality, guaranteed delivery SLA, and hybrid schedule flexibility.';

    outcomeHeadline = 'Clean Daily Fuel That Powers Your Workday.';
    outcomePrimary = `Join over 400 professionals in ${operatingLocation} eating clean, saving 5 hours weekly, and maintaining peak afternoon stamina. Start your 5-day trial box today.`;
    outcomeVisual = 'Colleagues opening gourmet lunch boxes in modern office lounge with 4.9-star rating overlay.';
    outcomeHook = '5 delicious lunches, zero planning, 100% clean energy.';
    outcomeReason = 'Drives subscription conversion through lifestyle upgrade and peer social proof.';
  } else if (isHomeRepair) {
    problemHeadline = 'Tired of Contractors Quoting One Price and Charging Double?';
    problemPrimary = `No more haggling, unverified handymen, or surprise arrival charges. ${ventureName} gives you instant upfront price cards and dispatches background-checked master technicians to your home in 30 minutes.`;
    problemVisual = 'Homeowner arguing over handwritten contractor bill vs clean phone screen showing verified fixed-price card with 90-day warranty.';
    problemHook = 'Why does fixing a leaking pipe or faulty wiring still feel like a gamble?';
    problemReason = 'Addresses the primary consumer fear of contractor price gouging and unreliability.';

    productHeadline = 'Transparent Rate Cards, Live GPS Tracking & Escrow Payment.';
    productPrimary = `Select your repair, see the exact fixed price, and track your technician's live arrival. Funds stay in escrow until you inspect the completed work and approve release. 100% guaranteed.`;
    productVisual = 'Mobile app interface showing live technician GPS map, verified background check badge, and 1-tap escrow release button.';
    productHook = 'Book in 60 seconds with verified local master technicians.';
    productReason = 'Shows the secure technology platform that guarantees safety and fair pricing.';

    outcomeHeadline = 'Home Repairs Done Right the First Time with 90-Day Warranty.';
    outcomePrimary = `Over 1,200 verified 5-star home repairs completed in ${operatingLocation}. Backed by our ₹10,000 workmanship property protection guarantee. Book your repair today.`;
    outcomeVisual = 'Clean modern home bathroom with completed plumbing repair and official 90-day warranty badge.';
    outcomeHook = 'Trusted by homeowners across your city. Zero surprise fees.';
    outcomeReason = 'Builds complete confidence through warranty protection and regional trust proof points.';
  }

  const metaWorkspace: MetaCampaignWorkspace = {
    campaignName: `${ventureName.toUpperCase()}_GTM_LAUNCH_CAMPAIGN`,
    objective: isSaaS || isTutoring ? 'Lead Generation / Free Trial Signups' : isFoodWaste || isRestaurant ? 'B2B Demo Bookings' : 'Sales / Purchases',
    targetAudienceName: `${targetAudience} (${operatingLocation})`,
    demographicSummary: `Ages 18–54 • Located in ${operatingLocation} • Interested in ${ventureCategory}`,
    suggestedInterests: [
      ventureCategory,
      isTutoring ? 'Higher Education & Exam Preparation' : isFoodWaste ? 'Restaurant Operations & Food Cost Optimization' : isRestaurant ? 'Restaurant Management & Hospitality' : isMealDelivery ? 'Healthy Eating & Corporate Wellness' : isHomeRepair ? 'Home Improvement & Maintenance' : isSkincare ? 'Clean Beauty & Dermatology' : 'Modern Tools',
      'Quality & Efficiency',
    ],
    activeAdVariantIndex: 0,
    variants: [
      {
        id: 'var_1_problem',
        headline: problemHeadline,
        primaryText: problemPrimary,
        descriptionText: `Official Launch • Priority Access Open in ${operatingLocation}`,
        ctaButton: isTutoring ? 'Sign Up' : isFoodWaste || isRestaurant ? 'Book Demo' : isSaaS ? 'Learn More' : isMealDelivery || isHomeRepair ? 'Get Offer' : 'Shop Now',
        visualAssetDescription: problemVisual,
        placementType: 'feed',
        hookAngle: problemHook,
        creativeAngleType: 'problem_led',
        reasonForAngle: problemReason,
        audience: targetAudience,
      },
      {
        id: 'var_2_product',
        headline: productHeadline,
        primaryText: productPrimary,
        descriptionText: 'Rated #1 for Speed, Transparency, and Ease of Use.',
        ctaButton: isFoodWaste || isRestaurant ? 'Book Demo' : isTutoring ? 'Sign Up' : isSaaS ? 'Learn More' : 'Get Offer',
        visualAssetDescription: productVisual,
        placementType: 'feed',
        hookAngle: productHook,
        creativeAngleType: 'product_led',
        reasonForAngle: productReason,
        audience: targetAudience,
      },
      {
        id: 'var_3_outcome',
        headline: outcomeHeadline,
        primaryText: outcomePrimary,
        descriptionText: `Verified in ${operatingLocation} • 100% Satisfaction Guarantee`,
        ctaButton: isSaaS || isTutoring ? 'Sign Up' : isFoodWaste || isRestaurant ? 'Book Demo' : 'Get Offer',
        visualAssetDescription: outcomeVisual,
        placementType: 'story_reel',
        hookAngle: outcomeHook,
        creativeAngleType: 'outcome_led',
        reasonForAngle: outcomeReason,
        audience: targetAudience,
      },
    ],
  };

  // =========================================================================
  // 5. SEO WORKSPACE DATA
  // =========================================================================
  const seoWorkspace: SeoWorkspaceData = {
    searchThemes: [
      `Best ${ventureCategory} in ${operatingLocation}`,
      `How to solve ${problem ? problem.slice(0, 30) : 'core problem'}`,
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
        primaryKeyword: `how to solve ${problem ? problem.slice(0, 30).toLowerCase() : 'bottlenecks'}`,
        secondaryKeywords: [
          'common friction points',
          'step by step guide for teams',
        ],
        suggestedPageTitle: `How to Eliminate ${problem ? problem.slice(0, 30) : 'Core Bottlenecks'} | Complete Guide`,
        metaDescription: `A comprehensive playbook for ${targetAudience} on eliminating friction without expensive legacy overhead.`,
        contentAngle: 'Actionable founder guide providing immediate value, introducing our product as the natural workflow automation.',
        targetSlug: `/guides/solve-${(problem || 'friction').slice(0, 25).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
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
  // 6. CRM / CUSTOMER WORKSPACE DATA
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
  // 7. MAINTAIN WORKSPACE DATA
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

  if (maintainIssues.length === 0) {
    maintainIssues.push({
      id: 'iss_all_good',
      touchpoint: 'Multi-Stage Project Cohesion',
      category: 'Brand Identity' as const,
      status: 'resolved' as const,
      whatChangedOrWrong: 'All upstream stages have synchronized outputs in the project state.',
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
        `Accelerating demand for specialized solutions in ${operatingLocation}`,
        `Buyer fatigue with complex multi-feature bloat and hidden fees`,
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
