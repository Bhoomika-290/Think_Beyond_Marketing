export type FeasibilityDimensionId =
  | 'market'
  | 'customer'
  | 'business-model'
  | 'operational'
  | 'technical'
  | 'financial'
  | 'location'
  | 'competitive'
  | 'execution';

export type AssessmentRating = 'strong' | 'moderate' | 'weak' | 'needs-validation';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type EvidenceType = 'verified' | 'ai-inference' | 'assumption' | 'needs-validation';
export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  label: string;
  content: string;
}

export interface FeasibilityDimensionResult {
  id: FeasibilityDimensionId;
  name: string;
  rating: AssessmentRating;
  confidence: ConfidenceLevel;
  headline: string;
  reasoning: string;
  evidence: EvidenceItem[];
  assumptions: string[];
  missingInformation: string[];
  riskLevel: RiskSeverity;
}

export interface FeasibilityRisk {
  id: string;
  dimension: FeasibilityDimensionId;
  title: string;
  category: string;
  severity: RiskSeverity;
  whyItMatters: string;
  validationTest: string;
  mitigation: string;
}

export interface FeasibilityAssumption {
  id: string;
  dimension: FeasibilityDimensionId;
  statement: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
  validationMethod: string;
}

export interface FeasibilityOpenQuestion {
  id: string;
  dimension: FeasibilityDimensionId;
  question: string;
  urgency: 'immediate' | 'pre-launch' | 'growth';
  context: string;
}

export interface FeasibilityValidationTask {
  id: string;
  dimension: FeasibilityDimensionId;
  title: string;
  action: string;
  expectedOutput: string;
  completed: boolean;
  isCustom?: boolean;
}

export interface MarketIntelligenceHandoff {
  timestamp: string;
  upstreamVentureName: string;
  upstreamProductType: string;
  competitorResearchNeeds: string[];
  audienceValidationNeeds: string[];
  pricingBenchmarksToStudy: string[];
  geographicRegulatoryQueries: string[];
  criticalAssumptionsToTest: string[];
}

export interface FeasibilityReport {
  id: string;
  generatedAt: string;
  overallStatus: string;
  overallScoreExplanation: string;
  dimensions: Record<FeasibilityDimensionId, FeasibilityDimensionResult>;
  risks: FeasibilityRisk[];
  assumptions: FeasibilityAssumption[];
  openQuestions: FeasibilityOpenQuestion[];
  validationTasks: FeasibilityValidationTask[];
  promisingAspects: string[];
  criticalUncertainties: string[];
  potentialBlockers: string[];
  handoffToMarketIntelligence: MarketIntelligenceHandoff;
}
