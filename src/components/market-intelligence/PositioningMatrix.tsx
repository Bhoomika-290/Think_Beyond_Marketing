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

      {/* Node Legend */}
      <div className="flex flex-wrap items-center gap-4 px-1 text-[10px] font-mono text-[#4A5E73]">
        <span className="font-semibold text-[#2B3D4F]">Legend:</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-[#FAF8F5]" style={{ backgroundColor: '#9C4738' }} />
          <span>Direct Competitor (archetype)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border border-[#FAF8F5]" style={{ backgroundColor: '#7D6536' }} />
          <span>Indirect Competitor (archetype)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-[#FAF8F5]" style={{ backgroundColor: '#4A5B6C' }} />
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
      <div
        className={`relative w-full h-[480px] bg-[#F5F1EB] rounded-xl border border-[#DDD5C5] overflow-hidden p-6 select-none shadow-inner ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
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
            className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-colors duration-150 ${showArchetypes ? 'bg-[#FDFCF8]/90 border-[#DDD5C5] text-[#2B3D4F]' : 'bg-[#ECE6DA]/70 border-[#DDD5C5] text-[#6B7D90] opacity-60'}`}
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
            className={`text-[10px] font-mono px-2 py-1 rounded-full border transition-colors duration-150 ${showVerified ? 'bg-[#FDFCF8]/90 border-[#DDD5C5] text-[#2B3D4F]' : 'bg-[#ECE6DA]/70 border-[#DDD5C5] text-[#6B7D90] opacity-60'}`}
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
            className="p-1.5 rounded bg-[#FDFCF8]/90 border border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F] hover:border-[#4A5E73]/40 transition-colors duration-150 disabled:opacity-40"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-[#4A5E73] bg-[#FDFCF8]/90 border border-[#DDD5C5] rounded px-1.5 py-1 min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= 1.8}
            aria-label="Zoom in"
            className="p-1.5 rounded bg-[#FDFCF8]/90 border border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F] hover:border-[#4A5E73]/40 transition-colors duration-150 disabled:opacity-40"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label="Reset zoom and pan"
            title="Reset zoom and pan"
            className="p-1.5 rounded bg-[#FDFCF8]/90 border border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F] hover:border-[#4A5E73]/40 transition-colors duration-150"
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
            <div className="w-4 h-4 rounded-full bg-[#2C3527] border-2 border-[#FAF8F5] shadow-md flex items-center justify-center">
              <span className="text-[7px] text-[#FAF8F5] font-bold">★</span>
            </div>
          </div>
          <div className="mt-1.5 px-2.5 py-1 rounded bg-[#2C3527] text-[#FAF8F5] shadow-md border border-[#2C3527] flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-tight">
              {ventureName}
            </span>
            <span className="text-[8px] font-mono uppercase px-1 py-0.2 bg-[#FAF8F5]/20 text-[#FAF8F5] rounded">
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
                      : 'border-[#FAF8F5]'
                  }`}
                  style={{ backgroundColor: isSelected ? '#2C3527' : pinColor }}
                />

                {/* Hairline connector */}
                <div className="w-px h-1.5 bg-[#BDB5A2]" />

                {/* Cartographic Structured Node Card */}
                <div
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded border transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#2C3527] text-[#FAF8F5] border-[#2C3527] ring-1 ring-[#2C3527]/30'
                      : comp.isUserAdded
                      ? 'bg-[#FAF8F5] text-[#2C3527] border-[#3E6F4A]/40 group-hover:border-[#3E6F4A]'
                      : 'bg-[#FAF8F5]/95 text-[#2C3527] border-[#DDD5C5] group-hover:border-[#7D6536]'
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
                        ? 'bg-[#FAF8F5]/20 text-[#FAF8F5]'
                        : comp.isUserAdded
                        ? 'bg-[#3E6F4A]/10 text-[#3E6F4A]'
                        : 'bg-[#EFECE4] text-[#5E6857]'
                    }`}
                  >
                    {comp.isUserAdded ? 'VERIFIED' : comp.category.slice(0, 3)}
                  </span>
                </div>

                {/* Hover coordinate indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[8.5px] font-mono text-[#5E6857] bg-[#EFECE4] px-1 py-0.2 rounded mt-0.5 pointer-events-none whitespace-nowrap border border-[#DDD5C5]">
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
            <div className="max-w-sm text-center p-5 rounded-xl bg-[#FDFCF8]/95 border border-[#DDD5C5] shadow-sm space-y-2 pointer-events-auto">
              <p className="text-xs font-bold text-[#2B3D4F]">No competitors plotted yet</p>
              <p className="text-[11px] text-[#4A5E73] leading-relaxed">
                Add 2–3 real competitors (name, positioning, price tier) to ground this
                landscape. Archetype points appear once Stage 01 discovery or a sample
                venture provides market context.
              </p>
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
        )}

        {/* Filter-empty state — filters hide everything, data preserved, venture node still renders behind */}
        {competitors.length > 0 && visibleCompetitors.length === 0 && (
          <div data-no-pan className="absolute inset-0 z-30 flex items-center justify-center p-6 pointer-events-none">
            <div className="max-w-sm text-center p-5 rounded-xl bg-[#FDFCF8]/95 border border-[#DDD5C5] shadow-sm space-y-2 pointer-events-auto">
              <p className="text-xs font-bold text-[#2B3D4F]">Filters hide all competitors</p>
              <p className="text-[11px] text-[#4A5E73] leading-relaxed">
                {archetypeCount} archetype{archetypeCount === 1 ? '' : 's'} and {verifiedCount} verified competitor{verifiedCount === 1 ? '' : 's'} exist but are hidden by the current filters. No data was removed — toggle Archetypes / Verified back on to restore the landscape.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowArchetypes(true);
                  setShowVerified(true);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#2B3D4F] text-white text-xs font-medium hover:bg-[#3E5770] transition-colors"
              >
                Show all competitors
              </button>
            </div>
          </div>
        )}
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
