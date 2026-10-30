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
        return 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30';
      case 'Medium':
        return 'bg-[#E8F2FF] text-[#2684F7] border-[#2684F7]/30';
      case 'Niche':
      default:
        return 'bg-[#F2EDFF] text-[#9272DB] border-[#9272DB]/30';
    }
  };

  const getPainBadge = (pain: CustomerSegment['painIntensity']) => {
    switch (pain) {
      case 'High':
        return 'bg-[#FFF0EF] text-[#E46D68] border-[#E46D68]/30';
      case 'Medium':
        return 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30';
      case 'Moderate':
      default:
        return 'bg-[#EEF4FB] text-[#60738F] border-[#E2EAF4]';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2684F7]" />
            <h2 className="text-base font-semibold text-[#14213D]">
              Customer Segmentation & Audience Signals
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              Dynamic Clusters
            </span>
          </div>
          <p className="text-xs text-[#60738F] mt-1">
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
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:border-[#2684F7]/40 ${
                isSelected
                  ? 'bg-[#FFFFFF] border-[#2684F7] shadow-md ring-2 ring-[#2684F7]/25'
                  : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-[#2684F7]/40'
              }`}
            >
              <div className="space-y-3">
                {/* Header: Segment Name & Fit */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#14213D]">{seg.name}</h3>
                    <span className="text-[10px] font-mono text-[#60738F]">
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
                    <span className="text-[#60738F]">Relative Relevance</span>
                    <span className="font-bold text-[#14213D]">{seg.relativeRelevance} / 100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EEF4FB] border border-[#E2EAF4] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        seg.relativeRelevance >= 80
                          ? 'bg-[#19A875]'
                          : seg.relativeRelevance >= 65
                          ? 'bg-[#2684F7]'
                          : 'bg-[#F29A42]'
                      }`}
                      style={{ width: `${seg.relativeRelevance}%` }}
                    />
                  </div>
                </div>

                {/* Pain Intensity & Core Need */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#60738F]">Pain Intensity:</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPainBadge(
                        seg.painIntensity
                      )}`}
                    >
                      ● {seg.painIntensity}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
                    <span className="text-[10px] font-mono text-[#60738F] block mb-0.5">
                      CORE UNRESOLVED NEED
                    </span>
                    <p className="text-xs text-[#14213D] leading-snug">{seg.coreNeed}</p>
                  </div>

                  <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4]">
                    <span className="text-[10px] font-mono text-[#60738F] block mb-0.5">
                      PRIMARY BUYING TRIGGER
                    </span>
                    <p className="text-xs text-[#60738F] leading-snug">{seg.buyingTrigger}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-3 pt-2.5 border-t border-[#E2EAF4] flex items-center justify-between text-[11px] font-mono text-[#60738F]">
                <span>Click for interview prompts</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2684F7]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Segment Intelligence Drawer/Modal */}
      {activeSegment && (
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] space-y-3 animate-fade-in shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#14213D]">{activeSegment.name}</h3>
                <span className="text-xs font-mono text-[#19A875] bg-[#E8F8F1] px-2 py-0.5 rounded border border-[#19A875]/20">
                  Target Priority #{activeSegment.relativeRelevance >= 80 ? '1 (Beachhead)' : activeSegment.relativeRelevance >= 65 ? '2 (Secondary)' : '3 (Expansion)'}
                </span>
              </div>
              <p className="text-xs text-[#60738F] mt-1">
                Deep profile for customer discovery interviews, positioning tone, and acquisition messaging.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSegment(null)}
              className="text-[#60738F] hover:text-[#14213D] p-1 rounded hover:bg-[#EEF4FB]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#E2EAF4] text-xs">
            <div className="p-3 rounded bg-[#EEF4FB] border border-[#E2EAF4] space-y-2">
              <span className="text-[10px] font-mono text-[#F29A42] uppercase tracking-wide block">
                Adoption Barriers to Dismantle
              </span>
              <ul className="space-y-1.5 text-xs text-[#60738F]">
                {activeSegment.adoptionBarriers.map((barrier, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#F29A42] shrink-0 mt-0.5" />
                    <span>{barrier}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded bg-[#EEF4FB] border border-[#E2EAF4] space-y-2">
              <span className="text-[10px] font-mono text-[#2684F7] uppercase tracking-wide block">
                Validation Interview Prompts
              </span>
              <ul className="space-y-1.5 text-xs text-[#60738F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#2684F7] font-bold">Q1:</span>
                  <span>"How are you currently handling {activeSegment.coreNeed.toLowerCase()}?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2684F7] font-bold">Q2:</span>
                  <span>"What made you actively look for an alternative rather than sticking to your current setup?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2684F7] font-bold">Q3:</span>
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
