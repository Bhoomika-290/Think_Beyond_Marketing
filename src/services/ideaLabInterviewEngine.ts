import type {
  CustomerType,
  DeliveryModel,
  ProductType,
} from '../types/project';

// ---------------------------------------------------------------------------
// Idea Lab — Business Intelligence Interviewer engine.
//
// Pure, client-side reasoning over the founder's own words. No external data,
// no market statistics, no competitor invention. Everything the engine returns
// is labeled VERIFIED DATA (echo of user input), BUSINESS PATTERN (a known
// business-model archetype matched by keywords), HYPOTHESIS (an inference
// that must be validated), or QUESTION TO VALIDATE.
//
// The UI layer (InterviewerChat) stays in charge of project state; this
// module only *proposes* structured updates for fields that are still empty.
// ---------------------------------------------------------------------------

export interface VentureSnapshot {
  rawInput: string;
  productType: ProductType | null;
  targetAudience: string;
  problem: string;
  differentiation: string;
  constraints: string;
  goals: string;
  context: string;
  openQuestions: string[];
  country: string;
  cityRegion: string;
  deliveryModel: DeliveryModel | null;
  customerType: CustomerType | null;
}

export interface HistoryMessage {
  sender: 'ai' | 'user';
  text: string;
}

export interface ExtractedSignals {
  productType: ProductType | null;
  productTypeConfidence: 'high' | 'medium' | 'low' | null;
  productTypeEvidence: string[];
  audience: string | null;
  problem: string | null;
  country: string | null;
  cityRegion: string | null;
  customerType: CustomerType | null;
  deliveryModel: DeliveryModel | null;
  differentiation: string | null;
  constraints: string | null;
  goals: string | null;
  archetypes: string[];
  topics: string[];
}

export interface ProposedUpdates {
  productType: ProductType | null;
  targetAudience: string | null;
  problem: string | null;
  differentiation: string | null;
  constraints: string | null;
  goals: string | null;
  context: string | null;
  country: string | null;
  cityRegion: string | null;
  customerType: CustomerType | null;
  deliveryModel: DeliveryModel | null;
  openQuestions: string[];
}

export interface InterviewResult {
  replyText: string;
  updates: ProposedUpdates;
  savedSummary: string[];
  /** Ephemeral quick-reply options for the current question (UI affordance only). */
  chips: string[];
  /** Id of the active one-shot probe, if the reply asked one; null otherwise. */
  probeId: string | null;
}

// --- Pattern banks (keyword signals only — never presented as facts) --------

const PRODUCT_SIGNALS: { type: ProductType; label: string; keywords: string[] }[] = [
  {
    type: 'physical',
    label: 'Physical Product',
    keywords: [
      'cloth', 'clothing', 'apparel', 'garment', 'fashion', 'wear', 'jacket', 'sweater', 'shoe',
      'furniture', 'hardware', 'device', 'gadget', 'toy', 'cosmetic', 'skincare',
      'food', 'snack', 'beverage', 'coffee', 'tea', 'spice', 'soap', 'candle',
      'physical product', 'manufactur', 'inventory', 'packaging', 'd2c brand',
      'cpg', 'consumer packaged', 'wholesale', 'retail product', 'fmcg',
    ],
  },
  {
    type: 'saas',
    label: 'Software / SaaS',
    keywords: [
      'saas', 'software', ' app', 'mobile app', 'web app', 'platform', 'dashboard',
      'api', 'ai tool', 'chatbot', 'analytics', 'crm', 'automation', 'plugin',
      'extension', 'subscription software', 'cloud',
    ],
  },
  {
    type: 'marketplace',
    label: 'Marketplace',
    keywords: [
      'marketplace', 'peer-to-peer', 'p2p', 'two-sided', 'buyers and sellers',
      'renting', 'rental', 'listing', 'commission', 'take rate', 'hosts and guests',
      'providers and customers',
    ],
  },
  {
    type: 'service',
    label: 'Service / Agency',
    keywords: [
      'agency', 'consultancy', 'consulting', 'services', 'studio', 'firm',
      'freelance', 'done-for-you', 'retainer', 'clients',
      'logistics', 'delivery service', 'cleaning', 'repair', 'salon',
      'education', 'coaching', 'tutoring', 'course', 'training',
      'health', 'clinic', 'fitness', 'finance', 'accounting', 'legal',
      'hospitality', 'hotel', 'restaurant', 'cafe', 'catering', 'food',
      'media', 'entertainment', 'events',
    ],
  },
  {
    type: 'community',
    label: 'Community',
    keywords: [
      'community', 'cohort', 'membership', 'members', 'club', 'network',
      'mastermind', 'forum', 'discord', 'collective',
    ],
  },
  {
    type: 'creator',
    label: 'Creator Brand',
    keywords: [
      'creator', 'course', 'coaching', 'youtube', 'newsletter', 'podcast',
      'personal brand', 'content', 'audience building', 'digital product',
      'ebook', 'workshop',
    ],
  },
];

const KNOWN_COUNTRIES = [
  'india', 'united states', 'usa', 'u.s.', 'united kingdom', 'uk', 'germany',
  'france', 'canada', 'australia', 'singapore', 'uae', 'dubai', 'japan',
  'brazil', 'netherlands', 'spain', 'italy', 'indonesia', 'malaysia',
  'thailand', 'vietnam', 'philippines', 'south africa', 'mexico',
];

const INDIA_REGIONS = [
  'rajasthan', 'jaipur', 'udaipur', 'jodhpur', 'kota', 'maharashtra', 'mumbai',
  'pune', 'delhi', 'ncr', 'gurgaon', 'noida', 'bengaluru', 'bangalore',
  'karnataka', 'tamil nadu', 'chennai', 'hyderabad', 'telangana', 'kerala',
  'kochi', 'gujarat', 'ahmedabad', 'surat', 'punjab', 'west bengal', 'kolkata',
  'uttar pradesh', 'lucknow', 'madhya pradesh', 'bihar', 'odisha', 'assam',
  'goa', 'kashmir', 'ladakh', 'haryana', 'jharkhand',
];

const WORLD_CITIES = [
  'san francisco', 'new york', 'london', 'berlin', 'toronto', 'sydney',
  'singapore', 'dubai', 'tokyo', 'amsterdam', 'austin', 'boston', 'seattle',
];

const CUSTOMER_TYPE_SIGNALS: { type: CustomerType; keywords: string[] }[] = [
  { type: 'b2b', keywords: ['b2b', 'businesses', 'enterprise', 'companies', 'smb', 'startups', 'teams', 'offices', 'clients'] },
  { type: 'd2c', keywords: ['d2c', 'direct-to-consumer', 'own website', 'shopify', 'my brand'] },
  { type: 'b2b2c', keywords: ['b2b2c', 'through retailers', 'via distributors', 'channel partners', 'resellers', 'franchise'] },
  { type: 'b2c', keywords: ['b2c', 'consumers', 'individuals', 'shoppers', 'households', 'students', 'parents', 'tourists'] },
];

