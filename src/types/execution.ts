export type ExecutionResourceType =
  | 'raw_materials'
  | 'manufacturing'
  | 'packaging'
  | 'printing'
  | 'machinery'
  | 'quality_testing'
  | 'storage'
  | 'logistics'
  | 'distributor'
  | 'retail'
  | 'development'
  | 'ui_ux'
  | 'cloud'
  | 'database'
  | 'domain'
  | 'hosting'
  | 'security'
  | 'analytics'
  | 'deployment'
  | 'crm'
  | 'compliance';

export type ResourceVerificationStatus =
  | 'VERIFIED_OFFICIAL'
  | 'TRADE_DIRECTORY'
  | 'NEEDS_VERIFICATION'
  | 'UNAVAILABLE';

export type LocationPinRole =
  | 'supplier'
  | 'manufacturer'
  | 'distributor'
  | 'retailer'
  | 'service_provider';

export interface ExecutionResourceItem {
  id: string;
  category: ExecutionResourceType;
  categoryLabel: string;
  roleType?: LocationPinRole;
  name: string;
  purpose: string;
  specification: string;
  location: string;
  isLocalToVenture: boolean;
  proximityDistance?: string;
  mapCoordinates?: { x: number; y: number };
  address?: string;
  phone?: string;
  website?: string;
  officialDocsUrl?: string;
  sourceEvidence: string;
  verificationStatus: ResourceVerificationStatus;
  whyRelevant: string;
  leadTimeWeeks: number;
  priority: 'DAY_1_CRITICAL' | 'PHASE_2' | 'ONGOING';
  isSaved?: boolean;
  addedToPlan?: boolean;
  estimatedBudgetRange?: string;
  fallbackAlternative?: string;
}

export interface ExecutionPathStage {
  id: string;
  stageNumber: number;
  name: string;
  description: string;
  keyDeliverable: string;
  primaryResourceCategory: string;
  estimatedDays: number;
}

export interface DistributionChannelItem {
  id: string;
  name: string;
  type: 'd2c_online' | 'retail_partner' | 'wholesale' | 'marketplace' | 'self_serve_saas' | 'enterprise_sales';
  partnerProfile: string;
  marginOrFee: string;
  setupRequirements: string[];
  whyItFits: string;
  status: 'RECOMMENDED_PRIMARY' | 'EXPANSION_SECONDARY' | 'NOT_NOW';
  logisticsMechanism: string;
}

export interface MarketingAcquisitionChannel {
  id: string;
  channelName: string;
  category: 'organic' | 'paid' | 'partnerships' | 'offline_local' | 'community';
  mediumScope: 'local_offline' | 'digital';
  whyItFits: string;
  executionPlaybook: string;
  resourceRequired: string;
  estimatedComplexity: 'Low' | 'Medium' | 'High';
  sourceOrBenchmark: string;
  isPrimary: boolean;
}


export interface ExecutionTaskItem {
  id: string;
  phaseNumber: number;
  phaseLabel: string;
  title: string;
  description: string;
  assignedCategory: string;
  isCompleted: boolean;
  isCustom?: boolean;
  dueDateLabel: string;
  linkedResourceId?: string;
}

export interface PremiumServiceOffering {
  id: string;
  name: string;
  category: 'seo' | 'crm' | 'meta_ads' | 'analytics' | 'growth' | 'sourcing_agent';
  description: string;
  scope: string[];
  deliverables: string[];
  status: 'ASSISTED_EXECUTION_AVAILABLE' | 'COMING_SOON';
  badge: string;
}

export interface ExecutionIntelligenceSynthesis {
  ventureSummary: {
    projectName: string;
    ventureType: string;
    locationLabel: string;
    buildPathSummary: string;
  };
  pathStages: ExecutionPathStage[];
  procurementMap: {
    totalCategoriesCount: number;
    day1CriticalCount: number;
    localResourceCount: number;
    items: ExecutionResourceItem[];
  };
  distributionChannels: DistributionChannelItem[];
  marketingChannels: MarketingAcquisitionChannel[];
  checklist: ExecutionTaskItem[];
  premiumServices: PremiumServiceOffering[];
  intelligenceAdvice: {
    sourcingCaveat: string;
    localAdvantage: string;
    criticalRiskFactor: string;
  };
}

export interface ExecutionReport {
  id: string;
  generatedAt: string;
  ventureName: string;
  modality: 'physical' | 'software' | 'hybrid' | 'service';
  location: {
    country: string;
    cityRegion: string;
    operatingLocation: string;
  };
  synthesis: ExecutionIntelligenceSynthesis;
}


export interface ExecutionSpecialistMessage {
  id: string;
  sender: 'user' | 'specialist';
  text: string;
  timestamp: string;
  resourceId?: string;
  actionType?: 'why_needed' | 'alternatives' | 'why_supplier' | 'unavailable_risk' | 'cheaper_local' | 'general';
}

