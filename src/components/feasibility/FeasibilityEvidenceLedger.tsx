import React from 'react';
import type { FeasibilityReport } from '../../types/project';
import { ChartEmptyState } from '../common/ChartEmptyState';

interface FeasibilityEvidenceLedgerProps {
  report: FeasibilityReport;
  updatedAt: string;
}

const TYPE_BADGE: Record<string, string> = {
  verified: 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30',
  'ai-inference': 'bg-[#14213D]/10 text-[#14213D] border-[#14213D]/30',
  assumption: 'bg-[#FFF3E7] text-[#F29A42] border-[#F29A42]/30',
  'needs-validation': 'bg-[#2684F7]/10 text-[#2684F7] border-[#2684F7]/30',
};

const TYPE_LABEL: Record<string, string> = {
  verified: 'USER INPUT',
  'ai-inference': 'MODEL INFERENCE',
  assumption: 'ASSUMPTION',
  'needs-validation': 'NEEDS VALIDATION',
};

// Compact trust ledger: every scored claim, its source type, confidence and
// status in one scannable table. Derived entirely from the live report —
// rows the engine cannot evidence render as NEEDS VALIDATION, never as fact.
export const FeasibilityEvidenceLedger: React.FC<FeasibilityEvidenceLedgerProps> = ({
  report,
  updatedAt,
}) => {
  const rows = Object.values(report.dimensions).flatMap((dim) =>
    dim.evidence.map((ev) => ({
      id: ev.id,
      claim: ev.label,
      detail: ev.content,
      source: dim.name,
      type: ev.type,
      confidence: dim.confidence,
      status: ev.type === 'verified' ? 'SUPPORTED' : ev.type === 'ai-inference' ? 'MODEL INFERENCE' : 'NEEDS VALIDATION',
    })),
  );

  const updatedLabel = (() => {
    try {
      return new Date(updatedAt).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'session';
    }
  })();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase text-[#60738F] tracking-wider font-semibold">
            Section 04b // Evidence Ledger
          </div>
          <p className="text-xs text-[#60738F] mt-0.5">
            Every scored claim with its source type and status. No external evidence is fabricated — gaps stay visible.
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#60738F] shrink-0">
          {rows.length} entries
        </span>
      </div>

      {rows.length === 0 ? (
        <ChartEmptyState
          title="No evidence attached yet"
          message="Dimensions produced no evidence rows. Add discovery input in Stage 01 and re-evaluate."
        />
      ) : (
        <div className="rounded-xl border border-[#E2EAF4] overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin max-h-[320px] overflow-y-auto">
            <table className="w-full text-xs min-w-[640px]">
              <thead className="sticky top-0 bg-[#EEF4FB] text-[10px] font-mono uppercase text-[#60738F]">
                <tr>
                  <th className="text-left font-semibold px-3 py-2">Claim</th>
                  <th className="text-left font-semibold px-3 py-2">Source</th>
                  <th className="text-left font-semibold px-3 py-2">Type</th>
                  <th className="text-left font-semibold px-3 py-2">Confidence</th>
                  <th className="text-left font-semibold px-3 py-2">Status</th>
                  <th className="text-left font-semibold px-3 py-2">Updated</th>
                </tr>
              </thead>
              <tbody className="bg-[#FFFFFF]">
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-[#E2EAF4]/70 align-top">
                    <td className="px-3 py-2">
                      <span className="font-semibold text-[#14213D] block">{row.claim}</span>
                      <span className="text-[#60738F] text-[11px] block mt-0.5 leading-snug">{row.detail}</span>
                    </td>
                    <td className="px-3 py-2 text-[#60738F] whitespace-nowrap">{row.source}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-semibold ${TYPE_BADGE[row.type] ?? 'bg-[#EEF4FB] text-[#60738F] border-[#E2EAF4]'}`}>
                        {TYPE_LABEL[row.type] ?? row.type}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-mono uppercase text-[#60738F] whitespace-nowrap">{row.confidence}</td>
                    <td className="px-3 py-2 font-mono text-[11px] text-[#14213D] font-semibold whitespace-nowrap">{row.status}</td>
                    <td className="px-3 py-2 font-mono text-[11px] text-[#60738F] whitespace-nowrap">{updatedLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
