export type ReadinessDimensionId = 'brand' | 'product' | 'market' | 'experience' | 'execution' | 'growth';

export interface ReadinessCheckItem {
  id: string;
  dimension: ReadinessDimensionId;
  label: string;
  isComplete: boolean;
  stageSource: string;
  detail: string;
  actionPath?: string;
}

export interface LaunchReadinessDimension {
  id: ReadinessDimensionId;
  name: string;
  completedCount: number;
  totalCount: number;
  status: 'ready' | 'in_progress' | 'needs_input';
  highlight: string;
  items: ReadinessCheckItem[];
}

export interface LaunchReadinessSystem {
  overallPercentage: number;
  completedChecklistCount: number;
  totalChecklistCount: number;
  verdict: string;
  dimensions: LaunchReadinessDimension[];
}

export interface ProjectSynthesisNode {
  id: string;
  stageName: string;
  stageNumber: string;
  title: string;
  keyOutputs: string[];
  status: 'complete' | 'partial' | 'pending';
}

export interface ProjectSynthesisData {
  isActive: boolean;
  ventureIdentity: {
    name: string;
    category: string;
    productType: string;
    location: string;
    targetAudience: string;
  };
  synthesisNodes: ProjectSynthesisNode[];
  criticalBlockers: {
    id: string;
    severity: 'high' | 'medium' | 'low';
    title: string;
    detail: string;
    resolvingStage: string;
  }[];
  strategicOpportunities: {
    id: string;
    title: string;
    rationale: string;
  }[];
  launchDependencies: {
    fromStage: string;
    toStage: string;
    description: string;
    isSatisfied: boolean;
  }[];
}

// =============================================================================
// PREMIUM GROWTH ENGINE TYPES
// =============================================================================

// 1. GENERATE MODULE TYPES
export type GeneratedContentType = 'reel' | 'carousel' | 'banner' | 'campaign';

export type ReelMotionType = 'push_in' | 'pan_right' | 'orbit_zoom' | 'kinetic_glitch' | 'split_reveal' | 'macro_focus';
export type ReelVisualSceneType = 'hero_hook' | 'problem_friction' | 'product_demo' | 'feature_zoom' | 'metric_impact' | 'brand_cta';

export interface StoryboardFrame {
  frameNumber: number;
  timestamp: string;
  startTimeSec: number;
  endTimeSec: number;
  motionType: ReelMotionType;
  visualSceneType: ReelVisualSceneType;
  kineticHeadline: string;
  visualDirection: string;
  onScreenText: string;
  voiceoverOrAudio: string;
  featureHighlight?: string;
  metricBadge?: string;
}

export interface VisualReelConcept {
  id: string;
  title: string;
  durationSeconds: number;
  hookHeadline: string;
  targetAudience: string;
  audioTrackVibe: string;
  ctaText: string;
  productType: string;
  brandColorPrimary: string;
  brandColorAccent: string;
  frames: StoryboardFrame[];
}

export interface CarouselSlide {
  slideNumber: number;
  visualConcept: string;
  headline: string;
  bodyCopy: string;
  badgeOrNumber?: string;
  ctaButton?: string;
}

export interface VisualCarouselConcept {
  id: string;
  title: string;
  theme: string;
  targetPersona: string;
  slides: CarouselSlide[];
}

export interface BannerAdConcept {
  id: string;
  formatName: string;
  dimensions: string;
  headline: string;
  subheadline: string;
  badgeText: string;
  ctaText: string;
  visualComposition: string;
  primaryColor: string;
  accentColor: string;
}

export interface FullCampaignConcept {
  id: string;
  campaignTitle: string;
  objective: string;
  targetAudience: string;
  coreAngle: string;
  primaryChannel: string;
  funnelStage: 'Top of Funnel (Awareness)' | 'Middle of Funnel (Consideration)' | 'Bottom of Funnel (Conversion)';
  primaryCta: string;
  keyDifferentiator: string;
}

