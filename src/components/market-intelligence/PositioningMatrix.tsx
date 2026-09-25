import React, { useState } from 'react';
import { Plus, X, Compass } from 'lucide-react';
import type {
  CompetitorItem,
  PositioningAxis,
  MarketEvidenceProvenance,
} from '../../types/project';

interface PositioningMatrixProps {
  competitors: CompetitorItem[];
  availableAxes: PositioningAxis[];
  selectedAxes: {
    xAxis: PositioningAxis;
    yAxis: PositioningAxis;
  };
  onUpdateAxes: (xAxis: PositioningAxis, yAxis: PositioningAxis) => void;
  onAddCompetitor: (competitor: Omit<CompetitorItem, 'id' | 'provenance'>) => void;
  ventureName: string;
}

export const PositioningMatrix: React.FC<PositioningMatrixProps> = ({
  competitors,
  availableAxes,
  selectedAxes,
  onUpdateAxes,
  onAddCompetitor,
  ventureName,
}) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New competitor form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<'direct' | 'indirect' | 'alternative_workaround'>('direct');
  const [formPositioning, setFormPositioning] = useState('');
  const [formPriceTier, setFormPriceTier] = useState<'budget' | 'mid_market' | 'premium' | 'enterprise'>('mid_market');
  const [formOffering, setFormOffering] = useState('');
  const [formStrengths, setFormStrengths] = useState('');
  const [formWeaknesses, setFormWeaknesses] = useState('');
  const [formDifferentiation, setFormDifferentiation] = useState('');
  const [formX, setFormX] = useState<number>(0);
  const [formY, setFormY] = useState<number>(0);

  const handleAxisXChange = (axisId: string) => {
    const found = availableAxes.find((a) => a.id === axisId);
    if (found && found.id !== selectedAxes.yAxis.id) {
      onUpdateAxes(found, selectedAxes.yAxis);
    }
  };

  const handleAxisYChange = (axisId: string) => {
    const found = availableAxes.find((a) => a.id === axisId);
    if (found && found.id !== selectedAxes.xAxis.id) {
      onUpdateAxes(selectedAxes.xAxis, found);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    onAddCompetitor({
      name: formName.trim(),
      category: formCategory,
      positioningLabel: formPositioning.trim() || 'Custom Added Player',
      priceTier: formPriceTier,
      offeringSummary: formOffering.trim() || 'Verified by founder in local/target market.',
      strengths: formStrengths.split(',').map((s) => s.trim()).filter(Boolean),
      weaknesses: formWeaknesses.split(',').map((s) => s.trim()).filter(Boolean),
      differentiationFactor: formDifferentiation.trim() || 'Pending founder benchmark validation.',
      coordinates: { x: formX, y: formY },
      isUserAdded: true,
    });

    // Reset and close
    setFormName('');
    setFormPositioning('');
    setFormOffering('');
    setFormStrengths('');
    setFormWeaknesses('');
    setFormDifferentiation('');
    setFormX(0);
    setFormY(0);
    setIsAddModalOpen(false);
  };

  // Convert -100..100 to 0%..100% css coordinates
  // Note: Y is flipped so +100 is at top (0%) and -100 is at bottom (100%)
  const getCoordinatesPct = (x: number, y: number) => {
    const xPct = Math.max(8, Math.min(92, ((x + 100) / 200) * 100));
    const yPct = Math.max(8, Math.min(92, ((-y + 100) / 200) * 100));
    return { left: `${xPct}%`, top: `${yPct}%` };
  };

  const getProvenanceBadge = (prov: MarketEvidenceProvenance) => {
    switch (prov) {
      case 'USER_PROVIDED':
        return { text: 'User Provided', bg: 'bg-[#4A7C59]/15 text-[#4A7C59] border-[#4A7C59]/30' };
      case 'VERIFIED_SOURCE':
        return { text: 'Verified Source', bg: 'bg-[#3E7A73]/10 text-[#3E7A73] border-[#3E7A73]/30' };
      case 'AI_INFERENCE':
        return { text: 'AI Inference Archetype', bg: 'bg-[#2B3D4F]/15 text-[#2B3D4F] border-[#2B3D4F]/30' };
      case 'ASSUMPTION':
        return { text: 'Assumption', bg: 'bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30' };
      case 'NEEDS_VALIDATION':
      default:
        return { text: 'Needs Validation', bg: 'bg-[#ECE6DA] text-[#4A5E73] border-[#DDD5C5]' };
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header with Dynamic Axis Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FDFCF8] p-4 rounded-lg border border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#2B3D4F]" />
            <h2 className="text-base font-semibold text-[#2B3D4F]">
              Dynamic 2-Axis Positioning Matrix
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/20">
              Interactive
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
            Dynamic strategic landscape. Click any competitor node to inspect offering and weaknesses, or add real verified competitors.
          </p>
        </div>

        {/* Dynamic Axis Pickers */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#6B7D90]">X-Axis:</span>
            <select
              value={selectedAxes.xAxis.id}
              onChange={(e) => handleAxisXChange(e.target.value)}
              className="bg-[#ECE6DA] text-[#2B3D4F] border border-[#DDD5C5] rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#2B3D4F]"
            >
              {availableAxes.map((axis) => (
                <option key={axis.id} value={axis.id} disabled={axis.id === selectedAxes.yAxis.id}>
                  {axis.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#6B7D90]">Y-Axis:</span>
            <select
              value={selectedAxes.yAxis.id}
              onChange={(e) => handleAxisYChange(e.target.value)}
              className="bg-[#ECE6DA] text-[#2B3D4F] border border-[#DDD5C5] rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#2B3D4F]"
            >
              {availableAxes.map((axis) => (
                <option key={axis.id} value={axis.id} disabled={axis.id === selectedAxes.xAxis.id}>
                  {axis.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#2B3D4F] text-white text-xs font-medium hover:bg-[#3E5770] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Real Competitor
          </button>
        </div>
      </div>

      {/* The 2D Interactive Matrix Canvas */}
      {!competitors.some((c) => c.isUserAdded) && (
        <div className="p-3 rounded-xl bg-[#8A6D2B]/10 border border-[#8A6D2B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="text-[#4A5E73]">
            <span className="font-mono font-bold text-[#8A6D2B] uppercase text-[10px] block mb-0.5">
              Model archetypes shown — no verified competitors yet
            </span>
            Plotted players are illustrative patterns, not researched companies. Add real ones to ground this map.
          </span>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#2B3D4F] text-white text-xs font-medium hover:bg-[#3E5770] transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Real Competitor
          </button>
        </div>
      )}
      <div className="relative w-full h-[480px] bg-[#F5F1EB] rounded-xl border border-[#DDD5C5] overflow-hidden p-6 select-none shadow-inner">
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2B3D4F 1px, transparent 1px), linear-gradient(to bottom, #2B3D4F 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Center Crosshairs */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#DDD5C5] -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#DDD5C5] -translate-y-1/2 pointer-events-none" />

        {/* Quadrant Watermarks / Labels */}
        <div className="absolute top-4 left-6 text-[10px] font-mono uppercase tracking-wider text-[#6B7D90]/60 pointer-events-none">
          Q2: High {selectedAxes.yAxis.label.split(' ')[0]} / Low {selectedAxes.xAxis.label.split(' ')[0]}
        </div>
        <div className="absolute top-4 right-6 text-[10px] font-mono uppercase tracking-wider text-[#2B3D4F]/40 pointer-events-none">
          Q1: PRIME OPPORTUNITY ({selectedAxes.yAxis.maxLabel.split('/')[0]} + {selectedAxes.xAxis.maxLabel.split('/')[0]})
        </div>
        <div className="absolute bottom-4 left-6 text-[10px] font-mono uppercase tracking-wider text-[#6B7D90]/60 pointer-events-none">
          Q3: Commodity / Status Quo Workaround
        </div>
        <div className="absolute bottom-4 right-6 text-[10px] font-mono uppercase tracking-wider text-[#6B7D90]/60 pointer-events-none">
          Q4: High {selectedAxes.xAxis.label.split(' ')[0]} / Low {selectedAxes.yAxis.label.split(' ')[0]}
        </div>

        {/* Axis Labels (North, South, East, West) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] font-mono font-medium text-[#2B3D4F] bg-[#FDFCF8]/90 px-3 py-1 rounded border border-[#DDD5C5] shadow-sm z-10">
          ▲ {selectedAxes.yAxis.maxLabel}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-[#4A5E73] bg-[#FDFCF8]/90 px-3 py-1 rounded border border-[#DDD5C5] shadow-sm z-10">
          ▼ {selectedAxes.yAxis.minLabel}
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#4A5E73] bg-[#FDFCF8]/90 px-2 py-1 rounded border border-[#DDD5C5] shadow-sm -rotate-90 origin-center z-10">
          ◀ {selectedAxes.xAxis.minLabel}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-mono font-medium text-[#2B3D4F] bg-[#FDFCF8]/90 px-2 py-1 rounded border border-[#DDD5C5] shadow-sm rotate-90 origin-center z-10">
          ▶ {selectedAxes.xAxis.maxLabel}
        </div>

        {/* Planned Target Positioning for this venture */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
          style={{ left: '72%', top: '28%' }}
        >
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-[#2B3D4F] border-2 border-white shadow-sm" />
            <div className="absolute -inset-1 rounded-full border border-[#2B3D4F]/40 pointer-events-none" />
          </div>
          <span className="mt-1 text-[11px] font-mono font-bold text-white bg-[#2B3D4F]/90 px-2 py-0.5 rounded shadow">
            ★ {ventureName} (Proposed Wedge)
          </span>
        </div>

        {/* Plotted Competitor Nodes */}
        {competitors.map((comp) => {
          const coords = getCoordinatesPct(comp.coordinates.x, comp.coordinates.y);
          const isSelected = selectedCompetitor?.id === comp.id;

          return (
            <div
              key={comp.id}
              onClick={() => setSelectedCompetitor(comp)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-110"
              style={{ left: coords.left, top: coords.top }}
            >
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-md transition-all ${
                  comp.isUserAdded
                    ? 'bg-[#4A7C59]/15 border-[#4A7C59]/50 text-[#2B3D4F]'
                    : isSelected
                    ? 'bg-[#2B3D4F] border-[#2B3D4F] text-[#F5F1EB] ring-2 ring-[#2B3D4F]/30'
                    : 'bg-[#ECE6DA]/90 border-[#DDD5C5] text-[#2B3D4F] hover:border-[#2B3D4F]/60'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    comp.isUserAdded
                      ? 'bg-[#4A7C59]'
                      : comp.category === 'direct'
                      ? 'bg-[#9E4A4A]'
                      : comp.category === 'indirect'
                      ? 'bg-[#8A6D2B]'
                      : 'bg-[#5B6B7F]'
                  }`}
                />
                <span className="text-xs font-medium whitespace-nowrap">{comp.name}</span>
                {comp.isUserAdded ? (
                  <span className="text-[9px] font-mono bg-[#4A7C59]/20 text-[#4A7C59] px-1 rounded">
                    USER
                  </span>
                ) : (
                  <span
                    className="text-[9px] font-mono bg-[#2B3D4F]/10 text-[#2B3D4F] px-1 rounded border border-[#2B3D4F]/20"
                    title="Model-generated archetype — not a verified company"
                  >
                    ARCHETYPE
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Competitor Drilldown Card (Appears when a competitor is clicked) */}
      {selectedCompetitor && (
        <div className="p-4 rounded-xl bg-[#FDFCF8] border border-[#2B3D4F]/40 space-y-3 animate-fade-in shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#2B3D4F]">{selectedCompetitor.name}</h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    getProvenanceBadge(selectedCompetitor.provenance).bg
                  }`}
                >
                  {getProvenanceBadge(selectedCompetitor.provenance).text}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#ECE6DA] text-[#4A5E73] border border-[#DDD5C5]">
                  {selectedCompetitor.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ECE6DA] text-[#4A5E73] border border-[#DDD5C5]">
                  Tier: {selectedCompetitor.priceTier}
                </span>
              </div>
              <p className="text-xs text-[#4A5E73] mt-1.5 leading-relaxed">
                {selectedCompetitor.offeringSummary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCompetitor(null)}
              className="text-[#6B7D90] hover:text-[#2B3D4F] p-1 rounded hover:bg-[#ECE6DA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-[#DDD5C5]/60 text-xs">
            <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-1">
              <span className="text-[10px] font-mono text-[#6B7D90] block mb-0.5">
                POSITIONING & PRICING
              </span>
              <div className="text-xs font-semibold text-[#2B3D4F]">
                {selectedCompetitor.positioningLabel}
              </div>
              <div className="text-[11px] text-[#4A5E73]">
                <span className="text-[#6B7D90]">Pricing Model:</span> {selectedCompetitor.businessPricingModel || `Tier: ${selectedCompetitor.priceTier}`}
              </div>
              <div className="text-[11px] text-[#4A5E73]">
                <span className="text-[#6B7D90]">Target Customer:</span> {selectedCompetitor.targetCustomer || 'General Category Demographic'}
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
              <span className="text-[10px] font-mono text-[#4A7C59] block mb-1">
                KEY STRENGTHS
              </span>
              <ul className="space-y-1 text-[11px] text-[#4A5E73]">
                {selectedCompetitor.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#4A7C59] shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
              <span className="text-[10px] font-mono text-[#8A6D2B] block mb-1">
                VULNERABILITIES / SHORTCOMINGS
              </span>
              <ul className="space-y-1 text-[11px] text-[#4A5E73]">
                {selectedCompetitor.weaknesses.map((wk, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#8A6D2B] shrink-0" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Provenance & Evidence Basis Bar */}
          <div className="p-2 rounded bg-[#F5F1EB] border border-[#DDD5C5] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#4A5E73]">
            <div className="flex items-center gap-2">
              <span className="text-[#6B7D90]">Source/Basis:</span>
              <span>{selectedCompetitor.evidenceSource || 'Derived from market structure and category benchmark'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Confidence: <span className="text-[#2B3D4F] font-semibold">{selectedCompetitor.confidence || 'Medium'}</span></span>
              {selectedCompetitor.provenance === 'NEEDS_VALIDATION' && (
                <span className="text-[#8A6D2B]">● Information gap: Founder verification required</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Real Competitor */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C5]">
              <div>
                <h3 className="text-base font-bold text-[#2B3D4F]">Add Real Competitor</h3>
                <p className="text-xs text-[#4A5E73] mt-0.5">
                  Saved with provenance: <span className="text-[#4A7C59] font-mono">USER_PROVIDED</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#6B7D90] hover:text-[#2B3D4F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">
                    Competitor Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp or Local Roastery"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                  >
                    <option value="direct">Direct Competitor</option>
                    <option value="indirect">Indirect Competitor</option>
                    <option value="alternative_workaround">Status Quo Workaround</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">
                    Positioning Angle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mass-market low cost"
                    value={formPositioning}
                    onChange={(e) => setFormPositioning(e.target.value)}
                    className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">Price Tier</label>
                  <select
                    value={formPriceTier}
                    onChange={(e) => setFormPriceTier(e.target.value as any)}
                    className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                  >
                    <option value="budget">Budget / Commodity</option>
                    <option value="mid_market">Mid-Market</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise Bespoke</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">
                  Offering Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="What product/service do they sell and how do they deliver it?"
                  value={formOffering}
                  onChange={(e) => setFormOffering(e.target.value)}
                  className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">
                    Strengths (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand legacy, Huge distribution"
                    value={formStrengths}
                    onChange={(e) => setFormStrengths(e.target.value)}
                    className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">
                    Weaknesses (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stale products, Slow support"
                    value={formWeaknesses}
                    onChange={(e) => setFormWeaknesses(e.target.value)}
                    className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#4A5E73] block mb-1">
                  Their Primary Differentiation vs You
                </label>
                <input
                  type="text"
                  placeholder="e.g. Existing retail distribution network"
                  value={formDifferentiation}
                  onChange={(e) => setFormDifferentiation(e.target.value)}
                  className="w-full bg-[#ECE6DA] border border-[#DDD5C5] rounded px-3 py-2 text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
                />
              </div>

              {/* Coordinate Placement */}
              <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
                <span className="text-[11px] font-mono text-[#6B7D90] block">
                  Matrix Placement (-100 to +100)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-[#4A5E73] block">
                      {selectedAxes.xAxis.label}: {formX}
                    </span>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={formX}
                      onChange={(e) => setFormX(Number(e.target.value))}
                      className="w-full accent-[#2B3D4F]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#4A5E73] block">
                      {selectedAxes.yAxis.label}: {formY}
                    </span>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={formY}
                      onChange={(e) => setFormY(Number(e.target.value))}
                      className="w-full accent-[#2B3D4F]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#DDD5C5]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-[#ECE6DA] text-[#4A5E73] hover:text-[#2B3D4F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#2B3D4F] text-white font-medium hover:bg-[#3E5770]"
                >
                  Save Competitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
