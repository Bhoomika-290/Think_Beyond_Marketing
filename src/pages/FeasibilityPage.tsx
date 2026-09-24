import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { FeasibilityHeader } from '../components/feasibility/FeasibilityHeader';
import { FeasibilityOverview } from '../components/feasibility/FeasibilityOverview';
import { FeasibilityMatrix } from '../components/feasibility/FeasibilityMatrix';
import { RiskMatrix } from '../components/feasibility/RiskMatrix';
import { AssumptionsAndQuestions } from '../components/feasibility/AssumptionsAndQuestions';
import { ValidationPlan } from '../components/feasibility/ValidationPlan';
import { DecisionAndHandoff } from '../components/feasibility/DecisionAndHandoff';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeasibilityPage: React.FC = () => {
  const {
    feasibilityReport,
    refreshFeasibility,
    toggleValidationTask,
    addCustomValidationTask,
    hasMinimumDiscovery,
    loadSampleVenture,
  } = useProject();

  const [selectedDimensionId, setSelectedDimensionId] = useState<string | null>(null);

  const handleSelectDimension = (dimensionId: string) => {
    setSelectedDimensionId(dimensionId === selectedDimensionId ? null : dimensionId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Stage Header */}
      <FeasibilityHeader onRefresh={refreshFeasibility} />

      {/* Advisory Notice if user came before filling Idea Lab */}
      {!hasMinimumDiscovery && (
        <div className="p-4 rounded-lg bg-[#111823] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-[#F3F4F6]">
                Preliminary Discovery Notice
              </div>
              <p className="text-xs text-[#AAB4C3] mt-0.5 leading-relaxed">
                Stage 01 Idea Lab has minimal input. The engine is running on initial defaults. To see full personalized analysis, complete Stage 01 or load a pre-configured seed case.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => loadSampleVenture('coffee_d2c')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
            >
              ☕ Sample D2C
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('ai_saas')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] transition-colors"
            >
              ⚡ Sample SaaS
            </button>
            <Link
              to="/idea-lab"
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#4D8DFF] text-white hover:bg-[#6EA8FF] transition-colors inline-flex items-center gap-1"
            >
              Complete Idea Lab <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Section 01: Executive Intelligence & Integrity Overview */}
      <FeasibilityOverview report={feasibilityReport} />

      {/* Section 02: 9-Dimension Deep Dive Matrix */}
      <FeasibilityMatrix
        report={feasibilityReport}
        selectedDimensionId={selectedDimensionId}
        onSelectDimension={handleSelectDimension}
      />

      {/* Section 03: Categorized Risks Analysis */}
      <RiskMatrix risks={feasibilityReport.risks} />

      {/* Section 04 & 05: Core Assumptions & Open Questions */}
      <AssumptionsAndQuestions
        assumptions={feasibilityReport.assumptions}
        openQuestions={feasibilityReport.openQuestions}
      />

      {/* Section 06: Founder Validation Action Plan */}
      <ValidationPlan
        tasks={feasibilityReport.validationTasks}
        onToggleTask={toggleValidationTask}
        onAddTask={addCustomValidationTask}
      />

      {/* Section 07: Decision Summary & Stage 03 Handoff */}
      <DecisionAndHandoff report={feasibilityReport} />
    </div>
  );
};