// 2. META ADVERTISING TYPES
export interface MetaAdVariant {
  id: string;
  headline: string;
  primaryText: string;
  descriptionText: string;
  ctaButton: 'Learn More' | 'Get Offer' | 'Sign Up' | 'Shop Now' | 'Book Demo' | 'Contact Us';
  visualAssetDescription: string;
  placementType: 'feed' | 'story_reel';
  hookAngle: string;
}

export interface MetaCampaignWorkspace {
  campaignName: string;
  objective: string;
  targetAudienceName: string;
  demographicSummary: string;
  suggestedInterests: string[];
  activeAdVariantIndex: number;
  variants: MetaAdVariant[];
}

// 3. SEO WORKSPACE TYPES
export interface SeoKeywordCluster {
  id: string;
  clusterTheme: string;
  searchIntent: 'Commercial' | 'Informational' | 'Transactional' | 'Navigational';
  primaryKeyword: string;
  secondaryKeywords: string[];
  suggestedPageTitle: string;
  metaDescription: string;
  contentAngle: string;
  targetSlug: string;
  contentPriority: 'P1 - High Intent' | 'P2 - Supporting Pillar' | 'P3 - Long-tail Authority';
}

export interface TechnicalSeoAuditItem {
  id: string;
  checkpoint: string;
  category: 'Metadata' | 'Crawlability' | 'Architecture' | 'Performance';
  status: 'passed' | 'needs_action' | 'pending_deployment';
  recommendation: string;
}

export interface SeoWorkspaceData {
  searchThemes: string[];
  keywordClusters: SeoKeywordCluster[];
  technicalAudit: TechnicalSeoAuditItem[];
}

// 4. CRM / CUSTOMER TYPES
export type LeadLifecycleStage = 'new_lead' | 'engaged' | 'trial_demo' | 'customer' | 'advocate';

export interface CrmLeadRecord {
  id: string;
  name: string;
  companyOrRole: string;
  email: string;
  stage: LeadLifecycleStage;
  source: string;
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  createdAt: string;
  lastActivity: string;
}

export interface CrmWorkspaceData {
  leads: CrmLeadRecord[];
  lifecycleStages: {
    id: LeadLifecycleStage;
    label: string;
    description: string;
  }[];
}

// 5. MAINTAIN MODULE TYPES
export interface BrandMaintainIssue {
  id: string;
  touchpoint: string;
  category: 'Brand Identity' | 'Unit Economics' | 'Execution Ops' | 'Experience Simulation' | 'Content Freshness';
  status: 'attention' | 'resolved';
  whatChangedOrWrong: string;
  whyItMatters: string;
  actionToTake: string;
  actionPath?: string;
}

export interface MaintainWorkspaceData {
  issues: BrandMaintainIssue[];
}

// =============================================================================
// BRAND MONITORING CENTER TYPES
// =============================================================================

export interface BrandMonitoringData {
  brandHealth: {
    status: string;
    completenessRatio: string;
    activeIdentityElements: string[];
    missingElements: string[];
  };
  marketSignals: {
    competitorsTracked: {
      name: string;
      positioning: string;
      wedgeOpportunity: string;
    }[];
    marketTailwinds: string[];
  };
  connectedTelemetryStatus: {
    googleAnalytics: boolean;
    metaPixel: boolean;
    stripeBilling: boolean;
    crmSync: boolean;
  };
  signalActionQueue: {
    id: string;
    severity: 'opportunity' | 'risk' | 'milestone';
    title: string;
    description: string;
    actionLabel: string;
    timestamp: string;
  }[];
}

export interface LaunchGrowthReportData {
  ventureName: string;
  ventureCategory: string;
  productType: string;
  operatingLocation: string;
  targetAudience: string;
  readinessSystem: LaunchReadinessSystem;
  synthesisData: ProjectSynthesisData;
  generateModule: {
    reels: VisualReelConcept[];
    carousels: VisualCarouselConcept[];
    banners: BannerAdConcept[];
    campaigns: FullCampaignConcept[];
  };
  metaWorkspace: MetaCampaignWorkspace;
  seoWorkspace: SeoWorkspaceData;
  crmWorkspace: CrmWorkspaceData;
  maintainWorkspace: MaintainWorkspaceData;
  monitoringData: BrandMonitoringData;
}
