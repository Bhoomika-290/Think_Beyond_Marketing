import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Package, Cpu } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { generateExecutionReport } from '../services/executionEngine';
import { ExecutionHeader } from '../components/execution/ExecutionHeader';
import { ExecutionOverview } from '../components/execution/ExecutionOverview';
import { SupplyChainRelationshipFlow } from '../components/execution/SupplyChainRelationshipFlow';
import { NearbyResourcesMapView } from '../components/execution/NearbyResourcesMapView';
import { ResourceProcurementMap } from '../components/execution/ResourceProcurementMap';
import { SoftwareExecutionWorkspace } from '../components/execution/SoftwareExecutionWorkspace';
import { SalesDistributionView } from '../components/execution/SalesDistributionView';
import { MarketingAcquisitionView } from '../components/execution/MarketingAcquisitionView';
import { ExecutionChecklist } from '../components/execution/ExecutionChecklist';
import { PremiumServicesSection } from '../components/execution/PremiumServicesSection';

export const ExecutionPage: React.FC = () => {
  const {
    state,
    executionReport,
    refreshExecution,
    toggleExecutionTask,
    addCustomExecutionTask,
    toggleSaveResource,
    addResourceToPlan,
    executionSpecialistMessages,
    sendExecutionSpecialistQuery,
  } = useProject();

  // Dynamic pathway state (Physical vs Software)
  const defaultPathway: 'physical' | 'software' = 
    (executionReport.modality === 'software' || 
     state.businessModel?.productType === 'saas' || 
     state.businessModel?.productType === 'marketplace')
      ? 'software'
      : 'physical';

  const [activePathway, setActivePathway] = useState<'physical' | 'software'>(defaultPathway);

  // Compute active report based on chosen pathway
  const activeReport = useMemo(() => {
    if (activePathway === 'physical' && (executionReport.modality === 'physical' || executionReport.modality === 'hybrid')) {
      return executionReport;
    }
    if (activePathway === 'software' && executionReport.modality === 'software') {
      return executionReport;
    }
    return generateExecutionReport(state, activePathway);
  }, [state, executionReport, activePathway]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* 1. Execution Header & KPI Strip */}
      <ExecutionHeader
        report={activeReport}
        onRefresh={refreshExecution}
      />

      {/* Pathway Switcher Strip */}
      <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-semibold">
            Execution Pathway:
          </span>
          <span className="text-xs text-[#1E293B] font-bold">
            {activePathway === 'physical' ? 'Physical / Hardware Product' : 'Software / SaaS / Digital Product'}
          </span>
        </div>

        {/* Pathway Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-lg border border-[#E5DFD5]">
          <button
            type="button"
            onClick={() => setActivePathway('physical')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activePathway === 'physical'
                ? 'bg-[#1E40AF] text-white shadow-2xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>1. Physical / Hardware</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePathway('software')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activePathway === 'software'
                ? 'bg-[#1E40AF] text-white shadow-2xs'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>2. Software / SaaS</span>
          </button>
        </div>
      </div>

      {/* 2. Top — Visual Execution Flow (SOURCE → BUILD → QA → DISTRIBUTE → SELL → PROMOTE or PLAN → DEVELOP → HOST → DEPLOY → MAINTAIN → ACQUIRE) */}
      <ExecutionOverview
        report={activeReport}
      />

      {/* =========================================================================
          PATHWAY 1: PHYSICAL / HARDWARE EXECUTION
          ========================================================================= */}
      {activePathway === 'physical' && (
        <>
          {/* Physical Supply Chain Relationship Node Flow */}
          <SupplyChainRelationshipFlow
            report={activeReport}
          />

          {/* Location-Aware Nearby / Relevant Resources Map View */}
          <NearbyResourcesMapView
            report={activeReport}
          />

          {/* Physical Procurement & Sourcing Map (Table / Cards) */}
          <ResourceProcurementMap
            report={activeReport}
            onToggleSave={toggleSaveResource}
            onAddToPlan={addResourceToPlan}
            messages={executionSpecialistMessages}
            onSendQuery={sendExecutionSpecialistQuery}
          />
        </>
      )}

      {/* =========================================================================
          PATHWAY 2: SOFTWARE / SAAS EXECUTION
          ========================================================================= */}
      {activePathway === 'software' && (
        <>
          {/* Software Architecture Flow, Infrastructure Cards, and Comparison Table */}
          <SoftwareExecutionWorkspace
            report={activeReport}
            onToggleSave={toggleSaveResource}
            onAddToPlan={addResourceToPlan}
            messages={executionSpecialistMessages}
            onSendQuery={sendExecutionSpecialistQuery}
          />
        </>
      )}

      {/* 5. Selling + Distribution (WHERE CAN I SELL?) */}
      <SalesDistributionView
        report={activeReport}
      />

      {/* 6. Advertising & Customer Acquisition (HOW TO REACH CUSTOMERS: LOCAL / OFFLINE vs DIGITAL) */}
      <MarketingAcquisitionView
        report={activeReport}
      />

      {/* 7. 60-Day Tactical Execution Checklist */}
      <ExecutionChecklist
        report={activeReport}
        onToggleTask={toggleExecutionTask}
        onAddTask={addCustomExecutionTask}
      />

      {/* 8. Premium Services (Transparent Assisted Execution) */}
      <PremiumServicesSection
        report={activeReport}
      />

      {/* Bottom Stage Navigation Handoff */}
      <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <Link
          to="/build"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Stage 05 // Build & Architecture</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-[#1E293B]">
              Stage 06 Execution Intelligence Complete
            </div>
            <div className="text-[11px] text-[#64748B]">
              Ready for Stage 07 Financial & Market Simulation
            </div>
          </div>

          <Link
            to="/simulation"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Proceed to Stage 07 // Simulation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
