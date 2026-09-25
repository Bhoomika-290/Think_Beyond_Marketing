export type MarketEvidenceProvenance =
  | 'USER_PROVIDED'
  | 'VERIFIED_SOURCE'
  | 'AI_INFERENCE'
  | 'ASSUMPTION'
  | 'NEEDS_VALIDATION';

export type SignalLevel = 'Strong' | 'Moderate' | 'Weak' | 'Needs Validation';

export type CompetitorEvidenceType =
  | 'VERIFIED_COMPETITOR'
  | 'OBSERVED_MARKET_PLAYER'
  | 'CATEGORY_ARCHETYPE'
  | 'COUNCIL_HYPOTHESIS';

export interface CompetitorItem {
  id: string;
  name: string;
  category: 'direct' | 'indirect' | 'alternative_workaround';
  positioningLabel: string;
  priceTier: 'budget' | 'mid_market' | 'premium' | 'enterprise';
  offeringSummary: string;
  strengths: string[];
  weaknesses: string[];
  differentiationFactor: string;
  provenance: MarketEvidenceProvenance;
  competitorType?: CompetitorEvidenceType;
  websiteUrl?: string;
  isUserAdded?: boolean;
  coordinates: { x: number; y: number }; // normalized -100 to +100
  // Detailed metadata for inspection panel
  targetCustomer?: string;
  businessPricingModel?: string;
  confidence?: 'High' | 'Medium' | 'Low';
  evidenceSource?: string;
}

export interface PositioningAxis {
  id: string;
  label: string;
  minLabel: string;
  maxLabel: string;
  categoryTag?: string;
}

export interface CustomerSegment {
  id: string;
  name: string;
  relativeRelevance: number; // 0-100 score derived from problem/audience alignment
  painIntensity: 'High' | 'Medium' | 'Moderate';
  coreNeed: string;
  buyingTrigger: string;
  potentialFit: 'High' | 'Medium' | 'Niche';
  adoptionBarriers: string[];
  provenance: MarketEvidenceProvenance;
  confidence?: 'High' | 'Medium' | 'Low';
}

export interface MarketOpportunityGap {
  id: string;
  title: string;
  unresolvedNeed: string;
  currentMarketShortcoming: string;
  opportunityAngle: string;
  demandLevel: 'High' | 'Medium' | 'Emerging';
  competitionLevel: 'Low' | 'Moderate' | 'Crowded';
  quadrant: 'prime_opportunity' | 'crowded' | 'niche' | 'low_priority';
  confidence: 'High' | 'Medium' | 'Low';
  provenance: MarketEvidenceProvenance;
  // Compact detail expansion
  underservedAspect: string;
  whyItMatters: string;
  supportingEvidence: string;
  competitorsAddressing: string[];
  unresolvedElement: string;
  whatToValidateNext: string;
}

export interface DifferentiationDimensionScore {
  dimension: string;
  dimensionKey: string;
  ventureScore: number; // 0-100
  incumbentAvgScore: number; // 0-100
  status:
    | 'Potential Differentiator'
    | 'Emerging Opportunity'
    | 'Evidence-Supported Gap'
    | 'Parity / Baseline'
    | 'Requires Validation';
}

export interface DifferentiationOpportunityItem {
  id: string;
  differentiationArea: string;
  currentCompetitiveSituation: string;
  connectedMarketGap: string;
  whyThisMatters: string;
  supportingEvidence: string;
  confidence: 'High' | 'Medium' | 'Low';
  validationRequirement: string;
  statusLabel:
    | 'Potential differentiator'
    | 'Emerging opportunity'
    | 'Evidence-supported gap'
    | 'Requires validation';
  provenance: MarketEvidenceProvenance;
}

export interface DifferentiatorEngineData {
  dimensions: DifferentiationDimensionScore[];
  opportunities: DifferentiationOpportunityItem[];
}

export interface MarketSizeFramework {
  status: 'needs_validation' | 'user_provided' | 'preliminary_modeled';
  tamDescription: string;
  tamValue?: string;
  samDescription: string;
  samValue?: string;
  somDescription: string;
  somValue?: string;
  validationInputsRequired: string[];
  provenance: MarketEvidenceProvenance;
}

export interface MarketTrendSignal {
  id: string;
  signal: string;
  direction: 'rising' | 'stable' | 'declining' | 'emerging' | 'uncertain';
  impact: 'high' | 'medium' | 'moderate';
  confidence: 'high' | 'medium' | 'low';
  evidenceSource: string;
  provenance: MarketEvidenceProvenance;
}

export interface MarketRiskItem {
  id: string;
  risk: string;
  category:
    | 'saturation'
    | 'switching_costs'
    | 'pricing_pressure'
    | 'regulatory'
    | 'substitute'
    | 'timing'
    | 'adoption';
  likelihood: 'L' | 'M' | 'H';
  impact: 'L' | 'M' | 'H';
  whyItMatters: string;
  whatToValidate: string;
  provenance: MarketEvidenceProvenance;
}

export interface MarketEvidenceItem {
  id: string;
  claim: string;
  provenance: MarketEvidenceProvenance;
  sourceOrBasis: string;
  confidence: 'High' | 'Medium' | 'Low';
  validationAction: string;
  category: 'competitor' | 'whitespace' | 'differentiation' | 'segment' | 'risk';
}

export type SpecialistRole =
  | 'venture_strategy'
  | 'market_intelligence'
  | 'finance'
  | 'brand'
  | 'creative_visual'
  | 'product_execution'
  | 'growth_marketing'
  | 'challenger'
  | 'evaluator';

export interface SpecialistPerspective {
  role: SpecialistRole;
  roleName: string;
  badge: string;
  keyPerspective: string;
  challengeOrCaveat: string;
}

export interface AICouncilSynthesis {
  primaryConsensus: string;
  criticalDivergence: string;
  founderActionRecommendation: string;
  specialistDebates: SpecialistPerspective[];
}

export interface MarketIntelligenceBrief {
  generatedAt: string;
  ventureName: string;
  productType: string;
  validatedSegments: string[];
  priorityAudienceSignals: string[];
  competitorLandscapeSummary: string;
  strategicWhitespaceOpportunities: string[];
  coreMarketRisks: string[];
  keyDifferentiationAnglesForBrand: string[];
  unresolvedMarketAssumptions: string[];
  evidenceQualitySummary: {
    verified: number;
    inference: number;
    assumptions: number;
    needsVal: number;
  };
  strategicBrandImplications: string[];
}

export interface MarketIntelligenceReport {
  id: string;
  generatedAt: string;
  signals: {
    marketSignal: SignalLevel;
    customerSignal: SignalLevel;
    competitiveSignal: SignalLevel;
    opportunitySignal: SignalLevel;
  };
  competitors: CompetitorItem[];
  availableAxes: PositioningAxis[];
  selectedAxes: {
    xAxis: PositioningAxis;
    yAxis: PositioningAxis;
  };
  opportunityGaps: MarketOpportunityGap[];
  differentiatorEngine: DifferentiatorEngineData;
  customerSegments: CustomerSegment[];
  marketSize: MarketSizeFramework;
  trends: MarketTrendSignal[];
  riskHeatmap: MarketRiskItem[];
  evidenceLog: MarketEvidenceItem[];
  aiCouncil: AICouncilSynthesis;
  brief: MarketIntelligenceBrief;
}

export interface MarketSpecialistMessage {
  id: string;
  sender: 'ai' | 'user' | 'council';
  text: string;
  timestamp: string;
  actionUsed?: string;
  specialistName?: string;
}
