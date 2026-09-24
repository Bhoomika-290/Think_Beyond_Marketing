import React, { useState } from 'react';
import type { CompetitorItem, PositioningAxis } from '../../types/project';

interface BrandPositioningMapProps {
  ventureName: string;
  competitors: CompetitorItem[];
  currentAxes: { xAxis: PositioningAxis; yAxis: PositioningAxis };
  availableAxes?: PositioningAxis[];
  onUpdateAxes: (xAxis: PositioningAxis, yAxis: PositioningAxis) => void;
  onAddCompetitor?: (competitor: Omit<CompetitorItem, 'id' | 'provenance'>) => void;
}

const DEFAULT_AXES: PositioningAxis[] = [
  { id: 'price_vs_quality', label: 'Price vs Quality', minLabel: 'Affordable / Commodity', maxLabel: 'Premium / Artisanal' },
  { id: 'traditional_vs_innovative', label: 'Tradition vs Innovation', minLabel: 'Legacy / Established', maxLabel: 'Modern / Disruptive' },
  { id: 'speed_vs_customization', label: 'Velocity vs Bespoke', minLabel: 'Fast / Standardized', maxLabel: 'Deeply Bespoke' },
  { id: 'accessible_vs_exclusive', label: 'Mass vs High-Touch', minLabel: 'Mass Market', maxLabel: 'Exclusive / Niche' },
];

