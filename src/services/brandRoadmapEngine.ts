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
} from '../types/project';

export function generateBrandRoadmapReport(state: ProjectState): BrandRoadmapReport {
  const { idea, businessModel, project, marketIntelligence, feasibility } = state;
  const ventureName = idea.name || project.name || 'Untitled Venture';
  const category = businessModel.productType || 'venture';
  const targetAudience = idea.targetAudience || 'Discerning early adopters & target market';
  const problem = idea.problem || idea.rawInput || 'Status-quo friction with legacy alternatives';
  const defaultDiff =
    idea.differentiation ||
    marketIntelligence?.differentiatorEngine?.opportunities[0]?.differentiationArea ||
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
  const logoConcepts: LogoConcept[] = [
    {
      id: 'logo_monogram',
      name: `${ventureName} Monogram Seal`,
      style: 'Geometric Monogram',
      wordmark: ventureName.toUpperCase(),
      rationale: 'Symmetrical architectural mark conveying structural stability, precision engineering, and timeless permanence.',
      personalityAlignment: 'Professional • Progressive • Minimal',
      status: 'selected',
      customization: {
        layout: 'combination',
        complexity: 2,
        contrastMode: 'dark',
        geometryRadius: 12,
        primaryColor: '#4D8DFF',
        secondaryColor: '#38BDF8',
        backgroundColor: '#080B10',
        symbolScale: 100,
        fontTreatment: 'Monospace Geometric',
      },
      svgMarkup: `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="12" width="76" height="76" rx="16" fill="#151E2B" stroke="#4D8DFF" stroke-width="4" />
          <path d="M30 70 L30 30 L50 52 L70 30 L70 70" fill="none" stroke="#F3F4F6" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="50" cy="50" r="4" fill="#38BDF8" />
        </svg>
      `.trim(),
    },
    {
      id: 'logo_seal',
      name: `${ventureName} Heritage Crest`,
      style: 'Artisanal Seal',
      wordmark: ventureName,
      rationale: 'Concentric circular seal evoking craft heritage, single-origin integrity, and meticulous quality verification.',
      personalityAlignment: 'Craft • Human • Premium',
      status: 'candidate',
      customization: {
        layout: 'stacked',
        complexity: 3,
        contrastMode: 'dark',
        geometryRadius: 24,
        primaryColor: '#10B981',
        secondaryColor: '#059669',
        backgroundColor: '#080B10',
        symbolScale: 100,
        fontTreatment: 'Classic Serif',
      },
      svgMarkup: `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#0B1017" stroke="#10B981" stroke-width="3" stroke-dasharray="4 2" />
          <circle cx="50" cy="50" r="32" fill="#151E2B" stroke="#F3F4F6" stroke-width="1.5" />
          <text x="50" y="58" font-family="system-ui, sans-serif" font-weight="900" font-size="24" fill="#F3F4F6" text-anchor="middle">${initials}</text>
          <path d="M35 50 Q50 32 65 50" fill="none" stroke="#10B981" stroke-width="2" />
        </svg>
      `.trim(),
    },
    {
      id: 'logo_glyph',
      name: `${ventureName} Dynamic Prism`,
      style: 'Tech Glyph',
      wordmark: ventureName.toLowerCase(),
      rationale: 'Isometric crystalline prism symbolizing multidimensional data integration and razor-sharp clarity.',
      personalityAlignment: 'Technical • Bold • Progressive',
      status: 'candidate',
      customization: {
        layout: 'mark_only',
        complexity: 4,
        contrastMode: 'neon',
        geometryRadius: 8,
        primaryColor: '#38BDF8',
        secondaryColor: '#818CF8',
        backgroundColor: '#080B10',
        symbolScale: 100,
        fontTreatment: 'Modern Tech Sans',
      },
      svgMarkup: `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" fill="#111823" stroke="#38BDF8" stroke-width="3" />
          <line x1="50" y1="15" x2="50" y2="85" stroke="#4D8DFF" stroke-width="2" />
          <line x1="15" y1="35" x2="85" y2="65" stroke="#38BDF8" stroke-width="1.5" opacity="0.6" />
          <line x1="15" y1="65" x2="85" y2="35" stroke="#38BDF8" stroke-width="1.5" opacity="0.6" />
          <circle cx="50" cy="50" r="6" fill="#F3F4F6" />
        </svg>
      `.trim(),
    },
    {
      id: 'logo_typographic',
      name: `${ventureName} Editorial Wordmark`,
      style: 'Typographic Emblem',
      wordmark: ventureName.toUpperCase(),
      rationale: 'Clean sans-serif logotype flanked by precision anchor brackets for executive and high-trust communications.',
      personalityAlignment: 'Minimal • Confident • Clear',
      status: 'candidate',
      customization: {
        layout: 'wordmark_only',
        complexity: 1,
        contrastMode: 'monochrome',
        geometryRadius: 4,
        primaryColor: '#F3F4F6',
        secondaryColor: '#64748B',
        backgroundColor: '#080B10',
        symbolScale: 100,
        fontTreatment: 'Grotesque Bold',
      },
      svgMarkup: `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="24" width="84" height="52" rx="8" fill="#151E2B" stroke="#64748B" stroke-width="2" />
          <path d="M20 38 L16 38 L16 62 L20 62" fill="none" stroke="#4D8DFF" stroke-width="3" stroke-linecap="round" />
          <path d="M80 38 L84 38 L84 62 L80 62" fill="none" stroke="#4D8DFF" stroke-width="3" stroke-linecap="round" />
          <text x="50" y="56" font-family="monospace" font-weight="900" font-size="18" fill="#F3F4F6" text-anchor="middle" letter-spacing="2">${initials}</text>
        </svg>
      `.trim(),
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
    identityStatus: 'VERIFIED',
    differentiationStatus: idea.differentiation ? 'VERIFIED' : 'AI INFERENCE',
    readinessStatus: 'READY',
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
  };
}
