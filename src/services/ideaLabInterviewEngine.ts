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

export type CasualKind = 'joke' | 'scary' | 'greeting' | 'thanks' | 'capabilities' | 'bye' | 'personal' | 'unrelated' | null;

export function detectCasual(text: string): CasualKind {
  const t = text.toLowerCase().trim();
  if (!t) return null;
  // Personal / out-of-scope requests are rejected before any other intent so
  // that "are you single" is never mistaken for a greeting.
  if (/\b(?:(?:ur|your|u|give\s+me)\s+(?:phone\s*)?(?:number|contact|whatsapp|insta|snap|address)|call\s+me|are\s+you\s+single|date\s+me|love\s+you|marry\s+me)\b/i.test(t)) {
    return 'personal';
  }
  if (/\bjoke\b|\bfunny\b|\bmake me laugh\b/.test(t)) return 'joke';
  if (/\bscary\b|\bscarier\b|\bspooky\b|\bhorror\b|\bfrighten/.test(t)) return 'scary';
  if (/^(?:hi|hey|hello|hii|hiii|heyy|namaste|yo|sup|howdy|hola|good\s+(?:morning|afternoon|evening|day)|greetings)\b/i.test(t) && t.split(/\s+/).length <= 4) {
    return 'greeting';
  }
  if (/^(?:how are you|how's it going|hows it going|what's up|whats up|is anyone there|who are you|what are you)\b/i.test(t)) {
    return 'greeting';
  }
  if (/\b(?:thank|thanks|thx|ty|shukriya|thank you)\b/i.test(t) && t.split(/\s+/).length <= 5) {
    return 'thanks';
  }
  if (/\b(?:what can you do|how do you work|help me|who are you)\b/i.test(t) && t.split(/\s+/).length <= 6) {
    return 'capabilities';
  }
  if (/^(?:bye|goodbye|see you|cya)\b/i.test(t) && t.split(/\s+/).length <= 4) {
    return 'bye';
  }
  if (/^(?:ok|okay|got it|understood|cool|great|awesome|perfect|sounds good|sure|alright)$/i.test(t)) {
    return 'thanks';
  }
  if (/\b(?:weather|temperature|movie|song|recipe|cook|food\s+recipe|cricket\s+score|game\s+score|president|prime\s+minister)\b/i.test(t)) {
    return 'unrelated';
  }
  return null;
}

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

export function findSubstantiveIdea(historyTexts: string[], currentText: string, snapshotRaw?: string): string | null {
  if (snapshotRaw && snapshotRaw.trim().length > 5 && !detectCasual(snapshotRaw) && !isGenericCategoryOnly(snapshotRaw)) {
    return snapshotRaw.trim();
  }
  for (const text of historyTexts) {
    if (text && text.trim().length > 5 && !detectCasual(text) && !isGenericCategoryOnly(text) && text.trim().split(/\s+/).length >= 3) {
      return text.trim();
    }
  }
  if (currentText && currentText.trim().length > 5 && !detectCasual(currentText) && !isGenericCategoryOnly(currentText) && currentText.trim().split(/\s+/).length >= 3) {
    return currentText.trim();
  }
  return null;
}

