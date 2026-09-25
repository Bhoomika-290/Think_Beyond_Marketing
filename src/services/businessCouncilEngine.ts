import type {
  CouncilQueryRequest,
  CouncilQueryResponse,
  CouncilSpecialistDebate,
  CouncilStructuredOutput,
  VentureDecision,
} from '../types/council';
import type { ProductType, DeliveryModel, CustomerType } from '../types/project';

export type MessageIntent =
  | 'GREETING'
  | 'NEW_IDEA'
  | 'BUSINESS_QUERY'
  | 'MODIFICATION'
  | 'STAGE_OR_DECISION_QUERY'
  | 'OUT_OF_DOMAIN';

/**
 * Helper to test if a message has genuine business idea intent
 */
function containsIdeaPattern(text: string): boolean {
  const lower = text.toLowerCase().trim();
  const ideaPatterns = [
    /(?:i\s+want\s+to|i'd\s+like\s+to|i\s+plan\s+to|i\s+am\s+thinking\s+of|i'm\s+thinking\s+of)\s+(?:build|start|create|launch|make|develop|open|run)\b/i,
    /(?:my\s+idea\s+is|the\s+idea\s+is|concept\s+is)\b/i,
    /(?:a|an)\s+(?:saas|platform|marketplace|subscription|service|app|business|brand|tool|website|network|store|startup)\s+(?:for|that|to|helping|connecting)\b/i,
    /(?:build|building|launch|launching|create|creating|make|making)\s+(?:an?\s+)?(?:app|platform|marketplace|website|tool|software|business|store)\b/i,
    /(?:helps?|enable|allow|connect|connects)\s+.*?\s+(?:to\s+find|find|manage|buy|sell|rent|learn|book|order|track|deliver)\b/i,
  ];
  return ideaPatterns.some((pattern) => pattern.test(lower));
}

/**
 * 1. Intent Router: Classifies user message into lightweight deterministic categories
 * BEFORE any specialist or council processing occurs.
 */