const DELIVERY_SIGNALS: { type: DeliveryModel; keywords: string[] }[] = [
  { type: 'online', keywords: ['online', 'website', 'app', 'digital', 'ecommerce', 'e-commerce', 'instagram', 'delivery app'] },
  { type: 'offline', keywords: ['offline', 'store', 'shop', 'retail outlet', 'physical store', 'kiosk', 'street', 'market stall'] },
  { type: 'hybrid', keywords: ['hybrid', 'omnichannel', 'both online and offline', 'online and offline', 'phygital'] },
];

const CUE_WORDS: Record<string, string[]> = {
  problem: ['problem', 'struggle', 'pain', 'difficult', 'hard to', 'expensive', 'lack', 'frustrat', 'inefficient', 'broken', 'annoying', 'waste'],
  differentiation: ['unique', 'different', 'unlike', 'moat', 'proprietary', 'handmade', 'craft', 'first', 'only ', 'no one else', 'secret'],
  constraints: ['budget', 'bootstrap', 'constraint', 'limited', 'lack of', 'no funding', 'small team', 'lackh', 'lakh', '₹', 'rs.'],
  goals: ['goal', 'target', 'want to reach', 'revenue', 'launch by', 'within ', 'months', 'year 1', 'first year', 'crore', 'million'],
  monetization: ['price', 'pricing', 'charge', 'subscription', 'freemium', 'revenue', 'margin', 'commission', 'fee'],
  distribution: ['sell', 'distribut', 'channel', 'retail', 'wholesale', 'export', 'shipping', 'delivery', 'acquire customers', 'marketing'],
  competition: ['competitor', 'competition', 'alternative', 'incumbent', 'crowded', 'saturated'],
  risk: ['risk', 'worried', 'scared', 'fear', 'fail', 'seasonal', 'seasonality', 'inventory'],
  acquisition: ['acquisition', 'acquire', 'cac', 'leads', 'funnel', 'onboard', 'sign up', 'traction', 'go-to-market', 'gtm'],
  retention: ['retention', 'retain', 'churn', 'repeat', 'loyalty', 'habit', 'engagement', 'lifetime value', 'ltv'],
  scalability: ['scalab', 'scale up', 'scale', 'growth', 'expand', 'operations at scale', 'unit economics'],
};

function includesAny(haystack: string, needles: string[]): string[] {
  return needles.filter((n) => haystack.includes(n));
}

function extractAudienceFragment(text: string): string | null {
  const patterns = [
    /(?:for|targeting|targeted at|aimed at|built for|designed for|serving|serves)\s+([^.,;!?]{4,90})/i,
    /((?:students|professionals|founders|parents|tourists|travelers|remote workers|homeowners|renters|patients|teachers|farmers|retailers|small businesses?|enterprises?|shoppers|consumers?|women|men|kids|youth|elderly)[^.,;!?]{0,60})/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m && m[1] && m[1].trim().length >= 4) return m[1].trim();
  }
  return null;
}

