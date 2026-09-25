export interface BrandDNANode {
  id: string;
  label: string;
  value: string;
  whatItMeans: string;
  source: string;
  originatingStage: string;
  evidenceState: 'VERIFIED' | 'USER INPUT' | 'AI INFERENCE' | 'ASSUMPTION' | 'NEEDS VALIDATION';
  howItAffectsBrand: string;
  reasoning: string;
}

export interface DifferentiatorCandidate {
  id: string;
  competitorPattern: string;
  customerNeed: string;
  marketGap: string;
  opportunity: string;
  differentiator: string;
  brandPosition: string;
  evidenceState: 'VERIFIED' | 'INFERRED' | 'ASSUMPTION' | 'NEEDS VALIDATION';
  reasoning: string;
  isSelected: boolean;
}

export interface DifferentiatorChainSystem {
  activeDifferentiatorId: string;
  candidates: DifferentiatorCandidate[];
}

export interface PositioningStatement {
  forTarget: string;
  whoProblem: string;
  category: string;
  valuePromise: string;
  unlikeAlternative: string;
  becauseDifferentiator: string;
  fullStatement: string;
}

export interface BrandPersonalityTrait {
  id: string;
  leftLabel: string;
  rightLabel: string;
  userValue: number;
  aiValue: number;
  rationale: string;
  isUserModified: boolean;
}

export interface BrandVoiceAttribute {
  id: string;
  name: string;
  selected: boolean;
  description: string;
}

export interface BrandVoicePreview {
  headline: string;
  valueProposition: string;
  supportSignoff: string;
}

export interface BrandVoiceTransformation {
  genericMessage: string;
  brandVoiceMessage: string;
  contextNote: string;
}

export interface BrandVoiceSystem {
  attributes: BrandVoiceAttribute[];
  preview: BrandVoicePreview;
  doGuidelines: string[];
  dontGuidelines: string[];
  transformation: BrandVoiceTransformation;
}

export interface TaglineDirection {
  id: string;
  tagline: string;
  angle: string;
  rationale: string;
  isSelected: boolean;
}

export interface TaglineWorkspace {
  activeTagline: string;
  directions: TaglineDirection[];
}

export interface LogoConcept {
  id: string;
  name: string;
  style: string;
  svgMarkup: string;
  wordmark: string;
  rationale: string;
  personalityAlignment: string;
  usageSuitability?: string;
  status: 'candidate' | 'selected' | 'rejected';
  customization: {
    layout: 'combination' | 'stacked' | 'mark_only' | 'wordmark_only';
    complexity: number;
    contrastMode: 'dark' | 'neon' | 'monochrome';
    geometryRadius: number;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    symbolScale: number;
    fontTreatment: string;
  };
}

export interface LogoGeneratorSystem {
  selectedConceptId: string;
  concepts: LogoConcept[];
}

export interface ColorSwatch {
  id: string;
  role: 'primary' | 'secondary' | 'accent' | 'background' | 'surface' | 'text' | 'success' | 'warning';
  name: string;
  hex: string;
  rgb: string;
  psychology: string;
  contrastScore?: string;
}

export interface ColorPaletteSystem {
  paletteRationale: string;
  swatches: ColorSwatch[];
}

export interface TypographyPair {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  uiFont: string;
  sampleHeading: string;
  sampleBody: string;
}

export interface TypographySystem {
  selectedPairId: string;
  pairs: TypographyPair[];
}

export interface VisualBrandBoard {
  selectedMark: LogoConcept;
  colorPalette: ColorSwatch[];
  typography: TypographyPair;
  personalityProfile: string[];
  voiceCharacteristics: string[];
  tagline: string;
  positioningStatement: string;
}

export interface CustomerTouchpoint {
  stage: 'DISCOVER' | 'CONSIDER' | 'SIGN UP / BUY' | 'ONBOARD' | 'USE' | 'RETAIN' | 'ADVOCATE' | string;
  customerExpectation: string;
  touchpoint: string;
  desiredEmotion: string;
  brandBehavior: string;
  opportunity: string;
}

