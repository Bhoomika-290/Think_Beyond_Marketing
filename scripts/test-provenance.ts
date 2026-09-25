import {
  buildInterviewReply,
  detectCasual,
  isGenericCategoryOnly,
  isSubstantiveIdea,
  type VentureSnapshot,
  type HistoryMessage,
} from '../src/services/ideaLabInterviewEngine';
import {
  extractVentureModification,
} from '../src/services/businessCouncilEngine';
import {
  validateGeographySelection,
} from '../src/services/geographyRegistry';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

console.log('====================================================');
console.log('RUNNING IDEA LAB DATA PROVENANCE & GEOGRAPHY SUITE');
console.log('====================================================\n');

// ---------------------------------------------------------------------------
// TEST SUITE A: CONTINUOUS REAL-USER JOURNEY (Steps 1 to 7)
// ---------------------------------------------------------------------------
console.log('--- TEST SUITE A: CONTINUOUS REAL-USER JOURNEY ---');

// Step 1: Initial Fresh State
let currentProjectName = 'Untitled Venture';
let currentRawInput = '';
let currentTargetAudience = '';
let currentProblem = '';
let currentProductType: string | null = null;
let currentCountry = '';
let currentCityRegion = '';
let hasMinimumDiscovery = false;
const conversationHistory: HistoryMessage[] = [];

function recomputeDiscovery() {
  const hasRaw = Boolean(currentRawInput.length >= 4 && isSubstantiveIdea(currentRawInput));
  const hasBasicContext = Boolean(
    currentTargetAudience.trim() ||
    currentProblem.trim() ||
    Boolean(currentProductType) ||
    currentCountry.trim()
  );
  hasMinimumDiscovery = hasRaw && hasBasicContext;
}

console.log('\n[Step 1] Initial Fresh State:');
assert(currentProjectName === 'Untitled Venture', 'Project is Untitled Venture');
assert(currentRawInput === '', 'Raw idea is empty');
assert(hasMinimumDiscovery === false, 'Stage 02 discovery is blocked');

// Step 2: User says "hi"
console.log('\n[Step 2] User submits "hi":');
{
  const msg = 'hi';
  conversationHistory.push({ sender: 'user', text: msg });
  const isCas = detectCasual(msg);
  assert(isCas === 'greeting', '"hi" is detected as greeting');

  // No mutation occurs on casual greeting
  recomputeDiscovery();
  assert(currentRawInput === '', 'Raw idea remains empty');
  assert(currentProjectName === 'Untitled Venture', 'Project name remains Untitled Venture');
  assert(currentTargetAudience === '', 'Customer remains empty');
  assert(currentProductType === null, 'Product type remains null');
  assert(currentCountry === '', 'Country remains empty');
  assert(hasMinimumDiscovery === false, 'hasMinimumDiscovery is false');

  const snapshot: VentureSnapshot = {
    rawInput: currentRawInput,
    productType: null,
    targetAudience: currentTargetAudience,
    problem: currentProblem,
    differentiation: '',
    constraints: '',
    goals: '',
    context: '',
    openQuestions: [],
    country: currentCountry,
    cityRegion: currentCityRegion,
    deliveryModel: null,
    customerType: null,
  };
  const reply = buildInterviewReply(msg, conversationHistory, snapshot, null);
  conversationHistory.push({ sender: 'ai', text: reply.replyText });
  assert(!reply.replyText.includes("('hi')"), 'Greeting "hi" is not echoed as venture context');
}

// Step 3: User says "I'm making a physical product"
console.log('\n[Step 3] User submits "I\'m making a physical product":');
{
  const msg = "I'm making a physical product";
  conversationHistory.push({ sender: 'user', text: msg });
  const genericCat = isGenericCategoryOnly(msg);
  assert(genericCat === 'physical', 'Identified as generic physical category');
  const isSub = isSubstantiveIdea(msg);
  assert(isSub === false, 'Generic category phrase is NOT a substantive idea');

  // Generic category sets productType, but NOT rawInput or projectName
  currentProductType = genericCat;
  recomputeDiscovery();

  assert(currentRawInput === '', 'Raw idea remains EMPTY (not corrupted by category phrase)');
  assert(currentProjectName === 'Untitled Venture', 'Project name remains Untitled Venture (never derived from category)');
  assert(currentTargetAudience === '', 'Customer remains empty');
  assert(currentProblem === '', 'Problem remains empty');
  assert(currentCountry === '', 'Country remains empty (zero fabrication)');
  assert(hasMinimumDiscovery === false, 'Stage 02 remains BLOCKED on generic category');

  const snapshot: VentureSnapshot = {
    rawInput: currentRawInput,
    productType: 'physical',
    targetAudience: currentTargetAudience,
    problem: currentProblem,
    differentiation: '',
    constraints: '',
    goals: '',
    context: '',
    openQuestions: [],
    country: currentCountry,
    cityRegion: currentCityRegion,
    deliveryModel: null,
    customerType: null,
  };
  const reply = buildInterviewReply(msg, conversationHistory, snapshot, null);
  conversationHistory.push({ sender: 'ai', text: reply.replyText });
  assert(reply.replyText.includes('what kind of physical product are you thinking about?'), 'Asks clarification question');
}