function titleCase(s: string): string {
  return s
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

// --- Casual intent detection ------------------------------------------------

type CasualKind = 'joke' | 'scary' | 'greeting' | 'thanks' | 'capabilities' | 'bye' | null;

function detectCasual(text: string): CasualKind {
  const t = text.toLowerCase().trim();
  if (/\bjoke\b|\bfunny\b|\bmake me laugh\b/.test(t)) return 'joke';
  if (/\bscary\b|\bscarier\b|\bspooky\b|\bhorror\b|\bfrighten/.test(t)) return 'scary';
  if (/^(hi|hey|hello|namaste|yo|sup)\b/.test(t) && t.length < 30) return 'greeting';
  if (/\bthank\b|\bthanks\b|\bshukriya\b/.test(t)) return 'thanks';
  if (/\bwhat can you do\b|\bhow do you work\b|\bhelp me\b|\bwho are you\b/.test(t)) return 'capabilities';
  if (/^(bye|goodbye|see you)\b/.test(t) && t.length < 30) return 'bye';
  return null;
}

const CASUAL_JOKES = [
  'Why did the startup founder bring a ladder to the pitch? Because the TAM was "too high".',
  'My co-founder wanted to disrupt the alarm-clock industry. We pivoted — turns out nobody hits snooze on revenue.',
  'A bootstrapped founder does not need a gym membership. Carrying inventory up three floors is the workout.',
];

const CASUAL_SCARY = [
  'The scariest thing in business is not a competitor — it is discovering after launch that nobody actually needed the product.',
  'Here is a real horror story: a full warehouse in March of a product that only sells in December. Seasonality does not negotiate.',
];

// Occasional dry observations — used sparingly, only when the profile just
// advanced, and rotated deterministically (never random, never praise-only).
const DRY_ASIDES = [
  'Interesting — this is starting to look more like a product + service model than a pure play.',
  'Business idea detected. The spreadsheet is emotionally preparing itself.',
  'Noted. Somewhere, a future unit-economics table just shifted uncomfortably.',
  'Fun one: vending machines are basically tiny automated retail businesses — distribution is the product.',
  'Interesting pattern: some businesses do not sell the product itself — they monetize access to the network around it.',
  "That's where the interesting part begins — the follow-up answers matter more than the opening idea.",
  'One assumption is doing a lot of work here. Let us pressure-test that next.',
  'That answer changes the downstream model. Filing it now.',
  'Interesting. That is a seasonal demand problem disguised as a clothing idea.',
  'That changes the economics considerably.',
  'Small warning: fashion businesses rarely die because nobody likes the product. They often die because inventory guesses were wrong.',
  'Interesting pattern: a product can have thousands of users and still have a broken business if retention and willingness-to-pay do not align.',
];

// --- Signal extraction -------------------------------------------------------

export function analyzeVentureMessage(
  currentText: string,
  historyUserTexts: string[],
): ExtractedSignals {
  const current = currentText.toLowerCase();
  const combined = [...historyUserTexts, currentText].join(' \n ').toLowerCase();
  const empty: ExtractedSignals = {
    productType: null,
    productTypeConfidence: null,
    productTypeEvidence: [],
    audience: null,
    problem: null,
    country: null,
    cityRegion: null,
    customerType: null,
    deliveryModel: null,
    differentiation: null,
    constraints: null,
    goals: null,
    archetypes: [],
    topics: [],
  };

  // Product type scoring across combined context (memory-aware).
  let best: { type: ProductType; label: string; score: number; hits: string[] } | null = null;
  for (const sig of PRODUCT_SIGNALS) {
    const hits = includesAny(combined, sig.keywords);
    // Weight hits in the current message higher than history-only hits.
    const currentHits = includesAny(current, sig.keywords);
    const score = currentHits.length * 2 + (hits.length - currentHits.length);
    if (score > 0 && (!best || score > best.score)) {
      best = { type: sig.type, label: sig.label, score, hits: [...new Set(hits)].slice(0, 4) };
    }
  }
  if (best) {
    empty.productType = best.type;
    empty.productTypeConfidence = best.score >= 3 ? 'high' : best.score === 2 ? 'medium' : 'low';
    empty.productTypeEvidence = best.hits;
  }

  const audience = extractAudienceFragment(currentText) ?? extractAudienceFragment(historyUserTexts.join('. '));
  if (audience) empty.audience = audience;

  if (includesAny(current, CUE_WORDS.problem).length > 0) {
    empty.problem = currentText.trim().length <= 280 ? currentText.trim() : null;
  }

  for (const c of KNOWN_COUNTRIES) {
    if (combined.includes(c)) {
      empty.country = titleCase(c.replace(/^u\.s\.$/i, 'United States').replace(/^usa$/i, 'United States').replace(/^uk$/i, 'United Kingdom'));
      break;
    }
  }
  for (const r of INDIA_REGIONS) {
    if (combined.includes(r)) {
      empty.cityRegion = titleCase(r);
      if (!empty.country) empty.country = 'India';
      break;
    }
  }
  if (!empty.cityRegion) {
    for (const c of WORLD_CITIES) {
      if (combined.includes(c)) {
        empty.cityRegion = titleCase(c);
        break;
      }
    }
  }

  for (const sig of CUSTOMER_TYPE_SIGNALS) {
    if (includesAny(combined, sig.keywords).length > 0) {
      empty.customerType = sig.type;
      break;
    }
  }
  // Hybrid check first (contains both online+offline cues is handled by keyword).
  for (const sig of DELIVERY_SIGNALS) {
    if (includesAny(combined, sig.keywords).length > 0) {
      empty.deliveryModel = sig.type;
      break;
    }
  }

  if (includesAny(current, CUE_WORDS.differentiation).length > 0) {
    empty.differentiation = currentText.trim().length <= 280 ? currentText.trim() : null;
  }
  if (includesAny(current, CUE_WORDS.constraints).length > 0) {
    empty.constraints = currentText.trim().length <= 280 ? currentText.trim() : null;
  }
  if (includesAny(current, CUE_WORDS.goals).length > 0) {
    empty.goals = currentText.trim().length <= 280 ? currentText.trim() : null;
  }

  // Archetype / topic tags for the reply (pattern labels, never facts).
  if (empty.productType) {
    const label = PRODUCT_SIGNALS.find((s) => s.type === empty.productType)?.label ?? empty.productType;
    empty.archetypes.push(label);
  }
  if (empty.customerType) empty.archetypes.push(empty.customerType.toUpperCase());
  if (empty.deliveryModel) empty.archetypes.push(`${empty.deliveryModel} presence`);
  for (const arch of BUSINESS_ARCHETYPES) {
    if (includesAny(combined, arch.keywords).length > 0) {
      empty.archetypes.push(arch.label);
    }
  }
  for (const [topic, words] of Object.entries(CUE_WORDS)) {
    if (['problem', 'differentiation', 'constraints', 'goals'].includes(topic)) continue;
    if (includesAny(current, words).length > 0) empty.topics.push(topic);
  }

  return empty;
}

// Business-model pattern bank: recognizable archetypes matched by keyword.
// Labels only — surfaced as MODEL INFERENCE, never as verified facts.
const BUSINESS_ARCHETYPES: { label: string; keywords: string[] }[] = [
  { label: 'Subscription', keywords: ['subscription', 'membership', 'recurring', 'monthly plan', 'retainer', 'subscribe'] },
  { label: 'Marketplace / Platform', keywords: ['marketplace', 'platform', 'two-sided', 'network effects', 'peer-to-peer', 'p2p'] },
  { label: 'D2C / E-commerce', keywords: ['d2c', 'direct-to-consumer', 'shopify', 'ecommerce', 'e-commerce', 'online store'] },
  { label: 'D2B / B2B2C', keywords: ['d2b', 'b2b2c', 'distributors', 'resellers', 'channel partners', 'franchise', 'licensing'] },
  { label: 'Fashion & Apparel', keywords: ['fashion', 'apparel', 'clothing', 'garment', 'winterwear', 'streetwear', 'boutique'] },
  { label: 'Food & Beverage', keywords: ['food', 'restaurant', 'cafe', 'catering', 'snack', 'beverage', 'cloud kitchen'] },
  { label: 'EdTech / Education', keywords: ['education', 'course', 'coaching', 'tutoring', 'training', 'edtech', 'school'] },
  { label: 'Fintech / Financial Services', keywords: ['fintech', 'finance', 'payments', 'lending', 'accounting', 'insurance'] },
  { label: 'Health & Wellness', keywords: ['health', 'clinic', 'fitness', 'wellness', 'patients', 'healthtech'] },
  { label: 'Hospitality & Travel', keywords: ['hotel', 'hospitality', 'travel', 'tourism', 'homestay', 'tourists'] },
  { label: 'Logistics & Fulfilment', keywords: ['logistics', 'delivery', 'shipping', 'fulfilment', 'fulfillment', 'warehouse', 'supply chain'] },
  { label: 'Media & Entertainment', keywords: ['media', 'entertainment', 'events', 'podcast', 'youtube', 'newsletter', 'content'] },
  { label: 'Hardware / Consumer Devices', keywords: ['hardware', 'device', 'gadget', 'wearable', 'iot', 'electronics'] },
  { label: 'Wholesale / Distribution', keywords: ['wholesale', 'distributors', 'bulk', 'b2b sales', 'trade'] },
  { label: 'CPG / Packaged Goods', keywords: ['cpg', 'packaged goods', 'fmcg', 'skincare', 'cosmetic', 'soap', 'candle'] },
  { label: 'Manufacturing', keywords: ['manufacturing', 'factory', 'production', 'oem', 'white label'] },
  { label: 'Enterprise', keywords: ['enterprise', 'b2b', 'corporate', 'teams', 'sso', 'compliance', 'procurement'] },
  { label: 'Local Services', keywords: ['local', 'salon', 'repair', 'cleaning', 'neighborhood', 'hyperlocal'] },
  { label: 'Usage-based / Transactional', keywords: ['usage-based', 'pay-per-use', 'transaction fee', 'commission', 'take rate', 'per seat'] },
];

// Comparable-pattern notes: why a matched archetype matters + how to test it.
// Generic business knowledge, never market data — always MODEL INFERENCE.
const PATTERN_INFO: { match: string[]; why: string; validate: string }[] = [
  {
    match: ['Subscription'],
    why: 'Recurring revenue smooths seasonality, but churn compounds silently — retention decides the business, not signups.',
    validate: 'Test willingness to pre-pay for 3 months before building billing or inventory.',
  },
  {
    match: ['Marketplace / Platform'],
    why: 'Liquidity on both sides decides everything; most marketplaces die on the cold start, not on product quality.',
    validate: 'Manually match 10 transactions before writing any platform code.',
  },
  {
    match: ['Fashion & Apparel'],
    why: 'Seasonal demand concentrates working-capital and markdown risk into a few short windows.',
    validate: 'Test demand with pre-orders before committing to bulk inventory.',
  },
  {
    match: ['Food & Beverage'],
    why: 'Channel economics and freshness windows dominate margins more than recipe quality.',
    validate: 'Pilot one channel with honest per-unit cost accounting.',
  },
  {
    match: ['D2C / E-commerce'],
    why: 'CAC and returns decide viability more than product love; paid acquisition rarely forgives weak margins.',
    validate: 'Run a small paid-traffic landing test at real prices.',
  },
  {
    match: ['Software / SaaS'],
    why: 'Users are not revenue — retention and willingness-to-pay must align or the business breaks quietly.',
    validate: 'Secure design-partner commitments before building beyond a prototype.',
  },
];

function findPatternInfo(archetypes: string[]): { label: string; why: string; validate: string } | null {
  for (const arch of archetypes) {
    const hit = PATTERN_INFO.find((p) => p.match.some((m) => arch.toLowerCase().includes(m.toLowerCase())));
    if (hit) return { label: arch, why: hit.why, validate: hit.validate };
  }
  return null;
}

// --- Next-question planner ---------------------------------------------------

interface PlannedQuestion {
  question: string;
  whyItMatters: string;
  vectorLabel: string;
}

function planNextQuestion(snapshot: VentureSnapshot, signals: ExtractedSignals): PlannedQuestion {
  if (!snapshot.productType && !signals.productType) {
    return {
      vectorLabel: 'Product Type',
      question: 'What exactly will a customer receive — a physical product, software, a marketplace transaction, a service, a community, or content?',
      whyItMatters: 'The vehicle decides everything downstream: cost structure, supply chain or codebase, and how Stage 02 scores feasibility.',
    };
  }
  if (!snapshot.targetAudience && !signals.audience) {
    return {
      vectorLabel: 'Target Audience',
      question: 'Who feels this problem most sharply — describe one specific persona (age, work, city, habits) rather than "everyone".',
      whyItMatters: 'Ventures die serving everyone. A sharp persona lets Stage 03 size a beachhead you can actually reach.',
    };
  }
  if (!snapshot.problem && !signals.problem) {
    return {
      vectorLabel: 'Core Problem',
      question: 'What is broken, overpriced, or missing in the alternatives people use today — and what does that cost them?',
      whyItMatters: 'Without a priced pain there is no willingness to pay. This is the falsifiable claim Stage 02 will stress-test.',
    };
  }
  if ((!snapshot.country && !signals.country) || (!snapshot.cityRegion && !signals.cityRegion)) {
    return {
      vectorLabel: 'Geography',
      question: 'Where will you launch first — which city/region — and will you sell online, offline, or both?',
      whyItMatters: 'Geography sets regulation, logistics, seasonality, and channel economics. It also scopes every later assumption.',
    };
  }
  if (!snapshot.differentiation && !signals.differentiation) {
    return {
      vectorLabel: 'Differentiation',
      question: 'What makes this distinctly better or different — craft, price, speed, distribution, or cultural angle — in one sentence?',
      whyItMatters: 'Differentiation is the seed of positioning. Stage 04 will build the entire brand on this sentence.',
    };
  }
  if ((!snapshot.constraints && !signals.constraints) || (!snapshot.goals && !signals.goals)) {
    return {
      vectorLabel: 'Constraints & Goals',
      question: 'What are your hard bounds — budget, team, time — and what does success look like in 12 months, in numbers?',
      whyItMatters: 'Bounds turn a dream into a plan. Numbers give Stage 02 something concrete to validate instead of vibes.',
    };
  }
  if (snapshot.openQuestions.length === 0) {
    return {
      vectorLabel: 'Open Questions',
      question: 'What is the one thing you are most unsure about — the belief that, if wrong, kills this venture?',
      whyItMatters: 'That belief becomes the first falsification test in Stage 02. Great founders attack their riskiest assumption first.',
    };
  }
  return {
    vectorLabel: 'Synthesis',
      question: 'Your venture profile is filling in nicely. Review the snapshot below — which entry feels weakest? Refine it here, or continue to Feasibility when ready.',
    whyItMatters: 'A tight Stage 01 profile compounds: every downstream engine reasons from these exact fields.',
  };
}

// --- Venture completeness model ------------------------------------------------
// Lightweight internal readout of which discovery vectors are filled. Drives
// question priority (never re-ask what is known) and is surfaced compactly
// so the founder sees what is VERIFIED vs still ASSUMPTION / NEEDS VALIDATION.

export interface CompletenessItem {
  key: string;
  label: string;
  done: boolean;
}

export function getProfileCompleteness(s: VentureSnapshot): {
  items: CompletenessItem[];
  done: number;
  total: number;
  missing: string[];
} {
  const items: CompletenessItem[] = [
    { key: 'idea', label: 'Idea clarity', done: s.rawInput.trim().length > 3 },
    { key: 'productType', label: 'Product type', done: s.productType !== null },
    { key: 'audience', label: 'Audience', done: s.targetAudience.trim().length > 0 },
    { key: 'problem', label: 'Problem', done: s.problem.trim().length > 0 },
    { key: 'location', label: 'Location', done: s.country.trim().length > 0 || s.cityRegion.trim().length > 0 },
    { key: 'delivery', label: 'Delivery model', done: s.deliveryModel !== null },
    { key: 'customer', label: 'Customer type', done: s.customerType !== null },
    { key: 'differentiation', label: 'Differentiator', done: s.differentiation.trim().length > 0 },
    { key: 'bounds', label: 'Bounds & goals', done: s.constraints.trim().length > 0 || s.goals.trim().length > 0 },
    { key: 'monetization', label: 'Monetization context', done: s.context.trim().length > 0 },
    { key: 'questions', label: 'Open questions', done: s.openQuestions.length > 0 },
  ];
  const done = items.filter((i) => i.done).length;
  return { items, done, total: items.length, missing: items.filter((i) => !i.done).map((i) => i.label) };
}

// --- Adaptive category probes --------------------------------------------------
// One-shot multiple-choice follow-ups for recognizable venture shapes. Each
// probe maps the picked option into the correct project-state field. Probes
// never overwrite filled fields and never invent data.

export interface CategoryProbe {
  id: string;
  vectorLabel: string;
  question: string;
  whyItMatters: string;
  options: string[];
}

const CATEGORY_PROBES: Record<string, CategoryProbe & { trigger: (combined: string, s: VentureSnapshot) => boolean }> = {
  'apparel-positioning': {
    id: 'apparel-positioning',
    vectorLabel: 'Positioning',
    question:
      'Rajasthan creates an unusual winterwear context — demand may be seasonal and geographically uneven. Before we classify the opportunity, which lane are you thinking?',
    whyItMatters:
      'Price lane decides manufacturing cost, channel, and margin in one stroke. A mass-market and a craft-premium winterwear venture share almost nothing downstream.',
    options: ['Mass-market essentials', 'Premium apparel', 'Ethnic winterwear', 'Technical outdoor clothing'],
    trigger: (combined, s) =>
      !s.differentiation &&
      /(apparel|fashion|clothing|garment|winterwear|winter wear|boutique)/.test(combined),
  },
  'saas-buyer': {
    id: 'saas-buyer',
    vectorLabel: 'Buyer',
    question:
      'Got it — a software wedge. Who feels the pain acutely enough to pay in week one: teams at work, solo operators, or end consumers?',
    whyItMatters:
      'Buyer identity sets pricing power, sales motion, and churn math. B2B teams and consumers are almost different businesses wearing the same product.',
    options: ['B2B teams', 'Solo founders & SMBs', 'Enterprise', 'Consumers'],
    trigger: (combined, s) =>
      !s.targetAudience &&
      !s.customerType &&
      /(saas|software|platform|dashboard|analytics|app\b)/.test(combined),
  },
  'apparel-audience': {
    id: 'apparel-audience',
    vectorLabel: 'Target Customer',
    question:
      'The highest-value unknown is customer demand. Which customer are you primarily targeting?',
    whyItMatters:
      'Students, families, tourists, and premium buyers want different products at different prices through different channels. Picking the beachhead focuses pricing, sourcing, and distribution at once.',
    options: ['Students / young adults', 'Families', 'Tourists', 'Outdoor / travel users', 'Premium fashion buyers', 'Other (type your own)'],
    trigger: (combined, s) =>
      !s.targetAudience &&
      !s.customerType &&
      /(apparel|fashion|clothing|garment|winterwear|winter wear|footwear|boutique)/.test(combined),
  },
  'apparel-model': {    id: 'apparel-model',
    vectorLabel: 'Operating Model',
    question:
      'Positioning locked. Now the engine room: are you imagining your own clothing brand, reselling existing winterwear, manufacturing for others, or a hybrid?',
    whyItMatters:
      'Own-brand, resale, and manufacturing are different capital, margin, and skill businesses. Naming the model focuses every feasibility test that follows.',
    options: ['Own brand', 'Resell existing labels', 'Manufacture for others', 'Hybrid model'],
    trigger: (combined, s) =>
      s.productType === 'physical' &&
      s.differentiation.trim().length > 0 &&
      !s.goals &&
      !s.constraints &&
      /(apparel|fashion|clothing|garment|winterwear|winter wear|footwear)/.test(combined),
  },
  'marketplace-seed': {
    id: 'marketplace-seed',
    vectorLabel: 'Liquidity',    question:
      'Marketplaces die on the cold-start problem. Which side would you seed first to get the flywheel moving?',
    whyItMatters:
      'Supply-first and demand-first marketplaces need opposite launch budgets and opposite first hires. Picking a side focuses Stage 02 validation.',
    options: ['Seed supply first', 'Seed demand first', 'Both in one geography'],
    trigger: (combined, s) =>
      !s.goals &&
      !s.constraints &&
      /(marketplace|two-sided|peer-to-peer|p2p|renting|rental|listing)/.test(combined),
  },
  'food-channel': {
    id: 'food-channel',
    vectorLabel: 'Channel',
    question:
      'Food ventures live or die by channel economics. Where should the first rupee of revenue come from?',
    whyItMatters:
      'D2C online, retail shelves, and wholesale have wildly different margins, working capital needs, and failure modes.',
    options: ['D2C online', 'Retail shelves', 'Cafés & restaurants', 'Wholesale'],
    trigger: (combined, s) =>
      !s.deliveryModel &&
      /(food|snack|beverage|restaurant|cafe|cloud kitchen|packaged)/.test(combined),
  },
};

const PROBE_STOPWORDS = new Set(['with', 'and', 'the', 'for', 'from', 'your', 'our', 'own', 'type']);

function matchProbeOption(text: string, options: string[]): string | null {
  const t = text.toLowerCase();
  for (const opt of options) {
    const words = opt.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !PROBE_STOPWORDS.has(w));
    if (words.some((w) => t.includes(w))) return opt;
    // Also match if the user typed a distinctive short token from the option.
    const short = opt.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 2);
    if (short.some((w) => new RegExp(`\\b${w}\\b`).test(t))) return opt;
  }
  return null;
}

