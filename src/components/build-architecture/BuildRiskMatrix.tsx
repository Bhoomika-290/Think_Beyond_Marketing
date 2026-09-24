import React, { useState } from 'react';
import { Filter, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import type { BuildRiskMatrixSystem, BuildRiskItem, BuildRiskDimension } from '../../types/project';

interface BuildRiskMatrixProps {
  riskMatrix: BuildRiskMatrixSystem;
}

export const BuildRiskMatrix: React.FC<BuildRiskMatrixProps> = ({ riskMatrix }) => {
  const { risks } = riskMatrix;
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<BuildRiskItem | null>(risks[0] || null);

  const dimensions: ('all' | BuildRiskDimension)[] = [
    'all',
    'Technical',
    'Product',
    'Data',
    'Security',
    'Operational',
    'Financial',
    'Dependency',
    'Scalability',
  ];

  const filteredRisks =
    selectedDimension === 'all'
      ? risks
      : risks.filter((r) => r.dimension === selectedDimension);

  const getSeverityBadgeClass = (sev: BuildRiskItem['severity']) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Moderate':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const criticalCount = risks.filter((r) => r.severity === 'Critical').length;
  const highCount = risks.filter((r) => r.severity === 'High').length;
  const moderateCount = risks.filter((r) => r.severity === 'Moderate').length;

  return (
    <div id="section-risk-matrix" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 17 — Visual Build Risk Matrix (Probability × Impact)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {risks.length} MONITORED RISKS
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Grounded in Stage 02 feasibility failure modes, mapping impact, probability, and empirical mitigation tests.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
            {criticalCount} Critical
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
            {highCount} High
          </span>
          <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
            {moderateCount} Moderate
          </span>
        </div>
      </div>

      {/* Dimension Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-[#738095] mr-1 flex-shrink-0" />
        {dimensions.map((dim) => (
          <button
            key={dim}
            type="button"
            onClick={() => setSelectedDimension(dim)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
              selectedDimension === dim
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'bg-[#111823] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244]'
            }`}
          >
            {dim === 'all' ? 'All Dimensions' : dim}
          </button>
        ))}
      </div>

      {/* Visual 2D Coordinate Matrix Canvas (Probability 1..5 × Impact 1..5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5x5 Matrix Grid (7 Cols) */}
        <div className="lg:col-span-7 bg-[#111823] p-5 rounded-xl border border-[#263244] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
              2D RISK SEVERITY QUADRANT MAP
            </span>
            <span className="text-[10px] font-mono text-[#738095]">
              Click any plotted node to inspect
            </span>
          </div>

          <div className="relative">
            {/* Y-Axis Label */}
            <div className="absolute -left-7 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-mono text-[#738095] tracking-widest uppercase flex items-center gap-1">
              <span>IMPACT</span>
              <span className="text-[#34445A]">──►</span>
            </div>

            {/* 5x5 Grid Table */}
            <div className="grid grid-rows-5 gap-1.5">
              {[5, 4, 3, 2, 1].map((impactScore) => (
                <div key={impactScore} className="flex items-center gap-1.5">
                  {/* Y-coordinate number */}
                  <span className="w-4 text-right text-[10px] font-mono text-[#738095]">
                    {impactScore}
                  </span>

                  {/* 5 Cells across Likelihood 1..5 */}
                  <div className="grid grid-cols-5 gap-1.5 flex-1">
                    {[1, 2, 3, 4, 5].map((likelihoodScore) => {
                      // Determine cell hazard color
                      const isCriticalZone = impactScore >= 4 && likelihoodScore >= 4;
                      const isHighZone =
                        (impactScore >= 4 && likelihoodScore === 3) ||
                        (impactScore === 3 && likelihoodScore >= 4);
                      const isModerateZone =
                        (impactScore >= 3 && likelihoodScore >= 2) ||
                        (impactScore >= 2 && likelihoodScore >= 3);

                      const cellRisks = filteredRisks.filter(
                        (r) =>
                          Math.round(r.impact) === impactScore &&
                          Math.round(r.likelihood) === likelihoodScore
                      );

                      const hasSelected = cellRisks.some((r) => r.id === selectedRisk?.id);

                      return (
                        <div
                          key={likelihoodScore}
                          className={`min-h-[58px] p-1.5 rounded-lg border flex flex-wrap items-center justify-center gap-1 transition-all ${
                            hasSelected
                              ? 'ring-2 ring-blue-500 bg-blue-900/30 border-blue-400'
                              : isCriticalZone
                              ? 'bg-rose-950/20 border-rose-900/40 hover:bg-rose-950/30'
                              : isHighZone
                              ? 'bg-amber-950/20 border-amber-900/40 hover:bg-amber-950/30'
                              : isModerateZone
                              ? 'bg-blue-950/20 border-blue-900/40 hover:bg-blue-950/30'
                              : 'bg-[#0D141F] border-[#1C2635] hover:bg-[#131C29]'
                          }`}
                        >
                          {cellRisks.map((item) => {
                            const isCurrent = selectedRisk?.id === item.id;
                            const sevClass =
                              item.severity === 'Critical'
                                ? 'bg-rose-500 text-white'
                                : item.severity === 'High'
                                ? 'bg-amber-500 text-black'
                                : item.severity === 'Moderate'
                                ? 'bg-blue-500 text-white'
                                : 'bg-emerald-500 text-black';

                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedRisk(item)}
                                title={`${item.risk} (Imp: ${item.impact}, Lik: ${item.likelihood})`}
                                className={`w-6 h-6 rounded-full text-[9px] font-mono font-bold flex items-center justify-center shadow-md transition-transform hover:scale-125 ${sevClass} ${
                                  isCurrent ? 'ring-2 ring-white scale-110' : ''
                                }`}
                              >
                                {item.dimension.slice(0, 2).toUpperCase()}
                              </button>
                            );
                          })}

                          {cellRisks.length === 0 && (
                            <span className="text-[9px] font-mono text-[#263244] select-none">
                              ·
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* X-Axis Numbers & Label */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-4" />
              <div className="grid grid-cols-5 gap-1.5 flex-1 text-center">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num} className="text-[10px] font-mono text-[#738095]">
                    {num}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-[#738095] tracking-widest uppercase mt-1 flex items-center justify-center gap-1">
              <span>PROBABILITY / LIKELIHOOD</span>
              <span className="text-[#34445A]">──►</span>
            </div>
          </div>

          {/* Matrix Quadrant Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#1C2635] text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500" />
              <span>Critical Zone (4-5)</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded bg-amber-500/30 border border-amber-500" />
              <span>High Contingency</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-2.5 rounded bg-blue-500/30 border border-blue-500" />
              <span>Moderate Monitor</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-500" />
              <span>Low Friction</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Risk Deep-Dive Inspector (5 Cols) */}
        <div className="lg:col-span-5 bg-[#111823] p-5 rounded-xl border border-blue-500/40 space-y-4 flex flex-col justify-between">
          {selectedRisk ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-[#1C2635] pb-3">
                <div>
                  <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                    {selectedRisk.dimension} DIMENSION
                  </span>
                  <h3 className="text-sm font-bold text-[#F3F4F6] mt-0.5 leading-snug">
                    {selectedRisk.risk}
                  </h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border flex-shrink-0 ${getSeverityBadgeClass(
                    selectedRisk.severity
                  )}`}
                >
                  {selectedRisk.severity}
                </span>
              </div>

              {/* Coordinates Bar */}
              <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#0D141F] border border-[#263244] text-[11px] font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#738095]">Impact Severity:</span>
                  <span className="text-[#F3F4F6] font-bold">{selectedRisk.impact} / 5</span>
                </div>
                <div className="flex items-center justify-between border-l border-[#1C2635] pl-2">
                  <span className="text-[#738095]">Likelihood:</span>
                  <span className="text-[#F3F4F6] font-bold">{selectedRisk.likelihood} / 5</span>
                </div>
              </div>

              {/* Empirical Mitigation */}
              <div className="p-3 rounded-lg bg-[#0D141F] border border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PRESCRIBED MITIGATION STRATEGY</span>
                </div>
                <p className="text-xs text-[#AAB4C3] leading-relaxed">
                  {selectedRisk.mitigation}
                </p>
              </div>

              {/* Validation Requirement */}
              <div className="p-3 rounded-lg bg-[#0D141F] border border-[#263244] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-mono font-semibold text-blue-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>EMPIRICAL VALIDATION TEST REQUIRED</span>
                </div>
                <p className="text-[#AAB4C3] leading-relaxed">
                  {selectedRisk.validationTest}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#738095] font-mono">
              Click any plotted node in the matrix to inspect its mitigation blueprint.
            </div>
          )}

          {selectedRisk && (
            <div className="pt-3 border-t border-[#1C2635] flex items-center justify-between text-[10px] font-mono text-[#738095]">
              <span>ID: {selectedRisk.id}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Grounded in Feasibility
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