export interface CustomerExperienceSystem {
  touchpoints: CustomerTouchpoint[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  stageName: 'FOUNDATION' | 'POSITIONING' | 'IDENTITY' | 'TOUCHPOINTS' | 'LAUNCH' | 'OPTIMIZATION' | string;
  status: 'COMPLETE' | 'READY' | 'IN PROGRESS' | 'NEEDS VALIDATION' | 'BLOCKED';
  objective: string;
  dependency: string;
  nextAction: string;
}

export interface RoadmapTimelineSystem {
  milestones: RoadmapMilestone[];
}

export interface BrandDecisionItem {
  id: string;
  statement: string;
  source: string;
  impact?: string;
}

export interface BrandDecisionBoardSystem {
  decided: BrandDecisionItem[];
  needsReview: BrandDecisionItem[];
  openQuestions: BrandDecisionItem[];
  validationRequired: BrandDecisionItem[];
}

export interface Stage05HandoffDossier {
  isReady: boolean;
  statusLabel: string;
  decisionsTransferred: {
    positioning: string;
    differentiator: string;
    brandPersonality: string;
    logoDirection: string;
    colors: string;
    typography: string;
    voice: string;
    customerExperienceDirection: string;
    openDecisions: string;
  };
}

export interface IdentityAuditStatus {
  positioningStatus: 'VERIFIED' | 'USER INPUT' | 'AI INFERENCE' | 'NEEDS VALIDATION';
  identityStatus: 'VERIFIED' | 'NEEDS INPUT';
  differentiationStatus: 'VERIFIED' | 'AI INFERENCE';
  readinessStatus: 'READY' | 'IN PROGRESS';
}

export interface CompetitorRoadmapStage {
  stageName: 'FOUNDING' | 'EARLY PRODUCT' | 'POSITIONING' | 'BRAND' | 'MARKET ENTRY' | 'EXPANSION' | 'GROWTH';
  yearOrPhase: string;
  focus: string;
  milestone: string;
  strategicPivot?: string;
}

export interface CompetitorTakeaways {
  positioningLesson: string;
  sequencingLesson: string;
  productToBrandTransition: string;
  customerAcquisitionLesson: string;
  distributionLesson: string;
  expansionLesson: string;
  brandIdentityLesson: string;
  whatNotToCopy: string;
  sequencingLessons?: string;
  positioningDecisions?: string;
  distributionStrategy?: string;
  mistakesAndRisks?: string;
}

export interface CompetitorPatternComparison {
  competitorName: string;
  category: string;
  positioningWedge: string;
  positioningScore: number; // 1 to 3
  brandShiftMoment: string;
  brandShiftScore: number;
  initialDistribution: string;
  distributionScore: number;
  expansionVector: string;
  expansionScore: number;
  founderSynthesis: string;
}

export interface CompetitorRoadmapItem {
  id: string;
  competitorName: string;
  category: string;
  evolutionTrajectory: string;
  validationStatus: 'VERIFIED' | 'NEEDS VALIDATION';
  sourceEvidence: string;
  stages: CompetitorRoadmapStage[];
  takeaways: CompetitorTakeaways;
}

export interface FounderLearningResource {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'case_study' | 'framework' | 'playbook';
  source: string;
  durationOrReadTime: string;
  takeaway: string;
  relevanceTag: string;
  urlPlaceholder?: string;
}

export interface BrandTransformationMilestone {
  id: string;
  stepNumber: number;
  stageKey: 'IDEA' | 'VALIDATION' | 'POSITIONING' | 'DIFFERENTIATION' | 'BRAND_DNA' | 'IDENTITY' | 'CUSTOMER_EXP' | 'LAUNCH' | 'GROWTH';
  title: string;
  subtitle: string;
  objective: string;
  founderAction: string;
  keyMilestone: string;
  expectedOutcome: string;
  dependency: string;
  decisionGate: string;
  status: 'READY' | 'IN PROGRESS' | 'PLANNED';
  groundedDetail: string;
  whatItIs?: string;
  whyItMatters?: string;
  concreteOutput?: string;
  recommendedNextStep?: string;
}

export interface BrandStrategicDecisionsData {
  recommendedPositioningDirection: string;
  differentiationTerritory: string;
  strategicPriorities: string[];
  brandRisks: {
    risk: string;
    severity: 'High' | 'Medium' | 'Low';
    impact: string;
    mitigation: string;
  }[];
  sequencingStrategy: string;
}

export interface BrandRoadmapReport {
  id: string;
  ventureName: string;
  category: string;
  generatedAt: string;
  identityAudit: IdentityAuditStatus;
  brandDnaNodes: BrandDNANode[];
  differentiatorChain: DifferentiatorChainSystem;
  positioningStatement: PositioningStatement;
  personalityTraits: BrandPersonalityTrait[];
  brandVoice: BrandVoiceSystem;
  taglineWorkspace: TaglineWorkspace;
  logoGenerator: LogoGeneratorSystem;
  colorSystem: ColorPaletteSystem;
  typographySystem: TypographySystem;
  brandBoard: VisualBrandBoard;
  customerExperience: CustomerExperienceSystem;
  roadmapTimeline: RoadmapTimelineSystem;
  decisionBoard: BrandDecisionBoardSystem;
  stage05Handoff: Stage05HandoffDossier;
  transformationRoadmap: BrandTransformationMilestone[];
  competitorRoadmaps: CompetitorRoadmapItem[];
  competitorComparisons: CompetitorPatternComparison[];
  learningResources: FounderLearningResource[];
  strategicDecisions: BrandStrategicDecisionsData;
}