function applyProbeAnswer(
  probeId: string,
  matched: string,
  snapshot: VentureSnapshot,
  updates: ProposedUpdates,
  savedSummary: string[],
): void {
  const m = matched.toLowerCase();
  switch (probeId) {
    case 'apparel-positioning':
      if (!snapshot.differentiation) {
        updates.differentiation = `${matched} positioning`;
        savedSummary.push(`Positioning angle → "${matched}" (your pick)`);
      }
      break;
    case 'saas-buyer':
      if (!snapshot.targetAudience) {
        updates.targetAudience = matched;
        savedSummary.push(`Target Audience → "${matched}" (your pick)`);
      }
      if (!snapshot.customerType) {
        updates.customerType = m.includes('consumer') ? 'b2c' : 'b2b';
        savedSummary.push(`Customer Archetype → ${updates.customerType.toUpperCase()} (your pick)`);
      }
      break;
    case 'apparel-audience': {
      if (!snapshot.targetAudience) {
        const cleaned = matched.replace(/^other\s*\(.*?\)\s*/i, '').trim() || matched;
        updates.targetAudience = cleaned;
        savedSummary.push(`Target Audience → "${cleaned}" (your pick)`);
      }
      break;
    }
    case 'apparel-model': {
      if (!snapshot.context) {
        updates.context = `Operating model: ${matched.toLowerCase()}`;
        savedSummary.push('Operating Context → captured from your message');
      }
      break;
    }
    case 'marketplace-seed':
      if (!snapshot.goals) {
        updates.goals = `Marketplace sequence: ${matched.toLowerCase()}`;
        savedSummary.push(`Launch sequence → "${matched}" (your pick)`);
      }
      break;
    case 'food-channel':
      if (m.includes('d2c') || m.includes('online')) {
        if (!snapshot.deliveryModel) {
          updates.deliveryModel = 'online';
          savedSummary.push('Delivery Model → online (your pick)');
        }
        if (!snapshot.customerType) {
          updates.customerType = 'd2c';
          savedSummary.push('Customer Archetype → D2C (your pick)');
        }
      } else if (m.includes('wholesale')) {
        if (!snapshot.customerType) {
          updates.customerType = 'b2b';
          savedSummary.push('Customer Archetype → B2B (your pick)');
        }
      } else if (!snapshot.deliveryModel) {
        updates.deliveryModel = 'offline';
        savedSummary.push('Delivery Model → offline (your pick)');
      }
      break;
    default:
      break;
  }
}

