import React, { useRef, useState } from 'react';
import { Plus, X, Compass, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
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
  onOpenCompetitorRoadmap?: () => void;
  ventureName: string;
}

export const PositioningMatrix: React.FC<PositioningMatrixProps> = ({
  competitors,
  availableAxes,
  selectedAxes,
  onUpdateAxes,
  onAddCompetitor,
  onOpenCompetitorRoadmap,
  ventureName,
}) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [showArchetypes, setShowArchetypes] = useState(true);
  const [showVerified, setShowVerified] = useState(true);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    panX: number;
    panY: number;
    active: boolean;
  } | null>(null);

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
        return { text: 'User Provided', bg: 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30' };
      case 'VERIFIED_SOURCE':
        return { text: 'Verified Source', bg: 'bg-[#3E7A73]/10 text-[#3E7A73] border-[#3E7A73]/30' };
      case 'AI_INFERENCE':
        return { text: 'AI Inference Archetype', bg: 'bg-[#14213D]/15 text-[#14213D] border-[#14213D]/30' };
      case 'ASSUMPTION':
        return { text: 'Assumption', bg: 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30' };
      case 'NEEDS_VALIDATION':
      default:
        return { text: 'Needs Validation', bg: 'bg-[#EEF4FB] text-[#60738F] border-[#E2EAF4]' };
    }
  };

  const zoomIn = () => setZoom((z) => Math.min(1.8, Math.round((z + 0.15) * 100) / 100));
  const zoomOut = () => setZoom((z) => Math.max(0.7, Math.round((z - 0.15) * 100) / 100));
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const archetypeCount = competitors.filter((c) => !c.isUserAdded).length;
  const verifiedCount = competitors.filter((c) => c.isUserAdded).length;
  const visibleCompetitors = competitors.filter((c) =>
    c.isUserAdded ? showVerified : showArchetypes
  );

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Background-only pan: ignore drags starting on nodes / controls / CTAs.
    if ((e.target as HTMLElement).closest('[data-no-pan]')) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
      active: true,
    };
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag?.active) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    // 4px movement threshold before pan engages so clicks still work.
    if (!isPanning && Math.hypot(dx, dy) < 4) return;
    if (!isPanning) setIsPanning(true);
    setPan({ x: drag.panX + dx, y: drag.panY + dy });
  };

  const endPan = () => {
    if (dragRef.current) dragRef.current.active = false;
    dragRef.current = null;
    setIsPanning(false);
  };

  return (
    <div className="space-y-4">
      {/* Section Header with Dynamic Axis Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] p-4 rounded-lg border border-[#E2EAF4]">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#14213D]" />
            <h2 className="text-base font-semibold text-[#14213D]">
              Dynamic 2-Axis Positioning Matrix
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/20">
              Interactive
            </span>
          </div>
          <p className="text-xs text-[#60738F] mt-1">
            Dynamic strategic landscape. Click any competitor node to inspect offering and weaknesses, or add real verified competitors.
          </p>
        </div>

        {/* Dynamic Axis Pickers */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#60738F]">X-Axis:</span>
            <select
              value={selectedAxes.xAxis.id}
              onChange={(e) => handleAxisXChange(e.target.value)}
              className="bg-[#EEF4FB] text-[#14213D] border border-[#E2EAF4] rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#14213D]"
            >
              {availableAxes.map((axis) => (
                <option key={axis.id} value={axis.id} disabled={axis.id === selectedAxes.yAxis.id}>
                  {axis.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#60738F]">Y-Axis:</span>
            <select
              value={selectedAxes.yAxis.id}
              onChange={(e) => handleAxisYChange(e.target.value)}
              className="bg-[#EEF4FB] text-[#14213D] border border-[#E2EAF4] rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#14213D]"
            >
              {availableAxes.map((axis) => (
                <option key={axis.id} value={axis.id} disabled={axis.id === selectedAxes.xAxis.id}>
                  {axis.label}
                </option>
              ))}
            </select>
          </div>

          {onOpenCompetitorRoadmap && (
            <button
              type="button"
              onClick={onOpenCompetitorRoadmap}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#EEF4FB] text-[#14213D] border border-[#E2EAF4] hover:bg-[#E2EAF4] text-xs font-medium transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              View Competitor Roadmap
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#14213D] text-white text-xs font-medium hover:bg-[#1769D2] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Real Competitor
          </button>
        </div>
      </div>

      {/* Node Legend */}
      <div className="flex flex-wrap items-center gap-4 px-1 text-[10px] font-mono text-[#60738F]">
        <span className="font-semibold text-[#14213D]">Legend:</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-[#FFFFFF]" style={{ backgroundColor: '#9C4738' }} />
          <span>Direct Competitor (archetype)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border border-[#FFFFFF]" style={{ backgroundColor: '#7D6536' }} />
          <span>Indirect Competitor (archetype)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-[#FFFFFF]" style={{ backgroundColor: '#4A5B6C' }} />
          <span>Status-Quo Workaround (archetype)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border-2 border-[#2C3527] bg-[#2C3527]" />
          <span>Proposed Venture Target</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border-2 border-[#3E6F4A] bg-[#3E6F4A]" />
          <span>Verified Competitor</span>
        </div>
      </div>

      {/* Evidence Integrity Status Bar */}
      <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase font-bold text-[#60738F]">Market Evidence:</span>
          {competitors.some((c) => (c.competitorType === 'VERIFIED_COMPETITOR' || c.provenance === 'VERIFIED_SOURCE' || c.isUserAdded)) && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19A875]" />
              {competitors.filter((c) => (c.competitorType === 'VERIFIED_COMPETITOR' || c.provenance === 'VERIFIED_SOURCE' || c.isUserAdded)).length} Verified
            </span>
          )}
          {competitors.some((c) => c.competitorType === 'OBSERVED_MARKET_PLAYER') && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#3E7A73]/15 text-[#3E7A73] border border-[#3E7A73]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E7A73]" />
              {competitors.filter((c) => c.competitorType === 'OBSERVED_MARKET_PLAYER').length} Observed
            </span>
          )}
          {competitors.some((c) => c.competitorType === 'CATEGORY_ARCHETYPE' || (!c.competitorType && !c.isUserAdded && c.provenance !== 'VERIFIED_SOURCE')) && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#14213D]/10 text-[#14213D] border border-[#14213D]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14213D]" />
              {competitors.filter((c) => c.competitorType === 'CATEGORY_ARCHETYPE' || (!c.competitorType && !c.isUserAdded && c.provenance !== 'VERIFIED_SOURCE')).length} Archetype
            </span>
          )}
          {competitors.some((c) => c.competitorType === 'COUNCIL_HYPOTHESIS') && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFF3E7] text-[#F29A42] border border-[#F29A42]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F29A42]" />
              {competitors.filter((c) => c.competitorType === 'COUNCIL_HYPOTHESIS').length} Hypothesis
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#60738F]">
            {competitors.some((c) => (c.competitorType === 'VERIFIED_COMPETITOR' || c.provenance === 'VERIFIED_SOURCE' || c.isUserAdded))
              ? 'Specific market competitors verified and mapped.'
              : 'Category archetypes mapped. Add local or niche players to ground.'}
          </span>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#14213D] text-white text-xs font-medium hover:bg-[#1769D2] transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Player
          </button>
        </div>
      </div>
      <div
        className={`relative w-full h-[480px] bg-[#EEF4FB] rounded-xl border border-[#E2EAF4] overflow-hidden p-6 select-none shadow-inner ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handleCanvasPointerMove}
        onPointerUp={endPan}
        onPointerLeave={endPan}
      >
        {/* Entity filter toggles — small, muted slate, fixed top-left */}
        <div data-no-pan className="absolute top-3 left-3 z-30 flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              const next = !showArchetypes;
              setShowArchetypes(next);
              if (!next && selectedCompetitor && !selectedCompetitor.isUserAdded) {
                setSelectedCompetitor(null);
              }
            }}
            aria-pressed={showArchetypes}
            title={showArchetypes ? 'Hide archetype nodes' : 'Show archetype nodes'}
            className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-colors duration-150 ${showArchetypes ? 'bg-[#FFFFFF]/90 border-[#E2EAF4] text-[#14213D]' : 'bg-[#EEF4FB]/70 border-[#E2EAF4] text-[#60738F] opacity-60'}`}
          >
            Archetypes ({archetypeCount})
          </button>
          <button
            type="button"
            onClick={() => {
              const next = !showVerified;
              setShowVerified(next);
              if (!next && selectedCompetitor && selectedCompetitor.isUserAdded) {
                setSelectedCompetitor(null);
              }
            }}
            aria-pressed={showVerified}
            title={showVerified ? 'Hide verified nodes' : 'Show verified nodes'}
            className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-colors duration-150 ${showVerified ? 'bg-[#FFFFFF]/90 border-[#E2EAF4] text-[#14213D]' : 'bg-[#EEF4FB]/70 border-[#E2EAF4] text-[#60738F] opacity-60'}`}
          >
            Verified ({verifiedCount})
          </button>
        </div>

        {/* Zoom controls — small, muted slate, fixed top-right */}
        <div data-no-pan className="absolute top-3 right-3 z-30 flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= 0.7}
            aria-label="Zoom out"
            className="p-1.5 rounded bg-[#FFFFFF]/90 border border-[#E2EAF4] text-[#60738F] hover:text-[#14213D] hover:border-[#60738F]/40 transition-colors duration-150 disabled:opacity-40"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-[#60738F] bg-[#FFFFFF]/90 border border-[#E2EAF4] rounded px-1.5 py-1 min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= 1.8}
            aria-label="Zoom in"
            className="p-1.5 rounded bg-[#FFFFFF]/90 border border-[#E2EAF4] text-[#60738F] hover:text-[#14213D] hover:border-[#60738F]/40 transition-colors duration-150 disabled:opacity-40"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Reset zoom and pan"
            title="Reset zoom and pan"
            className="p-1.5 rounded bg-[#FFFFFF]/90 border border-[#E2EAF4] text-[#60738F] hover:text-[#14213D] hover:border-[#60738F]/40 transition-colors duration-150"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pan/zoom transform wrapper: grid + crosshairs + labels + nodes */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center',
            transition: isPanning ? 'none' : 'transform 150ms ease-out',
          }}
        >
        {/* Subtle Grid Background — clay-tinted */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #C9B8A3 1px, transparent 1px), linear-gradient(to bottom, #C9B8A3 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Center Crosshairs */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C9B8A3]/70 -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#C9B8A3]/70 -translate-y-1/2 pointer-events-none" />

        {/* Quadrant Watermarks / Labels — clay */}
        <div className="absolute top-4 left-6 text-[10px] font-mono uppercase tracking-wider text-[#B99B7A] pointer-events-none">
          Q2: High {selectedAxes.yAxis.label.split(' ')[0]} / Low {selectedAxes.xAxis.label.split(' ')[0]}
        </div>
        <div className="absolute top-4 right-6 text-[10px] font-mono uppercase tracking-wider text-[#B99B7A] pointer-events-none">
          Q1: PRIME OPPORTUNITY ({selectedAxes.yAxis.maxLabel.split('/')[0]} + {selectedAxes.xAxis.maxLabel.split('/')[0]})
        </div>
        <div className="absolute bottom-4 left-6 text-[10px] font-mono uppercase tracking-wider text-[#B99B7A] pointer-events-none">
          Q3: Commodity / Status Quo Workaround
        </div>
        <div className="absolute bottom-4 right-6 text-[10px] font-mono uppercase tracking-wider text-[#B99B7A] pointer-events-none">
          Q4: High {selectedAxes.xAxis.label.split(' ')[0]} / Low {selectedAxes.yAxis.label.split(' ')[0]}
        </div>

        {/* Axis Labels (North, South, East, West) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] font-mono font-medium text-[#14213D] bg-[#FFFFFF]/90 px-3 py-1 rounded border border-[#E2EAF4] shadow-sm z-10">
          ▲ {selectedAxes.yAxis.maxLabel}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-[#60738F] bg-[#FFFFFF]/90 px-3 py-1 rounded border border-[#E2EAF4] shadow-sm z-10">
          ▼ {selectedAxes.yAxis.minLabel}
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#60738F] bg-[#FFFFFF]/90 px-2 py-1 rounded border border-[#E2EAF4] shadow-sm -rotate-90 origin-center z-10">
          ◀ {selectedAxes.xAxis.minLabel}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-mono font-medium text-[#14213D] bg-[#FFFFFF]/90 px-2 py-1 rounded border border-[#E2EAF4] shadow-sm rotate-90 origin-center z-10">
          ▶ {selectedAxes.xAxis.maxLabel}
        </div>

        {/* Planned Target Positioning for this venture — solid strategic anchor */}
        <div
          data-no-pan
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
          style={{ left: '72%', top: '28%' }}
        >
          <div className="relative flex items-center justify-center">
            {/* Concentric territory radar rings */}
            <div className="absolute w-12 h-12 rounded-full border border-[#2C3527]/20 pointer-events-none animate-pulse" />
            <div className="absolute w-8 h-8 rounded-full border border-[#2C3527]/35 pointer-events-none" />
            <div className="w-4 h-4 rounded-full bg-[#2C3527] border-2 border-[#FFFFFF] shadow-md flex items-center justify-center">
              <span className="text-[7px] text-[#14213D] font-bold">★</span>
            </div>
          </div>
          <div className="mt-1.5 px-2.5 py-1 rounded bg-[#2C3527] text-[#14213D] shadow-md border border-[#2C3527] flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-tight">
              {ventureName}
            </span>
            <span className="text-[8px] font-mono uppercase px-1 py-0.2 bg-[#FFFFFF]/20 text-[#14213D] rounded">
              Proposed Wedge
            </span>
          </div>
        </div>

        {/* Plotted Competitor Nodes (structured cartographic coordinate anchors) */}
        {visibleCompetitors.map((comp, compIdx) => {
          const coords = getCoordinatesPct(comp.coordinates.x, comp.coordinates.y);
          const isSelected = selectedCompetitor?.id === comp.id;
          const stackIndex = visibleCompetitors.slice(0, compIdx).filter((other) => {
            const o = getCoordinatesPct(other.coordinates.x, other.coordinates.y);
            return (
              Math.abs(parseFloat(o.left) - parseFloat(coords.left)) < 7 &&
              Math.abs(parseFloat(o.top) - parseFloat(coords.top)) < 7
            );
          }).length;

          // Semantic category styling
          const isDirect = comp.category === 'direct';
          const isIndirect = comp.category === 'indirect';
          const pinColor = comp.isUserAdded
            ? '#3E6F4A'
            : isDirect
            ? '#9C4738'
            : isIndirect
            ? '#7D6536'
            : '#4A5B6C';

          return (
            <div
              key={comp.id}
              data-no-pan
              onClick={() => setSelectedCompetitor(comp)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-150"
              style={{
                left: coords.left,
                top: `calc(${coords.top} + ${stackIndex * 38}px)`,
              }}
            >
              {/* Coordinate projection crosshair lines when selected */}
              {isSelected && (
                <div className="absolute -inset-10 pointer-events-none">
                  <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-[#2C3527]/50" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-[#2C3527]/50" />
                </div>
              )}

              {/* Precise pin symbol */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3.5 h-3.5 border-2 shadow-sm transition-transform duration-150 group-hover:scale-125 ${
                    isDirect
                      ? 'rotate-45 rounded-sm'
                      : isIndirect
                      ? 'rounded-full'
                      : 'rounded-sm'
                  } ${
                    isSelected
                      ? 'border-[#2C3527] bg-[#2C3527] ring-2 ring-[#2C3527]/30'
                      : 'border-[#FFFFFF]'
                  }`}
                  style={{ backgroundColor: isSelected ? '#2C3527' : pinColor }}
                />

                {/* Hairline connector */}
                <div className="w-px h-1.5 bg-[#BDB5A2]" />

                {/* Cartographic Structured Node Card */}
                <div
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded border transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#2C3527] text-[#14213D] border-[#2C3527] ring-1 ring-[#2C3527]/30'
                      : comp.isUserAdded
                      ? 'bg-[#FFFFFF] text-[#2C3527] border-[#3E6F4A]/40 group-hover:border-[#3E6F4A]'
                      : 'bg-[#FFFFFF]/95 text-[#2C3527] border-[#E2EAF4] group-hover:border-[#7D6536]'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: pinColor }}
                  />
                  <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">
                    {comp.name}
                  </span>
                  <span
                    className={`text-[8.5px] font-mono uppercase px-1 py-0.2 rounded ${
                      isSelected
                        ? 'bg-[#FFFFFF]/20 text-[#14213D]'
                        : comp.isUserAdded
                        ? 'bg-[#3E6F4A]/10 text-[#3E6F4A]'
                        : 'bg-[#EFECE4] text-[#5E6857]'
                    }`}
                  >
                    {comp.isUserAdded ? 'VERIFIED' : comp.category.slice(0, 3)}
                  </span>
                </div>

                {/* Hover coordinate indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[8.5px] font-mono text-[#5E6857] bg-[#EFECE4] px-1 py-0.2 rounded mt-0.5 pointer-events-none whitespace-nowrap border border-[#E2EAF4]">
                  X: {comp.coordinates.x > 0 ? `+${comp.coordinates.x}` : comp.coordinates.x} · Y: {comp.coordinates.y > 0 ? `+${comp.coordinates.y}` : comp.coordinates.y}
                </div>
              </div>
            </div>
          );
        })}
        </div>{/* end pan/zoom transform wrapper */}

        {/* Empty state — fixed overlay outside pan/zoom so CTA stays clickable */}
        {competitors.length === 0 && (
          <div data-no-pan className="absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-none">
            <div className="max-w-sm text-center p-5 rounded-xl bg-[#FFFFFF]/95 border border-[#E2EAF4] shadow-sm space-y-2 pointer-events-auto">
              <p className="text-xs font-bold text-[#14213D]">No competitors plotted yet</p>
              <p className="text-[11px] text-[#60738F] leading-relaxed">
                Add 2–3 real competitors (name, positioning, price tier) to ground this
                landscape. Archetype points appear once Stage 01 discovery or a sample
                venture provides market context.
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#14213D] text-white text-xs font-medium hover:bg-[#1769D2] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Real Competitor
              </button>
            </div>
          </div>
        )}

        {/* Filter-empty state — filters hide everything, data preserved, venture node still renders behind */}
        {competitors.length > 0 && visibleCompetitors.length === 0 && (
          <div data-no-pan className="absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-none">
            <div className="max-w-sm text-center p-5 rounded-xl bg-[#FFFFFF]/95 border border-[#E2EAF4] shadow-sm space-y-2 pointer-events-auto">
              <p className="text-xs font-bold text-[#14213D]">Filters hide all competitors</p>
              <p className="text-[11px] text-[#60738F] leading-relaxed">
                {archetypeCount} archetype{archetypeCount === 1 ? '' : 's'} and {verifiedCount} verified competitor{verifiedCount === 1 ? '' : 's'} exist but are hidden by the current filters. No data was removed — toggle Archetypes / Verified back on to restore the landscape.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowArchetypes(true);
                  setShowVerified(true);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#14213D] text-white text-xs font-medium hover:bg-[#1769D2] transition-colors"
              >
                Show all competitors
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Competitor Drilldown Card (Appears when a competitor is clicked) */}
      {selectedCompetitor && (
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#14213D]/40 space-y-3 animate-fade-in shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-[#14213D]">{selectedCompetitor.name}</h3>
                {selectedCompetitor.competitorType && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30">
                    {selectedCompetitor.competitorType.replace(/_/g, ' ')}
                  </span>
                )}
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    getProvenanceBadge(selectedCompetitor.provenance).bg
                  }`}
                >
                  {getProvenanceBadge(selectedCompetitor.provenance).text}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#EEF4FB] text-[#60738F] border border-[#E2EAF4]">
                  {selectedCompetitor.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEF4FB] text-[#60738F] border border-[#E2EAF4]">
                  Tier: {selectedCompetitor.priceTier}
                </span>
                {selectedCompetitor.websiteUrl && (
                  <a
                    href={selectedCompetitor.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#14213D] hover:underline bg-[#14213D]/10 px-2 py-0.5 rounded border border-[#14213D]/20"
                  >
                    {selectedCompetitor.websiteUrl} ↗
                  </a>
                )}
              </div>
              <p className="text-xs text-[#60738F] mt-1.5 leading-relaxed">
                {selectedCompetitor.offeringSummary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCompetitor(null)}
              className="text-[#60738F] hover:text-[#14213D] p-1 rounded hover:bg-[#EEF4FB]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-[#E2EAF4] text-xs">
            <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4] space-y-1">
              <span className="text-[10px] font-mono text-[#60738F] block mb-0.5">
                POSITIONING & PRICING
              </span>
              <div className="text-xs font-semibold text-[#14213D]">
                {selectedCompetitor.positioningLabel}
              </div>
              <div className="text-[11px] text-[#60738F]">
                <span className="text-[#60738F]">Pricing Model:</span> {selectedCompetitor.businessPricingModel || `Tier: ${selectedCompetitor.priceTier}`}
              </div>
              <div className="text-[11px] text-[#60738F]">
                <span className="text-[#60738F]">Target Customer:</span> {selectedCompetitor.targetCustomer || 'General Category Demographic'}
              </div>
            </div>

            <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
              <span className="text-[10px] font-mono text-[#19A875] block mb-1">
                KEY STRENGTHS
              </span>
              <ul className="space-y-1 text-[11px] text-[#60738F]">
                {selectedCompetitor.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#19A875] shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
              <span className="text-[10px] font-mono text-[#F29A42] block mb-1">
                VULNERABILITIES / SHORTCOMINGS
              </span>
              <ul className="space-y-1 text-[11px] text-[#60738F]">
                {selectedCompetitor.weaknesses.map((wk, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#F29A42] shrink-0" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Provenance & Evidence Basis Bar */}
          <div className="p-2 rounded bg-[#EEF4FB] border border-[#E2EAF4] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#60738F]">
            <div className="flex items-center gap-2">
              <span className="text-[#60738F]">Source/Basis:</span>
              <span>{selectedCompetitor.evidenceSource || 'Derived from market structure and category benchmark'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Confidence: <span className="text-[#14213D] font-semibold">{selectedCompetitor.confidence || 'Medium'}</span></span>
              {selectedCompetitor.provenance === 'NEEDS_VALIDATION' && (
                <span className="text-[#F29A42]">● Information gap: Founder verification required</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Real Competitor */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EAF4]">
              <div>
                <h3 className="text-base font-bold text-[#14213D]">Add Real Competitor</h3>
                <p className="text-xs text-[#60738F] mt-0.5">
                  Saved with provenance: <span className="text-[#19A875] font-mono">USER_PROVIDED</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#60738F] hover:text-[#14213D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#60738F] block mb-1">
                    Competitor Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp or Local Roastery"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#60738F] block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                  >
                    <option value="direct">Direct Competitor</option>
                    <option value="indirect">Indirect Competitor</option>
                    <option value="alternative_workaround">Status Quo Workaround</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#60738F] block mb-1">
                    Positioning Angle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mass-market low cost"
                    value={formPositioning}
                    onChange={(e) => setFormPositioning(e.target.value)}
                    className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#60738F] block mb-1">Price Tier</label>
                  <select
                    value={formPriceTier}
                    onChange={(e) => setFormPriceTier(e.target.value as any)}
                    className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                  >
                    <option value="budget">Budget / Commodity</option>
                    <option value="mid_market">Mid-Market</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise Bespoke</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#60738F] block mb-1">
                  Offering Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="What product/service do they sell and how do they deliver it?"
                  value={formOffering}
                  onChange={(e) => setFormOffering(e.target.value)}
                  className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#60738F] block mb-1">
                    Strengths (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand legacy, Huge distribution"
                    value={formStrengths}
                    onChange={(e) => setFormStrengths(e.target.value)}
                    className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#60738F] block mb-1">
                    Weaknesses (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stale products, Slow support"
                    value={formWeaknesses}
                    onChange={(e) => setFormWeaknesses(e.target.value)}
                    className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#60738F] block mb-1">
                  Their Primary Differentiation vs You
                </label>
                <input
                  type="text"
                  placeholder="e.g. Existing retail distribution network"
                  value={formDifferentiation}
                  onChange={(e) => setFormDifferentiation(e.target.value)}
                  className="w-full bg-[#EEF4FB] border border-[#E2EAF4] rounded px-3 py-2 text-[#14213D] focus:outline-none focus:border-[#14213D]"
                />
              </div>

              {/* Coordinate Placement */}
              <div className="p-3 rounded bg-[#EEF4FB] border border-[#E2EAF4] space-y-2">
                <span className="text-[11px] font-mono text-[#60738F] block">
                  Matrix Placement (-100 to +100)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-[#60738F] block">
                      {selectedAxes.xAxis.label}: {formX}
                    </span>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={formX}
                      onChange={(e) => setFormX(Number(e.target.value))}
                      className="w-full accent-[#14213D]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#60738F] block">
                      {selectedAxes.yAxis.label}: {formY}
                    </span>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={formY}
                      onChange={(e) => setFormY(Number(e.target.value))}
                      className="w-full accent-[#14213D]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E2EAF4]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#14213D] text-white font-medium hover:bg-[#1769D2]"
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
