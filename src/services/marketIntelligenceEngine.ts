import type {
  ProjectState,
  MarketIntelligenceReport,
  CompetitorItem,
  PositioningAxis,
  MarketOpportunityGap,
  CustomerSegment,
  DifferentiatorEngineData,
  MarketSizeFramework,
  MarketTrendSignal,
  MarketRiskItem,
  MarketEvidenceItem,
  AICouncilSynthesis,
  SpecialistPerspective,
  MarketIntelligenceBrief,
  SignalLevel,
} from '../types/project';
import { resolveVentureDomainProfile } from './ventureDomainResolver';

export function generateMarketIntelligenceReport(
  state: ProjectState,
  customCompetitors: CompetitorItem[] = [],
  customAxes?: { xAxis: PositioningAxis; yAxis: PositioningAxis }
): MarketIntelligenceReport {
  const { idea, businessModel, project } = state;
  const ventureName = idea.name || project.name || 'Untitled Venture';
  const productType = businessModel.productType || 'other';
  const customerType = businessModel.customerType || 'b2c';
  const problem = idea.problem || idea.rawInput || 'Target problem pending specification';
  const targetAudience = idea.targetAudience || 'Core target audience profile';
  const differentiation = idea.differentiation || 'Key brand differentiator';
  const location = businessModel.location;
  const locationStr = [location.cityRegion, location.country].filter(Boolean).join(', ') || 'Global / Unspecified';
  const lowerIdea = `${idea.rawInput || ''} ${idea.problem || ''} ${idea.targetAudience || ''} ${idea.differentiation || ''} ${project.name || ''}`.toLowerCase();

  const fullText = `${idea.name} ${idea.problem} ${idea.rawInput} ${idea.targetAudience} ${idea.differentiation} ${location.cityRegion} ${location.country}`.toLowerCase();
  const isApparel = fullText.includes('cloth') || fullText.includes('apparel') || fullText.includes('winter') || fullText.includes('wool') || fullText.includes('garment') || fullText.includes('fashion') || fullText.includes('fabric');
  const isCoffee = fullText.includes('coffee') || fullText.includes('roast') || fullText.includes('bean') || fullText.includes('brew');

  // 1. Available Positioning Axes based on business category & user needs
  const availableAxes: PositioningAxis[] = [
    {
      id: 'price_value',
      label: 'Price & Value Positioning',
      minLabel: 'Budget / Commodity Mass-Market',
      maxLabel: 'Premium / High-Touch Specialization',
      categoryTag: 'Commercial',
    },
    {
      id: 'convenience',
      label: 'Convenience & Onboarding',
      minLabel: 'High Setup / Fragmented Workarounds',
      maxLabel: 'Frictionless Instant Adoption',
      categoryTag: 'Operational',
    },
    {
      id: 'personalization',
      label: 'Personalization & Customization',
      minLabel: 'One-Size-Fits-All Generic',
      maxLabel: 'Hyper-Tailored / Adaptive Craft',
      categoryTag: 'Product',
    },
    {
      id: 'specialization',
      label: 'Domain Specialization',
      minLabel: 'Broad / Generalist Suite',
      maxLabel: 'Deep Vertical / Niche Specialist',
      categoryTag: 'Strategy',
    },
    {
      id: 'technology',
      label: 'Technology & Automation',
      minLabel: 'Manual DIY / Legacy Static Stack',
      maxLabel: 'AI-Native Automated Workflow',
      categoryTag: 'Technology',
    },
    {
      id: 'experience',
      label: 'Customer Experience & Polish',
      minLabel: 'Barebones Utility / High Friction',
      maxLabel: 'Delightful Consumer-Grade Experience',
      categoryTag: 'Brand',
    },
    {
      id: 'transparency',
      label: 'Sourcing & Operational Transparency',
      minLabel: 'Opaque Commercial Blackbox',
      maxLabel: 'Radically Transparent / Ethical',
      categoryTag: 'Brand',
    },
    {
      id: 'speed',
      label: 'Speed & Delivery Velocity',
      minLabel: 'Sluggish Turnaround / High Lag',
      maxLabel: 'Real-Time / Rapid Fulfillment',
      categoryTag: 'Execution',
    },
    {
      id: 'service_level',
      label: 'Service & Advisory Depth',
      minLabel: 'Self-Serve Autonomous / No Support',
      maxLabel: 'High-Touch Concierge / Expert Partner',
      categoryTag: 'Service',
    },
  ];

  // Resolve comprehensive domain intelligence profile
  const domainProfile = resolveVentureDomainProfile(idea, businessModel, project);

  const selectedAxes = customAxes || domainProfile.positioningAxes;

  // 2. Dynamic Competitors & Alternative Workarounds grounded in the current venture
  const competitors = customCompetitors.length > 0
    ? [...customCompetitors, ...domainProfile.competitors.filter((c) => !customCompetitors.some((cc) => cc.id === c.id))]
    : domainProfile.competitors;

  // 3. Customer Segments (Derived from Stage 01 audience & problem)
  // Prefer the central domain resolver output; fall back to the per-vertical
  // detail below when the resolver has nothing to offer.
  let customerSegments: CustomerSegment[] = domainProfile.customerSegments;
  if (customerSegments.length === 0) {
    customerSegments = [
    {
      id: 'seg_1',
      name: `Core Adopters (${targetAudience.slice(0, 32)})`,
      relativeRelevance: 92,
      painIntensity: 'High',
      coreNeed: problem.slice(0, 85) + '...',
      buyingTrigger: isApparel
        ? 'Experiencing cold-weather discomfort in synthetic fast-fashion winterwear and seeking authentic, breathable heritage warmth.'
        : isCoffee
        ? 'Tasting stale supermarket beans after setting up a premium home grinder, triggering search for peak roast freshness.'
        : productType === 'physical'
        ? 'Frustration with generic mass-market goods lacking craft durability or provenance.'
        : 'Discovering discrepancies in blended ad platform ROAS reporting, leading to immediate wasted ad spend concerns.',
      potentialFit: 'High',
      adoptionBarriers: [
        'Overcoming habituated status quo workarounds',
        'Need for verified proof before committing to purchase or subscription',
      ],
      confidence: 'High',
      provenance: state.idea.targetAudience ? 'USER_PROVIDED' : 'AI_INFERENCE',
    },
    {
      id: 'seg_2',
      name: 'Discerning Practitioners & Enthusiasts',
      relativeRelevance: 78,
      painIntensity: 'Medium',
      coreNeed: isApparel
        ? 'Transparent natural-fiber sourcing (camel wool, merino, handspun yarns), verified artisan loom provenance, and enduring fit.'
        : isCoffee
        ? 'Transparent estate sourcing, traceable lot elevations, and predictable recurring delivery schedules.'
        : productType === 'physical'
        ? 'Transparent material sourcing, traceable lot provenance, and consistent craftsmanship.'
        : 'Server-side attribution integration without managing dedicated data pipelines.',
      buyingTrigger:
        'Seeking reproducible quality benchmarks and values alignment that mass commercial vendors fail to provide.',
      potentialFit: 'High',
      adoptionBarriers: [
        'Higher willingness to scrutinize methodology and technical specs',
        'Expectation of continuous consistency across repeat orders',
      ],
      confidence: 'Medium',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'seg_3',
      name: 'Adjacent Explorers & Mainstream Upgraders',
      relativeRelevance: 54,
      painIntensity: 'Moderate',
      coreNeed: 'A welcoming, non-intimidating bridge into premium quality without technical jargon or elitism.',
      buyingTrigger: 'Word-of-mouth referral or visual social proof demonstrating an undeniable quality improvement.',
      potentialFit: 'Medium',
      adoptionBarriers: [
        'Higher price sensitivity compared to commercial commodity baseline',
        'May require education on why the premium is justified',
      ],
      confidence: 'Medium',
      provenance: 'AI_INFERENCE',
    },
  ];
  }

  // 4. Market Opportunity & Whitespace Gaps
  const opportunityGaps: MarketOpportunityGap[] = domainProfile.marketOpportunities;

  // 5. Differentiator Engine (Dynamic opportunities based on active venture)
  let diffOpportunities = [
    {
      id: 'diff_opp_1',
      differentiationArea: differentiation || 'Specialized Core Value & Transparency',
      currentCompetitiveSituation:
        'Incumbents rely on broad, one-size-fits-all architectures with high overhead and opaque processes.',
      connectedMarketGap: `Target customers (${targetAudience}) lack a purpose-built solution tailored directly to their workflow.`,
      whyThisMatters:
        'Converts operational focus into a defensible brand moat that commands premium loyalty without ad fatigue.',
      supportingEvidence:
        differentiation || `Stage 01 discovery input targeting "${problem.slice(0, 50)}..."`,
      confidence: 'High' as const,
      validationRequirement: 'Verify that target customers recognize this differentiator as a critical buying factor.',
      statusLabel: 'Potential differentiator' as const,
      provenance: 'AI_INFERENCE' as const,
    },
    {
      id: 'diff_opp_2',
      differentiationArea: 'Frictionless Time-to-Value & Velocity',
      currentCompetitiveSituation:
        'Legacy alternatives impose steep onboarding delays, complex setups, or multi-day turnaround lags.',
      connectedMarketGap:
        'Early adopters want immediate resolution to their core friction without unnecessary bloat.',
      whyThisMatters:
        'Creates an immediate "aha!" moment on first use, fueling high retention and word-of-mouth referral.',
      supportingEvidence: `Demonstrated user demand for streamlined execution in ${locationStr}.`,
      confidence: 'High' as const,
      validationRequirement: 'Validate Day-1 activation and completion rates in beta cohorts.',
      statusLabel: 'Evidence-supported gap' as const,
      provenance: 'AI_INFERENCE' as const,
    },
    {
      id: 'diff_opp_3',
      differentiationArea: 'Curated Simplicity Over Jargon Bloat',
      currentCompetitiveSituation:
        'Competitors overcomplicate offerings with enterprise bureaucracy or generic low-grade quality.',
      connectedMarketGap:
        `${targetAudience} seek a clean, dedicated partner that respects their time and budget.`,
      whyThisMatters:
        'Expands addressable reach beyond niche enthusiasts into high-LTV core customers.',
      supportingEvidence: 'Discovery flow interviews documenting frustration with legacy status-quo workarounds.',
      confidence: 'Medium' as const,
      validationRequirement: 'A/B test clear value-led messaging against traditional competitor claims.',
      statusLabel: 'Emerging opportunity' as const,
      provenance: 'AI_INFERENCE' as const,
    },
  ];

  if (lowerIdea.includes('tutor') || lowerIdea.includes('student') || lowerIdea.includes('education')) {
    diffOpportunities = [
      {
        id: 'diff_opp_1',
        differentiationArea: 'Verified Peer & Near-Peer Syllabus Matching',
        currentCompetitiveSituation: 'Mass coaching centers offer generic non-syllabus tutors at ₹1,500–₹3,000/hr.',
        connectedMarketGap: 'College students need instant help from peers who aced their exact professor\'s coursework.',
        whyThisMatters: 'Builds organic campus viral loops and peer trust that commercial agencies cannot replicate.',
        supportingEvidence: differentiation || 'Campus student discovery confirming demand for peer-led exam prep.',
        confidence: 'High',
        validationRequirement: 'Verify student willingness to book upperclassmen tutors for urgent midterm prep.',
        statusLabel: 'Potential differentiator',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_2',
        differentiationArea: 'Affordable Hourly Escrow & Transparent Pricing',
        currentCompetitiveSituation: 'Agencies lock students into multi-month packages with non-refundable retainers.',
        connectedMarketGap: 'Students on tight budgets need low-commitment, pay-as-you-go hourly tutoring.',
        whyThisMatters: 'Lowers activation barrier to zero, turning hesitant students into weekly repeat users.',
        supportingEvidence: 'Target pricing model of ₹350–₹600/hr with escrow release post-session.',
        confidence: 'High',
        validationRequirement: 'Validate escrow completion rate and tutor payout satisfaction.',
        statusLabel: 'Evidence-supported gap',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_3',
        differentiationArea: 'Instant On-Demand Classroom Launch',
        currentCompetitiveSituation: 'Traditional tutoring requires 24–48 hours advance booking and scheduling emails.',
        connectedMarketGap: 'Exam panic happens at 11 PM; students need immediate homework triage in <5 minutes.',
        whyThisMatters: 'Captures high-intent emergency demand when willingness to transact is highest.',
        supportingEvidence: 'WebRTC collaborative whiteboard prototype tested with zero setup latency.',
        confidence: 'Medium',
        validationRequirement: 'Test live tutor response time during peak exam weeks.',
        statusLabel: 'Emerging opportunity',
        provenance: 'AI_INFERENCE',
      },
    ];
  } else if (lowerIdea.includes('waste') || (lowerIdea.includes('restaurant') && lowerIdea.includes('food'))) {
    diffOpportunities = [
      {
        id: 'diff_opp_1',
        differentiationArea: '60-Second End-of-Day Predictive Prep Logging',
        currentCompetitiveSituation: 'Enterprise food inventory tools require 45 minutes of tedious barcode scanning.',
        connectedMarketGap: 'Busy kitchen staff abandon complex software during evening closing rush.',
        whyThisMatters: 'Zero-friction data entry guarantees 95%+ staff compliance and accurate forecasting.',
        supportingEvidence: differentiation || 'Kitchen workflow discovery showing demand for voice/quick-tap logging.',
        confidence: 'High',
        validationRequirement: 'Measure daily logging compliance across 10 pilot restaurant kitchens.',
        statusLabel: 'Potential differentiator',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_2',
        differentiationArea: 'Automated Demand Prediction & Dynamic Surplus Redistribution',
        currentCompetitiveSituation: 'Kitchens over-prep based on gut feel and throw away 15–20% of perishable stock.',
        connectedMarketGap: 'Independent restaurants lack AI demand forecasting synced with local events and weather.',
        whyThisMatters: 'Directly saves 8–14% in food cost, generating immediate positive net ROI in month 1.',
        supportingEvidence: 'Historical restaurant waste audits demonstrating predictable spoilage patterns.',
        confidence: 'High',
        validationRequirement: 'Validate food cost reduction percentage after 30 days of automated prep sheets.',
        statusLabel: 'Evidence-supported gap',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_3',
        differentiationArea: 'Zero-Hardware POS Webhook Integration',
        currentCompetitiveSituation: 'Legacy food waste platforms require expensive smart scales and proprietary kiosks.',
        connectedMarketGap: 'Small restaurants cannot afford ₹50,000+ upfront hardware investments.',
        whyThisMatters: 'Pure software integration with existing POS systems accelerates sales velocity.',
        supportingEvidence: 'Standardized POS webhook ingestion architecture.',
        confidence: 'Medium',
        validationRequirement: 'Test integration setup time with Petpooja, Toast, and Square POS.',
        statusLabel: 'Emerging opportunity',
        provenance: 'AI_INFERENCE',
      },
    ];
  } else if (lowerIdea.includes('repair') || lowerIdea.includes('handyman') || lowerIdea.includes('home service')) {
    diffOpportunities = [
      {
        id: 'diff_opp_1',
        differentiationArea: 'Standardized Upfront Price Cards with Escrow Protection',
        currentCompetitiveSituation: 'Contractors quote erratic prices on arrival with unexpected hidden charges.',
        connectedMarketGap: 'Homeowners experience severe anxiety around price gouging and contractor unreliability.',
        whyThisMatters: 'Establishes instant pricing transparency and eliminates homeowner payment hesitation.',
        supportingEvidence: differentiation || 'Homeowner survey showing 82% prefer fixed rate cards over on-site quotes.',
        confidence: 'High',
        validationRequirement: 'Validate technician acceptance of fixed rate card schedules.',
        statusLabel: 'Potential differentiator',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_2',
        differentiationArea: 'Background-Checked Master Technicians with 90-Day Warranty',
        currentCompetitiveSituation: 'Classified apps list unvetted freelance laborers with zero work guarantees.',
        connectedMarketGap: 'Safety and workmanship quality are the #1 barrier to booking home services.',
        whyThisMatters: 'Builds premium authority and justifies a platform commission on recurring maintenance.',
        supportingEvidence: 'Multi-point background check protocol and escrow warranty reserves.',
        confidence: 'High',
        validationRequirement: 'Monitor repeat booking rate within 6 months of initial repair.',
        statusLabel: 'Evidence-supported gap',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_3',
        differentiationArea: 'Instant Dispatch with Live GPS ETA Tracking',
        currentCompetitiveSituation: 'Traditional contractors give 4-hour arrival windows and frequently arrive late.',
        connectedMarketGap: 'Busy working homeowners need tight, predictable 30-minute arrival SLAs.',
        whyThisMatters: 'Solves emergency plumbing/electrical breakdowns with undeniable speed.',
        supportingEvidence: 'Live technician dispatch prototype with automated SMS alerts.',
        confidence: 'Medium',
        validationRequirement: 'Test arrival SLA compliance during emergency dispatch tests.',
        statusLabel: 'Emerging opportunity',
        provenance: 'AI_INFERENCE',
      },
    ];
  } else if (lowerIdea.includes('meal') || lowerIdea.includes('food delivery')) {
    diffOpportunities = [
      {
        id: 'diff_opp_1',
        differentiationArea: 'Guaranteed 12:30 PM Desk Delivery in Thermal Packaging',
        currentCompetitiveSituation: 'Standard food delivery apps suffer 45–75 min erratic delivery times during lunch rush.',
        connectedMarketGap: 'Office workers have fixed 45-minute lunch breaks and cannot wait on late delivery drivers.',
        whyThisMatters: 'Eliminates lunch anxiety and builds habitual daily office subscription routines.',
        supportingEvidence: differentiation || 'Office park delivery batching ensuring sub-10 minute building drop-offs.',
        confidence: 'High',
        validationRequirement: 'Test batch delivery SLA compliance across 5 pilot commercial office towers.',
        statusLabel: 'Potential differentiator',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_2',
        differentiationArea: 'Macro-Balanced Clean Nutrition with Zero Heavy Afternoon Slump',
        currentCompetitiveSituation: 'Restaurant takeout is oily, calorie-dense, and causes severe 2 PM energy crashes.',
        connectedMarketGap: 'Knowledge workers need clean proteins and complex carbs designed for mental stamina.',
        whyThisMatters: 'Commands daily wellness subscription loyalty and potential corporate wellness subsidies.',
        supportingEvidence: 'Chef-crafted nutritionist recipes with transparent macro breakdowns.',
        confidence: 'High',
        validationRequirement: 'Measure 30-day subscriber retention on weekly clean lunch plans.',
        statusLabel: 'Evidence-supported gap',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_3',
        differentiationArea: '1-Click Daily Skip & Flexible Desk Delivery',
        currentCompetitiveSituation: 'Traditional meal tiffin services force rigid monthly lock-ins with no cancellation.',
        connectedMarketGap: 'Hybrid workers who work from home 2 days/week need flexible daily pause controls.',
        whyThisMatters: 'Lowers subscriber churn by accommodating dynamic remote/office work schedules.',
        supportingEvidence: 'Flexible WhatsApp and web app calendar scheduling.',
        confidence: 'Medium',
        validationRequirement: 'Track churn rate among hybrid 3-day office workers.',
        statusLabel: 'Emerging opportunity',
        provenance: 'AI_INFERENCE',
      },
    ];
  }

  const differentiatorEngine: DifferentiatorEngineData = {
    dimensions: [
      {
        dimension: 'Price & Value Fairness',
        dimensionKey: 'price',
        ventureScore: 78,
        incumbentAvgScore: 42,
        status: 'Potential Differentiator',
      },
      {
        dimension: 'Convenience & Setup Ease',
        dimensionKey: 'convenience',
        ventureScore: 88,
        incumbentAvgScore: 50,
        status: 'Emerging Opportunity',
      },
      {
        dimension: 'Personalization & Fit',
        dimensionKey: 'personalization',
        ventureScore: 84,
        incumbentAvgScore: 35,
        status: 'Evidence-Supported Gap',
      },
      {
        dimension: 'Trust & Transparency',
        dimensionKey: 'trust',
        ventureScore: 94,
        incumbentAvgScore: 28,
        status: 'Potential Differentiator',
      },
      {
        dimension: 'Delivery & Turnaround Speed',
        dimensionKey: 'speed',
        ventureScore: 88,
        incumbentAvgScore: 50,
        status: 'Emerging Opportunity',
      },
      {
        dimension: 'Technology & Automation',
        dimensionKey: 'technology',
        ventureScore: 82,
        incumbentAvgScore: 55,
        status: 'Potential Differentiator',
      },
      {
        dimension: 'Product Accessibility',
        dimensionKey: 'accessibility',
        ventureScore: 86,
        incumbentAvgScore: 52,
        status: 'Evidence-Supported Gap',
      },
      {
        dimension: 'Customer / UX Experience',
        dimensionKey: 'experience',
        ventureScore: 92,
        incumbentAvgScore: 48,
        status: 'Potential Differentiator',
      },
      {
        dimension: 'Domain Specialization',
        dimensionKey: 'specialization',
        ventureScore: 90,
        incumbentAvgScore: 40,
        status: 'Potential Differentiator',
      },
      {
        dimension: 'Service & Support Depth',
        dimensionKey: 'service',
        ventureScore: 80,
        incumbentAvgScore: 45,
        status: 'Emerging Opportunity',
      },
    ],
    opportunities: diffOpportunities,
  };

  // 6. Market Size Framework (TAM / SAM / SOM with Zero Fabrication)
  const marketSize: MarketSizeFramework = {
    status: 'needs_validation',
    tamDescription: `Total addressable spend in the ${productType.toUpperCase()} (${customerType.toUpperCase()}) category across target national geography.`,
    samDescription: `Reachable segment of ${targetAudience} actively seeking ${differentiation || 'specialized alternatives'} in ${locationStr}.`,
    somDescription: `Year-1 beachhead capture objective: initial paying cohort validating unit economics and referral velocity.`,
    validationInputsRequired: [
      'Total ICP account volume or household count in operating geography',
      'Target Annual Contract Value (ACV) or Annual Customer Spend ($/yr)',
      'Estimated beachhead conversion rate from organic discovery / initial marketing',
      'Average monthly subscriber churn / repeat purchase retention rate',
    ],
    provenance: 'NEEDS_VALIDATION',
  };

  // 7. Market Trend Signals & Forces (Dynamic per domain)
  let trends: MarketTrendSignal[] = [
    {
      id: 'trend_1',
      signal: 'Customer Flight from Opaque Monoliths to Dedicated Specialized Tools',
      direction: 'rising',
      impact: 'high',
      confidence: 'high',
      evidenceSource: 'Category Market Shift & Buyer Preference Studies (2024–2026)',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'trend_2',
      signal: 'Demand for Transparent Value & Measurable ROI Over Fluffy Promises',
      direction: 'rising',
      impact: 'high',
      confidence: 'high',
      evidenceSource: 'Customer Acquisition Benchmarks & Consumer Budget Scrutiny',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'trend_3',
      signal: 'Rising Acquisition Costs Favoring High-Retention Referral Loops',
      direction: 'rising',
      impact: 'medium',
      confidence: 'medium',
      evidenceSource: 'Digital Ad Network CPM Inflation & Organic Channel Dynamics',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'trend_4',
      signal: 'Preference for Lightweight Instant Setup Over Prolonged Onboarding',
      direction: 'rising',
      impact: 'high',
      confidence: 'high',
      evidenceSource: 'Product-Led Growth Telemetry & User Activation Research',
      provenance: 'AI_INFERENCE',
    },
  ];

  if (lowerIdea.includes('tutor') || lowerIdea.includes('student')) {
    trends = [
      { id: 'trend_1', signal: 'Surge in Peer-to-Peer On-Demand Academic Learning', direction: 'rising', impact: 'high', confidence: 'high', evidenceSource: 'Higher Ed Student Survey & Remote Study Groups', provenance: 'AI_INFERENCE' },
      { id: 'trend_2', signal: 'Rejection of Expensive Multi-Month Agency Retainers', direction: 'rising', impact: 'high', confidence: 'high', evidenceSource: 'College Student Budget & Discretionary Spending Data', provenance: 'AI_INFERENCE' },
      { id: 'trend_3', signal: 'Adoption of Collaborative Digital Whiteboards & WebRTC', direction: 'rising', impact: 'medium', confidence: 'high', evidenceSource: 'EdTech Interaction Telemetry', provenance: 'AI_INFERENCE' },
      { id: 'trend_4', signal: 'Shift Toward Verified Syllabus-Specific Course Prep', direction: 'rising', impact: 'high', confidence: 'high', evidenceSource: 'University Exam Preparation Behavior Studies', provenance: 'AI_INFERENCE' },
    ];
  } else if (lowerIdea.includes('waste') || lowerIdea.includes('restaurant')) {
    trends = [
      { id: 'trend_1', signal: 'Rising Food Ingredient Inflation Compressing Restaurant Margins', direction: 'rising', impact: 'high', confidence: 'high', evidenceSource: 'National Restaurant Association Economic Reports', provenance: 'AI_INFERENCE' },
      { id: 'trend_2', signal: 'Kitchen Staff Shortages Demanding 60-Second Data Entry', direction: 'rising', impact: 'high', confidence: 'high', evidenceSource: 'Hospitality Labor & Turnover Analytics', provenance: 'AI_INFERENCE' },
      { id: 'trend_3', signal: 'Municipal & ESG Regulations on Commercial Organic Waste', direction: 'rising', impact: 'medium', confidence: 'medium', evidenceSource: 'City Sustainability Directives & Waste Penalties', provenance: 'AI_INFERENCE' },
      { id: 'trend_4', signal: 'Adoption of Cloud POS Webhooks for Real-Time Inventory', direction: 'rising', impact: 'high', confidence: 'high', evidenceSource: 'Restaurant Technology Integration Benchmarks', provenance: 'AI_INFERENCE' },
    ];
  }

  // 8. Market Risk Heatmap (Likelihood vs. Impact - Dynamic per domain)
  let riskHeatmap: MarketRiskItem[] = [
    {
      id: 'risk_1',
      risk: 'Customer Switching Inertia to Habitual Alternatives',
      category: 'switching_costs',
      likelihood: 'H',
      impact: 'H',
      whyItMatters:
        'Prospects are comfortable with their current routine or free workarounds. Breaking inertia requires an undeniable value leap.',
      whatToValidate:
        'Test sample trial offer or friction-free introductory batch to measure initial conversion velocity.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'risk_2',
      risk: 'Paid Customer Acquisition Cost (CAC) Saturation',
      category: 'pricing_pressure',
      likelihood: 'H',
      impact: 'H',
      whyItMatters:
        'Bidding directly on broad category search terms burns runway quickly against well-capitalized incumbents.',
      whatToValidate:
        'Validate founder-led organic content, micro-influencer partnerships, or community referral loops before digital ads.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'risk_3',
      risk: 'Operational Scalability & Delivery SLA Bottlenecks',
      category: 'adoption',
      likelihood: 'M',
      impact: 'H',
      whyItMatters:
        'If initial execution lags or fails quality promises, early customer trust and referral loops collapse immediately.',
      whatToValidate:
        'Live pilot test with 25 initial beta users to calibrate delivery velocity and quality controls.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'risk_4',
      risk: 'Incumbent Copycat Feature Emulation',
      category: 'substitute',
      likelihood: 'M',
      impact: 'M',
      whyItMatters:
        'Incumbents may copy superficial marketing slogans once your concept gains market traction.',
      whatToValidate:
        'Build direct proprietary operational craft and deep customer community bonds that cannot be cloned by corporate PR.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'risk_5',
      risk: 'Price Resistance During Macroeconomic Belt-Tightening',
      category: 'pricing_pressure',
      likelihood: 'M',
      impact: 'M',
      whyItMatters:
        'Discretionary offerings may experience higher churn during economic downturns.',
      whatToValidate:
        'Frame product not as luxury excess, but as superior daily unit value and cost-saving efficiency.',
      provenance: 'AI_INFERENCE',
    },
  ];

  if (lowerIdea.includes('tutor') || lowerIdea.includes('student')) {
    riskHeatmap = [
      { id: 'risk_1', risk: 'Two-Sided Liquidity Cold Start', category: 'adoption', likelihood: 'H', impact: 'H', whyItMatters: 'Students won\'t book without enough qualified tutors; tutors leave if session requests are sparse.', whatToValidate: 'Seed supply first with 20 top upperclassmen tutors across 3 high-demand STEM subjects.', provenance: 'AI_INFERENCE' },
      { id: 'risk_2', risk: 'Exam-Cycle Seasonality', category: 'pricing_pressure', likelihood: 'H', impact: 'M', whyItMatters: 'Demand peaks heavily during midterms and finals (Nov/Dec, Apr/May) and drops during summer.', whatToValidate: 'Introduce ongoing weekly homework clubs and skill workshops to smooth off-season revenue.', provenance: 'AI_INFERENCE' },
      { id: 'risk_3', risk: 'Off-Platform Disintermediation', category: 'switching_costs', likelihood: 'M', impact: 'H', whyItMatters: 'Tutors and students might exchange phone numbers to bypass platform fees after meeting.', whatToValidate: 'Provide high-value integrated WebRTC video, shared whiteboards, and automatic session recording.', provenance: 'AI_INFERENCE' },
      { id: 'risk_4', risk: 'Tutor Quality Inconsistency', category: 'substitute', likelihood: 'M', impact: 'H', whyItMatters: 'A single bad tutoring experience destroys student trust and prevents referral.', whatToValidate: 'Implement student transcript verification and 100% money-back escrow guarantee on first lesson.', provenance: 'AI_INFERENCE' },
      { id: 'risk_5', risk: 'Student Budget Price Sensitivity', category: 'pricing_pressure', likelihood: 'M', impact: 'M', whyItMatters: 'Pricing above ₹600/hr sharply reduces college student booking frequency.', whatToValidate: 'Maintain standard ₹350–₹500/hr rates with group session splitting options.', provenance: 'AI_INFERENCE' },
    ];
  } else if (lowerIdea.includes('waste') || lowerIdea.includes('restaurant')) {
    riskHeatmap = [
      { id: 'risk_1', risk: 'Kitchen Staff Compliance Friction', category: 'adoption', likelihood: 'H', impact: 'H', whyItMatters: 'Line cooks in high-pressure rush hours will skip tedious manual waste logging.', whatToValidate: 'Keep logging under 60 seconds with 1-tap presets and voice input.', provenance: 'AI_INFERENCE' },
      { id: 'risk_2', risk: 'Low SaaS Budget Tolerance in Independent Restaurants', category: 'pricing_pressure', likelihood: 'H', impact: 'H', whyItMatters: 'Independent restaurant owners operate on razor-thin 3–7% net margins and reject high software fees.', whatToValidate: 'Demonstrate immediate 10x ROI in food cost savings within the first 14 days of pilot.', provenance: 'AI_INFERENCE' },
      { id: 'risk_3', risk: 'Fragmented POS Hardware Integration', category: 'switching_costs', likelihood: 'M', impact: 'H', whyItMatters: 'Legacy on-premise POS systems lack modern webhooks or cloud APIs.', whatToValidate: 'Build simple CSV import and direct webhook bridges for top 3 regional POS platforms.', provenance: 'AI_INFERENCE' },
      { id: 'risk_4', risk: 'Menu Seasonality & Recipe Variance', category: 'substitute', likelihood: 'M', impact: 'M', whyItMatters: 'Daily chef specials and irregular prep recipes make automated forecasting complex.', whatToValidate: 'Calibrate prep models using 4-week moving averages with chef overrides.', provenance: 'AI_INFERENCE' },
      { id: 'risk_5', risk: 'Manager Turnover & Training Gaps', category: 'adoption', likelihood: 'M', impact: 'M', whyItMatters: 'High restaurant general manager turnover causes sudden software abandonment.', whatToValidate: 'Create automated weekly WhatsApp summary digests sent directly to restaurant owners.', provenance: 'AI_INFERENCE' },
    ];
  }

  // 9. Dedicated Evidence Integrity Log
  const evidenceLog: MarketEvidenceItem[] = [
    {
      id: 'ev_1',
      claim: `Target audience profile: ${targetAudience}`,
      provenance: state.idea.targetAudience ? 'USER_PROVIDED' : 'AI_INFERENCE',
      sourceOrBasis: 'Stage 01 Idea Lab Customer Discovery input',
      confidence: 'High',
      validationAction: 'Run 10 customer discovery interviews to confirm demographic boundaries.',
      category: 'segment',
    },
    {
      id: 'ev_2',
      claim: `Core customer friction: ${problem.slice(0, 60)}...`,
      provenance: state.idea.problem ? 'USER_PROVIDED' : 'AI_INFERENCE',
      sourceOrBasis: 'Stage 01 Idea Lab Problem Definition',
      confidence: 'High',
      validationAction: 'Record verbatim customer quotes regarding current workaround frustrations.',
      category: 'whitespace',
    },
    {
      id: 'ev_3',
      claim: `Proposed brand differentiator: ${differentiation || 'Radical Transparency'}`,
      provenance: state.idea.differentiation ? 'USER_PROVIDED' : 'AI_INFERENCE',
      sourceOrBasis: 'Stage 01 Founder Differentiation Proposition',
      confidence: 'Medium',
      validationAction: 'Test willingness to pay for this differentiator on a mock checkout page.',
      category: 'differentiation',
    },
    {
      id: 'ev_4',
      claim: 'Incumbents leave accessible craft mid-market tier underserved.',
      provenance: 'AI_INFERENCE',
      sourceOrBasis: 'Competitive landscape cluster analysis across retail & digital offerings',
      confidence: 'High',
      validationAction: 'Catalog top 5 local competitors and map their pricing vs. packaging claims.',
      category: 'competitor',
    },
    {
      id: 'ev_5',
      claim: 'Status quo inertia is the primary barrier to Day 1 customer switching.',
      provenance: 'AI_INFERENCE',
      sourceOrBasis: 'Customer acquisition friction analysis & Stage 02 viability assessment',
      confidence: 'High',
      validationAction: 'Measure onboarding completion rate during initial beta prototype rollout.',
      category: 'risk',
    },
    {
      id: 'ev_6',
      claim: 'Category TAM / SAM market size figures require verified localized input.',
      provenance: 'NEEDS_VALIDATION',
      sourceOrBasis: 'Unverified macro estimates pending empirical founder bounds input',
      confidence: 'Low',
      validationAction: 'Obtain verified industry census or local chamber of commerce trade records.',
      category: 'segment',
    },
  ];

  // 10. Macro Signal Indicators
  const marketSignal: SignalLevel = state.idea.targetAudience ? 'Strong' : 'Moderate';
  const customerSignal: SignalLevel = state.idea.problem ? 'Strong' : 'Moderate';
  const competitiveSignal: SignalLevel = 'Moderate';
  const opportunitySignal: SignalLevel = state.idea.differentiation ? 'Strong' : 'Needs Validation';

  // 11. AI Strategic Council Synthesis (Domain-tailored with specialist roles)
  const isTutoringDomain = lowerIdea.includes('tutor') || lowerIdea.includes('student') || lowerIdea.includes('education');
  const isSkincareDomain = lowerIdea.includes('skincare') || lowerIdea.includes('serum') || lowerIdea.includes('beauty') || lowerIdea.includes('cosmetic') || lowerIdea.includes('dermatolog') || lowerIdea.includes('lotion') || lowerIdea.includes('cream');
  const isFoodWasteDomain = lowerIdea.includes('waste') || lowerIdea.includes('restaurant');
  const isMealDeliveryDomain = lowerIdea.includes('meal') || lowerIdea.includes('lunch') || lowerIdea.includes('office worker');
  const isHomeRepairDomain = lowerIdea.includes('repair') || lowerIdea.includes('home') || lowerIdea.includes('handyman');
  const problemStatement = state.idea.problem || state.idea.rawInput || 'unmet customer friction';

  let specialistDebates: SpecialistPerspective[] = [];

  if (isSkincareDomain) {
    specialistDebates = [
      {
        role: 'venture_strategy',
        roleName: 'Founder / Vision Specialist',
        badge: '💡',
        keyPerspective:
          `Deliver genuinely clean, dermatologist-grade cold-pressed botanical skincare for ${targetAudience} with a sustainable refill loop that eliminates plastic waste.`,
        challengeOrCaveat:
          'Never compromise on clinical bio-compatibility to chase fast-moving beauty gimmick trends.',
      },
      {
        role: 'market_intelligence',
        roleName: 'Market Intelligence Lead',
        badge: '🧭',
        keyPerspective:
          'Mass incumbents (L’Oreal, Nivea) rely on synthetic thickeners and unrecyclable plastic pumps. The clean clinical indie beauty space has huge whitespace in accessible transparent formulas.',
        challengeOrCaveat:
          'D2C beauty CAC on Meta has risen 35% post-iOS14; rely on organic community before scaling paid customer acquisition.',
      },
      {
        role: 'product_execution',
        roleName: 'Product Specialist',
        badge: '⚙️',
        keyPerspective:
          'Formulate an MVP line of 2 core barrier serums in amber borosilicate glass with 90-day accelerated stability testing and BIS/CDSCO compliance.',
        challengeOrCaveat:
          'Ensure refill packaging maintains cold-pressed lipid integrity without oxidation during shipping.',
      },
      {
        role: 'growth_marketing',
        roleName: 'Growth & GTM Specialist',
        badge: '📈',
        keyPerspective:
          'Seed product with 50 micro-tier aesthetic dermatologists and sensitive-skin creators. User-generated routine videos drive 4x higher conversion than static ads.',
        challengeOrCaveat:
          'Avoid broad unscientific claims; focus strictly on verified ingredient transparency and barrier recovery results.',
      },
      {
        role: 'finance',
        roleName: 'Finance & Unit Economics',
        badge: '📊',
        keyPerspective:
          'Serums offer 65-72% gross margins. The refill subscription model increases 6-month LTV from $42 to $118 while lowering per-unit packaging cost by 40%.',
        challengeOrCaveat:
          'Initial GMP contract manufacturing MOQs (500–1,000 units per SKU) require disciplined inventory working capital management.',
      },
      {
        role: 'challenger',
        roleName: 'Red Team / Critic',
        badge: '🥊',
        keyPerspective:
          'Sensitive-skin consumers are highly risk-averse. A single negative skin reaction or ingredient breakout destroys brand trust.',
        challengeOrCaveat:
          'Patch testing and hypoallergenic clinical verification must precede any commercial distribution.',
      },
    ];
  } else if (isTutoringDomain) {
    specialistDebates = [
      {
        role: 'venture_strategy',
        roleName: 'Founder / Vision Specialist',
        badge: '💡',
        keyPerspective:
          `Protect the core vision: making high-quality tutoring affordable for ${targetAudience} by empowering top near-peer students.`,
        challengeOrCaveat:
          'Must not let commercial tutoring agency pricing inflate student fees; maintain accessible hourly pricing.',
      },
      {
        role: 'market_intelligence',
        roleName: 'Market Intelligence Lead',
        badge: '🧭',
        keyPerspective:
          'Legacy platforms take 30%+ take-rates or lock students into expensive monthly subscription bundles. An open, transparent per-session take-rate creates an immediate wedge.',
        challengeOrCaveat:
          'Beware of offline disintermediation: once student and tutor connect, they may attempt to pay in cash off-platform.',
      },
      {
        role: 'product_execution',
        roleName: 'Product Specialist',
        badge: '⚙️',
        keyPerspective:
          'The MVP only needs 3 capabilities: 1) Verified tutor profiles by university course code, 2) In-app booking & payment escrow, 3) Interactive video workspace.',
        challengeOrCaveat:
          'Do not build complex asynchronous homework solvers or AI chatbots initially; focus strictly on frictionless 1-on-1 human lesson booking.',
      },
      {
        role: 'growth_marketing',
        roleName: 'Growth & GTM Specialist',
        badge: '📈',
        keyPerspective:
          'Launch exclusively with campus brand ambassadors and student society partnerships before midterms. A tight campus density creates self-reinforcing word of mouth.',
        challengeOrCaveat:
          'Acquiring both sides simultaneously across 20 campuses Day 1 will burn capital. Win 2 flagship campuses first.',
      },
      {
        role: 'finance',
        roleName: 'Finance & Unit Economics',
        badge: '📊',
        keyPerspective:
          'Target a transparent 12-15% platform fee. At $25/hr average lesson price, platform keeps $3.50/hr with near-zero variable server cost.',
        challengeOrCaveat:
          'Semester seasonality causes revenue drops in summer and winter breaks; budget runway for 8-month active academic cycles.',
      },
      {
        role: 'challenger',
        roleName: 'Red Team / Critic',
        badge: '🥊',
        keyPerspective:
          'Tutor supply liquidity is the real bottleneck. Top students already have high academic workloads and may cancel sessions last minute before their own exams.',
        challengeOrCaveat:
          'If tutor response time exceeds 2 hours, students will find free YouTube videos or study groups instead.',
      },
    ];
  } else if (isFoodWasteDomain) {
    specialistDebates = [
      {
        role: 'venture_strategy',
        roleName: 'Founder / Vision Specialist',
        badge: '💡',
        keyPerspective:
          `Help small restaurants eliminate perishable waste and recover lost margin without disrupting fast-paced kitchen operations.`,
        challengeOrCaveat:
          'Software must take less than 60 seconds per shift; chefs will abandon any tool requiring manual barcode scanning.',
      },
      {
        role: 'market_intelligence',
        roleName: 'Market Intelligence Lead',
        badge: '🧭',
        keyPerspective:
          'Enterprise food waste tools (Winnow, Leanpath) require expensive smart bins and cameras ($5K+). Small independent restaurants have zero budget for hardware.',
        challengeOrCaveat:
          'Must demonstrate immediate monthly savings greater than the software subscription price in Month 1.',
      },
      {
        role: 'product_execution',
        roleName: 'Product Specialist',
        badge: '⚙️',
        keyPerspective:
          'Build a mobile-first 3-tap end-of-night logging screen that outputs tomorrow’s exact prep reduction sheet.',
        challengeOrCaveat:
          'Avoid building complex ERP inventory modules; win strictly on rapid spoilage tracking and prep recommendations.',
      },
      {
        role: 'growth_marketing',
        roleName: 'Growth & GTM Specialist',
        badge: '📈',
        keyPerspective:
          'Acquire via restaurant associations, local chef communities, and POS integration app stores (Toast, Square, Clover).',
        challengeOrCaveat:
          'Cold email conversion to restaurant owners is notoriously low; founder-led in-person kitchen pilots are required.',
      },
      {
        role: 'finance',
        roleName: 'Finance & Unit Economics',
        badge: '📊',
        keyPerspective:
          'A simple $49/month SaaS tier with a 14-day free pilot creates low-friction adoption with 85%+ software gross margin.',
        challengeOrCaveat:
          'Restaurant failure rate is high (~20% annual turnover), requiring steady top-of-funnel acquisition velocity.',
      },
      {
        role: 'challenger',
        roleName: 'Red Team / Critic',
        badge: '🥊',
        keyPerspective:
          'Kitchen staff inertia is massive. Line cooks under rush stress will throw away trimmings without logging them.',
        challengeOrCaveat:
          'If the logging process feels like a chore, data quality collapses and recommendations become useless.',
      },
    ];
  } else if (isMealDeliveryDomain) {
    specialistDebates = [
      {
        role: 'venture_strategy',
        roleName: 'Founder / Vision Specialist',
        badge: '💡',
        keyPerspective:
          `Solve daily office lunchtime fatigue with fresh, nutritious, predictable meal delivery at transparent prices.`,
        challengeOrCaveat:
          'Do not sacrifice ingredient quality to chase fast-food commodity pricing.',
      },
      {
        role: 'market_intelligence',
        roleName: 'Market Intelligence Lead',
        badge: '🧭',
        keyPerspective:
          'On-demand delivery apps (UberEats, DoorDash) charge $5-8 delivery fees and markups on single lunches. Batch building delivery eliminates delivery fee friction.',
        challengeOrCaveat:
          'Office building security and front-desk drop-off logistics vary significantly by commercial tower.',
      },
      {
        role: 'growth_marketing',
        roleName: 'Growth & GTM Specialist',
        badge: '📈',
        keyPerspective:
          'Group corporate ordering: recruit one "Office Champion" per floor with a free weekly meal in exchange for coordinating team orders.',
        challengeOrCaveat:
          'Hybrid remote work schedules (Tue-Thu peak, Mon/Fri lull) create uneven daily kitchen production volume.',
      },
      {
        role: 'finance',
        roleName: 'Finance & Unit Economics',
        badge: '📊',
        keyPerspective:
          'Batch drop-offs (10-20 meals per building) reduce per-meal delivery cost from $6 to under $0.80, boosting contribution margins to 55%+.',
        challengeOrCaveat:
          'Packaging and thermal insulation must protect food temperature during the final 30-minute delivery transit.',
      },
      {
        role: 'challenger',
        roleName: 'Red Team / Critic',
        badge: '🥊',
        keyPerspective:
          'The lunch delivery window is unforgiving: arrival at 1:15 PM instead of 12:30 PM ruins customer experience completely.',
        challengeOrCaveat:
          'Menu fatigue sets in after 3-4 weeks if rotating seasonal items are not introduced constantly.',
      },
    ];
  } else if (isHomeRepairDomain) {
    specialistDebates = [
      {
        role: 'venture_strategy',
        roleName: 'Founder / Vision Specialist',
        badge: '💡',
        keyPerspective:
          `Provide homeowners with transparent, stress-free repair bookings while ensuring local tradespeople get steady, fair-paying jobs.`,
        challengeOrCaveat:
          'Must maintain strict quality standards so customer trust remains non-negotiable.',
      },
      {
        role: 'market_intelligence',
        roleName: 'Market Intelligence Lead',
        badge: '🧭',
        keyPerspective:
          'Classified sites and pay-per-lead boards frustrate both homeowners (spam calls) and pros (paying for unclosed leads). Upfront fixed-rate booking wins.',
        challengeOrCaveat:
          'Scope ambiguity on complex jobs (e.g. hidden pipe leaks) can create pricing disputes on site.',
      },
      {
        role: 'product_execution',
        roleName: 'Product Specialist',
        badge: '⚙️',
        keyPerspective:
          'Standardize 20 common repair categories (faucet replacement, breaker swap, disposal fix) with fixed pricing tiers and photo upload diagnosis.',
        challengeOrCaveat:
          'Keep technician mobile app ultra-simple: one-tap job accept, navigation, and photo completion proof.',
      },
      {
        role: 'finance',
        roleName: 'Finance & Unit Economics',
        badge: '📊',
        keyPerspective:
          'Charge an 18% commission on completed service payments rather than pay-per-lead fees to perfectly align platform incentives with completed jobs.',
        challengeOrCaveat:
          'Must maintain adequate contractor insurance and satisfaction guarantee escrow reserves.',
      },
      {
        role: 'challenger',
        roleName: 'Red Team / Critic',
        badge: '🥊',
        keyPerspective:
          'Technician reliability and background verification are the primary existential risks. A single unvetted bad contractor destroys local market trust.',
        challengeOrCaveat:
          'Emergency response dispatch requires tight geo-fencing; spreading technicians too thin results in late arrivals.',
      },
    ];
  } else {
    specialistDebates = [
      {
        role: 'venture_strategy',
        roleName: 'Founder / Vision Specialist',
        badge: '💡',
        keyPerspective:
          `Protect the original venture purpose: solving "${problemStatement.slice(0, 50)}..." for ${targetAudience}.`,
        challengeOrCaveat:
          'Avoid diluting the core offering into generic commodity features before securing market product fit.',
      },
      {
        role: 'market_intelligence',
        roleName: 'Market Intelligence Lead',
        badge: '🧭',
        keyPerspective:
          `Incumbents in the ${productType.toUpperCase()} space are vulnerable because they lack specialized focus and agile customer care.`,
        challengeOrCaveat:
          'Ensure switching friction is minimal so defecting from status-quo workarounds feels risk-free.',
      },
      {
        role: 'growth_marketing',
        roleName: 'Growth & Acquisition Specialist',
        badge: '📈',
        keyPerspective:
          'Focus 100% of initial marketing on core enthusiasts who will actively recommend the product organically.',
        challengeOrCaveat:
          'Do not scale broad paid digital ad spend before proving baseline customer retention.',
      },
      {
        role: 'challenger',
        roleName: 'Red Team / Critic',
        badge: '🥊',
        keyPerspective:
          'Founders consistently underestimate customer habit inertia. The trial experience must be 10x more compelling in under 60 seconds.',
        challengeOrCaveat:
          'If initial onboarding friction is too high, early customer drop-off will stall growth.',
      },
      {
        role: 'finance',
        roleName: 'Finance & Unit Economics',
        badge: '📊',
        keyPerspective:
          'Maintain a minimum 55% gross contribution margin to ensure organic runway and reinvestment capacity.',
        challengeOrCaveat:
          'Do not invent financial numbers without verified customer order evidence.',
      },
    ];
  }

  const aiCouncil: AICouncilSynthesis = {
    primaryConsensus:
      `The Business Council confirms a viable, focused entry wedge for ${ventureName}. By solving "${problemStatement.slice(0, 60)}" directly for ${targetAudience}, the venture can bypass legacy incumbent bloat.`,
    criticalDivergence:
      'Challenger and Growth specialists emphasize that customer inertia is the primary risk. The initial user trial and onboarding must deliver instant value before expanding marketing spend.',
    founderActionRecommendation:
      `Focus the initial launch strictly on ${targetAudience}. Validate repeatable engagement with an initial cohort before scaling fixed operational costs.`,
    specialistDebates,
  };

  // 12. Stage 04 Handoff Brief
  const brief: MarketIntelligenceBrief = {
    generatedAt: new Date().toISOString(),
    ventureName,
    productType,
    validatedSegments: customerSegments.map((s) => s.name),
    priorityAudienceSignals: [
      `Primary target: ${targetAudience}`,
      'High price sensitivity to vague claims, but willingness to pay premium for verified craft and transparency.',
      'Decision trigger: Acute frustration with generic mass alternatives or slow manual workflows.',
    ],
    competitorLandscapeSummary:
      'Polarized between low-cost mass commodity and overpriced/complex legacy solutions. Mid-tier specialized craft space is wide open.',
    strategicWhitespaceOpportunities: opportunityGaps.map((g) => g.title),
    coreMarketRisks: riskHeatmap.map((r) => r.risk),
    keyDifferentiationAnglesForBrand: [
      differentiation || 'Radical operational transparency and specialized craft',
      'Frictionless onboarding with rapid time-to-value',
      'Values-aligned community connection',
    ],
    unresolvedMarketAssumptions: [
      'Target segment is actively willing to switch from status-quo workarounds.',
      'Customer acquisition costs can be sustained organically or through high referral velocity.',
    ],
    evidenceQualitySummary: {
      verified: state.idea.targetAudience && state.idea.problem ? 6 : 2,
      inference: 8,
      assumptions: 3,
      needsVal: 2,
    },
    strategicBrandImplications: [
      'Brand archetype should embody Craftsmanship & Transparency (Creator / Sage archetype).',
      'Value proposition must highlight proof-over-promises in all visual and messaging touchpoints.',
      'Positioning statement must directly challenge the status quo workaround.',
    ],
  };

  return {
    id: `mkt_rep_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    signals: {
      marketSignal,
      customerSignal,
      competitiveSignal,
      opportunitySignal,
    },
    competitors,
    availableAxes,
    selectedAxes,
    opportunityGaps,
    differentiatorEngine,
    customerSegments,
    marketSize,
    trends,
    riskHeatmap,
    evidenceLog,
    aiCouncil,
    brief,
  };
}