function selectProbe(
  combined: string,
  snapshot: VentureSnapshot,
): (CategoryProbe & { trigger: (combined: string, s: VentureSnapshot) => boolean }) | null {
  for (const probe of Object.values(CATEGORY_PROBES)) {
    try {
      if (probe.trigger(combined, snapshot)) return probe;
    } catch {
      continue;
    }
  }
  return null;
}

function wantsMarketData(text: string): boolean {
  const t = text.toLowerCase();
  return /competitor|market size|tam|sam|som|statistics|stats|data|research|report|how big|growth rate|cagr/.test(t);
}

export function buildInterviewReply(
  currentText: string,
  history: HistoryMessage[],
  snapshot: VentureSnapshot,
  probeContext?: { id: string } | null,
): InterviewResult {
  const historyUserTexts = history.filter((m) => m.sender === 'user').map((m) => m.text);
  const casual = detectCasual(currentText);
  const firstIdea = historyUserTexts[0] ?? currentText;
  const isFollowUp = historyUserTexts.length >= 1 && currentText.trim().split(/\s+/).length <= 14;
  const signals = analyzeVentureMessage(currentText, historyUserTexts);

  const updates: ProposedUpdates = {
    productType: null,
    targetAudience: null,
    problem: null,
    differentiation: null,
    constraints: null,
    goals: null,
    context: null,
    country: null,
    cityRegion: null,
    customerType: null,
    deliveryModel: null,
    openQuestions: [],
  };
  const savedSummary: string[] = [];

  // --- Casual branch: stay in character, then bridge back to business --------
  if (casual === 'joke') {
    const joke = CASUAL_JOKES[currentText.length % CASUAL_JOKES.length];
    return {
      replyText:
        `${joke}\n\nI do take requests — but my day job is venture discovery. ` +
        `Tell me about the idea in your head, or pick one of the founder dilemmas above, and I will break it into a structured profile.`,
      updates,
      savedSummary,
      chips: [],
      probeId: null,
    };
  }
  if (casual === 'scary') {
    const line = CASUAL_SCARY[currentText.length % CASUAL_SCARY.length];
    return {
      replyText:
        `${line}\n\nThat is exactly why we do discovery before building. ` +
        `Give me your raw idea and I will help you find the scary assumption early — while it is still cheap to fix.`,
      updates,
      savedSummary,
      chips: [],
      probeId: null,
    };
  }
  if (casual === 'greeting' || casual === 'thanks' || casual === 'bye') {
    const open =
      casual === 'thanks'
        ? 'Anytime. '
        : casual === 'bye'
          ? 'Good luck out there. '
          : '';
    return {
      replyText:
        `${open}I am your Business Intelligence Interviewer — I turn rough ideas into structured venture profiles.\n\n` +
        `Describe your idea in one or two sentences (what + for whom + where), and we will build from there.`,
      updates,
      savedSummary,
      chips: [],
      probeId: null,
    };
  }
  if (casual === 'capabilities') {
    return {
      replyText:
        `Here is what I do in this session:\n` +
        `• Listen to your raw idea and extract business signals (model, audience, problem, geography)\n` +
        `• Save what you tell me into your venture profile on the right — nothing leaves this workspace\n` +
        `• Ask the next sharpest question, and explain why it matters\n` +
        `• Label everything honestly: VERIFIED (your words), MODEL INFERENCE, ASSUMPTION, or NEEDS VALIDATION\n\n` +
        `What I never do: invent market statistics, competitors, or "verified" research. Zero fabricated data.\n\n` +
        `So — what is the idea?`,
      updates,
      savedSummary,
      chips: [],
      probeId: null,
    };
  }

  // --- Honest boundary: no live market data ----------------------------------
  const dataBoundary = wantsMarketData(currentText)
    ? `HONEST BOUNDARY: I do not have live market data, and I will not invent competitors or statistics. What I can do is frame the exact validation test — that becomes an open question for Stage 02.\n\n`
    : '';

  // --- One-shot probe answer: map the picked option into project state -----
  // Probe answers are VERIFIED (the founder's own pick). The probe clears
  // after a single answer so the interview always moves forward.
  let answeredProbe: (CategoryProbe & { trigger: (combined: string, s: VentureSnapshot) => boolean }) | null = null;
  if (probeContext) {
    const probe = CATEGORY_PROBES[probeContext.id];
    if (probe) {
      const matched = matchProbeOption(currentText, probe.options);
      if (matched) {
        answeredProbe = probe;
        applyProbeAnswer(probe.id, matched, snapshot, updates, savedSummary);
      }
    }
  }

  // --- Propose structured updates (fill empties only — never overwrite) ------
  if (signals.productType && (signals.productTypeConfidence === 'high' || signals.productTypeConfidence === 'medium') && !snapshot.productType) {
    updates.productType = signals.productType;
    savedSummary.push(
      `Product Type → ${PRODUCT_SIGNALS.find((s) => s.type === signals.productType)?.label} (from: "${signals.productTypeEvidence.join(', ')}")`,
    );
  }
  if (signals.audience && !snapshot.targetAudience) {
    updates.targetAudience = signals.audience;
    savedSummary.push(`Target Audience → "${signals.audience}"`);
  }
  if (signals.problem && !snapshot.problem) {
    updates.problem = signals.problem;
    savedSummary.push('Core Problem → captured from your message');
  }
  if (signals.country && !snapshot.country) {
    updates.country = signals.country;
    savedSummary.push(`Country → ${signals.country}`);
  }
  if (signals.cityRegion && !snapshot.cityRegion) {
    updates.cityRegion = signals.cityRegion;
    savedSummary.push(`City / Region → ${signals.cityRegion}`);
  }
  if (signals.customerType && !snapshot.customerType) {
    updates.customerType = signals.customerType;
    savedSummary.push(`Customer Archetype → ${signals.customerType.toUpperCase()}`);
  }
  if (signals.deliveryModel && !snapshot.deliveryModel) {
    updates.deliveryModel = signals.deliveryModel;
    savedSummary.push(`Delivery Model → ${signals.deliveryModel}`);
  }
  if (signals.differentiation && !snapshot.differentiation) {
    updates.differentiation = signals.differentiation;
    savedSummary.push('Differentiation → captured from your message');
  }
  if (signals.constraints && !snapshot.constraints) {
    updates.constraints = signals.constraints;
    savedSummary.push('Constraints → captured from your message');
  }
  if (signals.goals && !snapshot.goals) {
    updates.goals = signals.goals;
    savedSummary.push('Goals → captured from your message');
  }

  // Capture pricing / revenue / distribution / competitive substance that has
  // no dedicated field into the existing `context` field (fill-empty only).
  // This keeps monetization thinking inside project state without inventing
  // new data structures.
  if (!snapshot.context) {
    const contextBits: string[] = [];
    const lower = currentText.toLowerCase();
    if (/(price|pricing|charge|subscription|freemium|revenue|margin|commission|fee|rs\.? |₹|lakh|crore)/.test(lower)) {
      contextBits.push(`Pricing/revenue note: ${truncate(currentText, 160)}`);
    } else if (/(distribut|channel|retail|wholesale|export|shipping|competitor|alternative)/.test(lower)) {
      contextBits.push(`Go-to-market note: ${truncate(currentText, 160)}`);
    }
    if (contextBits.length > 0 && currentText.trim().length > 20) {
      updates.context = contextBits.join(' ');
      savedSummary.push('Operating Context → captured from your message');
    }
  }

  // Deduce at most one validation question from the message's risk/topic cues.
  const deduced = deduceValidationQuestion(currentText, signals, snapshot);
  if (deduced) {
    updates.openQuestions.push(deduced);
    savedSummary.push(`Open Question (NEEDS VALIDATION) → "${deduced}"`);
  }

  const planned = planNextQuestion(
    {
      ...snapshot,
      productType: snapshot.productType ?? updates.productType,
      targetAudience: snapshot.targetAudience || updates.targetAudience || '',
      problem: snapshot.problem || updates.problem || '',
      country: snapshot.country || updates.country || '',
      cityRegion: snapshot.cityRegion || updates.cityRegion || '',
      differentiation: snapshot.differentiation || updates.differentiation || '',
      constraints: snapshot.constraints || updates.constraints || '',
      goals: snapshot.goals || updates.goals || '',
      openQuestions: [...snapshot.openQuestions, ...updates.openQuestions],
    },
    signals,
  );

  // --- Adaptive probe: a targeted multiple-choice follow-up beats a generic
  // question when the venture shape is recognizable and its field is empty.
  const mergedForProbe: VentureSnapshot = {
    ...snapshot,
    productType: snapshot.productType ?? updates.productType,
    targetAudience: snapshot.targetAudience || updates.targetAudience || '',
    problem: snapshot.problem || updates.problem || '',
    differentiation: snapshot.differentiation || updates.differentiation || '',
    constraints: snapshot.constraints || updates.constraints || '',
    goals: snapshot.goals || updates.goals || '',
    context: snapshot.context || updates.context || '',
    country: snapshot.country || updates.country || '',
    cityRegion: snapshot.cityRegion || updates.cityRegion || '',
    deliveryModel: snapshot.deliveryModel ?? updates.deliveryModel,
    customerType: snapshot.customerType ?? updates.customerType,
    openQuestions: [...snapshot.openQuestions, ...updates.openQuestions],
  };
  const combinedLower = [...historyUserTexts, currentText].join(' \n ').toLowerCase();
  const activeProbe = selectProbe(combinedLower, mergedForProbe);

  const completeness = getProfileCompleteness(mergedForProbe);

  // --- Compose the reply ------------------------------------------------------
  const lines: string[] = [];

  if (answeredProbe) {
    lines.push(`Locked in — "${truncate(currentText, 80)}". Filed as VERIFIED (your pick).`);
    lines.push('');
  } else if (isFollowUp && firstIdea !== currentText) {
    lines.push(
      `Noted — combining this with your earlier context ("${truncate(firstIdea, 90)}").`,
    );
    lines.push('');
  }

  const picked: string[] = [];
  if (signals.productType) {
    const label = PRODUCT_SIGNALS.find((s) => s.type === signals.productType)?.label;
    picked.push(
      `• Venture vehicle looks like ${label} (${signals.productTypeConfidence} confidence, cues: ${signals.productTypeEvidence.join(', ') || 'context'}) — MODEL INFERENCE`,
    );
  }
  if (signals.archetypes.length > 1) {
    picked.push(`• Operating pattern: ${signals.archetypes.slice(1).join(' + ')} — MODEL INFERENCE`);
  }
  if (signals.cityRegion || signals.country) {
    picked.push(
      `• Geography signal: ${[signals.cityRegion, signals.country].filter(Boolean).join(', ')} — VERIFIED (your words); implications are ASSUMPTION until validated`,
    );
  }
  if (signals.topics.length > 0) {
    picked.push(`• Also hearing: ${signals.topics.join(', ')} — I will thread these into later questions`);
  }
  if (picked.length > 0) {
    lines.push('WHAT I PICKED UP — MODEL INFERENCE (patterns, not verified research):');
    lines.push(...picked);
    lines.push('');
  }

  const patternInfo = findPatternInfo(signals.archetypes);
  if (patternInfo) {
    lines.push('PATTERN MATCH');
    lines.push(`"${patternInfo.label}"`);
    lines.push('WHY IT MATTERS');
    lines.push(patternInfo.why);
    lines.push('VALIDATE');
    lines.push(patternInfo.validate);
    lines.push('');
  }

  if (savedSummary.length > 0) {
    lines.push('SAVED TO YOUR VENTURE PROFILE (VERIFIED — your words, editable anytime):');
    for (const s of savedSummary) lines.push(`• ${s}`);
    lines.push('Review or edit any of these in the structured fields on the right — your edits always win.');
    // Occasional dry observation: at most every third user message that advanced the profile.
    if (historyUserTexts.length % 3 === 2) {
      lines.push('');
      lines.push(`_${DRY_ASIDES[historyUserTexts.length % DRY_ASIDES.length]}_`);
    }
    lines.push('');
  } else if (snapshot.rawInput) {
    lines.push('Nothing new to file this time — your profile already holds this. Pushing deeper instead.');
    lines.push('');
  }

  lines.push(
    `PROFILE: ${completeness.done}/${completeness.total} vectors complete` +
      (completeness.missing.length > 0 ? ` — still open: ${completeness.missing.slice(0, 3).join(', ').toLowerCase()}` : ' — fully grounded'),
  );
  lines.push('');

  let chips: string[] = [];
  let probeId: string | null = null;
  if (activeProbe && !answeredProbe) {
    lines.push(`NEXT QUESTION [${activeProbe.vectorLabel}] — pick one or type your own:`);
    lines.push(activeProbe.question);
    lines.push('');
    activeProbe.options.forEach((opt, i) => lines.push(`${String.fromCharCode(65 + i)}) ${opt}`));
    lines.push('');
    lines.push(`WHY THIS MATTERS: ${activeProbe.whyItMatters}`);
    chips = activeProbe.options;
    probeId = activeProbe.id;
  } else {
    lines.push(`NEXT QUESTION [${planned.vectorLabel}]:`);
    lines.push(planned.question);
    lines.push('');
    lines.push(`WHY THIS MATTERS: ${planned.whyItMatters}`);
  }
  lines.push('');
  lines.push(dataBoundary + 'STATUS: inferences above are MODEL INFERENCE / ASSUMPTION — NEEDS VALIDATION before you spend. Stage 02 exists for exactly that.');

  return { replyText: lines.join('\n'), updates, savedSummary, chips, probeId };
}

