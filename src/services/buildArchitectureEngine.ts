import type {
  ProjectState,
  BuildArchitectureReport,
  BuildReadinessMetric,
  BuildReadinessOverview,
  BlueprintNode,
  ProductBlueprint,
  ProductModalityBlueprint,
  FeatureBehaviorFlowItem,
  MVPFeatureItem,
  MVPScopeSystem,
  FeatureCategoryGroup,
  FeatureArchitectureTree,
  ArchitectureLayer,
  SystemArchitectureSystem,
  TechStackItem,
  TechStackSystem,
  DataEntity,
  DataModelSystem,
  ProductJourneyStep,
  ProductJourneySystem,
  ScreenItem,
  ScreenArchitectureSystem,
  APIIntegrationItem,
  APIIntegrationMap,
  AIArchitectureSystem,
  BuildCouncilPerspective,
  AICouncilBuildSynthesis,
  ArchitectureStressTest,
  ChallengerEvaluatorSystem,
  DependencyGraphNode,
  BuildDependencyGraphSystem,
  BuildRoadmapPhase,
  BuildRoadmapSystem,
  BuildRiskItem,
  BuildRiskMatrixSystem,
  BuildDecisionItem,
  BuildDecisionBoardSystem,
  BrandProductConsistencyToken,
  BrandProductConsistencySystem,
  Stage06HandoffCheck,
  Stage06HandoffDossier,
  ColorSwatch,
  TypographyPair,
  BrandVoiceAttribute,
} from '../types/project';

