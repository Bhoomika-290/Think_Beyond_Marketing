export type BuildProvenanceType =
  | 'USER_PROVIDED'
  | 'VERIFIED_SOURCE'
  | 'AI_INFERENCE'
  | 'ASSUMPTION'
  | 'NEEDS_VALIDATION';

export type ProvenanceType = BuildProvenanceType;

// 1. Build Readiness Overview
export interface BuildReadinessMetric {
  id: string;
  name: string;
  score: number; // 0 to 100
  status: 'CLARIFIED' | 'NEEDS_INPUT' | 'NEEDS_VALIDATION';
  provenance: BuildProvenanceType;
  originatingStage: string;
  summary: string;
  keyUncertainty?: string;
}

export interface BuildReadinessOverview {
  overallScore: number;
  buildStatus: 'Discovery' | 'Architecture Ready' | 'MVP Definition' | 'Build Ready';
  statusExplanation: string;
  metrics: BuildReadinessMetric[];
}

// 2. Product Blueprint
export interface BlueprintNode {
  id: string;
  label: string;
  category: 'problem' | 'user' | 'job' | 'solution' | 'experience' | 'outcome';
  title: string;
  description: string;
  provenance: ProvenanceType;
  originatingStage: string;
  buildImplication: string;
  evidenceQuote?: string;
}

export interface BlueprintBranchItem {
  id: string;
  name: string;
  description: string;
  detail: string;
}

export interface ProductModalityBlueprint {
  modality: 'software' | 'hardware' | 'hybrid';
  branchA: {
    title: string;
    items: BlueprintBranchItem[];
  };
  branchB: {
    title: string;
    items: BlueprintBranchItem[];
  };
  branchC: {
    title: string;
    items: BlueprintBranchItem[];
  };
  hybridPipeline?: {
    stage: 'PHYSICAL PRODUCT' | 'DEVICE' | 'DATA' | 'SYSTEM' | 'APPLICATION' | 'USER';
    description: string;
  }[];
}

export interface ProductBlueprint {
  nodes: BlueprintNode[];
  summary: string;
  modalityBlueprint?: ProductModalityBlueprint;
}

export interface FeatureBehaviorFlowItem {
  id: string;
  featureName: string;
  userProblem: string;
  userAction: string;
  systemBehaviour: string;
  expectedResult: string;
  priority: 'must' | 'should' | 'could';
  productCategory: string;
}

// 3. MVP Scope Engine
export type MVPFeaturePriority = 'must' | 'should' | 'could' | 'not_now';

export interface MVPFeatureItem {
  id: string;
  name: string;
  category: string;
  userProblem: string;
  customerValue: number; // 1 to 10
  technicalComplexity: 'Low' | 'Medium' | 'High';
  complexityScore: number; // 1 to 10
  priority: MVPFeaturePriority;
  reason: string;
  dependencies: string[];
  originatingStage: string;
  validationStatus: 'USER_PROVIDED' | 'VERIFIED' | 'ASSUMPTION' | 'NEEDS_VALIDATION';
  provenance: ProvenanceType;
}

export interface MVPScopeSystem {
  features: MVPFeatureItem[];
  matrixSummary: {
    mustCount: number;
    shouldCount: number;
    couldCount: number;
    notNowCount: number;
    mvpEffortWeeks: number;
  };
}

// 4. Product Feature Architecture Tree
export interface FeatureNode {
  id: string;
  name: string;
  category: string;
  purpose: string;
  targetUser: string;
  dependencies: string[];
  priority: MVPFeaturePriority;
  dataRequired: string[];
  apiRequired: string[];
  technicalComplexity: 'Low' | 'Medium' | 'High';
  mvpStatus: boolean;
}

export interface FeatureCategoryGroup {
  id: string;
  name: string;
  description: string;
  features: FeatureNode[];
}

export interface FeatureArchitectureTree {
  categories: FeatureCategoryGroup[];
  totalFeatureCount: number;
}

// 5. System Architecture Visualizer
export interface ArchitectureComponent {
  name: string;
  role: string;
  tech: string;
  justification: string;
  alternatives: string[];
  complexity: 'Low' | 'Medium' | 'High';
  provenance: ProvenanceType;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  tierNumber: number;
  role: string;
  components: ArchitectureComponent[];
}

export interface SystemArchitectureSystem {
  pattern: string; // e.g. "Event-Driven Modular Monolith", "Jamstack Headless Commerce"
  layers: ArchitectureLayer[];
  description: string;
  primaryRationale: string;
}