function deduceValidationQuestion(
  currentText: string,
  signals: ExtractedSignals,
  snapshot: VentureSnapshot,
): string | null {
  const existing = new Set(snapshot.openQuestions.map((q) => q.toLowerCase().slice(0, 40)));
  const candidates: string[] = [];
  const t = currentText.toLowerCase();

  if (/winter|seasonal|season/.test(t)) {
    candidates.push('How do we sustain revenue and inventory outside the peak winter season?');
  }
  if (signals.cityRegion || signals.country) {
    const place = signals.cityRegion ?? signals.country ?? 'the launch region';
    candidates.push(`Will customers in ${place} pay for this over existing alternatives?`);
  }
  if (signals.productType === 'marketplace') {
    candidates.push('How do we seed initial supply and demand to reach liquidity on both sides?');
  }
  if (signals.productType === 'saas') {
    candidates.push('What is the smallest workflow a user would pay for in week one?');
  }
  if (signals.productType === 'physical') {
    candidates.push('What is the landed unit cost at small-batch quantities, and what margin survives?');
  }
  if (/competitor|competition|crowded/.test(t)) {
    candidates.push('Which specific alternative do target customers use today, and where does it disappoint?');
  }

  for (const c of candidates) {
    if (!existing.has(c.toLowerCase().slice(0, 40))) return c;
  }
  return null;
}

