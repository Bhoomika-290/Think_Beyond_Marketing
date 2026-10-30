import React, { useState } from 'react';
import {
  FlaskConical,
  ShieldAlert,
  CheckCircle2,
  FileCode2,
  HelpCircle,
  Wrench,
} from 'lucide-react';
import type { ChallengerEvaluatorSystem, ArchitectureStressTest } from '../../types/project';

interface ArchitectureChallengerProps {
  challengerTests: ChallengerEvaluatorSystem;
}

export const ArchitectureChallenger: React.FC<ArchitectureChallengerProps> = ({
  challengerTests,
}) => {
  const { tests } = challengerTests;
  const [selectedTestId, setSelectedTestId] = useState<string>(tests[0]?.id || '');
  const [experimentResults, setExperimentResults] = useState<Record<string, 'idle' | 'running' | 'passed'>>({});

  const activeTest = tests.find((t) => t.id === selectedTestId) || tests[0];

  const getSeverityBadgeClass = (sev: ArchitectureStressTest['severity']) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'High':
        return 'bg-[#FFF3E7] text-amber-400 border-[#F29A42]/30';
      case 'Medium':
        return 'bg-[#E8F2FF] text-[#2684F7] border-[#2684F7]/30';
    }
  };

  const handleRunExperiment = (testId: string) => {
    setExperimentResults((prev) => ({ ...prev, [testId]: 'running' }));
    setTimeout(() => {
      setExperimentResults((prev) => ({ ...prev, [testId]: 'passed' }));
    }, 600);
  };

  return (
    <div id="section-challenger" className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 14 — Architecture Challenger &amp; Stress Tests
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30">
              {tests.length} SCENARIOS
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">
            Visual stress test pipeline evaluating: &ldquo;What could make this architecture or MVP fail in production?&rdquo;
          </p>
        </div>

        <span className="text-xs font-mono text-[#60738F] bg-[#FFFFFF] px-3 py-1.5 rounded-lg border border-[#E2EAF4]">
          Deterministic Analysis • Zero Fabricated Chat
        </span>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-mono text-[#60738F] uppercase mr-1 flex-shrink-0">
          STRESS TESTS:
        </span>
        {tests.map((test, idx) => {
          const isSelected = (activeTest && activeTest.id === test.id) || (!activeTest && idx === 0);

          return (
            <button
              key={test.id}
              type="button"
              onClick={() => setSelectedTestId(test.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-[#2684F7] text-white font-medium border-blue-500 shadow-sm'
                  : 'bg-[#FFFFFF] text-[#8495AE] hover:text-[#14213D] border-[#E2EAF4]'
              }`}
            >
              <span>Scenario 0{idx + 1}</span>
              <span
                className={`px-1 rounded text-[9px] font-bold ${
                  test.severity === 'Critical'
                    ? 'bg-rose-500/20 text-rose-300'
                    : test.severity === 'High'
                    ? 'bg-amber-500/20 text-[#F29A42]'
                    : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                {test.severity.slice(0, 1)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Visual Stress Test Pipeline: Decision -> Challenge -> Evidence -> Resolution (Section 35) */}
      {activeTest && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2EAF4] pb-2">
              <span className="text-xs font-mono font-bold text-[#14213D] uppercase tracking-wider">
                VISUAL STRESS TEST CAUSAL CHAIN (SECTION 35)
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getSeverityBadgeClass(
                  activeTest.severity
                )}`}
              >
                {activeTest.severity} RISK TIER
              </span>
            </div>

            {/* 4 Connected Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* 1. DECISION / ASSUMPTION */}
              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#2684F7] font-bold uppercase">
                    01 • DECISION / ASSUMPTION
                  </span>
                  <FileCode2 className="w-3.5 h-3.5 text-[#2684F7]" />
                </div>
                <p className="text-xs font-medium text-[#14213D] leading-snug">
                  {activeTest.affectedAssumption}
                </p>
                <span className="text-[10px] font-mono text-[#60738F] block pt-1 border-t border-[#E2EAF4]">
                  Baseline Architecture Premise
                </span>
              </div>

              {/* 2. CHALLENGE QUESTION */}
              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#F29A42]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                    02 • ADVERSARIAL CHALLENGE
                  </span>
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-xs font-medium text-[#14213D] leading-snug">
                  {activeTest.challengeQuestion}
                </p>
                <span className="text-[10px] font-mono text-amber-400/80 block pt-1 border-t border-[#E2EAF4]">
                  Production Stress Question
                </span>
              </div>

              {/* 3. EVIDENCE / FAILURE MODE */}
              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">
                    03 • EVIDENCE / FAILURE MODE
                  </span>
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <p className="text-xs font-medium text-rose-200/90 leading-snug">
                  {activeTest.failureMode}
                </p>
                <span className="text-[10px] font-mono text-[#60738F] block pt-1 border-t border-[#E2EAF4]">
                  Grounded in Stage 02 Risk Matrix
                </span>
              </div>

              {/* 4. RESOLUTION & MITIGATION */}
              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#19A875]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#19A875] font-bold uppercase">
                    04 • RESOLUTION &amp; MITIGATION
                  </span>
                  <Wrench className="w-3.5 h-3.5 text-[#19A875]" />
                </div>
                <p className="text-xs font-medium text-emerald-200/90 leading-snug">
                  {activeTest.mitigation}
                </p>
                <span className="text-[10px] font-mono text-[#19A875]/80 block pt-1 border-t border-[#E2EAF4]">
                  Grounded Engineering Guardrail
                </span>
              </div>
            </div>
          </div>

          {/* Validation Experiment Card */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-blue-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FlaskConical className="w-5 h-5 text-[#2684F7] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-[#2684F7] uppercase font-semibold block">
                  PROPOSED EMPIRICAL VALIDATION TEST
                </span>
                <p className="text-xs text-[#14213D] mt-0.5 leading-relaxed">
                  {activeTest.validationExperiment}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {experimentResults[activeTest.id] === 'passed' ? (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F8F1] border border-[#19A875]/30 text-xs font-mono text-[#19A875] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>EXPERIMENT SPECIFIED</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRunExperiment(activeTest.id)}
                  disabled={experimentResults[activeTest.id] === 'running'}
                  className="px-3.5 py-1.5 rounded-lg bg-[#2684F7] hover:bg-[#1769D2] text-white text-xs font-mono font-medium transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>
                    {experimentResults[activeTest.id] === 'running'
                      ? 'Simulating Test...'
                      : 'Simulate Validation Run'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
