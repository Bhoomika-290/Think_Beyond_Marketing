import type {
  ProjectState,
  BrandRoadmapReport,
  BrandDNANode,
  DifferentiatorCandidate,
  PositioningStatement,
  BrandPersonalityTrait,
  BrandVoiceAttribute,
  TaglineDirection,
  LogoConcept,
  ColorSwatch,
  TypographyPair,
  CustomerTouchpoint,
  RoadmapMilestone,
  IdentityAuditStatus,
  BrandTransformationMilestone,
  CompetitorRoadmapItem,
  CompetitorPatternComparison,
  FounderLearningResource,
  BrandStrategicDecisionsData,
  CompetitorItem,
} from '../types/project';
import { generateMarketIntelligenceReport } from './marketIntelligenceEngine';

export function generateBrandRoadmapReport(state: ProjectState): BrandRoadmapReport {
  const { idea, businessModel, project, marketIntelligence, feasibility } = state;
  const ventureName = idea.name || project.name || 'Untitled Venture';
  const category = businessModel.productType || 'venture';
  const targetAudience = idea.targetAudience || 'Discerning early adopters & target market';
  const problem = idea.problem || idea.rawInput || 'Status-quo friction with legacy alternatives';
  const defaultDiff =
    idea.differentiation ||
    marketIntelligence?.differentiatorEngine?.opportunities?.[0]?.differentiationArea ||
    'Radical operational transparency and specialized craft';

  const initials =
    ventureName
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'TB';

  // 1. BRAND DNA NODES (Connected visual system of 9 strategic elements)
  const brandDnaNodes: BrandDNANode[] = [
    {
      id: 'dna_cust',
      label: 'Target Customer',
      value: targetAudience,
      whatItMeans: 'The exact persona or business segment experiencing the pain acutely right now.',
      source: 'Stage 01 Idea Lab Discovery',
      originatingStage: '01 Idea Lab',
      evidenceState: idea.targetAudience ? 'USER INPUT' : 'AI INFERENCE',
      howItAffectsBrand: 'Dictates the tone, visual sophistication, and pricing accessibility of the brand identity.',
      reasoning: 'Directly sourced from the founder’s target audience profile defined during initial discovery.',
    },
    {
      id: 'dna_prob',
      label: 'Core Problem',
      value: problem.length > 70 ? problem.slice(0, 67) + '...' : problem,
      whatItMeans: 'The acute point of friction and dissatisfaction with current market alternatives.',
      source: 'Stage 01 Problem Definition',
      originatingStage: '01 Idea Lab',
      evidenceState: idea.problem ? 'USER INPUT' : 'AI INFERENCE',
      howItAffectsBrand: 'Forms the narrative adversary in all brand copy, headlines, and value propositions.',
      reasoning: 'The acute friction point in the customer’s status quo that the brand exists to dismantle.',
    },
    {
      id: 'dna_need',
      label: 'Customer Need',
      value: 'Uncompromised quality paired with verifiable origin transparency and predictable delivery.',
      whatItMeans: 'The deeper functional and emotional job-to-be-done that the customer seeks to fulfill.',
      source: 'Stage 03 Customer Segments Analysis',
      originatingStage: '03 Market Intelligence',
      evidenceState: 'AI INFERENCE',
      howItAffectsBrand: 'Determines the core product benefits and customer onboarding journey requirements.',
      reasoning: 'Synthesized from buyer friction patterns observed across legacy and commodity competitors.',
    },
    {
      id: 'dna_purp',
      label: 'Brand Purpose',
      value: `To liberate ${targetAudience.slice(0, 30)} from opaque compromises by establishing an open benchmark.`,
      whatItMeans: 'The foundational why that drives the company beyond immediate transactional margin.',
      source: 'Stage 04 Brand Strategy Synthesis',
      originatingStage: '04 Brand Strategy',
      evidenceState: 'AI INFERENCE',
      howItAffectsBrand: 'Guides company culture, public advocacy, community initiatives, and long-term brand equity.',
      reasoning: 'Anchored in the contrast between traditional profit extraction and transparent craft partnership.',
    },
    {
      id: 'dna_prom',
      label: 'Brand Promise',
      value: '100% operational transparency and verifiable craft standards in every single delivery.',
      whatItMeans: 'The inviolable contract made to every customer on every purchase.',
      source: 'Stage 04 Brand Promise Charter',
      originatingStage: '04 Brand Strategy',
      evidenceState: 'AI INFERENCE',
      howItAffectsBrand: 'Sets the benchmark for customer service, return policies, and product packaging details.',
      reasoning: 'The foundational commitment made to the customer that guides all product and messaging decisions.',
    },
    {
      id: 'dna_val',
      label: 'Core Value',
      value: feasibility?.promisingAspects?.[0] || 'Empirical authenticity over marketing posturing.',
      whatItMeans: 'The guiding internal principle that overrides expediency or cheap shortcuts.',
      source: 'Stage 02 Feasibility Assessment',
      originatingStage: '02 Feasibility',
      evidenceState: feasibility ? 'VERIFIED' : 'ASSUMPTION',
      howItAffectsBrand: 'Prevents brand dilution and guides design choices toward minimalism and substance.',
      reasoning: 'Validated by unit economics, operational feasibility assessments, and customer pain intensity.',
    },
    {
      id: 'dna_gap',
      label: 'Market Gap',
      value: 'Absence of an accessible premium brand that pairs artisanal craft with automated reliability.',
      whatItMeans: 'The structural void in the competitive landscape that incumbents fail to address.',
      source: 'Stage 03 Opportunity Whitespace Map',
      originatingStage: '03 Market Intelligence',
      evidenceState: 'AI INFERENCE',
      howItAffectsBrand: 'Defines the open territory on the positioning matrix that the brand claims as its wedge.',
      reasoning: 'Derived from polarization between mass low-trust commodities and erratic boutique retainers.',
    },
    {
      id: 'dna_diff',
      label: 'Differentiator',
      value: defaultDiff,
      whatItMeans: 'The unique, defensible mechanism that competitors cannot easily copy or ignore.',
      source: 'Stage 01 Idea Lab / Stage 03 Differentiator Engine',
      originatingStage: '01 Idea Lab',
      evidenceState: idea.differentiation ? 'USER INPUT' : 'AI INFERENCE',
      howItAffectsBrand: 'Powers the core tagline, sales scripts, comparison pages, and hero packaging.',
      reasoning: 'The primary competitive moat that makes alternatives irrelevant for the target segment.',
    },
    {
      id: 'dna_perc',
      label: 'Desired Perception',
      value: 'The undisputed, honest benchmark: uncompromising in standards, refreshingly direct, and indispensable.',
      whatItMeans: 'What customers say about the brand to their peers when the founder is not in the room.',
      source: 'Stage 04 Brand Architecture',
      originatingStage: '04 Brand Strategy',
      evidenceState: 'AI INFERENCE',
      howItAffectsBrand: 'Drives visual identity restraint, editorial typography selection, and customer delight rituals.',
      reasoning: 'Represents the intended mental positioning achieved through consistent touchpoint execution.',
    },
  ];

  // 2. MARKET GAP -> BRAND DIFFERENTIATOR
  const differentiatorCandidates: DifferentiatorCandidate[] = [
    {
      id: 'diff_1',
      competitorPattern: 'Mass commodity providers rely on opaque blended supply and high-margin markups.',
      customerNeed: 'Provable origin authenticity and transparent cost-breakdown per unit.',
      marketGap: 'No mainstream brand publishes raw batch lot numbers or farmer/creator compensation math.',
      opportunity: 'Own the radical transparency niche and convert skeptical connoisseurs into brand zealots.',
      differentiator: defaultDiff,
      brandPosition: 'The Verified Craft Benchmark for Modern Buyers',
      evidenceState: idea.differentiation ? 'VERIFIED' : 'INFERRED',
      reasoning: 'Exploits the credibility deficit of legacy incumbents by open-sourcing operational provenance.',
      isSelected: true,
    },
    {
      id: 'diff_2',
      competitorPattern: 'High-end boutique players operate with erratic drops, slow fulfillment, and snooty gatekeeping.',
      customerNeed: 'Dependable frictionless subscription cadence with zero snobbery.',
      marketGap: 'Reliable weekly/monthly recurring delivery with consistent flavor/output profiling.',
      opportunity: 'Deliver specialty luxury quality with software-grade operational reliability.',
      differentiator: 'Predictable On-Demand Cadence with Zero Gatekeeping Friction',
      brandPosition: 'The Modern High-Fidelity Everyday Standard',
      evidenceState: 'INFERRED',
      reasoning: 'Combines the artisanal excellence of boutique roasters/studios with seamless modern UX.',
      isSelected: false,
    },
    {
      id: 'diff_3',
      competitorPattern: 'Enterprise legacy suites charge exorbitant recurring fees with 60-day onboarding lag.',
      customerNeed: 'Instant 60-second time-to-value and clear ROI attribution on Day 1.',
      marketGap: 'Self-serve, lightweight, zero-cookie attribution platform tailored specifically for mid-market founders.',
      opportunity: 'Capture underserved SMBs and high-growth challenger brands before they get locked into enterprise bloat.',
      differentiator: 'Instant Zero-Friction Setup with Real Net-Margin Attribution',
      brandPosition: 'The Pragmatic Growth Engine for Agile Operators',
      evidenceState: 'ASSUMPTION',
      reasoning: 'Directly solves switching fatigue by removing implementation risk.',
      isSelected: false,
    },
  ];

  // 3. POSITIONING STATEMENT
  const unlikeTarget =
    marketIntelligence?.competitors?.[0]?.name ||
    'legacy incumbents and opaque commodity providers';

  const positioningStatement: PositioningStatement = {
    forTarget: targetAudience,
    whoProblem: problem.length > 60 ? problem.slice(0, 58) + '...' : problem,
    category: `${category.toUpperCase()} solution`,
    valuePromise: 'delivers verified craft quality with uncompromising operational transparency',
    unlikeAlternative: unlikeTarget,
    becauseDifferentiator: defaultDiff,
    fullStatement: `For ${targetAudience}, who ${problem.length > 60 ? problem.slice(0, 58) + '...' : problem}, our brand is a ${category.toUpperCase()} solution that delivers verified craft quality with uncompromising operational transparency, unlike ${unlikeTarget}, because ${defaultDiff}.`,
  };

  // 4. BRAND PERSONALITY SPECTRUMS (All 7 pairs from prompt)
  const personalityTraits: BrandPersonalityTrait[] = [
    {
      id: 'pers_1',
      leftLabel: 'Professional',
      rightLabel: 'Playful',
      userValue: 28,
      aiValue: 25,
      rationale: 'High rigor and authority, tempered with warmth to prevent clinical coldness.',
      isUserModified: false,
    },
    {
      id: 'pers_2',
      leftLabel: 'Minimal',
      rightLabel: 'Expressive',
      userValue: 32,
      aiValue: 30,
      rationale: 'Restrained, utilitarian design system that lets the quality of work speak directly.',
      isUserModified: false,
    },
    {
      id: 'pers_3',
      leftLabel: 'Premium',
      rightLabel: 'Accessible',
      userValue: 45,
      aiValue: 40,
      rationale: 'Approachable luxury: high craft value without artificial exclusivity markups.',
      isUserModified: false,
    },
    {
      id: 'pers_4',
      leftLabel: 'Bold',
      rightLabel: 'Calm',
      userValue: 68,
      aiValue: 65,
      rationale: 'Calm, confident reassurance rather than loud, disruptive marketing posturing.',
      isUserModified: false,
    },
    {
      id: 'pers_5',
      leftLabel: 'Traditional',
      rightLabel: 'Modern',
      userValue: 80,
      aiValue: 75,
      rationale: 'Embraces forward-looking transparency tools, clean code, and modern digital delivery.',
      isUserModified: false,
    },
    {
      id: 'pers_6',
      leftLabel: 'Technical',
      rightLabel: 'Human',
      userValue: 65,
      aiValue: 70,
      rationale: 'Speaks clearly without esoteric jargon; empathetic to real everyday customer pain.',
      isUserModified: false,
    },
    {
      id: 'pers_7',
      leftLabel: 'Serious',
      rightLabel: 'Energetic',
      userValue: 40,
      aiValue: 35,
      rationale: 'Earnest dedication to the craft with steady, dependable focus.',
      isUserModified: false,
    },
  ];

  // 5. BRAND VOICE (Traits, DOs, DON'Ts, and Before/After Transformation)
  const voiceAttributes: BrandVoiceAttribute[] = [
    { id: 'v_clear', name: 'CLEAR', selected: true, description: 'Direct, plainspoken, and free of marketing fluff.' },
    { id: 'v_confident', name: 'CONFIDENT', selected: true, description: 'Understated authority grounded in empirical craft.' },
    { id: 'v_human', name: 'HUMAN', selected: true, description: 'Warm and empathetic; treats buyers as intelligent partners.' },
    { id: 'v_expert', name: 'EXPERT', selected: true, description: 'Deep domain fluency without condescension.' },
    { id: 'v_direct', name: 'DIRECT', selected: true, description: 'Gets straight to the point and addresses pricing openly.' },
    { id: 'v_premium', name: 'PREMIUM', selected: false, description: 'Elevated and deliberate aesthetic poise.' },
    { id: 'v_playful', name: 'PLAYFUL', selected: false, description: 'Witty and irreverent when contextual.' },
    { id: 'v_warm', name: 'WARM', selected: true, description: 'Welcoming, consultative, and reassuring.' },
  ];

  const brandVoice = {
    attributes: voiceAttributes,
    preview: {
      headline: `The Definitive Standard in ${category.toUpperCase()}.`,
      valueProposition: `We engineered ${ventureName} for operators who refuse to compromise on quality or tolerate opaque practices. Everything we build is open, verifiable, and designed to perform.`,
      supportSignoff: `Thoughtfully crafted. Built to last.`,
    },
    doGuidelines: [
      'Speak concisely and state numerical facts directly without hedging.',
      'Treat the customer as an expert peer who appreciates operational transparency.',
      'Highlight specific evidence, harvest dates, code latency, or unit margins.',
    ],
    dontGuidelines: [
      'Never use generic tech buzzwords like "all-in-one revolutionary game-changer".',
      'Avoid artificial urgency, fake discount countdowns, or hyperbolic promises.',
      'Do not hide pricing, shipping timelines, or cancelation terms behind sales walls.',
    ],
    transformation: {
      genericMessage: 'We provide an innovative, cutting-edge platform that seamlessly empowers users to revolutionize their daily experience.',
      brandVoiceMessage: `We verify the exact origin, margin, and performance of every unit before dispatch. No hidden fees, no opaque blends.`,
      contextNote: 'Transformed from generic hype into empirical, verifiable brand commitments.',
    },
  };

  // 6. TAGLINE WORKSPACE (6 Directions: benefit-led, emotional, challenger, premium, functional, aspirational)
  const taglineDirections: TaglineDirection[] = [
    {
      id: 'tag_benefit',
      tagline: `Stop Guessing. Know Your Margin.`,
      angle: 'Benefit-Led',
      rationale: 'Attacks customer anxiety directly by promising financial and operational clarity over status-quo confusion.',
      isSelected: false,
    },
    {
      id: 'tag_emotional',
      tagline: `Peace of Mind in Every Batch.`,
      angle: 'Emotional',
      rationale: 'Connects to the buyer’s underlying relief of knowing they are consuming an uncompromised product.',
      isSelected: false,
    },
    {
      id: 'tag_challenger',
      tagline: `Tired of Opaque Blends? Demand Provenance.`,
      angle: 'Challenger',
      rationale: 'Provokes the buyer to question legacy market standards and take an ethical stance.',
      isSelected: false,
    },
    {
      id: 'tag_premium',
      tagline: `Crafted Without Compromise.`,
      angle: 'Premium',
      rationale: 'Emphasizes extreme attention to detail and uncompromised ingredient and engineering standards.',
      isSelected: true,
    },
    {
      id: 'tag_functional',
      tagline: `Direct Traceability, Delivered Weekly.`,
      angle: 'Functional',
      rationale: 'Plainly states what the customer receives and the exact cadence of service delivery.',
      isSelected: false,
    },
    {
      id: 'tag_aspirational',
      tagline: `Setting Tomorrow's Benchmark Today.`,
      angle: 'Aspirational',
      rationale: 'Appeals to forward-thinking early adopters who pride themselves on being ahead of market shifts.',
      isSelected: false,
    },
  ];

  // 7. VECTOR LOGO CONCEPTS (Deterministic Scalable SVG Graphics)
  const defaultCustomization1: LogoConcept['customization'] = {
    layout: 'combination',
    complexity: 2,
    contrastMode: 'dark',
    geometryRadius: 12,
    primaryColor: '#4D8DFF',
    secondaryColor: '#38BDF8',
    backgroundColor: '#080B10',
    symbolScale: 100,
    fontTreatment: 'Monospace Geometric',
  };

  const defaultCustomization2: LogoConcept['customization'] = {
    layout: 'stacked',
    complexity: 3,
    contrastMode: 'dark',
    geometryRadius: 24,
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    backgroundColor: '#080B10',
    symbolScale: 100,
    fontTreatment: 'Classic Serif',
  };

  const defaultCustomization3: LogoConcept['customization'] = {
    layout: 'mark_only',
    complexity: 4,
    contrastMode: 'neon',
    geometryRadius: 8,
    primaryColor: '#38BDF8',
    secondaryColor: '#818CF8',
    backgroundColor: '#080B10',
    symbolScale: 100,
    fontTreatment: 'Modern Tech Sans',
  };

  const defaultCustomization4: LogoConcept['customization'] = {
    layout: 'wordmark_only',
    complexity: 1,
    contrastMode: 'monochrome',
    geometryRadius: 4,
    primaryColor: '#F3F4F6',
    secondaryColor: '#64748B',
    backgroundColor: '#080B10',
    symbolScale: 100,
    fontTreatment: 'Grotesque Bold',
  };

  const logoConcepts: LogoConcept[] = [
    {
      id: 'logo_monogram',
      name: `${ventureName} Monogram Seal`,
      style: 'Geometric Monogram',
      wordmark: ventureName.toUpperCase(),
      rationale: 'Symmetrical architectural mark conveying structural stability, precision engineering, and timeless permanence.',
      personalityAlignment: 'Professional • Progressive • Minimal',
      usageSuitability: 'App Icon, Storefront Favicon, Garment Embroidery, Navigation Header',
      status: 'selected',
      customization: defaultCustomization1,
      svgMarkup: generateLogoSvg('logo_monogram', initials, defaultCustomization1),
    },
    {
      id: 'logo_seal',
      name: `${ventureName} Heritage Crest`,
      style: 'Artisanal Seal',
      wordmark: ventureName,
      rationale: 'Concentric circular seal evoking craft heritage, single-origin integrity, and meticulous quality verification.',
      personalityAlignment: 'Craft • Human • Premium',
      usageSuitability: 'Packaging Stamp, Swing Tags, Certificate of Provenance, Unboxing Seal',
      status: 'candidate',
      customization: defaultCustomization2,
      svgMarkup: generateLogoSvg('logo_seal', initials, defaultCustomization2),
    },
    {
      id: 'logo_glyph',
      name: `${ventureName} Dynamic Prism`,
      style: 'Tech Glyph',
      wordmark: ventureName.toLowerCase(),
      rationale: 'Isometric crystalline prism symbolizing multidimensional data integration and razor-sharp clarity.',
      personalityAlignment: 'Technical • Bold • Progressive',
      usageSuitability: 'Digital Vector Avatar, Technical Documentation, Edge Compute Dashboard',
      status: 'candidate',
      customization: defaultCustomization3,
      svgMarkup: generateLogoSvg('logo_glyph', initials, defaultCustomization3),
    },
    {
      id: 'logo_typographic',
      name: `${ventureName} Editorial Wordmark`,
      style: 'Typographic Emblem',
      wordmark: ventureName.toUpperCase(),
      rationale: 'Clean sans-serif logotype flanked by precision anchor brackets for executive and high-trust communications.',
      personalityAlignment: 'Minimal • Confident • Clear',
      usageSuitability: 'Letterhead, Investor Pitch Deck, Storefront Facade, Invoice Header',
      status: 'candidate',
      customization: defaultCustomization4,
      svgMarkup: generateLogoSvg('logo_typographic', initials, defaultCustomization4),
    },
  ];

  // 8. COLOR SYSTEM (Primary, Secondary, Accent, Background, Surface, Text, Success, Warning)
  const colorSwatches: ColorSwatch[] = [
    {
      id: 'col_primary',
      role: 'primary',
      name: 'Deep Obsidian',
      hex: '#080B10',
      rgb: '8, 11, 16',
      psychology: 'Anchors the interface with high-contrast gravitas, visual calm, and premium dark focus.',
      contrastScore: '14.8:1 (AAA)',
    },
    {
      id: 'col_secondary',
      role: 'secondary',
      name: 'Cobalt Slate',
      hex: '#151E2B',
      rgb: '21, 30, 43',
      psychology: 'Elevated interactive surface tone balancing deep depth with subtle tactile layering.',
      contrastScore: '11.2:1 (AAA)',
    },
    {
      id: 'col_accent',
      role: 'accent',
      name: 'Electric Cobalt',
      hex: '#4D8DFF',
      rgb: '77, 141, 255',
      psychology: 'Focal action tone signifying speed, clarity, analytical accuracy, and forward momentum.',
      contrastScore: '7.1:1 (AA)',
    },
    {
      id: 'col_bg',
      role: 'background',
      name: 'Abyssal Void',
      hex: '#05070A',
      rgb: '5, 7, 10',
      psychology: 'Maximum contrast canvas background eliminating glare and visual fatigue.',
      contrastScore: '16.5:1 (AAA)',
    },
    {
      id: 'col_surface',
      role: 'surface',
      name: 'Nightfall Surface',
      hex: '#0B1017',
      rgb: '11, 16, 23',
      psychology: 'Structural card foundation providing crisp card separation across all viewports.',
      contrastScore: '13.4:1 (AAA)',
    },
    {
      id: 'col_text',
      role: 'text',
      name: 'Ghost Quartz',
      hex: '#F3F4F6',
      rgb: '243, 244, 246',
      psychology: 'Crisp readability token with 14.8:1 contrast ratio against the primary surface.',
      contrastScore: '14.8:1 (AAA)',
    },
    {
      id: 'col_success',
      role: 'success',
      name: 'Emerald Verification',
      hex: '#10B981',
      rgb: '16, 185, 129',
      psychology: 'Verifies proven origin, unit viability, and completed strategic milestones.',
      contrastScore: '8.4:1 (AA)',
    },
    {
      id: 'col_warning',
      role: 'warning',
      name: 'Amber Audit Flag',
      hex: '#F59E0B',
      rgb: '245, 158, 11',
      psychology: 'Highlights assumptions requiring empirical customer testing before commit.',
      contrastScore: '6.9:1 (AA)',
    },
  ];

  // 9. TYPOGRAPHY SYSTEM (Display, Heading, Body, Caption/UI)
  const typographyPairs: TypographyPair[] = [
    {
      id: 'typo_tech_sans',
      name: 'Modern Precision Sans',
      headingFont: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      bodyFont: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      uiFont: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      sampleHeading: 'Engineered for Performance & Speed',
      sampleBody: 'Clean geometric lines ensuring rapid scanning across dense technical dashboards and mobile devices.',
    },
    {
      id: 'typo_editorial_serif',
      name: 'Editorial Craft Serif',
      headingFont: 'Georgia, Cambria, "Times New Roman", Times, serif',
      bodyFont: 'system-ui, -apple-system, sans-serif',
      uiFont: 'Inter, system-ui, sans-serif',
      sampleHeading: 'A Dedication to Uncompromised Quality',
      sampleBody: 'Balances literary gravitas with modern digital interfaces, ideal for artisanal single-origin brands.',
    },
    {
      id: 'typo_neo_grotesk',
      name: 'Minimalist Neo-Grotesk',
      headingFont: 'Helvetica Neue, Arial, sans-serif',
      bodyFont: 'Helvetica Neue, Arial, sans-serif',
      uiFont: 'ui-monospace, monospace',
      sampleHeading: 'Objectivity Through Structural Clarity',
      sampleBody: 'Unemotional, Swiss-inspired typographic discipline where content takes immediate precedence.',
    },
  ];

  // 10. CUSTOMER EXPERIENCE (7 Journey Stages from prompt)
  const touchpoints: CustomerTouchpoint[] = [
    {
      stage: 'DISCOVER',
      customerExpectation: 'Finds a solution addressing their acute frustration without hyperbolic sales jargon.',
      touchpoint: 'Founder-led essay / targeted organic comparison teardown.',
      desiredEmotion: 'Curious & validated ("Finally someone names the real problem").',
      brandBehavior: 'The Challenger: Speaks the plain, uncomfortable truth about legacy alternatives.',
      opportunity: 'Publish real benchmark audits rather than standard promo ads.',
    },
    {
      stage: 'CONSIDER',
      customerExpectation: 'Wants to understand pricing, source origins, and implementation turnaround.',
      touchpoint: 'Transparent interactive pricing / provenance breakdown matrix.',
      desiredEmotion: 'Empowered & informed ("No hidden fees or bait-and-switch").',
      brandBehavior: 'The Educator: Explains unit margin, cost structure, and process openly.',
      opportunity: 'Show interactive calculator proving net savings or quality differential.',
    },
    {
      stage: 'SIGN UP / BUY',
      customerExpectation: 'Effortless checkout with immediate reassurance of delivery timing.',
      touchpoint: 'Frictionless 60-second checkout with instant confirmation receipt.',
      desiredEmotion: 'Confident & excited ("This was fast, clean, and clear").',
      brandBehavior: 'The Facilitator: Removes unnecessary input fields and billing friction.',
      opportunity: 'Include welcome dispatch timeline guaranteeing the first operational delivery.',
    },
    {
      stage: 'ONBOARD',
      customerExpectation: 'Receives instant guidance on how to get first value without steep learning curves.',
      touchpoint: 'Interactive setup checklist / batch brew guide.',
      desiredEmotion: 'Relieved & in control ("Setup took less than 2 minutes").',
      brandBehavior: 'The Guide: Provides concise step-by-step assistance.',
      opportunity: 'Include direct founder onboarding channel for questions.',
    },
    {
      stage: 'USE',
      customerExpectation: 'The product arrives on schedule and exceeds quality benchmarks on Day 1.',
      touchpoint: 'Unboxing experience / first 60 seconds inside software dashboard.',
      desiredEmotion: 'Delighted & impressed ("The quality is noticeably superior").',
      brandBehavior: 'The Master Artisan: Delivers sensory delight and zero-defect execution.',
      opportunity: 'Include personalized provenance batch card and direct feedback link.',
    },
    {
      stage: 'RETAIN',
      customerExpectation: 'Seamless reorder cadence or continuous automated value generation.',
      touchpoint: 'Automated weekly freshness dispatch or proactive monthly ROI summary.',
      desiredEmotion: 'Loyal & satisfied ("I can depend on this without thinking about it").',
      brandBehavior: 'The Dependable Partner: Operates like clockwork in the background.',
      opportunity: 'One-click pause/adjust frequency controls with zero dark patterns.',
    },
    {
      stage: 'ADVOCATE',
      customerExpectation: 'Feels pride in sharing a discoverable, high-craft brand with peers.',
      touchpoint: 'Private customer community / peer referral gift program.',
      desiredEmotion: 'Proud & generous ("I want my network to experience this").',
      brandBehavior: 'The Community Hub: Recognizes discerning customers as co-architects.',
      opportunity: 'Exclusive access to experimental micro-lots or beta architectural features.',
    },
  ];

  // 11. BRAND ROADMAP TIMELINE (Foundation -> Positioning -> Identity -> Touchpoints -> Launch -> Optimization)
  const milestones: RoadmapMilestone[] = [
    {
      id: 'ms_01',
      title: '01 FOUNDATION — Ground Discovery Vectors',
      stageName: 'FOUNDATION',
      status: 'COMPLETE',
      objective: 'Deconstruct raw problem, target persona, and product classification.',
      dependency: 'Stage 01 Idea Lab & Stage 02 Feasibility',
      nextAction: 'Ensure upstream discovery vectors remain locked during branding.',
    },
    {
      id: 'ms_02',
      title: '02 POSITIONING — Cement Strategic Wedge',
      stageName: 'POSITIONING',
      status: 'COMPLETE',
      objective: 'Lock canonical positioning formula and define target audience parameters.',
      dependency: 'Stage 03 Market Intelligence Whitespace',
      nextAction: 'Incorporate differentiator into all outward-facing pitch materials.',
    },
    {
      id: 'ms_03',
      title: '03 IDENTITY — Persist Visual System',
      stageName: 'IDENTITY',
      status: 'COMPLETE',
      objective: 'Select official vector brand mark, color swatches, and typography scale.',
      dependency: '02 POSITIONING',
      nextAction: 'Export semantic design tokens into UI frontend repository.',
    },
    {
      id: 'ms_04',
      title: '04 TOUCHPOINTS — Operationalize CX Map',
      stageName: 'TOUCHPOINTS',
      status: 'READY',
      objective: 'Operationalize the 7-stage lifecycle journey from discovery to advocacy.',
      dependency: '03 IDENTITY',
      nextAction: 'Design unboxing collateral and transactional email copy.',
    },
    {
      id: 'ms_05',
      title: '05 LAUNCH — Beta Cohort Deployment',
      stageName: 'LAUNCH',
      status: 'IN PROGRESS',
      objective: 'Onboard 25–50 verified pilot users and test day-7 retention.',
      dependency: '04 TOUCHPOINTS',
      nextAction: 'Deploy landing page with selected mark and active tagline.',
    },
    {
      id: 'ms_06',
      title: '06 OPTIMIZATION — Feedback Loop & Scale',
      stageName: 'OPTIMIZATION',
      status: 'BLOCKED',
      objective: 'Refine unit economics, reduce CAC, and scale recurring subscription cadence.',
      dependency: '05 LAUNCH',
      nextAction: 'Review cohort feedback and prepare for Stage 05 technical build.',
    },
  ];

  // 12. BRAND DECISION BOARD (Decided, Needs Review, Open Question, Validation Required)
  const decisionBoard = {
    decided: [
      { id: 'd_1', statement: `Target customer segment is ${targetAudience.slice(0, 60)}...`, source: 'Stage 01 Idea Lab', impact: 'High' },
      { id: 'd_2', statement: `Core differentiator is "${defaultDiff.slice(0, 50)}..."`, source: 'Stage 03 Market Intel', impact: 'Critical' },
      { id: 'd_3', statement: `Permanent visual theme: Minimal Obsidian & Electric Cobalt.`, source: 'Stage 04 Brand System', impact: 'Medium' },
    ],
    needsReview: [
      { id: 'nr_1', statement: `Pricing elasticity: Can we sustain a 25% premium above commodity baseline?`, source: 'Economic Feasibility', impact: 'High' },
      { id: 'nr_2', statement: `Fulfillment SLA: Confirm 48-hour turnarounds during seasonal volume peaks.`, source: 'Logistics Review', impact: 'Medium' },
    ],
    openQuestions: [
      { id: 'oq_1', statement: `Will enterprise buyers demand dedicated SLA contracts before pilot onboarding?`, source: 'Founder Strategy', impact: 'High' },
      { id: 'oq_2', statement: `Which secondary acquisition channel yields the lowest cost per verified subscriber?`, source: 'Growth Strategy', impact: 'Medium' },
    ],
    validationRequired: [
      { id: 'vr_1', statement: `Secure 25 paid deposit pre-orders to validate real customer willingness-to-pay.`, source: 'Validation Sprint', impact: 'Critical' },
      { id: 'vr_2', statement: `Run unboxing physical test with 10 blind taste testers or test operators.`, source: 'Product Trial', impact: 'High' },
    ],
  };

  // 13. STAGE 05 HANDOFF
  const selectedLogo = logoConcepts[0];
  const selectedTypo = typographyPairs[0];

  const stage05Handoff = {
    isReady: true,
    statusLabel: 'READY FOR BUILD',
    decisionsTransferred: {
      positioning: positioningStatement.fullStatement,
      differentiator: defaultDiff,
      brandPersonality: 'Professional (28%), Minimal (32%), Modern (80%), Human (65%)',
      logoDirection: `${selectedLogo.name} (${selectedLogo.style})`,
      colors: colorSwatches.slice(0, 6).map((s) => `${s.role}: ${s.hex}`).join(', '),
      typography: `${selectedTypo.name} (${selectedTypo.headingFont})`,
      voice: voiceAttributes.filter((v) => v.selected).map((v) => v.name).join(', '),
      customerExperienceDirection: 'End-to-End Radical Transparency across 7 Journey Touchpoints',
      openDecisions: '2 validation tests scheduled before public release.',
    },
  };

  // 14. IDENTITY AUDIT STATUS
  const identityAudit: IdentityAuditStatus = {
    positioningStatus: idea.differentiation ? 'VERIFIED' : 'AI INFERENCE',
    identityStatus: selectedLogo ? 'VERIFIED' : 'NEEDS INPUT',
    differentiationStatus: differentiatorCandidates.length > 0 ? 'VERIFIED' : 'AI INFERENCE',
    readinessStatus: stage05Handoff.isReady ? 'READY' : 'IN PROGRESS',
  };

  // 15. BRAND TRANSFORMATION ROADMAP (Strategic 8-Stage Progression)
  const isPhysical =
    category.toLowerCase().includes('physical') ||
    category.toLowerCase().includes('coffee') ||
    category.toLowerCase().includes('d2c') ||
    category.toLowerCase().includes('beverage') ||
    category.toLowerCase().includes('hardware');

  const transformationRoadmap: BrandTransformationMilestone[] = [
    {
      id: 'btm_1',
      stepNumber: 1,
      stageKey: 'IDEA',
      title: 'Venture Crystallization',
      subtitle: 'Raw founder intuition into structured thesis',
      objective: `Crystallize ${ventureName}'s core problem-solution thesis for ${targetAudience}.`,
      founderAction: `Lock in the acute dilemma: "${problem.slice(0, 50)}..." before spending on brand assets.`,
      keyMilestone: 'Validated Problem Statement & Target Persona Defined',
      expectedOutcome: 'Venture Thesis Document & Beachhead ICP Specification',
      dependency: 'Stage 01 Idea Lab Discovery Input',
      decisionGate: 'Is the customer problem acute enough that users actively seek alternatives?',
      whatItIs: `Deconstruct ${ventureName}'s core premise: solve "${problem.slice(0, 50)}..." for ${targetAudience}.`,
      whyItMatters: 'Prevents building features or brand narratives without a validated customer dilemma.',
      concreteOutput: 'Structured Venture Thesis & Problem-Solution Hypothesis',
      recommendedNextStep: 'Validate customer willingness-to-pay before designing collateral.',
      status: 'READY',
      groundedDetail: `Grounded in Stage 01 problem statement: "${problem.slice(0, 60)}..."`,
    },
    {
      id: 'btm_2',
      stepNumber: 2,
      stageKey: 'VALIDATION',
      title: 'Feasibility & Economic Validation',
      subtitle: 'Technical feasibility and contribution unit economics',
      objective: 'Stress-test gross margins, production/hosting constraints, and regulatory boundary risks.',
      founderAction: 'Establish minimum viable contribution margins and determine technical feasibility.',
      keyMilestone: 'Unit Economics Viability Model & Risk Assessment Approved',
      expectedOutcome: 'Feasibility Scorecard & Operational Risk Mitigation Strategy',
      dependency: 'Stage 02 Feasibility & Viability Analysis',
      decisionGate: 'Can this venture maintain 60%+ contribution margin at target scale?',
      whatItIs: `Validate that ${ventureName}'s unit economics and operational footprint are financially sustainable.`,
      whyItMatters: 'A brilliant brand cannot compensate for negative unit economics or insurmountable regulatory roadblocks.',
      concreteOutput: 'Financial Viability Model & Regulatory Compliance Checklist',
      recommendedNextStep: 'Lock core unit economics before committing capital to marketing.',
      status: 'READY',
      groundedDetail: isPhysical ? 'Evaluated against CPG batch margins and supply lead times.' : 'Evaluated against multi-tenant cloud SaaS margins.',
    },
    {
      id: 'btm_3',
      stepNumber: 3,
      stageKey: 'POSITIONING',
      title: 'Strategic Positioning Wedge',
      subtitle: 'Carve out an uncontested market wedge',
      objective: `Position ${ventureName} in sharp contrast to ${marketIntelligence?.competitors?.map((c) => c.name).slice(0, 2).join(' and ') || 'legacy incumbents'}.`,
      founderAction: 'Craft the canonical positioning statement defining target, category, and contrast value.',
      keyMilestone: '2-Axis Market Matrix & Positioning Formula Locked',
      expectedOutcome: 'Canonical Positioning Vector & Target Customer Contract',
      dependency: 'Stage 03 Competitive Whitespace Analysis',
      decisionGate: 'Is our wedge visibly different from status-quo alternatives in under 5 seconds?',
      whatItIs: `Position ${ventureName} in contrast to incumbents by highlighting: "${positioningStatement.valuePromise}".`,
      whyItMatters: 'Without clear contrast, prospective buyers default to established incumbents.',
      concreteOutput: '2-Axis Positioning Vector & Target Customer Contract',
      recommendedNextStep: 'Draft your one-sentence positioning assertion for early test customers.',
      status: 'READY',
      groundedDetail: `Contrast against incumbents: ${marketIntelligence?.competitors?.map((c) => c.name).slice(0, 2).join(', ') || 'legacy vendors'}`,
    },
    {
      id: 'btm_4',
      stepNumber: 4,
      stageKey: 'DIFFERENTIATION',
      title: 'Capability Differentiation',
      subtitle: 'Defensible operational moat',
      objective: `Anchor the brand in an asymmetric capability: "${defaultDiff}".`,
      founderAction: 'Select defensible differentiator territory and evaluate competitive imitation risk.',
      keyMilestone: 'Defensible Moat Statement & Replication Barrier Verified',
      expectedOutcome: 'Defensible Differentiator Matrix & Moat Definition',
      dependency: 'Stage 03 Competitive Landscape & Stage 02 Ops Feasibility',
      decisionGate: 'Can an incumbent replicate this within 6 months without restructuring their business?',
      whatItIs: `Lock in your core differentiator: "${defaultDiff}".`,
      whyItMatters: 'Ensures the brand delivers on an asymmetric capability that competitors cannot easily copy.',
      concreteOutput: 'Defensible Differentiator Matrix & Moat Definition',
      recommendedNextStep: 'Stress-test differentiator defensibility against competitive replication.',
      status: 'READY',
      groundedDetail: `Core capability wedge: "${defaultDiff}"`,
    },
    {
      id: 'btm_5',
      stepNumber: 5,
      stageKey: 'BRAND_DNA',
      title: 'Brand DNA & Ethos',
      subtitle: 'Purpose, promise, and core voice guardrails',
      objective: 'Define brand personality traits, voice attributes, and non-negotiable operational principles.',
      founderAction: 'Formulate internal principles that guide product trade-offs and outward customer communications.',
      keyMilestone: 'Brand Purpose, Promise, Voice Attributes & Personality Profile Locked',
      expectedOutcome: 'Brand DNA Map, Voice Principles, and Personality Sliders',
      dependency: 'Strategic Positioning & Target Persona',
      decisionGate: 'Does the voice feel authentic and distinct from generic corporate tone?',
      whatItIs: `Articulate why ${ventureName} exists beyond profit and establish the brand promise customers rely on.`,
      whyItMatters: 'Unifies engineering, marketing, and customer support around non-negotiable operational principles.',
      concreteOutput: 'Brand Purpose, Promise, Core Values, and Personality Blueprint',
      recommendedNextStep: 'Proceed to Stage 05A to create the visual identity and mark.',
      status: 'READY',
      groundedDetail: `Values aligned with ${category} domain expectations and customer empathy.`,
    },
    {
      id: 'btm_6',
      stepNumber: 6,
      stageKey: 'IDENTITY',
      title: 'Visual Identity System',
      subtitle: 'Signature colors, typography, and brand mark',
      objective: `Establish ${ventureName}'s visual grammar: typography scale, signature color palette, and vector brand mark.`,
      founderAction: 'Generate, compare, and customize official brand mark and tokenized styles in Stage 05A.',
      keyMilestone: 'Vector Mark Selected & WCAG AA Design Tokens Exported',
      expectedOutcome: 'Official Brand Identity Board & Design System Tokens in Stage 05A',
      dependency: 'Brand Personality Traits & Positioning Tone',
      decisionGate: 'Does the visual mark communicate instant category authority and premium craft?',
      whatItIs: `Establish ${ventureName}'s visual grammar: typography scale, signature color palette, and vector brand mark.`,
      whyItMatters: 'Visual identity creates instant recognition and signals category quality before the user reads a word.',
      concreteOutput: 'Tokenized Design System, Vector Mark, and Brand Identity Board',
      recommendedNextStep: 'Proceed to Stage 05A (Brand System) to generate vector mark, customize palette, and inspect typography.',
      status: 'READY',
      groundedDetail: 'Actionable build tools provided in Stage 05A Brand System.',
    },
    {
      id: 'btm_7',
      stepNumber: 7,
      stageKey: 'CUSTOMER_EXP',
      title: 'Customer Journey Architecture',
      subtitle: 'Touchpoints from discovery to advocacy',
      objective: 'Map customer lifecycle expectations and brand behaviors across all 7 journey stages.',
      founderAction: 'Design onboarding hooks, transactional communications, and customer advocacy moments.',
      keyMilestone: '7-Touchpoint Lifecycle Blueprint with Telemetry Triggers',
      expectedOutcome: 'Customer Experience Map with Brand Behavioral Guardrails',
      dependency: 'Positioning Statement & Target Customer Expectations',
      decisionGate: 'Does the customer experience delivered in the first 3 minutes match the brand promise?',
      whatItIs: 'Map every customer interaction across discovery, consideration, trial, onboarding, retention, and referral.',
      whyItMatters: 'A brand is not a logo; it is the sum total of every friction point and delight moment experienced by the customer.',
      concreteOutput: '7-Touchpoint Lifecycle Blueprint with Telemetry Triggers',
      recommendedNextStep: 'Integrate touchpoint requirements into Stage 05B Product User Flow.',
      status: 'READY',
      groundedDetail: 'Detailed screen and API specs defined in Stage 05B Product Build.',
    },
    {
      id: 'btm_8',
      stepNumber: 8,
      stageKey: 'GROWTH',
      title: 'Beachhead Launch & Scale',
      subtitle: 'Orchestrated rollout to initial adopters',
      objective: 'Sequence distribution channels and compounding customer acquisition loops for scale.',
      founderAction: 'Focus strictly on early beachhead adopters before expanding outward into broad marketing.',
      keyMilestone: 'Beachhead Channel Strategy & Referral Flywheel Validated',
      expectedOutcome: 'Go-to-Market Sequence, Launch Checklist, and Channel Strategy in Stage 08',
      dependency: 'Stage 05 MVP Feature Readiness & Tested Infrastructure',
      decisionGate: 'Are Day-7 and Day-30 customer retention curves positive before increasing marketing spend?',
      whatItIs: 'Execute targeted market entry focusing strictly on the early beachhead segment before mass marketing.',
      whyItMatters: 'Early focused launches validate retention loops and gather authentic customer testimonials with minimal cash burn.',
      concreteOutput: 'Go-to-Market Sequence, Launch Checklist, and Channel Strategy',
      recommendedNextStep: 'Prepare launch experiments and distribution channels in Stage 08.',
      status: 'PLANNED',
      groundedDetail: 'Preserves runway by launching with tight beachhead focus.',
    },
  ];

  // 16. COMPETITOR ROADMAPS (Category Evolution & Founder Takeaways)
  // Grounded dynamically in Stage 03 Market Intelligence
  const rawUpstreamCompetitors: CompetitorItem[] =
    marketIntelligence?.competitors && marketIntelligence.competitors.length > 0
      ? marketIntelligence.competitors
      : (idea.rawInput?.trim() || idea.name?.trim())
      ? generateMarketIntelligenceReport(state).competitors
      : [];

  const lowerIdeaText = (idea.rawInput + ' ' + idea.problem + ' ' + targetAudience + ' ' + ventureName).toLowerCase();
  const isApparelCategory = lowerIdeaText.includes('clothing') || lowerIdeaText.includes('apparel') || lowerIdeaText.includes('fashion') || lowerIdeaText.includes('winter') || lowerIdeaText.includes('garment') || lowerIdeaText.includes('jacket') || lowerIdeaText.includes('wear');
  const isCoffeeSample = (project.id === 'proj_sample_coffee' || lowerIdeaText.includes('coffee') || lowerIdeaText.includes('roaster')) && !isApparelCategory;
  const isSaasSample = (project.id === 'proj_sample_saas' || lowerIdeaText.includes('saas') || lowerIdeaText.includes('attribution') || lowerIdeaText.includes('metricpulse')) && !isApparelCategory && !isCoffeeSample;

  const competitorRoadmaps: CompetitorRoadmapItem[] = [];

  // Populate from verified historical benchmarks when matching a sample venture category
  if (rawUpstreamCompetitors.length > 0) {
    if (isApparelCategory) {
      competitorRoadmaps.push(
        {
          id: 'cr_apparel_1',
          competitorName: 'Patagonia',
          category: 'Outdoor & Weatherproof Apparel',
          evolutionTrajectory: 'Artisan climbing gear → Organic fleece & camel wool outerwear → Radical supply-chain transparency & lifetime repair',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Public SEC filings, founder memoirs (Let My People Go Surfing), 1% for the Planet disclosures',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (1973)', focus: 'Artisan Climbing Equipment', milestone: 'Founded in Ventura by blacksmith Yvon Chouinard; handcrafted clean climbing pitons.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (1977)', focus: 'Synthetic & Wool Pile Sweaters', milestone: 'Introduced synthetic fleece jackets delivering warmth without retaining water when wet.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (1985)', focus: 'Technical Environmental Stewardship', milestone: 'Committed 1% of sales to grassroots environmental conservation; shifted to organic cotton.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (1993)', focus: 'Recycled Post-Consumer Fleeces', milestone: 'First outdoor apparel company to manufacture fleeces from recycled soda bottles.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2011)', focus: 'The "Don\'t Buy This Jacket" Campaign', milestone: 'Full-page NYT ad calling out consumer overconsumption; sales increased 30% due to trust.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2013)', focus: 'Worn Wear Repair Ecosystem', milestone: 'Launched largest garment repair facility in North America; mobile repair trucks tour college hubs.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2022)', focus: 'Perpetual Purpose Trust Ownership', milestone: 'Transferred 100% of voting stock to the Patagonia Purpose Trust to lock in founder principles.' },
          ],
          takeaways: {
            positioningLesson: 'Positioned against disposable fast fashion by treating durability and repairability as the ultimate luxury markers.',
            sequencingLesson: 'Proved extreme product functionality for elite outdoor athletes before marketing to everyday lifestyle consumers.',
            productToBrandTransition: 'Turned customer repair workshops into communal brand theater that built generational brand loyalty.',
            customerAcquisitionLesson: 'Radical transparency about environmental footprint generated organic earned media worth millions in paid ad equivalents.',
            distributionLesson: 'Direct flagship experiential hubs → High-end specialty outdoor retailers → Global online portal.',
            expansionLesson: 'Expanded from technical alpine jackets into everyday urban thermal apparel while maintaining rigorous material standards.',
            brandIdentityLesson: 'The Fitz Roy mountain skyline badge became an instant badge of ethical consciousness and functional craft.',
            whatNotToCopy: 'Never preach environmental or craft purity until your supply chain audits and material traceability are 100% airtight.',
            sequencingLessons: 'Proved extreme product functionality for elite outdoor athletes before marketing to everyday lifestyle consumers.',
            positioningDecisions: 'Positioned against disposable fast fashion by treating durability and repairability as the ultimate luxury markers.',
            distributionStrategy: 'Direct flagship experiential hubs → High-end specialty outdoor retailers → Global online portal.',
            mistakesAndRisks: 'Initial fleeces shed microplastics until closed-loop washing bags and denser knitting protocols were engineered.',
          },
        },
        {
          id: 'cr_apparel_2',
          competitorName: 'Uniqlo (HeatTech)',
          category: 'Technical Thermal Basics',
          evolutionTrajectory: 'Hiroshima discount warehouse → Material R&D Joint Venture with Toray → Global Essential Winterwear Ubiquity',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Fast Retailing Annual Reports, Toray Industries technical partnership papers',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (1984)', focus: 'Unique Clothing Warehouse', milestone: 'Tadashi Yanai opened first suburban unisex basic apparel depot in Hiroshima.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (1998)', focus: '1,900-Yen Fleece Phenomenon', milestone: 'Sold 26 million fleece jackets in Japan by sourcing directly from specialized overseas mills.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2003)', focus: 'LifeWear: Clothes for All', milestone: 'Repositioned away from cheap disposable fashion to democratic, high-technology functional staples.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2006)', focus: 'HeatTech Innovation with Toray', milestone: 'Co-developed micro-acrylic rayon fiber that absorbs body moisture to generate and retain heat.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2010)', focus: 'Global Thermal Dominance', milestone: 'Surpassed 100M units of HeatTech sold globally; made heavy winter bulk obsolete.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2016)', focus: 'Ultra-Light Down & Seamless Weaves', milestone: 'Introduced pocketable winter down jackets weighing under 200 grams.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2023)', focus: 'Automated Micro-Distribution', milestone: 'Omnichannel fulfillment and automated RFID self-checkout across 2,400+ stores worldwide.' },
          ],
          takeaways: {
            positioningLesson: 'Positioned thermal winter clothing as high-technology componentry rather than seasonal trend fashion.',
            sequencingLesson: 'Locked in multi-year exclusive fiber synthesis contracts with Toray to create an insurmountable cost-to-performance moat.',
            productToBrandTransition: 'Demonstrated heat retention through in-store thermal camera displays, proving the invisible functional benefit visually.',
            customerAcquisitionLesson: 'Priced basic thermal layers at accessible gateway price points to drive massive seasonal basket volume.',
            distributionLesson: 'High-density urban transit station stores paired with automated online fulfillment.',
            expansionLesson: 'Expanded HeatTech into 3 distinct thermal grades (Standard, Extra Warm, Ultra Warm) to serve diverse regional climates.',
            brandIdentityLesson: 'Clean grid-based Japanese red/white typography and laboratory-style packaging communicated technical rigor.',
            whatNotToCopy: 'Avoid pure commodity basics pricing if your venture lacks multi-million unit economies of scale; stay focused on craft and margin.',
            sequencingLessons: 'Locked in multi-year exclusive fiber synthesis contracts with Toray to create an insurmountable cost-to-performance moat.',
            positioningDecisions: 'Positioned thermal winter clothing as high-technology componentry rather than seasonal trend fashion.',
            distributionStrategy: 'High-density urban transit station stores paired with automated online fulfillment.',
            mistakesAndRisks: 'Initial European store expansions over-extended on large footprints before brand recognition was established.',
          },
        },
        {
          id: 'cr_apparel_3',
          competitorName: 'Raw Mango & Heritage Handloom Brands',
          category: 'Artisan Handloom & Contemporary Luxury',
          evolutionTrajectory: 'Direct artisan weaver cluster revival (Rajasthan & Chanderi) → Exclusive curated exhibition salons → Global design authority',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Craft Council of India monographs, Sanjay Garg retrospective profiles, Vogue India business audits',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2008)', focus: 'Reviving Endangered Handloom Weaves', milestone: 'Sanjay Garg worked directly with master weavers in Chanderi and Rajasthan to re-engineer drape and color.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2010)', focus: 'Minimalist Color Block Sarees & Shawls', milestone: 'Eliminated heavy synthetic embellishment; highlighted natural wool and silk textures in vivid unblended hues.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2014)', focus: 'Anti-Bridal Contemporary Heritage', milestone: 'Positioned as cerebral, architectural cultural design rather than traditional ethnic wear.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2017)', focus: 'Sensory Architectural Flagships', milestone: 'Opened restored heritage haveli salons in Delhi and Mumbai with zero commercial store racks.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2019)', focus: 'Quilted Winter Outerwear & Jackets', milestone: 'Transformed traditional Razai quilting techniques into tailored contemporary winter coats.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2021)', focus: 'Global Cultural Diaspora Showcase', milestone: 'Direct trunk shows in London, Singapore, and New York serving discerning global connoisseurs.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2024)', focus: 'Sustained Artisan Cluster Ecosystem', milestone: 'Empowered over 500 handloom artisan families with continuous annual production contracts.' },
          ],
          takeaways: {
            positioningLesson: 'Demonstrated that authentic handloom and regional craft can command higher prices than Western European luxury brands when presented with contemporary design discipline.',
            sequencingLesson: 'Refused wholesale multi-brand department stores; preserved complete brand equity and pricing power through exclusive company-owned salons.',
            productToBrandTransition: 'Architectural showroom environments, brass accents, and museum-grade lighting elevated regional textiles into collectible art.',
            customerAcquisitionLesson: 'Earned cult status among architects, artists, and cultural tastemakers through intimate private preview salons rather than digital ads.',
            distributionLesson: 'Invitation-only exhibitions → Restored architectural haveli flagships → Curated global e-commerce portal.',
            expansionLesson: 'Expanded from handloom textiles into tailored outerwear while keeping regional artisan weaver communities at the operational core.',
            brandIdentityLesson: 'Understated earthen typography and raw, unretouched photography celebrated the human irregularities of handloom craft.',
            whatNotToCopy: 'Do not compromise artisan craft timelines to chase mass-market volume; scarcity and provenance are the core moat.',
            sequencingLessons: 'Refused wholesale multi-brand department stores; preserved complete brand equity and pricing power through exclusive company-owned salons.',
            positioningDecisions: 'Demonstrated that authentic handloom and regional craft can command higher prices than Western European luxury brands when presented with contemporary design discipline.',
            distributionStrategy: 'Invitation-only exhibitions → Restored architectural haveli flagships → Curated global e-commerce portal.',
            mistakesAndRisks: 'Scaling handloom production too fast risks artisan fatigue and dye-lot variations if weaver training is rushed.',
          },
        }
      );
    } else if (isCoffeeSample) {
      competitorRoadmaps.push(
        {
          id: 'cr_1',
          competitorName: 'Blue Bottle Coffee',
          category: 'Specialty Coffee / CPG',
          evolutionTrajectory: 'Micro-roaster kiosk (Oakland) → Direct-to-Consumer Freshness Subscription → Flagship Cafes → Nestlé Acquisition ($500M)',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Public SEC filings, founder interviews with James Freeman (2002-2017)',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2002)', focus: 'Extreme Roast Freshness', milestone: 'Founded in Oakland farmers market with rule: coffee sold within 48h of roasting.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2005)', focus: 'Single-Origin Pour Over', milestone: 'Opened kiosk on Linden St; eliminated multi-origin bulk espresso blends.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2008)', focus: 'Anti-Starbucks Aesthetic', milestone: 'Minimalist white-space branding; no Wi-Fi, emphasizing craft and reverence.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2012)', focus: 'Signature Pastel Blue Bottle Mark', milestone: 'Packaging redesign elevated blue bottle logo into a luxury design signifier.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2014)', focus: 'D2C Subscription Sub-Brand', milestone: 'Acquired Tonx to build web-native subscription ordering engine.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2015)', focus: 'Tokyo Flagship & RTD Cold Brew', milestone: 'Launched ready-to-drink cans in Whole Foods; opened in Kiyosumi, Tokyo.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2017)', focus: 'Global Omnichannel Scale', milestone: 'Nestlé acquired 68% stake for ~$500M to anchor premium global portfolio.' },
          ],
          takeaways: {
            positioningLesson: 'Positioned explicitly against dark-roast commercial coffee by treating beans as delicate agricultural fruit.',
            sequencingLesson: 'Started with an uncompromising quality constraint (48-hour freshness) that earned fanatical word-of-mouth before opening permanent stores.',
            productToBrandTransition: 'The physical cafe aesthetic (minimalist wood & concrete) reinforced the premium price point ($6/cup) without advertising.',
            customerAcquisitionLesson: 'Turned the in-cafe barista pour-over ritual into a theater of craft that drove organic peer-to-peer recommendation.',
            distributionLesson: 'Farmers market → 1 Flagship kiosk → D2C Web Subscriptions → Wholesale Grocery cans.',
            expansionLesson: 'Expanded to Tokyo only after brand prestige was solidified in the domestic US market.',
            brandIdentityLesson: 'Minimalist blue bottle glyph on clean brown kraft paper stood out immediately against busy grocery aisle graphics.',
            whatNotToCopy: 'Do NOT try to open retail stores and manufacture RTD cans simultaneously Day 1; focus strictly on one distribution wedge.',
            sequencingLessons: 'Started with an uncompromising quality constraint (48-hour freshness) that earned fanatical word-of-mouth before opening permanent stores.',
            positioningDecisions: 'Positioned explicitly against dark-roast commercial coffee by treating beans as delicate agricultural fruit.',
            distributionStrategy: 'Farmers market → 1 Flagship kiosk → D2C Web Subscriptions → Wholesale Grocery cans.',
            mistakesAndRisks: 'Rapid expansion into retail cans risked diluting the original "roasted within 48 hours" freshness promise.',
          },
        },
        {
          id: 'cr_2',
          competitorName: 'Trade Coffee',
          category: 'Coffee Marketplace & Subscription',
          evolutionTrajectory: 'Roaster Discovery Marketplace → Algorithmic Taste Quiz Engine → Personalized Recurring Deliveries',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'TechCrunch profile, venture funding reports (Seed to Series B)',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2018)', focus: 'Aggregating Independent Roasters', milestone: 'Launched with seed backing from JAB Holding to curate 400+ independent roasts.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2019)', focus: 'Discovery Quiz Funnel', milestone: 'Introduced 6-question taste questionnaire matching grind, brew method, and roast.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2020)', focus: 'Support Local Roasters from Home', milestone: 'Positioned as supporting local roasters with personalized roast recommendations.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2021)', focus: 'Vibrant Typographic Community Mark', milestone: 'Rebranded with bright terracotta/cobalt packaging emphasizing discovery.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2022)', focus: 'Cold Brew Bags & Equipment Bundles', milestone: 'Cross-sold immersion bags and Fellow grinders to increase cart LTV.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2022)', focus: 'Corporate Gifting & Hardware Partnerships', milestone: 'Introduced B2B office subscriptions and cross-promotions with Fellow and Baratza.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2023)', focus: 'Subscription Retention Optimization', milestone: 'Surpassed 5M bags shipped via automated cadence management.' },
          ],
          takeaways: {
            positioningLesson: 'Positioned as an objective taste sommelier rather than a proprietary coffee roaster.',
            sequencingLesson: 'Built zero roasting facilities; leveraged existing third-party roaster capacity and dropshipping to scale with zero inventory risk.',
            productToBrandTransition: 'Taste quiz became the signature product hook, lowering friction for non-experts.',
            customerAcquisitionLesson: 'Drove massive paid social conversion by leading with the interactive taste quiz rather than product catalogs.',
            distributionLesson: 'Aggressive paid social acquisition paired with high-converting quiz funnels and roaster cross-promotions.',
            expansionLesson: 'Expanded from bags to hardware accessories and cold brew packs to raise average customer order value.',
            brandIdentityLesson: 'Vibrant color-coded discovery tags made specialty coffee accessible rather than intimidating.',
            whatNotToCopy: 'Avoid pure marketplace aggregator models if your venture differentiator is proprietary craft and transparent origin.',
            sequencingLessons: 'Built zero roasting facilities; leveraged existing third-party roaster capacity and dropshipping to scale with zero inventory risk.',
            positioningDecisions: 'Positioned as an objective taste sommelier rather than a proprietary coffee roaster.',
            distributionStrategy: 'Aggressive paid social acquisition paired with high-converting quiz funnels and roaster cross-promotions.',
            mistakesAndRisks: 'High customer churn if the quiz recommendation fails to match actual personal taste on bag #1.',
          },
        },
        {
          id: 'cr_3',
          competitorName: 'Fellow Products',
          category: 'Coffee Hardware & Design',
          evolutionTrajectory: 'Kickstarter French Press (Duo) → Design-Icon Stagg EKG Kettle → Omnichannel Lifestyle Brand',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Stanford d.school origin, Fast Company Design Award profiles',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2013)', focus: 'Crowdfunded Duo Coffee Steeper', milestone: 'Raised $193K on Kickstarter out of Stanford d.school class project.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2015)', focus: 'Pour-Over Ergonomics', milestone: 'Launched Stagg Pour-Over Kettle with precision gooseneck and counterbalanced handle.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2017)', focus: 'Kitchen Counterpiece Luxury', milestone: 'Positioned coffee gear as museum-worthy industrial design rather than utility appliances.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2018)', focus: 'Matte Black Minimalist Aesthetic', milestone: 'Stagg EKG won Red Dot Design Award; became the de facto barista competition standard.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2019)', focus: 'Direct D2C & Boutique Wholesale', milestone: 'Scaled direct online sales and partnered with Nordstrom and specialty cafes for retail showrooming.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2021)', focus: 'Ode Brew Grinder Category Entry', milestone: 'Raised $30M Series B to enter electric grinder market; opened Venice, CA retail store.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2023)', focus: 'Fellow Drops Coffee Marketplace', milestone: 'Monetized hardware customer base with curated SMS coffee bean drops.' },
          ],
          takeaways: {
            positioningLesson: 'Turned a commodity electric kettle into a $165 design centerpiece that owners proudly display on countertops.',
            sequencingLesson: 'Started with crowdfunding to pre-validate consumer demand and finance expensive tooling before taking venture capital.',
            productToBrandTransition: 'Used industrial design excellence and counterbalanced ergonomics as the primary marketing mechanism.',
            customerAcquisitionLesson: 'Seeded hardware with World Brewers Cup champions to establish professional authority.',
            distributionLesson: 'Kickstarter → Specialty roaster cafes (wholesale showrooming) → Direct D2C e-commerce → MoMA Design Store.',
            expansionLesson: 'Cross-sold recurring bean drops via SMS to customers who already purchased expensive brewing gear.',
            brandIdentityLesson: 'Understated matte black and copper accents created a recognizable visual signature across product categories.',
            whatNotToCopy: 'Hardware design requires 12-18 month tooling lead times; ensure cash reserves can handle tooling iterations.',
            sequencingLessons: 'Started with crowdfunding to pre-validate consumer demand and finance expensive tooling before taking venture capital.',
            positioningDecisions: 'Turned a commodity electric kettle into a $165 design centerpiece that owners proudly display on countertops.',
            distributionStrategy: 'Kickstarter → Specialty roaster cafes (wholesale showrooming) → Direct D2C e-commerce → MoMA Design Store.',
            mistakesAndRisks: 'Hardware recalls and firmware bugs on V1 grinders required costly re-engineering of motor burs.',
          },
        }
      );
    } else if (isSaasSample) {
      competitorRoadmaps.push(
        {
          id: 'cr_1',
          competitorName: 'Datadog',
          category: 'Cloud Monitoring & Observability',
          evolutionTrajectory: 'DevOps Infrastructure Monitoring → Unified APM & Logs → Enterprise Multi-Cloud Observability Platform',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Public S-1 filing (2019), public earnings calls (2010-2023)',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2010)', focus: 'Breaking Dev vs Ops Silos', milestone: 'Founded by Olivier Pomel & Alexis Lê-Quôc to solve friction between dev and ops teams.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2012)', focus: 'Cloud Server Metrics', milestone: 'Released open-source agent for AWS EC2 instances; simple installation in <5 minutes.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2014)', focus: 'Turn Chaos into Clarity', milestone: 'Positioned as the first cloud-scale monitoring service supporting dynamic container workloads.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2016)', focus: 'Friendly Dog Mascot & Dark UI', milestone: 'Stood out against legacy IBM/HP/CA enterprise suites with clean dark charts and recognizable mascot.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2018)', focus: 'Unified Metrics, Traces & Logs', milestone: 'Expanded beyond server metrics to full APM tracing and distributed log analytics.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2019)', focus: 'NASDAQ IPO ($10B+ Valuation)', milestone: 'Listed on NASDAQ; expanded into security monitoring and synthetic testing.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2023)', focus: 'LLM Observability & Cloud Security', milestone: 'Surpassed $2B ARR driven by multi-product land-and-expand account growth.' },
          ],
          takeaways: {
            positioningLesson: 'Targeted the shift from on-premise servers to AWS cloud instances when legacy monitoring vendors were too slow to adapt.',
            sequencingLesson: 'Started with an ultra-fast agent install (<5 minutes) that delivered immediate visibility before adding APM and logs.',
            productToBrandTransition: 'Emphasized developer joy, approachable documentation, and polished dark dashboards over traditional enterprise sales pitches.',
            customerAcquisitionLesson: 'Bottom-up adoption by engineering teams who put corporate credit cards on file without procurement friction.',
            distributionLesson: 'Self-serve free trial → Engineering team adoption → Bottom-up enterprise procurement.',
            expansionLesson: 'Added logs, APM, and security modules so customers grew contract value organically year after year.',
            brandIdentityLesson: 'Playful dog icon softened complex enterprise infrastructure, making it approachable.',
            whatNotToCopy: 'Avoid launching with 15 observability products simultaneously; win with one high-friction operational metric first.',
            sequencingLessons: 'Started with an ultra-fast agent install (<5 minutes) that delivered immediate visibility before adding APM and logs.',
            positioningDecisions: 'Targeted the shift from on-premise servers to AWS cloud instances when legacy monitoring vendors were too slow to adapt.',
            distributionStrategy: 'Self-serve free trial → Engineering team adoption → Bottom-up enterprise procurement.',
            mistakesAndRisks: 'Unpredictable consumption billing created customer friction around unexpected month-end invoice spikes.',
          },
        },
        {
          id: 'cr_2',
          competitorName: 'Amplitude',
          category: 'Product Analytics & Behavioral Data',
          evolutionTrajectory: 'Text messaging app (Sonalight) → Internal analytics tool → Self-serve product analytics leader',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Spenser Skates founder interviews, S-1 public registration statement (2021)',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2012)', focus: 'Internal Tool Pivot', milestone: 'Original voice app failed; pivoted to commercialize internal event tracking system.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2014)', focus: 'Scalable Behavioral Cohorting', milestone: 'Built proprietary Nova query engine capable of querying billions of user actions in seconds.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2016)', focus: 'Product-Led Growth Engine', milestone: 'Positioned against Google Analytics: "Pageviews don’t matter, retention and behavior matter."' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2018)', focus: 'The Product Intelligence Company', milestone: 'Rebranded from simple charts to a strategic platform that drives digital revenue.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2019)', focus: 'Self-Serve Tier to Enterprise Expansion', milestone: 'Launched 10M free event tier, creating bottom-up pipeline into Fortune 500 accounts.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2020)', focus: 'Session Replay & Feature Flags', milestone: 'Launched Experiment and CDP to provide end-to-end product optimization.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2021)', focus: 'Direct Listing on NASDAQ', milestone: 'Direct listed at $5B valuation with 1,200+ enterprise customers.' },
          ],
          takeaways: {
            positioningLesson: 'Coined "Product Intelligence" to move out of the commoditized web-analytics category and speak directly to Chief Product Officers.',
            sequencingLesson: 'Invested heavily in proprietary query architecture (Nova) early on so speed remained sub-second as customer event volume grew 100x.',
            productToBrandTransition: 'Published "The Product Analytics Playbook" as a free definitive guide, turning education into customer acquisition.',
            customerAcquisitionLesson: 'Offered 10M free monthly events to high-growth startups, converting them to 6-figure contracts as they scaled.',
            distributionLesson: 'Generous free tier (10M monthly events) to seed startups, converting them to 6-figure contracts as they scaled.',
            expansionLesson: 'Expanded from behavioral charts to feature flags and A/B testing experimentation.',
            brandIdentityLesson: 'Dark cobalt and neon coral palette signaled high-performance analytical precision.',
            whatNotToCopy: 'Do not attempt to build a custom columnar database engine unless standard managed databases provably cannot handle your data volume.',
            sequencingLessons: 'Invested heavily in proprietary query architecture (Nova) early on so speed remained sub-second as customer event volume grew 100x.',
            positioningDecisions: 'Coined "Product Intelligence" to move out of the commoditized web-analytics category and speak directly to Chief Product Officers.',
            distributionStrategy: 'Generous free tier (10M monthly events) to seed startups, converting them to 6-figure contracts as they scaled.',
            mistakesAndRisks: 'Pricing models tied strictly to event volume created customer hesitation around tracking too many user actions.',
          },
        },
        {
          id: 'cr_3',
          competitorName: 'Mixpanel',
          category: 'Event-Based Analytics',
          evolutionTrajectory: 'Funnel analytics tool → Complex enterprise suite → Re-simplified self-serve analytics platform',
          validationStatus: 'VERIFIED',
          sourceEvidence: 'Suhail Doshi founder retrospectives, Mixpanel product changelog (2009-2024)',
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2009)', focus: 'Conversion Funnel Tracking', milestone: 'Founded in Y Combinator (S09); made tracking web conversion drop-offs effortless.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2011)', focus: 'Mobile App SDKs', milestone: 'Rode the iOS/Android app boom by providing real-time mobile user event tracking.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2013)', focus: 'Actions Speak Louder than Pageviews', milestone: 'Positioned as the essential tool for startup founders to measure engagement.' },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2017)', focus: 'Enterprise Sales Pivot', milestone: 'Shifted focus to enterprise RFPs with complex custom pricing; alienated early startup base.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2020)', focus: 'Self-Serve Renaissance', milestone: 'Under new leadership, eliminated sales friction, introduced free tier, and overhauled UI.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6 (2022)', focus: 'Product Analytics & Team Workspaces', milestone: 'Launched group analytics, board reporting templates, and collaboration dashboards.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7 (2023)', focus: 'Warehouse-Native Analytics', milestone: 'Integrated directly with Snowflake and BigQuery to analyze data without dual ingestion.' },
          ],
          takeaways: {
            positioningLesson: 'Successfully reclaimed market share by returning to transparent self-serve pricing after enterprise over-complexity stalled growth.',
            sequencingLesson: 'Won early by being the simplest tool to answer "where do users drop off in my signup funnel?".',
            productToBrandTransition: 'Invested in high-craft UI/UX and dark mode visualizations that engineers and product managers enjoyed looking at all day.',
            customerAcquisitionLesson: 'Viral badge attribution ("Analytics by Mixpanel") embedded on thousands of startup footers.',
            distributionLesson: 'Self-serve PLG with transparent tier pricing ($20/mo to $800/mo) without forcing buyers into enterprise sales calls.',
            expansionLesson: 'Warehouse-native query execution eliminated separate ETL pipelines for modern data teams.',
            brandIdentityLesson: 'Understated, sleek typography and high-contrast charts built deep developer affinity.',
            whatNotToCopy: 'Never abandon your core self-serve startup adopters to chase enterprise deals before your product has mature enterprise governance.',
            sequencingLessons: 'Won early by being the simplest tool to answer "where do users drop off in my signup funnel?".',
            positioningDecisions: 'Successfully reclaimed market share by returning to transparent self-serve pricing after enterprise over-complexity stalled growth.',
            distributionStrategy: 'Self-serve PLG with transparent tier pricing ($20/mo to $800/mo) without forcing buyers into enterprise sales calls.',
            mistakesAndRisks: 'Moving upmarket prematurely and abandoning the startup self-serve tier allowed Amplitude and Heap to capture market share.',
          },
        }
      );
    }

    // Incorporate all other Stage 03 competitors (archetypes or custom user-added competitors)
    rawUpstreamCompetitors.forEach((comp, idx) => {
      const exists = competitorRoadmaps.some(
        (c) => c.competitorName.toLowerCase() === comp.name.toLowerCase()
      );
      if (!exists) {
        const compStrengths = Array.isArray(comp.strengths) ? comp.strengths.join(', ') : '';
        const compWeaknesses = Array.isArray(comp.weaknesses) ? comp.weaknesses.join(', ') : '';
        const compPositioning = comp.positioningLabel || 'Established category incumbent';

        competitorRoadmaps.push({
          id: `cr_upstream_${idx + 1}`,
          competitorName: comp.name,
          category: comp.category ? `${comp.category.toUpperCase()} • ${category}` : category,
          evolutionTrajectory: `${compPositioning} → Direct category presence → Mainstream market share`,
          validationStatus: comp.provenance === 'USER_PROVIDED' ? 'VERIFIED' : 'NEEDS VALIDATION',
          sourceEvidence: comp.evidenceSource || `Stage 03 Market Intelligence: ${compStrengths.slice(0, 50) || 'Analyzed category incumbent'}`,
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1', focus: `${comp.name} Inception`, milestone: 'Established initial operational baseline in category.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2', focus: 'Core Capability Delivery', milestone: compStrengths || 'Shipped baseline commercial offering.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3', focus: 'Category Value Claim', milestone: compPositioning },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4', focus: 'Brand Identity Recognition', milestone: 'Established recognizable category presence.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5', focus: 'Commercial Distribution', milestone: comp.businessPricingModel ? `Pricing model: ${comp.businessPricingModel}` : 'Direct distribution rollout.' },
            { stageName: 'EXPANSION', yearOrPhase: 'Phase 6', focus: 'Channel & Portfolio Breadth', milestone: 'Broadened regional distribution and customer reach.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 7', focus: 'Category Moat & Retention', milestone: compWeaknesses ? `Vulnerability: ${compWeaknesses}` : 'Maintains active category market share.' },
          ],
          takeaways: {
            positioningLesson: compPositioning ? `Position against ${comp.name}'s generic offering with high-contrast differentiation.` : `Differentiate clearly against ${comp.name}.`,
            sequencingLesson: `Address the primary weakness observed in ${comp.name}: ${compWeaknesses || 'operational inertia'}.`,
            productToBrandTransition: `Leverage differentiation factor: ${comp.differentiationFactor || 'superior user craft'}.`,
            customerAcquisitionLesson: 'Attract dissatisfied customers through transparent comparison and fast time-to-value.',
            distributionLesson: 'Focus on direct beachhead channels rather than trying to replicate their legacy footprint.',
            expansionLesson: 'Deepen retention in core wedge before attempting broad-market feature parity.',
            brandIdentityLesson: 'Use modern, high-contrast visual signifiers to immediately look next-generation.',
            whatNotToCopy: `Do not copy ${comp.name}'s legacy complexity or slow turnaround: ${compWeaknesses || 'legacy overhead'}.`,
            sequencingLessons: `Address the primary weakness observed in ${comp.name}: ${compWeaknesses || 'operational inertia'}.`,
            positioningDecisions: compPositioning,
            distributionStrategy: 'Direct commercial sales and traditional search presence.',
            mistakesAndRisks: compWeaknesses || 'Risk of complacency and slow product iteration cycles.',
          },
        });
      }
    });
  }

  // 16B. MULTI-COMPETITOR PATTERN COMPARISON MATRIX
  const competitorComparisons: CompetitorPatternComparison[] = competitorRoadmaps.map((c) => ({
    competitorName: c.competitorName,
    category: c.category,
    positioningWedge: c.takeaways.positioningLesson,
    positioningScore: c.validationStatus === 'VERIFIED' ? 3 : 2,
    brandShiftMoment: c.takeaways.productToBrandTransition,
    brandShiftScore: c.validationStatus === 'VERIFIED' ? 3 : 2,
    initialDistribution: c.takeaways.distributionLesson,
    distributionScore: c.validationStatus === 'VERIFIED' ? 3 : 2,
    expansionVector: c.takeaways.expansionLesson,
    expansionScore: c.validationStatus === 'VERIFIED' ? 3 : 2,
    founderSynthesis: `Extract: ${c.takeaways.sequencingLesson.slice(0, 80)}... Avoid: ${c.takeaways.whatNotToCopy.slice(0, 75)}...`,
  }));

  // 17. FOUNDER LEARNING RESOURCES (Category-Grounded References)
  const learningResources: FounderLearningResource[] = isPhysical
    ? [
        {
          id: 'flr_1',
          title: 'Building a D2C Brand Moat: From Farmers Market to Acquisition',
          category: 'Brand Strategy & Scaling',
          type: 'case_study',
          source: 'Stanford GSB Case Studies / YC Startup School',
          durationOrReadTime: '18 min read',
          takeaway: 'How early physical product founders leverage uncompromising craft constraints into defensible brand equity.',
          relevanceTag: 'Physical CPG Strategy',
        },
        {
          id: 'flr_2',
          title: 'Packaging & Unboxing as Your Primary Growth Channel',
          category: 'Customer Experience',
          type: 'playbook',
          source: 'D2C Packaging Institute / Pentawards Archive',
          durationOrReadTime: '12 min read',
          takeaway: 'The tactile psychology of unboxing: turning shipping boxes into organic social shares and repeat orders.',
          relevanceTag: 'Tactile Brand Experience',
        },
        {
          id: 'flr_3',
          title: 'Pricing Strategy for Craft vs. Commodity Physical Goods',
          category: 'Unit Economics & Positioning',
          type: 'framework',
          source: 'Harvard Business Review / ProfitWell',
          durationOrReadTime: '15 min read',
          takeaway: 'Why cost-plus pricing destroys premium brands and how value-based positioning protects 65%+ gross margins.',
          relevanceTag: 'Margin Protection',
        },
        {
          id: 'flr_4',
          title: 'The Omnichannel Progression: Web D2C → Specialty Retail → Wholesale',
          category: 'Distribution Roadmap',
          type: 'playbook',
          source: 'Modern Retail / Retail Brew',
          durationOrReadTime: '20 min read',
          takeaway: 'Sequencing retail distribution without starving cash flow or eroding direct customer relationships.',
          relevanceTag: 'Distribution Sequencing',
        },
      ]
    : [
        {
          id: 'flr_1',
          title: 'Obviously Awesome: How to Nail Product Positioning',
          category: 'Positioning Strategy',
          type: 'framework',
          source: 'April Dunford / Ambient Strategy',
          durationOrReadTime: '22 min read',
          takeaway: 'The 5-step positioning framework to shift from competitive comparison to an uncontested product category.',
          relevanceTag: 'B2B Positioning Framework',
        },
        {
          id: 'flr_2',
          title: 'How to Build a Developer-First Brand That Engineers Actually Trust',
          category: 'Brand Ethos & Voice',
          type: 'case_study',
          source: 'Heavybit Industries / Stripe Developer Relations',
          durationOrReadTime: '16 min read',
          takeaway: 'Why marketing fluff repels technical buyers and how radical documentation transparency converts engineers.',
          relevanceTag: 'Technical Brand Voice',
        },
        {
          id: 'flr_3',
          title: 'The Product-Led Growth Playbook: From Free User to Enterprise Land-and-Expand',
          category: 'Growth & Distribution',
          type: 'playbook',
          source: 'OpenView Venture Partners',
          durationOrReadTime: '25 min read',
          takeaway: 'How to design onboarding funnels where the product demonstrates its core value within 60 seconds of signup.',
          relevanceTag: 'PLG Onboarding',
        },
        {
          id: 'flr_4',
          title: 'From Commodity Analytics to Category Leader: The Amplitude Case Study',
          category: 'Category Creation',
          type: 'case_study',
          source: 'First Round Review',
          durationOrReadTime: '19 min read',
          takeaway: 'How pivoting from vanity metrics to behavioral retention created a $5B market category.',
          relevanceTag: 'Category Design',
        },
      ];

  // 18. BRAND STRATEGIC DECISIONS
  const strategicDecisions: BrandStrategicDecisionsData = {
    recommendedPositioningDirection: `${positioningStatement.category} with ${defaultDiff}`,
    differentiationTerritory: defaultDiff,
    strategicPriorities: [
      `Anchor brand trust in validated operational capability: "${defaultDiff}".`,
      `Deliver immediate contrast against legacy incumbents (${marketIntelligence?.competitors?.map((c) => c.name).slice(0, 2).join(', ') || 'status-quo alternatives'}).`,
      `Design the Day-1 MVP user journey to deliver core value in under 3 minutes.`,
      `Maintain strict focus on early beachhead adopters (${targetAudience.slice(0, 45)}...) before expanding outward.`,
    ],
    brandRisks: [
      {
        risk: 'Commodity Convergence',
        severity: 'High',
        impact: 'Incumbents replicate messaging without matching capability, confusing buyers.',
        mitigation: `Double down on ${defaultDiff} and showcase transparent empirical benchmarks that competitors cannot fake.`,
      },
      {
        risk: 'Premature Broad-Market Marketing',
        severity: 'Medium',
        impact: 'Dilutes positioning clarity and burns cash on low-intent prospective audiences.',
        mitigation: 'Restrict paid marketing to the beachhead customer cluster until retention curves flatten positively.',
      },
      {
        risk: 'Brand Promise & Product Gap',
        severity: 'High',
        impact: 'Marketing promises capabilities that the Day-1 MVP cannot yet reliably deliver.',
        mitigation: 'Strictly align marketing claims with the Stage 05 MVP Scope Matrix and verified feature architecture.',
      },
    ],
    sequencingStrategy: `Phase 1: Founder Thesis Validation → Phase 2: High-Contrast Positioning Wedge → Phase 3: Brand Identity in Stage 05A → Phase 4: Stage 05B MVP Architecture → Phase 5: Stage 08 Beachhead Rollout.`,
  };

  return {
    id: `brand_roadmap_${Date.now()}`,
    ventureName,
    category,
    generatedAt: new Date().toISOString(),
    identityAudit,
    brandDnaNodes,
    differentiatorChain: {
      activeDifferentiatorId: differentiatorCandidates[0].id,
      candidates: differentiatorCandidates,
    },
    positioningStatement,
    personalityTraits,
    brandVoice,
    taglineWorkspace: {
      activeTagline: taglineDirections[3].tagline,
      directions: taglineDirections,
    },
    logoGenerator: {
      selectedConceptId: selectedLogo.id,
      concepts: logoConcepts,
    },
    colorSystem: {
      paletteRationale: 'Constructed around WCAG AA contrast standards, balancing deep obsidian grounding with electric focal accents.',
      swatches: colorSwatches,
    },
    typographySystem: {
      selectedPairId: selectedTypo.id,
      pairs: typographyPairs,
    },
    brandBoard: {
      selectedMark: selectedLogo,
      colorPalette: colorSwatches,
      typography: selectedTypo,
      personalityProfile: personalityTraits.map((t) => `${t.leftLabel} vs ${t.rightLabel} (${t.userValue}%)`),
      voiceCharacteristics: voiceAttributes.filter((v) => v.selected).map((v) => v.name),
      tagline: taglineDirections[3].tagline,
      positioningStatement: positioningStatement.fullStatement,
    },
    customerExperience: {
      touchpoints,
    },
    roadmapTimeline: {
      milestones,
    },
    decisionBoard,
    stage05Handoff,
    transformationRoadmap,
    competitorRoadmaps,
    competitorComparisons,
    learningResources,
    strategicDecisions,
  };
}