// 6. Tech Stack Builder
export type TechCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'auth'
  | 'ai'
  | 'storage'
  | 'search'
  | 'payments'
  | 'analytics'
  | 'hosting'
  | 'security';

export interface TechStackItem {
  id: string;
  category: TechCategory;
  categoryLabel: string;
  currentTech: string;
  options: string[];
  fitRationale: string;
  complexity: 'Low' | 'Medium' | 'High';
  confidence: 'High' | 'Medium' | 'Low';
  provenance: ProvenanceType;
  costTier: string;
  lockInRisk: 'Low' | 'Medium' | 'High';
}

export interface TechStackSystem {
  items: TechStackItem[];
  estimatedMonthlyCloudCost: string;
}

// 7. Data & Entity Model
export interface EntityField {
  name: string;
  type: string;
  isKey?: boolean;
  nullable?: boolean;
  description: string;
}

export interface EntityRelationship {
  targetEntity: string;
  type: '1:1' | '1:N' | 'N:M';
  description: string;
}

export interface DataEntity {
  id: string;
  name: string;
  purpose: string;
  fields: EntityField[];
  relationships: EntityRelationship[];
  featuresUsing: string[];
  provenance: ProvenanceType;
}

export interface DataModelSystem {
  entities: DataEntity[];
  storageParadigm: string; // e.g. "Relational SQL (PostgreSQL) with Redis Cache"
}

// 8. User Flow / Product Journey
export interface ProductJourneyStep {
  id: string;
  stepNumber: number;
  stageName: string;
  userGoal: string;
  screenRequired: string;
  userAction: string;
  backendRequirement: string;
  dataRequirement: string;
  successTelemetry: string;
  touchpointLink: string;
}

export interface ProductJourneySystem {
  steps: ProductJourneyStep[];
  criticalDropoffRisk: string;
}

// 9. Screen / Page Architecture
export interface ScreenItem {
  id: string;
  name: string;
  routePath: string;
  purpose: string;
  targetUser: string;
  requiredComponents: string[];
  dataDependencies: string[];
  apiEndpoints: string[];
  isMVP: boolean;
  priority: 'must' | 'should' | 'could';
}

export interface ScreenArchitectureSystem {
  screens: ScreenItem[];
  sitemapSummary: string;
}

// 10. API & Integration Map
export interface APIIntegrationItem {
  id: string;
  serviceName: string;
  category: string;
  provider: string;
  purpose: string;
  dataExchanged: string;
  riskAndLockIn: string;
  fallbackStrategy: string;
  costModel: string;
  status: 'Active Candidate' | 'Optional' | 'Alternative Available' | 'No External Dependency';
  provenance: ProvenanceType;
}

export interface APIIntegrationMap {
  integrations: APIIntegrationItem[];
  totalIntegrationsCount: number;
}

// 11. AI / Intelligence Architecture
export interface AIArchitectureNode {
  id: string;
  stepNumber: number;
  role: string;
  component: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  fallback: string;
}

export interface AIArchitectureSystem {
  isAIPrimary: boolean;
  roleSummary: string;
  justification: string;
  pipeline: AIArchitectureNode[];
  costSensitivityNotice: string;
}

// 12. Build Specialist Chatbot
export interface BuildSpecialistMessage {
  id: string;
  sender: 'specialist' | 'user';
  text: string;
  timestamp: string;
  actionLinks?: string[];
}

// 13. Multi-Agent AI Council
export type BuildCouncilRole =
  | 'product_strategist'
  | 'technical_architect'
  | 'business_specialist'
  | 'ux_specialist'
  | 'security_specialist'
  | 'growth_specialist';

export interface BuildCouncilPerspective {
  role: BuildCouncilRole;
  roleName: string;
  avatarIcon: string;
  stance: string;
  keyRecommendation: string;
  flaggedRisk: string;
}

export interface AICouncilBuildSynthesis {
  topic: string;
  perspectives: BuildCouncilPerspective[];
  unanimousAgreement: string;
  keyDivergence: string;
  criticalRisks: string[];
  recommendedAction: string;
}

// 14. Challenger / Evaluator (Failure Mode Analysis)
export interface ArchitectureStressTest {
  id: string;
  challengeQuestion: string;
  failureMode: string;
  affectedAssumption: string;
  severity: 'Critical' | 'High' | 'Medium';
  upstreamRiskLink: string;
  mitigation: string;
  validationExperiment: string;
}