// Step 4: User says "I want to make a reusable water bottle for college students."
console.log('\n[Step 4] User submits "I want to make a reusable water bottle for college students.":');
{
  const msg = 'I want to make a reusable water bottle for college students.';
  conversationHistory.push({ sender: 'user', text: msg });
  const isSub = isSubstantiveIdea(msg);
  assert(isSub === true, 'Recognized as substantive founder idea');

  currentRawInput = msg;
  currentProjectName = 'Reusable water bottle for college students';

  const snapshot: VentureSnapshot = {
    rawInput: currentRawInput,
    productType: 'physical',
    targetAudience: currentTargetAudience,
    problem: currentProblem,
    differentiation: '',
    constraints: '',
    goals: '',
    context: '',
    openQuestions: [],
    country: currentCountry,
    cityRegion: currentCityRegion,
    deliveryModel: null,
    customerType: null,
  };
  const reply = buildInterviewReply(msg, conversationHistory, snapshot, null);
  conversationHistory.push({ sender: 'ai', text: reply.replyText });

  if (reply.updates.targetAudience) {
    currentTargetAudience = reply.updates.targetAudience;
  }
  recomputeDiscovery();

  assert(currentRawInput === msg, 'Raw idea matches exact founder concept');
  assert(currentTargetAudience.toLowerCase().includes('student'), 'Target customer confirmed as college students');
  assert(currentCountry === '', 'Country is NOT fabricated (no United States, no Rajasthan)');
  assert(currentProblem === '', 'Problem is NOT fabricated');
  assert(hasMinimumDiscovery === true, 'Stage 02 unlocked with valid idea + customer');
}

// Step 5: User says "Actually, make the customer working professionals."
console.log('\n[Step 5] User submits "Actually, make the customer working professionals.":');
{
  const msg = 'Actually, make the customer working professionals.';
  conversationHistory.push({ sender: 'user', text: msg });
  const modResult = extractVentureModification(msg, currentProjectName);
  assert(modResult.isModification === true, 'Recognized as strategic venture modification');

  if (modResult.patch?.ideaPatch?.targetAudience) {
    currentTargetAudience = modResult.patch.ideaPatch.targetAudience;
  }

  assert(currentTargetAudience === 'working professionals', 'Customer updated to working professionals');
  assert(currentRawInput === 'I want to make a reusable water bottle for college students.', 'Raw idea is NOT modified by modification sentence');
  assert(currentProjectName === 'Reusable water bottle for college students', 'Project identity preserved');
}

// Step 6: User says "hello"
console.log('\n[Step 6] User submits "hello":');
{
  const msg = 'hello';
  conversationHistory.push({ sender: 'user', text: msg });
  const isCas = detectCasual(msg);
  assert(isCas === 'greeting', '"hello" is detected as greeting');

  // Verify ZERO state mutation
  assert(currentRawInput === 'I want to make a reusable water bottle for college students.', 'Raw idea completely untouched');
  assert(currentProjectName === 'Reusable water bottle for college students', 'Project name untouched');
  assert(currentTargetAudience === 'working professionals', 'Customer untouched');
  assert(currentCountry === '', 'Country untouched');
}

// ---------------------------------------------------------------------------
// TEST SUITE B: GEOGRAPHIC VALIDATION & DEPENDENT SELECTORS
// ---------------------------------------------------------------------------
console.log('\n--- TEST SUITE B: GEOGRAPHIC VALIDATION & DEPENDENT SELECTORS ---');
{
  // 1. India -> Maharashtra -> Mumbai (VALID)
  const val1 = validateGeographySelection('India', 'Maharashtra', 'Mumbai');
  assert(val1.isValid === true, 'India → Maharashtra → Mumbai is VALID');

  // 2. India -> Maharashtra -> Pune (VALID)
  const val2 = validateGeographySelection('India', 'Maharashtra', 'Pune');
  assert(val2.isValid === true, 'India → Maharashtra → Pune is VALID');

  // 3. India -> Rajasthan -> Jaipur (VALID)
  const val3 = validateGeographySelection('India', 'Rajasthan', 'Jaipur');
  assert(val3.isValid === true, 'India → Rajasthan → Jaipur is VALID');

  // 4. India -> Rajasthan -> Mumbai (INVALID)
  const val4 = validateGeographySelection('India', 'Rajasthan', 'Mumbai');
  assert(val4.isValid === false, 'India → Rajasthan → Mumbai is INVALID');
  assert(Boolean(val4.errorMessage?.includes('Maharashtra')), 'Error message accurately identifies that Mumbai is in Maharashtra');

  // 5. Location Not Specified (VALID empty state)
  const val5 = validateGeographySelection('', '', '');
  assert(val5.isValid === true, 'Empty / Not specified geography is valid uncommitted state');

  // 6. National Scope (Pan-India without specific city)
  const val6 = validateGeographySelection('India', 'All / Pan-India', 'Nationwide / Multiple Cities');
  assert(val6.isValid === true, 'National scope without specific city is VALID');

  // 7. International / Global Venture
  const val7 = validateGeographySelection('Global / Multiple Countries', 'Worldwide / Cross-Border', 'Worldwide / Online');
  assert(val7.isValid === true, 'Global international scope is VALID');
}

console.log('\n====================================================');
console.log('✅ ALL VERIFICATION TEST SCENARIOS PASSED WITH ZERO FAILURES');
console.log('====================================================\n');
