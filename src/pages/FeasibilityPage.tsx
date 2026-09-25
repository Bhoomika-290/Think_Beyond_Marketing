import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { FeasibilityHeader } from '../components/feasibility/FeasibilityHeader';
import { FeasibilityOverview } from '../components/feasibility/FeasibilityOverview';
import { FeasibilityMatrix } from '../components/feasibility/FeasibilityMatrix';
import { RiskMatrix } from '../components/feasibility/RiskMatrix';
import { AssumptionsAndQuestions } from '../components/feasibility/AssumptionsAndQuestions';
import { FeasibilityEvidenceLedger } from '../components/feasibility/FeasibilityEvidenceLedger';
import { ValidationPlan } from '../components/feasibility/ValidationPlan';
import { DecisionAndHandoff } from '../components/feasibility/DecisionAndHandoff';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeasibilityPage: React.FC = () => {
  const {
    state,
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
        <div className="p-4 rounded-lg bg-[#FDFCF8] border border-[#8A6D2B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#8A6D2B] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-[#2B3D4F]">
                Preliminary Discovery Notice
              </div>
              <p className="text-xs text-[#4A5E73] mt-0.5 leading-relaxed">
                Stage 01 Idea Lab has minimal input. The engine is running on initial defaults. To see full personalized analysis, complete Stage 01 or load a pre-configured seed case.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={() => loadSampleVenture('skincare_d2c')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            >
              🌿 Skincare D2C
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('restaurant_ai')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            >
              ⚡ Restaurant AI
            </button>
            <button
              type="button"
              onClick={() => loadSampleVenture('tutoring_marketplace')}
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F] border border-[#DDD5C5] transition-colors"
            >
              🎓 Tutoring Mkt
            </button>
            <Link
              to="/idea-lab"
              className="text-xs font-mono px-3 py-1.5 rounded bg-[#2B3D4F] text-white hover:bg-[#3E5770] transition-colors inline-flex items-center gap-1"
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
      <RiskMatrix
        risks={feasibilityReport.risks}
        tasks={feasibilityReport.validationTasks}
        onAddTask={(task) => addCustomValidationTask(task)}
      />

      {/* Section 04 & 05: Core Assumptions & Open Questions */}
      <AssumptionsAndQuestions
        assumptions={feasibilityReport.assumptions}
        openQuestions={feasibilityReport.openQuestions}
        dimensions={feasibilityReport.dimensions}
      />

      {/* Section 04b: Evidence Ledger */}
      <FeasibilityEvidenceLedger
        report={feasibilityReport}
        updatedAt={state.project.updatedAt}
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