export interface ChallengerEvaluatorSystem {
  tests: ArchitectureStressTest[];
}

// 15. Build Dependency Graph
export interface DependencyGraphNode {
  id: string;
  name: string;
  layer: string;
  dependencies: string[];
  isBlocker: boolean;
  status: 'ready' | 'blocked' | 'in_progress';
  estimatedDays: number;
}

export interface BuildDependencyGraphSystem {
  nodes: DependencyGraphNode[];
  criticalPath: string[];
  totalEstimatedBuildDays: number;
}

// 16. Build Implementation Roadmap
export interface BuildTaskItem {
  id: string;
  phaseId: string;
  title: string;
  rationale: string;
  dependencies: string[];
  estimatedComplexity: 'Low' | 'Medium' | 'High';
  priority: 'High' | 'Medium' | 'Low';
  roleOwner: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  relatedFeature: string;
  isCustom?: boolean;
}

export interface BuildRoadmapPhase {
  id: string;
  phaseNumber: number;
  name: string;
  objective: string;
  deliverables: string[];
  tasks: BuildTaskItem[];
}

export interface BuildRoadmapSystem {
  phases: BuildRoadmapPhase[];
  totalTasksCount: number;
  completedTasksCount: number;
}

// 17. Build Risk Matrix
export type BuildRiskDimension =
  | 'Technical'
  | 'Product'
  | 'Data'
  | 'Security'
  | 'Operational'
  | 'Financial'
  | 'Dependency'
  | 'Scalability';

export interface BuildRiskItem {
  id: string;
  dimension: BuildRiskDimension;
  risk: string;
  impact: number; // 1-5
  likelihood: number; // 1-5
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  mitigation: string;
  validationTest: string;
  upstreamStage2Link?: string;
}

export interface BuildRiskMatrixSystem {
  risks: BuildRiskItem[];
}

// 18. Build Decision Board
export type BuildDecisionQuadrant =
  | 'DECIDED'
  | 'NEEDS_REVIEW'
  | 'OPEN_QUESTION'
  | 'VALIDATION_REQUIRED';

export interface BuildDecisionItem {
  id: string;
  title: string;
  quadrant: BuildDecisionQuadrant;
  connectedFeature: string;
  assumption: string;
  evidence: string;
  provenance: ProvenanceType;
  resolvedAction?: string;
}

export interface BuildDecisionBoardSystem {
  decisions: BuildDecisionItem[];
}

// 19. Brand -> Product Consistency
export interface BrandProductConsistencyToken {
  dimension: string;
  brandToken: string;
  productTranslation: string;
  uiImplementation: string;
  messagingExample: string;
}

export interface BrandProductConsistencySystem {
  brandName: string;
  logoInitials: string;
  primaryColor: string;
  accentColor: string;
  typography: string;
  voiceTone: string;
  differentiator: string;
  tokens: BrandProductConsistencyToken[];
}

// 20. Stage 06 Execution Handoff
export interface Stage06HandoffCheck {
  id: string;
  label: string;
  passed: boolean;
  details: string;
  category: string;
}

export interface Stage06HandoffDossier {
  readinessScore: number;
  isReady: boolean;
  checklist: Stage06HandoffCheck[];
  summary: string;
  blockingItems: string[];
}

// MASTER REPORT INTERFACE
export interface BuildArchitectureReport {
  id: string;
  generatedAt: string;
  ventureName: string;
  productType: string;
  readinessOverview: BuildReadinessOverview;
  blueprint: ProductBlueprint;
  mvpScope: MVPScopeSystem;
  featureTree: FeatureArchitectureTree;
  featureBehaviorFlows: FeatureBehaviorFlowItem[];
  systemArchitecture: SystemArchitectureSystem;
  techStack: TechStackSystem;
  dataModel: DataModelSystem;
  userJourney: ProductJourneySystem;
  screenArchitecture: ScreenArchitectureSystem;
  apiIntegrations: APIIntegrationMap;
  aiArchitecture: AIArchitectureSystem;
  councilDiscussion: AICouncilBuildSynthesis;
  challengerTests: ChallengerEvaluatorSystem;
  dependencyGraph: BuildDependencyGraphSystem;
  roadmap: BuildRoadmapSystem;
  riskMatrix: BuildRiskMatrixSystem;
  decisionBoard: BuildDecisionBoardSystem;
  brandConsistency: BrandProductConsistencySystem;
  handoff: Stage06HandoffDossier;
}