export function isGenericCategoryOnly(text: string): ProductType | null {
  if (!text) return null;
  const clean = text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"()[\]{}]+$/, '')
    .trim();

  // Strip leading intent preambles like "I'm making a", "I want to build a", "We are doing"
  const stripped = clean
    .replace(
      /^(?:i(?:'m|\s+am|\s+want\s+to|\s+plan\s+to|\s+would\s+like\s+to)?\s*(?:making|building|creating|launching|starting|doing|develop(?:ing)?|build|make|create|start|launch)\s*(?:a|an)?\s*)/i,
      '',
    )
    .trim();

  if (/^(?:physical|physical\s+product|physical\s+products|hardware|tangible\s+product|tangible\s+goods|consumer\s+product|cpg)$/i.test(stripped)) {
    return 'physical';
  }
  if (/^(?:saas|software|software\s+as\s+a\s+service|web\s+app|mobile\s+app|app|application|digital\s+platform|platform)$/i.test(stripped)) {
    return 'saas';
  }
  if (/^(?:marketplace|two-sided\s+marketplace|p2p|p2p\s+platform|aggregator)$/i.test(stripped)) {
    return 'marketplace';
  }
  if (/^(?:service|agency|consultancy|consulting|service\s+business)$/i.test(stripped)) {
    return 'service';
  }
  if (/^(?:community|membership|cohort)$/i.test(stripped)) {
    return 'community';
  }
  if (/^(?:creator|content\s+creator|newsletter|media)$/i.test(stripped)) {
    return 'creator';
  }
  return null;
}

export function isSubstantiveIdea(text: string): boolean {
  if (!text || text.trim().length <= 3) return false;
  if (detectCasual(text)) return false;
  if (isGenericCategoryOnly(text)) return false;

  const clean = text
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"()[\]{}]+$/, '')
    .trim();

  const stripped = clean
    .replace(
      /^(?:i(?:'m|\s+am|\s+want\s+to|\s+plan\s+to|\s+would\s+like\s+to)?\s*(?:making|building|creating|launching|starting|doing|develop(?:ing)?|build|make|create|start|launch)\s*(?:a|an)?\s*)/i,
      '',
    )
    .trim();

  if (stripped.length <= 3 || isGenericCategoryOnly(stripped)) return false;

  return true;
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

  // Only extract geography when the user explicitly provides location phrasing ("in Mumbai", "based in India", etc.)
  const geoPrepositionMatch = current.match(/(?:based\s+in|launching\s+in|operating\s+in|located\s+in|for\s+the\s+market\s+in|targeting\s+customers\s+in|\bin)\s+([a-zA-Z\s]{3,35})/i);
  if (geoPrepositionMatch && geoPrepositionMatch[1]) {
    const locSnippet = geoPrepositionMatch[1].trim().toLowerCase();
    for (const c of KNOWN_COUNTRIES) {
      const regex = new RegExp(`\\b${c}\\b`, 'i');
      if (regex.test(locSnippet)) {
        empty.country = titleCase(c.replace(/^u\.s\.$/i, 'United States').replace(/^usa$/i, 'United States').replace(/^uk$/i, 'United Kingdom'));
        break;
      }
    }
    for (const r of INDIA_REGIONS) {
      const regex = new RegExp(`\\b${r}\\b`, 'i');
      if (regex.test(locSnippet)) {
        empty.cityRegion = titleCase(r);
        if (!empty.country) empty.country = 'India';
        break;
      }
    }
    if (!empty.cityRegion) {
      for (const ci of WORLD_CITIES) {
        const regex = new RegExp(`\\b${ci}\\b`, 'i');
        if (regex.test(locSnippet)) {
          empty.cityRegion = titleCase(ci);
          break;
        }
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
      vectorLabel: '01 Product Vehicle',
      question: 'What are you thinking of building — a software app, a marketplace, a physical product, a service, or a community?',
      whyItMatters: 'Understanding what the customer receives helps us match the right business architecture.',
    };
  }
  if (!snapshot.targetAudience && !signals.audience) {
    return {
      vectorLabel: '02 Target Customer',
      question: 'Who do you imagine using it? (If you are not sure, describe the person who you think might need it most.)',
      whyItMatters: 'Every venture starts with a specific human who feels an acute need.',
    };
  }
  if (!snapshot.problem && !signals.problem) {
    return {
      vectorLabel: '03 Problem / Need',
      question: 'What problem or frustration are you trying to solve? What made you think this should exist?',
      whyItMatters: 'Finding real human pain gives your venture an authentic reason to exist.',
    };
  }
  if ((!snapshot.country && !signals.country) || (!snapshot.cityRegion && !signals.cityRegion)) {
    return {
      vectorLabel: '04 Context & Location',
      question: 'Where or in what situation would people use this — and which city or region would you launch in first?',
      whyItMatters: 'Real-world context shapes local customer habits, operations, and channel strategy.',
    };
  }
  if (snapshot.openQuestions.length === 0) {
    return {
      vectorLabel: '05 Desired Outcome',
      question: 'What would you want to be different for the customer if this worked? What is your biggest open doubt about this idea?',
      whyItMatters: 'This anchors what success looks like and tells the Business Council what to stress-test first.',
    };
  }
  return {
    vectorLabel: 'Discovery Synthesis',
    question: 'We have enough basic discovery to convene the Business Council. Review your snapshot on the right, or continue to Feasibility when ready.',
    whyItMatters: 'Our multi-agent specialists will now debate differentiation, business model, and strategic roadmap for you.',
  };
}

// --- Venture completeness model ------------------------------------------------
// Lightweight internal readout of which discovery vectors are filled.

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
    { key: 'idea', label: 'Idea concept', done: s.rawInput.trim().length > 3 },
    { key: 'productType', label: 'Product vehicle', done: s.productType !== null },
    { key: 'audience', label: 'Target customer', done: s.targetAudience.trim().length > 0 },
    { key: 'problem', label: 'Core problem', done: s.problem.trim().length > 0 },
    { key: 'location', label: 'Context & location', done: s.country.trim().length > 0 || s.cityRegion.trim().length > 0 || s.context.trim().length > 0 },
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
  const substantiveIdea = findSubstantiveIdea(historyUserTexts, currentText, snapshot.rawInput);
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

  // --- Generic Category Only handling (e.g. "I'm making physical product") ---
  const genericCat = isGenericCategoryOnly(currentText);
  if (genericCat && (!snapshot.rawInput || snapshot.rawInput.trim().length <= 3)) {
    updates.productType = genericCat;
    let clarification = '';
    if (genericCat === 'physical') {
      clarification =
        `Got it — what kind of physical product are you thinking about?\n\n` +
        `Tell me about the specific item (for example: reusable water bottle, winter apparel, coffee, organic skincare, electronics) and who it might be for.`;
    } else if (genericCat === 'saas') {
      clarification = `Got it — what kind of software or app are you thinking about building and what task does it help solve?`;
    } else if (genericCat === 'marketplace') {
      clarification = `Got it — what two groups or sides do you want to connect on this marketplace?`;
    } else {
      clarification = `Got it — what kind of service are you planning to provide and for whom?`;
    }
    return {
      replyText: clarification,
      updates,
      savedSummary: [`Product Vehicle → ${PRODUCT_SIGNALS.find((s) => s.type === genericCat)?.label} (Tentative assessment)`],
      chips: genericCat === 'physical' ? ['Reusable water bottle', 'Clothing / Apparel', 'Packaged food / Beverage', 'Organic skincare'] : [],
      probeId: null,
    };
  }

  // --- Uncertainty / "Not Sure" handling: Assist gently without questionnaires ---
  const isUncertain = /^(not sure|unsure|i don't know|idk|no idea|don't know|dont know|not really sure|hard to say|help me|you tell me)$/i.test(currentText.trim()) ||
    /^(not sure|i'm not sure|im not sure)\b/i.test(currentText.trim());

  if (isUncertain) {
    const nextDim = !snapshot.targetAudience ? 'customer' : !snapshot.problem ? 'problem' : 'geography';
    let suggestionText = '';
    if (nextDim === 'customer') {
      suggestionText =
        `That is completely okay! Many great founders start with just a rough intuition.\n\n` +
        `Who do you imagine might need this? Are you thinking about:\n` +
        `• **Students / Young Adults** (education, budget, campus life)\n` +
        `• **Office Workers / Professionals** (time-saving, lunch, productivity)\n` +
        `• **Small Business Owners** (operations, waste, revenue)\n` +
        `• **Homeowners / Renters** (repairs, cleaning, maintenance)\n` +
        `• Or someone else? Just describe whoever comes to mind in your own words.`;
    } else if (nextDim === 'problem') {
      suggestionText =
        `No problem at all. Let's think about what currently feels broken or frustrating:\n\n` +
        `• Are existing alternatives too expensive?\n` +
        `• Is the current way of doing this too slow or complicated?\n` +
        `• Is there a lack of trust or transparent quality?\n\n` +
        `What made you think this should exist in the first place?`;
    } else {
      suggestionText = `That's fine! Where would you like to start first — in your local city/region or online nationally?`;
    }
    return {
      replyText: suggestionText,
      updates,
      savedSummary,
      chips: nextDim === 'customer' ? ['College students', 'Office workers', 'Small businesses', 'Homeowners'] : ['High price of alternatives', 'Too slow / inconvenient', 'Lack of transparency'],
      probeId: null,
    };
  }

  // --- Partial Idea handling (e.g. "I want to build something for students") ---
  if (historyUserTexts.length <= 1 && /for students|for restaurants|for workers|for homeowners|for parents/i.test(currentText) && currentText.split(/\s+/).length <= 8 && !snapshot.problem) {
    const aud = extractAudienceFragment(currentText) || 'your target audience';
    updates.targetAudience = aud;
    savedSummary.push(`Target Audience → "${aud}" (Confirmed fact)`);
    return {
      replyText:
        `Got it — focused on **${aud}**.\n\n` +
        `What kind of problem or daily frustration do you want to solve for them? (e.g. finding affordable help, saving time, reducing costs, or something else?)`,
      updates,
      savedSummary,
      chips: ['Affordable pricing / cost', 'Time-saving / convenience', 'Better quality & trust'],
      probeId: null,
    };
  }

  // --- Casual branch: stay in character, then bridge back to business --------
  if (casual === 'joke') {
    const joke = CASUAL_JOKES[currentText.length % CASUAL_JOKES.length];
    return {
      replyText:
        `${joke}\n\nI do take requests — but my day job is venture discovery. ` +
        `Tell me about the idea in your head, and I will help structure it step by step.`,
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
        `Give me your raw idea and I will help you identify the critical assumptions early.`,
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
        `${open}I am your Business Intelligence Interviewer — I turn rough ideas into structured venture intelligence.\n\n` +
        `Describe your idea in plain words (what you want to build + for whom), and we will build from there.`,
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
        `• Listen to your raw idea and capture your user facts (what, for whom, where)\n` +
        `• Save what you tell me into your venture profile on the right\n` +
        `• Ask simple, conversational questions to understand your intuition\n` +
        `• Clearly distinguish your confirmed facts from initial assessments\n\n` +
        `You are NOT expected to know your differentiation, business model, or unit economics yet — our AI Business Council will derive those for you.\n\n` +
        `So — what are you thinking of building?`,
      updates,
      savedSummary,
      chips: [],
      probeId: null,
    };
  }
  if (casual === 'personal') {
    return {
      replyText:
        `I am your Business Intelligence Interviewer, an AI discovery system designed strictly to analyze and structure business ventures.\n\n` +
        `I don't have a phone number, personal contact details, or social media. My sole objective is helping turn your business concept into a validated, structured venture profile.\n\n` +
        `What product, service, or customer problem are you looking to build?`,
      updates,
      savedSummary,
      chips: [],
      probeId: null,
    };
  }
  if (casual === 'unrelated') {
    return {
      replyText:
        `That falls outside our venture discovery scope. As your Business Intelligence Interviewer, my focus is structuring your business model, customer beachhead, unit economics, and operational feasibility.\n\n` +
        `Let's focus on your venture: what product or service are you planning to bring to market?`,
      updates,
      savedSummary,
      chips: [],
      probeId: null,
    };
  }

  // --- Honest boundary: no live market data ----------------------------------
  const dataBoundary = wantsMarketData(currentText)
    ? `We don't have enough external market evidence to establish exact figures yet. What we can do is frame the exact validation test for Stage 02.\n\n`
    : '';

  // --- One-shot probe answer: map the picked option into project state -----
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
      `Product Vehicle → ${PRODUCT_SIGNALS.find((s) => s.type === signals.productType)?.label} (Initial assessment)`,
    );
  }
  if (signals.audience && !snapshot.targetAudience) {
    updates.targetAudience = signals.audience;
    savedSummary.push(`Target Customer → "${signals.audience}" (Confirmed fact)`);
  }
  if (signals.problem && !snapshot.problem) {
    updates.problem = signals.problem;
    savedSummary.push('Core Problem → captured from your message (Confirmed fact)');
  }
  if (signals.country && !snapshot.country) {
    updates.country = signals.country;
    savedSummary.push(`Country → ${signals.country} (Confirmed fact)`);
  }
  if (signals.cityRegion && !snapshot.cityRegion) {
    updates.cityRegion = signals.cityRegion;
    savedSummary.push(`City / Region → ${signals.cityRegion} (Confirmed fact)`);
  }
  if (signals.customerType && !snapshot.customerType) {
    updates.customerType = signals.customerType;
    savedSummary.push(`Customer Archetype → ${signals.customerType.toUpperCase()} (Initial assessment)`);
  }
  if (signals.deliveryModel && !snapshot.deliveryModel) {
    updates.deliveryModel = signals.deliveryModel;
    savedSummary.push(`Delivery Model → ${signals.deliveryModel} (Initial assessment)`);
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

  if (!snapshot.context) {
    const contextBits: string[] = [];
    const lower = currentText.toLowerCase();
    if (/(price|pricing|charge|subscription|freemium|revenue|margin|commission|fee|rs\.? |₹|lakh|crore)/.test(lower)) {
      contextBits.push(`Operating note: ${truncate(currentText, 160)}`);
    } else if (/(distribut|channel|retail|wholesale|export|shipping|competitor|alternative)/.test(lower)) {
      contextBits.push(`Distribution note: ${truncate(currentText, 160)}`);
    }
    if (contextBits.length > 0 && currentText.trim().length > 20) {
      updates.context = contextBits.join(' ');
      savedSummary.push('Operating Context → captured from your message');
    }
  }

  const deduced = deduceValidationQuestion(currentText, signals, snapshot);
  if (deduced) {
    updates.openQuestions.push(deduced);
    savedSummary.push(`Key Uncertainty (Needs Validation) → "${deduced}"`);
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

  // First substantive exchange: acknowledge capture conversationally before
  // reasoning output, so the interview opens like an interviewer, not a form.
  if (historyUserTexts.length === 0 && savedSummary.length > 0) {
    lines.push(`Good. I've captured the raw idea.`);
    lines.push('');
    lines.push(`Before we evaluate it, I want to understand the business itself.`);
    lines.push('');
  }

  if (answeredProbe) {
    lines.push(`Confirmed — "${truncate(currentText, 80)}". Logged as a user-confirmed fact.`);
    lines.push('');
  } else if (isFollowUp && substantiveIdea && substantiveIdea !== currentText) {
    lines.push(
      `Noted — exploring this for your venture ("${truncate(substantiveIdea, 90)}").`,
    );
    lines.push('');
  }

  // 1. Captured Section:
  const captured: string[] = [];
  if (savedSummary.length > 0) {
    for (const s of savedSummary) {
      captured.push(`• [VERIFIED FROM FOUNDER] ${s}`);
    }
  } else if (snapshot.rawInput && historyUserTexts.length <= 1) {
    captured.push(`• [VERIFIED FROM FOUNDER] "${truncate(currentText.trim(), 120)}"`);
  }

  if (signals.cityRegion || signals.country) {
    const geo = [signals.cityRegion, signals.country].filter(Boolean).join(', ');
    if (!captured.some((c) => c.includes(geo))) {
      captured.push(`• [VERIFIED FROM FOUNDER] Operating location: ${geo}`);
    }
  }

  // Clear distinction: INFERRED
  if (signals.productType && !snapshot.productType) {
    const label = PRODUCT_SIGNALS.find((s) => s.type === signals.productType)?.label ?? signals.productType;
    captured.push(`• [INFERRED] Venture vehicle: ${label} (${signals.productTypeConfidence} confidence, cues: ${signals.productTypeEvidence.join(', ') || 'context'}) — initial assessment, needs validation`);
  }
  if (signals.archetypes.length > 1) {
    captured.push(`• [INFERRED] Operating pattern: ${signals.archetypes.slice(1).join(' + ')}`);
  }

  lines.push('Captured:');
  if (captured.length > 0) {
    lines.push(...captured);
  } else {
    lines.push('• Context noted — existing venture vectors confirmed.');
  }
  lines.push('');

  // Recognized operating pattern: name the failure mode and the test for it.
  const patternInfo = findPatternInfo(signals.archetypes);
  if (patternInfo) {
    lines.push('RELEVANT CATEGORY PATTERN:');
    lines.push(`"${patternInfo.label}"`);
    lines.push('WHY IT MATTERS:');
    lines.push(patternInfo.why);
    lines.push('HOW TO VALIDATE:');
    lines.push(patternInfo.validate);
    lines.push('');
  }
  lines.push('');

  // 2. Confidence Section
  lines.push('Confidence:');
  const confLevel = signals.productTypeConfidence ?? (savedSummary.length > 0 ? 'High' : 'Medium');
  const confCap = typeof confLevel === 'string' ? confLevel.charAt(0).toUpperCase() + confLevel.slice(1) : 'Medium';
  lines.push(`• ${confCap} grounding from founder statements (${completeness.done}/${completeness.total} venture vectors mapped)`);
  lines.push('');

  // A dry observation, only on the turn where the profile actually advanced.
  // Rotated deterministically by message length — never random, never praise.
  if (savedSummary.length > 0 && currentText.trim().length > 40) {
    lines.push(DRY_ASIDES[currentText.length % DRY_ASIDES.length]);
    lines.push('');
  }

  if (savedSummary.length > 0) {
    lines.push('RECORDED USER FACTS (CONFIRMED — editable anytime):');
    for (const s of savedSummary) lines.push(`• ${s}`);
    lines.push('');
  } else if (snapshot.rawInput) {
    lines.push('Nothing new to file this time — your profile already holds this. Continuing discovery.');
    lines.push('');
  }

  lines.push(
    `DISCOVERY PROGRESS: ${completeness.done}/${completeness.total} dimensions complete` +
      (completeness.missing.length > 0 ? ` — next up: ${completeness.missing.slice(0, 2).join(', ').toLowerCase()}` : ' — ready for Council analysis'),
  );
  lines.push('');

  // 3. What this changes Section
  lines.push('What this changes:');
  if (signals.productType === 'physical') {
    lines.push('• Focuses Stage 02 feasibility on physical sourcing, artisan/manufacturing lead times, and inventory cashflow.');
    lines.push('• Downstream brand & architecture will structure physical distribution and fulfillment.');
  } else if (signals.productType === 'saas') {
    lines.push('• Focuses Stage 02 feasibility on technical delivery, subscription LTV/CAC, and user onboarding.');
    lines.push('• Downstream architecture will structure software infrastructure and data models.');
  } else if (signals.productType === 'marketplace') {
    lines.push('• Focuses Stage 02 feasibility on two-sided cold-start liquidity and supply-demand trust.');
  } else if (savedSummary.length > 0) {
    lines.push(`• Locks in ${savedSummary.slice(0, 2).map((s) => s.split('→')[0].trim()).join(' and ')} across subsequent stages.`);
  } else {
    lines.push('• Tightens the strategic baseline across subsequent feasibility, market sizing, and brand stages.');
  }
  lines.push('');

  // 4. Next question Section
  let chips: string[] = [];
  let probeId: string | null = null;
  if (activeProbe && !answeredProbe) {
    lines.push(`Next question [${activeProbe.vectorLabel}]:`);
    lines.push(activeProbe.question);
    lines.push('');
    activeProbe.options.forEach((opt, i) => lines.push(`${String.fromCharCode(65 + i)}) ${opt}`));
    lines.push('');
    lines.push(`Why this matters: ${activeProbe.whyItMatters}`);
    chips = activeProbe.options;
    probeId = activeProbe.id;
  } else {
    lines.push(`Next question [${planned.vectorLabel}]:`);
    lines.push(planned.question);
    lines.push('');
    lines.push(`Why this matters: ${planned.whyItMatters}`);
  }
  lines.push('');
  lines.push(dataBoundary + 'STATUS: [VERIFIED FROM FOUNDER] items are stored in your profile; [INFERRED] items require validation in Stage 02. Initial assessment — our Business Council will derive strategic differentiation in Stage 02 & 03.');

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
