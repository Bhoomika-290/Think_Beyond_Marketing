import React, { useState } from 'react';
import { AlertOctagon, X, ShieldAlert } from 'lucide-react';
import type { MarketRiskItem } from '../../types/project';

interface MarketRiskHeatmapProps {
  risks: MarketRiskItem[];
}

export const MarketRiskHeatmap: React.FC<MarketRiskHeatmapProps> = ({ risks }) => {
  const [selectedRisk, setSelectedRisk] = useState<MarketRiskItem | null>(null);

  // 3x3 Heatmap mapping
  // Levels: L, M, H
  const likelihoods: Array<'H' | 'M' | 'L'> = ['H', 'M', 'L'];
  const impacts: Array<'L' | 'M' | 'H'> = ['L', 'M', 'H'];

  const getCellColor = (lh: 'L' | 'M' | 'H', imp: 'L' | 'M' | 'H') => {
    if (lh === 'H' && imp === 'H') return 'bg-red-950/40 border-red-500/50 text-red-300';
    if ((lh === 'H' && imp === 'M') || (lh === 'M' && imp === 'H'))
      return 'bg-amber-950/40 border-amber-500/40 text-amber-300';
    if ((lh === 'H' && imp === 'L') || (lh === 'M' && imp === 'M') || (lh === 'L' && imp === 'H'))
      return 'bg-blue-950/30 border-blue-500/30 text-blue-300';
    return 'bg-[#111823] border-[#263244] text-[#AAB4C3]';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-semibold text-[#F3F4F6]">
              Market Vulnerabilities & 3×3 Risk Heatmap
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Interactive Matrix
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Structural market headwinds plotted by Likelihood vs Impact. Click any risk node to reveal mitigation vectors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual 3x3 Heatmap Grid (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0B1017] border border-[#263244] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#263244] text-xs font-mono">
            <span className="text-[#F3F4F6] font-semibold">Likelihood vs. Impact Heatmap</span>
            <span className="text-red-400">● Red: High/High Critical</span>
          </div>

          <div className="my-4 space-y-2">
            {likelihoods.map((lh) => (
              <div key={lh} className="flex items-center gap-2">
                <span className="w-8 text-[11px] font-mono text-[#64748B] text-right font-bold">
                  {lh === 'H' ? 'High' : lh === 'M' ? 'Med' : 'Low'}
                </span>
                <div className="grid grid-cols-3 gap-2 flex-1">
                  {impacts.map((imp) => {
                    const cellRisks = risks.filter((r) => r.likelihood === lh && r.impact === imp);
                    const cellColor = getCellColor(lh, imp);

                    return (
                      <div
                        key={imp}
                        className={`min-h-[85px] p-2 rounded-lg border flex flex-col justify-between transition-all ${cellColor}`}
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono text-[#64748B]">
                          <span>
                            L:{lh} I:{imp}
                          </span>
                          <span className="font-bold text-[#F3F4F6]">
                            {cellRisks.length > 0 ? `${cellRisks.length} risk` : '—'}
                          </span>
                        </div>

                        <div className="space-y-1 my-1">
                          {cellRisks.map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setSelectedRisk(r)}
                              className={`w-full text-left text-[11px] p-1 rounded font-medium truncate block transition-colors ${
                                selectedRisk?.id === r.id
                                  ? 'bg-[#4D8DFF] text-white shadow-sm'
                                  : 'bg-[#151E2B]/80 hover:bg-[#1E293B] text-[#F3F4F6]'
                              }`}
                            >
                              {r.risk}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Bottom Impact Axis Labels */}
            <div className="flex items-center gap-2 pt-2">
              <span className="w-8 text-[9px] font-mono text-[#64748B] text-right">Impact</span>
              <div className="grid grid-cols-3 gap-2 flex-1 text-center text-[10px] font-mono text-[#AAB4C3]">
                <span>Low Impact</span>
                <span>Medium Impact</span>
                <span className="text-red-400 font-semibold">High Impact</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#64748B] text-center pt-2 border-t border-[#263244]">
            Vertical: Likelihood · Horizontal: Business Impact
          </div>
        </div>

        {/* Risk Detail Inspector (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0B1017] border border-[#263244] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#263244]">
              <span className="text-xs font-mono font-semibold text-[#F3F4F6]">
                Risk Validation Inspector
              </span>
              {selectedRisk && (
                <button
                  type="button"
                  onClick={() => setSelectedRisk(null)}
                  className="text-[#64748B] hover:text-[#F3F4F6]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {selectedRisk ? (
              <div className="space-y-3 mt-3 animate-fade-in text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#F3F4F6]">{selectedRisk.risk}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#151E2B] text-red-400 border border-red-500/20">
                      L:{selectedRisk.likelihood} · I:{selectedRisk.impact}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block mt-0.5">
                    Category: {selectedRisk.category.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 block uppercase">
                    Why It Matters
                  </span>
                  <p className="text-xs text-[#AAB4C3] leading-relaxed">
                    {selectedRisk.whyItMatters}
                  </p>
                </div>

                <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 block uppercase">
                    What to Validate in Beachhead Launch
                  </span>
                  <p className="text-xs text-[#AAB4C3] leading-relaxed">
                    {selectedRisk.whatToValidate}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#64748B] space-y-2">
                <ShieldAlert className="w-8 h-8 text-[#263244] mx-auto" />
                <p>Click any risk node on the heatmap to inspect root causes and validation tasks.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#263244] text-[10px] font-mono text-[#64748B] flex justify-between">
            <span>Tracking {risks.length} market risks</span>
            <span>Provenance: AI_INFERENCE / ASSUMPTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
