export type StageId =
  | 'idea-lab'
  | 'feasibility'
  | 'market-intelligence'
  | 'brand-roadmap'
  | 'build'
  | 'execution'
  | 'simulation'
  | 'launch-growth'
  | 'report';

export interface StageDefinition {
  id: StageId;
  number: string;
  shortName: string;
  fullName: string;
  path: string;
  description: string;
  requiredStageId?: StageId;
}

export const STAGES: StageDefinition[] = [
  {
    id: 'idea-lab',
    number: '01',
    shortName: 'IDEA',
    fullName: 'Idea Lab',
    path: '/idea-lab',
    description: 'Deconstruct, structure, and crystallize your raw founder intuition.',
  },
  {
    id: 'feasibility',
    number: '02',
    shortName: 'VALIDATE',
    fullName: 'Feasibility & Viability',
    path: '/feasibility',
    description: 'Assess technical feasibility, regulatory boundaries, and economic unit viability.',
    requiredStageId: 'idea-lab',
  },
  {
    id: 'market-intelligence',
    number: '03',
    shortName: 'UNDERSTAND',
    fullName: 'Market Intelligence',
    path: '/market-intelligence',
    description: 'Analyze real competitive landscapes, market size, and customer segments.',
    requiredStageId: 'feasibility',
  },
  {
    id: 'brand-roadmap',
    number: '04',
    shortName: 'STRATEGIZE',
    fullName: 'Brand Roadmap',
    path: '/brand-roadmap',
    description: 'Establish positioning, archetype, value proposition, and brand strategy.',
    requiredStageId: 'market-intelligence',
  },
  {
    id: 'build',
    number: '05',
    shortName: 'BUILD',
    fullName: 'Build & Architecture',
    path: '/build',
    description: 'Architect operations, product specs, supply chain, or tech stack requirements.',
    requiredStageId: 'brand-roadmap',
  },
  {
    id: 'execution',
    number: '06',
    shortName: 'EXECUTE',
    fullName: 'Execution Intelligence',
    path: '/execution',
    description: 'Sprint planning, resource allocation, and operational milestone tracking.',
    requiredStageId: 'build',
  },
  {
    id: 'simulation',
    number: '07',
    shortName: 'SIMULATE',
    fullName: 'Experience Simulation',
    path: '/simulation',
    description: 'Simulate customer journeys, user feedback loops, and stress-test assumptions.',
    requiredStageId: 'execution',
  },
  {
    id: 'launch-growth',
    number: '08',
    shortName: 'GROW',
    fullName: 'Launch & Growth',
    path: '/launch-growth',
    description: 'Go-to-market mechanics, distribution channels, and growth loops.',
    requiredStageId: 'simulation',
  },
  {
    id: 'report',
    number: '09',
    shortName: 'REPORT',
    fullName: 'Brand Intelligence Report',
    path: '/report',
    description: 'Comprehensive, publication-grade executive dossier synthesizing all stages.',
    requiredStageId: 'launch-growth',
  },
];

export type ProductType =
  | 'physical'
  | 'saas'
  | 'marketplace'
  | 'service'
  | 'community'
  | 'creator'
  | 'other';

export interface ProductTypeOption {
  id: ProductType;
  label: string;
  tagline: string;
  downstreamFocus: string[];
}

export const PRODUCT_TYPES: ProductTypeOption[] = [
  {
    id: 'physical',
    label: 'Physical Product',
    tagline: 'Tangible goods, apparel, hardware, or consumer packaged goods',
    downstreamFocus: ['Manufacturing', 'Materials', 'Supply Chain', 'Distribution', 'Retail'],
  },
  {
    id: 'saas',
    label: 'Software / SaaS',
    tagline: 'Web apps, mobile applications, APIs, or enterprise digital platforms',
    downstreamFocus: ['Architecture', 'Infrastructure', 'Deployment', 'Acquisition', 'Retention'],
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    tagline: 'Multi-sided platforms connecting buyers, sellers, or service providers',
    downstreamFocus: ['Liquidity', 'Network Effects', 'Trust & Safety', 'Take Rates', 'Two-sided GTM'],
  },
  {
    id: 'service',
    label: 'Service / Agency',
    tagline: 'Specialized advisory, agency services, bespoke consultancy, or client work',
    downstreamFocus: ['Service Delivery', 'Talent / Staffing', 'Value-based Pricing', 'Client Onboarding'],
  },
  {
    id: 'community',
    label: 'Community',
    tagline: 'Member networks, peer cohorts, collective movements, or mastermind clubs',
    downstreamFocus: ['Engagement Rituals', 'Moderation', 'Membership Tiers', 'Content Engine'],
  },
  {
    id: 'creator',
    label: 'Creator Brand',
    tagline: 'Personal brand, digital media company, publication, or educational IP',
    downstreamFocus: ['Audience Funnels', 'Content IP', 'Merchandise', 'Sponsorships', 'Digital Products'],
  },
  {
    id: 'other',
    label: 'Other / Hybrid',
    tagline: 'Novel or cross-category business models requiring bespoke architecture',
    downstreamFocus: ['Custom Modeling', 'Cross-Domain Validation', 'Tailored GTM'],
  },
];

export type DeliveryModel = 'online' | 'offline' | 'hybrid';
export type CustomerType = 'b2c' | 'b2b' | 'b2b2c' | 'd2c';

export interface LocationData {
  country: string;
  cityRegion: string;
  operatingLocation: string; // e.g. "Primary in Jaipur, shipping pan-India"
}

export interface IdeaData {
  rawInput: string;
  name: string;
  problem: string;
  targetAudience: string;
  context: string;
  goals: string;
  constraints: string;
  differentiation: string;
  openQuestions: string[];
}

export interface BusinessModelData {
  productType: ProductType | null;
  deliveryModel: DeliveryModel | null;
  customerType: CustomerType | null;
  location: LocationData;
}

export interface WorkflowData {
  currentStage: StageId;
  completedStages: StageId[];
  stageOutputs: Record<string, unknown>;
}

export interface ProjectMetadata {
  id: string;
  name: string;
  category: string;
  status: 'discovery' | 'feasibility_ready' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export * from './feasibility';
export * from './marketIntelligence';
export * from './brandRoadmap';
import type { FeasibilityReport } from './feasibility';
import type { MarketIntelligenceReport } from './marketIntelligence';
import type { BrandRoadmapReport } from './brandRoadmap';

export interface ProjectState {
  project: ProjectMetadata;
  idea: IdeaData;
  businessModel: BusinessModelData;
  feasibility?: FeasibilityReport;
  marketIntelligence?: MarketIntelligenceReport;
  brandRoadmap?: BrandRoadmapReport;
  workflow: WorkflowData;
}

export interface InterviewMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isInitial?: boolean;
}
