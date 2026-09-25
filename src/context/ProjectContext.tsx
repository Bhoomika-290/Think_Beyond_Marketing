import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import type {
  ProjectState,
  IdeaData,
  BusinessModelData,
  ProjectMetadata,
  ProductType,
  DeliveryModel,
  CustomerType,
  LocationData,
  StageId,
  InterviewMessage,
  FeasibilityReport,
  FeasibilityDimensionId,
  MarketIntelligenceReport,
  CompetitorItem,
  PositioningAxis,
  MarketSpecialistMessage,
  BrandRoadmapReport,
  BrandDNANode,
  PositioningStatement,
  LogoConcept,
  BuildArchitectureReport,
  MVPFeatureItem,
  MVPFeaturePriority,
  BuildDecisionQuadrant,
  BuildSpecialistMessage,
  ExecutionReport,
  ExecutionTaskItem,
  ExecutionSpecialistMessage,
  SimulationReport,
  VentureDecision,
  ExternalIntegrationState,
  CouncilQueryResponse,
} from '../types/project';
import { STAGES } from '../types/project';
import { generateFeasibilityReport } from '../services/feasibilityEngine';
import { generateMarketIntelligenceReport } from '../services/marketIntelligenceEngine';
import { generateBrandRoadmapReport, generateLogoSvg } from '../services/brandRoadmapEngine';
import { generateBuildArchitectureReport } from '../services/buildArchitectureEngine';
import { generateExecutionReport } from '../services/executionEngine';
import { generateSimulationReport } from '../services/simulationEngine';
import { executeBusinessCouncilQuery } from '../services/businessCouncilEngine';

const STORAGE_KEY = 'think_beyond_marketing_project_state_v1';
const MESSAGES_KEY = 'think_beyond_marketing_messages_v1';
const SPECIALIST_MESSAGES_KEY = 'think_beyond_marketing_specialist_messages_v1';
const BUILD_SPECIALIST_MESSAGES_KEY = 'think_beyond_marketing_build_specialist_messages_v1';
const EXECUTION_SPECIALIST_MESSAGES_KEY = 'think_beyond_marketing_execution_specialist_messages_v1';