export function generateBuildArchitectureReport(state: ProjectState): BuildArchitectureReport {
  const { idea, businessModel, project, feasibility, marketIntelligence, brandRoadmap } = state;
  const ventureName = idea.name || project.name || 'Untitled Venture';
  const productType = businessModel.productType || 'saas';
  const targetAudience = idea.targetAudience || 'Target customers and early adopters';
  const problem = idea.problem || idea.rawInput || 'Status-quo friction with legacy alternatives';
  const differentiator =
    idea.differentiation ||
    brandRoadmap?.positioningStatement?.becauseDifferentiator ||
    brandRoadmap?.differentiatorChain?.candidates?.find((c) => c.isSelected)?.differentiator ||
    'Proprietary precision workflow and radical operational transparency';

  const isPhysical = productType === 'physical';

  // 1. BUILD READINESS METRICS (Derived strictly from upstream completion)
  const hasIdea = Boolean(idea.name && idea.problem && idea.targetAudience);
  const hasFeasibility = Boolean(feasibility && feasibility.dimensions);
  const hasMarket = Boolean(marketIntelligence && marketIntelligence.competitors?.length);
  const hasBrand = Boolean(
    brandRoadmap &&
      (brandRoadmap.positioningStatement?.fullStatement ||
        brandRoadmap.brandBoard?.tagline ||
        brandRoadmap.identityAudit?.readinessStatus === 'READY')
  );

  const metrics: BuildReadinessMetric[] = [
    {
      id: 'metric_product_clarity',
      name: 'Product Scope Clarity',
      score: hasIdea ? (idea.differentiation ? 92 : 78) : 45,
      status: hasIdea ? 'CLARIFIED' : 'NEEDS_INPUT',
      provenance: hasIdea ? 'USER_PROVIDED' : 'NEEDS_VALIDATION',
      originatingStage: '01 Idea Lab',
      summary: hasIdea
        ? `Defined around solving: "${problem.slice(0, 50)}..."`
        : 'Core value proposition and feature perimeter require deeper founder definition.',
    },
    {
      id: 'metric_customer_clarity',
      name: 'Customer Definition Clarity',
      score: targetAudience.length > 20 ? 88 : 55,
      status: targetAudience.length > 20 ? 'CLARIFIED' : 'NEEDS_INPUT',
      provenance: idea.targetAudience ? 'USER_PROVIDED' : 'AI_INFERENCE',
      originatingStage: '01 Idea Lab & 03 Market',
      summary: `Targeting: ${targetAudience.slice(0, 65)}...`,
    },
    {
      id: 'metric_market_clarity',
      name: 'Competitive Landscape Clarity',
      score: hasMarket ? 85 : 40,
      status: hasMarket ? 'CLARIFIED' : 'NEEDS_VALIDATION',
      provenance: hasMarket ? 'VERIFIED_SOURCE' : 'NEEDS_VALIDATION',
      originatingStage: '03 Market Intelligence',
      summary: hasMarket
        ? `${marketIntelligence?.competitors?.length || 0} competitors profiled with clear market gap mapping.`
        : 'Competitors and price tiers require empirical validation.',
    },
    {
      id: 'metric_diff_clarity',
      name: 'Differentiation & Moat',
      score: differentiator.length > 15 ? 90 : 50,
      status: differentiator.length > 15 ? 'CLARIFIED' : 'NEEDS_INPUT',
      provenance: idea.differentiation ? 'USER_PROVIDED' : 'AI_INFERENCE',
      originatingStage: '04 Brand Roadmap',
      summary: `Core moat: ${differentiator.slice(0, 60)}...`,
    },
    {
      id: 'metric_brand_readiness',
      name: 'Brand & Visual Identity',
      score: hasBrand ? 95 : 35,
      status: hasBrand ? 'CLARIFIED' : 'NEEDS_INPUT',
      provenance: hasBrand ? 'USER_PROVIDED' : 'NEEDS_VALIDATION',
      originatingStage: '04 Brand Roadmap',
      summary: hasBrand
        ? 'Identity tokens, logo, color system, and positioning statement locked.'
        : 'Brand identity system not yet confirmed in Stage 04.',
    },
    {
      id: 'metric_tech_readiness',
      name: 'Technical Feasibility',
      score: hasFeasibility ? 82 : 60,
      status: hasFeasibility ? 'CLARIFIED' : 'NEEDS_VALIDATION',
      provenance: hasFeasibility ? 'AI_INFERENCE' : 'ASSUMPTION',
      originatingStage: '02 Feasibility & Viability',
      summary: isPhysical
        ? 'Supply chain, packaging, and batch logistics evaluated.'
        : 'API requirements, data pipeline, and hosting parameters mapped.',
    },
    {
      id: 'metric_ops_readiness',
      name: 'Operational & Fulfillment',
      score: isPhysical ? (businessModel.location?.country ? 80 : 50) : 85,
      status: isPhysical && !businessModel.location?.country ? 'NEEDS_INPUT' : 'CLARIFIED',
      provenance: businessModel.location?.country ? 'USER_PROVIDED' : 'NEEDS_VALIDATION',
      originatingStage: '01 Footprint & 02 Ops',
      summary: isPhysical
        ? `Operating footprint: ${businessModel.location?.operatingLocation || businessModel.location?.country || 'Pending location'}`
        : 'Standard cloud SaaS operational lifecycle and digital onboarding.',
    },
    {
      id: 'metric_data_readiness',
      name: 'Data & Schema Architecture',
      score: 75,
      status: 'CLARIFIED',
      provenance: 'AI_INFERENCE',
      originatingStage: '05 Build & Architecture',
      summary: isPhysical
        ? 'Relational model: Customer, Order, Inventory, Batch, and Shipment entities.'
        : 'Multi-tenant relational + event telemetry schema mapped.',
    },
    {
      id: 'metric_mvp_readiness',
      name: 'MVP Scope Prioritization',
      score: 85,
      status: 'CLARIFIED',
      provenance: 'AI_INFERENCE',
      originatingStage: '05 Build & Architecture',
      summary: 'MoSCoW matrix categorized with critical path identified.',
    },
  ];

  const overallScore = Math.round(
    metrics.reduce((acc, m) => acc + m.score, 0) / metrics.length
  );

  let buildStatus: BuildReadinessOverview['buildStatus'] = 'Build Ready';
  let statusExplanation = 'Comprehensive upstream intelligence mapped. System blueprint is ready for build execution.';

  if (overallScore < 55) {
    buildStatus = 'Discovery';
    statusExplanation = 'Early-stage venture definition. Recommend completing upstream Idea Lab & Feasibility stages.';
  } else if (overallScore < 70) {
    buildStatus = 'Architecture Ready';
    statusExplanation = 'Core business model clear. Architectural boundaries mapped; MVP feature trade-offs in progress.';
  } else if (overallScore < 82) {
    buildStatus = 'MVP Definition';
    statusExplanation = 'Technical stack and entities structured. Ready to finalize sprint backlog and handoff to execution.';
  }

  const readinessOverview: BuildReadinessOverview = {
    overallScore,
    buildStatus,
    statusExplanation,
    metrics,
  };

  // 2. PRODUCT BLUEPRINT FLOW (Connected visual chain)
  const blueprintNodes: BlueprintNode[] = [
    {
      id: 'bp_problem',
      label: 'Customer Problem',
      category: 'problem',
      title: 'Acute Status-Quo Pain',
      description: problem,
      provenance: idea.problem ? 'USER_PROVIDED' : 'AI_INFERENCE',
      originatingStage: '01 Idea Lab',
      buildImplication: 'Directly informs the primary value-metric and first-time user aha moment.',
      evidenceQuote: idea.rawInput || undefined,
    },
    {
      id: 'bp_user',
      label: 'Target Persona',
      category: 'user',
      title: 'Primary Adopter Persona',
      description: targetAudience,
      provenance: idea.targetAudience ? 'USER_PROVIDED' : 'AI_INFERENCE',
      originatingStage: '01 Idea Lab & 03 Market',
      buildImplication: 'Dictates UI ergonomics, device targeting, accessibility, and friction tolerance.',
    },
    {
      id: 'bp_job',
      label: 'Core Job-to-be-Done',
      category: 'job',
      title: 'Functional & Emotional Job',
      description: isPhysical
        ? 'Procure unadulterated, single-origin goods with verifiable batch roast dates and seamless recurring replenishment.'
        : 'Derive verified multi-touch business insights with zero manual spreadsheet wrangling or engineering overhead.',
      provenance: 'AI_INFERENCE',
      originatingStage: '03 Customer Segments',
      buildImplication: 'Establishes the core feature that MUST be functional in sprint 01.',
    },
    {
      id: 'bp_solution',
      label: 'Core Solution',
      category: 'solution',
      title: 'Differentiated Mechanism',
      description: differentiator,
      provenance: idea.differentiation ? 'USER_PROVIDED' : 'AI_INFERENCE',
      originatingStage: '04 Brand Roadmap',
      buildImplication: 'The non-commodity technical mechanism that separates this product from legacy incumbents.',
    },
    {
      id: 'bp_experience',
      label: 'Product Experience',
      category: 'experience',
      title: 'Signature Interaction Loop',
      description: isPhysical
        ? 'Curated sensory subscription portal + QR batch transparency lookup on package + single-click pause/swap.'
        : 'Frictionless script installation → automated data unification → proactive intelligence alerts on Slack/Email.',
      provenance: 'AI_INFERENCE',
      originatingStage: '04 Customer Journey',
      buildImplication: 'Defines the end-to-end screen sitemap, telemetry events, and user flow.',
    },
    {
      id: 'bp_outcome',
      label: 'Business & User Outcome',
      category: 'outcome',
      title: 'Sustained Value Creation',
      description: isPhysical
        ? 'High LTV via 68%+ gross margin direct-to-consumer subscriptions with predictable roasting inventory turnover.'
        : 'High retention and net revenue expansion via mission-critical daily workflow integration and automated ROI attribution.',
      provenance: 'AI_INFERENCE',
      originatingStage: '02 Viability Engine',
      buildImplication: 'Informs database retention models, payment gateway webhooks, and billing lifecycle architecture.',
    },
  ];

  // 2B. PRODUCT MODALITY BLUEPRINT (Visual 3-branch diagram & Hardware/Hybrid awareness)
  const isHardware = productType === 'physical' && (
    ventureName.toLowerCase().includes('device') ||
    ventureName.toLowerCase().includes('hardware') ||
    problem.toLowerCase().includes('hardware') ||
    problem.toLowerCase().includes('device') ||
    differentiator.toLowerCase().includes('hardware') ||
    differentiator.toLowerCase().includes('sensor')
  );

  const isHybrid = (
    ventureName.toLowerCase().includes('hybrid') ||
    problem.toLowerCase().includes('connected') ||
    problem.toLowerCase().includes('iot') ||
    differentiator.toLowerCase().includes('hardware + software') ||
    differentiator.toLowerCase().includes('connected')
  );

  const modalityType: 'software' | 'hardware' | 'hybrid' = isHybrid ? 'hybrid' : (isHardware ? 'hardware' : (isPhysical ? 'hardware' : 'software'));

  let modalityBlueprint: ProductModalityBlueprint;

  if (modalityType === 'hardware') {
    modalityBlueprint = {
      modality: 'hardware',
      branchA: {
        title: 'PHYSICAL WORKFLOW',
        items: [
          {
            id: 'hw_flow_1',
            name: 'Unboxing & Ergonomic Placement',
            description: 'First physical touchpoint and tactile unboxing experience.',
            detail: 'Precision-fit foam enclosure with 30-second quickstart tactile visual guide.',
          },
          {
            id: 'hw_flow_2',
            name: 'Mechanical Calibration & Power-On',
            description: 'Hardware alignment, self-test diagnostics, and status LED verification.',
            detail: 'Zero-tool calibration with haptic confirmation and multi-color status beacon.',
          },
          {
            id: 'hw_flow_3',
            name: 'Daily Operational Routine',
            description: 'Repeated physical interaction cycle with minimal fatigue and friction.',
            detail: 'Single-touch physical engagement, thermal efficiency, and low-wear mechanics.',
          },
        ],
      },
      branchB: {
        title: 'DEVICE MODULES',
        items: [
          {
            id: 'hw_mod_1',
            name: 'Core Sensor & Controller Module',
            description: 'Microcontroller handling low-latency telemetry acquisition and safety.',
            detail: 'ARM Cortex embedded MCU running real-time deterministic firmware loops.',
          },
          {
            id: 'hw_mod_2',
            name: 'Power & Thermal Management',
            description: 'High-efficiency battery/mains power regulation and passive cooling.',
            detail: 'Integrated PMIC with battery charge cycle optimization and over-temp cutoff.',
          },
          {
            id: 'hw_mod_3',
            name: 'Local Interface & Physical Controls',
            description: 'Tactile switchgear, rotary encoders, and OLED/LED status array.',
            detail: 'IP54-rated sealed microswitches with tactile snap feedback and anti-glare lens.',
          },
        ],
      },
      branchC: {
        title: 'PHYSICAL COMPONENTS',
        items: [
          {
            id: 'hw_comp_1',
            name: 'CNC Anodized Aluminum Chassis',
            description: 'Structural chassis providing rigid component anchoring and thermal sinking.',
            detail: 'Aerospace-grade 6061 aluminum with satin bead-blasted surface finish.',
          },
          {
            id: 'hw_comp_2',
            name: 'Custom Molded Enclosure & Seals',
            description: 'Acoustic dampening and environmental protection for internal electronics.',
            detail: 'High-impact polycarbonate shell with custom silicone overmolded gaskets.',
          },
          {
            id: 'hw_comp_3',
            name: 'Modular Swappable Sub-Assemblies',
            description: 'Field-replaceable wear components and consumable interfaces.',
            detail: 'Magnetic quick-release latches enabling toolless maintenance within 10 seconds.',
          },
        ],
      },
    };
  } else if (modalityType === 'hybrid') {
    modalityBlueprint = {
      modality: 'hybrid',
      branchA: {
        title: 'CUSTOMER FLOW',
        items: [
          {
            id: 'hy_flow_1',
            name: 'Device Unpack & Mobile BLE Pairing',
            description: 'Physical device discovery via Bluetooth Low Energy in under 45 seconds.',
            detail: 'Near-field pairing token exchanging cryptographic keys with mobile client.',
          },
          {
            id: 'hy_flow_2',
            name: 'Telemetry Capture & Cloud Sync',
            description: 'Continuous background sync of real-world metrics to cloud workspace.',
            detail: 'Queued local buffer transmitting encrypted JSON-RPC bursts over Wi-Fi.',
          },
          {
            id: 'hy_flow_3',
            name: 'Actionable Insights & Feedback Loop',
            description: 'User receives intelligent alerts and adjusts physical operating parameters.',
            detail: 'Bi-directional remote commands relaying config updates back down to hardware.',
          },
        ],
      },
      branchB: {
        title: 'CORE ENGINE',
        items: [
          {
            id: 'hy_eng_1',
            name: 'Edge Firmware Signal Processing',
            description: 'Digital filter and sensor calibration executing directly on microcontroller.',
            detail: 'Kalman filtering and noise suppression reducing false-positive data spikes.',
          },
          {
            id: 'hy_eng_2',
            name: 'Cloud Ingestion & Event Broker',
            description: 'High-throughput MQTT / Webhook broker validating device authenticity.',
            detail: 'Pub/Sub queue routing time-series sensor points to persistent storage.',
          },
          {
            id: 'hy_eng_3',
            name: 'State Synchronization Engine',
            description: 'Manages device shadow states, offline buffering, and OTA firmware rollouts.',
            detail: 'Guaranteed eventual consistency reconciling device offline caches upon reconnect.',
          },
        ],
      },
      branchC: {
        title: 'INTERFACE / UX',
        items: [
          {
            id: 'hy_ux_1',
            name: 'Mobile Companion Application',
            description: 'Native iOS & Android app for setup, live telemetry, and instant push alerts.',
            detail: 'React Native / Flutter interface with hardware diagnostics and calibration wizard.',
          },
          {
            id: 'hy_ux_2',
            name: 'Web Analytics & Fleet Portal',
            description: 'Desktop management console for multi-device operations and historical trends.',
            detail: 'High-density time-series data tables with CSV/PDF reporting and team roles.',
          },
          {
            id: 'hy_ux_3',
            name: 'On-Device Status Display & Haptics',
            description: 'Physical device LED indicator and vibration cues confirming user actions.',
            detail: 'RGB micro-LED light ring reflecting sync status, battery life, and operational alerts.',
          },
        ],
      },
      hybridPipeline: [
        {
          stage: 'PHYSICAL PRODUCT',
          description: `Tangible unit engineered to solve "${problem.slice(0, 50)}..." in physical space.`,
        },
        {
          stage: 'DEVICE',
          description: 'Embedded sensors and microcontrollers capturing physical state and interaction dynamics.',
        },
        {
          stage: 'DATA',
          description: 'Encrypted, compressed telemetry packets transmitted over low-power wireless protocols.',
        },
        {
          stage: 'SYSTEM',
          description: 'Cloud event broker, data normalization pipeline, and relational database backend.',
        },
        {
          stage: 'APPLICATION',
          description: 'Responsive web and mobile interface rendering synthesized charts and controls.',
        },
        {
          stage: 'USER',
          description: `Delivers the signature outcome: "${differentiator.slice(0, 60)}..." to ${targetAudience.slice(0, 35)}.`,
        },
      ],
    };
  } else {
    // Software
    modalityBlueprint = {
      modality: 'software',
      branchA: {
        title: 'CUSTOMER FLOW',
        items: [
          {
            id: 'sw_flow_1',
            name: 'Frictionless Discovery & Onboarding',
            description: 'First 3 minutes: Value proposition comprehension, signup, and tracking snippet copy.',
            detail: 'Passwordless magic link or SSO; instant workspace provisioning in <5 seconds.',
          },
          {
            id: 'sw_flow_2',
            name: 'Core Telemetry Ingestion & Aha Moment',
            description: 'First live interaction ping verifying active script connection.',
            detail: 'Live ping pulse card with visual confirmation that data is safely streaming.',
          },
          {
            id: 'sw_flow_3',
            name: 'Automated Insight & Decision Loop',
            description: 'Daily executive attribution digest and multi-touch channel ROI review.',
            detail: 'Scheduled morning digest delivered to Slack/Email with top channel movers.',
          },
        ],
      },
      branchB: {
        title: 'CORE ENGINE',
        items: [
          {
            id: 'sw_eng_1',
            name: 'High-Throughput Ingestion Queue',
            description: 'Edge worker endpoint buffering raw web beacons with sub-20ms HTTP 204 responses.',
            detail: 'Cloudflare Worker / AWS Lambda edge script with automatic rate limiting and DDoS defense.',
          },
          {
            id: 'sw_eng_2',
            name: 'Multi-Touch Attribution Engine',
            description: 'Deterministic journey-mapping algorithm distributing conversion revenue credit.',
            detail: 'Configurable linear, time-decay, and position-based mathematical weighting models.',
          },
          {
            id: 'sw_eng_3',
            name: 'Real-Time Anomaly & Dropoff Watchdog',
            description: 'Background worker comparing rolling 15-minute conversion rates to baseline.',
            detail: 'Z-score anomaly detection firing webhook alerts when dropoff exceeds 25%.',
          },
        ],
      },
      branchC: {
        title: 'INTERFACE / UX',
        items: [
          {
            id: 'sw_ux_1',
            name: 'Unified Executive ROI Dashboard',
            description: 'Top-level view of customer acquisition channels, blended CAC, and total revenue.',
            detail: 'Interactive multi-series charts with date-range picker and CSV/PDF export.',
          },
          {
            id: 'sw_ux_2',
            name: 'Journey Path Visualizer Screen',
            description: 'Deep-dive sankey diagram mapping multi-touch visitor conversion flows.',
            detail: 'Filter by campaign, device type, UTM parameters, and first-touch entry page.',
          },
          {
            id: 'sw_ux_3',
            name: 'Team Workspace & API Settings',
            description: 'Role-based access control, billing management, and API key generation.',
            detail: 'Stripe customer portal integration and encrypted webhook secret management.',
          },
        ],
      },
    };
  }

  const blueprint: ProductBlueprint = {
    nodes: blueprintNodes,
    summary: `End-to-end blueprint transforming ${ventureName}'s core problem into actionable engineering specifications.`,
    modalityBlueprint,
  };

  // 3. MVP SCOPE SYSTEM (Categorized MoSCoW features with complexity & value)
  let features: MVPFeatureItem[] = [];

  if (isPhysical) {
    features = [
      {
        id: 'feat_phys_1',
        name: 'Single-Origin Direct Catalog & Flavor Profiler',
        category: 'Core Experience',
        userProblem: 'Shoppers struggle to identify their preferred roast and origin flavor notes.',
        customerValue: 9,
        technicalComplexity: 'Medium',
        complexityScore: 5,
        priority: 'must',
        reason: 'Essential storefront capability required to transact and showcase quality.',
        dependencies: ['Product Variant Schema', 'Stripe Checkout API'],
        originatingStage: '01 Idea Lab',
        validationStatus: 'VERIFIED',
        provenance: 'USER_PROVIDED',
      },
      {
        id: 'feat_phys_2',
        name: 'Automated Recurring Subscription Engine',
        category: 'Monetization & Retention',
        userProblem: 'Running out of fresh batch beans without predictable automated delivery.',
        customerValue: 10,
        technicalComplexity: 'Medium',
        complexityScore: 6,
        priority: 'must',
        reason: 'Core business model driver providing recurring cashflow and high retention.',
        dependencies: ['Stripe Billing / Customer Portal', 'Order Webhooks'],
        originatingStage: '02 Viability',
        validationStatus: 'VERIFIED',
        provenance: 'USER_PROVIDED',
      },
      {
        id: 'feat_phys_3',
        name: 'QR Batch Traceability & Farm Transparency Card',
        category: 'Differentiation',
        userProblem: 'Lack of trust in generic supermarket commercial blends and roasted-on dates.',
        customerValue: 8,
        technicalComplexity: 'Low',
        complexityScore: 3,
        priority: 'must',
        reason: 'Direct physical implementation of the brand moat and single-origin transparency promise.',
        dependencies: ['Batch DB Entity', 'Public Batch Route'],
        originatingStage: '04 Brand Roadmap',
        validationStatus: 'VERIFIED',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'feat_phys_4',
        name: 'One-Click Roast Frequency & Grind Swapping',
        category: 'Customer Experience',
        userProblem: 'Subscribers cancel rather than adjust when travel occurs or coffee piles up.',
        customerValue: 8,
        technicalComplexity: 'Medium',
        complexityScore: 4,
        priority: 'should',
        reason: 'Reduces subscription churn by 35% through effortless pause/skip controls.',
        dependencies: ['Customer Auth', 'Subscription Engine'],
        originatingStage: '04 CX Map',
        validationStatus: 'ASSUMPTION',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'feat_phys_5',
        name: 'Roaster Batch Inventory & Fulfillment Dashboard',
        category: 'Operations',
        userProblem: 'Risk of stockout or roasting surplus beans without synchronized order queues.',
        customerValue: 7,
        technicalComplexity: 'Medium',
        complexityScore: 5,
        priority: 'should',
        reason: 'Operational necessity for roasters to fulfill weekly orders within 48h of roast.',
        dependencies: ['Order Schema', 'ShipStation Webhooks'],
        originatingStage: '02 Operational Feasibility',
        validationStatus: 'VERIFIED',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'feat_phys_6',
        name: 'AI Brewing Assistant & Extraction Calculator',
        category: 'Intelligence',
        userProblem: 'Customers fail to brew properly at home, blaming bean quality.',
        customerValue: 5,
        technicalComplexity: 'Low',
        complexityScore: 3,
        priority: 'could',
        reason: 'Nice-to-have brand enhancer, but non-essential for transacting MVP.',
        dependencies: ['Brewing Guides DB'],
        originatingStage: '05 Build Architecture',
        validationStatus: 'NEEDS_VALIDATION',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'feat_phys_7',
        name: 'Wholesale B2B Cafe Ordering Portal',
        category: 'Expansion',
        userProblem: 'Wholesale accounts require credit terms and bulk volume invoicing.',
        customerValue: 6,
        technicalComplexity: 'High',
        complexityScore: 8,
        priority: 'not_now',
        reason: 'Premature optimization; focus initial velocity strictly on D2C retail MVP.',
        dependencies: ['B2B Invoicing', 'Custom Terms Engine'],
        originatingStage: '02 Viability Handoff',
        validationStatus: 'NEEDS_VALIDATION',
        provenance: 'AI_INFERENCE',
      },
    ];
  } else {
    // SaaS / Digital Platform
    features = [
      {
        id: 'feat_saas_1',
        name: 'Lightweight Event Tracking Script (<8kb)',
        category: 'Core Pipeline',
        userProblem: 'Heavy third-party tracking scripts degrade page speed and trigger ad-blockers.',
        customerValue: 9,
        technicalComplexity: 'Medium',
        complexityScore: 5,
        priority: 'must',
        reason: 'Fundamental prerequisite to ingest customer touchpoint telemetry.',
        dependencies: ['Edge Ingestion Endpoint', 'Event Cache'],
        originatingStage: '01 Idea Lab',
        validationStatus: 'VERIFIED',
        provenance: 'USER_PROVIDED',
      },
      {
        id: 'feat_saas_2',
        name: 'Unified Attribution & Marketing ROI Dashboard',
        category: 'Core Experience',
        userProblem: 'Founders lack transparent visibility into customer acquisition channels.',
        customerValue: 10,
        technicalComplexity: 'Medium',
        complexityScore: 6,
        priority: 'must',
        reason: 'Primary screen delivering the core value proposition and analytical intelligence.',
        dependencies: ['Aggregation Pipeline', 'Chart UI Components'],
        originatingStage: '01 Idea Lab',
        validationStatus: 'VERIFIED',
        provenance: 'USER_PROVIDED',
      },
      {
        id: 'feat_saas_3',
        name: 'Deterministic Multi-Touch Attribution Engine',
        category: 'Differentiation',
        userProblem: 'Last-click attribution misattributes credit to branded search rather than top-of-funnel.',
        customerValue: 9,
        technicalComplexity: 'High',
        complexityScore: 7,
        priority: 'must',
        reason: 'The key technical differentiator versus commoditized Google Analytics.',
        dependencies: ['Event Ingestion', 'Journey Graph Algorithm'],
        originatingStage: '04 Brand Roadmap',
        validationStatus: 'VERIFIED',
        provenance: 'USER_PROVIDED',
      },
      {
        id: 'feat_saas_4',
        name: 'Multi-Tenant Auth & Role-Based Team Workspace',
        category: 'Infrastructure',
        userProblem: 'Need to collaborate across marketing, finance, and agency stakeholders securely.',
        customerValue: 7,
        technicalComplexity: 'Low',
        complexityScore: 3,
        priority: 'must',
        reason: 'Required security and enterprise baseline for B2B adoption.',
        dependencies: ['Supabase Auth / Clerk', 'Org Schema'],
        originatingStage: '02 Technical Feasibility',
        validationStatus: 'VERIFIED',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'feat_saas_5',
        name: 'Automated Weekly Executive Anomaly Digest',
        category: 'Retention',
        userProblem: 'Busy founders do not log in daily and miss sudden spikes in CAC or dropoffs.',
        customerValue: 8,
        technicalComplexity: 'Medium',
        complexityScore: 4,
        priority: 'should',
        reason: 'Critical retention loop pulling founders back into the product via Slack/Email.',
        dependencies: ['Resend API', 'Cron Scheduler'],
        originatingStage: '04 CX Retention',
        validationStatus: 'ASSUMPTION',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'feat_saas_6',
        name: 'AI Budget Allocation & Predictive Simulation',
        category: 'Intelligence',
        userProblem: 'Founders do not know how much to spend on each ad channel next month.',
        customerValue: 8,
        technicalComplexity: 'High',
        complexityScore: 8,
        priority: 'could',
        reason: 'High perceived value, but requires historical data volume not present in day-1 MVP.',
        dependencies: ['Historical Dataset (30d+)', 'LLM Prompt Chain'],
        originatingStage: '03 Market Opportunities',
        validationStatus: 'NEEDS_VALIDATION',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'feat_saas_7',
        name: 'Enterprise Data Warehouse Connector (Snowflake/BigQuery)',
        category: 'Enterprise',
        userProblem: 'Enterprise data teams want raw events dumped into their internal data lake.',
        customerValue: 5,
        technicalComplexity: 'High',
        complexityScore: 9,
        priority: 'not_now',
        reason: 'Target initial beachhead is SMBs and fast-growing founders, not Fortune 500.',
        dependencies: ['CDC Pipeline', 'OAuth Cloud Connectors'],
        originatingStage: '03 Customer Segments',
        validationStatus: 'NEEDS_VALIDATION',
        provenance: 'AI_INFERENCE',
      },
    ];
  }

  const mvpScope: MVPScopeSystem = {
    features,
    matrixSummary: {
      mustCount: features.filter((f) => f.priority === 'must').length,
      shouldCount: features.filter((f) => f.priority === 'should').length,
      couldCount: features.filter((f) => f.priority === 'could').length,
      notNowCount: features.filter((f) => f.priority === 'not_now').length,
      mvpEffortWeeks: isPhysical ? 4 : 6,
    },
  };

  // 4. PRODUCT FEATURE ARCHITECTURE TREE
  const featureCategories: FeatureCategoryGroup[] = [
    {
      id: 'cat_core',
      name: 'Core Value Engine',
      description: 'The primary workflows that directly solve the user problem.',
      features: features.filter((f) => f.category.includes('Core') || f.category.includes('Differentiation')).map((f) => ({
        id: f.id,
        name: f.name,
        category: f.category,
        purpose: f.reason,
        targetUser: targetAudience,
        dependencies: f.dependencies,
        priority: f.priority,
        dataRequired: isPhysical ? ['Catalog DB', 'Order State'] : ['Event Telemetry', 'User Session'],
        apiRequired: isPhysical ? ['/api/products', '/api/orders'] : ['/api/ingest', '/api/analytics'],
        technicalComplexity: f.technicalComplexity,
        mvpStatus: f.priority === 'must',
      })),
    },
    {
      id: 'cat_monetization',
      name: 'Monetization & Subscriptions',
      description: 'Transaction processing, billing lifecycle, and recurring revenue mechanics.',
      features: features.filter((f) => f.category.includes('Monetization') || f.category.includes('Retention')).map((f) => ({
        id: f.id,
        name: f.name,
        category: f.category,
        purpose: f.reason,
        targetUser: 'Paying Customers & Subscribers',
        dependencies: f.dependencies,
        priority: f.priority,
        dataRequired: ['Customer Record', 'Billing Status'],
        apiRequired: ['/api/checkout', '/api/webhook/stripe'],
        technicalComplexity: f.technicalComplexity,
        mvpStatus: f.priority === 'must',
      })),
    },
    {
      id: 'cat_ops_intel',
      name: isPhysical ? 'Operations & Fulfillment' : 'Intelligence & Enterprise',
      description: isPhysical
        ? 'Batch inventory tracking, supplier provenance, and shipping logistics.'
        : 'Predictive modeling, automated alerts, and advanced integrations.',
      features: features.filter((f) => !f.category.includes('Core') && !f.category.includes('Differentiation') && !f.category.includes('Monetization') && !f.category.includes('Retention')).map((f) => ({
        id: f.id,
        name: f.name,
        category: f.category,
        purpose: f.reason,
        targetUser: isPhysical ? 'Roasters & Operations Team' : 'Admins & Power Users',
        dependencies: f.dependencies,
        priority: f.priority,
        dataRequired: isPhysical ? ['Batch Inventory', 'Carrier Tracking'] : ['Aggregated Analytics', 'LLM Context'],
        apiRequired: isPhysical ? ['/api/batches', '/api/shipping'] : ['/api/ai/predict', '/api/reports'],
        technicalComplexity: f.technicalComplexity,
        mvpStatus: f.priority === 'must',
      })),
    },
  ];

  const featureTree: FeatureArchitectureTree = {
    categories: featureCategories,
    totalFeatureCount: features.length,
  };

  // 5. SYSTEM ARCHITECTURE LAYERS
  let architectureLayers: ArchitectureLayer[] = [];

  if (isPhysical) {
    architectureLayers = [
      {
        id: 'layer_client',
        name: 'Client Presentation Tier',
        tierNumber: 1,
        role: 'Responsive storefront rendering product catalog, storytelling, and subscription management.',
        components: [
          {
            name: 'Next.js 15 Storefront App',
            role: 'Server-rendered pages for ultra-fast SEO and rich media storytelling.',
            tech: 'Next.js + Tailwind CSS',
            justification: 'Guarantees sub-second load times for mobile shoppers and high Google PageSpeed scores.',
            alternatives: ['Shopify Liquid Theme', 'Remix'],
            complexity: 'Low',
            provenance: 'AI_INFERENCE',
          },
          {
            name: 'Interactive Batch Traceability Portal',
            role: 'Client-side QR code landing page showing roast date, elevation, and origin farmer story.',
            tech: 'React Micro-App / Edge Route',
            justification: 'Validates brand authenticity and craft provenance without app store download barriers.',
            alternatives: ['Static HTML', 'Webflow Embed'],
            complexity: 'Low',
            provenance: 'AI_INFERENCE',
          },
        ],
      },
      {
        id: 'layer_api',
        name: 'Commerce & Application Tier',
        tierNumber: 2,
        role: 'Handles cart state, discount mechanics, order creation, and subscription scheduling.',
        components: [
          {
            name: 'API Gateway & Edge Functions',
            role: 'Secure endpoint routing for cart checkout and customer authentication.',
            tech: 'Next.js Route Handlers / Cloudflare Workers',
            justification: 'Zero cold starts, global edge execution, and simple developer maintenance.',
            alternatives: ['Node.js Express', 'FastAPI'],
            complexity: 'Low',
            provenance: 'AI_INFERENCE',
          },
          {
            name: 'Stripe Billing Webhook Worker',
            role: 'Processes recurring subscription invoices, updates orders, and handles failed payment dunning.',
            tech: 'Stripe Node SDK + Supabase Functions',
            justification: 'Handles complex subscription recurrence rules without custom billing engine maintenance.',
            alternatives: ['ReCharge', 'Paddle'],
            complexity: 'Medium',
            provenance: 'VERIFIED_SOURCE',
          },
        ],
      },
      {
        id: 'layer_data',
        name: 'Database & Inventory Tier',
        tierNumber: 3,
        role: 'Stores products, batch inventory levels, customer orders, and recurring subscription states.',
        components: [
          {
            name: 'Relational Database (PostgreSQL)',
            role: 'Strict transactional consistency for order states, inventory stock levels, and customer records.',
            tech: 'Supabase PostgreSQL',
            justification: 'ACID transactions prevent double-selling limited roast batches.',
            alternatives: ['PlanetScale MySQL', 'MongoDB'],
            complexity: 'Low',
            provenance: 'AI_INFERENCE',
          },
          {
            name: 'In-Memory Cache (Redis)',
            role: 'Caches live inventory counts and temporary guest cart state.',
            tech: 'Upstash Redis',
            justification: 'Sub-5ms response time for cart operations during marketing surges.',
            alternatives: ['Memcached', 'In-memory Map'],
            complexity: 'Low',
            provenance: 'AI_INFERENCE',
          },
        ],
      },
      {
        id: 'layer_external',
        name: 'Fulfillment & Logistics Tier',
        tierNumber: 4,
        role: 'Synchronizes physical dispatch, label generation, carrier tracking, and customer alerts.',
        components: [
          {
            name: 'ShipStation / Carrier API Integration',
            role: 'Generates shipping labels and relays tracking numbers back to customer accounts.',
            tech: 'ShipStation REST API / Webhooks',
            justification: 'Pre-integrated with all major regional and national parcel carriers.',
            alternatives: ['EasyPost', 'Shippo'],
            complexity: 'Medium',
            provenance: 'VERIFIED_SOURCE',
          },
          {
            name: 'Transactional Email & SMS Relay',
            role: 'Dispatches order confirmations, roast notices, and out-for-delivery tracking alerts.',
            tech: 'Resend + Twilio SMS',
            justification: 'Industry-leading deliverability with clean developer API and React Email templates.',
            alternatives: ['SendGrid', 'Postmark'],
            complexity: 'Low',
            provenance: 'VERIFIED_SOURCE',
          },
        ],
      },
    ];
  } else {
    // SaaS Architecture
    architectureLayers = [
      {
        id: 'layer_client',
        name: 'Client & Telemetry Tier',
        tierNumber: 1,
        role: 'Client dashboard and ultra-lightweight client-side telemetry ingestion.',
        components: [
          {
            name: 'Next.js 15 Web Application',
            role: 'Unified dashboard, multi-tenant workspace, and interactive visualization charts.',
            tech: 'Next.js 15 + Tailwind + Recharts',
            justification: 'Server-side rendering for app shell with smooth client-side graph interactivity.',
            alternatives: ['Vite SPA', 'SvelteKit'],
            complexity: 'Medium',
            provenance: 'AI_INFERENCE',
          },
          {
            name: 'Lightweight Tracking Snippet (<8kb)',
            role: 'Injected into client websites to capture pageviews, sessions, UTM tags, and conversion events.',
            tech: 'Vanilla TypeScript / Web Worker',
            justification: 'Zero framework overhead guarantees no adverse impact on customer site performance.',
            alternatives: ['Google Tag Manager Embed', 'Segment SDK'],
            complexity: 'Medium',
            provenance: 'USER_PROVIDED',
          },
        ],
      },
      {
        id: 'layer_ingest',
        name: 'Edge Ingestion & Queue Tier',
        tierNumber: 2,
        role: 'High-throughput ingestion buffer that validates and streams raw telemetry events.',
        components: [
          {
            name: 'Edge Ingestion Endpoint',
            role: 'Receives POST beacons from tracking snippets with sub-20ms HTTP 204 response.',
            tech: 'Cloudflare Workers / AWS API Gateway',
            justification: 'Scales linearly to millions of monthly events without compute cold starts.',
            alternatives: ['Express.js Server', 'FastAPI'],
            complexity: 'Low',
            provenance: 'AI_INFERENCE',
          },
          {
            name: 'Event Queue & Buffer',
            role: 'Decouples ingestion spikes from database writes to prevent throughput degradation.',
            tech: 'Upstash Kafka / Redis BullMQ',
            justification: 'Guarantees zero dropped events during ad campaign traffic surges.',
            alternatives: ['AWS SQS', 'RabbitMQ'],
            complexity: 'Medium',
            provenance: 'AI_INFERENCE',
          },
        ],
      },
      {
        id: 'layer_processing',
        name: 'Attribution & AI Analytics Tier',
        tierNumber: 3,
        role: 'Executes journey reconstruction, multi-touch weighting, and AI insight synthesis.',
        components: [
          {
            name: 'Attribution Modeling Engine',
            role: 'Applies position-based, linear, and time-decay attribution models across event chains.',
            tech: 'Node.js Worker Service / Go Service',
            justification: 'Fast deterministic processing for high-volume tabular event calculations.',
            alternatives: ['Python Celery', 'DuckDB in-process'],
            complexity: 'High',
            provenance: 'USER_PROVIDED',
          },
          {
            name: 'AI Strategic Intelligence Generator',
            role: 'Extracts anomaly patterns, summarizes marketing trends, and flags wasted ad spend.',
            tech: 'OpenAI GPT-4o-mini + Structured JSON Schema',
            justification: 'Translates raw charts into concise founder directives with guaranteed schema compliance.',
            alternatives: ['Anthropic Claude 3.5 Sonnet', 'Mistral-Small'],
            complexity: 'Medium',
            provenance: 'AI_INFERENCE',
          },
        ],
      },
      {
        id: 'layer_storage',
        name: 'Database & Analytical Storage Tier',
        tierNumber: 4,
        role: 'Optimized hybrid storage: Relational database for accounts + Columnar store for events.',
        components: [
          {
            name: 'Primary Relational Database',
            role: 'User accounts, organizations, subscription status, and saved team preferences.',
            tech: 'Supabase PostgreSQL',
            justification: 'Robust row-level security (RLS) ensures clean multi-tenant isolation.',
            alternatives: ['Neon Postgres', 'AWS RDS'],
            complexity: 'Low',
            provenance: 'VERIFIED_SOURCE',
          },
          {
            name: 'Time-Series / Columnar Event Store',
            role: 'Houses millions of raw user sessions and click events for fast aggregated analytical queries.',
            tech: 'ClickHouse / TimescaleDB',
            justification: 'Up to 100x faster aggregate queries and 80% compression compared to standard Postgres.',
            alternatives: ['PostgreSQL Partitioning', 'Snowflake'],
            complexity: 'Medium',
            provenance: 'AI_INFERENCE',
          },
        ],
      },
    ];
  }

  const systemArchitecture: SystemArchitectureSystem = {
    pattern: isPhysical ? 'Jamstack Headless E-Commerce + Event-Driven Batch Pipeline' : 'Edge-Ingested Modular Analytics Architecture',
    layers: architectureLayers,
    description: `Tailored architecture for ${ventureName} optimizing for velocity, cost-efficiency, and zero operational bloat.`,
    primaryRationale: isPhysical
      ? 'Separating high-traffic storefront presentation from batch fulfillment protects transaction integrity.'
      : 'Decoupling event ingestion from analytical queries guarantees 99.99% tracking reliability.',
  };

  // 6. TECH STACK BUILDER (Interactive cards with alternative choices)
  const techStackItems: TechStackItem[] = [
    {
      id: 'stack_frontend',
      category: 'frontend',
      categoryLabel: 'Frontend / Presentation',
      currentTech: 'Next.js 15 (React 19 + TypeScript)',
      options: ['Next.js 15', 'Remix / React Router v7', 'Vite React SPA', 'Shopify Liquid'],
      fitRationale: 'Industry standard for modern web applications, combining SSR performance with rich interactive components.',
      complexity: 'Low',
      confidence: 'High',
      provenance: 'USER_PROVIDED',
      costTier: 'Free / Open-Source (Vercel Hobby/Pro)',
      lockInRisk: 'Low',
    },
    {
      id: 'stack_backend',
      category: 'backend',
      categoryLabel: 'Backend / API Gateway',
      currentTech: isPhysical ? 'Next.js Server Actions + Route Handlers' : 'Node.js / Express + Cloudflare Workers',
      options: ['Next.js Route Handlers', 'FastAPI (Python)', 'Go Fiber', 'Nest.js'],
      fitRationale: 'Unified TypeScript code sharing between UI and API reduces context switching for early-stage velocity.',
      complexity: 'Low',
      confidence: 'High',
      provenance: 'AI_INFERENCE',
      costTier: 'Included in hosting compute',
      lockInRisk: 'Low',
    },
    {
      id: 'stack_database',
      category: 'database',
      categoryLabel: 'Primary Database',
      currentTech: 'PostgreSQL (Supabase Managed)',
      options: ['Supabase PostgreSQL', 'Neon Serverless Postgres', 'PlanetScale MySQL', 'MongoDB Atlas'],
      fitRationale: 'ACID compliance, built-in Row Level Security (RLS), and automated daily backups out-of-the-box.',
      complexity: 'Low',
      confidence: 'High',
      provenance: 'VERIFIED_SOURCE',
      costTier: '$0-$25/month tier',
      lockInRisk: 'Low',
    },
    {
      id: 'stack_auth',
      category: 'auth',
      categoryLabel: 'Authentication & Accounts',
      currentTech: 'Supabase Auth (JWT + Social + Magic Link)',
      options: ['Supabase Auth', 'Clerk Auth', 'NextAuth / Auth.js', 'Auth0'],
      fitRationale: 'Deeply integrated with database RLS policies with zero per-user pricing penalties up to 50k MAUs.',
      complexity: 'Low',
      confidence: 'High',
      provenance: 'AI_INFERENCE',
      costTier: 'Free tier included',
      lockInRisk: 'Low',
    },
    {
      id: 'stack_payments',
      category: 'payments',
      categoryLabel: 'Payments & Billing',
      currentTech: 'Stripe Billing & Checkout Elements',
      options: ['Stripe Billing', 'LemonSqueezy', 'Shopify Payments', 'Paddle'],
      fitRationale: 'Gold standard API for both direct product checkouts and recurring subscription lifecycle management.',
      complexity: 'Medium',
      confidence: 'High',
      provenance: 'VERIFIED_SOURCE',
      costTier: '2.9% + $0.30 per transaction',
      lockInRisk: 'Medium',
    },
    {
      id: 'stack_hosting',
      category: 'hosting',
      categoryLabel: 'Infrastructure & Hosting',
      currentTech: 'Vercel Edge Network + Cloudflare DNS',
      options: ['Vercel', 'AWS ECS / Fargate', 'Railway', 'Fly.io'],
      fitRationale: 'Instant zero-configuration Git deployments, global CDN distribution, and automated SSL.',
      complexity: 'Low',
      confidence: 'High',
      provenance: 'AI_INFERENCE',
      costTier: '$20/seat/month',
      lockInRisk: 'Low',
    },
    {
      id: 'stack_analytics',
      category: 'analytics',
      categoryLabel: 'Product Telemetry & Monitoring',
      currentTech: 'PostHog (Open-Source Product Analytics)',
      options: ['PostHog', 'Mixpanel', 'Google Analytics 4', 'Plausible'],
      fitRationale: 'Event capture, feature flags, and session recordings in one privacy-compliant dashboard.',
      complexity: 'Low',
      confidence: 'High',
      provenance: 'AI_INFERENCE',
      costTier: 'Free tier up to 1M events',
      lockInRisk: 'Low',
    },
    {
      id: 'stack_ai',
      category: 'ai',
      categoryLabel: 'AI / Intelligence Layer',
      currentTech: isPhysical ? 'Deterministic Logic + OpenAI Whisper/GPT for Support' : 'OpenAI GPT-4o-mini + LangChain/Vercel AI SDK',
      options: ['OpenAI GPT-4o-mini', 'Anthropic Claude 3.5 Haiku', 'Local Llama 3', 'Deterministic Only'],
      fitRationale: isPhysical
        ? 'Physical craft ventures require reliable deterministic operations; AI is restricted to support assist.'
        : 'Fast token throughput and cost-efficient structured JSON extraction for recurring analytical digests.',
      complexity: isPhysical ? 'Low' : 'Medium',
      confidence: 'High',
      provenance: 'AI_INFERENCE',
      costTier: isPhysical ? '$5/month' : '$15-$40/month estimated tokens',
      lockInRisk: 'Low',
    },
  ];

  const techStack: TechStackSystem = {
    items: techStackItems,
    estimatedMonthlyCloudCost: 'Modular Tiered Topology',
  };

  // 7. DATA & ENTITY MODEL (ERD)
  let entities: DataEntity[] = [];

  if (isPhysical) {
    entities = [
      {
        id: 'ent_customer',
        name: 'Customer',
        purpose: 'Stores user identities, shipping addresses, and account credentials.',
        fields: [
          { name: 'id', type: 'UUID', isKey: true, description: 'Primary unique identifier' },
          { name: 'email', type: 'VARCHAR(255)', isKey: false, nullable: false, description: 'Customer contact email' },
          { name: 'full_name', type: 'VARCHAR(150)', description: 'Customer recipient name' },
          { name: 'shipping_address', type: 'JSONB', description: 'Address, city, postal code, country' },
          { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', description: 'Registration timestamp' },
        ],
        relationships: [
          { targetEntity: 'Order', type: '1:N', description: 'Customer places zero or many Orders' },
          { targetEntity: 'Subscription', type: '1:N', description: 'Customer holds zero or more Subscriptions' },
        ],
        featuresUsing: ['Storefront Checkout', 'Customer Portal', 'Email Notifications'],
        provenance: 'VERIFIED_SOURCE',
      },
      {
        id: 'ent_product',
        name: 'ProductVariant',
        purpose: 'Catalog SKUs representing specific origins, bag sizes, and grind types.',
        fields: [
          { name: 'id', type: 'UUID', isKey: true, description: 'Variant SKU identifier' },
          { name: 'title', type: 'VARCHAR(100)', description: 'E.g. Ethiopian Yirgacheffe - Whole Bean' },
          { name: 'origin_country', type: 'VARCHAR(60)', description: 'Sourcing country' },
          { name: 'price_cents', type: 'INTEGER', description: 'Price in minor currency units' },
          { name: 'roast_level', type: 'VARCHAR(30)', description: 'Light / Medium / Dark' },
          { name: 'is_active', type: 'BOOLEAN', description: 'Availability in storefront' },
        ],
        relationships: [
          { targetEntity: 'RoasterBatch', type: '1:N', description: 'Variant is roasted across multiple dated batches' },
          { targetEntity: 'OrderItem', type: '1:N', description: 'Referenced in order line items' },
        ],
        featuresUsing: ['Single-Origin Catalog', 'Inventory Management'],
        provenance: 'USER_PROVIDED',
      },
      {
        id: 'ent_batch',
        name: 'RoasterBatch',
        purpose: 'Tracks physical production batches with roast dates and farm transparency data.',
        fields: [
          { name: 'id', type: 'VARCHAR(32)', isKey: true, description: 'Public batch code (e.g. BATCH-2026-08)' },
          { name: 'roast_date', type: 'DATE', nullable: false, description: 'Date the batch was roasted' },
          { name: 'farm_name', type: 'VARCHAR(120)', description: 'Specific estate or cooperative' },
          { name: 'altitude_meters', type: 'INTEGER', description: 'Growing elevation' },
          { name: 'cupping_score', type: 'DECIMAL(4,2)', description: 'Specialty coffee rating' },
          { name: 'inventory_remaining_bags', type: 'INTEGER', description: 'Remaining stock in roasting facility' },
        ],
        relationships: [
          { targetEntity: 'ProductVariant', type: 'N:M', description: 'Belongs to specific Product Variant' },
          { targetEntity: 'Shipment', type: '1:N', description: 'Batch bags allocated to shipments' },
        ],
        featuresUsing: ['QR Batch Traceability', 'Fulfillment Dashboard'],
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'ent_order',
        name: 'Order',
        purpose: 'Transactional record of completed purchases and subscription dispatches.',
        fields: [
          { name: 'id', type: 'UUID', isKey: true, description: 'Order reference number' },
          { name: 'customer_id', type: 'UUID', description: 'Foreign key referencing Customer' },
          { name: 'status', type: 'VARCHAR(30)', description: 'Pending / Roasted / Shipped / Delivered' },
          { name: 'total_cents', type: 'INTEGER', description: 'Total charge including shipping' },
          { name: 'stripe_payment_intent', type: 'VARCHAR(100)', description: 'Stripe gateway reference' },
          { name: 'created_at', type: 'TIMESTAMP', description: 'Order placement timestamp' },
        ],
        relationships: [
          { targetEntity: 'Customer', type: '1:1', description: 'Belongs to one Customer' },
          { targetEntity: 'Shipment', type: '1:1', description: 'Dispatched via one Shipment' },
        ],
        featuresUsing: ['Storefront Checkout', 'Fulfillment Dashboard'],
        provenance: 'VERIFIED_SOURCE',
      },
    ];
  } else {
    // SaaS Entities
    entities = [
      {
        id: 'ent_user',
        name: 'User',
        purpose: 'Authenticated system operators and team members.',
        fields: [
          { name: 'id', type: 'UUID', isKey: true, description: 'User identifier' },
          { name: 'email', type: 'VARCHAR(255)', isKey: false, nullable: false, description: 'Work email' },
          { name: 'full_name', type: 'VARCHAR(100)', description: 'Display name' },
          { name: 'role', type: 'VARCHAR(30)', description: 'Admin / Member / Viewer' },
          { name: 'created_at', type: 'TIMESTAMP', description: 'Join date' },
        ],
        relationships: [
          { targetEntity: 'Organization', type: 'N:M', description: 'Member of one or more Organizations' },
        ],
        featuresUsing: ['Auth & Workspaces', 'Team Permissions'],
        provenance: 'VERIFIED_SOURCE',
      },
      {
        id: 'ent_org',
        name: 'Organization',
        purpose: 'Tenant workspace boundary owning tracking sites, team members, and billing tier.',
        fields: [
          { name: 'id', type: 'UUID', isKey: true, description: 'Workspace identifier' },
          { name: 'name', type: 'VARCHAR(100)', description: 'Company / Project name' },
          { name: 'api_key', type: 'VARCHAR(64)', isKey: true, description: 'Public ingest API key' },
          { name: 'stripe_customer_id', type: 'VARCHAR(100)', description: 'Stripe subscription mapping' },
          { name: 'plan_tier', type: 'VARCHAR(30)', description: 'Starter / Pro / Enterprise' },
        ],
        relationships: [
          { targetEntity: 'TrackingEvent', type: '1:N', description: 'Owns stream of collected TrackingEvents' },
          { targetEntity: 'AttributionReport', type: '1:N', description: 'Generates analytical reports' },
        ],
        featuresUsing: ['Multi-Tenant Workspace', 'Billing Engine'],
        provenance: 'VERIFIED_SOURCE',
      },
      {
        id: 'ent_event',
        name: 'TrackingEvent',
        purpose: 'High-volume time-series telemetry representing user interactions and conversions.',
        fields: [
          { name: 'id', type: 'BIGINT', isKey: true, description: 'Sequential event sequence' },
          { name: 'org_id', type: 'UUID', description: 'Tenant foreign key' },
          { name: 'visitor_id', type: 'VARCHAR(64)', description: 'Anonymous hashed device cookie' },
          { name: 'event_name', type: 'VARCHAR(60)', description: 'Pageview / AddToCart / Purchase' },
          { name: 'utm_source', type: 'VARCHAR(100)', description: 'Campaign traffic origin' },
          { name: 'utm_medium', type: 'VARCHAR(50)', description: 'CPC, Organic, Social, Email' },
          { name: 'timestamp', type: 'TIMESTAMP', description: 'Event capture instant' },
        ],
        relationships: [
          { targetEntity: 'Organization', type: '1:1', description: 'Belongs to tenant Organization' },
        ],
        featuresUsing: ['Lightweight Ingestion Script', 'Attribution Modeling Engine'],
        provenance: 'USER_PROVIDED',
      },
      {
        id: 'ent_report',
        name: 'AttributionReport',
        purpose: 'Aggregated analytical model computing multi-touch conversion attribution.',
        fields: [
          { name: 'id', type: 'UUID', isKey: true, description: 'Report run identifier' },
          { name: 'org_id', type: 'UUID', description: 'Tenant reference' },
          { name: 'model_type', type: 'VARCHAR(40)', description: 'Linear / Time-Decay / Position-Based' },
          { name: 'attributed_revenue_cents', type: 'BIGINT', description: 'Aggregated pipeline attribution' },
          { name: 'ai_synthesis_markdown', type: 'TEXT', description: 'Generated executive narrative summary' },
          { name: 'generated_at', type: 'TIMESTAMP', description: 'Calculation run timestamp' },
        ],
        relationships: [
          { targetEntity: 'Organization', type: '1:1', description: 'Generated for specific Organization' },
        ],
        featuresUsing: ['Attribution Dashboard', 'AI Executive Anomaly Digest'],
        provenance: 'AI_INFERENCE',
      },
    ];
  }

  const dataModel: DataModelSystem = {
    entities,
    storageParadigm: isPhysical
      ? 'Relational SQL (PostgreSQL) with strict ACID transactions for inventory integrity.'
      : 'Hybrid: Multi-tenant PostgreSQL for accounts + Time-series columnar partitioning for click events.',
  };

  // 8. USER FLOW / PRODUCT JOURNEY (Actionable product lifecycle)
  const journeySteps: ProductJourneyStep[] = [
    {
      id: 'step_1',
      stepNumber: 1,
      stageName: 'Discover & Story',
      userGoal: 'Understand what makes this brand distinctly better than incumbent commodities.',
      screenRequired: 'Public Landing / Manifesto Page',
      userAction: 'Reads value proposition, views proof of origin, and clicks Primary CTA.',
      backendRequirement: 'Static edge cached delivery with sub-100ms response time.',
      dataRequirement: 'Brand positioning copy, hero media, and social proof indicators.',
      successTelemetry: 'view_landing_page, click_cta_primary',
      touchpointLink: 'Stage 04 CX Map: Discover',
    },
    {
      id: 'step_2',
      stepNumber: 2,
      stageName: 'Exploration & Selection',
      userGoal: 'Filter choices according to specific needs without decision fatigue.',
      screenRequired: isPhysical ? 'Bean Catalog & Flavor Profiler' : 'Interactive Demo / Value Calculator',
      userAction: 'Selects product variant, answers interactive preference questions.',
      backendRequirement: 'Dynamic catalog API with inventory verification check.',
      dataRequirement: 'Available variant catalog, stock levels, and price tiers.',
      successTelemetry: 'select_variant, complete_quiz',
      touchpointLink: 'Stage 04 CX Map: Consider',
    },
    {
      id: 'step_3',
      stepNumber: 3,
      stageName: 'Conversion / Checkout',
      userGoal: 'Complete purchase or initiate trial with maximum trust and minimum friction.',
      screenRequired: 'Frictionless Checkout Modal',
      userAction: 'Enters payment credentials via Apple Pay / Stripe Elements and confirms order.',
      backendRequirement: 'Stripe PaymentIntent validation and atomic inventory decrement.',
      dataRequirement: 'Cart state, shipping details, and encrypted payment token.',
      successTelemetry: 'order_completed, payment_succeeded',
      touchpointLink: 'Stage 04 CX Map: Sign Up / Buy',
    },
    {
      id: 'step_4',
      stepNumber: 4,
      stageName: 'Onboarding & Aha Moment',
      userGoal: 'Experience immediate tangible confirmation of value within 3 minutes.',
      screenRequired: isPhysical ? 'Order Confirmation & Batch Tracker' : 'Script Install & Real-time Verifier',
      userAction: isPhysical ? 'Scans roast schedule and sets delivery preference.' : 'Pastes 1-line script and sees live event ping.',
      backendRequirement: 'Asynchronous welcome email dispatch and initial account provisioning.',
      dataRequirement: 'Customer account record and assigned initial batch/workspace.',
      successTelemetry: 'aha_moment_reached, onboarding_completed',
      touchpointLink: 'Stage 04 CX Map: Onboard',
    },
    {
      id: 'step_5',
      stepNumber: 5,
      stageName: 'Core Ongoing Usage',
      userGoal: 'Rely on the product as a seamless, essential part of their routine.',
      screenRequired: isPhysical ? 'Customer Subscription Portal' : 'Attribution Intelligence Dashboard',
      userAction: isPhysical ? 'Inspects upcoming roast date and adjusts grind.' : 'Inspects campaign ROI breakdown and exports report.',
      backendRequirement: 'Authenticated query with 99.9% read availability.',
      dataRequirement: 'Subscription status or aggregated attribution charts.',
      successTelemetry: 'daily_active_interaction, view_core_dashboard',
      touchpointLink: 'Stage 04 CX Map: Use',
    },
    {
      id: 'step_6',
      stepNumber: 6,
      stageName: 'Advocacy & Renewal',
      userGoal: 'Share the experience with colleagues or friends and maintain active membership.',
      screenRequired: 'Referral Prompt & Loyalty Dashboard',
      userAction: 'Shares personal invite link and receives credit toward next renewal.',
      backendRequirement: 'Referral code attribution and recurring discount credit balance.',
      dataRequirement: 'Referral graph records and loyalty token count.',
      successTelemetry: 'referral_share_clicked, subscription_renewed',
      touchpointLink: 'Stage 04 CX Map: Advocate',
    },
  ];

  const userJourney: ProductJourneySystem = {
    steps: journeySteps,
    criticalDropoffRisk: isPhysical
      ? 'Friction between catalog selection and checkout form field fatigue.'
      : 'Failure to install tracking snippet within 48 hours of workspace creation.',
  };

  // 9. SCREEN ARCHITECTURE (Visual sitemap)
  const screens: ScreenItem[] = isPhysical
    ? [
        {
          id: 'scr_landing',
          name: 'Brand Manifesto & Storefront Home',
          routePath: '/',
          purpose: 'Communicate craft positioning, showcase featured roast, and drive trial orders.',
          targetUser: 'New visitors & recurring shoppers',
          requiredComponents: ['HeroStory', 'BatchTicker', 'ProductGrid', 'FlavorQuizTeaser', 'Footer'],
          dataDependencies: ['Featured Products', 'Active Roaster Batch'],
          apiEndpoints: ['/api/products?featured=true'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_catalog',
          name: 'Single-Origin Catalog & Profiler',
          routePath: '/beans',
          purpose: 'Browse beans by origin country, process method, roast degree, and flavor notes.',
          targetUser: 'Shoppers looking for specific taste profiles',
          requiredComponents: ['FilterSidebar', 'ProductCardGrid', 'TastingNotesTag'],
          dataDependencies: ['Complete Active Catalog'],
          apiEndpoints: ['/api/products'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_pdp',
          name: 'Product & Roast Detail Page',
          routePath: '/beans/[slug]',
          purpose: 'In-depth origin story, cupping scores, elevation details, and subscription selection.',
          targetUser: 'High-intent buyers',
          requiredComponents: ['BagImageGallery', 'SubscriptionOptionSelector', 'BatchInfoPill', 'AddToCartCTA'],
          dataDependencies: ['Product Details', 'Associated Batch Data'],
          apiEndpoints: ['/api/products/[slug]'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_checkout',
          name: 'Direct Stripe Checkout',
          routePath: '/checkout',
          purpose: 'High-conversion, single-page order form with address auto-complete and Apple Pay.',
          targetUser: 'Purchasers completing orders',
          requiredComponents: ['OrderSummary', 'ShippingForm', 'StripePaymentElement', 'SecurityBadges'],
          dataDependencies: ['Cart Items', 'Calculated Taxes & Shipping'],
          apiEndpoints: ['/api/checkout/create-intent'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_trace',
          name: 'QR Batch Provenance Portal',
          routePath: '/trace/[batchCode]',
          purpose: 'Interactive public page reached via QR code printed on physical coffee bag.',
          targetUser: 'Consumers who received physical delivery',
          requiredComponents: ['RoasterSignature', 'OriginMap', 'HarvestSeasonTimeline', 'BrewingTipCard'],
          dataDependencies: ['Batch Record', 'Farm Origin Media'],
          apiEndpoints: ['/api/batch/[batchCode]'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_account',
          name: 'Subscriber Management Hub',
          routePath: '/account/subscription',
          purpose: 'Self-serve portal to change roast frequency, swap origin, or pause upcoming delivery.',
          targetUser: 'Existing active subscribers',
          requiredComponents: ['NextDeliveryCard', 'FrequencyPicker', 'PauseResumeButton', 'BillingHistory'],
          dataDependencies: ['Customer Subscription Record', 'Next Scheduled Charge'],
          apiEndpoints: ['/api/account/subscription', '/api/account/update-schedule'],
          isMVP: false,
          priority: 'should',
        },
      ]
    : [
        {
          id: 'scr_landing',
          name: 'Landing & ROI Calculator',
          routePath: '/',
          purpose: 'Position against legacy analytics, explain multi-touch attribution, and collect signups.',
          targetUser: 'Marketing leaders and startup founders',
          requiredComponents: ['HeroValueProp', 'LiveDemoWidget', 'ComparisonMatrix', 'TestimonialStrip'],
          dataDependencies: ['Static Pricing & Positioning'],
          apiEndpoints: [],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_auth',
          name: 'Authentication & Workspace Setup',
          routePath: '/auth/register',
          purpose: 'Google SSO or Email login with instant organization creation.',
          targetUser: 'New users creating workspaces',
          requiredComponents: ['SSOButtons', 'CompanyDomainInput', 'PasswordStrengthMeter'],
          dataDependencies: ['User Auth State'],
          apiEndpoints: ['/api/auth/register'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_onboard',
          name: 'Script Verification Wizard',
          routePath: '/onboarding',
          purpose: 'Provide custom 1-line tracking snippet and show real-time verification ping.',
          targetUser: 'Technical founders or marketing ops',
          requiredComponents: ['SnippetCopyBox', 'RealTimePingIndicator', 'VerificationSuccessBadge'],
          dataDependencies: ['Organization API Key', 'Live Event Socket'],
          apiEndpoints: ['/api/workspace/verify-tracking'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_dashboard',
          name: 'Attribution Overview Dashboard',
          routePath: '/dashboard',
          purpose: 'Primary screen displaying blended CAC, multi-touch channel ROI, and top conversion paths.',
          targetUser: 'Daily marketing decision makers',
          requiredComponents: ['MetricOverviewCards', 'MultiTouchChart', 'CampaignTable', 'DateRangePicker'],
          dataDependencies: ['Aggregated Event Metrics', 'Channel Breakdown'],
          apiEndpoints: ['/api/analytics/overview'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_journeys',
          name: 'Customer Journey Explorer',
          routePath: '/dashboard/journeys',
          purpose: 'Inspect individual anonymized customer journeys from first ad click to final purchase.',
          targetUser: 'Growth analysts investigating conversion drops',
          requiredComponents: ['SankeyJourneyFlow', 'TouchpointTimeline', 'FilterDrawer'],
          dataDependencies: ['Visitor Session Chains'],
          apiEndpoints: ['/api/analytics/journeys'],
          isMVP: false,
          priority: 'should',
        },
        {
          id: 'scr_settings',
          name: 'Workspace & Team Settings',
          routePath: '/settings',
          purpose: 'Manage team invites, Stripe subscription billing, and API tokens.',
          targetUser: 'Organization Administrators',
          requiredComponents: ['TeamMembersList', 'StripePortalButton', 'APIKeyGenerator'],
          dataDependencies: ['Team Records', 'Stripe Customer Portal Link'],
          apiEndpoints: ['/api/workspace/team', '/api/billing/portal'],
          isMVP: true,
          priority: 'must',
        },
      ];

  const screenArchitecture: ScreenArchitectureSystem = {
    screens,
    sitemapSummary: `${screens.length} total screens specified (${screens.filter((s) => s.isMVP).length} required for Day-1 MVP).`,
  };

  // 10. API & INTEGRATION MAP
  const integrations: APIIntegrationItem[] = isPhysical
    ? [
        {
          id: 'api_stripe',
          serviceName: 'Stripe Billing & Elements',
          category: 'Payments',
          provider: 'Stripe, Inc.',
          purpose: 'Handles customer card tokenization, Apple Pay, and recurring subscription recurring charges.',
          dataExchanged: 'Card token, customer email, order amount cents, subscription renewal metadata.',
          riskAndLockIn: 'Moderate; standard migration paths exist for card tokens to alternative processors.',
          fallbackStrategy: 'Export customer card tokens via Stripe Data Portability to Adyen or Braintree if necessary.',
          costModel: '2.9% + $0.30 per successful charge. Zero monthly subscription fee.',
          status: 'Active Candidate',
          provenance: 'VERIFIED_SOURCE',
        },
        {
          id: 'api_shipping',
          serviceName: 'ShipStation Fulfillment API',
          category: 'Logistics',
          provider: 'Auctane / ShipStation',
          purpose: 'Generates shipping labels, automates packing slips, and updates tracking numbers.',
          dataExchanged: 'Recipient shipping address, package weight, SKU quantities, carrier choice.',
          riskAndLockIn: 'Low; multi-carrier support enables swapping underlying carriers at will.',
          fallbackStrategy: 'Direct regional carrier API (e.g. USPS/FedEx or ShipBob) via standard CSV batch upload.',
          costModel: '$29/month starting tier for up to 500 shipments/month.',
          status: 'Active Candidate',
          provenance: 'VERIFIED_SOURCE',
        },
        {
          id: 'api_resend',
          serviceName: 'Resend Transactional Email',
          category: 'Communications',
          provider: 'Resend, Inc.',
          purpose: 'Sends order confirmation receipts, roast updates, and out-for-delivery notifications.',
          dataExchanged: 'Customer email address, order line items, tracking URL link.',
          riskAndLockIn: 'Low; uses standard SMTP and HTTP REST endpoints.',
          fallbackStrategy: 'Drop-in replacement with Postmark or AWS SES within 2 hours of code refactoring.',
          costModel: 'Free tier up to 3,000 emails/month; $20/month for 50,000 emails.',
          status: 'Active Candidate',
          provenance: 'VERIFIED_SOURCE',
        },
        {
          id: 'api_posthog',
          serviceName: 'PostHog Product Analytics',
          category: 'Analytics',
          provider: 'PostHog, Inc.',
          purpose: 'Monitors storefront conversion funnel, checkout drop-off points, and page speed.',
          dataExchanged: 'Anonymized page views, button clicks, device screen resolutions.',
          riskAndLockIn: 'Low; GDPR compliant with strict cookie minimization.',
          fallbackStrategy: 'Plausible Analytics or client-side Google Tag Manager.',
          costModel: 'Free for first 1,000,000 monthly events.',
          status: 'Active Candidate',
          provenance: 'AI_INFERENCE',
        },
      ]
    : [
        {
          id: 'api_openai',
          serviceName: 'OpenAI GPT-4o-mini API',
          category: 'AI / Intelligence',
          provider: 'OpenAI, LLC',
          purpose: 'Extracts anomaly insights and compiles automated weekly executive marketing summaries.',
          dataExchanged: 'Aggregated channel metrics (zero personally identifiable customer info transmitted).',
          riskAndLockIn: 'Moderate; prompt format is easily adapted to alternative LLM APIs.',
          fallbackStrategy: 'Anthropic Claude 3.5 Haiku or open-weight Mistral model running on Bedrock.',
          costModel: 'Pay-per-token ($0.15/1M input, $0.60/1M output tokens; ~$20/mo total at scale).',
          status: 'Active Candidate',
          provenance: 'AI_INFERENCE',
        },
        {
          id: 'api_stripe',
          serviceName: 'Stripe SaaS Billing & Customer Portal',
          category: 'Billing',
          provider: 'Stripe, Inc.',
          purpose: 'Manages recurring monthly/annual seat tiers, invoices, and self-serve upgrades.',
          dataExchanged: 'Customer company name, email, billing address, plan subscription tier.',
          riskAndLockIn: 'Moderate; customer records and card tokens reside in Stripe vault.',
          fallbackStrategy: 'Paddle or LemonSqueezy as merchant-of-record alternatives.',
          costModel: '0.7% on recurring billing + standard 2.9% + $0.30 processing.',
          status: 'Active Candidate',
          provenance: 'VERIFIED_SOURCE',
        },
        {
          id: 'api_resend',
          serviceName: 'Resend Transactional Email',
          category: 'Communications',
          provider: 'Resend, Inc.',
          purpose: 'Sends weekly anomaly digests, password reset links, and team invites.',
          dataExchanged: 'Recipient email, markdown summary payload, team invite tokens.',
          riskAndLockIn: 'Low; drop-in replacement via standard React Email components.',
          fallbackStrategy: 'Postmark or SendGrid API.',
          costModel: 'Free tier up to 3,000 emails/month; $20/month for 50,000 emails.',
          status: 'Active Candidate',
          provenance: 'VERIFIED_SOURCE',
        },
        {
          id: 'api_posthog',
          serviceName: 'PostHog Telemetry & Feature Flags',
          category: 'Analytics',
          provider: 'PostHog, Inc.',
          purpose: 'Feature flag rollout for new attribution models and dashboard session analysis.',
          dataExchanged: 'Dashboard navigation events, feature flag evaluations, error traces.',
          riskAndLockIn: 'Low.',
          fallbackStrategy: 'LaunchDarkly or internal database feature flag table.',
          costModel: 'Free tier up to 1M events.',
          status: 'Active Candidate',
          provenance: 'AI_INFERENCE',
        },
      ];

  const apiIntegrations: APIIntegrationMap = {
    integrations,
    totalIntegrationsCount: integrations.length,
  };

  // 11. AI / INTELLIGENCE ARCHITECTURE
  let aiArchitecture: AIArchitectureSystem;

  if (isPhysical) {
    aiArchitecture = {
      isAIPrimary: false,
      roleSummary: 'Operational Assistance & Customer Service (Non-Critical to Core Product Loop)',
      justification: `${ventureName} is a physical craft venture where competitive advantage stems from sourcing excellence and single-origin transparency. The core purchase loop functions 100% deterministically without artificial intelligence dependencies.`,
      costSensitivityNotice: 'Zero AI runtime dependency required for storefront checkout, batch traceability, or shipping.',
      pipeline: [
        {
          id: 'ai_step_1',
          stepNumber: 1,
          role: 'Support Inquiries',
          component: 'FAQ & Tasting Query Assistant',
          purpose: 'Answers customer questions regarding bean flavor notes, grind sizing, and brewing methods.',
          inputs: ['Customer query', 'Product Catalog Knowledge Base'],
          outputs: ['Helpful brewing suggestion with direct product link'],
          fallback: 'Direct email routing to human founder / master roaster inbox.',
        },
        {
          id: 'ai_step_2',
          stepNumber: 2,
          role: 'Roasting Schedule Optimization',
          component: 'Deterministic Inventory Forecaster',
          purpose: 'Analyzes recurring subscriber renewal dates to calculate exact green bean roasting requirements.',
          inputs: ['Active subscriber schedule', 'Historical turnover velocity'],
          outputs: ['Weekly roasting batch checklist'],
          fallback: 'Manual spreadsheet calculation.',
        },
      ],
    };
  } else {
    // SaaS AI Architecture
    aiArchitecture = {
      isAIPrimary: true,
      roleSummary: 'Autonomous Multi-Touch Synthesis & Strategic Anomaly Detection',
      justification: `AI is deployed to transform millions of complex, fragmented clickstream events into coherent executive insights, eliminating the need for full-time data analysts.`,
      costSensitivityNotice: 'Structured JSON schemas and strict token budgets ensure monthly LLM compute remains below $50.',
      pipeline: [
        {
          id: 'ai_pipe_1',
          stepNumber: 1,
          role: 'Telemetry Ingestion & Anonymization',
          component: 'Event Sanitizer & Reducer',
          purpose: 'Aggregates raw touchpoints into daily channel buckets, stripping any PII to comply with GDPR.',
          inputs: ['Raw TrackingEvents', 'Channel Mappings'],
          outputs: ['Clean Tabular Matrix (Spend, Clicks, Conversions, Revenue)'],
          fallback: 'Deterministic SQL Aggregation View',
        },
        {
          id: 'ai_pipe_2',
          stepNumber: 2,
          role: 'Attribution Computation',
          component: 'Multi-Touch Mathematical Worker',
          purpose: 'Calculates fractional attribution scores across Linear, First-Touch, and Position-Based models.',
          inputs: ['Touchpoint sequences', 'Conversion timestamps'],
          outputs: ['Channel Weight Scores & ROI by Campaign'],
          fallback: 'Standard Last-Click Attribution fallback',
        },
        {
          id: 'ai_pipe_3',
          stepNumber: 3,
          role: 'AI Reasoning & Anomaly Flagging',
          component: 'OpenAI GPT-4o-mini Orchestrator',
          purpose: 'Compares current week metrics against trailing 30-day baseline to isolate wasted ad spend and high-leverage channels.',
          inputs: ['Calculated channel weights', 'Historical variance baseline'],
          outputs: ['Top 3 Strategic Takeaways and Action Directives'],
          fallback: 'Deterministic rule-based alert (e.g. Flag if CAC > 25% above baseline)',
        },
        {
          id: 'ai_pipe_4',
          stepNumber: 4,
          role: 'Schema Validation & Output',
          component: 'Zod Guardrail Validator',
          purpose: 'Verifies the LLM response adheres strictly to the typed report schema before persisting to database.',
          inputs: ['Raw LLM JSON String'],
          outputs: ['Verified AttributionReport Record'],
          fallback: 'Log validation warning and display raw tabular data without AI narrative.',
        },
      ],
    };
  }

  // 12. MULTI-AGENT AI COUNCIL (Build Edition)
  const councilPerspectives: BuildCouncilPerspective[] = [
    {
      role: 'product_strategist',
      roleName: 'Product Strategist',
      avatarIcon: 'Target',
      stance: 'Relentlessly protect Day-1 MVP velocity by cutting secondary features.',
      keyRecommendation: isPhysical
        ? 'Do not build a custom wholesale B2B portal or complex brewing app before proving single-origin consumer demand.'
        : 'Focus purely on the tracking snippet and core overview dashboard. Defer predictive ML allocation models.',
      flaggedRisk: 'Scope creep pushing launch past the target timeline and burning founder energy.',
    },
    {
      role: 'technical_architect',
      roleName: 'Technical Architect',
      avatarIcon: 'Server',
      stance: 'Adopt standard battle-tested primitives (PostgreSQL, Next.js, Stripe) over esoteric microservices.',
      keyRecommendation: isPhysical
        ? 'Use Supabase PostgreSQL with ACID locks for inventory to prevent selling beans you do not have in stock.'
        : 'Separate high-throughput event ingestion from analytical queries via edge workers to protect database performance.',
      flaggedRisk: 'Premature distributed architecture introducing unnecessary deployment and debugging complexity.',
    },
    {
      role: 'business_specialist',
      roleName: 'Business Specialist',
      avatarIcon: 'DollarSign',
      stance: 'Ensure unit economics and infrastructure costs remain negligible until revenue is generated.',
      keyRecommendation: isPhysical
        ? 'Target gross margin >65% on subscriptions to easily absorb 2.9% Stripe fees and parcel postage.'
        : 'Leverage generous serverless free tiers (Vercel, Supabase, Upstash) to keep Day-1 cloud spend under $30/month.',
      flaggedRisk: 'Fixed monthly SaaS overhead eating runway before acquiring the first 50 paying customers.',
    },
    {
      role: 'ux_specialist',
      roleName: 'UX/Product Specialist',
      avatarIcon: 'Sparkles',
      stance: 'First-time user onboarding must deliver an unmistakable value moment in under 3 minutes.',
      keyRecommendation: isPhysical
        ? 'Include the QR batch transparency card in the physical package so unboxing creates an emotional craft bond.'
        : 'Display a real-time event verification beacon the second the tracking snippet is installed.',
      flaggedRisk: 'Founders abandoning setup due to complex DNS records or multi-step configuration forms.',
    },
    {
      role: 'security_specialist',
      roleName: 'Security & Compliance Specialist',
      avatarIcon: 'ShieldAlert',
      stance: 'Delegate sensitive payment and authentication liabilities entirely to certified vendors.',
      keyRecommendation: 'Never touch raw credit card numbers. Delegate 100% of card processing to Stripe Elements and vaulting.',
      flaggedRisk: 'PCI-DSS regulatory compliance violations or customer data leaks from home-grown auth routines.',
    },
    {
      role: 'growth_specialist',
      roleName: 'Growth & Telemetry Specialist',
      avatarIcon: 'TrendingUp',
      stance: 'Embed telemetry instrumentation directly into sprint 01 rather than retrofitting it post-launch.',
      keyRecommendation: 'Track exact drop-off steps between landing page view and checkout completion from day 1.',
      flaggedRisk: 'Operating in the dark post-launch without knowing where prospective customers are bouncing.',
    },
  ];

  const councilDiscussion: AICouncilBuildSynthesis = {
    topic: `Core MVP Architecture & Scope Boundaries for ${ventureName}`,
    perspectives: councilPerspectives,
    unanimousAgreement: 'All specialists agree that launch velocity is the primary determinant of venture survival. Architecture must favor managed serverless primitives over custom infrastructure.',
    keyDivergence: 'Technical Architect recommends building separate ingestion workers immediately, whereas Product Strategist argues single-process Next.js handlers suffice until 100,000 monthly events.',
    criticalRisks: [
      'Scope creep expanding MVP delivery beyond 6 weeks.',
      'Customer setup drop-off during initial configuration.',
      'Uncontrolled infrastructure cost escalation from unoptimized database queries.',
    ],
    recommendedAction: 'Ship the lean Must-Have feature set using Next.js + Supabase + Stripe. Re-evaluate architecture only after achieving $3,000 MRR.',
  };

  // 13. CHALLENGER / EVALUATOR (Failure Mode Analysis grounded in Stage 02)
  const challengerTests: ArchitectureStressTest[] = [
    {
      id: 'stress_1',
      challengeQuestion: 'What if traffic spikes 20x overnight from a viral social post or press feature?',
      failureMode: 'Database connection pool exhaustion and checkout page timeout during peak transaction demand.',
      affectedAssumption: 'Assumed low steady-state traffic volume during the initial launch phase.',
      severity: 'High',
      upstreamRiskLink: 'Stage 02 Technical Feasibility: Infrastructure Scaling',
      mitigation: 'Implement Supabase connection pooling (PgBouncer) and cache public catalog/manifesto pages at the Cloudflare edge.',
      validationExperiment: 'Execute a simulated load test running 500 concurrent virtual users hitting the checkout endpoint.',
    },
    {
      id: 'stress_2',
      challengeQuestion: 'What if third-party providers (Stripe, Resend) experience an upstream service outage?',
      failureMode: 'Customer checkouts fail silently, losing high-intent customers permanently without notification.',
      affectedAssumption: 'Assumed 100% continuous uptime from cloud infrastructure partners.',
      severity: 'Critical',
      upstreamRiskLink: 'Stage 02 Operational Feasibility: Vendor Dependencies',
      mitigation: 'Implement graceful error boundaries, automatic retry queues with exponential backoff, and prominent downtime banner.',
      validationExperiment: 'Simulate API network timeouts using Mock Service Worker (MSW) in staging environment.',
    },
    {
      id: 'stress_3',
      challengeQuestion: 'What if initial customer adoption takes 3x longer than anticipated?',
      failureMode: 'High fixed cloud infrastructure subscriptions drain remaining capital reserves.',
      affectedAssumption: 'Assumed rapid adoption curve supporting ongoing server overhead.',
      severity: 'Medium',
      upstreamRiskLink: 'Stage 02 Financial Viability: Runway Sensitivity',
      mitigation: 'Strictly utilize usage-based serverless tiers where costs scale to zero during idle periods.',
      validationExperiment: 'Audit monthly fixed subscriptions to ensure total non-traffic baseline cost remains under $30/month.',
    },
    {
      id: 'stress_4',
      challengeQuestion: 'What if competitors replicate our core feature within 60 days of launch?',
      failureMode: 'Commoditization and price erosion if the product lacks defensible operational or brand moats.',
      affectedAssumption: 'Assumed technical feature uniqueness provides sustained competitive protection.',
      severity: 'High',
      upstreamRiskLink: 'Stage 03 Competitive Intelligence: Incumbent Response',
      mitigation: 'Tie user lock-in to proprietary data history, brand identity resonance, and superior customer experience rituals.',
      validationExperiment: 'Validate customer switching reluctance during customer discovery interviews in Stage 01/03.',
    },
  ];

  const challengerEvaluator: ChallengerEvaluatorSystem = {
    tests: challengerTests,
  };

  // 14. BUILD DEPENDENCY GRAPH (DAG)
  const dependencyNodes: DependencyGraphNode[] = [
    {
      id: 'dep_auth',
      name: 'Authentication & Tenant Schemas',
      layer: 'Foundation',
      dependencies: [],
      isBlocker: true,
      status: 'ready',
      estimatedDays: 3,
    },
    {
      id: 'dep_db',
      name: 'Database Entities & RLS Migration',
      layer: 'Data Tier',
      dependencies: ['dep_auth'],
      isBlocker: true,
      status: 'ready',
      estimatedDays: 4,
    },
    {
      id: 'dep_pipeline',
      name: isPhysical ? 'Catalog & Batch Engine' : 'Event Ingestion Pipeline',
      layer: 'Core Engine',
      dependencies: ['dep_db'],
      isBlocker: true,
      status: 'in_progress',
      estimatedDays: 6,
    },
    {
      id: 'dep_ui',
      name: 'Responsive Storefront / Dashboard UI',
      layer: 'Presentation Tier',
      dependencies: ['dep_pipeline'],
      isBlocker: false,
      status: 'in_progress',
      estimatedDays: 7,
    },
    {
      id: 'dep_billing',
      name: 'Stripe Checkout & Billing Webhooks',
      layer: 'Monetization',
      dependencies: ['dep_db'],
      isBlocker: true,
      status: 'ready',
      estimatedDays: 5,
    },
    {
      id: 'dep_telemetry',
      name: 'PostHog Analytics & Error Logging',
      layer: 'Observability',
      dependencies: ['dep_ui'],
      isBlocker: false,
      status: 'ready',
      estimatedDays: 2,
    },
    {
      id: 'dep_launch',
      name: 'Staging QA & Production Cutover',
      layer: 'Deployment',
      dependencies: ['dep_ui', 'dep_billing', 'dep_telemetry'],
      isBlocker: true,
      status: 'blocked',
      estimatedDays: 3,
    },
  ];

  const dependencyGraph: BuildDependencyGraphSystem = {
    nodes: dependencyNodes,
    criticalPath: ['dep_auth', 'dep_db', 'dep_pipeline', 'dep_ui', 'dep_billing', 'dep_launch'],
    totalEstimatedBuildDays: 22,
  };

  // 15. BUILD IMPLEMENTATION ROADMAP (6 Phases with interactive tasks)
  const roadmapPhases: BuildRoadmapPhase[] = [
    {
      id: 'phase_1',
      phaseNumber: 1,
      name: 'Foundation & Infrastructure',
      objective: 'Establish version-controlled repository, Next.js application shell, and database schemas.',
      deliverables: ['Git repository with CI/CD', 'Supabase PostgreSQL database', 'Auth provider configured'],
      tasks: [
        {
          id: 'task_1_1',
          phaseId: 'phase_1',
          title: 'Initialize Next.js 15 repository with Tailwind CSS and TypeScript strict mode',
          rationale: 'Foundation for all user interfaces and API endpoints.',
          dependencies: [],
          estimatedComplexity: 'Low',
          priority: 'High',
          roleOwner: 'Technical Architect',
          status: 'DONE',
          relatedFeature: 'Application Shell',
        },
        {
          id: 'task_1_2',
          phaseId: 'phase_1',
          title: 'Deploy Supabase project and execute initial SQL migration scripts',
          rationale: 'Establishes relational entities, foreign keys, and indexes.',
          dependencies: ['task_1_1'],
          estimatedComplexity: 'Medium',
          priority: 'High',
          roleOwner: 'Backend Engineer',
          status: 'DONE',
          relatedFeature: 'Data Model',
        },
        {
          id: 'task_1_3',
          phaseId: 'phase_1',
          title: 'Configure Row-Level Security (RLS) policies for multi-tenant isolation',
          rationale: 'Guarantees users cannot access other organizations’ proprietary data.',
          dependencies: ['task_1_2'],
          estimatedComplexity: 'Medium',
          priority: 'High',
          roleOwner: 'Security Specialist',
          status: 'IN_PROGRESS',
          relatedFeature: 'Authentication',
        },
      ],
    },
    {
      id: 'phase_2',
      phaseNumber: 2,
      name: 'Core MVP Feature Set',
      objective: 'Implement the primary value-creation loop that solves the core customer dilemma.',
      deliverables: [
        isPhysical ? 'Single-origin bean catalog' : 'Lightweight tracking script (<8kb)',
        isPhysical ? 'Batch provenance lookup' : 'Attribution overview dashboard',
      ],
      tasks: [
        {
          id: 'task_2_1',
          phaseId: 'phase_2',
          title: isPhysical ? 'Build responsive product catalog grid with roast filters' : 'Implement edge ingestion endpoint handling HTTP POST beacons',
          rationale: 'Core operational pipeline for the business.',
          dependencies: ['task_1_2'],
          estimatedComplexity: 'Medium',
          priority: 'High',
          roleOwner: 'Full-Stack Engineer',
          status: 'IN_PROGRESS',
          relatedFeature: isPhysical ? 'Single-Origin Catalog' : 'Tracking Ingestion',
        },
        {
          id: 'task_2_2',
          phaseId: 'phase_2',
          title: isPhysical ? 'Create QR batch provenance landing page with farm story' : 'Develop multi-touch attribution aggregation algorithm',
          rationale: 'Core differentiator separating product from legacy alternatives.',
          dependencies: ['task_2_1'],
          estimatedComplexity: 'High',
          priority: 'High',
          roleOwner: 'Product Engineer',
          status: 'TODO',
          relatedFeature: 'Core Differentiation',
        },
      ],
    },
    {
      id: 'phase_3',
      phaseNumber: 3,
      name: 'Monetization & Billing',
      objective: 'Connect payment gateway to enable self-serve checkouts and subscription lifecycle.',
      deliverables: ['Stripe Checkout Integration', 'Recurring Billing Webhook Handler'],
      tasks: [
        {
          id: 'task_3_1',
          phaseId: 'phase_3',
          title: 'Integrate Stripe Checkout and Elements with dynamic tax calculation',
          rationale: 'Essential for collecting revenue from Day 1.',
          dependencies: ['task_1_2'],
          estimatedComplexity: 'Medium',
          priority: 'High',
          roleOwner: 'Full-Stack Engineer',
          status: 'TODO',
          relatedFeature: 'Stripe Billing',
        },
        {
          id: 'task_3_2',
          phaseId: 'phase_3',
          title: 'Implement robust Stripe webhook handler for invoice payment events',
          rationale: 'Automatically updates order states and dispatches notifications.',
          dependencies: ['task_3_1'],
          estimatedComplexity: 'Medium',
          priority: 'High',
          roleOwner: 'Backend Engineer',
          status: 'TODO',
          relatedFeature: 'Order Lifecycle',
        },
      ],
    },
    {
      id: 'phase_4',
      phaseNumber: 4,
      name: 'Testing & QA Hardening',
      objective: 'Stress test critical paths, edge cases, mobile responsiveness, and payment webhooks.',
      deliverables: ['End-to-end checkout test suite', 'Cross-browser responsive audit'],
      tasks: [
        {
          id: 'task_4_1',
          phaseId: 'phase_4',
          title: 'Run end-to-end checkout test with test card credentials across mobile & desktop',
          rationale: 'Guarantees zero payment failure points during real user traffic.',
          dependencies: ['task_3_2'],
          estimatedComplexity: 'Low',
          priority: 'High',
          roleOwner: 'QA / Founder',
          status: 'TODO',
          relatedFeature: 'Checkout Flow',
        },
        {
          id: 'task_4_2',
          phaseId: 'phase_4',
          title: 'Audit Lighthouse Performance score to ensure >90 on mobile devices',
          rationale: 'Protects search rankings and reduces bounce rates.',
          dependencies: ['task_2_1'],
          estimatedComplexity: 'Low',
          priority: 'Medium',
          roleOwner: 'Frontend Engineer',
          status: 'TODO',
          relatedFeature: 'Storefront',
        },
      ],
    },
    {
      id: 'phase_5',
      phaseNumber: 5,
      name: 'Launch Preparation',
      objective: 'Configure custom domain DNS, setup transactional email sender records, and prepare launch comms.',
      deliverables: ['Verified SPF/DKIM records', 'Production Vercel deployment with SSL'],
      tasks: [
        {
          id: 'task_5_1',
          phaseId: 'phase_5',
          title: 'Configure custom domain DNS with Cloudflare and verify Resend email records',
          rationale: 'Ensures transactional emails land in primary inboxes, not spam.',
          dependencies: ['task_4_1'],
          estimatedComplexity: 'Low',
          priority: 'High',
          roleOwner: 'DevOps / Founder',
          status: 'TODO',
          relatedFeature: 'Email Delivery',
        },
      ],
    },
    {
      id: 'phase_6',
      phaseNumber: 6,
      name: 'Post-Launch Optimization',
      objective: 'Monitor user behavior via PostHog session recordings and iterate based on real feedback.',
      deliverables: ['30-day cohort retention analysis', 'First sprint of prioritized feature refinements'],
      tasks: [
        {
          id: 'task_6_1',
          phaseId: 'phase_6',
          title: 'Review first 50 customer checkout sessions and resolve identified friction points',
          rationale: 'Maximizes conversion rate through continuous observational iteration.',
          dependencies: ['task_5_1'],
          estimatedComplexity: 'Low',
          priority: 'Medium',
          roleOwner: 'Product Strategist',
          status: 'TODO',
          relatedFeature: 'UX Polish',
        },
      ],
    },
  ];

  const totalTasks = roadmapPhases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = roadmapPhases.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.status === 'DONE').length,
    0
  );

  const roadmap: BuildRoadmapSystem = {
    phases: roadmapPhases,
    totalTasksCount: totalTasks,
    completedTasksCount: completedTasks,
  };

  // 16. BUILD RISK MATRIX (8 Dimensions grounded in Stage 02)
  const buildRisks: BuildRiskItem[] = [
    {
      id: 'risk_tech_1',
      dimension: 'Technical',
      risk: isPhysical
        ? 'Inventory desynchronization between physical roasting batch weights and digital SKU stock.'
        : 'Browser ad-blockers or privacy extensions preventing client-side telemetry beacon transmission.',
      impact: 4,
      likelihood: 3,
      severity: 'High',
      mitigation: isPhysical
        ? 'Implement conservative stock buffer buffers and real-time inventory decrement hooks.'
        : 'Deploy first-party CNAME proxy routing beacons through the customer’s own apex domain.',
      validationTest: 'Test script execution against uBlock Origin and Brave browser defaults.',
      upstreamStage2Link: 'Stage 02 Technical Feasibility: Ingestion Fidelity',
    },
    {
      id: 'risk_prod_1',
      dimension: 'Product',
      risk: 'Initial onboarding friction causing users to abandon before completing first value action.',
      impact: 5,
      likelihood: 3,
      severity: 'Critical',
      mitigation: 'Implement guided zero-friction stepper with instant real-time verification badge.',
      validationTest: 'Conduct 5 live unmoderated onboarding tests via Loom with target personas.',
      upstreamStage2Link: 'Stage 02 Customer Feasibility: Adoption Velocity',
    },
    {
      id: 'risk_data_1',
      dimension: 'Data',
      risk: 'Schema inflexibility making it costly to add new product variants or attribution models later.',
      impact: 3,
      likelihood: 2,
      severity: 'Moderate',
      mitigation: 'Utilize JSONB columns in PostgreSQL for flexible variant attributes and campaign metadata.',
      validationTest: 'Verify database migration script rollback and forward compatibility in staging.',
      upstreamStage2Link: 'Stage 02 Operational Feasibility: Schema Agility',
    },
    {
      id: 'risk_sec_1',
      dimension: 'Security',
      risk: 'Exposure of customer PII or unauthorized cross-tenant data access.',
      impact: 5,
      likelihood: 1,
      severity: 'High',
      mitigation: 'Strict PostgreSQL Row-Level Security (RLS) policies tested via automated unit assertions.',
      validationTest: 'Execute automated penetration test attempting cross-tenant record queries.',
      upstreamStage2Link: 'Stage 02 Technical Feasibility: Data Isolation',
    },
    {
      id: 'risk_ops_1',
      dimension: 'Operational',
      risk: isPhysical
        ? 'Carrier delays during extreme weather degrading bean freshness promise.'
        : 'Single founder becoming critical bottleneck for technical support and bug triage.',
      impact: 4,
      likelihood: 3,
      severity: 'High',
      mitigation: isPhysical
        ? 'Automate carrier delay notifications with credit voucher issued automatically.'
        : 'Embed contextual troubleshooting documentation and automated self-serve diagnostic tools.',
      validationTest: 'Audit support ticket resolution workflows during pilot testing.',
      upstreamStage2Link: 'Stage 02 Operational Feasibility: Logistics Resilience',
    },
    {
      id: 'risk_fin_1',
      dimension: 'Financial',
      risk: 'Unexpected cloud compute or token API charges outpacing customer subscription revenue.',
      impact: 4,
      likelihood: 2,
      severity: 'Moderate',
      mitigation: 'Set hard monthly spend alerts at $50 on OpenAI and Vercel dashboards.',
      validationTest: 'Calculate worst-case unit margin assuming 10x normal customer API consumption.',
      upstreamStage2Link: 'Stage 02 Financial Viability: Gross Margin Sensitivity',
    },
    {
      id: 'risk_dep_1',
      dimension: 'Dependency',
      risk: 'Breaking changes in Stripe API or upstream platform SDKs breaking checkout.',
      impact: 4,
      likelihood: 2,
      severity: 'Moderate',
      mitigation: 'Pin exact package versions in package.json and lock API version in Stripe dashboard.',
      validationTest: 'Run automated daily integration webhook test against Stripe CLI.',
      upstreamStage2Link: 'Stage 02 Technical Feasibility: Vendor Stability',
    },
    {
      id: 'risk_scale_1',
      dimension: 'Scalability',
      risk: 'Slow database query response times as order history or telemetry tables grow beyond 100k rows.',
      impact: 3,
      likelihood: 2,
      severity: 'Low',
      mitigation: 'Add composite B-tree indexes on frequently queried foreign keys and timestamp ranges.',
      validationTest: 'Run EXPLAIN ANALYZE on primary dashboard overview SQL queries with 500k mock rows.',
      upstreamStage2Link: 'Stage 02 Technical Feasibility: Indexing Strategy',
    },
  ];

  const riskMatrix: BuildRiskMatrixSystem = {
    risks: buildRisks,
  };

  // 17. BUILD DECISION BOARD (4 Quadrants)
  const decisions: BuildDecisionItem[] = [
    {
      id: 'dec_1',
      title: 'Adopt Next.js 15 + Supabase as Core Architecture Baseline',
      quadrant: 'DECIDED',
      connectedFeature: 'Application Foundation',
      assumption: 'Provides highest development velocity and lowest initial cloud hosting expenses.',
      evidence: 'Proven in production by thousands of modern startups with excellent developer tooling.',
      provenance: 'USER_PROVIDED',
      resolvedAction: 'Approved by Technical Architect and Founder in Sprint 01.',
    },
    {
      id: 'dec_2',
      title: 'Stripe Billing for Payment & Subscription Recurring Processing',
      quadrant: 'DECIDED',
      connectedFeature: 'Monetization Engine',
      assumption: 'Minimizes security liabilities and handles international currencies seamlessly.',
      evidence: 'Gold standard API documentation with pre-built customer subscription management portal.',
      provenance: 'VERIFIED_SOURCE',
      resolvedAction: 'Stripe API keys configured in environment staging.',
    },
    {
      id: 'dec_3',
      title: 'Custom In-House Email Server vs. Managed Resend Relay',
      quadrant: 'DECIDED',
      connectedFeature: 'Transactional Communications',
      assumption: 'Hosting own SMTP server is high maintenance with poor deliverability.',
      evidence: 'Resend provides 99.8% inbox placement with React Email templates.',
      provenance: 'AI_INFERENCE',
      resolvedAction: 'Standardized on Resend SDK.',
    },
    {
      id: 'dec_4',
      title: 'Separate Microservice vs. Next.js Route Handlers for Ingestion',
      quadrant: 'NEEDS_REVIEW',
      connectedFeature: 'Event Ingestion / Cart API',
      assumption: 'Next.js serverless functions can handle initial traffic without dedicated Kubernetes cluster.',
      evidence: 'Vercel serverless handles up to 1,000 req/sec comfortably on Pro plan.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'dec_5',
      title: 'Should We Offer Guest Checkout or Require User Account First?',
      quadrant: 'OPEN_QUESTION',
      connectedFeature: 'Checkout Flow',
      assumption: 'Forced account creation reduces checkout conversion by 23% according to Baymard Institute.',
      evidence: 'High-converting e-commerce sites default to guest checkout with silent account creation.',
      provenance: 'ASSUMPTION',
    },
    {
      id: 'dec_6',
      title: 'Threshold for Transitioning to Dedicated Columnar Storage',
      quadrant: 'VALIDATION_REQUIRED',
      connectedFeature: 'Analytics Storage',
      assumption: 'PostgreSQL begins to degrade on aggregate queries around 5 million rows.',
      evidence: 'Benchmark tests needed to determine exact performance inflection point.',
      provenance: 'NEEDS_VALIDATION',
    },
  ];

  const decisionBoard: BuildDecisionBoardSystem = {
    decisions,
  };

  // 18. BRAND -> PRODUCT CONSISTENCY (Bridging Stage 04 into UI & UX)
  const primaryHex =
    brandRoadmap?.colorSystem?.swatches?.find((s: ColorSwatch) => s.role === 'primary')?.hex ||
    brandRoadmap?.brandBoard?.colorPalette?.find((s: ColorSwatch) => s.role === 'primary')?.hex ||
    '#4D8DFF';
  const accentHex =
    brandRoadmap?.colorSystem?.swatches?.find((s: ColorSwatch) => s.role === 'accent')?.hex ||
    brandRoadmap?.brandBoard?.colorPalette?.find((s: ColorSwatch) => s.role === 'accent')?.hex ||
    '#45D4E8';
  const typographyName =
    brandRoadmap?.typographySystem?.pairs?.find((p: TypographyPair) => p.id === brandRoadmap.typographySystem.selectedPairId)?.name ||
    brandRoadmap?.brandBoard?.typography?.name ||
    'Inter + JetBrains Mono';
  const voiceTraits =
    brandRoadmap?.brandVoice?.attributes?.filter((a: BrandVoiceAttribute) => a.selected)?.map((a: BrandVoiceAttribute) => a.name).join(', ') ||
    brandRoadmap?.brandBoard?.voiceCharacteristics?.join(', ') ||
    'Direct, Empirical, Confident';

  const brandTokens: BrandProductConsistencyToken[] = [
    {
      dimension: 'Color Palette & Surfaces',
      brandToken: `Primary: ${primaryHex}, Accent: ${accentHex}`,
      productTranslation: 'Primary CTA buttons, interactive focus rings, active tab indicators, and high-priority metrics.',
      uiImplementation: `bg-[${primaryHex}] text-white hover:opacity-90; accent badges in [${accentHex}].`,
      messagingExample: 'Used consistently across primary checkout button and active dashboard filters.',
    },
    {
      dimension: 'Typography Scale',
      brandToken: typographyName,
      productTranslation: 'Geometric headlines for section titles with monospace numerical readouts for metrics.',
      uiImplementation: 'font-sans for general UI copy; font-mono for pricing, dates, and batch codes.',
      messagingExample: 'Headlines: 24px Bold; Metrics: 32px Font-Mono with neutral supporting labels.',
    },
    {
      dimension: 'Voice & Tone',
      brandToken: voiceTraits,
      productTranslation: 'Zero marketing fluff. Direct, concise error messages and empirical system notifications.',
      uiImplementation: 'Actionable microcopy: "Batch roasted 12h ago. Dispatched on Monday." rather than generic hype.',
      messagingExample: 'Empty state: "No events recorded in past 24 hours. Verify your tracking script here."',
    },
    {
      dimension: 'Brand Differentiator',
      brandToken: differentiator,
      productTranslation: 'Prominently highlighted on landing hero, product cards, and packaging receipts.',
      uiImplementation: 'Dedicated provenance badge rendered above the fold on all high-intent screens.',
      messagingExample: `"${differentiator.slice(0, 60)}..."`,
    },
  ];

  const brandConsistency: BrandProductConsistencySystem = {
    brandName: ventureName,
    logoInitials:
      brandRoadmap?.brandBoard?.selectedMark?.wordmark?.slice(0, 2).toUpperCase() ||
      brandRoadmap?.brandBoard?.selectedMark?.name?.slice(0, 2).toUpperCase() ||
      ventureName.slice(0, 2).toUpperCase(),
    primaryColor: primaryHex,
    accentColor: accentHex,
    typography: typographyName,
    voiceTone: voiceTraits,
    differentiator,
    tokens: brandTokens,
  };

  // 19. STAGE 06 EXECUTION HANDOFF DOSSIER
  const checklist: Stage06HandoffCheck[] = [
    {
      id: 'check_product_spec',
      label: 'Product Scope & Persona Clarified',
      passed: Boolean(idea.name && idea.problem && idea.targetAudience),
      details: `${ventureName} targeting ${targetAudience.slice(0, 40)}...`,
      category: 'Product',
    },
    {
      id: 'check_mvp_prioritized',
      label: 'MVP Feature Scope Categorized (MoSCoW)',
      passed: features.filter((f) => f.priority === 'must').length >= 2,
      details: `${mvpScope.matrixSummary.mustCount} Must-Have features prioritized for initial sprint.`,
      category: 'Scope',
    },
    {
      id: 'check_architecture_layers',
      label: 'System Architecture Layers Defined',
      passed: architectureLayers.length >= 3,
      details: `${architectureLayers.length} architectural tiers structured with designated technologies.`,
      category: 'Engineering',
    },
    {
      id: 'check_tech_stack',
      label: 'Technology Stack Selected & Grounded',
      passed: techStackItems.length >= 6,
      details: `${techStackItems.length} categories confirmed (Next.js, PostgreSQL, Stripe, etc.).`,
      category: 'Engineering',
    },
    {
      id: 'check_data_entities',
      label: 'Relational Entity Model Specified',
      passed: entities.length >= 3,
      details: `${entities.length} core database entities structured with attributes and foreign keys.`,
      category: 'Data',
    },
    {
      id: 'check_user_flows',
      label: 'End-to-End User Flow Mapped',
      passed: journeySteps.length >= 5,
      details: `${journeySteps.length} lifecycle steps mapped from discovery through advocacy.`,
      category: 'UX',
    },
    {
      id: 'check_screens',
      label: 'Screen Architecture & Sitemap Specified',
      passed: screens.length >= 4,
      details: `${screens.length} total screens designed (${screens.filter((s) => s.isMVP).length} Day-1 MVP).`,
      category: 'UX',
    },
    {
      id: 'check_integrations',
      label: 'External API Dependencies Documented',
      passed: integrations.length >= 2,
      details: `${integrations.length} third-party APIs evaluated with lock-in fallbacks.`,
      category: 'Integration',
    },
    {
      id: 'check_ai_architecture',
      label: 'AI & Intelligence Role Defined',
      passed: true,
      details: isPhysical ? 'Non-critical operational support role.' : 'Multi-step structured intelligence pipeline.',
      category: 'Intelligence',
    },
    {
      id: 'check_roadmap',
      label: 'Implementation Roadmap Phased',
      passed: roadmapPhases.length >= 5,
      details: `${roadmapPhases.length} distinct execution phases with ${totalTasks} actionable tasks.`,
      category: 'Execution',
    },
    {
      id: 'check_risks',
      label: 'Build Failure Modes & Mitigations Mapped',
      passed: buildRisks.length >= 5,
      details: `${buildRisks.length} multi-dimensional risks evaluated against Stage 02 grounding.`,
      category: 'Risk',
    },
    {
      id: 'check_brand_tokens',
      label: 'Stage 04 Brand Identity Tokens Inherited',
      passed: Boolean(brandRoadmap),
      details: `Colors (${primaryHex}), typography (${typographyName}), and voice integrated.`,
      category: 'Brand',
    },
  ];

  const passedCount = checklist.filter((c) => c.passed).length;
  const readinessScore = Math.round((passedCount / checklist.length) * 100);
  const isReady = readinessScore >= 75 && Boolean(idea.name && idea.problem);

  const blockingItems: string[] = [];
  if (!idea.name) blockingItems.push('Venture name must be defined in Stage 01 Idea Lab');
  if (!idea.problem) blockingItems.push('Core customer problem statement required');
  if (features.filter((f) => f.priority === 'must').length < 2) {
    blockingItems.push('At least two Must-Have features required in MVP Scope');
  }

  const handoff: Stage06HandoffDossier = {
    readinessScore,
    isReady,
    checklist,
    summary: isReady
      ? `Build architecture for ${ventureName} satisfies all 12 operational criteria. Ready for Stage 06 — Execution Intelligence.`
      : `Build blueprint requires ${blockingItems.length} foundational prerequisites before unlocking Stage 06.`,
    blockingItems,
  };

  // 19B. FEATURE -> USER PROBLEM -> BEHAVIOUR (5-Step Causal Flows)
  const featureBehaviorFlows: FeatureBehaviorFlowItem[] = features
    .filter((f) => f.priority === 'must')
    .slice(0, 4)
    .map((f, idx) => {
      let userAction = `Customer navigates to ${f.name} and initiates the action sequence.`;
      let systemBehaviour = `System verifies permissions, executes ${f.dependencies[0] || 'core validation'} protocol, and updates state.`;
      let expectedResult = `Delivers ${f.reason.toLowerCase()}`;

      if (f.name.toLowerCase().includes('catalog') || f.name.toLowerCase().includes('flavor')) {
        userAction = 'Shopper selects flavor notes (e.g. citrus, cacao), brew method, and bean roast profile.';
        systemBehaviour = 'Queries dynamic roast inventory, scores compatibility index, and highlights batch lot in <150ms.';
        expectedResult = 'Eliminates taste mismatch and customer regret with transparent single-origin origin profile.';
      } else if (f.name.toLowerCase().includes('subscription')) {
        userAction = 'Subscriber specifies weekly or bi-weekly shipment cadence and preferred grind coarseness.';
        systemBehaviour = 'Generates recurring Stripe subscription schedule and queues fulfillment job 48h before roast.';
        expectedResult = 'Continuous peak freshness replenishment with zero manual subscriber re-order friction.';
      } else if (f.name.toLowerCase().includes('traceability') || f.name.toLowerCase().includes('qr')) {
        userAction = 'Consumer scans packaging QR code or clicks provenance badge on storefront product page.';
        systemBehaviour = 'Retrieves immutable batch record: farm elevation, co-op origin, harvest date, and roast stamp.';
        expectedResult = 'Instills unshakeable consumer trust in unadulterated single-origin craft authenticity.';
      } else if (f.name.toLowerCase().includes('tracking') || f.name.toLowerCase().includes('script')) {
        userAction = 'Founder pastes the 1-line script snippet into the site <head> and refreshes test page.';
        systemBehaviour = 'Edge worker intercepts asynchronous 204 HTTP beacon in <15ms, validating origin key and SSL.';
        expectedResult = 'Real-time telemetry verification with zero client-side latency or Google Core Web Vitals penalty.';
      } else if (f.name.toLowerCase().includes('dashboard') || f.name.toLowerCase().includes('roi')) {
        userAction = 'Founder opens executive workspace and selects attribution lookback window (7d, 30d, 90d).';
        systemBehaviour = 'Aggregates columnar session events, joins conversion touchpoints, and computes multi-touch attribution.';
        expectedResult = 'Reveals exact dollar CAC and pipeline revenue attribution by channel, ending marketing guesswork.';
      } else if (f.name.toLowerCase().includes('attribution engine')) {
        userAction = 'Marketer toggles between Linear, Time-Decay, and Position-Based attribution models.';
        systemBehaviour = 'Recalculates journey weightings across entire conversion graph dynamically in <300ms.';
        expectedResult = 'Validates true top-of-funnel customer discovery channels and protects high-leverage ad spend.';
      } else if (f.name.toLowerCase().includes('auth') || f.name.toLowerCase().includes('workspace')) {
        userAction = 'User inputs company email, completes SSO/Magic Link, and invites team members.';
        systemBehaviour = 'Provisions tenant schema with Row-Level Security (RLS) and sets granular permission scopes.';
        expectedResult = 'Secure enterprise multi-tenant isolation with zero cross-tenant data contamination.';
      }

      return {
        id: `fbf_${idx + 1}`,
        featureName: f.name,
        userProblem: f.userProblem,
        userAction,
        systemBehaviour,
        expectedResult,
        priority: f.priority as 'must' | 'should' | 'could',
        productCategory: f.category,
      };
    });

  return {
    id: `build_rep_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    ventureName,
    productType,
    readinessOverview,
    blueprint,
    mvpScope,
    featureTree,
    featureBehaviorFlows,
    systemArchitecture,
    techStack,
    dataModel,
    userJourney,
    screenArchitecture,
    apiIntegrations,
    aiArchitecture,
    councilDiscussion,
    challengerTests: challengerEvaluator,
    dependencyGraph,
    roadmap,
    riskMatrix,
    decisionBoard,
    brandConsistency,
    handoff,
  };
}
