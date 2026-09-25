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
    if (lh === 'H' && imp === 'H') return 'bg-[#9E4A4A]/10 border-[#9E4A4A]/30 text-[#9E4A4A]';
    if ((lh === 'H' && imp === 'M') || (lh === 'M' && imp === 'H'))
      return 'bg-[#8A6D2B]/10 border-[#8A6D2B]/30 text-[#8A6D2B]';
    if ((lh === 'H' && imp === 'L') || (lh === 'M' && imp === 'M') || (lh === 'L' && imp === 'H'))
      return 'bg-[#2B3D4F]/08 border-[#2B3D4F]/25 text-[#2B3D4F]';
    return 'bg-[#FDFCF8] border-[#DDD5C5] text-[#4A5E73]';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-[#8A6D2B]" />
            <h2 className="text-base font-semibold text-[#2B3D4F]">
              Market Vulnerabilities & 3×3 Risk Heatmap
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#8A6D2B]/10 text-[#8A6D2B] border border-[#8A6D2B]/20">
              Interactive Matrix
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
            Structural market headwinds plotted by Likelihood vs Impact. Click any risk node to reveal mitigation vectors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual 3x3 Heatmap Grid (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C5] text-xs font-mono">
            <span className="text-[#2B3D4F] font-semibold">Likelihood vs. Impact Heatmap</span>
            <span className="text-[#9E4A4A]">● Red: High/High Critical</span>
          </div>

          <div className="my-4 space-y-2">
            {likelihoods.map((lh) => (
              <div key={lh} className="flex items-center gap-2">
                <span className="w-8 text-[11px] font-mono text-[#6B7D90] text-right font-bold">
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
                        <div className="flex items-center justify-between text-[9px] font-mono text-[#6B7D90]">
                          <span>
                            L:{lh} I:{imp}
                          </span>
                          <span className="font-bold text-[#2B3D4F]">
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
                                  ? 'bg-[#2B3D4F] text-white shadow-sm'
                                  : 'bg-[#ECE6DA]/80 hover:bg-[#E8E1D3] text-[#2B3D4F]'
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
              <span className="w-8 text-[9px] font-mono text-[#6B7D90] text-right">Impact</span>
              <div className="grid grid-cols-3 gap-2 flex-1 text-center text-[10px] font-mono text-[#4A5E73]">
                <span>Low Impact</span>
                <span>Medium Impact</span>
                <span className="text-[#9E4A4A] font-semibold">High Impact</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#6B7D90] text-center pt-2 border-t border-[#DDD5C5]">
            Vertical: Likelihood · Horizontal: Business Impact
          </div>
        </div>

        {/* Risk Detail Inspector (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C5]">
              <span className="text-xs font-mono font-semibold text-[#2B3D4F]">
                Risk Validation Inspector
              </span>
              {selectedRisk && (
                <button
                  type="button"
                  onClick={() => setSelectedRisk(null)}
                  className="text-[#6B7D90] hover:text-[#2B3D4F]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {selectedRisk ? (
              <div className="space-y-3 mt-3 animate-fade-in text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2B3D4F]">{selectedRisk.risk}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ECE6DA] text-[#9E4A4A] border border-[#9E4A4A]/20">
                      L:{selectedRisk.likelihood} · I:{selectedRisk.impact}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B7D90] uppercase block mt-0.5">
                    Category: {selectedRisk.category.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                  <span className="text-[10px] font-mono text-[#8A6D2B] block uppercase">
                    Why It Matters
                  </span>
                  <p className="text-xs text-[#4A5E73] leading-relaxed">
                    {selectedRisk.whyItMatters}
                  </p>
                </div>

                <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
                  <span className="text-[10px] font-mono text-[#4A7C59] block uppercase">
                    What to Validate in Beachhead Launch
                  </span>
                  <p className="text-xs text-[#4A5E73] leading-relaxed">
                    {selectedRisk.whatToValidate}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-[#6B7D90] space-y-2">
                <ShieldAlert className="w-8 h-8 text-[#DDD5C5] mx-auto" />
                <p>Click any risk node on the heatmap to inspect root causes and validation tasks.</p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#DDD5C5] text-[10px] font-mono text-[#6B7D90] flex justify-between">
            <span>Tracking {risks.length} market risks</span>
            <span>Provenance: AI_INFERENCE / ASSUMPTION</span>
          </div>
        </div>
      </div>
    </div>
  );
};
