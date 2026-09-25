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
        return 'bg-[#4A7C59]/10 text-[#4A7C59] border-[#4A7C59]/30';
      case 'Medium':
        return 'bg-[#2B3D4F]/10 text-[#2B3D4F] border-[#2B3D4F]/30';
      case 'Niche':
      default:
        return 'bg-[#6C5E8F]/10 text-[#6C5E8F] border-[#6C5E8F]/30';
    }
  };

  const getPainBadge = (pain: CustomerSegment['painIntensity']) => {
    switch (pain) {
      case 'High':
        return 'bg-[#9E4A4A]/10 text-[#9E4A4A] border-[#9E4A4A]/30';
      case 'Medium':
        return 'bg-[#8A6D2B]/10 text-[#8A6D2B] border-[#8A6D2B]/30';
      case 'Moderate':
      default:
        return 'bg-[#ECE6DA] text-[#4A5E73] border-[#DDD5C5]';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2B3D4F]" />
            <h2 className="text-base font-semibold text-[#2B3D4F]">
              Customer Segmentation & Audience Signals
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/20">
              Dynamic Clusters
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
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
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:border-[#2B3D4F]/60 ${
                isSelected
                  ? 'bg-[#ECE6DA] border-[#2B3D4F] shadow-lg ring-1 ring-[#2B3D4F]/30'
                  : 'bg-[#FDFCF8] border-[#DDD5C5]'
              }`}
            >
              <div className="space-y-3">
                {/* Header: Segment Name & Fit */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#2B3D4F]">{seg.name}</h3>
                    <span className="text-[10px] font-mono text-[#6B7D90]">
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
                    <span className="text-[#6B7D90]">Relative Relevance</span>
                    <span className="font-bold text-[#2B3D4F]">{seg.relativeRelevance} / 100</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F5F1EB] border border-[#DDD5C5] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        seg.relativeRelevance >= 80
                          ? 'bg-[#4A7C59]'
                          : seg.relativeRelevance >= 65
                          ? 'bg-[#2B3D4F]'
                          : 'bg-[#8A6D2B]'
                      }`}
                      style={{ width: `${seg.relativeRelevance}%` }}
                    />
                  </div>
                </div>

                {/* Pain Intensity & Core Need */}
                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#6B7D90]">Pain Intensity:</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPainBadge(
                        seg.painIntensity
                      )}`}
                    >
                      ● {seg.painIntensity}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono text-[#6B7D90] block mb-0.5">
                      CORE UNRESOLVED NEED
                    </span>
                    <p className="text-xs text-[#2B3D4F] leading-snug">{seg.coreNeed}</p>
                  </div>

                  <div className="p-2.5 rounded bg-[#F5F1EB] border border-[#DDD5C5]">
                    <span className="text-[10px] font-mono text-[#2B3D4F] block mb-0.5">
                      PRIMARY BUYING TRIGGER
                    </span>
                    <p className="text-xs text-[#4A5E73] leading-snug">{seg.buyingTrigger}</p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-3 pt-2.5 border-t border-[#DDD5C5] flex items-center justify-between text-[11px] font-mono text-[#6B7D90]">
                <span>Click for interview prompts</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2B3D4F]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Segment Intelligence Drawer/Modal */}
      {activeSegment && (
        <div className="p-4 rounded-xl bg-[#FDFCF8] border border-[#2B3D4F]/40 space-y-3 animate-fade-in shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#2B3D4F]">{activeSegment.name}</h3>
                <span className="text-xs font-mono text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-0.5 rounded border border-[#4A7C59]/20">
                  Target Priority #{activeSegment.relativeRelevance >= 80 ? '1 (Beachhead)' : activeSegment.relativeRelevance >= 65 ? '2 (Secondary)' : '3 (Expansion)'}
                </span>
              </div>
              <p className="text-xs text-[#4A5E73] mt-1">
                Deep profile for customer discovery interviews, positioning tone, and acquisition messaging.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSegment(null)}
              className="text-[#6B7D90] hover:text-[#2B3D4F] p-1 rounded hover:bg-[#ECE6DA]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#DDD5C5]/60 text-xs">
            <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
              <span className="text-[10px] font-mono text-[#8A6D2B] uppercase tracking-wide block">
                Adoption Barriers to Dismantle
              </span>
              <ul className="space-y-1.5 text-xs text-[#4A5E73]">
                {activeSegment.adoptionBarriers.map((barrier, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#8A6D2B] shrink-0 mt-0.5" />
                    <span>{barrier}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded bg-[#F5F1EB] border border-[#DDD5C5] space-y-2">
              <span className="text-[10px] font-mono text-[#2B3D4F] uppercase tracking-wide block">
                Validation Interview Prompts
              </span>
              <ul className="space-y-1.5 text-xs text-[#4A5E73]">
                <li className="flex items-start gap-2">
                  <span className="text-[#2B3D4F] font-bold">Q1:</span>
                  <span>"How are you currently handling {activeSegment.coreNeed.toLowerCase()}?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B3D4F] font-bold">Q2:</span>
                  <span>"What made you actively look for an alternative rather than sticking to your current setup?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B3D4F] font-bold">Q3:</span>
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
