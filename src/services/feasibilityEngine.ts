import type {
  ProjectState,
  FeasibilityReport,
  FeasibilityDimensionId,
  FeasibilityDimensionResult,
  FeasibilityRisk,
  FeasibilityAssumption,
  FeasibilityOpenQuestion,
  FeasibilityValidationTask,
  EvidenceItem,
  AssessmentRating,
  ConfidenceLevel,
} from '../types/project';

export function generateFeasibilityReport(state: ProjectState): FeasibilityReport {
  const { idea, businessModel, project } = state;
  const ventureName = idea.name || project.name || 'Untitled Venture';
  const productType = businessModel.productType || 'other';
  const deliveryModel = businessModel.deliveryModel || 'hybrid';
  const customerType = businessModel.customerType || 'b2c';
  const problem = idea.problem || idea.rawInput || 'Problem statement pending definition';
  const targetAudience = idea.targetAudience || 'Audience profile pending definition';
  const constraints = idea.constraints || '';
  const differentiation = idea.differentiation || '';
  const location = businessModel.location;
  const hasLocation = Boolean(location.country || location.cityRegion || location.operatingLocation);
  const locationString = hasLocation
    ? [location.cityRegion, location.country].filter(Boolean).join(', ') +
      (location.operatingLocation ? ` (${location.operatingLocation})` : '')
    : 'Unspecified geographic scope';

  // Helper to build evidence items
  const createEvidence = (
    id: string,
    type: 'verified' | 'ai-inference' | 'assumption' | 'needs-validation',
    label: string,
    content: string
  ): EvidenceItem => ({ id, type, label, content });

  // 1. Market Feasibility
  const marketEvidence: EvidenceItem[] = [
    createEvidence(
      'm1',
      idea.problem ? 'verified' : 'needs-validation',
      'Target Problem Definition',
      idea.problem ? `User-defined problem: "${problem}"` : 'Problem statement not yet crystallized in Stage 01'
    ),
    createEvidence(
      'm2',
      idea.targetAudience ? 'verified' : 'assumption',
      'Target Audience Clarity',
      idea.targetAudience ? `Target segment: "${targetAudience}"` : 'Target audience is assumed broadly without specific niche scoping'
    ),
    createEvidence(
      'm3',
      'ai-inference',
      'Problem Urgency Assessment',
      problem.length > 20
        ? `Problem articulation indicates an active pain point in the ${productType.toUpperCase()} category.`
        : 'Brief or undefined problem description increases risk of solving a non-urgent problem.'
    ),
  ];

  const marketRating: AssessmentRating =
    idea.problem && idea.targetAudience ? (idea.problem.length > 30 ? 'strong' : 'moderate') : 'needs-validation';
  const marketConfidence: ConfidenceLevel = idea.problem && idea.targetAudience ? 'medium' : 'low';

  const marketResult: FeasibilityDimensionResult = {
    id: 'market',
    name: 'Market Feasibility',
    rating: marketRating,
    confidence: marketConfidence,
    headline:
      marketRating === 'strong'
        ? 'Well-scoped pain point with identifiable target audience profile.'
        : marketRating === 'moderate'
        ? 'Plausible problem identified, but target market boundaries require sharper definition.'
        : 'Market demand remains hypothetical until problem urgency is documented.',
    reasoning: `The core thesis addresses "${problem.slice(0, 90)}...". Viability hinges on whether ${targetAudience} actively suffers from this friction frequently enough to prioritize seeking and adopting a new solution over their existing workaround.`,
    evidence: marketEvidence,
    assumptions: [
      `Assumes target audience (${targetAudience.slice(0, 40)}) recognizes this problem as a priority rather than an occasional inconvenience.`,
      'Assumes existing alternative solutions leave enough dissatisfaction to warrant switching.',
    ],
    missingInformation: [
      'Empirical willingness-to-pay signals from real prospect conversations.',
      'Quantified frequency of problem occurrence (daily/weekly vs. sporadic).',
    ],
    riskLevel: marketRating === 'strong' ? 'low' : marketRating === 'moderate' ? 'medium' : 'high',
  };

  // 2. Customer Feasibility
  const customerEvidence: EvidenceItem[] = [
    createEvidence(
      'c1',
      customerType ? 'verified' : 'assumption',
      'Customer Archetype',
      `Operating under ${customerType.toUpperCase()} relationship model.`
    ),
    createEvidence(
      'c2',
      'ai-inference',
      'Customer Reachability & Channel Access',
      customerType === 'b2b'
        ? 'B2B sales require identifying individual decision-makers, navigating procurement or pilot approval.'
        : customerType === 'd2c'
        ? 'D2C models require organic discovery or paid acquisition channels with favorable cost-per-click economics.'
        : 'Audience acquisition requires establishing a reliable channel before brand equity exists.'
    ),
    createEvidence(
      'c3',
      'needs-validation',
      'Switching Costs & Friction',
      'Default customer inertia favors doing nothing or sticking with familiar habits.'
    ),
  ];

  const customerRating: AssessmentRating = idea.targetAudience ? 'moderate' : 'needs-validation';
  const customerResult: FeasibilityDimensionResult = {
    id: 'customer',
    name: 'Customer Feasibility',
    rating: customerRating,
    confidence: idea.targetAudience ? 'medium' : 'low',
    headline:
      customerRating === 'moderate'
        ? 'Audience segment is identifiable, but acquisition friction and switching inertia are untested.'
        : 'Customer profile lacks behavioral definition necessary to evaluate acquisition reach.',
    reasoning: `Serving ${targetAudience} via ${customerType.toUpperCase()} implies clear acquisition dynamics. Customers already have entrenched habits, free alternatives, or manual workflows. Demonstrating clear 10x utility or emotional resonance is required to trigger initial trial.`,
    evidence: customerEvidence,
    assumptions: [
      `Assumes ${targetAudience.slice(0, 45)} is reachable through standard digital or community distribution channels without prohibitive acquisition costs.`,
      'Assumes the decision-maker and the end-user are aligned or that buyer incentives are straightforward.',
    ],
    missingInformation: [
      'Direct interview quotes regarding current solutions being used.',
      'Documented customer journey steps from trigger event to purchase.',
    ],
    riskLevel: 'medium',
  };

  // 3. Business Model Feasibility
  const bmEvidence: EvidenceItem[] = [
    createEvidence(
      'bm1',
      businessModel.productType ? 'verified' : 'needs-validation',
      'Monetization Core Structure',
      businessModel.productType
        ? `Categorized as ${productType.toUpperCase()} with ${deliveryModel.toUpperCase()} delivery.`
        : 'Core monetization mechanics pending selection in Idea Lab.'
    ),
    createEvidence(
      'bm2',
      'ai-inference',
      'Margin Dynamics & Unit Economics Logic',
      productType === 'physical'
        ? 'Gross margins must absorb raw materials, packaging, fulfillment, payment fees, and return allowances (typical minimum 60-70% gross margin needed for sustainable D2C).'
        : productType === 'saas'
        ? 'High gross margin structure (~75-85%), but cash flow is constrained by upfront development, compute, and payback periods on customer acquisition.'
        : productType === 'marketplace'
        ? 'Monetization via take-rate (typically 8-20%). Requires substantial Gross Merchandise Value (GMV) to cover customer support, fraud, and payment processing.'
        : productType === 'service'
        ? 'Direct cash flow from day one, but billable hours or labor capacity ceiling caps non-linear revenue growth without productized offerings.'
        : 'Revenue model depends on audience engagement depth and conversion rates to paid tiers.'
    ),
  ];

  const bmRating: AssessmentRating = businessModel.productType ? 'moderate' : 'needs-validation';
  const bmResult: FeasibilityDimensionResult = {
    id: 'business-model',
    name: 'Business Model Feasibility',
    rating: bmRating,
    confidence: businessModel.productType ? 'medium' : 'low',
    headline:
      bmRating === 'moderate'
        ? `${productType.toUpperCase()} revenue logic is viable, but unit contribution margin is unproven.`
        : 'Business model requires formal product classification to establish economic logic.',
    reasoning: `Structuring this as a ${productType} venture with ${deliveryModel} distribution provides a clear operational blueprint. However, until pricing tiers, payment velocity, and repeat purchase/renewal rates are tested against customer acquisition costs, the model remains an unvalidated hypothesis.`,
    evidence: bmEvidence,
    assumptions: [
      'Assumes pricing can be set high enough to achieve positive contribution margin after all acquisition and delivery costs.',
      'Assumes customer lifetime value (LTV) exceeds acquisition costs by at least 3:1 in mature operations.',
    ],
    missingInformation: [
      'Preliminary pricing tier or average order value (AOV) hypothesis.',
      'Estimated recurring frequency or repeat purchase cadence.',
    ],
    riskLevel: 'medium',
  };

  // 4. Operational Feasibility
  const opEvidence: EvidenceItem[] = [
    createEvidence(
      'op1',
      'ai-inference',
      'Fulfillment & Resource Requirements',
      productType === 'physical'
        ? 'Requires inventory storage, batch packaging, third-party logistics (3PL) or self-shipping, and return handling protocols.'
        : productType === 'saas'
        ? 'Requires production hosting, continuous uptime monitoring, user onboarding documentation, and automated customer support.'
        : productType === 'marketplace'
        ? 'Requires dispute resolution workflow, seller onboarding verification, payout handling, and trust/safety reviews.'
        : productType === 'service'
        ? 'Requires standardized service deliverable templates, client communication cadences, and contractor/employee bandwidth.'
        : 'Requires consistent content production cadence, community moderation, and engagement management.'
    ),
    createEvidence(
      'op2',
      constraints ? 'verified' : 'assumption',
      'Operational Constraints',
      constraints ? `Stated constraints: "${constraints}"` : 'No operational constraints stated in Idea Lab'
    ),
  ];

  const opRating: AssessmentRating =
    productType === 'service' || productType === 'creator' ? 'strong' : productType === 'saas' ? 'moderate' : 'moderate';
  const opResult: FeasibilityDimensionResult = {
    id: 'operational',
    name: 'Operational Feasibility',
    rating: opRating,
    confidence: 'medium',
    headline:
      productType === 'physical'
        ? 'Supply chain and logistics require physical coordination, working capital, and storage.'
        : productType === 'saas'
        ? 'Operational complexity is primarily digital infrastructure and developer maintenance.'
        : 'Operational workflows can be bootstrapped, but scaling requires documented standard operating procedures.',
    reasoning: `Operational execution depends directly on the ${productType} archetype. For ${deliveryModel} fulfillment, operational bottlenecks typically emerge in fulfillment speed, customer support response latency, or supplier dependencies rather than conceptual design.`,
    evidence: opEvidence,
    assumptions: [
      'Assumes external operational partners (3PLs, hosting providers, payment gateways) maintain standard SLAs.',
      'Assumes founding team or first hire has bandwidth to manage day-to-day operations during initial rollout.',
    ],
    missingInformation: [
      'Supplier lead times and minimum batch order terms (for physical products).',
      'Response time SLA commitments for customer queries.',
    ],
    riskLevel: productType === 'physical' ? 'high' : 'medium',
  };

  // 5. Technical Feasibility
  const techEvidence: EvidenceItem[] = [
    createEvidence(
      't1',
      'ai-inference',
      'Architecture & Implementation Scope',
      productType === 'saas'
        ? 'Requires web/mobile frontend, authenticated backend, database persistence, state management, and third-party API webhooks.'
        : productType === 'physical'
        ? 'Requires stable e-commerce storefront, inventory tracking integration, payment gateway compliance, and barcode/SKU management.'
        : productType === 'marketplace'
        ? 'Requires two-sided database schemas, escrow/split payment APIs, geo-search/filtering, and real-time messaging.'
        : 'Standard digital toolstack (CMS, CRM, booking engines, or community platforms) is sufficient without custom software engineering.'
    ),
    createEvidence(
      't2',
      'ai-inference',
      'Technology Risk Profile',
      productType === 'saas' || productType === 'marketplace'
        ? 'Medium technology risk: complexity lies in edge-case handling, data security, and latency rather than uninvented science.'
        : 'Low technology risk: can be launched using mature, off-the-shelf commercial platforms.'
    ),
  ];

  const techRating: AssessmentRating =
    productType === 'physical' || productType === 'service' || productType === 'community' || productType === 'creator'
      ? 'strong'
      : productType === 'saas'
      ? 'moderate'
      : 'needs-validation';

  const techResult: FeasibilityDimensionResult = {
    id: 'technical',
    name: 'Technical Feasibility',
    rating: techRating,
    confidence: 'high',
    headline:
      techRating === 'strong'
        ? 'Standard off-the-shelf technology stack exists; zero custom research & development barriers.'
        : 'Feasible using established web/cloud technologies; architecture requires disciplined scoping.',
    reasoning: `Evaluating technical constraints for a ${productType} business shows no reliance on untested fundamental science. The core challenge is engineering discipline—building an MVP focused strictly on the core value loop rather than over-engineering secondary features.`,
    evidence: techEvidence,
    assumptions: [
      'Assumes standard SaaS/cloud infrastructure (APIs, auth, databases, payments) meets all functional requirements.',
      'Assumes no specialized hardware, regulatory hardware testing, or proprietary ML training is immediately mandatory.',
    ],
    missingInformation: [
      'Technical specification of core user workflow and third-party integrations needed.',
      'Expected data storage and API throughput requirements at MVP scale.',
    ],
    riskLevel: productType === 'saas' ? 'medium' : 'low',
  };

  // 6. Financial / Economic Feasibility
  const finEvidence: EvidenceItem[] = [
    createEvidence(
      'f1',
      'ai-inference',
      'Cost Structure Fundamentals',
      productType === 'physical'
        ? 'High initial working capital needed for inventory batches, packaging tooling, and shipping deposit reserves.'
        : productType === 'saas'
        ? 'Low marginal cost per user, but fixed engineering/tooling overhead requires runway before achieving cash-flow break-even.'
        : 'Variable cost structure directly tied to labor hours and client acquisition spend.'
    ),
    createEvidence(
      'f2',
      'needs-validation',
      'Pricing & Gross Margin Proof',
      'Precise profitability cannot be asserted without empirical cost-of-goods and validated customer willingness-to-pay.'
    ),
  ];

  const finResult: FeasibilityDimensionResult = {
    id: 'financial',
    name: 'Financial & Economic Feasibility',
    rating: 'needs-validation',
    confidence: 'medium',
    headline: 'Economic logic is plausible, but unit economics and customer acquisition costs require validation.',
    reasoning: `In accordance with strict hackathon protocol, no fabricated revenue projections or arbitrary IRR/NPV figures are presented. Economic feasibility currently depends on proving that the gross margin per transaction or customer subscription sufficiently exceeds blended Customer Acquisition Cost (CAC) plus operational overhead.`,
    evidence: finEvidence,
    assumptions: [
      'Assumes the target customer has disposable budget or corporate discretionary spend allocated for this problem.',
      'Assumes payback period on customer acquisition can be kept under 6–12 months.',
    ],
    missingInformation: [
      'Quoted supplier costs, API usage unit costs, or raw material estimates.',
      'Validated customer price sensitivity benchmarks.',
    ],
    riskLevel: 'high',
  };

  // 7. Location / Geographic Feasibility
  const locEvidence: EvidenceItem[] = [
    createEvidence(
      'l1',
      hasLocation ? 'verified' : 'needs-validation',
      'Geographic Operating Context',
      hasLocation
        ? `Operating jurisdiction: ${locationString}`
        : 'Geographic scope was left unspecified in Stage 01 Idea Lab.'
    ),
    createEvidence(
      'l2',
      'ai-inference',
      'Regional Regulatory & Distribution Realities',
      hasLocation
        ? `Local operations in ${location.country || 'the target region'} involve jurisdiction-specific tax compliance, domestic payment gateways, and regional logistics carriers.`
        : 'Without a declared geography, shipping corridors, payment gateway regulations, and currency risks cannot be evaluated.'
    ),
  ];

  const locRating: AssessmentRating = hasLocation ? 'strong' : 'needs-validation';
  const locResult: FeasibilityDimensionResult = {
    id: 'location',
    name: 'Location & Geographic Feasibility',
    rating: locRating,
    confidence: hasLocation ? 'high' : 'low',
    headline: hasLocation
      ? `Operating scope grounded in ${locationString}; regional logistics & compliance can be mapped.`
      : 'Geographic scope unspecified — requires geographical operating boundary definition.',
    reasoning: hasLocation
      ? `Anchoring the business in ${locationString} provides tangible boundaries for customer reach, regulatory laws, tax filing, and localized customer acquisition channels.`
      : 'A business without a defined geographic center risks treating the entire world as its market, leading to fragmented marketing spend and undefined distribution mechanics.',
    evidence: locEvidence,
    assumptions: [
      hasLocation
        ? `Assumes initial target market is concentrated within ${location.country || 'the primary region'} before cross-border expansion.`
        : 'Assumes the venture will select an initial beachhead geography before committing capital.',
    ],
    missingInformation: [
      hasLocation
        ? `Local commercial licensing or merchant registration requirements in ${location.country || 'target market'}.`
        : 'Target operating city, region, and primary delivery radius.',
    ],
    riskLevel: hasLocation ? 'low' : 'high',
  };

  // 8. Competitive Feasibility
  const compEvidence: EvidenceItem[] = [
    createEvidence(
      'cp1',
      differentiation ? 'verified' : 'assumption',
      'Claimed Strategic Differentiation',
      differentiation
        ? `User-defined differentiator: "${differentiation}"`
        : 'Differentiation angle not yet documented; risk of entering as an undifferentiated parity offering.'
    ),
    createEvidence(
      'cp2',
      'needs-validation',
      'Competitive Landscape Reality',
      'Real-world competitor pricing, market share, and incumbent moat data must be gathered in Stage 03 — Market Intelligence.'
    ),
  ];

  const compResult: FeasibilityDimensionResult = {
    id: 'competitive',
    name: 'Competitive Feasibility',
    rating: 'needs-validation',
    confidence: 'low',
    headline: 'Competitive feasibility is pending empirical validation in Stage 03 (Market Intelligence).',
    reasoning: `No competitors are fabricated here to artificially complete a chart. In any viable market, customers already spend time or money on direct competitors, legacy incumbents, or crude DIY workarounds. The true defensibility of "${ventureName}" can only be assessed after conducting competitive discovery in Stage 03.`,
    evidence: compEvidence,
    assumptions: [
      'Assumes incumbents are slow to adapt, overpriced, or lack the specialized focus of this venture.',
      'Assumes the claimed differentiation is noticeable and meaningful to customers at the moment of choice.',
    ],
    missingInformation: [
      'Direct audit of 3–5 existing commercial competitors.',
      'Detailed feature and pricing comparison matrix against current market leaders.',
    ],
    riskLevel: 'high',
  };

  // 9. Execution Feasibility
  const execEvidence: EvidenceItem[] = [
    createEvidence(
      'ex1',
      'ai-inference',
      'Founder Capability & Execution Velocity',
      `Execution requires combining domain knowledge, ${productType.toUpperCase()} product execution, and disciplined customer outreach.`
    ),
    createEvidence(
      'ex2',
      idea.goals ? 'verified' : 'assumption',
      'Milestone Alignment',
      idea.goals ? `Stated goals: "${idea.goals}"` : 'Milestone roadmap pending development in downstream stages.'
    ),
  ];

  const execRating: AssessmentRating = idea.goals ? 'moderate' : 'moderate';
  const execResult: FeasibilityDimensionResult = {
    id: 'execution',
    name: 'Execution Feasibility',
    rating: execRating,
    confidence: 'medium',
    headline: 'Execution path is achievable if scoped to an austere MVP focused on the single core value transaction.',
    reasoning: `The primary threat to execution is scope creep—attempting to build full parity with established brands before proving that early adopters will complete a single core transaction. Success depends on maintaining focus on validation tasks rather than premature scaling.`,
    evidence: execEvidence,
    assumptions: [
      'Assumes the founder or core team can dedicate focused weekly hours to customer discovery and delivery.',
      'Assumes the MVP can be deployed within 4–8 weeks using available tools.',
    ],
    missingInformation: [
      'Exact weekly time commitment and technical/domain competency of the core team.',
      'Available bootstrap runway or pre-seed capital budget.',
    ],
    riskLevel: 'medium',
  };

  const dimensions: Record<FeasibilityDimensionId, FeasibilityDimensionResult> = {
    market: marketResult,
    customer: customerResult,
    'business-model': bmResult,
    operational: opResult,
    technical: techResult,
    financial: finResult,
    location: locResult,
    competitive: compResult,
    execution: execResult,
  };

  // Categorized Risks
  const risks: FeasibilityRisk[] = [
    {
      id: 'risk_market_urgency',
      dimension: 'market',
      title: 'Problem Urgency Disconnect',
      category: 'Market Risk',
      severity: marketRating === 'needs-validation' ? 'critical' : 'high',
      whyItMatters: 'If prospects view the problem as merely annoying rather than painful, sales cycles lengthen and conversion drops.',
      validationTest: 'Conduct 10 prospect interviews; ask how much time or money they currently spend attempting to solve this.',
      mitigation: 'Sharpen the problem framing to focus strictly on prospects experiencing measurable loss or high frustration.',
    },
    {
      id: 'risk_cac_margin',
      dimension: 'financial',
      title: 'Customer Acquisition Cost Exceeds Margin',
      category: 'Financial Risk',
      severity: 'high',
      whyItMatters: 'If digital ad or sales outreach costs surpass gross margin per customer, scaling accelerates cash drain.',
      validationTest: 'Run a localized smoke test or outbound inquiry campaign to calculate initial cost-per-lead.',
      mitigation: 'Incorporate viral loops, organic niche community distribution, or high-touch referral incentives from day one.',
    },
    {
      id: 'risk_operational_delay',
      dimension: 'operational',
      title: productType === 'physical' ? 'Supplier MOQ and Batch Defects' : 'Onboarding & Deployment Bottlenecks',
      category: 'Operational Risk',
      severity: productType === 'physical' ? 'high' : 'medium',
      whyItMatters: productType === 'physical'
        ? 'High minimum order quantities tie up scarce capital in unsold inventory.'
        : 'Clunky onboarding leads to rapid user drop-off before core value is perceived.',
      validationTest: productType === 'physical'
        ? 'Request formal quotes and minimum sample runs from at least 3 suppliers.'
        : 'Watch 5 target users attempt to onboard without external coaching.',
      mitigation: productType === 'physical'
        ? 'Negotiate small pilot batches or contract with white-label/on-demand partners.'
        : 'Build a frictionless 2-minute time-to-value onboarding pathway.',
    },
    {
      id: 'risk_competitive_inertia',
      dimension: 'competitive',
      title: 'Incumbent Entrenchment & Customer Inertia',
      category: 'Competitive Risk',
      severity: 'high',
      whyItMatters: 'Customers often choose the safe, familiar brand or stick with free manual workarounds.',
      validationTest: 'Survey target prospects on what exact trigger would make them switch away from their existing solution.',
      mitigation: 'Deep-dive competitive positioning in Stage 03 to identify underserved whitespace and unaddressed wedge angles.',
    },
    {
      id: 'risk_location_logistics',
      dimension: 'location',
      title: hasLocation ? 'Regional Distribution & Compliance Friction' : 'Undefined Operating Jurisdiction',
      category: 'Location Risk',
      severity: hasLocation ? 'medium' : 'high',
      whyItMatters: 'Unanticipated local taxation, shipping courier delays, or payment gateway chargebacks erode early operating trust.',
      validationTest: hasLocation
        ? `Audit logistics rate cards and domestic tax/regulatory filings in ${location.country || 'operating region'}.`
        : 'Select and document a primary geographic launch market in Idea Lab.',
      mitigation: hasLocation
        ? 'Partner with established regional fulfillment carriers with integrated tracking.'
        : 'Constrain launch scope to one focused city or metropolitan cluster.',
    },
    {
      id: 'risk_execution_scope',
      dimension: 'execution',
      title: 'Premature Complexity & Feature Creep',
      category: 'Execution Risk',
      severity: 'medium',
      whyItMatters: 'Trying to build an all-in-one platform delays launch, burns runway, and confuses early users.',
      validationTest: 'Define the single atomic transaction of value; test whether users will pay for only that transaction.',
      mitigation: 'Impose strict MVP constraints: ship only features indispensable to the core value exchange.',
    },
  ];

  // Assumptions
  const assumptions: FeasibilityAssumption[] = [
    {
      id: 'assump_1',
      dimension: 'market',
      statement: `Target segment (${targetAudience.slice(0, 50)}) actively recognizes this pain point as an unfulfilled priority.`,
      impact: 'critical',
      validationMethod: '10–15 founder-led customer discovery interviews without pitching the solution.',
    },
    {
      id: 'assump_2',
      dimension: 'business-model',
      statement: 'Pricing can be sustained at a level that produces healthy contribution margins after fulfillment and acquisition.',
      impact: 'high',
      validationMethod: 'Pre-order landing page test or price sensitivity meter survey during interviews.',
    },
    {
      id: 'assump_3',
      dimension: 'operational',
      statement: `Key operations for ${productType} delivery can be reliably handled with early-stage tooling and partners.`,
      impact: 'medium',
      validationMethod: 'Run a manual concierge test delivering the service/product by hand to 3 early adopters.',
    },
    {
      id: 'assump_4',
      dimension: 'location',
      statement: hasLocation
        ? `Market density in ${locationString} is sufficient to achieve initial traction without heavy cross-border overhead.`
        : 'Initial customer geography will be concentrated in a single accessible market.',
      impact: 'medium',
      validationMethod: 'Verify localized search volume and active communities in the chosen geography.',
    },
  ];

  // Open Questions
  const openQuestions: FeasibilityOpenQuestion[] = [
    {
      id: 'q1',
      dimension: 'market',
      question: 'What is the exact trigger event that makes a customer stop searching and finally purchase?',
      urgency: 'immediate',
      context: 'Understanding the buying trigger unlocks high-converting marketing copy and precise sales timing.',
    },
    {
      id: 'q2',
      dimension: 'competitive',
      question: 'Who are the top 3 direct competitors or alternative workarounds, and why do customers stay with them?',
      urgency: 'immediate',
      context: 'Must be thoroughly explored in Stage 03 — Market Intelligence.',
    },
    {
      id: 'q3',
      dimension: 'financial',
      question: 'What is the absolute maximum CAC the business can tolerate before a customer becomes unprofitable?',
      urgency: 'pre-launch',
      context: 'Determines whether paid advertising is economically viable or if organic GTM is mandatory.',
    },
    {
      id: 'q4',
      dimension: 'operational',
      question: productType === 'physical'
        ? 'What are the supplier lead times, payment terms, and defective batch return policies?'
        : 'What third-party API dependencies could break or change pricing at scale?',
      urgency: 'pre-launch',
      context: 'Essential for disaster recovery planning and reliable customer promise fulfillment.',
    },
  ];

  // Concrete Validation Tasks
  const validationTasks: FeasibilityValidationTask[] = [
    {
      id: 'task_1',
      dimension: 'market',
      title: 'Problem Urgency Discovery Interviews',
      action: 'Interview 10 individuals matching target audience criteria. Ask open-ended questions about their past attempts to solve the problem.',
      expectedOutput: 'Documented interview notes with exact quotes on pain points, workarounds, and willingness to switch.',
      completed: false,
    },
    {
      id: 'task_2',
      dimension: 'competitive',
      title: 'Competitive Benchmark Audit in Market Intelligence',
      action: 'Map 3 direct and 2 indirect competitors in Stage 03. Document their pricing models, core claims, and customer reviews.',
      expectedOutput: 'Competitive matrix highlighting underserved niche opportunities and positioning whitespace.',
      completed: false,
    },
    {
      id: 'task_3',
      dimension: 'financial',
      title: 'Unit Contribution Margin Worksheet',
      action: 'Calculate direct cost per unit (materials/APIs/payment gateway/packaging) against preliminary price tiers.',
      expectedOutput: 'Spreadsheet or model demonstrating minimum 50-70% gross margin target.',
      completed: false,
    },
    {
      id: 'task_4',
      dimension: 'customer',
      title: 'Smoke Test / Landing Page Signal',
      action: 'Set up a 1-page value proposition summary with an email waitlist or deposit button to measure authentic intent.',
      expectedOutput: 'Minimum 5–10% conversion rate on qualified visitors indicating genuine demand.',
      completed: false,
    },
    {
      id: 'task_5',
      dimension: 'location',
      title: 'Regional Logistics & Compliance Verification',
      action: hasLocation
        ? `Confirm merchant payment processing and domestic shipping partner rates in ${location.country || 'operating territory'}.`
        : 'Define specific operating city and country inside Stage 01 Idea Lab.',
      expectedOutput: 'Clear rate card for delivery and confirmed merchant account readiness.',
      completed: false,
    },
  ];

  // Overall Decision & Rationale
  let overallStatus = 'Promising — Requires Empirical Unit Validation';
  let overallScoreExplanation = '';

  if (marketRating === 'strong' && hasLocation && businessModel.productType) {
    overallStatus = 'Strong Concept — Operational & Competitive Validation Required';
    overallScoreExplanation =
      'The venture has clear problem-solution grounding and defined operating scope. The principal uncertainties lie in unit economics payback, supplier/tech operational friction, and competitive positioning against existing alternatives.';
  } else if (!businessModel.productType || marketRating === 'needs-validation') {
    overallStatus = 'Early Concept — Core Discovery Incomplete';
    overallScoreExplanation =
      'Key foundation vectors (product type classification, problem sharpness, or target audience profile) require further grounding in Stage 01 Idea Lab before capital or engineering feasibility can be reliably confirmed.';
  } else {
    overallStatus = 'Promising — Requires Empirical Unit Validation';
    overallScoreExplanation =
      'The business concept addresses a plausible customer friction with identifiable operational mechanics. However, financial margins, real-world customer acquisition costs, and competitive defensibility remain unvalidated hypotheses until Stage 03 market research is completed.';
  }

  const promisingAspects: string[] = [
    `Clear identification of the ${productType.toUpperCase()} category enables direct operational scoping.`,
    problem.length > 25
      ? `Specific pain point articulated: "${problem.slice(0, 80)}...".`
      : 'Identified problem space addresses tangible user friction.',
    hasLocation
      ? `Anchored in ${locationString}, enabling focused regional rollout rather than scattered global spend.`
      : 'Concept possesses flexibility to select an optimal beachhead geography.',
    'Technology requirements rely on established, off-the-shelf software tools rather than speculative R&D.',
  ];

  const criticalUncertainties: string[] = [
    'Real customer willingness-to-pay has not been validated with financial commitment or pre-orders.',
    'Competitive landscape, incumbent pricing moats, and alternative substitutes are unmapped (pending Stage 03).',
    'Customer Acquisition Cost (CAC) vs. Customer Lifetime Value (LTV) ratio is entirely unproven.',
    !hasLocation ? 'Geographic operating constraints are undefined.' : 'Logistics carrier SLAs and return rates need verification.',
  ];

  const potentialBlockers: string[] = [
    'Failure to achieve minimum 50–65% gross margin after all packaging, gateway, and delivery fees.',
    'Customer inertia: target audience choosing the "do nothing" or free manual workaround habit.',
    'Underestimating the cost and difficulty of reaching early adopters without existing brand trust.',
  ];

  // Handoff to Stage 03 — Market Intelligence
  const handoffToMarketIntelligence: FeasibilityReport['handoffToMarketIntelligence'] = {
    timestamp: new Date().toISOString(),
    upstreamVentureName: ventureName,
    upstreamProductType: productType,
    competitorResearchNeeds: [
      `Identify the top 3 commercial competitors currently serving ${targetAudience}.`,
      `Investigate pricing models and contract terms of existing solutions for "${problem.slice(0, 50)}...".`,
      'Analyze 1-star and 2-star reviews of market leaders to isolate customer dissatisfaction angles.',
    ],
    audienceValidationNeeds: [
      `Validate whether ${targetAudience} actively searches for solutions or requires outbound disruption.`,
      'Determine decision-making timeline and key purchasing criteria.',
    ],
    pricingBenchmarksToStudy: [
      'Current price range of entry-level, mid-tier, and premium alternatives in the market.',
      'Prevailing billing cadence (one-time purchase vs. monthly subscription vs. performance fee).',
    ],
    geographicRegulatoryQueries: [
      hasLocation
        ? `Regional market size and consumer spending habits in ${locationString}.`
        : 'Identify top 3 metropolitan hubs with highest concentration of target prospects.',
      'Verify regulatory standards, consumer protection laws, or certifications required in the category.',
    ],
    criticalAssumptionsToTest: assumptions.map((a) => a.statement),
  };

  return {
    id: `feas_rep_${Date.now()}`,
    generatedAt: new Date().toISOString(),
    overallStatus,
    overallScoreExplanation,
    dimensions,
    risks,
    assumptions,
    openQuestions,
    validationTasks,
    promisingAspects,
    criticalUncertainties,
    potentialBlockers,
    handoffToMarketIntelligence,
  };
}
