import type { ProjectState, IdeaData, BusinessModelData, StageId } from './project';

export interface VentureDecision {
  id: string;
  decision: string;
  why: string;
  affectedArea: 'problem' | 'customer' | 'pricing' | 'product' | 'brand' | 'market' | 'execution' | 'launch';
  timestamp: string;
  alternativesConsidered?: string[];
  unresolvedUncertainty?: string;
  source: 'user_explicit' | 'agent_recommendation';
}

export interface ExternalIntegrationState {
  crm: {
    isConnected: boolean;
    provider?: string;
    accountName?: string;
    lastSyncedAt?: string;
  };
  meta: {
    isConnected: boolean;
    adAccountId?: string;
    lastSyncedAt?: string;
  };
  stripe: {
    isConnected: boolean;
    currency?: string;
    lastSyncedAt?: string;
  };
  analytics: {
    isConnected: boolean;
    propertyId?: string;
    lastSyncedAt?: string;
  };
  search: {
    isConnected: boolean;
    domain?: string;
    lastSyncedAt?: string;
  };
}

export interface CouncilQueryRequest {
  query: string;
  projectState: ProjectState;
  stageId?: StageId;
  decisionHistory?: VentureDecision[];
  externalConnections?: ExternalIntegrationState;
}

export interface CouncilStructuredOutput {
  insight: string;
  why: string;
  risk: string;
  recommendation: string;
  nextAction: string;
}

export interface CouncilSpecialistDebate {
  founderInsight: string;
  marketInsight: string;
  productInsight: string;
  growthInsight: string;
  financeInsight: string;
  criticChallenge: string;
  synthesisVerdict: string;
}

export type MessageIntent =
  | 'GREETING'
  | 'NEW_IDEA'
  | 'BUSINESS_QUERY'
  | 'MODIFICATION'
  | 'STAGE_OR_DECISION_QUERY'
  | 'OUT_OF_DOMAIN';

export interface CouncilQueryResponse {
  replyText: string;
  intent?: MessageIntent;
  isOffTopic: boolean;
  isModification: boolean;
  modificationPatch?: {
    ideaPatch?: Partial<IdeaData>;
    businessModelPatch?: Partial<BusinessModelData>;
    recordedDecision?: VentureDecision;
  };
  specialistDebate?: CouncilSpecialistDebate;
  structuredOutput?: CouncilStructuredOutput;
  missingDataNotice?: string;
}

