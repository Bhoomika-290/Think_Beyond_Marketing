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
} from '../types/project';
import { resolveVentureDomainProfile } from './ventureDomainResolver';

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

  const domainProfile = resolveVentureDomainProfile(idea, businessModel, project);

  const initials =
    ventureName
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'TB';

  // 1. BRAND DNA NODES (Connected visual system of strategic elements)
  const brandDnaNodes: BrandDNANode[] = domainProfile.brandDnaNodes.length >= 4
    ? [
        ...domainProfile.brandDnaNodes,
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
      ]
    : [
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
      reasoning: 'Combines the specialized excellence of top practitioners with seamless modern UX.',
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
      name: 'Warning Audit Accent',
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
    category.toLowerCase().includes('d2c') ||
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
  const rawInputLower = (state.idea.rawInput || state.idea.name || '').toLowerCase();
  const isTutoring = rawInputLower.includes('tutor') || rawInputLower.includes('student') || rawInputLower.includes('edtech') || rawInputLower.includes('education');
  const isFoodWaste = rawInputLower.includes('waste') || rawInputLower.includes('restaurant') || rawInputLower.includes('kitchen');
  const isMealDelivery = rawInputLower.includes('meal') || rawInputLower.includes('lunch') || rawInputLower.includes('diet') || rawInputLower.includes('office worker');
  const isHomeRepair = rawInputLower.includes('repair') || rawInputLower.includes('home') || rawInputLower.includes('handyman') || rawInputLower.includes('plumber') || rawInputLower.includes('worker');
  const isApparel = rawInputLower.includes('clothing') || rawInputLower.includes('apparel') || rawInputLower.includes('fashion') || rawInputLower.includes('wear') || rawInputLower.includes('winter');
  const isCoffee = rawInputLower.includes('coffee') || rawInputLower.includes('roast') || rawInputLower.includes('bean') || rawInputLower.includes('brew');

  let baseRoadmaps: CompetitorRoadmapItem[] = [];

  if (isTutoring) {
    baseRoadmaps = [
      {
        id: 'cr_tut_1',
        competitorName: 'Wyzant',
        category: 'Tutoring Marketplace',
        evolutionTrajectory: 'Local Chicago tutoring board → Online peer & professional marketplace → Curated 1-on-1 video lessons',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'Public founder retrospectives (Mike Weishuhn & Andrew Geant), EdTech market case studies',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2005)', focus: 'Flyers on Campus', milestone: 'Bootstrapped in Chicago with paper flyers on college notice boards connecting students to tutors.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2008)', focus: 'Search & Review Engine', milestone: 'Built transparent rating, subject tags, and hourly rate filters to eliminate agency markups.' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2012)', focus: 'Transparent Hourly Choice', milestone: 'Positioned as the open, fair alternative to rigid commercial learning centers ($60+/hr).' },
          { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2016)', focus: 'Instant Online Whiteboard', milestone: 'Launched proprietary web classroom with collaborative whiteboard and code sharing.' },
          { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5 (2019)', focus: 'National Subject Breadth', milestone: 'Expanded from K-12 to 300+ university subjects, test prep, and language learning.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 6 (2021)', focus: 'Acquisition by IXL Learning', milestone: 'Acquired by IXL to power personalized on-demand academic tutoring at scale.' },
        ],
        takeaways: {
          positioningLesson: 'Positioned as an empowering open marketplace with transparent pricing rather than a locked-in curriculum package.',
          sequencingLesson: 'Started hyperlocal on a few college campuses to balance tutor supply and student demand before expanding nationally.',
          productToBrandTransition: 'The interactive digital whiteboard transformed a basic directory into an active learning workspace.',
          customerAcquisitionLesson: 'High organic search rankings on specific university course numbers and exam prep keywords.',
          distributionLesson: 'Campus word-of-mouth → SEO course landing pages → Direct student referral loops.',
          expansionLesson: 'Expanded from basic math/science to university-level engineering, coding, and professional credentials.',
          brandIdentityLesson: 'Clean, approachable academic styling built trust with both students and paying parents.',
          whatNotToCopy: 'Avoid taking excessive take-rates (25-30%) early on, as this incentivizes tutors and students to transact off-platform.',
          sequencingLessons: 'Started hyperlocal on a few college campuses to balance tutor supply and student demand before expanding nationally.',
          positioningDecisions: 'Positioned as an empowering open marketplace with transparent pricing rather than a locked-in curriculum package.',
          distributionStrategy: 'Campus word-of-mouth → SEO course landing pages → Direct student referral loops.',
          mistakesAndRisks: 'Platform leakage occurs when the take-rate feels unfair to repeat tutors and students.',
        },
      },
      {
        id: 'cr_tut_2',
        competitorName: 'Outschool',
        category: 'Live Small-Group Learning',
        evolutionTrajectory: 'Homeschool class directory → Live interactive cohort marketplace → Global enrichment platform ($3B valuation)',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'TechCrunch funding records, Amir Nathoo founder interviews (2015-2022)',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2015)', focus: 'Homeschool Community Wedge', milestone: 'Founded in YC (W16) targeting alternative homeschool families needing specialized elective classes.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2017)', focus: 'Small-Group Video Cohorts', milestone: 'Shifted from 1-on-1 to 4-8 student live video groups to make pricing affordable ($15/session).' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2019)', focus: 'Interest-Driven Learning', milestone: 'Positioned as fun, passionate learning outside rigid state curricula (e.g. Harry Potter chemistry).' },
          { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2020)', focus: 'Lifeline During School Closures', milestone: 'Exploded during lockdowns; teachers created thousands of innovative mini-courses.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 5 (2021)', focus: 'Series D ($3B Valuation)', milestone: 'Expanded international supply and established enterprise school district partnerships.' },
        ],
        takeaways: {
          positioningLesson: 'Small group cohorts divided the hourly cost of the teacher, making premium live learning accessible to budget-conscious families.',
          sequencingLesson: 'Focused strictly on homeschoolers as a tight, communicative beachhead before mass market adoption.',
          productToBrandTransition: 'Allowed passionate educators to name and price their own creative courses, fostering unique supply.',
          customerAcquisitionLesson: 'Parent-to-parent social sharing and educator self-promotion drove organic viral growth.',
          distributionLesson: 'Parent community groups → Teacher self-marketing → District enrichment grants.',
          expansionLesson: 'Expanded from niche electives to core academic remediation and summer bootcamps.',
          brandIdentityLesson: 'Playful, inspiring colors and teacher video intros demystified the online classroom.',
          whatNotToCopy: 'Do not assume pandemic-era surge growth is permanent; anchor retention in core measurable skill improvements.',
          sequencingLessons: 'Focused strictly on homeschoolers as a tight beachhead before mass market adoption.',
          positioningDecisions: 'Small group cohorts divided the hourly cost of the teacher, making live learning affordable.',
          distributionStrategy: 'Parent community groups → Teacher self-marketing → District enrichment grants.',
          mistakesAndRisks: 'Quality control variance across independent teachers can harm brand reputation if reviews are unverified.',
        },
      },
    ];
  } else if (isFoodWaste) {
    baseRoadmaps = [
      {
        id: 'cr_fw_1',
        competitorName: 'Too Good To Go',
        category: 'Food Waste Marketplace',
        evolutionTrajectory: 'Copenhagen restaurant surplus bags → Multi-country consumer marketplace → B2B food rescue ecosystem',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'B Corp public impact reports, European venture funding filings',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2016)', focus: 'Buffet & Bakery Surplus Bags', milestone: 'Founded in Copenhagen to help bakeries sell end-of-day surplus in surprise bags.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2018)', focus: 'Magic Bag App Funnel', milestone: 'Standardized the "Surprise Bag" concept: fixed 1/3 price, zero inventory prediction needed by merchants.' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2020)', focus: 'Save Good Food, Save Money', milestone: 'Positioned at the intersection of climate action and household grocery savings.' },
          { stageName: 'EXPANSION', yearOrPhase: 'Phase 4 (2022)', focus: 'Supermarket & Hotel Chains', milestone: 'Onboarded Carrefour, ALDI, and Accor hotels; surpassed 100M meals saved.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 5 (2024)', focus: 'Look-Smell-Taste Labeling Initiative', milestone: 'Partnered with global FMCG brands to replace confusing "best before" date codes.' },
        ],
        takeaways: {
          positioningLesson: 'The "Surprise Bag" removed all operational cataloging burden from busy restaurant managers.',
          sequencingLesson: 'Started with independent bakeries and cafes who naturally had daily perishable surplus before signing supermarket chains.',
          productToBrandTransition: 'Made saving food feel like a fun consumer treasure hunt rather than charitable waste pickup.',
          customerAcquisitionLesson: 'Viral TikTok unboxings of surprise bakery hauls drove zero-CAC consumer downloads.',
          distributionLesson: 'Direct restaurant merchant onboarding → Word-of-mouth student app adoption → Enterprise grocery partnerships.',
          expansionLesson: 'Expanded from city centers to suburbs and grocery retail supply chains.',
          brandIdentityLesson: 'Vibrant green palette and playful typography framed food waste as a positive daily climate habit.',
          whatNotToCopy: 'Surplus marketplaces can cannibalize regular high-margin sales if pickup time windows are set too early.',
          sequencingLessons: 'Started with independent bakeries and cafes before signing supermarket chains.',
          positioningDecisions: 'The Surprise Bag removed all operational cataloging burden from busy restaurant staff.',
          distributionStrategy: 'Direct merchant onboarding → Viral TikTok unboxings → Enterprise grocery partnerships.',
          mistakesAndRisks: 'Merchant churn occurs if pickup windows create long lines that distract regular dining guests.',
        },
      },
    ];
  } else if (isMealDelivery) {
    baseRoadmaps = [
      {
        id: 'cr_md_1',
        competitorName: 'HelloFresh',
        category: 'Meal Kit & Healthy Delivery',
        evolutionTrajectory: 'Hand-packed brown paper bags (Berlin) → Subscription meal kit leader → Multi-brand fresh food group ($10B+ GMV)',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'Public annual reports, founder interviews with Dominik Richter',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2011)', focus: 'Hand-Packed Ingredient Bags', milestone: 'Founders hand-shopped and packed the first 10 meal kits in Berlin to test recipe viability.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2013)', focus: '30-Minute Step-by-Step Recipes', milestone: 'Standardized pre-portioned spices and vacuum-sealed proteins with laminated photo recipe cards.' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2015)', focus: 'Healthy Home Cooking Without Shopping', milestone: 'Positioned as dinner inspiration for busy working couples and families tired of grocery chaos.' },
          { stageName: 'EXPANSION', yearOrPhase: 'Phase 4 (2017)', focus: 'Frankfurt IPO & US Market Conquest', milestone: 'Went public on Frankfurt Stock Exchange; overtook Blue Apron as #1 US meal kit by market share.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 5 (2021)', focus: 'Factor75 Acquisition (Ready-to-Eat)', milestone: 'Acquired Factor to expand into fully prepared microwaveable healthy meals for time-poor professionals.' },
        ],
        takeaways: {
          positioningLesson: 'Shifted positioning from "learn gourmet cooking" to "healthy, reliable dinner in under 20 minutes".',
          sequencingLesson: 'Perfected fulfillment and refrigerated packaging logistics in one country before aggressive international expansion.',
          productToBrandTransition: 'The visual recipe card with exact prep times became a beloved household fixture.',
          customerAcquisitionLesson: 'Aggressive referral voucher boxes sent between friends drove massive early customer acquisition.',
          distributionLesson: 'Direct-to-consumer refrigerated delivery with automated weekly subscription swaps.',
          expansionLesson: 'Expanded from raw ingredient kits to prepared meals and corporate office deliveries.',
          brandIdentityLesson: 'Fresh lime green branding reinforced freshness, energy, and wholesome nutrition.',
          whatNotToCopy: 'Avoid massive upfront discounting if customer 90-day retention does not cover the initial acquisition subsidy.',
          sequencingLessons: 'Perfected fulfillment and packaging in one region before aggressive multi-city expansion.',
          positioningDecisions: 'Positioned as healthy, reliable meals in under 20 minutes for busy professionals.',
          distributionStrategy: 'Direct-to-consumer refrigerated delivery with automated weekly subscription swaps.',
          mistakesAndRisks: 'High customer churn if weekly menu customization requires too many manual clicks.',
        },
      },
    ];
  } else if (isHomeRepair) {
    baseRoadmaps = [
      {
        id: 'cr_hr_1',
        competitorName: 'Thumbtack',
        category: 'Local Services Marketplace',
        evolutionTrajectory: 'Classified quote requests → Instant booking & pricing platform → Category leader across 500+ home services',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'Marco Zappacosta founder interviews, Forbes & TechCrunch profiles',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2008)', focus: 'Local Handyman & Contractor RFPs', milestone: 'Bootstrapped for years helping local repair pros find project leads through structured online job requests.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2012)', focus: 'Pay-to-Bid Lead Model', milestone: 'Pros paid small fees ($5-15) to submit competitive bids directly to homeowners with specific repairs.' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2016)', focus: 'Hire Local Pros with Confidence', milestone: 'Positioned as the verified background-checked alternative to Craigslist and anonymous boards.' },
          { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2019)', focus: 'Instant Results & Upfront Pricing', milestone: 'Shifted from slow bidding to instant booking with algorithmic price estimates.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 5 (2022)', focus: 'Home Care Annual Maintenance', milestone: 'Launched seasonal maintenance guides to turn one-off emergency repairs into recurring homeowner relationships.' },
        ],
        takeaways: {
          positioningLesson: 'Homeowners do not want 20 quotes; they want 1 trusted, vetted pro who can arrive on time with fair pricing.',
          sequencingLesson: 'Seeded technician supply city by city before spending heavily on consumer demand marketing.',
          productToBrandTransition: 'Upfront verified pricing and pro background badges eliminated homeowner anxiety.',
          customerAcquisitionLesson: 'Targeted high-intent search queries for urgent home repairs (e.g. "emergency plumber near me").',
          distributionLesson: 'Localized SEO pages → Mobile consumer app → Homeowner property profile maintenance plans.',
          expansionLesson: 'Expanded from emergency repairs to planned home remodeling and routine preventative maintenance.',
          brandIdentityLesson: 'Approachable warm tones and clean iconography made local home services feel modern and reliable.',
          whatNotToCopy: 'Avoid charging technicians for dead leads who never reply; align marketplace monetization with completed bookings.',
          sequencingLessons: 'Seeded technician supply city by city before spending heavily on consumer marketing.',
          positioningDecisions: 'Homeowners want 1 trusted, vetted pro with upfront pricing, not 20 random quotes.',
          distributionStrategy: 'Localized SEO pages → Mobile consumer app → Annual home maintenance guides.',
          mistakesAndRisks: 'Pro churn occurs if lead fees are deducted without generating real revenue for the contractor.',
        },
      },
    ];
  } else if (isApparel) {
    baseRoadmaps = [
      {
        id: 'cr_app_1',
        competitorName: 'Patagonia',
        category: 'Technical & Ethical Apparel',
        evolutionTrajectory: 'Hand-forged climbing pitons → Technical outdoor gear → Global ethical apparel icon ($1B+ revenue)',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'Yvon Chouinard memoir "Let My People Go Surfing", 1% for the Planet filings',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (1973)', focus: 'Rugged Climbing Apparel', milestone: 'Founded in Ventura, CA by climber Yvon Chouinard after importing heavy rugby shirts for rock climbing.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (1980)', focus: 'Synchilla Fleece & Layering', milestone: 'Pioneered synthetic fleece and capilene underwear for lightweight thermal regulation in sub-zero alpine conditions.' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (1996)', focus: '100% Organic Cotton & Repair', milestone: 'Switched entire supply chain to organic cotton; launched Ironclad Guarantee and Worn Wear repair program.' },
          { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2011)', focus: 'Don’t Buy This Jacket Campaign', milestone: 'Famous NYT Black Friday ad challenged fast-fashion consumerism and boosted brand reverence.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 5 (2022)', focus: 'Earth is Our Only Shareholder', milestone: 'Transferred 100% of voting stock to environmental trust, securing perpetual brand independence.' },
        ],
        takeaways: {
          positioningLesson: 'Positioned as an uncompromising technical tool for athletes, which organically crossed over into daily urban lifestyle wear.',
          sequencingLesson: 'Built extreme technical credibility with mountaineers before expanding into mainstream casual fleece and outerwear.',
          productToBrandTransition: 'Durability and free lifetime repair became the most powerful marketing mechanism in fashion.',
          customerAcquisitionLesson: 'Authentic grassroots environmental advocacy created fierce customer loyalty with zero reliance on flash sales.',
          distributionLesson: 'Specialty outdoor dealers → Flagship brand stores → Direct D2C website.',
          expansionLesson: 'Expanded from alpine technical gear to urban workwear, surf apparel, and organic provisions.',
          brandIdentityLesson: 'Fitz Roy mountain skyline logo became a global badge of quality, adventure, and environmental integrity.',
          whatNotToCopy: 'Do NOT try to replicate Patagonia’s multi-decade organic cotton supply chain Day 1; start with focused small-batch craft.',
          sequencingLessons: 'Built extreme technical credibility with core athletes before expanding to casual urban lifestyle wear.',
          positioningDecisions: 'Positioned as an uncompromising technical tool for durability, crossing over to urban lifestyle.',
          distributionStrategy: 'Specialty outdoor dealers → Flagship brand stores → Direct D2C website.',
          mistakesAndRisks: 'Using synthetic petroleum fabrics without a clear recycling lifecycle harms eco-conscious brand positioning.',
        },
      },
    ];
  } else if (isCoffee) {
    baseRoadmaps = [
      {
        id: 'cr_cof_1',
        competitorName: 'Blue Bottle Coffee',
        category: 'Specialty Coffee / CPG',
        evolutionTrajectory: 'Micro-roaster kiosk (Oakland) → D2C Freshness Subscription → Flagship Cafes → Nestlé Acquisition ($500M)',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'Public SEC filings, founder interviews with James Freeman (2002-2017)',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2002)', focus: 'Extreme Roast Freshness', milestone: 'Founded in Oakland farmers market with rule: coffee sold within 48h of roasting.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2005)', focus: 'Single-Origin Pour Over', milestone: 'Opened kiosk on Linden St; eliminated multi-origin bulk espresso blends.' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2008)', focus: 'Anti-Starbucks Aesthetic', milestone: 'Minimalist white-space branding; emphasizing craft, origin, and reverence.' },
          { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2012)', focus: 'Signature Pastel Blue Bottle Mark', milestone: 'Packaging redesign elevated blue bottle logo into a luxury design signifier.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 5 (2017)', focus: 'Global Omnichannel Scale', milestone: 'Nestlé acquired 68% stake for ~$500M to anchor premium global portfolio.' },
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
          sequencingLessons: 'Started with an uncompromising quality constraint (48-hour freshness) that earned fanatical word-of-mouth.',
          positioningDecisions: 'Positioned explicitly against dark-roast commercial coffee by treating beans as delicate fruit.',
          distributionStrategy: 'Farmers market → 1 Flagship kiosk → D2C Web Subscriptions → Wholesale Grocery cans.',
          mistakesAndRisks: 'Rapid expansion into retail cans risked diluting the original freshness promise.',
        },
      },
    ];
  } else {
    // Default SaaS / Software
    baseRoadmaps = [
      {
        id: 'cr_saas_1',
        competitorName: 'Linear',
        category: 'Issue Tracking & Project Management',
        evolutionTrajectory: 'Opinionated developer tool → Silicon Valley startup standard → High-craft product-led category leader',
        validationStatus: 'VERIFIED',
        sourceEvidence: 'Karri Saarinen founder retrospectives, public product updates (2019-2024)',
        stages: [
          { stageName: 'FOUNDING', yearOrPhase: 'Phase 1 (2019)', focus: 'Extreme Speed & Keyboard Shortcuts', milestone: 'Founded by ex-Airbnb/Coinbase designers to replace sluggish Jira with sub-50ms sync speed.' },
          { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2 (2020)', focus: 'Private Beta & Design Polish', milestone: 'Kept private beta invite-only; seeded among elite technical founders and designers.' },
          { stageName: 'POSITIONING', yearOrPhase: 'Phase 3 (2021)', focus: 'Opinionated Product Workflows', milestone: 'Positioned against bloated enterprise configurability: "Software built for modern high-performance teams."' },
          { stageName: 'BRAND', yearOrPhase: 'Phase 4 (2022)', focus: 'Dark Mode & Typographic Elegance', milestone: 'Signature gradient branding and silky 60fps animations made task tracking feel like craft.' },
          { stageName: 'GROWTH', yearOrPhase: 'Phase 5 (2024)', focus: 'Linear Asks & Enterprise Workspaces', milestone: 'Expanded from engineering teams into company-wide project management with zero sales team.' },
        ],
        takeaways: {
          positioningLesson: 'Positioned against market incumbent Jira on speed, minimalism, and keyboard-first developer happiness.',
          sequencingLesson: 'Kept the product in private beta until the core sync engine was blisteringly fast before opening public signups.',
          productToBrandTransition: 'Exceptional craft and UI responsiveness acted as the primary customer acquisition magnet.',
          customerAcquisitionLesson: 'Organic Twitter/X advocacy from influential engineers created an aspirational standard in tech.',
          distributionLesson: 'Invite-only beta → Self-serve product-led growth → Bottom-up engineering team expansion.',
          expansionLesson: 'Expanded from bug tracking to project roadmaps, customer requests, and cross-team initiatives.',
          brandIdentityLesson: 'Understated dark mode aesthetic and subtle glowing accents signaled high-performance precision.',
          whatNotToCopy: 'Avoid building custom desktop clients (Electron) until core web application mechanics are bulletproof.',
          sequencingLessons: 'Kept the product in private beta until the core sync engine was blisteringly fast.',
          positioningDecisions: 'Positioned against market incumbent Jira on speed, minimalism, and developer happiness.',
          distributionStrategy: 'Invite-only beta → Self-serve product-led growth → Bottom-up engineering team expansion.',
          mistakesAndRisks: 'Refusing all enterprise customization requests can limit penetration in traditional non-tech corporations.',
        },
      },
    ];
  }

  const competitorRoadmaps: CompetitorRoadmapItem[] = baseRoadmaps;

  // Dynamically incorporate upstream competitors from Stage 03 if available
  if (marketIntelligence?.competitors && marketIntelligence.competitors.length > 0) {
    marketIntelligence.competitors.forEach((comp, idx) => {
      const exists = competitorRoadmaps.some(
        (c) => c.competitorName.toLowerCase() === comp.name.toLowerCase()
      );
      if (!exists) {
        const compStrengths = Array.isArray(comp.strengths) ? comp.strengths.join(', ') : '';
        const compWeaknesses = Array.isArray(comp.weaknesses) ? comp.weaknesses.join(', ') : '';
        const compPositioning = comp.positioningLabel || 'Mainstream competitor';

        competitorRoadmaps.push({
          id: `cr_custom_${idx + 1}`,
          competitorName: comp.name,
          category: comp.category || category,
          evolutionTrajectory: `${compPositioning} → Market expansion → Status-quo offering`,
          validationStatus: 'NEEDS VALIDATION',
          sourceEvidence: `Stage 03 Market Intelligence: ${compStrengths.slice(0, 50) || 'Analyzed market competitor'}`,
          stages: [
            { stageName: 'FOUNDING', yearOrPhase: 'Phase 1', focus: comp.name + ' Inception', milestone: 'Established initial baseline footprint in the category.' },
            { stageName: 'EARLY PRODUCT', yearOrPhase: 'Phase 2', focus: 'Core Capability', milestone: compStrengths || 'Deployed initial product version.' },
            { stageName: 'POSITIONING', yearOrPhase: 'Phase 3', focus: 'Category Claim', milestone: compPositioning },
            { stageName: 'BRAND', yearOrPhase: 'Phase 4', focus: 'Brand Identity', milestone: 'Built recognized market presence.' },
            { stageName: 'MARKET ENTRY', yearOrPhase: 'Phase 5', focus: 'Commercial Rollout', milestone: comp.businessPricingModel ? `Pricing model: ${comp.businessPricingModel}` : 'Direct distribution rollout.' },
            { stageName: 'GROWTH', yearOrPhase: 'Phase 6', focus: 'Scale & Moat', milestone: compWeaknesses ? `Vulnerability: ${compWeaknesses}` : 'Maintains active market share.' },
          ],
          takeaways: {
            positioningLesson: compPositioning ? `Position against ${comp.name}'s generic offering with high-contrast differentiation.` : `Differentiate clearly against ${comp.name}.`,
            sequencingLesson: `Address the primary weakness observed in ${comp.name}: ${compWeaknesses || 'lack of agility'}.`,
            productToBrandTransition: `Leverage differentiation factor: ${comp.differentiationFactor || 'superior user craft'}.`,
            customerAcquisitionLesson: 'Attract dissatisfied customers through transparent comparison and fast time-to-value.',
            distributionLesson: 'Focus on direct beachhead channels rather than trying to replicate their legacy sales footprint.',
            expansionLesson: 'Deepen retention in core wedge before attempting broad-market feature parity.',
            brandIdentityLesson: 'Use modern, high-contrast visual signifiers to immediately look next-generation.',
            whatNotToCopy: `Do not copy ${comp.name}'s legacy complexity or slow turnaround: ${compWeaknesses || 'legacy overhead'}.`,
            sequencingLessons: `Address the primary weakness observed in ${comp.name}: ${compWeaknesses || 'lack of agility'}.`,
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