// Exported parametric logo SVG generator
export function generateLogoSvg(
  conceptId: string,
  initials: string,
  customization: LogoConcept['customization']
): string {
  const {
    primaryColor = '#4D8DFF',
    secondaryColor = '#38BDF8',
    backgroundColor = '#151E2B',
    geometryRadius = 12,
    symbolScale = 100,
    complexity = 2,
  } = customization;

  const scaleFactor = (symbolScale || 100) / 100;
  const strokeW = Math.max(1, Math.round(complexity * 1.5));
  const r = geometryRadius ?? 12;

  switch (conceptId) {
    case 'logo_seal': {
      return `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="${backgroundColor || '#0B1017'}" stroke="${primaryColor}" stroke-width="${strokeW}" stroke-dasharray="${complexity > 2 ? '4 2' : 'none'}" />
          <circle cx="50" cy="50" r="32" fill="#151E2B" stroke="${secondaryColor}" stroke-width="1.5" />
          <g transform="scale(${scaleFactor}) translate(${50 * (1 - scaleFactor) / scaleFactor}, ${50 * (1 - scaleFactor) / scaleFactor})">
            <text x="50" y="58" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#F3F4F6" text-anchor="middle">${initials}</text>
            <path d="M35 50 Q50 32 65 50" fill="none" stroke="${primaryColor}" stroke-width="${strokeW}" />
          </g>
        </svg>
      `.trim();
    }
    case 'logo_glyph': {
      return `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(${scaleFactor}) translate(${50 * (1 - scaleFactor) / scaleFactor}, ${50 * (1 - scaleFactor) / scaleFactor})">
            <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" fill="${backgroundColor || '#111823'}" stroke="${primaryColor}" stroke-width="${strokeW}" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="${secondaryColor}" stroke-width="${strokeW}" />
            <line x1="15" y1="35" x2="85" y2="65" stroke="${primaryColor}" stroke-width="1.5" opacity="0.6" />
            <line x1="15" y1="65" x2="85" y2="35" stroke="${primaryColor}" stroke-width="1.5" opacity="0.6" />
            <circle cx="50" cy="50" r="${4 + complexity}" fill="${secondaryColor}" />
          </g>
        </svg>
      `.trim();
    }
    case 'logo_typographic': {
      return `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="24" width="84" height="52" rx="${r}" fill="${backgroundColor || '#151E2B'}" stroke="${secondaryColor}" stroke-width="${strokeW}" />
          <g transform="scale(${scaleFactor}) translate(${50 * (1 - scaleFactor) / scaleFactor}, ${50 * (1 - scaleFactor) / scaleFactor})">
            <path d="M20 38 L16 38 L16 62 L20 62" fill="none" stroke="${primaryColor}" stroke-width="${strokeW}" stroke-linecap="round" />
            <path d="M80 38 L84 38 L84 62 L80 62" fill="none" stroke="${primaryColor}" stroke-width="${strokeW}" stroke-linecap="round" />
            <text x="50" y="56" font-family="monospace" font-weight="900" font-size="18" fill="#F3F4F6" text-anchor="middle" letter-spacing="2">${initials}</text>
          </g>
        </svg>
      `.trim();
    }
    case 'logo_monogram':
    default: {
      return `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="76" height="76" rx="${r}" fill="${backgroundColor || '#151E2B'}" stroke="${primaryColor}" stroke-width="${strokeW + 1}" />
          <g transform="scale(${scaleFactor}) translate(${50 * (1 - scaleFactor) / scaleFactor}, ${50 * (1 - scaleFactor) / scaleFactor})">
            <path d="M30 70 L30 30 L50 52 L70 30 L70 70" fill="none" stroke="#F3F4F6" stroke-width="${strokeW + 2}" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="50" cy="50" r="${3 + complexity}" fill="${secondaryColor}" />
          </g>
        </svg>
      `.trim();
    }
  }
}

