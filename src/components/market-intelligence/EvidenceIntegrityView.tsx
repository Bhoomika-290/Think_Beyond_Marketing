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
          bg: 'bg-[#4A7C59]/15 text-[#4A7C59] border-[#4A7C59]/30',
          dot: 'bg-[#4A7C59]',
        };
      case 'AI_INFERENCE':
        return {
          label: 'AI Inference',
          bg: 'bg-[#2B3D4F]/15 text-[#2B3D4F] border-[#2B3D4F]/30',
          dot: 'bg-[#2B3D4F]',
        };
      case 'ASSUMPTION':
        return {
          label: 'Assumption',
          bg: 'bg-[#8A6D2B]/15 text-[#8A6D2B] border-[#8A6D2B]/30',
          dot: 'bg-[#8A6D2B]',
        };
      case 'NEEDS_VALIDATION':
      default:
        return {
          label: 'Needs Validation',
          bg: 'bg-[#ECE6DA] text-[#4A5E73] border-[#DDD5C5]',
          dot: 'bg-[#7A8CA0]',
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
    <div className="bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2B3D4F]" />
            <h2 className="text-base font-semibold text-[#2B3D4F]">
              Market Evidence Integrity & Provenance Ledger
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#2B3D4F]/10 text-[#2B3D4F] border border-[#2B3D4F]/20">
              Audit Grade
            </span>
          </div>
          <p className="text-xs text-[#4A5E73] mt-1">
            Strict epistemic separation: AI inferences and assumptions are never conflated with verified facts.
          </p>
        </div>

        <div className="text-xs font-mono text-[#6B7D90]">
          Tracking {total} critical market signals
        </div>
      </div>

      {/* 4 Provenance Count Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          onClick={() => setFilterProvenance(filterProvenance === 'verified' ? 'all' : 'verified')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'verified'
              ? 'bg-[#4A7C59]/40 border-[#4A7C59] ring-1 ring-[#2B3D4F]'
              : 'bg-[#F5F1EB] border-[#DDD5C5] hover:border-[#4A7C59]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#4A7C59]">
            <span>VERIFIED SOURCE</span>
            <span className="w-2 h-2 rounded-full bg-[#4A7C59]" />
          </div>
          <div className="text-xl font-bold text-[#2B3D4F] mt-1.5">{evidenceSummary.verified}</div>
          <p className="text-[10px] text-[#4A5E73] mt-1">Founder / empirical facts</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'inference' ? 'all' : 'inference')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'inference'
              ? 'bg-[#6C5E8F]/25 border-[#6C5E8F] ring-1 ring-[#2B3D4F]'
              : 'bg-[#F5F1EB] border-[#DDD5C5] hover:border-[#2B3D4F]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#6C5E8F]">
            <span>AI INFERENCE</span>
            <span className="w-2 h-2 rounded-full bg-[#6C5E8F]" />
          </div>
          <div className="text-xl font-bold text-[#2B3D4F] mt-1.5">{evidenceSummary.inference}</div>
          <p className="text-[10px] text-[#4A5E73] mt-1">Deductions from Stage 01/02</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'assumption' ? 'all' : 'assumption')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'assumption'
              ? 'bg-[#8A6D2B]/40 border-[#8A6D2B] ring-1 ring-[#2B3D4F]'
              : 'bg-[#F5F1EB] border-[#DDD5C5] hover:border-[#8A6D2B]/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#8A6D2B]">
            <span>ASSUMPTIONS</span>
            <span className="w-2 h-2 rounded-full bg-[#8A6D2B]" />
          </div>
          <div className="text-xl font-bold text-[#2B3D4F] mt-1.5">{evidenceSummary.assumptions}</div>
          <p className="text-[10px] text-[#4A5E73] mt-1">Hypotheses to falsify</p>
        </div>

        <div
          onClick={() => setFilterProvenance(filterProvenance === 'needs_validation' ? 'all' : 'needs_validation')}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            filterProvenance === 'needs_validation'
              ? 'bg-[#ECE6DA] border-[#2B3D4F] ring-1 ring-[#2B3D4F]'
              : 'bg-[#F5F1EB] border-[#DDD5C5] hover:border-[#7A8CA0]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#4A5E73]">
            <span>NEEDS VALIDATION</span>
            <span className="w-2 h-2 rounded-full bg-[#7A8CA0]" />
          </div>
          <div className="text-xl font-bold text-[#2B3D4F] mt-1.5">{evidenceSummary.needsVal}</div>
          <p className="text-[10px] text-[#4A5E73] mt-1">Data gaps requiring input</p>
        </div>
      </div>

      {/* Multi-segmented bar */}
      <div className="space-y-1.5">
        <div className="w-full h-2 rounded-full bg-[#F5F1EB] border border-[#DDD5C5] overflow-hidden flex">
          <div style={{ width: `${verifiedPct}%` }} className="h-full bg-[#4A7C59] transition-all duration-500" />
          <div style={{ width: `${inferencePct}%` }} className="h-full bg-[#6C5E8F] transition-all duration-500" />
          <div style={{ width: `${assumptionPct}%` }} className="h-full bg-[#8A6D2B] transition-all duration-500" />
          <div style={{ width: `${needsValPct}%` }} className="h-full bg-[#7A8CA0] transition-all duration-500" />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#6B7D90]">
          <span>{verifiedPct}% Verified Empirical Evidence</span>
          <span>{inferencePct}% Reasoned Model Deductions</span>
          <span>{assumptionPct + needsValPct}% Actionable Validation Horizon</span>
        </div>
      </div>

      {/* Evidence Register List */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[#2B3D4F] font-semibold">Tracked Market Claims Register:</span>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search claims or basis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#ECE6DA] border border-[#DDD5C5] rounded px-2.5 py-1 text-xs text-[#2B3D4F] placeholder-[#6B7D90] focus:outline-none focus:border-[#2B3D4F] w-48"
              />
            </div>
            {filterProvenance !== 'all' && (
              <button
                type="button"
                onClick={() => setFilterProvenance('all')}
                className="text-[10px] text-[#2B3D4F] hover:underline"
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
                className="p-3.5 rounded-lg bg-[#F5F1EB] border border-[#DDD5C5] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#6B7D90]">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#4A5E73]">
                      Confidence: <span className="text-[#2B3D4F] font-semibold">{item.confidence}</span>
                    </span>
                  </div>
                  <div className="font-medium text-[#2B3D4F] leading-snug">{item.claim}</div>
                  <div className="text-[11px] text-[#4A5E73]">
                    <span className="text-[#6B7D90]">Basis:</span> {item.sourceOrBasis}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#ECE6DA] border border-[#DDD5C5] text-[11px] text-[#4A5E73] md:w-72 shrink-0">
                  <span className="text-[9px] font-mono text-[#4A7C59] block uppercase mb-0.5">
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
