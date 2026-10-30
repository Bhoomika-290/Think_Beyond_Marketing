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
          bg: 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30',
          dot: 'bg-[#19A875]',
        };
      case 'AI_INFERENCE':
        return {
          label: 'AI Inference',
          bg: 'bg-[#E8F2FF] text-[#2684F7] border-[#2684F7]/30',
          dot: 'bg-[#2684F7]',
        };
      case 'ASSUMPTION':
        return {
          label: 'Assumption',
          bg: 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30',
          dot: 'bg-[#F29A42]',
        };
      case 'NEEDS_VALIDATION':
      default:
        return {
          label: 'Needs Validation',
          bg: 'bg-[#EEF4FB] text-[#60738F] border-[#E2EAF4]',
          dot: 'bg-[#8495AE]',
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
    <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2EAF4]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2684F7]" />
            <h2 className="text-base font-semibold text-[#14213D]">
              Market Evidence Integrity & Provenance Ledger
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              Audit Grade
            </span>
          </div>
          <p className="text-xs text-[#60738F] mt-1">
            Strict epistemic separation: AI inferences and assumptions are never conflated with verified facts.
          </p>
        </div>

        <div className="text-xs font-mono text-[#60738F]">
          Tracking {total} critical market signals
        </div>
      </div>

      {/* 4 Provenance Count Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          onClick={() => setFilterProvenance(filterProvenance === 'verified' ? 'all' : 'verified')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'verified'
              ? 'bg-[#E8F8F1] border-[#19A875] ring-2 ring-[#19A875]/30 shadow-xs'
              : 'bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#19A875]/30'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#19A875]">
            <span>VERIFIED SOURCE</span>
            <span className="w-2 h-2 rounded-full bg-[#19A875]" />
          </div>
          <div className="text-xl font-bold text-[#14213D] mt-1.5">{evidenceSummary.verified}</div>
          <p className="text-[10px] text-[#60738F] mt-1">Founder / empirical facts</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'inference' ? 'all' : 'inference')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'inference'
              ? 'bg-[#F2EDFF] border-[#9272DB] ring-2 ring-[#9272DB]/30 shadow-xs'
              : 'bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#9272DB]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#9272DB]">
            <span>AI INFERENCE</span>
            <span className="w-2 h-2 rounded-full bg-[#9272DB]" />
          </div>
          <div className="text-xl font-bold text-[#14213D] mt-1.5">{evidenceSummary.inference}</div>
          <p className="text-[10px] text-[#60738F] mt-1">Deductions from Stage 01/02</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'assumption' ? 'all' : 'assumption')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'assumption'
              ? 'bg-[#FFF3E7] border-[#F29A42] ring-2 ring-[#F29A42]/30 shadow-xs'
              : 'bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#F29A42]/30'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#F29A42]">
            <span>ASSUMPTIONS</span>
            <span className="w-2 h-2 rounded-full bg-[#F29A42]" />
          </div>
          <div className="text-xl font-bold text-[#14213D] mt-1.5">{evidenceSummary.assumptions}</div>
          <p className="text-[10px] text-[#60738F] mt-1">Hypotheses to falsify</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'needs_validation' ? 'all' : 'needs_validation')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'needs_validation'
              ? 'bg-[#EEF4FB] border-[#60738F] ring-2 ring-[#60738F]/30 shadow-xs'
              : 'bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#8495AE]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#60738F]">
            <span>NEEDS VALIDATION</span>
            <span className="w-2 h-2 rounded-full bg-[#8495AE]" />
          </div>
          <div className="text-xl font-bold text-[#14213D] mt-1.5">{evidenceSummary.needsVal}</div>
          <p className="text-[10px] text-[#60738F] mt-1">Data gaps requiring input</p>
        </div>
      </div>

      {/* Multi-segmented bar */}
      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-[#EEF4FB] border border-[#E2EAF4] overflow-hidden flex">
          <div style={{ width: `${verifiedPct}%` }} className="h-full bg-[#19A875] transition-all duration-500" />
          <div style={{ width: `${inferencePct}%` }} className="h-full bg-[#9272DB] transition-all duration-500" />
          <div style={{ width: `${assumptionPct}%` }} className="h-full bg-[#F29A42] transition-all duration-500" />
          <div style={{ width: `${needsValPct}%` }} className="h-full bg-[#8495AE] transition-all duration-500" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#60738F]">
          <span>{verifiedPct}% Verified Empirical Evidence</span>
          <span>{inferencePct}% Reasoned Model Deductions</span>
          <span>{assumptionPct + needsValPct}% Actionable Validation Horizon</span>
        </div>
      </div>

      {/* Evidence Register List */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[#14213D] font-semibold">Tracked Market Claims Register:</span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search claims or basis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#EEF4FB] border border-[#E2EAF4] rounded px-2.5 py-1 text-xs text-[#14213D] placeholder-[#8495AE] focus:outline-none focus:border-[#14213D] w-48"
              />
            </div>
            {filterProvenance !== 'all' && (
              <button
                type="button"
                onClick={() => setFilterProvenance('all')}
                className="text-[10px] text-[#14213D] hover:underline"
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
                className="p-3.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#60738F]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#60738F]">
                      Confidence: <span className="text-[#14213D] font-semibold">{item.confidence}</span>
                    </span>
                  </div>
                  <div className="font-medium text-[#14213D] leading-snug">{item.claim}</div>
                  <div className="text-[11px] text-[#60738F]">
                    <span className="text-[#60738F]">Basis:</span> {item.sourceOrBasis}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#EEF4FB] border border-[#E2EAF4] text-[11px] text-[#60738F] md:w-72 shrink-0">
                  <span className="text-[9px] font-mono text-[#19A875] block uppercase mb-0.5">
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
