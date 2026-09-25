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
      <div className="p-5 rounded-xl bg-[#FDFCF8] border border-[#DDD5C5] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Prominent Feasibility State */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B7D90]">
              Venture Intelligence State
            </span>
            <span className="text-[#DDD5C5]">•</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#2B3D4F] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B3D4F] animate-pulse" />
              Real-time Synthesis
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-[#2B3D4F] tracking-tight uppercase flex items-center gap-2">
            <span>{report.overallStatus}</span>
          </div>

          {/* 1-2 Short Lines Explaining State */}
          <p className="text-xs text-[#4A5E73] leading-relaxed max-w-xl">
            {report.overallScoreExplanation.split('. ').slice(0, 2).join('. ')}.
          </p>
        </div>

        {/* Right: Evidence Integrity Bar */}
        <div className="lg:w-80 p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#2B3D4F] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C59]" />
              Evidence Integrity
            </span>
            <span className="text-[#4A5E73]">{verifiedCount} User Verified</span>
          </div>

          {/* Segmented Horizontal Integrity Bar */}
          <div className="w-full h-2 rounded-full bg-[#ECE6DA] border border-[#DDD5C5] flex overflow-hidden">
            <div
              style={{ width: `${verifiedPercent}%` }}
              className="bg-[#4A7C59] h-full"
              title={`User Verified: ${verifiedPercent}%`}
            />
            <div
              style={{ width: `${inferencePercent}%` }}
              className="bg-[#6C5E8F] h-full"
              title={`AI Inferences: ${inferencePercent}%`}
            />
            <div
              style={{ width: `${assumptionPercent}%` }}
              className="bg-[#8A6D2B] h-full"
              title={`Assumptions: ${assumptionPercent}%`}
            />
            <div
              style={{ width: `${needsValPercent}%` }}
              className="bg-[#5A7A96] h-full"
              title={`Needs Validation: ${needsValPercent}%`}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#6B7D90] pt-0.5">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />
              Verified
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C5E8F]" />
              Inference
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A6D2B]" />
              Assumption
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A7A96]" />
              Needs Val
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Visual KPI Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* 1. Strong Dimensions */}
        <div className="p-3 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#6B7D90]">Strong</div>
            <div className="text-lg font-bold text-[#4A7C59] font-mono">
              {strongCount} <span className="text-[11px] text-[#6B7D90]">/ 9</span>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0" />
        </div>

        {/* 2. Moderate Dimensions */}
        <div className="p-3 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#6B7D90]">Moderate</div>
            <div className="text-lg font-bold text-[#2B3D4F] font-mono">
              {moderateCount} <span className="text-[11px] text-[#6B7D90]">/ 9</span>
            </div>
          </div>
          <TrendingUp className="w-4 h-4 text-[#2B3D4F] shrink-0" />
        </div>

        {/* 3. Needs Validation Dimensions */}
        <div className="p-3 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#6B7D90]">Needs Val</div>
            <div className="text-lg font-bold text-[#8A6D2B] font-mono">
              {needsValidationCount} <span className="text-[11px] text-[#6B7D90]">/ 9</span>
            </div>
          </div>
          <HelpCircle className="w-4 h-4 text-[#8A6D2B] shrink-0" />
        </div>

        {/* 4. Critical / High Risks */}
        <div className="p-3 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#6B7D90]">Key Risks</div>
            <div className="text-lg font-bold text-[#9E4A4A] font-mono">
              {criticalRisksCount} <span className="text-[11px] text-[#6B7D90]">Priority</span>
            </div>
          </div>
          <ShieldAlert className="w-4 h-4 text-[#9E4A4A] shrink-0" />
        </div>

        {/* 5. Open Questions */}
        <div className="p-3 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#6B7D90]">Questions</div>
            <div className="text-lg font-bold text-[#5A7A96] font-mono">
              {openQuestionsCount} <span className="text-[11px] text-[#6B7D90]">Open</span>
            </div>
          </div>
          <FileQuestion className="w-4 h-4 text-[#5A7A96] shrink-0" />
        </div>

        {/* 6. Validation Tasks */}
        <div className="p-3 rounded-lg bg-[#FDFCF8] border border-[#DDD5C5] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#6B7D90]">Validation</div>
            <div className="text-lg font-bold text-[#2B3D4F] font-mono">
              {completedTasks} <span className="text-[11px] text-[#6B7D90]">/ {totalTasks}</span>
            </div>
          </div>
          <ListTodo className="w-4 h-4 text-[#3E5770] shrink-0" />
        </div>
      </div>
    </div>
  );
};
