import React, { useState } from 'react';
import { ArrowRight, Monitor, Server, Database, Activity } from 'lucide-react';
import type { ProductJourneySystem, ProductJourneyStep } from '../../types/project';

interface ProductUserFlowProps {
  userJourney: ProductJourneySystem;
}

export const ProductUserFlow: React.FC<ProductUserFlowProps> = ({ userJourney }) => {
  const { steps, criticalDropoffRisk } = userJourney;
  const [selectedStep, setSelectedStep] = useState<ProductJourneyStep | null>(steps[0] || null);

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 08 — User Flow &amp; Engineering Lifecycle
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              {steps.length} STEPS
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">
            Translates Stage 04 Customer Experience into concrete screens, API requests, and telemetry success triggers.
          </p>
        </div>

        <span className="text-xs font-mono text-[#60738F]">
          Critical Drop-off Risk: {criticalDropoffRisk}
        </span>
      </div>

      {/* Horizontal Steps Bar */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-[850px]">
          {steps.map((step, idx) => {
            const isSelected = selectedStep?.id === step.id;

            return (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => setSelectedStep(step)}
                  className={`flex-1 min-w-[120px] p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#151E2B] border-blue-500 ring-1 ring-blue-500 shadow-md'
                      : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-[#34445A]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#60738F] mb-1">
                    <span>STEP 0{step.stepNumber}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#14213D] truncate">{step.stageName}</h4>
                  <p className="text-[10px] text-[#8495AE] truncate mt-0.5">{step.screenRequired}</p>
                </button>

                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#34445A] flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Step Technical Spec Card */}
      {selectedStep && (
        <div className="rounded-xl bg-[#FFFFFF] border border-blue-500/40 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2EAF4] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#2684F7] font-bold uppercase block">
                STEP 0{selectedStep.stepNumber} • {selectedStep.stageName}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#14213D]">
                Target Screen: {selectedStep.screenRequired}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#60738F]">
              {selectedStep.touchpointLink}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#14213D] mb-1">
                <Monitor className="w-3.5 h-3.5 text-[#2684F7]" />
                <span>USER ACTION &amp; GOAL</span>
              </div>
              <p className="text-xs text-[#8495AE] leading-relaxed">
                {selectedStep.userAction}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-400 mb-1">
                <Server className="w-3.5 h-3.5" />
                <span>BACKEND REQUIREMENT</span>
              </div>
              <p className="text-xs text-[#8495AE] leading-relaxed">
                {selectedStep.backendRequirement}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 mb-1">
                <Database className="w-3.5 h-3.5" />
                <span>DATA EXCHANGED</span>
              </div>
              <p className="text-xs text-[#8495AE] leading-relaxed">
                {selectedStep.dataRequirement}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#19A875] mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>TELEMETRY TRIGGER</span>
              </div>
              <p className="text-xs font-mono text-emerald-300/90 leading-relaxed">
                {selectedStep.successTelemetry}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
