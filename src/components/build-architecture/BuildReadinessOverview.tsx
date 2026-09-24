import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { BuildReadinessOverview as BuildReadinessOverviewType, BuildReadinessMetric } from '../../types/project';

interface BuildReadinessOverviewProps {
  overview: BuildReadinessOverviewType;
}

export const BuildReadinessOverview: React.FC<BuildReadinessOverviewProps> = ({ overview }) => {
  const { metrics, overallScore, buildStatus, statusExplanation } = overview;
  const [selectedMetric, setSelectedMetric] = useState<BuildReadinessMetric | null>(null);

  const getStatusColor = (status: BuildReadinessMetric['status'], score: number) => {
    if (status === 'NEEDS_INPUT' || score < 50) {
      return {
        stroke: '#F43F5E',
        text: 'text-rose-400',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        label: 'NEEDS INPUT',
      };
    }
    if (status === 'NEEDS_VALIDATION' || score < 75) {
      return {
        stroke: '#F59E0B',
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        label: 'NEEDS VALIDATION',
      };
    }
    return {
      stroke: '#10B981',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      label: 'CLARIFIED',
    };
  };

  return (
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 01 — Build Readiness Overview
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              9 METRICS
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Grounded evaluation of product clarity, technical stack definition, and validation readiness synthesized from Stages 01–04.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[#111823] p-2.5 rounded-xl border border-[#263244]">
            {/* Master SVG Circular Ring */}
            <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#1C2635]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${overallScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-mono font-bold text-[#F3F4F6]">
                {overallScore}%
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#738095] block font-semibold">
                BUILD MATURITY
              </span>
              <span className="text-xs font-mono font-bold text-blue-400">
                {buildStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale Bar */}
      <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] flex items-center justify-between text-xs text-[#AAB4C3]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{statusExplanation}</span>
        </div>
        <span className="text-[11px] font-mono text-[#738095] hidden sm:inline">
          Derived from upstream project state • Zero artificial metrics
        </span>
      </div>

      {/* 9 Dimensions Circular Progress Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {metrics.map((metric) => {
          const color = getStatusColor(metric.status, metric.score);
          const isInsufficient = metric.score < 50 || metric.status === 'NEEDS_INPUT';

          return (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric)}
              className="p-4 rounded-xl bg-[#111823] border border-[#263244] hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    {/* SVG Mini Ring */}
                    <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#1C2635]"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray={`${metric.score}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke={color.stroke}
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-mono font-bold text-[#F3F4F6]">
                        {isInsufficient ? '!' : `${metric.score}%`}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#F3F4F6] group-hover:text-blue-400 transition-colors">
                        {metric.name}
                      </h3>
                      <span className="text-[10px] font-mono text-[#738095]">
                        {metric.originatingStage}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${color.bg} ${color.text} ${color.border}`}>
                    {color.label}
                  </span>
                </div>

                <p className="text-[11px] text-[#AAB4C3] line-clamp-2 leading-relaxed">
                  {isInsufficient ? 'Not enough evidence in upstream stages to declare readiness.' : metric.summary}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1C2635] flex items-center justify-between text-[10px] font-mono text-[#738095]">
                <span>Provenance: {metric.provenance}</span>
                <span className="text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drill-down Modal Drawer for Selected Metric */}
      {selectedMetric && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D141F] border border-[#263244] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#1C2635] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#738095] block">
                  READINESS DIMENSION DOSSIER
                </span>
                <h3 className="text-base font-bold text-[#F3F4F6]">
                  {selectedMetric.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMetric(null)}
                className="p-1 rounded-lg text-[#738095] hover:text-[#F3F4F6] hover:bg-[#151E2B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#111823] border border-[#1C2635] space-y-1">
                <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                  Readiness Evaluation &amp; Origin
                </span>
                <p className="text-[#CBD5E1] leading-relaxed">
                  {selectedMetric.summary}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#111823] border border-[#1C2635] space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                  Key Uncertainty or Blockers
                </span>
                <p className="text-[#CBD5E1] leading-relaxed">
                  {selectedMetric.keyUncertainty || 'No critical architectural blockers flagged for this dimension.'}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#080B10] border border-[#1C2635] text-[11px] font-mono text-[#738095]">
                <span>Originating: {selectedMetric.originatingStage}</span>
                <span>Provenance: {selectedMetric.provenance}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedMetric(null)}
              className="w-full py-2 rounded-xl bg-[#111823] hover:bg-[#151E2B] text-[#F3F4F6] text-xs font-mono font-medium border border-[#263244] transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