function truncate(s: string, n: number): string {
  const clean = s.replace(/\s+/g, ' ').trim();
  return clean.length > n ? `${clean.slice(0, n)}…` : clean;
}

// --- Attachment honesty notice (no backend analysis exists yet) ---------------
export function attachmentNotice(fileNames: string[]): string {
  if (fileNames.length === 0) return '';
  const listed = fileNames.map((n) => `"${n}"`).join(', ');
  return (
    `ATTACHMENTS RECEIVED (stored in this session only): ${listed}.\n` +
    `Honest status: I can see file names, but I cannot yet read inside documents or images — no analysis backend is connected, and I will not pretend otherwise.\n` +
    `To use this material now, paste the key points as text and I will extract signals from your words (VERIFIED DATA).`
  );
}

// --- Venture intelligence object model (derived, never stored) -----------------
// Shapes the current session into graph-ready nodes so future stages can do
// relationship / pattern / trend analysis without rewriting architecture.
// Every node carries provenance: VERIFIED (founder's words), MODEL INFERENCE,
// ASSUMPTION, or NEEDS VALIDATION. Nothing here is verified market research.

export type IntelligenceNodeStatus = 'VERIFIED' | 'MODEL INFERENCE' | 'ASSUMPTION' | 'NEEDS VALIDATION';

