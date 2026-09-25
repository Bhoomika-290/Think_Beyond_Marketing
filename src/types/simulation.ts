export type SimulationModality = 'physical' | 'software' | 'hybrid';

// ============================================================================
// SIMULATION APPEARANCE CUSTOMIZATION
// ============================================================================
export type SimulationTheme = 'dark' | 'light' | 'neutral' | 'brand';
export type SimulationStyle = 'minimal' | 'editorial' | 'technical' | 'premium' | 'industrial' | 'playful';
export type SimulationAccent = 'blue' | 'green' | 'orange' | 'purple' | 'custom';
export type SimulationSurface = 'flat' | 'soft' | 'glass' | 'material';

export interface SimulationAppearance {
  theme: SimulationTheme;
  style: SimulationStyle;
  accent: SimulationAccent;
  surface: SimulationSurface;
}

// ============================================================================
export interface ProductVisualProfile {
  category: PhysicalCategoryType;
  productName: string;
  productForm: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  materials: string[];
  components: string[];
  functionality: string;
  environment: string;
  customerContext: string;
  packagingStyle: string;
  visualDescription: string;
}

export interface UserModificationState {
  materialOverride?: 'matte_black' | 'brushed_titanium' | 'carbon_fiber' | 'ceramic' | 'brushed_steel' | 'wool_weave' | 'leather' | 'wood' | 'glass';
  primaryColorOverride?: string;
  accentColorOverride?: string;
  environmentOverride?: 'light_studio' | 'dark_studio' | 'workshop' | 'desk' | 'outdoor' | 'cafe' | 'construction' | 'retail';
  componentVisibility?: {
    pcb?: boolean;
    battery?: boolean;
    led?: boolean;
    dock?: boolean;
    valve?: boolean;
    beans?: boolean;
    screen?: boolean;
    buttons?: boolean;
    collar?: boolean;
  };
  scaleOverride?: number;
  explodedSeparation?: number;
  activeFeatureMode?: 'default' | 'docking' | 'usbc' | 'telemetry' | 'haptic' | 'water_barrier' | 'steam_vent' | 'power_on';
  packagingOverride?: 'kraft_box' | 'rigid_luxury' | 'aluminum_case' | 'pouch' | 'wooden_box';
  stageSpecificChanges?: Record<number, Partial<UserModificationState>>;
  lastPromptApplied?: string;
  targetStageIndex?: number;
}

export interface SoftwareModificationState {
  chartTypeOverride?: 'attribution' | 'funnel' | 'timeseries' | 'breakdown';
  layoutDensity?: 'default' | 'minimal' | 'dense' | 'expanded';
  themeOverride?: 'light' | 'dark';
  showComparisonTable?: boolean;
  showCustomerProfilePanel?: boolean;
  kanbanViewActive?: boolean;
  timelineViewActive?: boolean;
  aiAssistantActive?: boolean;
  hiddenMetricLabels?: string[];
  anomalyFilterActive?: boolean;
  highlightedRecordId?: string;
  customAutomationRule?: string;
  lastPromptApplied?: string;
}

export type PhysicalSceneOverrides = UserModificationState;

export type PhysicalCategoryType = 'hardware' | 'medical' | 'apparel' | 'footwear' | 'coffee' | 'skincare' | 'general_goods';
export type Physical3DEnvironment = 'studio' | 'field' | 'macro';

export type Physical3DSequenceStepId =
  | 'package_closed'
  | 'package_open'
  | 'product_reveal'
  | 'product_rotate'
  | 'component_active'
  | 'real_world_use'
  | 'result_experience';

export interface PhysicalSimulationHotspot {
  id: string;
  position: [number, number, number]; // 3D coordinates [x, y, z]
  screenPercent: { x: number; y: number }; // 2D projection fallback
  label: string;
  category: 'material' | 'component' | 'sensor' | 'button' | 'packaging' | 'finish';
  detail: string;
  metric?: string;
}

export interface PhysicalProductMockup {
  productName: string;
  categoryType: PhysicalCategoryType;
  formFactor: string;
  materials: string[];
  packagingStyle: string;
  signatureFeature: string;
  primaryColor: string;
  accentColor: string;
  unboxingSequence: string[];
  dimensionsOrGrade: string;
  hotspots: PhysicalSimulationHotspot[];
  sensoryProfile: {
    tactileFeel: string;
    visualAesthetic: string;
    acousticOrScentNote: string;
  };
}

export interface Physical3DSequenceStep {
  id: Physical3DSequenceStepId;
  stepNumber: number;
  stageName: string;
  title: string;
  shortLabel: string;
  description: string;
  actionPrompt: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  animationPhase: number;
  delightMoment: string;
}

export interface PhysicalCustomerPersona {
  personaTitle: string;
  context: string;
  keyPainRelieved: string;
  initialReaction: string;
  usageSetting: string;
}

export interface PhysicalExperienceStoryboard {
  productMockup: PhysicalProductMockup;
  visualProfile: ProductVisualProfile;
  customerPersona: PhysicalCustomerPersona;
  stages: Physical3DSequenceStep[];
  outcomeSummary: {
    emotionalBenefit: string;
    functionalBenefit: string;
    retentionTrigger: string;
  };
}

// ============================================================================
// SOFTWARE PROTOTYPE TYPES
// ============================================================================
export type SoftwareVentureArchetype =
  | 'tutoring_edtech'
  | 'food_waste_prediction'
  | 'restaurant_hospitality'
  | 'meal_delivery_service'
  | 'local_home_repair'
  | 'marketplace_platform'
  | 'marketing_attribution'
  | 'fintech'
  | 'healthcare'
  | 'ecommerce'
  | 'developer_tool'
  | 'ai_workspace'
  | 'productivity'
  | 'general_saas';

export type SoftwarePrototypeStageId =
  | 'idle'
  | 'input'
  | 'processing'
  | 'result'
  | 'action_triggered'
  | 'completed';

export interface SimulatedDataSource {
  id: string;
  name: string;
  type: string;
  recordCount: number;
  isConnected: boolean;
  iconName: string;
  latencyMs: number;
}

export interface SimulatedRecordItem {
  id: string;
  title: string;
  category: string;
  metricA: string;
  metricB: string;
  status: 'optimal' | 'anomaly' | 'warning' | 'synced';
  flagReason?: string;
  actionRecommendation?: string;
}

export interface SimulatedInsightAction {
  id: string;
  headline: string;
  quantitativeImpact: string;
  recommendedAction: string;
  actionButtonLabel: string;
  successOutcome: string;
}

export interface SoftwareInteractivePrototype {
  appName: string;
  archetype: SoftwareVentureArchetype;
  categoryTag: string;
  primaryFeatureName: string;
  workflowGoal: string;
  activeScreenTitle: string;
  dataSources: SimulatedDataSource[];
  sampleRecords: SimulatedRecordItem[];
  insightAction: SimulatedInsightAction;
  summaryMetrics: {
    label: string;
    value: string;
    badge: string;
    trend: 'up' | 'down' | 'neutral';
  }[];
  outcomeSummary: {
    timeSavedOrBenefit: string;
    coreValueDelivered: string;
    expansionTrigger: string;
  };
}

// ============================================================================
// STAGE 07 REPORT ROOT
// ============================================================================
export interface SimulationReport {
  id: string;
  generatedAt: string;
  ventureName: string;
  modality: SimulationModality;
  physicalStoryboard: PhysicalExperienceStoryboard;
  softwareWalkthrough: SoftwareInteractivePrototype;
  simulationAssumptions: string[];
}