export const BrandPositioningMap: React.FC<BrandPositioningMapProps> = ({
  ventureName,
  competitors,
  currentAxes,
  availableAxes = DEFAULT_AXES,
  onUpdateAxes,
  onAddCompetitor,
}) => {
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompCategory, setNewCompCategory] = useState<'direct' | 'indirect' | 'alternative_workaround'>('direct');
  const [newCompStrengths, setNewCompStrengths] = useState('');
  const [newCompWeaknesses, setNewCompWeaknesses] = useState('');

  const xAxis = currentAxes.xAxis || availableAxes[0] || DEFAULT_AXES[0];
  const yAxis = currentAxes.yAxis || availableAxes[1] || DEFAULT_AXES[1];

  const selectedCompetitor = competitors.find((c) => c.id === selectedCompId);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim() || !onAddCompetitor) return;
    onAddCompetitor({
      name: newCompName.trim(),
      category: newCompCategory,
      positioningLabel: 'Challenger alternative',
      priceTier: 'mid_market',
      offeringSummary: newCompStrengths.trim() || 'Established presence',
      strengths: newCompStrengths ? [newCompStrengths.trim()] : ['Market presence'],
      weaknesses: newCompWeaknesses ? [newCompWeaknesses.trim()] : ['Operational friction'],
      differentiationFactor: 'Direct player in operational region',
      coordinates: { x: 20, y: 15 },
      isUserAdded: true,
    });
    setNewCompName('');
    setNewCompStrengths('');
    setNewCompWeaknesses('');
    setShowAddModal(false);
  };

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              MARKET SPACE VISUALIZER
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Competitive Positioning Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Plotting {ventureName} against alternatives across strategic market dimensions.
          </p>
        </div>

        {/* Axis Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244] text-xs">
            <span className="text-[10px] font-mono uppercase text-[#64748B]">X Axis:</span>
            <select
              value={xAxis.id}
              onChange={(e) => {
                const found = availableAxes.find((a) => a.id === e.target.value);
                if (found) onUpdateAxes(found, yAxis);
              }}
              className="bg-transparent text-[#F3F4F6] font-mono text-xs focus:outline-none cursor-pointer"
            >
              {availableAxes.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[#111823] text-[#F3F4F6]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244] text-xs">
            <span className="text-[10px] font-mono uppercase text-[#64748B]">Y Axis:</span>
            <select
              value={yAxis.id}
              onChange={(e) => {
                const found = availableAxes.find((a) => a.id === e.target.value);
                if (found) onUpdateAxes(xAxis, found);
              }}
              className="bg-transparent text-[#F3F4F6] font-mono text-xs focus:outline-none cursor-pointer"
            >
              {availableAxes.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[#111823] text-[#F3F4F6]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {onAddCompetitor && (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-[#4D8DFF] border border-blue-500/30 text-xs font-mono font-medium transition-colors flex items-center gap-1"
            >
              <span>+ Add Competitor</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2D Positioning Canvas (Left 8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="relative w-full aspect-[4/3] bg-[#080B10] border border-[#263244] rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
              <div className="border-r border-b border-[#263244]/60" />
              <div className="border-b border-[#263244]/60" />
              <div className="border-r border-[#263244]/60" />
              <div />
            </div>

            {/* Quadrant labels */}
            <div className="absolute top-3 left-4 text-[10px] font-mono uppercase text-[#475569] pointer-events-none">
              {yAxis.maxLabel} / {xAxis.minLabel}
            </div>
            <div className="absolute top-3 right-4 text-[10px] font-mono uppercase text-[#38BDF8]/60 font-semibold pointer-events-none text-right">
              ★ PRIME OPPORTUNITY (WEDGE)
            </div>
            <div className="absolute bottom-3 left-4 text-[10px] font-mono uppercase text-[#475569] pointer-events-none">
              {yAxis.minLabel} / {xAxis.minLabel}
            </div>
            <div className="absolute bottom-3 right-4 text-[10px] font-mono uppercase text-[#475569] pointer-events-none text-right">
              {yAxis.minLabel} / {xAxis.maxLabel}
            </div>

            {/* Axis Center Crosshairs & Axis Legends */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#AAB4C3] bg-[#111823]/80 px-2 py-0.5 rounded border border-[#263244] pointer-events-none">
              ▲ {yAxis.maxLabel}
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#64748B] bg-[#111823]/80 px-2 py-0.5 rounded border border-[#263244] pointer-events-none">
              ▼ {yAxis.minLabel}
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#64748B] bg-[#111823]/80 px-2 py-0.5 rounded border border-[#263244] pointer-events-none">
              ◀ {xAxis.minLabel}
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#AAB4C3] bg-[#111823]/80 px-2 py-0.5 rounded border border-[#263244] pointer-events-none">
              {xAxis.maxLabel} ▶
            </div>

            {/* Focal Venture Marker (Star / Pulsing Badge) */}
            <div
              className="absolute z-20 cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
              style={{ left: '78%', top: '22%' }}
              onClick={() => setSelectedCompId('focal_brand')}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping pointer-events-none" />
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/40 border border-white/30">
                  ★
                </div>
              </div>
              <div className="mt-1.5 px-2 py-0.5 rounded bg-blue-950/90 border border-blue-500/60 text-[11px] font-bold text-blue-200 text-center shadow whitespace-nowrap">
                {ventureName} (You)
              </div>
            </div>

            {/* Competitor Plot Points */}
            {competitors.length > 0 ? (
              competitors.map((comp) => {
                const posX = Math.max(12, Math.min(88, ((comp.coordinates.x + 100) / 200) * 100));
                const posY = Math.max(12, Math.min(88, 100 - ((comp.coordinates.y + 100) / 200) * 100));
                const isSelected = selectedCompId === comp.id;

                return (
                  <div
                    key={comp.id}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                    style={{ left: `${posX}%`, top: `${posY}%` }}
                    onClick={() => setSelectedCompId(comp.id)}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-colors shadow-md ${
                        isSelected
                          ? 'bg-amber-500 text-black border-white'
                          : comp.isUserAdded
                          ? 'bg-purple-900/80 text-purple-200 border-purple-500/50 hover:border-purple-400'
                          : 'bg-[#151E2B] text-[#AAB4C3] border-[#263244] hover:border-slate-400'
                      }`}
                      title={comp.name}
                    >
                      {comp.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div
                      className={`mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-center whitespace-nowrap shadow border ${
                        isSelected
                          ? 'bg-amber-950 text-amber-200 border-amber-500 font-bold'
                          : 'bg-[#0B1017]/90 text-[#AAB4C3] border-[#263244]'
                      }`}
                    >
                      {comp.name}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/40">
                <span className="text-xs font-mono text-[#64748B] mb-2 uppercase">
                  No verified competitor data available
                </span>
                <p className="text-xs text-[#AAB4C3] max-w-sm mb-4">
                  Add direct market players or legacy alternatives to map out your strategic differentiation wedge.
                </p>
                {onAddCompetitor && (
                  <button
                    type="button"
                    onClick={() => setShowAddModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    + Add First Competitor
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
            <span>Click any node to inspect market positioning and observed gaps.</span>
            <span>Plotting: {competitors.length + 1} entities</span>
          </div>
        </div>

        {/* Selected Entity Inspector (Right 4 cols) */}
        <div className="lg:col-span-4 bg-[#111823] border border-[#263244] rounded-xl p-5 flex flex-col gap-4">
          {selectedCompId === 'focal_brand' ? (
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-[#1C2636]">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  ★
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#4D8DFF]">Target Positioning Wedge</span>
                  <h4 className="text-sm font-bold text-[#F3F4F6]">{ventureName}</h4>
                </div>
              </div>
              <div className="mt-3 space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Target Position</span>
                  <p className="text-[#F3F4F6] leading-relaxed">
                    Occupying the high-craft, high-innovation quadrant while avoiding legacy enterprise friction and commodity apathy.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#151E2B] border border-[#263244]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Strategic Moat</span>
                  <p className="text-[#AAB4C3] leading-relaxed">
                    Radical operational transparency and rapid time-to-value for modern discerning buyers.
                  </p>
                </div>
              </div>
            </div>
          ) : selectedCompetitor ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2636]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#151E2B] border border-[#263244] flex items-center justify-center text-xs font-bold text-[#F3F4F6]">
                    {selectedCompetitor.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#64748B]">{selectedCompetitor.category} alternative</span>
                    <h4 className="text-sm font-bold text-[#F3F4F6]">{selectedCompetitor.name}</h4>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-[#263244] bg-[#0B1017] text-[#AAB4C3]">
                  {selectedCompetitor.provenance}
                </span>
              </div>

              <div className="mt-3 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Known Strengths</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompetitor.strengths.map((str, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                        {str}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block mb-1">Observed Weaknesses / Gaps</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCompetitor.weaknesses.map((w, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px]">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1C2636] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                  <span>Tier: {selectedCompetitor.priceTier}</span>
                  <span>Label: {selectedCompetitor.positioningLabel}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#64748B]">
              <svg className="w-8 h-8 mx-auto mb-2 text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Select any point on the matrix to inspect positioning attributes, competitive moats, and vulnerabilities.
            </div>
          )}
        </div>
      </div>

      {/* Add Competitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#111823] border border-[#263244] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-[#F3F4F6] mb-1">Add Market Competitor / Alternative</h3>
            <p className="text-xs text-[#AAB4C3] mb-4">
              Enter a real competitor or alternative to map your differentiation wedge.
            </p>
            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">Entity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp / Blue Bottle / Legacy Spreadsheet"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151E2B] border border-[#263244] text-[#F3F4F6] focus:border-[#4D8DFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">Category Type</label>
                <select
                  value={newCompCategory}
                  onChange={(e) => setNewCompCategory(e.target.value as 'direct' | 'indirect' | 'alternative_workaround')}
                  className="w-full px-3 py-2 rounded-lg bg-[#151E2B] border border-[#263244] text-[#F3F4F6] focus:border-[#4D8DFF] focus:outline-none"
                >
                  <option value="direct">Direct Competitor</option>
                  <option value="indirect">Indirect Competitor</option>
                  <option value="alternative_workaround">Manual Workaround / Alternative</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">Primary Strength</label>
                <input
                  type="text"
                  placeholder="e.g. Huge brand awareness, cheap prices"
                  value={newCompStrengths}
                  onChange={(e) => setNewCompStrengths(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151E2B] border border-[#263244] text-[#F3F4F6] focus:border-[#4D8DFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">Observed Gap / Weakness</label>
                <input
                  type="text"
                  placeholder="e.g. Opaque sourcing, slow onboarding, poor support"
                  value={newCompWeaknesses}
                  onChange={(e) => setNewCompWeaknesses(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#151E2B] border border-[#263244] text-[#F3F4F6] focus:border-[#4D8DFF] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1C2636]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#151E2B] hover:bg-[#1C2636] text-[#AAB4C3] border border-[#263244]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Save Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
