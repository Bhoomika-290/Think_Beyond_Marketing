import React from 'react';
import type { FeasibilityReport, EvidenceItem } from '../../types/project';
import {
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  ShieldAlert,
  ListTodo,
  FileQuestion,
  ShieldCheck,
} from 'lucide-react';

interface FeasibilityOverviewProps {
  report: FeasibilityReport;
}

export const FeasibilityOverview: React.FC<FeasibilityOverviewProps> = ({ report }) => {
  const dimensionList = Object.values(report.dimensions);

  // Dynamic counts
  const strongCount = dimensionList.filter((d) => d.rating === 'strong').length;
  const moderateCount = dimensionList.filter((d) => d.rating === 'moderate').length;
  const needsValidationCount = dimensionList.filter(
    (d) => d.rating === 'needs-validation' || d.rating === 'weak'
  ).length;

  const criticalRisksCount = report.risks.filter(
    (r) => r.severity === 'critical' || r.severity === 'high'
  ).length;

  const openQuestionsCount = report.openQuestions.length;
  const completedTasks = report.validationTasks.filter((t) => t.completed).length;
  const totalTasks = report.validationTasks.length;

  // Evidence integrity analysis
  const allEvidence: EvidenceItem[] = dimensionList.flatMap((d) => d.evidence);
  const totalEvidence = allEvidence.length || 1;
  const verifiedCount = allEvidence.filter((e) => e.type === 'verified').length;
  const inferenceCount = allEvidence.filter((e) => e.type === 'ai-inference').length;
  const assumptionCount = allEvidence.filter((e) => e.type === 'assumption').length;

  const verifiedPercent = Math.round((verifiedCount / totalEvidence) * 100);
  const inferencePercent = Math.round((inferenceCount / totalEvidence) * 100);
  const assumptionPercent = Math.round((assumptionCount / totalEvidence) * 100);
  const needsValPercent = 100 - verifiedPercent - inferencePercent - assumptionPercent;

  return (
    <div className="space-y-3">
      {/* Top Visual Command Center Header */}
      <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Prominent Feasibility State */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#60738F]">
              Venture Intelligence State
            </span>
            <span className="text-[#E2EAF4]">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#14213D] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14213D] animate-pulse" />
              Real-time Synthesis
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-[#14213D] tracking-tight uppercase flex items-center gap-2">
            <span>{report.overallStatus}</span>
          </div>

          {/* 1-2 Short Lines Explaining State */}
          <p className="text-xs text-[#60738F] leading-relaxed max-w-xl">
            {report.overallScoreExplanation.split('. ').slice(0, 2).join('. ')}.
          </p>
        </div>

        {/* Right: Evidence Integrity Bar */}
        <div className="lg:w-80 p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#14213D] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#19A875]" />
              Evidence Integrity
            </span>
            <span className="text-[#60738F]">{verifiedCount} User Verified</span>
          </div>

          {/* Segmented Horizontal Integrity Bar */}
          <div className="w-full h-2 rounded-full bg-[#EEF4FB] border border-[#E2EAF4] flex overflow-hidden">
            <div
              style={{ width: `${verifiedPercent}%` }}
              className="bg-[#19A875] h-full"
              title={`User Verified: ${verifiedPercent}%`}
            />
            <div
              style={{ width: `${inferencePercent}%` }}
              className="bg-[#9272DB] h-full"
              title={`AI Inferences: ${inferencePercent}%`}
            />
            <div
              style={{ width: `${assumptionPercent}%` }}
              className="bg-[#F29A42] h-full"
              title={`Assumptions: ${assumptionPercent}%`}
            />
            <div
              style={{ width: `${needsValPercent}%` }}
              className="bg-[#2684F7] h-full"
              title={`Needs Validation: ${needsValPercent}%`}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#60738F] pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19A875]" />
              Verified
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9272DB]" />
              Inference
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F29A42]" />
              Assumption
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2684F7]" />
              Needs Val
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Visual KPI Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* 1. Strong Dimensions */}
        <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#60738F]">Strong</div>
            <div className="text-lg font-bold text-[#19A875] font-mono">
              {strongCount} <span className="text-[11px] text-[#60738F]">/ 9</span>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#19A875] shrink-0" />
        </div>

        {/* 2. Moderate Dimensions */}
        <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#60738F]">Moderate</div>
            <div className="text-lg font-bold text-[#14213D] font-mono">
              {moderateCount} <span className="text-[11px] text-[#60738F]">/ 9</span>
            </div>
          </div>
          <TrendingUp className="w-4 h-4 text-[#14213D] shrink-0" />
        </div>

        {/* 3. Needs Validation Dimensions */}
        <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#60738F]">Needs Val</div>
            <div className="text-lg font-bold text-[#F29A42] font-mono">
              {needsValidationCount} <span className="text-[11px] text-[#60738F]">/ 9</span>
            </div>
          </div>
          <HelpCircle className="w-4 h-4 text-[#F29A42] shrink-0" />
        </div>

        {/* 4. Critical / High Risks */}
        <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#60738F]">Key Risks</div>
            <div className="text-lg font-bold text-[#E46D68] font-mono">
              {criticalRisksCount} <span className="text-[11px] text-[#60738F]">Priority</span>
            </div>
          </div>
          <ShieldAlert className="w-4 h-4 text-[#E46D68] shrink-0" />
        </div>

        {/* 5. Open Questions */}
        <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#60738F]">Questions</div>
            <div className="text-lg font-bold text-[#2684F7] font-mono">
              {openQuestionsCount} <span className="text-[11px] text-[#60738F]">Open</span>
            </div>
          </div>
          <FileQuestion className="w-4 h-4 text-[#2684F7] shrink-0" />
        </div>

        {/* 6. Validation Tasks */}
        <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#60738F]">Validation</div>
            <div className="text-lg font-bold text-[#14213D] font-mono">
              {completedTasks} <span className="text-[11px] text-[#60738F]">/ {totalTasks}</span>
            </div>
          </div>
          <ListTodo className="w-4 h-4 text-[#1769D2] shrink-0" />
        </div>
      </div>
    </div>
  );
};