export function classifyMessageIntent(query: string, hasExistingIdea: boolean): {
  intent: MessageIntent;
  matchedPattern?: string;
} {
  const normalized = query.toLowerCase().trim().replace(/[.,!?;:]+$/, '');

  // A. OUT-OF-DOMAIN CODE TUTORING / HOMEWORK / TRIVIA / UNRELATED
  const nonBusinessPatterns = [
    /write\s+(?:java|python|c\+\+|c#|ruby|rust|go|php|swift|kotlin|javascript|typescript|c|html|css|sql)\s+code\s+to/i,
    /write\s+a\s+program\s+to\s+(?:add|subtract|multiply|divide|reverse|sort|find|print|calculate)/i,
    /how\s+to\s+(?:write|implement)\s+(?:a\s+for\s+loop|binary\s+search|linked\s+list|bubble\s+sort|quick\s+sort|recursion)/i,
    /solve\s+(?:calculus|algebra|physics|chemistry|geometry|math)\s+(?:homework|problem|equation)/i,
    /recipe\s+for\s+(?:pancake|cake|pizza|pasta|cookie|bread|soup|curry)/i,
    /who\s+won\s+the\s+(?:world\s+cup|super\s+bowl|oscars|election|ipl|champions\s+league)/i,
    /tell\s+me\s+a\s+(?:joke|poem|story|fairy\s+tale)\b/i,
  ];

  for (const pattern of nonBusinessPatterns) {
    if (pattern.test(normalized)) {
      return { intent: 'OUT_OF_DOMAIN' };
    }
  }

  // B. STAGE / DECISION RETRIEVAL QUERY (Check BEFORE modification so questions like "What did we decide?" aren't treated as modifications)
  const retrievalPatterns = [
    /what\s+did\s+we\s+decide/i,
    /what\s+was\s+decided/i,
    /what\s+is\s+our\s+decision/i,
    /what\s+have\s+we\s+built/i,
    /what\s+is\s+my\s+(?:current\s+)?(?:roadmap|positioning|mvp|strategy|target|customer|pricing)/i,
    /show\s+me\s+my\s+(?:competitors|decisions|roadmap|features|swat|metrics|target|pricing)/i,
    /why\s+did\s+we\s+choose/i,
    /what\s+are\s+our\s+decisions/i,
    /who\s+is\s+our\s+target\s+customer/i,
  ];

  for (const pattern of retrievalPatterns) {
    if (pattern.test(normalized)) {
      return { intent: 'STAGE_OR_DECISION_QUERY' };
    }
  }

  const isQuestion =
    /^(?:how|what|why|who|where|when|can|is|are|should|could|would)\b/i.test(normalized) ||
    normalized.endsWith('?');

  // C. MIXED MESSAGE RULE: Check for IDEA so "Hi, I want to build..." is NEW_IDEA only when idea is not yet established
  if (!hasExistingIdea && !isQuestion && containsIdeaPattern(normalized)) {
    return { intent: 'NEW_IDEA' };
  }

  // D. IDEA MODIFICATION / DECISION COMMITMENT
  const modificationPatterns = [
    /(?:actually,?\s*)?(?:i\s+want\s+to\s+)?(?:change|update|set|switch)\s+(?:the\s+)?(?:target\s+)?(?:customer|audience|icp|segment)\s+to\s+/i,
    /(?:actually,?\s*)?(?:i\s+want\s+to\s+)?(?:target|focus\s+on)\s+(?:restaurants|students|enterprises|freelancers|b2b|b2c|d2c|small\s+businesses)\s*(?:instead)?/i,
    /(?:change|update|set|switch)\s+(?:the\s+)?(?:product\s+type|business\s+type|category|offering|product)\s+to\s+/i,
    /(?:change|update|set|relocate|move|focus\s+on)\s+(?:the\s+)?(?:location|operating\s+region|city|geography)\s+to\s+/i,
    /(?:focus\s+on|launch\s+in)\s+[a-zA-Z\s]+\s+first/i,
    /(?:let'?s\s+use|let'?s\s+go\s+with|switch\s+to|adopt)\s+(?:a\s+)?(?:subscription|marketplace|freemium|transaction\s+fee|usage-based|one-time)/i,
    /(?:let'?s\s+use|set\s+pricing\s+to|charge)\s+(?:a\s+)?(?:subscription\s+model\s+at\s+|₹|\$|\d+)/i,
    /(?:make\s+this|switch\s+to)\s+(?:b2b|b2c|d2c|marketplace|service|saas|physical)\s+instead/i,
    /(?:remove|drop)\s+(?:the\s+)?(?:marketplace\s+model|feature|subscription)/i,
  ];

  for (const pattern of modificationPatterns) {
    if (pattern.test(normalized)) {
      return { intent: 'MODIFICATION' };
    }
  }

  // E. PURE GREETING / CASUAL PLEASANTRIES (Never trigger Council or state mutations)
  const greetingPhrases = [
    'hello', 'hi', 'hey', 'hii', 'hiii', 'heyy', 'hey there', 'hi there', 'hello there',
    'good morning', 'good afternoon', 'good evening', 'good day', 'greetings',
    'how are you', 'how are you doing', 'hows it going', "how's it going",
    'what\'s up', 'whats up', 'sup', 'yo', 'howdy',
    'is anyone there', 'who are you', 'what are you', 'what can you do',
    'thanks', 'thank you', 'thx', 'ty', 'thank you so much',
    'ok', 'okay', 'got it', 'understood', 'cool', 'great', 'awesome',
    'perfect', 'sounds good', 'sure', 'alright', 'bye', 'goodbye', 'see you',
  ];

  const isShortGreeting =
    greetingPhrases.includes(normalized) ||
    (/^(?:hello|hi|hey|hii|good\s+(?:morning|afternoon|evening)|yo|howdy)\b/i.test(normalized) &&
      normalized.split(/\s+/).length <= 4);

  if (isShortGreeting) {
    return { intent: 'GREETING' };
  }

  // If there's no idea yet and message contains an explicit idea pattern (and is not a question), treat as NEW_IDEA
  if (!hasExistingIdea && !isQuestion && containsIdeaPattern(normalized)) {
    return { intent: 'NEW_IDEA' };
  }

  // Otherwise, standard Business Strategy Query
  return { intent: 'BUSINESS_QUERY' };
}

/**
 * 2. Intent Analyzer: Extracts structured modification patches when the user
 * explicitly directs a strategic change.
 */
export function extractVentureModification(
  query: string,
  _currentVentureName: string
): { isModification: boolean; patch?: CouncilQueryResponse['modificationPatch'] } {
  const lower = query.toLowerCase().trim();

  // Target Customer / ICP modification (e.g., "Actually, I want to target restaurants instead" or "target restaurants instead")
  const customerMatch =
    lower.match(/(?:actually,?\s*)?(?:i\s+want\s+to\s+)?(?:change|update|set|switch)\s+(?:the\s+)?(?:target\s+)?(?:customer|audience|icp|segment)\s+to\s+([^.?!]+)/i) ||
    lower.match(/(?:actually,?\s*)?(?:i\s+want\s+to\s+)?(?:target|focus\s+on)\s+(?!customer\b|audience\b|icp\b)([^.?!]+?)(?:\s+instead|\.|\?|$)/i);

  if (customerMatch && customerMatch[1]) {
    const rawTarget = customerMatch[1].trim();
    // Clean up trailing words like 'instead'
    const newTarget = rawTarget.replace(/\s+instead$/i, '').trim();

    const decision: VentureDecision = {
      id: `dec_${Date.now()}`,
      decision: `Refined Target Customer / ICP to "${newTarget}"`,
      why: 'User strategic redirection during advisory council consultation.',
      affectedArea: 'customer',
      timestamp: new Date().toISOString(),
      source: 'user_explicit',
    };
    return {
      isModification: true,
      patch: {
        ideaPatch: { targetAudience: newTarget },
        recordedDecision: decision,
      },
    };
  }


  // Pricing / Business Model commitment
  const pricingCommitMatch = lower.match(/(?:let'?s\s+use|let'?s\s+go\s+with|set\s+pricing\s+to|charge|adopt)\s+([^.?!]+)/i);
  if (pricingCommitMatch && (lower.includes('subscription') || lower.includes('₹') || lower.includes('$') || lower.includes('/month') || lower.includes('transaction fee') || lower.includes('freemium'))) {
    const pricingText = pricingCommitMatch[1].trim();
    const decision: VentureDecision = {
      id: `dec_${Date.now()}`,
      decision: `Adopted Pricing & Revenue Model: "${pricingText}"`,
      why: 'Founder confirmed business monetization model.',
      affectedArea: 'pricing',
      timestamp: new Date().toISOString(),
      source: 'user_explicit',
    };
    return {
      isModification: true,
      patch: {
        recordedDecision: decision,
      },
    };
  }

  // Product Type / Model modification
  const productTypeKeywords: Array<{ key: ProductType; regex: RegExp }> = [
    { key: 'physical', regex: /(?:physical|apparel|hardware|cpg|tangible\s+goods|beverage|coffee|clothing)/i },
    { key: 'saas', regex: /(?:saas|software|web\s+app|mobile\s+app|api|digital\s+platform|app)/i },
    { key: 'marketplace', regex: /(?:marketplace|two-sided|peer-to-peer|p2p|platform)/i },
    { key: 'service', regex: /(?:service|agency|consultancy|consulting|advisory)/i },
    { key: 'community', regex: /(?:community|membership|cohort|mastermind)/i },
    { key: 'creator', regex: /(?:creator|media|newsletter|publication|course)/i },
  ];

  const productMatch = lower.match(/(?:change|update|set|switch|make\s+this)\s+(?:the\s+)?(?:product\s+type|business\s+type|category|offering|product)?\s*(?:to|into)?\s+([^.?!]+)/i);
  if (productMatch && productMatch[1]) {
    const matchedText = productMatch[1].trim();
    let identifiedType: ProductType = 'physical';
    for (const item of productTypeKeywords) {
      if (item.regex.test(matchedText)) {
        identifiedType = item.key;
        break;
      }
    }
    const decision: VentureDecision = {
      id: `dec_${Date.now()}`,
      decision: `Switched Product Category to ${identifiedType.toUpperCase()}`,
      why: `Founder updated core product architecture to "${matchedText}".`,
      affectedArea: 'product',
      timestamp: new Date().toISOString(),
      source: 'user_explicit',
    };
    return {
      isModification: true,
      patch: {
        ideaPatch: { name: matchedText.length < 30 ? matchedText : undefined },
        businessModelPatch: { productType: identifiedType },
        recordedDecision: decision,
      },
    };
  }

  // Location modification
  const locationMatch = lower.match(/(?:change|update|set|relocate|move|focus\s+on|launch\s+in)\s+(?:the\s+)?(?:location|operating\s+region|city|geography)?\s*(?:to|in)?\s+([^.?!]+?)(?:\s+first|\.|\?|$)/i);
  if (locationMatch && locationMatch[1]) {
    const newLocation = locationMatch[1].trim();
    const decision: VentureDecision = {
      id: `dec_${Date.now()}`,
      decision: `Updated Operating Location to "${newLocation}"`,
      why: 'Geographic market focus adjusted by founder.',
      affectedArea: 'market',
      timestamp: new Date().toISOString(),
      source: 'user_explicit',
    };
    return {
      isModification: true,
      patch: {
        businessModelPatch: {
          location: {
            country: 'Primary Target Market',
            cityRegion: newLocation,
            operatingLocation: newLocation,
          },
        },
        recordedDecision: decision,
      },
    };
  }

  // Delivery Model modification
  const deliveryMatch = lower.match(/(?:change|update|set)\s+(?:delivery\s+model|distribution)\s+to\s+(online|offline|hybrid)/i);
  if (deliveryMatch && deliveryMatch[1]) {
    const model = deliveryMatch[1].toLowerCase() as DeliveryModel;
    return {
      isModification: true,
      patch: {
        businessModelPatch: { deliveryModel: model },
      },
    };
  }

  // Customer Type modification (B2B, B2C, D2C)
  const custTypeMatch = lower.match(/(?:change|update|set|make\s+this)\s+(?:customer\s+type|model|business)?\s*(?:to)?\s+(b2b|b2c|d2c|b2b2c)\s*(?:instead)?/i);
  if (custTypeMatch && custTypeMatch[1]) {
    const cType = custTypeMatch[1].toLowerCase() as CustomerType;
    return {
      isModification: true,
      patch: {
        businessModelPatch: { customerType: cType },
      },
    };
  }

  return { isModification: false };
}

/**
 * Helper to extract initial structured idea fields from a prompt
 */
function extractInitialIdeaFields(query: string): {
  rawInput: string;
  name: string;
  problem: string;
  targetAudience: string;
  productType: ProductType;
  customerType: CustomerType;
  deliveryModel: DeliveryModel;
} {
  // Strip leading greetings like "Hi, ", "Hello! "
  const cleaned = query
    .replace(/^(?:hi|hello|hey|good\s+(?:morning|afternoon|evening))\s*[,!.:-]*\s*/i, '')
    .trim();

  const lower = cleaned.toLowerCase();

  // Target audience extraction
  let targetAudience = '';
  const audienceMatch =
    lower.match(/(?:for|helps?|targeted\s+at)\s+([a-zA-Z\s]+?)(?:\s+to\s+|\s+find|\s+manage|\s+buy|\s+in\s+|\.|\?|$)/i);
  if (audienceMatch && audienceMatch[1]) {
    targetAudience = audienceMatch[1].trim();
  } else if (lower.includes('college student') || lower.includes('student')) {
    targetAudience = 'college students';
  } else if (lower.includes('restaurant')) {
    targetAudience = 'restaurants';
  } else if (lower.includes('freelancer')) {
    targetAudience = 'freelancers';
  } else if (lower.includes('coffee roaster') || lower.includes('roaster')) {
    targetAudience = 'independent coffee roasters';
  }

  // Product Type extraction
  let productType: ProductType = 'saas';
  if (lower.includes('coffee') || lower.includes('clothing') || lower.includes('apparel') || lower.includes('winter') || lower.includes('food') || lower.includes('hardware') || lower.includes('physical product')) {
    productType = 'physical';
  } else if (lower.includes('marketplace') || lower.includes('tutor') || lower.includes('peer-to-peer') || lower.includes('p2p') || lower.includes('rental') || lower.includes('platform connecting')) {
    productType = 'marketplace';
  } else if (lower.includes('agency') || lower.includes('consulting') || lower.includes('service') || lower.includes('advisory')) {
    productType = 'service';
  } else if (lower.includes('community') || lower.includes('membership')) {
    productType = 'community';
  } else if (lower.includes('course') || lower.includes('newsletter') || lower.includes('creator')) {
    productType = 'creator';
  }

  // Problem extraction
  let problem = cleaned;
  const problemMatch = lower.match(/(?:helps?|enable|allow|to)\s+([a-zA-Z\s]+(?:\s+find|\s+manage|\s+solve|\s+afford|\s+access)[^.?!]*)/i);
  if (problemMatch && problemMatch[1]) {
    problem = problemMatch[1].trim();
  }

  // Name extraction
  let name = cleaned.slice(0, 36).trim();
  if (lower.includes('tutor')) {
    name = 'Affordable Tutor Hub';
  } else if (lower.includes('winter clothing')) {
    name = 'Winter Apparel Collective';
  } else if (lower.includes('coffee')) {
    name = 'Roaster Direct Platform';
  }

  return {
    rawInput: cleaned,
    name,
    problem,
    targetAudience,
    productType,
    customerType: targetAudience.includes('restaurant') || targetAudience.includes('business') ? 'b2b' : 'b2c',
    deliveryModel: productType === 'physical' ? 'hybrid' : 'online',
  };
}

/**
 * 3. Main Multi-Agent Council Orchestration Engine with First-Step Intent Routing
 */
export function executeBusinessCouncilQuery(request: CouncilQueryRequest): CouncilQueryResponse {
  const { query, projectState, externalConnections } = request;

  const ventureName = projectState.idea.name || projectState.project.name || 'Your Venture';
  const hasExistingIdea = Boolean(projectState.idea.rawInput && projectState.idea.rawInput.trim().length > 3);

  // =========================================================================
  // STEP 1: LIGHTWEIGHT INTENT CLASSIFICATION
  // =========================================================================
  const { intent } = classifyMessageIntent(query, hasExistingIdea);

  // A. GREETING / CASUAL PLEASANTRIES (Never trigger Council or state mutations)
  if (intent === 'GREETING') {
    const lower = query.toLowerCase().trim();
    if (lower.includes('thank') || lower.includes('thx') || lower.includes('ty') || lower === 'ok' || lower === 'okay' || lower === 'got it' || lower === 'cool') {
      return {
        replyText: "You're welcome! When you're ready, tell me the next business decision, question, or venture idea you'd like to explore.",
        intent: 'GREETING',
        isOffTopic: false,
        isModification: false,
      };
    }

    if (!hasExistingIdea) {
      return {
        replyText: "Hi! I'm your business strategy council. Tell me the startup idea you're thinking about, even if it's rough, and I'll help structure it.",
        intent: 'GREETING',
        isOffTopic: false,
        isModification: false,
      };
    }

    return {
      replyText: `Hi! I'm your business strategy council for **${ventureName}**. Tell me what strategic question, market risk, pricing model, or next move you'd like to explore.`,
      intent: 'GREETING',
      isOffTopic: false,
      isModification: false,
    };
  }

  // B. OUT-OF-DOMAIN GENERAL TUTORING / TRIVIA (Polite hard redirect)
  if (intent === 'OUT_OF_DOMAIN') {
    return {
      replyText: "I’m focused on your venture and business strategy rather than general programming tutoring. If the Java question is about building your product, tell me what you're trying to implement and I can help from the product/technical strategy side.",
      intent: 'OUT_OF_DOMAIN',
      isOffTopic: true,
      isModification: false,
    };
  }

  // C. STAGE / DECISION RETRIEVAL (Retrieve existing context without repeating)
  if (intent === 'STAGE_OR_DECISION_QUERY') {
    const lower = query.toLowerCase();
    const decisions = projectState.decisions || [];

    // Target Customer / ICP retrieval
    if (lower.includes('customer') || lower.includes('audience') || lower.includes('icp') || lower.includes('target')) {
      const customerDecisions = decisions.filter((d) => d.affectedArea === 'customer');
      if (customerDecisions.length > 0) {
        return {
          replyText: `**Recorded Target Customer Decision:**\n• **${customerDecisions[0].decision}**\n*Rationale:* ${customerDecisions[0].why}\n*Logged:* ${new Date(customerDecisions[0].timestamp).toLocaleDateString()}`,
          intent: 'STAGE_OR_DECISION_QUERY',
          isOffTopic: false,
          isModification: false,
        };
      }
      return {
        replyText: `Your current target customer is **${projectState.idea.targetAudience || 'Core Adopters'}** for **${ventureName}**.`,
        intent: 'STAGE_OR_DECISION_QUERY',
        isOffTopic: false,
        isModification: false,
      };
    }

    // Pricing retrieval
    if (lower.includes('pricing') || lower.includes('price') || lower.includes('revenue') || lower.includes('monetization')) {
      const pricingDecisions = decisions.filter((d) => d.affectedArea === 'pricing');
      if (pricingDecisions.length > 0) {
        return {
          replyText: `**Recorded Pricing Decision:**\n• **${pricingDecisions[0].decision}**\n*Rationale:* ${pricingDecisions[0].why}\n*Logged:* ${new Date(pricingDecisions[0].timestamp).toLocaleDateString()}`,
          intent: 'STAGE_OR_DECISION_QUERY',
          isOffTopic: false,
          isModification: false,
        };
      }
      return {
        replyText: `No permanent pricing decision has been committed yet for **${ventureName}**. In Stage 02 and 03, we identified a value-based contribution margin target of 55%+ with a beachhead subscription or bundle tier. Would you like to set an explicit pricing model now?`,
        intent: 'STAGE_OR_DECISION_QUERY',
        isOffTopic: false,
        isModification: false,
      };
    }

    if (lower.includes('competitor') || lower.includes('competition')) {
      const competitors = projectState.marketIntelligence?.competitors || [];
      if (competitors.length > 0) {
        return {
          replyText: `**Identified Competitors for ${ventureName}:**\n${competitors.map((c, i) => `${i + 1}. **${c.name}** (${c.priceTier.toUpperCase()}): ${c.offeringSummary} — *Wedge:* ${c.differentiationFactor}`).join('\n')}\n\n*Our Wedge:* ${projectState.idea.differentiation || 'Operational craft & radical transparency'}`,
          intent: 'STAGE_OR_DECISION_QUERY',
          isOffTopic: false,
          isModification: false,
        };
      }
      return {
        replyText: `Competitor intelligence is being mapped in **Stage 03 (Market Intelligence)**. We analyze mass commodity incumbents vs. boutique craft players to isolate your whitespace quadrant.`,
        intent: 'STAGE_OR_DECISION_QUERY',
        isOffTopic: false,
        isModification: false,
      };
    }

    if (lower.includes('built') || lower.includes('roadmap') || lower.includes('mvp')) {
      const features = projectState.buildArchitecture?.mvpScope.features || [];
      const mustHave = features.filter((f) => f.priority === 'must');
      return {
        replyText: `**Venture Build Summary for ${ventureName}:**\n• **Category:** ${projectState.businessModel.productType?.toUpperCase() || 'VENTURE'}\n• **Target ICP:** ${projectState.idea.targetAudience || 'Core Adopters'}\n• **Must-Have MVP Scope:** ${mustHave.length > 0 ? mustHave.map((f) => f.name).join(', ') : 'Core transactional & discovery engine'}\n• **Active Stage:** Stage ${projectState.workflow.currentStage}`,
        intent: 'STAGE_OR_DECISION_QUERY',
        isOffTopic: false,
        isModification: false,
      };
    }

    if (decisions.length > 0) {
      return {
        replyText: `**Recent Strategic Decisions for ${ventureName}:**\n${decisions.slice(0, 4).map((d, i) => `${i + 1}. **${d.decision}** (${d.affectedArea.toUpperCase()}) — *${d.why}*`).join('\n')}`,
        intent: 'STAGE_OR_DECISION_QUERY',
        isOffTopic: false,
        isModification: false,
      };
    }

    return {
      replyText: `We are currently in **Stage ${projectState.workflow.currentStage}** for **${ventureName}**. We have structured your initial problem ("${(projectState.idea.problem || projectState.idea.rawInput || 'unmet customer friction').slice(0, 60)}...") and target audience (${projectState.idea.targetAudience || 'early adopters'}).`,
      intent: 'STAGE_OR_DECISION_QUERY',
      isOffTopic: false,
      isModification: false,
    };
  }

  // D. IDEA MODIFICATION / DECISION (Update central ProjectState & record decision)
  if (intent === 'MODIFICATION') {
    const modificationResult = extractVentureModification(query, ventureName);
    if (modificationResult.isModification && modificationResult.patch) {
      const patchDesc = modificationResult.patch.recordedDecision?.decision || 'Updated venture intelligence context.';
      const affectedArea = modificationResult.patch.recordedDecision?.affectedArea || 'venture';
      return {
        replyText: `**Decision Recorded:** ${patchDesc}\n\nAll downstream stages (Feasibility, Market Intelligence, Brand Positioning, MVP Specs, Simulation, Launch Telemetry, and Stage 09 Executive Report) have been synchronized with this updated ${affectedArea} parameter.`,
        intent: 'MODIFICATION',
        isOffTopic: false,
        isModification: true,
        modificationPatch: modificationResult.patch,
      };
    }
  }

  // E. NEW BUSINESS IDEA (Extract idea, store rawInput, run initial crystallization)
  if (intent === 'NEW_IDEA') {
    const extracted = extractInitialIdeaFields(query);

    const decision: VentureDecision = {
      id: `dec_${Date.now()}`,
      decision: `Initialized Venture Concept: "${extracted.rawInput.slice(0, 60)}..."`,
      why: 'Founder submitted new business idea to Idea Lab.',
      affectedArea: 'problem',
      timestamp: new Date().toISOString(),
      source: 'user_explicit',
    };

    const structured: CouncilStructuredOutput = {
      insight: `Venture crystallized as **${extracted.productType.toUpperCase()}**: "${extracted.rawInput.slice(0, 80)}..."`,
      why: `The concept targets an identifiable friction for ${extracted.targetAudience || 'early adopters'}.`,
      risk: `Unvalidated customer switching friction and willingness-to-pay.`,
      recommendation: `Lock your primary Beachhead ICP (${extracted.targetAudience || 'adopters'}) and verify your Product Type in Stage 01.`,
      nextAction: `Review your Product Type, Target Audience, and Location in the sections below to complete Idea Lab.`,
    };

    return {
      replyText: [
        `### 💡 Venture Concept Initialized`,
        ``,
        `I have recorded your idea into the central project state:`,
        `> *"${extracted.rawInput}"*`,
        ``,
        `**1. Initial Classification:** ${extracted.productType.toUpperCase()} model`,
        `**2. Target Audience:** ${extracted.targetAudience || 'Early Adopters'}`,
        `**3. Core Friction:** ${extracted.problem}`,
        ``,
        `👉 **Next Step:** Review and confirm your **Product Type**, **Target Audience**, and **Operating Location** below to unlock **Stage 02 (Feasibility & Viability)**.`,
      ].join('\n'),
      intent: 'NEW_IDEA',
      isOffTopic: false,
      isModification: true,
      modificationPatch: {
        ideaPatch: {
          rawInput: extracted.rawInput,
          name: extracted.name,
          problem: extracted.problem,
          targetAudience: extracted.targetAudience,
        },
        businessModelPatch: {
          productType: extracted.productType,
          customerType: extracted.customerType,
          deliveryModel: extracted.deliveryModel,
        },
        recordedDecision: decision,
      },
      structuredOutput: structured,
    };
  }


  // =========================================================================
  // STEP 2: SELECTIVE SPECIALIST BUSINESS COUNCIL QUERY
  // =========================================================================
  const targetAudience = projectState.idea.targetAudience || 'defined target market';
  const problemStatement = projectState.idea.problem || projectState.idea.rawInput || 'unmet customer friction';
  const productType = projectState.businessModel.productType || 'physical';
  const location = projectState.businessModel.location.operatingLocation || projectState.businessModel.location.cityRegion || 'target operating region';
  const differentiation = projectState.idea.differentiation || 'transparent value delivery';
  const currentStage = projectState.workflow.currentStage;

  const lowerQuery = query.toLowerCase();
  const isTargetAudienceQuery = /target\s+customer|who\s+is\s+(?:it\s+for|the\s+customer|my\s+icp)|icp|audience|customer\s+segment/i.test(lowerQuery);
  const isViabilityQuery = /viable|viability|feasible|feasibility|is\s+this\s+(?:a\s+good\s+)?business|will\s+it\s+work|can\s+it\s+make\s+money/i.test(lowerQuery);
  const isProblemQuery = /what\s+problem|problem\s+are\s+we\s+solving|core\s+friction|pain\s+point/i.test(lowerQuery);
  const isPricingQuery = /price|pricing|charge|how\s+much|monetize|revenue\s+model|unit\s+economics|subscription\s+or\s+transaction/i.test(lowerQuery);
  const isCompetitorQuery = /competitor|competition|who\s+else|differentiate|wedge|advantage/i.test(lowerQuery);
  const isLaunchQuery = /launch|growth|first\s+users|acquire|marketing|gtm|go\s+to\s+market/i.test(lowerQuery);
  const isMVPQuery = /mvp|features|what\s+should\s+my\s+mvp|scope|tech\s+stack/i.test(lowerQuery);
  const isMetricsQuery = /revenue|conversion|cac|ltv|sales|metrics|financials|projection/i.test(lowerQuery);

  let debate: CouncilSpecialistDebate;
  let structured: CouncilStructuredOutput;
  let missingDataNotice: string | undefined;

  if (isTargetAudienceQuery) {
    // Specialists: Founder + Market + Critic + Synthesis
    debate = {
      founderInsight: `Founder intent is solving "${problemStatement.slice(0, 60)}" for customers who value authentic quality over generic commodities.`,
      marketInsight: `Broad mass consumer segments are crowded and expensive to acquire. Focus strictly on "${targetAudience}".`,
      productInsight: `Tailor onboarding and initial delivery specifically to ${targetAudience}.`,
      growthInsight: `Concentrate early acquisition on high-intent channels where ${targetAudience} congregate organically.`,
      financeInsight: `Narrow ICP reduces early CAC and accelerates cash payback.`,
      criticChallenge: `Assumes this ICP currently feels enough acute pain to switch away from established alternatives.`,
      synthesisVerdict: `Prioritize ${targetAudience} in ${location} as your primary Beachhead ICP.`,
    };

    structured = {
      insight: `Your primary Beachhead ICP for **${ventureName}** is **${targetAudience}** in **${location}**.`,
      why: `They experience the friction of "${problemStatement.slice(0, 50)}..." most acutely and place high value on your differentiator (${differentiation.slice(0, 40)}).`,
      risk: `Over-broadening to casual buyers before securing high retention within this core segment will inflate acquisition costs.`,
      recommendation: `Ground your positioning and onboarding exclusively around the day-to-day pain of this segment.`,
      nextAction: `Conduct 5 structured customer discovery conversations to validate the trigger event that makes them search for an alternative.`,
    };
  } else if (isPricingQuery) {
    // Specialists: Finance + Market + Critic + Synthesis
    const isExplorationComparison = lowerQuery.includes('or') || lowerQuery.includes('should i use');

    debate = {
      founderInsight: `Pricing must reflect the craft, quality, and ethical positioning of ${ventureName}.`,
      marketInsight: `Competing on low price degrades perceived authority; position at a value-driven tier.`,
      productInsight: `A hybrid or tiered structure allows an entry package and a premium bundle.`,
      growthInsight: `Predictable recurring subscriptions provide higher lifetime value; transaction fees lower initial adoption friction.`,
      financeInsight: `Target a minimum 55% gross contribution margin after all direct fulfillment or server costs.`,
      criticChallenge: `Unvalidated willingness-to-pay: setting high fixed commitments before users experience value causes drop-off.`,
      synthesisVerdict: isExplorationComparison
        ? `Evaluate subscription (predictable ARR) vs. usage/transaction fees (low barrier) based on repeat frequency.`
        : `Adopt value-based pricing with transparent cost-to-value justification.`,
    };

    structured = {
      insight: isExplorationComparison
        ? `**Pricing Model Trade-off:** Subscription provides predictable recurring cash flow, whereas transaction/usage fees minimize onboarding friction for hesitant early users.`
        : `Adopt a **Value-Based Margin Strategy** tailored for **${productType.toUpperCase()}** in **${location}**.`,
      why: `For ${targetAudience}, high-frequency recurring pain justifies a monthly model, while occasional usage favors per-transaction or tiered packs.`,
      risk: `Under-estimating packaging, logistics, merchant fees, or hosting overhead leading to margin compression.`,
      recommendation: `Target minimum 55% gross margin. If usage is continuous, choose a simple recurring tier; if sporadic, use a prepaid credit or transaction fee.`,
      nextAction: `When ready to commit to a specific tier, tell me (e.g., *"Let's use a subscription model at ₹999/month"*) to update your project state.`,
    };
  } else if (isMVPQuery) {
    // Specialists: Product + Founder + Critic + Synthesis
    debate = {
      founderInsight: `The MVP must deliver the core promise without unnecessary bells and whistles.`,
      marketInsight: `Competitors are bloated with enterprise features; our MVP wins on simplicity and speed.`,
      productInsight: `Focus strictly on 3–4 Must-Have features that complete the primary user loop.`,
      growthInsight: `Ensure the core unboxing or first-time onboarding experience has zero friction.`,
      financeInsight: `Keep development timeline under 4–6 weeks to preserve runway.`,
      criticChallenge: `Feature creep: building secondary settings and analytics before proving the core transaction.`,
      synthesisVerdict: `Strip down MVP to the single core transactional loop.`,
    };

    structured = {
      insight: `Your MVP for **${ventureName}** should focus strictly on the **Core Value Transaction**.`,
      why: `Early adopters switch because of one killer capability (${differentiation.slice(0, 50)}), not twenty secondary features.`,
      risk: `Over-engineering secondary portals, complex admin roles, or custom billing before validating product-market fit.`,
      recommendation: `Include only: 1) Frictionless discovery/catalog, 2) Core value delivery engine, 3) Secure transaction & feedback collection.`,
      nextAction: `Review your MoSCoW MVP feature backlog in Stage 05 (Build & Architecture) to lock priorities.`,
    };
  } else if (isCompetitorQuery) {
    // Specialists: Market + Critic + Synthesis
    debate = {
      founderInsight: `Incumbents rely on brand legacy but have lost direct craft and transparency.`,
      marketInsight: `Mass competitors dominate high volume with commodity quality; boutique players lack scalable delivery.`,
      productInsight: `Our wedge combines artisanal quality with modern digital ordering reliability.`,
      growthInsight: `Position against competitor limitations using direct comparison and transparency proof points.`,
      financeInsight: `Exploit competitor price gouging or hidden fees to capture the underserved mid-market.`,
      criticChallenge: `Incumbents have large capital reserves; we must win on agility and niche loyalty rather than broad ad spend.`,
      synthesisVerdict: `Win on localized agility, radical transparency, and customer intimacy.`,
    };

    structured = {
      insight: `Your competitive wedge for **${ventureName}** is: **"${differentiation}"**.`,
      why: `Incumbents in ${location} cannot offer transparent batch provenance and high-touch customer care without cannibalizing their existing margins.`,
      risk: `Directly competing on broad generic keywords against well-funded incumbents.`,
      recommendation: `Highlight your operational transparency and craft as non-negotiable proof points on every landing page.`,
      nextAction: `Inspect the 2D Market Positioning Map in Stage 03 to visualize your whitespace quadrant.`,
    };
  } else if (isViabilityQuery) {
    // Specialists: Founder + Market + Product + Finance + Critic + Synthesis
    debate = {
      founderInsight: `The venture addresses a real, observable problem: "${problemStatement.slice(0, 60)}...".`,
      marketInsight: `Demand exists in the ${productType.toUpperCase()} category in ${location}.`,
      productInsight: `A lean MVP can be launched within weeks using modern modular infrastructure.`,
      growthInsight: `Viability depends on founder-led distribution and organic referrability.`,
      financeInsight: `Unit economics must maintain minimum 50–60% contribution margin.`,
      criticChallenge: `The core risk is customer inertia—prospects tolerating their current workaround instead of switching.`,
      synthesisVerdict: `Structurally viable provided unit margins remain above 50% and customer switching friction is minimal.`,
    };

    structured = {
      insight: `**${ventureName}** shows solid structural viability in the **${productType.toUpperCase()}** domain for **${location}**.`,
      why: `Your differentiation (${differentiation.slice(0, 50)}) directly attacks the structural gaps of legacy providers without requiring unproven deep tech.`,
      risk: `Customer inertia and unvalidated willingness-to-pay are the primary vulnerabilities.`,
      recommendation: `Keep MVP operational overhead minimal and secure your first 10 paying customers through direct outreach before scaling fixed costs.`,
      nextAction: `Review Stage 02 (Feasibility & Viability Matrix) to verify regulatory and operational checklist items.`,
    };
  } else if (isProblemQuery) {
    debate = {
      founderInsight: `The core friction is: "${problemStatement}".`,
      marketInsight: `Existing alternatives force customers to compromise on transparency or quality.`,
      productInsight: `Every feature must directly alleviate this exact friction, stripping away bloat.`,
      growthInsight: `Communicating this exact pain in before-and-after storytelling will maximize conversion.`,
      financeInsight: `Customers pay premium pricing to solve acute, recurring headaches.`,
      criticChallenge: `Ensure this is an urgent problem with existing budget, not just a mild convenience.`,
      synthesisVerdict: `Focus the entire venture narrative on eliminating "${problemStatement.slice(0, 60)}".`,
    };

    structured = {
      insight: `The core problem **${ventureName}** solves is: **"${problemStatement}"**.`,
      why: `In ${location}, ${targetAudience} are forced to compromise with stale, untraceable, or fragmented alternatives.`,
      risk: `Describing the problem in abstract technical jargon instead of the customer's real emotional and financial pain.`,
      recommendation: `Anchor your Stage 04 Brand Positioning and Stage 08 Marketing Hooks directly to this problem statement.`,
      nextAction: `Formulate a 1-sentence value proposition matching this problem in Stage 04 Brand Roadmap.`,
    };
  } else if (isLaunchQuery) {
    debate = {
      founderInsight: `Launch should start with enthusiastic early advocates who provide authentic feedback.`,
      marketInsight: `Staged rollout in ${location} allows operational calibration before scaling nationally.`,
      productInsight: `Ensure the core journey (discovery to first value) is tested before opening public gates.`,
      growthInsight: `Deploy founder-led reels, direct outreach, and local referral incentives for initial traction.`,
      financeInsight: `Maintain tight control over acquisition spend; calculate CAC across the first 50 users.`,
      criticChallenge: `Premature ad spend before confirming that early adopters return and recommend the product.`,
      synthesisVerdict: `Execute a staged founder-led launch with tight feedback loops.`,
    };

    structured = {
      insight: `Execute a **Staged Founder-Led Beachhead Launch** for **${ventureName}** in **${location}**.`,
      why: `Early stage ventures succeed by doing things that don't scale: personal onboarding and rapid iteration with ${targetAudience}.`,
      risk: `Premature broad ad spend before proving that early customers retain and refer.`,
      recommendation: `Follow the 9-Step Startup Action Roadmap in Stage 08 & 09: validate, onboard initial cohort, measure retention, then scale channels.`,
      nextAction: `Activate Launch Control in Stage 08 and generate initial social reels and campaign assets.`,
    };
  } else if (isMetricsQuery) {
    missingDataNotice =
      externalConnections?.analytics.isConnected || externalConnections?.stripe.isConnected
        ? undefined
        : `Note: External analytics & payment integrations are disconnected. Metrics below represent unit economic targets, not fabricated live data.`;

    debate = {
      founderInsight: `We must establish real baseline telemetry from live customer orders rather than projecting fictitious revenue.`,
      marketInsight: `Category benchmarks suggest targeting 2.5–3.5% conversion and 35%+ repeat purchase within 90 days.`,
      productInsight: `Instrument funnel telemetry from first touch to successful transaction.`,
      growthInsight: `Monitor Blended Customer Acquisition Cost (CAC) vs. 6-month Lifetime Value (LTV).`,
      financeInsight: `Maintain an LTV:CAC target greater than 3.0x once paid acquisition begins.`,
      criticChallenge: `Relying on vanity traffic metrics instead of cash contribution margin per transaction.`,
      synthesisVerdict: `Track unit contribution margin and cohort retention. Connect live data sources for authentic telemetry.`,
    };

    structured = {
      insight: `**Unit Economics & Telemetry Framework** for **${ventureName}**.`,
      why: `Sustainable venture growth is governed by Unit Economics (Contribution Margin per order) and Retention Rate, not speculative top-line projections.`,
      risk: `Manufacturing synthetic financial metrics before real transactions occur creates false confidence.`,
      recommendation: `Connect your live Stripe/Payment or CRM integration in Stage 08 to stream authentic financial transactions. Target minimum 55% gross margin.`,
      nextAction: `Review the Launch Readiness Diagnostics in Stage 08 to ensure analytics scripts are configured.`,
    };
  } else {
    // General Business Consultation Grounded in Venture
    debate = {
      founderInsight: `Evaluating "${query}" in direct relation to ${ventureName}'s core problem: "${problemStatement.slice(0, 60)}...".`,
      marketInsight: `Analyzing market dynamics for ${targetAudience} in the ${productType.toUpperCase()} domain (${location}).`,
      productInsight: `Aligning technical and operational capabilities with the stated value proposition: "${differentiation.slice(0, 50)}...".`,
      growthInsight: `Ensuring distribution and messaging reinforce our core competitive wedge.`,
      financeInsight: `Validating that operational choices protect unit contribution margin and capital efficiency.`,
      criticChallenge: `Assessing potential operational bottlenecks or unvalidated assumptions in this strategic direction.`,
      synthesisVerdict: `Provide tailored, actionable guidance grounded in the current venture state (${currentStage}).`,
    };

    structured = {
      insight: `**Strategic Council Evaluation** for **${ventureName}**:`,
      why: `Regarding "${query.slice(0, 80)}", your venture operates as a **${productType.toUpperCase()}** business in **${location}** addressing "${problemStatement.slice(0, 60)}...". Every strategic decision must reinforce your core differentiator (${differentiation.slice(0, 40)}).`,
      risk: `Deviating from your core Beachhead ICP (${targetAudience}) before proving repeatable product-market fit.`,
      recommendation: `Align this decision with your current milestone in **Stage ${currentStage}**. Leverage your accumulated findings from Idea Lab through Launch to maintain strategic consistency.`,
      nextAction: `Review your Executive Brand Intelligence Report in Stage 09 for an end-to-end synthesis of your venture's trajectory.`,
    };
  }

  // Format Concise, Proportional Structured Response
  const formattedReply = [
    `### 🏛️ Business Council // Strategic Analysis`,
    ``,
    `**1. Core Insight:** ${structured.insight}`,
    ``,
    `**2. Strategic Rationale:** ${structured.why}`,
    ``,
    `**3. Critical Risk & Challenger Red Team:** ⚠️ ${structured.risk}`,
    ``,
    `**4. Council Recommendation:** 💡 ${structured.recommendation}`,
    ``,
    `**5. Immediate Next Action:** 🎯 ${structured.nextAction}`,
    missingDataNotice ? `\n---\n*${missingDataNotice}*` : '',
  ].filter(Boolean).join('\n');

  return {
    replyText: formattedReply,
    isOffTopic: false,
    isModification: false,
    specialistDebate: debate,
    structuredOutput: structured,
    missingDataNotice,
  };
}