export interface IntelligenceNode {
  id: string;
  type: 'entity' | 'signal' | 'assumption' | 'question' | 'relationship';
  label: string;
  value: string;
  confidence: 'high' | 'medium' | 'low' | 'unknown';
  evidence: string;
  source: 'founder-input' | 'session-inference' | 'downstream';
  status: IntelligenceNodeStatus;
  relationships: string[];
  timestamp: string;
}

export function getVentureIntelligenceModel(snapshot: VentureSnapshot): IntelligenceNode[] {
  const now = new Date().toISOString();
  const node = (
    id: IntelligenceNode['id'],
    type: IntelligenceNode['type'],
    label: string,
    value: string,
    confidence: IntelligenceNode['confidence'],
    evidence: string,
    source: IntelligenceNode['source'],
    status: IntelligenceNodeStatus,
    relationships: string[] = [],
  ): IntelligenceNode => ({ id, type, label, value, confidence, evidence, source, status, relationships, timestamp: now });

  const nodes: IntelligenceNode[] = [];
  nodes.push(node(
    'idea.raw', 'entity', 'Raw idea',
    snapshot.rawInput.trim() || 'Not provided',
    snapshot.rawInput.trim() ? 'high' : 'unknown',
    snapshot.rawInput.trim() ? 'Founder-provided session input' : 'No input yet',
    'founder-input', snapshot.rawInput.trim() ? 'VERIFIED' : 'NEEDS VALIDATION',
    ['venture.product-type', 'venture.audience', 'venture.problem'],
  ));
  nodes.push(node(
    'venture.product-type', 'signal', 'Product type',
    snapshot.productType ?? 'Unknown',
    snapshot.productType ? 'medium' : 'unknown',
    snapshot.productType ? 'Classified from founder wording + selection' : 'Not yet captured',
    snapshot.productType ? 'session-inference' : 'downstream',
    snapshot.productType ? 'MODEL INFERENCE' : 'NEEDS VALIDATION',
    ['idea.raw', 'venture.audience'],
  ));
  nodes.push(node(
    'venture.audience', 'signal', 'Target audience',
    snapshot.targetAudience || 'Unknown',
    snapshot.targetAudience ? 'medium' : 'unknown',
    snapshot.targetAudience ? 'Founder-provided session input' : 'Not yet captured',
    snapshot.targetAudience ? 'founder-input' : 'downstream',
    snapshot.targetAudience ? 'VERIFIED' : 'NEEDS VALIDATION',
    ['idea.raw', 'venture.problem'],
  ));
  nodes.push(node(
    'venture.problem', 'signal', 'Core problem',
    snapshot.problem || 'Unknown',
    snapshot.problem ? 'medium' : 'unknown',
    snapshot.problem ? 'Founder-provided session input' : 'Not yet captured',
    snapshot.problem ? 'founder-input' : 'downstream',
    snapshot.problem ? 'VERIFIED' : 'NEEDS VALIDATION',
    ['venture.audience', 'venture.differentiator'],
  ));
  nodes.push(node(
    'venture.geography', 'signal', 'Geography',
    [snapshot.cityRegion, snapshot.country].filter(Boolean).join(', ') || 'Unknown',
    snapshot.cityRegion || snapshot.country ? 'medium' : 'unknown',
    snapshot.cityRegion || snapshot.country ? 'Founder-provided session input' : 'Not yet captured',
    snapshot.cityRegion || snapshot.country ? 'founder-input' : 'downstream',
    snapshot.cityRegion || snapshot.country ? 'VERIFIED' : 'NEEDS VALIDATION',
    ['idea.raw', 'venture.delivery'],
  ));
  nodes.push(node(
    'venture.delivery', 'signal', 'Delivery model',
    snapshot.deliveryModel ?? 'Unknown',
    snapshot.deliveryModel ? 'medium' : 'unknown',
    snapshot.deliveryModel ? 'Founder selection' : 'Not yet captured',
    snapshot.deliveryModel ? 'founder-input' : 'downstream',
    snapshot.deliveryModel ? 'VERIFIED' : 'ASSUMPTION',
    ['venture.geography', 'venture.viability'],
  ));
  nodes.push(node(
    'venture.customer-type', 'signal', 'Customer archetype',
    snapshot.customerType ? snapshot.customerType.toUpperCase() : 'Unknown',
    snapshot.customerType ? 'medium' : 'unknown',
    snapshot.customerType ? 'Founder selection / inference' : 'Not yet captured',
    snapshot.customerType ? 'founder-input' : 'downstream',
    snapshot.customerType ? 'MODEL INFERENCE' : 'NEEDS VALIDATION',
    ['venture.audience', 'venture.delivery'],
  ));
  nodes.push(node(
    'venture.differentiator', 'signal', 'Differentiator',
    snapshot.differentiation || 'Unknown',
    snapshot.differentiation ? 'low' : 'unknown',
    snapshot.differentiation ? 'Founder claim, untested against alternatives' : 'Not yet captured',
    snapshot.differentiation ? 'founder-input' : 'downstream',
    snapshot.differentiation ? 'ASSUMPTION' : 'NEEDS VALIDATION',
    ['venture.problem', 'venture.viability'],
  ));
  nodes.push(node(
    'venture.bounds', 'signal', 'Bounds & goals',
    snapshot.constraints || snapshot.goals || 'Unknown',
    snapshot.constraints || snapshot.goals ? 'low' : 'unknown',
    snapshot.constraints || snapshot.goals ? 'Founder-provided bounds' : 'Not yet captured',
    snapshot.constraints || snapshot.goals ? 'founder-input' : 'downstream',
    snapshot.constraints || snapshot.goals ? 'VERIFIED' : 'NEEDS VALIDATION',
    ['venture.viability'],
  ));
  nodes.push(node(
    'venture.monetization', 'assumption', 'Monetization context',
    snapshot.context || 'Unknown',
    snapshot.context ? 'low' : 'unknown',
    snapshot.context ? 'Founder-provided operating notes' : 'No pricing/revenue signal yet',
    snapshot.context ? 'founder-input' : 'downstream',
    snapshot.context ? 'ASSUMPTION' : 'NEEDS VALIDATION',
    ['venture.customer-type', 'venture.viability'],
  ));
  snapshot.openQuestions.forEach((q, i) => {
    nodes.push(node(
      `venture.question-${i}`, 'question', `Open question ${i + 1}`,
      q, 'unknown', 'Awaiting founder evidence or Stage 02 validation',
      'founder-input', 'NEEDS VALIDATION', ['venture.viability'],
    ));
  });
  nodes.push(node(
    'venture.viability', 'relationship', 'Viability rollup',
    'Derived in Stage 02 from the nodes above',
    'unknown', 'No scored evidence yet — Stage 01 only collects signals',
    'downstream', 'NEEDS VALIDATION',
    nodes.filter((n) => n.id !== 'venture.viability').map((n) => n.id),
  ));
  return nodes;
}