const INITIAL_PROJECT_STATE: ProjectState = {
  project: {
    id: 'proj_default_01',
    name: 'Untitled Venture',
    category: 'Unclassified',
    status: 'discovery',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  idea: {
    rawInput: '',
    name: '',
    problem: '',
    targetAudience: '',
    context: '',
    goals: '',
    constraints: '',
    differentiation: '',
    openQuestions: [],
  },
  businessModel: {
    productType: null,
    deliveryModel: null,
    customerType: null,
    location: {
      country: '',
      cityRegion: '',
      operatingLocation: '',
    },
  },
  workflow: {
    currentStage: 'idea-lab',
    completedStages: [],
    stageOutputs: {},
  },
  decisions: [],
  externalConnections: {
    crm: { isConnected: false },
    meta: { isConnected: false },
    stripe: { isConnected: false },
    analytics: { isConnected: false },
    search: { isConnected: false },
  },
};

const INITIAL_MESSAGES: InterviewMessage[] = [
  {
    id: 'msg_welcome',
    sender: 'ai',
    text: "Hello. Let's turn your idea into something real.\n\nTell me what is in your head. It doesn't need to be polished.",
    timestamp: new Date().toISOString(),
    isInitial: true,
  },
];

interface ProjectContextValue {
  state: ProjectState;
  messages: InterviewMessage[];
  feasibilityReport: FeasibilityReport;
  marketReport: MarketIntelligenceReport;
  specialistMessages: MarketSpecialistMessage[];
  updateProject: (partial: Partial<ProjectMetadata>) => void;
  updateIdea: (partial: Partial<IdeaData>) => void;
  updateBusinessModel: (partial: Partial<BusinessModelData>) => void;
  setProductType: (productType: ProductType) => void;
  setLocation: (location: Partial<LocationData>) => void;
  setDeliveryModel: (deliveryModel: DeliveryModel) => void;
  setCustomerType: (customerType: CustomerType) => void;
  addOpenQuestion: (question: string) => void;
  removeOpenQuestion: (index: number) => void;
  markStageCompleted: (stageId: StageId) => void;
  isStageUnlocked: (stageId: StageId) => boolean;
  addMessage: (text: string, sender: 'ai' | 'user') => void;
  resetProject: () => void;
  hasMinimumDiscovery: boolean;
  recordDecision: (decision: Omit<VentureDecision, 'id' | 'timestamp'>) => void;
  updateExternalConnections: (partial: Partial<ExternalIntegrationState>) => void;
  queryCouncil: (query: string, stageId?: StageId) => CouncilQueryResponse;
  refreshFeasibility: () => void;
  saveFeasibilityReport: (report: FeasibilityReport) => void;
  toggleValidationTask: (taskId: string) => void;
  addCustomValidationTask: (task: { title: string; action: string; dimension: FeasibilityDimensionId }) => void;
  refreshMarketIntelligence: () => void;
  saveMarketIntelligenceReport: (report: MarketIntelligenceReport) => void;
  addCompetitor: (competitor: Omit<CompetitorItem, 'id' | 'provenance'>) => void;
  updatePositioningAxes: (xAxis: PositioningAxis, yAxis: PositioningAxis) => void;
  sendSpecialistQuery: (queryOrAction: string) => void;
  loadSampleVenture: (sampleType: 'coffee_d2c' | 'ai_saas') => void;
  brandReport: BrandRoadmapReport;
  refreshBrandRoadmap: () => void;
  saveBrandRoadmapReport: (report: BrandRoadmapReport) => void;
  updateBrandPersonality: (traitId: string, userValue: number) => void;
  toggleBrandVoice: (attributeId: string) => void;
  updatePositioningStatement: (field: keyof PositioningStatement, value: string) => void;
  selectDifferentiator: (differentiatorId: string, customText?: string) => void;
  updateVoiceTransformation: (newVoiceMessage: string) => void;
  selectTagline: (taglineId: string, customText?: string) => void;
  selectLogoConcept: (conceptId: string) => void;
  customizeLogo: (customization: Partial<LogoConcept['customization']>) => void;
  updateColorSwatch: (swatchId: string, hex: string) => void;
  selectTypography: (pairId: string) => void;
  buildReport: BuildArchitectureReport;
  refreshBuildArchitecture: () => void;
  saveBuildArchitectureReport: (report: BuildArchitectureReport) => void;
  updateFeaturePriority: (featureId: string, priority: MVPFeaturePriority) => void;
  updateFeatureDetails: (featureId: string, patch: Partial<MVPFeatureItem>) => void;
  addCustomFeature: (feature: Omit<MVPFeatureItem, 'id' | 'provenance'>) => void;
  updateTechStackItem: (itemId: string, selectedTech: string) => void;
  toggleBuildTask: (taskId: string) => void;
  addCustomBuildTask: (task: { phaseId: string; title: string; rationale: string; priority: 'High' | 'Medium' | 'Low'; roleOwner: string }) => void;
  moveBuildDecision: (decisionId: string, targetQuadrant: BuildDecisionQuadrant) => void;
  addBuildDecision: (decision: { title: string; quadrant: BuildDecisionQuadrant; connectedFeature: string; assumption: string }) => void;
  sendBuildSpecialistQuery: (queryOrAction: string) => void;
  buildSpecialistMessages: BuildSpecialistMessage[];
  executionReport: ExecutionReport;
  refreshExecution: () => void;
  saveExecutionReport: (report: ExecutionReport) => void;
  toggleExecutionTask: (taskId: string) => void;
  addCustomExecutionTask: (task: { title: string; assignedCategory: string; dueDateLabel: string }) => void;
  toggleSaveResource: (resourceId: string) => void;
  addResourceToPlan: (resourceId: string) => void;
  executionSpecialistMessages: ExecutionSpecialistMessage[];
  sendExecutionSpecialistQuery: (queryOrAction: string, resourceId?: string) => void;
  simulationReport: SimulationReport;
  refreshSimulation: () => void;
  saveSimulationReport: (report: SimulationReport) => void;
  requestedServices: Record<string, { status: 'REQUESTED' | 'WAITLISTED'; notes?: string; requestedAt: string }>;
  requestService: (serviceId: string, status: 'REQUESTED' | 'WAITLISTED', notes?: string) => void;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProjectState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load project state from storage:', e);
    }
    return INITIAL_PROJECT_STATE;
  });

  const [messages, setMessages] = useState<InterviewMessage[]>(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load messages from storage:', e);
    }
    return INITIAL_MESSAGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state]);

  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages to localStorage', e);
    }
  }, [messages]);

  const updateProject = (partial: Partial<ProjectMetadata>) => {
    setState((prev) => ({
      ...prev,
      project: {
        ...prev.project,
        ...partial,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const updateIdea = (partial: Partial<IdeaData> & { isNewVenture?: boolean }) => {
    setState((prev) => {
      const isSampleVenture = prev.project.id.startsWith('proj_sample_');
      const isNewVenture = Boolean(partial.isNewVenture || isSampleVenture);

      if (isNewVenture && partial.rawInput) {
        // Reset old project parameters completely to prevent sample/stale pollution
        const cleanName = partial.name || (partial.rawInput.length > 32 ? partial.rawInput.slice(0, 32).trim() + '...' : partial.rawInput.trim());
        const cleanIdea: IdeaData = {
          rawInput: partial.rawInput,
          name: partial.name || cleanName,
          problem: partial.problem || '',
          targetAudience: partial.targetAudience || '',
          context: partial.context || '',
          goals: partial.goals || '',
          constraints: partial.constraints || '',
          differentiation: partial.differentiation || '',
          openQuestions: partial.openQuestions || [],
        };
        const cleanBusinessModel: BusinessModelData = {
          productType: null,
          deliveryModel: null,
          customerType: null,
          location: {
            country: '',
            cityRegion: '',
            operatingLocation: '',
          },
        };

        return {
          ...prev,
          project: {
            id: `proj_${Date.now()}`,
            name: cleanName,
            category: 'Unclassified',
            status: 'discovery',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          idea: cleanIdea,
          businessModel: cleanBusinessModel,
          workflow: {
            currentStage: 'idea-lab',
            completedStages: [],
            stageOutputs: {},
          },
          feasibility: undefined,
          marketIntelligence: undefined,
          brandRoadmap: undefined,
          buildArchitecture: undefined,
          execution: undefined,
          simulation: undefined,
        };
      }

      const newIdea = { ...prev.idea, ...partial };
      let projectName = prev.project.name;
      if (partial.name && partial.name.trim()) {
        projectName = partial.name;
      } else if (
        (prev.project.name === 'Untitled Venture' || isSampleVenture) &&
        partial.rawInput &&
        partial.rawInput.trim()
      ) {
        projectName = partial.rawInput.slice(0, 32).trim() + (partial.rawInput.length > 32 ? '...' : '');
      }

      return {
        ...prev,
        project: {
          ...prev.project,
          name: projectName,
          updatedAt: new Date().toISOString(),
        },
        idea: newIdea,
        feasibility: undefined,
        marketIntelligence: undefined,
        brandRoadmap: undefined,
        buildArchitecture: undefined,
        execution: undefined,
        simulation: undefined,
      };
    });
  };

  const updateBusinessModel = (partial: Partial<BusinessModelData>) => {
    setState((prev) => ({
      ...prev,
      businessModel: {
        ...prev.businessModel,
        ...partial,
      },
      feasibility: undefined,
      marketIntelligence: undefined,
      brandRoadmap: undefined,
      buildArchitecture: undefined,
      execution: undefined,
      simulation: undefined,
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const setProductType = (productType: ProductType) => {
    setState((prev) => ({
      ...prev,
      businessModel: {
        ...prev.businessModel,
        productType,
      },
      feasibility: undefined,
      marketIntelligence: undefined,
      brandRoadmap: undefined,
      buildArchitecture: undefined,
      execution: undefined,
      simulation: undefined,
      project: {
        ...prev.project,
        category: productType,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const setLocation = (locationPartial: Partial<LocationData>) => {
    setState((prev) => ({
      ...prev,
      businessModel: {
        ...prev.businessModel,
        location: {
          ...prev.businessModel.location,
          ...locationPartial,
        },
      },
      feasibility: undefined,
      marketIntelligence: undefined,
      brandRoadmap: undefined,
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const setDeliveryModel = (deliveryModel: DeliveryModel) => {
    setState((prev) => ({
      ...prev,
      businessModel: {
        ...prev.businessModel,
        deliveryModel,
      },
      feasibility: undefined,
      marketIntelligence: undefined,
      brandRoadmap: undefined,
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const setCustomerType = (customerType: CustomerType) => {
    setState((prev) => ({
      ...prev,
      businessModel: {
        ...prev.businessModel,
        customerType,
      },
      feasibility: undefined,
      marketIntelligence: undefined,
      brandRoadmap: undefined,
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const addOpenQuestion = (question: string) => {
    if (!question.trim()) return;
    setState((prev) => ({
      ...prev,
      idea: {
        ...prev.idea,
        openQuestions: [...prev.idea.openQuestions, question.trim()],
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const removeOpenQuestion = (index: number) => {
    setState((prev) => ({
      ...prev,
      idea: {
        ...prev.idea,
        openQuestions: prev.idea.openQuestions.filter((_, i) => i !== index),
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const markStageCompleted = (stageId: StageId) => {
    setState((prev) => {
      const alreadyCompleted = prev.workflow.completedStages.includes(stageId);
      if (alreadyCompleted) {
        return prev;
      }
      const completedStages = [...prev.workflow.completedStages, stageId];
      return {
        ...prev,
        workflow: {
          ...prev.workflow,
          completedStages,
        },
        project: {
          ...prev.project,
          status: completedStages.includes('idea-lab') ? 'feasibility_ready' : prev.project.status,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  const recordDecision = useCallback((decision: Omit<VentureDecision, 'id' | 'timestamp'>) => {
    setState((prev) => {
      const newDecision: VentureDecision = {
        ...decision,
        id: `dec_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
      };
      return {
        ...prev,
        decisions: [newDecision, ...(prev.decisions || [])],
        project: {
          ...prev.project,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const updateExternalConnections = useCallback((partial: Partial<ExternalIntegrationState>) => {
    setState((prev) => ({
      ...prev,
      externalConnections: {
        ...(prev.externalConnections || {
          crm: { isConnected: false },
          meta: { isConnected: false },
          stripe: { isConnected: false },
          analytics: { isConnected: false },
          search: { isConnected: false },
        }),
        ...partial,
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const queryCouncil = useCallback(
    (query: string, stageId?: StageId): CouncilQueryResponse => {
      const result = executeBusinessCouncilQuery({
        query,
        projectState: state,
        stageId: stageId || state.workflow.currentStage,
        decisionHistory: state.decisions,
        externalConnections: state.externalConnections,
      });

      if (result.isModification && result.modificationPatch) {
        const { ideaPatch, businessModelPatch, recordedDecision } = result.modificationPatch;

        setState((prev) => {
          let updatedIdea = prev.idea;
          let updatedBusinessModel = prev.businessModel;
          let updatedDecisions = prev.decisions || [];

          if (ideaPatch) {
            updatedIdea = { ...updatedIdea, ...ideaPatch };
          }
          if (businessModelPatch) {
            updatedBusinessModel = {
              ...updatedBusinessModel,
              ...businessModelPatch,
              location: {
                ...updatedBusinessModel.location,
                ...(businessModelPatch.location || {}),
              },
            };
          }
          if (recordedDecision) {
            updatedDecisions = [recordedDecision, ...updatedDecisions];
          }

          return {
            ...prev,
            idea: updatedIdea,
            businessModel: updatedBusinessModel,
            decisions: updatedDecisions,
            feasibility: undefined,
            marketIntelligence: undefined,
            brandRoadmap: undefined,
            buildArchitecture: undefined,
            execution: undefined,
            simulation: undefined,
            project: {
              ...prev.project,
              name: ideaPatch?.name || prev.project.name,
              category: businessModelPatch?.productType || prev.project.category,
              updatedAt: new Date().toISOString(),
            },
          };
        });
      }

      return result;
    },
    [state]
  );

  // Determine whether minimum discovery exists
  const hasMinimumDiscovery = useMemo(() => {
    const hasRaw = Boolean(state.idea.rawInput && state.idea.rawInput.trim().length > 3);
    const hasType = Boolean(state.businessModel.productType);
    const hasAudienceOrProblem = Boolean(
      (state.idea.targetAudience && state.idea.targetAudience.trim()) ||
      (state.idea.problem && state.idea.problem.trim()) ||
      (state.businessModel.location.country && state.businessModel.location.country.trim())
    );
    return hasRaw && hasType && hasAudienceOrProblem;
  }, [state]);

  const isStageUnlocked = (stageId: StageId): boolean => {
    if (stageId === 'idea-lab') return true;
    if (stageId === 'feasibility') {
      return hasMinimumDiscovery || state.workflow.completedStages.includes('idea-lab');
    }
    if (stageId === 'market-intelligence') {
      return (
        state.workflow.completedStages.includes('feasibility') ||
        state.workflow.completedStages.includes('idea-lab') ||
        hasMinimumDiscovery
      );
    }
    if (stageId === 'brand-roadmap') {
      return (
        state.workflow.completedStages.includes('market-intelligence') ||
        state.workflow.completedStages.includes('feasibility') ||
        state.workflow.completedStages.includes('idea-lab') ||
        hasMinimumDiscovery
      );
    }
    if (stageId === 'build') {
      const br = state.brandRoadmap || generateBrandRoadmapReport(state);
      return br.stage05Handoff.isReady || state.workflow.completedStages.includes('brand-roadmap');
    }
    if (stageId === 'execution') {
      const ba = state.buildArchitecture || generateBuildArchitectureReport(state);
      return ba.handoff.isReady || state.workflow.completedStages.includes('build');
    }
    const stage = STAGES.find((s) => s.id === stageId);
    if (!stage || !stage.requiredStageId) return false;
    return state.workflow.completedStages.includes(stage.requiredStageId);
  };

  const addMessage = (text: string, sender: 'ai' | 'user') => {
    const newMessage: InterviewMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      sender,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const resetProject = () => {
    setState(INITIAL_PROJECT_STATE);
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(MESSAGES_KEY);
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  };

  // Real-time Feasibility Report derived from current Project State
  const feasibilityReport = useMemo(() => {
    if (state.feasibility) {
      return state.feasibility;
    }
    return generateFeasibilityReport(state);
  }, [state]);

  const refreshFeasibility = useCallback(() => {
    const fresh = generateFeasibilityReport(state);
    setState((prev) => ({
      ...prev,
      feasibility: fresh,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          feasibility: fresh,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, [state]);

  const saveFeasibilityReport = useCallback((report: FeasibilityReport) => {
    setState((prev) => ({
      ...prev,
      feasibility: report,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          feasibility: report,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const toggleValidationTask = useCallback((taskId: string) => {
    setState((prev) => {
      const currentReport = prev.feasibility || generateFeasibilityReport(prev);
      const updatedTasks = currentReport.validationTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      const updatedReport: FeasibilityReport = {
        ...currentReport,
        validationTasks: updatedTasks,
      };
      return {
        ...prev,
        feasibility: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            feasibility: updatedReport,
          },
        },
      };
    });
  }, []);

  const addCustomValidationTask = useCallback(
    (task: { title: string; action: string; dimension: FeasibilityDimensionId }) => {
      setState((prev) => {
        const currentReport = prev.feasibility || generateFeasibilityReport(prev);
        const newTask = {
          id: `task_custom_${Date.now()}`,
          dimension: task.dimension,
          title: task.title,
          action: task.action,
          expectedOutput: 'Founder verified observation or test metric result.',
          completed: false,
          isCustom: true,
        };
        const updatedReport: FeasibilityReport = {
          ...currentReport,
          validationTasks: [newTask, ...currentReport.validationTasks],
        };
        return {
          ...prev,
          feasibility: updatedReport,
          workflow: {
            ...prev.workflow,
            stageOutputs: {
              ...prev.workflow.stageOutputs,
              feasibility: updatedReport,
            },
          },
        };
      });
    },
    []
  );

  const loadSampleVenture = useCallback((sampleType: 'coffee_d2c' | 'ai_saas') => {
    if (sampleType === 'coffee_d2c') {
      const sampleState: ProjectState = {
        project: {
          id: 'proj_sample_coffee',
          name: 'Aura Roast',
          category: 'physical',
          status: 'feasibility_ready',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        idea: {
          rawInput:
            'A specialty single-origin coffee bean subscription for remote professionals and espresso connoisseurs who want ethically sourced, roast-to-order beans with transparent farmer compensation.',
          name: 'Aura Roast',
          problem:
            'Commercial supermarket coffee is stale (roasted months prior) with untraceable blends and low farmer earnings, while high-end specialty roasters are fragmented with erratic subscription delivery.',
          targetAudience:
            'Remote knowledge workers, home baristas, and design/tech professionals aged 25–45 spending $60+/month on home brewing.',
          context:
            'Sourcing directly from heritage shade-grown estates in Coorg & Chikmagalur; roasting micro-batches weekly in Bengaluru with compostable valve bags.',
          goals:
            'Reach 500 active monthly subscribers within 6 months while ensuring a minimum 40% farmer price premium above fair-trade baseline.',
          constraints:
            'Roast-to-order requires fast 48-hour delivery window across Tier-1 cities to guarantee peak degassing freshness.',
          differentiation:
            'Batch QR codes revealing estate harvest date, elevation, soil profile, and transparent farmer payout margin per 250g bag.',
          openQuestions: [
            'Will customers pay a 25% premium for farm-level traceability?',
            'What is the return/breakage rate on regional courier express parcels?',
          ],
        },
        businessModel: {
          productType: 'physical',
          deliveryModel: 'online',
          customerType: 'd2c',
          location: {
            country: 'India',
            cityRegion: 'Bengaluru / Karnataka',
            operatingLocation: 'Roastery in Bengaluru, direct shipping pan-India',
          },
        },
        workflow: {
          currentStage: 'feasibility',
          completedStages: ['idea-lab'],
          stageOutputs: {},
        },
      };
      const report = generateFeasibilityReport(sampleState);
      sampleState.feasibility = report;
      sampleState.workflow.stageOutputs.feasibility = report;
      const mktReport = generateMarketIntelligenceReport(sampleState);
      sampleState.marketIntelligence = mktReport;
      sampleState.workflow.stageOutputs.marketIntelligence = mktReport;
      const brReport = generateBrandRoadmapReport(sampleState);
      sampleState.brandRoadmap = brReport;
      sampleState.workflow.stageOutputs.brandRoadmap = brReport;
      const baReport = generateBuildArchitectureReport(sampleState);
      sampleState.buildArchitecture = baReport;
      sampleState.workflow.stageOutputs.buildArchitecture = baReport;
      sampleState.workflow.completedStages = ['idea-lab', 'feasibility', 'market-intelligence', 'brand-roadmap'];
      setState(sampleState);
    } else {
      const sampleState: ProjectState = {
        project: {
          id: 'proj_sample_saas',
          name: 'MetricPulse',
          category: 'saas',
          status: 'feasibility_ready',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        idea: {
          rawInput:
            'An AI-driven multi-touch attribution platform that unifies ad spend from Meta, Google, and TikTok with Shopify and Stripe data to show true net margin by marketing campaign.',
          name: 'MetricPulse',
          problem:
            'Post-iOS14 privacy restrictions broke ad tracking; e-commerce founders are flying blind, double-counting ROAS across ad platforms, and misallocating ad budget to unprofitable campaigns.',
          targetAudience:
            'D2C brand operators and e-commerce agencies spending between $15,000 and $250,000 monthly on paid acquisition.',
          context:
            'Zero-cookie server-side tracking script paired with probabilistic Bayesian modeling to estimate incrementality.',
          goals:
            'Onboard 25 pilot e-commerce brands and demonstrate at least a 15% reduction in wasted ad spend within 30 days.',
          constraints:
            'Must comply strictly with GDPR and CCPA privacy standards without storing customer PII in plain text.',
          differentiation:
            'Net-margin attribution that integrates real-time product COGS, payment fees, and return allowances directly into campaign ROI calculations.',
          openQuestions: [
            'How difficult is server-side CAPI integration for non-technical Shopify founders?',
            'What is the enterprise sales resistance compared to legacy tools like Triple Whale or Northbeam?',
          ],
        },
        businessModel: {
          productType: 'saas',
          deliveryModel: 'online',
          customerType: 'b2b',
          location: {
            country: 'United States',
            cityRegion: 'San Francisco, CA',
            operatingLocation: 'Cloud-native SaaS deployed on AWS/Cloudflare',
          },
        },
        workflow: {
          currentStage: 'feasibility',
          completedStages: ['idea-lab'],
          stageOutputs: {},
        },
      };
      const report = generateFeasibilityReport(sampleState);
      sampleState.feasibility = report;
      sampleState.workflow.stageOutputs.feasibility = report;
      const mktReport = generateMarketIntelligenceReport(sampleState);
      sampleState.marketIntelligence = mktReport;
      sampleState.workflow.stageOutputs.marketIntelligence = mktReport;
      const brReport = generateBrandRoadmapReport(sampleState);
      sampleState.brandRoadmap = brReport;
      sampleState.workflow.stageOutputs.brandRoadmap = brReport;
      const baReport = generateBuildArchitectureReport(sampleState);
      sampleState.buildArchitecture = baReport;
      sampleState.workflow.stageOutputs.buildArchitecture = baReport;
      sampleState.workflow.completedStages = ['idea-lab', 'feasibility', 'market-intelligence', 'brand-roadmap'];
      setState(sampleState);
    }
  }, []);

  // Market Intelligence State & Specialist Chatbot
  const [customCompetitors, setCustomCompetitors] = useState<CompetitorItem[]>([]);
  const [customAxes, setCustomAxes] = useState<{ xAxis: PositioningAxis; yAxis: PositioningAxis } | undefined>(undefined);

  const [specialistMessages, setSpecialistMessages] = useState<MarketSpecialistMessage[]>(() => {
    try {
      const saved = localStorage.getItem(SPECIALIST_MESSAGES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load specialist messages:', e);
    }
    return [
      {
        id: 'spec_welcome',
        sender: 'ai',
        specialistName: 'Market Intelligence Lead',
        text: "Welcome to Market Intelligence. I analyze your venture's market landscape, customer segments, and competitor whitespace based on your Stage 01 & 02 findings.\n\nUse the quick actions below or ask any strategic question about your positioning.",
        timestamp: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(SPECIALIST_MESSAGES_KEY, JSON.stringify(specialistMessages));
    } catch (e) {
      console.error('Failed to save specialist messages:', e);
    }
  }, [specialistMessages]);

  const marketReport = useMemo(() => {
    if (state.marketIntelligence) {
      return state.marketIntelligence;
    }
    return generateMarketIntelligenceReport(state, customCompetitors, customAxes);
  }, [state, customCompetitors, customAxes]);

  const refreshMarketIntelligence = useCallback(() => {
    const fresh = generateMarketIntelligenceReport(state, customCompetitors, customAxes);
    setState((prev) => ({
      ...prev,
      marketIntelligence: fresh,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          marketIntelligence: fresh,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, [state, customCompetitors, customAxes]);

  const saveMarketIntelligenceReport = useCallback((report: MarketIntelligenceReport) => {
    setState((prev) => ({
      ...prev,
      marketIntelligence: report,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          marketIntelligence: report,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const addCompetitor = useCallback(
    (competitor: Omit<CompetitorItem, 'id' | 'provenance'>) => {
      const newComp: CompetitorItem = {
        ...competitor,
        id: `comp_user_${Date.now()}`,
        provenance: 'USER_PROVIDED',
        isUserAdded: true,
      };
      setCustomCompetitors((prev) => [newComp, ...prev]);
    },
    []
  );

  const updatePositioningAxes = useCallback(
    (xAxis: PositioningAxis, yAxis: PositioningAxis) => {
      setCustomAxes({ xAxis, yAxis });
    },
    []
  );

  const sendSpecialistQuery = useCallback(
    (queryOrAction: string) => {
      const userMsg: MarketSpecialistMessage = {
        id: `usr_${Date.now()}`,
        sender: 'user',
        text: queryOrAction,
        timestamp: new Date().toISOString(),
      };

      const ventureName = state.idea.name || state.project.name || 'your venture';
      const category = state.businessModel.productType || 'venture';
      const audience = state.idea.targetAudience || 'target audience';
      const diff = state.idea.differentiation || 'core transparency';
      const problem = state.idea.problem || 'stated problem';

      let replyText = '';
      let specialistName = 'Business Specialist';

      switch (queryOrAction) {
        case 'Analyze Market':
          replyText = `**Market Intelligence Analysis for ${ventureName}:**\nThe ${category.toUpperCase()} market is polarized between mass commodity providers (high volume, low trust) and high-friction legacy tools. For ${audience}, the buying window opens when friction around "${problem.slice(0, 50)}..." becomes intolerable. Your primary opportunity is capturing the underserved mid-market through verified craft and operational transparency.`;
          specialistName = 'Market Intelligence Lead';
          break;

        case 'Compare Competitors':
          replyText = `**Competitive Landscape Breakdown:**\nDirect mass incumbents rely on inertia and broad brand awareness, but fail on personal craft. High-end bespoke alternatives impose prohibitive price tags and slow turnarounds. ${ventureName}'s proposed wedge ("${diff.slice(0, 50)}...") directly attacks this gap by offering high quality with modern, accessible distribution.`;
          specialistName = 'Venture Strategist';
          break;

        case 'Find Market Gaps':
          replyText = `**Strategic Whitespace Identified:**\nThe clearest unserved whitespace is the **Prime Opportunity Quadrant**—customers who demand verified quality and rapid time-to-value, but refuse to deal with enterprise bloat. This gap is currently vacant because incumbents treat this segment as too small for mass production and too accessible for boutique retainers.`;
          specialistName = 'Brand Strategist';
          break;

        case 'Analyze Customer Segments':
          replyText = `**Target Segment Dynamics:**\n1. **Core Adopters (${audience.slice(0, 30)}):** 92% fit. Experiencing active pain right now; purchase trigger is finding a dependable, transparent solution.\n2. **Discerning Practitioners:** 78% fit. Looking for unit margin or craft benchmarks.\n3. **Adjacent Curious Buyers:** 55% fit. Will adopt once word-of-mouth establishes social proof. Focus strictly on Core Adopters for initial beachhead.`;
          specialistName = 'Growth Specialist';
          break;

        case 'Challenge My Positioning':
          replyText = `**Challenger Red Team Critique:**\nHere is your real vulnerability: Customer inertia. If prospects have lived with this problem for months using free workarounds, why will they switch to ${ventureName} on Day 1? You must prove that your value proposition creates an immediate 10x perception shift within the first 60 seconds of onboarding.`;
          specialistName = 'Challenger / Red Team';
          break;

        case 'Explain Market Risk':
          replyText = `**Primary Market Failure Modes:**\n1. **Customer Switching Inertia (High Impact):** Overcoming status quo habits requires a friction-free trial or undeniable proof point.\n2. **Paid CAC Saturation (High Impact):** Bidding against established players will burn runway. You must build founder-led or community-driven acquisition loops before spending on broad digital ads.`;
          specialistName = 'Risk & Compliance Lead';
          break;

        case 'Identify Missing Evidence':
          replyText = `**Evidence Gaps to Validate:**\n1. Real customer willingness-to-pay has not been validated with pre-orders or deposit commitments.\n2. Competitive pricing moats require direct prospect interviews.\n3. Supplier SLAs and delivery turnaround need live test confirmation in your operating geography.`;
          specialistName = 'Evaluator';
          break;

        case 'Prepare Brand Inputs':
          replyText = `**Handoff to Stage 04 (Brand Roadmap):**\nMarket intelligence indicates your brand archetype should be **The Craftsman / Sage** (uncompromising quality + radical transparency). Your positioning statement must directly contrast against the opaque mass-market habit, establishing ${ventureName} as the authentic benchmark for ${audience}.`;
          specialistName = 'Brand Architect';
          break;

        default: {
          const councilResult = executeBusinessCouncilQuery({
            query: queryOrAction,
            projectState: state,
            stageId: 'market-intelligence',
            decisionHistory: state.decisions,
            externalConnections: state.externalConnections,
          });
          replyText = councilResult.replyText;
          specialistName = councilResult.isOffTopic
            ? 'Council Guardrail'
            : councilResult.isModification
            ? 'Council Intent Engine'
            : 'Multi-Agent Council';

          if (councilResult.isModification && councilResult.modificationPatch) {
            const { ideaPatch, businessModelPatch, recordedDecision } = councilResult.modificationPatch;
            setState((prev) => ({
              ...prev,
              idea: ideaPatch ? { ...prev.idea, ...ideaPatch } : prev.idea,
              businessModel: businessModelPatch ? { ...prev.businessModel, ...businessModelPatch } : prev.businessModel,
              decisions: recordedDecision ? [recordedDecision, ...(prev.decisions || [])] : prev.decisions,
              feasibility: undefined,
              marketIntelligence: undefined,
              brandRoadmap: undefined,
              buildArchitecture: undefined,
              execution: undefined,
              simulation: undefined,
              project: {
                ...prev.project,
                name: ideaPatch?.name || prev.project.name,
                updatedAt: new Date().toISOString(),
              },
            }));
          }
          break;
        }
      }

      const aiMsg: MarketSpecialistMessage = {
        id: `ai_${Date.now() + 1}`,
        sender: 'ai',
        specialistName,
        text: replyText,
        actionUsed: queryOrAction,
        timestamp: new Date().toISOString(),
      };

      setSpecialistMessages((prev) => [...prev, userMsg, aiMsg]);
    },
    [state]
  );

  const brandReport = useMemo(() => {
    const fresh = generateBrandRoadmapReport(state);
    if (state.brandRoadmap) {
      // Merge persisted report over a fresh one so caches written by older
      // schemas (missing newer keys like transformationRoadmap) can never
      // produce undefined arrays that crash Stage 04 consumers.
      return { ...fresh, ...state.brandRoadmap };
    }
    return fresh;
  }, [state]);

  const refreshBrandRoadmap = useCallback(() => {
    const fresh = generateBrandRoadmapReport(state);
    setState((prev) => ({
      ...prev,
      brandRoadmap: fresh,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          brandRoadmap: fresh,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, [state]);

  const saveBrandRoadmapReport = useCallback((report: BrandRoadmapReport) => {
    setState((prev) => ({
      ...prev,
      brandRoadmap: report,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          brandRoadmap: report,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const updateBrandPersonality = useCallback((traitId: string, userValue: number) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const updatedTraits = current.personalityTraits.map((t) =>
        t.id === traitId ? { ...t, userValue, isUserModified: true } : t
      );
      const updatedReport: BrandRoadmapReport = {
        ...current,
        personalityTraits: updatedTraits,
        brandBoard: {
          ...current.brandBoard,
          personalityProfile: updatedTraits.map((t) => `${t.leftLabel} vs ${t.rightLabel} (${t.userValue}%)`),
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const toggleBrandVoice = useCallback((attributeId: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const updatedAttributes = current.brandVoice.attributes.map((attr) =>
        attr.id === attributeId ? { ...attr, selected: !attr.selected } : attr
      );
      const selectedNames = updatedAttributes.filter((a) => a.selected).map((a) => a.name);
      const updatedReport: BrandRoadmapReport = {
        ...current,
        brandVoice: {
          ...current.brandVoice,
          attributes: updatedAttributes,
          preview: {
            ...current.brandVoice.preview,
            headline:
              selectedNames.length > 0
                ? `${selectedNames.slice(0, 2).join(' & ')}: The future of ${prev.project.name || 'our craft'}.`
                : current.brandVoice.preview.headline,
          },
        },
        brandBoard: {
          ...current.brandBoard,
          voiceCharacteristics: selectedNames,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const updatePositioningStatement = useCallback((field: keyof PositioningStatement, value: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const updatedPos: PositioningStatement = {
        ...current.positioningStatement,
        [field]: value,
      };
      updatedPos.fullStatement = `For ${updatedPos.forTarget}, who ${updatedPos.whoProblem}, our brand is a ${updatedPos.category} that ${updatedPos.valuePromise}, unlike ${updatedPos.unlikeAlternative}, because ${updatedPos.becauseDifferentiator}.`;

      const updatedReport: BrandRoadmapReport = {
        ...current,
        positioningStatement: updatedPos,
        brandBoard: {
          ...current.brandBoard,
          positioningStatement: updatedPos.fullStatement,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const selectDifferentiator = useCallback((differentiatorId: string, customText?: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const targetDiff = current.differentiatorChain.candidates.find((c) => c.id === differentiatorId);
      if (!targetDiff) return prev;

      const diffText = customText !== undefined ? customText : targetDiff.differentiator;

      const updatedCandidates = current.differentiatorChain.candidates.map((c) => ({
        ...c,
        differentiator: c.id === differentiatorId && customText ? customText : c.differentiator,
        isSelected: c.id === differentiatorId,
      }));

      const updatedPos: PositioningStatement = {
        ...current.positioningStatement,
        becauseDifferentiator: diffText,
      };
      updatedPos.fullStatement = `For ${updatedPos.forTarget}, who ${updatedPos.whoProblem}, our brand is a ${updatedPos.category} that ${updatedPos.valuePromise}, unlike ${updatedPos.unlikeAlternative}, because ${updatedPos.becauseDifferentiator}.`;

      const updatedNodes = current.brandDnaNodes.map((n) =>
        n.id === 'dna_diff'
          ? {
              ...n,
              value: diffText,
              evidenceState: (targetDiff.evidenceState === 'INFERRED' ? 'AI INFERENCE' : targetDiff.evidenceState) as BrandDNANode['evidenceState'],
            }
          : n
      );

      const updatedReport: BrandRoadmapReport = {
        ...current,
        differentiatorChain: {
          ...current.differentiatorChain,
          activeDifferentiatorId: differentiatorId,
          candidates: updatedCandidates,
        },
        positioningStatement: updatedPos,
        brandDnaNodes: updatedNodes,
        brandBoard: {
          ...current.brandBoard,
          positioningStatement: updatedPos.fullStatement,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const updateVoiceTransformation = useCallback((newVoiceMessage: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const updatedReport: BrandRoadmapReport = {
        ...current,
        brandVoice: {
          ...current.brandVoice,
          transformation: {
            ...current.brandVoice.transformation,
            brandVoiceMessage: newVoiceMessage,
          },
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const selectTagline = useCallback((taglineId: string, customText?: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const updatedDirections = current.taglineWorkspace.directions.map((d) => {
        if (d.id === taglineId) {
          return {
            ...d,
            tagline: customText !== undefined ? customText : d.tagline,
            isSelected: true,
          };
        }
        return { ...d, isSelected: false };
      });
      const selected = updatedDirections.find((d) => d.isSelected);
      const activeTagline = selected ? selected.tagline : current.taglineWorkspace.activeTagline;

      const updatedReport: BrandRoadmapReport = {
        ...current,
        taglineWorkspace: {
          ...current.taglineWorkspace,
          activeTagline,
          directions: updatedDirections,
        },
        brandBoard: {
          ...current.brandBoard,
          tagline: activeTagline,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const selectLogoConcept = useCallback((conceptId: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const targetConcept = current.logoGenerator.concepts.find((c) => c.id === conceptId);
      if (!targetConcept) return prev;

      const updatedConcepts = current.logoGenerator.concepts.map((c) => ({
        ...c,
        status: c.id === conceptId ? ('selected' as const) : ('candidate' as const),
      }));

      const updatedReport: BrandRoadmapReport = {
        ...current,
        logoGenerator: {
          ...current.logoGenerator,
          selectedConceptId: conceptId,
          concepts: updatedConcepts,
        },
        brandBoard: {
          ...current.brandBoard,
          selectedMark: targetConcept,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const customizeLogo = useCallback((customization: Partial<LogoConcept['customization']>) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const activeId = current.logoGenerator.selectedConceptId;
      const initials = (prev.idea?.name || prev.project?.name || 'TB').slice(0, 2).toUpperCase();
      const updatedConcepts = current.logoGenerator.concepts.map((c) => {
        if (c.id === activeId) {
          const mergedCustom = {
            ...c.customization,
            ...customization,
          };
          return {
            ...c,
            customization: mergedCustom,
            svgMarkup: generateLogoSvg(c.id, initials, mergedCustom),
          };
        }
        return c;
      });
      const selected = updatedConcepts.find((c) => c.id === activeId);

      const updatedReport: BrandRoadmapReport = {
        ...current,
        logoGenerator: {
          ...current.logoGenerator,
          concepts: updatedConcepts,
        },
        brandBoard: {
          ...current.brandBoard,
          selectedMark: selected || current.brandBoard.selectedMark,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const updateColorSwatch = useCallback((swatchId: string, hex: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const updatedSwatches = current.colorSystem.swatches.map((s) => {
        if (s.id === swatchId) {
          return { ...s, hex };
        }
        return s;
      });

      const updatedReport: BrandRoadmapReport = {
        ...current,
        colorSystem: {
          ...current.colorSystem,
          swatches: updatedSwatches,
        },
        brandBoard: {
          ...current.brandBoard,
          colorPalette: updatedSwatches,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  const selectTypography = useCallback((pairId: string) => {
    setState((prev) => {
      const current = prev.brandRoadmap || generateBrandRoadmapReport(prev);
      const targetPair = current.typographySystem.pairs.find((p) => p.id === pairId);
      if (!targetPair) return prev;

      const updatedReport: BrandRoadmapReport = {
        ...current,
        typographySystem: {
          ...current.typographySystem,
          selectedPairId: pairId,
        },
        brandBoard: {
          ...current.brandBoard,
          typography: targetPair,
        },
      };
      return {
        ...prev,
        brandRoadmap: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            brandRoadmap: updatedReport,
          },
        },
      };
    });
  }, []);

  // Stage 05 — Build & Architecture State & Specialist Chatbot
  const [buildSpecialistMessages, setBuildSpecialistMessages] = useState<BuildSpecialistMessage[]>(() => {
    try {
      const saved = localStorage.getItem(BUILD_SPECIALIST_MESSAGES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load build specialist messages:', e);
    }
    return [
      {
        id: 'msg_build_welcome',
        sender: 'specialist',
        text: "Welcome to the Build & Architecture Command Center.\n\nI have synthesized your complete upstream intelligence from Idea Lab, Feasibility, Market Intelligence, and Brand Roadmap into an actionable technical blueprint.\n\nSelect an action prompt below or ask any technical build question.",
        timestamp: new Date().toISOString(),
        actionLinks: [
          'Review Architecture Fit',
          'Challenge MVP Scope',
          'Database Schema Review',
          'API & Vendor Lock-in',
          'Estimate Build Complexity',
          'Validate Tech Stack Choices',
          'Identify Critical Blockers',
          'Prepare Execution Handoff',
        ],
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(BUILD_SPECIALIST_MESSAGES_KEY, JSON.stringify(buildSpecialistMessages));
    } catch (e) {
      console.error('Failed to save build specialist messages:', e);
    }
  }, [buildSpecialistMessages]);

  const buildReport = useMemo(() => {
    if (state.buildArchitecture) {
      return state.buildArchitecture;
    }
    return generateBuildArchitectureReport(state);
  }, [state]);

  const refreshBuildArchitecture = useCallback(() => {
    const fresh = generateBuildArchitectureReport(state);
    setState((prev) => ({
      ...prev,
      buildArchitecture: fresh,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          buildArchitecture: fresh,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, [state]);

  const saveBuildArchitectureReport = useCallback((report: BuildArchitectureReport) => {
    setState((prev) => ({
      ...prev,
      buildArchitecture: report,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          buildArchitecture: report,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const updateFeaturePriority = useCallback((featureId: string, priority: MVPFeaturePriority) => {
    setState((prev) => {
      const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
      const updatedFeatures = current.mvpScope.features.map((f) =>
        f.id === featureId ? { ...f, priority } : f
      );
      const updatedReport: BuildArchitectureReport = {
        ...current,
        mvpScope: {
          ...current.mvpScope,
          features: updatedFeatures,
          matrixSummary: {
            mustCount: updatedFeatures.filter((f) => f.priority === 'must').length,
            shouldCount: updatedFeatures.filter((f) => f.priority === 'should').length,
            couldCount: updatedFeatures.filter((f) => f.priority === 'could').length,
            notNowCount: updatedFeatures.filter((f) => f.priority === 'not_now').length,
            mvpEffortWeeks: Math.max(3, Math.round(updatedFeatures.filter((f) => f.priority === 'must').length * 1.2)),
          },
        },
      };
      return {
        ...prev,
        buildArchitecture: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            buildArchitecture: updatedReport,
          },
        },
      };
    });
  }, []);

  const updateFeatureDetails = useCallback((featureId: string, patch: Partial<MVPFeatureItem>) => {
    setState((prev) => {
      const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
      const updatedFeatures = current.mvpScope.features.map((f) =>
        f.id === featureId ? { ...f, ...patch } : f
      );
      const updatedReport: BuildArchitectureReport = {
        ...current,
        mvpScope: {
          ...current.mvpScope,
          features: updatedFeatures,
        },
      };
      return {
        ...prev,
        buildArchitecture: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            buildArchitecture: updatedReport,
          },
        },
      };
    });
  }, []);

  const addCustomFeature = useCallback((feature: Omit<MVPFeatureItem, 'id' | 'provenance'>) => {
    setState((prev) => {
      const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
      const newFeature: MVPFeatureItem = {
        ...feature,
        id: `feat_custom_${Date.now()}`,
        provenance: 'USER_PROVIDED',
      };
      const updatedFeatures = [...current.mvpScope.features, newFeature];
      const updatedReport: BuildArchitectureReport = {
        ...current,
        mvpScope: {
          ...current.mvpScope,
          features: updatedFeatures,
          matrixSummary: {
            mustCount: updatedFeatures.filter((f) => f.priority === 'must').length,
            shouldCount: updatedFeatures.filter((f) => f.priority === 'should').length,
            couldCount: updatedFeatures.filter((f) => f.priority === 'could').length,
            notNowCount: updatedFeatures.filter((f) => f.priority === 'not_now').length,
            mvpEffortWeeks: Math.max(3, Math.round(updatedFeatures.filter((f) => f.priority === 'must').length * 1.2)),
          },
        },
      };
      return {
        ...prev,
        buildArchitecture: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            buildArchitecture: updatedReport,
          },
        },
      };
    });
  }, []);

  const updateTechStackItem = useCallback((itemId: string, selectedTech: string) => {
    setState((prev) => {
      const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
      const updatedItems = current.techStack.items.map((item) =>
        item.id === itemId ? { ...item, currentTech: selectedTech, provenance: 'USER_PROVIDED' as const } : item
      );
      const updatedReport: BuildArchitectureReport = {
        ...current,
        techStack: {
          ...current.techStack,
          items: updatedItems,
        },
      };
      return {
        ...prev,
        buildArchitecture: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            buildArchitecture: updatedReport,
          },
        },
      };
    });
  }, []);

  const toggleBuildTask = useCallback((taskId: string) => {
    setState((prev) => {
      const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
      const updatedPhases = current.roadmap.phases.map((phase) => ({
        ...phase,
        tasks: phase.tasks.map((task) =>
          task.id === taskId
            ? { ...task, status: (task.status === 'DONE' ? 'TODO' : 'DONE') as 'TODO' | 'DONE' }
            : task
        ),
      }));
      const totalTasks = updatedPhases.reduce((acc, p) => acc + p.tasks.length, 0);
      const completedTasks = updatedPhases.reduce(
        (acc, p) => acc + p.tasks.filter((t) => t.status === 'DONE').length,
        0
      );
      const updatedReport: BuildArchitectureReport = {
        ...current,
        roadmap: {
          ...current.roadmap,
          phases: updatedPhases,
          totalTasksCount: totalTasks,
          completedTasksCount: completedTasks,
        },
      };
      return {
        ...prev,
        buildArchitecture: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            buildArchitecture: updatedReport,
          },
        },
      };
    });
  }, []);

  const addCustomBuildTask = useCallback(
    (task: { phaseId: string; title: string; rationale: string; priority: 'High' | 'Medium' | 'Low'; roleOwner: string }) => {
      setState((prev) => {
        const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
        const newTask = {
          id: `task_custom_${Date.now()}`,
          phaseId: task.phaseId,
          title: task.title,
          rationale: task.rationale,
          dependencies: [],
          estimatedComplexity: 'Medium' as const,
          priority: task.priority,
          roleOwner: task.roleOwner,
          status: 'TODO' as const,
          relatedFeature: 'Custom Task',
          isCustom: true,
        };
        const updatedPhases = current.roadmap.phases.map((phase) =>
          phase.id === task.phaseId ? { ...phase, tasks: [...phase.tasks, newTask] } : phase
        );
        const totalTasks = updatedPhases.reduce((acc, p) => acc + p.tasks.length, 0);
        const completedTasks = updatedPhases.reduce(
          (acc, p) => acc + p.tasks.filter((t) => t.status === 'DONE').length,
          0
        );
        const updatedReport: BuildArchitectureReport = {
          ...current,
          roadmap: {
            ...current.roadmap,
            phases: updatedPhases,
            totalTasksCount: totalTasks,
            completedTasksCount: completedTasks,
          },
        };
        return {
          ...prev,
          buildArchitecture: updatedReport,
          workflow: {
            ...prev.workflow,
            stageOutputs: {
              ...prev.workflow.stageOutputs,
              buildArchitecture: updatedReport,
            },
          },
        };
      });
    },
    []
  );

  const moveBuildDecision = useCallback((decisionId: string, targetQuadrant: BuildDecisionQuadrant) => {
    setState((prev) => {
      const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
      const updatedDecisions = current.decisionBoard.decisions.map((d) =>
        d.id === decisionId ? { ...d, quadrant: targetQuadrant, provenance: 'USER_PROVIDED' as const } : d
      );
      const updatedReport: BuildArchitectureReport = {
        ...current,
        decisionBoard: {
          ...current.decisionBoard,
          decisions: updatedDecisions,
        },
      };
      return {
        ...prev,
        buildArchitecture: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            buildArchitecture: updatedReport,
          },
        },
      };
    });
  }, []);

  const addBuildDecision = useCallback(
    (decision: { title: string; quadrant: BuildDecisionQuadrant; connectedFeature: string; assumption: string }) => {
      setState((prev) => {
        const current = prev.buildArchitecture || generateBuildArchitectureReport(prev);
        const newDecision = {
          id: `dec_custom_${Date.now()}`,
          title: decision.title,
          quadrant: decision.quadrant,
          connectedFeature: decision.connectedFeature,
          assumption: decision.assumption,
          evidence: 'Founder logged decision',
          provenance: 'USER_PROVIDED' as const,
        };
        const updatedReport: BuildArchitectureReport = {
          ...current,
          decisionBoard: {
            ...current.decisionBoard,
            decisions: [...current.decisionBoard.decisions, newDecision],
          },
        };
        return {
          ...prev,
          buildArchitecture: updatedReport,
          workflow: {
            ...prev.workflow,
            stageOutputs: {
              ...prev.workflow.stageOutputs,
              buildArchitecture: updatedReport,
            },
          },
        };
      });
    },
    []
  );

  const sendBuildSpecialistQuery = useCallback(
    (queryOrAction: string) => {
      const ventureName = state.idea.name || state.project.name || 'Untitled Venture';
      const isPhysical = state.businessModel.productType === 'physical';

      const userMsg: BuildSpecialistMessage = {
        id: `user_bmsg_${Date.now()}`,
        sender: 'user',
        text: queryOrAction,
        timestamp: new Date().toISOString(),
      };

      let replyText = '';

      switch (queryOrAction) {
        case 'Review Architecture Fit':
          replyText = isPhysical
            ? `**Architecture Fit Analysis for ${ventureName} (Physical D2C):**\nYour Jamstack Headless Storefront paired with Next.js edge functions and Supabase PostgreSQL is ideal. It decouples high-traffic browsing from transactional inventory reservations, ensuring the site remains sub-second fast on mobile without server crashes during marketing surges.`
            : `**Architecture Fit Analysis for ${ventureName} (SaaS):**\nYour edge-ingested event buffer + PostgreSQL/ClickHouse architecture is well-suited. Decoupling HTTP beacon ingestion (<20ms) from analytical multi-touch queries guarantees your clients never experience page slowdowns from your tracking script.`;
          break;

        case 'Challenge MVP Scope':
          replyText = `**MVP Scope Challenge:**\nYou currently have ${buildReport.mvpScope.matrixSummary.mustCount} Must-Have features estimated at ~${buildReport.mvpScope.matrixSummary.mvpEffortWeeks} weeks of engineering effort.\n\n*Strategic Recommendation:* Resist adding advanced predictive ML or wholesale B2B portals until at least 25 customers have actively completed the core loop. Cut any feature that does not directly validate customer willingness to pay.`;
          break;

        case 'Database Schema Review':
          replyText = isPhysical
            ? `**Data Schema Audit:**\nYour 4 core entities (Customer, ProductVariant, RoasterBatch, Order) enforce strict referential integrity. Ensure you add an atomic inventory decrement lock (\`UPDATE roaster_batches SET inventory = inventory - 1 WHERE id = ... AND inventory > 0\`) to eliminate double-selling during flash drops.`
            : `**Data Schema Audit:**\nYour multi-tenant schema with \`org_id\` foreign keys on \`TrackingEvent\` is solid. Ensure PostgreSQL Row-Level Security (RLS) is enabled and you create a composite index on \`(org_id, timestamp DESC)\` to keep time-range dashboard queries sub-50ms.`;
          break;

        case 'API & Vendor Lock-in':
          replyText = `**Vendor Lock-in Audit:**\n• **Stripe:** Moderate lock-in (card tokens), but industry-standard with portable export rights.\n• **Supabase (Postgres):** Zero lock-in (standard SQL dump can be restored on any AWS RDS or local Docker instance).\n• **Resend:** Low lock-in; swapping to Postmark or SES requires only updating one API key and SMTP helper function.`;
          break;

        case 'Estimate Build Complexity':
          replyText = `**Build Complexity & Timeline:**\nYour critical path spans ${buildReport.dependencyGraph.totalEstimatedBuildDays} working days (~4.5 weeks) across ${buildReport.roadmap.totalTasksCount} granular roadmap tasks.\n\n*Critical Bottleneck:* The primary risk lies in the third-party payment & webhook reconciliation phase. Build the end-to-end checkout loop first before polishing secondary settings screens.`;
          break;

        case 'Validate Tech Stack Choices':
          replyText = `**Tech Stack Audit:**\n• **Next.js 15:** Excellent for SEO + developer velocity.\n• **Tailwind CSS:** Eliminates CSS bundle bloat.\n• **PostgreSQL:** Uncompromising ACID transaction guarantees.\n• **PostHog:** Full telemetry instrumentation with zero upfront software licensing cost.\n\n*Verdict:* 100% appropriate for an early-stage startup targeting capital efficiency and velocity.`;
          break;

        case 'Identify Critical Blockers':
          replyText = buildReport.handoff.blockingItems.length > 0
            ? `**Active Build Blockers for ${ventureName}:**\n${buildReport.handoff.blockingItems.map((b, i) => `${i + 1}. ${b}`).join('\n')}\n\nResolve these inputs to unlock Stage 06 — Execution Intelligence.`
            : `**No Critical Blockers Detected!** All 12 operational criteria for Stage 06 handoff are satisfied. Your build readiness score is ${buildReport.handoff.readinessScore}%.`;
          break;

        case 'Prepare Execution Handoff':
          replyText = `**Handoff to Stage 06 (Execution Intelligence):**\nYour engineering specifications, MoSCoW MVP feature backlog, relational schemas, and 6-phase roadmap are ready. Once you review and lock your tech stack and task owners, you can proceed directly to sprint planning and resource allocation.`;
          break;

        default: {
          const councilResult = executeBusinessCouncilQuery({
            query: queryOrAction,
            projectState: state,
            stageId: 'build',
            decisionHistory: state.decisions,
            externalConnections: state.externalConnections,
          });
          replyText = councilResult.replyText;

          if (councilResult.isModification && councilResult.modificationPatch) {
            const { ideaPatch, businessModelPatch, recordedDecision } = councilResult.modificationPatch;
            setState((prev) => ({
              ...prev,
              idea: ideaPatch ? { ...prev.idea, ...ideaPatch } : prev.idea,
              businessModel: businessModelPatch ? { ...prev.businessModel, ...businessModelPatch } : prev.businessModel,
              decisions: recordedDecision ? [recordedDecision, ...(prev.decisions || [])] : prev.decisions,
              project: {
                ...prev.project,
                name: ideaPatch?.name || prev.project.name,
                updatedAt: new Date().toISOString(),
              },
            }));
          }
          break;
        }
      }

      const aiMsg: BuildSpecialistMessage = {
        id: `spec_bmsg_${Date.now() + 1}`,
        sender: 'specialist',
        text: replyText,
        timestamp: new Date().toISOString(),
      };

      setBuildSpecialistMessages((prev) => [...prev, userMsg, aiMsg]);
    },
    [state, buildReport]
  );

  const [executionSpecialistMessages, setExecutionSpecialistMessages] = useState<ExecutionSpecialistMessage[]>(() => {
    try {
      const saved = localStorage.getItem(EXECUTION_SPECIALIST_MESSAGES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load execution specialist messages from storage:', e);
    }
    return [
      {
        id: 'exec_spec_welcome',
        sender: 'specialist',
        text: "Welcome to Stage 06: Resource & Execution Intelligence.\n\nI analyze your upstream specifications to provide real, location-grounded procurement pathways, verified suppliers, infrastructure setup, distribution pipelines, and tactical execution checklists.\n\nYou can ask contextual questions on any resource or test fallback strategies.",
        timestamp: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(EXECUTION_SPECIALIST_MESSAGES_KEY, JSON.stringify(executionSpecialistMessages));
    } catch (e) {
      console.error('Failed to save execution specialist messages:', e);
    }
  }, [executionSpecialistMessages]);

  const executionReport = useMemo(() => {
    if (state.execution) {
      return state.execution;
    }
    return generateExecutionReport(state);
  }, [state]);

  const refreshExecution = useCallback(() => {
    const fresh = generateExecutionReport(state);
    setState((prev) => ({
      ...prev,
      execution: fresh,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          execution: fresh,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, [state]);

  const saveExecutionReport = useCallback((report: ExecutionReport) => {
    setState((prev) => ({
      ...prev,
      execution: report,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          execution: report,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const toggleExecutionTask = useCallback((taskId: string) => {
    setState((prev) => {
      const current = prev.execution || generateExecutionReport(prev);
      const updatedTasks = current.synthesis.checklist.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      );
      const updatedReport: ExecutionReport = {
        ...current,
        synthesis: {
          ...current.synthesis,
          checklist: updatedTasks,
        },
      };
      return {
        ...prev,
        execution: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            execution: updatedReport,
          },
        },
      };
    });
  }, []);

  const addCustomExecutionTask = useCallback(
    (task: { title: string; assignedCategory: string; dueDateLabel: string }) => {
      setState((prev) => {
        const current = prev.execution || generateExecutionReport(prev);
        const newTask: ExecutionTaskItem = {
          id: `task_custom_${Date.now()}`,
          phaseNumber: 1,
          phaseLabel: 'Custom Founder Action',
          title: task.title,
          description: `Founder-specified execution milestone for ${task.assignedCategory}.`,
          assignedCategory: task.assignedCategory,
          isCompleted: false,
          isCustom: true,
          dueDateLabel: task.dueDateLabel,
        };
        const updatedTasks = [newTask, ...current.synthesis.checklist];
        const updatedReport: ExecutionReport = {
          ...current,
          synthesis: {
            ...current.synthesis,
            checklist: updatedTasks,
          },
        };
        return {
          ...prev,
          execution: updatedReport,
          workflow: {
            ...prev.workflow,
            stageOutputs: {
              ...prev.workflow.stageOutputs,
              execution: updatedReport,
            },
          },
        };
      });
    },
    []
  );

  const toggleSaveResource = useCallback((resourceId: string) => {
    setState((prev) => {
      const current = prev.execution || generateExecutionReport(prev);
      const updatedItems = current.synthesis.procurementMap.items.map((item) =>
        item.id === resourceId ? { ...item, isSaved: !item.isSaved } : item
      );
      const updatedReport: ExecutionReport = {
        ...current,
        synthesis: {
          ...current.synthesis,
          procurementMap: {
            ...current.synthesis.procurementMap,
            items: updatedItems,
          },
        },
      };
      return {
        ...prev,
        execution: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            execution: updatedReport,
          },
        },
      };
    });
  }, []);

  const addResourceToPlan = useCallback((resourceId: string) => {
    setState((prev) => {
      const current = prev.execution || generateExecutionReport(prev);
      const updatedItems = current.synthesis.procurementMap.items.map((item) =>
        item.id === resourceId ? { ...item, addedToPlan: !item.addedToPlan } : item
      );
      const updatedReport: ExecutionReport = {
        ...current,
        synthesis: {
          ...current.synthesis,
          procurementMap: {
            ...current.synthesis.procurementMap,
            items: updatedItems,
          },
        },
      };
      return {
        ...prev,
        execution: updatedReport,
        workflow: {
          ...prev.workflow,
          stageOutputs: {
            ...prev.workflow.stageOutputs,
            execution: updatedReport,
          },
        },
      };
    });
  }, []);

  const sendExecutionSpecialistQuery = useCallback(
    (queryOrAction: string, resourceId?: string) => {
      const userMsg: ExecutionSpecialistMessage = {
        id: `exec_spec_msg_${Date.now()}`,
        sender: 'user',
        text: queryOrAction,
        timestamp: new Date().toISOString(),
        resourceId,
      };

      const targetResource = resourceId
        ? executionReport.synthesis.procurementMap.items.find((r) => r.id === resourceId)
        : undefined;

      let replyText = '';
      const ventureName = state.idea.name || state.project.name || 'Untitled Venture';
      const loc = state.businessModel.location?.cityRegion || state.businessModel.location?.country || 'the region';

      if (targetResource) {
        switch (queryOrAction) {
          case 'Why do I need this resource?':
            replyText = `**Relevance of ${targetResource.name} (${targetResource.categoryLabel}):**\n${targetResource.whyRelevant}\n\n**Operational Purpose:** ${targetResource.purpose}\n**Technical Spec:** ${targetResource.specification}`;
            break;
          case 'Find alternatives':
          case 'Show cheaper/local alternatives':
            replyText = `**Fallback & Alternative Strategy for ${targetResource.name}:**\n${targetResource.fallbackAlternative || 'Procure through secondary regional trade exchanges or audited contract directories.'}\n\n*Budget Estimate:* ${targetResource.estimatedBudgetRange || 'Variable based on order quantity'}\n*Lead Time:* ~${targetResource.leadTimeWeeks} weeks.`;
            break;
          case 'Why this supplier?':
            replyText = `**Supplier Audit for ${targetResource.name}:**\n• **Location:** ${targetResource.location} (${targetResource.isLocalToVenture ? 'Local cluster advantage' : 'National specialized provider'})\n• **Verification:** ${targetResource.verificationStatus.replace(/_/g, ' ')}\n• **Source Evidence:** ${targetResource.sourceEvidence}\n• **Contact:** ${targetResource.phone || targetResource.website || 'Direct enquiry recommended'}`;
            break;
          case 'What happens if this resource is unavailable?':
            replyText = `**Supply Chain Risk Assessment:**\nIf ${targetResource.name} encounters supply disruption or lead time delays:\n1. **Impact:** Halts Phase ${targetResource.priority === 'DAY_1_CRITICAL' ? '1 launch sequence' : '2 expansion'}.\n2. **Immediate Contingency:** Switch to "${targetResource.fallbackAlternative || 'Pre-vetted regional contract network'}".\n3. **Buffer Recommendation:** Maintain a ${targetResource.leadTimeWeeks * 1.5}-week buffer stock.`;
            break;
          default:
            replyText = `**Analysis for ${targetResource.name} (${targetResource.categoryLabel}):**\n${queryOrAction}\n\n*Key Factor:* ${targetResource.whyRelevant} Located at ${targetResource.location}. Source: ${targetResource.sourceEvidence}.`;
            break;
        }
      } else {
        replyText = `**Execution Intelligence for ${ventureName} (${loc}):**\nRegarding "${queryOrAction}": Your procurement map tracks ${executionReport.synthesis.procurementMap.items.length} vetted resources across ${executionReport.synthesis.procurementMap.totalCategoriesCount} operational categories, with ${executionReport.synthesis.procurementMap.day1CriticalCount} flagged as Day 1 Critical.\n\nAll recommendations are calibrated to your ${executionReport.modality.toUpperCase()} venture architecture and ${loc} geographical cluster.`;
      }

      const aiMsg: ExecutionSpecialistMessage = {
        id: `exec_spec_msg_${Date.now() + 1}`,
        sender: 'specialist',
        text: replyText,
        timestamp: new Date().toISOString(),
        resourceId,
      };

      setExecutionSpecialistMessages((prev) => [...prev, userMsg, aiMsg]);
    },
    [state, executionReport]
  );

  const simulationReport = useMemo(() => {
    if (state.simulation) {
      return state.simulation;
    }
    return generateSimulationReport(state);
  }, [state]);

  const refreshSimulation = useCallback(() => {
    const fresh = generateSimulationReport(state);
    setState((prev) => ({
      ...prev,
      simulation: fresh,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          simulation: fresh,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, [state]);

  const saveSimulationReport = useCallback((report: SimulationReport) => {
    setState((prev) => ({
      ...prev,
      simulation: report,
      workflow: {
        ...prev.workflow,
        stageOutputs: {
          ...prev.workflow.stageOutputs,
          simulation: report,
        },
      },
      project: {
        ...prev.project,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  // Stage 06 Execution Assisted Service Requests
  const [requestedServices, setRequestedServices] = useState<Record<string, {
    status: 'REQUESTED' | 'WAITLISTED';
    notes?: string;
    requestedAt: string;
  }>>(() => {
    try {
      const saved = localStorage.getItem('tbm_requested_services_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  const requestService = useCallback((serviceId: string, status: 'REQUESTED' | 'WAITLISTED', notes?: string) => {
    setRequestedServices((prev) => {
      const updated = {
        ...prev,
        [serviceId]: {
          status,
          notes,
          requestedAt: new Date().toISOString(),
        },
      };
      try {
        localStorage.setItem('tbm_requested_services_v1', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        state,
        messages,
        feasibilityReport,
        marketReport,
        specialistMessages,
        brandReport,
        updateProject,
        updateIdea,
        updateBusinessModel,
        setProductType,
        setLocation,
        setDeliveryModel,
        setCustomerType,
        addOpenQuestion,
        removeOpenQuestion,
        markStageCompleted,
        isStageUnlocked,
        addMessage,
        resetProject,
        hasMinimumDiscovery,
        recordDecision,
        updateExternalConnections,
        queryCouncil,
        refreshFeasibility,
        saveFeasibilityReport,
        toggleValidationTask,
        addCustomValidationTask,
        refreshMarketIntelligence,
        saveMarketIntelligenceReport,
        addCompetitor,
        updatePositioningAxes,
        sendSpecialistQuery,
        loadSampleVenture,
        refreshBrandRoadmap,
        saveBrandRoadmapReport,
        updateBrandPersonality,
        toggleBrandVoice,
        updatePositioningStatement,
        selectDifferentiator,
        updateVoiceTransformation,
        selectTagline,
        selectLogoConcept,
        customizeLogo,
        updateColorSwatch,
        selectTypography,
        buildReport,
        refreshBuildArchitecture,
        saveBuildArchitectureReport,
        updateFeaturePriority,
        updateFeatureDetails,
        addCustomFeature,
        updateTechStackItem,
        toggleBuildTask,
        addCustomBuildTask,
        moveBuildDecision,
        addBuildDecision,
        sendBuildSpecialistQuery,
        buildSpecialistMessages,
        executionReport,
        refreshExecution,
        saveExecutionReport,
        toggleExecutionTask,
        addCustomExecutionTask,
        toggleSaveResource,
        addResourceToPlan,
        executionSpecialistMessages,
        sendExecutionSpecialistQuery,
        simulationReport,
        refreshSimulation,
        saveSimulationReport,
        requestedServices,
        requestService,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// oxlint-disable-next-line react/only-export-components
export const useProject = (): ProjectContextValue => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
