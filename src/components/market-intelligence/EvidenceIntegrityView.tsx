import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import type { MarketEvidenceItem, MarketEvidenceProvenance } from '../../types/project';

interface EvidenceIntegrityViewProps {
  evidenceLog: MarketEvidenceItem[];
  evidenceSummary: {
    verified: number;
    inference: number;
    assumptions: number;
    needsVal: number;
  };
}

export const EvidenceIntegrityView: React.FC<EvidenceIntegrityViewProps> = ({
  evidenceLog,
  evidenceSummary,
}) => {
  const [filterProvenance, setFilterProvenance] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const total =
    evidenceSummary.verified +
    evidenceSummary.inference +
    evidenceSummary.assumptions +
    evidenceSummary.needsVal;

  const verifiedPct = Math.round((evidenceSummary.verified / total) * 100);
  const inferencePct = Math.round((evidenceSummary.inference / total) * 100);
  const assumptionPct = Math.round((evidenceSummary.assumptions / total) * 100);
  const needsValPct = 100 - (verifiedPct + inferencePct + assumptionPct);

  const getProvenanceBadge = (prov: MarketEvidenceProvenance) => {
    switch (prov) {
      case 'USER_PROVIDED':
      case 'VERIFIED_SOURCE':
        return {
          label: 'Verified Source',
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'AI_INFERENCE':
        return {
          label: 'AI Inference',
          bg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-400',
        };
      case 'ASSUMPTION':
        return {
          label: 'Assumption',
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'NEEDS_VALIDATION':
      default:
        return {
          label: 'Needs Validation',
          bg: 'bg-slate-700/30 text-[#AAB4C3] border-slate-600/40',
          dot: 'bg-slate-400',
        };
    }
  };

  const filteredItems = evidenceLog.filter((item) => {
    const matchesFilter =
      filterProvenance === 'all' ||
      (filterProvenance === 'verified' &&
        (item.provenance === 'VERIFIED_SOURCE' || item.provenance === 'USER_PROVIDED')) ||
      (filterProvenance === 'inference' && item.provenance === 'AI_INFERENCE') ||
      (filterProvenance === 'assumption' && item.provenance === 'ASSUMPTION') ||
      (filterProvenance === 'needs_validation' && item.provenance === 'NEEDS_VALIDATION');

    const matchesSearch =
      !searchQuery ||
      item.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceOrBasis.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-[#0B1017] border border-[#263244] rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#263244]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4D8DFF]" />
            <h2 className="text-base font-semibold text-[#F3F4F6]">
              Market Evidence Integrity & Provenance Ledger
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#4D8DFF]/10 text-[#4D8DFF] border border-[#4D8DFF]/20">
              Audit Grade
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Strict epistemic separation: AI inferences and assumptions are never conflated with verified facts.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B]">
          Tracking {total} critical market signals
        </div>
      </div>

      {/* 4 Provenance Count Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          onClick={() => setFilterProvenance(filterProvenance === 'verified' ? 'all' : 'verified')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'verified'
              ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-400'
              : 'bg-[#111823] border-[#263244] hover:border-emerald-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>VERIFIED SOURCE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-xl font-bold text-[#F3F4F6] mt-1.5">{evidenceSummary.verified}</div>
          <p className="text-[10px] text-[#AAB4C3] mt-1">Founder / empirical facts</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'inference' ? 'all' : 'inference')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'inference'
              ? 'bg-blue-950/40 border-blue-500 ring-1 ring-blue-400'
              : 'bg-[#111823] border-[#263244] hover:border-blue-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-blue-400">
            <span>AI INFERENCE</span>
            <span className="w-2 h-2 rounded-full bg-blue-400" />
          </div>
          <div className="text-xl font-bold text-[#F3F4F6] mt-1.5">{evidenceSummary.inference}</div>
          <p className="text-[10px] text-[#AAB4C3] mt-1">Deductions from Stage 01/02</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'assumption' ? 'all' : 'assumption')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'assumption'
              ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-400'
              : 'bg-[#111823] border-[#263244] hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-amber-400">
            <span>ASSUMPTIONS</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <div className="text-xl font-bold text-[#F3F4F6] mt-1.5">{evidenceSummary.assumptions}</div>
          <p className="text-[10px] text-[#AAB4C3] mt-1">Hypotheses to falsify</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'needs_validation' ? 'all' : 'needs_validation')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'needs_validation'
              ? 'bg-slate-800 border-slate-400 ring-1 ring-slate-400'
              : 'bg-[#111823] border-[#263244] hover:border-slate-500'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#AAB4C3]">
            <span>NEEDS VALIDATION</span>
            <span className="w-2 h-2 rounded-full bg-slate-400" />
          </div>
          <div className="text-xl font-bold text-[#F3F4F6] mt-1.5">{evidenceSummary.needsVal}</div>
          <p className="text-[10px] text-[#AAB4C3] mt-1">Data gaps requiring input</p>
        </div>
      </div>

      {/* Multi-segmented bar */}
      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-[#111823] overflow-hidden flex">
          <div style={{ width: `${verifiedPct}%` }} className="h-full bg-emerald-500 transition-all duration-500" />
          <div style={{ width: `${inferencePct}%` }} className="h-full bg-blue-500 transition-all duration-500" />
          <div style={{ width: `${assumptionPct}%` }} className="h-full bg-amber-500 transition-all duration-500" />
          <div style={{ width: `${needsValPct}%` }} className="h-full bg-slate-600 transition-all duration-500" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
          <span>{verifiedPct}% Verified Empirical Evidence</span>
          <span>{inferencePct}% Reasoned Model Deductions</span>
          <span>{assumptionPct + needsValPct}% Actionable Validation Horizon</span>
        </div>
      </div>

      {/* Evidence Register List */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[#F3F4F6] font-semibold">Tracked Market Claims Register:</span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search claims or basis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#151E2B] border border-[#263244] rounded px-2.5 py-1 text-xs text-[#F3F4F6] placeholder-[#64748B] focus:outline-none focus:border-[#4D8DFF] w-48"
              />
            </div>
            {filterProvenance !== 'all' && (
              <button
                type="button"
                onClick={() => setFilterProvenance('all')}
                className="text-[10px] text-[#4D8DFF] hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {filteredItems.map((item) => {
            const badge = getProvenanceBadge(item.provenance);
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-lg bg-[#111823] border border-[#263244] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#64748B]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#AAB4C3]">
                      Confidence: <span className="text-[#F3F4F6] font-semibold">{item.confidence}</span>
                    </span>
                  </div>
                  <div className="font-medium text-[#F3F4F6] leading-snug">{item.claim}</div>
                  <div className="text-[11px] text-[#AAB4C3]">
                    <span className="text-[#64748B]">Basis:</span> {item.sourceOrBasis}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#151E2B] border border-[#263244] text-[11px] text-[#AAB4C3] md:w-72 shrink-0">
                  <span className="text-[9px] font-mono text-emerald-400 block uppercase mb-0.5">
                    Recommended Validation Action
                  </span>
                  {item.validationAction}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
