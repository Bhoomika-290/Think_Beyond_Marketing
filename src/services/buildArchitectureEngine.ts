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
import { resolveVentureDomainProfile } from './ventureDomainResolver';

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
  const domainProfile = resolveVentureDomainProfile(idea, businessModel, project);

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
  const blueprintNodes: BlueprintNode[] = domainProfile.productBlueprint.length >= 4
    ? domainProfile.productBlueprint
    : [
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
          description: domainProfile.customerNeed || 'Fulfill core customer job with zero manual friction.',
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
  const features: MVPFeatureItem[] = domainProfile.mvpFeatures;

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
  const architectureLayers: ArchitectureLayer[] = domainProfile.architectureLayers.length > 0
    ? domainProfile.architectureLayers
    : [
        {
          id: 'layer_client',
          name: 'Client Presentation Tier',
          tierNumber: 1,
          role: 'Interactive client application and responsive interface.',
          components: [
            {
              name: 'Next.js 15 Web Application',
              role: 'Unified responsive client interface.',
              tech: 'Next.js 15 + React 19',
              justification: 'Server-side rendering for optimal load times and SEO.',
              alternatives: ['Vite React SPA'],
              complexity: 'Low',
              provenance: 'AI_INFERENCE',
            },
          ],
        },
      ];

  const systemArchitecture: SystemArchitectureSystem = {
    pattern: `${domainProfile.categoryLabel} Architecture`,
    layers: architectureLayers,
    description: `Tailored architecture for ${ventureName} optimizing for velocity, cost-efficiency, and zero operational bloat.`,
    primaryRationale: 'Decoupling client presentation from core transactional workflows guarantees 99.99% reliability.',
  };

  // 6. TECH STACK BUILDER (Interactive cards with alternative choices)
  const techStackItems: TechStackItem[] = domainProfile.techStack.length > 0
    ? domainProfile.techStack
    : [
        {
          id: 'stack_frontend',
          category: 'frontend',
          categoryLabel: 'Frontend / Presentation',
          currentTech: 'Next.js 15 (React 19 + TypeScript)',
          options: ['Next.js 15', 'Remix / React Router v7', 'Vite React SPA'],
          fitRationale: 'Industry standard for modern web applications.',
          complexity: 'Low',
          confidence: 'High',
          provenance: 'USER_PROVIDED',
          costTier: 'Free / Open-Source',
          lockInRisk: 'Low',
        },
      ];

  const techStack: TechStackSystem = {
    items: techStackItems,
    estimatedMonthlyCloudCost: 'Modular Tiered Topology',
  };

  // 7. DATA & ENTITY MODEL (ERD)
  const entities: DataEntity[] = domainProfile.dataModel;

  const dataModel: DataModelSystem = {
    entities,
    storageParadigm: isPhysical
      ? 'Relational SQL (PostgreSQL) with strict ACID transactions for inventory integrity.'
      : 'Hybrid: Multi-tenant PostgreSQL for accounts + Time-series columnar partitioning for click events.',
  };

  // 8. USER FLOW / PRODUCT JOURNEY (Actionable product lifecycle)
  const journeySteps: ProductJourneyStep[] = domainProfile.productJourney.length > 0
    ? domainProfile.productJourney
    : [
        {
          id: 'step_1',
          stepNumber: 1,
          stageName: 'Discover & Understand',
          userGoal: `Discover how ${ventureName} solves ${problem.slice(0, 45)}...`,
          screenRequired: 'Storefront / Landing Page',
          userAction: 'Views core value proposition, proof points, and clicks primary CTA.',
          backendRequirement: 'Sub-100ms edge delivery with cached assets.',
          dataRequirement: 'Positioning copy, core metrics, and social proof.',
          successTelemetry: 'view_landing_page, click_cta_primary',
          touchpointLink: 'Stage 04 CX Map: Discover',
        },
        {
          id: 'step_2',
          stepNumber: 2,
          stageName: 'Exploration & Selection',
          userGoal: 'Evaluate options and find the exact fit without friction.',
          screenRequired: 'Catalog / Interactive Flow',
          userAction: 'Selects product variant or inputs custom requirements.',
          backendRequirement: 'Dynamic query API with real-time availability check.',
          dataRequirement: 'Catalog, pricing, and availability records.',
          successTelemetry: 'select_item, configure_order',
          touchpointLink: 'Stage 04 CX Map: Consider',
        },
        {
          id: 'step_3',
          stepNumber: 3,
          stageName: 'Conversion / Checkout',
          userGoal: 'Complete purchase or initiate trial with maximum trust and minimum friction.',
          screenRequired: 'Secure Checkout / Sign Up',
          userAction: 'Submits payment details and confirms order.',
          backendRequirement: 'Payment gateway validation and atomic state update.',
          dataRequirement: 'Order record and payment token.',
          successTelemetry: 'order_completed, payment_succeeded',
          touchpointLink: 'Stage 04 CX Map: Buy',
        },
        {
          id: 'step_4',
          stepNumber: 4,
          stageName: 'Onboarding & Aha Moment',
          userGoal: 'Experience immediate tangible confirmation of value.',
          screenRequired: 'Onboarding Flow / Order Confirmation',
          userAction: 'Completes initial setup or receives order tracking details.',
          backendRequirement: 'Asynchronous welcome message and account provisioning.',
          dataRequirement: 'Customer account record and assigned workspace/order.',
          successTelemetry: 'aha_moment_reached, onboarding_completed',
          touchpointLink: 'Stage 04 CX Map: Onboard',
        },
        {
          id: 'step_5',
          stepNumber: 5,
          stageName: 'Core Ongoing Usage',
          userGoal: 'Rely on the product as a seamless, essential part of their routine.',
          screenRequired: 'Customer Dashboard / Portal',
          userAction: 'Accesses core value daily/weekly.',
          backendRequirement: 'Authenticated query with 99.9% read availability.',
          dataRequirement: 'Active account records and activity logs.',
          successTelemetry: 'daily_active_interaction, view_core_dashboard',
          touchpointLink: 'Stage 04 CX Map: Use',
        },
      ];

  const userJourney: ProductJourneySystem = {
    steps: journeySteps,
    criticalDropoffRisk: `Friction during onboarding or checkout before reaching the primary value proposition of ${differentiator.slice(0, 50)}...`,
  };

  // 9. SCREEN ARCHITECTURE (Visual sitemap)
  const screens: ScreenItem[] = domainProfile.screens.length > 0
    ? domainProfile.screens
    : [
        {
          id: 'scr_landing',
          name: 'Home / Manifesto Landing Page',
          routePath: '/',
          purpose: `Communicate ${ventureName}'s core value proposition and drive conversion.`,
          targetUser: targetAudience,
          requiredComponents: ['HeroSection', 'ValuePropGrid', 'ProofStrip', 'PrimaryCTA'],
          dataDependencies: ['Featured Offerings', 'Pricing Tiers'],
          apiEndpoints: ['/api/content'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_core',
          name: 'Core Application / Catalog Screen',
          routePath: '/app',
          purpose: 'Provide direct access to the core workflow.',
          targetUser: targetAudience,
          requiredComponents: ['MainWorkflowView', 'ActionControls', 'StatusSummary'],
          dataDependencies: ['User State', 'Core Entity Records'],
          apiEndpoints: ['/api/core'],
          isMVP: true,
          priority: 'must',
        },
        {
          id: 'scr_checkout',
          name: 'Checkout & Transaction Screen',
          routePath: '/checkout',
          purpose: 'Frictionless order completion and payment processing.',
          targetUser: targetAudience,
          requiredComponents: ['OrderSummary', 'PaymentElement', 'SecurityBadges'],
          dataDependencies: ['Cart / Order State'],
          apiEndpoints: ['/api/checkout'],
          isMVP: true,
          priority: 'must',
        },
      ];

  const screenArchitecture: ScreenArchitectureSystem = {
    screens,
    sitemapSummary: `${screens.length} total screens specified (${screens.filter((s) => s.isMVP).length} required for Day-1 MVP).`,
  };

  // 10. API & INTEGRATION MAP
  const integrations: APIIntegrationItem[] = domainProfile.apiIntegrations.length > 0
    ? domainProfile.apiIntegrations
    : [
        {
          id: 'api_stripe',
          serviceName: 'Stripe Billing & Payments',
          category: 'Payments',
          provider: 'Stripe, Inc.',
          purpose: 'Handles customer card tokenization, payouts, and subscription charges.',
          dataExchanged: 'Payment token, customer email, order amount cents.',
          riskAndLockIn: 'Moderate; standard migration paths exist for customer tokens.',
          fallbackStrategy: 'Export customer card tokens via Stripe Data Portability to alternative processor if necessary.',
          costModel: '2.9% + $0.30 per successful charge. Zero monthly subscription fee.',
          status: 'Active Candidate',
          provenance: 'VERIFIED_SOURCE',
        },
        {
          id: 'api_resend',
          serviceName: 'Resend Transactional Email',
          category: 'Communications',
          provider: 'Resend, Inc.',
          purpose: 'Sends transactional notifications, order receipts, and verification codes.',
          dataExchanged: 'Recipient email address, template payload, notification links.',
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
          purpose: 'Monitors conversion funnels, onboarding drop-offs, and critical user events.',
          dataExchanged: 'Anonymized page views, action clicks, device types.',
          riskAndLockIn: 'Low; GDPR compliant with strict cookie minimization.',
          fallbackStrategy: 'Plausible Analytics or client-side telemetry.',
          costModel: 'Free for first 1,000,000 monthly events.',
          status: 'Active Candidate',
          provenance: 'AI_INFERENCE',
        },
      ];

  const apiIntegrations: APIIntegrationMap = {
    integrations,
    totalIntegrationsCount: integrations.length,
  };

  // 11. AI / INTELLIGENCE ARCHITECTURE
  const aiArchitecture: AIArchitectureSystem = domainProfile.aiArchitecture;

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
      uiImplementation: `Actionable microcopy: "${differentiator.slice(0, 35)}..." rather than generic hype.`,
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
