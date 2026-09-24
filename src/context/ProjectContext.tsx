import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
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
} from '../types/project';
import { STAGES } from '../types/project';

const STORAGE_KEY = 'think_beyond_marketing_project_state_v1';
const MESSAGES_KEY = 'think_beyond_marketing_messages_v1';

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

  const updateIdea = (partial: Partial<IdeaData>) => {
    setState((prev) => {
      const newIdea = { ...prev.idea, ...partial };
      let projectName = prev.project.name;
      if (partial.name && partial.name.trim()) {
        projectName = partial.name;
      } else if (prev.project.name === 'Untitled Venture' && partial.rawInput && partial.rawInput.trim()) {
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
      const completedStages = alreadyCompleted
        ? prev.workflow.completedStages
        : [...prev.workflow.completedStages, stageId];
      
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

  return (
    <ProjectContext.Provider
      value={{
        state,
        messages,
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
