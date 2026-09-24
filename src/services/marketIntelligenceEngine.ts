import type {
  ProjectState,
  MarketIntelligenceReport,
  CompetitorItem,
  PositioningAxis,
  CustomerSegment,
  MarketOpportunityGap,
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

  // Default axes pair based on venture classification
  const defaultXAxis =
    productType === 'physical'
      ? availableAxes[6] // Transparency
      : productType === 'saas'
      ? availableAxes[3] // Specialization
      : availableAxes[1]; // Convenience

  const defaultYAxis = availableAxes[0]; // Price & Value

  const selectedAxes = customAxes || {
    xAxis: defaultXAxis,
    yAxis: defaultYAxis,
  };

  // 2. Competitors & Alternative Workarounds
  const defaultArchetypeCompetitors: CompetitorItem[] = [
    {
      id: 'comp_1',
      name:
        productType === 'physical'
          ? 'Commercial Supermarket Roasters'
          : productType === 'saas'
          ? 'Legacy Analytics Suites'
          : 'Generic Incumbent Platform',
      category: 'direct',
      positioningLabel: 'High-volume commercial commodity with broad retail/search presence',
      priceTier: 'budget',
      offeringSummary:
        productType === 'physical'
          ? 'Mass-roasted commercial blends distributed through national grocery chains with 6–12 month shelf life.'
          : 'Broad multi-tool analytics dashboards with complex manual event configurations and generalized reporting.',
      strengths: ['Mass distribution footprint', 'Strong historical brand recall', 'Low nominal unit price point'],
      weaknesses: ['Zero batch freshness transparency', 'Generic mass-market quality', 'Impersonal customer support'],
      differentiationFactor: 'Distribution scale over personalized craft and real-time freshness.',
      targetCustomer: 'Price-sensitive mass consumers looking for familiar default options',
      businessPricingModel: 'High-volume wholesale retail margins (low unit gross margin)',
      confidence: 'High',
      evidenceSource: 'Stage 01 Market Category Context & Public Retailing Benchmarks',
      provenance: 'AI_INFERENCE',
      coordinates: { x: -65, y: -50 },
    },
    {
      id: 'comp_2',
      name:
        productType === 'physical'
          ? 'Boutique Artisan Roasteries'
          : productType === 'saas'
          ? 'Enterprise Bespoke Platforms'
          : 'High-End Specialty Retainers',
      category: 'direct',
      positioningLabel: 'Ultra-premium artisanal offerings catering to discerning collectors/enterprises',
      priceTier: 'enterprise',
      offeringSummary:
        productType === 'physical'
          ? 'Single-lot micro roasters with exceptional cup scores, sold in physical cafes or erratic boutique drops.'
          : 'White-glove attribution suites with dedicated data engineering teams and lengthy 6-month enterprise onboarding.',
      strengths: ['Exceptional product craftsmanship', 'Deep niche brand credibility', 'High customer loyalty among purists'],
      weaknesses: ['Prohibitive price ceiling', 'Erratic supply & delivery friction', 'Steep learning curve for newcomers'],
      differentiationFactor: 'Exclusivity and high-touch artisanal pedigree over accessible consistency.',
      targetCustomer: 'High-budget connoisseurs and enterprise organizations with dedicated budgets',
      businessPricingModel: 'High gross margin ($$$) with low transaction volume',
      confidence: 'High',
      evidenceSource: 'Specialty Industry Reports & Enterprise Pricing Benchmarks',
      provenance: 'AI_INFERENCE',
      coordinates: { x: 70, y: 75 },
    },
    {
      id: 'comp_3',
      name:
        productType === 'physical'
          ? 'Status Quo: Supermarket Instant / Pods'
          : productType === 'saas'
          ? 'Status Quo: Spreadsheets & Platform Native ROAS'
          : 'Status Quo: DIY Ad-Hoc Workarounds',
      category: 'alternative_workaround',
      positioningLabel: 'Default habit and free built-in workarounds',
      priceTier: 'budget',
      offeringSummary:
        productType === 'physical'
          ? 'Instant soluble powders or standard Nespresso capsules consumed out of habitual convenience.'
          : 'Founders manually exporting Meta/Google Ads CSVs into Google Sheets and blending with Shopify exports.',
      strengths: ['Zero financial switching cost', 'Immediate availability', 'Familiar daily routine'],
      weaknesses: ['Inferior sensory/analytical outcome', 'Double-counted metrics / poor taste', 'Time-consuming manual drudgery'],
      differentiationFactor: 'Extreme inertia and familiarity despite documented inefficiency.',
      targetCustomer: 'Busy operators and everyday consumers defaulting to path of least resistance',
      businessPricingModel: 'Free / sunk-cost built-in utility',
      confidence: 'High',
      evidenceSource: 'Stage 01 Founder Problem Statement & Customer Discovery Interviews',
      provenance: 'AI_INFERENCE',
      coordinates: { x: -80, y: -75 },
    },
  ];

  const competitors = [...customCompetitors, ...defaultArchetypeCompetitors];

  // 3. Customer Segments (Derived from Stage 01 audience & problem)
  const customerSegments: CustomerSegment[] = [
    {
      id: 'seg_1',
      name: `Core Adopters (${targetAudience.slice(0, 32)})`,
      relativeRelevance: 92,
      painIntensity: 'High',
      coreNeed: problem.slice(0, 85) + '...',
      buyingTrigger:
        productType === 'physical'
          ? 'Tasting stale supermarket beans after setting up a premium home grinder, triggering search for peak roast freshness.'
          : 'Discovering discrepancies in blended ad platform ROAS reporting, leading to immediate wasted ad spend concerns.',
      potentialFit: 'High',
      adoptionBarriers: [
        'Overcoming habituated status quo workarounds',
        'Need for verified proof before committing to monthly subscription/retainer',
      ],
      confidence: 'High',
      provenance: state.idea.targetAudience ? 'USER_PROVIDED' : 'AI_INFERENCE',
    },
    {
      id: 'seg_2',
      name: 'Discerning Practitioners & Enthusiasts',
      relativeRelevance: 78,
      painIntensity: 'Medium',
      coreNeed:
        productType === 'physical'
          ? 'Transparent estate sourcing, traceable lot elevations, and predictable recurring delivery schedules.'
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

  // 4. Market Opportunity & Whitespace Gaps
  const opportunityGaps: MarketOpportunityGap[] = [
    {
      id: 'gap_1',
      title: 'The Accessible Craft & Provenance Wedge',
      unresolvedNeed:
        'A dependable, high-quality solution that provides verified craft without enterprise friction or boutique unreliability.',
      currentMarketShortcoming:
        'Market is polarized: mass players provide convenience without craft; boutique players provide craft without reliable distribution.',
      opportunityAngle: `Position ${ventureName} in the vacant mid-market sweetspot: approachable premium with transparent verification.`,
      demandLevel: 'High',
      competitionLevel: 'Low',
      quadrant: 'prime_opportunity',
      confidence: 'High',
      underservedAspect: 'Delivering verified high-grade quality with modern, predictable recurring delivery.',
      whyItMatters:
        'Captures customers migrating away from stale mass commodities who are unwilling to tolerate boutique erraticism.',
      supportingEvidence:
        'Customer discovery inputs show high pain with status-quo freshness/fidelity and willingness to pay fair premium.',
      competitorsAddressing: ['None effectively in the accessible mid-market tier.'],
      unresolvedElement: 'Validating exact subscription churn rates and unit courier packaging logistics.',
      whatToValidateNext: 'Run initial pre-order batch smoke test to confirm deposit conversion rates.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'gap_2',
      title: 'Radical Transparency vs. Superficial Marketing Claims',
      unresolvedNeed:
        'Customers demand verifiable proof of claims (origin payout / net margin math) rather than generic marketing buzzwords.',
      currentMarketShortcoming:
        'Incumbents rely on vague buzzwords ("artisanal", "AI-powered") without exposing actual proof mechanisms.',
      opportunityAngle:
        'Expose batch QR codes, margin calculators, and open operational benchmarks directly to the buyer.',
      demandLevel: 'High',
      competitionLevel: 'Moderate',
      quadrant: 'prime_opportunity',
      confidence: 'High',
      underservedAspect: 'Uncompromised operational visibility that turns transparency into a primary brand moat.',
      whyItMatters: 'Builds defensible brand trust and insulates against commoditization from generic copycats.',
      supportingEvidence:
        'Growing consumer backlash against unverified sustainability and opaque automated platforms.',
      competitorsAddressing: ['Partial niche players, but usually locked behind enterprise sales calls.'],
      unresolvedElement: 'Supply partner willingness to allow full audit and public disclosure.',
      whatToValidateNext: 'Lock written disclosure agreements with key roasters / data providers.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'gap_3',
      title: 'Frictionless Time-to-Value Setup',
      unresolvedNeed:
        'Instant setup and zero-friction onboarding that delivers the core sensory or analytical payoff in under 3 minutes.',
      currentMarketShortcoming:
        'High-end alternatives require extensive manual configuration, sales qualification, or specialized equipment.',
      opportunityAngle: 'Deliver immediate delight on Day 1 with streamlined unboxing or 1-click connectors.',
      demandLevel: 'Medium',
      competitionLevel: 'Low',
      quadrant: 'niche',
      confidence: 'Medium',
      underservedAspect: 'Eliminating the setup cognitive tax that prevents mainstream adoption.',
      whyItMatters: 'Dramatically reduces early cohort churn and accelerates customer referral velocity.',
      supportingEvidence: 'High drop-off rates documented in complex enterprise onboarding workflows.',
      competitorsAddressing: ['Commodity players offer simplicity, but paired with low-grade output.'],
      unresolvedElement: 'Customer self-service capability across varying technical proficiencies.',
      whatToValidateNext: 'Usability testing with 5 non-expert target users on the onboarding prototype.',
      provenance: 'AI_INFERENCE',
    },
  ];

  // 5. Differentiator Engine (Strategy Canvas & Opportunity Chain)
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
        ventureScore: 82,
        incumbentAvgScore: 60,
        status: 'Emerging Opportunity',
      },
      {
        dimension: 'Technology & Automation',
        dimensionKey: 'technology',
        ventureScore: 76,
        incumbentAvgScore: 65,
        status: 'Parity / Baseline',
      },
      {
        dimension: 'Product Accessibility',
        dimensionKey: 'accessibility',
        ventureScore: 86,
        incumbentAvgScore: 52,
        status: 'Evidence-Supported Gap',
      },
      {
        dimension: 'Sensory / UX Experience',
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
    opportunities: [
      {
        id: 'diff_opp_1',
        differentiationArea: 'Radical Transparency & Provenance Tracing',
        currentCompetitiveSituation:
          'Incumbents rely on opaque commodity sourcing with generic certifications and zero harvest visibility.',
        connectedMarketGap: 'Connoisseurs and conscious buyers deeply distrust unverifiable marketing claims.',
        whyThisMatters:
          'Converts operational honesty into a proprietary brand moat that commands a 20–30% price premium without ad fatigue.',
        supportingEvidence:
          differentiation || 'Stage 01 differentiation input highlighting farm-gate traceability and batch verification.',
        confidence: 'High',
        validationRequirement: 'Verify that target customers will scan batch QR codes and value the payout transparency.',
        statusLabel: 'Potential differentiator',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_2',
        differentiationArea: 'Roast-to-Order / Zero-Lag Velocity',
        currentCompetitiveSituation:
          'Supermarket beans sit on shelves for 3–9 months; specialty roasteries ship on irregular erratic schedules.',
        connectedMarketGap:
          'Customers with premium brewing gear lose 60% of flavor complexity to stale beans roasted weeks prior.',
        whyThisMatters:
          'Creates an immediate sensory "aha!" moment on the first sip, driving organic word-of-mouth loops.',
        supportingEvidence: 'Sensory degradation studies on roasted whole-bean coffee after 21 days from roast.',
        confidence: 'High',
        validationRequirement: 'Validate 48-hour delivery SLAs with regional express logistics partners.',
        statusLabel: 'Evidence-supported gap',
        provenance: 'AI_INFERENCE',
      },
      {
        id: 'diff_opp_3',
        differentiationArea: 'Curated Simplicity Over Jargon Bloat',
        currentCompetitiveSituation:
          'Specialty coffee gatekeeps with intimidating technical jargon; mass coffee ignores flavor notes completely.',
        connectedMarketGap:
          'Aspiring home baristas want delicious single-origin coffee without feeling judged or overwhelmed by jargon.',
        whyThisMatters:
          'Expands addressable market beyond snobbish hobbyists into lucrative high-LTV remote professionals.',
        supportingEvidence: 'Discovery flow interviews documenting intimidation and frustration with traditional specialty cafes.',
        confidence: 'Medium',
        validationRequirement: 'A/B test tasting note cards with simplified taste tags vs. traditional cupping scores.',
        statusLabel: 'Emerging opportunity',
        provenance: 'AI_INFERENCE',
      },
    ],
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

  // 7. Market Trend Signals & Forces
  const trends: MarketTrendSignal[] = [
    {
      id: 'trend_1',
      signal: 'Consumer Flight from Mass Commodity to Origin Transparency',
      direction: 'rising',
      impact: 'high',
      confidence: 'high',
      evidenceSource: 'Consumer Packaged Goods & Specialty Trade Reports (2024–2026)',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'trend_2',
      signal: 'Surge in Home Workspace & Remote Professional Craft Spending',
      direction: 'stable',
      impact: 'high',
      confidence: 'high',
      evidenceSource: 'Remote Work Lifestyle Expenditure Studies & E-Commerce Subscriptions',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'trend_3',
      signal: 'Backlash Against Opaque Greenwashing & Vague Corporate Claims',
      direction: 'rising',
      impact: 'medium',
      confidence: 'medium',
      evidenceSource: 'Regulatory ESG Scrutiny & Gen-Z/Millennial Consumer Sentiment Polls',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'trend_4',
      signal: 'Ad Saturation & Rising Paid Customer Acquisition Costs (CAC)',
      direction: 'rising',
      impact: 'high',
      confidence: 'high',
      evidenceSource: 'Meta / Google Ad Platform CPM Benchmarks (Post-Privacy Tracking Shifts)',
      provenance: 'AI_INFERENCE',
    },
  ];

  // 8. Market Risk Heatmap (Likelihood vs. Impact)
  const riskHeatmap: MarketRiskItem[] = [
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
      risk: 'Supply Quality & Courier Delivery Logistics Friction',
      category: 'adoption',
      likelihood: 'M',
      impact: 'H',
      whyItMatters:
        'If parcel delivery takes >48h or packaging arrives damaged, freshness claims and customer trust collapse immediately.',
      whatToValidate:
        'Live pilot test with 25 test shipments across target metro areas to measure transit times and packaging integrity.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'risk_4',
      risk: 'Competitor Feature Emulation / Copycat Positioning',
      category: 'substitute',
      likelihood: 'M',
      impact: 'M',
      whyItMatters:
        'Incumbents may copy superficial marketing slogans once your concept gains market traction.',
      whatToValidate:
        'Build direct farm-gate exclusivity contracts and deep customer community bonds that cannot be cloned by corporate PR.',
      provenance: 'AI_INFERENCE',
    },
    {
      id: 'risk_5',
      risk: 'Price Premium Resistance During Macroeconomic Belt-Tightening',
      category: 'pricing_pressure',
      likelihood: 'M',
      impact: 'M',
      whyItMatters:
        'Discretionary luxury subscriptions may experience higher churn during economic downturns.',
      whatToValidate:
        'Frame product not as luxury excess, but as superior daily unit value compared to costly cafe visits or wasted spend.',
      provenance: 'AI_INFERENCE',
    },
  ];

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

  // 11. AI Strategic Council Synthesis
  const specialistDebates: SpecialistPerspective[] = [
    {
      role: 'venture_strategy',
      roleName: 'Venture Strategist',
      badge: '♟️',
      keyPerspective:
        'The polarized competitive landscape creates a clear strategic entry wedge. Avoid competing with low-cost mass commodity players on price; win on uncompromised craft and verified transparency.',
      challengeOrCaveat:
        'Must ensure customer switching costs are near zero so that defecting from status-quo workarounds feels completely risk-free.',
    },
    {
      role: 'market_intelligence',
      roleName: 'Market Intelligence Lead',
      badge: '🧭',
      keyPerspective:
        'Incumbents are vulnerable because their scale prevents them from offering agile micro-batch freshness or direct farmer profit sharing.',
      challengeOrCaveat:
        'Beware of regional logistics bottlenecks: a 24-hour delay in express fulfillment destroys the core freshness proposition.',
    },
    {
      role: 'growth_marketing',
      roleName: 'Growth & Acquisition Specialist',
      badge: '📈',
      keyPerspective:
        'Do not start by bidding on competitive digital ads. Focus 100% of initial marketing on core enthusiasts who will post unboxing and taste reviews voluntarily.',
      challengeOrCaveat:
        'Organic referral velocity must reach a minimum 20% coefficient before paid customer acquisition can be sustained profitably.',
    },
    {
      role: 'challenger',
      roleName: 'Challenger / Red Team',
      badge: '🥊',
      keyPerspective:
        'Founders consistently underestimate customer habit inertia. People drink mediocre coffee or use messy spreadsheets for years without changing. Your trial experience must be 10x better in 60 seconds.',
      challengeOrCaveat:
        'If the first order packaging is confusing or late, 80% of subscription prospects will immediately churn.',
    },
    {
      role: 'evaluator',
      roleName: 'Evidence Evaluator',
      badge: '⚖️',
      keyPerspective:
        'Current market sizing is preliminary and unverified. Sizing must be backed by concrete local ICP counts and confirmed ACV commitments.',
      challengeOrCaveat:
        'Do not scale inventory or marketing expenditure until pre-order deposits prove real willingness to pay.',
    },
    {
      role: 'brand',
      roleName: 'Brand Architect',
      badge: '🏛️',
      keyPerspective:
        'Position the brand as "The Craftsman / Sage": uncompromising standards, radically transparent, and deeply respectful of the customer’s discernment.',
      challengeOrCaveat:
        'Never use generic corporate sustainability buzzwords. Use concrete numbers: exact harvest dates, estate elevations, and farmer payouts.',
    },
  ];

  const aiCouncil: AICouncilSynthesis = {
    primaryConsensus:
      `The competitive landscape confirms a high-potential market opening for ${ventureName}. By bypassing commodity price wars and addressing the underserved mid-market with radical transparency and high craft, the venture can establish a defensible beachhead.`,
    criticalDivergence:
      'Challenger and Growth specialists warn that customer inertia to status-quo habits is severe. The initial onboarding and trial experience must eliminate all perceived risk before scaling broad acquisition.',
    founderActionRecommendation:
      'Focus the beachhead exclusively on Core Adopters. Secure supplier disclosure agreements and launch a 50-person pre-order cohort to validate repeat purchase intent before expanding brand spend.',
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
