import React, { useState } from 'react';
import { Users, ArrowUpRight, X, ShieldAlert } from 'lucide-react';
import type { CustomerSegment } from '../../types/project';

interface CustomerSegmentsViewProps {
  segments: CustomerSegment[];
}

export const CustomerSegmentsView: React.FC<CustomerSegmentsViewProps> = ({ segments }) => {
  const [activeSegment, setActiveSegment] = useState<CustomerSegment | null>(null);

  const getFitBadge = (fit: CustomerSegment['potentialFit']) => {
    switch (fit) {
      case 'High':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Niche':
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
  };

  const getPainBadge = (pain: CustomerSegment['painIntensity']) => {
    switch (pain) {
      case 'High':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Moderate':
      default:
        return 'bg-slate-700/30 text-[#AAB4C3] border-slate-600/40';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#4D8DFF]" />
            <h2 className="text-base font-semibold text-[#F3F4F6]">
              Customer Segmentation & Audience Signals
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4D8DFF]/10 text-[#4D8DFF] border border-[#4D8DFF]/20">
              Dynamic Clusters
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Audience relevance scores derived from problem intensity, purchasing friction, and value-proposition fit.
          </p>
        </div>
      </div>

      {/* Visual Segment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {segments.map((seg) => {
          const isSelected = activeSegment?.id === seg.id;
          return (
            <div
              key={seg.id}
              onClick={() => setActiveSegment(isSelected ? null : seg)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:border-[#4D8DFF]/60 ${
                isSelected
                  ? 'bg-[#151E2B] border-[#4D8DFF] shadow-lg ring-1 ring-[#4D8DFF]/30'
                  : 'bg-[#0B1017] border-[#263244]'
              }`}
            >
              <div className="space-y-3">
                {/* Header: Segment Name & Fit */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#F3F4F6]">{seg.name}</h3>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {seg.provenance}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getFitBadge(
                      seg.potentialFit
                    )}`}
                  >
                    Fit: {seg.potentialFit}
                  </span>
                </div>

                {/* Relevance Score Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#64748B]">Relative Relevance</span>
                    <span className="font-bold text-[#F3F4F6]">{seg.relativeRelevance} / 100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#111823] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        seg.relativeRelevance >= 80
                          ? 'bg-emerald-500'
                          : seg.relativeRelevance >= 65
                          ? 'bg-[#4D8DFF]'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${seg.relativeRelevance}%` }}
                    />
                  </div>
                </div>

                {/* Pain Intensity & Core Need */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#64748B]">Pain Intensity:</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPainBadge(
                        seg.painIntensity
                      )}`}
                    >
                      ● {seg.painIntensity}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#111823] border border-[#263244]">
                    <span className="text-[10px] font-mono text-[#64748B] block mb-0.5">
                      CORE UNRESOLVED NEED
                    </span>
                    <p className="text-xs text-[#F3F4F6] leading-snug">{seg.coreNeed}</p>
                  </div>

                  <div className="p-2.5 rounded bg-[#111823] border border-[#263244]">
                    <span className="text-[10px] font-mono text-[#4D8DFF] block mb-0.5">
                      PRIMARY BUYING TRIGGER
                    </span>
                    <p className="text-xs text-[#AAB4C3] leading-snug">{seg.buyingTrigger}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-3 pt-2.5 border-t border-[#263244] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span>Click for interview prompts</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#4D8DFF]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Segment Intelligence Drawer/Modal */}
      {activeSegment && (
        <div className="p-4 rounded-xl bg-[#0B1017] border border-[#4D8DFF]/40 space-y-3 animate-fade-in shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#F3F4F6]">{activeSegment.name}</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Target Priority #{activeSegment.relativeRelevance >= 80 ? '1 (Beachhead)' : activeSegment.relativeRelevance >= 65 ? '2 (Secondary)' : '3 (Expansion)'}
                </span>
              </div>
              <p className="text-xs text-[#AAB4C3] mt-1">
                Deep profile for customer discovery interviews, positioning tone, and acquisition messaging.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSegment(null)}
              className="text-[#64748B] hover:text-[#F3F4F6] p-1 rounded hover:bg-[#151E2B]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#263244]/60 text-xs">
            <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wide block">
                Adoption Barriers to Dismantle
              </span>
              <ul className="space-y-1.5 text-xs text-[#AAB4C3]">
                {activeSegment.adoptionBarriers.map((barrier, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{barrier}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded bg-[#111823] border border-[#263244] space-y-2">
              <span className="text-[10px] font-mono text-[#4D8DFF] uppercase tracking-wide block">
                Validation Interview Prompts
              </span>
              <ul className="space-y-1.5 text-xs text-[#AAB4C3]">
                <li className="flex items-start gap-2">
                  <span className="text-[#4D8DFF] font-bold">Q1:</span>
                  <span>"How are you currently handling {activeSegment.coreNeed.toLowerCase()}?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4D8DFF] font-bold">Q2:</span>
                  <span>"What made you actively look for an alternative rather than sticking to your current setup?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4D8DFF] font-bold">Q3:</span>
                  <span>"If this solution saved you 5 hours or guaranteed peak freshness, what would you consider a fair price?"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
