import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type {
  FeasibilityAssumption,
  FeasibilityDimensionId,
  FeasibilityDimensionResult,
  FeasibilityOpenQuestion,
  ProjectState,
} from '../../types/project';
import { useProject } from '../../context/ProjectContext';
import { Badge } from '../common/Badge';
import {
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AssumptionsAndQuestionsProps {
  assumptions: FeasibilityAssumption[];
  openQuestions: FeasibilityOpenQuestion[];
  dimensions?: Partial<Record<FeasibilityDimensionId, FeasibilityDimensionResult>>;
}

const EVIDENCE_DOT: Record<string, string> = {
  verified: 'bg-[#4A7C59]',
  'ai-inference': 'bg-[#2B3D4F]',
  assumption: 'bg-[#8A6D2B]',
  'needs-validation': 'bg-[#5A7A96]',
};

const IMPACT_WEIGHT: Record<string, number> = {
  critical: 3,
  high: 2,
  medium: 1,
  low: 0,
};

type TopologyNodeType = 'ASSUMPTION' | 'DEPENDENCY' | 'EVIDENCE' | 'RISK' | 'VALIDATION';

interface SemanticTopologyNode {
  id: string;
  label: string;
  semanticType: TopologyNodeType;
  dims: FeasibilityDimensionId[];
  whyExists: string;
  createdByAssumption: string;
  evidenceSupport: string;
  needsValidation: string;
}

// Dynamic semantic topology node generator representing actual venture causality:
// Assumption -> Dependency -> Evidence -> Risk -> Validation
function getDynamicTopologyNodes(state?: ProjectState): SemanticTopologyNode[] {
  const problem = state?.idea?.problem || state?.idea?.rawInput || 'unmet customer friction';
  const targetAudience = state?.idea?.targetAudience || 'target early adopters';
  const ventureName = state?.idea?.name || state?.project?.name || 'this venture';
  const productType = state?.businessModel?.productType || 'saas';
  const locationStr = state?.businessModel?.location?.cityRegion
    ? `${state.businessModel.location.cityRegion}, ${state.businessModel.location.country || ''}`
    : state?.businessModel?.location?.country || 'the operating territory';
  const deliveryModel = state?.businessModel?.deliveryModel || 'direct';

  const isPhysical = productType === 'physical';
  const isMarketplace = productType === 'marketplace';
  const isService = productType === 'service';

  return [
    {
      id: 'demand',
      label: 'Market Demand',
      semanticType: 'ASSUMPTION',
      dims: ['market', 'customer'],
      whyExists: `Core market thesis: Target customers (${targetAudience.slice(0, 45)}) actively suffer from "${problem.slice(0, 60)}" and seek a dedicated solution.`,
      createdByAssumption: `Root hypothesis: Addressable demand exists in ${locationStr} with sufficient problem urgency to overcome habit inertia.`,
      evidenceSupport: `Initial Stage 01 problem scoping and target ICP boundary definition.`,
      needsValidation: `Direct discovery interviews with at least 10 prospects matching the ${targetAudience.slice(0, 30)} profile.`,
    },
    {
      id: 'wtp',
      label: 'Willingness to Pay',
      semanticType: 'DEPENDENCY',
      dims: ['customer', 'financial'],
      whyExists: `Direct dependency of Market Demand; establishes that customers will part with capital for ${ventureName} rather than using free substitutes.`,
      createdByAssumption: `Directly driven by Market Demand; assumes target buyers recognize enough differentiated value to accept commercial pricing.`,
      evidenceSupport: `Category price point benchmarks and alternative workaround expenditure patterns.`,
      needsValidation: `Direct price elasticity testing via concierge pre-orders, deposit waitlists, or prototype pilot contracts.`,
    },
    {
      id: 'pricing',
      label: 'Pricing & Margin Viability',
      semanticType: 'DEPENDENCY',
      dims: ['financial', 'business-model'],
      whyExists: `Solvency bridge connecting buyer willingness to pay with direct unit costs and gross contribution margin targets.`,
      createdByAssumption: `Created by Willingness to Pay; assumes a healthy gross contribution margin can be sustained after direct delivery costs.`,
      evidenceSupport: `Cost structure assumptions under the ${deliveryModel.toUpperCase()} delivery model.`,
      needsValidation: `Signed supplier or infrastructure rate sheets and confirmed unit delivery reconciliations.`,
    },
    {
      id: 'seasonality',
      label: isPhysical ? 'Seasonality & Batch Cycle' : isMarketplace ? 'Two-Sided Liquidity Balance' : isService ? 'Utilization & Labor Capacity' : 'Retention & Churn Velocity',
      semanticType: 'ASSUMPTION',
      dims: ['market', 'operational'],
      whyExists: `Temporal constraint: ${isPhysical ? 'Demand and manufacturing lead times fluctuate across calendar cycles.' : isMarketplace ? 'Buyer engagement depends on maintaining balanced supplier availability.' : isService ? 'Revenue is constrained by deliverable staff hours and client onboarding bandwidth.' : 'Sustained net revenue retention requires steady cohort engagement without high early churn.'}`,
      createdByAssumption: `Assumes sustainable operational velocity without severe revenue cliffs or excessive carrying overhead.`,
      evidenceSupport: `Category benchmark cycles for ${productType.toUpperCase()} models in similar markets.`,
      needsValidation: `Cohort modeling and operational buffers to smooth seasonal or retention volatility.`,
    },
    {
      id: 'inventory',
      label: isPhysical ? 'Inventory Overhang Risk' : isMarketplace ? 'Chicken-Egg Cold Start Risk' : isService ? 'Labor Margin Compression' : 'CAC Payback & Burn Risk',
      semanticType: 'RISK',
      dims: ['operational', 'financial'],
      whyExists: `Downside exposure: ${isPhysical ? 'Unsold stock depreciates rapidly, trapping working capital before cash converts.' : isMarketplace ? 'Lack of liquidity on one side alienates early participants on the other.' : isService ? 'Staffing ahead of closed deals compresses billable margins.' : 'High paid acquisition costs or delayed sales cycles drain cash before payback.'}`,
      createdByAssumption: `Created by operational constraints combined with pricing and unit delivery thresholds.`,
      evidenceSupport: `Industry downside metrics showing capital trapping in early-stage ${productType.toUpperCase()} ventures.`,
      needsValidation: `Agile, small-batch commitments and capital-efficient initial distribution channels.`,
    },
    {
      id: 'cashflow',
      label: 'Cash-Flow Exposure',
      semanticType: 'RISK',
      dims: ['financial', 'execution'],
      whyExists: `Liquidity hazard: upfront development, procurement, and marketing expenses precede steady cash collection by 60–90 days.`,
      createdByAssumption: `Created by downside execution lag and customer payment terms or receivable delays.`,
      evidenceSupport: `Working capital cycle benchmarks for independent ${productType.toUpperCase()} launches.`,
      needsValidation: `Securing favorable payment terms, milestone billing, and maintaining a 3-month operating reserve.`,
    },
    {
      id: 'evidence',
      label: 'Pilot Pre-Order Signals',
      semanticType: 'EVIDENCE',
      dims: ['customer', 'competitive'],
      whyExists: `Empirical market proof validating actual customer willingness to commit funds before full-scale commercial commitment.`,
      createdByAssumption: `Substantiates Customer Willingness to Pay and mitigates Cash-Flow Exposure.`,
      evidenceSupport: `First-party waitlist signups, concierge pilot agreements, and early prototype feedback.`,
      needsValidation: `Conversion of initial pilot interest into retained, paying customers upon formal rollout.`,
    },
    {
      id: 'validation',
      label: isPhysical ? 'Supplier MOQ Terms Lock' : isMarketplace ? 'Supply Seeding Commitment' : isService ? 'Standardized Scope of Work' : 'Architecture SLA & Tech Stack',
      semanticType: 'VALIDATION',
      dims: ['operational', 'business-model'],
      whyExists: `Structural safeguard: locked operational terms and parameters guaranteeing predictable unit costs and reliable delivery.`,
      createdByAssumption: `Validates Pricing Viability and caps downside operational risks by preventing forced over-commitment.`,
      evidenceSupport: `Vendor quote sheets, verified cloud infrastructure specifications, and core workflow documentation.`,
      needsValidation: `Executed agreements with clear delivery timelines, service-level commitments, and volume flexibility.`,
    },
  ];
}

const GRAPH_NODES = getDynamicTopologyNodes();

// Semantic topology connections
const GRAPH_EDGES: { from: string; to: string; strength: 'strong' | 'medium'; relationship: string }[] = [
  { from: 'demand', to: 'wtp', strength: 'strong', relationship: 'drives willingness to pay' },
  { from: 'wtp', to: 'pricing', strength: 'strong', relationship: 'dictates price ceiling' },
  { from: 'pricing', to: 'inventory', strength: 'strong', relationship: 'shapes batch size & inventory exposure' },
  { from: 'demand', to: 'seasonality', strength: 'medium', relationship: 'concentrates sales velocity' },
  { from: 'seasonality', to: 'inventory', strength: 'strong', relationship: 'drives seasonal stock overhang' },
  { from: 'inventory', to: 'cashflow', strength: 'strong', relationship: 'amplifies working capital risk' },
  { from: 'evidence', to: 'wtp', strength: 'strong', relationship: 'substantiates price tolerance' },
  { from: 'validation', to: 'pricing', strength: 'strong', relationship: 'locks unit cost economics' },
  { from: 'validation', to: 'inventory', strength: 'medium', relationship: 'caps minimum inventory commitments' },
];

const TOPOLOGY_REST: Record<'strong' | 'medium', number> = { strong: 105, medium: 155 };
const TOPOLOGY_EDGE_WIDTH: Record<'strong' | 'medium', number> = { strong: 2.2, medium: 1.4 };
const TOPOLOGY_CENTER = { x: 290, y: 220 };

// Seed positions for semantic topology
const TOPOLOGY_INITIAL: Record<string, { x: number; y: number }> = {
  demand: { x: 130, y: 70 },
  evidence: { x: 440, y: 70 },
  wtp: { x: 290, y: 135 },
  seasonality: { x: 110, y: 220 },
  pricing: { x: 440, y: 205 },
  validation: { x: 460, y: 320 },
  inventory: { x: 260, y: 285 },
  cashflow: { x: 260, y: 395 },
};

const SEMANTIC_STYLES: Record<
  TopologyNodeType,
  { label: string; bg: string; border: string; text: string; tagBg: string; tagText: string }
> = {
  ASSUMPTION: {
    label: 'ASSUMPTION',
    bg: '#F4F2EC',
    border: '#55634B',
    text: '#2C3527',
    tagBg: '#55634B',
    tagText: '#FFFFFF',
  },
  DEPENDENCY: {
    label: 'DEPENDENCY',
    bg: '#F5F4EE',
    border: '#4A5B6C',
    text: '#1C2936',
    tagBg: '#4A5B6C',
    tagText: '#FFFFFF',
  },
  EVIDENCE: {
    label: 'EVIDENCE',
    bg: '#F2F7F2',
    border: '#3E6F4A',
    text: '#1B4025',
    tagBg: '#3E6F4A',
    tagText: '#FFFFFF',
  },
  RISK: {
    label: 'RISK',
    bg: '#FDF3F1',
    border: '#9C4738',
    text: '#581F15',
    tagBg: '#9C4738',
    tagText: '#FFFFFF',
  },
  VALIDATION: {
    label: 'VALIDATION',
    bg: '#F5F1F8',
    border: '#6B587B',
    text: '#342244',
    tagBg: '#6B587B',
    tagText: '#FFFFFF',
  },
};

interface TopologyNodeStatus {
  id: string;
  label: string;
  semanticType: TopologyNodeType;
  linkedCount: number;
  impactWeight: number;
  criticalCount: number;
  evidenceBackedCount: number;
  hasRisk: boolean;
  isEvidenceBacked: boolean;
  hoverTitle: string;
  whyExists: string;
  createdByAssumption: string;
  evidenceSupport: string;
  needsValidation: string;
}

interface AssumptionTopologyGraphProps {
  nodes?: SemanticTopologyNode[];
  assumptions: FeasibilityAssumption[];
  dimensions: Partial<Record<FeasibilityDimensionId, FeasibilityDimensionResult>>;
  activeGraphNodeId: string | null;
  onSelect: (id: string) => void;
  activeGraphEdgeKey: string | null;
  onSelectEdge: (key: string) => void;
}

const topologyEdgeKey = (from: string, to: string) => `${from}->${to}`;
const topologyNodeLabel = (id: string) => GRAPH_NODES.find((n) => n.id === id)?.label ?? id;

const describeTopologyEdge = (e: { from: string; to: string; strength: 'strong' | 'medium'; relationship: string }) => {
  return `${topologyNodeLabel(e.from)} → ${topologyNodeLabel(e.to)} — ${e.relationship} (${e.strength})`;
};

// Interactive force-directed SVG topology with semantic shapes, drag, zoom, pan,
// and transitive dependency highlighting.
const AssumptionTopologyGraph: React.FC<AssumptionTopologyGraphProps> = ({
  nodes,
  assumptions,
  dimensions,
  activeGraphNodeId,
  onSelect,
  activeGraphEdgeKey,
  onSelectEdge,
}) => {
  const activeNodes = nodes ?? GRAPH_NODES;
  const nodeMeta = useMemo<TopologyNodeStatus[]>(
    () =>
      activeNodes.map((node) => {
        const linked = assumptions.filter((a) => node.dims.includes(a.dimension));
        const linkedCount = linked.length;
        const connectedDims = node.dims
          .map((d) => dimensions[d])
          .filter((d): d is NonNullable<typeof d> => Boolean(d));
        const impactWeight = linked.reduce((sum, a) => sum + (IMPACT_WEIGHT[a.impact] ?? 0), 0);
        const criticalCount = linked.filter((a) => a.impact === 'critical').length;
        const evidenceBackedCount = linked.filter(
          (a) => (dimensions[a.dimension]?.evidence.length ?? 0) > 0
        ).length;
        const hasRisk = node.semanticType === 'RISK' || criticalCount > 0 || connectedDims.some((d) => d.rating === 'weak');
        const isEvidenceBacked = node.semanticType === 'EVIDENCE' || (linkedCount > 0 && evidenceBackedCount === linkedCount);
        const hoverTitle = `[${node.semanticType}] ${node.label}\nWhy: ${node.whyExists}\nAssumed by: ${node.createdByAssumption}`;
        return {
          id: node.id,
          label: node.label,
          semanticType: node.semanticType,
          linkedCount,
          impactWeight,
          criticalCount,
          evidenceBackedCount,
          hasRisk,
          isEvidenceBacked,
          hoverTitle,
          whyExists: node.whyExists,
          createdByAssumption: node.createdByAssumption,
          evidenceSupport: node.evidenceSupport,
          needsValidation: node.needsValidation,
        };
      }),
    [activeNodes, assumptions, dimensions]
  );

  // Compute transitive dependency chain for the selected node (ancestors + descendants)
  const connectedChainIds = useMemo<Set<string>>(() => {
    if (!activeGraphNodeId) return new Set();
    const chain = new Set<string>([activeGraphNodeId]);

    // Upstream (ancestors)
    const upstreamQueue = [activeGraphNodeId];
    while (upstreamQueue.length > 0) {
      const curr = upstreamQueue.shift()!;
      GRAPH_EDGES.filter((e) => e.to === curr).forEach((e) => {
        if (!chain.has(e.from)) {
          chain.add(e.from);
          upstreamQueue.push(e.from);
        }
      });
    }

    // Downstream (descendants)
    const downstreamQueue = [activeGraphNodeId];
    while (downstreamQueue.length > 0) {
      const curr = downstreamQueue.shift()!;
      GRAPH_EDGES.filter((e) => e.from === curr).forEach((e) => {
        if (!chain.has(e.to)) {
          chain.add(e.to);
          downstreamQueue.push(e.to);
        }
      });
    }

    return chain;
  }, [activeGraphNodeId]);

  const neighborMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    activeNodes.forEach((n) => map.set(n.id, new Set<string>()));
    GRAPH_EDGES.forEach((e) => {
      map.get(e.from)?.add(e.to);
      map.get(e.to)?.add(e.from);
    });
    return map;
  }, [activeNodes]);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => ({ ...TOPOLOGY_INITIAL }));
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragNodeRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ dx: 0, dy: 0 });
  const panDragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const suppressClickRef = useRef(false);

  // Gentle force simulation settling on seed topology
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const ids = activeNodes.map((n) => n.id);
    const pos: Record<string, { x: number; y: number }> = {};
    const vel: Record<string, { vx: number; vy: number }> = {};
    ids.forEach((id) => {
      pos[id] = { ...TOPOLOGY_INITIAL[id] };
      vel[id] = { vx: 0, vy: 0 };
    });
    let tick = 0;
    let raf = 0;
    const step = () => {
      tick += 1;
      for (let i = 0; i < ids.length; i += 1) {
        for (let j = i + 1; j < ids.length; j += 1) {
          const a = ids[i];
          const b = ids[j];
          const dx = pos[a].x - pos[b].x;
          const dy = pos[a].y - pos[b].y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 16);
          const force = Math.min(5000 / (dist * dist), 3.5);
          const fx = (force * dx) / dist;
          const fy = (force * dy) / dist;
          vel[a].vx += fx;
          vel[a].vy += fy;
          vel[b].vx -= fx;
          vel[b].vy -= fy;
        }
      }
      GRAPH_EDGES.forEach((e) => {
        const rest = TOPOLOGY_REST[e.strength];
        const dx = pos[e.to].x - pos[e.from].x;
        const dy = pos[e.to].y - pos[e.from].y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const f = 0.02 * (dist - rest);
        const ux = dx / dist;
        const uy = dy / dist;
        vel[e.from].vx += f * ux;
        vel[e.from].vy += f * uy;
        vel[e.to].vx -= f * ux;
        vel[e.to].vy -= f * uy;
      });
      let totalV = 0;
      ids.forEach((id) => {
        if (dragNodeRef.current === id) return;
        vel[id].vx += (TOPOLOGY_CENTER.x - pos[id].x) * 0.012;
        vel[id].vy += (TOPOLOGY_CENTER.y - pos[id].y) * 0.012;
        vel[id].vx *= 0.84;
        vel[id].vy *= 0.84;
        pos[id].x += vel[id].vx;
        pos[id].y += vel[id].vy;
        pos[id].x = Math.min(510, Math.max(70, pos[id].x));
        pos[id].y = Math.min(410, Math.max(35, pos[id].y));
        totalV += Math.abs(vel[id].vx) + Math.abs(vel[id].vy);
      });
      const snapshot = Object.fromEntries(ids.map((id) => [id, { ...pos[id] }])) as Record<
        string,
        { x: number; y: number }
      >;
      setPositions(snapshot);
      const avgV = totalV / ids.length;
      if (tick < 110 && avgV > 0.35) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [activeNodes]);

  const toWorld = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: TOPOLOGY_CENTER.x, y: TOPOLOGY_CENTER.y };
    const rect = svg.getBoundingClientRect();
    const sx = ((clientX - rect.left) / rect.width) * 580;
    const sy = ((clientY - rect.top) / rect.height) * 440;
    return { x: (sx - pan.x) / zoom, y: (sy - pan.y) / zoom };
  };

  const handleNodePointerDown = (e: React.PointerEvent<SVGGElement>, id: string) => {
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* fallback */
    }
    dragNodeRef.current = id;
    suppressClickRef.current = false;
    const w = toWorld(e.clientX, e.clientY);
    const p = positions[id] ?? TOPOLOGY_INITIAL[id];
    dragOffsetRef.current = { dx: p.x - w.x, dy: p.y - w.y };
  };

  const handleNodePointerMove = (e: React.PointerEvent<SVGGElement>, id: string) => {
    if (dragNodeRef.current !== id) return;
    const w = toWorld(e.clientX, e.clientY);
    const nx = Math.min(510, Math.max(70, w.x + dragOffsetRef.current.dx));
    const ny = Math.min(410, Math.max(35, w.y + dragOffsetRef.current.dy));
    const prev = positions[id];
    if (prev && Math.hypot(nx - prev.x, ny - prev.y) > 3) suppressClickRef.current = true;
    setPositions((prevPos) => ({ ...prevPos, [id]: { x: nx, y: ny } }));
  };

  const endNodeDrag = (id: string) => {
    if (dragNodeRef.current === id) dragNodeRef.current = null;
  };

  const handleBackgroundPointerDown = (e: React.PointerEvent<SVGRectElement>) => {
    panDragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handleBackgroundPointerMove = (e: React.PointerEvent<SVGRectElement>) => {
    const d = panDragRef.current;
    if (!d) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 580 / rect.width;
    const scaleY = 440 / rect.height;
    setPan({ x: d.panX + (e.clientX - d.startX) * scaleX, y: d.panY + (e.clientY - d.startY) * scaleY });
  };

  const handleBackgroundPointerUp = () => {
    panDragRef.current = null;
  };

  const zoomIn = () => setZoom((z) => Math.min(1.8, Math.round((z + 0.2) * 100) / 100));
  const zoomOut = () => setZoom((z) => Math.max(0.6, Math.round((z - 0.2) * 100) / 100));
  const zoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const activeMeta = nodeMeta.find((n) => n.id === activeGraphNodeId) ?? null;
  const hoveredNeighbors = hoveredId ? (neighborMap.get(hoveredId) ?? new Set<string>()) : null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-h-[24px] text-[10px] font-mono text-[#5E6857]">
          <span>Drag nodes · click node to trace causal chain · pan canvas</span>
          {activeMeta && (
            <Badge variant="active">
              {activeMeta.semanticType}: {activeMeta.label}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={zoomOut}
            aria-label="Zoom out"
            className="px-2 py-0.5 rounded border border-[#CFC7B7] bg-[#F7F5EE] text-[#2C3527] text-[11px] font-mono leading-none transition-colors duration-200 hover:border-[#55634B]"
          >
            −
          </button>
          <span className="text-[10px] font-mono text-[#5E6857] w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={zoomIn}
            aria-label="Zoom in"
            className="px-2 py-0.5 rounded border border-[#CFC7B7] bg-[#F7F5EE] text-[#2C3527] text-[11px] font-mono leading-none transition-colors duration-200 hover:border-[#55634B]"
          >
            +
          </button>
          <button
            type="button"
            onClick={zoomReset}
            aria-label="Reset view"
            className="px-2 py-0.5 rounded border border-[#CFC7B7] bg-[#F7F5EE] text-[#2C3527] text-[10px] font-mono leading-none transition-colors duration-200 hover:border-[#55634B]"
          >
            Reset
          </button>
        </div>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 580 440"
        className="w-full h-auto block rounded-lg border border-[#DDD5C5]"
        role="group"
        aria-label="Assumption dependency topology"
      >
        <defs>
          <marker
            id="edge-arrow"
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#887F6E" />
          </marker>
          <marker
            id="edge-arrow-active"
            viewBox="0 0 10 10"
            refX={8}
            refY={5}
            markerWidth={6}
            markerHeight={6}
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2C3527" />
          </marker>
        </defs>

        <rect
          x={0}
          y={0}
          width={580}
          height={440}
          rx={8}
          fill="#F5F3EC"
          style={{ cursor: 'grab' }}
          onPointerDown={handleBackgroundPointerDown}
          onPointerMove={handleBackgroundPointerMove}
          onPointerUp={handleBackgroundPointerUp}
          onPointerCancel={handleBackgroundPointerUp}
        />

        {/* Blueprint watermark lines for subtle spatial depth */}
        <g stroke="#E7E2D6" strokeWidth={0.8} strokeDasharray="3 4">
          <line x1={40} y1={220} x2={540} y2={220} />
          <line x1={290} y1={30} x2={290} y2={410} />
        </g>

        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
          {GRAPH_EDGES.map((e) => {
            const a = positions[e.from];
            const b = positions[e.to];
            if (!a || !b) return null;

            const isPartOfActiveChain =
              activeGraphNodeId != null &&
              connectedChainIds.has(e.from) &&
              connectedChainIds.has(e.to);

            const isHoveredEdge =
              hoveredId != null && (e.from === hoveredId || e.to === hoveredId);

            const key = topologyEdgeKey(e.from, e.to);
            const isActiveEdge = activeGraphEdgeKey === key || isPartOfActiveChain;
            const dimmed =
              (activeGraphNodeId != null && !isPartOfActiveChain) ||
              (hoveredId != null && !isHoveredEdge && activeGraphNodeId == null);

            const whyConnected = describeTopologyEdge(e);

            // Vector math to offset edge from center to node border
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;
            const startX = a.x + ux * 45;
            const startY = a.y + uy * 20;
            const endX = b.x - ux * 48;
            const endY = b.y - uy * 22;

            return (
              <g
                key={key}
                onClick={(ev) => {
                  ev.stopPropagation();
                  onSelectEdge(key);
                }}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    onSelectEdge(key);
                  }
                }}
                onPointerDown={(ev) => ev.stopPropagation()}
                tabIndex={0}
                role="button"
                aria-pressed={isActiveEdge}
                aria-label={whyConnected}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <title>{whyConnected}</title>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="transparent"
                  strokeWidth={16}
                  style={{ pointerEvents: 'stroke' }}
                />
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={isActiveEdge ? '#2C3527' : '#9E9484'}
                  strokeWidth={
                    isActiveEdge
                      ? TOPOLOGY_EDGE_WIDTH[e.strength] + 1
                      : TOPOLOGY_EDGE_WIDTH[e.strength]
                  }
                  strokeDasharray={e.strength === 'medium' ? '4 3' : undefined}
                  markerEnd={isActiveEdge ? 'url(#edge-arrow-active)' : 'url(#edge-arrow)'}
                  opacity={dimmed ? 0.22 : 0.9}
                  style={{ transition: 'opacity 200ms, stroke 200ms', pointerEvents: 'none' }}
                />
              </g>
            );
          })}

          {nodeMeta.map((n) => {
            const p = positions[n.id] ?? TOPOLOGY_INITIAL[n.id];
            const isActive = activeGraphNodeId === n.id;
            const isInActiveChain = activeGraphNodeId != null && connectedChainIds.has(n.id);
            const isHovered = hoveredId === n.id;
            const isNeighbor = hoveredNeighbors?.has(n.id) ?? false;

            const dimmed =
              (activeGraphNodeId != null && !isInActiveChain) ||
              (hoveredId != null && !isHovered && !isNeighbor && activeGraphNodeId == null);

            const style = SEMANTIC_STYLES[n.semanticType];

            return (
              <g
                key={n.id}
                transform={`translate(${p.x} ${p.y})`}
                opacity={dimmed ? 0.25 : 1}
                style={{ transition: 'opacity 200ms', cursor: 'grab', userSelect: 'none' }}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId((h) => (h === n.id ? null : h))}
                onPointerDown={(e) => handleNodePointerDown(e, n.id)}
                onPointerMove={(e) => handleNodePointerMove(e, n.id)}
                onPointerUp={() => endNodeDrag(n.id)}
                onPointerCancel={() => endNodeDrag(n.id)}
                onClick={() => {
                  if (suppressClickRef.current) {
                    suppressClickRef.current = false;
                    return;
                  }
                  onSelect(n.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(n.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`[${n.semanticType}] ${n.label}`}
              >
                <title>{n.hoverTitle}</title>

                {/* Node Surface */}
                {n.semanticType === 'RISK' ? (
                  // Distinct chamfered shape for RISK
                  <polygon
                    points="-62,-22 52,-22 64,-10 64,22 -52,22 -64,10"
                    fill={isActive ? '#362420' : isInActiveChain ? '#FAECE8' : style.bg}
                    stroke={style.border}
                    strokeWidth={isActive ? 2.5 : isInActiveChain ? 2 : 1.5}
                    style={{ transition: 'fill 200ms, stroke 200ms' }}
                  />
                ) : n.semanticType === 'VALIDATION' ? (
                  // Stamped badge for VALIDATION
                  <rect
                    x={-64}
                    y={-22}
                    width={128}
                    height={44}
                    rx={6}
                    fill={isActive ? '#2D2235' : isInActiveChain ? '#F1EBF5' : style.bg}
                    stroke={style.border}
                    strokeWidth={isActive ? 2.5 : isInActiveChain ? 2 : 1.5}
                    strokeDasharray="4 2"
                    style={{ transition: 'fill 200ms, stroke 200ms' }}
                  />
                ) : (
                  // Rounded pill / capsule for ASSUMPTION, DEPENDENCY, EVIDENCE
                  <rect
                    x={-64}
                    y={-22}
                    width={128}
                    height={44}
                    rx={n.semanticType === 'EVIDENCE' ? 14 : 8}
                    fill={
                      isActive
                        ? '#263025'
                        : isInActiveChain
                        ? '#EAEBE3'
                        : style.bg
                    }
                    stroke={style.border}
                    strokeWidth={isActive ? 2.5 : isInActiveChain ? 2 : 1.5}
                    style={{ transition: 'fill 200ms, stroke 200ms' }}
                  />
                )}

                {/* Semantic tag header */}
                <rect
                  x={-56}
                  y={-18}
                  width={52}
                  height={11}
                  rx={3}
                  fill={style.tagBg}
                  opacity={isActive ? 0.9 : 0.85}
                />
                <text
                  x={-30}
                  y={-10}
                  textAnchor="middle"
                  fontSize={7.5}
                  fontWeight={800}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={style.tagText}
                  letterSpacing="0.05em"
                >
                  {n.semanticType}
                </text>

                {/* Label text */}
                <text
                  y={4}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isActive ? '#FAF8F5' : '#1F241C'}
                >
                  {n.label}
                </text>

                {/* Status indicator dot */}
                <circle
                  cx={52}
                  cy={-12}
                  r={3.5}
                  fill={style.border}
                  opacity={0.9}
                />
              </g>
            );
          })}
        </g>
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-y-1.5 pt-1 text-[10px] font-mono text-[#5E6857]">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#55634B]" /> ASSUMPTION
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#4A5B6C]" /> DEPENDENCY
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3E6F4A]" /> EVIDENCE
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rotate-45 bg-[#9C4738]" /> RISK
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded border border-dashed border-[#6B587B] bg-[#F5F1F8]" /> VALIDATION
          </span>
        </div>
        <span className="italic text-[#7A7568]">Click node to isolate dependency chain</span>
      </div>
    </div>
  );
};

export const AssumptionsAndQuestions: React.FC<AssumptionsAndQuestionsProps> = ({
  assumptions,
  openQuestions,
  dimensions = {},
}) => {
  const [expandedAssumptionId, setExpandedAssumptionId] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [activeGraphNodeId, setActiveGraphNodeId] = useState<string | null>(null);
  const [activeGraphEdgeKey, setActiveGraphEdgeKey] = useState<string | null>(null);

  const toggleAssumption = (id: string) => {
    setExpandedAssumptionId(expandedAssumptionId === id ? null : id);
  };

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  const { state } = useProject();
  const graphNodes = useMemo(() => getDynamicTopologyNodes(state), [state]);

  const activeGraphNode = graphNodes.find((n) => n.id === activeGraphNodeId) ?? null;
  const graphLinkedAssumptions = activeGraphNode
    ? assumptions.filter((a) => activeGraphNode.dims.includes(a.dimension))
    : [];
  const activeGraphEdge = GRAPH_EDGES.find((e) => topologyEdgeKey(e.from, e.to) === activeGraphEdgeKey) ?? null;
  const topologyNodeLabel = useCallback(
    (id: string) => graphNodes.find((n) => n.id === id)?.label ?? id,
    [graphNodes]
  );
  const dependsOnLabels = activeGraphNode
    ? GRAPH_EDGES.filter((e) => e.to === activeGraphNode.id).map((e) => topologyNodeLabel(e.from))
    : [];
  const feedsIntoLabels = activeGraphNode
    ? GRAPH_EDGES.filter((e) => e.from === activeGraphNode.id).map((e) => topologyNodeLabel(e.to))
    : [];

  const handleSelectGraphNode = (id: string) => {
    setActiveGraphNodeId(activeGraphNodeId === id ? null : id);
    setActiveGraphEdgeKey(null);
  };
  const handleSelectGraphEdge = (key: string) => {
    if (activeGraphEdgeKey === key) {
      setActiveGraphEdgeKey(null);
    } else {
      setActiveGraphEdgeKey(key);
      setActiveGraphNodeId(null);
    }
  };

  const dimensionOf = (dim: FeasibilityDimensionId) => dimensions[dim];

  return (
    <div className="space-y-6">
      {/* SECTION 04: ASSUMPTION INTELLIGENCE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[#55634B] tracking-wider font-semibold">
              Section 04 // Assumption Intelligence Chain
            </div>
            <p className="text-xs text-[#5E6857] mt-0.5">
              Structural premises the current assessment assumes. Click to inspect the full validation chain.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#5E6857]">
            {assumptions.length} Unproven Hypotheses
          </span>
        </div>

        {/* Visual Assumption Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {assumptions.map((assump) => {
            const isExpanded = expandedAssumptionId === assump.id;
            const linkedDim = dimensionOf(assump.dimension);

            return (
              <div
                key={assump.id}
                onClick={() => toggleAssumption(assump.id)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isExpanded
                    ? 'bg-[#EFECE4] border-[#55634B] ring-1 ring-[#55634B]/30 shadow-md'
                    : 'bg-[#FAF8F5] hover:bg-[#EFECE4] border-[#DDD5C5] hover:border-[#BDB5A2]'
                }`}
              >
                <div>
                  {/* Top Bar: Dimension + Impact Tag + Status */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#5E6857] tracking-wider">
                      {assump.dimension} Dimension
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30">
                        Unproven
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                          assump.impact === 'critical'
                            ? 'bg-[#9E4A4A]/15 text-[#9E4A4A] border-[#9E4A4A]/30'
                            : 'bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30'
                        }`}
                      >
                        {assump.impact} impact
                      </span>
                    </div>
                  </div>

                  {/* Assumption Statement */}
                  <h3 className="text-xs font-bold text-[#2C3527] leading-snug mb-2">
                    "{assump.statement}"
                  </h3>

                  {/* Chain Preview Bar */}
                  <div className="p-2 rounded bg-[#F2EFE8] border border-[#DDD5C5] flex items-center justify-between text-[10px] font-mono text-[#5E6857]">
                    <span className="text-[#7A7568]">Evidence → Test → Decision</span>
                    <span className="text-[#2C3527] truncate max-w-[240px]">
                      {linkedDim ? `${linkedDim.evidence.length} signals · ${linkedDim.confidence} confidence` : 'No linked evidence yet'}
                    </span>
                  </div>
                </div>

                {/* Click cue */}
                <div className="mt-3 pt-2 border-t border-[#DDD5C5]/80 flex items-center justify-between text-[10px] font-mono text-[#5E6857]">
                  <span className="text-[#2C3527]">
                    {isExpanded ? 'Hide Validation Chain' : 'View Full Validation Chain'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>

                {/* Expanded Validation Pipeline */}
                {isExpanded && (
                  <div
                    className="mt-3 pt-3 border-t border-[#DDD5C5] space-y-2 text-left animate-fade-in text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2.5 rounded bg-[#F2EFE8] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#8A6D2B] font-semibold block">
                        1. Assumption
                      </span>
                      <p className="text-[#4A5E73] text-[11px]">{assump.statement}</p>
                    </div>

                    <div className="flex justify-center text-[#5E6857]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F2EFE8] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#2C3527] font-semibold block">
                        2. Why it matters
                      </span>
                      <p className="text-[#4A5E73] text-[11px]">
                        {linkedDim
                          ? linkedDim.headline
                          : 'Linked dimension assessment is not available yet.'}
                      </p>
                    </div>

                    <div className="flex justify-center text-[#5E6857]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F2EFE8] border border-[#DDD5C5] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#3E6F4A] font-semibold block">
                        3. Current evidence · Confidence: {linkedDim ? linkedDim.confidence.toUpperCase() : 'UNKNOWN'}
                      </span>
                      {linkedDim && linkedDim.evidence.length > 0 ? (
                        <ul className="space-y-1">
                          {linkedDim.evidence.map((ev) => (
                            <li key={ev.id} className="flex items-start gap-1.5 text-[11px] text-[#4A5E73]">
                              <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${EVIDENCE_DOT[ev.type] ?? 'bg-[#5E6857]'}`} />
                              <span>
                                <span className="font-semibold text-[#2C3527]">{ev.label}:</span> {ev.content}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-[#7A7568] italic">No direct evidence attached yet.</p>
                      )}
                    </div>

                    <div className="flex justify-center text-[#5E6857]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F2EFE8] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#4A5B6C] font-semibold block">
                        4. Validation test
                      </span>
                      <p className="text-[#2C3527] text-[11px] font-medium">
                        {assump.validationMethod}
                      </p>
                    </div>

                    <div className="flex justify-center text-[#5E6857]">
                      <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="p-2.5 rounded bg-[#F2EFE8] border border-[#DDD5C5] space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#9C4738] font-semibold block">
                        5. Decision rule
                      </span>
                      <p className="text-[11px] text-[#4A5E73]">
                        Promote to SUPPORTED only on direct evidence; reject on contradictory evidence.
                        Until then this assumption stays UNPROVEN — define its kill criteria before testing.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assumption Dependency Graph with Stage 02 warm stone palette */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#2C3527] font-bold">
              Assumption → Dependency → Evidence → Risk Topology
            </span>
            <span className="text-[10px] font-mono text-[#5E6857]">
              {activeGraphNode
                ? `Inspecting: [${activeGraphNode.semanticType}] ${activeGraphNode.label} — click to clear`
                : activeGraphEdge
                  ? `${describeTopologyEdge(activeGraphEdge)} — click to clear`
                  : 'Click a node to trace full dependency chain'}
            </span>
          </div>
          <div className="py-1" role="group" aria-label="Assumption dependency topology">
            <AssumptionTopologyGraph
              nodes={graphNodes}
              assumptions={assumptions}
              dimensions={dimensions}
              activeGraphNodeId={activeGraphNodeId}
              onSelect={handleSelectGraphNode}
              activeGraphEdgeKey={activeGraphEdgeKey}
              onSelectEdge={handleSelectGraphEdge}
            />
          </div>

          {activeGraphEdge && !activeGraphNode && (
            <div className="pt-1">
              <div className="text-xs text-[#2C3527] p-2.5 rounded-lg bg-[#F2EFE8] border border-[#DDD5C5]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E6857] block mb-1">
                  Why connected
                </span>
                <span className="font-semibold">{describeTopologyEdge(activeGraphEdge)}</span>
              </div>
            </div>
          )}

          {/* 4-Tier Node Causal Inspector Breakdown */}
          {activeGraphNode && (
            <div className="pt-1 space-y-2.5">
              <div className="p-3 rounded-lg bg-[#EFECE4] border border-[#CFC7B7] space-y-2">
                <div className="flex items-center justify-between border-b border-[#DDD5C5] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#2C3527] text-[#FAF8F5]">
                      {activeGraphNode.semanticType}
                    </span>
                    <span className="text-sm font-bold text-[#2C3527]">{activeGraphNode.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveGraphNodeId(null)}
                    className="text-[10px] font-mono text-[#7A7568] hover:text-[#2C3527]"
                  >
                    Clear inspection [✕]
                  </button>
                </div>

                {/* 4-Question Analytical Inspection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#55634B] font-bold block mb-1">
                      1. Why this exists
                    </span>
                    <p className="text-[#3A4537] text-[11px] leading-relaxed">{activeGraphNode.whyExists}</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#4A5B6C] font-bold block mb-1">
                      2. What assumption creates it
                    </span>
                    <p className="text-[#3A4537] text-[11px] leading-relaxed">{activeGraphNode.createdByAssumption}</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#3E6F4A] font-bold block mb-1">
                      3. What evidence supports it
                    </span>
                    <p className="text-[#3A4537] text-[11px] leading-relaxed">{activeGraphNode.evidenceSupport}</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#9C4738] font-bold block mb-1">
                      4. What still needs validation
                    </span>
                    <p className="text-[#3A4537] text-[11px] leading-relaxed">{activeGraphNode.needsValidation}</p>
                  </div>
                </div>

                {/* Incoming & Outgoing Dependencies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="uppercase tracking-wider text-[#5E6857] block mb-0.5">Depends on</span>
                    {dependsOnLabels.length > 0 ? (
                      <span className="text-[#2C3527] font-semibold">{dependsOnLabels.join(', ')}</span>
                    ) : (
                      <span className="text-[#7A7568] italic">Root hypothesis (no upstream nodes)</span>
                    )}
                  </div>
                  <div className="p-2 rounded bg-[#FAF8F5] border border-[#DDD5C5]">
                    <span className="uppercase tracking-wider text-[#5E6857] block mb-0.5">Feeds into</span>
                    {feedsIntoLabels.length > 0 ? (
                      <span className="text-[#2C3527] font-semibold">{feedsIntoLabels.join(', ')}</span>
                    ) : (
                      <span className="text-[#7A7568] italic">Terminal node (capital exposure endpoint)</span>
                    )}
                  </div>
                </div>
              </div>

              {graphLinkedAssumptions.length > 0 && (
                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#DDD5C5] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#5E6857] block">
                    Linked Live Hypotheses ({graphLinkedAssumptions.length})
                  </span>
                  <ul className="space-y-1.5">
                    {graphLinkedAssumptions.map((a) => {
                      return (
                        <li key={a.id} className="text-xs text-[#3A4537] p-2 rounded bg-[#F2EFE8] border border-[#DDD5C5] flex items-start gap-2">
                          <span className={`font-bold shrink-0 ${a.impact === 'critical' ? 'text-[#8A6D2B]' : 'text-[#2C3527]'}`}>•</span>
                          <span className="min-w-0">
                            <span className="font-semibold text-[#2C3527]" title={a.statement}>"{a.statement}"</span>
                            <span className="block text-[10px] font-mono text-[#5E6857] mt-0.5">
                              {a.dimension} · {a.impact} impact · Test: {a.validationMethod}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 05: STRATEGIC QUESTIONS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-[#6B7D90] tracking-wider font-semibold">
              Section 05 // Strategic Open Questions
            </div>
            <p className="text-xs text-[#4A5E73] mt-0.5">
              Decisive unknowns that must be answered before capital commitment. Click to reveal strategic rationale.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#6B7D90]">
            {openQuestions.length} Decision Drivers
          </span>
        </div>

        {/* 4 Interactive Question Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {openQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            const linkedAssumption = assumptions.find((a) => a.dimension === q.dimension);

            return (
              <div
                key={q.id}
                onClick={() => toggleQuestion(q.id)}
                className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex flex-col justify-between select-none ${
                  isExpanded
                    ? 'bg-[#ECE6DA] border-[#2B3D4F] ring-1 ring-[#2B3D4F]/30 shadow-md'
                    : 'bg-[#FDFCF8] hover:bg-[#ECE6DA] border-[#DDD5C5] hover:border-[#C4B8A0]'
                }`}
              >
                <div>
                  {/* Top Bar: Dimension + Urgency Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90] tracking-wider">
                      {q.dimension}
                    </span>

                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-semibold flex items-center gap-1 ${
                        q.urgency === 'immediate'
                          ? 'bg-[#9E4A4A]/15 text-[#9E4A4A] border-[#9E4A4A]/30'
                          : q.urgency === 'pre-launch'
                          ? 'bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30'
                          : 'bg-[#2B3D4F]/15 text-[#2B3D4F] border-[#2B3D4F]/30'
                      }`}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      {q.urgency}
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-xs font-bold text-[#2B3D4F] leading-snug mb-1">
                    {q.question}
                  </h3>
                  <p className="text-[10px] font-mono text-[#6B7D90]">
                    Unlocks: <span className="text-[#2B3D4F] font-semibold">{q.dimension}</span>
                  </p>
                </div>

                {/* Click cue */}
                <div className="mt-3 pt-2 border-t border-[#DDD5C5]/80 flex items-center justify-between text-[10px] font-mono text-[#6B7D90]">
                  <span className="text-[#2B3D4F]">
                    {isExpanded ? 'Hide Strategic Rationale' : 'Inspect Strategic Context'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>

                {/* Expanded Context */}
                {isExpanded && (
                  <div
                    className="mt-3 pt-3 border-t border-[#DDD5C5] space-y-2.5 text-left animate-fade-in text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                      <span className="text-[10px] font-mono uppercase text-[#6B7D90] block mb-1">
                        Why this determines viability:
                      </span>
                      <p className="text-[#4A5E73] text-[11px] leading-relaxed">
                        {q.context}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5]">
                      <span className="text-[10px] font-mono uppercase text-[#2B3D4F] font-semibold block mb-1">
                        Suggested validation method:
                      </span>
                      <p className="text-[#4A5E73] text-[11px] leading-relaxed">
                        {linkedAssumption
                          ? linkedAssumption.validationMethod
                          : 'Founder interview plus targeted evidence capture for this dimension.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
